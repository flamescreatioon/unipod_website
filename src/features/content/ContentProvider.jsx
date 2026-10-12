import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import {
  newsArticleQuery,
  sanityClient,
  sanityEnabled,
  websiteQuery,
} from "../../lib/sanity";
import { programmes } from "../../data/programmes";
import { facilityAreas } from "../../data/facilities";
import { enterpriseServices } from "../../data/enterprise";
import { teamMembers } from "../../data/team";
const defaults = {
  programme: programmes,
  facility: facilityAreas,
  enterprise: enterpriseServices,
  news: [],
  team: teamMembers,
};
const Context = createContext(null);
export function ContentProvider({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  const retry = useCallback(() => setRevision((value) => value + 1), []);
  useEffect(() => {
    if (!sanityClient) return;
    const controller = new AbortController();
    let active = true,
      fetching = false;
    async function refresh() {
      if (fetching || document.hidden) return;
      fetching = true;
      try {
        const result = await sanityClient.fetch(
          websiteQuery,
          {},
          { signal: controller.signal },
        );
        if (active) {
          setData(result);
          setError(false);
        }
      } catch (error) {
        if (active && error.name !== "AbortError") setError(true);
      } finally {
        fetching = false;
      }
    }
    refresh();
    const timer = setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    return () => {
      active = false;
      controller.abort();
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
    };
  }, [revision]);
  return (
    <Context.Provider
      value={{
        data,
        error,
        retry,
        loading: sanityEnabled && !data && !error,
        configured: sanityEnabled,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useContent = () => useContext(Context);
export function useCollection(type) {
  const { data, configured, error } = useContent();
  const hasStarterContent = [
    "programme",
    "facility",
    "enterprise",
    "team",
  ].includes(type);
  if (!configured || (!data && error && hasStarterContent))
    return defaults[type] || [];
  const entries = (data?.entries || [])
    .filter((entry) => entry.contentType === type)
    .map((entry) => ({
      ...entry,
      name: entry.title,
      description: entry.summary,
      type: entry.category,
      topics: entry.topics || [],
    }));
  return entries.length > 0 ? entries : defaults[type] || [];
}
export function useNewsArticle(slug) {
  const { configured } = useContent();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(Boolean(configured && slug));
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!configured || !sanityClient || !slug) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    sanityClient
      .fetch(newsArticleQuery, { slug }, { signal: controller.signal })
      .then((result) => {
        if (!controller.signal.aborted) setEntry(result || null);
      })
      .catch((reason) => {
        if (!controller.signal.aborted && reason.name !== "AbortError") setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [configured, slug]);
  return { entry, loading, error };
}
export function useGalleryEvents() {
  const { data, configured } = useContent();
  return configured ? data?.galleryEvents || [] : [];
}
export function usePageContent() {
  const { pathname } = useLocation();
  const { data } = useContent();
  return (
    data?.pages?.find(
      (page) => page.path === (pathname.replace(/\/+$/, "") || "/"),
    ) || {}
  );
}

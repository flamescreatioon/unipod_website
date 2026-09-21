import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import {
  useContent,
  usePageContent,
} from "../features/content/ContentProvider";
import { pageMetadata } from "../data/pageMetadata";

function setMeta(attribute, name, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.append(tag);
  }
  tag.content = content;
}

export default function RouteEffects() {
  const location = useLocation();
  const { data } = useContent();
  const page = usePageContent();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());
  const previousKey = useRef(location.key);

  useLayoutEffect(() => {
    const pathname = location.pathname.replace(/\/+$/, "") || "/";
    const article = data?.entries?.find(
      (item) =>
        item.contentType === "news" && (pathname === "/news/" + item.slug || pathname === "/news-impact/" + item.slug),
    );
    const known =
      pathname !== "/admin" && Boolean(pageMetadata[pathname] || article);
    const [fallbackTitle, fallbackDescription] = pageMetadata[pathname] || [
      "Page Not Found | Manu-Tech UniPod",
      "This page could not be found. Explore Manu-Tech UniPod programmes, facilities and contact information.",
    ];
    const title = article
      ? article.title + " | Manu-Tech UniPod"
      : page.seoTitle || fallbackTitle;
    const description =
      article?.summary || page.seoDescription || fallbackDescription;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", known ? "index,follow" : "noindex,follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Manu-Tech UniPod");
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    const configuredOrigin = import.meta.env.VITE_SITE_URL;
    document.head.querySelector('link[rel="canonical"]')?.remove();
    document.head.querySelector('meta[property="og:url"]')?.remove();
    if (configuredOrigin && known) {
      try {
        const canonical = new URL(pathname, configuredOrigin).href;
        const link = document.createElement("link");
        link.rel = "canonical";
        link.href = canonical;
        document.head.append(link);
        setMeta("property", "og:url", canonical);
      } catch {
        /* Metadata works before a public origin is configured. */
      }
    }
  }, [location.pathname, data, page.seoTitle, page.seoDescription]);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    let anchor;
    try {
      anchor = document.getElementById(
        decodeURIComponent(location.hash.slice(1)),
      );
    } catch {
      /* Invalid fragments fall back to the page top. */
    }
    const main = document.getElementById("main");
    if (anchor || previousKey.current !== location.key) {
      (anchor || main)?.focus({ preventScroll: true });
    }
    previousKey.current = location.key;
    const savedPosition = positions.current.get(location.key);
    if (navigationType === "POP" && savedPosition !== undefined) {
      window.scrollTo({ top: savedPosition, behavior: "instant" });
    } else if (anchor) {
      anchor.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    const rememberPosition = () => {
      positions.current.set(location.key, window.scrollY);
      if (positions.current.size > 100)
        positions.current.delete(positions.current.keys().next().value);
    };
    window.addEventListener("scroll", rememberPosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", rememberPosition);
      window.history.scrollRestoration = previousRestoration;
    };
  }, [location.key, location.pathname, location.hash, navigationType]);

  return null;
}

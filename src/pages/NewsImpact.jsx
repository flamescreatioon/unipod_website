import React from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import {
  useCollection,
  useContent,
  useNewsArticle,
} from "../features/content/ContentProvider";
import {
  CmsImage,
  RichText,
  ContentState,
} from "../features/content/ContentView";
import NotFound from "./NotFound";
export default function NewsImpact() {
  const entries = useCollection("news");
  return (
    <>
      <PageHero
        eyebrow="News & impact"
        title={
          <>
            Follow what <em>takes shape.</em>
          </>
        }
        lead="Programme announcements, project stories and published outcomes from the hub."
      />
      <section className="site-container grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-8 py-12 pb-[72px]">
        <ContentState empty={!entries.length} />
        {entries.map((entry) => (
          <article className="border-b border-line pb-7" key={entry._id}>
            <CmsImage value={entry.image} />
            <h2 className="mb-4 text-[clamp(25px,3vw,34px)] text-blue">
              <Link to={"/news/" + entry.slug}>{entry.title}</Link>
            </h2>
            {entry.publishedAt && (
              <time dateTime={entry.publishedAt}>
                {new Date(entry.publishedAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            <p className="text-muted">{entry.summary}</p>
            <Link className="text-link inline-flex min-h-11 items-center gap-3 text-[14px] font-extrabold text-blue no-underline cursor-pointer" to={"/news/" + entry.slug}>
              Read story →
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
export function NewsArticle() {
  const { slug } = useParams();
  const entries = useCollection("news");
  const { loading: contentLoading, error: contentError } = useContent();
  const listingEntry = entries.find((item) => item.slug === slug);
  const { entry: articleEntry, loading: articleLoading, error: articleError } =
    useNewsArticle(slug);
  const entry = articleEntry || listingEntry;
  if (!entry)
    return contentLoading || articleLoading || contentError || articleError ? (
      <section className="site-container py-12 pb-[72px]">
        <ContentState />
      </section>
    ) : (
      <NotFound />
    );
  return (
    <article className="site-container mx-auto max-w-[900px] py-12 pb-[72px]">
      <Link to="/news">← All news</Link>
      <h1>{entry.title}</h1>
      {entry.publishedAt && (
        <time dateTime={entry.publishedAt}>
          {new Date(entry.publishedAt).toLocaleDateString("en-GB")}
        </time>
      )}
      <p className="max-w-[510px] text-base text-muted">{entry.summary}</p>
      <CmsImage value={entry.image} />
      {articleLoading ? (
        <p role="status">Loading article…</p>
      ) : articleError ? (
        <p role="status">The full article could not be loaded. Please try again.</p>
      ) : (
        <RichText value={entry.body} />
      )}
    </article>
  );
}

import React from "react";
import PageHero from "../components/PageHero";
import { CmsImage, ContentState } from "../features/content/ContentView";
import { useGalleryEvents } from "../features/content/ContentProvider";

export default function Gallery() {
  const events = useGalleryEvents();
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={<>Ideas in motion.<br /><em>Work made visible.</em></>}
        lead="Browse the moments, makers and practical work of Manu-Tech UniPod, organized by event."
      />
      <section className="site-container py-12 pb-[88px]">
        <ContentState empty={!events.length} emptyMessage="Event galleries will appear here when they are published." />
        <div className="grid gap-14">
          {events.map((event) => (
            <article className="border-t-2 border-blue pt-5" key={event._id}>
              <div className="mb-7 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[.08em] text-blue">
                    {event.eventDate
                      ? new Date(`${event.eventDate}T00:00:00`).toLocaleDateString("en-GB", {
                          year: "numeric", month: "long", day: "numeric",
                        })
                      : "Event gallery"}
                  </p>
                  <h2 className="text-[clamp(32px,4vw,52px)] text-blue">{event.title}</h2>
                </div>
                {event.summary && <p className="mb-0 max-w-[430px] text-muted">{event.summary}</p>}
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
                {event.images?.map((image, index) => (
                  <div className="overflow-hidden bg-[#e8e5dc]" key={image._key || index}>
                    <CmsImage value={image} />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

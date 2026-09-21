import React from "react";
import PageHero from "../components/PageHero";
import { CmsImage, ContentState } from "../features/content/ContentView";
import { useCollection } from "../features/content/ContentProvider";

export default function Team() {
  const team = useCollection("team");
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={<>People behind<br /><em>the possibilities.</em></>}
        lead="The educators, makers and partners helping ideas become useful outcomes."
      />
      <section className="site-container py-12 pb-[88px]">
        <ContentState empty={!team.length} emptyMessage="Team profiles will appear here when they are published." />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-7 gap-y-12">
          {team.map((member) => (
            <article className="border-t-2 border-blue pt-5" key={member._id}>
              <CmsImage value={member.image} />
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[.08em] text-blue">{member.role || "Manu-Tech UniPod"}</p>
              <h2 className="text-[32px] text-blue">{member.title}</h2>
              {member.summary && <p className="mt-4 mb-0 text-muted">{member.summary}</p>}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

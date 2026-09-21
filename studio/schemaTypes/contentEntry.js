import { defineField, defineType } from "sanity";
import { imageField, richText } from "./fields.js";
const forType =
  (type) =>
  ({ document }) =>
    document?.contentType !== type;
export const contentEntry = defineType({
  name: "contentEntry",
  title: "Content",
  type: "document",
  initialValue: { contentType: "news", order: 0 },
  fields: [
    defineField({
      name: "contentType",
      title: "Content type",
      type: "string",
      options: {
        list: [
          { title: "Programme", value: "programme" },
          { title: "Facility", value: "facility" },
          { title: "Enterprise service", value: "enterprise" },
          { title: "News / impact story", value: "news" },
          { title: "Team member", value: "team" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 160 },
      validation: (rule) =>
        rule
          .required()
          .custom(async (value, context) => {
            if (!value?.current) return true;
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current))
              return "Use lowercase letters, numbers and hyphens.";
            if (context.document?.contentType !== "news") return true;
            const client = context.getClient?.({ apiVersion: "2026-09-01" });
            if (!client || !context.document?._id) return true;
            const id = context.document._id.replace(/^drafts\./, "");
            const matches = await client.fetch(
              'count(*[_type == "contentEntry" && contentType == "news" && slug.current == $slug && !(_id in [$draftId, $publishedId])])',
              { slug: value.current, draftId: `drafts.${id}`, publishedId: id },
            );
            return matches
              ? "A news article already uses this URL slug."
              : true;
          }),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(600),
    }),
    imageField("image", "Image"),
    defineField({
      name: "role",
      title: "Role / title",
      type: "string",
      hidden: forType("team"),
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.contentType === "team" && !value
            ? "Add this team member's role."
            : true,
        ),
    }),
    richText("body", "Details / article body"),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "category",
      title: "Programme level",
      type: "string",
      hidden: forType("programme"),
      options: { list: ["Foundations", "Technical", "Advanced"] },
    }),
    defineField({
      name: "topics",
      title: "Programme topics",
      type: "array",
      of: [{ type: "string" }],
      hidden: forType("programme"),
    }),
    ...["availability", "duration", "eligibility", "fees"].map((name) =>
      defineField({
        name,
        title: name[0].toUpperCase() + name.slice(1),
        type: "string",
        hidden: forType("programme"),
        description: "Leave blank until confirmed.",
      }),
    ),
    defineField({
      name: "startDate",
      title: "Programme start date",
      type: "date",
      hidden: forType("programme"),
    }),
    defineField({
      name: "accessDetails",
      title: "Access / equipment information",
      type: "text",
      rows: 4,
      hidden: forType("facility"),
    }),
    defineField({
      name: "publishedAt",
      title: "Article date",
      type: "datetime",
      hidden: forType("news"),
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.contentType === "news" && !value
            ? "Add the article date before publishing."
            : true,
        ),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "contentType", media: "image" },
  },
});

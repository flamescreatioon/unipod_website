import { defineField, defineType } from "sanity";
import { richText } from "./fields.js";
export const pageContent = defineType({
  name: "pageContent",
  title: "Page introductions",
  type: "document",
  fields: [
    defineField({
      name: "path",
      title: "Website page",
      type: "string",
      options: {
        list: [
          "/about",
          "/programs",
          "/facilities",
          "/enterprise",
          "/news-impact",
          "/news",
          "/gallery",
          "/team",
          "/facility-tour",
          "/contact",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "eyebrow", title: "Small heading", type: "string" }),
    defineField({ name: "title", title: "Main heading", type: "string" }),
    defineField({
      name: "emphasis",
      title: "Emphasized heading line",
      type: "string",
    }),
    defineField({ name: "lead", title: "Introduction", type: "text", rows: 3 }),
    defineField({
      name: "noticeTitle",
      title: "Availability notice title",
      type: "string",
    }),
    defineField({
      name: "noticeText",
      title: "Availability notice text",
      type: "text",
      rows: 4,
      description: "Programme, facility or enterprise access information.",
    }),
    richText("body", "Additional page content"),
    defineField({
      name: "seoTitle",
      title: "Search title",
      type: "string",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "seoDescription",
      title: "Search description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: { select: { title: "path", subtitle: "title" } },
});

import { defineField, defineType } from "sanity";
import { imageField } from "./fields.js";
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Homepage heading",
      type: "string",
    }),
    defineField({
      name: "heroEmphasis",
      title: "Homepage emphasized line",
      type: "string",
    }),
    defineField({
      name: "heroLead",
      title: "Homepage introduction",
      type: "text",
      rows: 3,
    }),
    imageField("heroImage", "Homepage image"),
    defineField({
      name: "facilitySlides",
      title: "Homepage facility slideshow",
      type: "array",
      description:
        "Add images in the order they should appear. Published images rotate automatically.",
      of: [
        {
          type: "object",
          fields: [
            imageField("image", "Facility image"),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare: ({ title, media }) => ({
              title: title || "Facility image",
              media,
            }),
          },
        },
      ],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: "facilitySlideInterval",
      title: "Facility slideshow interval (seconds)",
      type: "number",
      description: "The time each image stays visible. Minimum 3 seconds.",
      initialValue: 7,
      validation: (rule) => rule.integer().min(3).max(120),
    }),
    defineField({
      name: "opportunityTitle",
      title: "Homepage opportunity heading",
      type: "string",
    }),
    defineField({
      name: "opportunityText",
      title: "Homepage opportunity description",
      type: "text",
    }),
    defineField({
      name: "email",
      title: "Public contact email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({ name: "phone", title: "Public telephone", type: "string" }),
    defineField({
      name: "visitingHours",
      title: "Visiting hours",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Visitor address",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

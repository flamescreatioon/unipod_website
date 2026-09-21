import { defineField, defineType } from "sanity";

const galleryImage = {
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Image description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
};

export const galleryEvent = defineType({
  name: "galleryEvent",
  title: "Gallery event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event name",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "eventDate",
      title: "Event date",
      type: "date",
    }),
    defineField({
      name: "summary",
      title: "Event description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(600),
    }),
    defineField({
      name: "images",
      title: "Event photographs",
      type: "array",
      description: "Add photographs in the order they should appear.",
      of: [galleryImage],
      validation: (rule) => rule.required().min(1).max(40),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "eventDate", media: "images.0" },
  },
});

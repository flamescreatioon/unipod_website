import { defineField } from "sanity";
export const imageField = (name, title) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({ name: "alt", title: "Image description", type: "string" }),
      defineField({ name: "caption", title: "Caption", type: "string" }),
    ],
    validation: (rule) =>
      rule.custom((value) =>
        value?.asset && !value.alt?.trim() ? "Add an image description." : true,
      ),
  });
export const richText = (name, title) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Heading", value: "h2" },
          { title: "Subheading", value: "h3" },
          { title: "Quote", value: "blockquote" },
        ],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
          ],
          annotations: [
            {
              name: "link",
              type: "object",
              title: "Link",
              fields: [
                defineField({
                  name: "href",
                  type: "url",
                  title: "URL",
                  validation: (rule) =>
                    rule
                      .required()
                      .uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                }),
              ],
            },
          ],
        },
      },
      {
        type: "image",
        options: { hotspot: true },
        fields: [
          {
            name: "alt",
            type: "string",
            title: "Image description",
            validation: (rule) => rule.required(),
          },
          { name: "caption", type: "string" },
        ],
      },
    ],
  });

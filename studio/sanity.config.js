import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes/index.js";
import { structure } from "./structure.js";

if (!process.env.SANITY_STUDIO_PROJECT_ID)
  throw new Error(
    "Set SANITY_STUDIO_PROJECT_ID in studio/.env. See docs/SANITY.md.",
  );

export default defineConfig({
  name: "manu-tech-unipod",
  title: "Manu-Tech UniPod",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter(
        (item) =>
          !["siteSettings", "pageContent", "contentEntry"].includes(
            item.schemaType,
          ),
      ),
      {
        id: "content-by-type",
        title: "Content by type",
        schemaType: "contentEntry",
        parameters: [{ name: "contentType", type: "string" }],
        value: ({ contentType }) => ({ contentType, order: 0 }),
      },
      {
        id: "page-by-path",
        title: "Page introduction",
        schemaType: "pageContent",
        parameters: [{ name: "path", type: "string" }],
        value: ({ path }) => ({ path }),
      },
    ],
  },
  document: {
    actions: (prev, context) =>
      ["siteSettings", "pageContent"].includes(context.schemaType)
        ? prev.filter(
            (action) => !["duplicate", "delete"].includes(action.action),
          )
        : prev,
  },
});

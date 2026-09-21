const pages = [
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
];
export const structure = (S) =>
  S.list()
    .title("Manu-Tech UniPod")
    .items([
      S.listItem()
        .title("Site settings")
        .child(
          S.document().schemaType("siteSettings").documentId("site-settings"),
        ),
      S.listItem()
        .title("Page introductions")
        .child(
          S.list()
            .title("Pages")
            .items(
              pages.map((path) =>
                S.listItem()
                  .title(path.slice(1))
                  .child(
                    S.document()
                      .schemaType("pageContent")
                      .documentId(`page-${path.slice(1)}`)
                      .initialValueTemplate("page-by-path", { path }),
                  ),
              ),
            ),
        ),
      S.divider(),
      ...[
        ["programme", "Programmes"],
        ["facility", "Facilities"],
        ["enterprise", "Enterprise services"],
        ["news", "News & impact"],
        ["team", "Team"],
      ].map(([type, title]) =>
        S.listItem()
          .title(title)
          .child(
            S.documentTypeList("contentEntry")
              .title(title)
              .filter('_type == "contentEntry" && contentType == $type')
              .params({ type })
              .initialValueTemplates([
                S.initialValueTemplateItem("content-by-type", {
                  contentType: type,
                }),
              ]),
          ),
      ),
      S.listItem()
        .title("Gallery events")
        .child(S.documentTypeList("galleryEvent").title("Gallery events")),
    ]);

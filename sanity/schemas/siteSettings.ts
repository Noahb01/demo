import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      initialValue: "ShipShelter",
    }),
    defineField({
      name: "heroHeadline",
      title: "Homepage hero headline",
      type: "string",
    }),
    defineField({
      name: "heroSubcopy",
      title: "Homepage hero subcopy",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default social image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});

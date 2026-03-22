import { defineField, defineType } from "sanity";

const powerOptions = [
  { title: "16A", value: "16A" },
  { title: "32A", value: "32A" },
  { title: "63A", value: "63A" },
  { title: "Three-phase", value: "three_phase" },
];

export default defineType({
  name: "listing",
  title: "Boat house listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Full description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image (optional)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "lengthM",
      title: "Length (m)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "beamM",
      title: "Beam width (m)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "clearanceM",
      title: "Clearance height (m)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "depthM",
      title: "Depth (m)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "powerSupply",
      title: "Power supply",
      type: "string",
      options: { list: powerOptions },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locationLabel",
      title: "Location name",
      description: "Short label for cards and filters",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Full address",
      type: "string",
    }),
    defineField({
      name: "lat",
      title: "Latitude",
      type: "number",
      validation: (Rule) => Rule.required().min(-90).max(90),
    }),
    defineField({
      name: "lng",
      title: "Longitude",
      type: "number",
      validation: (Rule) => Rule.required().min(-180).max(180),
    }),
    defineField({
      name: "waterwayNote",
      title: "Proximity to waterway",
      type: "string",
    }),
    defineField({
      name: "metaTitle",
      title: "SEO title override",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO description override",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "locationLabel", media: "heroImage" },
  },
});

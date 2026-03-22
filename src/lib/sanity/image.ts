import createImageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(
  // Sanity image field (image + asset ref)
  source: { asset?: { _ref?: string }; _ref?: string } | undefined,
  width = 1600,
): string | null {
  if (!builder || !source) return null;
  return builder.image(source).width(width).auto("format").url();
}

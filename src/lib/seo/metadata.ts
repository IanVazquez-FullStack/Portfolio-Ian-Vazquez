import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "./site";

export interface BuildMetadataOptions {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}

export function buildMetadata({
  title,
  description,
  ogImage,
  canonical,
}: BuildMetadataOptions = {}): Metadata {
  const resolvedTitle = title?.trim() || SITE_NAME;
  const resolvedDescription = description?.trim() || DEFAULT_DESCRIPTION;
  const resolvedOgImage = ogImage?.trim() || DEFAULT_OG_IMAGE;

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s — ${SITE_NAME}`,
    },
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedOgImage],
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedOgImage],
    },
  };

  if (canonical) {
    metadata.alternates = {
      canonical,
    };
  }

  return metadata;
}

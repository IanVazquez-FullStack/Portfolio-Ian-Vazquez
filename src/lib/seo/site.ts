import { personal } from "@/lib/data/personal";

export const SITE_NAME = personal.displayName;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://portfolio-ian.vercel.app";
export const DEFAULT_DESCRIPTION =
  "Desarrollador Full Stack especializado en crear experiencias web modernas, accesibles y de alto rendimiento.";
export const AUTHOR = personal.displayName;
export const DEFAULT_OG_IMAGE = "/og/default-og.webp";

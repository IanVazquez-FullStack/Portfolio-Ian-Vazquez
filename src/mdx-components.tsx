import type { MDXComponents } from "mdx/types";
import { MDXComponents as components } from "@/components/content/MDXComponents";

export function useMDXComponents(): MDXComponents {
  return components;
}

import type { AnchorHTMLAttributes, ComponentProps } from "react";
import { Button } from "@/components/ui/Button";

type CVDownloadButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "aria-label" | "children" | "download" | "href"
> & {
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
};

export function CVDownloadButton({
  variant = "secondary",
  className,
  ...props
}: CVDownloadButtonProps) {
  return (
    <Button
      {...props}
      as="a"
      href="/cv/ian-vazquez-cv.pdf"
      download
      aria-label="Descargar CV de Ian Vazquez (PDF)"
      variant={variant}
      className={className}
    >
      Descargar CV
    </Button>
  );
}

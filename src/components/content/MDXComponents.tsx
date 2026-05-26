import Link from "next/link";
import Image from "next/image";
import { CodeBlock } from "@/components/ui/CodeBlock";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import type { HTMLAttributes } from "react";

function H1(props: React.ComponentPropsWithoutRef<"h1">) {
  return (
    <h2
      className="mt-10 mb-4 text-3xl font-bold tracking-tight text-foreground"
      {...props}
    />
  );
}

function H2(props: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="mt-10 mb-4 text-3xl font-bold tracking-tight text-foreground"
      {...props}
    />
  );
}

function H3(props: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  );
}

function H4(props: React.ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className="mt-6 mb-2 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  );
}

function P(props: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className="mb-4 text-base leading-relaxed text-foreground"
      {...props}
    />
  );
}

function UL(props: React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="mb-4 list-disc space-y-1 pl-6 text-base leading-relaxed text-foreground"
      {...props}
    />
  );
}

function OL(props: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="mb-4 list-decimal space-y-1 pl-6 text-base leading-relaxed text-foreground"
      {...props}
    />
  );
}

function LI(props: React.ComponentPropsWithoutRef<"li">) {
  return <li className="leading-relaxed" {...props} />;
}

function CustomLink({
  href,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  const className =
    "text-primary underline underline-offset-4 transition-colors hover:text-accent";

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

function CustomImage({
  src,
  alt,
  width,
  height,
  ...props
}: React.ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;

  const w = width ? parseInt(String(width), 10) : 800;
  const h = height ? parseInt(String(height), 10) : 450;

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={w}
      height={h}
      className="my-6 rounded-lg"
      {...props}
    />
  );
}

function Blockquote(props: React.ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="my-6 border-l-4 border-accent bg-muted/50 py-1 pl-4 pr-4 italic text-muted-foreground"
      {...props}
    />
  );
}

function InlineCode(props: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    />
  );
}

function Pre(
  props: HTMLAttributes<HTMLPreElement>,
) {
  return <CodeBlock {...props} />;
}

export const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  a: CustomLink,
  img: CustomImage,
  blockquote: Blockquote,
  code: InlineCode,
  pre: Pre,
} satisfies MDXComponentsType;

export default MDXComponents;

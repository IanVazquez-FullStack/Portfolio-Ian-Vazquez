import type { HTMLAttributes, ReactNode } from "react";

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  children?: ReactNode;
  language?: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CodeBlock({ children, language, className, ...props }: CodeBlockProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      {language ? (
        <div className="border-b border-border bg-muted px-4 py-2 font-mono text-xs text-muted-foreground">
          {language}
        </div>
      ) : null}
      <pre
        {...props}
        tabIndex={0}
        className={joinClasses(
          "overflow-x-auto bg-muted p-4 font-mono text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      >
        {children}
      </pre>
    </div>
  );
}

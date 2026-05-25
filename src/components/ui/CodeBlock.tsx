import type { HTMLAttributes, ReactNode } from "react";

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  children: ReactNode;
  language?: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CodeBlock({ children, language, className, ...props }: CodeBlockProps) {
  return (
    <div className="rounded-3xl border border-border bg-slate-950 text-slate-50">
      {language ? (
        <div className="border-b border-slate-800 px-5 py-3 font-mono text-caption text-slate-300">
          {language}
        </div>
      ) : null}
      <pre
        {...props}
        tabIndex={0}
        className={joinClasses(
          "overflow-x-auto p-5 font-mono text-code outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

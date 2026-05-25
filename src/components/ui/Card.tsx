import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

type CardSectionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={joinClasses(
        "rounded-3xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-border-hover md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardSectionProps) {
  return (
    <div {...props} className={joinClasses("mb-5 space-y-2", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: CardSectionProps) {
  return (
    <div {...props} className={joinClasses("space-y-4", className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: CardSectionProps) {
  return (
    <div {...props} className={joinClasses("mt-6 flex flex-wrap gap-3", className)}>
      {children}
    </div>
  );
}

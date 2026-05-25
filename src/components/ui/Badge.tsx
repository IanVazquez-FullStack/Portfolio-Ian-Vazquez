import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "default" | "accent" | "success" | "error";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-border bg-muted text-foreground",
  accent: "border-accent bg-accent text-slate-950",
  success: "border-success bg-success text-slate-950",
  error: "border-error bg-error text-white",
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Badge({ children, variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={joinClasses(
        "inline-flex items-center rounded-full border px-3 py-1 text-caption font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

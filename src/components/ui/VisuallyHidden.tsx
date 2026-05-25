import type { HTMLAttributes, ReactNode } from "react";

type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function VisuallyHidden({ children, className, ...props }: VisuallyHiddenProps) {
  return (
    <span
      {...props}
      className={joinClasses(
        "absolute size-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

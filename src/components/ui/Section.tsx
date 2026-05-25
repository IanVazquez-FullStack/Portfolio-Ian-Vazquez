import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section {...props} className={joinClasses("py-20 lg:py-32", className)}>
      {children}
    </section>
  );
}

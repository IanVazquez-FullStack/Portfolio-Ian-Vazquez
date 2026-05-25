import type { HTMLAttributes, ReactNode } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={joinClasses("mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12", className)}
    >
      {children}
    </div>
  );
}

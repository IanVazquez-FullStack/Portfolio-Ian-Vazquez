import { type ReactNode } from "react";

interface AboutSectionProps {
  id: string;
  heading: string;
  children: ReactNode;
}

export function AboutSection({ id, heading, children }: AboutSectionProps) {
  return (
    <div id={id} style={{ scrollMarginTop: "80px" }}>
      <h2 className="text-h2 text-foreground">{heading}</h2>
      <div className="mt-3 text-body-lg text-muted-foreground leading-relaxed whitespace-pre-line">
        {children}
      </div>
    </div>
  );
}

"use client";

import { List } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface TableOfContentsProps {
  sections: Array<{ id: string; title: string }>;
  activeSection: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isMobile?: boolean;
}

function joinClasses(...classes: Array<string | false>) {
  return classes.filter(Boolean).join(" ");
}

export function TableOfContents({
  sections,
  activeSection,
  isOpen,
  onOpenChange,
  isMobile = false,
}: TableOfContentsProps) {
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger
          aria-label="Abrir índice"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-body font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <List className="h-4 w-4" />
          Índice
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle className="text-h3 font-bold">Contenido</SheetTitle>
          </SheetHeader>
          <nav className="mt-6" aria-label="Table of contents">
            <ul className="flex flex-col gap-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => onOpenChange(false)}
                    className={joinClasses(
                      "flex min-h-11 items-center rounded-full px-4 text-body font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full text-left",
                      activeSection === section.id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    aria-current={activeSection === section.id ? "page" : undefined}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop Sidebar
  return (
    <aside className="sticky top-8 h-fit">
      <nav className="space-y-1" aria-label="Table of contents">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={joinClasses(
              "relative inline-flex min-h-11 items-center rounded-full px-4 text-body font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full",
              activeSection !== section.id && "after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100",
              activeSection === section.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-current={activeSection === section.id ? "page" : undefined}
          >
            {section.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

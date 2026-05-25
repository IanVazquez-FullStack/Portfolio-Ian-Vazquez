"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/components/layout/Navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function joinClasses(...classes: Array<string | false>) {
  return classes.filter(Boolean).join(" ");
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <div className="md:hidden">
        <SheetTrigger
          aria-label="Abrir navegación"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span aria-hidden="true" className="flex flex-col gap-1">
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
          </span>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full max-w-xs border-border bg-background p-6"
        >
          <div className="flex flex-col gap-6">
            <SheetTitle className="text-h3 font-bold text-foreground">
              IV
            </SheetTitle>
            <nav aria-label="Navegación principal móvil">
              <ul className="flex flex-col gap-2 pt-8">
                {navigationLinks.map((link) => {
                  const isActive = isActivePath(pathname, link.href);

                  return (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          className={joinClasses(
                            "flex min-h-11 items-center rounded-full px-4 text-body font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            isActive
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </div>
    </Sheet>
  );
}

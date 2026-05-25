"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const navigationLinks = [
  { href: "/projects", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function joinClasses(...classes: Array<string | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación principal" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {navigationLinks.map((link) => {
          const isActive = isActivePath(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={joinClasses(
                  "inline-flex min-h-11 items-center rounded-full px-4 text-body font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

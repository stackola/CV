"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/nav-link";

export function MobileMenu({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes.
  React.useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the panel is open.
  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <div
          className="absolute inset-x-0 top-16 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-md"
          id="mobile-menu"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {items.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                onNavigate={() => setOpen(false)}
                className="px-2 py-3 text-base"
              />
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

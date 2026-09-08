import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Command, Download, Menu, Moon, Sun, X } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import resumeLink from "@/assets/Abhay-Patel-Resume.pdf";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setPaletteOpen(false);
    setOpen(false);
    void router.navigate({ to: href });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass border-b py-2 backdrop-blur-xl" : "border-b border-transparent py-4",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:px-8"
        >
          <div className="flex min-w-0 items-center gap-8">
            <Link to="/" className="flex shrink-0 items-center gap-2.5">
              <span className="gradient-accent grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-primary-foreground">
                {portfolio.personal.logo}
              </span>
              <span className="hidden truncate font-display text-sm font-semibold sm:block">
                {portfolio.personal.name}
              </span>
            </Link>
            <ul className="hidden items-center gap-1 lg:flex">
              {portfolio.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    activeOptions={{ exact: item.href === "/" }}
                    activeProps={{ className: "text-foreground bg-glass" }}
                    inactiveProps={{ className: "text-muted-foreground" }}
                    className="rounded-full px-3 py-2 text-sm transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="glass hidden h-9 items-center gap-2 rounded-full px-3 text-xs text-muted-foreground transition-colors hover:text-foreground xl:flex"
            >
              <Command className="h-3.5 w-3.5" />
              <span>Ctrl K</span>
            </button>

            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="glass relative grid h-11 w-11 place-items-center overflow-hidden rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ y: 14, opacity: 0, rotate: -40 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -14, opacity: 0, rotate: 40 }}
                  transition={{ duration: 0.25 }}
                  className="grid place-items-center"
                >
                  {theme === "dark" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <Button asChild variant="glass" size="sm" className="hidden sm:inline-flex">
              <a href={resumeLink} download="Abhay_Patel_Resume.pdf">
                <Download className="h-4 w-4" />
                Resume
              </a>
            </Button>
            <Button asChild variant="hero" size="sm" className="hidden md:inline-flex">
              <Link to="/contact">Hire Me</Link>
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="glass grid h-11 w-11 place-items-center rounded-full lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="mx-4 mt-3 grid gap-1 rounded-2xl border border-glass-border bg-popover/95 p-3 backdrop-blur-xl">
                {portfolio.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: item.href === "/" }}
                      activeProps={{ className: "bg-glass text-foreground" }}
                      className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-2 grid grid-cols-2 gap-2">
                  <Button asChild variant="glass" size="sm">
                    <a href={portfolio.resume.url} target="_blank" rel="noreferrer">
                      Resume
                    </a>
                  </Button>
                  <Button asChild variant="hero" size="sm">
                    <Link to="/contact" onClick={() => setOpen(false)}>
                      Hire Me
                    </Link>
                  </Button>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
        <CommandInput placeholder="Search pages, projects and articles…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {portfolio.nav.map((item) => (
              <CommandItem key={item.href} value={item.label} onSelect={() => go(item.href)}>
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Projects">
            {portfolio.projects.map((p) => (
              <CommandItem
                key={p.slug}
                value={p.title}
                onSelect={() => go(`/projects/${p.slug}`)}
              >
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Writing">
            {portfolio.blogs.map((b) => (
              <CommandItem key={b.slug} value={b.title} onSelect={() => go(`/blog/${b.slug}`)}>
                {b.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

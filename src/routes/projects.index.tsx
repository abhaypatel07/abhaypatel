import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { PageTransition, Reveal, SectionHeading } from "@/components/site/reveal";
import { ProjectCard } from "@/components/site/project-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const title = `Projects — ${portfolio.personal.name}`;
const description =
  "AI, machine learning, data analytics, backend and full stack case studies with problem, architecture and results.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const projects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return portfolio.projects.filter((p) => {
      const matchesFilter = filter === "All" || p.tags.includes(filter);
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Projects" title="Case studies" description={description} />

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-2">
            {portfolio.projectFilters.map((f) => (
              <li key={f}>
                <button
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs transition-all",
                    filter === f
                      ? "gradient-accent border-transparent text-primary-foreground"
                      : "border-glass-border bg-glass text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>
          <div className="relative w-full lg:w-72">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="h-11 rounded-full border-glass-border bg-glass pl-9"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        {projects.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">No projects match those filters.</p>
        ) : null}
      </div>
    </PageTransition>
  );
}

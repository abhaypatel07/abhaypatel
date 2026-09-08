import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { getIcon } from "@/lib/icons";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { Spotlight } from "@/components/site/spotlight";
import { Input } from "@/components/ui/input";

export function Skills() {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return portfolio.skills;
    return portfolio.skills
      .map((g) => ({ ...g, items: g.items.filter((i) => i.name.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0 || g.category.toLowerCase().includes(q));
  }, [query]);

  return (
    <section id="skills" className="section-y mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Skills"
          title="A stack built for data and product"
          description="Depth in Python, SQL and analytics, paired with production full stack and backend delivery."
        />
        <Reveal delay={0.1} className="w-full md:w-72">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills…"
              aria-label="Search skills"
              className="h-11 rounded-full border-glass-border bg-glass pl-9"
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => {
          const Icon = getIcon(group.icon);
          return (
            <Reveal key={group.category} delay={(i % 3) * 0.07}>
              <Spotlight className="glass-card h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="glass grid h-10 w-10 place-items-center rounded-xl text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base font-semibold">{group.category}</h3>
                </div>
                <ul className="mt-5 grid gap-3.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground/90">{item.name}</span>
                        <span className="font-mono text-muted-foreground">{item.level}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="gradient-accent h-full rounded-full transition-[width] duration-700"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </Reveal>
          );
        })}
      </div>
      {groups.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No skills match that search.</p>
      ) : null}
    </section>
  );
}

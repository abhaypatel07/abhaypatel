import { Github, Star } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/site/reveal";
import { Spotlight } from "@/components/site/spotlight";
import { Button } from "@/components/ui/button";

export function GithubSection() {
  const gh = portfolio.github;

  return (
    <div className="grid gap-4">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gh.repos.map((repo, i) => (
          <Reveal as="li" key={repo.name} delay={(i % 3) * 0.06}>
            <Spotlight className="glass-card h-full p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 truncate font-mono text-sm font-medium">{repo.name}</h3>
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5" />
                  {repo.stars}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {repo.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="gradient-accent h-2 w-2 rounded-full" />
                  {repo.language}
                </span>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  View repo
                </a>
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <div className="glass-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Contribution activity</p>
            <p className="mt-1 text-xs text-muted-foreground">{gh.contributionsNote}</p>
            <div
              aria-hidden
              className="mt-4 grid grid-flow-col grid-rows-7 gap-1 overflow-hidden"
            >
              {Array.from({ length: 182 }).map((_, i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-[3px] bg-primary"
                  style={{ opacity: 0.08 + ((i * 37) % 9) / 11 }}
                />
              ))}
            </div>
          </div>
          <Button asChild variant="glass" className="shrink-0">
            <a href={gh.profileUrl} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              @{gh.username}
            </a>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

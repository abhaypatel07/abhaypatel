import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";

import { projectImage, type Project } from "@/lib/portfolio";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/site/spotlight";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Spotlight className="glass-card group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={projectImage(project.image)}
          alt={`${project.title} preview`}
          loading="lazy"
          width={1280}
          height={800}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent" />
        <span className="glass absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <li
              key={t}
              className="rounded-md border border-glass-border bg-glass px-2 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button asChild size="sm" variant="hero">
            <Link to="/projects/$slug" params={{ slug: project.slug }}>
              Case Study
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="glass">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              Code
            </a>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <a href={project.demo} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          </Button>
        </div>
      </div>
    </Spotlight>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Github, Globe } from "lucide-react";

import { getProject, portfolio, projectImage, type Project } from "@/lib/portfolio";
import { PageTransition, Reveal, SectionHeading } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project: project as Project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.project.title} — ${portfolio.personal.name}`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.project.summary },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.project.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  component: ProjectDetail,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="glass-card p-6 sm:p-8">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </Reveal>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const tech = project.tech as string[];
  const features = project.features as string[];
  const challenges = project.challenges as string[];
  const results = project.results as string[];

  return (
    <PageTransition>
      <article className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <SectionHeading eyebrow={project.category} title={project.title} className="mt-6" />
        <p className="mt-4 max-w-3xl text-muted-foreground">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="hero">
            <a href={project.demo} target="_blank" rel="noreferrer">
              <Globe className="h-4 w-4" /> Live Demo
            </a>
          </Button>
          <Button asChild variant="glass">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>

        <Reveal className="glass-card mt-10 overflow-hidden">
          <img
            src={projectImage(project.image)}
            alt={`${project.title} screenshot`}
            loading="lazy"
            width={1280}
            height={800}
            className="w-full object-cover"
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Block title="Problem">{project.problem}</Block>
          <Block title="Solution">{project.solution}</Block>
          <Block title="Architecture">{project.architecture}</Block>
          <Block title="Technology Stack">
            <ul className="flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-glass-border bg-glass px-2 py-1 font-mono text-[11px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Requirements & Features">
            <ul className="grid gap-2">
              {features.map((f) => (
                <li key={f}>— {f}</li>
              ))}
            </ul>
          </Block>
          <Block title="Challenges">
            <ul className="grid gap-2">
              {challenges.map((c) => (
                <li key={c}>— {c}</li>
              ))}
            </ul>
          </Block>
          <Block title="Results">
            <ul className="grid gap-2">
              {results.map((r) => (
                <li key={r}>— {r}</li>
              ))}
            </ul>
          </Block>
          <Block title="Lessons Learned">{project.lessons}</Block>
        </div>
      </article>
    </PageTransition>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { GithubSection } from "@/components/sections/github";
import { Achievements } from "@/components/sections/achievements";
import { ProjectCard } from "@/components/site/project-card";
import { PageTransition, Reveal, SectionHeading } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: portfolio.seo.defaultTitle },
      { name: "description", content: portfolio.seo.defaultDescription },
      { property: "og:title", content: portfolio.seo.defaultTitle },
      { property: "og:description", content: portfolio.seo.defaultDescription },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const featured = portfolio.projects.filter((p) => p.featured);

  return (
    <PageTransition>
      <Hero />
      <Stats />

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title={portfolio.about.subheading}
          description={portfolio.about.summary[0]}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.about.facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06}>
              <div className="glass-card h-full p-5">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">{f.label}</p>
                <p className="mt-2 text-sm font-medium">{f.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="mt-6">
          <Button asChild variant="glass">
            <Link to="/about">
              Read the full story <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've delivered"
          description="Banking-scale data work at TCS, plus full stack product delivery for clients."
        />
        <div className="mt-10">
          <Timeline />
        </div>
        <Reveal delay={0.1} className="mt-6">
          <Button asChild variant="glass">
            <Link to="/experience">
              Full experience <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      <Skills />

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work"
          description="Selected case studies across AI, machine learning and data analytics."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8">
          <Button asChild variant="glass">
            <Link to="/projects">
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={portfolio.services.subheading}
          description="Freelance engagements across AI, analytics and full stack delivery."
        />
        <div className="mt-10">
          <ServicesGrid limit={6} />
        </div>
        <Reveal delay={0.1} className="mt-8">
          <Button asChild variant="glass">
            <Link to="/services">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Open Source" title="On GitHub" />
        <div className="mt-10">
          <GithubSection />
        </div>
      </section>

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Achievements" title="Track record" />
        <div className="mt-10">
          <Achievements />
        </div>
      </section>

      <section className="section-y mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What people say" />
        <div className="mt-10">
          <Testimonials />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-card glow-primary relative overflow-hidden p-8 text-center sm:p-14">
            <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">
              <span className="gradient-text">{portfolio.contact.heading}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
              {portfolio.contact.subheading}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Start a conversation</Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link to="/resume">View resume</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}

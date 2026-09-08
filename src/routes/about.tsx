import { createFileRoute } from "@tanstack/react-router";

import { portfolio, portrait } from "@/lib/portfolio";
import { PageTransition, Reveal, SectionHeading } from "@/components/site/reveal";
import { Timeline } from "@/components/sections/timeline";
import { Spotlight } from "@/components/site/spotlight";

const title = `About — ${portfolio.personal.name}`;
const description =
  "The career story behind Abhay Patel: banking data analytics at TCS, AI/ML projects and full stack product engineering.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="About" title={portfolio.about.heading} />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="grid gap-5">
            {portfolio.about.summary.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <blockquote className="glass-card border-l-2 border-l-primary p-6 text-sm leading-relaxed">
              {portfolio.about.philosophy}
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card overflow-hidden">
              <img
                src={portrait}
                alt={portfolio.personal.name}
                loading="lazy"
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <section className="section-y">
          <SectionHeading eyebrow="Career" title="Timeline" />
          <div className="mt-10">
            <Timeline detailed />
          </div>
        </section>

        <section className="pb-8">
          <SectionHeading eyebrow="Education" title="Learning path" />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {portfolio.education.map((e, i) => (
              <Reveal as="li" key={e.degree} delay={i * 0.07}>
                <Spotlight className="glass-card h-full p-6">
                  <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
                  <h3 className="mt-2 font-display text-base font-semibold">{e.degree}</h3>
                  <p className="mt-1 text-sm text-primary">{e.institution}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{e.detail}</p>
                </Spotlight>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="pb-8">
          <SectionHeading eyebrow="Certificates" title="Credentials" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portfolio.certificates.map((c, i) => (
              <Reveal as="li" key={c.name} delay={(i % 4) * 0.06}>
                <a href={c.url} target="_blank" rel="noreferrer" className="block h-full">
                  <Spotlight className="glass-card h-full p-5">
                    <p className="font-mono text-xs text-muted-foreground">{c.year}</p>
                    <h3 className="mt-2 text-sm font-medium">{c.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
                  </Spotlight>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading eyebrow="Beyond work" title="Interests" />
          <ul className="mt-8 flex flex-wrap gap-2">
            {portfolio.about.interests.map((i) => (
              <li key={i} className="glass rounded-full px-4 py-2 text-sm text-muted-foreground">
                {i}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageTransition>
  );
}

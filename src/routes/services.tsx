import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { PageTransition, Reveal, SectionHeading } from "@/components/site/reveal";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Spotlight } from "@/components/site/spotlight";
import { Button } from "@/components/ui/button";

const title = `Services — ${portfolio.personal.name}`;
const description =
  "Freelance AI development, machine learning, data analytics, dashboards, Python automation, backend and full stack engineering services.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const s = portfolio.services;
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Services" title={s.subheading} description={description} />
        <div className="mt-10">
          <ServicesGrid />
        </div>

        <section className="section-y">
          <SectionHeading eyebrow="Process" title="How we work together" />
          <ol className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {s.process.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 0.06}>
                <Spotlight className="glass-card h-full p-5">
                  <p className="gradient-text font-display text-2xl font-semibold">{step.step}</p>
                  <h3 className="mt-3 text-sm font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </Spotlight>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="pb-8">
          <SectionHeading eyebrow="Engagement" title="Pricing" />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {s.pricing.map((p, i) => (
              <Reveal as="li" key={p.plan} delay={i * 0.07}>
                <Spotlight
                  className={
                    "glass-card h-full p-6" + ("highlighted" in p ? " glow-primary" : "")
                  }
                >
                  <p className="text-sm font-semibold">{p.plan}</p>
                  <p className="gradient-text mt-2 font-display text-2xl font-semibold">
                    {p.price}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
                  <ul className="mt-5 grid gap-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Reveal>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading eyebrow="Why me" title="What you get" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {s.whyMe.map((w) => (
              <li key={w} className="glass-card flex items-start gap-3 p-5 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {w}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">Discuss your project</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { PageTransition, Reveal, SectionHeading } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

const title = `Resume — ${portfolio.personal.name}`;
const description =
  "Download the resume of Abhay Patel, Software Engineer specialising in AI/ML, data analytics, backend and full stack development.";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/resume" },
    ],
    links: [{ rel: "canonical", href: "/resume" }],
  }),
  component: ResumePage,
});

function ResumePage() {
  const r = portfolio.resume;
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Resume" title={r.heading} description={r.subheading} />

        <Reveal className="glass-card mt-10 p-6 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="font-mono text-sm text-primary">{r.fileName}</p>
              <p className="mt-1 text-xs text-muted-foreground">{r.updated}</p>
              <ul className="mt-6 grid gap-2.5">
                {r.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="gradient-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <Button asChild variant="hero" size="lg">
              <a href={r.url} target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>

          <div className="mt-8 grid aspect-[4/3] w-full place-items-center rounded-2xl border border-dashed border-glass-border bg-glass text-center">
            <div className="px-6">
              <FileText className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 text-sm font-medium">Resume preview</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Replace the placeholder URL in portfolio.json to embed the live PDF preview.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}

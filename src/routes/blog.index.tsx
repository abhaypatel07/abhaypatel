import { createFileRoute, Link } from "@tanstack/react-router";

import { formatDate, portfolio } from "@/lib/portfolio";
import { PageTransition, Reveal, SectionHeading } from "@/components/site/reveal";
import { Spotlight } from "@/components/site/spotlight";

const title = `Blog — ${portfolio.personal.name}`;
const description =
  "Technical writing on SQL performance, shipping LLM features, Python automation and moving between full stack and data engineering.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Writing" title="Notes from the work" description={description} />
        <ul className="mt-10 grid gap-4">
          {portfolio.blogs.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.05}>
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
                <Spotlight className="glass-card p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-mono">{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-semibold">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-glass-border bg-glass px-2 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </PageTransition>
  );
}

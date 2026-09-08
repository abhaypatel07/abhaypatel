import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { formatDate, getPost, portfolio, type BlogPost } from "@/lib/portfolio";
import { PageTransition } from "@/components/site/reveal";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post: post as BlogPost };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.post.title} — ${portfolio.personal.name}`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.post.excerpt },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.post.title,
            datePublished: loaderData.post.date,
            author: { "@type": "Person", name: portfolio.personal.name },
          }),
        },
      ],
    };
  },
  component: BlogPost_,
});

function renderMarkdown(md: string) {
  const blocks = md.split("\n\n");
  return blocks.map((block, i) => {
    if (block.startsWith("```")) {
      const code = block.replace(/```[a-z]*\n?/g, "").trimEnd();
      return (
        <pre
          key={i}
          className="glass-card overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-primary"
        >
          <code>{code}</code>
        </pre>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="font-display text-lg font-semibold">
          {block.slice(4)}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="font-display text-2xl font-semibold">
          {block.slice(3)}
        </h2>
      );
    }
    if (/^[-\d]/.test(block) && block.includes("\n")) {
      return (
        <ul key={i} className="grid gap-2 text-muted-foreground">
          {block.split("\n").map((line) => (
            <li key={line}>{line.replace(/^[-\d.]+\s*/, "").replace(/\*\*/g, "")}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="leading-relaxed text-muted-foreground">
        {block.replace(/\*\*/g, "")}
      </p>
    );
  });
}

function BlogPost_() {
  const { post } = Route.useLoaderData();

  return (
    <PageTransition>
      <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>
        <p className="mt-8 font-mono text-xs text-muted-foreground">
          {formatDate(post.date)} · {post.readTime}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl">
          <span className="gradient-text">{post.title}</span>
        </h1>
        <div className="mt-10 grid gap-6">{renderMarkdown(post.content)}</div>
      </article>
    </PageTransition>
  );
}

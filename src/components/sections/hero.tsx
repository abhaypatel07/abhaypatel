import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Download, Sparkles } from "lucide-react";

import { portfolio, portrait } from "@/lib/portfolio";
import { Button } from "@/components/ui/button";
import { Typing } from "@/components/site/motion-bits";

const hero = portfolio.hero;

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 md:pt-16 md:pb-28 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {hero.badge}
          </span>

          <p className="mt-8 font-mono text-sm text-muted-foreground">{hero.greeting}</p>
          <h1 className="mt-2 font-display text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl lg:text-7xl">
            {hero.name}
          </h1>
          <p className="mt-4 min-h-[2.4em] font-display text-2xl font-semibold sm:text-4xl">
            <Typing words={hero.roles} />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.intro}
          </p>

          <ul className="mt-6 grid gap-2">
            {hero.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="gradient-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <a href={hero.primaryCta.href} target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" />
                {hero.primaryCta.label}
              </a>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to={hero.tertiaryCta.href}>{hero.tertiaryCta.label}</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="gradient-accent absolute -inset-4 rounded-[2.5rem] opacity-25 blur-3xl" />
          <div className="glass-card relative overflow-hidden rounded-[2rem]">
            <img
              src={portrait}
              alt={`${portfolio.personal.name}, ${portfolio.personal.role}`}
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card to-transparent p-5 pt-16">
              <p className="font-display text-sm font-semibold">{portfolio.personal.role}</p>
              <p className="text-xs text-muted-foreground">
                {portfolio.personal.company} · {portfolio.personal.location}
              </p>
            </div>
          </div>
          <div className="glass absolute -bottom-6 -left-4 rounded-2xl px-4 py-3 text-xs sm:-left-8">
            <p className="font-mono text-primary">{portfolio.personal.tagline}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

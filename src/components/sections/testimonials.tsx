import { Quote, Star } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/site/reveal";
import { Spotlight } from "@/components/site/spotlight";

export function Testimonials() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {portfolio.testimonials.map((t, i) => (
        <Reveal as="li" key={t.name} delay={(i % 2) * 0.08}>
          <Spotlight className="glass-card h-full p-6">
            <Quote className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="gradient-accent grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold text-primary-foreground">
                {t.avatar}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{t.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </p>
              </div>
              <span className="ml-auto flex shrink-0 gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3 w-3 fill-primary text-primary" />
                ))}
              </span>
            </div>
          </Spotlight>
        </Reveal>
      ))}
    </ul>
  );
}

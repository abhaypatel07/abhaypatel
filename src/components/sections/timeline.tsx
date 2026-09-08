import { portfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/site/reveal";
import { Spotlight } from "@/components/site/spotlight";

export function Timeline({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="relative grid gap-6 border-l border-glass-border pl-6 sm:pl-10">
      {portfolio.experience.map((job, i) => (
        <Reveal as="li" key={job.company + job.period} delay={i * 0.08} className="relative">
          <span className="gradient-accent absolute top-8 -left-[1.85rem] h-3 w-3 rounded-full ring-4 ring-background sm:-left-[2.85rem]" />
          <Spotlight className="glass-card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold">{job.role}</h3>
                <p className="mt-1 text-sm text-primary">{job.company}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p className="font-mono">{job.period}</p>
                <p>{job.location}</p>
              </div>
            </div>

            <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
              {job.domain}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>

            <ul className="mt-5 grid gap-2.5">
              {(detailed ? job.points : job.points.slice(0, 4)).map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>

            {detailed ? (
              <div className="mt-6 rounded-xl border border-glass-border bg-glass p-4">
                <p className="text-xs font-semibold tracking-wide uppercase">Key achievements</p>
                <ul className="mt-3 grid gap-2">
                  {job.achievements.map((a) => (
                    <li key={a} className="text-sm text-muted-foreground">
                      — {a}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {job.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-glass-border bg-glass px-2 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>
      ))}
    </ol>
  );
}

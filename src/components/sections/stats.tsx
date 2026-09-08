import { portfolio } from "@/lib/portfolio";
import { Counter } from "@/components/site/motion-bits";
import { Reveal } from "@/components/site/reveal";
import { Spotlight } from "@/components/site/spotlight";

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {portfolio.stats.map((stat, i) => (
          <Reveal as="li" key={stat.label} delay={i * 0.05}>
            <Spotlight className="glass-card h-full p-5">
              <p className="font-display text-3xl font-semibold">
                <span className="gradient-text">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </Spotlight>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

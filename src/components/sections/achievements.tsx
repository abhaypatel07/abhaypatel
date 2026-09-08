import { portfolio } from "@/lib/portfolio";
import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/site/reveal";
import { Spotlight } from "@/components/site/spotlight";

export function Achievements() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {portfolio.achievements.map((a, i) => {
        const Icon = getIcon(a.icon);
        return (
          <Reveal as="li" key={a.title} delay={(i % 3) * 0.07}>
            <Spotlight className="glass-card h-full p-6">
              <span className="glass grid h-11 w-11 place-items-center rounded-xl text-primary">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
            </Spotlight>
          </Reveal>
        );
      })}
    </ul>
  );
}

import { portfolio } from "@/lib/portfolio";
import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/site/reveal";
import { Spotlight } from "@/components/site/spotlight";

export function ServicesGrid({ limit }: { limit?: number }) {
  const items = limit ? portfolio.services.items.slice(0, limit) : portfolio.services.items;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, i) => {
        const Icon = getIcon(service.icon);
        return (
          <Reveal as="li" key={service.title} delay={(i % 3) * 0.07}>
            <Spotlight className="glass-card h-full p-6">
              <span className="glass grid h-11 w-11 place-items-center rounded-xl text-primary">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-4 grid gap-1.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="font-mono text-[11px] text-muted-foreground">
                    · {d}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        );
      })}
    </ul>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { portfolio } from "@/lib/portfolio";
import { getIcon } from "@/lib/icons";
import { PageTransition, Reveal, SectionHeading } from "@/components/site/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { Toaster } from "@/components/ui/sonner";

const title = `Contact — ${portfolio.personal.name}`;
const description =
  "Get in touch with Abhay Patel for freelance projects, AI and data analytics work, or full-time software engineering roles.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const c = portfolio.contact;
  const items = [
    { icon: Mail, label: "Email", value: c.email },
    { icon: Phone, label: "Phone", value: c.phone },
    { icon: MapPin, label: "Location", value: c.location },
    { icon: Clock, label: "Availability", value: c.availability },
  ];

  return (
    <PageTransition>
      <Toaster />
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Contact" title={c.heading} description={c.subheading} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="grid gap-4">
            <ul className="grid gap-3">
              {items.map((item) => (
                <li key={item.label} className="glass-card flex items-start gap-4 p-5">
                  <span className="glass grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs tracking-wide text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm break-words">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="glass-card p-5">
              <p className="text-sm font-medium">{c.responseTime}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.calendarNote}</p>
            </div>

            <div className="glass-card grid aspect-[16/9] place-items-center border-dashed p-5 text-center text-xs text-muted-foreground">
              {c.mapNote}
            </div>

            <ul className="flex flex-wrap gap-2">
              {portfolio.social.map((s) => {
                const Icon = getIcon(s.icon);
                return (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="glass grid h-11 w-11 place-items-center rounded-xl text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}

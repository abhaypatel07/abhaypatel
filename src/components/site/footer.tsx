import { Link } from "@tanstack/react-router";
import { portfolio } from "@/lib/portfolio";
import { getIcon } from "@/lib/icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-glass-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="gradient-accent grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-primary-foreground">
              {portfolio.personal.logo}
            </span>
            <span className="font-display text-sm font-semibold">{portfolio.personal.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {portfolio.personal.tagline} — {portfolio.footer.note}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {portfolio.social.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="glass grid h-10 w-10 place-items-center rounded-xl text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Quick Links</h3>
          <ul className="mt-4 grid gap-2.5">
            {portfolio.footer.quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
            <li>
              <a className="hover:text-foreground" href={`mailto:${portfolio.contact.email}`}>
                {portfolio.contact.email}
              </a>
            </li>
            <li>{portfolio.contact.phone}</li>
            <li>{portfolio.contact.location}</li>
            <li className="text-xs">
              {portfolio.misc.visitorNote}: {portfolio.misc.visitorCount.toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-glass-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          {portfolio.footer.copyright}
        </p>
      </div>
    </footer>
  );
}

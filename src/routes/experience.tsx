import { createFileRoute } from "@tanstack/react-router";

import { portfolio } from "@/lib/portfolio";
import { PageTransition, SectionHeading } from "@/components/site/reveal";
import { Timeline } from "@/components/sections/timeline";
import { Stats } from "@/components/sections/stats";

const title = `Experience — ${portfolio.personal.name}`;
const description =
  "Software Engineer experience at Tata Consultancy Services on the SBI YONO banking platform, plus full stack development for clients.";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Roles, responsibilities and results"
          description="Detailed responsibilities, technologies and achievements across each role."
        />
        <div className="mt-12">
          <Timeline detailed />
        </div>
      </div>
      <Stats />
    </PageTransition>
  );
}

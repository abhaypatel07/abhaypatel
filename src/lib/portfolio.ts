import data from "@/data/portfolio.json";

import aiImg from "@/assets/project-ai.jpg";
import analyticsImg from "@/assets/project-analytics.jpg";
import pipelineImg from "@/assets/project-pipeline.jpg";
import portraitImg from "@/assets/abhay-potrait.png";

export const portfolio = data;

export type Project = (typeof data.projects)[number];
export type BlogPost = (typeof data.blogs)[number];

export const portrait = portraitImg;

const projectImages: Record<string, string> = {
  ai: aiImg,
  analytics: analyticsImg,
  pipeline: pipelineImg,
};

export function projectImage(key: string): string {
  return projectImages[key] ?? analyticsImg;
}

export function getProject(slug: string): Project | undefined {
  return data.projects.find((p) => p.slug === slug);
}

export function getPost(slug: string): BlogPost | undefined {
  return data.blogs.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

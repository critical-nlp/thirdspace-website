"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Users,
  Calendar,
  ArrowRight,
  Brain,
  HeartHandshake,
  Globe,
  Microscope,
  Quote,
  Cpu,
  Scale,
} from "lucide-react";
import contentData from "../../public/config/content.json";

// Map icon names in JSON to Lucide component references
const iconMap = {
  Users: Users,
  Calendar: Calendar,
  Sparkles: Sparkles,
};

// Research keywords for the marquee band
const researchKeywords = [
  "AI Ethics",
  "HCI",
  "Critical Computing",
  "Marginalized Communities",
  "Global Development",
  "Socio-Technical Systems",
  "Participatory Design",
  "Context-Aware AI",
  "Human Values",
  "Situated Knowledge",
];

// Bento grid research domain cards
const bentoItems = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Social, ethical, and political dimensions of computing and AI.",
    className: "md:col-span-2 md:row-span-2",
    accent: "primary",
  },
  {
    icon: HeartHandshake,
    title: "Human-Computer Interaction",
    description: "Design-oriented research at the intersection of HCI and AI.",
    className: "md:col-span-2",
    accent: "accent",
  },
  {
    icon: Globe,
    title: "Critical Computing",
    description: "Centering communities overlooked in mainstream computing.",
    className: "md:col-span-1",
    accent: "primary",
  },
  {
    icon: Microscope,
    title: "Empirical Research",
    description: "Socio-technical systems for responsible AI.",
    className: "md:col-span-1",
    accent: "accent",
  },
  {
    icon: Scale,
    title: "Ethics & Policy",
    description: "How technologies shape everyday life practices.",
    className: "md:col-span-2",
    accent: "primary",
  },
];

export default function Home() {
  const { hero, pillars, about } = contentData;

  return (
    <div className="bg-background">
      {/* Hero — Immersive centered layout with dot grid + bento grid */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Dot grid background (inspired by Vercel Hero / DataGridHero) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Radial glow behind headline */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute left-1/4 top-1/2 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>

        {/* Centered hero content */}
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center md:py-28">
          <Badge
            variant="secondary"
            className="gap-1.5 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-medium text-accent-foreground ring-1 ring-accent/30"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {hero.badge}
          </Badge>

          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>

          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            {hero.description}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 rounded-md bg-primary px-7 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              {hero.primaryActionText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-md border-border px-7"
            >
              {hero.secondaryActionText}
            </Button>
          </div>
        </div>

        {/* Marquee keyword band */}
        <div className="relative border-y border-border bg-muted/40 py-4 overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...researchKeywords, ...researchKeywords].map((keyword, i) => (
              <div key={i} className="flex items-center gap-3 px-6">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  {keyword}
                </span>
                <span className="h-1 w-1 rounded-full bg-primary/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Bento grid of research domains */}
        <div className="relative mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Research Domains
              </h2>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[180px]">
            {bentoItems.map((item, index) => {
              const Icon = item.icon;
              const isPrimary = item.accent === "primary";
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30 ${item.className}`}
                >
                  {/* Hover gradient glow */}
                  <div className={`pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-100 ${isPrimary ? "bg-primary/15" : "bg-accent/15"}`} />

                  <div className="relative flex h-full flex-col justify-between gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isPrimary ? "bg-primary/10 text-primary ring-1 ring-primary/20" : "bg-accent/10 text-accent-foreground ring-1 ring-accent/20"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About the Group section */}
      {about && (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Quote className="h-5 w-5 text-primary" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {about.title}
                </h2>
              </div>
              <p className="text-pretty text-base leading-relaxed text-foreground sm:text-lg md:text-xl">
                {about.body}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pillars */}
      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap] || Sparkles;
            return (
              <Card key={pillar.id} className="border-border bg-card">
                <CardHeader>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-foreground">{pillar.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {pillar.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
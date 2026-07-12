"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  MapPin,
  Network,
  Orbit,
  BookOpenCheck,
  MoveUpRight,
} from "lucide-react";
import contentData from "../../public/config/content.json";
import { getAssetPath } from "@/lib/utils";

// Map icon name strings (from JSON) to Lucide component references
const iconMap = {
  Users: Users,
  Calendar: Calendar,
  Sparkles: Sparkles,
  Brain: Brain,
  HeartHandshake: HeartHandshake,
  Globe: Globe,
  Microscope: Microscope,
  Scale: Scale,
};

export default function Home() {
  const { hero, pillars, about, marquee, groupOverview, professor, researchDomains } = contentData;

  return (
    <div className="bg-background">
      {/* Hero — Immersive centered layout with dot grid + bento grid */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Dot grid background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Radial glow behind headline */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute left-1/4 top-1/2 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>

        {/* Editorial hero content */}
        <div className="relative mx-auto w-full max-w-7xl px-6 py-14 md:py-20">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-card/75 p-6 shadow-2xl shadow-primary/10 backdrop-blur md:p-10 lg:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_54%,var(--accent)_54%,transparent_55%)] opacity-25" />
              <div className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full border border-primary/10 bg-primary/5" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-primary/5 to-transparent" />

              <div className="relative flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/80 px-3 py-1.5 text-[0.65rem] font-mono uppercase tracking-[0.26em] text-primary shadow-sm">
                    <Orbit className="h-3.5 w-3.5" />
                    {hero.badge}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-[0.65rem] font-mono uppercase tracking-[0.22em] text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {hero.locationChip}
                  </span>
                </div>

                <div className="max-w-5xl space-y-3 tracking-[-0.055em] text-foreground">
                  <h1 className="text-balance text-5xl font-semibold leading-[0.86] sm:text-6xl md:text-7xl lg:text-[6.8rem]">
                    {hero.headlineLine1}
                  </h1>
                  <h2 className="text-balance text-4xl font-semibold leading-[0.9] text-foreground/88 sm:text-5xl md:text-6xl lg:text-[5.2rem]">
                    {hero.headlineLine2}
                  </h2>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <span className="h-px w-24 bg-primary/35" />
                    <h3 className="text-balance text-3xl font-semibold leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                      {hero.headlineLine3}
                    </h3>
                  </div>
                </div>

                <div className="grid gap-5 border-t border-border/80 pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                  <p className="max-w-2xl text-pretty text-sm leading-7 text-muted-foreground md:text-base">
                    {hero.subParagraph}
                  </p>
                  <Button
                    asChild
                    className="h-12 w-fit rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                  >
                    <a href="#about-group">
                      {hero.primaryActionText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <aside className="relative grid gap-4 lg:pb-4">
              <div className="rounded-[1.75rem] border border-border bg-primary p-5 text-primary-foreground shadow-2xl shadow-primary/20">
                <div className="mb-10 flex items-center justify-between text-primary-foreground/70">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em]">
                    {hero.researchPostureLabel}
                  </span>
                  <Network className="h-4 w-4" />
                </div>
                <p className="text-pretty text-2xl font-medium leading-tight tracking-[-0.04em]">
                  {hero.researchPostureBody}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group rounded-[1.5rem] border border-border bg-card p-4 shadow-sm transition-transform hover:-translate-y-1">
                  <BookOpenCheck className="mb-8 h-5 w-5 text-primary" />
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {hero.methodsLabel}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-snug text-foreground">
                    {hero.methodsValue}
                  </p>
                </div>
                <div className="group rounded-[1.5rem] border border-accent/45 bg-accent/40 p-4 shadow-sm transition-transform hover:-translate-y-1">
                  <MoveUpRight className="mb-8 h-5 w-5 text-accent-foreground" />
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent-foreground/70">
                    {hero.focusLabel}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-snug text-accent-foreground">
                    {hero.focusValue}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Marquee keyword band */}
        <div className="relative overflow-hidden border-y border-border bg-muted/40 py-4">
          <div className="flex w-max animate-marquee">
            {[...marquee.keywords, ...marquee.keywords].map((keyword, i) => (
              <div key={i} className="flex items-center gap-3 px-6">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                  {keyword}
                </span>
                <span className="h-1 w-1 rounded-full bg-primary/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Group overview */}
        <div id="about-group" className="relative scroll-mt-24 px-6 py-14 md:py-18">
          <div className="relative mx-auto max-w-6xl">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_20%_20%,var(--accent),transparent_26%),radial-gradient(circle_at_85%_15%,var(--primary),transparent_24%)] opacity-15 blur-3xl" />
            <div className="relative overflow-visible rounded-[2rem] border border-primary/15 bg-card/85 shadow-2xl shadow-primary/10 backdrop-blur">
              <div className="pointer-events-none absolute right-6 top-6 h-48 w-48 rounded-full border border-primary/10 bg-primary/5" />

              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="relative p-6 md:p-9 lg:p-10">
                  <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-5">
                    <div>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">
                        {groupOverview.eyebrow}
                      </span>
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
                        {groupOverview.headline}
                      </h2>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-primary ring-4 ring-primary/10" />
                      {groupOverview.locationChip}
                    </span>
                  </div>

                  <p className="text-pretty text-base leading-8 text-foreground/90 md:text-lg md:leading-9">
                    {groupOverview.body.split(professor.name)[0]}
                    <a
                      href={professor.website}
                      target="_blank"
                      rel="noreferrer"
                      className="group/ishtiaque relative inline-flex items-baseline font-semibold text-primary underline decoration-accent/70 decoration-2 underline-offset-4 transition-colors after:absolute after:left-0 after:top-full after:h-8 after:w-72 after:content-[''] hover:text-primary/80"
                      aria-label={`Visit ${professor.name}'s website`}
                    >
                      {professor.name}
                      <span className="invisible pointer-events-auto absolute left-0 top-full z-50 mt-4 w-72 translate-y-3 rounded-[1.5rem] border border-primary/15 bg-card p-3 opacity-0 shadow-2xl shadow-primary/20 transition-all delay-300 duration-300 before:absolute before:-top-4 before:left-0 before:h-4 before:w-full before:content-[''] group-hover/ishtiaque:visible group-hover/ishtiaque:translate-y-1 group-hover/ishtiaque:opacity-100 group-hover/ishtiaque:delay-75">
                        <span className="block relative h-52 w-full overflow-hidden rounded-[1.1rem] bg-muted">
                          <Image
                            src={getAssetPath(professor.imagePath)}
                            alt={professor.name}
                            fill
                            sizes="288px"
                            className="object-cover transition-transform duration-500 group-hover/ishtiaque:scale-105"
                          />
                        </span>
                        <span className="mt-3 flex items-center justify-between gap-3 px-1 text-left">
                          <span>
                            <span className="block text-sm font-semibold text-foreground">
                              {professor.name}
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                              {professor.title}<br />
                              {professor.department}<br />
                              {professor.institution}<br />
                              {professor.role}
                            </span>
                          </span>
                          <MoveUpRight className="h-4 w-4 text-primary" />
                        </span>
                      </span>
                    </a>
                    {groupOverview.body.split(professor.name)[1]}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {groupOverview.focusCards.map((item, index) => {
                      const Icon = iconMap[item.icon as keyof typeof iconMap] || Globe;

                      return (
                        <div
                          key={item.title}
                          className="group/focus relative min-h-36 overflow-hidden rounded-[1.4rem] border border-primary/10 bg-background/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-card hover:shadow-xl hover:shadow-primary/10"
                        >
                          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 transition-transform duration-500 group-hover/focus:scale-125" />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-40" />

                          <div className="relative flex h-full flex-col justify-between gap-6">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/10 bg-primary/8 text-primary transition-colors group-hover/focus:bg-primary group-hover/focus:text-primary-foreground">
                                <Icon className="h-4 w-4" />
                              </div>
                              <span className="rounded-full border border-border bg-muted/70 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
                                0{index + 1} / {item.label}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold leading-snug tracking-[-0.02em] text-foreground">
                                {item.title}
                              </h3>
                              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <a
                  href={professor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="group/profile relative min-h-[360px] overflow-hidden rounded-b-[2rem] border-t border-border bg-primary text-primary-foreground lg:rounded-bl-none lg:rounded-r-[2rem] lg:border-l lg:border-t-0"
                  aria-label={`Visit ${professor.name}'s website`}
                >
                  <Image
                    src={getAssetPath(professor.imagePath)}
                    alt={professor.name}
                    fill
                    sizes="(min-width: 1024px) 340px, 100vw"
                    className="object-cover opacity-80 transition duration-700 group-hover/profile:scale-105 group-hover/profile:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] backdrop-blur">
                    {groupOverview.glanceLabel}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="rounded-[1.4rem] border border-white/15 bg-white/12 p-4 backdrop-blur-md transition-transform duration-300 group-hover/profile:-translate-y-1">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary-foreground/70">
                            {professor.title}
                          </p>
                          <p className="mt-1 text-xl font-semibold tracking-[-0.03em]">
                            {professor.name}
                          </p>
                        </div>
                        <MoveUpRight className="h-5 w-5" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-primary-foreground/78">
                        {professor.department}, {professor.institution}.<br />
                        {professor.role}.
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bento grid of research domains */}
        <div className="relative mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {researchDomains.sectionLabel}
              </h2>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {researchDomains.statusLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[180px]">
            {researchDomains.items.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Globe;
              const isPrimary = item.accent === "primary";
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30 ${item.colSpan}`}
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

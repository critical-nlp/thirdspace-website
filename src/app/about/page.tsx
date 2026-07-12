import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import type { Metadata } from "next";

import contentData from "../../../public/config/content.json";

export const metadata: Metadata = {
  title: contentData.aboutPage.pageTitle,
  description: contentData.aboutPage.subhead,
};

export default function AboutPage() {
  const { aboutPage, researchLabs, campuses } = contentData;

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
          <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {aboutPage.eyebrow}
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Vol. 01 · University of Toronto
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            <h1 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-foreground lg:col-span-8">
              {aboutPage.headline}
            </h1>
            <p className="max-w-prose text-pretty text-base leading-7 text-muted-foreground lg:col-span-4 lg:pt-3">
              {aboutPage.subhead}
            </p>
          </div>
        </div>
      </section>

      {/* Mission — numbered, hairline-underlined */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-border pb-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                01
              </span>
              <h2 className="font-heading text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
                {aboutPage.missionTitle}
              </h2>
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-12">
            <p className="max-w-prose border-l border-primary pl-6 font-heading text-xl font-medium leading-snug tracking-[-0.02em] text-foreground sm:text-2xl lg:col-span-7 lg:col-start-2">
              {aboutPage.missionBody}
            </p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-border pb-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                02
              </span>
              <h2 className="font-heading text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
                {aboutPage.approachTitle}
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {aboutPage.approachItems?.length ?? 0} methods
            </span>
          </div>

          <p className="mb-12 max-w-3xl text-pretty text-base leading-7 text-muted-foreground">
            {aboutPage.approachBody}
          </p>

          {aboutPage.approachItems && aboutPage.approachItems.length > 0 && (
            <ol className="border-t border-border">
              {aboutPage.approachItems.map((item, i) => (
                <li
                  key={`${item.title}-${i}`}
                  className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-border py-7 sm:py-8"
                >
                  <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 sm:col-span-3">
                    <h3 className="font-heading text-base font-medium tracking-[-0.015em] text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="col-span-12 max-w-prose text-sm leading-6 text-muted-foreground sm:col-span-8">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-border pb-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                03
              </span>
              <h2 className="font-heading text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
                {aboutPage.storyTitle}
              </h2>
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 text-primary">
                <Quote className="size-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                  Field notes
                </span>
              </div>
            </div>
            <p className="max-w-3xl whitespace-pre-line text-pretty text-base leading-8 text-foreground lg:col-span-9">
              {aboutPage.storyBody}
            </p>
          </div>
          <div className="mt-12">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-primary"
            >
              Get in touch
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related links — two parallel index columns, hairline rows */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 border-b border-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              04 · Affiliations
            </span>
          </div>

          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="mb-4 font-heading text-base font-medium tracking-[-0.015em] text-foreground">
                {researchLabs.title}
              </h3>
              <ul className="border-t border-border">
                {researchLabs.items.map((item, i) => (
                  <li
                    key={`${item.name}-${i}`}
                    className="flex items-center justify-between gap-3 border-b border-border py-3"
                  >
                    {item.url ? (
                      <Link
                        href={item.url}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noreferrer" : undefined}
                        className="group inline-flex flex-1 items-baseline justify-between gap-2 text-sm text-foreground transition-colors hover:text-primary"
                      >
                        <span>{item.name}</span>
                        <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    ) : (
                      <span className="flex-1 text-sm text-muted-foreground">
                        {item.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-heading text-base font-medium tracking-[-0.015em] text-foreground">
                {campuses.title}
              </h3>
              <ul className="border-t border-border">
                {campuses.items.map((campus, i) => (
                  <li
                    key={`${campus.name}-${i}`}
                    className="flex items-center justify-between gap-3 border-b border-border py-3"
                  >
                    <Link
                      href={campus.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex flex-1 items-baseline justify-between gap-2 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <span>{campus.name}</span>
                      <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

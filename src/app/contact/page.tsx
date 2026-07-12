import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

import contentData from "../../../public/config/content.json";

export const metadata: Metadata = {
  title: contentData.contact.pageTitle,
  description: contentData.contact.headline,
};

export default function ContactPage() {
  const { contact, location, socials, professor } = contentData;

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
          <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {contact.eyebrow}
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Response time · 3–5 working days
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            <h1 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-foreground lg:col-span-8">
              {contact.headline}
            </h1>
            <p className="max-w-prose text-pretty text-base leading-7 text-muted-foreground lg:col-span-4 lg:pt-3">
              {contact.body}
            </p>
          </div>
        </div>
      </section>

      {/* Contact index — two hairline rows */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-border pb-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                01
              </span>
              <h2 className="font-heading text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
                Direct channels
              </h2>
            </div>
          </div>

          <ul className="border-t border-border">
            {/* Email */}
            <li className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-b border-border py-7 sm:py-8">
              <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-1">
                01
              </span>
              <div className="col-span-10 flex items-center gap-3 sm:col-span-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <h3 className="font-heading text-base font-medium tracking-[-0.015em] text-foreground">
                  {contact.emailLabel}
                </h3>
              </div>
              <div className="col-span-12 sm:col-span-8">
                <Link
                  href={`mailto:${socials.email}`}
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-foreground underline decoration-primary/40 decoration-1 underline-offset-[5px] transition-colors hover:decoration-primary sm:text-base"
                >
                  {socials.email}
                </Link>
              </div>
            </li>

            {/* Office */}
            <li className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-b border-border py-7 sm:py-8">
              <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-1">
                02
              </span>
              <div className="col-span-10 flex items-center gap-3 sm:col-span-3">
                <MapPin className="size-4 shrink-0 text-primary" />
                <h3 className="font-heading text-base font-medium tracking-[-0.015em] text-foreground">
                  Office
                </h3>
              </div>
              <div className="col-span-12 sm:col-span-8">
                <p className="font-medium text-foreground">{location.institution}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {location.title}
                  <br />
                  {location.street}
                  <br />
                  {location.cityCountry}
                </p>
                <Link
                  href={`https://maps.google.com/?q=${location.mapsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary underline decoration-primary/40 decoration-1 underline-offset-[5px] transition-colors hover:decoration-primary"
                >
                  {location.footerMapLabel}
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </li>

            {/* Lead */}
            <li className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-b border-border py-7 sm:py-8">
              <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-1">
                03
              </span>
              <div className="col-span-10 sm:col-span-3">
                <h3 className="font-heading text-base font-medium tracking-[-0.015em] text-foreground">
                  Principal Investigator
                </h3>
              </div>
              <div className="col-span-12 sm:col-span-8">
                <p className="font-medium text-foreground">{professor.name}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {professor.title}, {professor.department}
                </p>
                {professor.website && (
                  <Link
                    href={professor.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary underline decoration-primary/40 decoration-1 underline-offset-[5px] transition-colors hover:decoration-primary"
                  >
                    Personal site
                    <ArrowUpRight className="size-3" />
                  </Link>
                )}
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Find us online */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-border pb-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                02
              </span>
              <h2 className="font-heading text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
                Find us online
              </h2>
            </div>
          </div>

          <ul className="border-t border-border">
            {socials.xUrl && (
              <li className="flex items-center justify-between gap-4 border-b border-border py-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Twitter / X
                </span>
                <Link
                  href={socials.xUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
                >
                  <span>{socials.xHandle}</span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            )}
            {socials.email && (
              <li className="flex items-center justify-between gap-4 border-b border-border py-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Email
                </span>
                <Link
                  href={`mailto:${socials.email}`}
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  {socials.email}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* Working with us — quote treatment */}
      <section className="bg-muted/30">
        <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-border pb-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                03
              </span>
              <h2 className="font-heading text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
                {contact.connectTitle}
              </h2>
            </div>
          </div>
          <p className="max-w-3xl border-l border-primary pl-6 font-heading text-xl font-medium leading-snug tracking-[-0.02em] text-foreground sm:text-2xl">
            {contact.connectBody}
          </p>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>Prospective students</span>
            <span aria-hidden className="h-3 w-px bg-border" />
            <span>Visiting researchers</span>
            <span aria-hidden className="h-3 w-px bg-border" />
            <span>Community partners</span>
          </div>
        </div>
      </section>
    </main>
  );
}

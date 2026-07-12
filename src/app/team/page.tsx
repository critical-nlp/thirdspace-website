import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import contentData from "../../../public/config/content.json";
import { getAssetPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: contentData.team.pageTitle,
  description: contentData.team.pageBody,
};

type Member = {
  name: string;
  title?: string;
  role?: string;
  focus?: string;
  imagePath?: string;
  links?: { label: string; url: string }[];
};

type AlumniMember = {
  name: string;
  role?: string;
  currentPosition?: string;
  currentAffiliation?: string;
};

/**
 * Editorial member index: portrait + numbered name + role + focus +
 * outbound links. No card chrome — each member is a hairline-divided
 * row inside a role section, reading like a journal masthead.
 */
function MemberRow({ index, member }: { index: number; member: Member }) {
  const homepage = member.links?.find((l) => l.url);
  const otherLinks = member.links?.filter((l) => l.url).slice(1) ?? [];
  const hasImage = !!member.imagePath;

  return (
    <article className="grid grid-cols-12 items-start gap-x-6 gap-y-3 border-t border-border py-7 sm:py-8">
      <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      {hasImage && (
        <div className="col-span-10 sm:col-span-2">
          <div className="relative aspect-square w-20 overflow-hidden bg-muted sm:w-24">
            <Image
              src={getAssetPath(member.imagePath!)}
              alt={member.name}
              fill
              sizes="96px"
              className="object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
            />
          </div>
        </div>
      )}

      <div
        className={
          "col-span-12 " + (hasImage ? "sm:col-span-6" : "sm:col-span-7")
        }
      >
        {homepage ? (
          <Link
            href={homepage.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-baseline gap-1.5 font-heading text-lg font-medium tracking-[-0.02em] text-foreground transition-colors hover:text-primary"
          >
            {member.name}
            <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ) : (
          <p className="font-heading text-lg font-medium tracking-[-0.02em] text-foreground">
            {member.name}
          </p>
        )}
        {(member.title || member.role) && (
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {member.title || member.role}
          </p>
        )}
        {member.focus && (
          <p className="mt-3 max-w-prose text-sm leading-6 text-muted-foreground">
            {member.focus}
          </p>
        )}
      </div>

      <div
        className={
          "col-span-12 " + (hasImage ? "sm:col-span-3" : "sm:col-span-4")
        }
      >
        {otherLinks.length > 0 && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {otherLinks.map((link, idx) => (
              <li key={`${link.label}-${idx}`}>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                  <ArrowUpRight className="size-2.5" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function RoleSection({
  index,
  role,
  members,
}: {
  index: number;
  role: string;
  members: Member[];
}) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-border pb-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {String(index).padStart(2, "0")}
            </span>
            <h2 className="font-heading text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
              {role}
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {members.length === 0 ? "—" : `${members.length} members`}
          </span>
        </div>

        {members.length === 0 ? (
          <p className="py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Open positions · announcements coming soon
          </p>
        ) : (
          <div>
            {members.map((m, i) => (
              <MemberRow key={`${m.name}-${i}`} index={i} member={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function TeamPage() {
  const { team, professor } = contentData;

  // Lift the PI from the existing professor block into the unified member shape
  const pi: Member = {
    name: professor.name,
    title: professor.title,
    focus: `${professor.department} · ${professor.institution}`,
    imagePath: professor.imagePath,
    links: professor.website
      ? [{ label: "Homepage", url: professor.website }]
      : [],
  };

  const totalMembers = 1 + team.sections.reduce((acc, s) => {
    const list = (s.members ?? []) as Member[];
    return acc + list.length;
  }, 0);

  return (
    <main className="bg-background">
      {/* Hero — meta strip + headline */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
          <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Roster · {new Date().getFullYear()}
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {totalMembers} active members
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {team.sections.length + 1} sections
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            <h1 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-foreground lg:col-span-8">
              {team.pageHeadline}
            </h1>
            <p className="max-w-prose text-pretty text-base leading-7 text-muted-foreground lg:col-span-4 lg:pt-3">
              {team.pageBody}
            </p>
          </div>
        </div>
      </section>

      {/* Principal Investigator */}
      <RoleSection index={1} role="Principal Investigator" members={[pi]} />

      {/* Other role sections */}
      {team.sections.map((section, idx) => (
        <RoleSection
          key={section.role}
          index={idx + 2}
          role={section.role}
          members={(section.members ?? []) as Member[]}
        />
      ))}

      {/* Alumni */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-border pb-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {String(team.sections.length + 2).padStart(2, "0")}
              </span>
              <h2 className="font-heading text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
                {team.alumni.title}
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {((team.alumni.members ?? []) as AlumniMember[]).length === 0
                ? "—"
                : `${(team.alumni.members ?? []).length} alumni`}
            </span>
          </div>

          {((team.alumni.members ?? []) as AlumniMember[]).length === 0 ? (
            <p className="py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              List will be updated as graduates move on
            </p>
          ) : (
            <ul className="border-t border-border">
              {((team.alumni.members ?? []) as AlumniMember[]).map((m, i) => (
                <li
                  key={`${m.name}-${i}`}
                  className="grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-border py-5 sm:py-6"
                >
                  <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 sm:col-span-5">
                    <p className="font-heading text-base font-medium tracking-[-0.015em] text-foreground">
                      {m.name}
                    </p>
                    {m.role && (
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {m.role}
                      </p>
                    )}
                  </div>
                  <p className="col-span-12 text-sm leading-6 text-muted-foreground sm:col-span-6">
                    {[m.currentPosition, m.currentAffiliation]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

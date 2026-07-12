import Image from "next/image";
import Link from "next/link";
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

function initials(name: string): string {
  return name
    .replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberCard({ member }: { member: Member }) {
  const hasImage = !!member.imagePath;
  const homepage = member.links?.find((l) => l.url);
  const otherLinks = member.links?.filter((l) => l.url).slice(1) ?? [];

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {hasImage ? (
          <Image
            src={getAssetPath(member.imagePath!)}
            alt={member.name}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="flex size-full items-center justify-center bg-primary/10 text-3xl font-semibold text-primary"
            aria-hidden
          >
            {initials(member.name)}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        {homepage ? (
          <Link
            href={homepage.url}
            target="_blank"
            rel="noreferrer"
            className="text-base font-semibold text-foreground transition-colors hover:text-primary"
          >
            {member.name}
          </Link>
        ) : (
          <span className="text-base font-semibold text-foreground">
            {member.name}
          </span>
        )}
        {(member.title || member.role) && (
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {member.title || member.role}
          </p>
        )}
        {member.focus && (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {member.focus}
          </p>
        )}
        {otherLinks.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {otherLinks.map((link, idx) => (
              <Link
                key={`${link.label}-${idx}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RoleSection({
  eyebrow,
  role,
  members,
}: {
  eyebrow: string;
  role: string;
  members: Member[];
}) {
  if (!members || members.length === 0) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-baseline gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </span>
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          {role}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((m, i) => (
          <MemberCard key={`${m.name}-${i}`} member={m} />
        ))}
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

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-8 sm:pt-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {team.pageEyebrow}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {team.pageHeadline}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {team.pageBody}
        </p>
      </section>

      {/* Principal Investigator */}
      <RoleSection eyebrow="01" role="Principal Investigator" members={[pi]} />

      {/* Other role sections */}
      {team.sections.map((section, idx) => (
        <RoleSection
          key={section.role}
          eyebrow={String(idx + 2).padStart(2, "0")}
          role={section.role}
          members={section.members as Member[]}
        />
      ))}

      {/* Alumni */}
      {team.alumni.members && team.alumni.members.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="mb-8 flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {team.alumni.title}
            </span>
          </div>
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {(team.alumni.members as AlumniMember[]).map((m, i) => (
              <li
                key={`${m.name}-${i}`}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <span className="font-medium text-foreground">{m.name}</span>
                  {m.role && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {m.role}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {[m.currentPosition, m.currentAffiliation].filter(Boolean).join(" · ")}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

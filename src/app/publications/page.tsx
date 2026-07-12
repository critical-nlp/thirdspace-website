import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import contentData from "../../../public/config/content.json";
import { getAssetPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: contentData.publications.pageTitle,
  description: contentData.publications.pageHeadline,
};

type Pub = {
  id?: string;
  authors?: string;
  title?: string;
  venue?: string;
  url?: string;
  doi?: string;
  pages?: string;
  articleNumber?: string;
};

type YearBucket = {
  label?: string;
  journalArticles?: Pub[];
  conferenceProceedings?: Pub[];
  extendedAbstracts?: Pub[];
  researchArtifacts?: Pub[];
};

type Book = {
  title?: string;
  authors?: string;
  year?: string;
  description?: string;
  url?: string;
  coverImagePath?: string;
};

function PubRow({ pub }: { pub: Pub }) {
  const titleEl = pub.url ? (
    <Link
      href={pub.url}
      target="_blank"
      rel="noreferrer"
      className="text-foreground underline decoration-primary/30 decoration-1 underline-offset-[5px] transition-colors hover:decoration-primary"
    >
      {pub.title}
    </Link>
  ) : (
    <span className="text-foreground">{pub.title}</span>
  );

  return (
    <li className="grid grid-cols-12 gap-x-4 gap-y-1.5 border-b border-border py-4 text-sm leading-relaxed sm:py-5">
      <div className="col-span-12 sm:col-span-9 sm:pr-6">
        <p className="text-foreground">{pub.authors}</p>
        {pub.title && (
          <p className="mt-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Paper ·{" "}
            </span>
            {titleEl}
          </p>
        )}
        {pub.venue && (
          <p className="mt-1 italic text-muted-foreground">— {pub.venue}</p>
        )}
        {(pub.pages || pub.articleNumber) && (
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {[pub.pages, pub.articleNumber && `Article ${pub.articleNumber}`]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>
      <div className="col-span-12 flex items-start justify-start gap-3 sm:col-span-3 sm:justify-end">
        {pub.doi && (
          <Link
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary underline decoration-primary/30 decoration-1 underline-offset-[5px] transition-colors hover:decoration-primary"
          >
            doi:{pub.doi}
          </Link>
        )}
        {pub.url && (
          <Link
            href={pub.url}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ↗
          </Link>
        )}
      </div>
    </li>
  );
}

function PubSubsection({
  title,
  entries,
}: {
  title: string;
  entries?: Pub[];
}) {
  if (!entries || entries.length === 0) return null;
  return (
    <div className="mb-12 last:mb-0">
      <div className="mb-4 flex items-baseline justify-between gap-6 border-b border-border pb-3">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {title}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {entries.length} entries
        </span>
      </div>
      <ul>
        {entries.map((p, i) => (
          <PubRow key={p.id ?? `${title}-${i}`} pub={p} />
        ))}
      </ul>
    </div>
  );
}

function BookRow({ book, index }: { book: Book; index: number }) {
  return (
    <article className="grid grid-cols-12 items-start gap-x-6 gap-y-3 border-t border-border py-7 sm:py-8">
      <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      {book.coverImagePath ? (
        <div className="col-span-10 sm:col-span-2">
          <div className="relative aspect-[3/4] w-20 overflow-hidden bg-muted sm:w-24">
            <Image
              src={getAssetPath(book.coverImagePath)}
              alt={book.title ?? "Book cover"}
              fill
              sizes="96px"
              className="object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
            />
          </div>
        </div>
      ) : (
        <div className="col-span-10 sm:col-span-2">
          <div className="flex aspect-[3/4] w-20 items-center justify-center bg-muted sm:w-24">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              Book
            </span>
          </div>
        </div>
      )}

      <div
        className={
          "col-span-12 " + (book.coverImagePath ? "sm:col-span-9" : "sm:col-span-9")
        }
      >
        {book.title &&
          (book.url ? (
            <Link
              href={book.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-baseline gap-1.5 font-heading text-lg font-medium tracking-[-0.02em] text-foreground transition-colors hover:text-primary"
            >
              {book.title}
              <span aria-hidden className="opacity-0 transition-opacity group-hover:opacity-100">
                ↗
              </span>
            </Link>
          ) : (
            <p className="font-heading text-lg font-medium tracking-[-0.02em] text-foreground">
              {book.title}
            </p>
          ))}
        {book.authors && (
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {book.authors}
            {book.year ? ` · ${book.year}` : ""}
          </p>
        )}
        {book.description && (
          <p className="mt-3 max-w-prose text-sm leading-6 text-muted-foreground">
            {book.description}
          </p>
        )}
      </div>
    </article>
  );
}

export default function PublicationsPage() {
  const { publications } = contentData;
  const books = (publications.books ?? []) as Book[];
  const years = (publications.years ?? {}) as Record<string, YearBucket>;
  const yearKeys = Object.keys(years).sort((a, b) =>
    a < b ? 1 : a > b ? -1 : 0,
  );

  return (
    <main className="bg-background">
      {/* Hero — matches Home editorial pattern */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
          <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {publications.pageEyebrow}
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Index · {yearKeys.length} {yearKeys.length === 1 ? "year" : "years"}
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            <h1 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-foreground lg:col-span-8">
              {publications.pageHeadline}
            </h1>
            <p className="max-w-prose text-pretty text-base leading-7 text-muted-foreground lg:col-span-4 lg:pt-3">
              Books, journal articles, conference proceedings, and research
              artifacts from the Thirdspace group, indexed by year.
            </p>
          </div>
        </div>
      </section>

      {/* Books */}
      {books.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="mb-6 flex items-baseline justify-between gap-6 border-b border-border pb-4">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  A · Books
                </span>
                <h2 className="font-heading text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
                  Monographs
                </h2>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {books.length} {books.length === 1 ? "title" : "titles"}
              </span>
            </div>
            <div>
              {books.map((book, i) => (
                <BookRow key={`${book.title}-${i}`} book={book} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Year-grouped publications */}
      {yearKeys.map((year, idx) => {
        const bucket = years[year];
        const total =
          (bucket.journalArticles?.length ?? 0) +
          (bucket.conferenceProceedings?.length ?? 0) +
          (bucket.extendedAbstracts?.length ?? 0) +
          (bucket.researchArtifacts?.length ?? 0);
        if (total === 0) return null;
        return (
          <section key={year} className="border-b border-border last:border-b-0">
            <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
              <div className="mb-10 flex items-baseline justify-between gap-6 border-b border-border pb-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {String.fromCharCode(66 + idx)} · Year
                  </span>
                  <h2 className="font-heading text-3xl font-medium tracking-[-0.03em] text-foreground sm:text-5xl">
                    {bucket.label ?? year}
                  </h2>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {total} {total === 1 ? "entry" : "entries"}
                </span>
              </div>
              <PubSubsection
                title="Journal Articles"
                entries={bucket.journalArticles}
              />
              <PubSubsection
                title="Conference Proceedings"
                entries={bucket.conferenceProceedings}
              />
              <PubSubsection
                title="Extended Abstracts"
                entries={bucket.extendedAbstracts}
              />
              <PubSubsection
                title="Research Artifacts"
                entries={bucket.researchArtifacts}
              />
            </div>
          </section>
        );
      })}

      {/* Empty state */}
      {books.length === 0 && yearKeys.length === 0 && (
        <section className="mx-auto w-full max-w-4xl px-6 pb-24 pt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            No publications indexed yet — check back soon.
          </p>
        </section>
      )}
    </main>
  );
}

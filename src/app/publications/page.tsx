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
      className="text-foreground underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
    >
      {pub.title}
    </Link>
  ) : (
    <span className="text-foreground">{pub.title}</span>
  );

  return (
    <li className="flex gap-3 py-2 text-sm leading-relaxed text-muted-foreground">
      <span aria-hidden className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-primary/60" />
      <div className="flex-1">
        <span className="text-foreground">{pub.authors}</span>
        {pub.title && (
          <>
            {" — "}
            {titleEl}
          </>
        )}
        {pub.venue && (
          <>
            {" "}
            <em className="text-muted-foreground">— {pub.venue}</em>
          </>
        )}
        {pub.pages && (
          <span className="text-muted-foreground/80">, {pub.pages}</span>
        )}
        {pub.articleNumber && (
          <span className="text-muted-foreground/80">
            {" "}(Article {pub.articleNumber})
          </span>
        )}
        {pub.doi && (
          <>
            {" "}
            <Link
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary/80 underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
            >
              doi:{pub.doi}
            </Link>
          </>
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
    <div className="mb-6">
      <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </h3>
      <ul className="divide-y divide-border/60">
        {entries.map((p, i) => (
          <PubRow key={p.id ?? `${title}-${i}`} pub={p} />
        ))}
      </ul>
    </div>
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
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-8 sm:pt-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {publications.pageEyebrow}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {publications.pageHeadline}
        </h1>
      </section>

      {/* Books */}
      {books.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground">
            Books
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, i) => (
              <article
                key={`${book.title}-${i}`}
                className="flex gap-5 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                {book.coverImagePath ? (
                  <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={getAssetPath(book.coverImagePath)}
                      alt={book.title ?? "Book cover"}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-32 w-24 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                    Book
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  {book.title && (
                    book.url ? (
                      <Link
                        href={book.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-heading text-base font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        {book.title}
                      </Link>
                    ) : (
                      <span className="font-heading text-base font-semibold text-foreground">
                        {book.title}
                      </span>
                    )
                  )}
                  {book.authors && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {book.authors}
                    </p>
                  )}
                  {book.year && (
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {book.year}
                    </p>
                  )}
                  {book.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {book.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Year-grouped publications */}
      {yearKeys.map((year) => {
        const bucket = years[year];
        const total =
          (bucket.journalArticles?.length ?? 0) +
          (bucket.conferenceProceedings?.length ?? 0) +
          (bucket.extendedAbstracts?.length ?? 0) +
          (bucket.researchArtifacts?.length ?? 0);
        if (total === 0) return null;
        return (
          <section
            key={year}
            className="mx-auto w-full max-w-6xl px-6 py-10"
          >
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Year
              </span>
              <h2 className="font-heading text-3xl font-semibold text-foreground">
                {bucket.label ?? year}
              </h2>
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
          </section>
        );
      })}

      {/* Empty state */}
      {books.length === 0 && yearKeys.length === 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <p className="text-sm text-muted-foreground">
            No publications yet — check back soon.
          </p>
        </section>
      )}
    </main>
  );
}

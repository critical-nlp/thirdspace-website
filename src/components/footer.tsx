import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { getAssetPath } from "@/lib/utils";
import { Mail, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand Column */}
          <div className="space-y-6 md:col-span-5">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Thirdspace — University of Toronto home"
            >
              <BrandMark />
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              An interactive student community, research space, and hub for student collaboration and engagement across the University of Toronto campuses.
            </p>
            {/* Social / Email Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/SpaceUoft"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary ring-1 ring-border"
                aria-label="Twitter / X"
              >
                {/* SVG for X (formerly Twitter) */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:thirdspace@dgp.toronto.edu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary ring-1 ring-border"
                aria-label="Email Us"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4 md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/80">
              Community
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="group flex items-center text-muted-foreground transition-colors hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="https://www.utoronto.ca/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center text-muted-foreground transition-colors hover:text-primary"
                >
                  U of T Homepage
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Location / Details Column */}
          <div className="space-y-4 md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/80">
              Location
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">
                    Bahen Centre for Information Technology
                  </p>
                  <p>40 St. George Street</p>
                  <p>Toronto, ON M5S 2E4, Canada</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Thirdspace — University of Toronto.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/SpaceUoft"
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-primary flex items-center gap-1"
            >
              @SpaceUoft <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-[10px] uppercase tracking-[0.18em] text-primary/70 font-semibold">
              UofT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

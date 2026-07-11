import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Footer } from "@/components/footer";
import contentData from "../../public/config/content.json";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thirdspace — University of Toronto",
  description:
    "Thirdspace at the University of Toronto. Student community, events, and resources.",
};

export const viewport = {
  colorScheme: "light",
  themeColor: "#1E3765",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navbar } = contentData;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-40 w-full border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/70">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
            <Link
              href="/"
              className="flex items-center"
              aria-label={`${navbar.brandName} — University of Toronto home`}
            >
              <BrandMark />
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              {navbar.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

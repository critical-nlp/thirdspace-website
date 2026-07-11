import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { Mail, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import contentData from "../../public/config/content.json";

export function Footer() {
  const { location, brand, researchLabs, campuses, socials } = contentData;

  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-8">
          {/* Column 1: Brand (4 cols) */}
          <div className="space-y-6 md:col-span-4">
            <Link
              href="/"
              className="flex items-center"
              aria-label={`${brand.name} — University of Toronto home`}
            >
              <BrandMark />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {brand.footerDescription}
            </p>
            {/* Social / Email Links */}
            <div className="flex items-center gap-3">
              {socials.xUrl && (
                <a
                  href={socials.xUrl}
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
              )}
              {socials.email && (
                <a
                  href={`mailto:${socials.email}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary ring-1 ring-border"
                  aria-label="Email Us"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Affiliations / Research (3 cols) */}
          <div className="space-y-4 md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/80">
              {researchLabs.title}
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {researchLabs.items.map((item, index) => (
                <li key={index}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noreferrer" : undefined}
                      className="group flex items-center hover:text-primary transition-colors"
                    >
                      {item.name}
                      {item.isExternal && (
                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      )}
                    </a>
                  ) : (
                    <span className="hover:text-foreground transition-colors">
                      {item.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Campuses (2 cols) */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/80">
              {campuses.title}
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {campuses.items.map((campus, index) => (
                <li key={index}>
                  <a
                    href={campus.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {campus.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
           {/* Column 4: Location Info (3 cols) */}
           <div className="space-y-4 md:col-span-3">
             <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/80">
               Location
             </h3>
             
             {/* Interactive Location Tag with Hover Google Map */}
             <HoverCard openDelay={100} closeDelay={100}>
               <HoverCardTrigger asChild>
                 <a
                   href={`https://maps.google.com/?q=${location.mapsQuery}`}
                   target="_blank"
                   rel="noreferrer"
                   className="group block relative rounded-2xl border border-dashed border-border bg-muted/30 p-4 transition-all duration-300 hover:bg-card hover:shadow-sm hover:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/40 overflow-hidden"
                 >
                   <div className="absolute top-0 right-0 h-16 w-16 bg-accent/5 rounded-full blur-xl transition-all group-hover:bg-accent/10" />
                   
                   <div className="relative space-y-3.5">
                     <div className="flex items-center gap-2">
                       <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent-foreground transition-transform duration-300 group-hover:scale-110">
                         {/* Animated Location Pin / Radar */}
                         <span className="absolute inline-flex h-full w-full rounded-lg bg-accent/20 opacity-0 group-hover:animate-ping group-hover:opacity-100" />
                         <MapPin className="h-4.5 w-4.5 text-accent-foreground relative z-10" />
                       </div>
                       <div>
                         <div className="flex items-center gap-1.5">
                           <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                           <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">
                             {location.title}
                           </span>
                         </div>
                         <p className="text-xs text-muted-foreground font-mono mt-0.5">
                           {location.coordinates}
                         </p>
                       </div>
                     </div>
                     
                     <div className="text-sm text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
                        <p className="font-semibold text-foreground text-xs uppercase tracking-wide">
                          {location.institution}
                        </p>
                        <p className="mt-0.5">{location.street}</p>
                        <p>{location.cityCountry}</p>
                      </div>
                   </div>
                 </a>
               </HoverCardTrigger>
               <HoverCardContent 
                 side="top" 
                 align="end" 
                 sideOffset={12} 
                 className="w-[280px] sm:w-[320px] p-0 overflow-hidden rounded-xl bg-card border border-border shadow-lg"
               >
                 <div className="relative h-[200px] w-full bg-muted">
                   <iframe
                     title={`${location.institution} Location Map`}
                     src={`https://maps.google.com/maps?q=${location.mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                     width="100%"
                     height="100%"
                     style={{ border: 0 }}
                     allowFullScreen={false}
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                     className="absolute inset-0 grayscale contrast-125 opacity-90 transition-opacity hover:opacity-100 duration-300"
                   />
                 </div>
                 <div className="p-3 bg-card border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                   <span>{location.street}, Toronto</span>
                   <span className="text-[10px] font-semibold text-primary uppercase">Google Maps</span>
                 </div>
               </HoverCardContent>
             </HoverCard>
           </div>
         </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {brand.name} — University of Toronto.</p>
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
              {brand.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

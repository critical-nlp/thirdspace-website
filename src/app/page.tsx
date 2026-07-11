import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Calendar, ArrowRight } from "lucide-react";
import contentData from "../../public/config/content.json";

// Map icon names in JSON to Lucide component references
const iconMap = {
  Users: Users,
  Calendar: Calendar,
  Sparkles: Sparkles,
};

export default function Home() {
  const { hero, pillars } = contentData;

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-20 text-center sm:py-28">
          <Badge
            variant="secondary"
            className="mx-auto w-fit gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-accent/30"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {hero.badge}
          </Badge>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            {hero.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button className="h-11 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              {hero.primaryActionText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-md border-border px-6"
            >
              {hero.secondaryActionText}
            </Button>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-border bg-muted/30">
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

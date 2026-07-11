"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_SESSION_TTL_HOURS,
} from "@/lib/admin-credentials";
import {
  clearSession,
  readStoredSession,
  signSession,
  storeSession,
  verifySession,
  type AdminSession,
} from "@/lib/admin-session";

export default function AdminPage() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const expiryTimer = useRef<number | null>(null);

  function clearExpiryTimer() {
    if (expiryTimer.current !== null) {
      window.clearTimeout(expiryTimer.current);
      expiryTimer.current = null;
    }
  }

  function scheduleExpiry(expMs: number) {
    clearExpiryTimer();
    const delay = Math.max(0, expMs - Date.now());
    expiryTimer.current = window.setTimeout(() => {
      signOut("Session expired");
    }, delay);
  }

  async function adopt(token: string): Promise<AdminSession | null> {
    const verified = await verifySession(token);
    if (!verified) {
      clearSession();
      setSession(null);
      return null;
    }
    setSession(verified);
    scheduleExpiry(verified.exp * 1000);
    return verified;
  }

  function signOut(message?: string) {
    clearSession();
    clearExpiryTimer();
    setSession(null);
    if (message) setError(message);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = readStoredSession();
      if (token) await adopt(token);
      if (!cancelled) setChecked(true);
    })();

    function onStorage(e: StorageEvent) {
      if (e.key !== "thirdspace_admin_session") return;
      if (e.newValue === null) {
        clearExpiryTimer();
        setSession(null);
        return;
      }
      if (e.newValue) {
        void adopt(e.newValue);
      }
    }

    window.addEventListener("storage", onStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
      clearExpiryTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    try {
      const form = new FormData(e.currentTarget);
      const email = String(form.get("email") ?? "").trim();
      const password = String(form.get("password") ?? "");

      if (
        email.toLowerCase() !== ADMIN_EMAIL.toLowerCase() ||
        password !== ADMIN_PASSWORD
      ) {
        setError("Invalid credentials");
        return;
      }

      const token = await signSession(email);
      storeSession(token);
      const verified = await verifySession(token);
      if (!verified) {
        setError("Failed to establish session");
        return;
      }
      setSession(verified);
      scheduleExpiry(verified.exp * 1000);
    } finally {
      setPending(false);
    }
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-1 bg-background text-foreground lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background p-10 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.85_0.15_var(--brand-hue)/0.18),transparent_60%),radial-gradient(circle_at_bottom_left,oklch(0.85_0.16_75/0.20),transparent_55%)]"
        />
        <div className="relative flex items-center gap-2 text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Thirdspace
          </span>
        </div>

        <div className="relative flex flex-col gap-6">
          <Badge
            variant="secondary"
            className="w-fit gap-1.5 rounded-full bg-card/80 px-3 py-1 text-xs font-medium text-foreground ring-1 ring-border backdrop-blur"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Restricted area
          </Badge>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground">
            Admin console for the Thirdspace team.
          </h1>
          <p className="max-w-md text-pretty text-base leading-7 text-muted-foreground">
            Sign in to manage content, members, and events. Sessions are
            signed and expire automatically after {ADMIN_SESSION_TTL_HOURS}{" "}
            hours of inactivity.
          </p>
        </div>

        <p className="relative text-xs text-muted-foreground">
          © {new Date().getFullYear()} Thirdspace — University of Toronto
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center px-6 py-12 sm:px-10">
        {session ? (
          <SignedInView
            email={session.email}
            ttlHours={ADMIN_SESSION_TTL_HOURS}
            onSignOut={() => signOut()}
          />
        ) : (
          <SignInView
            error={error}
            pending={pending}
            onSubmit={onSubmit}
          />
        )}
      </main>
    </div>
  );
}

function SignInView({
  error,
  pending,
  onSubmit,
}: {
  error: string | null;
  pending: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Admin sign in
        </h2>
        <p className="text-sm text-muted-foreground">
          Use your admin email and password to continue.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <div className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <div className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {pending ? "Signing in…" : "Sign in"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By signing in you agree to the Thirdspace acceptable-use policy.
        </p>
      </form>
    </div>
  );
}

function SignedInView({
  email,
  ttlHours,
  onSignOut,
}: {
  email: string;
  ttlHours: number;
  onSignOut: () => void;
}) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // GitHub integration settings stored locally
  const [pat, setPat] = useState("");
  const [repoOwner, setRepoOwner] = useState("critical-nlp");
  const [repoName, setRepoName] = useState("thirdspace.toronto.edu");
  const [branch, setBranch] = useState("main");
  const [showConfig, setShowConfig] = useState(false);

  // Form tab selection
  const [activeTab, setActiveTab] = useState<"hero" | "pillars" | "navbar" | "footerLabs" | "location">("hero");

  useEffect(() => {
    // Load config from localStorage if available
    setPat(localStorage.getItem("ts_gh_pat") ?? "");
    setRepoOwner(localStorage.getItem("ts_gh_owner") ?? "critical-nlp");
    setRepoName(localStorage.getItem("ts_gh_name") ?? "thirdspace.toronto.edu");
    setBranch(localStorage.getItem("ts_gh_branch") ?? "main");

    // Fetch initial JSON from public asset folder
    fetch("config/content.json")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load local config", err);
        setLoading(false);
      });
  }, []);

  const saveGithubConfig = () => {
    localStorage.setItem("ts_gh_pat", pat);
    localStorage.setItem("ts_gh_owner", repoOwner);
    localStorage.setItem("ts_gh_name", repoName);
    localStorage.setItem("ts_gh_branch", branch);
    setMessage({ type: "success", text: "GitHub Settings saved locally!" });
    setShowConfig(false);
  };

  const handleFieldChange = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handlePillarChange = (index: number, field: string, value: string) => {
    setContent((prev: any) => {
      const pillars = [...prev.pillars];
      pillars[index] = { ...pillars[index], [field]: value };
      return { ...prev, pillars };
    });
  };

  const handleListItemChange = (section: string, index: number, field: string, value: string | boolean) => {
    setContent((prev: any) => {
      const targetSection = prev[section];
      const items = [...targetSection.items];
      items[index] = { ...items[index], [field]: value };
      return {
        ...prev,
        [section]: {
          ...targetSection,
          items,
        },
      };
    });
  };

  const handleNavbarLinkChange = (index: number, field: string, value: string) => {
    setContent((prev: any) => {
      const links = [...prev.navbar.links];
      links[index] = { ...links[index], [field]: value };
      return {
        ...prev,
        navbar: {
          ...prev.navbar,
          links,
        },
      };
    });
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "content.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePublish = async () => {
    if (!pat) {
      setMessage({ type: "error", text: "GitHub Personal Access Token (PAT) is required to publish directly." });
      setShowConfig(true);
      return;
    }

    setSaving(true);
    setMessage(null);

    const filePath = "public/config/content.json";
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${branch}`;

    try {
      // 1. Get current file SHA from GitHub API
      let sha = "";
      const getRes = await fetch(url, {
        headers: {
          Authorization: `token ${pat}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (getRes.status === 200) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      } else if (getRes.status !== 404) {
        throw new Error(`Failed to check existing file. Status: ${getRes.status}`);
      }

      // 2. Commit the file update to GitHub API
      const updatedContent = JSON.stringify(content, null, 2);
      // UTF-8 base64 encoding handles special characters properly
      const base64Content = btoa(unescape(encodeURIComponent(updatedContent)));

      const commitRes = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `token ${pat}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "CMS Update: public/config/content.json",
          content: base64Content,
          sha: sha || undefined,
          branch,
        }),
      });

      if (commitRes.ok) {
        setMessage({
          type: "success",
          text: "Changes committed successfully! GitHub Pages will rebuild automatically in a couple of minutes.",
        });
      } else {
        const errorData = await commitRes.json();
        throw new Error(errorData.message || "Failed to commit changes.");
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: `Publish failed: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading configuration CMS...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full bg-primary px-3 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-primary-foreground"
            >
              <ShieldCheck className="h-3 w-3" />
              Signed In
            </Badge>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1.5">
            Website Content Manager
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Control all text values across the Thirdspace site.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfig(!showConfig)}
            className="text-xs rounded-lg"
          >
            GitHub Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSignOut}
            className="text-xs rounded-lg text-muted-foreground hover:text-foreground"
          >
            Sign out
          </Button>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg p-3 text-xs border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-destructive/10 text-destructive border-destructive/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* GitHub Integration Setup Modal/Card overlay */}
      {showConfig && (
        <div className="mb-6 p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-4">
          <h3 className="text-sm font-semibold text-accent-foreground">GitHub Commit Integration</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enter a Personal Access Token (PAT) to write directly to your repository on commit. Changes will trigger your GitHub Actions build workflow automatically.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="pat" className="text-xs text-foreground">GitHub PAT (Token)</Label>
              <Input
                id="pat"
                type="password"
                placeholder="ghp_..."
                value={pat}
                onChange={(e) => setPat(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="owner" className="text-xs text-foreground">Repo Owner</Label>
              <Input
                id="owner"
                type="text"
                placeholder="critical-nlp"
                value={repoOwner}
                onChange={(e) => setRepoOwner(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs text-foreground">Repo Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="thirdspace.toronto.edu"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="branch" className="text-xs text-foreground">Branch</Label>
              <Input
                id="branch"
                type="text"
                placeholder="main"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button size="sm" variant="ghost" className="text-xs" onClick={() => setShowConfig(false)}>
              Cancel
            </Button>
            <Button size="sm" className="text-xs bg-primary text-primary-foreground" onClick={saveGithubConfig}>
              Save Settings Locally
            </Button>
          </div>
        </div>
      )}

      {/* Editor Tabs Navigation */}
      <div className="flex border-b border-border mb-6 overflow-x-auto pb-1 scrollbar-thin">
        {(["hero", "pillars", "navbar", "footerLabs", "location"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold capitalize border-b-2 whitespace-nowrap transition-all ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "footerLabs" ? "Footer & Links" : tab}
          </button>
        ))}
      </div>

      {/* Edit Sections */}
      <div className="space-y-4 min-h-[220px]">
        {activeTab === "hero" && content?.hero && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="hero-badge" className="text-xs text-foreground font-semibold">Badge Banner text</Label>
              <Input
                id="hero-badge"
                value={content.hero.badge}
                onChange={(e) => handleFieldChange("hero", "badge", e.target.value)}
                className="h-10 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hero-title" className="text-xs text-foreground font-semibold">Title Headline</Label>
              <Input
                id="hero-title"
                value={content.hero.title}
                onChange={(e) => handleFieldChange("hero", "title", e.target.value)}
                className="h-10 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hero-desc" className="text-xs text-foreground font-semibold">Description Text</Label>
              <textarea
                id="hero-desc"
                rows={3}
                value={content.hero.description}
                onChange={(e) => handleFieldChange("hero", "description", e.target.value)}
                className="w-full text-sm p-3 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring/20 resize-y"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="hero-p-action" className="text-xs text-foreground font-semibold">Primary Action</Label>
                <Input
                  id="hero-p-action"
                  value={content.hero.primaryActionText}
                  onChange={(e) => handleFieldChange("hero", "primaryActionText", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="hero-s-action" className="text-xs text-foreground font-semibold">Secondary Action</Label>
                <Input
                  id="hero-s-action"
                  value={content.hero.secondaryActionText}
                  onChange={(e) => handleFieldChange("hero", "secondaryActionText", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "pillars" && content?.pillars && (
          <div className="space-y-5">
            {content.pillars.map((pillar: any, index: number) => (
              <div key={pillar.id} className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary/80 capitalize">Pillar {index + 1}</span>
                  <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    Icon: {pillar.icon}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="sm:col-span-1 space-y-1">
                    <Label htmlFor={`p-title-${index}`} className="text-xs font-semibold text-foreground">Title</Label>
                    <Input
                      id={`p-title-${index}`}
                      value={pillar.title}
                      onChange={(e) => handlePillarChange(index, "title", e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <Label htmlFor={`p-body-${index}`} className="text-xs font-semibold text-foreground">Description</Label>
                    <Input
                      id={`p-body-${index}`}
                      value={pillar.body}
                      onChange={(e) => handlePillarChange(index, "body", e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "navbar" && content?.navbar && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wide">Brand Wordmarks</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="nav-brandName" className="text-xs text-foreground font-semibold">Header Title (e.g. Thirdspace)</Label>
                <Input
                  id="nav-brandName"
                  value={content.navbar.brandName}
                  onChange={(e) => handleFieldChange("navbar", "brandName", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nav-brandTagline" className="text-xs text-foreground font-semibold">Header Tagline (e.g. UofT)</Label>
                <Input
                  id="nav-brandTagline"
                  value={content.navbar.brandTagline}
                  onChange={(e) => handleFieldChange("navbar", "brandTagline", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
            </div>

            <div className="border-t border-border pt-4 mt-2">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Navbar Links</h3>
              {content.navbar.links.map((link: any, index: number) => (
                <div key={index} className="grid grid-cols-2 gap-3 p-3 rounded-lg border border-border/80 bg-muted/20">
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground font-semibold">Link Label</Label>
                    <Input
                      value={link.label}
                      onChange={(e) => handleNavbarLinkChange(index, "label", e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground font-semibold">URL Path</Label>
                    <Input
                      value={link.href}
                      onChange={(e) => handleNavbarLinkChange(index, "href", e.target.value)}
                      className="h-9 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "footerLabs" && content && (
          <div className="space-y-5">
            {/* General Brand details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide">Brand & Description</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="footer-brand-name" className="text-xs text-foreground">Brand Name</Label>
                  <Input
                    id="footer-brand-name"
                    value={content.brand.name}
                    onChange={(e) => handleFieldChange("brand", "name", e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="footer-brand-tag" className="text-xs text-foreground">Tagline</Label>
                  <Input
                    id="footer-brand-tag"
                    value={content.brand.tagline}
                    onChange={(e) => handleFieldChange("brand", "tagline", e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="footer-brand-desc" className="text-xs text-foreground">Footer Bio Description</Label>
                <textarea
                  id="footer-brand-desc"
                  rows={2}
                  value={content.brand.footerDescription}
                  onChange={(e) => handleFieldChange("brand", "footerDescription", e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-input bg-card focus:outline-none focus:ring-2 focus:ring-ring/20 resize-y"
                />
              </div>
            </div>

            {/* Socials & Contact */}
            <div className="border-t border-border pt-4">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Contact & Socials</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="social-x" className="text-xs text-foreground font-semibold">X (Twitter) URL</Label>
                  <Input
                    id="social-x"
                    value={content.socials.xUrl}
                    onChange={(e) => handleFieldChange("socials", "xUrl", e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="social-email" className="text-xs text-foreground font-semibold">Contact Email</Label>
                  <Input
                    id="social-email"
                    type="email"
                    value={content.socials.email}
                    onChange={(e) => handleFieldChange("socials", "email", e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Research & Labs list */}
            <div className="border-t border-border pt-4">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Research & Labs</h3>
              <div className="space-y-2">
                {content.researchLabs.items.map((lab: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg border border-border/80 bg-muted/20">
                    <div className="space-y-1 sm:col-span-1">
                      <Label className="text-[10px] text-muted-foreground">Lab Name</Label>
                      <Input
                        value={lab.name}
                        onChange={(e) => handleListItemChange("researchLabs", index, "name", e.target.value)}
                        className="h-8 text-xs px-2"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-1">
                      <Label className="text-[10px] text-muted-foreground">URL Link (optional)</Label>
                      <Input
                        value={lab.url}
                        placeholder="No link"
                        onChange={(e) => handleListItemChange("researchLabs", index, "url", e.target.value)}
                        className="h-8 text-xs px-2"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-1 flex flex-col justify-end">
                      <div className="flex items-center gap-2 pb-2">
                        <input
                          id={`lab-ext-${index}`}
                          type="checkbox"
                          checked={lab.isExternal}
                          onChange={(e) => handleListItemChange("researchLabs", index, "isExternal", e.target.checked)}
                          className="h-3.5 w-3.5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor={`lab-ext-${index}`} className="text-[10px] text-muted-foreground font-semibold cursor-pointer">
                          External Link (New Tab)
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campuses list */}
            <div className="border-t border-border pt-4">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wide mb-3">Campuses</h3>
              <div className="space-y-2.5">
                {content.campuses.items.map((campus: any, index: number) => (
                  <div key={index} className="grid grid-cols-2 gap-3 p-3 rounded-lg border border-border/80 bg-muted/20">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Campus Name</Label>
                      <Input
                        value={campus.name}
                        onChange={(e) => handleListItemChange("campuses", index, "name", e.target.value)}
                        className="h-8 text-xs px-2"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">URL Website</Label>
                      <Input
                        value={campus.url}
                        onChange={(e) => handleListItemChange("campuses", index, "url", e.target.value)}
                        className="h-8 text-xs px-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "location" && content?.location && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="loc-title" className="text-xs text-foreground font-semibold">Location Title</Label>
                <Input
                  id="loc-title"
                  value={content.location.title}
                  onChange={(e) => handleFieldChange("location", "title", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="loc-coords" className="text-xs text-foreground font-semibold">Coordinates (text)</Label>
                <Input
                  id="loc-coords"
                  value={content.location.coordinates}
                  onChange={(e) => handleFieldChange("location", "coordinates", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="loc-inst" className="text-xs text-foreground font-semibold">Institution Name</Label>
              <Input
                id="loc-inst"
                value={content.location.institution}
                onChange={(e) => handleFieldChange("location", "institution", e.target.value)}
                className="h-10 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="loc-street" className="text-xs text-foreground font-semibold">Street Address</Label>
                <Input
                  id="loc-street"
                  value={content.location.street}
                  onChange={(e) => handleFieldChange("location", "street", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="loc-city" className="text-xs text-foreground font-semibold">City, Postal, Country</Label>
                <Input
                  id="loc-city"
                  value={content.location.cityCountry}
                  onChange={(e) => handleFieldChange("location", "cityCountry", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="loc-query" className="text-xs text-foreground font-semibold font-mono">Google Maps Query (URL Encoded)</Label>
              <Input
                id="loc-query"
                value={content.location.mapsQuery}
                onChange={(e) => handleFieldChange("location", "mapsQuery", e.target.value)}
                className="h-10 text-sm font-mono text-muted-foreground"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row gap-3 justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleDownload}
          className="rounded-lg h-11 text-xs"
        >
          Download content.json
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            disabled={saving}
            onClick={handlePublish}
            className="rounded-lg h-11 px-6 text-xs bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
          >
            {saving ? "Publishing to GitHub..." : "Publish to GitHub"}
          </Button>
        </div>
      </div>
    </div>
  );
}

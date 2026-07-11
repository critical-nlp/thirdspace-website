"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const MS_PER_HOUR = 60 * 60 * 1000;

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

  // Restore session on mount + listen for cross-tab sign-out.
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
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-black">
        <p className="text-sm text-zinc-500">Loading…</p>
      </div>
    );
  }

  if (session) {
    const expiresAt = new Date(session.exp * 1000);
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-black">
        <main className="w-full max-w-3xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">Admin</Badge>
            <Button variant="outline" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Signed in as {session.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                Session expires at {expiresAt.toLocaleTimeString()} (
                {ADMIN_SESSION_TTL_HOURS}h from sign-in).
              </p>
              <p>
                This is a placeholder admin area. Admin tools and content
                management will live here.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Admin Sign in</CardTitle>
            <CardDescription>
              Restricted area. Authorized personnel only.
            </CardDescription>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
              {error ? (
                <p
                  role="alert"
                  className="text-sm text-red-600 dark:text-red-400"
                >
                  {error}
                </p>
              ) : null}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Checking…" : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}

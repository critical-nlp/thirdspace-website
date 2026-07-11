"use client";

import { useState, type FormEvent } from "react";
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
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/admin-credentials";

const SESSION_KEY = "thirdspace_admin_ok";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

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

    sessionStorage.setItem(SESSION_KEY, "1");
    setUnlocked(true);
  }

  function signOut() {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  }

  if (unlocked) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-black">
        <main className="w-full max-w-3xl flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">Admin</Badge>
            <Button variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>
                Signed in as {ADMIN_EMAIL}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
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
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}

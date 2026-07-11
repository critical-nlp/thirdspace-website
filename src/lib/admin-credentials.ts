// Admin credentials for the static-gated /admin page.
//
// Values come from env vars:
//   NEXT_PUBLIC_ADMIN_EMAIL    - admin email
//   NEXT_PUBLIC_ADMIN_PASSWORD - admin password (plain text)
//
// .env (local)  -> use these directly
// CI (GH Pages) -> workflow writes .env.production from repo secrets
//
// This is a static-gated demo, not real security. The password lives in
// the public JS bundle either way; we keep it in env so the value stays
// out of the git history and can be rotated via GitHub repo secrets.

export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";
export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

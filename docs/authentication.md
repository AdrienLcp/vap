# Authentication

Authentication is handled by **Better Auth 1.4.18** with a Prisma adapter. Configuration lives in `src/features/auth/infrastructure/auth-lib.ts`.

## Providers enabled

- **Email + password** — credential login with password hashing handled by Better Auth.
- **Google OAuth** — uses `AUTH_GOOGLE_CLIENT_ID` and `AUTH_GOOGLE_CLIENT_SECRET` from `.env`.

Additional features enabled in the config:

- **Email change** allowed
- **Account deletion** allowed
- **Role** field added to the user model (`USER`, `ADMIN`, `SUPER_ADMIN`), default `USER`

## Storage

Better Auth persists sessions, accounts, and users in PostgreSQL via the Prisma adapter. The relevant tables are:

- `users` — user accounts (merged with the app's own user fields).
- `sessions` — active sessions, indexed by a unique `token`.
- `accounts` — one row per provider (credentials account + Google account, etc.).
- `verifications` — one-time codes used for email verification and password flows.

See `docs/database.md` for the full schema.

## Environment variables

```env
AUTH_GOOGLE_CLIENT_ID=""
AUTH_GOOGLE_CLIENT_SECRET=""
BETTER_AUTH_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

`BETTER_AUTH_SECRET` signs sessions — generate it with `openssl rand -base64 32`. Google credentials come from the Google Cloud Console (OAuth client ID, authorized redirect URI: `<NEXT_PUBLIC_APP_URL>/api/auth/callback/google`).

## Routes

Better Auth mounts its handlers under `/api/auth/*`. They are wired inside `src/app/api/auth/` (route handlers). Do not duplicate those routes in feature folders.

## Regenerating types

Whenever you change the Better Auth config (adding a provider, changing fields), run:

```bash
pnpm auth:generate
```

This calls `pnpx @better-auth/cli generate --config ./src/features/auth/infrastructure/auth-lib.ts` and updates the generated types so strict TypeScript keeps compiling.

## Reading the session

### Server side

Better Auth exposes a helper that reads the session from the incoming request. Use it inside server components, route handlers, and server actions. The session object contains the `user` with its `role`.

```ts
import { auth } from '@/features/auth/infrastructure/auth-lib'

const session = await auth.api.getSession({ headers: req.headers })
if (!session) return new Response('Unauthorized', { status: 401 })
if (session.user.role !== 'ADMIN') return new Response('Forbidden', { status: 403 })
```

### Client side

Client components should rely on hooks exposed by `@/features/auth/application/` (see `useAuth` and related helpers in that folder). **Do not call Better Auth client APIs from random components** — always go through the auth feature's hooks so we keep a single source of truth.

## Authorization

- **Roles** are the primary authorization mechanism. Never trust the client to decide permissions.
- Every admin route and API handler must verify the role server-side before doing anything.
- The `Role` enum is declared in `schema.prisma`: `USER`, `ADMIN`, `SUPER_ADMIN`.
- Reserve `SUPER_ADMIN` for destructive or sensitive operations (user deletion, role changes).

Example guard inside an API route:

```ts
const session = await auth.api.getSession({ headers: req.headers })
if (!session || session.user.role === 'USER') {
  return Response.json({ error: 'FORBIDDEN' }, { status: 403 })
}
```

## Local development

1. `BETTER_AUTH_SECRET` must be set — without it, Better Auth refuses to boot.
2. Google OAuth is optional in dev; leave the client ID/secret empty and use email/password.
3. The redirect URI registered on the Google Cloud Console must match exactly — `http://localhost:3000/api/auth/callback/google` for local dev.

## Common issues

- **`pnpm dev` crashes at boot**: usually a missing env variable (`BETTER_AUTH_SECRET` or `DATABASE_URL`). Check `src/infrastructure/env/` for the T3 Env schema.
- **Session is always null after login**: cookies blocked by the browser or `NEXT_PUBLIC_APP_URL` mismatching the actual URL. Make sure both the server and the OAuth config agree on the host/port.
- **Google login redirects then fails**: the redirect URI in the Google Cloud Console does not match the one the app sends. Copy it exactly.
- **Type errors after config changes**: run `pnpm auth:generate`.

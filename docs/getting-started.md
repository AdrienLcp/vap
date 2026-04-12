# Getting Started — New developer

Step-by-step guide to set up your dev environment on VAP after cloning the repo.

## 1. Prerequisites

Install these tools if you don't have them yet:

| Tool | Version | Link |
|---|---|---|
| **Node.js** | ≥ 18.17.0 (recommended: 20 LTS or 22 LTS) | https://nodejs.org |
| **pnpm** | ≥ 10 (project is pinned to 10.27.0) | `npm install -g pnpm` or https://pnpm.io/installation |
| **PostgreSQL** | ≥ 14 | https://www.postgresql.org/download/ |
| **Git** | recent | https://git-scm.com |

### Check versions

```bash
node -v      # v20.x.x or higher
pnpm -v      # 10.x.x
psql --version
git --version
```

### Recommended IDE

**VS Code** with these extensions:

- **Biome** (`biomejs.biome`) — the project's official linter/formatter
- **Prisma** (`Prisma.prisma`) — schema support
- **SCSS IntelliSense**
- **EditorConfig**

The repo already ships a `.vscode/` folder with shared settings: accept the recommendations when VS Code prompts you.

## 2. Clone and install

```bash
git clone <repo-url>
cd vap
pnpm install
```

`pnpm install` automatically runs `prisma generate` through the `postinstall` hook, so the Prisma client is generated immediately under `src/infrastructure/database/generated/`.

> Important: **never** use `npm install` or `yarn`. It would break the lockfile and produce version drift.

## 3. Create the PostgreSQL database

### Option A — Local PostgreSQL

```bash
# Connect as superuser
psql -U postgres

# Inside psql:
CREATE DATABASE vap_dev;
CREATE USER vap_user WITH PASSWORD 'vap_password';
GRANT ALL PRIVILEGES ON DATABASE vap_dev TO vap_user;
\q
```

Your `DATABASE_URL` will then be:

```
postgresql://vap_user:vap_password@localhost:5432/vap_dev
```

### Option B — PostgreSQL via Docker

```bash
docker run --name vap-postgres \
  -e POSTGRES_USER=vap_user \
  -e POSTGRES_PASSWORD=vap_password \
  -e POSTGRES_DB=vap_dev \
  -p 5432:5432 \
  -d postgres:16
```

Same `DATABASE_URL` as option A.

## 4. Environment variables

Copy the example file:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
# Database
DATABASE_URL="postgresql://vap_user:vap_password@localhost:5432/vap_dev"

# Better Auth — generate a random secret
BETTER_AUTH_SECRET="<generate with: openssl rand -base64 32>"

# Google OAuth (optional in dev, but required for Google login)
AUTH_GOOGLE_CLIENT_ID=""
AUTH_GOOGLE_CLIENT_SECRET=""

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Stripe (stripe branch only — TEST key mandatory)
STRIPE_API_KEY="sk_test_..."
```

### Generate the Better Auth secret

```bash
openssl rand -base64 32
# Or on Windows PowerShell:
# [Convert]::ToBase64String((1..32 | %{[byte](Get-Random -Max 256)}))
```

### Google OAuth (optional)

To test Google login locally:

1. Go to https://console.cloud.google.com/
2. Create a project (or pick one).
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
4. Application type: Web application.
5. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret into `.env`.

Without these values, only email/password login will work.

### Stripe (`stripe` branch)

1. Create a Stripe account: https://dashboard.stripe.com/register
2. Dashboard → **Developers → API keys**.
3. Copy the **Secret key** (Test mode, starts with `sk_test_`).
4. **Never use a live key in dev.**

## 5. Initialize the database

```bash
# Apply migrations
pnpm db:migrate

# (Optional) Seed the DB with dev data
pnpm db:seed

# (Optional) Inspect the DB
pnpm db:studio
```

`pnpm db:migrate` will:
1. Apply every migration in `src/infrastructure/database/migrations/`.
2. Regenerate the Prisma client.

`pnpm db:studio` opens Prisma Studio at http://localhost:5555 — very handy for inspecting data during development.

## 6. Run the dev server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser. The server uses **Turbopack** (fast, with hot reload). Changes to `.ts`, `.tsx` and `.sass` files reload immediately.

## 7. Sanity-check checklist

- [ ] `pnpm dev` starts without errors
- [ ] http://localhost:3000 shows the home page
- [ ] `pnpm lint` passes (`biome check`)
- [ ] `pnpm db:studio` opens a UI listing the project tables
- [ ] You can create an account through the auth UI

## 8. Handy scripts

| Command | Effect |
|---|---|
| `pnpm dev` | Next.js dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Biome check (lint + format suggestions) |
| `pnpm format` | Biome format --write (apply formatting) |
| `pnpm db:migrate` | Apply Prisma migrations |
| `pnpm db:generate` | Regenerate the Prisma client |
| `pnpm db:seed` | Run the seed script |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm auth:generate` | Regenerate Better Auth types after a config change |
| `pnpm deps:upgrade` | Upgrade dependencies (handle with care!) |

## 9. Where to look next

Now that everything runs locally, read in this order:

1. [`docs/architecture.md`](./architecture.md) — to understand the code layout.
2. [`docs/stack.md`](./stack.md) — detailed tech choices.
3. [`docs/database.md`](./database.md) — Prisma models.
4. [`docs/conventions.md`](./conventions.md) — code rules (Biome, Result pattern).
5. [`docs/feature-guide.md`](./feature-guide.md) — how to create or modify a feature.
6. [`docs/authentication.md`](./authentication.md) — Better Auth, OAuth, roles.

And of course, the root `README.md` and `CLAUDE.md`.

## 10. Common issues

### `pnpm install` fails with a Prisma binary issue

```bash
pnpm db:generate
```

### Invalid `DATABASE_URL` / connection error

- Make sure PostgreSQL is running: `pg_isready` or `docker ps`.
- Test the connection: `psql "postgresql://vap_user:vap_password@localhost:5432/vap_dev"`.

### Migration stuck

If you are in dev and want to reset everything (⚠️ destroys data):

```bash
pnpm exec prisma migrate reset
```

### Biome lint error

```bash
pnpm format      # auto-apply formatting
pnpm lint        # re-check
```

Most Biome errors are auto-fixable.

### Port 3000 already in use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F

# Linux/macOS
lsof -ti:3000 | xargs kill -9
```

### Missing Better Auth types after a config change

```bash
pnpm auth:generate
```

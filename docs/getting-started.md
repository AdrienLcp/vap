# Getting Started — New developer

Step-by-step guide to set up your dev environment on VAP after cloning the repo.

## 1. Prerequisites

Install these tools if you don't have them yet:

| Tool | Version | Link |
|---|---|---|
| **Node.js** | ≥ 20 LTS (22 LTS recommended) | https://nodejs.org |
| **pnpm** | ≥ 10 (project is pinned to 10.27.0) | `npm install -g pnpm` |
| **Docker Desktop** | recent | https://www.docker.com/products/docker-desktop/ |
| **Git** | recent | https://git-scm.com |

No local Postgres install is needed — the DB runs in a Docker container defined in `docker-compose.yml`.

### Check versions

```bash
node -v      # v20.x.x or higher
pnpm -v      # 10.x.x
docker -v
git --version
```

### Recommended IDE

**VS Code** with these extensions:

- **Biome** (`biomejs.biome`) — the project's official linter/formatter
- **SCSS IntelliSense**
- **EditorConfig**

The repo ships a `.vscode/` folder with shared settings — accept the recommendations when VS Code prompts you.

## 2. Clone and install

```bash
git clone <repo-url>
cd vap
pnpm install
```

> Important: **never** use `npm install` or `yarn`. It would break the lockfile.

## 3. Environment variables

Copy the example file:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
# Database (matches docker-compose.yml)
DATABASE_URL="postgres://vap:vap@localhost:5432/vap"

# Better Auth — generate a random secret
BETTER_AUTH_SECRET="<generate with: openssl rand -base64 32>"

# Google OAuth (optional in dev, required for Google login)
AUTH_GOOGLE_CLIENT_ID=""
AUTH_GOOGLE_CLIENT_SECRET=""

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Resend (transactional emails)
RESEND_API_KEY=""

# Stripe (stripe branch only — TEST key mandatory)
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
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

## 4. Run the dev server

```bash
pnpm dev
```

That single command:

1. Starts the Postgres container (`docker compose up -d --wait`) and waits until the healthcheck passes.
2. Applies pending migrations (`pnpm db:migrate`).
3. Starts Next.js with Turbopack.

Open http://localhost:3000 in your browser.

> **Windows note:** if port 5432 is already taken by a local Postgres install, `pnpm dev` will fail with an auth error because connections hit the local Postgres, not the container. Stop the `postgresql-x64-XX` service (or uninstall it) to free the port.

## 5. Populate the DB (optional)

```bash
pnpm db:seed
```

Inserts categories and sample products. Run it once after the first `pnpm dev`.

## 6. Sanity-check checklist

- [ ] `pnpm dev` starts without errors, and http://localhost:3000 shows the home page.
- [ ] `pnpm lint` passes (`biome check`).
- [ ] `pnpm db:studio` opens the Drizzle Studio UI with the project tables.
- [ ] You can create an account through the auth UI.

## 7. Handy scripts

| Command | Effect |
|---|---|
| `pnpm dev` | Boot DB + apply migrations + Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Biome check (lint + format) |
| `pnpm format` | Apply Biome formatting |
| `pnpm db:generate` | Write a new Drizzle migration SQL file |
| `pnpm db:migrate` | Apply pending migrations (via `tsx`) |
| `pnpm db:seed` | Insert dev fixtures |
| `pnpm db:studio` | Drizzle Studio UI |
| `pnpm auth:generate` | Regenerate Better Auth types after a config change |

### Docker controls

```bash
docker compose up -d --wait   # Start Postgres and wait for healthcheck
docker compose down           # Stop Postgres (data kept in the volume)
docker compose down -v        # Stop and wipe the volume (⚠️ destroys data)
```

## 8. Where to look next

1. [`docs/architecture.md`](./architecture.md) — code layout and data flow.
2. [`docs/stack.md`](./stack.md) — detailed tech choices.
3. [`docs/database.md`](./database.md) — Drizzle schemas, migrations.
4. [`docs/conventions.md`](./conventions.md) — code rules (Biome, Result pattern).
5. [`docs/feature-guide.md`](./feature-guide.md) — how to add or modify a feature.
6. [`docs/authentication.md`](./authentication.md) — Better Auth, OAuth, roles.

## 9. Common issues

### `pnpm dev` fails with `auth_failed` for user "vap"

A host-level Postgres is listening on 5432 alongside Docker, so the connection hits your local Postgres (different credentials), not the container. Stop the host service:

```powershell
# Windows, admin PowerShell
net stop postgresql-x64-18
sc config postgresql-x64-18 start=disabled
```

Or change the host port in `docker-compose.yml` (e.g. `'5433:5432'`) and update `DATABASE_URL` accordingly.

### Docker is not running

```
Cannot connect to the Docker daemon...
```

Start Docker Desktop.

### Biome lint error

```bash
pnpm format      # auto-apply formatting
pnpm lint        # re-check
```

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

### `drizzle-kit` CLI hangs in Git Bash

Known issue with its spinner on non-native terminals. `pnpm db:migrate` uses a programmatic runner (`tsx` + `drizzle-orm/postgres-js/migrator`) that works everywhere, so prefer it. If you need `drizzle-kit studio` or similar, run it from PowerShell / cmd on Windows.

### Reset everything

```bash
docker compose down -v       # wipe DB
pnpm dev                     # container + fresh migrations + server
pnpm db:seed                 # (optional) insert fixtures
```

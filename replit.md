# AI BOX Command Center

A responsive, client-side UI prototype of a privacy-first, local-first AI desktop command center for personal and professional users.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

The AI BOX web prototype provides Home, AI Workspace, Projects, Memory & Knowledge, Models & Tools, Guardian, Time Travel, and Settings. Inference, system metrics, permissions, approvals, and restore operations are demonstrations rather than real desktop capabilities.

See `artifacts/ai-box/README.md` for prototype limitations and the engineering still required.

## User preferences

- Premium dark graphite UI with restrained electric-blue highlights.
- “Built for Local. Our Own Design. Our Applications. Our Modules.”
- “Privacy, ownership and offline independence.”
- Keep demo data client-side. Do not add cloud AI calls, analytics, telemetry, or claims of verified privacy/security.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

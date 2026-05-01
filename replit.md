# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Portfolio (`artifacts/portfolio`)
- **Type**: react-vite
- **Preview Path**: `/`
- **Description**: Professional single-page portfolio for Marwan Badr, ERP Technical Engineer & Odoo/FastAPI Developer.
- **Features**:
  - Bilingual EN/AR with full RTL/LTR layout switching
  - Cairo font for Arabic, Inter for English
  - "Industrial Tech" dark design (#0f172a + cyan #0ea5e9 accents)
  - Sections: Hero, Accountant Edge, Skills Matrix, Projects, Contact
  - Animated skill bars, grid background, scroll animations
  - No backend — static frontend only

### API Server (`artifacts/api-server`)
- Express 5 backend serving `/api/*`

### Canvas / Mockup Sandbox (`artifacts/mockup-sandbox`)
- UI prototyping sandbox

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

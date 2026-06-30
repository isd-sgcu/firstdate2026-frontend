# =============================================================================
# Stage 1 – deps
# Install all dependencies using the frozen lockfile.
# =============================================================================
FROM oven/bun:1.2-alpine AS deps

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile


# =============================================================================
# Stage 2 – builder
# Add the SSR adapter, patch the config, then build.
# =============================================================================
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install the SSR adapter.
# The repo does not yet have @astrojs/node in package.json / bun.lock, so we
# add it here. If you later commit it to the repo, this line stays harmless.
RUN bun add @astrojs/node

# Patch astro.config.mjs to enable SSR with the node standalone adapter.
# The two sed calls are idempotent — if the repo already has the adapter
# configured they will simply not match and leave the file unchanged.
RUN sed -i \
      's|import react from "@astrojs/react";|import react from "@astrojs/react";\nimport node from "@astrojs/node";|' \
      astro.config.mjs \
    && sed -i \
      's|integrations: \[react()\],|integrations: [react()],\n  output: "server",\n  adapter: node({ mode: "standalone" }),|' \
      astro.config.mjs \
    && echo "=== astro.config.mjs after patch ===" \
    && cat astro.config.mjs

# Build-time env vars — PUBLIC_* are inlined into the bundle at build time.
# Pass different values via --build-arg for each environment.
ARG PUBLIC_APP_NAME="firstdate 2026"
ARG PUBLIC_API_BASE_URL="http://localhost:3000"

ENV PUBLIC_APP_NAME=$PUBLIC_APP_NAME
ENV PUBLIC_API_BASE_URL=$PUBLIC_API_BASE_URL
ENV ASTRO_TELEMETRY_DISABLED=1

RUN bunx --bun astro build \
    && echo "=== dist layout ===" \
    && find dist -type f | head -40


# =============================================================================
# Stage 3 – runner
# Lean production image: compiled output + Bun runtime only.
# =============================================================================
FROM oven/bun:1.2-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV ASTRO_TELEMETRY_DISABLED=1

# The @astrojs/node standalone adapter writes:
#   dist/server/entry.mjs   — the HTTP server entrypoint
#   dist/client/            — static assets served by the same process
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Override at runtime via docker run -e or your orchestrator secrets.
ENV PUBLIC_APP_NAME="firstdate 2026"
ENV PUBLIC_API_BASE_URL="http://localhost:3000"

# HOST / PORT are read by the @astrojs/node standalone server.
ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["bun", "run", "./dist/server/entry.mjs"]
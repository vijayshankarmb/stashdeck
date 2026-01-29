# --------------------
# Base
# --------------------
FROM oven/bun:1.3.2-slim AS base
WORKDIR /app

# --------------------
# Prune monorepo
# --------------------
FROM base AS pruner
COPY . .
RUN bunx turbo prune api --docker

# --------------------
# Install production deps
# --------------------
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ ./
COPY --from=pruner /app/out/bun.lock ./bun.lock

ENV NODE_ENV=production
RUN bun install --production

# --------------------
# Prisma generate
# --------------------
FROM base AS builder
WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/ ./

WORKDIR /app/apps/api

# Ensure Prisma uses linux binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
RUN bunx prisma generate --schema=prisma/schema.prisma

# --------------------
# Runtime (LEAN)
# --------------------
FROM oven/bun:1.3.2-slim AS runner
WORKDIR /app

USER bun
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/apps/api ./apps/api
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 5000
CMD ["bun", "run", "--cwd", "apps/api", "start"]

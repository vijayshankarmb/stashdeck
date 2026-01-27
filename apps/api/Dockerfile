# Use bun as the base image
FROM oven/bun:1.3.2 AS base
WORKDIR /app

# --- Stage 1: Install dependencies ---
# We still need the root files because this is a monorepo
FROM base AS installer
COPY package.json bun.lock turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/types/package.json ./packages/types/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/eslint-config/package.json ./packages/eslint-config/

# Install ALL dependencies (including Prisma for generation)
RUN CI=false bun install --no-frozen-lockfile

# --- Stage 2: Build the API ---
FROM installer AS builder
COPY . .
# Generate Prisma Client (Crucial for the API)
RUN cd apps/api && bunx prisma generate
# Build the API (if there's a build step, otherwise skip)
# Bun can run TS directly, so a build step is often optional, 
# but we'll run it if your turbo.json requires it.
RUN bun run build --filter=api

# --- Stage 3: Runner ---
FROM base AS runner
# Copy only the compiled/built API and necessary modules
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/api /app/apps/api
COPY --from=builder /app/package.json /app/package.json

ENV NODE_ENV=production
# Force the app to use the production port
ENV PORT=5000
EXPOSE 5000

# Start only the API
CMD ["bun", "run", "--cwd", "apps/api", "start"]

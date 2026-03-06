FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo
WORKDIR /app

# ---- Prune monorepo for vendor app ----
FROM base AS pruner
COPY . .
RUN turbo prune --scope=@next360/vendor --docker

# ---- Install deps from pruned lockfile ----
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/ .
ENV NEXT_TELEMETRY_DISABLED=1
RUN turbo run build --filter=@next360/vendor

# ---- Runner ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/vendor/public ./public 2>/dev/null || true
COPY --from=builder --chown=nextjs:nodejs /app/apps/vendor/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/vendor/.next/static ./apps/vendor/.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "apps/vendor/server.js"]

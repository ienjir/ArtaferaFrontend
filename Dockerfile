FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build:ssr

# Production stage
FROM node:18-alpine AS runtime

WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S angular -u 1001
COPY --from=builder --chown=angular:nodejs /app/dist ./dist
COPY --from=builder --chown=angular:nodejs /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force
USER angular
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/artafera/server/server.mjs --health-check || exit 1

CMD ["node", "dist/artafera/server/server.mjs"]

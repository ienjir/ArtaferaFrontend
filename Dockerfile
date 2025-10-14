# Build stage
FROM oven/bun:latest AS installer

WORKDIR /app

# Copy package files and lockfile
COPY package.json bun.lock ./

# Install dependencies with Bun
RUN bun install --frozen-lockfile

# Build stage with Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copy node_modules from installer stage
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/package.json ./

# Copy source code
COPY . .

# Build Angular app with SSR (production mode)
RUN npx ng build --configuration production

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy node_modules and dist from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/ArtaferaFrontendNew/server/server.mjs"]

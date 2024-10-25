# Base image with pnpm installed
FROM node:18-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

# Backend build stage
FROM base AS backend
WORKDIR /app/backend
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN pnpm install
COPY backend ./
EXPOSE 3000
CMD ["pnpm", "start"]

# Frontend build stage
FROM base AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install
COPY frontend ./
EXPOSE 5173
CMD ["pnpm", "run", "dev"]
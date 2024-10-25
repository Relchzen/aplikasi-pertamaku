FROM node:18-alpine as base
RUN npm install -g pnpm
WORKDIR /app

FROM base as backend
WORKDIR /app/backend
COPY backend/package.json backend/pnpm-lock.yaml ./
RUN pnpm install
COPY backend .
EXPOSE 3000
CMD ["pnpm", "start"]

FROM base as frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install
COPY frontend .
EXPOSE 5173
CMD ["pnpm", "run", "dev"]
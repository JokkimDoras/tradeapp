FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm ci
COPY . .
EXPOSE 8000
CMD ["npm", "run", "server"]

FROM base AS production
RUN npm ci --omit=dev
COPY src ./src
EXPOSE 8000
CMD ["npm", "start"]

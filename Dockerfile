# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY .env .
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

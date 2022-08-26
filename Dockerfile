FROM node:16-alpine AS builder

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.23-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /build/build /frontend/build

EXPOSE 3000
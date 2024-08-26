FROM nginx:1-alpine3.20-slim

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

FROM nginx:1.27.3-alpine3.20@sha256:814a8e88df978ade80e584cc5b333144b9372a8e3c98872d07137dbf3b44d0e4

RUN set -ex; \
	apk add --update --no-cache jinja2-cli=~0.8.2

COPY --chmod=644 /rootfs/etc/nginx/conf.d/* /etc/nginx/conf.d/

COPY --chmod=755 /rootfs/docker-entrypoint.d/*.sh /docker-entrypoint.d/

FROM nginx:1.27.3-alpine3.20@sha256:41523187cf7d7a2f2677a80609d9caa14388bf5c1fbca9c410ba3de602aaaab4

RUN set -ex; \
	apk add --update --no-cache jinja2-cli=~0.8.2

COPY --chmod=644 /rootfs/etc/nginx/conf.d/* /etc/nginx/conf.d/

COPY --chmod=755 /rootfs/docker-entrypoint.d/*.sh /docker-entrypoint.d/

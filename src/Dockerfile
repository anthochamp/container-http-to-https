FROM nginx:1.27.2-alpine3.20@sha256:2140dad235c130ac861018a4e13a6bc8aea3a35f3a40e20c1b060d51a7efd250

RUN set -ex; \
	apk add --update --no-cache jinja2-cli=~0.8.2

COPY --chmod=644 /rootfs/etc/nginx/conf.d/* /etc/nginx/conf.d/

COPY --chmod=755 /rootfs/docker-entrypoint.d/*.sh /docker-entrypoint.d/

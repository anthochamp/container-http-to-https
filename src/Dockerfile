FROM nginx:1.27.2-alpine3.20@sha256:74175cf34632e88c6cfe206897cbfe2d2fecf9bf033c40e7f9775a3689e8adc7

RUN set -ex; \
	apk add --update --no-cache jinja2-cli=~0.8.2

COPY --chmod=644 /rootfs/etc/nginx/conf.d/* /etc/nginx/conf.d/

COPY --chmod=755 /rootfs/docker-entrypoint.d/*.sh /docker-entrypoint.d/

FROM nginx:1.27.3-alpine3.20@sha256:5acf10cd305853dc2271e3c818d342f3aeb3688b1256ab8f035fda04b91ed303

RUN set -ex; \
	apk add --update --no-cache jinja2-cli=~0.8.2

COPY --chmod=644 /rootfs/etc/nginx/conf.d/* /etc/nginx/conf.d/

COPY --chmod=755 /rootfs/docker-entrypoint.d/*.sh /docker-entrypoint.d/

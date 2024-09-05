#!/usr/bin/env sh
set -eu

HTTP2HTTPS_TEMPORARY_REDIRECT="${HTTP2HTTPS_TEMPORARY_REDIRECT:-0}"
HTTP2HTTPS_REDIRECT_PORT="${HTTP2HTTPS_REDIRECT_PORT:-}"

if [ -n "$HTTP2HTTPS_REDIRECT_PORT" ]; then
	export _HTTP2HTTPS_REDIRECT_PORT=":$HTTP2HTTPS_REDIRECT_PORT"
else
	export _HTTP2HTTPS_REDIRECT_PORT=""
fi

if [ "$HTTP2HTTPS_TEMPORARY_REDIRECT" = "1" ]; then
	export _HTTP2HTTPS_REDIRECT_STATUS_CODE=307
else
	export _HTTP2HTTPS_REDIRECT_STATUS_CODE=308
fi

j2Templates="
/etc/nginx/conf.d/default.conf
"

for file in $j2Templates; do
	export | jinja2 --format env -o "$file" "$file.j2"

	# can't use --reference with alpine
	chmod "$(stat -c '%a' "$file.j2")" "$file"
	chown "$(stat -c '%U:%G' "$file.j2")" "$file"
done

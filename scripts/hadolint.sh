#!/usr/bin/env sh
set -eu

dockerfile="$1"
shift

initialContext=$(docker context show)
if [ "$initialContext" != "default" ]; then
	docker context use default 1>/dev/null
fi

cleanup() {
	if [ "$(docker context show)" != "$initialContext" ]; then
		docker context use "$initialContext" 1>/dev/null
	fi
}

trap 'cleanup' EXIT INT TERM

docker run --rm -i hadolint/hadolint hadolint "$@" - <"$dockerfile"

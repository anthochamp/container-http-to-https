#!/usr/bin/env sh
set -eu

dockerDir=$1
imageName=${2:-$(mktemp -u tmp-XXXX | awk '{ print tolower($0) }')}

initialContext=$(docker context show)
if [ "$initialContext" != "default" ]; then
	docker context use default 1>/dev/null
fi

cleanup() {
	set +e

	docker image rm -f "$imageName" 1>/dev/null

	if [ "$(docker context show)" != "$initialContext" ]; then
		docker context use "$initialContext" 1>/dev/null
	fi
}

trap 'cleanup' EXIT INT TERM

docker build -qt "$imageName" "$dockerDir" 1>/dev/null

docker run --rm -i "$imageName" nginx -v 2>&1 | grep -oP 'nginx version: nginx/\K.*'

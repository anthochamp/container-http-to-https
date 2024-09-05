#!/usr/bin/env sh
set -eu

# shellcheck disable=SC2120,SC3043
replaceEnvSecrets() {
	# replaceEnvSecrets 1.0.0
	local prefix="${1:-}"

	for envSecretName in $(export | awk '{print $2}' | grep -oE '^[^=]+' | grep '__FILE$'); do
		if [ -z "$prefix" ] || printf '%s' "$envSecretName" | grep "^$prefix" >/dev/null; then
			local envName
			envName=$(printf '%s' "$envSecretName" | sed 's/__FILE$//')

			local filePath
			filePath=$(eval echo '${'"$envSecretName"':-}')

			if [ -n "$filePath" ]; then
				if [ -f "$filePath" ]; then
					echo Using content from "$filePath" file for "$envName" environment variable value.

					export "$envName"="$(cat -A "$filePath")"
					unset "$envSecretName"
				else
					echo ERROR: Environment variable "$envSecretName" is defined but does not point to a regular file. 1>&2
					exit 1
				fi
			fi
		fi
	done
}

replaceEnvSecrets

#!/bin/sh -e

[ -z "${DEBUG}" ] || set -x

# Download the installer
curl -sL ${BASE_URL:-https://jmlemetayer.github.io/abba}/install -o /tmp/install

# And run it in the workdir
/bin/sh -e ${DEBUG:+-x} /tmp/install

# Uninstall on exit
trap "[ -x .abba/uninstall ] && .abba/uninstall" EXIT

# Execute the command in background to be able to call the uninstall script
# Using SIGWINCH as it is used by httpd for graceful exit
exec "$@" &
trap "kill $!" TERM
trap "kill -WINCH $!" WINCH
wait

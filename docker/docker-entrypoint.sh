#!/bin/sh -e

[ -z "${DEBUG}" ] || set -x

# Download the installer
curl -sL ${BASE_URL:-https://jmlemetayer.github.io/abba}/install -o /tmp/install

# And run it in the workdir
/bin/sh -e ${DEBUG:+-x} /tmp/install

exec "$@"

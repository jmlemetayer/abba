#!/bin/sh
trap "exit 0" INT QUIT TERM
service apache2 start
tail -f /var/log/apache2/other_vhosts_access.log &
sleep infinity
exit 0

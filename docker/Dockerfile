FROM	httpd:2.4

COPY	httpd.conf /usr/local/apache2/conf/httpd.conf

RUN	set -x \
	# Install the needed packages:
	&& DEBIAN_FRONTEND=noninteractive \
	&& apt update \
	&& apt install --no-install-recommends --assume-yes \
		# curl is used by the entry point to download the installer
		ca-certificates curl \
	&& rm -rf /var/lib/apt/lists/*

VOLUME	["/var/www"]
WORKDIR	/var/www

COPY	docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT	["docker-entrypoint.sh"]

# The CMD must be re-defined because it is deleted when an entry point is added
CMD	["httpd-foreground"]

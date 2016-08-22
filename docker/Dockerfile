FROM	ubuntu:16.04

# Add the entrypoint script
ADD	entrypoint.sh /tmp

# Add an Apache 2 configuration file for a new site
ADD	abba.conf /etc/apache2/sites-available/

# Install Apache 2
# Configure Apache 2 required modules
# Configure Apache 2 new site
RUN	apt-get update && apt-get install -y curl apache2 && \
	a2enmod autoindex && a2enmod include && \
	a2dissite 000-default && a2ensite abba

# Install ABBA
WORKDIR	/var/www
ARG	TEMPLATE=default
RUN	T=$(mktemp) && curl -sL git.io/abba -o $T && sh $T $TEMPLATE

# Create a file tree
RUN	mkdir -p "directory/sub directory/sub sub directory" && \
	mkdir -p "another directory/sub directory" && \
	echo i am an archive file > archive.tar.bz2 && \
	echo i am a file > file.txt && \
	echo i am a movie file > movie.mkv && \
	echo i am a music file > music.flac && \
	echo i am a picture file > picture.png && \
	echo i am a very long file > "this is a file with a very long name and no extension"

# Run Apache 2 and print logs
EXPOSE	80
ENTRYPOINT /tmp/entrypoint.sh

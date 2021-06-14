[![dockeri.co][dockeri.co]][hub.docker]

This docker image contains an apache 2.4 httpd server with a basic configuration
including a runtime ABBA installation. This image can be used for several
purposes:

# Local preview

To preview ABBA in your local directory you just have to run:

    docker run --rm --tty --interactive \
        --publish 8080:80 \
        --volume ${PWD}:/var/www \
        jmlemetayer/abba

Once the install is done you should be able to reach http://localhost:8080.

Finally, just hit <kbd>CTRL + C</kbd> and ABBA should be uninstalled.

# Development

To be able to test the installation process and the generated files two
containers are needed: the first being the builder and the second being this
image.

The builder image used is the [GitHub Pages server][github-pages].

First, create a dedicated network to be able to link the two containers.

    docker network create abba

Then, in the ABBA repository, run the builder container:

    docker run --rm --tty \
        --volume ${PWD}:/var/lib/github-pages \
        --network abba --name abba-builder \
        jmlemetayer/github-pages

Finally, in your test directory, run the test container:

    docker run --rm --tty --interactive \
        --publish 8080:80 \
        --volume ${PWD}:/var/www \
        --network abba --env BASE_URL="http://abba-builder:4000" \
        jmlemetayer/abba

## Enable debugging

Debug traces can be enabled by setting the `DEBUG` environment variable:

    --env DEBUG=true

[hub.docker]: https://hub.docker.com/r/jmlemetayer/abba
[dockeri.co]: https://dockeri.co/image/jmlemetayer/abba
[github-pages]: https://hub.docker.com/r/jmlemetayer/github-pages

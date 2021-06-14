# ![logo](abba/images/favicon.ico) ABBA
Apache Bootstrap & Bootswatch Autoindex

You find that the [autoindex][mod_autoindex] module on your
[Apache http server][httpd] is very useful to make your files accessible online.
But the only drawback is that the default web interface is ugly and not suitable
for modern use?

Then ABBA is made for you.

[httpd]: http://httpd.apache.org
[mod_autoindex]: https://httpd.apache.org/docs/2.4/mod/mod_autoindex.html

## Features

* Fully responsive using [Bootstrap][bootstrap]
* Multiple themes using [Bootswatch][bootswatch]
* Awesome icons using [FontAwesome][fontawesome]
* Pretty date formatting using [Moment.js][momentjs]
* File sorting & filtering
* Custom error pages
* [Easy network installation](#installation)
* Local development using [docker containers](#development)

## Previews

### Online previews

Online previews of the ABBA themes can be found [here][previews]. You can use
the navigation menus to switch between available themes and pages.

_Note that these previews are static pages used to get an idea of the final
result, so some links and features are disabled or will not work as expected._

[previews]: https://jmlemetayer.github.io/abba/previews/default

### Local previews

Local previews can be achieved by using the [test docker image](docker):

```bash
docker run --rm --tty --interactive \
    --publish 8080:80 \
    --volume ${PWD}:/var/www \
    jmlemetayer/abba
```

These previews allow you to test all the available themes and features locally
with minimal requirements.

## Installation

### Prerequisites

The only requirement is to have a working [Apache http server][httpd] with
these modules enabled: [mod_autoindex][mod_autoindex],
[mod_include][mod_include] and [mod_mime][mod_mime].

[mod_include]: https://httpd.apache.org/docs/2.4/mod/mod_include.html
[mod_mime]: https://httpd.apache.org/docs/2.4/mod/mod_mime.html

Also ensure that the [`AllowOverride All`][allowoverride] directive is set for
your [`DocumentRoot`][documentroot] because ABBA uses an [`.htaccess`][htaccess]
file. If you do not want to allow these files, you can copy the content of the
distributed [`htaccess`](abba/htaccess) to your [`VirtualHost`][virtualhost].

[allowoverride]: https://httpd.apache.org/docs/2.4/mod/core.html#allowoverride
[documentroot]: https://httpd.apache.org/docs/2.4/mod/core.html#documentroot
[htaccess]: https://httpd.apache.org/docs/2.4/howto/htaccess.html
[virtualhost]: https://httpd.apache.org/docs/2.4/mod/core.html#virtualhost

### Step 1

To easily install ABBA from the network go into your
[`DocumentRoot`][documentroot] directory and run this shell one-liner:

``` bash
T=$(mktemp) && curl -sL git.io/abba -o ${T} && sh ${T}
```

You will be prompted to select the desired theme you wish to use.

And that's it! :sunglasses:

### Installed files

Here is what is installed:

```
├── .abba
│   ├── css
│   │   └── style.css
│   ├── html
│   │   ├── header.shtml
│   │   ├── footer.shtml
│   │   └── error_*.shtml
│   ├── js
│   │   └── script.js
│   ├── uninstall
│   └── webfonts
│       └── fa-*
└── .htaccess
```

### Tips and tricks

* An `uninstall` script is generated in the `.abba` directory.
* If you want to automate the installation and skip the theme request you can
  add the theme name at the end of the one-liner:
  ``` bash
  T=$(mktemp) && curl -sL git.io/abba -o ${T} && sh ${T} litera
  ```

## Troubleshooting

* **I have a basic 404 error.**<br>
  It seems that the [mod_autoindex][mod_autoindex] is not enabled.
* **I still have my old autoindex.**<br>
  Ensure that the [`AllowOverride All`][allowoverride] directive is set for
  your [`DocumentRoot`][documentroot].
* **The autoindex have changed, but it is not pretty at all.**<br>
  Check if [mod_include][mod_include] and [mod_mime][mod_mime] are enabled.

## Development

The local development workflow is using two docker containers to be able to
generate the distribution files and test them with in a real environment.
Everything you need to know is described in the [`docker`](docker#development)
directory.

## License
ABBA has been inspired by
[iglvzx/IGalvez.Autoindex][igalvezautoindex] _([GPLv3][igalvezautoindex-license])_.

ABBA is released under the [MIT License](LICENSE.md).

[igalvezautoindex]: https://github.com/iglvzx/IGalvez.Autoindex
[igalvezautoindex-license]: https://github.com/iglvzx/IGalvez.Autoindex/blob/master/LICENSE

## Credits

* [Bootstrap][bootstrap] _([MIT][bootstrap-license])_
* [Bootswatch][bootswatch] _([MIT][bootswatch-license])_
* [FontAwesome][fontawesome] _([CC BY 4.0, SIL OFL 1.1, MIT][fontawesome-license])_
* [Jekyll Compress HTML][jekyll-compress-html] _([MIT][jekyll-compress-html-license])_
* [JQuery][jquery] _([MIT][jquery-license])_
* [Moment.js][momentjs] _([MIT][momentjs-license])_
* [Popper.js][popperjs] _([MIT][popperjs-license])_

Icon made by [mynamepong][flaticon-mynamepong].

[bootstrap]: https://github.com/twbs/bootstrap
[bootstrap-license]: https://github.com/twbs/bootstrap/blob/main/LICENSE
[bootswatch]: https://github.com/thomaspark/bootswatch
[bootswatch-license]: https://github.com/thomaspark/bootswatch/blob/v4/LICENSE
[fontawesome]: https://github.com/FortAwesome/Font-Awesome
[fontawesome-license]: https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt
[jquery]: https://github.com/jquery/jquery
[jquery-license]: https://github.com/jquery/jquery/blob/master/LICENSE.txt
[momentjs]: https://github.com/moment/moment
[momentjs-license]: https://github.com/moment/moment/blob/develop/LICENSE
[popperjs]: https://github.com/popperjs/popper-core
[popperjs-license]: https://github.com/popperjs/popper-core/blob/master/LICENSE.md
[jekyll-compress-html]: https://github.com/penibelst/jekyll-compress-html
[jekyll-compress-html-license]: https://github.com/penibelst/jekyll-compress-html/blob/master/LICENSE
[flaticon-mynamepong]: https://www.flaticon.com/authors/mynamepong

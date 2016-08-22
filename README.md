# [ABBA &middot; Apache Bootstrap & Bootswatch Autoindex][abba]
Mamma mia, let's be beautiful

### [Awesome autoindex][awesome-autoindex]
No more ugly autoindex! ABBA allows you to quickly and easily customize your Apache autoindex.

With a fully responsive design, multiple templates and customized error pages, ABBA is here to make the web look awesome.

Before | After
:---: | :---:
Basic Apache autoindex | Awesome autoindex
![Basic Apache autoindex](/examples/autoindex.png?raw=true "Basic Apache autoindex") | ![Awesome autoindex](/examples/default.png?raw=true "Awesome autoindex")

### [Easy installing][easy-installing]
Just go into your DocumentRoot directory and run this shell one-liner:

``` bash
T=$(mktemp) && curl -sL git.io/abba -o $T && sh $T
```

You will be prompted to select the template you want. And that's it! Refresh your autoindex page and everything should be working.

If you do not want to be prompted you can directly add the template name at the end of the line.

### [Fully responsive][fully-responsive]
By using Bootstrap, ABBA ensures you to have a fully responsive design.

So you can easily check out your files from all your devices.

### [Multiple templates][multiple-templates]
By using Bootswatch, several templates are available.

They can be easily switched by reinstalling ABBA.

### [Error pages][error-pages]
Last but not least, ABBA also provides error pages suited to the chosen template.

Now your autoindex really looks awesome!

## Troubleshooting
If ABBA is not working fine you can check this points:

 * Apache modules `mod_autoindex` and `mod_include` must be enabled.
 * Apache directive `AllowOverride All` must be set for your `DocumentRoot`.

Here is a valid Apache virtualhost configuration:

```apache
<VirtualHost *:80>
	DocumentRoot /var/www

	<Directory /var/www>
		AllowOverride All
	</Directory>
</VirtualHost>
```

## License
ABBA has been inspired by [IGalvez.Autoindex][iglvzx] _([GPLv3][gplv30])_.

ABBA is released under the [GNU General Public License v3][gplv30].

## Credits

* [Jekyll][jekyll] _([MIT][mit])_
* [Bootstrap][boostrap] _([MIT][mit])_
* [Bootswatch][bootswatch] _([MIT][mit])_
* [jQuery][jquery] _([MIT][mit])_
* [HTML5 Shiv][html5shiv] _([MIT][mit], [GPLv2][gplv20])_
* [Respond.js][respond] _([MIT][mit])_
* [Owl Carousel 2][owlcarousel2] _([MIT][mit])_
* [Icomoon App][icomoon-app]
* [Icomoon Free][icomoon-free] _([GPLv3][gplv30], [CC BY 4.0][ccby40])_
* [GitHub Octicons][octicons] _([MIT][mit], [SIL OFL 1.1][ofl11])_
* [Font Awesome][fontawesome] _([MIT][mit], [SIL OFL 1.1][ofl11])_

[abba]: https://abba.jmldev.net
[awesome-autoindex]: https://abba.jmldev.net#awesome-autoindex
[easy-installing]: https://abba.jmldev.net#easy-installing
[fully-responsive]: https://abba.jmldev.net#fully-responsive
[multiple-templates]: https://abba.jmldev.net#multiple-templates
[error-pages]: https://abba.jmldev.net#error-pages
[iglvzx]: https://github.com/iglvzx/IGalvez.Autoindex
[jekyll]: https://jekyllrb.com
[boostrap]: https://getbootstrap.com
[bootswatch]: https://bootswatch.com
[jquery]: https://jquery.com
[html5shiv]: https://github.com/aFarkas/html5shiv
[respond]: https://github.com/scottjehl/Respond
[owlcarousel2]: https://github.com/OwlCarousel2/OwlCarousel2
[icomoon-app]: https://icomoon.io/app
[icomoon-free]: https://github.com/Keyamoon/IcoMoon-Free
[octicons]: https://github.com/primer/octicons
[fontawesome]: https://github.com/FortAwesome/Font-Awesome
[mit]: https://opensource.org/licenses/MIT
[gplv20]: https://www.gnu.org/licenses/gpl-2.0.html
[gplv30]: https://www.gnu.org/licenses/gpl-3.0.html
[ofl11]: https://scripts.sil.org/OFL
[ccby40]: https://creativecommons.org/licenses/by/4.0

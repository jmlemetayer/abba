---
layout:
---
{% include js/jquery.min.js %}
{% comment %}{% include js/bootstrap/transition.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/alert.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/button.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/carousel.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/collapse.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/dropdown.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/modal.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/tooltip.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/popover.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/scrollspy.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/tab.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/affix.js %}{% endcomment %}
$(document).ready(function() {
	{% include js/suffixdb.js %}
	/* Use Bootstrap table */
	$('table').addClass('table table-hover');
	/* Remove align="right" */
	$('td').removeAttr('align');
	/* Move table header in thead */
	var header = $('table tbody tr').first();
	$('table').prepend($('<thead/>').append(header));
	/* Parse each row */
	$('table tbody tr').each(function(i) {
		var a = $('a', this).first();
		var name = a.text();
		/* Remove "Parent Directory" row */
		if (name === 'Parent Directory' && i === 0) {
			if ($.trim($('td', this).last().html()) === '-') {
				$(this).remove();
			}
		/* Set directory row style */
		} else if (name.substring(name.length - 1) === '/') {
			$(this).addClass('active');
			$('td', this).last().html('');
			a.prepend('<span class="icon icon-folder">');
		/* Set file row style */
		} else {
			var suffix = name.substr(name.lastIndexOf('.') + 1).toLowerCase();
			if (suffix in suffixdb) {
				a.prepend('<span class="icon icon-file-' + suffixdb[suffix] + '">');
			} else {
				a.prepend('<span class="icon icon-file">');
			}
		}
	});
	/* Create Breadcrumb */
	var directories = document.URL.split('/').slice(3, -1);
	var active = $('.breadcrumb li').hasClass('active');
	if (directories.length > 0) {
		var href = '/';
		if (active) {
			$('.breadcrumb li').removeAttr('class').wrapInner('<a href="' + href + '">');
		}
		$.each(directories, function(i ,directory) {
			href += directory + '/';
			$('.breadcrumb').append('<li><a href="' + href + '">' + decodeURIComponent(directory));
		});
		if (active) {
			$('.breadcrumb li').last().addClass('active').children('a').contents().unwrap();
		}
	}
	/* Show table */
	$('#breadcrumb').show();
	$('#table').show();
});

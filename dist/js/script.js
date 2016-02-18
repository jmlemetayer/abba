---
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
function addIcon(obj, name) {
	obj.prepend('<span class="icon icon-' + name + '">');
}
$(document).ready(function() {
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
			addIcon(a, 'folder');
		/* Set file row style */
		} else {
			addIcon(a, 'file');
		}
	});
	/* Create Breadcrumb */
	var directories = location.href.split('/').slice(3, -1);
	if (directories.length > 0) {
		var href = '/';
		$('.breadcrumb li').removeAttr('class').wrapInner('<a href="' + href + '">');
		$.each(directories, function(i ,directory) {
			href += directory + '/';
			$('.breadcrumb').append('<li><a href="' + href + '">' + decodeURIComponent(directory));
		});
		$('.breadcrumb li').last().addClass('active').children('a').contents().unwrap();
	}
	/* Show table */
	$('#table').show();
});

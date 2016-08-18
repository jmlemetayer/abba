---
layout:
---
{% include js/jquery.min.js %}
{% include js/bootstrap/transition.js %}
{% comment %}{% include js/bootstrap/alert.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/button.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/carousel.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/collapse.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/dropdown.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/modal.js %}{% endcomment %}
{% include js/bootstrap/tooltip.js %}
{% comment %}{% include js/bootstrap/popover.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/scrollspy.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/tab.js %}{% endcomment %}
{% comment %}{% include js/bootstrap/affix.js %}{% endcomment %}
{% include js/owl/owl.carousel.js %}
{% comment %}{% include js/owl/owl.autorefresh.js %}{% endcomment %}
{% comment %}{% include js/owl/owl.lazyload.js %}{% endcomment %}
{% comment %}{% include js/owl/owl.autoheight.js %}{% endcomment %}
{% comment %}{% include js/owl/owl.video.js %}{% endcomment %}
{% include js/owl/owl.animate.js %}
{% comment %}{% include js/owl/owl.autoplay.js %}{% endcomment %}
{% include js/owl/owl.navigation.js %}
{% comment %}{% include js/owl/owl.hash.js %}{% endcomment %}
{% include js/owl/owl.support.js %}
$(document).ready(function() {
	/* Initialize carousels */
	$('#awesome-autoindex .owl-carousel').owlCarousel({
		nav: true,
		navText: ['Before', 'After'],
		dots: false,
		items: 1
	});

	$('#multiple-templates .owl-carousel').owlCarousel({
		loop: true,
		items: 1
	});

	$('#error-pages .owl-carousel').owlCarousel({
		loop: true,
		items: 1
	});

	/* Copy to clipboard */
	$('#one-liner button').tooltip({
		container: 'body',
		placement: 'bottom',
		title: 'Copy to clipboard',
		trigger: 'hover'
	}).on('click', function() {
		var input = $('#one-liner input')[0];
		input.setSelectionRange(0, input.value.length + 1);
		try {
			var success = document.execCommand('copy');
			if (success) {
				$('#one-liner button').trigger('copied', ['Copied!']);
			} else {
				$('#one-liner button').trigger('copied', ['Copy with Ctrl-c']);
			}
		} catch (error) {
			$('#one-liner button').trigger('copied', ['Copy with Ctrl-c']);
		}
	}).on('copied', function(event, message) {
		$(this).attr('title', message)
			.tooltip('fixTitle')
			.tooltip('show')
			.attr('title', 'Copy to clipboard')
			.tooltip('fixTitle');
	});
});

(function($) {
	$.fn.changeElementType = function(element) {
		this.replaceWith(function() {
			return $(element).append($(this).contents());
		});
	};

	$.fn.prependIfNotExist = function(selector, element) {
		if ($(selector, this).length === 0) {
			return $(element).prependTo(this);
		} else {
			return $(selector, this);
		}
	};
})(jQuery);

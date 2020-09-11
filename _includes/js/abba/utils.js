(function($) {
	$.fn.prependIfNotExist = function(selector, element) {
		if ($(selector, this).length === 0) {
			return $(element).prependTo(this);
		} else {
			return $(selector, this);
		}
	};
})(jQuery);

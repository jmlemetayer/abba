// Use Bootstrap table
$("table").addClass("table table-hover").wrap("<div class='table-responsive'>");

// Remove align="right"
$("td").removeAttr("align");

// Move all rows in <tbody>
$("table").prependIfNotExist("tbody", "<tbody/>").append($("tr"));

// Move table header in <thead>
$("table").prependIfNotExist("thead", "<thead/>").append($("tr").first());

// Trim each cells inner html
$("td, th").each(function() {
	$(this).html($(this).html().trim());
});

// Show main
$("main").show();

// Get the search query string
const search = window.location.search;

// Create a screen reader friendly icon
function create_icon(classes, title) {
	return $("<i/>")
		.addClass(classes)
		.attr("title", title)
		.attr("aria-hidden", "true")
		.add($("<span/>")
			.addClass("sr-only")
			.text("(" + title + ")"));
}

////
//// Configure the <nav .navbar>
////

// Filter table
$("input[type=search]").on("input", function() {
	var value = $(this).val().toLowerCase();
	$("tbody tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});

////
//// Configure the <nav .breadcrumb>
////

// Get the path segments and remove empty fields
const path_segments = window.location.pathname.split("/").filter(Boolean);

// Create a html / url object for each path segments
var path_url = "/";
var path_urls = [{
	html: create_icon("fa-fw fas fa-home", document.title),
	url: path_url + search,
}];

path_segments.forEach(function(segment) {
	path_url += segment + "/";
	path_urls.push({
		html: decodeURIComponent(segment),
		url: path_url + search
	});
});

// Create the breadcrumb elements for each previous objects
path_urls.forEach(function(url) {
	var a = $("<a/>").attr("href", url.url).html(url.html);
	var li = $("<li/>").addClass("breadcrumb-item").append(a);
	$(".breadcrumb").append(li);
});

// Set the last breadcrumb item as active
$(".breadcrumb li").last()
	.addClass("active")
	.attr("aria-current", "page")
	.children("a").contents().unwrap();

////
//// Configure the <table>
////

// Column indexes
const columns = {
	"icon": 0,
	"name": 1,
	"date": 2,
	"size": 3,
};

// Use Bootstrap table
$("table").addClass("table table-hover").wrap("<div class='table-responsive'>");

// Remove valign="top" and align="right"
$("td, th").removeAttr("align").removeAttr("valign");

// Replace the first <td> into <th>
$("td:first-child").changeElementType("<th/>");

// Move all rows in <tbody>
$("table").prependIfNotExist("tbody", "<tbody/>").append($("tr"));

// Move table header in <thead>
$("table").prependIfNotExist("thead", "<thead/>").append($("tr").first());

// Add scope=col for each header cells
$("thead th").attr("scope", "col");

// Add scope=row for each body header cells
$("tbody th").attr("scope", "row");

// Trim each cells inner html
$("td, th").each(function() {
	$(this).html($(this).html().trim());
});

// Clear the icon column of the header and add a spacer
$("thead th").eq(columns["icon"]).html($("<div/>").addClass("fa-fw"));

// Parse autoindex request query arguments
// As mod_autoindex still use ";" as separators URLSearchParams cannot be used
// So let's create a two dimensional array with the arguments
const args_array = search.split(/^\?|;|&/).filter(Boolean).map(e => e.split("="));
// Then convert it into a dictionary
const args = Object.fromEntries(args_array);

// Add sorting arrows
const sort_element_by_arg = {
	"N": {
		name: "file name",
		element: $("thead th").eq(columns["name"]),
	},
	"M": {
		name: "last-modified date",
		element: $("thead th").eq(columns["date"]),
	},
	"S": {
		name: "size",
		element: $("thead th").eq(columns["size"]),
	},
};

const sort_order_by_arg = {
	"A": {
		name: "ascending",
		classes: "fa-fw fas fa-sort-down",
	},
	"D": {
		name: "descending",
		classes: "fa-fw fas fa-sort-up",
	},
};

if ("C" in args && args["C"] in sort_element_by_arg
	&& "O" in args && args["O"] in sort_order_by_arg) {

	var element = sort_element_by_arg[args["C"]];
	var order = sort_order_by_arg[args["O"]];
	var title = "Sorted by " + order.name + " " + element.name;
	var icon = create_icon(order.classes, title);
	$("a", element.element).append(icon);
}

// Icon classes
const icon_class_by_type = {
	"default": {
		title: "File",
		classes: "fa-fw far fa-file",
	},
	"directory": {
		title: "Directory",
		classes: "fa-fw fas fa-folder",
	},
	"archive": {
		title: "Archive file",
		classes: "fa-fw far fa-file-archive",
	},
	"audio": {
		title: "Audio file",
		classes: "fa-fw far fa-file-audio",
	},
	"code": {
		title: "Source code file",
		classes: "fa-fw far fa-file-code",
	},
	"excel": {
		title: "Spreadsheet file",
		classes: "fa-fw far fa-file-excel",
	},
	"image": {
		title: "Image file",
		classes: "fa-fw far fa-file-image",
	},
	"pdf": {
		title: "PDF file",
		classes: "fa-fw far fa-file-pdf",
	},
	"powerpoint": {
		title: "Presentation file",
		classes: "fa-fw far fa-file-powerpoint",
	},
	"text": {
		title: "Text file",
		classes: "fa-fw far fa-file-alt",
	},
	"video": {
		title: "Video file",
		classes: "fa-fw far fa-file-video",
	},
	"word": {
		title: "Word file",
		classes: "fa-fw far fa-file-word",
	},
};

// Server current date
const m_server = moment(server_date, moment.ISO_8601);

// Create an empty stretched link
function create_stretched_link(href_url) {
	return $("<a/>")
		.attr("href", href_url)
		.addClass("stretched-link");
}

// Parse each row
$("tbody > tr").each(function(index) {
	var icon = $("td, th", this).eq(columns["icon"]);
	var name = $("td, th", this).eq(columns["name"]);
	var date = $("td, th", this).eq(columns["date"]);
	var size = $("td, th", this).eq(columns["size"]);

	// Read the type from the <img> alt text in the icon cell
	var type = $("img", icon).attr("alt").replace(/[\[\] ]+/g, "");

	// Remove the parent row
	if (type === "parent") {
		$(this).remove();
		return;
	}

	// Read the url from the <a> href in the name cell
	var href_url = $("a", name).attr("href");

	// For directories only:
	if (type === "directory") {
		href_url += search; // Append the search query string
		size.empty(); // And clear the size cell
	}

	// Generate a fancy icon
	var icon_type = (type in icon_class_by_type) ? type : "default";
	var icon_class = icon_class_by_type[icon_type];
	icon.html(create_icon(icon_class.classes, icon_class.title));

	// Generate a beautified date string
	var m = moment(date.html(), "YYYY-MM-DD HH:mm");

	if (m_server.diff(m, "days", true) < 1) {
		date.html(m.from(m_server));

	} else if (m_server.diff(m, "weeks", true) < 1) {
		date.html(m.format("dddd LT"));

	} else {
		date.html(m.format("LLL"));
	}

	// Generate stretched links in all cells to give the illusion
	// of a complete row for better compatibility.
	// https://github.com/twbs/bootstrap/issues/28608#issuecomment-614881795
	icon.append(create_stretched_link(href_url));
	$("a", name).attr("href", href_url).addClass("stretched-link");
	date.append(create_stretched_link(href_url));
	size.append(create_stretched_link(href_url));

	$("td, th", this).each(function(index) {
		$(this).wrapInner("<div class='position-relative'>");
	});
});

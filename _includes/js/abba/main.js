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

// Clear the icon column of the header
$("th").first().empty();

// Trim each cells inner html
$("td, th").each(function() {
	$(this).html($(this).html().trim());
});

// Get the search query string
const search = window.location.search;

const icon_classe_by_type = {
	"default": "fa-fw far fa-file",
	"directory": "fa-fw fas fa-folder",
	"archive": "fa-fw far fa-file-archive",
	"audio": "fa-fw far fa-file-audio",
	"code": "fa-fw far fa-file-code",
	"excel": "fa-fw far fa-file-excel",
	"image": "fa-fw far fa-file-image",
	"pdf": "fa-fw far fa-file-pdf",
	"powerpoint": "fa-fw far fa-file-powerpoint",
	"text": "fa-fw far fa-file-alt",
	"video": "fa-fw far fa-file-video",
	"word": "fa-fw far fa-file-word",
};

const m_server = moment(server_date, moment.ISO_8601);

// Parse each row
$("tbody > tr").each(function(index) {
	var icon = $("th", this).first();
	var date = $("td", this).eq(-2);
	var size = $("td", this).last();
	var link = $("a", this).first();

	// Read the type from the <img> alt text
	var type = $("img", icon).attr("alt").replace(/[\[\] ]+/g, "");

	// Replace the icon
	if (type in icon_classe_by_type) {
		icon.html("<i class='" + icon_classe_by_type[type] + "'/>");
	} else {
		icon.html("<i class='" + icon_classe_by_type["default"] + "'/>");
	}

	// Beautify date
	var m = moment(date.html(), "YYYY-MM-DD HH:mm");

	if (moment().diff(m, "days", true) < 1) {
		date.html(m.from(m_server));

	} else if (moment().diff(m, "weeks", true) < 1) {
		date.html(m.format("dddd LT"));

	} else {
		date.html(m.format("LLL"));
	}

	// Remove the parent row
	if (type === "parent") {
		$(this).remove();

	// Update directory style
	} else if (type === "directory") {
		link.attr("href", link.attr("href") + search);
		size.empty();
	}
});

// Get the path segments and remove empty fields
const path_segments = window.location.pathname.split("/").filter(Boolean);

// Create a name / url object for each path segments
var path_url = "/";
var path_urls = [{name: "<i class='fa-fw fas fa-home'/>", url: path_url + search}];
path_segments.forEach(function(segment) {
	path_url += segment + "/";
	path_urls.push({name: decodeURIComponent(segment), url: path_url + search});
});

// Create the breadcrumb elements for each previous objects
path_urls.forEach(function(url) {
	var a = $("<a/>").attr("href", url.url).html(url.name);
	var li = $("<li/>").addClass("breadcrumb-item").append(a);
	$(".breadcrumb").append(li);
});

// Set the last breadcrumb item as active
$(".breadcrumb li").last().addClass("active").children("a").contents().unwrap();

// Show main
$("main").show();

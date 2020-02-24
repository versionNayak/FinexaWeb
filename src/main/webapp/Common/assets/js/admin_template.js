$(document).ready(function() {
	//sessionStorage.removeItem("SELECTED_CLIENT_ID");
	//sessionStorage.removeItem("PAGE_MODE");

	//$("#header").load("../Common/partials/myclient_header-finexa.html");
	//$("#sidebar-wrapper").load("../Common/partials/myclient_Sidebar-clientinfo.html");

	$("#header").load("../Common/partials/admin_header_finexa.html");
	$("#wrapper").load("../Common/partials/admin_wrapper.html");
	$("#sidebar-wrapper").load("../Common/partials/admin_sidebar.html");	
	
	//$("#finexa-footer").load("../Common/partials/footer-finexa.html");
	$("#finexa-footer").load("../Common/partials/footer_finexa.html");	
});
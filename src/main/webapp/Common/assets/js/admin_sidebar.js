
$("#menu-toggle").on("click", function (e) {
    "use strict";
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
$("#menu-toggle-2").on("click", function (e) {
    "use strict";
    e.preventDefault();
    $("#wrapper").toggleClass("toggled-2");
    $("#sidebar-toggle-button-wrapper").toggleClass("toggled-2");
    $("#sidebar-toggle-top-menu-left-wrapper").toggleClass("toggled-2");
    $("#menu li").removeClass("expanded");
    $("#menu ul").hide();
});



$(document).ready(function () {
	console.log("Entering document.ready  ");
    "use strict";
    //initMenu();	
    
	$(".adduserdata").click(function(){/*	
		$("#wrapper").css("height","1433px");
		$("#page-content-wrapper").css("height","auto");
		$(".form-section-container").addClass("height1257px");
		$(".addclientdata").addClass('nosubmenu');
		$("#idClient").load("clientInfo/addClient.html");					
		$(".existingclientlhs").removeClass('nosubmenu');			
		$("#idSelectedClientName").empty();		
		sessionStorage.removeItem("SELECTED_CLIENT_ID");
		sessionStorage.setItem("PAGE_MODE", "ADD");					
	*/});
	
	$(".adminpaneldata").click(function(){	
		$("#wrapper").css("height","1433px");
		$("#page-content-wrapper").css("height","auto");
		$(".form-section-container").addClass("height1257px");
		$(".addclientdata").addClass('nosubmenu');
		$("#idClient").load("clientInfo/adminPanel.html");					
		$(".existingclientlhs").removeClass('nosubmenu');			
		$("#idSelectedClientName").empty();		
		sessionStorage.removeItem("SELECTED_CLIENT_ID");
		sessionStorage.setItem("PAGE_MODE", "ADD");					
	});
	
	$(".report").click(function(){	
		$("#wrapper").css("height","1433px");
		$("#page-content-wrapper").css("height","auto");
		$(".form-section-container").addClass("height1257px");
		$(".addclientdata").addClass('nosubmenu');
		$("#idClient").load("clientInfo/report.html");					
		$(".existingclientlhs").removeClass('nosubmenu');			
		$("#idSelectedClientName").empty();		
		sessionStorage.removeItem("SELECTED_CLIENT_ID");
		sessionStorage.setItem("PAGE_MODE", "ADD");					
	});

});




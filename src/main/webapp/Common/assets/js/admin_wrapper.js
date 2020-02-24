$(document).ready(function(){
	sessionStorage.setItem("PAGE_MODE", "Advisor Dashboard");
	$("#dashbord").load("clientInfo/viewAdminDashboard.html");
    $(".dashboardheading").html("Admin Panel");
	//advisor dashboard load in client side
    /*$("#dashbord").load("../../advisorMyClient.html");
    $(".dashboardheading").html("Advisor Dashboard");*/
   
});
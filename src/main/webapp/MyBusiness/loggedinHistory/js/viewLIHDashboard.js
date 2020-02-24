/*$(document).ready(function(){
	*//***********************Default On Load MyBusiness *****************************//*
	
});

$(".loggedin-history").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("loggedinHistory/viewLoggingHistory.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("View Logged-in History");
	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	$('#deleteRecord').addClass('btn_Disabled');
});

$('.sidebar-nav li a').click(function(){
	$('.mandatory').hide();
});

$(".addicon").click(function(){
	$('.mandatory').show();
});

$(".editicon").click(function(){
	$('.mandatory').show();
});

$('.sidebar-nav.nav-stacked>li.has-submenu').click(function(){
	$('.editicon').show();
	$('.editicon').addClass('btn_Disabled');
	$('.addicon').show();
	$('.deleteicon').show();
})*/
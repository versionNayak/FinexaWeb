$(document).ready(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("finexaSubscription/viewSubscriptionpackages.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Finexa Subscription Packages");
});



$(".subscription_packages").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("finexaSubscription/viewSubscriptionpackages.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Finexa Subscription Packages");
});

$(".subscribe_online").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("finexaSubscription/subscribeOnline.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Finexa Online Subscription");
});

$(".subscription_history").click(function(){
	$("#idBusiness").empty();
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Finexa Subscription History");
	$("#idBusiness").load("finexaSubscription/viewSubscriptionhistory.html");

});







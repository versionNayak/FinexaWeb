 $(document).ready(function() {
	 
	$("#idPackageListTable").empty();
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var url = "subscriptionList/" +loggedUser.id;
	getClientData("GET", "", url, onSubscriptionSuccess);
	function onSubscriptionSuccess(data) {
		$.each(data, function (index, sub) {
			var n = index+1;
			var moduleName = sub.moduleName.split("-")[1];
			$("#idPackageListTable").append('<tr id='+sub.id +'>' +
					'<td>' + n +'</td>' +
					'<td>' + moduleName + '</td>' +
					'<td>' + sub.userNumber+"/"+sub.clientNumber + '</td>' +
					'<td>' + sub.subscriptionPeriod + '</td>' +
					'<td>' + sub.dateOfSubscription + '</td>' +
					'<td>' + sub.dateOfExpairy + '</td>' +
					'<td>' + sub.subscriptionAmount + '</td>' +
				    '<td><button type="button" class="form-control addbtn full_width upgrade">Renew/Upgrade</button></td>' +
			'</tr>');
		}); 
	
	}
 
$(document).on('click','.upgrade',function(){

	console.log($(this).closest('tr').attr('id'));
	sessionStorage.setItem("SUBSCRIPTION_ID", $(this).closest('tr').attr('id'));
	
	$("#idBusiness").empty();
	$("#idBusiness").load("finexaSubscription/subscribeOnline.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Finexa Online Subscription");
	

});

 });

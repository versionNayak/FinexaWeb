$(document).ready(function() {

	
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var id=loggedUser.id;

	var editSubId = sessionStorage.getItem("SUBSCRIPTION_ID");
	sessionStorage.removeItem("SUBSCRIPTION_ID");
	console.log("editSubId : " + editSubId);
	if (editSubId != null){
		var url = "subscription/"+editSubId;
		getClientData("GET", "", url, onGetSubscription);
		
		function onGetSubscription(data) {
			populateForm($("#subscriptionOnline"), data);
			
			var radiostr = data.userNumber + "#" + data.clientNumber;
			//alert("radiostr: " + radiostr);
			$('input[type=checkbox]').each(function () {
				if($(this).val() == data.modules[0]){
					$(this).prop('checked', true);
					$(this).attr('disabled', true);
				}else{
					$(this).attr('disabled', true);
				}
			});
			
			$('input[type=radio]').each(function () {
				if($(this).val() == radiostr){
					$(this).prop('checked', true);
				}
			});			
			
		}
	}
	
	$('input[type=radio][name=planRadio]').on('change', function() {
		$('#idUserNumber').val($(this).val().split("#")[0]);
		$('#idClientNumber').val($(this).val().split("#")[1]);
	});

	$("#idGetPrice").on("click", function(event) {
		// call ajax for exact amount for the selected plan and set it
		$('#idSubscriptionAmount').val(10000);
	});
	
	$("#idSubscriptionSubmit").on("click", function(event) {
		event.preventDefault();
		if (validateFS($("#subscriptionOnline"))){
			var arr = [];
			$("input[name='moduleId']:checked").each( function(){
				arr.push($(this).val());
			})
				var formData = $('#subscriptionOnline').serializeToJSON();
				if(editSubId) formData["id"] = editSubId;
			
				formData["moduleId"] = "";
				formData["advisorId"] = id;
				formData["modules"] = arr;
				var data = JSON.stringify(formData);
				console.log("Data = " + data);
				getClientData("POST", data, "createSubscription", onAddSubscriptionSuccess);
		}
			
		function onAddSubscriptionSuccess(data) {
				$("#idBusiness").empty();
				$("#idBusiness").load("finexaSubscription/viewSubscriptionhistory.html");
				$(".dashboardheading    ").html("");
				$(".dashboardheading    ").html("Finexa Subscription History");
			}
	});

	


	
});
		
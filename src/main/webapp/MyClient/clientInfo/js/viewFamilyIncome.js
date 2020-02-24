var Selected_Client;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function (event) {
	console.log("ClientServiceUrl "+ClientServiceUrl);
	initRowHandlers();
	Selected_Client = JSON.parse(sessionStorage.getItem("SELECTED_CLIENT_ID"));
	sessionStorage.setItem("CLIENT_SERVICE_URL", ClientServiceUrl);
	
/*		serviceurl = "familyIncome/"+ Selected_Client;
		console.log(serviceurl);
		getClientData("GET", "",serviceurl, onSuccess);
*/	

	$("#idIncomeList").on("click", "tr", function (e) {
	//	console.log("Table row selected ");
		sessionStorage.setItem("SELECTED_Member_ID", $(this).find('#idMemberId').val());			
		 addRowHandlers();
		$(this).addClass("selected").siblings().removeClass("selected");
		$("#idIncomeList tr:nth-child(0)").removeClass("selected");
		
		console.log("ClientServiceUrl "+ClientServiceUrl);
		checkIfIncomePresentForAll('checkIfIncomePresentForAll/'+sessionStorage.getItem("SELECTED_CLIENT_ID")); 
		
	}); 
});


/*function onSuccess(data) {
	//	alert(data);
	console.log("l "+data.length);

	if(data.length===0){

          var pageUrl ="clientInfo/addFamilyincome.html";
          addPage(pageUrl,"Add Family Income");
		


	}
	else{
*/
		var data = JSON.parse(sessionStorage.getItem("INCOME_LIST"));
		console.log("data "+data);
		$("#idIncomeList").empty();
		$.each(data, function (index, income) {
			//alert(income.total);
			
			var incomeAmount = maskAmountValue(Math.round(income.total));
			
			$("#idIncomeList").append('<tr>' +
					'<td>' + income.firstName + ' ' + (income.middleName==null?"":income.middleName) + ' ' + income.lastName + '</td>' +
					'<td>' + incomeAmount + '</td>' +
					'<td class="hidden"><input type="text" id="idMemberId" name="memberId"  value=' + income.familyMemberId + ' readonly="readonly"></td>' +
			'</tr>');
		}); 


		checkIfIncomePresentForAll('checkIfIncomePresentForAll/'+sessionStorage.getItem("SELECTED_CLIENT_ID")); 
	//}
//}


    


	function checkIfIncomePresentForAll(serviceUrl){
		//	alert("checkIfIncomePresentForAll "+serviceUrl);
		getClientData("GET", "", serviceUrl, checkSuccess);
		function checkSuccess(data) {
			console.log("data.length "+data.length);

			if(data.length==0){

				console.log("data.length "+data.length);
				$('#addRecord').addClass('btn_Disabled');
				

			}else{
				
				$('#addRecord').removeClass('btn_Disabled');

			}
		}
	}

	



function confirmationClick(){
	$('#myModal').modal('hide');
	//console.log("ffffffffff");
	deleteSelectedRecord(ClientServiceUrl + 'delete/'+sessionStorage.getItem("SELECTED_CLIENT_ID")+'/'+sessionStorage.getItem("SELECTED_Member_ID"));
	
	getClientData("GET", "", "familyIncome/" + Selected_Client, afterDeleteSuccess);
	function afterDeleteSuccess(afterDeleteddata) {
		$("#idIncomeList").empty();
		if(afterDeleteddata.length==0)
		{
	          if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
	        	  var pageUrl ="clientInfo/addFamilyIncome.html";
		          addPage(pageUrl,"Add Family Income");
					
				}else{
					addPage("clientInfo/authorisationErrorPage.html","Access Denied");
				}
		}
		
		$.each(afterDeleteddata, function (index, income) {
			var incomeAmount = maskAmountValue(income.total);
			$("#idIncomeList").append('<tr>' +
					'<td>' + income.firstName + ' ' + (income.middleName==null?"":income.middleName) + ' ' + income.lastName + '</td>' +
					'<td>' + incomeAmount + '</td>' +
					'<td class="hidden"><input type="text" id="idMemberId" name="memberId"  value=' + income.familyMemberId + ' readonly="readonly"></td>' +
			'</tr>');
		});
		
		//checkIfIncomePresentForAll(sessionStorage.getItem("CLIENT_SERVICE_URL") + '/checkIfIncomePresentForAll/'+sessionStorage.getItem("SELECTED_CLIENT_ID")); 
		var serviceurl = "checkIfIncomePresentForAll/" + Selected_Client;
		getClientData("GET", "", serviceurl, onSuccesscheckIfIncomePresentForAll);

		function onSuccesscheckIfIncomePresentForAll(data){
			console.log("data.length "+data.length);

			if(data.length==0){

				console.log("data.length "+data.length);
				$('#addRecord').addClass('btn_Disabled');
				

			}else{
				
				$('#addRecord').removeClass('btn_Disabled');

			}

		} 
	
	}
	
}


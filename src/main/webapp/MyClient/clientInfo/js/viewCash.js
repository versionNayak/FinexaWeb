initRowHandlers();
selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
var findid ;
$(document).ready(function (event ) {
	var data = JSON.parse(sessionStorage.getItem("CASH_LIST"));
	$("#idCashList").empty();
	$.each(data, function (index, cash) {
		var maskedcb = maskAmountValue(cash.currentBalance); 
		$("#idCashList").append('<tr>' +
		'<td>' + cash.ownerName +  '</td>' +
		'<td>' + (cash.bankName==null?"":cash.bankName) + '</td>' +
		'<td>' + cash.cashBalanceTypeName + '</td>' +
		'<td>' + maskedcb + '</td>' +
		'<td class="hidden"><input type="text" id="cashId" name="clientId"  value=' + cash.id + ' readonly="readonly"></td>' +
		'</tr>');
	});
			
	$("#idCashList").on("click", "tr", function (e) {
		addRowHandlers();
		//alert($(this).find("#cashId").val());
		findid=$(this).find("#cashId").val();
		sessionStorage.removeItem("SELECTED_CASH_ID");
		sessionStorage.setItem("SELECTED_CASH_ID", findid);
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected");
	}); 
});
	 				
function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"clientCashDelete/"+ sessionStorage.getItem("SELECTED_CASH_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"clientCash/client/" +selectedClientId,
		dataType : 'json',
		contentType : 'application/json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success : function(afterDeleteddata) {
			if (afterDeleteddata.length==0) {
				//	var addURL = "clientInfo/addCash.html";
				//	addPage(addURL,"Add Cash");
					
				if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
					var addURL = "clientInfo/addCash.html";
					addPage(addURL,"Add Cash");
					
				}else{
					addPage("clientInfo/authorisationErrorPage.html","Access Denied");
				}
				
			}
			$("#idCashList").empty();
			$.each(afterDeleteddata, function (index, updatedCash) {
				var maskedcb = maskAmountValue(updatedCash.currentBalance); 
				$("#idCashList").append('<tr>' +
								'<td>' + updatedCash.ownerName +  '</td>' +
	 							'<td>' + updatedCash.bankName + '</td>' +
	 							'<td>' + updatedCash.cashBalanceTypeName + '</td>' +
	 							'<td>' + maskedcb + '</td>' +
								'<td class="hidden"><input type="text" id="cashId" name="clientId"  value=' + updatedCash.id + ' readonly="readonly"></td>' +
								'</tr>');
			});
		},
		error : function(jqXHR, exception) {
			if(jqXHR.status == 401){
				var error,error_description;
				error = jqXHR.responseJSON.error_description;
				error_description = "Access token expired: "+sessionStorage.getItem("sessionID");
				if(error === error_description){
	        		msg = "Your session has expired.Please log in again"
	        		bootbox.alert({
			        	 message: msg,
			        	 callback: function () {
				         window.location = "../index.html";
			         }
			      })
	        	}
	        	if(error === "unauthorized"){
	        		msg = "Full authentication is required to access this resource",
	        		bootbox.alert({
			        	 message: msg
			        })
	        	}	
	        }
			alert("error add client service" + data.responseText);
		}
	});
}
	          

selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
var findid;
$(document).ready(function (event ) {
	initRowHandlers();	
	$("#deleteMessage").hide();
	console.log("Adding Client SmallSavings");
		
	var data = JSON.parse(sessionStorage.getItem("SMALL_SAVINGS_LIST"));
	$("#viewSSList").empty();
	$.each(data, function (index, ss) {
		var maskedinvestmentAmount = maskAmountValue(ss.investmentAmount); 
	$("#viewSSList").append('<tr>' +
			'<td>' + ss.ownerName + '</td>' +
			'<td>' + ss.financialAssetName + '</td>' +
			'<td>' + ss.startDate + '</td>' +
			'<td>' + maskedinvestmentAmount + '</td>' +
			'<td class="hidden"><input type="text" id="idssId" name="clientId" value=' + ss.id + ' readonly="readonly"></td>' +
			'</tr>');
	});
	
	$("#viewSSList").on("click","tr",function(e){
		addRowHandlers();
		findid=$(this).find("#idssId").val();
		sessionStorage.removeItem("SELECTED_SS_ID");
		sessionStorage.setItem("SELECTED_SS_ID",findid);
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
	});
	
});

function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"clientSmallSavingDelete/"+ sessionStorage.getItem("SELECTED_SS_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"clientSmallSaving/client/" + selectedClientId,
		dataType : 'json',
		contentType : 'application/json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success : function(afterDeleteddata) {
			if (afterDeleteddata.length==0)
				{
					if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
						var pageUrl = "clientInfo/addSmallSavingScheme.html"
						addPage(pageUrl, "Add Small Savings Schemes");
						
					}else{
						addPage("clientInfo/authorisationErrorPage.html","Access Denied");
					}
				}
			
			$("#viewSSList").empty();
			$.each(afterDeleteddata, function (index, updatedSS) {
				
				$("#viewSSList").append('<tr>' +
				'<td>' + updatedSS.ownerName + '</td>' +
				'<td>' + updatedSS.financialAssetName + '</td>' +
				'<td>' + updatedSS.startDate + '</td>' +
				'<td>' + updatedSS.investmentAmount + '</td>' +
				'<td class="hidden"><input type="text" id="idssId" name="clientId" value=' + updatedSS.id + ' readonly="readonly"></td>' +
				'</tr>');
				
			});			
		},
		error : function(jqXHR, data) {
			
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
	        
	        	 //msg = 'You are not authorized to access this data.';
	        	//msg = 'User not found.';
	        	 //alert(msg);
	        	bootbox.alert({
	        	    message: "You are not authenticated",
	        	    callback: function () {
		        	  window.location = "../index.html";
	        	    }
	        	})
	        }
			alert("error add client service" + data.responseText);
		}
	});
	
}
	




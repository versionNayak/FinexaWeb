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
	initRowHandlers(); 
	$("#deleteMessage").hide();
	console.log("Viewing Client Non Life Insurance");
	
	var data = JSON.parse(sessionStorage.getItem("NONLIFE_INSURANCE_LIST"));
	$("#viewNonLifeInsuranceList").empty();
	$.each(data, function (index, nonlifeInsurance) {
		var maskedpremiumAmount = maskAmountValue(nonlifeInsurance.premiumAmount); 
		$("#viewNonLifeInsuranceList").append('<tr>' +
				'<td>' + nonlifeInsurance.lookupPolicyTypeDesc + '</td>' +
				'<td>' + nonlifeInsurance.ownerName + '</td>' +
				'<td>' + nonlifeInsurance.insuranceCompanyName + '</td>' +
				'<td>' + nonlifeInsurance.policyName + '</td>' +
				'<td>' + nonlifeInsurance.policyNumber + '</td>' +
				'<td>' + maskedpremiumAmount + '</td>' +
				'<td class="hidden"><input type="text" id="idNonLifeInsId" name="idNonLifeInsId"  value=' + nonlifeInsurance.id + ' readonly="readonly"></td>' +
				'</tr>');
	}); 
	
	$("#viewNonLifeInsuranceList").on("click","tr",function(e){	
             addRowHandlers();
 		findid=$(this).find("#idNonLifeInsId").val();
 		sessionStorage.removeItem("SELECTED_NON_LIFE_INSURANCE_ID");
		sessionStorage.setItem("SELECTED_NON_LIFE_INSURANCE_ID",findid);
 		  $(this).addClass("selected");
		  $(this).addClass("selected").siblings().removeClass("selected");
		 });


});

function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"clientNonLifeInsuranceDelete/"+sessionStorage.getItem("SELECTED_NON_LIFE_INSURANCE_ID"));
	   $.ajax({
			type : 'GET',
			async : true,
			url : ClientServiceUrl+"/clientNonLifeInsurance/client/" + selectedClientId,
			dataType : 'json',
			contentType : 'application/json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success : function(afterDeleteddata) {
                if(afterDeleteddata.length==0)
				{
                   
                    if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
                    	 var pageUrl ="clientInfo/addNonLifeInsurance.html"
                         addPage(pageUrl,"Add Non Life Insurance");
						
					}else{
						addPage("clientInfo/authorisationErrorPage.html","Access Denied");
					}
				}
                $("#viewNonLifeInsuranceList").empty();
				$.each(afterDeleteddata, function (index, nonlifeInsurance) {
					var updatedmaskedpremiumAmount = maskAmountValue(nonlifeInsurance.premiumAmount); 
					$("#viewNonLifeInsuranceList").append('<tr>' +
							'<td>' + nonlifeInsurance.lookupPolicyTypeDesc + '</td>' +
							'<td>' + nonlifeInsurance.ownerName + '</td>' +
							'<td>' + nonlifeInsurance.insuranceCompanyName + '</td>' +
							'<td>' + nonlifeInsurance.policyName + '</td>' +
							'<td>' + nonlifeInsurance.policyNumber + '</td>' +
							'<td>' + updatedmaskedpremiumAmount + '</td>' +
							'<td class="hidden"><input type="text" id="idNonLifeInsId" name="idNonLifeInsId"  value=' + nonlifeInsurance.id + ' readonly="readonly"></td>' +
							'</tr>');
				}); 
            },
			error : function(jqXHR, data) {
				//alert("error add client service" + data.responseText);
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
			}     
	   });
	
}

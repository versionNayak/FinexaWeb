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
	serviceurl = "clientLifeInsurance/client/" + selectedClientId;
	
/*	   $.ajax({
			type : 'GET',
			async : true,
			url : ClientServiceUrl+serviceurl,
			dataType : 'json',
			contentType : 'application/json',
			success : function(data) {
				if(data.length==0)
				{
				var addURL = "clientInfo/addLifeinsurance.html";
				addPage(addURL,"Add Life Insurance");
				}
*/

				var data = JSON.parse(sessionStorage.getItem("LIFE_INSURANCE_LIST"));
				$("#viewLifeInsuranceList").empty();
				$.each(data, function (index, lifeInsurance) {
					var maskedpremiumAmount = maskAmountValue(lifeInsurance.premiumAmount); 
				$("#viewLifeInsuranceList").append('<tr>' +
						'<td>' + lifeInsurance.lookupPolicyTypeDesc + '</td>' +
						'<td>' + lifeInsurance.ownerName + '</td>' +
						'<td>' + lifeInsurance.insuranceCompanyName + '</td>' +
						'<td>' + lifeInsurance.policyName + '</td>' +
						'<td>' + lifeInsurance.policyNumber + '</td>' +
						'<td>' + maskedpremiumAmount + '</td>' +
						'<td class="hidden"><input type="text" id="idLifeInsId" name="idLifeInsId"  value=' + lifeInsurance.id + ' readonly="readonly"></td>' +
						'</tr>');
			}); 

/*			},
			error : function(data) {
		
			$("#idClient").load("resources/errorPage.html");
				  $(".dashboardheading    ").html("Error Page");
		         $("#addRecord").hide();
		           $('#editRecord').hide();
		           $('#deleteRecord').hide();
			}     
			});
*/


	
	$("#viewLifeInsuranceList").on("click","tr",function(e){	
             addRowHandlers();
 		findid=$(this).find("#idLifeInsId").val();
 		sessionStorage.removeItem("SELECTED_LIFE_INSURANCE_ID");
		sessionStorage.setItem("SELECTED_LIFE_INSURANCE_ID",findid);
 		  $(this).addClass("selected");
		  $(this).addClass("selected").siblings().removeClass("selected"); 
		 });


});

function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"deleteclientLifeInsurance/"+sessionStorage.getItem("SELECTED_LIFE_INSURANCE_ID"));
	   $.ajax({
			type : 'GET',
			async : true,
			url : ClientServiceUrl+"clientLifeInsurance/client/" + selectedClientId,
			dataType : 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			contentType : 'application/json',
			success : function(afterDeleteddata) {
                if(afterDeleteddata.length==0)
				{
                   
                    if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
                    	 var pageUrl ="clientInfo/addLifeInsurance.html"
                         addPage(pageUrl,"Add Life Insurance");
						
					}else{
						addPage("clientInfo/authorisationErrorPage.html","Access Denied");
					}
				}
                $("#viewLifeInsuranceList").empty();
				$.each(afterDeleteddata, function (index, updatedlifeInsurance) {
					var updatedmaskedpremiumAmount = maskAmountValue(updatedlifeInsurance.premiumAmount); 
					$("#viewLifeInsuranceList").append('<tr>' +
							'<td>' + updatedlifeInsurance.lookupPolicyTypeDesc + '</td>' +
							'<td>' + updatedlifeInsurance.ownerName + '</td>' +
							'<td>' + updatedlifeInsurance.insuranceCompanyName + '</td>' +
							'<td>' + updatedlifeInsurance.policyName + '</td>' +
							'<td>' + updatedlifeInsurance.policyNumber + '</td>' +
							'<td>' + updatedmaskedpremiumAmount + '</td>' +
							'<td class="hidden"><input type="text" id="idLifeInsId" name="idLifeInsId"  value=' + updatedlifeInsurance.id + ' readonly="readonly"></td>' +
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
		        }
				alert("error view client life insurance service" + data.responseText);
			}     
		});
	
}

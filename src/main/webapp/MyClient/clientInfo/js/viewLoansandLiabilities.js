var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var findid ;
$(document).ready(function (event ) {
	initRowHandlers();
	var data = JSON.parse(sessionStorage.getItem("LOAN_LIST"));
	console.log("Json format: " + data);
	$("#idLoanList").empty();
	
	$.each(data, function (index, loan) {
		var emiAmountVal;
		var loanProviderName;
		if(loan.loanType==2){	
			if(loan.emiAmount==null) {
					  emiAmountVal="NA";
			}
		}
		else {
			if(loan.loanType==1) {
				 emiAmountVal=loan.emiAmount;
			}
		}
		var maskedLoanAmount = maskAmountValue(loan.loanAmount);
		var maskedEMIAmount = maskAmountValue(emiAmountVal);
		
		if(loan.loanType==1){
			loanProviderName=loan.emiLoanProviderName;
		}else{
			if(loan.loanType==2) {
				loanProviderName=loan.loanProviderName;
			}
		}
		
		
		if(loan.loanType==2){	
			if(loan.emiAmount==null) {
				maskedEMIAmount="NA";
			}
		}
		
		
		$("#idLoanList").append('<tr>' +
			'<td>' +loan.ownerName +  '</td>' +
			'<td>' + loan.loanCategoryName + '</td>' +
			'<td>' + loan.loanDescription + '</td>' +
			'<td>' + loanProviderName +  '</td>' +
			'<td>' + maskedLoanAmount + '</td>' +
			'<td>' + maskedEMIAmount + '</td>' +
			'<td class="hidden"><input type="text" id="loanId" name="clientId"  value=' + loan.id + ' readonly="readonly"></td>' +
			'</tr>');
	});
			 				
	$("#idLoanList").on("click", "tr", function (e) {
	   addRowHandlers();
	   findid=$(this).find("#loanId").val();
	  sessionStorage.removeItem("SELECTED_LOAN_ID");
	   sessionStorage.setItem("SELECTED_LOAN_ID",findid);
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected");
	}); 
			 			
});
			 						
function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"clientLoanDelete/"+ sessionStorage.getItem("SELECTED_LOAN_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"clientLoan/client/" +selectedClientId,
		dataType : 'json',
		contentType : 'application/json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success : function(afterDeleteddata) {
			if (afterDeleteddata.length==0)
				{
					if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
						var pageUrl = "clientInfo/addLoansandLiabilities.html";
						addPage(pageUrl, "Add Loans and Liabilities");
						
					}else{
						addPage("clientInfo/authorisationErrorPage.html","Access Denied");
					}
				}
			$("#idLoanList").empty();
			$.each(afterDeleteddata, function (index, updatedLoans) {
				var emiAmountVal;
				if(updatedLoans.loanType==2){	
					if(updatedLoans.emiAmount==null) {
							  emiAmountVal="NA";
					}
				}
				else {
					if(updatedLoans.loanType==1) {
						 emiAmountVal=updatedLoans.emiAmount;
					}
				}
				var maskedLoanAmount = maskAmountValue(updatedLoans.loanAmount);
				if (emiAmountVal!="NA") {
					var maskedEMIAmount = maskAmountValue(emiAmountVal);
				} else {
					maskedEMIAmount = "NA";
				}
				
					$("#idLoanList").append('<tr>' +
							'<td>' +updatedLoans.ownerName +  '</td>' +
							'<td>' + updatedLoans.loanCategoryName + '</td>' +
							'<td>' + updatedLoans.loanDescription + '</td>' +
							'<td>' + updatedLoans.loanProviderName +  '</td>' +
							'<td>' + maskedLoanAmount + '</td>' +
							'<td>' + maskedEMIAmount + '</td>' +
							'<td class="hidden"><input type="text" id="loanId" name="loanId"  value=' + updatedLoans.id + ' readonly="readonly"></td>' +
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
			alert("error add client service" + data.responseText);
		}
	});
	
}
    			

selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var findid ;

$(document).ready(function (event ) {
	initRowHandlers();
	
	
/*				$("#deleteMessage").hide();
			    serviceurl = "clientLumpsum/client/" +selectedClientId;
			    getClientData("GET", "" , serviceurl, onSuccess);

			 	function onSuccess(data){
			 		if(data.length==0)
						{
						var addURL = "clientInfo/addLumpsum.html";
						addPage(addURL,"Add Lumpsum Inflows");
						}
*/
					    var data = JSON.parse(sessionStorage.getItem("LUMPSUM_LIST"));
						$("#idLumpsumList").empty();
						$.each(data, function (index, lumpsum) {
							var maskedexpectedInflow = maskAmountValue(lumpsum.expectedInflow); 
			 					$("#idLumpsumList").append('<tr>' +
			 							/*'<td>' + lumpsum.ownerName +  '</td>' +*/
			 							'<td>' + lumpsum.inflowDesc + '</td>' +
			 							'<td>' + maskedexpectedInflow + '</td>' +
			 							'<td>' + lumpsum.expectedInflowDate +  '</td>' +
			 							'<td class="hidden"><input type="text" id="lumpsumId" name="clientId"  value=' + lumpsum.id + ' readonly="readonly"></td>' +
			 							'</tr>');
			 				});
			 			//}
			 				
			 				$("#idLumpsumList").on("click", "tr", function (e) {
			 				 addRowHandlers();
			 				findid=$(this).find("#lumpsumId").val();
			 				sessionStorage.removeItem("SELECTED_LUMPSUM_ID");
			 				sessionStorage.setItem("SELECTED_LUMPSUM_ID",findid);
			 					$(this).addClass("selected");
			 					$(this).addClass("selected").siblings().removeClass("selected");
			 
			 				}); 
			 				
			 				
	});




function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"clientLumpsumDelete/"+ sessionStorage.getItem("SELECTED_LUMPSUM_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"clientLumpsum/client/" +selectedClientId,
		dataType : 'json',
		contentType : 'application/json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	   }, 
		success : function(afterDeleteddata) {
			if (afterDeleteddata.length==0)
				{
				
					if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
						var pageUrl = "clientInfo/addLumpsum.html"
						addPage(pageUrl, "Add Lumpsum Inflows");
						
					}else{
						addPage("clientInfo/authorisationErrorPage.html","Access Denied");
					}
				}

			 $.each(afterDeleteddata, function (index, updatedLumpsum) {
				 var maskedexpectedInflow = maskAmountValue(updatedLumpsum.expectedInflow); 
				 $("#idLumpsumList").empty();
					$("#idLumpsumList").append('<tr>' +
							/*'<td>' + updatedLumpsum.ownerName +  '</td>' +*/
							'<td>' + updatedLumpsum.inflowDesc + '</td>' +
							'<td>' + maskedexpectedInflow + '</td>' +
							'<td>' + updatedLumpsum.expectedInflowDate +  '</td>' +
							'<td class="hidden"><input type="text" id="lumpsumId" name="clientId"  value=' + updatedLumpsum.id + ' readonly="readonly"></td>' +
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

			 				
			 				
			 				
			 				
			 				
			 				
			 				
			 				
			 				
			 				
			 					
			 			
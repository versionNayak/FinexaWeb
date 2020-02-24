var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

$('#familyCover').hide();

$(document).ready(function(){
	
	
	
	//alert(loggedInUser.id);
	console.log(loggedInUser.id);
	
	
	
	
	
	
	$('#wait').hide();
	
	getARNs();
	
			var options =  {
					  onComplete: function(cep) {
					     
					  },
					  onKeyPress: function(cep, event, currentField, options){
					    
					  },
					  onChange: function(cep){
					    
					  },
					  onInvalid: function(val, e, f, invalid, options){
					    
					  }
			};
			
			$('#idFromDate').mask('00/0000',options);
			$('#idToDate').mask('00/0000',options);
			
			"use strict";
			$("[data-toggle=\"tooltip\"]").tooltip();
			
			$("#idFromDate").datepicker('remove'); 
			$("#idFromDate").datepicker({
				 format: "mm-yyyy",
			     viewMode: "months",
			     minViewMode: "months",
				autoclose: true,
				forceParse: false
			}).on('changeDate', function(ev){
				$("#idFromDateGroup").css('border','1px solid #ccc');				
				$("#idFromDateGroup").css('borderRadius','7px');	
			});
			
			$("#idToDate").datepicker('remove'); 
			$("#idToDate").datepicker({
				format: "mm-yyyy",
			     viewMode: "months",
			     minViewMode: "months",
			     autoclose: true,
				forceParse: false
			}).on('changeDate', function(ev){
				$("#idToDateGroup").css('border','1px solid #ccc');				
				$("#idToDateGroup").css('borderRadius','7px');	
			});
			
			$(".datepicker-icon").on("click", function() {
				$(this).closest(".input-group").find("input").trigger("focus");
			});
			
			
		
		   /* btn.onclick = function() {
		    	
		    }*/
			$('input[type="radio"][name="reportFormat"]').change(function() {
				reportFormat = this.value;
				console.log("reportFormat: " + reportFormat);
			});
		  
			
						
			
				
				$("#exportReport").on("click", function(event) {
					
					
					//bootbox.alert("data");
				    
				    
					/*var validate;
					validate = validatePortfolioValuationReportExport($('#idPortfolioValuationReportForm'));
					*/
				//	if(validate == true && errTransReport == 0) {
						var formData = $('#idTransactionReportForm').serializeToJSON();
						

				    	var fromDateParts = formData.fromDate.split('/');
						console.log(fromDateParts[1]+'-'+fromDateParts[0]);
						
						var fromDate = fromDateParts[1]+'-'+fromDateParts[0];
						
						var toDateParts = formData.toDate.split('/');
						console.log(toDateParts[1]+'-'+toDateParts[0]);
						
						var toDate = toDateParts[1]+'-'+toDateParts[0];
						
						/*var larn = document.getElementById("idARNs");
						var arn = larn.options[larn.selectedIndex].value;*/
						
						
						alert($('#idARNs').val());
						//var arn = document.getElementById("idARNs").value;
						
						$.ajax({
							async: false,
//							
							url: ClientServiceUrl + "exportBusinessTransactionReport?advisorID=" + loggedInUser.id+ "&reportFormat=" + reportFormat + "&fromDate=" + fromDate + 
							"&toDate=" + toDate +"&arn=" + $('#idARNs').val(),
							method: "GET",
							beforeSend: function (xhr){ 
								xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
						    },
							success: function (data) {
								$('#wait').hide();
								
								if(data == "No Data") {
									bootbox.alert("No data found in report.");
								} else {
									var a = document.createElement("a");
									document.body.appendChild(a);
									a.style = "display: none";
									
									if(reportFormat == "pdf") {
										var fileName = "BusinessTransactionReport.pdf";
									} else if(reportFormat == "excel") {
										var fileName = "BusinessTransactionReport.xls";
									}
									
									var xhr = new XMLHttpRequest();
									xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadHandlerForBusinessReports/transactionSummary/' + reportFormat, true);
									xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
									xhr.responseType = "blob";
									xhr.onload = function() {
										if(xhr.status == 401){
								        	bootbox.alert({
								        	    message: "You are not authenticated",
								        	    callback: function () {
									        	  window.location = "../../index.html";
								        	    }
								        	});
								        }else if(xhr.status == 403){
								        	 msg = 'you don’t have permission to access ‘/’ on this server.';
								        	 bootbox.alert(msg);
								        }else if(xhr.status === 200){
								        	if (window.navigator.msSaveOrOpenBlob) {
												console.log("IE")
												if(reportFormat == "pdf") {
													var blob = new Blob([xhr.response], {type: 'application/pdf'});
								                    window.navigator.msSaveOrOpenBlob(blob, fileName);
								                    a.click();
												} else if(reportFormat == "excel") {
													var blob = new Blob([xhr.response], {type: 'application/vnd.ms-excel'});
								                    window.navigator.msSaveOrOpenBlob(blob, fileName);
								                    a.click();
												}
											} else {
							                	console.log("Chrome or Safari");
							                	var url = window.URL.createObjectURL(xhr.response);  
												a.href = url;
												a.download = fileName;
												a.click();
												window.URL.revokeObjectURL(url);
							                }
								        }
									};
									xhr.send();  
								}
							},
							error: function (jqXHR, exception) {
								$('#wait').hide();
								var msg = '';
						        if (jqXHR.status === 0) {
						            msg = 'Could not connect to the server, please contact System Administrator.';
						        }else if(jqXHR.status == 400){
						        	msg = 'There is some problem in the server, please contact System Administrator.\n';
						        }else if(jqXHR.status == 401){
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
								      });
						        	}
						        	if(error === "unauthorized"){
						        		msg = "Full authentication is required to access this resource",
						        		bootbox.alert({
								        	 message: msg
								        });
						        	}	
						        } else if (jqXHR.status == 404) {
						            msg = 'Requested service url not found.';
						        } else if (jqXHR.status == 405) {
						        	msg = 'Could not connect to the server, please contact System Administrator.\n';
						        } else if (jqXHR.status == 500) {
						        	msg = 'There is some problem in the server, please contact System Administrator.\n';
						        } else if (exception === 'parsererror') {
						            msg = 'Failed to get result.';
						        } else if (exception === 'timeout') {
						            msg = 'Timed Out!';
						        } else if (exception === 'abort') {
						            msg = 'Request aborted.';
						        } else {
						            msg = 'Something went wrong, could not connect to the server, please contact System Administrator.\n';
						        }
						        
						        $("#idBackOffice").load("resources/errorPage.html");
						     
							}
						});
					//}
					
				});
			
			
			
});
function getARNs() {
	serviceurl = "allARNbyadvisorId/" + loggedInUser.id;
	getClientData("GET", "", serviceurl, onARNListSuccess);

	alert("After "+loggedInUser.id);

	function onARNListSuccess(data) {
	
		fnDrop = $("#idARNs");
		fnDrop.find('option').remove();
	$.each(data, function (index, item) {
		
		
		fnDrop.append('<option value="' + item.id + '">' + item.arn + '</option>');
		});
	}
}



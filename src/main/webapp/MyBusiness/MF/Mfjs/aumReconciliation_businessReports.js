var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var reportFormat;
var distributorId;
$(document).ready(function(){
	
	console.log(loggedInUser.id);
	
	$('#wait').hide();
	
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
	
	$('#idAsOnDate').mask('00/00/0000',options);
	
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	
	$("#idAsOnDate").datepicker('remove'); 
	$("#idAsOnDate").datepicker({
		format: "dd/mm/yyyy",
		endDate: '0d',
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false
	}).on('changeDate', function(ev){
		$("#idAsOnDateGroup").css('border','1px solid #ccc');				
		$("#idAsOnDateGroup").css('borderRadius','7px');	
	});
	
	$(".datepicker-icon").on("click", function() {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	$('input[type="radio"][name="reportFormat"]').change(function() {
		reportFormat = this.value;
		console.log("reportFormat: " + reportFormat);
	});
	
	//getDistributorNameList();
	
	$("#idDistributors").change(function() {
		distributorId = $(this).val();
	});
	
	$('input[type="radio"][name="reportFormat"]').change(function() {
		reportFormat = this.value;
		console.log("reportFormat: " + reportFormat);
	});
	
	$(document).ajaxStart(function () {
		$('#wait').show();
	});
	
	$(document).ajaxStop(function () {
		$('#wait').hide();
    });
    
    $(document).ajaxError(function () {
    	$('#wait').hide();
    });
    
    var btn = document.getElementById("showAUMReconciliationReport");
    
	btn.onclick = function() {/*
		
		var formData = $('#idAumReconciliationReportForm').serializeToJSON();
		
		var asOnDateParts = formData.asOnDate.split('/');
		console.log(asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0]);
		
		var asOnDate = asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0];
		
		$.ajax({
			async: false,
			url: ClientServiceUrl + "generateAumReconciliationReport?distributorId=" + distributorId + "&asOnDate=" + asOnDate,
			method: "GET",
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function (data) {
				$('#wait').hide();
				if(data == "No Data") {
					bootbox.alert("No data found in report.");
				} else {
					window.open("resources/AumReconciliationReport.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
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
		
		
	*/}
	
	$("#exportAUMReconciliationReport").on("click", function(event) {/*
		
		var formData = $('#idAumReconciliationReportForm').serializeToJSON();
		
		var asOnDateParts = formData.asOnDate.split('/');
		console.log(asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0]);
		
		var asOnDate = asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0];
		
		$.ajax({
			async: false,
			url: ClientServiceUrl + "exportAumReconciliationReport?distributorId=" + distributorId + "&reportFormat=" + reportFormat + "&asOnDate=" + asOnDate,
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
						var fileName = "AumReconciliationReport.pdf";
					} else if(reportFormat == "excel") {
						var fileName = "AumReconciliationReport.xls";
					}
					
					var xhr = new XMLHttpRequest();
					xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadHandlerForBusinessReports/aumReconciliation/' + reportFormat, true);
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
				        	 alert(msg);
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
					         window.location = "../../index.html";
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
		
	*/});
	
	
});

function getDistributorNameList() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"getDistributorName",
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			fhDrop = $("#idDistributors");
			fhDrop.find('option').remove();
			fhDrop.append('<option value="">Select Distributors</option>');
			$.each(data, function (index, item) {
				fhDrop.append('<option value="' + item.id + '">' + item.firstName + '</option>');
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
			      });
	        	}
	        	if(error === "unauthorized"){
	        		msg = "Full authentication is required to access this resource",
	        		bootbox.alert({
			        	 message: msg
			        });
	        	}	
	        }
			$("#idBackOffice").load("resources/errorPage.html");
			$(".dashboardheading").html("Error Page");
	        $("#addRecord").hide();
	        $("#editRecord").hide();
	        $("#deleteRecord").hide();
		}     
	});	
}


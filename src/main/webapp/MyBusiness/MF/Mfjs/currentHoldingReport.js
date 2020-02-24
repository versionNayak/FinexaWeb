var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var reportType;
var clientIdR;
var clientIdUR;
var reportFormat;
var reportFormatUR;
$(document).ready(function() {
	
	console.log(loggedInUser.id);
	
	$('#wait').hide();
	
	$("#idRealizedGainContents").hide();
	$("#idUnrealizedGainContents").hide();
	
	$('input[type="radio"][name="reportType"]').change(function() {
		reportType = this.value;
	    if (this.value == 'realized') {
	    	$(".dashboardheading").html("Realized Gain - Current Holding");
	    	$("#idRealizedGainContents").show();
	    	$("#idUnrealizedGainContents").hide();
	    } else if (this.value == 'unrealized') {
	    	$(".dashboardheading").html("Unrealized Gain - Current Holding");
			$("#idUnrealizedGainContents").show();	
			$("#idRealizedGainContents").hide();
	    }
	});
	
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
	
	$('#idFromDate').mask('00/00/0000',options);
	$('#idToDate').mask('00/00/0000',options);
	
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	
	$("#idFromDate").datepicker('remove'); 
	$("#idFromDate").datepicker({
		format: "dd/mm/yyyy",
		endDate: '0d',
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false
	}).on('changeDate', function(ev){
		$("#idFromDateGroup").css('border','1px solid #ccc');				
		$("#idFromDateGroup").css('borderRadius','7px');
	});
	
	$("#idToDate").datepicker('remove'); 
	$("#idToDate").datepicker({
		format: "dd/mm/yyyy",
		endDate: '0d',
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false
	}).on('changeDate', function(ev){
		$("#idToDateGroup").css('border','1px solid #ccc');				
		$("#idToDateGroup").css('borderRadius','7px');	
	});
	
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
	
	getInvestorOrClientNameList();
	getInvestorOrClientNameListUR();
	getFundHouseList();
	getFundHouseListUR();
	
	$("#idClients").change(function() {
		clientIdR = $(this).val();
		console.log("clientIdR: " + clientIdR);
	});	
	
	$("#idClientsUR").change(function() {
		clientIdUR = $(this).val();
		console.log("clientIdUR: " + clientIdUR);
	});	
	
	//Populate Scheme Name Dropdown for Selected Fund	
	$("#idFHouse").change(function() {
		getSchemeNameListForSelectedFund();
	});	
	$("#idFHouseUR").change(function() {
		getSchemeNameListForSelectedFundUR();
	});
	
	$('input[type="radio"][name="reportFormat"]').change(function() {
		reportFormat = this.value;
		console.log("reportFormat: " + reportFormat);
	});
	
	$('input[type="radio"][name="reportFormatUR"]').change(function() {
		reportFormatUR = this.value;
		console.log("reportFormatUR: " + reportFormatUR);
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
    
    var btnR = document.getElementById("showRealizedReport");
	
	btnR.onclick = function() {
		
		var validate;
		validate = validateCurrentHoldingReportGeneration($('#idCurrentHoldingReportForm'));
		
		if(validate) {
			var formData = $('#idCurrentHoldingReportForm').serializeToJSON();
			
			var fromDateParts = formData.fromDate.split('/');
			console.log(fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0]);
			
			var fromDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
			
			var toDateParts = formData.toDate.split('/');
			console.log(toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0]);
			
			var toDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
			
			var fundHouseName = formData.fundHouse;
			console.log(fundHouseName);
			
			var SchemeName = formData.schemeName;
			console.log(SchemeName);
			
			$.ajax({
				async: false,
				url: ClientServiceUrl + "generateRealizedGainReport?clientId=" + clientIdR + "&fromDate=" + fromDate + 
						"&toDate=" + toDate + "&fundHouse=" + fundHouseName + "&schemeName=" + SchemeName + "&advisorID=" + loggedInUser.id,
				method: "GET",
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
					$('#wait').hide();
					if(data == "No Data") {
						bootbox.alert("No data found in report.");
					} else {
						window.open("resources/RealizedGainReport.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
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
			        		msg = "Your session has expired.Please log in again";
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
		}
		
	}
	
	$("#exportRealizedGainReport").on("click", function(event) {
		
		var validate;
		validate = validateCurrentHoldingReportExport($('#idCurrentHoldingReportForm'));
		
		if(validate) {
			
			var formData = $('#idCurrentHoldingReportForm').serializeToJSON();
			
			var fromDateParts = formData.fromDate.split('/');
			console.log(fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0]);
			
			var fromDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
			
			var toDateParts = formData.toDate.split('/');
			console.log(toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0]);
			
			var toDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
			
			var fundHouseName = formData.fundHouse;
			console.log(fundHouseName);
			
			var SchemeName = formData.schemeName;
			console.log(SchemeName);
			
			$.ajax({
				async: false,
				url: ClientServiceUrl + "realizedGainExport?clientId=" + clientIdR + "&reportFormat=" + reportFormat + "&fromDate=" + fromDate + 
						"&toDate=" + toDate + "&fundHouse=" + fundHouseName + "&schemeName=" + SchemeName + "&advisorID=" + loggedInUser.id,
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
							var fileName = "RealizedGainReport.pdf";
						} else if(reportFormat == "excel") {
							var fileName = "RealizedGainReport.xls";
						}
						
						var xhr = new XMLHttpRequest();
						xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadHandlerForReport/' + reportType + "/" + reportFormat, true);
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
			
		}
		
	});
	
	var btnUR = document.getElementById("showUnrealizedReport");
	
	btnUR.onclick = function() {
		
		var validate;
		validate = validateCurrentHoldingReportGeneration($('#idCurrentHoldingReportForm'));
		
		if(validate) {
			var formData = $('#idCurrentHoldingReportForm').serializeToJSON();
			
			var asOnDateParts = formData.asOnDate.split('/');
			console.log(asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0]);
			
			var asOnDate = asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0];
			
			var fundHouseName = formData.fundHouseUR;
			console.log(fundHouseName);
			
			var SchemeName = formData.schemeNameUR;
			console.log(SchemeName);
			
			$.ajax({
				async: false,
				url: ClientServiceUrl + "generateUnealizedGainReport?clientId=" + clientIdUR + "&asOnDate=" + asOnDate +
					 "&fundHouse=" + fundHouseName + "&schemeName=" + SchemeName + "&advisorID=" + loggedInUser.id,
				method: "GET",
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
					$('#wait').hide();
					if(data == "No Data") {
						bootbox.alert("No data found in report.");
					} else {
						window.open("resources/UnrealizedGainReport.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
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
		}
		
	}
	
	$("#exportUnrealizedGainReport").on("click", function(event) {
		
			var validate;
			validate = validateCurrentHoldingReportExport($('#idCurrentHoldingReportForm'));
			
			if(validate) {
				
				var formData = $('#idCurrentHoldingReportForm').serializeToJSON();
				
				var asOnDateParts = formData.asOnDate.split('/');
				console.log(asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0]);
				
				var asOnDate = asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0];
				
				var fundHouseName = formData.fundHouseUR;
				console.log(fundHouseName);
				
				var SchemeName = formData.schemeNameUR;
				console.log(SchemeName);
				
				$.ajax({
					async: false,
					url: ClientServiceUrl + "unrealizedGainExport?clientId=" + clientIdUR + "&reportFormat=" + reportFormatUR + "&asOnDate=" + asOnDate + 
							"&fundHouse=" + fundHouseName + "&schemeName=" + SchemeName + "&advisorID=" + loggedInUser.id,
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
							
							if(reportFormatUR == "pdf") {
								var fileName = "UnrealizedGainReport.pdf";
							} else if(reportFormatUR == "excel") {
								var fileName = "UnrealizedGainReport.xls";
							}
							
							var xhr = new XMLHttpRequest();
							xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadHandlerForReport/' + reportType + "/" + reportFormatUR, true);
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
										if(reportFormatUR == "pdf") {
											var blob = new Blob([xhr.response], {type: 'application/pdf'});
						                    window.navigator.msSaveOrOpenBlob(blob, fileName);
						                    a.click();
										} else if(reportFormatUR == "excel") {
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
				        	msg = 'You are not authorized to access this data.';
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
				
			}
			
		});
	
});

function getInvestorOrClientNameList() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"clientMasterList/" + loggedInUser.id,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			cnDrop = $("#idClients");
			cnDrop.find('option').remove();
			cnDrop.append('<option value="">Select Client Name</option>');
			$.each(data, function (index, item) {
				cnDrop.append('<option value="' + item.id + '">' + item.name + '</option>');
			});
		},
		error : function(data) {
			$("#idBackOffice").load("resources/errorPage.html");
			$(".dashboardheading").html("Error Page");
	        $("#addRecord").hide();
	        $("#editRecord").hide();
	        $("#deleteRecord").hide();
		}     
	});	
}

function getInvestorOrClientNameListUR() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"clientMasterList/" + loggedInUser.id,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			cnUrDrop = $("#idClientsUR");
			cnUrDrop.find('option').remove();
			cnUrDrop.append('<option value="">Select Client Name</option>');
			$.each(data, function (index, item) {
				cnUrDrop.append('<option value="' + item.id + '">' + item.name + '</option>');
			});
		},
		error : function(data) {
			$("#idBackOffice").load("resources/errorPage.html");
			$(".dashboardheading").html("Error Page");
	        $("#addRecord").hide();
	        $("#editRecord").hide();
	        $("#deleteRecord").hide();
		}     
	});	
}

function getFundHouseList() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"fundHouseList",
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			fhDrop = $("#idFHouse");
			fhDrop.find('option').remove();
			fhDrop.append('<option value="">Select Mutual Fund</option>');
			$.each(data, function (index, item) {
				fhDrop.append('<option value="' + item + '">' + item + '</option>');
			});
		},
		error : function(data) {
			$("#idBackOffice").load("resources/errorPage.html");
			$(".dashboardheading").html("Error Page");
	        $("#addRecord").hide();
	        $("#editRecord").hide();
	        $("#deleteRecord").hide();
		}     
	});	
}

function getFundHouseListUR() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"fundHouseList",
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			fhUrDrop = $("#idFHouseUR");
			fhUrDrop.find('option').remove();
			fhUrDrop.append('<option value="">Select Mutual Fund</option>');
			$.each(data, function (index, item) {
				fhUrDrop.append('<option value="' + item + '">' + item + '</option>');
			});
		},
		error : function(data) {
			$("#idBackOffice").load("resources/errorPage.html");
			$(".dashboardheading").html("Error Page");
	        $("#addRecord").hide();
	        $("#editRecord").hide();
	        $("#deleteRecord").hide();
		}     
	});	
}

function getSchemeNameListForSelectedFund() {
	serviceurl = "SchemeFromFund/" + $('#idFHouse').val();
	getClientDataAsyncFalse("GET","",serviceurl,schemeFromFundSuccess);
	
	function schemeFromFundSuccess(data){
		snDrop = $("#idSName");
		snDrop.find('option').remove();
		snDrop.append('<option value="0">Select Scheme</option>');
		$.each(data, function (index, item) {
			snDrop.append('<option value="' + item.isin + '">' + item.descriptiveSchemeName + '</option>');
		});
	} 	
}

function getSchemeNameListForSelectedFundUR() {
	serviceurl = "SchemeFromFund/" + $('#idFHouse').val();
	getClientDataAsyncFalse("GET","",serviceurl,schemeFromFundSuccess);
	
	function schemeFromFundSuccess(data){
		snUrDrop = $("#idSNameUR");
		snUrDrop.find('option').remove();
		snUrDrop.append('<option value="0">Select Scheme</option>');
		$.each(data, function (index, item) {
			snUrDrop.append('<option value="' + item.isin + '">' + item.descriptiveSchemeName + '</option>');
		});
	} 	
}
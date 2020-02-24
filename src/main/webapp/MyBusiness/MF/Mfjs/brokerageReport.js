var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var clientId;
var reportFormat;
$(document).ready(function(){
	
	console.log(loggedInUser.id);
	$('#wait').hide();
	$('#familyCover').hide();
	
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
	
	$(".datepicker-icon").on("click", function() {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	getInvestorOrClientNameList();
	getFundHouseList();
	
	$("#idClients").change(function() {
		clientId = $(this).val();
		console.log("clientId: " + clientId);
		if(clientId != ""){
			populateFamilyMemberCheckBoxByClientId(clientId, $("#familyMemberCheckBox"))
			$('#familyCover').show();
		} else {
			$('#familyCover').hide();
		}
	});
	
	//Populate Scheme Name Dropdown for Selected Fund	
	$("#idFHouse").change(function() {
		getSchemeNameListForSelectedFund();
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
    
    var btn = document.getElementById("showReport");
    
    btn.onclick = function() {
    	
    	var checkedFamilyMemberId=[];
	    $('.fmCheck:checked').each(function(){   
		   checkedFamilyMemberId.push(this.id);
	    });
    	
    	var validate = validateBrokerageReport($('#idBrokerageReportForm'));
    	
    	if(validate) {
    	
    	var formData = $('#idBrokerageReportForm').serializeToJSON();
    	
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
			url: ClientServiceUrl + "generateBrokerageReport?clientId=" + clientId + "&familyMemberIdArr=" + checkedFamilyMemberId + "&fromDate=" + fromDate + 
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
					window.open("resources/BrokerageReport.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
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
    
    $("#exportReport").on("click", function(event) {
		
    	var checkedFamilyMemberId=[];
	    $('.fmCheck:checked').each(function(){   
		   checkedFamilyMemberId.push(this.id);
	    });
    	
		var validate = validateBrokerageReport($('#idBrokerageReportForm'));
		
		if(validate) {
		
		var formData = $('#idBrokerageReportForm').serializeToJSON();
		
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
			url: ClientServiceUrl + "brokerageExport?clientId=" + clientId + "&familyMemberIdArr=" + checkedFamilyMemberId + "&reportFormat=" + reportFormat + "&fromDate=" + fromDate + 
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
						var fileName = "BrokerageReport.pdf";
					} else if(reportFormat == "excel") {
						var fileName = "BrokerageReport.xls";
					}
					
					var xhr = new XMLHttpRequest();
					xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadHandlerForReport/brokerage/' + reportFormat, true);
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
		snDrop.append('<option value="">Select Scheme</option>');
		$.each(data, function (index, item) {
			snDrop.append('<option value="' + item.isin + '">' + item.descriptiveSchemeName + '</option>');
		});
		
	} 	
}

function populateFamilyMemberCheckBoxByClientId(clientId, tableRowId) {

	getClientData("GET", "", "clientFamilyMemberImageByClient/" + clientId, familyMemberSuccess);
	function familyMemberSuccess(data) {
		tableRowId.empty();
		$.each(data,function(index, item) {
				if (item.relationID === 0) {
					//sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",item.id);
				
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Self" id="'+ item.id +'" tabindex="200" checked/>'+item.relationName+'<br/>&nbsp;</td>');
				
				} 

				
				if (item.relationID === 1) {
						
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Spouse" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 2) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Son" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 3) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Daughter" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 4) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Father" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 5) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Mother" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 6) {
					//alert("id: " + item.id);
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Brother" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 7) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Sister" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 8) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Other" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
							
		});
	}

}
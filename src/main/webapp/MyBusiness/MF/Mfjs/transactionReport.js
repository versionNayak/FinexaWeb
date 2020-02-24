var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var clientId = null;
var reportFormat;
var fundHouseName = null;
var isin = null;
var errTransReport = 0;

var startForClient = 0;
var startForMF = 0;
var startForScheme = 0;

var lClients = document.getElementById('idClientsDrop');
var fundHouse = document.getElementById('idFHouseDrop');
var schemeName = document.getElementById('idSchemeDrop');

$('#familyCover').hide();

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
			
			/*$("#idClients").change(function() {
				clientId = $(this).val();
				console.log("clientId: " + clientId);
				if(clientId != ""){
					populateFamilyMemberCheckBoxByClientId(clientId, $("#familyMemberCheckBox"))
					$('#familyCover').show();
				} else {
					$('#familyCover').hide();
				}
			});*/
			
			//Populate Scheme Name Dropdown for Selected Fund	
			/*$("#idFHouse").change(function() {
				getSchemeNameListForSelectedFund();
			});*/	
			
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
				
				if (clientId == null) {
					document.getElementById('alertClients').innerHTML="Please select a Client";
					lClients.style.border = "2px solid red";
					errTransReport = 1;
				} else {
					document.getElementById('alertClients').innerHTML="";
					lClients.style.border = "1px solid #C0C0C0";
					errTransReport = 0;
				}
				
				/*if(fundHouseName == null){
					document.getElementById('alertFHouse').innerHTML="Please select a Fund House ";
					fundHouse.style.border = "2px solid red";
					errTransReport = 1;
				} else {
					document.getElementById('alertFHouse').innerHTML="";
					fundHouse.style.border = "1px solid #C0C0C0";
					errTransReport = 0;
				}*/
				
				if(fundHouseName != null){
					if(isin == null){
						document.getElementById('alertSName').innerHTML="Please select a Scheme ";
						schemeName.style.border = "2px solid red";
						errTransReport = 1;
					} else {
						document.getElementById('alertSName').innerHTML="";
						schemeName.style.border = "1px solid #C0C0C0";
						errTransReport = 0;
					}
				}
			    
			    var validate;
			    validate = validateTransactionReportGeneration($('#idTransactionReportForm'));
			    
			    if(errTransReport == 0 && validate == true) {
			    	var formData = $('#idTransactionReportForm').serializeToJSON();
			    	
			    	var fromDateParts = formData.fromDate.split('/');
					console.log(fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0]);
					
					var fromDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
					
					var toDateParts = formData.toDate.split('/');
					console.log(toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0]);
					
					var toDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
					
					/*var fundHouseName = formData.fundHouse;
					console.log(fundHouseName);*/
					
					/*var isin = formData.schemeName;
					console.log(isin);*/
					
					//alert("client ID = " + clientId + "fundHouseName = " + fundHouseName + "isin = " + isin)
					
					$.ajax({
						async: false,
						url: ClientServiceUrl + "generateTransactionReport?clientId=" + clientId + "&familyMemberIdArr=" + checkedFamilyMemberId+ "&fromDate=" + fromDate + 
								"&toDate=" + toDate + "&fundHouse=" + fundHouseName + "&isin=" + isin + "&advisorID=" + loggedInUser.id,
						method: "GET",
						beforeSend: function (xhr){ 
							xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
					    },
						success: function (data) {
							$('#wait').hide();
							if(data == "No Data") {
								bootbox.alert("No data found in report.");
							} else {
								window.open("resources/TransactionReport.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
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
				
				var formData = $('#idTransactionReportForm').serializeToJSON();
				
				if (clientId == null) {
					document.getElementById('alertClients').innerHTML="Please select a Client";
					lClients.style.border = "2px solid red";
					errTransReport = 1;
				} else {
					document.getElementById('alertClients').innerHTML="";
					lClients.style.border = "1px solid #C0C0C0";
					errTransReport = 0;
				}
				
				/*if(fundHouseName == null){
					alert("null")
					document.getElementById('alertFHouse').innerHTML="Please select a Fund House ";
					fundHouse.style.border = "2px solid red";
					errTransReport = 1;
				} else {
					alert("not null")
					document.getElementById('alertFHouse').innerHTML="";
					fundHouse.style.border = "1px solid #C0C0C0";
					errTransReport = 0;
				}*/
				
				if(fundHouseName != null){
					if(isin == null){
						document.getElementById('alertSName').innerHTML="Please select a Scheme ";
						schemeName.style.border = "2px solid red";
						errTransReport = 1;
					} else {
						document.getElementById('alertSName').innerHTML="";
						schemeName.style.border = "1px solid #C0C0C0";
						errTransReport = 0;
					}
				}
				
				var validate;
				validate = validateTransactionReportExport($('#idTransactionReportForm'));
				
				if(validate == true && errTransReport == 0) {
					var fromDateParts = formData.fromDate.split('/');
					console.log(fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0]);
					
					var fromDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
					
					var toDateParts = formData.toDate.split('/');
					console.log(toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0]);
					
					var toDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
					
					/*var fundHouseName = formData.fundHouse;
					console.log(fundHouseName);
					
					var SchemeName = formData.schemeName;
					console.log(SchemeName);*/
					
					$.ajax({
						async: false,
						url: ClientServiceUrl + "transactionExport?clientId=" + clientId + "&familyMemberIdArr=" + checkedFamilyMemberId + "&reportFormat=" + reportFormat + "&fromDate=" + fromDate + 
								"&toDate=" + toDate + "&fundHouse=" + fundHouseName + "&schemeName=" + isin + "&advisorID=" + loggedInUser.id,
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
									var fileName = "TransactionReport.pdf";
								} else if(reportFormat == "excel") {
									var fileName = "TransactionReport.xls";
								}
								
								var xhr = new XMLHttpRequest();
								xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadHandlerForReport/transaction/' + reportFormat, true);
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

/***************************************************/
$("#idClientsDrop").click(function(){
	
	$("#myInput").click(function() {
		//alert(this.id)
		//alert("input click koreche")
		document.getElementById('idSelect').style.display = "block";
		return false;
	});
	
	if (document.getElementById('idSelect').style.display == "none") {
		document.getElementById('idSelect').style.display = "block";
		document.getElementById('myInput').style.display = "block";
	} else {
		document.getElementById('idSelect').style.display = "none";
		document.getElementById('myInput').style.display = "none";
	}
	
});

$(document).on("click","#idClientsDrop li",function(){
		var selText = $(this).text();///User selected value...****
		//if (this.id != "idSearchLi") {
  	$('li:contains('+selText+')').filter(function() {
		    	  return $(this).text() == selText;
		    }).addClass('active');
  	$("#idClients").text(selText);
  	$('#idClients').css('color', 'black');
	document.getElementById('myInput').style.display = "none";
	document.getElementById('idSelect').style.display = "none";

	clientId = this.id;
	//alert(clientId)
	console.log("clientId: " + clientId);
	if(clientId != ""){
		populateFamilyMemberCheckBoxByClientId(clientId, $("#familyMemberCheckBox"))
		$('#familyCover').show();
	} else {
		$('#familyCover').hide();
	}
});

$('#idSelect').scroll(function () {
    if ($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight()) {
          //alert("end of scroll");
    	  startForClient = startForClient + 1;
          if ($('#idSelect li:last-child').text() != "No other record Found") {
	            //getClientData("GET", "" , "clientMasterListWithpagination/" + loggedInUser + "/" + startForClient, onGetDataSuccess);
	       	 	loadLoader();
	       	 	//$.ajax({});
	       	 	getInvestorOrClientNameList();
          }
    }
	//alert ("scroll")
});

$("#myInput").on("keyup", function() {
    var matchString = $(this).val();
    //alert(matchString)
    if (matchString != "") {
    	getClientData("GET", "" , "searchClientsDynamically/" + loggedInUser.id + "/" + matchString, onSearchSuccess);
    }
    else {
    	$('#idSelect').empty();
    	//getClientData("GET", "" , "showUserWithPagination/" + 0, onGetDataSuccess);
   	 	loadLoader();
   	    startForClient = 0;
   	    $.ajax({
			type : 'GET',
			async : false,
			url : ClientServiceUrl+"clientMasterListWithpagination/" + loggedInUser.id + "/" + startForClient,
			dataType : 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			contentType : 'application/json',
			success : function(data) {
				
				if(data == '') {
					 $('#idSelect').append("<li>No other record Found</li>");
					 hideLoader();
					 return false;
				 } else {
				  	 p = "";
					 $.each(data, function (index, item) {
					 	i ++;
						p = p + "<li id = " + item.id + ">" + item.name + "</li>"
				 	});
				 $('#idSelect').append(p);
				 //action = "inactive";
				 }
 			hideLoader();
				
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
 			hideLoader();
			}
		});
    }
    /* $("#myList li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    }); */
});

function onSearchSuccess(data) {
	if(data == '') {
		 $('#idSelect').empty();
		 hideLoader();
		 return false;
	 } else {
		 $('#idSelect').empty();
		 p = "";
		 $.each(data, function (index, item) {
		 	i ++;
			p = p + "<li id = " + item.id + ">" + item.name + "</li>"
	 	});
	 $('#idSelect').append(p);
	 }
}

//for MF drop down
$("#idFHouseDrop").click(function(){
	
	/*$("#idSearchMF").click(function() {
		//alert(this.id)
		//alert("input click koreche")
		document.getElementById('idSelectMF').style.display = "block";
		return false;
	});*/
	
	if (document.getElementById('idSelectMF').style.display == "none") {
		document.getElementById('idSelectMF').style.display = "block";
		//document.getElementById('idSearchMF').style.display = "block";
	} else {
		document.getElementById('idSelectMF').style.display = "none";
		//document.getElementById('idSearchMF').style.display = "none";
	}
	
});

$(document).on("click","#idFHouseDrop li",function(){
	var selText = $(this).text();///User selected value...****
	
	$('li:contains('+selText+')').filter(function() {
	    	  return $(this).text() == selText;
	    }).addClass('active');
	$("#idFHouse").text(selText);
	$('#idFHouse').css('color', 'black');
	//document.getElementById('idSearchMF').style.display = "none";
	document.getElementById('idSelectMF').style.display = "none";
	
	var value = $(this).attr("value");
	
	fundHouseName = value;
	console.log(fundHouseName);
	
	serviceurl = "SchemeFromFund/" + value;
	getClientDataAsyncFalse("GET","",serviceurl,schemeFromFundSuccess);
	
	function schemeFromFundSuccess(data){
		
		if(data == '') {
			 $('#idSelectScheme').append("<li>No other record Found</li>");
			 hideLoader();
			 return false;
		 } else {
		  	 p = "";
			 $.each(data, function (index, item) {
				 $("#idSelectScheme").append($("<li></li>").attr('value', item.isin).html(item.descriptiveSchemeName));
		 	});
		 }
		
	}

});

//MF drop down scroll
$('#idSelectMF').scroll(function () {
    if ($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight()) {
          //alert("end of scroll");
    	  startForMF = startForMF + 1;
          if ($('#idSelectMF li:last-child').text() != "No other record Found") {
	            //getClientData("GET", "" , "showUserWithPagination/" + start, onGetDataSuccess);
	       	 	//loadLoader();
	       	 	//getFundHouseList();
          }
    }
});

//for Scheme drop down
$("#idSchemeDrop").click(function(){
	
	/*$("#idSearchScheme").click(function() {
		//alert(this.id)
		//alert("input click koreche")
		document.getElementById('idSelectScheme').style.display = "block";
		return false;
	});*/
	
	if (document.getElementById('idSelectScheme').style.display == "none") {
		document.getElementById('idSelectScheme').style.display = "block";
		//document.getElementById('idSearchScheme').style.display = "block";
	} else {
		document.getElementById('idSelectScheme').style.display = "none";
		//document.getElementById('idSearchScheme').style.display = "none";
	}
	
});

$(document).on("click","#idSchemeDrop li",function(){
	var selText = $(this).text();///User selected value...****
	//if (this.id != "idSearchLi") {
	$('li:contains('+selText+')').filter(function() {
	    	  return $(this).text() == selText;
	    }).addClass('active');
	$("#idSName").text(selText);
	$('#idSName').css('color', 'black');
	document.getElementById('idSelectScheme').style.display = "none";
	//document.getElementById('idSearchScheme').style.display = "none";

	isin = $(this).attr("value");
	console.log(isin);
	//alert(value)
	//getSchemeNameListForSelectedFund(value);
});
/***************************************************/
function getInvestorOrClientNameList() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"clientMasterListWithpagination/" + loggedInUser.id + "/" + startForClient,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			/* cnDrop = $("#idClients");
			cnDrop.find('option').remove();
			cnDrop.append('<option value="">Select Client Name</option>');
			$.each(data, function (index, item) {
				cnDrop.append('<option value="' + item.id + '">' + item.name + '</option>');
			}); */
			
			if(data == '') {
				 $('#idSelect').append("<li>No other record Found</li>");
				 hideLoader();
				 return false;
			 } else {
			  	 p = "";
				 $.each(data, function (index, item) {
				 	i ++;
					p = p + "<li id = " + item.id + ">" + item.name + "</li>"
			 	});
			 $('#idSelect').append(p);
			 hideLoader();
			 //action = "inactive";
			 }
			
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

			hideLoader();
		}     
	});	
}

function getFundHouseList() {
	$.ajax({
		type : 'GET',
		async : false,
		//url : ClientServiceUrl+"fundHouseListWithPagination/"+startForMF,
		url : ClientServiceUrl+"fundHouseList",
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			/*fhDrop = $("#idFHouse");
			fhDrop.find('option').remove();
			fhDrop.append('<option value="">Select Mutual Fund</option>');
			$.each(data, function (index, item) {
				fhDrop.append('<option value="' + item + '">' + item + '</option>');
			});*/
			
			if(data == '') {
				 $('#idSelectMF').append("<li>No other record Found</li>");
				 hideLoader();
				 return false;
			 } else {
			  	 p = "";
				 $.each(data, function (index, item) {
//				 	 i ++;
//					 p = p + "<li id = " + item + ">" + item + "</li>"
					 
					 $("#idSelectMF").append($("<li></li>").attr('value', item).html(item));
			 	});
			 //$('#idSelectMF').append(p);
			 //action = "inactive";
			 }
			hideLoader();
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
	        hideLoader();
		}     
	});	
}

/*function getSchemeNameListForSelectedFund(value) {
	//serviceurl = "SchemeFromFund/" + $('#idFHouse').val();
	
	serviceurl = "SchemeFromFund/" + value;
	getClientDataAsyncFalse("GET","",serviceurl,schemeFromFundSuccess);
	
	function schemeFromFundSuccess(data){
		snDrop = $("#idSName");
		snDrop.find('option').remove();
		snDrop.append('<option value="">Select Scheme</option>');
		$.each(data, function (index, item) {
			snDrop.append('<option value="' + item.isin + '">' + item.descriptiveSchemeName + '</option>');
		});
		
		if(data == '') {
			 $('#idSelectScheme').append("<li>No other record Found</li>");
			 hideLoader();
			 return false;
		 } else {
		  	 p = "";
			 $.each(data, function (index, item) {
//			 	 i ++;
//				 p = p + "<li id = " + item.id + ">" + item.name + "</li>"
				 
				 $("#idSelectScheme").append($("<li></li>").attr('value', item.isin).html(item.descriptiveSchemeName));
		 	});
		 //$('#idSelect').append(p);
		 //action = "inactive";
		 }
		
	} 	
}*/

function populateFamilyMemberCheckBoxByClientId(clientId, tableRowId) {

	getClientData("GET", "", "clientFamilyMemberImageByClient/" + clientId, familyMemberSuccess);
	function familyMemberSuccess(data) {
		tableRowId.empty();
		$.each(data,function(index, item) {
				if (item.relationID === 0) {
					//sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",item.id);
				
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Self" id="'+ item.id +'" tabindex="200" checked/>'/*+item.relationName*/+item.firstName+'</td>');
				
				} 

				
				if (item.relationID === 1) {
						
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Spouse" id="'+ item.id +'" tabindex="200"/>'/*+item.relationName*/+item.firstName+'</td>');

				}
				
				if (item.relationID === 2) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Son" id="'+ item.id +'" tabindex="200"/>'/*+item.relationName*/+item.firstName+'</td>');

				}
				
				if (item.relationID === 3) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Daughter" id="'+ item.id +'" tabindex="200"/>'/*+item.relationName*/+item.firstName+'</td>');

				}
				
				if (item.relationID === 4) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Father" id="'+ item.id +'" tabindex="200"/>'/*+item.relationName*/+item.firstName+'</td>');

				}
				
				if (item.relationID === 5) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Mother" id="'+ item.id +'" tabindex="200"/>'/*+item.relationName*/+item.firstName+'</td>');

				}
				
				if (item.relationID === 6) {
					//alert("id: " + item.id);
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Brother" id="'+ item.id +'" tabindex="200"/>'/*+item.relationName*/+item.firstName+'</td>');

				}
				
				if (item.relationID === 7) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Sister" id="'+ item.id +'" tabindex="200"/>'/*+item.relationName*/+item.firstName+'</td>');

				}
				
				if (item.relationID === 8) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Other" id="'+ item.id +'" tabindex="200"/>'/*+item.relationName*/+item.firstName+'</td>');

				}
							
		});	
	}

}

function loadLoader(){	
	    //var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"><span class="fa fa-refresh fa-spin"></span> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"> <img src="../Common/assets/images/icons/processing-gif-14.gif" alt="Loader" width="42" height="42"> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;">Processing... </h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    if(document.getElementById("overlayLoading1")){
	    console.log("overlayLoading1");
	    $("#overlayLoading1").html(ineerHtml).css({'display':'block'});
	  	}
	  	
	    if(document.getElementById("overlayLoading")){
	      console.log("overlayLoading1");
	  	  $("#overlayLoading").html(ineerHtml).css({'display':'block'});
	  	}
	
	    
	}

function hideLoader(){
	  
		   if(document.getElementById("overlayLoading1")){
		   console.log("overlayLoading");
$("#overlayLoading1").css({'display':'none'}).html("");
		   } 
		   if(document.getElementById("overlayLoading")){
			   console.log("overlayLoading");
			   $("#overlayLoading").css({'display':'none'}).html("");
		   }
}
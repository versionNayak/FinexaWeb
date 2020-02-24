var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var clientId;
var reportFormat;
var fundHouseName = null;
var isin = null;
var errTransReport = 0;

var startForMF = 0;
var startForScheme = 0;

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
	
	//getInvestorOrClientNameList();
	getFundHouseList();
	
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
    
    var btnId = document.getElementById("showReport");
    
    btnId.onclick = function() {
    	
    	var validate;
    	validate = validateInactiveclientReportGeneration($('#idInactiveClientReportForm'));
    	
    	if(validate) {
    		var formData = $('#idInactiveClientReportForm').serializeToJSON();
			
			var fromDateParts = formData.fromDate.split('/');
			//console.log(fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0]);
			
			var fromDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
			
			var toDateParts = formData.toDate.split('/');
			//console.log(toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0]);
			
			var toDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
			
			/*var fundHouseName = formData.fundHouse;
			//console.log(fundHouseName);
			
			var SchemeName = formData.schemeName;
			//console.log(SchemeName);
			*/
			var reportTypeArr = [];
			$.each($("input[name='reportType']:checked"), function(){            
		    	reportTypeArr.push($(this).val());
		    });
			
			console.log(reportTypeArr.join(""));
			
			$.ajax({
				async: false,
				/*url: ClientServiceUrl + "generateInactiveClientReport?&fromDate=" + fromDate + 
						"&toDate=" + toDate + "&fundHouse=" + fundHouseName + "&schemeName=" + SchemeName + 
						"&reportType=" + reportTypeArr.join("") + "&advisorID=" + loggedInUser.id,*/
				url: ClientServiceUrl + "generateInactiveClientReport?&fromDate=" + fromDate + 
						"&toDate=" + toDate + "&fundHouse=" + fundHouseName + "&schemeName=" + isin + 
						"&reportType=" + reportTypeArr.join("") + "&advisorID=" + loggedInUser.id,
				method: "GET",
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
					$('#wait').hide();
					window.open("resources/InactiveClientReport.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
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
    	
    }
		
	$("#exportReport").on("click", function(event) {
		
		var validate;
		validate = validateInactiveclientReportExport($('#idInactiveClientReportForm'));
		
		if(validate) {
			var formData = $('#idInactiveClientReportForm').serializeToJSON();
			
			var fromDateParts = formData.fromDate.split('/');
			//console.log(fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0]);
			
			var fromDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
			
			var toDateParts = formData.toDate.split('/');
			//console.log(toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0]);
			
			var toDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
			
			/*var fundHouseName = formData.fundHouse;
			//console.log(fundHouseName);
			
			var SchemeName = formData.schemeName;
			//console.log(SchemeName);
			*/
			var reportTypeArr = [];
			$.each($("input[name='reportType']:checked"), function(){            
		    	reportTypeArr.push($(this).val());
		    });
			
			console.log(reportTypeArr.join(""));
			
			$.ajax({
				async: false,
//				url: ClientServiceUrl + "inactiveClientExport?reportFormat=" + reportFormat + "&fromDate=" + fromDate + 
//						"&toDate=" + toDate + "&fundHouse=" + fundHouseName + "&schemeName=" + SchemeName + 
//						"&reportType=" + reportTypeArr.join("") + "&advisorID=" + loggedInUser.id,
				url: ClientServiceUrl + "inactiveClientExport?reportFormat=" + reportFormat + "&fromDate=" + fromDate + 
					"&toDate=" + toDate + "&fundHouse=" + fundHouseName + "&schemeName=" + isin + 
					"&reportType=" + reportTypeArr.join("") + "&advisorID=" + loggedInUser.id,
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
						var fileName = "InactiveClientReport.pdf";
					} else if(reportFormat == "excel") {
						var fileName = "InactiveClientReport.xls";
					}
					
					var xhr = new XMLHttpRequest();
					xhr.open("GET", serviceIP + "/clientservice/" + 'downloadHandlerForReport/inactiveClient/' + reportFormat, true);
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
	
});


//------------------- for MF drop down -----------------------
$("#idFHouseDrop").click(function(){
	
	$("#idSearchMF").click(function() {
		document.getElementById('idSelectMF').style.display = "block";
		
		return false;
	});
	
	if (document.getElementById('idSelectMF').style.display == "none") {
		document.getElementById('idSelectMF').style.display = "block";
		document.getElementById('idSearchMF').style.display = "block";
	} else {
		document.getElementById('idSelectMF').style.display = "none";
		document.getElementById('idSearchMF').style.display = "none";
	}
	
});

$(document).on("click","#idFHouseDrop li",function(){
	var selText = $(this).text();///User selected value...****
	startForScheme =0;
	$("#idSName").text("Select Scheme");
	$('#idSName').css('color', '#808080');
	
	$('li:contains('+selText+')').filter(function() {
	    	  return $(this).text() == selText;
	    }).addClass('active');
	if(selText != "No other record Found") {
		$("#idFHouse").text(selText);
		$('#idFHouse').css('color', 'black');
	} 
	document.getElementById('idSearchMF').style.display = "none";
	document.getElementById('idSelectMF').style.display = "none";
	
	var value = $(this).attr("value");
	
	fundHouseName = value;
	
	//serviceurl = "SchemeFromFund/" + value;
	serviceurl = "SchemeFromFundwithPagination/" + value + "/" +startForScheme;
	getClientDataAsyncFalse("GET","",serviceurl,schemeFromFundSuccess);
	
	function schemeFromFundSuccess(data){
		
		if(data == '') {
			 $('#idSelectScheme').append("<li>No other record Found</li>");
			 hideLoader();
			 return false;
		 } else {
			 $('#idSelectScheme').empty();
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
    	  startForMF = startForMF + 1;
          if ($('#idSelectMF li:last-child').text() != "No other record Found") {
	       	 	getFundHouseList();
          }
    }
});

$("#idSearchMF").on("keyup", function() {
    var matchString = $(this).val();
    
    if (matchString != "") {
    	//getClientData("GET", "" , "searchClientsDynamically/" + loggedInUser.id + "/" + matchString, onSearchSuccess);
    	getClientData("GET", "" , "searchHouseListDynamically/" + matchString, onHouseListSearchSuccess);
    }
    else {
    	$('#idSelectMF').empty();
    	//getClientData("GET", "" , "showUserWithPagination/" + 0, onGetDataSuccess);
   	 	loadLoader();
   	    startForClient = 0;
   	    $.ajax({
			type : 'GET',
			async : false,
			url : ClientServiceUrl+"fundHouseListWithPagination/"+startForMF,
			//url : ClientServiceUrl+"fundHouseList",
			dataType : 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			contentType : 'application/json',
			success : function(data) {
				
				if(data == '') {
					 $('#idSelectMF').append("<li>No other record Found</li>");
					 hideLoader();
					 return false;
				 } else {
				  	 p = "";
					 $.each(data, function (index, item) {
					 	//i ++;
						//p = p + "<li id = " + item.id + ">" + item.name + "</li>"
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
    /* $("#myList li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    }); */
});

function onHouseListSearchSuccess(data) {
	if(data == '') {
		 $('#idSelectMF').empty();
		 hideLoader();
		 return false;
	 } else {
		 $('#idSelectMF').empty();
		 p = "";
		 $.each(data, function (index, item) {
		 	//i ++;
			//p = p + "<li id = " + item.id + ">" + item.name + "</li>"
			 $("#idSelectMF").append($("<li></li>").attr('value', item).html(item));
	 	});
	 //$('#idSelectMF').append(p);
	 }
}


//----------------------- for Scheme drop down -----------------------

$('#idSelectScheme').scroll(function () {
    if ($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight()) {
    	var fHouseValue = $("#idFHouse").text();
    	startForScheme = startForScheme + 1;
          if ($('#idSelectScheme li:last-child').text() != "No other record Found") {
			loadLoader();
			getSchemeNameListForSelectedFund(fHouseValue);
          }
    }
});


$("#idSchemeDrop").click(function(){
	
	$("#idSearchScheme").click(function() {
		document.getElementById('idSelectScheme').style.display = "block";
		return false;
	});
	
	if (document.getElementById('idSelectScheme').style.display == "none") {
		document.getElementById('idSelectScheme').style.display = "block";
		document.getElementById('idSearchScheme').style.display = "block";
	} else {
		document.getElementById('idSelectScheme').style.display = "none";
		document.getElementById('idSearchScheme').style.display = "none";
	}
	
});

$(document).on("click","#idSchemeDrop li",function(){
	var selText = $(this).text();///User selected value...****
	//if (this.id != "idSearchLi") {
	$('li:contains('+selText+')').filter(function() {
	    	  return $(this).text() == selText;
	    }).addClass('active');
	if(selText != "No other record Found"){
		$("#idSName").text(selText);
		$('#idSName').css('color', 'black');
	} 
	document.getElementById('idSelectScheme').style.display = "none";
	document.getElementById('idSearchScheme').style.display = "none";

	isin = $(this).attr("value");
	console.log(isin);
	//alert(value)
	//getSchemeNameListForSelectedFund(value);
});

$("#idSearchScheme").on("keyup", function() {
    
	var matchString = $(this).val();
    var fHouseValue = $("#idFHouse").text();
    startForScheme=0;
    
    if (matchString != "") {
    	//getClientData("GET", "" , "searchSchemeListDynamically/"+ fHouseValue + "/" + matchString, onSchemeListSearchSuccess);
    	getClientData("GET", "" , "SchemeFromFundMatchString/"+ fHouseValue + "/" + matchString, onSchemeListSearchSuccess);
    }
    else {
    	$('#idSelectScheme').empty();
   	 	loadLoader();
   	    //startForClient = 0;
   	    $.ajax({
			type : 'GET',
			async : false,
			//url : ClientServiceUrl+"SchemeFromFund/"+fHouseValue,
			url : ClientServiceUrl+"SchemeFromFundwithPagination/"+fHouseValue+"/"+startForScheme,
			dataType : 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			contentType : 'application/json',
			success : function(data) {
				
				if(data == '') {
					 $('#idSelectScheme').append("<li>No other record Found</li>");
					 hideLoader();
					 return false;
				 } else {
				  	 p = "";
					 $.each(data, function (index, item) {
					 	//i ++;
						//p = p + "<li id = " + item.id + ">" + item.name + "</li>"
						 $("#idSelectScheme").append($("<li></li>").attr('value', item.isin).html(item.descriptiveSchemeName));
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
    
});


function onSchemeListSearchSuccess(data) {
	if(data == '') {
		 $('#idSelectScheme').empty();
		 hideLoader();
		 return false;
	 } else {
		$('#idSelectScheme').empty();
		p = "";
		$.each(data, function (index, item) {
		 	//i ++;
			//p = p + "<li id = " + item.id + ">" + item.name + "</li>"
		$("#idSelectScheme").append($("<li></li>").attr('value', item.isin).html(item.descriptiveSchemeName));
			 
	 	});
	 //$('#idSelectMF').append(p);
	 }
}






/**********************************************************************/

/*** Old function ***/
//function getFundHouseList() {
//$.ajax({
//	type : 'GET',
//	async : false,
//	url : ClientServiceUrl+"fundHouseList",
//	dataType : 'json',
//	beforeSend: function (xhr){ 
//		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
//    },
//	contentType : 'application/json',
//	success : function(data) {
//		fhDrop = $("#idFHouse");
//		fhDrop.find('option').remove();
//		fhDrop.append('<option value="">Select Mutual Fund</option>');
//		$.each(data, function (index, item) {
//			fhDrop.append('<option value="' + item + '">' + item + '</option>');
//		});
//	},
//	error : function(jqXHR, data) {
//		if(jqXHR.status == 401){
//			var error,error_description;
//			error = jqXHR.responseJSON.error_description;
//        	error_description = "Access token expired: "+sessionStorage.getItem("sessionID");
//        	if(error === error_description){
//        		msg = "Your session has expired.Please log in again"
//        		bootbox.alert({
//		        	 message: msg,
//		        	 callback: function () {
//			         window.location = "../index.html";
//		         }
//		      })
//        	}
//        	if(error === "unauthorized"){
//        		msg = "Full authentication is required to access this resource",
//        		bootbox.alert({
//		        	 message: msg
//		        })
//        	}	
//        }
//		$("#idBackOffice").load("resources/errorPage.html");
//		$(".dashboardheading").html("Error Page");
//        $("#addRecord").hide();
//        $("#editRecord").hide();
//        $("#deleteRecord").hide();
//	}     
//});	
//}

/*** Modified function for pagenation ***/
function getFundHouseList() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"fundHouseListWithPagination/"+startForMF,
		//url : ClientServiceUrl+"fundHouseList",
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

/*** Old function ***/
//function getSchemeNameListForSelectedFund() {
//serviceurl = "SchemeFromFund/" + $('#idFHouse').val();
//getClientDataAsyncFalse("GET","",serviceurl,schemeFromFundSuccess);
//
//function schemeFromFundSuccess(data){
//	snDrop = $("#idSName");
//	snDrop.find('option').remove();
//	snDrop.append('<option value="">Select Scheme</option>');
//	$.each(data, function (index, item) {
//		snDrop.append('<option value="' + item.isin + '">' + item.descriptiveSchemeName + '</option>');
//	});
//	
//	} 
//
// }

/*** Modified function for pagenation ***/
function getSchemeNameListForSelectedFund(fHouseValue) {	
	
	$.ajax({
	type : 'GET',
	async : false,
	//url : ClientServiceUrl+"SchemeFromFund/"+fHouseValue,
	url : ClientServiceUrl+"SchemeFromFundwithPagination/"+fHouseValue+"/"+startForScheme,
	dataType : 'json',
	beforeSend: function (xhr){ 
	xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	},
	contentType : 'application/json',
	success : function(data) {
	
	if(data == '') {
	$('#idSelectScheme').append("<li>No other record Found</li>");
	hideLoader();
	return false;
	} else {
	p = "";
	$.each(data, function (index, item) {
	//i ++;
	//p = p + "<li id = " + item.id + ">" + item.name + "</li>"
	$("#idSelectScheme").append($("<li></li>").attr('value', item.isin).html(item.descriptiveSchemeName));
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










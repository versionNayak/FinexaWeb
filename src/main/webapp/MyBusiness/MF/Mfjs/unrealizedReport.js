var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var reportType;
var clientIdUR = null;
var reportFormatUR;
var errTransReport = 0;
var startForClient = 0;

var lClients = document.getElementById('idClientsDrop');

$('#familyCover').hide();

$(document).ready(function(){
	
	console.log("advisor id: "+loggedInUser.id);
	
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
	
	getInvestorOrClientNameListUR();
	getFundHouseListUR();
	
	/*$("#idClientsUR").change(function() {
		clientIdUR = $(this).val();
		console.log("clientIdUR: " + clientIdUR);
		if(clientIdUR != ""){
			populateFamilyMemberCheckBoxByClientId(clientIdUR, $("#familyMemberCheckBox"))
			$('#familyCover').show();
		} else {
			$('#familyCover').hide();
		}
	});*/
	
	$("#idFHouseUR").change(function() {
		getSchemeNameListForSelectedFundUR();
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
    
    var btnUR = document.getElementById("showUnrealizedReport");
	
	btnUR.onclick = function() {
		
		var checkedFamilyMemberId=[];
	    $('.fmCheck:checked').each(function(){   
		   checkedFamilyMemberId.push(this.id);
	    });
	    
	    if (clientIdUR == null || clientIdUR == "") {
			document.getElementById('alertClientsUR').innerHTML="Please select a Client";
			lClients.style.border = "2px solid red";
			errTransReport = 1;
		} else {
			document.getElementById('alertClientsUR').innerHTML="";
			lClients.style.border = "1px solid #C0C0C0";
			errTransReport = 0;
		}
		
		var validate;
		validate = validateCurrentHoldingReportGeneration($('#idUnrealizedGaingReportForm'));
		
		if(validate == true && errTransReport == 0) {
			var formData = $('#idUnrealizedGaingReportForm').serializeToJSON();
			
			var asOnDateParts = formData.asOnDate.split('/');
			console.log(asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0]);
			
			var asOnDate = asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0];
			
			var fundHouseName = formData.fundHouseUR;
			console.log(fundHouseName);
			
			var SchemeName = formData.schemeNameUR;
			console.log(SchemeName);
			
			$.ajax({
				async: false,
				url: ClientServiceUrl + "generateUnealizedGainReport?clientId=" + clientIdUR + "&familyMemberIdArr=" + checkedFamilyMemberId + "&asOnDate=" + asOnDate +
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
		
			var checkedFamilyMemberId=[];
		    $('.fmCheck:checked').each(function(){   
			   checkedFamilyMemberId.push(this.id);
		    });
		
		    if (clientIdUR == null || clientIdUR == "") {
				document.getElementById('alertClients').innerHTML="Please select a Client";
				lClients.style.border = "2px solid red";
				errTransReport = 1;
			} else {
				document.getElementById('alertClients').innerHTML="";
				lClients.style.border = "1px solid #C0C0C0";
				errTransReport = 0;
			}
		    
			var validate;
			validate = validateCurrentHoldingReportExport($('#idUnrealizedGaingReportForm'));
			
			if(validate == true && errTransReport == 0) {
				
				var formData = $('#idUnrealizedGaingReportForm').serializeToJSON();
				
				var asOnDateParts = formData.asOnDate.split('/');
				console.log(asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0]);
				
				var asOnDate = asOnDateParts[2]+'-'+asOnDateParts[1]+'-'+asOnDateParts[0];
				
				var fundHouseName = formData.fundHouseUR;
				console.log(fundHouseName);
				
				var SchemeName = formData.schemeNameUR;
				console.log(SchemeName);
				
				$.ajax({
					async: false,
					url: ClientServiceUrl + "unrealizedGainExport?clientId=" + clientIdUR + "&familyMemberIdArr=" + checkedFamilyMemberId + "&reportFormat=" + reportFormatUR + "&asOnDate=" + asOnDate + 
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
							xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadHandlerForReport/unrealized/' + reportFormatUR, true);
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

	clientIdUR = this.id;
	//alert(clientId)
	console.log("clientId: " + clientIdUR);
	if(clientIdUR != ""){
		populateFamilyMemberCheckBoxByClientId(clientIdUR, $("#familyMemberCheckBox"))
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
	       	 	getInvestorOrClientNameListUR();
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
   	    //$.ajax({});
   	    getInvestorOrClientNameListUR();
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
		 	//i ++;
			p = p + "<li id = " + item.id + ">" + item.name + "</li>"
	 	});
	 $('#idSelect').append(p);
	 }
}
/***************************************************/

function getInvestorOrClientNameListUR() {
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
			/*cnUrDrop = $("#idClientsUR");
			cnUrDrop.find('option').remove();
			cnUrDrop.append('<option value="">Select Client Name</option>');
			$.each(data, function (index, item) {
				cnUrDrop.append('<option value="' + item.id + '">' + item.name + '</option>');
			});*/
			
			if(data == '') {
				 $('#idSelect').append("<li>No other record Found</li>");
				 hideLoader();
				 return false;
			 } else {
			  	 p = "";
				 $.each(data, function (index, item) {
				 	//i ++;
					p = p + "<li id = " + item.id + ">" + item.name + "</li>"
			 	});
			 $('#idSelect').append(p);
			 hideLoader();
			 //action = "inactive";
			 }
		},
		error : function(data) {
			$("#idBackOffice").load("resources/errorPage.html");
			$(".dashboardheading").html("Error Page");
	        $("#addRecord").hide();
	        $("#editRecord").hide();
	        $("#deleteRecord").hide();
			hideLoader();
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

function getSchemeNameListForSelectedFundUR() {
	serviceurl = "SchemeFromFund/" + $('#idFHouse').val();
	getClientDataAsyncFalse("GET","",serviceurl,schemeFromFundSuccess);
	
	function schemeFromFundSuccess(data){
		snUrDrop = $("#idSNameUR");
		snUrDrop.find('option').remove();
		snUrDrop.append('<option value="">Select Scheme</option>');
		$.each(data, function (index, item) {
			snUrDrop.append('<option value="' + item.isin + '">' + item.descriptiveSchemeName + '</option>');
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
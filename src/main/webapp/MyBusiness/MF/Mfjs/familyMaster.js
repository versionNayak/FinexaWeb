var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var selectedClientId;
var selectedClientPan;
$(document).ready(function(){
	
	$("#idFamilySearch").click(function(){
		var name = $("#idFamilyName").val();
		var pan = $("#idFamilyPAN").val();
		
		console.log("name: " + name);
		console.log("pan: " + pan);
		
		if(validateFamilyMaster($("#idFamilyMasterForm"))) {
			var serialNo = 1;
			$.ajax({
				type: 'GET',
				async:false,
				url: serviceIP+'/clientservice/stagingInvestorListByNamePan?advisorId=' + loggedInUser.id + "&name=" + name + "&pan=" + pan,
				dataType: 'json',
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
					if(data.length == 0) {
						bootbox.alert("No records found!");
					}
					$("#idFamilyTable").empty();
					$.each(data, function (index, value) {
						var finexaClientFlag;
						if(value.accountStatus==0) {
							finexaClientFlag = "Yet to be Mapped";
						} else if(value.accountStatus==1) {
							finexaClientFlag = "Already a Client";
						}else{
							finexaClientFlag = "Mapped under a client";
						}
			    		$("#idFamilyTable").append(
								'<tr><td>'+ (serialNo)+ '</td><td id = "idInvestorName'+ (serialNo) +'">'+ 
								value.investorName+ '</td><td id = "idInvestorPan'+ (serialNo) +'">'+
								value.investorPan+ '</td><td id = "idInvestorDob'+ (serialNo) +'">'+
								value.investorDOB+ '</td><td>'+  
								'<input type="checkbox" id = "idCheckbox'+ (serialNo) +'" class="form-control cbm" style="width:1em"/></td><td>'+ 
								'<input type="checkbox" id = "idCheckboxFamilyName'+ (serialNo) +'" class="form-control cfm" style="width:1em" onchange="cfmChange(this, '+ (serialNo) +')"/></td>'+ 
								'<td class = "hidden" id = "idInvestorAddressLine1'+ (serialNo) +'">'+ value.investorAddressLine1 +
								'</td><td class = "hidden" id = "idInvestorAddressLine2'+ (serialNo) +'">'+ value.investorAddressLine2 +
								'</td><td class = "hidden" id = "idInvestorAddressLine3'+ (serialNo) +'">'+ value.investorAddressLine3 +
								'</td><td class = "hidden" id = "idInvestorCity'+ (serialNo) +'">'+ value.investorCity +
								'</td><td class = "hidden" id = "idInvestorFolio'+ (serialNo) +'">'+ value.investorFolioNo +
								'</td><td class = "hidden" id = "idInvestorMobile'+ (serialNo) +'">'+ value.investorMobile +
								'</td><td class = "hidden" id = "idInvestorEmail'+ (serialNo) +'">'+ value.investorEmail +
								'<td id = "idIsFinexaClient' + (serialNo) +'">' + finexaClientFlag + 
			    				'</td></tr>');
			    		
			    		if(value.accountStatus!=0){
				    		
								$("#idCheckbox"+ serialNo).prop( "disabled", true );
								$("#idCheckboxFamilyName"+ serialNo).prop( "disabled", true );

							}
			    		serialNo++;
					
					});
					
				},
				error: function (jqXHR, exception) {
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
			        } 
			        else if (jqXHR.status == 403) {
			            msg = 'you don’t have permission to access ‘/’ on this server.';
			        }else if (jqXHR.status == 404) {
			            msg = 'Requested service url not found.';
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
			        
			        if (JSON.parse(jqXHR.responseText).errorMessage != null || JSON.parse(jqXHR.responseText).errorMessage != undefined || JSON.parse(jqXHR.responseText).errorMessage != "") {
			        	sessionStorage.removeItem("MSG");
			        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage);
			        } 
			        
			        if (msg != "" || JSON.parse(jqXHR.responseText).errorMessage != null || JSON.parse(jqXHR.responseText).errorMessage != "undefined" || JSON.parse(jqXHR.responseText).errorMessage != ""){
			        	sessionStorage.removeItem("MSG");
				        sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
			        }
			       
			        if (JSON.parse(jqXHR.responseText).errorMessage == undefined) {
			        	sessionStorage.removeItem("MSG");
			        	sessionStorage.setItem("MSG", msg);
			        }
			         
			        $("#idBackOffice").load("resources/errorPage.html");
			    }

			});
		}
	});
	
	$("#idClientName").blur(function() {
		var namePan = $("#idClientName").val();
		console.log(namePan);
		var advisorId = loggedUser.id;
		console.log(advisorId);
		
		var trimmedNamePan = $.trim(namePan);
		
		if(trimmedNamePan != "") {
			$.ajax({
				type: 'GET',
				async:false,
				url: serviceIP+'/clientservice/familyListByNamePan?name='+namePan+'&advisorId='+advisorId,
				dataType: 'json',
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
					var clientDrop = $("#idFinexaClientDrop");
					clientDrop.find('option').remove();
					clientDrop.append('<option value="">Select Client Name</option>');
					$.each(data, function (index, item) {
						clientDrop.append('<option value="' + item.id + '">' + item.name + '</option>');
					});
				},
				error: function (jqXHR, exception) {
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
			        } 
			        else if (jqXHR.status == 403) {
			            msg = 'you don’t have permission to access ‘/’ on this server.';
			        }else if (jqXHR.status == 404) {
			            msg = 'Requested service url not found.';
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
			        
			        if (JSON.parse(jqXHR.responseText).errorMessage != null || JSON.parse(jqXHR.responseText).errorMessage != undefined || JSON.parse(jqXHR.responseText).errorMessage != "") {
			        	sessionStorage.removeItem("MSG");
			        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage);
			        } 
			        
			        if (msg != "" || JSON.parse(jqXHR.responseText).errorMessage != null || JSON.parse(jqXHR.responseText).errorMessage != "undefined" || JSON.parse(jqXHR.responseText).errorMessage != ""){
			        	sessionStorage.removeItem("MSG");
				        sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
			        }
			       
			        if (JSON.parse(jqXHR.responseText).errorMessage == undefined) {
			        	sessionStorage.removeItem("MSG");
			        	sessionStorage.setItem("MSG", msg);
			        }
			         
			        $("#idBackOffice").load("resources/errorPage.html");
			    }

			});
		}
		
		populateRelationDrop($("#idRelationDrop"));
	});
	
});

function cbmChange(obj) {
	var cbm = document.getElementsByClassName("cbm");
	for (var i = 0; i < cbm.length; i++) {
		cbm[i].checked = false;
	}
	obj.checked = true;
}

//for only String values
function hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

//for more than just string values
/*function hasDuplicates(array) {
    var valuesSoFar = [];
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        }
        valuesSoFar.push(value);
    }
    return false;
}*/
function cfmChange(obj, p) {
	var cfm = document.getElementsByClassName("cfm");
//	var cfh = document.getElementsByClassName("cfh");
	for (var i = 0; i < cfm.length; i++) {
		cfm[i].checked = false;
		//cfh[i].checked = false;
	}
	obj.checked = true;
	//cfh[p-1].checked = true;
}

$('#idCreateFamily').click( function() {
	
	var advisorId = loggedInUser.id;
	var viewData = { 
		    family : [] 
		};
	
	var panArr = [];
	var indexArr = [];
	var errorFlag = 0;
	
	var rowCount = $('#idFamilyTable tr').length;
	
	var tbl2 = $('#idFamilyTable tr').each(function(i) {
		
		++i;
		
		//eliminate the header and last incremented value
		if (i <= (rowCount)) {
			var jsonData = {};
			jsonData["advisorUser"] = advisorId;
			
			if($("#idCheckbox"+i).is(":checked")){
				
				console.log("Checkbox" + i + " is checked");
				toBeAddedFlag = 1;
				
				var investorName = $("#idInvestorName"+i).text();
				console.log(investorName);
				jsonData["investorName"] = investorName;
				
				var investorPan = $("#idInvestorPan"+i).text();
				selectedClientPan = investorPan;
				console.log(investorPan);
				jsonData["investorPan"] = investorPan;
				
				panArr.push(investorPan);
				
				var investorDob = $("#idInvestorDob"+i).text();
				console.log(investorDob);
				jsonData["investorDOB"] = investorDob;
				
				if($("#idCheckboxFamilyName"+i).is(":checked")){
					jsonData["familyHead"] = true;
				} else {
					jsonData["familyHead"] = false;
				}
				
				var investorFolioNo = $("#idInvestorFolio"+i).text();
				console.log(investorFolioNo);
				jsonData["investorFolioNo"] = investorFolioNo;
				
				var address1 = $("#idInvestorAddressLine1"+i).text();
				console.log(address1);
				jsonData["investorAddressLine1"] = address1;
				
				var address2 = $("#idInvestorAddressLine2"+i).text();
				console.log(address2);
				jsonData["investorAddressLine2"] = address2;
				
				var address3 = $("#idInvestorAddressLine3"+i).text();
				console.log(address3);
				jsonData["investorAddressLine3"] = address3;
				
				var city = $("#idInvestorCity"+i).text();
				console.log(city);
				jsonData["investorCity"] = city;
				
				var email = $("#idInvestorEmail"+i).text();
				console.log(email);
				jsonData["investorEmail"] = email;
				
				var mobile = $("#idInvestorMobile"+i).text();
				console.log(mobile);
				jsonData["investorMobile"] = mobile;
				
				var clientId = $("#idFinexaClientDrop").val();
				selectedClientId = clientId;
				console.log(clientId);
				jsonData["clientId"] = clientId;
				
				var relationId = $("#idRelationDrop").val();
				console.log(relationId);
				jsonData["relationId"] = relationId;
				
				//alert(hasDuplicates(panArr));
				
				if(!hasDuplicates(panArr)) {
					
				} else {
					
				}
				
				viewData.family.push(jsonData);
				indexArr.push(i);
			}
		}
	});
	
	if(indexArr.length === 0) {
		bootbox.alert("Please check at least one check box.");
		errorFlag = 1;
	}
	
	var proceed = 1;
	if (errorFlag == 1) {
		proceed = 0;
		$(window).scrollTop(0);
	}
	
	if(proceed == 1) {
		console.log("viewData" + JSON.stringify(viewData.family));
		var data = JSON.stringify(viewData.family);
		if(validateAssociationWithFinexaClient($("#idFamilyMasterForm"))) {
			showProcessingLoaderOnSave("#idCreateFamily");
			window.setTimeout(function(){
				console.log("selectedClientId: " + selectedClientId);
				getMFData("POST", data, "createFamily", onCreateFamilySuccess);
				
				//getMFData("GET", "", "checkIfFamilyExists/" + selectedClientId + "/" + selectedClientPan, onCheckFamilySuccess);
			}, 3000);
			
			/*function onCheckFamilySuccess(flag) {
				if(!flag) {
					getMFData("POST", data, "createFamily", onCreateFamilySuccess);
				} else {
					bootbox.alert("A Family Member with same PAN exists.");
					hideProcessingLoaderOnSave("#idCreateFamily");
				}
			}*/
			
			function onCreateFamilySuccess(data) {
				$("#idFamilyName").val("");
				$("#idFamilyPAN").val("");						
				$("#idFamilyTable").empty();
				$("#idClientName").val("");
				var clientDrop = $("#idFinexaClientDrop");
				clientDrop.find('option').remove();
				clientDrop.append('<option value="">Select Finexa Client</option>');
				var clientDrop = $("#idRelationDrop");
				clientDrop.find('option').remove();
				clientDrop.append('<option value="">Select Relation</option>');
				bootbox.alert("Family Member Created Successfully");
				hideProcessingLoaderOnSave("#idCreateFamily");
				
			}
		}
	}
	
});

function showProcessingLoaderOnSave(btnID){		
	$(btnID).attr("disabled","disabled");
	$(btnID).html('<i class="fa fa-refresh fa-lg fa-spin" style="color: #ffffff;"></i> Processing...');
	//$("body").css("cursor", "progress");
	$("#overlayLoading").css({'display':'block'});	
}

function hideProcessingLoaderOnSave(btnID){	
	//alert('In hideLoaderOnSave()');
	$(btnID).removeAttr("disabled");
	$(btnID).html("Create Family");
	//$("body").css("cursor", "default");
	$("#overlayLoading").css({'display':'none'});
}

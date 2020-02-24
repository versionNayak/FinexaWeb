var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var conditionalFlag = true;
$(document).ready(function(){
	
	
	/*$("#idCreateAutoClient").click(function(){
		
		showProcessingLoaderOnSave("#idCreateAutoClient");
		
		window.setTimeout(function(){
			
			$.ajax({
				type: 'GET',
				async:false,
				url: serviceIP+'/clientservice/autoCreateStagingInvestor?advisorId='+loggedInUser.id,
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
					hideProcessingLoaderOnSave("#idCreateAutoClient", "Submit");
					if(data == "Success") {
						bootbox.alert("Auto Creation of Investors Successful. ");
						$("#investorName").val("");
						$("#investorPAN").val("");						
						$("#idInvestorTable").empty();
					} else {
						bootbox.alert("Failed to auto create Investors.");
						$("#investorName").val("");
						$("#investorPAN").val("");						
						$("#idInvestorTable").empty();
					}
				},
				error: function (jqXHR, data) {
					if(jqXHR.status == 401){
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
			        }
					
					bootbox.alert(data.responseText);
				}
			});
			
		}, 3000);
			
		
	});*/
	
	$("#idInvestorMasterSearch").click(function(){
		
		var name = $("#investorName").val();
		var pan = $("#investorPAN").val();		
		console.log("name: " + name);
		console.log("pan: " + pan);
		
		if(validateClientMasterForm($("#idClientMasterForm"))){
			
			var serialNo = 1;
			 var j=1;
			
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
					$("#idInvestorTable").empty();
					$.each(data, function (index, value) {
						var finexaClientFlag;
						if(value.accountStatus==0) {
							finexaClientFlag = "Yet to be Mapped";
						} else if(value.accountStatus==1) {
							finexaClientFlag = "Already a Client";
						}else{
							finexaClientFlag = "Mapped as Family Member";
						}
			    		$("#idInvestorTable").append(
			    				
								'<tr><td>'+ (serialNo)+ '</td><td id = "idInvestorName'+ (serialNo) +'">'+ 
								value.investorName+ '</td><td id = "idInvestorPan'+ (serialNo) +'">'+
								value.investorPan+ '</td><td id = "idInvestorDob'+ (serialNo) +'">'+
								value.investorDOB+ '</td><td>'+  
								'<input type="checkbox" id = "idCheckbox'+ (serialNo) +'" class="form-control" style="width:1em"/></td><td>'+ 
								'<input type="checkbox" id = "idCheckboxFamilyName'+ (serialNo) +'" class="form-control cfm" style="width:1em" onchange="cfmChange(this, '+ (serialNo) +')"/></td>'+ 
/*								'<input type="checkbox" id = "idCheckboxFamilyHead'+ (serialNo) +'" class="form-control cfh" style="width:1em" onchange="cfhChange(this, '+ (serialNo) +')"/></td>'+
*/								'<td class = "hidden" id = "idInvestorAddressLine1'+ (serialNo) +'">'+ value.investorAddressLine1 +
								'<td class = "hidden" id = "idInvestorAddressLine2'+ (serialNo) +'">'+ value.investorAddressLine2 +
								'<td class = "hidden" id = "idInvestorAddressLine3'+ (serialNo) +'">'+ value.investorAddressLine3 +
								'<td class = "hidden" id = "idInvestorCity'+ (serialNo) +'">'+ value.investorCity +
								'<td class = "hidden" id = "idInvestorFolio'+ (serialNo) +'">'+ value.investorFolioNo +
								'<td class = "hidden" id = "idInvestorMobile'+ (serialNo) +'">'+ value.investorMobile +
								'<td class = "hidden" id = "idInvestorEmail'+ (serialNo) +'">'+ value.investorEmail +
								'<td class = "hidden" id = "idInvestorpincode'+ (serialNo) +'">'+ value.investorPinCode +
								'<td id = "idIsFinexaClient' + (serialNo) +'">' + finexaClientFlag +
								'</td><td><select style="padding-top: 2px;width:94px;" class="form-control input-width-medium" id="idGender' + (serialNo) + '" name="gender" tabindex="430">' + 
			    				'<option value="">Select</option><option value="M">Male</option><option value="F">Female</option></select></br><span class="formentry-errmsg" id="alertGender'+ (serialNo) +'"></span></td></tr>');				
						if(value.accountStatus!=0){
							$("#idCheckbox"+ serialNo).prop( "disabled", true );
							$("#idCheckboxFamilyName"+ serialNo).prop( "disabled", true );
							
							
						}
						serialNo++;
					});
				},
				error: function (jqXHR, data) {
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
					//   alert(JSON.stringify(data.));
					bootbox.alert(data.responseText);
	//				alert(data.responseText);
				}
	
			});
			
			
		}			
	});
		
	
});

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

/*function cfhChange(obj, p) {
	var cfm = document.getElementsByClassName("cfm");
	var cfh = document.getElementsByClassName("cfh");
	    for (var i = 0; i < cfh.length; i++) {
	    	cfh[i].checked = false;
	    	cfm[i].checked = false;
	    }
	 obj.checked = true;
	 cfm[p-1].checked = true;
}*/

$('#idCreateClient').click( function() {
	
	var indexArr = [];
	var clientNameFamilyHeadIndexArr = [];
	var clientDOBIndexArr = [];
	var advisorId = loggedInUser.id;
	var rowNo;
	var errorFlag = 0;
	var viewData = { 
		    investor : [] 
		};
	
	var rowCount = $('#idInvestorTable tr').length;
	
	var tbl2 = $('#idInvestorTable tr').each(function(i) {
		
		++i;
		
		//eliminate the header and last incremented value
		if (i <= (rowCount)) {
			var jsonData = {};
			jsonData["advisorUser"] = advisorId;
			if($("#idCheckbox"+i).is(":checked")){
				
				console.log("Checkbox" + i + " is checked");
				$("idCheckbox"+i).removeAttr('style');
				toBeAddedFlag = 1;
				rowNo=i;
				
				var investorName = $("#idInvestorName"+i).text();
				//console.log(investorName);
				jsonData["investorName"] = investorName;
				
				var investorPan = $("#idInvestorPan"+i).text();
				//console.log(investorPan);
				jsonData["investorPan"] = investorPan;
				
				var investorDob = $("#idInvestorDob"+i).text();
				//console.log(investorDob);
				if(investorDob == "null") {
					clientDOBIndexArr.push(i);
				}
				jsonData["investorDOB"] = investorDob;
				
				var gender = $("#idGender"+i).val();
				//console.log(gender);
				jsonData["investorGender"] = gender;
				
				if($("#idCheckboxFamilyName"+i).is(":checked")){
					jsonData["familyHead"] = true;
				} else {
					jsonData["familyHead"] = false;
				}
				
				var investorFolioNo = $("#idInvestorFolio"+i).text();
				//console.log(investorFolioNo);
				jsonData["investorFolioNo"] = investorFolioNo;
				
				var address1 = $("#idInvestorAddressLine1"+i).text();
				//console.log(address1);
				jsonData["investorAddressLine1"] = address1;
				
				var address2 = $("#idInvestorAddressLine2"+i).text();
				//console.log(address2);
				jsonData["investorAddressLine2"] = address2;
				
				var address3 = $("#idInvestorAddressLine3"+i).text();
				//console.log(address3);
				jsonData["investorAddressLine3"] = address3;
				
				var city = $("#idInvestorCity"+i).text();
				//console.log(city);
				jsonData["investorCity"] = city;
				
				var email = $("#idInvestorEmail"+i).text();
				//console.log(email);
				jsonData["investorEmail"] = email;
				
				var mobile = $("#idInvestorMobile"+i).text();
				//console.log(mobile);
				jsonData["investorMobile"] = mobile;
				
				var pinCode = $("#idInvestorpincode"+i).text();
				//console.log(mobile);
				jsonData["investorPinCode"] = pinCode;
				
				
				viewData.investor.push(jsonData);
				indexArr.push(i);
				
				if($("#idCheckboxFamilyName"+i).is(":checked")) {
					clientNameFamilyHeadIndexArr.push(i);
				}
			} 
		}
	});
	
	if(indexArr.length === 0) {
		bootbox.alert("Please check at least one check box in Checkbox column.");
		errorFlag = 1;
	} else {
		if(clientNameFamilyHeadIndexArr.length === 0) {
			bootbox.alert("Please check the investor whom you want to be Finexa Client.")
			errorFlag = 1;
		} else if(clientDOBIndexArr.length > 0) {
			bootbox.alert("Please check the investor who has a date of birth.")
			errorFlag = 1;
		}
	}
	
	var proceed = 1;
	if (errorFlag == 1) {
		proceed = 0;
		$(window).scrollTop(0);
	}
	
	console.log("viewData: " + JSON.stringify(viewData.investor));
	
	if(proceed == 1) {
		if(validateClientMasterListForm(indexArr)){
			showProcessingLoaderOnSave("#idCreateClient");
			window.setTimeout(function(){
				var data = JSON.stringify(viewData.investor);
				saveData("POST", data, "createClient", onCreateClientSuccess);
			}, 3000);
			
			function onCreateClientSuccess(data) {
				$("#investorName").val("");
				$("#investorPAN").val("");						
				$("#idInvestorTable").empty();
				bootbox.alert("Client Created Successfully");
				hideProcessingLoaderOnSave("#idCreateClient", "Create Client");
			}
		}
	}
	
});

$('#idInvestorMasterClear').click( function() {
	$("#investorName").val("");
	$("#investorPAN").val("");		
	
});

function showProcessingLoaderOnSave(btnID){		
	$(btnID).attr("disabled","disabled");
	$(btnID).html('<i class="fa fa-refresh fa-lg fa-spin" style="color: #ffffff;"></i> Processing...');
	//$("body").css("cursor", "progress");
	$("#overlayLoading").css({'display':'block'});	
}

function hideProcessingLoaderOnSave(btnID, text){	
	//alert('In hideLoaderOnSave()');
	$(btnID).removeAttr("disabled");
	$(btnID).html(text);
	//$("body").css("cursor", "default");
	$("#overlayLoading").css({'display':'none'});
}

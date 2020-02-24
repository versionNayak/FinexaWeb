var selectedDocType = -1;
var selectedClientUCC;
$(document).ready(function() {
	var transactMode = sessionStorage.getItem("TRANSACT_NAV_MODE");
	if (transactMode == "SIDEBAR") {
		$("#idDivUCCText").hide();
		$("#idDivUCCCombo").show();
		var serviceurl = "clientTransact/"+selectedClientId;
	    getClientData("GET", "" , serviceurl, onSuccess);
	    function onSuccess(data) {
	    	if (data.length == 0) {
	    		
	    		 bootbox.confirm({
					  title: "No Client Code Present",
				    	message: "Please create Client Code to Proceed further",
					    	callback: function (result) {
					    		if (result === true) {
					    			$("#idInvest").empty();
					    			$(".dashboardheading").html("Create UCC");
					    			$("#idInvest").load("invest/addCreateUCC.html");
					    		}
		    	 				else{
		    	 					$(".dashboardheading").html("View UCC");
		    	 			    	$("#idInvest").load("invest/viewUCCDetails.html");
	    	 				}	
	    	 				}	
	            		});
	    	} else {
	    		holdingDrop = $("#idClientUCCCombo");
				holdingDrop.find('option').remove();
				holdingDrop.append('<option value="">Select UCC</option>');
				$.each(data, function (index, value) {
					holdingDrop.append('<option value="' + value.clientCode + '" name = "' + value.clientAppName1 + '">' + value.clientCode + '</option>');
				});
	    	}
	    }
		
	} else {
		$("#idDivUCCText").show();
		$("#idDivUCCCombo").hide();
	}
});	
$("#idUploadFile").on("click", function(event) {
	
	if (selectedDocType == -1) {
		bootbox.alert("Please Choose a File Type for Uploading");
	} else if (selectedDocType == 1) {
		// upload AOF

		if ($("#idSelectedFile").val() == "") {
			bootbox.alert("Please Choose a File for Uploading");
		} else {
			var fileName = document.getElementById("idSelectedFile").files[0].name;
			if (validate(fileName)) {


				var form = $("#idFormUpload")[0];
				var data = new FormData(form);
				var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				//formData["clientId"] = selectedClientId;
				var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
				//formData["advisorId"] = loggedUser.id;
				var clientCode = $("#idClientUCCCombo").val();
				data.append("clientCode", clientCode);
				data.append("advisorId", loggedUser.id);
				data.append("clientId", selectedClientId);
				$.ajax({
			        type: "POST",
			        enctype: 'multipart/form-data',
			        url: ClientServiceUrl+'clientTransact/uploadAOF',
			        data: data,
			        processData: false, //prevent jQuery from automatically transforming the data into a query string
			        contentType: false,
			        cache: false,
			        timeout: 20000,
			        beforeSend: function (xhr){ 
						xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				   },
			        success: function (data) {
			        	
			        	bootbox.alert(data.message);
			         	var errorNum = data.errors.length;
			        
			        	if(errorNum >0){
			        	    str = data.errors.join('\n');
			        	    bootbox.alert(str);
			        	}else{
			        		bootbox.alert("File uploading successful");
				        	/*$("#idBusiness").load("userManagement/viewUserCreation.html");
							$(".dashboardheading    ").html("");
						    $(".dashboardheading").html("View User List");*/
			        	}
			        	$("#idInvest").empty();
		        		$(".dashboardheading").html("FATCA Declaration");
		        		$("#idInvest").load("invest/fatca.html");
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
						      })
				        	}
				        	if(error === "unauthorized"){
				        		msg = "Full authentication is required to access this resource",
				        		bootbox.alert({
						        	 message: msg
						        })
				        	}	
				        } else if (jqXHR.status == 404) {
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
				        
				        if (JSON.parse(jqXHR.responseText).errorMessage != null || JSON.parse(jqXHR.responseText).errorMessage != "undefined" || JSON.parse(jqXHR.responseText).errorMessage != "") {
				        	sessionStorage.removeItem("MSG");
				        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage);
				        }
				        if (msg != "") {
				        	sessionStorage.removeItem("MSG");
				        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
				        }
			        }
			    });
			}
		}
	
	} else if (selectedDocType == 2) {
		// upload NACH

		if ($("#idSelectedFile").val() == "") {
			bootbox.alert("Please Choose a File for Uploading");
		} else {
			var fileName = document.getElementById("idSelectedFile").files[0].name;
			if (validate(fileName)) {


				var form = $("#idFormUpload")[0];
				var data = new FormData(form);
				var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				//formData["clientId"] = selectedClientId;
				var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
				//formData["advisorId"] = loggedUser.id;
				var clientCode = $("#idClientUCCCombo").val();
				data.append("clientCode", clientCode);
				data.append("advisorId", loggedUser.id);
				data.append("clientId", selectedClientId);
				data.append("mandateId", $("#idMandateType").val());
				$.ajax({
			        type: "POST",
			        enctype: 'multipart/form-data',
			        url: ClientServiceUrl+'clientTransact/uploadNach',
			        data: data,
			        processData: false, //prevent jQuery from automatically transforming the data into a query string
			        contentType: false,
			        cache: false,
			        timeout: 6000,
			        beforeSend: function (xhr){ 
						xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				    },
			        success: function (data) {
			        	
			        	bootbox.alert(data.message);
			         	var errorNum = data.errors.length;
			        
			        	if(errorNum >0){
			        	    str = data.errors.join('\n');
			        	    bootbox.alert(str);
			        	}else{
			        		bootbox.alert("File uploading successful");
				        	/*$("#idBusiness").load("userManagement/viewUserCreation.html");
							$(".dashboardheading    ").html("");
						    $(".dashboardheading").html("View User List");*/
			        	}
			        	$("#idInvest").empty();
		        		$(".dashboardheading").html("FATCA Declaration");
		        		$("#idInvest").load("invest/fatca.html");
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
						      })
				        	}
				        	if(error === "unauthorized"){
				        		msg = "Full authentication is required to access this resource",
				        		bootbox.alert({
						        	 message: msg
						        })
				        	}	
				        } else if (jqXHR.status == 404) {
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
				        
				        if (JSON.parse(jqXHR.responseText).errorMessage != null || JSON.parse(jqXHR.responseText).errorMessage != "undefined" || JSON.parse(jqXHR.responseText).errorMessage != "") {
				        	sessionStorage.removeItem("MSG");
				        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage);
				        }
				        if (msg != "") {
				        	sessionStorage.removeItem("MSG");
				        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
				        }
			        }
			    });
			}
		}
	
	}
	
});

function validate(fileName) {
	var _validFileExtensions = [".tiff",".jpg"];    
	if (fileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];
            if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
            }
        }
        
        if (!blnValid) {
            bootbox.alert("Sorry, " + fileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
            return false;
        }
    }
    return true;
}

$('#idDocType').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idDocType");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedDocType = selectedValue;
	if(selectedValue == 1) {
		// show the AOF info
		$("#idMandateType").prop( "disabled", true );
		$("#infoBox").attr("title", "1.The format for image upload is .TIFF \n2.The naming convention is  MemberCodeClientcodeDDMMYYYY.TIFF. Eg. Member code is 10000, Client code is 123456 and Date 3rd June 2016 Then the tiff file name should be 1000012345603062016.tiff \n3.Image size should be less than 4 MB");
	} else {
		// show the NACH Mandate info
		
		$("#infoBox").attr("title", "1.Naming convention of the file format: “Mandateid”.  Eg. 662255 \n2.The mandate has to be as per NPCI’s format i.e. 8” * 3 2/3”.\n3.Sponsor Bank Code: CITI000PIGW to be printed on mandate in sponsor bank field.\n4.Utility Code: CITI00002000000037 to be printed on mandate in utility code field.\n5. It is mandatory to restrict the mandate size/format to below mentioned specification:\n\nA)TIFF Image\n• The Image should be in black & white.\n• The Image should be in TIFF Format\n• DPI for the Image is 200\n• The Image size is less than 2MB for TIFF\nB)JPEG Image\n• The Image should be in grayscale.\n• The Image should be in JPEG Format.\n• DPI for the Image should be 100.\n• The Image size is less than 2MB for JPEG.");

		$("#idMandateType").prop( "disabled", false );
		
		if (selectedClientUCC == null || selectedClientUCC == "") {
			bootbox.alert("Please select a UCC");
		} else {
			var serviceUrl = "getMandateId/" + selectedClientUCC + "/X";
			getClientData("GET", "", serviceUrl, onSuccess);
			function onSuccess(data) {
				holdingDrop = $("#idMandateType");
				holdingDrop.find('option').remove();
				holdingDrop.append('<option value="">Select Id</option>');
				$.each(data, function (index, value) {
					holdingDrop.append('<option value="' + value + '">' + value + '</option>');
				});
			}
		}
		
	}
});
$('#idClientUCCCombo').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idClientUCCCombo");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedClientUCC = selectedValue;
	if(selectedDocType == 1) {
		// show the AOF info
		$("#idMandateType").prop( "disabled", true );
		$("#infoBox").attr("title", "1.The format for image upload is .TIFF \n2.The naming convention is  MemberCodeClientcodeDDMMYYYY.TIFF. Eg. Member code is 10000, Client code is 123456 and Date 3rd June 2016 Then the tiff file name should be 1000012345603062016.tiff \n3.Image size should be less than 4 MB");
	} else  if (selectedDocType == 2){
		
		// show the NACH Mandate info
		
		$("#infoBox").attr("title", "1.Naming convention of the file format: “Mandateid”.  Eg. 662255 \n2.The mandate has to be as per NPCI’s format i.e. 8” * 3 2/3”.\n3.Sponsor Bank Code: CITI000PIGW to be printed on mandate in sponsor bank field.\n4.Utility Code: CITI00002000000037 to be printed on mandate in utility code field.\n5. It is mandatory to restrict the mandate size/format to below mentioned specification:\n\nA)TIFF Image\n• The Image should be in black & white.\n• The Image should be in TIFF Format\n• DPI for the Image is 200\n• The Image size is less than 2MB for TIFF\nB)JPEG Image\n• The Image should be in grayscale.\n• The Image should be in JPEG Format.\n• DPI for the Image should be 100.\n• The Image size is less than 2MB for JPEG.");

		$("#idMandateType").prop( "disabled", false );
		
		if (selectedClientUCC == null || selectedClientUCC == "") {
			bootbox.alert("Please select a UCC");
		} else {
			var serviceUrl = "getMandateId/" + selectedClientUCC + "/X";
			getClientData("GET", "", serviceUrl, onSuccess);
			function onSuccess(data) {
				holdingDrop = $("#idMandateType");
				holdingDrop.find('option').remove();
				holdingDrop.append('<option value="">Select Id</option>');
				$.each(data, function (index, value) {
					holdingDrop.append('<option value="' + value + '">' + value + '</option>');
				});
			}
		}
		
	}
});

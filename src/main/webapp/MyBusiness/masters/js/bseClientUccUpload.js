$(document).ready(function() {


	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var id = loggedUser.id;

	$("#idBrowseFile").on("click", function(event) {
		var x = document.getElementById("myFile");
	    x.disabled = true;
	});

	$("#idUploadFile").on("click", function(event) {
		
		
		var fileType = $("#idFileType").val();
		
		if(fileType==1){
		if ($("#idSelectedFile").val() == "") {
			bootbox.alert("Please Choose a File for Uploading");
		} else {
			var fileName = document.getElementById("idSelectedFile").files[0].name;
			if (validate(fileName)) {
				
				var form = $("#idFormUpload")[0];
				var data = new FormData(form);
				data.append("advisorUserId", id);
				
				$.ajax({
			        type: "POST",
			        enctype: 'multipart/form-data',
			        url: ClientServiceUrl+'clientTransact/uploadBulkUCC',
			        data: data,
			        processData: false, //prevent jQuery from automatically transforming the data into a query string
			        contentType: false,
			        cache: false,
			        timeout: 6000,
			        beforeSend: function (xhr){ 
			    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			        },
			        success: function (data) {
			        	
//			        	console.log("Data : " + data);
			         	var errorNum = data.errors.length;
			         	var str = "";
			        	if(errorNum >0){
			        		for (var i = 0;i < errorNum; i++) {
			        			str = str + data.errors[i] + "<br>";
//			        			console.log(str);
			        		}
//			        	    str = data.errors.join("\r\n");
//			        	    console.log(str);
//			        	    alert(str);
			        	    bootbox.alert(str);
			        	
			        	}else{
			        		alert("File uploading successful");
				        	$("#idBusiness").load("userManagement/viewUserCreation.html");
							$(".dashboardheading    ").html("");
						    $(".dashboardheading").html("View User List");
			        	}
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
//				        $("#idBusiness").load("resources/errorPage.html");
			        }
			    });
			}
		}
		}
		else if(fileType==2){
			//alert('Inside 2');
		
			if ($("#idSelectedFile").val() == "") {
				bootbox.alert("Please Choose a File for Uploading");
			} else {
				var fileName = document.getElementById("idSelectedFile").files[0].name;
				if (validate(fileName)) {
					var form = $("#idFormUpload")[0];
					var data = new FormData(form);
					data.append("advisorUserId", id);
					
					$.ajax({
				        type: "POST",
				        enctype: 'multipart/form-data',
				        //url: ClientServiceUrl+'clientTransact/uploadBulkUCC',
				        url: ClientServiceUrl+'clientTransact/uploadBulkFatca',
				        data: data,
				        processData: false, //prevent jQuery from automatically transforming the data into a query string
				        contentType: false,
				        cache: false,
				        timeout: 6000,
				        beforeSend: function (xhr){ 
				    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				        },
				        success: function (data) {
				        	
//				        	console.log("Data : " + data);
				         	var errorNum = data.errors.length;
				        
				        	if(errorNum >0){
				        	    str = data.errors.join('\n');

				        	     bootbox.alert(str);
				        	
				        	}else{
				        		alert("File uploading successful");
					        	$("#idBusiness").load("userManagement/viewUserCreation.html");
								$(".dashboardheading    ").html("");
							    $(".dashboardheading").html("View User List");
				        	}
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
//					        $("#idBusiness").load("resources/errorPage.html");
				        }
				    });
				}
				
			}
			}
		else if(fileType==3){
			
			
			if ($("#idSelectedFile").val() == "") {
				bootbox.alert("Please Choose a File for Uploading");
			} else {
				var fileName = document.getElementById("idSelectedFile").files[0].name;
				if (validate(fileName)) {
					
					var form = $("#idFormUpload")[0];
					var data = new FormData(form);
					data.append("advisorUserId", id);
					
					$.ajax({
				        type: "POST",
				        enctype: 'multipart/form-data',
				        url: ClientServiceUrl+'clientTransact/uploadBulkMandate',
				        data: data,
				        processData: false, //prevent jQuery from automatically transforming the data into a query string
				        contentType: false,
				        cache: false,
				        timeout: 6000,
				        beforeSend: function (xhr){ 
				    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				        },
				        success: function (data) {
				        	
//				        	console.log("Data : " + data);
				         	var errorNum = data.errors.length;
				         	var str = "";
				         	if(errorNum >0){
				        		for (var i = 0;i < errorNum; i++) {
				        			str = str + data.errors[i] + "<br>";
//				        			console.log(str);
				        		}
//				        	    str = data.errors.join("\r\n");
//				        	    console.log(str);
//				        	    alert(str);
				        	    bootbox.alert(str);
				        	
				        	}else{
				        		alert("File uploading successful");
					        	$("#idBusiness").load("userManagement/viewUserCreation.html");
								$(".dashboardheading    ").html("");
							    $(".dashboardheading").html("View User List");
				        	}
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
//					        $("#idBusiness").load("resources/errorPage.html");
				        }
				    });
				}
			}
			}
		else{
			bootbox.alert("Please select a File Type for Uploading");
		}
		                 
	});
	function validate(fileName) {
		var validFileExtensions = [".xlsx"];
		if (fileName.length > 0) {
	        var blnValid = false;
	        for (var j = 0; j < validFileExtensions.length; j++) {
	            var sCurExtension = validFileExtensions[j];
	            if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
	            	blnValid = true;
	                break;
	            }
	        }
	        if (!blnValid) {
	            bootbox.alert("Sorry, " + fileName + " is invalid, allowed extensions are: " + validFileExtensions.join(", "));
	            return false;
	        }
	    }
	    return true;
	}


});

$(document).ready(function () {
	
	var lMasterName = document.getElementById("idMasterName");
	var selectedMaster;
	
	$('#idMasterName').on('change', function(){
		selectedMaster = $(this).val();
   	});
	
	$('#idTemplateFormat').on('change', function(){
		fileFormat = $(this).val();
   	});
	
	
	var lTemplateFormat = document.getElementById("idTemplateFormat");
	
		"use strict";
		$("[data-toggle=\"tooltip\"]").tooltip();
		$("#IdEffectiveDateFrom").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			endDate: new Date()
		});
		
		$(".datepicker-icon").on("click", function () {
			$(this).closest(".input-group").find("input").trigger("focus");
		});
		
		
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		var id = loggedUser.id;
		$("#downloadTemplateSubmit").on("click", function(event) {
			var validateTF;
			validateTF = validateTemplate($('#IdUploadMasterForm'));
			//alert(validateTF);
			if(validateTF) {
					//alert(fileFormat);
				
				$.ajax({
			        type: "GET",
			        enctype: 'multipart/form-data',
			        url: ClientServiceUrl+"masters/"+selectedMaster+"/"+fileFormat+"/downloadTemplate",
			        contentType: false,
			        cache: false,
			        timeout: 6000,
			        beforeSend: function (xhr){ 
			    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			        },
			        success: function (data) {
			        	
			        	$('#IdUploadMasterForm').prop('action', ClientServiceUrl+"masters/"+selectedMaster+"/"+fileFormat+"/downloadTemplate");
			    		$('#IdUploadMasterForm').prop('method', 'GET');
			    		$('#IdUploadMasterForm').submit();
			         	
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
				         /*if (msg != "") {
				        	sessionStorage.removeItem("MSG");
				        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
				        }*/
				        $("#idBuinessMasters").load("resources/errorPage.html");
			        }
			    });
				
					/*var href = ClientServiceUrl+"masters/"+selectedMaster+"/"+fileFormat+"/downloadTemplate";
			    	window.location=href; */
				
			}
			   		
		});
		
		$("#IdUploadMasterSubmit").click(function (event) {
			
		//	alert(lSelectedFile.value);
		//	return false;
    	
			console.log("uploading starting .....")
			var validate;
			validate = validateUM($('#IdUploadMasterForm'));
			if (validate) {
				event.preventDefault();
				
				var fileName = $("#IdSelectedFile").val();
				if (fileName == "") {
					alert("Please Choose a File for Uploading");
				} else {
					console.log("Filename : " + fileName);
					var form = $("#IdUploadMasterForm")[0];
					var data = new FormData(form);
				    data.append("uploadedBy", id);
				
				  
				    
				    $.ajax({
					        type: "POST",
					        enctype: 'multipart/form-data',
					        url: ClientServiceUrl+'masters/'+selectedMaster+'/upload',
					        data: data,
					        processData: false, //prevent jQuery from automatically transforming the data into a query string
					        contentType: false,
					        cache: false,
					        timeout: 6000,
					        beforeSend: function (xhr){ 
								xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
						    },
					        success: function (data) {
					        	var bug = data.errors.join('<br>');
					        	if(data.errors.length >0){
					        		bootbox.confirm({
					        	        title: "Errors in the file!",
					        	        message: "Do you want to log these errors in an excel file now?"+ '<br>' + bug.fontcolor("red"),
					        	        buttons: {
					        	            cancel: {
					        	                label: '<i class="fa fa-times"></i> Cancel'
					        	            },
					        	            confirm: {
					        	                label: '<i class="fa fa-check"></i> Confirm'
					        	            }
					        	        },
					        	        callback: function (result) {
					        	            if (result == true) {
					        	            	var href = ClientServiceUrl+"masters/"+data.errors.join("\r\n")+"/downloadErrorLog/"+selectedMaster;
					        	 			    window.location=href;
					        	 			    console.log("result is true");
					        	            }
					        	        }
					        	    });
					        	}else{
					        		alert("File uploading successful");
					        		$("#idBuinessMasters").load("masters/viewUploadmasters.html");
							  		$(".dashboardheading    ").html("");
							  		$(".dashboardheading    ").html("View Master List");
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
						         /*if (msg != "") {
						        	sessionStorage.removeItem("MSG");
						        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
						        }*/
						        $("#idBuinessMasters").load("resources/errorPage.html");
					        }
					    });
				 
					
				   /* if (lMasterName.value == "masterMutualFundETF") {
				    	$.ajax({
					        type: "POST",
					        enctype: 'multipart/form-data',
					        url: ClientServiceUrl+'master/uploadMasterMutualFundETF',
					        data: data,
					        processData: false, //prevent jQuery from automatically transforming the data into a query string
					        contentType: false,
					        cache: false,
					        timeout: 6000,
					        success: function (data) {
					        	alert("upload success");
					        	console.log("SUCCESS : ", data);
					        	formData["status"]="S";
					        	var dataToSave = JSON.stringify(formData);
								alert(dataToSave);
					            $("#IdUploadMasterSubmit").prop("disabled", false);
					           $.ajax({
									type : 'POST',
									async : true,
									url : ClientServiceUrl+"master/createUploadMaster",
									dataType : 'json',
									data:dataToSave,
									contentType : 'application/json',
									success : function(data) {
											alert("saved");
											$("#idBuinessMasters").load("masters/viewUploadmasters.html");
									  		$(".dashboardheading    ").html("");
									  		$(".dashboardheading    ").html("View Master List");
									},
									error : function(checkdErrorData) {
											alert("error");
										}     
									});
					        },
					        error: function (e) {
					        	alert("upload failed");
					        	console.log("ERROR : ", e);
					        	formData["status"]="F";
					        	var dataToSave = JSON.stringify(formData);
								alert(dataToSave);
					            $("#IdUploadMasterSubmit").prop("disabled", false);
					             $.ajax({
									type : 'POST',
									async : true,
									url : ClientServiceUrl+"master/createUploadMaster",
									dataType : 'json',
									data:dataToSave,
									contentType : 'application/json',
									success : function(data) {
											alert("saved");
											$("#idBuinessMasters").load("masters/viewUploadmasters.html");
									  		$(".dashboardheading    ").html("");
									  		$(".dashboardheading    ").html("View Master List");
									},
									error : function(checkdErrorData) {
											alert("error");
										}     
									});
					        }
					    });
				    }
				    
					if (lMasterName.value == "masterProductType") {
						$.ajax({
					        type: "POST",
					        enctype: 'multipart/form-data',
					        url: ClientServiceUrl+'master/uploadMasterProductType',
					        data: data,
					        processData: false, //prevent jQuery from automatically transforming the data into a query string
					        contentType: false,
					        cache: false,
					        timeout: 6000,
					        success: function (data) {
					        	alert("upload success");
					        	console.log("SUCCESS : ", data);
					        	formData["status"]="S";
					        	var dataToSave = JSON.stringify(formData);
								alert(dataToSave);
					            $("#IdUploadMasterSubmit").prop("disabled", false);
					           $.ajax({
									type : 'POST',
									async : true,
									url : ClientServiceUrl+"master/createUploadMaster",
									dataType : 'json',
									data:dataToSave,
									contentType : 'application/json',
									success : function(data) {
											alert("saved");
											$("#idBuinessMasters").load("masters/viewUploadmasters.html");
									  		$(".dashboardheading    ").html("");
									  		$(".dashboardheading    ").html("View Master List");
									},
									error : function(checkdErrorData) {
											alert("error");
										}     
									});
					        },
					        error: function (e) {
					        	alert("upload failed");
					        	console.log("ERROR : ", e);
					        	formData["status"]="F";
					        	var dataToSave = JSON.stringify(formData);
								alert(dataToSave);
					            $("#IdUploadMasterSubmit").prop("disabled", false);
					             $.ajax({
									type : 'POST',
									async : true,
									url : ClientServiceUrl+"master/createUploadMaster",
									dataType : 'json',
									data:dataToSave,
									contentType : 'application/json',
									success : function(data) {
											alert("saved");
											$("#idBuinessMasters").load("masters/viewUploadmasters.html");
									  		$(".dashboardheading    ").html("");
									  		$(".dashboardheading    ").html("View Master List");
									},
									error : function(checkdErrorData) {
											alert("error");
										}     
									});
					        }
					    });
						
					}*/
					
					
					
					
					
				}
				
			}

		});
	
	
	
});


	
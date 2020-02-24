$(document).ready(function() {


	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var id = loggedUser.id;
	
	//new code for access rights
	if((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "N" )){
		addPageBusiness("../authorisationErrorPage.html","Access Denied");
	}
	
	$("#idDownloadTemplate").on("click", function(event) {
		
		loadLoader();
		
		$.ajax({
	        type: "GET",
	        enctype: 'multipart/form-data',
	        url: ClientServiceUrl+'advisorUsers/'+id+'/downloadUserTemplate',
	        contentType: false,
	        cache: false,
	        timeout: 6000,
	        beforeSend: function (xhr){ 
	    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    		
	        },
	        success: function (data) {
	        	//alert("aaaaaaaaa");
	        /*	$('#idFormUpload').prop('action', ClientServiceUrl+'advisorUsers/'+id+'/downloadUserTemplate');
	    		$('#idFormUpload').prop('method', 'GET');
	    		$('#idFormUpload').submit();*/
	    		
	    		var fname = "AdvisorUserUploadingTemplate.xls"; 
				var downloadURL = ClientServiceUrl+'advisorUsers/'+id+'/downloadUserTemplate';
			
		 		var a = document.createElement("a");
				document.body.appendChild(a);
				a.style = "display: none";
				var fileName = ""+ fname + "";
				var xhr = new XMLHttpRequest();
				xhr.open( "GET", downloadURL, true);
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				xhr.responseType = "blob";
				xhr.onload = function() {
					if(xhr.status == 401){
			        	bootbox.alert({
			        	    message: "You are not authenticated",
			        	    callback: function () {
				        	  window.location = "../index.html";
			        	    }
			        	})
			        }else if(xhr.status == 403){
			        	 msg = 'you don’t have permission to access ‘/’ on this server.';
			        	 //alert(msg);
			        }else if(xhr.status === 200){
					//Download start
					// IE
					if (window.navigator.msSaveOrOpenBlob)
	                {
						console.log("IE")
						 var blob = new Blob([xhr.response], {type: 'application/vnd.ms-word'});
	                    window.navigator.msSaveOrOpenBlob(blob, fileName);
	              
	               a.click();
	                }
	              else //Chrome and safari
	               {
	           	   console.log("Chrome and safari")
	           	   var url = window.URL.createObjectURL(xhr.response);  
	  				   a.href = url;
	  				   a.download = fileName;
	  				    a.click();
	  				    window.URL.revokeObjectURL(url);
	                }
			      }
					//Download End
	         	};
					xhr.send(); 
					
					hideLoader();
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
		         $("#idBusiness").load("resources/errorPage.html");
	        }
	    });
		
	});

	$("#idBrowseFile").on("click", function(event) {
		var x = document.getElementById("myFile");
	    x.disabled = true;
	    //alert($("#idSelectedFile").val())
	});
	
	$("#idSelectedFile").on("click", function(event) {
		//var x = document.getElementById("myFile");
	   // x.disabled = true;
	    //alert($("#idSelectedFile").val())
	});

	$("#idUploadFile").on("click", function(event) {
		//loadLoader();
		var fileName = $("#idSelectedFile").val();
		var n = fileName.lastIndexOf('\\');
		var selectedFileName = fileName.substring(n + 1);
		if (fileName == "") {
			bootbox.alert("Please Choose a File for Uploading");
		} else {
			//loadLoader();
			
			var form = $("#idFormUpload")[0];
			var data = new FormData(form);
			data.append("advisorUserId", id);
			data.append("filename", selectedFileName);

			$.ajax({
		        type: "POST",
		        enctype: 'multipart/form-data',
		        //url: ClientServiceUrl+'advisorUsers/uploadBulkUsers',
		        url: ClientServiceUrl+'advisorUsers/'+id+'/uploadBulkUsers',
		        data: data,
		        processData: false, //prevent jQuery from automatically transforming the data into a query string
		        contentType: false,
		        cache: false,
		        beforeSend: function (xhr){ 
		    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		        },
		        success: function (data) {
		        	
		        	console.log("Data : " + data);
		         	var errorNum = data.errors.length;
		         	var message = data.message;
		         	
		        	if(errorNum >0){
		        	    str = data.errors.join('\n');

		        	     bootbox.alert(str);
		        	
		        	} else {
		        		var admin = "N";
		        		getClientDataAsyncFalse("GET", "", "user/"+loggedUser.id, onUserRoleSuccess);
		        		function onUserRoleSuccess(data) {
			        			//populateStaticRoleDrop($("#idRole"));
			        			
			        			if(data.admin != "Y"){
			        				bootbox.alert(message);
						        	$("#idBusiness").load("userManagement/viewUserCreation.html");
									$(".dashboardheading    ").html("");
								    $(".dashboardheading").html("View User List");
			        			} else {
			        				bootbox.alert(message);
						        	$("#idBusiness").load("userManagement/viewUserCreation.html");
									$(".dashboardheading    ").html("");
								    $(".dashboardheading").html("View User List");
			        			}
		        			}
		        		
		        	}
		        	
		        	hideLoader();	
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
			        		msg = "Your session has expired.Please log in again";
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
			        $("#idBusiness").load("resources/errorPage.html");
		        }
		        
		    });
			/*
			
			
			$('#idFormUpload').prop('action', ClientServiceUrl+'advisorUsers/uploadBulkUsers');
			$('#idFormUpload').prop('method', 'POST');
			$('#idFormUpload').prop('enctype', 'multipart/form-data');
			$('#idFormUpload').submit();*/
			
			//hideLoader();	
		}
		
		  
	});


});

function loadLoader(){	
		//alert("inside load loader")
	   // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"><span class="fa fa-refresh fa-spin"></span> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
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



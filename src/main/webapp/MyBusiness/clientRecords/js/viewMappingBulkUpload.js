var fileType;
var fileFormat;
var fname;

$(document).ready(function() {
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var id=loggedUser.id;
	
	$('#idFileFormat').on('change', function(){
		fileFormat = $(this).val();
   	});
	
	$("#idDownload").on("click", function(event) {
		
		$.ajax({
	        type: "GET",
	        enctype: 'multipart/form-data',
	        url: ClientServiceUrl + "clientRecord/" + fileFormat + "/downloadClientRemappingTemplate/" + id,
	        contentType: false,
	        cache: false,
	        timeout: 6000,
	        beforeSend: function (xhr){ 
	    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	        },
	        beforeSend: function (xhr){ 
	    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	        },
	        success: function (data) {
	        	
	        	/*$('#idBulkUploadForm').prop('action', ClientServiceUrl+'clientRecord/'+fileFormat+'/downloadClientRemappingTemplate');
	    		$('#idBulkUploadForm').prop('method', 'GET');
	    		$('#idBulkUploadForm').submit();*/
	        	
	        	if (fileFormat == "excel") {
	        		fname = "ClientRemappingTemplate.xls"; 
	        	} else if (fileFormat == "csv") {
	        		fname = "ClientRemappingTemplate.csv"; 
	        	}
				var downloadURL = ClientServiceUrl+'clientRecord/'+fileFormat+'/downloadClientRemappingTemplate/'+id;
	         	
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
	        },
	        error: function (jqXHR, exception) {
	        	var msg = '';
		        if (jqXHR.status === 0) {
		            msg = 'Could not connect to the server, please contact System Administrator.';
		        }else if(jqXHR.status == 400){
		        	msg = 'There is some problem in the server, please contact System Administrator.\n';
		        }else if(jqXHR.status == 401){
		        	//msg = 'You are not authorized to access this data.';
		            	bootbox.alert({
		            	    message: "You are not authenticated",
		            	    callback: function () {
		                	  window.location = "../index.html";
		                		
		            	    }
		            	})
		              
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
		        	localStorage.removeItem("MSG");
		        	localStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
		        }*/
		         $("#idBusiness").load("resources/errorPage.html");
	        }
		});
	});

	$("#idUpload").on("click", function(event) {
		loadLoader();
		console.log("Uploading client records .... ");
		var fileName = $("#idSelectedFile").val();
		if (fileName == "") {
			bootbox.alert("Please Choose a File for Uploading");
			hideLoader();
		} else {
		var form = $("#idBulkUploadForm")[0];
	
			var data = new FormData(form);
			//data.append("advisorUserId",$("#advisorUserId").val());
			$.ajax({
		        type: "POST",
		        enctype: 'multipart/form-data',
		        url: ClientServiceUrl+'clientRecord/bulkUpload',
		        data: data,
		        processData: false, //prevent jQuery from automatically transforming the data into a query string
		        contentType: false,
		        cache: false,
		        beforeSend: function (xhr){ 
		    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		        },
		        beforeSend: function (xhr){ 
		    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		        },
		        success: function (data) {
		        	if(data.errors.length > 0){
		        		bootbox.alert(data.errors.join('<br>'));
		        		hideLoader();
		        	}else {
		        		bootbox.alert("File uploading successful");
		        		hideLoader();
		        	}
		        },
		        error: function (jqXHR, exception) {
		        	var msg = '';
			        if (jqXHR.status === 0) {
			            msg = 'Could not connect to the server, please contact System Administrator.';
			        }else if(jqXHR.status == 400){
			        	msg = 'There is some problem in the server, please contact System Administrator.\n';
			        }else if(jqXHR.status == 401){
			        	//msg = 'You are not authorized to access this data.';
			        	bootbox.alert({
			        	    message: "You are not authenticated",
			        	    callback: function () {
				        	  window.location = "../index.html";
				        		
			        	    }
			        	})
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
			        	localStorage.removeItem("MSG");
			        	localStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
			        }*/
			         $("#idBusiness").load("resources/errorPage.html");
			         hideLoader();
		        }
		    });
		}
	});	
});		
	
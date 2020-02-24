$(document).ready(function() {

	getRTA();
	
	$("#idRTA").change(function() {
		getSpecificRTAFileNames();
	});
	
});

function getRTA() {
	getClientData("GET","","AllRTAType",rtaSuccess);
	
	function rtaSuccess(data){
		holdingDrop = $("#idRTA");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select RTA</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.id + '">' + item.name + '</option>');
		});
	}
}

function getSpecificRTAFileNames() {
	
	serviceurl = "getSpecificFileNameByRTAAndFileCode/" + $('#idRTA').val() + "/" + rejectionDataImportConstant;
	getClientDataAsyncFalse("GET","",serviceurl,specificRTAFileNameSuccess);
	
	function specificRTAFileNameSuccess(data){
		//console.log(data);
		fnDrop = $("#idFileName");
		fnDrop.find('option').remove();
		fnDrop.append('<option value="0">Select RTA File</option>');
		$.each(data, function (index, item) {
			fnDrop.append('<option value="' + item.id + '">' + item.rtaFileName + '</option>');
		});
		
	}
}

$("#idImport").click(function(){
	//alert("JS page");
	console.log("Uploading rejection feed .... ");
	var form = $("#idRejectionDataImportForm")[0];
	if(validateRejectionDataImportForm(form)){

		var data = new FormData(form);
		data.append("advisorId", loggedUser.id);
		
		$.ajax({
	        type: "POST",
	        enctype: 'multipart/form-data',
	        url: ClientServiceUrl+'uploadRejectionFeed',
	        data: data,
	        processData: false, //prevent jQuery from automatically transforming the data into a query string
	        contentType: false,
	        cache: false,
	        timeout: 20000,
	        success: function (data) {
	        	
	        	if(data.status) {
	        		bootbox.alert("File uploading successful");
	        	} else {
	        		 bootbox.confirm({
	        			 title: "Error Message",
	        			 message: "Failed to upload Rejection Feed file!",
	        			 buttons: {
		        	            cancel: {
		        	                label: '<i class="fa fa-times"></i> Cancel'
		        	            },
		        	            confirm: {
		        	                label: '<i class="fa fa-check"></i> Confirm'
		        	            }
		        	        },
		        	        callback: function (result) {
		        	            /*if (result == true) {
		        	            	var href = ClientServiceUrl+"clientImport/"+data.errors.join("\r\n")+"/downloadErrorLog";
		        	 			    window.location=href;
		        	 			    console.log("result is true");
		        	            }*/
		        	        }
	        		 });
	        	}
	        	
	        	/*if(data.errors.length > 0){
	        		 bootbox.confirm({
	        	        title: "Errors in the file!",
	        	        message: "Do you want to log these errors in an excel file now?"+ '<br>' + data.errors.join('<br>'),
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
	        	            	var href = ClientServiceUrl+"clientImport/"+data.errors.join("\r\n")+"/downloadErrorLog";
	        	 			    window.location=href;
	        	 			    console.log("result is true");
	        	            }
	        	        }
	        	    });
	        		
	        		
	        	}else {
	        		bootbox.alert("File uploading successful");
	        	}*/
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
		        $("#idBusiness").load("resources/errorPage.html");
	        }
	    });
	}
	
});
var fileSize;
var counter = 0;
var interval;
var uploadAjax;

var fileName;

var progressBarCanvas = function (canvas) {
	return {
		ctx: document.getElementById(canvas).getContext('2d'),
		display: function(p, color) {
			this.ctx.fillStyle = '#ffffff';
			this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			this.ctx.fillStyle = color;
			this.ctx.fillRect(0, 0, p * this.ctx.canvas.width/100, this.ctx.canvas.height);
		}
	};
};

$(document).ready(function() {

	$("#idProg").hide();
	$("#progressBar").hide();
    $("#progressBarCanvas").hide();
    
    //$("#idFileType").prop("disabled", true);
	
	getRTA();
	
	$("#idRTA").change(function() {
		getSpecificRTAFileNames();
	});
	
	document.getElementById("idSelectFile").onchange = function(e) {
		fileSize = this.files[0].size;
	}
		
	$(document).ajaxStart(function () {
		clearInterval(interval);
		counter = 0;
		interval = setInterval(function() {
			++counter;
			$('#alertMsg').text("  File Uploaded... Processing..... Time Taken : " + counter + " second");
			progressBarCanvas("progressBarCanvas").display(counter, '#20c7f0');
		}, 1000);
		
	});
	
    $(document).ajaxStop(function () {
    	clearInterval(interval);
    	counter = 0;
        //$('#wait').hide();
    });
    
    $(document).ajaxError(function () {
    	clearInterval(interval);
    	counter = 0;
    	//$('#wait').hide();
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
	
	serviceurl = "getSpecificFileNameByRTAAndFileCode/" + $('#idRTA').val() + "/" + sipstpFeedConstant;
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


$('#idFileName').change(function(e){
	var idFileId = $('#idFileName').val();
	//alert("File Id : " + idFileId);
	
	/*serviceurl = "getFileExtensionByFileName/" + idFileId;
	getClientDataAsyncFalse("GET","",serviceurl,specificFileExtensionSuccess);
	
	function specificFileExtensionSuccess(data) {
		//alert("File Name " + data.rtaFileName);
		$('#idFileType').val(data.extension);
		fileName = data.rtaFileName;
	}*/
	
});

$("#idImport").on("click", function(event) {
	
	console.log("Uploading SIPSTP feed .... ");
	 $("#idProg").show();
	 $("#progressBar").show();
	 $("#progressBarCanvas").show();
	
	 /*$('body').append('<div id="requestOverlay" class="request-overlay"></div>'); Create overlay on demand
     $("#requestOverlay").show();Show overlay

	$(".request-overlay").css({
	    "position": "absolute", 
	    "width": $(document).width(), 
	    "height": $(document).height(),
	    "z-index": 99999
	});*/
	
	var form = $("#idSipStpFeedForm")[0];
	if(validateSipStpFeedForm(form, fileName)){
		showProcessingLoaderOnSave("#idImport");
		window.setTimeout(function() {
			event.preventDefault();
			var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
			var data = new FormData(form);
			data.append("advisorId", loggedUser.id);
		uploadAjax = $.ajax({
				type: "POST",
		        enctype: 'multipart/form-data',
		        url: ClientServiceUrl+'/uploadSIPSTPFeed',
		        data: data,
		        processData: false, //prevent jQuery from automatically transforming the data into a query string
		        contentType: false,
		        cache: false,
		        xhr: function(){
		            	//Get XmlHttpRequest object
		             	var xhr = $.ajaxSettings.xhr() ;
		             	
		             	xhr.upload.onloadstart = function(event) {
		             		console.log("onloadstart");
		             	};
		            
		             	//Set onprogress event handler 
		                xhr.upload.onprogress = function(event){
		                	console.log("onprogress");
		                 	var perc = Math.round((event.loaded / event.total) * 100);
		                 	$('#progressBar').text(perc + '%');
		                 	$('#progressBar').css('width',perc + '%');
		                };
		                
		                xhr.upload.onload = function(event){
		                	console.log("onload");
		                };
		                
		                xhr.upload.onloadend = function(event) {
		                	console.log("onloadend");
		                };
		                
		            	return xhr;
		        	},
	        	beforeSend: function(xhr) {
	        		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	        		//Reset alert message and progress bar
	        		$('#progressBar').text('');
	        		$('#progressBar').css('width','0%');
	            },
		        success: function (data) {
		        	console.log("counter: " + counter);
		        	if(data.status) {
		        		//$("#requestOverlay").remove();/*Remove overlay*/
		        		hideProcessingLoaderOnSave("#idImport");
		        		$("#idProg").hide();
		        		$("#progressBar").hide();
		        		$("#progressBarCanvas").hide();
		        		$("#alertMsg").hide();
		        		bootbox.alert("File uploading under progress. Please check in View upload status tab.");
		        	} else {
		        		//$("#requestOverlay").remove();/*Remove overlay*/
		        		hideProcessingLoaderOnSave("#idImport");
		        		$("#idProg").hide();
		        		$("#progressBar").hide();
		        		$("#progressBarCanvas").hide();
		        		$("#alertMsg").hide();
		        		if(data.primaryKeyNotFound) {
		        			bootbox.confirm({
			        			 title: "Error Message",
			        			 message: "File rejected! One or more columns are not found in file.",
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
		        		} else {
		        		 bootbox.confirm({
		        			 title: "Error Message",
		        			 message: "Failed to upload SIP STP Feed file!",
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
			        $("#idBackOffice").load("resources/errorPage.html");
		        }
		    });
		
		}, 3000);
		
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
	$(btnID).html("Import");
	//$("body").css("cursor", "default");
	$("#overlayLoading").css({'display':'none'});
}


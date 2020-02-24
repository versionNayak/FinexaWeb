var userRoleList = []; 
var userIdList = []; 
var userLocationList = []; 
var userList;
var fileType;
var fileFormat;
var fname;
var id;
var loggedUser;
$(document).ready(function() {
	loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	id=loggedUser.id;
	populateUserCombo(id);	
	
	$('#idFileFormat').on('change', function(){
		fileFormat = $(this).val();
   	});
	
	$("#idDownload").on("click", function(event) {
			//alert(fileFormat);
		  // window.location=ClientServiceUrl+"clientRecord/"+fileFormat+"/downloadClientTemplate";
			//idImportClientRecordForm
		
		$.ajax({
	        type: "GET",
	        enctype: 'multipart/form-data',
	        url: ClientServiceUrl+"clientRecord/"+fileFormat+"/downloadClientTemplate",
	        contentType: false,
	        cache: false,
	        timeout: 6000,
	        beforeSend: function (xhr){ 
	    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	        },
	        success: function (data) {
	        	
	        	/*$('#idImportClientRecordForm').prop('action', ClientServiceUrl+"clientRecord/"+fileFormat+"/downloadClientTemplate");
	    		$('#idImportClientRecordForm').prop('method', 'GET');
	    		$('#idImportClientRecordForm').submit();*/
	    		
	        	if (fileFormat == "excel") {
	        		fname = "ImportClientRecordsTemplate.xls"; 
	        	} else if (fileFormat == "csv") {
	        		fname = "ImportClientRecordsTemplate.csv"; 
	        	}
				var downloadURL = ClientServiceUrl+'clientRecord/'+fileFormat+'/downloadClientTemplate';
			
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
		        	if(jqXHR.status == 401){
		            	//msg = 'You are not authorized to access this data.';
		            	bootbox.alert({
		            	    message: "You are not authenticated",
		            	    callback: function () {
		                	  window.location = "../index.html";
		                		
		            	    }
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
		
		//$('#tableID').tableExport({type:'excel',escape:'false'});
	});

	$("#idUpload").on("click", function(event) {
		loadLoader();
		console.log("Uploading client records .... ");
		var form = $("#idImportClientRecordForm")[0];
		if(validForUpload(form)){
			var data = new FormData(form);
			data.append("advisorUserId",$("#advisorUserId").val());
			data.append("loggedUserID", id);
			$.ajax({
		        type: "POST",
		        enctype: 'multipart/form-data',
		        url: ClientServiceUrl+'clientRecord/uploadClientsByUsers',
		        data: data,
		        processData: false, //prevent jQuery from automatically transforming the data into a query string
		        contentType: false,
		        cache: false,
		        beforeSend: function (xhr){ 
		    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		        },
		        success: function (data) {
		        	if(data.errors.length > 0){
		        		 hideLoader();
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
		        	            	//var href = ClientServiceUrl+"clientImport/"+data.errors.join("\r\n")+"/downloadErrorLog";
		        	 			    //window.location=href;
		        	 			    console.log("result is true");
		        	 			    
		        	 			    var fname = "ImportClientRecordsErrorLog.xls"; 
		        					var downloadURL = ClientServiceUrl+"clientImport/"+data.errors.join("\r\n")+"/downloadErrorLog";
		        				
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
		        		         $("#idBusiness").load("resources/errorPage.html");
		        	        }
		        	    });
		        		
		        		
		        	} else {
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
			        	if(jqXHR.status == 401){
			            	//msg = 'You are not authorized to access this data.';
			            	bootbox.alert({
			            	    message: "You are not authenticated",
			            	    callback: function () {
			                	  window.location = "../index.html";
			                		
			            	    }
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
			        hideLoader();
		        }
		    });
		}
        hideLoader();
	});
	
	$('#idUserCR').change(function(){
			var selectedUserId = $(this).val();
			var userRole;
			var userLocation;
			console.log("UserList : " + userList);
			$.each(userList, function (index, user) {
				if(parseInt(user.id) === parseInt(selectedUserId)){
					$('#idRoleCR').val(user.userRole);
					$('#idLocationCR').val(user.userLocation);
				}
			});
	});	

});

function populateUserCombo(id) {
	var userDrop = $('#idUserCR');
	getClientData("GET", "", "getAllUsersForClientContact/" + id, onGetExistingUserSuccess);
	function onGetExistingUserSuccess(data) {
		userList= data;
		console.log("UserList : " + userList);
		userDrop.find('option').remove();
		userDrop.append('<option value="">Select User </option>');
		$.each(data, function (index, item) {
			userDrop.append('<option value="' + item.id  + '">' + item.userName + '</option>');

		});
	}
}


function validForUpload(form){
	
	var ret;
	
	if ($('#idUserCR').val() == "" && $('#idSelectedFile').val() != "") {
		bootbox.alert("Please select an user!");
		ret=false;
	}
	
	if ($('#idSelectedFile').val() == "" && $('#idUserCR').val() != "") {
		bootbox.alert("Please browse and select file to upload");
		ret=false;
	}
	
	if ($('#idUserCR').val() != "" && $('#idSelectedFile').val() != "") {
		ret=true;
	} else {
		if ($('#idUserCR').val() == "" && $('#idSelectedFile').val() == "") {
			bootbox.alert("Please enter an user and browse to select file to upload.");
			ret=false;
		}
	}
		
	return ret;
}
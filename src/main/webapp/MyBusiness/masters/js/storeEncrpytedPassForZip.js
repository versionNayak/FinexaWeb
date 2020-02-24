
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

$(document).ready(function() {
	
	$("#idSave").on("click", function(event) {
		showLoaderOnSave("#idSave");
		window.setTimeout(function(){
			var formData = $('#storeEncyptedPasswordForm').serializeToJSON();
			formData["id"] = loggedUser.id;	
			var data = JSON.stringify(formData);
			
			console.log(data);
			
			$.ajax({
		        type: "POST",
		        url: ClientServiceUrl+'storePassword',
		        dataType: "json",
		        contentType: "application/json; charset=utf-8",
		        data: data,
		        beforeSend: function (xhr) { 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
		        success: function (data) {
		        	bootbox.alert("Password Set!");
		        	hideLoaderOnSave("#idSave");
		        	
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
			         
			        $("#idBuinessMasters").load("resources/errorPage.html");
		        }
		    });
			
			//saveData("POST", data, "storePassword", onStoreSuccess)
		}, 3000);
	});
	
});
var ClientServiceUrl = serviceIP + "/clientservice/";
function getMFData(method, jsondata, path, callbackSuccess) {
	
	if (method == "GET") {
		$.ajax({
			async: true,
			url: ClientServiceUrl + path,
			method: method,
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			contentType: "application/json; charset=utf-8",
			success: callbackSuccess,
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
		        } 
		        else if (jqXHR.status == 403) {
		            msg = 'you don’t have permission to access ‘/’ on this server.';
		        }else if (jqXHR.status == 404) {
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
		         
		        $("#idBackOffice").load("resources/errorPage.html");
		    }
		});
		

	} else {
		
		$.ajax({
			async: true,
			url: ClientServiceUrl + path,
			method: method,
			data: jsondata,
			dataType: 'json',
			beforeSend: function (xhr){ 
		      xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		   },
		    contentType: "application/json; charset=utf-8",
			success: callbackSuccess,
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
		        } 
		        else if (jqXHR.status == 403) {
		            msg = 'you don’t have permission to access ‘/’ on this server.';
		        }
		        else if (jqXHR.status == 404) {
		            msg = 'Requested service url not found.';
		        } else if (jqXHR.status == 405) {
		        	msg = 'Could not connect to the server, please contact System Administrator.\n';
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
		       
		        $("#idBackOffice").load("resources/errorPage.html");
			}
		});
	}
}

function deleteSelectedMFRecord(URL) { 
	var session = sessionStorage.getItem("session");
	var deleteStatus;
	console.log("Inside Delete Selected Client: " + URL);
    $.ajax({
		type : 'GET',
		async : false,
		url : URL,
		dataType : 'json',
		beforeSend: function (xhr){ 
	        xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			deleteStatus = "success";
        },
		error : function(jqXHR, exception) {
			deleteStatus = "error";
			var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Could not connect to the server, please contact System Administrator.';
	        }else if(jqXHR.status == 400){
	        	msg = 'There is some problem in the server, please contact System Administrator.\n';
	        }else if (jqXHR.status == 403) {
	            msg = 'you don’t have permission to access ‘/’ on this server.';
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
	            msg = 'Requested service url not found.]';
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
	        
	        $("#idBackOffice").load("resources/errorPage.html");
		}
	});
    return deleteStatus;
}

function populateForm($form, data) {
	// console.log("PopulateForm, All form data: " + JSON.stringify(data));

	$.each(data, function (key, value) // all json fields ordered by name
	{
		// console.log("Data Element: " + key + " value: " + value );
		var $ctrls = $form.find('[name=' + key + ']'); // all form elements for
		// a name. Multiple
		// checkboxes can have
		// the same name, but
		// different values

		// console.log("Number found elements: " + $ctrls.length );

		if ($ctrls.is('select')) // special form types
		{
			$('option', $ctrls).each(function () {
				if (this.value == value)
					this.selected = true;
			});
		} else if ($ctrls.is('textarea')) {
			$ctrls.val(value);
		} else {
			switch ($ctrls.attr("type")) // input type
			{
				case "text":
				case "hidden":
					$ctrls.val(value);
					break;
				case "radio":
					if ($ctrls.length >= 1) {
						// console.log("$ctrls.length: " + $ctrls.length + "
						// value.length: " + value.length);
						$.each($ctrls, function (index) { // every individual
							// element
							var elemValue = $(this).attr("value");
							var elemValueInData = singleVal = value;
							if (elemValue === value) {
								$(this).prop('checked', true);
							} else {
								$(this).prop('checked', false);
							}
						});
					}
					break;
				case "checkbox":
					if ($ctrls.length > 1) {
						// console.log("$ctrls.length: " + $ctrls.length + "
						// value.length: " + value.length);
						$.each($ctrls, function (index) // every individual element
						{
							var elemValue = $(this).attr("value");
							var elemValueInData = undefined;
							var singleVal;
							for (var i = 0; i < value.length; i++) {
								singleVal = value[i];
								console.log("singleVal : " + singleVal
									+ " value[i][1]" + value[i][1]);
								if (singleVal === elemValue) {
									elemValueInData = singleVal
								}
								;
							}

							if (elemValueInData) {
								// console.log("TRUE elemValue: " + elemValue + "
								// value: " + value);
								$(this).prop('checked', true);
								// $(this).prop('value', true);
							} else {
								// console.log("FALSE elemValue: " + elemValue + "
								// value: " + value);
								$(this).prop('checked', false);
								// $(this).prop('value', false);
							}
						});
					} else if ($ctrls.length == 1) {
						$ctrl = $ctrls;
						if (value) {
							$ctrl.prop('checked', true);
						} else {
							$ctrl.prop('checked', false);
						}

					}
					break;
			} // switch input type
		}
	}) // all json fields
} // populate form

function addRowHandlers() {
	$("#addRecord").show();
    $('#editRecord').show();
    $('#deleteRecord').show();
    $("#addRecord").removeClass('btn_Disabled');
    $('#editRecord').removeClass('btn_Disabled');
    $('#deleteRecord').removeClass('btn_Disabled');   
}

function initRowHandlers() {
	$("#addRecord").show();
    $('#editRecord').show();
    $('#deleteRecord').show();
    $("#addRecord").removeClass('btn_Disabled');
    $('#editRecord').addClass('btn_Disabled');
    $('#deleteRecord').addClass('btn_Disabled');   
}
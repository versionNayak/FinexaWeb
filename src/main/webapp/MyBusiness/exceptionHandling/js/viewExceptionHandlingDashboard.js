
$(document).ready(function() {
	
	/*************Finexa Exceptions************/
	$(".viewFinexaExceptions").click(function(){
		
		$("#idExceptionHandling").empty();
		$("#mandatory-field-msg").hide();
		
		$.ajax({
			async: true,
			url: ClientServiceUrl + "finexaExceptionHandlingList",
			method: "GET",
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				if(data.length == 0) {
					var addURL = "exceptionHandling/finexaExceptionHandling.html";
					addPageExceptionHandling(addURL,"Add Finexa Exceptions");
				} else {
					sessionStorage.setItem("FINEXA_EXCEPTIONS_LIST", JSON.stringify(data));
					$("#idExceptionHandling").load("exceptionHandling/viewFinexaExceptionHandling.html");
					$(".dashboardheading").html("");
					$(".dashboardheading").html("View Finexa Exceptions");
				}
			},
			error: function (jqXHR, exception) {
				var msg = '';
		        if (jqXHR.status === 0) {
		            msg = 'Could not connect to the server, please contact System Administrator.';
		        }else if(jqXHR.status == 400){
		        	msg = 'There is some problem in the server, please contact System Administrator.\n';
		        }else if(jqXHR.status == 401){
		        	msg = "Your session has been expired";
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
		        
		        $("#idExceptionHandling").load("resources/errorPage.html");
		    }
		});
				
		$("#headIcon").empty();
		var url = "exceptionHandling/finexaExceptionHandling.html";
        var heading="Add Finexa Exceptions";
        $("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageExceptionHandling(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
		
        url = "exceptionHandling/finexaExceptionHandling.html";
        heading="Edit Finexa Exceptions";
        $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPageExceptionHandling(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
        
        $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='confirmationClickExceptions()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
        
        $("#wrapper").css("height","auto");
		$(".form-section-container").css("height","auto");	
		
		$("#addRecord").removeClass('btn_Disabled');
	    $('#editRecord').addClass('btn_Disabled');
	    $('#deleteRecord').addClass('btn_Disabled');
	    
        
	});
	
});
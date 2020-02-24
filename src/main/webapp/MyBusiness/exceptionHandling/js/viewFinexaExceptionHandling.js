initRowHandlers();
var findId;
var ClientServiceUrl = serviceIP + "/clientservice/";
$(document).ready(function () {
	
	$('#idTable').dataTable();
	
	$('th:nth-child(9)').hide();
	$('th:nth-child(10)').hide();
	 
	var data = JSON.parse(sessionStorage.getItem("FINEXA_EXCEPTIONS_LIST"));
	$('#idTable').dataTable().fnDestroy();
	$("#idExceptionList").empty();
	$.each(data, function (index, exceptionList) {
		var subEvent;
		if (exceptionList.functionSubEvent == null) {
			subEvent = " ";
		} else {
			subEvent = exceptionList.functionSubEvent;
		}	
		var subFunction;
		if (exceptionList.subFunctionName == null) {
			subFunction = " ";
		} else {
			subFunction = exceptionList.subFunctionName;
		}
		$("#idExceptionList").append('<tr>' +
				'<td>' + exceptionList.moduleName + '</td>' +
				'<td>' + exceptionList.subModuleName + '</td>' +
				'<td>' + exceptionList.functionName + '</td>' +
				'<td>' + subFunction + '</td>' +
				'<td>' + exceptionList.functionEvent + '</td>' +
				'<td>' + subEvent + '</td>' +
				'<td>' + exceptionList.errorCode + '</td>' +
				'<td>' + exceptionList.errorMessage + '</td>' +
				'<td class="hidden"><input type="text" id="idException" name="id"  value=' + exceptionList.id + ' readonly="readonly"></td>' +
				'<td class="hidden"><input type="text" id="idSMID" name="subModuleID"  value=' + exceptionList.subModuleID + ' readonly="readonly"></td>' +
		'</tr>');
	});
	
	$('#idTable').dataTable(
			{
				
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				"pagingType": "full_numbers"
				
			}
	);
	
	$('#idTable_paginate').css('margin-left',-100);
	
	$("#idExceptionList").on("click","tr",function(e){
		
		addRowHandlers();
		findId = $(this).find("#idException").val();
		console.log("id of Exception: "+ findId);
		
		sessionStorage.removeItem("SELECTED_EXCEPTION_ID");
		sessionStorage.setItem("SELECTED_EXCEPTION_ID",findId);
		
		var subModuleId = $(this).find("#idSMID").val();
		sessionStorage.removeItem("SELECTED_SMID");
		sessionStorage.setItem("SELECTED_SMID",subModuleId);
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected");  
		
	});
	
});

function confirmationClickExceptions(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord(ClientServiceUrl+"finexaExceptionDelete/"+ sessionStorage.getItem("SELECTED_EXCEPTION_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"finexaExceptionHandlingList",
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(afterDeleteddata) {
			if(afterDeleteddata.length==0) {
				var addURL = "exceptionHandling/finexaExceptionHandling.html";
				addPageExceptionHandling(addURL,"Add Finexa Exceptions");
			}
			
			$('#idTable').dataTable().fnDestroy();
			$("#idExceptionList").empty();
			$.each(afterDeleteddata, function (index, updatedExceptionList) {
				var subEvent;
				if (updatedExceptionList.functionSubEvent == null) {
					subEvent = " ";
				} else {
					subEvent = updatedExceptionList.functionSubEvent;
				}	
				var subFunction;
				if (updatedExceptionList.subFunctionName == null) {
					subFunction = " ";
				} else {
					subFunction = updatedExceptionList.subFunctionName;
				}
				$("#idExceptionList").append('<tr>' +
						'<td>' + updatedExceptionList.moduleName + '</td>' +
						'<td>' + updatedExceptionList.subModuleName + '</td>' +
						'<td>' + updatedExceptionList.functionName + '</td>' +
						'<td>' + subFunction + '</td>' +
						'<td>' + updatedExceptionList.functionEvent + '</td>' +
						'<td>' + subEvent + '</td>' +
						'<td>' + updatedExceptionList.errorCode + '</td>' +
						'<td>' + updatedExceptionList.errorMessage + '</td>' +
						'<td class="hidden"><input type="text" id="idException" name="id"  value=' + updatedExceptionList.id + ' readonly="readonly"></td>' +
						'<td class="hidden"><input type="text" id="idSMID" name="subModuleID"  value=' + updatedExceptionList.subModuleID + ' readonly="readonly"></td>' +
				'</tr>');
			});
			
			$('#idTable').dataTable(
					{
						
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						"pagingType": "full_numbers"
						
					}
			);
			
			$('#idTable_paginate').css('margin-left',-100);
		},
		error: function(jqXHR, exception) {
			var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Could not connect to the server, please contact System Administrator.';
	        }else if(jqXHR.status == 400){
	        	msg = 'There is some problem in the server, please contact System Administrator.\n';
	        }else if(jqXHR.status == 401){
	        	bootbox.alert({
	        	    message: "You are not authenticated",
	        	    callback: function () {
		        	  window.location = "../../index.html";
	        	    }
	        	});
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
}
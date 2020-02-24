var pageMode = sessionStorage.getItem("PAGE_MODE");
var id = sessionStorage.getItem("SELECTED_EXCEPTION_ID");
var smid = sessionStorage.getItem("SELECTED_SMID");
var selectedSubModuleID;
$(document).ready(function () {
	
	getModuleNameList();
	
	$('#idMName').on('change', function(){
		selectedModuleName = $(this).val();
		//alert("selectedModuleName: " + selectedModuleName);
		getSubModuleFromModule(selectedModuleName);
   	});
	
	$('#idSMName').on('change', function(){
		selectedSubModuleID = $(this).val();
		//alert("selectedSubModuleID: " + selectedSubModuleID);
		getFunctionFromSubmodule(selectedSubModuleID);
	});
	
	$('#idFunctionName').on('change', function(){
		selectedFunctionName = $(this).val();
		//alert("selectedFunctionName: " + selectedFunctionName);
		getSubFunctionFromFunction(selectedFunctionName);
	});
	
	$('#idSubFunctionName').on('change', function(){
		selectedSubFunctionName = $(this).val();
		//alert("selectedSubFunctionName: " + selectedSubFunctionName);
		getFunctionEventFromSubFunction(selectedSubFunctionName);
	});
	
	
	$('#idFunctionEvent').on('change', function(){
		selectedFunctionEvent = $(this).val();
		//alert("selectedFunctionEvent: " + selectedFunctionEvent);
		getFunctionSubEventFromEvent(selectedFunctionEvent);
	});
	
	if(pageMode=="ADD") {
		
	} else {
		if (pageMode=="EDIT") {
			getSelectedException();
		}
	}
	
	$("#idAddExceptions").on("click", function(event) {
		
		var formData = $('#idAddExceptionForm').serializeToJSON();
		
		formData["subModuleID"] = selectedSubModuleID;
		
		if (pageMode=="EDIT") {
			formData["id"] = id;
			formData["subModuleID"] = smid;
		}
		
		var data = JSON.stringify(formData);
		
		saveData("POST", data, "createFinexaExceptionHandling", onAddExceptionSuccess)
		
		function onAddExceptionSuccess() {
			
			getMFData("GET", "" , "finexaExceptionHandlingList", onSuccess);
			function onSuccess(data) {
				sessionStorage.setItem("FINEXA_EXCEPTIONS_LIST", JSON.stringify(data));
				$("#idExceptionHandling").load("exceptionHandling/viewFinexaExceptionHandling.html");
				$(".dashboardheading").html("");
				$(".dashboardheading").html("View Finexa Exceptions");
				$("#addRecord").removeClass('btn_Disabled');
				$('#editRecord').addClass('btn_Disabled');
				$('#deleteRecord').addClass('btn_Disabled');
			}
			
		}
		
	});
	
});

function getSelectedException() {
	
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"finexaExceptionHandling?id=" + id,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			console.log(data);
			populateForm($('#idAddExceptionForm'), data);
			
			setSubModuleName(data.moduleName, data.subModuleID);
			setFunctionFromSubmodule(data.subModuleID, data.functionName);
			setSubFunctionFromFunction(data.functionName, data.subFunctionName);
			setFunctionEventFromSubFunction(data.subFunctionName, data.functionEvent);
			
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
	
	function setSubModuleName(pModuleName, pSubModuleId) {
		
		serviceurl = "subModuleFromModule?moduleName=" + pModuleName;
		getClientDataAsyncFalse("GET","",serviceurl,subModuleFromModuleSuccess);
		
		function subModuleFromModuleSuccess(data){
		//	console.log(data);
			smnDrop = $("#idSMName");
			smnDrop.find('option').remove();
			smnDrop.append('<option value="0">Sub Module Name</option>');
			$.each(data, function (index, item) {
				smnDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			});
			$("#idSMName option").filter(function() {
				return this.value==pSubModuleId;			    
			}).prop('selected', true); 
		} 	
	}
	
	function setFunctionFromSubmodule(pSubModuleId, pFunctionName) {
		serviceurl = "functionFromSubmodule?subModuleID=" + pSubModuleId;
		getClientDataAsyncFalse("GET","",serviceurl,functionFromSubmoduleSuccess);
		
		function functionFromSubmoduleSuccess(data) {
			fnDrop = $("#idFunctionName");
			fnDrop.find('option').remove();
			fnDrop.append('<option value="0">Function In SubModule</option>');
			$.each(data, function (index, item) {
				fnDrop.append('<option value="' + item + '">' + item + '</option>');
			});
			$("#idFunctionName option").filter(function() {
				return this.value==pFunctionName;			    
			}).prop('selected', true);
		}
		
	}
	
	function setSubFunctionFromFunction(pFunctionName, pSubFunctionName) {
		serviceurl = "subFunctionFromFunction?function=" + pFunctionName;
		getClientDataAsyncFalse("GET","",serviceurl,subFunctionFromFunctionSuccess);
		
		function subFunctionFromFunctionSuccess(data) {
			if (data != "") {
				sfDrop = $("#idSubFunctionName");
				sfDrop.find('option').remove();
				sfDrop.append('<option value="0">Sub Function In SubModule</option>');
				$.each(data, function (index, item) {
					sfDrop.append('<option value="' + item + '">' + item + '</option>');
				});
				$("#idSubFunctionName option").filter(function() {
					return this.value==pSubFunctionName;			    
				}).prop('selected', true);
			} else {
				bootbox.alert("No Sub Function for this Function!");
				sfDrop = $("#idSubFunctionName");
				sfDrop.find('option').remove();
				sfDrop.append('<option value="0">Sub Function In SubModule</option>');
			}
		}
	}
	
	function setFunctionEventFromSubFunction(pSubFunctionName, pFunctionEventName) {
		serviceurl = "eventFromSubFunction?subFunction=" + pSubFunctionName;
		getClientDataAsyncFalse("GET","",serviceurl,functionEventFromSubFunctionSuccess);
		
		function functionEventFromSubFunctionSuccess(data) {
			feDrop = $("#idFunctionEvent");
			feDrop.find('option').remove();
			feDrop.append('<option value="0">Function Event In SubModule</option>');
			$.each(data, function (index, item) {
				feDrop.append('<option value="' + item + '">' + item + '</option>');
			});
			
			$("#idFunctionEvent option").filter(function() {
				return this.value==pFunctionEventName;			    
			}).prop('selected', true);
			
		}
	}
	
	function setFunctionSubEventFromEvent(pFunctionEventName, pSubEventName) {
		serviceurl = "subEventFromEvent?event=" + pFunctionEventName;
		getClientDataAsyncFalse("GET","",serviceurl,functionSubEventFromEventSuccess);
		
		function functionSubEventFromEventSuccess(data) {
			if (data != "") {
				fseDrop = $("#idFunctionSubEvent");
				fseDrop.find('option').remove();
				fseDrop.append('<option value="0">Function Sub Event In SubModule</option>');
				$.each(data, function (index, item) {
					fseDrop.append('<option value="' + item + '">' + item + '</option>');
				});
				
				$("#idFunctionSubEvent option").filter(function() {
					return this.value==pSubEventName;			    
				}).prop('selected', true);
				
			} else {
				bootbox.alert("No Sub Event for this Event!");
				fseDrop = $("#idFunctionSubEvent");
				fseDrop.find('option').remove();
				fseDrop.append('<option value="0">Function Sub Event In SubModule</option>');
			}
		}
	}
	
}

function getModuleNameList() {
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"finexaModuleList",
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			mnDrop = $("#idMName");
			mnDrop.find('option').remove();
			mnDrop.append('<option value="0">Module Name</option>');
			$.each(data, function (index, item) {
				mnDrop.append('<option value="' + item + '">' + item + '</option>');
			});
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
}

function getSubModuleFromModule(selectedModuleName) {
	serviceurl = "subModuleFromModule?moduleName=" + selectedModuleName;
	getClientDataAsyncFalse("GET","",serviceurl,subModuleFromModuleSuccess);
	
	function subModuleFromModuleSuccess(data){
	//	console.log(data);
		smnDrop = $("#idSMName");
		smnDrop.find('option').remove();
		smnDrop.append('<option value="0">Sub Module Name</option>');
		$.each(data, function (index, item) {
			smnDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});
		
	} 	
}

function getFunctionFromSubmodule(selectedSubModuleID) {
	serviceurl = "functionFromSubmodule?subModuleID=" + selectedSubModuleID;
	getClientDataAsyncFalse("GET","",serviceurl,functionFromSubmoduleSuccess);
	
	function functionFromSubmoduleSuccess(data) {
		fnDrop = $("#idFunctionName");
		fnDrop.find('option').remove();
		fnDrop.append('<option value="0">Function In SubModule</option>');
		$.each(data, function (index, item) {
			fnDrop.append('<option value="' + item + '">' + item + '</option>');
		});
	}
	
}

function getFunctionEventFromSubFunction(selectedSubFunctionName) {
	serviceurl = "eventFromSubFunction?subFunction=" + selectedSubFunctionName;
	getClientDataAsyncFalse("GET","",serviceurl,functionEventFromSubFunctionSuccess);
	
	function functionEventFromSubFunctionSuccess(data) {
		feDrop = $("#idFunctionEvent");
		feDrop.find('option').remove();
		feDrop.append('<option value="0">Function Event In SubModule</option>');
		$.each(data, function (index, item) {
			feDrop.append('<option value="' + item + '">' + item + '</option>');
		});
	}
}

function getFunctionSubEventFromEvent(selectedFunctionEvent) {
	serviceurl = "subEventFromEvent?event=" + selectedFunctionEvent;
	getClientDataAsyncFalse("GET","",serviceurl,functionSubEventFromEventSuccess);
	
	function functionSubEventFromEventSuccess(data) {
		if (data != "") {
			fseDrop = $("#idFunctionSubEvent");
			fseDrop.find('option').remove();
			fseDrop.append('<option value="0">Function Sub Event In SubModule</option>');
			$.each(data, function (index, item) {
				fseDrop.append('<option value="' + item + '">' + item + '</option>');
			});
		} else {
			bootbox.alert("No Sub Event for this Event!");
			fseDrop = $("#idFunctionSubEvent");
			fseDrop.find('option').remove();
			fseDrop.append('<option value="0">Function Sub Event In SubModule</option>');
		}
	}
}

function getSubFunctionFromFunction(selectedFunctionName) {
	serviceurl = "subFunctionFromFunction?function=" + selectedFunctionName;
	getClientDataAsyncFalse("GET","",serviceurl,subFunctionFromFunctionSuccess);
	
	function subFunctionFromFunctionSuccess(data) {
		if (data != "") {
			sfDrop = $("#idSubFunctionName");
			sfDrop.find('option').remove();
			sfDrop.append('<option value="0">Sub Function In SubModule</option>');
			$.each(data, function (index, item) {
				sfDrop.append('<option value="' + item + '">' + item + '</option>');
			});
		} else {
			bootbox.alert("No Sub Function for this Function!");
			sfDrop = $("#idSubFunctionName");
			sfDrop.find('option').remove();
			sfDrop.append('<option value="0">Sub Function In SubModule</option>');
		}
	}
	
}
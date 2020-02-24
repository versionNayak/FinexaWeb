var selectedDocType = -1;
var selectedClientUCC;
$(document).ready(function() {
	var transactMode = sessionStorage.getItem("TRANSACT_NAV_MODE");
	if (transactMode == "SIDEBAR") {
		$("#idDivUCCText").hide();
		$("#idDivUCCCombo").show();
		var serviceurl = "clientTransact/"+selectedClientId;
	    getClientData("GET", "" , serviceurl, onSuccess);
	    function onSuccess(data) {
	    	if (data.length == 0) {
	    		
	    		 bootbox.confirm({
					  title: "No Client Code Present",
				    	message: "Please create Client Code to Proceed further",
					    	callback: function (result) {
					    		if (result === true) {
					    			$("#idInvest").empty();
					    			$(".dashboardheading").html("Create UCC");
					    			$("#idInvest").load("invest/addCreateUCC.html");
					    		}
		    	 				else{
		    	 					$(".dashboardheading").html("View UCC");
		    	 			    	$("#idInvest").load("invest/viewUCCDetails.html");
	    	 				}	
	    	 				}	
	            		});
	    	} else {
	    		holdingDrop = $("#idClientUCCCombo");
				holdingDrop.find('option').remove();
				holdingDrop.append('<option value="">Select UCC</option>');
				$.each(data, function (index, value) {
					holdingDrop.append('<option value="' + value.clientCode + '" name = "' + value.clientAppName1 + '">' + value.clientCode + '</option>');
				});
	    	}
	    }
		
	} else {
		$("#idDivUCCText").show();
		$("#idDivUCCCombo").hide();
	}
});	

$('#idDocType').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idDocType");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedDocType = selectedValue;
	//alert(selectedDocType);
	if (selectedClientUCC != null && selectedClientUCC != "") {
		if(selectedValue == 1) {
			$("#idMandateType").prop( "disabled", true );
		} else {
			$("#idMandateType").prop( "disabled", false );
			var serviceUrl = "getMandateId/" + selectedClientUCC + "/X";
			getClientData("GET", "", serviceUrl, onSuccess);
			function onSuccess(data) {
				holdingDrop = $("#idMandateType");
				holdingDrop.find('option').remove();
				holdingDrop.append('<option value="">Select Id</option>');
				$.each(data, function (index, value) {
					holdingDrop.append('<option value="' + value + '">' + value + '</option>');
				});
			}
		}
	}
	
});

$('#idClientUCCCombo').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idClientUCCCombo");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedClientUCC = selectedValue;
	if(selectedDocType == 1) {
		$("#idMandateType").prop( "disabled", true );
	} else if (selectedDocType == 2){
		$("#idMandateType").prop( "disabled", false );
		var serviceUrl = "getMandateId/" + selectedClientUCC + "/X";
		getClientData("GET", "", serviceUrl, onSuccess);
		function onSuccess(data) {
			holdingDrop = $("#idMandateType");
			holdingDrop.find('option').remove();
			holdingDrop.append('<option value="">Select Id</option>');
			$.each(data, function (index, value) {
				holdingDrop.append('<option value="' + value + '">' + value + '</option>');
			});
		}
	}
});

$("#idAOF").click(function(){
	var clientCode = $("#idClientUCCCombo").val();
	var docType = $("#idDocType").val();

	var mandateId = $("#idMandateType").val();
	if (mandateId == null || mandateId == "") {
		mandateId = 0;
	}
	// for AOF
	var url = serviceIP + "/clientservice/" + 'editPDF?clientCode='+clientCode+'&docType='+docType+'&mandateId='+mandateId;
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
        success: function (data) {
        	var a = document.createElement("a");
        	document.body.appendChild(a);
        	a.style = "display: none";
        	var fileName = "AOFreport.pdf";
        	if (docType == 2) {
        		fileName = "NachReport.pdf";
        	}
        	var xhr = new XMLHttpRequest();
        	xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadAOFForm?clientCode='+clientCode+'&docType='+docType, true);
        	xhr.responseType = "blob";
        	xhr.onload = function() {
        		var url = window.URL.createObjectURL(xhr.response);  
        		a.href = url;
        		a.download = fileName;
        		a.click();
        		window.URL.revokeObjectURL(url);
        	};
        	xhr.send();  
        	
        },
        error : function(jqXHR, errMsg) {
        	 
   	     if(jqXHR.status == 401){
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
   	    bootbox.alert(errMsg);
        }

        /*failure: function(errMsg) {
            bootbox.alert(errMsg);
        }*/
    });

});


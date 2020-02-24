
var guardianID;
var mode = sessionStorage.getItem("PAGE_MODE");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function() {
	if(loggedClient != null && loggedClient.role === "Client"){
		if(loggedClient.clientInfoAddEdit === "Y"){
			$("#idGuardianSubmit").show();
			$("#undo").show();
		}else if(loggedClient.clientInfoView === "Y"){
			$("#idGuardianSubmit").hide();
			$("#undo").hide();
		}
	}else if(loggedUser != null && loggedUser.role === "Admin"){
		$("#idGuardianSubmit").hide();
		$("#undo").hide();
	}else{
		if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
			$("#idGuardianSubmit").show();
			$("#undo").show();
		}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
			$("#idGuardianSubmit").hide();
			$("#undo").hide();
		}
	}
	 $("#idGFirstName").focus();	
	// calendar
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$("#idGBdate").datepicker({
		format : "dd/mm/yyyy",
		todayHighlight : true,
		todayBtn : true,
		autoclose : true,
		endDate : new Date()
	});
	$(".datepicker-icon").on("click", function() {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	
	console.log("mode "+mode);
	loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	//var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID")
	
	populateResidentTypeDrop($("#idGResType"));
	populateCountryDrop($("#idGCountry"));
	
	
	   //  console.log("selectedClientId "+selectedClientId);
	     if(mode=="EDIT"){
	    	 getSelectedGurdian();
       }
	     $('#focusguard-2').on('focus', function() {
				// "last" focus guard got focus: set focus to the first field
				$("#idGFirstName").focus();
				$(window).scrollTop(0);
			});     
});
	             $("#idGuardianSubmit").on("click", function(event) {
		
					var validate;
					
					validate = validateGuardian($('#guardian_form'));
				    console.log(validate);
					if(validate)
					{
						showLoaderOnSave("#idGuardianSubmit");
						window.setTimeout(function(){
					//	alert ("Validation successful");
						event.preventDefault();
						var formData = $('#guardian_form').serializeToJSON();
					//	formData["userId"] = loggedUser.id;
						formData["countryOfResidence"] =  $("#idGCountry").val();
						var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		 				formData["clientID"] = selectedClientId;
		 				
						
						
				
						 var mode = sessionStorage.getItem("PAGE_MODE");
						 console.log("mode "+mode);
				 			if (mode=="EDIT"){
				 				//alert("jjj "+guardianID);
				 				formData["id"] = guardianID;
				 				console.log("Before Post3: ");
				 				data = JSON.stringify(formData);
				 		//		alert(data);
				 				console.log(data);
				 				console.log("Before Post4: ");
				 				
				 			//	getClientDataWithErrorHandling("POST", data, "ClientGuardianInfo", onSuccess,onError);
				 				saveData("POST", data, "ClientGuardianInfo", onSuccess);
				 				function onSuccess(data) {
				 					hideLoaderOnSave("#idGuardianSubmit");
				 					console.log("After Post: " + data);
				 					sessionStorage.setItem("SELECTED_CLIENT_ID", data.clientID);
				 					sessionStorage.setItem("PAGE_MODE", "EDIT");
					 				sessionStorage.setItem("GUARDIAN_PERSONAL_INFO", data);
				 					editPage("clientInfo/addClient.html","Edit Client Personal Info ");
				 				}
				 				/*function onError(err){
				 				    $("#alertform").text("Error saving guardian information. Please try after sometime or contact system administrator.");
				 					$(window).scrollTop(0);
				 					hideLoaderOnSave("#idGuardianSubmit");
				 				}*/
				 			}
				 			else{
				 				var data = JSON.stringify(formData);
						//		alert(data);
								console.log(data);
								
				 				sessionStorage.setItem("PAGE_MODE", "ADD");
				 				console.log("addEditclientID "+sessionStorage.getItem("SELECTED_CLIENT_ID"));
				 				
				 				if(sessionStorage.getItem("SELECTED_CLIENT_ID")>0){
				 				sessionStorage.setItem("PAGE_MODE_ADDEDIT", "ADDEDIT");
				 				}
				 				console.log("in guardian page"+data);
				 				sessionStorage.setItem("GUARDIAN_PERSONAL_INFO", data);
				 				hideLoaderOnSave("#idGuardianSubmit");
								addPage("clientInfo/addGuardianContactDetails.html","Add Guardian Contact Info ");
				 			
						
					}
					}, 5000);	
				  }	
                 
				
});
function undoChange(){
	updateUNDO();
	
   if(mode=="ADD"){
	   $(".form-control").val("");
	   $("#idGGenderM").prop("checked", true);
	   $("#idGGenderF").prop("checked", false);
	   $("#idGOtherResidentType").prop("disabled", true);
	   $("#idGCountry").prop("disabled", false);
   } else {
	   if(mode=="EDIT"){
		   getSelectedGurdian();
		}
   }
}

function updateUNDO(){
	var lFirstName = document.getElementById("idGFirstName");
	var lMiddleName = document.getElementById("idGMiddleName");
	var lLastName = document.getElementById("idGLastName");
	var lGender = document.getElementsByName("gGender");
	var lPan = document.getElementById("idGPan");
	var lResidentType = document.getElementById("idGResType");
	var lOtherResidentType=document.getElementById("idGOtherResidentType");
	var lIdBdate = document.getElementById("idGBdate");
	var lIdCalendar = document.getElementById("idGDobCalendar");
	var lidCountry=document.getElementById("idGCountry");
	var lAadharExists = document.getElementById("idAadharExists");
	var lAadhar = document.getElementById("idGAadhar");
	var lPanExists = document.getElementById("idPanExists");
	var lAadharExists = document.getElementById("idAadharExists");
	var lGenderGroup = document.getElementById("idGGenderRadioGroup");


	lFirstName.style.border = "1px solid #ccc";
    lMiddleName.style.border = "1px solid #ccc";
    lLastName.style.border = "1px solid #ccc";
    document.getElementById("idGGender").style.border = "none";
	lGenderGroup.style.border = "1px solid #ccc";	
	lPan.style.border = "1px solid #ccc";
	lResidentType.style.border = "1px solid #ccc";
	lOtherResidentType.style.border = "1px solid #ccc";
	lIdBdate.style.border = "1px solid #ccc";
	lIdCalendar.style.border = "1px solid #ccc"; 
	lAadhar.style.border = "1px solid #ccc";
	lidCountry.style.border = "1px solid #ccc";

	document.getElementById('alertfname').innerHTML="";
	document.getElementById('alertmname').innerHTML="";
	document.getElementById('alertlname').innerHTML="";
	document.getElementById('alertgender').innerHTML="";
	document.getElementById('alertpan').innerHTML="";
	document.getElementById('alertrestype').innerHTML="";
	document.getElementById('alertbdate').innerHTML="";
	document.getElementById('alertaadhar').innerHTML="";
	document.getElementById('alertrestype').innerHTML="";
	document.getElementById('alertOtherResidentType').innerHTML="";
	document.getElementById('alertCountry').innerHTML="";
	document.getElementById('alertform').innerHTML="";
}

function getSelectedGurdian(){
    if(selectedClientId!=0 && selectedClientId!=null && selectedClientId!='undefined'){
		var serviceUrl = "ClientGuardianInfo/client/" + selectedClientId;
		getClientData("GET", "", serviceUrl, onSuccess);
		function onSuccess(data) {
			selectedClientId = data.clientID;
			 guardianID=data.id;
			if(guardianID!=0){
				sessionStorage.setItem("PAGE_MODE", "EDIT");
			//	alert("PAGE_MODE "+sessionStorage.getItem("PAGE_MODE"));
			populateForm($("#guardian_form"), data);
			//	alert(data.maritalStatus);
			    
				console.log("dob "+data.birthDate);
			   
			    console.log("res type "+data.residentType);
				$("#idGResType option").filter(function() {
					return this.value==data.residentType;
				    
				}).prop('selected', true);
				
				/*if (data.residentType == 1) {
					data.countryOfResidence == 99;
				}*/
				console.log("country "+data.countryOfResidence);
				$("#idGCountry option").filter(function() {
					return this.value==data.countryOfResidence;
				    
				}).prop('selected', true);
				
				
				
				
				if (data.residentType != 5) {
					$("#idOtherResidentType").attr("disabled", "disabled"); 
				} else {
					if (data.residentType == 5) {
						$("#idOtherResidentType").removeAttr("disabled");
					}
				}
		}

}
}
}
function toggleOtherResidentType()
{
    if (document.getElementById("idGResType").value == 5) {           	
        document.getElementById("idGOtherResidentType").disabled=false;
        document.getElementById("idGCountry").disabled=false;
        document.getElementById("idGCountry").value = 0;
     } else {
    	if (document.getElementById("idGResType").value != 5) {
    		document.getElementById("idGOtherResidentType").value="";
            document.getElementById("idGOtherResidentType").disabled=true;
            if (document.getElementById("idGResType").value == 1){
            	document.getElementById("idGCountry").value = 99;
            	document.getElementById("idGCountry").disabled=true;
            }
            else{
            	if(document.getElementById("idGResType").value != 1) {
            		document.getElementById("idGCountry").disabled=false; 
            		document.getElementById("idGCountry").value = 0;
            	}
            }
        }
    }
}
    	
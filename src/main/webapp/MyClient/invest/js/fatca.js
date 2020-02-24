var countApplicant2 = 0;
var countApplicant3 = 0;
var flagGuardian = 0;

$(document).ready(function() {
	//populateEmploymentTypeDrop($("#idOccupation"));
	//populateResidentTypeDrop($("#idTaxStatus"));
	
	getTaxStatus();
	getOccupationCode();
	getAddressType();
	getCountryNationality();
	getIncomeSlab();
	getSourceOfWealth();
	getIdentificationType();
	
	// hide other tax status
	$("#idDivApplicant2").hide();
	$("#idDivApplicant3").hide();
	$("#idDivApplicant4").hide();
	
	var transactMode = sessionStorage.getItem("TRANSACT_NAV_MODE");
//	alert(transactMode);
	var applicantData = sessionStorage.getItem("APPLICANT_STATUS");
	if (transactMode == "UCC_EDIT") {
		jsonString = JSON.parse(applicantData);
//		alert(jsonString);
	} else if (transactMode == "UCC"){
		jsonString = JSON.parse(applicantData);
//		alert(jsonString);
		
	}
	
	
	if (transactMode == "SIDEBAR") {
		$("#idNavigationTable").hide();
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
//		alert("In else" + jsonString.clientCode);
		if (transactMode == "UCC_EDIT") {
			$("#idNavigationTable").hide();
		} else {
			$("#idNavigationTable").show();
		}
		
		$("#idDivUCCText").show();
		$("#idDivUCCCombo").hide();
		$("#idClientUCCText").val(jsonString.clientCode);
		$("#idApplicantName").val(jsonString.applicantName);
		$("#idPAN").val(jsonString.firstApplicantPan);
		
		if(hasValue(jsonString.secondApplicantPan)){
			$("#idDivApplicant2").show();
		} else {
			$("#idDivApplicant2").hide();
		}
		
		if(hasValue(jsonString.thirdApplicantPan)){
			$("#idDivApplicant3").show();
		} else {
			$("#idDivApplicant3").hide();
		}
		
		if(hasValue(jsonString.guardianPan)){
			$("#idDivApplicant4").show();
		} else  {
			$("#idDivApplicant4").hide();
		}
		
	}
	
});	
$(".datepicker-icon").on("click", function () {
	$(this).closest(".input-group").find("input").trigger("focus");
});
$("#idNetworthDate").datepicker({
	format : "dd/mm/yyyy",
    todayHighlight : false,
    todayBtn : true,
    autoclose : true,
    forceParse: false,
    endDate : new Date()
});
$("#idUBODateOfBirth").datepicker({
	format : "dd/mm/yyyy",
    todayHighlight : false,
    todayBtn : true,
    autoclose : true,
    forceParse: false,
    endDate : new Date()
});

$('#idClientUCCCombo').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idClientUCCCombo");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
//	alert(selectedValue);
	if(selectedValue != "") {
		
		var url = serviceIP + "/clientservice/" + 'getClientByUCC/'+selectedValue;
		$.ajax({
			type: 'GET',
			url: url,
			async: false,
			dataType: 'json',
			beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
	        success: function (data) {
//	        	alert(data.clientAppName1);
	        	$("#idApplicantName").val(data.clientAppName1);
	        	//$("#idApplicantName").prop("disabled",true);
	        	if(((data.clientAppName2) == null) || ((data.clientAppName2) == "")){
	        		$("#idDivApplicant2").hide();
	        		countApplicant2 = 0;
	        	} else {
	        		$("#idDivApplicant2").show();
	        		countApplicant2 = 1;
	        	}
	        	if( ((data.clientAppName3) == null) || ((data.clientAppName3) == "") ){
	        		$("#idDivApplicant3").hide();
	        		countApplicant3 = 0;
	        	} else {
	        		$("#idDivApplicant3").show();
	        		countApplicant3 = 1;
	        	}
	        	if( ((data.clientGuardian) == null) || ((data.clientGuardian) == "") ){
	        		$("#idDivApplicant4").hide();
	        		flagGuardian = 0;
	        	} else {
	        		$("#idDivApplicant4").show();
	        		flagGuardian = 1;
	        	}
	        	$("#idPAN").val(data.clientPan);
	        	//$("#idPAN").prop("disabled",true);
	        	$("#idTaxStatusFatca").val(data.clientTaxStatus);
	        	//$("#idTaxStatusFatca").prop("disabled",true);
	        	$("#idDataSourceFatca").val(data.clientCommMode);
	        	//$("#idDataSourceFatca").prop("disabled",true);
	        	$("#idOccupationFatca").val(data.clientOccupationCode);
	        	//$("#idOccupationFatca").prop("disabled",true);
	        	
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
	    });
		
	} else {       // For selecting the "Select UCC" option in 'Client Id'
		
		$("#idDivApplicant2").hide();
		countApplicant2 = 0;
		$("#idDivApplicant3").hide();
		countApplicant3 = 0;
		$("#idDivApplicant4").hide();
		flagGuardian = 0;
		
		//$("#idApplicantName").prop("disabled",false);
		$("#idApplicantName").val("");
		//$("#idPAN").prop("disabled",false);
		$("#idPAN").val("");
		//$("#idTaxStatusFatca").prop("disabled",false);
		$("#idTaxStatusFatca").val("");
		//$("#idDataSourceFatca").prop("disabled",false);
		$("#idDataSourceFatca").val("");
		
		$("#idAddressType").val("");
		$("#idPlaceOfBirthFatca").val("");
		$("#idCountryOfBirth").val("");
		$("#idCountryOfTaxResidency").val("");
		$("#idTaxPayerIden").val("");
		$("#idIdentificationType").val("");
		
		$("#idCountryOfTaxResidency2").val("");
		$("#idTaxPayerIden2").val("");
		$("#idIdentificationType2").val("");
		
		$("#idCountryOfTaxResidency3").val("");
		$("#idTaxPayerIden3").val("");
		$("#idIdentificationType3").val("");
		
		$("#idCountryOfTaxResidency4").val("");
		$("#idTaxPayerIden4").val("");
		$("#idIdentificationType4").val("");
		
		$("#idSourceOfWealth").val("");
		$("#idIncomeFatca").val("");
		$("#idPoliticallyExposed").val("");
		
		//$("#idOccupationFatca").prop("disabled",false);
		$("#idOccupationFatca").val("");
		
		$("#idOccpTypeFatca").val("");
		$("#idExchangeNameFatca").val("");
		$("#idCorpServiceSector").val("");
		
		
	}
	
	
});

$("#idDivNonIndividual").hide();
function getTaxStatus() {
	getClientData("GET","","AllTransactTaxStatusType",taxTypeSuccess);

	function taxTypeSuccess(data){
		holdingDrop = $("#idTaxStatusFatca");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Tax Status</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.code + '" name="' + item.categoryCode+ '">' + item.taxStatus + '</option>');
		});
	}
}
$('#idTaxStatusFatca').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idTaxStatusFatca");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	var selectedName = $(this).find('option:selected').attr("name");
	if(selectedName == 'R') {
		$("#idDivNonIndividual").hide();
	} else {
		$("#idDivNonIndividual").show();
	}
	/*if (selectedValue == "1") {
		$("#idDivDepositoryName").hide();
		$("#idDividDPID").hide();
		$("#idDivBeneficiaryAcc").hide();
	} else {
		$("#idDivDepositoryName").show();
		$("#idDividDPID").show();
		$("#idDivBeneficiaryAcc").show();
	}*/
});

function getOccupationCode() {
	getClientData("GET","","AllTransactOccupationCode",occTypeSuccess);

	function occTypeSuccess(data){
		holdingDrop = $("#idOccupationFatca");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Occupation Code</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.code + '">' + item.details + '</option>');
		});
	}
}

function getAddressType() {
	getClientData("GET","","AllTransactLastAddressType",taxTypeSuccess);

	function taxTypeSuccess(data){
		holdingDrop = $("#idAddressType");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.code + '">' + item.details + '</option>');
		});
	}
}

function getCountryNationality() {
	getClientData("GET","","AllTransactCountryNationality",taxTypeSuccess);

	function taxTypeSuccess(data){
		holdingDrop = $("#idCountryOfBirth");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select</option>');
		
		countryDrop = $("#idCountryOfTaxResidency");
		countryDrop.find('option').remove();
		countryDrop.append('<option value="">Select</option>');
		
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.countryCode + '">' + item.country + '</option>');
			countryDrop.append('<option value="' + item.countryCode + '">' + item.country + '</option>');
		});
		
		
		//------------  For Country Of Tax Residency 2*  --------------
		
		countryDrop2 = $("#idCountryOfTaxResidency2");
		countryDrop2.find('option').remove();
		countryDrop2.append('<option value="">Select</option>');
		
		$.each(data, function (index, item) {
			countryDrop2.append('<option value="' + item.countryCode + '">' + item.country + '</option>');
		});
		
		//------------  For Country Of Tax Residency 3*  --------------
		
		countryDrop3 = $("#idCountryOfTaxResidency3");
		countryDrop3.find('option').remove();
		countryDrop3.append('<option value="">Select</option>');
		
		$.each(data, function (index, item) {
			countryDrop3.append('<option value="' + item.countryCode + '">' + item.country + '</option>');
		});
		
		//------------  For Country Of Tax Residency 4*  --------------
		
		countryDrop4 = $("#idCountryOfTaxResidency4");
		countryDrop4.find('option').remove();
		countryDrop4.append('<option value="">Select</option>');
		
		$.each(data, function (index, item) {
			countryDrop4.append('<option value="' + item.countryCode + '">' + item.country + '</option>');
		});
		
		
	}
}
function getIncomeSlab() {
	getClientData("GET","","AllTransactIncomeType",occTypeSuccess);

	function occTypeSuccess(data){
		holdingDrop = $("#idIncomeFatca");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Income</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.incomeCode + '">' + item.income + '</option>');
		});
	}
}
function getSourceOfWealth() {
	getClientData("GET","","AllTransactSourceOfWealth",occTypeSuccess);

	function occTypeSuccess(data){
		holdingDrop = $("#idSourceOfWealth");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.sourceCode + '">' + item.source + '</option>');
		});
	}
}
function getIdentificationType() {
	getClientData("GET","","AllTransactIdentificationType",idTypeSuccess);

	function idTypeSuccess(data){
		holdingDrop = $("#idIdentificationType");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.code + '">' + item.details + '</option>');
		});
		
	//--------------  Identification Type 2*  ----------------
		holdingDrop2 = $("#idIdentificationType2");
		holdingDrop2.find('option').remove();
		holdingDrop2.append('<option value="">Select</option>');
		$.each(data, function (index, item) {
			holdingDrop2.append('<option value="' + item.code + '">' + item.details + '</option>');
		});
		
	//--------------  Identification Type 3*  ----------------
		holdingDrop3 = $("#idIdentificationType3");
		holdingDrop3.find('option').remove();
		holdingDrop3.append('<option value="">Select</option>');
		$.each(data, function (index, item) {
			holdingDrop3.append('<option value="' + item.code + '">' + item.details + '</option>');
		});
	
	//--------------  Identification Type 4*  ----------------
		holdingDrop4 = $("#idIdentificationType4");
		holdingDrop4.find('option').remove();
		holdingDrop4.append('<option value="">Select</option>');
		$.each(data, function (index, item) {
			holdingDrop4.append('<option value="' + item.code + '">' + item.details + '</option>');
		});
	
	}
}

function getSelectedClient(){
    selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	console.log("selectedClientId "+selectedClientId);
	var serviceUrl = "clientMaster/" + selectedClientId;
	getClientData("GET", "", serviceUrl, onSuccess);
	
	function onSuccess(data) {
		var clientName=data.firstName + ((data.middleName =="") ? " " : (data.middleName+" ")) + data.lastName; 
		sessionStorage.setItem("APPLICANT_NAME",clientName);
		$("#idApplicantName").val(clientName);
		$("#idApplicantName").text(clientName);
		$("#idbirthDate").val(data.birthDate);
		$("#idBankAccountFatca").val(sessionStorage.getItem("DEFAULT_BANK_ACC_NO"));
	//	$("#idOccupation").val(data.employmentType);
		$("#idPAN").val(data.pan.toUpperCase());
		if(data.employmentType != 0){
			$("#idOccupation").val(data.employmentType);
		}
	}
}


$('#idFatcaSubmit').click(function(e){
	 
	if (validateFatcaForm($('#formFatca'),countApplicant2, countApplicant3, flagGuardian)){
		
		var formData = $('#formFatca').serializeToJSON();
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		formData["clientId"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorId"] = loggedUser.id;
		if (formData["clientCode"] == null) {
			formData["clientCode"] = $("#idClientUCCText").val();
		}
		var data = JSON.stringify(formData);
		saveData("POST", data, "validateAndSaveClientFatca", onFatcaSuccess)
		function onFatcaSuccess(data) {
			bootbox.alert(data.message);
			$('#formFatca')[0].reset();
//			alert(data.status);
			if (data.status) {
				if (sessionStorage.getItem("TRANSACT_NAV_MODE") == "UCC_EDIT") {
					sessionStorage.removeItem("SELECTED_FATCA_STATUS");
		    		sessionStorage.setItem("SELECTED_FATCA_STATUS", "true");
					$("#idInvest").empty();
					$(".dashboardheading").html("Edit UCC");
					$("#idInvest").load("invest/verificationProcessDisabled.html");
				} else {
					$("#idInvest").empty();
					$(".dashboardheading").html("Mandate Registration");
					$("#idInvest").load("invest/isip.html");
				}
			}
			
			
		} 
		
		/*var formData = $('#formFatca').serializeToJSON();
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		formData["clientId"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorId"] = loggedUser.id;
		if (formData["clientCode"] == null) {
			formData["clientCode"] = $("#idClientUCCText").val();
		}
		var data = JSON.stringify(formData);
		saveData("POST", data, "validateAndSaveClientFatca", onFatcaSuccess)
		function onFatcaSuccess(data) {
			bootbox.alert(data.message);
		}
		$("#idInvest").empty();
		$(".dashboardheading").html("ISIP Mandate Registration");
		$("#idInvest").load("invest/isip.html");
		*/
		
		
	}
	
	
});
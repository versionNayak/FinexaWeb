var SINGLE_HOLDER_TYPE = 1;
var JOINT_HOLDER_TYPE = 2;
var SURVIVOR_HOLDER_TYPE = 3;
var clientFlag = 0;
var defBnkDet = "Yes";
var yesCount = 1;
var holding;
var ckycFlag = "Yes";

var applicantData = sessionStorage.getItem("APPLICANT_STATUS");
jsonString = JSON.parse(applicantData);
//alert(applicantData);
$(document).ready(function() {
	
	var pageMode = sessionStorage.getItem("TRANSACT_NAV_MODE");
	getAllDropdown();
	
	alert(sessionStorage.getItem("SELECTED_CLIENT_CODE_EDIT"));
	var serviceUrl = "getClientByUCC/" + sessionStorage.getItem("SELECTED_CLIENT_CODE_EDIT");
	getClientData("GET", "", serviceUrl, onSuccessGetClientUCC);
	
	function onSuccessGetClientUCC(data) {
		
		
//---------------------------------- Start of Client Code Section ----------------------------------	
		
		$("#idClientCode").val(data.clientCode);
		$("#idHolding").val(data.clientHolding);
		holding = data.clientHolding;
		$("#idClientAppli").val(data.clientAppName1);
		$("#idDateOfBirth").val(data.clientDOB);
		if(data.clientGender == 'F'){
			$("#idGender").val("Female");
		}
		else{
			$("#idGender").val("Male");
		}
		$("#idOccupation").val(data.clientOccupationCode);
		$("#idTaxStatus").val(data.clientTaxStatus);
		taxStatusChange();
		
		$("#idfirstAppliPan").val(data.clientPan);
		
		$("#idsecondclientAppli").val(data.clientAppName2);
		$("#idSecondApplicantPAN").val(data.clientPan2);
		
		$("#idThirdclientAppli").val(data.clientAppName3);
		$("#idThirdApplicantPAN").val(data.clientPan3);
		
		$("#idGuardianName").val(data.clientGuardian);
		$("#idGuardianPAN").val(data.clientGuardianPan);
		
		$("#idNomineeName").val(data.clientNominee);
		$("#idNomineeRelation").val(data.clientNomineeRelation);
		
		$("#idDepositoryDetails").val(data.clientType);
		if (data.clientType == "1") {
			$("#idDivDepositoryName").hide();
			$("#idDividDPID").hide();
			$("#idDivBeneficiaryAcc").hide();
			
		} else {
			
			$("#idDepositoryName").val(data.clientDefaultDP);
			$("#idDPID").val(data.clientNSDLDPID);
			$("#idBeneficiaryAccNo").val(data.clientNSDLCLTID);
			
			$("#idDivDepositoryName").show();
			$("#idDividDPID").show();
			$("#idDivBeneficiaryAcc").show();
			
		}
		
		$("#idCommunicationMode").val(data.clientCommMode);
		
//----------------------------------------- End of Client Code -------------------------------------		

//================================== Start of Bank Details Section ==================================
		
		$("#idAcountType").val(data.clientAccType1);
		$("#idBankAccountNumber").val(data.clientAccNo1);
		$("#idIFSCcode").val(data.clientIfscCode1);
		$("#idMICRcode").val(data.clientMicrNo1);
		$("#idWetherDefaultBankAccount").val(data.defaultBankFlag1);
		setBankNameAndBranchName(data.clientIfscCode1);
		
		$("#idAcountType2").val(data.clientAccType2);
		$("#idBankAccountNumber2").val(data.clientAccNo2);
		$("#idIFSCcode2").val(data.clientIfscCode2);
		$("#idBankName2").val(data.clientCommMode);
		$("#idMICRcode2").val(data.clientMicrNo2);
		$("#idWetherDefaultBankAccount2").val(data.defaultBankFlag2);
		
		$("#idAcountType3").val(data.clientAccType3);
		$("#idBankAccountNumber3").val(data.clientAccNo3);
		$("#idIFSCcode3").val(data.clientIfscCode3);
		$("#idBankName3").val(data.clientCommMode);
		$("#idMICRcode3").val(data.clientMicrNo3);
		$("#idWetherDefaultBankAccount3").val(data.defaultBankFlag3);
		
		$("#idAcountType4").val(data.clientAccType4);
		$("#idBankAccountNumber4").val(data.clientAccNo4);
		$("#idIFSCcode4").val(data.clientIfscCode4);
		$("#idBankName4").val(data.clientCommMode);
		$("#idMICRcode4").val(data.clientMicrNo4);
		$("#idWetherDefaultBankAccount4").val(data.defaultBankFlag4);
		
		$("#idAcountType5").val(data.clientAccType5);
		$("#idBankAccountNumber5").val(data.clientAccNo5);
		$("#idIFSCcode5").val(data.clientIfscCode5);
		$("#idBankName5").val(data.clientCommMode);
		$("#idMICRcode5").val(data.clientMicrNo5);
		$("#idWetherDefaultBankAccount5").val(data.defaultBankFlag5);
		
//================================== End of Bank Details Section ==================================
		
//---------------------------------- Start of Contact Details Section ----------------------------------
		
		
		
		
		$("#idAddress").val(data.clientAdd1);
		$("#idAddress2").val(data.clientAdd2);
		$("#idAddress3").val(data.clientAdd3);
		$("#idCity").val(data.clientCity);
		$("#idState").val(data.clientState);
		$("#idCountry").val(data.clientCountry);
		
		$("#idPincode").val(data.clientPincode);
		$("#idMobile").val(data.cmMobile);
		$("#idEmailId").val(data.clientEmail);
		
		// Foreign Address
		$("#idForeignAddress").val(data.cmForAdd1);   // cmForAdd2  cmForAdd3
		$("#idForeignCity").val(data.cmForCity);
		$("#idForeignState").val(data.cmForState);
		$("#idForeignCountry").val(data.cmForCountry);
		$("#idForeignPinCode").val(data.cmForPinCode);
		
		
		var stateCode = data.clientState;
		var serviceUrl = "getStateByCode/" + stateCode;
		getClientData("GET", "", serviceUrl, onSuccessGetStateName);
		function onSuccessGetStateName(data) {
			$("#idState").val(data);
		}
		
//----------------------------------- End of Contact Details Section -----------------------------------
	
	}
	
	getClientCKYCDetails();
	
	/*
	var serviceUrl = "getClientCKYCByUCC/" + sessionStorage.getItem("SELECTED_CLIENT_CODE_EDIT");
	getClientData("GET", "", serviceUrl, onSuccessGetClientCKYCByUCC);
	
	function onSuccessGetClientCKYCByUCC(data) {
		$("#idKYCFirstApplicant").val(data.kYCFirstApplicant);
		$("#idCKYCFirstApplicant").val(data.ckycNumberFirst);
		
		$("#idKYCTypeSecondApplicant").val(data.kYCTypeSecondApplicant);
		$("#idCKYCSecondApplicant").val(data.ckycNumberSecond);
		$("#idSecondAppliDOB").val(data.jointHolderDOB1);
		
		$("#idKYCThirdApplicant").val(data.kYCThirdApplicant);
		$("#idCKYCThirdApplicant").val(data.ckycNumberThird);
		$("#idSecondAppliDOB").val(data.jointHolderDOB2);
		
		$("#idKycTypeGuardian").val(data.kycTypeGuardian);
		$("#idCKYCGuardian").val(data.ckycGuardian);
		$("#idGuardianDOB").val(data.guardianDOB);
		
	}
	*/
	
	function getApplicantGender(clientGender,appliRelID) {
		
		
		switch (appliRelID)
		{
		case 1:
			// For Spouse
			if(clientGender == 'F'){
				return "Male";
			}
			else{
				return "Female";
			}
				 
			break;
		
		case 2:
			// For Son
			return "Male";
			break;
			
		case 3:
			// For Daughter
			return "Female";
			break;
			
		case 4:
			// For Father
			return "Male";
			break;
			
		case 5:
			// For Mother
			return "Female";
			break;
		
		case 6:
			// For Brother
			return "Male";
			break;
		
		case 7:
			// For Sister
			return "Female";
			break;
			
		case 8:
			// For Other
			return "";
			break;
		
		
		}
		
		
	}
	
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	$("#idDateOfBirth").datepicker({
		format : "dd/mm/yyyy",
	    todayHighlight : false,
	    todayBtn : true,
	    autoclose : true,
	    forceParse: false,
	    endDate : new Date()
	});

	$("#idSecondAppliDOB").datepicker({
		format : "dd/mm/yyyy",
	    todayHighlight : false,
	    todayBtn : true,
	    autoclose : true,
	    forceParse: false,
	    endDate : new Date()
	});
	$("#idThirdAppliDOB").datepicker({
		format : "dd/mm/yyyy",
	    todayHighlight : false,
	    todayBtn : true,
	    autoclose : true,
	    forceParse: false,
	    endDate : new Date()
	});
	$("#idGuardianDOB").datepicker({
		format : "dd/mm/yyyy",
	    todayHighlight : false,
	    todayBtn : true,
	    autoclose : true,
	    forceParse: false,
	    endDate : new Date()
	});

});

function getClientCKYCDetails() {
	
	var serviceUrl = "getClientCKYCByUCC/" + sessionStorage.getItem("SELECTED_CLIENT_CODE_EDIT");
	getClientData("GET", "", serviceUrl, onSuccessGetClientCKYCByUCC);
	
	function onSuccessGetClientCKYCByUCC(data) {
		if (data.cKYC == null) {
			$("#idCKYC").val("No");
			ckycFlag = "No";
			$("#idDivCkycApplicantDetails").hide();
		} else {
			ckycFlag = "Yes";
			$("#idKYCFirstApplicant").val(data.kYCFirstApplicant);
			$("#idCKYCFirstApplicant").val(data.ckycNumberFirst);
			
			$("#idKYCTypeSecondApplicant").val(data.kYCTypeSecondApplicant);
			$("#idCKYCSecondApplicant").val(data.ckycNumberSecond);
			$("#idSecondAppliDOB").val(data.jointHolderDOB1);
			
			$("#idKYCThirdApplicant").val(data.kYCThirdApplicant);
			$("#idCKYCThirdApplicant").val(data.ckycNumberThird);
			$("#idThirdAppliDOB").val(data.jointHolderDOB2);
			
			$("#idKycTypeGuardian").val(data.kycTypeGuardian);
			$("#idCKYCGuardian").val(data.ckycGuardian);
			$("#idGuardianDOB").val(data.guardianDOB);
			$("#idDivCkycApplicantDetails").show();
		}
	}
	
}

function setBankNameAndBranchName(ifscCode) {
	
	if(ifscCode != ""){
		var serviceUrl = "getBankDetailsByIFSC/" + ifscCode;
		getClientData("GET", "", serviceUrl, onSuccess);
		function onSuccess(data) {
			if (data.bank == null) {
				bootbox.alert("Invalid IFSC Code");
				$("#idIFSCcode").val("");
				$("#idBankName").val("");
				$("#idMICRcode").val("");
			} else {
				$("#idBankName").val(data.bank);
				$("#idMICRcode").val(data.branch);
			}
		}
	} else{
		$("#idBankName").val("");
		$("#idMICRcode").val("");
	}

}


function getAllDropdown() {
	//populating tax status
	getClientData("GET","","AllTransactTaxStatusType",taxTypeSuccess);

	function taxTypeSuccess(data){
		holdingDrop = $("#idTaxStatus");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Tax Status</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.code + '" name="' + item.categoryCode+ '">' + item.taxStatus + '</option>');
		});
	}
	
	
	//populating Occupation Code
	
	getClientData("GET","","AllTransactOccupationCode",occTypeSuccess);

	function occTypeSuccess(data){
		holdingDrop = $("#idOccupation");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Occupation Code</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.code + '">' + item.details + '</option>');
		});
	}
	
	//populate frequency 
	
	/*function hideOtherApplicants() {
		$("#idDivSecondApplicant").hide();
		$("#idDivThirdApplicant").hide();
		$("#idDivSecondApplicantPan").hide();
		$("#idDivThirdApplicantPan").hide();
		// hide kyc
		$("#idDivKYCTypeSecond").hide();
		$("#idDivCKYCNoSecond").hide();
		$("#idDivKYCTypeThird").hide();
		$("#idDivCKYCNoThird").hide();
		
		$("#idDivThirdDOB").hide();
		$("#idDivSecondDOB").hide();
		
	}*/

	getClientData("GET","","AllTransactHoldingType",holdingTypeSuccess);

	function holdingTypeSuccess(data){
		holdingDrop = $("#idHolding");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Holding Type</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});
	}
	
	// populating state master

	getClientData("GET","","AllTransactStateCode",stateTypeSuccess);

	function stateTypeSuccess(data){
		holdingDrop = $("#idState");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select State</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.code + '">' + item.details + '</option>');
			//holdingDrop.append('<option value="' + item.code + '" name="' + item.categoryCode+ '">' + item.taxStatus + '</option>');
		});
	}
	
}

function taxStatusChange() {
	var ddl = document.getElementById("idTaxStatus");
	var selectedText = ddl.options[ddl.selectedIndex].text;
	var taxTextNRI = selectedText.match(/NRI/gi);
	var taxTextNRE = selectedText.match(/NRE/gi);
	if( (hasValue(taxTextNRI)) || (hasValue(taxTextNRE)) ){
		$("#idForeignAddress").show();
	}
	else{
		$("#idForeignAddress").hide();
	}
}

$('#idTaxStatus').change(function(e){
	// Your event handler
	taxStatusChange();
	
});

$('#idCKYC').change(function(e){
	var ddl = document.getElementById("idCKYC");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	//alert(selectedValue);
	if(selectedValue == "Yes"){
		ckycFlag = "Yes";
		$("#idDivCkycApplicantDetails").show();
	}
	else{
		ckycFlag = "No";
		$("#idDivCkycApplicantDetails").hide();
	}
});

$('#idDepositoryDetails').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idDepositoryDetails");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	if (selectedValue == "1") {
		$("#idDivDepositoryName").hide();
		$("#idDividDPID").hide();
		$("#idDivBeneficiaryAcc").hide();
		$("#idDivAddBankAccount").show();
		//alert("Check it");
		//$("#idDepositoryName").val("");
		$("select#idDepositoryName")[0].selectedIndex = 0;
		$("#idDPID").val("");
		$("#idBeneficiaryAccNo").val("");

	} else {
		$("#idDivDepositoryName").show();
		$("#idDividDPID").show();
		$("#idDivBeneficiaryAcc").show();
		$("#idDivAddBankAccount").hide();
	}
});


$("#saveAndNextUCCGeneral").click(function(){
	//alert("saveAndNextUCCGeneral");
	if(validateForm($('#idForm1'),jsonString)){
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idForm1').serializeToJSON();
		var gender = $("#idGender").val();
		if(gender == "Male") {
			formData["gender"] = "M";
		} else {
			formData["gender"] = "F";
		}
		formData["clientId"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorId"] = loggedUser.id;
		
		if (jsonString.secondApplicantName == "" && jsonString.thirdApplicantName == "") {
			formData["holding"] = holding;
		}
		if (jsonString.secondApplicantName == null && jsonString.thirdApplicantName == null) {
			formData["holding"] = holding;
		}
		
		if (jsonString.guardianName != null && jsonString.guardianName != "") {
			formData["taxStatus"] = "02"; //// on behalf of minor
		}
		
		var data = JSON.stringify(formData);
		
		saveData("POST", data, "saveUCCDraftMode", onAddUCCGeneralSuccess)
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
		}
		
		
		//openCity(event, 'pan');
		openCity(event, 'bank');
	}
	else{
		//error message;
	}
	

	openCity(event, 'pan');	

});

/*
 * 
 *this part is Commented because PAN details would be deleted */
 $(".saveAndNextUCCPan").click(function(){
	if(validateUCCPanForm($('#idForm2'),jsonString)){
		//alert('Success PAN: True');
		
		var formData = $('#idForm2').serializeToJSON();
		formData["clientId"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorId"] = loggedUser.id;
		formData["clientCode"] = jsonString.clientCode;
		var data = JSON.stringify(formData);
		saveData("POST", data, "saveUCCDraftMode", onAddUCCGeneralSuccess)
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
		}
		
		openCity(event, 'bank');
	}
	else{
		//Error Message
	}
});



$(".saveAndNextUCCBank").click(function(){
   
    if(validateUCCBankDetailForm($('#idForm3'))){
        var formData = $('#idForm3').serializeToJSON();
        formData["clientId"] = selectedClientId;
        var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
        formData["advisorId"] = loggedUser.id;
        formData["clientCode"] = jsonString.clientCode;
        var data = JSON.stringify(formData);
        //alert("Data : " + data)
        saveData("POST", data, "saveUCCDraftMode", onAddUCCGeneralSuccess)
        function onAddUCCGeneralSuccess(data) {
            bootbox.alert(data.message);
        }
       
        openCity(event, 'contact');
       
    }
});
$(".saveAndNext4UCCContact").click(function(){
	
	if(validateUCCContactForm($('#idForm4'))){
		
		var ddl = document.getElementById("idState");
		var selectedValue = ddl.options[ddl.selectedIndex].value;
		var selectedName = $("#idState").find('option:selected').attr("name");
		
		var formData = $('#idForm4').serializeToJSON();
		formData["clientId"] = selectedClientId;
		//formData["state"] = selectedName;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorId"] = loggedUser.id;
		formData["clientCode"] = jsonString.clientCode;
		var data = JSON.stringify(formData);
		saveData("POST", data, "saveUCCDraftMode", onAddUCCGeneralSuccess)
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
		}
		
		openCity(event, 'ckycdetails');
	}
});
$(".saveAndNext5CKYC").click(function(){
//	loadLoader();
	if(ckycFlag == "Yes"){
		//alert("ckycFlag "+ckycFlag);
		if(validateUCCCkycDetailsForm($('#idForm1'),jsonString)){
			
			var formData = $('#idForm5').serializeToJSON();
			formData["clientId"] = selectedClientId;
			var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
			formData["advisorId"] = loggedUser.id;
			formData["clientCode"] = jsonString.clientCode;
			var data = JSON.stringify(formData);
			//saveData("POST", data, "saveUCCDraftMode", onAddUCCGeneralSuccess)
			function onAddUCCGeneralSuccess(data) {
				var url = serviceIP + "/clientservice/" + 'fireUCCAPI?lastSavedId='+data.optionalParam+
				'&clientCode='+jsonString.clientCode;
				$.ajax({
					type: 'GET',
					url: url,
					async: false,
					dataType: 'json',
					beforeSend: function (xhr){ 
						xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				    },
			        success: function (data) {
			        	bootbox.alert(data.message);
		//	        	hideLoader();
			        	if (data.statusCode == 100) {
			        		$(".dashboardheading").html("View UCC");
							$("#idInvest").load("invest/viewInvestDashboard.html");
							sessionStorage.removeItem("LIST_OF_UCC");
							sessionStorage.removeItem("APPLICANT_STATUS");
							sessionStorage.removeItem("APPLICANT_NAME");
			        	}
			        },
			        failure: function(errMsg) {
			            alert(errMsg);
			        }
				});
			}
			
		}
	} else{
		var formData = $('#idForm5').serializeToJSON();
		formData["clientId"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorId"] = loggedUser.id;
		formData["clientCode"] = jsonString.clientCode;
		var data = JSON.stringify(formData);
		saveData("POST", data, "saveUCCDraftMode", onAddUCCGeneralSuccess)
		function onAddUCCGeneralSuccess(data) {
			var url = serviceIP + "/clientservice/" + 'fireUCCAPI?lastSavedId='+data.optionalParam+
			'&clientCode='+jsonString.clientCode;
			$.ajax({
				type: 'GET',
				url: url,
				async: false,
				dataType: 'json',
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
		        success: function (data) {
		        	bootbox.alert(data.message);
	//	        	hideLoader();
		        	if (data.statusCode == 100) {
		        		$(".dashboardheading").html("View UCC");
						$("#idInvest").load("invest/viewInvestDashboard.html");
						sessionStorage.removeItem("LIST_OF_UCC");
						sessionStorage.removeItem("APPLICANT_STATUS");
						sessionStorage.removeItem("APPLICANT_NAME");
		        	}
		        },
		        failure: function(errMsg) {
		            alert(errMsg);
		        }
			});
		}
	
	}
	
	
});


$("#idUploadFile").on("click", function(event) {
	var fileHTML = document.getElementById("files").files[0];
	if (fileHTML == "" || fileHTML == undefined) {
		bootbox.alert("Please Choose a File for Uploading");
	} else {
		var fileName = document.getElementById("files").files[0].name;
		if (validate(fileName)) {

			var form = $("#idFormUpload")[0];
			var data = new FormData(form);
			var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
			//formData["clientId"] = selectedClientId;
			var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
			//formData["advisorId"] = loggedUser.id;
			var clientCode = $("#idClientCode").val();
			data.append("clientCode", clientCode);
			data.append("advisorId", loggedUser.id);
			data.append("clientId", selectedClientId);
			$.ajax({
		        type: "POST",
		        enctype: 'multipart/form-data',
		        url: ClientServiceUrl+'clientTransact/uploadAOF',
		        data: data,
		        processData: false, //prevent jQuery from automatically transforming the data into a query string
		        contentType: false,
		        cache: false,
		        timeout: 6000,
		    	beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
		        success: function (data) {
		        	
		        	bootbox.alert(data.message);
		         	/*var errorNum = data.errors.length;
		         	
		        	if(errorNum >0){
		        	    str = data.errors.join('\n');
		        	    bootbox.alert(str);
		        	}else{
		        		bootbox.alert("File uploading successful");
			        	$("#idBusiness").load("userManagement/viewUserCreation.html");
						$(".dashboardheading    ").html("");
					    $(".dashboardheading").html("View User List");
		        	}*/
		        	$("#dashbord").empty();
	        		$(".dashboardheading").html("FATCA Declaration");
	        		$("#dashbord").load("invest/fatca.html");
		        },
		        error: function (jqXHR, exception) {
		        	var msg = '';
			        if (jqXHR.status === 0) {
			            msg = 'Could not connect to the server, please contact System Administrator.';
			        }else if(jqXHR.status == 400){
			        	msg = 'There is some problem in the server, please contact System Administrator.\n';
			        }else if(jqXHR.status == 401){
			        	msg = 'You are not authorized to access this data.';
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
//			        $("#idBusiness").load("resources/errorPage.html");
		        }
		    });
			/*
			
			
			$('#idFormUpload').prop('action', ClientServiceUrl+'advisorUsers/uploadBulkUsers');
			$('#idFormUpload').prop('method', 'POST');
			$('#idFormUpload').prop('enctype', 'multipart/form-data');
			$('#idFormUpload').submit();*/
		
		
		
		}
	}
});
function validate(fileName) {
	var _validFileExtensions = [".tiff"];    
	if (fileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];
            if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
            }
        }
        
        if (!blnValid) {
            bootbox.alert("Sorry, " + fileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
            return false;
        }
    }
    return true;
}


$("#idIFSCcode").blur(function() {
	var ifscCode = $("#idIFSCcode").val();
	if(ifscCode != ""){
		var serviceUrl = "getBankDetailsByIFSC/" + ifscCode;
		getClientData("GET", "", serviceUrl, onSuccess);
		function onSuccess(data) {
			if (data.bank == null) {
				bootbox.alert("Invalid IFSC Code");
				$("#idIFSCcode").val("");
				$("#idBankName").val("");
				$("#idMICRcode").val("");
			} else {
				$("#idBankName").val(data.bank);
				$("#idMICRcode").val(data.branch);
			}
		}
	} else{
		$("#idBankName").val("");
		$("#idMICRcode").val("");
	}
		
	
});
// for AOF Mandate Id will be 0 and docType = 1
$("#idAOF").click(function(){
	var url = serviceIP + "/clientservice/" + 'editPDF?clientCode='+jsonString.clientCode+'&docType=1&mandateId=0';
//	var url = serviceIP + "/clientservice/" + 'editPDF?clientCode='+jsonString.clientCode;
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
        success: function (data) {
//        	alert("Successfully Edited");
        	if (data == true) {
        		var a = document.createElement("a");
            	document.body.appendChild(a);
            	a.style = "display: none";
            	var fileName = "AOFreport.pdf";

            	var xhr = new XMLHttpRequest();
            	xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadAOFForm?clientCode='+jsonString.clientCode+'&docType=1', true);
            	xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
            	xhr.responseType = "blob";
            	xhr.onload = function() {
            		var url = window.URL.createObjectURL(xhr.response);  
            		a.href = url;
            		a.download = fileName;
            		a.click();
            		window.URL.revokeObjectURL(url);
            	};
            	xhr.send();  
        	} else {
        		bootbox.alert("Unable to generate AOF");
        	}
        	
        	
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
});



function generateBankBlock(countBank) {
    //alert("countBank" + countBank);
    var elem = document.getElementById("idBankNavigationButtonDiv");
    elem.parentNode.removeChild(elem);
    var e = '<div id="idDivBankDetails'+(countBank+1)+'">'+ 
     '<span onclick="this.parentElement.style.display=none" class="topright"></span>'+
     '<br/><br/>'+
     '<div class="col-sm-7" style="text-align: left;z-index:1;margin-left:-25px;">'+
     '<label class="control-label" for="idppfdeposite" style="text-align:left;font-size:14px"> Account type*: </label><br/>'+
                        '<select style="padding-top: 2px" class="form-control input-width-medium" id="idAcountType'+(countBank+1)+'" name="accountType'+(countBank+1)+'" tabindex="1">'+
                        	'<option value="">Select</option>'+
                        	'<option value="CB">Current Bank</option>'+
                            '<option value="NE">NRE Account</option>'+
                            '<option value="NO">NRO Account</option>'+
                            '<option value="SB">Savings Bank</option>'+
                        '</select>'+
                        '<span class="formentry-errmsg" id="alertBkAccType'+(countBank+1)+'"></span>'+
                            '</div><br/><br/><br/><br/><br/>'+
                    '<div class="col-sm-7" style="text-align: left;z-index:1;margin-left:-25px;">'+
                    '<label class="control-label" for="idppfdeposite" style="text-align:left;font-size:14px">Bank Account Number*: </label><br/>'+
                    '<input type="text" placeholder="Bank Account Number" class="form-control" id="idBankAccountNumber'+(countBank+1)+'" name="bankAccountNumber'+(countBank+1)+'" tabindex="2" style="width:16em"/>'+
                    '<span class="formentry-errmsg" id="alertBkAcc'+(countBank+1)+'"></span>'+
                    '</div><br/><br/><br/><br/>'+
                    '<div class="col-sm-7" style="text-align: left;z-index:1;margin-left:-25px;">'+
                    '<label class="control-label" for="idppfdeposite" style="text-align:left;font-size:14px">IFSC code*: </label><br/>'+
                        '<span class="form-static-value">'+
                            '<input type="text" placeholder="IFSC Code" class="form-control" id="idIFSCcode'+(countBank+1)+'" name="ifsccode'+(countBank+1)+'" tabindex="3" style="width:16em"/>'+
                            '<span class="formentry-errmsg" id="alertIfsc'+(countBank+1)+'"></span>'+
                        '</span>'+
                    '</div><br/><br/><br/><br/>'+
                    '<div class="col-sm-7" style="text-align: left;z-index:1;margin-left:-25px;">'+
                    '<label class="control-label" for="idppfdeposite" style="text-align:left;font-size:14px">Bank Name*: </label><br/>'+
                        '<input type="text" placeholder="Bank Name" class="form-control" id="idBankName'+(countBank+1)+'" name="bankName'+(countBank+1)+'" tabindex="4" style="width:16em" readonly/>'+
                        '<span class="formentry-errmsg" id="alertBkName'+(countBank+1)+'"></span>'+
                    '</div><br/><br/><br/><br/>'+
                    '<div class="col-sm-7" style="text-align: left;z-index:1;margin-left:-25px;">'+
                    '<label class="control-label" for="idppfdeposite" style="text-align:left;font-size:14px">Branch </label><br/>'+
                        '<span class="form-static-value">'+
                            '<input type="text" placeholder="Branch" class="form-control" id="idMICRcode'+(countBank+1)+'" name="branch'+(countBank+1)+'" tabindex="5" style="width:16em" readonly/>'+
                            '<span class="formentry-errmsg" id="alertMicr'+(countBank+1)+'"></span>'+
                        '</span>'+
                    '</div><br/><br/><br/><br/>'+
                    '<div class="col-sm-7" style="text-align: left;z-index:1;margin-left:-25px;">'+
                    '<label class="control-label" for="idppfdeposite" style="text-align:left;font-size:14px">Whether Default Bank Account*: </label><br/>'+
                        '<span class="form-static-value">'+
                            '<select style="padding-top: 2px" class="form-control input-width-medium" required="required" id="idWetherDefaultBankAccount'+(countBank+1)+'" name="defaultBankFlag'+(countBank+1)+'" tabindex="6">'+
                                '<option value="Y">Yes</option>'+
                                '<option value="N" selected>No</option>'+
                        '</select>'+
                        '<span class="formentry-errmsg" id="alertDefaultBankAcc'+(countBank+1)+'"></span>'+
                        '</span>'+
                    '</div><br/><br/><br/><br/>'+
                    '<div id="idDivAddBankAccount" class="col-sm-7" style="text-align: left;z-index:1;margin-left:-25px;">'+
                    '<button type="submit" style="width:51%" class="form-control addbtn" tabindex="7" id="idAddBankAccount'+(countBank+1)+'">Add another Bank Account'+
                    '</button>'+
                    '<button type="submit" style="width:51%" class="form-control addbtn" tabindex="7" id="idRemoveAccount'+(countBank+1)+'">Remove Bank Account'+
                    '</button>'+
                    '<br/></div>'+
                    '</div>';
    $("#bank").append(e);
    $("#bank").append(elem);
   
    
    $("#idAddBankAccount"+(countBank+1)).click(function(){
    	
    	if (validateUCCBankDetailForm($('#idForm3'))) {
    		var id = $(this).attr('id');
    	 	var lastChar = id.charAt(id.length -1);
    	 	console.log("lastChar" + lastChar);
	        if (lastChar < 5) {
	            generateBankBlock(parseInt(lastChar));
	        } else {
	            bootbox.alert("You can add maximum 5 banks");
	        } 
	        sessionStorage.removeItem("MAX_BANK");
	        sessionStorage.setItem("MAX_BANK",parseInt(lastChar));
    	}
    });
    $("#idRemoveAccount"+(countBank+1)).click(function(){
    	 console.log(countBank);
    	 var id = $(this).attr('id');
    	 var lastChar = id.charAt(id.length -1);
    	 $("#idAcountType"+lastChar).val("");
    	 $("#idBankAccountNumber"+lastChar).val("");
    	 $("#idIFSCcode"+lastChar).val("");
    	 $("#idBankName"+lastChar).val("");
    	 $("#idMICRcode"+lastChar).val("");
    	 $("#idWetherDefaultBankAccount"+lastChar).val("");
    	 $("#idDivBankDetails"+lastChar).remove();
    	 sessionStorage.removeItem("MAX_BANK");
	     sessionStorage.setItem("MAX_BANK",(parseInt(lastChar)-2));
    	 
    	
    });

    $("#idIFSCcode"+(countBank+1)).blur(function() {
        var ifscCode = $("#idIFSCcode"+(countBank+1)).val();
        if(ifscCode != ""){
        	var serviceUrl = "getBankDetailsByIFSC/" + ifscCode;
            getClientData("GET", "", serviceUrl, onSuccess);
            function onSuccess(data) {
            	if (data.bank == null) {
        			bootbox.alert("Invalid IFSC Code");
        			$("#idIFSCcode"+(countBank+1)).val("");
        			$("#idBankName"+(countBank+1)).val("");
        	        $("#idMICRcode"+(countBank+1)).val("");
        		} else {
        			 $("#idBankName"+(countBank+1)).val(data.bank);
        	         $("#idMICRcode"+(countBank+1)).val(data.branch);
        		}
               
            }
        } else {
        	$("#idBankName"+(countBank+1)).val("");
	        $("#idMICRcode"+(countBank+1)).val("");
        }
        
    });
    
    $('#idWetherDefaultBankAccount'+(countBank+1)).change(function(e){
    	//alert("Hi");
    	var result = $('#idWetherDefaultBankAccount'+(countBank+1)).val();
    	if(result == 'Y'){
    		yesCount ++;
    	} else {
    		if (yesCount > 0) {
    			yesCount --;
    		}
    	}
    	//alert(yesCount);
    	if (yesCount > 1) {
    		bootbox.alert("Only one Bank Account can be default");
			$('#idWetherDefaultBankAccount'+(countBank+1)).val("N");
			if (yesCount > 0) {
    			yesCount --;
    		}
    	}
    	/*var result = document.getElementById(("idWetherDefaultBankAccount"+(i+1))).value;
    	//var result = $("#idWetherDefaultBankAccount"+(countBank+1)).options[lClientId.selectedIndex].val();

    	alert(result);
    	*/


    });
   
}

$('#idWetherDefaultBankAccount').change(function(e){
	var result = $('#idWetherDefaultBankAccount').val();
	if(result == 'Y'){
		yesCount  ++;
	}else {
		if (yesCount > 0) {
			yesCount --;
		}
	}
	if (yesCount > 1) {
		bootbox.alert("Only one Bank Account can be default");
		$('#idWetherDefaultBankAccount').val("N");
		if (yesCount > 0) {
			yesCount --;
		}
	}
});

$("#idAddBankAccount").click(function(){
    //Some code
	if(validateUCCBankDetailForm($('#idForm3'))){
		generateBankBlock(1);
		sessionStorage.removeItem("MAX_BANK");
		sessionStorage.setItem("MAX_BANK",1);
		
	}
});

function loadLoader(){	
	   // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"><span class="fa fa-refresh fa-spin"></span> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';
	    var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"> <img src="../Common/assets/images/icons/processing-gif-14.gif" alt="Loader" width="42" height="42"> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	   // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;">Processing... </h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	   
	   $("#overlayLoading").html(ineerHtml).css({'display':'block'});		
}

function hideLoader(){
	$("#overlayLoading").css({'display':'none'}).html("");
}
var SINGLE_HOLDER_TYPE = 1;
var JOINT_HOLDER_TYPE = 2;
var SURVIVOR_HOLDER_TYPE = 3;
var clientDetailsObj = new Object();
var clientPANDetails = new Object();
var clientBankDetails = new Object();
var clientContactDetails = new Object();
var clientCKYCDetails = new Object();
var clientUploadDocumentDetails = new Object();
var abc = 2;
var countBank = 1;
var applicantData = sessionStorage.getItem("APPLICANT_STATUS");
jsonString = JSON.parse(applicantData);
$(document).ready(function() {
	
	/*var applicantData = sessionStorage.getItem("APPLICANT_STATUS");
	alert("applicantData" + applicantData);
	jsonString = JSON.parse(applicantData);
	alert(jsonString.advisorId);*/
	$("#idClientCode").val(jsonString.clientCode);
	
	countBank = 1;
	populateEmploymentTypeDrop($("#idOccupation"));
	populateResidentTypeDrop($("#idTaxStatus"));
	getSelectedClient();
	getSelectedContact();
	createBankDetails();
	getFrequency();
	getStateCode();
	
	/*if(jsonString.secondApplicantName == '') {
		alert("Blank");
		//$("#idHolding").val("Single");
		//$('#idHolding option').eq('2').prop('selected',true);
		//document.getElementById("idHolding").selectedIndex = 0;
		//$("#idHolding").prop('selectedIndex',1);
//		$('#idHolding').val('Single');
		//$("#idHolding").prop('selectedIndex', 1);  
	}*/
	
});

function getStateCode() {
	getClientData("GET","","AllTransactStateCode",stateTypeSuccess);

	function stateTypeSuccess(data){
		holdingDrop = $("#idState");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select State</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.code + '">' + item.details + '</option>');
		});
	}
}


function getFrequency() {
	getClientData("GET","","AllTransactHoldingType",holdingTypeSuccess);

	function holdingTypeSuccess(data){
		holdingDrop = $("#idHolding");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Holding Type</option>');
		$.each(data, function (index, item) {
			holdingDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});
		if(jsonString.secondApplicantName == '' || jsonString.thirdApplicantName) {
			document.getElementById("idHolding").selectedIndex = 1;
			document.getElementById("idHolding").setAttribute("readonly", true);
			hideOtherApplicants();
		} else {
			//remove the Single option
			$("#idsecondclientAppli").val(jsonString.secondApplicantName);
			$("#idThirdclientAppli").val(jsonString.thirdApplicantName);
			
			$("#idSecondApplicantPAN").val(jsonString.thirdApplicantName);
			$("#idThirdApplicantPAN").val(jsonString.thirdApplicantName);
			
		}
	}
	$('#idHolding').change(function(e){
		// Your event handler
		var ddl = document.getElementById("idHolding");
		var selectedValue = ddl.options[ddl.selectedIndex].value;
//		alert("selectedValue" + selectedValue);
		switch (selectedValue)
		{
		case '1':
			/*var elemSecondApplicantName = document.getElementById("idDivSecondApplicant");
			elemSecondApplicantName.parentNode.removeChild(elemSecondApplicantName);
			
			var elemThirdApplicantName = document.getElementById("idDivThirdApplicant");
			elemThirdApplicantName.parentNode.removeChild(elemThirdApplicantName);
			
			var elemSecondApplicantPan = document.getElementById("idDivSecondApplicantPan");
			elemSecondApplicantPan.parentNode.removeChild(elemSecondApplicantPan);
		
			var elemThirdApplicantPan = document.getElementById("idDivThirdApplicantPan");
			elemThirdApplicantPan.parentNode.removeChild(elemThirdApplicantPan);
	*/		
			$("#idDivSecondApplicant").hide();
			$("#idDivThirdApplicant").hide();
			$("#idDivSecondApplicantPan").hide();
			$("#idDivThirdApplicantPan").hide();
			// hide kyc
			$("#idDivKYCTypeSecond").hide();
			$("#idDivCKYCNoSecond").hide();
			$("#idDivKYCTypeThird").hide();
			$("#idDivCKYCNoThird").hide();

			break;

		case '2':
			$("#idDivSecondApplicant").show();
			$("#idDivThirdApplicant").show();
			$("#idDivSecondApplicantPan").show();
			$("#idDivThirdApplicantPan").show();
			
			$("#idDivKYCTypeSecond").show();
			$("#idDivCKYCNoSecond").show();
			$("#idDivKYCTypeThird").show();
			$("#idDivCKYCNoThird").show();

			break;

		case '3':
			$("#idDivSecondApplicant").show();
			$("#idDivThirdApplicant").show();
			$("#idDivSecondApplicantPan").show();
			$("#idDivThirdApplicantPan").show();

			$("#idDivKYCTypeSecond").show();
			$("#idDivCKYCNoSecond").show();
			$("#idDivKYCTypeThird").show();
			$("#idDivCKYCNoThird").show();
			break;

		default:  alert("Default");
		}
	});
}

function hideOtherApplicants() {
	$("#idDivSecondApplicant").hide();
	$("#idDivThirdApplicant").hide();
	$("#idDivSecondApplicantPan").hide();
	$("#idDivThirdApplicantPan").hide();
	// hide kyc
	$("#idDivKYCTypeSecond").hide();
	$("#idDivCKYCNoSecond").hide();
	$("#idDivKYCTypeThird").hide();
	$("#idDivCKYCNoThird").hide();
}

var gender;
function getSelectedClient(){
	selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	console.log("selectedClientId "+selectedClientId);
	var serviceUrl = "clientMaster/" + selectedClientId;
	getClientData("GET", "", serviceUrl, onSuccess);

	function onSuccess(data) {
		var clientName=data.firstName + ((data.middleName == "") ? " " : (data.middleName+" ")) + data.lastName; 
		$("#idClientAppli").val(clientName);
		$("#idDateOfBirth").val(data.birthDate);
		var date1 = data.birthDate;

		var day = date1.substring(0,2);
		var month = date1.substring(3,5);
		var year = date1.substring(6,10);
		var dateNew = new Date(year,month,day);
		var date2 = new Date();
		var timeDiff = Math.abs(date2.getTime() - dateNew.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		var diffYears = Math.ceil(diffDays/365);
		if (diffYears >= 18) {
			$("#idDivGuardian").hide();
			$("#idDivGuardianPan").hide();

		} else {
			$("#idDivGuardian").show();	
			$("#idDivGuardianPan").show();

		}/*alert
		$('input[name="radio"][value="' + data.gender + '"]').prop('checked', true);*/
		//alert("data.employmentType"+data.employmentType);
		//alert("data.residentType"+data.residentType);
		if(data.employmentType != 0){
			$("#idOccupation").val(data.employmentType);
		}
		//alert("aaa");
		if(data.residentType != 0){
			$("#idTaxStatus").val(data.residentType);
		}
		//alert("bbb");
		$("#idfirstAppliPan").val(data.pan.toUpperCase());
		var b=validateDOB(data.birthDate);
		//	alert("b "+b);
		if(b==2){
			var serviceUrl = "ClientGuardianInfo/client/" + selectedClientId;
			getClientDataAsyncFalse("GET", "", serviceUrl, onSuccess);
			function onSuccess(data1) {
				var guardianName=data1.firstName + (data1.middleName =="") ? " " : (data1.middleName+" ") + data1.lastName; 
				$("#idGuardianName").val(guardianName);
				$("#idGuardianPAN").val(data.pan);
			}
		}
		
		gender = data.gender;
//		alert("gender" + gender);
	}
}
$("#idDivDepositoryName").hide();
$("#idDividDPID").hide();
$("#idDivBeneficiaryAcc").hide();
$('#idDepositoryDetails').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idDepositoryDetails");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	if (selectedValue == "Physical") {
		$("#idDivDepositoryName").hide();
		$("#idDividDPID").hide();
		$("#idDivBeneficiaryAcc").hide();
	} else {
		$("#idDivDepositoryName").show();
		$("#idDividDPID").show();
		$("#idDivBeneficiaryAcc").show();
	}
});


var clientDetailsObj = new Object();
var clientPANDetails = new Object();
var clientBankDetails = new Object();
var clientContactDetails = new Object();
var clientCKYCDetails = new Object();
var clientUploadDocumentDetails = new Object();
$("#saveAndNext1").click(function(){
	
	clientDetailsObj.clientCode = $("#idClientCode").val();
	sessionStorage.setItem("UCC",clientDetailsObj.clientCode);
	var ddl = document.getElementById("idHolding");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	clientDetailsObj.holding = selectedValue;
	clientDetailsObj.clientName = $("#idClientAppli").val();
	clientDetailsObj.clientDOB = $("#idDateOfBirth").val();
	//obj.clientGender = $("#clientCode").val();
	//clientDetailsObj.clientOccupation = $("#idOccupation").find('option:selected').text();
	clientDetailsObj.clientOccupation = "01";
	clientDetailsObj.clientTaxStatus = "1"/*$("#idTaxStatus").find('option:selected').text()*/;
	clientDetailsObj.clientSecondApplicantName = $("#idsecondclientAppli").val();
	clientDetailsObj.clientThirdApplicantName = $("#idThirdclientAppli").val();
	clientDetailsObj.clientGuardianName = $("#idGuardianName").val();
	clientDetailsObj.clientGender = gender;
	var jsonString= JSON.stringify(clientDetailsObj);
//	alert("saveAndNext1" + jsonString);
	sessionStorage.setItem("CLIENT_HOLDING_DETAILS",jsonString);
});
$("#saveAndNext2").click(function(){
	
	clientPANDetails.clientPan = $("#idfirstAppliPan").val();
	clientPANDetails.clientSecondPan = $("#idSecondApplicantPAN").find('option:selected').text();
	clientPANDetails.clientThirdPan = $("#idThirdApplicantPAN").val();
	clientPANDetails.guardianPan = $("#idGuardianPAN").val();
	var jsonString= JSON.stringify(clientPANDetails);
	sessionStorage.setItem("CLIENT_PAN_DETAILS",jsonString);
	
});
$("#idSaveAndNext3").click(function(){
//	createBankDetails();
//	alert("abc" + abc);
	for (var bankIndex = 0; bankIndex < countBank; bankIndex ++) {
		var bankObj = new Object();
		
		var ddl = document.getElementById("idAcountType");
		var selectedValue = ddl.options[ddl.selectedIndex].value;
		bankObj.accountType = selectedValue;
		
		bankObj.accountNumber = $("#idBankAccountNumber").val();
		sessionStorage.setItem("DEFAULT_BANK_ACC_NO",$("#idBankAccountNumber").val());
		bankObj.bankName = $("#idBankName").val();
		sessionStorage.setItem("DEFAULT_BANK_NAME",$("#idBankName").val());
		bankObj.bankIFSCCode = $("#idIFSCcode").val();
		bankObj.bankMICRCode = $("#idMICRcode").val();
		
		var defaultFlag = document.getElementById("idWetherDefaultBankAccount");
		var selectedValueDefaultFlag = defaultFlag.options[defaultFlag.selectedIndex].value;
		bankObj.bankType = selectedValueDefaultFlag;
		
		switch (bankIndex)
		{
		case 0:
			clientBankDetails.bank1 = bankObj;
			break;
		case 1:
			clientBankDetails.bank2 = bankObj;
			break;
		case 2:
			clientBankDetails.bank3 = bankObj;
			break;
		case 3:
			clientBankDetails.bank4 = bankObj;
			break;
		case 4:
			clientBankDetails.bank5 = bankObj;
			break;
		default:  alert("Default");
		}
	}
//	alert(bankIndex);
	var jsonString= JSON.stringify(bankObj);
	sessionStorage.setItem("CLIENT_BANK_DETAILS",jsonString);
});
$("#saveAndNext4").click(function(){
	
	clientContactDetails.clientAddress = $("#idAddress").val();
	clientContactDetails.clientCity = $("#idCity").val();
	clientContactDetails.clientState = $("#idState").val();
	clientContactDetails.clientCountry = $("#idCountry").val();
	//obj.clientGender = $("#clientCode").val();
	clientContactDetails.clientPinCode = $("#idPincode").val();
	clientContactDetails.clientMobile = $("#idMobile").val();
	clientContactDetails.clientEmail = $("#idEmailId").val();
	var jsonString= JSON.stringify(clientContactDetails);
//	alert("jsonString" + jsonString);
	sessionStorage.setItem("CLIENT_CONTACT_DETAILS",jsonString);
	
});
$("#saveAndNext5").click(function(){
	
	clientUploadDocumentDetails.kycStatus = $("#idCKYC").find('option:selected').text();
	
	var firstKYCStatus = document.getElementById("idKYCFirstApplicant");
	var selectedValueKYCStatus = firstKYCStatus.options[firstKYCStatus.selectedIndex].value;
	clientUploadDocumentDetails.firstKycStatus = selectedValueKYCStatus;
	clientUploadDocumentDetails.firstKycNumber = $("#idCKYCFirstApplicant").val();
	
	
	var secondKYCStatus = document.getElementById("idKYCTypeSecondApplicant");
	var selectedValueKYCStatus2 = secondKYCStatus.options[secondKYCStatus.selectedIndex].value;
	clientUploadDocumentDetails.secondKycStatus = selectedValueKYCStatus2;
	clientUploadDocumentDetails.secondKycNUmber = $("#idCKYCSecondApplicant").val();
	
	
	var thirdKYCStatus = document.getElementById("idKYCThirdApplicant");
	var selectedValueKYCStatus3 = thirdKYCStatus.options[thirdKYCStatus.selectedIndex].value;
	clientUploadDocumentDetails.thirdKycStatus = selectedValueKYCStatus3;
	clientUploadDocumentDetails.thirdKycNUmber = $("#idCKYCThirdApplicant").val();
	
	clientUploadDocumentDetails.clientBranch = $("#idBranch").val();
	clientUploadDocumentDetails.clientStatus = $("#idStatus").find('option:selected').text();
	
	var ddlDiv = document.getElementById("idDividendPaymentMode");
	var selectedValueDiv = ddlDiv.options[ddlDiv.selectedIndex].value;
	clientUploadDocumentDetails.clientDivPayMode = selectedValueDiv;
	
	var ddlDivDepositoryDetails = document.getElementById("idDepositoryDetails");
	var selectedValueDepositoryDetails = ddlDivDepositoryDetails.options[ddlDivDepositoryDetails.selectedIndex].value;
	clientUploadDocumentDetails.clientDepositoryDetails = selectedValueDepositoryDetails;
	
	var ddlDivDepositoryName = document.getElementById("idDepositoryName");
	var selectedValueDepositoryName = ddlDivDepositoryName.options[ddlDivDepositoryName.selectedIndex].value;
	clientUploadDocumentDetails.clientDepositoryName = selectedValueDepositoryName;

	clientUploadDocumentDetails.clientDPId = $("#idDPID").val();
	clientUploadDocumentDetails.clientBeneficiaryAccNo = $("#idBeneficiaryAccNo").val();
	
	var ddlDivCommunicationMode = document.getElementById("idCommunicationMode");
	var selectedValueCommunicationMode = ddlDivCommunicationMode.options[ddlDivCommunicationMode.selectedIndex].value;
	clientUploadDocumentDetails.clientCommunicationMode = selectedValueCommunicationMode;
	
	
	var jsonString= JSON.stringify(clientUploadDocumentDetails);
	sessionStorage.setItem("CLIENT_TAX_DETAILS",jsonString);
//	alert("jsonString" + jsonString);
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	
	var holdingJson = clientUploadDocumentDetails;
	var holding = encodeURIComponent(JSON.stringify(sessionStorage.getItem("CLIENT_HOLDING_DETAILS")));
	var pan = encodeURIComponent(JSON.stringify(sessionStorage.getItem("CLIENT_PAN_DETAILS")));
	var bank = encodeURIComponent(JSON.stringify(sessionStorage.getItem("CLIENT_BANK_DETAILS")));
	var contact = encodeURIComponent(JSON.stringify(sessionStorage.getItem("CLIENT_CONTACT_DETAILS")));
	var taxStatus = encodeURIComponent(JSON.stringify(sessionStorage.getItem("CLIENT_TAX_DETAILS")));
	
	var url = serviceIP + "/clientservice/" + 'saveAndUploadCCCreation?advisorId='+loggedUser.id+
	'&clientHolding='+holding+
	'&clientPan='+pan+
	'&clientBank='+bank+
	'&clientContact='+contact+
	'&clientTax='+taxStatus;
	
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
        success: function (data) {
          alert("Success");
        },
        /*failure: function(errMsg) {
            alert(errMsg);
        }*/
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
	
	
});

$("#idAOF").click(function(){
	$.ajax({
		type: 'GET',
		url: serviceIP + "/clientservice/" + 'downloadAOFForm?clientId=1',
		async: false,
		dataType: 'application/pdf',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
        success: function (data) {
//          alert("Success");
        },
        /*failure: function(errMsg) {
            alert(errMsg);
        }*/
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
	
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	var fileName = "AOFreport.pdf";

	var xhr = new XMLHttpRequest();
	xhr.open( "GET", serviceIP + "/clientservice/" + 'downloadAOFForm?clientId=1', true);
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
	
});



function generateBankBlock(countBank) {
	var elem = document.getElementById("idBankNavigationButtonDiv");
	elem.parentNode.removeChild(elem);
	var e = '<br><span onclick="this.parentElement.style.display=none" class="topright"></span>'+
	'<br/><br/>'+
	'<div class="col-sm-7" style="text-align: left; z-index: 0.5; margin-left: -25px; padding-top: 7px; margin-top: -13px" id="idBankDiv">'+
	'<label class="control-label" for="idppfdeposite" style="text-align: left; font-size: 14px"> Account type*:</label><br /> <select style="padding-top: 2px" class="form-control input-width-medium" required="required" id="idAcountType" name="acountType" tabindex="430">'+
	'<option value="">Current</option><option value="Annually">Saving</option></select>'+
	'</div><br /><br /><br /><br />'+
	'<div class="col-sm-7" style="text-align: left; z-index: 0.5; margin-left: -25px; padding-top: 7px; margin-top: -13px">'+
	'<label class="control-label" for="idppfdeposite" style="text-align: left; font-size: 14px">Bank Account Number*: </label><br /> <input type="text" placeholder="Bank Account Number" class="form-control" id="idBankAccountNumber" name="bankAccountNumber" style="width: 16em" />'+
	'</div><br /><br /><br /><br />'+
	'<div class="col-sm-7" style="text-align: left; z-index: 0.5; margin-left: -25px; padding-top: 7px; margin-top: -13px">'+
	'<label class="control-label" for="idppfdeposite" style="text-align: left; font-size: 14px">Bank Name*: </label><br />'+
	'<input type="text" placeholder="Bank Name" class="form-control" id="idBankName" name="bankName" style="width: 16em" />'+
	'</div><br /><br /><br /><br />'+
	'<div class="col-sm-7" style="text-align: left; z-index: 0.5; margin-left: -25px; padding-top: 7px; margin-top: -13px">'+
	'<label class="control-label" for="idppfdeposite" style="text-align: left; font-size: 14px">IFSC code*: </label><br />'+
	'<span class="form-static-value"> <input type="text" placeholder="IFSC Code" class="form-control" id="idIFSCcode" name="iFSCcode" style="width: 16em" /></span>'+
	'</div><br /><br /><br /><br />'+
	'<div class="col-sm-7" style="text-align: left; z-index: 0.5; margin-left: -25px; padding-top: 7px; margin-top: -13px">'+
	'<label class="control-label" for="idppfdeposite" style="text-align: left; font-size: 14px">MICR code: </label><br />'+
	'<span class="form-static-value"> <input type="text" placeholder="MICR Code" class="form-control" id="idMICRcode" name="mICRcode" style="width: 16em" />'+
	'</span></div><br/><br /><br /><br /><div class="col-sm-7" style="text-align: left; z-index: 0.5; margin-left: -25px; padding-top: 7px; margin-top: -13px">'+
	'<label class="control-label" for="idppfdeposite" style="text-align: left; font-size: 14px">Whether Default Bank Account*: </label><br /> <span class="form-static-value">'+
	'<select style="padding-top: 2px" class="form-control input-width-medium" required="required" id="idWetherDefaultBankAccount" name="wetherDefaultBankAccount" tabindex="430">'+
	'<option value="Yes">Yes</option><option value="No" selected>No</option></select></span></div>'+
	'<br /> <br /><br /><br />'+
	'<div class="col-sm-7" style="text-align: left; z-index: 0.5; margin-left: -25px; padding-top: 7px; margin-top: -13px">'+
	'<input type="button" style="width: 51%" class="form-control addbtn" tabindex="540" id="idAddBankAccount'+ countBank + '" value = "Add another Bank Account"><br />';	
	$("#bank").append(e);
	$("#bank").append(elem);
	$("#idAddBankAccount"+countBank).click(function(){
		//Some code
		countBank ++;
		if (countBank < 5) {
			generateBankBlock(countBank);
		} else {
			bootbox.alert("You can add maximum 5 banks");
		}
	});
}
function createBankDetails () {
	countBank = 1;
	$("#idAddBankAccount").click(function(){
		//Some code
		generateBankBlock(countBank);

	});

}
function getSelectedContact(){

	console.log("Adding contacts:Client ID : " + selectedClientId);
	var serviceUrl = "/clientContactInfo/client/" + selectedClientId;
	getClientData("GET", "", serviceUrl, onSuccess);
	function onSuccess(data) {


		//alert("address1DropId: " + data.address1DropId);

		console.log("data "+data);

		console.log("Edit contacts: Email: " + data.emailID);
		contactID = data.id;

		var officeFlag = data.officeAddressLine1;
		var permanentFlag = data.permanentAddressLine1;
		var correspondenceFlag = data.correspondenceAddressLine1;
		var country;
		var state;
		var city;
		var pinCode;

		console.log ("Office flag: " + officeFlag);
		console.log ("Permanent Flag: " + permanentFlag);
		console.log ("Correspondence Flag: " + correspondenceFlag);

		var fullAddress = "";


		if (permanentFlag != null && permanentFlag != ''){ 
			fullAddress = data.permanentAddressLine1+data.permanentAddressLine2+data.permanentAddressLine3;
			state = data.permanentState;
			city = data.permanentCity;
			pinCode = data.permanentPincode;
			country = data.lookupPermanentCountryName;

		}
		else if (officeFlag != null && officeFlag != ''){ 
			fullAddress = data.officeAddressLine1+data.officeAddressLine2+data.officeAddressLine3;
			state = data.officeState;
			city = data.officeCity;
			pinCode = data.officePincode;
			country = data.lookupOfficeCountryName;
		}
		else{
			if (correspondenceFlag != null && correspondenceFlag != ''){
				fullAddress = data.correspondenceAddressLine1+data.correspondenceAddressLine2+data.correspondenceAddressLine3;
				state = data.correspondenceState;
				city = data.correspondenceCity;
				pinCode = data.correspondencePincode;
				country = data.lookupCorrespondenceCountryName;
			}
		}
		$("#idAddress").val(fullAddress);
		$("#idCity").val(city);
		$("#idState").val(state);
		$("#idCountry").val(country);
		/*sessionStorage.setItem("COUNTRY");
		alert(pinCode);
	*/	$("#idPincode").val(pinCode);
		$("#idEmailId").val(data.emailID);
		$("#idMobile").val(data.mobile);

	}
	$('#idCKYC').change(function(e){
		var ckycId = document.getElementById("idCKYC");
		var selectedValueCKYC = ckycId.options[ckycId.selectedIndex].value;
		if (selectedValueCKYC == "No") {
			$('#idKYCFirstApplicant').css('pointer-events','none');
			$('#idKYCFirstApplicant').css('opacity','0.6');
			
			$('#idCKYCFirstApplicant').css('pointer-events','none');
			$('#idCKYCFirstApplicant').css('opacity','0.6');
			
			$('#idKYCTypeSecondApplicant').css('pointer-events','none');
			$('#idKYCTypeSecondApplicant').css('opacity','0.6');
			
			$('#idCKYCSecondApplicant').css('pointer-events','none');
			$('#idCKYCSecondApplicant').css('opacity','0.6');
			
			$('#idKYCThirdApplicant').css('pointer-events','none');
			$('#idKYCThirdApplicant').css('opacity','0.6');
			
			$('#idCKYCThirdApplicant').css('pointer-events','none');
			$('#idCKYCThirdApplicant').css('opacity','0.6');
			
			/*$('#idBranch').css('pointer-events','none');
			$('#idBranch').css('opacity','0.6');
			
			$('#idStatus').css('pointer-events','none');
			$('#idStatus').css('opacity','0.6');
			
			$('#idDividendPaymentMode').css('pointer-events','none');
			$('#idDividendPaymentMode').css('opacity','0.6');
			
			$('#idDepositoryDetails').css('pointer-events','none');
			$('#idDepositoryDetails').css('opacity','0.6');
			
			$('#idCommunicationMode').css('pointer-events','none');
			$('#idCommunicationMode').css('opacity','0.6');*/
		} else {
			$('#idKYCFirstApplicant').removeAttr("style");
			$('#idKYCFirstApplicant').removeAttr("style");
		
			$('#idCKYCFirstApplicant').removeAttr("style");
			$('#idCKYCFirstApplicant').removeAttr("style");
			$('#idCKYCFirstApplicant').css('width','16em');
			
			$('#idKYCTypeSecondApplicant').removeAttr("style");
			$('#idKYCTypeSecondApplicant').removeAttr("style");
			
			$('#idCKYCSecondApplicant').removeAttr("style");
			$('#idCKYCSecondApplicant').removeAttr("style");
			$('#idCKYCSecondApplicant').css('width','16em');
			
			$('#idKYCThirdApplicant').removeAttr("style");
			$('#idKYCThirdApplicant').removeAttr("style");
			
			$('#idCKYCThirdApplicant').removeAttr("style");
			$('#idCKYCThirdApplicant').removeAttr("style");
			$('#idCKYCThirdApplicant').css('width','16em');
			
			/*$('#idBranch').removeAttr("style");
			$('#idBranch').removeAttr("style");
			$('#idBranch').css('width','16em');
			
			$('#idStatus').removeAttr("style");
			$('#idStatus').removeAttr("style");
			
			$('#idDividendPaymentMode').removeAttr("style");
			$('#idDividendPaymentMode').removeAttr("style");
			
			$('#idDepositoryDetails').removeAttr("style");
			$('#idDepositoryDetails').removeAttr("style");
			
			$('#idCommunicationMode').removeAttr("style");
			$('#idCommunicationMode').removeAttr("style");*/
	
		}
	});
	
}
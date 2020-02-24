function validateFatcaForm(form,countApplicant2,countApplicant3,flagGuardian){
	
	var errorFatca = 0;
	var transactMode = sessionStorage.getItem("TRANSACT_NAV_MODE");
	
	if(transactMode == "SIDEBAR"){
		
		/******************* Client UCC Validations ***************************/
		var lClientId = document.getElementById("idClientUCCCombo");
		var clientId = lClientId.options[lClientId.selectedIndex].value;
		lClientId.style.border ="1px solid #ccc";
		document.getElementById('alertClientCombo').innerHTML="";
		//var errorApplicantName = 0;
		
		if (!hasValue(clientId)) {
			
			document.getElementById('alertClientCombo').innerHTML="Please select Client Id";
			lClientId.style.border = "2px solid red";
			alert("clientId " + clientId);
			errorFatca = 1;
		}
		
		/******************* Applicant Name Validations ***************************/
		/*var applicantName = document.getElementById("idApplicantName");
		applicantName.style.border ="1px solid #ccc";
		document.getElementById('alertApplicantName').innerHTML="";
		var errorApplicantName = 0;
		if (hasValue(applicantName.value)) {
			var chkAlpha = isCharForName(applicantName.value);
			if (!chkAlpha){
				document.getElementById('alertApplicantName').innerHTML="Please enter only alphabets for Name";
				applicantName.style.border = "2px solid red";
				errorApplicantName = 1;
			}
		} else {
			document.getElementById('alertApplicantName').innerHTML="Name cannot be blank";
			applicantName.style.border = "2px solid red";
			errorApplicantName = 1;
		}
		*/
	}
	
	
	/******************* Tax Status ***************************/
	var lTaxStatus = document.getElementById("idTaxStatusFatca");
	var taxStatus = lTaxStatus.options[lTaxStatus.selectedIndex].value;
	lTaxStatus.style.border ="1px solid #ccc";
	document.getElementById('alertTaxStatusFatca').innerHTML="";
	if	(!hasValue(taxStatus)) {
		document.getElementById('alertTaxStatusFatca').innerHTML="Please select Tax Status";
		lTaxStatus.style.border = "2px solid red";
		alert("taxStatus " + taxStatus);
		errorFatca = 1;
	}
	
	/*******************  Data Source  ***************************/
	var lDataSource = document.getElementById("idDataSourceFatca");
	var dataSource = lDataSource.options[lDataSource.selectedIndex].value;
	lDataSource.style.border ="1px solid #ccc";
	document.getElementById('alertDataSourceFatca').innerHTML="";
	if	(!hasValue(dataSource)) {
		document.getElementById('alertDataSourceFatca').innerHTML="Please select Data Source";
		lDataSource.style.border = "2px solid red";
		alert("dataSource " + dataSource);
		errorFatca = 1;
	}
	
	/*******************  Address Type  ***************************/
	var lAddressType = document.getElementById("idAddressType");
	var addrType = lAddressType.options[lAddressType.selectedIndex].value;
	lAddressType.style.border ="1px solid #ccc";
	document.getElementById('alertAddressType').innerHTML="";
	if	(!hasValue(addrType)) {
		document.getElementById('alertAddressType').innerHTML="Please select Address Type";
		lAddressType.style.border = "2px solid red";
		alert("addrType " + addrType);
		errorFatca = 1;
	}
	
	/******************* Bank Account Number Validations ***************************/
	/*
	var bankAccountNo = document.getElementById("idBankAccountNumberFatca");
	bankAccountNo.style.border ="1px solid #ccc";
	document.getElementById('alertBankAccount').innerHTML="";
	var errorBankAccountNo = 0;
	if (hasValue(bankAccountNo.value)) {
		var bankAccountNoSession = sessionStorage.getItem("DEFAULT_BANK_ACC_NO");
		if(bankAccountNo.value != bankAccountNoSession) {
			document.getElementById('alertBankAccount').innerHTML="Not Matching with default Bank Account";
			bankAccountNo.style.border = "2px solid red";
			errorBankAccountNo = 1;
		}
	} else {
		document.getElementById('alertBankAccount').innerHTML="Default Account Number cannot be blank";
		bankAccountNo.style.border = "2px solid red";
		errorBankAccountNo = 1;
	}
	*/
	
	/******************* Place Of Birth Validations ***************************/
	var lPlaceOfBirth = document.getElementById("idPlaceOfBirthFatca");
	var placeOfBirth = lPlaceOfBirth.value;
	lPlaceOfBirth.style.border ="1px solid #ccc";
	document.getElementById('alertPlaceOfBirth').innerHTML="";
	var errorPlaceOfBirth = 0;
	if (hasValue(placeOfBirth)) {
		
	} else {
		document.getElementById('alertPlaceOfBirth').innerHTML = "Place of Birth cannot be blank";
		lPlaceOfBirth.style.border = "2px solid red";
		alert("placeOfBirth " + placeOfBirth);
		errorFatca = 1;
	}
	
	/******************* Country Of Birth Validations ***************************/
	
	var lCountryOfBirthDrop = document.getElementById("idCountryOfBirth");
	var countryOfBirth = lCountryOfBirthDrop.options[lCountryOfBirthDrop.selectedIndex].value;
	lCountryOfBirthDrop.style.border ="1px solid #ccc";
	document.getElementById('alertCountryOfBirth').innerHTML="";
	if	(countryOfBirth == "" || countryOfBirth == null) {
		document.getElementById('alertCountryOfBirth').innerHTML="Please select Country Of Birth";
		lCountryOfBirthDrop.style.border = "2px solid red";
		alert("countryOfBirth " + countryOfBirth);
		errorFatca = 1;
	//	alert("PolicyType "+errNLI);
	}
	
	/*******************  Country Of Tax Residency ***************************/
		
	var lCountryTax = document.getElementById("idCountryOfTaxResidency");
	var countryTax = lCountryTax.options[lCountryTax.selectedIndex].value;
	lCountryTax.style.border ="1px solid #ccc";
	document.getElementById('alertCountryOfTax').innerHTML="";
	if	(countryTax == "" || countryTax == null) {
		document.getElementById('alertCountryOfTax').innerHTML="Please select Country of Tax Residency";
		lCountryTax.style.border = "2px solid red";
		alert("countryTax " + countryTax);
		errorFatca = 1;
	//	alert("PolicyType "+errNLI);
	}
	
	/******************* Tax Payer Identification No. ***************************/
		
		var lTpin = document.getElementById("idTaxPayerIden");
		var tpin = lTpin.value;
		lTpin.style.border ="1px solid #ccc";
		document.getElementById('alertTaxPayerIden').innerHTML="";
		if	(tpin == "" || tpin == null) {
			document.getElementById('alertTaxPayerIden').innerHTML="Please enter Tax Payer Identification No.";
			lTpin.style.border = "2px solid red";
			alert("tpin " + tpin);
			errorFatca = 1;
		//	alert("PolicyType "+errNLI);
		}
	
	/*******************  Identification  Type ***************************/
	
	var lIdentificationType = document.getElementById("idIdentificationType");
	var identificationType = lIdentificationType.options[lIdentificationType.selectedIndex].value;
	lIdentificationType.style.border ="1px solid #ccc";
	document.getElementById('alertIdentificationType').innerHTML="";
	if	(identificationType == "" || identificationType == null) {
		document.getElementById('alertIdentificationType').innerHTML="Please select Identification  Type";
		lIdentificationType.style.border = "2px solid red";
		alert("identificationType " + identificationType);
		errorFatca = 1;
	}
	
	//================== Validation for Applicant 2  ===================	
		
		if(countApplicant2 > 0){
			
			/*******************  Country Of Tax Residency 2 ***************************/
			
			var lCountryTax2 = document.getElementById("idCountryOfTaxResidency2");
			var countryTax2 = lCountryTax2.options[lCountryTax2.selectedIndex].value;
			lCountryTax2.style.border ="1px solid #ccc";
			document.getElementById('alertCountryOfTaxResi2').innerHTML="";
			if	(countryTax2 == "" || countryTax2 == null) {
				document.getElementById('alertCountryOfTaxResi2').innerHTML="Please select Country of Tax Residency for Applicant 2";
				lCountryTax2.style.border = "2px solid red";
				alert("countryTax2 " + countryTax2);
				errorFatca = 1;
			}
			
			/******************* Tax Payer Identification No. 2 ***************************/
				
				var lTpin2 = document.getElementById("idTaxPayerIden2");
				var tpin2 = lTpin2.value;
				lTpin2.style.border ="1px solid #ccc";
				document.getElementById('alertTaxPayerIden2').innerHTML="";
				if	(tpin2 == "" || tpin2 == null) {
					document.getElementById('alertTaxPayerIden2').innerHTML="Please enter Tax Payer Identification No. for Applicant 2";
					lTpin2.style.border = "2px solid red";
					alert("tpin2 " + tpin2);
					errorFatca = 1;
				}
			
			/*******************  Identification  Type 2 ***************************/
			
			var lIdentificationType2 = document.getElementById("idIdentificationType2");
			var identificationType2 = lIdentificationType2.options[lIdentificationType2.selectedIndex].value;
			lIdentificationType2.style.border ="1px solid #ccc";
			document.getElementById('alertIdentificationType2').innerHTML="";
			if	(identificationType2 == "" || identificationType2 == null) {
				document.getElementById('alertIdentificationType2').innerHTML="Please select Identification Type for Applicant 2";
				lIdentificationType2.style.border = "2px solid red";
				alert("identificationType2 " + identificationType2);
				errorFatca = 1;
			}
			
		}
		
			
	
	//================== End of Validation for Applicant 2  ===================
	
		
		
	//================== Validation for Applicant 3  ===================	
		
		
		if(countApplicant3 > 0){
			
			/*******************  Country Of Tax Residency 3 ***************************/
			
			var lCountryTax3 = document.getElementById("idCountryOfTaxResidency3");
			var countryTax3 = lCountryTax3.options[lCountryTax3.selectedIndex].value;
			lCountryTax3.style.border ="1px solid #ccc";
			document.getElementById('alertCountryOfTaxResi3').innerHTML="";
			if	(countryTax3 == "" || countryTax3 == null) {
				document.getElementById('alertCountryOfTaxResi3').innerHTML="Please select Country of Tax Residency for Applicant 3";
				lCountryTax3.style.border = "2px solid red";
				alert("countryTax3 " + countryTax3);
				errorFatca = 1;
			}
			
			/******************* Tax Payer Identification No. ***************************/
			
			var lTpin3 = document.getElementById("idTaxPayerIden3");
			var tpin3 = lTpin3.value;
			lTpin3.style.border ="1px solid #ccc";
			document.getElementById('alertTaxPayerIden3').innerHTML="";
			if	(tpin3 == "" || tpin3 == null) {
				document.getElementById('alertTaxPayerIden3').innerHTML="Please enter Tax Payer Identification No.for Applicant 3";
				lTpin3.style.border = "2px solid red";
				alert("tpin3 " + tpin3);
				errorFatca = 1;
			}
			
			/*******************  Identification  Type ***************************/
			
			var lIdentificationType3 = document.getElementById("idIdentificationType3");
			var identificationType3 = lIdentificationType3.options[lIdentificationType3.selectedIndex].value;
			lIdentificationType3.style.border ="1px solid #ccc";
			document.getElementById('alertIdentificationType3').innerHTML="";
			if	(identificationType3 == "" || identificationType3 == null) {
				document.getElementById('alertIdentificationType3').innerHTML="Please select Identification Type for Applicant 3";
				lIdentificationType3.style.border = "2px solid red";
				alert("identificationType3 " + identificationType3);
				errorFatca = 1;
			}
			
		}
	
	//================== End of Validation for Applicant 3  ===================

	
		
	//================== Validation for Applicant 4 (or Guardian)  ===================	
		
	if(flagGuardian > 0) {
		/*******************  Country Of Tax Residency 4 ***************************/
		
		var lCountryTax4 = document.getElementById("idCountryOfTaxResidency4");
		var countryTax4 = lCountryTax4.options[lCountryTax4.selectedIndex].value;
		lCountryTax4.style.border ="1px solid #ccc";
		document.getElementById('alertCountryOfTaxResi4').innerHTML="";
		if	(countryTax4 == "" || countryTax4 == null) {
			document.getElementById('alertCountryOfTaxResi4').innerHTML="Please select Country of Tax Residency for Guardian";
			lCountryTax4.style.border = "2px solid red";
			alert("countryTax4 " + countryTax4);
			errorFatca = 1;
		}
		
		/******************* Tax Payer Identification No. 4 ***************************/
			
			var lTpin4 = document.getElementById("idTaxPayerIden4");
			var tpin4 = lTpin4.value;
			lTpin4.style.border ="1px solid #ccc";
			document.getElementById('alertTaxPayerIden4').innerHTML="";
			if	(tpin4 == "" || tpin4 == null) {
				document.getElementById('alertTaxPayerIden4').innerHTML="Please enter Tax Payer Identification No.for Guardian";
				lTpin4.style.border = "2px solid red";
				alert("tpin4 " + tpin4);
				errorFatca = 1;
			}
		
		/*******************  Identification  Type ***************************/
		
		var lIdentificationType4 = document.getElementById("idIdentificationType4");
		var identificationType4 = lIdentificationType4.options[lIdentificationType4.selectedIndex].value;
		lIdentificationType4.style.border ="1px solid #ccc";
		document.getElementById('alertIdentificationType4').innerHTML="";
		if	(identificationType4 == "" || identificationType4 == null) {
			document.getElementById('alertIdentificationType4').innerHTML="Please select Identification Type for Guardian";
			lIdentificationType4.style.border = "2px solid red";
			alert("identificationType4 " + identificationType4);
			errorFatca = 1;
		}
		
	}	
		
	//================== End of Validation for Applicant 4 (or Guardian)  ===================
	
		
	/******************* Validations for Source of Wealth ***************************/
	var lSourceWealth = document.getElementById("idSourceOfWealth");
	var sourceWealth = lSourceWealth.options[lSourceWealth.selectedIndex].value;
	lSourceWealth.style.border ="1px solid #ccc";
	document.getElementById('alertSourceOfWealth').innerHTML="";
	if	(sourceWealth == "" || sourceWealth == null) {
		document.getElementById('alertSourceOfWealth').innerHTML="Please select Source of Wealth";
		lSourceWealth.style.border = "2px solid red";
		alert("sourceWealth " + sourceWealth);
		errorFatca = 1;
	//	alert("PolicyType "+errNLI);
	}
	
	/******************* Gross Annual Income Validations ***************************/
	var lAnnualIncomeDrop = document.getElementById("idIncomeFatca");
	var annualIncome = lAnnualIncomeDrop.options[lAnnualIncomeDrop.selectedIndex].value;
	lAnnualIncomeDrop.style.border ="1px solid #ccc";
	document.getElementById('alertIncome').innerHTML="";
	var errorAnnualIncomeDrop = 0;
	if	(annualIncome == "" || annualIncome == null) {
		document.getElementById('alertIncome').innerHTML="Please select Gross income";
		lAnnualIncomeDrop.style.border = "2px solid red";
		alert("annualIncome " + annualIncome);
		errorFatca = 1;
	//	alert("PolicyType "+errNLI);
	}
	
	/*******************  Politically Exposed Person  ***************************/
	var lPoliticallyExposed = document.getElementById("idPoliticallyExposed");
	var politicallyExposed = lPoliticallyExposed.options[lPoliticallyExposed.selectedIndex].value;
	lPoliticallyExposed.style.border ="1px solid #ccc";
	document.getElementById('alertPoliticallyExposed').innerHTML="";
	if	(!hasValue(politicallyExposed)) {
		document.getElementById('alertPoliticallyExposed').innerHTML="Please select Politically Exposed Person";
		lPoliticallyExposed.style.border = "2px solid red";
		alert("politicallyExposed " + politicallyExposed);
		errorFatca = 1;
	}
	
	/******************* Occupation Validations ***************************/
	var lOccupationDrop = document.getElementById("idOccupationFatca");
	var occupation = lOccupationDrop.options[lOccupationDrop.selectedIndex].value;
	lOccupationDrop.style.border ="1px solid #ccc";
	document.getElementById('alertOccupation').innerHTML="";
	if	(occupation == "" || occupation == null) {
		document.getElementById('alertOccupation').innerHTML="Please select Occupation";
		lOccupationDrop.style.border = "2px solid red";
		alert("occupation " + occupation);
		errorFatca = 1;
	}
	
	/******************* Occupation Type ***************************/
	var lOccupationType = document.getElementById("idOccpTypeFatca");
	var occupationType = lOccupationType.options[lOccupationType.selectedIndex].value;
	lOccupationType.style.border ="1px solid #ccc";
	document.getElementById('alertOccpTypeFatca').innerHTML="";
	if	(!hasValue(occupationType)) {
		document.getElementById('alertOccpTypeFatca').innerHTML="Please select Occupation Type";
		lOccupationType.style.border = "2px solid red";
		alert("occupationType " + occupationType);
		errorFatca = 1;
	}
	
	/*******************  Exchange Name  ***************************/
	var lExchangeName = document.getElementById("idExchangeNameFatca");
	var exchangeName = lExchangeName.options[lExchangeName.selectedIndex].value;
	lExchangeName.style.border ="1px solid #ccc";
	document.getElementById('alertExchangeNameFatca').innerHTML="";
	if	(!hasValue(exchangeName)) {
		document.getElementById('alertExchangeNameFatca').innerHTML="Please select Exchange Name";
		lExchangeName.style.border = "2px solid red";
		alert("exchangeName " + exchangeName);
		errorFatca = 1;
	}
	
	/******************* CheckBox Validations ***************************/
	var acceptCheck = document.getElementById("idAccept");
	acceptCheck.style.border ="1px solid #ccc";
	document.getElementById('alertAccept').innerHTML="";
	$('#idAccept').css('outline-color', '');
	$('#idAccept').css('outline-style', '');
	$('#idAccept').css('outline-width', '');
	if ($("#idAccept").prop('checked') == false) {
		document.getElementById('alertAccept').innerHTML="Please accept Terms and Conditions to proceed";
		//acceptCheck.style.border = "2px solid red";
		//$("#idAccept").css("border","thin solid red");
		$('#idAccept').css('outline-color', 'red');
		$('#idAccept').css('outline-style', 'solid');
		$('#idAccept').css('outline-width', 'thin');
		alert("checkBox ");
		errorFatca = 1;
	//	alert("PolicyType "+errNLI);
	}
	
	
	
//---------------------------	
	
	/*var lCashBalanceType = document.getElementById("idCashBalanceTypeId");
	var lBankName = document.getElementById("idBankName");
	var lCurrentBalance = document.getElementById("idCurrentBalance");
    var errCash=0;

    lCashBalanceType.style.border ="1px solid #ccc";
	lCurrentBalance.style.border ="1px solid #ccc";
	lBankName.style.border ="1px solid #ccc";
	
	document.getElementById('alertBalanceType').innerHTML="";
	document.getElementById('alertCurrentBalance').innerHTML="";
	document.getElementById('alertBankName').innerHTML="";

	//validate cash balance type
	
	var cashType = lCashBalanceType.options[lCashBalanceType.selectedIndex].value;
    //alert('Cash Type: '+cashType); 
	if (cashType=="") {
		document.getElementById('alertBalanceType').innerHTML="Please enter Cash Balance Type";
		lCashBalanceType.style.border = "2px solid red";
	    errCash=1;
	}
	else if (cashType=="35" || cashType=="36" ) {
		if (!hasValue(lBankName.value)) {
			document.getElementById('alertBankName').innerHTML="Please enter Bank Name";
			lBankName.style.border = "2px solid red";
		    errCash=1;			
		}
	}
	
//	alert('After Balance Type validation');
	//return false;
	
	//validate current balance
	
	if (hasValue(lCurrentBalance.value)) {
		console.log("has value");
		//return false;
		lCurrentBalance.value = lCurrentBalance.value.replace(/,/g, '');
		console.log("1");
		if (lCurrentBalance.value == 0){
			console.log("2");
			document.getElementById('alertCurrentBalance').innerHTML="Current Balance cannot be 0";
			lCurrentBalance.style.border = "2px solid red";
			errCash=1;
		}
		else {
			var num = lCurrentBalance.value;
			console.log("3");
			if (!isDecimal(num)) {
				document.getElementById('alertCurrentBalance').innerHTML="Current Balance must be a positive decimal value not starting with 0";
				lCurrentBalance.style.border = "2px solid red";
				errCash=1;
			}
			else {
				console.log("4");
				var n = Number(num).toFixed(2);
				console.log("5");
				lCurrentBalance.value = n;
				console.log("6");
			}
		}
	}
	else {
		if (!hasValue(lCurrentBalance.value)) {
			document.getElementById('alertCurrentBalance').innerHTML="Please enter Current Balance ";
			lCurrentBalance.style.border = "2px solid red";
			errCash=1;
		}		
	}
	

	//alert("After Current Balance validation: " + errCash);
	//return false;
	
	*/
	//alert("errorFatca " +  errorFatca);
	if (errorFatca==1 ){
		//console.log("Validation Error in Cash");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		console.log("Not an Error");
		document.getElementById('alertform').innerHTML="";
		return true;
	}
}

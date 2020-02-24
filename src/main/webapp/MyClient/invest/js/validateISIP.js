function validateIsipForm(form, mode){
	var errorIsip = 0;
	
	/*********** validate Select Client Id **********/
	if (mode == "UCC"){
		// for mnain flow
		var lClientId = document.getElementById("idClientUCCText");
		var cltId = lClientId.value;
		lClientId.style.border = "1px solid #ccc";
		document.getElementById('alertClientId').innerHTML="";
		if(!hasValue(cltId)){
			document.getElementById('alertClientId').innerHTML="Please select Client Id ";
			lClientId.style.border = "2px solid red";
			errorIsip=1;
		}
	} else {
		// for sidebar flow
		var lClientId = document.getElementById("idClientUCCCombo");
		var cltId = lClientId.options[lClientId.selectedIndex].value;
		lClientId.style.border = "1px solid #ccc";
		document.getElementById('alertClientId').innerHTML="";
		if(!hasValue(cltId)){
			document.getElementById('alertClientId').innerHTML="Please select Client Id ";
			lClientId.style.border = "2px solid red";
			errorIsip=1;
		}
	}
	
	
	
	/******************* Bank Name Validations ***************************/
	var lBankNameDrop = document.getElementById("idBankNameIsip");
	var bankName = lBankNameDrop.options[lBankNameDrop.selectedIndex].value;
	lBankNameDrop.style.border ="1px solid #ccc";
	document.getElementById('alertBankName').innerHTML="";
	if	(bankName == "" || bankName == null) {
		document.getElementById('alertBankName').innerHTML="Please Select Bank Name";
		lBankNameDrop.style.border = "2px solid red";
		errorIsip = 1;
	//	alert("PolicyType "+errNLI);idACCNOISIP
	//	alert("End");
	}
	
	/*********** validate Select IFSC Code **********/
	var lIfscCode = document.getElementById("idIFSC");
	var ifscCode = lIfscCode.options[lIfscCode.selectedIndex].value;
	lIfscCode.style.border = "1px solid #ccc";
	document.getElementById('alertIfscCode').innerHTML="";
	if(!hasValue(ifscCode)){
		document.getElementById('alertIfscCode').innerHTML="Please select IFSC Code ";
		lIfscCode.style.border = "2px solid red";
		errorIsip = 1;
	}
	
	/*********** validate Select IFSC Code **********/
	var lIfscCode = document.getElementById("idIFSC");
	var ifscCode = lIfscCode.options[lIfscCode.selectedIndex].value;
	lIfscCode.style.border = "1px solid #ccc";
	document.getElementById('alertIfscCode').innerHTML="";
	if(!hasValue(ifscCode)){
		document.getElementById('alertIfscCode').innerHTML="Please select IFSC Code ";
		lIfscCode.style.border = "2px solid red";
		errorIsip = 1;
	}
	
	/******************* Bank Account No. Validations ***************************/
	var lAccountNumber = document.getElementById("idACCNOISIP");
	var accNo = lAccountNumber.options[lAccountNumber.selectedIndex].value;
	lAccountNumber.style.border ="1px solid #ccc";
	document.getElementById('alertAccountNumber').innerHTML="";
	if (hasValue(accNo)) {
		var chkAlpha = isNumeric(accNo);
		if (!chkAlpha){
			document.getElementById('alertAccountNumber').innerHTML="Account Number can only be numeric";
			lAccountNumber.style.border = "2px solid red";
			errorIsip = 1;
		}
	} else {
		document.getElementById('alertAccountNumber').innerHTML="Account Number cannot be blank";
		lAccountNumber.style.border = "2px solid red";
		errorIsip = 1;
	}
	
	/******************* Mandate Amount Validations ***************************/
	var lAmount = document.getElementById("idAmountISIP");
	var amount = lAmount.value;
	lAmount.style.border ="1px solid #ccc";
	document.getElementById('alertAmount').innerHTML="";
	if (hasValue(amount)) {
		var chkAlpha = isNumeric(amount);
		if (!chkAlpha){
			document.getElementById('alertAmount').innerHTML="Amount Invested cannot be in decimal ";
			lAmount.style.border = "2px solid red";
			errorIsip = 1;
		}
	} else {
		document.getElementById('alertAmount').innerHTML="Amount cannot be blank";
		lAmount.style.border = "2px solid red";
		errorIsip = 1;
	}
	
	/******************* Mandate Type Validations ***************************/
	var lMandateTypeDrop = document.getElementById("idMandateTypeIsip");
	var mandateType = lMandateTypeDrop.options[lMandateTypeDrop.selectedIndex].value;
	lMandateTypeDrop.style.border ="1px solid #ccc";
	document.getElementById('alertMandateType').innerHTML="";
	if	(mandateType == "" || mandateType == null) {
		document.getElementById('alertMandateType').innerHTML="Please Select Mandate Type";
		lMandateTypeDrop.style.border = "2px solid red";
		errorIsip = 1;
	//	alert("PolicyType "+errNLI);
	}
	
	/******************* From Date Validations ***************************/
	var lFromDate = document.getElementById("idInvestmentStartDate");
	var frmDate = lFromDate.value;
	lFromDate.style.border ="1px solid #ccc";
	document.getElementById('alertFromDate').innerHTML="";
	if(!hasValue(frmDate)){
		document.getElementById('alertFromDate').innerHTML="Please enter From Date";
		lFromDate.style.border = "2px solid red";
		errorIsip = 1;
	}
	
	/******************* To-Date Validations ***************************/
	var lToDate = document.getElementById("idEndDate");
	var toDate = lToDate.value;
	lToDate.style.border ="1px solid #ccc";
	document.getElementById('alertToDate').innerHTML="";
	if(!hasValue(toDate)){
		document.getElementById('alertToDate').innerHTML="Please enter To Date";
		lToDate.style.border = "2px solid red";
		errorIsip = 1;
	}
	
	
	if (errorIsip == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
	/*if (errorBankNameDrop == 1 || errorBranchName == 1 || errorAccountNumber == 1 || errorAmount == 1 || errorMandateTypeDrop == 1) {
		return false;
	}
	return true;*/
	
	
}

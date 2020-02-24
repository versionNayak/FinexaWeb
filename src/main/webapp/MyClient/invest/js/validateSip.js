function validateISIP(form)
{
	
	var lClientId = document.getElementById("idClientUCCCombo");
	var lTransactionMode = document.getElementById("idTransMode");
	var lSchemeType = document.getElementById("idSchemeType");
	var lAmcName = document.getElementById("idAmcName");
	var lSchemeName = document.getElementById("idSchemeName");
	var lIsinNo = document.getElementById("idIsinNo");
	var lSchemeId = document.getElementById("idSchemeId");
	var lInstallAmt = document.getElementById("idInstallmentAmount");
	var lFreType = document.getElementById("idFreqType");
	var lInstallmentNo = document.getElementById("idNoOfInstallment");
	var lStrDate = document.getElementById("idStartDate");
	var lFirstOdrFlag = document.getElementById("idFirstOrderFlag");
	var lRegType = document.getElementById("idRegistrationType");
	var lXsipId = document.getElementById("idXSIPMandateid");
	var lEuinDeclaration = document.getElementById("idEUINDeclaration");
	var lEuin = document.getElementById("idEuin");
	var errMF = 0;
	
	
	lClientId.style.border = "1px solid #ccc";
	lTransactionMode.style.border = "1px solid #ccc";
	lSchemeType.style.border = "1px solid #ccc";
	lAmcName.style.border = "1px solid #ccc";
	lSchemeName.style.border = "1px solid #ccc";
	lIsinNo.style.border = "1px solid #ccc";
	lSchemeId.style.border = "1px solid #ccc";
	lInstallAmt.style.border = "1px solid #ccc";
	lFreType.style.border = "1px solid #ccc";
	lInstallmentNo.style.border = "1px solid #ccc";
	lStrDate.style.border = "1px solid #ccc";
	lFirstOdrFlag.style.border = "1px solid #ccc";
	lRegType.style.border = "1px solid #ccc";
	lXsipId.style.border = "1px solid #ccc";
	lEuinDeclaration.style.border = "1px solid #ccc";
	lEuin.style.border = "1px solid #ccc";
	
	
    document.getElementById('alertClientCode').innerHTML="";
	document.getElementById('alertTransactionMode').innerHTML="";
	document.getElementById('alertSchemeType').innerHTML="";
	document.getElementById('alertAmcName').innerHTML="";
	document.getElementById('alertSchemeName').innerHTML="";
	document.getElementById('alertIsinNo').innerHTML="";
	document.getElementById('alertSchemeId').innerHTML="";
	document.getElementById('alertInstallmentAmount').innerHTML="";
	document.getElementById('alertFreType').innerHTML="";
	document.getElementById('alertNoOfInstallment').innerHTML="";
	document.getElementById('alertStartDate').innerHTML="";
	document.getElementById('alertFirstOrderFlag').innerHTML="";
	document.getElementById('alertRegistrationType').innerHTML="";
	document.getElementById('alertXSIPMandateid').innerHTML="";
	document.getElementById('alertSubBrokerCode').innerHTML="";
	document.getElementById('alertSubBrokerARNCode').innerHTML="";
	document.getElementById('alertEuinDeclaration').innerHTML="";
	document.getElementById('alertEuin').innerHTML="";
	document.getElementById('alertform').innerHTML="";
	

    
	//validate Select Client Id
	var cId = lClientId.options[lClientId.selectedIndex].value;
	if(!hasValue(cId)){
		document.getElementById('alertClientCode').innerHTML="Please select Client Id ";
		lClientId.style.border = "2px solid red";
		errMF=1;
	}

	
	// validate Transaction Mode
	var trnMode = lTransactionMode.options[lTransactionMode.selectedIndex].value;
	if(!hasValue(trnMode)){
		document.getElementById('alertTransactionMode').innerHTML="Please enter Transaction Mode ";
		lTransactionMode.style.border = "2px solid red";
		errMf=1;
	}
	
	//validate Scheme Type
	var scType = lSchemeType.options[lSchemeType.selectedIndex].value;
	if(!hasValue(scType)){
		document.getElementById('alertSchemeType').innerHTML="Please enter Scheme Type";
		lSchemeType.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Select AMC Code
	var amc = lAmcName.options[lAmcName.selectedIndex].value;
	if(!hasValue(amc)){
		document.getElementById('alertAmcName').innerHTML="Please select AMC Name ";
		lAmcName.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Scheme Name
	var scName = lSchemeName.options[lSchemeName.selectedIndex].value;
	if(!hasValue(scName)){
		document.getElementById('alertSchemeName').innerHTML="Please select Scheme Name";
		lSchemeName.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate ISIN No.
	var isin = lIsinNo.value;
	if(!hasValue(isin)){
		document.getElementById('alertIsinNo').innerHTML="Please enter ISIN No.";
		lIsinNo.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Scheme Code
	var scId = lSchemeId.value;
	if(!hasValue(scId)){
		document.getElementById('alertSchemeId').innerHTML="Please enter Scheme Code/Id";
		lSchemeId.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Installment Amount
	var insAmt = lInstallAmt.value;
	if(!hasValue(insAmt)){
		document.getElementById('alertInstallmentAmount').innerHTML="Please enter Installment Amount";
		lInstallAmt.style.border = "2px solid red";
		errMF=1;
	} else {
		if (hasValue(insAmt)) {
			if (!isNumeric(insAmt)) {
				document.getElementById('alertInstallmentAmount').innerHTML="Amount cannot be decimal";
				lInstallAmt.style.border = "2px solid red";
				errMF=1;
			}
		}
	}
	
	//validate Frequency Type
	var freType = lFreType.options[lFreType.selectedIndex].value;
	if(!hasValue(freType)){
		document.getElementById('alertFreType').innerHTML="Please select Frequency Type ";
		lFreType.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate No. of Installment
	var installNo = lInstallmentNo.value;
	if(!hasValue(installNo)){
		document.getElementById('alertNoOfInstallment').innerHTML="Please enter No. of Installment ";
		lInstallmentNo.style.border = "2px solid red";
		errMF = 1;
	}
	
	//validate SIP Start Date
	var strDate = lStrDate.value;
	if(!hasValue(strDate)){
		document.getElementById('alertStartDate').innerHTML="Please enter Start Date";
		lStrDate.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate First Order Flag
	var firOrdFlag = lFirstOdrFlag.options[lFirstOdrFlag.selectedIndex].value;
	if(!hasValue(firOrdFlag)){
		document.getElementById('alertFirstOrderFlag').innerHTML="Please enter First Order Flag ";
		lFirstOdrFlag.style.border = "2px solid red";
		errMf=1;
	}
	
	// validate Registration Type
	var regType = lRegType.options[lRegType.selectedIndex].value;
	if(!hasValue(regType)){
		document.getElementById('alertRegistrationType').innerHTML="Please select Registration Type ";
		lRegType.style.border = "2px solid red";
		errMf=1;
	}
	
	//validate Mandateid
	var folioNo = lXsipId.value;
	if(!hasValue(folioNo)){
		document.getElementById('alertXSIPMandateid').innerHTML="Please enter Mandateid";
		lXsipId.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate EUIN Declaration 
	var euDec = lEuinDeclaration.options[lEuinDeclaration.selectedIndex].value;
	if(!hasValue(euDec)){
		document.getElementById('alertEuinDeclaration').innerHTML="Please select EUIN Declaration ";
		lEuinDeclaration.style.border = "2px solid red";
		errMF = 1;
	} else {
		if (euDec == "Y") {
			// validate EUIN
			var euin = lEuin.value;
			if(!hasValue(euin)){
				document.getElementById('alertEuin').innerHTML="Please enter EUIN ";
				lEuin.style.border = "2px solid red";
				errMF = 1;
			}
		}
	}
	
	/*
	 * 
	 * ================ Commented Section =====================
	 
	//validate SIP End Date
	var endDate = lEndDate.value;
	if(!hasValue(endDate)){
		document.getElementById('alertEndDate').innerHTML="Please enter End Date";
		lEndDate.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate Amount Invested
	var amtInvt = lAmountInvested.value;
	if(!hasValue(amtInvt)){
		document.getElementById('alertAmountInvested').innerHTML="Please enter Amount Invested ";
		lAmountInvested.style.border = "2px solid red";
		errMF = 1;
	}
	
	// validate XSIP Mandateid
	var xsip = lXsipId.options[lXsipId.selectedIndex].value;
	if(!hasValue(xsip)){
		document.getElementById('alertXSIPMandateid').innerHTML="Please enter XSIP Mandateid ";
		lXsipId.style.border = "2px solid red";
		errMf=1;
	}
	
	*=================== End of Commented Section ===================
	*
	*/
	
	if (errMF==1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		console.log("Not an Error");
		return true;
	}
	
	
	
}
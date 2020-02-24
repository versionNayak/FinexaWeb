function validateSTPForm(form)
{
	
	var lClientId = document.getElementById("idClientUCCCombo");
	var lTransMode = document.getElementById("idTransMode");
	var lAmcName = document.getElementById("idAmcName");
	var lFrmSchemeType = document.getElementById("idFromSchemeType");
	var lFrmSchName = document.getElementById("idFromSchemeName");
	var lFrmIsinNo = document.getElementById("idFromIsinNo");
	var lFrmSchemeId = document.getElementById("idFromSchemeId");
	var lToSchemeType = document.getElementById("idToSchemeType");
	
	var lToSchName = document.getElementById("idToSchemeName");
	var lToIsinNo = document.getElementById("idToIsinNo");
	var lToSchemeId = document.getElementById("idToSchemeCode");
	var lFolioNumber = document.getElementById("idFolioNumber");
	var lInstallAmount = document.getElementById("idSwitchAmount");
//	var lNoTransfers = document.getElementById("idSwitchUnits");
	var lFrequencyType = document.getElementById("idFrequencyType");
	var lTranacType = document.getElementById("idTransactionType");
	
	var lStrDate = document.getElementById("idStartDate");
	var lTranfers = document.getElementById("idNoOfTransfers");
	var lFirstOdrFlag = document.getElementById("idFirstOrderFlag");
	var lSubBrokerCode = document.getElementById("idSubBrokerCode");
	var lSubBrokerARNCode = document.getElementById("idSubBrokerARNCode");
	var lEuinDeclaration = document.getElementById("idEUINDeclaration");
	var lEuin = document.getElementById("idEuin");
	
	var errMF=0;
	
	
	lClientId.style.border = "1px solid #ccc";
	lTransMode.style.border = "1px solid #ccc";
	lAmcName.style.border = "1px solid #ccc";
	lFrmSchemeType.style.border = "1px solid #ccc";
	lFrmSchName.style.border = "1px solid #ccc";
	lFrmIsinNo.style.border = "1px solid #ccc";
	lFrmSchemeId.style.border = "1px solid #ccc";
	lToSchemeType.style.border = "1px solid #ccc";
	
	lToSchName.style.border = "1px solid #ccc";
	lToIsinNo.style.border = "1px solid #ccc";
	lToSchemeId.style.border = "1px solid #ccc";
	lFolioNumber.style.border = "1px solid #ccc";
	lInstallAmount.style.border = "1px solid #ccc";
//	lNoTransfers.style.border = "1px solid #ccc";
	lFrequencyType.style.border = "1px solid #ccc";
	lTranacType.style.border = "1px solid #ccc";
	
	lStrDate.style.border = "1px solid #ccc";
	lTranfers.style.border = "1px solid #ccc";
	lFirstOdrFlag.style.border = "1px solid #ccc";
	lSubBrokerCode.style.border = "1px solid #ccc";
	lSubBrokerARNCode.style.border = "1px solid #ccc";
	lEuinDeclaration.style.border = "1px solid #ccc";
	lEuin.style.border = "1px solid #ccc";
	
	
    document.getElementById('alertClientCode').innerHTML="";
	document.getElementById('alertTransacType').innerHTML="";
	document.getElementById('alertAmcName').innerHTML="";
	document.getElementById('alertFromSchemeType').innerHTML="";
	document.getElementById('alertFromSchemeName').innerHTML="";
	document.getElementById('alertFromIsinNo').innerHTML="";
	document.getElementById('alertFromSchemeId').innerHTML="";
	document.getElementById('alertToSchemeType').innerHTML="";
	
	document.getElementById('alertToSchemeName').innerHTML="";
	document.getElementById('alertToIsinNo').innerHTML="";
	document.getElementById('alertToSchemeCode').innerHTML="";
	document.getElementById('alertFolioNumber').innerHTML="";
	document.getElementById('alertInstallAmount').innerHTML="";
	//document.getElementById('alertNoTranfers').innerHTML="";
	document.getElementById('alertFrequencyType').innerHTML="";
	document.getElementById('alertTransactionType').innerHTML="";
	
	document.getElementById('alertStartDate').innerHTML="";
	document.getElementById('alertNoOfTransfers').innerHTML="";
	document.getElementById('alertFirstOrderFlag').innerHTML="";
	document.getElementById('alertSubBrokerCode').innerHTML="";
	document.getElementById('alertSubBrokerARNCode').innerHTML="";
	document.getElementById('alertEuinDeclaration').innerHTML="";
	document.getElementById('alertEuin').innerHTML="";
	document.getElementById('alertform').innerHTML="";
	
	
	//validate Select Client Id(UCC)
	var client = lClientId.options[lClientId.selectedIndex].value;
	if(!hasValue(client)){
		document.getElementById('alertClientCode').innerHTML="Please select Client Code ";
		lClientId.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate Transaction Mode
	var trnMode = lTransMode.options[lTransMode.selectedIndex].value;
	if(!hasValue(trnMode)){
		document.getElementById('alertTransacType').innerHTML="Please select Transaction Mode ";
		lTransMode.style.border = "2px solid red";
		errMf=1;
	}
	
	//validate Select AMC Code
	var amc = lAmcName.value;
	if(!hasValue(amc)){
		document.getElementById('alertAmcName').innerHTML="Please select AMC Name ";
		lAmcName.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate From Scheme Type
	var scFrType = lFrmSchemeType.options[lFrmSchemeType.selectedIndex].value;
	if(!hasValue(scFrType)){
		document.getElementById('alertFromSchemeType').innerHTML="Please enter From Scheme Type";
		lFrmSchemeType.style.border = "2px solid red";
		errMF=1;
	}
	
	
	//validate From Scheme Name
	var scFrmName = lFrmSchName.options[lFrmSchName.selectedIndex].value;
	if(!hasValue(scFrmName)){
		document.getElementById('alertFromSchemeName').innerHTML="Please select From Scheme Name";
		lFrmSchName.style.border = "2px solid red";
		errMF=1;
	}
	
	
	//validate From ISIN No.
	var frmIsin = lFrmIsinNo.value;
	if(!hasValue(frmIsin)){
		document.getElementById('alertFromIsinNo').innerHTML="Please enter From ISIN No.";
		lFrmIsinNo.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate From Scheme Id
	var frSchId = lFrmSchemeId.value;
	if(!hasValue(frSchId)){
		document.getElementById('alertFromSchemeId').innerHTML="Please enter From Scheme Code/Id";
		lFrmSchemeId.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate To Scheme Type
	var toSchType = lToSchemeType.options[lToSchemeType.selectedIndex].value;
	if(!hasValue(toSchType)){
		document.getElementById('alertToSchemeType').innerHTML="Please enter To Scheme Type";
		lToSchemeType.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate To Scheme Name
	var scToName = lToSchName.options[lToSchName.selectedIndex].value;
	if(!hasValue(scToName)){
		document.getElementById('alertToSchemeName').innerHTML="Please select To Scheme Name";
		lToSchName.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate To ISIN No.
	var toIsin = lToIsinNo.value;
	if(!hasValue(toIsin)){
		document.getElementById('alertToIsinNo').innerHTML="Please enter To ISIN No.";
		lToIsinNo.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate To Scheme Id
	var toSchId = lToSchemeId.value;
	if(!hasValue(toSchId)){
		document.getElementById('alertToSchemeCode').innerHTML="Please enter To Scheme Code/Id";
		lToSchemeId.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate Transaction Type
	var tranType = lTranacType.options[lTranacType.selectedIndex].value;
	if(!hasValue(tranType)){
		document.getElementById('alertTransactionType').innerHTML="Please select Transaction Type ";
		lTranacType.style.border = "2px solid red";
		errMf=1;
	}

	//validate Folio No.
	var folioNo = lFolioNumber.value;
	if (trnMode == "P"){
		if(!hasValue(folioNo)){
			document.getElementById('alertFolioNumber').innerHTML="Please enter Folio No.";
			lFolioNumber.style.border = "2px solid red";
			errMF=1;
		}
	}
	

	
	// validate Installment Amount
	var swtAmt = lInstallAmount.value;
	if(!hasValue(swtAmt)){
		document.getElementById('alertInstallAmount').innerHTML="Please enter Installment Amount ";
		lInstallAmount.style.border = "2px solid red";
		errMF = 1;
	} else {
		if (hasValue(swtAmt)) {
			if (!isNumeric(swtAmt)) {
				document.getElementById('alertInstallAmount').innerHTML="Amount cannot be in decimal";
				lInstallAmount.style.border = "2px solid red";
				errMF = 1;
			}
		}
	}
	
	// validate No. of Transfers
	/*var swtUnt = lNoTransfers.value;
	if(!hasValue(swtUnt)){
		document.getElementById('alertNoTranfers').innerHTML="Please enter No. of Transfers ";
		lNoTransfers.style.border = "2px solid red";
		errMF = 1;
	}*/
	
	// validate Inits Flag
/*	var initFlag = lInitFlag.value;
	if(!hasValue(initFlag)){
		document.getElementById('alertInitFlag').innerHTML="Please enter AI init Flag ";
		lInitFlag.style.border = "2px solid red";
		errMF = 1;
	}*/
	
	// validate Frequency Type
	var freType = lFrequencyType.options[lFrequencyType.selectedIndex].value;
	if(!hasValue(freType)){
		document.getElementById('alertFrequencyType').innerHTML="Please select Frequency Type ";
		lFrequencyType.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate SIP Start Date
	var strDate = lStrDate.value;
	if(!hasValue(strDate)){
		document.getElementById('alertStartDate').innerHTML="Please enter Start Date";
		lStrDate.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate No. of Transfers
	var transferNo = lTranfers.value;
	if(!hasValue(transferNo)){
		document.getElementById('alertNoOfTransfers').innerHTML="Please enter No. of Transfers ";
		lTranfers.style.border = "2px solid red";
		errMF = 1;
	}
	
	//validate SIP End Date
/*	var endDate = lEndDate.value;
	if(!hasValue(endDate)){
		document.getElementById('alertSTPEndDate').innerHTML="Please enter End Date";
		lEndDate.style.border = "2px solid red";
		errMF=1;
	}*/
	
	// validate First Order Flag
	var firOrdFlag = lFirstOdrFlag.options[lFirstOdrFlag.selectedIndex].value;
	if(!hasValue(firOrdFlag)){
		document.getElementById('alertFirstOrderFlag').innerHTML="Please enter First Order Flag ";
		lFirstOdrFlag.style.border = "2px solid red";
		errMf=1;
	}
	
	// validate Sub Broker Code
	/*var subCode = lSubBrokerCode.value;
	if(!hasValue(subCode)){
		document.getElementById('alertSubBrokerCode').innerHTML="Please enter Sub Broker Code ";
		lSubBrokerCode.style.border = "2px solid red";
		errMF = 1;
	}*/
	
	// validate Sub Broker ARN Code
	/*var subArn = lSubBrokerARNCode.value;
	if(!hasValue(subArn)){
		document.getElementById('alertSubBrokerARNCode').innerHTML="Please enter Sub Broker ARN ";
		lSubBrokerARNCode.style.border = "2px solid red";
		errMF = 1;
	}*/
	
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
	
	
	if (errMF==1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		document.getElementById('alertform').innerHTML="";
		console.log("Not an Error");
		return true;
	}
	
	
}
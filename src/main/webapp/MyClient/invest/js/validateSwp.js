function validateFormSWP(form)
{
	var lClientId = document.getElementById("idClientUCCCombo");
	var lTransactionMode = document.getElementById("idTransMode");
	var lSchemeType = document.getElementById("idSchemeType");
	var lAmcName = document.getElementById("idAmcName");
	var lSchemeName = document.getElementById("idSchemeName");
	
	var lIsinNo = document.getElementById("idIsinNo");
	var lSchemeId = document.getElementById("idSchemeId");
	var lFolioNumber = document.getElementById("idFolioNumber");
	var lWithAmount = document.getElementById("idWithdrawalAmount");
	var lWithUnits = document.getElementById("idWithdrawalUnits");
	
	var lFreType = document.getElementById("idFrequencyType");
	var lStrDate = document.getElementById("idStartDate");
	var lWithdrawalNo = document.getElementById("idNoOfWithdrawals");
	var lFirstOdrFlag = document.getElementById("idFirstOrderFlag");
	var lSubBrokerCode = document.getElementById("idSubBrokerCode");
	
	var lSubBrokerARNCode = document.getElementById("idSubBrokerARNCode");
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
	lFolioNumber.style.border = "1px solid #ccc";
	lWithAmount.style.border = "1px solid #ccc";
	lWithUnits.style.border = "1px solid #ccc";
	
	lFreType.style.border = "1px solid #ccc";
	lStrDate.style.border = "1px solid #ccc";
	lWithdrawalNo.style.border = "1px solid #ccc";
	lFirstOdrFlag.style.border = "1px solid #ccc";
	lSubBrokerCode.style.border = "1px solid #ccc";
	
	lSubBrokerARNCode.style.border = "1px solid #ccc";
	lEuinDeclaration.style.border = "1px solid #ccc";
	lEuin.style.border = "1px solid #ccc";
	
    
    document.getElementById('alertClientCode').innerHTML="";
	document.getElementById('alertTransactionMode').innerHTML="";
	document.getElementById('alertSchemeType').innerHTML="";
	document.getElementById('alertAmcName').innerHTML="";
	document.getElementById('alertSchemeName').innerHTML="";

	document.getElementById('alertIsinNo').innerHTML="";
	document.getElementById('alertSchemeId').innerHTML="";
	document.getElementById('alertFolioNumber').innerHTML="";
	document.getElementById('alertWithdrawalAmount').innerHTML="";
	document.getElementById('alertWithdrawalUnits').innerHTML="";
	
	document.getElementById('alertFrequencyType').innerHTML="";
	document.getElementById('alertStartDate').innerHTML="";
	document.getElementById('alertNoOfWithdrawals').innerHTML="";
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
	var trnMode = lTransactionMode.options[lTransactionMode.selectedIndex].value;
	if(!hasValue(trnMode)){
		document.getElementById('alertTransactionMode').innerHTML="Please select Transaction Mode ";
		lTransactionMode.style.border = "2px solid red";
		errMf=1;
	}
	
	//validate Scheme Type
	//var scType = lSchemeType.value;
	var scType = lSchemeType.options[lSchemeType.selectedIndex].value;
	if(!hasValue(scType)){
		document.getElementById('alertSchemeType').innerHTML="Please select Scheme Type";
		lSchemeType.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Select AMC Code
	//var amc = lAmcName.value;
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
	
	//validate Scheme Id
	var scId = lSchemeId.value;
	//if (scId=="null")
	if(!hasValue(scId)){
		document.getElementById('alertSchemeId').innerHTML="Please enter Scheme Code/Id";
		lSchemeId.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Folio No.
	var folioNo = lFolioNumber.value;
	if(trnMode == "P"){
		if(!hasValue(folioNo)){
			document.getElementById('alertFolioNumber').innerHTML="Please enter Folio No.";
			lFolioNumber.style.border = "2px solid red";
			errMF=1;
		}
	}
	
	
	
	// validate Withdrawal Amount  || validate Withdrawal Units
	var withAmt = lWithAmount.value;
	var withUnit = lWithUnits.value;
	
	if(!hasValue(withAmt) && !hasValue(withUnit)){
		document.getElementById('alertWithdrawalAmount').innerHTML="Please enter either Withdrawal Amount or Withdrawal unit";
		lWithAmount.style.border = "2px solid red";
		errMF = 1;
	}
	else if(hasValue(withAmt) && hasValue(withUnit)){
		document.getElementById('alertWithdrawalAmount').innerHTML="Please enter either Withdrawal Amount or Withdrawal unit";
		lWithAmount.style.border = "2px solid red";
		errMF = 1;
	}
	else {
		if (hasValue(withAmt)) {
			
			if (trnMode != "P"){
				/*** To Check if the client is Demat or not ***/
				/*** Demat Client are only allowed to have UNITS ***/
				document.getElementById('alertWithdrawalAmount').innerHTML="Demat Clients are only allowed to enter Withdrawal Units ";
				lWithAmount.style.border = "2px solid red";
				errMF=1;
			} else if (trMode == "P") {
				/** For Checking Amount is in decimal or not, after checking the 'Transaction Mode' is Physical  **/
				if (!isNumeric(withAmt)) {
					document.getElementById('alertWithdrawalAmount').innerHTML="Amount cannot be in decimal";
					lWithAmount.style.border = "2px solid red";
					errMF=1;
				}
			}
			
			
			
		}
		else{
			// validate Units 
			
			
			if(!hasValue(withUnit)){
				document.getElementById('alertWithdrawalUnits').innerHTML="Please enter Withdrawal Units ";
				lWithUnits.style.border = "2px solid red";
				errMF = 1;
			}
			else{
				if (!isNumeric(withUnit)){
					document.getElementById('alertWithdrawalUnits').innerHTML="Units cannot be in decimal ";
					lWithUnits.style.border = "2px solid red";
					errMF = 1;
				}
			}
		}
	}
	
	
	
	// validate Frequency Type
	var frequency = lFreType.options[lFreType.selectedIndex].value;
	if(!hasValue(frequency)){
		document.getElementById('alertFrequencyType').innerHTML="Please select Frequency Type ";
		lFreType.style.border = "2px solid red";
		errMf=1;
	}
	
	//validate SWP Start Date
	var strDate = lStrDate.value;
	if(!hasValue(strDate)){
		document.getElementById('alertStartDate').innerHTML="Please enter Start Date";
		lStrDate.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate No. of Withdrawal
	var withNo = lWithdrawalNo.value;
	if(!hasValue(withNo)){
		document.getElementById('alertNoOfWithdrawals').innerHTML="Please enter No. of Withdrawals ";
		lWithdrawalNo.style.border = "2px solid red";
		errMF = 1;
	}
	
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
		console.log("Not an Error");
		return true;
	}
	
	
}
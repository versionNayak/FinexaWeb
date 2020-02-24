function validateLumpsum(form)
{
	
	var lClientId = document.getElementById("idClientUCCCombo");
	var lTransactionMode = document.getElementById("idTransMode");
	var lSchemeType = document.getElementById("idSchemeType");
	var lAmcName = document.getElementById("idAmcName");
	var lSchemeName = document.getElementById("idSchemeName");
	var lIsinNo = document.getElementById("idIsinNo");
	var lSchemeId = document.getElementById("idSchemeId");
	var lTransactionType = document.getElementById("idTransactionType");
	var lFolioNumber = document.getElementById("idFolioNumber");
	var lAmountInvested = document.getElementById("idAmountInvested");
	var lUnitsPurchased = document.getElementById("idUnitsPurchased");
	var lEuinDeclaration = document.getElementById("idEUINFlag");
	var lEuin = document.getElementById("idEUIN");
	var lSubBrokerARNCode = document.getElementById("idsubBrokerCode");
	var lSubBrokerCode = document.getElementById("idSubBrokerName");
	var errMF = 0;
	
	
	lClientId.style.border = "1px solid #ccc";
	lTransactionMode.style.border = "1px solid #ccc";
	lSchemeType.style.border = "1px solid #ccc";
	lAmcName.style.border = "1px solid #ccc";
	lSchemeName.style.border = "1px solid #ccc";
	lIsinNo.style.border = "1px solid #ccc";
	lSchemeId.style.border = "1px solid #ccc";
	lTransactionType.style.border = "1px solid #ccc";
	lFolioNumber.style.border = "1px solid #ccc";
	lAmountInvested.style.border = "1px solid #ccc";
	lUnitsPurchased.style.border = "1px solid #ccc";
	lEuinDeclaration.style.border = "1px solid #ccc";
	lEuin.style.border = "1px solid #ccc";
	lSubBrokerARNCode.style.border = "1px solid #ccc";
	lSubBrokerCode.style.border = "1px solid #ccc";
	
    
    document.getElementById('alertClientId').innerHTML="";
    document.getElementById('alertTransactionMode').innerHTML="";
    document.getElementById('alertSchemeType').innerHTML="";
    document.getElementById('alertAmcName').innerHTML="";
	document.getElementById('alertSchemeName').innerHTML="";
	document.getElementById('alertIsinNo').innerHTML="";
	document.getElementById('alertSchemeId').innerHTML="";
	document.getElementById('alertTransactionType').innerHTML="";
	document.getElementById('alertFolioNumber').innerHTML="";
	document.getElementById('alertAmountInvested').innerHTML="";
	document.getElementById('alertUnitsPurchased').innerHTML="";
	document.getElementById('alertEuinDeclaration').innerHTML="";
    document.getElementById('alertEuin').innerHTML="";
    document.getElementById('alertSubBrokerCode').innerHTML="";
    document.getElementById('alertSubBrokerARNCode').innerHTML="";
    document.getElementById('alertform').innerHTML="";
	
	
    //validate Select Client Id
	var cltId = lClientId.options[lClientId.selectedIndex].value;
	if(!hasValue(cltId)){
		document.getElementById('alertClientId').innerHTML="Please select Client Id ";
		lClientId.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate select Transaction Mode
	var trnMode = lTransactionMode.options[lTransactionMode.selectedIndex].value;
	if(!hasValue(trnMode)){
		document.getElementById('alertTransactionMode').innerHTML="Please select Transaction Mode ";
		lTransactionMode.style.border = "2px solid red";
		errMf=1;
	}
	
	//validate Scheme Type
	var scType = lSchemeType.options[lSchemeType.selectedIndex].value;
	if(!hasValue(scType)){
		document.getElementById('alertSchemeType').innerHTML="Please select Scheme Type";
		lSchemeType.style.border = "2px solid red";
		errMF=1;
	}
	
    //validate Select AMC Name
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
	if(!hasValue(scId)){
		document.getElementById('alertSchemeId').innerHTML="Please enter Scheme Code/Id";
		lSchemeId.style.border = "2px solid red";
		errMF=1;
	}
	
	
	//validate Transaction Type
	var trType = lTransactionType.options[lTransactionType.selectedIndex].value;
	if(!hasValue(trType)){
		document.getElementById('alertTransactionType').innerHTML="Please select Transaction Type";
		lTransactionType.style.border = "2px solid red";
		errMF=1;
	} else {
		//validate Folio No. 
		// Note: Transaction Mode: Physical and Transaction Type: Additional
		var folioNo = lFolioNumber.value;
		if (trnMode == "P" && trType == "Additional") {
			if(!hasValue(folioNo)){
				document.getElementById('alertFolioNumber').innerHTML="Please enter Folio No.";
				lFolioNumber.style.border = "2px solid red";
				errMF=1;
			}
		}
		/*else{
			if(hasValue(folioNo)){
				document.getElementById('alertFolioNumber').innerHTML="Folio No. is only mandatory for 'Physcal' transaction mode with 'Additional' transaction type";
				lFolioNumber.style.border = "2px solid red";
				errMF=1;
			}
		}*/
		
	}
	
	// validate Amount Invested
	var amtInvt = lAmountInvested.value;
	var untPur = lUnitsPurchased.value;
	if(!hasValue(amtInvt) && !hasValue(untPur)){
		document.getElementById('alertAmountInvested').innerHTML="Please enter either Amount Invested Or Units";
		lAmountInvested.style.border = "2px solid red";
		errMF = 1;
	}
	else if(hasValue(amtInvt) && hasValue(untPur)){
		document.getElementById('alertAmountInvested').innerHTML="Please enter either Amount Invested Or Units";
		document.getElementById('alertUnitsPurchased').innerHTML="Please enter either Amount Invested Or Units";
		lAmountInvested.style.border = "2px solid red";
		lUnitsPurchased.style.border = "2px solid red";
		errMF = 1;
	}
	else {
		if (hasValue(amtInvt)) {
			if (!isNumeric(amtInvt)) {
				document.getElementById('alertAmountInvested').innerHTML="Amount Invested cannot be in decimal";
				lAmountInvested.style.border = "2px solid red";
				errMF=1;
			}
		}
		else{
			// validate Units Purchased
			var untPur = lUnitsPurchased.value;
			if(!hasValue(untPur)){
				document.getElementById('alertUnitsPurchased').innerHTML="Please enter Units Purchased ";
				lUnitsPurchased.style.border = "2px solid red";
				errMF = 1;
			}
			else{
				if (!isNumeric(untPur)){
					document.getElementById('alertUnitsPurchased').innerHTML="Units cannot be in decimal ";
					lUnitsPurchased.style.border = "2px solid red";
					errMF = 1;
				}
			}
		}
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
	
	if (errMF==1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		console.log("Not an Error");
		return true;
	}
	
}
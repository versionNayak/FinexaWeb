function validateFormSwitch(form)
{
	
	var lClientId = document.getElementById("idClientUCCCombo");
	var lTransactionMode = document.getElementById("idTransMode");
	var lAmcName = document.getElementById("idAmcName");
	var lFrmSchemeType = document.getElementById("idFromSchemeType");
	var lFrmSchName = document.getElementById("idFromSchemeName");
	var lFrmIsinNo = document.getElementById("idFromIsinNo");
	var lFrmSchemeId = document.getElementById("idFromSchemeId");
	
	var lToSchemeType = document.getElementById("idToSchemeType");
	var lToSchName = document.getElementById("idToSchemeName");
	var lToIsinNo = document.getElementById("idToIsinNo");
	var lToSchemeId = document.getElementById("idToSchemeCode");
	var lBuysell = document.getElementById("idBuySell");
	var lTransactionType = document.getElementById("idTransactionType");
	var lFolioNumber = document.getElementById("idFolioNumber");
	
	var lUnits = document.getElementById("idAllUnitsFlag");
	var lSwtAmt = document.getElementById("idSwitchAmount");
	var lSwtUnits = document.getElementById("idSwitchUnits");
	var lSubBrokerCode = document.getElementById("idSubBrokerCode");
	var lSubBrokerARNCode = document.getElementById("idSubBrokerARNCode");
	var lEuinDeclaration = document.getElementById("idEUINDeclaration");
	var lEuin = document.getElementById("idEuin");
	
	var errMF=0;
	
	lClientId.style.border = "1px solid #ccc";
	lTransactionMode.style.border = "1px solid #ccc";
	lAmcName.style.border = "1px solid #ccc";
	lFrmSchemeType.style.border = "1px solid #ccc";
	lFrmSchName.style.border = "1px solid #ccc";
	lFrmIsinNo.style.border = "1px solid #ccc";
	lFrmSchemeId.style.border = "1px solid #ccc";
	
	lToSchemeType.style.border = "1px solid #ccc";
	lToSchName.style.border = "1px solid #ccc";
	lToIsinNo.style.border = "1px solid #ccc";
	lToSchemeId.style.border = "1px solid #ccc";
	lBuysell.style.border = "1px solid #ccc";
	lTransactionType.style.border = "1px solid #ccc";
	lFolioNumber.style.border = "1px solid #ccc";
	
	lUnits.style.border = "1px solid #ccc";
	lSwtAmt.style.border = "1px solid #ccc";
	lSwtUnits.style.border = "1px solid #ccc";
	lSubBrokerCode.style.border = "1px solid #ccc";
	lSubBrokerARNCode.style.border = "1px solid #ccc";
	lEuinDeclaration.style.border = "1px solid #ccc";
	lEuin.style.border = "1px solid #ccc";
	
    
    document.getElementById('alertClientCode').innerHTML="";
	document.getElementById('alertTransactionMode').innerHTML="";
	document.getElementById('alertAMCName').innerHTML="";
	document.getElementById('alertFromSchemeType').innerHTML="";
	document.getElementById('alertFromSchemeName').innerHTML="";
	document.getElementById('alertFromIsinNo').innerHTML="";
	document.getElementById('alertFromSchemeId').innerHTML="";
	
	document.getElementById('alertToSchemeType').innerHTML="";
	document.getElementById('alertToSchemeName').innerHTML="";
	document.getElementById('alertToIsinNo').innerHTML="";
	document.getElementById('alertToSchemeCode').innerHTML="";
	document.getElementById('alertBuySell').innerHTML="";
	document.getElementById('alertTransactionType').innerHTML="";
	document.getElementById('alertFolioNumber').innerHTML="";
	
	document.getElementById('alertAllUnitsFlag').innerHTML="";
	document.getElementById('alertSwitchAmount').innerHTML="";
	document.getElementById('alertSwitchUnits').innerHTML="";
	document.getElementById('alertSubBrokerCode').innerHTML="";
	document.getElementById('alertSubBrokerARNCode').innerHTML="";
	document.getElementById('alertEUINDeclaration').innerHTML="";
	document.getElementById('alertEuin').innerHTML="";
	document.getElementById('alertform').innerHTML="";
	
	
	//validate Select Client Id(UCC)
	var client = lClientId.options[lClientId.selectedIndex].value;
	if(!hasValue(client)){
		document.getElementById('alertClientCode').innerHTML="Please select Client Code ";
		lClientId.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Transaction Mode
	var trMode = lTransactionMode.options[lTransactionMode.selectedIndex].value;
	if(!hasValue(trMode)){
		document.getElementById('alertTransactionMode').innerHTML="Please select Transaction Type";
		lTransactionMode.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Select AMC Code
	var amc = lAmcName.options[lAmcName.selectedIndex].value;
	if(!hasValue(amc)){
		document.getElementById('alertAMCName').innerHTML="Please select AMC Name ";
		lAmcName.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate From Scheme Type
	var frmScType = lFrmSchemeType.options[lFrmSchemeType.selectedIndex].value;
	if(!hasValue(frmScType)){
		document.getElementById('alertFromSchemeType').innerHTML="Please select From Scheme Type";
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
	var frIsin = lFrmIsinNo.value;
	if(!hasValue(frIsin)){
		document.getElementById('alertFromIsinNo').innerHTML="Please enter From ISIN No.";
		lFrmIsinNo.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate From Scheme Id
	var frmSchId = lFrmSchemeId.value;
	if(!hasValue(frmSchId)){
		document.getElementById('alertFromSchemeId').innerHTML="Please enter From Scheme Id";
		lFrmSchemeId.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate To Scheme Type
	var toScType = lToSchemeType.options[lToSchemeType.selectedIndex].value;
	if(!hasValue(toScType)){
		document.getElementById('alertToSchemeType').innerHTML="Please select To Scheme Type";
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
		document.getElementById('alertToSchemeCode').innerHTML="Please enter From Scheme Code/Id";
		lToSchemeId.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate BuySell
	var buySell = lBuysell.options[lBuysell.selectedIndex].value;
	if(!hasValue(buySell)){
		document.getElementById('alertBuySell').innerHTML="Please select Buy Sell";
		lBuysell.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Transaction Type
	var trType = lTransactionType.options[lTransactionType.selectedIndex].value;
	if(!hasValue(trType)){
		document.getElementById('alertTransactionType').innerHTML="Please select Transaction Type";
		lTransactionType.style.border = "2px solid red";
		errMF=1;
	}
	else{
		//validate Folio No.
		var folioNo = lFolioNumber.value;
		if (trMode == "P"){
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
	
	
	/*// validate All Units
	var allUnits = lUnits.options[lUnits.selectedIndex].value;
	if(!hasValue(allUnits)){
		document.getElementById('alertAllUnitsFlag').innerHTML="Please select All Units ";
		lUnits.style.border = "2px solid red";
		errMF = 1;
	}
	alert(allUnits);
	
	// validate Switch Amount
	var swtAmt = lSwtAmt.value;
	if(!hasValue(swtAmt)){
		document.getElementById('alertSwitchAmount').innerHTML="Please enter Switch Amount ";
		lSwtAmt.style.border = "2px solid red";
		errMF = 1;
	} else {
		if (hasValue(swtAmt)) {
			if (!isNumeric(swtAmt)) {
				document.getElementById('alertSwitchAmount').innerHTML="Switch Amount can only be numeric";
				lSwtAmt.style.border = "2px solid red";
				errMF=1;
			}
		}
	}*/
	
	
	//validate All Units
	var allUnits = lUnits.options[lUnits.selectedIndex].value;
	if(!hasValue(allUnits)){
		document.getElementById('alertAllUnitsFlag').innerHTML="Please select All Units ";
		lUnits.style.border = "2px solid red";
		errMF = 1;
	}
	else if(allUnits == "N"){
		//validate Amount to Redeem
		// Note if the "All Units" is "Yes" then these two fields would be disabled
		// validate Switch Amount
		var swtAmt = lSwtAmt.value;
		var swtUnt = lSwtUnits.value
		
		if(!(hasValue(swtAmt)) && !(hasValue(swtUnt))){  
			/*** To Check if the Amount and Unit fields are blank  ***/
			document.getElementById('alertSwitchAmount').innerHTML="Please enter either Switch Amount or Switch Units";
			lSwtAmt.style.border = "2px solid red";
			errMF=1;
		} else if (hasValue(swtAmt) && hasValue(swtUnt)) {
			/*** To Check if the Amount and Unit fields are both fields are Filled  ***/
			document.getElementById('alertSwitchAmount').innerHTML="Amount and Units cannot be entered together";
			lSwtAmt.style.border = "2px solid red";
			errMF=1;
		}else {
			if (hasValue(swtAmt)) {
				
				if (trMode != "P"){
					/*** To Check if the client is Demat or not ***/
					/*** Demat Client are only allowed to have UNITS ***/
					document.getElementById('alertSwitchAmount').innerHTML="Demat Clients are only allowed to enter 'Switch Units' ";
					lSwtAmt.style.border = "2px solid red";
					errMF=1;
				} else if (trMode == "P") {
					/** For Checking Amount is in decimal or not, after checking the 'Transaction Mode' is Physical  **/
					if (!isNumeric(swtAmt)) {
						document.getElementById('alertSwitchAmount').innerHTML="Amount cannot be in decimal ";
						lSwtAmt.style.border = "2px solid red";
						errMF=1;
					}
					
				}
				
				
			}
			else{
				//validate Units to Redeem
				
				var swtUnt = lSwtUnits.value;
				if(!hasValue(swtUnt)){
					document.getElementById('alertSwitchUnits').innerHTML="Please enter Switch Units ";
					lSwtUnits.style.border = "2px solid red";
					errMF = 1;
				}
				else{
					if(!isNumeric(swtUnt)){
						document.getElementById('alertSwitchUnits').innerHTML="Units cannot be in decimal";
						lSwtUnits.style.border = "2px solid red";
						errMF=1;
					}
				}
			}
			
		}
	}
	
	// validate EUIN Declaration 
	var euDec = lEuinDeclaration.options[lEuinDeclaration.selectedIndex].value;
	if(!hasValue(euDec)){
		document.getElementById('alertEUINDeclaration').innerHTML="Please select EUIN Declaration ";
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
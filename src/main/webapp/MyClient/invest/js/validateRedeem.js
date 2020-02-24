function validateRedeemForm(form)
{
	var lClientId = document.getElementById("idClientUCCCombo");
	var lTransactionMode = document.getElementById("idTransMode");
	var lSchemeType = document.getElementById("idSchemeType");
	var lAmcName = document.getElementById("idAmcName");
	var lSchemeName = document.getElementById("idSchemeName");
	var lIsinNo = document.getElementById("idIsinNo");
	var lSchemeId = document.getElementById("idSchemeId");
	var lFolioNumber = document.getElementById("idFolioNumber");
	var lAllUnits = document.getElementById("idAllRedeem");
	var lAmtRedeem = document.getElementById("idAmountInvested");
	var lUnitsRedeem = document.getElementById("idUnitsPurchased");
	var lEuinDeclaration = document.getElementById("idEUINFlag");
	var lEuin = document.getElementById("idEUIN");
	var lSubBrokerCode = document.getElementById("idsubBrokerCode");
	var lSubBrokerARNCode = document.getElementById("idSubBrokerName");
	var errMF=0;
	
	
	lClientId.style.border = "1px solid #ccc";
	lTransactionMode.style.border = "1px solid #ccc";
	lSchemeType.style.border = "1px solid #ccc";
	lAmcName.style.border = "1px solid #ccc";
	lSchemeName.style.border = "1px solid #ccc";
	lIsinNo.style.border = "1px solid #ccc";
	lSchemeId.style.border = "1px solid #ccc";
	lFolioNumber.style.border = "1px solid #ccc";
	lAllUnits.style.border = "1px solid #ccc";
	lAmtRedeem.style.border = "1px solid #ccc";
	lUnitsRedeem.style.border = "1px solid #ccc";
	lEuinDeclaration.style.border = "1px solid #ccc";
	lEuin.style.border = "1px solid #ccc";
	lSubBrokerCode.style.border = "1px solid #ccc";
	lSubBrokerARNCode.style.border = "1px solid #ccc";
    
    
	
    document.getElementById('alertClientCode').innerHTML="";
    document.getElementById('alertTransactionMode').innerHTML="";
    document.getElementById('alertSchemeType').innerHTML="";
	document.getElementById('alertAmcName').innerHTML="";
	document.getElementById('alertSchemeName').innerHTML="";
	document.getElementById('alertIsinNo').innerHTML="";
	document.getElementById('alertSchemeId').innerHTML="";
	document.getElementById('alertFolioNumber').innerHTML="";
	document.getElementById('alertAllRedeem').innerHTML="";
	document.getElementById('alertAmountInvested').innerHTML="";
	document.getElementById('alertUnitsPurchased').innerHTML="";
	document.getElementById('alertEuinDeclaration').innerHTML="";
	document.getElementById('alertEuin').innerHTML="";
	document.getElementById('alertSubBrokerCode').innerHTML="";
	document.getElementById('alertSubBrokerARNCode').innerHTML="";
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
	//var scId = lSchemeId.options[lSchemeId.selectedIndex].value;
	if(!hasValue(scId)){
		document.getElementById('alertSchemeId').innerHTML="Please enter Scheme Code/Id";
		lSchemeId.style.border = "2px solid red";
		errMF=1;
	}
	
	
	//validate Folio No.
	var folioNo = lFolioNumber.value;
	if(trnMode == 'P'){
		if(!hasValue(folioNo)){
			document.getElementById('alertFolioNumber').innerHTML="Please enter Folio No.";
			lFolioNumber.style.border = "2px solid red";
			errMF=1;
		}
	}
	else{
		if(hasValue(folioNo)){
			document.getElementById('alertFolioNumber').innerHTML="Folio No. is only mandatory for 'Physcal' transaction mode";
			lFolioNumber.style.border = "2px solid red";
			errMF=1;
		}
	}
	
	//validate All Units
	var allUnt = lAllUnits.options[lAllUnits.selectedIndex].value;
	
	if(trnMode == 'P'){
		if(!hasValue(allUnt)){
			document.getElementById('alertAllRedeem').innerHTML="Please select All Units";
			lAllUnits.style.border = "2px solid red";
			errMF=1;
		} else if (allUnt == "N"){
			
			//validate Amount to Redeem
			// Note if the "All Units" is "Yes" then these two fields would be disabled
			var amtRee = lAmtRedeem.value;
			var untRee = lUnitsRedeem.value;
			
			if(!(hasValue(amtRee)) && !(hasValue(untRee))){
				document.getElementById('alertAmountInvested').innerHTML="Please enter either Amount Redeemed Or Units";
				lAmtRedeem.style.border = "2px solid red";
				errMF=1;
			} else if (hasValue(amtRee) && hasValue(untRee)) {
				document.getElementById('alertAmountInvested').innerHTML="Amount and Units cannot be entered together";
				lAmtRedeem.style.border = "2px solid red";
				errMF=1;
			}else {
				if (hasValue(amtRee)) {
					if (!isNumeric(amtRee)) {
						document.getElementById('alertAmountInvested').innerHTML="Amount cannot be in decimal ";
						lAmtRedeem.style.border = "2px solid red";
						errMF=1;
					}
				}
				else{
					//validate Units to Redeem
					var untRee = lUnitsRedeem.value;
					if(!hasValue(untRee)){
						document.getElementById('alertUnitsPurchased').innerHTML="Please enter Units to Redeem";
						lUnitsRedeem.style.border = "2px solid red";
						errMF=1;
					}
					else{
						if(!isNumeric(untRee)){
							document.getElementById('alertUnitsPurchased').innerHTML="Units cannot be in decimal";
							lUnitsRedeem.style.border = "2px solid red";
							errMF=1;
						}
					}
				}
				
			}
			
			
		}
		
	} else {
		
/*******	This option is for the 'Transaction Mode' = "Demat"		*******/
/*******		"Demat" would always have 'All Units' as "No"		*******/
/*******		It would always take the 'Units to be Redeemed'		*******/
		// validate Units to Redeem 
		var untRee = lUnitsRedeem.value;
		if(!hasValue(untRee)){
			document.getElementById('alertUnitsPurchased').innerHTML="Please enter Units to Redeem";
			lUnitsRedeem.style.border = "2px solid red";
			errMF=1;
		}
		else{
			if(!isNumeric(untRee)){
				document.getElementById('alertUnitsPurchased').innerHTML="Units cannot be in decimal";
				lUnitsRedeem.style.border = "2px solid red";
				errMF=1;
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
		return true;
	}
	
	
	
}
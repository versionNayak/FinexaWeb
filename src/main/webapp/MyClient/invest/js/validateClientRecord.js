function validate(form)
{
	var lClientId = document.getElementById("idClientId");
	var lAmcName = document.getElementById("idAmcName");
	var lFrmSchName = document.getElementById("idFromSchemeName");
	//var lFrmIsinNo = document.getElementById("idFromIsinNo");
	//var lFrmSchemeId = document.getElementById("idFromSchemeCode");
	//var lFrmSchemeType = document.getElementById("idFromSchemeType");
	
	var lToSchName = document.getElementById("idToSchemeName");
	//var lToIsinNo = document.getElementById("idToIsinNo");
	//var lToSchemeId = document.getElementById("idToSchemeCode");
	//var lToSchemeType = document.getElementById("idToSchemeType");
	var lTransactionType = document.getElementById("idTransactionType");
	var lFolioNumber = document.getElementById("idFolioNumber");
	
	var lUnits = document.getElementById("idAllUnitsFlag");
	var lSwtAmt = document.getElementById("idSwitchAmount");
	var lSwtUnits = document.getElementById("idSwitchUnits");
	var lTransMode = document.getElementById("idTransactionMode");
	//var lSubBrokerCode = document.getElementById("idSubBrokerCode");
	//var lSubBrokerARNCode = document.getElementById("idSubBrokerARNCode");
	
	var lEuinDeclaration = document.getElementById("idEuinDeclaration");
	var lEuin = document.getElementById("idEuin");
	
	
	/*
	var lClientCode = document.getElementById("idClientCode");
	var lSchemeName = document.getElementById("idSchemeName");
	var lIsinNo = document.getElementById("idIsinNo");
	var lSchemeId = document.getElementById("idSchemeId");
	var lSchemeType = document.getElementById("idSchemeType");
	
	var lAmountInvested = document.getElementById("idAmountInvested");
	var lUnitsPurchased = document.getElementById("idUnitsPurchased");
	var lTransactionMode = document.getElementById("idTransactionMode");
	
	
	var lTransacCode = document.getElementById("idTransacCode");
	var lOrderId = document.getElementById("idOrderId");
	var lMemberId = document.getElementById("idMemberId");
	var lEuinFlag = document.getElementById("idEuinFlag");
	
	var lDPC = document.getElementById("idDPC");
	
	var lTransNo = document.getElementById("idTransNo");
	var lUserId = document.getElementById("idUserId");
	var lMemberId = document.getElementById("idMemberId");
	var lBuysell = document.getElementById("idBuysell");
	*/
	
	
	lClientId.style.border = "1px solid #ccc";
	lAmcName.style.border = "1px solid #ccc";
	lFrmSchName.style.border = "1px solid #ccc";
	//lFrmIsinNo.style.border = "1px solid #ccc";
	//lFrmSchemeId.style.border = "1px solid #ccc";
	//lFrmSchemeType.style.border = "1px solid #ccc";
	
	lToSchName.style.border = "1px solid #ccc";
	//lToIsinNo.style.border = "1px solid #ccc";
	//lToSchemeId.style.border = "1px solid #ccc";
	//lToSchemeType.style.border = "1px solid #ccc";
	lTransactionType.style.border = "1px solid #ccc";
	lFolioNumber.style.border = "1px solid #ccc";
	
	lUnits.style.border = "1px solid #ccc";
	lSwtAmt.style.border = "1px solid #ccc";
	lSwtUnits.style.border = "1px solid #ccc";
	lTransMode.style.border = "1px solid #ccc";
	//lSubBrokerCode.style.border = "1px solid #ccc";
	//lSubBrokerARNCode.style.border = "1px solid #ccc";
	
	lEuinDeclaration.style.border = "1px solid #ccc";
	lEuin.style.border = "1px solid #ccc";
	
	
    /*
	lTransacCode.style.border = "1px solid #ccc";
	lOrderId.style.border = "1px solid #ccc";
	lMemberId.style.border = "1px solid #ccc";
	lEuinFlag.style.border = "1px solid #ccc";
    lDPC.style.border = "1px solid #ccc";
	
    lTransCode.style.border = "1px solid #ccc";
    lTransNo.style.border = "1px solid #ccc"; 
    lUserId.style.border = "1px solid #ccc";
    lMemberId.style.border = "1px solid #ccc";
    lClientCode.style.border = "1px solid #ccc"; 
    lBuysell.style.border = "1px solid #ccc";
	*/
    
    
    document.getElementById('alertClientId').innerHTML("");
	document.getElementById('alertAmcName').innerHTML("");
	document.getElementById('alertFromSchemeName').innerHTML("");
	//document.getElementById('alertFromIsinNo').innerHTML("");
	//document.getElementById('alertFromSchemeCode').innerHTML("");
	//document.getElementById('alertFromSchemeType').innerHTML("");
	
	document.getElementById('alertFromSchemeName').innerHTML("");
	//document.getElementById('alertFromIsinNo').innerHTML("");
	//document.getElementById('alertFromSchemeCode').innerHTML("");
	//document.getElementById('alertFromSchemeType').innerHTML("");
	document.getElementById('alertTransactionType').innerHTML("");
	document.getElementById('alertFolioNumber').innerHTML("");
	
	document.getElementById('alertAllUnitsFlag').innerHTML("");
	document.getElementById('alertSwitchAmount').innerHTML("");
	document.getElementById('alertSwitchUnits').innerHTML("");
	document.getElementById('alertTransactionMode').innerHTML("");
	//document.getElementById('alertSubBrokerCode').innerHTML("");
	//document.getElementById('alertSubBrokerARNCode').innerHTML("");
    
	document.getElementById('alertEuinDeclaration').innerHTML("");
	//document.getElementById('alertEuin').innerHTML("");
	
	
    /*
    document.getElementById('alertTransacCode').innerHTML("");
    document.getElementById('alertOrderId').innerHTML("");
    document.getElementById('alertMemberId').innerHTML("");
    document.getElementById('alertSubBrokerARNCode').innerHTML("");
    document.getElementById('alertEuinFlag').innerHTML("");
	document.getElementById('alertDPC').innerHTML("");
	*/
	
	
	
	//validate Select Client Id(UCC)
	var client = lClientId.options[lClientId.selectedIndex].value;
	if(!hasValue(client)){
		document.getElementById('alertClientId').innerHTML="Please select Client Code ";
		lClientId.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Select AMC Code
	//var amc = lAmcName.options[lAmcName.selectedIndex].value;
	var amc = lAmcName.value;
	if(!hasValue(amc)){
		document.getElementById('alertAmcName').innerHTML="Please select AMC Name ";
		lAmcName.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate From Scheme Name
	var scFrmName = lFrmSchName.options[lFrmSchName.selectedIndex].value;
	if(!hasValue(scFrmName)){
		document.getElementById('alertFromSchemeName').innerHTML="Please select From Scheme Name";
		lFrmSchName.style.border = "2px solid red";
		errMF=1;
	}
	
	/*
	//validate ISIN No.
	var isin = lIsinNo.value;
	//if (strUser2=="null")
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
	
	//validate Scheme Type
	var scType = lSchemeType.value;
	//if (strUser3=="null")
	if(!hasValue(scType)){
		document.getElementById('alertSchemeType').innerHTML="Please enter Scheme Type";
		lSchemeType.style.border = "2px solid red";
		errMF=1;
	}
	*/
	
	
	//validate To Scheme Name
	var scToName = lToSchName.options[lToSchName.selectedIndex].value;
	if(!hasValue(scToName)){
		document.getElementById('alertToSchemeName').innerHTML="Please select To Scheme Name";
		lToSchName.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Transaction Type
	var trType = lTransactionType.options[lTransactionType.selectedIndex].value;
	if(!hasValue(trType)){
		document.getElementById('alertTransactionType').innerHTML="Please enter Transaction Type";
		lTransactionType.style.border = "2px solid red";
		errMF=1;
	}
	
	//validate Folio No.
	var folioNo = lFolioNumber.value;
	if(!hasValue(folioNo)){
		document.getElementById('alertFolioNumber').innerHTML="Please enter Folio No.";
		lFolioNumber.style.border = "2px solid red";
		errMF=1;
	}
	
	// validate All Units
	var allUnits = lUnits.options[lUnits.selectedIndex].value;
	if(!hasValue(allUnits)){
		document.getElementById('alertAllUnitsFlag').innerHTML="Please select All Units ";
		lUnits.style.border = "2px solid red";
		errMF = 1;
	}

	
	// validate Switch Amount
	var swtAmt = lSwtAmt.value;
	if(!hasValue(swtAmt)){
		document.getElementById('alertSwitchAmount').innerHTML="Please enter Switch Amount ";
		lSwtAmt.style.border = "2px solid red";
		errMF = 1;
	}
	
	// validate Switch Units
	var swtUnt = lSwtUnits.value;
	if(!hasValue(swtUnt)){
		document.getElementById('alertSwitchUnits').innerHTML="Please enter Switch Units ";
		lSwtUnits.style.border = "2px solid red";
		errMF = 1;
	}
	
	// validate Transaction Mode
	var trnMode = lTransMode.options[lTransMode.selectedIndex].value;
	if(!hasValue(trnMode)){
		document.getElementById('alertTransactionMode').innerHTML="Please select Transaction Mode ";
		lTransMode.style.border = "2px solid red";
		errMf=1;
	}
	
	// validate EUIN Declaration
	var euinDec = lEuinDeclaration.options[lEuinDeclaration.selectedIndex].value;
	if(!hasValue(euinDec)){
		document.getElementById('alertEUINDeclaration').innerHTML="Please select EUIN Declaration ";
		lEuinDeclaration.style.border = "2px solid red";
		errMf=1;
	}
	
	
}
function validateFundsPMS(form) {
	//alert("inside validation");
	//return false;
		
	var iFundTypeID = $("input:radio[name=fundTypeID]:checked").val();
	
	var lProviderName = document.getElementById("idPName");
	var lSchemeNamePMS = document.getElementById("idSNamePMS");
	var lAssetCategory = document.getElementById("idACategory");
	var lDate = document.getElementById("idInvestmentStartDate");
	var lDateGroup = document.getElementById("idInvestmentStartDateGroup");
	var lAmount = document.getElementById("idInvestmentAmount");
	var lCurrentMarketValue = document.getElementById("idCurrentMarketValue");
	var lSubAssetClass = document.getElementById("idSAssetClass");
	
	/*
	var c = -1;
	var b = 0;
	*/
	var errPMS=0;

	//alert('Validate PMS 1');
	//return false;
	//lAssetCategory.style.border = "1px solid #ccc";
	lProviderName.style.border = "1px solid #ccc";
	//alert('addMF 1.2');
	lSchemeNamePMS.style.border = "1px solid #ccc";
	//alert('addMF 1.3');
	lAssetCategory.style.border = "1px solid #ccc";
	lDateGroup.style.border = "1px solid #ccc";
	lDateGroup.style.borderRadius = "7px";
	lAmount.style.border = "1px solid #ccc";
	lCurrentMarketValue.style.border = "1px solid #ccc";
	lSubAssetClass.style.border = "1px solid #ccc";

	//alert('Validate PMS 2');
	document.getElementById('alertPName').innerHTML="";
	document.getElementById('alertSchemeNamePMS').innerHTML="";
	document.getElementById('alertACategory').innerHTML="";
	document.getElementById('alertIDate').innerHTML="";
	document.getElementById('alertAmount').innerHTML="";
	document.getElementById('alertCMV').innerHTML="";
	document.getElementById('alertSubAssetClass').innerHTML="";

	//validate Select AMC Code
	/*var strUser = lProviderName.options[lProviderName.selectedIndex].value;
	if (strUser==""){
		document.getElementById('alertPName').innerHTML="Please enter PMS";
		lProviderName.style.border = "2px solid red";
		errPMS=1;
	}*/
	if (!hasValue(lProviderName.value)) {
		document.getElementById('alertPName').innerHTML="Please enter PMS";
		lProviderName.style.border = "2px solid red";
		errPMS=1;
	}
	//alert('after lProviderName');
	//return false;
	
	//validate Scheme Code
	/*var strUser1 = lSchemeNamePMS.options[lSchemeNamePMS.selectedIndex].value;
	//if (strUser!="0" && strUser1=="0"){
	//alert("strUser1: " + strUser1);
	if (strUser1==""){
		document.getElementById('alertSchemeNamePMS').innerHTML="Please enter PMS scheme";
		lSchemeNamePMS.style.border = "2px solid red";
		errPMS=1;
	}*/
	if (!hasValue(lSchemeNamePMS.value)) {
		document.getElementById('alertSchemeNamePMS').innerHTML="Please enter PMS scheme";
		lSchemeNamePMS.style.border = "2px solid red";
		errPMS=1;
	}
	//	alert('after Scheme Code');
	//	return false;

	
	var assetCategory = lAssetCategory.options[lAssetCategory.selectedIndex].value;
	if (assetCategory==""){
		document.getElementById('alertACategory').innerHTML="Please enter Asset Category";
		lAssetCategory.style.border = "2px solid red";
		errMF=1;
	} else {
		var subAssetClass = lSubAssetClass.options[lSubAssetClass.selectedIndex].value;
		if (subAssetClass == "") {
			document.getElementById('alertSubAssetClass').innerHTML="Please select Sub Asset Class.";
			lSubAssetClass.style.border = "2px solid red";
			errMF=1;
		}
	}
	
	//validate Investment Date
	if (!hasValue(lDate.value)) {
		document.getElementById('alertIDate').innerHTML="Please enter Date of Investment";
		lDateGroup.style.border = "2px solid red";
		lDateGroup.style.borderRadius = "7px";
		errPMS=1;
    } else {
		investementDate = moment(lDate.value,'DD/MM/YYYY');            
		if(!investementDate.isValid()){
			document.getElementById('alertIDate').innerHTML="Date of Investment is not a valid date";
			lDateGroup.style.border = "2px solid red";
			lDateGroup.style.borderRadius = "7px";
			errPMS=1;
		}else if(!isDateBetwenRange(clientDOB, new Date(), investementDate.toDate())){
			document.getElementById('alertIDate').innerHTML="Date of Investment should be between client DOB and today";
			lDateGroup.style.border = "2px solid red";
			lDateGroup.style.borderRadius = "7px";
			errPMS=1;
		}    		
    }
	
	//alert('Validate PMS 5');
	
	//validate investment amount
	if (hasValue(lAmount.value)) {
		//lAmount.value = lAmount.value.replace(/,/g, '');
		if (lAmount.value == 0) {
			document.getElementById('alertAmount').innerHTML="Investment amount cannot be 0";
			lAmount.style.border = "2px solid red";
			errPMS=1;
		}
		else {
			var num = lAmount.value;
			if (!isDecimal(num)){
				document.getElementById('alertAmount').innerHTML="Investment amount must be a positive number";
				lAmount.style.border = "2px solid red";
				errPMS=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lAmount.value = n;
			}
		}
	}
	else {
		if (!hasValue(lAmount.value)) {
			document.getElementById('alertAmount').innerHTML="Please enter Investment Amount";
			lAmount.style.border = "2px solid red";
			errPMS=1;
		}
	}
	
//	alert('Validate PMS 6');
//	return false;
	
	
	//validate current market value
	if (hasValue(lCurrentMarketValue.value)){
		//lCurrentMarketValue.value = lCurrentMarketValue.value.replace(/,/g, '');
		if (lCurrentMarketValue.value == 0){
			document.getElementById('alertCMV').innerHTML="Value cannot be 0";
			lCurrentMarketValue.style.border = "2px solid red";
			errPMS=1;
		}
		else {
			var num = lCurrentMarketValue.value;
			if(!isDecimal(num)){
				document.getElementById('alertCMV').innerHTML="Value must be positive decimal not starting with 0";
				lCurrentMarketValue.style.border = "2px solid red";
				errPMS=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lCurrentMarketValue.value = n;
			}
		}
	}
	else {
		if (!hasValue(lCurrentMarketValue.value)) {
			document.getElementById('alertCMV').innerHTML="Please enter Current Market Value";
			lCurrentMarketValue.style.border = "2px solid red";
			errPMS=1;
		}
	}
	
	//alert('Validate PMS 7');	
		
	if (errPMS==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
}
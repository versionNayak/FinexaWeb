function validateFundsETF(form) {
	
	//alert('inside validateMF');
	//return false;
		
	var iFundTypeID = $("input:radio[name=fundTypeID]:checked").val();	
	var lFundHouse = document.getElementById("idFHouse");
	var lSchemeName = document.getElementById("idSName");
	var lAssetCategory = document.getElementById("idACategory");
	var lCloseEndedFlag = document.getElementById("idOpenClose");
	var lInvestmentModeETF = document.getElementById("idIModeETF");
	var lDate = document.getElementById("idInvestmentStartDate");
	var lDateGroup = document.getElementById("idInvestmentStartDateGroup");
	var lAmount = document.getElementById("idInvestmentAmount");
	var lUnitsPurchased = document.getElementById("idUnitsPurchased");
	var lLockedInDate = document.getElementById("idLockedInDate");
	var lLockedInDateGroup = document.getElementById("idLockedInDateGroup");
	var lSIPInstallments = document.getElementById("idSIPInstallments");
	var lSIPFrequency = document.getElementById("idSIPF");
		
	var errETF=0;

	lFundHouse.style.border = "1px solid #ccc";
	lSchemeName.style.border = "1px solid #ccc";
	lAssetCategory.style.border = "1px solid #ccc";
	lCloseEndedFlag.style.border = "1px solid #ccc";
	lInvestmentModeETF.style.border = "1px solid #ccc";
	lDateGroup.style.border = "1px solid #ccc";
	lDateGroup.style.borderRadius = "7px";
	lAmount.style.border = "1px solid #ccc";
    lUnitsPurchased.style.border = "1px solid #ccc";
	lLockedInDateGroup.style.border = "1px solid #ccc";
	lLockedInDateGroup.style.borderRadius = "7px";
    lSIPFrequency.style.border = "1px solid #ccc"; 
    lSIPInstallments.style.border = "1px solid #ccc";
    
    
	document.getElementById('alertFHouse').innerHTML="";
	document.getElementById('alertSName').innerHTML="";
	document.getElementById('alertACategory').innerHTML="";
	document.getElementById('alertFlag').innerHTML="";
	document.getElementById('alertIModeETF').innerHTML="";
	document.getElementById('alertIDate').innerHTML="";
	document.getElementById('alertAmount').innerHTML="";
	document.getElementById('alertUnitsPurchased').innerHTML="";
	document.getElementById('alertLockedInDate').innerHTML="";
    document.getElementById('alertSipf').innerHTML=""; 
    document.getElementById('alertSIPInstallments').innerHTML="";


    //validate Select AMC Code
	var strUser = lFundHouse.options[lFundHouse.selectedIndex].value;
	if (strUser==""){
		document.getElementById('alertFHouse').innerHTML="Please enter Fund House";
		lFundHouse.style.border = "2px solid red";
		errETF=1;
	}
//			alert('after fund House');
//			return false;
	
	//validate Scheme Code
	var strUser1 = lSchemeName.options[lSchemeName.selectedIndex].value;
	//if (strUser!="0" && strUser1=="0"){
	if (strUser1==""){
		document.getElementById('alertSName').innerHTML="Please enter Scheme Name";
		lSchemeName.style.border = "2px solid red";
		errETF=1;
	}
//			alert('after SName');
//			return false;
	
	var assetCategory = lAssetCategory.options[lAssetCategory.selectedIndex].value;
	if (assetCategory==""){
		document.getElementById('alertACategory').innerHTML="Please enter Asset Category";
		lAssetCategory.style.border = "2px solid red";
		errMF=1;
	}


	//validate Investment Mode
	var strUser3 = lInvestmentModeETF.options[lInvestmentModeETF.selectedIndex].value;
	if (strUser3==""){
		document.getElementById('alertIModeETF').innerHTML="Please enter Investment Mode";
		lInvestmentModeETF.style.border = "2px solid red";
		errETF=1;
	}
	
//	alert('after IMode');
//	return false;
	
	//validate SIP Frequency
	var sipFrequency = lSIPFrequency.options[lSIPFrequency.selectedIndex].value;
	if (strUser3=="2"){
		if (sipFrequency==""){
			document.getElementById('alertSipf').innerHTML="Please enter SIP Frequency";
			lSIPFrequency.style.border = "2px solid red";
			errETF=1;
		}
	}
	
	//validate Investment Date
	if (strUser3=="1"){
		if (!hasValue(lDate.value)) {
			document.getElementById('alertIDate').innerHTML="Please enter Date of Investment";
			lDateGroup.style.border = "2px solid red";
			lDateGroup.style.borderRadius = "7px";
			errETF=1;
	    } else {
			investmentDate = moment(lDate.value, 'DD/MM/YYYY');
			if (!investmentDate.isValid()) {
				document.getElementById('alertIDate').innerHTML = "Date of Investment is not a valid date";
				lDateGroup.style.border = "2px solid red";
				lDateGroup.style.borderRadius = "7px";
				errETF = 1;
			} else if (!isDateBetwenRange(clientDOB, new Date(), investmentDate.toDate())) {
				document.getElementById('alertIDate').innerHTML = "Date of Investment should be between client DOB and today";
				lDateGroup.style.border = "2px solid red";
				lDateGroup.style.borderRadius = "7px";
				errETF = 1;
			}
	    }
	}    
	else {//validate SIP Start Date
		if (strUser3=="2"){
			if (!hasValue(lDate.value)) {
				document.getElementById('alertIDate').innerHTML="Please enter SIP Start Date";
				lDateGroup.style.border = "2px solid red";
				lDateGroup.style.borderRadius = "7px";
				errETF=1;
				}
			else{
				investmentDate = moment(lDate.value,'DD/MM/YYYY');		
				sipStartDate=moment().add(1, 'M');
	    		if(!investmentDate.isValid()){
	    			document.getElementById('alertIDate').innerHTML="SIP Start Date is not a valid date";
					lDateGroup.style.border = "2px solid red";
					lDateGroup.style.borderRadius = "7px";
					errETF=1;
	    		}else if(!isDateBetwenRange(clientDOB,sipStartDate.toDate(), investmentDate.toDate())){
	    			document.getElementById('alertIDate').innerHTML="SIP Start Date should be between client DOB and today";
					lDateGroup.style.border = "2px solid red";
					lDateGroup.style.borderRadius = "7px";
					errETF=1;
	    		}			
			}			
		}
	}

	//alert('before invested amount');   
	//validate Investment Amount
	if (strUser3=="1"){
	    if (hasValue(lAmount.value)) {
    		//lAmount.value = lAmount.value.replace(/,/g, '');
    		if (lAmount.value == 0) {
    			document.getElementById('alertAmount').innerHTML="Value cannot be 0";
    			lAmount.style.border = "2px solid red";
    			errETF=1;
    		}
    		else {
    			var num = lAmount.value;
    			if (!isDecimal(num)){
    				document.getElementById('alertAmount').innerHTML="Valid number must be positive decimal not starting with 0";
    				lAmount.style.border = "2px solid red";
    				errETF=1;
    			}
    			else {
    				var n = Number(num).toFixed(2);
    				lAmount.value = n;
    			}
    		}
    	} else {
    		if (!hasValue(lAmount.value)) {
				document.getElementById('alertAmount').innerHTML="Please enter either Investment Amount or Units Purchased";
				lAmount.style.border = "2px solid red";
				errETF=1;
				
				if (hasValue(lUnitsPurchased.value)){
		    		var num = lUnitsPurchased.value;
		    		if(!isInteger(num)){
		    			document.getElementById('alertUnitsPurchased').innerHTML="Value must be a positive integer not starting with 0";
						lUnitsPurchased.style.border = "2px solid red";
						errETF=1;
		    		}
			   }
	    	}
			    
			if (!hasValue(lAmount.value) && !hasValue(lUnitsPurchased.value)){
				document.getElementById('alertAmount').innerHTML="Please enter either Investment Amount or Units Purchased";
				lAmount.style.border = "2px solid red";
				document.getElementById('alertUnitsPurchased').innerHTML="Please enter either Investment Amount or Units Purchased";
				lUnitsPurchased.style.border = "2px solid red";
				errETF=1;
			}		    	
    	}
	}
	else{
		if (strUser3=="2"){
			//validate sip amount
			if (hasValue(lAmount.value)){
				//lAmount.value = lAmount.value.replace(/,/g, '');
				if (lAmount.value == 0)  {
					document.getElementById('alertAmount').innerHTML="Value cannot be 0";
					lAmount.style.border = "2px solid red";
					errETF=1;
				}
				else {
					var num = lAmount.value;
					if(!isDecimal(num)){
						document.getElementById('alertAmount').innerHTML="Valid number must be positive decimal not starting with 0";
						lAmount.style.border = "2px solid red";
						errETF=1;
					}
					else {
						var n = Number(num).toFixed(2);
						lAmount.value = n;
					}
				}
			}
			else {
				if (!hasValue(lAmount.value)) {
					document.getElementById('alertAmount').innerHTML="Please enter SIP Amount";
					lAmount.style.border = "2px solid red";
					errETF=1;
				}
			}
		}
	}
		
	//validate SIP Installments
	if (strUser3=="2"){
		if (hasValue(lSIPInstallments.value)){
			var num = lSIPInstallments.value;
				
			if (!isInteger(num)){
				document.getElementById('alertSIPInstallments').innerHTML="Value must be a positive integer not starting with 0";
				lSIPInstallments.style.border = "2px solid red";
				errETF=1;
			}
		}
		else {
			if (!hasValue(lSIPInstallments.value)) {
				document.getElementById('alertSIPInstallments').innerHTML="Please enter SIP Installments";
				lSIPInstallments.style.border = "2px solid red";
				errETF=1;
			}
		}
	}
	
	if (errETF==1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}	
}
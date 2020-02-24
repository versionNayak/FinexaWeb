function validateSP(form) {
	
	var lInvestmentAmount = document.getElementById("idInvestmentAmount");
	var lCurrentValue = document.getElementById("idCurrentValue");
	var lExpectedMaturityValue = document.getElementById("idExpectedMaturityValue");
	
	var lInvestmentDate = document.getElementById("idInvestmentStartDate");
	var lInvestmentDateGroup = document.getElementById("idInvestmentStartDateGroup");
	
	var lMaturityDate = document.getElementById("idMaturityDate");
	var lMaturityDateGroup = document.getElementById("idMaturityDateGroup");
	var lAssetDescriptionSP = document.getElementById("idAssetDescriptionSP");
	
	var errSP=0;
	
	lInvestmentAmount.style.border = "1px solid #ccc";
	lCurrentValue.style.border = "1px solid #ccc";
	lExpectedMaturityValue.style.border = "1px solid #ccc";
	
	lInvestmentDateGroup.style.border = "1px solid #ccc";
	lInvestmentDateGroup.style.borderRadius = "7px";
	
	lMaturityDateGroup.style.border = "1px solid #ccc";
	lMaturityDateGroup.style.borderRadius = "7px";
	lAssetDescriptionSP.style.border = "1px solid #ccc";
	
	document.getElementById('alertAmount').innerHTML="";
	document.getElementById('alertCurrentValue').innerHTML="";
	document.getElementById('alertExpectedMaturityValue').innerHTML="";
	document.getElementById('alertAssetDescriptionSP').innerHTML="";
	
	//validate Investment Amount
	if (hasValue(lInvestmentAmount.value)){
		lInvestmentAmount.value = lInvestmentAmount.value.replace(/,/g, '');
		if(lInvestmentAmount.value == 0){
			document.getElementById('alertAmount').innerHTML="Investment Amount cannot be zero";
			lInvestmentAmount.style.border = "2px solid red";			
			errSP=1;
		}
		else {
			var num = lInvestmentAmount.value;
			if (!isDecimal(num)){
				document.getElementById('alertAmount').innerHTML="Investment Amount must be a positive decimal not starting with 0";
				lInvestmentAmount.style.border = "2px solid red";			
				errSP=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lInvestmentAmount.value = n;
			}
		}
   } else {
	   if (!hasValue(lInvestmentAmount.value)){
		    document.getElementById('alertAmount').innerHTML="Please enter Investment Amount";
			lInvestmentAmount.style.border = "2px solid red";			
			errSP=1;
	   }
   }
	
	//validate current value
	if (hasValue(lCurrentValue.value)){
		lCurrentValue.value = lCurrentValue.value.replace(/,/g, '');
		if (lCurrentValue.value == 0){
			document.getElementById('alertCurrentValue').innerHTML="Current Value cannot be zero";
			lCurrentValue.style.border = "2px solid red";			
			errSP=1;
		}
		else {
			var num = lCurrentValue.value;
			if (!isDecimal(num)){
				document.getElementById('alertCurrentValue').innerHTML="Current Value must be positive decimal not starting with 0";
				lCurrentValue.style.border = "2px solid red";			
				errSP=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lCurrentValue.value = n;
			}
		}
	}
	else {
		if (!hasValue(lCurrentValue.value)) {
			document.getElementById('alertCurrentValue').innerHTML="Please enter Current Value of asset";
			lCurrentValue.style.border = "2px solid red";			
			errSP=1;		
		}
	}
		

	//expected maturity value
	if (hasValue(lExpectedMaturityValue.value)){
		lExpectedMaturityValue.value = lExpectedMaturityValue.value.replace(/,/g, '');
		if (lExpectedMaturityValue.value == 0){
			document.getElementById('alertExpectedMaturityValue').innerHTML="Current Value cannot be zero";
			lExpectedMaturityValue.style.border = "2px solid red";			
			errSP=1;
		}
		else {
			var num = lExpectedMaturityValue.value;
			if (!isDecimal(num)){
				document.getElementById('alertExpectedMaturityValue').innerHTML="Current Value must be positive decimal not starting with 0";
				lExpectedMaturityValue.style.border = "2px solid red";			
				errSP=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lExpectedMaturityValue.value = n;
			}
		}
	}
	
	if (!hasValue(lInvestmentDate.value)) {
		document.getElementById('alertIinvestmentStartDate').innerHTML = "Please select Investment Start Date.";
		lInvestmentDateGroup.style.border = "2px solid red";
		lInvestmentDateGroup.style.borderRadius = "7px";
		errSP=1;
	} else {
		if (hasValue(lInvestmentDate.value)) {
			
			window.user_dt = moment(lInvestmentDate.value, 'DD/MM/YYYY');

			if (!window.user_dt.isValid()) {
				document.getElementById('alertIinvestmentStartDate').innerHTML = "Date of Investment is not a valid date";
				lInvestmentDateGroup.style.border = "2px solid red";
				lInvestmentDateGroup.style.borderRadius = "7px";
				errSP=1;
			} else if (!isDateBetwenRange(window.client_dob, new Date(),window.user_dt.toDate())) {
				document.getElementById('alertIinvestmentStartDate').innerHTML = "Date of Investment should be in between client dob & today";
				lInvestmentDateGroup.style.border = "2px solid red";
				lInvestmentDateGroup.style.borderRadius = "7px";
				errSP=1;
			}

		}
	}
	
	var lMaturityDateValue = lMaturityDate.value;
	if (hasValue(lMaturityDateValue)) {
		window.user_dt = moment(lMaturityDate.value, 'DD/MM/YYYY');

		if (!window.user_dt.isValid()) {
			document.getElementById('alertMaturityDate').innerHTML = "Maturity date is not a valid date";
			lMaturityDateGroup.style.border = "2px solid red";
			lMaturityDateGroup.style.borderRadius = "7px";
			errSP=1;
		} else if (!isDateBetwenRange(window.client_dob, window.client_lexp,window.user_dt.toDate())) {
			document.getElementById('alertMaturityDate').innerHTML = "Maturity date should be between client DOB & client life expectancy";
			lMaturityDateGroup.style.border = "2px solid red";
			lMaturityDateGroup.style.borderRadius = "7px";
			errSP=1;
		}

	}
	
	if (!hasValue(lAssetDescriptionSP.value)) {
		document.getElementById('alertAssetDescriptionSP').innerHTML="Please enter Asset Description.";
		lAssetDescriptionSP.style.border = "2px solid red";			
		errSP=1;
	}
	
		
	if (errSP==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		return true;
	}
}
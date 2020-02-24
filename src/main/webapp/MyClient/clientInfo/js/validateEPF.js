 function validateEPF(form, SELECTED_FM_ID) {
	//alert("Inside validation");
	//return false;
	var lEpfCurrentBalance = document.getElementById("idEpfCurrentBalance");
	var lEpsCurrentBalance = document.getElementById("idEpsCurrentBalance");
	var lMonthlyBasicDA = document.getElementById("idMonthlyBasicDA");
	var lAnnualContributionIncrease = document.getElementById("idAnnualContributionIncrease");
	var lEpfoInterestRate = document.getElementById("idEpfoInterestRate");
//	var lContributionsUptoAge = document.getElementById("idContributionUptoAge");
//	var lEpfWithdrawalAge = document.getElementById("idEpfWithdrawalAge");
//	var lEpfBalanceRupee = document.getElementById("idEpfBalanceRupee");
//	var lEpsBalanceRupee = document.getElementById("idEpsBalanceRupee");
//	var lMonthlyBasicDARupee = document.getElementById("idMonthlyBasicDARupee");
	var lServiceYears = document.getElementById("idServiceYears");
	var lRetirementAge = document.getElementById("idRetirementAge");
	var lSalaryIncreaseReferenceMonth = document.getElementById("idSalaryIncreaseRefMonth");
	var lSalaryIncreaseReferenceMonthGroup = document.getElementById("idSalaryIncreaseRefMonthGroup");
	
	
	//alert("Retirement Age: " + lRetirementAge.value);
	
	var errEpf=0;
	/*
	var errEPS=0;
	var errMBD=0;
	var errAnnualContributionIncrease = 0;
	var errEpfoInterestRate = 0;
	var errContributionsUptoAge = 0;
	var errEpfWithdrawalAge = 0;
	*/
	
	lEpfCurrentBalance.style.border = "1px solid #ccc";
	lEpsCurrentBalance.style.border = "1px solid #ccc";
	lMonthlyBasicDA.style.border = "1px solid #ccc";
	lAnnualContributionIncrease.style.border = "1px solid #ccc";
	lEpfoInterestRate.style.border = "1px solid #ccc";
//	lContributionsUptoAge.style.border = "1px solid #ccc";
//	lEpfWithdrawalAge.style.border = "1px solid #ccc";
//	lEpfBalanceRupee.style.border = "1px solid #ccc";
//	lEpsBalanceRupee.style.border = "1px solid #ccc";
//	lMonthlyBasicDARupee.style.border = "1px solid #ccc";
	lServiceYears.style.border = "1px solid #ccc";
	lSalaryIncreaseReferenceMonthGroup.style.border = "1px solid #ccc";
	lSalaryIncreaseReferenceMonthGroup.style.borderRadius = "7px";
	
	document.getElementById('alertepfCurrentBalance').innerHTML="";
	document.getElementById('alertepsCurrentBalance').innerHTML="";
	document.getElementById('alertmonthlyBasicDA').innerHTML="";
	document.getElementById('alertannualcontributionincrease').innerHTML="";
	document.getElementById('alertepfointerestrate').innerHTML="";
//	document.getElementById('alertcontributionsuptoage').innerHTML="";
//	document.getElementById('alertepfwithdrawalage').innerHTML="";
	document.getElementById('alertserviceyears').innerHTML="";
	document.getElementById('alertSIRM').innerHTML="";

	//alert('after declarations');
	//return false;
	
	if (hasValue(lEpfCurrentBalance.value)){
		lEpfCurrentBalance.value = lEpfCurrentBalance.value.replace(/,/g, '');
		/*if (lEpfCurrentBalance.value == 0){
			document.getElementById('alertepfCurrentBalance').innerHTML="Value cannot be 0";
			lEpfCurrentBalance.style.border = "2px solid red";
//			lEpfBalanceRupee.style.border = "2px solid red";
			errEpf=1;
		}
		else {*/
			var num = lEpfCurrentBalance.value;
			if (!isDecimal(num)){
				document.getElementById('alertepfCurrentBalance').innerHTML="Current EPF Balance must be positive decimal not starting with 0";
				lEpfCurrentBalance.style.border = "2px solid red";
//				lEpfBalanceRupee.style.border = "2px solid red";
				errEpf=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lEpfCurrentBalance.value = n;
			}
		
	}
	else {
		if(!hasValue(lEpfCurrentBalance.value)){
			document.getElementById('alertepfCurrentBalance').innerHTML="Please enter Current EPF Balance";
			lEpfCurrentBalance.style.border = "2px solid red";
//			lEpfBalanceRupee.style.border = "2px solid red";
			errEpf=1;
		}
	}
	
	//	alert('after epfcb');
    //	return false;
    
	if (hasValue(lEpsCurrentBalance.value)){
		lEpsCurrentBalance.value = lEpsCurrentBalance.value.replace(/,/g, '');
	/*	if (lEpsCurrentBalance.value == 0){
			document.getElementById('alertepsCurrentBalance').innerHTML="Value cannot be 0";
			lEpsCurrentBalance.style.border = "2px solid red";
//			lEpsBalanceRupee.style.border = "2px solid red";
			errEpf=1;
		}
		else {*/
			var num = lEpsCurrentBalance.value;
			if (!isDecimal(num)){
				document.getElementById('alertepsCurrentBalance').innerHTML="Current EPS Balance must be positive decimal not starting with 0";
				lEpsCurrentBalance.style.border = "2px solid red";
//				lEpsBalanceRupee.style.border = "2px solid red";
				errEpf=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lEpsCurrentBalance.value = n;
			}
		
	}
	else {
		if(!hasValue(lEpsCurrentBalance.value)){
			document.getElementById('alertepsCurrentBalance').innerHTML="Please enter Current EPS Balance";
			lEpsCurrentBalance.style.border = "2px solid red";
//			lEpsBalanceRupee.style.border = "2px solid red";
			errEpf=1;
		}
	}
	
	if (hasValue(lMonthlyBasicDA.value)){
		lMonthlyBasicDA.value = lMonthlyBasicDA.value.replace(/,/g, '');
		if (lMonthlyBasicDA.value == 0) {
			document.getElementById('alertmonthlyBasicDA').innerHTML="Monthly Basic(+DA) cannot be 0";
			lMonthlyBasicDA.style.border = "2px solid red";
//			lMonthlyBasicDARupee.style.border = "2px solid red";
			errEpf=1;
		}
		else {
			var num = lMonthlyBasicDA.value;
			if (!isDecimal(num)){
				document.getElementById('alertmonthlyBasicDA').innerHTML="Monthly Basic(+DA) must be positive decimal not starting with 0";
				lMonthlyBasicDA.style.border = "2px solid red";
//				lMonthlyBasicDARupee.style.border = "2px solid red";
				errEpf=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lMonthlyBasicDA.value = n;
			}
		}
	}
	else {
		if (!hasValue(lMonthlyBasicDA.value)) {
			document.getElementById('alertmonthlyBasicDA').innerHTML="Please enter Monthly Basic(+DA)";
			lMonthlyBasicDA.style.border = "2px solid red";
//			lMonthlyBasicDARupee.style.border = "2px solid red";
			errEpf=1;
		}	
	}
	
	if (!hasValue(lAnnualContributionIncrease.value)) {
		document.getElementById('alertannualcontributionincrease').innerHTML="Please enter Annual Contribution Increase %";
		lAnnualContributionIncrease.style.border = "2px solid red";
		errEpf=1;
	}	
	else{
		 if (lAnnualContributionIncrease.value == 0 || lAnnualContributionIncrease.value > 100){
				document.getElementById('alertannualcontributionincrease').innerHTML="Annual Contribution Increase % cannot be 0 and greater than 100";
				lAnnualContributionIncrease.style.border = "2px solid red";
				errEpf=1;
			}
			else {
				var num = lAnnualContributionIncrease.value;
				if (!isDecimal(num)){
					document.getElementById('alertannualcontributionincrease').innerHTML="Annual Contribution Increase % must be positive decimal not starting with 0";
					lAnnualContributionIncrease.style.border = "2px solid red";
					errEpf=1;
				}
				/*else {
					var n = Number(num).toFixed(2);
					lAnnualContributionIncrease.value = n;
				}*/
			}
		}
	
	//alert("after annual contrib increase");
	//return false;

	if (!hasValue(lEpfoInterestRate.value)) {
		document.getElementById('alertepfointerestrate').innerHTML="Please enter EPFO Interest Rate";
		lEpfoInterestRate.style.border = "2px solid red";
		errEpf=1;
	}	
	else{
		if (lEpfoInterestRate.value == 0 || lEpfoInterestRate.value > 100){
			document.getElementById('alertepfointerestrate').innerHTML="EPFO Interest Rate cannot be 0 and greater than 100";
			lEpfoInterestRate.style.border = "2px solid red";
			errEpf=1;
		}
		else {
			var num = lEpfoInterestRate.value;
			if (!isDecimal(num)){
				document.getElementById('alertepfointerestrate').innerHTML="EPFO Interest Rate must be positive decimal not starting with 0";
				lEpfoInterestRate.style.border = "2px solid red";
				errEpf=1;
			}
			/*else {
				var n = Number(num).toFixed(2);
				lEpfoInterestRate.value = n;
			}*/
		}
	}
	// Omitted as contribution age will be mapped to retirement age
	/*if (!hasValue(lContributionsUptoAge.value)) {
		document.getElementById('alertcontributionsuptoage').innerHTML="Please enter Contribution Upto Age";
		lContributionsUptoAge.style.border = "2px solid red";
		errEpf=1;
	}	
	else{
		if (lContributionsUptoAge.value == 0){
			document.getElementById('alertcontributionsuptoage').innerHTML="Contribution Upto Age cannot be 0";
			lContributionsUptoAge.style.border = "2px solid red";
			errEpf=1;
		}
		else {
			    var num = lContributionsUptoAge.value;
				
				if (!isInteger(num)){
					document.getElementById('alertcontributionsuptoage').innerHTML="Contribution Upto Age must be a positive integer not starting with 0";
					lContributionsUptoAge.style.border = "2px solid red";
					errEpf=1;
				}
		   }
	  }*/
	
//	alert("ContributionsUptoAge: " + lContributionsUptoAge.value);
//	return false;
	
// Omitted as contribution age will be mapped to retirement age
/*	if (!hasValue(lEpfWithdrawalAge.value)) {
		document.getElementById('alertepfwithdrawalage').innerHTML="Please enter EPF Withdrawal Age";
		lEpfWithdrawalAge.style.border = "2px solid red";
		errEpf=1;
	}	
	else{
		if (lEpfWithdrawalAge.value == 0){
			document.getElementById('alertepfwithdrawalage').innerHTML="EPF Withdrawal Age cannot be 0";
			lEpfWithdrawalAge.style.border = "2px solid red";
			errEpf=1;
		}
		else {
			 var num = lEpfWithdrawalAge.value;
			// alert("num: " + num);
			 if (!isInteger(num)){
				 document.getElementById('alertepfwithdrawalage').innerHTML="EPF Withdrawal Age must be a positive integer not starting with 0";
				 lEpfWithdrawalAge.style.border = "2px solid red";
				 errEpf=1;
			 }
			 else {
			//	 alert("in else");
			//	 alert("ContributionsUptoAge: " + lContributionsUptoAge.value);
			//	 alert("EpfWithdrawalAge: " + lEpfWithdrawalAge.value);
				 var a = lContributionsUptoAge.value;
				 var b = lEpfWithdrawalAge.value;
			//	 alert("a: " + a);
			//	 alert("b: " + b);
				 if (Number(a) > Number(b)){
					// alert("in if");
				  //   return false;
					 document.getElementById('alertepfwithdrawalage').innerHTML="Withdrawal age must be greater than contributions age";
					 lEpfWithdrawalAge.style.border = "2px solid red";			
					 errEpf=1;
				 }
			 }
		}
	}*/
	
	if (hasValue(lServiceYears.value)){
		if (lServiceYears.value == 0){
			document.getElementById('alertserviceyears').innerHTML="Years of Service cannot be 0";
			lServiceYears.style.border = "2px solid red";
			errEpf=1;
		}
		else {
			var num = lServiceYears.value;
			if (!isInteger(num)){
				document.getElementById('alertserviceyears').innerHTML="Years of Service must be a positive integer not starting with 0";
				lServiceYears.style.border = "2px solid red";
				errEpf=1;
			}
			else {
				//alert("service years: "+ lServiceYears.value);
			//	alert("Retirement Age: " + lRetirementAge.value);
				// to be modified
				if (Number(lServiceYears.value) > Number(lRetirementAge.value)) {
					document.getElementById('alertserviceyears').innerHTML=" Retirement age not updated ";
					lServiceYears.style.border = "2px solid red";
					errEpf=1;
				}
			}
		}
	}
	else {
		if (!hasValue(lServiceYears.value)){
			document.getElementById('alertserviceyears').innerHTML="Please enter Years of Service"
			lServiceYears.style.border = "2px solid red";
			errEpf=1;
		}
	}
	
	if (!hasValue(lSalaryIncreaseReferenceMonth.value)) {
		document.getElementById('alertSIRM').innerHTML="Please enter Reference Month";
		lSalaryIncreaseReferenceMonthGroup.style.border = "2px solid red";
		errEpf=1;
	}

			
//	alert('after all the validations');
//	return false;
	
	
	if (errEpf == 1){
		//alert("Error");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		return true;
	}
 }

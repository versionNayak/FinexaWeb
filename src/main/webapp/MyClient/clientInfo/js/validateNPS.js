function validateNPS(form, SELECTED_FM_ID) {
//	alert("In validation 1");
//	return false;
	var lAssetClassEAllocation = document.getElementById("idAssetClassEAllocation");
	var lAssetClassCAllocation = document.getElementById("idAssetClassCAllocation");
	var lAssetClassGAllocation = document.getElementById("idAssetClassGAllocation");
	var lCurrentNPSBalance = document.getElementById("idNpsCurrentBalance");
	var lEmployeeContribution = document.getElementById("idEmployeeContribution");
	var lEmployerContribution = document.getElementById("idEmployerContribution");
	var lAssetClassEExpectedReturns = document.getElementById("idAssetClassEReturns");
	var lAssetClassCExpectedReturns = document.getElementById("idAssetClassCReturns");
	var lAssetClassGExpectedReturns = document.getElementById("idAssetClassGReturns");
	var lAutoPlanExpectedReturns = document.getElementById("idAutoPlanReturns");
	var lEmployeeContributionUptoAge = document.getElementById("idEmployeeContributionUptoAge");
	var lEmployerContributionUptoAge = document.getElementById("idEmployerContributionUptoAge");
	var lRetirementAge = document.getElementById("idRetirementAge");
	var lExpectedAnnualIncrease = document.getElementById("idExpectedAnnualIncrease");

	var lPlanType = document.getElementById("idPlanType");
   	var lPlanTypeSelected = $("#idPlanType").val();
   
   	errNps = 0;
   	
	lAssetClassEAllocation.style.border = "1px solid #ccc";
	lAssetClassCAllocation.style.border = "1px solid #ccc";
	lAssetClassGAllocation.style.border = "1px solid #ccc";
	lCurrentNPSBalance.style.border = "1px solid #ccc";
	lEmployeeContribution.style.border = "1px solid #ccc";
	lEmployerContribution.style.border ="1px solid #ccc";
	lAssetClassEExpectedReturns.style.border = "1px solid #ccc";
	lAssetClassCExpectedReturns.style.border = "1px solid #ccc";
	lAssetClassGExpectedReturns.style.border = "1px solid #ccc";
	lAutoPlanExpectedReturns.style.border = "1px solid #ccc";
	lEmployeeContributionUptoAge.style.border ="1px solid #ccc";
	lEmployerContributionUptoAge.style.border = "1px solid #ccc";
	lRetirementAge.style.border = "1px solid #ccc";
	lPlanType.style.border = "1px solid #ccc";
//	document.getElementById("idFinancialAsset").style.border = "none";
//	lFinancialAsset.style.border = "1px solid #ccc";
//    lCurNpsBalanceRupee.style.border = "1px solid #ccc";
//    lEmployeeContributionRupee.style.border = "1px solid #ccc";
//    lEmployerContributionRupee.style.border = "1px solid #ccc";
    
    //alert("In validation 4");
    
//    doument.getElementById('alertform').innerHTML="";
	document.getElementById('alertacea').innerHTML="";
	document.getElementById('alertacca').innerHTML="";
	document.getElementById('alertacga').innerHTML="";
	document.getElementById('alertcnpsb').innerHTML="";
	document.getElementById('alertemployeec').innerHTML="";
	document.getElementById('alertemployerc').innerHTML="";
	document.getElementById('alertaceer').innerHTML="";
	document.getElementById('alertaccer').innerHTML="";
	document.getElementById('alertacger').innerHTML="";
	document.getElementById('alertaper').innerHTML="";
	document.getElementById('alertemployeecua').innerHTML="";
	document.getElementById('alertemployercua').innerHTML="";
	document.getElementById('alertnpspt').innerHTML="";
//	document.getElementById('alertfa').innerHTML="";
	document.getElementById('alerteaiic').innerHTML="";
	
	//alert("In validation 5");

		//alert('before Current NPS Balance');
		//return false;
	//Validate Current NPS Balance

	if (hasValue(lCurrentNPSBalance.value)){
		lCurrentNPSBalance.value = lCurrentNPSBalance.value.replace(/,/g, '');
	/*	if (lCurrentNPSBalance.value == 0) {
			document.getElementById('alertcnpsb').innerHTML="Value cannot be 0";
			lCurrentNPSBalance.style.border = "2px solid red";
//			lCurNpsBalanceRupee.style.border = "2px solid red";
			errNps=1;
		}
		else {*/
			var num = lCurrentNPSBalance.value;
			if (!isDecimal(num)){
				document.getElementById('alertcnpsb').innerHTML="Please enter a positive value not starting with 0.";
				lCurrentNPSBalance.style.border = "2px solid red";
//				lCurNpsBalanceRupee.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lCurrentNPSBalance.value = n;
			}
		
	}
	else {
		if (!hasValue(lCurrentNPSBalance.value)){
			document.getElementById('alertcnpsb').innerHTML="Enter Current NPS Balance";
			lCurrentNPSBalance.style.border = "2px solid red";
//			lCurNpsBalanceRupee.style.border = "2px solid red";
			errNps=1;
		}
	}
	
	//alert("In validation 6");
	//return false;
	//validate Employee Contribution
	if (hasValue(lEmployeeContribution.value)){
		lEmployeeContribution.value = lEmployeeContribution.value.replace(/,/g, '');
		/*if (lEmployeeContribution.value == 0){
			document.getElementById('alertemployeec').innerHTML="Value cannot be 0.";
			lEmployeeContribution.style.border = "2px solid red";
//			lEmployeeContributionRupee.style.border = "2px solid red";
			errNps=1
		}
		else {*/
			var num = lEmployeeContribution.value;
			if (!isDecimal(num)){
				document.getElementById('alertemployeec').innerHTML="Please enter a positive value not starting with 0.";
				lEmployeeContribution.style.border = "2px solid red";
//				lEmployeeContributionRupee.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lEmployeeContribution.value = n;
			}
		
	}
	else {
		document.getElementById('alertemployeec').innerHTML="Please enter Employee Contribution";
		lEmployeeContribution.style.border = "2px solid red";
//		lEmployeeContributionRupee.style.border = "2px solid red";
		errNps=1;		
	}
	
	
	//alert("In validation 7");
	//validate Employer Contribution

	if (hasValue(lEmployerContribution.value)){
		lEmployerContribution.value = lEmployerContribution.value.replace(/,/g, '');
	/*	if (lEmployerContribution.value == 0){
			document.getElementById('alertemployerc').innerHTML="Value cannot be 0.";
			lEmployerContribution.style.border = "2px solid red";
//			lEmployerContributionRupee.style.border = "2px solid red";
			errNps=1;
		}
		else {*/
			var num = lEmployerContribution.value;
			if (!isDecimal(num)){
				document.getElementById('alertemployerc').innerHTML="Please enter a positive value not starting with 0.";
				lEmployerContribution.style.border = "2px solid red";
//				lEmployerContributionRupee.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lEmployerContribution.value = n;
			}
		
	}
	else {
		document.getElementById('alertemployerc').innerHTML="Please enter Employer Contribution";
		lEmployerContribution.style.border = "2px solid red";
		errNps=1;		
	}
	
	//alert("In validation 8");
	
	if (hasValue(lExpectedAnnualIncrease.value)){
		if (lExpectedAnnualIncrease.value == 0 || lExpectedAnnualIncrease.value > 100){
			document.getElementById('alerteaiic').innerHTML="Value cannot be 0 and must be within 100.";
			lExpectedAnnualIncrease.style.border = "2px solid red";
			errNps=1;
		}
		else {
			var num = lExpectedAnnualIncrease.value;
			if (!isDecimal(num)){
				document.getElementById('alerteaiic').innerHTML="Please enter a positive value not starting with 0.";
				lExpectedAnnualIncrease.style.border = "2px solid red";
				errNps=1;	
			}
			else {
				var n = Number(num).toFixed(2);
				lExpectedAnnualIncrease.value = n;
			}
		}
	}

	//	alert("In validation 9");
	//	return false;
	
	//alert("Plan type: "+lPlanTypeSelected);
	//return false;
	
	if (!hasValue(lPlanTypeSelected)){
		document.getElementById('alertnpspt').innerHTML="Please enter Plan Type";
		lPlanType.style.border = "2px solid red";
		errNps=1;		
	}
	else if (lPlanTypeSelected == 2){
		//validate Asset Class E Allocation
		if (!hasValue(lAssetClassEAllocation.value)) {
			document.getElementById('alertacea').innerHTML="Please enter Asset Class E Allocation";
			lAssetClassEAllocation.style.border = "2px solid red";
			errNps=1;
		}
		else {
			if (lAssetClassEAllocation.value == 0 || lAssetClassEAllocation.value > 100) {
				document.getElementById('alertacea').innerHTML="Value cannot be 0 or greater than 100.";
				lAssetClassEAllocation.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var num = lAssetClassEAllocation.value;
				if (!isDecimal(num)) {
					document.getElementById('alertacea').innerHTML="Please enter a positive decimal not starting with 0";
					lAssetClassEAllocation.style.border = "2px solid red";
					errNps=1;	
				}
				else {
					var n = Number(num).toFixed(2);
					lAssetClassEAllocation.value = n;
				}
			}
		}
		
		//validate Asset Class C Allocation
		   
		if (!hasValue(lAssetClassCAllocation.value)) {
			document.getElementById('alertacca').innerHTML="Please enter Asset Class C Allocation";
			lAssetClassCAllocation.style.border = "2px solid red";
			errNps=1;
		}
		else {
			if (lAssetClassCAllocation.value == 0 || lAssetClassCAllocation.value > 100) {
				document.getElementById('alertacca').innerHTML="Value cannot be 0 or greater than 100.";
				lAssetClassCAllocation.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var num = lAssetClassCAllocation.value;
				if (!isDecimal(num)) {
					document.getElementById('alertacca').innerHTML="Please enter a positive decimal not starting with 0";
					lAssetClassCAllocation.style.border = "2px solid red";
					errNps=1;	
				}
				else {
					var n = Number(num).toFixed(2);
					lAssetClassCAllocation.value = n;
				}
			}
		}
		
		//validate Asset Class G Allocation
	
		if (!hasValue(lAssetClassGAllocation.value)) {
			document.getElementById('alertacga').innerHTML="Please enter Asset Class G Allocation";
			lAssetClassGAllocation.style.border = "2px solid red";
			errNps=1;
		}
		else {
			if (lAssetClassGAllocation.value == 0 || lAssetClassGAllocation.value > 100) {
				document.getElementById('alertacga').innerHTML="Value cannot be 0 or greater than 100.";
				lAssetClassGAllocation.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var num = lAssetClassGAllocation.value;
				if (!isDecimal(num)) {
					document.getElementById('alertacga').innerHTML="Please enter a positive decimal not starting with 0";
					lAssetClassGAllocation.style.border = "2px solid red";
					errNps=1;	
				}
				else {
					var n = Number(num).toFixed(2);
					lAssetClassGAllocation.value = n;
				}
			}
		}

		if (hasValue(lAssetClassEAllocation.value) &&
				hasValue(lAssetClassCAllocation.value) &&
				hasValue(lAssetClassGAllocation.value))
		{
			var sum = (Number(lAssetClassEAllocation.value)) + (Number(lAssetClassCAllocation.value)) + (Number(lAssetClassGAllocation.value));
			//alert('Sum of Allocation: ' +sum);
			//return false;
			if ( sum != 100){
			   document.getElementById('alertacga').innerHTML="Sum of all asset class allocations must be 100.";
			   lAssetClassGAllocation.style.border = "2px solid red";
			   lAssetClassCAllocation.style.border = "2px solid red";
			   lAssetClassEAllocation.style.border = "2px solid red";
			   errNps=1;
			}
		}
		
		//alert('after sum check');
		//return false;
		
		//validate Asset Class E Expected Returns
	
		if (!hasValue(lAssetClassEExpectedReturns.value)) {
			document.getElementById('alertaceer').innerHTML="Please enter Asset Class E Expected Returns";
			lAssetClassEExpectedReturns.style.border = "2px solid red";
			errNps=1;
		}
		else{
			if (lAssetClassEExpectedReturns.value == 0 || lAssetClassEExpectedReturns.value > 100) {
				document.getElementById('alertaceer').innerHTML="Value cannot be 0 or greater than 100.";
				lAssetClassEExpectedReturns.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var num = lAssetClassEExpectedReturns.value;
				if (!isDecimal(num)) {
					document.getElementById('alertaceer').innerHTML="Please enter a positive decimal not starting with 0";
					lAssetClassEExpectedReturns.style.border = "2px solid red";
					errNps=1;	
				}
				else {
					var n = Number(num).toFixed(2);
					lAssetClassEExpectedReturns.value = n;
				}
			}
		}
		
	//	alert('after eer');
	//	return false;
	
		//validate Asset Class C Expected Returns
	
		if (!hasValue(lAssetClassCExpectedReturns.value)) {
			document.getElementById('alertaccer').innerHTML="Please enter Asset Class C Expected Returns";
			lAssetClassCExpectedReturns.style.border = "2px solid red";
			errNps=1;
		}
		else{
			if (lAssetClassCExpectedReturns.value == 0 || lAssetClassCExpectedReturns.value > 100) {
				document.getElementById('alertaccer').innerHTML="Value cannot be 0 or greater than 100.";
				lAssetClassCExpectedReturns.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var num = lAssetClassCExpectedReturns.value;
				if (!isDecimal(num)) {
					document.getElementById('alertaccer').innerHTML="Please enter a positive decimal not starting with 0";
					lAssetClassCExpectedReturns.style.border = "2px solid red";
					errNps=1;	
				}
				else {
					var n = Number(num).toFixed(2);
					lAssetClassCExpectedReturns.value = n;
				}
			}
		}
	
		//validate Asset Class G Expected Returns
	
		if (!hasValue(lAssetClassGExpectedReturns.value)) {
			document.getElementById('alertacger').innerHTML="Please enter Asset Class G Expected Returns";
			lAssetClassGExpectedReturns.style.border = "2px solid red";
			errNps=1;
		}
		else{
			if (lAssetClassGExpectedReturns.value == 0 || lAssetClassGExpectedReturns.value > 100) {
				document.getElementById('alertacger').innerHTML="Value cannot be 0 or greater than 100.";
				lAssetClassGExpectedReturns.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var num = lAssetClassGExpectedReturns.value;
				if (!isDecimal(num)) {
					document.getElementById('alertacger').innerHTML="Please enter a positive decimal not starting with 0";
					lAssetClassGExpectedReturns.style.border = "2px solid red";
					errNps=1;	
				}
				else {
					var n = Number(num).toFixed(2);
					lAssetClassGExpectedReturns.value = n;
				}
			}
		}
	}
	
	//alert("In validation 10");
	//return false;
	
	if (lPlanTypeSelected == 1){
		//validate Auto Plan Expected Returns
	//alert('if plan type is auto');
	//return false;
		if (!hasValue(lAutoPlanExpectedReturns.value)) {
			document.getElementById('alertaper').innerHTML="Please enter Auto Plan Expected Returns";
			lAutoPlanExpectedReturns.style.border = "2px solid red";
			errNps=1;
			}
		else{
			if (lAutoPlanExpectedReturns.value == 0 || lAutoPlanExpectedReturns.value > 100){
				document.getElementById('alertaper').innerHTML="Value cannot be 0 or greater than 100";
				lAutoPlanExpectedReturns.style.border = "2px solid red";
				errNps=1;
			}
			else {
				var num = lAutoPlanExpectedReturns.value;
				if (!isDecimal(num)){
					document.getElementById('alertaper').innerHTML="Value must be positive decimal and cannot start with 0";
					lAutoPlanExpectedReturns.style.border = "2px solid red";
					errNps=1;
				}
				else {
					var n = Number(num).toFixed(2);
					lAutoPlanExpectedReturns.value = n;
				}
			}
		}
	} 
	
	//alert("In validation 11");
	
	//validate Employee Contribution Up to Age
	
	if (!hasValue(lEmployeeContributionUptoAge.value)) {
		document.getElementById('alertemployeecua').innerHTML="Please enter Employee Contribution Upto Age";
		lEmployeeContributionUptoAge.style.border = "2px solid red";
		errNps=1;
	}
	else{
		if (lEmployeeContributionUptoAge.value == 0 || lEmployeeContributionUptoAge.value > 100) {
			document.getElementById('alertemployeecua').innerHTML="Age cannot be 0 or greater than 100";
			lEmployeeContributionUptoAge.style.border = "2px solid red";
			errNps=1;	
		}
		else {
			var num = lEmployeeContributionUptoAge.value;
			if (!isInteger(num)){
				document.getElementById('alertemployeecua').innerHTML="Age must be positive integer and cannot start with 0";
				lEmployeeContributionUptoAge.style.border = "2px solid red";
				errNps=1;	
			}
		}
	}
	
	//alert("In validation 12");
	//return false;
	
	//validate Employer Contribution Up to Age
	
	if (!hasValue(lEmployerContributionUptoAge.value)) {
		document.getElementById('alertemployercua').innerHTML="Please enter Employer Contribution Upto Age";
		lEmployerContributionUptoAge.style.border = "2px solid red";
		errNps=1;
	}
	else{
		if (lEmployerContributionUptoAge.value == 0 || lEmployerContributionUptoAge.value > 100) {
			document.getElementById('alertemployercua').innerHTML="Age cannot be 0 or greater than 100";
			lEmployerContributionUptoAge.style.border = "2px solid red";
			errNps=1;	
		}
		else {
			var num = lEmployerContributionUptoAge.value;
			if (!isInteger(num)){
				document.getElementById('alertemployercua').innerHTML="Age must be positive integer and cannot start with 0";
				lEmployerContributionUptoAge.style.border = "2px solid red";
				errNps=1;	
			}
			else {
				// to be modified
				
				if (hasValue(lRetirementAge.value)) {
					//alert('has retirement age');
					//return false;
					if ((lEmployerContributionUptoAge.value) > (lRetirementAge.value)){
					//	alert('true');
						document.getElementById('alertemployercua').innerHTML="Employer contribution age cannot be greater than Retirement Age which is: " + lRetirementAge.value;
						lEmployerContributionUptoAge.style.border = "2px solid red";
						errNps=1;
					}
					else {
						//alert('false');
					}
				}
			}
		}
	}
	
	
//	alert("In validation 13");
//	return false;
	//validate Expected Annual Increase in Contribution
	
	

	//alert("In validation 14-1 "+ errEmployercua);
	
	if (errNps == 1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		return true;
	}
}

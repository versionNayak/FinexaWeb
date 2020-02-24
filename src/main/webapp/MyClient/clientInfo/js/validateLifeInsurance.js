function validateInsurance(form){
	//alert('inside Life Insurance validation');
	var pageMode = sessionStorage.getItem("PAGE_MODE");	
	var lInsuranceCompany = document.getElementById("insuranceCompanyList");
	var lInsurancePolicyType = document.getElementById("lifeInsurancePolicyType");
	var lOtherInsurancePolicyType = document.getElementById("idOtherPolicyType");
	var lPolicyName = document.getElementById("lifeInsurancePolicyName");
	var lPolicyNumber = document.getElementById("policyNumber");
	var lSumInsured = document.getElementById("sumInsured");
	//var //lSumInsuredGroup = document.getElementById("idSumInsuredGroup");
	var lPolicyStartDate = document.getElementById("policyStartDate");
	var lPolicyStartDateGroup = document.getElementById("idPolicyStartDateGroup");
	var lPremium = document.getElementById("premiumAmount");
	//var lPremiumGroup = document.getElementById("idPremiumGroup");
	var lPremiumPaymentFrequency = document.getElementById("premiumPaymentFreq");
	var lPolicyTenure = document.getElementById("policyTenure");
	//alert('Policy Tenure: '+lPolicyTenure.value);
	var lPremiumPaymentTenure = document.getElementById("premiumTenure");
	var lLockedUptoDate = document.getElementById("idLockedUptoDate");
	var lLockedUptoDateGroup = document.getElementById("idLockedUptoDateGroup");
	
	var errLI=0;
		
	lInsuranceCompany.style.border = "1px solid #ccc";
	lInsurancePolicyType.style.border = "1px solid #ccc";
	lOtherInsurancePolicyType.style.border = "1px solid #ccc";
	lPolicyName.style.border = "1px solid #ccc";
	lPolicyNumber.style.border = "1px solid #ccc";
	lSumInsured.style.border = "1px solid #ccc";
	//lSumInsuredGroup.style.border = "1px solid #ccc";
	//lSumInsuredGroup.style.borderRadius = "6px";
	lPolicyStartDate.style.border = "1px solid #ccc";
	lPolicyStartDateGroup.style.border = "1px solid #ccc";
	lPolicyStartDateGroup.style.borderRadius = "6px";
	lPremium.style.border = "1px solid #ccc";
	//lPremiumGroup.style.border = "1px solid #ccc";
	//lPremiumGroup.style.borderRadius = "6px";
	lPremiumPaymentFrequency.style.border = "1px solid #ccc";
	lPolicyTenure.style.border = "1px solid #ccc";
	lPremiumPaymentTenure.style.border = "1px solid #ccc";
	lLockedUptoDate.style.border = "1px solid #ccc";
	lLockedUptoDateGroup.style.border = "1px solid #ccc";
	
	document.getElementById('alertsic').innerHTML="";
	document.getElementById('alertsipt').innerHTML="";
	document.getElementById('alertoipt').innerHTML="";
	document.getElementById('alertipn').innerHTML="";
	document.getElementById('alertipnum').innerHTML="";
	document.getElementById('alertsi').innerHTML="";
	document.getElementById('alertpsd').innerHTML="";
	document.getElementById('alertp').innerHTML="";
	document.getElementById('alertppf').innerHTML="";
	document.getElementById('alertpt').innerHTML="";
	document.getElementById('alertppt').innerHTML="";
	document.getElementById('alertlud').innerHTML="";
	
	//validate Insurance Company
	if (lInsuranceCompany.value=="" || lInsuranceCompany.value==null){
		document.getElementById('alertsic').innerHTML="Please enter Insurance Company";
		lInsuranceCompany.style.border = "2px solid red";
		errLI=1;
	}
	//alert('after insurance company');

	//validate Insurance Policy Type
	if (lInsurancePolicyType.value=="" || lInsurancePolicyType.value==null){
		document.getElementById('alertsipt').innerHTML="Please enter Insurance Policy Type";
		lInsurancePolicyType.style.border = "2px solid red";
		errLI=1;
	}
	else {
		if ((lInsurancePolicyType.options[lInsurancePolicyType.selectedIndex].text=="Others") && (lOtherInsurancePolicyType.value== "" || lOtherInsurancePolicyType.value== null)){
			document.getElementById('alertoipt').innerHTML="Please enter Other Insurance Policy Type";
			lOtherInsurancePolicyType.style.border = "2px solid red";
			errLI=1;
		}
	}
//	alert('after ipt');
//	return false;
	
	//validate Policy Name
	if (lPolicyName.value== "" || lPolicyName.value== null) {
		document.getElementById('alertipn').innerHTML="Please enter Insurance Policy Name";
		lPolicyName.style.border = "2px solid red";
		errLI=1;
		}
	else{
		if(lPolicyName.value.length > 50) {
			document.getElementById('alertipn').innerHTML="Insurance Policy Name cannot be greater than 50 characters";
			lPolicyName.style.border = "2px solid red";
			errLI=1;
		}
		
	}
	//alert('after policy name');
	
	//validate Policy Number
	if (lPolicyNumber.value== "" || lPolicyNumber.value== null) {
		document.getElementById('alertipnum').innerHTML="Please enter Insurance Policy Number";
		lPolicyNumber.style.border = "2px solid red";
		errLI=1;
		}
	else{		
		if (!testInputData(lPolicyNumber, alphanumericOnly)){
			document.getElementById('alertipnum').innerHTML="Please enter alphanumeric only for Insurance Policy Number";
			lPolicyNumber.style.border = "2px solid red";
			errLI=1;
		}
		if(lPolicyNumber.value.length > 50) {
			document.getElementById('alertipnum').innerHTML="Insurance Policy Number cannot be greater than 50 characters";
			lPolicyNumber.style.border = "2px solid red";
			errLI=1;
		}		
	}
	

	
	//validate Sum Insured
	 //alert(hasValue(lSumInsured.value));
	 if (hasValue(lSumInsured.value)){ 
	
		 lSumInsured.value = lSumInsured.value.replace(/,/g, '');
			if (lSumInsured.value<= 0){
				//lSumInsuredGroup.style.border = "2px solid red";
				document.getElementById('alertsi').innerHTML="Sum insured can not be zero or negative.";
				errLI=1;
			}
			else{
			   if(!isDecimal(lSumInsured.value)){
				   //lSumInsuredGroup.style.border = "2px solid red";
				   document.getElementById('alertsi').innerHTML="Sum insured must be a valid decimal value.";
				   errLI=1;;
			   }
			   else{
				var num = lSumInsured.value;
				var n = Number(num).toFixed(2);
				lSumInsured.value = n;
			    }
			}
	    }
	 else{
		    document.getElementById('alertsi').innerHTML="Please enter Sum Insured";
		    lSumInsured.style.border = "2px solid red";
			errLI=1;
	}
		 
	
	//alert('before psd');

	//validate Policy Start Date
	if (lPolicyStartDate.value== "" || lPolicyStartDate.value== null) {
		document.getElementById('alertpsd').innerHTML="Please enter Policy Start Date";
		lPolicyStartDateGroup.style.border = "2px solid red";
		errLI=1;
		}
	else {
		//alert("Policy start date has been entered");
			if (date1AfterDate2(lPolicyStartDate.value,lLockedUptoDate.value)){
				document.getElementById('alertlud').innerHTML="Locked-upto-date cannot be before start date";
				lLockedUptoDateGroup.style.border = "2px solid red";
				errLI=1;				
			}
			else{
				var lLockUptoDate = moment(lLockedUptoDate.value,"DD/MM/YYYY");
				var lStartDatePlusTenure = moment(lPolicyStartDate.value,"DD/MM/YYYY").add(Number(lPolicyTenure.value), 'years');

				//alert ("Start date plus tenure: " + lStartDatePlusTenure)
				
				if(lLockUptoDate > lStartDatePlusTenure){
					document.getElementById('alertlud').innerHTML="Lock in Date cannot be greater than start date + policy tenure";
					policyStartDate.style.border = "2px solid red";
					errLI=1;
				}
			}
    }
	
//alert('after psd');
	
	//validate Premium
/*	if (lPremium.value=="" || lPremium.value==null) {
		alert("lPremium.value "+lPremium.value);
		document.getElementById('alertp').innerHTML="Please enter Premium";
		lPremiumGroup.style.border = "2px solid red";
		errLI=1;
	}
	else { 
		if ((lPremium.value)< 0 || (lPremium.value) == 0){
			alert("lPremium.value "+lPremium.value);
			document.getElementById('alertp').innerHTML="Premium cannot be 0 or negative.";
			lPremiumGroup.style.border = "2px solid red";
			errLI=1;
		}
		
		else {
			if (!isDecimal(lPremium.value)) {
				alert("lPremium.value "+lPremium.value);
				//alert('Inside premium decimal validation');
				document.getElementById('alertp').innerHTML="Premium must be a valid number.";
				lPremiumGroup.style.border = "2px solid red";
				errLI=1;		
			}	
			
			if(lPremium.value.length > 10) {
				alert("lPremium.value "+lPremium.value);
				document.getElementById('alertp').innerHTML="Premium cannot be greater than 10 digits";
				lPremiumGroup.style.border = "2px solid red";
				errLI=1;
			}
		}
	}*/
	
	  if (hasValue(lPremium.value)){    	
		  lPremium.value = lPremium.value.replace(/,/g, '');
			if (lPremium.value<= 0){
				lPremium.style.border = "2px solid red";
				document.getElementById('alertp').innerHTML="Premium cannot be zero or negative";
				errLI=1;
			}
			else{
			   if(!isDecimal(lPremium.value)){
				   lPremium.style.border = "2px solid red";
				   document.getElementById('alertp').innerHTML="Premium must be a valid number.";
				   errLI=1;;
			   }
			   else{
			   if(lPremium.value.length > 10) {
					alert("lPremium.value "+lPremium.value);
					document.getElementById('alertp').innerHTML="Premium cannot be greater than 10 digits";
					lPremium.style.border = "2px solid red";
					errLI=1;
				}
			   else{
				var num = lPremium.value;
				var n = Number(num).toFixed(2);
				lPremium.value = n;
			    }
			}
	    }
	}
	  else{
		//    alert("lPremium.value "+lPremium.value);
			document.getElementById('alertp').innerHTML="Please enter Premium";
			lPremium.style.border = "2px solid red";
			errLI=1;
	  }
	//alert('after premium');
	
	//validate Premium Payment Frequency
	var strUser3 = lPremiumPaymentFrequency.options[lPremiumPaymentFrequency.selectedIndex].value;
	if (strUser3==""){
		document.getElementById('alertppf').innerHTML="Please enter Premium Payment Frequency";
		lPremiumPaymentFrequency.style.border = "2px solid red";
		errLI=1;
	}
	//alert('after ppf');
	
	//validate Policy Tenure
	if (lPolicyTenure.value== "" || lPolicyTenure.value== null) {
		document.getElementById('alertpt').innerHTML="Please enter Policy Tenure";
		lPolicyTenure.style.border = "2px solid red";
		errLI=1;
		}
	else { 
		if (!isInteger(lPolicyTenure.value)) {
		document.getElementById('alertpt').innerHTML="Premiun tenure must be an integer or can not begin with zero ";
		lPolicyTenure.style.border = "2px solid red";
		errLI=1;		
		}
		else{
			if ((lPolicyTenure.value)< 0 || (lPolicyTenure.value) == 0){
				document.getElementById('alertpt').innerHTML="Policy tenure cannot be 0 or negative.";
				lPolicyTenure.style.border = "2px solid red";
				errLI=1;
			}
		
		}
	}
	
	//alert('after pt');
	
	//validate Premium Payment Tenure
	if (lPremiumPaymentTenure.value== "" || lPremiumPaymentTenure.value== null) {
		document.getElementById('alertppt').innerHTML="Please enter Premium Payment Tenure";
		lPremiumPaymentTenure.style.border = "2px solid red";
		errLI=1;
		}
	else {
		if (!isInteger(lPremiumPaymentTenure.value)) {
			document.getElementById('alertppt').innerHTML="Payment tenure must be an integer or can not begin with zero";
			lPremiumPaymentTenure.style.border = "2px solid red";
			errLI=1;	
		}	
		else{
			if ((lPremiumPaymentTenure.value)< 0 || (lPremiumPaymentTenure.value) == 0){
				document.getElementById('alertppt').innerHTML="Value cannot be 0 or negative.";
				lPremiumPaymentTenure.style.border = "2px solid red";
				errLI=1;
			}
			else{
				//alert ("Premium payment tenure: " + lPremiumPaymentTenure.value);
				//alert ("Policy tenure: " + lPolicyTenure.value);
				if (Number(lPremiumPaymentTenure.value) > Number(lPolicyTenure.value)){
					document.getElementById('alertppt').innerHTML="Premium payment tenure cannt be greater than policy tenure.";
					lPremiumPaymentTenure.style.border = "2px solid red";
					errLI=1;					
				}
			}
		}
	}
	
	//alert('after ppt');

	//validate Locked Upto Date
	 if ((hasValue(lPremium.value)) && (hasValue(lSumInsured.value))){
			//alert('Sum Isured: '+lSumInsured.value+' Premium: '+lPremium.value);
				if ( parseInt(lSumInsured.value) < parseInt(lPremium.value)){
					document.getElementById('alertsi').innerHTML="Sum Insured cannot be lesser than Premium.";
					//lSumInsuredGroup.style.border = "2px solid red";
					errLI=1;
				}
		 }
	 if ((hasValue(lPolicyTenure.value)) && (hasValue(lPremiumPaymentTenure.value))){
		 if ( parseInt(lPremiumPaymentTenure.value) > parseInt(lPolicyTenure.value) ){
				document.getElementById('alertppt').innerHTML="Premium Payment Tenure cannot be greater than Policy Tenure.";
				lPremiumPaymentTenure.style.border = "2px solid red";
				errLI=1;
		}

	 }
	
		 var dayMaturity = $("#idLockedUptoDate").val().slice(0,2);
			var monthMaturity = $("#idLockedUptoDate").val().slice(3,5);
			var yearMaturity = $("#idLockedUptoDate").val().slice(6);
			var DateReformattedMaturity  = yearMaturity.concat("-", monthMaturity, "-", dayMaturity);
			var dateMaturity = new Date(DateReformattedMaturity);
			var selectedDateMaturity = new Date(dateMaturity.toString());
			var dayCurrent = moment().format('DD/MM/YYYY').slice(0,2);
			var monthCurrent = moment().format('DD/MM/YYYY').slice(3,5);
			var yearCurrent = moment().format('DD/MM/YYYY').slice(6);
			var currentDateReformatted  = yearCurrent.concat("-", monthCurrent, "-", dayCurrent);
			var currentDate = new Date(currentDateReformatted);
			var selectedCurrentDate=new Date(currentDate.toString());
			if (selectedDateMaturity < selectedCurrentDate) {
				//alert("inside if");
				errLI=1;
				bootbox.alert({
					message: "Policy has already expired.",
					callback: function () {
						document.getElementById('alertform').innerHTML="";
						$(window).scrollTop(0);
					}
				});
			}

	 
	 		
	if (errLI==1 ){
		//alert("Error");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}
	else{
			return true;
		}		
	}	


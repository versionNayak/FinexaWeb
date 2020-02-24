function validateNonInsurance(form) {
	//var nlInsuranceType = document.getElementById("idInsuranceType");
	var nlInsurancePolicyType = document.getElementById("insurancePolicyType");
	//var nlOIPT = document.getElementById("idOIPT");
	var nlInsuranceCompany = document.getElementById("nonLifeInsuranceCompany");
	var nlInsurancePolicyName = document.getElementById("nonlifeInsurancePolicyName");
	var nlInsurancePolicyNumber = document.getElementById("policyNumber");
	var nlSumInsured = document.getElementById("sumInsured");
	//var nlSumInsuredGroup = document.getElementById("idSumInsuredGroup");
	var nlPremium = document.getElementById("premiumAmount");
	//var nlPremiumGroup = document.getElementById("idPremiumGroup");
	var nlPolicyStartDate = document.getElementById("policyStartDate");
	var nlPolicyEndDate = document.getElementById("policyEndDate");
	var nlPolicyStartDateGroup = document.getElementById("idPolicyStartDateGroup");
	var nlPolicyEndDateGroup = document.getElementById("idPolicyEndDateGroup");
	var errNLI=0;
	
	nlInsurancePolicyType.style.border = "1px solid #ccc";	
	//nlOIPT.style.border = "1px solid #ccc";	
	nlInsuranceCompany.style.border = "1px solid #ccc";	
	nlInsurancePolicyName.style.border = "1px solid #ccc";	
	nlInsurancePolicyNumber.style.border = "1px solid #ccc";	
	nlSumInsured.style.border = "1px solid #ccc";	
	//nlSumInsuredGroup.style.border = "1px solid #ccc";	
	//nlSumInsuredGroup.style.borderRadius = "6px";
	nlPremium.style.border = "1px solid #ccc";	
	//nlPremiumGroup.style.border = "1px solid #ccc";	
	//nlPremiumGroup.style.borderRadius = "6px";
	nlPolicyStartDate.style.border = "1px solid #ccc";	
	nlPolicyStartDateGroup.style.border = "1px solid #ccc";	
	nlPolicyStartDateGroup.style.borderRadius = "6px";
	nlPolicyEndDate.style.border = "1px solid #ccc";	
	nlPolicyEndDateGroup.style.border = "1px solid #ccc";	
	nlPolicyEndDateGroup.style.borderRadius = "6px";
	
	
//	document.getElementById('alertiit').innerHTML="";
	document.getElementById('alertsipt').innerHTML="";
	//document.getElementById('alertoipt').innerHTML="";
	document.getElementById('alertsic').innerHTML="";
	document.getElementById('alertipn').innerHTML="";
	document.getElementById('alertipnum').innerHTML="";
	document.getElementById('alertsi').innerHTML="";
	document.getElementById('alertpsd').innerHTML="";
	document.getElementById('alertp').innerHTML="";
	document.getElementById('alertped').innerHTML="";
	
	/*//validate Insurance Type
	var strUser2 = nlInsuranceType.options[nlInsuranceType.selectedIndex].text;
	if (strUser2=="Select"){
		document.getElementById('alertiit').innerHTML="Please enter Insurance Type";
		nlInsuranceType.style.border = "2px solid red";
		errIt=1;
	}
//	return false;
*/	
	//alert("1");
	
	//validate Insurance Policy Type
	var strUser3 = nlInsurancePolicyType.options[nlInsurancePolicyType.selectedIndex].text;
	if	(nlInsurancePolicyType.value =="" || nlInsurancePolicyType.value ==null) {
		document.getElementById('alertsipt').innerHTML="Please enter Insurance Policy Type";
		nlInsurancePolicyType.style.border = "2px solid red";
		errNLI=1;
	//	alert("PolicyType "+errNLI);
	}
	/*else {
		if (strUser3=="Others" && (nlOIPT.value== "" || nlOIPT.value== null)){
			document.getElementById('alertoipt').innerHTML="Please enter Other Insurance Policy Type";
			nlOIPT.style.border = "2px solid red";
			errNLI=1;
		}
	}*/
//	return false;
	//alert('Validate GI 4');
	
	//validate Insurance Company
	
	if	(nlInsuranceCompany.value =="" || nlInsuranceCompany.value ==null) {
		document.getElementById('alertsic').innerHTML="Please enter Insurance Company";
		nlInsuranceCompany.style.border = "2px solid red";
		errNLI=1;
	//	alert("InsuranceCompany "+errNLI);
	}
	
	// validate insurance policy name
	if (nlInsurancePolicyName.value== "" || nlInsurancePolicyName.value== null) {
		document.getElementById('alertipn').innerHTML="Please enter Insurance Policy Name";
		nlInsurancePolicyName.style.border = "2px solid red";
		errNLI=1;
		}
	
	//validate Policy Number
	if (nlInsurancePolicyNumber.value== "" || nlInsurancePolicyNumber.value== null) {
		document.getElementById('alertipnum').innerHTML="Please enter Insurance Policy Number";
		nlInsurancePolicyNumber.style.border = "2px solid red";
		errNLI=1;
		}
	else{//modified after
		
		var chkAlpha = isChar2(nlInsurancePolicyNumber.value);
		if (!chkAlpha){
			document.getElementById('alertipnum').innerHTML="Please enter letters or numbers for Insurance Policy Number";
			nlInsurancePolicyNumber.style.border = "2px solid red";
			errNLI=1;
		}
	}

	//validate Sum Insured
	if (hasValue(nlSumInsured.value)){    	
	//	alert("lSumInsured.value1 "+nlSumInsured.value);
		 nlSumInsured.value = nlSumInsured.value.replace(/,/g, '');
			if (nlSumInsured.value<= 0){
				nlSumInsured.style.border = "2px solid red";
				document.getElementById('alertsi').innerHTML="Sum insured can not zero or negative";
				errLI=1;
			}
			else{
			   if(!isDecimal(nlSumInsured.value)){
	//			   alert("nlSumInsured.value3 "+nlSumInsured.value);
				   nlSumInsured.style.border = "2px solid red";
				   document.getElementById('alertsi').innerHTML="Sum insured must be a valid decimal";
				   errLI=1;;
			   }
			   else{
	//		    alert("nlSumInsured.value4 "+nlSumInsured.value);
				var num = nlSumInsured.value;
				var n = Number(num).toFixed(2);
				nlSumInsured.value = n;
			    }
			}
	    }
	 else{
	//	 alert("nlSumInsured.value5 "+nlSumInsured.value);
		 document.getElementById('alertsi').innerHTML="Please enter Sum Insured";
		    nlSumInsured.style.border = "2px solid red";
			errLI=1;
	}
	
	
	//alert("6");

	//validate Premium
	 if (hasValue(nlPremium.value)){   
	//	 alert("nlPremium.value1 "+nlPremium.value)
		 nlPremium.value = nlPremium.value.replace(/,/g, '');
			if (nlPremium.value<= 0){
	//			alert("lPremium.value2 "+nlPremium.value);
				nlPremium.style.border = "2px solid red";
				document.getElementById('alertp').innerHTML="Premium cannot be zero or negative";
				errNLI=1;
			}
			else{
	//			alert("lPremium.value3 "+nlPremium.value);
			   if(!isDecimal(nlPremium.value)){
				   nlPremium.style.border = "2px solid red";
				   document.getElementById('alertp').innerHTML="Premium must be a valid number.";
				   errNLI=1;
			   }
			   else{
		//		   alert("lPremium.value4 "+nlPremium.value);
			   if(nlPremium.value.length > 10) {
		//			alert("nlPremium.value "+nlPremium.value);
					document.getElementById('alertp').innerHTML="Premium cannot be greater than 10 digits";
					nlPremium.style.border = "2px solid red";
					errNLI=1;
				}
			   else{
	//			   alert("lPremium.value5 "+nlPremium.value);
				var num = nlPremium.value;
				var n = Number(num).toFixed(2);
				nlPremium.value = n;
			    }
			}
	    }
	}
	  else{
	//	    alert("lPremium.value6 "+nlPremium.value);
			document.getElementById('alertp').innerHTML="Please enter Premium";
			nlPremium.style.border = "2px solid red";
			errLI=1;
	  }
	// alert("7");
	//validate Policy Start Date
	if (nlPolicyStartDate.value== "" || nlPolicyStartDate.value== null) {
		document.getElementById('alertpsd').innerHTML="Please enter Policy Start Date";
		nlPolicyStartDateGroup.style.border = "2px solid red";
		errNLI=1;
	//	alert("PolicyStartDate "+errNLI);
	}
	
	if (nlPolicyEndDate.value== ""|| nlPolicyEndDate.value== null) {
		document.getElementById('alertped').innerHTML="Please enter Policy End Date";
		nlPolicyEndDateGroup.style.border = "2px solid red";
		errNLI=1;
	//	alert("PolicyEndDate "+errNLI);
	}
	//alert("7.1");

	if (!(nlPolicyStartDate.value== "" || nlPolicyStartDate.value== null) && !(nlPolicyEndDate.value== ""|| nlPolicyEndDate.value== null))
	{
		//alert("7.2");
		
		if (date1AfterDate2(nlPolicyStartDate.value,nlPolicyEndDate.value)){
				//alert("7.3");
			
				document.getElementById('alertped').innerHTML="Policy End Date cannot be before Policy Start Date";
				nlPolicyEndDateGroup.style.border = "2px solid red";
				nlPolicyEndDateGroup.style.borderRadius = "9px";
				errNLI=1;
		}
		//alert("7.4");
	}
	
	if ((hasValue(nlPremium.value)) && (hasValue(nlSumInsured.value))){
		//alert('Sum Isured: '+lSumInsured.value+' Premium: '+lPremium.value);
			if ( parseInt(nlSumInsured.value) < parseInt(nlPremium.value)){
				document.getElementById('alertsi').innerHTML="Sum Insured cannot be lesser than Premium.";
				nlSumInsured.style.border = "2px solid red";
				errNLI=1;
			}
	}
	//alert("8");
	
	var dayPolicyEnd = $("#policyEndDate").val().slice(0,2);
	var monthPolicyEnd = $("#policyEndDate").val().slice(3,5);
	var yearPolicyEnd = $("#policyEndDate").val().slice(6);
	var DateReformattedPolicyEnd  = yearPolicyEnd.concat("-", monthPolicyEnd, "-", dayPolicyEnd);
	var datePolicyEnd = new Date(DateReformattedPolicyEnd);
	var selectedDatePolicyEnd = new Date(datePolicyEnd.toString());
	var dayCurrent = moment().format('DD/MM/YYYY').slice(0,2);
	var monthCurrent = moment().format('DD/MM/YYYY').slice(3,5);
	var yearCurrent = moment().format('DD/MM/YYYY').slice(6);
	var currentDateReformatted  = yearCurrent.concat("-", monthCurrent, "-", dayCurrent);
	var currentDate = new Date(currentDateReformatted);
	var selectedCurrentDate=new Date(currentDate.toString());
	if (selectedDatePolicyEnd < selectedCurrentDate) {
		errNLI=1;
		bootbox.alert({
			message: "Policy has already expired.",
			callback: function () {
				document.getElementById('alertform').innerHTML="";
				$(window).scrollTop(0);
			}
		});
	}
		
	if (errNLI==1) {
	//	alert("false");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
	//	alert("correct");
		return true;
	}
}
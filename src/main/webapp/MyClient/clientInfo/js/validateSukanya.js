function validateSukanya(form) {
//	alert('in validation');
//	return false;
	var lStartDate = document.getElementById("idDepositStartDate");
	var lStartDateGroup = document.getElementById("idDepositStartDateGroup");
	var lPeriodicInvestment = document.getElementById("idDepositAmount");
	var lInvestmentFrequency = document.getElementById("idDF");
	var lCompoundingFrequency = document.getElementById("idCF");
	var lMaturityDate = document.getElementById("idDepositMaturityDate");

	
	var errSS = 0;
	
//	alert('before border');
//	return false;
	
	lStartDateGroup.style.border = "1px solid #ccc";
	lStartDateGroup.style.borderRadius = "7px";
	lPeriodicInvestment.style.border = "1px solid #ccc";
	lCompoundingFrequency.style.border = "1px solid #ccc";
	lInvestmentFrequency.style.border = "1px solid #ccc";

	
//	alert('after border');
//	return false;
	
	document.getElementById('alertStartDate').innerHTML="";
	document.getElementById('alertDepositAmount').innerHTML="";
	document.getElementById('alertcf').innerHTML="";
	document.getElementById('alertdf').innerHTML="";

//	alert('before start date');
//	return false;
	
	//validate Start Date
	if (!hasValue(lStartDate.value)) {
		document.getElementById('alertStartDate').innerHTML="Please enter Deposit Start Date";
		lStartDateGroup.style.border = "2px solid red";
		lStartDateGroup.style.borderRadius = "7px";
		errSS=1;
	}else{
		window.user_dt = moment(lStartDate.value,'DD/MM/YYYY');
        
		if(!window.user_dt.isValid()){			
			document.getElementById('alertStartDate').innerHTML="Deposit Start Date is not a valid date";
			lStartDateGroup.style.border = "2px solid red";
			lStartDateGroup.style.borderRadius = "7px";
			errSS=1;			
		}else if(!isDateBetwenRange(window.client_dob, new Date(), window.user_dt.toDate())){
			document.getElementById('alertStartDate').innerHTML="Deposit Start Date should be in between client dob & today";
			lStartDateGroup.style.border = "2px solid red";
			lStartDateGroup.style.borderRadius = "7px";
			errSS=1;
		}
	}
	
//	alert('after start date');
//	return false;
	
	//validate Deposit Amount
	if (hasValue(lPeriodicInvestment.value)){
		lPeriodicInvestment.value = lPeriodicInvestment.value.replace(/,/g, '');
		if (lPeriodicInvestment.value == 0) {
			document.getElementById('alertDepositAmount').innerHTML="Value cannot be 0";
			lPeriodicInvestment.style.border = "2px solid red";
			errSS=1;
		}
		else {
			var num = lPeriodicInvestment.value;
			if (!isDecimal(num)) {
				document.getElementById('alertDepositAmount').innerHTML="Value must be positive decimal not starting with 0";
				lPeriodicInvestment.style.border = "2px solid red";
				errSS=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lPeriodicInvestment.value = n;
			}
		}
	}
	else {
		if (!hasValue(lPeriodicInvestment.value)) {
			document.getElementById('alertDepositAmount').innerHTML="Please enter Periodic Investment";
			lPeriodicInvestment.style.border = "2px solid red";
			errSS=1;
		}
	}
	
	
	//validate Compounding Frequency
	var compoundingFrequency = lCompoundingFrequency.options[lCompoundingFrequency.selectedIndex].value;
	if (compoundingFrequency=="0"){
		document.getElementById('alertcf').innerHTML="Please enter Compounding Frequency";
		lCompoundingFrequency.style.border = "2px solid red";
		errSS=1;
	}
	
	//validate Investment Frequency
	var invFrequency = lInvestmentFrequency.options[lInvestmentFrequency.selectedIndex].value;
	if (invFrequency=="0"){
		document.getElementById('alertdf').innerHTML="Please enter Investment Frequency";
		lInvestmentFrequency.style.border = "2px solid red";
		errSS=1;
	}
	
	//For solving JIRA: CIUAT-761
	var dayMaturity = lMaturityDate.value.slice(0,2);
	var monthMaturity = lMaturityDate.value.slice(3,5);
	var yearMaturity = lMaturityDate.value.slice(6);
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
		errSS=1;
		bootbox.alert({
			message: "Asset is already matured & it could be part of cash balance or other portfolio.",
			callback: function () {
				document.getElementById('alertform').innerHTML="";
				$(window).scrollTop(0);
			}
		});
	}
	
	if (errSS==1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}
	else {
		return true;
	}
}
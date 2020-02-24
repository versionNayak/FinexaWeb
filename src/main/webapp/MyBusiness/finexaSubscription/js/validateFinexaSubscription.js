function validateFS(form) {
//	alert("inside validation");
//	return false;
	var lRadios = document.getElementById("idRadios"); 
	var lUserNumber = document.getElementById("idUserNumber");
	var lClientNumber = document.getElementById("idClientNumber");
	var lSubscriptionPeriod = document.getElementById("idSubscriptionPeriod");
	var lSubscriptionAmount = document.getElementById("idSubscriptionAmount");
	
	//alert("lRadios: " + lRadios);
	
	var errFS = 0;
	
	lRadios.style.border = "1px solid #ccc";
	lUserNumber.style.border = "1px solid #ccc";
	lClientNumber.style.border = "1px solid #ccc";
	lSubscriptionPeriod.style.border = "1px solid #ccc";
	lSubscriptionAmount.style.border = "1px solid #ccc";
	
	document.getElementById('alertPlanningModule').innerHTML="";
	document.getElementById('alertUserNumber').innerHTML="";
	document.getElementById('alertClientNumber').innerHTML="";
	document.getElementById('alertPeriod').innerHTML="";
	document.getElementById('alertAmount').innerHTML="";
	
	
	//alert("check status of Financial Planning check box: " + document.getElementById('idFinancialPlanning').checked)
	
	if(document.getElementById('idGoalPlanning').checked == false && document.getElementById('idPortfolioManagement').checked == false && document.getElementById('idFinancialPlanning').checked == false){
		document.getElementById('alertPlanningModule').innerHTML="Please select a Planning Module.";
		lRadios.style.border = "2px solid red";
		errFS=1;
	}
	
	if(!hasValue(lUserNumber.value)){
		document.getElementById('alertUserNumber').innerHTML="Please enter number of users.";
		lUserNumber.style.border = "2px solid red";
		errFS=1;
	} else {
		var numUser = lUserNumber.value;
		if (!isInteger(numUser)){
			document.getElementById('alertUserNumber').innerHTML="Value must be a positive integer not starting with 0.";
			lUserNumber.style.border = "2px solid red";
			errFS=1;
		}
	}
	
	if(!hasValue(lClientNumber.value)){
		document.getElementById('alertClientNumber').innerHTML="Please enter number of clients.";
		lClientNumber.style.border = "2px solid red";
		errFS=1;
	} else {
		var numClient = lClientNumber.value;
		if (!isInteger(numClient)){
			document.getElementById('alertClientNumber').innerHTML="Value must be a positive integer not starting with 0.";
			lClientNumber.style.border = "2px solid red";
			errFS=1;
		}
	}
	
	var period = lSubscriptionPeriod.options[lSubscriptionPeriod.selectedIndex].value;
	if (period=="0"){
		document.getElementById('alertPeriod').innerHTML="Please select a subscription period.";
		lSubscriptionPeriod.style.border = "2px solid red";
		errFS=1;
	}
	
	if (hasValue(lSubscriptionAmount.value)){
		lSubscriptionAmount.value = lSubscriptionAmount.value.replace(/,/g, '');
		if (lSubscriptionAmount.value == 0) {
			document.getElementById('alertAmount').innerHTML="Amount cannot be 0.";
			lSubscriptionAmount.style.border = "2px solid red";
			errFS=1;
		} else {
			var amount = lSubscriptionAmount.value;
			if(!isDecimal(amount)){
				document.getElementById('alertAmount').innerHTML="Amount must be positive decimal not starting with 0.";
				lSubscriptionAmount.style.border = "2px solid red";
				errFS=1;
			} else {
				var n = Number(amount).toFixed(2);
				lSubscriptionAmount.value = n;
			}
		}
	}
	else {
		if (!hasValue(lSubscriptionAmount.value)){
			document.getElementById('alertAmount').innerHTML="Please enter subscription amount.";
			lSubscriptionAmount.style.border = "2px solid red";
			errFS=1;
		}
	}
	
	
	if (errFS==1){
		document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
		return false;
	}else{
		return true;
	}
	
	
}
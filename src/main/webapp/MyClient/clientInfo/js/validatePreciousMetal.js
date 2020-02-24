function validatePM(form) {
	
	//alert("in validation");
	//return false;
	
	var lAssetType = document.getElementById("idAssetType");
	var lInvestmentAmount = document.getElementById("idInvestmentAmount");
	var lInvestmentDate = document.getElementById("idDateOfInvestment");
	var lInvestmentDateGroup = document.getElementById("idDateOfInvestmentGroup");
	var lCurrentValue = document.getElementById("idCurrentValue");
	var lAssetDescription = document.getElementById("idAssetDescription");
	
	var errPM = 0;
	
	lAssetType.style.border = "1px solid #ccc";
	lInvestmentAmount.style.border = "1px solid #ccc";
	lInvestmentDateGroup.style.border = "1px solid #ccc";
	lInvestmentDateGroup.style.borderRadius = "7px";
	lCurrentValue.style.border = "1px solid #ccc";
	lAssetDescription.style.border = "1px solid #ccc";
	
	document.getElementById('alertAssetType').innerHTML="";
	document.getElementById('alertAmount').innerHTML="";
	document.getElementById('alertIDate').innerHTML="";
	document.getElementById('alertCurrentValue').innerHTML="";
	document.getElementById('alertAssetDescription').innerHTML="";
	
	//validate Asset Type
	var user1 = lAssetType.options[lAssetType.selectedIndex].value;
	if (user1 ==""){
		document.getElementById('alertAssetType').innerHTML="Please enter asset type";
		lAssetType.style.border = "2px solid red";
	    errPM=1;
	}
	
	if (hasValue(lInvestmentAmount.value)){
		lInvestmentAmount.value = lInvestmentAmount.value.replace(/,/g, '');
		if(lInvestmentAmount.value == 0){
			document.getElementById('alertAmount').innerHTML="Investment Amount cannot be zero";
			lInvestmentAmount.style.border = "2px solid red";			
			errPM=1;
		}
		else {
			var num = lInvestmentAmount.value;
			if (!isDecimal(num)){
				document.getElementById('alertAmount').innerHTML="Investment Amount must be a positive decimal not starting with 0";
				lInvestmentAmount.style.border = "2px solid red";			
				errPM=1;
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
			errPM=1;
	   }
   }
	
//	alert("after amount");
//	return false;
	
	if (!hasValue(lInvestmentDate.value)) {
		document.getElementById('alertIDate').innerHTML="Please enter Date of Investment";
		lInvestmentDateGroup.style.border = "2px solid red";
		lInvestmentDateGroup.style.borderRadius = "7px";
		errPM=1;
    }else{
    	window.user_dt = moment(lInvestmentDate.value,'DD/MM/YYYY');
        
		if(!window.user_dt.isValid()){
			document.getElementById('alertIDate').innerHTML="Date of Investment is not a valid date";
			lInvestmentDateGroup.style.border = "2px solid red";
			lInvestmentDateGroup.style.borderRadius = "7px";
			errPM=1;
		}else if(!isDateBetwenRange(window.client_dob, new Date(), window.user_dt.toDate())){
			document.getElementById('alertIDate').innerHTML="Date of Investment should be in between client dob & today";
			lInvestmentDateGroup.style.border = "2px solid red";
			lInvestmentDateGroup.style.borderRadius = "7px";
			errPM=1;
		}
    }
	
	if (hasValue(lCurrentValue.value)){
		lCurrentValue.value = lCurrentValue.value.replace(/,/g, '');
		if (lCurrentValue.value == 0){
			document.getElementById('alertCurrentValue').innerHTML="Current Value cannot be zero";
			lCurrentValue.style.border = "2px solid red";			
			errPM=1;
		}
		else {
			var num = lCurrentValue.value;
			if (!isDecimal(num)){
				document.getElementById('alertCurrentValue').innerHTML="Current Value must be positive decimal not starting with 0";
				lCurrentValue.style.border = "2px solid red";			
				errPM=1;
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
			errPM=1;		
		}
	}
	
	if (!hasValue(lAssetDescription.value)) {
		document.getElementById('alertAssetDescription').innerHTML="Please enter Asset Description.";
		lAssetDescription.style.border = "2px solid red";			
		errPM=1;	
	}
	
	if (errPM==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		return true;
	}
}
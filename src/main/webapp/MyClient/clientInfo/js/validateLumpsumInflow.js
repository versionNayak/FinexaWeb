function validateLumpsum(form) {
//	alert('in validation');
//    return false;
	var lInflowDescription = document.getElementById("idInflowDesc");
    var lExpectedValueOfInflow = document.getElementById("idExpectedInflow");
    var lExpectedDateOfInflow = document.getElementById("idExpectedInflowDate");
    var lExpectedDateOfInflowGroup = document.getElementById("idExpectedInflowDateGroup");
    
    var errLI = 0;
    
  //  alert('before inflow desc');
  //  return false;
    lInflowDescription.style.border = "1px solid #ccc";
    lExpectedValueOfInflow.style.border = "1px solid #ccc";
    lExpectedDateOfInflowGroup.style.border = "1px solid #ccc";
    lExpectedDateOfInflowGroup.style.borderRadius = "7px";
    
    document.getElementById('alertinflowdesc').innerHTML="";
    document.getElementById('alertexi').innerHTML="";
    document.getElementById('alertExDate').innerHTML="";
    
  //  alert('before inflow desc');
  //  return false;
    if (!hasValue(lInflowDescription.value)){
    	document.getElementById('alertinflowdesc').innerHTML="Please enter inflow description";
    	lInflowDescription.style.border = "2px solid red";
        errLI=1;
    } else{
		if(lInflowDescription.value.length > 50) {
			document.getElementById('alertinflowdesc').innerHTML="Inflow Description cannot be greater than 50 characters";
			lInflowDescription.style.border = "2px solid red";
			errLI=1;
		}
		
	}
    
 //   alert('inflowDV');
  //  return false;
    
    if (!hasValue(lExpectedValueOfInflow.value)) {
		document.getElementById('alertexi').innerHTML="Please enter Expected Value of Inflow";
		lExpectedValueOfInflow.style.border = "2px solid red";
		errLI=1;
		}
	else{
		lExpectedValueOfInflow.value = lExpectedValueOfInflow.value.replace(/,/g, '');
		if (lExpectedValueOfInflow.value == 0) {
			document.getElementById('alertexi').innerHTML="Value cannot be 0";
			lExpectedValueOfInflow.style.border = "2px solid red";
			errLI=1;
		}
		else {
			var num = lExpectedValueOfInflow.value;
			if (!isDecimal(num)){
				document.getElementById('alertexi').innerHTML="Valid number must be positive decimal not starting with 0";
				lExpectedValueOfInflow.style.border = "2px solid red";
				errLI=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lExpectedValueOfInflow.value = n;
			}
		}
	}
    
   //alert('before date');
  //  return false;
    
    if (!hasValue(lExpectedDateOfInflow.value)){
		//alert('Inside lid 1');
		document.getElementById('alertExDate').innerHTML="Please enter expected date of inflow";
		lExpectedDateOfInflowGroup.style.border = "2px solid red";
		lExpectedDateOfInflowGroup.style.borderRadius = "7px";
		errLI=1;
	}else{
		window.user_dt = moment(lExpectedDateOfInflow.value,'DD/MM/YYYY');
		
		if(!window.user_dt.isValid()){
			document.getElementById('alertExDate').innerHTML="Expected date is not a valid date";
			lExpectedDateOfInflowGroup.style.border = "2px solid red";
			lExpectedDateOfInflowGroup.style.borderRadius = "7px";
			errLI=1;
		}else if(!isDateBetwenRange(new Date(), window.client_lexp, window.user_dt.toDate())){
			document.getElementById('alertExDate').innerHTML="Expected date of inflow date must be less than client life expectancy";
			lExpectedDateOfInflowGroup.style.border = "2px solid red";
			lExpectedDateOfInflowGroup.style.borderRadius = "7px";
			errLI=1;
		}
		
	}
	
    if (errLI==1){
    	document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
    }
    else{
    	return true;
    }
}
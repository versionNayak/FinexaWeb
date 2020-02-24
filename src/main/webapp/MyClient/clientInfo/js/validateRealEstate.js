function validateRE(form) {
//	alert('In RE Validation');
//	return false;
	
	var lAssetType = document.getElementById("idAssetType");
	var lDescription = document.getElementById("idRealEstateDescription");
	var lRentalIncome = document.getElementById("idRentalIncome");
	var lRentalIncomeFrequency = document.getElementById("idRIF");
	var lInvestmentAmount = document.getElementById("idInvestmentAmount");
	var lInvestmentDate = document.getElementById("idDateOfInvestment");
	var lInvestmentDateGroup = document.getElementById("idDateOfInvestmentGroup");
	var lCurrentValue = document.getElementById("idCurrentValue");
	var lLienMarked = document.getElementById("idLienMarked")
	var lExpectedLienReleaseDate = document.getElementById("idExpectedLienReleaseDate");
	var lExpectedLienReleaseDateGroup = document.getElementById("idExpectedLienReleaseDateGroup");
	
	var errRE = 0;
	//alert('In RE Validation 2');
	
	lAssetType.style.border = "1px solid #ccc";
	lDescription.style.border = "1px solid #ccc";
	lRentalIncome.style.border = "1px solid #ccc";
	lRentalIncomeFrequency.style.border = "1px solid #ccc";
	lInvestmentAmount.style.border = "1px solid #ccc";
	lInvestmentDateGroup.style.border = "1px solid #ccc";
	lInvestmentDateGroup.style.borderRadius = "7px";
	lCurrentValue.style.border = "1px solid #ccc";
	lLienMarked.style.border = "1px solid #ccc";
	lExpectedLienReleaseDateGroup.style.border = "1px solid #ccc";
	lExpectedLienReleaseDateGroup.style.borderRadius = "7px";
	//alert('In RE Validation 3');
	
	document.getElementById('alertAssetType').innerHTML="";
	document.getElementById('alertDescription').innerHTML="";
	document.getElementById('alertRentalIncome').innerHTML="";
	document.getElementById('alertRif').innerHTML="";
	document.getElementById('alertAmount').innerHTML="";
	document.getElementById('alertIDate').innerHTML="";
	document.getElementById('alertCurrentValue').innerHTML="";
	document.getElementById('alertLienMarked').innerHTML="";
	document.getElementById('alertExpectedLienReleaseDate').innerHTML="";
	
	//alert('In RE Validation 4');
	
	var asset = lAssetType.options[lAssetType.selectedIndex].value;
    //alert('Asset Type'+asset); 
	if (asset=="") {
		document.getElementById('alertAssetType').innerHTML="Please enter Real Estate Asset Type";
		lAssetType.style.border = "2px solid red";
	    errRE=1;
	}

	//alert('After Asset Type Validation');
	var redesc = lDescription.options[lDescription.selectedIndex].value;
    if (redesc=="") {
		document.getElementById('alertDescription').innerHTML="Please enter Real Estate Description";
		lDescription.style.border = "2px solid red";
	    errRE=1;
	}
//	alert('After Description Validation');
//	return false;
		
	if (!hasValue(lRentalIncome.value)) {
	}
	else {
		if (asset=="1") {
			//alert('Rental Income: '+ lRentalIncome.value);
			if (hasValue(lRentalIncome.value)){
				lRentalIncome.value = lRentalIncome.value.replace(/,/g, '');
				if(lRentalIncome.value == 0){
					document.getElementById('alertRentalIncome').innerHTML="Rental Income cannot be zero";
					lRentalIncome.style.border = "2px solid red";			
					errRE=1;
				}
				else {
					var num = lRentalIncome.value;
					if (!isDecimal(num)){
						document.getElementById('alertRentalIncome').innerHTML="Rental Income must be a positive decimal not starting with 0";
						lRentalIncome.style.border = "2px solid red";			
						errRE=1;
					}
					else {
						var n = Number(num).toFixed(2);
						lRentalIncome.value = n;
					}
				}
	       }
			
			if (lRentalIncome.value>0) {
				var rif = lRentalIncomeFrequency.options[lRentalIncomeFrequency.selectedIndex].value;
			    if (rif=="") {
					document.getElementById('alertRif').innerHTML="Rental Income Frequency must be specified for rental properties";
					lRentalIncomeFrequency.style.border = "2px solid red";
				    errRE=1;
				}
			}
		}    
	}
	
	
//	alert('After Rental Income Validation');
//	return false;
	
	if (hasValue(lInvestmentAmount.value)){
		lInvestmentAmount.value = lInvestmentAmount.value.replace(/,/g, '');
		if(lInvestmentAmount.value == 0){
			document.getElementById('alertAmount').innerHTML="Investment Amount cannot be zero";
			lInvestmentAmount.style.border = "2px solid red";			
			errRE=1;
		}
		else {
			var num = lInvestmentAmount.value;
			if (!isDecimal(num)){
				document.getElementById('alertAmount').innerHTML="Investment Amount must be a positive decimal not starting with 0";
				lInvestmentAmount.style.border = "2px solid red";			
				errRE=1;
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
			errRE=1;
	   }
   }
	
//	alert("after IA");
//	return false;
	
	if (!hasValue(lInvestmentDate.value)) {
		document.getElementById('alertIDate').innerHTML="Please enter Date of Investment";
		lInvestmentDateGroup.style.border = "2px solid red";
		lInvestmentDateGroup.style.borderRadius = "7px";
		errRE=1;
    }else{
    	window.user_dt = moment(lInvestmentDate.value,'DD/MM/YYYY');
        
		if(!window.user_dt.isValid()){
			document.getElementById('alertIDate').innerHTML="Date of Investment is not a valid date";
			lInvestmentDateGroup.style.border = "2px solid red";
			lInvestmentDateGroup.style.borderRadius = "7px";
			errRE=1;
		}else if(!isDateBetwenRange(window.client_dob, new Date(), window.user_dt.toDate())){
			document.getElementById('alertIDate').innerHTML="Date of Investment should be in between client dob & today";
			lInvestmentDateGroup.style.border = "2px solid red";
			lInvestmentDateGroup.style.borderRadius = "7px";
			errRE=1;
		}
    }
	
//	alert("after IDate");
//	return false;
	
	if (hasValue(lCurrentValue.value)){
		lCurrentValue.value = lCurrentValue.value.replace(/,/g, '');
		if (lCurrentValue.value == 0){
			document.getElementById('alertCurrentValue').innerHTML="Current Value cannot be zero";
			lCurrentValue.style.border = "2px solid red";			
			errRE=1;
		}
		else {
			var num = lCurrentValue.value;
			if (!isDecimal(num)){
				document.getElementById('alertCurrentValue').innerHTML="Current Value must be positive decimal not starting with 0";
				lCurrentValue.style.border = "2px solid red";			
				errRE=1;
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
			errRE=1;		
		}
	}
	
	//alert('After Current Value Validation');
	//return false;
	
	var lienMarked = lLienMarked.options[lLienMarked.selectedIndex].value;
    if (lienMarked=="") {
		document.getElementById('alertLienMarked').innerHTML="Please enter Lien Marked";
		lLienMarked.style.border = "2px solid red";
	    errRE=1;
	}
    
    if (lienMarked=="1") {
    	if (!hasValue(lExpectedLienReleaseDate.value)) {
    		document.getElementById('alertExpectedLienReleaseDate').innerHTML="Please select Expected Lien Release Date.";
			lExpectedLienReleaseDateGroup.style.border = "2px solid red";
			lExpectedLienReleaseDateGroup.style.borderRadius = "7px";
			errRE=1;
    	}
    }
    
    if (hasValue(lExpectedLienReleaseDate.value)) {
		
    	window.user_dt = moment(lExpectedLienReleaseDate.value,'DD/MM/YYYY');
        
		if(!window.user_dt.isValid()){
			document.getElementById('alertExpectedLienReleaseDate').innerHTML="Expected Lien Release Date is not a valid date";
			lExpectedLienReleaseDateGroup.style.border = "2px solid red";
			lExpectedLienReleaseDateGroup.style.borderRadius = "7px";
			errRE=1;
		}else if(!isDateBetwenRange(window.client_dob, window.client_lexp, window.user_dt.toDate())){
			document.getElementById('alertExpectedLienReleaseDate').innerHTML="Expected Lien Release Date should be in between client dob & client life expectancy";
			lExpectedLienReleaseDateGroup.style.border = "2px solid red";
			lExpectedLienReleaseDateGroup.style.borderRadius = "7px";
			errRE=1;
		}
    }
	
	
	if (errRE==1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		return true;
	}	
}
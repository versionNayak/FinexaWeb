function validate(form){

	//alert('In Fixed Income Validation');
//	return false;
	//var lAssetType = document.getElementsByName("financialAssetType");
	var lDepositMaturityDate = document.getElementById("idDepositMaturityDate");
	var lTenureYear = document.getElementById("idDepositTenureyr");
	var lTenureMonth = document.getElementById("idDepositTenuremn");
	var errFI=0;	
	var lAssetType =$('input[name=financialAssetType]:checked',form).val()
//	alert("Asset Type: " + lAssetType);
//	return false;
    console.log("lAssetType "+lAssetType);
	document.getElementById("idCompoundingFrequency").style.border = "1px solid #ccc";
//	alert("errFI "+errFI);
	if (lAssetType==22) {
		document.getElementById("idInterestPayoutFrequency").style.border ="1px solid #ccc";
		document.getElementById('idDepositType').style.border ="1px solid #ccc";
		document.getElementById('alertDepositType').innerHTML="";
		document.getElementById('alertipf').innerHTML="";
		document.getElementById('alertcf').innerHTML="";

	
	
			var lDepositType=document.getElementById('idDepositType');
//			alert('Deposit Type: '+lDepositType.value);
			if (lDepositType.value=="") {				
				document.getElementById('alertDepositType').innerHTML="Please specify Deposit Type";
				lDepositType.style.border = "2px solid red";
				errFI=1;							
			}
		
			
			console.log("For FD");
			
			var compFreq = document.getElementById("idCompoundingFrequency");
			var payoutFreq = document.getElementById("idInterestPayoutFrequency");
			
			
			console.log("lDepositType.value "+lDepositType.value);
			console.log("compFreq "+compFreq.options[compFreq.selectedIndex].value);
			
			if (lDepositType.value == 1){
				//alert("if cummulative");
				//return false;
				if (compFreq.options[compFreq.selectedIndex].value==0) {
					//alert("in side compFreq");
					
					
					document.getElementById('alertcf').innerHTML="select Compounding Frequency";
					compFreq.style.border = "2px solid red";
					errFI=1;
				}
		/*		if (pageMode=="EDIT"){
					if (compFreq.options[compFreq.selectedIndex].value==0) {
						//alert("in side compFreq");
						
						
						document.getElementById('alertcf').innerHTML="select Compounding Frequency";
						compFreq.style.border = "2px solid red";
						errFI=1;
				}
			} else {
				if (pageMode=="ADD") {
					if (compFreq.options[compFreq.selectedIndex].value=="") {
						//alert("in side compFreq");
						
						
						document.getElementById('alertcf').innerHTML="select Compounding Frequency";
						compFreq.style.border = "2px solid red";
						errFI=1;
					}
				}
			}*/
				
				//alert(compFreq.options[compFreq.selectedIndex].value);
			}
			
			if (lDepositType.value == 2){
				console.log("if interest Payout");
				//return false;
				if (payoutFreq.options[payoutFreq.selectedIndex].value== "") {
					console.log("in side payoutFreq");
					//return false;
					document.getElementById('alertipf').innerHTML="Select Interest Payout Frequency";
					payoutFreq.style.border = "2px solid red";
					errFI=1;
				}
			}
			
	}
	
	var lInvestmentDate = document.getElementById("idDepositStartDate");
	var lInvestmentDateGroup = document.getElementById("idDepositStartDateGroup");	
	var lInvestmentAmount = document.getElementById("idDepositAmount");
	var lInterestRate = document.getElementById("idInterestRate");
	var lTenure = document.getElementById("idDepositTenure");
	
	
	//alert('In Fixed Income Validation 2');
	//return false;
	lInvestmentDate.style.border = "1px solid #ccc";
	lInvestmentDateGroup.style.border = "1px solid #ccc";
	lInvestmentAmount.style.border ="1px solid #ccc";
    lInterestRate.style.border ="1px solid #ccc";
	/*if (lAssetType==22 || lAssetType==23) {
		document.getElementById("idCompoundingFrequency").style.border ="1px solid #ccc";
		
	} */
	
	if (lAssetType==23) {
		document.getElementById("idDepositFrequency").style.border ="1px solid #ccc";
	}
//	alert("errF pia "+errFI);
	lTenure.style.border ="1px solid #ccc";
   // alert('In Fixed Income Validation 3');
	//return false;
	document.getElementById('alertStartDate').innerHTML="";
	document.getElementById('alertDepositAmount').innerHTML="";
	document.getElementById('alertInterestRate').innerHTML="";
	document.getElementById('alertDepositTenure').innerHTML="";

	
	/*if (lAssetType==22 || lAssetType==23) {
		document.getElementById('alertcf').innerHTML="";
	}*/
	if (lAssetType==23) {
		document.getElementById('alertipf').innerHTML="";
		document.getElementById('alertDepositType').innerHTML="";

	}
//	alert('In Fixed Income Validation 4');
//	return false;
	if (lAssetType==23) {
		document.getElementById('alertdepositfrequency').innerHTML="";
	}
	if (lAssetType==23) {
		document.getElementById('alerttenuretype').innerHTML="";
	}
	
	//alert("after alert message declaration");
	//return false;
	//validate investment Date
	if (!hasValue(lInvestmentDate.value)) {
		document.getElementById('alertStartDate').innerHTML="Please enter Investment date";
		lInvestmentDateGroup.style.border = "2px solid red";
		lInvestmentDateGroup.style.borderRadius = "9px";
		errFI=1;
	}else{
		
		window.user_dt = moment(lInvestmentDate.value,'DD/MM/YYYY');
        
		if(!window.user_dt.isValid()){
			document.getElementById('alertStartDate').innerHTML="Investment is not a valid date";
			lInvestmentDateGroup.style.border = "2px solid red";
			lInvestmentDateGroup.style.borderRadius = "9px";
			errFI=1;
		}else if(!isDateBetwenRange(window.client_dob, new Date(), window.user_dt.toDate())){
			document.getElementById('alertStartDate').innerHTML="Date of Investment should be in between client dob & today";
			lInvestmentDateGroup.style.border = "2px solid red";
			lInvestmentDateGroup.style.borderRadius = "9px";
			errFI=1;
		}
		
		
	}
	/*else if (!isFutureDate(lInvestmentDate.value)) {
//		alert('Is Future Date');
		document.getElementById('alertStartDate').innerHTML="Investment Date cannot be a future date";
		lInvestmentDateGroup.style.border = "2px solid red";
		lInvestmentDateGroup.style.borderRadius = "9px";
		errFI=1;		
	}*/
	
	//alert('after investment date validation');
	//return false;
	//validate deposit Amount
	
	if (!hasValue(lInvestmentAmount.value)) {
		document.getElementById('alertDepositAmount').innerHTML="Please enter Investment Amount";
		lInvestmentAmount.style.border = "2px solid red";
		errFI=1;
		}	
	else{
		var num = lInvestmentAmount.value*1;
		var num1 = lInvestmentAmount.value;
		
		if (!testInputDataValue(num1, decimalOnly)){
			document.getElementById('alertDepositAmount').innerHTML="Valid number must be positive integer not starting with 0";
			lInvestmentAmount.style.border = "2px solid red";
			errFI=1;
		}
		else {
			if (testInputDataValue(num, decimalOnly)){
				var n = num.toFixed(2);
				if (n < 0 || n==0) {
					document.getElementById('alertDepositAmount').innerHTML="Value must be greater than 0";
					lInvestmentAmount.style.border = "2px solid red";
					errFI=1;
				}
				else {
					lInvestmentAmount.value = n;
				}
			}
			else {
				document.getElementById('alertDepositAmount').innerHTML="Please enter a valid positive decimal value";
				lInvestmentAmount.style.border = "2px solid red";
				errFI=1;
			}
		}
	}

	//alert('after investment amount validation');
	//return false;
	//alert("errFI tutu; "+errFI);
	//alert("lInterestRate.value "+lInterestRate.value);
	if (lAssetType==22 || lAssetType==23 || lAssetType==27) {
		if (!hasValue(lInterestRate.value)) {
		//	alert("errFI aishani  "+errFI);
		    document.getElementById('alertInterestRate').innerHTML="Please enter Interest Rate";
			lInterestRate.style.border = "2px solid red";
			errFI=1;
		}
		else{
		//	alert("errFI oly  "+errFI);
			var num = lInterestRate.value*1;
			var num1 = lInterestRate.value;
			
			if (!testInputDataValue(num1, decimalOnly)){
				document.getElementById('alertInterestRate').innerHTML="Valid number must be positive integer not starting with 0";
				lInterestRate.style.border = "2px solid red";
				errFI=1;
			}
			else {
				if (testInputDataValue(num, decimalOnly)){
					var n = num.toFixed(2);
					if (n < 0 || n==0) {
						document.getElementById('alertInterestRate').innerHTML="Value must be greater than 0";
						lInterestRate.style.border = "2px solid red";
						errFI=1;
					
					}
					else {
						if (lAssetType==22) {
							if (n > 50) {
								document.getElementById('alertInterestRate').innerHTML="Value can not be greater than  50";
								lInterestRate.style.border = "2px solid red";
								errFI=1;
							}
						}
						if (lAssetType==23) {
							if (n > 20) {
								document.getElementById('alertInterestRate').innerHTML="Value can not be greater than  20";
								lInterestRate.style.border = "2px solid red";
								errFI=1;
							}
						}
						lInterestRate.value = n;
					}
				}
				else {
					document.getElementById('alertInterestRate').innerHTML="Please enter a valid positive decimal value";
					lInterestRate.style.border = "2px solid red";
					errFI=1;
				}
			}
		}
}
//		alert("errFI mou  "+errFI);
	//alert('after interest rate validation');
//	return false;
	


//	return false;
	
	if (lAssetType==23) {
		//alert("if asset type is 2 or 3");
		//return false;
		var compFreq = document.getElementById("idCompoundingFrequency");
		if (compFreq.options[compFreq.selectedIndex].value== "") {
			//alert("in side compFreq");
			//return false;
			document.getElementById('alertcf').innerHTML="Select Compounding Frequency";
			compFreq.style.border = "2px solid red";			
			errFI=1;
		}
	}
//	alert("errFI papri  "+errFI);
//	alert("after compounding frequency");
//	return false;
	//validate Tenure
	
if ($("#idRecurringDeposit").is(':checked')) {
		
		var mn = $('#idDepositTenuremn').val();
		var yr = $('#idDepositTenureyr').val();
		
		if($('#idBondType').val() != 2){
			
			document.getElementById("idDepositTenuremn").style.border = "none";
			document.getElementById("idDepositTenureyr").style.border = "none";
			
			if(mn == '' && yr == ''){
				document.getElementById('alertDepositTenure').innerHTML="Please enter Tenure";
				//lTenure.style.border = "2px solid red";
				document.getElementById("idDepositTenuremn").style.border = "2px solid red";
				document.getElementById("idDepositTenureyr").style.border = "2px solid red";
				errFI=1;
			}else{
				 var num = lTenureYear.value;
				 var num1 = lTenureMonth.value;
				 if(!isInteger(num) && !isInteger(num1)){
					 document.getElementById('alertDepositTenure').innerHTML="Value must be a positive integer not starting with 0";
						//lTenure.style.border = "2px solid red";
						document.getElementById("idDepositTenuremn").style.border = "2px solid red";
						document.getElementById("idDepositTenureyr").style.border = "2px solid red";
						errFI=1;
				 }
					
				/*if (!testInputDataValue(num, integerOnly)){
					document.getElementById('alertDepositTenure').innerHTML="Value must be a positive integer not starting with 0";
					lTenure.style.border = "2px solid red";
					errFI=1;
				}*/
				// Asset Type FD or RD, Tenure Type Years, Tenure cannot be more than 10 years
				/*else {*/
					if ((lAssetType==22)||(lAssetType==23)) {
//						alert('Tenure Type Years: '+document.getElementById('idTenureTypeYears').checked+'Tenure '+lTenure.value);
						if (/*(document.getElementById('idTenureTypeYears').checked)  &&*/ (yr > 10)) {
//							alert('Tenure more tha 10 years');
							document.getElementById('alertDepositTenure').innerHTML="Tenure cannot be more than 10 years";
							document.getElementById("idDepositTenureyr").style.border = "2px solid red";
							errFI=1;
						}	
						
					}
					if (lAssetType==23) {
//						alert('Tenure Type Years: '+document.getElementById('idTenureTypeYears').checked+'Tenure '+lTenure.value);
						if (/*(document.getElementById('idTenureTypeMonths').checked)  &&*/ (mn > 12)) {
//							alert('Tenure more tha 10 years');
							document.getElementById('alertDepositTenure').innerHTML="Tenure cannot be more than 12 months";
							document.getElementById("idDepositTenuremn").style.border = "2px solid red";
							//lTenure.style.border = "2px solid red";
							errFI=1;
						}	
						
					}	
					
				/*}*/
			}
		}
		
		
	}else{
		if (!hasValue(lTenure.value)) {
			document.getElementById('alertDepositTenure').innerHTML="Please enter Tenure";
			lTenure.style.border = "2px solid red";
			errFI=1;
		} else {
			    var num = lTenure.value;
				
				if (!testInputDataValue(num, integerOnly)){
					document.getElementById('alertDepositTenure').innerHTML="Value must be a positive integer not starting with 0";
					lTenure.style.border = "2px solid red";
					errFI=1;
				}
			// Asset Type FD or RD, Tenure Type Years, Tenure cannot be more than 10 years
			else {
				if ((lAssetType==22)||(lAssetType==23)) {
//					alert('Tenure Type Years: '+document.getElementById('idTenureTypeYears').checked+'Tenure '+lTenure.value);
					if ((document.getElementById('idTenureTypeYears').checked)  && (lTenure.value > 10)) {
//						alert('Tenure more tha 10 years');
						document.getElementById('alertDepositTenure').innerHTML="Tenure cannot be more than 10 years";
						lTenure.style.border = "2px solid red";
						errFI=1;
					}	
					
				}
				if (lAssetType==23) {
//					alert('Tenure Type Years: '+document.getElementById('idTenureTypeYears').checked+'Tenure '+lTenure.value);
					if ((document.getElementById('idTenureTypeMonths').checked)  && (lTenure.value > 12)) {
//						alert('Tenure more tha 10 years');
						document.getElementById('alertDepositTenure').innerHTML="Tenure cannot be more than 12 months";
						lTenure.style.border = "2px solid red";
						errFI=1;
					}	
					
				}	
				
			}
		}
	}
	
	
//	alert("after tenure");
//	return false;


	
//	alert('after payout freq');
//	return false;	
//	alert("errFIIIIIIII "+errFI);
	if (lAssetType==23) {
		var depositFreq = document.getElementById("idDepositFrequency");
		if (depositFreq.options[depositFreq.selectedIndex].value== 0) {
			//alert("in deposit frequency");
			//return false;
			document.getElementById('alertdepositfrequency').innerHTML="Select Deposit Frequency";
			depositFreq.style.border = "2px solid red";			
			errFI=1;
		}
	}
//	alert('Asset Type: '+lAssetType);
//	return false;
	if ((lAssetType==23)) {
		if (!(document.getElementById('idTenureTypeYears').checked) && !(document.getElementById('idTenureTypeDays').checked) && !(document.getElementById('idTenureTypeMonths').checked)){
			//alert("not checked");
			//return false;
			document.getElementById('alerttenuretype').innerHTML="Tenure Years or Days should be mentioned";
			document.getElementById('idTenureYears').style.border = "2px solid red";
			errFI=1;
		}
	}
	
	
//	alert("errFIIIIIIII IIIIII"+errFI);
	

//	alert("after deposit type validation");
    //return false;
	if (lAssetType==24) {
		var lBondPurchased=document.getElementById('idBondPurchased');
		var lBondFaceValue=document.getElementById('idBondValue');
		var lBondType=document.getElementById('idBondType');
		var lInterestRate = document.getElementById("idInterestRate");
		var lBondCurrentYield=document.getElementById('idCurrentYield');
		var lInterestPayoutFrequency=document.getElementById('idInterestPayoutFrequency');
	//	alert("Bond Validation 1"+errFI);
	//	return false;
		lBondPurchased.style.border = "1px solid #ccc";
		lBondFaceValue.style.border = "1px solid #ccc";
		lBondType.style.border = "1px solid #ccc";
		lBondCurrentYield.style.border = "1px solid #ccc";
		lInterestRate.style.border ="1px solid #ccc";
		lInterestPayoutFrequency.style.border ="1px solid #ccc";
		
	//	alert('Bond Validation 2');
	//	return false;
		
		document.getElementById('alertBondPurchased').innerHTML="";
		document.getElementById('alertBondType').innerHTML="";
		document.getElementById('alertInterestRate').innerHTML="";
		document.getElementById('alertBondValue').innerHTML="";
		document.getElementById('alertCurrentYield').innerHTML="";
		document.getElementById('alertipf').innerHTML="";

		//	alert('Bond Validation 3');
	//	return false;
		
	 	/*if (lInterestRate.value=="" || lInterestRate.value==null ) {
			document.getElementById('alertInterestRate').innerHTML="Please enter Annual Coupon Rate";
			lInterestRate.style.border = "2px solid red";
			errFI=1;									
		}	*/		
		
		if (lBondType.value=="") {				
			document.getElementById('alertBondType').innerHTML="Please specify Bond Type";
			lBondType.style.border = "2px solid red";
			errFI=1;			
		}
		
//		alert('Bond Validation 4'+errFI);
		if (!hasValue(lBondPurchased.value)) {
			document.getElementById('alertBondPurchased').innerHTML="Please enter Bonds Purchased";
			lBondPurchased.style.border = "2px solid red";
			errFI=1;									
		}						
		else {
			    var num = lBondPurchased.value;
				
				if (!testInputDataValue(num, integerOnly)){
					document.getElementById('alertBondPurchased').innerHTML="Value must be a positive integer not starting with 0";
					lBondPurchased.style.border = "2px solid red";
					errFI=1;
				}
		}
//		alert('Bond Validation 5');
		
		if (!hasValue(lBondFaceValue.value)) {
			document.getElementById('alertBondValue').innerHTML="Please enter Bond Face Value";
			lBondFaceValue.style.border = "2px solid red";
			errFI=1;									
		}				
		else {
			var num = lBondFaceValue.value*1;
			var num1 = lBondFaceValue.value;
			
			if (!testInputDataValue(num1, decimalOnly)){
				document.getElementById('alertBondValue').innerHTML="Valid number must be positive integer not starting with 0";
				lBondFaceValue.style.border = "2px solid red";
				errFI=1;	
			}
			else {
				if (testInputDataValue(num, decimalOnly)){
					var n = num.toFixed(2);
					if (n < 0 || n == 0){
						document.getElementById('alertBondValue').innerHTML="Value must be greater than 0";
						lBondFaceValue.style.border = "2px solid red";
						errFI=1;	
					}
					else {
						lBondFaceValue.value = n;
					}
				}
				else {
					document.getElementById('alertBondValue').innerHTML="Please enter a valid positive decimal value";
					lBondFaceValue.style.border = "2px solid red";
					errFI=1;	
				}
			}
		} 
	
//		alert('Bond Validation 6');
		if (!hasValue(lBondCurrentYield.value)) {
			document.getElementById('alertCurrentYield').innerHTML="Please enter Current Yield";
			lBondCurrentYield.style.border = "2px solid red";
			errFI=1;									
		}		
		else {
			var num = lBondCurrentYield.value*1;
			var num1 = lBondCurrentYield.value;
			
			if (!testInputDataValue(num1, decimalOnly)){
				document.getElementById('alertCurrentYield').innerHTML="Valid number must be positive integer not starting with 0";
				lBondCurrentYield.style.border = "2px solid red";
				errFI=1;	
			}
			else {
				if (testInputDataValue(num, decimalOnly)){
					var n = num.toFixed(2);
					if (n < 0 || n == 0){
						document.getElementById('alertCurrentYield').innerHTML="Value must be greater than 0";
						lBondCurrentYield.style.border = "2px solid red";
						errFI=1;	
					}
					else {
						lBondCurrentYield.value = n;
					}
				}
				else {
					document.getElementById('alertCurrentYield').innerHTML="Please enter a valid positive decimal value";
					lBondCurrentYield.style.border = "2px solid red";
					errFI=1;	
				}
			}
		}
//		alert('Bond Validation 7');
		
		if ( (lBondFaceValue.value!="" && lBondFaceValue.value!=null) && (lBondPurchased.value!="" && lBondPurchased.value!=null) && (lInvestmentAmount.value!="" && lInvestmentAmount.value!=null )) {
			if ((parseFloat(lBondFaceValue.value)*parseInt(lBondPurchased.value)) < parseFloat(lInvestmentAmount.value)) {
				document.getElementById('alertBondValue').innerHTML="face value*number of bonds cannot be less than investment amount";
//				alert('face value*number of bonds cannot be less than investment amount');
				errFI=1;						
			}
		}
	//	alert("Bond Validation 8"+errFI);
	//	return false;
		if	(lBondType.value>1) {
			//alert("bond type is >1");
		//	return false;
			if(!hasValue(lInterestRate.value)) {
				document.getElementById('alertInterestRate').innerHTML="Please Enter Annual Coupon Rate";
				lInterestRate.style.border = "2px solid red";			
				errFI=1;
			} else {
				var num = lInterestRate.value*1;
				var num1 = lInterestRate.value;
				
				if (!testInputDataValue(num1, decimalOnly)){
					document.getElementById('alertInterestRate').innerHTML="Valid number must be positive integer not starting with 0";
					lInterestRate.style.border = "2px solid red";
					errFI=1;
				}
				else {
					if (testInputDataValue(num, decimalOnly)){
						var n = num.toFixed(2);
						if (n < 0 || n==0) {
							document.getElementById('alertInterestRate').innerHTML="Value must be greater than 0";
							lInterestRate.style.border = "2px solid red";
							errFI=1;
						}
						else {
							lInterestRate.value = n;
						}
					}
					else {
						document.getElementById('alertInterestRate').innerHTML="Please enter a valid positive decimal value";
						lInterestRate.style.border = "2px solid red";
						errFI=1;
					}
				}
			}
			//console.log("payout freq "+lInterestPayoutFrequency.options[lInterestPayoutFrequency.selectedIndex].value);
			if(lInterestPayoutFrequency.options[lInterestPayoutFrequency.selectedIndex].value=="") {
				//alert("ppppppp ");
				document.getElementById('alertipf').innerHTML="Please Enter Coupon Payout Frequency";
				lInterestPayoutFrequency.style.border = "2px solid red";			
				errFI=1;
			}
			
		}
	}
	
	//For solving JIRA: CIUAT-759
	var dayMaturity = lDepositMaturityDate.value.slice(0,2);
	var monthMaturity = lDepositMaturityDate.value.slice(3,5);
	var yearMaturity = lDepositMaturityDate.value.slice(6);
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
		errFI=1;
		bootbox.alert({
			message: "Asset is already matured & it could be part of cash balance or other portfolio.",
			callback: function () {
				document.getElementById('alertform').innerHTML="";
				$(window).scrollTop(0);
			}
		});
	}

	//alert('End validation '+errFI);
		//return false;
	if (errFI==1){
		//document.getElementById('alertForm').style.visibility="visible";
		$("#alertform").show();
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		return true;
	}
}
	
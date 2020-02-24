function validatePPF(form) {
//alert('In validation PPF' + form);
//return false;
	var pageMode = sessionStorage.getItem("PAGE_MODE");	
	var lPPFStartDate = document.getElementById("idStartDate");
	var lIdCalendarStartDate = document.getElementById("idPPFStartDateCalendar");
	var lCurrentPPFBalance = document.getElementById("idCurrentBalance");
//	var lCurrentPPFBalanceRupee = document.getElementById("idPPFCurBalanceRupee");
	var lPlannedDepositAmount = document.getElementById("idPlannedDepositAmount");
//	var lPlannedDepositAmountRupee = document.getElementById("idPPFDepositAmountRupee");
	var lPPFTenure = document.getElementById("idPPFTenure");
	var lPPFExtension = $("input:radio[name=extensionFlag]:checked").val();
	var lPPFExtensionType = document.getElementById("idExtTypeFlag");
	var lPPFExtensionStartDate = document.getElementById("idExtensionStartDate");
	var lIdCalendarExtStartDate = document.getElementById("idPPFExtStartDateCalendar");
//	var lDepositAmount = document.getElementById("iddepositAmtExtPeriod");
	var lInterestRate = document.getElementById("idInterestRate");
	var lExtCurrentBalance = document.getElementById("idExtensionCurrentBalance");
//	var lExtCurrentBalanceRupee = document.getElementById("idPPFExtCurBalanceRupee");
	var lExtDepositAmount = document.getElementById("idDepositAmountExt");
//	var lExtDepositAmountRupee = document.getElementById("idPPFExtDepositAmountRupee");
	var lExtInterestRate = document.getElementById("idExtensionInterestRate");
	//var lExtTenure = document.getElementById("idExtensionTenure");
	var lExtensionY = document.getElementById("idppfExtension1");
	var lDepositFrequency = document.getElementById("idAmountDepositFrequency");
	var lExtDepositFrequency = document.getElementById("idAmountDepositFrequencyExt");
	//var member = SELECTED_FAMILY_MEMBER_ID;
	
	var errPPF=0;
	
	lPPFStartDate.style.border = "1px solid #ccc";
	lIdCalendarStartDate.style.border = "1px solid #ccc";
    lCurrentPPFBalance.style.border = "1px solid #ccc";
//    lCurrentPPFBalanceRupee.style.border = "1px solid #ccc";
    lPlannedDepositAmount.style.border = "1px solid #ccc";
//    lPlannedDepositAmountRupee.style.border = "1px solid #ccc";
    lPPFTenure.style.border = "1px solid #ccc";
    document.getElementById("idPPFExtension").style.border = "none";
    lPPFExtensionType.style.border = "1px solid #ccc";
    lPPFExtensionStartDate.style.border = "1px solid #ccc";
//    lDepositAmount.style.border = "1px solid #ccc";
	lIdCalendarExtStartDate.style.border = "1px solid #ccc";
	lInterestRate.style.border = "1px solid #ccc";
	lExtCurrentBalance.style.border = "1px solid #ccc";
//	lExtCurrentBalanceRupee.style.border = "1px solid #ccc";
	lExtDepositAmount.style.border = "1px solid #ccc";
//	lExtDepositAmountRupee.style.border = "1px solid #ccc";
	lExtInterestRate.style.border = "1px solid #ccc";
	//lExtTenure.style.border = "1px solid #ccc";
	lDepositFrequency.style.border = "1px solid #ccc";
	lExtDepositFrequency.style.border = "1px solid #ccc";
	
	
	document.getElementById('alertppfsd').innerHTML="";
	document.getElementById('alertppfcb').innerHTML="";
	document.getElementById('alertpda').innerHTML="";
	document.getElementById('alertppftenure').innerHTML="";
	document.getElementById('alertppfext').innerHTML="";
	document.getElementById('alertppfet').innerHTML="";
	document.getElementById('alertppfesd').innerHTML="";
	document.getElementById('alertdaep').innerHTML="";
	//document.getElementById('alertppfexttenure').innerHTML="";
	document.getElementById('alertppfextinterestrate').innerHTML="";
	document.getElementById('alertextcurbalance').innerHTML="";
	document.getElementById('alertppfinterestrate').innerHTML="";
	document.getElementById('alertppfdf').innerHTML="";
	document.getElementById('alertAdfExt').innerHTML="";
	
//	alert('In validation 4');
	//return false;
	
	//validate PPF Start Date
	if (!hasValue(lPPFStartDate.value)) {
		document.getElementById('alertppfsd').innerHTML="Please enter PPF Start Date";
		lPPFStartDate.style.border = "2px solid red";
		lIdCalendarStartDate.style.border = "2px solid red";
		errPPF=1;
	}else{
		window.user_dt = moment(lPPFStartDate.value,'DD/MM/YYYY');
        
		if(!window.user_dt.isValid()){
			document.getElementById('alertppfsd').innerHTML="PPF Start Date is not a valid date";
			lPPFStartDate.style.border = "2px solid red";
			lIdCalendarStartDate.style.border = "2px solid red";
			errPPF=1;
		}else if(!isDateBetwenRange(window.client_dob , new Date(), window.user_dt.toDate())){
			document.getElementById('alertppfsd').innerHTML= "PPF Start Date should be in between client dob & today";
			lPPFStartDate.style.border = "2px solid red";
			lIdCalendarStartDate.style.border = "2px solid red";
			errPPF=1;
		}
	}
	
	//alert("In validation 5");
	//return false;
	
	if (!hasValue(lCurrentPPFBalance.value) && !hasValue(lPlannedDepositAmount.value)) {
		document.getElementById('alertppfcb').innerHTML="Please enter either Current PPF Balance or Planned Deposit Amount";
		lCurrentPPFBalance.style.border = "2px solid red";
		document.getElementById('alertpda').innerHTML="Please enter either Current PPF Balance or Planned Deposit Amount";
		lPlannedDepositAmount.style.border = "2px solid red";
		errPPF=1;
	}
	
	//validate PPF Current Balance And Or Planned Deposit Amount
	if (hasValue(lCurrentPPFBalance.value)){
		
		lCurrentPPFBalance.value = lCurrentPPFBalance.value.replace(/,/g, '');
		if (lCurrentPPFBalance.value == 0) {
			document.getElementById('alertppfcb').innerHTML="Current PPF Balance cannot be 0";
			lCurrentPPFBalance.style.border = "2px solid red";
//			lCurrentPPFBalanceRupee.style.border = "2px solid red";
			errPPF=1;
		}
		else {
			var num = lCurrentPPFBalance.value;
			if (!isDecimal(num)){
				document.getElementById('alertppfcb').innerHTML="Current PPF Balance must be a positive value not starting with 0.";
				lCurrentPPFBalance.style.border = "2px solid red";
//				lCurrentPPFBalanceRupee.style.border = "2px solid red";
				errPPF=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lCurrentPPFBalance.value = n;
			}
		}
		
		var num = lPlannedDepositAmount.value;
		if (num != "") {
			if (!isDecimal(num)){
				document.getElementById('alertpda').innerHTML="Current PPF Balance must be a positive value not starting with 0.";
				lPlannedDepositAmount.style.border = "2px solid red";
//				lPlannedDepositAmountRupee.style.border = "2px solid red";
				errPPF=1;
			} else {
				var n = Number(num).toFixed(2);
				lPlannedDepositAmount.value = n;
			}
		}
		
	
	} else {
		if (hasValue(lPlannedDepositAmount.value)) {
			lPlannedDepositAmount.value = lPlannedDepositAmount.value.replace(/,/g, '');
			if (lPlannedDepositAmount.value == 0){
				document.getElementById('alertpda').innerHTML="Current PPF Balance cannot be 0";
				lPlannedDepositAmount.style.border = "2px solid red";
//				lPlannedDepositAmountRupee.style.border = "2px solid red";
				errPPF=1;
			}
			else {
				var num = lPlannedDepositAmount.value;
				if (!isDecimal(num)){
					document.getElementById('alertpda').innerHTML="Current PPF Balance must be a positive value not starting with 0.";
					lPlannedDepositAmount.style.border = "2px solid red";
//					lPlannedDepositAmountRupee.style.border = "2px solid red";
					errPPF=1;
				}
				else {
					var n = Number(num).toFixed(2);
					lPlannedDepositAmount.value = n;
				}
			}
		}
	}
			
	if (hasValue(lPlannedDepositAmount.value) && hasValue(lCurrentPPFBalance.value)) {
		if (lPlannedDepositAmount.value == 0 && lCurrentPPFBalance.value == 0){
			document.getElementById('alertpda').innerHTML="Current PPF Balance cannot be 0";
			document.getElementById('alertppfcb').innerHTML="Current PPF Balance cannot be 0";
			lPlannedDepositAmount.style.border = "2px solid red";
			lCurrentPPFBalance.style.border = "2px solid red";
			errPPF=1;
		}
	}
	
	
	//alert("after validation 6");
	//return false;
	
	var userPPFDF = lDepositFrequency.options[lDepositFrequency.selectedIndex].value;
	if(userPPFDF == 0) {
		document.getElementById('alertppfdf').innerHTML="Please enter Amount Deposit Frequency";
		lDepositFrequency.style.border = "2px solid red";
		errPPF=1;
	}
	
//	alert('In validation 7');
	//return false;
	//validate intrest Rate
	if(hasValue(lInterestRate.value)){
		if (lInterestRate.value == 0 || lInterestRate.value > 100){
			document.getElementById('alertppfinterestrate').innerHTML="PPF Interest Rate cannot be 0 and greater than 100.";
			lInterestRate.style.border = "2px solid red";
			errPPF=1;
		}
		else {
			var num = lInterestRate.value;
			if (!isDecimal(num)){
				document.getElementById('alertppfinterestrate').innerHTML="PPF Interest Rate must be positive decimal not starting with 0";
				lInterestRate.style.border = "2px solid red";
				errPPF=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lInterestRate.value = n;
			}
		}
	}
	
	//alert('In validation 8');
	//return false;
	
	if (hasValue(lPPFTenure.value)){
		if (lPPFTenure.value == 0){
			document.getElementById('alertppftenure').innerHTML="PPF Tenure cannot be 0";
			lPPFTenure.style.border = "2px solid red";
			errPPF=1;
		}
		else {
			var num = lPPFTenure.value;
			if (!isInteger(num)){
				document.getElementById('alertppftenure').innerHTML="PPF Tenure must be postive integer and cannot start with 0";
				lPPFTenure.style.border = "2px solid red";
				errPPF=1;
			}
		}
	}
	
//	alert("after ppf tenure");
	//return false;
	
	//validate PPF Extension
		
	if (lPPFExtension == undefined) {
			//alert('in if');
		//	return false;
			document.getElementById('alertppfext').innerHTML="&nbsp;Please enter PPF Extension";
			document.getElementById("idPPFExtension").style.border = "2px solid red";
			errPPF=1;
		}

//	alert('In validation 9');
//	return false;
	//validate PPF Extension Type
	
	
	//validate PPF Extension Start Date
	if (lPPFExtension=="Y"){
		var extType = lPPFExtensionType.options[lPPFExtensionType.selectedIndex].value;
		/*if (extType=="") {
			document.getElementById('alertppfet').innerHTML="Please enter PPF Extension Type";
			lPPFExtensionType.style.border = "2px solid red";
			errPPF=1;
		}*/
		
		if (extType=="Y" || (lExtDepositAmount.value > 0)) {
			//alert("1");
//		return false;
			var extppfDF = lExtDepositFrequency.options[lExtDepositFrequency.selectedIndex].value;
			if (extppfDF==""){
				document.getElementById('alertAdfExt').innerHTML="Please enter Amount Deposit Frequency";
				lExtDepositFrequency.style.border = "2px solid red";
				errPPF=1;
			}
		}

//		alert('In validation 10');
	//	return false;

		if (!hasValue(lPPFExtensionStartDate.value)) {
			document.getElementById('alertppfesd').innerHTML="Please enter PPF Extension Start Date";
			lPPFExtensionStartDate.style.border = "2px solid red";
			lIdCalendarExtStartDate.style.border = "2px solid red";
			errPPF=1;
		}else{
			
			window.user_dt = moment(lPPFExtensionStartDate.value,'DD/MM/YYYY');
	        
			//alert("client dob: " + window.client_dob);
			//alert("client lexp: " + window.client_lexp);
			
			 var months = (parseInt(window.client_lexp) * 12);
			 //alert("months: " + months);
			 var client_lexp_add = moment(window.client_dob).add(months, 'months').toDate();
			 //alert("client_lexp date: " + client_lexp);
			 
			if(!window.user_dt.isValid()){
				document.getElementById('alertppfesd').innerHTML="PPF Extension Start Date is not a valid date";
				lPPFExtensionStartDate.style.border = "2px solid red";
				lIdCalendarExtStartDate.style.border = "2px solid red";
				errPPF=1;
			}else{
				/*if (pageMode=="ADD"){
					//alert("client_lexp_add: " + client_lexp_add);
					if(!isDateBetwenRange(window.client_dob, client_lexp_add , window.user_dt.toDate())){
						document.getElementById('alertppfesd').innerHTML="Date of Investment should be in between today & client life expectancy";
						lPPFExtensionStartDate.style.border = "2px solid red";
						lIdCalendarExtStartDate.style.border = "2px solid red";
						errPPF=1;
					}
				} else {
					if (pageMode=="EDIT"){
						if(!isDateBetwenRange(window.client_dob, window.client_lexp , window.user_dt.toDate())){
							document.getElementById('alertppfesd').innerHTML="Date of Investment should be in between today & client life expectancy";
							lPPFExtensionStartDate.style.border = "2px solid red";
							lIdCalendarExtStartDate.style.border = "2px solid red";
							errPPF=1;
						}
					}
				}*/
				
				/*var dayExtStartDate = lPPFExtensionStartDate.value.slice(0,2);
				var monthExtStartDate = lPPFExtensionStartDate.value.slice(3,5);
				var yearExtStartDate = lPPFExtensionStartDate.value.slice(6);
				var DateReformattedExtStartDate = yearExtStartDate.concat("-", monthExtStartDate, "-", dayExtStartDate);
				var dateExtStartDate = new Date(DateReformattedExtStartDate);
				var selectedDateExtStartDate = new Date(dateExtStartDate.toString());
				var dayCurrent = moment().format('DD/MM/YYYY').slice(0,2);
				var monthCurrent = moment().format('DD/MM/YYYY').slice(3,5);
				var yearCurrent = moment().format('DD/MM/YYYY').slice(6);
				var currentDateReformatted  = yearCurrent.concat("-", monthCurrent, "-", dayCurrent);
				var currentDate = new Date(currentDateReformatted);
				var selectedCurrentDate=new Date(currentDate.toString());
				
				if (selectedDateExtStartDate > selectedCurrentDate) {
					document.getElementById('alertppfesd').innerHTML="PPF Extension Start Date should not be a future date.";
					lPPFExtensionStartDate.style.border = "2px solid red";
					lIdCalendarExtStartDate.style.border = "2px solid red";
					errPPF=1;
				}*/
				
			} 
			
			
		}
		

//	alert('In validation 11');
//	return false;
		
		
		
		//validate PPF Extension Current Balance
		if (hasValue(lExtCurrentBalance.value)){
			lExtCurrentBalance.value = lExtCurrentBalance.value.replace(/,/g, '');
			if (lExtCurrentBalance.value == 0){
				document.getElementById('alertextcurbalance').innerHTML="PPF Extension Current Balance cannot be 0";
				lExtCurrentBalance.style.border = "2px solid red";
//				lExtCurrentBalanceRupee.style.border = "2px solid red";
			    errPPF=1;
			}
			else {
				var num = lExtCurrentBalance.value;
				if (!isDecimal(num)){
					document.getElementById('alertextcurbalance').innerHTML="PPF Extension Current Balance must be a positive decimal not starting with 0.";
					lExtCurrentBalance.style.border = "2px solid red";
//					lExtCurrentBalanceRupee.style.border = "2px solid red";
				    errPPF=1;
				}
				else {
					var n = Number(num).toFixed(2);
					lExtCurrentBalance.value = n;
				}
			}
		}
		else {
			if (!hasValue(lExtCurrentBalance.value)){
				document.getElementById('alertextcurbalance').innerHTML="Please enter PPF Extension Current Balance";
				lExtCurrentBalance.style.border = "2px solid red";
//				lExtCurrentBalanceRupee.style.border = "2px solid red";
			    errPPF=1;
			}
		}
	
//		alert('In validation 12');
		//return false;
		
		if (!hasValue(lExtInterestRate.value)){
			document.getElementById('alertppfextinterestrate').innerHTML="Please enter PPF Extension Interest Rate";
			lExtInterestRate.style.border = "2px solid red";
		    errPPF=1;
		}
		else{
			if (lExtInterestRate.value == 0 || lExtInterestRate.value > 100){
				document.getElementById('alertppfextinterestrate').innerHTML="PPF Extension Interest Rate cannot be 0 or greater than 100";
				lExtInterestRate.style.border = "2px solid red";
			    errPPF=1;
			}
			else {
				var num = lExtInterestRate.value;
				if (!isDecimal(num)){
					document.getElementById('alertppfextinterestrate').innerHTML="PPF Extension Interest Rate must be a positive decimal not starting with 0.";
					lExtInterestRate.style.border = "2px solid red";
				    errPPF=1;
				}
				else {
					var n = Number(num).toFixed(2);
					lExtInterestRate.value = n;
				}
			}
		}
		
		/*if (!hasValue(lExtTenure.value)){
			document.getElementById('alertppfexttenure').innerHTML="Please enter PPF Extension Tenure";
			lExtTenure.style.border = "2px solid red";
		    errPPF=1;
		}                                                        
		else{
			if (lExtTenure.value == 0){
				document.getElementById('alertppfexttenure').innerHTML="PPF Extension Tenure cannot be 0";
				lExtTenure.style.border = "2px solid red";
			    errPPF=1;
			}
			else {
				var num = lExtTenure.value;
				if (!isInteger(num)){
					document.getElementById('alertppfexttenure').innerHTML="PPF Extension Tenure must be a positive integer not starting with 0.";
					lExtTenure.style.border = "2px solid red";
				    errPPF=1;
				}
			}
		}*/
//		alert('midway');
	//	return false;

		//validate Deposit Amount Extension Period		 
		if (extType=="Y"){
			if (!hasValue(lExtDepositAmount.value)){
				document.getElementById('alertdaep').innerHTML="Please enter Deposit Amount for Extension Period.";
				lExtDepositAmount.style.border = "2px solid red";
//				lExtDepositAmountRupee.style.border = "2px solid red";
				errPPF=1;
			}
			else {
				if (hasValue(lExtDepositAmount.value)) {
					lExtDepositAmount.value = lExtDepositAmount.value.replace(/,/g, '');
					if (lExtDepositAmount.value == 0){
						document.getElementById('alertdaep').innerHTML="Extension Period Deposit Amount cannot be 0";
						lExtDepositAmount.style.border = "2px solid red";
	//					lExtDepositAmountRupee.style.border = "2px solid red";
						errPPF=1;
					}
					else {
						var num = lExtDepositAmount.value;
						if (!isDecimal(num)){
							document.getElementById('alertdaep').innerHTML="Extension Period Deposit Amount must be a positive decimal not starting with 0.";
							lExtDepositAmount.style.border = "2px solid red";
	//						lExtDepositAmountRupee.style.border = "2px solid red";
							errPPF=1;
						}
						else {
							var n = Number(num).toFixed(2);
							lExtDepositAmount.value = n;
						}
					}
				}
			}
		}
	
	}
	
	//For solving JIRA: CIUAT-738
	if (lPPFExtension == "N"){
		var dayMaturity = $("#idMaturityDate").val().slice(0,2);
		var monthMaturity = $("#idMaturityDate").val().slice(3,5);
		var yearMaturity = $("#idMaturityDate").val().slice(6);
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
			errPPF=1;
			bootbox.alert({
				message: "Asset is already matured & it could be part of cash balance or other portfolio.",
				callback: function () {
					document.getElementById('alertform').innerHTML="";
					$(window).scrollTop(0);
				}
			});
		}
	}
	
	if (lPPFExtension == "Y"){
		if (hasValue(lPPFExtensionStartDate.value)) {
			var dayExtMaturity = lPPFExtensionStartDate.value.slice(0,2);
			var monthExtMaturity = lPPFExtensionStartDate.value.slice(3,5);
			var yearExtMaturity = Number(lPPFExtensionStartDate.value.slice(6)) + Number(5);
			var DateReformattedExtMaturity = yearExtMaturity.toString().concat("-", monthExtMaturity, "-", dayExtMaturity);
			var dateExtMaturity = new Date(DateReformattedExtMaturity);
			var selectedDateExtMaturity = new Date(dateExtMaturity.toString());
			var dayCurrent = moment().format('DD/MM/YYYY').slice(0,2);
			var monthCurrent = moment().format('DD/MM/YYYY').slice(3,5);
			var yearCurrent = moment().format('DD/MM/YYYY').slice(6);
			var currentDateReformatted  = yearCurrent.concat("-", monthCurrent, "-", dayCurrent);
			var currentDate = new Date(currentDateReformatted);
			var selectedCurrentDate=new Date(currentDate.toString());
			if (selectedDateExtMaturity < selectedCurrentDate) {
				errPPF=1;
				bootbox.alert({
					message: "Asset is already matured & it could be part of cash balance or other portfolio.",
					callback: function () {
						document.getElementById('alertform').innerHTML="";
						$(window).scrollTop(0);
					}
				});
			}
		}
	}
	
//	alert('In validation 14');
	
	if (errPPF==1){
		//alert("In error");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else
		{
		return true;
		}
	
}


function validateEquity(form) {
	// alert("In Equity Validation");
	// return false;

	var lAssetType = $("input:radio[name=financialAssetType]:checked").val();
	//alert("lAssetType: " + lAssetType);
	
	if (lAssetType == 15 || lAssetType == 17) {
		var lSecurityListed = document.getElementById("idListedFlag").value;
		if (lSecurityListed == 'N') {
			var lSecurityName = document.getElementById("idUnlistedStockName");
		} else {
			if (lSecurityListed == 'Y') {
				var lSecurityName = document
						.getElementById("idSecurityNameList");
			}
		}
	} else {
		if (lAssetType == 16) {
			var lSecurityName = document.getElementById("idUnlistedStockName");
		}
	}
	// Added by saheli on 20/03/17
	var lShares = document.getElementById("idQuantity");
	var lCurrentMarketValue = document.getElementById("idCurrentMarketValue");
	var lPurchaseDate = document.getElementById("idPurchaseDate");
	var lPurchaseDateGroup = document.getElementById("idPurchaseDateGroup");

	var errEquity = 0;

	// alert("In Equity Validation 1");
	// return false;
	document.getElementById('alertsecurityName').innerHTML = "";
	document.getElementById('alertsecurityNameDropdown').innerHTML = "";
	document.getElementById('alertshares').innerHTML = "";
	document.getElementById('alertcurrentMarketValue').innerHTML = "";
	document.getElementById('alertpurchaseDate').innerHTML = "";

	// alert("In Equity Validation 2");
	// return false;
	lSecurityName.style.border = "1px solid #ccc";
	lShares.style.border = "1px solid #ccc";
	lCurrentMarketValue.style.border = "1px solid #ccc";
	lPurchaseDate.style.border = "1px solid #ccc";
	lPurchaseDateGroup.style.border = "1px solid #ccc";

	// alert("In Equity Validation 3");
	// validate Financial Asset Type

	if (lAssetType == 15 || lAssetType == 17) {
		if (lSecurityListed == 'N') {
			if (!hasValue(lSecurityName.value)) {
				document.getElementById('alertsecurityName').innerHTML = "Security Name must be entered";
				lSecurityName.style.border = "2px solid red";
				errEquity = 1;
			}
		} else {
			if (lSecurityListed == 'Y') {
				var userSN = lSecurityName.options[lSecurityName.selectedIndex].value;
				//alert("userSN: " + userSN);
				if (userSN == "") {
					document.getElementById('alertsecurityNameDropdown').innerHTML = "Please select Security Name";
					lSecurityName.style.border = "2px solid red";
					errEquity = 1;
				}
			}

		}
	}

	if (lAssetType == 16) {
		if (!hasValue(lSecurityName.value)) {
			document.getElementById('alertsecurityName').innerHTML = "Security Name must be entered";
			lSecurityName.style.border = "2px solid red";
			errEquity = 1;
		}
	}

	// alert('After Security Name validation '+errEquity);
	// return false;

	if (!hasValue(lShares.value)) {
		document.getElementById('alertshares').innerHTML = "No. of shares must be entered";
		lShares.style.border = "2px solid red";
		errEquity = 1;
	} else {
		var num = lShares.value;

		if (!testInputDataValue(num, integerOnly)) {
			document.getElementById('alertshares').innerHTML = "Value must be a positive integer not starting with 0";
			lShares.style.border = "2px solid red";
			errEquity = 1;
		}
	}

	// alert('After Shares validation '+errEquity);
	// return false;
		var lAmountInvested = document.getElementById("idInvestmentAmount");
		// alert("Amount Invested: "+lAmountInvested.value);
		document.getElementById('alertinvestmentAmount').innerHTML = "";
		lAmountInvested.style.border = "1px solid #ccc";

		if (!hasValue(lAmountInvested.value)) {
			document.getElementById('alertinvestmentAmount').innerHTML = "Amount Invested must be entered";
			lAmountInvested.style.border = "2px solid red";
			errEquity = 1;
		} else {
			
			lAmountInvested.value = lAmountInvested.value.replace(/,/g, '');
			var num = lAmountInvested.value;
			if (num == 0) {
				document.getElementById('alertinvestmentAmount').innerHTML = "Amount Invested cannot be 0";
				lAmountInvested.style.border = "2px solid red";
				errEquity = 1;
			} else {
				if (!isDecimal(num)){
					document.getElementById('alertinvestmentAmount').innerHTML = "Valid number must be positive integer not starting with 0";
					lAmountInvested.style.border = "2px solid red";
					errEquity = 1;
				} else {
					var n = Number(num).toFixed(2);
					lAmountInvested.value = n;
				}
			}
		}
	

	if (!hasValue(lCurrentMarketValue.value)) {
		document.getElementById('alertcurrentMarketValue').innerHTML = "Current Market Value must be entered";
		lCurrentMarketValue.style.border = "2px solid red";
		errEquity = 1;
	} else {
		
		lCurrentMarketValue.value = lCurrentMarketValue.value.replace(/,/g, '');
		var num = lCurrentMarketValue.value;
		if (num == 0) {
			document.getElementById('alertcurrentMarketValue').innerHTML = "Current Market Value cannot be 0";
			lCurrentMarketValue.style.border = "2px solid red";
			errEquity = 1;
		} else {
			if (!isDecimal(num)){
				document.getElementById('alertcurrentMarketValue').innerHTML = "Valid number must be positive integer not starting with 0";
				lCurrentMarketValue.style.border = "2px solid red";
				errEquity = 1;
			} else {
				var n = Number(num).toFixed(2);
				lCurrentMarketValue.value = n;
			}
		}
	}

	if (!hasValue(lPurchaseDate.value)) {
		document.getElementById('alertpurchaseDate').innerHTML = "Purchase Date must be entered";
		lPurchaseDateGroup.style.border = "2px solid red";
		lPurchaseDateGroup.style.borderRadius = "7px";
		errEquity = 1;
	} else {
		window.user_dt = moment(lPurchaseDate.value, 'DD/MM/YYYY');

		if (!window.user_dt.isValid()) {
			document.getElementById('alertpurchaseDate').innerHTML = "Purchase Date is not a valid date";
			lPurchaseDateGroup.style.border = "2px solid red";
			lPurchaseDateGroup.style.borderRadius = "7px";
			errEquity = 1;
		} else if (!isDateBetwenRange(window.client_dob, new Date(),
				window.user_dt.toDate())) {
			document.getElementById('alertpurchaseDate').innerHTML = "Purchase Date should be between client DOB and today";
			lPurchaseDateGroup.style.border = "2px solid red";
			lPurchaseDateGroup.style.borderRadius = "7px";
			errEquity = 1;
		}

	}

	// alert('After Purchase Date validation '+errEquity);
	// return false;

	if (lAssetType == 17) {
		var lVestingDate = document.getElementById("idEsopVestingDate");
		var lVestingDateGroup = document
				.getElementById("idEsopVestingDateGroup");
		// lVestingDate.style.border = "1px solid #ccc";
		lVestingDateGroup.style.border = "1px solid #ccc";
		lVestingDateGroup.style.borderRadius = "7px";
		document.getElementById('alertvestingDate').innerHTML = "";
		if (!hasValue(lVestingDate.value)) {
			document.getElementById('alertvestingDate').innerHTML = "Vesting Date must be entered";
			lVestingDateGroup.style.border = "2px solid red";
			lVestingDateGroup.style.borderRadius = "7px";
			errEquity = 1;
		}else{
			window.user_dt = moment(lVestingDate.value,'DD/MM/YYYY');
            
			console.log(window.client_dob);
			console.log(window.client_lexp);
			console.log(window.user_dt);
			
    		if(!window.user_dt.isValid()){
    			document.getElementById('alertvestingDate').innerHTML = "Vesting Date is not a valid date";
    			lVestingDateGroup.style.border = "2px solid red";
    			lVestingDateGroup.style.borderRadius = "7px";
    			errEquity = 1;
    		}else if(!isDateBetwenRange(client_dob, client_lexp, window.user_dt)){
    			document.getElementById('alertvestingDate').innerHTML = "Vesting Date should be between client DOB and client life expectancy";
    			lVestingDateGroup.style.border = "2px solid red";
    			lVestingDateGroup.style.borderRadius = "7px";
    			errEquity = 1;
    		}
		}
	}
	// alert('After Vesting Date validation '+errEquity);

	if (errEquity == 1) {
		// alert("Error");
		document.getElementById('alertform').innerHTML = "Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
}

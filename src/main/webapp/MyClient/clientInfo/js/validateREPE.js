function validateOthers(form) {

	var lSchemeName = document.getElementById("idSchemeName");
	var lTotalInvestmentAmount = document
			.getElementById("idTotalInvestmentAmount");
	var lTotalDrawdownAmount = document.getElementById("idTotalDrawdownAmount");
	var lOutstandingAmount = document.getElementById("idOutstandingAmount");
	var lInvestmentDate = document.getElementById("idDateOfInvestmentOthers");
	var lInvestmentDateGroup = document
			.getElementById("idDateOfInvestmentOthersGroup");
	var lFlag = document.getElementById("idCloseEndedFlag");
	var lMaturityDate = document.getElementById("idMaturityDate");
	var lMaturityDateGroup = document.getElementById("idMaturityDateGroup");
	var lCurrentMarketValue = document.getElementById("idCurrentMarketValue");
	var lTotalPrincipalReceived = document.getElementById("idTotalPAR");
    var lTotalInterestReceived	= document.getElementById("idTotalIAR"); 

	var errREPE = 0;

	lSchemeName.style.border = "1px solid #ccc";
	lTotalInvestmentAmount.style.border = "1px solid #ccc";
	lTotalDrawdownAmount.style.border = "1px solid #ccc";
	lOutstandingAmount.style.border = "1px solid #ccc";
	lInvestmentDateGroup.style.border = "1px solid #ccc";
	lInvestmentDateGroup.style.borderRadius = "7px";
	lFlag.style.border = "1px solid #ccc";
	lMaturityDateGroup.style.border = "1px solid #ccc";
	lMaturityDateGroup.style.borderRadius = "7px";
	lCurrentMarketValue.style.border = "1px solid #ccc";
	lTotalPrincipalReceived.style.border = "1px solid #ccc";
	lTotalInterestReceived.style.border = "1px solid #ccc";

	document.getElementById('alertSchemeName').innerHTML = "";
	document.getElementById('alertTotalInvestmentAmount').innerHTML = "";
	document.getElementById('alertTotalDrawdownAmount').innerHTML = "";
	document.getElementById('alertOutstandingAmount').innerHTML = "";
	document.getElementById('alertIDate').innerHTML = "";
	document.getElementById('alertFlag').innerHTML = "";
	document.getElementById('alertMaturityDate').innerHTML = "";
	document.getElementById('alertCurrentMarketValue').innerHTML = "";
	document.getElementById('alertTotalPrincipalReceived').innerHTML = "";
	document.getElementById('alertTotalInterestReceived').innerHTML = "";

	// validate scheme name
	if (!hasValue(lSchemeName.value)) {
		document.getElementById('alertSchemeName').innerHTML = "Enter Scheme Name";
		lSchemeName.style.border = "2px solid red";
		errREPE = 1;
	}

	// validate total investment amount
	if (hasValue(lTotalInvestmentAmount.value)) {
		lTotalInvestmentAmount.value = lTotalInvestmentAmount.value.replace(
				/,/g, '');
		if (lTotalInvestmentAmount.value == 0) {
			document.getElementById('alertTotalInvestmentAmount').innerHTML = "Total Investment Amount cannot be zero";
			lTotalInvestmentAmount.style.border = "2px solid red";
			errREPE = 1;
		} else {
			var num = lTotalInvestmentAmount.value;
			if (!isDecimal(num)) {
				document.getElementById('alertTotalInvestmentAmount').innerHTML = " Total Investment Amount must be a positive decimal not starting with 0";
				lTotalInvestmentAmount.style.border = "2px solid red";
				errREPE = 1;
			} else {
				var n = Number(num).toFixed(2);
				lTotalInvestmentAmount.value = n;
			}
		}
	} else {
		if (!hasValue(lTotalInvestmentAmount.value)) {
			document.getElementById('alertTotalInvestmentAmount').innerHTML = "Please enter  Total Investment Amount";
			lTotalInvestmentAmount.style.border = "2px solid red";
			errREPE = 1;
		}
	}

	// alert("after TIA");
	// return false;

	// validate total drawdown amount
	if (hasValue(lTotalDrawdownAmount.value)) {
		lTotalDrawdownAmount.value = lTotalDrawdownAmount.value.replace(/,/g,
				'');
		if (lTotalInvestmentAmount.value == 0) {
			document.getElementById('alertTotalDrawdownAmount').innerHTML = "Total Drawdown Amount cannot be zero";
			lTotalDrawdownAmount.style.border = "2px solid red";
			errREPE = 1;
		} else {
			var num = lTotalDrawdownAmount.value;
			if (!isDecimal(num)) {
				document.getElementById('alertTotalDrawdownAmount').innerHTML = " Total Drawdown Amount must be a positive decimal not starting with 0";
				lTotalDrawdownAmount.style.border = "2px solid red";
				errREPE = 1;
			} else {
				var n = Number(num).toFixed(2);
				lTotalDrawdownAmount.value = n;
			}
		}
	} else {
		if (!hasValue(lTotalDrawdownAmount.value)) {
			document.getElementById('alertTotalDrawdownAmount').innerHTML = "Please enter  Total Drawdown Amount";
			lTotalDrawdownAmount.style.border = "2px solid red";
			errREPE = 1;
		}
	}

	// validate outstanding amount
	if (hasValue(lOutstandingAmount.value)) {
		lOutstandingAmount.value = lOutstandingAmount.value.replace(/,/g, '');
		if (lOutstandingAmount.value == 0) {
			document.getElementById('alertOutstandingAmount').innerHTML = "Outstanding Amount cannot be zero";
			lOutstandingAmount.style.border = "2px solid red";
			errREPE = 1;
		} else {
			var num = lOutstandingAmount.value;
			if (!isDecimal(num)) {
				document.getElementById('alertOutstandingAmount').innerHTML = " Outstanding Amount must be a positive decimal not starting with 0";
				lOutstandingAmount.style.border = "2px solid red";
				errREPE = 1;
			} else {
				var n = Number(num).toFixed(2);
				lOutstandingAmount.value = n;
			}
		}
	} else {
		if (!hasValue(lOutstandingAmount.value)) {
			document.getElementById('alertOutstandingAmount').innerHTML = "Please enter Outstanding Amount";
			lOutstandingAmount.style.border = "2px solid red";
			errREPE = 1;
		}
	}

	// alert("after OA");
	// return false;

	// validate Investment Date
	var lInvestmentDateValue = lInvestmentDate.value;
	console.log('Investment Date: ' + lInvestmentDateValue);

	if (!hasValue(lInvestmentDate.value)) {
		document.getElementById('alertIDateOfInvestmentOthers').innerHTML = "Please enter Investment date";
		lInvestmentDateGroup.style.border = "2px solid red";
		lInvestmentDateGroup.style.borderRadius = "7px";
		errREPE = 1;
	} else {

		window.user_dt = moment(lInvestmentDate.value, 'DD/MM/YYYY');

		if (!window.user_dt.isValid()) {
			document.getElementById('alertIDateOfInvestmentOthers').innerHTML = "Date of Investment is not a valid date";
			lInvestmentDateGroup.style.border = "2px solid red";
			lInvestmentDateGroup.style.borderRadius = "7px";
			errREPE = 1;
		} else if (!isDateBetwenRange(window.client_dob, new Date(),
				window.user_dt.toDate())) {
			document.getElementById('alertIDateOfInvestmentOthers').innerHTML = "Date of Investment should be in between client dob & today";
			lInvestmentDateGroup.style.border = "2px solid red";
			lInvestmentDateGroup.style.borderRadius = "7px";
			errREPE = 1;
		}

	}

	if(hasValue(lTotalPrincipalReceived.value)){
		var num = lTotalPrincipalReceived.value;
		if (!isDecimal(num)) {
			document.getElementById('alertTotalPrincipalReceived').innerHTML = " Total Principal Received must be a positive decimal not starting with 0";
			lTotalPrincipalReceived.style.border = "2px solid red";
			errREPE = 1;
		} else {
			var n = Number(num).toFixed(2);
			lTotalPrincipalReceived.value = n;
		}
	}
	
	if(hasValue(lTotalInterestReceived.value)){
		var num = lTotalInterestReceived.value;
		if (!isDecimal(num)) {
			document.getElementById('alertTotalInterestReceived').innerHTML = " Total Interest Received must be a positive decimal not starting with 0";
			lTotalInterestReceived.style.border = "2px solid red";
			errREPE = 1;
		} else {
			var n = Number(num).toFixed(2);
			lTotalInterestReceived.value = n;
		}
	}
	// alert("after IDate");
	// return false;
	var userFlag = lFlag.options[lFlag.selectedIndex].value;
	{
		if (userFlag == "Y") {
			var lMaturityDateValue = lMaturityDate.value;
			if (!hasValue(lMaturityDateValue)) {
				document.getElementById('alertMaturityDate').innerHTML = "Please enter Maturity date";
				lMaturityDateGroup.style.border = "2px solid red";
				lMaturityDateGroup.style.borderRadius = "7px";
				errREPE = 1;
			} else {

				window.user_dt = moment(lMaturityDate.value, 'DD/MM/YYYY');

				if (!window.user_dt.isValid()) {
					document.getElementById('alertMaturityDate').innerHTML = "Maturity date is not a valid date";
					lMaturityDateGroup.style.border = "2px solid red";
					lMaturityDateGroup.style.borderRadius = "7px";
					errREPE = 1;
				} else if (!isDateBetwenRange(window.client_dob, window.client_lexp,
						window.user_dt.toDate())) {
					document.getElementById('alertMaturityDate').innerHTML = "Maturity date should be between client DOB & client life expectancy";
					lMaturityDateGroup.style.border = "2px solid red";
					lMaturityDateGroup.style.borderRadius = "7px";
					errREPE = 1;
				}

			}

		}
	}
	// validate Maturity Date
	
	// validate Flag
	var userFlag = lFlag.options[lFlag.selectedIndex].value;
	if (userFlag == "") {
		document.getElementById('alertFlag').innerHTML = "Please enter Close/Open Ended";
		lFlag.style.border = "2px solid red";
		errREPE = 1;
	}

	// validate current market value
	if (hasValue(lCurrentMarketValue.value)) {
		lCurrentMarketValue.value = lCurrentMarketValue.value.replace(/,/g, '');
		if (lCurrentMarketValue.value == 0) {
			document.getElementById('alertCurrentMarketValue').innerHTML = "Current Market Value cannot be zero";
			lCurrentMarketValue.style.border = "2px solid red";
			errREPE = 1;
		} else {
			var num = lCurrentMarketValue.value;
			if (!isDecimal(num)) {
				document.getElementById('alertCurrentMarketValue').innerHTML = "Current Market Value must be a positive decimal not starting with 0";
				lCurrentMarketValue.style.border = "2px solid red";
				errREPE = 1;
			} else {
				var n = Number(num).toFixed(2);
				lCurrentMarketValue.value = n;
			}
		}
	} else {
		if (!hasValue(lCurrentMarketValue.value)) {
			document.getElementById('alertCurrentMarketValue').innerHTML = "Please enter Current Market Value";
			lCurrentMarketValue.style.border = "2px solid red";
			errREPE = 1;
		}
	}

	if (errREPE == 1) {
		document.getElementById('alertform').innerHTML = "Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
}
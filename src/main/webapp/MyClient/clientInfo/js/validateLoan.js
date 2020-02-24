
function validateLoan(form) {
	//alert("inside validation");
	// return false;
	var errLoan = 0;
	var iLoanType = $("input:radio[name=loanType]:checked").val();
	//alert('Loan Type: '+iLoanType);
	if (iLoanType==1) {
			//alert('In validation for loan type 1');
			var iAmountType = $("input:radio[name=loanOriginalFlag]:checked").val();
			var lLoanCategory = document.getElementById("idLCategory");
			var lOtherLoanCategory = document.getElementById("idOtherLoanCategory");
			var lLoanStartDate = document.getElementById("idLoanStartDate");
			var lLoanStartDateGroup = document.getElementById("idLoanStartDateGroup");
			var lOriginalLoanTenure = document.getElementById("idOriginalLoanTenure");
			var lOriginalLoanAmount = document.getElementById("idOriginalLoanAmount");
			var lOriginalInterestRate = document.getElementById("idOriginalInterestRate");
			var lLoanProvider = document.getElementById("idLProvider");
			// ///Outstanding
			var lOutstandingPrincipalToday = document.getElementById("idOutstandingPrincipalToday");
			var lCurrentInterestRate = document.getElementById("idCurrentInterestRate");
			var lCurrentEMIAmount = document.getElementById("idCurrentEmiAmount");
			var lPendingInstallments = document.getElementById("idPendingInstallments");
	       // alert("lPendingInstallments.value "+lPendingInstallments.value);
			/*var lLoanStartDateOut = document.getElementById("idOutLoanStartDate");
			var lLoanStartDateGroupOut = document.getElementById("idLoanStartDateGroupOut");*/
			
			lLoanCategory.style.border = "1px solid #ccc";
			lOtherLoanCategory.style.border = "1px solid #ccc";
			lLoanProvider.style.border = "1px solid #ccc";
			lLoanStartDateGroup.style.border = "1px solid #ccc";
			lLoanStartDateGroup.style.borderRadius = "7px";
			lOriginalLoanTenure.style.border = "1px solid #ccc";
			lOriginalLoanAmount.style.border = "1px solid #ccc";
			lOriginalInterestRate.style.border = "1px solid #ccc";
			// ///Outstanding
			lOutstandingPrincipalToday.style.border = "1px solid #ccc";
			lCurrentInterestRate.style.border = "1px solid #ccc";
			lCurrentEMIAmount.style.border = "1px solid #ccc";
			/*lLoanStartDateGroupOut.style.border = "1px solid #ccc";
			lLoanStartDateGroupOut.style.borderRadius = "7px";
			*/
			document.getElementById('alertloancategory').innerHTML = "";
			document.getElementById('alertOtherLoanCategory').innerHTML = "";
			document.getElementById('alertloanprovider').innerHTML = "";
			document.getElementById('alertoriginalloanamount').innerHTML = "";
			document.getElementById('alertstartdate').innerHTML = "";
			document.getElementById('alertoriginalloantenure').innerHTML = "";
			document.getElementById('alertoriginalinterestrate').innerHTML = "";
			// ///Outstanding
			document.getElementById('alertlOutstandingPrincipalToday').innerHTML = "";
			document.getElementById('alertCurrentInterestRate').innerHTML = "";
			document.getElementById('alertCurrentEmiAmount').innerHTML = "";
			/*document.getElementById('alertoutstartdate').innerHTML = "";*/
			
			// Validate Loan Category
			var loanCategory = lLoanCategory.options[lLoanCategory.selectedIndex].value;
			if (loanCategory == "") {
				document.getElementById('alertloancategory').innerHTML="Please enter a Loan Category";
				lLoanCategory.style.border = "2px solid red";
				errLoan = 1;
			} else {
				if (loanCategory == "8") {
					if (!hasValue(lOtherLoanCategory.value)) {
						document.getElementById('alertOtherLoanCategory').innerHTML="Please enter a Loan Category";
						lOtherLoanCategory.style.border = "2px solid red";
						errLoan = 1;
					}
				}
			}

			/*var loanProvider = lLoanProvider.options[lLoanProvider.selectedIndex].value;
			if (loanProvider == "") {
				document.getElementById('alertloanprovider').innerHTML="Please enter a Loan Provider";
				lLoanProvider.style.border = "2px solid red";
				errLoan = 1;
			}*/
			
			
			
			if (!hasValue(lLoanProvider.value)) {
				document.getElementById('alertloanprovider').innerHTML = "Please enter a Loan Provider";
				lLoanProvider.style.border = "2px solid red";
				errLoan = 1;
			} else {
				if (!isString(lLoanProvider.value)) {
					document.getElementById('alertloanprovider').innerHTML = "Loan Provider must be in alphabets";
					lLoanProvider.style.border = "2px solid red";
					errLoan = 1;
				}
			}

			

			if (iAmountType == "Y") {
				if (hasValue(lOriginalLoanAmount.value)) {
					lOriginalLoanAmount.value = lOriginalLoanAmount.value.replace(
							/,/g, '');
					if (lOriginalLoanAmount.value == 0) {
						document.getElementById('alertoriginalloanamount').innerHTML = "Original Loan Amount cannot be 0";
						lOriginalLoanAmount.style.border = "2px solid red";
						errLoan = 1;
					} else {
						var num = lOriginalLoanAmount.value;
						if (!isDecimal(num)) {
							document.getElementById('alertoriginalloanamount').innerHTML = "Original Loan Amount must be a positive decimal not starting with 0";
							lOriginalLoanAmount.style.border = "2px solid red";
							errLoan = 1;
						} else {
							var n = Number(num).toFixed(2);
							lOriginalLoanAmount.value = n;
						}
					}
				} else {
					if (!hasValue(lOriginalLoanAmount.value)) {
						//alert('No Loan Amount');
						document.getElementById('alertoriginalloanamount').innerHTML = "Please enter Loan Amount";
						lOriginalLoanAmount.style.border = "2px solid red";
						errLoan = 1;
					}
				}

				if (!hasValue(lOriginalInterestRate.value)) {
					document.getElementById('alertoriginalinterestrate').innerHTML = "Please enter Original Interest Rate";
					lOriginalInterestRate.style.border = "2px solid red";
					errLoan = 1;
				} else {
					var num = lOriginalInterestRate.value * 1;
					var num1 = lOriginalInterestRate.value;
					// alert(num);

					if (!testInputDataValue(num1, decimalOnly)) {
						document.getElementById('alertoriginalinterestrate').innerHTML = "Original Interest rate must be a valid decimal";
						lOriginalInterestRate.style.border = "2px solid red";
						errLoan = 1;
					} else {
						if (testInputDataValue(num, decimalOnly)) {
							var n = num.toFixed(2);
							// alert('n: ' + n);
							if (n <= 0) {
								document.getElementById('alertoriginalinterestrate').innerHTML = "Original Interest rate cannot be negative";
								lOriginalInterestRate.style.border = "2px solid red";
								errLoan = 1;
							} else {
								lOriginalInterestRate.value = n;

							}
						} else {
							document.getElementById('alertoriginalinterestrate').innerHTML="Original Interest rate must be a valid positive decimal value";
							lOriginalInterestRate.style.border = "2px solid red";
							errLoan = 1;
						}
					}

					if (!isPercent(lOriginalInterestRate.value)) {
						document.getElementById('alertoriginalinterestrate').innerHTML="Original Interest rate should be between 0 and 100";
						lOriginalInterestRate.style.border = "2px solid red";
						errLoan = 1;
						// return false;
					}
				}

				if (!hasValue(lOriginalLoanTenure.value)) {
					document.getElementById('alertoriginalloantenure').innerHTML="Please enter a Loan Tenure";
					lOriginalLoanTenure.style.border = "2px solid red";
					errLoan = 1;
					// return false;
				} else {
					if (!testInputData(lOriginalLoanTenure, integerOnly)) {
						document.getElementById('alertoriginalloantenure').innerHTML="Loan Tenure must be an integer";
						lOriginalLoanTenure.style.border = "2px solid red";
						errLoan = 1;
					} else {
						if (lOriginalLoanTenure.value <= 0) {
							document.getElementById('alertoriginalloantenure').innerHTML="Loan Tenure should not be zero or negative";
							lOriginalLoanTenure.style.border = "2px solid red";
							errLoan = 1;
						}

					}
				}

				if (!hasValue(lLoanStartDate.value)) {
					document.getElementById('alertstartdate').innerHTML="Please enter Loan Start Date";
					lLoanStartDateGroup.style.border = "2px solid red";
					errLoan = 1;
				} else {
					
					window.user_dt = moment(lLoanStartDate.value,'DD/MM/YYYY');
			        
					if(!window.user_dt.isValid()){
						document.getElementById('alertstartdate').innerHTML="Loan Start Date is not a valid date";
						lLoanStartDateGroup.style.border = "2px solid red";
						errLoan = 1;
					}else if(!isDateBetwenRange(window.client_dob, new Date(), window.user_dt.toDate())){
						document.getElementById('alertstartdate').innerHTML="Please enter Loan Start Date between client DOB & today";
						lLoanStartDateGroup.style.border = "2px solid red";
						errLoan = 1;
					}
					
				}
			}
			
			//alert('After Amount Check 1');

			if (iAmountType == "N") {

				if (!hasValue(lOutstandingPrincipalToday.value)) {
					document.getElementById('alertlOutstandingPrincipalToday').innerHTML = "Please enter Outstanding Principal Amount";
					lOutstandingPrincipalToday.style.border = "2px solid red";
					errLoan = 1;
				} else {
					var num = lOutstandingPrincipalToday.value * 1;
					var num1 = lOutstandingPrincipalToday.value;

					if (!testInputDataValue(num1, decimalOnly)) {
						document.getElementById('alertlOutstandingPrincipalToday').innerHTML = "Outstanding Principal Amount amount must be a valid decimal";
						lOutstandingPrincipalToday.style.border = "2px solid red";
						errLoan = 1;
					} else {
						if (testInputDataValue(num, decimalOnly)) {
							var n = num.toFixed(2);
							// alert('n: ' + n);
							if (n <= 0) {
								document
										.getElementById('alertlOutstandingPrincipalToday').innerHTML = "Outstanding Principal Amount must be a valid decimal number";
								lOutstandingPrincipalToday.style.border = "2px solid red";
								errLoan = 1;
							} else {
								lOutstandingPrincipalToday.value = n;
								// alert('n: ' + n);
							}
						} else {
							document
									.getElementById('alertlOutstandingPrincipalToday').innerHTML = "Outstanding Principal Amount must be a valid positive decimal value";
							lOutstandingPrincipalToday.style.border = "2px solid red";
							errLoan = 1;
						}
					}
				}

				if (!hasValue(lCurrentInterestRate.value)) {
					document.getElementById('alertCurrentInterestRate').innerHTML = "Please enter Current Interest Rate";
					lCurrentInterestRate.style.border = "2px solid red";
					errLoan = 1;
				} else {
					var num = lCurrentInterestRate.value * 1;
					var num1 = lCurrentInterestRate.value;
					// alert(num);

					if (!testInputDataValue(num1, decimalOnly)) {
						document.getElementById('alertCurrentInterestRate').innerHTML = "Current Interest Rate must be a valid decimal";
						lCurrentInterestRate.style.border = "2px solid red";
						errLoan = 1;
					} else {
						if (testInputDataValue(num, decimalOnly)) {
							var n = num.toFixed(2);
							// alert('n: ' + n);
							if (n <= 0) {
								document.getElementById('alertCurrentInterestRate').innerHTML = "Current Interest Rate must be a valid decimal number";
								lCurrentInterestRate.style.border = "2px solid red";
								errLoan = 1;
							} else {
								lCurrentInterestRate.value = n;

							}
						} else {
							document.getElementById('alertCurrentInterestRate').innerHTML = "Current Interest Rate must be a valid positive decimal value";
							lCurrentInterestRate.style.border = "2px solid red";
							errLoan = 1;
						}
					}
					if (!isPercent(lCurrentInterestRate.value)) {
						document.getElementById('alertCurrentInterestRate').innerHTML = "original Interest rate should be between 0 and 100";
						lCurrentInterestRate.style.border = "2px solid red";
						errLoan = 1;
						// return false;
					}

				}

				if (!hasValue(lCurrentEMIAmount.value)) {
					document.getElementById('alertCurrentEmiAmount').innerHTML = "Please enter Current EMI Amount";
					lCurrentEMIAmount.style.border = "2px solid red";
					errLoan = 1;
				} else {
					var num = lCurrentEMIAmount.value * 1;
					var num1 = lCurrentEMIAmount.value;

					if (!testInputDataValue(num1, decimalOnly)) {
						document.getElementById('alertCurrentEmiAmount').innerHTML = "Current EMI Amount must be a valid decimal";
						lCurrentEMIAmount.style.border = "2px solid red";
						errLoan = 1;
					} else {
						if (testInputDataValue(num, decimalOnly)) {
							var n = num.toFixed(2);
							// alert('n: ' + n);
							if (n <= 0) {
								document.getElementById('alertCurrentEmiAmount').innerHTML = "Current EMI Amount cannot be negative";
								lCurrentEMIAmount.style.border = "2px solid red";
								errLoan = 1;
							} else {
								lCurrentEMIAmount.value = n;
								// alert('n: ' + n);
							}
						} else {
							document.getElementById('alertCurrentEmiAmount').innerHTML = "Current EMI Amount must be a valid positive decimal value";
							lCurrentEMIAmount.style.border = "2px solid red";
							errLoan = 1;
						}
							
						/*if (!hasValue(lLoanStartDateOut).value)) {
							document.getElementById('alertoutstartdate').innerHTML="Please enter Loan Start Date";
							lLoanStartDateGroupOut.style.border = "2px solid red";
							errLoan = 1;
						}*/
						
						if(lPendingInstallments.value<=0){
						
							 //   alert("lPendingInstallments.value ");
							  //  alert(lPendingInstallments.value);
								document.getElementById('alertCurrentEmiAmount').innerHTML = "The given EMI amount is not sufficient to pay off the loan. Please re-enter a higher EMI amount";
								lCurrentEMIAmount.style.border = "2px solid red";
								errLoan=1;
						}
							
					}
				}
			}
			
			//alert('After Amount Check 2');

		} // end of EMI
		else {
			
			if (iLoanType==2) {
			    //alert('In validation for loan type 2');
				var lLoanCategoryNE = document.getElementById("idLCategoryNE");
				var lOtherLoanCategoryNE = document.getElementById("idOthersNE");
				var lLoanAmountNE = document.getElementById("idLoanAmountNE");
				var lLoanStartDateNE = document.getElementById("idLoanStartDateNE");
				var lLoanStartDateNEGroup = document
						.getElementById("idLoanStartDateNEGroup");
				var lInterestRateNE = document.getElementById("idInterestRateNE");
				var lLoanTenureNE = document.getElementById("idLoanTenureNE");
				var lInterestPaymentFrequency = document
						.getElementById("idInterestFrequency");
				var lLoanProviderNE = document.getElementById("idLProviderNE");
				var lLoanEndDateNE = document.getElementById("idLoanEndDateNE");

				errLoan = 0;

				lLoanCategoryNE.style.border = "1px solid #ccc";
				lOtherLoanCategoryNE.style.border = "1px solid #ccc";
				lLoanAmountNE.style.border = "1px solid #ccc";
				lLoanStartDateNE.style.border = "1px solid #ccc";
				lLoanStartDateNEGroup.style.border = "7px";
				lInterestRateNE.style.border = "1px solid #ccc";
				lLoanTenureNE.style.border = "1px solid #ccc";
				lInterestPaymentFrequency.style.border = "1px solid #ccc";
				lLoanProviderNE.style.border = "1px solid #ccc";
				lLoanEndDateNE.style.border = "1px solid #ccc";

				document.getElementById('alertloancategoryNE').innerHTML = "";
				document.getElementById('alertOtherLoanCategoryNE').innerHTML = "";
				document.getElementById('alertLoanAmountNE').innerHTML = "";
				document.getElementById('alertLoanStartDateNE').innerHTML = "";
				document.getElementById('alertInterestRateNE').innerHTML = "";
				document.getElementById('alertLoanTenureNE').innerHTML = "";
				document.getElementById('alertIPF').innerHTML = "";
				document.getElementById('alertLoanProviderNE').innerHTML = "";
				document.getElementById('alertLoanEndDateNE').innerHTML = "";

				var strUserN = lLoanCategoryNE.options[lLoanCategoryNE.selectedIndex].value;
				if (strUserN == "") {
					document.getElementById('alertloancategoryNE').innerHTML = "Please enter a Loan Category";
					lLoanCategoryNE.style.border = "2px solid red";
					errLoan = 1;
				} else {
					if (strUserN == "8") {
						if (!hasValue(lOtherLoanCategoryNE.value)) {
							document.getElementById('alertOtherLoanCategoryNE').innerHTML = "Please enter a Loan Category";
							lOtherLoanCategoryNE.style.border = "2px solid red";
							errLoan = 1;
						}
					}
				}

				if (hasValue(lLoanAmountNE.value)) {
					lLoanAmountNE.value = lLoanAmountNE.value.replace(/,/g, '');
					if (lLoanAmountNE.value == 0) {
						document.getElementById('alertLoanAmountNE').innerHTML = "Loan Amount cannot be 0";
						lLoanAmountNE.style.border = "2px solid red";
						errLoan = 1;
					} else {
						var num = lLoanAmountNE.value;
						if (!isDecimal(num)) {
							document.getElementById('alertLoanAmountNE').innerHTML = "Loan Amount must be a positive decimal not starting with 0";
							lLoanAmountNE.style.border = "2px solid red";
							errLoan = 1;
						} else {
							var n = Number(num).toFixed(2);
							lLoanAmountNE.value = n;
						}
					}
				} else {
					if (!hasValue(lLoanAmountNE.value)) {
						document.getElementById('alertLoanAmountNE').innerHTML = "Please enter Loan Amount";
						lLoanAmountNE.style.border = "2px solid red";
						errLoan = 1;
					}
				}

				if (!hasValue(lLoanStartDateNE.value)) {
					document.getElementById('alertLoanStartDateNE').innerHTML = "Please enter Loan Start Date";
					lLoanStartDateNEGroup.style.border = "2px solid red";
					errLoan = 1;
				} else {
									
					window.user_dt = moment(lLoanStartDateNE.value,'DD/MM/YYYY');
			        
					if(!window.user_dt.isValid()){
						document.getElementById('alertLoanStartDateNE').innerHTML="Loan Start Date is not a valid date";
						lLoanStartDateNEGroup.style.border = "2px solid red";
						errLoan = 1;
					}else if(!isDateBetwenRange(window.client_dob, new Date(), window.user_dt.toDate())){
						document.getElementById('alertLoanStartDateNE').innerHTML="Please enter Loan Start Date between client DOB & today";
						lLoanStartDateNEGroup.style.border = "2px solid red";
						errLoan = 1;
					}
					
				}

				if (!hasValue(lInterestRateNE.value)) {
					document.getElementById('alertInterestRateNE').innerHTML = "Please enter Interest Rate";
					lInterestRateNE.style.border = "2px solid red";
					errLoan = 1;
				} else {
					var num = lInterestRateNE.value * 1;
					var num1 = lInterestRateNE.value;
					// alert(num);

					if (!testInputDataValue(num1, decimalOnly)) {
						document.getElementById('alertInterestRateNE').innerHTML = "Interest Rate must be a valid decimal";
						lInterestRateNE.style.border = "2px solid red";
						errLoan = 1;
					} else {
						if (testInputDataValue(num, decimalOnly)) {
							var n = num.toFixed(2);
							// alert('n: ' + n);
							if (n <= 0) {
								document.getElementById('alertInterestRateNE').innerHTML = "Interest Rate must be a valid decimal no.";
								lInterestRateNE.style.border = "2px solid red";
								errLoan = 1;
							} else {
								lInterestRateNE.value = n;

							}
						} else {
							document.getElementById('alertInterestRateNE').innerHTML = "Interest Rate must be a valid positive decimal value";
							lInterestRateNE.style.border = "2px solid red";
							errLoan = 1;
						}
					}
					if (!isPercent(lInterestRateNE.value)) {
						document.getElementById('alertInterestRateNE').innerHTML = "Interest Rate should be between 0 and 100";
						lInterestRateNE.style.border = "2px solid red";
						errLoan = 1;
						// return false;
					}

				}

				if (!hasValue(lLoanTenureNE.value)) {
					document.getElementById('alertLoanTenureNE').innerHTML = "Please enter a Loan Tenure";
					lLoanTenureNE.style.border = "2px solid red";
					errLoan = 1;
					// return false;
				} else {
					if (!testInputData(lLoanTenureNE, integerOnly)) {
						document.getElementById('alertLoanTenureNE').innerHTML = "Loan Tenure must be a non-zero positive integer";
						lLoanTenureNE.style.border = "2px solid red";
						errLoan = 1;
					} else {
						if (lLoanTenureNE.value <= 0) {
							document.getElementById('alertLoanTenureNE').innerHTML = "Loan Tenure should not be zero or negative";
							lLoanTenureNE.style.border = "2px solid red";
							errLoan = 1;
						}

					}
				}

				var userIPF = lInterestPaymentFrequency.options[lInterestPaymentFrequency.selectedIndex].value;
				if (userIPF == "") {
					document.getElementById('alertIPF').innerHTML = "Please specify Interest Payment Frequency";
					lInterestPaymentFrequency.style.border = "2px solid red";
					errLoan = 1;
				}

	/*			var strUNE = lLoanProviderNE.options[lLoanProviderNE.selectedIndex].value;
				if (strUNE == "") {
					document.getElementById('alertLoanProviderNE').innerHTML = "Please enter a Loan Provider";
					lLoanProviderNE.style.border = "2px solid red";
					errLoan = 1;
				}*/
				
				if (!hasValue(lLoanProviderNE.value)) {
					document.getElementById('alertLoanProviderNE').innerHTML = "Please enter a Loan Provider";
					lLoanProviderNE.style.border = "2px solid red";
					errLoan = 1;
				} else {
					if (!isString(lLoanProviderNE.value)) {
						document.getElementById('alertLoanProviderNE').innerHTML = "Loan Provider must be in alphabets";
						lLoanProviderNE.style.border = "2px solid red";
						errLoan = 1;
					}
				}

				if (!hasValue(lLoanEndDateNE.value)) {
					//alert('Ín Loan End Date validation');
					document.getElementById('alertLoanEndDateNE').innerHTML = "Loan End Date must exist";
					lLoanEndDateNE.style.border = "2px solid red";
					errLoan = 1;
				}
			
			}
		}
		
		//alert('errLoan: '+errLoan);
		if (errLoan == 1) {
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		} else {
			return true;
		}
	
}

function CheckForMisc1() {
	// alert("insert CheckForMisc1 ");
	var errLoan2 = 0;

	// loan amount
	
	unmaskAmount('#idOriginalLoanAmount');
	var lOriginalLoanAmount = document.getElementById("idOriginalLoanAmount");
	console.log("lLoanAmountNE " + lOriginalLoanAmount.value);
    
	//lOriginalLoanAmount.value=unmaskAmountValue(lOriginalLoanAmount.value);
	console.log("after unmasking CheckForMisc1() "+lOriginalLoanAmount.value);
	if (hasValue(lOriginalLoanAmount.value)) {
		
		//lOriginalLoanAmount.value = lOriginalLoanAmount.value.replace(/,/g, '');
		if (lOriginalLoanAmount.value == 0) {

			errLoan2 = 1;
		} else {
			var num = lOriginalLoanAmount.value;
			if (!isDecimal(num)) {

				errLoan2 = 1;
			}
		}
	} else {

		errLoan2 = 1;

	}

	// loan tenure
	var lLoanStartDate = document.getElementById("idLoanStartDate");
	var lLoanStartDateGroup = document.getElementById("idLoanStartDateGroup");

	console.log("lLoanStartDate.value " + lLoanStartDate.value);

	if (!hasValue(lLoanStartDate.value)) {

		errLoan2 = 1;
	}

	// Tenure
	var lOriginalLoanTenure = document.getElementById("idOriginalLoanTenure");

	console.log("lOriginalLoanTenure " + lOriginalLoanTenure.value);

	if (!hasValue(lOriginalLoanTenure.value)) {

		errLoan2 = 1;

	} else {
		if (!testInputData(lOriginalLoanTenure, integerOnly)) {

			errLoan2 = 1;
		} else {
			if (lOriginalLoanTenure.value <= 0) {

				errLoan2 = 1;
			}

		}
	}

	// interest Rate
	var lOriginalInterestRate = document
			.getElementById("idOriginalInterestRate");

	console.log("lOriginalInterestRate " + lOriginalInterestRate.value);

	if (!hasValue(lOriginalInterestRate.value)) {

		errLoan2 = 1;
	} else {
		var num = lOriginalInterestRate.value * 1;
		var num1 = lOriginalInterestRate.value;
		// alert(num);

		if (!testInputDataValue(num1, decimalOnly)) {

			errLoan2 = 1;
		} else {
			if (testInputDataValue(num, decimalOnly)) {
				var n = num.toFixed(2);
				// alert('n: ' + n);
				if (n <= 0) {

					errLoan2 = 1;
				}

			}

		}
		if (!isPercent(lOriginalInterestRate.value)) {

			errLoan2 = 1;
			// return false;
		}

	}
	// alert("errLoan2 "+errLoan2);
	if (errLoan2 == 1) {
		
        maskAmount('#idEmiAmount');
		maskAmount('#idOriginalLoanAmount');
		maskAmount('#idCurrentEmiAmount');
		maskAmount('#idOutstandingPrincipalToday');

		return false;
		
		
	} else {
		return true;
	}

}
function CheckForMisc2() {
	// alert("insert CheckForMisc2");
	var errLoan3 = 0;
	// outstanding principal
	unmaskAmount('#idOutstandingPrincipalToday');
	var lOutstandingPrincipalToday = document.getElementById("idOutstandingPrincipalToday");
	
	//lOutstandingPrincipalToday.value=unmaskAmountValue(lOutstandingPrincipalToday.value);
	console.log("lOutstandingPrincipalToday.value after unmasking CheckForMisc1() "+lOutstandingPrincipalToday.value);
	
	if (!hasValue(lOutstandingPrincipalToday.value)) {
		errLoan3 = 1;
	} else {
		var num = lOutstandingPrincipalToday.value * 1;
		var num1 = lOutstandingPrincipalToday.value;

		if (!testInputDataValue(num1, decimalOnly)) {
			errLoan3 = 1;
		} else {
			if (testInputDataValue(num, decimalOnly)) {
				var n = num.toFixed(2);

				if (n <= 0) {
					errLoan3 = 1;
				}
			}
		}
	}

	// EmiAmount
	unmaskAmount('#idCurrentEmiAmount');
	var lCurrentEMIAmount = document.getElementById("idCurrentEmiAmount");
	lCurrentEMIAmount.value=unmaskAmountValue(lCurrentEMIAmount.value);
	console.log("lCurrentEMIAmount.value after unmasking CheckForMisc1() "+lCurrentEMIAmount.value);
	if (!hasValue(lCurrentEMIAmount.value)) {
		errLoan3 = 1;
	} else {
		var num = lCurrentEMIAmount.value * 1;
		var num1 = lCurrentEMIAmount.value;

		if (!testInputDataValue(num1, decimalOnly)) {

			errLoan3 = 1;
		} else {
			if (testInputDataValue(num, decimalOnly)) {
				var n = num.toFixed(2);

				if (n <= 0) {

					errLoan3 = 1;
				}

			}

		}
	}

	// interest rate
	var lCurrentInterestRate = document.getElementById("idCurrentInterestRate");
	

	if (!hasValue(lCurrentInterestRate.value)) {
		errLoan3 = 1;
	} else {
		var num = lCurrentInterestRate.value * 1;
		var num1 = lCurrentInterestRate.value;
		

		if (!testInputDataValue(num1, decimalOnly)) {
			errLoan3 = 1;
		} else {
			if (testInputDataValue(num, decimalOnly)) {
				var n = num.toFixed(2);
				if (n <= 0) {
					errLoan3 = 1;
				}
			} 
		}
		if (!isPercent(lCurrentInterestRate.value)) {
			errLoan3 = 1;
		}

	}
	if (errLoan3 == 1) {
		 maskAmount('#idCurrentEmiAmount');
		 maskAmount('#idOutstandingPrincipalToday');
		 
		 maskAmount('#idEmiAmount');
		 maskAmount('#idOriginalLoanAmount');
		return false;
	} else {
		return true;
	}

}

function CheckForMisc3() {
	unmaskAmount('#idLoanAmountNE');
	
	var lLoanAmountNE = document.getElementById("idLoanAmountNE");
	var lLoanStartDateNE = document.getElementById("idLoanStartDateNE");
	var lLoanStartDateNEGroup = document.getElementById("idLoanStartDateNEGroup");
	var lInterestRateNE = document.getElementById("idInterestRateNE");
	var lLoanTenureNE = document.getElementById("idLoanTenureNE");
	var lInterestPaymentFrequency = document.getElementById("idInterestFrequency");
	
	var errLoan4 = 0;
	
	console.log("after unmask CheckForMisc3 "+lLoanAmountNE.value);
	if (hasValue(lLoanAmountNE.value)) {
		//lLoanAmountNE.value = lLoanAmountNE.value.replace(/,/g, '');
		if (lLoanAmountNE.value == 0) {
			errLoan4 = 1;
		} else {
			var num = lLoanAmountNE.value;
			if (!isDecimal(num)) {
				errLoan4 = 1;
			}
		}
	} else {
		if (!hasValue(lLoanAmountNE.value)) {
			errLoan4 = 1;
		}
	}
	
	if (!hasValue(lLoanStartDateNE.value)) {
		errLoan4 = 1;
	} 

	if (!hasValue(lInterestRateNE.value)) {
		errLoan4 = 1;
	} else {
		var num = lInterestRateNE.value * 1;
		var num1 = lInterestRateNE.value;
		// alert(num);

		if (!testInputDataValue(num1, decimalOnly)) {
			errLoan4 = 1;
		} else {
			if (testInputDataValue(num, decimalOnly)) {
				var n = num.toFixed(2);
				// alert('n: ' + n);
				if (n <= 0) {
					errLoan4 = 1;
				}
			} else {
				errLoan4 = 1;
			}
		}
		if (!isPercent(lInterestRateNE.value)) {
			errLoan4 = 1;
		}

	}

	if (!hasValue(lLoanTenureNE.value)) {
		errLoan4 = 1;
	} else {
		if (!testInputData(lLoanTenureNE, integerOnly)) {
			errLoan4 = 1;
		} else {
			if (lLoanTenureNE.value <= 0) {
				errLoan4 = 1;
			}

		}
	}

	var userIPF = lInterestPaymentFrequency.options[lInterestPaymentFrequency.selectedIndex].value;
	if (userIPF == "") {
		errLoan4 = 1;
	}
	
	if (errLoan4 == 1) {
		maskAmount('#idLoanAmountNE');
		return false;
	} else {
		return true;
	}
}
 function checkpendinginstallments(data){
	  
		var lCurrentEMIAmount = document.getElementById("idCurrentEmiAmount");
		document.getElementById('alertCurrentEmiAmount').innerHTML = "";
		lCurrentEMIAmount.style.border = "1px solid #ccc";
		 var lPendingInstallments = document.getElementById("idPendingInstallments");
		console.log("lPendingInstallments.value "+lPendingInstallments.value);
		if(lPendingInstallments.value<=0){
			document.getElementById('alertCurrentEmiAmount').innerHTML = "The given EMI amount is not sufficient to pay off the loan. Please re-enter a higher EMI amount";
			lCurrentEMIAmount.style.border = "2px solid red";
			
		}
		
	
  }
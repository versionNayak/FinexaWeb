	function validateAnnuity(form) {
//alert("Inside validate annuity");
	//return false;
		var lPensionableCorpus = document.getElementById("idPensionableCorpus");
		var lAnnuityRate = document.getElementById("idAnnuityRate");
		var lAnnuityGrowthRate = document.getElementById("idGrowthRate");
		var lAnnuityStartDate = document.getElementById("idAnnuityStartDate");
	//	var lIdCalendar = document.getElementById("idStartDateCalendar");
	//	var lIdRupee = document.getElementById("idPCRupeeSymbol");
		var lAnnuityType = document.getElementById("idAnnuityType");
		var lAnnuityPayoutFrequency = document.getElementById("idPayoutFrequency");
		var lAnnuityMonthlyBasicDA = document.getElementById("idAnnuityMonthlyBasicDA");
		var lAnnuityServiceYears = document.getElementById("idAnnuityServiceYears");
		var lAnnuityAnnualContribIncr = document.getElementById("idAnnuityAnnualContributionIncrease");
		var lClientEPFId = document.getElementById("idEpfId");
		var lLifeExpectancySelf = document.getElementById("idLESelf");
		var lLifeExpectancySpouse = document.getElementById("idLESpouse");
		var lLifeExpectancyOthers = document.getElementById("idLE");
		//alert("clientEPFId: " + lClientEPFId.value);
		/*
		var errpCorpus=0;
		var erraRate=0;
		var erragRate=0;
		var errasdate=0;
		*/
		
		var errAnnuity = 0
//	alert("Inside validation 2 new");
		
		
		lPensionableCorpus.style.border = "1px solid #ccc";
		//alert("pensionableCorpus");
		lAnnuityRate.style.border = "1px solid #ccc";
		
		lAnnuityGrowthRate.style.border = "1px solid #ccc";
		
		lAnnuityStartDate.style.border = "1px solid #ccc";
		
		lAnnuityType.style.border = "1px solid #ccc";
		
		lAnnuityPayoutFrequency.style.border = "1px solid #ccc";
		
		lAnnuityMonthlyBasicDA.style.border = "1px solid #ccc";
		
		lAnnuityServiceYears.style.border = "1px solid #ccc";
		
		lAnnuityAnnualContribIncr.style.border = "1px solid #ccc";
		
		lLifeExpectancySelf.style.border =  "1px solid #ccc";
		
		lLifeExpectancySpouse.style.border =  "1px solid #ccc";
		
		lLifeExpectancyOthers.style.border =  "1px solid #ccc";
		//alert("Inside validation 3");
		
		document.getElementById('alertpensionablecorpus').innerHTML="";
		document.getElementById('alertannuityrate').innerHTML="";
		document.getElementById('alertannuitygrowthrate').innerHTML="";
		//document.getElementById('alertannuitystartdate').innerHTML="";
		document.getElementById('alertat').innerHTML="";
		document.getElementById('alertapf').innerHTML="";
		document.getElementById('alertannuityMonthlyBasicDA').innerHTML="";
		document.getElementById('alertannuityServiceYears').innerHTML="";
		document.getElementById('alertannuityAnnualContributionIncrease').innerHTML="";
		document.getElementById('alertself').innerHTML="";
		document.getElementById('alertspouse').innerHTML="";
		document.getElementById('alertothers').innerHTML="";
		//alert("Inside validation 4-1");
		//return false;
		
		//validate annuity type
		var atUser = lAnnuityType.options[lAnnuityType.selectedIndex].value;
		if (atUser==""){
			document.getElementById('alertat').innerHTML="Please select Annuity Type";
			lAnnuityType.style.border = "2px solid red";
			errAnnuity=1;
		}
		
		var x = document.getElementById("idSELF");
		var y = document.getElementById("idSPOUSE");
		var z = document.getElementById("idLEDIV");
		
		  if (window.getComputedStyle(x).display === "none" || window.getComputedStyle(y).display === "none" || window.getComputedStyle(z).display === "none") {
		    // Do something..
		  } else {
			  if (atUser != 6) {
					if(!hasValue(lLifeExpectancySelf.value)){
						document.getElementById('alertself').innerHTML="Please Update Life Expectancy";
						lLifeExpectancySelf.style.border = "2px solid red";
						errAnnuity=1;
					}
					
					if(!hasValue(lLifeExpectancySpouse.value)){
						document.getElementById('alertspouse').innerHTML="Please Update Life Expectancy";
						lLifeExpectancySpouse.style.border = "2px solid red";
						errAnnuity=1;
					}
					
					if(!hasValue(lLifeExpectancyOthers.value)){
						document.getElementById('alertothers').innerHTML="Please Update Life Expectancy";
						lLifeExpectancyOthers.style.border = "2px solid red";
						errAnnuity=1;
					}
				}
		  }
		
		//Validate pensionableCorpus
		if (hasValue(lPensionableCorpus.value)){
			lPensionableCorpus.value = lPensionableCorpus.value.replace(/,/g, '');
			if (lPensionableCorpus.value == 0) {
				document.getElementById('alertpensionablecorpus').innerHTML="Value canot be 0";
				lPensionableCorpus.style.border = "2px solid red";			
			//	lIdRupee.style.border = "2px solid red";
				errAnnuity=1;
			}
			else {
				var num = lPensionableCorpus.value;
				//alert("num: " + num);
				//return false;
				if (!isDecimal(num)){
					document.getElementById('alertpensionablecorpus').innerHTML="Please enter a positive value not starting with 0";
					lPensionableCorpus.style.border = "2px solid red";			
				//	lIdRupee.style.border = "2px solid red";
					errAnnuity=1;		
				}
				else {
					var n = Number(num).toFixed(2);
				//	alert("n: " + n);
					//return false;
					lPensionableCorpus.value = n;
				}
			}
		}
		else {
			if (!hasValue(lPensionableCorpus.value)) {
				//alert(lClientEPFId.value);
				//if (!hasValue(lClientEPFId.value)) {
				if (atUser != 6) {
					 document.getElementById('alertpensionablecorpus').innerHTML="Please enter Pensionable Corpus";
					 lPensionableCorpus.style.border = "2px solid red";
					 //lIdRupee.style.border = "2px solid red";
					 errAnnuity=1;
				 }
					
				//}
			}
		}
		//alert(errAnnuity);
		//alert("After pensionable corpus");
	    //return false;
		
		if (!hasValue(lAnnuityRate.value)) {
			//if (!hasValue(lClientEPFId.value)) {
			if (atUser != 6) {
				document.getElementById('alertannuityrate').innerHTML="Please enter Annuity Rate";
				lAnnuityRate.style.border = "2px solid red";
				errAnnuity=1;
			}
			//}
		}
		else{
			if (lAnnuityRate.value == 0 || lAnnuityRate.value > 100){
				if (!hasValue(lClientEPFId.value)) {
					document.getElementById('alertannuityrate').innerHTML="Value cannot be 0 and must be within 100";
					lAnnuityRate.style.border = "2px solid red";
					errAnnuity=1;
				}
			}
			else {
				var num = lAnnuityRate.value;
				//alert('Annuity Rate: '+num);
				if (!isDecimal(num)){
					document.getElementById('alertannuityrate').innerHTML="Please enter a positive value not starting with 0";
					lAnnuityRate.style.border = "2px solid red";			
					errAnnuity=1;	
				}
				else {
					var n = Number(num).toFixed(2);
					lAnnuityRate.value = n;
				}
			}
		}
		
	//	alert("After annuity rate");	
	//	return false;

		if (!hasValue(lAnnuityGrowthRate.value)) {
			
			}
		else{
			if (lAnnuityGrowthRate.value == 0 || lAnnuityGrowthRate.value > 100){
				if (!hasValue(lClientEPFId.value)) {
					document.getElementById('alertannuitygrowthrate').innerHTML="Value cannot be 0 and must be within 100";
					lAnnuityGrowthRate.style.border = "2px solid red";
					errAnnuity=1;
				}
			}
			else {
				var num = lAnnuityGrowthRate.value;
				if (!isDecimal(num)){
					document.getElementById('alertannuitygrowthrate').innerHTML="Please enter a positive value not starting with 0";
					lAnnuityGrowthRate.style.border = "2px solid red";			
				    errAnnuity=1;	
				}
				else {
					var n = Number(num).toFixed(2);
					lAnnuityGrowthRate.value = n;
				}
			}
		}
		
	//	alert("After annuity growth rate");
	//	return false;

		if (atUser != 6) {
			if (!hasValue(lAnnuityStartDate.value)) {
				document.getElementById('alertannuitystartdate').innerHTML="Please enter Annuity Start Date";
				lAnnuityStartDate.style.border = "2px solid red";
			//	lIdCalendar.style.border = "2px solid red";
				errAnnuity=1;
			}
		}
		
		/*else{
			
			window.user_dt = moment(lAnnuityStartDate.value,'DD/MM/YYYY');
			
			if(!window.user_dt.isValid()){
				document.getElementById('alertannuitystartdate').innerHTML="Annuity Start Date is not a valid date";
				lAnnuityStartDate.style.border = "2px solid red";
			//	lIdCalendar.style.border = "2px solid red";
				errAnnuity=1;
			}else if(!isDateBetwenRange(window.client_dob , new Date(), window.user_dt.toDate())){
				document.getElementById('alertannuitystartdate').innerHTML= "Annuity Start Date should be in between client dob & today";
				lAnnuityStartDate.style.border = "2px solid red";
			//	lIdCalendar.style.border = "2px solid red";
				errAnnuity=1;
			}
		}
		*/
		
		//alert("After annuity start date");

		var apfUser = lAnnuityPayoutFrequency.options[lAnnuityPayoutFrequency.selectedIndex].value;
		if (atUser != 6) {
			if (apfUser==""){
				document.getElementById('alertapf').innerHTML="Please select Annuity Payout Frequency";
				lAnnuityPayoutFrequency.style.border = "2px solid red";
				errAnnuity=1;
			}
		}
		
		
		if (atUser == 6){
			if(!hasValue(lAnnuityMonthlyBasicDA.value)){
				document.getElementById('alertannuityMonthlyBasicDA').innerHTML="Please enter Monthly Basic(+DA)";
				lAnnuityMonthlyBasicDA.style.border = "2px solid red";
				errAnnuity=1;
			} else {
				if (lAnnuityMonthlyBasicDA.value == 0) {
					document.getElementById('alertannuityMonthlyBasicDA').innerHTML="Monthly Basic(+DA) cannot be 0";
					lAnnuityMonthlyBasicDA.style.border = "2px solid red";
					errAnnuity=1;
				}
				else {
					var num = lAnnuityMonthlyBasicDA.value;
					if (!isDecimal(num)){
						document.getElementById('alertannuityMonthlyBasicDA').innerHTML="Monthly Basic(+DA) must be positive decimal not starting with 0";
						lAnnuityMonthlyBasicDA.style.border = "2px solid red";
						errAnnuity=1;
					}
					else {
						var n = Number(num).toFixed(2);
						lAnnuityMonthlyBasicDA.value = n;
					}
				}
			}
			
			if (!hasValue(lAnnuityServiceYears.value)){
				document.getElementById('alertannuityServiceYears').innerHTML="Please enter Years of Service";
				lAnnuityServiceYears.style.border = "2px solid red";
				errAnnuity=1;
			} else {
				if (lAnnuityServiceYears.value == 0){
					document.getElementById('alertannuityServiceYears').innerHTML="Years of Service cannot be 0"
					lAnnuityServiceYears.style.border = "2px solid red";
					errAnnuity=1;
				}
				else {
					var num = lAnnuityServiceYears.value;
					if (!isInteger(num)){
						document.getElementById('alertannuityServiceYears').innerHTML="Years of Service must be a positive integer not starting with 0"
						lAnnuityServiceYears.style.border = "2px solid red";
						errAnnuity=1;
					}
				}
			}
			
			/*if (!hasValue(lAnnuityAnnualContribIncr.value)) {
				document.getElementById('alertannuityAnnualContributionIncrease').innerHTML="Please enter Annual Contribution Increase %";
				lAnnuityAnnualContribIncr.style.border = "2px solid red";
				errAnnuity=1;
			}	
			else{
				 if (lAnnuityAnnualContribIncr.value == 0 || lAnnuityAnnualContribIncr.value > 100){
						document.getElementById('alertannuityAnnualContributionIncrease').innerHTML="Annual Contribution Increase % cannot be 0 and greater than 100";
						lAnnuityAnnualContribIncr.style.border = "2px solid red";
						errAnnuity=1;
					}
					else {
						var num = lAnnuityAnnualContribIncr.value;
						if (!isDecimal(num)){
							document.getElementById('alertannuityAnnualContributionIncrease').innerHTML="Annual Contribution Increase % must be positive decimal not starting with 0";
							lAnnuityAnnualContribIncr.style.border = "2px solid red";
							errAnnuity=1;
						}
						else {
							var n = Number(num).toFixed(2);
							lAnnualContributionIncrease.value = n;
						}
					}
				}*/
			
		}
		
		/*alert(sessionStorage.getItem("SELECTED_CLIENT_ID"));
		getClientData("GET", "", "clientAnnuity/client/"+sessionStorage.getItem("SELECTED_CLIENT_ID"), getFMSuccess);
		
		function getFMSuccess(data) {
			if(data.length > 0) {
				$.each(data, function (index, client) {
					if(client.annuityType == 6) {
						errAnnuity = 1;
						//bootbox.alert("EPS Annuity already added for this client.");
					}
				});
			}
		}*/
		
		
		//if (errpCorpus==1 || erraRate==1 || erragRate==1 || errasdate==1){
		if (errAnnuity==1){
			//alert("Error");
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		} else {
			return true;
		}
	}
	function validateNonRetirementGoal(form) {
		//alert("Inside goal validation 1");
		//return false;
		var lClientLE = document.getElementById("idClientLifeExpectancy");				
		var lGoalType = document.getElementById("idgoalType");		
		var lGoalDescription = document.getElementById("idgoalDescription");
		var lGoalPriority = document.getElementById("idgoalPriority"); 
		var lGoalStartDate = document.getElementById("idgoalStartMonthYear");		
		var lGoalStartDateGroup = document.getElementById("idGoalStartDateGroup");		
		var lCorpusFrequency = document.getElementById("idcorpusFrequency");
		var lEstimatedCost = document.getElementById("idestimatedCost");
		var lLoanRequired = document.getElementById("idloanRequired");
		//alert("hiiiii");
		
		var lInflationRate = document.getElementById("idinflationRate"); 
		//alert("");
		//var lReturnRate = document.getElementById("idreturnRate");
		var lLoanPercent = document.getElementById("idloanPercent");
	     //alert("percent: " + lLoanPercent.value);
		var lLoanInterestRate = document.getElementById("idloanInterestRate");
		var lLoanTenure = document.getElementById("idloanTenure");
		var lGoalNumber = document.getElementById("idgoalNumber");
		var lBirthDatePlusLE = document.getElementById("idBirthDatePlusLE");
		var lbirthdate = document.getElementById("idbirthDate");
		var lAge = document.getElementById("idAge");


		//alert("Inside goal validation 3");
		
		
		//var lGoalType = document.getElementById("idGoalType");
		
		console.log("Inside goal validation 2");
		//return false;
		var errGoal=0;		
		//lGoalType.style.border = "1px solid #ccc";
		lGoalDescription.style.border = "1px solid #ccc";
		lGoalPriority.style.border = "1px solid #ccc";
		//alert("Inside goal validation 2-1");
		lGoalStartDate.style.border = "1px solid #ccc";
	//	alert("Inside goal validation 2-2");
		lGoalStartDateGroup.style.border = "1px solid #ccc";
	//	alert("Inside goal validation 2-3");
		lGoalStartDateGroup.style.borderRadius = "7px";
		lCorpusFrequency.style.border = "1px solid #ccc";
		lEstimatedCost.style.border = "1px solid #ccc";
		lLoanRequired.style.border = "1px solid #ccc";
		//alert("Inside goal validation 2-6");
		lInflationRate.style.border = "1px solid #ccc";
		//lReturnRate.style.border = "1px solid #ccc";
		lLoanPercent.style.border = "1px solid #ccc";
		lLoanInterestRate.style.border = "1px solid #ccc";
		//alert("Inside goal validation 2-7");
		lLoanTenure.style.border = "1px solid #ccc";
		//lGoalNumber.style.border = "1px solid #ccc";
	
		//alert("Inside goal validation 4");	
		//return false;
		document.getElementById('alertgoaldescription').innerHTML="";
		document.getElementById('alertgoalpriority').innerHTML="";
		document.getElementById('alertgoalstartdate').innerHTML="";
		document.getElementById('alertcorpusfrequency').innerHTML="";
		document.getElementById('alertestimatedcost').innerHTML="";
		document.getElementById('alertloanrequired').innerHTML="";
		document.getElementById('alertinflationrate').innerHTML="";
		//document.getElementById('alertreturnrate').innerHTML="";
		document.getElementById('alertloanpercent').innerHTML="";
		document.getElementById('alertloaninterestrate').innerHTML="";
		document.getElementById('alertloantenure').innerHTML="";
		document.getElementById('alertform').innerHTML="";

		//alert("Inside goal validation 5");
		//return false;
		if(!hasValue(lGoalDescription.value)) {
			document.getElementById('alertgoaldescription').innerHTML="Please enter a Goal Description";
			lGoalDescription.style.border = "2px solid red";
			errGoal=1;
		} 

		//alert("After goal description validation");
		//return false;
		if (!hasValue(lGoalPriority.value)) {
			document.getElementById('alertgoalpriority').innerHTML="Please enter a Goal Priority";
			lGoalPriority.style.border = "2px solid red";
			errGoal=1;
			}
		else {
			if (lGoalPriority.value<=0){
				document.getElementById('alertgoalpriority').innerHTML="Goal Priority cannot be zero or negative.";
				lGoalPriority.style.border = "2px solid red";
				errGoal=1;
				}
				else if (!testInputData(lGoalPriority, integerOnly)) {
					document.getElementById('alertgoalpriority').innerHTML="Goal Priority must be an integer";
					lGoalPriority.style.border = "2px solid red";
					errGoal=1;			
				}
			
			}
		//alert("After goal priority validation");
		//return false;
		//alert('Goal Start Date: '+lGoalStartDate.value+' BDate+LE: '+lBirthDatePlusLE.value);		
		var iGoalStartDate = moment(lGoalStartDate.value,'MMM-YYYY').format('DD/MM/YYYY');
		var iBirthDatePlusLE = moment(lBirthDatePlusLE.value,'DD/MM/YYYY')
		//alert('Goal Start Date: '+iGoalStartDate);
		if (!hasValue(iGoalStartDate)) {
			document.getElementById('alertgoalstartdate').innerHTML="Please enter Start Date of Goal";
			lGoalStartDateGroup.style.border = "2px solid red";
			lGoalStartDateGroup.style.borderRadius = "7px";
			errGoal=1;
		}
		else {
			if (!isFutureDate(iGoalStartDate)) {
			document.getElementById('alertgoalstartdate').innerHTML="Goal Start Date should be a future date";
			lGoalStartDateGroup.style.border = "2px solid red";
			lGoalStartDateGroup.style.borderRadius = "7px";
			errGoal=1;		
		 }
			
		 if (date1AfterDate2(iGoalStartDate,lBirthDatePlusLE.value)) {
			//alert('Date More Than Life Expectancy'); 
			document.getElementById('alertgoalstartdate').innerHTML="Goal Start Date cannot be greater than life expectancy of Client and Spouse";
			lGoalStartDateGroup.style.border = "2px solid red";
			lGoalStartDateGroup.style.borderRadius = "7px";
			errGoal=1;		
		}
	}
		
		//alert("After goal start date validation");
		//return false;
		//alert('Goal Recurring: '+lGoalRecurring.value);
		var lGoalTypeVal = $("input[name=lookupGoalTypeId]").val();
		console.log('Goal Type: '+lGoalTypeVal);
		//var lGoalTypeVal=lGoalType.value;
		
		
		if (lGoalTypeVal == 1 ||lGoalTypeVal == 6 ||lGoalTypeVal == 7 || lGoalTypeVal == 9 ) {
		console.log('Inside goal recurring validation');
			var lGoalRecurring = document.getElementById("idgoalRecurring");
			var lGoalRecurring1 = document.getElementById("idgoalRecurring1");
		//	document.getElementById('alertgoalrecurring').innerHTML="";
			document.getElementById('alertgoalnumber').innerHTML="";
			lGoalRecurring.style.border = "1px solid #ccc";
			lGoalNumber.style.border = "1px solid #ccc";
			if(!hasValue(lGoalRecurring.value)) {
			//	document.getElementById('alertgoalrecurring').innerHTML="Please select an option for Goal Recurring";
				lGoalRecurring.style.border = "2px solid red";
				errgGoal=1;
			}
		//	alert("lGoalRecurring.value "+lGoalRecurring.value);
			//alert("lGoalRecurring.value1 "+lGoalRecurring1.value);
			
			console.log("lCorpusFrequency.value "+lCorpusFrequency.value);
			if(lCorpusFrequency.value== "" || lCorpusFrequency.value == null || lCorpusFrequency.value==0) {
				console.log("lCorpusFrequency.value "+lCorpusFrequency.value);
				document.getElementById('alertcorpusfrequency').innerHTML="Please enter Corpus Utilization Frequency for a recurring goal";
				lCorpusFrequency.style.border = "2px solid red";
				errGoal=1;
			}
			
			//if (lGoalRecurring.value == 'Y') { 
			if( form.recurringFlag[0].checked == true ){
				if (lGoalNumber.value== "" || lGoalNumber.value== null) {
					document.getElementById('alertgoalnumber').innerHTML="Please enter no. of years of goal for which goal will recur";
					lGoalNumber.style.border = "2px solid red";			
					errGoal=1;					
				}	
				else{
					if(lGoalNumber.value <= 0){
						//	alert("validation failed");
						document.getElementById('alertgoalnumber').innerHTML="No. of years for which goal will recur cannot enter negative values or zero";
						lGoalNumber.style.border = "2px solid red";			
						errGoal=1;
					}
					else {
						//alert('Inside Inflation Rate validation');
						if (!isInteger(lGoalNumber.value)) {
							//alert("inflation rate validation failed");
							document.getElementById('alertgoalnumber').innerHTML="No. of goals for which goal will recur must be a valid integer number.";
							lGoalNumber.style.border = "2px solid red";			
							errGoal=1;				
						}
						else{
							console.log('Goal Start Year: ' + iGoalStartDate);							
							var goalEndYear = moment(lGoalStartDate.value,'MMM-YYYY').add('years',lGoalNumber.value).format('DD/MM/YYYY');
							console.log('Goal End Year: '+ goalEndYear);
							if(date1AfterDate2(goalEndYear,lBirthDatePlusLE.value)){
								document.getElementById('alertgoalnumber').innerHTML="End year of recurring goal should be less than Life Expectancy of Client and Spouse";
								lGoalNumber.style.border = "2px solid red";			
								errGoal=1;
							}
						}
					}
				}
			}	
		}

		//alert("After goal recurring, goal number validation");
		
		if (!hasValue(lEstimatedCost.value)) {
			document.getElementById('alertestimatedcost').innerHTML="Please enter Estimated Cost";
			lEstimatedCost.style.border = "2px solid red";
			errGoal=1;
			}	
		else{
			if(lEstimatedCost.value <= 0){
			//alert("validation failed");
			document.getElementById('alertestimatedcost').innerHTML="Estimated Cost cannot be a negative value or zero";
			lEstimatedCost.style.border = "2px solid red";			
			errGoal=1;
			}
			else {
				
					//alert('Inside Inflation Rate validation');
					if (!isDecimal(lEstimatedCost.value)) {
						//alert("inflation rate validation failed");
						document.getElementById('alertestimatedcost').innerHTML="Estimated Cost must be a valid decimal number.";
						lEstimatedCost.style.border = "2px solid red";			
						errGoal=1;				
					}
					else{
						//alert("werwert");
						var num = lEstimatedCost.value;
						/*var n = (Math.floor(100 * num) / 100).toFixed(2);*/
					    var n = Number(num).toFixed(2);
					    document.getElementById("idestimatedCost").value=n;	
					}
			}
				
		}
			
		
		console.log("After estimated cost validation");

		if(!hasValue(lLoanRequired.value)) {
			document.getElementById('alertloanrequired').innerHTML="Please enter if loan is required or not";
			lLoanRequired.style.border = "2px solid red";
			errGoal=1;
		} 

		console.log("After loan required validation");
		
		if (lInflationRate.value== "" || lInflationRate.value== null) {
			
			}	
		else{
			if((lInflationRate.value <= 0) || (lInflationRate.value > 100)){
			//alert("validation failed");
			document.getElementById('alertinflationrate').innerHTML="Inflation Rate cannot be a negative value or zero or greater than 100";
			lInflationRate.style.border = "2px solid red";			
			errGoal=1;
			}
			else {
				
					//alert('Inside Inflation Rate validation');
					if (!isDecimal(lInflationRate.value)) {
						//alert("inflation rate validation failed");
						document.getElementById('alertinflationrate').innerHTML="Inflation Rate must be a valid decimal number.";
						lInflationRate.style.border = "2px solid red";			
						errGoal=1;				
					}
					else{
						//alert("werwert");
						/*var num = lInflationRate.value;
						var n = (Math.floor(100 * num) / 100).toFixed(2);
					   var n = Number(num).toFixed(2);
					    document.getElementById("idinflationRate").value=n;	*/
					}
			}
				
		}
					
		
		//alert("After inflation rate validation");
		
		/*if (lReturnRate.value== "" || lReturnRate.value== null) {
			
		}	
		else{
			if((lReturnRate.value <= 0) || (lReturnRate.value > 100)){
			//alert("validation failed");
			document.getElementById('alertreturnrate').innerHTML="Return Rate cannot be a negative value or zero or greater than 100";
			lReturnRate.style.border = "2px solid red";			
			errGoal=1;
			}
			else {
				
					//alert('Inside Inflation Rate validation');
					if (!isDecimal(lReturnRate.value)) {
						//alert("inflation rate validation failed");
						document.getElementById('alertreturnrate').innerHTML="Return Rate must be a valid decimal number.";
						lReturnRate.style.border = "2px solid red";			
						errGoal=1;				
					}
					else{
						//alert("werwert");
						var num = lReturnRate.value;
						var n = (Math.floor(100 * num) / 100).toFixed(2);
					   var n = Number(num).toFixed(2);
					    document.getElementById("idreturnRate").value=n;	
					}
			}
				
		}*/
		console.log("After return rate validation ");
		//return false;	
		if ((lLoanRequired.value == 'Y')) {		
	//	alert("After loan rate validation");
		//return false;
			
			if (!hasValue(lLoanPercent.value)) {
				document.getElementById('alertloanpercent').innerHTML="Please enter Loan Percent.";
				lLoanPercent.style.border = "2px solid red";			
				errGoal=1;
			} else {
				if((lLoanPercent.value <= 0) || (lLoanPercent.value > 90)){
					//	alert("validation failed");
						document.getElementById('alertloanpercent').innerHTML="Loan Percent cannot be a negative value or zero or greater than 90";
						lLoanPercent.style.border = "2px solid red";			
						errGoal=1;
						}
						else {
							
							//	alert('Inside Inflation Rate validation');
								if (!isDecimal(lLoanPercent.value)) {
									//alert("inflation rate validation failed");
									document.getElementById('alertloanpercent').innerHTML="Loan Percent must be a valid decimal number.";
									lLoanPercent.style.border = "2px solid red";			
									errGoal=1;				
								}
								else{
									//alert("werwert");
									var num = lLoanPercent.value;
								   var n = Number(num).toFixed(2);
								   document.getElementById("idloanPercent").value=n;	
								}
						}
			}
			
				
			  
				console.log("after loan percent ");
				//return false;
		if (!hasValue(lLoanInterestRate.value)) {
			document.getElementById('alertloaninterestrate').innerHTML="Please enter Loan Interest Rate.";
			lLoanInterestRate.style.border = "2px solid red";
			errGoal=1;
		}	
		else {
			if (lLoanInterestRate.value<=0){
				document.getElementById('alertloaninterestrate').innerHTML="Loan Interest Rate cannot be zero or negative.";
				lLoanInterestRate.style.border = "2px solid red";
				errGoal=1;
				}
			else{
				if((lLoanInterestRate.value <= 0) || (lLoanInterestRate.value > 20)){
			//	alert("validation failed");
				document.getElementById('alertloaninterestrate').innerHTML="Loan Interest Rate cannot be a negative value or zero or greater than 20";
				lLoanInterestRate.style.border = "2px solid red";			
				errGoal=1;
				}
				else {
					//	alert('Inside Inflation Rate validation');
						if (!isDecimal(lLoanInterestRate.value)) {
							//alert("inflation rate validation failed");
							document.getElementById('alertloaninterestrate').innerHTML="Loan Percent must be a valid decimal number.";
							lLoanInterestRate.style.border = "2px solid red";			
							errGoal=1;				
						}
						else{
						//	alert("werwert");
							var num = lLoanInterestRate.value;
						   var n = Number(num).toFixed(2);
						   document.getElementById("idloanInterestRate").value=n;	
						}
				}
					
			}
		}
		console.log("After loan interest rate validation "+errGoal);
		//return false;
		
		if (!hasValue(lLoanTenure.value)) {
			document.getElementById('alertloantenure').innerHTML="Enter Loan Tenure.";
			lLoanTenure.style.border = "2px solid red";
			errGoal=1;
		}	
		else{
			if(lLoanTenure.value <= 0){
		//	alert("validation failed");
			document.getElementById('alertloantenure').innerHTML="Loan Tenure cannot be a negative value or zero";
			lLoanTenure.style.border = "2px solid red";			
			errGoal=1;
			}
			else {
				//	alert('Inside Inflation Rate validation');
					if (!isInteger(lLoanTenure.value)) {
						//alert("inflation rate validation failed");
						document.getElementById('alertloantenure').innerHTML="Loan tenure must be a valid integer number.";
						lLoanTenure.style.border = "2px solid red";			
						errGoal=1;				
					}
					else{
						//console.log("Tenure: "+lLoanTenure.value);
						var loanEndYear = moment(lGoalStartDate.value,'MMM-YYYY').add('years',lLoanTenure.value).format('DD/MM/YYYY');
						//console.log("Loan End Year: "+ loanEndYear+' ClientLE: '+lBirthDatePlusLE.value);

						if(date1AfterDate2(loanEndYear,lBirthDatePlusLE.value)){
							document.getElementById('alertloantenure').innerHTML="Loan End Date cannot be more than Life Expectancy of Client and Spouse";
							lLoanTenure.style.border = "2px solid red";			
							errGoal=1;
						}
					}
				}
			}
		}

		//alert("After loan tenure validation errgoal "+errGoal);
		//return false;
		if (errGoal==1){
			//alert("Error");
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		}else{
			//alert("correct");
			return true;
		}
	}		
			
		
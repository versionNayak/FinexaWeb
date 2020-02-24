	function validateRetirementGoal(form) {
		console.log("Inside goal validation 1");
		//var lGoalDescription = document.getElementById("idgoalDescription");
		var lGoalPriority = document.getElementById("idgoalPriority"); 
		var lPayoutFrequency = document.getElementById("idpayoutFrequency");
		var lCurrentAnnualExpense = document.getElementById("idcurrentAnnualExpense");
		var lInflationRate = document.getElementById("idinflationRate"); 
		//var lReturnRate = document.getElementById("idreturnRate");
		
		console.log("Inside goal validation 2");

		var errGoal=0;		
		//console.log("Inside goal validation 3");
		//lGoalDescription.style.border = "1px solid #ccc";
		lGoalPriority.style.border = "1px solid #ccc";
		lPayoutFrequency.style.border = "1px solid #ccc";
		lCurrentAnnualExpense.style.border = "1px solid #ccc";
		lInflationRate.style.border = "1px solid #ccc";
		//lReturnRate.style.border = "1px solid #ccc";
	
		console.log("Inside goal validation 4");
		//document.getElementById('alertgoaldescription').innerHTML="";
		document.getElementById('alertgoalpriority').innerHTML="";
		document.getElementById('alertpayoutfrequency').innerHTML="";
		/*document.getElementById('alertcurrentannualexpense').innerHTML="r";*/
		document.getElementById('alertcurrentannualexpense').innerHTML="";
		document.getElementById('alertinflationrate').innerHTML="";
		//document.getElementById('alertreturnrate').innerHTML="";

		//console.log("Inside goal validation 5");

		//var lGoalTypeVal = $("input[name=goalType]:checked").val();
		//console.log('Goal Type: '+lGoalTypeVal);
		//console.log("lGoalDescription.value  "+lGoalDescription.value);
/*		if(!hasValue(lGoalDescription.value)) {
			document.getElementById('alertgoaldescription').innerHTML="Please enter a goal description";
			lGoalDescription.style.border = "2px solid red";
			errGoal=1;
		} 
*/		
		console.log("lGoalPriority.value  "+lGoalPriority.value);
		if (!hasValue(lGoalPriority.value)) {
			document.getElementById('alertgoalpriority').innerHTML="Please enter a goal priority";
			lGoalPriority.style.border = "2px solid red";
			errGoal=1;
			}
		else if (!testInputData(lGoalPriority, integerOnly)) {
			document.getElementById('alertgoalpriority').innerHTML="Priority must be an integer";
			lGoalPriority.style.border = "2px solid red";
			errGoal=1;			
		}	   
		console.log("lCurrentAnnualExpense.value  "+lCurrentAnnualExpense.value);
		if (!hasValue(lCurrentAnnualExpense.value)) {
			document.getElementById('alertcurrentannualexpense').innerHTML="Please enter Post Requirement Annual Living Expenses as on today";
			lCurrentAnnualExpense.style.border = "2px solid red";
			errGoal=1;
			}	
		else{
			if ( lCurrentAnnualExpense.value < 0 || lCurrentAnnualExpense.value== 0){
			//console.log("validation failed");
			document.getElementById('alertcurrentannualexpense').innerHTML="Post Requirement Annual Living Expenses as on today cannot be negative or zero";
			lCurrentAnnualExpense.style.border = "2px solid red";			
			errGoal=1;
			}
			var num = lCurrentAnnualExpense.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idcurrentAnnualExpense").value=n;
		}
		console.log("lPayoutFrequency.value  "+lPayoutFrequency.value);
	//	console.log("After annual living expense validation");
		if(!hasValue(lPayoutFrequency.value) || lPayoutFrequency.value==0) {
			document.getElementById('alertpayoutfrequency').innerHTML="Please specify Post Retirement Payout Frequency";
			lPayoutFrequency.style.border = "2px solid red";
			errGoal=1;
		}

	//	console.log("After payout frequency validation");
		console.log("lInflationRate.value  "+lInflationRate.value);
		if (lInflationRate.value== "" || lInflationRate.value== null) {
			
			}	
		else{
			if((lInflationRate.value <= 0) || (lInflationRate.value > 100)){
			//console.log("validation failed");
			document.getElementById('alertinflationrate').innerHTML="Cannot enter negative values or zero or greater than 100";
			lInflationRate.style.border = "2px solid red";			
			errGoal=1;
			}
			else {
				
					//console.log('Inside Inflation Rate validation');
					if (testInputData(lInflationRate,decimalOnly) == false) {
						//console.log("inflation rate validation failed");
						document.getElementById('alertinflationrate').innerHTML="Inflation rate must be a valid decimal number.";
						lInflationRate.style.border = "2px solid red";			
						errGoal=1;				
					}
			}
			var num = lInflationRate.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idinflationRate").value=n;		
		}
		
				
		
	//	console.log("After inflation rate validation");
		/*console.log("lReturnRate.value  "+lReturnRate.value);
		if (lReturnRate.value== "" || lReturnRate.value== null) {
			
		}	
		else{
			if((lReturnRate.value <= 0) || (lReturnRate.value > 100)){
			//console.log("validation failed");
			document.getElementById('alertreturnrate').innerHTML="Return Rate cannot enter negative values or zero or greater than 100";
			lReturnRate.style.border = "2px solid red";			
			errGoal=1;
			}
			var num = lReturnRate.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idreturnRate").value=n;
		}*/
			
		console.log("After return rate validation "+errGoal);
				
			
		if (errGoal == 1) {
			//console.log("Error");
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		}else{
			return true;
		}
		
	}
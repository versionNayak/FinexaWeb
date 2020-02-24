function validateExpense(form) {
//  alert('In validation 1');
  //return false;
	
	var table = document.getElementById("idExpenseTable");
	var rowId = document.getElementById("idGroceryErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	
	
	 rowId = document.getElementById("idUtilitiesErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	 rowId = document.getElementById("idTransportErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	 rowId = document.getElementById("idHouseholdErrorMessage");
		if (rowId != null) {
			rowId.parentNode.removeChild(rowId);
		}
		
	 rowId = document.getElementById("idHousingErrorMessage");
	  if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}

	 rowId = document.getElementById("idCommunicationErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	
	 rowId = document.getElementById("idLifestyleErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	
	 rowId = document.getElementById("idApparelErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
		}
	rowId = document.getElementById("idTutionErrorMessage");
	if (rowId != null) {
	   rowId.parentNode.removeChild(rowId);
	 }
	rowId = document.getElementById("idHealthcareErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	rowId = document.getElementById("idOtherErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	var table1 = document.getElementById("idExpenseTable1");
	var rowId1 = document.getElementById("idTotalErrorMessage");
	if (rowId1 != null) {
		rowId1.parentNode.removeChild(rowId1);
	}
	
	var lGrocery = document.getElementById("idGroceryAmount");
	var lGroceryFrequency = document.getElementById("idGroceryFrequency");
	var lGroceryReferenceMonth = document.getElementById("idGroceryReferenceMonth");
	var lGroceryYearTill = document.getElementById("idGroceryYearTill");
		
	var lUtilities = document.getElementById("idUtilitiesAmount");
	var lUtilitiesFrequency = document.getElementById("idUtilitiesFrequency");
	var lUtilitiesReferenceMonth = document.getElementById("idUtilitiesReferenceMonth");
	var lUtilitiesYearTill = document.getElementById("idUtilitiesYearTill");

	var lTransport = document.getElementById("idTransportAmount");
	var lTransportFrequency = document.getElementById("idTransportFrequency");
	var lTransportReferenceMonth = document.getElementById("idTransportReferenceMonth");
	var lTransportYearTill = document.getElementById("idTransportYearTill");
	
	
	var lHouseholdAmount = document.getElementById("idHouseholdAmount");
	var lHouseholdFrequency = document.getElementById("idHouseholdFrequency");
	var lHouseholdReferenceMonth = document.getElementById("idHouseholdReferenceMonth");
	var lHouseholdYearTill = document.getElementById("idHouseholdYearTill");

	//console.log("idHousingAmount "+document.getElementById("idHousingAmount"));
	var lHousing = document.getElementById("idHousingAmount");
	//console.log("idHousingAmount "+lHousing.value);
	var lHousingFrequency = document.getElementById("idHousingFrequency");
	var lHousingReferenceMonth = document.getElementById("idHousingReferenceMonth");
	var lHousingYearTill = document.getElementById("idHousingYearTill");
	

	var lCommunication = document.getElementById("idCommunicationAmount");
	var lCommunicationFrequency = document.getElementById("idCommunicationFrequency");
	var lCommunicationReferenceMonth = document.getElementById("idCommunicationReferenceMonth");
	var lidCommunicationYearTill = document.getElementById("idCommunicationYearTill");
	
	
	
	var lLifestyle = document.getElementById("idEntertainmentAmount");
	var lEntertainmentFrequency = document.getElementById("idEntertainmentFrequency");
	var lEntertainmentReferenceMonth = document.getElementById("idEntertainmentReferenceMonth");
	var lEntertainmentYearTill = document.getElementById("idEntertainmentYearTill");
	
	
	
	var lApparel = document.getElementById("idApparelAmount");
	var lApparelFrequency = document.getElementById("idApparelFrequency");
	var lApparelReferenceMonth = document.getElementById("idApparelReferenceMonth");
	var lApparelYearTill = document.getElementById("idApparelYearTill");
	
	
	var lTution = document.getElementById("idTutionAmount");
	var lTutionFrequency = document.getElementById("idTutionFrequency");
	var lTutionReferenceMonth = document.getElementById("idTutionReferenceMonth");
	var lTutionYearTill = document.getElementById("idTutionYearTill");
	
	
	
	var aa = document.getElementById("aa");
	var lHealthcare = document.getElementById("idHealthcareAmount");
	var lHealthcareFrequency = document.getElementById("idHealthcareFrequency");
	var lHealthcareReferenceMonth = document.getElementById("idHealthcareReferenceMonth");
	var lHealthcareYearTill = document.getElementById("idHealthcareYearTill");
	
	
	
	
	var lOther = document.getElementById("idOtherExpenseAmount");
	var lOtherExpenseFrequency = document.getElementById("idOtherExpenseFrequency");
	var lOtherExpenseReferenceMonth = document.getElementById("idOtherExpenseReferenceMonth");
	var lOtherExpenseYearTill = document.getElementById("idOtherExpenseYearTill");
	
	
	
	
	
	var lTotal = document.getElementById("idTotalExpenseAmount");
	var lTotalYearTill = document.getElementById("idTotalExpenseYearTill");
	
	
	
	
	
	
	//alert('In validation 2');
	var errExpense=0;

	//alert('In validation 3');

    lGrocery.style.border = "1px solid #ccc";
   // alert('In validation 3-1');
	lUtilities.style.border = "1px solid #ccc";
	//alert('In validation 3-2');
	lTransport.style.border = "1px solid #ccc";
//	alert('In validation 3-3');
	lHouseholdAmount.style.border = "1px solid #ccc";
	lHousing.style.border = "1px solid #ccc";
	//alert('In validation 3-4');
	lCommunication.style.border = "1px solid #ccc";
//	alert('In validation 3-5');
	lLifestyle.style.border = "1px solid #ccc";
	//alert('In validation 3-6');
	lApparel.style.border = "1px solid #ccc";
	//alert('In validation 3-7');
	lTution.style.border = "1px solid #ccc";
	//alert('In validation 3-8');
	lHealthcare.style.border = "1px solid #ccc";
	//alert('In validation 3-9');
    lOther.style.border = "1px solid #ccc";
    //alert('In validation 3-10');
    lTotal.style.border = "1px solid #ccc";
    
    
    lGroceryFrequency.style.border = "1px solid #ccc";
	lGroceryReferenceMonth.style.border = "1px solid #ccc";
	lGroceryYearTill.style.border = "1px solid #ccc";
    
    
	lUtilitiesFrequency.style.border = "1px solid #ccc";
	lUtilitiesReferenceMonth.style.border = "1px solid #ccc";
	lUtilitiesYearTill.style.border = "1px solid #ccc";
	
	
	lTransportFrequency.style.border = "1px solid #ccc";
	lTransportReferenceMonth.style.border = "1px solid #ccc";
	lTransportYearTill.style.border = "1px solid #ccc";
	
	lHouseholdFrequency.style.border = "1px solid #ccc";
	lHouseholdReferenceMonth.style.border = "1px solid #ccc";
	lHouseholdYearTill.style.border = "1px solid #ccc";
	
	
	lHousingFrequency.style.border = "1px solid #ccc";
	lHousingReferenceMonth.style.border = "1px solid #ccc";
	lHousingYearTill.style.border = "1px solid #ccc";
	
	lCommunicationFrequency.style.border = "1px solid #ccc";
	lCommunicationReferenceMonth.style.border = "1px solid #ccc";
	lidCommunicationYearTill.style.border = "1px solid #ccc";
	
	
	lEntertainmentFrequency.style.border = "1px solid #ccc";
	lEntertainmentReferenceMonth.style.border = "1px solid #ccc";
	lEntertainmentYearTill.style.border = "1px solid #ccc";
	
	
	lApparelFrequency.style.border = "1px solid #ccc";
	lApparelReferenceMonth.style.border = "1px solid #ccc";
	lApparelYearTill.style.border = "1px solid #ccc";
	
	
	
	lTutionFrequency.style.border = "1px solid #ccc";
	lTutionReferenceMonth.style.border = "1px solid #ccc";
	lTutionYearTill.style.border = "1px solid #ccc";

	lHealthcareFrequency.style.border = "1px solid #ccc";
	lHealthcareReferenceMonth.style.border = "1px solid #ccc";
	lHealthcareYearTill.style.border = "1px solid #ccc";
	
	
	lOtherExpenseFrequency.style.border = "1px solid #ccc";
	lOtherExpenseReferenceMonth.style.border = "1px solid #ccc";
	lOtherExpenseYearTill.style.border = "1px solid #ccc";
	
	
	lTotalYearTill.style.border = "1px solid #ccc";
	

   // alert('In validation 4');

    document.getElementById('alertform').innerHTML="";
   // alert('In validation 4-1');
    

	
   // alert('In validation 5');
	
	
	var utilities = lUtilities.value.replace(/,/g, '')*1;
	var transport = lTransport.value.replace(/,/g, '')*1;
	var housing = lHousing.value.replace(/,/g, '')*1;
	var communication = lCommunication.value.replace(/,/g, '')*1;
	var lifestyle = lLifestyle.value.replace(/,/g, '')*1;
	var apparel = lApparel.value.replace(/,/g, '')*1;
	var tution = lTution.value.replace(/,/g, '')*1;
	var healthcare = lHealthcare.value.replace(/,/g, '')*1;
	var other = lOther.value.replace(/,/g, '')*1;
//	var total = lTotal.value.replace(/,/g, '')*1;
	//alert("Total income1: " + lTotal.value);
	//alert("Total income2: " + total);
	

	
//	alert('In validation 6');
	if(document.getElementById("idOptionI").checked==true){
		 if((!hasValue(lGrocery.value)) && (!hasValue(lUtilities.value)) && (!hasValue(lTransport.value)) && (!hasValue(lHouseholdAmount.value)) &&
			(!hasValue(lHousing.value)) && (!hasValue(lCommunication.value)) && (!hasValue(lLifestyle.value)) && (!hasValue(lApparel.value)) && (!hasValue(lTution.value)) && (!hasValue(lHealthcare.value)) &&
			(!hasValue(lOther.value))){
			 modalMessage("At least one Expense head must be entered");
			 document.getElementById('alertform').innerHTML="";
			 errExpense=1;
			 return false;
			    }
		}
	
	//validate Grocery
	  var groceryErrorMessage = "";
	 if (hasValue(lGrocery.value)){ 
		 lGrocery.value = lGrocery.value.replace(/,/g, '');
	if (lGrocery.value<= 0){
	//	alert('In validation 6-1');
		lGrocery.style.border = "2px solid red";
	//	alert('In validation 6-2');
	    errExpense=1;
	//    alert('In validation 6-3');
	    groceryErrorMessage = groceryErrorMessage + "Expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lGrocery.value)){
	//	   alert("dddd");
		   lGrocery.style.border = "2px solid red";
	//			alert('In validation 7');
				errExpense=1;
				groceryErrorMessage = groceryErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lGrocery.value;
		var n = Number(num).toFixed(2);
		document.getElementById("idGroceryAmount").value = n;
	  }
    }
	
	if (!hasValue(lGroceryFrequency.value)){
		lGroceryFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(groceryErrorMessage)){
			groceryErrorMessage = groceryErrorMessage + ", please enter frequency";
		}
		else{
			groceryErrorMessage = "Please enter frequency";
		}
	} else { //supra
		if (lGroceryFrequency.value != 12) {
			if (lGroceryReferenceMonth.value == 13) {
				lGroceryReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(groceryErrorMessage)){
					groceryErrorMessage = groceryErrorMessage +", please select valid month";
				}
				else {
					groceryErrorMessage = "Please select valid month";
				}
			}
		}
	}
	if (!hasValue(lGroceryReferenceMonth.value)){
		lGroceryReferenceMonth.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(groceryErrorMessage)){
			groceryErrorMessage = groceryErrorMessage + ", please enter valid month";
		}
		else{
			groceryErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lGroceryYearTill.value)){
		lGroceryYearTill.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(groceryErrorMessage)){
			groceryErrorMessage = groceryErrorMessage + ", please enter valid year";
		}
		else{
			groceryErrorMessage = "Please enter valid year";
		}
	}	
  }

	 var i=0;
	    if (hasValue(groceryErrorMessage)){
	    	console.log("Error message: " + groceryErrorMessage);
	    	var row = table.insertRow(2);
	    	row.setAttribute("id", "idGroceryErrorMessage");
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = groceryErrorMessage;
	    	i++;
	    }
	// alert('In expense grocery '+errExpense);
	//alert('In validation 95');
	//validate Utilities
	 var utilitiesErrorMessage = "";
	 if (hasValue(lUtilities.value)){ 
	lUtilities.value = lUtilities.value.replace(/,/g, '');
	if (lUtilities.value<= 0){
	//	alert('In validation 16');
		lUtilities.style.border = "2px solid red";
	//	alert('In validation 17');
	    errExpense=1;
	//    alert('In validation 18');
	    utilitiesErrorMessage = utilitiesErrorMessage + "Expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lUtilities.value)){
		//   alert("dddd");
		   lUtilities.style.border = "2px solid red";
		//		alert('In validation 7');
				errExpense=1;
				utilitiesErrorMessage = utilitiesErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lUtilities.value;
		var n = Number(num).toFixed(2);
		document.getElementById("idUtilitiesAmount").value = n;
	     }
	    }


	if (!hasValue(lUtilitiesFrequency.value)){
		lUtilitiesFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(utilitiesErrorMessage)){
			utilitiesErrorMessage = utilitiesErrorMessage + ", please enter frequency";
		}
		else{
			utilitiesErrorMessage = "Please enter frequency";
		}
	} else {
		 //supra
		if (lUtilitiesFrequency.value != 12) {
			if (lUtilitiesReferenceMonth.value == 13) {
				lUtilitiesReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(utilitiesErrorMessage)){
					utilitiesErrorMessage = utilitiesErrorMessage +", please select valid month";
				}
				else {
					utilitiesErrorMessage = "Please select valid month";
				}
			}
		}
	
	}
	if (!hasValue(lUtilitiesReferenceMonth.value)){
		lUtilitiesReferenceMonth.style.border = "2px solid red";
		errExpense=1;	
		if (hasValue(utilitiesErrorMessage)){
			utilitiesErrorMessage = utilitiesErrorMessage + ", please enter valid month";
		}
		else{
			utilitiesErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lUtilitiesYearTill.value)){
		lUtilitiesYearTill.style.border = "2px solid red";
		errExpense=1;	
		if (hasValue(utilitiesErrorMessage)){
			utilitiesErrorMessage = utilitiesErrorMessage + ", please enter valid year";
		}
		else{
			utilitiesErrorMessage = "Please enter valid year";
		}
	}	
	
	  }
	 if (hasValue(utilitiesErrorMessage)){
	    	console.log("Error message: " + utilitiesErrorMessage);
	    	if(i==0){
	        var row = table.insertRow(3);
	        }
	        if(i==1){
	        var row = table.insertRow(4);	
	        }
	    	row.setAttribute("id", "idUtilitiesErrorMessage");
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = utilitiesErrorMessage;
	    	i++;
	    }
	// alert('In expense utilities '+errExpense);
	//alert('In validation 94');
	//validate Transport
	 var transportErrorMessage = "";
	 if (hasValue(lTransport.value)){ 
	lTransport.value = lTransport.value.replace(/,/g, '');
	if (lTransport.value<= 0){
	//	alert('In validation 26');
		lTransport.style.border = "2px solid red";
	//	alert('In validation 27');
	    errExpense=1;
	//    alert('In validation 28');
	    transportErrorMessage = transportErrorMessage + "Expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lTransport.value)){
	//	   alert("dddd");
		   lTransport.style.border = "2px solid red";
		//		alert('In validation 7');
				errExpense=1;
				transportErrorMessage = transportErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lTransport.value;
		var n = Number(num).toFixed(2);
		document.getElementById("idTransportAmount").value = n;
	   }
      }
	if (!hasValue(lTransportFrequency.value)){
		lTransportFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(transportErrorMessage)){
			transportErrorMessage = transportErrorMessage + ", please enter frequency";
		}
		else{
			transportErrorMessage = "Please enter frequency";
		}
	} else {
		 //supra
		if (lTransportFrequency.value != 12) {
			if (lTransportReferenceMonth.value == 13) {
				lTransportReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(transportErrorMessage)){
					transportErrorMessage = transportErrorMessage +", please select valid month";
				}
				else {
					transportErrorMessage = "Please select valid month";
				}
			}
		}
	}
	if (!hasValue(lTransportReferenceMonth.value)){
		lTransportReferenceMonth.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(transportErrorMessage)){
			transportErrorMessage = transportErrorMessage + ", please enter valid month";
		}
		else{
			transportErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lTransportYearTill.value)){
		lTransportYearTill.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(transportErrorMessage)){
			transportErrorMessage = transportErrorMessage + ", please enter valid year";
		}
		else{
			transportErrorMessage = "Please enter valid year";
		}
	}	
	}
	 if (hasValue(transportErrorMessage)){
	    	console.log("Error message: " + transportErrorMessage);
	    	if(i==0){
	    	var row = table.insertRow(4);
	    	}
	    	if(i==1){
	    	var row = table.insertRow(5);	
	    	}
	    	if(i==2){
	        var row = table.insertRow(6);
	        }
	    	row.setAttribute("id", "idTransportErrorMessage");	
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = transportErrorMessage;
	    	i++;
	    }
	 
	 
	 //validate household
	 var householdErrorMessage = "";
	 if (hasValue(lHouseholdAmount.value)){
		 lHouseholdAmount.value = lHouseholdAmount.value.replace(/,/g, '');
			if (lHouseholdAmount.value<= 0){
//				alert('In validation 36');
				lHouseholdAmount.style.border = "2px solid red";
//				alert('In validation 37');
			    errExpense=1;
//			    alert('In validation 38');
			    householdErrorMessage = householdErrorMessage + "Expense cannot be negative";
			}
			else{
			//	alert("cccc");
			   if(!isDecimal(lHouseholdAmount.value)){
				//   alert("dddd");
				   lHouseholdAmount.style.border = "2px solid red";
				//		alert('In validation 7');
						errExpense=1;
						householdErrorMessage = householdErrorMessage + "Expense should be a valid decimal";
			   }
			else{
				var num = lHouseholdAmount.value;
				var n = Number(num).toFixed(2);
				lHouseholdAmount.value = n;
			}
		   }
			if (!hasValue(lHouseholdFrequency.value)){
				lHouseholdFrequency.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(householdErrorMessage)){
					householdErrorMessage = householdErrorMessage + ", please enter frequency";
				}
				else{
					householdErrorMessage = "Please enter frequency";
				}
			} else {
				 //supra
				if (lHouseholdFrequency.value != 12) {
					if (lHouseholdReferenceMonth.value == 13) {
						lHouseholdReferenceMonth.style.border = "2px solid red";
						errExpense=1;
						if (hasValue(householdErrorMessage)){
							householdErrorMessage = householdErrorMessage +", please select valid month";
						}
						else {
							householdErrorMessage = "Please select valid month";
						}
					}
				}
			}
			if (!hasValue(lHouseholdReferenceMonth.value)){
				lHouseholdReferenceMonth.style.border = "2px solid red";
				errExpense=1;	
				if (hasValue(householdErrorMessage)){
					householdErrorMessage = householdErrorMessage + ", please enter valid month";
				}
				else{
					householdErrorMessage = "Please enter valid month";
				}
			}
			if (!hasValue(lHouseholdYearTill.value)){
				lHouseholdYearTill.style.border = "2px solid red";
				errExpense=1;	
				if (hasValue(householdErrorMessage)){
					householdErrorMessage = householdErrorMessage + ", please enter valid year";
				}
				else{
					householdErrorMessage = "Please enter valid year";
				}
			}	
		  }
	 if (hasValue(householdErrorMessage)){
	    	console.log("Error message: " + householdErrorMessage);
	    	if(i==0){
	    	var row = table.insertRow(5);
	    	}
	    	if(i==1){
	    	var row = table.insertRow(6);	
	    	}
	    	if(i==2){
	        var row = table.insertRow(7);
	        }
	    	if(i==3){
	        var row = table.insertRow(8);
	        }
	    	row.setAttribute("id", "idHouseholdErrorMessage");	
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = householdErrorMessage;
	    	i++;
	    }
	//validate Housing
	 var housingErrorMessage = "";
	 if (hasValue(lHousing.value)){
	lHousing.value = lHousing.value.replace(/,/g, '');
//	console.log("lHousing.value "+lHousing.value);
	if (lHousing.value<= 0){
//		alert('In validation 36');
		lHousing.style.border = "2px solid red";
//		alert('In validation 37');
	    errExpense=1;
//	    alert('In validation 38');
	    housingErrorMessage = housingErrorMessage + "Expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lHousing.value)){
		//   alert("dddd");
		   lHousing.style.border = "2px solid red";
		//		alert('In validation 7');
				errExpense=1;
				housingErrorMessage = housingErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lHousing.value;
	//	console.log("num "+num);
		var n = Number(num).toFixed(2);
	//	console.log("n "+n);
		document.getElementById("idHousingAmount").value = n;
	//	console.log("n after "+document.getElementById("idHousingAmount").value);
	}
   }
	
	if (!hasValue(lHousingFrequency.value)){
		lHousingFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(housingErrorMessage)){
			housingErrorMessage = housingErrorMessage + ", please enter frequency";
		}
		else{
			housingErrorMessage = "Please enter frequency";
		}
	} else {
		 //supra
		if (lHousingFrequency.value != 12) {
			if (lHousingReferenceMonth.value == 13) {
				lHousingReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(housingErrorMessage)){
					housingErrorMessage = housingErrorMessage +", please select valid month";
				}
				else {
					housingErrorMessage = "Please select valid month";
				}
			}
		}
	}
	if (!hasValue(lHousingReferenceMonth.value)){
		lHousingReferenceMonth.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(housingErrorMessage)){
			housingErrorMessage = housingErrorMessage + ", please enter valid month";
		}
		else{
			housingErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lHousingYearTill.value)){
		lHousingYearTill.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(housingErrorMessage)){
			housingErrorMessage = housingErrorMessage + ", please enter valid year";
		}
		else{
			housingErrorMessage = "Please enter valid year";
		}
	}
  }
	 if (hasValue(housingErrorMessage)){
	    	console.log("Error message: " + housingErrorMessage);
	    	if(i==0){
	        	var row = table.insertRow(6);
	        	}
	        	if(i==1){
	        	var row = table.insertRow(7);	
	        	}
	        	if(i==2){
	            var row = table.insertRow(8);
	            }
	        	if(i==3){
	            var row = table.insertRow(9);
	            }
	        	if(i==4){
	            var row = table.insertRow(10);
	            }
	    	row.setAttribute("id", "idHousingErrorMessage");	
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = housingErrorMessage;
	    	i++;
	    }
	// console.log("n after rr "+document.getElementById("idHousingAmount").value);
	 
	// console.log("n after tt "+document.getElementById("idHousingAmount").value);

//	 alert('In expense TransportAmount '+errExpense);
	
 
//	 alert('In expense housing '+errExpense);
	//alert('In validation 93');
	//validate Communication
	 var communicationErrorMessage = "";
	 if (hasValue(lCommunication.value)){ 
     lCommunication.value = lCommunication.value.replace(/,/g, '');
	if (lCommunication.value<= 0){
	//	alert('In validation 46');
		lCommunication.style.border = "2px solid red";
	//	alert('In validation 47');
	    errExpense=1;
	//    alert('In validation 48');
	    communicationErrorMessage = communicationErrorMessage + "Expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lCommunication.value)){
	//	   alert("dddd");
		   lCommunication.style.border = "2px solid red";
	//			alert('In validation 7');
				errExpense=1;
				communicationErrorMessage = communicationErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lCommunication.value;
		var n = Number(num).toFixed(2);
		document.getElementById("idCommunicationAmount").value = n;
	    }
	   }
	
	if (!hasValue(lCommunicationFrequency.value)){
		lCommunicationFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(communicationErrorMessage)){
			communicationErrorMessage = communicationErrorMessage + ", please enter frequency";
		}
		else{
			communicationErrorMessage = "Please enter frequency";
		}
	} else {
		 //supra
		if (lCommunicationFrequency.value != 12) {
			if (lCommunicationReferenceMonth.value == 13) {
				lCommunicationReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(communicationErrorMessage)){
					communicationErrorMessage = communicationErrorMessage +", please select valid month";
				}
				else {
					communicationErrorMessage = "Please select valid month";
				}
			}
		}
	}
	if (!hasValue(lCommunicationReferenceMonth.value)){
		lCommunicationReferenceMonth.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(communicationErrorMessage)){
			communicationErrorMessage = communicationErrorMessage + ", please enter valid month";
		}
		else{
			communicationErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lidCommunicationYearTill.value)){
		lidCommunicationYearTill.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(communicationErrorMessage)){
			communicationErrorMessage = communicationErrorMessage + ", please enter valid year";
		}
		else{
			communicationErrorMessage = "Please enter valid year";
		}
	}
	}
	 if (hasValue(communicationErrorMessage)){
	    	console.log("Error message: " + communicationErrorMessage);
	    	if(i==0){
	    	var row = table.insertRow(7);
	    	}
	    	if(i==1){
	    	var row = table.insertRow(8);	
	    	}
	    	if(i==2){
	        var row = table.insertRow(9);
	        }
	    	if(i==3){
	        var row = table.insertRow(10);
	        }
	    	if(i==4){
	        var row = table.insertRow(11);
	        }
	    	if(i==5){
	        var row = table.insertRow(12);
	        }
	    	row.setAttribute("id", "idCommunicationErrorMessage");	
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = communicationErrorMessage;
	    	i++;
	    }
//	 alert('In expense CommunicationAmount '+errExpense);
	//validate Lifestyle
	  var lifestyleErrorMessage = "";
	 if (hasValue(lLifestyle.value)){ 
		 lLifestyle.value = lLifestyle.value.replace(/,/g, '');
	if (lLifestyle.value<= 0){
	//	alert('In validation 56');
		lLifestyle.style.border = "2px solid red";
	//	alert('In validation 57');
	    errExpense=1;
	//    alert('In validation 58');
	    lifestyleErrorMessage = lifestyleErrorMessage + "Expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lLifestyle.value)){
	//	   alert("dddd");
		   lLifestyle.style.border = "2px solid red";
		//		alert('In validation 7');
				errExpense=1;
				lifestyleErrorMessage = lifestyleErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lLifestyle.value;
		var n = Number(num).toFixed(2);
		document.getElementById("idEntertainmentAmount").value = n;
	     }
	   }
	
	if (!hasValue(lEntertainmentFrequency.value)){
		lEntertainmentFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(lifestyleErrorMessage)){
			lifestyleErrorMessage = lifestyleErrorMessage + ", please enter frequency";
		}
		else{
			otherErrorMessage = "Please enter frequency";
		}
	} else {
		 //supra
		if (lEntertainmentFrequency.value != 12) {
			if (lEntertainmentReferenceMonth.value == 13) {
				lEntertainmentReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(lifestyleErrorMessage)){
					lifestyleErrorMessage = lifestyleErrorMessage +", please select valid month";
				}
				else {
					lifestyleErrorMessage = "Please select valid month";
				}
			}
		}
	}
	if (!hasValue(lEntertainmentReferenceMonth.value)){
		lEntertainmentReferenceMonth.style.border = "2px solid red";
		errExpense=1;	
		if (hasValue(lifestyleErrorMessage)){
			lifestyleErrorMessage = lifestyleErrorMessage + ", please enter valid month";
		}
		else{
			lifestyleErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lEntertainmentYearTill.value)){
		lEntertainmentYearTill.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(lifestyleErrorMessage)){
			lifestyleErrorMessage = lifestyleErrorMessage + ", please enter valid year";
		}
		else{
			lifestyleErrorMessage = "Please enter valid year";
		}
	}
	}
	 if (hasValue(lifestyleErrorMessage)){
	    	console.log("Error message: " + lifestyleErrorMessage);
	    	if(i==0){
	    	var row = table.insertRow(8);
	    	}
	    	if(i==1){
	    	var row = table.insertRow(9);	
	    	}
	    	if(i==2){
	        var row = table.insertRow(10);
	        }
	    	if(i==3){
	        var row = table.insertRow(11);
	        }
	    	if(i==4){
	        var row = table.insertRow(12);
	        }
	    	if(i==5){
	        var row = table.insertRow(13);
	        }
	    	if(i==6){
	        var row = table.insertRow(14);
	        }
	    	row.setAttribute("id", "idLifestyleErrorMessage");	
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = lifestyleErrorMessage;
	    	i++;
	    }
//	 alert('In expense idEntertainmentAmount '+errExpense);
	//validate Apparel
	 var apparelErrorMessage = "";
	 if (hasValue(lApparel.value)){ 
		 lApparel.value = lApparel.value.replace(/,/g, '');
	if (lApparel.value<= 0){
	//	alert('In validation 66');
		lApparel.style.border = "2px solid red";
	//	alert('In validation 67');
	    errExpense=1;
	//    alert('In validation 68');
	    apparelErrorMessage = apparelErrorMessage + "Expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lApparel.value)){
		//   alert("dddd");
		   lApparel.style.border = "2px solid red";
		//		alert('In validation 7');
				errExpense=1;
				apparelErrorMessage = apparelErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lApparel.value;
		var n = Number(num).toFixed(2);
		document.getElementById("idApparelAmount").value = n;
	     }
	   }
	
	
	if (!hasValue(lApparelFrequency.value)){
		lApparelFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(apparelErrorMessage)){
			apparelErrorMessage = apparelErrorMessage + ", please enter frequency";
		}
		else{
			apparelErrorMessage = "Please enter frequency";
		}
	} else {
		 //supra
		if (lApparelFrequency.value != 12) {
			if (lApparelReferenceMonth.value == 13) {
				lApparelReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(apparelErrorMessage)){
					apparelErrorMessage = apparelErrorMessage +", please select valid month";
				}
				else {
					apparelErrorMessage = "Please select valid month";
				}
			}
		}
	}
	if (!hasValue(lApparelReferenceMonth.value)){
		lApparelReferenceMonth.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(apparelErrorMessage)){
			apparelErrorMessage = apparelErrorMessage + ", please enter valid month";
		}
		else{
			apparelErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lApparelYearTill.value)){
		lApparelYearTill.style.border = "2px solid red";
		errExpense=1;		
		if (hasValue(apparelErrorMessage)){
			apparelErrorMessage = apparelErrorMessage + ", please enter valid year";
		}
		else{
			apparelErrorMessage = "Please enter valid year";
		}
	}
	}

	 if (hasValue(apparelErrorMessage)){
	    	console.log("Error message: " + otherErrorMessage);
	    	if(i==0){
	    	var row = table.insertRow(9);
	    	}
	    	if(i==1){
	    	var row = table.insertRow(10);	
	    	}
	    	if(i==2){
	        var row = table.insertRow(11);
	        }
	    	if(i==3){
	        var row = table.insertRow(12);
	        }
	    	if(i==4){
	        var row = table.insertRow(13);
	        }
	    	if(i==5){
	        var row = table.insertRow(14);
	        }
	    	if(i==6){
	        var row = table.insertRow(15);
	        }
	    	if(i==7){
		    var row = table.insertRow(16);
		    }
	    	row.setAttribute("id", "idApparelErrorMessage");	
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = apparelErrorMessage;
	    	i++;
	    }
//	 alert('In expense idApparelAmount '+errExpense);
	//alert('In validation 91');
	
	//validate Tution
	 var tutionErrorMessage = "";
	 if (hasValue(lTution.value)){ 
	lTution.value = lTution.value.replace(/,/g, '');
	if (lTution.value<= 0){
//		alert('In validation 76');
		lTution.style.border = "2px solid red";
	//	alert('In validation 77');
	    errExpense=1;
	//    alert('In validation 78');
	    tutionErrorMessage = tutionErrorMessage + "Expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lTution.value)){
	//	   alert("dddd");
		   lTution.style.border = "2px solid red";
		//		alert('In validation 7');
				errExpense=1;
				tutionErrorMessage = tutionErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lTution.value;
	//	alert("tution value "+num);
		var n = Number(num).toFixed(2);
	//	alert("tution value "+n);
		document.getElementById("idTutionAmount").value = n;
	//	alert("n "+document.getElementById("idTutionAmount").value)
		
	}
   }
	
	
	if (!hasValue(lTutionFrequency.value)){
		lTutionFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(tutionErrorMessage)){
			tutionErrorMessage = tutionErrorMessage + ", please enter frequency";
		}
		else{
			tutionErrorMessage = "Please enter frequency";
		}
	} else {
		 //supra
		if (lTutionFrequency.value != 12) {
			if (lTutionReferenceMonth.value == 13) {
				lTutionReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(tutionErrorMessage)){
					tutionErrorMessage = tutionErrorMessage +", please select valid month";
				}
				else {
					tutionErrorMessage = "Please select valid month";
				}
			}
		}
	}
	if (!hasValue(lTutionReferenceMonth.value)){
		lTutionReferenceMonth.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(tutionErrorMessage)){
			tutionErrorMessage = tutionErrorMessage + ", please enter valid month";
		}
		else{
			tutionErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lTutionYearTill.value)){
		lTutionYearTill.style.border = "2px solid red";
		errExpense=1;	
		if (hasValue(tutionErrorMessage)){
			tutionErrorMessage = tutionErrorMessage + ", please enter valid year";
		}
		else{
			tutionErrorMessage = "Please enter valid year";
		}
	}
 }
	 if (hasValue(tutionErrorMessage)){
		 console.log("in tution i= "+i);
	    	console.log("Error message: " + tutionErrorMessage);
	    	if(i==0){
	    	var row = table.insertRow(10);
	    	}
	    	if(i==1){
	    	var row = table.insertRow(11);	
	    	}
	    	if(i==2){
	        var row = table.insertRow(12);
	        }
	    	if(i==3){
	        var row = table.insertRow(13);
	        }
	    	if(i==4){
	        var row = table.insertRow(14);
	        }
	    	if(i==5){
	        var row = table.insertRow(15);
	        }
	    	if(i==6){
	        var row = table.insertRow(16);
	        }
	    	if(i==7){
		    var row = table.insertRow(17);
		    }
	    	if(i==8){
			var row = table.insertRow(18);
			}
	    	row.setAttribute("id", "idTutionErrorMessage");	
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = tutionErrorMessage;
	    	i++;
	    }
	// alert('In expense idTutionAmount '+errExpense);
	//validate Healthcare
//	alert('In validation 111');
	 var healthcareErrorMessage = "";
	 if (hasValue(lHealthcare.value)){ 
	lHealthcare.value = lHealthcare.value.replace(/,/g, '');
	if (lHealthcare.value<= 0){
	//	alert('In validation 86');
		lHealthcare.style.border = "2px solid red";
	//	alert('In validation 87');
	    errExpense=1;
	//    alert('In validation 88');
	    healthcareErrorMessage = healthcareErrorMessage + "Expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lHealthcare.value)){
	//	   alert("dddd");
		   lHealthcare.style.border = "2px solid red";
	//			alert('In validation 7');
				errExpense=1;
				healthcareErrorMessage = healthcareErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lHealthcare.value;
	//	alert("healthcare value "+num);
		var n = Number(num).toFixed(2);
	//	alert("healthcare value "+n);
		document.getElementById("idHealthcareAmount").value = n;
	    }
	   }
	
	if (!hasValue(lHealthcareFrequency.value)){
		lHealthcareFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(healthcareErrorMessage)){
			healthcareErrorMessage = healthcareErrorMessage + ", please enter frequency";
		}
		else{
			healthcareErrorMessage = "Please enter frequency";
		}
	} else {
		 //supra
		if (lHealthcareFrequency.value != 12) {
			if (lHealthcareReferenceMonth.value == 13) {
				lHealthcareReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(healthcareErrorMessage)){
					healthcareErrorMessage = healthcareErrorMessage +", please select valid month";
				}
				else {
					healthcareErrorMessage = "Please select valid month";
				}
			}
		}
	}
	if (!hasValue(lHealthcareReferenceMonth.value)){
		lHealthcareReferenceMonth.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(healthcareErrorMessage)){
			healthcareErrorMessage = healthcareErrorMessage + ", please enter valid month";
		}
		else{
			healthcareErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lHealthcareYearTill.value)){
		lHealthcareYearTill.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(healthcareErrorMessage)){
			healthcareErrorMessage = healthcareErrorMessage + ", please enter valid year";
		}
		else{
			healthcareErrorMessage = "Please enter valid year";
		}
	}
	}

	 if (hasValue(healthcareErrorMessage)){
	    	console.log("Error message: " + healthcareErrorMessage);
	    	if(i==0){
	    	var row = table.insertRow(11);
	    	}
	    	if(i==1){
	    	var row = table.insertRow(12);	
	    	}
	    	if(i==2){
	        var row = table.insertRow(13);
	        }
	    	if(i==3){
	        var row = table.insertRow(14);
	        }
	    	if(i==4){
	        var row = table.insertRow(15);
	        }
	    	if(i==5){
	        var row = table.insertRow(16);
	        }
	    	if(i==6){
	        var row = table.insertRow(17);
	        }
	    	if(i==7){
		    var row = table.insertRow(18);
		    }
	    	if(i==8){
			var row = table.insertRow(19);
			}
	    	if(i==9){
			var row = table.insertRow(20);
			}
	    	row.setAttribute("id", "idHealthcareErrorMessage");	
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = healthcareErrorMessage;
	    	i++;
	    }
	// alert('In expense idHealthcareAmount '+errExpense);
	//alert('In validation 222');
	//validate Other Income
	 var otherErrorMessage = "";
	 if (hasValue(lOther.value)){ 
	lOther.value = lOther.value.replace(/,/g, '');
	if (lOther.value<= 0){
	//	alert('In validation 96');
		lOther.style.border = "2px solid red";
	//	alert('In validation 97');
	    errExpense=1;
	//    alert('In validation 98');
	    otherErrorMessage = otherErrorMessage + "expense cannot be negative";
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lOther.value)){
	//	   alert("dddd");
		   lOther.style.border = "2px solid red";
	//			alert('In validation 7');
				errExpense=1;
				otherErrorMessage = otherErrorMessage + "Expense should be a valid decimal";
	   }
	else{
		var num = lOther.value;
		var n = Number(num).toFixed(2);
		document.getElementById("idOtherExpenseAmount").value = n;
	}
	   lOtherExpenseFrequency.style.border = "1px solid #ccc";
		lOtherExpenseReferenceMonth.style.border = "1px solid #ccc";
		lOtherExpenseYearTill.style.border = "1px solid #ccc";
   }
	if (!hasValue(lOtherExpenseFrequency.value)){
		lOtherExpenseFrequency.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(otherErrorMessage)){
			otherErrorMessage = otherErrorMessage + ", please enter frequency";
		}
		else{
			otherErrorMessage = "Please enter frequency";
		}
	} else {
		 //supra
		if (lOtherExpenseFrequency.value != 12) {
			if (lOtherExpenseReferenceMonth.value == 13) {
				lOtherExpenseReferenceMonth.style.border = "2px solid red";
				errExpense=1;
				if (hasValue(otherErrorMessage)){
					otherErrorMessage = otherErrorMessage +", please select valid month";
				}
				else {
					otherErrorMessage = "Please select valid month";
				}
			}
		}
	}
	if (!hasValue(lOtherExpenseReferenceMonth.value)){
		lOtherExpenseReferenceMonth.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(otherErrorMessage)){
			otherErrorMessage = otherErrorMessage + ", please enter valid month";
		}
		else{
			otherErrorMessage = "Please enter valid month";
		}
	}
	if (!hasValue(lOtherExpenseYearTill.value)){
		lOtherExpenseYearTill.style.border = "2px solid red";
		errExpense=1;
		if (hasValue(otherErrorMessage)){
			otherErrorMessage = otherErrorMessage + ", please enter valid year";
		}
		else{
			otherErrorMessage = "Please enter valid year";
		}
	}
  }
	 if (hasValue(otherErrorMessage)){
	    	console.log("Error message: " + otherErrorMessage);
	    	if(i==0){
	    	var row = table.insertRow(12);
	    	}
	    	if(i==1){
	    	var row = table.insertRow(13);	
	    	}
	    	if(i==2){
	        var row = table.insertRow(14);
	        }
	    	if(i==3){
	        var row = table.insertRow(15);
	        }
	    	if(i==4){
	        var row = table.insertRow(16);
	        }
	    	if(i==5){
	        var row = table.insertRow(17);
	        }
	    	if(i==6){
	        var row = table.insertRow(18);
	        }
	    	if(i==7){
		    var row = table.insertRow(19);
		    }
	    	if(i==8){
			var row = table.insertRow(20);
			}
	    	if(i==9){
			var row = table.insertRow(21);
			}
	    	if(i==10){
			var row = table.insertRow(22);
			}
	    	row.setAttribute("id", "idOtherErrorMessage");	
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 5);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = otherErrorMessage;
	    	i++;
	    }
	// alert('In expense idOtherExpenseAmount '+errExpense);
//	alert('In validation 333');
	//validate Total Income
	if($("#idOptionT").is(":checked")){
		 errExpense=0;
	//	alert("fdasdfsdf");
	var totalErrorMessage = "";
	 if (hasValue(lTotal.value)){
	lTotal.value = lTotal.value.replace(/,/g, '');
	if (lTotal.value<= 0){
	//	alert('In validation 106');
		totalErrorMessage="Total expense can not be  negative!";
		lTotal.style.border = "2px solid red";
	//	alert('In validation 107');
	    errExpense=1;
	//    alert('In validation 108');
	}
	else{
	//	alert("cccc");
	   if(!isDecimal(lTotal.value)){
		//   alert("dddd");
		   lTotal.style.border = "2px solid red";
		   totalErrorMessage="Expense amount must be positive decimal";
		//		alert('In validation 72');
				errExpense=1;
	   }
	   
	else{
//		alert("total");
		var num = lTotal.value;
//		alert("total1");
		var n1=Number(num).toFixed(2);
//		alert("total2");
//		alert("n1 "+n1);
//		alert("total3");
		document.getElementById("idTotalExpenseAmount").value = n1;	
//		alert("total4");
//		alert("value "+document.getElementById("idTotalExpenseAmount").value);
//		alert("total5");
	  }
	}
		console.log("lTotalYearTill.value "+lTotalYearTill.value);
		if (!hasValue(lTotalYearTill.value)){
			lTotalYearTill.style.border = "2px solid red";
			errExpense=1;		
			if (hasValue(totalErrorMessage)){
				totalErrorMessage = totalErrorMessage + ", please enter valid year";
			}
			else{
				totalErrorMessage = "Please enter valid year";
			}
		}
	//	alert("total6s");
	    }
	
	 else{
	//	 alert("aaaa");
		 totalErrorMessage="Please enter total expense";	    	
		 lTotal.style.border = "2px solid red";
	     	//alert("please select at least one family member!");
		 errExpense=1;
	 }
	    console.log("totalErrorMessage "+totalErrorMessage);
	    if (hasValue(totalErrorMessage)){
	    	console.log("Error message: " + totalErrorMessage);
	    	var row = table1.insertRow(1);
	    	row.setAttribute("id", "idTotalErrorMessage");
	    	var cell1 = row.insertCell();
	    	cell1.setAttribute("colspan", 4);
	    	cell1.className = 'formentry-errmsg';
	    	cell1.innerHTML = totalErrorMessage;
	    	
	    }
}
	 // console.log("idHouseholdAmount "+$("#idHouseholdAmount").val());
    //  console.log("idHousingAmount "+$("#idHousingAmount").val());
//	alert('In expense TotalExpense '+errExpense);
	
	//alert('In expense TotalExpense '+errExpense);
	
//	alert('In validation 92');
	
	
	if (errExpense==1){
	//	alert("In error");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
	//	alert('In validation 11');
		$(window).scrollTop(0);
		return false;
	}else{
		//alert("correct");
		return true;
	}

}
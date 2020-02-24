function validateIncome(SELECTED_FAMILY_MEMBER_ID) {
//alert('In validation 1');

	
	
	var table = document.getElementById("idIncomeTable");
	var rowId = document.getElementById("idSalaryErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	
	
	 rowId = document.getElementById("idBonusErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	 rowId = document.getElementById("idBusinessErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	 rowId = document.getElementById("idProfessionalFeesErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	
	 rowId = document.getElementById("idRentErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	
	 rowId = document.getElementById("idPensionErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	
	 rowId = document.getElementById("idOtherErrorMessage");
	if (rowId != null) {
		rowId.parentNode.removeChild(rowId);
	}
	var table1 = document.getElementById("idIncomeTable1");
	var rowId1 = document.getElementById("idTotalErrorMessage");
	if (rowId1 != null) {
		rowId1.parentNode.removeChild(rowId1);
	}

	var lSalary = document.getElementById("idSalaryAmount");
	var lSalaryFrequency = document.getElementById("idSalaryFrequency");
	var lSalaryReferenceMonth = document.getElementById("idSalaryReferenceMonth");
	var lSalaryYearTill = document.getElementById("idSalaryYearTill");

	var lBonus = document.getElementById("idBonusAmount");
	var lBonusFrequency = document.getElementById("idBonusFrequency");
	var lBonusReferenceMonth = document.getElementById("idBonusReferenceMonth");
	var lBonusYearTill = document.getElementById("idBonusYearTill");
	
	var lBusiness = document.getElementById("idBusinessIncomeAmount");
	var lBusinessFrequency = document.getElementById("idBusinessIncomeFrequency");
	var lBusinessReferenceMonth = document.getElementById("idBusinessIncomeReferenceMonth");
	var lBusinessYearTill = document.getElementById("idBusinessIncomeYearTill");

	var lProfessionalFees = document.getElementById("idProfessionalFeesAmount");
	var lProfessionalFeesFrequency = document.getElementById("idProfessionalFeesFrequency");
	var lProfessionalFeesReferenceMonth = document.getElementById("idProfessionalFeesReferenceMonth");
	var lProfessionalFeesYearTill = document.getElementById("idProfessionalFeesYearTill");
	
	var lRent = document.getElementById("idRentalIncomeAmount");
	var lRentalFrequency = document.getElementById("idRentalIncomeFrequency");
	var lRentalReferenceMonth = document.getElementById("idRentalIncomeReferenceMonth");
	var lRentalYearTill = document.getElementById("idRentalIncomeYearTill");
	
	var lPension = document.getElementById("idPensionAmount");
	var lPensionFrequency = document.getElementById("idPensionFrequency");
	var lPensionReferenceMonth = document.getElementById("idPensionReferenceMonth");
	var lPensionYearTill = document.getElementById("idPensionYearTill");
	
	var lOther = document.getElementById("idOtherIncomeAmount");
	var lOtherFrequency = document.getElementById("idOtherIncomeFrequency");
	var lOtherReferenceMonth = document.getElementById("idOtherIncomeReferenceMonth");
	var lOtherYearTill = document.getElementById("idOtherIncomeYearTill");
	
	var lTotal = document.getElementById("idTotalIncomeAmount");
	var lTotalYearTill = document.getElementById("idTotalIncomeYearTill");
	//var member = document.getElementsByName('familyMember');
      var member=SELECTED_FAMILY_MEMBER_ID;
	//alert("member"+member);
//	alert('In validation 2');
	var errIncome=0;
//	alert('In validation 3');
    lSalary.style.border = "1px solid #ccc";
    lBonus.style.border = "1px solid #ccc";
    lBusiness.style.border = "1px solid #ccc";
    lProfessionalFees.style.border = "1px solid #ccc";
    lRent.style.border = "1px solid #ccc";
    lPension.style.border = "1px solid #ccc";
    lOther.style.border = "1px solid #ccc";
    lTotal.style.border = "1px solid #ccc";
    
    
    lSalaryFrequency.style.border = "1px solid #ccc";
	lSalaryReferenceMonth.style.border = "1px solid #ccc";
	lSalaryYearTill.style.border = "1px solid #ccc";
    
	lBonusFrequency.style.border = "1px solid #ccc";
	lBonusReferenceMonth.style.border = "1px solid #ccc";
	lBonusYearTill.style.border = "1px solid #ccc";
	
	
	lBusinessFrequency.style.border = "1px solid #ccc";
	lBusinessReferenceMonth.style.border = "1px solid #ccc";
	lBusinessYearTill.style.border = "1px solid #ccc";
	
	
	lProfessionalFeesFrequency.style.border = "1px solid #ccc";
	lProfessionalFeesReferenceMonth.style.border = "1px solid #ccc";
	lProfessionalFeesYearTill.style.border = "1px solid #ccc";
	
	
	lRentalFrequency.style.border = "1px solid #ccc";
	lRentalReferenceMonth.style.border = "1px solid #ccc";
	lRentalYearTill.style.border = "1px solid #ccc";
	
	
	 lPensionFrequency.style.border = "1px solid #ccc";
	 lPensionReferenceMonth.style.border = "1px solid #ccc";
	 lPensionYearTill.style.border = "1px solid #ccc";
	
	
	lOtherFrequency.style.border = "1px solid #ccc";
	lOtherReferenceMonth.style.border = "1px solid #ccc";
	lOtherYearTill.style.border = "1px solid #ccc";
	
	
	lTotalYearTill.style.border = "1px solid #ccc";
	
  //  document.getElementById('alertTotalIncome').innerHTML="";
    
//    alert('In validation 4');

    document.getElementById('alertform').innerHTML="";
	
 //   alert('In validation 5'+member.length);
 //   alert('errIncome1 '+errIncome);
    
   /* var isChecked = 0; // default is 0 
    for(var i=0; i<member.length;i++) { // go over all the radio buttons with name 'm'
      if(member[i].checked){
    	isChecked=1
	   }
    }
    if(isChecked==0){
    	// bootbox.alert("please select at least one family member!");
    	alert("please select at least one family member!");
		errIncome=1;
    }*/
    
    
//    alert('errIncome1 '+errIncome);
	//validate Salary
    
    if(document.getElementById("idOptionI").checked==true){
    	console.log("gggggggggggggggg");
        if((!hasValue(lSalary.value)) && (!hasValue(lBonus.value)) && (!hasValue(lBusiness.value)) && (!hasValue(lProfessionalFees.value)) &&
            (!hasValue(lRent.value)) && (!hasValue(lPension.value)) && (!hasValue(lOther.value))){
        	modalMessage("At least one Income head must be entered");
        	errIncome=1;
        	document.getElementById('alertform').innerHTML="";
             return false;
        	
        }
        }
    
 //   alert('errIncome a '+errIncome);

    var salaryErrorMessage = "";
    if (hasValue(lSalary.value)){    	
    	lSalary.value = lSalary.value.replace(/,/g, '');
		if (lSalary.value<= 0){
	//		alert('In validation 6');
			lSalary.style.border = "2px solid red";
		//	alert('In validation 7');
		    errIncome=1;
		//    alert('In validation 8');
		    salaryErrorMessage = salaryErrorMessage + "Income cannot be zero or negative";
		}
		else{
		//	alert("cccc");
		   if(!isDecimal(lSalary.value)){
	//		   alert("dddd");
				lSalary.style.border = "2px solid red";
		//			alert('In validation 7');
				    errIncome=1;
				    salaryErrorMessage = salaryErrorMessage + "Income should be a valid decimal";
		   }
		   else{
		//	alert("aaaa");
		//	var num = lSalary.value;
		//	alert("bbbb1");
			var num = lSalary.value;
		//	alert("bbbb2");
			var n = Number(num).toFixed(2);
		//	alert("bbbb3");
			document.getElementById("idSalaryAmount").value = n;
		    }
		}
    
		if (!hasValue(lSalaryFrequency.value)){
			lSalaryFrequency.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(salaryErrorMessage)){
				salaryErrorMessage = salaryErrorMessage + ", please enter frequency";
			}
			else{
				salaryErrorMessage = "Please enter frequency";
			}
		} else {
			//supra
			if (lSalaryFrequency.value != 12) {
				if (lSalaryReferenceMonth.value == 13) {
					lSalaryReferenceMonth.style.border = "2px solid red";
					errIncome=1;	
					if (hasValue(salaryErrorMessage)){
						salaryErrorMessage = salaryErrorMessage + ", please select valid month";
					}
					else{
						salaryErrorMessage = "Please select valid month";
					}
				}
			}
		}
		if (!hasValue(lSalaryReferenceMonth.value)){
			lSalaryReferenceMonth.style.border = "2px solid red";
			errIncome=1;			
			if (hasValue(salaryErrorMessage)){
				salaryErrorMessage = salaryErrorMessage + ", please enter valid month";
			}
			else{
				salaryErrorMessage = "Please enter valid month";
			}
		}
		if (!hasValue(lSalaryYearTill.value)){
			lSalaryYearTill.style.border = "2px solid red";
			errIncome=1;						
			if (hasValue(salaryErrorMessage)){
				salaryErrorMessage = salaryErrorMessage + ", please enter valid year";
			}
			else{
				salaryErrorMessage = "Please enter valid year";
			}
		}		
	}
  //  alert('errIncome salary '+errIncome);
    var i=0;
    if (hasValue(salaryErrorMessage)){
    	console.log("Error message: " + salaryErrorMessage);
    	var row = table.insertRow(2);
    	row.setAttribute("id", "idSalaryErrorMessage");
    	var cell1 = row.insertCell();
    	cell1.setAttribute("colspan", 5);
    	cell1.className = 'formentry-errmsg';
    	cell1.innerHTML = salaryErrorMessage;
    	i++;
    }
  //  alert('errIncome salary '+errIncome);
	//validate Bonus

    
    var bonusErrorMessage = "";
    if (hasValue(lBonus.value)){
    	lBonus.value = lBonus.value.replace(/,/g, '');
		if (lBonus.value<= 0){
	//		alert('In validation 66');
			lBonus.style.border = "2px solid red";
	//		alert('In validation 77');
		    errIncome=1;
		//    alert('In validation 88');
		    bonusErrorMessage = bonusErrorMessage + "Income cannot be zero or negative";
		}
		else{
			if(!isDecimal(lBonus.value)){
				lBonus.style.border = "2px solid red";
			//			alert('In validation 7');
					    errIncome=1;
					    bonusErrorMessage = bonusErrorMessage + "Income should be a valid decimal";
			}
		    else{
			//var num = lBonus.value;
			var num = lBonus.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idBonusAmount").value = n;
			
		    }
		}
	
		if (!hasValue(lBonusFrequency.value)){
			lBonusFrequency.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(bonusErrorMessage)){
				bonusErrorMessage = bonusErrorMessage + ", please enter frequency";
			}
			else{
				bonusErrorMessage = "Please enter frequency";
			}
		} else {
			//supra
			if (lBonusFrequency.value != 12) {
				if (lBonusReferenceMonth.value == 13) {
					lBonusReferenceMonth.style.border = "2px solid red";
					errIncome=1;	
					if (hasValue(bonusErrorMessage)){
						bonusErrorMessage = bonusErrorMessage + ", please select valid month";
					}
					else{
						bonusErrorMessage = "Please select valid month";
					}
				}
			}
		}
		if (!hasValue(lBonusReferenceMonth.value)){
			lBonusReferenceMonth.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(bonusErrorMessage)){
				bonusErrorMessage = bonusErrorMessage + ", please enter valid month";
			}
			else{
				bonusErrorMessage = "Please enter valid month";
			}
		}
		if (!hasValue(lBonusYearTill.value)){
			lBonusYearTill.style.border = "2px solid red";
			errIncome=1;	
			if (hasValue(bonusErrorMessage)){
				bonusErrorMessage = bonusErrorMessage + ", please enter valid year";
			}
			else{
				bonusErrorMessage = "Please enter valid year";
			}
		}		
	}
    if (hasValue(bonusErrorMessage)){
    	console.log("Error message: " + bonusErrorMessage);
    	if(i==0){
    	var row = table.insertRow(3);
    	}
    	if(i==1){
    	var row = table.insertRow(4);	
    	}
    	row.setAttribute("id", "idBonusErrorMessage");	
    	var cell1 = row.insertCell();
    	cell1.setAttribute("colspan", 5);
    	cell1.className = 'formentry-errmsg';
    	cell1.innerHTML = bonusErrorMessage;
    	i++;
    }
 //   alert('errIncome bonus '+errIncome);
	//validate Business
    var businessErrorMessage = "";
    if (hasValue(lBusiness.value)){
    	lBusiness.value = lBusiness.value.replace(/,/g, '');
		if (lBusiness.value<= 0){
	//		alert('In validation 666');
			lBusiness.style.border = "2px solid red";
	//		alert('In validation 777');
		    errIncome=1;
	//	    alert('In validation 888');
		    businessErrorMessage = businessErrorMessage + "Income cannot be zero or negative";
		}
		else{
			if(!isDecimal(lBusiness.value)){
				lBusiness.style.border = "2px solid red";
			//			alert('In validation 7');
					    errIncome=1;
					    businessErrorMessage = businessErrorMessage + "Income should be a valid decimal";
			}
		    else{
			//var num = lBusiness.value;
			var num = lBusiness.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idBusinessIncomeAmount").value = n;
		   }
		}
		if (!hasValue(lBusinessFrequency.value)){
			lBusinessFrequency.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(businessErrorMessage)){
				businessErrorMessage = businessErrorMessage + ", please enter frequency";
			}
			else{
				businessErrorMessage = "Please enter frequency";
			}
		} else {
			//supra
			if (lBusinessFrequency.value != 12) {
				if (lBusinessReferenceMonth.value == 13) {
					lBusinessReferenceMonth.style.border = "2px solid red";
					errIncome=1;	
					if (hasValue(businessErrorMessage)){
						businessErrorMessage = businessErrorMessage + ", please select valid month";
					}
					else{
						businessErrorMessage = "Please select valid month";
					}
				}
			}
		}
		if (!hasValue(lBusinessReferenceMonth.value)){
			lBusinessReferenceMonth.style.border = "2px solid red";
			errIncome=1;	
			if (hasValue(businessErrorMessage)){
				businessErrorMessage = businessErrorMessage + ", please enter valid month";
			}
			else{
				businessErrorMessage = "Please enter valid month";
			}
		}
		if (!hasValue(lBusinessYearTill.value)){
			lBusinessYearTill.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(businessErrorMessage)){
				businessErrorMessage = businessErrorMessage + ", please enter valid year";
			}
			else{
				businessErrorMessage = "Please enter valid year";
			}
		}		
	}
    if (hasValue(businessErrorMessage)){
    	console.log("Error message: " + businessErrorMessage);
    	if(i==0){
    	var row = table.insertRow(4);
    	}
    	if(i==1){
    	var row = table.insertRow(5);	
    	}
    	if(i==2){
        var row = table.insertRow(6);
        }
    	row.setAttribute("id", "idBusinessErrorMessage");	
    	var cell1 = row.insertCell();
    	cell1.setAttribute("colspan", 5);
    	cell1.className = 'formentry-errmsg';
    	cell1.innerHTML = businessErrorMessage;
    	i++;
    }
    //  alert('errIncome business '+errIncome);
    //validate Professional Fees
    var professionalFeesErrorMessage = "";
    if (hasValue(lProfessionalFees.value)){
    	lProfessionalFees.value = lProfessionalFees.value.replace(/,/g, '');
		if (lProfessionalFees.value<= 0){
		//	alert('In validation 6666');
			lProfessionalFees.style.border = "2px solid red";
	//		alert('In validation 7777');
		    errIncome=1;
		//    alert('In validation 8888');
		    professionalFeesErrorMessage = professionalFeesErrorMessage + "Income cannot be zero or negative";
		}
		else{
			if(!isDecimal(lProfessionalFees.value)){
				lProfessionalFees.style.border = "2px solid red";
		//				alert('In validation 7');
					    errIncome=1;
					    professionalFeesErrorMessage = professionalFeesErrorMessage + "Income should be a valid decimal";
			}
		    else{
			//var num = lProfessionalFees.value;
			var num = lProfessionalFees.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idProfessionalFeesAmount").value = n;
		    }
		}
		if (!hasValue(lProfessionalFeesFrequency.value)){
			lProfessionalFeesFrequency.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(professionalFeesErrorMessage)){
				professionalFeesErrorMessage = professionalFeesErrorMessage + ", please enter frequency";
			}
			else{
				professionalFeesErrorMessage = "Please enter frequency";
			}
		} else {
			//supra
			if (lProfessionalFeesFrequency.value != 12) {
				if (lProfessionalFeesReferenceMonth.value == 13) {
					lProfessionalFeesReferenceMonth.style.border = "2px solid red";
					errIncome=1;	
					if (hasValue(professionalFeesErrorMessage)){
						professionalFeesErrorMessage = professionalFeesErrorMessage + ", please select valid month";
					}
					else{
						professionalFeesErrorMessage = "Please select valid month";
					}
				}
			}
		}
		if (!hasValue(lProfessionalFeesReferenceMonth.value)){
			lProfessionalFeesReferenceMonth.style.border = "2px solid red";
			errIncome=1;	
			if (hasValue(professionalFeesErrorMessage)){
				professionalFeesErrorMessage = professionalFeesErrorMessage + ", please enter valid month";
			}
			else{
				professionalFeesErrorMessage = "Please enter valid month";
			}
		}
		if (!hasValue(lProfessionalFeesYearTill.value)){
			lProfessionalFeesYearTill.style.border = "2px solid red";
			errIncome=1;	
			if (hasValue(professionalFeesErrorMessage)){
				professionalFeesErrorMessage = professionalFeesErrorMessage + ", please enter valid year";
			}
			else{
				professionalFeesErrorMessage = "Please enter valid year";
			}
		}		
	}
    if (hasValue(professionalFeesErrorMessage)){
    	console.log("Error message: " + professionalFeesErrorMessage);
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
    	row.setAttribute("id", "idProfessionalFeesErrorMessage");	
    	var cell1 = row.insertCell();
    	cell1.setAttribute("colspan", 5);
    	cell1.className = 'formentry-errmsg';
    	cell1.innerHTML = professionalFeesErrorMessage;
    	i++;
    }
  //  alert('errIncome professional '+errIncome);
	//validate Rent
    var rentErrorMessage = "";
    if (hasValue(lRent.value)){
    	lRent.value = lRent.value.replace(/,/g, '');
		if (lRent.value<= 0){
	//		alert('In validation 66666');
			lRent.style.border = "2px solid red";
	//		alert('In validation 77777');
		    errIncome=1;
	//	    alert('In validation 88888');
		    rentErrorMessage = rentErrorMessage + "Income cannot be zero or negative";
		}
		else{
			if(!isDecimal(lRent.value)){
				lRent.style.border = "2px solid red";
			//			alert('In validation 7');
					    errIncome=1;
					    rentErrorMessage = rentErrorMessage + "Income should be a valid decimal";
			}
		    else{
			//var num = lRent.value;
			var num = lRent.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idRentalIncomeAmount").value = n;
		   }
		}
		if (!hasValue(lRentalFrequency.value)){
			lRentalFrequency.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(professionalFeesErrorMessage)){
				rentErrorMessage = rentErrorMessage + ", please enter frequency";
			}
			else{
				rentErrorMessage = "Please enter frequency";
			}
		} else {
			//supra
			if (lRentalFrequency.value != 12) {
				if (lRentalReferenceMonth.value == 13) {
					lRentalReferenceMonth.style.border = "2px solid red";
					errIncome=1;	
					if (hasValue(rentErrorMessage)){
						rentErrorMessage = rentErrorMessage + ", please select valid month";
					}
					else{
						rentErrorMessage = "Please select valid month";
					}
				}
			}
		}
		if (!hasValue(lRentalReferenceMonth.value)){
			lRentalReferenceMonth.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(rentErrorMessage)){
				rentErrorMessage = rentErrorMessage + ", please enter valid month";
			}
			else{
				rentErrorMessage = "Please enter valid month";
			}
		}
		if (!hasValue(lRentalYearTill.value)){
			lRentalYearTill.style.border = "2px solid red";
			errIncome=1;	
			if (hasValue(rentErrorMessage)){
				rentErrorMessage = rentErrorMessage + ", please enter valid year";
			}
			else{
				rentErrorMessage = "Please enter valid year";
			}
		}		
	}
    if (hasValue(rentErrorMessage)){
    	console.log("Error message: " + rentErrorMessage);
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
    	row.setAttribute("id", "idRentErrorMessage");	
    	var cell1 = row.insertCell();
    	cell1.setAttribute("colspan", 5);
    	cell1.className = 'formentry-errmsg';
    	cell1.innerHTML = rentErrorMessage;
    	i++;
    }
   
 //   alert('errIncome Rent '+errIncome);
	//validate Pension
    var pensionErrorMessage = "";
    if (hasValue(lPension.value)){
    	lPension.value = lPension.value.replace(/,/g, '');
		if (lPension.value<= 0){
		//	alert('In validation 16');
			lPension.style.border = "2px solid red";
	//		alert('In validation 17');
		    errIncome=1;
		//    alert('In validation 18');
		    pensionErrorMessage = pensionErrorMessage + "Income cannot be zero or negative";
		}
		else{
			if(!isDecimal(lPension.value)){
				lPension.style.border = "2px solid red";
			//			alert('In validation 7');
					    errIncome=1;
					    pensionErrorMessage = pensionErrorMessage + "Income should be a valid decimal";
			}
		    else{
			//var num = lPension.value;
			var num = lPension.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idPensionAmount").value = n;
		   }
		 }
		
	//	alert("ffff");
		if (!hasValue(lPensionFrequency.value)){
		//	alert("eeee");
			lPensionFrequency.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(pensionErrorMessage)){
				pensionErrorMessage = pensionErrorMessage + ", please enter frequency";
			}
			else{
				pensionErrorMessage = "Please enter frequency";
			}
		} else {
			//supra
			if (lPensionFrequency.value != 12) {
				if (lPensionReferenceMonth.value == 13) {
					lPensionReferenceMonth.style.border = "2px solid red";
					errIncome=1;	
					if (hasValue(pensionErrorMessage)){
						pensionErrorMessage = pensionErrorMessage + ", please select valid month";
					}
					else{
						pensionErrorMessage = "Please select valid month";
					}
				}
			}
		}
		if (!hasValue(lPensionReferenceMonth.value)){
		//	alert("dddd");
			lPensionReferenceMonth.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(pensionErrorMessage)){
				pensionErrorMessage = pensionErrorMessage + ", please enter valid month";
			}
			else{
				pensionErrorMessage = "Please enter valid month";
			}
		}
		if (!hasValue(lPensionYearTill.value)){
		//	alert("eeeee");
			lPensionYearTill.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(pensionErrorMessage)){
				pensionErrorMessage = pensionErrorMessage + ", please enter valid year";
			}
			else{
				pensionErrorMessage = "Please enter valid year";
			}
		}
		
	}
    if (hasValue(pensionErrorMessage)){
    	console.log("Error message: " + pensionErrorMessage);
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
    	row.setAttribute("id", "idPensionErrorMessage");	
    	var cell1 = row.insertCell();
    	cell1.setAttribute("colspan", 5);
    	cell1.className = 'formentry-errmsg';
    	cell1.innerHTML = pensionErrorMessage;
    	i++;
    }
  //  alert('errIncome pension '+errIncome);
	//validate Other Income
    var otherErrorMessage = "";
    if (hasValue( lOther.value)){
    	lOther.value = lOther.value.replace(/,/g, '');
		if (lOther.value<= 0){
	//		alert('In validation 26');
			lOther.style.border = "2px solid red";
	//		alert('In validation 27');
		    errIncome=1;
	//	    alert('In validation 28');
		    otherErrorMessage = otherErrorMessage + "Income cannot be zero or negative";
		}
		else{
			if(!isDecimal(lOther.value)){
				lOther.style.border = "2px solid red";
			//			alert('In validation 7');
					    errIncome=1;
					    otherErrorMessage = otherErrorMessage + "Income should be a valid decimal";
			}
		else{
			//var num = lOther.value;
			var num = lOther.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idOtherIncomeAmount").value = n;
		 }
		}
		//alert("aaaaaaaaaaa");
		if (!hasValue(lOtherFrequency.value)){
		//	alert("bbbbbbbbbb");
			lOtherFrequency.style.border = "2px solid red";
			errIncome=1;
			if (hasValue(otherErrorMessage)){
				otherErrorMessage = otherErrorMessage + ", please enter frequency";
			}
			else{
				otherErrorMessage = "Please enter frequency";
			}
		} else {
			//supra
			if (lOtherFrequency.value != 12) {
				if (lOtherReferenceMonth.value == 13) {
					lOtherReferenceMonth.style.border = "2px solid red";
					errIncome=1;	
					if (hasValue(otherErrorMessage)){
						otherErrorMessage = otherErrorMessage + ", please select valid month";
					}
					else{
						otherErrorMessage = "Please select valid month";
					}
				}
			}
		}
		if (!hasValue(lOtherReferenceMonth.value)){
		//	alert("cccccccc");
			lOtherReferenceMonth.style.border = "2px solid red";
			errIncome=1;	
			if (hasValue(otherErrorMessage)){
				otherErrorMessage = otherErrorMessage + ", please enter valid month";
			}
			else{
				otherErrorMessage = "Please enter valid month";
			}
		}
		if (!hasValue(lOtherYearTill.value)){
		//	alert("dddddddddd");
			lOtherYearTill.style.border = "2px solid red";
			errIncome=1;	
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
    	console.log("i: " + i);
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
    	row.setAttribute("id", "idOtherErrorMessage");	
    	var cell1 = row.insertCell();
    	cell1.setAttribute("colspan", 5);
    	cell1.className = 'formentry-errmsg';
    	cell1.innerHTML = otherErrorMessage;
    	i++;
    }
 //   alert('errIncome other b '+errIncome);
	//validate Total Income
    if($("#idOptionT").is(":checked")){
    	errIncome=0;
    var totalErrorMessage = "";
    if (hasValue(lTotal.value)){	
    	lTotal.value = lTotal.value.replace(/,/g, '');
		  if (lTotal.value<= 0){
	//		alert('In validation 36');
			totalErrorMessage=totalErrorMessage+"Total income can not be zero or negative";
			//document.getElementById('alertTotalIncome').innerHTML="Total family income can not be negative or zero!";
			lTotal.style.border = "2px solid red";
	//		alert('In validation 37');
		    errIncome=1;
	//	    alert('In validation 38');
		}
		  else{
				if(!isDecimal(lTotal.value)){
			//		alert("dddd");
					lTotal.style.border = "2px solid red";
					totalErrorMessage=totalErrorMessage+"Income amount must be positive decimal";
					//document.getElementById('alertTotalIncome').innerHTML="Income amount must be positive decimal";
					lTotal.style.border = "2px solid red";
			//				alert('In validation 71');
						    errIncome=1;
				}
		else{
			//var num = lTotal.value;
			var num = lTotal.value;
			var n = Number(num).toFixed(2);
			document.getElementById("idTotalIncomeAmount").value = n;
		}
	}	  

		if (!hasValue(lTotalYearTill.value)){
			lTotalYearTill.style.border = "2px solid red";
			if (hasValue(totalErrorMessage)){
				totalErrorMessage = totalErrorMessage + ", please enter valid year";
			}
			else{
				totalErrorMessage = "Please enter valid year";
			}
			errIncome=1;						
		}
	 }
	
    else{
    	//alert("aaaaa")
    	totalErrorMessage ="Please enter total Income";
    	//document.getElementById('alertTotalIncome').innerHTML="Please enter total Income";
    	lTotal.style.border = "2px solid red";
     	//alert("please select at least one family member!");
 		errIncome=1;
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
    
  
  //  alert("member "+member);
    if(member == 0){
    	bootbox.alert("please select at least one family member!");
		errIncome=1;
    }
 //   alert("errIncome "+errIncome);
   
 //  alert('errIncome '+errIncome);
//	alert('In validation 9');
	if (errIncome==1){
//		alert("In error");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
//		alert('In validation 11');
		$(window).scrollTop(0);
		return false;
	}else{
		return true;
	}

}
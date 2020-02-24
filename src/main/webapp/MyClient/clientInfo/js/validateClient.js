function validateClient(form) {
	//console.log("Inside Client Personal Prof validation");
	//return false;
	var lFirstName = document.getElementById("idFirstName");
	var lMiddleName = document.getElementById("idMiddleName");
	var lLastName = document.getElementById("idLastName");
	//var lGender = document.getElementsByName("gender");
	//var lGenderGroup = document.getElementById("idGenderRadioGroup");
	var lIdBdate = document.getElementById("idBdate");
	var lIdCalendar = document.getElementById("idDobCalendar");
	var lPan = document.getElementById("idPan");
	var lMaritalStatus = document.getElementById("idMStatus");
	var lOtherMaritalStatus = document.getElementById("idOtherMaritalStatus");
	var lAadhar = document.getElementById("idAadhar");
    var lQualification =document.getElementById('idEdQualification')
    var lOtherEdQualification =document.getElementById('idOtherEdQualification');
	var lCurrDesig = document.getElementById("idCurrDesignation");
	var lResidentType = document.getElementById("idResType");
	var lCountryCode = document.getElementById("idCountry");
	var lOtherResidentType = document.getElementById("idOtherResidentType");
    var lRetiredGroup = document.getElementById("idRetiredGroup");
	var lRetirementAge = document.getElementById("idRetirementAge");
	//var lLifeExpectancy = document.getElementById("idLifeExpectancy");
	//var lPanExists = document.getElementById("idPanExists");
	//var lAadharExists = document.getElementById("idAadharExists");
	var lEmploymentType=document.getElementById("idEmploymentType");
    var lOtherEmploymentType=document.getElementById("idOtherEmploymentType");
//	alert("Client Validation 1");
//	return false;
	
	var errClient = 0;

	
//	alert("Inside validation 2");
//	return false;

	lFirstName.style.border = "1px solid #ccc";	
	lMiddleName.style.border = "1px solid #ccc";	
	lLastName.style.border = "1px solid #ccc";	
	lIdBdate.style.border = "1px solid #ccc";
	lIdCalendar.style.border = "1px solid #ccc"; 
	lPan.style.border = "1px solid #ccc";
	lMaritalStatus.style.border = "1px solid #ccc";
	lOtherMaritalStatus.style.border = "1px solid #ccc";
	lAadhar.style.border = "1px solid #ccc"; 
	lCurrDesig.style.border = "1px solid #ccc";
	lResidentType.style.border = "1px solid #ccc";
	lCountryCode.style.border = "1px solid #ccc";
	lOtherResidentType.style.border = "1px solid #ccc";
	lRetiredGroup.style.border = "1px solid #ccc";
	lRetirementAge.style.border = "1px solid #ccc";
	lOtherEmploymentType.style.border = "1px solid #ccc";
	lOtherEdQualification.style.border = "1px solid #ccc";
	lEmploymentType.style.border = "1px solid #ccc";
//	alert("Inside validation 3");
//	return false;
	
	

	document.getElementById('alertfname').innerHTML="";
	document.getElementById('alertmname').innerHTML="";
	document.getElementById('alertlname').innerHTML="";
//	document.getElementById('alertgender').innerHTML="";
	document.getElementById('alertbdate').innerHTML="";
	document.getElementById('alertpan').innerHTML="";
	document.getElementById('alertmstatus').innerHTML="";
	document.getElementById('alertothermstatus').innerHTML="";
//	alert("t3");
	document.getElementById('alertaadhar').innerHTML="";
    document.getElementById('alertCurrDesig').innerHTML="";
	document.getElementById('alertrestype').innerHTML="";
	document.getElementById('alertCountry').innerHTML="";
	document.getElementById('alertOtherResType').innerHTML="";
//	alert("t0");
    document.getElementById('alertretirementage').innerHTML="";
    document.getElementById('alertothermstatus').innerHTML="";

    document.getElementById('alertfname').style.color = "red";
	document.getElementById('alertmname').style.color = "red";
	document.getElementById('alertlname').style.color = "red";
//	document.getElementById('alertgender').style.color = "red";
	document.getElementById('alertbdate').style.color = "red";
	document.getElementById('alertpan').style.color = "red";
	document.getElementById('alertmstatus').style.color = "red";
	document.getElementById('alertothermstatus').style.color = "red";
//	alert("t3");
	document.getElementById('alertaadhar').style.color = "red";
    document.getElementById('alertCurrDesig').style.color = "red";
	document.getElementById('alertrestype').style.color = "red";
	document.getElementById('alertCountry').style.color = "red";
	document.getElementById('alertOtherResType').style.color = "red";
//	alert("t0");
    document.getElementById('alertretirementage').style.color = "red";
    document.getElementById('alertothermstatus').style.color = "red";
    document.getElementById('alertOtherEmploymentType').style.color = "red";
    document.getElementById('alertOtherEdQualification').style.color = "red";
	
	
//	 alert("Inside validation 4-1");
//	 return false;
	
//  	Validate first name
	
	if (!hasValue(lFirstName.value)){
//	    alert("inside fname "+lFirstName.value);
		document.getElementById('alertfname').innerHTML="Please enter  first name";
		lFirstName.style.border = "2px solid red";
		errClient=1;
		}	
	else {
//		alert("inside fname: "+ lFirstName.value);
		var chkAlpha = isCharForName(lFirstName.value);
//		alert("inside fname after ischar");
		if (!chkAlpha){
			document.getElementById('alertfname').innerHTML="Please enter only alphabets for first name";
			lFirstName.style.border = "2px solid red";
			errClient=1;
		}
	}
//	Validate middle name
//	alert("After fname");
//	return false;
	if (hasValue(lMiddleName.value)){
		if (!isCharForName(lMiddleName.value)){
			document.getElementById('alertmname').innerHTML="Please enter only alphabets for middle name";
			lMiddleName.style.border = "2px solid red";
			errClient=1;
		}
	}
	
	if (!hasValue(lLastName.value)){
		//document.getElementById('alertlname').innerHTML="Please enter last name";
		//lLastName.style.border = "2px solid red";
		//errClient=1;
	} else {
		if (!isCharForName(lLastName.value)){	
			document.getElementById('alertlname').innerHTML="Please enter only alphabets for last name";
			lLastName.style.border = "2px solid red";
			errClient=1;
		}
	}
		
	
	if (!hasValue(lIdBdate.value)){
		document.getElementById('alertbdate').innerHTML="Please enter date of birth";
		lIdBdate.style.border = "2px solid red";
		lIdCalendar.style.border = "2px solid red";
		errClient=1;
	}else{
			if(!validateDate(lIdBdate.value)){
				document.getElementById('alertbdate').innerHTML="Birth Date is not a valid date";
				lIdBdate.style.border = "2px solid red";
				lIdCalendar.style.border = "2px solid red";
				errClient=1;
			}
		}
			
	
/*	else {
			var lDOBStr = lIdBdate.value;
			var day = lDOBStr.slice(0,2);
			var month = lDOBStr.slice(3,5);
			var year = lDOBStr.slice(6);
			var shortDate  = year.concat("-", month, "-", day);
			var lDOB = new Date(shortDate);
			if (birthdayIsFutureDate(lDOB)){
				document.getElementById('alertbdate').innerHTML="Date cannot be greater than current date";
				lIdBdate.style.border = "2px solid red";
				errBdate=1;				
			}

		var chkDate=-1;
		chkDate = isPastDate(lIdBdate.value);
		if (!chkDate){
			document.getElementById('alertbdate').innerHTML="Date cannot be greater than current date";
			lIdBdate.style.border = "2px solid red";
			errBdate=1;
		}
		
		var lDOBStr = lIdBdate.value;
//		alert("Dob String: " + lDOBStr);
		var day = lDOBStr.slice(0,2);
		var month = lDOBStr.slice(3,5);
		var year = lDOBStr.slice(6);
		var shortDate  = year.concat("-", month, "-", day);
//		alert ("Shortdate: " + shortDate);
		var lDOB = new Date(shortDate);
		var chkDate=0;
//		alert("Before validate date");
		chkDate=validateDOB(lDOB);
//		alert("After validate date");
			if (chkDate==0){
//				alert("Invalid date");
				document.getElementById('alertbdate').innerHTML="Please enter a valid date";
				lIdBdate.style.border = "2px solid red";
				lIdCalendar.style.border = "2px solid red";
				errBdate=1;
			}
			else {
				if (!isPastDate(lDOBStr)){
//					alert("Future Date");
					document.getElementById('alertbdate').innerHTML="Date of birth cannot be a future date";
					lIdBdate.style.border = "2px solid red";
					lIdCalendar.style.border = "2px solid red";
					errBdate=1;
				}
								
				else{
					if (chkDate==2){
//						alert("Minor");
						document.getElementById('alertbdate').innerHTML="Age is less than 18 years. Please enter guardian details.";
						lIdBdate.style.border = "2px solid red";
						lIdCalendar.style.border = "2px solid red";
						errBdate=1;
					}
				}
			    
			}
	}*/
	
//	alert("After bdate");

	//Validate Gender

	/*if ( ( form.gender[0].checked == false ) && ( form.gender[1].checked == false ) )
	{
		document.getElementById('alertgender').innerHTML="&nbsp;Please enter gender";
		//document.getElementById("idGender").style.border = "2px solid red";
		lGenderGroup.style.border = "2px solid red";
		lGenderGroup.style.borderRadius = "7px";
		errGender=1;
	}*/
 //  alert("After gender");
 // return false;
	//Validate Pan no.
	
	if (!hasValue(lPan.value)){
		document.getElementById('alertpan').innerHTML="Please enter a PAN no.";
		lPan.style.border = "2px solid red";
		errClient=1;
		}	
		else{
			var panVal = lPan.value.toUpperCase();
			var chkPan = validatePan(panVal);
			console.log("Pan: " + panVal);
			console.log("Check Pan: " + chkPan);
			if (!chkPan) {
				console.log("Please enter a valid PAN no. Valid format is AAAAA9999A.");
				document.getElementById('alertpan').innerHTML="Please enter a valid PAN no.";
				lPan.style.border = "2px solid red";
				errClient=1;
			}
			else {
				console.log("Pan value "+panVal);
				var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				var advisorID;
				//alert(selectedClientId)
				var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
				if(loggedUser != null){
					 advisorID = loggedUser.id;
				}
				
				console.log("selectedClientId "+selectedClientId);
				if(selectedClientId!=null){
					getClientDataAsyncFalse("GET", "", "clientMaster/existPan/"+panVal+"/"+selectedClientId, onSuccess);	
				}
				else{
					//getClientDataAsyncFalse("GET", "", "clientMaster/uniquePan?pan="+panVal, onSuccess);
					
					//======unique PAN check respective to a particular Advisor========//
					getClientDataAsyncFalse("GET", "", "clientMaster/uniquePanForFixedAdvisor?pan="+panVal+"&advisorID="+advisorID, onSuccess);
				}
				  function onSuccess(uniquePan){
						console.log("uniquePan "+ uniquePan);
						if (!(uniquePan)){
							console.log("not unique pan");
							document.getElementById('alertpan').innerHTML="PAN no. is not unique.";
							lPan.style.border = "2px solid red";
							errClient=1;			
						}

					}
				
			}
		}
	
	var valMaritalStatus = lMaritalStatus.options[lMaritalStatus.selectedIndex].value;
	
	if (valMaritalStatus == ""){
		document.getElementById('alertmstatus').innerHTML="Please enter marital status";
		lMaritalStatus.style.border = "2px solid red";
		errClient=1;
	} 
	else{
		if(valMaritalStatus == "3"){
		if (!hasValue(lOtherMaritalStatus.value)){
			document.getElementById('alertothermstatus').innerHTML="Please enter other status";
			lOtherMaritalStatus.style.border = "2px solid red";
			errClient=1;
		}
	}
		
  }
	
	if(lAadhar.value != " ") {
		if (hasValue(lAadhar.value)){
			
			var chkAadhar = validateAadhar(lAadhar.value);
			/*if (chkAadhar==1){
				document.getElementById('alertaadhar').innerHTML="Please enter digits 0-9 for Aadhar no.";
				lAadhar.style.border = "2px solid red";
				errClient=1;
			}*/
			/*else{*/
				if (chkAadhar==1){
					document.getElementById('alertaadhar').innerHTML="You have to enter 12 digits for Aadhar no.";
					lAadhar.style.border = "2px solid red";
					errClient=1;
				}
				else{
					if (Number(lAadhar.value)<=0){
						document.getElementById('alertaadhar').innerHTML="Aadhar number cannot be zero or negative";
						lAadhar.style.border = "2px solid red";
						errClient=1;												
					}
					else{
						//if (!testInputDataValue(lAadhar.value,integerNotStartingWithZero)){
						if (!isInteger(lAadhar.value)){
							document.getElementById('alertaadhar').innerHTML="Aadhar number has to be a valid integer";
							lAadhar.style.border = "2px solid red";
							errClient=1;						
						}
						else{
							var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
							var aadharVal = lAadhar.value;
							var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
							var advisorID = loggedUser.id;
							if(selectedClientId!=null){
								getClientDataAsyncFalse("GET", "", "clientMaster/existAadhar/"+selectedClientId+"/"+aadharVal, onSuccess1);	
							}else{
								//getClientDataAsyncFalse("GET", "", "clientMaster/uniqueAadhar?aadhar="+aadharVal, onSuccess1);
								
								//======unique AADHAR check respective to a particular Advisor========//
								getClientDataAsyncFalse("GET", "", "clientMaster/uniqueAadharForFixedAdvisor?aadhar="+aadharVal+"&advisorID="+advisorID, onSuccess1);
							}
							function onSuccess1(uniqueAadhar){
							//	alert("uniqueAadhar "+uniqueAadhar)
								if (!(uniqueAadhar)){
							//		alert("Aadhar is not unique in validateClient");
									document.getElementById('alertaadhar').innerHTML="Aadhar no. is not unique";
									lAadhar.style.border = "2px solid red";
									errClient=1;
								}
							}
						}
					}
				}
			}
		} else {
			//not required
		}
	
	
	
	/*}*/
	
//  alert("After aadhar errClient"+errClient);
//  return false;
	//Validate Resident Type
	//new
//	alert("wwww");
 
	var valResidentType = lResidentType.options[lResidentType.selectedIndex].value;
//	alert("valResidentType "+valResidentType);
	if (valResidentType == ""){
		document.getElementById('alertrestype').innerHTML="Please enter resident type";
		lResidentType.style.border = "2px solid red";
		errClient=1;
	}
	else{
		if(valResidentType == "5"){
			if (!hasValue(lOtherResidentType.value)){
				document.getElementById('alertOtherResType').innerHTML="Please enter other Resident type";
				lOtherResidentType.style.border = "2px solid red";
				errClient=1;
			}
		}
	}
	
	var country = lCountryCode.options[lCountryCode.selectedIndex].value;
	 if(country == ""){
		 //alert("new");
		 document.getElementById('alertCountry').innerHTML="Please enter country";
		 lCountryCode.style.border = "2px solid red";
		 errClient=1;
	 }
	
	var valHighestEducation = lQualification.options[lQualification.selectedIndex].value;
	if (valHighestEducation == "6"){
		if (!hasValue(lOtherEdQualification.value)){
			document.getElementById('alertOtherEdQualification').innerHTML="Please enter other Education Qualification";
			lOtherEdQualification.style.border = "2px solid red";
			errClient=1;
		}
	}
	
	var valEmploymentType = lEmploymentType.options[lEmploymentType.selectedIndex].value;
	if (valEmploymentType == "8"){
		if (!hasValue(lOtherEmploymentType.value)){
			document.getElementById('alertOtherEmploymentType').innerHTML="Please enter other Employment Type";
			lOtherEmploymentType.style.border = "2px solid red";
			errClient=1;
		}
	}
	
	//alert("After restype");
	//return false;
	//Validate Retired
	//alert("ret "+document.getElementById('idRetiredN').checked);
//	alert("ret "+document.getElementById('idRetiredY').checked);
	if ( !( document.getElementById('idRetiredN').checked ) && !( document.getElementById('idRetiredY').checked ) )
	{
		
		
		document.getElementById('alertretired').innerHTML="&nbsp;Please enter retired flag";
		//document.getElementById("idRetired").style.border = "2px solid red";
		lRetiredGroup.style.border = "2px solid red";
		lRetiredGroup.style.borderRadius = "7px";
		errClient=1;
	}
	else{
		//if ( form.retired[0].checked == true ){
		if(document.getElementById('idRetiredN').checked) {
			if (!hasValue(lRetirementAge.value)) {
				document.getElementById('alertretirementage').innerHTML="Please enter expected retirement age";
				lRetirementAge.style.border = "2px solid red";
				errClient=1;
				}	
			else{
				
				if (!isInteger(lRetirementAge.value)){
					document.getElementById('alertretirementage').innerHTML="Please enter a valid integer";
					lRetirementAge.style.border = "2px solid red";
					errClient=1;
				}
				else{
                   if(hasValue(lIdBdate.value)){
					currentage=calculateAgeYears(lIdBdate.value);
					console.log("currentage "+currentage);
					console.log("lRetirementAge "+lRetirementAge.value);
					if(lRetirementAge.value<=currentage){
					//	alert("Retirementage should be greater than current age");
						document.getElementById('alertretirementage').innerHTML="Retirement age should be greater than current age";
						lRetirementAge.style.border = "2px solid red";
						errClient=1;
					}
                   }
				}
				
			}
			
		}
		
	}
	
	if (hasValue(lCurrDesig.value)){
	//	alert(lCurrDesig.value);
		if (isNumeric(lCurrDesig.value)){
		//	alert("curr desig");
			document.getElementById('alertCurrDesig').innerHTML="Please enter only alphabets or alphanumeric";
			lCurrDesig.style.border = "2px solid red";
			errClient=1;
		}
	}
	
	
	  /*var valCountry = lCountryCode.options[lCountryCode.selectedIndex].value;
	    if (valCountry==""){
			
			document.getElementById('alertCountry').innerHTML="Please enter country";
			lCountryCode.style.border = "2px solid red";
			errClient=1;
		}	*/
	//alert("After retired");
	//return false;
	//Validate Life Expectancy
	
	/*if (!hasValue(lLifeExpectancy.value)){
		//alert("inside lfe expectancy");
		document.getElementById('alertlifeexpectancy').innerHTML="Please enter life expectancy";
		lLifeExpectancy.style.border = "2px solid red";
		errLifeExpectancy=1;
		}	*/

	console.log("before end"+errClient);
//	return false;
	if (errClient==1){
	//	alert("Error");	
//		alert("Error 2");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below."; 		
		$(window).scrollTop(0);
		return false;
	}
	else{
//		alert("Before autofill");
//		alert ("Gender: " + document.getElementById('idGenderM').value);
//		alert ("Marital status: " + document.getElementById('idMStatus').value);
		var lSalutation = document.getElementById("idSalutation");
		var tSalutation = autofillSalutation(document.getElementById('idGenderM'), document.getElementById('idMStatus'));
//		alert("Salutation: " + tSalutation);
		lSalutation.value = autofillSalutation(document.getElementById('idGenderM'), document.getElementById('idMStatus'));
		return true;
	}
}
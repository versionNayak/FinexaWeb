	function validateGuardian(form) {
//	alert("Inside guardian validation");
//	return false;
		var lFirstName = document.getElementById("idGFirstName");
		var lMiddleName = document.getElementById("idGMiddleName");
		var lLastName = document.getElementById("idGLastName");
		var lGender = document.getElementsByName("gGender");
		var lPan = document.getElementById("idGPan");
		/*var lMobile = "";
		var lEmail = "";*/
		var lResidentType = document.getElementById("idGResType");
		var lOtherResidentType=document.getElementById("idGOtherResidentType");
		var lIdBdate = document.getElementById("idGBdate");
		var lIdCalendar = document.getElementById("idGDobCalendar");
		var lidCountry=document.getElementById("idGCountry");
		/*var lCountryCode = "";*/
		var lAadharExists = document.getElementById("idAadharExists");
		var lAadhar = document.getElementById("idGAadhar");
		var lPanExists = document.getElementById("idPanExists");
		var lAadharExists = document.getElementById("idAadharExists");
		
		
		var lGenderGroup = document.getElementById("idGGenderRadioGroup");
	//	alert("Inside guardian validation 2 ");
	//	return false;
		var c = -1;
		var b = 0;

		var errFname=0;
		var errMname=0;
		var errLname=0;
		var errPan=0;
		var errResType=0;
		var errGender=0;
		/*var errMobile=0;
		var errEmail=0;*/
		var errBdate=0;
		/*var errCountryCode=0;*/
		var errAadhar = 0;
		var errResType=0;
		var errOtherResType=0;
		var errCountry=0;
		
		//alert("Inside guardian validation 3");
		//return false;

		lFirstName.style.border = "1px solid #ccc";
	//	alert("Fname");
	//	return false;
		lMiddleName.style.border = "1px solid #ccc";
	//	alert("Mname");
	//	return false;
		lLastName.style.border = "1px solid #ccc";
	//	alert("Lname");
	//	return false;
		document.getElementById("idGGender").style.border = "none";
		lGenderGroup.style.border = "1px solid #ccc";	
	//	alert("Gender");
	//	return false;
		lPan.style.border = "1px solid #ccc";
	//	alert("Pan");
	//	return false;
		/*lEmail.style.border = "1px solid #ccc";*/
	//	alert("Email");
	//	return false;
		/*lCountryCode.style.border = "1px solid #ccc";
		//alert("Country code");
		lMobile.style.border = "1px solid #ccc";*/
		//alert("Mobile");
		lResidentType.style.border = "1px solid #ccc";
		lOtherResidentType.style.border = "1px solid #ccc";
	//	alert("Restype");
	//	return false;
		lIdBdate.style.border = "1px solid #ccc";
	//	alert("Bdate");
	//	return false;
		lIdCalendar.style.border = "1px solid #ccc"; 
		lAadhar.style.border = "1px solid #ccc";
		lidCountry.style.border = "1px solid #ccc";
		


	//	alert("Inside guardian validation 4");
	//	return false;

		document.getElementById('alertfname').innerHTML="";
		document.getElementById('alertmname').innerHTML="";
		document.getElementById('alertlname').innerHTML="";
		document.getElementById('alertgender').innerHTML="";
		document.getElementById('alertpan').innerHTML="";
		/*document.getElementById('alertemail').innerHTML="";
		document.getElementById('alertmobile').innerHTML="";*/
		document.getElementById('alertrestype').innerHTML="";
		document.getElementById('alertbdate').innerHTML="";
		/*document.getElementById('alertcountrycode').innerHTML="";*/
		document.getElementById('alertaadhar').innerHTML="";
		document.getElementById('alertrestype').innerHTML="";
		document.getElementById('alertOtherResidentType').innerHTML="";
		document.getElementById('alertCountry').innerHTML="";
		
		
		
//alert("Inside guardian validation 5");
//return false;

		
		//Validate first name
		//alert("First name: " + lFirstName.value);
		if (!hasValue(lFirstName.value)){
			//alert("inside fname");
			document.getElementById('alertfname').innerHTML="Please enter  first name";
			lFirstName.style.border = "2px solid red";
			errFname=1;
			}	
		else {
//			alert("inside fname: "+ lFirstName.value);
			var chkAlpha = isCharForName(lFirstName.value);
			//alert("inside fname after ischar");
			if (!chkAlpha){
				//alert("inside fname 2");
				document.getElementById('alertfname').innerHTML="Please enter only alphabets for first name";
				lFirstName.style.border = "2px solid red";
				errFname=1;
			}
		}
		//Validate middle name
		//alert("After fname");
		
		if (hasValue(lMiddleName.value)){
			//alert("inside mname");
			if (!isCharForName(lMiddleName.value)){
				document.getElementById('alertmname').innerHTML="Please enter only alphabets for middle name";
				lMiddleName.style.border = "2px solid red";
				errMname=1;
			}
		}
	//	alert("After mname");
		//Validate last name
		
		if (hasValue(lLastName.value)){	
			//alert("inside lname");
			if (!isCharForName(lLastName.value)){
				document.getElementById('alertlname').innerHTML="Please enter only alphabets for last name";
				lLastName.style.border = "2px solid red";
				errLname=1;
			}
		}
	//	alert("After lname");
	//	return false;

		//Validate date of birth
//		alert("Dob lIdBdate: " + lIdBdate.value);
//		var lDOB = new Date(lIdBdate);
//		alert("Dob: " + lDOB);
//		var lDOBStr = lDOB.toString();
//		alert("Dob String: " + lDOBStr);
		//if((lDOBStr == null) || (lDOBStr == "")){
		if (!hasValue(lIdBdate.value)){
			//alert("inside bdate null");
			document.getElementById('alertbdate').innerHTML="Please enter date of birth";
			lIdBdate.style.border = "2px solid red";
			lIdCalendar.style.border = "2px solid red";
			errBdate=1;
			}	
		else {
			
			var lDOBStr = lIdBdate.value;
			console.log("lDOBStr "+lDOBStr);
//			alert("Dob String: " + lDOBStr);
		//	var day = lDOBStr.slice(0,2);
		//	var month = lDOBStr.slice(3,5);
		//	var year = lDOBStr.slice(6);
		//	var shortDate  = year.concat("-", month, "-", day);
//			alert ("Shortdate: " + shortDate);
			var lDOB = new Date(lDOBStr);
			var chkDate=0;
//			alert("Before validate date");
			chkDate=validateDOB(lDOBStr);
//			alert("After validate date");
				if (chkDate==0){
//					alert("Invalid date");
					document.getElementById('alertbdate').innerHTML="Please enter a valid date";
					lIdBdate.style.border = "2px solid red";
					lIdCalendar.style.border = "2px solid red";
					errBdate=1;
				}
				else {
					if (!isPastDate(lDOBStr)){
//						alert("Future Date");
						document.getElementById('alertbdate').innerHTML="Date of birth cannot be a future date";
						lIdBdate.style.border = "2px solid red";
						lIdCalendar.style.border = "2px solid red";
						errBdate=1;
					}
								
					else{
						if (chkDate==2){
//							alert("Minor");
							document.getElementById('alertbdate').innerHTML="Guardian age should not be less than 18.";
							lIdBdate.style.border = "2px solid red";
							lIdCalendar.style.border = "2px solid red";
							errBdate=1;
						}
					}
				    
				}
		}
		
	//	alert("After bdate");
	//	return false;

		//Validate Gender
		

		if ( ( document.getElementById('idGGenderF').checked.checked == false ) && ( document.getElementById('idGGenderM').checked.checked == false ) )
		{
			document.getElementById('alertgender').innerHTML="&nbsp;Please enter gender";
			lGenderGroup.style.border = "2px solid red";
			lGenderGroup.style.borderRadius = "7px";
			errGender=1;
		}
	//	alert("After gender");
	//	return false;

		//Validate Pan no.
		
		if (!hasValue(lPan.value)){
			document.getElementById('alertpan').innerHTML="Please enter a PAN no.";
			lPan.style.border = "2px solid red";
			errPan=1;
			}	
		else {
			var panVal = lPan.value;
			var chkPan = validatePan(panVal);
			if (!chkPan) {
				document.getElementById('alertpan').innerHTML="Please enter a valid PAN no. Valid format is AAAAA9999A.";
				lPan.style.border = "2px solid red";
				errPan=1;
			//	alert("errPan "+errPan);
			}
		}
		
		//alert("After pan");
	//	return false;

		
		//Validate Resident Type
		//alert('Resident Type: '+lResidentType.value);
		
		if (!hasValue(lResidentType.value)){
			document.getElementById('alertrestype').innerHTML="Please enter resident type";
			lResidentType.style.border = "2px solid red";
			errResType=1;
		}
		else
		{
		//	alert("5 "+lResidentType.value);
			if(lResidentType.value==5){
		//	alert("lResidentType.value "+lResidentType.value);
				if (!hasValue(lOtherResidentType.value)){
			document.getElementById('alertOtherResidentType').innerHTML="Please enter other resident type";
			lOtherResidentType.style.border = "2px solid red";
			errOtherResType=1;
			}			
		}
	}
		
		//alert("After restype");
		//return false;
		
		//Validate Aadhar Type
		
		if (!hasValue(lAadhar.value)){
			//alert("adhar null");
			/*document.getElementById('alertaadhar').innerHTML="Please enter Aadhar no.";
			lAadhar.style.border = "2px solid red";
			errAadhar=1;*/
		//	alert("errerrAadhar "+errAadhar);
		} 
		else {
			var chkAadhar = validateAadhar(lAadhar.value);
		//	alert("chkAadhar "+chkAadhar);
			if (chkAadhar==1){
				//alert("Plase enter only digits");
				document.getElementById('alertaadhar').innerHTML="Please enter digits 0-9 for Aadhar no.";
				lAadhar.style.border = "2px solid red";
				errAadhar=1;
			}
			else{			
				if (chkAadhar==2){
			//		alert("chkchkAadhar "+chkchkAadhar);	
					document.getElementById('alertaadhar').innerHTML="You have to enter 12 digits for Aadhar no.";
					lAadhar.style.border = "2px solid red";
					errAadhar=1;
				}
			}
		}
		if (!hasValue(lidCountry.value)){
			document.getElementById('alertCountry').innerHTML="Please enter country";
			lidCountry.style.border = "2px solid red";
			errCountry=1;
		}
		
	//	alert("before focus");
	//	return false;
		if (errFname==1){
			lFirstName.focus();
		}
		else{
		//	alert("11");
			if (errMname==1){
				lMiddleName.focus();
			}
			else{
		//		alert("12");
				if (errLname==1){
					lLastName.focus();
				}
				else{
			//		alert("13");
					if (errGender==1){
						document.getElementById("idGGender").focus();
					}
					else{
				//		alert("14");
						if (errBdate==1){
							lIdBdate.focus();
						}
						else{
					//		alert("15");
							if (errPan==1){
								lPan.focus();
							}
								else{
					//				alert("16");
									if (errAadhar==1){
										lAadhar.focus();
									}
									 else {
								//			     alert("20");
												if(errResType==1){
													  lResidentType.focus();
												          }
												      else{
												    	  if(errOtherResType==1){
												         lOtherResidentType.focus();	  
												    	  } else{
												    		  if(errCountry==1){
												    			  lidCountry.focus();  
												    		  }
												    	  }
												      }
											    }	
										   }
									}
								}
							}
						}
					}
				
			
		
		
	//	alert("After focus");
	//	return false;

		/* alert("errFname "+errFname);
		    alert("errMname "+errMname);
		    alert("errLname "+errLname);
		    alert("errGender "+errGender);
		    alert("errBdate "+errBdate);
		    alert("errPan "+errPan);
		    alert("errEmail "+errEmail);
		    alert("errMobile "+errMobile);
		    alert("errResType "+errResType);
		    alert("errCountryCode "+errCountryCode);
		    alert("errAadhar "+errAadhar);
		    alert("errcountry "+errcountry);*/
		    
		if (errFname==1 || errMname==1 || errLname==1 || errGender==1 || errBdate==1 || errPan==1  || errResType==1 || errAadhar==1|| errOtherResType==1 || errCountry==1){
		//	alert("Error");
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		}
		else{
		//	alert("Before autofill");
			var lSalutation = document.getElementById("idGSalutation");
		//	lSalutation.value = autofillSalutation(document.getElementById('idGGenderM'), 0);
			return true;
		}
}
	
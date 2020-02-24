function validateUserCreation(form){
    
	var lFirstName = document.getElementById("idFname");
	var lLastName = document.getElementById("idLname");
	var lEmail = document.getElementById("idEid");
	var lMobile = document.getElementById("idPhoneNo");
	var lCountry = document.getElementById("idCountry");
	var lState = document.getElementById("idState");
	var lCity = document.getElementById("idCity");
	var lEmployeeCode = document.getElementById("idEmployeeCode");
	var lRole = document.getElementById("idRole");
	var lIndOrg = document.getElementById("idOrg");
	var lOrgName = document.getElementById("idOrganisationName");
	var lDistCode = document.getElementById("idDisributorCode");	
						
    var errUser=0;

    lFirstName.style.border ="1px solid #ccc";
    lLastName.style.border ="1px solid #ccc";
    lEmail.style.border ="1px solid #ccc";
    lMobile.style.border ="1px solid #ccc";
    lCountry.style.border ="1px solid #ccc";
    lState.style.border ="1px solid #ccc";
    lCity.style.border ="1px solid #ccc";
    lEmployeeCode.style.border ="1px solid #ccc";
    lRole.style.border ="1px solid #ccc";
    lIndOrg.style.border ="1px solid #ccc";
    lOrgName.style.border ="1px solid #ccc";
    lDistCode.style.border ="1px solid #ccc";
    
    //alert("inside validation");
    
	document.getElementById('alertFirstName').innerHTML="";
	document.getElementById('alertLastName').innerHTML="";
	document.getElementById('alertEmail').innerHTML="";
	document.getElementById('alertMobile').innerHTML="";
	document.getElementById('alertCountry').innerHTML="";
	document.getElementById('alertState').innerHTML="";
	document.getElementById('alertCity').innerHTML="";
	document.getElementById('alertEmployeeCode').innerHTML="";
	document.getElementById('alertRole').innerHTML="";
	document.getElementById('alertOrg').innerHTML="";
	document.getElementById('alertOrgName').innerHTML="";
	document.getElementById('alertDistCode').innerHTML="";
	
	
	if ($('input[name="gender"]:checked').length == 0) {
		document.getElementById('alertgender').innerHTML="Please select a Gender";
		document.getElementById('idGenderM').style.border = "2px solid red";
		document.getElementById('idGenderF').style.border = "2px solid red";
		errUser=1; 
    }
	
	
	if (!hasValue(lDistCode.value)){
	    //alert("inside lDistCode "+lDistCode.value);
		document.getElementById('alertDistCode').innerHTML="Please enter Distributor Code";
		lDistCode.style.border = "2px solid red";
		errUser=1;
	} 
	
	
	if (!hasValue(lFirstName.value)){
	    //alert("inside fname "+lFirstName.value);
		document.getElementById('alertFirstName').innerHTML="Please enter first name";
		lFirstName.style.border = "2px solid red";
		errUser=1;
		}	
	else {
		//alert("inside fname: "+ lFirstName.value);
		var chkAlpha = isChar(lFirstName.value);
		if (!chkAlpha){
			document.getElementById('alertFirstName').innerHTML="Please enter only alphabets for first name";
			lFirstName.style.border = "2px solid red";
			errUser=1;
		}
	}
	//alert("errUser First-Name "+errUser);
	
	if (!hasValue(lLastName.value)){
	    //alert("inside lLastName "+lLastName.value);
		document.getElementById('alertLastName').innerHTML="Please enter last name";
		lLastName.style.border = "2px solid red";
		errUser=1;
		}	
	else {
		//alert("inside lLastName: "+ lLastName.value);
		var chkAlpha = isChar(lLastName.value);
		if (!chkAlpha){
			document.getElementById('alertLastName').innerHTML="Please enter only alphabets for last name";
			lLastName.style.border = "2px solid red";
			errUser=1;
		}
	}
	//alert("errUser Last-Name "+errUser);
	

	if (!hasValue(lEmail.value)){
		document.getElementById('alertEmail').innerHTML="Please enter email address";
		lEmail.style.border = "2px solid red";
		errUser=1;
		}	
	else {
		//alert("Email value "+lEmail.value);
		var emailVal = lEmail.value;
		console.log("emailVal: " +emailVal);
		var mode = sessionStorage.getItem("PAGE_MODE");
		
		var chkEmail = validateEmailAddress(emailVal);
		if (!chkEmail) {
			document.getElementById('alertEmail').innerHTML="Please enter a valid email address. Must be of the format abc@xyz.com";
			lEmail.style.border = "2px solid red";
			errUser=1;
		} else {
			if(mode=="ADD"){	
				getClientDataAsyncFalse("GET", "", "userCreation/uniqueEmail?email="+emailVal, onSuccess);
				function onSuccess(uniqueEmail){
					if (!(uniqueEmail)){
						//alert("Email is not unique in validateClientAddress");
						document.getElementById('alertEmail').innerHTML="Email address is not unique";
						lEmail.style.border = "2px solid red";
						errUser=1;
					}
				}
			} else{ 
				if (mode=="EDIT") {
					var selectedUserId = sessionStorage.getItem("SELECTED_USER_ID");
					if (selectedUserId!=null){
						getClientDataAsyncFalse("GET", "", "userCreation/existEmail/"+emailVal+"/"+selectedUserId, onExistSuccess);
					}
				}
			
			}
		}
	}
	//alert("errUser Email "+errUser);		
			
			function onExistSuccess(existEmail){
				if (!existEmail){
					//alert("Email is not unique in validateClientAddress");
					document.getElementById('alertEmail').innerHTML="Email address already exists";
					lEmail.style.border = "2px solid red";
					errUser=1;
				}
			}
		
	//alert("Mobile " + lMobile.value);
	if (!hasValue(lMobile.value)){
		document.getElementById('alertMobile').innerHTML="Please enter mobile no.";
		lMobile.style.border = "2px solid red";
		//alert("Mobile " + lMobile.value);
		errUser=1;
		}	
	else {
		var pMobile = lMobile.value;
		var mode = sessionStorage.getItem("PAGE_MODE");
		
		if (isInteger(pMobile) == false){
			document.getElementById('alertMobile').innerHTML="Please enter a valid integer.";
			lMobile.style.border = "2px solid red";
			errUser=1;
		} else {
			if (pMobile.length!=10){	
				document.getElementById('alertMobile').innerHTML="Must be of 10 digits.";
				lMobile.style.border = "2px solid red";
				errUser=1;
			} 
		}
		
			if(mode=="ADD"){
					getClientDataAsyncFalse("GET", "", "userCreation/uniqueMobile?mobile="+pMobile, onSuccess);
				}else{
					var selectedUserId = sessionStorage.getItem("SELECTED_USER_ID");
					if (selectedUserId!=null){
						getClientDataAsyncFalse("GET", "", "userCreation/"+selectedUserId+"/existMobile/"+pMobile, onSuccess);
					}
				}
				function onSuccess(uniqueMobile){
					if (!(uniqueMobile)){
						document.getElementById('alertMobile').innerHTML="Mobile number is not unique";
						lMobile.style.border = "2px solid red";
						errUser=1;
					 }
				}
	}
	//alert("errUser Mobile "+errUser);
	
	if (!hasValue(lState.value)){
	    //alert("inside State "+lState.value);
		document.getElementById('alertState').innerHTML="Please enter State Name";
		lState.style.border = "2px solid red";
		errUser=1;
		}	
	else {
		var chkAlpha = isChar(lState.value);
//		alert("inside fname after ischar");
		if (!chkAlpha){
			document.getElementById('alertState').innerHTML="Please enter only alphabets for State Name";
			lState.style.border = "2px solid red";
			errUser=1;
		}
	}
	//alert("errUser Staete "+errUser);
	
	if (!hasValue(lCity.value)){
	    //alert("inside lCity "+lCity.value);
		document.getElementById('alertCity').innerHTML="Please enter City Name";
		lCity.style.border = "2px solid red";
		errUser=1;
		}	
	else {
		//alert("inside lCity "+lCity.value);
		var chkAlpha = isChar(lCity.value);
//		alert("inside fname after ischar");
		if (!chkAlpha){
			document.getElementById('alertCity').innerHTML="Please enter only alphabets for City Name";
			lCity.style.border = "2px solid red";
			errUser=1;
		}
	}
	//alert("errUser City "+errUser);
	
	var userOrgType = lIndOrg.options[lIndOrg.selectedIndex].value;
	//alert("userOrgType "+userOrgType);
	if (userOrgType=="") {
		//alert("insideCountry");
		document.getElementById('alertOrg').innerHTML="Please specify Organization Type ";
		lIndOrg.style.border = "2px solid red";
		errUser=1;
	}
	//alert(userOrgType);
	if (userOrgType=="Y") {
		var orgFlag = false;
		if($("#idOrganisationName").attr('readonly') || $("#idOrganisationName").prop('readonly'))
		{
			orgFlag = true;
		}
		
	if(orgFlag == false){
		if (!hasValue(lOrgName.value)){
		    //alert("inside lOrgName "+lOrgName.value);
			document.getElementById('alertOrgName').innerHTML="Please enter Organization Name";
			lOrgName.style.border = "2px solid red";
			errUser=1;
			} 
	   }
	
	}
	//alert("errUser Organisation Name "+errUser);
	
	 var userCountry = lCountry.options[lCountry.selectedIndex].value;
   
		if (userCountry=="") {
			document.getElementById('alertCountry').innerHTML="Please specify Country Name";
			lCountry.style.border = "2px solid red";
			errUser=1;
		}
		//alert("errUser "+errUser);
		
		 var Role = lRole.options[lRole.selectedIndex].value;
	     
			if (Role=="") {
				document.getElementById('alertRole').innerHTML="Please specify  Role";
				lRole.style.border = "2px solid red";
				errUser=1;
			}
			//alert("errUser Country Name "+errUser);	
			
			if (lIndOrg.value == "Y") {
				if (!hasValue(lEmployeeCode.value)){
				    //alert("inside lEmployeeCode "+lEmployeeCode.value);
					document.getElementById('alertEmployeeCode').innerHTML="Please enter  Employee Code";
					lEmployeeCode.style.border = "2px solid red";
					errUser=1;
					}else{
						
						var employeeCodeVal = lEmployeeCode.value;
					    var mode = sessionStorage.getItem("PAGE_MODE");
					   
					if(mode=="ADD"){
						//getClientDataAsyncFalse("GET", "", "userCreation/uniqueEmployee?employeeCd="+employeeCodeVal, onSuccess);
					}/*else{
						var selectedUserId = sessionStorage.getItem("SELECTED_USER_ID");
						if (selectedUserId!=null){
							getClientDataAsyncFalse("GET", "", "userCreation/"+selectedUserId+"/existEmployee/"+employeeCodeVal, onSuccess);
						}
					}*/
					
					function onSuccess(uniqueEmployee){
						if (!(uniqueEmployee)){
							//alert("Email is not unique in validateClientAddress");
							document.getElementById('alertEmployeeCode').innerHTML="Employee Code is not unique";
							lEmployeeCode.style.border = "2px solid red";
							errUser=1;
						}	
					 }
					
				}
			}
		
	//alert("errUser Employee Code"+errUser);
	//console.log("Error :  " +errUser );		
	if (errUser==1){
		document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
		/***** Scroll added - Arnab *****/
		$(window).scrollTop(0);
		return false;
	}else{
		/***** alertForm added - Arnab *****/
		document.getElementById('alertForm').innerHTML="";
		return true;
	}

}

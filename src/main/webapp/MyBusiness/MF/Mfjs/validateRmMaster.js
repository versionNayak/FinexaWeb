function validateRmMasterForm(form){
	var errorRmMaster = 0;
	
	/*********** validate Name **********/
	var lRmName = document.getElementById("idRmName");
	var rmName = lRmName.value;
	lRmName.style.border = "1px solid #ccc";
	document.getElementById('alertRmName').innerHTML="";
	if(!hasValue(rmName)){
		document.getElementById('alertRmName').innerHTML="Please enter RM Name ";
		lRmName.style.border = "2px solid red";
		errorRmMaster = 1;
	}
	
	var mode = sessionStorage.getItem("PAGE_MODE");
	var selectedRMId = sessionStorage.getItem("SELECTED_RM_MASTER_ID");
	var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	
	/*********** validate Email ID **********/
	var lRmEmailID = document.getElementById("idRmEmailID");
	var rmEmailID = lRmEmailID.value;
	lRmEmailID.style.border = "1px solid #ccc";
	document.getElementById('alertRmEmailID').innerHTML="";
	if(!hasValue(rmEmailID)){
		document.getElementById('alertRmEmailID').innerHTML="Please enter Email ID ";
		lRmEmailID.style.border = "2px solid red";
		errorRmMaster = 1;
	} else {
		
		if(!validateEmailAddress(rmEmailID)) {
			document.getElementById('alertRmEmailID').innerHTML="Please enter correct Email ID ";
			lRmEmailID.style.border = "2px solid red";
			errorRmMaster = 1;
		} else {
			
			if(mode=="ADD"){
	
				getClientDataAsyncFalse("GET", "", "checkUniqueEmailForAdvisorMaster/"+rmEmailID+"/"+loggedInUser.id, onEmailCheckSuccess);
			} else {
				
				getClientDataAsyncFalse("GET", "", "checkExistsEmailForAdvisorMaster/" +rmEmailID+"/"+ loggedInUser.id + "/"+selectedRMId , onEmailCheckSuccess);
			}
			
			function onEmailCheckSuccess(flag) {
				if(flag==false) {
					document.getElementById('alertRmEmailID').innerHTML="Email ID already exists, please provide unique one.";
					lRmEmailID.style.border = "2px solid red";
					errorRmMaster = 1;
				}
			}
			
		}
		
	}
	
	/*********** validate Employee Code **********/
	var lRmEmployeeCode = document.getElementById("idRmEmployeeCode");
	var rmEmployeeCode = lRmEmployeeCode.value;
	lRmEmployeeCode.style.border = "1px solid #ccc";
	document.getElementById('alertRmEmployeeCode').innerHTML="";
	if(!hasValue(rmEmployeeCode)){
		document.getElementById('alertRmEmployeeCode').innerHTML="Please enter Employee Code ";
		lRmEmployeeCode.style.border = "2px solid red";
		errorRmMaster = 1;
	}else{
		
		if(mode=="ADD"){
			getClientDataAsyncFalse("GET", "", "checkUniqueEmpCodeForAdvisorMaster/"+loggedInUser.id+"/"+rmEmployeeCode, onSuccess);
		
		}else{
			getClientDataAsyncFalse("GET", "", "checkExistingEmpCodeForAdvisorMaster/"+loggedInUser.id+"/"+selectedRMId+"/"+rmEmployeeCode, onSuccess);
		}
		

		function onSuccess(flag){
			if (flag==false){
				//alert("Email is not unique in validateClientAddress");
				document.getElementById('alertRmEmployeeCode').innerHTML="Employee Code is not unique";
				lRmEmployeeCode.style.border = "2px solid red";
				errorRmMaster=1;
			}	
		 }
		
	}
	
	
	/*********** validate Mobile Number **********/
	var lRmMobileNumber = document.getElementById("idRmMobileNumber");
	var rmMobileNumber = lRmMobileNumber.value;
	lRmMobileNumber.style.border = "1px solid #ccc";
	document.getElementById('alertRmMobileNumber').innerHTML="";
	if(!hasValue(rmMobileNumber)){
		document.getElementById('alertRmMobileNumber').innerHTML="Please enter Mobile Number";
		lRmMobileNumber.style.border = "2px solid red";
		errorRmMaster = 1;
	} else {
		
		if (!isNumeric(rmMobileNumber)) {
			document.getElementById('alertRmMobileNumber').innerHTML="Please enter a valid integer for Mobile Number";
			lRmMobileNumber.style.border = "2px solid red";
			errorRmMaster = 1;
		} else if ( (rmMobileNumber.length) < 10 || (rmMobileNumber.length) > 11 ) {
			document.getElementById('alertRmMobileNumber').innerHTML="10 to 11 digits are allowed for Mobile Number. Please Check and enter accordingly";
			lRmMobileNumber.style.border = "2px solid red";
			errorRmMaster = 1;
		}
		
	else{
		if(mode=="ADD"){
			getClientDataAsyncFalse("GET", "", "checkUniqueMobileNumber/"+rmMobileNumber, onSuccess);
		}else{
			getClientDataAsyncFalse("GET", "", "checkExistingMobileNumber/"+selectedRMId+"/"+rmMobileNumber, onSuccess);
		}
		

		function onSuccess(flag){
			if (flag==false){
				//alert("Email is not unique in validateClientAddress");
				document.getElementById('alertRmMobileNumber').innerHTML="Mobile number is not unique";
				lRmMobileNumber.style.border = "2px solid red";
				errorRmMaster=1;
			}	
		 }
		}
	}
		
	
	
	/*********** validate Branch **********/
	var lRmBranch = document.getElementById("idRmBranch");
	var rmBranch = lRmBranch.value;
	lRmBranch.style.border = "1px solid #ccc";
	document.getElementById('alertRmBranch').innerHTML="";
	if(!hasValue(rmBranch)){
		document.getElementById('alertRmBranch').innerHTML="Please enter Branch";
		lRmBranch.style.border = "2px solid red";
		errorRmMaster = 1;
	}
	
	
	
	
	if (errorRmMaster == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
	
	
}

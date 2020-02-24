function validateBranchMasterForm(form){
	var errorBranchMaster = 0;
	
	/*********** validate Name **********/
	var lBranchName = document.getElementById("idBranchName");
	var branchName = lBranchName.value;
	var selectedBranchID = sessionStorage.getItem("SELECTED_BR_MASTER_ID");
	lBranchName.style.border = "1px solid #ccc";
	document.getElementById('alertBranchName').innerHTML="";
	if(!hasValue(branchName)){
		document.getElementById('alertBranchName').innerHTML="Please enter Branch Name ";
		lBranchName.style.border = "2px solid red";
		errorBranchMaster = 1;
	}
	
	/*********** validate Branch Code **********/
	var lBranchCode = document.getElementById("idBranchCode");
	var branchCode = lBranchCode.value;
	lBranchCode.style.border = "1px solid #ccc";
	document.getElementById('alertBranchCode').innerHTML="";
	if(!hasValue(branchCode)){
		document.getElementById('alertBranchCode').innerHTML="Please enter Branch Code ";
		lBranchCode.style.border = "2px solid red";
		errorBranchMaster = 1;
	}else{
		
		if(pageMode=="ADD"){
			var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
			getClientDataAsyncFalse("GET", "", "checkUniqueBranchCode/"+branchCode+"/"+loggedUser.id, onSuccess);
		
		}else{
		getClientDataAsyncFalse("GET", "", "checkExistingBranchCode/"+selectedBranchID+"/"+branchCode, onSuccess);
		}
		

		function onSuccess(flag){
			if (flag==false){
				//alert("Email is not unique in validateClientAddress");
				document.getElementById('alertBranchCode').innerHTML="Branch Code is not unique";
				lBranchCode.style.border = "2px solid red";
				errorBranchMaster=1;
			}	
		 }
		
	}
	
	/*********** validate Branch Address **********/
	var lBranchAddress = document.getElementById("idBranchAddress");
	var branchAddress = lBranchAddress.value;
	lBranchAddress.style.border = "1px solid #ccc";
	document.getElementById('alertBranchAddress').innerHTML="";
	if(!hasValue(branchAddress)){
		document.getElementById('alertBranchAddress').innerHTML="Please enter Branch Address ";
		lBranchAddress.style.border = "2px solid red";
		errorBranchMaster = 1;
	}
	
	/*********** validate Branch City **********/
	var lBranchCity = document.getElementById("idBranchCity");
	var branchCity = lBranchCity.value;
	lBranchCity.style.border = "1px solid #ccc";
	document.getElementById('alertBranchCity').innerHTML="";
	if(!hasValue(branchCity)){
		document.getElementById('alertBranchCity').innerHTML="Please enter Branch City ";
		lBranchCity.style.border = "2px solid red";
		errorBranchMaster = 1;
	}
	
	/*********** validate Branch PinCode **********/
	var lBranchPinCode = document.getElementById("idBranchPinCode");
	var branchPinCode = lBranchPinCode.value;
	lBranchPinCode.style.border = "1px solid #ccc";
	document.getElementById('alertBranchPinCode').innerHTML="";
	if(!hasValue(branchPinCode)){
		document.getElementById('alertBranchPinCode').innerHTML="Please enter Branch Pincode ";
		lBranchPinCode.style.border = "2px solid red";
		errorBranchMaster = 1;
	} else {
		if(!isNumeric(branchPinCode)){
			document.getElementById('alertBranchPinCode').innerHTML="Please enter a valid integer for Branch Pincode ";
			lBranchPinCode.style.border = "2px solid red";
			errorBranchMaster = 1;
		} else if((branchPinCode.length < 6) || (branchPinCode.length > 6)) {
			document.getElementById('alertBranchPinCode').innerHTML="Please enter 6 digits for Branch Pincode ";
			lBranchPinCode.style.border = "2px solid red";
			errorBranchMaster = 1;
		}
	}
	
	/*********** validate Branch State **********/
	var lBranchState = document.getElementById("idBranchState");
	var branchState = lBranchState.value;
	lBranchState.style.border = "1px solid #ccc";
	document.getElementById('alertBranchState').innerHTML="";
	if(!hasValue(branchState)){
		document.getElementById('alertBranchState').innerHTML="Please select Branch State ";
		lBranchState.style.border = "2px solid red";
		errorBranchMaster = 1;
	}
	
	/*********** validate Branch Phone Number **********/
	var lBranchPhoneNo = document.getElementById("idBranchPhoneNo");
	var branchPhoneNo = lBranchPhoneNo.value;
	lBranchPhoneNo.style.border = "1px solid #ccc";
	document.getElementById('alertBranchPhoneNo').innerHTML="";
	if(!hasValue(branchPhoneNo)){
		document.getElementById('alertBranchPhoneNo').innerHTML="Please enter Branch Phone Number";
		lBranchPhoneNo.style.border = "2px solid red";
		errorBranchMaster = 1;
	} else if (!isNumeric(branchPhoneNo)) {
			document.getElementById('alertBranchPhoneNo').innerHTML="Please enter a valid integer for Phone Number";
			lBranchPhoneNo.style.border = "2px solid red";
			errorBranchMaster = 1;
		} else if (  (branchPhoneNo.length) > 10 ) {
			document.getElementById('alertBranchPhoneNo').innerHTML="Maximum 10 digit is allowed for Phone Number.Please Check and enter accordingly";
			lBranchPhoneNo.style.border = "2px solid red";
			errorBranchMaster = 1;
		}else{
			
			if(pageMode=="ADD"){
				getClientDataAsyncFalse("GET", "", "checkUniquePhoneNumber/"+branchPhoneNo, onPhoneNumberSuccess);
			
			}else{
			getClientDataAsyncFalse("GET", "", "checkExistingPhoneNumber/"+selectedBranchID+"/"+branchPhoneNo, onPhoneNumberSuccess);
			}
			

			function onPhoneNumberSuccess(flag){
				if (flag==false){
					//alert("Email is not unique in validateClientAddress");
					document.getElementById('alertBranchPhoneNo').innerHTML="Branch Mobile Number is not unique";
					lBranchPhoneNo.style.border = "2px solid red";
					errorBranchMaster=1;
				}	
			 }
			
		}
	
	/*********** validate Branch Mobile Number **********/
	var lBranchMobileNo = document.getElementById("idBranchMobileNo");
	var branchMobileNo = lBranchMobileNo.value;
	lBranchMobileNo.style.border = "1px solid #ccc";
	document.getElementById('alertBranchMobileNo').innerHTML="";
	if(!hasValue(branchMobileNo)){
		document.getElementById('alertBranchMobileNo').innerHTML="Please enter Branch Mobile Number";
		lBranchMobileNo.style.border = "2px solid red";
		errorBranchMaster = 1;
	} else if (!isNumeric(branchMobileNo)) {
			document.getElementById('alertBranchMobileNo').innerHTML="Please enter a valid integer for Mobile Number";
			lBranchMobileNo.style.border = "2px solid red";
			errorBranchMaster = 1;
		} else if ( (branchMobileNo.length) < 10 || (branchMobileNo.length) > 11 ) {
			document.getElementById('alertBranchMobileNo').innerHTML="10 to 11 digits are allowed for Mobile Number. Please Check and enter accordingly";
			lBranchMobileNo.style.border = "2px solid red";
			errorBranchMaster = 1;
		}else{
			
			if(pageMode=="ADD"){
				getClientDataAsyncFalse("GET", "", "checkUniquePhoneNumber/"+branchMobileNo, onMobileNumberSuccess);
			
			}else{
			getClientDataAsyncFalse("GET", "", "checkExistingPhoneNumber/"+selectedBranchID+"/"+branchMobileNo, onMobileNumberSuccess);
			}
			

			function onMobileNumberSuccess(flag){
				if (flag==false){
					//alert("Email is not unique in validateClientAddress");
					document.getElementById('alertBranchMobileNo').innerHTML="Branch Mobile Number is not unique";
					lBranchMobileNo.style.border = "2px solid red";
					errorBranchMaster=1;
				}	
			 }
			
		}
		
	
	
	/*********** validate Branch Head **********/
	var lBranchHead = document.getElementById("idBranchHead");
	var branchHead = lBranchHead.value;
	lBranchHead.style.border = "1px solid #ccc";
	document.getElementById('alertBranchHead').innerHTML="";
	if(!hasValue(branchHead)){
		document.getElementById('alertBranchHead').innerHTML="Please enter Branch Head";
		lBranchHead.style.border = "2px solid red";
		errorBranchMaster = 1;
	}
	
	
	
	
	if (errorBranchMaster == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
	
	
}

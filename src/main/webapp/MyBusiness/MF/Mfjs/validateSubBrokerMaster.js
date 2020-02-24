
function validateSubBrokerMaster(form){
    var errorSubBrokerMaster = 0;
    //This is comment Only
   
    /*********** validate Name **********/
    var lSbName = document.getElementById("idSbName");
    var sbName = lSbName.value;
    lSbName.style.border = "1px solid #ccc";
    document.getElementById('alertSbName').innerHTML="";
    if(!hasValue(sbName)){
        document.getElementById('alertSbName').innerHTML="Please enter Sub-Broker Name ";
        lSbName.style.border = "2px solid red";
        errorSubBrokerMaster = 1;
    }
   
    var mode = sessionStorage.getItem("PAGE_MODE");
    
    /*********** validate Email ID **********/
    var lSbEmailID = document.getElementById("idSbEmailID");
    var sbEmailID = lSbEmailID.value;
    var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    var selectedSBId	 = sessionStorage.getItem("SELECTED_SB_MASTER_ID");
    lSbEmailID.style.border = "1px solid #ccc";
    document.getElementById('alertSbEmailID').innerHTML="";
    if(!hasValue(sbEmailID)){
        document.getElementById('alertSbEmailID').innerHTML="Please enter Email ID ";
        lSbEmailID.style.border = "2px solid red";
        errorSubBrokerMaster = 1;
    } else {
       
        if(!validateEmailAddress(sbEmailID)) {
            document.getElementById('alertSbEmailID').innerHTML="Please enter correct Email ID ";
            lSbEmailID.style.border = "2px solid red";
            errorSubBrokerMaster = 1;
        } else {
        	
        	if(mode=="ADD"){
        		getClientDataAsyncFalse("GET", "", "checkUniqueEmailForAdvisorMaster/"+sbEmailID+"/"+loggedInUser.id, onEmailCheckSuccess);
			} else {
				
				getClientDataAsyncFalse("GET", "", "checkExistsEmailForAdvisorMaster/" +sbEmailID+"/"+ loggedInUser.id + "/"+selectedSBId , onEmailCheckSuccess);
			}
			
			function onEmailCheckSuccess(status) {
				if(!status) {
					document.getElementById('alertSbEmailID').innerHTML="Email ID already exists, please provide unique one.";
					lSbEmailID.style.border = "2px solid red";
					errorSubBrokerMaster = 1;
				}
			}
        	
        }
       
    }
   
    /*********** validate Employee Code **********/
    var lSbEmployeeCode = document.getElementById("idSbEmployeeCode");
    var sbEmployeeCode = lSbEmployeeCode.value;
    lSbEmployeeCode.style.border = "1px solid #ccc";
    document.getElementById('alertSbEmployeeCode').innerHTML="";
    if(!hasValue(sbEmployeeCode)){
        document.getElementById('alertSbEmployeeCode').innerHTML="Please enter Employee Code ";
        lSbEmployeeCode.style.border = "2px solid red";
        errorSubBrokerMaster = 1;
    }else{
		
		if(mode=="ADD"){
			getClientDataAsyncFalse("GET", "", "checkUniqueEmpCodeForAdvisorMaster/"+loggedUser.id+"/"+sbEmployeeCode, onSuccess);
		
		}else{
			getClientDataAsyncFalse("GET", "", "checkExistingEmpCodeForAdvisorMaster/"+loggedUser.id+"/"+selectedSBId+"/"+sbEmployeeCode, onSuccess);
		}
		

		function onSuccess(flag){
			if (flag==false){
				//alert("Email is not unique in validateClientAddress");
				document.getElementById('alertSbEmployeeCode').innerHTML="Employee Code is not unique";
				lSbEmployeeCode.style.border = "2px solid red";
				errorSubBrokerMaster=1;
			}	
		 }
		
	}
   
   
    /*********** validate Mobile Number **********/
    var lSbMobileNumber = document.getElementById("idSbMobileNumber");
    var sbMobileNumber = lSbMobileNumber.value;
    lSbMobileNumber.style.border = "1px solid #ccc";
    document.getElementById('alertSbMobileNumber').innerHTML="";
    if(!hasValue(sbMobileNumber)){
        document.getElementById('alertSbMobileNumber').innerHTML="Please enter Mobile Number";
        lSbMobileNumber.style.border = "2px solid red";
        errorSubBrokerMaster = 1;
    } else {
       
        if (!isNumeric(sbMobileNumber)) {
            document.getElementById('alertSbMobileNumber').innerHTML="Please enter a valid integer for Mobile Number";
            lSbMobileNumber.style.border = "2px solid red";
            errorSubBrokerMaster = 1;
        } else if ( (sbMobileNumber.length) < 10 || (sbMobileNumber.length) > 11 ) {
            document.getElementById('alertSbMobileNumber').innerHTML="10 to 11 digits are allowed for Mobile Number. Please Check and enter accordingly";
            lSbMobileNumber.style.border = "2px solid red";
            errorSubBrokerMaster = 1;
        }else{
    		if(mode=="ADD"){
    			getClientDataAsyncFalse("GET", "", "checkUniqueMobileNumber/"+sbMobileNumber, onSuccess);
    		}else{
    			getClientDataAsyncFalse("GET", "", "checkExistingMobileNumber/"+selectedSBId+"/"+sbMobileNumber, onSuccess);
    		}
    		

    		function onSuccess(flag){
    			if (flag==false){
    				//alert("Email is not unique in validateClientAddress");
    				document.getElementById('alertSbMobileNumber').innerHTML="Mobile number is not unique";
    				lSbMobileNumber.style.border = "2px solid red";
    				errorSubBrokerMaster=1;
    			}	
    		 }
        }
       
    }
    
    /*********** validate Branch **********/
    var lSBBranch = document.getElementById("idSbBranch");
	var SBBranch = lSBBranch.value;
	lSBBranch.style.border = "1px solid #ccc";
	document.getElementById('alertSbBranch').innerHTML="";
	if(!hasValue(SBBranch)){
		document.getElementById('alertSbBranch').innerHTML="Please enter Branch";
		lSBBranch.style.border = "2px solid red";
		errorSubBrokerMaster = 1;
	}
   
  
    if (errorSubBrokerMaster == 1 ){
        document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
        $(window).scrollTop(0);
        return false;
    } else {
        document.getElementById('alertform').innerHTML="";
        return true;
    }
   
   
   
}
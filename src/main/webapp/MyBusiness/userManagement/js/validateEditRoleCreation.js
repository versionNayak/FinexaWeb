function validateEditRoleCreation(form){
	//alert("inside validation");
    
	var lSupervisorRole = document.getElementById("idSVRole");
	
	var errRole=0;
	
	
    lSupervisorRole.style.border ="1px solid #ccc";
    
    
	document.getElementById('alertSupervisorRole').innerHTML="";
	
	
	 var SRole = lSupervisorRole.options[lSupervisorRole.selectedIndex].value;
     
		if (SRole=="") {
			document.getElementById('alertSupervisorRole').innerHTML="Please specify  SupervisorRole";
			lSupervisorRole.style.border = "2px solid red";
			errRole=1;
		}else{
			var roleVal = lSupervisorRole.value;
			getClientData("GET", "", "userCreation/uniqueRole?role="+roleVal, onSuccess);
			function onSuccess(uniqueRole){
				if (!(uniqueRole)){
					//alert("Email is not unique in validateClientAddress");
					document.getElementById('alertEmployeeCode').innerHTML=" Role is not unique";
					lSupervisorRole.style.border = "2px solid red";
					errRole=1;
				}	
			 }
		}		
		
		if (errRole==1 ){
			document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
			return false;
		}else{
			return true;
		}

	}
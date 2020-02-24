function validateRoleCreation(form){
	//alert("inside validation");
    var lRole = document.getElementById("idRole");
	/*var lSupervisorRole = document.getElementById("idSVRole");*/
	
	var errRole=0;
	
	lRole.style.border ="1px solid #ccc";
   /* lSupervisorRole.style.border ="1px solid #ccc";*/
    
    document.getElementById('alertRole').innerHTML="";
/*	document.getElementById('alertSupervisorRole').innerHTML="";*/
	
    
    var Role = lRole.options[lRole.selectedIndex].value;
    
	if (Role=="") {
		document.getElementById('alertRole').innerHTML="Please specify Role";
		lRole.style.border = "2px solid red";
		errRole=1;
	}/*else{
		getClientDataAsyncFalse("GET", "", 'userCreation?&masterID='+advisorMasterId+'&roleDescription='+role, onSuccess);
	  function onSuccess(onSuccess){
			console.log("uniquePan "+ uniquePan);
			if (!(uniquePan)){
				console.log("not unique pan");
				document.getElementById('alertpan').innerHTML="PAN no. is not unique.";
				lPan.style.border = "2px solid red";
				errClient=1;			
			}
	      }
	  }*/
    
	//dynamic role based validation
    /*
	if (!hasValue(lRole.value)){
//	    alert("inside fname "+lFirstName.value);
		document.getElementById('alertRole').innerHTML="Please enter Role";
		lRole.style.border = "2px solid red";
		errRole=1;
		}	
	else {
//		alert("inside fname: "+ lFirstName.value);
		var chkAlpha = isChar(lRole.value);
//		alert("inside fname after ischar");
		if (!chkAlpha){
			document.getElementById('alertRole').innerHTML="Please enter only alphabets for Role";
			lRole.style.border = "2px solid red";
			errRole=1;
		}
	}*/
	
	
	//dynamic role based validation
	
	/* var SRole = lSupervisorRole.options[lSupervisorRole.selectedIndex].value;
     
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
		*/
		if (errRole==1 ){
			document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
			return false;
		}else{
			return true;
		}

	}
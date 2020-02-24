function validateHierarchyMapping(form){
	//alert("inside validation");
    var lNewUser = document.getElementById("idHierarchyUser");
	var lSupervisorRole = document.getElementById("idHS");
	var lEffectiveFromDate = document.getElementById("idDate");
	var lEffectiveFromDateGroup = document.getElementById("idEffectiveFromDateGroup");
	
	//alert("inside validation2");
						
    var errHierarchymapping=0;

    lNewUser.style.border ="1px solid #ccc";
    lSupervisorRole.style.border ="1px solid #ccc";
    lEffectiveFromDate.style.border ="1px solid #ccc";
    lEffectiveFromDateGroup.style.borderRadius = "7px";
   // alert("inside validation3");
	//document.getElementById('alertUserName').innerHTML="";
	document.getElementById('alertSupervisorRole').innerHTML="";
	document.getElementById('alertEffectiveFromDate').innerHTML="";
	
	//alert("inside validation4");
	 var UNew = lNewUser.options[lNewUser.selectedIndex].value;
     
		if (UNew=="") {
			document.getElementById('alertUserName').innerHTML="Please specify  User";
			lNewUser.style.border = "2px solid red";
			errHierarchymapping=1;
		}
	// alert("inside validation4");
	var supervisorDrop = lSupervisorRole.options[lSupervisorRole.selectedIndex].value;
	 //alert("inside validation5");
	if(supervisorDrop=="")
		{
		document.getElementById('alertSupervisorRole').innerHTML="Please specify  supervisor";
		lSupervisorRole.style.border = "2px solid red";
		errHierarchymapping=1;
		}
	
	if (!hasValue(lEffectiveFromDate.value)){
		//alert('Inside lid 1');
		document.getElementById('alertEffectiveFromDate').innerHTML="Please enter date";
		lEffectiveFromDateGroup.style.border = "2px solid red";
		lEffectiveFromDateGroup.style.borderRadius = "7px";
		errHierarchymapping=1;
	}
	
	if (errHierarchymapping==1 ){
		document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
		return false;
	}else{
		return true;
	}

}
function validateRoleRemapping(form){
	//alert("inside validation");
    var lUser = document.getElementById("idUserRoleRemapping");
	var lNewRole = document.getElementById("idNewUser");
	var lEffectiveFromDate = document.getElementById("idEffectiveFromDate");
	var lEffectiveFromDateGroup = document.getElementById("idEffectiveFromDateGroup");
	
	
						
    var errRoleRemapping=0;

    lUser.style.border ="1px solid #ccc";
    lNewRole.style.border ="1px solid #ccc";
    lEffectiveFromDate.style.border ="1px solid #ccc";
    lEffectiveFromDateGroup.style.borderRadius = "7px";
    
	document.getElementById('alertUserName').innerHTML="";
	document.getElementById('alertNewRole').innerHTML="";
	document.getElementById('alertEffectiveFromDate').innerHTML="";
	
	
	var userDrop = lUser.options[lUser.selectedIndex].value;
	if (userDrop=="") {
		document.getElementById('alertUserName').innerHTML="Please specify  user";
		lUser.style.border = "2px solid red";
		errRoleRemapping=1;
	}
	
	var roleDrop = lNewRole.options[lNewRole.selectedIndex].value;
	if(roleDrop=="")
		{
		document.getElementById('alertNewRole').innerHTML="Please specify  role";
		lNewRole.style.border = "2px solid red";
		errRoleRemapping=1;
		}
	
	if (!hasValue(lEffectiveFromDate.value)){
		//alert('Inside lid 1');
		document.getElementById('alertEffectiveFromDate').innerHTML="Please enter date";
		lEffectiveFromDateGroup.style.border = "2px solid red";
		lEffectiveFromDateGroup.style.borderRadius = "7px";
		errRoleRemapping=1;
	}
	
	if (errRoleRemapping==1 ){
		document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
		return false;
	}else{
		return true;
	}

}
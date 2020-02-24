function validateAddEditViewAccessRightsForm(form){
	var errorAccessRightsAdmin = 0;
	
	/*********** validate Organization Flag **********/
	var lOrganizationFlag = document.getElementById("idorgFlag");
	var organizationFlag = lOrganizationFlag.options[lOrganizationFlag.selectedIndex].value;
	lOrganizationFlag.style.border = "1px solid #ccc";
	document.getElementById('alertOrgFlag').innerHTML="";
	if(!hasValue(organizationFlag)){
		document.getElementById('alertOrgFlag').innerHTML="Please select Organization Flag ";
		lOrganizationFlag.style.border = "2px solid red";
		errorAccessRightsAdmin = 1;
	}
	
	/*********** validate Organization Name **********/
	// Organisation Name is only required when the Organization Flag is 'Y' i.e. organisation
	//alert("organizationFlag "+organizationFlag);
	
	
	if(organizationFlag == "Y") {
		var lOrganizationName = document.getElementById("idOrganization");
		var organizationName = lOrganizationName.options[lOrganizationName.selectedIndex].value;
		lOrganizationName.style.border = "1px solid #ccc";
		document.getElementById('alertOrgName').innerHTML="";
		if(!hasValue(organizationName)){
			document.getElementById('alertOrgName').innerHTML="Please select Organization Name ";
			lOrganizationName.style.border = "2px solid red";
			errorAccessRightsAdmin = 1;
		}
	}
	
	
	/*********** validate Role **********/
	// Role is only required when the Organization Flag is 'Y' i.e. organisation
	
	
	if(organizationFlag == "Y") {
		var lRole = document.getElementById("idRole");
		var role = lRole.options[lRole.selectedIndex].value;
		lRole.style.border = "1px solid #ccc";
		document.getElementById('alertRole').innerHTML="";
		if(!hasValue(role)){
			document.getElementById('alertRole').innerHTML="Please select Role ";
			lRole.style.border = "2px solid red";
			errorAccessRightsAdmin = 1;
		}
	}
	
	
	/*********** validate Username **********/
	var lUserName = document.getElementById("idAdvisor");
	var userName = lUserName.options[lUserName.selectedIndex].value;
	lUserName.style.border = "1px solid #ccc";
	document.getElementById('alertUserName').innerHTML="";
	if(!hasValue(userName)){
		document.getElementById('alertUserName').innerHTML="Please select User Name ";
		lUserName.style.border = "2px solid red";
		errorAccessRightsAdmin = 1;
	}
	
	if (errorAccessRightsAdmin == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	

}



function validateCheckBoxForm(form, totalColumn){
	var i,countFlag;
	countFlag = 0;
	
	document.getElementById('alertCheckBoxform').innerHTML="";
	//alert("totalColumn "+totalColumn);
	for(i = 0; i < totalColumn; i++){
		if($("#idCheckbox"+i).is(":checked")){
			countFlag=1;
			break;
		}
	}
	//alert("countFlag "+countFlag);
	if(countFlag > 0){
		return true;
	} else {
		document.getElementById('alertCheckBoxform').innerHTML="Please select atleast one Module to initiate Access Rights";
		$(window).scrollTop(100,0);
		return false;
	}
}


function validateAccessRightsForm(form){
	var errorAccessRightsAdmin = 0;
	
	
	/*********** validate Organization Name **********/
	/*	
	var lOrganizationName = document.getElementById("idOrganization");
	var organizationName = lOrganizationName.options[lOrganizationName.selectedIndex].value;
	lOrganizationName.style.border = "1px solid #ccc";
	document.getElementById('alertOrgName').innerHTML="";
	if(!hasValue(organizationName)){
		document.getElementById('alertOrgName').innerHTML="Please select Organization Name ";
		lOrganizationName.style.border = "2px solid red";
		errorAccessRightsAdmin = 1;
	}
	*/
	
	
	
	/*********** validate Username **********/
	/*var lUserName = document.getElementById("idAdvisor");
	var userName = lUserName.options[lUserName.selectedIndex].value;
	lUserName.style.border = "1px solid #ccc";
	document.getElementById('alertUserName').innerHTML="";
	if(!hasValue(userName)){
		document.getElementById('alertUserName').innerHTML="Please select Client ID ";
		lUserName.style.border = "2px solid red";
		errorAccessRightsAdmin = 1;
	}*/
	
	if (errorAccessRightsAdmin == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
	
	
}


function validateCheckBoxForm(form,totalColumn){
	var i,countFlag;
	countFlag = 0;
	
	document.getElementById('alertCheckBoxform').innerHTML="";
	
	for(i = 0; i < totalColumn; i++){
		if($("#idCheckbox"+i).is(":checked")){
			countFlag=1;
			break;
		}
	}
	
	if(countFlag > 0){
		return true;
	} else {
		document.getElementById('alertCheckBoxform').innerHTML="Please select atleast one Module to initiate Access Rights";
		$(window).scrollTop(100,0);
		return false;
	}
}


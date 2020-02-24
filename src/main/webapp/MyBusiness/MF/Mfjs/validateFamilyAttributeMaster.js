function validateFamilyAttributeMaster(form){
	
	var lFinexaClients = document.getElementById("idFinexaClientDrop");
	var lBranchName = document.getElementById("idBranchName");
	var lRMName = document.getElementById("idRMName");
	var lSBName = document.getElementById("idSBName");
	
	var errFaMaster = 0;
	
	lFinexaClients.style.border = "1px solid #ccc";
	lBranchName.style.border = "1px solid #ccc";
	lRMName.style.border = "1px solid #ccc";
	lSBName.style.border = "1px solid #ccc";
	
	document.getElementById('alertform').innerHTML="";
	document.getElementById('alertClients').innerHTML="";
	document.getElementById('alertBranchs').innerHTML="";
	document.getElementById('alertRMs').innerHTML="";
	document.getElementById('alertSBs').innerHTML="";
	
	
	var client = lFinexaClients.options[lFinexaClients.selectedIndex].value;
	if(client=="") {
		document.getElementById('alertClients').innerHTML="Please select a Finexa Client";
		lFinexaClients.style.border = "2px solid red";
		errFaMaster = 1;
	}
	
	var branch = lBranchName.options[lBranchName.selectedIndex].value;
	if(branch=="") {
		document.getElementById('alertBranchs').innerHTML="Please select a Branch";
		lBranchName.style.border = "2px solid red";
		errFaMaster = 1;
	}
	
	var rm = lRMName.options[lRMName.selectedIndex].value;
	var sb = lSBName.options[lSBName.selectedIndex].value;
	if(rm=="" && sb=="") {
		document.getElementById('alertRMs').innerHTML="Please select either RM or SB";
		document.getElementById('alertSBs').innerHTML="Please select either RM or SB";
		lRMName.style.border = "2px solid red";
		lSBName.style.border = "2px solid red";
		errFaMaster = 1;
	} 
	
	
	
	if(errFaMaster==1) {
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
	
	
}
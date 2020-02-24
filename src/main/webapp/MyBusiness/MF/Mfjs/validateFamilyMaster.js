

function validateFamilyMaster(form) {
	
	var lFamilyName = document.getElementById("idFamilyName");
	var lFamilyPan = document.getElementById("idFamilyPAN");
	
	var errFamilyFlag = 0
	
	lFamilyName.style.border = "1px solid #ccc";
	lFamilyPan.style.border = "1px solid #ccc";
	
	document.getElementById('alertFamilyName').innerHTML="";
	document.getElementById('alertFamilyPan').innerHTML="";
	
	if(!hasValue(lFamilyName.value) && !hasValue(lFamilyPan.value)) {
		document.getElementById('alertFamilyName').innerHTML="Please enter either Family Name or PAN";
		document.getElementById('alertFamilyPan').innerHTML="Please enter either Family Name or PAN";
		lFamilyName.style.border = "2px solid red";
		lFamilyPan.style.border = "2px solid red";
		errFamilyFlag = 1;
	}
	
	if (errFamilyFlag == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
}

function validateAssociationWithFinexaClient(form){
	
	var lClientName = document.getElementById("idClientName");
	var lFinexaClient = document.getElementById("idFinexaClientDrop");
	var lRelation = document.getElementById("idRelationDrop");
	
	var errFlag = 0;
	
	lClientName.style.border = "1px solid #ccc";
	lFinexaClient.style.border = "1px solid #ccc";
	lRelation.style.border = "1px solid #ccc";
	
	document.getElementById('alertClientNamePan').innerHTML="";
	document.getElementById('alertFinexaClient').innerHTML="";
	document.getElementById('alertRelation').innerHTML="";
	
	if(!hasValue(lClientName.value)) {
		document.getElementById('alertClientNamePan').innerHTML="Please enter Client Name or Pan";
		lClientName.style.border = "2px solid red";
		errFlag = 1;
	}
	
	var finexaClient = lFinexaClient.options[lFinexaClient.selectedIndex].value;
	if(finexaClient=="") {
		document.getElementById('alertFinexaClient').innerHTML="Please select a Finexa Client";
		lFinexaClient.style.border = "2px solid red";
		errFlag = 1;
	}
	
	var relation = lRelation.options[lRelation.selectedIndex].value;
	if(relation=="") {
		document.getElementById('alertRelation').innerHTML="Please select a Relation";
		lRelation.style.border = "2px solid red";
		errFlag = 1;
	}
	
	if (errFlag == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
	
}
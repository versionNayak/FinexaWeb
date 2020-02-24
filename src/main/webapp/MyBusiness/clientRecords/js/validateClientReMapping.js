function validateClientReMapping(form) {
	
	var lUsers = document.getElementById("idClientRemapping");
	var lClientName = document.getElementById("idClientName");
	
	var errCRM=0;
	
	
	lUsers.style.border ="1px solid #ccc";
	lClientName.style.border ="1px solid #ccc";
  
	document.getElementById('alertUser').innerHTML="";
	document.getElementById('alertClientName').innerHTML="";
	
	var userVal = lUsers.options[lUsers.selectedIndex].value;
    if (userVal=="") {
		document.getElementById('alertUser').innerHTML="Please specify User";
		lUsers.style.border = "2px solid red";
		errCRM=1;
	}
	
	if (!hasValue(lClientName.value)) {
		document.getElementById('alertClientName').innerHTML="Please enter a Client";
		lClientName.style.border = "2px solid red";
		errCRM=1;
	}
	
	if (errCRM==1 ){
		document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
		return false;
	}else{
		return true;
	}
	
}
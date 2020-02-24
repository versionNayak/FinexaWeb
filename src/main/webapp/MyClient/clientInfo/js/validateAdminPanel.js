function validate(form){
	console.log("In Admin validation");
	
	var lUsertype = document.getElementById("idUsertype");
	var lUserName = document.getElementById("idUserName");

	var errAdmin=0;

    lUsertype.style.border ="1px solid #ccc";
    lUserName.style.border ="1px solid #ccc";
	
	document.getElementById('alertUserType').innerHTML="";
	document.getElementById('alertUserName').innerHTML="";
	
	var userType = lUsertype.options[lUsertype.selectedIndex].value;
    //alert('Cash Type: '+userType); 
	if (userType=="") {
		document.getElementById('alertUserType').innerHTML="Please enter User Type";
		lUsertype.style.border = "2px solid red";
	    errAdmin=1;
	} else if (userType=="Organization") {
		if (!hasValue(lUserName.value)) {
			document.getElementById('alertUserName').innerHTML="Please enter Organization Name";
			lUserName.style.border = "2px solid red";
		    errAdmin=1;			
	}
		
	}

	if (errAdmin==1 ){
		console.log("Validation Error in AdminPanel");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		console.log("Not an Error");
		document.getElementById('alertform').innerHTML="";
		return true;
	}
}

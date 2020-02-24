function validateCCCreation(form) {
	var idClientCode = document.getElementById("idClientCode");
	idClientCode.style.border = "1px solid #ccc";	
	document.getElementById('alertClientCode').innerHTML="";
	
	var errClient = 0;
	if (!hasValue(idClientCode.value)){
	    alert("inside idClientCode "+idClientCode.value);
		document.getElementById('alertClientCode').innerHTML="Please enter Cient Code";
		idClientCode.style.border = "2px solid red";
		errClient=1;
		}	
	else {
		var chkAlpha = isCharForName(idClientCode.value);
		alert("inside fname after ischar");
		if (!chkAlpha){
			document.getElementById('alertClientCode').innerHTML="Please enter only alphabets for first name";
			idClientCode.style.border = "2px solid red";
			errClient=1;
		}
	}
	
	if (errClient==1){
			alert("Error");	
			document.getElementById('alertClientCodeForm').innerHTML="Please correct the errors highlighted below."; 		
			$(window).scrollTop(0);
			return false;
		}
		else{
			return true;
		}
}
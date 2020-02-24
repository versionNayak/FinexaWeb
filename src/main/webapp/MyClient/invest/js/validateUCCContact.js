function validateUCCContactForm(form){
	//console.log("In UCC Bank Details");
	
	var lAddress = document.getElementById("idAddress");
	var lCity = document.getElementById("idCity");
	var lState = document.getElementById("idState");
	var lCountry = document.getElementById("idCountry");
	var lPincode = document.getElementById("idPincode");
	var lMobile = document.getElementById("idMobile");
	var lMail = document.getElementById("idEmailId");
	var errUCC=0;
    
	lAddress.style.border ="1px solid #ccc";
	lCity.style.border ="1px solid #ccc";
	lState.style.border ="1px solid #ccc";
	lCountry.style.border ="1px solid #ccc";
	lPincode.style.border ="1px solid #ccc";
	lMobile.style.border ="1px solid #ccc";
	lMail.style.border ="1px solid #ccc";
	
	document.getElementById('alertAddress').innerHTML="";
	document.getElementById('alertCity').innerHTML="";
	document.getElementById('alertState').innerHTML="";
	document.getElementById('alertCountry').innerHTML="";
	document.getElementById('alertPincode').innerHTML="";
	document.getElementById('alertMobile').innerHTML="";
	document.getElementById('alertEmail').innerHTML="";
	
	//validate Address
	var addr = lAddress.value;
	if(!hasValue(addr)){
		document.getElementById('alertAddress').innerHTML="Please enter address";
		lAddress.style.border = "2px solid red";
		errUCC=1;
	}
	
	//validate City
	var city = lCity.value;
	if(!hasValue(city)){
		document.getElementById('alertCity').innerHTML="Please enter City";
		lCity.style.border = "2px solid red";
		errUCC=1;
	}
	
	//validate State
	var state = lState.options[lState.selectedIndex].value;
	if(!hasValue(state)){
		document.getElementById('alertState').innerHTML="Please select State";
		lState.style.border = "2px solid red";
		errUCC=1;
	}
	
	//validate Country
	var country = lCountry.value;
	if(!hasValue(country)){
		document.getElementById('alertCountry').innerHTML="Please enter Country";
		lCountry.style.border = "2px solid red";
		errUCC=1;
	}
	
	//validate Pincode
	var pin = lPincode.value;
	if(!hasValue(pin)){
		document.getElementById('alertPincode').innerHTML="Please enter Pincode";
		lPincode.style.border = "2px solid red";
		errUCC=1;
	}
	else if(!(pin.length == 6)){
		document.getElementById('alertPincode').innerHTML="Please enter correct Pincode";
		lPincode.style.border = "2px solid red";
		errUCC=1;
	}
	
	// validate mobile No.
    var mob = lMobile.value;
	if(!hasValue(mob)){
		document.getElementById('alertMobile').innerHTML="Please enter Mobile No. ";
		lMobile.style.border = "2px solid red";
		errUCC=1;
	}
	else{
		
		var chkMob = validateMobileNo(mob);
		
		if(chkMob == 1){
			document.getElementById('alertMobile').innerHTML="Please enter numeric value for mobile no.";
			lMobile.style.border = "2px solid red";
			errUCC=1;
		}
		else if(chkMob == 2){
			document.getElementById('alertMobile').innerHTML="Please enter 10 digits for mobile no.";
			lMobile.style.border = "2px solid red";
			errUCC=1;
		}
		
	}
	
	// validate Email Id
	var mail = lMail.value;
	if(!hasValue(mail)){
		document.getElementById('alertEmail').innerHTML="Please enter Email Id ";
		lMail.style.border = "2px solid red";
		errUCC=1;
	}
	else {
        var chkEmail = validateEmailAddress(mail);
        if (!chkEmail) {
            document.getElementById('alertEmail').innerHTML = "Please enter a valid email address. Must be of the format abc@xyz.com";
            lMail.style.border = "2px solid red";
            errUCC = 1;
        }
    }
	
    
	//alert("After Current Balance validation: " + errCash);
	//return false;
	
	if (errUCC==1){
		//console.log("Validation Error in Bank Details");
		document.getElementById('alertformContact').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		//console.log("Not an Error");
		document.getElementById('alertformContact').innerHTML="";
		return true;
	}
	
}
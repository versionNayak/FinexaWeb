	
    var errAddress;
    var lPhone;
	var lCountryCodeEmergencyContact;
	var lEmergencyContact;
	var lAlternateEmail;
	var lEmail;
	var lCountryCode ;
	var lMobile;
	
	var lAddress1Line1;
	var lAddress1Line2;
	var lAddress1Line3;
	var lAddress1City;
	var lAddress1State;
	var lAddress1Pincode;
	var lAddress1Country;

	
	var lAddress2Line1;
	var lAddress2Line2;
	var lAddress2Line3;
	var lAddress2City;
	var lAddress2State;
	var lAddress2Pincode;
	var lAddress2Country;
	var laddress2Type;
	
	var lAddress3Line1;
	var lAddress3Line2;
	var lAddress3Line3;
	var lAddress3City;
	var lAddress3State;
	var lAddress3Pincode;
	var lAddress3Country;
	var laddress3Type;
	var isaddress1Type;
	var isaddress2Type;
	var isaddress3Type;
	
	var lState;
	var lstateDrop;
	
	var lForm2State;
	var lForm2StateDrop;
	
	var lForm3State;
	var lForm3StateDrop;


function validateAddress() {
  ///	alert("Inside validate contact details");
		
  	 isaddress1Type = false;
	 isaddress2Type = false;
	 isaddress3Type = false;
		
		 form = document.getElementById('clientContact');
		
		
		 errAddress = 0;
	     lPhone = document.getElementById("idPhone");
		 lCountryCodeEmergencyContact = document.getElementById("idCountryCodeEmergencyContact");
		 lEmergencyContact = document.getElementById("idEmergencyContact");
		 lAlternateEmail = document.getElementById("idAlternateEmail");
		 lEmail = document.getElementById("idEmailId");
		 lCountryCode = document.getElementById("idCountryCode");
		 lCountryCodePhone = document.getElementById("idCountryCodePhone");
		 lMobile = document.getElementById("idMobile");
		 lState = document.getElementById("idAddress1StateDrp");
		 lForm2State = document.getElementById("idAddress2StateDrp");
		 lForm3State = document.getElementById("idAddress3StateDrp");
		 initialize();



//	   alert("tttt uuuuuuuuuu llllllllll");
	
	lPhone.style.border = "1px solid #ccc";
	lCountryCodeEmergencyContact.style.border = "1px solid #ccc";
	lEmergencyContact.style.border = "1px solid #ccc";
	lAlternateEmail.style.border = "1px solid #ccc";
	lEmail.style.border = "1px solid #ccc";
	lCountryCode.style.border = "1px solid #ccc";
	lCountryCodePhone.style.border = "1px solid #ccc";
	lMobile.style.border = "1px solid #ccc";
	lState.style.border = "1px solid #ccc";
	lForm2State.style.border = "1px solid #ccc";
	lForm3State.style.border = "1px solid #ccc";
	
	
//	 alert("Inside validation -1");

	document.getElementById('alertphone').innerHTML="";
	document.getElementById('alertemergencycontact').innerHTML="";
	document.getElementById('alertcountrycodeemergencycontact').innerHTML="";
	document.getElementById('alertalternateemail').innerHTML="";
	document.getElementById('alertemail').innerHTML="";
	document.getElementById('alertcountrycode').innerHTML="";
	document.getElementById('alertcountrycodePhone').innerHTML="";
	document.getElementById('alertmobile').innerHTML="";
	
	
//	alert("Inside validation -11111");
	
	
	clearDiv();

	
	 //  alert("Inside validation 0");
	
	
	els = form.elements['chkAddress1Type'];
//	 alert("Inside validation 000 ");
//	 alert("Inside validation 000 "+els.length);
	 
	 
	 
   for (i = 0; i < els.length; i++) {
	if (els[i].checked) {
		isaddress1Type = true;
	}
   }

 //  alert("Inside validation 1");
   
   
	
	els = form.elements['chkAddress2Type'];
	
    for (i = 0; i < els.length; i += 1) {
	if (els[i].checked) {
		isaddress2Type = true;
	}
   }
 //   alert("Inside validation 2");
	
	els = form.elements['chkAddress3Type'];
	i;
   for (i = 0; i < els.length; i += 1) {
	if (els[i].checked) {
		isaddress3Type = true;
	}
   }
	
//	alert("Inside validation 4");
	
	var noOfClick=$("#idNoOfClicks").val();
//	alert("noOfClick "+noOfClick);
	
	//Validate address
	if(noOfClick==3){
	//	alert("noOfClick in third"+noOfClick);
		
		if(!hasValue(lAddress1Line1.value) && !hasValue(lAddress1Line2.value) && !hasValue(lAddress1Line3.value) && !hasValue(lAddress1City.value)
				 && !hasValue(lAddress1State.value) && !hasValue(lAddress1Pincode.value) && (lAddress1Country.value==0) &&  isaddress1Type==false
				  && !hasValue(lAddress2Line1.value) && !hasValue(lAddress2Line2.value) && !hasValue(lAddress2Line3.value) && !hasValue(lAddress2City.value)
				  && !hasValue(lAddress2State.value) && !hasValue(lAddress2Pincode.value)  && (lAddress2Country.value==0)	&&  isaddress2Type==false
				  && !hasValue(lAddress3Line1.value) && !hasValue(lAddress3Line2.value) && !hasValue(lAddress3Line3.value) && !hasValue(lAddress3City.value)
				  && !hasValue(lAddress3State.value) && !hasValue(lAddress3Pincode.value)  && (lAddress3Country.value==0)	&&  isaddress3Type==false){
		
  //   alert("At least one address must be entered");
     modalMessage("At least one address must be entered");
 	errAddress=1;
	}else{
		if($('#idDivAddress1').is(':visible')){
		//	alert("div1 visible");
		if(hasValue(lAddress1Line1.value) || hasValue(lAddress1Line2.value) || hasValue(lAddress1Line3.value) || hasValue(lAddress1City.value)
				  || hasValue(lAddress1State.value) || hasValue(lAddress1Pincode.value)  || (lAddress1Country.value!=0) ||  isaddress1Type==true){
		//	alert("validateFirstAddress");
			validateFirstAddress();
	}
		}
		if($('#idDivAddress2').is(':visible')){
	//		alert("div2 visible");
		if(hasValue(lAddress2Line1.value) || hasValue(lAddress2Line2.value) || hasValue(lAddress2Line3.value) || hasValue(lAddress2City.value)
				  || hasValue(lAddress2State.value) || hasValue(lAddress2Pincode.value)  || (lAddress2Country.value!=0) ||  isaddress2Type==true){
	//		alert("validateSecondAddress");
			validateSecondAddress();
	}
		}
		if($('#idDivAddress3').is(':visible')){
	//		alert("div3 visible");
		if(hasValue(lAddress3Line1.value) || hasValue(lAddress3Line2.value) || hasValue(lAddress3Line3.value) || hasValue(lAddress3City.value)
				  || hasValue(lAddress3State.value) || hasValue(lAddress3Pincode.value)  || (lAddress3Country.value!=0) ||  isaddress3Type==true){
		//	alert("validateThirdAddress");
			validateThirdAddress();
	}
	}
	}
	}

    if(noOfClick==2){
	//	alert("noOfClick in second"+noOfClick);
	if(!hasValue(lAddress1Line1.value) && !hasValue(lAddress1Line2.value) && !hasValue(lAddress1Line3.value) && !hasValue(lAddress1City.value)
			 && !hasValue(lAddress1State.value) && !hasValue(lAddress1Pincode.value) && (lAddress1Country.value==0) &&  isaddress1Type==false
			  && !hasValue(lAddress2Line1.value) && !hasValue(lAddress2Line2.value) && !hasValue(lAddress2Line3.value) && !hasValue(lAddress2City.value)
			  && !hasValue(lAddress2State.value) && !hasValue(lAddress2Pincode.value)  && (lAddress2Country.value==0)	&&  isaddress2Type==false
			  && !hasValue(lAddress3Line1.value) && !hasValue(lAddress3Line2.value) && !hasValue(lAddress3Line3.value) && !hasValue(lAddress3City.value)
			  && !hasValue(lAddress3State.value) && !hasValue(lAddress3Pincode.value)  && (lAddress3Country.value==0)	&&  isaddress3Type==false)
	  {
		
  //   alert("At least one address must be entered");
     modalMessage("At least one address must be entered");
 	errAddress=1;
	}else{
		if($('#idDivAddress1').is(':visible')){
	//		alert("div1 visible");
		if(hasValue(lAddress1Line1.value) || hasValue(lAddress1Line2.value) || hasValue(lAddress1Line3.value) || hasValue(lAddress1City.value)
				  || hasValue(lAddress1State.value) || hasValue(lAddress1Pincode.value)  || (lAddress1Country.value!=0) ||  isaddress1Type==true){
	//		alert("validateFirstAddress");
			validateFirstAddress();
	}
		}
		if($('#idDivAddress2').is(':visible')){
	//		alert("div2 visible");
		if(hasValue(lAddress2Line1.value) || hasValue(lAddress2Line2.value) || hasValue(lAddress2Line3.value) || hasValue(lAddress2City.value)
				  || hasValue(lAddress2State.value) || hasValue(lAddress2Pincode.value)  || (lAddress2Country.value!=0) ||  isaddress2Type==true){
	//		alert("validateSecondAddress");
			validateSecondAddress();
	}
		}
		if($('#idDivAddress3').is(':visible')){
		//	alert("div3 visible");
		if(hasValue(lAddress3Line1.value) || hasValue(lAddress3Line2.value) || hasValue(lAddress3Line3.value) || hasValue(lAddress3City.value)
				  || hasValue(lAddress3State.value) || hasValue(lAddress3Pincode.value)  || (lAddress3Country.value!=0) ||  isaddress3Type==true){
		//	alert("validateThirdAddress");
			validateThirdAddress();
	}
	}
	}	
	}
  //  alert("Inside validation aaaaaaaaaaaaaaaaaaaaaaa");
    if(noOfClick==1){
	//	alert("noOfClick in one"+noOfClick);
    	if($('#idDivAddress3').is(':hidden') && $('#idDivAddress2').is(':hidden') && $('#idDivAddress1').is(':visible')){	
    		validateFirstAddress();
    	}
    	
    	if($('#idDivAddress3').is(':hidden') && $('#idDivAddress1').is(':hidden') &&  $('#idDivAddress2').is(':visible')){
    		validateSecondAddress();
        }
    	if($('#idDivAddress2').is(':hidden') && $('#idDivAddress1').is(':hidden') && $('#idDivAddress3').is(':visible')){
    		validateThirdAddress();
        }
	}
	
	
	

	//Validate Email

	if (!hasValue(lEmail.value)){
		document.getElementById('alertemail').innerHTML="Please enter email address";
		lEmail.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
		//alert("Email value "+lEmail.value);
		var emailVal = lEmail.value;
		var mode = sessionStorage.getItem("PAGE_MODE");
		
	  //  var mode="ADD";
		if(mode=="ADD"){	
			getClientDataAsyncFalse("GET", "", "clientContactInfo/uniqueEmail?email="+emailVal, onSuccess);
		}else{
			var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
			getClientDataAsyncFalse("GET", "", "clientContactInfo/existEmail/"+emailVal+"/"+selectedClientId, onSuccess);
		}
		function onSuccess(uniqueEmail){		
           //  alert("email uniqueEmail "+uniqueEmail);
			if (!(uniqueEmail)){
			//	alert("Email is not unique in validateClientAddress");
				document.getElementById('alertemail').innerHTML="Email address is not unique";
				lEmail.style.border = "2px solid red";
				errAddress=1;
			}
			else{
				var emailVal = lEmail.value;
				var chkEmail = validateEmailAddress(emailVal);
				if (!chkEmail) {
					document.getElementById('alertemail').innerHTML="Please enter a valid email address. Must be of the format abc@xyz.com";
					lEmail.style.border = "2px solid red";
					errAddress=1;
				}
			}
		}
	}
//	alert("After email errAddress"+errAddress);

//	Validate Country Code
	var mobileErrmessage="";
	if (!hasValue(lCountryCode.value)){
	   // alert ("Country code null...."+lCountryCode.value);
		mobileErrmessage=mobileErrmessage+"Please enter country code";
		//document.getElementById('alertcountrycode').innerHTML="Please enter country code";
		lCountryCode.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
		var pCountryCode = lCountryCode.value;
		var chkCountryCode = validateCountryCode(pCountryCode);
		//alert("chkCountryCode "+chkCountryCode);
		if (chkCountryCode==1){
			//alert ("Invalid country code ");
			mobileErrmessage=mobileErrmessage+"You can enter + only as the first character";
			//document.getElementById('alertcountrycode').innerHTML="You can enter + only as the first character";
			lCountryCode.style.border = "2px solid red";
			errAddress=1;
		}
		else{			
			if (chkCountryCode==2){
				mobileErrmessage=mobileErrmessage+"You can enter only + and the digits 0-9 for country code";
				//document.getElementById('alertcountrycode').innerHTML="You can enter only + and the digits 0-9 for country code";
				lCountryCode.style.border = "2px solid red";
				errAddress=1;
			}
		}

	}
	//alert("After Country Code...");

	
	
//	Validate mobile
	
	if (!hasValue(lMobile.value)){
		if (hasValue(mobileErrmessage)){
			mobileErrmessage = mobileErrmessage + ". Please enter mobile no.";
		}else{
			document.getElementById('alertmobile').innerHTML="Please enter mobile no.";
		}
		
		lMobile.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
		//var pMobile = lMobile.value;
		//var chkMobile = validateMobileNo(pMobile);
		if (!isInteger(lMobile.value)){
			if (hasValue(mobileErrmessage)){
				mobileErrmessage = mobileErrmessage + ". Please enter a valid integer for mobile no.";
			}else{
				//mobileErrmessage ="Please enter a valid integer";
				document.getElementById('alertmobile').innerHTML="Please enter a valid integer";
			}
			
			lMobile.style.border = "2px solid red";
			errAddress=1;
		 }
		else{
			if(lCountryCode.value=='91' || lCountryCode.value=='0091' ||  lCountryCode.value=='+91'){
			if (lMobile.value.length!=10){		
				//		alert("You have to enter 10 digits for mobile no.");
				if (hasValue(mobileErrmessage)){
					mobileErrmessage = mobileErrmessage + ". You have to enter 10 digits for mobile no.";
				}else{
					//mobileErrmessage ="You have to enter 10 digits for mobile no.";
					document.getElementById('alertmobile').innerHTML="You have to enter 10 digits for mobile no.";
				}
				
				lMobile.style.border = "2px solid red";
				errAddress=1;
			}
		  }else{
				//alert("Mobile value "+lMobile.value);
				var mobileVal = lMobile.value;
				if(mode=="ADD"){	
					getClientDataAsyncFalse("GET", "", "clientContactInfo/uniqueMobile?mobile="+mobileVal, onSuccess);
					}else{
				//		alert("page mode edit1122");
					var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
					getClientDataAsyncFalse("GET", "", "clientContactInfo/existMobile/"+selectedClientId+"/"+mobileVal, onSuccess);
					}
				
				function onSuccess(uniqueMobile){
				//	 alert("mob uniqueMobile "+uniqueMobile);
					if (!(uniqueMobile)){
				//		alert("Mobile is not unique in validateClientAddress");
						if (hasValue(mobileErrmessage)){
							mobileErrmessage = mobileErrmessage + ". Mobile no. is not unique.";
						}else{
							document.getElementById('alertmobile').innerHTML="Mobile no. is not unique";
						}
						
						lMobile.style.border = "2px solid red";
						errAddress=1;
					}
				}
			}
		}		
	}
	if (hasValue(mobileErrmessage)){
		document.getElementById('alertcountrycode').innerHTML=mobileErrmessage;
	}
//alert("After mobile errAddress "+errAddress);
	
	//Validate Phone
	var phoneErrmessage="";
	if (hasValue(lCountryCodePhone.value)){
		var pCountryCode = lCountryCodePhone.value;
		var chkCountryCode = validateCountryCode(pCountryCode);
		//alert("chkCountryCode "+chkCountryCode);
		if (chkCountryCode==1){
			//alert ("Invalid country code ");
			phoneErrmessage=phoneErrmessage+"You can enter + only as the first character";
			//document.getElementById('alertcountrycodeemergencycontact').innerHTML="You can enter + only as the first character";
			lCountryCodePhone.style.border = "2px solid red";
			errAddress=1;
		}
		else{			
			if (chkCountryCode==2){
				phoneErrmessage=phoneErrmessage+"You can enter only + and the digits 0-9 for country code";
				//document.getElementById('alertcountrycodeemergencycontact').innerHTML="You can enter only + and the digits 0-9 for country code";
				lCountryCodePhone.style.border = "2px solid red";
				errAddress=1;
			}
		}

	}
	
	if (hasValue(lPhone.value)){		
		
		//var chkPhone = isNumeric(lPhone.value);

		if (!isInteger(lPhone.value)){
			if (hasValue(phoneErrmessage)){
				phoneErrmessage = phoneErrmessage + ". Please enter a valid integer";
			}else{
				document.getElementById('alertphone').innerHTML="Please enter a valid integer for ph no.";
			}
			lPhone.style.border = "2px solid red";
			errAddress=1;
		}
	 }
	if (hasValue(phoneErrmessage)){
		document.getElementById('alertcountrycodePhone').innerHTML=phoneErrmessage;
	}
	//alert("After Phone...");
	
//	Validate Country Code Emergency Contact
	var emergencyContactErrmessage="";
	if (!hasValue(lCountryCodeEmergencyContact.value)){
	   // alert ("Country code null...."+lCountryCode.value);
		emergencyContactErrmessage=emergencyContactErrmessage+"Please enter country code";
		//document.getElementById('alertcountrycodeemergencycontact').innerHTML="Please enter country code";
		lCountryCodeEmergencyContact.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
		var pCountryCode = lCountryCodeEmergencyContact.value;
		var chkCountryCode = validateCountryCode(pCountryCode);
		//alert("chkCountryCode "+chkCountryCode);
		if (chkCountryCode==1){
			//alert ("Invalid country code ");
			emergencyContactErrmessage=emergencyContactErrmessage+"You can enter + only as the first character";
			//document.getElementById('alertcountrycodeemergencycontact').innerHTML="You can enter + only as the first character";
			lCountryCodeEmergencyContact.style.border = "2px solid red";
			errAddress=1;
		}
		else{			
			if (chkCountryCode==2){
				emergencyContactErrmessage=emergencyContactErrmessage+"You can enter only + and the digits 0-9 for country code";
				//document.getElementById('alertcountrycodeemergencycontact').innerHTML="You can enter only + and the digits 0-9 for country code";
				lCountryCodeEmergencyContact.style.border = "2px solid red";
				errAddress=1;
			}
		}

	}
	//alert("After Country Code Emergency Contact...errAddress"+errAddress);
	//Validate Emergency Contact
	
	if (hasValue(lEmergencyContact.value)){
		//var pEmergencyContact = lEmergencyContact.value;
		//var chkEmergencyContact = validateMobileNo(pEmergencyContact);
		if (!isInteger(lEmergencyContact.value)){
			if (hasValue(emergencyContactErrmessage)){
				emergencyContactErrmessage = emergencyContactErrmessage + ". Please enter a valid integer for contact no.";
			}else{
				//mobileErrmessage ="Please enter a valid integer";
				document.getElementById('alertemergencycontact').innerHTML="Please enter a valid integer";
			}
			lEmergencyContact.style.border = "2px solid red";
			errAddress=1;
		}
		else{	
			if(lCountryCodeEmergencyContact.value=='91' || lCountryCodeEmergencyContact.value=='0091' ||  lCountryCodeEmergencyContact.value=='+91'){
			if (lEmergencyContact.value.length!=10){
				if (hasValue(emergencyContactErrmessage)){
					emergencyContactErrmessage = emergencyContactErrmessage + ". You have to enter 10 digits for emergency contact number.";
				}else{
					//mobileErrmessage ="You have to enter 10 digits for mobile no.";
					document.getElementById('alertemergencycontact').innerHTML="You have to enter 10 digits for emergency contact number.";
				}
				
				lEmergencyContact.style.border = "2px solid red";
				errAddress=1;
			}
		}
		}
	}
	else{
		if (hasValue(emergencyContactErrmessage)){
			emergencyContactErrmessage = emergencyContactErrmessage + ". Please enter an emergency contact number.";
		}else{
			document.getElementById('alertemergencycontact').innerHTML="Please enter an emergency contact number";
		}
		
		lEmergencyContact.style.border = "2px solid red";
		errAddress=1;		
	}
	if (hasValue(emergencyContactErrmessage)){
		document.getElementById('alertcountrycodeemergencycontact').innerHTML=emergencyContactErrmessage;
	}
	//alert("After Emergency Contact...");
	
	//Validate Alternate Email.
	
	if (hasValue(lAlternateEmail.value)){
		var alternateEmailVal = lAlternateEmail.value;
		var chkAlternateEmail = validateEmailAddress(alternateEmailVal);
		if (!chkAlternateEmail) {
			document.getElementById('alertalternateemail').innerHTML="Please enter a valid email address. Must be of the format abc@xyz.com";
			lAlternateEmail.style.border = "2px solid red";
			errAddress=1;
		}
	}

	//alert("After Alternate Email...");
	
	//alert ("Before error "+errAddress);
	
	console.log("errAddress "+errAddress);

	if (errAddress==1) {
		//alert ("Error....");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}
	else{
		document.getElementById('alertform').innerHTML="";
		return true;
	}
}



function validateFirstAddress(){

   // 	 alert("inside first");
	if (!hasValue(lAddress1Line1.value)){
	//	alert ("Address null....");
		document.getElementById('alertaddress1line1').innerHTML="Please enter address line1";
		lAddress1Line1.style.border = "2px solid red";
		errAddress=1;
		}	
    //alert("After Address...");
	//Validate city
	
	if (!hasValue(lAddress1City.value)){
		//alert ("City null....");
		document.getElementById('alertaddress1city').innerHTML="Please enter city";
		lAddress1City.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
		//alert ("City: " + lCity.value);
		var chkAlpha = isChar(lAddress1City.value);
		//alert ("City... after ischar");
		if (!chkAlpha){
			document.getElementById('alertaddress1city').innerHTML="Please enter only alphabets for city";
			lAddress1City.style.border = "2px solid red";
			errAddress=1;
		}
	}
//	alert("After City...");	
	//Validate pincode
	if (!hasValue(lAddress1Pincode.value)){
		//alert ("Pin null....");
		document.getElementById('alertaddress1pincode').innerHTML="Please enter a pincode";
		lAddress1Pincode.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
//		alert ("Pin not null....");
//		alert("Pincode: " + lPincode.value )

		if (!isInteger(lAddress1Pincode.value)){
			document.getElementById('alertaddress1pincode').innerHTML="Please enter a valid integer";
			lAddress1Pincode.style.border = "2px solid red";
			errAddress=1;
		}
		else{
			//var countryName=$("#idAddress1Country option:selected").text();
			if(lAddress1Country.value==99){
				//alert("inside INDIA");
				lstateDrop = lState.options[lState.selectedIndex].value;
				if (lstateDrop=="0"){
					document.getElementById('alertaddress1stateDrp').innerHTML="Please select a state";
					lState.style.border = "2px solid red";
					errAddress=1;
				}
				
			
		 } else {
			 if (!hasValue(lAddress1State.value)){
					//alert ("State null....");
					document.getElementById('alertaddress1state').innerHTML="Please enter state";
					lAddress1State.style.border = "2px solid red";
					errAddress=1;
					}	
		  }
		}
	 }
//	alert("After Pin...");
	//Validate state

	
	/*else {
		var chkAlpha = isCharSpace(lAddress1State.value);
		if (!chkAlpha){
			document.getElementById('alertaddress1state').innerHTML="Please enter only alphabets for state";
			lAddress1State.style.border = "2px solid red";
			errState=1;
		}
	}*/
//	alert("After State...");

	//Validate Country

	//alert("Country: "+ lCountry.value)
	if (lAddress1Country.value==0){
	//	alert()
		document.getElementById('alertaddress1country').innerHTML="Please enter country";
		lAddress1Country.style.border = "2px solid red";
		errAddress=1;
	} else {
		if (lAddress1Country.value==99) {
			lstateDrop = lState.options[lState.selectedIndex].value;
			if (lstateDrop=="0"){
				document.getElementById('alertaddress1stateDrp').innerHTML="Please select a state";
				lState.style.border = "2px solid red";
				errAddress=1;
			}
			var pincodeVal = lAddress1Pincode.value;
			var stateVal = lstateDrop;
			if (pincodeVal!=""){
				getClientDataAsyncFalse("GET", "", "clientContactInfo/uniquePincode?pincode="+pincodeVal+"&stateId="+stateVal, onAddSuccess);
				function onAddSuccess(uniquePincode){
				//	 alert("mob uniqueMobile "+uniqueMobile);
					if (uniquePincode){
				//		alert("Mobile is not unique in validateClientAddress");
						/*if (!hasValue(pincodeErrmessage)){
							pincodeErrmessage = pincodeErrmessage + ". pincode is not valid.";
						}*/
						document.getElementById('alertaddress1pincode').innerHTML="Pincode is not valid.";
						lAddress1Pincode.style.border = "2px solid red";
						errAddress=1;
					}
				}
			} else {
				document.getElementById('alertaddress1pincode').innerHTML="Please enter a valid Pincode.";
				lAddress1Pincode.style.border = "2px solid red";
				errAddress=1;
			}
			
			if(mode=="Edit"){
				if (pincodeVal != "") {
					getClientDataAsyncFalse("GET", "", "clientContactInfo/uniquePincode?pincode="+pincodeVal+"&stateId="+stateVal, onEditSuccess);
				} else {
					document.getElementById('alertaddress1pincode').innerHTML="Please enter a valid Pincode.";
					lAddress1Pincode.style.border = "2px solid red";
					errAddress=1;
				}
				
				}
			function onEditSuccess(uniquePincode){
				//	 alert("mob uniqueMobile "+uniqueMobile);
					if (uniquePincode){
				//		alert("Mobile is not unique in validateClientAddress");
						/*if (!hasValue(pincodeErrmessage)){
							pincodeErrmessage = pincodeErrmessage + ". pincode is not valid.";
						}*/
						document.getElementById('alertaddress1pincode').innerHTML="Pincode is not valid.";
						lAddress1Pincode.style.border = "2px solid red";
						errAddress=1;
					}
				}
		} else {
			if (!hasValue(lAddress1State.value)){
				//alert ("State null....");
				document.getElementById('alertaddress1state').innerHTML="Please enter state";
				lAddress1State.style.border = "2px solid red";
				errAddress=1;
				}	
		}
	}
	
//	alert("After Country...");
	if(isaddress1Type==false){
		document.getElementById('alertaddress1type').innerHTML="Please select at least one address type";
		errAddress=1;
	}
	
}
     
     
     
     
     
function validateThirdAddress(){
//alert("inside third");
	if (!hasValue(lAddress3Line1.value)){
	//	alert ("Address null....");
		document.getElementById('alertaddress3line1').innerHTML="Please enter address line1";
		lAddress3Line1.style.border = "2px solid red";
		errAddress=1;
		}	
    //alert("After Address...");
	//Validate city
	
	if (!hasValue(lAddress3City.value)){
		//alert ("City null....");
		document.getElementById('alertaddress3city').innerHTML="Please enter city";
		lAddress3City.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
		//alert ("City: " + lCity.value);
		var chkAlpha = isChar(lAddress3City.value);
		//alert ("City... after ischar");
		if (!chkAlpha){
			document.getElementById('alertaddress3city').innerHTML="Please enter only alphabets for city";
			lAddress3City.style.border = "2px solid red";
			errAddress=1;
		}
	}
	//alert("After City...");	
	//Validate pincode

	if (!hasValue(lAddress3Pincode.value)){
		//alert ("Pin null....");
		document.getElementById('alertaddress3pincode').innerHTML="Please enter a pincode";
		lAddress3Pincode.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
//		alert ("Pin not null....");
//		alert("Pincode: " + lPincode.value )

		if (!isInteger(lAddress3Pincode.value)){
			document.getElementById('alertaddress3pincode').innerHTML="Please enter enter a valid integer";
			lAddress3Pincode.style.border = "2px solid red";
			errAddress=1;
		}
		else{
			//var countryName=$("#idAddress1Country option:selected").text();
			if(lAddress3Country.value==99){
				//alert("inside INDIA");
				lForm3StateDrop = lForm3State.options[lForm3State.selectedIndex].value;
				if (lForm3StateDrop=="0"){
					document.getElementById('alertaddress3stateDrp').innerHTML="Please select a state";
					lForm3State.style.border = "2px solid red";
					errAddress=1;
				}
				
			/*if (lAddress1Pincode.value.length!=6){
				document.getElementById('alertaddress1pincode').innerHTML="You have to enter 6 digits for pincode";
				lAddress1Pincode.style.border = "2px solid red";
				errAddress=1;
			}*/
		 } else {
			 if (!hasValue(lAddress3State.value)){
					//alert ("State null....");
					document.getElementById('alertaddress3state').innerHTML="Please enter state";
					lAddress3State.style.border = "2px solid red";
					errAddress=1;
					}	
		  }
		}
	 }
	if (lAddress3Country.value==0){
		//	alert()
			document.getElementById('alertaddress3country').innerHTML="Please enter country";
			lAddress3Country.style.border = "2px solid red";
			errAddress=1;
		} else {
			if (lAddress3Country.value==99) {
				lForm3StateDrop = lForm3State.options[lForm3State.selectedIndex].value;
				if (lForm3StateDrop=="0"){
					document.getElementById('alertaddress3stateDrp').innerHTML="Please select a state";
					lForm3State.style.border = "2px solid red";
					errAddress=1;
				}
				var pincodeVal = lAddress3Pincode.value;
				var stateVal = lForm3StateDrop;
				if (pincodeVal != "") {
					getClientDataAsyncFalse("GET", "", "clientContactInfo/uniquePincode?pincode="+pincodeVal+"&stateId="+stateVal, onAddSuccess);
					function onAddSuccess(uniquePincode){
					//	 alert("mob uniqueMobile "+uniqueMobile);
						if (uniquePincode){
					//		alert("Mobile is not unique in validateClientAddress");
							/*if (!hasValue(pincodeErrmessage)){
								pincodeErrmessage = pincodeErrmessage + ". pincode is not valid.";
							}*/
							document.getElementById('alertaddress3pincode').innerHTML="Pincode is not valid.";
							lAddress3Pincode.style.border = "2px solid red";
							errAddress=1;
						}
					}
				} else {
					document.getElementById('alertaddress3pincode').innerHTML="Please enter a valid Pincode.";
					lAddress3Pincode.style.border = "2px solid red";
					errAddress=1;
				}
				
				if(mode=="Edit"){
					if (pincodeVal != "") {
						getClientDataAsyncFalse("GET", "", "clientContactInfo/uniquePincode?pincode="+pincodeVal+"&stateId="+stateVal, onEditSuccess);
					} else {
						document.getElementById('alertaddress3pincode').innerHTML="Please enter a valid Pincode.";
						lAddress3Pincode.style.border = "2px solid red";
						errAddress=1;
					}
					
					}
				function onEditSuccess(uniquePincode){
					//	 alert("mob uniqueMobile "+uniqueMobile);
						if (uniquePincode){
					//		alert("Mobile is not unique in validateClientAddress");
							/*if (!hasValue(pincodeErrmessage)){
								pincodeErrmessage = pincodeErrmessage + ". pincode is not valid.";
							}*/
							document.getElementById('alertaddress3pincode').innerHTML="Pincode is not valid.";
							lAddress3Pincode.style.border = "2px solid red";
							errAddress=1;
						}
					}
			} else {
				if (!hasValue(lAddress3State.value)){
					//alert ("State null....");
					document.getElementById('alertaddress3state').innerHTML="Please enter state";
					lAddress3State.style.border = "2px solid red";
					errAddress=1;
					}	
			}
		}
		
//		alert("After Country...");
		if(isaddress3Type==false){
			document.getElementById('alertaddress3type').innerHTML="Please select at least one address type";
			errAddress=1;
		}
		
	}
function validateSecondAddress(){
	//alert("inside second");
	if (!hasValue(lAddress2Line1.value)){
	//	alert ("Address null....");
		document.getElementById('alertaddress2line1').innerHTML="Please enter address line1";
		lAddress2Line1.style.border = "2px solid red";
		errAddress=1;
		}	
   //  alert("After Address...");
	//Validate city
	
	if (!hasValue(lAddress2City.value)){
		//alert ("City null....");
		document.getElementById('alertaddress2city').innerHTML="Please enter city";
		lAddress2City.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
		//alert ("City: " + lCity.value);
		var chkAlpha = isChar(lAddress2City.value);
		//alert ("City... after ischar");
		if (!chkAlpha){
			document.getElementById('alertaddress2city').innerHTML="Please enter only alphabets for city";
			lAddress2City.style.border = "2px solid red";
			errAddress=1;
		}
	}
//	alert("After City...");	
	//Validate pincode
	if (!hasValue(lAddress2Pincode.value)){
		//alert ("Pin null....");
		document.getElementById('alertaddress2pincode').innerHTML="Please enter a pincode";
		lAddress2Pincode.style.border = "2px solid red";
		errAddress=1;
		}	
	else {
//		alert ("Pin not null....");
//		alert("Pincode: " + lPincode.value )

		if (!isInteger(lAddress2Pincode.value)){
			document.getElementById('alertaddress2pincode').innerHTML="Please enter enter a valid integer";
			lAddress2Pincode.style.border = "2px solid red";
			errAddress=1;
		}
		else{
			//var countryName=$("#idAddress1Country option:selected").text();
			if(lAddress2Country.value==99){
				//alert("inside INDIA");
				lForm2StateDrop = lForm2State.options[lForm2State.selectedIndex].value;
				if (lForm2StateDrop=="0"){
					document.getElementById('alertaddress2stateDrp').innerHTML="Please select a state";
					lForm2State.style.border = "2px solid red";
					errAddress=1;
				}
			/*if (lAddress1Pincode.value.length!=6){
				document.getElementById('alertaddress1pincode').innerHTML="You have to enter 6 digits for pincode";
				lAddress1Pincode.style.border = "2px solid red";
				errAddress=1;
			}*/
		 } else {
			 if (!hasValue(lAddress2State.value)){
					//alert ("State null....");
					document.getElementById('alertaddress2state').innerHTML="Please enter state";
					lAddress2State.style.border = "2px solid red";
					errAddress=1;
					}	
		  }
		}
	 }
	
	 
	if (lAddress2Country.value==0){
		//	alert()
			document.getElementById('alertaddress2country').innerHTML="Please enter country";
			lAddress2Country.style.border = "2px solid red";
			errAddress=1;
		} else {
			if (lAddress2Country.value==99) {
				lForm2StateDrop = lForm2State.options[lForm2State.selectedIndex].value;
				if (lForm2StateDrop=="0"){
					document.getElementById('alertaddress2stateDrp').innerHTML="Please select a state";
					lForm2State.style.border = "2px solid red";
					errAddress=1;
				}
				
				if (!hasValue(lAddress2Pincode.value)){
					//alert ("Pin null....");
					document.getElementById('alertaddress2pincode').innerHTML="Please enter a pincode";
					lAddress2Pincode.style.border = "2px solid red";
					errAddress=1;
				} else {
					if (!isInteger(lAddress2Pincode.value)){
						document.getElementById('alertaddress2pincode').innerHTML="Please enter enter a valid integer";
						lAddress2Pincode.style.border = "2px solid red";
						errAddress=1;
					} else {
						var pincodeVal = lAddress2Pincode.value;
						var stateVal = lForm2StateDrop;
						if (pincodeVal != "") {
							getClientDataAsyncFalse("GET", "", "clientContactInfo/uniquePincode?pincode="+pincodeVal+"&stateId="+stateVal, onAddSuccess);
							function onAddSuccess(uniquePincode){
							//	 alert("mob uniqueMobile "+uniqueMobile);
								if (uniquePincode){
							//		alert("Mobile is not unique in validateClientAddress");
									/*if (!hasValue(pincodeErrmessage)){
										pincodeErrmessage = pincodeErrmessage + ". pincode is not valid.";
									}*/
									document.getElementById('alertaddress2pincode').innerHTML="Pincode is not valid.";
									lAddress2Pincode.style.border = "2px solid red";
									errAddress=1;
								}
							}
						} else {
							document.getElementById('alertaddress2pincode').innerHTML="Please enter a valid Pincode.";
							lAddress2Pincode.style.border = "2px solid red";
							errAddress=1;
						}
						
						if(mode=="Edit"){
							if (pincodeVal != "") {
								getClientDataAsyncFalse("GET", "", "clientContactInfo/uniquePincode?pincode="+pincodeVal+"&stateId="+stateVal, onEditSuccess);
							} else {
								document.getElementById('alertaddress2pincode').innerHTML="Please enter a valid Pincode.";
								lAddress2Pincode.style.border = "2px solid red";
								errAddress=1;
							}
							
							}
						function onEditSuccess(uniquePincode){
							//	 alert("mob uniqueMobile "+uniqueMobile);
								if (uniquePincode){
							//		alert("Mobile is not unique in validateClientAddress");
									/*if (!hasValue(pincodeErrmessage)){
										pincodeErrmessage = pincodeErrmessage + ". pincode is not valid.";
									}*/
									document.getElementById('alertaddress2pincode').innerHTML="Pincode is not valid.";
									lAddress2Pincode.style.border = "2px solid red";
									errAddress=1;
								}
							}
					}
				}
			} else {
				if (!hasValue(lAddress2State.value)){
					//alert ("State null....");
					document.getElementById('alertaddress2state').innerHTML="Please enter state";
					lAddress2State.style.border = "2px solid red";
					errAddress=1;
				}	
			}
		}
	
	
		
		
		
			
		
			
	
		
//		alert("After Country...");
		if(isaddress2Type==false){
			document.getElementById('alertaddress2type').innerHTML="Please select at least one address type";
			errAddress=1;
		}
		
	}
function clearDiv(){
	lAddress1Line1.style.border = "1px solid #ccc";
	lAddress1City.style.border = "1px solid #ccc";
	lAddress1State.style.border = "1px solid #ccc";
	lAddress1Pincode.style.border = "1px solid #ccc";
	lAddress1Country.style.border = "1px solid #ccc";
	
	lAddress2Line1.style.border = "1px solid #ccc";
	lAddress2City.style.border = "1px solid #ccc";
	lAddress2State.style.border = "1px solid #ccc";
	lAddress2Pincode.style.border = "1px solid #ccc";
	lAddress2Country.style.border = "1px solid #ccc";
	
	lAddress3Line1.style.border = "1px solid #ccc";
	lAddress3City.style.border = "1px solid #ccc";
	lAddress3State.style.border = "1px solid #ccc";
	lAddress3Pincode.style.border = "1px solid #ccc";
	lAddress3Country.style.border = "1px solid #ccc";
	
	document.getElementById('alertaddress1line1').innerHTML="";
	document.getElementById('alertaddress1city').innerHTML="";
	document.getElementById('alertaddress1pincode').innerHTML="";
	document.getElementById('alertaddress1state').innerHTML="";
	document.getElementById('alertaddress1country').innerHTML="";
	document.getElementById('alertaddress1type').innerHTML="";
	
	document.getElementById('alertaddress2line1').innerHTML="";
	document.getElementById('alertaddress2city').innerHTML="";
	document.getElementById('alertaddress2pincode').innerHTML="";
	document.getElementById('alertaddress2state').innerHTML="";
	document.getElementById('alertaddress2country').innerHTML="";
	document.getElementById('alertaddress2type').innerHTML="";
	
	document.getElementById('alertaddress3line1').innerHTML="";
	document.getElementById('alertaddress3city').innerHTML="";
	document.getElementById('alertaddress3pincode').innerHTML="";
	document.getElementById('alertaddress3state').innerHTML="";
	document.getElementById('alertaddress3country').innerHTML="";
	document.getElementById('alertaddress3type').innerHTML="";
}
function  div1Clear(){
	 if($('#idDivAddress1').is(':visible')){
		 if(!hasValue(lAddress1Line1.value) && !hasValue(lAddress1Line2.value) && !hasValue(lAddress1Line3.value) && !hasValue(lAddress1City.value)
				 && !hasValue(lAddress1State.value) && !hasValue(lAddress1Pincode.value) && (lAddress1Country.value==0) &&  isaddress1Type==false)
			 {
			    lAddress1Line1.style.border = "1px solid #ccc";
				lAddress1City.style.border = "1px solid #ccc";
				lAddress1State.style.border = "1px solid #ccc";
				lAddress1Pincode.style.border = "1px solid #ccc";
				lAddress1Country.style.border = "1px solid #ccc";
				
				document.getElementById('alertaddress1line1').innerHTML="";
				document.getElementById('alertaddress1city').innerHTML="";
				document.getElementById('alertaddress1pincode').innerHTML="";
				document.getElementById('alertaddress1state').innerHTML="";
				document.getElementById('alertaddress1country').innerHTML="";
				document.getElementById('alertaddress1type').innerHTML="";
			 }
	 }
}
function  div2Clear(){
	if($('#idDivAddress2').is(':visible')){
		 if(!hasValue(lAddress2Line1.value) && !hasValue(lAddress2Line2.value) && !hasValue(lAddress2Line3.value) && !hasValue(lAddress2City.value)
				 && !hasValue(lAddress2State.value) && !hasValue(lAddress2Pincode.value) && (lAddress2Country.value==0) &&  isaddress2Type==false)
			 {
			    lAddress2Line1.style.border = "1px solid #ccc";
				lAddress2City.style.border = "1px solid #ccc";
				lAddress2State.style.border = "1px solid #ccc";
				lAddress2Pincode.style.border = "1px solid #ccc";
				lAddress2Country.style.border = "1px solid #ccc";
				
				document.getElementById('alertaddress2line1').innerHTML="";
				document.getElementById('alertaddress2city').innerHTML="";
				document.getElementById('alertaddress2pincode').innerHTML="";
				document.getElementById('alertaddress2state').innerHTML="";
				document.getElementById('alertaddress2country').innerHTML="";
				document.getElementById('alertaddress2type').innerHTML="";
			 }
	 }
}
function  div3Clear(){
	if($('#idDivAddress3').is(':visible')){
		 if(!hasValue(lAddress3Line1.value) && !hasValue(lAddress3Line2.value) && !hasValue(lAddress3Line3.value) && !hasValue(lAddress3City.value)
				 && !hasValue(lAddress3State.value) && !hasValue(lAddress3Pincode.value) && (lAddress3Country.value==0) &&  isaddress3Type==false)
			 {
			    lAddress3Line1.style.border = "1px solid #ccc";
				lAddress3City.style.border = "1px solid #ccc";
				lAddress3State.style.border = "1px solid #ccc";
				lAddress3Pincode.style.border = "1px solid #ccc";
				lAddress3Country.style.border = "1px solid #ccc";
				
				document.getElementById('alertaddress3line1').innerHTML="";
				document.getElementById('alertaddress3city').innerHTML="";
				document.getElementById('alertaddress3pincode').innerHTML="";
				document.getElementById('alertaddress3state').innerHTML="";
				document.getElementById('alertaddress3country').innerHTML="";
				document.getElementById('alertaddress3type').innerHTML="";
			 }
	 }
}
function initialize(){
	 lAddress1Line1=document.getElementById("idAddress1Line1");
	 lAddress1Line2=document.getElementById("idAddress1Line2");
	 lAddress1Line3=document.getElementById("idAddress1Line3");
	 lAddress1City=document.getElementById("idAddress1City");
	 lAddress1State=document.getElementById("idAddress1State");
	 lAddress1Pincode=document.getElementById("idAddress1Pincode");
	 lAddress1Country=document.getElementById("idAddress1Country");

	
	 lAddress2Line1=document.getElementById("idAddress2Line1");
	 lAddress2Line2=document.getElementById("idAddress2Line2");
	 lAddress2Line3=document.getElementById("idAddress2Line3");
	 lAddress2City=document.getElementById("idAddress2City");
	 lAddress2State=document.getElementById("idAddress2State");
	 lAddress2Pincode=document.getElementById("idAddress2Pincode");
	 lAddress2Country=document.getElementById("idAddress2Country");
	 laddress2Type=document.getElementById("address2Type");
	
	 lAddress3Line1=document.getElementById("idAddress3Line1");
	 lAddress3Line2=document.getElementById("idAddress3Line2");
	 lAddress3Line3=document.getElementById("idAddress3Line3");
	 lAddress3City=document.getElementById("idAddress3City");
	 lAddress3State=document.getElementById("idAddress3State");
	 lAddress3Pincode=document.getElementById("idAddress3Pincode");
	 lAddress3Country=document.getElementById("idAddress3Country");
	 laddress3Type=document.getElementById("address3Type");
}

function Div1ClearAll(){
	lAddress1Line1.style.border = "1px solid #ccc";
	lAddress1City.style.border = "1px solid #ccc";
	lAddress1State.style.border = "1px solid #ccc";
	lAddress1Pincode.style.border = "1px solid #ccc";
	lAddress1Country.style.border = "1px solid #ccc";
	
	document.getElementById('alertaddress1line1').innerHTML="";
	document.getElementById('alertaddress1city').innerHTML="";
	document.getElementById('alertaddress1pincode').innerHTML="";
	document.getElementById('alertaddress1state').innerHTML="";
	document.getElementById('alertaddress1country').innerHTML="";
	document.getElementById('alertaddress1type').innerHTML="";
}
function Div2ClearAll(){
	lAddress2Line1.style.border = "1px solid #ccc";
	lAddress2City.style.border = "1px solid #ccc";
	lAddress2State.style.border = "1px solid #ccc";
	lAddress2Pincode.style.border = "1px solid #ccc";
	lAddress2Country.style.border = "1px solid #ccc";
	
	document.getElementById('alertaddress2line1').innerHTML="";
	document.getElementById('alertaddress2city').innerHTML="";
	document.getElementById('alertaddress2pincode').innerHTML="";
	document.getElementById('alertaddress2state').innerHTML="";
	document.getElementById('alertaddress2country').innerHTML="";
	document.getElementById('alertaddress2type').innerHTML="";
}

function validateForm(form,jsonString){
	//alert("In UCC General validation");
	//var jsonData = JSON.stringify(jsonString);
	
	//alert(jsonData);
	//alert(jsonString.guardianName);
	var lClientCode = document.getElementById("idClientCode");
	var lHolding = document.getElementById("idHolding");
	var lClientName = document.getElementById("idClientAppli");
	var lDob = document.getElementById("idDateOfBirth");
	var lGender = document.getElementById("idGender");
	var lOcc = document.getElementById("idOccupation");
	var lTaxStatus = document.getElementById("idTaxStatus");
	var lSecondName = document.getElementById("idsecondclientAppli");
	var lThirdName = document.getElementById("idThirdclientAppli");
 	var lGuardName = document.getElementById("idGuardianName");	
	var lNomName = document.getElementById("idNomineeName");
	var lNomRel = document.getElementById("idNomineeRelation");
 	
	var errUCC=0;
    
	lClientCode.style.border ="1px solid #ccc";
	lHolding.style.border = "1px solid #ccc";
	lClientName.style.border = "1px solid #ccc";
	lDob.style.border ="1px solid #ccc";
	lGender.style.border ="1px solid #ccc";
	lOcc.style.border ="1px solid #ccc";
    lTaxStatus.style.border ="1px solid #ccc";
    lSecondName.style.border ="1px solid #ccc";
    lThirdName.style.border ="1px solid #ccc";
    lGuardName.style.border ="1px solid #ccc";
    lNomName.style.border = "1px solid #ccc";
    lNomRel.style.border = "1px solid #ccc";
    
    document.getElementById('alertFormGeneral').innerHTML="";
    
    document.getElementById('alertClientCode').innerHTML="";
    document.getElementById('alertHolding').innerHTML="";
    document.getElementById('alertClientAppli').innerHTML="";
    document.getElementById('alertDateOfBirth').innerHTML="";
    document.getElementById('alertGender').innerHTML="";
    document.getElementById('alertOcc').innerHTML="";
	document.getElementById('alertTaxStatus').innerHTML="";
	document.getElementById('alertSecondApplicant').innerHTML="";
	document.getElementById('alertThirdApplicant').innerHTML="";
	document.getElementById('alertGuardianName').innerHTML="";
	document.getElementById('alertNomName').innerHTML="";
	document.getElementById('alertNomRel').innerHTML="";
	
	
	//*************** Validation for Client Code *****************
	var clientCode = lClientCode.value;
	if(!hasValue(clientCode)){
		document.getElementById('alertClientCode').innerHTML="Please enter Client Code";
		lClientCode.style.border = "2px solid red";
		errUCC=1;
	}
	
	//*************** Validation for Holding *********************
	var holdingType = lHolding.options[lHolding.selectedIndex].value;
	if(!hasValue(holdingType)){
		document.getElementById('alertHolding').innerHTML="Please select Holding";
		lHolding.style.border = "2px solid red";
		errUCC=1;
	}
	
	//*************** Validation for Client Name *****************
	var clientName = lClientName.value;
	if(!hasValue(clientName)){
		document.getElementById('alertClientAppli').innerHTML="Please enter Client Alplicant Name";
		lClientName.style.border = "2px solid red";
		errUCC=1;
	}
	
	//*************** Validation for Client DOB *****************
	var dob = lDob.value;
	if(!hasValue(dob)){
		document.getElementById('alertDateOfBirth').innerHTML="Please enter Date of Birth of first applicant";
		lDob.style.border = "2px solid red";
		errUCC=1;
	}
	
	//*************** Validation for Gender *********************
	var gender = lGender.value;
	if(!hasValue(gender)){
		document.getElementById('alertGender').innerHTML="Please select Gender";
		lGender.style.border = "2px solid red";
		errUCC=1;
	}
	
	//*************** Validation for Occupation *********************
	var occType = lOcc.options[lOcc.selectedIndex].value;
	if(!hasValue(occType)){
		document.getElementById('alertOcc').innerHTML="Please select Occupation";
		lOcc.style.border = "2px solid red";
		errUCC=1;
	}
	
	//*************** Validation for TAX Status *********************
	var taxType = lTaxStatus.options[lTaxStatus.selectedIndex].value;
	if(!hasValue(taxType)){
		document.getElementById('alertTaxStatus').innerHTML="Please select Tax Status";
		lTaxStatus.style.border = "2px solid red";
	    errUCC=1;
	}
	
	//*************** Validation for Second Applicant Name: *****************
	var secName = lSecondName.value;
	if(jsonString.secondApplicantName != null && jsonString.secondApplicantName != ""){
		if(!hasValue(secName)){
			document.getElementById('alertSecondApplicant').innerHTML="Please enter Second Applicant Name";
			lSecondName.style.border = "2px solid red";
			errUCC=1;
		}
	}
	
	
	//*************** Validation for Third Applicant Name: *****************
	var thName = lThirdName.value;
	if(jsonString.thirdApplicantName != null && jsonString.thirdApplicantName != ""){
		if(!hasValue(thName)){
			document.getElementById('alertThirdApplicant').innerHTML="Please enter Third Applicant Name";
			lThirdName.style.border = "2px solid red";
			errUCC=1;
		}
	}
	
	//*************** Validation for Guardian Name: *****************
	var gName = lGuardName.value;
	//alert("gName "+gName);
	//alert(jsonString.guardianName);
	if(jsonString.guardianName != null && jsonString.guardianName != ""){
		//alert("gName "+gName);
		if(!hasValue(gName)){
			document.getElementById('alertGuardianName').innerHTML="Please enter Guardian Name";
			lGuardName.style.border = "2px solid red";
		    errUCC=1;
		}
	}
	
	
	
	//*************** Validation for Nominee Name and Nominee Relation *********************
	
	var nomName = lNomName.value;
	var nomRel = lNomRel.value;
	//alert("nomName: "+nomName);
	if(hasValue(nomName)){
		if(!hasValue(nomRel)){
			document.getElementById('alertNomRel').innerHTML="Please enter Nominee Relation";
			lNomRel.style.border = "2px solid red";
			errUCC = 1;
		}
	}
	
	if(hasValue(nomRel)){
		if(!hasValue(nomName)){
			document.getElementById('alertNomName').innerHTML = "Please enter Nominee Name";
			lNomName.style.border = "2px solid red";
			errUCC = 1;
		}
	}
	
	
	/*var holding = document.getElementById("idsecondclientAppli");
	if(holding.style.visibility = "visible"){
		alert("Visible");
	}
	else{
		alert("Hidden");
	}*/
	
	
	//alert("After Current Balance validation: " + errCash);
	//return false;
	if (errUCC == 1){
		//console.log("Validation Error in UCC General Creation");
		//alert("Validation Error in UCC General Creation");
		document.getElementById('alertFormGeneral').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		//console.log("Not an Error");
		//alert("Not an Error");
		document.getElementById('alertFormGeneral').innerHTML="";
		return true;
	}
	
}
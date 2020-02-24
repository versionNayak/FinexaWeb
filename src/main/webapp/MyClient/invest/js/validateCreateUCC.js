function validateAddCreateUCC(form,minor)
{
	var lFirstName = document.getElementById("idFirstApplicantName");
	var lFirstPan = document.getElementById("idFirstApplicantPan");
	var lSecondName = document.getElementById("idSecondApplicantName");
	var lSecondPan = document.getElementById("idSecondApplicantPan");
	var lThirdName = document.getElementById("idThirdApplicantName");
	var lThirdPan = document.getElementById("idThirdApplicantPan");
	var lGuardName = document.getElementById("idGuardianName");
	var lGuardPan = document.getElementById("idGuardianPan");
	var lUcc = document.getElementById("idUCCNumber");
	var errMF = 0;
	
	
	lFirstName.style.border = "1px solid #ccc";
	lFirstPan.style.border = "1px solid #ccc";
	lSecondName.style.border = "1px solid #ccc";
	lSecondPan.style.border = "1px solid #ccc";
	lThirdName.style.border = "1px solid #ccc";
	lThirdPan.style.border = "1px solid #ccc";
	lGuardName.style.border = "1px solid #ccc";
	lGuardPan.style.border = "1px solid #ccc";
	lUcc.style.border = "1px solid #ccc";
	
    document.getElementById('alertFirstApplicantName').innerHTML = "";
	document.getElementById('alertFirstApplicantPan').innerHTML = "";
	document.getElementById('alertSecondApplicantName').innerHTML = "";
	document.getElementById('alertSecondPan').innerHTML = "";
	document.getElementById('alertThirdApplicantName').innerHTML = "";
	document.getElementById('alertThirdApplicantPan').innerHTML = "";
	document.getElementById('alertGuardianName').innerHTML = "";
	document.getElementById('alertGuardianPan').innerHTML = "";
	document.getElementById('alertUCCNumber').innerHTML = "";
	
	
	//variables
	var ftName = lFirstName.value;
	//alert("fistName"+ftName);
	var scName = lSecondName.value;
	//alert("scName "+scName);
	var thName = lThirdName.value;
	//alert("thName "+thName);
	var guardName = lGuardName.value;
	//alert("guardName "+guardName);
	var ftPan = lFirstPan.value;
	//alert("ftPan "+ftPan);
	var scPan = lSecondPan.value;
	//alert("scPan "+scPan);
	var thPan = lThirdPan.value;
	//alert("thPan "+thPan);
	var guardPan = lGuardPan.value;
	//alert("guardPan "+guardPan);
	var ucc = lUcc.value;
	//alert("ucc "+ucc);

	
	
	//validate First PAN if first Applicant is not Minor
	if (minor > 0) {
		
	} else {
		
		//validate First Name
		if(!hasValue(ftName)){
			document.getElementById('alertFirstApplicantName').innerHTML="Please enter First Applicant Name";
			lFirstName.style.border = "2px solid red";
			errMF=1;
		}
		
		//validate First PAN
		if(!hasValue(ftPan)){
			document.getElementById('alertFirstApplicantPan').innerHTML="Please enter First Applicant Pan";
			lFirstPan.style.border = "2px solid red";
			errMF=1;
		}
	}
	
	
	if (hasValue(scName)) {
		if(!hasValue(scPan)){
			document.getElementById('alertSecondPan').innerHTML="Please enter Second Applicant PAN";
			lSecondPan.style.border = "2px solid red";
			errMF=1;
		}
		else if(!validatePan(scPan)){
			document.getElementById('alertSecondPan').innerHTML="Please enter Correct PAN for Second Applicant";
			lSecondPan.style.border = "2px solid red";
			errMF=1;
		}
		else if(ftPan == scPan){
			document.getElementById('alertSecondPan').innerHTML="PAN for First Applicant and Second Applicant can not be same";
			lSecondPan.style.border = "2px solid red";
			errMF=1;
		}
	}
	
	if (hasValue(thName)) {
		if(!hasValue(thPan)){
			document.getElementById('alertThirdApplicantPan').innerHTML="Please enter Third Applicant PAN";
			lThirdPan.style.border = "2px solid red";
			errMF=1;
		}
		else if(!validatePan(thPan)){
			document.getElementById('alertThirdApplicantPan').innerHTML="Please enter Correct PAN for Third Applicant";
			lThirdPan.style.border = "2px solid red";
			errMF=1;
		}
		else if((ftPan == thPan) && (scPan == thPan)){
			document.getElementById('alertFirstApplicantPan').innerHTML="PAN for First Applicant, Second Applicant and Third Applicant can not be same";
			document.getElementById('alertSecondPan').innerHTML="PAN for First Applicant, Second Applicant and Third Applicant can not be same";
			document.getElementById('alertThirdApplicantPan').innerHTML="PAN for First Applicant, Second Applicant and Third Applicant can not be same";
			lThirdPan.style.border = "2px solid red";
			errMF=1;
		}
		else if(ftPan == thPan){
			document.getElementById('alertThirdApplicantPan').innerHTML="PAN for First Applicant and Third Applicant can not be same";
			lThirdPan.style.border = "2px solid red";
			errMF=1;
		}
		else if(scPan == thPan){
			document.getElementById('alertThirdApplicantPan').innerHTML="PAN for Second Applicant and Third Applicant can not be same";
			lThirdPan.style.border = "2px solid red";
			errMF=1;
		}
	}
	
	
	//validate Guardian Name and Guardian PAN
	
	if(minor > 0){
		
		//validate Guardian Name
		if(!hasValue(guardName)){
			document.getElementById('alertGuardianName').innerHTML="Please enter Guardian Name";
			lGuardName.style.border = "2px solid red";
			errMF=1;
		}
		
		//validate Guardian PAN
		if(!hasValue(guardPan)){
			document.getElementById('alertGuardianPan').innerHTML="Please enter Guardian Pan";
			lGuardPan.style.border = "2px solid red";
			errMF=1;
		}
		else if(!validatePan(guardPan)){
			document.getElementById('alertGuardianPan').innerHTML="Please enter Correct PAN for Guardian";
			lGuardPan.style.border = "2px solid red";
			errMF=1;
		}
		else if((ftPan == guardPan) && (scPan == guardPan) && (thPan == guardPan)){
			document.getElementById('alertFirstApplicantPan').innerHTML="PAN for First Applicant, Second Applicant, Third Applicant and Guardian can not be same";
			document.getElementById('alertSecondPan').innerHTML="PAN for First Applicant, Second Applicant, Third Applicant and Guardian can not be same";
			document.getElementById('alertThirdApplicantPan').innerHTML="PAN for First Applicant, Second Applicant, Third Applicant and Guardian can not be same";
			document.getElementById('alertGuardianPan').innerHTML="PAN for First Applicant, Second Applicant, Third Applicant and Guardian can not be same";
			
			//lFirstPan.style.border = "2px solid red";
			//lSecondPan.style.border = "2px solid red";
			//lThirdPan.style.border = "2px solid red";
			lGuardPan.style.border = "2px solid red";
			
			errMF=1;
		}
		else if(ftPan == guardPan){
			document.getElementById('alertFirstApplicantPan').innerHTML="PAN for First Applicant and Guardian can not be same";
			document.getElementById('alertGuardianPan').innerHTML="PAN for First Applicant and Guardian can not be same";
			lFirstPan.style.border = "2px solid red";
			lGuardPan.style.border = "2px solid red";
			errMF=1;
		}
		else if(scPan == guardPan){
			document.getElementById('alertSecondPan').innerHTML="PAN for Second Applicant and Guardian can not be same";
			document.getElementById('alertGuardianPan').innerHTML="PAN for First Applicant and Guardian can not be same";
			lSecondPan.style.border = "2px solid red";
			lGuardPan.style.border = "2px solid red";
			errMF=1;
		}
		else if(thPan == guardPan){
			document.getElementById('alertThirdApplicantPan').innerHTML="PAN for Third Applicant and Guardian can not be same";
			document.getElementById('alertGuardianPan').innerHTML="PAN for Third Applicant and Guardian can not be same";
			lThirdPan.style.border = "2px solid red";
			lGuardPan.style.border = "2px solid red";
			errMF=1;
		}
		
	}
	
	
	
	//validate UCC No.
	if(!hasValue(ucc)){
		document.getElementById('alertUCCNumber').innerHTML="Please enter UCC No.";
		lUcc.style.border = "2px solid red";
		errMF=1;
	}
	
	if (errMF==1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		console.log("Not an Error");
		return true;
	}
	
	
}
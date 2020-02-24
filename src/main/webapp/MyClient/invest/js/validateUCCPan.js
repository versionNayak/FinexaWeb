function validateUCCPanForm(form,jsonString){
	
	var lFirstPan = document.getElementById("idfirstAppliPan");
	var lSecondPan = document.getElementById("idSecondApplicantPAN");
	var lThirdPan = document.getElementById("idThirdApplicantPAN");
	var lGuarName = document.getElementById("idGuardianPAN");
    
	var errUCC=0;
    
	lFirstPan.style.border ="1px solid #ccc";
    lSecondPan.style.border ="1px solid #ccc";
    lThirdPan.style.border ="1px solid #ccc";
    lGuarName.style.border ="1px solid #ccc";
	
    
	
	document.getElementById('alertFirstAppli').innerHTML="";
	document.getElementById('alertSecAppli').innerHTML="";
	document.getElementById('alertThirdAppli').innerHTML="";
	document.getElementById('alertGName').innerHTML="";
	
    
	var pan1 = lFirstPan.value;
	if(pan1=""){
		document.getElementById('alertOcc').innerHTML="Please enter First Applicant Pan";
		lCashBalanceType.style.border = "2px solid red";
		errUCC=1;
	}
	
    
    
    //*************** Validation for Second Pan *********************
	var pan2 = lSecondPan.value;
	if(jsonString.secondApplicantName != null && jsonString.secondApplicantName != ""){
		if(hasValue(pan2)){
			document.getElementById('alertSecAppli').innerHTML="Please enter Second Applicant PAN";
			lSecondPan.style.border = "2px solid red";
			errUCC=1;
		}
	}
	
	//*************** Validation for Third Pan *********************
    var pan3 = lThirdPan.value;
    if(jsonString.thirdApplicantName != null && jsonString.thirdApplicantName != ""){
    	if(hasValue(pan3)){
    		document.getElementById('alertThirdAppli').innerHTML="Please enter Third Applicant PAN";
    		lThirdPan.style.border = "2px solid red";
    		errUCC=1;
    	}
    }
	
	var gname = lGuarName.value;
	if(jsonString.guardianName != null && jsonString.guardianName != ""){
		if(gname=""){
			document.getElementById('alertGName').innerHTML="Please enter Guardian Name";
			lCashBalanceType.style.border = "2px solid red";
			errUCC=1;
		}
	}
	
	if (errUCC==1 ){
		//console.log("Validation Error in UCC Pan");
//		alert("Validation Error in UCC Pan");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		console.log("Not an Error");
		return true;
	}
	
}
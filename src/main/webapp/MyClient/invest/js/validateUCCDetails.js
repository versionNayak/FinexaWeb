function validateUCCCkycDetailsForm(form,jsonString){
	//alert("In UCC CKYC Details");
	
	var lKYCType1 = document.getElementById("idKYCFirstApplicant");
	var lCKYC1 = document.getElementById("idCKYCFirstApplicant");
	var lKYCType2 = document.getElementById("idKYCTypeSecondApplicant");
	var lCKYC2 = document.getElementById("idCKYCSecondApplicant");
	var ldob2 = document.getElementById("idSecondAppliDOB");
	var lKYCType3 = document.getElementById("idKYCThirdApplicant");
	var lCKYC3 = document.getElementById("idCKYCThirdApplicant");
	var ldob3 = document.getElementById("idThirdAppliDOB");
	var lKYCTypeGuard = document.getElementById("idKycTypeGuardian");
	var lCKYCGuard = document.getElementById("idCKYCGuardian");
	var ldobGuard = document.getElementById("idGuardianDOB");
	
	var errUCC=0;
	
	/* Pls Delete
	var lBranch = document.getElementById("idBranch");
	//var lStatus = document.getElementById("idStatus");
	var lDivPayMode = document.getElementById("idDividendPaymentMode");
	var lDepoDetails = document.getElementById("idDepositoryDetails");
	var lDepoName = document.getElementById("idDepositoryName");
	var lDpId = document.getElementById("idDPID");
	var lBenAccNo = document.getElementById("idBeneficiaryAccNo");
	var lCommMode = document.getElementById("idCommunicationMode");
	*/
    
	
	lKYCType1.style.border ="1px solid #ccc";
	lCKYC1.style.border ="1px solid #ccc";
    lKYCType2.style.border ="1px solid #ccc";
    lCKYC2.style.border ="1px solid #ccc";
    ldob2.style.border ="1px solid #ccc";
    lKYCType3.style.border ="1px solid #ccc";
    lCKYC3.style.border ="1px solid #ccc";
    ldob3.style.border ="1px solid #ccc";
    lKYCTypeGuard.style.border ="1px solid #ccc";
    lCKYCGuard.style.border ="1px solid #ccc";
    ldobGuard.style.border ="1px solid #ccc";
    
    /* Pls delete
    lBranch.style.border ="1px solid #ccc";
    //lStatus.style.border ="1px solid #ccc";
    lDivPayMode.style.border ="1px solid #ccc";
    lDepoDetails.style.border ="1px solid #ccc";
    lDepoName.style.border ="1px solid #ccc";
    lDpId.style.border ="1px solid #ccc";
    lBenAccNo.style.border ="1px solid #ccc";
    lCommMode.style.border ="1px solid #ccc";
    
	*/
    
    
    document.getElementById('alertKYCType1').innerHTML="";
	document.getElementById('alertCKYCNo1').innerHTML="";
	document.getElementById('alertKYCType2').innerHTML="";
	document.getElementById('alertCKYCNo2').innerHTML="";
	document.getElementById('alertDOB2').innerHTML="";
	document.getElementById('alertKYCType3').innerHTML="";
	document.getElementById('alertCKYCNo3').innerHTML="";
	document.getElementById('alertDOB3').innerHTML="";
	document.getElementById('alertKYCTypeGuard').innerHTML="";
	document.getElementById('alertCKYCTypeGuard').innerHTML="";
	document.getElementById('alertGuardianDOB').innerHTML="";
	
	/* Pls Delete this
	document.getElementById('alertBranch').innerHTML="";
	document.getElementById('alertStatus').innerHTML="";
	document.getElementById('alertDivPayMode').innerHTML="";
	document.getElementById('alertDepoDetails').innerHTML="";
	document.getElementById('alertDepoName').innerHTML="";
	document.getElementById('alertDpId').innerHTML="";
	document.getElementById('alertBenAccNo').innerHTML="";
	document.getElementById('alertCommMode').innerHTML="";
	
    */
	
	var kycType1 = lKYCType1.options[lKYCType1.selectedIndex].value;
	//if(kycType1 = "")
	if(!hasValue(kycType1)){
		document.getElementById('alertKYCType1').innerHTML="Please select KYC Type for First Applicant";
		lKYCType1.style.border = "2px solid red";
		errUCC=1;
	}
	
    var ckyc1 = lCKYC1.value;
	//if(ckyc1 = "")
    if(!hasValue(ckyc1)){
		document.getElementById('alertCKYCNo1').innerHTML="Please enter CKYC No. for First Applicant";
		lCKYC1.style.border = "2px solid red";
		errUCC=1;
	}
	
    
    if(jsonString.secondApplicantName != ""){
		var kycType2 = lKYCType2.options[lKYCType2.selectedIndex].value;
		//if(kycType2 = "")
		if(!hasValue(kycType2)){
			document.getElementById('alertKYCType2').innerHTML="Please select KYC Type for Second Applicant";
			lKYCType2.style.border = "2px solid red";
			errUCC=1;
		}
		
	    var ckyc2 = lCKYC2.value;
		//if(ckyc2 = "")
	    if(!hasValue(ckyc2)){
			document.getElementById('alertCKYCNo2').innerHTML="Please enter CKYC No. for Second Applicant";
			lCKYC2.style.border = "2px solid red";
			errUCC=1;
		}
		
	    var dob2 = ldob2.value;
		//if(ckyc2 = "")
	    if(!hasValue(dob2)){
			document.getElementById('alertDOB2').innerHTML="Please select Date of Birth for Second Applicant";
			ldob2.style.border = "2px solid red";
			errUCC=1;
		}
    
    }
	    
    if(jsonString.thirdApplicantName != ""){
		var kycType3 = lKYCType3.options[lKYCType3.selectedIndex].value;
		//if(kycType3 = "")
		if(!hasValue(kycType3)){
			document.getElementById('alertKYCType3').innerHTML="Please select KYC Type for Third Applicant";
			lKYCType3.style.border = "2px solid red";
			errUCC=1;
		}
		
	    var ckyc3 = lCKYC3.value;
		//if(ckyc3 = "")
	    if(!hasValue(ckyc3)){
			document.getElementById('alertCKYCNo3').innerHTML="Please enter CKYC No. for Third Applicant";
			lCKYC3.style.border = "2px solid red";
			errUCC=1;
		}
		
		var dob3 = ldob3.value;
		//if(ckyc2 = "")
	    if(!hasValue(dob3)){
			document.getElementById('alertDOB3').innerHTML="Please select Date of Birth for Third Applicant";
			ldob3.style.border = "2px solid red";
			errUCC=1;
		}
    
    }
	
	
	if(jsonString.guardianName != ""){
		
		var kycGuard = lKYCTypeGuard.options[lKYCTypeGuard.selectedIndex].value;
		//if(kycType3 = "")
		if(!hasValue(kycGuard)){
			document.getElementById('alertKYCTypeGuard').innerHTML="Please select KYC Type for Guardian";
			lKYCTypeGuard.style.border = "2px solid red";
			errUCC=1;
		}
		
	    var ckycGuard = lCKYCGuard.value;
		//if(ckyc3 = "")
	    if(!hasValue(ckycGuard)){
			document.getElementById('alertCKYCTypeGuard').innerHTML="Please enter CKYC No. for Guardian";
			lCKYCGuard.style.border = "2px solid red";
			errUCC=1;
		}
		
	    var dobGuard = ldobGuard.value;
		//if(ckyc2 = "")
	    if(!hasValue(dobGuard)){
			document.getElementById('alertGuardianDOB').innerHTML="Please select Date of Birth for Guardian";
			ldobGuard.style.border = "2px solid red";
			errUCC=1;
		}
    
	}
    
//-------------------------Pls Delete From here---------------------------
   /* var branch = lBranch.value;
	//if(branch = "")
	if(!hasValue(branch)){
		document.getElementById('alertBranch').innerHTML="Please enter Branch";
		lBranch.style.border = "2px solid red";
		errUCC=1;
	}*/
	
	/*var status = lStatus.options[lStatus.selectedIndex].value;
	//if(status = "")
	if(!hasValue(status)){
		document.getElementById('alertStatus').innerHTML="Please select Status ";
		lStatus.style.border = "2px solid red";
		errUCC=1;
	}*/
	
	/*var divPayMode = lDivPayMode.options[lDivPayMode.selectedIndex].value;
	//if(divPayMode = "")
	if(!hasValue(divPayMode)){
		document.getElementById('alertDivPayMode').innerHTML="Please select Dividend Payment Mode ";
		lDivPayMode.style.border = "2px solid red";
		errUCC=1;
	}*/
	
    /*
	var depoDetails = lDepoDetails.options[lDepoDetails.selectedIndex].value;
	//if(depoDetails = "")
	alert("depoDetails "+depoDetails);
	if(!hasValue(depoDetails)){
		document.getElementById('alertDepoDetails').innerHTML="Please select Depository Details ";
		lDepoDetails.style.border = "2px solid red";
		errUCC=1;
	}
	else if(depoDetails==2){
		alert("Inside depoDetails "+depoDetails);
		
		var depoName = lDepoName.options[lDepoName.selectedIndex].value;
		//if(depoName = "")
		if(!hasValue(depoName)){
			document.getElementById('alertDepoName').innerHTML="Please select Depository Name ";
			lDepoName.style.border = "2px solid red";
			errUCC=1;
		}
		
		var dpId = lDpId.value;
		//if(dpId="")
		if(!hasValue(dpId)){
			document.getElementById('alertDpId').innerHTML="Please enter DP Id";
			lDpId.style.border = "2px solid red";
			errUCC=1;
		}
		
		var benAccNo = lBenAccNo.value;
		//if(benAccNo = "")
		if(!hasValue(benAccNo)){
			document.getElementById('alertBenAccNo').innerHTML="Please enter Beneficiary Account Number";
			lBenAccNo.style.border = "2px solid red";
			errUCC=1;
		}
		
	
	}
	
	*/
	/*
	var commMode = lCommMode.options[lCommMode.selectedIndex].value;
	//if(commMode = "")
	if(!hasValue(commMode)){
		document.getElementById('alertCommMode').innerHTML="Please select Communication Mode ";
		lCommMode.style.border = "2px solid red";
		errUCC=1;
	}
	*/
	
//--------------------------- Delete UPto here-----------------------------------	
	
	
	//alert("After Current Balance validation: " + errCash);
	//return false;
	//alert(errUCC);
	if (errUCC==1 ){
		//console.log("Validation Error in UCC Contact");
		//alert("Validation Error in UCC Contact");
		document.getElementById('alertFormCkyc').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		//alert("Not an Error");
		document.getElementById('alertFormCkyc').innerHTML="";
		return true;
	}
	
}

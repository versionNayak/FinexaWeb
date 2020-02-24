function validateUCCBankDetailForm(form){
	//console.log("In UCC Bank Details");
	//alert("Hi");
	
	var lBankAccType = document.getElementById("idAcountType");
	var lBankAcc = document.getElementById("idBankAccountNumber");
	var lBankName = document.getElementById("idBankName");
	var lIfsc = document.getElementById("idIFSCcode");
	var lMicr = document.getElementById("idMICRcode");
	//var lDefaultBankAcc = document.getElementById("idWetherDefaultBankAccount");
    var errUCC=0;
    var countBankValidation = sessionStorage.getItem("MAX_BANK");
    var i, j;
    //alert(countBank);
    
    lBankAccType.style.border ="1px solid #ccc";
    lBankAcc.style.border ="1px solid #ccc";
    lBankName.style.border ="1px solid #ccc";
    lIfsc.style.border ="1px solid #ccc";
    lMicr.style.border ="1px solid #ccc";
    //lDefaultBankAcc.style.border ="1px solid #ccc";
    
    document.getElementById('alertFormBank').innerHTML="";
	document.getElementById('alertBkAcc').innerHTML="";
	document.getElementById('alertBkName').innerHTML="";
	document.getElementById('alertIfsc').innerHTML="";
	document.getElementById('alertMicr').innerHTML="";
	document.getElementById('alertBkAccType').innerHTML="";
	
	//document.getElementById('alertDefaultBankAcc').innerHTML="";
	
	var accType = lBankAccType.options[lBankAccType.selectedIndex].value;
	if(!hasValue(accType)){
		document.getElementById('alertBkAccType').innerHTML="Please select Account Type";
		lBankAccType.style.border = "2px solid red";
		errUCC=1;
	}
	
    var bkAcc = lBankAcc.value;
	if(!hasValue(bkAcc)){
		document.getElementById('alertBkAcc').innerHTML="Please enter Bank Acccount No. ";
		lBankAcc.style.border = "2px solid red";
		errUCC=1;
	}
	
    var ifsc = lIfsc.value;
    if(!hasValue(ifsc)){
		document.getElementById('alertIfsc').innerHTML="Please enter IFSC Code";
		lIfsc.style.border = "2px solid red";
		errUCC=1;
	}
    
    /*
	var bkName = lBankName.value;
	if(!hasValue(bkName)){
		document.getElementById('alertBkName').innerHTML="Please enter Bank Name ";
		lBankName.style.border = "2px solid red";
		errUCC=1;
	}
	
	var micr = lMicr.value;
	if(!hasValue(micr)){
		document.getElementById('alertMicr').innerHTML="Please enter MICR No.";
		lMicr.style.border = "2px solid red";
		errUCC=1;
	}
	*/
    
    /*var defAcc = lDefaultBankAcc.value;
    if(!hasValue(defAcc)){
		document.getElementById('alertDefaultBankAcc').innerHTML="Please enter Default Bank Account ";
		lDefaultBankAcc.style.border = "2px solid red";
		errUCC=1;
	}*/
    
    
    if(countBankValidation){
    	alert("countBankValidation "+countBankValidation);
    	for(i = 1; i <= countBankValidation; i ++){
    		j = i + 1;
    		//alert("idBankName" + j);
    		/*var lBankAcc = document.getElementById(("idBankAccountNumber" + i));
        	var lBankName = document.getElementById(("idBankName" + i));
        	var lIfsc = document.getElementById(("idIFSCcode" + i));
        	var lMicr = document.getElementById(("idMICRcode" + i));
            */
    		
    		/************** Start of Commenting *****************/
    		/*
    		document.getElementById(("idAcountType" + j)).style.border ="1px solid #ccc";
            document.getElementById(("idBankAccountNumber" + j)).style.border ="1px solid #ccc";
            document.getElementById("idIFSCcode" + j).style.border ="1px solid #ccc";
            document.getElementById(("idBankName" + j)).style.border ="1px solid #ccc";
            document.getElementById("idIFSCcode" + j).style.border ="1px solid #ccc";
            
        	document.getElementById(('alertBkAcc' + j)).innerHTML="";
        	document.getElementById('alertIfsc' + j).innerHTML="";
        	document.getElementById('alertBkName' + j).innerHTML="";
        	document.getElementById('alertMicr' + j).innerHTML="";
        	document.getElementById('alertBkAccType' + j).innerHTML="";
        	*/
        	/*
        	var lBankAccTypeLoop = document.getElementById("idAcountType"+j);
        	var accTypeLoop = lBankAccTypeLoop.options[lBankAccTypeLoop.selectedIndex].value;
        	if(!hasValue(accTypeLoop)){
        		document.getElementById('alertBkAccType'+j).innerHTML="Please select Account Type";
        		lBankAccTypeLoop.style.border = "2px solid red";
        		errUCC=1;
        	}
        	
            var bkAcc = document.getElementById(("idBankAccountNumber" + j)).value;
        	if(!hasValue(bkAcc)){
        		document.getElementById('alertBkAcc' + j).innerHTML="Please enter Bank Acccount No. ";
        		document.getElementById("idBankAccountNumber" + j).style.border = "2px solid red";
        		errUCC=1;
        	}
        	
            var ifsc = document.getElementById("idIFSCcode" + j).value;
            if(!hasValue(ifsc)){
        		document.getElementById('alertIfsc' + j).innerHTML="Please enter IFSC Code";
        		document.getElementById(("idIFSCcode" + j)).style.border = "2px solid red";
        		errUCC=1;
        	}
            */
    		/************** End of Commenting *****************/
            
            
            /*
        	var bkName = document.getElementById(("idBankName" + j)).value;
        	if(!hasValue(bkName)){
        		document.getElementById('alertBkName' + j).innerHTML="Please enter Bank Name ";
        		document.getElementById(("idBankName" + j)).style.border = "2px solid red";
        		errUCC=1;
        	}
        	
        	var micr = document.getElementById(("idMICRcode" + j)).value;
        	if(!hasValue(micr)){
        		document.getElementById('alertMicr' + j).innerHTML="Please enter MICR No.";
        		document.getElementById(("idMICRcode" + j)).style.border = "2px solid red";
        		errUCC=1;
        	}
        	*/
            
            /*var defAcc = lDefaultBankAcc.value;
            if(!hasValue(defAcc)){
        		document.getElementById('alertDefaultBankAcc').innerHTML="Please enter Default Bank Account ";
        		lDefaultBankAcc.style.border = "2px solid red";
        		errUCC=1;
        	}
            */
            
    		
    	}
    	
    	
    	
    }
    
    
	
	
	
	//alert("After Current Balance validation: " + errUCC);
	
	if (errUCC==1){
		//console.log("Validation Error in Bank Details");
		document.getElementById('alertFormBank').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		//console.log("Not an Error");
		return true;
	}
	
}
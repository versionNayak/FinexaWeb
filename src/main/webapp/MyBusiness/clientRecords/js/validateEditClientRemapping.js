function validateEditClientRemapping(form){
	//alert("inside validation");
    //return false;
	var lRemappedUser = document.getElementById("idRemappedUser");
	var lEffectiveFromDate = document.getElementById("idDate");
	var lEffectiveFromDateGroup = document.getElementById("idEffectiveFromDateGroup");
	var lRemarks = document.getElementById("idRemarks");
	
	var errUser=0;
	
	
	lRemappedUser.style.border ="1px solid #ccc";
	lEffectiveFromDate.style.border ="1px solid #ccc";
    lEffectiveFromDateGroup.style.borderRadius = "7px";
    lRemarks.style.border ="1px solid #ccc";
    
	document.getElementById('alertRemappedUser').innerHTML="";
	document.getElementById('alertDate').innerHTML="";
	document.getElementById('alertRemarks').innerHTML="";
	
	
	 var URemapp = lRemappedUser.options[lRemappedUser.selectedIndex].value;
     
		if (URemapp=="") {
			document.getElementById('alertRemappedUser').innerHTML="Please specify  User";
			lRemappedUser.style.border = "2px solid red";
			errUser=1;
		}
		
		if (!hasValue(lEffectiveFromDate.value)){
			//alert('Inside lid 1');
			document.getElementById('alertDate').innerHTML="Please enter date";
			lEffectiveFromDateGroup.style.border = "2px solid red";
			lEffectiveFromDateGroup.style.borderRadius = "7px";
			errUser=1;
		}
		
		if (!hasValue(lRemarks.value)){
			document.getElementById('alertRemarks').innerHTML="Please enter Role";
			lRemarks.style.border = "2px solid red";
			errUser=1;
			}	
		else {
			var chkAlpha = isChar(lRemarks.value);
			if (!chkAlpha){
				document.getElementById('alertRemarks').innerHTML="Please enter only alphabets for Remarks";
				lRemarks.style.border = "2px solid red";
				errUser=1;
			}
		}
		
		if (errUser==1 ){
			document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
			return false;
		}else{
			return true;
		}

	}
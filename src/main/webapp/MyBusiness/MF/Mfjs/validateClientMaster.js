function validateClientMasterForm(form){
	
	var lInvestorName = document.getElementById("investorName");
	var lInvestorPAN = document.getElementById("investorPAN");
	
	var errorClient = 0;
	
	lInvestorName.style.border = "1px solid #ccc";
	lInvestorPAN.style.border = "1px solid #ccc";
	
	document.getElementById('alertInvestorName').innerHTML="";
	document.getElementById('alertInvestorPan').innerHTML="";
	
	/*********** validate Name or PAN **********/
	if(!hasValue(lInvestorName.value) && !hasValue(lInvestorPAN.value)){
		document.getElementById('alertInvestorName').innerHTML="Please enter either Investor Name or PAN";
		document.getElementById('alertInvestorPan').innerHTML="Please enter either Investor Name or PAN";
		lInvestorName.style.border = "2px solid red";
		lInvestorPAN.style.border = "2px solid red";
		errorClient = 1;
	}
	
	if (errorClient == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
	
}

function validateClientMasterListForm(indexArr){
	
	var errorClientList = 0;
	
	var iterator = indexArr.values();
	for (let i of iterator) { 
		  console.log(i); 
		  /*********** validate Gender Selection **********/
			var lGender = document.getElementById("idGender"+i);
			var gender = lGender.options[lGender.selectedIndex].value;
			lGender.style.border = "1px solid #ccc";
			document.getElementById('alertGender'+i).innerHTML="";
			if(!hasValue(gender)){
				document.getElementById('alertGender'+i).innerHTML="Please select a gender";
				lGender.style.border = "2px solid red";
				errorClientList = 1;
			}
	} 
	
	if (errorClientList == 1 ){
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
	
	
}
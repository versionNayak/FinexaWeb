function validate(form){
	console.log("In Cash validation");
	
	var lCashBalanceType = document.getElementById("idCashBalanceTypeId");
	var lBankName = document.getElementById("idBankName");
	var lCurrentBalance = document.getElementById("idCurrentBalance");
    var errCash=0;

    lCashBalanceType.style.border ="1px solid #ccc";
	lCurrentBalance.style.border ="1px solid #ccc";
	lBankName.style.border ="1px solid #ccc";
	
	document.getElementById('alertBalanceType').innerHTML="";
	document.getElementById('alertCurrentBalance').innerHTML="";
	document.getElementById('alertBankName').innerHTML="";

	//validate cash balance type
	
	var cashType = lCashBalanceType.options[lCashBalanceType.selectedIndex].value;
    //alert('Cash Type: '+cashType); 
	if (cashType=="") {
		document.getElementById('alertBalanceType').innerHTML="Please enter Cash Balance Type";
		lCashBalanceType.style.border = "2px solid red";
	    errCash=1;
	}
	else if (cashType=="35" || cashType=="36" ) {
		if (!hasValue(lBankName.value)) {
			document.getElementById('alertBankName').innerHTML="Please enter Bank Name";
			lBankName.style.border = "2px solid red";
		    errCash=1;			
		}
	}
	
//	alert('After Balance Type validation');
	//return false;
	
	//validate current balance
	
	if (hasValue(lCurrentBalance.value)) {
		console.log("has value");
		//return false;
		lCurrentBalance.value = lCurrentBalance.value.replace(/,/g, '');
		console.log("1");
		if (lCurrentBalance.value == 0){
			console.log("2");
			document.getElementById('alertCurrentBalance').innerHTML="Current Balance cannot be 0";
			lCurrentBalance.style.border = "2px solid red";
			errCash=1;
		}
		else {
			var num = lCurrentBalance.value;
			console.log("3");
			if (!isDecimal(num)) {
				document.getElementById('alertCurrentBalance').innerHTML="Current Balance must be a positive decimal value not starting with 0";
				lCurrentBalance.style.border = "2px solid red";
				errCash=1;
			}
			else {
				console.log("4");
				var n = Number(num).toFixed(2);
				console.log("5");
				lCurrentBalance.value = n;
				console.log("6");
			}
		}
	}
	else {
		if (!hasValue(lCurrentBalance.value)) {
			document.getElementById('alertCurrentBalance').innerHTML="Please enter Current Balance ";
			lCurrentBalance.style.border = "2px solid red";
			errCash=1;
		}		
	}
	

	//alert("After Current Balance validation: " + errCash);
	//return false;

	if (errCash==1 ){
		console.log("Validation Error in Cash");
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		console.log("Not an Error");
		return true;
	}
}

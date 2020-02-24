function validateVehicle(form) {
	
	var lAssetType = document.getElementById("idAssetType");
    var lCurrentValue = document.getElementById("idCurrentValue");
	
	var errV = 0;
	
	lAssetType.style.border = "1px solid #ccc";
	lCurrentValue.style.border = "1px solid #ccc";
	
	document.getElementById('alertAssetType').innerHTML="";
	document.getElementById('alertCurrentValue').innerHTML="";
	
	//validate Asset Type
	var user1 = lAssetType.options[lAssetType.selectedIndex].value;
	if (user1 =="0"){
		document.getElementById('alertAssetType').innerHTML="Please enter asset type";
		lAssetType.style.border = "2px solid red";
		errV=1;
	}
	
	//validate current value
	if (hasValue(lCurrentValue.value)){
		lCurrentValue.value = lCurrentValue.value.replace(/,/g, '');
		if (lCurrentValue.value == 0){
			document.getElementById('alertCurrentValue').innerHTML="Current Value cannot be zero";
			lCurrentValue.style.border = "2px solid red";			
			errV=1;
		}
		else {
			var num = lCurrentValue.value;
			if (!isDecimal(num)){
				document.getElementById('alertCurrentValue').innerHTML="Current Value must be positive decimal not starting with 0";
				lCurrentValue.style.border = "2px solid red";			
				errV=1;
			}
			else {
				var n = Number(num).toFixed(2);
				lCurrentValue.value = n;
			}
		}
	}
	else {
		if (!hasValue(lCurrentValue.value)) {
			document.getElementById('alertCurrentValue').innerHTML="Please enter Current Value of asset";
			lCurrentValue.style.border = "2px solid red";			
			errV=1;		
		}
	}
	
	if (errV==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	}else{
		return true;
	}
}
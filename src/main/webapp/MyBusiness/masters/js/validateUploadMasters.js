function validateUM(form) {
	
	var lMasterName = document.getElementById("idMasterName");
	var lSelectedFile = document.getElementById("IdSelectedFile");
	var lEffectiveDateFrom = document.getElementById("IdEffectiveDateFrom");
	var lEffectiveDateFromGroup = document.getElementById("IdEffectiveDateFromGroup");
	
	var errUM = 0;
	
	lMasterName.style.border = "1px solid #ccc";
	lSelectedFile.style.border = "1px solid #ccc";
	lEffectiveDateFromGroup.style.border = "1px solid #ccc";
	lEffectiveDateFromGroup.style.borderRadius = "7px"
	
	document.getElementById('alertMasterName').innerHTML="";
	document.getElementById('alertSelectedFile').innerHTML="";
	document.getElementById('alertEffDateFrom').innerHTML="";
	
	var strUser1 = lMasterName.options[lMasterName.selectedIndex].value;
	if (strUser1 == "") {
		document.getElementById('alertMasterName').innerHTML="Please select Master Table";
		lMasterName.style.border = "2px solid red";
		errUM=1;
	}
	
	if (!hasValue(lEffectiveDateFrom.value)) {
		document.getElementById('alertEffDateFrom').innerHTML="Please enter Effective From Date";
		lEffectiveDateFromGroup.style.border = "2px solid red";
		lEffectiveDateFromGroup.style.borderRadius = "7px";
		errUM=1;
    }

	
	
	
	if (errUM==1 ){
		document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
		return false;
	}else{
		return true;
	}
	
	
}
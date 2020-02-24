function validateTemplate(form){
	
	var lTemplateFormat = document.getElementById("idTemplateFormat");
	
	var lMasterName = document.getElementById("idMasterName");
	
	var errTF = 0;
	
	lTemplateFormat.style.border = "1px solid #ccc";
	lMasterName.style.border = "1px solid #ccc";
	
	document.getElementById('alertTF').innerHTML="";
	document.getElementById('alertMasterName').innerHTML="";
	
	var strUser1 = lTemplateFormat.options[lTemplateFormat.selectedIndex].value;
	if (strUser1 == "") {
		document.getElementById('alertTF').innerHTML="Please select Template Format";
		lTemplateFormat.style.border = "2px solid red";
		errTF=1;
	}
	
	var strUser2 = lMasterName.options[lMasterName.selectedIndex].value;
	if (strUser2 == "") {
		document.getElementById('alertMasterName').innerHTML="Please select a Master";
		lMasterName.style.border = "2px solid red";
		errTF=1;
	}
	
	if (errTF==1 ){
		document.getElementById('alertForm').innerHTML="Please correct the errors highlighted below.";
		return false;
	}else{
		return true;
	}
	
}
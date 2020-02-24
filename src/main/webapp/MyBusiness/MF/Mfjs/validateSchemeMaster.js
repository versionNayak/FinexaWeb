function validateFileExtension(fileName) {
	var _validFileExtensions = [".tiff",".jpg"];    
	if (fileName.length > 0) {
        var blnValid = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];
            if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
            }
        }
        
        if (!blnValid) {
            bootbox.alert("Sorry, " + fileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
            return false;
        }
    }
    return true;
}

function validateSchemeMasterForm(form){
	var errorSchemeMaster = 0;
	
	/*********** validate RTA **********/
	var lRTA = document.getElementById("idRTA");
	var rta = lRTA.options[lRTA.selectedIndex].value;
	lRTA.style.border = "1px solid #ccc";
	document.getElementById('alertRTA').innerHTML="";
	if(!hasValue(rta)){
		document.getElementById('alertRTA').innerHTML="Please select RTA ";
		lRTA.style.border = "2px solid red";
		errorSchemeMaster = 1;
	}
	
	/*********** validate File Type **********/
	var lFileType = document.getElementById("idFileType");
	var fileType = lFileType.options[lFileType.selectedIndex].value;
	lFileType.style.border = "1px solid #ccc";
	document.getElementById('alertFileType').innerHTML="";
	if(!hasValue(fileType)){
		document.getElementById('alertFileType').innerHTML="Please select File Type ";
		lFileType.style.border = "2px solid red";
		errorSchemeMaster = 1;
	}
	
	/*************************** validate Select File ***************************/
	
	if ($("#idSelectFile").val() == "") {
		bootbox.alert("Please Choose a File for Uploading");
		errorSchemeMaster = 1;
	 } else {
		var fileName = document.getElementById("idSelectedFile").files[0].name;
	 
		if (!validateFileExtension(fileName)) {
			errorSchemeMaster = 1;
		}
	}
	
	
	if (errorSchemeMaster == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
	
	
}

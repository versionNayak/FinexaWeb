function validateFileExtension(selectFileName, originalFileName, fileType) {
	var blnValid = false;
	var _validFileExtensions = [".xlsx",".xls",".dbf"];    
	if (selectFileName.length > 0) {
        var errorUpload = false;
        for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];
            if (selectFileName.substr(selectFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
            	errorUpload = true;
                break;
            }
        }
        
        if (!errorUpload) {
        	blnValid = true;
    		document.getElementById('alertSelectFile').innerHTML= "Selected File has invalid file extension";
        }
    }
	
	
	
	
	
	if (blnValid) {
    	return false;
    } else {
    	return true;
    }
}

function validateDailyFeedForm(form, originalFileName){
	var errorDailyFeed = 0;
	
	/*********** validate RTA **********/
	var lRTA = document.getElementById("idRTA");
	var rta = lRTA.options[lRTA.selectedIndex].value;
	lRTA.style.border = "1px solid #ccc";
	document.getElementById('alertRTA').innerHTML="";
	if(!hasValue(rta)){
		document.getElementById('alertRTA').innerHTML="Please select RTA ";
		lRTA.style.border = "2px solid red";
		errorDailyFeed = 1;
	}
	
	/*********** validate File Name **********/
	var lFileName = document.getElementById("idFileName");
	var fileName = lFileName.options[lFileName.selectedIndex].value;
	lFileName.style.border = "1px solid #ccc";
	document.getElementById('alertFileName').innerHTML="";
	if(!hasValue(fileName) || (fileName < 1)){
		document.getElementById('alertFileName').innerHTML="Please select File Name ";
		lFileName.style.border = "2px solid red";
		errorDailyFeed = 1;
	}
	
	/*********** validate File Type **********/
	var lFileType = document.getElementById("idFileType");
	var fileType = lFileType.options[lFileType.selectedIndex].value;
	lFileType.style.border = "1px solid #ccc";
	document.getElementById('alertFileType').innerHTML="";
	if(!hasValue(fileType) || (fileType < 1)){
		document.getElementById('alertFileType').innerHTML="Please select File Type ";
		lFileType.style.border = "2px solid red";
		errorDailyFeed = 1;
	}
	
	/*************************** validate Select File ***************************/
	document.getElementById('alertSelectFile').innerHTML="";
	if ($("#idSelectFile").val() == "") {
		document.getElementById('alertSelectFile').innerHTML="Please Choose a File for Uploading ";
		errorDailyFeed = 1;
	 } else {
		var selectFileName = document.getElementById("idSelectFile").files[0].name;
		if (!validateFileExtension(selectFileName, originalFileName, fileType)) {
			errorDailyFeed = 1;
		}
	}
	
	if (errorDailyFeed == 1 ){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
}

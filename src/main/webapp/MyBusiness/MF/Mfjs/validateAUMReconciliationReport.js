function validateAUMReconciliationUploadForm(form, originalFileName) {
	var errorAUMReconcilationReport = 0;
	
	/*********** validate Distributor **********/
/*	var lDistributor = document.getElementById("idDistributors");
	var distributorName = lDistributor.options[lDistributor.selectedIndex].value;
	lDistributor.style.border = "1px solid #ccc";
	document.getElementById('alertDistributors').innerHTML="";
	if(!hasValue(distributorName)){
		document.getElementById('alertDistributors').innerHTML="Please select Distributor ";
		lDistributor.style.border = "2px solid red";
		errorAUMReconcilationReport = 1;
	}*/
	
	/*********** validate Difference Greater Than **********/
	/*var lDiffGreaterThan = document.getElementById("idDiffGreaterThan");
	var diffGreaterThan = lDiffGreaterThan.value;
	lDiffGreaterThan.style.border = "1px solid #ccc";
	document.getElementById('alertDifferenceGreaterThan').innerHTML="";
	if(!hasValue(diffGreaterThan)){
		document.getElementById('alertDifferenceGreaterThan').innerHTML="Please enter Difference Greater Than ";
		lDiffGreaterThan.style.border = "2px solid red";
		errorAUMReconcilationReport = 1;
	}*/
	
	/*********** validate check-box for Folios **********/
	
	document.getElementById('alertMismatchFolios').innerHTML="";
	var checkFlag = true;
	var checkboxes = document.getElementsByName('mismatchFolioCheck');
	  for (var i=0; i<checkboxes.length; i++) {
	     if (checkboxes[i].checked) {
	    	 checkFlag = false;
	    	 break;
	     }
	  }
	 if(checkFlag) {
		 document.getElementById('alertMismatchFolios').innerHTML="Please select check-box for Folios ";
		 errorAUMReconcilationReport = 1;
	 }
	
	/*************************** validate Select Report Type ***************************/
	document.getElementById('alertReportFormat').innerHTML="";
	var radios = document.getElementByName("reportFormat");
	var radioFlag= true; 
	for (var i=0, i<radios.length; i++) {
	        if ( radios[i].checked ) { // radio checked?
	            radioFlag = false;
	            break; // and break out of for loop
	        }
	    }
	if(radioFlag) {
		 document.getElementById('alertReportFormat').innerHTML="Please select Type of file ";
		 errorAUMReconcilationReport = 1;
	 }
	
	
	if (errorAUMReconcilationReport == 1 ) {
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
}

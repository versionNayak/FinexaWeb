function validateBusinessMISReportForm(form, originalFileName) {
	var errorBusinessMISReport = 0;

	/*********** validate From Date **********/
	var lFromDate = document.getElementById("idFromDate");
	var fromDate = lFromDate.value;
	lFromDate.style.border = "1px solid #ccc";
	document.getElementById('alertFromDate').innerHTML="";
	if(!hasValue(fromDate)){
		document.getElementById('alertFromDate').innerHTML="Please enter From Date ";
		lFromDate.style.border = "2px solid red";
		errorBusinessMISReport = 1;
	}
	
	/*********** validate To Date **********/
	var lToDate = document.getElementById("idToDate");
	var toDate = lToDate.value;
	lToDate.style.border = "1px solid #ccc";
	document.getElementById('alertToDate').innerHTML="";
	if(!hasValue(toDate)){
		document.getElementById('alertToDate').innerHTML="Please enter To Date ";
		lToDate.style.border = "2px solid red";
		errorBusinessMISReport = 1;
	}
	
	/*********** validate ARN **********/
/*	var lARN = document.getElementById("idARNs");
	var arn = lARN.options[lARN.selectedIndex].value;
	lARN.style.border = "1px solid #ccc";
	document.getElementById('alertARNs').innerHTML="";
	if(!hasValue(arn)){
		document.getElementById('alertARNs').innerHTML="Please select ARN Code ";
		lARN.style.border = "2px solid red";
		errorBusinessMISReport = 1;
	}*/
	
	/*********** validate Relationship Managers **********/
/*	var lRM = document.getElementById("idRMs");
	var rm = lRM.options[lRM.selectedIndex].value;
	lRM.style.border = "1px solid #ccc";
	document.getElementById('alertRMs').innerHTML="";
	if(!hasValue(rm)){
		document.getElementById('alertRMs').innerHTML="Please select Relationship Manager ";
		lRM.style.border = "2px solid red";
		errorBusinessMISReport = 1;
	}*/
	
	/*********** validate Relationship Managers **********/
	/*var lDiffGreaterThan = document.getElementById("idDiffGreaterThan");
	var diffGreaterThan = lDiffGreaterThan.value;
	lDiffGreaterThan.style.border = "1px solid #ccc";
	document.getElementById('alertDifferenceGreaterThan').innerHTML="";
	if(!hasValue(fileName) || (fileName < 1)){
		document.getElementById('alertDifferenceGreaterThan').innerHTML="Please enter Difference Greater Than ";
		lDiffGreaterThan.style.border = "2px solid red";
		errorAUMReconcilationReport = 1;
	}*/
	
	/*********** validate Options for Report **********/
	
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

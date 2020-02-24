function validateInactiveclientReportGeneration(form) {
	
	var lFromDate = document.getElementById("idFromDate");
	var lFromDateGroup = document.getElementById("idFromDateGroup");
	var lToDate = document.getElementById("idToDate");
	var lToDateGroup = document.getElementById("idToDateGroup");
	var radioGroup = document.getElementById("idReportFormatRadioGroup");
	
	var checkBoxes = document.getElementsByName("reportType");
	var fundHouse = document.getElementById("idFHouse");
	var schemeName = document.getElementById("idSName");
	var checkGroup = document.getElementById("idRadioReportType");
	
	var errInactiveClientReport = 0;
	
	lFromDateGroup.style.border = "1px solid #ccc";
	lFromDateGroup.style.borderRadius = "7px";
	lToDateGroup.style.border = "1px solid #ccc";
	lToDateGroup.style.borderRadius = "7px";
	radioGroup.style.border = "none";
	radioGroup.style.borderRadius = "7px";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertFromDate').innerHTML = "";
	document.getElementById('alertToDate').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";
	document.getElementById("alertSName").innerHTML = "";
	
	if (!hasValue(lFromDate.value)) {
		document.getElementById('alertFromDate').innerHTML="Please enter From Date";
		lFromDateGroup.style.border = "2px solid red";
		lFromDateGroup.style.borderRadius = "7px";
		errInactiveClientReport = 1;
	} else {
		document.getElementById('alertFromDate').innerHTML="";
		window.fromDate = moment(lFromDate.value, 'DD/MM/YYYY');
		if (!window.fromDate.isValid()) {
			document.getElementById('alertFromDate').innerHTML = "From Date is not a valid date";
			lFromDateGroup.style.border = "2px solid red";
			lFromDateGroup.style.borderRadius = "7px";
			errInactiveClientReport = 1;
		} 
	}
	
	if (!hasValue(lToDate.value)) {
		document.getElementById('alertToDate').innerHTML="Please enter To Date";
		lToDateGroup.style.border = "2px solid red";
		lToDateGroup.style.borderRadius = "7px";
		errInactiveClientReport = 1;
	} else {
		document.getElementById('alertToDate').innerHTML="";
		window.toDate = moment(lToDate.value, 'DD/MM/YYYY');
		if (!window.toDate.isValid()) {
			document.getElementById('alertToDate').innerHTML = "To Date is not a valid date";
			lToDateGroup.style.border = "2px solid red";
			lToDateGroup.style.borderRadius = "7px";
			errInactiveClientReport = 1;
		} 
	}

	if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		schemeName.style.border = "2px solid red";
		errInactiveClientReport = 1;
	} else {
		schemeName.style.border = "1px solid #ccc";
		document.getElementById('alertSName').innerHTML="";
	}

	var isCheckedType = false;
	var counter = 0;
	while (!isCheckedType && counter < checkBoxes.length) {
	    if (checkBoxes[counter].checked) isCheckedType = true;
	    counter++;        
	}

	if (!isCheckedType) {
		document.getElementById('alertReportType').innerHTML = "Please select a report type.";
		checkGroup.style.border = "2px solid red";
		errInactiveClientReport = 1;
	}
	
	if (errInactiveClientReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
	
}


function validateInactiveclientReportExport(form) {
	
	var lFromDate = document.getElementById("idFromDate");
	var lFromDateGroup = document.getElementById("idFromDateGroup");
	var lToDate = document.getElementById("idToDate");
	var lToDateGroup = document.getElementById("idToDateGroup");
	var radios = document.getElementsByName("reportFormat");
	var radioGroup = document.getElementById("idReportFormatRadioGroup");
	
	var checkBoxes = document.getElementsByName("reportType");
	var fundHouse = document.getElementById("idFHouse");
	var schemeName = document.getElementById("idSName");
	var checkGroup = document.getElementById("idRadioReportType");
	
	var errInactiveClientReport = 0;
	
	lFromDateGroup.style.border = "1px solid #ccc";
	lFromDateGroup.style.borderRadius = "7px";
	lToDateGroup.style.border = "1px solid #ccc";
	lToDateGroup.style.borderRadius = "7px";
	radioGroup.style.border = "none";
	radioGroup.style.borderRadius = "7px";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertFromDate').innerHTML = "";
	document.getElementById('alertToDate').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";
	
	if (!hasValue(lFromDate.value)) {
		document.getElementById('alertFromDate').innerHTML="Please enter From Date";
		lFromDateGroup.style.border = "2px solid red";
		lFromDateGroup.style.borderRadius = "7px";
		errInactiveClientReport = 1;
	} else {
		document.getElementById('alertFromDate').innerHTML="";
		window.fromDate = moment(lFromDate.value, 'DD/MM/YYYY');
		if (!window.fromDate.isValid()) {
			document.getElementById('alertFromDate').innerHTML = "From Date is not a valid date";
			lFromDateGroup.style.border = "2px solid red";
			lFromDateGroup.style.borderRadius = "7px";
			errInactiveClientReport = 1;
		} 
	}
	
	var formValid = false;
	var i = 0;
	while (!formValid && i < radios.length) {
	    if (radios[i].checked) formValid = true;
	    i++;        
	}

	if (!formValid) {
		document.getElementById('alertReportFormat').innerHTML = "Please select a Report Format.";
		radioGroup.style.border = "2px solid red";
		errInactiveClientReport = 1;
	}
	
	if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		schemeName.style.border = "2px solid red";
		errInactiveClientReport = 1;
	}
	
	
	var isCheckedType = false;
	var counter = 0;
	while (!isCheckedType && counter < checkBoxes.length) {
	    if (checkBoxes[counter].checked) isCheckedType = true;
	    counter++;        
	}

	if (!isCheckedType) {
		document.getElementById('alertReportType').innerHTML = "Please select a report type.";
		checkGroup.style.border = "2px solid red";
		errInactiveClientReport = 1;
	}
	
	
	if (errInactiveClientReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
}
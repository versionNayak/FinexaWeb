function validateAUMReportGeneration(form) {
	
	var lClients = document.getElementById("idClients");
	var lAsOnDate = document.getElementById("idAsOnDate");
	var lAsOnDateGroup = document.getElementById("idAsOnDateGroup");
	var radioGroup = document.getElementById("idReportFormatRadioGroup");
	
	var fundHouse = document.getElementById("idFHouse");
	var schemeName = document.getElementById("idSName");
	
	var errAumReport = 0;
	
	lClients.style.border = "1px solid #ccc";
	lAsOnDateGroup.style.border = "1px solid #ccc";
	lAsOnDateGroup.style.borderRadius = "7px";
	radioGroup.style.border = "none";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertClients').innerHTML = "";
	document.getElementById('alertAsOnDate').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";
	
	var strUser = lClients.options[lClients.selectedIndex].value;
	
	if (strUser=="") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errAumReport = 1;
	}
	
	if (!hasValue(lAsOnDate.value)) {
		document.getElementById('alertAsOnDate').innerHTML="Please enter As on Date";
		lAsOnDateGroup.style.border = "2px solid red";
		lAsOnDateGroup.style.borderRadius = "7px";
		errAumReport = 1;
	} else {
		document.getElementById('alertAsOnDate').innerHTML="";
		window.asOnDate = moment(lAsOnDate.value, 'DD/MM/YYYY');
		if (!window.asOnDate.isValid()) {
			document.getElementById('alertAsOnDate').innerHTML = "As on Date is not a valid date";
			lAsOnDateGroup.style.border = "2px solid red";
			lAsOnDateGroup.style.borderRadius = "7px";
			errAumReport = 1;
		} 
	}
	
	if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		schemeName.style.border = "2px solid red";
		errAumReport = 1;
	}
	
	if (errAumReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
}

function validateAUMReportExport(form) {
	
	var lClients = document.getElementById("idClients");
	var lAsOnDate = document.getElementById("idAsOnDate");
	var lAsOnDateGroup = document.getElementById("idAsOnDateGroup");
	var radios = document.getElementsByName("reportFormat");
	var radioGroup = document.getElementById("idReportFormatRadioGroup");

	var fundHouse = document.getElementById("idFHouse");
	var schemeName = document.getElementById("idSName");
	
	var errAumReport = 0;
	
	lClients.style.border = "1px solid #ccc";
	lAsOnDateGroup.style.border = "1px solid #ccc";
	lAsOnDateGroup.style.borderRadius = "7px";
	radioGroup.style.border = "none";
	radioGroup.style.borderRadius = "7px";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertClients').innerHTML = "";
	document.getElementById('alertAsOnDate').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";
	
	var strUser = lClients.options[lClients.selectedIndex].value;
	
	if (strUser=="") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errAumReport = 1;
	}
	
	if (!hasValue(lAsOnDate.value)) {
		document.getElementById('alertAsOnDate').innerHTML="Please enter As on Date";
		lAsOnDateGroup.style.border = "2px solid red";
		lAsOnDateGroup.style.borderRadius = "7px";
		errAumReport = 1;
	} else {
		document.getElementById('alertAsOnDate').innerHTML="";
		window.asOnDate = moment(lAsOnDate.value, 'DD/MM/YYYY');
		if (!window.asOnDate.isValid()) {
			document.getElementById('alertAsOnDate').innerHTML = "As on Date is not a valid date";
			lAsOnDateGroup.style.border = "2px solid red";
			lAsOnDateGroup.style.borderRadius = "7px";
			errAumReport = 1;
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
		errAumReport = 1;
	}
	
	if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		schemeName.style.border = "2px solid red";
		errAumReport = 1;
	}
	
	if (errAumReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
}
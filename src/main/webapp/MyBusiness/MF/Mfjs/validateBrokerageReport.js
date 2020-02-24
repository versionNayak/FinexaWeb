function validateBrokerageReport(form) {
	
	var lClients = document.getElementById("idClients");
	var lFromDate = document.getElementById("idFromDate");
	var lFromDateGroup = document.getElementById("idFromDateGroup");
	var lToDate = document.getElementById("idToDate");
	var lToDateGroup = document.getElementById("idToDateGroup");
	
	var errTransReport = 0;
	var type = document.getElementById("idReportFormatRadioGroup");
	
	var fundHouse = document.getElementById("idFHouse");
	var schemeName = document.getElementById("idSName");
			
	
	lClients.style.border = "1px solid #ccc";
	lFromDateGroup.style.border = "1px solid #ccc";
	lFromDateGroup.style.borderRadius = "7px";
	lToDateGroup.style.border = "1px solid #ccc";
	lToDateGroup.style.borderRadius = "7px";
	
	var strUser = lClients.options[lClients.selectedIndex].value;
	
	if (strUser=="") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errTransReport = 1;
	}
	else{
		document.getElementById('alertClients').innerHTML="";
	}
	
	if (!hasValue(lFromDate.value)) {
		document.getElementById('alertFromDate').innerHTML="Please enter From Date";
		lFromDateGroup.style.border = "2px solid red";
		lFromDateGroup.style.borderRadius = "7px";
		errTransReport = 1;
	} else {
		document.getElementById('alertFromDate').innerHTML="";
		window.fromDate = moment(lFromDate.value, 'DD/MM/YYYY');
		if (!window.fromDate.isValid()) {
			document.getElementById('alertFromDate').innerHTML = "From Date is not a valid date";
			lFromDateGroup.style.border = "2px solid red";
			lFromDateGroup.style.borderRadius = "7px";
			errTransReport = 1;
		} 
	}
	
	if (!hasValue(lToDate.value)) {
		document.getElementById('alertToDate').innerHTML="Please enter To Date";
		lToDateGroup.style.border = "2px solid red";
		lToDateGroup.style.borderRadius = "7px";
		errTransReport = 1;
	} else {
		document.getElementById('alertToDate').innerHTML="";
		window.toDate = moment(lToDate.value, 'DD/MM/YYYY');
		if (!window.toDate.isValid()) {
			document.getElementById('alertToDate').innerHTML = "From Date is not a valid date";
			lToDateGroup.style.border = "2px solid red";
			lToDateGroup.style.borderRadius = "7px";
			errTransReport = 1;
		} 
	}
	if ( !( document.getElementById('idExcel').checked ) && !( document.getElementById('idPDF').checked ) )
	{	
		document.getElementById('alertReportFormat').innerHTML="Please Select one option";
		
		errTransReport=1;
	}else{
		document.getElementById('alertReportFormat').innerHTML="";
	}
	
	if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		schemeName.style.border = "2px solid red";
		errTransReport = 1;
	}
	
	if (errTransReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
	
}
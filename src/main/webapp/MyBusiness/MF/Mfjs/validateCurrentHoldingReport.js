var lReportType;
function validateCurrentHoldingReportGeneration(form) {
	
	var lReportTypeRadios = document.getElementsByName('reportType'); 
	
	for(var i = 0; i < lReportTypeRadios.length; i++){
	    if(lReportTypeRadios[i].checked){
	    	lReportType = lReportTypeRadios[i].value;
	    	errCurrentHoldingReport = 1;
	    }
	}
	
	if(lReportType == "realized") {
		
		var lClients = document.getElementById("idClients");
		var lFromDate = document.getElementById("idFromDate");
		var lFromDateGroup = document.getElementById("idFromDateGroup");
		var lToDate = document.getElementById("idToDate");
		var lToDateGroup = document.getElementById("idToDateGroup");
		var radioGroup = document.getElementById("idReportFormatRadioGroup");
		
		var errRGReport = 0;
		
		lClients.style.border = "1px solid #ccc";
		lFromDateGroup.style.border = "1px solid #ccc";
		lFromDateGroup.style.borderRadius = "7px";
		lToDateGroup.style.border = "1px solid #ccc";
		lToDateGroup.style.borderRadius = "7px";
		radioGroup.style.border = "none";
		
		document.getElementById('alertform').innerHTML = "";
		document.getElementById('alertClients').innerHTML= "";
		document.getElementById('alertFromDate').innerHTML = "";
		document.getElementById('alertToDate').innerHTML = "";
		document.getElementById("alertReportFormat").innerHTML = "";
		
		var strUser = lClients.options[lClients.selectedIndex].value;
		
		if (strUser=="") {
			document.getElementById('alertClients').innerHTML="Please select a Client";
			lClients.style.border = "2px solid red";
			errRGReport = 1;
		}
		
		if (!hasValue(lFromDate.value)) {
			document.getElementById('alertFromDate').innerHTML="Please enter From Date";
			lFromDateGroup.style.border = "2px solid red";
			lFromDateGroup.style.borderRadius = "7px";
			errRGReport = 1;
		} else {
			document.getElementById('alertFromDate').innerHTML="";
			window.fromDate = moment(lFromDate.value, 'DD/MM/YYYY');
			if (!window.fromDate.isValid()) {
				document.getElementById('alertFromDate').innerHTML = "From Date is not a valid date";
				lFromDateGroup.style.border = "2px solid red";
				lFromDateGroup.style.borderRadius = "7px";
				errRGReport = 1;
			} 
		}
		
		if (!hasValue(lToDate.value)) {
			document.getElementById('alertToDate').innerHTML="Please enter To Date";
			lToDateGroup.style.border = "2px solid red";
			lToDateGroup.style.borderRadius = "7px";
			errRGReport = 1;
		} else {
			document.getElementById('alertToDate').innerHTML="";
			window.toDate = moment(lToDate.value, 'DD/MM/YYYY');
			if (!window.toDate.isValid()) {
				document.getElementById('alertToDate').innerHTML = "To Date is not a valid date";
				lToDateGroup.style.border = "2px solid red";
				lToDateGroup.style.borderRadius = "7px";
				errRGReport = 1;
			} 
		}
		
		if (errRGReport==1){
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		} else {
			return true;
		}
		
	} else if(lReportType == "unrealized") {
	
		var lClients = document.getElementById("idClientsUR");
		var lAsOnDate = document.getElementById("idAsOnDate");
		var lAsOnDateGroup = document.getElementById("idAsOnDateGroup");
		var radioGroup = document.getElementById("idReportFormatRadioGroupUR");
		
		var errURGReport = 0;
		
		lClients.style.border = "1px solid #ccc";
		lAsOnDateGroup.style.border = "1px solid #ccc";
		lAsOnDateGroup.style.borderRadius = "7px";
		radioGroup.style.border = "none";
		
		document.getElementById('alertform').innerHTML = "";
		document.getElementById('alertClientsUR').innerHTML= "";
		document.getElementById('alertAsOnDate').innerHTML = "";
		document.getElementById("alertReportFormatUR").innerHTML = "";
		
		var strUser = lClients.options[lClients.selectedIndex].value;
		
		if (strUser=="") {
			document.getElementById('alertClientsUR').innerHTML="Please select a Client";
			lClients.style.border = "2px solid red";
			errURGReport = 1;
		}
		
		if (!hasValue(lAsOnDate.value)) {
			document.getElementById('alertAsOnDate').innerHTML="Please enter As On Date";
			lAsOnDateGroup.style.border = "2px solid red";
			lAsOnDateGroup.style.borderRadius = "7px";
			errURGReport = 1;
		} else {
			document.getElementById('alertAsOnDate').innerHTML="";
			window.asOnDate = moment(lAsOnDate.value, 'DD/MM/YYYY');
			if (!window.asOnDate.isValid()) {
				document.getElementById('alertAsOnDate').innerHTML = "As On Date is not a valid date";
				lAsOnDateGroup.style.border = "2px solid red";
				lAsOnDateGroup.style.borderRadius = "7px";
				errURGReport = 1;
			} 
		}
		
		if (errURGReport==1){
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		} else {
			return true;
		}
	
	}
	
}

function validateCurrentHoldingReportExport(form) {
	
	var lReportTypeRadios = document.getElementsByName('reportType'); 
	
	for(var i = 0; i < lReportTypeRadios.length; i++){
	    if(lReportTypeRadios[i].checked){
	    	lReportType = lReportTypeRadios[i].value;
	    	errCurrentHoldingReport = 1;
	    }
	}
	
	if(lReportType == "realized") {
		
		var lClients = document.getElementById("idClients");
		var lFromDate = document.getElementById("idFromDate");
		var lFromDateGroup = document.getElementById("idFromDateGroup");
		var lToDate = document.getElementById("idToDate");
		var lToDateGroup = document.getElementById("idToDateGroup");
		var radios = document.getElementsByName("reportFormat");
		var radioGroup = document.getElementById("idReportFormatRadioGroup");
		
		var errRGReport = 0;
		
		lClients.style.border = "1px solid #ccc";
		lFromDateGroup.style.border = "1px solid #ccc";
		lFromDateGroup.style.borderRadius = "7px";
		lToDateGroup.style.border = "1px solid #ccc";
		lToDateGroup.style.borderRadius = "7px";
		radioGroup.style.border = "none";
		radioGroup.style.borderRadius = "7px";
		
		document.getElementById('alertform').innerHTML = "";
		document.getElementById('alertClients').innerHTML= "";
		document.getElementById('alertFromDate').innerHTML = "";
		document.getElementById('alertToDate').innerHTML = "";
		document.getElementById("alertReportFormat").innerHTML = "";
		
		var strUser = lClients.options[lClients.selectedIndex].value;
		
		if (strUser=="") {
			document.getElementById('alertClients').innerHTML="Please select a Client";
			lClients.style.border = "2px solid red";
			errRGReport = 1;
		}
		
		if (!hasValue(lFromDate.value)) {
			document.getElementById('alertFromDate').innerHTML="Please enter From Date";
			lFromDateGroup.style.border = "2px solid red";
			lFromDateGroup.style.borderRadius = "7px";
			errRGReport = 1;
		} else {
			document.getElementById('alertFromDate').innerHTML="";
			window.fromDate = moment(lFromDate.value, 'DD/MM/YYYY');
			if (!window.fromDate.isValid()) {
				document.getElementById('alertFromDate').innerHTML = "From Date is not a valid date";
				lFromDateGroup.style.border = "2px solid red";
				lFromDateGroup.style.borderRadius = "7px";
				errRGReport = 1;
			} 
		}
		
		if (!hasValue(lToDate.value)) {
			document.getElementById('alertToDate').innerHTML="Please enter To Date";
			lToDateGroup.style.border = "2px solid red";
			lToDateGroup.style.borderRadius = "7px";
			errRGReport = 1;
		} else {
			document.getElementById('alertToDate').innerHTML="";
			window.toDate = moment(lToDate.value, 'DD/MM/YYYY');
			if (!window.toDate.isValid()) {
				document.getElementById('alertToDate').innerHTML = "To Date is not a valid date";
				lToDateGroup.style.border = "2px solid red";
				lToDateGroup.style.borderRadius = "7px";
				errRGReport = 1;
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
			//radioGroup.style.border = "2px solid red";
			errRGReport = 1;
		}
		
		if (errRGReport==1){
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		} else {
			return true;
		}
		
	} else if(lReportType == "unrealized") {
	
		var lClients = document.getElementById("idClientsUR");
		var lAsOnDate = document.getElementById("idAsOnDate");
		var lAsOnDateGroup = document.getElementById("idAsOnDateGroup");
		var radios = document.getElementsByName("reportFormatUR");
		var radioGroup = document.getElementById("idReportFormatRadioGroupUR");
		
		var errURGReport = 0;
		
		lClients.style.border = "1px solid #ccc";
		lAsOnDateGroup.style.border = "1px solid #ccc";
		lAsOnDateGroup.style.borderRadius = "7px";
		radioGroup.style.border = "none";
		
		document.getElementById('alertform').innerHTML = "";
		document.getElementById('alertClientsUR').innerHTML= "";
		document.getElementById('alertAsOnDate').innerHTML = "";
		document.getElementById("alertReportFormatUR").innerHTML = "";
		
		var strUser = lClients.options[lClients.selectedIndex].value;
		
		if (strUser=="") {
			document.getElementById('alertClientsUR').innerHTML="Please select a Client";
			lClients.style.border = "2px solid red";
			errURGReport = 1;
		}
		
		if (!hasValue(lAsOnDate.value)) {
			document.getElementById('alertAsOnDate').innerHTML="Please enter As On Date";
			lAsOnDateGroup.style.border = "2px solid red";
			lAsOnDateGroup.style.borderRadius = "7px";
			errURGReport = 1;
		} else {
			document.getElementById('alertAsOnDate').innerHTML="";
			window.asOnDate = moment(lAsOnDate.value, 'DD/MM/YYYY');
			if (!window.asOnDate.isValid()) {
				document.getElementById('alertAsOnDate').innerHTML = "As On Date is not a valid date";
				lAsOnDateGroup.style.border = "2px solid red";
				lAsOnDateGroup.style.borderRadius = "7px";
				errURGReport = 1;
			} 
		}
		
		var formValid = false;
		var i = 0;
		while (!formValid && i < radios.length) {
		    if (radios[i].checked) formValid = true;
		    i++;        
		}

		if (!formValid) {
			document.getElementById('alertReportFormatUR').innerHTML = "Please select a Report Format.";
			//radioGroup.style.border = "2px solid red";
			errURGReport = 1;
		}
		
		if (errURGReport==1){
			document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
			$(window).scrollTop(0);
			return false;
		} else {
			return true;
		}
		
	}
	
}
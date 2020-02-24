function validateSipStpSwpGeneration(form,clientId,fundHouseName,isin,reportType,checkedFamilyMemberId) {

	//var lClients = document.getElementById("idClients");
	var lClients = document.getElementById("idClientsDrop");
	var lFamilyMemberCheckBox = document.getElementById("familyMemberCheckBox");
	var lFromDate = document.getElementById("idFromDate");
	var lFromDateGroup = document.getElementById("idFromDateGroup");
	var lToDate = document.getElementById("idToDate");
	var lToDateGroup = document.getElementById("idToDateGroup");
	var lFundHouseName = document.getElementById("idFHouseDrop");
	var lSchemeName = document.getElementById("idSchemeDrop");
	var lReportType = document.getElementById("idReportTypeRadioStartGroup");
	var lReportFormat = document.getElementById("idReportFormatRadioGroup");
	
	//var radioGroup = document.getElementById("idReportFormatRadioGroup");
	//var checkBoxes = document.getElementsByName("reportType");
	//var fundHouse = document.getElementById("idFHouse");
	//var schemeName = document.getElementById("idSName");
	//var checkGroup = document.getElementById("idReportTypeRadioStart");
	
	var errSSSReport = 0;
	
	lClients.style.border = "1px solid #ccc";
	lFamilyMemberCheckBox.style.border = "none";
	lFamilyMemberCheckBox.style.borderRadius = "7px";
	lFromDateGroup.style.border = "1px solid #ccc";
	lFromDateGroup.style.borderRadius = "7px";
	lToDateGroup.style.border = "1px solid #ccc";
	lToDateGroup.style.borderRadius = "7px";
	lFundHouseName.style.border = "1px solid #ccc";
	lSchemeName.style.border = "1px solid #ccc";
	lReportFormat.style.border = "none";
	lReportType.style.border = "none";
	lReportType.style.borderRadius = "7px";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertClients').innerHTML = "";
	document.getElementById('alertFamilyMember').innerHTML = "";
	document.getElementById('alertFromDate').innerHTML = "";
	document.getElementById('alertToDate').innerHTML = "";
	document.getElementById('alertFHouse').innerHTML = "";
	document.getElementById('alertSName').innerHTML = "";
	document.getElementById('alertReportType').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";
	
	/*var strUser = lClients.options[lClients.selectedIndex].value;
	
	if (strUser=="") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errSSSReport = 1;
	}*/
	
	if (clientId == null || clientId == "") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errSSSReport = 1;
	}
	
	if(checkedFamilyMemberId == null || checkedFamilyMemberId == "") {
		document.getElementById('alertFamilyMember').innerHTML="Please select Family Member";
		lFamilyMemberCheckBox.style.border = "3px solid red";
		lFamilyMemberCheckBox.style.borderRadius = "7px";
		errSSSReport = 1;
	}
	
	if (!hasValue(lFromDate.value)) {
		document.getElementById('alertFromDate').innerHTML="Please enter From Date";
		lFromDateGroup.style.border = "2px solid red";
		lFromDateGroup.style.borderRadius = "7px";
		errSSSReport = 1;
	} else {
		document.getElementById('alertFromDate').innerHTML="";
		window.fromDate = moment(lFromDate.value, 'DD/MM/YYYY');
		if (!window.fromDate.isValid()) {
			document.getElementById('alertFromDate').innerHTML = "From Date is not a valid date";
			lFromDateGroup.style.border = "2px solid red";
			lFromDateGroup.style.borderRadius = "7px";
			errSSSReport = 1;
		} 
	}
	
	if (!hasValue(lToDate.value)) {
		document.getElementById('alertToDate').innerHTML="Please enter To Date";
		lToDateGroup.style.border = "2px solid red";
		lToDateGroup.style.borderRadius = "7px";
		errSSSReport = 1;
	} else {
		document.getElementById('alertToDate').innerHTML="";
		window.toDate = moment(lToDate.value, 'DD/MM/YYYY');
		if (!window.toDate.isValid()) {
			document.getElementById('alertToDate').innerHTML = "To Date is not a valid date";
			lToDateGroup.style.border = "2px solid red";
			lToDateGroup.style.borderRadius = "7px";
			errSSSReport = 1;
		} 
	}
	
	if( (hasValue(lFromDate.value)) && (hasValue(lToDate.value)) && ((lToDate.value) < (lFromDate.value)) ) {
		document.getElementById('alertToDate').innerHTML="To-Date must be greater then or equal to From-Date";
		lToDateGroup.style.border = "2px solid red";
		lToDateGroup.style.borderRadius = "7px";
		errSSSReport = 1;
	}

	/*if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		schemeName.style.border = "2px solid red";
		errSSSReport = 1;
	}*/
	
	/*if (fundHouseName != null || fundHouseName != "") {
		document.getElementById('alertFHouse').innerHTML="Please select Mutual Fund";
		lFundHouseName.style.border = "2px solid red";
		errSSSReport = 1;
	}*/
	
	if(hasValue(fundHouseName) && !hasValue(isin)){
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		lSchemeName.style.border = "2px solid red";
		errSSSReport = 1;
	}

	/*var isCheckedType = false;
	var counter = 0;
	while (!isCheckedType && counter < checkBoxes.length) {
	    if (checkBoxes[counter].checked) isCheckedType = true;
	    counter++;        
	}

	if (!isCheckedType) {
		document.getElementById('alertReportType').innerHTML = "Please select a report type.";
		checkGroup.style.border = "2px solid red";
		errSSSReport = 1;
	}*/
	if (reportType == null || reportType == "") {
		document.getElementById('alertReportType').innerHTML="Please select Report Type";
		lReportType.style.border = "2px solid red";
		errSSSReport = 1;
		
		/*document.getElementById('alertReportFormat').innerHTML = "Please select a Report Format.";
		radioGroup.style.border = "2px solid red";
		errSSSReport = 1;*/
		
	}
	
	if (errSSSReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
	
}

function validateSipStpSwpReportExport(form, clientId, fundHouseName, isin, reportType, reportFormat, checkedFamilyMemberId) {
	
	var lClients = document.getElementById("idClientsDrop");
	var lFamilyMemberCheckBox = document.getElementById("familyMemberCheckBox");
	var lFromDate = document.getElementById("idFromDate");
	var lFromDateGroup = document.getElementById("idFromDateGroup");
	var lToDate = document.getElementById("idToDate");
	var lToDateGroup = document.getElementById("idToDateGroup");
	var lFundHouseName = document.getElementById("idFHouseDrop");
	var lSchemeName = document.getElementById("idSchemeDrop");
	var lReportType = document.getElementById("idReportTypeRadioStartGroup");
	var lReportFormat = document.getElementById("idReportFormatRadioGroup");
	
	/*var radios = document.getElementsByName("reportFormat");
	var radioGroup = document.getElementById("idReportFormatRadioGroup");
	var checkBoxes = document.getElementsByName("reportType");
	var fundHouse = document.getElementById("idFHouse");
	var schemeName = document.getElementById("idSName");
	var checkGroup = document.getElementById("idReportTypeRadioStart");*/
	
	var errSSSReport = 0;
	
	lClients.style.border = "1px solid #ccc";
	lFamilyMemberCheckBox.style.border = "none";
	lFamilyMemberCheckBox.style.borderRadius = "7px";
	lFromDateGroup.style.border = "1px solid #ccc";
	lFromDateGroup.style.borderRadius = "7px";
	lToDateGroup.style.border = "1px solid #ccc";
	lToDateGroup.style.borderRadius = "7px";
	lFundHouseName.style.border = "1px solid #ccc";
	lSchemeName.style.border = "1px solid #ccc";
	lReportType.style.border = "none";
	lReportType.style.borderRadius = "7px";
	lReportFormat.style.border = "none";
	lReportFormat.style.borderRadius = "7px";
	//radioGroup.style.border = "none";
	//radioGroup.style.borderRadius = "7px";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertClients').innerHTML = "";
	document.getElementById('alertFamilyMember').innerHTML = "";
	document.getElementById('alertFromDate').innerHTML = "";
	document.getElementById('alertToDate').innerHTML = "";
	document.getElementById('alertFHouse').innerHTML = "";
	document.getElementById('alertSName').innerHTML = "";
	document.getElementById('alertReportType').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";
	
	/*var strUser = lClients.options[lClients.selectedIndex].value;
	
	if (strUser=="") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errSSSReport = 1;
	}*/
	
	if (clientId == null || clientId == "") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errSSSReport = 1;
	}
	if(checkedFamilyMemberId == null || checkedFamilyMemberId == "") {
		document.getElementById('alertFamilyMember').innerHTML="Please select Family Member";
		lFamilyMemberCheckBox.style.border = "3px solid red";
		lFamilyMemberCheckBox.style.borderRadius = "7px";
		errSSSReport = 1;
	}
	if (!hasValue(lFromDate.value)) {
		document.getElementById('alertFromDate').innerHTML="Please enter From Date";
		lFromDateGroup.style.border = "2px solid red";
		lFromDateGroup.style.borderRadius = "7px";
		errSSSReport = 1;
	} else {
		document.getElementById('alertFromDate').innerHTML="";
		window.fromDate = moment(lFromDate.value, 'DD/MM/YYYY');
		if (!window.fromDate.isValid()) {
			document.getElementById('alertFromDate').innerHTML = "From Date is not a valid date";
			lFromDateGroup.style.border = "2px solid red";
			lFromDateGroup.style.borderRadius = "7px";
			errSSSReport = 1;
		} 
	}
	
	if (!hasValue(lToDate.value)) {
		document.getElementById('alertToDate').innerHTML="Please enter To Date";
		lToDateGroup.style.border = "2px solid red";
		lToDateGroup.style.borderRadius = "7px";
		errSSSReport = 1;
	} else {
		document.getElementById('alertToDate').innerHTML="";
		window.toDate = moment(lToDate.value, 'DD/MM/YYYY');
		if (!window.toDate.isValid()) {
			document.getElementById('alertToDate').innerHTML = "To Date is not a valid date";
			lToDateGroup.style.border = "2px solid red";
			lToDateGroup.style.borderRadius = "7px";
			errSSSReport = 1;
		} 
	}
	
	if( (hasValue(lFromDate.value)) && (hasValue(lToDate.value)) && ((lToDate.value) < (lFromDate.value)) ) {
		document.getElementById('alertToDate').innerHTML="To-Date must be greater then or equal to From-Date";
		lToDateGroup.style.border = "2px solid red";
		lToDateGroup.style.borderRadius = "7px";
		errSSSReport = 1;
	}
	
/*	var formValid = false;
	var i = 0;
	while (!formValid && i < radios.length) {
	    if (radios[i].checked) formValid = true;
	    i++;        
	}

	if (!formValid) {
		document.getElementById('alertReportFormat').innerHTML = "Please select a Report Format.";
		radioGroup.style.border = "2px solid red";
		errSSSReport = 1;
	}*/
	
	/*if (fundHouseName == null || fundHouseName == "") {
		document.getElementById('alertFHouse').innerHTML="Please select Mutual Fund";
		lFundHouseName.style.border = "2px solid red";
		errSSSReport = 1;
	}*/
	if(hasValue(fundHouseName) && !hasValue(isin)){
			
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		lSchemeName.style.border = "2px solid red";
		errSSSReport = 1;
	}
	
	/*var isCheckedType = false;
	var counter = 0;
	while (!isCheckedType && counter < checkBoxes.length) {
	    if (checkBoxes[counter].checked) isCheckedType = true;
	    counter++;        
	}
	if (!isCheckedType) {
		document.getElementById('alertReportType').innerHTML = "Please select a report type.";
		checkGroup.style.border = "2px solid red";
		errSSSReport = 1;lReportType
	}*/
	
	if (reportType == null || reportType == "") {
		document.getElementById('alertReportType').innerHTML="Please select Report Type";
		lReportType.style.border = "2px solid red";
		errSSSReport = 1;
	}
	
	if (reportFormat == null || reportFormat == "") {
		document.getElementById('alertReportFormat').innerHTML="Please select Report Format";
		lReportFormat.style.border = "2px solid red";
		errSSSReport = 1;
	}
	
	

	if (errSSSReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
		
}
//function validateTransactionReportGeneration(form) {
function validateTransactionReportGeneration(form,clientId,fundHouseName,isin,checkedFamilyMemberId) {
	
	//var lClients = document.getElementById("idClients");
	var lClients = document.getElementById("idClientsDrop");
	var lFamilyMemberCheckBox = document.getElementById("familyMemberCheckBox");
	var lFromDate = document.getElementById("idFromDate");
	var lFromDateGroup = document.getElementById("idFromDateGroup");
	var lToDate = document.getElementById("idToDate");
	var lToDateGroup = document.getElementById("idToDateGroup");
	var lFundHouseName = document.getElementById("idFHouseDrop");
	var lSchemeName = document.getElementById("idSchemeDrop");
	var lReportFormat = document.getElementById("idReportFormatRadioGroup");
	
	//var fundHouse = document.getElementById("idFHouse");
	//var schemeName = document.getElementById("idSName");
	
	var errTransReport = 0;
	
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
	//schemeName.style.borderRadius = "1px solid #ccc";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertClients').innerHTML = "";
	document.getElementById('alertFamilyMember').innerHTML = "";
	document.getElementById('alertFromDate').innerHTML = "";
	document.getElementById('alertToDate').innerHTML = "";
	document.getElementById('alertFHouse').innerHTML = "";
	document.getElementById('alertSName').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";
	
	/*var strUser = lClients.options[lClients.selectedIndex].value;
	
	if (strUser=="") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errTransReport = 1;
	}*/
	//alert("clientId " + clientId);
	if (clientId == null || clientId == "") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errTransReport = 1;
	}
	if(checkedFamilyMemberId == null || checkedFamilyMemberId == "") {
		document.getElementById('alertFamilyMember').innerHTML="Please select Family Member";
		lFamilyMemberCheckBox.style.border = "3px solid red";
		lFamilyMemberCheckBox.style.borderRadius = "7px";
		errTransReport = 1;
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
	
	if( (hasValue(lFromDate.value)) && (hasValue(lToDate.value)) && ((lToDate.value) < (lFromDate.value)) ) {
		document.getElementById('alertToDate').innerHTML="To-Date must be greater then or equal to From-Date";
		lToDateGroup.style.border = "2px solid red";
		lToDateGroup.style.borderRadius = "7px";
		errTransReport = 1;
	}
	
	/*if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		schemeName.style.border = "2px solid red";
		errTransReport = 1;
	}*/
	
	if(hasValue(fundHouseName) && !hasValue(isin)){
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		lSchemeName.style.border = "2px solid red";
		errTransReport = 1;
	}
	
	if (errTransReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
	
}

function validateTransactionReportExport(form, clientId, fundHouseName, isin, reportFormat, checkedFamilyMemberId) {
	
	//var lClients = document.getElementById("idClients");
	var lClients = document.getElementById("idClientsDrop");
	var lFamilyMemberCheckBox = document.getElementById("familyMemberCheckBox");
	var lFromDate = document.getElementById("idFromDate");
	var lFromDateGroup = document.getElementById("idFromDateGroup");
	var lToDate = document.getElementById("idToDate");
	var lToDateGroup = document.getElementById("idToDateGroup");
	var lFundHouseName = document.getElementById("idFHouseDrop");
	var lSchemeName = document.getElementById("idSchemeDrop");
	var lReportFormat = document.getElementById("idReportFormatRadioGroup");
	
	var errTransReport = 0;
	var type = document.getElementById("idReportFormatRadioGroup");
	
	//var fundHouse = document.getElementById("idFHouse");
	//var schemeName = document.getElementById("idSName");
			
	
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
	lReportFormat.style.borderRadius = "7px";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertClients').innerHTML = "";
	document.getElementById('alertFamilyMember').innerHTML = "";
	document.getElementById('alertFromDate').innerHTML = "";
	document.getElementById('alertToDate').innerHTML = "";
	document.getElementById('alertFHouse').innerHTML = "";
	document.getElementById('alertSName').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";
	
	//var strUser = lClients.options[lClients.selectedIndex].value;
	
	/*if (strUser=="") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errTransReport = 1;
	}
	else{
		document.getElementById('alertClients').innerHTML="";
	}*/
	
	if (clientId == null || clientId == "") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errTransReport = 1;
	}
	if(checkedFamilyMemberId == null || checkedFamilyMemberId == "") {
		document.getElementById('alertFamilyMember').innerHTML="Please select Family Member";
		lFamilyMemberCheckBox.style.border = "3px solid red";
		lFamilyMemberCheckBox.style.borderRadius = "7px";
		errTransReport = 1;
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
			document.getElementById('alertToDate').innerHTML = "To Date is not a valid date";
			lToDateGroup.style.border = "2px solid red";
			lToDateGroup.style.borderRadius = "7px";
			errTransReport = 1;
		} 
	}
	
	if( (hasValue(lFromDate.value)) && (hasValue(lToDate.value)) && ((lToDate.value) < (lFromDate.value)) ) {
		document.getElementById('alertToDate').innerHTML="To-Date must be greater then or equal to From-Date";
		lToDateGroup.style.border = "2px solid red";
		lToDateGroup.style.borderRadius = "7px";
		errTransReport = 1;
	}
	
	if(hasValue(fundHouseName) && !hasValue(isin)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		lSchemeName.style.border = "2px solid red";
		errTransReport = 1;
	}
	
	if ( !( document.getElementById('idExcel').checked ) && !( document.getElementById('idPDF').checked ) )
	{	
		document.getElementById('alertReportFormat').innerHTML="Please Select one option";
		lReportFormat.style.border = "2px solid red";
		errTransReport=1;
	}else{
		document.getElementById('alertReportFormat').innerHTML="";
		lReportFormat.style.border = "";
	}
	
	/*if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		schemeName.style.border = "2px solid red";
		errTransReport = 1;
	}*/
	
	if (errTransReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		document.getElementById('alertform').innerHTML="";
		return true;
	}
	
}
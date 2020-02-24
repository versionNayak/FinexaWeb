//var lReportType;
function validatePortfolioGainLossReportGeneration(form,clientId,fundHouseName,isin,checkedFamilyMemberId) {
	
	var lClients = document.getElementById("idClientsDrop");
	var lFamilyMemberCheckBox = document.getElementById("familyMemberCheckBox");
	var lAsOnDate = document.getElementById("idAsOnDate");
	var lAsOnDateGroup = document.getElementById("idAsOnDateGroup");
	var lFundHouseName = document.getElementById("idFHouseDrop");
	var lSchemeName = document.getElementById("idSchemeDrop");
	var lReportFormat = document.getElementById("idReportFormatRadioGroup");
	
	var errPGLReport = 0;
	
	lClients.style.border = "1px solid #ccc";
	lFamilyMemberCheckBox.style.border = "none";
	lFamilyMemberCheckBox.style.borderRadius = "7px";
	lAsOnDateGroup.style.border = "1px solid #ccc";
	lAsOnDateGroup.style.borderRadius = "7px";
	lFundHouseName.style.border = "1px solid #ccc";
	lSchemeName.style.border = "1px solid #ccc";
	lReportFormat.style.border = "none";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertClients').innerHTML = "";
	document.getElementById('alertFamilyMember').innerHTML = "";
	document.getElementById('alertAsOnDate').innerHTML = "";
	document.getElementById('alertFHouse').innerHTML = "";
	document.getElementById('alertSName').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";

	if (clientId == null || clientId == "") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errPGLReport = 1;
	}
	
	if(checkedFamilyMemberId == null || checkedFamilyMemberId == "") {
		document.getElementById('alertFamilyMember').innerHTML="Please select Family Member";
		lFamilyMemberCheckBox.style.border = "3px solid red";
		lFamilyMemberCheckBox.style.borderRadius = "7px";
		errPGLReport = 1;
	}
	
	if (!hasValue(lAsOnDate.value)) {
		document.getElementById('alertAsOnDate').innerHTML="Please enter As On Date";
		lAsOnDateGroup.style.border = "2px solid red";
		lAsOnDateGroup.style.borderRadius = "7px";
		errPGLReport = 1;
	} else {
		document.getElementById('alertAsOnDate').innerHTML="";
		window.asOnDate = moment(lAsOnDate.value, 'DD/MM/YYYY');
		if (!window.asOnDate.isValid()) {
			document.getElementById('alertAsOnDate').innerHTML = "As On Date is not a valid date";
			lAsOnDateGroup.style.border = "2px solid red";
			lAsOnDateGroup.style.borderRadius = "7px";
			errPGLReport = 1;
		} 
	}
	
	/*if(hasValue(fundHouseName) && !hasValue(isin)){
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		lSchemeName.style.border = "2px solid red";
		errPGLReport = 1;
	}*/
	if(hasValue(fundHouseName) && !hasValue(isin)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		lSchemeName.style.border = "2px solid red";
		errPGLReport = 1;
	}
	
	if (errPGLReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
}

function validatePortfolioGainLossReportExport(form,clientId,fundHouseName,isin,reportFormat,checkedFamilyMemberId) {
	
	var lClients = document.getElementById("idClientsDrop");
	var lFamilyMemberCheckBox = document.getElementById("familyMemberCheckBox");
	var lAsOnDate = document.getElementById("idAsOnDate");
	var lAsOnDateGroup = document.getElementById("idAsOnDateGroup");
	var lFundHouseName = document.getElementById("idFHouseDrop");
	var lSchemeName = document.getElementById("idSchemeDrop");
	var lReportFormat = document.getElementById("idReportFormatRadioGroup");
	//var radios = document.getElementsByName("reportFormat");
	//var radioGroup = document.getElementById("idReportFormatRadioGroup");
		
	var errPGLReport = 0;
	
	lClients.style.border = "1px solid #ccc";
	lFamilyMemberCheckBox.style.border = "none";
	lFamilyMemberCheckBox.style.borderRadius = "7px";
	lAsOnDateGroup.style.border = "1px solid #ccc";
	lAsOnDateGroup.style.borderRadius = "7px";
	lFundHouseName.style.border = "1px solid #ccc";
	lSchemeName.style.border = "1px solid #ccc";
	lReportFormat.style.border = "none";
	lReportFormat.style.borderRadius = "7px";
	//radioGroup.style.border = "none";
	
	document.getElementById('alertform').innerHTML = "";
	document.getElementById('alertClients').innerHTML = "";
	document.getElementById('alertFamilyMember').innerHTML = "";
	document.getElementById('alertAsOnDate').innerHTML = "";
	document.getElementById('alertFHouse').innerHTML = "";
	document.getElementById('alertSName').innerHTML = "";
	document.getElementById("alertReportFormat").innerHTML = "";
	
	if (clientId == null || clientId == "") {
		document.getElementById('alertClients').innerHTML="Please select a Client";
		lClients.style.border = "2px solid red";
		errPGLReport = 1;
	}
	
	if(checkedFamilyMemberId == null || checkedFamilyMemberId == "") {
		document.getElementById('alertFamilyMember').innerHTML="Please select Family Member";
		lFamilyMemberCheckBox.style.border = "3px solid red";
		lFamilyMemberCheckBox.style.borderRadius = "7px";
		errPGLReport = 1;
	}
	
	if (!hasValue(lAsOnDate.value)) {
		document.getElementById('alertAsOnDate').innerHTML="Please enter As On Date";
		lAsOnDateGroup.style.border = "2px solid red";
		lAsOnDateGroup.style.borderRadius = "7px";
		errPGLReport = 1;
	} else {
		document.getElementById('alertAsOnDate').innerHTML="";
		window.asOnDate = moment(lAsOnDate.value, 'DD/MM/YYYY');
		if (!window.asOnDate.isValid()) {
			document.getElementById('alertAsOnDate').innerHTML = "As On Date is not a valid date";
			lAsOnDateGroup.style.border = "2px solid red";
			lAsOnDateGroup.style.borderRadius = "7px";
			errPGLReport = 1;
		} 
	}
	if(hasValue(fundHouseName) && !hasValue(isin)){
		
		document.getElementById('alertSName').innerHTML="Please select a scheme ";
		lSchemeName.style.border = "2px solid red";
		errPGLReport = 1;
	}
	
	/*var formValid = false;
	var i = 0;
	while (!formValid && i < radios.length) {
	    if (radios[i].checked) formValid = true;
	    i++;        
	}

	if (!formValid) {
		document.getElementById('alertReportFormat').innerHTML = "Please select a Report Format.";
		//radioGroup.style.border = "2px solid red";
		errPGLReport = 1;
	}*/
	
	if (reportFormat == null || reportFormat == "") {
		document.getElementById('alertReportFormat').innerHTML="Please select Report Format";
		lReportFormat.style.border = "2px solid red";
		errPGLReport = 1;
	}
	
	if (errPGLReport==1){
		document.getElementById('alertform').innerHTML="Please correct the errors highlighted below.";
		$(window).scrollTop(0);
		return false;
	} else {
		return true;
	}
	
}
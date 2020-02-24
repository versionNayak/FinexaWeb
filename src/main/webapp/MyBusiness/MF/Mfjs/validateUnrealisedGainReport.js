var lReportType;
function validateCurrentHoldingReportGeneration(form) {
        //var lClients = document.getElementById("idClientsUR");
		var lAsOnDate = document.getElementById("idAsOnDate");
		var lAsOnDateGroup = document.getElementById("idAsOnDateGroup");
		var radioGroup = document.getElementById("idReportFormatRadioGroupUR");
		
		var fundHouse = document.getElementById("idFHouseUR");
		var schemeName = document.getElementById("idSNameUR");
		
		var errURGReport = 0;
		
		//lClients.style.border = "1px solid #ccc";
		lAsOnDateGroup.style.border = "1px solid #ccc";
		lAsOnDateGroup.style.borderRadius = "7px";
		radioGroup.style.border = "none";
		
		document.getElementById('alertform').innerHTML = "";
		document.getElementById('alertClientsUR').innerHTML= "";
		document.getElementById('alertAsOnDate').innerHTML = "";
		document.getElementById("alertReportFormatUR").innerHTML = "";
		
		//var strUser = lClients.options[lClients.selectedIndex].value;
		
		/*if (strUser=="") {
			document.getElementById('alertClientsUR').innerHTML="Please select a Client";
			lClients.style.border = "2px solid red";
			errURGReport = 1;
		}*/
		
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
		
		
		if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
			
			document.getElementById('alertSNameUR').innerHTML="Please select a scheme ";
			schemeName.style.border = "2px solid red";
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

function validateCurrentHoldingReportExport(form) {
		//var lClients = document.getElementById("idClientsUR");
		var lAsOnDate = document.getElementById("idAsOnDate");
		var lAsOnDateGroup = document.getElementById("idAsOnDateGroup");
		var radios = document.getElementsByName("reportFormatUR");
		var radioGroup = document.getElementById("idReportFormatRadioGroupUR");
		
		var fundHouse = document.getElementById("idFHouseUR");
		var schemeName = document.getElementById("idSNameUR");
		
		var errURGReport = 0;
		
		//lClients.style.border = "1px solid #ccc";
		lAsOnDateGroup.style.border = "1px solid #ccc";
		lAsOnDateGroup.style.borderRadius = "7px";
		radioGroup.style.border = "none";
		
		document.getElementById('alertform').innerHTML = "";
		document.getElementById('alertClientsUR').innerHTML= "";
		document.getElementById('alertAsOnDate').innerHTML = "";
		document.getElementById("alertReportFormatUR").innerHTML = "";
		
		//var strUser = lClients.options[lClients.selectedIndex].value;
		
		/*if (strUser=="") {
			document.getElementById('alertClientsUR').innerHTML="Please select a Client";
			lClients.style.border = "2px solid red";
			errURGReport = 1;
		}*/
		
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
		
		
		if(hasValue(fundHouse.value) && !hasValue(schemeName.value)){
			
			document.getElementById('alertSNameUR').innerHTML="Please select a scheme ";
			schemeName.style.border = "2px solid red";
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
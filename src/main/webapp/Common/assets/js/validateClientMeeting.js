
function clearClientMeeting(mode,clientType) {
	var lName;
	//alert(mode);
	if(mode=="ADD"){
	if(clientType == 'Existing'){
		 lName = document.getElementById("idExistingNameMeeting");
	}
		if(clientType == 'Prospect'){
		 lName = document.getElementById("idProspectNameMeeting");
	}
	
	
	var lMobile = document.getElementById("idMobileMeeting");
	var lStatus = document.getElementById("idStatusMeeting");
	var lDate = document.getElementById("idaddmtngdate");
	var lTime = document.getElementById("timepicker1");
	
	document.getElementById('alertADDNameMeeting').innerHTML="";
	document.getElementById('alertADDDateMeeting').innerHTML="";
	document.getElementById('alertADDTimeMeeting').innerHTML="";
	document.getElementById('alertADDMobMeeting').innerHTML="";
	document.getElementById('alertADDStatusMeeting').innerHTML="";
	
	}else{
	var lName = document.getElementById("idEditName");
	var lMobile = document.getElementById("idEditMobile");
	var lStatus = document.getElementById("idEditStatus");
	var lDate = document.getElementById("ideditmtngDate");
	var lTime = document.getElementById("timepicker3");
	
	document.getElementById('alertEditNameMeeting').innerHTML="";
	document.getElementById('alertEditDateMeeting').innerHTML="";
	document.getElementById('alertEditTimeMeeting').innerHTML="";
	document.getElementById('alertEditMobMeeting').innerHTML="";
	document.getElementById('alertEditStatusMeeting').innerHTML="";
	}

	
	lName.style.border   = "1px solid #ccc";	
	lMobile.style.border = "1px solid #ccc";
	lStatus.style.border = "1px solid #ccc";
	lDate.style.border   = "1px solid #ccc";
	lTime.style.border   = "1px solid #ccc";
}
function validateClientMeeting(form,mode,clientType,clientID,countryCode) {
	//alert("clientType "+clientType);
	var errClientMeeting = 0;
	var clientName = "";
	console.log("clientType "+clientType);
	//alert(mode);
	if(mode==="ADD"){
	if(clientType == 'Existing'){
	var lName = document.getElementById("idExistingNameMeeting");
	var $option = $("#idExistingNameMeeting").find('option:selected');
	clientName = $option.text();
	
	}
	if(clientType == 'Prospect'){
		var lName = document.getElementById("idProspectNameMeeting");
		clientName = lName.value; 
	}

	
	var lMobile = document.getElementById("idMobileMeeting");
	var lStatus = document.getElementById("idStatusMeeting");
	var lDate = document.getElementById("idaddmtngdate");
	var lTime = document.getElementById("timepicker1");
   
   }else
   {
	var lName = document.getElementById("idEditName");
	clientName = lName.value; 
	var lMobile = document.getElementById("idEditMobile");
	var lStatus = document.getElementById("idEditStatus");
	var lDate = document.getElementById("ideditmtngDate");
	var lTime = document.getElementById("timepicker3");
	}
	
	lName.style.border   = "1px solid #ccc";	
	lMobile.style.border = "1px solid #ccc";
	lStatus.style.border = "1px solid #ccc";
	lDate.style.border   = "1px solid #ccc";
	lTime.style.border   = "1px solid #ccc";
	
	var alertName="",alertDate="",alertTime="",alertMob="",alertStatus="";
	
	if(mode=="ADD"){
	alertName = document.getElementById('alertADDNameMeeting');	
	alertDate = document.getElementById('alertADDDateMeeting');
	alertTime = document.getElementById('alertADDTimeMeeting')	
	alertMob = document.getElementById('alertADDMobMeeting')
	alertStatus = document.getElementById('alertADDStatusMeeting')
	}else{
	alertName = document.getElementById('alertEditNameMeeting')
	alertDate = document.getElementById('alertEditDateMeeting');
	alertTime = document.getElementById('alertEditTimeMeeting');
	alertMob = document.getElementById('alertEditMobMeeting');		
	alertStatus = document.getElementById('alertEditStatusMeeting');
	}
	
	
	alertName.innerHTML="";
	alertName.style.color = "red";
	alertDate.innerHTML="";
	alertDate.style.color = "red";
	alertTime.innerHTML="";
	alertTime.style.color = "red";
	alertMob.innerHTML="";
	alertMob.style.color = "red";
	alertStatus.innerHTML="";
	alertStatus.style.color = "red";
	
	
	//validation name
	
	if (!hasValue(lName.value)){
		alertName.innerHTML = "Please enter name";
		lName.style.border = "2px solid red";
		errClientMeeting=1;
		}	
	else {
		var chkAlpha = isCharForName(clientName);
		if (!chkAlpha){
			alertName.innerHTML = "Please enter only alphabets for name";
		//	alert(alertName.innerHTML);
			lName.style.border = "2px solid red";
			errClientMeeting=1;
		}
	}
	
//	Validate mobile
	
	if (!hasValue(lMobile.value)){
		lMobile.style.border = "2px solid red";
		alertMob.innerHTML="Please enter contact number";
		errClientMeeting=1;
		}	
	else 
	   {
	    if (!isInteger(lMobile.value)){
	    alertMob.innerHTML="Please enter valid contact number";
	    lMobile.style.border = "2px solid red";
		errClientMeeting=1;
	    }
	    else{ if (lMobile.value.length!=10){		
	    alertMob.innerHTML="Please enter 10 digit contact number";
		lMobile.style.border = "2px solid red";
		errClientMeeting=1;
			}
		 }
	   }
	//validation date
	
	if (!hasValue(lDate.value)){
		alertDate.innerHTML="Please enter date";
		lDate.style.border = "2px solid red";
		errClientMeeting=1;
	}else{
		
		if(!validateDate(lDate.value)){
		 alertDate.innerHTML="Please enter a valid date";
		 lDate.style.border = "2px solid red";
		 errClientMeeting=1;
		 }
		}
	//validate time
	if (!hasValue(lTime.value)){
		alertTime.innerHTML="Please enter Time";
		lTime.style.border = "2px solid red";
		errClientMeeting=1;
		}	
	
	//validate status
	
	if (!hasValue(lStatus.value)){
		alertStatus.innerHTML="Please enter Status";
		lStatus.style.border = "2px solid red";
		errClientMeeting=1;
		}	
	
	
	if (errClientMeeting==1){
			return false;
		}
		else{
			//alert(true);
			return true;
		}
	
}
	

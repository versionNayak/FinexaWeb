
function clearClientTask(mode,clientType) {
	var lName;
	//alert(mode);
	if(mode=="ADD"){
	if(clientType == 'ExistingClient'){
		 lName = document.getElementById("idADDExistingTaskName");
	}
		if(clientType == 'ProspectClient'){
		 lName = document.getElementById("idADDProspectTaskName");
	}
	
	var lDate = document.getElementById("idaddtaskDate");
	var lTime = document.getElementById("timepicker2");
	
	document.getElementById('alertADDNameTask').innerHTML="";
	document.getElementById('alertADDDateTask').innerHTML="";
	document.getElementById('alertADDTimeTask').innerHTML="";
	
	
	}else{
	var lName = document.getElementById("idEditTaskName");
	var lDate = document.getElementById("idedittaskDate");
	var lTime = document.getElementById("timepicker4");
	
	document.getElementById('alertEditNameTask').innerHTML="";
	document.getElementById('alertEditDateTask').innerHTML="";
	document.getElementById('alertEditTimeTask').innerHTML="";
	
	}

	
	lName.style.border   = "1px solid #ccc";	
	lDate.style.border   = "1px solid #ccc";
	lTime.style.border   = "1px solid #ccc";

}










function validateClientTask(form,mode,clientType) {
	//alert("clientType "+clientType);
	//alert("mode "+mode);
	var errClientTask = 0;
	var clientName = "";
	if(mode==="ADD"){
	if(clientType == 'ExistingClient'){
	var lName = document.getElementById("idADDExistingTaskName");
	var $option = $("#idADDExistingTaskName").find('option:selected');
	 clientName = $option.text();
	}
	if(clientType == 'ProspectClient'){
		var lName = document.getElementById("idADDProspectTaskName");
		clientName = lName.value; 
	}
	
	
	var lDate = document.getElementById("idaddtaskDate");
	//var lIdCalendar = document.getElementById("idTaskCalendar");
	var lTime = document.getElementById("timepicker2");
   
	
	
   }else
   {
	var lName = document.getElementById("idEditTaskName");
	clientName = lName.value; 
	var lDate = document.getElementById("idedittaskDate");
	var lTime = document.getElementById("timepicker4");
	}
	
	lName.style.border   = "1px solid #ccc";	
	lDate.style.border   = "1px solid #ccc";
	lTime.style.border   = "1px solid #ccc";
	
	
	
    var alertName="",alertDate="",alertTime="";
	
	if(mode=="ADD"){
	alertName = document.getElementById('alertADDNameTask');	
	alertDate = document.getElementById('alertADDDateTask');
	alertTime = document.getElementById('alertADDTimeTask')	
	
	}else{
	alertName = document.getElementById('alertEditNameTask')
	alertDate = document.getElementById('alertEditDateTask');
	alertTime = document.getElementById('alertEditTimeTask');
	
	}
	
	alertName.innerHTML="";
	alertName.style.color = "red";
	alertDate.innerHTML="";
	alertDate.style.color = "red";
	alertTime.innerHTML="";
	alertTime.style.color = "red";
	
	//validation name
	//alert("name "+lName.value);
	if (!hasValue(lName.value)){
		//alert("fff "+lName.value);
		alertName.innerHTML = "Please enter name";
		lName.style.border = "2px solid red";
		errClientTask=1;
		}	
	else {
		var chkAlpha = isCharForName(clientName);
		if (!chkAlpha){
			alertName.innerHTML = "Please enter only alphabets for name";
			lName.style.border = "2px solid red";
			errClientTask=1;
		}
	}

	//validation date
	
	if (!hasValue(lDate.value)){
		alertDate.innerHTML="Please enter date";
		lDate.style.border = "2px solid red";
		errClientTask=1;
	}else{		
		if(!validateDate(lDate.value)){
		 alertDate.innerHTML="Please enter a valid date";
		 lDate.style.border = "2px solid red";
		 errClientTask=1;
		 }
		}
	//validate time
	if (!hasValue(lTime.value)){
		alertTime.innerHTML="Please enter Time";
		lTime.style.border = "2px solid red";
		errClientTask=1;
		}	
	
	
	
	
	if (errClientTask==1){
			return false;
		}
		else{
			return true;
		}
	
}
	

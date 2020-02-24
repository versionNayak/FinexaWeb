var pageMode = sessionStorage.getItem("PAGE_MODE");		
var selectedImageFamilyMemberid;	
var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var saveURL='clientGoal/';
var selectedGoalID;
var agePlusRetirementage;
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
var selectedGoalType = sessionStorage.getItem("SELECTED_GOAL_TYPE");	
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function() {
		
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
		if(loggedClient.clientInfoAddEdit === "Y"){
			$("#idSaveGoal").show();
			$("#undo").show();
		}else if(loggedClient.clientInfoView === "Y"){
			//alert("new");
			$("#idSaveGoal").hide();
			$("#undo").hide();
		}
	}else if(loggedUser != null && loggedUser.role === "Admin"){
		$("#idSaveGoal").hide();
		$("#undo").hide();
	}else{
		if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
			$("#idSaveGoal").show();
			$("#undo").show();
		}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
			$("#idSaveGoal").hide();
			$("#undo").hide();
		}
	}
	
	$("#IdlookupGoalType").val(selectedGoalType);	
	populateFamilyMemberByClientIdCustom(selectedClientId,$("#familyMemberImage"));
	getpriority($("#idgoalPriority"),'clientGoal/getMaxPriority/'+selectedClientId);
	populatePayoutFrequency("select", $("#idpayoutFrequency"), 'AllGoalFrequency/');
	//getExpense($("#idcurrentAnnualExpense"),'expense/'+ selectedClientId);	
	
	var dayCurrent = moment().format('DD/MM/YYYY').slice(0,2);
	var monthCurrent = moment().format('DD/MM/YYYY').slice(3,5);
	var yearCurrent = moment().format('DD/MM/YYYY').slice(6);
	var currentDateReformatted  = yearCurrent.concat("-", monthCurrent, "-", dayCurrent);
	var currentDate = new Date(currentDateReformatted);
	getInflationRate($("#idinflationRate"),ClientServiceUrl+'clientGoal/getInflationRate/'+selectedGoalType+'/'+currentDate);
	
	document.getElementById("idpayoutFrequency").value = 4;
	
	if (pageMode=="EDIT") {
		getSelectedRetirementGoal();
		
	} else if (pageMode=="ADD") {
		getExpense($("#idcurrentAnnualExpense"),'expense/'+ selectedClientId);	
	}
	
	if(selectedGoalType == "8"){
		$("#idpayoutFrequency option[value='5']").remove();
		$("#idpayoutFrequency option[value='6']").remove();
		$("#idpayoutFrequency option[value='7']").remove();
		$("#idpayoutFrequency option[value='8']").remove();
	  }
	
	$("#idcurrentAnnualExpense").focus();
	$('#focusguard-2').on('focus', function() {
		$("#idcurrentAnnualExpense").focus();
		$(window).scrollTop(0);
	});	
});

function getInflationRate(textBoxId,serviceUrl){
	$.ajax({
		url : serviceUrl,
		type : "GET",
		dataType : 'json',
		contentType : "application/json; charset=utf-8",
		beforeSend: function (xhr){ 
	    	xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		},
		success : function(data) {
			textBoxId.val(((data.inflationRate)*100).toFixed(2));
			sessionStorage.removeItem("InflationRate");
			sessionStorage.setItem("InflationRate", ((data.inflationRate)*100).toFixed(2));
		},
		error : function(jqXHR, exception) {
			var msg = ''; 
		        if(jqXHR.status == 401){
		        	var error,error_description;
		        	error = jqXHR.responseJSON.error_description;
		        	error_description = "Access token expired: "+sessionStorage.getItem("sessionID");
		        	if(error === error_description){
		        		msg = "Your session has expired.Please log in again"
		        		bootbox.alert({
				        	 message: msg,
				        	 callback: function () {
					         window.location = "../index.html";
				         }
				      })
		        	}
		        	if(error === "unauthorized"){
		        		msg = "Full authentication is required to access this resource",
		        		bootbox.alert({
				        	 message: msg
				        })
		        	}	
		        } 
			console.log("Error to fetch Country data from service "+data.responseText);
		}
    });
}

function getCorpusGoalStart(textBoxId,serviceUrl){
	
	getClientData("GET", "", serviceUrl, getCorpusGoalStartSuccess);
	function getCorpusGoalStartSuccess(data) {
		textBoxId.val(((data.mlr)*100).toFixed(2));
	}

}

function getExpense(textBoxId,serviceUrl){
	//alert("Getting Expense" + selectedClientId);
	serviceurl = "expense/" + selectedClientId;
	getClientData("GET", "", serviceUrl, getExpenseSuccess);
	function getExpenseSuccess(data) {
		if(data.expenseAmount!=0){
			textBoxId.val(data.expenseAmount);
			sessionStorage.removeItem("ExpenseAmount");
			sessionStorage.setItem("ExpenseAmount", data.expenseAmount);
			//alert(sessionStorage.getItem("ExpenseAmount"));
			maskAmount(textBoxId);
		}else{
			textBoxId.val("");	
		}
	}
}

function getEditedValue(textBoxId,val){
	if(val != 0){
		textBoxId.val(val);
		sessionStorage.removeItem("ExpenseAmount");
		sessionStorage.setItem("ExpenseAmount", val);
		console.log("Here");
	}else{
		textBoxId.val("");	
	}

}

function getpriority(textBoxId,serviceUrl){
	
	getClientData("GET", "", serviceUrl, getPrioritySuccess);
	function getPrioritySuccess(data) {
		textBoxId.val(data.priority);
		sessionStorage.removeItem("GoalPriority");
		sessionStorage.setItem("GoalPriority", data.priority);
	}
	
}

function populatePayoutFrequency(name, dropdownId, serviceUrl) {
	
	getClientDataAsyncFalse("GET", "", serviceUrl, getPayOutFreqSuccess);
	function getPayOutFreqSuccess(data) {
		dropdownId.find('option').remove();
		dropdownId.append('<option value="">Select</option>');
		$.each(data,function(index, item) {
			dropdownId.append('<option value="' + item.id + '">'
								+ item.description
								+ '</option>');
			});
	}
	
}
	
$("#idSaveGoal").on('click', function (e) {
	console.log('In idSaveGoal click function');
	e.preventDefault();
	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	if(selectedImageFamilyMemberid==undefined){
		//alert("Please select a family member");
		return false;
	}else{
		var serviceUrl = "clientGoal/getAgePlusRetirementAge/" + selectedImageFamilyMemberid;
		getClientDataAsyncFalse("GET", "", serviceUrl,onSuccessAgePlusRetirementage);
		function onSuccessAgePlusRetirementage(data) {
			agePlusRetirementage=data.startMonthYear;
		}
		
		unmaskAmount('#idcurrentAnnualExpense');
	    var form= document.getElementById("GoalForm");
		var validate=validateRetirementGoal(form);
		if(validate) {
			saveGoal();
		}
	}
});

$("#undo").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});

function undoChange(){
	updatedUNDO();
	
	if(pageMode=="ADD"){
		$(".form-control").val("");
		$("#idgoalPriority").val(sessionStorage.getItem("GoalPriority"));
		getExpense($("#idcurrentAnnualExpense"),'expense/'+ selectedClientId);
		$("#idcurrentAnnualExpense").val(sessionStorage.getItem("ExpenseAmount"));
		maskAmount($("#idcurrentAnnualExpense"));
		$("#idinflationRate").val(sessionStorage.getItem("InflationRate"));
	} else {
		if(pageMode=="EDIT"){
			getSelectedRetirementGoal();
		}
	}
}

function updatedUNDO(){
	var lGoalPriority = document.getElementById("idgoalPriority"); 
	var lPayoutFrequency = document.getElementById("idpayoutFrequency");
	var lCurrentAnnualExpense = document.getElementById("idcurrentAnnualExpense");
	var lInflationRate = document.getElementById("idinflationRate"); 
	
	lGoalPriority.style.border = "1px solid #ccc";
	lPayoutFrequency.style.border = "1px solid #ccc";
	lCurrentAnnualExpense.style.border = "1px solid #ccc";
	lInflationRate.style.border = "1px solid #ccc";
	
	document.getElementById('alertgoalpriority').innerHTML="";
	document.getElementById('alertpayoutfrequency').innerHTML="";
	document.getElementById('alertcurrentannualexpense').innerHTML="";
	document.getElementById('alertinflationrate').innerHTML="";
	document.getElementById('alertform').innerHTML="";
}

function getSelectedRetirementGoal(){
	selectedGoalID = sessionStorage.getItem("SELECTED_GOAL_ID");
	console.log('Selected Goal ID: '+selectedGoalID);
	getClientData("GET", "", "clientGoal/"+selectedGoalID, onGetGoalDataSuccess);
	function onGetGoalDataSuccess(data) {
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.clientFamilyMemberId);
		selectedImageFamilyMemberid=data.clientFamilyMemberId;
		poupulateFamilyMemberImage(data.clientFamilyMemberId);
		if(data.expectedInflationRate!=null){
		data.expectedInflationRate=(data.expectedInflationRate*100).toFixed(2);
		}
		if(data.expectedReturnOnCorpus!=null){
		data.expectedReturnOnCorpus=(data.expectedReturnOnCorpus*100).toFixed(2);
		}
		getEditedValue($("#idcurrentAnnualExpense"),data.postRetirementAnnualExpense);
		//maskAmount("#idcurrentAnnualExpense");
//		getExpense($("#idcurrentAnnualExpense"),'expense/'+ selectedClientId);	
		populateForm($('#GoalForm'),data); 
		maskAmount("#idcurrentAnnualExpense");
	} 
}

	
function saveGoal() {
	showLoaderOnSave("#idSaveGoal");
	window.setTimeout(function(){
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	var formData = $('#GoalForm').serializeToJSON();
	formData["clientId"] = selectedClientId;
	formData["clientFamilyMemberId"] = selectedImageFamilyMemberid;
	if (agePlusRetirementage != null) {
		formData["startMonthYear"]=agePlusRetirementage;
	}
	
	if (pageMode=="EDIT") {
		console.log('Goal ID: '+selectedGoalID);
		formData["id"] = selectedGoalID;
		saveURL = "editClientGoal/";
	} else {
		saveURL = "clientGoal/";
	}
	var data = JSON.stringify(formData);
	console.log('In Retirement Goal Save: '+data);
	saveData("POST", data,saveURL,onCreateGoalSuccess);
	function onCreateGoalSuccess(data) {
		hideLoaderOnSave("#idSaveGoal");
		serviceurl = "clientGoalList/"+ selectedClientId;
		getClientData("GET", "",serviceurl, onSuccess);		
		function onSuccess(data) {
			sessionStorage.setItem("GOAL_LIST", JSON.stringify(data));
			$("#idClient").empty();
			$("#idClient").load("clientInfo/viewGoal.html");
			$(".dashboardheading    ").html("");
		    $(".dashboardheading    ").html("Goal");
			$("#addRecord").removeClass('btn_Disabled');
			$('#editRecord').addClass('btn_Disabled');
			$('#deleteRecord').addClass('btn_Disabled');		    
		}
	}
	
		}, 5000);	

}

function populateFamilyMemberByClientIdCustom(clientId, tableRowId) {

	getClientData("GET", "", "clientFamilyMemberImageByClient/" + clientId, familyMemberSuccess);
	function familyMemberSuccess(data) {
		var gender;
		tableRowId.empty();
		$.each(data,function(index, item) {
			console.log(item);
			sessionStorage.removeItem("RELATION_ID");
			sessionStorage.setItem("RELATION_ID", item.relationID);
							if (item.relationID === 0) {
								
								sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",item.id);
								
								gender=item.gender;
								if (gender === 'M') {
									tableRowId
											.append('<td><img src="../Common/assets/images/icons/Man-C.png" id="'
													+ item.id
													+ '" onClick="onClickImage('
													+ item.id
													+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>&nbsp;</td>');
								} else {
									tableRowId
											.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
													+ item.id
													+ '" onClick="onClickImage('
													+ item.id
													+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>&nbsp;</td>');
								}

							}
							
						});
	}

}

function onClickImage(id) {
	var newSrc;
	$('#familyMemberImage  > td').each(function() {
		if ($(this).find('img').attr('id') != id) {
			newSrc = $(this).find('img').attr('src').replace("-C", "-A");
			$(this).find('img').attr('src', newSrc);
		} else {
			newSrc = $(this).find('img').attr('src').replace("-A", "-C");
			$(this).find('img').attr('src', newSrc);
		}
	});

	
	sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",id);
	if(typeof onCustomImageClick==="function")
		{
		onCustomImageClick();
		}
}


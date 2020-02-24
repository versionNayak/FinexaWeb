var pagemode = sessionStorage.getItem("PAGE_MODE");	
var selectedImageFamilyMemberid;	
var saveURL='clientGoal/';
var selectedGoalID;
var goalRecurringId = "";
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function() {
	console.log('Ín addGoalNonRetirementRecurring.js Page mode: '+pagemode);
	
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
	
	
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$("#idgoalStartMonthYear").datepicker({	
		format: "M-yyyy",
		startView: "months", 
		minViewMode: "months",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		endDate: '+100y',		 
		startDate : new Date()
	});
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});

	//var lookupGoalTypeId=sessionStorage.getItem("GoalTypeId");
	//console.log("type "+lookupGoalTypeId);
	//$("#IdlookupGoalType").val(lookupGoalTypeId);

	var selectedGoalType = sessionStorage.getItem("SELECTED_GOAL_TYPE");		
	console.log('Ín addGoalNonRetirementRecurring.js Goal Type: '+ selectedGoalType);
	$("#IdlookupGoalType").val(selectedGoalType);
	
	//console.log("val "+$("#IdlookupGoalType").val());
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	
	
	populateFamilyMemberByClientId(selectedClientId, $("#familyMemberImage"));	
	//console.log("sessionStorage "+sessionStorage.getItem("CLIENT_SERVICE_URL"));
	
	if (pagemode == "EDIT") {
		$("#idgoalPriority").val(" ");
	}
	
	if (pagemode == "ADD") {
		getpriority($("#idgoalPriority"),'clientGoal/getMaxPriority/'+selectedClientId);
	}
	
	
	
	populateCorpusUtilizationFrequency("select", $("#idcorpusFrequency"), 'AllGoalFrequency/');

	//var lLoanRequired = document.getElementById("idloanRequired");
	//var lLoanRequiredSelectedValue = lLoanRequired.options[lLoanRequired.selectedIndex].value;
	var lLoanRequiredSelectedValue="N";
	//$("#idloanRequired").val();   
	console.log('lLoanRequiredSelectedValue: '+lLoanRequiredSelectedValue);	
	loanrequired(lLoanRequiredSelectedValue);
	
	getLifeExpectancy($("#idClientLifeExpectancy"),'clientGoal/getLifeExpectency/'+selectedClientId);    
	getBirthPlusLEDate($("#idBirthDatePlusLE"),'clientGoal/getDate/'+selectedClientId);  

	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	console.log("id "+selectedImageFamilyMemberid);
	
	//console.log("age service url"+ClientServiceUrl+'clientGoal/getAge/'+selectedImageFamilyMemberid);
	getAge($("#age"),'clientGoal/getAge/'+selectedImageFamilyMemberid);
	//getInflationRate($("#idinflationRate"),ClientServiceUrl+'clientGoal/getInflationRate/'+lookupGoalTypeId);
	//alert(moment().format('D/MM/YYYY'));
	var dayCurrent = moment().format('DD/MM/YYYY').slice(0,2);
	var monthCurrent = moment().format('DD/MM/YYYY').slice(3,5);
	var yearCurrent = moment().format('DD/MM/YYYY').slice(6);
	var currentDateReformatted  = yearCurrent.concat("-", monthCurrent, "-", dayCurrent);
	var currentDate = new Date(currentDateReformatted);
	getInflationRate($("#idinflationRate"),'clientGoal/getInflationRate/'+selectedGoalType+'/'+currentDate);
	getCorpusGoalStart($("#idreturnRate"),'clientGoal/getCorpusPostGoalStart');	
	
	if (pagemode=="EDIT") {
		
		getSelectedGoalNonRetirementRecurring();
		
	}	
	
	$("#idgoalDescription").focus();
	$('#focusguard-2').on('focus', function() {
		// "last" focus guard got focus: set focus to the first field
		//console.log('focusguard-2');
		$("#idgoalDescription").focus();
		$(window).scrollTop(0);
	});	
	
	
	/*$("#idRecurringFlagGroup input[name='recurringFlag']").click(function(){
		goalRecurringId = $("input[name='recurringFlag']:checked").val();
		switch (goalRecurringId) {
	    case "Y":
	    	$("#idcorpusFrequency").val("");
			$("#idcorpusFrequency").prop("disabled", false);
			$("#idGoalNo").show();
			/*$('#emi-original').show();
			$('#emi-outstanding').hide();
			$('#nonemi-header').hide();
	        break;
	    case "N":
	    	$("#idcorpusFrequency").val("5");
			$("#idcorpusFrequency").prop("disabled", true);
			$("#idGoalNo").hide();
	        break;
		}						
	});*/
	
	//CIUAT-757
	$("input:radio[name=recurringFlag]").change(function(){
	    // Do something interesting here
		if ($(this).val() == "N") {
			$("#idcorpusFrequency").val("5");
			$("#idcorpusFrequency").prop("disabled", true);
			$("#idGoalNo").hide();
			//$("#idgoalNumber").hide();
			//idgoalNumber
		} else {
			$("#idcorpusFrequency").val("");
			$("#idcorpusFrequency").prop("disabled", false);
			$("#idGoalNo").show();
		}
	});
	
});

$("#undo").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});

function undoChange(){
	//alert("in undochange Non Retirement Recurring");
	updatedUNDO();
	
		if (pagemode=="ADD") {
			$(".form-control").val("");
			$("#idinflationRate").val(sessionStorage.getItem("InflationRate"));
			$("#idgoalPriority").val(sessionStorage.getItem("GoalPriority"));
			$("#idgoalRecurring").prop("checked", true);
			$("#idgoalRecurring1").prop("checked", false);
			$("#divLoanPercent").hide();
			$("#divLoanInterestRate").hide();
			$("#divLoanTenure").hide();
		} else {
			if (pagemode=="EDIT") {
				getSelectedGoalNonRetirementRecurring();
			}
		}
			
}

function updatedUNDO() {
	var lClientLE = document.getElementById("idClientLifeExpectancy");				
	var lGoalType = document.getElementById("idgoalType");		
	var lGoalDescription = document.getElementById("idgoalDescription");
	var lGoalPriority = document.getElementById("idgoalPriority"); 
	var lGoalStartDate = document.getElementById("idgoalStartMonthYear");		
	var lGoalStartDateGroup = document.getElementById("idGoalStartDateGroup");		
	var lCorpusFrequency = document.getElementById("idcorpusFrequency");
	var lEstimatedCost = document.getElementById("idestimatedCost");
	var lLoanRequired = document.getElementById("idloanRequired");
	var lInflationRate = document.getElementById("idinflationRate"); 
	var lLoanPercent = document.getElementById("idloanPercent");
    var lLoanInterestRate = document.getElementById("idloanInterestRate");
	var lLoanTenure = document.getElementById("idloanTenure");
	var lGoalNumber = document.getElementById("idgoalNumber");
	var lBirthDatePlusLE = document.getElementById("idBirthDatePlusLE");
	var lbirthdate = document.getElementById("idbirthDate");
	var lAge = document.getElementById("idAge");

	lGoalDescription.style.border = "";
	lGoalPriority.style.border = "";
	lGoalStartDate.style.border = "";
    lGoalStartDateGroup.style.border = "";
    lGoalStartDateGroup.style.borderRadius = "";
	lCorpusFrequency.style.border = "";
	lEstimatedCost.style.border = "";
	lLoanRequired.style.border = "";
	lInflationRate.style.border = "";
	lLoanPercent.style.border = "";
	lLoanInterestRate.style.border = "";
	lLoanTenure.style.border = "";
	lGoalNumber.style.border = "";
	
	document.getElementById('alertgoaldescription').innerHTML="";
	document.getElementById('alertgoalpriority').innerHTML="";
	document.getElementById('alertgoalstartdate').innerHTML="";
	document.getElementById('alertcorpusfrequency').innerHTML="";
	document.getElementById('alertestimatedcost').innerHTML="";
	document.getElementById('alertloanrequired').innerHTML="";
	document.getElementById('alertinflationrate').innerHTML="";
	document.getElementById('alertloanpercent').innerHTML="";
	document.getElementById('alertloaninterestrate').innerHTML="";
	document.getElementById('alertloantenure').innerHTML="";
	document.getElementById('alertgoalnumber').innerHTML="";
	document.getElementById('alertform').innerHTML="";
}

function getSelectedGoalNonRetirementRecurring(){
	console.log("EDIT mode");
	selectedGoalID = sessionStorage.getItem("SELECTED_GOAL_ID");
	
 	getClientData("GET", "", "clientGoal/"+selectedGoalID, onGetGoalDataSuccess);
	function onGetGoalDataSuccess(data) {
		console.log(JSON.stringify(data));
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.clientFamilyMemberId);
		//console.log(data.clientFamilyMemberId);
		selectedImageFamilyMemberid=data.clientFamilyMemberId;
		poupulateFamilyMemberImage(data.clientFamilyMemberId);
		console.log(data.clientFamilyMemberId);
		
		$("#idgoalPriority").val(data.priority);
		
		if(data.recurringFlag == "N"){
			$("#idcorpusFrequency").val("5");
			$("#idcorpusFrequency").prop("disabled", true);
			$("#idGoalNo").hide();
		}
	    if(data.expectedInflationRate){
	    	data.expectedInflationRate=(data.expectedInflationRate*100).toFixed(2);
	    }
	    if(data.expectedReturnOnCorpus!=null){
	    	data.expectedReturnOnCorpus=(data.expectedReturnOnCorpus*100).toFixed(2);
	    }
	    if(data.loanPercent!=null){
	    	data.loanPercent=((data.loanPercent)*100).toFixed(2);
	    }
	    if(data.loanInterestRate!=null){
	    	data.loanInterestRate=(data.loanInterestRate*100).toFixed(2);
	    }
	   /* if(data.recurringFlag == "N"){
	    	$("#idGoalNo").hide();
	    }*/
	    
		populateForm($('#GoalRecurringForm'),data);
	    var startMonthYear = moment(data.startMonthYear,"YYYY-MM-DD").format("MMM-YYYY");
		$("#idgoalStartMonthYear").val(startMonthYear);
		
		loanrequired(data.loanRequiredFlag);
		getAge($("#age"),'clientGoal/getAge/'+data.clientFamilyMemberId);			
	    
		maskAmount('#idestimatedCost')
	} 
}
function getInflationRate(textBoxId,serviceUrl){

	getClientData("GET", "", serviceUrl, getInflationRateSuccess);
	function getInflationRateSuccess(data){
		textBoxId.val(((data.inflationRate)*100).toFixed(2));
		sessionStorage.removeItem("InflationRate");
		sessionStorage.setItem("InflationRate", ((data.inflationRate)*100).toFixed(2));
	}
	/*$.ajax({
		url : serviceUrl,
		type : "GET",
		dataType : 'json',
		contentType : "application/json; charset=utf-8",
		success : function(data) {
			textBoxId.val(((data.inflationRate)*100).toFixed(2));
		},
		error : function(data) {
			console.log("Error fetching interest rate from service "+data.responseText);
			$("#alertform").text("Expected Inflation Rate does not exist for this goal type");
			$(window).scrollTop(0);
		}
    });*/
}

function getCorpusGoalStart(textBoxId,serviceUrl){
	//console.log("In getCorpusGoalStart");
	getClientData("GET", "", serviceUrl, getCorpusGoalStartSuccess);
	function getCorpusGoalStartSuccess(data) {
		textBoxId.val(((data.mlr)*100).toFixed(2));
	}
	
}

function getLifeExpectancy(textBoxId,serviceUrl){
	//console.log('In getlifeExpectancy');
	getClientData("GET", "", serviceUrl, getLifeExpectancySuccess);
	function getLifeExpectancySuccess(data) {
		textBoxId.val(data.var1);
	}
	
}

function getBirthPlusLEDate(textBoxId,serviceUrl){
	
	getClientData("GET", "", serviceUrl, getDateSuccess);
	function getDateSuccess(data){
		textBoxId.val(data.birthDate);
		$("#idbirthDate").val(data.birthDate);
	}
	
}

function getAge(textBoxId,serviceUrl){
	//alert('In getAge');
	getClientData("GET", "", serviceUrl, getAgeSuccess);
	function getAgeSuccess(data){
		textBoxId.val(data.var1);
	}
	
}

function loanrequired(lLoanRequiredSelectedValue)
{
 	if (lLoanRequiredSelectedValue=='Y') {
   	//	alert("vv1 "+lLoanRequiredSelectedValue);
        $("#divLoanPercent").show();
        $("#divLoanInterestRate").show();
        $("#divLoanTenure").show();
   	}
   	else {
   		//alert("vv2 "+lLoanRequiredSelectedValue);
       $("#divLoanPercent").hide();
       $("#divLoanInterestRate").hide();
       $("#divLoanTenure").hide();
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

function populateCorpusUtilizationFrequency(name, dropdownId, serviceUrl) {
	
	getClientData("GET", "", serviceUrl, getCUFSuccess);
	function getCUFSuccess(data) {
		dropdownId.find('option').remove();
		//dropdownId.append('<option value="0" selected>Select ' + name + '</option>');		
		dropdownId.append('<option value="" selected>Select</option>');
		$.each(data,function(index, item) {
			dropdownId.append('<option value="' + item.id + '">'
								+ item.description
								+ '</option>');
		});
	}
	
}

$("#idSaveGoal").on('click', function (e) {
	e.preventDefault();
	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	console.log("imp id "+selectedImageFamilyMemberid);
	if(selectedImageFamilyMemberid==undefined){
		alert("please select a family member");
		return false;
	}else{
		unmaskAmount('#idestimatedCost')
	//	alert("member id "+selectedImageFamilyMemberid);
	    var form= document.getElementById("GoalRecurringForm");
		var validate=validateNonRetirementGoal(form);
		if(validate) {
			//save(ClientServiceUrl + '/clientGoal');
			saveGoal();
		}
		else
			console.log('Goal Recurring Validation Errors');
	}
});

function saveGoal() {
	//alert('In Goal Recurring Save');
    showLoaderOnSave("#idSaveGoal");
	
	window.setTimeout(function(){
	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID"); 
	// alert("member id"+selectedImageFamilyMemberid);
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	var formData = $('#GoalRecurringForm').serializeToJSON();
	formData["clientId"] = selectedClientId;
	formData["clientFamilyMemberId"] = selectedImageFamilyMemberid;

	var startMonthYear = moment($("#idgoalStartMonthYear").val(),"MMM-YYYY").format("YYYY-MM-DD");
	console.log('Start Month Year: '+startMonthYear);
	formData["startMonthYear"] = startMonthYear; 
	
	if (pagemode=="EDIT") {
		console.log('Goal ID: '+selectedGoalID);
		formData["id"] = selectedGoalID;
		saveURL = "editClientGoal/";
	} else {
		saveURL = "clientGoal/";
	}

	var data = JSON.stringify(formData);
	//	alert(data);
	//getClientDataWithErrorHandling("POST", data,saveURL,onCreateGoalSuccess, onAddGoalRecurringError);
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
	/*function onAddGoalRecurringError(err) {
		$("#alertform").text("Error saving goal information. Please try after sometime or contact system administrator.");
		$(window).scrollTop(0);
		hideLoaderOnSave("#idSaveGoal");
		//return false;				
	}*/
	}, 5000);	
}

function displayLoanFields(){
	var lLoanRequired = document.getElementById("idloanRequired");
 	var strUser3 = lLoanRequired.options[lLoanRequired.selectedIndex].value;
    //   alert("struser "+strUser3);
    if (strUser3==""){
   	// 	alert('alert1.5');
    	  $("#divLoanPercent").hide();
	      $("#divLoanInterestRate").hide();
    	  $("#divLoanTenure").hide();
	}
	else{
		if (strUser3=="Y"){
			 $("#divLoanPercent").show();
		     $("#divLoanInterestRate").show();
		     $("#divLoanTenure").show();     		    
    	}
    	else{
    		if (strUser3=="N"){
    			 $("#divLoanPercent").hide();
  		         $("#divLoanInterestRate").hide();
  	    	    $("#divLoanTenure").hide();
    		}
		}
   }
}

function onCustomImageClick()
{
	//alert("custom click");
	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	//alert("member id"+selectedImageFamilyMemberid);
	getAge($("#age"), 'clientGoal/getAge/'+selectedImageFamilyMemberid);
}



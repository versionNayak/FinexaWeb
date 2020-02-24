var user_dt;
var client_dob;
var client_lexp;
var months;
var pageMode = sessionStorage.getItem("PAGE_MODE");
var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");	
var id = sessionStorage.getItem("SELECTED_LUMPSUM_ID");
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
			$("#idAddFormLumpsumSubmit").show();
			$("#undo").show();
		}else if(loggedClient.clientInfoView === "Y"){
			$("#idAddFormLumpsumSubmit").hide();
			$("#undo").hide();
		}
	}else if(loggedUser != null && loggedUser.role === "Admin"){
		$("#idAddFormLumpsumSubmit").hide();
		$("#undo").hide();
	}else{
		if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
			$("#idAddFormLumpsumSubmit").show();
			$("#undo").show();
		}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
			$("#idAddFormLumpsumSubmit").hide();
			$("#undo").hide();
		}
	}
	
	
	months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
	client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
	client_lexp = moment(client_dob).add(months, 'months').toDate();
	
	/*if (sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP") == null) {
	//	alert("if LE is not there");
		years = 100;
		client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
		client_lexp = moment(client_dob).add(years, 'years').toDate();

	} else {
		//alert("if LE is there");
		months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
		client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
		client_lexp = moment(client_dob).add(months, 'months').toDate();
	}
*/
	
	
	var options =  {
	  onComplete: function(cep) {
	     //alert('CEP Completed!:' + cep);
		 //window.given_start_date = moment($('#idExpectedInflowDate').val(),'DD/MM/YYYY').toDate();
		 //window.ln_start_dt_isvalid = isDateBetwenRange(new Date(), client_lexp, window.given_start_date);		 
		 //alert(window.given_start_date);
	  },
	  onKeyPress: function(cep, event, currentField, options){
	    //console.log('A key was pressed!:', cep, ' event: ', event,'currentField: ', currentField, ' options: ', options);
	  },
	  onChange: function(cep){
	    //console.log('cep changed! ', cep);
	  },
	  onInvalid: function(val, e, f, invalid, options){
	    //var error = invalid[0];
	    //console.log ("Digit: ", error.v, " is invalid for the position: ", error.p, ". We expect something like: ", error.e);
	  }
	};
	
	
	$('#idExpectedInflowDate').mask('00/00/0000',options);
	
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$("#idExpectedInflowDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false,	
		startDate: new Date(),
		endDate: client_lexp,
	}).on('changeDate', function (ev) {
		//window.given_start_date = moment($(this).val(),'DD/MM/YYYY').toDate();
		//window.ln_start_dt_isvalid = isDateBetwenRange(new Date(), client_lexp, window.given_start_date);
		$("#alertExDate").css('color','');
		$("#alertExDate").text("");
		$("#idExpectedInflowDate").css('border','');
		$("#idAddFormLumpsumSubmit").prop("disabled", false);
		
	});
	
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	$("#idExpectedInflowDate").blur(function() {
		
		if ($(this).val() != "") {
			if (!checkValidDate($(this).val())) {
				$("#alertExDate").css('color','red');
				$("#alertExDate").text("Date is invalid!");
				$("#idExpectedInflowDateGroup").css('border','2px solid red');
				$("#idAddFormLumpsumSubmit").prop("disabled", true);
			} else {
				$("#alertExDate").css('color','');
				$("#alertExDate").text("");
				$("#idExpectedInflowDateGroup").css('border','');
				$("#idAddFormLumpsumSubmit").prop("disabled", false);
			}
		} else {
			$("#alertExDate").css('color','');
			$("#alertExDate").text("");
			$("#idExpectedInflowDateGroup").css('border','');
			$("#idAddFormLumpsumSubmit").prop("disabled", false);
		}		
		
		
	});
	
	$("#idInflowDesc").focus()
	selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	

	if (pageMode=="ADD") {
		$("#idAddFormLumpsumSubmit").on("click", function (event) {
			unmaskAllAmountFields();	
		     
		if (validateLumpsum($('#clientLumpsumForm'))){
			showLoaderOnSave("#idAddFormLumpsumSubmit");
			window.setTimeout(function(){
		
			var formData = $('#clientLumpsumForm').serializeToJSON();
			formData["clientId"] = selectedClientId;
			var data = JSON.stringify(formData);
			console.log(data);
			//getClientDataWithErrorHandling("POST", data, "createClientLumpsum", onAddLumpsumSuccess, onSaveLumpsumError);
			saveData("POST", data, "createClientLumpsum", onAddLumpsumSuccess);
			
			}, 3000);	
		}
		});

		function onAddLumpsumSuccess(data) {
			hideLoaderOnSave("#idAddFormLumpsumSubmit");
			console.log("Saved Lumpsum id = " + data.id);
			 serviceurl = "clientLumpsum/client/" +selectedClientId;
			 getClientData("GET", "" , serviceurl, onSuccess);
			 function onSuccess(data)
			 {
				sessionStorage.setItem("LUMPSUM_LIST", JSON.stringify(data));
				$("#idClient").empty();
				$("#idClient").load("clientInfo/viewLumpsum.html");
				$(".dashboardheading    ").html("");
				$(".dashboardheading    ").html(" Lumpsum Inflows");
				$("#addRecord").removeClass('btn_Disabled');
				$('#editRecord').addClass('btn_Disabled');
				$('#deleteRecord').addClass('btn_Disabled');
			 }
		}
		/*function onSaveLumpsumError(err) {
			$("#alertform").text("Error saving lumpsum information. Please try after sometime or contact system administrator.");
			$(window).scrollTop(0);
			hideLoaderOnSave("#idAddFormLumpsumSubmit");
			//return false;				
		}	*/
	} else {
		if (pageMode=="EDIT") {
			getSelectedLumpsum();
	} 
	
}


$('#focusguard-2').on('focus', function() {
	// "last" focus guard got focus: set focus to the first field
	 $("#idInflowDesc").focus();
	$(window).scrollTop(0);
});

function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"clientLumpsumDelete/"+ sessionStorage.getItem("SELECTED_LUMPSUM_ID"));
	$("#idClient").load("clientInfo/viewLumpsum.html");
	 $(".dashboardheading    ").html("");
     $(".dashboardheading    ").html("View Lumpsum Inflows");
     $("#addRecord").removeClass('btn_Disabled');
     $('#editRecord').addClass('btn_Disabled');
	
}	
});
function maskAllAmountFields() {
	maskAmount('#idExpectedInflow');
}
function unmaskAllAmountFields() {
	unmaskAmount('#idExpectedInflow');
}

function myDatePicker() {
	$("#idExpectedInflowDate").datepicker('remove');
	if (pageMode=="EDIT") {
		$("#idExpectedInflowDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: false,
			todayBtn: true,
			autoclose: true,
			forceParse: false,	
			startDate: new Date(),
			endDate: client_lexp,
		}).on('changeDate', function (ev) {
			$("#alertExDate").css('color','');
			$("#alertExDate").text("");
			$("#idExpectedInflowDate").css('border','');
			$("#idAddFormLumpsumSubmit").prop("disabled", false);
			
		});
	} else {
		$("#idExpectedInflowDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,	
			startDate: new Date(),
			endDate: client_lexp,
		}).on('changeDate', function (ev) {
			$("#alertExDate").css('color','');
			$("#alertExDate").text("");
			$("#idExpectedInflowDate").css('border','');
			$("#idAddFormLumpsumSubmit").prop("disabled", false);
			
		});
	}
	
}

function undoChange(){
	updateUNDO();
	
	if (pageMode=="ADD"){
		$(".form-control").val("");
	} else {
		if (pageMode=="EDIT") {
			getSelectedLumpsum();
		} 
	}
}

function updateUNDO(){
	var lInflowDescription = document.getElementById("idInflowDesc");
    var lExpectedValueOfInflow = document.getElementById("idExpectedInflow");
    var lExpectedDateOfInflow = document.getElementById("idExpectedInflowDate");
    var lExpectedDateOfInflowGroup = document.getElementById("idExpectedInflowDateGroup");

    lInflowDescription.style.border = "";
    lExpectedValueOfInflow.style.border = "";
    lExpectedDateOfInflowGroup.style.border = "";
    lExpectedDateOfInflowGroup.style.borderRadius = "";
    
    document.getElementById('alertinflowdesc').innerHTML="";
    document.getElementById('alertexi').innerHTML="";
    document.getElementById('alertExDate').innerHTML="";
    document.getElementById('alertform').innerHTML="";

}

function getSelectedLumpsum(){

	
	getClientData("GET", "", "clientLumpsum?id="+id, onGetLumpsumDataSuccess);
	function onGetLumpsumDataSuccess(data) {
		
		populateForm($('#clientLumpsumForm'),data);
		myDatePicker();
		maskAllAmountFields();
		
	} 
	
		$("#idAddFormLumpsumSubmit").on("click", function (event) {
			unmaskAllAmountFields();	
			event.preventDefault();
			var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
			var formData = $('#clientLumpsumForm').serializeToJSON();
			formData["clientId"] = selectedClientId;
			formData["id"] = id;
			if(validateLumpsum($('#clientLumpsumForm')))
				{
				showLoaderOnSave("#idAddFormLumpsumSubmit");
				window.setTimeout(function(){
					var data = JSON.stringify(formData);
					//getClientDataWithErrorHandling("POST", data, "editClientLumpsum", onAddLumpsumSuccess, onEditLumpsumError);
					saveData("POST", data, "editClientLumpsum", onAddLumpsumSuccess);
				}, 3000);	
				}
			/*function onEditLumpsumError(err) {
				$("#alertform").text("Error saving lumpsum information. Please try after sometime or contact system administrator.");
				$(window).scrollTop(0);
				hideLoaderOnSave("#idAddFormLumpsumSubmit");
				//return false;				
			}*/
	});
	function onAddLumpsumSuccess(data) {
		hideLoaderOnSave("#idAddFormLumpsumSubmit");
		console.log("Saved Lumpsum id = " + data.id);
		 serviceurl = "clientLumpsum/client/" +selectedClientId;
		 getClientData("GET", "" , serviceurl, onSuccess);
		 function onSuccess(data)
		 {
			sessionStorage.setItem("LUMPSUM_LIST", JSON.stringify(data));
			$("#idClient").empty();
			$("#idClient").load("clientInfo/viewLumpsum.html");
			$(".dashboardheading    ").html("");
			$(".dashboardheading    ").html("View Lumpsum Inflows");
			$("#addRecord").removeClass('btn_Disabled');
			$('#editRecord').addClass('btn_Disabled');
			$('#deleteRecord').addClass('btn_Disabled');
		 }
	} 
   
}


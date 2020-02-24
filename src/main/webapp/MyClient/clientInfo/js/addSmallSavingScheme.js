var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");	
var pageMode = sessionStorage.getItem("PAGE_MODE");		
var selectedSSID = sessionStorage.getItem("SELECTED_SS_ID");
var familyData;
var daughterFlag = "N";
var financialAssetTypeId ="";
var heading;
var heading_prefix;
var irate_url;
var validate;
var prevDepositStartDate="";
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
var user_dt;
var client_dob;
var client_lexp;
var months;
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");

//var startDate = "01/12/2011",
//endDate  = "17/11/2014", 
//dateRange = [];
var startDate, endDate, dateRange = [];

$(document).ready(function () {
	//alert('In addSmallSavingScheme.js');
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				$("#idSaveSmallSaving").show();
				$("#undo").show();
			}else if(loggedClient.clientInfoView === "Y"){
				$("#idSaveSmallSaving").hide();
				$("#undo").hide();
			}
		}else if(loggedUser != null && loggedUser.role === "Admin"){
			$("#idSaveSmallSaving").hide();
			$("#undo").hide();
		}else{
			if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
				$("#idSaveSmallSaving").show();
				$("#undo").show();
			}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
				$("#idSaveSmallSaving").hide();
				$("#undo").hide();
			}
		}
	
	var lMaturityDate = document.getElementById("idDepositMaturityDate");
	var lStartDate = document.getElementById("idDepositStartDate");
	var lTenure = document.getElementById("idTenureYears");
	var lKvpTenureY = document.getElementById("idKvpTenureYears");
	var lKvpTenureM = document.getElementById("idKvpTenureMonths");
	var lMaturityTenure = document.getElementById("idMaturityTenure");
	
	months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
	client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
	client_lexp = moment(client_dob).add(months, 'months').toDate();
	
	var options =  {
      onComplete: function(cep) {        
         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
      },
      onKeyPress: function(cep, event, currentField, options){},
      onChange: function(cep){},
      onInvalid: function(val, e, f, invalid, options){}
	};
	    
	$('#idDepositStartDate').mask('00/00/0000',options);
	
	$(function(){			
		if (pageMode=="EDIT") {
			if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
				heading_prefix = 'Edit ';
			}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
				heading_prefix = 'View ';
			} 	
			/*heading_prefix='Edit ';*/
			$('#idRadioStart').hide();			
		}
		else {
			heading_prefix='Add ';
			$('#idRadioStart').show();			
		}
		
		// Enabling/Disabling Sukanya Samriddhi Radio Button
		getClientDataAsyncFalse("GET", "", "clientFamilyMemberImageByClient/" + selectedClientId, SSFamilyMemberSuccess);
		daughterFlag = sessionStorage.getItem("DAUGHTER_FLAG");
		//alert('Has daughter? '+daughterFlag);
		// Disabled if client has no daughter
		//if (daughterFlag != "Y" ) $("#idSSS").prop("disabled",true);
		//JIRA: CIUAT-743
		if (daughterFlag != "Y") {
			$("#idSSS").click(function(){
				bootbox.alert({
				    message: "This product is available only for girl child",
				    callback: function () {
				    	$(".dashboardheading").html("Add Small Savings Scheme");
				    	$('#idRadioStart').show();		
				        $("#idSSS").prop("checked", false);
				    }
				});
					
				
			});
		}
		//else $("#idSSS").prop("disabled",false);

		// Header Block Functionality - Selecting the scheme to add/edit
		$('input[type="radio"]').click(function(){
			//alert('In addSmallSavingScheme.js radio clicked');
			financialAssetTypeId = $("input[name='financialAssetType']:checked").val();
			$('#MainDiv').show();	
			$('#idRadioStart').hide();
			
			switch (financialAssetTypeId) {
			    case "25":
			 		showNSC();
			        break;
			    case "26":
			 		showKVP();
			        break;
			    case "28":
			    	showPORD();
			    	break;
			    case "29":
			 		showPOTD();
			        break;
			    case "30":
			 		showPOMIS();
			        break;
			    case "31":
			 		showSCSS();
			        break;
			    case "32":
			    	if (daughterFlag == "Y") {
			    		showSSS();
			    		 break;
			    	}
			}
			
			$(".dashboardheading").html(heading_prefix + heading);
			$("#idDepositAmount").focus();		 
		});		
		// Header Block Functionality End
	});
			
	$('#FAO').hide();
	$('#DSD').hide();
	$('#DA').hide();
	$('#DF').hide();
	$('#IR').hide();
	$('#T').hide();
	$('#MT').hide();
	$('#KVP-T').hide();
	$('#CF').hide();
	$('#IPF').hide();
	$('#DMD').hide();
	$('#idButton').hide();
	
	// calendar
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$("#idDepositStartDate").datepicker('remove'); 
	
	/*$("#idStart").datepicker('remove');
	$("#idStart").datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true
	}).on('changeDate', function(ev){
		startDate = $(this).datepicker("getDate");
		alert("startDate: " + startDate);
	});
	
	$("#idEnd").datepicker({
		format : "dd/mm/yyyy",
		autoclose: true
	}).on('changeDate', function(ev){
		endDate = $(this).datepicker("getDate");
        for (var d = new Date(startDate);
            d <= new Date(endDate);
            d.setDate(d.getDate() + 1)) {
                dateRange.push($.datepicker.formatDate('dd/mm/yyyy', d));
        }
         alert("endDate: " + endDate);
	     alert("dateRange: " + dateRange.toString());
	});*/
	
	/*$('#idResult').datepicker({
	    beforeShowDay: function (date) {
	        var dateString = jQuery.datepicker.formatDate('dd/mm/yyyy', date);
	        console.log(dateString);
	        return [dateRange.indexOf(dateString) == -1];
	    }
	});*/
	/*startDate = "01/12/2011";
	endDate = "17/11/2014";
	
		// populate the array
		for (var d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
				dateRange.push($("#idDepositStartDate").formatDate('dd/MM/yyyy', d));
		}*/

			// use this array 
	
	$("#idDepositStartDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false,
		startDate : window.client_dob,
		endDate: new Date()
		/*beforeShowDay: function (date) {
			var dateString = kvpDate.formatDate('dd/MM/yyyy', date);
			return [dateRange.indexOf(dateString) == -1];
		}*/
	}).on('changeDate', function(ev){
		unmaskAllAmountFields();
		$(this).focus().datepicker('hide');
		$("#alertStartDate").text('');
		$("#idDepositStartDateGroup").css('border','1px solid #ccc');				
		$("#idDepositStartDateGroup").css('borderRadius','7px');	
		$("#idSaveSmallSaving").prop("disabled", false);
		/*sessionStorage.removeItem("DATE");
		sessionStorage.setItem("DATE",$(this).val());*/
		
		$(this).blur(function() {
			unmaskAllAmountFields();
			//alert('Current Date: '+$(this).val()+' Previous Date: '+prevDepositStartDate);
			if (prevDepositStartDate!=$(this).val()) {
				var day = lStartDate.value.slice(0,2);				
				var month = lStartDate.value.slice(3,5);				
				var year = lStartDate.value.slice(6);			
				var DateReformatted  = year.concat("-", month, "-", day);				
				var date = new Date(DateReformatted);
				
				switch (financialAssetTypeId) {
				    case "25":
				    case "28":
				    case "29":
				    case "30":
				    case "31":
						date.setFullYear(date.getFullYear() + Number(lTenure.value));
				        break;
				    case "26":
						date.setMonth(date.getMonth() + Number(lKvpTenureM.value))
						date.setFullYear(date.getFullYear() + Number(lKvpTenureY.value));
				        break;
				    case "32":
						date.setFullYear(date.getFullYear() + Number(lMaturityTenure.value));
				        break;
				}				
	
				

				// Calculating Maturity Date
				//alert('KVP Tenure Years: '+$("#idKvpTenureYears").val()+' Months: '+$("#idKvpTenureMonths").val());
				//alert('Deposit Start Date: '+$(this).val());
				var iMaturityDate='';
				if (financialAssetTypeId=="26") {
		    		iMaturityDate=moment($(this).val(),'DD/MM/YYYY').add($("#idKvpTenureYears").val(),'years').add($("#idKvpTenureMonths").val(),'months').format('DD/MM/YYYY');		    		
		    	}
		    	else if (financialAssetTypeId=="32") {
		    		iMaturityDate=moment($(this).val(),'DD/MM/YYYY').add($("#idMaturityTenure").val(),'years').format('DD/MM/YYYY');
		    	}
		    	else {
		    		iMaturityDate=moment($(this).val(),'DD/MM/YYYY').add($("#idTenureYears").val(),'years').format('DD/MM/YYYY');
		    	}
				
				//alert('Maturity Date: '+iMaturityDate);
				$("#idDepositMaturityDate").val(iMaturityDate);
				
				
				
				prevDepositStartDate = $(this).val();
				//alert('Current Tabindex: '+$(this).attr("tabindex"));
		        var index = +$(this).attr("tabindex") + 1;
		        $("[tabindex='" + index +"']").focus();
			}	
			maskAllAmountFields();
		});
	});	
	
	/*function disableCertainDateRangeForKVP(date) {
		
		// populate the array
		for (var d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1)) {
			dateRange.push($.datepicker.formatDate('dd/mm/yyyy', d));
		}

		 var m = date.getMonth();
		 var d = date.getDate();
		 var y = date.getFullYear();
		
		 var currentdate = d + '/' + (m + 1) + '/' + y ;
		 
		 for (var i = 0; i < dateRange.length; i++) {
		 
		 if ($.inArray(currentdate, dateRange) != -1 ) {
			 	return [false];
		 	}
		 }
	}*/
	
$("#idDepositStartDate").blur(function() {
	unmaskAllAmountFields();
		var birthDate = sessionStorage.getItem("SELECTED_CLIENT_DOB");
		var birthDay = birthDate.slice(0,2);
		var birthMonth = birthDate.slice(3,5);
		var birthYear = birthDate.slice(6);
		var BirthDateReformatted  = birthYear.concat("-", birthMonth, "-", birthDay);
		var date = new Date(BirthDateReformatted);
		var selectedBirthDate=new Date(date.toString());
		
		var startDate = $(this).val();
		
		if (startDate != "") {
			var day = startDate.slice(0,2);
			//alert("day: " + day);
			var month = startDate.slice(3,5);
			//alert("month: " + month);
			var year = startDate.slice(6);
			
			var StartDateReformatted  = year.concat("-", month, "-", day);
			var startdate = new Date(StartDateReformatted);
			var selectedStartDate=new Date(startdate.toString());
			
			if (selectedStartDate < selectedBirthDate) {
				$("#alertStartDate").css('color','red');
				$("#alertStartDate").text("Date is invalid! Must not be before Date of Birth.");
				$("#idDepositStartDateGroup").css('border','2px solid red');
				$("#idSaveSmallSaving").prop("disabled", true);
			} else {
				if (year < birthYear || !checkValidDate($(this).val())) {
					$("#alertStartDate").css('color','red');
					$("#alertStartDate").text("Date is invalid!");
					$("#idDepositStartDateGroup").css('border','2px solid red');
					$("#idSaveSmallSaving").prop("disabled", true);
				} else {
					$("#alertStartDate").css('color','');
					$("#alertStartDate").text("");
					$("#idDepositStartDateGroup").css('border','');
					$("#idSaveSmallSaving").prop("disabled", false);
					// Get master data based on start date
					if (financialAssetTypeId!="29") {
						unmaskAllAmountFields();
						var formData = $('#idAddSmallSavingForm').serializeToJSON();
						var data1 = JSON.stringify(formData);
						if (financialAssetTypeId=="26") {
							getKVPCompoundingFrequency(data1);
							getKVPTerm(data1);
						}
						maskAllAmountFields();
					}
					// End getting master data
				}
			}
		}
		
	});
	
	$("#idTenureYears").blur(function() {
		//alert("on blur of Tenure");
			unmaskAllAmountFields();
			// Calculating Maturity Date
			var iMaturityDate;
			if (financialAssetTypeId == 25 || financialAssetTypeId == 28 || financialAssetTypeId == 29 || financialAssetTypeId == 30 || financialAssetTypeId== 31) {
				if (lStartDate.value != "") {
					iMaturityDate=moment(lStartDate.value,'DD/MM/YYYY').add($("#idTenureYears").val(),'years').format('DD/MM/YYYY');
					//alert("iMaturityDate: " + iMaturityDate);
				} else {
					//alert("in else");
					iMaturityDate="";
				}
				$("#idDepositMaturityDate").val(iMaturityDate);
			}
			maskAllAmountFields();
			
	});
			
	$("#idDepositMaturityDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		//forceParse: false,
		startDate : window.client_dob,
		startDate: new Date()		
	});
	
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
		
	//Autofilled and non-editable
	populateCompoundingFrequency($("#idCF"));

	getClientDataAsyncFalse("GET","","AllFrequency",ipFrequencySuccess);
	function ipFrequencySuccess(data){
	//	console.log(data);
		ipfDrop = $("#idPF");
		ipfDrop.find('option').remove();
		ipfDrop.append('<option value="0">Select Interest Payout Frequency</option>');
		/* $("#idSIPFETF").append('<option value="0">Select SIP Frequency</option>'); */
		$.each(data, function (index, item) {
			ipfDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			/* $("#idSIPFETF").append('<option value="' + item.id + '">' + item.description + '</option>'); */
		});
		
	}
	
	getClientDataAsyncFalse("GET","","AllFrequency",dFrequencySuccess);
	function dFrequencySuccess(data){
	//	console.log(data);
		dfDrop = $("#idDF");
		dfDrop.find('option').remove();
		dfDrop.append('<option value="0">Select Deposit Frequency</option>');
		/* $("#idSIPFETF").append('<option value="0">Select SIP Frequency</option>'); */
		$.each(data, function (index, item) {
			dfDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			/* $("#idSIPFETF").append('<option value="' + item.id + '">' + item.description + '</option>'); */
		});				
	}
	
	if (pageMode=="EDIT") {
		getselectedSmallsavings();
	}

	$("#idSaveSmallSaving").on("click", function(event) {
		//console.log("In SS Form Save");
		selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
		
		switch (financialAssetTypeId) {
		    case "25":
				validate = validateNSC($('#idAddSmallSavingForm'));
		        break;
		    case "26":
				validate = validateKVP($('#idAddSmallSavingForm'));
		        break;
		    case "28":
				validate = validatePORD($('#idAddSmallSavingForm'));
		    	break;
		    case "29":
				validate = validatePOTD($('#idAddSmallSavingForm'));
		        break;
		    case "30":
				validate = validatePOMIS($('#idAddSmallSavingForm'));
		        break;
		    case "31":
				validate = validateSCSS($('#idAddSmallSavingForm'));
		        break;
		    case "32":
				validate = validateSukanya($('#idAddSmallSavingForm'));
		        break;
		}
		unmaskAllAmountFields();
		if(validate){
			showLoaderOnSave("#idSaveSmallSaving");
			window.setTimeout(function(){
			if (typeof selectedImageFamilyMemberid != 'undefined' && selectedImageFamilyMemberid!=null) {
				event.preventDefault();
				var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				//console.log("selectedClientId = " + selectedClientId);
				var formData = $('#idAddSmallSavingForm').serializeToJSON();
				formData["clientID"]=selectedClientId;
				formData["familyMemberID"]=selectedImageFamilyMemberid;
				//console.log('Interest Rate entered: '+$("#idInterestRate").val());
				formData["interestRate"]=parseFloat($("#idInterestRate").val()/100);
				//console.log('Interest Rate saved: '+formData["interestRate"]);
				
					
				if (pageMode=="EDIT") {
					//alert('In EDIT Save');
					formData["id"]=selectedSSID;
					var data = JSON.stringify(formData);
					//getClientData("POST", data, "editClientSmallSaving", onSaveSSSuccess);
					saveData("POST", data, "editClientSmallSaving", onSaveSSSuccess);
				}
				else if (pageMode=="ADD") {
					var data = JSON.stringify(formData);						
					
					//getClientDataWithErrorHandling("POST", data, "createClientSmallSaving", onSaveSSSuccess, onSaveSSError);
					saveData("POST", data, "createClientSmallSaving", onSaveSSSuccess);
				}
				
				function onSaveSSSuccess(data) {
					hideLoaderOnSave("#idSaveSmallSaving");
					serviceurl = "clientSmallSaving/client/" + selectedClientId;
					getClientData("GET", "", serviceurl, onSuccess);
			    	function onSuccess(data) {								
						sessionStorage.setItem("SMALL_SAVINGS_LIST", JSON.stringify(data));
						$("#idClient").empty();
						$("#idClient").load("clientInfo/viewSmallSavingScheme.html");
						$(".dashboardheading").html("");
						$(".dashboardheading").html("Small Saving Scheme");
						$("#addRecord").removeClass('btn_Disabled');
						$('#editRecord').addClass('btn_Disabled');
						$('#deleteRecord').addClass('btn_Disabled');
			    	}
				}
				
				/*function onSaveSSError(data) {
					$("#alertform").text("Error saving Small Savings information. Please try after sometime or contact system administrator.");
					$(window).scrollTop(0);
					hideLoaderOnSave("#idSaveSmallSaving");
				}*/
			} else {
				alert("Please select a Family Member");
				return false;
			}
			 }, 5000);	
		}				
	});
	
	$('#focusguard-2').on('focus', function() {
		// "last" focus guard got focus: set focus to the first field
		$("#idDepositAmount").focus();	
		$(window).scrollTop(0);
	});			
});

function myDatePicker() {
	$("#idDepositStartDate").datepicker('remove'); 
	if (pageMode=="EDIT") {
		$("#idDepositStartDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: false,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
			//beforeShowDay: disableCertainDateRangeForKVP
		}).on('changeDate', function(ev){
			$("#alertStartDate").text('');
			$("#idDepositStartDateGroup").css('border','1px solid #ccc');				
			$("#idDepositStartDateGroup").css('borderRadius','7px');	
			$("#idSaveSmallSaving").prop("disabled", false);
		});
	} else {
		$("#idDepositStartDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
			//beforeShowDay: disableCertainDateRangeForKVP
		}).on('changeDate', function(ev){
			$("#alertStartDate").text('');
			$("#idDepositStartDateGroup").css('border','1px solid #ccc');				
			$("#idDepositStartDateGroup").css('borderRadius','7px');	
			$("#idSaveSmallSaving").prop("disabled", false);
		});
	}
}

function onCustomImageClick(){  
    selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
    var serviceurl = '/clientFamilyMember/'+selectedImageFamilyMemberid;
    getClientData("GET", "", serviceurl, onSuccess);
    function onSuccess(data) {
        ///console.log(data);
    	 window.months = (parseInt(data.lifeExpectancy) * 12); 
         window.client_dob = moment(data.birthDate,'DD/MM/YYYY').toDate();
         window.client_lexp = moment(window.client_dob).add(window.months, 'months').toDate();
                	 
         $("#idDepositStartDate").datepicker('remove'); 
    	 
         $("#idDepositStartDate").datepicker({
            format : "dd/mm/yyyy",
            todayHighlight : true,
            todayBtn : true,
            autoclose : true,
            startDate : window.client_dob,
            endDate : new Date()
         });
    }
}
	
function showNSC() {
	// alert($("#idNSC").val()); 
	heading = "NSC";
	$("#idNSC").prop("checked",true);
	$("#idKVP").prop("disabled",true);
 	$("#idPOTD").prop("disabled",true);
 	$("#idPOMIS").prop("disabled",true);
 	$("#idPORD").prop("disabled",true);
 	$("#idSCSS").prop("disabled",true);
 	$("#idSSS").prop("disabled",true);
	//$(".dashboardheading    ").html("Add NSC");
	$('#FAO').show();
	$('#DSD').show();
	$('#ISD').hide();
	$('#DA').show();
	$('#RDA').hide();
	$('#PI').hide();
	$('#IR').show();
	$("#idInterestRate").prop('readonly', true);
	$('#T').show();
	//$("#idTenureYears").val("5");
	$('#DT').hide();
	$('#MT').hide();
	$('#idMaturityTenure').val(" ");
	$('#KVP-T').hide();
	$("#idKvpTenureYears").val(" ");
	$("#idKvpTenureMonths").val(" ");
	$('#CF').show();
	$("#idCF").val("1");
	//alert($("#idCF").val());
	//$("#idCFText").val("1");
	$('#DF').hide();
	$("#idDF").val("0");
	$('#IPF').hide();
	$("#idPF").val("0");
	$("#idPFText").val("0");
	$('#DMD').show();
	$('#MD').hide();
	$('#idButton').show();		
	irate_url = "getNSCInterestRateFromStartDate";
	getInterestRate();
}

function showKVP() {
	//alert('In showKVP() '+$("#idNSC").val()); 
	heading = "KVP";
	$("#idNSC").prop("disabled",true);
	$("#idKVP").prop("checked",true);
 	$("#idPOTD").prop("disabled",true);
 	$("#idPOMIS").prop("disabled",true);
 	$("#idPORD").prop("disabled",true);
 	$("#idSCSS").prop("disabled",true);
 	$("#idSSS").prop("disabled",true);
	$('#FAO').show();
	$('#DSD').show();
	$('#ISD').hide();
	$('#DA').show();
	$('#RDA').hide();
	$('#PI').hide();
	$('#IR').show();
	$("#idInterestRate").prop('readonly', true);
	$('#T').hide();
	$("#idTenureYears").val(" ");
	$('#MT').hide();
	$('#idMaturityTenure').val(" ");
	$('#KVP-T').show();
	//$("#idKvpTenureYears").val("9");
	//$("#idKvpTenureMonths").val("2");
	$('#CF').show();
	//$("#idCF").val("1");
	//$("#idCFText").val("1");
	$('#DF').hide();
	$("#idDF").val("0");
	$('#IPF').hide();
	$("#idPF").val("0");
	$("#idPFText").val("0");
	$('#DMD').show();
	$('#MD').hide();
	$('#idButton').show();
	irate_url = "getKVPInterestRateFromStartDate";
	getInterestRate();
}

function showPORD() {
	heading = "PO Recurring Deposit";
	$("#idNSC").prop("disabled",true);
	$("#idKVP").prop("disabled",true);
 	$("#idPOTD").prop("disabled",true);
 	$("#idPOMIS").prop("disabled",true);
 	$("#idPORD").prop("checked",true);
 	$("#idSCSS").prop("disabled",true);
 	$("#idSSS").prop("disabled",true);
	//$(".dashboardheading    ").html("Add PO - Recurring Deposit");
	$('#FAO').show();
	$('#DSD').show();
	$('#ISD').hide();
	$('#DA').show();
	$('#firstlabel').hide();
	$('#RDA').show();
	$('#PI').hide();
	$('#DF').show();
	$('#IF').hide();
	$('#IR').show();
	$("#idInterestRate").prop('readonly', true);
	$('#T').show();
	//$("#idTenureYears").val("5");
	$('#DT').hide();
	$('#MT').hide();
	$('#idMaturityTenure').val(" ");
	$('#KVP-T').hide();
	$("#idKvpTenureYears").val(" ");
	$("#idKvpTenureMonths").val(" ");
	$('#CF').show();
	$("#idCF").val("4");
	//$("#idCFText").val("4");
	$('#IPF').hide();
	$('#DF').show();
	$("#idDF").val("12");
	$('#DMD').show();
	$('#MD').hide();
	$('#idButton').show();
	irate_url = "getPORDInterestRateFromStartDate";
	getInterestRate();
}

/*function getPORD() {
	heading = "PO Recurring Deposit";
	$("#idNSC").prop("disabled",true);
	$("#idKVP").prop("disabled",true);
 	$("#idPOTD").prop("disabled",true);
 	$("#idPOMIS").prop("disabled",true);
 	$("#idPORD").prop("checked",true);
 	$("#idSCSS").prop("disabled",true);
 	$("#idSSS").prop("disabled",true);
	//$(".dashboardheading    ").html("Add PO - Recurring Deposit");
	$('#FAO').show();
	$('#DSD').show();
	$('#ISD').hide();
	$('#DA').show();
	$('#firstlabel').hide();
	$('#RDA').show();
	$('#PI').hide();
	$('#DF').show();
	$('#IF').hide();
	$('#IR').show();
	$("#idInterestRate").prop('readonly', true);
	$('#T').show();
	$("#idTenureYears").val("5");
	$('#DT').hide();
	$('#MT').hide();
	$('#idMaturityTenure').val(" ");
	$('#KVP-T').hide();
	$("#idKvpTenureYears").val(" ");
	$("#idKvpTenureMonths").val(" ");
	$('#CF').show();
	//$("#idCF").val("4");
	//$("#idCFText").val("4");
	$('#IPF').hide();
	$('#DF').show();
	$("#idDF").val("12");
	$('#DMD').show();
	$('#MD').hide();
	$('#idButton').show();
	irate_url = "getPORDInterestRateFromStartDate";
}	*/

function showPOTD() {
	heading = "PO Time Deposit";
	//alert($("#idPOTD").val());
	$("#idNSC").prop("disabled",true);
	$("#idKVP").prop("disabled",true);
 	$("#idPOTD").prop("checked",true);
 	$("#idPOMIS").prop("disabled",true);
 	$("#idPORD").prop("disabled",true);
 	$("#idSCSS").prop("disabled",true);
 	$("#idSSS").prop("disabled",true);
	//$(".dashboardheading").html("Add PO Time Deposit");
	$('#FAO').show();
	$('#DSD').show();
	$('#ISD').hide();
	$('#DA').show();
	$('#RDA').hide();
	$('#PI').hide();
	$('#IR').show();
	$("#idInterestRate").prop('readonly', false);
	$('#T').show();
	if (pageMode=="ADD") {
		$("#idTenureYears").val(" ");
	}
	//$("#idTenureYears").attr("placeholder", "Enter Tenure");
	$('#DT').hide();
	$('#MT').hide();
	$('#idMaturityTenure').val(" ");
	$('#KVP-T').hide();
	$("#idKvpTenureYears").val(" ");
	$("#idKvpTenureMonths").val(" ");
	$('#CF').show();
	$("#idCF").attr("disabled",true);
	$("#idCF").val("4");
	$("#idCFText").val("4");
	$('#IPF').show();
	$("#idPF").attr("disabled",true);
	$("#idPF").val("1");
	$("#idPFText").val("1");
	$('#DF').hide();
	$("#idDF").val("0");
	$('#DMD').show();
	$('#MD').hide();
	$('#idButton').show();
	//irate_url = "getPOTDInterestRateFromStartDate";
}		

function showPOMIS() {
	// alert($("#idPOMIS").val());
	heading = "PO MIS";
	$("#idNSC").prop("disabled",true);
	$("#idKVP").prop("disabled",true);
 	$("#idPOTD").prop("disabled",true);
 	$("#idPOMIS").prop("checked",true);
 	$("#idPORD").prop("disabled",true);
 	$("#idSCSS").prop("disabled",true);
 	$("#idSSS").prop("disabled",true);
	$('#FAO').show();
	$('#DSD').show();
	$('#ISD').hide();
	$('#DA').show();
	$('#RDA').hide();
	$('#PI').hide();
	$('#IR').show();
	$("#idInterestRate").prop('readonly', true);
	$('#T').show();
	//$("#idTenureYears").val("5");
	$('#DT').hide();
	$('#MT').hide();
	$('#idMaturityTenure').val(" ");
	$('#KVP-T').hide();
	$("#idKvpTenureYears").val(" ");
	$("#idKvpTenureMonths").val(" ");
	$('#CF').hide();
	$("#idCF").val("0");
	$("#idCFText").val("0");
	$('#IPF').show();
	$("#idPF").val("12");
	//$("#idPFText").val("12");
	$('#DF').hide();
	$("#idDF").val("0");
	$('#DMD').show();
	$('#MD').hide();
	$('#idButton').show();
	irate_url = "getPOMISInterestRateFromStartDate";
	getInterestRate();
}		

function showSCSS() {
	heading = "Senior Citizen Saving Scheme";
	$("#idNSC").prop("disabled",true);
	$("#idKVP").prop("disabled",true);
 	$("#idPOTD").prop("disabled",true);
 	$("#idPOMIS").prop("disabled",true);
 	$("#idPORD").prop("disabled",true);
 	$("#idSCSS").prop("checked",true);
 	$("#idSSS").prop("disabled",true);
	$('#FAO').show();
	$('#DSD').show();
	$('#ISD').hide();
	$('#DA').show();
	$('#RDA').hide();
	$('#PI').hide();
	$('#DF').hide();
	$('#IR').show();
	$("#idInterestRate").prop('readonly', true);
	$('#T').show();
	//$("#idTenureYears").val("5");
	$('#DT').hide();
	$('#MT').hide();
	$('#idMaturityTenure').val(" ");
	$('#KVP-T').hide();
	$("#idKvpTenureYears").val(" ");
	$("#idKvpTenureMonths").val(" ");
	$('#CF').hide();
	$("#idCF").val("0");
	$("#idCFText").val("0");
	$('#IPF').show();
	$("#idPF").val("4");
	//$("#idPFText").val("4");
	$('#DF').hide();
	$("#idDF").val("0");
	$('#DMD').show();
	$('#MD').hide();
	$('#idButton').show();
	irate_url = "getSCSSInterestRateFromStartDate";
	getInterestRate();
}

function showSSS() {
	heading = "Sukanya Samriddhi Scheme";
	$("#idNSC").prop("disabled",true);
	$("#idKVP").prop("disabled",true);
	$("#idPOTD").prop("disabled",true);
	$("#idPOMIS").prop("disabled",true);
	$("#idPORD").prop("disabled",true);
	$("#idSCSS").prop("disabled",true);
	$("#idSSS").prop("checked",true);
	$('#FAO').show();
	$('#DSD').show();
	$('#firstSdLabel').hide();
	$('#ISD').show();
	$('#DA').show();
	$('#firstlabel').hide();
	$('#RDA').hide();
	$('#PI').show();
	$('#DF').show();
	$("#idDF").val("0");
	$('#firstDfLabel').hide();
	$('#IF').show();
	$('#IR').show();
	$("#idInterestRate").prop('readonly', true);
	$('#CF').show();
	$("#idCF").val("1");
	//$("#idCFText").val("1");
	$('#IPF').hide();
	$("#idPF").val("0");
	//$("#idPFText").val("0");
	$('#T').show();
	$("#idTenureYears").val("15");
	$("#idTenureYears").prop("readonly", true);
	$('#firstTLabel').hide();
	$('#MT').show();
	$('#idMaturityTenure').val("21");
	$('#KVP-T').hide();
	$("#idKvpTenureYears").val(" ");
	$("#idKvpTenureMonths").val(" ");
	$('#DMD').show();
	$('#firstDmdLabel').hide();
	$('#idButton').show();
	setSSSFamilyMember(familyData,$("#familyMemberImage"));
	irate_url = "getSukanyaInterestRateFromStartDate";
	getInterestRate();
}

function setSSSFamilyMember(data, tableRowId) {
	var gender;
	tableRowId.empty();
	$.each(data,function(index, item) {
		if (item.relationID === 0) {
			gender=item.gender;
			if (gender === 'M') {
				tableRowId.append('<td><img src="../Common/assets/images/icons/Man-C.png" id="'
								+ item.id
								+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>&nbsp;</td>');
			} else {
				tableRowId.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
								+ item.id
								+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>&nbsp;</td>');
			}
		}
		if (item.relationID === 1) {
			if (gender === 'M') {
				//alert('In M');
				//console.log('In M');
				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Lady-A.png"  id="'
								+ item.id
								+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');
			} else {
				//console.log('In F');
				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Man-A.png"  id="'
								+ item.id
								+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');
			}

		}
		if (item.relationID === 2) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
							+ item.id
							+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}

		if (item.relationID === 3) {
			//sessionStorage.setItem("DAUGHTER_FLAG","Y");
			sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",item.id);
			poupulateFamilyMemberImage(item.id);
			
			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Girl-C.png"  id="'
							+ item.id
							+ '" onClick="onClickImage('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}

		if (item.relationID === 4) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Father-A.png"  id="'
							+ item.id
							+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
		if (item.relationID === 5) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Mother-A.png"  id="'
							+ item.id
							+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
		if (item.relationID === 6) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
							+ item.id
							+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
		if (item.relationID === 7) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
							+ item.id
							+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
		if (item.relationID === 8) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Other-A.png"  id="'
							+ item.id
							+ '" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
	});
}

function SSFamilyMemberSuccess(data) {
	familyData = data;
	sessionStorage.setItem("DAUGHTER_FLAG", "N");	
	var gender;
	var tableRowId = $("#familyMemberImage");
	tableRowId.empty();
	$.each(data,function(index, item) {
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
		if (item.relationID === 1) {
			if (gender === 'M') {
				//alert('In M');
				//console.log('In M');
				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Lady-A.png"  id="'
								+ item.id
								+ '" onClick="onClickImage('
								+ item.id
								+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');
			} else {
				//console.log('In F');
				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Man-A.png"  id="'
								+ item.id
								+ '" onClick="onClickImage('
								+ item.id
								+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');
			}

		}
		if (item.relationID === 2) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImage('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}

		if (item.relationID === 3) {
			sessionStorage.setItem("DAUGHTER_FLAG","Y");
			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImage('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}

		if (item.relationID === 4) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Father-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImage('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
		if (item.relationID === 5) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Mother-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImage('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
		if (item.relationID === 6) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImage('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
		if (item.relationID === 7) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImage('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
		if (item.relationID === 8) {

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Other-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImage('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

		}
	});
}

function populateCompoundingFrequency(cfDrop) {
	getClientDataAsyncFalse("GET", "", "AllFrequency", compoundingFrequencySuccess);	
	function compoundingFrequencySuccess(data) {
		cfDrop.find('option').remove();
		cfDrop.append('<option value="">Select Compounding Frequency</option>');
		$.each(data, function (index, item) {
			cfDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});
	}
}

function getInterestRate() {
	//unmaskAllAmountFields();
	//alert('In getInterestRate');
	//console.log("irate_url1 : " + irate_url);
	getClientDataWithErrorHandling("GET", "", irate_url, foundIRSuccess,foundIRError);
	//console.log("irate_url : " + irate_url);
	//getClientData("POST", data, irate_url, foundIRSuccess);
	function foundIRSuccess(rate){
		//alert('Interest Rate: '+rate+' Asset Type: '+financialAssetTypeId);
		$("#idInterestRate").val(rate*100);
		// To be stored in absolute value in DB, displayed in percentage form
		//$("#idInterestRate").val(rate*100).toFixed(2);
		//console.log('Interest Rate: '+rate);
	}
	
	function foundIRError(err) {
		$("#alertStartDate").text('Interest Rate does not exist for this date.');
		$("#idDepositStartDateGroup").css('border','2px solid red');				
		$("#idDepositStartDateGroup").css('borderRadius','7px');				
	    //$("#idDepositStartDate").focus().datepicker('hide');						
		$("#idInterestRate").val('');
	}
}

function getKVPCompoundingFrequency(data) {
	getClientDataWithErrorHandling("POST", data, "getKVPCompoundingFrequencyFromStartDate", foundCFSuccess,foundCFError);
	//getClientData("POST", data, "getKVPCompoundingFrequencyFromStartDate", foundCFSuccess);
	function foundCFSuccess(cf){
		
			$("#idCF").val(cf);
			//$("#idCFText").val(cf);
		
		//console.log('Compounding Frequency: '+cf);
	}
	
	function foundCFError(err) {
		$("#alertStartDate").text('Compounding Frequency does not exist for this date.');
		$("#idDepositStartDateGroup").css('border','2px solid red');				
		$("#idDepositStartDateGroup").css('borderRadius','7px');				
	    //$("#idDepositStartDate").focus().datepicker('hide');						
		$("#idCompoundingFrequency").val('');
	}

}

function getKVPTerm(data) {
	getClientDataWithErrorHandling("POST", data, "getKVPTermFromStartDate", foundTermSuccess,foundTermError);
	//getClientData("POST", data, "getKVPTermFromStartDate", foundTermSuccess);
	function foundTermSuccess(term){
		
			$("#idKvpTenureYears").val(term.termYears);
			$("#idKvpTenureMonths").val(term.termMonths);
		//console.log('KVP Term: '+termYears+' '+termMonths);
	}
	
	function foundTermError(err) {
		$("#alertStartDate").text('Term does not exist for this date.');
		$("#idDepositStartDateGroup").css('border','2px solid red');				
		$("#idDepositStartDateGroup").css('borderRadius','7px');				
	    //$("#idDepositStartDate").focus().datepicker('hide');						
		$("#idKvpTenureYears").val('');
		$("#idKvpTenureMonths").val('');
	}

}

$("#undo").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});

function undoChange(){
	updateUNDO();
	if (pageMode=="ADD") { 
		$(".form-control").val("");
		financialAssetTypeId = $("input[name='financialAssetType']:checked").val();
		//alert(financialAssetTypeId);
		if (financialAssetTypeId == 29) {
			showPOTD();
			$("#idTenureYears").val(5);
		} else {
			if (financialAssetTypeId == 30) {
				showPOMIS();
				$("#idTenureYears").val(5);
			} else {
				if (financialAssetTypeId == 28) {
					showPORD();
					$("#idDF").val(12);
					$("#idTenureYears").val(5);
					$("#idCF").val("4");
				} else {
					if (financialAssetTypeId == 31) {
						showSCSS();
						$("#idTenureYears").val(5);
						$("#idPF").val(4);
					} else {
						if (financialAssetTypeId == 25) {
							showNSC();
							$("#idCF").val("1");
							$("#idTenureYears").val(5);
						} else {
							if (financialAssetTypeId == 26) {
								showKVP();
							}else {
								if (financialAssetTypeId == 32) {
									showSSS();
								}
							}
						} 
					}
				}
			}
		}
		
		
	}
	if(pageMode=="EDIT"){
		getselectedSmallsavings();
	}
	
}

function updateUNDO(){
	
	if(financialAssetTypeId == "25"){
		var lStartDate = document.getElementById("idDepositStartDate");
		var lStartDateGroup = document.getElementById("idDepositStartDateGroup");
		var lDepositAmount = document.getElementById("idDepositAmount");
		var lInterestRate = document.getElementById("idInterestRate");
		var lCompoundingFrequency = document.getElementById("idCF");

		lStartDateGroup.style.border = "";
		lStartDateGroup.style.borderRadius = "";
		lDepositAmount.style.border = "";
		lInterestRate.style.border = "";
		lCompoundingFrequency.style.border = "";

		document.getElementById('alertStartDate').innerHTML="";
		document.getElementById('alertDepositAmount').innerHTML="";
		document.getElementById('alertInterestRate').innerHTML="";
		document.getElementById('alertcf').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	
	if(financialAssetTypeId == "26"){
		var lStartDate = document.getElementById("idDepositStartDate");
		var lStartDateGroup = document.getElementById("idDepositStartDateGroup");
		var lDepositAmount = document.getElementById("idDepositAmount");
		var lInterestRate = document.getElementById("idInterestRate");
		var lCompoundingFrequency = document.getElementById("idCF");
		var lMaturityDate = document.getElementById("idDepositMaturityDate");
			
		lStartDateGroup.style.border = "";
		lStartDateGroup.style.borderRadius = "";
		lDepositAmount.style.border = "";
		lInterestRate.style.border = "";
		lCompoundingFrequency.style.border = "";
		lMaturityDate.style.border = "";
	
		document.getElementById('alertStartDate').innerHTML="";
		document.getElementById('alertDepositAmount').innerHTML="";
		document.getElementById('alertInterestRate').innerHTML="";
		document.getElementById('alertcf').innerHTML="";
		document.getElementById('alertMaturitytDate').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	if(financialAssetTypeId == "28"){
		var lStartDate = document.getElementById("idDepositStartDate");
		var lStartDateGroup = document.getElementById("idDepositStartDateGroup");
		var lRecurringDepositAmount = document.getElementById("idDepositAmount");
		var lDepositFrequency = document.getElementById("idDF");
		var lCompoundingFrequency = document.getElementById("idCF");
	
		lStartDateGroup.style.border = "";
		lStartDateGroup.style.borderRadius = "";
		lRecurringDepositAmount.style.border = "";
		lCompoundingFrequency.style.border = "";
		lDepositFrequency.style.border = "";
	
	    document.getElementById('alertStartDate').innerHTML="";
		document.getElementById('alertDepositAmount').innerHTML="";
		document.getElementById('alertcf').innerHTML="";
		document.getElementById('alertdf').innerHTML="";
		document.getElementById('alertform').innerHTML="";

	}
	if(financialAssetTypeId == "29"){
		var lStartDate = document.getElementById("idDepositStartDate");
		var lStartDateGroup = document.getElementById("idDepositStartDateGroup");
		var lDepositAmount = document.getElementById("idDepositAmount");
		var lInterestRate = document.getElementById("idInterestRate");
		var lCompoundingFrequency = document.getElementById("idCF");
		var lInterestPayoutFrequency = document.getElementById("idPF");
	
		lStartDateGroup.style.border = "";
		lStartDateGroup.style.borderRadius = "";
		lDepositAmount.style.border = "";
		lInterestRate.style.border = "";
		lCompoundingFrequency.style.border = "";
		lInterestPayoutFrequency.style.border = "";

		document.getElementById('alertStartDate').innerHTML="";
		document.getElementById('alertDepositAmount').innerHTML="";
		document.getElementById('alertInterestRate').innerHTML="";
		document.getElementById('alertcf').innerHTML="";
		document.getElementById('alertipf').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	if(financialAssetTypeId == "29"){
		var lStartDate = document.getElementById("idDepositStartDate");
		var lStartDateGroup = document.getElementById("idDepositStartDateGroup");
		var lDepositAmount = document.getElementById("idDepositAmount");
		var lInterestPayoutFrequency = document.getElementById("idPF");
		
		lStartDateGroup.style.border = "1px solid #ccc";
		lStartDateGroup.style.borderRadius = "7px";
		lDepositAmount.style.border = "1px solid #ccc";
		lInterestPayoutFrequency.style.border = "1px solid #ccc";

		document.getElementById('alertStartDate').innerHTML="";
		document.getElementById('alertDepositAmount').innerHTML="";
		document.getElementById('alertInterestRate').innerHTML="";
		document.getElementById('alertipf').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	if(financialAssetTypeId == "30"){
		var lStartDate = document.getElementById("idDepositStartDate");
		var lStartDateGroup = document.getElementById("idDepositStartDateGroup");
		var lDepositAmount = document.getElementById("idDepositAmount");
		var lInterestPayoutFrequency = document.getElementById("idPF");
		
		lStartDateGroup.style.border = "";
		lStartDateGroup.style.borderRadius = "";
		lDepositAmount.style.border = "";
		lInterestPayoutFrequency.style.border = "";
		
		document.getElementById('alertStartDate').innerHTML="";
		document.getElementById('alertDepositAmount').innerHTML="";
		document.getElementById('alertInterestRate').innerHTML="";
		document.getElementById('alertipf').innerHTML="";	
		document.getElementById('alertform').innerHTML="";
	}
	if(financialAssetTypeId == "31"){
		var lStartDate = document.getElementById("idDepositStartDate");
		var lStartDateGroup = document.getElementById("idDepositStartDateGroup");
		var lDepositAmount = document.getElementById("idDepositAmount");
		var lInterestPayoutFrequency = document.getElementById("idPF");
		
		lStartDateGroup.style.border = "";
		lStartDateGroup.style.borderRadius = "";
		lDepositAmount.style.border = "";
		lInterestPayoutFrequency.style.border = "";

		document.getElementById('alertStartDate').innerHTML="";
		document.getElementById('alertDepositAmount').innerHTML="";
		document.getElementById('alertInterestRate').innerHTML="";
		document.getElementById('alertipf').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	if(financialAssetTypeId == "32"){
		var lStartDate = document.getElementById("idDepositStartDate");
		var lStartDateGroup = document.getElementById("idDepositStartDateGroup");
		var lPeriodicInvestment = document.getElementById("idDepositAmount");
		var lInvestmentFrequency = document.getElementById("idDF");
		var lCompoundingFrequency = document.getElementById("idCF");
	
		lStartDateGroup.style.border = "";
		lStartDateGroup.style.borderRadius = "";
		lPeriodicInvestment.style.border = "";
		lCompoundingFrequency.style.border = "";
		lInvestmentFrequency.style.border = "";
	
		document.getElementById('alertStartDate').innerHTML="";
		document.getElementById('alertDepositAmount').innerHTML="";
		document.getElementById('alertcf').innerHTML="";
		document.getElementById('alertdf').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	

}




function getselectedSmallsavings(){

	//alert('In EDIT SSID: '+selectedSSID);
	$('#MainDiv').show();
 	//$('#idRadioStart').hide();
	//getClientDataWithErrorHandling("GET", "", "clientSmallSaving?id="+selectedSSID, onGetSSSuccess, onGetSSError);
	getClientData("GET", "", "clientSmallSaving?id="+selectedSSID, onGetSSSuccess);
	function onGetSSSuccess(data) {
		//console.log(JSON.stringify(data));					
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberID);
		poupulateFamilyMemberImage(data.familyMemberID);
		populateForm($('#idAddSmallSavingForm'),data);
		
		myDatePicker();
		
		financialAssetTypeId = ''+data.financialAssetType+''; //converting to string for switch stmt
		//alert('Asset Type ID: '+financialAssetTypeId);
		switch (financialAssetTypeId) {
		    case "25":
		    	showNSC();
		        break;
		    case "26":
		    	showKVP();
		        break;
		    case "28":
		    	showPORD();
		    	break;
		    case "29":
		    	showPOTD();
		        break;
		    case "30":
		    	showPOMIS();
		        break;
		    case "31":
		    	showSCSS();
		        break;
		    case "32":
		    	showSSS();
		        break;
		}
		maskAllAmountFields();
		$(".dashboardheading").html(heading_prefix + heading);
		$("#idDepositAmount").focus();	
	
		$("#idCF option").filter(function() {
			//alert(data.compoundingFrequencySelect);
			return this.value==data.compoundingFrequencySelect;					    
		}).prop('selected', true);
		
		if (financialAssetTypeId == 25 || financialAssetTypeId == 26 || financialAssetTypeId == 28 || financialAssetTypeId == 32) {
			$("#idCF option").filter(function() {
				//alert(data.compoundingFrequencySelect);
				return this.value==data.compoundingFrequency;					    
			}).prop('selected', true);
		}
		
		//$("#idCFText").val(data.compoundingFrequency);
		
		$("#idPF option").filter(function() {
			return this.value==data.interestPayoutFrequencySelect;				    
		}).prop('selected', true);
		
		if (financialAssetTypeId == 30 || financialAssetTypeId == 31) {
			$("#idPF option").filter(function() {
				return this.value==data.interestPayoutFrequency;				    
			}).prop('selected', true);
		}
		//$("#idCFText").val(data.interestPayoutFrequency);
	
		$("#idDF option").filter(function() {
			return this.value==data.depositFrequency;				    
		}).prop('selected', true);
		
		//console.log('Interest rate retrieved: '+data.interestRate);
		$("#idInterestRate").val(parseFloat(data.interestRate*100).toFixed(2));
		
		$("#idTenureYears").blur(function() {
			//alert("on blur of Tenure");
					var startDateEdit = $("#idDepositStartDate").val();
					unmaskAllAmountFields();
					// Calculating Maturity Date
					var iMaturityDate='';
					if (financialAssetTypeId == 28 || financialAssetTypeId == 29 || financialAssetTypeId == 30 || financialAssetTypeId == 31) {
						//alert("in right if");
						if (startDateEdit != ""){
							iMaturityDate=moment(startDateEdit,'DD/MM/YYYY').add($("#idTenureYears").val(),'years').format('DD/MM/YYYY');
						} else {
							iMaturityDate="";
						}
						$("#idDepositMaturityDate").val(iMaturityDate);
					}
			    	maskAllAmountFields();
			
		});
		
	}
	
	/*function onGetSSError(data) {
		$("#idClient").load("resources/errorPage.html");
		$(".dashboardheading    ").html("Error Page");
	    $("#addRecord").hide();
	    $('#editRecord').hide();
	    $('#deleteRecord').hide();
	}*/

}
function maskAllAmountFields() {
	maskAmount('#idDepositAmount');
}
function unmaskAllAmountFields() {
	unmaskAmount('#idDepositAmount');
}
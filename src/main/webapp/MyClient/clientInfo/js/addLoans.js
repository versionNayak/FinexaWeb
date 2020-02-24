var pageMode = sessionStorage.getItem("PAGE_MODE");		
//var heading_prefix;
var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var loanTypeId ="";
var selectedLoanId = "";
var intRate="";
var loanAmountTypeId="";
var prevStartDate="";
var loanType = "";
var user_dt;
var client_dob;
var client_lexp;
var months;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
//var loan_start_date; 
$(document).ready(function() {
	$('#idSpan').hide();
	$('#emi-header').hide();
	$('#FM').hide();
	$('#nonemi-header').hide();
	$('#emi-original').hide();
	$('#emi-outstanding').hide();
	$('#idButton').hide();
	
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				$("#idSaveLoan").show();
				$("#undo").show();
			}else if(loggedClient.clientInfoView === "Y"){
				$("#idSaveLoan").hide();
				$("#idUndo").hide();
			}
		}else if(loggedUser != null && loggedUser.role === "Admin"){
			$("#idSaveLoan").hide();
			$("#idUndo").hide();
		}else{
			if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
				$("#idSaveLoan").show();
				$("#idUndo").show();
			}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
				$("#idSaveLoan").hide();
				$("#idUndo").hide();
			}
		}
	
	months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
	client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
	client_lexp = moment(client_dob).add(months, 'months').toDate();
	//loan_start_date = moment(sessionStorage.getItem("LOAN_START_DATE"),'DD/MM/YYYY').toDate();
	var options =  {
	  onComplete: function(cep) {
	     //alert('CEP Completed!:' + cep);		  
		 //window.given_start_date = moment($('#idLoanStartDate').val(),'DD/MM/YYYY').toDate();
		 //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);		 
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
	
	$('#idLoanStartDate').mask('00/00/0000',options);
	
	var options1 =  {
	  onComplete: function(cep) {
	     //alert('CEP Completed!:' + cep);		  
		 //window.given_start_date = moment($('#idLoanStartDateNE').val(),'DD/MM/YYYY').toDate();
		 //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);		 
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
			
	$('#idLoanStartDateNE').mask('00/00/0000',options1);

	$(function() {
		if (pageMode=="EDIT") {
			//alert('Page Mode EDIT');
			//heading_prefix='Edit ';
			$('#idRadioStart').hide();			
		}
		else {
			//heading_prefix='Add ';
			$('#idRadioStart').show();			
		}

		// Header Block Functionality - Selecting the loan type to add/edit
		//$('input[type="radio"]').click(function() {
		$("#idRadioStart input[name='loanType']").click(function(){
			$('#idRadioStart').hide();
			$('#MainDiv').show();
			$('#idButton').show();
			loanTypeId = $("input[name='loanType']:checked").val();
			switch (loanTypeId) {
		    case "1":
		 		showEMI();
		        break;
		    case "2":
		 		showNonEMI();
		        break;
			}
			
		});
		
		$("#idLoanAmountTypeRadioGroup input[name='loanOriginalFlag']").click(function(){
			loanAmountTypeId = $("input[name='loanOriginalFlag']:checked").val();
			switch (loanAmountTypeId) {
		    case "Y":
		    	$('#idSpan').hide();
				$('#emi-original').show();
				$('#emi-outstanding').hide();
				$('#nonemi-header').hide();
		        break;
		    case "N":
		    	
				$('#emi-original').hide();
				$('#emi-outstanding').show();
				$('#nonemi-header').hide();
				var todaydate = new Date();
				   var day = todaydate.getDate();
				   var month = todaydate.getMonth() + 1;
				   var year = todaydate.getFullYear();
				   var datestring = day + "/" + month + "/" + year;
				   document.getElementById("idOutLoanStartDate").value = datestring;
				   if(pageMode="ADD"){
					   $("#idDate").attr("disabled","disabled");
				   }
		        break;
			}						
		});
		// Header Block Functionality End
	});
    
/*	$("#idLoanAmountTypeRadioGroup input[name='loanOriginalFlag']").click(function(){
		loanType =$("#loanOriginalN").prop("checked", true);	
		if(loanType){
			var todaydate = new Date();
			   var day = todaydate.getDate();
			   var month = todaydate.getMonth() + 1;
			   var year = todaydate.getFullYear();
			   var datestring = day + "/" + month + "/" + year;
			   document.getElementById("idOutLoanStartDate").value = datestring;
		}
	});*/
	
		
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$("#idLoanStartDate").datepicker({
		format : "dd/mm/yyyy",
		todayHighlight : true,
		todayBtn : true,
		autoclose : true,
		forceParse: false,
		startDate : window.client_dob,
		endDate : new Date()
	}).on('changeDate', function(ev){
		
		$(this).focus().datepicker('hide');
		
		$("#alertstartdate").css('color','');
		$("#alertstartdate").text("");
		$("#idLoanStartDateGroup").css('border','');
		$("#idSaveLoan").prop("disabled", false);
		
		var thisDate = $(this).val()
		$(this).blur(function() {
			if (prevStartDate!=thisDate) {
				var dateObject = $("#idLoanStartDate").datepicker('getDate');
				if (dateObject != null) {
					if (CheckForMisc1()) {
						//	alert("CheckForMisc1 true");
							unmaskAmount('#idEmiAmount');
							unmaskAmount('#idCurrentEmiAmount');
							unmaskAmount('#idOutstandingPrincipalToday');
							var data = JSON.stringify($('#clientLoan').serializeToJSON());
							//console.log(data);
							getClientData("POST", data,"loanEndDateEMI", onloanEndDateEMISuccess);
							function onloanEndDateEMISuccess(data) {
								$("#idLoanEndDate").val(data.displayDate);
								var emiAmount = data.emiAmount;
								$("#idEmiAmount").val(emiAmount.toFixed(2));
				                maskAmount('#idEmiAmount');
								
								maskAmount('#idOriginalLoanAmount');
								maskAmount('#idCurrentEmiAmount');
								maskAmount('#idOutstandingPrincipalToday');
								
							}
						}else{
						//	alert("CheckForMisc1 false");
						}
				}
			}
		});
		
	});
	
	$("#idLoanStartDate").blur(function() {
		
		if ($(this).val() != "") {
			if (!checkValidDate($(this).val())) {
				$("#alertstartdate").css('color','red');
				$("#alertstartdate").text("Date is invalid!");
				$("#idLoanStartDateGroup").css('border','2px solid red');
				$("#idSaveLoan").prop("disabled", true);
			} else {
				$("#alertstartdate").css('color','');
				$("#alertstartdate").text("");
				$("#idLoanStartDateGroup").css('border','');
				$("#idSaveLoan").prop("disabled", false);
				if (CheckForMisc1()) {
					//	alert("CheckForMisc1 true");
						unmaskAmount('#idEmiAmount');
						unmaskAmount('#idCurrentEmiAmount');
						unmaskAmount('#idOutstandingPrincipalToday');
						var data = JSON.stringify($('#clientLoan').serializeToJSON());
						//console.log(data);
						getClientData("POST", data,"loanEndDateEMI", onloanEndDateEMISuccess);
						function onloanEndDateEMISuccess(data) {
							$("#idLoanEndDate").val(data.displayDate);
							var emiAmount = data.emiAmount;
							$("#idEmiAmount").val(emiAmount.toFixed(2));
			                maskAmount('#idEmiAmount');
							
							maskAmount('#idOriginalLoanAmount');
							maskAmount('#idCurrentEmiAmount');
							maskAmount('#idOutstandingPrincipalToday');
							
						}
					} else {
						//	alert("CheckForMisc1 false");
					}
			}
		} else {
			$("#alertstartdate").css('color','');
			$("#alertstartdate").text("");
			$("#idLoanStartDateGroup").css('border','');
			$("#idSaveLoan").prop("disabled", false);
		}
		
		
		
	});
	
	$("#idLoanStartDateNE").datepicker({
		format : "dd/mm/yyyy",
		todayHighlight : true,
		todayBtn : true,
		autoclose : true,
		forceParse: false,
		startDate : window.client_dob,
		endDate : new Date()
	}).on('changeDate', function(ev){
		$(this).focus().datepicker('hide');
		
		$("#alertLoanStartDateNE").css('color','');
		$("#alertLoanStartDateNE").text("");
		$("#idLoanStartDateNEGroup").css('border','');
		$("#idSaveLoan").prop("disabled", false);
		
		var thisDate = $(this).val()
		$(this).blur(function() {
			if (prevStartDate!=thisDate) {
				var dateObject = $("#idLoanStartDateNE").datepicker('getDate');
				if (dateObject != null) {
					if (CheckForMisc3()) {
				           console.log("CheckForMisc3");
							var data = JSON.stringify($('#clientLoan').serializeToJSON());
							//console.log(data);
							getClientData("POST", data,"loanEndDateNONEMI",onloanEndDateNONEMISuccess);
							function onloanEndDateNONEMISuccess(data) {
								$("#idLoanEndDateNE").val(data.displayDate);
								
								maskAmount('#idLoanAmountNE');
							}
						}
				}
			}
		});
	});
	
	$("#idLoanStartDateNE").blur(function() { 
		
		if ($(this).val() != "") {
			if (!checkValidDate($(this).val())) {
				$("#alertLoanStartDateNE").css('color','red');
				$("#alertLoanStartDateNE").text("Date is invalid!");
				$("#idLoanStartDateNEGroup").css('border','2px solid red');
				$("#idSaveLoan").prop("disabled", true);
			} else {
				$("#alertLoanStartDateNE").css('color','');
				$("#alertLoanStartDateNE").text("");
				$("#idLoanStartDateNEGroup").css('border','');
				$("#idSaveLoan").prop("disabled", false);
				if (CheckForMisc3()) {
			          // console.log("CheckForMisc3");
						var data = JSON.stringify($('#clientLoan').serializeToJSON());
						//console.log(data);
						getClientData("POST", data,"loanEndDateNONEMI",onloanEndDateNONEMISuccess);
						function onloanEndDateNONEMISuccess(data) {
							$("#idLoanEndDateNE").val(data.displayDate);
							maskAmount('#idLoanAmountNE');
						}
					}
			}
		} else {
			$("#alertLoanStartDateNE").css('color','');
			$("#alertLoanStartDateNE").text("");
			$("#idLoanStartDateNEGroup").css('border','');
			$("#idSaveLoan").prop("disabled", false);
		}
		
	});

	$(".datepicker-icon").on("click", function() {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
//	var formData = $('#clientLoan').serializeToJSON();
	populateFamilyMemberByClientId(selectedClientId, $("#familyMemberImage"), $('#clientLoan'));
	populateInterestFrequency($("#idInterestFrequency"));
	populateLoanCategory($("#idLCategory"));
	populateLoanCategory($("#idLCategoryNE"));
	//populateLoanProvider($("#idLProviderNE"));

	if (pageMode=="EDIT") {
		getSelectedLoan();
	}	

	$("#idSaveLoan").on("click", function(event) {
		unmaskAllAmountFields();
		selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
		// validate
		var validate = validateLoan($('#clientLoan'));
		
		if (validate) {
			showLoaderOnSave("#idSaveLoan");
			window.setTimeout(function(){
			if (typeof selectedImageFamilyMemberid != 'undefined' && selectedImageFamilyMemberid != null) {
				event.preventDefault();
				if (loanTypeId=="2") {                   //Non-EMI
					$("#loanOriginalY").prop("checked", false);
					$("#loanOriginalN").prop("checked", false);					
				}
				
				//var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				var formData = $('#clientLoan').serializeToJSON();
				formData["clientID"] = selectedClientId;
				formData["familyMemberId"] = selectedImageFamilyMemberid;
				if (loanTypeId=="1") {
					if (loanAmountTypeId=="Y") {
						//console.log('Óriginal Interest Rate: '+parseFloat($("#idOriginalInterestRate").val()/100));
						formData["interestRate"] = parseFloat($("#idOriginalInterestRate").val()/100).toFixed(6);
					}
					else if (loanAmountTypeId=="N") {
						//console.log('Current Interest Rate: '+parseFloat($("#idCurrentInterestRate").val()/100));
						formData["interestRateOut"] = parseFloat($("#idCurrentInterestRate").val()/100).toFixed(6);
					}
				}
				else if (loanTypeId=="2") {					
					//console.log('Non-EMI Interest Rate: '+parseFloat($("#idInterestRateNE").val()/100));
					formData["interestRateNE"] = parseFloat($("#idInterestRateNE").val()/100).toFixed(6);
				}
				
				if (pageMode=="EDIT") {
					formData["id"] = selectedLoanId;
					//formData["loanType"] = loanTypeId;
					var data = JSON.stringify(formData);
					console.log(data);
					//getClientDataWithErrorHandling("POST", data, "editClientLoan", onSaveLoanSuccess, onSaveLoanError);					
					saveData("POST", data, "editClientLoan", onSaveLoanSuccess);
				}
				else if (pageMode=="ADD") {
					var data = JSON.stringify(formData);
					//console.log(data);
					//getClientDataWithErrorHandling("POST", data, "createClientLoan", onSaveLoanSuccess, onSaveLoanError);					
					saveData("POST", data, "createClientLoan", onSaveLoanSuccess);
				}
			} else {
				alert("Please select a Family Member");
				return false;
			}
			}, 5000);
		}
		else {
			//alert('validation Failed');	
			return false;
		} 
	});

	function onSaveLoanSuccess(data) {
		
		hideLoaderOnSave("#idSaveLoan");
		//console.log("Saved loan id = " + data.id);
		serviceurl = "clientLoan/client/" + selectedClientId;
		getClientData("GET", "", serviceurl, onSuccess);
		function onSuccess(data) {
			//console.log(data);
			sessionStorage.setItem("LOAN_LIST", JSON.stringify(data));
			$("#idClient").load("clientInfo/viewLoansandLiabilities.html");
			$(".dashboardheading    ").html("");
			$(".dashboardheading    ").html("Loans and Liabilities");
			$("#addRecord").removeClass('btn_Disabled');
			$('#editRecord').addClass('btn_Disabled');
			$('#deleteRecord').addClass('btn_Disabled');
		}
	}
	/*function onSaveLoanError(err) {
		$("#alertform").text("Error saving loan information. Please try after sometime or contact system administrator.");
		$(window).scrollTop(0);
		hideLoaderOnSave("#idSaveLoan");
		//return false;				
	}	*/
	 
	
	
	/*$("#idOriginalLoanTenure").focusout(*/
	$("#idOriginalLoanTenure").change(function(event) {
		if (CheckForMisc1()) {
		//	alert("CheckForMisc1 true");
			unmaskAmount('#idEmiAmount');
			unmaskAmount('#idCurrentEmiAmount');
			unmaskAmount('#idOutstandingPrincipalToday');
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			//console.log(data);
			getClientData("POST", data, "loanEndDateEMI", onloanEndDateEMISuccess);
			function onloanEndDateEMISuccess(data) {
				$("#idLoanEndDate").val(data.displayDate);
				var emiAmount = data.emiAmount;
				$("#idEmiAmount").val(emiAmount.toFixed(2));
				maskAmount('#idEmiAmount');
				
				maskAmount('#idOriginalLoanAmount');
				
				maskAmount('#idCurrentEmiAmount');
				maskAmount('#idOutstandingPrincipalToday');
			}
		}else{
		//	alert("CheckForMisc1 false");
		}
	});

	$("#idOriginalLoanAmount").change(function(event) {

		//console.log("val "+$(this).val());
		if (CheckForMisc1()) {
			//alert("CheckForMisc1 true");
			unmaskAmount('#idEmiAmount');
			unmaskAmount('#idCurrentEmiAmount');
			unmaskAmount('#idOutstandingPrincipalToday');
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			//console.log(data);
				getClientData("POST", data,"loanEndDateEMI",onloanEndDateEMISuccess);
			function onloanEndDateEMISuccess(data) {
				$("#idLoanEndDate").val(data.displayDate);
				var emiAmount = data.emiAmount;
				$("#idEmiAmount").val(emiAmount.toFixed(2));
				maskAmount('#idEmiAmount');
				
				maskAmount('#idOriginalLoanAmount');
				maskAmount('#idCurrentEmiAmount');
				maskAmount('#idOutstandingPrincipalToday');
			
			}
		}else{
		//	alert("CheckForMisc1 false");
		}
	});

	$("#idOriginalInterestRate").change(function(event){
		if (CheckForMisc1()) {
			//alert("CheckForMisc1 true");
			unmaskAmount('#idEmiAmount');
			unmaskAmount('#idCurrentEmiAmount');
			unmaskAmount('#idOutstandingPrincipalToday');
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			//console.log(data);
			getClientData("POST", data,"loanEndDateEMI", onloanEndDateEMISuccess);
			function onloanEndDateEMISuccess(data) {
				$("#idLoanEndDate").val(data.displayDate);
				//alert('In OriginalInterestRate');
				var emiAmount = data.emiAmount;
				$("#idEmiAmount").val(emiAmount.toFixed(2));
                 maskAmount('#idEmiAmount');
				
				maskAmount('#idOriginalLoanAmount');
				maskAmount('#idCurrentEmiAmount');
				maskAmount('#idOutstandingPrincipalToday');
			
			}
		}else{
		//	alert("CheckForMisc1 false");
		}
	});
	
	$("#idCurrentEmiAmount").keyup(function(event) {
		
		if (CheckForMisc2()) {
			//console.log("CheckForMisc2 true");
			
			 unmaskAmount('#idEmiAmount');
			 unmaskAmount('#idOriginalLoanAmount');
			
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			//console.log(data);
			getClientData("POST", data,"loanEndDateEMI",onloanEndDateEMISuccess);
			function onloanEndDateEMISuccess(data) {
				//console.log("lPendingInstallments.value "+data.pendingInstalments);
                $("#idPendingInstallments").val(data.pendingInstalments);
				$("#idLoanEndDateOut").val(data.displayDate);
				
				checkpendinginstallments(data);
				
                maskAmount('#idCurrentEmiAmount');
				maskAmount('#idOutstandingPrincipalToday');
				
				maskAmount('#idEmiAmount');
				maskAmount('#idOriginalLoanAmount');
				
			}

		}else{
		//	alert("CheckForMisc2 false");
		}
	});

	$("#idCurrentInterestRate").keyup(function(event) {
		if (CheckForMisc2()) {
			//console.log("CheckForMisc2 true");
			
			 unmaskAmount('#idEmiAmount');
			 unmaskAmount('#idOriginalLoanAmount');
			 
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			//console.log(data);
			getClientData("POST", data,"loanEndDateEMI",onloanEndDateEMISuccess);
			function onloanEndDateEMISuccess(data) {
				console.log("lPendingInstallments.value "+data.pendingInstalments);
				$("#idPendingInstallments").val(data.pendingInstalments);
				$("#idLoanEndDateOut").val(data.displayDate);
				
				checkpendinginstallments(data);
				
				maskAmount('#idCurrentEmiAmount');
				maskAmount('#idOutstandingPrincipalToday');
				
				maskAmount('#idEmiAmount');
				maskAmount('#idOriginalLoanAmount');
			}
		}else{
		//	alert("CheckForMisc2 false");
		}
	});

	$("#idOutstandingPrincipalToday").keyup(function(event) {
		if (CheckForMisc2()) {
			if (pageMode=="EDIT") {
			$("#idOutLoanStartDate").removeAttr("readonly");
			$('.calendar-icon-container').prop('disabled', false);
			$("#idOutLoanStartDate").prop('disabled', false);
			}
			//console.log("CheckForMisc2 true");
			
			 unmaskAmount('#idEmiAmount');
			 unmaskAmount('#idOriginalLoanAmount');
			 
			//console.log(data);
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			getClientData("POST", data,"loanEndDateEMI",onloanEndDateEMISuccess);
			function onloanEndDateEMISuccess(data) {
				//console.log("lPendingInstallments.value "+data.pendingInstalments);
				$("#idPendingInstallments").val(data.pendingInstalments);
				$("#idLoanEndDateOut").val(data.displayDate);
				
				checkpendinginstallments(data);
				
				maskAmount('#idCurrentEmiAmount');
				maskAmount('#idOutstandingPrincipalToday');
				maskAmount('#idEmiAmount');
				maskAmount('#idOriginalLoanAmount');
			}
		}else{
		//	alert("CheckForMisc2 false");
		}
	});

	$("#idLoanAmountNE").change(function() {
		if (CheckForMisc3()) {
           //console.log("CheckForMisc3");
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			//console.log(data);
			getClientData("POST", data,"loanEndDateNONEMI",onloanEndDateNONEMISuccess);
			function onloanEndDateNONEMISuccess(data) {
				$("#idLoanEndDateNE").val(data.displayDate);
				
			
				maskAmount('#idLoanAmountNE');
			}
		}

	});

	$("#idInterestRateNE").change(function() {
		if (CheckForMisc3()) {
          // console.log("CheckForMisc3");
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			//console.log(data);
			getClientData("POST", data,"loanEndDateNONEMI",onloanEndDateNONEMISuccess);
			function onloanEndDateNONEMISuccess(data) {
				$("#idLoanEndDateNE").val(data.displayDate);
				
				maskAmount('#idLoanAmountNE');
			}
		}
	});

	$("#idLoanTenureNE").change(function() {
		if (CheckForMisc3()) {
          // console.log("CheckForMisc3");
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			//console.log(data);
			getClientData("POST", data,"loanEndDateNONEMI",onloanEndDateNONEMISuccess);
			function onloanEndDateNONEMISuccess(data) {
				$("#idLoanEndDateNE").val(data.displayDate);
				var lLoanAmountNE = document.getElementById("idLoanAmountNE");
				
				maskAmount('#idLoanAmountNE');
			}
		}
	});
	
	$("#idInterestFrequency").change(function() {
		if (CheckForMisc3()) {
          // console.log("CheckForMisc3");
			var data = JSON.stringify($('#clientLoan').serializeToJSON());
			//console.log(data);
			getClientData("POST", data,"loanEndDateNONEMI",onloanEndDateNONEMISuccess);
			function onloanEndDateNONEMISuccess(data) {
				$("#idLoanEndDateNE").val(data.displayDate);
				
				maskAmount('#idLoanAmountNE');
			}
		}
	});
	
	if (pageMode=="EDIT") {
		/*$('.calendar-icon-container').click(function(){
	        $(this).prop('disabled', true);
	    });
		*/
		$('.calendar-icon-container').prop('disabled', true);
		
		$("#idCurrentEmiAmount").change(function() {
			$("#idOutLoanStartDate").removeAttr("readonly");
			$('.calendar-icon-container').prop('disabled', false);
			
		});
		
	    $("#idCurrentInterestRate").change(function() {
			
	    	$("#idOutLoanStartDate").removeAttr("readonly");
	    	$('.calendar-icon-container').prop('disabled', false);
	    	
		});
	    
	}
	
   
	
	$('#focusguard-2').on('focus', function() {
		// "last" focus guard got focus: set focus to the first field		
		if (loanTypeId=="1")
			$("#idLCategory").focus();
		else
			$("#idLCategoryNE").focus();
		$(window).scrollTop(0);
	});
	
	
	
	
});


function getSelectedLoan(){
	$('#MainDiv').show();
	$('#idButton').show();
	selectedLoanId = sessionStorage.getItem("SELECTED_LOAN_ID");		
	//console.log('Selected Loan ID: '+selectedLoanId);
	getClientData("GET", "", "clientLoan?loanId="+selectedLoanId, onGetLoansDataSuccess);
	function onGetLoansDataSuccess(data) {
		//console.log(JSON.stringify(data));
		/*sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberId);
		sessionStorage.setItem("LOAN_START_DATE", data.loanStartDateOut);*/
		poupulateFamilyMemberImage(data.familyMemberId);
		populateForm($('#clientLoan'),data);
		
		
		myDatePicker();
	/*	if(data.loanOriginalFlag == "N"){
			('#idSpan').show();
		}*/
		//console.log("data.loanType "+data.loanType); 
		loanTypeId = '' + data.loanType +''; //converting to string for switch stmt
		//console.log('Loan Type: '+loanTypeId);
		loanAmountTypeId = '' + data.loanOriginalFlag +''; //converting to string;
		switch (loanTypeId) {
		    case "1":
		    	setEMIData(data);
		        break;
		    case "2":
		    	setNonEMIData(data);
		        break;
		}
		maskAllAmountFields();
	}
}

function myDatePicker() {
	$("#idLoanStartDate").datepicker('remove');
	$("#idLoanStartDateNE").datepicker('remove');
	$("#idOutLoanStartDate").datepicker('remove');
	if (pageMode=="EDIT") {
		$("#idLoanStartDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : false,
			todayBtn : true,
			autoclose : true,
			forceParse: false,
			startDate : window.client_dob,
			endDate : new Date()
		}).on('changeDate', function(ev){
			$("#alertstartdate").css('color','');
			$("#alertstartdate").text("");
			$("#idLoanStartDateGroup").css('border','');
			$("#idSaveLoan").prop("disabled", false);
		});
		
		
		
		$("#idLoanStartDateNE").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : false,
			todayBtn : true,
			autoclose : true,
			forceParse: false,
			startDate : window.client_dob,
			endDate : new Date()
		}).on('changeDate', function(ev){
			$("#alertLoanStartDateNE").css('color','');
			$("#alertLoanStartDateNE").text("");
			$("#idLoanStartDateNEGroup").css('border','');
			$("#idSaveLoan").prop("disabled", false);
		});
		
	} else {
		$("#idLoanStartDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : true,
			todayBtn : true,
			autoclose : true,
			forceParse: false,
			startDate : window.client_dob,
			endDate : new Date()
		}).on('changeDate', function(ev){
			$("#alertstartdate").css('color','');
			$("#alertstartdate").text("");
			$("#idLoanStartDateGroup").css('border','');
			$("#idSaveLoan").prop("disabled", false);
		});
		
		$("#idLoanStartDateNE").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : true,
			todayBtn : true,
			autoclose : true,
			forceParse: false,
			startDate : window.client_dob,
			endDate : new Date()
		}).on('changeDate', function(ev){
			$("#alertLoanStartDateNE").css('color','');
			$("#alertLoanStartDateNE").text("");
			$("#idLoanStartDateNEGroup").css('border','');
			$("#idSaveLoan").prop("disabled", false);
		});
	}
	
}

$("#idUndo").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});

function undoChange(){
	//alert("inside undoChange");
	updatedUNDO();
	
	if (pageMode=="ADD") {
		$(".form-control").val("");
		loanAmountTypeId = $("input[name='loanOriginalFlag']:checked").val();
		//alert("loanAmountTypeId: " + loanAmountTypeId);
		switch (loanAmountTypeId) {
	    case "Y":
			$('#emi-original').hide();
			$('#emi-outstanding').hide();
			$('#nonemi-header').hide();
	        break;
	    case "N":
			$('#emi-original').hide();
			$('#emi-outstanding').hide();
			$('#nonemi-header').hide();
	        break;
		}		
		$("#idLoanAmountTypeRadioGroup input[name='loanOriginalFlag']").prop("checked", false);
	} else {
		if (pageMode=="EDIT") {
			getSelectedLoan();
		}
	}
}

function updatedUNDO(){
	if(loanTypeId == "1"){
		
		var lLoanCategory = document.getElementById("idLCategory");
		var lOtherLoanCategory = document.getElementById("idOtherLoanCategory");
		var lLoanStartDate = document.getElementById("idLoanStartDate");
		var lLoanStartDateGroup = document.getElementById("idLoanStartDateGroup");
		var lOriginalLoanTenure = document.getElementById("idOriginalLoanTenure");
		var lOriginalLoanAmount = document.getElementById("idOriginalLoanAmount");
		var lOriginalInterestRate = document.getElementById("idOriginalInterestRate");
		var lLoanProvider = document.getElementById("idLProvider");
		var lOutstandingPrincipalToday = document.getElementById("idOutstandingPrincipalToday");
		var lCurrentInterestRate = document.getElementById("idCurrentInterestRate");
		var lCurrentEMIAmount = document.getElementById("idCurrentEmiAmount");
		
		lLoanCategory.style.border = "";
		lOtherLoanCategory.style.border = "";
		lLoanProvider.style.border = "";
		lLoanStartDateGroup.style.border = "";
		lLoanStartDateGroup.style.borderRadius = "";
		lOriginalLoanTenure.style.border = "";
		lOriginalLoanAmount.style.border = "";
		lOriginalInterestRate.style.border = "";
		// ///Outstanding
		lOutstandingPrincipalToday.style.border = "";
		lCurrentInterestRate.style.border = "";
		lCurrentEMIAmount.style.border = "";

		document.getElementById('alertloancategory').innerHTML = "";
		document.getElementById('alertOtherLoanCategory').innerHTML = "";
		document.getElementById('alertloanprovider').innerHTML = "";
		document.getElementById('alertoriginalloanamount').innerHTML = "";
		document.getElementById('alertstartdate').innerHTML = "";
		document.getElementById('alertoriginalloantenure').innerHTML = "";
		document.getElementById('alertoriginalinterestrate').innerHTML = "";
		// ///Outstanding
		document.getElementById('alertlOutstandingPrincipalToday').innerHTML = "";
		document.getElementById('alertCurrentInterestRate').innerHTML = "";
		document.getElementById('alertCurrentEmiAmount').innerHTML = "";
		document.getElementById('alertform').innerHTML="";
	}
	if(loanTypeId == "2"){
		var lLoanCategoryNE = document.getElementById("idLCategoryNE");
		var lOtherLoanCategoryNE = document.getElementById("idOthersNE");
		var lLoanAmountNE = document.getElementById("idLoanAmountNE");
		var lLoanStartDateNE = document.getElementById("idLoanStartDateNE");
		var lLoanStartDateNEGroup = document.getElementById("idLoanStartDateNEGroup");
		var lInterestRateNE = document.getElementById("idInterestRateNE");
		var lLoanTenureNE = document.getElementById("idLoanTenureNE");
		var lInterestPaymentFrequency = document.getElementById("idInterestFrequency");
		var lLoanProviderNE = document.getElementById("idLProviderNE");
		var lLoanEndDateNE = document.getElementById("idLoanEndDateNE");

		lLoanCategoryNE.style.border = "";
		lOtherLoanCategoryNE.style.border = "";
		lLoanAmountNE.style.border = "";
		lLoanStartDateNE.style.border = "";
		lLoanStartDateNEGroup.style.border = "";
		lInterestRateNE.style.border = "";
		lLoanTenureNE.style.border = "";
		lInterestPaymentFrequency.style.border = "";
		lLoanProviderNE.style.border = "";
		lLoanEndDateNE.style.border = "";

		document.getElementById('alertloancategoryNE').innerHTML = "";
		document.getElementById('alertOtherLoanCategoryNE').innerHTML = "";
		document.getElementById('alertLoanAmountNE').innerHTML = "";
		document.getElementById('alertLoanStartDateNE').innerHTML = "";
		document.getElementById('alertInterestRateNE').innerHTML = "";
		document.getElementById('alertLoanTenureNE').innerHTML = "";
		document.getElementById('alertIPF').innerHTML = "";
		document.getElementById('alertLoanProviderNE').innerHTML = "";
		document.getElementById('alertLoanEndDateNE').innerHTML = "";
		document.getElementById('alertform').innerHTML="";
	}
		
	
}
/*function getSelectedLoan(){
	$('#MainDiv').show();
	$('#idButton').show();
	selectedLoanId = sessionStorage.getItem("SELECTED_LOAN_ID");		
	console.log('Selected Loan ID: '+selectedLoanId);
	getClientData("GET", "", "clientLoan?loanId="+selectedLoanId, onGetLoansDataSuccess);
	function onGetLoansDataSuccess(data) {
		//console.log(JSON.stringify(data));
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberId)
		sessionStorage.removeItem("LOAN_START_DATE");
		alert(data.loanStartDateOut);
		sessionStorage.setItem("LOAN_START_DATE", data.loanStartDateOut);
		alert("loanStartDate"+ sessionStorage.setItem("LOAN_START_DATE", data.loanStartDateOut));
		poupulateFamilyMemberImage(data.familyMemberId);
		populateForm($('#clientLoan'),data);
		
		myDatePicker();
		
		console.log("data.loanType "+data.loanType); 
		loanTypeId = '' + data.loanType +''; //converting to string for switch stmt
		console.log('Loan Type: '+loanTypeId);
		loanAmountTypeId = '' + data.loanOriginalFlag +''; //converting to string;
		switch (loanTypeId) {
		    case "1":
		    	setEMIData(data);
		        break;
		    case "2":
		    	setNonEMIData(data);
		        break;
		}
		maskAllAmountFields();
	}
}*/

/*selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
var serviceurl = '/clientFamilyMember/'+selectedImageFamilyMemberid;
getClientData("GET", "", serviceurl, onSuccess);
function onSuccess(data) {
	///console.log(data);
	 window.months = (parseInt(data.lifeExpectancy) * 12); 
	 window.user_dt = moment(data.birthDate,'DD/MM/YYYY').toDate();
	 window.client_lexp = moment(window.client_dob).add(window.months, 'months').toDate();
	 
	 if( $('#idEMI').prop('checked') == true ){
 		$("#idLoanStartDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : true,
			todayBtn : true,
			autoclose : true,
			startDate : window.client_dob,
			endDate : new Date()
		});
 		
 		
	 }else if( $('#idNonEMI').prop('checked') == true ){
	    $("#idLoanStartDateNE").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : true,
			todayBtn : true,
			autoclose : true,
			startDate : window.client_dob,
			endDate : new Date()
		});
	    	    
	 }
	 	 	 
	 
}
*/

function showEMI() {
	//alert('In showEMI');	
	$("#idOtherLoanCategory").attr("disabled", "disabled");
	$("#idOtherLoanProviderName").attr("disabled", "disabled");
	$('#FM').show();
	$('#emi-header').show();
	$('#nonemi-header').hide();
	if ($("#loanOriginalY").is(':checked')) {
		$('#emi-original').show();
		$('#emi-outstanding').hide();
		$('#nonemi-header').hide();
	} else {
		if ($("#loanOriginalN").is(':checked')) {
			$('#emi-original').hide();
			$('#emi-outstanding').show();
			$('#nonemi-header').hide();
		}
	}
 	$("#idLCategory").focus();   
}

function setEMIData(data) {
	showEMI();
	$("#idLCategory option").filter(function() {
		 // console.log("data.loanCategoryId ");
		 return this.value==data.loanCategoryId;	    
	}).prop('selected', true);

	// $("#idLCategory").val(data.loanCategoryId);
	$("#idLProvider option").filter(function() {
		   // console.log("data.loanProviderId ");
			return this.value==data.loanProviderId;						
	}).prop('selected', true);
	$("#idEMI").prop("checked",true);
	$("#idNonEMI").prop("disabled",true);
	
	if (data.loanOriginalFlag=="N") {
		$('#idSpan').show();
		$("#idCurrentInterestRate").val(parseFloat(data.interestRateOut*100).toFixed(2));
			$("#idOutLoanStartDate").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : true,
				todayBtn : true,
				autoclose : true,
				forceParse: false,
				startDate : data.loanStartDateOut
			}).on('changeDate', function(ev){
				if (CheckForMisc2()) {
					
					 unmaskAmount('#idEmiAmount');
					 unmaskAmount('#idOriginalLoanAmount');
					 
				//	console.log(data);
					var data = JSON.stringify($('#clientLoan').serializeToJSON());
					getClientData("POST", data,"loanEndDateEMI",onloanEndDateEMISuccess);
					function onloanEndDateEMISuccess(data) {
						//console.log("lPendingInstallments.value "+data.pendingInstalments);
						$("#idPendingInstallments").val(data.pendingInstalments);
						$("#idLoanEndDateOut").val(data.displayDate);
						
						checkpendinginstallments(data);
						
						maskAmount('#idCurrentEmiAmount');
						maskAmount('#idOutstandingPrincipalToday');
						maskAmount('#idEmiAmount');
						maskAmount('#idOriginalLoanAmount');
					}
				}
			});
		
		
		$("#idOutLoanStartDate").blur(function() {
			if (CheckForMisc2()) {
				
				 unmaskAmount('#idEmiAmount');
				 unmaskAmount('#idOriginalLoanAmount');
				 
				//console.log(data);
				var data = JSON.stringify($('#clientLoan').serializeToJSON());
				getClientData("POST", data,"loanEndDateEMI",onloanEndDateEMISuccess);
				function onloanEndDateEMISuccess(data) {
					//console.log("lPendingInstallments.value "+data.pendingInstalments);
					$("#idPendingInstallments").val(data.pendingInstalments);
					$("#idLoanEndDateOut").val(data.displayDate);
					
					checkpendinginstallments(data);
					
					maskAmount('#idCurrentEmiAmount');
					maskAmount('#idOutstandingPrincipalToday');
					maskAmount('#idEmiAmount');
					maskAmount('#idOriginalLoanAmount');
				}
			}else{
			
			}
		});
		
		
	}
	else{
		$("#idOriginalInterestRate").val(parseFloat(data.interestRate*100).toFixed(2));
	}
		
}

function showNonEMI() {
	//alert('In showNonEMI');
	$('#emi-header').hide();
	$("#idOthersNE").attr("disabled", "disabled");
	$('#FM').show();
	$('#nonemi-header').show();
	$('#emi-original').hide();
	$('#emi-outstanding').hide();
	
	$("#idLCategoryNE").focus();	
}

function setNonEMIData(data) {
	showNonEMI();

	$("#idLCategoryNE option").filter(function() {
		//console.log("this.value "+this.value+"== "+data.loanCategoryIdNE);
			return this.value==data.loanCategoryIdNE;
	}).prop('selected', true);
	
	console.log("data.loanProviderIdNE "+data.loanProviderIdNE);
	$("#idLProviderNE option").filter(function() {
		//console.log("this.value "+this.value+" == "+data.loanProviderIdNE);
		return this.value==data.loanProviderIdNE;
	}).prop('selected', true); 
	
	$("#idInterestFrequency option").filter(function() {
		//console.log("this.value "+this.value);
		return this.value==data.interestPaymentFrequency;
	}).prop('selected', true); 
	
	
	$("#idEMI").prop("disabled",true);
	$("#idNonEMI").prop("checked",true);
	//alert('Ínterest Rate: '+data.interestRateNE);	
	$("#idInterestRateNE").val(parseFloat(data.interestRateNE*100).toFixed(2));
}

function otherLoan() {
	var lLoanCategory = document.getElementById("idLCategory");
	var lLoanCategorySelected = lLoanCategory.options[lLoanCategory.selectedIndex].value;

	if (lLoanCategorySelected != 8) {
		$("#idOtherLoanCategory").attr("disabled", "disabled");
		$("#idOtherLoanCategory").val(" ");
	} else {
		$("#idOtherLoanCategory").removeAttr("disabled");
	}
}



function otherLoanNE() {
	var lLoanCategoryNE = document.getElementById("idLCategoryNE");
	var lLoanCategorySelectedNE = lLoanCategoryNE.options[lLoanCategoryNE.selectedIndex].value;

	if (lLoanCategorySelectedNE != 8) {
		$("#idOthersNE").attr("disabled", "disabled");
		$("#idOthersNE").val(" ");
	} else {
		$("#idOthersNE").removeAttr("disabled");
	}
}

function populateLoanCategory(lcDrop) {
	getClientDataAsyncFalse("GET", "", "AllLoanCategory", loanCategorySuccess);

	function loanCategorySuccess(data) {
		lcDrop.find('option').remove();
		lcDrop.append('<option value="">Select Loan Category</option>');
		$.each(data, function (index, item) {
			lcDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});
	}
}

/*function onCustomImageClick(){	
	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	var serviceurl = '/clientFamilyMember/'+selectedImageFamilyMemberid;
	getClientData("GET", "", serviceurl, onSuccess);
	function onSuccess(data) {
		///console.log(data);
		 window.months = (parseInt(data.lifeExpectancy) * 12); 
		 window.user_dt = moment(data.birthDate,'DD/MM/YYYY').toDate();
		 window.client_lexp = moment(window.client_dob).add(window.months, 'months').toDate();
		 		 
		 if( $('#idEMI').prop('checked') == true ){
			 
			 $("#idLoanStartDate").datepicker('remove');  
			 
	 		$("#idLoanStartDate").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : true,
				todayBtn : true,
				autoclose : true,
				startDate : window.client_dob,
				endDate : new Date()
			});
	 		
	 		
		 }else if( $('#idNonEMI').prop('checked') == true ){
			 
			 $("#idLoanStartDateNE").datepicker('remove');
			 
		    $("#idLoanStartDateNE").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : true,
				todayBtn : true,
				autoclose : true,
				startDate : window.client_dob,
				endDate : new Date()
			});
		    		    
		 }
		 
	}

}
*/

function onCustomImageClick(){  
	updatedUNDO();
	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
    var serviceurl = '/clientFamilyMember/'+selectedImageFamilyMemberid;
    getClientData("GET", "", serviceurl, onSuccess);
    function onSuccess(data) {
        //console.log(data);
    	//alert("LE: " +data.lifeExpectancy);
    	if(data.lifeExpectancy==null){
    		var years=100;
    		window.client_dob = moment(data.birthDate,'DD/MM/YYYY').toDate();
    		window.client_lexp = moment(window.client_dob).add(years, 'years').toDate();
    	}else{
    	     
    		 window.months = (parseInt(data.lifeExpectancy) * 12); 
             window.client_dob = moment(data.birthDate,'DD/MM/YYYY').toDate();
             window.client_lexp = moment(window.client_dob).add(window.months, 'months').toDate();
             
    	}
    	
    	/*if(data.birthDate==null){
    		window.client_dob = moment.subtract(-100, 'years');
    		
    	}else{
    		window.client_dob = moment(data.birthDate,'DD/MM/YYYY').toDate();
    	}*/
    	
    	if( $('#idEMI').prop('checked') == true ){
			 
			 $("#idLoanStartDate").datepicker('remove');  
			 
	 		$("#idLoanStartDate").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : true,
				todayBtn : true,
				autoclose : true,
				startDate : window.client_dob,
				endDate : new Date()
			});
	 		
	 		
		 }else if( $('#idNonEMI').prop('checked') == true ){
			 
			 $("#idLoanStartDateNE").datepicker('remove');
			 
		    $("#idLoanStartDateNE").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : true,
				todayBtn : true,
				autoclose : true,
				startDate : window.client_dob,
				endDate : new Date()
			});
		    		    
		 }
    }
}

function maskAllAmountFields() {
	//console.log("In maskAllAmountFields");
	maskAmount('#idOriginalLoanAmount');
	maskAmount('#idEmiAmount');
	maskAmount('#idOutstandingPrincipalToday');
	maskAmount('#idCurrentEmiAmount');
	maskAmount('#idLoanAmountNE');
}

function unmaskAllAmountFields() {
	unmaskAmount('#idOriginalLoanAmount');
	unmaskAmount('#idEmiAmount');
	unmaskAmount('#idOutstandingPrincipalToday');
	unmaskAmount('#idCurrentEmiAmount');
	unmaskAmount('#idLoanAmountNE');
}

function clearForm(oForm) {
    
	  var elements = oForm.elements; 
	    
	  oForm.reset();

	  for(i=0; i<elements.length; i++) {
	      
		field_type = elements[i].type.toLowerCase();
		
		switch(field_type) {
		
			case "text": 
			case "password": 
			case "textarea":
		        case "hidden":	
				
				elements[i].value = ""; 
				break;
	        
			case "radio":
			case "checkbox":
	  			if (elements[i].checked) {
	   				elements[i].checked = false; 
				}
				break;

			case "select-one":
			case "select-multi":
	            		elements[i].selectedIndex = -1;
				break;

			default: 
				break;
		}
	    }
	}


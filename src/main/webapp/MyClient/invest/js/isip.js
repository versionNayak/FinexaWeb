var dataFromService;
var selectedBank;
$(document).ready(function() {
	var applicantData = sessionStorage.getItem("APPLICANT_STATUS");
	jsonString = JSON.parse(applicantData);
	var options =  {
		      onComplete: function(cep) {        
		         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
		         //window.ln_start_dt_isvalid = isDateBetwenRange(window.clientDOB, new Date() ,window.given_start_date);
		      },
		      onKeyPress: function(cep, event, currentField, options){},
		      onChange: function(cep){},
		      onInvalid: function(val, e, f, invalid, options){}
	};
	
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	$('#idInvestmentStartDate').mask('00/00/0000',options);
	// calendar
	"use strict";
		$("[data-toggle=\"tooltip\"]").tooltip();
		$("#idInvestmentStartDate").datepicker('remove'); 
		$("#idInvestmentStartDate").datepicker({
			format : "dd/mm/yyyy",
	        todayHighlight : true,
	        todayBtn : true,
	        autoclose : true,
	        forceParse: false,
	        startDate : new Date()
	    });
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = dd + '/' + mm + '/' + yyyy;
		//document.write(today);
		$('#idInvestmentStartDate').val(today);
		$('#idEndDate').val('31/12/2099');
		$('#idEndDate').mask('00/00/0000',options);
		// calendar
		"use strict";
			$("[data-toggle=\"tooltip\"]").tooltip();
			$("#idEndDate").datepicker('remove'); 
			$("#idEndDate").datepicker({
				format : "dd/mm/yyyy",
		        todayHighlight : true,
		        todayBtn : true,
		        autoclose : true,
		        forceParse: false,
		        startDate : new Date()
		    });
		
	
	var transactMode = sessionStorage.getItem("TRANSACT_NAV_MODE");
	if (transactMode == "SIDEBAR") {
		$("#idNavigationTable").hide();
		$("#idDivUCCText").hide();
		$("#idDivUCCCombo").show();
		var serviceurl = "clientTransact/"+selectedClientId;
	    getClientData("GET", "" , serviceurl, onSuccess);
	    function onSuccess(data) {
	    	if (data.length == 0) {
	    		
	    		 bootbox.confirm({
					  title: "No Client Code Present",
				    	message: "Please create Client Code to Proceed further",
					    	callback: function (result) {
					    		if (result === true) {
					    			$("#idInvest").empty();
					    			$(".dashboardheading").html("Create UCC");
					    			$("#idInvest").load("invest/addCreateUCC.html");
					    		}
		    	 				else{
		    	 					$(".dashboardheading").html("View UCC");
		    	 			    	$("#idInvest").load("invest/viewUCCDetails.html");
	    	 				}	
	    	 				}	
	            		});
	    	} else {
	    		holdingDrop = $("#idClientUCCCombo");
				holdingDrop.find('option').remove();
				holdingDrop.append('<option value="">Select UCC</option>');
				$.each(data, function (index, value) {
					holdingDrop.append('<option value="' + value.clientCode + '" name = "' + value.clientAppName1 + '">' + value.clientCode + '</option>');
				});
	    	}
	    }
		
	} else {
		
		if (transactMode == "UCC_EDIT") {
			$("#idNavigationTable").hide();
		} else {
			$("#idNavigationTable").show();
		}
		$("#idDivUCCText").show();
		$("#idDivUCCCombo").hide();
		$("#idClientUCCText").val(jsonString.clientCode);
		$("#idClientName").val(jsonString.applicantName);
		var holdingDrop = $("#idBankNameIsip");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Bank Name</option>');
		var serviceurl = "viewBankList/"+jsonString.clientCode;
	    getClientData("GET", "" , serviceurl, onSuccess);
	    function onSuccess(data) {
	    	dataFromService = data;
	    	$.each(data, function (index, value) {
				holdingDrop.append('<option value="' + value.bankName + '">' + value.bankName + '</option>');
			});
	    }
	}
	
});	
$('#idClientUCCCombo').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idClientUCCCombo");
	var selectedName = $(this).find('option:selected').attr("name");
	$("#idClientName").val(selectedName);
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	holdingDrop = $("#idBankNameIsip");
	holdingDrop.find('option').remove();
	holdingDrop.append('<option value="">Select Bank Name</option>');
	if (selectedValue != "") {
		var clientCode = $('#idClientUCCCombo').val();
		var serviceurl = "viewBankList/"+clientCode;
	    getClientData("GET", "" , serviceurl, onSuccess);
	    function onSuccess(data) {
	    	dataFromService = data;
	    	$.each(data, function (index, value) {
				holdingDrop.append('<option value="' + value.bankName + '">' + value.bankName + '</option>');
			});
	    }
	} else {
		ifscDrop = $("#idIFSC");
		ifscDrop.find('option').remove();
		ifscDrop.append('<option value="">Select IFSC Code</option>');
		
		accDrop = $("#idACCNOISIP");
		accDrop.find('option').remove();
		accDrop.append('<option value="">Select Account No</option>');
	}
});


//function validateISIPForm() {
$('#idSaveAndFinish').click(function(){
	if(validateIsipForm($('#formISIP'),sessionStorage.getItem("TRANSACT_NAV_MODE"))) {
		//alert("Inside isip.js page");
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#formISIP').serializeToJSON();
		formData["clientId"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorId"] = loggedUser.id;
		if (formData["clientCode"] == null) {
			formData["clientCode"] = $("#idClientUCCText").val();
		}
		var data = JSON.stringify(formData);
	//	alert("data" + data);
		saveData("POST", data, "validateAndSaveMandate", onAddUCCGeneralSuccess)
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
			$('#formISIP')[0].reset();
//			alert(data.status);
			if (data.status) {
				if (sessionStorage.getItem("TRANSACT_NAV_MODE") == "UCC_EDIT") {
					sessionStorage.removeItem("SELECTED_MANDATE_STATUS");
		    		sessionStorage.setItem("SELECTED_MANDATE_STATUS", "true");
					$("#idInvest").empty();
					$(".dashboardheading").html("Edit UCC");
					$("#idInvest").load("invest/verificationProcessDisabled.html");
				} else {
					$(".dashboardheading").html("View UCC");
					$("#idInvest").load("invest/viewInvestDashboard.html");
					sessionStorage.removeItem("LIST_OF_UCC");
					sessionStorage.removeItem("APPLICANT_STATUS");
					sessionStorage.removeItem("APPLICANT_NAME");
				}
			}
			
		}
	}
});

$('#idBankNameIsip').change(function(e){
	// Your event handler
	var ddl = document.getElementById("idBankNameIsip");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	ifscDrop = $("#idIFSC");
	ifscDrop.find('option').remove();
	ifscDrop.append('<option value="">Select IFSC Code</option>');
	if (selectedValue != "") {
		selectedBank = selectedValue;
		$.each(dataFromService, function (index, value) {
			if (value.bankName == selectedValue) {
					$.each(value.ifscCodeList, function (indexIfsc, valueIfsc) {
					ifscDrop.append('<option value="' + valueIfsc.ifscCode + '">' + valueIfsc.ifscCode + '</option>');
				})
			}
		});
	} else {
		accDrop = $("#idACCNOISIP");
		accDrop.find('option').remove();
		accDrop.append('<option value="">Select Account No</option>');
	}
});
$('#idIFSC').change(function(e){
	// Your event handler
	
	var ddl = document.getElementById("idIFSC");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	accDrop = $("#idACCNOISIP");
	accDrop.find('option').remove();
	accDrop.append('<option value="">Select Account No</option>');
	if (selectedValue != null) {
		$.each(dataFromService, function (index, value) {
			if (value.bankName == selectedBank) {
				$.each(value.ifscCodeList, function (indexIfsc, valueIfsc) {
					if (valueIfsc.ifscCode == selectedValue) {
						$.each(valueIfsc.accountNo, function (indexAcc, valueAcc) {
							accDrop.append('<option value="' + valueAcc + '">' + valueAcc + '</option>');
						});
					}
				})
			}
		});
	}
});

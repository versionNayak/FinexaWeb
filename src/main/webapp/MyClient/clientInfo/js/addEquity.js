var pageMode = sessionStorage.getItem("PAGE_MODE");		
var assetTypeID="";
var serviceurl="";
var selectedEquityID= "";
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}

var prevStartDate="";

var months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
var client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
var client_lexp = moment(client_dob).add(months, 'months').toDate();
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");

$(document).ready(function () {
	
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				$("#idSaveEquity").show();
				$("#undo").show();
			}else if(loggedClient.clientInfoView === "Y"){
				$("#idSaveEquity").hide();
				$("#undo").hide();
			}
		}else if(loggedUser != null && loggedUser.role === "Admin"){
			$("#idSaveEquity").hide();
			$("#undo").hide();
		}else{
			if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
				$("#idSaveEquity").show();
				$("#undo").show();
			}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
				$("#idSaveEquity").hide();
				$("#undo").hide();
			}
		}
	
	if (pageMode=="ADD")
		$('#idRadioStart').show();
	
	$('#SN').hide();	
		
		$(function(){
			$('input[type="radio"]').click(function(){
	    		$('#idRadioStart').hide();			
		    	$('#MainDiv').show();
				$('#idButton').show();
				    
				if ($("#idFinancialAssetTypeDE").is(':checked')) {  
					$(".dashboardheading").html("Add Stock");									
					assetTypeID="15";
					showDEForm();
				 } 
				else if ($("#idFinancialAssetTypeIE").is(':checked')){
					$(".dashboardheading").html("Add International Equity");
					assetTypeID="16";				
					showIEForm();
				} 
				else if ($("#idFinancialAssetTypeESOP").is(':checked')){
					$(".dashboardheading").html("Add ESOP");
					assetTypeID="17";				
					showESOPForm();	 
				}
				     
				$("#idListedFlag").focus();	
			});
		});
	
	//Initialize Form
	initializeForm();
	
	$( "#idSecurityNameList" ).change(function() {
		$("#idISIN").val($(this).val());
	});
	
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	//Edit functionality
	if (pageMode=="EDIT") {		
		$('#idRadioStart').hide();
	    $('#MainDiv').show();
		$('#FA').show();
		$('#idButton').show();
		getSelectedEquity();
	}
		
	$('#focusguard-2').on('focus', function() {
		  // "last" focus guard got focus: set focus to the first field
		$("#idListedFlag").focus();	
		$(window).scrollTop(0);
	});
	

	
	
});

function displayListedUnlistedDiv(){
	var lSecurityListed = document.getElementById("idListedFlag");
	var lSecurityListedSelected = lSecurityListed.options[lSecurityListed.selectedIndex].value; 

	if (lSecurityListedSelected == "Y") {
		$('#SND').show();
		$('#SN').hide();
	} 
	else {
		if (lSecurityListedSelected == "N") {
			$('#SND').hide();
			$('#SN').show();
			$('#idISIN').val("");
		  }		
	} 
}

//to show Direct Equity form
function showDEForm() {
	$('#FA').show();
	$('#WHL').show();
	$('#SN').hide();
	$('#SND').show();
	$('#SI').show();
	$('#NOS').show();
	$('#AI').show();
	$('#CMV').show();
	$('#DOP').show();
	$('#VD').hide();
}

//to show International Equity form
function showIEForm() {
	$('#FA').show();
	$('#SND').hide();
	$('#SN').show();
	$('#NOS').show();
	$('#AI').show();
	$('#CMV').show();
	$('#DOP').show();
	$('#WHL').hide();
	$('#VD').hide();
}

//to show ESOP form
function showESOPForm() {
	$('#FA').show();
	$('#WHL').show();
	$('#SN').hide();
	$('#SND').show();
	$('#SI').show();
	$('#NOS').show();
	$('#AI').show();
	$('#CMV').show();
	$('#DOP').show();
	$('#VD').show();
}

function initializeForm() {
	$('#FA').hide();
	$('#WHL').hide();
	$('#SN').hide();
	$('#SND').hide();
	$('#SI').hide();
	$('#NOS').hide();
	$('#AI').hide();
	$('#CMV').hide();
	$('#DOP').hide();
	$('#VD').hide();
	$('#idButton').hide();
	
	var options =  {
		      onComplete: function(cep) {        
		         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
		         //window.ln_start_dt_isvalid = isDateBetwenRange(window.clientDOB, new Date() ,window.given_start_date);
		      },
		      onKeyPress: function(cep, event, currentField, options){},
		      onChange: function(cep){},
		      onInvalid: function(val, e, f, invalid, options){}
		    };  
	
	$('#idPurchaseDate').mask('00/00/0000',options);
	
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$("#idPurchaseDate").datepicker('remove'); 
	$("#idPurchaseDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false,		
		startDate : window.client_dob,
		endDate: new Date()
	}).on('changeDate', function(ev){
		if ($(this).val() != "") {
			if ($("input:radio[name=financialAssetType]:checked").val() == 15) {
				
				if (!checkValidDate($(this).val())) {
					$("#alertpurchaseDate").css('color','red');
					$("#alertpurchaseDate").text("Date is invalid!");
					$("#idPurchaseDateGroup").css('border','2px solid red');
					$("#idSaveEquity").prop("disabled", true);
				} else {
					$("#alertpurchaseDate").css('color','');
					$("#alertpurchaseDate").text("");
					$("#idPurchaseDateGroup").css('border','');
					$("#idSaveEquity").prop("disabled", false);
					if ($("#idListedFlag").val() == "Y") {
						if ($("#idISIN").val() != "" && $("#idQuantity").val() != "") {
							unmaskAmount('#idInvestmentAmount');
							unmaskAmount('#idCurrentMarketValue');
							var data = JSON.stringify($('#formClientEquity').serializeToJSON());
							getClientData("POST", data,"getClosingPriceESOP", onCalculateSuccess);
							function onCalculateSuccess(data) {
								//alert("current market value: " + data.currentMarketValue);
								$('#idCurrentMarketValue').val(data.currentMarketValue);
								maskAmount('#idInvestmentAmount');
								maskAmount('#idCurrentMarketValue');
							} 
						} 
					}
				}
			
			} else {
				if ($("input:radio[name=financialAssetType]:checked").val() == 17) {
					
					if (!checkValidDate($(this).val())) {
						$("#alertpurchaseDate").css('color','red');
						$("#alertpurchaseDate").text("Date is invalid!");
						$("#idPurchaseDateGroup").css('border','2px solid red');
						$("#idSaveEquity").prop("disabled", true);
					} else {
						$("#alertpurchaseDate").css('color','');
						$("#alertpurchaseDate").text("");
						$("#idPurchaseDateGroup").css('border','');
						$("#idSaveEquity").prop("disabled", false);
						if ($("#idListedFlag").val() == "Y") {
							unmaskAmount('#idCurrentMarketValue');
							if ($("#idISIN").val() != "" && $("#idQuantity").val() != "") {
								unmaskAmount('#idInvestmentAmount');
								unmaskAmount('#idCurrentMarketValue');
								var data = JSON.stringify($('#formClientEquity').serializeToJSON());
								getClientData("POST", data,"getClosingPriceESOP", onGetClosingPriceSuccess);
								function onGetClosingPriceSuccess(data) {
									if (data.currentMarketValue != null) {
										$('#idCurrentMarketValue').val(data.currentMarketValue);
									} else {
										$("#alertcurrentMarketValue").css('color','red');
										$("#alertcurrentMarketValue").text(data.errorMessage);
										$("#idCurrentMarketValue").css('border','2px solid red');	
									}
									
									maskAmount('#idCurrentMarketValue');
								}
							}
						}
					}
				}
			}
		}else{
				$("#alertpurchaseDate").css('color','');
				$("#alertpurchaseDate").text("");
				$("#idPurchaseDateGroup").css('border','');
				$("#idSaveEquity").prop("disabled", false);
			}
			
			maskAllAmountFields();
	});
	
	$('#idEsopVestingDate').mask('00/00/0000',options);
	$("#idEsopVestingDate").datepicker('remove'); 
	$("#idEsopVestingDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false,
		//startDate : window.client_dob,
		startDate: new Date(),
		endDate : window.client_lexp
	}).on('changeDate', function(ev){
		$("#alertvestingDate").css('color','');
		$("#alertvestingDate").text("");
		$("#idEsopVestingDateGroup").css('border','');
		$("#idSaveEquity").prop("disabled", false);
	});
	
	selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	populateFamilyMemberByClientId(selectedClientId,$("#familyMemberImage"));
	populateSecurityNameList($("#idSecurityNameList"));
	
	$("#idPurchaseDate").blur(function(){
		unmaskAllAmountFields();
		if ($(this).val() != "") {
			if ($("input:radio[name=financialAssetType]:checked").val() == 15) {
				
				if (!checkValidDate($(this).val())) {
					$("#alertpurchaseDate").css('color','red');
					$("#alertpurchaseDate").text("Date is invalid!");
					$("#idPurchaseDateGroup").css('border','2px solid red');
					$("#idSaveEquity").prop("disabled", true);
				} else {
					$("#alertpurchaseDate").css('color','');
					$("#alertpurchaseDate").text("");
					$("#idPurchaseDateGroup").css('border','');
					$("#idSaveEquity").prop("disabled", false);
					if ($("#idListedFlag").val() == "Y") {
						if ($("#idISIN").val() != "" && $("#idInvestmentAmount").val() != "" && $("#idQuantity").val() != "") {
							unmaskAmount('#idInvestmentAmount');
							unmaskAmount('#idCurrentMarketValue');
							var data = JSON.stringify($('#formClientEquity').serializeToJSON());
							//alert("" +data);
							getClientData("POST", data,"getClosingPriceESOP", onCalculateSuccess);
							function onCalculateSuccess(data) {
								//alert("current market value: " + data.currentMarketValue);
								$('#idCurrentMarketValue').val(data.currentMarketValue);
								maskAmount('#idInvestmentAmount');
								maskAmount('#idCurrentMarketValue');
							} 
						} 
					}
				}
			
			} else {
				if ($("input:radio[name=financialAssetType]:checked").val() == 17) {
					
					if (!checkValidDate($(this).val())) {
						$("#alertpurchaseDate").css('color','red');
						$("#alertpurchaseDate").text("Date is invalid!");
						$("#idPurchaseDateGroup").css('border','2px solid red');
						$("#idSaveEquity").prop("disabled", true);
					} else {
						$("#alertpurchaseDate").css('color','');
						$("#alertpurchaseDate").text("");
						$("#idPurchaseDateGroup").css('border','');
						$("#idSaveEquity").prop("disabled", false);
						if ($("#idListedFlag").val() == "Y") {
							unmaskAmount('#idCurrentMarketValue');
							if ($("#idISIN").val() != "" && $("#idQuantity").val() != "") {
								unmaskAmount('#idInvestmentAmount');
								unmaskAmount('#idCurrentMarketValue');
								var data = JSON.stringify($('#formClientEquity').serializeToJSON());
								getClientData("POST", data,"getClosingPriceESOP", onGetClosingPriceSuccess);
								function onGetClosingPriceSuccess(data) {
									if (data.currentMarketValue != null) {
										$('#idCurrentMarketValue').val(data.currentMarketValue);
									} else {
										$("#alertcurrentMarketValue").css('color','red');
										$("#alertcurrentMarketValue").text(data.errorMessage);
										$("#idCurrentMarketValue").css('border','2px solid red');	
									}
									maskAmount('#idInvestmentAmount');
									maskAmount('#idCurrentMarketValue');
								}
							}
						}
					}
				}
			}
		} else {
			$("#alertpurchaseDate").css('color','');
			$("#alertpurchaseDate").text("");
			$("#idPurchaseDateGroup").css('border','');
			$("#idSaveEquity").prop("disabled", false);
		}
		
		maskAllAmountFields();
	});

	$("#idQuantity").change(function(event) {
		unmaskAllAmountFields();
		if ($("input:radio[name=financialAssetType]:checked").val() == 15) {
			if ($("#idPurchaseDate").val() != "" && $("#idInvestmentAmount").val() != "" && $("#idISIN").val() != "") {
				if ($("#idListedFlag").val() == "Y") {
					unmaskAmount('#idInvestmentAmount');
					unmaskAmount('#idCurrentMarketValue');
					var data = JSON.stringify($('#formClientEquity').serializeToJSON());
					getClientData("POST", data,"getClosingPriceESOP", onCalculateSuccess);
					function onCalculateSuccess(data) {
						//alert("current market value: " + data.currentMarketValue);
						$('#idCurrentMarketValue').val(data.currentMarketValue);
						maskAmount('#idInvestmentAmount');
						maskAmount('#idCurrentMarketValue');
					} 
				}
				
			}
		} else {
			if ($("input:radio[name=financialAssetType]:checked").val() == 17) {
				if ($("#idISIN").val() != "" && $("#idPurchaseDate").val() != "") {
					if ($("#idListedFlag").val() == "Y") {
						unmaskAmount('#idCurrentMarketValue');
						var data = JSON.stringify($('#formClientEquity').serializeToJSON());
						getClientData("POST", data,"getClosingPriceESOP", onGetClosingPriceSuccess);
						function onGetClosingPriceSuccess(data) {
							if (data.currentMarketValue != null) {
								$('#idCurrentMarketValue').val(data.currentMarketValue);
							} else {
								$("#alertcurrentMarketValue").css('color','red');
								$("#alertcurrentMarketValue").text(data.errorMessage);
								$("#idCurrentMarketValue").css('border','2px solid red');	
							}
							
							maskAmount('#idCurrentMarketValue');
						}
					}
				}
			}
		}
		maskAllAmountFields();
	});

	$("#idInvestmentAmount").change(function(event) {
		unmaskAllAmountFields();
		  if ($("#idPurchaseDate").val() != "" && $("#idQuantity").val() != "") {
			  if ($("input:radio[name=financialAssetType]:checked").val() == 15) {
				if ($("#idListedFlag").val() == "Y") {
					unmaskAmount('#idInvestmentAmount');
					unmaskAmount('#idCurrentMarketValue');
					var data = JSON.stringify($('#formClientEquity').serializeToJSON());
					//alert("data"+data);
					getClientData("POST", data,"getClosingPriceESOP", onCalculateSuccess);
					function onCalculateSuccess(data) {
						//alert("current market value: " + data.currentMarketValue);
						$('#idCurrentMarketValue').val(data.currentMarketValue);
						maskAmount('#idInvestmentAmount');
						maskAmount('#idCurrentMarketValue');
					} 
				}
				
			}
		}
		maskAllAmountFields();
	});
	
	$("#idEsopVestingDate").blur(function() {
		
		if ($(this).val() != "") {
			if (!checkValidDate($(this).val())) {
				$("#alertvestingDate").css('color','red');
				$("#alertvestingDate").text("Date is invalid!");
				$("#idEsopVestingDateGroup").css('border','2px solid red');
				$("#idSaveEquity").prop("disabled", true);
			} else {
				$("#alertvestingDate").css('color','');
				$("#alertvestingDate").text("");
				$("#idEsopVestingDateGroup").css('border','');
				$("#idSaveEquity").prop("disabled", false);
			}
		} else {
			$("#alertvestingDate").css('color','');
			$("#alertvestingDate").text("");
			$("#idEsopVestingDateGroup").css('border','');
			$("#idSaveEquity").prop("disabled", false);
		}		
		
		
	});
	
	
}

function getSelectedEquity() {
	selectedEquityID = sessionStorage.getItem("SELECTED_EQUITY_ID");		
	//getClientDataWithErrorHandling("GET", "", "clientEquity/" + selectedEquityID, onGetEquityDataSuccess, onGetEquityDataError);
	getClientData("GET", "", "clientEquity/" + selectedEquityID, onGetEquityDataSuccess);
	//alert('editEquity In EDIT');  	
	function onGetEquityDataSuccess(data) {
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberId)
		poupulateFamilyMemberImage(data.familyMemberId);
		populateForm($('#formClientEquity'), data);	
		assetTypeID = data.financialAssetType;
		maskAllAmountFields();
		
		$("#idListedFlag option").filter(function() {
			return this.value==data.listedFlag;  
		}).prop('selected', true);
		
		switch (assetTypeID) {
			case 15:
				if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
					$(".dashboardheading").html("Edit Stock");
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View Stock Details");
				}
				$("#idFinancialAssetTypeDE").prop("checked",true);
				showDEForm();
				myDatepicker();
				if(data.listedFlag=="Y"){						 
					$('#SN').hide();
					$('#SND').show(); 					
					//alert('ISIN: '+$("#idISIN").val());						
					$("#idSecurityNameList option").filter(function() {
							return this.value==$("#idISIN").val();
					}).prop('selected', true);						    						
				}
				else if(data.listedFlag=="N"){
					$('#SN').show();
					$('#SND').hide();
				}
				break;
			case 16:
				if((loggedUser.clientInfoAddEdit === "Y") || (loggedClient.clientInfoAddEdit === "Y")){
					$(".dashboardheading").html("Edit International Equity");
				}else if((loggedUser.clientInfoView === "Y") || (loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View International Equity Details");
				}
				$("#idFinancialAssetTypeIE").prop("checked",true);
				showIEForm();
				myDatepicker();
				break;
			case 17:
				if((loggedUser.clientInfoAddEdit === "Y") || (loggedClient.clientInfoAddEdit === "Y")){
					$(".dashboardheading").html("Edit ESOP");
				}else if((loggedUser.clientInfoView === "Y") || (loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View ESOP Details");
				}
				$("#idFinancialAssetTypeESOP").prop("checked",true);
				showESOPForm();
				myDatepicker();
			    if(data.listedFlag=="Y"){
					$('#SN').hide();
					$('#SND').show(); 
					$("#idSecurityNameList option").filter(function() {
						return this.value==$("#idISIN").val();
					}).prop('selected', true);
			    }
			    else if (data.listedFlag=="N") {
					$('#SN').show();
					$('#SND').hide();
				}
				break;
		}
	}
	
}

function myDatepicker() {
	$("#idPurchaseDate").datepicker('remove');
	if (pageMode=="EDIT") {
		$("#idPurchaseDate").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: false,
				todayBtn: true,
				autoclose: true,
				forceParse: false,		
				startDate : window.client_dob,
				endDate: new Date()
			}).on('changeDate', function(ev){
				$("#alertpurchaseDate").css('color','');
				$("#alertpurchaseDate").text("");
				$("#idPurchaseDateGroup").css('border','');
				$("#idSaveEquity").prop("disabled", false);
			});
		
		$("#idEsopVestingDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: false,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			//startDate : window.client_dob,
			startDate: new Date(),
			endDate : window.client_lexp
		}).on('changeDate', function(ev){
			$("#alertvestingDate").css('color','');
			$("#alertvestingDate").text("");
			$("#idEsopVestingDateGroup").css('border','');
			$("#idSaveEquity").prop("disabled", false);
		});
		
	} else {
		$("#idPurchaseDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,		
			startDate : window.client_dob,
			endDate: new Date()
		}).on('changeDate', function(ev){
			$("#alertpurchaseDate").css('color','');
			$("#alertpurchaseDate").text("");
			$("#idPurchaseDateGroup").css('border','');
			$("#idSaveEquity").prop("disabled", false);
		});
		
		$("#idEsopVestingDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			//startDate : window.client_dob,
			startDate: new Date(),
			endDate : window.client_lexp
		}).on('changeDate', function(ev){
			$("#alertvestingDate").css('color','');
			$("#alertvestingDate").text("");
			$("#idEsopVestingDateGroup").css('border','');
			$("#idSaveEquity").prop("disabled", false);
		});
	}
}

function maskAllAmountFields() {
	maskAmount('#idInvestmentAmount');
	maskAmount('#idCurrentMarketValue');
}

function unmaskAllAmountFields() {
	unmaskAmount('#idInvestmentAmount');
	unmaskAmount('#idCurrentMarketValue');
}

function saveEquity() {
	console.log("In Equity Save function");
	unmaskAllAmountFields();			
	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	var validate;
	//alert("lifeExpectancy" +client_lexp);
	validate = validateEquity($('#formClientEquity'));
	if (validate) {
		showLoaderOnSave("#idSaveEquity");
		//$(this).addClass('active');
		window.setTimeout(function(){
            // do whatever you want to do 
		console.log('Equity Successfully Validated');
		if (typeof selectedImageFamilyMemberid != 'undefined' && selectedImageFamilyMemberid!=null) {
			var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");			
			var formData = $('#formClientEquity').serializeToJSON();
			formData["clientID"] = selectedClientId;
			formData["familyMemberId"]=selectedImageFamilyMemberid;
			
			if ($("#idFinancialAssetTypeIE").is(':checked')){
				formData["listedFlag"] = "N";
			}
			
			if (pageMode=="EDIT") {	
				formData["id"] = selectedEquityID;	
				var data = JSON.stringify(formData);
					// console.log(data);
				//getClientDataWithErrorHandling("POST", data, "editClientEquity", onSaveEquitySuccess, onSaveEquityError);						
				saveData("POST", data, "editClientEquity", onSaveEquitySuccess);
			} else {
				var data = JSON.stringify(formData);
				console.log(data);
				//getClientDataWithErrorHandling("POST", data, "createClientEquity", onSaveEquitySuccess, onSaveEquityError);
				saveData("POST", data, "createClientEquity", onSaveEquitySuccess);
			}	
			function onSaveEquitySuccess(data) {
				console.log('Equity Saved Successfully');
				//$(this).removeClass('active');
				//$("body").css("cursor", "default");
				hideLoaderOnSave("#idSaveEquity");
				serviceurl = "clientEquity/client/" +selectedClientId;
		    	getClientData("GET", "", serviceurl, onSuccess);
		    	function onSuccess(data) {
			    	//console.log("Saved Equity id = " + data.id);
			    	sessionStorage.setItem("EQUITY_LIST", JSON.stringify(data));
			    	$("#idClient").empty();
			    	$("#idClient").load("clientInfo/viewEquity.html");
			    	$(".dashboardheading    ").html("");
			    	$(".dashboardheading    ").html("Direct Equity");
			    	$("#addRecord").removeClass('btn_Disabled');
			    	$('#editRecord').addClass('btn_Disabled');
			    	$('#deleteRecord').addClass('btn_Disabled');
		    	}
			}
			
			/*function onSaveEquityError(err) {
				$("#alertform").text("Error saving Equity information. Please try after sometime or contact system administrator.");
				$(window).scrollTop(0);
				hideLoaderOnSave("#idSaveEquity");
				//return false;				
			}*/
		}
		else {				
			alert("Please select a Family Member");
			//return false;
		}
        }, 5000);	
		//hideLoaderOnSave("#idSaveEquity");
		//$(this).removeClass('active');
	}
	else {		
		$(window).scrollTop(0);
		return false;
	}			
}

$("#undo").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});

function undoChange()
{
	
	updatedUNDO();
	
	if (pageMode=="ADD"){
		$(".form-control").val("");
		
		var equityAssetTypeId = $("input:radio[name=financialAssetType]:checked").val();
		
		if (equityAssetTypeId == 15 || equityAssetTypeId == 17) {
			$("#idListedFlag").val("Y");
			$("#SND").show();
			$("#SN").hide();
		}
		
	} else {
		if (pageMode=="EDIT"){
			getSelectedEquity();
		}
	}
}

function updatedUNDO(){
	var lShares = document.getElementById("idQuantity");
	var lCurrentMarketValue = document.getElementById("idCurrentMarketValue");
	var lPurchaseDate = document.getElementById("idPurchaseDate");
	var lPurchaseDateGroup = document.getElementById("idPurchaseDateGroup");
	
	document.getElementById('alertshares').innerHTML = "";
	document.getElementById('alertcurrentMarketValue').innerHTML = "";
	document.getElementById('alertpurchaseDate').innerHTML = "";
	
	lShares.style.border = "";
	lCurrentMarketValue.style.border = "";
	lPurchaseDate.style.border = "";
	lPurchaseDateGroup.style.border = "";
	
	var financialAssetTypeId = $("input[name='financialAssetType']:checked").val();
	//alert("financialAssetTypeId: " + financialAssetTypeId);
	
	if (financialAssetTypeId == 15 || financialAssetTypeId == 17) {
		var lAmountInvested = document.getElementById("idInvestmentAmount");
		document.getElementById('alertinvestmentAmount').innerHTML = "";
		lAmountInvested.style.border = "";
		var lSecurityListed = document.getElementById("idListedFlag").value;
		if (lSecurityListed == 'N') {
			var lSecurityName = document.getElementById("idUnlistedStockName");
		} else {
			if (lSecurityListed == 'Y') {
				var lSecurityName = document.getElementById("idSecurityNameList");
			}
		}
	} else {
		if (financialAssetTypeId == 16) {
			var lSecurityName = document.getElementById("idUnlistedStockName");
		}
	}
	
	document.getElementById('alertsecurityName').innerHTML = "";
	document.getElementById('alertsecurityNameDropdown').innerHTML = "";
	lSecurityName.style.border = "";
	
	if (financialAssetTypeId == 16) {
		var lAmountInvested = document.getElementById("idInvestmentAmount");
		document.getElementById('alertinvestmentAmount').innerHTML = "";
		lAmountInvested.style.border = "";
	}
	

	
	if (financialAssetTypeId == 17) {
		var lVestingDate = document.getElementById("idEsopVestingDate");
		var lVestingDateGroup = document.getElementById("idEsopVestingDateGroup");
		// lVestingDate.style.border = "1px solid #ccc";
		lVestingDateGroup.style.border = "";
		lVestingDateGroup.style.borderRadius = "";
		document.getElementById('alertvestingDate').innerHTML = "";
	}
	
	document.getElementById('alertform').innerHTML="";
}


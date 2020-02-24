var arr=[];
var pageMode = sessionStorage.getItem("PAGE_MODE");
var heading;
var heading_prefix;
var financialAssetType;
//alert(financialAssetType);
var pBondType;
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
	var	selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	

function calculateNextDate() {
	startdate = $('#idDepositStartDate').val();
	if (startdate != '') {
		if($('#idBondType').val() == 2){
			$('#idDepositMaturityDate').val('');
		}else{
			var year = ($('#idDepositTenureyr').val() != '') ? $(
					'#idDepositTenureyr').val() : 0;
					//alert("year in function: " + year);
			var month = ($('#idDepositTenuremn').val() != '') ? $(
					'#idDepositTenuremn').val() : 0;
					//alert("month in function: " + month);
			month = parseInt(month) + parseInt(yearToMonth(year));
			//alert("month after addition: " + month);
			
			var new_date = moment(startdate, "DD/MM/YYYY").add(month, 'months')
					.format('DD/MM/YYYY');
			//alert("new_date: " + new_date);
			/*if (pageMode != "EDIT")
			{
				$('#idDepositMaturityDate').val(new_date);
			}*/
			
			$('#idDepositMaturityDate').val(new_date);

			var start_momment_date = moment(startdate, "DD/MM/YYYY");
			//alert("start_momment_date: " + start_momment_date);
			var end_momment_date = moment(new_date, "DD/MM/YYYY");
			//alert("end_momment_date: " + end_momment_date);
			console.log(start_momment_date + "  " + end_momment_date);
			
			//alert("tenure: " + end_momment_date.diff(start_momment_date, 'days'));
			/*if (pageMode != "EDIT")
			{
				
			}*/
			
			$('#idDepositTenure').val(
					end_momment_date.diff(start_momment_date, 'days'));
			
		}		
	}
}

function yearToMonth(al_year) {
	return al_year * 12;
}

var user_dt;
var client_dob;
var client_lexp;
var months;

//alert("selected_client_dob: " + sessionStorage.getItem("SELECTED_CLIENT_DOB"));

months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
client_lexp = moment(client_dob).add(months, 'months').toDate();
function showFixedDeposit(heading_prefix,heading){
	// alert($("#idFundTypeMF").val());
	$('#MainDiv').show();
	$('#idRadioStart').hide();
	
	$(".dashboardheading").html(heading_prefix + heading);

	$('#memberDiv').show();
	
	$('#BankLabel').show();
	$('#IssuerLabel').hide();
	$('#bankNameDiv').show();
	$('#depositTypeDiv').show();

	$('#InvestmentDate').hide();
	$('#DepositDate').show();
	$('#investmentDepositDateDiv').show();

	$('#DepositAmountlabel').show();
	$('#RecurringAmountlabel').hide();
	$('#InvestmentAmountlabel').hide();
	$('#amountDiv').show();

	$('#InterestRatelabel').show();
	$('#CouponRatelabel').hide();
	$('#InterestRateDiv').show();

	$('#InvestmentAmountlabel').hide();
	$('#InterestRateDiv').show();
	$('#compoundingFrequencyDiv').show();
	$('#tenureYearsDaysDiv').show();
	$('#idD').show();
	$('#idM').hide();

	$('#tenureDayslabel').hide();
	$('#tenure').show();
	$('#tenurelabel').hide();
	$('#tenureDiv').show();

	$('#PayoutFrequencylabel').show();
	$('#CouponPayoutFrequencylabel').hide();
	$('#payoutFrequencyDiv').show();
	
	$('#maturityDateDiv').show();
	$('#RecurringDepositAmountDiv').hide();
	$('#bondPurchasedDiv').hide();
	$('#bondFaceValuediv').hide();
	$('#bondTypeDiv').hide();
	$('#CouponInterestRateDiv').hide();
	$('#bondCurrentYieldDiv').hide();
	$('#DepositFrequencyDiv').hide();

	$('#idButton').show();
	$("#idName").focus();	
}

function showRecurringDeposit(heading_prefix,heading){
	$('#MainDiv').show();
	// alert($("#idFundTypeETF").val());
	$('#idRadioStart').hide();
	$(".dashboardheading").html(heading_prefix + heading);
	$('#memberDiv').show();
	$('#BankLabel').show();
	$('#IssuerLabel').hide();
	$('#bankNameDiv').show();

	$('#InvestmentDate').hide();
	$('#DepositDate').show();
	$('#investmentDepositDateDiv').show();

	$('#DepositAmountlabel').hide();
	$('#RecurringAmountlabel').show();
	$('#InvestmentAmountlabel').hide();
	$('#amountDiv').show();

	$('#DepositFrequencyDiv').show();
	$('#payoutFrequencyDiv').hide();

	$('#InterestRatelabel').show();
	$('#CouponRatelabel').hide();
	$('#InterestRateDiv').show();

	//$('#tenureYearsDaysDiv').show();
	
	$('#idD').hide();
	$('#idM').show();

	$('#tenureDayslabel').hide();
	$('#tenure').hide();
	$('#tenurelabel').show();
	$('#tenureDiv').show();
	//sumit
	
	if (pageMode == "EDIT") {
		var tot_days = parseInt($('#idDepositTenure').val());
		
		var start_momment_date = moment($('#idDepositStartDate').val(),"DD/MM/YYYY");
		
		var end_momment_date = moment($('#idDepositMaturityDate').val(),"DD/MM/YYYY");
	
		var years = end_momment_date.diff(start_momment_date, 'year');
		
		start_momment_date.add(years, 'years');

		var months = end_momment_date.diff(start_momment_date, 'months');
	
		start_momment_date.add(months, 'months');

		/*var years = end_momment_date.diff(parseInt(start_momment_date), 'year');
		start_momment_date.add(years, 'years');
		var months = end_momment_date.diff(parseInt(start_momment_date), 'months');
		start_momment_date.add(months, 'months');*/
		
//		console.log("diff"+diffDuration+years+"  "+months);
		$('#idDepositTenuremn').val((months == '' || parseInt(months) == 0)? '' : parseInt(months)).removeClass("hidden");
		$('#idDepositTenureyr').val((years == '' || parseInt(years) == 0)? '' : parseInt(years)).removeClass("hidden");
	}
	
	$('#tenureYearsDaysDiv').hide();
	//.show();
	$('#idTenureTypeDays').prop("checked",true);
	$('#idDepositTenure').hide();
		
	
	
	$('#idDepositTenuremn').removeClass("hidden");
	$('#idDepositTenureyr').removeClass("hidden");
	$('.yr_mn_inp_div').removeClass("hidden");
	//sumit
	

	$('#compoundingFrequencyDiv')
			.show();
	$('#maturityDateDiv').show();

	$('#depositTypeDiv').hide();

	$('#payoutFrequencyDiv').hide();
	$('#bondPurchasedDiv').hide();
	$('#bondFaceValuediv').hide();
	$('#bondTypeDiv').hide();

	$('#bondCurrentYieldDiv').hide();

	$('#idButton').show();
	$("#idName").focus();
} 

function showBondsDebentures(heading_prefix,heading){
	/*if (pageMode == "EDIT") {
		
		$("#idDepositTenure").prop("disabled",true);
	}*/
	// alert($("#idFundTypePMS").val());
	$('#MainDiv').show();
	// alert($("#idFundTypePMS").val());
	$('#idRadioStart').hide();
	$(".dashboardheading").html(heading_prefix + heading);

	$('#memberDiv').show();
	$('#BankLabel').hide();
	$('#IssuerLabel').show();
	$('#bankNameDiv').show();

	$('#InvestmentDate').show();
	$('#DepositDate').hide();
	$('#investmentDepositDateDiv')
			.show();

	$('#DepositAmountlabel').hide();
	$('#RecurringAmountlabel').hide();
	$('#InvestmentAmountlabel').show();
	$('#amountDiv').show();

	$('#bondPurchasedDiv').show();
	$('#bondFaceValuediv').show();
	$('#bondTypeDiv').show();

	$('#InterestRateDiv').show();
	$('#InterestRatelabel').hide();
	$('#CouponRatelabel').show();

	$('#bondCurrentYieldDiv').show();
	$('#tenureYearsDaysDiv').show();
	$('#idD').show();
	$('#idM').hide();

	$('#tenureDayslabel').hide();
	$('#tenure').show();
	$('#tenurelabel').hide();
	$('#tenureDiv').show();

	$('#payoutFrequencyDiv').show();
	$('#CouponPayoutFrequencylabel')
			.show();
	$('#PayoutFrequencylabel').hide();

	$('#maturityDateDiv').show();

	$('#depositTypeDiv').hide();

	$('#compoundingFrequencyDiv')
			.hide();

	$('#DepositFrequencyDiv').hide();

	$('#idButton').show();

	$("#idBondType").change(function(event) {
		// alert('Bond
		// Type
		// '+pBondType);
		var pBondType = $('#idBondType').val();
		 //alert('Bond Type'+pBondType);
		if (pBondType == 1) {
			// $("#idInterestRate").val("");
			//alert("pBondType: " + pBondType);
			$('#newTenureDiv').show();
			$('#tenureDiv').show();
			$('#tenure').val('');
			$("#idDepositTenure").val('');
			$('#tenureYearsDaysDiv').show();
			$("#idInterestRate").attr("disabled",true);
			// $("#idInterestPayoutFrequency").val("0");
			$("#idInterestPayoutFrequency").prop("disabled",true);
			
			$('#idCompoundingFrequency').prop("disabled",false);
			$('#compoundingFrequencyDiv').show();
			$('#idCompoundingFrequency').val(1);

		} else {
			//alert("pBondType: " + pBondType);
			$("#idInterestRate").prop("disabled",false);
			$("#idInterestPayoutFrequency").prop("disabled",false);
			$('#compoundingFrequencyDiv').hide();
			$('#idCompoundingFrequency').prop("disabled",true);
		}

		if (pBondType == 2) {
			//$("#idDepositMaturityDate").val()=0;
			$('#newTenureDiv').hide();
			$('#tenure').val(99);
			$("#idDepositTenure").val(99);
			$('#tenureYearsDaysDiv').hide();
			//$('#tenure').hide();
			$('#tenureDiv').hide();
			$('#maturityDateDiv').hide();
			$("#idDepositMaturityDate").prop("disabled",true).val('');
			$('#idCompoundingFrequency').prop("disabled",true);
		} else {
			$('#tenureYearsDaysDiv').show();
			$('#newTenureDiv').show();
			$('#tenureDiv').show();
			$('#tenure').val('');
			$("#idDepositTenure").val('');
			$('#maturityDateDiv').show();
			
			$(
					"#idDepositMaturityDate")
					.prop(
							"disabled",
							false);
			$('#idDepositStartDate').trigger('change');
		}
	});
	$("#idName").focus();	
}

function showCPCD(heading_prefix,heading){
	
	$('#MainDiv').show();
	$('#idRadioStart').hide();
	$(".dashboardheading").html(heading_prefix + heading);

	$('#memberDiv').show();
	$('#bankNameDiv').show();
	$('#BankLabel').hide();
	$('#IssuerLabel').show();
	$('#InvestmentDate').show();
	$('#DepositDate').hide();
	$('#investmentDepositDateDiv')
			.show();

	$('#DepositAmountlabel').hide();
	$('#RecurringAmountlabel').hide();
	$('#InvestmentAmountlabel').show();
	$('#amountDiv').show();

	$('#InterestRatelabel').show();
	$('#CouponRatelabel').hide();
	$('#InterestRateDiv').show();

	$('#tenureDayslabel').show();
	$('#tenure').hide();
	$('#tenureDiv').show();
	$('#tenurelabel').hide();
	$('#maturityDateDiv').show();

	$('#depositTypeDiv').hide();
	$('#compoundingFrequencyDiv').show();
	
	$('#tenureYearsDaysDiv').hide();
	$('#payoutFrequencyDiv').hide();
	$('#DepositFrequencyDiv').hide();

	$('#bondPurchasedDiv').hide();
	$('#bondFaceValuediv').hide();
	$('#bondTypeDiv').hide();

	$('#bondCurrentYieldDiv').hide();

	$('#idButton').show();
	
	
	
		
			/*$('#compoundingFrequencyDiv').show();
			$("#idCompoundingFrequency").val("4");*/

	$("#idName").focus();	
}

function save(serviceUrl) {
	showLoaderOnSave("#idAddFixedIncome");
	window.setTimeout(function(){
	console.log("rest service = " + serviceUrl);
	var selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	console.log("selectedClientId = " + selectedClientId);
	var formData = $('#idAddFixedIncomeForm').serializeToJSON();
	formData["clientID"] = selectedClientId;
	formData["familyMemberID"] = selectedImageFamilyMemberid;
	
	if (pageMode == "EDIT") {
		formData["id"] = sessionStorage.getItem("fixedIncome_ID");
	} else {
		formData["id"] = null;
	}
	
	var data = JSON.stringify(formData);
	if(data.financialAssetType==24){
		calcDebentures();
	}else{
		console.log("!calcDebentures();");
	}
	saveData("POST", data, serviceUrl, onSaveSuccess);
	
	function onSaveSuccess(data) {
		hideLoaderOnSave("#idAddFixedIncome");
		serviceurl = "clientFixedIncome/client/" + selectedClientId;
		getClientData("GET", "", serviceurl, onSuccess);
		function onSuccess(data) {
			
			sessionStorage.setItem("FIXED_INCOME_LIST", JSON
					.stringify(data));
			$("#idClient").empty();
			$("#idClient").load("clientInfo/viewFixedIncome.html");
			$(".dashboardheading").html("Deposit/Bonds");
			$("#wrapper").css("height", "auto");
			$(".form-section-container").css("height", "auto");
			$("#addRecord").removeClass('btn_Disabled');
			$('#editRecord').addClass('btn_Disabled');
			$('#deleteRecord').addClass('btn_Disabled');
		}
	}
	
/*	$.ajax({
		type : 'POST',
		async : false,
		url : serviceUrl,
		data : data,
		beforeSend : function(){
			showLoaderOnSave("#idAddFixedIncome");
		},
		dataType : 'json',
		contentType : 'application/json',
		success : function(data) {
			
			//window.setTimeout(function(){
			
				serviceurl = "clientFixedIncome/client/" + selectedClientId;
				getClientData("GET", "", serviceurl, onSuccess);
				function onSuccess(data) {
					
					sessionStorage.setItem("FIXED_INCOME_LIST", JSON
							.stringify(data));
					$("#idClient").empty();
					$("#idClient").load("clientInfo/viewFixedIncome.html");
					$(".dashboardheading").html("Deposit/Bonds");
					$("#wrapper").css("height", "auto");
					$(".form-section-container").css("height", "auto");
					$("#addRecord").removeClass('btn_Disabled');
					$('#editRecord').addClass('btn_Disabled');
					$('#deleteRecord').addClass('btn_Disabled');
					
					
				}
			
		},
		complete : function(data){
			hideLoaderOnSave("#idAddFixedIncome");
			//hideloader();
		},
		error : function(data) {
			$("#alertform").text("Error saving Fixed Income information. Please try after sometime or contact system administrator.");
			$(window).scrollTop(0);
			hideLoaderOnSave("#idAddFixedIncome");
			//hideloader();
		}
		});*/
	}, 5000);	
	
}

//sumit
/*$(document).ajaxSend(function () {
	loadloader();
});

$(document).ajaxComplete(function () {
	hideloader();
});
//sumit
*/
$(document).ready(function() {
	selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	populateFamilyMemberByClientId(selectedClientId, $("#familyMemberImage"));
	var options =  {
		      onComplete: function(cep) {        
		         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
		         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
		      },
		      onKeyPress: function(cep, event, currentField, options){},
		      onChange: function(cep){},
		      onInvalid: function(val, e, f, invalid, options){}
	    };
	    	    
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				$("#idAddFixedIncome").show();
				$("#undo").show();
			}else if(loggedClient.clientInfoView === "Y"){
				$("#idAddFixedIncome").hide();
				$("#undo").hide();
			}
		}else if(loggedUser != null && loggedUser.role === "Admin"){
			$("#idAddFixedIncome").hide();
			$("#undo").hide();
		}else{
			if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
				$("#idAddFixedIncome").show();
				$("#undo").show();
			}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
				$("#idAddFixedIncome").hide();
				$("#undo").hide();
			}
		}
	
    $('#idDepositStartDate').mask('00/00/0000',options);
	
	if (pageMode == "EDIT") {
		if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
			heading_prefix = 'Edit ';
		}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
			heading_prefix = 'View ';
		} 	
		
	} else {
		heading_prefix = 'Add ';
	}
	$('.numericOnly').keyup(function(e){
		  if (/\D/g.test(this.value)){
		    this.value = this.value.replace(/\D/g, '');
		  }
	});
	
	$("#idInterestRate").prop("disabled", false);// new
	$("#idDepositMaturityDate").prop("disabled", false); // new
	$("#idInterestPayoutFrequency").prop("disabled", false);// new
	$("#idCompoundingFrequency").prop("disabled", false);
	
		
	sessionStorage.setItem("CLIENT_SERVICE_URL", ClientServiceUrl);
	var uu = sessionStorage.getItem("CLIENT_SERVICE_URL");	
	var fixedIncomeType;  
	
	if (pageMode == "EDIT") {
		getSelectedFixedIncome();
	}else{
		$('#idRadioStart').show();
		$('input[type="radio"]').click(function() {
			$('#MainDiv').show();
			$('#idButtons').show();
			if ($("#idFixedDeposit").is(':checked')) { showFixedDeposit(heading_prefix,'Fixed Deposit'); }
			if ($("#idRecurringDeposit").is(':checked')) { showRecurringDeposit(heading_prefix,'Bank - Recurring Deposit'); }
			if ($("#idBondsDebentures").is(':checked')) { showBondsDebentures(heading_prefix,'Bonds/Debentures'); }
			if ($("#idCPCD").is(':checked')) { showCPCD(heading_prefix,'CP/CD'); }

			getClientData("GET", "", "AllFrequency", AllFrequencySuccess);
			
			function AllFrequencySuccess(data) {
				
				var la_filter_cpcd = [1,2,4,12];
				
				fhDrop = $("#idCompoundingFrequency");
				fhDrop.find('option').remove();
				fhDrop.append('<option value="">Select Compound Frequency</option>');
				
				if ($("#idRecurringDeposit").is(':checked')) {
					$.each(data, function(index, item) {
						if (item.id == 4) {
							fhDrop.append('<option value="'
											+ item.id
											+ '" selected>'
											+ item.description
											+ '</option>');
						} else {
							fhDrop.append('<option value="'
											+ item.id
											+ '">'
											+ item.description
											+ '</option>');
						}
					});
				}else if($("#idCPCD").is(':checked')){
					
					$.each(data, function(index, item) {
						if($.inArray(item.id, la_filter_cpcd) != -1){
							if (item.id == 4) {
								
								fhDrop.append('<option value="'
										+ item.id
										+ '" selected>'
										+ item.description
										+ '</option>');
							}else{
								fhDrop.append('<option value="'
										+ item.id
										+ '  ">'
										+ item.description
										+ '</option>');
							}
						}
					});
				}else{
					$.each(data, function(index, item) {
						fhDrop.append('<option value="'
								+ item.id
								+ '">'
								+ item.description
								+ '</option>');
					});
				}

				fhDrop = $("#idInterestPayoutFrequency");
				fhDrop.find('option').remove();
				fhDrop.append('<option value="">Select Interest Frequency</option>');

				$.each(data, function(index, item) {
					fhDrop.append('<option value="'
							+ item.id + '">'
							+ item.description
							+ '</option>');

				});

				fhDrop = $("#idDepositFrequency");
				fhDrop.find('option').remove();
				fhDrop.append('<option value="0">Select deposit Frequency</option>');
				$("#idFHouseETF").append(
						'<option value="0">Select '
								+ name
								+ '</option>');
				$.each(data,function(index,item) {
					if ($("#idRecurringDeposit").is(':checked')) {
						if (item.id == 12) {
							fhDrop
									.append('<option value="'
											+ item.id
											+ '" selected>'
											+ item.description
											+ '</option>');
						} else {
							fhDrop
									.append('<option value="'
											+ item.id
											+ '">'
											+ item.description
											+ '</option>');
						}
					} else {
						fhDrop
								.append('<option value="'
										+ item.id
										+ '">'
										+ item.description
										+ '</option>');
					}

				});
			}
		});
	}

	$('#idRadioStart').show();
	$('#memberDiv').hide();
	$('#bankNameDiv').hide();
	$('#investmentDepositDateDiv').hide();
	$('#amountDiv').hide();
	$('#InterestRateDiv').hide();
	$('#tenureDiv').hide();
	$('#maturityDateDiv').hide();
	$('#depositTypeDiv').hide();
	$('#compoundingFrequencyDiv').hide();
	$('#tenureYearsDaysDiv').hide();
	$('#payoutFrequencyDiv').hide();
	$('#DepositFrequencyDiv').hide();
	$('#RecurringDepositAmountDiv').hide();
	$('#recurringDepositFrequencyDiv').hide();
	$('#bondPurchasedDiv').hide();
	$('#bondFaceValuediv').hide();
	$('#bondTypeDiv').hide();
	$('#CouponInterestRateDiv').hide();
	$('#bondCurrentYieldDiv').hide();
	$('#couponPayoutFrequencyDiv').hide();

	$('#idButton').hide();
	
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	
	/*$("#idDepositStartDate").datepicker('remove'); 
	
	$("#idDepositStartDate").datepicker({
		format : "dd/mm/yyyy",
		todayHighlight : true,
		todayBtn : true,
		autoclose : true,
		forceParse: false,	
		startDate : window.client_dob,
		endDate : new Date()
	}).on('changeDate', function (ev) {
		$("#alertStartDate").css('color','');
		$("#alertStartDate").text("");
		$("#idDepositStartDateGroup").css('border','');
		$("#idAddFixedIncome").prop("disabled", false);
	});*/
	
	myDatePicker();
	
	$("#idDepositStartDate").blur(function() {
		
		if ($(this).val() != "") {
			if (!checkValidDate($(this).val())) {
				$("#alertStartDate").css('color','red');
				$("#alertStartDate").text("Date is invalid!");
				$("#idDepositStartDateGroup").css('border','2px solid red');
				$("#idAddFixedIncome").prop("disabled", true);
			} else {
				$("#alertStartDate").css('color','');
				$("#alertStartDate").text("");
				$("#idDepositStartDateGroup").css('border','');
				$("#idAddFixedIncome").prop("disabled", false);
			}
		} else {
			$("#alertStartDate").css('color','');
			$("#alertStartDate").text("");
			$("#idDepositStartDateGroup").css('border','');
			$("#idAddFixedIncome").prop("disabled", false);
		}
		
		
	});
	
	$(".datepicker-icon").on( "click", function() {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	/*selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");*/

	$("#idDepositStartDate").change(function(event) {
		// alert("change");
		var pDate = $('#idDepositStartDate').val();
		// alert("pDate "+pDate);
		var pYearsOrDays = $('#idDepositTenure').val();
		// alert("pYearsOrDays "+pYearsOrDays);

		if ($("#idCPCD").is(':checked')) {
			$('#idTenureTypeDays').prop('checked', true);
		}
		
		if ($("#idRecurringDeposit").is(':checked')) {
			calculateNextDate();
		}else{
			
			if (($('#idTenureTypeDays').is(':checked'))) {
				// alert("ssss");
				if($('#idBondType').val() != 2){
					$('#idDepositMaturityDate').val(addDaystoDate( pDate, pYearsOrDays,0, 0));
				}else{
					$('#idDepositMaturityDate').val('');
				}
				/*alert('Setting deposit maturity date '
						+ $(
								'#idDepositMaturityDate')
								.val());*/
			}
			
			if (($('#idTenureTypeYears')
					.is(':checked'))) {
				// alert("date ");
				if($('#idBondType').val() != 2){
					$('#idDepositMaturityDate').val(
							addDaystoDate(pDate, 0, 0,
									pYearsOrDays));	
				}else{
					$('#idDepositMaturityDate').val('');
				}	
				// alert('Setting deposit maturity
				// date
				// '+$('#idDepositMaturityDate').val());
			}
			
		}

	});

	

	getClientData("GET", "", "AllFixedDepositType", FixedDepositTypeSuccess);
	function FixedDepositTypeSuccess(data) {
		// console.log(data);
		fhDrop = $("#idDepositType");
		fhDrop.find('option').remove();
		fhDrop.append('<option value="">Select Deposit Type</option>');
		$("#idFHouseETF").append('<option value="0">Select ' + name + '</option>');
		$.each(data, function(index, item) {
			fhDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});
	}

	$("#idDepositType").change(function() {
		var compFreq = document.getElementById("idCompoundingFrequency");
		var payoutFreq = document.getElementById("idInterestPayoutFrequency");
		// console.log( "selected fundHouse
		// amfiCode = " + $(this).val() );
		var v = $(this).val();
		var text = $(this).find('option:selected').text();
		// alert("text "+text+" "+v);

		if (text === 'Cumulative') {
			console.log("dddd");
			
			if($("#idFixedDeposit").is(':checked') == true){
				$('#idCompoundingFrequency').val(4);
			}
			
			$("#idCompoundingFrequency").prop("disabled", false);
			$("#payoutFrequencyDiv").show();
			$("#PayoutFrequencylabel").hide();
			$("#idInterestPayoutFrequency").hide();
			document.getElementById('alertipf').innerHTML = "";
			payoutFreq.style.border = "1px solid #ccc";
		}
		if (text === 'Interest Payout') {
			// alert("dddd");
			$('#idCompoundingFrequency').val("");
			$("#payoutFrequencyDiv").show();
			$("#PayoutFrequencylabel").show();
			$("#idInterestPayoutFrequency").show();
			$("#idCompoundingFrequency").prop("disabled", true);
			document.getElementById('alertcf').innerHTML = "";
			compFreq.style.border = "1px solid #ccc";
		}
	});
	
	getClientData("GET", "", "AllMasterCash", AllMasterCashSuccess);
	function AllMasterCashSuccess(data) {
		// console.log(data);
		fhDrop = $("#idName");
		fhDrop.find('option').remove();
		fhDrop.append('<option value="">Select Issuer</option>');
		$.each(data, function(index, item) {
			fhDrop.append('<option value="' + item.id + '">'
					+ item.name + '</option>');
		});
	}

	getClientData("GET", "", "AllBondType", AllBondTypeSuccess);
	function AllBondTypeSuccess(data) {
		// console.log(data);
		fhDrop = $("#idBondType");
		fhDrop.find('option').remove();
		fhDrop
				.append('<option value="">Select Bond type</option>');
		$.each(data, function(index, item) {
			fhDrop.append('<option value="' + item.id + '">'
					+ item.description + '</option>');

		});
	}
	
	$("#idDepositTenure").keyup(
			function(event) {

				// alert("change");
				var pDate = $('#idDepositStartDate').val();
				// alert("pDate "+pDate);
				var pYearsOrDays = $('#idDepositTenure').val();
				// alert("pYearsOrDays "+pYearsOrDays);
				if ($("#idCPCD").is(':checked')) {
					$('#idTenureTypeDays')
							.prop('checked', true);
				}
				
				if ($("#idRecurringDeposit").is(':checked')) {
					calculateNextDate();
				}else{
					if (($('#idTenureTypeDays').is(':checked'))) {
						// alert("ssss");
						if($('#idBondType').val() != 2){
							$('#idDepositMaturityDate').val(
									addDaystoDate(pDate, pYearsOrDays,
											0, 0));
							// alert('Setting deposit maturity date
							// '+$('#idDepositMaturityDate').val());
						}else{
							$('#idDepositMaturityDate').val('');
						}
					}
					
					if (($('#idTenureTypeYears').is(':checked'))) {
						if($('#idBondType').val() != 2){
							// alert("date ");
							$('#idDepositMaturityDate').val(
									addDaystoDate(pDate, 0, 0,
											pYearsOrDays));
							// alert('Setting deposit maturity date
							// '+$('#idDepositMaturityDate').val());
						}else{
							$('#idDepositMaturityDate').val('');
						}
					}
					
					// alert("Month
					// "+($('#idTenureTypeMonths').is(':checked')));
					if (($('#idTenureTypeMonths').is(':checked'))) {
						if($('#idBondType').val() != 2){
							// alert("Month ");
							$('#idDepositMaturityDate').val(
									addDaystoDate(pDate, 0,
											pYearsOrDays, 0));
							// alert('Setting deposit maturity date
							// '+$('#idDepositMaturityDate').val());
						}else{
							$('#idDepositMaturityDate').val('');
						}
					}
				}

			}).keydown(function(event) {
		if (event.which == 13) {
			event.preventDefault();
		}
	});
	 var YMD="";
	 $('input:radio').change(function() {
	    //   alert('ole');
	        YMD=$("input[type='radio'][name='tenureYearsDays']:checked").val();
		//	alert("ymd "+YMD);
	        
	        if ($("#idRecurringDeposit").is(':checked')) {
	        	calculateNextDate();
	        }else{
	        	if(YMD=="Y"){
					var pDate = $('#idDepositStartDate').val();
					var pYearsOrDays = $('#idDepositTenure').val();
					if($('#idBondType').val() != 2){
						$('#idDepositMaturityDate').val(
								addDaystoDate(pDate, 0, 0,
										pYearsOrDays));
					}else{
						$('#idDepositMaturityDate').val('');
					}
				}
	            if(YMD=="M"){
	            	var pDate = $('#idDepositStartDate').val();
					var pYearsOrDays = $('#idDepositTenure').val();
					if($('#idBondType').val() != 2){
		            	$('#idDepositMaturityDate').val(
								addDaystoDate(pDate, 0,
										pYearsOrDays, 0));
					}else{
						$('#idDepositMaturityDate').val('');
					}
				}
	             if(YMD=="D"){
	            	 var pDate = $('#idDepositStartDate').val();
					var pYearsOrDays = $('#idDepositTenure').val();
					if($('#idBondType').val() != 2){
			        	 $('#idDepositMaturityDate').val(
									addDaystoDate(pDate, pYearsOrDays,
											0, 0));
					}else{
						$('#idDepositMaturityDate').val('');
					}
				}
	        }
	    });
	

	$('#focusguard-2').on('focus', function() {
		// "last" focus guard got focus: set focus to the first field
		$("#idName").focus();
		$(window).scrollTop(0);
	});
});

$("#idAddFixedIncome").on('click', function(e) {
	unmaskAllAmountFields();
	// e.preventDefault();
	var url = sessionStorage.getItem("CLIENT_SERVICE_URL")+'/createClientFixedIncome';
	console.log("url " + url);
	b = validate('#idAddFixedIncomeForm');
	// alert("b "+b);
	if (b) {
		// alert("save");
		if (pageMode == "ADD"){
			save('createClientFixedIncome');
		} else {
			save('editClientFixedIncome');
		}
		
	} else {
		// alert("ha ha ha");
	}
});
function maskAllAmountFields() {
	maskAmount('#idDepositAmount');
	maskAmount('#idBondValue');
}

function unmaskAllAmountFields() {
	unmaskAmount('#idDepositAmount');
	unmaskAmount('#idBondValue');
}

function myDatePicker() {
	$("#idDepositStartDate").datepicker('remove');
	if (pageMode=="EDIT") {
		$("#idDepositStartDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : false,
			todayBtn : true,
			autoclose : true,
			forceParse: false,	
			startDate : window.client_dob,
			endDate : new Date()
		}).on('changeDate', function (ev) {
			$("#alertStartDate").css('color','');
			$("#alertStartDate").text("");
			$("#idDepositStartDateGroup").css('border','');
			$("#idAddFixedIncome").prop("disabled", false);
		});
	} else {
		$("#idDepositStartDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : true,
			todayBtn : true,
			autoclose : true,
			forceParse: false,	
			startDate : window.client_dob,
			endDate : new Date()
		}).on('changeDate', function (ev) {
			$("#alertStartDate").css('color','');
			$("#alertStartDate").text("");
			$("#idDepositStartDateGroup").css('border','');
			$("#idAddFixedIncome").prop("disabled", false);
		});
	}
}

	/*
	 * $("#idAddFixedIncome").on("click", function(event) {
	 * 
	 * console.log("submit Add Fund Form");
	 * 
	 * var selectedImageFamilyMemberid =
	 * sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	 * 
	 * var validate;
	 * 
	 * if($('#idFundTypeMF').is(':checked')) { validate =
	 * validateFundsMF($('#idAddFundForm')); }
	 * 
	 * if($('#idFundTypeETF').is(':checked')){ validate =
	 * validateFundsETF($('#idAddFundForm')); }
	 * 
	 * if($('#idFundTypePMS').is(':checked')){ validate =
	 * validateFundsPMS($('#idAddFundForm')); } var validate=true;
	 * 
	 * if(validate){
	 * 
	 * event.preventDefault(); var selectedClientId =
	 * sessionStorage.getItem("SELECTED_CLIENT_ID"); console.log("selectedClientId = " +
	 * selectedClientId); var formData =
	 * $('#idAddFixedIncomeForm').serializeToJSON();
	 * formData["clientID"]=selectedClientId;
	 * formData["familyMemberID"]=selectedImageFamilyMemberid;
	 * 
	 * var data = JSON.stringify(formData);
	 * 
	 * console.log(data); alert(data); getClientData("POST", data,
	 * "createClientFixedIncome", onAddFixedIncomeSuccess);
	 *  }
	 * 
	 * 
	 * 
	 * }); function onAddFixedIncomeSuccess(data) { alert("Saved Income id = " +
	 * data.id); $("#idClient").load("clientInfo/viewFunds.html");
	 * $(".dashboardheading ").html(""); $(".dashboardheading ").html("View
	 * MF/ETF/PMS"); $("#addRecord").removeClass('btn_Disabled');
	 * $('#editRecord').addClass('btn_Disabled');
	 * $('#deleteRecord').addClass('btn_Disabled'); }
	 * 
	 * 
	 */

function getSelectedFixedIncome(){
	$('#idRadioStart').hide();
	//getClientDataWithErrorHandling("GET", "", "clientFixedIncome/" + sessionStorage.getItem("fixedIncome_ID"), onGetFixedIncomeSuccess, onGetFixedIncomeError);
	getClientData("GET", "", "clientFixedIncome/" + sessionStorage.getItem("fixedIncome_ID"), onGetFixedIncomeSuccess);
	var selectedImageFamilyMemberid;
	
function onGetFixedIncomeSuccess(data) {
	
	console.log(JSON.stringify(data));
	console.log("financialAssetType " + data.financialAssetType);
	financialAssetType = data.financialAssetType;
	if (data.interestCouponRate != null) {
		data.interestCouponRate = (parseFloat(data.interestCouponRate)).toFixed(2);
	}
	// selectedImageFamilyMemberid = data.familyMemberID;
	sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID", data.familyMemberID)
	// alert(data.familyMemberId);
	//populateFamilyMemberByClientId(selectedClientId, $("#familyMemberImage"));
	//alert("familyMemberID: " + data.familyMemberID);
	poupulateFamilyMemberImage(data.familyMemberID);
	populateForm($('#idAddFixedIncomeForm'), data);
	maskAllAmountFields();
	getClientData("GET", "", "AllFixedDepositType", FixedDepositTypeSuccess);
	// alert("f type"+data.fixedDepositType);
	// alert("comp "+data.compoundingFrequency);
	function FixedDepositTypeSuccess(data1) {
		
		myDatePicker();
		// console.log(data);
		fhDrop = $("#idDepositType");
		fhDrop.find('option').remove();
		fhDrop.append('<option value="">Select ' + name + '</option>');
		$.each(data1, function(index, item) {
			fhDrop.append('<option value="' + item.id + '" selected>'
					+ item.description + '</option>');
		});
		$("#idDepositType option").filter(function() {
			return this.value == data.fixedDepositType;
		}).prop('selected', true);

		var v = $("#idDepositType").val();
		console.log("v " + v);
		var text = $("#idDepositType").find('option:selected').text();
		console.log("text " + text);

		if (text === 'Cumulative') {
			
			//alert(text);
			$("#idcompoundingFrequencyDiv").show();
			$("#payoutFrequencyDiv").hide();
			//$("#idInterestPayoutFrequency").prop("disabled", true);
			$("#idCompoundingFrequency").prop("disabled", false);
			document.getElementById('alertipf').innerHTML = "";

		} else {
			if (text === 'Interest Payout') {
				
				//alert(text);
				$("#idcompoundingFrequencyDiv").hide();
				$("#idInterestPayoutFrequency").prop("disabled", false);
				
				$("#payoutFrequencyDiv").show();
				//$("#idCompoundingFrequency").prop("disabled", true);
				document.getElementById('alertcf').innerHTML = "";

			}
		}
		
		

	}

	$("#idDepositType").change(function() {
						var compFreq = document.getElementById("idCompoundingFrequency");
						var payoutFreq = document.getElementById("idInterestPayoutFrequency");
						// console.log( "selected fundHouse amfiCode = " +
						// $(this).val() );

						var v = $(this).val();
						var text = $(this).find('option:selected').text();
						// alert("text "+text+" "+v);

						if (text === 'Cumulative') {
							//console.log("dddd");
							//alert(text);
							$("#idcompoundingFrequencyDiv").show();
							$("#payoutFrequencyDiv").hide();
							$("#idCompoundingFrequency").prop("disabled", false);

							if ($("#idFixedDeposit").is(':checked') == true) {
								$('#idCompoundingFrequency').val(4);
							}
							$('#idInterestPayoutFrequency').val("0");
							//$("#idInterestPayoutFrequency").prop("disabled",true);
							document.getElementById('alertipf').innerHTML = "";
							document.getElementById('idInterestPayoutFrequency').style.border = "1px solid #ccc";
						} else {
							if (text === 'Interest Payout') {
								//alert(text);
								$("#idcompoundingFrequencyDiv").hide();
								$("#payoutFrequencyDiv").show();
							$('#idCompoundingFrequency').val("0");
							$("#idInterestPayoutFrequency").prop("disabled", false);
							//$("#idCompoundingFrequency").prop("disabled", true);
							document.getElementById('alertcf').innerHTML = "";
							document.getElementById('idInterestPayoutFrequency').style.border = "1px solid #ccc";
						}
							
					}
						
						

					});

	getClientData("GET", "", "AllFrequency", AllFrequencySuccess);

	function AllFrequencySuccess(data1) {
		// alert(data);
		fhDrop = $("#idCompoundingFrequency");
		fhDrop.find('option').remove();
		fhDrop.append('<option value="0">Select Compound Frequency</option>');
		/* $("#idFHouseETF").append('<option value="0">Select ' + name + '</option>'); */

		if (data.financialAssetTypeName === 'CP / CD') {
			var la_filter_cpcd = [ 1, 2, 4, 12 ];
			$.each(data1, function(index, item) {
				// / alert(item);
				// alert(item.id +" "+item.description);
				if ($.inArray(item.id, la_filter_cpcd) != -1) {
					fhDrop.append('<option value="' + item.id + '">'
							+ item.description + '</option>');
				}

			});

		} else {
			$.each(data1, function(index, item) {
				// / alert(item);
				// alert(item.id +" "+item.description);
				fhDrop.append('<option value="' + item.id + '">'
						+ item.description + '</option>');

			});
		}

		$("#idCompoundingFrequency option").filter(function() {
			return this.value == data.compoundingFrequency;
		}).prop('selected', true);
		
		if(data.bondType == '1'){
			$('#compoundingFrequencyDiv').show();
		}else{
			$('#compoundingFrequencyDiv').show();
		}

		fhDrop = $("#idInterestPayoutFrequency");
		fhDrop.find('option').remove();
		fhDrop.append('<option value="">Select Payout Frequency</option>');
		
		$.each(data1, function(index, item) {
			// alert(item);
			// alert(item.id +" "+item.description);
			fhDrop.append('<option value="' + item.id + '">' + item.description
					+ '</option>');

		});

		$("#idInterestPayoutFrequency option").filter(function() {
			return this.value == data.payoutFrequency;
		}).prop('selected', true);

		fhDrop = $("#idDepositFrequency");
		fhDrop.find('option').remove();
		fhDrop.append('<option value="0">Select deposit Frequency</option>');
		/* $("#idFHouseETF").append('<option value="0">Select ' + name + '</option>'); */
		$.each(data1, function(index, item) {
			// alert(item);
			// alert(item.id +" "+item.description);
			fhDrop.append('<option value="' + item.id + '">' + item.description
					+ '</option>');

		});

		$("#idDepositFrequency option").filter(function() {
			// alert("chhhh "+this.value+"== "+data.recurringDepositFrequency);
			return this.value == data.recurringDepositFrequency;
		}).prop('selected', true);

	}
	getClientData("GET", "", "AllMasterCash", AllMasterCashSuccess);

	function AllMasterCashSuccess(data1) {
		// console.log(data);
		fhDrop = $("#idName");
		fhDrop.find('option').remove();
		fhDrop.append('<option value="">Select Bank Issuer</option>');

		$.each(data1, function(index, item) {
			fhDrop.append('<option value="' + item.id + '">' + item.name
					+ '</option>');

		});
		$("#idName option").filter(function() {
			return this.value == data.bankIssuerId;
		}).prop('selected', true);

	}

	getClientData("GET", "", "AllBondType", AllBondTypeSuccess);

	function AllBondTypeSuccess(data1) {
		// console.log(data);
		fhDrop = $("#idBondType");
		fhDrop.find('option').remove();
		fhDrop.append('<option value="">Select Bond type</option>');
		$.each(data1, function(index, item) {
			fhDrop.append('<option value="' + item.id + '">' + item.description
					+ '</option>');

		});

		$("#idBondType option").filter(function() {
			// alert("chhhh "+this.value+"== "+data.bondType);
			return this.value == data.bondType;
		}).prop('selected', true);

		 pBondType = data.bondType;
		 //alert('Bond Type '+pBondType);
		
		if (pBondType == 1) {
			
			// $("#idInterestRate").val("");
			$("#idInterestRate").prop("disabled", true);
			$("#idInterestRate").val("");
			$("#tenureYearsDaysDiv").show();
			/*$('#idCompoundingFrequency').prop("disabled",false);
			$('#compoundingFrequencyDiv').show();
			$('#idCompoundingFrequency').val(1);*/
			// $("#idInterestPayoutFrequency").val("0");
			$("#idInterestPayoutFrequency").prop("disabled", true);
		}else{
			if (pBondType == 2) {
				$('#newTenureDiv').hide();
				$("#tenureYearsDaysDiv").hide();
				$('#tenure').val(99);
				$('#tenure').hide();
				$("#idDepositTenure").val(99);
				$("#idDepositTenure").hide();
				// $("#idDepositMaturityDate").val()=0;
				$("#idDepositMaturityDate").prop("disabled", true).val('');
				$('#compoundingFrequencyDiv').hide();
				$('#idCompoundingFrequency').prop("disabled",true);
				$('#maturityDateDiv').hide();

			}
		}

		/*else{
			$('#newTenureDiv').show();
			$('#tenure').val();
			$('#tenure').show();
			$("#idDepositTenure").val();
			$("#idDepositTenure").show();
			// $("#idDepositMaturityDate").val()=0;
			$("#idDepositMaturityDate").prop("disabled", true);
			$('#compoundingFrequencyDiv').show();
			$('#maturityDateDiv').show();

		}
*/
	}
	
	if (data.id != 0) { $('#idRadioStart').hide(); }

	if (data.financialAssetTypeName === 'Bank Fixed Deposits') {
		$("#idFixedDeposit").prop("checked", true);
	}else if (data.financialAssetTypeName === 'Bank Recurring Deposits') {
		$("#idRecurringDeposit").prop("checked", true);
	}else if (data.financialAssetTypeName === 'Bonds / Debentures') {
		$("#idBondsDebentures").prop("checked", true);
	}else if (data.financialAssetTypeName === 'CP / CD') {
		$("#idCPCD").prop("checked", true);
	}
	
	if (pBondType == 2) {
		$('#newTenureDiv').hide();
		$('#tenureDiv').hide();
		/*$('#tenure').hide();
		$('#tenurelabel').hide();
		$('#idDepositTenure').hide();*/
	}else{
		$('#tenureDiv').show();
		$('#newTenureDiv').show();
		/*$('#tenure').sho();
		$('#tenurelabel').hide();
		$('#idDepositTenure').hide();*/
	}
	
	if ($("#idFixedDeposit").is(':checked')) { showFixedDeposit(heading_prefix,'Fixed Deposit'); }
	if ($("#idRecurringDeposit").is(':checked')) { showRecurringDeposit(heading_prefix,'Bank - Recurring Deposit'); }
	if ($("#idBondsDebentures").is(':checked')) { showBondsDebentures(heading_prefix,'Bonds/Debentures'); }
	if ($("#idCPCD").is(':checked')) { 
		showCPCD(heading_prefix,'CP/CD'); 
		}
	
	


}

/*function onGetFixedIncomeError(data) {
	$("#idClient").load("resources/errorPage.html");
	$(".dashboardheading    ").html("Error Page");
    $("#addRecord").hide();
    $('#editRecord').hide();
    $('#deleteRecord').hide();
}     */

	
	
}


$("#undo").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});



/*getClientDataAsyncFalse("GET", "", "clientFamilyMemberImageByClient/" + selectedClientId, SSFamilyMemberSuccess);
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
}*/

function undoChange(){
	updatedUNDO();
	
	if (pageMode == "ADD") {
		$(".form-control").val("");
		
		var fixedIncomeTypeID = $("input:radio[name=financialAssetType]:checked").val();	
		
		if (fixedIncomeTypeID == 22) {
			$("#idTenureTypeDays").prop("checked", false);
			$("#idTenureTypeYears").prop("checked", true);
			$("#idInterestPayoutFrequency").prop("disabled", false);
		} else {
			if (fixedIncomeTypeID == 23) {
				$("#idCompoundingFrequency").val(4);
				$("#idDepositFrequency").val(12);
			} else {
				if (fixedIncomeTypeID == 24) {
					$("#compoundingFrequencyDiv").hide();
					$("#idInterestRate").prop("disabled", false);
					$("#idInterestPayoutFrequency").prop("disabled", false);
					$('#maturityDateDiv').show();
				} else {
					if (fixedIncomeTypeID == 27) {
						$("#idCompoundingFrequency").val(4);
					}
				}
			}
		}
		
	} else {
		if (pageMode == "EDIT") {
			getSelectedFixedIncome();
		}
	}
	
}

function updatedUNDO(){
	
	var lTenureYear = document.getElementById("idDepositTenureyr");
	var lTenureMonth = document.getElementById("idDepositTenuremn");
	var lInvestmentDate = document.getElementById("idDepositStartDate");
	var lInvestmentDateGroup = document.getElementById("idDepositStartDateGroup");	
	var lInvestmentAmount = document.getElementById("idDepositAmount");
	var lInterestRate = document.getElementById("idInterestRate");
	var lTenure = document.getElementById("idDepositTenure");
	var lBondPurchased=document.getElementById('idBondPurchased');
	var lBondFaceValue=document.getElementById('idBondValue');
	var lBondType=document.getElementById('idBondType');
	var lInterestRate = document.getElementById("idInterestRate");
	var lBondCurrentYield=document.getElementById('idCurrentYield');
	var lInterestPayoutFrequency=document.getElementById('idInterestPayoutFrequency');
	var depositFreq = document.getElementById("idDepositFrequency");
	var lDepositType=document.getElementById('idDepositType');
	var compFreq = document.getElementById("idCompoundingFrequency");
	var payoutFreq = document.getElementById("idInterestPayoutFrequency");
	
	
	lInvestmentDate.style.border = "";
	lInvestmentDateGroup.style.border = "";
	lInvestmentAmount.style.border ="";
    lInterestRate.style.border ="";
    lTenure.style.border ="";
	lBondPurchased.style.border = "";
	lBondFaceValue.style.border = "";
	lBondType.style.border = "";
	lBondCurrentYield.style.border = "";
	lInterestRate.style.border ="";
	lInterestPayoutFrequency.style.border ="";
	depositFreq.style.border = "";	
	lDepositType.style.border = "";
	
	document.getElementById('alertform').innerHTML="";
	document.getElementById('alertBondPurchased').innerHTML="";
	document.getElementById('alertBondType').innerHTML="";
	document.getElementById('alertInterestRate').innerHTML="";
	document.getElementById('alertBondValue').innerHTML="";
	document.getElementById('alertCurrentYield').innerHTML="";
	document.getElementById('alertipf').innerHTML="";
	document.getElementById("idCompoundingFrequency").style.border = "";
	document.getElementById('alertStartDate').innerHTML="";
	document.getElementById('alertDepositAmount').innerHTML="";
	document.getElementById('alertInterestRate').innerHTML="";
	document.getElementById('alertDepositTenure').innerHTML="";
	document.getElementById("idDepositTenuremn").style.border = "";
	document.getElementById("idDepositTenureyr").style.border = "";
	document.getElementById('alertInterestRate').innerHTML="";
	document.getElementById("idDepositFrequency").style.border ="";
	document.getElementById('alertipf').innerHTML="";
	document.getElementById('alertDepositType').innerHTML="";
	document.getElementById('alertdepositfrequency').innerHTML="";
	document.getElementById('alerttenuretype').innerHTML="";
	document.getElementById('alertInterestRate').innerHTML="";
	document.getElementById('alertcf').innerHTML="";
	document.getElementById('alerttenuretype').innerHTML="";
	//document.getElementById('idTenureYears').style.border = "";
	document.getElementById('alertdepositfrequency').innerHTML="";
	document.getElementById("idInterestPayoutFrequency").style.border ="";
	document.getElementById('idDepositType').style.border ="";
	document.getElementById('alertDepositType').innerHTML="";
	document.getElementById('alertipf').innerHTML="";
	document.getElementById('alertcf').innerHTML="";
	document.getElementById('alertInterestRate').innerHTML="";
	document.getElementById("idDepositTenureyr").style.border = "";
	
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





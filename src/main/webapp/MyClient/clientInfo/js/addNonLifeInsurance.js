var selectedImageFamilyMemberid;
var serviceurl;
var savedpolicyNumber;
var pageMode = sessionStorage.getItem("PAGE_MODE");	
var client_dob;
var client_lexp;
var months;
var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var selectedNonLifeInsuranceId = sessionStorage.getItem("SELECTED_NON_LIFE_INSURANCE_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
var changedFamilyMemberId;

$('#policyNumber').on('input', function () {
    $('#alertipnum').html('').css('color', '');
    $('#policyNumber').css('border', '');
});

$(document).ready(function() {
	
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				$("#saveNonLifeInsurance").show();
				$("#undo").show();
			}else if(loggedClient.clientInfoView === "Y"){
				$("#saveNonLifeInsurance").hide();
				$("#undo").hide();
			}
		}else if(loggedUser != null && loggedUser.role === "Admin"){
			$("#saveNonLifeInsurance").hide();
			$("#undo").hide();
		}else{
			if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
				$("#saveNonLifeInsurance").show();
				$("#undo").show();
			}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
				$("#saveNonLifeInsurance").hide();
				$("#undo").hide();
			}
		}
	
	client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
	client_lexp = moment(client_dob).add(months, 'months').toDate();
	months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
	
	//alert('Client Id '+ selectedClientId);

	//alert('Page Mode: '+pageMode);
	
	$("#policyNumber").focusout(function () {
		if (pageMode=="ADD") {
		//alert('In Policy Number Focusout');
		//var pnum = $("#policyNumber").val();
		//alert('Just Entered Value: '+pnum);
		//if (pnum!=savedpolicyNumber) {
			getClientData("GET","", "checkClientNonLifePolicyNumber?policyNumber=" + this.value+"&clientId="+selectedClientId, onCheckSuccess);
			function onCheckSuccess(checkdata) {
				if (checkdata.message != "") {
						if (checkdata.message == "Policy Number Available"){
							//$("#alertipnum").css('color','green');
							//$("#alertipnum").text(checkdata.message);
							//$("#policyNumber").css('border','');	
						} else {
							$("#alertipnum").css('color','red');
							$("#alertipnum").text(checkdata.message);
							$("#policyNumber").css('border','2px solid red');	
						}
					//$("#policyNumber").focus();
				} else {
					$("#alertipnum").text('');
					$("#policyNumber").css('border','');
				}
			}
		}else if (pageMode=="EDIT"){
			var pnum = $("#policyNumber").val();
			if (pnum!=savedpolicyNumber) {
				getClientData("GET","", "checkClientNonLifePolicyNumber?policyNumber=" + this.value+"&clientId="+selectedClientId, onCheckSuccess);
				function onCheckSuccess(checkdata) {
					if (checkdata.message != "") {
						if (checkdata.message == "Policy Number Available"){
							/*$("#alertipnum").css('color','green');
							$("#alertipnum").text(checkdata.message);
							$("#policyNumber").css('border','');	*/
						} else {
							$("#alertipnum").css('color','red');
							$("#alertipnum").text(checkdata.message);
							$("#policyNumber").css('border','2px solid red');	
						}
					} else {
						$("#alertipnum").text('');
						$("#policyNumber").css('border','');
					}
				}
			}
			else {
				$("#alertipnum").text('');
				$("#policyNumber").css('border','');							
			}
		}
						
	});					
	
	
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
	 $('#policyStartDate').mask('00/00/0000',options);

	populateFamilyMemberByClientId(selectedClientId, $("#familyMemberImage"));
	populateFamilyMemberCheckBoxByClientId(selectedClientId, $("#familyMemberCheckBox"))
	var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");

	// calendar
	"use strict";
		$("[data-toggle=\"tooltip\"]").tooltip();
		$("#policyStartDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : true,
			todayBtn : true,
			autoclose : true,
			forceParse: false,	
			startDate : window.client_dob,
			endDate : new Date()
		}).on('changeDate', function(ev){
			$("#alertpsd").css('color','');
			$("#alertpsd").text("");
			$("#idPolicyStartDateGroup").css('border','');
			$("#saveNonLifeInsurance").prop("disabled", false);
		});
		
		$("#policyStartDate").blur(function() {
			
			if (!checkValidDate($(this).val())) {
				$("#alertpsd").css('color','red');
				$("#alertpsd").text("Date is invalid!");
				$("#idPolicyStartDateGroup").css('border','2px solid red');
				$("#saveNonLifeInsurance").prop("disabled", true);
			} else {
				$("#alertpsd").css('color','');
				$("#alertpsd").text("");
				$("#idPolicyStartDateGroup").css('border','');
				$("#saveNonLifeInsurance").prop("disabled", false);
			}
			
		});
		

		$("#policyEndDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : true,
			todayBtn : true,
			forceParse: false,			
			autoclose : true
		}).on('changeDate', function(ev){
			$("#alertped").css('color','');
			$("#alertped").text("");
			$("#idPolicyEndDateGroup").css('border','');
			$("#saveNonLifeInsurance").prop("disabled", false);
		});
		
		$("#policyEndDate").blur(function() {
			
			if (!checkValidDate($(this).val())) {
				$("#alertped").css('color','red');
				$("#alertped").text("Date is invalid!");
				$("#idPolicyEndDateGroup").css('border','2px solid red');
				$("#saveNonLifeInsurance").prop("disabled", true);
			} else {
				$("#alertped").css('color','');
				$("#alertped").text("");
				$("#idPolicyEndDateGroup").css('border','');
				$("#saveNonLifeInsurance").prop("disabled", false);
			}
			
		});
		
		$(".calendar-icon-container").on("click",function() {
			$(this).closest(".input-group").find("input").trigger("focus");
		});

		var insTypeid;

		getClientDataAsyncFalse("GET", "", "InsuranceCompanyList", insuranceCompanyListSuccess);

		function insuranceCompanyListSuccess(data) {
			// console.log(data);
			var companyList = $("#nonLifeInsuranceCompany");
			companyList.find('option').remove();
			companyList.append('<option value="">Select Insurance Company</option>');
			$.each(data, function(index, item) {
				companyList.append('<option value="' + item.id + '">' + item.description + '</option>');
			});
		}

		
		if (pageMode=="ADD") {
			$("#formDiv").hide();
			$("#formDivButton").hide();
			$("#idCOVER").hide();
			$('#familyCover').hide();		
			//  Non Life Insurance Type radio button Script
			//populate policy type 
			$("#insuranceTypeRadioGroup input[name='insuranceTypeID']").click(function(){
				$("#MainDiv").show();
				$("#formDiv").show();
				$("#formDivButton").show();
				if ($("#insuranceTypeGeneral").is(':checked')){
					$('#insuranceTypeRadioGroup').hide();
					$(".dashboardheading    ").html("Add General Insurance");
					
				}
				else {
						if ($("#insuranceTypeHealth").is(':checked')){
							$('#insuranceTypeRadioGroup').hide();
						    $(".dashboardheading    ").html("Add Health Insurance");
						    $('#insurancePolicyType').on('change', function(){
								selectedinsurancePolicyType = $(this).val();
								if (selectedinsurancePolicyType == 13) {
									$('#idCOVER').show();
									//alert("coverFlag: " + $("input:radio[name=coverFlag]:checked").val());
									//var flag = $("input:radio[name=coverFlag]:checked").val();
									//alert("flag: " + $("input:radio[name=coverFlag]:checked").val());
									$("input:radio[name=coverFlag]").change(function(){ 
										var flag = $(this).val();
										if(flag == "F"){
											$('#familyCover').show();
											
										/*	$('input:checkbox').click(function(){
											    //var final = '';
												var i =0;
											    $('.fmCheck:checked').each(function(){        
//											        var values = this.id;
//											        final += values;
											    	alert(this.id);
											    	checkedFamilyMemberId.push(this.id);
											    	i++;
											    });
											    
											});*/
											
											/*$('input:checkbox').click(function() {
												sessionStorage.setItem("CHECKED_FM_ID", this.id);
												checkedFamilyMemberId = sessionStorage.getItem("CHECKED_FM_ID");
												alert("chked fm id: " + sessionStorage.getItem("CHECKED_FM_ID"));
												sessionStorage.removeItem("CHECKED_FM_ID");
											});
											
											$('input:checkbox').change(function() {
										        //alert("here i am: " + this.name + " value = " + this.id);
												sessionStorage.removeItem("CHECKED_FM_ID");
												sessionStorage.setItem("CHECKED_FM_ID", this.id);
												changedFamilyMemberId = sessionStorage.getItem("CHECKED_FM_ID");
												alert("chnged chked fm id: " + sessionStorage.getItem("CHECKED_FM_ID"));
												sessionStorage.removeItem("CHECKED_FM_ID");
										    });*/
										    
										} else {
											$('#familyCover').hide();
										}
									});
								} else {
									$('#idCOVER').hide();
								}
						   	});
					}
				}

				insTypeid =$('input:radio[name=insuranceTypeID]:checked').val();							  
				getClientDataAsyncFalse("GET", "", "NonInsurancePolicyTypeList?insTypeId="+insTypeid, insurancePolicyTypeListSuccess);

				function insurancePolicyTypeListSuccess(data) {
					// console.log(data); 
					var lifeInsurancePolicyType = $("#insurancePolicyType");
					lifeInsurancePolicyType.find('option').remove();
					lifeInsurancePolicyType.append('<option value="">Select Policy Type</option>');
					$.each(data, function(index, item) {
						lifeInsurancePolicyType.append('<option value="' + item.id + '">' + item.description + '</option>');
					});
				}
				$("#insurancePolicyType").focus();		  
			});
			
		/*	$("#policyNumber").focusout(function () {
				//alert('In Policy Number focusout');
				getClientData("GET","", "checkClientNonLifePolicyNumber?policyNumber=" + this.value+"&clientId="+selectedClientId, onCheckSuccess);
				function onCheckSuccess(checkdata) {
					if (checkdata.message != "") {
							if (checkdata.message == "Policy Number Available"){
								$("#alertipnum").css('color','green');
								$("#alertipnum").text(checkdata.message);
								$("#policyNumber").css('border','');	
							} else {
								$("#alertipnum").css('color','red');
								$("#alertipnum").text(checkdata.message);
								$("#policyNumber").css('border','2px solid red');	
							}
						//$("#policyNumber").focus();
					} else {
						$("#alertipnum").text('');
						$("#policyNumber").css('border','');
					}
				}
			});*/
		}
		else if (pageMode=="EDIT") {
			//alert('Populating in Edit Mode');							

			$("#insuranceTypeRadioGroup").hide();
			$("#MainDiv").show();
			$("#formDiv").show();
			$("#formDivButton").show();
			$("#insurancePolicyType").focus();
			
			getSelectedNonLifeInsurance();

			//***************************** edit Non Life Insurance and auto populate**********************//
				
			//***************************** End populating form in Edit mode**********************//
		}

	// Reset form data
    $("#undo").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});

    // edit form submit button
	$("#saveNonLifeInsurance").on("click", function(event) {
		//alert('In Save');
		   var checkedFamilyMemberId=[];
		   $('.fmCheck:checked').each(function(){        
//		        var values = this.id;
//		        final += values;
		    	//alert(this.id);
		    	checkedFamilyMemberId.push(this.id);
		    	
		    });
		   for(var i=0;i<checkedFamilyMemberId.length;i++){
			   //alert("member id "+checkedFamilyMemberId[i])
		   }
		unmaskAllAmountFields();
		if(validateNonInsurance($('#nonLifeInsuranceForm'))) {
			showLoaderOnSave("#saveNonLifeInsurance");
			window.setTimeout(function(){
			//alert('Validation through');			
	        selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	        if (typeof selectedImageFamilyMemberid != 'undefined' && selectedImageFamilyMemberid!=null) {
	        	//	console.log("submit Add Fund Form");
	        	event.preventDefault();
				var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				var formData = $('#nonLifeInsuranceForm').serializeToJSON();
				
				if (pageMode=="ADD") {
					formData["clientID"] = selectedClientId;
					formData["familyMemberID"] = selectedImageFamilyMemberid;
					formData["checkedFamilyMemberID"] =checkedFamilyMemberId;
	                //formData["policyNameID"] = selectedPolicyNameId;
					var data = JSON.stringify(formData);
					console.log("data "+data);
					//getClientDataWithErrorHandling("POST", data,"saveClientNonLifeInsurance",onAddFundSuccess, onAddNonLifeInsuranceError);
					saveData("POST", data,"saveClientNonLifeInsurance",onAddFundSuccess);
					function onAddFundSuccess(data) {
						hideLoaderOnSave("#saveNonLifeInsurance");
						//alert("insurance id: "+data.id);
						/*formData["insuranceID"] = 3;
						formData["checkedFamilyMemberID"] = checkedFamilyMemberId;
						//formData["changedFamilyMemberID"] = changedFamilyMemberId;
						var dataCover = JSON.stringify(formData);
					    eData("POST", dataCover, "saveFloaterCover", onSaveCoverSuccess);
						function onSaveCoverSuccess(data) {
							alert("Success!");
						}*/
						serviceurl = "/clientNonLifeInsurance/client/" + selectedClientId;
						getClientData("GET", "", serviceurl, onSuccess);
						function onSuccess(data) {
							sessionStorage.setItem("NONLIFE_INSURANCE_LIST", JSON.stringify(data));
							$("#idClient").empty();
							$("#idClient").load("clientInfo/viewNonLifeInsurance.html");
							$(".dashboardheading    ").html("");
							$(".dashboardheading    ").html("Non Life Insurance");
							$("#addRecord").removeClass('btn_Disabled');
							$('#editRecord').addClass('btn_Disabled');
							$('#deleteRecord').addClass('btn_Disabled');
						}
					}
					/*function onAddNonLifeInsuranceError(err) {
						$("#alertform").text("Error saving non life insurance information. Please try after sometime or contact system administrator.");
						$(window).scrollTop(0);
						hideLoaderOnSave("#saveNonLifeInsurance");
						//return false;				
					}*/
				}
				else if (pageMode=="EDIT") {
					//alert('Saving in Edit Mode');	
					formData["clientID"]=selectedClientId;
					formData["familyMemberID"]=sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
			 		formData["id"] =  selectedNonLifeInsuranceId; 	
			 		formData["checkedFamilyMemberID"] = checkedFamilyMemberId;
			        //formData["policyNameID"] = selectedPolicyNameId;
					//alert('Insurance Type: '+formData.insuranceTypeID);
					//alert('Company Name ID: '+formData.companyNameID);
					var formData = JSON.stringify(formData);
					saveData("POST", formData,"editclientNonLifeInsurance",onEditFundSuccess);
					function onEditFundSuccess(data) {
						serviceurl = "/clientNonLifeInsurance/client/" + selectedClientId;
						getClientData("GET", "", serviceurl, onSuccess);
						function onSuccess(data) {
							hideLoaderOnSave("#saveNonLifeInsurance");
							sessionStorage.setItem("NONLIFE_INSURANCE_LIST", JSON.stringify(data));
							$("#idClient").empty();								
							$("#idClient").load("clientInfo/viewNonLifeInsurance.html");
							$(".dashboardheading    ").html("Non Life Insurance");
					        $("#addRecord").removeClass('btn_Disabled');
					        $('#editRecord').addClass('btn_Disabled');
					        $('#deleteRecord').addClass('btn_Disabled');
						}
					}
				}
	        }
			else {
				alert("Please select a Family Member");
				return false;
			}
			}, 5000);
		}
		else {		
			$(window).scrollTop(0);
			return false;
		}

	});
					
	$('#focusguard-2').on('focus', function() {
		// "last" focus guard got focus: set focus to the first field
		$("#insurancePolicyType").focus();	
		$(window).scrollTop(0);
	});
});

function myDatePicker() {
	$("#policyStartDate").datepicker('remove');
	$("#policyEndDate").datepicker('remove');
	if(pageMode=="EDIT"){
		$("#policyStartDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : false,
			todayBtn : true,
			autoclose : true,
			forceParse: false,	
			startDate : window.client_dob,
			endDate : new Date()
		}).on('changeDate', function(ev){
			$("#alertpsd").css('color','');
			$("#alertpsd").text("");
			$("#idPolicyStartDateGroup").css('border','');
			$("#saveNonLifeInsurance").prop("disabled", false);
		});
		
		$("#policyEndDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : false,
			todayBtn : true,
			forceParse: false,			
			autoclose : true
		}).on('changeDate', function(ev){
			$("#alertped").css('color','');
			$("#alertped").text("");
			$("#idPolicyEndDateGroup").css('border','');
			$("#saveNonLifeInsurance").prop("disabled", false);
		});
	} else {
		$("#policyStartDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : true,
			todayBtn : true,
			autoclose : true,
			forceParse: false,	
			startDate : window.client_dob,
			endDate : new Date()
		}).on('changeDate', function(ev){
			$("#alertpsd").css('color','');
			$("#alertpsd").text("");
			$("#idPolicyStartDateGroup").css('border','');
			$("#saveNonLifeInsurance").prop("disabled", false);
		});
		
		$("#policyEndDate").datepicker({
			format : "dd/mm/yyyy",
			todayHighlight : false,
			todayBtn : true,
			forceParse: false,			
			autoclose : true
		}).on('changeDate', function(ev){
			$("#alertped").css('color','');
			$("#alertped").text("");
			$("#idPolicyEndDateGroup").css('border','');
			$("#saveNonLifeInsurance").prop("disabled", false);
		});
	}
	
}

function undoChange(){
	updatedUNDO();
	
	if (pageMode=="ADD"){
		$(".form-control").val("");
		$("#idIndividualCover").prop("checked", true);
		$('input[name=Spouse]').prop('checked', true);
		$('input[name=Spouse]').prop('checked', false);
		$('input[name=Son]').prop('checked', false);
		$('input[name=Daughter]').prop('checked', false);
		$('input[name=Father]').prop('checked', false);
		$('input[name=Mother]').prop('checked', false);
		$('input[name=Brother]').prop('checked', false);
		$('input[name=Sister]').prop('checked', false);
		$('input[name=Other]').prop('checked', false);
		$("#familyCover").hide();
	} else {
		if(pageMode=="EDIT"){
			getSelectedNonLifeInsurance();
		}
	}
	
}

function updatedUNDO(){
		var nlInsurancePolicyType = document.getElementById("insurancePolicyType");
		var nlInsuranceCompany = document.getElementById("nonLifeInsuranceCompany");
		var nlInsurancePolicyName = document.getElementById("nonlifeInsurancePolicyName");
		var nlInsurancePolicyNumber = document.getElementById("policyNumber");
		var nlSumInsured = document.getElementById("sumInsured");
		var nlPremium = document.getElementById("premiumAmount");
		var nlPolicyStartDate = document.getElementById("policyStartDate");
		var nlPolicyEndDate = document.getElementById("policyEndDate");
		var nlPolicyStartDateGroup = document.getElementById("idPolicyStartDateGroup");
		var nlPolicyEndDateGroup = document.getElementById("idPolicyEndDateGroup");

		nlInsurancePolicyType.style.border = "";	
		nlInsuranceCompany.style.border = "";	
		nlInsurancePolicyName.style.border = "";	
		nlInsurancePolicyNumber.style.border = "";	
		nlSumInsured.style.border = "";	
		nlPremium.style.border = "";	
		nlPolicyStartDate.style.border = "";	
		nlPolicyStartDateGroup.style.border = "";	
		nlPolicyStartDateGroup.style.borderRadius = "";
		nlPolicyEndDate.style.border = "";	
		nlPolicyEndDateGroup.style.border = "";	
		nlPolicyEndDateGroup.style.borderRadius = "";
		
		document.getElementById('alertsipt').innerHTML="";
		document.getElementById('alertsic').innerHTML="";
		document.getElementById('alertipn').innerHTML="";
		document.getElementById('alertipnum').innerHTML="";
		document.getElementById('alertsi').innerHTML="";
		document.getElementById('alertpsd').innerHTML="";
		document.getElementById('alertp').innerHTML="";
		document.getElementById('alertped').innerHTML="";
		document.getElementById('alertform').innerHTML="";
		
		$("#idCOVER").hide();
}
function getSelectedNonLifeInsurance(){
	
	getClientData("GET", "", "clientNonLifeInsurance/"+selectedNonLifeInsuranceId, onGetNonLifeInsuraceDataSuccess);
	function onGetNonLifeInsuraceDataSuccess(nonLifeInsuranceData) {
		console.log(JSON.stringify(nonLifeInsuranceData))
		
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",nonLifeInsuranceData.familyMemberID)
		poupulateFamilyMemberImage(nonLifeInsuranceData.familyMemberID);
		populateForm($('#nonLifeInsuranceForm'),nonLifeInsuranceData);	
		
		myDatePicker();
		
		maskAllAmountFields();
		savedpolicyNumber=nonLifeInsuranceData.policyNumber;
		insTypeid=nonLifeInsuranceData.insuranceTypeID;
		//alert("checkedFamilyMemberID: " + nonLifeInsuranceData.checkedFamilyMemberID);
		//$('.fmCheck').val(88);
		//$('.fmCheck:checked').val(88);
		//var coverFlag = nonLifeInsuranceData.checkedFamilyMemberID;
		var coverFlag = [];
		coverFlag.push(nonLifeInsuranceData.checkedFamilyMemberID);
		//alert("coverFlag: " + coverFlag);
		var checkedIds = coverFlag.toString().split(',');
		//alert("checkedIds 0: " + checkedIds[0]);
		//alert("checkedIds 1: " + checkedIds[1]);
		$.each(checkedIds, function(i, val){

			   $("input[id='" + val + "']").prop('checked', true);

		});

		//alert("qqewwr")
		if(nonLifeInsuranceData.coverFlag=="I"){
			$('#familyCover').hide();
			}else{
				
				$('#familyCover').show();
				//formData["checkedFamilyMemberID"] = checkedFamilyMemberId;
			}
		//alert('Insurance Type: '+insTypeid);
		if(nonLifeInsuranceData.insuranceTypeID==2) {
			$("#insuranceTypeGeneral").prop("checked", true);
			$(".dashboardheading    ").html("Edit General Insurance");
			$("#idCOVER").hide();

		} else {
			$("#insuranceTypeHealth").prop("checked", true);												  
			$(".dashboardheading    ").html("Edit Health Insurance");
			$("#idCOVER").show();
		}
			
		getClientDataAsyncFalse("GET", "", "NonInsurancePolicyTypeList?insTypeId="+insTypeid, insurancePolicyTypeListSuccess);

		function insurancePolicyTypeListSuccess(data) {
			// console.log(data); 
			var lifeInsurancePolicyType = $("#insurancePolicyType");
			lifeInsurancePolicyType.find('option').remove();
			lifeInsurancePolicyType.append('<option value="">Select Policy Type</option>');
			$.each(data, function(index, item) {
				lifeInsurancePolicyType.append('<option value="' + item.id + '">' + item.description + '</option>');
			});
		}

		$("#insurancePolicyType option").filter(function() {
			return this.value==nonLifeInsuranceData.insurancePolicyTypeID;				    
		}).prop('selected', true);
		
		$("#nonLifeInsuranceCompany option").filter(function() {
			return this.value==nonLifeInsuranceData.companyNameID;				    
		}).prop('selected', true);							                   					
	}
	//alert('Entering Policy Number Focusout');
	
}
function maskAllAmountFields() {
	maskAmount('#sumInsured');
	maskAmount('#premiumAmount');
}
function unmaskAllAmountFields() {
	unmaskAmount('#sumInsured');
	unmaskAmount('#premiumAmount');
}


//testing
function populateFamilyMemberCheckBoxByClientId(clientId, tableRowId) {

	getClientData("GET", "", "clientFamilyMemberImageByClient/" + clientId, familyMemberSuccess);
	function familyMemberSuccess(data) {
		tableRowId.empty();
		$.each(data,function(index, item) {
				if (item.relationID === 0) {
					//sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",item.id);
				
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Self" id="'+ item.id +'" tabindex="200" checked/>'+item.relationName+'<br/>&nbsp;</td>');
				
				} 

				
				if (item.relationID === 1) {
						
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Spouse" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 2) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Son" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 3) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Daughter" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 4) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Father" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 5) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Mother" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 6) {
					//alert("id: " + item.id);
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Brother" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 7) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Sister" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
				
				if (item.relationID === 8) {
					
					tableRowId.append('<td><input type="checkbox" class="fmCheck" name="Other" id="'+ item.id +'" tabindex="200"/>'+item.relationName+'<br/>'+item.firstName+'</td>');

				}
							
		});
	}

}






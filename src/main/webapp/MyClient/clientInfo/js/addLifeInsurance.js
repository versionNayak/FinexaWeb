	var selectedImageFamilyMemberid;
	var pageMode = sessionStorage.getItem("PAGE_MODE");	
	var months;
	var client_dob;
	var client_lexp;
	var selectedPolicyNameId;      
	var prevDepositStartDate="";
	var selectedLifeInsuranceId = sessionStorage.getItem("SELECTED_LIFE_INSURANCE_ID");
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}

	$(document).ready( function() {
		
		//new code for access rights
		if(loggedClient != null && loggedClient.role === "Client"){
				if(loggedClient.clientInfoAddEdit === "Y"){
					$("#saveLifeInsurance").show();
					$("#undo").show();
				}else if(loggedClient.clientInfoView === "Y"){
					$("#saveLifeInsurance").hide();
					$("#undo").hide();
				}
			}else if(loggedUser != null && loggedUser.role === "Admin"){
				$("#saveLifeInsurance").hide();
				$("#undo").hide();
			}else{
				if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
					$("#saveLifeInsurance").show();
					$("#undo").show();
				}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
					$("#saveLifeInsurance").hide();
					$("#undo").hide();
				}
			}
		
		var lPolicyStartDate = document.getElementById("policyStartDate");
		//var lPolicyTenure = document.getElementById("policyTenure");
		
		months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
		client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
		client_lexp = moment(client_dob).add(months, 'months').toDate();
	
		 selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		 
		 
			$("#policyNumber").focusout(function () {
				//  alert(this.value);
				if (pageMode=="ADD") {
					getClientData("GET","", "checkClientLifePolicyNumber?policyNumber=" + this.value+"&clientId="+selectedClientId, onCheckSuccess);
					function onCheckSuccess(checkdata) {
						if (checkdata.message != "") {
								if (checkdata.message == "Policy Number Available"){
									/*$("#alertipnum").css('color','green');
									$("#alertipnum").text(checkdata.message);
									$("#policyNumber").css('border','');*/	
									$("#alertipnum").text('');
									$("#policyNumber").css('color','');
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
				} else if (pageMode=="EDIT") {
					var pnum = $("#policyNumber").val();
					//alert('Just Entered Value: '+pnum);
					if (pnum!=savedpolicyNumber) {
						getClientData("GET","", "checkClientLifePolicyNumber?policyNumber=" + this.value+"&clientId="+selectedClientId, onCheckSuccess);
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
		 $("#idLocDate").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : true,
				todayBtn : true,
				autoclose : true,
				forceParse: false,	
				startDate : window.client_dob
			})
      
		//alert('Page Mode: '+pageMode);
		populateFamilyMemberByClientId(selectedClientId, $("#familyMemberImage"));
		var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
      
        
		
		$("#policyTypeULIPLable").hide();
		$("#policyTypeULIP").hide();
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
				
				$("#saveLifeInsurance").prop("disabled", false);
				
				$(this).focus().datepicker('hide');
				$("#alertpsd").text('');
				$("#idPolicyStartDateGroup").css('border','1px solid #ccc');				
				$("#idPolicyStartDateGroup").css('borderRadius','7px');	
				
				$(this).blur(function() {
					
						var iMaturityDate='';
						//alert("policy tenure value: " + $("#policyTenure").val());
						
						if($("#policyTenure").val() != "") {
							iMaturityDate=moment($(this).val(),'DD/MM/YYYY').add($("#policyTenure").val(),'years').format('DD/MM/YYYY');
							$("#idLockedUptoDate").val(iMaturityDate);
						}
						
				        var index = +$(this).attr("tabindex") + 1;
				        $("[tabindex='" + index +"']").focus();
					
					
				});
				
			});
			
			$("#policyStartDate").blur(function() {
				
				if($(this).val() != "") {
					if (!checkValidDate($(this).val())) {
						$("#alertpsd").css('color','red');
						$("#alertpsd").text("Date is invalid!");
						$("#idPolicyStartDateGroup").css('border','2px solid red');
						$("#saveLifeInsurance").prop("disabled", true);
					} else {
						$("#alertpsd").css('color','');
						$("#alertpsd").text("");
						$("#idPolicyStartDateGroup").css('border','');
						$("#saveLifeInsurance").prop("disabled", false);
					}
				}
				
				
			});
			
			$("#policyTenure").blur(function() {
				
				var iMaturityDate;
				
				if ($(this).val() != "" && lPolicyStartDate.value != "") {
					iMaturityDate = moment(lPolicyStartDate.value,'DD/MM/YYYY').add($("#policyTenure").val(),'years').format('DD/MM/YYYY');
				} else {
					iMaturityDate = "";
				}
				
				$("#idLockedUptoDate").val(iMaturityDate);
						
			});

			$("#idLockedUptoDate").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : true,
				todayBtn : true,
				forceParse: false,			
				autoclose : true
			}).on('changeDate', function(ev){
				$("#alertlud").css('color','');
				$("#alertlud").text("");
				$("#idLockedUptoDateGroup").css('border','');
				$("#saveLifeInsurance").prop("disabled", false);
			});
			
			$("#idLockedUptoDate").blur(function() {
				
				if($(this).val() != "") {
					if (!checkValidDate($(this).val())) {
						$("#alertlud").css('color','red');
						$("#alertlud").text("Date is invalid!");
						$("#idLockedUptoDateGroup").css('border','2px solid red');
						$("#saveLifeInsurance").prop("disabled", true);
					} else {
						$("#alertlud").css('color','');
						$("#alertlud").text("");
						$("#idLockedUptoDateGroup").css('border','');
						$("#saveLifeInsurance").prop("disabled", false);
					}
				}
				
				
			});

			$(".datepicker-icon").on("click", function() {
				$(this).closest(".input-group").find("input").trigger("focus");
			});

			getClientDataAsyncFalse("GET", "", "LifeInsuranceCompanyList", insuranceCompanyListSuccess);

			function insuranceCompanyListSuccess(data) {
				// console.log(data);
				var companyList = $("#insuranceCompanyList");
				companyList.find('option').remove();
				companyList.append('<option value="">Select InsuranceCompany</option>');
				$.each(data, function(index, item) {
					companyList.append('<option value="' + item.id + '">' + item.description + '</option>');
				});
			}

			getClientDataAsyncFalse("GET", "", "LifeInsurancePolicyTypeList", insurancePolicyTypeListSuccess);

			function insurancePolicyTypeListSuccess(data) {
				// console.log(data);
				var lifeInsurancePolicyType = $("#lifeInsurancePolicyType");
				lifeInsurancePolicyType.find('option').remove();
				lifeInsurancePolicyType.append('<option value="">Select Policy Type</option>');
				$.each(data, function(index, item) {
					lifeInsurancePolicyType.append('<option value="' + item.id + '">' + item.description + '</option>');
				});
			}

			var serviceurl;
			
			

            $("#lifeInsurancePolicyType").change(function() {
            	if (this.value == 5) {
            		$("#policyTypeULIPLable").show();
					$("#policyTypeULIPSpan").show();
					$("#policyTypeULIP").show();
				}else{
					$("#policyTypeULIPLable").hide();
					$("#policyTypeULIPSpan").hide();
					$("#policyTypeULIP").hide();
				} 
			});
            

			getClientDataAsyncFalse("GET", "", "AllFrequency", lifeInsuranceFrequencySuccess);

			function lifeInsuranceFrequencySuccess(data) {
				// console.log(data);
				var premiumPayFreq = $("#premiumPaymentFreq");
				premiumPayFreq.find('option').remove();
				premiumPayFreq.append('<option value="">Select Payment Frequency</option>');		
				$.each(data, function(index, item) {
					premiumPayFreq.append('<option value="' + item.id + '">' + item.description + '</option>');
				});
			}

			//***************************** Edit Life Insurance and auto populate**********************//	
			if (pageMode=="EDIT") {
				getSelectedLifeInsurance();
			} 
			
			//***************************** End populating form in Edit mode**********************//
      
                    
		$("#saveLifeInsurance").on("click", function(event) {
			unmaskAllAmountFields();
			selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
			if(validateInsurance($('#lifeInsuranceForm'))) {
				showLoaderOnSave("#saveLifeInsurance");
				window.setTimeout(function(){
				if (typeof selectedImageFamilyMemberid != 'undefined' && selectedImageFamilyMemberid!=null) {		  
					//	console.log("submit Add Fund Form");
					event.preventDefault();
					var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
					var formData = $('#lifeInsuranceForm').serializeToJSON();
												
					if (pageMode=="ADD") {
						//alert('Saving in Add Mode');	
						formData["clientID"] = selectedClientId;
						formData["familyMemberID"] = selectedImageFamilyMemberid;
		                //formData["policyNameID"] = selectedPolicyNameId;
		                formData["insuranceTypeID"] = 1;
		                //formData["insurancePolicyTypeID"] = 1;
						var data = JSON.stringify(formData);
						//getClientDataWithErrorHandling("POST", data,"createClientLifeInsurance",onAddFundSuccess, onAddLifeInsuranceError);
						saveData("POST", data,"createClientLifeInsurance",onAddFundSuccess);
						function onAddFundSuccess(data) {
							hideLoaderOnSave("#saveLifeInsurance");
							serviceurl = "clientLifeInsurance/client/" + selectedClientId;
							getClientData("GET", "", serviceurl, onSuccess);
							function onSuccess(data) {
								sessionStorage.setItem("LIFE_INSURANCE_LIST", JSON.stringify(data));
								$("#idClient").empty();
								$("#idClient").load("clientInfo/viewLifeInsurance.html");
								$(".dashboardheading    ").html("");
								$(".dashboardheading    ").html("Life Insurance");
								$("#addRecord").removeClass('btn_Disabled');
								$('#editRecord').addClass('btn_Disabled');
								$('#deleteRecord').addClass('btn_Disabled');
							}
						}
						/*function onAddLifeInsuranceError(err) {
							$("#alertform").text("Error saving life insurance information. Please try after sometime or contact system administrator.");
							$(window).scrollTop(0);
							hideLoaderOnSave("#saveLifeInsurance");
							//return false;				
						}	*/
						 
					} 
					else if (pageMode=="EDIT") {
						//alert('Saving in Edit Mode');	
						formData["clientID"]=selectedClientId;
						formData["familyMemberID"]=sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
						formData["id"] =  selectedLifeInsuranceId; 	
						//formData["policyNameID"] = selectedPolicyNameId;
						formData["insuranceTypeID"] = 1;
						var formData = JSON.stringify(formData);
						saveData("POST", formData,"editClienLifeInsurance",onEditFundSuccess);
						function onEditFundSuccess(data) {
							serviceurl = "clientLifeInsurance/client/" + selectedClientId;
							getClientData("GET", "", serviceurl, onSuccess);
							function onSuccess(data) {
								hideLoaderOnSave("#saveLifeInsurance");
								//alert('In Edit save success');									
								sessionStorage.setItem("LIFE_INSURANCE_LIST", JSON.stringify(data));
								$("#idClient").empty();
								$("#idClient").load("clientInfo/viewLifeInsurance.html");
								$(".dashboardheading    ").html("");
								$(".dashboardheading    ").html("Life Insurance");
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
		
		$("#insuranceCompanyList").focus();	

		$('#focusguard-2').on('focus', function() {
			  // "last" focus guard got focus: set focus to the first field
			$("#insuranceCompanyList").focus();	
			$(window).scrollTop(0);
		});

					
		$("#undo").on("click",
				function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});
		});
	
	function myDatePicker() {
		$("#policyStartDate").datepicker('remove');
		$("#idLockedUptoDate").datepicker('remove');
		$("#idLocDate").datepicker('remove');
		if (pageMode=="EDIT") {
			$("#policyStartDate").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : false,
				todayBtn : true,
				autoclose : true,
				forceParse: false,	
				startDate : window.client_dob,
				endDate : new Date()
			}).on('changeDate', function(ev){
				$("#saveLifeInsurance").prop("disabled", false);
				$("#alertpsd").text('');
				$("#idPolicyStartDateGroup").css('border','1px solid #ccc');				
				$("#idPolicyStartDateGroup").css('borderRadius','7px');	
			});
			
			$("#idLocDate").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : false,
				todayBtn : true,
				forceParse: false,			
				autoclose : true,
				startDate : window.client_dob
			})
			
			$("#idLockedUptoDate").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : false,
				todayBtn : true,
				forceParse: false,			
				autoclose : true
			}).on('changeDate', function(ev){
				$("#alertlud").css('color','');
				$("#alertlud").text("");
				$("#idLockedUptoDateGroup").css('border','');
				$("#saveLifeInsurance").prop("disabled", false);
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
				$("#saveLifeInsurance").prop("disabled", false);
				$("#alertpsd").text('');
				$("#idPolicyStartDateGroup").css('border','1px solid #ccc');				
				$("#idPolicyStartDateGroup").css('borderRadius','7px');	
			});
			
			$("#idLockedUptoDate").datepicker({
				format : "dd/mm/yyyy",
				todayHighlight : true,
				todayBtn : true,
				forceParse: false,			
				autoclose : true
			}).on('changeDate', function(ev){
				$("#alertlud").css('color','');
				$("#alertlud").text("");
				$("#idLockedUptoDateGroup").css('border','');
				$("#saveLifeInsurance").prop("disabled", false);
			});
		}
		
	}
	
	function undoChange(){
		//alert("inside undoChange");
		updatedUNDO();
		
		if (pageMode=="ADD") {
			$(".form-control").val("");
			var policyType = $("#lifeInsurancePolicyType").val();
			if (policyType == "") {
				$("#idOtherPolicyType").prop("disabled", true);
			}
		} else {
			if (pageMode=="EDIT") {
				getSelectedLifeInsurance();
			}
		}
		
	}
	
	function updatedUNDO(){
		var lInsuranceCompany = document.getElementById("insuranceCompanyList");
		var lInsurancePolicyType = document.getElementById("lifeInsurancePolicyType");
		var lOtherInsurancePolicyType = document.getElementById("idOtherPolicyType");
		var lPolicyName = document.getElementById("lifeInsurancePolicyName");
		var lPolicyNumber = document.getElementById("policyNumber");
		var lSumInsured = document.getElementById("sumInsured");
		var lPolicyStartDate = document.getElementById("policyStartDate");
		var lPolicyStartDateGroup = document.getElementById("idPolicyStartDateGroup");
		var lPremium = document.getElementById("premiumAmount");
		var lPremiumPaymentFrequency = document.getElementById("premiumPaymentFreq");
		var lPolicyTenure = document.getElementById("policyTenure");
		var lPremiumPaymentTenure = document.getElementById("premiumTenure");
		var lLockedUptoDate = document.getElementById("idLockedUptoDate");
		var lLockedUptoDateGroup = document.getElementById("idLockedUptoDateGroup");
	
		lInsuranceCompany.style.border = "";
		lInsurancePolicyType.style.border = "";
		lOtherInsurancePolicyType.style.border = "";
		lPolicyName.style.border = "";
		lPolicyNumber.style.border = "";
		lSumInsured.style.border = "";
		lPolicyStartDate.style.border = "";
		lPolicyStartDateGroup.style.border = "";
		lPolicyStartDateGroup.style.borderRadius = "";
		lPremium.style.border = "";
		lPremiumPaymentFrequency.style.border = "";
		lPolicyTenure.style.border = "";
		lPremiumPaymentTenure.style.border = "";
		lLockedUptoDate.style.border = "";
		lLockedUptoDateGroup.style.border = "";
		
		document.getElementById('alertsic').innerHTML="";
		document.getElementById('alertsipt').innerHTML="";
		document.getElementById('alertoipt').innerHTML="";
		document.getElementById('alertipn').innerHTML="";
		document.getElementById('alertipnum').innerHTML="";
		document.getElementById('alertsi').innerHTML="";
		document.getElementById('alertpsd').innerHTML="";
		document.getElementById('alertp').innerHTML="";
		document.getElementById('alertppf').innerHTML="";
		document.getElementById('alertpt').innerHTML="";
		document.getElementById('alertppt').innerHTML="";
		document.getElementById('alertlud').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	function getSelectedLifeInsurance(){
		//alert('Populating in Edit Mode');							
        var savedpolicyNumber;
	
		getClientData("GET", "", "clientLifeInsurance/"+selectedLifeInsuranceId, onGetLifeInsuraceDataSuccess);
		function onGetLifeInsuraceDataSuccess(data) {
			console.log(JSON.stringify(data));
			sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberID)
			poupulateFamilyMemberImage(data.familyMemberID);
			populateForm($('#lifeInsuranceForm'),data);
			
			myDatePicker();
			
			maskAllAmountFields();
            savedpolicyNumber=data.policyNumber;
            
            if (data.insurancePolicyTypeID != 7) {
				$("#idOtherPolicyType").attr("disabled", "disabled"); 
			} else {
				if (data.insurancePolicyTypeID == 7) {
					$("#idOtherPolicyType").removeAttr("disabled");
				}
			}
			
            $("#insuranceCompanyList option").filter(function() {
            	//alert('Company ID: '+data.companyNameID);
				return this.value==data.companyNameID;				    
			}).prop('selected', true);
									
			$("#lifeInsurancePolicyType option").filter(function() {
            	//alert('Policy Type ID: '+data.insurancePolicyTypeID);
				return this.value==data.insurancePolicyTypeID;				    
			}).prop('selected', true);
		
				if($("#lifeInsurancePolicyType").val()==5) {
					$("#policyTypeULIPLable").show();
					$("#policyTypeULIPSpan").show();
					$("#policyTypeULIP").show();
				}
				
            $("#premiumPaymentFreq option").filter(function() {
				return this.value==data.premiumFrequency;				    
			}).prop('selected', true);

		} 
	}
	function toggleOtherPolicyType()
	{
	    if (document.getElementById("lifeInsurancePolicyType").value == 7) {
    		document.getElementById("idOtherPolicyType").disabled=false;
		} else {
			document.getElementById("idOtherPolicyType").value="";
    		document.getElementById("idOtherPolicyType").disabled=true;
			}
	}
			
		function maskAllAmountFields() {
			maskAmount('#sumInsured');
			maskAmount('#premiumAmount');
		}
		function unmaskAllAmountFields() {
			unmaskAmount('#sumInsured');
			unmaskAmount('#premiumAmount');
		}
		
		function onCustomImageClick(){  
		selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	    var serviceurl = '/clientFamilyMember/'+selectedImageFamilyMemberid;
	    getClientData("GET", "", serviceurl, onSuccess);
	    function onSuccess(data) {
	        console.log(data);
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
	    	
	         $("#policyStartDate").datepicker('remove'); 
	         
	         $("#policyStartDate").datepicker({
					format : "dd/mm/yyyy",
					todayHighlight : true,
					todayBtn : true,
					autoclose : true,
					forceParse: false,		
					startDate : window.client_dob,
					endDate : new Date()
				}).on('changeDate', function(ev){
					
					$(this).focus().datepicker('hide');
					$("#alertpsd").text('');
					$("#idPolicyStartDateGroup").css('border','1px solid #ccc');				
					$("#idPolicyStartDateGroup").css('borderRadius','7px');	
					
					$(this).blur(function() {
						
							var iMaturityDate='';
							//alert("policy tenure value: " + $("#policyTenure").val());
							
							if($("#policyTenure").val() != "") {
								iMaturityDate=moment($(this).val(),'DD/MM/YYYY').add($("#policyTenure").val(),'years').format('DD/MM/YYYY');
								$("#idLockedUptoDate").val(iMaturityDate);
							}
							
					        var index = +$(this).attr("tabindex") + 1;
					        $("[tabindex='" + index +"']").focus();
						
						
					});
					
				});
				
				$("#policyTenure").blur(function() {
					
					var iMaturityDate;
					
					if ($(this).val() != "" && lPolicyStartDate.value != "") {
						iMaturityDate = moment(lPolicyStartDate.value,'DD/MM/YYYY').add($("#policyTenure").val(),'years').format('DD/MM/YYYY');
					} else {
						iMaturityDate = "";
					}
					
					$("#idLockedUptoDate").val(iMaturityDate);
							
				});
	        
	         $("#idLockedUptoDate").datepicker('remove'); 
	         
	         $("#idLockedUptoDate").datepicker({
					format : "dd/mm/yyyy",
					todayHighlight : true,
					todayBtn : true,
					//forceParse: false,			
					autoclose : true
				});  
	    }
	}

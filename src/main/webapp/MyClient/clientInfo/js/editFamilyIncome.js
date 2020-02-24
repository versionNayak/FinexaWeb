var retirementAge=0;
var lifeExpAge=0;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(
			function() {
				
				//new code for access rights
				if(loggedClient != null && loggedClient.role === "Client"){
						if(loggedClient.clientInfoAddEdit === "Y"){
							$("#save").show();
							$("#idUndo").show();
						}else if(loggedClient.clientInfoView === "Y"){
							$("#save").hide();
							$("#idUndo").hide();
								
						}
					}else if(loggedUser != null && loggedUser.role === "Admin"){
						$("#save").hide();
						$("#idUndo").hide();
					}else{
						if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
							$("#save").show();
							$("#idUndo").show();
						}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
							$("#save").hide();
							$("#idUndo").hide();
						}
					}
				
				 $('#editRecord').addClass('btn_Disabled');
			    // $('#deleteRecord').addClass('btn_Disabled');
		
				/* confirmatioCustomClickModalMessage("messag",'messageConfirm');
				$("#messageConfirm").on("click", function(event) {
					alert("okokok");
					});
				 */
				sessionStorage.setItem("CLIENT_SERVICE_URL", ClientServiceUrl);
				selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");

				getClientDataAsyncFalse("GET", "", "clientFamilyMember/" + sessionStorage.getItem("SELECTED_Member_ID"), retirementAgeSuccess);
							
				populateDropdownFrequency("Select", $("#idSalaryFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idSalaryReferenceMonth"),'/AllMonths', 13);
				//populateDropdownYear("Select", $("#idSalaryYearTill"),'/AllYears', 2);
				
				populateDropdownFrequency("Select", $("#idBonusFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idBonusReferenceMonth"),'/AllMonths', 13);
				//populateDropdownYear("Select", $("#idBonusYearTill"),'/AllYears', 2);
				
				populateDropdownFrequency("Select", $("#idBusinessIncomeFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idBusinessIncomeReferenceMonth"),'/AllMonths', 13);
				//populateDropdownYear("Select", $("#idBusinessIncomeYearTill"),'/AllYears', 2);
				
				populateDropdownFrequency("Select", $("#idProfessionalFeesFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idProfessionalFeesReferenceMonth"),'/AllMonths', 13);
				//populateDropdownYear("Select", $("#idProfessionalFeesYearTill"),'/AllYears', 2);
				
				populateDropdownFrequency("Select", $("#idRentalIncomeFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idRentalIncomeReferenceMonth"),'/AllMonths', 13);
				//populateDropdownYear("Select", $("#idRentalIncomeYearTill"),'/AllYears', 2);
				
				populateDropdownFrequency("Select", $("#idPensionFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idPensionReferenceMonth"),'/AllMonths', 13);
				//populateDropdownYear("Select", $("#idPensionYearTill"),'/AllYears', 2);
				
				populateDropdownFrequency("Select", $("#idOtherIncomeFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idOtherIncomeReferenceMonth"),'/AllMonths', 13);
//				/populateDropdownYear("Select", $("#idOtherIncomeYearTill"),'/AllYears', 2);
				
				//populateDropdownYear("Select", $("#idTotalIncomeYearTill"),'/AllYears', 2);

							/* familyMemberImageByClientId(selectedClientId,
									$("#familyMemberImage")); */
							
							//populateFamilyMemberByClientId(selectedClientId,$("#familyMemberImage"));
							
							editData('familyIncome/'
									+ sessionStorage.getItem("SELECTED_CLIENT_ID") + '/'
									+ sessionStorage.getItem("SELECTED_Member_ID"));
							
							maskAllAmountFields();
							//////console.log("ClientServiceUrl "+ClientServiceUrl);
							checkIfIncomePresentForAll('checkIfIncomePresentForAll/'+sessionStorage.getItem("SELECTED_CLIENT_ID")); 
			});
function maskAllAmountFields() {
//	alert("hi ");
	maskAmount('#idSalaryAmount');
	maskAmount('#idBonusAmount');
	maskAmount('#idBusinessIncomeAmount');
	maskAmount('#idProfessionalFeesAmount');
	maskAmount('#idRentalIncomeAmount');
	maskAmount('#idPensionAmount');
	maskAmount('#idOtherIncomeAmount');
	maskAmount('#idTotalIncomeAmount');
	
	maskAmount('#idRunningTotal');
}
function unmaskAllAmountFields() {
    unmaskAmount('#idSalaryAmount');
	unmaskAmount('#idBonusAmount');
	unmaskAmount('#idBusinessIncomeAmount');
	unmaskAmount('#idProfessionalFeesAmount');
	unmaskAmount('#idRentalIncomeAmount');
	unmaskAmount('#idPensionAmount');
	unmaskAmount('#idOtherIncomeAmount');
	unmaskAmount('#idTotalIncomeAmount');

	
}
	function checkIfIncomePresentForAll(serviceUrl){
		//	alert("checkIfIncomePresentForAll "+serviceUrl);
		getClientData("GET", "", serviceUrl, onCheckSuccess);
		function onCheckSuccess(data) {
			//////console.log("data.length "+data.length);

			if(data.length==0){

				
				//alert("data.length "+data.length);
				$('#addRecord').addClass('btn_Disabled');
				

			}else{
				
				$('#addRecord').removeClass('btn_Disabled');

			}
		}
	}

	var SELECTED_FAMILY_MEMBER_ID;
	function editData(serviceURL) {
		//		//////console.log("serviceURL " + serviceURL);
		var length = $('#idTotalIncomeYearTill > option').length;
		//alert("l "+length);
		getClientData("GET", "", serviceURL, onEditSuccess);
		function onEditSuccess(income1) {

			i = 1, j = 1;
			$.each(income1, function(key, income) {

				if (i == 1) {
				$("#idOptionHidden").val(income.option);

				$("input[name=option][value="+ income.option+ "]").prop('checked', true);
									
				sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",income.familyMemberId);
				familyMemberImageByMemberId(income.familyMemberId,income.firstName,income.relationId,income.relationName,income.gender,$("#familyMemberImage"));
									
								
				if ($("#idOptionI").is(":checked")) {

					$("#show-me-two").hide();
					$("#show-me").show();
					$("#idSalaryAmount").focus();

				} else {
					if ($("#idOptionT").is(":checked")) {
						//$("#idTotalIncomeAmount").removeAttr("readonly");

						$("#show-me").hide();
						$("#show-me-two").show();
						$("#idTotalIncomeAmount").focus();

					}
				}

									
									/* populateMember(
											$("#idMember"),
											sessionStorage
													.getItem("CLIENT_SERVICE_URL")
													+ '/clientFamilyMember/client/'
													+ sessionStorage
															.getItem("SELECTED_CLIENT_ID"),
											income.relationId); */
								}
								i = i + 1;
								if (income.option == 'I') {
									$('#idRunningTotal').val(maskAmountValue(income.total));
									
									console
											.log("income.incomeType "
													+ income.incomeType);

									if (income.incomeType == 1) {
										$(
												"input[name='option']:checked")
												.val(income.option);
										$("#idIncomeIdSalary").val(
												income.id);
										//	 $('input[name=familyMember]:checked').val(income.familyMemberId);
										$("#idIncomeTypeSalary")
												.val(
														income.incomeType);
										$("#idSalaryAmount").val(maskAmountValue(income.incomeAmount));
									
                                      
										 /*populateDropdownFrequency(
												"Select",
												$("#idSalaryFrequency"),
												'/AllFrequency',
												income.incomeFrequency
												);*/ 
										 $("#idSalaryFrequency option").filter(function() {
												return this.value==income.incomeFrequency;
									      }).prop('selected', true);
										 
										if(income.incomeFrequency!=12){
											document.getElementById("idSalaryReferenceMonth").disabled = false;	
										}
										/*populateDropdownMonth(
												"Select",
												$("#idSalaryReferenceMonth"),
												'/AllMonths',
												income.referenceMonth
											);
										populateDropdownYear(
												"Select",
												$("#idSalaryYearTill"),
												'/AllYears',
												income.incomeEndYear
											);*/
										
										 $("#idSalaryReferenceMonth option").filter(function() {
												return this.value==income.referenceMonth;
									      }).prop('selected', true);
										
									//	 $('#idUtilitiesYearTill').val(expense.endYear);
										 $("#idSalaryYearTill option").filter(function() {
												return this.value==income.incomeEndYear;
									      }).prop('selected', true);
										 
										 
										

									}
									if (income.incomeType == 2) {

										$(
												"input[name='option']:checked")
												.val(income.option);
										$("#idIncomeIdBonus").val(
												income.id);
										//	 $('input[name=familyMember]:checked').val(income.familyMemberId);
										$("#idIncomeTypeBonus")
												.val(
														income.incomeType);
										$("#idBonusAmount").val(maskAmountValue(income.incomeAmount));

									/*	populateDropdownFrequency(
												"Select",
												$("#idBonusFrequency"),
												'/AllFrequency',
												income.incomeFrequency
												);
										if(income.incomeFrequency!=12){
											document.getElementById("idBonusReferenceMonth").disabled = false;	
										}
										populateDropdownMonth(
												"Select",
												$("#idBonusReferenceMonth"),
												'/AllMonths',
												income.referenceMonth
												);
										populateDropdownYear(
												"Select",
												$("#idBonusYearTill"),
												'/AllYears',
												income.incomeEndYear
												);
										*/
										 $("#idBonusFrequency option").filter(function() {
												return this.value==income.incomeFrequency;
									      }).prop('selected', true);
										 
											if(income.incomeFrequency!=12){
												document.getElementById("idBonusReferenceMonth").disabled = false;	
											}
										
										 $("#idBonusReferenceMonth option").filter(function() {
												return this.value==income.referenceMonth;
									      }).prop('selected', true);
										
										 $("#idBonusYearTill option").filter(function() {
												return this.value==income.incomeEndYear;
									      }).prop('selected', true);

									}
									if (income.incomeType == 3) {
										$(
												"input[name='option']:checked")
												.val(income.option);
										$("#idIncomeIdBusiness")
												.val(income.id);
										//	 $('input[name=familyMember]:checked').val(income.familyMemberId);
										$("#idIncomeTypeBusiness").val(income.incomeType);
										$("#idBusinessIncomeAmount").val(maskAmountValue(income.incomeAmount));

										/*populateDropdownFrequency(
												"Select",
												$("#idBusinessIncomeFrequency"),
												'/AllFrequency',
												income.incomeFrequency
												);
										if(income.incomeFrequency!=12){
											document.getElementById("idBusinessIncomeReferenceMonth").disabled = false;	
										}
										populateDropdownMonth(
												"Select",
												$("#idBusinessIncomeReferenceMonth"),
												'/AllMonths',
												income.referenceMonth
												);
										populateDropdownYear(
												"Select",
												$("#idBusinessIncomeYearTill"),
												'/AllYears',
												income.incomeEndYear
												);*/
										$("#idBusinessIncomeFrequency option").filter(function() {
											return this.value==income.incomeFrequency;
								      }).prop('selected', true);
									 
										if(income.incomeFrequency!=12){
											document.getElementById("idBusinessIncomeFrequency").disabled = false;	
										}
									
									 $("#idBusinessIncomeReferenceMonth option").filter(function() {
											return this.value==income.referenceMonth;
								      }).prop('selected', true);
									
									 $("#idBusinessIncomeYearTill option").filter(function() {
											return this.value==income.incomeEndYear;
								      }).prop('selected', true);

									}

									if (income.incomeType == 4) {
										$(
												"input[name='option']:checked")
												.val(income.option);
										$("#idIncomeIdProfessional")
												.val(income.id);
										//	 $('input[name=familyMember]:checked').val(income.familyMemberId);
										$(
												"#idIncomeTypeProfessional")
												.val(income.incomeType);
										$(
												"#idProfessionalFeesAmount")
												.val(maskAmountValue(income.incomeAmount));

								/*		populateDropdownFrequency(
												"Select",
												$("#idProfessionalFeesFrequency"),
												'/AllFrequency',
												income.incomeFrequency
												);
										if(income.incomeFrequency!=12){
											document.getElementById("idProfessionalFeesReferenceMonth").disabled = false;	
										}
										populateDropdownMonth(
												"Select",
												$("#idProfessionalFeesReferenceMonth"),
												'/AllMonths',
												income.referenceMonth
												);
										populateDropdownYear(
												"Select",
												$("#idProfessionalFeesYearTill"),
												'/AllYears',
												income.incomeEndYear
												);*/
										
										$("#idProfessionalFeesFrequency option").filter(function() {
											return this.value==income.incomeFrequency;
								      }).prop('selected', true);
									 
										if(income.incomeFrequency!=12){
											document.getElementById("idProfessionalFeesFrequency").disabled = false;	
										}
									
									 $("#idProfessionalFeesReferenceMonth option").filter(function() {
											return this.value==income.referenceMonth;
								      }).prop('selected', true);
									
									 $("#idProfessionalFeesYearTill option").filter(function() {
											return this.value==income.incomeEndYear;
								      }).prop('selected', true);
								

									}

									if (income.incomeType == 5) {
	
										$(
												"input[name='option']:checked")
												.val(income.option);
										$("#idIncomeIdRental").val(
												income.id);
										//	 $('input[name=familyMember]:checked').val(income.familyMemberId);
										$("#idIncomeTypeRental")
												.val(
														income.incomeType);
										$("#idRentalIncomeAmount")
												.val(maskAmountValue(income.incomeAmount));
										
										/*populateDropdownFrequency(
												"Select",
												$("#idRentalIncomeFrequency"),
												'/AllFrequency',
												income.incomeFrequency
												);
										
										if(income.incomeFrequency!=12){
											document.getElementById("idRentalIncomeReferenceMonth").disabled = false;	
										}
										populateDropdownMonth(
												"Select",
												$("#idRentalIncomeReferenceMonth"),
												'/AllMonths',
												income.referenceMonth
												);
										populateDropdownYear(
												"Select",
												$("#idRentalIncomeYearTill"),
												'/AllYears',
												income.incomeEndYear
												);*/
										$("#idRentalIncomeFrequency option").filter(function() {
											return this.value==income.incomeFrequency;
								      }).prop('selected', true);
									 
										if(income.incomeFrequency!=12){
											document.getElementById("idRentalIncomeFrequency").disabled = false;	
										}
									
									 $("#idRentalIncomeReferenceMonth option").filter(function() {
											return this.value==income.referenceMonth;
								      }).prop('selected', true);
									
									 $("#idRentalIncomeYearTill option").filter(function() {
											return this.value==income.incomeEndYear;
								      }).prop('selected', true);
									 
									
									}
									if (income.incomeType == 6) {
										
										if (income.incomeAmount != 0) {
											$("input[name='option']:checked").val(income.option);
											$("#idIncomeIdPension").val(income.id);
											//		 $('input[name=familyMember]:checked').val(income.familyMemberId);
											$("#idIncomeTypePension").val(income.incomeType);
											$("#idPensionAmount").val(maskAmountValue(income.incomeAmount));

									/*		populateDropdownFrequency(
													"Select",
													$("#idPensionFrequency"),
													'/AllFrequency',
													income.incomeFrequency);
											
											if(income.incomeFrequency!=12){
												document.getElementById("idPensionReferenceMonth").disabled = false;	
											}
											populateDropdownMonth(
													"Select",
													$("#idPensionReferenceMonth"),
													'/AllMonths',
													income.referenceMonth);
											populateDropdownYear(
													"Select",
													$("#idPensionYearTill"),
													'/AllYears',
													income.incomeEndYear);*/
											$("#idPensionFrequency option").filter(function() {
												
												return this.value==income.incomeFrequency;
									      }).prop('selected', true);
										 
											if(income.incomeFrequency!=12){
												document.getElementById("idPensionFrequency").disabled = false;	
											}
										
										 $("#idPensionReferenceMonth option").filter(function() {
												return this.value==income.referenceMonth;
									      }).prop('selected', true);
										
										 $("#idPensionYearTill option").filter(function() {
											
												return this.value==income.incomeEndYear;
									      }).prop('selected', true);
										} 
									}
									if (income.incomeType == 7) {
									
										$(
												"input[name='option']:checked")
												.val(income.option);
										$("#idIncomeIdOthers").val(
												income.id);

										$("#idIncomeTypeOthers")
												.val(income.incomeType);
										$("#idOtherIncomeAmount").val(maskAmountValue(income.incomeAmount));

									/*	populateDropdownFrequency(
												"Select",
												$("#idOtherIncomeFrequency"),
												'/AllFrequency',income.incomeFrequency);
										if(income.incomeFrequency!=12){
											document.getElementById("idOtherIncomeReferenceMonth").disabled = false;	
										}
										populateDropdownMonth(
												"Select",
												$("#idOtherIncomeReferenceMonth"),
												'/AllMonths',
												income.referenceMonth
									);
										populateDropdownYear(
												"Select",
												$("#idOtherIncomeYearTill"),
												'/AllYears',
												income.incomeEndYear);*/
										$("#idOtherIncomeFrequency option").filter(function() {
											
											return this.value==income.incomeFrequency;
								      }).prop('selected', true);
									 
										if(income.incomeFrequency!=12){
											document.getElementById("idOtherIncomeFrequency").disabled = false;	
										}
									
									 $("#idOtherIncomeReferenceMonth option").filter(function() {
										
											return this.value==income.referenceMonth;
								      }).prop('selected', true);
									
									 $("#idOtherIncomeYearTill option").filter(function() {
										  
											return this.value==income.incomeEndYear;
								      }).prop('selected', true);

									}
								} else {
									if (income.incomeType == 8) {
										console
												.log("pp "
														+ income.incomeType);
										$("#idIncomeIdTotal").val(
												income.id);
										//	 $('input[name=familyMember]:checked').val(income.familyMemberId);
										$("#idIncomeTypeTotal")
												.val(income.incomeType);
										$("#idTotalIncomeAmount")
												.val(maskAmountValue(income.incomeAmount));
										
										$(
												"#idTotalIncomeReferenceMonth")
												.val(
														income.referenceMonth);
										
										

										/*populateDropdownYear(
												"Select",
												$("#idTotalIncomeYearTill"),
							
												'/AllYears',
												income.incomeEndYear);*/
									
										
										 $("#idTotalIncomeYearTill option").filter(function() {
												return this.value==income.incomeEndYear;
									      }).prop('selected', true);
										 
										 
										 // $("#idTotalIncomeYearTill").val(income.incomeEndYear).attr("selected","selected");
										
									// $("#idTotalIncomeYearTill").val(income.incomeEndYear);

									}
								}

							});
			if(loggedClient != null && loggedClient.role === "Client"){
				if((loggedClient.clientInfoAddEdit != null || loggedClient.clientInfoAddEdit === "N") && loggedClient.clientInfoView === "Y" ){
					//alert($("#idOptionHidden").val())
					if ($("#idOptionHidden").val() == "T") {
						$("#idOptionT").show();
						$("#idOptionTSpan").show();
						$("#idOptionI").hide();
						$("#idOptionISpan").hide();
					} else if ($("#idOptionHidden").val() == "I") {
						$("#idOptionI").show();
						$("#idOptionISpan").show();
						$("#idOptionT").hide();
						$("#idOptionTSpan").hide();
					}
				}
			}
			
		
		}

	//	maskAllAmountFields();

	}
	
	function populateDropdownFrequency(name, dropdownId, serviceUrl, selectedValue) {
		getClientDataAsyncFalse("GET", "", serviceUrl, populateDropdownFrequencySuccess);
		function populateDropdownFrequencySuccess(data) {
			dropdownId.find('option').remove();
			//dropdownId.append('<option value="0" selected>Select ' + name + '</option>');
			dropdownId.append('<option value="" selected>Select</option>');
			$.each(
							data,
							function(index, item) {
								if (item.id == selectedValue) {
									dropdownId
											.append('<option value="' + item.id + '" selected>'
													+ item.description
													+ '</option>');
								} else {
									dropdownId
											.append('<option value="' + item.id + '" >'
													+ item.description
													+ '</option>');
								}

							});
		}
	
	}
	
	function populateDropdownMonth(name, dropdownId, serviceUrl, selectedValue) {
		getClientDataAsyncFalse("GET", "", serviceUrl, populateDropdownMonthSuccess);
		function populateDropdownMonthSuccess(data) {
			dropdownId.find('option').remove();
			//dropdownId.append('<option value="0" selected>Select ' + name + '</option>');
			dropdownId.append('<option value="" selected>Select</option>');
			$.each(
							data,
							function(index, item) {
								if (item.id == selectedValue) {
									dropdownId
											.append('<option value="' + item.id + '" selected>'
													+ item.description
													+ '</option>');
								} else {
									dropdownId
											.append('<option value="' + item.id + '" >'
													+ item.description
													+ '</option>');
								}

							});
		}
		
	}
	
	function populateDropdownYear(name, dropdownId, serviceUrl, selectedValue) {
		var lifeExpId = 0;
		getClientDataAsyncFalse("GET", "", serviceUrl, populateDropdownYearSuccess);
		function populateDropdownYearSuccess(data) {
			if(retirementAge==null){
				selectedValue=3;
			}
			if(lifeExpAge == null){
				lifeExpId = 4;
			}
		
			dropdownId.find('option').remove();
			//dropdownId.append('<option value="0" selected>Select ' + name + '</option>');
			dropdownId.append('<option value="" selected>Select</option>');
			$.each(
							data,
							function(index, item) {
								
							/*	if (item.id == selectedValue) {
									if(lifeExpId!=4){
									dropdownId
											.append('<option value="' + item.id + '" selected>'
													+ item.description
													+ '</option>');
									}
								}*/ /*else {
									if(retirementAge!=null ||  item.id!=2 || lifeExpId!=4){
									dropdownId
											.append('<option value="' + item.id + '" >'
													+ item.description
													+ '</option>');
									}
								}*/
								if(item.id==2 ){
									if(retirementAge!=null ){
									 
							         if(selectedValue==2){
								dropdownId
										.append('<option value="' + item.id + '" selected>'
												+ item.description
												+ '</option>');
							         }else{
							        	 dropdownId
											.append('<option value="' + item.id + '" >'
													+ item.description
													+ '</option>'); 
							         }
								}
							}
							if(item.id==3){
									if(lifeExpAge!=null ){

							         if(selectedValue==3){
											dropdownId
													.append('<option value="' + item.id + '" selected>'
															+ item.description
															+ '</option>');
										         }else{
										        	 dropdownId
														.append('<option value="' + item.id + '" >'
																+ item.description
																+ '</option>'); 
										         }
								}
							}
							if(item.id!=2 && item.id!=3){
								
							dropdownId
									.append('<option value="' + item.id + '" >'
											+ item.description
											+ '</option>');
							}
					

							});
		}
	}

	
	$(function() {

	//Edit
	 	$("#idOptionI, #idOptionT").change(function() {

			if ($("#idOptionI").is(":checked")) {
				if ($("#idOptionHidden").val() == "T") {
		        //	var message="idOptionI checked  idOptionHidden T";
				//	confirmatioCustomClickModalMessage("Total expense will be deleted and individual income heads will be saved. Please confirm.",'messageConfirm');
				
				  bootbox.confirm({
					  title: "Change from Total to Individual income",
				    	message: "Total income will be deleted and individual income heads will be saved. Please confirm.",
					    	callback: function (result) {
					    		 if (result === true) {
				    			 $("#show-me-two").hide();
				 				 $("#show-me").show();	
				 				 
	    			 			}
		    	 				else{
		     					$("#show-me-two").show();
				 				$("#show-me").hide();	
				 				$("#idOptionT").prop("checked", true); 
		    	 				}
	    	 				}	
	            		});
					
			 	}else{
			 		$("#show-me-two").hide();
					$("#show-me").show();
					$("#idTotalExpenseAmount").focus();
			}
			}
			else {
				if ($("#idOptionT").is(":checked")) {
					
					if ($("#idOptionHidden").val() == "I") {
						
					//	var message="idOptionT checked  idOptionHidden I";
						//confirmatioCustomClickModalMessage("Individual expense heads will be deleted and total income will be saved. Please confirm.",'messageConfirm');
						  bootbox.confirm({
							 title: "Change from Individual to Total income",
						     message: "Individual income heads will be deleted and total income will be saved. Please confirm.",
					    	callback: function (result) {
					    		 if (result === true) {
				    			    $("#show-me").hide();
									$("#show-me-two").show();
									$("#idTotalExpenseAmount").focus();
	    			 			}
		    	 				else{
		     					$("#show-me-two").hide();
				 				$("#show-me").show();	
				 				$("#idOptionI").prop("checked", true); 
		    	 				}
	    	 				}	
	            		});
					} else{
						$("#show-me").hide();
						$("#show-me-two").show();
						$("#idExpenseTypeGrocery").focus();
					}

				}
			}

		}); 


	});

	$("#save").on("click", function(event) {
		SELECTED_FAMILY_MEMBER_ID=sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
		
		unmaskAllAmountFields();
		b=validateIncome(SELECTED_FAMILY_MEMBER_ID);
		if(b) {
		showLoaderOnSave("#save");	
		window.setTimeout(function(){
		save('editFamilyIncome/');
		}, 5000);	
		}
	});

	function save(serviceUrl) {
		
		var option = $("input[name='option']:checked").val();
		if (option == 'I') {
			var obj = [ {
				option : $("input[name='option']:checked").val(),
				id : $("#idIncomeIdSalary").val(),
				clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
				 familyMemberId : SELECTED_FAMILY_MEMBER_ID, 
				//familyMemberId : $('input[name=familyMember]:checked').val(),
				incomeType : $("#idIncomeTypeSalary").val(),
				incomeAmount : $("#idSalaryAmount").val(),
				incomeFrequency : $("#idSalaryFrequency").val(),
				referenceMonth : $("#idSalaryReferenceMonth").val(),
				incomeEndYear : $("#idSalaryYearTill").val()

			}, {

				option : $("input[name='option']:checked").val(),
				id : $("#idIncomeIdBonus").val(),
				clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
				familyMemberId : SELECTED_FAMILY_MEMBER_ID, 
				incomeType : $("#idIncomeTypeBonus").val(),
				incomeAmount : $("#idBonusAmount").val(),
				incomeFrequency : $("#idBonusFrequency").val(),
				referenceMonth : $("#idBonusReferenceMonth").val(),
				incomeEndYear : $("#idBonusYearTill").val()

			}, {

				option : $("input[name='option']:checked").val(),
				id : $("#idIncomeIdBusiness").val(),
				clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
				familyMemberId : SELECTED_FAMILY_MEMBER_ID, 
				incomeType : $("#idIncomeTypeBusiness").val(),
				incomeAmount : $("#idBusinessIncomeAmount").val(),
				incomeFrequency : $("#idBusinessIncomeFrequency").val(),
				referenceMonth : $("#idBusinessIncomeReferenceMonth").val(),
				incomeEndYear : $("#idBusinessIncomeYearTill").val()

			}, {
				id : $("#idIncomeIdProfessional").val(),
				clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
				familyMemberId : SELECTED_FAMILY_MEMBER_ID, 
				incomeType : $("#idIncomeTypeProfessional").val(),
				incomeAmount : $("#idProfessionalFeesAmount").val(),
				incomeFrequency : $("#idProfessionalFeesFrequency").val(),
				referenceMonth : $("#idProfessionalFeesReferenceMonth").val(),
				incomeEndYear : $("#idProfessionalFeesYearTill").val(),
				option : $("input[name='option']:checked").val()
			}, {
				id : $("#idIncomeIdRental").val(),
				clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
				familyMemberId : SELECTED_FAMILY_MEMBER_ID, 
				incomeType : $("#idIncomeTypeRental").val(),
				incomeAmount : $("#idRentalIncomeAmount").val(),
				incomeFrequency : $("#idRentalIncomeFrequency").val(),
				referenceMonth : $("#idRentalIncomeReferenceMonth").val(),
				incomeEndYear : $("#idRentalIncomeYearTill").val(),
				option : $("input[name='option']:checked").val()
			}, {
				id : $("#idIncomeIdPension").val(),
				clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
				familyMemberId : SELECTED_FAMILY_MEMBER_ID, 
				incomeType : $("#idIncomeTypePension").val(),
				incomeAmount : $("#idPensionAmount").val(),
				incomeFrequency : $("#idPensionFrequency").val(),
				referenceMonth : $("#idPensionReferenceMonth").val(),
				incomeEndYear : $("#idPensionYearTill").val(),
				option : $("input[name='option']:checked").val()
			}, {
				id : $("#idIncomeIdOthers").val(),
				clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
				familyMemberId : SELECTED_FAMILY_MEMBER_ID, 
				incomeType : $("#idIncomeTypeOthers").val(),
				incomeAmount : $("#idOtherIncomeAmount").val(),
				incomeFrequency : $("#idOtherIncomeFrequency").val(),
				referenceMonth : $("#idOtherIncomeReferenceMonth").val(),
				incomeEndYear : $("#idOtherIncomeYearTill").val(),
				option : $("input[name='option']:checked").val()
			} ]
		} else {
			if (option == 'T') {


				var obj = [ {
					option : $("input[name='option']:checked").val(),
					id : $("#idIncomeIdTotal").val(),
					clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
					familyMemberId : SELECTED_FAMILY_MEMBER_ID, 
					incomeType : $("#idIncomeTypeTotal").val(),
					incomeAmount : $("#idTotalIncomeAmount").val(),
					incomeFrequency : $("#idTotalIncomeFrequency").val(),
					/* referenceMonth : $("#idTotalIncomeReferenceMonth").val(), */
					incomeEndYear : $("#idTotalIncomeYearTill").val()

				} ]
			}
		}

		data = JSON.stringify(obj);
		saveData("POST", data, serviceUrl, onEditSuccess);
		function onEditSuccess(data) {
			hideLoaderOnSave("#save");
            var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
    		viewServiceUrl = "familyIncome/"+ selectedClientId;
    		getClientData("GET", "",viewServiceUrl, onSuccess);	    	   	
    		function onSuccess(data){
    			//alert("success 2");
		 		sessionStorage.setItem("INCOME_LIST", JSON.stringify(data));
				$("#idClient").empty();
				$("#idClient").load("clientInfo/viewFamilyIncome.html");
				$(".dashboardheading").html("Family Income");
				$("#wrapper").css("height", "auto");
				$(".form-section-container").css("height", "auto");
			    $("#addRecord").removeClass('btn_Disabled');
                $('#editRecord').addClass('btn_Disabled');
                $('#deleteRecord').addClass('btn_Disabled');
    		}
		}
	}

	function setRefMonth(frequency) {

		if (frequency.value == 12) {

			if (frequency.name == "salaryFrequency") {
				document.getElementById("idSalaryReferenceMonth").value = 13;
				document.getElementById("idSalaryReferenceMonth").disabled = true;
			}
			if (frequency.name == "bonusFrequency") {
				document.getElementById("idBonusReferenceMonth").value = 13;
				document.getElementById("idBonusReferenceMonth").disabled = true;
			}
			if (frequency.name == "businessIncomeFrequency") {
				document.getElementById("idBusinessIncomeReferenceMonth").value = 13;
				document.getElementById("idBusinessIncomeReferenceMonth").disabled = true;
			}
			if (frequency.name == "professionalFeesFrequency") {
				document.getElementById("idProfessionalFeesReferenceMonth").value = 13;
				document.getElementById("idProfessionalFeesReferenceMonth").disabled = true;
			}
			if (frequency.name == "rentalIncomeFrequency") {
				document.getElementById("idRentalIncomeReferenceMonth").value = 13;
				document.getElementById("idRentalIncomeReferenceMonth").disabled = true;
			}
			if (frequency.name == "pensionFrequency") {
				document.getElementById("idPensionReferenceMonth").value = 13;
				document.getElementById("idPensionReferenceMonth").disabled = true;
			}
			if (frequency.name == "otherIncomeFrequency") {
				document.getElementById("idOtherIncomeReferenceMonth").value = 13;
				document.getElementById("idOtherIncomeReferenceMonth").disabled = true;
			}

		} else {

			if (frequency.name == "salaryFrequency") {
				document.getElementById("idSalaryReferenceMonth").value = "";
				document.getElementById("idSalaryReferenceMonth").options[0].text = "Select";
				document.getElementById("idSalaryReferenceMonth").disabled = false;
			}
			if (frequency.name == "bonusFrequency") {
				document.getElementById("idBonusReferenceMonth").value = "";
				document.getElementById("idBonusReferenceMonth").options[0].text = "Select";
				document.getElementById("idBonusReferenceMonth").disabled = false;
			}
			if (frequency.name == "businessIncomeFrequency") {
				document.getElementById("idBusinessIncomeReferenceMonth").value = "";
				document.getElementById("idBusinessIncomeReferenceMonth").options[0].text = "Select";
				document.getElementById("idBusinessIncomeReferenceMonth").disabled = false;
			}
			if (frequency.name == "professionalFeesFrequency") {
				document.getElementById("idProfessionalFeesReferenceMonth").value = "";
				document.getElementById("idProfessionalFeesReferenceMonth").options[0].text = "Select";
				document.getElementById("idProfessionalFeesReferenceMonth").disabled = false;
			}
			if (frequency.name == "rentalIncomeFrequency") {
				document.getElementById("idRentalIncomeReferenceMonth").value = "";
				document.getElementById("idRentalIncomeReferenceMonth").options[0].text = "Select";
				document.getElementById("idRentalIncomeReferenceMonth").disabled = false;
			}
			if (frequency.name == "pensionFrequency") {
				document.getElementById("idPensionReferenceMonth").value = "";
				document.getElementById("idPensionReferenceMonth").options[0].text = "Select";
				document.getElementById("idPensionReferenceMonth").disabled = false;
			}
			if (frequency.name == "otherIncomeFrequency") {
				document.getElementById("idOtherIncomeReferenceMonth").value = "";
				document.getElementById("idOtherIncomeReferenceMonth").options[0].text = "Select";
				document.getElementById("idOtherIncomeReferenceMonth").disabled = false;
			}
		}
	}
	
	/*$(function(){
	    $(".input-width-income-expense-add-amount").change(function(){
	    	//alert("Function on change edit amount");
	   		var totalAmount = 0;
	   		var thisAnnualAmount = 0;
	    	$(".input-width-income-expense-add-amount").each(function() {
	        	var elementId = this.id;
	        	var thisAmountId = "";
	        	var thisFrequencyId = "";
	        	var strAmount = "";
	        	var amount = 0;
	        	var frequency = 1;
	       		thisAmountId = elementId;
	       		thisFrequencyId = elementId.replace("Amount","Frequency");
	    		//alert("Frequeny Id: " + thisFrequencyId);
	    		//alert("Amount Id: " + thisAmountId);
	    		//alert("Frequency: " + $("#"+thisFrequencyId).val());
	    		//alert("Amount : " + $("#"+thisAmountId).val());
	    		//strAmount = $("#"+thisAmountId).val().replace('Rs.','').replace(',', '');
	    		strAmount = $("#"+thisAmountId).val().replace(/,/g, '');
	    		amount = strAmount*1;
	    	    frequency = $("#"+thisFrequencyId).val();
	    		//alert("Frequency: " + frequency);
	    		//alert("Amount : " + amount);
	    		if(!isNaN(frequency) && frequency.length!=0) {
	    			//alert('In Total Frequency numeric ');
	    			if(!isNaN(amount) && amount.length!=0) {
	        			//alert('In Total Amount numeric ');
	    				amount.toLocaleString();
		    			thisAnnualAmount = amount * frequency; 
	    				totalAmount += parseFloat(thisAnnualAmount);
	    				//alert("Total: " + totalAmount);
	    			}
				}
	    		
	    		if(!isNaN(this.value) && this.value.length!=0) {
	    			if(!isNaN($("#"+thisAmountId).val()) && $("#"+thisAmountId).val().length!=0) {
	    				$("#"+thisAmountId).val().toLocaleString();
		    			thisAnnualAmount = $("#"+thisAmountId).val() * $("#"+thisFrequencyId).val(); 
	    				totalAmount += parseFloat(thisAnnualAmount);
	    				alert("Total: " + totalAmount);
	    			}
				}
	    		
	    	})
	    	$("#idRunningTotal").val(totalAmount.toFixed(2));
	    	
	    })
	    
	      $(".input-width-income-expense-add-frequency").change(function(){
    	//alert("Function on change edit frequency");
   		var totalAmount = 0;
    	$(".input-width-income-expense-add-frequency").each(function() {
   	    	var elementId = this.id;
   	    	var thisAmountId = "";
   	    	var thisFrequencyId = "";
        	var strAmount = "";
        	var amount = 0;
        	var frequency = 1;
   	   		thisFrequencyId = elementId;
   	   		thisAmountId = elementId.replace("Frequency","Amount");

    		//alert("Frequeny Id: " + thisFrequencyId);
    		//alert("Amount Id: " + thisAmountId);
    		//alert("Frequency: " + $("#"+thisFrequencyId).val());
    		//alert("Amount : " + $("#"+thisAmountId).val());
    		//strAmount = $("#"+thisAmountId).val().replace('Rs.','').replace(/,/g, '');
    		strAmount = $("#"+thisAmountId).val().replace(/,/g, '');
    		amount = strAmount*1;
    	    frequency = $("#"+thisFrequencyId).val();
    		//alert("Frequency: " + frequency);
    		//alert("Amount : " + amount);
    		if(!isNaN(frequency) && frequency.length!=0) {
    			//alert('In Total Frequency numeric ');
    			if(!isNaN(amount) && amount.length!=0) {
        			//alert('In Total Amount numeric ');
    				amount.toLocaleString();
	    			thisAnnualAmount = amount * frequency; 
    				totalAmount += parseFloat(thisAnnualAmount);
    				//alert("Total: " + totalAmount);
    			}
			}
    	})
    	$("#idRunningTotal").val(totalAmount.toFixed(2));
    	
    })
	});*/
	$(function() {
		$(".input-width-income-expense-add-amount")
				.change(
						function() {
							//////console.log("Function on change add amount");
							var totalAmount = 0;
							$(".input-width-income-expense-add-amount")
									.each(
											function() {
												var elementId = this.id;
												var thisAmountId = "";
												var thisFrequencyId = "";
												thisAmountId = elementId;
												thisFrequencyId = elementId.replace("Amount","Frequency");
												
												unmaskAmount("#"+thisAmountId);
						                     
												if (!isNaN(this.value)
														&& this.value.length != 0) {
													if (!isNaN($("#" + thisAmountId).val())&& $("#"+ thisAmountId).val().length != 0) {
														$("#" + thisAmountId).val().toLocaleString();
														thisAnnualAmount = ($("#"+ thisAmountId).val())* ($("#"+ thisFrequencyId).val());
														totalAmount += parseFloat(thisAnnualAmount);
						                                maskAmount("#"+thisAmountId);
													}
												}
											})

							    $("#idRunningTotal").val(totalAmount.toFixed(2));
			                    maskAmount("#idRunningTotal");

						})

		$(".input-width-income-expense-add-frequency")
				.change(
						function() {
							var totalAmount = 0;
							var thisAnnualAmount = 0;
							$(".input-width-income-expense-add-frequency")
									.each(
											function() {
												var elementId = this.id;
												var thisAmountId = "";
												var thisFrequencyId = "";
												thisFrequencyId = elementId;
												thisAmountId = elementId.replace("Frequency","Amount");
												
												unmaskAmount("#"+thisAmountId);
						                     
												if (!isNaN(this.value) && this.value.length != 0) {
													if (!isNaN($("#" + thisAmountId).val())&& $("#"+ thisAmountId).val().length != 0) {
														$("#" + thisAmountId).val().toLocaleString();
														thisAnnualAmount = $("#"+ thisFrequencyId).val()* $("#"+ thisAmountId).val();
														totalAmount += parseFloat(thisAnnualAmount);
														
						                                maskAmount("#"+thisAmountId);
													}
												}
											})
						    $("#idRunningTotal").val(totalAmount.toFixed(2));
		                    maskAmount("#idRunningTotal");

						})
	});
	function confirmationClick(){
		$('#myModal').modal('hide'); 
		deleteSelectedRecord(sessionStorage.getItem("CLIENT_SERVICE_URL") + '/delete/'+sessionStorage.getItem("SELECTED_CLIENT_ID")+'/'+sessionStorage.getItem("SELECTED_Member_ID"));
		/*$("#idClient").empty();
		$("#idClient").load("clientInfo/viewFamilyIncome.html");
		 $(".dashboardheading    ").html("");
		$(".dashboardheading").html("Family Income");
		$("#wrapper").css("height", "auto");
		$(".form-section-container").css("height", "auto");
	    $("#addRecord").removeClass('btn_Disabled');
        $('#editRecord').addClass('btn_Disabled');
        $('#deleteRecord').addClass('btn_Disabled');*/
		getClientData("GET", "", "familyIncome/" + Selected_Client, afterDeleteSuccess);
		function afterDeleteSuccess(afterDeleteddata) {
			$("#idIncomeList").empty();
			if(afterDeleteddata.length==0)
			{
				  var pageUrl ="clientInfo/addFamilyIncome.html";
		          addPage(pageUrl,"Add Family Income");
			}
			
			$.each(afterDeleteddata, function (index, income) {
				var incomeAmount = maskAmountValue(income.total);
				$("#idIncomeList").append('<tr>' +
						'<td>' + income.firstName + ' ' + (income.middleName==null?"":income.middleName) + ' ' + income.lastName + '</td>' +
						'<td>' + incomeAmount + '</td>' +
						'<td class="hidden"><input type="text" id="idMemberId" name="memberId"  value=' + income.familyMemberId + ' readonly="readonly"></td>' +
				'</tr>');
			});
			
			//checkIfIncomePresentForAll(sessionStorage.getItem("CLIENT_SERVICE_URL") + '/checkIfIncomePresentForAll/'+sessionStorage.getItem("SELECTED_CLIENT_ID")); 
			var serviceurl = "checkIfIncomePresentForAll/" + Selected_Client;
			getClientData("GET", "", serviceurl, onSuccesscheckIfIncomePresentForAll);

			function onSuccesscheckIfIncomePresentForAll(data){
				if(data.length==0){
					$('#addRecord').addClass('btn_Disabled');

				}else{
					
					$('#addRecord').removeClass('btn_Disabled');

				}

			} 
		
		}
		
	}
	
	var SELECTED_FAMILY_MEMBER_ID = 0;
function familyMemberImageByMemberId(memberId,firstName,relationId,relationName,gender,tableRowId) {
		$("#familyMemberImage").empty();
		var gender;
		
			
			if (relationId=== 0) {
				SELECTED_FAMILY_MEMBER_ID = memberId;
				if (gender === 'Male') {
					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Man-C.png" id="'
									+ memberId + '" class="assetOwner1_img"  alt="'
									+ relationName
									+ '" tabindex="200"/>'
									+ relationName
									+ '</td>');
				} else {
					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
									+ memberId + '" class="assetOwner1_img"  alt="'
									+ relationName
									+ '" tabindex="200"/>'
									+ relationName
									+ '</td>');
				}

			}
			if (relationId === 1) {
				if (gender === 'Male') {
					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Man-C.png"  id="'
									+ memberId + '" class="assetOwner1_img"  alt="'
									+ relationName
									+ '" tabindex="200"/>'
									+ relationName
									+ ' '
									+ firstName
									+ '</td>');
				} else {
					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
									+ memberId + '" class="assetOwner1_img"  alt="'
									+ relationName
									+ '" tabindex="200"/>'
									+ relationName
									+ ' '
									+ firstName
									+ '</td>');
				}

			}
			if (relationId === 2) {

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Boy-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ ' '
								+ firstName + '</td>');

			}

			if (relationId === 3) {

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Girl-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ ' '
								+ firstName + '</td>');

			}

			if (relationId === 4) {

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Father-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ ' '
								+ firstName + '</td>');

			}
			if (relationId === 5) {

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Mother-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ ' '
								+ firstName + '</td>');

			}
			if (relationId=== 6) {

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Boy-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ ' '
								+ firstName + '</td>');

			}
			if (relationId === 7) {

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Girl-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ ' '
								+ firstName + '</td>');

			}
			if (relationId === 8) {

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Other-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ ' '
								+ firstName + '</td>');

			}
		
	
	}
	
$("#idUndo").on("click",
		function(event) {

	
     //alert("cl "+sessionStorage.getItem("SELECTED_CLIENT_ID"));
	editData('familyIncome/'
			+ sessionStorage.getItem("SELECTED_CLIENT_ID") + '/'
			+ sessionStorage.getItem("SELECTED_Member_ID"));

	maskAllAmountFields();
});	

function retirementAgeSuccess(data) {
	retirementAge=data.retirementAge;
	
	lifeExpAge=data.lifeExpectancy;
	populateDropdownYear("Select", $("#idSalaryYearTill"),'/AllYears', 2);
	
	
	populateDropdownYear("Select", $("#idBonusYearTill"),'/AllYears', 2);
	

	populateDropdownYear("Select", $("#idBusinessIncomeYearTill"),'/AllYears', 2);
	
	
	populateDropdownYear("Select", $("#idProfessionalFeesYearTill"),'/AllYears', 2);
	

	populateDropdownYear("Select", $("#idRentalIncomeYearTill"),'/AllYears', 2);
	
	
	populateDropdownYear("Select", $("#idPensionYearTill"),'/AllYears', 2);
	
	
	populateDropdownYear("Select", $("#idOtherIncomeYearTill"),'/AllYears', 2);
	
	populateDropdownYear("Select", $("#idTotalIncomeYearTill"),'/AllYears', 2);
}
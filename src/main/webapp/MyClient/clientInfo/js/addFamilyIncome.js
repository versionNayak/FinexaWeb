var selectedClientId;
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
				selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				
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
						}else if(loggedUser.clientInfoView === "Y"){
							$("#save").hide();
							$("#idUndo").hide();
						}
					}
				
				$("#idSalaryAmount").focus();
				$("#idTotalIncomeAmount").focus();
				console.log("sessionStorage.getItem('SELECTED_FAMILY_MEMBER_ID') "+sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID"));
                
			//	getClientData("GET", "", "clientFamilyMember/" + sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID"), retirementAgeSuccess);
				getClientData("GET", "", "familyMember/" + selectedClientId, retirementAgeSuccess);
				
				
				
				sessionStorage.setItem("CLIENT_SERVICE_URL", ClientServiceUrl);
				

				familyMemberImageByClientId(selectedClientId,$("#familyMemberImage"));

				/* 				populateFamilyMemberByClientId(selectedClientId,
				 $("#familyMemberImage"));
				 */
				populateDropdownFrequency("Select", $("#idSalaryFrequency"),'/AllFrequency',12);
				populateDropdownMonth("Select", $("#idSalaryReferenceMonth"),'/AllMonths', 13);
				//populateDropdownYear("Select", $("#idSalaryYearTill"),'/AllYears',2);
			
				
				populateDropdownFrequency("Select", $("#idBonusFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idBonusReferenceMonth"),'/AllMonths', 13);
			//	populateDropdownYear("Select", $("#idBonusYearTill"),'/AllYears',2);
		
				
				populateDropdownFrequency("Select", $("#idBusinessIncomeFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idBusinessIncomeReferenceMonth"),'/AllMonths', 13);
			//	populateDropdownYear("Select", $("#idBusinessIncomeYearTill"),'/AllYears',2);
				
				
				populateDropdownFrequency("Select", $("#idProfessionalFeesFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idProfessionalFeesReferenceMonth"),'/AllMonths', 13);
			//	populateDropdownYear("Select", $("#idProfessionalFeesYearTill"),'/AllYears',2);
				
				
				populateDropdownFrequency("Select", $("#idRentalIncomeFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idRentalIncomeReferenceMonth"),'/AllMonths', 13);
			//	populateDropdownYear("Select", $("#idRentalIncomeYearTill"),'/AllYears',2);
				
				
				populateDropdownFrequency("Select", $("#idPensionFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idPensionReferenceMonth"),'/AllMonths', 13);
			//	populateDropdownYear("Select", $("#idPensionYearTill"),'/AllYears',2);
				
				
				populateDropdownFrequency("Select", $("#idOtherIncomeFrequency"),'/AllFrequency', 12);
				populateDropdownMonth("Select", $("#idOtherIncomeReferenceMonth"),'/AllMonths', 13);
			//	populateDropdownYear("Select", $("#idOtherIncomeYearTill"),'/AllYears',2);
				
				
			//	populateDropdownYear("Select", $("#idTotalIncomeYearTill"),'/AllYears', 2);
				
				
				/* 	populateMember($("#idMember"), sessionStorage
							.getItem("CLIENT_SERVICE_URL")
							+ '/checkIfIncomePresentForAll/'
							+ sessionStorage.getItem("SELECTED_CLIENT_ID")); */

				$('#focusguard-2').on('focus', function() {
					// "last" focus guard got focus: set focus to the first field

					$("#idSalaryAmount").focus();
					$("#idTotalIncomeAmount").focus();
					$(window).scrollTop(0);
				});

			});
	function maskAllAmountFields() {
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

	function populateDropdownFrequency(name, dropdownId, serviceUrl, selectedValue) {
		getClientData("GET", "", serviceUrl, populateDropdownFrequencySuccess);
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
		getClientData("GET", "", serviceUrl, populateDropdownMonthSuccess);
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
		////////////console.log("outside selectedValue "+selectedValue);
		getClientData("GET", "", serviceUrl, populateDropdownYearSuccess);
		function populateDropdownYearSuccess(data) {
			if(retirementAge==null){
				////////////console.log("inside ");
				if(lifeExpId!=4){
				selectedValue=3;
				}else{
				selectedValue=0;	
				}
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
							
								/*if (item.id == selectedValue) {
									if(lifeExpId!=4){
						           console.log("1 retirementAge "+retirementAge);
								   console.log("1 item.id "+item.id);
						           console.log("1 selectedValue "+selectedValue);
								   dropdownId
											.append('<option value="' + item.id + '" selected>'
													+ item.description
													+ '</option>');
									}
								} */
									if(item.id==2 ){
										if(retirementAge!=null ){
										 console.log("2 retirementAge "+retirementAge);
										 console.log("2 item.id "+item.id);
								         console.log("2 selectedValue "+selectedValue);
								         console.log("2 lifeExpId "+lifeExpId);
									////////////console.log("true");
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
										 console.log("3 retirementAge "+retirementAge);
										 console.log("3 item.id "+item.id);
								         console.log("3 selectedValue "+selectedValue);
								         console.log("3 lifeExpId "+lifeExpId);
									////////////console.log("true");
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
									 console.log("4 retirementAge "+retirementAge);
									 console.log("4 item.id "+item.id);
							         console.log("4 selectedValue "+selectedValue);
							         console.log("4 lifeExpId "+lifeExpId);
								////////////console.log("true");
								dropdownId
										.append('<option value="' + item.id + '" >'
												+ item.description
												+ '</option>');
								}
						
							});
		}
		////////////console.log("============================ ");
	}
	
	var SELECTED_FAMILY_MEMBER_ID = 0;
	function familyMemberImageByClientId(clientId, tableRowId) {
		getClientData("GET", "", "checkIfIncomePresentForAll/" + clientId, familyMemberSuccess);
		function familyMemberSuccess(data) {
			$("#familyMemberImage").empty();
			////////////console.log("data  " + data.length);
			var gender;
			$.each(data,function(index, item) {
				////////////console.log("id " + item.id);
				if (item.relationID === 0) {
					SELECTED_FAMILY_MEMBER_ID = item.id;
					gender = item.gender;
					if (gender === 'M') {
						tableRowId
								.append('<td><img src="../Common/assets/images/icons/Man-C.png" id="'
										+ item.id
										+ '" onClick="onClickImage12('
										+ item.id
										+ ')" class="assetOwner1_img"  alt="'
										+ item.relationName
										+ '" tabindex="200"/>'
										+ item.relationName
										+ '</td>');
					} else {
						tableRowId
								.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
										+ item.id
										+ '" onClick="onClickImage12('
										+ item.id
										+ ')" class="assetOwner1_img"  alt="'
										+ item.relationName
										+ '" tabindex="200"/>'
										+ item.relationName
										+ '</td>');
					}

				}
				if (item.relationID === 1) {
					if (gender === 'M') {
						tableRowId
								.append('<td><img src="../Common/assets/images/icons/Man-A.png"  id="'
										+ item.id
										+ '" onClick="onClickImage12('
										+ item.id
										+ ')" class="assetOwner1_img"  alt="'
										+ item.relationName
										+ '" tabindex="200"/>'
										+ item.relationName
										+ ' '
										+ item.firstName
										+ '</td>');
					} else {
						tableRowId
								.append('<td><img src="../Common/assets/images/icons/Lady-A.png"  id="'
										+ item.id
										+ '" onClick="onClickImage12('
										+ item.id
										+ ')" class="assetOwner1_img"  alt="'
										+ item.relationName
										+ '" tabindex="200"/>'
										+ item.relationName
										+ ' '
										+ item.firstName
										+ '</td>');
					}

				}
				if (item.relationID === 2) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ ' '
									+ item.firstName + '</td>');

				}

				if (item.relationID === 3) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ ' '
									+ item.firstName + '</td>');

				}

				if (item.relationID === 4) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Father-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ ' '
									+ item.firstName + '</td>');

				}
				if (item.relationID === 5) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Mother-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '  '
									+ item.firstName + '</td>');

				}
				if (item.relationID === 6) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '  '
									+ item.firstName + '</td>');

				}
				if (item.relationID === 7) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '  '
									+ item.firstName + '</td>');

				}
				if (item.relationID === 8) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Other-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '  '
									+ item.firstName + '</td>');

				}
			});
		}
	}

	function onClickImage12(id) {
		////////////console.log("onclick " + id);
		var newSrc;
		$('#familyMemberImage  > td').each(function() {
			var id1 = $(this).find('img').attr('id');

			//	alert(id1+" "+id);

			if ($(this).find('img').attr('id') != id) {
				newSrc = $(this).find('img').attr('src').replace("-C", "-A");

				$(this).find('img').attr('src', newSrc);
			} else {
				newSrc = $(this).find('img').attr('src').replace("-A", "-C");
				$(this).find('img').attr('src', newSrc);
			}
		});

		SELECTED_FAMILY_MEMBER_ID = id;
		console.log("family member id 1 :" + SELECTED_FAMILY_MEMBER_ID);
		
		getClientData("GET", "", "clientFamilyMember/" + SELECTED_FAMILY_MEMBER_ID, retirementAgeSuccess);
	}

	$("#save").on("click", function(event) {
		////////////console.log("fammily member id 2: " + SELECTED_FAMILY_MEMBER_ID);
		unmaskAllAmountFields();
		b = validateIncome(SELECTED_FAMILY_MEMBER_ID);
	//	alert("b "+b);
		if (b) {
		showLoaderOnSave("#save");	
	    window.setTimeout(function(){
			//		alert("save");
			save('familyIncome/');
	    }, 5000);	
		}
	});

	function save(serviceUrl) {
		//		 alert("jjj");
		//		 alert("member iiiddd"+$('input[name=familyMember]:checked').val());
		// alert($('input[name=name_of_your_radiobutton]:checked').val());
		//		 alert("option "+$("input[name='option']:checked").val())
		//		 alert("id "+$("#idIncomeIdSalary").val());
		//		 alert($("#idIncomeTypeSalary").val());
		//		 alert($("#idSalaryFrequency").val());
		//		 alert($("#idSalaryReferenceMonth").val());
		//	 alert("year "+$("#idSalaryYearTill").val());
		///		 alert("year "+$("#idBonusYearTill").val());

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

				//			 alert("year "+$("#idTotalIncomeYearTill").val());

				/* 	 alert("option "+$("input[name='option']:checked").val())
					 alert("id "+$("#idIncomeIdTotal").val());
					 alert("clientId:"+sessionStorage.getItem("SELECTED_CLIENT_ID"));
					 alert("memeber "+$('input[name=familyMember]:checked').val());
					 alert("incomeType: "+$("#idIncomeTypeTotal").val());
					 alert("incomeAmount: "+$("#idTotalIncomeAmount").val());
					 alert("incomeFrequency: "+$("#idTotalIncomeFrequency").val()); 
				     alert("month "+$("#idTotalIncomeReferenceMonth").val()); 
				     alert("incomeEndYear: "+$("#idTotalIncomeYearTill").val()); */

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
	    console.log(data);
		saveData("POST", data, serviceUrl, onAddSuccess);
		function onAddSuccess(data){
			hideLoaderOnSave("#save");
			serviceurl = "familyIncome/" + selectedClientId;
			getClientData("GET", "", serviceurl, onSuccess);

			function onSuccess(data) {
				sessionStorage.setItem("INCOME_LIST", JSON.stringify(data));
				$("#idClient").empty();
				$("#idClient").load("clientInfo/viewFamilyIncome.html");
				$(".dashboardheading").html("View Family Income");
				$("#wrapper").css("height", "auto");
				$(".form-section-container").css("height", "auto");
				$("#addRecord").removeClass('btn_Disabled');
				$('#editRecord').addClass('btn_Disabled');
				$('#deleteRecord').addClass('btn_Disabled');

			}
		}
	}

	function setRefMonth(frequency) {

		//    alert("ssss");
		if (frequency.value == 12) {

			//  	 alert("ssss1111");
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

			// 	alert("ssss22222s");
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

	$(function() {
		//	alert("option checked");

		$("#idOptionI, #idOptionT").change(function() {
			
			//    alert("iption ");
			if ($("#idOptionI").is(":checked")) {
				//  	alert("All Income heads");

				$("#show-me-two").hide();
				$("#show-me").show();
				$("#idSalaryAmount").focus();

			} else {
				if ($("#idOptionT").is(":checked")) {
					//    	alert("Total Income");
					//$("#idTotalIncomeAmount").removeAttr("readonly");

					$("#show-me").hide();
					$("#show-me-two").show();
					$("#idTotalIncomeAmount").focus();

				}
			}
		});

	});

	$(function() {
		$(".input-width-income-expense-add-amount")
				.change(
						function() {
							////////////console.log("Function on change add amount");
							var totalAmount = 0;
							$(".input-width-income-expense-add-amount")
									.each(
											function() {
												var elementId = this.id;
												var thisAmountId = "";
												var thisFrequencyId = "";
												thisAmountId = elementId;
												thisFrequencyId = elementId.replace("Amount","Frequency");
												//alert("Frequeny Id: " + thisFrequencyId);
												//alert("Amount Id: " + thisAmountId);
												unmaskAmount("#"+thisAmountId);
						                        ////////////console.log("name "+$("#"+thisAmountId).attr('name'));
												////////////console.log("Frequency: "+ $("#"+ thisFrequencyId).val());
												////////////console.log("Amount : "+ $("#" + thisAmountId).val());
												if (!isNaN(this.value)
														&& this.value.length != 0) {
													if (!isNaN($("#" + thisAmountId).val())&& $("#"+ thisAmountId).val().length != 0) {
														$("#" + thisAmountId).val().toLocaleString();
														thisAnnualAmount = ($("#"+ thisAmountId).val())* ($("#"+ thisFrequencyId).val());
														totalAmount += parseFloat(thisAnnualAmount);
														////////////console.log("totalAmount : "+ totalAmount);
														////////////console.log("totalAmount a: " + totalAmount); 
						                                maskAmount("#"+thisAmountId);
													}
												}
											})
							
							
							    ////////////console.log("totalAmount aa"+totalAmount);
							    $("#idRunningTotal").val(totalAmount.toFixed(2));
			                    maskAmount("#idRunningTotal");

						})

		$(".input-width-income-expense-add-frequency")
				.change(
						function() {
							////////////console.log("Function on change add frequency");
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
												//alert("Frequeny Id: " + thisFrequencyId);
												//alert("Amount Id: " + thisAmountId);
												unmaskAmount("#"+thisAmountId);
						                        ////////////console.log("name "+$("#"+thisAmountId).attr('name'));
												////////////console.log("Frequency: "+ $("#"+ thisFrequencyId).val());
												////////////console.log("Amount : "+ $("#" + thisAmountId).val());
												if (!isNaN(this.value) && this.value.length != 0) {
													if (!isNaN($("#" + thisAmountId).val())&& $("#"+ thisAmountId).val().length != 0) {
														$("#" + thisAmountId).val().toLocaleString();
														thisAnnualAmount = $("#"+ thisFrequencyId).val()* $("#"+ thisAmountId).val();
														totalAmount += parseFloat(thisAnnualAmount);
														////////////console.log("totalAmount : "+ totalAmount);
														////////////console.log("totalAmount a: " + totalAmount); 
						                                maskAmount("#"+thisAmountId);
													}
												}
											})
							////////////console.log("totalAmount aa"+totalAmount);
						    $("#idRunningTotal").val(totalAmount.toFixed(2));
		                    maskAmount("#idRunningTotal");

						})
	});
	
	/*function onCustomImageClick(){
		////////////console.log("aaaaa ");
		
	
		////////////console.log("bbbbb ");
	}*/
	function retirementAgeSuccess(data) {
		retirementAge=data.retirementAge;
		
		lifeExpAge=data.lifeExpectancy;
		
		////////////console.log("retirementAge "+retirementAge);
		populateDropdownYear("Select", $("#idSalaryYearTill"),'/AllYears', 2);
		
		
		populateDropdownYear("Select", $("#idBonusYearTill"),'/AllYears', 2);
		
	
		populateDropdownYear("Select", $("#idBusinessIncomeYearTill"),'/AllYears', 2);
		
		
		populateDropdownYear("Select", $("#idProfessionalFeesYearTill"),'/AllYears', 2);
		
	
		populateDropdownYear("Select", $("#idRentalIncomeYearTill"),'/AllYears', 2);
		
		
		populateDropdownYear("Select", $("#idPensionYearTill"),'/AllYears', 2);
		
		
		populateDropdownYear("Select", $("#idOtherIncomeYearTill"),'/AllYears', 2);
		
		populateDropdownYear("Select", $("#idTotalIncomeYearTill"),'/AllYears', 2);
	}
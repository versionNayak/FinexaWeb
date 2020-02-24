
var selectedImageFamilyMemberid;
var birthDate;
var SAVE_INCOME = 0;
var saveCheck="";
var gender="";
$(document)
.ready(
		function() {
			
			var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
			var loggedClient;
	        if(loggedUser == null){
	         loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	       }else{
	         loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	       }
			if(loggedClient != null && loggedClient.role === "Client"){
				if(loggedClient.clientInfoAddEdit === "Y"){
					$("#idEditFamilyInfoSubmit").show();
					$("#undo").show();
				}else if(loggedClient.clientInfoView === "Y"){
					$("#idEditFamilyInfoSubmit").hide();
					$("#undo").hide();
				}
			}else if(loggedUser != null && loggedUser.role === "Admin"){
				$("#idEditFamilyInfoSubmit").hide();
				$("#undo").hide();
			}else{
				if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
					$("#idEditFamilyInfoSubmit").show();
					$("#undo").show();
				}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
					$("#idEditFamilyInfoSubmit").hide();
					$("#undo").hide();
				}
			}
			$("#idFm").show();
			 $("#idAnnualIncome").focus();
		     
			 
			 $("#idOk").attr('disabled',true);
			
			selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
			
			 saveCheck = sessionStorage.getItem("LifeExpecTancy_ADD_CLIENT");
			 console.log("saveCheck "+saveCheck);
			$("#familyMemberImage").empty;
			if (saveCheck == "YES") {
				$("#idFm").hide();
				var clientPersonalInfo = JSON.parse(sessionStorage.getItem("CLIENT_PERSONAL_INFO"));
				
				console.log(clientPersonalInfo.birthDate+"  "+clientPersonalInfo.gender);
				$("#idBirthDate").val(clientPersonalInfo.birthDate);
				if(clientPersonalInfo.gender=="M"){
				   gender="Male";
				}
				if(clientPersonalInfo.gender=="F"){
				   gender="Female";
				}
				console.log(clientPersonalInfo.birthDate+"  "+gender);
				$("#idBirthDate").val(clientPersonalInfo.birthDate);
				$("#idLifeExpGender").val(gender);
				$("#idAnnualIncome").prop('readOnly', false);
				
			} else {
				$("#idFm").show();
				populateFamilyMemberByClientIdCustom(selectedClientId,
						$("#familyMemberImage"));
			}
			
			$("#idSaveLifeExp").on("click",
					function(event) {
				
				$("#idOk").attr('disabled',false);
				if (saveCheck == "YES") {
	            	   event.preventDefault();
	            	   
	            	   unmaskAmount('#idAnnualIncome');
						
	            	   var formData = $('#idFormLifeExpAddMode').serializeToJSON();
					   var data = JSON.stringify(formData);
					   
					   
					    console.log(data);
					    
					    getClientData("POST", data,"calculateLifeExpectancy",onCalculateLifeExpSuccess);
						function onCalculateLifeExpSuccess(data) {
							$("#idFutureLifeExp").val(data.futureLifeExpectancy);
							$("#idLifeExp").val(data.totalLifeExpectancy);
							maskAmount('#idAnnualIncome');
						}
						
				}else{
				selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
				if (typeof selectedImageFamilyMemberid != 'undefined') {

					//	console.log("submit Add Fund Form");
					event.preventDefault();
					var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
					unmaskAmount('#idAnnualIncome');
					var formData = $('#idFormLifeExpAddMode').serializeToJSON();
					formData["clientId"] = selectedClientId;
					formData["familyMemberId"] = selectedImageFamilyMemberid;
					var data = JSON.stringify(formData);
				//	alert(data);
					//var dataToJSon = JSON.parse(data);
					//dataToJSon.birthDate = birthDate;
					//data = JSON.stringify(dataToJSon);
				    console.log(data);
					getClientData("POST", data,"calculateLifeExpectancy",onCalculateLifeExpSuccess);
					function onCalculateLifeExpSuccess(data) {
						$("#idFutureLifeExp").val(data.futureLifeExpectancy);
						$("#idLifeExp").val(data.totalLifeExpectancy);
						maskAmount('#idAnnualIncome');
					}
					
					
				}else {
//					alert("Please select a Family Member");
					return false;
				}
				} 
			});
			$("#idUndo").on("click",
					function(event) {
				$("#idFutureLifeExp").val("");
				$("#idLifeExp").val("");
				$('#idTobaccoN').prop('checked', true);
				$('#idBMIN').attr('checked', true);
				$('#idHistoryN').prop('checked', true);
				$('#idNormalBPN').prop('checked', true);
			});
			
			$("#idOk").on("click",
					function(event) {
				if (saveCheck == "YES") {
	            	   event.preventDefault();
	            	   unmaskAmount('#idAnnualIncome');
	            	   var formData = $('#idFormLifeExpAddMode').serializeToJSON();
						//var data = JSON.stringify(formData);
					
						    var clientPersonalInfo = JSON.parse(sessionStorage.getItem("CLIENT_PERSONAL_INFO"));
						    console.log("clientPersonalInfo "+clientPersonalInfo);
							var clientContactInfo = JSON.parse(sessionStorage.getItem("CLIENT_CONTACT_INFO"));
							console.log("clientContactInfo "+clientContactInfo);
							var guardianInfo = JSON.parse(sessionStorage.getItem("GUARDIAN_PERSONAL_INFO"));
							console.log("guardianInfo "+guardianInfo);
							var guardianContactInfo = JSON.parse(sessionStorage.getItem("Guardian_CONTACT_INFO"));
							console.log("guardianContactInfo "+guardianContactInfo);
							
							var familyInfo = JSON.parse(sessionStorage.getItem("CLIENT_FAMILY_INFO"));
							console.log("familyInfo "+familyInfo);
							
					
							clientPersonalInfo["clientContactDTO"] = clientContactInfo;
							clientPersonalInfo["clientGuardianDTO"] = guardianInfo;
							clientPersonalInfo["clientGuardianContactDTO"] = guardianContactInfo;
							if(familyInfo!=null){
								clientPersonalInfo["clientFamilyMemberDTO"] = familyInfo;
							}
							clientPersonalInfo["clientLifeExpDTO"] = formData;
						var clientInfo = JSON.stringify(clientPersonalInfo);
						console.log("clientPersonalInfo = " + clientInfo);
				     //   alert("clientPersonalInfo = " + clientInfo);
						showLoaderOnSave("#idOk");
						window.setTimeout(function(){
					//	getClientDataWithErrorHandling("POST", clientInfo, "clientMaster", onAddPersonalInfoSuccess,onError);
						saveData("POST", clientInfo, "clientMaster", onAddPersonalInfoSuccess);
						function onAddPersonalInfoSuccess(clientPersonalInfo) {
							hideLoaderOnSave("#idOk");
							console.log("Saved personal info id = " + clientPersonalInfo.id);							
							sessionStorage.setItem("SELECTED_CLIENT_ID", clientPersonalInfo.id);
					        var url = "clientInfo/clientDashboard.html";
					        var heading="Client Dashboard";
					        openPageLE(url, heading);
							//$("#idClient").load("clientInfo/viewClient.html");
						}
						/*function onError(err){
		 				    $("#alertform").text("Error saving life Expectancy information. Please try after sometime or contact system administrator.");
		 					$(window).scrollTop(0);
		 					hideLoaderOnSave("#idOk");
		 				}*/
				      }, 5000);	
					}
                else{
				selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
				if (typeof selectedImageFamilyMemberid != 'undefined') {

					//	console.log("submit Add Fund Form");
					event.preventDefault();
					var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
					unmaskAmount('#idAnnualIncome')
					var formData = $('#idFormLifeExpAddMode').serializeToJSON();
					formData["clientId"] = selectedClientId;
					formData["familyMemberId"] = selectedImageFamilyMemberid;
					var data = JSON.stringify(formData);
			//		alert(data);
					//var dataToJSon = JSON.parse(data);
					//dataToJSon.birthDate = birthDate;
					//data = JSON.stringify(dataToJSon);
					//data = JSON.stringify(data);
		    		console.log(data);
		    		showLoaderOnSave("#idOk");
					window.setTimeout(function(){
					//getClientDataWithErrorHandling("POST", data,"saveLifeExp",onCalculateLifeExpSuccess,onError);
					saveData("POST", data,"saveLifeExp",onCalculateLifeExpSuccess);
					function onCalculateLifeExpSuccess(data) {
						hideLoaderOnSave("#idOk");
						selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
						serviceurl = "viewLifeExpList/" + selectedClientId;
						getClientData("GET", "", serviceurl, onSuccess);
						function onSuccess(data){
							sessionStorage.setItem("LIFE_EXPECTANCY_LIST", JSON.stringify(data));
							$("#idClient").load("clientInfo/viewLifeExpectancy.html");
							$(".dashboardheading    ").html("");
							$(".dashboardheading    ").html("Life Expectancy");
							$("#addRecord").removeClass('btn_Disabled');
							$('#editRecord').addClass('btn_Disabled');
							$('#deleteRecord').addClass('btn_Disabled');
						}
						
					}
					/*function onError(err){
	 				    $("#alertform").text("Error saving life Expectancy information. Please try after sometime or contact system administrator.");
	 					$(window).scrollTop(0);
	 					hideLoaderOnSave("#idOk");
	 				}*/
					// ajax call for saving income
				 }, 5000);	
					
				}else {
//					alert("Please select a Family Member");
					return false;
				}
               } 
			});
			$('#focusguard-2').on('focus', function() {
				// "last" focus guard got focus: set focus to the first field
				$("#idAnnualIncome").focus();
				$(window).scrollTop(0);
			}); 
			

		});
function onClickImageCus(id) {
	var newSrc;

	$('#familyMemberImage  > td').each(function() {
		if ($(this).find('img').attr('id') != id) {
			newSrc = $(this).find('img').attr('src').replace("-C", "-A");
			$(this).find('img').attr('src', newSrc);
		} else {
			newSrc = $(this).find('img').attr('src').replace("-A", "-C");
			$(this).find('img').attr('src', newSrc);
			// selecting a particular member
			selectedMemberId = id;

			getClientData("GET", "", "getLifeExpDetails/"+selectedMemberId, onGetLifeExpDataSuccess);
			function onGetLifeExpDataSuccess(data) {
				

				sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberId);
				birthDate = data.birthDate;
				console.log("b date "+birthDate);
				var date = new Date(birthDate);
				var dateInString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();		
				//$("#idBirthDate").val(dateInString);
				$("#idBirthDate").val(data.birthDate);
				$("#idLifeExpGender").val(data.gender);			
				$("#idAnnualIncome").val(data.annualIncome);
				sessionStorage.removeItem("AnnualIncome");
				sessionStorage.setItem("AnnualIncome", data.annualIncome);
				
				if (data.isTobaccoUser == "Y") {
					$('#idTobaccoY').prop('checked', true);
				} else {
					$('#idTobaccoN').prop('checked', true);
				}
				if (data.isProperBMI == "Y") {
					$('#idBMIY').attr('checked', true);
				} else {
					$('#idBMIN').attr('checked', true);
				}
				if (data.hasDiseaseHistory == "Y") {
					$('#idHistoryY').prop('checked', true);
				} else {
					$('#idHistoryN').prop('checked', true);
				}
				if (data.hasNormalBP == "Y") {
					$('#idNormalBPY').prop('checked', true);
				} else {
					$('#idNormalBPN').prop('checked', true);
				}
				if (data.annualIncome == 0) {
				//	alert("income is zero");
					document.getElementById("idAnnualIncome").readOnly=false;
					SAVE_INCOME = 1;
				} else {
					if (data.annualIncome != 0) {
						document.getElementById("idAnnualIncome").readOnly=true;
					}
				}
				maskAmount('#idAnnualIncome');
			}
		}
	});
	sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",id);

}

//customized function for click on image
function populateFamilyMemberByClientIdCustom(clientId, tableRowId) {

	var memberIdList = [];
	getClientData("GET", "", "getFamilyMemberListByLifeExp/" + clientId,
			familyMemberSuccess);
	function familyMemberSuccess(data) {
		//alert(tableRowId.find("td:gt(0)"));
		$.each(data,function(index, item) {
			memberIdList.push(item.id);
			if (item.relationID === 0) {
				if (item.gender === 'M') {
					tableRowId
					.append('<td><img src="../Common/assets/images/icons/Man-A.png" id="'
							+ item.id
							+ '" onClick="onClickImageCus('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'</td>');
				} else {
					tableRowId
					.append('<td><img src="../Common/assets/images/icons/Lady-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImageCus('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'</td>');
				}

			}
			if (item.relationID === 1) {
				if (item.gender === 'M') {
					tableRowId
					.append('<td><img src="../Common/assets/images/icons/Lady-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImageCus('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+' '+item.firstName+'</td>');
				} else {
					tableRowId
					.append('<td><img src="../Common/assets/images/icons/Man-A.png"  id="'
							+ item.id
							+ '" onClick="onClickImageCus('
							+ item.id
							+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+' '+item.firstName+'</td>');
				}

			}
			if (item.relationID === 2) {

				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
						+ item.id
						+ '" onClick="onClickImageCus('
						+ item.id
						+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'  '+item.firstName+'</td>');

			}

			if (item.relationID === 3) {

				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
						+ item.id
						+ '" onClick="onClickImageCus('
						+ item.id
						+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'  '+item.firstName+'</td>');

			}

			if (item.relationID === 4) {

				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Father-A.png"  id="'
						+ item.id
						+ '" onClick="onClickImageCus('
						+ item.id
						+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'  '+item.firstName+'</td>');

			}
			if (item.relationID === 5) {

				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Mother-A.png"  id="'
						+ item.id
						+ '" onClick="onClickImageCus('
						+ item.id
						+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'  '+item.firstName+'</td>');

			}
			if (item.relationID === 6) {

				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Other-A.png"  id="'
						+ item.id
						+ '" onClick="onClickImageCus('
						+ item.id
						+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'  '+item.firstName+'</td>');
			}
			
			if (item.relationID === 7) {

				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Other-A.png"  id="'
						+ item.id
						+ '" onClick="onClickImageCus('
						+ item.id
						+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'  '+item.firstName+'</td>');
			}
			
			if (item.relationID === 8) {

				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Other-A.png"  id="'
						+ item.id
						+ '" onClick="onClickImageCus('
						+ item.id
						+ ')" class="assetOwner1_img"  alt="'+item.relationName+'" tabindex="200"/>'+item.relationName+'  '+item.firstName+'</td>');
			}
		});
		onClickImageCus(memberIdList[0]);
	}

}

function openPageLE(path,heading) {
	//alert('In page opePageLE');
    $("#idClient").empty();
    $(".dashboardheading").html("");    
	$("#idClient").load(path);
    $("#page-content-wrapper").css("height","auto");
	$(".form-section-container").addClass("height1257px");
	$(".nonload").css("display","block");
	$("#top-nav-bar").show();
	$(".top-nav-items").show();
	$(".displayonload").hide();
	$("#headIcon").empty();
    $(".dashboardheading").html(heading);
	$("#mandatory-field-msg").hide();	

	selectedClientId = 	sessionStorage.getItem("SELECTED_CLIENT_ID");
	//alert(selectedClientId);
	if (selectedClientId != 0 && selectedClientId != null && selectedClientId != 'udefined')
	{
		getClientData("GET", "", "clientMaster/"+selectedClientId, onAgeSuccess);
		function onAgeSuccess(data) {
			console.log("data.age "+data.age)		
			if(data.age>18){
				$('#idGuardian').hide();
				$('#idGuardianContact').hide();
			}else{
				$('#idGuardian').show();
				$('#idGuardianContact').show();
			}

			var middleName;
			if (data.middleName == null) {
				middleName = " ";
			} else {
				if (data.middleName != null) {
					middleName = data.middleName;
				}
			}
			var clientFullName = data.firstName + ' ' + middleName + ' ' + data.lastName;
	        $("#idSelectedClientName").text(clientFullName);
		}
	}		
}


	$("#idUndo").on("click",
			function(event) {
		$("#idAnnualIncome").val(sessionStorage.getItem("AnnualIncome"));
		$("#idTobaccoN").prop("checked", true);
		$("#idBMIY").prop("checked", true);
		$("#idHistoryY").prop("checked", true);
		$("#idNormalBPY").prop("checked", true);
		$("#idFutureLifeExp").val("");
		$("#idLifeExp").val("");

	});
	
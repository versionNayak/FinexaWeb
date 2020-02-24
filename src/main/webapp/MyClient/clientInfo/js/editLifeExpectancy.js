var selectedImageFamilyMemberid;
$(document).ready(function() {
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
	if(loggedClient != null && loggedClient.role === "Client"){
		if(loggedClient.clientInfoAddEdit === "Y"){
			$("#idSaveLifeExp").show();
			$("#idOk").show();
			$("#idUndo").show();
		}else if(loggedClient.clientInfoView === "Y"){
			$("#idSaveLifeExp").hide();
			$("#idOk").hide();
			$("#idUndo").hide();
		}
	}else{
		if(loggedUser != null  && loggedUser.role === "Admin"){
		$("#idSaveLifeExp").hide();
		$("#idOk").hide();
		$("#idUndo").hide();
	   }else{
		if(loggedUser != null && loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
			$("#idSaveLifeExp").show();
			$("#idOk").show();
			$("#idUndo").show();
		}else if(loggedUser != null && loggedUser != null && loggedUser.clientInfoView === "Y"){
			$("#idSaveLifeExp").hide();
			$("#idOk").hide();
			$("#idUndo").hide();
		}
	  }
	}
	var birthDate;
	
	selectedClientId = sessionStorage
	.getItem("SELECTED_CLIENT_ID");
	
	populateFamilyMemberByClientIdCustom(selectedClientId,
			$("#familyMemberImage"));
	
	
	// calendar
	/*"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$(".calendar-icon-container").on(
			"click",
			function() {
				$(this).closest(".input-group").find("input")
				.trigger("focus");
			});*/
	
	// disabling add button if all life expectancy are added
	
	
	/*"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$("#idBirthDate").datepicker({
		format : "dd/mm/yyyy",
		todayHighlight : true,
		todayBtn : true,
		autoclose : true,
		endDate : new Date()
	});
	$(".datepicker-icon").on("click", function() {
		$(this).closest(".input-group").find("input").trigger("focus");
	});*/
	
	$('input[type=radio][name=isTobaccoUser]').change(function() {
      $("#idOk").attr('disabled',true);
    });
	$('input[type=radio][name=isProperBMI]').change(function() {
      $("#idOk").attr('disabled',true);
    });
	$('input[type=radio][name=hasDiseaseHistory]').change(function() {
      $("#idOk").attr('disabled',true);
    });
	$('input[type=radio][name=hasNormalBP]').change(function() {
      $("#idOk").attr('disabled',true);
    });
	serviceurl = "/getFamilyMemberListByLifeExp/" + selectedClientId;
	getClientData("GET", "", serviceurl, onSuccessCheckIfLifeExpExits);

	function onSuccessCheckIfLifeExpExits(data){
		if(data.length == 0){
			$("#addRecord").addClass('btn_Disabled');
		}
	} 
	
	var selectedLifeExpId = sessionStorage.getItem("SELECTED_LIFE_EXPECTANCY_ID");
	getClientData("GET", "", "getLifeExpDetails/"+selectedLifeExpId, onGetLifeExpDataSuccess);
	function onGetLifeExpDataSuccess(data) {
	    console.log(data);
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberId);
		birthDate = data.birthDate;
	//	alert("birthDate "+birthDate);
		var date = new Date(birthDate);
		var dateInString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();		
		//$("#idBirthDate").val(dateInString);
		$("#idBirthDate").val(data.birthDate);
		$("#idLifeExpGender").val(data.gender);
		$("#idAnnualIncome").val(data.annualIncome);
		//alert(data.annualIncome)
		if (data.annualIncome == 0) {
			document.getElementById("idAnnualIncome").readOnly=false;
		} else {
			if (data.annualIncome != 0) {
				document.getElementById("idAnnualIncome").readOnly=true;
			}
		}
		maskAmount('#idAnnualIncome');
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
		
	//	alert(data.futureLifeExpectancy);
		
		$("#idFutureLifeExp").val(data.futureLifeExpectancy);
		$("#idLifeExp").val(data.totalLifeExpectancy);

	}
	 
	$("#idUndo").on("click",
			function(event) {
		$("#idFutureLifeExp").val("");
		$("#idLifeExp").val("");
		$('#idTobaccoN').prop('checked', true);
		$('#idBMIN').attr('checked', true);
		$('#idHistoryN').prop('checked', true);
		$('#idNormalBPN').prop('checked', true);
		
		/////////////
		var selectedLifeExpId = sessionStorage.getItem("SELECTED_LIFE_EXPECTANCY_ID");
		getClientData("GET", "", "getLifeExpDetails/"+selectedLifeExpId, onGetLifeExpDataSuccess);
		function onGetLifeExpDataSuccess(data) {
		    console.log(data);
			sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberId);
			birthDate = data.birthDate;
		//	alert("birthDate "+birthDate);
			var date = new Date(birthDate);
			var dateInString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();		
			//$("#idBirthDate").val(dateInString);
			$("#idBirthDate").val(data.birthDate);
			$("#idLifeExpGender").val(data.gender);
			$("#idAnnualIncome").val(data.annualIncome);
			//alert(data.annualIncome)
			if (data.annualIncome == 0) {
				document.getElementById("idAnnualIncome").readOnly=false;
			} else {
				if (data.annualIncome != 0) {
					document.getElementById("idAnnualIncome").readOnly=true;
				}
			}
			maskAmount('#idAnnualIncome');
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
			
		//	alert(data.futureLifeExpectancy);
			
			$("#idFutureLifeExp").val(data.futureLifeExpectancy);
			$("#idLifeExp").val(data.totalLifeExpectancy);

		}
	});

	$("#idSaveLifeExp").on("click",
			function(event) {
		
		$("#idOk").attr('disabled',false);		
		selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
		{if (typeof selectedImageFamilyMemberid != 'undefined') {

			//	console.log("submit Add Fund Form");
			event.preventDefault();
			var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
			unmaskAmount('#idAnnualIncome');
			var formData = $('#idFormLifeExp').serializeToJSON();
			formData["clientId"] = selectedClientId;
			formData["familyMemberId"] = selectedImageFamilyMemberid;
			
			var data = JSON.stringify(formData);
		//	alert(data);
		//	var dataToJSon = JSON.parse(data);
		//	dataToJSon.birthDate = birthDate;
		//	data = JSON.stringify(dataToJSon);
			console.log("data after submit click" + data);
			getClientData("POST", data,"calculateLifeExpectancy",onCalculateLifeExpSuccess);
			function onCalculateLifeExpSuccess(data) {
				$("#idFutureLifeExp").val(data.futureLifeExpectancy);
				$("#idLifeExp").val(data.totalLifeExpectancy);
				
				maskAmount('#idAnnualIncome');
				var date = new Date(birthDate);
				var dateInString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();		
				//$("#idBirthDate").val(dateInString);
				
			}
			
			/*getClientData("POST", data,"reCalculateLifeExpectancy",onReCalculateLifeExpSuccess);
			function onReCalculateLifeExpSuccess(data) {
				$("#idFutureLifeExp").val(data.futureLifeExpectancy);
				$("#idLifeExp").val(data.totalLifeExpectancy);
				var date = new Date(birthDate);
				var dateInString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();		
				$("#idBirthDate").val(dateInString);
			}*/
		}else {
//			alert("Please select a Family Member");
			return false;
		}
		} 
	});

	$("#idOk").on("click",
			function(event) {
		selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	//	alert("meme "+selectedImageFamilyMemberid);
		if (typeof selectedImageFamilyMemberid != 'undefined') {

			//	console.log("submit Add Fund Form");
			event.preventDefault();
			showLoaderOnSave("#idOk");
			window.setTimeout(function(){
			var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
			unmaskAmount('#idAnnualIncome');
			var formData = $('#idFormLifeExp').serializeToJSON();
			formData["clientId"] = selectedClientId;
			formData["familyMemberId"] = selectedImageFamilyMemberid;
			var data = JSON.stringify(formData);
		//	alert("Data after ok click " + data);
			var dataToJSon = JSON.parse(data);
			dataToJSon.birthDate = birthDate;
		//	data = JSON.stringify(data);
		//	alert(data);
			//getClientDataWithErrorHandling("POST", data,"saveLifeExp",onCalculateLifeExpSuccess,onError);
			saveData("POST", data,"updateLifeExp",onCalculateLifeExpSuccess);
			function onCalculateLifeExpSuccess(data) {
				hideLoaderOnSave("#idOk");
				selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				serviceurl = "viewLifeExpList/" + selectedClientId;
				getClientData("GET", "", serviceurl, onSuccess);
				function onSuccess(data){
					sessionStorage.setItem("LIFE_EXPECTANCY_LIST", JSON.stringify(data));
					$("#idClient").load("clientInfo/viewLifeExpectancy.html");
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
		 }, 5000);	
		}else {
//			alert("Please select a Family Member");
			return false;
		}
		
	});
	
	//customized function for click on image
	function populateFamilyMemberByClientIdCustom(clientId, tableRowId) {
		var memberId=sessionStorage.getItem("SELECTED_LIFE_EXPECTANCY_ID");
		var relationId = sessionStorage.getItem("SELECTED_LIFE_EXPECTANCY_RELATION_ID");
		console.log("relationid retrieved" + relationId);
		
		var gender = sessionStorage.getItem("SELECTED_LIFE_EXPECTANCY_GENDER");
		console.log("gender retrieved" + gender);
		
		var firstName = sessionStorage.getItem("SELECTED_FIRST_NAME");
		console.log("firstName retrieved" + firstName);
		
		var relationName = sessionStorage.getItem("SELECTED_LIFE_EXPECTANCY_MEMBER_RELATION");
		console.log("relationName retrieved" + relationName);
		
		if (relationId == 0) {
			if (gender == 'M') {
				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Man-C.png" id="'
						+ memberId
						+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +'</td>');
			} else {
				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
						+ memberId
						+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +'</td>');
			}

		}
		if (relationId == 1) {
			if (gender == 'M') {
				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Man-C.png"  id="'
						+ memberId
						+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +' '+ firstName +'</td>');
			} else {
				tableRowId
				.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
						+ memberId
						+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +' '+ firstName +'</td>');
			}

		}
		if (relationId == 2) {

			tableRowId
			.append('<td><img src="../Common/assets/images/icons/Boy-C.png"  id="'
					+ memberId
					+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +' '+ firstName +'</td>');

		}

		if (relationId == 3) {
		//	alert("he");
			tableRowId
			.append('<td><img src="../Common/assets/images/icons/Girl-C.png"  id="'
					+ memberId
					+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +' '+ firstName +'</td>');

		}

		if (relationId == 4) {

			tableRowId
			.append('<td><img src="../Common/assets/images/icons/Father-C.png"  id="'
					+ memberId
					+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +' '+ firstName +'</td>');

		}
		if (relationId == 5) {

			tableRowId
			.append('<td><img src="../Common/assets/images/icons/Mother-C.png"  id="'
					+ memberId
					+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +' '+ firstName +'</td>');

		}
		if (relationId == 6) {

			tableRowId
			.append('<td><img src="../Common/assets/images/icons/Other-C.png"  id="'
					+ memberId
					+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +' '+ firstName +'</td>');
		}
		
		if (relationId == 7) {

			tableRowId
			.append('<td><img src="../Common/assets/images/icons/Other-C.png"  id="'
					+ memberId
					+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +' '+ firstName +'</td>');
		}
		
		if (relationId == 8) {

			tableRowId
			.append('<td><img src="../Common/assets/images/icons/Other-C.png"  id="'
					+ memberId
					+ '" class="assetOwner1_img"  alt="'+ relationName +'" tabindex="200"/>'+ relationName +' '+ firstName +'</td>');
		}


	}
	
	
});


function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord(ClientServiceUrl+"deleteClientLifeExpectancy/"+sessionStorage.getItem("SELECTED_LIFE_EXPECTANCY_ID"));
	
	getClientData("GET", "", "viewLifeExpList/" + selectedClientId, onSuccess);
	function onSuccess(afterDeleteddata){

		$("#idLifeExpList").empty();
		if(afterDeleteddata.length==0)
		{
			 var pageUrl ="clientInfo/addClientLifeExpectancy.html";
                    addPage(pageUrl,"Add Life Expectancy");
		}
		$.each(afterDeleteddata, function (index, lifeExp) {
			$("#idLifeExpList").append('<tr>' +
					'<td>' + lifeExp.memberName + '</td>' +
					'<td>' + lifeExp.memberRelation + '</td>' +
					'<td>' + lifeExp.lifeExp + '</td>' +
					'<td class="hidden"><input type="text" id="idLifeExp" name="nameLifeExp"  value=' + lifeExp.memberId + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idRelation" name="nameRelation"  value=' + lifeExp.relationId + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idGender" name="nameGender"  value=' + lifeExp.memberGender + ' readonly="readonly"></td>' +
			'</tr>');
		});
		
		var serviceurl = "/getFamilyMemberListByLifeExp/" + selectedClientId;
		getClientData("GET", "", serviceurl, onSuccessCheckIfLifeExpExits);

		function onSuccessCheckIfLifeExpExits(data){
			if(data.length==0){
				$("#addRecord").addClass('btn_Disabled');
			}
		} 
		
	
	}
	
}	 

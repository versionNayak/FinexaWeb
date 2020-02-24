var userRoleList = []; 
var userIdList = []; 
var userLocationList = []; 
var fileFormat = null;
var indexSelected = '';
$(document).ready(function() {
	$('#idExportTable').hide();
	$("#idExportListDownload").hide();
	
	$('#idFileFormat').on('change', function(){
		fileFormat = $(this).val();
   	});
	
	/*$('#idUserCRExport').change(function(){
		if($('#idUserCRExport').val() == ''){
			
		} else {
			var indexSelected = $(this).val();
			var selectedUserId = userIdList[parseInt(indexSelected)];
			
			getClientData("GET", "", "clientRecord/getUserName/" + selectedUserId, onGetSuccess);
			function onGetSuccess(data) {
				//alert(data.userName);
				sessionStorage.removeItem("SELECTED_USER_NAME");
				sessionStorage.setItem("SELECTED_USER_NAME",data.userName);
			}
		}	
		
	});*/

	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var id=loggedUser.id;
	populateUserCombo(id);	
	$("#idDownloadExport").on("click", function(event) {
		if (indexSelected == '') {
			bootbox.alert("Please select an User")
		}else if (fileFormat == null) {
			bootbox.alert("Please select a file format to export")
		} else {
			$("#idExportList").empty();
			var formData = $('#idExportForm').serializeToJSON();
			formData["loggedUserid"] = id;
			data = JSON.stringify(formData);
			console.log("Data : " + data);
		//	serviceurl = ClientServiceUrl+'clientRecord/exportClientByUser?formData='+data ;
		//	window.location = serviceurl;
			getClientData("POST", data , "clientRecord/exportClientByUser", onExportClientSuccess);
			function onExportClientSuccess(data) {
				
			//	bootbox.alert("File is Ready to Download");
		                /* $("#divjson").excelexportjs({
					        containerid: "divjson",
					        datatype: 'json',
					        dataset: data,
					        columns: getColumns(data)
					     });*/
		     // $("#idDownloadExport").attr('download', 'ClientExportRecords.xls').attr('href', uri).attr('target', '_blank');
				
				$.each(data, function (index, exportList) {
					//alert("name : " + exportList.firstName + " selfIncome : " + Math.round(exportList.annualIncome) + " tobacco :" + exportList.isTobaccoUser)
					var OtherMaritalStatus;
					if (exportList.otherMaritalStatus == null){
						OtherMaritalStatus = "";
					} else {
						OtherMaritalStatus = exportList.otherMaritalStatus;
					}
					var EducationalQualification;
					if (exportList.educationalQualification == null){
						EducationalQualification = "";
					} else {
						EducationalQualification = exportList.educationalQualification;
					}
					var OtherEducationalQualification;
					if (exportList.otherEducationalQualification == null){
						OtherEducationalQualification = "";
					} else {
						OtherEducationalQualification = exportList.otherEducationalQualification;
					}
					var EmploymentType;
					if (exportList.employmentType == null){
						EmploymentType = "";
					} else {
						EmploymentType = exportList.employmentType;
					}
					var OtherEmploymentType;
					if (exportList.otherEmploymentType == null){
						OtherEmploymentType = "";
					} else {
						OtherEmploymentType = exportList.otherEmploymentType;
					}
					var OrganisationName;
					if (exportList.organisationName == null){
						OrganisationName = "";
					} else {
						OrganisationName = exportList.organisationName;
					}
					var CurrentDesignation;
					if (exportList.currentDesignation == null){
						CurrentDesignation = "";
					} else {
						CurrentDesignation = exportList.currentDesignation;
					}
					var OtherResidentType;
					if (exportList.otherResidentType == null){
						OtherResidentType = "";
					} else {
						OtherResidentType = exportList.otherResidentType;
					}
					var AlternateEmailAddress;
					if (exportList.alternateEmailAddress == null){
						AlternateEmailAddress = "";
					} else {
						AlternateEmailAddress = exportList.alternateEmailAddress;
					}
					var AddressLine1;
					if (exportList.addressLine1 == null){
						AddressLine1 = "";
					}else {
						AddressLine1 = exportList.addressLine1;
					}
					var AddressLine2;
					if (exportList.addressLine2 == null){
						AddressLine2 = "";
					}else {
						AddressLine2 = exportList.addressLine2;
					}
					var AddressLine3;
					if (exportList.addressLine3 == null){
						AddressLine3 = "";
					}else {
						AddressLine3 = exportList.addressLine3;
					}
					$("#idExportList").append('<tr>' +
							'<td>' + exportList.salutation +'</td>' +
							'<td>' + exportList.firstName + '</td>' +
							'<td>' + exportList.middleName + '</td>' +
							'<td>' + exportList.lastName + '</td>' +
							'<td>' + exportList.birthDate + '</td>' +
							'<td>' + exportList.gender + '</td>' +
							'<td>' + exportList.pan + '</td>' +
							'<td>' + exportList.aadhar + '</td>' +
							'<td>' + exportList.maritalStatus + '</td>' +
							'<td>' + OtherMaritalStatus + '</td>' +
							'<td>' + EducationalQualification + '</td>' +
							'<td>' + OtherEducationalQualification + '</td>' +
							'<td>' + EmploymentType + '</td>' +
							'<td>' + OtherEmploymentType + '</td>' +
							'<td>' + OrganisationName + '</td>' +
							'<td>' + CurrentDesignation + '</td>' +
							'<td>' + exportList.residentType + '</td>' +
							'<td>' + OtherResidentType + '</td>' +
							'<td>' + exportList.countryOfResidence + '</td>' +
							'<td>' + exportList.retiredFlag + '</td>' +
							'<td>' + exportList.retirementAge + '</td>' +
							'<td>' + exportList.emailAddress + '</td>' +
							'<td>' + AlternateEmailAddress + '</td>' +
							'<td>' + exportList.mobileNumber + '</td>' +
							'<td>' + exportList.emergencyContact + '</td>' +
							'<td>' + AddressLine1 + '</td>' +
							'<td>' + AddressLine2 + '</td>' +
							'<td>' + AddressLine3 + '</td>' +
							'<td>' + exportList.city + '</td>' +
							'<td>' + exportList.state + '</td>' +
							'<td>' + exportList.pinCode + '</td>' +
							'<td>' + exportList.country + '</td>' +
							'<td>' + exportList.addressType + '</td>' +
							'<td>' + Math.round(exportList.annualIncome) + '</td>' +
							'<td>' + exportList.isTobaccoUser + '</td>' +
							'<td>' + exportList.isNormalBMI + '</td>' +
							'<td>' + exportList.historyOfCriticalIllness + '</td>' +
							'<td>' + exportList.isNormalBP + '</td>' +
							'<td class="hidden"><input type="text" id="idClient" name="clientID"  value=' + exportList.id + ' readonly="readonly"></td>' +
					'</tr>');
				});
				$('#idExportTable').hide();
				$("#idExportListDownload").show();
		     }
		}
		 
	});

	$("#idExportListDownload").on("click", function(event) {
		$('#idExportTable').show();
		if (fileFormat == "excel"){
			$('#idExportTable').tableExport({type:'excel',escape:'false',tableName:'ClientExportRecords'+sessionStorage.getItem("SELECTED_USER_NAME")});
		} else {
			if (fileFormat == "csv"){
				$('#idExportTable').tableExport({type:'csv',escape:'false',tableName:'ClientExportRecords'+sessionStorage.getItem("SELECTED_USER_NAME")});
			}
		}
		
	    event.preventDefault();
	    $('#idExportTable').hide();
	});
	
	$('#idUserCRExport').change(function(){
		if($('#idUserCRExport').val() == ''){
		} else {
			indexSelected = $('#idUserCRExport').val();
			//alert(indexSelected)
			var selectedUserId = userIdList[parseInt(indexSelected)];
			$('#idRoleCRExport').val(userRoleList[parseInt(indexSelected)]);
			$('#idLocationCRExport').val(userLocationList[parseInt(indexSelected)]);
			$('#userHiddenId').val(selectedUserId);
			sessionStorage.removeItem("SELECTED_USER_ID");
			sessionStorage.setItem("SELECTED_USER_ID",selectedUserId);
		}
	});
	
});
function populateUserCombo(id) {
	var userDrop = $('#idUserCRExport');
	getClientData("GET", "", "getAllUsersForClientContact/" + id, onGetExistingUserSuccess);
	function onGetExistingUserSuccess(data) {
		userDrop.find('option').remove();
		userDrop.append('<option value="">Select User </option>');
		$.each(data, function (index, item) {
			// if 1 is the index then respective array index will bear the other info
			userDrop.append('<option value="' + index + '">' + item.userName + '</option>');
			userIdList.push(item.id);
			userRoleList.push(item.userRole);
			userLocationList.push(item.userLocation);
			
		});
	}

}
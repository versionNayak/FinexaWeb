var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var idAdvisor = loggedUser.id;
var idAdvisorMaster = loggedUser.advisorMasterId;
var idUser = loggedUser.userDTO.id;
//alert("id user "+idUser);
//alert(idAdvisor);
var flag=loggedUser.orgFlag;
var organizationName=loggedUser.orgName;
document.getElementById('idOrganisationName').value = organizationName;
var code = loggedUser.distributorCode;
document.getElementById('idDisributorCode').value = code;
var empCode = loggedUser.employeeCode;
document.getElementById('idEmployeeCode').value = empCode;

$("#idType").hide();
if (loggedUser.admin === "Y") {
	$("#idEmployeeCodeDiv").hide();
}

$(document).ready(function() {
	$("#idOrg").hide();
	var id1 = sessionStorage.getItem("SELECTED_USER_ID");
	
	//new code for access rights
		if(loggedUser.userManagementAddEdit === "Y"){
			$("#idEditUser").show();
		}else if(loggedUser.userManagementView === "Y"){
			$("#idEditUser").hide();
		}
	
	getClientData("GET", "", "userById/" + id1, onGetUserDataSuccess);
	
	/*"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$("#idBirthDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		endDate: new Date()
	});
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});*/
	
	function onGetUserDataSuccess(data) {
		populateForm($('#userCreation'), data);
		populateCountryDropDownWithSelectedVal($("#idCountry"),data.countryId);
		populateRoleDropDownWithSelectedVal($("#idRole"),data.roleId);
		
	}
	
	$("#idEditUser").on("click", function(event) {
		loadLoader();
		document.getElementById("idOrg").value="Y";
		document.getElementById("idEmployeeCode").value="0";
		if (validateUserCreation($('#userCreation'))) {
			
			var formData = $('#userCreation').serializeToJSON();
			formData["advisorID"] = idAdvisor;
			formData["roleId"] = $("#idRole").val();
			formData["userID"] = id1;
			formData["masterID"] = idAdvisorMaster;
			formData["organizationFlag"] = "Y";
			/*formData["organisationName"] = organizationName;
			formData["organizationFlag"] = flag;
			formData["disributorCode"] = code;*/
			//formData["masterID"] = idAdvisor;
			var data = JSON.stringify(formData);
			
			//getClientData("POST", data, "updateUser", onEditUserSuccess);
			getClientData("POST", data, "updateUser/" + idAdvisor, onEditUserSuccess);
		} else {
			hideLoader();
		}
		/*function onAddUserSuccess(data) {
			$("#idBusiness").load("userManagement/viewUserCreation.html");
			$(".dashboardheading    ").html("");
		    $(".dashboardheading").html("View User List");
		   
		}*/
		
		function onEditUserSuccess(data) {
			bootbox.alert("User details edited successfully")
			$("#idBusiness").empty();
			$("#idBusiness").load("userManagement/viewUserCreation.html");
		    $(".dashboardheading").html("View User List");
		    hideLoader();
	       
		}

	});
	
});
function populateRoleDropDownWithSelectedVal(dropDown,selectedId) {
	if(loggedUser.admin != null && loggedUser.admin === "Y") {
		//alert(selectedId)
		getClientData("GET", "", "getExistingRoleForUserEdit/" + selectedId, onGetExistingRoleForEditSuccess);
		function onGetExistingRoleForEditSuccess(data) {
			dropDown.append('<option value="' + data.id + '">' + data.roleDescription + '</option>');
			if (selectedId!=null) {
				dropDown.val(selectedId);
			}
		}
		
	} else {
		getClientData("GET", "", "getAllExistingRoles/" + idAdvisor, onGetExistingRolesSuccess);
		function onGetExistingRolesSuccess(data) {
			dropDown.find('option').remove();
			dropDown.append('<option value="">Select Roles</option>');
			$.each(data, function (index, item) {
				dropDown.append('<option value="' + item.id + '">' + item.roleDescription + '</option>');
			});
			if (selectedId!=null) {
				dropDown.val(selectedId);
				//alert(dropDown.val());
			}
		}
	}
//	alert($("#idRole"));
//	$('#idRole option:not(:selected)').prop('disabled', true);
	$('#idRole').attr("style", "pointer-events: none;");
}
function populateCountryDropDownWithSelectedVal(dropDown,selectedId) {
	getClientData("GET", "", "AllCountries",onCountrySuccess);
	function onCountrySuccess(data) {
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select Country</option>');
		$.each(data, function (index, item) {
			dropDown.append('<option value="' + item.id + '">' + item.name + '</option>');
		});
		if (selectedId!=null) {
			dropDown.val(selectedId);
			
		}
	}
}

/*function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"clientCashDelete/"+ sessionStorage.getItem("SELECTED_CASH_ID"));
	$.ajax({
			type : 'GET',
			async : true,
			url : ClientServiceUrl+"clientCash/client/" +selectedClientId,
			dataType : 'json',
			contentType : 'application/json',
			success : function(afterDeleteddata) {		                
					$("#idClient").load("clientInfo/viewCash.html");
					 $(".dashboardheading    ").html("");
		               $(".dashboardheading    ").html("View Cash");
		               $("#addRecord").removeClass('btn_Disabled');
	                   $('#editRecord').addClass('btn_Disabled');
                },
			error : function(data) {
				//alert("error add client service" + data.responseText);
			}     
			});
	
}	*/
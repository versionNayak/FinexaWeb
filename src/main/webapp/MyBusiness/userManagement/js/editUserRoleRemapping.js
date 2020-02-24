var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;
var userId = sessionStorage.getItem("SELECTED_USER_ID");
var roleId = sessionStorage.getItem("SELECTED_ROLE_ID");
var roleName = sessionStorage.getItem("SELECTED_ROLE_NAME");
$(document).ready(function() {
	$("#idExistingUserRole").val(roleName);
	$("#idEffectiveFromDate").val(sessionStorage.getItem("SELECTED_DATE"));
	populateUser(id,userId);
	$("#idUserRoleRemapping").prop("disabled", true);
	populateRoleCombo(id,roleId);	

	//new code for access rights
	if(loggedUser.userManagementView === "Y"){
		$("#idEditRoleRemapping").hide();
	}
	
	
	$("#idEffectiveFromDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		//startDate: new Date()
		startDate: '0d',
		endDate: '0d'
	});
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
//	alert(sessionStorage.getItem("SELECTED_DATE"));
	$('#idEffectiveFromDate').datepicker("setDate", new Date(sessionStorage.getItem("SELECTED_DATE")));
	$("#idEditRoleRemapping").on("click", function(event) {
		getClientDataAsyncFalse("GET", "", 'supervisorChecking?userID='+userId, onSuccess);
		function onSuccess(data){
			if (data==false){
				alert("Please remap the users under this supervisor first ")
			}else{
				validateRoleRemapping($('#idFormUserRoleRemappingEditMode'));
				var formData = $('#idFormUserRoleRemappingEditMode').serializeToJSON();
				formData["advisorId"] = id;
				formData["userID"] = userId;
				var data = JSON.stringify(formData);
//				alert(data);
				//console.log(data);
				getClientData("POST", data, "updateUserRoleRemapping", onAddUserRoleRemappingSuccess);
				function onAddUserRoleRemappingSuccess(data) {

					$("#idBusiness").load("userManagement/viewUserRoleRemapping.html");
					$(".dashboardheading    ").html("");
					$(".dashboardheading").html("View User Role Remapping");

				}
			}
		}
		
	});

});

function populateRoleCombo(id,selectedId) {
	var roleDrop = $('#idNewUser');
	getClientData("GET", "", "getAllExistingRolesForUserCreation/" + id, onGetExistingRolesSuccess);
	function onGetExistingRolesSuccess(data) {
		roleDrop.find('option').remove();
		roleDrop.append('<option value="">Select Roles</option>');
		$.each(data, function (index, item) {
			roleDrop.append('<option value="' + item.id + '">' + item.roleDescription + '</option>');
		});
		if (selectedId != null) {
			roleDrop.val(selectedId);
		}
	}
}

function populateUser(id,selectedId) {
	var dropDown = $("#idUserRoleRemapping");
	getClientData("GET", "", "getUserList/" +id , onGetUserSuccess);
	function onGetUserSuccess(data) {
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select User</option>');
		$.each(data, function (index, relation) {
			dropDown.append('<option value="' + relation.id + '">' + relation.userName + '</option>');
		});
		if (selectedId != null) {
			dropDown.val(selectedId)
		}
		//$('#idUserRoleRemapping').attr("style", "pointer-events: none;");
	}
}



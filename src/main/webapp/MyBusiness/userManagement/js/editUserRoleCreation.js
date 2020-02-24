$(document).ready(function() {

	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var id=loggedUser.id;
	var supervisorId = sessionStorage.getItem("SELECTED_SUPERVISER_ROLE_ID");
	var supervisorRole = sessionStorage.getItem("SELECTED_SUPERVISER_ROLE_DESC");
	var roleName = sessionStorage.getItem("SELECTED_USER_ROLE_NAME");
	var roleId = sessionStorage.getItem("SELECTED_USER_ROLE_ID");
	//populateRoleCombo(id,supervisorId,roleId);	
	
	//new code for access rights
	if(loggedUser.userManagementAddEdit === "Y"){
		$("#idEditUserRole").show();
	}else if(loggedUser.userManagementView === "Y"){
		$("#idEditUserRole").hide();
	}
	
	$('#idRole').val(roleName);
	//$('#idSVRole').prop("readonly",true);
	document.getElementById("idSVRole").value = supervisorRole;
	//$('#idSVRole').val(supervisorRole);
	
$("#idEditUserRole").on("click", function(event) {
	
	validateEditRoleCreation($('#idFormUserRoleCreationEditMode'));
	   // alert("success");
		var formData = $('#idFormUserRoleCreationEditMode').serializeToJSON();
		formData["advisorId"] = id;
		var data = JSON.stringify(formData);
//		alert(data);
		//console.log(data);
		getClientData("POST", data, "updateRole", onAddRoleSuccess);
		function onAddRoleSuccess(data) {
			
			$("#idBusiness").load("userManagement/viewUserRoleCreation.html");
			$(".dashboardheading    ").html("");
		    $(".dashboardheading").html("View User Roles List");
		   
		}
	});
	
});




/*function populateRoleCombo(id,selectedId,roleId) {
	var roleDrop = $('#idSVRole');
	getClientData("GET", "", "getAllExistingRoles/" + id, onGetExistingRolesSuccess);
	function onGetExistingRolesSuccess(data) {
		roleDrop.find('option').remove();
		roleDrop.append('<option value="">Select Supervisor Roles</option>');
		$.each(data, function (index, item) {
			roleDrop.append('<option value="' + item.id + '">' + item.roleDescription + '</option>');
		});
		if (selectedId!=null) {
			if (selectedId == roleId) {
				roleDrop.append('<option value="'+roleId+'" selected>Not Applicable</option>');
			} else {
				roleDrop.append('<option value="'+roleId+'">Not Applicable</option>');
				roleDrop.val(selectedId);
			}
			
		}
	}

}*/
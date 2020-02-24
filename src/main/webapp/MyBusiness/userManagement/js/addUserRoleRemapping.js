var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;
var userArray = [];
var userIdList = [];
var userName = []
var idRoleName;
$(document).ready(function() {
	var id=loggedUser.id;
	populateRoleCombo(id);	
	populateUser(id);
	
	//new code for access rights
		if(loggedUser.userManagementAddEdit === "Y"){
			$("#idAddRoleRemapping").show();
		}else if(loggedUser.userManagementView === "Y"){
			$("#idAddRoleRemapping").hide();
		}
	
	$("#idEffectiveFromDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		startDate: '0d',
		endDate: '0d'
		//minDate: '1d'
		//startDate: new Date()
	});
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	$("#idAddRoleRemapping").on("click", function(event) {
		//alert("success");
		getClientDataAsyncFalse("GET", "", 'supervisorChecking?userID='+userIdList[parseInt(idRoleName)], onSuccess);
		function onSuccess(data){
			if (data==false){
				alert("Please remap the users under this supervisor first ")
			}else{
				var status = validateRoleRemapping($('#idFormAddUserRoleRemapping'));
				if(status == true) {
					var formData = $('#idFormAddUserRoleRemapping').serializeToJSON();
					formData["advisorId"] = id;
					formData["userID"] = userIdList[parseInt(idRoleName)];
					var data = JSON.stringify(formData);
					//console.log(data);
					getClientData("POST", data, "createUserRoleRemapping", onAddUserRoleRemappingSuccess);
					function onAddUserRoleRemappingSuccess(data) {
						$("#idBusiness").empty();
						$("#idBusiness").load("userManagement/viewUserRoleRemapping.html");
						$(".dashboardheading    ").html("");
						$(".dashboardheading    ").html("View User Role Remapping");
						$("#addRecord").removeClass('btn_Disabled');
						$('#editRecord').addClass('btn_Disabled');
						$('#deleteRecord').addClass('btn_Disabled');
					}
				}

			}
		}
				
	  
	});
	
});
  
  $('#idUserRoleRemapping').change(function(){
	  
	
		if($('#idUserRoleRemapping').val() == ''){
		} else {
			//var id = $('#idUserRoleRemapping').val();
			idRoleName = $('#idUserRoleRemapping').val();
			$("#idName").val(userName[idRoleName]);
			  getClientDataAsyncFalse("GET", "", 'userChecking?userId='+userIdList[parseInt(idRoleName)], onSuccess);
				function onSuccess(data){
					if (data==false){
						bootbox.alert("This user is already assigned to a Supervisor. Please remove the user from hierarchy mapping and try again ")
						 $("#idAddRoleRemapping").prop("disabled", true);
						
					}else{ 
				 $("#idAddRoleRemapping").prop("disabled", false);
			          }
				}
			$('#idRoleName').val(userArray[parseInt(idRoleName)]);
			
		}
	
});

function populateRoleCombo(id) {
	var roleDrop = $('#idNewUser');
	getClientData("GET", "", "getAllExistingRolesForUserCreation/" + id, onGetExistingRolesSuccess);
	function onGetExistingRolesSuccess(data) {
		roleDrop.find('option').remove();
		roleDrop.append('<option value="">Select Roles</option>');
		$.each(data, function (index, item) {
			roleDrop.append('<option value="' + item.id + '">' + item.roleDescription + '</option>');
		});
	}

}

function populateUser(id) {
	var formData = $('#idFormInternal').serializeToJSON();
	var dropDown = $("#idUserRoleRemapping");
	getClientData("GET", "", "getUserList/" +id , onGetUserSuccess);
	function onGetUserSuccess(data) {
		//alert(userArray);
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select User</option>');
		$.each(data, function (index, relation) {
			dropDown.append('<option value="' + index + '">' + relation.emailID + '</option>');
			userIdList.push(relation.id)
			userArray.push(""+relation.userRole);
			userName[index] = relation.userName
		});
	}
}



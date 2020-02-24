var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
//alert("loggedUser" + loggedUser);
//alert(sessionStorage.getItem("SELECTED_USER_LOCATION"));
//alert(sessionStorage.getItem("SELECTED_CLIENT_NAME"));
var id=loggedUser.id;
var userArray = [];
var userIdList = [];
var idRemappedRole;
$(document).ready(function() {
	
	populateAllUser(id,sessionStorage.getItem("SELECTED_USER_ID"));
	// hardcoded later to be changed
	$("#idRoleName").val("Admin");
	$("#idCountry").val(sessionStorage.getItem("SELECTED_USER_LOCATION"));
	$("#idClientName").val(sessionStorage.getItem("SELECTED_CLIENT_NAME"));
	populateUser(id);


	$("#idDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		endDate: new Date()
	});
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
//	alert(sessionStorage.getItem("SELECTED_DATE"));

	$("#idSaveRemapping").on("click", function(event) {
		var status = validateEditClientRemapping($('#idEditmappingRoleForm'));
		if(status == true) {
		var formData = $('#idEditmappingRoleForm').serializeToJSON();
		formData["userId"] = userIdList[parseInt(idRemappedRole)];
		formData["clientId"] = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var data = JSON.stringify(formData);
		//alert(data);
		getClientData("POST", data, "clientRecord/remapClientByUser", onEditRemapSuccess);
		function onEditRemapSuccess(data) {
			$("#idBusiness").load("clientRecords/viewMappingClient.html");
			$(".dashboardheading    ").html("");
			$(".dashboardheading").html("View client Remapping");
		}
	}
});
		$('#idRemappedUser').change(function(){
			if($('#idRemappedUser').val() == ''){
			} else {
				idRemappedRole = $('#idRemappedUser').val();
				$('#idRemappedRole').val(userArray[parseInt(idRemappedRole)]);
			}
		});
});
	


function populateAllUser(id,selectedId) {
	var dropDown = $("#idUserName");
	getClientData("GET", "", "getAllUsersForClientContact/" +id , onGetUserSuccess);
	function onGetUserSuccess(data) {
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select User</option>');
		$.each(data, function (index, relation) {
			dropDown.append('<option value="' + relation.id + '">' + relation.userName + '</option>');
		});
		if (selectedId != null) {
			dropDown.val(selectedId)
		}
		$('#idUserName').attr("style", "pointer-events: none;");
	}
}
 
function populateUser(id) {
	
	var dropDown = $("#idRemappedUser");
	getClientData("GET", "", "getUserList/" +id , onGetUserSuccess);
	function onGetUserSuccess(data) {
		//alert(userArray);
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select User</option>');
		$.each(data, function (index, relation) {
			dropDown.append('<option value="' + index + '">' + relation.userName + '</option>');
			userIdList.push(relation.id)
			userArray.push(""+relation.userRole);
		});
	}
}



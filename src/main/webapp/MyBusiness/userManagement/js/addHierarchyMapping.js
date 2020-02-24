var userRoleList = []; 
var userRoleIdList = []
var supervisorList = [];
var userIdList = [];
var supervisorIdList = [];
var userName = [];
var userId;
var supervisorId;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;
$(document).ready(function() {

	//new code for access rights
			if(loggedUser.userManagementAddEdit === "Y"){
				$("#idAddHierarchyButton").show();
			}else if(loggedUser.userManagementView === "Y"){
				$("#idAddHierarchyButton").hide();
			}
			
	var advisorMasterId = loggedUser.advisorMasterId;
	populateUserCombo(id);	
	$("#idDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		startDate: '0d',
		endDate: '0d'
	});
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	
	$('#idHierarchyUser').change(function(){
		//userId = $(this).val();
		//alert(userId);
		if($('#idHierarchyUser').val() == ''){
		} else {
			//alert($('#idHierarchyUser').val());
			var idRoleName = $('#idHierarchyUser').val();
			var supervsorRoleId = supervisorIdList[parseInt(idRoleName)];
			var supervisorRoleName = supervisorList[parseInt(idRoleName)];
			//alert(supervisorRoleName);
			var roleId = userRoleIdList[parseInt(idRoleName)];
			
			index = $('#idHierarchyUser').val();
			name = userName[index];
			//alert("userName " + userName);
			document.getElementById('idUserName').value = name;
			
			if(supervisorRoleName == "Not Applicable") {
				$('#idHierarchyRole').val(userRoleList[parseInt(idRoleName)]);
				$("#idHierarchySupervisorRole").val("Not Applicable");
				$("#idHS").prop("disabled", true);
				alert("This user Role is not supervised by any other role");
				$("#idAddHierarchyButton").prop("disabled", true);
				
			} else {
				userId = userIdList[parseInt(idRoleName)];
				getClientDataAsyncFalse("GET", "", 'checkSupervisorMapping?userID='+userId, onSuccess);
				function onSuccess(data){
					if (data==false){
						bootbox.alert("This user is already assigned to a Supervisor. Please choose another user ")
						$('#idHierarchyRole').val(userRoleList[parseInt(idRoleName)]);
						$("#idHierarchySupervisorRole").val(supervisorList[parseInt(idRoleName)]);
						 $("#idHS").prop("disabled", true);
						 $("#idAddHierarchyButton").prop("disabled", true);
						
					} else {
				
						$('#idHierarchyRole').val(userRoleList[parseInt(idRoleName)]);
						$("#idHierarchySupervisorRole").val(supervisorList[parseInt(idRoleName)]);
						 $("#idHS").prop("disabled", false);
						 $("#idAddHierarchyButton").prop("disabled", false);
						// ajax call to populate supervisors
						//alert(supervsorRoleId);
						/*sessionStorage.removeItem("SELECTED_USER_ID");
						sessionStorage.setItem("SELECTED_USER_ID",userId);*/
						getClientData("GET", "" , 'getAllUserForSelectedSupervisorRole?&masterID='+advisorMasterId+'&roleDescription='+supervisorRoleName, onGetDataSuccess);
						function onGetDataSuccess(data){
							console.log(data);
							var moduleDrop = $('#idHS');
							moduleDrop.find('option').remove();
							moduleDrop.append('<option value="">Select Users</option>');
							$.each(data, function (index, item) {
								moduleDrop.append('<option value="' + item.userID + '">' + item.userName + '</option>');
							});
						}
						$('#idHS').change(function(){
							
							supervisorId = $(this).val();
							//alert(supervisorId);
						});
						/*getClientData("GET", "", 'getAdvisorUsersWithSupervisorRole?&supRoleId='+supervsorRoleId, onGetSuccess);
						function onGetSuccess(data) {
		
							if (data.length == 0){
								alert("No user available for this supervisor role");
							}
		//					alert('Successfully called');
							var supervisorDrop = $('#idHS');
							supervisorDrop.find('option').remove();
							supervisorDrop.append('<option value="">Select Supervisor </option>');
							$.each(data, function (index, item) {
								var name = item.firstName +" "+ item.lastName; 
								// if 1 is the index then respective array index will bear the other info
								supervisorDrop.append('<option value="' + item.id + '">' + name + '</option>');
							});
						
						}*/
					}	
			}

		}
		}
	});
	
	
	$("#idAddHierarchyButton").on("click", function(event) {
		var status = validateHierarchyMapping($('#idHierarchyMappingForm'));
		if(status == true) {
			var formData = $('#idHierarchyMappingForm').serializeToJSON();
			formData["advisorId"] = id;
			formData["userId"] = userId;
			formData["supervisorId"] = supervisorId;
			
			//formData["effectiveDate"] = $("#idDate").datepicker( "getDate" );
			var data = JSON.stringify(formData);
			//alert(data);
			//console.log(data);
			getClientData("POST", data, "saveUserHierarchy", onAddHierarchySuccess);
			function onAddHierarchySuccess(data) {
				
				$("#idBusiness").load("userManagement/viewHierarchyMapping.html");
				$(".dashboardheading    ").html("");
			    $(".dashboardheading").html("View Hierarchy Mapping List");
			    $("#addRecord").removeClass('btn_Disabled');
				$('#editRecord').addClass('btn_Disabled');
				$('#deleteRecord').addClass('btn_Disabled');
			}
		}
		
	});
	
});

 function populateUserCombo(id) {
		var userDrop = $('#idHierarchyUser');
		//alert(id)
		getClientData("GET", "", "getUnsupervisedUserList/" + id, onGetExistingUsersSuccess);
		function onGetExistingUsersSuccess(data) {
			//userDrop.find('option').remove();
			//userDrop.append('<option value="">Select User </option>');
			$.each(data, function (index, item) {
				// if 1 is the index then respective array index will bear the other info
				userDrop.append('<option value="' + index + '">' + item.emailID + '</option>');
				//userDrop.append('<option value="' + item.id + '">' + item.userName + '</option>');
				userRoleList.push(item.userRole);
				userIdList.push(item.id);
				userRoleIdList.push(item.userRoleId);
				supervisorList.push(item.supervisorRoleName);
				supervisorIdList.push(item.supervisorRoleId);
				userName.push(item.userName);
			});
		}

	}
 


 
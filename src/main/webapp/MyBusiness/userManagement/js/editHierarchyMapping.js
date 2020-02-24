var HUserId = sessionStorage.getItem("SELECTED_USER_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
$(document).ready(function() {
	
	var idAdvisor = loggedUser.id;
	var advisorMasterId = loggedUser.advisorMasterId;
	var supervisorId;
	
	//new code for access rights
	if(loggedUser.userManagementAddEdit === "Y"){
		$("#idEditHierarchyButton").show();
	}else if(loggedUser.userManagementView === "Y"){
		$("#idEditHierarchyButton").hide();
	}
	
	$("#idDate").datepicker({
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

	getClientData("GET", "", "getUserHierarchy/" + HUserId, onGetHierarchySuccess);
	function onGetHierarchySuccess(data) {
		console.log("new" +data);
		populateForm($('#idHierarchyMappingEditForm'), data);
		populateUserDrop(data.userId,idAdvisor);
		 $("#idHierarchyUser").prop("disabled", true);
		populateSupervisorDropDownWithSelectedVal(data.supervisorRoleID,idAdvisor);
		supervisorId =data.supervisorId;
		/*getClientData("GET", "" , 'getAllUserForSelectedSupervisorRole?&masterID='+advisorMasterId+'&roleDescription='+data.supervisorRole, onGetDataSuccess);
		function onGetDataSuccess(data){
			console.log(data);
			var moduleDrop = $('#idHS');
			moduleDrop.find('option').remove();
			moduleDrop.append('<option value="">Select Users</option>');
			$.each(data, function (index, item) {
				moduleDrop.append('<option value="' + item.userID + '">' + item.userName + '</option>');
			});
		}*/
	}
	
	$('#idHS').change(function(){
		
		supervisorId = $(this).val();
		
	});
	//alert(supervisorId);
	$("#idEditHierarchyButton").on("click", function(event) {
		validateHierarchyMapping($('#idHierarchyMappingEditForm'));
		var formData = $('#idHierarchyMappingEditForm').serializeToJSON();
		formData["advisorId"] = idAdvisor;
		formData["userId"] = HUserId;
		formData["supervisorId"] = supervisorId;
		var data = JSON.stringify(formData);
    	//alert(data);
		getClientData("POST", data, "updateUserHierarchy", onEditHierarchySuccess);
		function onEditHierarchySuccess(data) {
			// console.log("Saved cash id = " + data.id);
			$("#idBusiness").load("userManagement/viewHierarchyMapping.html");
		    $(".dashboardheading").html("View Hierarchy Mapping List");
	       
		}

	});

});


function populateSupervisorDropDownWithSelectedVal(selectedId,idAdvisor) {
	
	//getClientDataAsyncFalse("GET", "", 'getSupervisorsWithSameRole?advisorId='+idAdvisor+'&roleId='+selectedId, onGetSuccess);
	getClientDataAsyncFalse("GET", "", "/getSupervisorsWithSameRole/"+idAdvisor+"/"+selectedId, onGetSuccess);
	
	function onGetSuccess(data) {
//		alert('Successfully called');
		var supervisorDrop = $('#idHS');
		supervisorDrop.find('option').remove();
		supervisorDrop.append('<option value="">Select Supervisor </option>');
		$.each(data, function (index, item) {
			// if 1 is the index then respective array index will bear the other info
			supervisorDrop.append('<option value="' + item.supervisorId + '">' + item.supervisorName + '</option>');
			
			/*if (selectedId != null) {
				$("#idHS option").filter(function() {
					return this.value==data.supervisorId;			    
				}).prop('selected', true); 
			}
			*/
		});
		getClientDataAsyncFalse("GET", "", "getUserSpecific/"+ HUserId, onNewSuccess);
		function onNewSuccess(hierarchyData) {
			$("#idHS option").filter(function() {
				return this.value==hierarchyData.supervisorId;			    
			}).prop('selected', true); 
		}
	}
}

function populateUserDrop(selectedId,idAdvisor) {
	var userDrop = $('#idHierarchyUser');
	getClientData("GET", "", "getUserHierarchyMapping/" + idAdvisor, onGetExistingRolesSuccess);
	function onGetExistingRolesSuccess(data) {
		userDrop.find('option').remove();
		userDrop.append('<option value="">Select User </option>');
		$.each(data, function (index, item) {
			// if 1 is the index then respective array index will bear the other info
			userDrop.append('<option value="' + item.userId + '">' + item.userName + '</option>');
		});
		if (selectedId != null) {
			userDrop.val(selectedId);
		}
	}

}


	



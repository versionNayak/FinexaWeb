$(document).ready(function() {
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var id=loggedUser.id;
	var advisorMasterId = loggedUser.advisorMasterId;
	var role;
	
	//new code for access rights
	if(loggedUser.userManagementAddEdit === "Y"){
		$("#idAddUserRole").show();
	}else if(loggedUser.userManagementView === "Y"){
		$("#idAddUserRole").hide();
	}
	
	if(loggedUser.advisorAdmin === "Y" ){
		//alert(loggedUser.advisorAdmin);
	}
	populateStaticRoleDrop($("#idRole"));
	var supervisor;
	$("#idRole").change(function(){
		 role = $(this).val();
		// alert(role);
		    document.getElementById("idRole").style.border = "1px solid #ccc";
			document.getElementById('alertRole').innerHTML="";
			getClientDataAsyncFalse("GET", "", 'userCreation?masterID='+advisorMasterId+'&roleDescription='+role, onSuccess);
			function onSuccess(data){
				if (data==false){
					document.getElementById('alertRole').innerHTML="Role already exists";
					document.getElementById("idRole").style.border = "2px solid red";
					$("#idAddUserRole").attr("disabled", true);
				}else{
					$("#idAddUserRole").attr("disabled", false);
				}
			}
			  if(role == "Admin"){
				  document.getElementById("idSVRole").value = "Not Applicable";
				  supervisor = document.getElementById("idSVRole").value;
			  }else if(role == "Head"){
				  document.getElementById("idSVRole").value = "Admin";
				  supervisor = document.getElementById("idSVRole").value;
			  }else if(role == "Branch Manager"){
				  document.getElementById("idSVRole").value = "Head";
				  supervisor = document.getElementById("idSVRole").value;
			  }else if(role == "Relationship Manager" || role == "Sub Broker"){
				  document.getElementById("idSVRole").value = "Branch Manager";
				  supervisor = document.getElementById("idSVRole").value;
			  }
	  });
	
	$("#idOrganisationName").blur(function(){
		var orgFlag = $("#idOrg").val();
		//alert("orgFlag " + orgFlag);
		if(orgFlag == "Y") {
			var orgName = $("#idOrganisationName").val();
			//alert("Blur Working " + orgName);
			
		}
		
		
	});

	
	$("#idAddUserRole").on("click", function(event) {
		$("#idAddUserRole").attr("disabled", true);
		var status = validateRoleCreation($('#idFormUserRoleCreation'));
		if(status == true) {
		var formData = $('#idFormUserRoleCreation').serializeToJSON();
		formData["advisorId"] = id;
		formData["supervisorRole"] = supervisor;
		formData["roleDescription"] = role;
		
		var data = JSON.stringify(formData);
		//alert(data);
		//console.log(data);
		getClientData("POST", data, "createRole", onAddRoleSuccess);
		function onAddRoleSuccess(data) {
			
			$("#idBusiness").load("userManagement/viewUserRoleCreation.html");
			$(".dashboardheading    ").html("");
		    $(".dashboardheading").html("View User Roles List");
		    $("#addRecord").removeClass('btn_Disabled');
			$('#editRecord').addClass('btn_Disabled');
			$('#deleteRecord').addClass('btn_Disabled');
		 }
	   }
	});
	
	
	
});

//static role implementation
function populateStaticRoleDrop(dropId) {
	
	getClientData("GET", "", "getAllRoles", onCountrySuccess);
	function onCountrySuccess(data) {
		console.log(data);
		dropId.append('<option value="">Select Role</option>');
		$.each(data, function (index, item) {
			
			dropId.append('<option value="' + item.description + '" >'
				+ item.description + '</option>');
			
	  });
		
		if(loggedUser.advisorAdmin === "Y" ){
			$("#idRole option[value='Admin']").remove();
		}
	}
}

//dynamic role implementation
/*function populateRoleCombo(id) {
	var roleDrop = $('#idSVRole');
	getClientData("GET", "", "getAllRoles/" + id, onGetExistingRolesSuccess);
	function onGetExistingRolesSuccess(data) {
		roleDrop.find('option').remove();
		roleDrop.append('<option value="">Select Supervisor Roles</option>');
		$.each(data, function (index, item) {
			roleDrop.append('<option value="' + item.id + '">' + item.roleDescription + '</option>');
		});
		roleDrop.append('<option value="0">Not Applicable</option>');
	}

}*/
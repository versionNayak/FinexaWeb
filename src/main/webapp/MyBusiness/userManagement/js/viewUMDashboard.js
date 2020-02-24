var admin = "N";
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	getClientDataAsyncFalse("GET", "", "user/"+loggedUser.id, onUserRoleSuccess);
	function onUserRoleSuccess(data) {
			if(data.admin == "Y"){
				admin = "Y";
			}
		}
$(document).ready(function(){
	
		
	/***********************Default On Load MyBusiness*****************************/
	
	
	
	// hide the columns
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	if(loggedUser.admin == "Y"){
		//alert("loggedUser.admin "+loggedUser.admin);
		$("#idBusiness").empty();
		$("#idBusiness").load("userManagement/viewUserCreation.html");
		$(".dashboardheading    ").html("");
		$(".dashboardheading    ").html("View User List");
	}
	getClientDataAsyncFalse("GET", "", "user/"+loggedUser.id, onUserRoleSuccess);
	function onUserRoleSuccess(data) {
		//alert(data.admin);
		if(data.admin == "Y"){
			$('.user_role_creation').hide();
			$('.user_role_remapping').hide();
			$('.hierarchy_mapping').hide();
			$('.actvate_users').hide();
		}else{
		    sessionStorage.setItem("USER_PAGE_MODE", "VIEW");
			$("#idBusiness").empty();
			$("#idBusiness").load("userManagement/viewUserCreation.html");
			$(".dashboardheading    ").html("");
			$(".dashboardheading    ").html("View User List");
		}
	}
	

	var url = "userManagement/addUserCreation.html";
	var heading="   Add Users";
	
	if((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "Y" )){

						$("#headIcon").empty();
						$("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' " +
								"onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
										"margin-right:6px'  title='Add'/>");
						//if(admin != "Y") {
						url = "userManagement/editUserCreation.html";
						heading="   Edit Users";
						$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' " +
								"onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
										"margin-right:6px'  title='Edit'/>");
						//}
		
	  } else {
		//if  view access present and add/Edit not present then edit button will be named as view details
		if((loggedUser != null) && (loggedUser.userManagementView != null && loggedUser.userManagementView === "Y" )){
						url = "userManagement/editUserCreation.html";
						heading="View User Details";
						$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png' id='editRecord' " +
								"onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
								"margin-right:6px' title='View Details'/>");
			   
		}
	}

	//if  Delete access present
	if(((loggedUser != null) && (loggedUser.admin != "Y")) && (loggedUser.userManagementDelete != null && loggedUser.userManagementDelete === "Y" )){
		
						url = "userManagement/viewUserCreation.html";
						$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' " +
								"onClick='deleteRow()' style='width:23px;margin-top:-2px;" +
								"margin-right:6px'  title='Delete'/>");
					
	  }
	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	$('#deleteRecord').addClass('btn_Disabled');
});

$(".user_creation").click(function(){
//	alert('clicked user creation');
    sessionStorage.setItem("USER_PAGE_MODE", "VIEW");
	$("#idBusiness").empty();
	$("#idBusiness").load("userManagement/viewUserCreation.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("View User List");
});
	
$(".user_upload").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("userManagement/userUpload.html");
	$(".dashboardheading").html("Bulk Upload");
	$("#wrapper").css("height","auto");
	$("#dashbord").css("height","auto");
	$(".form-section-container").css("height","auto");
	$('.deleteicon').addClass('btn_Disabled');
	$('.editicon').hide();
	$('.addicon').hide();
	$('.user_table').hide();
});

$(".process_status").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("userManagement/runningProcess.html");
	$(".dashboardheading").html("Bulk Upload Log");
	$("#wrapper").css("height","auto");
	$("#dashbord").css("height","auto");
	$(".form-section-container").css("height","auto");
	$('.deleteicon').hide();
	$('.editicon').hide();
	$('.addicon').hide();
	$('.user_table').hide();
});
 
$(".user_password_management").click(function(){
	$("#headIcon").empty();
	$("#idBusiness").empty();
	$("#idBusiness").load("userManagement/viewUserPasswordManagement.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("View  User Password Management List");
});

$(".user_role_creation").click(function(){
	//alert('click');

//	alert('clicked user creation');
	$("#idBusiness").empty();
	$("#idBusiness").load("userManagement/viewUserRoleCreation.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("View User Role Creation");
	
	$("#headIcon").empty();
	var url = "userManagement/addUserRoleCreation.html";
	var heading="   Add User Role ";
	
	if((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "Y" )){

					$("#headIcon").empty();
					$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' " +
							"onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
									"margin-right:6px'  title='Add'/>");
	   }
	/*url = "userManagement/editUserRoleCreation.html";
	heading="  Edit User Role Creation";
	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");*/
	//if  Delete access present
	if((loggedUser != null) && (loggedUser.userManagementDelete != null && loggedUser.userManagementDelete === "Y" )){
		
					url = "userManagement/viewUserRoleCreation.html";
					$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' " +
							"onClick='deleteRow()' style='width:23px;margin-top:-2px;" +
							"margin-right:6px'  title='Delete'/>");
		
	}
	
	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	$('#deleteRecord').addClass('btn_Disabled');
});

$(".user_role_remapping").click(function(){

	$("#idBusiness").empty();
	$("#idBusiness").load("userManagement/viewUserRoleRemapping.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("View User Role Remapping");
	$("#headIcon").empty();
	
	var url = "userManagement/addUserRoleRemapping.html";
	var heading="   Add User Role Remapping ";
	
	if((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "Y" )){

		$("#headIcon").empty();
		$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' " +
				"onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
						"margin-right:6px'  title='Add'/>");

						/*url = "userManagement/editUserRoleRemapping.html";
						heading="  Edit User Role Remapping ";
						$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' " +
								"onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
										"margin-right:6px'  title='Edit'/>");*/
						
						 if((loggedUser != null) && (loggedUser.userManagementView != null && loggedUser.userManagementView === "Y" )){
					  			url = "userManagement/editUserRoleRemapping.html";
								heading="View User Role Remapping Details";
								$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' " +
										"onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
										"margin-right:6px' title='View Details'/>");
					   
				}
		
		
	  } 

					/*url = "userManagement/viewUserRoleRemapping.html";
					$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' 
					onClick='deleteRecord()' style='width:23px;margin-top:-2px;
					margin-right:6px'  title='Add'/>");*/
					
	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	
});


$(".hierarchy_mapping").click(function(){
	//alert('click');

//	alert('clicked user creation');
	
	$("#idBusiness").empty();
	$("#idBusiness").load("userManagement/viewHierarchyMapping.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("View Hierarchy Mapping");
	$("#headIcon").empty();
	var url = "userManagement/addHierarchyMapping.html";
	var heading="   Add User Hierarchy ";
	
	
	if((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "Y" )){

						$("#headIcon").empty();
						$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' " +
								"onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;" +
										"margin-top:-2px;margin-right:6px'  title='Add'/>");
				
						url = "userManagement/editHierarchyMapping.html";
						heading="  Edit User Hierarchy";
						$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' " +
								"onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
										"margin-right:6px'  title='Edit'/>");
						
		
	  } else {
		//if  view access present and add/Edit not present then edit button will be named as view details
		if((loggedUser != null) && (loggedUser.userManagementView != null && loggedUser.userManagementView === "Y" )){
						url = "userManagement/editHierarchyMapping.html";
						heading="View User Hierarchy Details";
						$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' " +
								"onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
								"margin-right:6px' title='View Details'/>");
			   
		}
	}

	//if  Delete access present
	if((loggedUser != null) && (loggedUser.userManagementDelete != null && loggedUser.userManagementDelete === "Y" )){
		
						url = "userManagement/viewHierarchyMapping.html";
						$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' " +
								"style='width:23px;margin-top:-2px;" +
								"margin-right:6px'  title='Delete'/>");
					
	}
	
	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	$("#deleteRecord").addClass('btn_Disabled');
	
	
});


$(".access_rights").click(function(){
	//alert('click');
	$("#idBusiness").empty();
	if(admin != "Y") {
		$("#idBusiness").load("userManagement/addEditViewAccessRights.html");
	} else {
		$("#idBusiness").load("userManagement/addEditViewAccessRightsFinlabsAdmin.html");
	}
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Access Rights");
	$("#headIcon").empty();
/*	$("#headIcon").empty();
	$("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png' id='editRecord' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	
	$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	
	$("#addRecord").addClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	$('#deleteRecord').addClass('btn_Disabled');*/
});

$(".actvate_users").click(function(){
	//alert('click');
	$("#idBusiness").empty();
	if(admin != "Y") {
		$("#idBusiness").load("userManagement/activateDeactivateUsers.html");
	}
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Activate/Deactivate Users");
	$("#headIcon").empty();
});

$(".loggedin-history").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("loggedinHistory/viewLoggingHistory.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("View Logged-in History");
	$("#addRecord").addClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	$('#deleteRecord').addClass('btn_Disabled');
});


$('.sidebar-nav li a').click(function(){
	$('.mandatory').hide();
});

$(".addicon").click(function(){
	$('.mandatory').show();
});

$(".editicon").click(function(){
	$('.mandatory').show();
});

$('.sidebar-nav.nav-stacked>li.has-submenu').click(function(){
	$('.editicon').show();
	$('.editicon').addClass('btn_Disabled');
	$('.addicon').show();
	$('.deleteicon').show();
})


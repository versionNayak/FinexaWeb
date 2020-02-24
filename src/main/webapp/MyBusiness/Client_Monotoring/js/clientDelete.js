var orgName;
var userName;
$(document).ready(function() {
	$('#idModuleDiv').hide();
	var roleId;
	var masterID;
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var id=loggedUser.id;
	var advisorId
	var orgFlag;
	
	//new code for access rights
	if(loggedUser.userManagementAddEdit === "Y"){
		$("#idAccessRightSubmit").show();
	}else if(loggedUser.userManagementView === "Y"){
		$("#idAccessRightSubmit").hide();
	}
	
	//$("#idViewAccessRights").attr("disabled", true);

	$('#idorgFlag').change(function(){
		orgFlag = $(this).val();
		$("#idSubmoduleTable").empty();
		$('#idName').val("");
		$('#idAdvisor').empty();
		if ($(this).val() == "Y") {
			$("#idOrganization").prop("disabled", false);
			$("#idRole").prop("disabled", false);
			getClientData("GET", "" , "allOrgName", onGetDropDownSuccess);
			function onGetDropDownSuccess(data){
				var moduleDrop = $('#idOrganization');
				moduleDrop.find('option').remove();
				moduleDrop.append('<option value="">Select Organization</option>');
				$.each(data, function (index, item) {
					moduleDrop.append('<option value="' + item.id + '">' + item.orgName + '</option>');
				});
			}
		}else{
			/*$("#idOrganization").val("");
			$("#idRole").val("");*/
			
			$("#idOrganization").prop("disabled", true);
			$('#idOrganization').empty();
			$("#idRole").prop("disabled", true);
			getClientData("GET", "" , "showSelf", onGetDataSuccess);
			function onGetDataSuccess(data){
				var moduleDrop = $('#idAdvisor');
				moduleDrop.find('option').remove();
				moduleDrop.append('<option value="">Select User</option>');
				$.each(data, function (index, item) {
					moduleDrop.append('<option value="' + item.id + '">' + item.loginUsername + '</option>');
					a[item.id] = item.advisorUserName;
				});
			}

		}
	});
	
	
	
	$("#idOrganization").change(function(){
		 masterID = $(this).val();
		 if(masterID > 0) {
			 getClientData("GET", "" , 'getAllRolesForSelectedOrg?&masterID=' +$(this).val(), onGetDataSuccess);
			  function onGetDataSuccess(data){
				  console.log(data);
				  	var moduleDrop = $('#idRole');
		    		moduleDrop.find('option').remove();
		    		moduleDrop.append('<option value="">Select Roles</option>');
					//$.each(data, function (index, item) {
						moduleDrop.append('<option value="' + data.roleId + '">' + data.roleDescription + '</option>');
					//});
					
			  } 
		 }
		  
		
	});

	/*$("#idOrganization").change(function(){
		orgName = $(this).val();
        alert("nn");
        populateRoleCombo(id);
		getClientData("GET", "" , "getUserAndRoleByOrgName/"+orgName, onGetDataSuccess);
		function onGetDataSuccess(data){
			alert("mmm");
			console.log(data);
			var moduleDrop = $('#idRole');
			moduleDrop.find('option').remove();
			moduleDrop.append('<option value="">Select Roles</option>');
			$.each(data.advisorRoles, function (index, item) {
				moduleDrop.append('<option value="' + item.id + '">' + item.roleDescription + '</option>');
			});
           alert("mmmm");
			var moduleDrop1 = $('#idAdvisor');
			moduleDrop1.find('option').remove();
			moduleDrop1.append('<option value="">Select Users</option>');
			$.each(data.advisorUsers, function (index, item) {
				moduleDrop1.append('<option value="' + item + '">' + item + '</option>');
			});
		}

	});*/
	var a = [];
	$("#idRole").change(function(){
		  roleId = $(this).val();
		 // alert(roleId);
		  if (roleId > 0) {
			  getClientData("GET", "" , 'getAllUserForSelectedRole?&masterID='+masterID+'&roleId='+$(this).val(), onGetDataSuccess);
			  function onGetDataSuccess(data){
				  console.log(data);
				  	var moduleDrop = $('#idAdvisor');
				  	//alert(moduleDrop);
		    		moduleDrop.find('option').remove();
		    		moduleDrop.append('<option value="">Select Users</option>');
					$.each(data, function (index, item) {
						moduleDrop.append('<option value="' + item.userID + '">' + item.loginUsername + '</option>');
						a[item.userID] = item.userName;
					});
					
			  }
		  }
		  
		 
	});
	
	
	$("#idAdvisor").change(function(){
		 $("#idSubmoduleTable").empty();
		 advisorId = $('#idAdvisor').val();
		 userName = a[advisorId];
		// document.getElementById('idName').value = userName;
		 $('#idName').val(userName);
		if(advisorId > 0) {
			$("#idViewAccessRights").attr("disabled", false);
		} else {
			$("#idViewAccessRights").attr("disabled", true);
		}
	});
	

	/*$('#idModule').change(function(){
		if($('#idModule').val() == ''){
			modelId = -1
		} else {
			modelId = $('#idModule').val();
//			alert("modelId set" + modelId);
			loadSubmoduleTable();
		}
	});
	$('#idRole').change(function(){
		if($('#idRole').val() == ''){
			roleId = -1
		} else {
			roleId = $('#idRole').val();
//			alert("roleId set" + roleId);
			//loadSubmoduleTable();
		}
	});*/

/*	function loadSubmoduleTable() {
		if (roleId > 0) {
//			alert("ClientServiceUrl" + ClientServiceUrl);
//			alert("Need to fetch subModuleData");

			getClientData("GET", "", "getAllModules", onGetSuccess);
			function onGetSuccess(data) {
				console.log("data" +data)

				var finexaModule = data[0].finexaBusinessModule;
//				alert(finexaModule);
				$('#idModuleTH').text(finexaModule.description);
				$.each(data, function (index, subModuleList) {
					$("#idSubmoduleTable").append('<tr>' +
							'<td>'+subModuleList.description+'</td>' +
							'<input type="hidden" value="' + subModuleList.id + '">'+
							'<td><input type="checkbox" id=view'+index+' onclick="viewCheckBoxChange(this,'+subModuleList.id+','+roleId+');"></td>' +
							'<td><input type="checkbox" id=add'+index+' onclick="addCheckBoxChange(this,'+subModuleList.id+','+roleId+');"></td>' +
							'<td><input type="checkbox" id=edit_delete'+index+' onclick="editCheckBoxChange(this,'+subModuleList.id+','+roleId+');"></td>'+
					'</tr>');
					$.each(subModuleList.advisorRoleSubmoduleMappings, function (index1,mapping) {
//						alert("mapping " + mapping)
						if (mapping.subModuleID == subModuleList.id && mapping.roleID == roleId) {
//							alert("Matched");
							if(mapping.viewAllowedFlag == "Y") {
								$('#view'+index).prop('checked', true);
//								alert("View Checked");
							}
							if(mapping.addAllowedFlag == "Y") {
								$('#add'+index).prop('checked', true);
//								alert("Add Checked");
							}
							if(mapping.editAllowedFlag == "Y") {
								$('#edit_delete'+index).prop('checked', true);
//								alert("edit checked");
							}
						}

					});
				}); 

			}

		}
	}*/

	var rowCount = 0;
	var columnCount = 0;
	var access;
	var idCount;
	$('#idViewAccessRights').click(function(){
		var radio_value;
		if (document.getElementById('idBackOffice').checked) {
			radio_value = document.getElementById("idBackOffice").value;
		} else {
			radio_value = document.getElementById("idClientMaster").value;
		}
		
		var advisorId = document.getElementById("idAdvisor").value;
		
		
		//alert("Before calling controller" + radio_value + "" + advisorId+".");
		getClientData("GET", "", "deleteClientRecord/"+advisorId+"/"+radio_value, onSuccess);
		//alert("After calling controller" + radio_value + "" + advisorId+".");
		//alert("DATA:"+data.value+".");
		function onSuccess(data) {
			//alert("successfully changed");
		}
		//getClientDataAsyncFalse("GET", "", "deleteClientRecord/"+advisorId+"/"+radio_value, onSuccess);
		
		//getClientData("POST", data,"deleteClientRecord/"+advisorId+"/"+radio_value,onSuccess);
//		function onSuccess(data) {
//			alert("successfully changed");
//		}
		//alert("Hello " + radio_value + " " + advisorId);
	
	});

});


	function populateModuleTable() {}

	function populateRoleCombo(id) {
		var roleDrop = $('#idRole');
		getClientData("GET", "", "getAllExistingRoles/" + id, onGetExistingRolesSuccess);
		function onGetExistingRolesSuccess(data) {
			roleDrop.find('option').remove();
			roleDrop.append('<option value="">Select Roles</option>');
			$.each(data, function (index, item) {
				console.log(item.id);
				roleDrop.append('<option value="' + item.id + '">' + item.roleDescription + '</option>');
			});
		}

	}
	function viewCheckBoxChange(cb,subModuleId, roleId) {
		var formData = $('#idFormAccessRight').serializeToJSON();
		formData["subModuleID"] = subModuleId;
		formData["roleID"] = roleId;
		if (cb.checked) {
			formData["viewAllowedFlag"] = 'Y';
		} else {
			formData["viewAllowedFlag"] = 'N';
		}
//		alert(formData);
		var data = JSON.stringify(formData);
//		alert("Data" + data);
		getClientData("POST", data,"saveRoleSubmoduleMapping/",onSuccess);
		function onSuccess(data) {
//			alert("successfully changed");
		}


	}
	function addCheckBoxChange(cb,subModuleId, roleId) {
//		alert("Add " + cb.checked);
		var formData = $('#idFormAccessRight').serializeToJSON();
		formData["subModuleID"] = subModuleId;
		formData["roleID"] = roleId;
		if (cb.checked) {
			formData["addAllowedFlag"] = 'Y';
		} else {
			formData["addAllowedFlag"] = 'N';
		}
//		alert(formData);
		var data = JSON.stringify(formData);
//		alert("Data" + data);
		getClientData("POST", data,"saveRoleSubmoduleMapping/",onSuccess);
		function onSuccess(data) {
//			alert("successfully changed");
		}

	}
	function editCheckBoxChange(cb,subModuleId, roleId) {
//		alert("Edit/Delete " + cb.checked);
		var formData = $('#idFormAccessRight').serializeToJSON();
		formData["subModuleID"] = subModuleId;
		formData["roleID"] = roleId;
		if (cb.checked) {
			formData["editAllowedFlag"] = 'Y';
			formData["deleteAllowedFlag"] = 'Y';
		} else {
			formData["editAllowedFlag"] = 'N';
			formData["deleteAllowedFlag"] = 'N';
		}
//		alert(formData);
		var data = JSON.stringify(formData);
//		alert("Data" + data);
		getClientData("POST", data,"saveRoleSubmoduleMapping/",onSuccess);
		function onSuccess(data) {
//			alert("successfully changed");
		}
	}

	function populateBusinessModuleCombo(id) {
		var moduleDrop = $('#idModule');
		getClientData("GET", "", "getAllBusinessModules",onGetExistingModulesSuccess);
		function onGetExistingModulesSuccess(data) {
			moduleDrop.find('option').remove();
			moduleDrop.append('<option value="">Select Modules</option>');
			$.each(data, function (index, item) {
				moduleDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			});
		}
	}

	function populateBusinessModuleCombo(id) {
		var moduleDrop = $('#idOrganization');
		getClientData("GET", "", "getAllBusinessModules",onGetExistingModulesSuccess);
		function onGetExistingModulesSuccess(data) {
			moduleDrop.find('option').remove();
			moduleDrop.append('<option value="">Select Modules</option>');
			$.each(data, function (index, item) {
				moduleDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			});
		}

	}
	
//	$('#idBackOffice').click(function(){
//		var backOffice = $("#idBackOffice").val();
//		var clientMaster = $("#idClientMaster").val();
//		alert(backOffice + " clientMaster " + clientMaster);
//		if(backOffice == 'Y') {
//			document.getElementById('idBackOffice').checked = true;
//			document.getElementById('idClientMaster').checked = false;
//		} else {
//			document.getElementById('idBackOffice').checked = false;
//			document.getElementById('idClientMaster').checked = true;
//		}
//	});
//	
//	$('#idClientMaster').click(function(){
//		var backOffice = $("#idBackOffice").val();
//		var clientMaster = $("#idClientMaster").val();
//		alert(backOffice + " clientMaster " + clientMaster);
//		if(clientMaster == 'Y') {
//			document.getElementById('idBackOffice').checked = false;
//			document.getElementById('idClientMaster').checked = true;
//		} else {
//			document.getElementById('idBackOffice').checked = true;
//			document.getElementById('idClientMaster').checked = false;
//		}
//	});
	
/*	$("input[@name='checkRadio']").change(function(){
		alert(backOffice + " clientMaster " + clientMaster);
	});	*/
	
	
	/*function populateBusinessModuleCombo() {
		var moduleDrop = $('#idOrganization');
		getClientData("GET", "", "showUserSelf",onGetExistingModulesSuccess);
		function onGetExistingModulesSuccess(data) {
			moduleDrop.find('option').remove();
			moduleDrop.append('<option value="">Select User</option>');
			$.each(data, function (index, item) {
				moduleDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			});
		}

}*/
	

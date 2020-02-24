var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
//emp code checking flag
var chkEmp = true;
//alert(loggedUser.admin);
var chkAdmin = "Y";  // For checking condition in Organisation Name and Distributor Code
					 // Setting 'Y' as it is Admin
$(document).ready(function() {

	//new code for access rights
		if(loggedUser.userManagementAddEdit === "Y"){
			$("#idAddUser").show();
		}else if(loggedUser.userManagementView === "Y"){
			$("#idAddUser").hide();
		}
	
	var admin = "N";
	getClientDataAsyncFalse("GET", "", "user/"+loggedUser.id, onUserRoleSuccess);
	function onUserRoleSuccess(data) {
		//populateStaticRoleDrop($("#idRole"));
		if(data.admin != "Y"){
			chkAdmin = "N";
			$('label[for="idlblRiskProfile"]').hide();
			$('label[for="idlblProductReco"]').hide();
			$('label[for="idlblClientCreation"]').hide();
			$("#idChkRiskProfile").hide();
			$("#idChkProductReco").hide();
			$("#idChkClientCreation").hide();
			//if(data.advisorAdmin == "Y"){
				$("#idType").hide();
				$("#idOrg").val("Y");
				populateStaticRoleDrop(loggedUser.id);
				
				//document.getElementById('idType').value = "Y";
				var organizationName=loggedUser.orgName;
				document.getElementById('idOrganisationName').value = organizationName;
				//$("#idOrganization").prop("disabled", true);
				$("#idOrganisationName").prop("readonly", true);
				var code = loggedUser.distributorCode;
				document.getElementById('idDisributorCode').value = code;
				$("#idDisributorCode").prop("readonly", true);
				
				
			//}
		}else{
			if(data.admin == "Y"){
				admin = "Y";
				populateStaticRoleDropNew($('#idRole'));
				//$("#idRole").prop( "disabled", true );
				$('#idRole').val($("#idRole option:contains('Admin')").val()); 
				 
			}
		}
		
	}
	
	var id=loggedUser.id;
	/*var flag=loggedUser.orgFlag;
	var organizationName=loggedUser.orgName;
	document.getElementById('idOrganisationName').value = organizationName;
	var code = loggedUser.distributorCode;
	document.getElementById('idDisributorCode').value = code;*/
	//alert("name" +organizationName );
	
	//alert("user details" +sessionStorage.getItem("LOGGED_IN_USER"));
	/*
	 * "use strict";
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
	});
	*
	*
	*/
	
	//dynamic role implementation
	//populateRoleCombo(id);	
	
	//static role implementation
	
	
	populateCountryDrop($("#idCountry"));

	
	$("#idAddUser").on("click", function(event) {
		var status;
		var status = validateUserCreation($('#userCreation'));
		if(status == true) {
		var chkEmp;
		
		if ($("#idOrg").val() == "Y") {
			var empCode = $("#idEmployeeCode").val();
			var orgName = $("#idOrganisationName").val();
			var distCode = $("#idDisributorCode").val();
			var reqUrl= "checkUniqueEmpCodeForFixedmaster/"+orgName+"/"+distCode+"/"+empCode;
			getClientData("GET", "", reqUrl, onCheckEmpCodeSuccess);
			function onCheckEmpCodeSuccess(data) {
				if(data.length == 0) {
					chkEmp = true;
				} else {
					chkEmp = false;
					bootbox.alert("This Employee Code already exists within this Oragnization")
				}
			}
		} else if ($("#idOrg").val() == "N") {
			chkEmp = true;
		} else {
			chkEmp = false;
		}
			
				//showLoaderOnSave("#idAddUser");
				window.setTimeout(function(){
				if(status == true && chkEmp == true) {
					showLoaderOnSave("#idAddUser");
					var formData = $('#userCreation').serializeToJSON();
					if ($("#idChkRiskProfile").prop("checked") == true){
						formData["riskProfileCreation"] = 1;
					}
		            if ($("#idChkProductReco").prop("checked") == true){
		            	formData["productRecoCreation"] = 1;
					}
		            if ($("#idChkClientCreation").prop("checked") == true){
		            	formData["clientCreation"] = 1;
					}
		            formData["finlabsAdminRole"] = admin;
					//formData["advisorID"] = id;
					/*formData["organisationName"] = organizationName;
					formData["organizationFlag"] = flag;
					formData["disributorCode"] = code;*/
					//formData["masterID"] = id;
					var data = JSON.stringify(formData);
					console.log(data);
					getClientData("POST", data, "createUser?serviceIP="+serviceIP+"&loggedUser="+loggedUser.id, onAddUserSuccess);
				    }
				  }, 3000);
				
				
			
		//==============
		
		
			function onAddUserSuccess(data) {
				hideLoaderOnSave("#idAddUser");
				if(data.clientID != 0){
				var url= "saveScore/"+data.masterID+"/"+data.clientID;
				getClientData("GET", data, url, onAddScoreuccess);
				function onAddScoreuccess(data){
					getUserPage();
				  }					
				}else{
					getUserPage();
				}	
		     }
	  
		function getUserPage(){
			getClientDataAsyncFalse("GET", "", "user/"+loggedUser.id, onUserRoleSuccess);
			function onUserRoleSuccess(data) {
				if(data.admin === "N") {
					bootbox.alert({
					    message: "please give Access Rights and add Supervisor for this User using Hierarchy Mapping"
					});
					//viewPage();
				} else {
					if(data.admin === "Y") {
					bootbox.alert({
					    message: "please give Access Rights for this User"
					});
					//viewPage();
					}
				}
				viewPage();
			}
		}
		    function viewPage(){
			    sessionStorage.setItem("USER_PAGE_MODE", "ADD");
			    var pageUrl ="userManagement/viewUserCreation.html";
		        addPageBusiness(pageUrl,"View User List");
		    }

		}
		
	});
	
	$("#idOrg").change(function(){
		var orgFlag = $("#idOrg").val();
		
		document.getElementById("idOrg").style.border = "1px solid #ccc";
		document.getElementById('alertOrg').innerHTML="";
		
		document.getElementById("idOrganisationName").style.border = "1px solid #ccc";
		document.getElementById('alertOrgName').innerHTML="";
		
		var orgName = document.getElementById("idOrganisationName").value;
		$("#idAddUser").prop( "disabled", false );
		
		if(orgFlag == "N") {  // For OrgFlag as Individual
			$("#idAddUser").prop( "disabled", false );
			$("#idEmployeeCode").prop( "disabled", true );
			
			if(orgName.length > 0) {
				//alert("orgName "+orgName.length);
				checkOrganisationName();
			}
			
		} else {		// For OrgFlag as Organisation
			//$("#idOrganisationName").val("");
			$("#idEmployeeCode").prop( "disabled", false );
			if(orgName.length > 0) {
				//alert("orgName "+orgName.length);
				$("#idAddUser").prop( "disabled", false );
				checkOrganisationName();
			}
		}
		
	});
	
	
});//==========================

//static role implementation
function populateStaticRoleDrop(id) {
	var roleDrop = $('#idRole');
	getClientData("GET", "", "getAllExistingRolesForUserCreation/" + id, onGetExistingRolesSuccess);
	function onGetExistingRolesSuccess(data) {
		roleDrop.find('option').remove();
		roleDrop.append('<option value="">Select Roles</option>');
		$.each(data, function (index, item) {
			roleDrop.append('<option value="' + item.id + '">' + item.roleDescription + '</option>');
		});
	}
	
}


function populateStaticRoleDropNew(dropId) {
	getClientDataAsyncFalse("GET", "", "getAllRoles", onCountrySuccess);
	//getBusinessData("GET", "", "AllCountries", onCountrySuccess);
	function onCountrySuccess(data) {
		console.log(data);
		dropId.find('option').remove();
		dropId.append('<option value="">Select Role</option>');
		$.each(data, function (index, item) {
			dropId.append('<option value="' + item.id + '">'
				+ item.description + '</option>');

		});
		
		if(loggedUser.admin === "Y" ){
			$("#idRole option[value= 2]").remove();
			$("#idRole option[value= 3]").remove();
			$("#idRole option[value= 4]").remove();
			$("#idRole option[value= 5]").remove();
		}
	}
}

function checkEmpCode() {
	//alert($("#idOrg").val())
	if($("#idOrg").val() === "Y") {
		var empCode = $("#idEmployeeCode").val();
		if(empCode.length > 0) {
			/*$("#idAddUser").attr("disabled", true);
			chkEmp = false;
			bootbox.alert("Employee Code can not be empty")
			break;
		} else {*/
		var orgName = $("#idOrganisationName").val();
		//alert(orgName)
		var distCode = $("#idDisributorCode").val();
		//alert(distCode)
		var reqUrl= "checkUniqueEmpCodeForFixedmaster/"+orgName+"/"+distCode+"/"+empCode;
		getClientData("GET", "", reqUrl, onCheckEmpCodeSuccess);
		function onCheckEmpCodeSuccess(data) {
			if(data.length != 0) {
				//alert("employee not here")
				$("#idAddUser").attr("disabled", true);
				chkEmp = false;
				bootbox.alert("This Employee Code already exists within this Organization")
			} else {

				$("#idAddUser").attr("disabled", false);
				chkEmp = true;
			}
		}
		}
	}
}


//dynamic role implementation
/*function populateRoleCombo(id) {
	var roleDrop = $('#idRole');
	getClientData("GET", "", "getAllExistingRoles/" + id, onGetExistingRolesSuccess);
	function onGetExistingRolesSuccess(data) {
		roleDrop.find('option').remove();
		roleDrop.append('<option value="">Select Roles</option>');
		$.each(data, function (index, item) {
			roleDrop.append('<option value="' + item.id + '">' + item.roleDescription + '</option>');
		});
	}

}*/

function checkOrganisationName() {
	var orgFlag = $("#idOrg").val();
	$("#idAddUser").prop( "disabled", false );
//	if(orgFlag == "Y") {}
	if(chkAdmin == "Y"){
			var orgName = $("#idOrganisationName").val();
			//alert("Blur Working " + orgName);
			document.getElementById("idOrganisationName").style.border = "1px solid #ccc";
			document.getElementById('alertOrgName').innerHTML="";
			//alert("orgName.length "+orgName.length);
			if(orgName.length > 0) {
				
				getClientDataAsyncFalse("GET", "", "userCreation/uniqueOrganisationName?orgName="+orgName, onDistributorCodeSuccess);
				function onDistributorCodeSuccess(uniqueOrganisationName){
					if (!(uniqueOrganisationName)){
						//alert("organisation Name is not unique in validateClientAddress");
						document.getElementById('alertOrgName').innerHTML="Organisation Name is not unique";
						document.getElementById("idOrganisationName").style.border = "2px solid red";
						//bootbox.alert("Organisation Name is Not Unique");
						$("#idAddUser").prop( "disabled", true );
					} else {
						$("#idAddUser").prop( "disabled", false );
					}
				}
				
			} else {
				$("#idAddUser").prop( "disabled", true );
			}
			
		} 
	
	
}

function checkDistributorCode() {
	var distributorCode = $("#idDisributorCode").val();
	//alert("distributorCode "+distributorCode);
	document.getElementById('alertDistCode').innerHTML="";
	document.getElementById("idDisributorCode").style.border = "1px solid #ccc";
	
	if((distributorCode.length > 0) && (chkAdmin == "Y")){
		
		var chkDistCode = (distributorCode.search("ARN-") == 0) ? true : (distributorCode.search("ARN–") == 0) ? true : ((distributorCode.search("INA") == 0) ? true : false);
		//alert("chkDistCode ARN " + chkDistCode);
		var chkDistCodeLength = true;
		
		if(chkDistCode){
			if (distributorCode.search("ARN-") == 0 || distributorCode.search("ARN–") == 0){   //_______Checking of ARN part
				var numValue = distributorCode.substring(4);
				var numLength = numValue.length;
				
				if(numLength < 2 || numLength > 6){ 	//_____________ For Checking Length
					document.getElementById('alertDistCode').innerHTML="Number of Digits in ARN Code is not valid.<br>The range of digits for ARN should be 2 to 6 digits";
					document.getElementById("idDisributorCode").style.border = "2px solid red";	
					chkDistCodeLength = false;
				} else {   							//_________________ For checking the numbers in ARN Code
					var letters = /^[0-9]+$/;
					
					if(!letters.test(numValue)){
						document.getElementById('alertDistCode').innerHTML="Digits in ARN Code is not valid.";
						document.getElementById("idDisributorCode").style.border = "2px solid red";
						chkDistCodeLength = false;
					} 
					
				}
			} else {			//_______Checking of INA part
				var numValue = distributorCode.substring(3);
				var numLength = numValue.length;
				
				if(numLength < 9 || numLength > 9){ 	//_____________ For Checking Length
					document.getElementById('alertDistCode').innerHTML="Number of Digits in INA Code is not valid.<br>The INA Code should contain 9 digits";
					document.getElementById("idDisributorCode").style.border = "2px solid red";	
					chkDistCodeLength = false;
				} else {   							//_________________ For checking the numbers in INA Code
					var letters = /^[0-9]+$/;
					
					if(!letters.test(numValue)){
						document.getElementById('alertDistCode').innerHTML="Digits in INA Code is not valid.";
						document.getElementById("idDisributorCode").style.border = "2px solid red";
						chkDistCodeLength = false;
					} 
					
				}
			}
		} else {
			document.getElementById('alertDistCode').innerHTML="Disributor Code is not valid.<br>For example, Distributor Code should be in one of these formats :<br>INA000001142,<br>ARN-121074";
			document.getElementById("idDisributorCode").style.border = "2px solid red";
		}
		
		if(chkDistCodeLength && chkDistCode) {
			getClientDataAsyncFalse("GET", "", "userCreation/uniqueDisributorCode?distributorCode="+distributorCode, onDisributorCodeSuccess);
			function onDisributorCodeSuccess(uniqueDisributorCode){
				if (!(uniqueDisributorCode)){
					//alert("organisation Name is not unique in validateClientAddress");
					document.getElementById('alertDistCode').innerHTML="Disributor Code is not unique";
					document.getElementById("idDisributorCode").style.border = "2px solid red";
					//bootbox.alert("Organisation Name is Not Unique");
					$("#idAddUser").prop( "disabled", true );
				} else {
					$("#idAddUser").prop( "disabled", false );
				}
			}
		} /*else {
			document.getElementById('alertDistCode').innerHTML="Disributor Code is not valid.<br>For example, Distributor Code should be in one of these formats :<br>INA000001142,<br>ARN-121074";
			document.getElementById("idDisributorCode").style.border = "2px solid red";
		}*/
		
		
	}
	
}
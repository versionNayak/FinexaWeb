var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;
$(document).ready(function(event){
	
	loadLoader();
	serviceurl = "getAllExistingRoleSupervisorMapping/"+id;
	getClientData("GET", "", serviceurl, onSuccess);

	function onSuccess(data){
		//console.log(data);
		//alert("Success");
		
		//dataTbale creation
		//==================
		$('#idTable').dataTable();
		$('#idTable').dataTable().fnDestroy();
		$("#idUserRoleListTable").empty();
		
		if(data.length==0)
		{
			var addURL = "userManagement/addUserRoleCreation.html";
			addPageBusiness(addURL,"Add User Role");
		}
		//alert("success");
		$.each(data, function (index, userList) {
			var supervisorRole;
			if (userList.userRoleId != userList.supervisorRoleID) {
				supervisorRole = userList.supervisorRole;
			}
			
			if (supervisorRole == null) {
				supervisorRole = "Not Applicable";
			}
			
			$("#idUserRoleListTable").append('<tr>' +
					'<td id="idTDUserRole">' + userList.userRole + '</td>' +
					'<td id="idTDSuperRole">' + supervisorRole+ '</td>' +
					'<td class="hidden"><input type="text" id="idUserRole" name="id"  value=' + userList.userRoleId + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idSupervisorRole" name="nameSupervisorRole"  value=' + userList.supervisorRoleID + ' readonly="readonly"></td>' +
			'</tr>');
		}); 
		//=====dataTable styling=====
		$('#idTable').dataTable(
				{
					
					"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
					//"pageLength": 10,
					"pagingType": "full_numbers"
					
				}
		);
		$('#idTable_paginate').css('margin-left',-100);
		//=========================================
		hideLoader();
	} 
	
	$("#idUserRoleListTable").on("click","tr",function(e){	
		addRowHandlers();
		findid=$(this).find("#idUserRole").val();
		console.log("id of User "+ findid);
		sessionStorage.removeItem("SELECTED_USER_ROLE_ID");
		sessionStorage.setItem("SELECTED_USER_ROLE_ID",findid);
		
		findName=$(this).find("#idTDUserRole").text();
		console.log("name of User "+ findName);
		sessionStorage.removeItem("SELECTED_USER_ROLE_NAME");
		sessionStorage.setItem("SELECTED_USER_ROLE_NAME",findName);
		
		findSuper=$(this).find("#idSupervisorRole").val();
		console.log("id of Supervisor "+ findSuper);
		sessionStorage.removeItem("SELECTED_SUPERVISER_ROLE_ID");
		sessionStorage.setItem("SELECTED_SUPERVISER_ROLE_ID",findSuper);
		
		findSuperRole=$(this).find("#idTDSuperRole").text();
		console.log("Role of Supervisor "+ findSuperRole);
		sessionStorage.removeItem("SELECTED_SUPERVISER_ROLE_DESC");
		sessionStorage.setItem("SELECTED_SUPERVISER_ROLE_DESC",findSuperRole);
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
	});
});

function confirmationClickBusiness(){
	loadLoader();
	$('#myModal').modal('hide');
	var idRole = sessionStorage.getItem("SELECTED_USER_ROLE_ID");
	
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"deleteRole/" + idRole,
		dataType : 'json',
		contentType : 'application/json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success : function(afterDeleteddata) {
			if (afterDeleteddata.returnStatus == RETURN_VAL_ERROR_ROLE_MAPPING) {
				alert("Some users are already assigned to this Role");
			} else if (afterDeleteddata.returnStatus == RETURN_VAL_ERROR_SUPERVISOR_MAPPING) {
				alert("others users mapped to this role");
			} else if (afterDeleteddata.returnStatus == RETURN_VAL_SUCCESS) {
				
				serviceurl = "getAllExistingRoleSupervisorMapping/"+id;
				getClientData("GET", "", serviceurl, onSuccess);
				function onSuccess(data) {

					//alert("Success");
					$("#idUserRoleListTable").empty();
					if(data.length==0)
					{
						if((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "Y" )){			
							var addURL = "userManagement/addUserRoleCreation.html";
							addPageBusiness(addURL,"Add User Role");
						} else {
							addPageBusiness("../authorisationErrorPage.html","Access Denied");
							
						       }
					}
					//alert("success");
					$.each(data, function (index, userList) {
						var supervisorRole = "Not Applicable";
						if (userList.userRoleId != userList.supervisorRoleID) {
							supervisorRole = userList.supervisorRole;
						}
						$("#idUserRoleListTable").append('<tr>' +
								'<td id="idTDUserRole">' + userList.userRole + '</td>' +
								'<td>' + supervisorRole+ '</td>' +
								'<td class="hidden"><input type="text" id="idUserRole" name="id"  value=' + userList.userRoleId + ' readonly="readonly"></td>' +
								'<td class="hidden"><input type="text" id="idSupervisorRole" name="nameSupervisorRole"  value=' + userList.supervisorRoleID + ' readonly="readonly"></td>' +
						'</tr>');
					}); 
				}
			}
			hideLoader();
		},
		error : function(jqXHR, exception) {
			deleteStatus = "error";
			var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Could not connect to the server, please contact System Administrator.';
	        }else if(jqXHR.status == 400){
	        	msg = 'There is some problem in the server, please contact System Administrator.\n';
	        }else if(jqXHR.status == 401){
	        	var error,error_description;
				error = jqXHR.responseJSON.error_description;
	        	error_description = "Access token expired: "+sessionStorage.getItem("sessionID");
	        	if(error === error_description){
	        		msg = "Your session has expired.Please log in again"
	        		bootbox.alert({
			        	 message: msg,
			        	 callback: function () {
				         window.location = "../index.html";
			         }
			      })
	        	}
	        	if(error === "unauthorized"){
	        		msg = "Full authentication is required to access this resource",
	        		bootbox.alert({
			        	 message: msg
			        })
	        	}	
	        } else if (jqXHR.status == 404) {
	            msg = 'Requested service url not found.]';
	        } else if (jqXHR.status == 500) {
	        	msg = 'There is some problem in the server, please contact System Administrator.\n';
	        } else if (exception === 'parsererror') {
	            msg = 'Failed to get result.';
	        } else if (exception === 'timeout') {
	            msg = 'Timed Out!';
	        } else if (exception === 'abort') {
	            msg = 'Request aborted.';
	        } else {
	            msg = 'Something went wrong, could not connect to the server, please contact System Administrator.\n';
	        }
	        //$('#post').html(msg);
	        if (JSON.parse(jqXHR.responseText).errorMessage != null || JSON.parse(jqXHR.responseText).errorMessage != "undefined" || JSON.parse(jqXHR.responseText).errorMessage != "") {
	        	sessionStorage.removeItem("MSG");
	        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage);
	        }
	        if (msg != "") {
	        	sessionStorage.removeItem("MSG");
	        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
	        }
	        $("#idBusiness").load("resources/errorPage.html");
		}  
	});

}

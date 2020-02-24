
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;
$(document).ready(function(event){
	loadLoader();
	serviceurl = "findAllHierarchyList/"+id;
	getClientData("GET", "", serviceurl, onSuccess);

	function onSuccess(data){
		
		//dataTbale creation
		//==================
		$('#idTable').dataTable();
		$('#idTable').dataTable().fnDestroy();
		$("#idUserRoleRemappingListTable").empty();
		/******************* Not Making any sense in this case **********************/
		if(data.length == 0)
		{
			if(((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "Y" ))){			
				var addURL = "userManagement/addUserRoleRemapping.html";
				addPageBusiness(addURL,"Add User Role");
			} else {
				addPageBusiness("../authorisationErrorPage.html","Access Denied");
				
			       }
		}
		//alert("success");
		$.each(data, function (index, userList) {
			$("#idUserRoleRemappingListTable").append('<tr>' +
					'<td>' + userList.userName + '</td>' +
					'<td id="idTdUserRole">' + userList.userRole+ '</td>' +
					'<td class="hidden"><input type="text" id="idRole" name="nameRole"  value=' + userList.roleId + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idUser" name="nameUser"  value=' + userList.id + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idDATE" name="nameDATE"  value=' + userList.effectiveFromDate + ' readonly="readonly"></td>' +
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
	
	$("#idUserRoleRemappingListTable").on("click","tr",function(e){	
		addRowHandlers();
		findid=$(this).find("#idRole").val();
		console.log("id of Role "+ findid);
		sessionStorage.removeItem("SELECTED_ROLE_ID");
		sessionStorage.setItem("SELECTED_ROLE_ID",findid);
		
		findUserId=$(this).find("#idUser").val();
		console.log("id of User "+ findUserId);
		sessionStorage.removeItem("SELECTED_USER_ID");
		sessionStorage.setItem("SELECTED_USER_ID",findUserId);
		
		findUserRole=$(this).find("#idTdUserRole").text();
		console.log("Role Name "+ findUserRole);
		sessionStorage.removeItem("SELECTED_ROLE_NAME");
		sessionStorage.setItem("SELECTED_ROLE_NAME",findUserRole);
		
		findDate = $(this).find("#idDATE").val();

		findDate = dateToYMD(new Date(findDate)); // Nov 5
		
		console.log("idDATE"+ findDate);
		sessionStorage.removeItem("SELECTED_DATE");
		sessionStorage.setItem("SELECTED_DATE",findDate);
		
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
	});
});

/*function confirmationClick(){
	$('#myModal').modal('hide');
	var idUser = sessionStorage.getItem("SELECTED_USER_ID");
	deleteSelectedRecord(ClientServiceUrl+"deleteUser"+sessionStorage.getItem("SELECTED_USER_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"getUserList/" + idUser,
		dataType : 'json',
		contentType : 'application/json',
		success : function(afterDeleteddata) {
			if(data.length==0)
			{
				var addURL = "userManagement/addUserCreation.html";
				addPage(addURL,"Register User");
			}
			$.each(data, function (index, userList) {
				$("#idUserListTable").append('<tr>' +
						'<td>' + userList.userName + '</td>' +
						'<td>' + userList.userRole + '</td>' +
						'<td>' + userList.Location + '</td>' +
						'<td class="hidden"><input type="text" id="idUser" name="id"  value=' + userList.id + ' readonly="readonly"></td>' +
				'</tr>');
			}); 
		},
		error : function(data) {
			alert("error deleting client ROS" + data.responseText);
		}     
	});
	
}
*/



function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + (m<=9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + '/' + y;
}



/*$('.deleteicon').hide();*/
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;

$(document).ready(function(event){
	loadLoader();
	serviceurl = "findAllHierarchyList/"+id;
	getClientData("GET", "", serviceurl, onSuccess);

	function onSuccess(data){
		//console.log(data);
		
		//dataTbale creation
		//==================
		$('#idTable').dataTable();
		$('#idTable').dataTable().fnDestroy();
		$("#idHierarchyViewList").empty();
		if(data.length==0)
		{
			var addURL = "userManagement/addHierarchyMapping.html";
			addPageBusiness(addURL,"Add Hierarchy Mapping");
		}
	
		$.each(data, function (index, hierarchyList) {
			var supervisorRole = "Not Applicable";
			if (hierarchyList.userId != hierarchyList.supervisorRoleID) {
				supervisorRole = hierarchyList.supervisorRole;
			}
			$("#idHierarchyViewList").append('<tr>' +
					'<td>' + hierarchyList.userName + '</td>' +
					'<td>' + hierarchyList.userRole + '</td>' +
					'<td>' + hierarchyList.supervisorName + '</td>' +
					'<td id="idSupRole">' + hierarchyList.supervisorRole + '</td>' +
					'<td class="hidden"><input type="text" id="idHierarchyUser" name="HierarchyUser"  value=' + hierarchyList.id + ' readonly="readonly"></td>' +
			'</tr>');
			//$("#idSupRole").attr("align","left");
			//$("#idSupRole").css('margin-left',-100);
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
	
	$("#idHierarchyViewList").on("click","tr",function(e){	
		addRowHandlers();
		findid=$(this).find("#idHierarchyUser").val();
		sessionStorage.removeItem("SELECTED_USER_ID");
		//alert("cccc "+findid);
		sessionStorage.setItem("SELECTED_USER_ID",findid);
		//alert("cccc "+sessionStorage.getItem("SELECTED_USER_ID"));
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
	});
});

/*function confirmationClick(){
	$('#myModal').modal('hide');
	var idUser = sessionStorage.getItem("SELECTED_USER_ID");
	deleteSelectedRecord(ClientServiceUrl+"supervisorMappingDelete"+sessionStorage.getItem("SELECTED_USER_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"findAllHierarchyList/" + idUser,
		dataType : 'json',
		contentType : 'application/json',
		success : function(afterDeleteddata) {
			if(data.length==0)
			{
				var addURL = "userManagement/addHierarchyMapping.html";
				addPageBusiness(addURL,"Add Hierarchy Mapping");
			}
			$.each(data, function (index, userList) {
				$("#idUserListTable").append('<tr>' +
						'<td>' + userList.userName + '</td>' +
						'<td>' + userList.userRole + '</td>' +
						'<td>' + userList.supervisorName + '</td>' +
						'<td>' + userList.supervisorRole + '</td>' +
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



function confirmationClickBusiness(){
	loadLoader();
	$('#myModal').modal('hide');
	var idUser = sessionStorage.getItem("SELECTED_USER_ID");
	//alert(sessionStorage.getItem("SELECTED_USER_ID"));
	getClientData("GET", "", "supervisorMappingDelete/" + idUser, onDeleteSuccess);
	function onDeleteSuccess(afterDeleteddata){
		if (afterDeleteddata.length==0) {
			
			//if client or advisor has access for Add/Edit or not
			if((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "Y" )){
				
				var addURL = "userManagement/addHierarchyMapping.html";
				addPageBusiness(addURL,"Add Hierarchy Mapping");
				
			} else {
				addPageBusiness("../authorisationErrorPage.html","Access Denied");
				
			}
	    }
		serviceurl = "findAllHierarchyList/"+id;
		getClientData("GET", "", serviceurl, onSuccess);
		function onSuccess(data) {
			
			$("#idBusiness").load("userManagement/viewHierarchyMapping.html");
			//dataTbale creation
			//==================
			$('#idTable').dataTable().fnDestroy();
			$('#idTable').dataTable();
			$('#idTable').dataTable().fnDestroy();
			$("#idHierarchyViewList").empty();
				$.each(data, function (index, userList) {
					$("#idHierarchyViewList").append('<tr>' +
							'<td>' + userList.userName + '</td>' +
							'<td>' + userList.userRole + '</td>' +
							'<td>' + userList.supervisorName + '</td>' +
							'<td id="idSupRole>' + userList.supervisorRole + '</td>' +
							'<td class="hidden"><input type="text" id="idHierarchyUser" name="id"  value=' + userList.id + ' readonly="readonly"></td>' +
					'</tr>');
					//$("#idSupRole").attr("align","left");
					//$("#idSupRole").css('margin-left',-100);

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
				
			}
			hideLoader();
		}
   }
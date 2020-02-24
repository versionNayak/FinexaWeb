var userList;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;
$(document).ready(function() {
	$('#idContactListTable').hide();
	$('#idContactSearchDownload').hide();
	//$('#idContactListTable').dataTable();
	
	

	populateUser(id);
	populateMaritalStatusDrop($("#idMaritalStatus"));
	populateOrgDrop($("#idOrgName"));
	populateCity($("#idCity"));
	
	
	$("#idContactSearch").on("click", function(event) {
		$("#idContactList tr").remove();
		var formData = $('#idSeacrhClientRecordForm').serializeToJSON();
		if (!$('#idUserList').val()){
			formData["advisorId"] = id;
		}
		data = JSON.stringify(formData);
		console.log("Data : " + data);
		
		serviceurl = 'clientMasterRecords/search' ;
		getClientData("POST", data, serviceurl, onSuccess);

		function onSuccess(data){
			var jsonData = JSON.stringify(data);
			if (data.length == 0){
				bootbox.alert("No Client Records Found");
			} else {
				//dataTbale creation
				//==================
				
				//$('#idContactListTable').dataTable().fnDestroy();
				$("#idContactList").empty();
				
				$.each(data, function (index, client) {
					$("#idContactList").append('<tr>' +
							'<td><a title="'+ client.name +'" style="color:black">' + client.name +'</td>' +
							'<td>' + client.gender + '</td>' +
							'<td>' + client.age + '</td>' +
							'<td>' + client.maritalStatus + '</td>' +
							'<td>' + client.alreadyRetired + '</td>' +
							'<td>' + client.organization + '</td>' +
							'<td>' + client.mobile + '</td>' +
							'<td><a title="'+ client.emailId +'" style="color:black">' + client.emailId + '</td>' +
							'<td><a title="'+ client.address1 +'" style="color:black">' + client.address1 + '</a></td>' +
							'<td><a title="'+ client.city +'" style="color:black">' + client.city + '</td>' +
							'<td><a title="'+ client.state +'" style="color:black">' + client.state + '</td>' +
							'<td>' + client.country + '</td>' +
							'<td>' + client.user + '</td>' +
							'<td>' + client.userLocation + '</td>' +
							'<td class="hidden"><input type="text" id="idClient" name="clientID"  value=' + client.id + ' readonly="readonly"></td>' +
					'</tr>');
					
				}); 
				//=====dataTable styling=====
				/*$('#idContactListTable').dataTable(
						{
							
							"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
							//"pageLength": 10,
							"pagingType": "full_numbers"
							
						}
				);
				$('#idContactListTable').css('margin-left',-10);
				$('#idContactListTable_paginate').css('margin-left',-100);*/
				//=========================================
			}
			//$('#idContactListTable').show();
			//$('#idContactListTable').hide();
			//$('#idContactListTable_wrapper').hide();
			var tbody = $("#idContactList");
		    //alert(tbody.children().length)
			if (tbody.children().length != 0) {
				$('#idContactSearchDownload').show();
			} else {
				$('#idContactSearchDownload').hide();
				//bootbox.alert("No data retrieved. Please choose proper filters and try again")
			}	
		} 
		
	});
	
	$("#idContactSearchDownload").on("click", function(event) {
		
		/*var tbody = $("#idContactList");
	    alert(tbody.children().length)
		if (tbody.children().length != 0) {*/
			$('#idContactListTable').show();
			$('#idContactListTable').tableExport({type:'excel',escape:'false',tableName:'ClientContactRecords'});
		    event.preventDefault();
		    $('#idContactListTable').hide();
		/*} else {
			bootbox.alert("no data")
		}*/
	});
	
	
	
	/*$('#idContactListTable').DataTable( {
	    dom: 'Bfrtip',
	    buttons: [
	             
	              {
	                  extend: 'excelHtml5',
	                  exportOptions: {
	                      columns: ':visible'
	                  }
	              },
	              {
	                  extend: 'csvHtml5',
	                  exportOptions: {
	                      columns: ':visible'
	                  }
	              }
	          ]
	} );*/
	
	
	
	$('#idUserList').change(function() {
		var dropDown = $("#idLocation");
		var selectedUserId = $(this).val();
		var selectedLoc;
		$.each(userList, function (index, user) {			
			if(parseInt(user.id) === parseInt(selectedUserId)){
				console.log("selectedLoc : " + user.userLocation);
				selectedLoc = user.userLocation;
			}
		});
		console.log("selectedUserId : " + selectedUserId);
		console.log("selectedLoc : " + selectedLoc);
			dropDown.find('option').remove();
			if (selectedUserId == "") {
				dropDown.append('<option value="">Select Location</option>');
			} else {
				dropDown.append('<option value="' + selectedLoc + '" selected>' + selectedLoc + '</option>');
			}
			
	});
	
});



function populateOrgDrop(dropDown){
	getClientData("GET", "", "clients/orgs/" + id, onSuccess);
	function onSuccess(data) {
		console.log("Org Data : " + data);
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select Organisation</option>');
		$.each(data, function (index, org) {
			dropDown.append('<option value="' + org + '">' + org + '</option>');
			
		});
	}
}
function populateCity(dropDown){
	getClientData("GET", "", "clients/cities/" + id, onSuccess);
	function onSuccess(data) {
		console.log(" Cities : " + data)
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select City</option>');
		$.each(data, function (index, city) {
			dropDown.append('<option value="' + city + '">' + city + '</option>');
			
		});
	}
}

function populateUser(id) {
	var dropDown = $("#idUserList");
	getClientData("GET", "", "getAllUsersForClientContact/" +id , onGetUserSuccess);
	function onGetUserSuccess(data) {
		userList = data;
		//console.log("userList : " + userList);
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select User</option>');
		$.each(userList, function (index, user) {
			dropDown.append('<option value="' + user.id + '">' + user.userName + '</option>');
			
		});
	}
}


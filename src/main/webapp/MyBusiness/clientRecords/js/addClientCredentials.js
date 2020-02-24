var ClientServiceUrl = serviceIP + "/clientservice/";
loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
//alert(loggedUser.id)
$(document).ready(function(event) {
	 getClientData("GET", "" , "clientMasterList/"+loggedUser.id, onGetDataSuccess);
});
function onGetDataSuccess(data) {
	
	//dataTbale creation
	//==================
	$('#idTable').dataTable();
	$('#idTable').dataTable().fnDestroy();
	$("#idClientListPaginate").empty();
	
	$.each(data, function (index, client) {
		/*//alert("inside onsuccess $.each");
		
		if(users.activeFlag == "Y") {
	    		var status = "Active";
	    		var buttonName = "Deactivate";
	    } else {
	    		var status = "Deactive";
	    		var buttonName = "Activate";
	    }*/
		
		//dataTable implementation
		//==========================
		$("#idClientListPaginate").append('<tr>' +
				'<td>' + client.firstName + " " + client.lastName + '</td>' +
				'<td>' + client.emailId + '</td>' +
				'<td>' + client.mobile + '</td>' +
				'<td><input type="button" class="pull-left btn addbtn" style="width:79px" id="idGenerate" name="record" value= '+"Generate Credentials"+' onclick="generate(\''+ client.emailId +'\')"></td>' +
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
}

function generate(email) {
	//alert(email)
	var reqUrl= "generateClientCredential?email="+email+"&serviceIP="+serviceIP+"&loggedUser="+loggedUser.id;
	getClientData("GET", "" , reqUrl, onGenerateSuccess);
}

function onGenerateSuccess(data) {
	bootbox.alert("Credentials Generated")
}


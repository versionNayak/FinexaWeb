//default load Client Contact Management

//alert('clicked user creation');
$("#idBusiness").empty();
$("#idBusiness").load("clientRecords/viewClientContactManagement.html");
$(".dashboardheading    ").html("");
$(".dashboardheading    ").html("Client Contact Management");
/*
url = "userManagement/editUserCreation.html";
heading="   Edit Users";
$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='edit'/>");

url = "clientRecords/viewClientContactManagement.html";
$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRecord()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

$('#editRecord').addClass('btn_Disabled');
$('#deleteRecord').addClass('btn_Disabled');*/



$(".client_contact_management").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("clientRecords/viewClientContactManagement.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Client Contact Management");

	/*url = "userManagement/editUserCreation.html";
	heading="   Edit Users";
	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='edit'/>");

	url = "clientRecords/viewClientContactManagement.html";
	$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRecord()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	$('#editRecord').addClass('btn_Disabled');
	$('#deleteRecord').addClass('btn_Disabled');*/
});


$(".client_Credentials").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("clientRecords/addClientCredentials.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Client Credentials");

});

$(".client_Access").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("clientRecords/addClientAccessRights.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Client Access Rights");

});



$(".client_activation_status").click(function(){
	//alert('click');
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("clientRecords/viewClientactivationstatus.html");
	$(".dashboardheading").html("Client Activation Status");
	$("#wrapper").css("height","auto");
	$("#dashbord").css("height","auto");
	$(".form-section-container").css("height","auto");
	$('.deleteicon').addClass('btn_Disabled');
	$('.editicon').hide();
	$('.addicon').hide();
	$('.user_table').hide();
});



$(".import_client_records").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("clientRecords/importClientRecords.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Import Client Records");
});

$(".export_client_records").click(function(){
	
	$("#idBusiness").empty();
	$("#idBusiness").load("clientRecords/exportClientRecords.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Export Client Records");
	
});

$(".mapping_client").click(function(){
	$("#idBusiness").empty();
	$("#idBusiness").load("clientRecords/viewMappingClient.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Client Remapping");
	var url ="clientRecords/editMappingClient.html";
	var heading="   Edit Client Remapping";
	$("#headIcon").empty();
	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");


	$('#editRecord').addClass('btn_Disabled');
	$('#deleteRecord').addClass('btn_Disabled');
});

$(".mapping_bulk_upload").click(function(){
	

	$("#idBusiness").empty();
	$("#idBusiness").load("clientRecords/viewMappingbulkupload.html");
	$(".dashboardheading    ").html("");
	$(".dashboardheading    ").html("Mapping Remapping Bulk Upload");
	
	/*$("#idBusiness").empty();
	$("#idBusiness").load("clientRecords/viewMappingbulkupload.html");
	$(".dashboardheading").html("Mapping Remapping Bulk Upload");
	$("#wrapper").css("height","auto");
	$("#dashbord").css("height","auto");
	$(".form-section-container").css("height","auto");
	$('.deleteicon').addClass('btn_Disabled');
	$('.editicon').hide();
	$('.addicon').hide();
	$('.user_table').hide();*/
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


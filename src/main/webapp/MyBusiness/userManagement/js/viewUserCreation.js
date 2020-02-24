var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var mode = sessionStorage.getItem("USER_PAGE_MODE");
var id=loggedUser.id;
var advisorUserCount;
var tableRowCount;
var nextFetch;
var end = 0;
var start;
var pages;
var rem;
var s;

$("#headIcon").empty();
var url = "userManagement/addUserCreation.html";
var heading="   Add Users";

if((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "Y" )){

						$("#headIcon").empty();
						$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' " +
								"onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;" +
										"margin-right:6px'  title='Add'/>");

					//if(admin != "Y") {
						url = "userManagement/editUserCreation.html";
						heading="   Edit Users";
						$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' " +
								"onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;" +
										"margin-top:-2px;margin-right:6px'  title='Edit'/>");
						
					//}
					
} else {
	//if  view access present and add/Edit not present then edit button will be named as view details
	  if((loggedUser != null) && (loggedUser.userManagementView != null && loggedUser.userManagementView === "Y" )){
		            url = "userManagement/editUserCreation.html";
					heading="View User Details";
					$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' " +
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
						
		$('#editRecord').addClass('btn_Disabled');
		$('#deleteRecord').addClass('btn_Disabled');
}

$("#addRecord").removeClass('btn_Disabled');
$('#editRecord').addClass('btn_Disabled');
$('#deleteRecord').addClass('btn_Disabled');

$(document).ready(function(event){
	
	//if admin
	$("#idTable").hide();
	loadLoader();
	getClientDataAsyncFalse("GET", "", "user/"+loggedUser.id, onUserRoleSuccess);
	function onUserRoleSuccess(data) {
		//alert(data.admin);
		if(data.admin == "Y"){
			//$('.user_table').hide();
			//alert("inside if!!!");
			$('th:nth-child(1)').text("Advisor Name");
			$('th:nth-child(2)').text("Email");
			$('th:nth-child(3)').text("Status");
			//alert("inside");
			
			getCount();
			nextFetch = 0;
		    getClientData("GET", "" , "showUserWithPagination/" + nextFetch, onGetDataSuccess);
			//==============================
			//getClientData("GET", "" , "showUser", onGetDataSuccess);	//without pagination 
			
		} else {
			
			$('th:nth-child(1)').text("User Name");
			$('th:nth-child(2)').text("Email");
			$('th:nth-child(3)').text("Role");
			$('th:nth-child(4)').text("Location");

			
			serviceurl = "findAllHierarchyList/"+loggedUser.id;
			getClientData("GET", "", serviceurl, onSuccess);
			
			function onSuccess(data){
				//alert("data.length " + data.length)
				if (data.length==0) {
					getClientDataAsyncFalse("GET", "", "checkIfUserExistUnderLoggedInAdvisorAdmin/"+loggedUser.id, onCheckSuccess);
					function onCheckSuccess(count) {
						//alert("count " + count)
						if (count > 1) {
							addPageBusiness("../addHierarchyMapError.html","Add Hierarchy Mapping");
						} else {
							var addURL = "userManagement/addUserCreation.html";
							addPageBusiness(addURL,"Add Users");
						}
					}
					
				} else {
					
					if (mode === "VIEW") {
						getClientDataAsyncFalse("GET", "", "checkIfUserExistUnderLoggedInAdvisorAdmin/"+loggedUser.id, onCheckSuccess);
						function onCheckSuccess(count) {
							//alert("count " + (count-1))
							if ((count-1) > data.length) {
								bootbox.alert("You have more users in your system who aren't supervised by anyone. " +
										"Please map them to a supervisor accordingly to see them in the User List")
							}
						}
					}

					//dataTbale creation
					//==================
					$('#idTable').dataTable().show();
					$('#idTable').dataTable().fnDestroy();
					$("#idUserListTable").empty();
					
					$.each(data, function (index, userList) {
						
						//dataTable implementation
						//==========================
						$("#idUserListTable").append('<tr onclick="selectRow(\'' + userList.userID + '\', this.id)" id="'+ userList.userID +'">' +
    							'<td>' + userList.userName + '</td>' +
								'<td>' + userList.emailID + '</td>' +
								'<td>' + userList.userRole + '</td>' +
								'<td>' + userList.city + '</td>' +
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
				hideLoader();
			} 
		}
	}
	
	/*$("#idUserListTable").on("click","tr",function(e){	
		addRowHandlers();
		findid=$(this).find("#idUser").val();
		//alert("id: "+ findid)
		sessionStorage.removeItem("SELECTED_USER_ID");
		sessionStorage.setItem("SELECTED_USER_ID",findid);
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
	});*/
	
	
});

/**count the users**/
function getCount() {
	
		getClientData("GET", "" , "getAdvisorCount", onGetCountSuccess);
	
		function onGetCountSuccess(data) {
			advisorUserCount = parseInt(data);
			
	    	pages = Math.floor(advisorUserCount / 100);
			rem = advisorUserCount % 100;
			if (rem > 0) {
				pages = pages + 1;
			}
			
			s = '<select  id="idPage" name="page" onchange="pageChange()">';
	
			for(i = 1; i <= pages; i++) {
				//alert("inside for");
				
				s += "<option value = "+(i-1)+">"+ i +"</option>";
				
			}
			s += "</select>";
		}
	
}

function onGetDataSuccess(data){
	
	if(data.length==0) {
		//alert("inside data.length");
		if((loggedUser != null) && (loggedUser.userManagementAddEdit != null && loggedUser.userManagementAddEdit === "Y" )){
			var addURL = "userManagement/addUserCreation.html";
			addPageBusiness(addURL,"Add User");
		} else {
			
			addPageBusiness("../authorisationErrorPage.html","Access Denied");
			
		}
     }
	
	/*var dataCount = 0;
	var divContainer = "";
	var pageCount = 1;*/
	//alert("success"); 

	//dataTbale creation
	//==================
	$('#idTable').dataTable().show();
	$('th:nth-child(4)').hide();
	$('#idTable').dataTable().fnDestroy();
	$("#idUserListTable").empty();
	tableRowCount = 0;
	
	$.each(data, function (index, userList) {
		//alert(users.loginUsername);
		tableRowCount ++;
		if(userList.activeFlag == "Y") {
    		var status = "Active";
	    } else {
	    	var status = "Deactive";
	    }
		//dataTable implementation
		//==========================
		$("#idUserListTable").append('<tr onclick="selectRow(\'' + userList.userId + '\', this.id)" id="'+ userList.userId +'">' +
				'<td>' + userList.firstName + " " + userList.lastName + '</td>' +
				'<td>' + userList.emailID + '</td>' +
				'<td>' + status + '</td>' +
				'<td class = "hidden"></td>' +
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
	
	start = (nextFetch * 100) + 1;
	//end = (nextFetch * 100) + data.length;
	end = (nextFetch * 100) + parseInt(tableRowCount);
	
	$('#idTable_info').html("Page "+ s + " Showing records " + start + " to " + end);
	$("#idPage").val(nextFetch);
	//=========================================
	$('#idTable').on('draw.dt', function (){
	    
		$('#idTable_info').html("Page "+ s + " Showing records " + start + " to " + end);
		$("#idPage").val(nextFetch);
    });	
}

function pageChange() {

	//alert("default page change")
	nextFetch = $("#idPage option:selected").val();
	getClientData("GET", "" , "showUserWithPagination/" + nextFetch, onGetDataSuccess);
	loadLoader();
}

function selectRow(id, rowid) {
	
	addRowHandlers();
	//findid=$(this).find("#idUser").val();
	findid = id;
	//alert("id: "+ findid);
	//alert("rowID: " + rowid);
	sessionStorage.removeItem("SELECTED_USER_ID");
	sessionStorage.setItem("SELECTED_USER_ID",findid);
	//$("#" + rowid).addClass("selected");
	$("#" + rowid).addClass("selected").siblings().removeClass("selected");
}

function confirmationClickBusiness(){
	loadLoader();
	$('#myModal').modal('hide');
		var idUser = sessionStorage.getItem("SELECTED_USER_ID");
		
		getClientData("GET", "", "deleteUser/" + idUser, onDeleteSuccess);
		function onDeleteSuccess(afterDeleteddata){

			if (afterDeleteddata.returnStatus == RETURN_VAL_ERROR_SUPERVISOR_MAPPING) {
				alert("Please remap the users who are supervised by This User");
			} else if(afterDeleteddata.returnStatus == RETURN_VAL_ERROR_CLIENT_MAPPING) {  
				alert("Please remap the Clients assigned to this User");
			} else if (afterDeleteddata.returnStatus == RETURN_VAL_SUCCESS) {
				
				serviceurl = "findAllHierarchyList/"+id;
				getClientData("GET", "", serviceurl, onSuccess);
				function onSuccess(data) {

				//alert("Success");
				//alert("data.length: " + data.length);
				$("#idUserListTable").empty();
				if(data.length==0)
				{
					var addURL = "userManagement/addUserCreation.html";
					addPageBusiness(addURL,"Add User");
				}
				$.each(data, function (index, userList) {
					console.log(data);
					$("#idUserListTable").empty();
					//$("#idClientListPaginate").empty();
					//$("#idPaginationDiv").empty();
					
					if(data.length==0)
					{
						var addURL = "userManagement/addUserCreation.html";
						addPageBusiness(addURL,"Add User");
					}
					
					var dataCount = 0;
					var divContainer = "";
					var pageCount = 1;
					//alert("success"); 
					
					//dataTbale creation
					//==================
					$('#idTable').dataTable().show();
					$('#idTable').dataTable().fnDestroy();
					$("#idUserListTable").empty();
					
					$.each(data, function (index, userList) {
						
						//dataTable implementation
						//==========================
						$("#idUserListTable").append('<tr onclick="selectRow(\'' + userList.userID + '\', this.id)" id="'+ userList.userID +'">' +
    							'<td>' + userList.userName + '</td>' +
								'<td>' + userList.emailID + '</td>' +
								'<td>' + userList.userRole + '</td>' +
								'<td>' + userList.city + '</td>' +
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
					
				}); 
			}
		}
		hideLoader();	
		}
	
}

function loadLoader(){	
	   // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"><span class="fa fa-refresh fa-spin"></span> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"> <img src="../Common/assets/images/icons/processing-gif-14.gif" alt="Loader" width="42" height="42"> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;">Processing... </h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    if(document.getElementById("overlayLoading1")){
	    console.log("overlayLoading1");
	    $("#overlayLoading1").html(ineerHtml).css({'display':'block'});
	  	}
	  	
	    if(document.getElementById("overlayLoading")){
	      console.log("overlayLoading1");
	  	  $("#overlayLoading").html(ineerHtml).css({'display':'block'});
	  	}
	
	    
	}

function hideLoader(){
	  
		   if(document.getElementById("overlayLoading1")){
			   console.log("overlayLoading");
			   $("#overlayLoading1").css({'display':'none'}).html("");
		   } 
		   if(document.getElementById("overlayLoading")){
			   console.log("overlayLoading");
			   $("#overlayLoading").css({'display':'none'}).html("");
		   }
}

var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;
var findid;
$("#idReset").hide();
$(document).ready(function(event){
	loadLoader();
	if(loggedUser.userManagementAddEdit === "Y"){
		$("#idReset").show();
	}else if(loggedUser.userManagementView === "Y"){
		$("#idReset").hide();
	}
	if (loggedUser.admin === "Y") {
		getClientData("GET", "", "showUser", onSuccess);
	} else if (loggedUser.admin === "N") {
		getClientData("GET", "", "getUserList/" + id, onSuccess);
	}
	var selectedAdvisorId ;
});
	function onSuccess(data){
		//console.log("nee"+data);
		
		//dataTbale creation
		//==================
		$('#idTable').dataTable();
		$('#idTable').dataTable().fnDestroy();
		$("#idManagePasswordListTable").empty();
		
		$.each(data, function (index, passwordList) {
			
			//dataTable implementation
			//==========================
			
			$("#idManagePasswordListTable").append('<tr onclick="selectRow(\'' + passwordList.id + '\', this.id)" id="'+ passwordList.id +'">' +
					'<td>' + passwordList.firstName + " " + passwordList.lastName +  '</td>' +
					'<td>' + passwordList.emailID + '</td>' +
					'<td>' + passwordList.role + '</td>' +
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
	
	

	
	/*$("#idManagePasswordListTable").on("click","tr",function(e){	
		addRowHandlers();
		 $("#idReset").show();	
		 selectedAdvisorId = $(this).find('#advisorId').val();
			sessionStorage.removeItem("SELECTED_USER_ID");
			sessionStorage.setItem("SELECTED_USER_ID",findid);
			
			$(this).addClass("selected");
			$(this).addClass("selected").siblings().removeClass("selected"); 
			});*/
	
	
	
	/*$("#idReset").on("click", function(event) {
		//alert("Reseting password .... " + selectedAdvisorId);
		var url = "resetPass/advisorUser/"+findid;
		getClientData("POST","" , url, onSuccess);
		function onSuccess(data) {
			$('#reset_modal').modal('show');
			
			
		 }
	
	});  */
	
 

function reset() {
	loadLoader();
	var url = "resetPass/advisorUser/"+findid+"/"+id;
	getClientData("POST","" , url, onSuccess);
	function onSuccess(data) {
		$('#reset_modal').modal('show');
		hideLoader();
	 }
}

function selectRow(id, rowid) {
	
	addRowHandlers();
	$("#idReset").show();
	findid = id;
	sessionStorage.removeItem("SELECTED_USER_ID");
	sessionStorage.setItem("SELECTED_USER_ID",findid);
	//alert(findid);
	$("#" + rowid).addClass("selected").siblings().removeClass("selected");
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

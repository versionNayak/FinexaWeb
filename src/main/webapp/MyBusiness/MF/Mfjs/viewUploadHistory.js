var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;
var uploadHistoryCount;
var tableRowCount;
var nextFetch;
var end = 0;
var start;
var pages;
var rem;
var s;

$(document).ready(function(event){
	
	//if admin
	$("#idTable").hide();
	loadLoader();
	
	getCount();
	nextFetch = 0;
    getClientData("GET", "" , "getFeedUploadHistoryWithPagination/" +loggedUser.id + "/" + nextFetch, onUserRoleSuccess);
    
	//getClientDataAsyncFalse("GET", "", "getFeedUploadHistory/"+loggedUser.id, onUserRoleSuccess);
	
});

function onUserRoleSuccess(data) {

	//dataTbale creation
	//==================
	$('#idTable').dataTable().show();
	$('#idTable').dataTable().fnDestroy();
	$("#idUserListTable").empty();
	tableRowCount = 0;
	
	$.each(data, function (index, userList) {
		
		tableRowCount ++;
		//dataTable implementation
		//==========================
		$("#idUserListTable").append('<tr>' +
				'<td><a title="'+ userList.rtatype +'" style="color:black">' + userList.rtatype + '</td>' +
				//'<td>' + userList.rtatype + '</td>' +
				'<td><a title="'+ userList.rtafileType +'" style="color:black">' + userList.rtafileType + '</td>' +
				//'<td>' + userList.rtafileType + '</td>' +
				'<td><a title="'+ userList.fileName +'" style="color:black">' + userList.fileName + '</td>' +
				//'<td>' + userList.fileName + '</td>' +
				'<td>' + userList.status + '</td>' +
				'<td>' + userList.rejectedRecords + '</td>' +
				'<td><a title="'+ userList.reasonOfRejection +'" style="color:black">' + userList.reasonOfRejection + '</td>' +
				//'<td>' + userList.reasonOfRejection + '</td>' +
				'<td>' + userList.autoClientCreationStatus + '</td>' +
				'<td>' + userList.date + '</td>' +
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

	start = (nextFetch * 50) + 1;
	//end = (nextFetch * 100) + data.length;
	end = (nextFetch * 50) + parseInt(tableRowCount);
	
	$('#idTable_info').html("Page "+ s + " Showing records " + start + " to " + end);
	$("#idPage").val(nextFetch);
	//=========================================
	$('#idTable').on('draw.dt', function (){
	    
		$('#idTable_info').html("Page "+ s + " Showing records " + start + " to " + end);
		$("#idPage").val(nextFetch);
    });

}

/**count the upload files**/
function getCount() {
	
		getClientData("GET", "" , "getUploadHistoryCount/" + loggedUser.id , onGetCountSuccess);
	
		function onGetCountSuccess(data) {
			uploadHistoryCount = parseInt(data);
			
	    	pages = Math.floor(uploadHistoryCount / 50);
			rem = uploadHistoryCount % 50;
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

function pageChange() {

	//alert("default page change")
	nextFetch = $("#idPage option:selected").val();
    getClientData("GET", "" , "getFeedUploadHistoryWithPagination/" + loggedUser.id + "/" + nextFetch, onUserRoleSuccess);
	loadLoader();
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

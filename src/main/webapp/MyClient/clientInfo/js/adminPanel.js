var ClientServiceUrl = serviceIP + "/clientservice/";
var nextFetch;
var advisorUserCount;
var s;
var start;
var end = 0;
var pages;
var rem;
var table;
var nextFetchSelf;
var nextFetchOrg;
var tableRowCount;
var pageFlag = "default";

$(document).ready(function(event) {
	$(".dashboardheading").html("Admin Panel - Existing Users");
	$("#headIcon").empty();
	
	$('#idUserName').attr('disabled', true);

	$('#idTable').hide();

	loadLoader();
	
	getCount();
	
	nextFetch = 0;
    getClientData("GET", "" , "showUserWithPagination/" + nextFetch, onGetDataSuccess);
    

});

/**count the users**/
function getCount() {
	//document.getElementById('idUsertype').value = "";
	//document.getElementById('idUserName').value = "";
	
	//on default load
	if (document.getElementById('idUsertype').value == "") {
		//alert("on default load")
		pageFlag = "default";
		getClientData("GET", "" , "getAdvisorCount", onGetCountSuccess);
	
		function onGetCountSuccess(data) {
			advisorUserCount = parseInt(data);
			//alert(advisorUserCount)
			
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
	} else if (document.getElementById('idUsertype').value == "Self") {			//on self load
		//alert("on self")
		pageFlag = "self";
		getClientData("GET", "" , "getSelfAdvisorCount", onGetCountSuccess);
	
		function onGetCountSuccess(data) {
			advisorUserCount = parseInt(data);
			//alert(advisorUserCount)
			
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
	} else {
		//alert("on org load")
		pageFlag = "org";
		var masterId = $('#idUserName option:selected').val();
		getClientData("GET", "" , "getOrgAdvisorCount/" + masterId, onGetCountSuccess);
	
		function onGetCountSuccess(data) {
			advisorUserCount = parseInt(data);
			//alert(advisorUserCount)
			
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
}

/**get data from table**/
function onGetDataSuccess(data) {
	
	//dataTbale creation
	//==================
	table = $('#idTable').DataTable();
	$('#idTable').dataTable().fnDestroy();
	$("#idClientListPaginate").empty();
	tableRowCount = 0;
	
	$.each(data, function (index, users) {
		//alert(users.advisorAdmin)
		if (users.advisorAdmin === "Y") {
			tableRowCount ++;
			if(users.activeFlag == "Y") {
		    		var status = "Active";
		    		var buttonName = "Deactivate";
		    } else {
		    		var status = "Deactive";
		    		var buttonName = "Activate";
		    }
			
			//dataTable implementation
			//==========================
			$("#idClientListPaginate").append('<tr onclick="selectRow(\'' + users.id + '\', this.id)" id="'+ users.id +'" ondblclick="submitForm(\''+users.loginUsername+'\',\''+users.loginPassword+'\',\''+status+'\')">' +
					'<td>' + users.firstName + " " + users.lastName + '</td>' +
					'<td>' + users.emailID + '</td>' +
					'<td>' + status + '</td>' +
					'<td><input type="button" class="pull-left btn addbtn" style="width:79px" id="idDelete'+ users.id +'" name="record" value= '+buttonName+' onclick="changeNow('+ users.id +',\''+ users.activeFlag +'\')"></td>' +
			'</tr>');
		}
	});
	
	//=====dataTable styling=====
	$('#idTable').DataTable(
			{
				
				"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
				//"pageLength": 10,
				"pagingType": "full_numbers"
				
			}
	);
	$('#idTable_paginate').css('margin-left',-100);
	$('#idTable').show();
	
	hideLoader();
    
	//selectedVal = $("#idPage option:selected").val();
	
	if (pageFlag == "default") {
		start = (nextFetch * 100) + 1;
		//end = (nextFetch * 100) + data.length;
		end = (nextFetch * 100) + parseInt(tableRowCount);
    } else if (pageFlag == "self") {
    	start = (nextFetchSelf * 100) + 1;
    	//end = (nextFetch * 100) + data.length;
    	end = (nextFetchSelf * 100) + parseInt(tableRowCount);
    } else if (pageFlag == "org") {
    	start = (nextFetchOrg * 100) + 1;
    	//end = (nextFetch * 100) + data.length;
    	end = (nextFetchOrg * 100) + parseInt(tableRowCount);
    }
	
    $('#idTable_info').html("Page "+ s + " Showing records " + start + " to " + end);
    if (pageFlag == "default") {
    	$("#idPage").val(nextFetch);
    } else if (pageFlag == "self") {
    	$("#idPage").val(nextFetchSelf);
    } else if (pageFlag == "org") {
    	$("#idPage").val(nextFetchOrg);
    }
	//=========================================
	$('#idTable').on('draw.dt', function (){
	    //selectedVal = $("#idPage option:selected").val();
	    var info = table.page.info();
       
	    //==========datatable page info=========
	   /* alert( 'Showing page: '+info.page+' of '+info.pages );
	    
	    $('ul.pagination').find('li.active').removeClass("active");
	    //page = $('ul.pagination').find('li.active').text();
	    $('li:contains('+page+')').filter(function() {
	    	  return $(this).text() == page;
	    }).addClass('active');
	    
		alert("draw " + page)*/
	    //=======================================
	    
	    //$('#idTable_info').html("showing page "+ s +" of Total " + pages + " pages");
	    $('#idTable_info').html("Page "+ s + " Showing records " + start + " to " + end);
	    if (pageFlag == "default") {
	    	$("#idPage").val(nextFetch);
	    } else if (pageFlag == "self") {
	    	$("#idPage").val(nextFetchSelf);
	    } else if (pageFlag == "org") {
	    	$("#idPage").val(nextFetchOrg);
	    }
    });
	
	/*$('#idTable').on('page.dt', function (){
		//$('ul.pagination').find('li.active').removeClass("active");
	    page = $('ul.pagination').find('li.active').text();
	    $('li:contains('+page+')').addClass('active');
		
		
		//page = $(this).text();
		alert("page " + page)
	});*/
}

$("#idclear").on("click", function(event) {
		
		document.getElementById('idUsertype').value = "";
		document.getElementById('idUserName').value = "";
});

/**first dropdown onchange function**/
function change() {
	
	if ($('#idUsertype option:selected').val() == "Self") {
	    $('#idUserName').attr('disabled', true);
	    //getClientData("GET", "" , "showUserSelf", onGetDataSuccess);
	} else {
		$('#idUserName').attr('disabled', false);
		getClientData("GET", "" , "allOrgName", onGetDropDownSuccess);
	}
	
}

function pageChange() {
	//if (document.getElementById('idUsertype').value == "") {
	if (pageFlag === "default") {
		//alert("default page change")
		nextFetch = $("#idPage option:selected").val();
		getClientData("GET", "" , "showUserWithPagination/" + nextFetch, onGetDataSuccess);
	} //else if (document.getElementById('idUsertype').value == "Self") {
	else if (pageFlag === "self") {
		//alert("self page change")
		nextFetchSelf = $("#idPage option:selected").val();
	    getClientData("GET", "" , "showUserSelfWithPagination/" + nextFetchSelf, onGetDataSuccess);
	} else if (pageFlag === "org") {
		//alert("org page change")
		var masterID = $('#idUserName option:selected').val();
		nextFetchOrg = $("#idPage option:selected").val();
		getClientData("GET", "" , "showUserOrgWithPagination/" + masterID + "/" + nextFetchOrg, onGetDataSuccess);
	}
	loadLoader();
}

function download() {
	
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	var fileName = "Users_report.xlsx";

	var xhr = new XMLHttpRequest();
	//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
	if ($('#idUsertype option:selected').val() == "Self") {
		xhr.open( "GET", ClientServiceUrl+'downloadReport/self', true);
	} else{
		var advisorId = $('#idUserName option:selected').val();
		xhr.open( "GET", ClientServiceUrl+'downloadReport/org/'+advisorId, true);
	}
	xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	xhr.responseType = "blob";
	xhr.onload = function() {
		var url = window.URL.createObjectURL(xhr.response);  
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
	};
	xhr.send(); 
}

/**show user data after activating/deactivating/clicking submit button**/
function submit() {
	if ($('#idUsertype option:selected').val() == "Self") {
	    //$('#idUserName').attr('disabled', true);
		getCount();
		nextFetchSelf = 0;
	    getClientData("GET", "" , "showUserSelfWithPagination/" + nextFetchSelf, onGetDataSuccess);
	    //getClientData("GET", "" , "showUserSelf", onGetDataSuccess);
	} else {
		var advisorId = $('#idUserName option:selected').val();
		getCount();
		nextFetchOrg = 0;
		getClientData("GET", "" , "showUserOrgWithPagination/" + advisorId + "/" + nextFetchOrg, onGetDataSuccess);
	}
}
$("#idsubmit").on("click", function(event) {
	if (validate($('#adminPanel'))) {
		submit();
	}
	
});

/**Populate data in 2nd drop-down**/
function onGetDropDownSuccess(data) {
	
	$.each(data, function (index, fund) {
		
		/*var markup = "<option value="+fund.id+">"+fund.orgName+"</option>";
		$("#idUserName").append(markup);*/
		
		$("#idUserName").append($('<option>', { 
	        value: fund.id,
	        text : fund.orgName
	    }));
	 });
	/*$("#idUserName").html($("#idUserName").find('option').sort(function(x, y) {
	    // to change to descending order switch "<" for ">"
	    return $(x).text() > $(y).text() ? 1 : -1;
	  }));*/
	sortDropDownListByText();
}

/**======sort dropdown============**/
function sortDropDownListByText() {
	// Loop for each select element on the page.
	$("#idUserName").each(function() {
		// Keep track of the selected option.
		var selectedValue = $(this).val();
		// Sort all the options by text. I could easily sort these by val.
		$(this).html($('option', $(this)).sort(function(a, b) {
			if (a.text.toUpperCase() != "SELECT") {
				return a.text.toUpperCase() == b.text.toUpperCase() ? 0 : a.text.toUpperCase() < b.text.toUpperCase() ? -1 : 1
			}
		}));
		// Select one option.
		$(this).val(selectedValue);
	});
	//alert($("#idUserName").find('option[value=""]').text())
	$("#idUserName").find('option[value=""]').insertBefore($("#idUserName").find('option:eq(0)'));
}


function submitForm (loginUsername, loginPassword, status){
			
			if(status == "Deactive") {
				//bootbox.alert("This user is not active at the moment!");
				bootbox.alert({ 
					  size: "medium",
					  title: "Deactive User",
					  message: "This user is not active at the moment"
					})
				return false;
			}
			
			var loginUsername = loginUsername;
			var loginPassword = loginPassword;
			jsondata = JSON.stringify({loginUsername,loginPassword});
			//alert(jsondata);
			
			getClientData("GET", "", "findLastLoginTime/"+loginUsername+"/"+loginPassword, onGetSuccess);
			function onGetSuccess(getData) {
				sessionStorage.setItem("LOGGED_IN_USER", JSON.stringify(getData));					 		
				window.location = "myclientDashboard.html";
			}
	}

/**Deactivate/Activate button on-click**/
function changeNow(id, activeFlag) {
	
	if (activeFlag == "Y") {
		if ($('#idUsertype option:selected').val() == "Self") {
			getClientData("GET", "" , "deactivateActiveFlag/" + id, onDeactivateSelfUserSuccess);
		}
		else if ($('#idUsertype option:selected').val() == "Organization") {
			getClientData("GET", "" , "deactivateActiveFlag/" + id, onDeactivateOrgUserSuccess);
			//myfunction2();
		}
		else {
			getClientData("GET", "" , "deactivateActiveFlag/" + id, onDeactivateSuccess);
			//$("#idDelete"+id).val("Activate");
		}
	}
	else if (activeFlag == "N") {
		if ($('#idUsertype option:selected').val() == "Self") {
			getClientData("GET", "" , "activateActiveFlag/" + id, onActivateSelfUserSuccess);
		}
		else if ($('#idUsertype option:selected').val() == "Organization") {
			getClientData("GET", "" , "activateActiveFlag/" + id, onActivateOrgUserSuccess);
			//myfunction2();
		}
		else {
			getClientData("GET", "" , "activateActiveFlag/" + id, onActivateSuccess);
		}
	}
}

function onDeactivateSelfUserSuccess(data) {
	
	bootbox.alert("User Deactivated");
	getClientData("GET", "" , "showUserSelfWithPagination/" + nextFetchSelf, onGetDataSuccess);
}

function onActivateSelfUserSuccess(data) {
	
	bootbox.alert("User Activated");
	getClientData("GET", "" , "showUserSelfWithPagination/" + nextFetchSelf, onGetDataSuccess);
}

function onDeactivateOrgUserSuccess(data) {
	
	bootbox.alert("User Deactivated");
	submit();
}

function onActivateOrgUserSuccess(data) {
	
	bootbox.alert("User Activated");
	submit();
}

function onDeactivateSuccess(data) {
	
	bootbox.alert("User Deactivated");
	getClientData("GET", "" , "showUserWithPagination/" + nextFetch, onGetDataSuccess);
	//alert("d"+page)
	//$('li:contains('+page+')').addClass('active');
}

function onActivateSuccess(data) {
	
	bootbox.alert("User Activated");
	getClientData("GET", "" , "showUserWithPagination/" + nextFetch, onGetDataSuccess);
	//alert("a"+page)
	//$('li:contains('+page+')').addClass('active');
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


var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	//	alert("loggedUser: " + loggedUser);
var id = loggedUser.id;
var userList;
var nextFetch;
var select;
var userName = [];

$(document).ready(function(event){
	
	getClientDataAsyncFalse("GET", "", "user/"+loggedUser.id, onUserRoleSuccess);
	function onUserRoleSuccess(data) {
		//alert(data.admin);
		if(data.admin == "Y"){
			populateUserForAdvisorAdmin(id);
		}else{
			populateUser(id);
		   }
		}
	$('#idUserList').on('change', function(){
		selectedUserId = $(this).val();
		
		//$("#idUserName").val(userName[selectedUserId]);
		document.getElementById('idUserName').value = userName[selectedUserId];
		
		$("#viewLoggingHistory tr").remove();
		countURL = 'getLoggedInHistoryCount/' + selectedUserId;
		getClientData("GET", "", countURL, onCountSuccess);
		
		nextFetch = 0;
		serviceurl = 'getLoggingHistoryWithPagination/'+selectedUserId+'/'+nextFetch;
		getClientData("GET", "", serviceurl, onSuccess);
		
		
   	    });
	
	function onCountSuccess(data){
		//alert("size = " + data)
		
		historyCount = parseInt(data);
    	pages = Math.floor(historyCount / 10);
		rem = historyCount % 10;
		//alert("pages = " + pages)
		//alert("rem = "+ rem)
		if (rem > 0) {
			pages = pages + 1;
		}
		//alert("pages = " + pages)
		select = '<select  id="idPage" name="page" onchange="pageChange()">';
		if (pages == 0) {
			select += "<option value = "+0+">"+ 1 +"</option>";
		} else {
			for(i = 1; i <= pages; i++) {
				//alert("inside for");
			
				select += "<option value = "+(i-1)+">"+ i +"</option>";
			
			}
		}
		select += "</select>";
		$("#idPageCount").html("show page " + select + " of " + pages);
	
	}
	
	
	
});

function onSuccess(data){
	//start = (nextFetch * 100) + 1;
	//end = (nextFetch * 100) + data.length;
	
	$("#viewLoggingHistory").empty();
	//alert(data.length)
	if (data.length == 0){
		bootbox.alert("User is yet to log-in to the system!")
	}
	$.each(data, function (index, loggingHistoryList) {
		var LogoutTime;
		if (loggingHistoryList.logoutTime == null) {
			LogoutTime = " ";
		} else {
			LogoutTime = loggingHistoryList.logoutTime;
		}
		$("#viewLoggingHistory").append('<tr>' +
				'<td>' + loggingHistoryList.loggedInUserName + '</td>' +
				'<td>' + loggingHistoryList.loginTime + '</td>' +
				'<td>' + LogoutTime + '</td>' +
		'</tr>');
	});
}

function pageChange() {
	nextFetch = $("#idPage option:selected").val();
	//alert(nextFetch)
	getClientData("GET", "" , 'getLoggingHistoryWithPagination/'+selectedUserId+'/'+nextFetch, onSuccess);
	//loadLoader();
}

function populateUser(id) {
	var dropDown = $("#idUserList");
	getClientData("GET", "", "getUserList/" +id , onGetUserSuccess);
	function onGetUserSuccess(data) {
		userList = data;
		//console.log("userList : " + userList);
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select User</option>');
		$.each(userList, function (index, user) {
			dropDown.append('<option value="' + user.id + '">' + user.emailID + '</option>');
			userName[user.id] = user.userName;
		});
	}
}

function populateUserForAdvisorAdmin(id) {
	var dropDown = $("#idUserList");
	getClientData("GET", "", "showUser" , onGetUserSuccess);
	function onGetUserSuccess(data) {
		userList = data;
		//console.log("userList : " + userList);
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select User</option>');
		$.each(userList, function (index, user) {
			dropDown.append('<option value="' + user.id + '">' + user.emailID + '</option>');
			userName[user.id] = user.firstName + " " + user.lastName;
		});
	}
}
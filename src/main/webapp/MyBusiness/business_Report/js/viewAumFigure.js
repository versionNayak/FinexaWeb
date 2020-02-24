var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	//	alert("loggedUser: " + loggedUser);
var id = loggedUser.id;
var userList;
var nextFetch;
var select;
var userName = [];

$(document).ready(function(event){
	

	$("#showReport").click(function(){
		getClientDataAsyncFalse("GET", "", "getAumFromTransaction/306", onUserRoleSuccess);
		function onUserRoleSuccess(data) {
			alert(data);
		}
	});
	
	
});


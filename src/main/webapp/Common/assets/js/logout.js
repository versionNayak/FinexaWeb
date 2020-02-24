
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}

if (loggedUser === null && loggedClient === null){
	window.location = "../index.html";
}


/*function logout(){
	//alert(sessionStorage.getItem("LOGGED_IN_USER"));
	sessionStorage.removeItem("LOGGED_IN_USER");
	window.location = "../index.html";
}*/

function logout() {
	if(loggedClient != null && loggedUser == null){
			serviceurl = "logoutFinexaForClient?clientID=" +loggedClient.id;
			getClientDataAsyncFalse("GET", "", serviceurl, onSuccess);
			function onSuccess(data) {
				sessionStorage.clear();
			}	
		}else if(loggedUser != null){
			serviceurl = "logoutFinexa?advisorUserId=" +loggedUser.id;
			getClientDataAsyncFalse("GET", "", serviceurl, onSuccess);
			function onSuccess(data) {
				sessionStorage.clear();
			}
		}
		
		  window.location = "../index.html";
}


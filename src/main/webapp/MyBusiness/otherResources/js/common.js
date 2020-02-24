var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
	function ConfirmLeave() {
		if(loggedClient != null && loggedUser == null){
			serviceurl = "logoutFinexaForClient?clientID="+loggedClient.id;
			getClientDataAsyncFalse("GET", "", serviceurl, onSuccess);
			function onSuccess(data) {
				sessionStorage.clear();
			}	
		}else if(loggedUser != null){
			serviceurl = "logoutFinexa?advisorUserId="+loggedUser.id;
			getClientDataAsyncFalse("GET", "", serviceurl, onSuccess);
			function onSuccess(data) {
				sessionStorage.clear();
			}
		}
			
			  window.location = "../index.html";
		}
	var prevKey="";
	$(document).keydown(function (e) {            
	  /*  if (e.key=="F5") {
	        window.onbeforeunload = ConfirmLeave;
	    }*/
	     if (e.key.toUpperCase() == "W" && prevKey == "CONTROL") {                
	        window.onbeforeunload = ConfirmLeave;   
	    }
	    /*else if (e.key.toUpperCase() == "R" && prevKey == "CONTROL") {
	        window.onbeforeunload = ConfirmLeave;
	    }*/
	    else if (e.key.toUpperCase() == "F4" && (prevKey == "ALT" || prevKey == "CONTROL")) {
	        window.onbeforeunload = ConfirmLeave;
	    }
	    prevKey = e.key.toUpperCase();
	});
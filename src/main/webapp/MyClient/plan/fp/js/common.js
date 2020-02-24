$(window).on('mouseover', (function () {
		window.onunload = window.onbeforeunload = null;
	}));
	$(window).on('mouseout', (function () {
		window.onunload = window.onbeforeunload = ConfirmLeave;
	}));
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
	
	     if (e.keyCode == 17 && e.keyCode == 87) {                
	    	window.onunload = window.onbeforeunload = ConfirmLeave;   
	    }
	    else if (e.key.toUpperCase() == "W" && prevKey == "CONTROL") {                
	    	window.onunload = window.onbeforeunload = ConfirmLeave;   
	    }
	    else if (e.key.toUpperCase() == "F4" && (prevKey == "ALT" || prevKey == "CONTROL")) {
	    	window.onunload = window.onbeforeunload = ConfirmLeave;
	    }
	    prevKey = e.key.toUpperCase();
	 
	});
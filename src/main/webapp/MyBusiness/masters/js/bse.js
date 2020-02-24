$(document).ready(function(){
	var pageMode = sessionStorage.getItem("PAGE_MODE");
	if(pageMode == "EDIT") {
		$("#idUserName").val(sessionStorage.getItem("BSE_USERNAME"));
		$("#idMemberId").val(sessionStorage.getItem("BSE_MEMBERID"));
		$("#idPassword").val("XXXXXXXXX");
		$("#idAccessMode").val(sessionStorage.getItem("BSE_ACCESS_METHOD"));
	}
});
function goToViewBse() {
	
	var userName = $("#idUserName").val();
	var memberId = $("#idMemberId").val();
	var password = $("#idPassword").val();
	var mode = $("#idAccessMode").val();
	
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	console.log("loggedUser" + JSON.stringify(loggedUser));
	
	$.ajax({
		type: 'GET',
		async:false,
		url: serviceIP + '/clientservice/registerBSEDetails?userName='+userName+'&memberCode='+memberId+'&password='+password+'&advisorId='+loggedUser.id+'&mode='+mode,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			if (!data.status) {
				bootbox.alert(data.message);
			} else {
				getClientData("GET", "", "findLastLoginTime/"+loggedUser.emailID+"/"+loggedUser.loginPassword, onGetSuccess);
				function onGetSuccess(getData) {
					if (getData.bseUsername == null) {
						$("#dashbord").empty();
						$("#dashbord").load("masters/bse.html");
						$(".dashboardheading").html("BSE Star MF");
					} else {
						
						bootbox.alert({
						    message: "Credentials are saved successfully",
						    callback: function () {
						    	sessionStorage.setItem("BSE_USERNAME",getData.bseUsername);
								sessionStorage.setItem("BSE_MEMBERID",getData.bseMemberId);
								sessionStorage.setItem("BSE_ACCESS_METHOD",getData.bseAccessMode);
								$("#dashbord").empty();
								$("#dashbord").load("masters/viewBse.html");
								$(".dashboardheading").html("View BSE Star MF Credentials");
						    }
						})
						
						
						
					}
				}
			}
			
		},
		error: function (jqXHR,data) {
			if(jqXHR.status == 401){
	        var error,error_description;
			error = jqXHR.responseJSON.error_description;
            error_description = "Access token expired: "+sessionStorage.getItem("sessionID");
            if(error === error_description){
	        		msg = "Your session has expired.Please log in again"
	        		bootbox.alert({
			        	 message: msg,
			        	 callback: function () {
				         window.location = "../index.html";
			         }
			      })
	        	}
	        	if(error === "unauthorized"){
	        		msg = "Full authentication is required to access this resource",
	        		bootbox.alert({
			        	 message: msg
			        })
	        	}	
	        }
		}
	});
}
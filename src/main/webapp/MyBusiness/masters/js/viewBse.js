$("#idBSECredentialsTBody").append("<tr>" +
			"<td>"+sessionStorage.getItem("BSE_USERNAME")+"</td>" +
			"<td>"+sessionStorage.getItem("BSE_MEMBERID")+"</td>" +
			"<td>XXXXX</td></tr>");
$(".editicon").click(function(){
//	alert("in edit");
	sessionStorage.setItem("PAGE_MODE","EDIT");
	$("#dashbord").empty();
	$("#dashbord").load("masters/bse.html");
	$(".dashboardheading").html("BSE Star Mf");
	
});
$(".deleteicon").click(function(){
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	bootbox.confirm({
		title: "Delete Bse Credentials",
		message: "Your BSE Credentials will be deleted. Are you sure ?",
		callback: function (result) {
			if (result === true) {
				$.ajax({
					type: 'GET',
					async:false,
					url: serviceIP + '/clientservice/registerBSEDetails?userName=NULL&memberCode=NULL&password=NULL&advisorId='+loggedUser.id+'&mode=0',
					dataType: 'json',
					beforeSend: function (xhr){ 
						xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				    },
					success: function (data) {
						$("#dashbord").empty();
						$("#dashbord").load("masters/viewBse.html");
						$(".dashboardheading").html("View Bse credentials");		
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
				
				getClientData("GET", "", "findLastLoginTime/"+loggedUser.emailID+"/"+loggedUser.loginPassword, onSuccess);
				function onSuccess(data) {
					if (data.bseUsername == null) {
						$("#dashbord").empty();
						$("#dashbord").load("masters/bse.html");
						$(".dashboardheading").html("BSE Star MF");
					} else {
						sessionStorage.setItem("BSE_USERNAME",data.bseUsername);
						sessionStorage.setItem("BSE_MEMBERID",data.bseMemberId);
						$("#dashbord").empty();
						$("#dashbord").load("masters/viewBse.html");
						$(".dashboardheading").html("View BSE Star MF Credentials");
					}
					
				} 
				
			}
		}
	});
});

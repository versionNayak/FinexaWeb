$(document).ready(function(){
//	alert(sessionStorage.getItem("TRANSACT_UPLOAD_BSE_MASTER"));
	
	/*$("#dashbord").load("advisorMyClient.html");
    $(".dashboardheading").html("Advisor Dashboard");
	 */
	 
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	
	if (sessionStorage.getItem("TRANSACT_UPLOAD_BSE_MASTER") == "TRUE") {
		$("#dashbord").empty();
		$("#dashbord").load("masters/bseClientUCCUpload.html");
		$(".dashboardheading").html("Upload BSE Client Master");
	} else {
		if(loggedUser.admin === "Y"){
			$("#dashbord").empty();
			if((loggedUser != null) && (loggedUser.mastersView != null && loggedUser.mastersView === "Y" )){
			$("#dashbord").load("userManagement/viewUMDashboard.html");
			//$(".dashboardheading").html("View User List");
			
			
			var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
			if((loggedUser != null) && (loggedUser.mastersAddEdit != null && loggedUser.mastersAddEdit === "Y" ))
			{
			var url = "masters/addRiskprofile.html";
			var heading="Add Risk Profile Questions";
			$("#headIcon").empty();
			$("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageRiskProfile(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

			url = "masters/addRiskprofile.html";
			var heading="Edit Risk Profile Questions";
			$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png' id='editRecord' onClick='editPageBusinessRiskProfile(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
			}

			$("#addRecord").removeClass('btn_Disabled');
			$('#editRecord').removeClass('btn_Disabled');
			}else{
				addPageBusiness("../authorisationErrorPage.html","Access Denied");
			}

		}else{
			$("#dashbord").empty();
			$("#dashbord").load("../advisorMyClient.html");
		    $(".dashboardheading").html("Advisor Dashboard");
		}
	
	}
	
	$(".risk_profile_master").click(function(){
		//alert("loggedUser "+loggedUser);
		//alert("loggedUser.MastersView "+loggedUser.mastersView);
		//alert("loggedUser.MastersAddEdit "+loggedUser.mastersAddEdit);
		
		if((loggedUser != null) && (loggedUser.mastersView != null && loggedUser.mastersView === "Y" )){
		$("#dashbord").empty();
		$("#dashbord").load("masters/riskProfileMaster.html");
		$(".dashboardheading").html("View Risk Profile Master");
		
		if((loggedUser != null) && (loggedUser.mastersAddEdit != null && loggedUser.mastersAddEdit === "Y" ))
		{
		var url = "masters/addRiskprofile.html";
		var heading="Add Risk Profile Questions";
		$("#headIcon").empty();
		$("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageRiskProfile(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

		url = "masters/addRiskprofile.html";
		var heading="Edit Risk Profile Questions";
		$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png' id='editRecord' onClick='editPageBusinessRiskProfile(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
		$("#addRecord").removeClass('btn_Disabled');
		$('#editRecord').removeClass('btn_Disabled');
		}
		}else{
			addPageBusiness("../authorisationErrorPage.html","Access Denied");
		}
		


	});


	$(".product_recom").click(function(){
		//alert("loggedUser "+loggedUser);
		//alert("loggedUser.MastersView "+loggedUser.mastersView);
		//alert("loggedUser.MastersAddEdit "+loggedUser.mastersAddEdit);
		if((loggedUser != null) && (loggedUser.mastersView != null && loggedUser.mastersView === "Y" )){
		$("#dashbord").empty();
		$("#dashbord").load("masters/productRecommendationMaster.html");
		$(".dashboardheading").html("View Product Recommendation Master");
		$("#headIcon").empty();
		var url = "masters/addproduct.html";
		var heading="Add Product Recommendation Master";
		if((loggedUser != null) && (loggedUser.mastersAddEdit != null && loggedUser.mastersAddEdit === "Y" ))
		{
		$("#headIcon").empty();
		$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
		$("#addRecord").removeClass('btn_Disabled');
		 }
		}else{
		addPageBusiness("../authorisationErrorPage.html","Access Denied");
		}

	});

	$(".advisor_logo_upload").click(function(){
		$("#dashbord").empty();
		$("#dashbord").load("masters/advisorLogoUploadMaster.html");
		$(".dashboardheading").html("Upload Advisor Logo");
		$("#addRecord").hide();
		$('#editRecord').hide();
	});

	$(".bseStarMF .credentials").click(function(){


		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		getClientData("GET", "", "findLastLoginTime/"+loggedUser.emailID+"/"+loggedUser.loginPassword, onGetSuccess);
		function onGetSuccess(getData) {
			/*alert("Success");
    		$("#idBSECredentialsTBody").append("<tr>" +
    				"<td>"+getData.bseUsername+"</td>" +
    				"<td>"+getData.bseMemberId+"</td>" +
    				"<td>XXXXX</td></tr>");*/
			if (getData.bseUsername == null) {
				$("#dashbord").empty();
				$("#dashbord").load("masters/bse.html");
				$(".dashboardheading").html("BSE Star MF");
			} else {
				sessionStorage.setItem("BSE_USERNAME",getData.bseUsername);
				sessionStorage.setItem("BSE_MEMBERID",getData.bseMemberId);
				sessionStorage.setItem("BSE_ACCESS_METHOD",getData.bseAccessMode);
				$("#dashbord").empty();
				$("#dashbord").load("masters/viewBse.html");
				$(".dashboardheading").html("View BSE Star MF Credentials");
			}
		}
	});

	$(".bseStarMF .masters").click(function(){
		$("#dashbord").empty();
		$("#dashbord").load("masters/bseClientUCCUpload.html");
		$(".dashboardheading").html("Upload BSE Client Master");
	});

});

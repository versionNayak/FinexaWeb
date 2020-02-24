$(document).ready(function(){
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	/*alert("loggedUser "+loggedUser);
	alert("loggedUser.MastersView "+loggedUser.mastersView);
	alert("loggedUser.MastersAddEdit "+loggedUser.mastersAddEdit);
*/
	
	if((loggedUser != null) && (loggedUser.mastersView != null && loggedUser.mastersView === "Y" )){
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("masters/riskProfileMaster.html");
	$(".dashboardheading").html("View Risk Profile Master");
	
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	if((loggedUser != null) && (loggedUser.mastersAddEdit != null && loggedUser.mastersAddEdit === "Y" ))
	{
	var url = "masters/addRiskprofile.html";
	var heading="Add Risk Profile Questions";
	$("#headIcon").empty();
	$("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageRiskProfile(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	url = "masters/addRiskprofile.html";
	var heading="Edit Risk Profile Questions";
	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png' id='editRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	}
	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').removeClass('btn_Disabled');
	}
	else{
		addPageBusiness("../authorisationErrorPage.html","Access Denied");
	}




});


/*   $("#idBuinessMasters").empty();
          $("#idBuinessMasters").load("masters/viewUploadmasters.html");
          $(".dashboardheading    ").html("");
          $(".dashboardheading    ").html("View Master List");

          var url = "masters/uploadMasters.html";
          var heading="   Upload Masters";
          $("#headIcon").empty();
          $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

          url = "masters/viewUploadmasters.html";
          $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRecord()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
          $("#addRecord").removeClass('btn_Disabled');
          $('#editRecord').addClass('btn_Disabled');
          $('#deleteRecord').addClass('btn_Disabled');

 */

	// alert('click');
	/*getClientDataAsyncFalse("GET", "", "user/"+loggedUser.id, onUserRoleSuccess);
	function onUserRoleSuccess(data) {
		//alert(data.admin);
		if(data.admin == "Y"){
			$("#idBuinessMasters").empty();
			$("#idBuinessMasters").load("masters/riskProfileMaster.html");
			$(".dashboardheading").html("View Risk Profile Master");

			var url = "masters/addRiskprofile.html";
			var heading="Add Risk Profile Questions";
			$("#headIcon").empty();
			$("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageRiskProfile(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

			url = "masters/addRiskprofile.html";
			var heading="Edit Risk Profile Questions";
			$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png' id='editRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

			$("#addRecord").removeClass('btn_Disabled');
			$('#editRecord').removeClass('btn_Disabled');
			
		}else{
			$("#dashbord").load("../advisorMyClient.html");
		    $(".dashboardheading").html("Advisor Dashboard");
			}
		}
	
	*/
	
	/*$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("masters/riskProfileMaster.html");
	$(".dashboardheading").html("View Risk Profile Master");

	var url = "masters/addRiskprofile.html";
	var heading="Add Risk Profile Questions";
	$("#headIcon").empty();
	$("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageRiskProfile(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	url = "masters/addRiskprofile.html";
	var heading="Edit Risk Profile Questions";
	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png' id='editRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");



	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').removeClass('btn_Disabled');*/


$(".risk_profile_master").click(function(){
	
	if((loggedUser != null) && (loggedUser.mastersView != null && loggedUser.mastersView === "Y" )){
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("masters/riskProfileMaster.html");
	$(".dashboardheading").html("View Risk Profile Master");

	  if((loggedUser != null) && (loggedUser.mastersAddEdit != null && loggedUser.mastersAddEdit === "Y" ))
	  {
	var url = "masters/addRiskprofile.html";
	var heading="Add Risk Profile Questions";
	$("#headIcon").empty();
	$("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageRiskProfile(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	url = "masters/addRiskprofile.html";
	var heading="Edit Risk Profile Questions";
	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png' id='editRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').removeClass('btn_Disabled');
	 }
	}else{
		addPageBusiness("../authorisationErrorPage.html","Access Denied");
	}
});



/*$(".risk_profile_master").click(function(){
	// alert('click');
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("masters/riskProfileMaster.html");
	$(".dashboardheading").html("View Risk Profile Master");

	var url = "masters/addRiskprofile.html";
	var heading="Add Risk Profile Questions";
	$("#headIcon").empty();
	$("#headIcon").append("<img src='../Common/assets/images/add-icon.png' id='addRecord' onClick='addPageRiskProfile(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	url = "masters/addRiskprofile.html";
	var heading="Edit Risk Profile Questions";
	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png' id='editRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");



	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').removeClass('btn_Disabled');


});*/

$(".product_recom").click(function(){
	
  if((loggedUser != null) && (loggedUser.mastersView != null && loggedUser.mastersView === "Y" )){
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("masters/productRecommendationMaster.html");
	$(".dashboardheading").html("View Product Recommendation Master");
	$("#headIcon").empty();
	var url = "masters/addproduct.html";
	var heading="Add Product Recommendation Master";
	if((loggedUser != null) && (loggedUser.mastersAddEdit != null && loggedUser.mastersAddEdit === "Y" ))
	{
	$("#headIcon").empty();
	$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	/* url = "masters/editProductRecommendationMaster.html";
    	heading="Edit Product Recommendation Master";
    	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	 */
	/*url = "masters/viewProductRecommendationMaster.html";
    	$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='confirmationClickBusiness()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
    	$("#addRecord").removeClass('btn_Disabled');
    	$('#editRecord').addClass('btn_Disabled');
    	$('#deleteRecord').addClass('btn_Disabled');*/
	    $("#addRecord").removeClass('btn_Disabled');
	}
   }  else{
		addPageBusiness("../authorisationErrorPage.html","Access Denied");
	}

});

$(".advisor_logo_upload").click(function(){
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("../MyBusiness/masters/advisorLogoUploadMaster.html");
	$(".dashboardheading").html("Upload Advisor Logo");
	$("#addRecord").hide();
	$('#editRecord').hide();
});

$(".encrypted_zip_password").click(function(){
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("../MyBusiness/masters/storeEncrpytedPassForZip.html");
	$(".dashboardheading").html("Store Zip Password");
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
			$("#idBuinessMasters").empty();
			$("#idBuinessMasters").load("masters/bse.html");
			$(".dashboardheading").html("BSE Star MF");
		} else {
			sessionStorage.setItem("BSE_USERNAME",getData.bseUsername);
			sessionStorage.setItem("BSE_MEMBERID",getData.bseMemberId);
			sessionStorage.setItem("BSE_ACCESS_METHOD",getData.bseAccessMode);
			$("#idBuinessMasters").empty();
			$("#idBuinessMasters").load("masters/viewBse.html");
			$(".dashboardheading").html("View BSE Star MF Credentials");
		}
	}
});

$(".bseStarMF .masters").click(function(){
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("masters/bseClientUCCUpload.html");
	$(".dashboardheading").html("Upload BSE Client Master");
});


$(".asset_allocation").click(function(){

	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("../MyBusiness/masters/assetAllocationMaster.html");
	$(".dashboardheading").html("View Lookup Asset Allocation Master");
	$("#headIcon").empty();
	var url = "../MyBusiness/masters/addproduct.html";
	var heading="Add Product Recommendation Master";
	$("#headIcon").empty();
	$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	url = "../MyBusiness/masters/editProductRecommendationMaster.html";
	heading="Edit Product Recommendation Master";
	$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

	url = "../MyBusiness/masters/viewProductRecommendationMaster.html";
	$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='confirmationClickBusiness()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	$('#deleteRecord').addClass('btn_Disabled');

});


$(".view_masters").click(function(){
	//alert('click');
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("../MyBusiness/masters/viewMasters.html");
	$(".dashboardheading").html("View Masters");
	$("#wrapper").css("height","auto");
	$("#dashbord").css("height","auto");
	$(".form-section-container").css("height","auto");
	$('.deleteicon').addClass('btn_Disabled');
});

$(".upload_masters").click(function(){
	//alert('click');
	$("#idBuinessMasters").empty();
	$("#idBuinessMasters").load("../MyBusiness/masters/viewUploadmasters.html");
	$(".dashboardheading").html("Upload History");

	$("#headIcon").empty();
	var url = "master/uploadMasters.html";
	var heading="Upload Masters";
	$("#headIcon").empty();
	$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPageBusiness(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Upload'/>");

	url = "../MyBusiness/masters/viewUploadmasters.html";
	$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRecord()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");

	$("#addRecord").removeClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	$('#deleteRecord').addClass('btn_Disabled');
});





$('.sidebar-nav li a').click(function(){
	$('.mandatory').hide();
});

$(".addicon").click(function(){
	$('.mandatory').show();
});

$(".editicon").click(function(){
	$('.mandatory').show();
});

$('.sidebar-nav.nav-stacked>li.has-submenu').click(function(){
	$('.editicon').show();
	$('.editicon').addClass('btn_Disabled');
	$('.addicon').show();
	$('.deleteicon').show();
})
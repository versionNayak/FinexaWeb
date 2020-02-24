$(document).ready(function() {	           

	function openPageInvest(path,heading) {
		$("#idInvest").empty();
		$(".dashboardheading").html(heading);    
		$("#idInvest").load(path);
		$("#page-content-wrapper").css("height","auto");
		$(".form-section-container").addClass("height1257px");
		$("#headIconInvest").empty();
		selectedClientId = 	sessionStorage.getItem("SELECTED_CLIENT_ID");
	}
	
	// ************************ DEFAULT ONLOAD VIEW CLIENT STARTS *************************//
	$("#idInvest").empty();
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	if (selectedClientId==null || selectedClientId=="") { 
		$("#idInvest").load("invest/viewUCCDetails.html");
		$("#mandatory-field-msg").hide();
	}
	else {
		openPageInvest("invest/viewUCCDetails.html","");
	}
	//var url = "invest/verificationProcessDisabled.html";
	var url = "invest/cccreationEdit.html";
	var heading="Edit UCC";
	$("#headIconInvest").empty();
	$("#headIconInvest").append("<img src='../Common/assets/images/edit-icon.png' id='editRecordInvest' disabled style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/> ");
	$('#editRecordInvest').addClass('btn_Disabled');
	$('#editRecordInvest').click(function(){
		sessionStorage.setItem("TRANSACT_NAV_MODE", "UCC_EDIT")
		openPageInvest(url,heading);
	});
	
	$(".investtrans .lump").click(function(){
		$("#headIconInvest").empty();
		$(".dashboardheading").html("Purchase (Lumpsum Transaction)"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
		$("#idInvest").load("invest/lumpsum.html");
	});


	$(".investtrans .red").click(function(){
		$("#headIconInvest").empty();
		$(".dashboardheading").html("Redemption process"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
//		$("#idInvest").load("invest/redemption.html");
		$(".dashboardheading").html("Redemption");
		$("#idInvest").load("invest/redemtionfield.html");
	});


	$(".investtrans .sip").click(function(){
		$("#headIconInvest").empty();
		$(".dashboardheading").html("Purchase (SIP)"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
		$("#idInvest").load("invest/sip.html");
	});



	$(".investtrans .swt").click(function(){
		$("#headIconInvest").empty();
		$(".dashboardheading").html("Switch"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
		$("#idInvest").load("invest/switch.html");
	});

	$(".investtrans .stp").click(function(){
		$("#headIconInvest").empty();
		$(".dashboardheading").html("Systematic Transfer Plan (STP)"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
		$("#idInvest").load("invest/stp.html");
	});
	$(".investtrans .swp").click(function(){
		$("#headIconInvest").empty();
		$(".dashboardheading").html("Systematic Withdrawal Plan (SWP)"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
		$("#idInvest").load("invest/swp.html");
	});

	$(".nestedincome .gp").click(function(){
		$("#headIconInvest").empty();
		$(".dashboardheading").html("Goal Planning"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
		$("#idInvest").load("invest/gp.html");
	});
	$(".nestedincome .fp").click(function(){
		$("#headIconInvest").empty();
		$(".dashboardheading").html("Financial Planning"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
		$("#idInvest").load("invest/fp.html");
	});
	$(".nestedincome .pm").click(function(){
		$("#headIconInvest").empty();
		$(".dashboardheading").html("Portfolio Management"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
		$("#idInvest").load("invest/pm.html");
	});
	$(".investUcc .ucc").click(function(){
		
		if ($('#headIconInvest').find('#editRecordInvest').length) {
		    // already Present
		} else {
			// not present
			var url = "invest/cccreationEdit.html";
			var heading="Edit UCC";
			$("#headIconInvest").empty();
			$("#headIconInvest").append("<img src='../Common/assets/images/edit-icon.png' id='editRecordInvest' disabled style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/> ");
			$('#editRecordInvest').addClass('btn_Disabled');
			$('#editRecordInvest').click(function(){
				sessionStorage.setItem("TRANSACT_NAV_MODE", "UCC_EDIT")
				openPageInvest(url,heading);
			});
		}
		
		
		$(".dashboardheading").html("View UCC"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
//		$("#idInvest").css("height","483px");
		$("#idInvest").load("invest/viewUCCDetails.html");
		
		// clear all the values set in session Storage for UCC
		sessionStorage.removeItem("LIST_OF_UCC");
		sessionStorage.removeItem("APPLICANT_STATUS");
		sessionStorage.removeItem("APPLICANT_NAME");
	});

	$(".investUcc .download").click(function(){
		sessionStorage.setItem("TRANSACT_NAV_MODE","SIDEBAR");
		$("#idInvest").empty();
		$(".dashboardheading").html("Download Documents");
		$("#idInvest").load("invest/downloadDoc.html");
	});

	$(".investUcc .upload").click(function(){
		sessionStorage.setItem("TRANSACT_NAV_MODE","SIDEBAR");
		$("#idInvest").empty();
		$(".dashboardheading").html("Upload Documents");
		$("#idInvest").load("invest/uploadDoc.html");
	});

	$(".investUcc .fatca").click(function(){
		sessionStorage.setItem("TRANSACT_NAV_MODE","SIDEBAR");
		$("#idInvest").empty();
		$(".dashboardheading").html("FATCA Declaration");
		$("#idInvest").load("invest/fatca.html");
	});

	$(".investUcc .mandate").click(function(){
		sessionStorage.setItem("TRANSACT_NAV_MODE","SIDEBAR");
		$("#idInvest").empty();
		$(".dashboardheading").html("Mandate Registration");
		$("#idInvest").load("invest/isip.html");
	});

	$(".investtrans .cart").click(function(){
		$(".dashboardheading").html("Add to Cart"); 
		$("#wrapper").css("height","auto");
		$("#idInvest").empty();
			
		$("#idInvest").load("invest/checkout.html");
	});
});
	

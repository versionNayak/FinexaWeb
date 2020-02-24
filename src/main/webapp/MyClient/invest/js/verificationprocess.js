$(document).ready(function(){

	$(".trn").click(function(){
		$("#transtbl").show();
		$("#pnitbl").hide();
	});

	$(".pn").click(function(){
		$("#transtbl").hide();
		$("#pnitbl").show();
	});

	var transactMode = sessionStorage.getItem("TRANSACT_NAV_MODE");
	if (transactMode == "UCC_EDIT") {
		$("#idccCreation").attr("title","Click To edit UCC");
		
		if (sessionStorage.getItem("SELECTED_FATCA_STATUS") == "true") {
			$("#idFatca").attr("title","Fatca Registered Successfully");
		} else {
			$("#idFatca").attr("title","Click To Register Fatca");
		}
		
		if (sessionStorage.getItem("SELECTED_MANDATE_STATUS") == "true") {
			$("#idIsip").attr("title","Mandate Registered Successfully");
		} else {
			$("#idIsip").attr("title","Click To Register Mandate");
		}
		
	} else {
		if (transactMode == "UCC") {
			$("#idccCreation").attr("title","Click To Register UCC");
			$("#idFatca").attr("title","Click To Register Fatca");
			$("#idIsip").attr("title","Click To Register Mandate");
			
		} 
	}

	
	var ucc = sessionStorage.getItem("SELECTED_CLIENT_CODE_EDIT");
	if (ucc != null) {

		var oldSrc = '../Common/assets/images/cccreation.png';
		var newSrc = '../Common/assets/images/ccc.png';
		$('img[src="' + oldSrc + '"]').attr('src', newSrc);

		var fatcaStatus = sessionStorage.getItem("SELECTED_FATCA_STATUS");
		if(fatcaStatus == "true") {
			var fatcaSrc = '../Common/assets/images/fatcadis.png';
			var fatcaSrcNew = '../Common/assets/images/facta.png';
			$('img[src="' + fatcaSrc + '"]').attr('src', fatcaSrcNew);
		}
		var mandateStatus = sessionStorage.getItem("SELECTED_MANDATE_STATUS");
		if (mandateStatus == "true") {
			var manSrc = '../Common/assets/images/isipdis.png';
			var manSrcNew = '../Common/assets/images/isip.png';
			$('img[src="' + manSrc + '"]').attr('src', manSrcNew);
		}
		$("#idFatca").click(function(){
			if(fatcaStatus == "false") {
				$("#idInvest").empty();
				$(".dashboardheading").html("FATCA Declaration");
				$("#idInvest").load("invest/fatca.html");
			}
		});
		$(".idIsip").click(function(){
			if (mandateStatus == "false") {
				$("#idInvest").empty();
				$(".dashboardheading").html("ISIP Mandate Registration");
				$("#idInvest").load("invest/isip.html");
			}
		});
		
		
	}
	$(".ckyc").click(function(){
		$("#idInvest").empty();
		$(".dashboardheading").html("Client Code Creation");
		$("#idInvest").load("invest/cccreation.html");
	});


});
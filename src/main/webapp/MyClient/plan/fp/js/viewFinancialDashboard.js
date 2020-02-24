$(document).ready(function(){
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
	$("#idpmnav").css("height","66%");

	$(".humbm").click( function(){

		if($("#idpmnav").width() == 0){


			document.getElementById("idpmnav").style.width = "250px";

		}
		else{
			document.getElementById("idpmnav").style.width = "0";
			$("#idpmnav a").css("border-bottom","white");
			$("#idpmnav a").css("margin-left","14px");
			$("#idpmnav a").css("color","#dadada");
			$("#idpmnav").css("right","-55px");
		}
	});


	if(loggedClient != null && loggedUser === null){
		$("#idBody").load("plan/fp/viewFinancialNetsurplusForClientPortal.html");
		$(".budgetsidenav a").css("border-bottom","white");
		$("#idHeading").html("Net Surplus");
		$("#idFPDownload").hide();

	}else{
		$("#idBody").load("plan/fp/viewFinancialNetsurplus.html");
		$(".budgetsidenav a").css("border-bottom","white");
		$("#idHeading").html("Net Surplus");
	}
	

	$(".pfinancialplan").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewFinancialPlanning.html");
		$("#idHeading").html("Financial Planning");
		$("#dashbord").css("height","485px");

		$(this).addClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});


	/*$(".pfnetsurplus").click(function(){
		if(loggedClient != null && loggedUser === null){
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialNetsurplusForClientPortal.html");
		}else{
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialNetsurplus.html");
		}
		$("#idHeading").html("Net Surplus");
		$(".form-section-container").css("padding","18px 45px 97px");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});


	$(".pfnetworth").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewFinancialNetworth.html");
		$("#idHeading").html("Net Worth");
		$(".form-section-container").css("padding","27px 45px 101px");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});

	$(".pffinancialratio").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewFinancialRatio.html");
		$("#idHeading").html("Financial Ratios");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});


	$(".fpriskprofile").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewFinancialRiskProfile.html");
		$("#idHeading").html("Risk Profile");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});

	$(".fpassetallocation").click(function(){
		if(loggedClient != null && loggedUser === null){
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialAssetAllocationForClientPortal.html");
		}else{
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialAssetAllocation.html");
		}
		$("#idHeading").html("Asset Allocation Review");
		$(".form-section-container").css("padding","27px 45px 101px");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});


	$(".fpgoalrecommendations").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewFinancialGoalRecommendation.html");
		$("#idHeading").html("Goal Recommendation");
		$(".form-section-container").css("padding","27px 45px 112px");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});



	$(".fpgoalexecution").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewFinancialGoalExecution.html");
		$("#idHeading").html("Goal Execution");
		$(".form-section-container").css("padding","27px 45px 112px");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
	});














	$(".fpcontigencyfund").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewContingencyFund.html");
		$("#idHeading").html("Contingency Fund");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});
	$(".fpinsuranceplanning").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewInsurancePlanning.html");
		$("#idHeading").html("Insurance Planning");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});

	$(".fpcashflows").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewFinancialCashflow.html");
		$("#idHeading").html("Cashflows");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fplantofaction").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});

	$(".fplantofaction").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewPlanofAction.html");
		$("#idHeading").html("Plan of Action");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","67%");
		$(this).addClass("onclickbg");
		$(".pfinancialplan").removeClass("onclickbg");
		$(".pfnetsurplus").removeClass("onclickbg");
		$(".pfnetworth").removeClass("onclickbg");
		$(".pffinancialratio").removeClass("onclickbg");
		$(".fpriskprofile").removeClass("onclickbg");
		$(".fpgoalrecommendations").removeClass("onclickbg");
		$(".fpassetallocation").removeClass("onclickbg");
		$(".fpcontigencyfund").removeClass("onclickbg");
		$(".fpinsuranceplanning").removeClass("onclickbg");
		$(".fpcashflows").removeClass("onclickbg");
		$(".fpgoalexecution").removeClass("onclickbg");
	});*/

});
function openNav() {
	$(".pmsidenav").show();
	$(".pmsidenav").css("right","0px");
	document.getElementById("idpmnav").style.width = "250px";
	$(".pmsidenav a").css("border-bottom","1px solid #d4d4d5");
	$(".pmsidenav a").css("margin-left","0px");
	$(".pmsidenav a").css("color","white");
}
function closeNav() {

	document.getElementById("idpmnav").style.width = "0";
	$(".pmsidenav a").css("border-bottom","white");
	$(".pmsidenav a").css("margin-left","14px");
	$(".pmsidenav a").css("color","#dadada");
	$(".pmsidenav").css("right","-55px");

}

$(document).ready(function(){
	// checking life Exp of Client
	vClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	console.log("vClientId in bm" + vClientId);

	var error = "Please Enter the Life Expectancy of ";

	$.ajax({
		type: 'GET',
		async:false,
		url: REQUEST_URL_BM+'/getClientDetails?clientId='+vClientId,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$.each(data.outputList,
					function(index, value) {
				if (value.lifeExp == null) {
					errorFlag = 1; 
					error = error + value.name + " and ";
				}
				
			});
			error = error.substring(0,(error.length-5));
			if (errorFlag == 1) {
				bootbox.alert(error);
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
	})
});
$(document).ready(function(){
	
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
    
	if(loggedUser == null && loggedClient != null){
		$('#idPortfolioRecommemdation').hide();
		 advisorUserId = loggedClient.userId;
		 advisorMasterId = loggedClient.advisorMasterID;
	}else{
		 $('#idPortfolioRecommemdation').show();
		 advisorUserId = loggedUser.advisorID;
		 advisorMasterId = loggedUser.advisorMasterId;
	} 
	
	
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
	
	
	
			$("#idBody").load("plan/pm/viewPortfolioRiskProfile.html");
	$(".budgetsidenav a").css("border-bottom","white");

	
	
	/*$(".pmRiskProfile").click(function(){
			$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioRiskProfile.html");
		$("#idHeading").html("Risk Profile");
		$("#dashbord").css("height","485px");
		$(".form-section-container").css("height","41em");
		$(this).addClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
	});
	
	
	$(".pmtracker").click(function(){
			$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioTracker.html");
		$("#idHeading").html("Portfolio Tracker");
		$("#dashbord").css("height","485px");
		$(".form-section-container").css("height","41em");
		$(".pmsidenav").css("height","64%");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
	});
	
	
	$(".pmloans").click(function(){
		$("#idBody").empty();
		if(loggedUser != null){
			$("#idBody").load("plan/pm/viewPortfolioLoans.html");  	
		}else{
			if(loggedClient != null){
			$("#idBody").load("plan/pm/viewPortfolioLoansClient.html");  	//For Client portal
		 }
		}
		
		$("#idHeading").html("Loans");
		$(".form-section-container").css("height","41em");
		//$(".form-section-container").css("padding","27px 45px 101px");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","64%");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
	});
	
	$(".pmnetworth").click(function(){
			$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioNetworth.html");
		$("#idHeading").html("Net Worth");
		$("#dashbord").css("height","485px");
		$(".form-section-container").css("height","41em");
		$(".pmsidenav").css("height","64%");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
	});
	
	
	$(".pmratios").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioRatio.html");
		$("#idHeading").html("Ratios");
		$("#dashbord").css("height","485px");
		$(".form-section-container").css("height","41em");
		$(".pmsidenav").css("height","64%");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
	});
	
	$(".pmassetallocation").click(function(){
		$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioAssetAllocation.html");
		$("#idHeading").html("Asset Allocation Review");
		$(".form-section-container").css("padding","27px 45px 101px");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","64%");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
	});
	
	
$(".pmportfoliofxtincome").click(function(){
	$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioFixedIncome.html");
		$("#idHeading").html("Portfolio Overview - Debt");
		//$(".form-section-container").css("padding","27px 45px 112px");
		$(".form-section-container").css("height","41em");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","64%");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
	});
	
	
	
	
	$(".pmportfolioequity").click(function(){
	$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioEquity.html");
		$("#idHeading").html("Portfolio Overview - Equity");
		$("#dashbord").css("height","485px");
		$(".form-section-container").css("height","41em");
		$(".pmsidenav").css("height","64%");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
	});
	$(".pmportfoliorecom").click(function(){
	$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioRecommendation.html");
		$("#idHeading").html("Portfolio Recommendation");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","64%");
		$(".form-section-container").css("height","41em");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
	});
	
	
	$(".pmproductrecom").click(function(){
	$("#idBody").empty();
	$("#idBody").load("plan/pm/viewProductRecommend.html");
		$("#idHeading").html("Product Recommendation");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","64%");
		$(".form-section-container").css("height","41em");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmadvisorrecommend").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
		
		
	});
	
	
	$(".pmadvisorrecommend").click(function(){
	$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioAdvisorRecommendation.html");
		$("#idHeading").html("Advisor Recommendations");
		$("#dashbord").css("height","485px");
		$(".pmsidenav").css("height","64%");
		$(".form-section-container").css("height","41em");
		$(this).addClass("onclickbg");
		$(".pmRiskProfile").removeClass("onclickbg");
		$(".pmtracker").removeClass("onclickbg");
		$(".pmloans").removeClass("onclickbg");
		$(".pmnetworth").removeClass("onclickbg");
		$(".pmratios").removeClass("onclickbg");
		$(".pmportfoliofxtincome").removeClass("onclickbg");
		$(".pmassetallocation").removeClass("onclickbg");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmproductrecom").removeClass("onclickbg");
		$(".pmportfoliorecom").removeClass("onclickbg");
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
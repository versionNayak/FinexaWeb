$(document).ready(function(){
	
			$("#idresources").load("resources/productCalculator/abcresources.html");
	$(".budgetsidenav a").css("border-bottom","white");

	
	
	$(".Income").click(function(){
			$("#idBudget").empty();
		$("#idBudget").load("bm/viewIncome.html");
		$("#idBudgetHeading").html("Income");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
	});
	$(".Expenses").click(function(){
	$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewExpenses.html");
		$("#idBudgetHeading").html("Expenses");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
	});
	$(".committed").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewcommitted.html");
		$("#idBudgetHeading").html("Committed Overflow");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
	});
	$(".Loans").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewLoans.html");
		$("#idBudgetHeading").html("Loans");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
	});
	$(".NetSurplus").click(function(){
			$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewNetSurplus.html");
		$("#idBudgetHeading").html("Net Surplus");
		$("#mySidenav").css("height","44%");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
	});
	$(".BudgetRatio").click(function(){
			$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewBudgetRatio.html");
		$("#idBudgetHeading").html("idBudget Ratio");
		$("#mySidenav").css("height","44%");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
	});
	$(".Recommendations").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewRecommended.html");
		$("#idBudgetHeading").html("idBudget Recommendations");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
	});
			});
function openNav() {
	$(".budgetsidenav").show();
		$(".budgetsidenav").css("right","0px");
	document.getElementById("idBudgetnav").style.width = "250px";
	$(".budgetsidenav a").css("border-bottom","1px solid #d4d4d5");
	$(".budgetsidenav a").css("margin-left","0px");
	$(".budgetsidenav a").css("color","white");
}
function closeNav() {
		
	document.getElementById("idBudgetnav").style.width = "0";
	$(".budgetsidenav a").css("border-bottom","white");
	$(".budgetsidenav a").css("margin-left","14px");
	$(".budgetsidenav a").css("color","#dadada");
	$(".budgetsidenav").css("right","-55px");
	
}
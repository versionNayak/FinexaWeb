/***********************************************************************/	
//clearing client Cache
getClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
function onRedisDataSuccess(data) {			
	//alert(data);
}
/***********************************************************************/		


//global variables required for bm and gp
var relation = [];
var memberIdList = [];
var selfGender;
var errorFlag = 0;
var income_key_selection_default = 0;
var income_key_selection_gender_default = "M";
function maskAmountValue(val) {
	var maskedval = Number(val).toLocaleString('en-IN');
	return maskedval;
}

function unmaskAmountValue(numval) {
	numval = numval.replace(/,/g, '');
	return numval; 
}

$(document).ready(function(){
	
	/**********ajax call for slider ***/
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
				relation.push(value.relation);
				memberIdList.push(value.memberId);
			});
			error = error.substring(0,(error.length-5));
			if (errorFlag == 1) {
				bootbox.alert(error);
			}
			selfGender = data.genderString;
		},
		error : function(jqXHR, exception) {
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
	        }else if (jqXHR.status == 403) {
	            msg = 'you don’t have permission to access ‘/’ on this server.';
	        } 
		}

	})

	$("#idBody").load("plan/bm/viewIncome.html");
	$(".form-section-container").css("padding","24px 45px 94px 45px");
	$(".form-section-container").height("auto");
	$(".budgetsidenav a").css("border-bottom","white");



	/*$(".Income").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewIncome.html");
		$(".form-section-container").css("padding","24px 45px 94px 45px");
		$(".form-section-container").height("auto");
		$("#idBudgetHeading").html("Income");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
		$(".form-section-container").css("padding","24px 45px 99px 45px");
	});
	$(".Expenses").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewExpenses.html");
		$(".form-section-container").css("padding","24px 45px 94px 45px");
		$(".form-section-container").height("auto");
		$("#idBudgetHeading").html("Expenses");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
		$(".form-section-container").css("padding","24px 45px 94px 45px");
	});
	$(".committed").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewCommitted.html");
		$(".form-section-container").css("padding","24px 45px 94px 45px");
		$(".form-section-container").height("auto");
		$("#idBudgetHeading").html("Committed Outflow");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
		$(".form-section-container").css("padding","24px 45px 94px 45px");
	});
	$(".Loans").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewLoans.html");
		$(".form-section-container").css("padding","24px 45px 94px 45px");
		$(".form-section-container").height("auto");
		$("#idBudgetHeading").html("Loans");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
		$(".form-section-container").css("padding","24px 45px 94px 45px");
	});
	$(".NetSurplus").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewNetSurplus.html");
		$(".form-section-container").css("padding","24px 45px 94px 45px");
		$(".form-section-container").height("auto");
		$("#idBudgetHeading").html("Net Surplus");
		$("#mySidenav").css("height","44%");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
		$(".form-section-container").css("padding","24px 45px 94px 45px");
	});
	$(".BudgetRatio").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewBudgetRatio.html");
		$(".form-section-container").css("padding","24px 45px 116px");
		$(".form-section-container").height("auto");
		$("#idBudgetHeading").html("Budget Ratio");
		$("#mySidenav").css("height","44%");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".Recommendations").removeClass("onclickbg");
		$(".form-section-container").css("padding","24px 45px 70px 45px");
	});
	$(".Recommendations").click(function(){
		$("#idBudget").empty();
		$("#idBudget").load("plan/bm/viewRecommended.html");
		$(".form-section-container").css("padding","24px 45px 81px");
		$(".form-section-container").height("auto");
		$("#idBudgetHeading").html("Budget Recommendations");
		$("#dashbord").css("height","485px");
		$(this).addClass("onclickbg");
		$(".Income").removeClass("onclickbg");
		$(".Expenses").removeClass("onclickbg");
		$(".committed").removeClass("onclickbg");
		$(".Loans").removeClass("onclickbg");
		$(".BudgetRatio").removeClass("onclickbg");
		$(".NetSurplus").removeClass("onclickbg");
		$(".form-section-container").css("padding","24px 45px 32px 45px");
	});*/
});
// function openNav() {
// 	$(".budgetsidenav").show();
// 	$(".budgetsidenav").css("right","0px");
// 	document.getElementById("idBudgetnav").style.width = "250px";
// 	$(".budgetsidenav a").css("border-bottom","1px solid #d4d4d5");
// 	$(".budgetsidenav a").css("margin-left","0px");
// 	$(".budgetsidenav a").css("color","white");
// }
// function closeNav() {

// 	document.getElementById("idBudgetnav").style.width = "0";
// 	$(".budgetsidenav a").css("border-bottom","white");
// 	$(".budgetsidenav a").css("margin-left","14px");
// 	$(".budgetsidenav a").css("color","#dadada");
// 	$(".budgetsidenav").css("right","-55px");

// }

$(".humbm").click( function(){
	if($("#idBudgetnav").width() == 0){
		document.getElementById("idBudgetnav").style.width = "250px";
	}
	else{
		document.getElementById("idBudgetnav").style.width = "0";
		$(".budgetsidenav a").css("border-bottom","white");
		$(".budgetsidenav a").css("margin-left","14px");
		$(".budgetsidenav a").css("color","#dadada");
		$(".budgetsidenav").css("right","-55px");
	}
});

function getDataUri(url, callback) {
	var image = new Image();	
	image.onload = function () {
		var canvas = document.createElement('canvas');
		canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
		canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size	
		canvas.getContext('2d').drawImage(this, 0, 0);	
		// Get raw image data
		callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));	
		// ... or get as Data URI
		callback(canvas.toDataURL('image/png'));
	};	
	image.src = url;
}


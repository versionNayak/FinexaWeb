jQuery(document).ready(function ($) {

	var jssor_7_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_7_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_7_SlideshowTransitions,
				$TransitionsOrder: 1
			},
			$ArrowNavigatorOptions: {
				$Class: $JssorArrowNavigator$
			},
			$ThumbnailNavigatorOptions: {
				$Class: $JssorThumbnailNavigator$,
				$Cols: 10,
				$SpacingX: 8,
				$SpacingY: 8,
				$Align: 360
			}
	};


	var jssor_7_slider = new $JssorSlider$("jssor_7", jssor_7_options);

	var goalsinputpavdiv = $('.jssort07 div:nth-child(2) div:nth-child(2)>div');

	$(".golasinputright").click(function(){

		if(goalsinputpavdiv.hasClass('pav'))
		{	  

			$(".idGPSidenav").css("height","50%");
			$("#idBody").empty();
			$("#idBody").load("plan/gp/viewGoalsDetails.html");


			$("#idHeading").html("Goals Details");
			$(".goalinput").removeClass("activeitem");
			$(".goalsdetails").addClass("activeitem");

		};
	});

	$(".golasinputleft").click(function(){
		if(goalsinputpavdiv.hasClass('pav'))
		{	  

			$("#idBody").empty();
			$("#idBody").load("plan/gp/viewYearlyCashflows.html");
			$("#idHeading").html("Yearly Cashflow");
			$(".goalinput").removeClass("activeitem");
			$(".yearly").addClass("activeitem");

		};
	});
});
$.ajax({
	type: 'GET',
	url: REQUEST_URL_GP + '/getClientGoalInputDetails?clientId='+vClientId+'&goalId='+goalId,
	async: false,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		$("#corpusUtil").text(data.corpusUtilizationFreq);
		$("#extimatedGoalCost").text(maskAmountValue(data.estimatedCostOfGoal));
		if (data.loanRequired == "Y") {
			$("#isLoanRequired").text("Yes");	
			$("#trLoanPerc").show();
			$("#trLoanInterest").show();
			$("#trLoanYears").show();
		} else {
			$("#isLoanRequired").text("No");
			$("#trLoanPerc").hide();
			$("#trLoanInterest").hide();
			$("#trLoanYears").hide();
		}
		
		$("#loanPercentage").text(parseFloat(((data.loanPerc * 100)*100)/100).toFixed(2) +"%");
		$("#loanInterestRate").text(parseFloat(data.interestRate * 100).toFixed(2) +"%");
		$("#loanTenure").text(data.loanTenure);
		$("#inflationRate").text(parseFloat(((data.expectedInflationRate * 100)*100)/100).toFixed(2) + "%");
		$("#PROR").text(parseFloat(data.expectedReturnOnCPGS * 100).toFixed(2) + "%");

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
//		alert("Goal Input Not Found");
//		bootbox.alert("error");
		$("#corpusUtil").text(0);
		$("#extimatedGoalCost").text(0);
		$("#isLoanRequired").text(0);
		$("#loanPercentage").text(0);
		$("#loanInterestRate").text(0);
		$("#loanTenure").text(0);
		$("#inflationRate").text(0);
		$("#PROR").text(0);
	}
});		



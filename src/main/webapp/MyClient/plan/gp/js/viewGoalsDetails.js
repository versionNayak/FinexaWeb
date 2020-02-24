var jssor_1_SlideshowTransitions = [
	{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


	];

var jssor_1_options = {
		$AutoPlay: 1,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: jssor_1_SlideshowTransitions,
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

var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

var goalpavdiv = $('.jssort01 div:nth-child(2) div:nth-child(2)>div');

$(".Goalsdetailsright").click(function(){
	if(goalpavdiv.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/gp/viewRiskProfile.html");
		$(".glidnonglid").hide();
		$(".form-section-container").css("padding","18px 45px 72px 45px");
		$("#idHeading").html("Risk Profile");
		$(".goalsdetails").removeClass("activeitem");
		$(".riskprofile").addClass("activeitem");
	};
});

$(".Goalsdetailsleft").click(function(){
	if(goalpavdiv.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/gp/viewGoalInput.html");
		$(".form-section-container").css("padding","18px 45px 72px 45px");

		$(".glidnonglid").hide();
		$("#idHeading").html("Goals Input");
		$(".goalsdetails").removeClass("activeitem");
		$(".goalinput").addClass("activeitem");

	};
});
$(document).ready(function(){

	$(".goalsdetails").addClass("activeitem");

	var currentDate = [];
	var endDate = [];
	var goalStartDate = [];
	var goalEndDate = [];
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getClientGPInfo?clientId='+vClientId+'&goalId='+goalId,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			console.log(data);
			$("#goalType").text(data.goalType);
			$("#goalDesc").text(data.goalDesc);
			$("#idClientAgeGoalStart").text(data.ageAtGoalStart);
			$("#goalMonths").text(data.monthsToGoal);
			$("#totalCorpGoalStart").text(maskAmountValue(data.totalCorpusReqdAtGoalStart));
			$("#CorpFinThroughGoal").text(maskAmountValue(data.corpusFinancedByLoan));
			$("#CorpFunded").text(maskAmountValue(data.corpusToBeFunded));
			currentDate.push(data.currentDateDTO.year);
			currentDate.push(data.currentDateDTO.month);
			currentDate.push(data.currentDateDTO.day);

			endDate.push(data.endDateDTO.year);
			endDate.push(data.endDateDTO.month);
			endDate.push(data.endDateDTO.day);

			goalStartDate.push(data.goalStartDateDTO.year);
			goalStartDate.push(data.goalStartDateDTO.month);
			goalStartDate.push(data.goalStartDateDTO.day);

			goalEndDate.push(data.goalEndDateDTO.year);
			goalEndDate.push(data.goalEndDateDTO.month);
			goalEndDate.push(data.goalEndDateDTO.day);

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
			//	alert("Goal Details Not Found");
//			bootbox.alert("error");
			$("#goalType").text("");
			$("#goalDesc").text("");
			$("#goalMonths").text(0);
			$("#totalCorpGoalStart").text(0);
			$("#CorpFinThroughGoal").text(0);
			$("#CorpFunded").text(0);
		}
	});	
	var data2 = [
		 {key: "Date1", value: new Date(currentDate[0], currentDate[1] -1) }, /* Birth date */
			{ key: "Date2", value: new Date(goalStartDate[0], goalStartDate[1] -1) }, /* Goal start date*/
	        { key: "Date3", value: new Date(goalEndDate[0], goalEndDate[1] -1) },/* Goal start date*/
	       { key: "Date4", value: new Date(endDate[0], endDate[1] -1) },/* approx death date*/
	      
		];


	function pad(n) {
		return n < 10 ? "0" + n : n;
	}

	function onChange(arg) {
		var presenter = document.getElementById("presenter");
		presenter.innerHTML = "<b>#" + arg.key + ":</b> " + arg.value;

	}

	var month = new Array();
	month[0] = "Jan";
	month[1] = "Feb";
	month[2] = "Mar";
	month[3] = "Apr";
	month[4] = "May";
	month[5] = "Jun";
	month[6] = "Jul";
	month[7] = "Aug";
	month[8] = "Sep";
	month[9] = "Oct";
	month[10] = "Nov";
	month[11] = "Dec";




	var rangeslide13 = rangeslide("#rangeslide13", {

		data: data2,
		markerSize: 8,
		trackHeight: 4,
		thumbWidth: 8,
		thumbHeight: 16,
		showLabels: true,
		slideMode: "free",
		showTooltips: true,
		showValue: true,
		valueIndicatorContent: function (data) {
			return /*pad(data.value.getDate()) + "." + pad(data.value.getMonth()+1) + "." + data.value.getFullYear();*/
		},
		valueIndicatorWidth: 80,
		valueIndicatorOffset: 16,
		showTrackMarkers: true,
		labelsPosition: "alternate",
		dataSource: "value",        
		labelsContent: function (data) {

			var d = new Date();
			var n = month[data.value.getMonth()];
		
			return  pad(n) + "/" + data.value.getFullYear('yyyy');
		}

	});

});








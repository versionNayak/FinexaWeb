jQuery(document).ready(function ($) {



	var jssor_2_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_2_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_2_SlideshowTransitions,
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


	var jssor_2_slider = new $JssorSlider$("jssor_2", jssor_2_options);


	var riskpavdiv = $('.jssort02 div:nth-child(2) div:nth-child(2)>div');

	$(".riskright").click(function(){

		if(riskpavdiv.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialAssetAllocation.html");
			$(".form-section-container").css("padding","18px 45px 135px 45px");
			$(".glidnonglid").show();
			$("#idHeading").html("Asset Allocation");
			$(".fpriskprofile").removeClass("activeitem");
			$(".fpassetallocation").addClass("activeitem");

		};
	});

	$(".riskleft").click(function(){

		if(riskpavdiv.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialRatio.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Financial Ratios");
			$(".pffinancialratio").addClass("activeitem");
			$(".fpriskprofile").removeClass("activeitem");





		};
	});

	var riskscoreData = [];
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getClientRiskInfo?clientId='+vClientId,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			riskscoreData.push(parseInt(data.riskProfile));
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

	});	


	Highcharts.chart('idRiskScore', {

		chart: {
			type: 'gauge',


		},

		pane: {
			startAngle: -150,
			endAngle: 150,
			background: [{
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },

				},

			}, {
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, '#333'],
						[1, '#FFF']
						]
				},
				borderWidth: 1,
				outerRadius: '107%'
			}, {
				// default background
			}, {
				backgroundColor: '#DDD',
				borderWidth: 0,
				outerRadius: '105%',
				innerRadius: '103%'
			}]
		},

		// the value axis
		yAxis: {
			min: 0,
			max: 10,



			tickPixelInterval: 30,
			tickWidth: 2,
			tickPosition: 'inside',
			tickLength: 10,
			tickColor: '#666',
			labels: {
				step: 2,
				rotation: 'auto'
			},
			title: {
				text: '<b>Risk Score</b>',
				style:{

					fontSize: '18px'
				}       

			},
			plotBands: [{
				from: 0,
				to: 3.5,
				color: '#3a3a4f' 

			}, {
				from: 3.5,
				to: 7,
				color: '#95ceff'
			}, {
				from: 7,
				to: 10,
				color: '#f7a35c',
				fill:'#f7a35c'
			}]
		},

		series:[{
			name: 'Score',
			data: riskscoreData,
			dataLabels: {
				formatter: function () {
					var kmh = this.y;
					if(kmh > 0 & kmh < 3.4){

						return '<span style="color:#3a3a4f;font-size:16px;">'+ kmh + '</span>' ;
					}
					if(kmh > 3.4 & kmh < 7){

						return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
					}
					if(kmh > 7 & kmh < 10){

						return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
					}


				},

			},

		}]


	});


});



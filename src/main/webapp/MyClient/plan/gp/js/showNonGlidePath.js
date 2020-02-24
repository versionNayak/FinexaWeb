jQuery(document).ready(function ($) {

	var jssor_9_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_9_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_9_SlideshowTransitions,
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


	var jssor_9_slider = new $JssorSlider$("jssor_9", jssor_9_options);

	var pavdiv = $('.jssort09 div:nth-child(2) div:nth-child(3) div');
	var pavleftdiv = $('.jssort09 div:nth-child(2) div:nth-child(2) div');
	$(".nonglidrarrow").click(function(){


		if(pavdiv.hasClass('pav'))

		{	

			$(".idBody").empty();
			$(".idBody").load("plan/gp/viewAmountNeeded.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");
			$(".glidnonglid").hide();
			$(".idHeading").html("Amount Needed");
			$(".recommended").removeClass("activeitem");
			$(".amount").addClass("activeitem");
			//$("#nonglidpath").hide();		

		};	

	});

	$(".nonglidrleftarrow").click(function(){


		if(pavleftdiv.hasClass('pav'))

		{	
			$(".idBody").empty();
			$(".idBody").load("plan/gp/viewRiskProfile.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");
			$(".glidnonglid").hide();
			//	$("#nonglidpath").hide();
			$(".idHeading").html("Risk Profile");
			$(".recommended").removeClass("activeitem");
			$(".riskprofile").addClass("activeitem");
		};
	});

	var idCashNGP = 0;
	var idUltraShortTermDebtNGP = 0;
	var idShortTermDebtNGP = 0;
	var idLongTermDebtNGP = 0;
	var idDebtOtherNGP = 0;
	var idEquityLargeNGP = 0;
	var idEquitySmallNGP = 0;
	var idEquityMultiNGP = 0;
	var idEquityInternationalNGP = 0;
	var idEquityMidNGP = 0;
	var idEquityOtherNGP = 0;
	var idPreciousMetalNGP = 0;
	var idAlternativeRealEstateNGP = 0;
	var idAlternativeOtherNGP = 0;
	var idTotalNGP = 0;
	var returnRate = [];
	var historyYear = [];

	
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getRecommendedAssetAllocationGP?clientId='+vClientId+'&goalId='+goalId+
		'&glideNonglideMode=N',
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {

			idCashNGP = parseFloat(data.assetAllocationList[0][2]) * 100;
			$("#idCashNGP").text(idCashNGP + "%");
			if(idCashNGP == 0) {
				$("#tableNonGlide tbody tr.classCash").hide();
			}

			idUltraShortTermDebtNGP = parseFloat(data.assetAllocationList[1][2]) * 100;
			$("#idFIUltraShortTermDebtNGP").text(idUltraShortTermDebtNGP + "%");
			if(idUltraShortTermDebtNGP == 0) {
				$("#tableNonGlide tbody tr.classUSTD").hide();
			}
			
			idShortTermDebtNGP = parseFloat(data.assetAllocationList[2][2]) * 100;
			$("#idFIShortTermDebtNGP").text(idShortTermDebtNGP + "%");
			if(idShortTermDebtNGP == 0) {
				$("#tableNonGlide tbody tr.classSTD").hide();
			}
			
			idLongTermDebtNGP = parseFloat(data.assetAllocationList[3][2]) * 100;
			$("#idFILongTermDebtNGP").text(idLongTermDebtNGP + "%");
			if(idLongTermDebtNGP == 0) {
				$("#tableNonGlide tbody tr.classLTD").hide();
			}
			idDebtOtherNGP = parseFloat(data.assetAllocationList[10][2]) * 100;
			$("#idFIDebtOthersNGP").text(idDebtOtherNGP + "%");
			if(idDebtOtherNGP == 0) {
				$("#tableNonGlide tbody tr.classDebtOthers").hide();
			}
			idEquityLargeNGP = parseFloat(data.assetAllocationList[4][2]) * 100;
			$("#idEquityLargeCapNGP").text(idEquityLargeNGP + "%");
			if(idEquityLargeNGP == 0) {
				$("#tableNonGlide tbody tr.classEquityLC").hide();
			}
			
			/*idEquitySmall = parseFloat(data.assetAllocationList[5][2]) * 100;
			$("#idEquityMidSmallCapNGP").text(idEquitySmall + "%");
			if(idEquitySmall == 0) {
				$("#tableNonGlide tbody tr.classEquityMC").hide();
			}*/
			idEquitySmallNGP = parseFloat(data.assetAllocationList[12][2]) * 100;
			$("#idEquitySmallCapNGP").text(idEquitySmallNGP + "%");
			if(idEquitySmallNGP == 0) {
				$("#tableNonGlide tbody tr.classEquitySC").hide();
			}
			
			idEquityMultiNGP = parseFloat(data.assetAllocationList[11][2]) * 100;
			$("#idEquityMultiCapNGP").text(idEquityMultiNGP + "%");
			if(idEquityMultiNGP == 0) {
				$("#tableNonGlide tbody tr.classEquityMC").hide();
			}

			
			idEquityInternationalNGP = parseFloat(data.assetAllocationList[6][2]) * 100;
			$("#idEquityInternationalNGP").text(idEquityInternationalNGP + "%");
			if(idEquityInternationalNGP == 0) {
				$("#tableNonGlide tbody tr.classEquityInt").hide();
			}
			
			idEquityMidNGP = parseFloat(data.assetAllocationList[5][2]) * 100;
			$("#idEquityMidCapNGP").text(idEquityMidNGP + "%");
			if(idEquityMidNGP == 0) {
				$("#tableNonGlide tbody tr.classEquityMDC").hide();
			}
			
			idEquityOtherNGP = parseFloat(data.assetAllocationList[9][2]) * 100;
			$("#idEquityOtherNGP").text(idEquityOtherNGP + "%");
			if(idEquityOtherNGP == 0) {
				$("#tableNonGlide tbody tr.classEquityOther").hide();
			}
			
			idPreciousMetalNGP = parseFloat(data.assetAllocationList[7][2]) * 100;
			$("#idAlternativesPreciousNGP").text(idPreciousMetalNGP + "%");
			if(idPreciousMetalNGP == 0) {
				$("#tableNonGlide tbody tr.classAltPrec").hide();
			}
			
			idRealEstateNGP = parseFloat(data.assetAllocationList[8][2]) * 100;
			$("#idAlternativeRealEstateNGP").text(idRealEstateNGP + "%");
			if(idRealEstateNGP == 0) {
				$("#tableNonGlide tbody tr.classAltReal").hide();
			}
			
			idAlternativeOthersNGP = parseFloat(data.assetAllocationList[9][2]) * 100;
			$("#idAlternativeOtherNGP").text(idAlternativeOthersNGP + "%");
			if(idAlternativeOthersNGP == 0) {
				$("#tableNonGlide tbody tr.classAltOther").hide();
			}
			
			/*console.log("idCash "+idCashNGP);
			console.log("idUltraShortTermDebt "+idUltraShortTermDebtNGP);
			console.log("idShortTermDebt "+idShortTermDebtNGP);
			console.log("idLongTermDebt "+idLongTermDebtNGP);
			console.log("idDebtOther "+idDebtOtherNGP);
			console.log("idEquityLarge "+idEquityLargeNGP);
			console.log("idEquitySmall "+idEquitySmallNGP);
			console.log("idEquityMulti "+idEquityMultiNGP);
			console.log("idEquityMid "+idEquityMidNGP);
			console.log("idEquityOther"+idEquityOtherNGP);
			console.log("idEquityInternational "+idEquityInternationalNGP);
			console.log("idPreciousMetalNGP "+idPreciousMetalNGP);
			console.log("idRealEstate "+idRealEstateNGP);
			console.log("idAlternativeOthers "+idAlternativeOthersNGP);*/
			
			
			
			idTotalNGP = idCashNGP + idUltraShortTermDebtNGP + idShortTermDebtNGP + idLongTermDebtNGP +
			+ idDebtOtherNGP + idEquityLargeNGP + idEquitySmallNGP + idEquityMultiNGP 
			+ idEquityInternationalNGP + idEquityMidNGP + idEquityOtherNGP 
			+ idPreciousMetalNGP + idRealEstateNGP +
			idAlternativeOthersNGP;
			
			console.log("idTotal "+idTotalNGP);
			
			$("#idTotalNGP").text(idTotalNGP + "%");

			$.each(data.historicalPFReturnList,function(index, value) {
				returnRate.push(value.assetReturn);
				historyYear.push(value.year);
			});
			loadHistoricalData();
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
			bootbox.alert("Failed to get Goal Details");
		}
	});		

	Highcharts.chart('idRecommendedasset', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			align: 'center',
			verticalAlign: 'bottom',
			layout: 'vertical'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Allocation',
			colorByPoint: true,
			data: [{
				name: 'Cash/Liquid',
				y: idCashNGP,
				color:'#3a3a4f'
			},
			{
				name: 'Ultra Short Term Debt',
				y: idUltraShortTermDebtNGP,
				color:'#95ceff'
			}, {
				name: 'Short Term Debt',
				y: idShortTermDebtNGP,
				color:'#f7a35c',
				sliced: true,
				selected: true
			}, {
				name: 'Long Term Debt',
				y: idLongTermDebtNGP,
				color:'#90ed7d'
			},  {
				name: 'Debt Others',
				y: idDebtOtherNGP,
				color:'#b0c4de'
			}, {
				name: 'Equity Large Cap',
				y:idEquityLargeNGP,
				color:'#8085d9'
			}, {
				name: 'Equity Mid Cap',
				y: idEquityMidNGP,
				color:'#f15c80'

			},{
				name: 'Equity Small Cap',
				y: idEquitySmallNGP,
				color:'#558769'

			},{
				name: 'Equity Multi Cap',
				y: idEquityMultiNGP,
				color:'#a56e69'

			},{
				name: 'Equity International',
				y: idEquityInternationalNGP,
				color:'#727276'

			},{
				name: 'Equity Others',
				y: idEquityOtherNGP,
				color:'#FFFFE0'

			},
			{
				name: 'Alternatives-Precious Metals',
				y:idPreciousMetalNGP,
				color:'#5adedc'

			},
			{
				name: 'Alternatives-Real Estate',
				y: idRealEstateNGP,
				color:'#9164aa'

			},
			{
				name: 'Alternatives-Others',
				y: idAlternativeOthersNGP,
				color:'#cdaa5f'

			}

			]
		}]
	});

	Highcharts.chart('idHistoricalGraph', {

		title: {
			text: 'Historical Portfolio Returns'
		},
		legend: {
			align: 'right',
			verticalAlign: 'bottom',
			layout: 'vertical'
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			categories: historyYear
		},
		yAxis: {
	        title: {
	            text: 'Returns'
	        }
		},
		series: [{
			name: 'Returns',
			type: 'column',
			data: returnRate,
			color: '#6eaee5',
			negativeColor: 'tomato',
			events: {
	            legendItemClick: function() {
	              return false;
	            }
	        }
		}]
	});



/*	Highcharts.chart('idRecommendedasset', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		legend: {
			align: 'center',
			verticalAlign: 'bottom',
			layout: 'vertical'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Allocation',
			colorByPoint: true,
			data: [{
				name: 'Cash/Liquid',
				y: 10,
				color:'#3a3a4f'
			},


			{
				name: 'Ultra Short Term Debt',
				y: 10,
				color:'#95ceff'
			}, {
				name: 'Short Term Debt',
				y: 10,
				color:'#f7a35c',
				sliced: true,
				selected: true
			}, {
				name: 'Long Term Debt',
				y: 10,
				color:'#90ed7d'
			}, {
				name: 'Equity Large Cap',
				y:10,
				color:'#8085d9'
			}, {
				name: 'Equity Mid and Small Cap',
				y: 10,
				color:'#f15c80'

			},
			{
				name: 'Equity International',
				y: 10,
				color:'#727276'

			},

			{
				name: 'Alternatives-Precious Metals',
				y:10,
				color:'#5adedc'

			},
			{
				name: 'Alternatives-Real Estate',
				y: 10,
				color:'#9164aa'

			},
			{
				name: 'Alternatives-Others',
				y: 10,
				color:'#cdaa5f'

			}

			]
		}]
	});

	Highcharts.chart('idHistoricalGraph', {

		title: {
			text: 'Historical Portfolio Returns'
		},
		legend: {
			align: 'right',
			verticalAlign: 'bottom',
			layout: 'vertical'
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			categories: [
				'2003','2004','2005','2006', '2007','2008', '2009','2010', '2011','2012','2013','2014','2015'
				]
		},


		series: [{
			name: 'Returns',
			type: 'column',
			data: [-6.4, -5.2, -3.0, 0.2, 2.3, 5.5, 8.4, 8.3, 5.1, 0.9, -1.1, -4.0,1.2],

			color: '#6eaee5',
			negativeColor: 'tomato'
		}]
	});*/

});

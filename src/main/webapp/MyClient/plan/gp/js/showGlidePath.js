jQuery(document).ready(function ($) {

	var jssor_8_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_8_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_8_SlideshowTransitions,
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


	var jssor_8_slider = new $JssorSlider$("jssor_8", jssor_8_options);

	var glidpavdiv = $('.jssort08 div:nth-child(2) div:nth-child(5) div');
	var glideleftaro = $('.jssort08 div:nth-child(2) div:nth-child(2) div');
	$(".glidright").click(function(){
		if(glidpavdiv.hasClass('pav'))
		{	  
			$(".idBody").empty();
			$(".idBody").load("plan/gp/viewAmountNeeded.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");
			$(".glidnonglid").hide();
			$(".glidpath").hide();
			$(".idHeading").html("Amount Needed");
			$(".recommended").removeClass("activeitem");
			$(".amount").addClass("activeitem");
		};
	});

	$(".glidrleftarrow").click(function(){

		if(glideleftaro.hasClass('pav'))
		{	
			$(".idBody").empty();
			$(".idBody").load("plan/gp/viewRiskProfile.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");
			$(".glidnonglid").hide();
			$(".nonglidpath").hide();
			$(".idHeading").html("Risk Profile");
			$(".recommended").removeClass("activeitem");
			$(".riskprofile").addClass("activeitem");
		};
	});


/*	var cashList = [];
	var ustDebtList = [];
	var lstDebt = [];
	var stDebt = [];
	var equityLCList = [];
	var equityMSCList = [];
	
	var cashList = [];
	var ustDebtList = [];
	var lstDebt = [];
	var stDebt = [];
	var otherDebt = [];
	var equityLCList = [];
	var equityMDCList = [];
	var equitySCList = [];
	var equityMCList = [];
	var equityOTHERList = [];
	var equityINTList = [];*/

	function loadAssetAllocationMovement() {
		$('#idRecommendedbarGraph').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: '<b>Asset Allocation Movement</b>'
			},
			xAxis: {
				categories: categoriesTimeToGoal
			},
			yAxis: {
				min: 0,
				title: {
					text: ''
				},
				stackLabels: {
					enabled: false,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
					}
				}
			},
			legend: {
				align: 'right',
				x: -5,
				verticalAlign: 'bottom',
				y: 45,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.x +'</b><br/>'+
					this.series.name +': '+ this.y+'%' +'<br/>'+
					'Total: '+ this.point.stackTotal+'%';
				}
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: true,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
						formatter: function() {
							if (this.y === 0) {
								return null;
							} else {
								return this.y+'%';
							}
						}
					}
				}
			},
		
			series: [{
				name: 'Ultra Short Term Debt',
				data: ustDebtList,
				color:"#95ceff"
			}, {
				name: 'Short Term Debt',
				data: stDebt,
				color:"#f7a35c"
			},  {
				name: 'Long Term Debt',
				data: lstDebt,
				color:"#90ed7d"
			},{
				name: 'Debt Others',
				data: otherDebt,
				color:"#b0c4de"
			},{
				name: 'Equity Large Cap',
				data: equityLCList,
				color:"#8085d9"
			},{
				name: 'Equity Mid Cap',
				data: equityMDCList,
				color:"#f15c80"
			},{
				name: 'Equity Small Cap',
				data: equitySCList,
				color:"#558769"
			},{
				name: 'Equity Multi Cap',
				data: equityMCList,
				color:"#a56e69"
			},{
				name: 'Equity Others',
				data: equityOTHERList,
				color:"#FFFF66"
			},{
				name: 'Equity International',
				data: equityINTList,
				color:"#727276"
			},{
				name: 'Cash Liquid',
				data: cashList,
				color:"#3a3a4f"
			}]
		})


		/*
		Highcharts.chart('idRecommendedbarGraph', {
			chart: {
				type: 'column'
			},
			title: {
				text: '<b>Asset Allocation Movement</b>'
			},
			xAxis: {
				categories: categoriesTimeToGoal
			},
			yAxis: {
				min: 0,
				title: {
					text: ''
				},

			},
			legend: {
				align: 'right',
				x: -5,
				verticalAlign: 'bottom',
				y: 45,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false
			},
			tooltip: {
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '{series.name}: {point.y:.1f}%<br/>Total: {point.stackTotal:1f}%'
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: true,
						format: '{point.y:.1f}%',
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
					},
					 formatter: function(){
						 if(this.point.y > 0)
	                        {
							 enabled: true
	                        }
						 else {
							 enabled: false
						 }
					 }
				}
			},
			series: [{
				name: 'Ultra Short Term Debt',
				data: ustDebtList,
				color:"#3a3a4f"
			}, {
				name: 'Short Term Debt',
				data: stDebt,
				color:"#95ceff"
			},  {
				name: 'Long Term Debt',
				data: lstDebt,
				color:"#f7a35c"
			},{
				name: 'Equity Large Cap',
				data: equityLCList,
				color:"#90ed7d"
			},{
				name: 'Equity Mid and Small Cap',
				data: equityMSCList,
				color:"#8085d9"
			},{
				name: 'Cash Liquid',
				data: cashList,
				color:"#f15c80"
			}]
		});
		 */}	

	var returnRate = [];
	var historyYear = [];

	function loadHistoricalData() {
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
	}

	function loadlineGraph() {
		Highcharts.chart('idLineGraph', {
			chart: {
				type: 'line'
			},
			title: {
				text: '<b>Glide Path-time to Goal</b>'
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				title: {
					text: 'Time to Goal'
				},
				categories: categoriesTimeToGoal
			},
			yAxis: {
				title: {
					text: 'Risk Score'
				}
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: true
					},
					enableMouseTracking: false
				}
			},
			series: [{
				name: 'Score',
				data: scoreTimeToGoal,
				events: {
		            legendItemClick: function() {
		              return false;
		            }
		        }
			}]
		});
	}



	var cashList = [];
	var ustDebtList = [];
	var lstDebt = [];
	var stDebt = [];
	var otherDebt = [];
	var equityLCList = [];
	var equityMDCList = [];
	var equitySCList = [];
	var equityMCList = [];
	var equityOTHERList = [];
	var equityINTList = [];
	var equityOTHERList = [];
	var idCash = 0;
	var idUltraShortTermDebt = 0;
	var idShortTermDebt = 0;
	var idLongTermDebt = 0;
	var idDebtOther = 0;
	var idEquityLarge = 0;
	var idEquityMid = 0;
	var idEquityMulti = 0 ;
	var idEquitySmall = 0;
	var idEquityInternational = 0;
	var idEquityOther = 0;
	var idPreciousMetal = 0;
	var idRealEstate = 0;
	var idAlternativeOthers = 0;
	
	var idTotal = 0;
	var categoriesTimeToGoal = [];
	var scoreTimeToGoal = [];

	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getRecommendedAssetAllocationGP?clientId='+vClientId+'&goalId='+goalId+
		'&glideNonglideMode='+vglideNonglideMode,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			
			
			idCash = parseFloat(data.assetAllocationList[0][2]) * 100;
			$("#idCash").text(idCash + "%");
			if(idCash == 0) {
				$("#glideTable tbody tr.classCash").hide();
			}

			idUltraShortTermDebt = parseFloat(data.assetAllocationList[1][2]) * 100;
			$("#idFIUltraShortTermDebt").text(idUltraShortTermDebt + "%");
			if(idUltraShortTermDebt == 0) {
				$("#glideTable tbody tr.classUSTD").hide();
			}

			idShortTermDebt = parseFloat(data.assetAllocationList[2][2]) * 100;
			$("#idFIShortTermDebt").text(idShortTermDebt + "%");
			if(idShortTermDebt == 0) {
				$("#glideTable tbody tr.classSTD").hide();
			}

			idLongTermDebt = parseFloat(data.assetAllocationList[3][2]) * 100;
			$("#idFILongTermDebt").text(idLongTermDebt + "%");
			if(idLongTermDebt == 0) {
				$("#glideTable tbody tr.classLTD").hide();
			}
			
			
			idDebtOther = parseFloat(data.assetAllocationList[10][2]) * 100;
			$("#idFIDebtOthers").text(idDebtOther + "%");
			if(idDebtOther == 0) {
				$("#glideTable tbody tr.classDebtOthers").hide();
			}
			
			idEquityLarge = parseFloat(data.assetAllocationList[4][2]) * 100;
			$("#idEquityLargeCap").text(idEquityLarge + "%");
			if(idEquityLarge == 0) {
				$("#glideTable tbody tr.classEquityLC").hide();
			}

			idEquitySmall = parseFloat(data.assetAllocationList[12][2]) * 100;
			$("#idEquitySmallCap").text(idEquitySmall + "%");
			if(idEquitySmall == 0) {
				$("#glideTable tbody tr.classEquitySC").hide();
			}
			
			idEquityMulti = parseFloat(data.assetAllocationList[11][2]) * 100;
			$("#idEquityMultiCap").text(idEquityMulti + "%");
			if(idEquityMulti == 0) {
				$("#glideTable tbody tr.classEquityMC").hide();
			}

			idEquityInternational = parseFloat(data.assetAllocationList[6][2]) * 100;
			$("#idEquityInternational").text(idEquityInternational + "%");
			if(idEquityInternational == 0) {
				$("#glideTable tbody tr.classEquityInt").hide();
			}
			
			idEquityMid = parseFloat(data.assetAllocationList[5][2]) * 100;
			$("#idEquityMidCap").text(idEquityMid + "%");
			if(idEquityMid == 0) {
				$("#glideTable tbody tr.classEquityMDC").hide();
			}
			
			idEquityOther = parseFloat(data.assetAllocationList[9][2]) * 100;
			$("#idEquityOther").text(idEquityOther + "%");
			if(idEquityOther == 0) {
				$("#glideTable tbody tr.classEquityOther").hide();
			}
			
			idPreciousMetal = parseFloat(data.assetAllocationList[7][2]) * 100;
			$("#idAlternativesPrecious").text(idPreciousMetal + "%");
			if(idPreciousMetal == 0) {
				$("#glideTable tbody tr.classAltPrec").hide();
			}

			idRealEstate = parseFloat(data.assetAllocationList[8][2]) * 100;
			$("#idAlternativeRealEstate").text(idRealEstate + "%");
			if(idRealEstate == 0) {
				$("#glideTable tbody tr.classAltReal").hide();
			}

			idAlternativeOthers = parseFloat(data.assetAllocationList[13][2]) * 100;
			$("#idAlternativeOther").text(idAlternativeOthers + "%");
			if(idAlternativeOthers == 0) {
				$("#glideTable tbody tr.classAltOther").hide();
			}
			
			
			console.log("idCash "+idCash);
			console.log("idUltraShortTermDebt "+idUltraShortTermDebt);
			console.log("idShortTermDebt "+idShortTermDebt);
			console.log("idLongTermDebt "+idLongTermDebt);
			console.log("idDebtOther "+idDebtOther);
			console.log("idEquityLarge "+idEquityLarge);
			console.log("idEquitySmall "+idEquitySmall);
			console.log("idEquityMulti "+idEquityMulti);
			console.log("idEquityMid "+idEquityMid);
			console.log("idEquityOther"+idEquityOther);
			console.log("idEquityInternational "+idEquityInternational);
			console.log("idPreciousMetal "+idPreciousMetal);
			console.log("idRealEstate "+idRealEstate);
			console.log("idAlternativeOthers "+idAlternativeOthers);
			
			

			/*idTotal = idCash + idUltraShortTermDebt + idShortTermDebt + idLongTermDebt + idDebtOther
			idEquityLarge + idEquitySmall + idEquityMulti + idEquityMid + idEquityOther + idEquityInternational 
			+ idPreciousMetal + idRealEstate + idAlternativeOthers;
			*/
			idTotal = idCash + idUltraShortTermDebt + idShortTermDebt + idLongTermDebt + idDebtOther;
			console.log("idTotal "+idTotal);
			idTotal += idEquityLarge + idEquitySmall + idEquityMulti + idEquityMid + idEquityOther + idEquityInternational;
			console.log("idTotal "+idTotal);
			idTotal += idPreciousMetal + idRealEstate + idAlternativeOthers;
			console.log("idTotal "+idTotal);
					
			$("#idTotal").text(idTotal + "%");
			$.each(data.riskScoreGPList,function(index, value) {
				categoriesTimeToGoal.push(value.toMonth + " Months");
				scoreTimeToGoal.push(value.allocationCategory);
			});
			loadlineGraph();
			
		

			$.each(data.assetAllocationMovementList,function(index, value) {
				cashList.push(value.cashLiquidPerc * 100);
				ustDebtList.push(value.ultraShortTermDebtPerc * 100);
				lstDebt.push(value.longTermDebtPerc * 100);
				stDebt.push(value.shortTermDebtOerc * 100);
				otherDebt.push(value.debtOthersPerc * 100);
				equityMDCList.push(value.equityMidPerc * 100);
				equityLCList.push(value.equityLargePerc * 100);
				equitySCList.push(value.equitySmallPerc * 100);
				equityMCList.push(value.equityMultiPerc * 100);
				equityINTList.push(value.equityInternationalPerc * 100);
				//equityOTHERList.push(value.equityOthersPerc * 100);
				
			

			});
			loadAssetAllocationMovement();

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
		credits: {
		      enabled: false
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
				y: idCash,
				color:'#3a3a4f'
			},
			{
				name: 'Ultra Short Term Debt',
				y: idUltraShortTermDebt,
				color:'#95ceff'
			}, {
				name: 'Short Term Debt',
				y: idShortTermDebt,
				color:'#f7a35c',
				sliced: true,
				selected: true
			}, {
				name: 'Long Term Debt',
				y: idLongTermDebt,
				color:'#90ed7d'
			},  {
				name: 'Debt Others',
				y: idDebtOther,
				color:'#b0c4de'
			}, {
				name: 'Equity Large Cap',
				y:idEquityLarge,
				color:'#8085d9'
			}, {
				name: 'Equity Mid Cap',
				y: idEquityMid,
				color:'#f15c80'

			},{
				name: 'Equity Small Cap',
				y: idEquitySmall,
				color:'#558769'

			},{
				name: 'Equity Multi Cap',
				y: idEquityMulti,
				color:'#a56e69'

			},{
				name: 'Equity International',
				y: idEquityInternational,
				color:'#727276'

			},{
				name: 'Equity Others',
				y: idEquityOther,
				color:'#FFFFE0'

			},
			{
				name: 'Alternatives-Precious Metals',
				y:idPreciousMetal,
				color:'#5adedc'

			},
			{
				name: 'Alternatives-Real Estate',
				y: idRealEstate,
				color:'#9164aa'

			},
			{
				name: 'Alternatives-Others',
				y: idAlternativeOthers,
				color:'#cdaa5f'

			}

			]
		}]
	});


	/*	Highcharts.chart('idRecommendedbarGraph', {
		chart: {
			type: 'column'
		},
		title: {
			text: '<b>Asset Allocation Movement</b>'
		},
		xAxis: {
			categories: ['120 Months', '84 Months', '48 Months', '12 Months']
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			},

		},
		legend: {
			align: 'right',
			x: -5,
			verticalAlign: 'bottom',
			y: 45,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
			borderColor: '#CCC',
			borderWidth: 1,
			shadow: false
		},
		tooltip: {
			headerFormat: '<b>{point.x}</b><br/>',
			pointFormat: '{series.name}: {point.y:.1f}%<br/>Total: {point.stackTotal:1f}%'
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				dataLabels: {
					enabled: true,
					format: '{point.y:.1f}%',
					color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
				}
			}
		},
		series: [{
			name: 'Ultra Short Term Debt',
			data: [8,9, 12, 13],
			color:"#3a3a4f"
		}, {
			name: 'Short Term Debt',
			data: [8,10, 11, 12],
			color:"#95ceff"
		},  {
			name: 'Long Term Debt',
			data: [9,11, 12, 13],
			color:"#f7a35c"
		},{
			name: 'Equity Large Cap',
			data: [9,11, 11, 13],
			color:"#90ed7d"
		},{
			name: 'Equity Mid and Small Cap',
			data: [9,10, 12, 11],
			color:"#8085d9"
		},{
			name: 'Cash Liquid',
			data: [8,9, 10, 11],
			color:"#f15c80"
		}]
	});




	Highcharts.chart('idLineGraph', {
		chart: {
			type: 'line'
		},
		title: {
			text: '<b>Glide Path-time to Goal</b>'
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			categories: ['120 Months', '84 Months', '48 Months', '12 Months']
		},
		yAxis: {
			title: {
				text: 'Risk Score'
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				},
				enableMouseTracking: false
			}
		},
		series: [{
			name: 'Score',
			data: [10.00, 6.50, 4.00, 2.00]
		}]
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
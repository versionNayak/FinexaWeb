var jssor_22_SlideshowTransitions = [
	{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


	];


var jssor_22_options = {
		$AutoPlay: 1,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: jssor_22_SlideshowTransitions,
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

var jssor_22_slider = new $JssorSlider$("jssor_22", jssor_22_options);

var recompavright = $('.jssort22 div:nth-child(2) div:nth-child(2) div');
var recompavleft = $('.jssort22 div:nth-child(2) div:nth-child(2) div');



$(".Incomeright").click(function(){
	if(recompavright.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioFixedIncome.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$(".glidnonglid").hide();
		$("#idHeading").html("Portfolio Overview Debt.");
		$(".pmportfolioequity").removeClass("activeitem");
		$(".pmportfoliofxtincome").addClass("activeitem");

	};
});

$(".Incomeleft").click(function(){
	if(recompavleft.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioAssetAllocation.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$("#idHeading").html("Asset Allocation Review");
		$(".pmportfolioequity").removeClass("activeitem");
		$(".pmassetallocation").addClass("activeitem");

	};
});
var monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function mfCustomClick(text) {
	//alert("mfCustomClick");
	if (text != "") {
		var str = text.split("-");
		var startDate = str[0];
		var startDateSplit = startDate.split(",");
		var yy = startDateSplit[1];
		var moreDateSplit = startDateSplit[0];
		var dd = moreDateSplit.substring(moreDateSplit.length - 2,moreDateSplit.length);
		var mm = moreDateSplit.substring(0,moreDateSplit.length - 2);
		yy = yy.trim();
		dd = dd.trim();
		mm = mm.trim();
		var month = 0;
		for (i = 0; i < monthArray.length; i ++) {
			if (mm == monthArray[i]) {
				month = i;
				break;
			}
		}
		startDate = yy + "-" + (month+1) + "-" + dd;
//		alert("startDate" + startDate);
		var endDate = str[1];
		var endDateSplit = endDate.split(",");
		var yy1 = endDateSplit[1];
		var moreDateSplit = endDateSplit[0];
		var dd1 = moreDateSplit.substring(moreDateSplit.length - 2,moreDateSplit.length);
		var mm1 = moreDateSplit.substring(0,moreDateSplit.length - 2);
		yy1 = yy1.trim();
		dd1 = dd1.trim();
		mm1 = mm1.trim();
		var month1 = 0;
		for (i = 0; i < monthArray.length; i ++) {
			if (mm1 == monthArray[i]) {
				month1 = i;
				break;
				
			}
		}
		endDate = yy1 + "-" + (month1+1) + "-" + dd1;
	//	alert("mfcustom startDate "+startDate);
	//	alert("mfcustom endDate "+endDate);
//		alert("endDate" + endDate);
		$.ajax({
			type:'GET',
			async:false,
			//hardcoded to be changed later
			url: REQUEST_URL_PM+'/getClientMFOnePager?ISIN='+selectedIsin+'&startDate='+startDate+'&endDate='+endDate,
			datatype:"json",
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function(data) {
				performanceValuesMF = [];
				dateMF = [];
				if(data.masterFundPerformancevsIndexList.length > 0) {
					$.each(data.masterFundPerformancevsIndexList,function(index,value){
						performanceValuesMF.push(value.nav);
						dateMF.push(value.date);
					});
				}
				if (dateMF.length > 0) {
					Highcharts.chart('idMFOnePagerGrowthGraph', {
						chart: {
							type: 'line'
						},
						title: {
							text: ''
						},
						subtitle: {
							text: ''
						},
						xAxis: {
							categories: dateMF
						},
						yAxis: {
							title: {
								text: ''
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
						series: [
							{
								name: 'Performance',
								data: performanceValuesMF,
								color:"#f7a35c"
							}
							]
					});
				} else {
					$("#idPerformMF").text("No value between these dates");
					if (!($('#idPerformMF').highcharts() == undefined)) {
						$('#idPerformMF').highcharts().destroy();	
					}

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
		});
	}
}

function stockCustomClick(text)  {

	if (text != "") {
		var str = text.split("-");
		var startDate = str[0];
		var startDateSplit = startDate.split(",");
		var yy = startDateSplit[1];
		var moreDateSplit = startDateSplit[0];
		var dd = moreDateSplit.substring(moreDateSplit.length - 2,moreDateSplit.length);
		var mm = moreDateSplit.substring(0,moreDateSplit.length - 2);
		yy = yy.trim();
		dd = dd.trim();
		mm = mm.trim();
		var month = 0;
		for (i = 0; i < monthArray.length; i ++) {
			if (mm == monthArray[i]) {
				month = i;
				break;
			}
		}
		startDate = yy + "-" + (month+1) + "-" + dd;
		//alert("startDate" + startDate);
		var endDate = str[1];
		var endDateSplit = endDate.split(",");
		var yy1 = endDateSplit[1];
		var moreDateSplit = endDateSplit[0];
		var dd1 = moreDateSplit.substring(moreDateSplit.length - 2,moreDateSplit.length);
		var mm1 = moreDateSplit.substring(0,moreDateSplit.length - 2);
		yy1 = yy1.trim();
		dd1 = dd1.trim();
		mm1 = mm1.trim();
		var month1 = 0;
		for (i = 0; i < monthArray.length; i ++) {
			if (mm1 == monthArray[i]) {
				month1 = i;
				break;
				
			}
		}
		endDate = yy1 + "-" + (month1+1) + "-" + dd1;
		//alert("endDate" + endDate);

		dateStock = [];
		performanceValuesStock = [];
		$.ajax({
			type:'GET',
			async:false,
			url: REQUEST_URL_PM+'/getClientStockOnePager?ISIN='+selectedIsin+'&startDate='+startDate+'&endDate='+endDate,
			datatype:"json",
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function(data) {
				// loading graph
				if (data.masterStockPerformancevsIndexList != null && data.masterStockPerformancevsIndexList.length > 0) {
					$.each(data.masterStockPerformancevsIndexList,function(index,value){
						performanceValuesStock.push(value.closingPrice);
						dateStock.push(value.date);
					});
				}
			},error: function(data) {
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
		if (dateStock.length > 0) {
			$("#idPerformHeaderEquity").text("");
			Highcharts.chart('idEquityOnePagerGrowthGraph', {
				chart: {
					type: 'line',
					
				},
				title: {
					text: ''
				},
				subtitle: {
					text: ''
				},
				xAxis: {
					categories: dateStock
				},
				yAxis: {
					title: {
						text: ''
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
					name: 'Performance',
					data: performanceValuesStock,
					color:"#f7a35c"
				}]
			});
		} else {
			$("#idPerformHeaderEquity").text("No Data found between these dates");
			if (!($('#idEquityOnePagerGrowthGraph').highcharts() == undefined)) {
				$('#idEquityOnePagerGrowthGraph').highcharts().destroy();
			}
		}
	}

}

var stockMFFlag = 0;
var selectedIsin;
/*function dateRangepickerClicked(text) {
	//alert("dateRangepickerClicked" + text);
	if (!(text.trim() == "Custom Range")) {
		//alert("Hi");
		var startDate = new Date();
		var dd = startDate.getDate();
		var mm = startDate.getMonth() + 1;
		var yyyy = startDate.getFullYear();
		startDate = yyyy + '-' + mm + '-' + (dd-1);
		var endDate;
		var monthCounter = 1;
		var yearCounter = 0;
		if (text == "1 Month") {
			monthCounter = 1;
			yearCounter = 0;
		} else if (text == "3 Months") {
			monthCounter = 3;
			yearCounter = 0;
		} else if (text == "6 Months") {
			monthCounter = 6;
			yearCounter = 0;
		} else if (text == "1 Year") {
			yearCounter = 1;
			monthCounter = 0;
		} else if (text == "3 Years") {
			yearCounter = 3;
			monthCounter = 0;
		} else if (text == "5 Years") {
			yearCounter = 5;
			monthCounter = 0;
		}

		if (yearCounter == 0 && monthCounter >= 1) {
			var i = 0;
			while(i<monthCounter) {
				if (mm == 1) {// if month is january then previous month will be december
					mm = 12;
					yyyy = yyyy - 1;
				} else {
					mm = mm - 1;
				}
				i ++;
			}
		} else if (yearCounter >= 1 && monthCounter == 0){
			yyyy = yyyy - yearCounter ;
		}
		endDate = yyyy + '-' + mm + '-' + (dd);
		if (stockMFFlag == 1) {
			dateStock = [];
			performanceValuesStock = [];
			$.ajax({
				type:'GET',
				async:false,
				url: REQUEST_URL_PM+'/getClientStockOnePager?ISIN='+selectedIsin+'&startDate='+startDate+'&endDate='+endDate,
				datatype:"json",
				success: function(data) {
					// loading graph
					if (data.masterStockPerformancevsIndexList != null && data.masterStockPerformancevsIndexList.length > 0) {
						$.each(data.masterStockPerformancevsIndexList,function(index,value){
							performanceValuesStock.push(value.closingPrice);
							dateStock.push(value.date);
						});
					}
				},error: function(data) {
				}
			});	
			if (dateStock.length > 0) {
				$("#idPerformHeaderEquity").text("");
				Highcharts.chart('idEquityOnePagerGrowthGraph', {
					chart: {
						type: 'line'
					},
					title: {
						text: ''
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						categories: dateStock
					},
					yAxis: {
						title: {
							text: ''
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
						name: 'Performance',
						data: performanceValuesStock,
						color:"#f7a35c"
					}]
				});
			} else {
				$("#idPerformHeaderEquity").text("No Data found between these dates");
				if (!($('#idEquityOnePagerGrowthGraph').highcharts() == undefined)) {
					$('#idEquityOnePagerGrowthGraph').highcharts().destroy();
				}
			}

		} else if (stockMFFlag == 2) {
			$.ajax({
				type:'GET',
				async:false,
				//hardcoded to be changed later
				url: REQUEST_URL_PM+'/getClientMFOnePager?ISIN='+selectedIsin+'&startDate='+startDate+'&endDate='+endDate,
				datatype:"json",
				success: function(data) {
					performanceValuesMF = [];
					dateMF = [];
					if(data.masterFundPerformancevsIndexList.length > 0) {
						$.each(data.masterFundPerformancevsIndexList,function(index,value){
							performanceValuesMF.push(value.nav);
							dateMF.push(value.date);
						});
					}
					if (dateMF.length > 0) {
						Highcharts.chart('idMFOnePagerGrowthGraph', {
							chart: {
								type: 'line'
							},
							title: {
								text: ''
							},
							subtitle: {
								text: ''
							},
							xAxis: {
								categories: dateMF
							},
							yAxis: {
								title: {
									text: ''
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
							series: [
								{
									name: 'Performance',
									data: performanceValuesMF,
									color:"#f7a35c"
								}
								]
						});
					} else {
						$("#idPerformMF").text("No value between these dates");
						if (!($('#idPerformMF').highcharts() == undefined)) {
							$('#idPerformMF').highcharts().destroy();	
						}

					}
				},
				error: function(data) {
				}
			});
		}
	}
}*/

var performanceValuesStock = [];
var dateStock = [];
var equityFlag = 0;
var mfFlag = 0;

function stockClick(isin,name) {
	stockMFFlag = 1;
	selectedIsin = isin;
	name = decodeURIComponent(name);
	$("#idStockPagerHeader").text(name);
	var startDate = new Date();
	var dd = startDate.getDate();
	var mm = startDate.getMonth() + 1;
	var yyyy = startDate.getFullYear();
	startDate = yyyy + '-' + mm + '-' + (dd-1);
	var endDate;
	if (mm == 1) {// if month is january then previous month will be december
		endDate = (yyyy-1) + '-' + 12 + '-' + (dd);
	} else {
		endDate = (yyyy) + '-' + (mm-1) + '-' + (dd);
	}
	$.ajax({
		type:'GET',
		async:false,
		url: REQUEST_URL_PM+'/getClientStockOnePager?ISIN='+isin+'&startDate='+startDate+'&endDate='+endDate,
		datatype:"json",
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function(data) {
			indexValuesStock = [];
			performanceValuesStock = [];
			dateStock = [];
			$('#idLastClosingPriceStock').text(parseFloat(data.lastClosingPrice).toFixed(2));
			$('#id52WeekHighStock').text(parseFloat(data.weekHigh52).toFixed(2));
			$('#id52WeekLowStock').text(parseFloat(data.weekLow52).toFixed(2));
			$('#idDailyTradedVolumeStock').text(parseFloat(data.dailyTradeValue).toFixed(2));
			//$('#idBetaStock').text(parseFloat(data.beta).toFixed(2));
			$('#idMarketCapStock').text(parseFloat(data.marketCap).toFixed(2));
			$('#idPEStock').text(parseFloat(data.p_e).toFixed(2));
			$('#idPBStock').text(parseFloat(data.p_b).toFixed(2));
			$('#idDivYieldStock').text(parseFloat(data.divYield).toFixed(2));

			// loading graph
			if (data.masterStockPerformancevsIndexList != null && data.masterStockPerformancevsIndexList.length > 0) {
				$.each(data.masterStockPerformancevsIndexList,function(index,value){
					performanceValuesStock.push(value.closingPrice);
					dateStock.push(value.date);
				});
			}
			$("#idStockNiftyTable").empty();
			// loading stock nifty table
			$("#idStockNiftyTable").append("<tr>" +
					"<td>"+name+"</td>" +
					"<td>"+parseFloat(data.masterStockPerformanceTimePeriod.month1Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterStockPerformanceTimePeriod.month3Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterStockPerformanceTimePeriod.month6Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterStockPerformanceTimePeriod.year1Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterStockPerformanceTimePeriod.year3Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterStockPerformanceTimePeriod.year5Value).toFixed(2)+"%</td></tr>" +
					"<tr style='border-bottom:1px solid #767677'>" +
					"<td>"+data.masterNiftyPerformanceTimePeriod.benchMark+"</td>" +
					"<td>"+parseFloat(data.masterNiftyPerformanceTimePeriod.month1Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterNiftyPerformanceTimePeriod.month3Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterNiftyPerformanceTimePeriod.month6Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterNiftyPerformanceTimePeriod.year1Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterNiftyPerformanceTimePeriod.year3Value).toFixed(2)+"%</td>" +
					"<td>"+parseFloat(data.masterNiftyPerformanceTimePeriod.year5Value).toFixed(2)+"%</td></tr>");

			loadEquityOnePagerGraph();

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
}
var performanceValuesMF = [];
var dateMF = [];
var dataDetailsMFRiskMeasureList = [];
var dataListForMarketCapMFGraph = [];
var dataListForAssetAllocationMFGraph = [];
var dataListForSectorHolding = [];
var  mfClickEnter = 0;
function mfClick(isin,name) {
	mfClickEnter = 1;
///	alert("mfClick enter");
	name = decodeURIComponent(name);
	$("#idPortfolioMFPagerHeader").text(name);
	stockMFFlag = 2;
	selectedIsin = isin;
	var startDate = new Date();
	var dd = startDate.getDate();
	var mm = startDate.getMonth() + 1;
	var yyyy = startDate.getFullYear();
	startDate = yyyy + '-' + mm + '-' + (dd-1);
	var endDate;
	if (mm == 1) {// if month is january then previous month will be december
		endDate = (yyyy-1) + '-' + 12 + '-' + (dd);
	} else {
		endDate = (yyyy) + '-' + (mm-1) + '-' + (dd);
	}
  //  alert("mfClick startDate "+startDate);
  //  alert("mfClick endDate "+endDate);
	$.ajax({
		type:'GET',
		async:false,
		//hardcoded to be changed later
		url: REQUEST_URL_PM+'/getClientMFOnePager?ISIN='+isin+'&startDate='+startDate+'&endDate='+endDate,
		datatype:"json",
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function(data) {
		//	alert("hi");
			$('#reportrangekotak span').html(moment().subtract(29, 'days'), moment());
			performanceValuesMF = [];
			dataListForMarketCapMFGraph = [];
			dataListForSectorHolding = [];
			dateMF = [];
			$("#idTBodyMFPager").empty();
			dataListForAssetAllocationMFGraph = [];
			// set all field to transparent
	/*		$('#LV').css({"background-color":"transparent"});
			$('#LB').css({"background-color":"transparent"});
			$('#LG').css({"background-color":"transparent"});
			$('#MG').css({"background-color":"transparent"});
			$('#MB').css({"background-color":"transparent"});
			$('#MV').css({"background-color":"transparent"});
			$('#SG').css({"background-color":"transparent"});
			$('#SV').css({"background-color":"transparent"});
			$('#SB').css({"background-color":"transparent"});*/

			//loading Style Box
			if (data.capRank != null && data.investmentStyle != null) {
				if (data.capRank == "Large Cap" && data.investmentStyle == "Growth") {
					$('#LG').css({"background-color":"#1A5276"});
				} else if (data.capRank == "Large Cap" && data.investmentStyle == "Value") {
					$('#LV').css({"background-color":"#1A5276"});
				} else if (data.capRank == "Large Cap" && data.investmentStyle == "Blend") {
					$('#LB').css({"background-color":"#1A5276"});
				} else if (data.capRank == "Mid Cap" && data.investmentStyle == "Growth") {
					$('#MG').css({"background-color":"#1A5276"});
				} else if (data.capRank == "Mid Cap" && data.investmentStyle == "Value") {
					$('#MV').css({"background-color":"#1A5276"});
				} else if (data.capRank == "Mid Cap" && data.investmentStyle == "Blend") {
					$('#MB').css({"background-color":"#1A5276"});
				} else if (data.capRank == "Small Cap" && data.investmentStyle == "Growth") {
					$('#SG').css({"background-color":"#1A5276"});
				} else if (data.capRank == "Small Cap" && data.investmentStyle == "Value") {
					$('#SV').css({"background-color":"#1A5276"});
				} else if (data.capRank == "Small Cap" && data.investmentStyle == "Blend") {
					$('#SB').css({"background-color":"#1A5276"});
				}
				$("#idStyleBoxHeader").text("Style Box");
			} else {
				$("#idStyleBoxHeader").text("Style Box (No Data Found)");
				$('#LG').css({"background-color":"transparent"});
				$('#LV').css({"background-color":"transparent"});
				$('#LB').css({"background-color":"transparent"});
				$('#MG').css({"background-color":"transparent"});
				$('#MV').css({"background-color":"transparent"});
				$('#MB').css({"background-color":"transparent"});
				$('#SG').css({"background-color":"transparent"});
				$('#SV').css({"background-color":"transparent"});
				$('#SB').css({"background-color":"transparent"});
			}
			var schemeinceptionDate = moment(data.schemeinceptionDate,'YYYY-MM-DD').format('DD-MM-YYYY');
//			alert("Success MF");
			$('#idAumMF').text(data.aum == null ? "N/A" : maskAmountValue(Math.round(parseFloat(data.aum))));
			$('#idBenchmarkMF').text(data.benchmarkIndex);
			$('#idFundManagerMF').text(data.fundManagers);
			var expenseratio = parseFloat(data.expenseRatio).toFixed(2) + "%";
			$('#idExpenseRatioMF').text(data.expenseRatio == null ? "N/A" : expenseratio);
			$('#idInceptionDateMF').text(schemeinceptionDate);
			$('#idSubAssetClassMF').text(data.subAssetClass);
			$('#id52WeekHighMF').text(data.weekHigh52);
			$('#id52WeekLowMF').text(data.weekLow52);
			$('#idMinInvestmentMF').text(parseInt(data.minInvestmentAmount));
			$('#idExitAndLoadPeriodMF').text(data.exitLoadPeriod);
			$('#idPEMF').text(data.p_e == null ? "N/A" : data.p_e);
			$('#idPBMF').text(data.p_b == null ? "N/A" : data.p_b);
			//$('#idPBMF').text((data.pe == null ? data.pb : "N/A");
			// loading graph
			if(data.masterFundPerformancevsIndexList.length > 0) {
				$.each(data.masterFundPerformancevsIndexList,function(index,value){
					performanceValuesMF.push(value.nav);
					dateMF.push(value.date);
				});
			}

			// loading mf benchmark table

			$("#idTBodyMFPager").append("<tr>" +
					"<td>"+name+"</td>" +
					"<td>"+parseFloat(data.masterFundPerformanceTimePeriod.month1Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterFundPerformanceTimePeriod.month3Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterFundPerformanceTimePeriod.month6Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterFundPerformanceTimePeriod.year1Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterFundPerformanceTimePeriod.year3Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterFundPerformanceTimePeriod.year5Value).toFixed(2)+"</td></tr>" +
					"<tr style='border-bottom:1px solid #767677'>" +
					"<td>"+data.masterBenchMarkPerformanceTimePeriod.benchMark+"</td>" +
					"<td>"+parseFloat(data.masterBenchMarkPerformanceTimePeriod.month1Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterBenchMarkPerformanceTimePeriod.month3Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterBenchMarkPerformanceTimePeriod.month6Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterBenchMarkPerformanceTimePeriod.year1Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterBenchMarkPerformanceTimePeriod.year3Value).toFixed(2)+"</td>" +
					"<td>"+parseFloat(data.masterBenchMarkPerformanceTimePeriod.year5Value).toFixed(2)+"</td></tr>");

			// loading marketCapGraph MF
			if (data.equityRatio != null && data.equityRatio > 0.09) {
				var dataObjSub = {};
				dataObjSub["name"] = "Equity";
				dataObjSub["y"] = parseFloat(data.equityRatio);
				dataObjSub["color"] = "#95ceff";
				dataListForMarketCapMFGraph.push(dataObjSub);
			}

			if (data.debtRatio != null && data.debtRatio > 0.09) {
				var dataObjSub1 = {};
				dataObjSub1["name"] = "Debt";
				dataObjSub1["y"] = parseFloat(data.debtRatio);
				dataObjSub1["color"] = "f7a35c";
				dataListForMarketCapMFGraph.push(dataObjSub1);
			}

			if (data.otherRatio > 0.09) {
				var dataObjSub2 = {};
				dataObjSub2["name"] = "Others";
				dataObjSub2["y"] = parseFloat(data.otherRatio);
				dataObjSub2["color"] = "#90ed7d";
				dataListForMarketCapMFGraph.push(dataObjSub2);
			}

			// loading asset allocation Mf Graph
			if (data.largeCap != null && data.largeCap > 0.09) {
				var dataObjSub = {};
				dataObjSub["name"] = "LargeCap";
				dataObjSub["y"] = parseFloat(data.largeCap);
				dataObjSub["color"] = "#95ceff";
				dataListForAssetAllocationMFGraph.push(dataObjSub);
			}

			if (data.midCap != null && data.midCap > 0.09) {
				
				var dataObjSub = {};
				dataObjSub["name"] = "MidCap";
				dataObjSub["y"] = parseFloat(data.midCap);
				dataObjSub["color"] = "#f7a35c";
				dataListForAssetAllocationMFGraph.push(dataObjSub);
			}

			if (data.smallCap != null && data.smallCap > 0.09) {
				
				var dataObjSub = {};
				dataObjSub["name"] = "SmallCap";
				dataObjSub["y"] = parseFloat(data.smallCap);
				dataObjSub["color"] = "#90ed7d";
				dataListForAssetAllocationMFGraph.push(dataObjSub);
				
			}
			if (data.otherCap != null && data.otherCap > 0.09) {
				var dataObjSub = {};
				dataObjSub["name"] = "Others";
				dataObjSub["y"] = parseFloat(data.otherCap);
				dataObjSub["color"] = "#8085d9";
				dataListForAssetAllocationMFGraph.push(dataObjSub);
			}

			if (data.masterMFSectorHoldingWiseDTOList.length > 0.09) {
				$.each(data.masterMFSectorHoldingWiseDTOList,function(index,value){
					var dataObj = [];
					dataObj.push(value.sectorName);
					dataObj.push(value.holding);
					dataListForSectorHolding.push(dataObj);
				});
			}

			loadMFOnePagerGraph();

			// appending risk measures
			$("#idRiskMeasureMFEquityPagerTBody").empty();
		//	console.log("---------------------"+dataDetailsMFRiskMeasureList.length);
			$.each(dataDetailsMFRiskMeasureList,
					function(index, value) {
              //  console.log("start");
				if(value.ISIN == isin)
				{
					//console.log("value.ISIN "+value.ISIN);
					//console.log("isin "+isin);
					for(var key in value.MAP) {
						//console.log("key "+key);
						
						if(value.MAP.hasOwnProperty(key)) {
							//console.log("keysdsa "+key);
						
							//console.log("parseFloat(value.MAP[key]).toFixed(4) "+parseFloat(value.MAP[key]).toFixed(4));
							
							
							$("#idRiskMeasureMFEquityPagerTBody").append("<tr>" +
									"<td>"+key+"</td>" +
									"<td style='text-align:right !important'>"+parseFloat(value.MAP[key]).toFixed(4)+"</td>" +
							"</tr");
							//console.log("---------------------");
						}
					}
					 return false; 
				}
				
			});

			//loading Portfolio details table
			if (data.portfolioDetailsList.length > 0) {
               
				var divContainer = "";
				$("#idPagenationDiv div > table  > tbody > tr > td").empty();
		      	$("#idPagenationDiv").remove();
				$("#idPaginationDiv").html("");
				var dataCount = 0;
				
				var pageCount = 1;
				$.each(data.portfolioDetailsList,function(index,value){
					if (dataCount % 10 == 0) {
						if (dataCount > 0) {
							divContainer = divContainer + '</tbody></table></div>';
						}
						divContainer = divContainer + '<div class="jumbotron page" id="page'+pageCount+'">'+
						'<table width="136%" style="z-index:10 !important;margin-left:-75px;margin-top: 28px;margin-bottom: 20px;" class="kotakportfolio">'+
						'<thead><tr>'+
						'<th style="text-align:left">Holdings</th>'+
						'<th>% of Total</th>'+
						'<th>Sector</th></tr></thead>';
						// appending tbody
						divContainer = divContainer + '<tbody id="IDportfolioDetailsList"><tr>'+
						'<td>'+value.holdings+'</td>'+
						'<td>'+value.percOfPortfolio+'</td>'+
						'<td>'+(value.sector == null ? "N/A":value.sector)+'</td></tr>';
						dataCount ++;
						pageCount ++;
					} else {
						divContainer = divContainer + '<tr>'+
						'<td>'+value.holdings+'</td>'+
						'<td>'+value.percOfPortfolio+'</td>'+
						'<td>'+(value.sector == null ? "N/A":value.sector)+'</td></tr>';
						dataCount ++;
					}
				});
				if (dataCount % 10 > 0) {
					divContainer = divContainer + '</tbody></table></div>';
				}
				divContainer = divContainer +'<ul id="pagination-demo" class="pagination-sm pull-right"></ul>';
				//console.log("divContainer" + divContainer);
				$("#idPaginationDiv").append(divContainer);
				$('#pagination-demo').twbsPagination({
					totalPages: (pageCount-1),
					// the current page that show on start
					startPage: 1,

					// maximum visible pages
					visiblePages: 5,

					initiateStartPageClick: true,

					// template for pagination links
					href: false,

					// variable name in href template for page number
					hrefVariable: '{{number}}',

					// Text labels
					first: 'First',
					prev: 'Previous',
					next: 'Next',
					last: 'Last',

					// carousel-style pagination
					loop: false,

					// callback function
					onPageClick: function (event, page) {
						$('.page-active').removeClass('page-active');
						$('#page'+page).addClass('page-active');
					},

					// pagination Classes
					paginationClass: 'pagination',
					nextClass: 'next',
					prevClass: 'prev',
					lastClass: 'last',
					firstClass: 'first',
					pageClass: 'page',
					activeClass: 'active',
					disabledClass: 'disabled'

				});
				$("#idPortfolioDetailsHeader").text("Portfolio Details");
			} else {
				$("#idPortfolioDetailsHeader").text("Portfolio Details (No Data Found)");
				$("#idPaginationDiv").html("");
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
	});
	
}

var tbodyMain = "";
var currentValSum = 0;
var investmentValSum = 0;
var gainLossSum = 0;
var cagrSum = 0;
var ptpSum = 0;
var directEquityPerc = 0;
var mfPerc = 0;
var interPerc = 0;
var dataListForAssetClassGraph = [];
var dataListForMarketCapGraph = [];
var dataSector = [];
var equityLarge = 0;
var equityMid = 0;
var equitySmall = 0;
var others = 0;
var mfPagerCounter = 1;
var equityPagerCounter = 1;
var tbodyMainModal = "";
var percentOfTotal = 0;
var percTotalSum = 0;
var totalCagr = 0;
var totalCurrentVal = 0;
//calling service layer
$.ajax({
	type:'GET',
	async:false,
	url: REQUEST_URL_PM+'/getClientPortfolioOverviewEquity?clientId='+vClientId+'',
	datatype:"json",
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function(data) {
		var equitySum = 0;
		var internationalSum = 0;
		var mfSum = 0;
		$.each(data.portfolioOverviewList, function (index, value) { 
		 totalCurrentVal = totalCurrentVal + value.currentValue;
		});
		//console.log("totalCurrentVal "+totalCurrentVal);
		$.each(data.portfolioOverviewList,function(index,value){
			var name = value == null ? value.productName : value.bankIssuerName; 
			var type = value == null ? value.productType :  value.productName;
			
			
			/*if(value.bankIssuerName=="")
			{
				name=value.productDesc;
			}*/
			tbodyMain = tbodyMain + "<tr>";
			tbodyMainModal = tbodyMainModal + "<tr>";
			// Page will open for only Stocks and Mutual Fund(MF/ETF/PMS)
			if((value.productName == "Stocks" && value.isin != null) || (value.productName == "ESOPs" && value.isin != null)) {
				equityFlag = 1;
				//var fullNameOfProduct = (value.bankIssuerName == null ? value.productName : (value.bankIssuerName + "-" + value.productName));
				var fullNameOfProduct = (value.bankIssuerName == null ? value.productName : (value.bankIssuerName));
				if(loggedUser == null && loggedClient != null){
					tbodyMain = tbodyMain + "<td id='idMaxinfosys"+equityPagerCounter+"'>"+fullNameOfProduct+"</td>";
					tbodyMainModal = tbodyMainModal + "<td id='idMaxinfosysModal"+equityPagerCounter+"'>"+fullNameOfProduct+"</td>";
				} else {
					tbodyMain = tbodyMain + "<td id='idMaxinfosys"+equityPagerCounter+"'><a onclick=stockClick(\'"+value.isin+"'\,\'"+encodeURIComponent(fullNameOfProduct)+"'\) class='popup'> "+name+"</a></td>";
					tbodyMainModal = tbodyMainModal + "<td id='idMaxinfosysModal"+equityPagerCounter+"'><a onclick=stockClick(\'"+value.isin+"'\,\'"+encodeURIComponent(fullNameOfProduct)+"'\) class='popup'> "+name+"</a></td>";
				}

				equityPagerCounter ++;

			} else if (value.productType == "MF / ETF / PMS") {
				mfFlag = 1;
				//new
				if(value.productName === 'Mutual Funds'){
				 name = value.productDescLong == null ? value.productName : value.productDescLong; 
				}
				//var fullNameOfProduct = (value.bankIssuerName == null ? value.productName : (value.bankIssuerName + "-" + value.productName));
				var fullNameOfProduct = (value.bankIssuerName == null ? value.productName : (value.bankIssuerName));
				if(loggedUser == null && loggedClient != null){
					tbodyMain = tbodyMain + '<td id="idMaxkotak'+mfPagerCounter+'">'+fullNameOfProduct+'</td>';
					tbodyMainModal = tbodyMainModal + '<td id="idMaxkotakModal'+mfPagerCounter+'">'+fullNameOfProduct+'</td>';
				} else {
					tbodyMain = tbodyMain + '<td id="idMaxkotak'+mfPagerCounter+'"><a onclick=mfClick(\"'+value.isin+'"\,\"'+encodeURIComponent(fullNameOfProduct)+'"\) class="popup">'+name+'</a></td>';
					tbodyMainModal = tbodyMainModal + '<td id="idMaxkotakModal'+mfPagerCounter+'"><a onclick=mfClick(\"'+value.isin+'"\,\"'+encodeURIComponent(fullNameOfProduct)+'"\) class="popup"> '+name+'</a></td>';
				
				}
					mfPagerCounter ++;
				var dataDetailsMFRisk={};
				dataDetailsMFRisk['ISIN']=value.isin;
				dataDetailsMFRisk['MAP']= value.riskMeasureMap;
				dataDetailsMFRiskMeasureList.push(dataDetailsMFRisk);
			} else {
				tbodyMain = tbodyMain + "<td>"+name+"</td>";
				tbodyMainModal = tbodyMainModal + "<td>"+name+"</td>";
			}
			
			tbodyMain = tbodyMain + "<td>"+type+"</td>" +
			"<td>"+maskAmountValue(Math.round(value.currentValue))+"</td>" +
			"<td>"+maskAmountValue(Math.round(value.investmentValue))+"</td>" +
			"<td>"+maskAmountValue(Math.round(value.gains))+"</td>" +
			"<td>"+(value.cagr == "N/A" ? "N/A" : (parseFloat(value.cagr).toFixed(2)))+"</td>" +
			"<td>"+(value.ptpReturns == "N/A" ? "N/A" :parseFloat(value.ptpReturns).toFixed(2))+"</td>" +
			"<td>"+(value.lockedInDate == null?"N/A":value.lockedInDate)+"</td>" +
			"</tr>";
			
			tbodyMainModal = tbodyMainModal + "<td>"+type+"</td>" +
			"<td>"+maskAmountValue(Math.round(value.currentValue))+"</td>" +
			"<td>"+maskAmountValue(Math.round(value.investmentValue))+"</td>" +
			"<td>"+maskAmountValue(Math.round(value.gains))+"</td>" +
			"<td>"+(value.cagr == "N/A" ? "N/A" : (parseFloat(value.cagr).toFixed(2)))+"</td>" +
			"<td>"+(value.ptpReturns == "N/A" ? "N/A" :parseFloat(value.ptpReturns).toFixed(2))+"</td>" +
			"<td>"+(value.lockedInDate == null?"N/A":value.lockedInDate)+"</td>" +
			"</tr>";
			
			currentValSum = currentValSum + value.currentValue;
			investmentValSum = investmentValSum + value.investmentValue;
			gainLossSum = gainLossSum + value.gains;
			//cagrSum = cagrSum + (value.cagr == "N/A" ? parseInt(0) : parseFloat(value.cagr));
			// ptpSum = ptpSum + (value.ptpReturns == "N/A" ? parseInt(0) : parseFloat(value.ptpReturns));
		
			//new
			//console.log("value.currentValue "+value.currentValue);
			//console.log("currentValSum "+currentValSum);
			var percentOfTotal = parseFloat((value.currentValue)/totalCurrentVal).toFixed(2);
			//console.log(percentOfTotal +" ===== "+percTotalSum);
			
			if (!isNaN(parseFloat(value.cagr))) {
				//console.log("value.cagr "+value.cagr);
				//console.log("percentOfTotal "+percentOfTotal);
				cagrSum = parseFloat(cagrSum) + parseFloat((value.cagr)*percentOfTotal);
				//console.log("totalCagr "+cagrSum);
			}
			if (!isNaN(parseFloat(value.ptpReturns))) {
				//console.log("value.ptpReturns "+value.ptpReturns);
				//console.log("percentOfTotal "+percentOfTotal);
				ptpSum = parseFloat(ptpSum) + parseFloat((value.ptpReturns)*percentOfTotal);
				//console.log("totalCagr "+cagrSum);
			}
			//=====================
			if (value.productType == "Direct Equity") {
				equitySum = equitySum + value.currentValue;
			}
			if (value.productType == "International Equity") {
				internationalSum = internationalSum + value.currentValue;
			}
			if (value.productType == "MF / ETF / PMS") {
				mfSum = mfSum + value.currentValue;
				if (value.largeCapMFPerc != null) {
					equityLarge = equityLarge + (value.currentValue * (value.largeCapMFPerc/100.0));
				}
				if (value.midCapMFPerc != null) {
					equityMid = equityMid + (value.currentValue *  (value.midCapMFPerc/100.0))
				}
				if (value.smallcapMFPerc != null) {
					equitySmall = equitySmall + (value.currentValue *  (value.smallcapMFPerc/100.0))
				} 
				if (value.otherCapMFPerc != null) {
					others = others + (value.currentValue *  (value.otherCapMFPerc/100.0))
				}

			} else {
				if (value.marketCapId == 1) {
					equityLarge = equityLarge  + value.currentValue ;
				}
				if (value.marketCapId == 2) {
					equitySmall = equitySmall  + value.currentValue;
				}
				if (value.marketCapId == 3) {
					equityMid = equityMid  + value.currentValue;
				}
				if (value.productType == "International Equity") {
					others = others + value.currentValue;
				}
			}
		});
		directEquityPerc = parseFloat((equitySum / currentValSum)*100);
		mfPerc = parseFloat((mfSum / currentValSum)*100);
		interPerc = parseFloat((internationalSum  / currentValSum)*100);

		if (directEquityPerc > 0.09) {
			var dataObjSub = {};
			dataObjSub["name"] = "Direct Equity";
			dataObjSub["y"] = parseFloat(directEquityPerc);
			dataObjSub["color"] = "#95ceff";
			dataListForAssetClassGraph.push(dataObjSub);
		}

		if (interPerc > 0.09) {
			var dataObjSub1 = {};
			dataObjSub1["name"] = "International Equity";
			dataObjSub1["y"] = parseFloat(interPerc);
			dataObjSub1["color"] = "f7a35c";
			dataListForAssetClassGraph.push(dataObjSub1);
		}

		if (mfPerc > 0.09) {
			var dataObjSub2 = {};
			dataObjSub2["name"] = "MF / ETF / PMS";
			dataObjSub2["y"] = parseFloat(mfPerc);
			dataObjSub2["color"] = "#90ed7d";
			dataListForAssetClassGraph.push(dataObjSub2);
		}
		var equityLargePer = parseFloat((equityLarge / currentValSum)*100);
		var equitySmallPer = parseFloat((equitySmall / currentValSum)*100);
		var equityMidPer = parseFloat((equityMid / currentValSum)*100);
		var equityOthersPer = parseFloat((others / currentValSum)*100);

		if (equityLargePer > 0.09) {
			var graphObj = {};
			graphObj["name"] = "Large Cap";
			graphObj["y"] = parseFloat(equityLargePer);
			graphObj["color"] = "#95ceff";
			dataListForMarketCapGraph.push(graphObj);
		}

		if (equitySmallPer > 0.09) {
			var graphObj = {};
			graphObj["name"] = "Small Cap";
			graphObj["y"] = parseFloat(equitySmallPer);
			graphObj["color"] = "#f7a35c";
			dataListForMarketCapGraph.push(graphObj);
		}

		if (equityMidPer > 0.09) {
			var graphObj = {};
			graphObj["name"] = "Mid Cap";
			graphObj["y"] = parseFloat(equityMidPer);
			graphObj["color"] = "#90ed7d";
			dataListForMarketCapGraph.push(graphObj);
		}

		if (equityOthersPer > 0.09) {
			var graphObj = {};
			graphObj["name"] = "Others";
			graphObj["y"] = parseFloat(equityOthersPer);
			graphObj["color"] = "#8085d9";
			dataListForMarketCapGraph.push(graphObj);
		}

		//alert("dataListForAssetClassGraph" + JSON.stringify(dataListForAssetClassGraph));
		tbodyMain = tbodyMain + "<tr class = nonglidtotal>" +
		"<td class = nonglidtotal>Total</td>" +
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(currentValSum))+"</td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(investmentValSum))+"</td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(gainLossSum))+"</td>" +
	/*	"<td class = nonglidtotal>"+parseFloat(cagrSum).toFixed(2)+"</td>" +*/
		"<td class = nonglidtotal>"+parseFloat(cagrSum).toFixed(2)+"</td>" +
		"<td class = nonglidtotal>"+parseFloat(ptpSum).toFixed(2)+"</td>" +
		"<td class = nonglidtotal></td>" +
		"</tr>";
		tbodyMainModal = tbodyMainModal + "<tr class = nonglidtotal>" +
		"<td class = nonglidtotal>Total</td>" +
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(currentValSum))+"</td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(investmentValSum).toFixed(2))+"</td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(gainLossSum))+"</td>" +
		"<td class = nonglidtotal>"+parseFloat(cagrSum).toFixed(2)+"</td>" +
		"<td class = nonglidtotal>"+parseFloat(ptpSum).toFixed(2)+"</td>" +
		"<td class = nonglidtotal></td>" +
		"</tr>";
		$("#idEquityTBody").prepend(tbodyMain);
		$("#idEquityTbodyModal").append(tbodyMainModal);	

		// getting sectorWise
		$.each(data.portfolioOverviewEquitySectorDtoList,function(index,value){
			var percentage = parseFloat(value.exposureInPortfolio);
			if(percentage != 0){
			var sectorObj = [];
			sectorObj.push(value.sectorName);
			sectorObj.push(percentage);
			dataSector.push(sectorObj);
			}
		});

		loadEquityOverviewKnowMoreGraph();
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



var pieColors = (function () {
	var colors = [],
	base = Highcharts.getOptions().colors[0],
	i;

	for (i = 0; i < 10; i += 1) {
		// Start out with a darkened base color (negative brighten), and end
		// up with a much brighter color
		colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
	}
	return colors;
}());
/*************************** Equity KNOW MORE GRAPHS ***********************************/

function loadEquityOverviewKnowMoreGraph() {

	Highcharts.chart('idEquityOverviewByProdTypeGraph', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		legend: {

			verticalAlign: 'middle',
			align: 'right',
			layout: 'vertical'

		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				size: 200,
				allowPointSelect: true,
				cursor: 'pointer',
				// colors: pieColors,
				dataLabels: {
					enabled: true,
					format: '{point.percentage:.1f} %',
					distance: -15,
					filter: {
						property: 'percentage',
						operator: '>',
						value: 4
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Brands',
			innerSize: '50%',
			data: dataListForAssetClassGraph
		}]
	});

	Highcharts.chart('idEquityOverviewMarketCapGraph', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		legend: {

			verticalAlign: 'middle',
			align: 'right',
			layout: 'vertical'

		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				size: 200,
				allowPointSelect: true,
				cursor: 'pointer',
				// colors: pieColors,
				dataLabels: {
					enabled: true,
					format: '{point.percentage:.1f} %',
					distance: -15,
					filter: {
						property: 'percentage',
						operator: '>',
						value: 4
					}
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Brands',
			innerSize: '50%',
			data: dataListForMarketCapGraph
		}]
	});

	Highcharts.chart('idEquityOverviewSectorHoldingGraph', {

		chart: {
			type: 'bar'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			type: 'category',
			labels: {
				rotation: 0,
				style: {
					fontSize: '13px',
					fontFamily: 'Verdana, sans-serif'
				}
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			pointFormat: 'Equity Overview: <b>{point.y:.1f}</b>'
		},
		series: [{
			name: 'Sectors',
			data: dataSector,
			dataLabels: {
				enabled: true,
				rotation:360,
				color: '#FFFFFF',
				align: 'right',
				format: '{point.y:.1f}', // one decimal
				y: 4, // 10 pixels down from the top
				style: {
					fontSize: '11px',
					fontFamily: 'Verdana, sans-serif'
				}
			}
		}]
	});
}

/**********************************END OF Equity Overview KNOW MORE GRAPH **********************/

/**********************************Equity One Pager Graph *********************************/
function loadEquityOnePagerGraph() {

	if (dateStock.length > 0) {
		Highcharts.chart('idEquityOnePagerGrowthGraph', {
			chart: {
				type: 'line'
			},
			title: {
				text: ''
			},
			subtitle: {
				text: ''
			},
			//gourab
			xAxis: {
				categories: dateStock,
				/*labels:
					{	//you can add datestock style here
						style:{
			                color: "#f00",
			                
			                
						}
					}*/
				

			},
			yAxis: {
				title: {
					text: ''
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
				name: 'Performance',
				data: performanceValuesStock,
				color:"#f7a35c"
			}]
		});
		$("#idPerformHeaderEquity").text("");
	} else {
		$("#idPerformHeaderEquity").text("No Data found between these two dates");
		if (!($('#idPerformHeaderEquity').highcharts() == undefined)) {
			$('#idPerformHeaderEquity').highcharts().destroy();
		}

		//$("#reportrange").hide();
	}

}
/*****************************END OF Equity One Pager Graph *********************************/

/*****************************Mutual Fund Equity Type One Pager Graph **********************/
function loadMFOnePagerGraph() {
//	console.log("benchmarkValuesMF" + benchmarkValuesMF);
//	console.log("performanceValuesMF" + performanceValuesMF);
	if (dateMF.length > 0) {
		Highcharts.chart('idMFOnePagerGrowthGraph', {
			chart: {
				type: 'line',
		        

				
			},
			title: {
				text: ''
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				categories: dateMF
			},
			yAxis: {
				title: {
					text: ''
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
			series: [
				{
					name: 'Performance',
					data: performanceValuesMF,
					color:"#f7a35c"
				}
				]
		});
		$("#idPerformMF").text("");
	} else {
		$("#idPerformMF").text("No Data found between these two dates");
		if (!($('#idMFOnePagerGrowthGraph').highcharts() == undefined)) {
			$('#idMFOnePagerGrowthGraph').highcharts().destroy();
		}

		//$("#reportrangekotak").hide();
	}
	if (dataListForMarketCapMFGraph.length > 0) {
		Highcharts.chart('idMFOnePagerMarketCapGraph', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
					
			},
			legend: {

				verticalAlign: 'middle',
				align: 'right',
				layout: 'vertical'

			},
			title: {
				text: ''
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					size:'100%',
					allowPointSelect: true,
					cursor: 'pointer',
					colors: pieColors,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						distance: -15,
						filter: {
							property: 'percentage',
							operator: '>',
							value: 4
						}
					},
					showInLegend: true
				}
			},
			series: [{
				name: 'Market Cap',
				data: dataListForMarketCapMFGraph
			}]
		});
		$("#idAssetAllocationHeader").text ("Asset Allocation");
	} else {
		$("#idAssetAllocationHeader").text ("Asset Allocation (No Data Found)");
		if (!($('#idMFOnePagerMarketCapGraph').highcharts() == undefined)) {
			$('#idMFOnePagerMarketCapGraph').highcharts().destroy();
		}
	}
	if (dataListForAssetAllocationMFGraph.length > 0) {
		Highcharts.chart('idMFOnePagerAssetAllocationGraph', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				
			},
			 
			legend: {

				verticalAlign: 'middle',
				align: 'left',
				layout: 'vertical'

			},
			title: {
				text: ''
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					// colors: pieColors,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						distance: -15,
						filter: {
							property: 'percentage',
							operator: '>',
							value: 4
						}
					},
					showInLegend: true
				}
			},
			series: [{
				name: 'Percentage',
				innerSize: '50%',
				data: dataListForAssetAllocationMFGraph
			}]
		});
		$("#idMarketCapHeader").text("Market Capitalization");
	} else {
		$("#idMarketCapHeader").text("Market Capitalization (No Data Found)");
		if (!($('#idMFOnePagerAssetAllocationGraph').highcharts() == undefined)) {
			$('#idMFOnePagerAssetAllocationGraph').highcharts().destroy();
		}
	}
	if (dataListForSectorHolding.length > 0) {
		Highcharts.chart('idMFOnePagerSectorHoldingGraph', {

			chart: {
				type: 'bar'

			},
			title: {
				text: ''
			},
			labels: {
				overflow: 'justify'
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				type: 'category',
				labels: {
					rotation: 0,
					style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					}
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: ''
				}
			},
			legend: {
				enabled: false
			},
			tooltip: {
				pointFormat: 'Equity Overview: <b>{point.y:.1f}</b>'
			},
			series: [{
				name: 'Sectors',
				data: dataListForSectorHolding,
				dataLabels: {
					enabled: true,
					rotation:360,
					color: '#FFFFFF',
					align: 'right',
					format: '{point.y:.1f}', // one decimal
					y: 4, // 10 pixels down from the top
					style: {
						fontSize: '11px',
						fontFamily: 'Verdana, sans-serif'
					}
				}
			}]
		});
		$("#idSectorHoldingHeader").text("Top 10 Sector Holdings");
	} else {
		$("#idSectorHoldingHeader").text("Top 10 Sector Holdings (No Data Found)");
		if (!($('#idMFOnePagerSectorHoldingGraph').highcharts() == undefined)) {
			$('#idMFOnePagerSectorHoldingGraph').highcharts().destroy();
		}

	}

}

/*****************************END OF Mutual Fund Equity Type One Pager Graph **************/

jQuery.fn.popupwindow = function(p)

{


	var profiles = p || {};

	return this.each(function(index){
		var settings, parameters, mysettings, b, a, winObj;

		// for overrideing the default settings
		mysettings = (jQuery(this).attr("rel") || "").split(",");


		settings = {
				height:600, // sets the height in pixels of the window.
				width:600, // sets the width in pixels of the window.
				toolbar:0, // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
				scrollbars:0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
				status:0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
				resizable:1, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
				left:0, // left position when the window appears.
				top:0, // top position when the window appears.
				center:0, // should we center the window? {1 (YES) or 0 (NO)}. overrides top and left
				createnew:1, // should we create a new window for each occurance {1 (YES) or 0 (NO)}.
				location:0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
				menubar:0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
				onUnload:null // function to call when the window is closed
		};

		// if mysettings length is 1 and not a value pair then assume it is a profile declaration
		// and see if the profile settings exists

		if(mysettings.length == 1 && mysettings[0].split(":").length == 1)
		{
			a = mysettings[0];
			// see if a profile has been defined
			if(typeof profiles[a] != "undefined")
			{
				settings = jQuery.extend(settings, profiles[a]);
			}
		}
		else
		{
			// overrides the settings with parameter passed in using the rel tag.
			for(var i=0; i < mysettings.length; i++)
			{
				b = mysettings[i].split(":");
				if(typeof settings[b[0]] != "undefined" && b.length == 2)
				{
					settings[b[0]] = b[1];
				}
			}
		}

		// center the window
		if (settings.center == 1)
		{
			settings.top = (screen.height-(settings.height + 110))/2;
			settings.left = (screen.width-settings.width)/2;
		}

		parameters = "location=" + settings.location + ",menubar=" + settings.menubar + ",height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars  + ",status=" + settings.status + ",resizable=" + settings.resizable + ",left=" + settings.left  + ",screenX=" + settings.left + ",top=" + settings.top  + ",screenY=" + settings.top;

		jQuery(this).bind("click", function(){
			var name = settings.createnew ? "PopUpWindow" + index : "PopUpWindow";
			winObj = window.open(this.href, name, parameters);

			if (settings.onUnload) {
				// Incremental check for window status
				// Attaching directly to window.onunlaod event causes invoke when document within window is reloaded
				// (i.e. an inner refresh)
				unloadInterval = setInterval(function() {
					if (!winObj || winObj.closed) {
						clearInterval(unloadInterval);	
						settings.onUnload.call($(this));
					}
				},500);
			}

			winObj.focus();

			return false;
		});
	});

};
var profiles =
{

		window800:
		{
			height:800,
			width:1250,
			status:1
		}

};

function unloadcallback(){
	//alert("unloaded");
};


$(function()
		{
	$(".popupwindow").popupwindow(profiles);
		});	



var mfModal = 0;
var equityModal = 0;




var modal = document.getElementById("idpopcurrentaa");

//Get the button that opens the modal
var btn = document.getElementById("idMaxcurrentaa");

//Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//When the user clicks the button, open the modal 
btn.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
if (mfFlag == 1) {
	for (i = 1; i < mfPagerCounter; i ++){
		var modal2 = document.getElementById("idpopkotak");

		//Get the button that opens the modal
		var btn2 = document.getElementById("idMaxkotakModal"+i);

		//Get the <span> element that closes the modal
		var span2 = document.getElementsByClassName("close2")[0];

		//When the user clicks the button, open the modal 
		btn2.onclick = function() {
			$('#reportrangekotak span').html(
					moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - '
							+ moment().format('MMMM D, YYYY'));
			 var text = $('#reportrangekotak span').text();
		
			$(".onpopupscroller").css("overflow","hidden");
			modal2.style.display = "block";
			mfModal = 1;
		}

		//When the user clicks on <span> (x), close the modal
		span2.onclick = function() {
			$(".onpopupscroller").css("overflow","visible");
			modal2.style.display = "none";
			mfModal = 0;
		}

		//When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal2) {
				modal2.style.display = "none";
				mfModal = 0;
			}
		}
	}
}


if (mfFlag == 1) {
	for (i = 1; i < mfPagerCounter; i ++){
		var modal4 = document.getElementById("idpopkotak");

		//Get the button that opens the modal
		var btn4 = document.getElementById("idMaxkotak"+i);

		//Get the <span> element that closes the modal
		var span4 = document.getElementsByClassName("close4")[0];

		//When the user clicks the button, open the modal 
		btn4.onclick = function() {
			$('#reportrangekotak span').html(
					moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - '
							+ moment().format('MMMM D, YYYY'));
			 var text = $('#reportrangekotak span').text();
		
			$(".onpopupscroller").css("overflow","hidden");
			modal4.style.display = "block";
			mfModal = 1;
		}

		//When the user clicks on <span> (x), close the modal
		span4.onclick = function() {
			$(".onpopupscroller").css("overflow","visible");
			modal4.style.display = "none";
			mfModal = 0;
		}

		//When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal4) {
				modal4.style.display = "none";
				mfModal = 0;
			}
		}
	}
}


if (equityFlag == 1) {
	for (i=1 ; i< equityPagerCounter; i++) {
		var modal5 = document.getElementById("idpopinfosys");

		//Get the button that opens the modal
		var btn5 = document.getElementById("idMaxinfosysModal"+i);

		//Get the <span> element that closes the modal
		var span5 = document.getElementsByClassName("close5")[0];

		//When the user clicks the button, open the modal 
		btn5.onclick = function() {
			$('#reportrange span').html(
					moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - '
							+ moment().format('MMMM D, YYYY'));
			  var text = $('#reportrange span').text();
			$(".onpopupscroller").css("overflow","hidden");
			modal5.style.display = "block";
			equityModal = 1;
		}

		//When the user clicks on <span> (x), close the modal
		span5.onclick = function() {
			$(".onpopupscroller").css("overflow","visible");
			modal5.style.display = "none";
			equityModal = 0;
		}

		//When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal5) {
				modal5.style.display = "none";
				equityModal = 0;
			}
		}
	}
}

if (equityFlag == 1) {
	for (i=1 ; i< equityPagerCounter; i++) {

		var modal3 = document.getElementById("idpopinfosys");

		//Get the button that opens the modal
		var btn3 = document.getElementById("idMaxinfosys"+i);

		//Get the <span> element that closes the modal
		var span3 = document.getElementsByClassName("close3")[0];

		//When the user clicks the button, open the modal 
		btn3.onclick = function() {
			$('#reportrange span').html(
					moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - '
							+ moment().format('MMMM D, YYYY'));
			 var text = $('#reportrange span').text();
			 
			$(".onpopupscroller").css("overflow","hidden");
			modal3.style.display = "block";
			equityModal = 1;
		}

		//When the user clicks on <span> (x), close the modal
		span3.onclick = function() {
			$(".onpopupscroller").css("overflow","visible");
			modal3.style.display = "none";
			equityModal = 0;
		}

		//When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal3) {
				modal3.style.display = "none";
				equityModal = 0;
			}
		}

	}


}




var modal1 = document.getElementById("idpopcurrentaa");

//Get the button that opens the modal
var btn1 = document.getElementById("equitymore");

//Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

//When the user clicks the button, open the modal 
btn1.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal1.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span1.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal1.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal1) {
		modal1.style.display = "none";
	}
}


$(function() {

	var start = moment().subtract(29, 'days');
	var end = moment();

	function cb(start, end) {
		$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
	}

	$('#reportrange').daterangepicker({
		startDate: start,
		endDate: end,
        locale: {
            format: 'DD/MM/YYYY'
        },
		ranges: {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		}
	}, cb);

	cb(start, end);

});



Highcharts.chart('performance', {
	chart: {
		type: 'spline'
	},
	title: {
		text: 'Snow depth at Vikjafjellet, Norway'
	},
	subtitle: {
		text: 'Irregular time data in Highcharts JS'
	},
	xAxis: {
		type: 'datetime',
		dateTimeLabelFormats: { // don't display the dummy year
			month: '%e. %b',
			year: '%b'
		},
		title: {
			text: 'Date'
		}
	},
	yAxis: {
		title: {
			text: 'Snow depth (m)'
		},
		min: 0
	},
	tooltip: {
		headerFormat: '<b>{series.name}</b><br>',
		pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
	},

	plotOptions: {
		spline: {
			marker: {
				enabled: true
			}
		}
	},

	series: [{
		name: 'Winter 2012-2013',
		// Define the data points. All series have a dummy year
		// of 1970/71 in order to be compared on the same x axis. Note
		// that in JavaScript, months start at 0 for January, 1 for February etc.
		data: [
			[Date.UTC(1970, 9, 21), 0],
			[Date.UTC(1970, 10, 4), 0.28],
			[Date.UTC(1970, 10, 9), 0.25],
			[Date.UTC(1970, 10, 27), 0.2],
			[Date.UTC(1970, 11, 2), 0.28],
			[Date.UTC(1970, 11, 26), 0.28],
			[Date.UTC(1970, 11, 29), 0.47],
			[Date.UTC(1971, 0, 11), 0.79],
			[Date.UTC(1971, 0, 26), 0.72],
			[Date.UTC(1971, 1, 3), 1.02],
			[Date.UTC(1971, 1, 11), 1.12],
			[Date.UTC(1971, 1, 25), 1.2],
			[Date.UTC(1971, 2, 11), 1.18],
			[Date.UTC(1971, 3, 11), 1.19],
			[Date.UTC(1971, 4, 1), 1.85],
			[Date.UTC(1971, 4, 5), 2.22],
			[Date.UTC(1971, 4, 19), 1.15],
			[Date.UTC(1971, 5, 3), 0]
			]
	}, {
		name: 'Winter 2013-2014',
		data: [
			[Date.UTC(1970, 9, 29), 0],
			[Date.UTC(1970, 10, 9), 0.4],
			[Date.UTC(1970, 11, 1), 0.25],
			[Date.UTC(1971, 0, 1), 1.66],
			[Date.UTC(1971, 0, 10), 1.8],
			[Date.UTC(1971, 1, 19), 1.76],
			[Date.UTC(1971, 2, 25), 2.62],
			[Date.UTC(1971, 3, 19), 2.41],
			[Date.UTC(1971, 3, 30), 2.05],
			[Date.UTC(1971, 4, 14), 1.7],
			[Date.UTC(1971, 4, 24), 1.1],
			[Date.UTC(1971, 5, 10), 0]
			]
	}, {
		name: 'Winter 2014-2015',
		data: [
			[Date.UTC(1970, 10, 25), 0],
			[Date.UTC(1970, 11, 6), 0.25],
			[Date.UTC(1970, 11, 20), 1.41],
			[Date.UTC(1970, 11, 25), 1.64],
			[Date.UTC(1971, 0, 4), 1.6],
			[Date.UTC(1971, 0, 17), 2.55],
			[Date.UTC(1971, 0, 24), 2.62],
			[Date.UTC(1971, 1, 4), 2.5],
			[Date.UTC(1971, 1, 14), 2.42],
			[Date.UTC(1971, 2, 6), 2.74],
			[Date.UTC(1971, 2, 14), 2.62],
			[Date.UTC(1971, 2, 24), 2.6],
			[Date.UTC(1971, 3, 2), 2.81],
			[Date.UTC(1971, 3, 12), 2.63],
			[Date.UTC(1971, 3, 28), 2.77],
			[Date.UTC(1971, 4, 5), 2.68],
			[Date.UTC(1971, 4, 10), 2.56],
			[Date.UTC(1971, 4, 15), 2.39],
			[Date.UTC(1971, 4, 20), 2.3],
			[Date.UTC(1971, 5, 5), 2],
			[Date.UTC(1971, 5, 10), 1.85],
			[Date.UTC(1971, 5, 15), 1.49],
			[Date.UTC(1971, 5, 23), 1.08]
			]
	}]
});

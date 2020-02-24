$(document).ready(function () {
	$("div.daterangepicker").remove();

	var jssor_21_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


		];

	var jssor_21_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_21_SlideshowTransitions,
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

	var jssor_21_slider = new $JssorSlider$("jssor_21", jssor_21_options);

	var recompavright = $('.jssort21 div:nth-child(2) div:nth-child(3) div');
	var recompavleft = $('.jssort21 div:nth-child(2) div:nth-child(2) div');

	$(".Incomeright").click(function(){
		if(recompavright.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioEquity.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Portfolio Equity");
			$(".pmassetallocation").removeClass("activeitem");
			$(".pmportfolioequity").addClass("activeitem");

		};
	});

	$(".Incomeleft").click(function(){
		if(recompavleft.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioRatio.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Ratios");
			$(".pmassetallocation").removeClass("activeitem");
			$(".pmratios").addClass("activeitem");




		};
	});

	var tbodyMain = "";
	var tbodyBenchmark = "";
	var tbodyAllocation = "";
	var dataListForAssetClassGraph = [];
	var dataListForAssetSubClassGraph = [];
	var dataListForCurrentVSRecoBarGraph = [];
	var dataSubListForCurrentVSRecoBarGraph = [];
	var colorArray = [];
	colorArray.push('#95ceff');
	colorArray.push('#f7a35c');
	colorArray.push('#90ed7d');
	colorArray.push('#8085d9');
	colorArray.push('#f15c80');
	colorArray.push('#727276');
	colorArray.push('#5adedc');
	colorArray.push('#9164aa');
	colorArray.push('#cdaa5f');
	colorArray.push('#558769');

	var totalCurrentAllo = 0.0;
	var totalRecoAllo = 0.0;
	//calling service layer
	$.ajax({
		type:'GET',
		async:false,
		url: REQUEST_URL_PM+'/getClientPortfolioSubAssetReview?clientId='+vClientId+'',
		datatype:"json",
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function(data) {
			var colorIndex = 0;
			var colorSubIndex = 0;
			var totalCagrOfClass = 0.0
			$.each(data.portfolioAssetListMap,function(index,value){
				console.log("ddddddd ");
				// portfolio list map index contains the respective class name
				var currentValOfClass = 0.0;
				var investmentValOfClass = 0.0;
				var gainLossOfClass = 0.0;
				var cagrOfClass = 0.0;
				var currentAlloClass = 0.0;
				var recoAlloClass = 0.0;
				console.log("cagrOfClass "+cagrOfClass);
				$.each(value, function (index1,value1) {
					console.log("aaaaa ");
					currentValOfClass = currentValOfClass + value1.currentValue;
					investmentValOfClass = investmentValOfClass + value1.investmentValue;
					gainLossOfClass = gainLossOfClass + value1.profitLoss;
					//cagrOfClass = cagrOfClass + value1.cagr_xirr;
					currentAlloClass = currentAlloClass + (value1.portFoliototalPercentage == null ? 0 : value1.portFoliototalPercentage);
					recoAlloClass = recoAlloClass + (value1.recomentTotalPercentage == null ? 0 :value1.recomentTotalPercentage);
				});
				$.each(value, function (index1,value1) {
					console.log("bbbbbbb ");
					console.log("value1.currentValue "+value1.currentValue);
					console.log("currentValOfClass "+currentValOfClass);
					var percentOfTotal = parseFloat((value1.currentValue)/currentValOfClass).toFixed(2);
					console.log("percentOfTotal "+percentOfTotal);
					if (!isNaN(parseFloat(value1.cagr_xirr))) {
						console.log("parseFloat((value1.cagr_xirr)*percentOfTotal) "+parseFloat((value1.cagr_xirr)*percentOfTotal));
					    console.log("cagrOfClass "+cagrOfClass);
						cagrOfClass = parseFloat(cagrOfClass) + parseFloat((value1.cagr_xirr)*percentOfTotal);
						console.log("cagrOfClass "+cagrOfClass);
						
						
					}
				});
				console.log("totalCagrOfClass "+totalCagrOfClass);
				totalCagrOfClass = totalCagrOfClass + cagrOfClass;
				console.log("totalCagrOfClass "+totalCagrOfClass);
				console.log("ccccccc ");
				if (currentValOfClass > 0) {
					console.log("cagrOfClass show "+cagrOfClass);
					tbodyMain = tbodyMain + "<tr class='bgcolorlightblue'>" +
					"<td>"+index+" Total</td>" +
					"<td>"+maskAmountValue(Math.round(currentValOfClass))+"</td>" +
					"<td>"+maskAmountValue(Math.round(investmentValOfClass))+"</td>" +
					"<td>"+maskAmountValue(Math.round(gainLossOfClass))+"</td>" +
					"<td>"+parseFloat(cagrOfClass).toFixed(2)+"</td>" +
					"</tr>";
				}
				
				tbodyAllocation = tbodyAllocation + "<tr class='bgcolorlightblue'>" +
				"<td>"+index+" Total</td>" +
				"<td>"+parseFloat(currentAlloClass).toFixed(2)+"</td>" +
				"<td>"+parseFloat(recoAlloClass).toFixed(2)+"</td>" +
				"</tr>";
				totalCurrentAllo = totalCurrentAllo + currentAlloClass;
				totalRecoAllo = totalRecoAllo + recoAlloClass;
				// preparing values for loading graph			
				var currentAlloPerc = parseFloat((currentValOfClass / data.currentValue) * 100).toFixed(2);
				var dataObj = {};
				if(parseFloat(currentAlloPerc) > 0.09){
				dataObj["name"] = index;
				dataObj["y"] = parseFloat(currentAlloPerc);
				dataObj["color"] = colorArray[colorIndex];
				dataListForAssetClassGraph.push(dataObj);
				}
				if (parseFloat(currentAlloPerc) > 0.09 || parseFloat(recoAlloClass) > 0.09 ) {
					
					var dataObjAllo = {}
					var yVal = [];
					yVal.push(parseFloat(currentAlloPerc));
					if(recoAlloClass > 0.09){
					yVal.push(parseFloat(recoAlloClass));
					}
					dataObjAllo["name"] = index;
					dataObjAllo["data"] = yVal;
					dataObjAllo["color"] = colorArray[colorIndex];
					dataListForCurrentVSRecoBarGraph.push(dataObjAllo);
					
				}
				

				


				tbodyBenchmark = tbodyBenchmark + "<tr class='bgcolorlightblue'>" +
				"<td>"+index+"</td>" +
				"<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
				$.each(value, function (index1,value1) {
					if (value1.currentValue > 0) {
						tbodyMain = tbodyMain + "<tr style='background-color:white'>" +
						"<td>"+value1.investmentSubAssetClass+"</td>" +
						"<td>"+maskAmountValue(Math.round(value1.currentValue))+"</td>" +
						"<td>"+maskAmountValue(Math.round(value1.investmentValue))+"</td>" +
						"<td>"+maskAmountValue(Math.round(value1.profitLoss))+"</td>" +
						"<td>"+(value1.cagr_xirr==null?"0.00":parseFloat(value1.cagr_xirr).toFixed(2))+"</td>" +
						"</tr>";
					}
					

					tbodyAllocation = tbodyAllocation + "<tr style='background-color:white'>" +
					"<td>"+value1.investmentSubAssetClass+"</td>" +
					"<td>"+parseFloat((value1.portFoliototalPercentage == null ? 0 :value1.portFoliototalPercentage)).toFixed(2)+"</td>" +
					"<td>"+parseFloat((value1.recomentTotalPercentage == null ? 0 : value1.recomentTotalPercentage)).toFixed(2)+"</td>" +
					"</tr>";


					if (value1.portSubAssetBechMark != null) {
						tbodyBenchmark = tbodyBenchmark + "<tr style='background-color:white'>" +
						"<td>"+value1.investmentSubAssetClass+"</td>" +
						"<td>"+(value1.portSubAssetBechMark.benchMark == null ? "N/A" :value1.portSubAssetBechMark.benchMark)+"</td>" +
						"<td>"+(value1.cagr_xirr == null ? "0.00": parseFloat(value1.cagr_xirr).toFixed(2))+"</td>" +
						"<td>"+(value1.portSubAssetBechMark.month1Value == null ? "N/A" :parseFloat(value1.portSubAssetBechMark.month1Value).toFixed(2))+"</td>" +
						"<td>"+(value1.portSubAssetBechMark.month3Value == null ? "N/A" :parseFloat(value1.portSubAssetBechMark.month3Value).toFixed(2))+"</td>" +
						"<td>"+(value1.portSubAssetBechMark.month6Value == null ? "N/A" :parseFloat(value1.portSubAssetBechMark.month6Value).toFixed(2))+"</td>" +
						"<td>"+(value1.portSubAssetBechMark.year1Value == null ? "N/A" :parseFloat(value1.portSubAssetBechMark.year1Value).toFixed(2))+"</td>" +
						"<td>"+(value1.portSubAssetBechMark.year3Value == null ? "N/A" :parseFloat(value1.portSubAssetBechMark.year3Value).toFixed(2))+"</td>" +
						"<td>"+(value1.portSubAssetBechMark.year5Value == null ? "N/A" :parseFloat(value1.portSubAssetBechMark.year5Value).toFixed(2))+"</td>" +
						"<td>"+(value1.portSubAssetBechMark.riskStdDev == null ? "N/A" :parseFloat(value1.portSubAssetBechMark.riskStdDev).toFixed(2))+"</td>" +
						"</tr>";
					}
					
					var currentSubAlloPerc = parseFloat((value1.currentValue / data.currentValue) * 100).toFixed(2);
					if(parseFloat(currentSubAlloPerc) > 0.09) {
						var dataObjSub = {};
						dataObjSub["name"] = value1.investmentSubAssetClass;
						dataObjSub["y"] = (parseFloat(value1.currentValue));
						dataObjSub["color"] = colorArray[colorSubIndex];
						dataListForAssetSubClassGraph.push(dataObjSub);
						
						
					}
					

					if (value1.portFoliototalPercentage > 0.09 || value1.recomentTotalPercentage > 0.09) {
						var dataObjAlloSub = {}
						var yValSub = [];
						yValSub.push(parseFloat(value1.portFoliototalPercentage));
						if(value1.recomentTotalPercentage > 0.09){
						yValSub.push(parseFloat(value1.recomentTotalPercentage));
						}
						dataObjAlloSub["name"] = value1.investmentSubAssetClass;
						dataObjAlloSub["data"] = yValSub;
						dataObjAlloSub["color"] = colorArray[colorSubIndex];
						dataSubListForCurrentVSRecoBarGraph.push(dataObjAlloSub);
						
					}

					colorSubIndex ++;



				});
				colorIndex ++;
			});
			// appending the total of all classes
			tbodyMain = tbodyMain + "<tr class='nonglidtotal'>" +
			"<td class='nonglidtotal'>"+data.investmentAssetClass+"</td>" +
			"<td class='nonglidtotal'>"+maskAmountValue(Math.round(data.currentValue))+"</td>" +
			"<td class='nonglidtotal'>"+maskAmountValue(Math.round(data.investmentValue))+"</td>" +
			"<td class='nonglidtotal'>"+maskAmountValue(Math.round(data.profitLoss))+"</td>" +
			/*"<td class='nonglidtotal'>"+parseFloat(data.cagr_xirr).toFixed(2)+"</td>" +*/
			"<td class='nonglidtotal'>"+parseFloat(totalCagrOfClass).toFixed(2)+"</td>" +
			
			"</tr>";

			tbodyAllocation = tbodyAllocation + "<tr class='nonglidtotal'>" +
			"<td class='nonglidtotal'><b>Total</b></td>" +
			"<td class='nonglidtotal'><b>"+parseFloat(totalCurrentAllo).toFixed(2)+"</b></td>" +
			"<td class='nonglidtotal'><b>"+parseFloat(totalRecoAllo).toFixed(2)+"</b></td>" +
			"</tr>";

			$("#idAssetAllocationTbodyMain").prepend(tbodyMain);
			$("#idAssetAllocationTbodyModal").append(tbodyMain);
			$("#idAllocationTBody").prepend(tbodyAllocation);
			$("#idAllocationTBodyModal").append(tbodyAllocation);
			$("#idBenchmarkTBody").append(tbodyBenchmark);
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
	//=============================
	
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_PM+'/getClientPortfolioAssetReview?clientId='+vClientId+'&specificRequermentStat=%22overview%22',
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {

			$.each(data, function (index, assetAllocation) { 
				if(assetAllocation.investmentAssetClass == "Total"){
					
					$("#expPortfolioReturnPerct").append((assetAllocation.cagr_xirr == null || isNaN(assetAllocation.cagr_xirr)? 0.00 : parseFloat(assetAllocation.cagr_xirr).toFixed(2)));
					$("#expPortfolioReturnPerctModal").append((assetAllocation.cagr_xirr == null || isNaN(assetAllocation.cagr_xirr)? 0.00 : parseFloat(assetAllocation.cagr_xirr).toFixed(2)));
				
					$("#recomPortfolioReturnPerct").append(parseFloat(assetAllocation.totalExpectedRecommed==null?0:assetAllocation.totalExpectedRecommed).toFixed(2));
					$("#recomPortfolioReturnPerctModal").append(parseFloat(assetAllocation.totalExpectedRecommed).toFixed(2));
				
					$("#expPortfolioReturnCurrentRisk").append((assetAllocation.totalRiskExpectedCurrent == null || isNaN(assetAllocation.totalRiskExpectedCurrent)? 0.00 : parseFloat(assetAllocation.totalRiskExpectedCurrent).toFixed(2)));
					$("#expPortfolioReturnCurrentRiskModal").append((assetAllocation.totalRiskExpectedCurrent == null || isNaN(assetAllocation.totalRiskExpectedCurrent)? 0.00 : parseFloat(assetAllocation.totalRiskExpectedCurrent).toFixed(2)));
					
					$("#recomPortfolioReturnREcommendRisk").append((assetAllocation.totalRiskExpectedRecommed == null || isNaN(assetAllocation.totalRiskExpectedRecommed)? 0.00 : parseFloat(assetAllocation.totalRiskExpectedRecommed).toFixed(2)));
					$("#recomPortfolioReturnREcommendRiskModal").append((assetAllocation.totalRiskExpectedRecommed == null || isNaN(assetAllocation.totalRiskExpectedRecommed)? 0.00 : parseFloat(assetAllocation.totalRiskExpectedRecommed).toFixed(2)));
					
			}	
			});

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

	
	//===========================
	Highcharts.chart('idcaa', {
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

	//alert("Sub Asset" + JSON.stringify(dataListForAssetSubClassGraph));
	Highcharts.chart('idsubasset', {
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
			data: dataListForAssetSubClassGraph
		}]
	});

	Highcharts.chart('idcurrentsubassets', {
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
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				}
			}
		},
		series: [{
			name: 'Sub Assets',
			colorByPoint: true,
			data: [{
				name: 'Cash/Liquid',
				y: 10,
				color:'#95ceff'
			},


			{
				name: 'Ultra Short Term Debt',
				y: 10,
				color:'#f7a35c'
			}, {
				name: 'Short Term Debt',
				y: 10,
				color:'#90ed7d',
				sliced: true,
				selected: true
			}, {
				name: 'Long Term Debt',
				y: 10,
				color:'#8085d9'
			},{
				name: 'Equity Large Cap',
				y:10,
				color:'#f15c80'
			}, {
				name: 'Equity Mid and Small Cap',
				y: 10,
				color:'#727276'

			},			
			{
				name: 'Equity International',
				y: 10,
				color:'#5adedc'
			}
			,			
			{
				name: 'Alternatives - Precious Metals',
				y: 10,
				color:'#9164aa'
			}
			,			
			{
				name: 'Alternatives - Real Estate',
				y: 10,
				color:'#cdaa5f'
			}
			,			
			{
				name: 'Alternatives -Others',
				y: 10,
				color:'#558769'
			}

			]
		}]
	});

	Highcharts.chart('idcurrentsubassetspop', {
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
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				}
			}
		},
		series: [{
			name: 'Sub Assets',
			colorByPoint: true,
			data: [{
				name: 'Cash/Liquid',
				y: 10,
				color:'#95ceff'
			},


			{
				name: 'Ultra Short Term Debt',
				y: 10,
				color:'#f7a35c'
			}, {
				name: 'Short Term Debt',
				y: 10,
				color:'#90ed7d',
				sliced: true,
				selected: true
			}, {
				name: 'Long Term Debt',
				y: 10,
				color:'#8085d9'
			},{
				name: 'Equity Large Cap',
				y:10,
				color:'#f15c80'
			}, {
				name: 'Equity Mid and Small Cap',
				y: 10,
				color:'#727276'

			},			
			{
				name: 'Equity International',
				y: 10,
				color:'#5adedc'
			}
			,			
			{
				name: 'Alternatives - Precious Metals',
				y: 10,
				color:'#9164aa'
			}
			,			
			{
				name: 'Alternatives - Real Estate',
				y: 10,
				color:'#cdaa5f'
			}
			,			
			{
				name: 'Alternatives -Others',
				y: 10,
				color:'#558769'
			}

			]
		}]
	});

	/*Highcharts.chart('idassets', {
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
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },

        series: [{
            name: 'Assets',
            colorByPoint: true,
            data: [{
                name: 'Cash/Liquid',
                y: 10,
				color:'#95ceff'
            },


			{
                name: 'Fixed Income',
                y: 10,
				color:'#f7a35c'
            }, {
                name: 'Equity',
                y: 10,
				color:'#90ed7d',
                sliced: true,
                selected: true
            }, {
                name: 'Alternatives',
                y: 10,
				color:'#8085d9'
            }

			]
        }]
    });
	 */



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
		alert("unloaded");
	};


	$(function()
			{
		$(".popupwindow").popupwindow(profiles);
			});	


	var modal = document.getElementById("idpopcurrentaa");


//	Get the button that opens the modal
	var btn = document.getElementById("idMaxcurrentaa");

//	Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

//	When the user clicks the button, open the modal 
	btn.onclick = function() {
		$(".onpopupscroller").css("overflow","hidden");
		modal.style.display = "block";
	}

//	When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		$(".onpopupscroller").css("overflow","visible");
		modal.style.display = "none";
	}

//	When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

	var modal1 = document.getElementById("idpoprecommendedaa");

//	Get the button that opens the modal
	var btn1 = document.getElementById("idmaxrecommendedaa");

//	Get the <span> element that closes the modal
	var span1 = document.getElementsByClassName("close1")[0];

//	When the user clicks the button, open the modal 
	btn1.onclick = function() {
		$(".onpopupscroller").css("overflow","hidden");
		modal1.style.display = "block";
	}

//	When the user clicks on <span> (x), close the modal
	span1.onclick = function() {
		$(".onpopupscroller").css("overflow","visible");
		modal1.style.display = "none";
	}

//	When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal1) {
			modal1.style.display = "none";
		}
	}



	var modal2 = document.getElementById("idpopcurrentaa");

//	Get the button that opens the modal
	var btn2 = document.getElementById("currentknowmore");

//	Get the <span> element that closes the modal
	var span2 = document.getElementsByClassName("close2")[0];

//	When the user clicks the button, open the modal 
	btn2.onclick = function() {
		$(".onpopupscroller").css("overflow","hidden");
		modal2.style.display = "block";
	}

//	When the user clicks on <span> (x), close the modal
	span2.onclick = function() {
		$(".onpopupscroller").css("overflow","visible");
		modal2.style.display = "none";
	}

//	When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal2) {
			modal2.style.display = "none";
		}
	}



	var modal3 = document.getElementById("idpoprecommendedaa");

//	Get the button that opens the modal
	var btn3 = document.getElementById("recommendedknow");

//	Get the <span> element that closes the modal
	var span3 = document.getElementsByClassName("close3")[0];

//	When the user clicks the button, open the modal 
	btn3.onclick = function() {
		$(".onpopupscroller").css("overflow","hidden");
		modal3.style.display = "block";
	}

//	When the user clicks on <span> (x), close the modal
	span3.onclick = function() {
		$(".onpopupscroller").css("overflow","visible");
		modal3.style.display = "none";
	}

//	When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal3) {
			modal3.style.display = "none";
		}
	}



	//historical return bar 
	var historicalReturnvalues=[];
	var historicalReturnyear=[];

	$.ajax({
		type: 'GET',
		url: REQUEST_URL_PM+'/getPortfolioAsssetHistoricalReturn?clientId='+vClientId,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
//			console.log(data.historicalPFReturnList);
			$.each(data, function (index, value) {

				historicalReturnvalues.push(value.assetReturn);
				historicalReturnyear.push(value.year);
			});
		}, 
		error: function (jqXHR, data) {
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


	$(function () {
		var input = historicalReturnvalues,
		data = [];
		$.each(input, function(index, value){
			var color
			if (value < 0) color = 'tomato';
			else if (value > 0) color = '#90ed7d';
			else color = '';
			data.push({y:value, color: color});
		});

		$('#idnet').highcharts({
			chart: {
				type: 'column',
			},
			title: {
				text: ''
			},
			xAxis: {
				categories: historicalReturnyear
			},
			legend: {
				enabled: false,
			},
			series: [{
				name: 'Recommended AA',
				data: data,

			}]
		});
	});

	Highcharts.chart('idRecommendedbarGraph', {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['Current Allocation (%)', 'Recommended Allocation (%)']
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			},

		},
		legend:{
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
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
		series:dataSubListForCurrentVSRecoBarGraph
	});




	Highcharts.chart('idRecommendedbarGraphpop', {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['Current Allocation (%)', 'Recommended Allocation (%)']
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			},

		},
		legend:{
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
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
		series: dataSubListForCurrentVSRecoBarGraph
	});

	Highcharts.chart('idcurrentVsrecommendedpop', {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['Current Allocation', 'Recommended Allocation']
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			},

		},
		legend:{
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
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
		series: dataListForCurrentVSRecoBarGraph
	});
});

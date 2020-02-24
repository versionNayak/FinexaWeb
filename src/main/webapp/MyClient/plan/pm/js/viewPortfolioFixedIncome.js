var dataListForAssetAllocationMFPagerGraph = [];
var dataListForAssetQualityMFPagerGraph = [];
var performanceValuesMF = [];
var dateMF = [];
var dataDetailsMFList = [];
var dataListForMFPagerAgeMaturityGraph = [];
var dataDetailsMFRiskMeasureList = [];
var selectedIsin;
//six colors are defined as rating category can be maximum six
var colorListForMFPagerAssetAllocation = ['#95ceff','#f7a35c','#90ed7d','#8085d9','#f15c80','#727276'];
var monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function mfCustomClickFI(text) {
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
	//	alert("endDate" + endDate);
		performanceValuesMF = [];
		dateMF = [];
		$.ajax({
			type:'GET',
			async:false,
			url: REQUEST_URL_PM+'/getClientMFOnePager?ISIN='+selectedIsin+'&startDate='+startDate+'&endDate='+endDate,
			datatype:"json",
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function(data) {
				if(data.masterFundPerformancevsIndexList != null && data.masterFundPerformancevsIndexList.length > 0) {
					$.each(data.masterFundPerformancevsIndexList,function(index,value){
						performanceValuesMF.push(value.nav);
						dateMF.push(value.date);
					});
				}

				if (dateMF.length > 0) {

					Highcharts.chart('idgrowth', {
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
					$("#idPerformMF").text("");
				} else {
					$("#idPerformMF").text("No Data found between these dates");
					if (!($('#idgrowth').highcharts() == undefined)) {
						$('#idgrowth').highcharts().destroy();
					}
					//$("#reportrange").hide();
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

function mfFixedincomeClick(isin,name) {
	selectedIsin = isin;
	name = decodeURIComponent(name);
	$("#idMFPagerHeader").text(name);
	dataListForMFPagerAgeMaturityGraph = [];
	// loading age maturity graph
	$.each(dataDetailsMFList,
			function(index, value) {

		if(value.ISIN == isin)
		{
			for(var key in value.MAP) {
				if(value.MAP.hasOwnProperty(key)) {
					if(value.MAP[key] > 0) {
						var dataObj = [];
						var percen = parseFloat((value.MAP[key]/value.CURRENT) * 100);
						dataObj.push(key);
						dataObj.push(percen);
						dataListForMFPagerAgeMaturityGraph.push(dataObj);
					} 
				}
			}
			return false;
		}
	});
	if (dataListForMFPagerAgeMaturityGraph.length > 0) {
		Highcharts.chart('idsectorholding', {

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
				pointFormat: 'Debt Percentage: <b>{point.y:.1f}</b>'
			},
			series: [{
				name: 'Sectors',
				data: dataListForMFPagerAgeMaturityGraph,
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
		$("#idPagerSectorHoldingHeader").text("Asset Maturity");
	} else {
		$("#idPagerSectorHoldingHeader").text("Asset Maturity(No Data Found)");
		if (!($('#idsectorholding').highcharts() == undefined)) {
			$('#idsectorholding').highcharts().destroy();
		}

	}


	// appending risk measures
	$.each(dataDetailsMFRiskMeasureList,
			function(index, value) {

		if(value.ISIN == isin)
		{
			$("#idRiskMeasureMFFixedIncomePagerTBody").empty();
			for(var key in value.MAP) {
				if(value.MAP.hasOwnProperty(key)) {
					$("#idRiskMeasureMFFixedIncomePagerTBody").append("<tr>" +
							"<td>"+key+"</td>" +
							"<td>"+parseFloat(value.MAP[key]).toFixed(4)+"</td>" +
					"</tr");
				}
			}
		}
	});

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
		url: REQUEST_URL_PM+'/getClientMFOnePager?ISIN='+isin+'&startDate='+startDate+'&endDate='+endDate,
		datatype:"json",
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function(data) {

			performanceValuesMF = [];
			dateMF = [];
			dataListForAssetAllocationMFPagerGraph = [];
			dataListForAssetQualityMFPagerGraph = [];
			$("#idTBodyMFPager").empty();
			
			var schemeinceptionDate = moment(data.schemeinceptionDate,'YYYY-MM-DD').format('DD-MM-YYYY');

			$('#idAumMF').text(maskAmountValue(Math.round(parseFloat(data.aum))));
			$('#idBenchmarkMF').text(data.benchmarkIndex);
			$('#idFundManagerMF').text(data.fundManagers);
			var expenseratio = parseFloat(data.expenseRatio).toFixed(2) + "%";
			$('#idExpenseRatioMF').text(expenseratio);
			$('#idInceptionDateMF').text(schemeinceptionDate);
			$('#idSubAssetClassMF').text(data.subAssetClass);
			$('#id52WeekHighMF').text(data.weekHigh52);
			$('#id52WeekLowMF').text(data.weekLow52);
			$('#idMinInvestmentMF').text(parseInt(data.minInvestmentAmount));
			$('#idExitAndLoadPeriodMF').text(data.exitLoadPeriod == null? "N/A" : data.exitLoadPeriod);
			$('#idYTMMF').text((data.ytm == 0 || data.ytm == null) ? "N/A" : parseFloat(data.ytm).toFixed(2));
			$('#idDurationMF').text((data.duration == 0 || data.duration == null) ? "N/A" : parseFloat(data.duration).toFixed(2));
			if(data.masterFundPerformancevsIndexList != null && data.masterFundPerformancevsIndexList.length > 0) {
				$.each(data.masterFundPerformancevsIndexList,function(index,value){
					performanceValuesMF.push(value.nav);
					dateMF.push(value.date);
				});
			}

			if (dateMF.length > 0) {

				Highcharts.chart('idgrowth', {
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
				$("#idPerformMF").text("");
			} else {
				$("#idPerformMF").text("No Data found between these dates");
				if (!($('#idgrowth').highcharts() == undefined)) {
					$('#idgrowth').highcharts().destroy();
				}

//				$("#reportrange").hide();
			}

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

			if (data.equityRatio != null && parseFloat(data.equityRatio) > 0.09) {
				var dataObjSub = {};
				var dataArrEquity = [];
				dataObjSub["name"] = "Equity";
				dataArrEquity.push(parseFloat(data.equityRatio))
				dataObjSub["data"] = dataArrEquity;
				dataListForAssetAllocationMFPagerGraph.push(dataObjSub);
			}

			if (data.debtRatio != null && parseFloat(data.debtRatio) > 0.09) {
				var dataObjSub1 = {};
				var dataArrDebt = []
				dataObjSub1["name"] = "Debt";
				dataArrDebt.push(parseFloat(data.debtRatio));
				dataObjSub1["data"] = dataArrDebt;
				dataListForAssetAllocationMFPagerGraph.push(dataObjSub1);
			}

			if (data.otherRatio != null && parseFloat(data.otherRatio) > 0.09) {
				var dataObjSub2 = {};
				var dataArrOthers = [];
				dataObjSub2["name"] = "Others";
				dataArrOthers.push(parseFloat(data.otherRatio));
				dataObjSub2["data"] = dataArrOthers;
				dataListForAssetAllocationMFPagerGraph.push(dataObjSub2);
			}
			if ( dataListForAssetAllocationMFPagerGraph.length > 0) {
				Highcharts.chart('assetallocation', {
					chart: {
						type: 'bar'
					},
					title: {
						text: ''
					},
					xAxis: {
						categories: ['Asset']
					},
					yAxis: {
						min: 0,
						title: {
							text: ''
						}
					},
					legend: {
						layout:'vertical',
						// reversed: true,
						verticalAlign: 'bottom',
						align: 'center',
						x:-120

					},
					plotOptions: {
						series: {
							stacking: 'normal'
						}
					},
					series: dataListForAssetAllocationMFPagerGraph
				});
				$("#idAssetAllocationHeader").text("Asset Allocation");
			} else {
				$("#idAssetAllocationHeader").text(" Asset Allocation (No Data Found)");
				if (!($('#assetallocation').highcharts() == undefined)) {
					$('#assetallocation').highcharts().destroy();
				}
			}
			
			var colorIndex = 0;
			for(var key in data.assetQualityMap) {
				if(data.assetQualityMap.hasOwnProperty(key)) {
					var percen = parseFloat(data.assetQualityMap[key]);
					if(percen > 0.09){
					var dataObj = {};	
					dataObj["name"] = key;
					dataObj["y"] = percen;
					dataObj["color"] = colorListForMFPagerAssetAllocation[colorIndex];
					colorIndex ++;
					dataListForAssetQualityMFPagerGraph.push(dataObj);
					}
				}
			}
			if (dataListForAssetQualityMFPagerGraph.length > 0) {
				Highcharts.chart('idaxisassmarket', {
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
							//colors: pieColors,
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
						name: 'Assets',
						data: dataListForAssetQualityMFPagerGraph
					}]
				});
				$("#idPagetAssetQualityHeader").text("Asset Quality");
			} else {
				$("#idPagetAssetQualityHeader").text("Asset Quality(No Data Found)");
				if (!($('#idaxisassmarket').highcharts() == undefined)) {
					$('#idaxisassmarket').highcharts().destroy();
				}
			}

			// pagination
			//loading Portfolio details table
			if (data.portfolioDetailsList.length > 0) {

				$("#idPagenationDiv").empty();
				var dataCount = 0;
				var divContainer = "";
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
						'</tr></thead>';
						// appending tbody
						divContainer = divContainer + '<tbody><tr>'+
						'<td>'+value.holdings+'</td>'+
						'<td>'+value.percOfPortfolio+'</td>'+
						'</tr>';
						dataCount ++;
						pageCount ++;
					} else {
						divContainer = divContainer + '<tr>'+
						'<td>'+value.holdings+'</td>'+
						'<td>'+value.percOfPortfolio+'</td>'+
						'</tr>';
						dataCount ++;
					}
				});
				if (dataCount % 10 > 0) {
					divContainer = divContainer + '</tbody></table></div>';
				}
				divContainer = divContainer +'<ul id="pagination-demo" class="pagination-sm pull-right"></ul>';
				console.log("divContainer" + divContainer);
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
				$("#idPagerPortfolioDetailsHeader").text("Portfolio Details");
			} else {
				$("#idPagerPortfolioDetailsHeader").text("Portfolio Details (No Data found)");
				$("#idPagenationDiv").empty();
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

/*function dateRangepickerFIClicked(text) {
	
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
	performanceValuesMF = [];
	dateMF = [];
	$.ajax({
		type:'GET',
		async:false,
		url: REQUEST_URL_PM+'/getClientMFOnePager?ISIN='+selectedIsin+'&startDate='+startDate+'&endDate='+endDate,
		datatype:"json",
		success: function(data) {
			if(data.masterFundPerformancevsIndexList != null && data.masterFundPerformancevsIndexList.length > 0) {
				$.each(data.masterFundPerformancevsIndexList,function(index,value){
					performanceValuesMF.push(value.nav);
					dateMF.push(value.date);
				});
			}

			if (dateMF.length > 0) {

				Highcharts.chart('idgrowth', {
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
				$("#idPerformMF").text("");
			} else {
				$("#idPerformMF").text("No Data found between these dates");
				if (!($('#idgrowth').highcharts() == undefined)) {
					$('#idgrowth').highcharts().destroy();
				}
				//$("#reportrange").hide();
			}
		},error: function(data) {
		}
	});
}*/

var tbodyMainDebt = "";
var tbodyMainDebtModal = "";
var currentValSum = 0;
var investmentValSum = 0;
var gainLossSum = 0;
var cagrSum = 0;
var ptpSum = 0;
var rosSum = 0;
var bondDepositSum = 0;
var smallSavingsSum = 0;
var mutualFundSum = 0;
var dataListForProductTypeGraph = [];
var dataListForAssetQualityGraph = [];
var dataListForAgeMaturityGraph = [];
var m0to1 = 0;
var m1to3 = 0;
var m3to6 = 0;
var m6to9 = 0;
var m9to12 = 0;
var y1to2 = 0;
var y2to3 = 0;
var y3to5 = 0;
var y5to7 = 0;
var y7to10 = 0;
var y10to15 = 0;
var y15Above = 0;
var otherCategory = 0;
var assetMaturitySum = 0;
var modalPresentFlag = 0;
var mfCounter = 1;
var totalCurrentVal = 0;
var lockInDate;
var share;
$.ajax({
	type:'GET',
	async:false,
	url: REQUEST_URL_PM+'/getClientPortfolioOverviewFixedIncome?clientId='+vClientId+'',
	datatype:"json",
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function(data) {
		$.each(data.portfolioOverviewList, function (index, value) { 	 
		totalCurrentVal = totalCurrentVal + value.currentValue;	 
		});
		$.each(data.portfolioOverviewList,function(index,value){
			var name = value.bankIssuerName == null ? value.productName : value.bankIssuerName; 
			var type = value.bankIssuerName == null ? value.productType :  value.productName;
			var prodName = value.bankIssuerName == null ? value.productName : (value.bankIssuerName + "-" + value.productName);
			tbodyMainDebt = tbodyMainDebt + "<tr>";
			tbodyMainDebtModal = tbodyMainDebtModal + "<tr>";
			//console.log(value.maturityDate);
			if (value.productType == "MF / ETF / PMS") {
				//new
				if(value.lockedInDate != "N/A"){
				lockInDate = moment(value.lockedInDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
				}else{
				lockInDate = value.lockedInDate;	
				}
			
				modalPresentFlag = 1;
				if(value.productName === 'Mutual Funds'){
					 name = value.productDescLong == null ? value.productName : value.productDescLong; 
				}
				//var fullNameOfProduct = (value.bankIssuerName == null ? value.productName : (value.bankIssuerName + "-" + value.productName));
				var fullNameOfProduct = (value.bankIssuerName == null ? value.productName : (value.bankIssuerName));
				if(loggedUser == null && loggedClient != null){
					tbodyMainDebt = tbodyMainDebt + '<td id="idMaxaxis'+mfCounter+'">'+fullNameOfProduct+'</td>';
					tbodyMainDebtModal = tbodyMainDebtModal + '<td id="idMaxaxisModal'+mfCounter+'">'+fullNameOfProduct+'</td>';
				} else {
					tbodyMainDebt = tbodyMainDebt + '<td id="idMaxaxis'+mfCounter+'"><a onclick=mfFixedincomeClick(\"'+value.isin+'"\,\"'+encodeURIComponent(fullNameOfProduct)+'"\) class="popup">'+ name +'</a></td>';
					tbodyMainDebtModal = tbodyMainDebtModal + '<td id="idMaxaxisModal'+mfCounter+'"><a onclick=mfFixedincomeClick(\"'+value.isin+'"\,\"'+encodeURIComponent(fullNameOfProduct)+'"\) class="popup">'+ name +'</a></td>';
				}
				mfCounter ++;
			} else {
				lockInDate = value.lockedInDate;
				tbodyMainDebt = tbodyMainDebt + "<td>"+name+"</td>";
				tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+name+"</td>";
			}
		   var investmentValue = 0;
	       if(value.productId == 12 || value.productId == 13 || value.productId == 14 || value.productId == 33){
	    	   investmentValue = "N/A";
	       }else{
	    	   investmentValue = maskAmountValue(Math.round(value.investmentValue))
	       }
	       var gain = 0;
	       if(value.productId == 12 || value.productId == 13 || value.productId == 14 || value.productId == 33){
	    	   gain = "N/A";
	       }else{
	    	   gain = maskAmountValue(Math.round(value.gains));
	       }
			
			tbodyMainDebt = tbodyMainDebt + "<td>"+type+"</td>";
			tbodyMainDebt = tbodyMainDebt + "<td>"+maskAmountValue(Math.round(value.currentValue))+"</td>";
			tbodyMainDebt = tbodyMainDebt + "<td>"+investmentValue+"</td>";
			tbodyMainDebt = tbodyMainDebt + "<td>"+gain+"</td>";
			tbodyMainDebt = tbodyMainDebt + "<td>"+value.marketLinkOrFixedReturn+"</td>";
			tbodyMainDebt = tbodyMainDebt + "<td>"+(value.cagr == null ? "N/A" : parseFloat(value.cagr).toFixed(2))+"</td>";
			tbodyMainDebt = tbodyMainDebt + "<td>"+((value.ptpReturns == null || value.ptpReturns == "N/A")? "N/A" : parseFloat(value.ptpReturns).toFixed(2))+"</td>";
			/*tbodyMainDebt = tbodyMainDebt + "<td>"+value.lockedInDate+"</td>";*/
			tbodyMainDebt = tbodyMainDebt + "<td>"+lockInDate+"</td>";
			tbodyMainDebt = tbodyMainDebt + "<td>"+(value.maturityDate == null ? "N/A": value.maturityDate)+"</td>";
			tbodyMainDebt = tbodyMainDebt + "<td>"+(value.maturityAmount==0.00?"N/A":maskAmountValue(Math.round(parseFloat(value.maturityAmount).toFixed(2))))+"</td>";
			tbodyMainDebt = tbodyMainDebt + "</tr>";
			
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+type+"</td>";
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+maskAmountValue(Math.round(value.currentValue))+"</td>";
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+investmentValue+"</td>";
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+gain+"</td>";
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+value.marketLinkOrFixedReturn+"</td>";
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+(value.cagr == null ? "N/A" : parseFloat(value.cagr).toFixed(2))+"</td>";
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+((value.ptpReturns == null || value.ptpReturns == "N/A")? "N/A" : parseFloat(value.ptpReturns).toFixed(2))+"</td>";
			/*tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+value.lockedInDate+"</td>";*/
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+lockInDate+"</td>";
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+(value.maturityDate == null ? "N/A": value.maturityDate)+"</td>";
			tbodyMainDebtModal = tbodyMainDebtModal + "<td>"+(value.maturityAmount==0.00?"N/A":maskAmountValue(Math.round(parseFloat(value.maturityAmount).toFixed(2))))+"</td>";
			tbodyMainDebtModal = tbodyMainDebtModal + "</tr>";
			
			
			currentValSum = currentValSum + value.currentValue;
			investmentValSum = investmentValSum + value.investmentValue;
			gainLossSum = gainLossSum + value.gains;
			//cagrSum = cagrSum + (value.cagr == null ? parseInt(0) : parseFloat(value.cagr));
			//ptpSum = ptpSum + (value.ptpReturns == null || value.ptpReturns == "N/A" ? parseInt(0) : parseFloat(value.ptpReturns));
				
			
			//new
			//console.log("value.currentValue "+value.currentValue);
			//console.log("currentValSum "+currentValSum);
			var percentOfTotal = parseFloat((value.currentValue/totalCurrentVal).toFixed(2));
			//console.log(percentOfTotal +" ===== "+percTotalSum);
			
			if (!isNaN(parseFloat(value.cagr))) {
				cagrSum = parseFloat(cagrSum) + parseFloat((value.cagr)*percentOfTotal);
				//console.log("totalCagr "+cagrSum);
			}
			if (!isNaN(parseFloat(value.ptpReturns))) {
				ptpSum = parseFloat(ptpSum) + parseFloat((value.ptpReturns)*percentOfTotal);
				//console.log("totalCagr "+cagrSum);
			}
			if (value.productType == "Retirement Oriented Schemes") {
				rosSum = rosSum + value.currentValue;
			}
			if (value.productType == "Deposit/Bonds") {
				bondDepositSum = bondDepositSum + value.currentValue;
			}
			if (value.productType == "Small Saving Schemes") {
				smallSavingsSum = smallSavingsSum + value.currentValue;
			}
			if (value.productType == "MF / ETF / PMS") {
				mutualFundSum = mutualFundSum + value.currentValue;
			}
			var percentOfCurrentTotal = parseFloat(((value.currentValue/totalCurrentVal)*100).toFixed(2));
			if (value.productType != "MF / ETF / PMS") {
				
				if(value.timeToMaturity != null){
				months = value.timeToMaturity * 12;
				}else{
				months = 1;	
				}
				share = percentOfCurrentTotal;
				console.log("value.productName "+value.productName);
				console.log("percentOfCurrentTotal "+percentOfCurrentTotal);
				console.log("value.timeToMaturity "+value.timeToMaturity);
				console.log("months "+months);
				console.log("value.currentValue "+value.currentValue);
				console.log("value.bankIssuerName "+value.bankIssuerName);
				
				//alert("Months" + months);
				if(months <= 12) {
					if (months > 0 && months <= 1) {
						//m0to1 = m0to1 + value.currentValue;
						m0to1 = m0to1 + share;
						console.log("m0to1 "+m0to1);
					}
					if (months > 1 && months <= 3) {
						//m1to3 = m1to3 + value.currentValue;
						m1to3 = m1to3 + share;
						console.log("m1to3 "+m1to3);
					}
					if (months > 3 && months <= 6) {
						//m3to6 = m3to6 + value.currentValue;
						m3to6 = m3to6 + share;
						console.log("m3to6 "+m3to6);
					}
					if (months > 6 && months <= 9) {
						//m6to9 = m6to9 + value.currentValue;
						m6to9 = m6to9 + share;
						console.log("m6to9 "+m6to9);
					}
					if (months > 9 && months <= 12) {
						//m9to12 = m9to12 + value.currentValue;
						m9to12 = m9to12 + share;
						console.log("m9to12 "+m9to12);
					}
				} else {
					if (value.timeToMaturity > 1 && value.timeToMaturity <= 2) {
						//y1to2 = y1to2 + value.currentValue;
						y1to2 = y1to2 + share
						console.log("y1to2 "+y1to2);
					}
					if (value.timeToMaturity > 2 && value.timeToMaturity <= 3) {
						//y2to3 = y2to3 + value.currentValue;
						y2to3 = y2to3 + share;
						console.log("y2to3 "+y2to3);
					}
					if (value.timeToMaturity > 3 && value.timeToMaturity <= 5) {
						//y3to5 = y3to5 + value.currentValue;
						y3to5 = y3to5 + share;
						console.log("y3to5 "+y3to5);
					}
					if (value.timeToMaturity > 5 && value.timeToMaturity <= 7) {
						//y5to7 = y5to7 + value.currentValue;
						y5to7 = y5to7 + share;
						console.log("y5to7 "+y5to7);
					}
					if (value.timeToMaturity > 7 && value.timeToMaturity <= 10) {
						//y7to10 = y7to10 + value.currentValue;
						y7to10 = y7to10 + share;
						console.log("y7to10 "+y7to10);
					}
					if (value.timeToMaturity > 10 && value.timeToMaturity <= 15) {
						//y10to15 = y10to15 + value.currentValue;
						y10to15 = y10to15 + share;
						console.log("y10to15 "+y10to15);
					}
					if (value.timeToMaturity > 15) {
						//y15Above = y15Above + value.currentValue;
						y15Above = y15Above + share;
						console.log("y15Above "+y15Above);
					}
				}
				console.log("============================= ");
			} else {
				// For MF Products

				var dataDetailsMF={};
				dataDetailsMF['ISIN']=value.isin;
				dataDetailsMF['MAP']= value.mfMaturityProfile;
				dataDetailsMF['CURRENT']= value.currentValue;
				dataDetailsMFList.push(dataDetailsMF);

				//storing riskMeasureMap

				var dataDetailsMFRisk={};
				dataDetailsMFRisk['ISIN']=value.isin;
				dataDetailsMFRisk['MAP']= value.riskMeasureMap;
				dataDetailsMFRiskMeasureList.push(dataDetailsMFRisk);
				console.log("value.productName "+value.productName);
				if(value.productName === 'PMS' || value.productName === 'ETF'){
					 share = percentOfCurrentTotal;
					 m0to1 = m0to1 + share;
					console.log("share "+share);
				}

				for(var key in value.mfMaturityProfile) {
					if(value.mfMaturityProfile.hasOwnProperty(key)) {
						console.log("============================= ");
						share = (value.mfMaturityProfile[key]*percentOfCurrentTotal)/100;
						console.log("key "+key);
						console.log("value.mfMaturityProfile[key] "+value.mfMaturityProfile[key]);
						console.log("percentOfCurrentTotal "+percentOfCurrentTotal);
						console.log("share "+share);
						if(key == "0-1M") {
							//m0to1 = m0to1 + value.mfMaturityProfile[key];
							m0to1 = m0to1 + share;
							console.log("m0to1 "+m0to1);
						} else if(key == "1-3M") {
							//m1to3 = m1to3 + value.mfMaturityProfile[key];
							m1to3 = m1to3 + share;
							console.log("m1to3 "+m1to3);
						} else if(key == "3-6M") {
							//m3to6 = m3to6 + value.mfMaturityProfile[key];
							m3to6 = m3to6 + share;
							console.log("m3to6 "+m3to6);
						} else if(key == "6-9M") {
							//m6to9 = m6to9 + value.mfMaturityProfile[key];
							m6to9 = m6to9 + share;
							console.log("m6to9 "+m6to9);
						} else if(key == "9-12M") {
							//m9to12 = m9to12 + value.mfMaturityProfile[key];
							m9to12 = m9to12 + share;
							console.log("m9to12 "+m9to12);
						} else if(key == "1-2Y") {
							//y1to2 = y1to2 + value.mfMaturityProfile[key];
							y1to2 = y1to2 + share;
							console.log("y1to2 "+y1to2);
						} else if(key == "2-3Y") {
							//y2to3 = y2to3 + value.mfMaturityProfile[key];
							y2to3 = y2to3 + share;
							console.log("y2to3 "+y2to3);
						} else if(key == "3-5Y") {
							//y3to5 = y3to5 + value.mfMaturityProfile[key];
							y3to5 = y3to5 + share;
							console.log("y3to5 "+y3to5);
						} else if(key == "5-7Y") {
							//y5to7 = y5to7 + value.mfMaturityProfile[key];
							y5to7 = y5to7 + share;
							console.log("y5to7 "+y5to7);
						} else if(key == "7-10Y") {
							//y7to10 = y7to10 + value.mfMaturityProfile[key];
							y7to10 = y7to10 + share;
							console.log("y7to10 "+y7to10);
						} else if(key == "10-15Y") {
							//y10to15 = y10to15 + value.mfMaturityProfile[key];
							y10to15 = y10to15 + share;
							console.log("y10to15 "+y10to15);
						} else if(key == "15Y+") {
							//y15Above = y15Above + value.mfMaturityProfile[key];
							y15Above = y15Above + share;
							console.log("y15Above "+y15Above);
						} else if(key == "Others") {
							//otherCategory = otherCategory + value.mfMaturityProfile[key];
							otherCategory = otherCategory + share;
							console.log("otherCategory "+otherCategory);
						}
					}
				}
			}
			
		});
		
		console.log("y15Above "+y15Above);
		console.log("otherCategory "+otherCategory);
		tbodyMainDebt = tbodyMainDebt + "<tr class = nonglidtotal>" +
		"<td class = nonglidtotal>Total</td>" +
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(currentValSum))+"</td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(investmentValSum))+"</td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(gainLossSum))+"</td>" +
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal>"+parseFloat(cagrSum).toFixed(2)+"</td>" +
		"<td class = nonglidtotal>"+parseFloat(ptpSum).toFixed(2)+"</td>" +
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal></td>" +
		"</tr>";
		
		tbodyMainDebtModal = tbodyMainDebtModal + "<tr class = nonglidtotal>" +
		"<td class = nonglidtotal>Total</td>" +
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(currentValSum))+"</td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(investmentValSum))+"</td>" +
		"<td class = nonglidtotal>"+maskAmountValue(Math.round(gainLossSum))+"</td>" +
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal>"+parseFloat(cagrSum).toFixed(2)+"</td>" +
		"<td class = nonglidtotal>"+parseFloat(ptpSum).toFixed(2)+"</td>" +                        
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal></td>" +
		"<td class = nonglidtotal></td>" +
		"</tr>";
		
		
		$("#idDebtTBody").prepend(tbodyMainDebt);
		$("#idDebtTBodyModal").append(tbodyMainDebtModal);	
		var rosPer = (rosSum/currentValSum) * 100;
		var bondPer = (bondDepositSum/currentValSum) * 100;
		var smallPer = (smallSavingsSum/currentValSum) * 100;
		var mfPer = (mutualFundSum/currentValSum) * 100;
		
		if (parseFloat(rosPer) > 0.09) {
			var dataObjSub = {};
			dataObjSub["name"] = "Retirement Oriented Schemes";
			dataObjSub["y"] = parseFloat(rosPer);
			dataObjSub["color"] = "#95ceff";
			dataListForProductTypeGraph.push(dataObjSub);
		}

		if (parseFloat(bondPer) > 0.09) {
			var dataObjSub = {};
			dataObjSub["name"] = "Deposit/Bonds";
			dataObjSub["y"] = parseFloat(bondPer);
			dataObjSub["color"] = "#f7a35c";
			dataListForProductTypeGraph.push(dataObjSub);
		}

		if (parseFloat(smallPer) > 0.09) {
			var dataObjSub = {};
			dataObjSub["name"] = "Small Savings Scheme";
			dataObjSub["y"] = parseFloat(smallPer);
			dataObjSub["color"] = "#90ed7d";
			dataListForProductTypeGraph.push(dataObjSub);
		}

		if (parseFloat(mfPer) > 0.09) {
			var dataObjSub = {};
			dataObjSub["name"] = "Mutual Funds";
			dataObjSub["y"] = parseFloat(mfPer);
			dataObjSub["color"] = "#8085d9";
			dataListForProductTypeGraph.push(dataObjSub);
		}
		for(var key in data.assetQualityMap) {
			if(data.assetQualityMap.hasOwnProperty(key)) {
				var dataObj = [];
				var percen = parseFloat(data.assetQualityMap[key]);
				dataObj.push(key);
				dataObj.push(percen);
				dataListForAssetQualityGraph.push(dataObj);
			}
		}
		console.log("m0to1  "+m0to1);
		console.log("m1to3  "+m1to3);
		console.log("m3to6 "+m3to6);
		console.log("m6to9 "+m6to9);
		console.log("m9to12 "+m9to12);
		console.log("y1to2 "+y1to2);
		console.log("y2to3 "+y2to3);
		console.log("y3to5 "+y3to5);
		console.log("y5to7 "+y5to7);
		console.log("y7to10 "+y7to10);
		console.log("y10to15 "+y10to15);
		console.log("y15Above "+y15Above);
		console.log("otherCategory "+otherCategory);
		
		
	
		assetMaturitySum = assetMaturitySum + m0to1 + m1to3 + m3to6 + m6to9 + m9to12 +
		y1to2 + y2to3 + y3to5 + y5to7 + y7to10 + y10to15 + y15Above + otherCategory;
		console.log("assetMaturitySum "+assetMaturitySum);
		var percen;
		if(m0to1 > 0.09){
			//var percen = parseFloat((m0to1/assetMaturitySum) * 100);
			//if(percen > 0.09){
			var dataObj = [];
			dataObj.push("0-1M");
			//dataObj.push(percen);
			dataObj.push(m0to1);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(m1to3 > 0.09) {
			//var percen = parseFloat((m1to3/assetMaturitySum) * 100);
			//if(percen > 0.09){
			var dataObj = [];
			dataObj.push("1-3M");
			//dataObj.push(percen);
			dataObj.push(m1to3);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(m3to6 > 0.09) {
			//var percen = parseFloat((m3to6/assetMaturitySum) * 100);
			if(m3to6 > 0.09){
			var dataObj = [];
			dataObj.push("3-6M");
			//dataObj.push(percen);
			dataObj.push(m3to6);
			dataListForAgeMaturityGraph.push(dataObj);
			}
		}
		if(m6to9 > 0.09) {
			//var percen = parseFloat((m6to9/assetMaturitySum) * 100);
			//if(m6to9 > 0.09){
			var dataObj = [];
			dataObj.push("6-9M");
			//dataObj.push(percen);
			dataObj.push(m6to9);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(m9to12 > 0.09) {
			//var percen = parseFloat((m9to12/assetMaturitySum) * 100);
			//if(m9to12 > 0.09){
			var dataObj = [];
			dataObj.push("9-12M");
			//dataObj.push(percen);
			dataObj.push(m9to12);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(y1to2 > 0.09) {
			//var percen = parseFloat((y1to2/assetMaturitySum) * 100);
			//if(y1to2 > 0.09){
			var dataObj = [];
			dataObj.push("1-2Y");
			//dataObj.push(percen);
			dataObj.push(y1to2);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(y2to3 > 0.09) {
			//var percen = parseFloat((y2to3/assetMaturitySum) * 100);
			//if(y2to3 > 0.09){
			var dataObj = [];
			dataObj.push("2-3Y");
		//	dataObj.push(percen);
			dataObj.push(y2to3);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(y3to5 > 0.09) {
			//var percen = parseFloat((y3to5/assetMaturitySum) * 100);
			//if(y3to5 > 0.09){
			var dataObj = [];
			dataObj.push("3-5Y");
			//dataObj.push(percen);
			dataObj.push(y3to5);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(y5to7 > 0.09) {
			//var percen = parseFloat((y5to7/assetMaturitySum) * 100);
			//if(y5to7 > 0.09){
			var dataObj = [];
			dataObj.push("5-7Y");
			//dataObj.push(percen);
			dataObj.push(y5to7);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(y7to10 > 0.09) {
			//var percen = parseFloat((y7to10/assetMaturitySum) * 100);
			//if(percen > 0.09){
			var dataObj = [];
			dataObj.push("7-10Y");
			//dataObj.push(percen);
			dataObj.push(y7to10);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(y10to15 > 0.09) {
			//var percen = parseFloat((y10to15/assetMaturitySum) * 100);
			//if(percen > 0.09){
			var dataObj = [];
			dataObj.push("10-15Y+");
			//dataObj.push(percen);
			dataObj.push(y10to15);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		if(y15Above > 0.09) {
			//var percen = parseFloat((y15Above/assetMaturitySum) * 100);
			//if(percen > 0.09){
			var dataObj = [];
			dataObj.push("15Y+");
			//dataObj.push("15Y+");
			dataObj.push(y15Above);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
		}
		
		if(otherCategory > 0.09) {
			//var percen = parseFloat((otherCategory/assetMaturitySum) * 100);
			//if(percen > 0.09){
			var dataObj = [];
			dataObj.push("Others");
			dataObj.push(otherCategory);
			///dataObj.push(percen);
			dataListForAgeMaturityGraph.push(dataObj);
			//}
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
if (dataListForAgeMaturityGraph.length > 0) {
	Highcharts.chart('idsectorholding1', {

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
			pointFormat: 'Debt Percentage: <b>{point.y:.1f}</b>'
		},
		series: [{
			name: 'Sectors',
			data: dataListForAgeMaturityGraph,
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
		}]});
	$("#idOverviewAgeMaturityHeader").text("Overview By Asset Maturity");
} else {
	$("#idOverviewAgeMaturityHeader").text("Overview By Asset Maturity (No Data Found)");
	if (!($('#idsectorholding1').highcharts() == undefined)) {
		$('#idsectorholding1').highcharts().destroy();
	}
	
}



var jssor_22_slider = new $JssorSlider$("jssor_22", jssor_22_options);

var recompavright = $('.jssort22 div:nth-child(2) div:nth-child(2) div');
var recompavleft = $('.jssort22 div:nth-child(2) div:nth-child(2) div');

$(".Incomeright").click(function(){
	if(recompavright.hasClass('pav'))
	{	
		if(loggedUser == null && loggedClient != null){
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewProductRecommend.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Product Recommendation.");
			$(".pmportfoliofxtincome").removeClass("activeitem");
			$(".pmportfoliorecom").removeClass("onclickbg");
			$(".pmportfoliorecom").addClass("activeitem");
		}else{
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioRecommendation.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Portfolio Recommendation.");
			$(".pmportfoliofxtincome").removeClass("activeitem");
			$(".pmportfoliorecom").removeClass("onclickbg");
			$(".pmportfoliorecom").addClass("activeitem");
		} 
	};
});

$(".Incomeleft").click(function(){
	if(recompavleft.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioEquity.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$(".glidnonglid").hide();
		$("#idHeading").html("Portfolio Equity.");
		$(".pmportfoliofxtincome").removeClass("activeitem");
		$(".pmportfolioequity").addClass("activeitem");




	};
});

/*Highcharts.chart('idassetspop', {
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
                name: 'Mutual Fund',
                y: 10,
				color:'#95ceff'
            },


			{
                name: 'Retirement Oriented Schemes',
                y: 10,
				color:'#f7a35c'
            }, {
                name: 'Bonds /  Debentures',
                y: 10,
				color:'#90ed7d',
                sliced: true,
                selected: true
            },
			{
                name: 'Deposits',
                y: 10,
				color:'#8085d9'
            }, 
			{
                name: 'Small Savings Schemes',
                y: 10,
				color:'#f15c80'
            }, 
			]
        }]
});*/
Highcharts.chart('idsectors', {

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
		pointFormat: 'Debt Percentage: <b>{point.y:.1f}</b>'
	},
	series: [{
		name: 'Sectors',
		data: [
			['Cash and Others', 23.7],
			['Unrated', 16.1],
			['Below AA', 14.2],
			['AA & Equivalent', 14.0],
			['AAA & Equivalent', 12.5],
			['Govt Securities', 12.1]


			],
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
Highcharts.chart('idsectorspop', {
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
		data: [
			['Cash and Others', 23.7],
			['Unrated', 16.1],
			['Below AA', 14.2],
			['AA & Equivalent', 14.0],
			['AAA & Equivalent', 12.5],
			['Govt Securities', 12.1]


			],
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
if (dataListForAssetQualityGraph.length > 0) {
	Highcharts.chart('idassetquality', {

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
			pointFormat: 'Debt Percentage: <b>{point.y:.1f}</b>'
		},
		series: [{
			name: 'Sectors',
			data: dataListForAssetQualityGraph,
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
	$("#idOverviewAssetQualityHeader").text("Overview By Asset Quality");
} else {
	$("#idOverviewAssetQualityHeader").text("Overview By Asset Quality (No Data Found)");
		if (!($('#idassetquality').highcharts() == undefined)) {
			$('#idassetquality').highcharts().destroy();
		}
}
if (dataListForProductTypeGraph.length > 0) {
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
			name: 'Percentage',
			innerSize: '50%',
			data: dataListForProductTypeGraph
		}]
	});
	$("#idOverviewProductTypeHeader").text("Overview By Product Type");
} else {
	$("#idOverviewProductTypeHeader").text("Overview By Product Type (No Data Found)");
	if (!($('#idcaa').highcharts() == undefined)) {
		$('#idcaa').highcharts().destroy();
	}
}

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
                name: 'Mutual Fund',
                y: 10,
				color:'#95ceff'
            },


			{
                name: 'Retirement Oriented Schemes',
                y: 10,
				color:'#f7a35c'
            }, {
                name: 'Bonds /  Debentures',
                y: 10,
				color:'#90ed7d',
                sliced: true,
                selected: true
            },
			{
                name: 'Deposits',
                y: 10,
				color:'#8085d9'
            }, 
			{
                name: 'Small Savings Schemes',
                y: 10,
				color:'#f15c80'
            }, 
			]
        }]
    });

 */
Highcharts.chart('idmarketcap', {
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
		name: 'Average Maturity',
		colorByPoint: true,
		data: [{
			name: 'Less than 1 Year',
			y: 10,
			color:'#95ceff'
		},


		{
			name: 'Greater than 1 Year',
			y: 10,
			color:'#f7a35c'
		}, {
			name: 'Others',
			y: 10,
			color:'#90ed7d',
			sliced: true,
			selected: true
		}


		]
	}]
});
Highcharts.chart('idmarketcappop', {
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
		name: 'Average Maturity',
		colorByPoint: true,
		data: [{
			name: 'Less than 1 Year',
			y: 10,
			color:'#95ceff'
		},


		{
			name: 'Greater than 1 Year',
			y: 10,
			color:'#f7a35c'
		}, {
			name: 'Others',
			y: 10,
			color:'#90ed7d',
			sliced: true,
			selected: true
		}


		]
	}]
});

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
if (modalPresentFlag == 1) {
	for (i = 1; i < mfCounter; i++) {
		var modal6 = document.getElementById("idpopaxispop");
		//Get the button that opens the modal
		var btn6 = document.getElementById("idMaxaxis"+i);
		//Get the <span> element that closes the modal
		var span6 = document.getElementsByClassName("close6")[0];
		//When the user clicks the button, open the modal 
		btn6.onclick = function() {
			$('#reportrange span').html(
					moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - '
							+ moment().format('MMMM D, YYYY'));
			$(".onpopupscroller").css("overflow","hidden");
			modal6.style.display = "block";
		}
		//When the user clicks on <span> (x), close the modal
		span6.onclick = function() {
			$(".onpopupscroller").css("overflow","visible");
			modal6.style.display = "none";
		}
		//When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal6) {
				modal6.style.display = "none";
			}
		}
	}
}

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
var modal1 = document.getElementById("idpopcurrentaa");

//Get the button that opens the modal
var btn1 = document.getElementById("equitymoredebt");

//Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

//When the user clicks the button, open the modal 
btn1.onclick = function() {
	$('#reportrange span').html(
			moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - '
					+ moment().format('MMMM D, YYYY'));
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

if (modalPresentFlag == 1) {
	for (i = 1; i < mfCounter; i++) {
		var modal2 = document.getElementById("idpopaxispop");

		//Get the button that opens the modal
		var btn2 = document.getElementById("idMaxaxisModal"+i);

		//Get the <span> element that closes the modal
		var span2 = document.getElementsByClassName("close2")[0];

		//When the user clicks the button, open the modal 
		btn2.onclick = function() {
			$('#reportrange span').html(
					moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - '
							+ moment().format('MMMM D, YYYY'));
			$(".onpopupscroller").css("overflow","hidden");
			modal2.style.display = "block";
		}

		//When the user clicks on <span> (x), close the modal
		span2.onclick = function() {
			$(".onpopupscroller").css("overflow","visible");
			modal2.style.display = "none";
		}

		//When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal2) {
				modal2.style.display = "none";
			}
		}
	}
}

/*$(function () {
	var input = [70000,110000, 120000, 130000,140000,200000,210000,220000,230000,240000,250000,300000,310000,320000,330000,340000,350000,400000,410000,420000,430000,440000,450000,460000,500000,70000,110000, 120000, 130000,140000,200000,210000,220000,230000,240000,250000,-300000,-310000,-320000,-330000,-340000,-350000,-400000,-410000,-420000,-430000,-440000,-450000,-460000],
	data = [];
	$.each(input, function(index, value){
		var color
		if (value < 0) color = 'tomato';
		else if (value > 0) color = '#337ab7';
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
			categories: [
				'2016-2017','2017-2018', '2018-2019','2019-2020', '2020-2021','2021-2022', '2022-2023','2023-2024', '2024-2025','2025-2026','2026-2027','2027-2028','2028-2029','2029-2030','2030-2031','2031-2032','2032-2033','2033-2034','2034-2035','2035-2036','2036-2037','2037-2038','2038-2039','2039-2040','2040-2041','2041-2042','2042-2043','2043-2044','2044-2045','2045-2046','2046-2047','2047-2048','2048-2049','2049-2050','2050-2051','2051-2052','2052-2053','2053-2054','2054-2055','2055-2056','2056-2057','2057-2058','2058-2059','2059-2060','2060-2061','2061-2062','2062-2063','2063-2024','2064-2065'
				]
		},
		legend: {
			enabled: false,
		},
		series: [{
			name: 'Recommended AA',
			data: data,

		}]
	});
});*/



/*$(function () {
	var input = [70000,110000, 120000, 130000,140000,200000,210000,220000,230000,240000,250000,300000,310000,320000,330000,340000,350000,400000,410000,420000,430000,440000,450000,460000,500000,70000,110000, 120000, 130000,140000,200000,210000,220000,230000,240000,250000,-300000,-310000,-320000,-330000,-340000,-350000,-400000,-410000,-420000,-430000,-440000,-450000,-460000],
	data = [];
	$.each(input, function(index, value){
		var color
		if (value < 0) color = 'tomato';
		else if (value > 0) color = '#337ab7';
		else color = '';
		data.push({y:value, color: color});
	});

	$('#idnetpop').highcharts({
		chart: {
			type: 'column',
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: [
				'2016-2017','2017-2018', '2018-2019','2019-2020', '2020-2021','2021-2022', '2022-2023','2023-2024', '2024-2025','2025-2026','2026-2027','2027-2028','2028-2029','2029-2030','2030-2031','2031-2032','2032-2033','2033-2034','2034-2035','2035-2036','2036-2037','2037-2038','2038-2039','2039-2040','2040-2041','2041-2042','2042-2043','2043-2044','2044-2045','2045-2046','2046-2047','2047-2048','2048-2049','2049-2050','2050-2051','2051-2052','2052-2053','2053-2054','2054-2055','2055-2056','2056-2057','2057-2058','2058-2059','2059-2060','2060-2061','2061-2062','2062-2063','2063-2024','2064-2065'
				]
		},
		legend: {
			enabled: false,
		},
		series: [{
			name: 'Recommended AA',
			data: data,

		}]
	});
});*/

/*Highcharts.chart('idRecommendedbarGraph', {
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
	series: [{
		name: 'Alternatives -Others',
		data: [8,9],
		color:"#95ceff"
	}, {
		name: 'Alternatives - Real Estate',
		data: [8,10],
		color:"#f7a35c"
	},  {
		name: 'Alternatives - Precious Metals',
		data: [9,11],
		color:"#90ed7d"
	},{
		name: 'Equity International',
		data: [9,11],
		color:"#8085d9"
	},{
		name: 'Equity Mid and Small Cap',
		data: [9,10],
		color:"#f15c80"
	},{
		name: 'Equity Large Cap',
		data: [8,9],
		color:"#727276"
	}
	,{
		name: 'Long Term Debt',
		data: [8,9],
		color:"#5adedc"
	},{
		name: 'Short Term Debt',
		data: [8,9],
		color:"#9164aa"
	},{
		name: 'Ultra Short Term Debt',
		data: [8,9],
		color:"#cdaa5f"
	},{
		name: 'Cash/Liquid',
		data: [8,9],
		color:"#558769"
	}]
});*/



/*
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
	series: [{
		name: 'Alternatives -Others',
		data: [8,9],
		color:"#95ceff"
	}, {
		name: 'Alternatives - Real Estate',
		data: [8,10],
		color:"#f7a35c"
	},  {
		name: 'Alternatives - Precious Metals',
		data: [9,11],
		color:"#90ed7d"
	},{
		name: 'Equity International',
		data: [9,11],
		color:"#8085d9"
	},{
		name: 'Equity Mid and Small Cap',
		data: [9,10],
		color:"#f15c80"
	},{
		name: 'Equity Large Cap',
		data: [8,9],
		color:"#727276"
	}
	,{
		name: 'Long Term Debt',
		data: [8,9],
		color:"#5adedc"
	},{
		name: 'Short Term Debt',
		data: [8,9],
		color:"#9164aa"
	},{
		name: 'Ultra Short Term Debt',
		data: [8,9],
		color:"#cdaa5f"
	},{
		name: 'Cash/Liquid',
		data: [8,9],
		color:"#558769"
	}]
});*/


/*Highcharts.chart('idcurrentVsrecommended', {
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
	series: [{
		name: 'Alternatives',
		data: [8,9],
		color:"#95ceff"
	}, {
		name: 'Equity',
		data: [8,10],
		color:"#f7a35c"
	},  {
		name: 'Fixed Income',
		data: [9,11],
		color:"#90ed7d"
	},{
		name: 'Cash/Liquid',
		data: [9,11],
		color:"#8085d9"
	}]
});*/


/*	Highcharts.chart('idcurrentVsrecommendedpop', {
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
    series: [{
        name: 'Alternatives',
            data: [8,9],
			color:"#95ceff"
    }, {
        name: 'Equity',
            data: [8,10],
			color:"#f7a35c"
    },  {
        name: 'Fixed Income',
            data: [9,11],
			color:"#90ed7d"
    },{
        name: 'Cash/Liquid',
            data: [9,11],
			color:"#8085d9"
	}]
});*/


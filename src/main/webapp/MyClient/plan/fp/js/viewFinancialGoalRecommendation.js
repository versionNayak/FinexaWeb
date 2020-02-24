var goalNo = 0;
var goalDesc = [];
var goalIdList = [];
var goalCostList=[];
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function(){
	if(loggedUser === null && loggedClient !=null){
		$(".assetAllocationTable").hide("fast");
		$("#idAsssetAllocationTableModal").hide("fast");
	}else{
		$(".assetAllocationTable").show();
		$("#idAsssetAllocationTableModal").show();
	}
	
	var jssor_23_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}
		];

	var jssor_23_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_23_SlideshowTransitions,
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

	var jssor_23_slider = new $JssorSlider$("jssor_23", jssor_23_options);

	/** Modidied on 28th sep version for arrow key(NehaD) start **/
	var recompavright = $('.jssort23 div:nth-child(2) div:last-child div');
	var recompavleft = $('.jssort23 div:nth-child(2) div:nth-child(2) div');

	$(".Incomeright").click(function(){
		if(recompavright.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialGoalExecution.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Goal Execution");
			$(".fpgoalrecommendations").removeClass("activeitem");
			$(".fpgoalexecution").addClass("activeitem");
		};
	});

	$(".Incomeleft").click(function(){
		if(recompavleft.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewContingencyFund.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Contingency Fund");
			$(".fpgoalrecommendations").removeClass("activeitem");
			$(".fpcontigencyfund").addClass("activeitem");
		};/** Added on 19th sep version for arrow key(NehaD) end **/
	});
});
function loadGoal(goalId){
	var equityI = [];
	var equityMS = [];
	var alternativePM = [];
	var alternativeRE = [];
	var alternativeOthers = [];
	var cashList = [];
	var ustDebtList = [];
	var lstDebt = [];
	var stDebt = [];
	var equityLCList = [];
	var equityMSCList = [];
	var idCash;
	var idUltraShortTermDebt;
	var idShortTermDebt;
	var idLongTermDebt;
	var idEquityLarge;
	var idEquitySmall;
	var idEquityInternational;
	var idPreciousMetal;
	var idRealEstate;
	var idOthers;
	var idTotal;
	var categoriesTimeToGoal = [];
	var scoreTimeToGoal = [];

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
			$("#idGoalType").text(data.goalType);
			$("#goalDetailsHeading").text(data.goalType);
			
			$("#idGoalDesc").text(data.goalDesc);
			var cost = 0.0;
			$.each(goalCostList,
					function(allocationGoalIndex, allocationGoalValue) {
				if(allocationGoalValue.ID===goalId)
				{
					cost=allocationGoalValue.COST;
				}
			});
			
			$("#idECOGoal").text(maskAmountValue(cost));

			$("#idTimeToGoal").text(data.monthsToGoal);

			$("#idCorpus").text(maskAmountValue(Math.round(data.totalCorpusReqdAtGoalStart)));

			$("#idCorpusLoan").text(maskAmountValue(Math.round(data.corpusFinancedByLoan)));
			/**Remaining cost of goal ****/
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

			var data2 = [
				{ key: "Date1", value: new Date(currentDate[0], currentDate[1] -1) }, // Birth date 
				{ key: "Date2", value: new Date(goalStartDate[0], goalStartDate[1] -1) },  //Goal start date
				{ key: "Date3", value: new Date(goalEndDate[0], goalEndDate[1] -1) }, //Goal start date
				{ key: "Date4", value: new Date(endDate[0], endDate[1] -1) }, //approx death date

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
			$("#rangeslide15").empty();
			var rangeslide13 = rangeslide("#rangeslide15", {

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
					return pad(data.value.getDate()) + "." + pad(data.value.getMonth()+1) + "." + data.value.getFullYear();
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
			$("#idGoalType").text("");
			$("#idGoalDesc").text("");
			$("#idTimeToGoal").text(0);
			$("#idCorpus").text(0);
			$("#idCorpusLoan").text(0);
			$("#idCorpusFunded").text(0);
		}
	});	
	
	// in FP goal planning will be in Glide Path mode
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getRecommendedAssetAllocationGP?clientId='+vClientId+'&goalId='+goalId+
		'&glideNonglideMode=G',
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
			$("#idUltraShortTermDebt").text(idUltraShortTermDebt + "%");
			if(idUltraShortTermDebt == 0) {
				$("#glideTable tbody tr.classUSTD").hide();
			}

			idShortTermDebt = parseFloat(data.assetAllocationList[2][2]) * 100;
			$("#idShortTermDebt").text(idShortTermDebt + "%");
			if(idShortTermDebt == 0) {
				$("#glideTable tbody tr.classSTD").hide();
			}

			idLongTermDebt = parseFloat(data.assetAllocationList[3][2]) * 100;
			$("#idLongTermDebt").text(idLongTermDebt + "%");
			if(idLongTermDebt == 0) {
				$("#glideTable tbody tr.classLTD").hide();
			}

			idEquityLarge = parseFloat(data.assetAllocationList[4][2]) * 100;
			$("#idEquityLarge").text(idEquityLarge + "%");
			if(idEquityLarge == 0) {
				$("#glideTable tbody tr.classEquityLC").hide();
			}

			idEquitySmall = parseFloat(data.assetAllocationList[5][2]) * 100;
			$("#idEquitySmall").text(idEquitySmall + "%");
			if(idEquitySmall == 0) {
				$("#glideTable tbody tr.classEquityMC").hide();
			}

			idEquityInternational = parseFloat(data.assetAllocationList[6][2]) * 100;
			$("#idEquityInternational").text(idEquityInternational + "%");
			if(idEquityInternational == 0) {
				$("#glideTable tbody tr.classEquityInt").hide();
			}

			idPreciousMetal = parseFloat(data.assetAllocationList[7][2]) * 100;
			$("#idPreciousMetal").text(idPreciousMetal + "%");
			if(idPreciousMetal == 0) {
				$("#glideTable tbody tr.classAltPrec").hide();
			}

			idRealEstate = parseFloat(data.assetAllocationList[8][2]) * 100;
			$("#idRealEstate").text(idRealEstate + "%");
			if(idRealEstate == 0) {
				$("#glideTable tbody tr.classAltReal").hide();
			}

			idOthers = parseFloat(data.assetAllocationList[9][2]) * 100;
			$("#idOthers").text(idOthers + "%");
			if(idOthers == 0) {
				$("#glideTable tbody tr.classAltOther").hide();
			}

			idTotal = idCash + idUltraShortTermDebt + idShortTermDebt + idLongTermDebt +
			idEquityLarge + idEquitySmall + idEquityInternational + idPreciousMetal + idRealEstate +
			idOthers;
			$("#idTotal").text(idTotal + "%");
			 categoriesTimeToGoal = [];
			 scoreTimeToGoal = [];
			$.each(data.riskScoreGPList,function(index, value) {
				categoriesTimeToGoal.push(value.toMonth + " Months");
				scoreTimeToGoal.push(value.allocationCategory);
			});
			$.each(data.assetAllocationMovementList,function(index, value) {

				cashList.push(value.cashLiquidPerc * 100);
				ustDebtList.push(value.ultraShortTermDebtPerc * 100);
				lstDebt.push(value.longTermDebtPerc * 100);
				stDebt.push(value.shortTermDebtOerc * 100);
				equityLCList.push(value.equityLargePerc * 100);

				equityI.push(value.equityInternationalPerc * 100);
				equityMS.push(value.equityMidSmallPerc * 100);
				alternativePM.push(value.alternativePreciousPerc * 100);
				alternativeRE.push(value.alternativeRealExtatePerc * 100);
				alternativeOthers.push(value.alternativeOthersPerc * 100);

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
	var lineGraph = document.getElementById("idLineGraph");
	Highcharts.chart(lineGraph, {
		chart: {
			type: 'line'
		},
		title: {
			text: '<b>Glide Path</b>'
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
			data: scoreTimeToGoal
		}]
	});
	$('#idRecommendedBarGraph').highcharts({
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
	
	var yearList = [];
	var loanOutflowList = [];
	var goalOutflowList = [];
	var investmentList = [];
	var closingBlncList = [];
	var fundedFlag = 0;
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_FP + '/getGoalCashflowsFP?clientId='+vClientId+
		'&goalId='+goalId,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$("#idYearlyCashflow").empty();
			$("#idEarMarkedAssets").text(maskAmountValue(Math.round(parseFloat(data.earmarkedLumpsum).toFixed(2))));
			$("#idSIP").text(maskAmountValue(Math.round(data.pmtSip)));
			$("#idCorpusFunded").text(maskAmountValue(Math.round(data.fundedCoalCorpus)));
			$.each(data.cashflowList,function(index, value) {
				var fund = maskAmountValue(Math.round(parseInt(value.fundedCorpus)));
				if(fundedFlag == 1) {
					fund = "-";
				}
				$("#idYearlyCashflow").append('<tr>' +
						'<td>'+ value.financialYear+'</td>' +
						'<td>'+ parseInt(value.clientAge)+'</td>' +
						'<td>'+ maskAmountValue(Math.round(parseInt(value.openingBalance)))+'</td>' +
						'<td>'+ maskAmountValue(Math.round(parseInt(value.lumpsumInvestment)))+'</td>' +
						'<td>'+ maskAmountValue(Math.round(parseInt(value.returnOnInvestment)))+'</td>' +
						'<td>'+ fund +'</td>' +
						'<td>'+ maskAmountValue(Math.round(parseInt(value.loanInflow)))+'</td>' +
						'<td>'+ maskAmountValue(Math.round(parseInt(value.goalOutflow)))+'</td>' +
						'<td>'+ maskAmountValue(Math.round(parseInt(value.closingBalance)))+'</td>' +
				'</tr>');
				if(parseInt(value.goalOutflow) > 0 && fundedFlag == 0) {
					fundedFlag = 1;
				}
				yearList.push(value[0]);
				loanOutflowList.push(parseInt(value.loanInflow));
				goalOutflowList.push(parseInt(value.goalOutflow));
				investmentList.push(parseInt(value.lumpsumInvestment));
				closingBlncList.push(parseInt(value.closingBalance));

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
			$("#idYearlyCashflow").empty();
		}
	});	

	var idLinebargoal = document.getElementById("idYearlyCashflowsGraph");
	Highcharts.chart(idLinebargoal, {
		chart: {

		},
		title: {
			text: '<b>Goal Cashflows</b>',


		},

		xAxis: [{
			categories: yearList,
			crosshair: true
		}],
		yAxis: [{ // Primary yAxis
			labels: {

				style: {
					color: Highcharts.getOptions().colors[1]

				}
			},
			title: {
				text: 'Goal Cashflows',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			}
		}, { // Secondary yAxis
			title: {
				text: 'Closing Balance',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
			labels: {

				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
			opposite: true
		}],
		tooltip: {
			shared: true
		},
		legend: {

			align: 'center',
			x: 0,
			verticalAlign: 'buttom',
			y: 370,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},

		plotOptions: {
			column: {
				stacking: 'normal',
				dataLabels: {

					color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
				}
			}
		},

		series: [{
			maxPointWidth:50,
			name: 'Investment',
			type: 'column',
			yAxis: 1,
			color: '#90ed7d',
			data:investmentList,        
		}, 
		{
			maxPointWidth:50,
			name: 'Loan Inflow',
			type: 'column',
			yAxis: 1,
			color: '#f7a35c',
			data:loanOutflowList,

		}, 
		{
			maxPointWidth:50,
			name: 'Goal Outflow',
			type: 'column',
			yAxis: 1,
			color: '#95ceff',
			data:goalOutflowList,

		}, 

		{
			maxPointWidth:50,
			name: 'Closing Balance',
			type: 'spline',
			color:'#3a3a4f',
			data: closingBlncList,

		}]
	});
	
}
// loading Goal Details Table
$.ajax({
	type: 'GET',
	async : false,
	url: REQUEST_URL_GP + '/getClientGoalList?clientId='+vClientId,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		$.each(data,function(index, value) {
			goalNo = goalNo + 1;
			goalIdList.push(value.goalId);
			goalDesc.push(value.goalDescName);

			$("#idGoalList").append("<tr><td>" +
					"<div id='idmaxeducationpg"+index+"' " +
					"class='popup'><a onclick='loadGoal("+value.goalId+");'>"+value.goalTypeName+"</a></div></td></tr>");
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
		$("#idGoalList").empty();
	}
});


// loading Asset Rebalancing Table
var divString = ("<h2 class='dashboardheading' style='margin-left:48px;margin-top:16px'>We suggest you to allocate the following assets for your life goals in the following manner.</h2>"
		+"<table width='89%' class='goalsumrytbl'"+
		"style='z-index: 10 !important; margin-top: 31px; margin-left: 48px'>"+
"<thead><tr><th style='text-align: left'>Assets</th>");
for (goalIndex = 0; goalIndex < goalIdList.length; goalIndex ++) {
	divString = divString + "<th>"+goalDesc[goalIndex]+"</th>";
}
$("#idDivGoalModal").append(divString+ "</tr></thead><tbody id='idAssetReBalancingTbodyModal'></tbody></table>");
divString = divString + "</tr></thead><tbody id='idAssetReBalancingTbody'></tbody></table>";
$("#idDivGoal").append(divString);
var goalPmtMapList=[];

$.ajax({
		type: 'GET',
		async : false,
		url: REQUEST_URL_FP + '/assetReBalancing?clientId=' +vClientId+ '',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$('#idAssetReBalancingTbody').empty();
			$('#idAssetReBalancingTbodyModal').empty();
			var tbody = "";
			$.each(data,
					function(index, value) {
					if(index == "ALLOCATION_ROUND_GOAL")
					{
										$.each(value,
							function(allocationindex, allocationvalue) {
						var goalPmtMapObj={};
						goalPmtMapObj['ID']=allocationvalue.goalId;
						goalPmtMapObj['PMT']=allocationvalue.pmt;
						goalPmtMapList.push(goalPmtMapObj);
					});
					
					}
				if(index == "ASSET_NOT_EARMARKED" || index == "ALLOCATION_ROUND_GOAL") {


	
				} else {
//					alert("index" + index.indexOf("-"));
					var indexOfHiphen = index.indexOf("-");
					var assetNameDisplayed = index.substring(indexOfHiphen+1);
					var n = index.lastIndexOf("-");
					var newVar = index.substring(n+1);
					if(newVar == "null") {
						assetNameDisplayed = index.substring(indexOfHiphen+1,n);
					}
					tbody = tbody + "<tr><td>"+assetNameDisplayed+"</td>";
					for (goalIndex = 0; goalIndex < goalIdList.length; goalIndex ++) {
						var flag = 0;
						$.each(value,
								function(index1, value1) {
							if (value1.goalId == goalIdList[goalIndex]) {
								tbody = tbody + "<td> "+maskAmountValue(Math.round(parseFloat(value1.assetCurrentValueUsed).toFixed(2)))+"</td>";
								flag = 1;
							} 
						});
						if (flag == 0) {
							tbody = tbody + "<td></td>";
						}
					}
					tbody = tbody + "/<tr>";
				}
			});
			$('#idAssetReBalancingTbody').append(tbody);
			$('#idAssetReBalancingTbodyModal').append(tbody);


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
			$('#idAssetReBalancingTbody').empty();
			$('#idAssetReBalancingTbodyModal').empty();
		}
 });

// loading Goal Details Table
$.ajax({
		type: 'GET',
		async : false,
		url: REQUEST_URL_FP + '/getGoalRecoList?clientId=' +vClientId+ '',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$('#idGoalDetailTbody').empty();
			$('#idGoalDetailTbodyModal').empty();
			$.each(data,
					function(index, value) {
				if(value.goalDesc==null)
				{
					return;
				}
				var goalCostObj={};
				goalCostObj['ID']=value.goalId;
				goalCostObj['COST']=value.presentCostOfGoal;
				goalCostList.push(goalCostObj);
				//goalPresentCost.push(value.presentCostOfGoal);
				var pmtValueFromIteration=0;
				$.each(goalPmtMapList,
						function(allocationGoalIndex, allocationGoalValue) {
					if(allocationGoalValue.ID===value.goalId)
					{
						pmtValueFromIteration=allocationGoalValue.PMT;
					}
					//alert(allocationGoalValue.PMT);
				});
				$('#idGoalDetailTbody').append(
						'<tr><td>'+ value.goalDesc+ '</td><td>'+ 
						parseInt(value.yearsToGoal) + '</td><td>'+
						maskAmountValue(value.presentCostOfGoal) + '</td><td>'+
						value.recurringYear + '</td><td>'+
						maskAmountValue(value.futureCostOfGoal) + '</td><td>'+
						(value.inflationRate) + '%</td><td>'+
						value.goalPriority + '</td><td>'+
						value.achievement + '%</td><td>'+
						value.startRiskProfile + '</td><td>'+
						maskAmountValue((value.achievement==0?0:(pmtValueFromIteration==null || pmtValueFromIteration<0) ?
								0:Math.round(parseFloat(pmtValueFromIteration).toFixed(2)))) +'</td></tr>');

				$('#idGoalDetailTbodyModal').append(
						'<tr><td>'+ value.goalDesc+ '</td><td>'+ 
						parseInt(value.yearsToGoal) + '</td><td>'+
						maskAmountValue(value.presentCostOfGoal) + '</td><td>'+
						value.recurringYear + '</td><td>'+
						maskAmountValue(value.futureCostOfGoal) + '</td><td>'+
						(value.inflationRate) + '%</td><td>'+
						value.goalPriority + '</td><td>'+
						value.achievement + '%</td><td>'+
						value.startRiskProfile + '</td><td>'+
						maskAmountValue((value.achievement==0?0:(pmtValueFromIteration==null || pmtValueFromIteration<0) ?
								0:Math.round(parseFloat(pmtValueFromIteration).toFixed(2)))) +'</td></tr>');
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
			$('#idGoalDetailTbody').empty();
			$('#idGoalDetailTbodyModal').empty();
		}
 });

// loading Asset Allocation Table
var alloString = ("<table id='idAsssetAllocationTable' class='assetAllocationTable' width='89%' class='alignleft vacationtbl'"+
		"style='z-index: 10 !important; margin-top: 31px; margin-left: 48px'>"+
		"<thead>"+
"<tr><th style='text-align: left'>Year</th>");
for (goalIndex = 0; goalIndex < goalIdList.length; goalIndex ++) {
	alloString = alloString + "<th>Risk Profile</th><th>"+goalDesc[goalIndex]+"</th>"
}
var alloStringModal = ("<table id='idAsssetAllocationTableModal'  width='89%' class='alignleft vacationtbl'"+
		"style='z-index: 10 !important; margin-top: 31px; margin-left: 48px'>"+
		"<thead>"+
"<tr><th style='text-align: left'>Year</th>");
for (goalIndex = 0; goalIndex < goalIdList.length; goalIndex ++) {
	alloStringModal = alloStringModal + "<th>Risk Profile</th><th>"+goalDesc[goalIndex]+"</th>"
}
$("#idDivGoalModal").append(alloStringModal + "</thead><tbody id='idAllocateTbodyModal'></tbody></table>");
alloString = alloString + "</thead><tbody id='idAllocateTbody'></tbody></table>";
$("#idDivGoal").append(alloString);

$.ajax({
		type: 'GET',
		async : false,
		url: REQUEST_URL_FP + '/getRiskProfileVsAllocationProjection?clientId=' +vClientId+ '',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$('#idAllocateTbody').empty()
			$('#idAllocateTbodyModal').empty();
			
			if (data.length > 0) {
				var maxIteration = data[0].riskProfileAllocatorDTOList.length;
				$.each(data,
						function(index, value) {
					if (maxIteration < value.riskProfileAllocatorDTOList.length) {
						maxIteration = value.riskProfileAllocatorDTOList.length;
					}
				});
				var tbody = "";
				for (ite = 0;ite < maxIteration; ite ++) {
					var finYear="";
					for (goalIndex = 0; goalIndex < goalIdList.length; goalIndex ++) {
						if (data[goalIndex] != null) {
							if (data[goalIndex].riskProfileAllocatorDTOList[ite] != null) {
								finYear = data[goalIndex].riskProfileAllocatorDTOList[ite].finYear;
							}
						}
					}
					
					tbody = tbody + "<tr><td>"+finYear+"</td>";
					for (goalIndex = 0; goalIndex < goalIdList.length; goalIndex ++) {
						var flag = 0;
						for (dataIndex = 0 ; dataIndex < data.length; dataIndex ++){
							if(data[dataIndex] != null && data[dataIndex].riskProfileAllocatorDTOList[ite] != null && data[dataIndex].goalId == goalIdList[goalIndex]) {
								tbody = tbody + "<td>"+data[dataIndex].riskProfileAllocatorDTOList[ite].riskProfile
								+"</td><td>"+maskAmountValue(Math.round(parseFloat(data[dataIndex].riskProfileAllocatorDTOList[ite].totalAllocate).toFixed(2)))+"</td>";
								flag = 1;
							}
						}
						if (flag == 0) {
							tbody = tbody + "<td></td><td></td>";
						}
					}
					tbody = tbody + "</tr>";
				}
				$('#idAllocateTbody').append(tbody);
				$('#idAllocateTbodyModal').append(tbody);
			} else {
				$('#idAsssetAllocationTable').hide();
				$('#idAsssetAllocationTableModal').hide();
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
			$('#idAllocateTbody').empty()
			$('#idAllocateTbodyModal').empty();
		}
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
	alert("unloaded");
};


$(function()
		{
	$(".popupwindow").popupwindow(profiles);
		});	

var modal = document.getElementById('idpoprecommendedaa');

//Get the button that opens the modal
var btn = document.getElementById("idMaxrecommendedaa");

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
for(var indexModal=0; indexModal < goalIdList.length; indexModal++) {
	var modal3 = document.getElementById('idpopEducationPG');
	//Get the button that opens the modal
	var btn3 = document.getElementById('idmaxeducationpg'+indexModal);

	//Get the <span> element that closes the modal
	var span1 = document.getElementsByClassName("close"+indexModal)[0];

	// Get the <span> element that closes the modal
	var span3 = document.getElementsByClassName("close3")[0];

	// When the user clicks the button, open the modal 
	btn3.onclick = function() {
		$(".onpopupscroller").css("overflow","hidden");
		modal3.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span3.onclick = function() {
		$(".onpopupscroller").css("overflow","visible");
		modal3.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal3) {
			modal3.style.display = "none";
		}
	}
}

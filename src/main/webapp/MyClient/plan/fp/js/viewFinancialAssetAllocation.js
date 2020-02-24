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
	
	var recompavright = $('.jssort21 div:nth-child(2) div:nth-child(6) div');
    var recompavleft = $('.jssort21 div:nth-child(2) div:nth-child(2) div');

	$(".Incomeright").click(function(){
		if(recompavright.hasClass('pav'))
		{	       
			$("#idBody").empty();
	        $("#idBody").load("plan/fp/viewContingencyFund.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Contingency Fund");
			$(".fpassetallocation").removeClass("activeitem");
			$(".fpcontigencyfund").addClass("activeitem");
	
			
			
			
		   
		};
	});
	
		$(".Incomeleft").click(function(){
		if(recompavleft.hasClass('pav'))
		{	       
	       	$("#idBody").empty();
	        $("#idBody").load("plan/fp/viewFinancialRiskProfile.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Risk Profile");
			$(".fpassetallocation").removeClass("activeitem");
			$(".fpriskprofile").addClass("activeitem");
			
			
			
		   
		};
		
});
//  Asset Class table And Asset class Pie chart	
var assetcolorNumbering={};

assetcolorNumbering[0]="#95ceff";
assetcolorNumbering[1]="#f7a35c";
assetcolorNumbering[2]="#90ed7d";
assetcolorNumbering[3]="#8085d9";
assetcolorNumbering[4]="#f15c80";
assetcolorNumbering[5]="#5adedc";
assetcolorNumbering[6]="#70ceff";
assetcolorNumbering[7]="#95baff";
assetcolorNumbering[8]="#f7ceff";
assetcolorNumbering[9]="#958dff";		
var assetPieChartDataList=[];
var currentAssetVSRecommededBarChartList=[];
var assetcolorCount=0;	
var circleImageCount=1;
var totalAssetValue=0;
var colorCircle="";

$.ajax({
	type: 'GET',
	url: REQUEST_URL_PM+'/getClientPortfolioAssetReview?clientId='+vClientId+'&specificRequermentStat=%22overview%22',
	async: false,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		$("#assetAllocatiotionReviewTable").empty();
		$("#assetAllocatiotionReviewTablemodal").empty();

		$.each(data, function (index, assetAllocation) { 
			if(assetAllocation.investmentAssetClass!="Total"){
				colorInRow(assetAllocation.investmentAssetClass);
				$("#assetAllocatiotionReviewTable").append("<tr>  <td>"+colorCircle+ "&nbsp; "+assetAllocation.investmentAssetClass+"</td>"+
						"<td>"+maskAmountValue(Math.round(assetAllocation.currentValue))+"</td>"+
						"<td>"+(parseFloat(assetAllocation.portFoliototalPercentage).toFixed(2))+"</td>"+
						"<td>"+((assetAllocation.assetClassId==3 ||assetAllocation.assetClassId==2) && assetAllocation.investmentValue==0  ?"N/A": maskAmountValue(Math.round(assetAllocation.investmentValue)))+"</td>"+
						"<td>"+((assetAllocation.assetClassId==3 ||assetAllocation.assetClassId==2) && assetAllocation.investmentValue==0 ?"N/A":maskAmountValue(Math.round(assetAllocation.profitLoss)))+"</td>"+
						"<td>"+(assetAllocation.cagr_xirr == null || isNaN(assetAllocation.cagr_xirr)?(assetAllocation.assetClassId==3 && assetAllocation.investmentValue==0 ?"N/A": 0.00) : (assetAllocation.assetClassId==3 && assetAllocation.investmentValue==0 ?"N/A":parseFloat(assetAllocation.cagr_xirr).toFixed(2)))+"</td>"+



				"</tr> ");

				$("#assetAllocatiotionReviewTablemodal").append("<tr><td>"+colorCircle+ "&nbsp; "+assetAllocation.investmentAssetClass+"</td>"+
						"<td>"+maskAmountValue(Math.round(assetAllocation.currentValue))+"</td>"+
						"<td>"+(parseFloat(assetAllocation.portFoliototalPercentage).toFixed(2))+"</td>"+
						"<td>"+maskAmountValue(Math.round(assetAllocation.investmentValue))+"</td>"+
						"<td>"+maskAmountValue(Math.round(assetAllocation.profitLoss))+"</td>"+
						"<td>"+(assetAllocation.cagr_xirr == null || isNaN(assetAllocation.cagr_xirr)? 0.00 : parseFloat(assetAllocation.cagr_xirr).toFixed(2))+"</td>"+

				"</tr> ");

			}else{
				$("#assetAllocatiotionReviewTable").append("<tr class='nonglidtotal'>  <td> <img src='../Common/assets/images/circle"+(index+1)+".png'/> &nbsp; <b>"+assetAllocation.investmentAssetClass+"</b></td>"+
						"<td><b>"+maskAmountValue(Math.round(assetAllocation.currentValue))+"</b></td>"+
						"<td><b>"+(parseFloat(assetAllocation.portFoliototalPercentage))+"</b></td>"+
						"<td><b>"+maskAmountValue(Math.round(assetAllocation.investmentValue))+"</b></td>"+
						"<td><b>"+maskAmountValue(Math.round(assetAllocation.profitLoss))+"</b></td>"+
						"<td><b>"+(assetAllocation.cagr_xirr == null || isNaN(assetAllocation.cagr_xirr)? 0.00 : parseFloat(assetAllocation.cagr_xirr).toFixed(2))+"</b></td>"+
				"</tr> ");

				$("#assetAllocatiotionReviewTablemodal").append("<tr class='nonglidtotal'>  <td> <img src='../Common/assets/images/circle"+(index+1)+".png'/> &nbsp; <b>"+assetAllocation.investmentAssetClass+"</b></td>"+
						"<td><b>"+maskAmountValue(Math.round(assetAllocation.currentValue))+"</b></td>"+
						"<td><b>"+parseFloat(assetAllocation.portFoliototalPercentage).toFixed(2)+"</b></td>"+
						"<td><b>"+maskAmountValue(Math.round(assetAllocation.investmentValue))+"</b></td>"+
						"<td><b>"+maskAmountValue(Math.round(assetAllocation.profitLoss))+"</b></td>"+
						"<td><b>"+(assetAllocation.cagr_xirr == null || isNaN(assetAllocation.cagr_xirr)? 0.00 : parseFloat(assetAllocation.cagr_xirr).toFixed(2))+"</b></td>"+
				"</tr> ");

				$("#expPortfolioReturnPerct").append((assetAllocation.cagr_xirr == null || isNaN(assetAllocation.cagr_xirr)? 0.00 : parseFloat(assetAllocation.cagr_xirr).toFixed(2)));
				$("#expPortfolioReturnPerctModal").append((assetAllocation.cagr_xirr == null || isNaN(assetAllocation.cagr_xirr)? 0.00 : parseFloat(assetAllocation.cagr_xirr).toFixed(2)));
			
				$("#recomPortfolioReturnPerct").append(parseFloat(assetAllocation.totalExpectedRecommed==null?0:assetAllocation.totalExpectedRecommed).toFixed(2));
				$("#recomPortfolioReturnPerctModal").append(parseFloat(assetAllocation.totalExpectedRecommed).toFixed(2));
			
				$("#expPortfolioReturnCurrentRisk").append((assetAllocation.totalRiskExpectedCurrent == null || isNaN(assetAllocation.totalRiskExpectedCurrent)? 0.00 : parseFloat(assetAllocation.totalRiskExpectedCurrent).toFixed(2)));
				$("#recomPortfolioReturnREcommendRisk").append((assetAllocation.totalRiskExpectedRecommed == null || isNaN(assetAllocation.totalRiskExpectedRecommed)? 0.00 : parseFloat(assetAllocation.totalRiskExpectedRecommed).toFixed(2)));
				//$("#expPortfolioReturnPerctModal").append((assetAllocation.cagr_xirr == null || isNaN(assetAllocation.cagr_xirr)? 0.00 : parseFloat(assetAllocation.cagr_xirr).toFixed(2)));
				
				
			}
			/*	$("#popupAssetClasses").append("<tr>  <td> <img src='../Common/assets/images/circle"+circleImageCount+".png'/> &nbsp; "+typesubassetsProductsindex+"</td>"+
								"								<td>"+parseFloat(totalProductType).toFixed(2)+""+ 
																"</td>"+
																"<td > "+parseFloat((parseFloat(totalProductType).toFixed(2)/totalAssetMap[typesubassetsindex])*100).toFixed(2)+""+
																"%</td>"+
															"</tr> ");*/


			circleImageCount=circleImageCount+1;
		});

		//	console.log(JSON.stringify(totalAssetValue));
		$.each(data, function (index, assetAllocation) { 
			if(assetAllocation.investmentAssetClass!="Total")
			{
				var assetPieChartObject = {};
				assetPieChartObject['name']=assetAllocation.investmentAssetClass;
				assetPieChartObject['y']=parseFloat(assetAllocation.portFoliototalPercentage);
				//assetPieChartObject['color']=assetcolorNumbering[assetcolorCount];
				if(assetAllocation.investmentAssetClass=="Equity"){
					
				    assetPieChartObject['color']="#90ed7d";
				   
				}
				if(assetAllocation.investmentAssetClass=="Cash"){
					
					assetPieChartObject['color']="#95ceff";
					
				}
				if(assetAllocation.investmentAssetClass=="FixedIncome"){
					 
					assetPieChartObject['color']="#f7a35c";
					
				}
				if(assetAllocation.investmentAssetClass=="Alternate"){
					 
					assetPieChartObject['color']="#8085d9";
					
				}
				assetPieChartDataList.push(assetPieChartObject);
				
				assetcolorCount=assetcolorCount+1;
			}});

		//	console.log(JSON.stringify(assetPieChartDataList));
		populateAssetClassVsRecommedAssetClass(data);

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


//Asset class vs recommed class %


function populateAssetClassVsRecommedAssetClass(data)
{

	var circleImageCount=0;
	var assetcolorCount=0;
	$("#assetClassVsRecommedClass").empty();
	$("#assetClassVsRecommedClassModal").empty();
	$.each(data, function (index, assetAllocation) { 
		if(assetAllocation.investmentAssetClass!="Total")
		{
			colorInRow(assetAllocation.investmentAssetClass);
			$("#assetClassVsRecommedClass").append("<tr>  <td>"+colorCircle+ "&nbsp; "+assetAllocation.investmentAssetClass+"</td>"+
					"<td>"+parseFloat(assetAllocation.portFoliototalPercentage).toFixed(2)+"</td>"+
					"<td>"+parseFloat(assetAllocation.recomentTotalPercentage).toFixed(2)+"</td>"+
			"</tr> ");
			$("#assetClassVsRecommedClassModal").append("<tr>  <td>"+colorCircle+ "&nbsp; "+assetAllocation.investmentAssetClass+"</td>"+
					"<td>"+parseFloat(assetAllocation.portFoliototalPercentage).toFixed(2)+"</td>"+
					"<td>"+parseFloat(assetAllocation.recomentTotalPercentage).toFixed(2)+"</td>"+
			"</tr> ");
			totalAssetValue = totalAssetValue+assetAllocation.currentValue;
			var curretVsRecomBarChartObject = {};
			curretVsRecomBarChartObject['name']=assetAllocation.investmentAssetClass;
			var dataList=[];
			dataList.push(parseFloat(assetAllocation.portFoliototalPercentage));
			dataList.push(parseFloat(assetAllocation.recomentTotalPercentage));
			curretVsRecomBarChartObject['data']=dataList;
			//curretVsRecomBarChartObject['color']=assetcolorNumbering[assetcolorCount];
			//piyali
			if(assetAllocation.investmentAssetClass=="Equity"){
				
			  
			    curretVsRecomBarChartObject['color']="#90ed7d";
			}
			if(assetAllocation.investmentAssetClass=="Cash"){
				
				
				curretVsRecomBarChartObject['color']="#95ceff";
			}
			if(assetAllocation.investmentAssetClass=="FixedIncome"){
				 
			
				curretVsRecomBarChartObject['color']="#f7a35c";
			}
			if(assetAllocation.investmentAssetClass=="Alternate"){
				 
			
				curretVsRecomBarChartObject['color']="#8085d9";
			}
			currentAssetVSRecommededBarChartList.push(curretVsRecomBarChartObject);
		}else
		{
			$("#assetClassVsRecommedClass").append("<tr class='nonglidtotal'>  <td> <img src='../Common/assets/images/circle"+(index+1)+".png'/> &nbsp; <b>"+assetAllocation.investmentAssetClass+"</b></td>"+
					"<td><b>"+parseFloat(assetAllocation.portFoliototalPercentage).toFixed(2)+"</b></td>"+
					"<td><b>"+parseFloat(assetAllocation.recomentTotalPercentage).toFixed(2)+"</b></td>"+
			"</tr> ");		
			$("#assetClassVsRecommedClassModal").append("<tr class='nonglidtotal'>  <td> <img src='../Common/assets/images/circle"+(index+1)+".png'/> &nbsp; <b>"+assetAllocation.investmentAssetClass+"</b></td>"+
					"<td><b>"+parseFloat(assetAllocation.portFoliototalPercentage).toFixed(2)+"</b></td>"+
					"<td><b>"+parseFloat(assetAllocation.recomentTotalPercentage).toFixed(2)+"</b></td>"+
			"</tr> ");		
		}

		circleImageCount=circleImageCount+1;
		assetcolorCount=assetcolorCount+1;
	});	
//	console.log(JSON.stringify(currentAssetVSRecommededBarChartList));
}



/// Current asset Percentage vs Recommeded Percentage

/*start*/
Highcharts.chart('idcurrentVsrecommended', {
	chart: {
		type: 'column'
	},
	title: {
		text: 'Current Asset Allocation Vs Recommended Asset Allocation'
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
	series: currentAssetVSRecommededBarChartList
});

/****************  end************************/


/// Current asset Percentage vs Recommeded Percentage popup			

Highcharts.chart('idcurrentVsrecommendedpop', {
	chart: {
		type: 'column'
	},
	title: {
		text: 'Current Asset Allocation Vs Recommended Asset Allocation'
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
	series: currentAssetVSRecommededBarChartList
});
('idcurrentVsrecommendedpop', {
	chart: {
		type: 'column'
	},
	title: {
		text: 'Current Asset Allocation Vs Recommended Asset Allocation'
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
	series: currentAssetVSRecommededBarChartList
});
/*********************************** END **************************/



/***************** sub asset class ************************/
var subAssetClassPieChartList=[];
var subAssetCurrentAllocVsRecommendedBarChartList=[];
var totalCurrentValue=0;
$.ajax({
	type: 'GET',
	url: REQUEST_URL_PM+'/getClientPortfolioSubAssetReview?clientId='+vClientId+'&specificRequermentStat=%22overview%22',
	async: false,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		var circleImageCount=0;
		$("#subAssetClassTable").empty();
		$("#subAssetClassTableModal").empty();
		$("#subAssetCurrentAllVsRecommenAllTable").empty();
		$("#subAssetCurrentAllVsRecommenAllTablePopup").empty();
		$("#subAssetBenchMarkTable").empty();
		$("#subAssetBenchMarkTableModal").empty();

		$.each(data.portfolioAssetListMap, function (index, subAssetAllocation) { 
			$.each(subAssetAllocation, function (subindex, subassetAllocationvalue) { 			
				totalCurrentValue =totalCurrentValue+subassetAllocationvalue.currentValue;
			});
		});
//		console.log("total current value ="+totalCurrentValue);
		$.each(data.portfolioAssetListMap, function (index, subAssetAllocation) { 

			$("#subAssetClassTable").append("<tr> <td><b>"+index+"</td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
			"</tr> ");

			$("#subAssetClassTableModal").append("<tr> <td><b>"+index+"</td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
			"</tr> ");

			$("#subAssetBenchMarkTable").append("<tr> <td><b>"+index+"</td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
			"</tr> ");

			$("#subAssetBenchMarkTableModal").append("<tr> <td><b>"+index+"</td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
			"</tr> ");


			$("#subAssetCurrentAllVsRecommenAllTable").append("<tr> <td><b>"+index+"</td>"+
					"<td></td>"+
					"<td></td>"+
			"</tr> ");

			$("#subAssetCurrentAllVsRecommenAllTablePopup").append("<tr> <td><b>"+index+"</td>"+
					"<td></td>"+
					"<td></td>"+
			"</tr> ");



			$.each(subAssetAllocation, function (subindex, subAssetAllocationValue) {
				var investmentVal = 0;
				if(subAssetAllocationValue.investmentValue != null && subAssetAllocationValue.investmentValue != 0) {
					if(subAssetAllocationValue.assetClassId != 13 || subAssetAllocationValue.assetClassId != 17) {
						investmentVal = maskAmountValue(Math.round(subAssetAllocationValue.investmentValue));
					}
				}
				var profitLoss = 0;
				if(subAssetAllocationValue.profitLoss != null && subAssetAllocationValue.profitLoss != 0) {
					if(subAssetAllocationValue.assetClassId != 13 || subAssetAllocationValue.assetClassId != 17) {
						profitLoss = maskAmountValue(Math.round(subAssetAllocationValue.profitLoss));
					}
				}
				
				colorInRow(subAssetAllocationValue.investmentSubAssetClass);
				$("#subAssetClassTable").append("<tr>  <td>"+colorCircle+ "&nbsp; "+subAssetAllocationValue.investmentSubAssetClass+"</td>"+
						"<td>"+(subAssetAllocationValue.currentValue == null ? "0.00" : maskAmountValue(Math.round(subAssetAllocationValue.currentValue)))+"</td>"+
						"<td>"+parseFloat(subAssetAllocationValue.portFoliototalPercentage.toFixed(2))+"</td>"+
						"<td>"+investmentVal+"</td>"+
						"<td>"+profitLoss+"</td>"+
						"<td>"+(subAssetAllocationValue.cagr_xirr==null || subAssetAllocationValue.cagr_xirr==0?(subAssetAllocationValue.assetClassId==17)?"N/A":0.00:parseFloat(subAssetAllocationValue.cagr_xirr).toFixed(2))+"%</td>"+"</tr> ");
						//"<td class='nonglidtotal'>"+(subAssetAllocationValue.recomentTotalPercentage==null || .recomentTotalPercentage==0?0.00:parseFloat(subAssetAllocationValue.recomentTotalPercentage).toFixed(2))+"%</td>"+
				

				$("#subAssetClassTableModal").append("<tr>  <td>"+colorCircle+ "&nbsp; "+subAssetAllocationValue.investmentSubAssetClass+"</td>"+
						"<td>"+(subAssetAllocationValue.currentValue == null ? "0.00" : maskAmountValue(Math.round(subAssetAllocationValue.currentValue)))+"</td>"+
						"<td>"+parseFloat(subAssetAllocationValue.portFoliototalPercentage.toFixed(2))+"</td>"+
						"<td>"+investmentVal+"</td>"+
						"<td>"+profitLoss+"</td>"+
						"<td>"+(subAssetAllocationValue.cagr_xirr==null || subAssetAllocationValue.cagr_xirr==0?(subAssetAllocationValue.assetClassId==17)?"N/A":0.00:parseFloat(subAssetAllocationValue.cagr_xirr).toFixed(2))+"%</td>"+"</tr> ");
				
				console.log("1");
				var subassetPieChartObject = {};
				subassetPieChartObject['name']=subAssetAllocationValue.investmentSubAssetClass;
				var currentVal = subAssetAllocationValue.currentValue == null ? 0 : subAssetAllocationValue.currentValue;
				subassetPieChartObject['y']=parseFloat((subAssetAllocationValue.currentValue/totalCurrentValue)*100);
			//	subassetPieChartObject['color']=assetcolorNumbering[assetcolorCount];
				
				console.log("2");
				   if(subAssetAllocationValue.investmentSubAssetClass=="Cash/Liquid"){
					   subassetPieChartObject['color']="#95ceff";
					
					}
				   if(subAssetAllocationValue.investmentSubAssetClass=="Ultra Short Term Debt"){
					   subassetPieChartObject['color']="#f7a35c";
						
					}
				   if(subAssetAllocationValue.investmentSubAssetClass=="Long Term Debt"){
					   subassetPieChartObject['color']="#8085d9";
						
					}
					
					if(subAssetAllocationValue.investmentSubAssetClass=="Short Term Debt"){
						subassetPieChartObject['color']="#90ed7d";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Equity Large Cap"){
						subassetPieChartObject['color']="#f15c80";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Equity Mid and Small Cap"){
						subassetPieChartObject['color']="#727276";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Equity International"){
						subassetPieChartObject['color']="#5adedc";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Alternatives - Precious Metals"){
						subassetPieChartObject['color']="#9164aa";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Alternatives - Real Estate"){
						subassetPieChartObject['color']="#cdaa5f";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Alternatives - Others"){
						subassetPieChartObject['color']="#558769";
						
					}
					console.log("3");
				subAssetClassPieChartList.push(subassetPieChartObject);
				assetcolorCount=assetcolorCount+1;
				console.log("4");
				if(subAssetAllocationValue.portSubAssetBechMark!=null)
				{
					$("#subAssetBenchMarkTable").append("<tr><td>" +
							"<img src='../Common/assets/images/circle"+(index+1)+".png'/> &nbsp; "
							+subAssetAllocationValue.investmentSubAssetClass+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.benchMark==null?"N/A":subAssetAllocationValue.portSubAssetBechMark.benchMark)+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.month1Value == null || isNaN(subAssetAllocationValue.portSubAssetBechMark.month1Value )? '-' : (subAssetAllocationValue.portSubAssetBechMark.month1Value == -100)?'-':parseFloat(subAssetAllocationValue.portSubAssetBechMark.month1Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.month3Value == null || isNaN(subAssetAllocationValue.portSubAssetBechMark.month3Value )? '-' : (subAssetAllocationValue.portSubAssetBechMark.month3Value == -100)?'-':parseFloat(subAssetAllocationValue.portSubAssetBechMark.month3Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.month6Value == null || isNaN(subAssetAllocationValue.portSubAssetBechMark.month6Value )? '-' : (subAssetAllocationValue.portSubAssetBechMark.month6Value == -100)?'-':parseFloat(subAssetAllocationValue.portSubAssetBechMark.month6Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.year1Value == null  || isNaN(subAssetAllocationValue.portSubAssetBechMark.year1Value  )? '-' : (subAssetAllocationValue.portSubAssetBechMark.year1Value  == -100)?'-':parseFloat(subAssetAllocationValue.portSubAssetBechMark.year1Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.year3Value == null  || isNaN(subAssetAllocationValue.portSubAssetBechMark.year3Value  )? '-' : (subAssetAllocationValue.portSubAssetBechMark.year3Value  == -100)?'-':parseFloat(subAssetAllocationValue.portSubAssetBechMark.year3Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.year5Value == null  || isNaN(subAssetAllocationValue.portSubAssetBechMark.year5Value  )? '-' : (subAssetAllocationValue.portSubAssetBechMark.year5Value  == -100)?'-':parseFloat(subAssetAllocationValue.portSubAssetBechMark.year5Value).toFixed(2))+"</td></tr> ");
							//"<td>"+(subAssetAllocationValue.portSubAssetBechMark.riskStdDev == null  || isNaN(subAssetAllocationValue.portSubAssetBechMark.riskStdDev)  ? '-' :  parseFloat(subAssetAllocationValue.portSubAssetBechMark.riskStdDev).toFixed(2))+"</td></tr> ");


					/*$("#subAssetBenchMarkTableModal").append("<tr><td>" +
							"<img src='../Common/assets/images/circle"+(index+1)+".png'/> &nbsp; "
							+subAssetAllocationValue.investmentSubAssetClass+"</td>"+
							"<td>"+subAssetAllocationValue.portSubAssetBechMark.benchMark+"</td>"+
							"<td>"+subAssetAllocationValue.portSubAssetBechMark.month1Value == null? '' :  parseFloat(subAssetAllocationValue.portSubAssetBechMark.month1Value).toFixed(2)+"</td>"+
									"<td>"+subAssetAllocationValue.portSubAssetBechMark.month3Value == null? '' :  parseFloat(subAssetAllocationValue.portSubAssetBechMark.month3Value).toFixed(2)+"</td>"+
											"<td>"+subAssetAllocationValue.portSubAssetBechMark.month6Value == null? '' :  parseFloat(subAssetAllocationValue.portSubAssetBechMark.month6Value).toFixed(2)+"</td>"+
													"<td>"+subAssetAllocationValue.portSubAssetBechMark.year1Value == null? '' :   parseFloat(subAssetAllocationValue.portSubAssetBechMark.year1Value).toFixed(2)+"</td>"+
															"<td>"+subAssetAllocationValue.portSubAssetBechMark.year3Value == null? '' :   parseFloat(subAssetAllocationValue.portSubAssetBechMark.year3Value).toFixed(2)+"</td>"+
																	"<td>"+subAssetAllocationValue.portSubAssetBechMark.year5Value == null? '' :   parseFloat(subAssetAllocationValue.portSubAssetBechMark.year5Value).toFixed(2)+"</td></tr> ");
																			//"<td>"+subAssetAllocationValue.portSubAssetBechMark.riskStdDev == null? '' :   parseFloat(subAssetAllocationValue.portSubAssetBechMark.riskStdDev).toFixed(2)+"</td></tr> ");
*/
					

					$("#subAssetBenchMarkTableModal").append("<tr><td>" +
							"<img src='../Common/assets/images/circle"+(index+1)+".png'/> &nbsp; "
							+subAssetAllocationValue.investmentSubAssetClass+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.benchMark==null?"N/A":subAssetAllocationValue.portSubAssetBechMark.benchMark)+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.month1Value == null || isNaN(subAssetAllocationValue.portSubAssetBechMark.month1Value)? '-' : parseFloat(subAssetAllocationValue.portSubAssetBechMark.month1Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.month3Value == null || isNaN(subAssetAllocationValue.portSubAssetBechMark.month3Value)? '-' : parseFloat(subAssetAllocationValue.portSubAssetBechMark.month3Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.month6Value == null || isNaN(subAssetAllocationValue.portSubAssetBechMark.month6Value)? '-' : parseFloat(subAssetAllocationValue.portSubAssetBechMark.month6Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.year1Value == null  || isNaN(subAssetAllocationValue.portSubAssetBechMark.year1Value)? '-' :  parseFloat(subAssetAllocationValue.portSubAssetBechMark.year1Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.year3Value == null  || isNaN(subAssetAllocationValue.portSubAssetBechMark.year3Value)? '-' :  parseFloat(subAssetAllocationValue.portSubAssetBechMark.year3Value).toFixed(2))+"</td>"+
							"<td>"+(subAssetAllocationValue.portSubAssetBechMark.year5Value == null  || isNaN(subAssetAllocationValue.portSubAssetBechMark.year5Value)? '-' :  parseFloat(subAssetAllocationValue.portSubAssetBechMark.year5Value).toFixed(2))+"</td></tr> ");
							//"<td>"+(subAssetAllocationValue.portSubAssetBechMark.riskStdDev == null  || isNaN(subAssetAllocationValue.portSubAssetBechMark.riskStdDev)  ? '-' :  parseFloat(subAssetAllocationValue.portSubAssetBechMark.riskStdDev).toFixed(2))+"</td></tr> ");


				}
				console.log("5");
				colorInRow(subAssetAllocationValue.investmentSubAssetClass);
				$("#subAssetCurrentAllVsRecommenAllTable").append("<tr> <td>"+colorCircle+ "&nbsp; "+subAssetAllocationValue.investmentSubAssetClass+"</td>"+
						"<td>"+parseFloat(subAssetAllocationValue.portFoliototalPercentage).toFixed(2)+"%</td>"+
						"<td>"+parseFloat(subAssetAllocationValue.recomentTotalPercentage).toFixed(2)+"%</td>"+
				"</tr> ");
				console.log("6");
				$("#subAssetCurrentAllVsRecommenAllTablePopup").append("<tr> <td>"+colorCircle+ "&nbsp; "+subAssetAllocationValue.investmentSubAssetClass+"</td>"+
						"<td>"+parseFloat(subAssetAllocationValue.portFoliototalPercentage).toFixed(2)+"%</td>"+
						"<td>"+parseFloat(subAssetAllocationValue.recomentTotalPercentage).toFixed(2)+"%</td>"+
				"</tr> ");

				var subassetcurrVsRecomBarChartObject = {};
				var dataList=[];
				dataList.push(parseFloat(subAssetAllocationValue.portFoliototalPercentage));
				dataList.push(parseFloat(subAssetAllocationValue.recomentTotalPercentage));
				subassetcurrVsRecomBarChartObject['data']=dataList;
				subassetcurrVsRecomBarChartObject['name']=subAssetAllocationValue.investmentSubAssetClass;
				//subassetcurrVsRecomBarChartObject['color']=assetcolorNumbering[assetcolorCount];
				 if(subAssetAllocationValue.investmentSubAssetClass=="Cash/Liquid"){
					   subassetPieChartObject['color']="#95ceff";
					
					}
				   if(subAssetAllocationValue.investmentSubAssetClass=="Ultra Short Term Debt"){
					   subassetPieChartObject['color']="#f7a35c";
						
					}
				   if(subAssetAllocationValue.investmentSubAssetClass=="Long Term Debt"){
					   subassetPieChartObject['color']="#8085d9";
						
					}
					
					if(subAssetAllocationValue.investmentSubAssetClass=="Short Term Debt"){
						subassetPieChartObject['color']="#90ed7d";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Equity Large Cap"){
						subassetPieChartObject['color']="#f15c80";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Equity Mid and Small Cap"){
						subassetPieChartObject['color']="#727276";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Equity International"){
						subassetPieChartObject['color']="#5adedc";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Alternatives - Precious Metals"){
						subassetPieChartObject['color']="#9164aa";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Alternatives - Real Estate"){
						subassetPieChartObject['color']="#cdaa5f";
						
					}
					if(subAssetAllocationValue.investmentSubAssetClass=="Alternatives - Others"){
						subassetPieChartObject['color']="#558769";
						
					}
				subAssetCurrentAllocVsRecommendedBarChartList.push(subassetcurrVsRecomBarChartObject);
				assetcolorCount=assetcolorCount+1;	
				console.log("7");
			});

			//	totalAssetValue = totalAssetValue+assetAllocation.currentValue;										
			circleImageCount=circleImageCount+1;
		});
//		console.log(JSON.stringify(totalAssetValue));

		//	console.log(JSON.stringify(assetPieChartDataList));
		
		$("#subAssetClassTable").append("<tr class='nonglidtotal'> <td><b>"+data.investmentAssetClass+"</td>"+
				"<td>"+maskAmountValue(Math.round(data.currentValue))+"</td>"+
				"<td>"+parseFloat(data.portFoliototalPercentage).toFixed(2)+"</td>"+
				"<td>"+maskAmountValue(Math.round(data.investmentValue))+"</td>"+
				"<td>"+maskAmountValue(Math.round(data.profitLoss))+"</td>"+
				"<td>"+(data.cagr_xirr==null || subAssetAllocationValue.cagr_xirr==0?0.00:parseFloat(data.cagr_xirr.toFixed(2)))+"</td>"+
				//"<td class='nonglidtotal'>"+(data.recomentTotalPercentage==null || data.recomentTotalPercentage==0?0.00:parseFloat(data.recomentTotalPercentage.toFixed(2)))+"</td>"+
		"</tr> ");

		$("#subAssetClassTableModal").append("<tr class='nonglidtotal'> <td><b>"+data.investmentAssetClass+"</td>"+
				"<td>"+maskAmountValue(Math.round(data.currentValue))+"</td>"+
				"<td>"+parseFloat(data.portFoliototalPercentage).toFixed(2)+"</td>"+
				"<td>"+maskAmountValue(Math.round(data.investmentValue))+"</td>"+
				"<td>"+maskAmountValue(Math.round(data.profitLoss))+"</td>"+
				"<td>"+(data.cagr_xirr==null || subAssetAllocationValue.cagr_xirr==0?0.00:parseFloat(data.cagr_xirr.toFixed(2)))+"</td>"+
				//"<td class='nonglidtotal'>"+parseFloat(data.recomentTotalPercentage).toFixed(2)+"</td>"+
		"</tr> ");

//		console.log(JSON.stringify(subAssetClassPieChartList));


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



Highcharts.chart('idcurrentsubassets', {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
	title: {
		text: 'Current Asset Allocation'
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
		data: subAssetClassPieChartList
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
		text: 'Current Asset Allocation'
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
		data: subAssetClassPieChartList
	}]
});

Highcharts.chart('idassets', {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
	title: {
		text: 'Assets'
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
			},
			size: 200
		}
	},

	series: [{
		name: 'Assets',
		colorByPoint: true,
		data: assetPieChartDataList
	}]
});

Highcharts.chart('idassetspop', {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
	title: {
		text: 'Assets'
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
		data: assetPieChartDataList
	}]
});


///   current allocation vs recommeded percent

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
	series: subAssetCurrentAllocVsRecommendedBarChartList
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
	series:subAssetCurrentAllocVsRecommendedBarChartList
});


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
//		console.log(data.historicalPFReturnList);
		$.each(data, function (index, value) {

			historicalReturnvalues.push(value.assetReturn);
			historicalReturnyear.push(value.year);
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

	$('#idnetpop').highcharts({
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
/***********************************************    End of custom Service UI Integration ************************/		



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

var modal1 = document.getElementById("idpoprecommendedaa");

//Get the button that opens the modal
var btn1 = document.getElementById("idmaxrecommendedaa");

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



var modal2 = document.getElementById("idpopcurrentsubaa");

//Get the button that opens the modal
var btn2 = document.getElementById("idMaxcurrentsubaa");

//Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

//When the user clicks the button, open the modal 
btn2.onclick = function() {
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



var modal3 = document.getElementById("idpopbenchmark");

//Get the button that opens the modal
var btn3 = document.getElementById("idmaxbenchmark");

//Get the <span> element that closes the modal
var span3 = document.getElementsByClassName("close3")[0];

//When the user clicks the button, open the modal 
btn3.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal3.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span3.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal3.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal3) {
		modal3.style.display = "none";
	}
}


var modal4 = document.getElementById("idpoprecommendedsubaa");

//Get the button that opens the modal
var btn4 = document.getElementById("idMaxrecommendedsubaa");

//Get the <span> element that closes the modal
var span4 = document.getElementsByClassName("close4")[0];

//When the user clicks the button, open the modal 
btn4.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal4.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span4.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal4.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal4) {
		modal4.style.display = "none";
	}
}

function colorInRow(investmentAssetClass){
	
	if(investmentAssetClass=="Equity"){
	 colorCircle="<img src='../Common/assets/images/circle4.png'/>";
	
	}
	if(investmentAssetClass=="Cash"){
		 colorCircle="<img src='../Common/assets/images/circle2.png'/>";
		
	}
	if(investmentAssetClass=="FixedIncome"){
		 colorCircle="<img src='../Common/assets/images/circle3.png'/>";
		
	}
	if(investmentAssetClass=="Alternate"){
		 colorCircle="<img src='../Common/assets/images/circle5.png'/>";
		
	}
	
	   if(investmentAssetClass=="Cash/Liquid"){
		 colorCircle="<img src='../Common/assets/images/circle2.png'/>";
		
		}
	   if(investmentAssetClass=="Ultra Short Term Debt"){
			 colorCircle="<img src='../Common/assets/images/circle3.png'/>";
			
		}
	   if(investmentAssetClass=="Long Term Debt"){
			 colorCircle="<img src='../Common/assets/images/circle5.png'/>";
			
		}
		
		if(investmentAssetClass=="Short Term Debt"){
			 colorCircle="<img src='../Common/assets/images/circle4.png'/>";
			
		}
		if(investmentAssetClass=="Equity Large Cap"){
			 colorCircle="<img src='../Common/assets/images/circle6.png'/>";
			
		}
		if(investmentAssetClass=="Equity Mid and Small Cap"){
			 colorCircle="<img src='../Common/assets/images/circle7.png'/>";
			
		}
		if(investmentAssetClass=="Equity International"){
			 colorCircle="<img src='../Common/assets/images/circle8.png'/>";
			
		}
		if(investmentAssetClass=="Alternatives - Precious Metals"){
			 colorCircle="<img src='../Common/assets/images/circle9.png'/>";
			
		}
		if(investmentAssetClass=="Alternatives - Real Estate"){
			 colorCircle="<img src='../Common/assets/images/circle10.png'/>";
			
		}
		if(investmentAssetClass=="Alternatives - Others"){
			 colorCircle="<img src='../Common/assets/images/circle11.png'/>";
			
		}
		
}



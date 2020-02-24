$(".form-section-container").css("padding","18px 45px 70px 45px");
var jssor_15_SlideshowTransitions = [
	{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


	];

var jssor_15_options = {
		$AutoPlay: 1,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: jssor_15_SlideshowTransitions,
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

var jssor_15_slider = new $JssorSlider$("jssor_15", jssor_15_options);

var ratiopavright = $('.jssort15 div:nth-child(2) div:nth-child(3) div');
var ratiopavleft = $('.jssort15 div:nth-child(2) div:nth-child(2) div');

$(".ratioright").click(function(){
	if(ratiopavright.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioAssetAllocation.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$(".glidnonglid").hide();
		$("#idHeading").html("Asset Allocation Review");
		$(".pmratios").removeClass("activeitem");
		$(".pmassetallocation").addClass("activeitem");

	};
});

$(".ratioleft").click(function(){
	if(ratiopavleft.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/pm/viewPortfolioNetworth.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$(".glidnonglid").hide();
		$("#idHeading").html("Net Worth");
		$(".pmratios").removeClass("activeitem");
		$(".pmnetworth").addClass("activeitem");





	};
});
var riskscorePersonalTotal=[];//personal assets by total
var riskscoreInvestmentTotal=[];//investment assets/total
var riskscoreLiabilitiesAsset=[];//liabilities to assets ratio
var riskscoreSolvency=[];//solvency ratio
var tbodyMain = []
$.ajax({
	type: 'GET',
	url: REQUEST_URL_PM+'/getClientPortfolioRatios?clientId='+vClientId+'',
	async: false,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		if(parseInt(data[0].value * 100) > 0) {
			riskscorePersonalTotal.push(parseInt(data[0].value * 100));
		} else {
			riskscorePersonalTotal.push(0);
		}
		
		if(parseInt(data[1].value * 100) > 0) {
			riskscoreInvestmentTotal.push(parseInt(data[1].value * 100));
		} else {
			riskscoreInvestmentTotal.push(0);
		}

		if(parseInt(data[2].value * 100) > 0) {
			riskscoreLiabilitiesAsset.push(parseInt(data[2].value * 100));
		} else {
			riskscoreLiabilitiesAsset.push(0);
		}

		if(parseInt(data[3].value * 100) > 0) {
			riskscoreSolvency.push(parseInt(data[3].value * 100));
		} else {
			riskscoreSolvency.push(0);
		}

		$.each(data,function(index,value){
			tbodyMain = tbodyMain + "<tr class='bgcolorlightblue'>" +
			"<td>"+value.ratios+"</td>" +
			"<td>"+value.logicRational+"</td>" +
			"<td>"+parseFloat(value.value * 100).toFixed(2)+"</td>" +
			"<td>"+value.commentMaster+"</td>" +
			"</tr>";
		});
		$("#idPortFolioRatioTBody").append(tbodyMain);
//		loadWealthRatios();
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

$(document).ready(function(){
    $("div.daterangepicker").remove();
	Highcharts.chart('idRiskScore1', {
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
			min: -50,
			max: 100,
			tickPixelInterval: 50,
			tickWidth: 2,
			tickPosition: 'inside',
			tickLength: 10,
			tickColor: '#666',
			labels: {
				step: 2,
				//rotation: 'auto'
			},
			title: {
				text: '',
				style:{
					fontSize: '18px'
				}       
			},
			plotBands: [
				{
					from: -50,
					to: 0,
					color: '#f15c80',
					fill:'#f15c80'
				}, {
					from: 1,
					to: 15,
					color: '#f7a35c',
					fill:'#f7a35c'
				}, {
					from: 16,
					to: 35,
					color: '#90ed7d',
					fill:'#90ed7d'
				},
				{
					from: 36,
					to: 60,
					color: '#8085d9',
					fill:'#8085d9'
				},
				{
					from: 61,
					to: 100,
					color: '#95ceff',
					fill:'#95ceff'
				}]
		},
		series:[{
			name: 'Score',
			data: [10],
			dataLabels: {
				formatter: function () {

					var kmh = this.y;
					if(kmh < -50){
						var newvar = [-50];
						var chart = $('#idRiskScore1').highcharts(); 
						//chart1.series[0].setData(newvar1,true);
						chart.series[0].setData(newvar,true)
						$("#idRiskScore1 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
						return '<span style="color:#f15c80;font-size:16px;">'+ kmh + '</span>' ;
					}
					if(kmh >= -50 & kmh <= 0){
						return '<span style="color:#f15c80;font-size:16px;">'+ kmh + '</span>' ;
					}
					if(kmh >= 1 & kmh <= 15){
						return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
					}
					if(kmh >= 16 & kmh <= 35){
						return '<span style="color:#90ed7d;font-size:16px;">'+ kmh + '</span>' ;
					}
					if(kmh >= 36 & kmh <= 60){
						return '<span style="color:#8085d9;font-size:16px;">'+ kmh + '</span>' ;
					}
					if(kmh >= 61 & kmh <= 100){
						return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
					}
				},
			},
		}]
	});




});





$(".form-section-container").css("padding","24px 45px 116px");

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
		$("#idBody").load("plan/bm/viewRecommended.html");
		$("#idHeading").html("Budget Recommendations");
		$(".Recommendations").addClass("activeitem");
		$(".BudgetRatio").removeClass("activeitem");
	};
});
$(".ratioleft").click(function(){
	if(ratiopavleft.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/bm/viewNetSurplus.html");
		$("#idHeading").html("Net Surplus");
		$(".BudgetRatio").removeClass("activeitem");
		$(".NetSurplus").addClass("activeitem");
	};
});
/*ratio1*/

var saving = [];
var debtService = [];
var housingExp = [];
$.ajax({
	type: 'GET',
	async:false,
	url: REQUEST_URL_BM+'/getClientBudgetRatioInfo?clientId='+vClientId+'',
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		$('#idBudgetRatioTable').append(
				'<tr>'+
				'<td>Savings Ratio</td>'+ 
				'<td>Net Surplus / Total Income</td>'+ 
				'<td>'+maskAmountValue(Math.round(parseFloat((data.savingsRatioPerc * 100.0)/100.0).toFixed(2)))+'</td>'+
				
				'<td>'+data.savingsRatioPercComment+'</td>'+
				'</tr>' +
				'<tr>'+
				'<td>Debt Servicing Ratio</td>'+ 
				'<td>Total EMI / Total Cash Inflow</td>'+ 
				'<td>'+maskAmountValue(Math.round(parseFloat((data.debtServicingRatioPerc * 100.0)/100.0).toFixed(2)))+'</td>'+
				
				'<td>'+data.debtServicingRatioPercComment+'</td>'+
				'</tr>'+
				'<tr>'+
				'<td>Housing Ratio</td>'+ 
				'<td>Monthly Expense/ Total Income</td>'+ 
				'<td>'+maskAmountValue(Math.round(parseFloat((data.housingExpenseRatioPerc * 100.0)/100.0).toFixed(2)))+'</td>'+
				'<td>'+data.housingExpenseRatioPercComment+'</td>'+
		'</tr>');
		saving.push(parseInt(data.savingsRatioPerc));
//		alert("saving" + saving[0]);
		debtService.push(parseInt(data.debtServicingRatioPerc));
//		alert("debtService" + debtService[0]);
		housingExp.push(parseInt(data.housingExpenseRatioPerc));
//		alert("housingExp" + housingExp[0]);
	},
	error: function (jqXHR, exception) {
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
        }else if (jqXHR.status == 403) {
            msg = 'you don’t have permission to access ‘/’ on this server.';
        } 
	}

});

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
                color: '#8085d9',
                fill:'#8085d9'
			},
			{
				from: 36,
				to: 60,
                color: '#95ceff',
                fill:'#95ceff'
			},
			{
				from: 61,
				to: 100,
                color: '#90ed7d',
                fill:'#90ed7d'
			}]
	},
    series:[{
		name: 'Score',
		data: saving,
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
                    return '<span style="color:#8085d9;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 36 & kmh <= 60){
                    return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 61 & kmh <= 100){
                    return '<span style="color:#90ed7d;font-size:16px;">'+ kmh + '</span>' ;
				}
			},
		},
	}]
});


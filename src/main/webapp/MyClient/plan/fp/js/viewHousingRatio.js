	Highcharts.chart('idRiskScore3', {
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
				from: 0,
				to: 10,
				color: '#90ed7d',
				fill:'#90ed7d'
				
				}, {
				from: 10,
				to: 25,
				
				color: '#95ceff',
				fill:'#95ceff'
				}, {
				from: 25,
				to: 40,
				color: '#8085d9',
				fill:'#8085d9'
			},
			{
				from: 40,
				to: 75,
				color: '#f7a35c',
				fill:'#f7a35c'
			},
			{
				from: 75,
				to: 100,
				color: '#f15c80',
				fill:'#f15c80'
				
			}]
	},
    series:[{
		name: 'Score',
		data: housingExp,
		dataLabels: {
			formatter: function () {
		 
				// chart.series[0].setData([-60])
				var kmh = this.y;
				if(kmh < -50){
					var newvar = [-50];
					var chart= $('#idRiskScore3').highcharts(); 
					chart.series[0].setData(newvar,true);
					
					$("#idRiskScore3 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
					return '<span style="color:#90ed7d;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh > 100){
					var newvar = [100];
					var chart= $('#idRiskScore3').highcharts(); 
					chart.series[0].setData(newvar,true);
					
					$("#idRiskScore3 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
					return '<span style="color:#f15c80;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 0 & kmh <= 10){
                    return '<span style="color:#90ed7d;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 10 & kmh <= 25){
                    return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 25 & kmh <= 40){
                    return '<span style="color:#8085d9;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 40 & kmh <= 75){
                    return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 75 & kmh <= 100){
                    return '<span style="color:#f15c80;font-size:16px;">'+ kmh + '</span>' ;
				}
				
			},
		},
	}]
});
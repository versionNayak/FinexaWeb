	Highcharts.chart('idRiskScore7', {
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
				to: 40,
				color: '#f15c80',
				fill:'#f15c80'
				}, {
				from: 40,
				to: 50,
				color: '#f7a35c',
				fill:'#f7a35c'
				}, {
				from: 50,
				to: 60,
				color: '#95ceff',
				fill:'#95ceff'
			},
			{
				from:60,
				to: 100,
				color: '#8085d9',
				fill:'#8085d9'
			}]
	},
    series:[{
		name: 'Score',
		data: riskscore2,
		dataLabels: {
			formatter: function () {
		 
				// chart.series[0].setData([-60])
				var kmh = this.y;
				if(kmh < 0){
					var newvar = [0];
					var chart = $('#idRiskScore7').highcharts(); 
					chart.series[0].setData(newvar,true);
					
					$("#idRiskScore7 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
					return '<span style="color:#f15c80;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh > 100){
					var newvar = [0];
					var chart = $('#idRiskScore7').highcharts(); 
					chart.series[0].setData(newvar,true);
					
					$("#idRiskScore7 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
					return '<span style="color:#8085d9;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 0 & kmh <= 40){
                    return '<span style="color:#f15c80;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 40 & kmh <= 50){
                    return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 50 & kmh <= 60){
                    return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh >= 60 & kmh <= 100){
                    return '<span style="color:#8085d9;font-size:16px;">'+ kmh + '</span>' ;
				}
				
			},
		},
	}]
});
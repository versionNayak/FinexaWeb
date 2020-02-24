	Highcharts.chart('idRiskScore4', {
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
        min: -40,
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
				from: -40,
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
		 
				// chart.series[0].setData([-60])
				var kmh = this.y;
				if(kmh < -50){
					var newvar = [-50];
					var chart = $('#idRiskScore4').highcharts(); 
					chart.series[0].setData(newvar,true);
					
					$("#idRiskScore4 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
					return '<span style="color:#f15c80;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh > 100){
					var newvar = [100];
					var chart = $('#idRiskScore4').highcharts(); 
					chart.series[0].setData(newvar,true);
					
					$("#idRiskScore4 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
					return '<span style="color:#90ed7d;font-size:16px;">'+ kmh + '</span>' ;
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
	
		   Highcharts.chart('idRiskScoreother', {

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
        max: 120,

       

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
			text: '',
			style:{
				fontSize: '18px'
			}       
		},
        plotBands: [{
            from: 0,
            to: 70,
            color: '#727276' 
			
        }, {
            from: 70,
            to: 99,
			 color: '#f7a35c',
			fill:'#f7a35c'
            
        }, {
            from: 99,
            to: 109,
          color: '#8085d9',
			fill:'#8085d9'
        }, {
            from: 109,
            to: 120,
            color: '#90ed7d',
			fill:'#90ed7d'
        }]
    },

    series:[{
            name: 'Score',
            data: riskScoreOther,
            dataLabels: {
                formatter: function () {
                    var kmh = this.y;
					
				if(kmh <0){
					var newvar = [0];
					var chart = $('#idRiskScore2').highcharts(); 
					chart.series[0].setData(newvar,true);
					
					$("#idRiskScore2 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
					return '<span style="color:#3a3a4f;font-size:16px;">'+ kmh + '</span>' ;
				}
				if(kmh > 120){
					var newvar = [120];
					var chart = $('#idRiskScore2').highcharts(); 
					chart.series[0].setData(newvar,true);
					
					$("#idRiskScore2 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
					return '<span style="color:#90ed7d;font-size:16px;">'+ kmh + '</span>' ;
				}
					
                    if(kmh >= 0 & kmh <= 70){
                        
                    return '<span style="color:#3a3a4f;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh >= 70 & kmh <= 99){
                        
                    return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh >= 99 & kmh <= 109){
                        
                    return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
                    }
					if(kmh >= 109 & kmh <= 120){
                        
                    return '<span style="color:#90ed7d;font-size:16px;">'+ kmh + '</span>' ;
                    }
                    
                    
                    
                },
               
            },
           
        }]


});
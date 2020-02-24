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
			$("#idBudget").empty();
		    $("#idBudget").load("plan/bm/viewRecommended.html");
				$("#idBudgetHeading").html("Budget Recommendations");
				$(".Recommendations").addClass("onclickbg");
				$(".BudgetRatio").removeClass("onclickbg");
		
				
				
				
			   
			};
		});
		
			$(".ratioleft").click(function(){
			if(ratiopavleft.hasClass('pav'))
			{	       
		       	$("#idBudget").empty();
		    $("#idBudget").load("plan/bm/viewNetSurplus.html");
				$("#idBudgetHeading").html("Net Surplus");
				$(".BudgetRatio").removeClass("onclickbg");
				$(".NetSurplus").addClass("onclickbg");
		
				
				
				
			   
			};
});
		
		
		$(document).ready(function(){
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
        min: 0,
        max: 10,

       

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
            to: 3.5,
            color: '#3a3a4f' 
			
        }, {
            from: 3.5,
            to: 7,
            color: '#95ceff'
        }, {
            from: 7,
            to: 10,
            color: '#f7a35c',
			fill:'#f7a35c'
        }]
    },

    series:[{
            name: 'Score',
            data: [4],
            dataLabels: {
                formatter: function () {
                    var kmh = this.y;
                    if(kmh > 0 & kmh < 3.4){
                        
                    return '<span style="color:#3a3a4f;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 3.4 & kmh < 7){
                        
                    return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 7 & kmh < 10){
                        
                    return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
                    }
                    
                    
                },
               
            },
           
        }]


});

Highcharts.chart('idRiskScore2', {

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
        max: 10,

       

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
            to: 3.5,
            color: '#3a3a4f' 
			
        }, {
            from: 3.5,
            to: 7,
            color: '#95ceff'
        }, {
            from: 7,
            to: 10,
            color: '#f7a35c',
			fill:'#f7a35c'
        }]
    },

    series:[{
            name: 'Score',
            data: [2],
            dataLabels: {
                formatter: function () {
                    var kmh = this.y;
                    if(kmh > 0 & kmh < 3.4){
                        
                    return '<span style="color:#3a3a4f;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 3.4 & kmh < 7){
                        
                    return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 7 & kmh < 10){
                        
                    return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
                    }
                    
                    
                },
               
            },
           
        }]


});
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
        max: 10,

       

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

                    fontSize: '12px'
					
                }       
			
        },
        plotBands: [{
            from: 0,
            to: 3.5,
            color: '#3a3a4f' 
			
        }, {
            from: 3.5,
            to: 7,
            color: '#95ceff'
        }, {
            from: 7,
            to: 10,
            color: '#f7a35c',
			fill:'#f7a35c'
        }]
    },

    series:[{
            name: 'Score',
            data: [9],
            dataLabels: {
                formatter: function () {
                    var kmh = this.y;
                    if(kmh > 0 & kmh < 3.4){
                        
                    return '<span style="color:#3a3a4f;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 3.4 & kmh < 7){
                        
                    return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 7 & kmh < 10){
                        
                    return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
                    }
                    
                    
                },
               
            },
           
        }]


});
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
        min: 0,
        max: 10,

       

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
            to: 3.5,
            color: '#3a3a4f' 
			
        }, {
            from: 3.5,
            to: 7,
            color: '#95ceff'
        }, {
            from: 7,
            to: 10,
            color: '#f7a35c',
			fill:'#f7a35c'
        }]
    },

    series:[{
            name: 'Score',
            data: [8],
            dataLabels: {
                formatter: function () {
                    var kmh = this.y;
                    if(kmh > 0 & kmh < 3.4){
                        
                    return '<span style="color:#3a3a4f;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 3.4 & kmh < 7){
                        
                    return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
                    }
                     if(kmh > 7 & kmh < 10){
                        
                    return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
                    }
                    
                    
                },
               
            },
           
        }]


});
		});



	
	
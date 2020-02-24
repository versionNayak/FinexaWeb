var jssor_24_SlideshowTransitions = [
	{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


	];

var jssor_24_options = {
		$AutoPlay: 1,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: jssor_24_SlideshowTransitions,
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

var jssor_24_slider = new $JssorSlider$("jssor_24", jssor_24_options);
var recompavright = $('.jssort24 div:nth-child(2) div:nth-child(4) div');
var recompavleft = $('.jssort24 div:nth-child(2) div:nth-child(2) div');

$(".Incomeright").click(function(){
	if(recompavright.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewFinancialRiskProfile.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$(".glidnonglid").hide();
		$("#idHeading").html("Risk Profile");
		$(".pffinancialratio").removeClass("activeitem");
		$(".fpriskprofile").addClass("activeitem");

	};
});

$(".Incomeleft").click(function(){
	if(recompavleft.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewFinancialNetworth.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$("#idHeading").html("Networth");
		$(".pffinancialratio").removeClass("activeitem");
		$(".pfnetworth").addClass("activeitem");

	};
});

var saving = [];
var debtService = [];
var housingExp = [];
var basicLiqRatio = [];

var riskscore1=[];//personal assets by total
var riskscore2=[];//investment assets/total
var riskscore3=[];//liabilities to assets ratio
var riskscore4=[];//solvency ratio
var riskScoreOther = [];
$.ajax({
	type: 'GET',
	async:false,
	url: REQUEST_URL_BM+'/getClientBudgetRatioInfo?clientId='+vClientId+'',
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		saving.push(parseInt(data.savingsRatioPerc));
		debtService.push(parseInt(data.debtServicingRatioPerc));
		housingExp.push(parseInt(data.housingExpenseRatioPerc));
		basicLiqRatio.push(parseInt(data.basicLiquidityRatio));
		loadSavingsRatioChart();
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
			riskscore1.push(parseInt(data[0].value * 100));
		} else {
			riskscore1.push(0);
		}

		if(parseInt(data[1].value * 100) > 0) {
			riskscore2.push(parseInt(data[1].value * 100));
		} else {
			riskscore2.push(0);
		}

		if(parseInt(data[2].value * 100) > 0) {
			riskscore3.push(parseInt(data[2].value * 100));
		} else {
			riskscore3.push(0);
		}

		if(parseInt(data[3].value * 100) > 0) {
			riskscore4.push(parseInt(data[3].value * 100));
		} else {
			riskscore4.push(0);
		}

		loadWealthRatios();
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
//Life Cover Table	
$.ajax({
	type: 'GET',
	url: REQUEST_URL_FP+'/getClientFMInsuranceLifeCover?clientId='+vClientId,
	async: false,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {

		$("#lifeCoverTable").empty();
		//	$("#lifeCoverTable").empty();
		$.each(data, function (index, lifeCover) {   		
			if (lifeCover.relationship == "Self") {
				var ratio = parseInt((lifeCover.existingLifeCover/lifeCover.required)*100);
				riskScoreOther.push(ratio);
			}

			$("#lifeCoverTable").append('<tr>' +
					'<td>' + lifeCover.relationship + '</td>' +
					'<td>' + lifeCover.existingLifeCover + '</td>' +
					'<td>' + parseFloat(lifeCover.required).toFixed(2) + '</td>' +
					'<td>' + parseFloat((lifeCover.additional)).toFixed(2) + '</td>' +
			'</tr>');

			/*	$("#oprtFolioTrackerPopupList").append('<tr>' +
						'<td>' + portfolioTracker.productName + '</td>' +
						'<td>' + portfolioTracker.productType + '</td>' +
						'<td>' + parseFloat(portfolioTracker.currentValue).toFixed(2) + '</td>' +
						'<td>' + parseFloat((portfolioTracker.currentPortfolioWeight)*100).toFixed(2) + '</td>' +
						'<td>' + investmentValue + '</td>' +
						'<td>' + gains + '</td>' +
						'<td>' + cagr + '</td>' +
						'</tr>');*/
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

function loadSavingsRatioChart() {
	
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
    				from: 11,
    				to: 25,
    				color: '#95ceff',
    				fill:'#95ceff'
    				
    				
    				}, {
    				from: 26,
    				to: 40,
    				color: '#8085d9',
    				fill:'#8085d9'
    			},
    			{
    				from: 41,
    				to: 75,
    				color: '#f7a35c',
    				fill:'#f7a35c'
    			},
    			{
    				from: 76,
    				to: 100,
    				color: '#f15c80',
    				fill:'#f15c80'
    			}]
    	},
        series:[{
    		name: 'Score',
    		data: debtService,
    		dataLabels: {
    			formatter: function () {
    			    
    				var kmh = this.y;
    				if(kmh < 0){
    					var newvar = [0];
    					var chart = $('#idRiskScore1').highcharts(); 
    					//chart1.series[0].setData(newvar1,true);
    					chart.series[0].setData(newvar,true)
    					$("#idRiskScore1 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
    					return '<span style="color:#90ed7d;font-size:16px;">'+ kmh + '</span>' ;
    				}
    				if(kmh > 100){
    					var newvar = [100];
    					var chart = $('#idRiskScore1').highcharts(); 
    					//chart1.series[0].setData(newvar1,true);
    					chart.series[0].setData(newvar,true)
    					$("#idRiskScore1 .highcharts-data-labels .highcharts-label:nth-child(1)").hide();
    					return '<span style="color:#f15c80;font-size:16px;">'+ kmh + '</span>' ;
    				}
    				if(kmh >= 0 & kmh <= 10){
                        return '<span style="color:#90ed7d;font-size:16px;">'+ kmh + '</span>' ;
    				}
    				if(kmh >= 11 & kmh <= 25){
                        return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
    				}
    				if(kmh >= 26 & kmh <= 40){
                        return '<span style="color:#8085d9;font-size:16px;">'+ kmh + '</span>' ;
    				}
    				if(kmh >= 41 & kmh <= 75){
                        return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
    				}
    				if(kmh >= 76 & kmh <= 100){
                        return '<span style="color:#f15c80;font-size:16px;">'+ kmh + '</span>' ;
    				}
    			},
    		},
    	}]
    });

/*	Highcharts.chart('idRiskScore2', {

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
				to: 39,
				color: '#f15c80',
				fill:'#f15c80'

			}, {
				from: 40,
				to: 49,
				color: '#f7a35c',
				fill:'#f7a35c'
			}, {
				from: 50,
				to: 59,
				color: '#95ceff',
				fill:'#995ceff'

			},
			{
				from:60,
				to: 100,
				color: '#8085d9',
				fill:'#8085d9'

			}		 ]
		},

		series:[{
			name: 'Score',
			data: basicLiqRatio,
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


	});*/
/*	Highcharts.chart('idRiskScore3', {

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
				to: 34,
				color: '#727276',
				fill:'#727276'

			}, {
				from:35,
				to:64,
				color: '#f7a35c',
				fill:'#f7a35c'
			}, {
				from:65,
				to:100,
				color: '#90ed7d',
				fill:'#90ed7d'

			}]
		},

		series:[{
			name: 'Score',
			data: housingExp,
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


	});*/

/*	Highcharts.chart('idRiskScore4', {

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
				to: 35,
				color: '#727276',
				fill:'#727276'

			}, {
				from:36,
				to: 65,
				color: '#f7a35c',
				fill:'#f7a35c'
			}, {
				from:66,
				to:100,
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


	});*/
}

function loadWealthRatios() {/*
	
	Highcharts.chart('idRiskScore5', {

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
            to: 39,
            color: '#8085d9',
			fill:'#8085d9'
			
        }, {
            from: 40,
            to: 49,
            color: '#95ceff',
			fill:'#95ceff'
        }, {
            from: 50,
            to: 59,
            color: '#f7a35c',
			fill:'#f7a35c'
			
        },
		{
            from: 60,
            to: 100,
            color: '#f15c80',
			fill:'#f15c80'
			
        }]
    },

    series:[{
            name: 'Score',
            data: riskscore4,
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

Highcharts.chart('idRiskScore6', {

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
            to: 39,
            color: '#f15c80',
			fill:'#f15c80'
			
        }, {
            from: 40,
            to: 49,
            color: '#f7a35c',
			fill:'#f7a35c'
        }, {
            from: 50,
            to: 59,
            color: '#95ceff',
			fill:'#995ceff'
			
        },
		{
            from:60,
            to: 100,
            color: '#8085d9',
			fill:'#8085d9'
			
        }		 ]
    },

    series:[{
            name: 'Score',
            data: riskscore1,
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
            to: 34,
            color: '#727276',
			fill:'#727276'
			
        }, {
            from:35,
            to:64,
            color: '#f7a35c',
			fill:'#f7a35c'
        }, {
            from:65,
            to:100,
            color: '#90ed7d',
			fill:'#90ed7d'
			
        }]
    },

    series:[{
            name: 'Score',
            data: riskscore2,
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

Highcharts.chart('idRiskScore8', {

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
            to: 35,
            color: '#727276',
			fill:'#727276'
			
        }, {
            from:36,
            to: 65,
            color: '#f7a35c',
			fill:'#f7a35c'
        }, {
            from:66,
            to:100,
            color: '#90ed7d',
			fill:'#90ed7d'
			
        }]
    },

    series:[{
            name: 'Score',
            data: riskscore3,
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
*/}

/*Highcharts.chart('idRiskScoreother', {

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
			rotation: 'auto'
		},
		title: {
			style:{

				fontSize: '12px'

			}       

		},
		plotBands: [{
			from: 0,
			to: 35,
			color: '#727276',
			fill:'#727276'

		}, {
			from:36,
			to: 65,
			color: '#f7a35c',
			fill:'#f7a35c'
		}, {
			from:66,
			to:100,
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

Highcharts.chart('idRiskScore10', {

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
			to: 39,
			color: '#f15c80',
			fill:'#f15c80'

		}, {
			from: 40,
			to: 49,
			color: '#f7a35c',
			fill:'#f7a35c'
		}, {
			from: 50,
			to: 59,
			color: '#95ceff',
			fill:'#995ceff'

		},
		{
			from:60,
			to: 100,
			color: '#8085d9',
			fill:'#8085d9'

		}		 ]
	},

	series:[{
		name: 'Score',
		data: [30],
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
Highcharts.chart('idRiskScore11', {

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
			to: 34,
			color: '#727276',
			fill:'#727276'

		}, {
			from:35,
			to:64,
			color: '#f7a35c',
			fill:'#f7a35c'
		}, {
			from:65,
			to:100,
			color: '#90ed7d',
			fill:'#90ed7d'

		}]
	},

	series:[{
		name: 'Score',
		data: [60],
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

Highcharts.chart('idRiskScore12', {

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
			to: 35,
			color: '#727276',
			fill:'#727276'

		}, {
			from:36,
			to: 65,
			color: '#f7a35c',
			fill:'#f7a35c'
		}, {
			from:66,
			to:100,
			color: '#90ed7d',
			fill:'#90ed7d'

		}]
	},

	series:[{
		name: 'Score',
		data: [70],
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


});*/



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



var modal3 = document.getElementById("idpopinfosys");

//Get the button that opens the modal
var btn3 = document.getElementById("idMaxinfosys");

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


var modal4 = document.getElementById("idpopkotak");

//Get the button that opens the modal
var btn4 = document.getElementById("idMaxkotak");

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



var modal5 = document.getElementById("idpopinfosysonp");

//Get the button that opens the modal
var btn5 = document.getElementById("idMaxinfosysonp");

//Get the <span> element that closes the modal
var span5 = document.getElementsByClassName("close5")[0];

//When the user clicks the button, open the modal 
btn5.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal5.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span5.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal5.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal5) {
		modal5.style.display = "none";
	}
}



var modal6 = document.getElementById("idpopkotakpop");

//Get the button that opens the modal
var btn6 = document.getElementById("idMaxkotakonp");

//Get the <span> element that closes the modal
var span6 = document.getElementsByClassName("close6")[0];

//When the user clicks the button, open the modal 
btn6.onclick = function() {
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


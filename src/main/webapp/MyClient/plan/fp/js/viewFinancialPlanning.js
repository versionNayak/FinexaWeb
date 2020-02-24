var jssor_22_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}
		
		
	];
	
	var jssor_22_options = {
		$AutoPlay: 1,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: jssor_22_SlideshowTransitions,
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
	
	var jssor_22_slider = new $JssorSlider$("jssor_22", jssor_22_options);
	
	 var recompavright = $('.jssort22 div:nth-child(2) div:nth-child(4) div');
     var recompavleft = $('.jssort22 div:nth-child(2) div:nth-child(2) div');

	$(".Incomeright").click(function(){
		if(recompavright.hasClass('pav'))
		{	       
		$("#idpm").empty();
	        $("#idpm").load("plan/pm/viewPortfolioRecommendation.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idpmHeading").html("Portfolio Recommendation.");
			$(".pmportfoliofxtincome").removeClass("onclickbg");
			$(".pmportfoliorecom").addClass("onclickbg");
			
			
			
		   
		};
	});
	
		$(".Incomeleft").click(function(){
		if(recompavleft.hasClass('pav'))
		{	       
	   $("#idpm").empty();
	        $("#idpm").load("plan/pm/viewPortfolioEquity.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idpmHeading").html("Portfolio Equity.");
			$(".pmportfoliofxtincome").removeClass("onclickbg");
			$(".pmportfolioequity").addClass("onclickbg");
			
			
			
		   
		};/** Added on 19th sep version for arrow key(NehaD) end **/
});

Highcharts.chart('idassetspop', {
       chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
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
            data: [{
                name: 'Mutual Fund',
                y: 10,
				color:'#95ceff'
            },
			
			
			{
                name: 'Retirement Oriented Schemes',
                y: 10,
				color:'#f7a35c'
            }, {
                name: 'Bonds /  Debentures',
                y: 10,
				color:'#90ed7d',
                sliced: true,
                selected: true
            },
			{
                name: 'Deposits',
                y: 10,
				color:'#8085d9'
            }, 
			{
                name: 'Small Savings Schemes',
                y: 10,
				color:'#f15c80'
            }, 
			]
        }]
    });
		
	
	Highcharts.chart('idsectors', {

    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: 0,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Equity Overview: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'Sectors',
        data: [
            ['Cash and Others', 23.7],
            ['Unrated', 16.1],
            ['Below AA', 14.2],
            ['AA & Equivalent', 14.0],
            ['AAA & Equivalent', 12.5],
            ['Govt Securities', 12.1]
            
           
        ],
        dataLabels: {
            enabled: true,
            rotation:360,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 4, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
	
Highcharts.chart('idsectorspop', {
        chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: 0,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Equity Overview: <b>{point.y:.1f}</b>'
    },
    series: [{
        name: 'Sectors',
        data: [
            ['Cash and Others', 23.7],
            ['Unrated', 16.1],
            ['Below AA', 14.2],
            ['AA & Equivalent', 14.0],
            ['AAA & Equivalent', 12.5],
            ['Govt Securities', 12.1]
            
           
        ],
        dataLabels: {
            enabled: true,
            rotation:360,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 4, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
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
        text: ''
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
            data: [{
                name: 'Mutual Fund',
                y: 10,
				color:'#95ceff'
            },
			
			
			{
                name: 'Retirement Oriented Schemes',
                y: 10,
				color:'#f7a35c'
            }, {
                name: 'Bonds /  Debentures',
                y: 10,
				color:'#90ed7d',
                sliced: true,
                selected: true
            },
			{
                name: 'Deposits',
                y: 10,
				color:'#8085d9'
            }, 
			{
                name: 'Small Savings Schemes',
                y: 10,
				color:'#f15c80'
            }, 
			]
        }]
    });
		
	
	
	Highcharts.chart('idmarketcap', {
       chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
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
            name: 'Average Maturity',
            colorByPoint: true,
            data: [{
                name: 'Less than 1 Year',
                y: 10,
				color:'#95ceff'
            },
			
			
			{
                name: 'Greater than 1 Year',
                y: 10,
				color:'#f7a35c'
            }, {
                name: 'Others',
                y: 10,
				color:'#90ed7d',
                sliced: true,
                selected: true
            }
               
			
			]
        }]
    });
	
	Highcharts.chart('idmarketcappop', {
       chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
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
            name: 'Average Maturity',
            colorByPoint: true,
            data: [{
                name: 'Less than 1 Year',
                y: 10,
				color:'#95ceff'
            },
			
			
			{
                name: 'Greater than 1 Year',
                y: 10,
				color:'#f7a35c'
            }, {
                name: 'Others',
                y: 10,
				color:'#90ed7d',
                sliced: true,
                selected: true
            }
               
			
			]
        }]
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
	
	
var modal = document.getElementById("idpopcurrentaa");

// Get the button that opens the modal
var btn = document.getElementById("idMaxcurrentaa");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var modal1 = document.getElementById("idpoprecommendedaa");

// Get the button that opens the modal
var btn1 = document.getElementById("idmaxrecommendedaa");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal 
btn1.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}



var modal2 = document.getElementById("idpopcurrentsubaa");

// Get the button that opens the modal
var btn2 = document.getElementById("idMaxcurrentsubaa");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}



var modal3 = document.getElementById("idpopbenchmark");

// Get the button that opens the modal
var btn3 = document.getElementById("idmaxbenchmark");

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


var modal4 = document.getElementById("idpoprecommendedsubaa");

// Get the button that opens the modal
var btn4 = document.getElementById("idMaxrecommendedsubaa");

// Get the <span> element that closes the modal
var span4 = document.getElementsByClassName("close4")[0];

// When the user clicks the button, open the modal 
btn4.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal4.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span4.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal4.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
}

	$(function () {
    var input = [70000,110000, 120000, 130000,140000,200000,210000,220000,230000,240000,250000,300000,310000,320000,330000,340000,350000,400000,410000,420000,430000,440000,450000,460000,500000,70000,110000, 120000, 130000,140000,200000,210000,220000,230000,240000,250000,-300000,-310000,-320000,-330000,-340000,-350000,-400000,-410000,-420000,-430000,-440000,-450000,-460000],
    data = [];
    $.each(input, function(index, value){
        var color
        if (value < 0) color = 'tomato';
        else if (value > 0) color = '#337ab7';
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
                categories: [
                   '2016-2017','2017-2018', '2018-2019','2019-2020', '2020-2021','2021-2022', '2022-2023','2023-2024', '2024-2025','2025-2026','2026-2027','2027-2028','2028-2029','2029-2030','2030-2031','2031-2032','2032-2033','2033-2034','2034-2035','2035-2036','2036-2037','2037-2038','2038-2039','2039-2040','2040-2041','2041-2042','2042-2043','2043-2044','2044-2045','2045-2046','2046-2047','2047-2048','2048-2049','2049-2050','2050-2051','2051-2052','2052-2053','2053-2054','2054-2055','2055-2056','2056-2057','2057-2058','2058-2059','2059-2060','2060-2061','2061-2062','2062-2063','2063-2024','2064-2065'
                ]
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
    var input = [70000,110000, 120000, 130000,140000,200000,210000,220000,230000,240000,250000,300000,310000,320000,330000,340000,350000,400000,410000,420000,430000,440000,450000,460000,500000,70000,110000, 120000, 130000,140000,200000,210000,220000,230000,240000,250000,-300000,-310000,-320000,-330000,-340000,-350000,-400000,-410000,-420000,-430000,-440000,-450000,-460000],
    data = [];
    $.each(input, function(index, value){
        var color
        if (value < 0) color = 'tomato';
        else if (value > 0) color = '#337ab7';
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
                categories: [
                   '2016-2017','2017-2018', '2018-2019','2019-2020', '2020-2021','2021-2022', '2022-2023','2023-2024', '2024-2025','2025-2026','2026-2027','2027-2028','2028-2029','2029-2030','2030-2031','2031-2032','2032-2033','2033-2034','2034-2035','2035-2036','2036-2037','2037-2038','2038-2039','2039-2040','2040-2041','2041-2042','2042-2043','2043-2044','2044-2045','2045-2046','2046-2047','2047-2048','2048-2049','2049-2050','2050-2051','2051-2052','2052-2053','2053-2054','2054-2055','2055-2056','2056-2057','2057-2058','2058-2059','2059-2060','2060-2061','2061-2062','2062-2063','2063-2024','2064-2065'
                ]
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
    series: [{
        name: 'Alternatives -Others',
            data: [8,9],
			color:"#95ceff"
    }, {
        name: 'Alternatives - Real Estate',
            data: [8,10],
			color:"#f7a35c"
    },  {
        name: 'Alternatives - Precious Metals',
            data: [9,11],
			color:"#90ed7d"
    },{
        name: 'Equity International',
            data: [9,11],
			color:"#8085d9"
   },{
        name: 'Equity Mid and Small Cap',
            data: [9,10],
			color:"#f15c80"
   },{
           name: 'Equity Large Cap',
            data: [8,9],
			color:"#727276"
   }
   ,{
           name: 'Long Term Debt',
            data: [8,9],
			color:"#5adedc"
   },{
           name: 'Short Term Debt',
            data: [8,9],
			color:"#9164aa"
   },{
           name: 'Ultra Short Term Debt',
            data: [8,9],
			color:"#cdaa5f"
   },{
           name: 'Cash/Liquid',
            data: [8,9],
			color:"#558769"
   }]
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
    series: [{
        name: 'Alternatives -Others',
            data: [8,9],
			color:"#95ceff"
    }, {
        name: 'Alternatives - Real Estate',
            data: [8,10],
			color:"#f7a35c"
    },  {
        name: 'Alternatives - Precious Metals',
            data: [9,11],
			color:"#90ed7d"
    },{
        name: 'Equity International',
            data: [9,11],
			color:"#8085d9"
   },{
        name: 'Equity Mid and Small Cap',
            data: [9,10],
			color:"#f15c80"
   },{
           name: 'Equity Large Cap',
            data: [8,9],
			color:"#727276"
   }
   ,{
           name: 'Long Term Debt',
            data: [8,9],
			color:"#5adedc"
   },{
           name: 'Short Term Debt',
            data: [8,9],
			color:"#9164aa"
   },{
           name: 'Ultra Short Term Debt',
            data: [8,9],
			color:"#cdaa5f"
   },{
           name: 'Cash/Liquid',
            data: [8,9],
			color:"#558769"
   }]
});
	
	
				Highcharts.chart('idcurrentVsrecommended', {
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
    series: [{
        name: 'Alternatives',
            data: [8,9],
			color:"#95ceff"
    }, {
        name: 'Equity',
            data: [8,10],
			color:"#f7a35c"
    },  {
        name: 'Fixed Income',
            data: [9,11],
			color:"#90ed7d"
    },{
        name: 'Cash/Liquid',
            data: [9,11],
			color:"#8085d9"
	}]
});
	
	
	Highcharts.chart('idcurrentVsrecommendedpop', {
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
    series: [{
        name: 'Alternatives',
            data: [8,9],
			color:"#95ceff"
    }, {
        name: 'Equity',
            data: [8,10],
			color:"#f7a35c"
    },  {
        name: 'Fixed Income',
            data: [9,11],
			color:"#90ed7d"
    },{
        name: 'Cash/Liquid',
            data: [9,11],
			color:"#8085d9"
	}]
});
	
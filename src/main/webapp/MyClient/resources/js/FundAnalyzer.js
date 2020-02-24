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

var recompavright = $('.jssort22 div:nth-child(2) div:nth-child(2) div');
var recompavleft = $('.jssort22 div:nth-child(2) div:nth-child(2) div');

$(".Incomeright").click(function(){
	if(recompavright.hasClass('pav'))
	{	       
		$("#idpm").empty();
		$("#idpm").load("plan/pm/viewPortfolioFixedIncome.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$(".glidnonglid").hide();
		$("#idpmHeading").html("Portfolio Overview Debt.");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmportfoliofxtincome").addClass("onclickbg");
		
	};
});

$(".Incomeleft").click(function(){
	if(recompavleft.hasClass('pav'))
	{	       
		$("#idpm").empty();
		$("#idpm").load("plan/pm/viewPortfolioAssetAllocation.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$("#idpmHeading").html("Asset Allocation Review");
		$(".pmportfolioequity").removeClass("onclickbg");
		$(".pmassetallocation").addClass("onclickbg");
		
	};
});


var pieColors = (function () {
    var colors = [],
	base = Highcharts.getOptions().colors[0],
	i;
	
    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
	}
    return colors;
}());


function loadaxis() {
	
	// Build the chart
	Highcharts.chart('idassetaxis', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
		},
		legend: {
			
	        verticalAlign: 'middle',
	        align: 'right',
			layout: 'vertical'
			
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
	            colors: pieColors,
	            dataLabels: {
	                enabled: true,
	                format: '{point.percentage:.1f} %',
	                distance: -15,
	                filter: {
	                    property: 'percentage',
	                    operator: '>',
	                    value: 4
					}
				},
				showInLegend: true
			}
		},
	    series: [{
	        name: 'Brands',
	        data: [
	            { name: 'Equity', y: 56.33, color: '#95ceff' },
	            { name: 'Debt', y: 24.03, color:'#f7a35c' },
	            { name: 'Others', y: 10.38, color:'#90ed7d' }
	           
				
				
			]
		}]
	});

	
	Highcharts.chart('assetallocationaxis', {
	    chart: {
	        type: 'bar'
		},
	    title: {
	        text: ''
		},
	    xAxis: {
	        categories: ['']
		},
	    yAxis: {
	        min: 0,
	        title: {
	            text: ''
			}
		},
	    legend: {
			layout:'vertical',
			// reversed: true,
			verticalAlign: 'bottom',
	        align: 'center',
			x:-120
			
			
			
		},
	    plotOptions: {
	        series: {
	            stacking: 'normal'
			}
		},
	    series: [{
	        name: 'Cash and others',
	        data: [5]
			}, {
	        name: 'AAA & Equivalent',
	        data: [1]
			}, {
	        name: 'Govt. Securities',
	        data: [3]
		}
		
		]
	});


}

function loadKotak() {
	
	// Build the chart
	Highcharts.chart('idassetkotak', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
		},
		legend: {
			
	        verticalAlign: 'middle',
	        align: 'right',
			layout: 'vertical'
			
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
	            colors: pieColors,
	            dataLabels: {
	                enabled: true,
	                format: '{point.percentage:.1f} %',
	                distance: -15,
	                filter: {
	                    property: 'percentage',
	                    operator: '>',
	                    value: 4
					}
				},
				showInLegend: true
			}
		},
	    series: [{
	        name: 'Brands',
	        data: [
	            { name: 'Equity', y: 56.33, color: '#95ceff' },
	            { name: 'Debt', y: 24.03, color:'#f7a35c' },
	            { name: 'Others', y: 10.38, color:'#90ed7d' },
	            { name: 'Cap', y: 4.77,color:'#8085d9' }
				
				
			]
		}]
	});

	
	Highcharts.chart('assetallocation', {
	    chart: {
	        type: 'bar'
		},
	    title: {
	        text: ''
		},
	    xAxis: {
	        categories: ['']
		},
	    yAxis: {
	        min: 0,
	        title: {
	            text: ''
			}
		},
	    legend: {
			layout:'vertical',
			// reversed: true,
			verticalAlign: 'bottom',
	        align: 'center',
			x:-120
			
			
			
		},
	    plotOptions: {
	        series: {
	            stacking: 'normal'
			}
		},
	    series: [{
	        name: 'LargeCap',
	        data: [5]
			}, {
	        name: 'Mid Cap',
	        data: [1]
			}, {
	        name: 'Small Cap',
	        data: [3]
			},{
	        name: 'Cap',
	        data: [3]
		}
		
		]
	});


}

Highcharts.chart('idcaa', {
       chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
	},
	legend: {
		
        verticalAlign: 'middle',
        align: 'right',
		layout: 'vertical'
		
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
           // colors: pieColors,
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.1f} %',
                distance: -15,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
				}
			},
			showInLegend: true
		}
	},
    series: [{
        name: 'Brands',
		 innerSize: '50%',
        data: [
            { name: 'Direct Equity', y: 56.33, color: '#95ceff' },
            { name: 'International Equity', y: 24.03, color:'#f7a35c' },
            { name: 'Mutual Funds', y: 10.38, color:'#90ed7d' }
          
			
			
		]
	}]
});

	/*Highcharts.chart('idsectorholding', {
	
    chart: {
        type: 'bar'
		
	},
    title: {
        text: ''
	},
	labels: {
		overflow: 'justify'
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
            ['Others', 10],
            ['Infrastructure', 20],
            ['Miscellaneous', 30],
            ['Banking & Finance', 40],
            ['1-2Y',50],
            ['9-12M', 60],
            ['6-9M', 70],
			['3-6M', 80],
			['1-3M', 90],
			['0-1M', 100]
			
			
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
});*/

$("document").ready(function(){

Highcharts.chart('idgrowthkotak', {
    chart: {
        type: 'line'
	},
    title: {
        text: ''
	},
    subtitle: {
        text: ''
	},
    xAxis: {
        categories: ['Jan-10', 'Feb-10', 'Mar-10', 'Apr-10', 'May-10', 'Jun-10', 'Jul-10', 'Aug-10', 'Sep-10', 'Oct-10', 'Nov-10', 'Dec-10',
		'Jan-11', 'Feb-11', 'Mar-11', 'Apr-11', 'May-11', 'Jun-11', 'Jul-11', 'Aug-11', 'Sep-11', 'Oct-11', 'Nov-11', 'Dec-11']
	},
    yAxis: {
        title: {
            text: ''
		}
	},
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
			},
            enableMouseTracking: false
		}
	},
    series: [{
        name: 'Index',
        data: [200, 250, 210, 260, 280, 300, 310, 320, 305,315, 350,400,
		200, 250, 210, 260, 280, 300, 310, 320, 305,315, 350,400,]
	},
	{
        name: 'Performance',
        data: [210, 350, 310, 360, 380, 400, 410, 420, 405,415, 450,500,
		300, 350, 310, 360, 380, 400, 410, 420, 405,415, 450,500,],
		color:"#f7a35c"
	}
	
	
	
	]
});

// This is the Equity Performance vs Index Graph
Highcharts.chart('idgrowth', {
    chart: {
        type: 'line'
	},
    title: {
        text: ''
	},
    subtitle: {
        text: ''
	},
    xAxis: {
        categories: ['Jan-10', 'Feb-10', 'Mar-10', 'Apr-10', 'May-10', 'Jun-10', 'Jul-10', 'Aug-10', 'Sep-10', 'Oct-10', 'Nov-10', 'Dec-10',
		'Jan-11', 'Feb-11', 'Mar-11', 'Apr-11', 'May-11', 'Jun-11', 'Jul-11', 'Aug-11', 'Sep-11', 'Oct-11', 'Nov-11', 'Dec-11']
	},
    yAxis: {
        title: {
            text: ''
		}
	},
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
			},
            enableMouseTracking: false
		}
	},
    series: [{
        name: 'Index',
        data: [200, 250, 210, 260, 280, 300, 310, 320, 305,315, 350,400,
		200, 250, 210, 260, 280, 300, 310, 320, 305,315, 350,400,]
	},
	{
        name: 'Performance',
        data: [210, 350, 310, 360, 380, 400, 410, 420, 405,415, 450,500,
		300, 350, 310, 360, 380, 400, 410, 420, 405,415, 450,500,],
		color:"#f7a35c"
	}
	
	
	
	]
});


});




/*Highcharts.chart('idinfosys', {
    chart: {
        type: 'line'
	},
    title: {
        text: 'Daily Price Chart'
	},
    subtitle: {
        text: ''
	},
    xAxis: {
        categories: ['Jan-10', 'Feb-10', 'Mar-10', 'Apr-10', 'May-10', 'Jun-10', 'Jul-10', 'Aug-10', 'Sep-10', 'Oct-10', 'Nov-10', 'Dec-10',
		'Jan-11', 'Feb-11', 'Mar-11', 'Apr-11', 'May-11', 'Jun-11', 'Jul-11', 'Aug-11', 'Sep-11', 'Oct-11', 'Nov-11', 'Dec-11']
	},
    yAxis: {
        title: {
            text: ''
		}
	},
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
			},
            enableMouseTracking: false
		}
	},
    series: [{
        name: 'Price',
        data: [200, 250, 210, 260, 280, 300, 310, 320, 305,315, 350,400,
		200, 250, 210, 260, 280, 300, 310, 320, 305,315, 350,400,]
	}]
});



*/

Highcharts.chart('idassetquality', {
       chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
	},
	legend: {
		
        verticalAlign: 'middle',
        align: 'right',
		layout: 'vertical'
		
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
           // colors: pieColors,
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.1f} %',
                distance: -15,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
				}
			},
			showInLegend: true
		}
	},
    series: [{
        name: 'Brands',
		 innerSize: '50%',
        data: [
            { name: 'Large Cap', y: 56.33, color: '#95ceff' },
            { name: 'Mid Cap', y: 24.03, color:'#f7a35c' },
            { name: 'Small Cap', y: 10.38, color:'#90ed7d' },
            { name: 'Others', y: 4.77,color:'#8085d9' }
			
			
			
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
            ['Others', 23.7],
            ['Infrastructure', 16.1],
            ['Media', 14.2],
            ['Miscellaneous', 14.0],
            ['Banking & Finance', 12.5],
            ['Conglomerates', 12.1],
            ['IT', 11.8],
            ['Auto & Auto Ancillary', 11.7],
            ['Cement', 11.1],
            ['Consumer Non-Durable', 11.1],
            ['Food & Beverage', 10.5]
			
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
		name: 'Exposure in Portfolio',
		colorByPoint: true,
		data: [{
			name: 'Large Cap',
			y: 10,
			color:'#95ceff'
		},
		
		
		{
			name: 'Mid Cap',
			y: 10,
			color:'#f7a35c'
            }, {
			name: 'Small Cap',
			y: 10,
			color:'#90ed7d',
			sliced: true,
			selected: true
            },{
			name: 'Others',
			y: 10,
			color:'#8085d9'
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






var modal2 = document.getElementById("idpopkotak");

// Get the button that opens the modal
var btn2 = document.getElementById("kotakmaxpop");

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

var modal4 = document.getElementById("idpopkotak");

// Get the button that opens the modal
var btn4 = document.getElementById("idMaxkotak");

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


var modal5 = document.getElementById("idpopinfosys");

// Get the button that opens the modal
var btn5 = document.getElementById("infosysonmax");

// Get the <span> element that closes the modal
var span5 = document.getElementsByClassName("close5")[0];

// When the user clicks the button, open the modal 
btn5.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal5.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span5.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal5.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal5) {
        modal5.style.display = "none";
	}
}



var modal3 = document.getElementById("idpopaxis");

// Get the button that opens the modal
var btn3 = document.getElementById("idMaxAxis");

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



var modal1 = document.getElementById("idpopcurrentaa");

// Get the button that opens the modal
var btn1 = document.getElementById("equitymore");

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
	})
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



Highcharts.chart('idAssetallocation', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
		}
	},
    title: {
        text: 'Browser market shares at a specific website, 2014'
	},
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
			}
		}
	},
    series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
            ['Firefox', 45.0],
            ['IE', 26.8],
            {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true
			},
            ['Safari', 8.5],
            ['Opera', 6.2],
            ['Others', 0.7]
		]
	}]
});


Highcharts.chart('idmarketcapital', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
		}
	},
    title: {
        text: 'Browser market shares at a specific website, 2014'
	},
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
			}
		}
	},
    series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
            ['Firefox', 45.0],
            ['IE', 26.8],
            {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true
			},
            ['Safari', 8.5],
            ['Opera', 6.2],
            ['Others', 0.7]
		]
	}]
});



$(function() {
	
    var start = moment().subtract(29, 'days');
    var end = moment();
	
    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
	}
	
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		}
	}, cb);
	
    cb(start, end);
    
});



Highcharts.chart('performance', {
    chart: {
        type: 'spline'
	},
    title: {
        text: 'Snow depth at Vikjafjellet, Norway'
	},
    subtitle: {
        text: 'Irregular time data in Highcharts JS'
	},
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
		},
        title: {
            text: 'Date'
		}
	},
    yAxis: {
        title: {
            text: 'Snow depth (m)'
		},
        min: 0
	},
    tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
	},
	
    plotOptions: {
        spline: {
            marker: {
                enabled: true
			}
		}
	},
	
    series: [{
        name: 'Winter 2012-2013',
        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        data: [
            [Date.UTC(1970, 9, 21), 0],
            [Date.UTC(1970, 10, 4), 0.28],
            [Date.UTC(1970, 10, 9), 0.25],
            [Date.UTC(1970, 10, 27), 0.2],
            [Date.UTC(1970, 11, 2), 0.28],
            [Date.UTC(1970, 11, 26), 0.28],
            [Date.UTC(1970, 11, 29), 0.47],
            [Date.UTC(1971, 0, 11), 0.79],
            [Date.UTC(1971, 0, 26), 0.72],
            [Date.UTC(1971, 1, 3), 1.02],
            [Date.UTC(1971, 1, 11), 1.12],
            [Date.UTC(1971, 1, 25), 1.2],
            [Date.UTC(1971, 2, 11), 1.18],
            [Date.UTC(1971, 3, 11), 1.19],
            [Date.UTC(1971, 4, 1), 1.85],
            [Date.UTC(1971, 4, 5), 2.22],
            [Date.UTC(1971, 4, 19), 1.15],
            [Date.UTC(1971, 5, 3), 0]
		]
		}, {
        name: 'Winter 2013-2014',
        data: [
            [Date.UTC(1970, 9, 29), 0],
            [Date.UTC(1970, 10, 9), 0.4],
            [Date.UTC(1970, 11, 1), 0.25],
            [Date.UTC(1971, 0, 1), 1.66],
            [Date.UTC(1971, 0, 10), 1.8],
            [Date.UTC(1971, 1, 19), 1.76],
            [Date.UTC(1971, 2, 25), 2.62],
            [Date.UTC(1971, 3, 19), 2.41],
            [Date.UTC(1971, 3, 30), 2.05],
            [Date.UTC(1971, 4, 14), 1.7],
            [Date.UTC(1971, 4, 24), 1.1],
            [Date.UTC(1971, 5, 10), 0]
		]
		}, {
        name: 'Winter 2014-2015',
        data: [
            [Date.UTC(1970, 10, 25), 0],
            [Date.UTC(1970, 11, 6), 0.25],
            [Date.UTC(1970, 11, 20), 1.41],
            [Date.UTC(1970, 11, 25), 1.64],
            [Date.UTC(1971, 0, 4), 1.6],
            [Date.UTC(1971, 0, 17), 2.55],
            [Date.UTC(1971, 0, 24), 2.62],
            [Date.UTC(1971, 1, 4), 2.5],
            [Date.UTC(1971, 1, 14), 2.42],
            [Date.UTC(1971, 2, 6), 2.74],
            [Date.UTC(1971, 2, 14), 2.62],
            [Date.UTC(1971, 2, 24), 2.6],
            [Date.UTC(1971, 3, 2), 2.81],
            [Date.UTC(1971, 3, 12), 2.63],
            [Date.UTC(1971, 3, 28), 2.77],
            [Date.UTC(1971, 4, 5), 2.68],
            [Date.UTC(1971, 4, 10), 2.56],
            [Date.UTC(1971, 4, 15), 2.39],
            [Date.UTC(1971, 4, 20), 2.3],
            [Date.UTC(1971, 5, 5), 2],
            [Date.UTC(1971, 5, 10), 1.85],
            [Date.UTC(1971, 5, 15), 1.49],
            [Date.UTC(1971, 5, 23), 1.08]
		]
	}]
});
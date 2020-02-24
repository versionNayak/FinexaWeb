jQuery(document).ready(function ($) {


	$("#yearlytbl").load("gp/Yearlytable.html");

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















	var jssor_6_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_6_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_6_SlideshowTransitions,
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


	var jssor_6_slider = new $JssorSlider$("jssor_6", jssor_6_options);

	var yearlypavdiv = $('.jssort06 div:nth-child(2) div:nth-child(3) div');
	var yearlypavleft = $('.jssort06 div:nth-child(2) div:nth-child(2) div');
	$(".yearlyright").click(function(){
		if(yearlypavdiv.hasClass('pav'))
		{	  

			$("#idBody").empty();
			$("#idBody").load("plan/gp/viewGoalInput.html");

			$(".form-section-container").css("padding","18px 45px 72px 45px");
			$("#idHeading").html("Goals Input");
			$(".goalinput").addClass("activeitem");
			$(".yearly").removeClass("activeitem");






		};
	});
	$(".yearlyleft").click(function(){
		if(yearlypavleft.hasClass('pav'))
		{	  

			$("#idBody").empty();
			$("#idBody").load("plan/gp/viewProductRecommend.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");

			$("#idHeading").html("Product Recommendation");
			$(".product").addClass("activeitem");
			$(".yearly").removeClass("activeitem");






		};
	});

	var modal = document.getElementById('idPopYear');

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxYear");

//	Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

//	When the user clicks the button, open the modal 
	btn.onclick = function() {
		$(".onpopupscroller").css("overflow","hidden");
		modal.style.display = "block";
	}

//	When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		$(".onpopupscroller").css("overflow","visible");
		modal.style.display = "none";
	}

//	When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	var yearList = [];
	var loanOutflowList = [];
	var goalOutflowList = [];
	var investmentList = [];
	var closingBlncList = [];

	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getAmountNeededDetailsForParticularMode?clientId='+vClientId+
		'&goalId='+goalId+'&mode='+selectedMode+'&lumpsumValue='+lumpsumForSIP+
		'&glideNonglideMode='+vglideNonglideMode,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {$.each(data.yearlyCashflow,function(index, value) {
			$("#idMinimizeTable").append('<tr>' +
					'<td>'+ value.financialYear+'</td>' +
					'<td>'+ parseInt(value.clientAge)+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.openingBalance))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.lumpsumInvestment))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.returnOnInvestment))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.fundedCorpus))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.loanInflow))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.goalOutflow))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.closingBalance))+'</td>' +
			'</tr>');

			$("#idMaximizeTable").append('<tr>' +
					'<td>'+ value.financialYear+'</td>' +
					'<td>'+ parseInt(value.clientAge)+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.openingBalance))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.lumpsumInvestment))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.returnOnInvestment))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.fundedCorpus))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.loanInflow))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.goalOutflow))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.closingBalance))+'</td>' +
			'</tr>');

			yearList.push(value.financialYear);
			loanOutflowList.push(parseInt(value.loanInflow));
			goalOutflowList.push(parseInt(value.goalOutflow));
			investmentList.push(parseInt(value.lumpsumInvestment));
			closingBlncList.push(parseInt(value.closingBalance));

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
	Highcharts.chart('idLinebarGraph', {
		chart: {

		},
		title: {
			text: '<b>Goal Cashflows</b>',

		},
		xAxis: [{
			categories: yearList,
			crosshair: true
		}],
		yAxis: [{ // Primary yAxis
			labels: {

				style: {
					color: Highcharts.getOptions().colors[1]

				}
			},
			title: {
				text: '',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			}
		}, { // Secondary yAxis
			title: {
				text: 'Closing Balance',
				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
			labels: {

				style: {
					color: Highcharts.getOptions().colors[1]
				}
			},
			opposite: true
		}],
		tooltip: {
			shared: true
		},		

		
		legend: {

			align: 'center',
			x: 0,
			verticalAlign: 'buttom',
			y: 340,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},

		plotOptions: {
			column: {
				stacking: 'normal',
				dataLabels: {

					color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
				}
			}
		},

		series: [{
			maxPointWidth:50,
			name: 'Investment',
			type: 'column',
			yAxis: 1,
			color: '#90ed7d',
			data: investmentList,        
		}, 
		{
			maxPointWidth:50,
			name: 'Loan Inflow',
			type: 'column',
			yAxis: 1,
			color: '#f7a35c',
			data: loanOutflowList,

		}, 
		{
			maxPointWidth:50,
			name: 'Goal Outflow',
			type: 'column',
			yAxis: 1,
			color: '#95ceff',
			data: goalOutflowList,

		}, 

		{
			maxPointWidth:50,
			name: 'Closing Balance',
			type: 'spline',
			color:'#3a3a4f',
			data: closingBlncList,

		}]
	});


});


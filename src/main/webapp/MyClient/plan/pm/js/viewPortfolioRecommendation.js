$(document).ready(function(){
    $("div.daterangepicker").remove();
	var jssor_23_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}
	];
	var jssor_23_options = {
		$AutoPlay: 1,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: jssor_23_SlideshowTransitions,
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
	var jssor_23_slider = new $JssorSlider$("jssor_23", jssor_23_options);
	//var recompavright = $('.jssort23 div:nth-child(2) div:nth-child(4) div');
	var recompavleft = $('.jssort23 div:nth-child(2) div:nth-child(2) div');
	$(".Incomeright").click(function(){

		if(recompavleft.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewProductRecommend.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Product Recommendation");
			$(".pmportfoliorecom").removeClass("activeitem");
			$(".pmproductrecom").addClass("activeitem");
		};
	});
	$(".Incomeleft").click(function(){
		if(recompavleft.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioFixedIncome.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Portfolio Overview- Debt.");
			$(".pmportfoliorecom").removeClass("activeitem");
			$(".pmportfoliofxtincome").addClass("activeitem");
		};
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
});
var tbodyMain = "";
var totalPerc = 0;
//calling service layer
$.ajax({
	type:'GET',
	async:false,
	url: REQUEST_URL_PM+'/getClientPortfolioSubAssetReview?clientId='+vClientId+'',
	datatype:"json",
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function(data) {
		var colorIndex = 0;
		var colorSubIndex = 0;
		$.each(data.portfolioAssetListMap,function(index,value){
			$.each(value, function (index1,value1) {
				// calculation of rebalancing amount
				var rebalancingPerc = parseFloat(((value1.recomentTotalPercentage - value1.portFoliototalPercentage)/100)* data.currentValue).toFixed(2);
				tbodyMain = tbodyMain + "<tr>" +
				"<td>"+index+"</td>" +
				"<td>"+value1.investmentSubAssetClass+"</td>" +
				"<td>"+value1.recomentTotalPercentage+"</td>" +
				"<td>"+maskAmountValue(Math.round(rebalancingPerc))+"</td>" +
				"</tr>";
				totalPerc = totalPerc + value1.recomentTotalPercentage;
			});
		});
		tbodyMain = tbodyMain + "<tr class='nonglidtotal'>" +
		"<td><b>Total</b></td>" +
		"<td></td>" +
		"<td><b>"+maskAmountValue(Math.round(totalPerc))+"</b></td>" +
		"<td></td>" +
		"</tr>";
		$("#idPortfolioRecoTBody").append(tbodyMain);
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

//historical return bar 
var historicalReturnvalues=[];
var historicalReturnyear=[];

$.ajax({
	type: 'GET',
	url: REQUEST_URL_PM+'/getPortfolioAsssetHistoricalReturn?clientId='+vClientId,
	async: false,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
//		console.log(data.historicalPFReturnList);
		$.each(data, function (index, value) {

			historicalReturnvalues.push(value.assetReturn);
			historicalReturnyear.push(value.year);
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


$(function () {
	var input = historicalReturnvalues,
	data = [];
	$.each(input, function(index, value){
		var color
		if (value < 0) color = 'tomato';
		else if (value > 0) color = '#90ed7d';
		else color = '';
		data.push({y:value, color: color});
	});

	$('#idnet').highcharts({
		chart: {
			type: 'column',
		},
		title: {
			text: 'Historical Returns'
		},
		xAxis: {
			categories: historicalReturnyear
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
var modal = document.getElementById('idpoprecommendedaa');
// Get the button that opens the modal
var btn = document.getElementById("idMaxrecommendedaa");
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
var modal1 = document.getElementById('idpoproductrec');
// Get the button that opens the modal
var btn1 = document.getElementById('idMaxproductrec');
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
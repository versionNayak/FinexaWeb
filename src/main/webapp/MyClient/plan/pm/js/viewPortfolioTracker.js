jQuery(document).ready(function ($) {
    $("div.daterangepicker").remove();
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




	var jssor_18_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_18_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_18_SlideshowTransitions,
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


	var jssor_18_slider = new $JssorSlider$("jssor_18", jssor_18_options);
	var productpavdiv = $('.jssort18 div:nth-child(2) div:nth-child(2)>div');
	var currentSum = 0;
	var percTotalSum = 0;
	var investmentValSum = 0;
	var tableContent = "";
	var totalInvestVal = 0;
	var totalCurrentVal =  0;
	var totalGainLoss = 0;
	var totalCagr = 0;
	var percentOfTotal;
	var currentValue;
	//alert("1" + REQUEST_URL_PM);
	$.ajax({
		type: 'GET',
		 url: REQUEST_URL_PM+'/getClientPortfolioOverview?clientId='+vClientId+'&specificRequermentStat="tracker"',
		//url: REQUEST_URL_PM+'/getclientPortfolioOverviewMutualFund?clientId='+vClientId+'&specificRequermentStat="tracker"',
				async: true,
				dataType: 'json',
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
					
					$.each(data, function (index, portfolioTracker) {   	
						if (portfolioTracker.investmentOrPersonFlag == "Y") {
							totalCurrentVal = totalCurrentVal + portfolioTracker.currentValue;
							totalInvestVal = totalInvestVal + portfolioTracker.investmentValue;
						}
					});
					
					$("#oprtFolioTrackerList").empty();
					$("#oprtFolioTrackerListMax").empty();
					$.each(data, function (index, portfolioTracker) {   		
						var investmentValue;
						var gains;
						var cagr;
						if(portfolioTracker.investmentValue==-1){
							investmentValue="N/A";
						}else{
							//parseFloat(portfolioTracker.investmentValue).toFixed(2)
							investmentValue=parseInt(portfolioTracker.investmentValue);
							investmentValSum = investmentValSum + portfolioTracker.investmentValue;
						}

						if(portfolioTracker.gains==-1){
							gains="N/A";
						}else{
							//parseFloat(portfolioTracker.gains).toFixed(2);
							gains=parseInt(portfolioTracker.gains);
						}

						if(!isNaN(portfolioTracker.cagr)){
							cagr=parseFloat(portfolioTracker.cagr).toFixed(2);
						}else{
							cagr=portfolioTracker.cagr;
						}

						 currentValue = parseInt(portfolioTracker.currentValue);
						 percentOfTotal = parseFloat(((portfolioTracker.currentValue)/totalCurrentVal)*100).toFixed(2);
						
						
						//only investment assets will be shown
						if (portfolioTracker.investmentOrPersonFlag == "Y") {
							
							currentSum = currentSum + portfolioTracker.currentValue;
							//percTotalSum = percTotalSum + parseFloat((portfolioTracker.currentPortfolioWeight)*100);
							percTotalSum = parseFloat(percTotalSum) + parseFloat(percentOfTotal);
							var name = portfolioTracker.bankIssuerName == null ? portfolioTracker.productName : portfolioTracker.bankIssuerName; 
							//new
							if(portfolioTracker.productName === 'Mutual Funds'){
							var name = portfolioTracker.productDescLong == null ? portfolioTracker.productName : portfolioTracker.productDescLong; 
							}
							var type = portfolioTracker.bankIssuerName == null ? portfolioTracker.productType :  portfolioTracker.productName;
							tableContent = tableContent + '<tr>' +
							'<td>' + name + '</td>' +
							'<td>' + type + '</td>';

							if(!isNaN(parseFloat(currentValue)) && parseFloat(currentValue) < 0.00){
								tableContent += '<td>' + maskAmountValue(Math.round(currentValue)) + '</td>'; 
							}else{
								if(isNaN(parseFloat(currentValue))) {
									tableContent += '<td>0.00</td>';
								} else {
									tableContent += '<td>' + maskAmountValue(Math.round(currentValue)) + '</td>';
								}

							}

							if(!isNaN(parseFloat(percentOfTotal)) && parseFloat(percentOfTotal) < 0.00){
								tableContent += '<td>' + maskAmountValue(parseFloat(percentOfTotal).toFixed(2)) + '</td>'; 
							}else{
								if(isNaN(parseFloat(percentOfTotal))||(percentOfTotal==0)) {
									tableContent += '<td>0.00</td>';
								} else {
									tableContent += '<td>' + parseFloat(percentOfTotal).toFixed(2) + '</td>';
								}

							}
							if(portfolioTracker.productId==12 || portfolioTracker.productId==13 || portfolioTracker.productId==14 || portfolioTracker.productId==33){
								tableContent += '<td>N/A</td>';
							}else{
							if(!isNaN(parseFloat(investmentValue)) && parseFloat(investmentValue) < 0.00){
								tableContent += '<td>' + maskAmountValue(Math.round(investmentValue)) + '</td>'; 
							}else{
								if(isNaN(parseFloat(investmentValue)) || investmentValue==0) {
									tableContent += '<td>N/A</td>';
								} else {
									tableContent += '<td>' + maskAmountValue(Math.round(investmentValue)) + '</td>';
								}
							}
							}
							//if(portfolioTracker.productId==17){
							//	tableContent += '<td>N/A</td>';
							//}
							//else{
							if(portfolioTracker.productId==12 || portfolioTracker.productId==13 || portfolioTracker.productId==14 || portfolioTracker.productId==33){
								tableContent += '<td>N/A</td>';
							}
							else{
							if (!isNaN(parseFloat(gains))) {
									totalGainLoss = totalGainLoss + Math.round(gains);
							}
							if(!isNaN(parseFloat(gains)) && parseFloat(gains) < 0.00){
								tableContent += '<td>' + maskAmountValue(Math.round(gains)) + '</td>'; 
							}else{
								if (isNaN(parseFloat(gains)) || gains==0) {
									tableContent += '<td>0</td>';
								} else {
									tableContent += '<td>' + maskAmountValue(Math.round(gains)) + '</td>';
							}

							}
							}
							
							//if(portfolioTracker.productId==17){
							//	tableContent += '<td>N/A</td>';
							//}else{
								if (!isNaN(parseFloat(cagr))) {
									//console.log("cagr "+cagr);
									//console.log("percentOfTotal "+percentOfTotal);
									totalCagr = parseFloat(totalCagr + parseFloat((cagr/100)*percentOfTotal));
								    //console.log("total cagr "+parseFloat(totalCagr).toFixed(2));
								}
							if(!isNaN(parseFloat(cagr)) && parseFloat(cagr) < 0.00 && cagr!="N/A"){
								tableContent += '<td>' + maskAmountValue(cagr) + '</td>'; 
							}else{
								 if(isNaN(parseFloat(cagr)) || cagr==-1 || cagr=="N/A" || cagr==null) {
									tableContent += '<td>N/A</td>';
								}
								 if(cagr==0)
								 {
									 tableContent += '<td>0.00</td>';
								 }
								 else {
									tableContent += '<td>' +parseFloat(cagr).toFixed(2)+ '</td>';
								}
							}
							//}
							tableContent=tableContent.replace('<td>NaN</td>',"");
							tableContent.trim();
							tableContent +="</tr>";
						}
						
					}); 
					tableContent += "<tr class='nonglidtotal'>" +
					"<td>Total</td>" +
					"<td></td>" +
					//maskAmountValue(parseInt(currentSum))
					"<td>"+maskAmountValue(parseInt(currentSum))+"</td>" +
					"<td>"+parseFloat(Math.round(percTotalSum)).toFixed(2)+"</td>" +
					//maskAmountValue(parseFloat(totalInvestVal).toFixed(2))
					"<td>"+maskAmountValue(parseInt(totalInvestVal))+"</td>" +
					//maskAmountValue(parseFloat(totalGainLoss).toFixed(2))
					"<td>"+maskAmountValue(parseInt(totalGainLoss))+"</td>" +
					"<td>"+parseFloat(totalCagr).toFixed(2)+"</td>" +
					"</tr>";
					$("#oprtFolioTrackerList").append(tableContent);
					$("#oprtFolioTrackerListMax").append(tableContent);

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

	$(".productright").click(function(){
		if(productpavdiv.hasClass('pav')){	       
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioLoans.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Loans");
			$(".pmtracker").removeClass("activeitem");
			$(".pmloans").addClass("activeitem");
		};
	});

	$(".productleft").click(function(){
		if(productpavdiv.hasClass('pav')){	       
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioRiskProfile.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Risk Profile");
			$(".pmtracker").removeClass("activeitem");
			$(".pmRiskProfile").addClass("activeitem");	   
		};
	});
	
	/* track*/
	var modal = document.getElementById("idPoptrackdetails");

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxtrack");

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


});

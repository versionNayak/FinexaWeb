jQuery(document).ready(function ($) {



	$(".popupwindow").click(function(){

		$(".individualoan").css("width","100%");


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






	var jssor_13_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


		];

	var jssor_13_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_13_SlideshowTransitions,
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

	var jssor_13_slider = new $JssorSlider$("jssor_13", jssor_13_options);

	var loanpavright = $('.jssort13 div:nth-child(2) div:nth-child(5) div');
	var loanpavleft = $('.jssort13 div:nth-child(2) div:nth-child(2) div');

	$(".Loansright").click(function(){
		
		if(loanpavright.hasClass('pav'))
		{	
			
			if(loggedUser == null && loggedClient != null){
				$("#idBody").empty();
				$("#idBody").load("plan/fp/viewPlanofAcion.html");

				$(".glidnonglid").hide();
				$("#idHeading").html("Cash Flows");
				$(".fpinsuranceplanning").removeClass("activeitem");
				$(".fpcashflows").addClass("activeitem");

			}else{
				$("#idBody").empty();
				$("#idBody").load("plan/fp/viewFinancialCashflow.html");

				$(".glidnonglid").hide();
				$("#idHeading").html("Cash Flows");
				$(".fpinsuranceplanning").removeClass("activeitem");
				$(".fpcashflows").addClass("activeitem");

			} 
		};
	});

	$(".Loansleft").click(function(){
		if(loanpavleft.hasClass('pav'))
		{
			
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialGoalExecution.html");
			$(".glidnonglid").hide();
			$("#idHeading").html("Goal Execution");
			$(".fpinsuranceplanning").removeClass("activeitem");
			$(".fpgoalexecution").addClass("activeitem");

		};/** Added on 19th sep version for arrow key(NehaD) end **/
	});



	var modal = document.getElementById('idPopIndividual');

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxIndiLoans");

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

	/*For loantotal */

	var modal1 = document.getElementById('idPoptotalLoan');

//	Get the button that opens the modal
	var btn1 = document.getElementById("idMaxTotalLoan");

//	Get the <span> element that closes the modal
	var span1 = document.getElementsByClassName("close1")[0];

//	When the user clicks the button, open the modal 
	btn1.onclick = function() {
		$(".onpopupscroller").css("overflow","hidden");
		modal1.style.display = "block";
	}

//	When the user clicks on <span> (x), close the modal
	span1.onclick = function() {
		$(".onpopupscroller").css("overflow","visible");
		modal1.style.display = "none";
	}

//	When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal1) {
			modal1.style.display = "none";
		}
	}

});

// Life Cover Table	
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


			$("#lifeCoverTable").append('<tr>' +
					'<td>' + lifeCover.memberName + '</td>' +
					'<td>' + maskAmountValue(lifeCover.existingLifeCover) + '</td>' +
					'<td>' + maskAmountValue(parseFloat(lifeCover.required).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((lifeCover.additional)).toFixed(2)) + '</td>' +
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




// Health Cover Table	
$.ajax({
	type: 'GET',
	url: REQUEST_URL_FP+'/getClientFMInsuranceHealthCover?clientId='+vClientId,
	async: false,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {

		$("#healthCoverTable").empty();
		$("#healthCoverTablePopup").empty();
		$.each(data, function (index, healthCover) {   				

			$("#healthCoverTable").append('<tr>' +
					'<td>' + healthCover.memberName + '</td>' +
					'<td>' + maskAmountValue(healthCover.existingIndividualCover) + '</td>' +
					'<td>' + maskAmountValue(parseFloat(healthCover.existingFloatingCover).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat(healthCover.requredIndividualCover).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat(healthCover.requredFloatingCover).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((healthCover.individualBaseCover)).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((healthCover.individualTopUpCover)).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((healthCover.floaterBaseCover)).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((healthCover.floaterTopUpCover)).toFixed(2)) + '</td>' +
			'</tr>');

			$("#healthCoverTablePopup").append('<tr>' +
					'<td>' + healthCover.relationship + '</td>' +
					'<td>' + maskAmountValue(healthCover.individualCover) + '</td>' +
					'<td>' + maskAmountValue(parseFloat(healthCover.floaterCover).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(healthCover.existingIndividualCover) + '</td>' +
					'<td>' + maskAmountValue(parseFloat(healthCover.existingFloatingCover).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((healthCover.individualBaseCover)).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((healthCover.individualTopUpCover)).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((healthCover.floaterBaseCover)).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((healthCover.floaterTopUpCover)).toFixed(2)) + '</td>' +
			'</tr>');
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




// Critical Illness Table	
$.ajax({
	type: 'GET',
	url: REQUEST_URL_FP+'/getClientFMInsuranceCICover?clientId='+vClientId,
	async: false,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {

		$("#criticalIllnessTable").empty();
		$("#criticalIllnessTablePopup").empty();
		$.each(data, function (index, criticalIllness) {   		


			$("#criticalIllnessTable").append('<tr>' +
					'<td>' + criticalIllness.memberName + '</td>' +
					'<td>' + maskAmountValue(criticalIllness.existing) + '</td>' +
					'<td>' + maskAmountValue(parseFloat(criticalIllness.ciCoverRequired).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((criticalIllness.additional)).toFixed(2)) + '</td>' +
			'</tr>');

			$("#criticalIllnessTablePopup").append('<tr>' +
					'<td>' + criticalIllness.relationship + '</td>' +
					'<td>' + criticalIllness.existing + '</td>' +
					'<td>' + maskAmountValue(parseFloat(criticalIllness.ciCoverRequired).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat((criticalIllness.additional)).toFixed(2)) + '</td>' +
			'</tr>');
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







// Permanent Disability Table	
$.ajax({
	type: 'GET',
	url: REQUEST_URL_FP+'/getClientFMInsurancePAccCover?clientId='+vClientId,
	async: false,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {

		$("#permanentDisabilityTable").empty();
		//	$("#lifeCoverTable").empty();
		$.each(data, function (index, permanentDisability) {   		


			$("#permanentDisabilityTable").append('<tr>' +
					'<td>' + permanentDisability.memberName + '</td>' +
					'<td>' + maskAmountValue(permanentDisability.existing) + '</td>' +
					'<td>' + maskAmountValue(parseFloat(permanentDisability.personalAccidentCover).toFixed(2)) + '</td>' +
					'<td>' + maskAmountValue(parseFloat(permanentDisability.additional).toFixed(2)) + '</td>' +
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



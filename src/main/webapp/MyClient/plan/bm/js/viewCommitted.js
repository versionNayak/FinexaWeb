$("#idDivCom1").hide();
$("#idDivCom2").hide();
$(document).ready(function(){	
	$(".form-section-container").css("padding","24px 45px 94px 45px");
	$(document).on("click", ".bootboxalert", function(e) {
		bootbox.alert("Hello world!", function() {
			console.log("Alert Callback");
		});
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


	$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-C.png");

	$(".assetOwner1_img").click(function() {
		$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-C.png");

		$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
		$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
		$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
		$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
		$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
		$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");

	});

	$(".assetOwner2_img").click(function() {
		$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");

		$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-C.png");
		$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
		$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
		$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
		$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
		$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");
	});

	$(".assetOwner3_img").click(function() {
		$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");

		$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
		$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-C.png");
		$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
		$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
		$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
		$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");
	});
	$(".assetOwner4_img").click(function() {
		$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");

		$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
		$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
		$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-C.png");
		$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
		$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
		$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");
	});
	$(".assetOwner5_img").click(function() {
		$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");

		$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
		$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
		$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
		$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-C.png");
		$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
		$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");
	});
	$(".assetOwner6_img").click(function() {
		$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");

		$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
		$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
		$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
		$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
		$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-C.png");
		$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");
	});
	$(".assetOwner7_img").click(function() {
		$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");

		$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
		$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
		$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
		$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
		$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
		$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-C.png");
	});




	var jssor_12_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


		];

	var jssor_12_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_12_SlideshowTransitions,
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

	var jssor_12_slider = new $JssorSlider$("jssor_12", jssor_12_options);

	var comittedpavright = $('.jssort12 div:nth-child(2) div:nth-child(3) div');
	var comittedpavleft = $('.jssort12 div:nth-child(2) div:nth-child(2) div');

	$(".committedright").click(function(){
		if(comittedpavright.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/bm/viewLoans.html");
			$("#idHeading").html("Loans");
			$(".Loans").addClass("activeitem");
			$(".committed").removeClass("activeitem");
		};
	});

	$(".committedleft").click(function(){
		if(comittedpavleft.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/bm/viewExpenses.html");
			$("#idHeading").html("Expenses");
			$(".committed").removeClass("activeitem");
			$(".Expenses").addClass("activeitem");
		};
	});

	var modal = document.getElementById('idPopCommit');

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxCommit");

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

	/**********************************UI Integration ******************************/
	$("#idDownload").click(function(){
		var mode;
		var errorFlag = 0;
		if($('#idMonthlyRadio').prop("checked")) {
			mode = "monthly";
		} else if ($('#idYearlyRadio').prop("checked")){
			mode = "yearly";
		} else {
			errorFlag = 1;
			alert("Please select a valid option");
		}
		if (errorFlag == 0) {
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";
			var fileName = "CommitedOutflow_"+ mode + "_report.xlsx";

			var xhr = new XMLHttpRequest();
			//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
			xhr.open( "GET", REQUEST_URL_BM+'/downloadOutFlow?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			xhr.responseType = "blob";
			xhr.onload = function() {
				if(xhr.status == 401){
		        	bootbox.alert({
		        	    message: "You are not authenticated",
		        	    callback: function () {
			        	  window.location = "../index.html";
		        	    }
		        	})
		        }else if(xhr.status == 403){
		        	 msg = 'you don’t have permission to access ‘/’ on this server.';
		        	 alert(msg);
		        }else{
				var url = window.URL.createObjectURL(xhr.response);  
				a.href = url;
				a.download = fileName;
				a.click();
				window.URL.revokeObjectURL(url);
		        }
			};
			xhr.send();  
		}

	});

	$("#idDownloadModal").click(function(){
		var mode;
		var errorFlag = 0;
		if($('#idMonthlyRadioModal').prop("checked")) {
			mode = "monthly";
		} else if ($('#idYearlyRadioModal').prop("checked")){
			mode = "yearly";
		} else {
			errorFlag = 1;
			alert("Please select a valid option");
		}
		if (errorFlag == 0) {
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";
			var fileName = "CommitedOutflow_"+ mode + "_report.xlsx";

			var xhr = new XMLHttpRequest();
			//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
			xhr.open( "GET", REQUEST_URL_BM+'/downloadOutFlow?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			xhr.responseType = "blob";
			xhr.onload = function() {
				if(xhr.status == 401){
		        	bootbox.alert({
		        	    message: "You are not authenticated",
		        	    callback: function () {
			        	  window.location = "../index.html";
		        	    }
		        	})
		        }else if(xhr.status == 403){
		        	 msg = 'you don’t have permission to access ‘/’ on this server.';
		        	 alert(msg);
		        }else{
				var url = window.URL.createObjectURL(xhr.response);  
				a.href = url;
				a.download = fileName;
				a.click();
				window.URL.revokeObjectURL(url);
		        }
			};
			xhr.send();  
		}
	});
	var flagGeneral = 0;
	var flagHealth = 0;
	var flagLife = 0;
	var flagInvestment = 0;
	var flagTotalCO = 0;
	var flagRow = 0;
	var lastFinYearToBeDisplayed="";
	$.ajax({
		type: 'GET',
		async : true,
		url: REQUEST_URL_BM + '/getCommitedOutflow?clientId=' +vClientId+ '&mode=yearly&fpFlag=0',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
//			$("#COFHeadIdDetailed").text("Committed Outflows FY " + data.projectionYear);


			$("#commitedOutflowPremium").text(maskAmountValue(Math.round(data.premiumAMount)));

			if (parseInt(data.premiumAMount) == 0) {
				$("#commitedOutflowPremiumPerc").text("0.00%");
				$("#idCOCurrentTable tbody tr.classCOLifePremium").hide();

			} else {
				$("#commitedOutflowPremiumPerc").text((parseFloat((data.premiumAMount / data.totalOutFlow) * 100).toFixed(2))+"%");

			}

			$("#commitedOutflowPremiumGeneral").text(maskAmountValue(Math.round(data.premiumAmountGeneral)));
			if (parseInt(data.premiumAmountGeneral) == 0) {
				$("#commitedOutflowPremiumGeneralPerc").text("0.00%");
				$("#idCOCurrentTable tbody tr.classCOGeneralPremium").hide();

			} else {
				$("#commitedOutflowPremiumGeneralPerc").text((parseFloat((data.premiumAmountGeneral / data.totalOutFlow) * 100).toFixed(2))+"%");

			}

			$("#commitedOutflowPremiumHealth").text(maskAmountValue(Math.round(data.premiumAmountHealth)));
			if (parseInt(data.premiumAmountHealth) == 0) {
				$("#commitedOutflowPremiumHealthPerc").text("0.00%");
				$("#idCOCurrentTable tbody tr.classCOHealthPremium").hide();

			} else {
				$("#commitedOutflowPremiumHealthPerc").text((parseFloat((data.premiumAmountHealth / data.totalOutFlow) * 100).toFixed(2))+"%");

			}

			$("#commitedOutflowInvestment").text(maskAmountValue(Math.round(data.investmentAmount)));
			if (parseInt(data.investmentAmount) == 0) {
				$("#commitedOutflowInvestmentPerc").text("0.00%");
				$("#idCOCurrentTable tbody tr.classCOInvestment").hide();

			} else {
				$("#commitedOutflowInvestmentPerc").text(parseFloat(((data.investmentAmount / data.totalOutFlow) * 100).toFixed(2))+"%");

			}
			$("#totalOutFlow").text(maskAmountValue(parseFloat(data.totalOutFlow)));
			if (parseInt(data.totalOutFlow) == 0) {
				$("#totalOutFlowPerc").text("0.00%");
				$("#alertForOutFlows").show()
			} else {
				$("#totalOutFlowPerc").text(parseFloat(((data.totalOutFlow / data.totalOutFlow) * 100).toFixed(2))+".00%");
				$("#alertForOutFlows").hide()
			}
			$.each(data.outFlowList,
					function(index, value) {
				
				if(value.premiumAMount == 0 && value.premiumAmountGeneral == 0 && value.premiumAmountHealth == 0 &&
						value.investmentAmount == 0) {
					flagRow = 1;
				} else {
					flagRow = 0;
					if(data.outFlowList[index + 1] != null) {
						lastFinYearToBeDisplayed = data.outFlowList[index + 1].projectionYear;
					}
					
				}
				if (parseFloat(value.premiumAMount).toFixed(2) != 0.00) {
					flagLife = 1;
				}
				if (parseFloat(value.premiumAmountGeneral).toFixed(2) != 0.00) {
					flagGeneral = 1;
				}
				if (parseFloat(value.premiumAmountHealth).toFixed(2) != 0.00) {
					flagHealth = 1;
				}
				if (parseFloat(value.investmentAmount).toFixed(2) != 0.00) {
					flagInvestment = 1;
				}
				if (parseFloat(value.totalOutFlow).toFixed(2) != 0.00) {
					flagTotalCO = 1;
				}

			});
			// hide rows
			$.each(data.outFlowList,
					function(rowIndex, rowValue) {
				if(flagRow == 1 && rowValue.projectionYear == lastFinYearToBeDisplayed){
					 return false; 
				} else {
					$('#idCOProjection').append(
							'<tr><td>'+ rowValue.projectionYear+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.premiumAMount))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.premiumAmountGeneral))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.premiumAmountHealth))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.investmentAmount))+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.totalOutFlow))+'</td></tr>');
					$('#idCOProjectionModal').append(
							'<tr><td>'+ rowValue.projectionYear+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.premiumAMount))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.premiumAmountGeneral))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.premiumAmountHealth))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.investmentAmount))+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.totalOutFlow))+'</td></tr>');
					
				}
			});
			
			// hide all zero containing columns of summarized expense table
			if(flagLife == 0) {
				$('#idCOTable td:nth-child(2),#idCOTable th:nth-child(2)').hide();
				$('#idCOTableModal td:nth-child(2),#idCOTableModal th:nth-child(2)').hide();
			}
			if(flagGeneral == 0) {
				$('#idCOTable td:nth-child(3),#idCOTable th:nth-child(3)').hide();
				$('#idCOTableModal td:nth-child(3),#idCOTableModal th:nth-child(3)').hide();
			}
			if(flagHealth == 0) {
				$('#idCOTable td:nth-child(4),#idCOTable th:nth-child(4)').hide();
				$('#idCOTableModal td:nth-child(4),#idCOTableModal th:nth-child(4)').hide();
			}
			if(flagInvestment == 0) {
				$('#idCOTable td:nth-child(5),#idCOTable th:nth-child(5)').hide();
				$('#idCOTableModal td:nth-child(5),#idCOTableModal th:nth-child(5)').hide();
			}
			if(flagTotalCO == 0) {
				$('#idCOTable td:nth-child(6),#idCOTable th:nth-child(6)').hide();
				$('#idCOTableModal td:nth-child(6),#idCOTableModal th:nth-child(6)').hide();
			}
			
			$("#idDivCom1").show();
			$("#idDivCom2").show();

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
				   else if(xhr.status == 403){
		        msg = 'you don’t have permission to access ‘/’ on this server.';
		        alert(msg);
		    }
		    else{
			$("#COFHeadIdDetailed").text("Committed Outflows");
			$("#commitedOutflowPremium").text(0);
			$("#commitedOutflowPremiumPerc").text("0.00%");
			$("#commitedOutflowPremiumHealth").text(0);
			$("#commitedOutflowPremiumHealthPerc").text("0.00%");
			$("#commitedOutflowInvestment").text(0);
			$("#commitedOutflowInvestmentPerc").text("0.00%");
			$("#totalOutFlow").text(0);
			$("#totalOutFlowPerc").text("0.00%");
			bootbox.alert(data.responseText);
		    }
			
		}
	});

});









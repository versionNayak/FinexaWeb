/******************************************UI Integration ************************************/
$(document).ready(function(){
	var jssor_21_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


		];

	var jssor_21_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_21_SlideshowTransitions,
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

	var jssor_21_slider = new $JssorSlider$("jssor_21", jssor_21_options);

	var recompavright = $('.jssort21 div:nth-child(2) div:nth-child(4) div');
	var recompavleft = $('.jssort21 div:nth-child(2) div:nth-child(2) div');

	$(".Incomeright").click(function(){
		if(recompavright.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialNetsurplus.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Net Surplus");
			$(".fplantofaction").removeClass("activeitem");
			$(".pfnetsurplus").addClass("activeitem");
		};
	});

	$(".Incomeleft").click(function(){
		if(recompavleft.hasClass('pav'))
		{	
			
			if(loggedUser == null && loggedClient != null){
				$("#idBody").empty();
				$("#idBody").load("plan/fp/viewInsurancePlanning.html");
				$(".form-section-container").css("padding","27px 45px 101px");
				$(".glidnonglid").hide();
				$("#idHeading").html("Insurance Planning");
				$(".fplantofaction").removeClass("activeitem");
				$(".fpcashflows").addClass("activeitem");

			}else{
				$("#idBody").empty();
				$("#idBody").load("plan/fp/viewFinancialCashflow.html");
				$(".form-section-container").css("padding","27px 45px 101px");
				$(".glidnonglid").hide();
				$("#idHeading").html("Cash Flows");
				$(".fplantofaction").removeClass("activeitem");
				$(".fpcashflows").addClass("activeitem");

			} 
			
			




		};/** Added on 19th sep version for arrow key(NehaD) end **/
	});


	$.ajax({
		type: 'GET',
		async:false,
		url: REQUEST_URL_FP+'/getClientEmergencyFundDetails?clientId='+vClientId+'',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {	
			currentyear = data[0].year;
			fundRequired = data[0].totalContigencyFund;
			$("#idContingencyYear").text(currentyear);
			$("#idContingencyAmt").text(maskAmountValue(Math.round(parseFloat(fundRequired).toFixed(2))));
//			var amount = maskAmountValue(parseFloat(fundRequired).toFixed(0));
//			alert(amount);
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

	// calling LifeInsurance Cover

	$.ajax({
		type: 'GET',
		async:false,
		url: REQUEST_URL_FP+'/getClientFMInsuranceLifeCover?clientId='+vClientId+'',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {	
			$.each(data,function(index, value) {
				$('#idLifeCoverTable').append(
						'<tr><td>'+ value.relationship+ '</td><td>'+maskAmountValue(value.additional.toFixed())+'</td></tr>');
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

	// calling HealthInsuranceCover
	$.ajax({
		type: 'GET',
		async:false,
		url: REQUEST_URL_FP+'/getClientFMInsuranceHealthCover?clientId='+vClientId+'',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {

			$("#healthCoverTable").empty();
			$.each(data, function (index, healthCover) {   				

				$("#healthCoverTable").append('<tr>' +
						'<td>' + healthCover.relationship + '</td>' +
						'<td>' + maskAmountValue(healthCover.existingIndividualCover) + '</td>' +
						'<td>' + maskAmountValue(parseFloat(healthCover.existingFloatingCover).toFixed(2)) + '</td>' +
						'<td>' + maskAmountValue(parseFloat(healthCover.requredIndividualCover).toFixed(2)) + '</td>' +
						'<td>' + maskAmountValue(parseFloat(healthCover.requredFloatingCover).toFixed(2)) + '</td>' +
						'<td>' + maskAmountValue(parseFloat((healthCover.individualBaseCover)).toFixed(2)) + '</td>' +
						'<td>' + maskAmountValue(parseFloat((healthCover.individualTopUpCover)).toFixed(2)) + '</td>' +
						'<td>' + maskAmountValue(parseFloat((healthCover.floaterBaseCover)).toFixed(2)) + '</td>' +
						'<td>' + maskAmountValue(parseFloat((healthCover.floaterTopUpCover)).toFixed(2)) + '</td>' +
				'</tr>');
			}); 
			if (data.length == 0) {
				$("#idHealthTable").hide();
			}


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
			$.each(data, function (index, criticalIllness) {   		


				$("#criticalIllnessTable").append('<tr>' +
						'<td>' + criticalIllness.relationship + '</td>' +
						'<td>' + maskAmountValue(criticalIllness.existing) + '</td>' +
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
			$.each(data, function (index, permanentDisability) {   		


				$("#permanentDisabilityTable").append('<tr>' +
						'<td>' + permanentDisability.relationship + '</td>' +
						'<td>' + maskAmountValue(permanentDisability.existing) + '</td>' +
						'<td>' + maskAmountValue(parseFloat(permanentDisability.personalAccidentCover).toFixed(2)) + '</td>' +
						'<td>' + maskAmountValue(parseFloat(permanentDisability.additional).toFixed(2)) + '</td>' +
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


	// loading Asset ReBalancing Table
	var tableString = "<table width='80%' class='planofaction' "+
	"border='1' style='margin-left: 30px;margin-top:38px'><thead><tr>" +
	"<th colspan='11' class='aligncenter'>Asset Re-balancing</th></tr></thead>";
	var firstTimeFlag = 0;
	$.ajax({
		type: 'GET',
		async : false,
		url: REQUEST_URL_FP + '/getAssetReBlncDetails?clientId=' +vClientId+ '',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			tableString = tableString + "<tbody>";
			$.each(data,
					function(index, value) {
				if(value.assetAlloMap != null) {
					
					if(firstTimeFlag == 0) {
						tableString = tableString + "<tr><th>"+value.finYear+"</td>"
						tableString = tableString + "<th class='aligncenter'>Cash/Liquid</td>";
						tableString = tableString + "<th class='aligncenter'>Ultra Short Term Debt</td>";
						tableString = tableString + "<th class='aligncenter'>Short Term Debt</td>";
						tableString = tableString + "<th class='aligncenter'>Long Term Debt</td>";
						tableString = tableString + "<th class='aligncenter'>Equity Large</td>";
						tableString = tableString + "<th class='aligncenter'>Equity Mid & Small</td>";
						tableString = tableString + "<th class='aligncenter'>Equity International</td>";
						tableString = tableString + "<th class='aligncenter'>Alternative Precious</td>";
						tableString = tableString + "<th class='aligncenter'>Alternative Real Estate</td>";
						tableString = tableString + "<th class='aligncenter'>Alternative Others</td></tr>";
						firstTimeFlag = 1;
					} else {
						tableString = tableString + "<tr><th colspan='11'>"+value.finYear+"</td>"
					}
					
					$.each(value.assetAlloMap,
							function(index1, value1) {
						var indexOfHiphen = index1.indexOf("-");
						var assetNameDisplayed = index1.substring(indexOfHiphen+1);
						var n = index1.lastIndexOf("-");
						var newVar = index1.substring(n+1);
						if(newVar == "null") {
							assetNameDisplayed = index1.substring(indexOfHiphen+1,n);
						}
						tableString = tableString + "<tr><td class='aligncenter'>"+assetNameDisplayed+"</td>"
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.cashLiquidPerc).toFixed(2)))+"</td>";
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.ultraShortTermDebtPerc).toFixed(2)))+"</td>";
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.shortTermDebtOerc).toFixed(2)))+"</td>";
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.longTermDebtPerc).toFixed(2)))+"</td>";
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.equityLargePerc).toFixed(2)))+"</td>";
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.equityMidPerc).toFixed(2)))+"</td>";
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.equityInternationalPerc).toFixed(2)))+"</td>";
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.alternativePreciousPerc).toFixed(2)))+"</td>";
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.alternativeRealExtatePerc).toFixed(2)))+"</td>";
						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(Math.round(parseFloat(value1.alternativeOthersPerc).toFixed(2)))+"</td>";
//						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(parseFloat(value1.equityLargePerc).toFixed(2))+"</td>";
//						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(parseFloat(value1.equityMidSmallPerc).toFixed(2))+"</td>";
//						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(parseFloat(value1.equityInternationalPerc).toFixed(2))+"</td>";
//						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(parseFloat(value1.alternativePreciousPerc).toFixed(2))+"</td>";
//						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(parseFloat(value1.alternativeRealExtatePerc).toFixed(2))+"</td>";
//						tableString = tableString + "<td class='aligncenter'>"+maskAmountValue(parseFloat(value1.alternativeOthersPerc).toFixed(2))+"</td></tr>";
					});
					
				}
			});
			tableString = tableString + "</tbody></table>";
			$("#idAssetReBlncDiv").append(tableString);
			$("#idAssetRebalancingDivModal").append(tableString);
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

	var modal = document.getElementById("idpopcurrentaa");
	// Get the button that opens the modal
	var btn = document.getElementById("idMaxcurrentsubaa");
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

	// loading Asset Allocation Table
	var goalNo = 0;
	var goalDesc = [];
	var goalIdList = [];
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getClientGoalList?clientId='+vClientId,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$.each(data,function(index, value) {
				goalNo = goalNo + 1;
				goalIdList.push(value.goalId);
				goalDesc.push(value.goalDescName);
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

	var alloString = ("<table id='idAsssetAllocationTable' width='60%' class='planofaction'"+
			"border='1' style='margin-top: 25px; margin-left: 177px;'>"+
			"<thead>"+
	"<tr><th style='text-align: left'>Year</th>");
	for (goalIndex = 0; goalIndex < goalIdList.length; goalIndex ++) {
		alloString = alloString + "<th>Risk Profile</th><th>"+goalDesc[goalIndex]+"</th>"
	}
	alloString = alloString + "</thead><tbody id='idAllocateTbody'></tbody></table>";
	$("#idDivPlan").append(alloString);

	$.ajax({
		type: 'GET',
		async : false,
		url: REQUEST_URL_FP + '/getRiskProfileVsAllocationProjection?clientId=' +vClientId+ '',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$('#idAllocateTbody').empty();
			if (data.length > 0) {
				var maxIteration = data[0].riskProfileAllocatorDTOList.length;
				$.each(data,
						function(index, value) {
					if (maxIteration < value.riskProfileAllocatorDTOList.length) {
						maxIteration = value.riskProfileAllocatorDTOList.length;
					}
				});
				var tbody = "";
				for (ite = 0;ite < maxIteration; ite ++) {
					var finYear="";
					for (goalIndex = 0; goalIndex < goalIdList.length; goalIndex ++) {
						if (data[goalIndex] != null) {
							if (data[goalIndex].riskProfileAllocatorDTOList[ite] != null) {
								finYear = data[goalIndex].riskProfileAllocatorDTOList[ite].finYear;
							}
						}
					}

					tbody = tbody + "<tr><td>"+finYear+"</td>";
					for (goalIndex = 0; goalIndex < goalIdList.length; goalIndex ++) {
						var flag = 0;
						for (dataIndex = 0 ; dataIndex < data.length; dataIndex ++){
							if(data[dataIndex] != null && data[dataIndex].riskProfileAllocatorDTOList[ite] != null && data[dataIndex].goalId == goalIdList[goalIndex]) {
								tbody = tbody + "<td>"+data[dataIndex].riskProfileAllocatorDTOList[ite].riskProfile
								+"</td><td>"+maskAmountValue(parseFloat(data[dataIndex].riskProfileAllocatorDTOList[ite].totalAllocate).toFixed(2))+"</td>";
								flag = 1;
							}
						}
						if (flag == 0) {
							tbody = tbody + "<td></td><td></td>";
						}
					}
					tbody = tbody + "</tr>";
				}
				$('#idAllocateTbody').append(tbody);
			} else {
				$('#idAsssetAllocationTable').hide();
			}
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
		  $('#idAllocateTbody').empty()
		}
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
		var input = [70000,110000, 120000, 130000,140000,200000,-210000,-220000,-230000,-240000],
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
				text: ''
			},
			xAxis: {
				categories: [
					'2016-2017','2017-2018', '2018-2019','2019-2020', '2020-2021','2021-2022', '2022-2023','2023-2024', '2024-2025','2025-2026']
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
		var input = [70000,110000, 120000, 130000,140000,200000,-210000,-220000,-230000,-240000],
		data = [];
		$.each(input, function(index, value){
			var color
			if (value < 0) color = 'tomato';
			else if (value > 0) color = '#90ed7d';
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
					'2016-2017','2017-2018', '2018-2019','2019-2020', '2020-2021','2021-2022', '2022-2023','2023-2024', '2024-2025','2025-2026'
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
});

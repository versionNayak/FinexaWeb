$("#idNetDiv").hide();
$("#idNetDivProj").hide();
$("#idNetDivGraph").hide();
$(document).ready(function(){
	
	$(".form-section-container").css("padding","24px 45px 94px 45px");

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

	var jssor_14_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


		];

	var jssor_14_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_14_SlideshowTransitions,
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

	var jssor_14_slider = new $JssorSlider$("jssor_14", jssor_14_options);

	var netpavright = $('.jssort14 div:nth-child(2) div:nth-child(4) div');
	var netpavleft = $('.jssort14 div:nth-child(2) div:nth-child(2) div');

	$(".netright").click(function(){

		if(netpavright.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/bm/viewBudgetRatio.html");
			$(".form-section-container").css("padding","24px 45px 116px");
			$("#idHeading").html("Budget Ratio");
			$(".BudgetRatio").addClass("activeitem");
			$(".NetSurplus").removeClass("activeitem");
		};
	});

	$(".netleft").click(function(){
		if(netpavleft.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/bm/viewLoans.html");
			$("#idHeading").html("Loans");
			$(".NetSurplus").removeClass("activeitem");
			$(".Loans").addClass("activeitem");

		};
	});
	var modal = document.getElementById('idPopSurplus');

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxSurplus");

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

	var modal1 = document.getElementById('idPopSurplusProj');

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxSurplusProj");

//	Get the <span> element that closes the modal
	var span1 = document.getElementsByClassName("close1")[0];

//	When the user clicks the button, open the modal 
	btn.onclick = function() {
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
		if (event.target == modal) {
			modal1.style.display = "none";
		}
	}

	/********************************UI Integration ***************************/
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
			var fileName = "NetSurplus_"+ mode + "_report.xlsx";

			var xhr = new XMLHttpRequest();
			//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
			xhr.open( "GET", REQUEST_URL_BM+'/downloadNetSurplus?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			xhr.responseType = "blob";
			xhr.onload = function() {
				var url = window.URL.createObjectURL(xhr.response);  
				a.href = url;
				a.download = fileName;
				a.click();
				window.URL.revokeObjectURL(url);
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
			var fileName = "NetSurplus_"+ mode + "_report.xlsx";

			var xhr = new XMLHttpRequest();
			//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
			xhr.open( "GET", REQUEST_URL_BM+'/downloadNetSurplus?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			xhr.responseType = "blob";
			xhr.onload = function() {
				var url = window.URL.createObjectURL(xhr.response);  
				a.href = url;
				a.download = fileName;
				a.click();
				window.URL.revokeObjectURL(url);
			};
			xhr.send();  
		}
	});

	var salaryIncome;
	var salaryIncomePercent;
	var bonousPercent;
	var profPercent;
	var bussPercent;
	var rentIncomePercent;
	var otherIncomePercent;
	var interestIncomePercent;
	var pensionPercent;
	var totalIncome;
	var totalExpense;

	$.ajax({
		type: 'GET',
		// url: 'http://192.168.1.103:8080/FinexaService/getClientIncomeInfo?clientId='+vClientId+'&mode=yearly',
		url: REQUEST_URL_BM+'/getClientIncomeInfo?clientId='+vClientId+'&mode=yearly&fpFlag=0',
		async: true,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			//alert(data);
			$("#heading_net")
			.text("Net Surplus FY " + data.year);
			salaryIncome = data.salaryIncome;
			totalIncome = data.totalIncome;

//			alert(salaryIncome);
			$("#salaryAmountnet")
			.text(maskAmountValue(Math.round(salaryIncome)));
			$("#idSalModal")
			.text(maskAmountValue(Math.round(salaryIncome)));
			if(salaryIncome == 0) {
				$("#idNetsurplusTable tbody tr.classSalary").hide();
				$("#idNetsurplusTableModal tbody tr.classSalaryModal").hide();
			}

			$("#bonousAmountnet")
			.text(maskAmountValue(Math.round(data.bonousIncome)));
			$("#idBonusModal")
			.text(maskAmountValue(Math.round(data.bonousIncome)));
			if(data.bonousIncome == 0) {
				$("#idNetsurplusTable tbody tr.classBonus").hide();
				$("#idNetsurplusTableModal tbody tr.classBonusModal").hide();
			}

			$("#profFessnet")
			.text(maskAmountValue(Math.round(data.professionalFee)));
			$("#idProfModal")
			.text(maskAmountValue(Math.round(data.professionalFee)));
			if(data.professionalFee == 0) {
				$("#idNetsurplusTable tbody tr.classProf").hide();
				$("#idNetsurplusTableModal tbody tr.classProfModal").hide();
			}

			$("#bussIncomenet")
			.text(maskAmountValue(Math.round(data.bussinessIncome)));
			$("#idBussModal")
			.text(maskAmountValue(Math.round(data.bussinessIncome)));
			if(data.bussinessIncome == 0) {
				$("#idNetsurplusTable tbody tr.classBuss").hide();
				$("#idNetsurplusTableModal tbody tr.classBussModal").hide();
			}

			$("#rentIncomenet")
			.text(maskAmountValue(Math.round(data.rentalIncome)));
			$("#idRentModal")
			.text(maskAmountValue(Math.round(data.rentalIncome/100)));
			if(data.rentalIncome == 0) {
				$("#idNetsurplusTable tbody tr.classRent").hide();
				$("#idNetsurplusTableModal tbody tr.classRentModal").hide();
			}

			$("#pensionnet")
			.text(maskAmountValue(Math.round(data.pension)));
			$("#idPensionModal")
			.text(maskAmountValue(parseFloat(data.pension)));
			if(data.pension == 0) {
				$("#idNetsurplusTable tbody tr.classPension").hide();
				$("#idNetsurplusTableModal tbody tr.classPensionModal").hide();
			}

			$("#otherIncomenet")
			.text(maskAmountValue(Math.round(data.otherIncome)));
			$("#idOtherModal")
			.text(maskAmountValue(Math.round(data.otherIncome)));
			if(data.otherIncome == 0) {
				$("#idNetsurplusTable tbody tr.classOther").hide();
				$("#idNetsurplusTableModal tbody tr.classOtherModal").hide();
			}

			$("#interestIncomenet")
			.text(maskAmountValue(Math.round(data.interestIncome)));
			$("#idInterestIncomeModal")
			.text(maskAmountValue(Math.round(data.interestIncome)));
			if(parseInt(data.interestIncome ) == 0) {
				$("#idNetsurplusTable tbody tr.classInterest").hide();
				$("#idNetsurplusTableModal tbody tr.classInterestModal").hide();
			}

			$("#indTotalIncomenet")
			.text(maskAmountValue(Math.round(data.individualTotalIncome)));
			$("#indTotalIncomenetModal")
			.text(maskAmountValue(Math.round(data.individualTotalIncome)));
			if(parseInt(data.individualTotalIncome ) == 0) {
				$("#idNetsurplusTable tbody tr.classIndTotal").hide();
				$("#idNetsurplusTableModal tbody tr.classIndTotalModal").hide();
			}

			$("#totalIncomenet")
			.text(maskAmountValue(Math.round(data.totalIncome)));
			$("#idTotalModal")
			.text(maskAmountValue(Math.round(data.totalIncome)));


			$("#salaryPercentnet")
			.text(parseFloat((data.salaryIncome / data.totalIncome) * 100).toFixed(2) + "%");
			$("#idSalModalPerc")
			.text(parseFloat((data.salaryIncome / data.totalIncome) * 100).toFixed(2) + "%");
			salaryIncomePercent = (data.salaryIncome / data.totalIncome) * 100;

			$("#bonousPercentnet")
			.text(parseFloat((data.bonousIncome / data.totalIncome) * 100).toFixed(2) + "%");
			$("#idBonusModalPerc")
			.text(parseFloat((data.bonousIncome / data.totalIncome) * 100).toFixed(2) + "%");
			bonousPercent = (data.bonousIncome / data.totalIncome) * 100;

			$("#profPercentnet")
			.text(parseFloat((data.professionalFee / data.totalIncome) * 100).toFixed(2) + "%");
			$("#idProfModalPerc")
			.text(parseFloat((data.professionalFee / data.totalIncome) * 100).toFixed(2) + "%");
			profPercent = (data.professionalFee / data.totalIncome) * 100;

			$("#bussPercentnet")
			.text(parseFloat((data.bussinessIncome / data.totalIncome) * 100).toFixed(2) + "%");
			$("#idBussModalPerc")
			.text((parseFloat((data.bussinessIncome / data.totalIncome) * 100).toFixed(2) + "%"));
			bussPercent = (data.bussinessIncome / data.totalIncome) * 100;

			$("#rentIncomePercentnet")
			.text(parseFloat((data.rentalIncome / data.totalIncome) * 100).toFixed(2)+ "%");
			$("#idRentModalPerc")
			.text(parseFloat((data.rentalIncome / data.totalIncome) * 100).toFixed(2)+ "%");
			rentIncomePercent = (data.rentalIncome / data.totalIncome) * 100;

			$("#pensionPercentnet")
			.text(parseFloat((data.pension / data.totalIncome) * 100).toFixed(2) + "%");
			$("#idPensionModalPerc")
			.text(parseFloat((data.pension / data.totalIncome) * 100).toFixed(2) + "%");
			pensionPercent = (data.pension / data.totalIncome) * 100;

			$("#interestIncomePercentnet")
			.text(parseFloat((data.interestIncome / data.totalIncome) * 100).toFixed(2) + "%");
			$("#idInterestIncomeModalPerc")
			.text(parseFloat((data.interestIncome / data.totalIncome) * 100).toFixed(2) + "%");
			interestIncomePercent = (data.interestIncome / data.totalIncome) * 100;

			$("#otherIncomePercentnet")
			.text(parseFloat((data.otherIncome / data.totalIncome) * 100).toFixed(2) + "%");
			$("#idOtherModalPerc")
			.text(parseFloat((data.otherIncome / data.totalIncome) * 100).toFixed(2) + "%");
			otherIncomePercent = (data.otherIncome / data.totalIncome) * 100;

			$("#indTotalIncomePercentnet")
			.text(parseFloat((data.individualTotalIncome / data.totalIncome) * 100).toFixed(2) + "%");
			$("#indTotalIncomePercentnetModal")
			.text(parseFloat((data.individualTotalIncome / data.totalIncome) * 100).toFixed(2) + "%");

			$("#totalIncomePercentnet")
			.text(parseFloat((data.totalIncome / data.totalIncome) * 100).toFixed(2) + "%");
			$("#idTotalModalPerc")
			.text(parseFloat((data.totalIncome / data.totalIncome) * 100).toFixed(2) + "%");

			$.ajax({
				type: 'GET',
				url: REQUEST_URL_BM + '/getClientExpenseInfo?clientId=' + vClientId+'&mode=yearly&fpFlag=0',
				async: false,
				dataType: 'json',
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {

					$("#id_LivingExpenses_amt_ns").text(maskAmountValue(Math.round(data.livingExpense)));
					$("#idLivingModal").text(maskAmountValue(Math.round(data.livingExpense)));
					if(data.livingExpense == 0) {
						$("#idNetSurplusExpenseTable tbody tr.classLivingExp").hide();
						$("#idNetSurplusExpenseTableModal tbody tr.classLivingExpModal").hide();
					}
					$("#id_LivingExpenses_tp_ns").text((parseFloat
							((data.livingExpense / data.totalExpense) * 100).toFixed(2)) + "%");
					$("#idLivingModalPerc").text((parseFloat
							((data.livingExpense / data.totalExpense) * 100).toFixed(2)) + "%");

					$("#id_DiscretionaryExpenses_amt_ns").text(maskAmountValue(Math.round(data.discretionaryExpense)));
					$("#idDiscreModal").text(maskAmountValue(Math.round(data.discretionaryExpense)));
					if(data.discretionaryExpense == 0) {
						$("#idNetSurplusExpenseTable tbody tr.classDiscreExp").hide();
						$("#idNetSurplusExpenseTableModal tbody tr.classDiscreExpModal").hide();
					}

					$("#id_DiscretionaryExpenses_tp_ns").text((parseFloat
							((data.discretionaryExpense / data.totalExpense) * 100).toFixed(2)) + "%");
					$("#idDiscreModalPerc").text((parseFloat
							((data.discretionaryExpense / data.totalExpense) * 100).toFixed(2)) + "%");

					$("#idExpTotalModal").text(maskAmountValue(Math.round(data.totalExpense)));
					$("#id_TotalExpenses_summ_amt_ns").text(maskAmountValue(Math.round(data.totalExpense)));

					$("#id_TotalExpenses_summ_tp_ns").text((parseFloat
							((data.totalExpense / data.totalExpense) * 100).toFixed(2)) + "%");

					$("#idExpTotalModalPerc").text((parseFloat

							((data.totalExpense / data.totalExpense) * 100).toFixed(2)) + "%");
					totalExpense = data.totalExpense;
					if(data.livingExpense == 0 && data.discretionaryExpense == 0) {
						$('#idNetSurplusExpenseTableModal').hide();
					}
					//alert(data);
					//var wholeData = jQuery.parseJSON(data);
				}, 
				error: function (data) {
					totalExpense = 0;
		//			alert("error from Expense : getAnnualExpensesDetailed");
					$('#idNetSurplusExpenseTable').hide();
					$("#id_LivingExpenses_amt_ns").text("0.00");
					$("#idLivingModal").text("0.00");

					$("#id_LivingExpenses_tp_ns").text("0.00%");
					$("#idLivingModalPerc").text("0.00%");

					$("#id_DiscretionaryExpenses_amt_ns").text("0.00");
					$("#idDiscreModal").text("0.00");

					$("#id_DiscretionaryExpenses_tp_ns").text("0.00%");
					$("#idDiscreModalPerc").text("0.00%");

					$("#id_TotalExpenses_summ_amt_ns").text("0.00");
					$("#idExpTotalModal").text("0.00");

					$("#id_TotalExpenses_summ_tp_ns").text("0.00%");
					$("#idExpTotalModalPerc").text("0.00%");
				}

			});

			var emiAmount =0;
			var emiPercentage;
			var interestPayment=0;
			var interestPaymentPerc;
			var otherPayment=0;
			var otherPaymentPerc;
			var totalLoans=0;
			var totalLoansPerc;

			$.ajax({
				type: 'GET',
				url: REQUEST_URL_BM+'/getClientAllBankLoanDetails?clientId='+vClientId+'&mode=yearly&fpFlag=0',
				async: false,
				dataType: 'json',
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
		//			alert(data.length);
					$.each(data,
							function(index, value) {

						emiAmount = emiAmount + value.emiAmount;
						// alert("EMI Amount" + emiAmount);
						//alert("totalIncome" + totalIncome);
						//emiPercentage = (emiAmount/totalIncome) * 100;
						//emiPercentage = Math.round(emiPercentage * 100) / 100;
						//alert("EMI Perc" + emiPercentage);

						$("#idEmiAmount").text(maskAmountValue(Math.round(emiAmount)));
						$("#idEmiModal").text(maskAmountValue(Math.round(emiAmount)));

		//				$("#idEmiPercentage").text(emiPercentage + "%"); 
		//				$("#idEmiModalPerc").text(emiPercentage + "%");  

						return false;
					});
					if (data.length == 0) {
						emiAmount = 0;
						$("#idEmiAmount").text("0.00");
						$("#idEmiModal").text("0.00");

						$("#idEmiPercentage").text("0.00%");  
						$("#idEmiModalPerc").text("0.00%");  
					}

				},
				error: function (data) {
					emiAmount = 0;
					$("#idEmiAmount").text("0.00");
					$("#idEmiModal").text("0.00");

					$("#idEmiPercentage").text("0.00%"); 
					$("#idEmiModalPerc").text("0.00%");  
		//			alert("error from loan module1");
				}

			});

			var coTotal;
			$.ajax({
				type: 'GET',
				async : false,
				url: REQUEST_URL_BM+'/getCommitedOutflow?clientId='+vClientId+'&mode=yearly&fpFlag=0',
				dataType: 'json',
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
					$("#id_committed_outflows_net").text(maskAmountValue(Math.round(data.totalOutFlow)));
					$("#idCommitedModal").text(maskAmountValue(Math.round(data.totalOutFlow)));
					if (parseInt(data.totalOutFlow) == 0) {
						$("#id_committed_outflows_net_perc").text("0.00%");
						$("#idCommitedModalPerc").text("0.00%");
						$("#idNetSurplusCOTable tbody tr.classCO").hide();
						$("#idNetSurplusCOTableModal tbody tr.classCOModal").hide();
						$("#idNetSurplusCOTable").hide();
						$("#idNetSurplusCOTableModal").hide();


					} else {
						$("#id_committed_outflows_net_perc").text((parseFloat((data.totalOutFlow / data.totalOutFlow) * 100).toFixed(2))+"%");
						$("#idCommitedModalPerc").text((parseFloat((data.totalOutFlow / data.totalOutFlow) * 100).toFixed(2))+"%");

					}

					$("#id_total_co_net").text(maskAmountValue(Math.round(data.totalOutFlow)));
					$("#idCommitedTotalModal").text(maskAmountValue(Math.round(data.totalOutFlow)));

					if (parseInt(data.totalOutFlow) == 0) {
						$("#id_total_co_net_perc").text("0.00%");
						$("#idCommitedTotalModalPerc").text("0.00%");

					} else {
						$("#id_total_co_net_perc").text((parseFloat((data.totalOutFlow / data.totalOutFlow) * 100).toFixed(2))+"%");
						$("#idCommitedTotalModalPerc").text((parseFloat((data.totalOutFlow / data.totalOutFlow) * 100).toFixed(2))+"%");
					}
					coTotal = parseInt(data.totalOutFlow);
				},
				error: function (data) {
					$("#id_committed_outflows_net").text("0.00");
					$("#idCommitedModal").text("0.00");
					$("#id_committed_outflows_net_perc").text("0.00%");
					$("#idCommitedModalPerc").text("0.00%");

					$("#id_total_co_net").text("0.00");
					$("#idCommitedTotalModal").text("0.00");
					$("#id_total_co_net_perc").text("0.00%");
					$("#idCommitedTotalModalPerc").text("0.00%");
		//			alert(data.responseText);
					coTotal = 0.0;
				}
			});

			$.ajax({
				type: 'GET',
				// url: 'http://192.168.1.103:8080/FinexaService/getClientIncomeInfo?clientId='+vClientId+'&mode=yearly',
				url: REQUEST_URL_BM+'/getClientLoanInfo?clientId='+vClientId+'&fpFlag=0',
				async: false,
				dataType: 'json',
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {
					$.each(data,
							function(index, value) {
						var loanType = value.loanEmiNonEmi;
						if(loanType == 2) {
							interestPayment = interestPayment + value.interestPay;
							otherPayment = otherPayment + value.principalPay;
					

						}
					});

					$("#idInterestPayment").text(maskAmountValue(Math.round(interestPayment)));
					$("#idOtherInterestModal").text(maskAmountValue(Math.round(interestPayment)));
					if (interestPayment == 0.00) {
						$("#idNetSurplusLoanTable tbody tr.classInterestPayment").hide();
						$("#idNetSurplusLoanTableModal tbody tr.classInterestModal").hide();
					}

					$("#idPrincipalPayment").text(maskAmountValue(parseFloat((otherPayment * 100)/100).toFixed(2)));
					$("#idOtherPrincipalModal").text(maskAmountValue(parseFloat((otherPayment * 100)/100).toFixed(2)));
					if (otherPayment == 0.00) {
						$("#idNetSurplusLoanTable tbody tr.classPrincipalPayment").hide();
						$("#idNetSurplusLoanTableModal tbody tr.classPrincipalModal").hide();
					}
					totalLoans = emiAmount + interestPayment + otherPayment;
					emiPercentage = (emiAmount/totalLoans) * 100;
			
					interestPaymentPerc = (interestPayment/totalLoans) * 100;
					interestPaymentPerc = Math.round(interestPaymentPerc * 100) / 100;
			
					otherPaymentPerc = (otherPayment/totalLoans) * 100;
					otherPaymentPerc = Math.round(otherPaymentPerc * 100) / 100;
			
					totalLoansPerc = emiPercentage + interestPaymentPerc + otherPaymentPerc;
			

					$("#idEmiPercentage").text(parseFloat((emiAmount/totalLoans)*100).toFixed(2)+"%"); 
					$("#idEmiModalPerc").text(parseFloat((emiAmount/totalLoans)*100).toFixed(2) + "%");  
			
					$("#idInterestPercentage").text(interestPaymentPerc+"%");  
					$("#idOtherInterestModalPerc").text(interestPaymentPerc+"%");
			
					$("#idPrincipalPercentage").text(otherPaymentPerc+"%");  
					$("#idOtherPrincipalModalPerc").text(otherPaymentPerc+"%");  

			
					$("#idTotalLoans").text(maskAmountValue(Math.round(totalLoans)));
					$("#idLoanTotalModal").text(maskAmountValue(parseFloat(totalLoans)));

					$("#idTotalLoansPerc").text(totalLoansPerc.toFixed(2) + "%"); 
					$("#idLoanTotalModalPerc").text(totalLoansPerc.toFixed(2) + "%"); 

					if (totalLoans == 0.00) {
						$("#idNetSurplusLoanTable").hide();
						$("#idNetSurplusLoanTableModal").hide();
					}
					var netSulplusAmt = totalIncome - totalExpense - totalLoans - coTotal;
					//	alert(netSulplusAmt);
					$("#idTotalNetSulplus").text(maskAmountValue(Math.round(netSulplusAmt)));
					$("#idNetSurModal").text(maskAmountValue(parseFloat(netSulplusAmt)));

					$("#idTotalNetSulplusPerc")
					.text(parseFloat((netSulplusAmt / netSulplusAmt) * 100).toFixed(2) + "%");
					$("#idNetSurModalPerc")
					.text(parseFloat((netSulplusAmt / netSulplusAmt) * 100).toFixed(2) + "%");

				},
				error: function (data) {
					interestPayment = 0;
					otherPayment = 0;
					totalLoans = emiAmount + interestPayment + otherPayment;
					var netSulplusAmt = totalIncome - totalExpense - totalLoans - coTotal;
					$("#idTotalLoans").text(Math.round(totalLoans));
					$("#idLoanTotalModal").text(parseFloat(totalLoans));

					$("#idTotalLoansPerc").text("0.00%");
					$("#idLoanTotalModalPerc").text("0.00%");

					$("#idInterestPayment").text(Math.round(interestPayment));
					$("#idOtherInterestModal").text(Math.round(interestPayment));

					$("#idInterestPercentage").text("0.00%");  
					$("#idOtherInterestModalPerc").text("0.00%");  

					$("#idPrincipalPayment").text(Math.round(otherPayment));
					$("#idOtherPrincipalModal").text(Math.round(otherPayment));

					$("#idPrincipalPercentage").text("0.00%");  
					$("#idOtherPrincipalModalPerc").text("0.00%");  

					$("#idTotalNetSulplus").text(Math.round(netSulplusAmt));
					$("#idNetSurModal").text(Math.round(netSulplusAmt));

					if (netSulplusAmt > 0) {
						$("#idTotalNetSulplusPerc")
						.text(parseFloat((netSulplusAmt / netSulplusAmt) * 100).toFixed(2) + "%");
						$("#idNetSurModalPerc")
						.text(parseFloat((netSulplusAmt / netSulplusAmt) * 100).toFixed(2) + "%");
					} else {
						$("#idTotalNetSulplusPerc")
						.text("0.00%");
						$("#idNetSurModalPerc")
						.text("0.00%");
					}

		//			alert("error from loan module2");
				}

			});

			var year = [];
			var income = [];
			var expense = [];
			var commmitted_outflow = [];
			var loan_outflow = [];
			var net_surplus = [];

			var flagIncome = 0;
			var flagExpense = 0;
			var flagCO = 0;
			var flagloan = 0;
			var flagNet = 0;
			var flagRow = 0;
			var lastFinYearToBeDisplayed="";
			$.ajax({
				type: 'GET',
				url: REQUEST_URL_BM+'/getClientNetSurplusInfo?clientId='+vClientId+'&mode=yearly&fpFlag=0',
				async: false,  
				dataType: 'json',
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success: function (data) {

					$.each(data,
							function(index, value) {
						
						if(value.income == 0 && value.expense == 0 && value.committed_outflows == 0 &&
								value.loan_outflows == 0 && value.net_surplus == 0) {
							flagRow = 1;
						} else {
							flagRow = 0;
							if(data[index + 1] != null) {
								lastFinYearToBeDisplayed = data[index + 1].finYear;
							}
							
						}
						if (parseFloat((value.income * 100)/100).toFixed(2) != 0.00) {
							flagIncome = 1;
						}
						if (parseFloat((value.expense * 100)/100).toFixed(2) != 0.00) {
							flagExpense = 1;
						}
						if (parseFloat((value.committed_outflows * 100)/100).toFixed(2) != 0.00) {
							flagCO = 1;
						}
						if (parseFloat((value.loan_outflows * 100)/100).toFixed(2) != 0.00) {
							flagloan = 1;
						}
						if (parseFloat((value.net_surplus * 100)/100).toFixed(2) != 0.00) {
							flagNet = 1;
						}

					});
					
					// hide rows
					$.each(data,
							function(rowIndex, rowValue) {
						if(flagRow == 1 && rowValue.year == lastFinYearToBeDisplayed){
							 return false; 
						} else {
							year.push(rowValue.finYear);
							income.push(Math.round(rowValue.income));
							expense.push(Math.round(rowValue.expense));
							commmitted_outflow.push(Math.round(rowValue.committed_outflows));
							loan_outflow.push(parseInt(rowValue.loan_outflows));
							net_surplus.push(parseInt(rowValue.net_surplus));
							$('#idNetProjection').append(

									'<tr><td>'+ rowValue.finYear+ '</td><td>'+ 
									maskAmountValue(Math.round((rowValue.income)))+ '</td><td>'+
									maskAmountValue(Math.round((rowValue.expense)))+ '</td><td>'+ 
									maskAmountValue(Math.round((rowValue.committed_outflows)))+ '</td><td>'+ 
									maskAmountValue(Math.round((rowValue.loan_outflows)))+ '</td><td>'+                                              	
									maskAmountValue(Math.round((rowValue.net_surplus)))+'</td></tr>');
							$('#idNetProjectionModal').append(

									'<tr><td>'+ rowValue.finYear+ '</td><td>'+ 
									maskAmountValue(Math.round((rowValue.income)))+ '</td><td>'+
									maskAmountValue(Math.round((rowValue.expense)))+ '</td><td>'+ 
									maskAmountValue(Math.round((rowValue.committed_outflows)))+ '</td><td>'+ 
									maskAmountValue(Math.round((rowValue.loan_outflows)))+ '</td><td>'+                                              	
									maskAmountValue(Math.round((rowValue.net_surplus)))+'</td></tr>');
					
							data = [];
							$.each(net_surplus, function(index, value){
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
									categories: year
								},
								legend: {
									enabled: true,
								},
								series: [{
									name: 'Net Surplus',
									data: data,
                                    cursor: 'pointer',
                                    events: {
                                        legendItemClick: function () {
                                            return false;
                                        }
                                    }

								}]
							});		}
					});
					
					// hide all zero containing columns
					
					
					if(flagIncome == 0) {
						$('#idNetSurplusProjectionTable td:nth-child(2),#idNetSurplusProjectionTable th:nth-child(2)').hide();
						$('#idNetSurplusProjectionTableModal td:nth-child(2),#idNetSurplusProjectionTableModal th:nth-child(2)').hide();
					}
					if(flagExpense == 0) {
						$('#idNetSurplusProjectionTable td:nth-child(3),#idNetSurplusProjectionTable th:nth-child(3)').hide();
						$('#idNetSurplusProjectionTableModal td:nth-child(),#idNetSurplusProjectionTableModal th:nth-child(3)').hide();
					}
					if(flagCO == 0) {
						$('#idNetSurplusProjectionTable td:nth-child(4),#idNetSurplusProjectionTable th:nth-child(4)').hide();
						$('#idNetSurplusProjectionTableModal td:nth-child(4),#idNetSurplusProjectionTableModal th:nth-child(4)').hide();
					}
					if(flagloan == 0) {
						$('#idNetSurplusProjectionTable td:nth-child(5),#idNetSurplusProjectionTable th:nth-child(5)').hide();
						$('#idNetSurplusProjectionTableModal td:nth-child(5),#idNetSurplusProjectionTableModal th:nth-child(5)').hide();
					}
					if(flagNet == 0) {
						$('#idNetSurplusProjectionTable td:nth-child(6),#idNetSurplusProjectionTable th:nth-child(6)').hide();
						$('#idNetSurplusProjectionTableModal td:nth-child(6),#idNetSurplusProjectionTableModal th:nth-child(6)').hide();
					}

					data = [];
					$.each(net_surplus, function(index, value){
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
							categories: year
						},
						legend: {
							enabled: true,
						},
						series: [{
							name: 'Net Surplus',
							data: data,
                            cursor: 'pointer',
                            events: {
                                legendItemClick: function () {
                                    return false;
                                }
                            }

						}]
					});
				
					$("#idNetDiv").show();
					$("#idNetDivProj").show();
					$("#idNetDivGraph").show();
					$("#idNetsurplusTable").show();
					$("#idNetSurplusExpenseTable").show();
					$("#idNetSurplusCOTable").show();
					$("#idNetSurplusLoanTable").show();
				},
				error: function (data) {
		//			alert("error from projection module");
				}
		
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
			$("#heading_net")
			.text("Net Surplus FY");
			totalIncome = 0;

			$("#salaryAmountnet")
			.text("0.00");
			$("#idSalModal")
			.text("0.00");

			$("#bonousAmountnet")
			.text("0.00");
			$("#idBonusModal")
			.text("0.00");

			$("#profFessnet")
			.text("0.00");
			$("#idProfModal")
			.text("0.00");

			$("#bussIncomenet")
			.text("0.00");
			$("#idBussModal")
			.text("0.00");

			$("#rentIncomenet")
			.text("0.00");
			$("#idRentModal")
			.text("0.00");

			$("#pensionnet")
			.text("0.00");
			$("#idPensionModal")
			.text("0.00");

			$("#otherIncomenet")
			.text("0.00");
			$("#idOtherModal")
			.text("0.00");

			$("#interestIncomenet")
			.text("0.00");
			$("#idInterestIncomeModal")
			.text("0.00");

			$("#indTotalIncomenet")
			.text("0.00");
			$("#indTotalIncomenetModal")
			.text("0.00");

			$("#totalIncomenet")
			.text("0.00");
			$("#idTotalModal")
			.text("0.00");

			$("#salaryPercentnet")
			.text("0.00%");
			$("#idSalModalPerc")
			.text("0.00%");

			$("#bonousPercentnet")
			.text("0.00%");
			$("#idBonusModalPerc")
			.text("0.00%");

			$("#profPercentnet")
			.text("0.00%");
			$("#idProfModalPerc")
			.text("0.00%");

			$("#bussPercentnet")
			.text("0.00%");
			$("#idBussModalPerc")
			.text("0.00%");

			$("#rentIncomePercentnet")
			.text("0.00%");
			$("#idRentModalPerc")
			.text("0.00%");

			$("#otherIncomePercentnet")
			.text("0.00%");
			$("#idOtherModalPerc")
			.text("0.00%");

			$("#interestIncomePercentnet")
			.text("0.00%");
			$("#idInterestIncomeModalPerc")
			.text("0.00%");

			$("#pensionPercentnet")
			.text("0.00%");
			$("#idPensionModalPerc")
			.text("0.00%");

			$("#indTotalIncomePercentnet")
			.text("0.00%");
			$("#indTotalIncomePercentnetModal")
			.text("0.00%");

			$("#totalIncomePercentnet")
			.text("0.00%");
			$("#idTotalModalPerc")
			.text("0.00%");

//			alert("error from income module");
		}
	});

/*	

	// for Loan Details
	

	
	

	*/
	
	
	
	
/*	$(function () {
		data = [];
		$.each(net_surplus, function(index, value){
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
				categories: year
			},
			legend: {
				enabled: true,
			},
			series: [{
				name: 'Net Surplus',
				data: data,

			}]
		});
	});*/


});

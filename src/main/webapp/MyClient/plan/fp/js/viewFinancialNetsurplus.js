$(document).ready(function(){
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
//		alert("unloaded");
	};


	$(function()
			{
		$(".popupwindow").popupwindow(profiles);
			});	









	var jssor_20_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


		];

	var jssor_20_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_20_SlideshowTransitions,
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

	var jssor_20_slider = new $JssorSlider$("jssor_20", jssor_20_options);

	/** Added on 19th sep version for arrow key(NehaD) start **/
	var netpavright = $('.jssort20 div:nth-child(2) div:nth-child(3) div');
	var netpavleft = $('.jssort20 div:nth-child(2) div:nth-child(2) div');

	$(".Expensesright").click(function(){
		if(netpavright.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialNetworth.html");

			$(".glidnonglid").hide();
			$("#idHeading").html("Networth");
			$(".pfnetsurplus").removeClass("activeitem");
			$(".pfnetworth").addClass("activeitem");





		};
	});

	$(".Expensesleft").click(function(){
		if(netpavleft.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewPlanofAction.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Plan Of Action");
			$(".pfnetsurplus").removeClass("activeitem");
			$(".fplantofaction").addClass("activeitem");




		};
		/** Added on 19th sep version for arrow key(NehaD) end **/
	});



	var modal = document.getElementById("idPopnetworth");

	// Get the button that opens the modal
	var btn = document.getElementById("idMaxnetworthsum");

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

	/*For networthdetails */

	var modal1 = document.getElementById("idPopnetdetails");

	// Get the button that opens the modal
	var btn = document.getElementById("idMaxnetdetails");

	// Get the <span> element that closes the modal
	var span1 = document.getElementsByClassName("close1")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
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


	/*****************************Dynamic ajax call to load values and charts ***************************/

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
	var salaryIncomePercent;
	var salaryIncome;
	var bonousPercent;
	var profPercent;
	var bussPercent;
	var rentIncomePercent;
	var otherIncomePercent;
	var interestIncomePercent;
	var pensionPercent;
	var indTotalPerc;
	var incomeTotal = 0;
	var expenseTotal = 0;
	var coTotal = 0;
	var loanTotal = 0;
	var netSulplusAmt = 0;
	var totalIncome = 0;
	var totalExpense = 0;
	var netsurpusGraph = [];
	
	var totalIncArr = [];
	var totalExpArr = [];
	var totalCOArr = [];
	var totalLoanArr = [];
	var totalNetArr = [];
	var netArray = [];

	$.ajax({
		type: 'GET',
		async:false,
		url: REQUEST_URL_BM+'/getClientIncomeInfo?clientId='+vClientId+'&mode=yearly&fpFlag=0',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			totalIncome = data.totalIncome;
			salaryIncome = data.salaryIncome;
			$("#salaryAmount")
			.text(maskAmountValue(Math.round(salaryIncome)));
			$("#idSalModal")
			.text(maskAmountValue(Math.round(salaryIncome)));
			if(salaryIncome == 0) {
				$("#idFPNetSurplusTable tbody tr.classSalary").hide();
				$("#idFPIncomeModal tbody tr.classSalaryModal").hide();
			}
			$("#bonousAmount")
			.text(maskAmountValue(Math.round(data.bonousIncome)));
			$("#idBonusModal")
			.text(maskAmountValue(Math.round(data.bonousIncome)));
			if(data.bonousIncome == 0) {
				$("#idFPNetSurplusTable tbody tr.classBonus").hide();
				$("#idFPIncomeModal tbody tr.classBonusModal").hide();
			}
			$("#profFess")
			.text(maskAmountValue(Math.round(data.professionalFee)));
			$("#idProfModal")
			.text(maskAmountValue(Math.round(data.professionalFee)));
			if(data.professionalFee == 0) {
				$("#idFPNetSurplusTable tbody tr.classProf").hide();
				$("#idFPIncomeModal tbody tr.classProfModal").hide();
			}
			$("#bussIncome")
			.text(maskAmountValue(Math.round(data.bussinessIncome )));
			$("#idBussModal")
			.text(maskAmountValue(Math.round(data.bussinessIncome)));
			if(data.bussinessIncome == 0) {
				$("#idFPNetSurplusTable tbody tr.classBuss").hide();
				$("#idFPIncomeModal tbody tr.classBussModal").hide();
			}
			$("#rentIncome")
			.text(maskAmountValue(Math.round(data.rentalIncome )));
			$("#idRentModal")
			.text(maskAmountValue(Math.round(data.rentalIncome)));
			if(data.rentalIncome == 0) {
				$("#idFPNetSurplusTable tbody tr.classRent").hide();
				$("#idFPIncomeModal tbody tr.classRentModal").hide();
			}
			$("#pension")
			.text(maskAmountValue(Math.round(data.pension)));
			$("#idPensionModal")
			.text(maskAmountValue(Math.round(data.pension)));
			if(data.pension == 0) {
				$("#idFPNetSurplusTable tbody tr.classPension").hide();
				$("#idFPIncomeModal tbody tr.classPensionModal").hide();
			}
			$("#otherIncome")
			.text(maskAmountValue(Math.round(data.otherIncome)));
			$("#idOtherModal")
			.text(maskAmountValue(Math.round(data.otherIncome)));
			if(data.otherIncome == 0) {
				$("#idFPNetSurplusTable tbody tr.classOther").hide();
				$("#idFPIncomeModal tbody tr.classOtherModal").hide();
			}
			$("#interestIncome")
			.text(maskAmountValue(Math.round(data.interestIncome)));
			$("#idInterestIncomeModal")
			.text(maskAmountValue(Math.round(data.interestIncome)));
			if(parseInt(data.interestIncome ) == 0) {
				$("#idFPNetSurplusTable tbody tr.classInterest").hide();
				$("#idFPIncomeModal tbody tr.classInterestModal").hide();
			}
			$("#indTotalIncome")
			.text(maskAmountValue(Math.round(data.individualTotalIncome)));
			$("#indTotalIncomenetModal")
			.text(maskAmountValue(Math.round(data.individualTotalIncome)));
			if(parseInt(data.individualTotalIncome ) == 0) {
				$("#idFPNetSurplusTable tbody tr.classIndTotal").hide();
				$("#idFPIncomeModal tbody tr.classIndTotalModal").hide();
			}
			$("#totalIncome")
			.text(maskAmountValue(Math.round(data.totalIncome )));
			$("#idTotalModal")
			.text(maskAmountValue(Math.round(data.totalIncome)));

			$("#salaryPercent")
			.text(parseFloat((data.salaryIncome / data.totalIncome) * 100).toFixed(2) + "%");
			salaryIncomePercent = (data.salaryIncome / data.totalIncome) * 100;

			incomeTotal = parseFloat((data.totalIncome * 100)/100).toFixed(2);
			totalIncArr.push("Total Income");
			totalIncArr.push(parseFloat(data.totalIncome));
			
			$("#bonousPercent")
			.text(parseFloat((data.bonousIncome / data.totalIncome) * 100).toFixed(2) + "%");
			bonousPercent = (data.bonousIncome / data.totalIncome) * 100;

			$("#profPercent")
			.text(parseFloat((data.professionalFee / data.totalIncome) * 100).toFixed(2) + "%");
			profPercent = (data.professionalFee / data.totalIncome) * 100;

			$("#bussPercent")
			.text(parseFloat((data.bussinessIncome / data.totalIncome) * 100).toFixed(2) + "%");
			bussPercent = (data.bussinessIncome / data.totalIncome) * 100;

			$("#rentIncomePercent")
			.text(parseFloat((data.rentalIncome / data.totalIncome) * 100).toFixed(2)+ "%");
			rentIncomePercent = (data.rentalIncome / data.totalIncome) * 100;

			$("#pensionPercent")
			.text(parseFloat((data.pension / data.totalIncome) * 100).toFixed(2) + "%");
			pensionPercent = (data.pension / data.totalIncome) * 100;

			$("#otherIncomePercent")
			.text(parseFloat((data.otherIncome / data.totalIncome) * 100).toFixed(2) + "%");
			otherIncomePercent = (data.otherIncome / data.totalIncome) * 100;

			$("#interestIncomePercent")
			.text(parseFloat((data.interestIncome / data.totalIncome) * 100).toFixed(2) + "%");
			interestIncomePercent = (data.interestIncome / data.totalIncome) * 100;

			$("#indTotalIncomePercent")
			.text(parseFloat((data.individualTotalIncome / data.totalIncome) * 100).toFixed(2) + "%");
			indTotalPerc = (data.individualTotalIncome / data.totalIncome) * 100;

			$("#totalIncomePercent")
			.text(parseFloat((data.totalIncome / data.totalIncome) * 100).toFixed(2) + "%");
			netsurpusGraph.push(parseInt(data.totalIncome));
			loadIncomeChart();
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
			$("#salaryAmount")
			.text("0.00");
			$("#bonousAmount")
			.text("0.00");
			$("#profFess")
			.text("0.00");
			$("#bussIncome")
			.text("0.00");
			$("#rentIncome")
			.text("0.00");
			$("#pension")
			.text("0.00");
			$("#otherIncome")
			.text("0.00");
			$("#interestIncome")
			.text("0.00");
			$("#totalIncome")
			.text("0.00");
			$("#salaryPercent")
			.text("0.00%");

			$("#bonousPercent")
			.text("0.00%");

			$("#profPercent")
			.text("0.00%");

			$("#bussPercent")
			.text("0.00%");

			$("#rentIncomePercent")
			.text("0.00%");

			$("#pensionPercent")
			.text("0.00%");

			$("#interestIncomePercent")
			.text("0.00%");

			$("#otherIncomePercent")
			.text("0.00%");

			$("#totalIncomePercent")
			.text("0.00%");

			loadIncomeChart();
		}
	});

	var Groceries_per_val_perc;
	var Utilities_per_val_perc;
	var Transport_per_val_perc;
	var HouseholdAndPersonalCare_per_val_perc;
	var HousingAndMaintenance_per_val_perc;
	var Communication_per_val_perc;
	var ChildrenFees_per_val_perc;
	var HealthcareExpenses_per_val_perc;
	var LifestyleAndEntertainment_per_val_perc;
	var ApparelsAndAccessories_per_val_perc;
	var OthersCharityEtc_per_val_perc;
	var livingExpensesTotalPerc;

	$.ajax({
		type: 'GET',
		url: REQUEST_URL_BM + '/getClientExpenseInfo?clientId=' + vClientId+'&mode=yearly&fpFlag=0',
		dataType: 'json',
		async : false,
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {

			if (data.length == 0) {
				errorFlag = 1; 
			}
			$("#id_Groceries_amt").text(maskAmountValue(Math.round(data.groceries_amt)));
			$("#idGrocModal").text(maskAmountValue(Math.round(data.groceries_amt)));
			if(parseFloat((data.groceries_amt * 100)/100).toFixed(2) == 0.00) {
				$("#idFPNetSurplusTable tbody tr.classGroceries").hide();
				$("#idFPIncomeModal tbody tr.classGroceries").hide();
			}
			$("#id_Groceries_tp").text((parseFloat
					((data.groceries_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idGrocPercModal").text((parseFloat
					((data.groceries_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			Groceries_per_val_perc = (data.groceries_amt / data.totalExpense) * 100

			$("#id_Utilities_amt").text(maskAmountValue(Math.round(data.utilities_amt)));
			$("#idUtilitiesModal").text(maskAmountValue(Math.round(data.utilities_amt)));
			if(data.utilities_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classUtilities").hide();
				$("#idFPIncomeModal tbody tr.classUtilities").hide();
			}
			$("#id_Utilities_tp").text((parseFloat
					((data.utilities_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idUtilitiesPercModal").text((parseFloat
					((data.utilities_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			Utilities_per_val_perc = (data.utilities_amt / data.totalExpense) * 100;


			$("#id_Transport_amt").text(maskAmountValue(Math.round(data.transport_amt)));
			$("#idTransport").text(maskAmountValue(Math.round(data.transport_amt)));
			if(data.transport_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classTransport").hide();
				$("#idFPIncomeModal tbody tr.classTransport").hide();
			}
			$("#id_Transport_tp").text((parseFloat
					((data.transport_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idTransportPercModal").text((parseFloat
					((data.transport_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			Transport_per_val_perc = (data.transport_amt / data.totalExpense) * 100;

			$("#id_HouseholdAndPersonalCare_amt").text(maskAmountValue(Math.round(data.houseHoldPersonal_amt)));
			$("#idHPModal").text(maskAmountValue(Math.round(data.houseHoldPersonal_amt)));
			if(data.houseHoldPersonal_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classHPC").hide();
				$("#idFPIncomeModal tbody tr.classHPC").hide();
			}
			$("#id_HouseholdAndPersonalCare_tp").text((parseFloat
					((data.houseHoldPersonal_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idHPPercModal").text((parseFloat
					((data.houseHoldPersonal_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			HouseholdAndPersonalCare_per_val_perc = (data.houseHoldPersonal_amt / data.totalExpense) * 100;

			$("#id_HousingAndMaintenance_amt").text(maskAmountValue(Math.round(data.housing_amt)));
			$("#idHMModal").text(maskAmountValue(Math.round(data.housing_amt )));

			if(data.housing_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classHM").hide();
				$("#idFPIncomeModal tbody tr.classHM").hide();
			}
			$("#id_HousingAndMaintenance_tp").text((parseFloat
					((data.housing_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idHMPercModal").text((parseFloat
					((data.housing_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			HousingAndMaintenance_per_val_perc = (data.housing_amt / data.totalExpense) * 100;

			$("#id_Communication_amt").text(maskAmountValue(Math.round(data.communication_amt)));
			$("#idCommModal").text(maskAmountValue(Math.round(data.communication_amt)));
			if(data.communication_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classCommunication").hide();
				$("#idFPIncomeModal tbody tr.classCommunication").hide();
			}
			$("#id_Communication_tp").text((parseFloat
					((data.communication_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idCommPercModal").text((parseFloat
					((data.communication_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			Communication_per_val_perc = (data.communication_amt / data.totalExpense) * 100;

			$("#id_ChildrenFees_amt").text(maskAmountValue(Math.round(data.childrenFees_amt)));
			$("#idChildModal").text(maskAmountValue(parseFloat((data.childrenFees_amt * 100)/100).toFixed(2)));
			if(data.childrenFees_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classChildrenFee").hide();
				$("#idFPIncomeModal tbody tr.classChildrenFee").hide();
			}
			$("#id_ChildrenFees_tp").text((parseFloat
					((data.childrenFees_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idChildPercModal").text((parseFloat
					((data.childrenFees_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			ChildrenFees_per_val_perc = (data.childrenFees_amt / data.totalExpense) * 100;

			$("#idHEModal").text(maskAmountValue(Math.round(data.healthCare_amt )));
			$("#id_HealthcareExpenses_amt").text(maskAmountValue(Math.round(data.healthCare_amt)));
			if(data.healthCare_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classHCE").hide();
				$("#idFPIncomeModal tbody tr.classHCE").hide();
			}
			$("#id_HealthcareExpenses_tp").text((parseFloat
					((data.healthCare_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idHEPercModal").text((parseFloat
					((data.healthCare_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			HealthcareExpenses_per_val_perc = (data.healthCare_amt / data.totalExpense) * 100;

			$("#id_LifestyleAndEntertainment_amt").text(maskAmountValue(Math.round(data.lifeStyle_amt)));
			$("#idLEModal").text(maskAmountValue(Math.round(data.lifeStyle_amt)));
			if(data.lifeStyle_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classLE").hide();
				$("#idFPIncomeModal tbody tr.classLE").hide();
			}
			$("#id_LifestyleAndEntertainment_tp").text((parseFloat
					((data.lifeStyle_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idLEPercModal").text((parseFloat
					((data.lifeStyle_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			LifestyleAndEntertainment_per_val_perc = (data.lifeStyle_amt / data.totalExpense) * 100;

			$("#id_ApparelsAndAccessories_amt").text(maskAmountValue(Math.round(data.apparels_amt)));
			$("#idAAModal").text(maskAmountValue(Math.round(data.apparels_amt)));
			if(data.apparels_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classAA").hide();
				$("#idFPIncomeModal tbody tr.classAA").hide();
			}
			$("#id_ApparelsAndAccessories_tp").text((parseFloat
					((data.apparels_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idAAPercModal").text((parseFloat
					((data.apparels_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			ApparelsAndAccessories_per_val_perc = (data.apparels_amt / data.totalExpense) * 100;

			$("#id_OthersCharityEtc_amt").text(maskAmountValue(Math.round(data.others_amt)));
			$("#idOthersModal").text(maskAmountValue(Math.round(data.others_amt)));
			if(data.others_amt == 0) {
				$("#idFPNetSurplusTable tbody tr.classOthers").hide();
				$("#idFPIncomeModal tbody tr.classOthers").hide();
			}
			$("#id_OthersCharityEtc_tp").text((parseFloat
					((data.others_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idOthersPercModal").text((parseFloat
					((data.others_amt / data.totalExpense) * 100).toFixed(2)) + "%");
			OthersCharityEtc_per_val_perc = (data.others_amt / data.totalExpense) * 100;

			$("#idIndTotal").text(maskAmountValue(parseFloat((data.totalFamilyExpense * 100)/100).toFixed(2)));
			$("#idIndModal").text(maskAmountValue(parseFloat((data.totalFamilyExpense * 100)/100).toFixed(2)));
			if(data.totalFamilyExpense  == 0) {
				$("#idFPNetSurplusTable tbody tr.classLivingModal").hide();
				$("#idFPIncomeModal tbody tr.classLivingModal").hide();
			}
			$("#id_IndTotal_tp").text((parseFloat
					((data.totalFamilyExpense / data.totalExpense) * 100).toFixed(2)) + "%");
			$("#idIndPercModal").text((parseFloat
					((data.totalFamilyExpense / data.totalExpense) * 100).toFixed(2)) + "%");
			livingExpensesTotalPerc = (data.totalFamilyExpense / data.totalExpense) * 100;

			$("#id_TotalExpenses_amt").text(maskAmountValue(Math.round(data.totalExpense)));
			$("#idTotalExpModal").text(maskAmountValue(Math.round(data.totalExpense)));
			if (data.totalExpense == 0.0) {
				$("#id_TotalExpenses_tp").text("0.00%");
				$("#idTotalExpModalPerc").text("0.00%");
			} else {
				$("#id_TotalExpenses_tp").text((parseFloat
						((data.totalExpense / data.totalExpense) * 100).toFixed(2)) + "%");
				$("#idTotalExpModalPerc").text((parseFloat
						((data.totalExpense / data.totalExpense) * 100).toFixed(2)) + "%");
			}
			expenseTotal = parseFloat((data.totalExpense * 100)/100).toFixed(2);
			totalExpArr.push("Total Expenses");
			totalExpArr.push(parseFloat(data.totalExpense));
			loadExpenseChart();
			totalExpense = data.totalExpense;
			netsurpusGraph.push((data.totalExpense));
		}, 
		error: function (jqXHR,data) {
			errorFlag = 1; 
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
				$("#idCommModalPerc").text("0.00%");
				$("#idFPNetSurplusTable tbody tr.classCO").hide();
				$("#idFPIncomeModal tbody tr.classCOModal").hide();


			} else {
				$("#id_committed_outflows_net_perc").text((parseFloat((data.totalOutFlow / data.totalOutFlow) * 100).toFixed(2))+"%");
				$("#idCommModalPerc").text((parseFloat((data.totalOutFlow / data.totalOutFlow) * 100).toFixed(2))+"%");

			}
			$("#id_total_co_net").text(maskAmountValue(Math.round(data.totalOutFlow)));
			$("#idCommTotalModal").text(maskAmountValue(Math.round(data.totalOutFlow)));

			if (parseInt(data.totalOutFlow) == 0) {
				$("#id_total_co_net_perc").text("0.00%");
				$("#idCommitedPercModal").text("0.00%");

			} else {
				$("#id_total_co_net_perc").text((parseFloat((data.totalOutFlow / data.totalOutFlow) * 100).toFixed(2))+"%");
				$("#idCommitedPercModal").text((parseFloat((data.totalOutFlow / data.totalOutFlow) * 100).toFixed(2))+"%");
			}
			netsurpusGraph.push(parseInt(data.totalOutFlow));
			coTotal = parseInt(data.totalOutFlow);
			totalCOArr.push("Total commited Outflows");
			totalCOArr.push(parseFloat(coTotal));
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
			coTotal = 0.0;
			$("#id_committed_outflows_net").text("0.00");
			$("#idCommitedModal").text("0.00");
			$("#id_committed_outflows_net_perc").text("0.00%");
			$("#idCommModalPerc").text("0.00%");

			$("#id_total_co_net").text("0.00");
			$("#idCommTotalModal").text("0.00");
			$("#id_total_co_net_perc").text("0.00%");
			$("#idCommitedPercModal").text("0.00%");
		}
	});
	var emiAmount;
	var emiPercentage;
	var interestPayment = 0.00;
	var interestPaymentPerc = 0.00;
	var otherPayment = 0.00;
	var otherPaymentPerc = 0.00;
	var totalLoans = 0.00;
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
			$.each(data,
					function(index, value) {

				emiAmount = value.emiAmount;
				emiPercentage = (emiAmount/totalIncome) * 100;
				emiPercentage = Math.round(emiPercentage * 100) / 100;

				$("#idEmiAmount").text(maskAmountValue(Math.round(emiAmount)));
				$("#idEmiModal").text(maskAmountValue(Math.round(emiAmount)));

				$("#idEmiPercentage").text(emiPercentage + "%"); 
				$("#idEmiModalPerc").text(emiPercentage + "%");  

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
			emiAmount = 0;
			$("#idEmiAmount").text("0.00");
			$("#idEmiModal").text("0.00");

			$("#idEmiPercentage").text("0.00%"); 
			$("#idEmiModalPerc").text("0.00%");  
//			alert("error from loan module1");
		}

	});


	$.ajax({
		type: 'GET',
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
				$("#idFPNetSurplusTable tbody tr.classInterestPayment").hide();
				$("#idFPIncomeModal tbody tr.classInterestModal").hide();
			}

			$("#idPrincipalPayment").text(maskAmountValue(Math.round(otherPayment )));
			$("#idOtherPrincipalModal").text(maskAmountValue(Math.round(otherPayment)));
			if (otherPayment == 0.00) {
				$("#idFPNetSurplusTable tbody tr.classPrincipalPayment").hide();
				$("#idFPIncomeModal tbody tr.classPrincipalModal").hide();
			}
			totalLoans = emiAmount + interestPayment + otherPayment;
			netsurpusGraph.push(parseInt(totalLoans));
			totalLoanArr.push("Total Loans");
			totalLoanArr.push(parseFloat(totalLoans));
			if(totalLoans <= 0.0) {
				emiPercentage = 0.0;
				interestPaymentPerc= 0.0;
				otherPaymentPerc = 0.0;
			} else {
				emiPercentage = (emiAmount/totalLoans) * 100;
				
				interestPaymentPerc = (interestPayment/totalLoans) * 100;
				interestPaymentPerc = Math.round(interestPaymentPerc * 100) / 100;
				
				otherPaymentPerc = (otherPayment/totalLoans) * 100;
				otherPaymentPerc = Math.round(otherPaymentPerc * 100) / 100;
			}
			totalLoansPerc = emiPercentage + interestPaymentPerc + otherPaymentPerc;


			$("#idEmiPercentage").text(parseFloat(emiPercentage).toFixed(2)+"%"); 
			$("#idEmiModalPerc").text(parseFloat(emiPercentage).toFixed(2) + "%");  

			$("#idInterestPercentage").text(interestPaymentPerc+"%");  
			$("#idOtherInterestModalPerc").text(interestPaymentPerc+"%");

			$("#idPrincipalPercentage").text(otherPaymentPerc+"%");  
			$("#idOtherPrincipalModalPerc").text(otherPaymentPerc+"%");  


			$("#idTotalLoans").text(maskAmountValue(Math.round(totalLoans)));
			$("#idLoanTotalModal").text(maskAmountValue(Math.round(totalLoans)));

			$("#idTotalLoansPerc").text(totalLoansPerc.toFixed(2) + "%"); 
			$("#idLoanTotalModalPerc").text(totalLoansPerc.toFixed(2) + "%"); 
			if (totalLoans == 0.00) {
				$("#idNetSurplusLoanTable").hide();
				$("#idNetSurplusLoanTableModal").hide();
			}
			var netSulplusAmt = totalIncome - totalExpense - totalLoans - coTotal;
			totalNetArr.push("Net Surplus");
			totalNetArr.push(parseFloat(netSulplusAmt));
			netArray.push(totalIncArr);
			netArray.push(totalExpArr);
			netArray.push(totalCOArr);
			netArray.push(totalLoanArr);
			netArray.push(totalNetArr);
			
			netsurpusGraph.push(parseInt(netSulplusAmt));
			//	alert(netSulplusAmt);
			$("#idTotalNetSulplus").text(maskAmountValue(Math.round(netSulplusAmt )));
			$("#idNetSurModal").text(maskAmountValue(Math.round(netSulplusAmt)));

			$("#idTotalNetSulplusPerc")
			.text(parseFloat((netSulplusAmt / netSulplusAmt) * 100).toFixed(2) + "%");
			$("#idNetSurModalPerc")
			.text(parseFloat((netSulplusAmt / netSulplusAmt) * 100).toFixed(2) + "%");

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
			interestPayment = 0;
			otherPayment = 0;
			totalLoans = emiAmount + interestPayment + otherPayment;
			netSulplusAmt = incomeTotal - expenseTotal - totalLoans;
			$("#idTotalLoans").text(parseFloat((totalLoans * 100)/100).toFixed(2));
			$("#idLoanTotalModal").text(parseFloat((totalLoans * 100)/100).toFixed(2));

			$("#idTotalLoansPerc").text("0.00%");
			$("#idLoanTotalModalPerc").text("0.00%");

			$("#idInterestPayment").text(parseFloat((interestPayment * 100)/100).toFixed(2));
			$("#idOtherInterestModal").text(parseFloat((interestPayment * 100)/100).toFixed(2));

			$("#idInterestPercentage").text("0.00%");  
			$("#idOtherInterestModalPerc").text("0.00%");  

			$("#idPrincipalPayment").text(parseFloat((otherPayment * 100)/100).toFixed(2));
			$("#idOtherPrincipalModal").text(parseFloat((otherPayment * 100)/100).toFixed(2));

			$("#idPrincipalPercentage").text("0.00%");  
			$("#idOtherPrincipalModalPerc").text("0.00%");

			$("#idTotalNetSulplus").text(parseFloat((netSulplusAmt * 100)/100).toFixed(2));
			$("#idNetSurModal").text(Math.round(parseFloat((netSulplusAmt * 100)/100).toFixed(2)));
			$("#idTotalNetSulplusPerc")
			.text("0.00%");
			$("#idNetSurModalPerc")
			.text("0.00%");


		}

	});

	function loadIncomeChart() {
		Highcharts.chart('idFPIncome', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Income Breakup'
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
						formatter:function()
						{ 
							return this.y > 0 ? this.key + ': ' + this.percentage.toFixed(2) + '%' : null 
						},
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				name: 'Income',
				colorByPoint: true,
				data: [{
					name: 'Salary Income',
					y: salaryIncomePercent,
					color:'#95ceff'
				},
				{
					name: 'Bonus Income/Variable Pay',
					y: bonousPercent,
					color:'#f7a35c'
				}, 
				{
					name: 'Business Income',
					y: bussPercent,
					color:'#90ed7d',
					sliced: true,
					selected: true
				}, {
					name: 'Professional Fees',
					y: profPercent,
					color:'#8085d9'
				}, {
					name: 'Rental Income',
					y:rentIncomePercent,
					color:'#f15c80'
				}, {
					name: 'Pension',
					y: pensionPercent,
					color:'#727276'

				},			
				{
					name: 'Other Income',
					y: otherIncomePercent,
					color:'#5adedc'
				},
				{
					name: 'Interest Income',
					y: interestIncomePercent,
					color:'#9164aa'

				},
				{
					name: 'Individual Total Income',
					y: indTotalPerc,
					color:'#cdaa5f'

				}

				]
			}]
		});
		Highcharts.chart('idFPIncomePop', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Income Breakup'
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
						formatter:function()
						{ 
							return this.y > 0 ? this.key + ': ' + this.percentage.toFixed(2) + '%' : null 
						},
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				name: 'Income',
				colorByPoint: true,
				data: [{
					name: 'Salary Income',
					y: salaryIncomePercent,
					color:'#95ceff'
				},
				{
					name: 'Bonus Income/Variable Pay',
					y: bonousPercent,
					color:'#f7a35c'
				}, 
				{
					name: 'Business Income',
					y: bussPercent,
					color:'#90ed7d',
					sliced: true,
					selected: true
				}, {
					name: 'Professional Fees',
					y: profPercent,
					color:'#8085d9'
				}, {
					name: 'Rental Income',
					y:rentIncomePercent,
					color:'#f15c80'
				}, {
					name: 'Pension',
					y: pensionPercent,
					color:'#727276'

				},			
				{
					name: 'Other Income',
					y: otherIncomePercent,
					color:'#5adedc'
				},
				{
					name: 'Interest Income',
					y: interestIncomePercent,
					color:'#9164aa'

				},
				{
					name: 'Individual Total Income',
					y: indTotalPerc,
					color:'#cdaa5f'

				}

				]
			}]
		});
	}

	function loadExpenseChart() {
		Highcharts.chart('idFPExpense', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Expense Breakup'
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
						formatter:function()
						{ 
							return this.y > 0 ? this.key + ': ' + this.percentage.toFixed(2) + '%' : null 
						},
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				name: 'Expense',
				colorByPoint: true,
				data: [{
					name: 'Groceries',
					y: Groceries_per_val_perc,
					color:'#95ceff'
				},


				{
					name: 'Utilities',
					y: Utilities_per_val_perc,
					color:'#f7a35c'
				}, {
					name: 'Transport',
					y: Transport_per_val_perc,
					color:'#90ed7d',
					sliced: true,
					selected: true
				},{
					name: 'Household & Personal Care',
					y: HouseholdAndPersonalCare_per_val_perc,
					color:'#8085d9'
				},{
					name: 'Housing & Maintenance',
					y: HousingAndMaintenance_per_val_perc,
					color:'#f15c80'
				},{
					name: 'Communication',
					y: Communication_per_val_perc,
					color:'#727276'
				},{
					name: 'Children Fees',
					y: ChildrenFees_per_val_perc,
					color:'#5adedc'
				},{
					name: 'Healthcare Expenses',
					y: HealthcareExpenses_per_val_perc,
					color:'#9164aa'
				},{
					name: 'Lifestyle & Entertainment',
					y: LifestyleAndEntertainment_per_val_perc,
					color:'#cdaa5f'
				},{
					name: 'Apparels & Accessories',
					y: ApparelsAndAccessories_per_val_perc,
					color:'#558769'
				},{
					name: 'Others (Charity, etc)',
					y: OthersCharityEtc_per_val_perc,
					color:'#a56e69'
				},
				{
					name: 'Living Expenses',
					y: livingExpensesTotalPerc,
					color:'#95ceff'
				}

				]
			}]
		});
		Highcharts.chart('idFPExpensePop', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Expense Breakup'
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
						formatter:function()
						{ 
							return this.y > 0 ? this.key + ': ' + this.percentage.toFixed(2) + '%' : null 
						},
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				name: 'Expense',
				colorByPoint: true,
				data: [{
					name: 'Groceries',
					y: Groceries_per_val_perc,
					color:'#95ceff'
				},
				{
					name: 'Utilities',
					y: Utilities_per_val_perc,
					color:'#f7a35c'
				}, {
					name: 'Transport',
					y: Transport_per_val_perc,
					color:'#90ed7d',
					sliced: true,
					selected: true
				},{
					name: 'Household & Personal Care',
					y: HouseholdAndPersonalCare_per_val_perc,
					color:'#8085d9'
				},{
					name: 'Housing & Maintenance',
					y: HousingAndMaintenance_per_val_perc,
					color:'#f15c80'
				},{
					name: 'Communication',
					y: Communication_per_val_perc,
					color:'#727276'
				},{
					name: 'Children Fees',
					y: ChildrenFees_per_val_perc,
					color:'#5adedc'
				},{
					name: 'Healthcare Expenses',
					y: HealthcareExpenses_per_val_perc,
					color:'#9164aa'
				},{
					name: 'Lifestyle & Entertainment',
					y: LifestyleAndEntertainment_per_val_perc,
					color:'#cdaa5f'
				},{
					name: 'Apparels & Accessories',
					y: ApparelsAndAccessories_per_val_perc,
					color:'#558769'
				},{
					name: 'Others (Charity, etc)',
					y: OthersCharityEtc_per_val_perc,
					color:'#a56e69'
				},
				{
					name: 'Living Expenses',
					y: livingExpensesTotalPerc,
					color:'#95ceff'
				}

				]
			}]
		});
	}
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
					income.push(parseInt(rowValue.income));
					expense.push(parseInt(rowValue.expense));
					commmitted_outflow.push(parseInt(rowValue.committed_outflows));
					loan_outflow.push(parseInt(rowValue.loan_outflows));
					net_surplus.push(parseInt(rowValue.net_surplus));
					$('#idNetProjection').append(

							'<tr><td>'+ rowValue.finYear+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.income))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.expense))+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.committed_outflows))+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.loan_outflows))+ '</td><td>'+                                              	
							maskAmountValue(Math.round(rowValue.net_surplus))+'</td></tr>');
					$('#idNetProjectionModal').append(

							'<tr><td>'+ rowValue.finYear+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.income))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.expense ))+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.committed_outflows))+ '</td><td>'+ 
							maskAmountValue(Math.round(rowValue.loan_outflows))+ '</td><td>'+                                              	
							maskAmountValue(Math.round(rowValue.net_surplus))+'</td></tr>');
			
				}
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
			loadNetSurplusChart();
		
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

	function loadNetSurplusChart() {
		Highcharts.chart('idFPNetSurplus', {
			 chart: {
			        type: 'column'
			    },
			    title: {
			        text: 'Net Surplus'
			    },
			    subtitle: {
			        text: ''
			    },
			    xAxis: {
			        type: 'category',
			        labels: {
			            rotation: -45,
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
			        pointFormat: 'Value in '+year[0]+':<b> Rs {point.y:.1f}</b>'
			    },
			    series: [{
			        name: 'Value',
			        data: netArray,
			        dataLabels: {
			            enabled: true,
			            rotation: -90,
			            color: '#FFFFFF',
			            align: 'right',
			            format: '{point.y:.1f}', // one decimal
			            y: 10, // 10 pixels down from the top
			            style: {
			                fontSize: '13px',
			                fontFamily: 'Verdana, sans-serif'
			            }
			        }
			    }]
		});

		Highcharts.chart('idFPNetSurplusPop', {
			 chart: {
			        type: 'column'
			    },
			    title: {
			        text: 'Net Surplus'
			    },
			    subtitle: {
			        text: ''
			    },
			    xAxis: {
			        type: 'category',
			        labels: {
			            rotation: -45,
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
			        pointFormat: 'Value in '+year[0]+':<b> Rs {point.y:.1f}</b>'
			    },
			    series: [{
			        name: 'Value',
			        data: netArray,
			        dataLabels: {
			            enabled: true,
			            rotation: -90,
			            color: '#FFFFFF',
			            align: 'right',
			            format: '{point.y:.1f}', // one decimal
			            y: 10, // 10 pixels down from the top
			            style: {
			                fontSize: '13px',
			                fontFamily: 'Verdana, sans-serif'
			            }
			        }
			    }]
		});
	}	


});









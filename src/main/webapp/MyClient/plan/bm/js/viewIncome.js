jQuery(document).ready(function ($) {
	var bodyIn = document.querySelector('#jssor_10');
	var prevActiveElementIn = null;
	var activeElementIn = null;
	// tab handling
	var newHandle = function checkTabPress(e) {
		"use strict";
		// pick passed event or global event object if passed one is empty
		e = e || event;
		if (e.keyCode == 9) {
			// Here read the active selected link.
			prevActiveElementIn = activeElementIn;
			activeElementIn = document.activeElement;
			if(prevActiveElementIn.name == "but4") {
//				bodyIn.removeEventListener("keyup", newHandle, false);
				$("#idBudget").empty();
				$("#idBudget").load("plan/bm/viewExpenses.html");
				$("#idBudgetHeading").html("Expenses");
				$(".Income").removeClass("onclickbg");
				$(".Expenses").addClass("onclickbg");
			} 
			// If HTML element is an anchor <a>

			/*if(focusFlag == "Y") {
	        	alert("Focus");

	        }*/
		}
	}
	bodyIn.addEventListener("keyup", newHandle, false);
//	body.addEventListener('keyup', checkTabPress,false);

	$(".form-section-container").css("padding","24px 45px 99px 45px");
	jQuery.fn.popupwindow = function(p)
	{
		var profiles = p || {};
		return this.each(function(index){
			var settings, parameters, mysettings, b, a, winObj;
			// for overriding the default settings
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

	var jssor_10_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}
		];

	var jssor_10_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_10_SlideshowTransitions,
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
	var jssor_10_slider = new $JssorSlider$("jssor_10", jssor_10_options);

	var incomepavright = $('.jssort10 div:nth-child(2) div:nth-child(5) div');
	var incomepavleft = $('.jssort10 div:nth-child(2) div:nth-child(2) div');

	$(".Incomeright").click(function(){
		if(incomepavright.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/bm/viewExpenses.html");
			$("#idHeading").html("Expenses");
			$(".Income").removeClass("activeitem");
			$(".Expenses").addClass("activeitem");
		};
	});

	$(".Incomeleft").click(function(){
		if(incomepavleft.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/bm/viewRecommended.html");
			$("#idHeading").html("Budget Recommendations");
			$(".Income").removeClass("activeitem");
			$(".Recommendations").addClass("activeitem");

		};
	});
	var modal = document.getElementById('idPopIncome');

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxIncome");

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



	/*************************************UI Integration Code *************************/

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
			var fileName = "Income_"+ mode + "_report.xlsx";

			var xhr = new XMLHttpRequest();
			//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
			//fpFlag determines whether called from bm or fp
			xhr.open( "GET", REQUEST_URL_BM+'/download?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
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
			var fileName = "Income_"+ mode + "_report.xlsx";

			var xhr = new XMLHttpRequest();
			//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
			xhr.open( "GET", REQUEST_URL_BM+'/download?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
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
	var option1= [];
	var option2=[];
	var option3=[];
	var option4 =[];
	var option5 =[];
	var option6 =[];
	var option7 =[];
	var category =[];
	var salaryIncome;
	var bonousPercent;
	var profPercent;
	var bussPercent;
	var rentIncomePercent;
	var otherIncomePercent;
	var interestIncomePercent;
	var pensionPercent;
	var indTotalPerc;
	var flagSal = 0;
	var flagBusiness = 0;
	var flagRental = 0;
	var flagPension = 0;
	var flagOther = 0;
	var flagInd = 0;
	var flagInterest = 0;
	var flagTotal = 0;
	
	var flagRow = 0;
	var lastFinYearToBeDisplayed="";
	$("#incomeTable").hide();
	$.ajax({
		type: 'GET',
		async:false,
		url: REQUEST_URL_BM+'/getClientIncomeInfo?clientId='+vClientId+'&mode=yearly&fpFlag=0',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {

			salaryIncome = data.salaryIncome;
			$("#salaryAmount")
			.text(maskAmountValue(Math.round(salaryIncome)));
			if(salaryIncome == 0) {
				$("#idIncomeTable tbody tr.classSalary").hide();
			}
			$("#bonousAmount")
			.text(maskAmountValue(Math.round(data.bonousIncome)));
			if(data.bonousIncome == 0) {
				$("#idIncomeTable tbody tr.classBonus").hide();
			}
			$("#profFess")
			.text(maskAmountValue(Math.round(data.professionalFee)));
			if(data.professionalFee == 0) {
				$("#idIncomeTable tbody tr.classProf").hide();
			}
			$("#bussIncome")
			.text(maskAmountValue(Math.round(data.bussinessIncome)));
			if(data.bussinessIncome == 0) {
				$("#idIncomeTable tbody tr.classBuss").hide();
			}
			$("#rentIncome")
			.text(maskAmountValue(Math.round(data.rentalIncome)));	
			if(data.rentalIncome == 0) {
				$("#idIncomeTable tbody tr.classRent").hide();
			}
			$("#pension")
			.text(maskAmountValue(Math.round(data.pension)));
			if(data.pension == 0) {
				$("#idIncomeTable tbody tr.classPension").hide();
			}
			$("#otherIncome")
			.text(maskAmountValue(Math.round(data.otherIncome)));
			if(data.otherIncome == 0) {
				$("#idIncomeTable tbody tr.classOther").hide();
			}
			$("#interestIncome")
			.text(maskAmountValue(Math.round(data.interestIncome)));
			if(parseInt(data.interestIncome ) == 0) {
				$("#idIncomeTable tbody tr.classInterest").hide();
			}
			$("#indTotalIncome")
			.text(maskAmountValue(Math.round(data.individualTotalIncome)));
			if(parseInt(data.individualTotalIncome ) == 0) {
				$("#idIncomeTable tbody tr.classIndTotal").hide();
			}
			$("#totalIncome")
			.text(maskAmountValue(Math.round(data.totalIncome)));
			$("#salaryPercent")
			.text(parseFloat((data.salaryIncome / data.totalIncome) * 100).toFixed(2) + "%");
			salaryIncomePercent = (data.salaryIncome / data.totalIncome) * 100;


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

			
			$.each(data.clientFamilyList,
					function(index, value) {
				
				if(value.salaryIncome == 0 && value.bussinessIncome == 0 && value.rentalIncome == 0 &&
						value.pension == 0 && value.interestIncome == 0 && value.otherIncome == 0 && value.individualTotalIncome == 0) {
					flagRow = 1;
				} else {
					flagRow = 0;
					if(data.clientFamilyList[index + 1] != null) {
						lastFinYearToBeDisplayed = data.clientFamilyList[index + 1].year;
					}
					
				}
				if (parseFloat(value.salaryIncome).toFixed(2) != 0.00) {
					flagSal = 1;
				}
				if (parseFloat(value.bussinessIncome).toFixed(2) != 0.00) {
					flagBusiness = 1;
				}
				if (parseFloat(value.rentalIncome).toFixed(2) != 0.00) {
					flagRental = 1;
				}
				if (parseFloat(value.pension).toFixed(2) != 0.00) {
					flagPension = 1;
				}
				if (parseFloat(value.otherIncome).toFixed(2) != 0.00) {
					flagOther = 1;
				}
				if (parseFloat(value.interestIncome).toFixed(2) != 0.00) {
					flagInterest = 1;
				}
				if (parseFloat(value.individualTotalIncome).toFixed(2) != 0.00) {
					flagInd = 1;
				}
				if (parseFloat(value.totalIncome).toFixed(2) != 0.00) {
					flagTotal = 1;
				}


			});
			// hide rows
			$.each(data.clientFamilyList,
					function(rowIndex, rowValue) {
				if(flagRow == 1 && rowValue.year == lastFinYearToBeDisplayed){
					 return false; 
				} else {
					
					category.push(rowValue.year);
					option1.push(rowValue.salaryIncome);
					option2.push(rowValue.bussinessIncome);
					option3.push(rowValue.rentalIncome);
					option4.push(rowValue.pension);
					option5.push(rowValue.interestIncome);
					option6.push(rowValue.otherIncome);
					option7.push(rowValue.individualTotalIncome);
					
					$('#idIncomeProjectionTable').append(
							'<tr><td style="width: 12% !important;">'+ rowValue.year + '</td><td>'+
							maskAmountValue(Math.round(rowValue.salaryIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.bussinessIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.rentalIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.pension))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.otherIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.interestIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.individualTotalIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.totalIncome))+'</td></tr>');

					$('#idIncomeProjectionTableModal').append(
							'<tr><td style="width: 12% !important;">'+ rowValue.year+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.salaryIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.bussinessIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.rentalIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.pension))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.otherIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.interestIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.individualTotalIncome))+ '</td><td>'+
							maskAmountValue(Math.round(rowValue.totalIncome))+'</td></tr>');

				}
			});
			
			// hide all zero containing columns

			if(flagSal == 0) {
				$('#idMainIncomeTable td:nth-child(2),#idMainIncomeTable th:nth-child(2)').hide();
				$('#idMainIncomeTableModal td:nth-child(2),#idMainIncomeTableModal th:nth-child(2)').hide();
			}
			if(flagBusiness == 0) {
				$('#idMainIncomeTable td:nth-child(3),#idMainIncomeTable th:nth-child(3)').hide();
				$('#idMainIncomeTableModal td:nth-child(3),#idMainIncomeTableModal th:nth-child(3)').hide();
			}
			if(flagRental == 0) {
				$('#idMainIncomeTable td:nth-child(4),#idMainIncomeTable th:nth-child(4)').hide();
				$('#idMainIncomeTableModal td:nth-child(4),#idMainIncomeTableModal th:nth-child(4)').hide();
			}
			if(flagPension == 0) {
				$('#idMainIncomeTable td:nth-child(5),#idMainIncomeTable th:nth-child(5)').hide();
				$('#idMainIncomeTableModal td:nth-child(5),#idMainIncomeTableModal th:nth-child(5)').hide();
			}
			if(flagOther == 0) {
				$('#idMainIncomeTable td:nth-child(6),#idMainIncomeTable th:nth-child(6)').hide();
				$('#idMainIncomeTableModal td:nth-child(6),#idMainIncomeTableModal th:nth-child(6)').hide();
			}
			if(flagInterest == 0) {
				$('#idMainIncomeTable td:nth-child(7),#idMainIncomeTable th:nth-child(7)').hide();
				$('#idMainIncomeTableModal td:nth-child(7),#idMainIncomeTableModal th:nth-child(7)').hide();
			}
			if(flagInd == 0) {
				$('#idMainIncomeTable td:nth-child(8),#idMainIncomeTable th:nth-child(8)').hide();
				$('#idMainIncomeTableModal td:nth-child(8),#idMainIncomeTableModal th:nth-child(8)').hide();
			}
			if(flagTotal == 0) {
				$('#idMainIncomeTable td:nth-child(9),#idMainIncomeTable th:nth-child(9)').hide();
				$('#idMainIncomeTableModal td:nth-child(9),#idMainIncomeTableModal th:nth-child(9)').hide();
			}

			loadCharts();

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
			if (errorFlag != 0) {
				bootbox.alert(data.responseText);
			}
			$("#incomeHeadId")
			.text("Annual Income");
//			alert(data.responseText);

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

			loadCharts();
		}
	});
//	console.log("Here2");
	$("#incomeTable").show();


	function loadCharts() {
//		console.log("In LoadCharts");
		Highcharts.chart('idCurrentIncome', {
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
			legend: {
				align: 'right',
				verticalAlign: 'middle',
				layout: 'vertical'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true,
                    size: 200
				}
			},
			series: [{
				name: 'Allocation',
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
				}, {
					name: 'Professional Fees',
					y: profPercent,
					color:'#90ed7d',
					sliced: true,
					selected: true
				}, {
					name: 'Business Income',
					y: bussPercent,
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

		Highcharts.chart('idIncomeProjection', {
			chart: {
				type: 'column',
				height: 395
			},
			title: {
				text: '<p style="color:white;font-weight: bold;">Expected Income Projections</p>'
			},
			xAxis: {
				categories: category
			},
			yAxis: {
				min: 0,
				title: {
					text: ''
				},
				stackLabels: {

					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
					}
				}
			},
			legend: {
				align: 'right',
				x: 0,
				verticalAlign: 'bottom',
				y: 50,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false,

			},
			tooltip: {
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '{series.name}: {point.y}<br/>Total Income: {point.stackTotal}'
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
				name: 'Salary, Bonus & Professional Income',
				data: option1,
				color:"#8cb6da"
			}, {
				name: 'Business Income',
				data: option2,
				color:"#6ba0ce"
			}, {
				name: 'Rental Income',
				data: option3,
				color:"#5c96c8"
			},{
				name: 'Pension',
				data: option4,
				color:"#337ab7"
			},{
				name: 'Other Income',
				data: option6,
				color:"#3072ab"
			},{
				name: 'Interest Income',
				data: option5,
				color:"#3072ab"
			},{
				name: 'Individual total Income',
				data: option7,
				color:"#3072ab"
			}]
		});
	}
	function databasecall(val) {
//		alert("key assumptions" + val);
		$.ajax({
			type: 'GET',
			async:false,
			url: REQUEST_URL_BM+'/getIncomeDetailOfFamilyMember?memberId='+val,
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function (data) {
				$('#idKeyAssumption').empty();
				$.each(data,function(index, value) {
					$("#idKeyAssumption").append('<tr>' +
							'<td>'+ value.incomeCategory+'</td>' +
							'<td><input type="text" readonly value="'+maskAmountValue(value.income)+'" class="form-control"/></td>'+
							'<td><input type="text" readonly value="'+value.frequency+'" class="form-control"/></td>'+
							'<td><input type="text" readonly value="'+value.referenceMonth+'" class="form-control"/></td>'+
							'<td><input type="text" readonly value="'+value.continueUpto+'" class="form-control"/></td>'+
							'<td><input type="text" readonly value="'+(value.annualIncomeGrowthRate * 100)+'" class="form-control"/></td>'+
					'</tr>');
				});	
			},
			error: function (jqXHR) {
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
		});
	}

	$("#idassetOwner1").hide();
	$("#idassetOwner2").hide();
	$("#idassetOwner3").hide();
	$("#idassetOwner4").hide();
	$("#idassetOwner5").hide();
	$("#idassetOwner6").hide();
	$("#idassetOwner7").hide();

	income_key_selection_gender_default = selfGender;
	income_key_selection_default = 0;

	$.each(relation,function(index, value) {
		if (value == 0) {
			databasecall(memberIdList[0]);
			if (selfGender == "M") {				
				document.getElementById("idSelfImg").src = "../Common/assets/images/icons/Man-C.png";
				//alert("2");
				$("#idassetOwner1").show();
				$(".assetOwner1_img").click(function() {
					databasecall(memberIdList[index]);
					income_key_selection_gender_default = selfGender;
					income_key_selection_default = 0;
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Man-C.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
					$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
					$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
					$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
					$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
					$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");
				});
			} else {
				document.getElementById("idSelfImg").src = "../Common/assets/images/icons/Lady-C.png";
				$("#idassetOwner1").show();
				$(".assetOwner1_img").click(function() {
					databasecall(memberIdList[index]);
					income_key_selection_gender_default = selfGender;
					income_key_selection_default = 0;
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-C.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
					$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
					$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
					$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
					$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
					$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");
				});
			}

		}
		if (value == 1) {
//			$(".assetOwner2_img").show();
			if (selfGender == "M") {
				document.getElementById("idSpouseImg").src = "../Common/assets/images/icons/Lady-A.png";
				//alert("4");
				$("#idassetOwner2").show();
				$(".assetOwner2_img").click(function() {
					databasecall(memberIdList[index]);
					income_key_selection_gender_default = selfGender;
					income_key_selection_default = 1;
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Man-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Lady-C.png");
					$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
					$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
					$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
					$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
					$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");
				});

			} else {
				document.getElementById("idSpouseImg").src = "../Common/assets/images/icons/Man-A.png";
				$("#idassetOwner2").show();
				$(".assetOwner2_img").click(function() {
					databasecall(memberIdList[index]);
					income_key_selection_gender_default = selfGender;
					income_key_selection_default = 1;
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-C.png");
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
					$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
					$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
					$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
					$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
					$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");
				});
			}
		}
		if (value == 2) {
			$("#idassetOwner3").show();
			$(".assetOwner3_img").click(function() {
				databasecall(memberIdList[index]);
				income_key_selection_gender_default = selfGender;
				income_key_selection_default = 2;
				if (selfGender == "M") {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Man-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
				} else {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
				}
				$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-C.png");
				$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
				$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
				$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
				$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");

			});
		}
		if (value == 3) {
//			$("#idassetOwner4").show();
			$("#idassetOwner4").show();
			$(".assetOwner4_img").click(function() {
				databasecall(memberIdList[index]);
				income_key_selection_gender_default = selfGender;
				income_key_selection_default = 3;
				if (selfGender == "M") {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Man-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
				} else {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
				}
				$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
				$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-C.png");
				$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
				$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
				$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");

			});
		}
		if (value == 4) {
			$("#idassetOwner5").show();
			$(".assetOwner5_img").click(function() {
				databasecall(memberIdList[index]);
				income_key_selection_gender_default = selfGender;
				income_key_selection_default = 4;
				if (selfGender == "M") {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Man-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
				} else {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
				}
				$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
				$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
				$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-C.png");
				$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
				$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");

			});
		}
		if (value == 5) {
			$("#idassetOwner6").show();
			$(".assetOwner6_img").click(function() {
				databasecall(memberIdList[index]);
				income_key_selection_gender_default = selfGender;
				income_key_selection_default = 5;
				if (selfGender == "M") {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Man-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
				} else {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
				}
				$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
				$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
				$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
				$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-C.png");
				$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-A.png");

			});
		}
		if (value == 6) {
			$("#idassetOwner7").show();
			$(".assetOwner7_img").click(function() {
				databasecall(memberIdList[index]);
				income_key_selection_gender_default = selfGender;
				income_key_selection_default = 6;
				if (selfGender == "M") {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Man-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
				} else {
					$(".assetOwner1_img").attr('src',"../Common/assets/images/icons/Lady-A.png");
					$(".assetOwner2_img").attr('src',"../Common/assets/images/icons/Man-A.png");
				}
				$(".assetOwner3_img").attr('src',"../Common/assets/images/icons/Boy-A.png");
				$(".assetOwner4_img").attr('src',"../Common/assets/images/icons/Girl-A.png");
				$(".assetOwner5_img").attr('src',"../Common/assets/images/icons/Father-A.png");
				$(".assetOwner6_img").attr('src',"../Common/assets/images/icons/Mother-A.png");
				$(".assetOwner7_img").attr('src',"../Common/assets/images/icons/Other-C.png");

			});
		}
	});	

});


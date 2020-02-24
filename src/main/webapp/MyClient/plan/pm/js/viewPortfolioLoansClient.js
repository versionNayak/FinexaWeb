
jQuery(document).ready(function ($) {
    $("div.daterangepicker").remove();

	var loanListData;
	var interestPayment= [];
	var principlePayment=[];
	var endBal=[];
	var yearProjection =[];
	var salaryIncome;
	var salaryIncomePercent;
	var bonousPercent;
	var profPercent;
	var bussPercent;
	var rentIncomePercent;
	var otherIncomePercent;
	var interestIncomePercent;
	var pensionPercent;
	var payoutFrequency = "N/A";
	var oriFlag = 0;
	var outFlag = 0;
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_BM+'/getClientLoanInfo?clientId='+vClientId+'&fpFlag=0',
		async: true,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {

			$("#currentClientLoanList").empty();
			loanListData=data;
			$.each(data,
					function(index, value) {
				payoutFrequency = "N/A";
				if (value.interestPayoutFreq == 1) {
					payoutFrequency = "Annualy";
				} else if (value.interestPayoutFreq == 2) {
					payoutFrequency = "Half Yearly"
				} else if (value.interestPayoutFreq == 3) {
					payoutFrequency = "Tri-Annualy";
				} else if (value.interestPayoutFreq == 4) {
					payoutFrequency = "Quaterly";
				} else if (value.interestPayoutFreq == 6) {
					payoutFrequency = "Bi-Monthly";
				} else if (value.interestPayoutFreq == 12) {
					payoutFrequency = "Monthly";
				}
				var originalPrincipal = "N/A";
				if(value.originalPrincipal != 0) {
					originalPrincipal = maskAmountValue(Math.round(parseFloat(value.originalPrincipal).toFixed(2)));
				}
				var emi = "N/A";
				if(value.emi != 0) {
					emi = maskAmountValue(Math.round(parseFloat(value.emi).toFixed(2)));
				}

				var outstandingPrincipal = "N/A";
				if(value.outstandingPrincipal != 0) {
					outstandingPrincipal = maskAmountValue(Math.round(parseFloat(value.outstandingPrincipal).toFixed(2)));
				}

				$('#currentClientLoanList').append(
						'<tr><td>'+ value.loanType+ '</td><td>'+ 
						value.loanProvider+ '</td><td>'+
						(originalPrincipal)+ '</td><td>'+ 
						(outstandingPrincipal)+ '</td><td>'+ 
						value.interestRate+ '</td><td>'+ 
						emi+ '</td><td>'+
						value.loanStartDate+ '</td><td>'+
						value.loanEndDate+ '</td><td>'+
						payoutFrequency+'</td></tr>');	
				//	$('#accordion').html('')
				//	alert($('#accordion').html());

				if(parseFloat(value.originalPrincipal).toFixed(2) != 0.00) {
					oriFlag = 1;
//					$('#idLoanCurrentTable td:nth-child(3),#idLoanCurrentTable th:nth-child(3)').hide();
				} 
				if(parseFloat(value.outstandingPrincipal).toFixed(2) != 0.00) {
					outFlag = 1;
//					$('#idLoanCurrentTable td:nth-child(4),#idLoanCurrentTable th:nth-child(4)').hide();
				} 

			});
			if (oriFlag == 0) {
				$('#idCurrentLoanTable td:nth-child(3),#idCurrentLoanTable th:nth-child(3)').hide();
			}
			if (outFlag == 0) {
				$('#idCurrentLoanTable td:nth-child(4),#idCurrentLoanTable th:nth-child(4)').hide();
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


	$.ajax({
		type: 'GET',
		async:false,
		url: REQUEST_URL_BM+'/getClientAllBankLoanDetails?clientId='+vClientId+'&mode=yearly&fpFlag=0',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$.each(data,
					function(index, value) {
				$('#idTotalLoans').append(
						'<tr><td>'+ value.projectionYear+ '</td><td>'+ 
						maskAmountValue(Math.round(value.begningBal))+ '</td><td>'+
						maskAmountValue(Math.round(value.interestPay))+ '</td><td>'+ 
						maskAmountValue(Math.round(value.principalPay))+ '</td><td>'+ 
						maskAmountValue(Math.round(value.endBal))+ '</td><td>'+                                              	
						maskAmountValue(Math.round(value.emiAmount))+'</td></tr>');
				$('#idTotalLoansModal').append(
						'<tr><td>'+ value.projectionYear+ '</td><td>'+ 
						maskAmountValue(Math.round(value.begningBal))+ '</td><td>'+
						maskAmountValue(Math.round(value.interestPay))+ '</td><td>'+ 

						maskAmountValue(Math.round(value.principalPay))+ '</td><td>'+ 
						maskAmountValue(Math.round(value.endBal))+ '</td><td>'+                                              	
						maskAmountValue(Math.round(value.emiAmount))+'</td></tr>');
				yearProjection.push(value.projectionYear);
				interestPayment.push(value.interestPay);
				principlePayment.push(value.principalPay);
				endBal.push(value.endBal);
			});
			Highcharts.chart('idLoanPayment', {
				chart: {
					type: 'column'
				},
				title: {
					text: '<p style="color:white;font-weight: bold;">Expected Income Projections</p>'
				},
				xAxis: {
					categories:yearProjection
				},
				yAxis: {
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
					verticalAlign: 'bottom'
						/*y: -20,
					floating: true,
					backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
					borderColor: '#CCC',
					borderWidth: 1,
					shadow: false,*/

				},
				tooltip: {
					headerFormat: '<b>{point.x}</b><br/>',
					pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
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
					name: 'Interest Payment',
					data: interestPayment,
					color:"#6ba0ce"
				},  {
					name: 'Principal Payment',
					data:principlePayment,
					color:"#337ab7"
				}]
			});


			Highcharts.chart('idOutstandingLoan', {
				chart: {
					type: 'column'
				},
				title: {
					text: ''
				},

				xAxis: {
					categories: yearProjection,
					crosshair: true
				},
				yAxis: {
					title: {
						text: ''
					}
				},
				legend: {
					align: 'right',
					x: 0,
					verticalAlign: 'bottom',

				},
				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
				series: [ {
					name: 'OutStanding Loan',
					data:endBal,
					color:"#337ab7"

				}]
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


	var content = "";
	var htmlContentModal = "";
	var innerHtmlString = '<div data-u="image"><div id="idMaxIndiLoans" class="popup" style="position: relative; left: 40px">'+
	'<img src="../Common/assets/images/maximg.png" /></div>';
	$.ajax({
		type: 'GET',
		async:false,
		url: REQUEST_URL_BM+'/getClientBankLoanDetails?clientId='+vClientId+'&mode=yearly&fpFlag=0',
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$.each(data,
					function(index, value) {
				htmlContentModal = htmlContentModal + '<div>';
				htmlContentModal = htmlContentModal + '<h3 style="margin-left: 14px">Loan Schedule : '+value.providerName+ ' ' +
				value.categoryName + ' Loans </h3>' +
				'<div><div><div class="container-fluid"><table width="94%" class="individualoan">'+
				'<thead>'+
				'<tr>'+
				'<th>Year</th>'+
				'<th>Beginning Balance</th>'+
				'<th>Interest Payment</th>'+
				'<th>Principal Payment</th>'+
				'<th>Ending Balance</th>'+
				'<th>EMI Amount</th>'+
				'<th>Total Principal Paid to Date</th>'+
				'<th>Total Interest Paid to Date</th>'+
				'</tr></thead>'+
				'<tbody>';
				$.each(value.clientFamilyLoanOutputList,
						function(index1, value1) {
					htmlContentModal = htmlContentModal + '<tr>' +
					'<td>'+value1.projectionYear+'</td>'+
					'<td>'+maskAmountValue(Math.round(value1.begningBal))+'</td>'+
					'<td>'+maskAmountValue(Math.round(value1.interestPay))+'</td>'+
					'<td>'+maskAmountValue(Math.round(value1.principalPay))+'</td>'+
					'<td>'+maskAmountValue(Math.round(value1.endBal))+'</td>'+
					'<td>'+maskAmountValue(Math.round(value1.emiAmount))+'</td>'+
					'<td>'+maskAmountValue(Math.round(value1.totalPrincipalPaid))+'</td>'+
					'<td>'+maskAmountValue(Math.round(value1.totalInterestPaid))+'</td></tr>';
				});
				htmlContentModal = htmlContentModal + '</tbody></table></div></div></div>';
			});
			innerHtmlString = innerHtmlString + htmlContentModal + '</div>';
			htmlContentModal = htmlContentModal + '<br/></div>'
		////document.getElementById("idIndividualLoanContainer").innerHTML=innerHtmlString;//For Client Portal
			document.getElementById("idIndividualLoanContainerModal").innerHTML=htmlContentModal;

//			document.getElementById("idIndividualLoan").innerHTML = innerHtmlString;
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
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioNetworth.html");

			$(".glidnonglid").hide();
			$("#idHeading").html("Networth");
			$(".pmloans").removeClass("onclickbg");
			$(".pmnetworth").addClass("onclickbg");


		};
	});

	$(".Loansleft").click(function(){
		if(loanpavleft.hasClass('pav'))
		{

			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioTracker.html");

			$(".glidnonglid").hide();
			$("#idHeading").html("Portfolio Tracker");
			$(".pmloans").removeClass("onclickbg");
			$(".pmtracker").addClass("onclickbg");




		};
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
////	var btn = document.getElementById("idMaxTotalLoan");  for client portal

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
//idDownloadTotalLoanSchedule
	$("#idDownloadTotalLoanSchedule").click(function(){
		var mode;
		var errorFlag = 0;
		if($('#idMonthlyRadioTotalLoanSchedule').prop("checked")) {
			mode = "monthly";
		} else if ($('#idYearlyRadioTotalLoanSchedule').prop("checked")){
			mode = "yearly";
		} else {
			errorFlag = 1;
			alert("Please select a valid option");
		}
		if (errorFlag == 0) {
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";
			var fileName = "Loan_"+ mode + "_report.xlsx";

			var xhr = new XMLHttpRequest();
			//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
			xhr.open( "GET", REQUEST_URL_BM+'/downloadLoanReport?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
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
//change to idDownloadTotalLoanSchedule
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
			var fileName = "Loan_"+ mode + "_report.xlsx";

			var xhr = new XMLHttpRequest();
			//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
			xhr.open( "GET", REQUEST_URL_BM+'/downloadLoanReport?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
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

});
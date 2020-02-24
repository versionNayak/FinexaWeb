var jssor_22_SlideshowTransitions = [
	{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}


	];

var jssor_22_options = {
		$AutoPlay: 1,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: jssor_22_SlideshowTransitions,
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

var jssor_22_slider = new $JssorSlider$("jssor_22", jssor_22_options);

var recompavright = $('.jssort22 div:nth-child(2) div:nth-child(4) div');
var recompavleft = $('.jssort22 div:nth-child(2) div:nth-child(2) div');

$(".Incomeright").click(function(){
	if(recompavright.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewPlanofAction.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$(".glidnonglid").hide();
		$("#idHeading").html("Plan of Action");
		$(".fpcashflows").removeClass("activeitem");
		$(".fplantofaction").addClass("activeitem");

	};
});maskAmountValue

$(".Incomeleft").click(function(){
	if(recompavleft.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/fp/viewInsurancePlanning.html");
		$(".form-section-container").css("padding","27px 45px 101px");
		$("#idHeading").html("Insurance Planning");
		$(".fpcashflows").removeClass("activeitem");
		$(".fpinsuranceplanning").addClass("activeitem");

	};

	/** Added on 19th sep version for arrow key(NehaD) end **/
});


$('#small').click(function () {
	chart.setSize(400, 300);
});

$('#large').click(function () {
	chart.setSize(600, 300);
});

/**************************** UI Integration ***********************************/

var flagSal = 0;
var flagBusiness = 0;
var flagRental = 0;
var flagPension = 0;
var flagOther = 0;
var flagInd = 0;
var flagInterest = 0;
var flagLumpsum = 0;
var flagTotal = 0;
var totalInc = [];
var projYear = [];
var displayYear = [];
var totalExp = [];

function loadCashflowCharts() {
	var chart = Highcharts.chart('idmarketcappop', {

		chart: {
			type: 'column'
		},

		title: {
			text: 'Cash Flow'
		},

		subtitle: {
			text: ''
		},

		legend: {
			align: 'right',
			verticalAlign: 'bottom',
			layout: 'vertical'
		},

		xAxis: {
			categories: displayYear,
			labels: {
				x: -10
			}
		},

		yAxis: {
			allowDecimals: false,
			title: {
				text: 'Amount'
			}
		},

		series: [{
			name: 'Total Income',
			data: totalInc,
			color:'#95ceff'
		}, {
			name: 'Total Expense',
			data: totalExp,
			color:'#f7a35c'
		}],

		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						align: 'center',
						verticalAlign: 'bottom',
						layout: 'Horizontal'
					},
					yAxis: {
						labels: {
							align: 'left',
							x: 0,
							y: -5
						},
						title: {
							text: null
						}
					},
					subtitle: {
						text: null
					},
					credits: {
						enabled: false
					}
				}
			}]
		}
	});

	var chart = Highcharts.chart('idmarketcap', {

		chart: {
			type: 'column'
		},

		title: {
			text: 'Cash Flow'
		},

		subtitle: {
			text: ''
		},

		legend: {
			align: 'right',
			verticalAlign: 'bottom',
			layout: 'vertical'
		},

		xAxis: {
			categories: projYear,
			labels: {
				x: -10
			}
		},

		yAxis: {
			allowDecimals: false,
			title: {
				text: 'Amount'
			}
		},

		series: [{
			name: 'Total Income',
			data: totalInc,
			color:'#95ceff'
		}, {
			name: 'Total Expense',
			data: totalExp,
			color:'#f7a35c'
		}],

		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						align: 'center',
						verticalAlign: 'bottom',
						layout: 'Horizontal'
					},
					yAxis: {
						labels: {
							align: 'left',
							x: 0,
							y: -5
						},
						title: {
							text: null
						}
					},
					subtitle: {
						text: null
					},
					credits: {
						enabled: false
					}
				}
			}]
		}
	});
}
var futureLoanMap = [];
var futureLoanToBeDeducted = 0;// this will be minimum of all the emi through out future loan calculations
$.ajax({
	type: 'GET',
	async:false,
	url: REQUEST_URL_FP+'/getClientFutureLoanWork?clientId='+vClientId+'',
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		$.each(data,function(index, value) {
			var futureLoanEMI = value.finalCalculatedEmi;
			//var achievableEmi = value.achievableEmi;
			/*if(achievableEmi < futureLoanEMI) {
				futureLoanEMI = achievableEmi;
			}*/
			var futureLoanObj = {};
			futureLoanObj['YEAR']=value.finYear;
			futureLoanObj['VAL']=futureLoanEMI;
			futureLoanMap.push(futureLoanObj);
			
			/*if (value.achievableEmi < futureLoanToBeDeducted) {
				futureLoanToBeDeducted = value.achievableEmi;
			}*/
			
			
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

var flagRow = 0;
var lastFinYearToBeDisplayed = "";

$.ajax({
	type: 'GET',
	async:false,
	url: REQUEST_URL_BM+'/getClientIncomeInfo?clientId='+vClientId+'&mode=yearly&fpFlag=1',
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {

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
			if (parseFloat(value.lumpsumInflow).toFixed(2) != 0.00) {
				flagLumpsum = 1;
			}

		});

		// hide rows
		$.each(data.clientFamilyList,
				function(rowIndex, rowValue) {
			if(flagRow == 1 && rowValue.year == lastFinYearToBeDisplayed){
				 return false; 
			} else {
				projYear.push(rowValue.year);
				totalInc.push(parseInt(rowValue.totalIncome));
				$('#idCashInflowTbody').append(
						'<tr><td>'+ rowValue.age+ '</td><td>'+ 
						rowValue.year + '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.salaryIncome).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.bussinessIncome).toFixed(2)))+ '</td><td>'+ 
						maskAmountValue(Math.round(parseFloat(rowValue.rentalIncome).toFixed(2)))+ '</td><td>'+ 
						maskAmountValue(Math.round(parseFloat(rowValue.pension).toFixed(2)))+ '</td><td>'+ 
						maskAmountValue(Math.round(parseFloat(rowValue.otherIncome).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.interestIncome).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.individualTotalIncome).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.lumpsumInflow).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.totalIncome).toFixed(2)))+'</td></tr>');
				
				$('#idCashInflowTbodyModal').append(
						'<tr><td>'+ rowValue.age+ '</td><td>'+ 
						rowValue.year + '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.salaryIncome).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.bussinessIncome).toFixed(2)))+ '</td><td>'+ 
						maskAmountValue(Math.round(parseFloat(rowValue.rentalIncome).toFixed(2)))+ '</td><td>'+ 
						maskAmountValue(Math.round(parseFloat(rowValue.pension).toFixed(2)))+ '</td><td>'+ 
						maskAmountValue(Math.round(parseFloat(rowValue.otherIncome).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.interestIncome).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.individualTotalIncome).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.lumpsumInflow).toFixed(2)))+ '</td><td>'+
						maskAmountValue(Math.round(parseFloat(rowValue.totalIncome).toFixed(2)))+'</td></tr>');

			}
		});
		displayYear = projYear;
		
		// hide all zero containing columns

		if(flagSal == 0) {
			$('#idCashInflowTable td:nth-child(3),#idCashInflowTable th:nth-child(3)').hide();
			$('#idCashInflowTableModal td:nth-child(3),#idCashInflowTableModal th:nth-child(3)').hide();
		}
		if(flagBusiness == 0) {
			$('#idCashInflowTable td:nth-child(4),#idCashInflowTable th:nth-child(4)').hide();
			$('#idCashInflowTableModal td:nth-child(4),#idCashInflowTableModal th:nth-child(4)').hide();
		}
		if(flagRental == 0) {
			$('#idCashInflowTable td:nth-child(5),#idCashInflowTable th:nth-child(5)').hide();
			$('#idCashInflowTableModal td:nth-child(5),#idCashInflowTableModal th:nth-child(5)').hide();
		}
		if(flagPension == 0) {
			$('#idCashInflowTable td:nth-child(6),#idCashInflowTable th:nth-child(6)').hide();
			$('#idCashInflowTableModal td:nth-child(6),#idCashInflowTableModal th:nth-child(6)').hide();
		}
		if(flagOther == 0) {
			$('#idCashInflowTable td:nth-child(7),#idCashInflowTable th:nth-child(7)').hide();
			$('#idCashInflowTableModal td:nth-child(7),#idCashInflowTableModal th:nth-child(7)').hide();
		}
		if(flagInterest == 0) {
			$('#idCashInflowTable td:nth-child(8),#idCashInflowTable th:nth-child(8)').hide();
			$('#idCashInflowTableModal td:nth-child(8),#idCashInflowTableModal th:nth-child(8)').hide();
		}
		if(flagInd == 0) {
			$('#idCashInflowTable td:nth-child(9),#idCashInflowTable th:nth-child(9)').hide();
			$('#idCashInflowTableModal td:nth-child(9),#idCashInflowTableModal th:nth-child(9)').hide();
		}
		if(flagLumpsum == 0) {
			$('#idCashInflowTable td:nth-child(10),#idCashInflowTable th:nth-child(10)').hide();
			$('#idCashInflowTableModal td:nth-child(10),#idCashInflowTableModal th:nth-child(10)').hide();
		}
		if(flagTotal == 0) {
			$('#idCashInflowTable td:nth-child(11),#idCashInflowTable th:nth-child(11)').hide();
			$('#idCashInflowTableModal td:nth-child(11),#idCashInflowTableModal th:nth-child(11)').hide();
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
var flagLiving = 0;
var flagDiscre = 0;
var flagInvestment = 0;
var flagLoan = 0;
var flagOtherCO = 0;


$.ajax({
	type: 'GET',
	url: REQUEST_URL_BM+'/getClientNetSurplusInfo?clientId='+vClientId+'&mode=yearly&fpFlag=1',
	async: false,  
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		
		$.each(data,
				function(index, value) {
			var futureEmi = 0.0;
			$.each(futureLoanMap,
					function(futureIndex, futureValue) {
				if(futureValue.YEAR===value.finYear)
				{
					futureEmi = futureValue.VAL;
				}
				//alert(allocationGoalValue.PMT);
			});
			//alert("futureEmi"+futureEmi);
			var loanOutflow = value.loan_outflows + futureEmi;
			var expense = value.livingExpense + value.discreExpense + loanOutflow + value.investment + value.otherCO ;
			//alert("expense" + expense);
			var flag = 0;
			for(var i=0;i<projYear.length;i++) {
				if(projYear[i] === value.finYear) {
					flag = 1;	
				} 
			}
			if(flag==0) {
				displayYear.push(value.finYear);
			}
			totalExp.push(parseInt(expense));
			$('#idCashOutflowTbody').append(
					'<tr><td>'+ value.age+ '</td><td>'+ 
					value.finYear + '</td><td>'+
					maskAmountValue(Math.round(parseFloat((value.livingExpense * 100)/100).toFixed(2)))+ '</td><td>'+
					maskAmountValue(Math.round(parseFloat((value.discreExpense * 100)/100).toFixed(2)))+ '</td><td>'+ 
					maskAmountValue(Math.round(parseFloat((loanOutflow * 100)/100).toFixed(2)))+ '</td><td>'+ 
					maskAmountValue(Math.round(parseFloat((value.investment * 100)/100).toFixed(2)))+ '</td><td>'+
					maskAmountValue(Math.round(parseFloat((value.otherCO * 100)/100).toFixed(2)))+ '</td><td>'+        
					maskAmountValue(Math.round(parseFloat((expense * 100)/100).toFixed(2)))+'</td></tr>');


			$('#idCashOutflowTbodyModal').append(
					'<tr><td>'+ value.age+ '</td><td>'+ 
					value.finYear + '</td><td>'+
					maskAmountValue(Math.round(parseFloat((value.livingExpense * 100)/100).toFixed(2)))+ '</td><td>'+
					maskAmountValue(Math.round(parseFloat((value.discreExpense * 100)/100).toFixed(2)))+ '</td><td>'+ 
					maskAmountValue(Math.round(parseFloat((loanOutflow * 100)/100).toFixed(2)))+ '</td><td>'+ 
					maskAmountValue(Math.round(parseFloat((value.investment * 100)/100).toFixed(2)))+ '</td><td>'+
					maskAmountValue(Math.round(parseFloat((value.otherCO * 100)/100).toFixed(2)))+ '</td><td>'+        
					maskAmountValue(Math.round(parseFloat((expense * 100)/100).toFixed(2)))+'</td></tr>');

			if (parseFloat((value.livingExpense * 100)/100).toFixed(2) != 0.00) {
				flagLiving = 1;
			}
			if (parseFloat((value.discreExpense * 100)/100).toFixed(2) != 0.00) {
				flagDiscre = 1;
			}
			if (parseFloat((value.loan_outflows * 100)/100).toFixed(2) != 0.00) {
				flagLoan = 1;
			}
			if (parseFloat((value.investment * 100)/100).toFixed(2) != 0.00) {
				flagInvestment = 1;
			}
			if (parseFloat((value.otherCO * 100)/100).toFixed(2) != 0.00) {
				flagOtherCO = 1;
			}

		});
		// hide all zero containing columns

		/*if(flagLiving == 0) {
			$('#idCashOutflowTbody td:nth-child(3),#idCashOutflowTbody th:nth-child(3)').hide();
			$('#idCashOutflowTbodyModal td:nth-child(3),#idCashOutflowTbodyModal th:nth-child(3)').hide();
		}
		if(flagDiscre == 0) {
			$('#idCashOutflowTbody td:nth-child(4),#idCashOutflowTbody th:nth-child(4)').hide();
			$('#idCashOutflowTbodyModal td:nth-child(4),#idCashOutflowTbodyModal th:nth-child(4)').hide();
		}
		if(flagLoan == 0) {
			$('#idCashOutflowTbody td:nth-child(5),#idCashOutflowTbody th:nth-child(5)').hide();
			$('#idCashOutflowTbodyModal td:nth-child(5),#idCashOutflowTbodyModal th:nth-child(5)').hide();
		}
		if(flagInvestment == 0) {
			$('#idCashOutflowTbody td:nth-child(6),#idCashOutflowTbody th:nth-child(6)').hide();
			$('#idCashOutflowTbodyModal td:nth-child(6),#idCashOutflowTbodyModal th:nth-child(6)').hide();
		}
		if(flagOtherCO == 0) {
			$('#idCashOutflowTbody td:nth-child(7),#idCashOutflowTbody th:nth-child(7)').hide();
			$('#idCashOutflowTbodyModal td:nth-child(7),#idCashOutflowTbodyModal th:nth-child(7)').hide();
		}*/
		loadCashflowCharts();
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
	url: REQUEST_URL_FP+'/getCashflowDetailed?clientId='+vClientId+'',
	async: false,  
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {
		$.each(data,function(index, value) {
			$("#idCashflowDetailed").append('<tr>' +
					'<td>'+ value.finYear+'</td>' +
					'<td>'+ value.age+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.totalIncome))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.totalExpense))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.totalContingencyFund))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.investibleSurpus))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.surplusAllocated))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.netFlow))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 : maskAmountValue(parseInt(value.investmentPortFolioDTO.openingBlnc)))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 :maskAmountValue(parseInt(value.investmentPortFolioDTO.additions)))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 :maskAmountValue(parseInt(value.investmentPortFolioDTO.returns)))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 :maskAmountValue(parseInt(value.investmentPortFolioDTO.goalPayout)))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 :maskAmountValue(parseInt(value.investmentPortFolioDTO.closingBlnc)))+'</td>' +
					'<td>'+ (value.goalNotEarMarkedDTO == null ? 0.0 :maskAmountValue(parseInt(value.goalNotEarMarkedDTO.openingBlnc))) + '</td>' +
					'<td>'+ (value.goalNotEarMarkedDTO == null ? 0.0 :maskAmountValue(parseInt(value.goalNotEarMarkedDTO.investibleSurplus))) + '</td>' +
					'<td>'+ (value.goalNotEarMarkedDTO == null ? 0.0 :maskAmountValue(parseInt(value.goalNotEarMarkedDTO.returnOnInvestment))) + '</td>' +
					'<td>'+ (value.goalNotEarMarkedDTO == null ? 0.0 :maskAmountValue(parseInt(value.goalNotEarMarkedDTO.closingBlnc))) + '</td>' +
			'</tr>')
			
			$("#idCashflowDetailedModal").append('<tr>' +
					'<td>'+ value.finYear+'</td>' +
					'<td>'+ value.age+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.totalIncome))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.totalExpense))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.totalContingencyFund))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.investibleSurpus))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.surplusAllocated))+'</td>' +
					'<td>'+ maskAmountValue(parseInt(value.netFlow))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 : maskAmountValue(parseInt(value.investmentPortFolioDTO.openingBlnc)))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 :maskAmountValue(parseInt(value.investmentPortFolioDTO.additions)))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 :maskAmountValue(parseInt(value.investmentPortFolioDTO.returns)))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 :maskAmountValue(parseInt(value.investmentPortFolioDTO.goalPayout)))+'</td>' +
					'<td>'+ (value.investmentPortFolioDTO == null ? 0.0 :maskAmountValue(parseInt(value.investmentPortFolioDTO.closingBlnc)))+'</td>' +
					'<td>'+ (value.goalNotEarMarkedDTO == null ? 0.0 :maskAmountValue(parseInt(value.goalNotEarMarkedDTO.openingBlnc))) + '</td>' +
					'<td>'+ (value.goalNotEarMarkedDTO == null ? 0.0 :maskAmountValue(parseInt(value.goalNotEarMarkedDTO.investibleSurplus))) + '</td>' +
					'<td>'+ (value.goalNotEarMarkedDTO == null ? 0.0 :maskAmountValue(parseInt(value.goalNotEarMarkedDTO.returnOnInvestment))) + '</td>' +
					'<td>'+ (value.goalNotEarMarkedDTO == null ? 0.0 :maskAmountValue(parseInt(value.goalNotEarMarkedDTO.closingBlnc))) + '</td>' +
			'</tr>')
			
			//alert("value.investmentPortFolioDTO" + value.investmentPortFolioDTO);
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


$('#small').click(function () {
	chart.setSize(400, 300);
});

$('#large').click(function () {
	chart.setSize(600, 300);
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

//Get the button that opens the modal
var btn = document.getElementById("idMaxcurrentaa");

//Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//When the user clicks the button, open the modal 
btn.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

var modal1 = document.getElementById("idpoprecommendedaa");

//Get the button that opens the modal
var btn1 = document.getElementById("idmaxrecommendedaa");

//Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

//When the user clicks the button, open the modal 
btn1.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal1.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span1.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal1.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal1) {
		modal1.style.display = "none";
	}
}



var modal2 = document.getElementById("idpopcurrentsubaa");

//Get the button that opens the modal
var btn2 = document.getElementById("idMaxcurrentsubaa");

//Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

//When the user clicks the button, open the modal 
btn2.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal2.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span2.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal2.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal2) {
		modal2.style.display = "none";
	}
}



var modal3 = document.getElementById("idpopinfosys");

//Get the button that opens the modal
var btn3 = document.getElementById("idMaxinfosys");

//Get the <span> element that closes the modal
var span3 = document.getElementsByClassName("close3")[0];

//When the user clicks the button, open the modal 
btn3.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal3.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span3.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal3.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal3) {
		modal3.style.display = "none";
	}
}


var modal4 = document.getElementById("idpopkotak");

//Get the button that opens the modal
var btn4 = document.getElementById("idMaxkotak");

//Get the <span> element that closes the modal
var span4 = document.getElementsByClassName("close4")[0];

//When the user clicks the button, open the modal 
btn4.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal4.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span4.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal4.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal4) {
		modal4.style.display = "none";
	}
}



var modal5 = document.getElementById("idpopinfosysonp");

//Get the button that opens the modal
var btn5 = document.getElementById("idMaxinfosysonp");

//Get the <span> element that closes the modal
var span5 = document.getElementsByClassName("close5")[0];

//When the user clicks the button, open the modal 
btn5.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal5.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span5.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal5.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal5) {
		modal5.style.display = "none";
	}
}



var modal6 = document.getElementById("idpopkotakpop");

//Get the button that opens the modal
var btn6 = document.getElementById("idMaxkotakonp");

//Get the <span> element that closes the modal
var span6 = document.getElementsByClassName("close6")[0];

//When the user clicks the button, open the modal 
btn6.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal6.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span6.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal6.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal6) {
		modal6.style.display = "none";
	}
}


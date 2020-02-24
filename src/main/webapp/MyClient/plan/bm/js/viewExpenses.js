var jssor_11_SlideshowTransitions = [
	{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}
	];

var jssor_11_options = {
		$AutoPlay: 1,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: jssor_11_SlideshowTransitions,
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

var jssor_11_slider = new $JssorSlider$("jssor_11", jssor_11_options);

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




var expensespavright = $('.jssort11 div:nth-child(2) div:nth-child(6) div');/*modify on 30th oct by nehad*/
var expensespavleft = $('.jssort11 div:nth-child(2) div:nth-child(2) div');

$(".Expensesright").click(function(){
	if(expensespavright.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/bm/viewCommitted.html");
		$("#idHeading").html("Committed Outflow");
		$(".committed").addClass("activeitem");
		$(".Expenses").removeClass("activeitem");

	};
});

$(".Expensesleft").click(function(){
	if(expensespavleft.hasClass('pav'))
	{	       
		$("#idBody").empty();
		$("#idBody").load("plan/bm/viewIncome.html");
		$("#idHeading").html("Income");
		$(".Income").addClass("activeitem");
		$(".Expenses").removeClass("activeitem");
	};
});


$(".assetOwner1_img").addClass('activeself');

$(".assetOwner1_img").hover(function(){

	$(".assetOwner1_img").addClass('hoverself');
},
function() {
	$(this).removeClass('hoverself');
})
.click(function() {
	$(this).toggleClass('activeself');
	$(".assetOwner2_img").removeClass('activeman');
	$(".assetOwner3_img").removeClass('activeboy');
	$(".assetOwner4_img").removeClass('activegirl');
	$(".assetOwner5_img").removeClass('activefather');
	$(".assetOwner6_img").removeClass('activemother');
	$(".assetOwner7_img").removeClass('activeother');
});
$(".assetOwner2_img").hover(function(){
	$(this).addClass('hoverman');
},
function() {
	$(this).removeClass('hoverman');
})
.click(function() {
	$(this).toggleClass('activeman');
	$(".assetOwner1_img").removeClass('activeself');
	$(".assetOwner3_img").removeClass('activeboy');
	$(".assetOwner4_img").removeClass('activegirl');
	$(".assetOwner5_img").removeClass('activefather');
	$(".assetOwner6_img").removeClass('activemother');
	$(".assetOwner7_img").removeClass('activeother');
});
$(".assetOwner3_img").hover(function(){
	$(this).addClass('hoverboy');
},
function() {
	$(this).removeClass('hoverboy');
})
.click(function() {
	$(this).toggleClass('activeboy');
	$(".assetOwner1_img").removeClass('activeself');
	$(".assetOwner2_img").removeClass('activeman');
	$(".assetOwner4_img").removeClass('activegirl');
	$(".assetOwner5_img").removeClass('activefather');
	$(".assetOwner6_img").removeClass('activemother');
	$(".assetOwner7_img").removeClass('activeother');
});
$(".assetOwner4_img").hover(function(){
	$(this).addClass('hovergirl');
},
function() {
	$(this).removeClass('hovergirl');
})
.click(function() {
	$(this).toggleClass('activegirl');
	$(".assetOwner1_img").removeClass('activeself');
	$(".assetOwner3_img").removeClass('activeboy');
	$(".assetOwner2_img").removeClass('activeman');
	$(".assetOwner5_img").removeClass('activefather');
	$(".assetOwner6_img").removeClass('activemother');
	$(".assetOwner7_img").removeClass('activeother');
});
$(".assetOwner5_img").hover(function(){
	$(this).addClass('hoverfather');
},
function() {
	$(this).removeClass('hoverfather');
})
.click(function() {
	$(this).toggleClass('activefather');
	$(".assetOwner1_img").removeClass('activeself');
	$(".assetOwner3_img").removeClass('activeboy');
	$(".assetOwner4_img").removeClass('activegirl');
	$(".assetOwner2_img").removeClass('activeman');
	$(".assetOwner6_img").removeClass('activemother');
	$(".assetOwner7_img").removeClass('activeother');
});
$(".assetOwner6_img").hover(function(){
	$(this).addClass('hovermother');
},
function() {
	$(this).removeClass('hovermother');
})
.click(function() {
	$(this).toggleClass('activemother');
	$(".assetOwner1_img").removeClass('activeself');
	$(".assetOwner3_img").removeClass('activeboy');
	$(".assetOwner4_img").removeClass('activegirl');
	$(".assetOwner5_img").removeClass('activefather');
	$(".assetOwner2_img").removeClass('activeman');
	$(".assetOwner7_img").removeClass('activeother');
});
$(".assetOwner7_img").hover(function(){
	$(this).addClass('hoverother');
},
function() {
	$(this).removeClass('hoverother');
})
.click(function() {
	$(this).toggleClass('activeother');
	$(".assetOwner1_img").removeClass('activeself');
	$(".assetOwner3_img").removeClass('activeboy');
	$(".assetOwner4_img").removeClass('activegirl');
	$(".assetOwner5_img").removeClass('activefather');
	$(".assetOwner6_img").removeClass('activemother');
	$(".assetOwner2_img").removeClass('activeman');
});

var modal = document.getElementById('idPopExpense');

//Get the button that opens the modal
var btn = document.getElementById("idMaxExpenses");

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
/*expenses details tbl*/
var modal1 = document.getElementById('idPopExpensedetails');

//Get the button that opens the modal
var btn1 = document.getElementById("idMaxExpensesdetails");

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

/***********************************UI Integration *************************************/

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
		var fileName = "Expense_"+ mode + "_report.xlsx";

		var xhr = new XMLHttpRequest();
		//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
		xhr.open( "GET", REQUEST_URL_BM+'/downloadExpense?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
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

$("#idDownloadDetail").click(function(){
	var mode;
	var errorFlag = 0;
	if($('#idMonthlyRadioDetail').prop("checked")) {
		mode = "monthly";
	} else if ($('#idYearlyRadioDetail').prop("checked")){
		mode = "yearly";
	} else {
		errorFlag = 1;
		alert("Please select a valid option");
	}
	if (errorFlag == 0) {
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		var fileName = "Expense_"+ mode + "_report.xlsx";

		var xhr = new XMLHttpRequest();
		//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
		xhr.open( "GET", REQUEST_URL_BM+'/downloadExpenseDetailed?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
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
		var fileName = "Expense_"+ mode + "_report.xlsx";

		var xhr = new XMLHttpRequest();
		//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
		xhr.open( "GET", REQUEST_URL_BM+'/downloadExpense?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
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

$("#idDownloadDetailModal").click(function(){
	var mode;
	var errorFlag = 0;
	if($('#idMonthlyRadioDetailModal').prop("checked")) {
		mode = "monthly";
	} else if ($('#idYearlyRadioDetailModal').prop("checked")){
		mode = "yearly";
	} else {
		errorFlag = 1;
		alert("Please select a valid option");
	}
	if (errorFlag == 0) {
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		var fileName = "Expense_"+ mode + "_report.xlsx";

		var xhr = new XMLHttpRequest();
		//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
		xhr.open( "GET", REQUEST_URL_BM+'/downloadExpenseDetailed?clientId='+vClientId+'&mode='+mode+'&fpFlag=0', true);
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

var LivingExpenses_per_val;
var DiscretionaryExpenses_per_val;
var TotalExpenses_per_val;

var finYear;
var categories_expenses= [];
var living_expenses=[];
var discretionary_expenses=[];
var errorFlag = 0;


function loadCharts() {
	Highcharts.chart('idCurrentExpenses', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
            // spacingRight: 150
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
			}, {
				name: 'Household & Personal Care',
				y: HouseholdAndPersonalCare_per_val_perc,
				color:'#8085d9'
			}, {
				name: 'Housing & Maintenance',
				y:HousingAndMaintenance_per_val_perc,
				color:'#f15c80'
			}, {
				name: 'Communication',
				y: Communication_per_val_perc,
				color:'#727276'

			},
			{
				name: 'Children Fees',
				y: ChildrenFees_per_val_perc,
				color:'#5adedc'

			},

			{
				name: 'Healthcare Expenses',
				y:HealthcareExpenses_per_val_perc,
				color:'#9164aa'

			},
			{
				name: 'Lifestyle & Entertainment',
				y: LifestyleAndEntertainment_per_val_perc,
				color:'#cdaa5f'

			},
			{
				name: 'Apparels & Accessories',
				y: ApparelsAndAccessories_per_val_perc,
				color:'#558769'

			},

			{
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

	Highcharts.chart('idBarGraph', {
		chart: {
			type: 'column',
			width: 800
		},
		title: {
			text: '<p style="color:white;font-weight: bold;">Expected Income Projections</p>'
		},
		xAxis: {
			categories: categories_expenses
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
			verticalAlign: 'top',
			y: -10,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
			borderColor: '#CCC',
			borderWidth: 1,
			shadow: false,

		},
		tooltip: {
			headerFormat: '<b>{point.x}</b><br/>',
			pointFormat: '{series.name}: {point.y}<br/>Total Expenses: {point.stackTotal}'
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
			name: 'Living Expenses',
			data: living_expenses,
			color:"#6ba0ce"
		},  {
			name: 'Discretionary Expenses',
			data: discretionary_expenses,
			color:"#337ab7"
		}]
	});

	Highcharts.chart('idexpensesummary', {

		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
            // spacingRight: 100
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
			name: 'Annual Expense',
			colorByPoint: true,
			innerSize: '30%',
			data: [{
				name: 'Living Expenses',
				y: livingPer,
				color:'#95ceff'
			},


			{
				name: 'Discretionary Expenses',
				y: discrePer,
				color:'#f7a35c'
			}


			]
		}]
	});
}

var livingPer = 0;
var discrePer = 0;
var flagRow = 0;
var lastFinYearToBeDisplayed="";
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
		//alert(data);
		//var wholeData = jQuery.parseJSON(data);
//		alert("Hi")
		$("#id_Groceries_amt").text(maskAmountValue(Math.round(data.groceries_amt)));
		if(parseFloat((data.groceries_amt * 100)/100).toFixed(2) == 0.00) {
			$("#idCurrentExpenseTable tbody tr.classGroceries").hide();
		}

		$("#id_Groceries_tp").text((parseFloat
				((data.groceries_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		Groceries_per_val_perc = (data.groceries_amt / data.totalExpense) * 100


		$("#id_Utilities_amt").text(maskAmountValue(Math.round(data.utilities_amt)));
		if(data.utilities_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classUtilities").hide();
		}

		$("#id_Utilities_tp").text((parseFloat
				((data.utilities_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		Utilities_per_val_perc = (data.utilities_amt / data.totalExpense) * 100;

		$("#id_Transport_amt").text(maskAmountValue(Math.round(data.transport_amt)));
		if(data.transport_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classTransport").hide();
		}
		$("#id_Transport_tp").text((parseFloat
				((data.transport_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		Transport_per_val_perc = (data.transport_amt / data.totalExpense) * 100;


		$("#id_HouseholdAndPersonalCare_amt").text(maskAmountValue(Math.round(data.houseHoldPersonal_amt)));
		if(data.houseHoldPersonal_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classHPC").hide();
		}
		$("#id_HouseholdAndPersonalCare_tp").text((parseFloat
				((data.houseHoldPersonal_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		HouseholdAndPersonalCare_per_val_perc = (data.houseHoldPersonal_amt / data.totalExpense) * 100;


		$("#id_HousingAndMaintenance_amt").text(maskAmountValue(Math.round(data.housing_amt)));
		if(data.housing_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classHM").hide();
		}
		$("#id_HousingAndMaintenance_tp").text((parseFloat
				((data.housing_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		HousingAndMaintenance_per_val_perc = (data.housing_amt / data.totalExpense) * 100;

		$("#id_Communication_amt").text(maskAmountValue(Math.round(data.communication_amt)));
		if(data.communication_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classCommunication").hide();
		}
		$("#id_Communication_tp").text((parseFloat
				((data.communication_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		Communication_per_val_perc = (data.communication_amt / data.totalExpense) * 100;

		$("#id_ChildrenFees_amt").text(maskAmountValue(Math.round(data.childrenFees_amt)));
		if(data.childrenFees_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classChildrenFee").hide();
		}
		$("#id_ChildrenFees_tp").text((parseFloat
				((data.childrenFees_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		ChildrenFees_per_val_perc = (data.childrenFees_amt / data.totalExpense) * 100;

		$("#id_HealthcareExpenses_amt").text(maskAmountValue(Math.round(data.healthCare_amt)));
		if(data.healthCare_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classHCE").hide();
		}
		$("#id_HealthcareExpenses_tp").text((parseFloat
				((data.healthCare_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		HealthcareExpenses_per_val_perc = (data.healthCare_amt / data.totalExpense) * 100;

		$("#id_LifestyleAndEntertainment_amt").text(maskAmountValue(Math.round(data.lifeStyle_amt)));
		if(data.lifeStyle_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classLE").hide();
		}
		$("#id_LifestyleAndEntertainment_tp").text((parseFloat
				((data.lifeStyle_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		LifestyleAndEntertainment_per_val_perc = (data.lifeStyle_amt / data.totalExpense) * 100;

		$("#id_ApparelsAndAccessories_amt").text(maskAmountValue(Math.round(data.apparels_amt)));
		if(data.apparels_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classAA").hide();
		}
		$("#id_ApparelsAndAccessories_tp").text((parseFloat
				((data.apparels_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		ApparelsAndAccessories_per_val_perc = (data.apparels_amt / data.totalExpense) * 100;

		$("#id_OthersCharityEtc_amt").text(maskAmountValue(Math.round(data.others_amt)));
		if(data.others_amt == 0) {
			$("#idCurrentExpenseTable tbody tr.classOthers").hide();
		}
		$("#id_OthersCharityEtc_tp").text((parseFloat
				((data.others_amt / data.totalExpense) * 100).toFixed(2)) + "%");
		OthersCharityEtc_per_val_perc = (data.others_amt / data.totalExpense) * 100;

		$("#idIndTotal").text(maskAmountValue(Math.round(data.totalFamilyExpense)));
		if(data.totalFamilyExpense  == 0) {
			$("#idCurrentExpenseTable tbody tr.classLiving").hide();
		}
		$("#id_IndTotal_tp").text((parseFloat
				((data.totalFamilyExpense / data.totalExpense) * 100).toFixed(2)) + "%");
		livingExpensesTotalPerc = (data.totalFamilyExpense / data.totalExpense) * 100;


		$("#id_TotalExpenses_amt").text(maskAmountValue(Math.round(data.totalExpense)));
		$("#id_TotalExpenses_tp").text((parseFloat
				((data.totalExpense / data.totalExpense) * 100).toFixed(2)) + "%");

		$("#idExpenseTotal").text(maskAmountValue(Math.round(data.totalExpense)));
		$("#idExpenseTotalPerc").text((parseFloat
				((data.totalExpense / data.totalExpense) * 100).toFixed(2)) + "%");


		$("#idExpenseLiving").text(maskAmountValue(Math.round(data.livingExpense)));
		if(data.livingExpense  == 0) {
			$("#idExpenseSumm tbody tr.trClassLiving").hide();
		}
		$("#idExpenseDiscretionary").text(maskAmountValue(Math.round(data.discretionaryExpense)));

		if(data.discretionaryExpense  == 0) {
			$("#idExpenseSumm tbody tr.trClassDiscre").hide();
		}
		$("#idExpenseLivingPerc").text((parseFloat
				((data.livingExpense / data.totalExpense) * 100).toFixed(2)) + "%");
		livingPer = (data.livingExpense / data.totalExpense) * 100;
		$("#idExpenseDiscretionaryPerc").text((parseFloat
				((data.discretionaryExpense / data.totalExpense) * 100).toFixed(2)) + "%");
		discrePer = (data.discretionaryExpense / data.totalExpense) * 100;

		$.each(data.expenseProjectionList, function(key, item) 
				{

			// for hiding all Zero containing rows
			if(item.groceries_amt == 0 && item.utilities_amt == 0 && item.transport_amt == 0 &&
					item.houseHoldPersonal_amt == 0 && item.housing_amt == 0 && item.communication_amt == 0 && item.childrenFees_amt == 0 && 
					item.healthCare_amt == 0 && item.lifeStyle_amt == 0 && item.apparels_amt && 
					item.others_amt && item.totalFamilyExpense) {
				flagRow = 1;
			} else {
				flagRow = 0;
				if(data.expenseProjectionList[key + 1] != null) {
					lastFinYearToBeDisplayed = data.expenseProjectionList[key + 1].finYear;
				}
			}

			});
		$.each(data.expenseProjectionList,
				function(rowIndex, item) {
			if(flagRow == 1 && item.year == lastFinYearToBeDisplayed){
				 return false; 
			} else {
				

				categories_expenses.push(item.finYear);
				living_expenses.push(item.livingExpense);
				discretionary_expenses.push(item.discretionaryExpense);
				$('#idExpenseProjection').append(
						'<tr><td>'+ item.finYear + '</td><td>'+ 
						maskAmountValue(Math.round(item.livingExpense))+ '</td><td>'+
						maskAmountValue(Math.round(item.discretionaryExpense))+ '</td><td>'+ 
						maskAmountValue(Math.round(item.totalExpense))+'</td></tr>');
				$('#idExpenseProjectionModal').append(
						'<tr><td>'+ item.finYear + '</td><td>'+ 
						maskAmountValue(Math.round(item.livingExpense))+ '</td><td>'+
						maskAmountValue(Math.round(item.discretionaryExpense))+ '</td><td>'+ 
						maskAmountValue(Math.round(item.totalExpense))+'</td></tr>');

				$('#idExpenseProjectionDetail').append(
						'<tr><td>'+ item.finYear + '</td><td>'+ 
						maskAmountValue(Math.round(item.groceries_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.utilities_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.transport_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.houseHoldPersonal_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.housing_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.communication_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.lifeStyle_amt ))+ '</td><td>'+
						maskAmountValue(Math.round(item.apparels_amt ))+ '</td><td>'+
						maskAmountValue(Math.round(item.childrenFees_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.healthCare_amt ))+ '</td><td>'+
						maskAmountValue(Math.round(item.others_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.totalFamilyExpense))+ '</td><td>'+
						maskAmountValue(Math.round(item.totalExpense ))+ '</td></tr>');

				$('#idExpenseProjectionDetailModal').append(
						'<tr><td>'+ item.finYear + '</td><td>'+ 
						maskAmountValue(Math.round(item.groceries_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.utilities_amt ))+ '</td><td>'+
						maskAmountValue(Math.round(item.transport_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.houseHoldPersonal_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.housing_amt ))+ '</td><td>'+
						maskAmountValue(Math.round(item.communication_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.lifeStyle_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.apparels_amt ))+ '</td><td>'+
						maskAmountValue(Math.round(item.childrenFees_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.healthCare_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.others_amt))+ '</td><td>'+
						maskAmountValue(Math.round(item.totalFamilyExpense))+ '</td><td>'+
						maskAmountValue(Math.round(item.totalExpense))+ '</td></tr>');
			
			}
		});

		// hide all zero containing columns of summarized expense table
		if(parseFloat(data.expenseProjectionList[0].livingExpense).toFixed(2) == 0.00) {
			$('#idExpenseTable td:nth-child(2),#idExpenseTable th:nth-child(2)').hide();
			$('#idExpenseTableModal td:nth-child(2),#idExpenseTableModal th:nth-child(2)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].discretionaryExpense).toFixed(2) == 0.00) {
			$('#idExpenseTable td:nth-child(3),#idExpenseTable th:nth-child(3)').hide();
			$('#idExpenseTableModal td:nth-child(3),#idExpenseTableModal th:nth-child(3)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].totalExpense).toFixed(2) == 0.00) {
			$('#idExpenseTable td:nth-child(4),#idExpenseTable th:nth-child(4)').hide();
			$('#idExpenseTableModal td:nth-child(4),#idExpenseTableModal th:nth-child(4)').hide();
		}

		// hide all zero containing columns of detailed expense table
		if(parseFloat(data.expenseProjectionList[0].groceries_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(2),#idExpenseDetailTable th:nth-child(2)').hide();
			$('#idExpenseDetailTableModal td:nth-child(2),#idExpenseDetailTableModal th:nth-child(2)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].utilities_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(3),#idExpenseDetailTable th:nth-child(3)').hide();
			$('#idExpenseDetailTableModal td:nth-child(3),#idExpenseDetailTableModal th:nth-child(3)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].transport_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(4),#idExpenseDetailTable th:nth-child(4)').hide();
			$('#idExpenseDetailTableModal td:nth-child(4),#idExpenseDetailTableModal th:nth-child(4)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].houseHoldPersonal_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(5),#idExpenseDetailTable th:nth-child(5)').hide();
			$('#idExpenseDetailTableModal td:nth-child(5),#idExpenseDetailTableModal th:nth-child(5)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].housing_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(6),#idExpenseDetailTable th:nth-child(6)').hide();
			$('#idExpenseDetailTableModal td:nth-child(6),#idExpenseDetailTableModal th:nth-child(6)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].communication_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(7),#idExpenseDetailTable th:nth-child(7)').hide();
			$('#idExpenseDetailTableModal td:nth-child(7),#idExpenseDetailTableModal th:nth-child(7)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].lifeStyle_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(8),#idExpenseDetailTable th:nth-child(8)').hide();
			$('#idExpenseDetailTableModal td:nth-child(8),#idExpenseDetailTableModal th:nth-child(8)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].apparels_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(9),#idExpenseDetailTable th:nth-child(9)').hide();
			$('#idExpenseDetailTableModal td:nth-child(9),#idExpenseDetailTableModal th:nth-child(9)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].childrenFees_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(10),#idExpenseDetailTable th:nth-child(10)').hide();
			$('#idExpenseDetailTableModal td:nth-child(10),#idExpenseDetailTableModal th:nth-child(10)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].healthCare_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(11),#idExpenseDetailTable th:nth-child(11)').hide();
			$('#idExpenseDetailTableModal td:nth-child(11),#idExpenseDetailTableModal th:nth-child(11)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].others_amt).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(12),#idExpenseDetailTable th:nth-child(12)').hide();
			$('#idExpenseDetailTableModal td:nth-child(12),#idExpenseDetailTableModal th:nth-child(12)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].totalFamilyExpense).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(13),#idExpenseDetailTable th:nth-child(13)').hide();
			$('#idExpenseDetailTableModal td:nth-child(13),#idExpenseDetailTableModal th:nth-child(13)').hide();
		}
		if(parseFloat(data.expenseProjectionList[0].totalExpense).toFixed(2) == 0.00) {
			$('#idExpenseDetailTable td:nth-child(14),#idExpenseDetailTable th:nth-child(14)').hide();
			$('#idExpenseDetailTableModal td:nth-child(14),#idExpenseDetailTableModal th:nth-child(14)').hide();
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
		errorFlag = 1;
		bootbox.alert("Error in Loading Expense");
//		alert("error from Expense : getAnnualExpensesDetailed");
	}
});
//alert(errorFlag);
if (errorFlag == 1) {

	$("#id_Groceries_amt").text("0.00");
	$("#id_Groceries_tp").text("0.00%");


	$("#id_Utilities_amt").text("0.00");
	$("#id_Utilities_tp").text("0.00%");

	$("#id_Transport_amt").text("0.00");
	$("#id_Transport_tp").text("0.00%");


	$("#id_HouseholdAndPersonalCare_amt").text("0.00");
	$("#id_HouseholdAndPersonalCare_tp").text("0.00%");


	$("#id_HousingAndMaintenance_amt").text("0.00");
	$("#id_HousingAndMaintenance_tp").text("0.00%");

	$("#id_Communication_amt").text("0.00");
	$("#id_Communication_tp").text("0.00%");

	$("#id_ChildrenFees_amt").text("0.00");
	$("#id_ChildrenFees_tp").text("0.00%");

	$("#id_HealthcareExpenses_amt").text("0.00");
	$("#id_HealthcareExpenses_tp").text("0.00%");

	$("#id_LifestyleAndEntertainment_amt").text("0.00");
	$("#id_LifestyleAndEntertainment_tp").text("0.00%");

	$("#id_ApparelsAndAccessories_amt").text("0.00");
	$("#id_ApparelsAndAccessories_tp").text("0.00%");

	$("#id_OthersCharityEtc_amt").text("0.00");
	$("#id_OthersCharityEtc_tp").text("0.00%");

	$("#id_LivingExpenses_amt").text("0.00");
	$("#id_LivingExpenses_tp").text("0.00%");

	$("#id_DiscretionaryExpenses_amt").text("0.00");
	$("#id_DiscretionaryExpenses_tp").text("0.00%");

	$("#id_TotalExpenses_amt").text("0.00");
	$("#id_TotalExpenses_tp").text("0.00%");

	$("#id_TotalExpenses_amt").text("0.00");
	$("#id_TotalExpenses_tp").text("0.00%");

	$("#id_TotalExpenses_summ_amt").text("0.00");
	$("#id_TotalExpenses_summ_tp").text("0.00%");
}

$.ajax({
	type: 'GET',
	async:false,
	url: REQUEST_URL_BM+'/getExpenseDetailOfFamilyMember?memberId='+vClientId,
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {

		$('#idKeyAssumption').empty();
		$.each(data,function(index, value) {
			$("#idKeyAssumption").append('<tr>' +
					'<td>'+ value.incomeCategory+'</td>' +
					'<td><input type="text" readonly value="'+maskAmountValue(Math.round(value.income))+'" class="form-control"/></td>'+
					'<td><input type="text" readonly value="'+value.frequency+'" class="form-control"/></td>'+
					'<td><input type="text" readonly value="'+value.referenceMonth+'" class="form-control"/></td>'+
					'<td><input type="text" readonly value="'+value.continueUpto+'" class="form-control"/></td>'+
					'<td><input type="text" readonly value="'+(value.annualIncomeGrowthRate * 100)+'" class="form-control"/></td>'+
			'</tr>');
		});	
	},
	error: function (data) {
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
	url: REQUEST_URL_BM+'/getMasterExpenseIndustryStandard',
	dataType: 'json',
	beforeSend: function (xhr){ 
		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    },
	success: function (data) {

		$.each(data,function(index, value) {

			if (value.id == 1) {
				$("#idInGroceries").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 2) {
				$("#idInUtilities").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 3) {
				$("#idInTransport").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 4) {
				$("#idInHPC").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 5) {
				$("#idInHM").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 6) {
				$("#idInCommunication").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 7) {
				$("#idInChildren").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 8) {
				$("#idInHCE").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 9) {
				$("#idInLE").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 10) {
				$("#idInAA").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 11) {
				$("#idInOthers").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 12) {
				$("#idInIndTotal").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}

			if (value.id == 13) {
				$("#idExpenseLivingStandardPerc").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}
			if (value.id == 14) {
				$("#idExpenseDiscretionaryStandardPerc").text(parseFloat((value.perc * 100)/100).toFixed(2) + "%");
			}


		});

	},
	error: function (jqXHR, data) {
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


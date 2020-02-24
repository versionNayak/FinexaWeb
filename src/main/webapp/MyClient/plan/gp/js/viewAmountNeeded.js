var categories = [];
var worstcase = [];
var bestcase = [];
var mostLikely = [];
jQuery(document).ready(function ($) {
	
	var amount_needed_data = { 
			"lumpsumInvestmentToday" : 0.00, 
			"sipInvestmentRequiredToday" : 0.00, 
			"selectedOption" : "idSIPRadio",	
			"lumpsumVal" : 0.00,
			"sipVal" : 0.00,
			"amountMode": 2
		 };
	
	saveInpInLocalStoarage(amount_needed_data);//GP don't delete
	
	var local_data = JSON.parse(sessionStorage.getItem("AmmounNeededInpData"));
	
	//var local_data = JSON.parse(sessionStorage.getItem("AmmounNeededInpData"));
	
	/*if(local_data === null && typeof variable != "object"){
		saveInpInLocalStoarage(amount_needed_data);
	}*/
	
	
	$('#idLumpsumInput').blur(function(){	
		amount_needed_data = JSON.parse(sessionStorage.getItem("AmmounNeededInpData"));
		amount_needed_data.lumpsumInvestmentToday = ($('#idLumpsumInput').val() != '')? unmaskAmountValue($('#idLumpsumInput').val()) : 0.00;
		amount_needed_data.sipInvestmentRequiredToday = ($('#idSIPForLumpsum').val() != '')? unmaskAmountValue($('#idSIPForLumpsum').val()) : 0.00;
		saveInpInLocalStoarage(amount_needed_data);//GP don't delete
	});
	
	function saveInpInLocalStoarage(aj_data){ //GP don't delete
		sessionStorage.setItem("AmmounNeededInpData", JSON.stringify(aj_data));
	}

//	document.getElementbyID("idSIPForLumpsum").value="1";
	var lumpsumVal;
	var sipVal;
	var lumpsumSipval;

	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getGoalLumpsumSIPValue?clientId='+vClientId+
		'&goalId='+goalId+'&glideNonglideMode='+vglideNonglideMode,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			lumpsumVal = data.lumpsumAmt;
//			alert(lumpsumVal);
			$("#idLumpsumInvestmentToday").text(maskAmountValue(lumpsumVal));

			sipVal = data.sipAmt;
			$("#idSipInvestmentToday").text(maskAmountValue(sipVal));
			amount_needed_data = JSON.parse(sessionStorage.getItem("AmmounNeededInpData"));	
			
			amount_needed_data.lumpsumVal = (lumpsumVal != '')? lumpsumVal : 0.00;			
			amount_needed_data.sipVal = (sipVal != '')? sipVal : 0.00;
			saveInpInLocalStoarage(amount_needed_data);//GP don't delete
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
		 alert("error");
		}
	});
	loadRadio();
	
	/*$('#idLumpSIPRadio').change(function(){
		updateSIPLumpsum();
	});*/
	function loadRadio() {
		//alert("selectedMode "+selectedMode);
		if (selectedMode == 1) {
			$("#idLumpRadio").prop("checked",true);
//			$("#idSIPForLumpsum").text("");
		} else if (selectedMode == 2) {
			$("#idSIPRadio").prop("checked",true);
//			$("#idSIPForLumpsum").text("");
		} else if (selectedMode == 3) {
			$("#idLumpSIPRadio").prop("checked",true);
			document.getElementById("idLumpsumInput").value = maskAmountValue(lumpsumForSIP);
		}
		//alert("2222222");
		callLumpsumSipAjax();
	}
	$("#idLumpsumInput").click(function(){
		$("#idLumpSIPRadio").prop("checked",false);
	});
//	alert(selectedMode);
	$("input[name=options]:radio").change(function () {
		amount_needed_data = JSON.parse(sessionStorage.getItem("AmmounNeededInpData"));
		if($('#idLumpRadio').is(':checked')) {
			selectedMode = 1;
			//amount_needed_data.selectedOption = "idLumpRadio";
			updateSIPLumpsum();
			loadRadio();
//			$("#idSIPForLumpsum").text("");
//			document.getElementById("idLumpsumInput").value = "";
//			$('#isSIPComboLabel').hide();
//			alert("Select mode changed LumpRadio Checked" + selectedMode);
		} else if ($('#idSIPRadio').is(':checked')) {
//			$("#idSIPForLumpsum").text("");
//			document.getElementById("idLumpsumInput").value = "";
//			$('#isSIPComboLabel').hide();
			selectedMode = 2;
			//amount_needed_data.selectedOption = "idSIPRadio";
			updateSIPLumpsum();
			loadRadio();
//			alert("Select mode changed idSIPRadio" + selectedMode);

		} else if ($('#idLumpSIPRadio').is(':checked')) {
			lumpsumSipval = unmaskAmountValue($('#idLumpsumInput').val());
//			alert(lumpsumSipval.value);
			if(lumpsumSipval.value == "") {
				bootbox.alert("Please enter value to proceed for this option");
				$("#idLumpSIPRadio").prop("checked",false);
				//loadRadio();
			} else {
				if(!isNumericDecimal(lumpsumSipval)) {
					bootbox.alert("Please enter value to proceed for this option");
					$("#idLumpSIPRadio").prop("checked",false);
					//loadRadio();
				} else if (lumpsumSipval<=0) {
					bootbox.alert("Lumpsum value must be greater than 0");
					$("#idLumpSIPRadio").prop("checked",false);
					//loadRadio();
				} else if (lumpsumSipval > lumpsumVal) {
					bootbox.alert("Lumpsum Value cannot be more than calculated Lumpsum");
					$("#idLumpSIPRadio").prop("checked",false);
					//loadRadio();
				}
				else {
					lumpsumForSIP = parseInt(lumpsumSipval);
//					alert("global value lumpsumForSIP set" + lumpsumForSIP);
					selectedMode = 3;
					//amount_needed_data.selectedOption = "idLumpSIPRadio";
					loadRadio();
//					alert("Select mode changed idLumpSIPRadio" + selectedMode);
				}

			}

		}
		//saveInpInLocalStoarage(amount_needed_data);//GP Don't delete
		//alert("1111111111111");
		//callLumpsumSipAjax();
	});

	function callLumpsumSipAjax () {
		
		amount_needed_data = JSON.parse(sessionStorage.getItem("AmmounNeededInpData"));
		categories = [];
		worstcase = [];
		bestcase = [];
		mostLikely = [];
		$.ajax({
			type: 'GET',
			/*url: REQUEST_URL_GP + '/getAmountNeededDetailsForParticularMode?clientId='+vClientId+
			'&goalId='+goalId+'&mode='+selectedMode+'&lumpsumValue='+lumpsumForSIP+
			'&glideNonglideMode='+vglideNonglideMode,*/
			url: REQUEST_URL_GP + '/getAmountNeededForParticularMode?clientId='+vClientId+
			'&goalId='+goalId+'&mode='+selectedMode+'&lumpsumValue='+lumpsumForSIP+
			'&glideNonglideMode='+vglideNonglideMode,
			async: false,
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function (data) {
				if (selectedMode == 3) {
//					$('#isSIPComboLabel').show();
					$("#idSIPForLumpsum").val(""+maskAmountValue(parseInt(data.sipAmtCombo)));
					amount_needed_data.sipInvestmentRequiredToday = ($('#idSIPForLumpsum').val() != '')? unmaskAmountValue($('#idSIPForLumpsum').val()) : 0.00;
					amount_needed_data.lumpsumInvestmentToday = ($('#idLumpsumInput').val() != '')? unmaskAmountValue($('#idLumpsumInput').val()) : 0.00;
					amount_needed_data.selectedOption = "idLumpSIPRadio";
					amount_needed_data.amountMode = selectedMode;
					saveInpInLocalStoarage(amount_needed_data);//GP don't delete
				}if (selectedMode == 2) {
					amount_needed_data.selectedOption = "idSIPRadio";
					amount_needed_data.amountMode = selectedMode;
					saveInpInLocalStoarage(amount_needed_data);//GP don't delete
					
				}
                if (selectedMode == 1) {
                	amount_needed_data.selectedOption = "idLumpRadio";
                	amount_needed_data.amountMode = selectedMode;
                	saveInpInLocalStoarage(amount_needed_data);//GP don't delete
                	
				}
				$.each(data.fundedCorpusList,function(index, value) {
					categories.push(value.timeMonthYear);
					worstcase.push(parseInt(value.corpusWC));
					bestcase.push(parseInt(value.corpusBC));
					mostLikely.push(parseInt(value.corpusML))
				});
//				alert("categories" + categories.length);
				loadChart();

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
	}

	var jssor_4_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_4_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_4_SlideshowTransitions,
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


	var jssor_4_slider = new $JssorSlider$("jssor_4", jssor_4_options);

	var amtpavdiv = $('.jssort04 div:nth-child(2) div:nth-child(3) div');
	var amtleftdiv = $('.jssort04 div:nth-child(2) div:nth-child(2) div');
	$(".amountneedright").click(function(){
		if(amtpavdiv.hasClass('pav'))
		{	       
			$(".idBody").empty();
			$(".idBody").load("plan/gp/viewProductRecommend.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");
			$(".glidnonglid").hide();
			$(".idHeading").html("Product Recommendation");
			$(".amount").removeClass("activeitem");
			$(".product").addClass("activeitem");
		};
		if(amtleftdiv.hasClass('pav')) {
			loadChart();
		}
		
	});

	$(".amountneedleft").click(function(){
		if(amtleftdiv.hasClass('pav'))
		{	       

			$(".idBody").empty();
			if (vglideNonglideMode == "G") {
				$(".idBody").load("plan/gp/showGlidePath.html");
			} else {
				$(".idBody").load("plan/gp/showNonGlidePath.html");
			}
			$(".form-section-container").css("padding","18px 45px 135px 45px");
			$(".glidnonglid").show();
			$(".idHeading").html("Recommended Asset Allocation");
			$(".amount").removeClass("activeitem");
			$(".recommended").addClass("activeitem");
		};
	});

	/*	Highcharts.chart('idAmountneedGraph', {

		title: { 
			text: '<b>Goal Corpus Accumulation</b>'
		},

		xAxis: {
			categories: ['Apr-16','Jun-16','Aug-16','Oct-16','Dec-16','Feb-17','Apr-17','Jun-17','Aug-17','Oct-17','Dec-17','Feb-18','Apr-18','Jun-18','Aug-18','Oct-18','Dec-18','Feb-19','Apr-19','Jun-19','Aug-19','Oct-19','Dec-19','Feb-20','Apr-20','Jun-20','Aug-20','Oct-20','Dec-20','Feb-21','Apr-21','Jun-21','Aug-21','Oct-21','Dec-21','Feb-22','Apr-22','Jun-22','Aug-22','Oct-22','Dec-22','Feb-23','Apr-23','Jun-23','Aug-23','Oct-23','Dec-23','Feb-24','Apr-24','Jun-24','Aug-24','Oct-24','Dec-24','Feb-25']
		},



		tooltip: {
			headerFormat: '<b>{series.name}</b><br />',

		},

		series: [{
			name:"Funded Corpus(most Likely)",
			color:'#3a3a4f',
			data:[500000,510000,520000,530000,540000,550000,560000,570000,580000,590000,600000,610000,620000,630000,640000,650000,660000,670000,680000,690000,700000,710000,720000,730000,740000,750000,760000,770000,780000,790000,800000,810000,820000,830000,840000,850000,860000,870000,880000,890000,900000,910000,920000,930000,940000,950000,960000,970000,980000,990000,1000000,1010000,1020000,1030000]

		},{
			name:"Funded Corpus(worst Case)",
			color:'#f7a35c',
			data:[700000,710000,720000,730000,740000,750000,760000,770000,780000,790000,800000,810000,820000,830000,840000,850000,860000,870000,880000,890000,900000,910000,920000,930000,940000,950000,960000,970000,980000,990000,1000000,1010000,1020000,1030000,1040000,1050000,1060000,1070000,1080000,1090000,1100000,1110000,1120000,1130000,1140000,1150000,1160000,1170000,1180000,1190000,1200000,1210000,1220000,1230000]

		},{
			name:"Funded Corpus(best Case)",
			color:'#95ceff',
			data:[600000,610000,620000,630000,640000,650000,660000,670000,680000,690000,700000,710000,720000,730000,740000,750000,760000,770000,780000,790000,800000,810000,820000,830000,840000,850000,860000,870000,880000,890000,900000,910000,920000,930000,940000,950000,960000,970000,980000,990000,1000000,1010000,1020000,1030000,1040000,1050000,1060000,1070000,1080000,1090000,1100000,1110000,1120000,1130000]

		}]
	});*/

});
function loadChart() {
	Highcharts.chart('idAmountneedGraph', {

		title: {
			text: '<b>Goal Corpus Accumulation</b>'
		},

		xAxis: {
			categories: categories
		},
		tooltip: {
			headerFormat: '<b>{series.name}</b><br />',

		},

		series: [{
			name:"Funded Corpus(most Likely)",
			color:'#3a3a4f',
			data:mostLikely

		},{
			name:"Funded Corpus(worst Case)",
			color:'#f7a35c',
			data:worstcase

		},{
			name:"Funded Corpus(best Case)",
			color:'#95ceff',
			data:bestcase

		}]
	});
}

function updateSIPLumpsum(){
	
		document.getElementById("idLumpsumInput").value = "";
		document.getElementById("idSIPForLumpsum").value = "";
}

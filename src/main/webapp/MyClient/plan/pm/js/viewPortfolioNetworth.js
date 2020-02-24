$(document).ready(function(){
    $("div.daterangepicker").remove();
	jQuery.fn.popupwindow = function(p){

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
	
	$(function(){
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

	var netpavright = $('.jssort20 div:nth-child(2) div:nth-child(3) div');
	var netpavleft = $('.jssort20 div:nth-child(2) div:nth-child(2) div');

	$(".Expensesright").click(function(){
		if(netpavright.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioRatio.html");
			$(".glidnonglid").hide();
			$("#idHeading").html("Ratios");
			$(".pmnetworth").removeClass("activeitem");
			$(".pmratios").addClass("activeitem");
		};
	});

	$(".Expensesleft").click(function(){
		if(netpavleft.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioLoans.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Loans");
			$(".pmnetworth").removeClass("activeitem");
			$(".pmloans").addClass("activeitem");

		};
	});



	var modal = document.getElementById("idPopnetworth");

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxnetworthsum");

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

	/*For networthdetails */

	var modal1 = document.getElementById("idPopnetdetails");

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxnetdetails");

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
		if (event.target == modal1) {
			modal1.style.display = "none";
		}
	}


	var assetcolorNumbering={};

	assetcolorNumbering[0]="#95ceff";
	assetcolorNumbering[1]="#f7a35c";
	assetcolorNumbering[2]="#90ed7d";
	assetcolorNumbering[3]="#8085d9";
	assetcolorNumbering[4]="#f15c80";
	assetcolorNumbering[5]="#5adedc";
	assetcolorNumbering[6]="#70ceff";
	assetcolorNumbering[7]="#95baff";
	assetcolorNumbering[8]="#f7ceff";
	assetcolorNumbering[9]="#958dff";



	var lialibilitycolorNumbering={};

	lialibilitycolorNumbering[9]="#95ceff";
	lialibilitycolorNumbering[8]="#f7a35c";
	lialibilitycolorNumbering[7]="#90ed7d";
	lialibilitycolorNumbering[6]="#8085d9";
	lialibilitycolorNumbering[5]="#f15c80";
	lialibilitycolorNumbering[4]="#5adedc";
	lialibilitycolorNumbering[3]="#70ceff";
	lialibilitycolorNumbering[2]="#95baff";
	lialibilitycolorNumbering[1]="#f7ceff";
	lialibilitycolorNumbering[0]="#958dff";



	var assetPieChartDataList=[];
	var liabilitiesPieChartDataList=[];
	var assetcolorCount=0;
	var lialibilitycolorCount=0;
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_PM+'/getClientNetworth?clientId='+vClientId,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			populateDetailsNetworth(data);
			var totalAssetMap={};
			var totalAssetValue=0;
			totalAssetValue =	parseFloat(data.totalTypeValue).toFixed(2);
			$.each(data, function (mapKey, mapValue) { 
				if(mapKey=='totaltypeValueMap'){
					totalAssetMap["Personal Assets"]=(mapValue["Personal"] > 0)? mapValue["Personal"] : 0;
					totalAssetMap["Investment Assets"] = (mapValue["Investment"] > 0)? mapValue["Investment"] : 0;
					totalAssetMap["Liabilities"] = (mapValue["Liabilities"] > 0)? mapValue["Liabilities"] : 0;

					totalAssetValue =	parseFloat(totalAssetMap["Personal Assets"]+
							totalAssetMap["Investment Assets"]).toFixed(2);
				}
			});

			$.each(data, function (mapKey, mapValue) {
				if(mapKey=='rootMap'){
					$.each(mapValue, function (assetindex, assets) {
						if(assetindex=='Assets'){		
							$.each(assets, function (typesubassetsindex, typesubassets) {
								
								//Personal Asset Display
								if(typesubassetsindex=='Personal Assets'){
									var circleImageCount=1;

									$("#assetClasses").append("<tr class='subheadingcolor'><td class='padding5px'><b>"+typesubassetsindex+" (A)</b></td>"+
											"<td></td>"+"<td></td>"+"</tr> ");
									$("#popupAssetClasses").append("<tr class='subheadingcolor'><td class='padding5px'><b>"+typesubassetsindex+" (A)</b></td>"+
											"<td></td>"+"<td></td>"+"</tr> ");

									var totalassetType=0;

									$.each(typesubassets, function (typesubassetsProductsindex, typesubassetsProducts) { 			
										$.each(typesubassetsProducts, function (productindex, productvalue) {
											var totalProductType=0;
											$.each(productvalue.networthDetails, function (index,val) { 
												totalProductType = ((totalProductType > 0)? totalProductType : 0.00)+((val.currentValue > 0)? val.currentValue : 0.00);
											});
											$("#assetClasses").append("<tr><td>" +
													"<i style='color:"+assetcolorNumbering[assetcolorCount]+";' class=\"fa fa-circle\" aria-hidden=\"true\"></i>" +
													"&nbsp; "+productvalue.productType+"</td>"+
													"<td>"+((totalProductType > 0)? maskAmountValue(Math.round(totalProductType)) : 0.00)+""+"</td>"+
													"<td > "+ ((totalProductType > 0 && totalAssetValue > 0)? parseFloat((parseFloat(totalProductType).toFixed(2)/totalAssetValue)*100).toFixed(2) : 0.00) +""+
													"%</td>"+"</tr> ");

											$("#popupAssetClasses").append("<tr><td> " +
													"<i style='color:"+assetcolorNumbering[assetcolorCount]+";' class=\"fa fa-circle\" aria-hidden=\"true\"></i>" +
													"&nbsp; "+productvalue.productType+"</td>"+
													"<td>"+((totalProductType > 0)? maskAmountValue(Math.round(totalProductType)) : 0.00)+""+ 
													"</td>"+"<td>"+((totalProductType > 0 && totalAssetValue > 0 )? parseFloat((parseFloat(totalProductType).toFixed(2)/totalAssetValue)*100).toFixed(2) : 0.00)+""+
													"%</td>"+"</tr> ");

											var assetPieChartObject = {};
											assetPieChartObject['name']=productvalue.productType;
											assetPieChartObject['y']= ((totalProductType > 0 && totalAssetValue)? parseFloat((totalProductType/totalAssetValue)*100) : 0.00);
											assetPieChartObject['color']=assetcolorNumbering[assetcolorCount];


											circleImageCount=circleImageCount+1;
											totalassetType= ((totalassetType > 0)? totalassetType : 0.00)+((totalProductType > 0)? totalProductType : 0.00);
											assetPieChartDataList.push(assetPieChartObject);
											assetcolorCount=assetcolorCount+1;

											totalProductType = ((totalProductType > 0)? totalProductType : 0.00)+((productvalue.currentValue > 0)? productvalue.currentValue : 0.00);
										});
									});
								}
								
								//Investment Asset Display
								if(typesubassetsindex=='Investment Assets'){					
									var circleImageCount=1;
									$("#assetClasses").append("<tr class='subheadingcolor'><td class='padding5px'><b>"+typesubassetsindex+" (B)</b></td>"+
											"<td></td>"+"<td></td>"+"</tr> ");
									$("#popupAssetClasses").append("<tr class='subheadingcolor'><td class='padding5px'><b>"+typesubassetsindex+" (B)</b></td>"+
											"<td></td>"+"<td></td>"+"</tr> ");
									var totalassetType=0;

									$.each(typesubassets, function (typesubassetsProductsindex, typesubassetsProducts) { 
										var totalProductType=0;
										$.each(typesubassetsProducts, function (productindex, productvalue) { 
											totalProductType = ((totalProductType > 0)? totalProductType : 0.00)+((productvalue.currentValue > 0)? productvalue.currentValue : 0.00);
										});

										$("#assetClasses").append("<tr><td>" +
												"<i style='color:"+assetcolorNumbering[assetcolorCount]+";' class=\"fa fa-circle\" aria-hidden=\"true\"></i>" +
												" &nbsp; "+typesubassetsProductsindex+"</td>"+
												"<td>"+((totalProductType > 0)? maskAmountValue(Math.round(totalProductType)) : 0.00)+""+"</td>"+
												"<td > "+ ((totalProductType > 0 && totalAssetValue > 0)? parseFloat((parseFloat(totalProductType).toFixed(2)/totalAssetValue)*100).toFixed(2) : 0.00)+""+
												"%</td>"+
										"</tr> ");

										$("#popupAssetClasses").append("<tr>  <td> " +
												"<i style='color:"+assetcolorNumbering[assetcolorCount]+";' class=\"fa fa-circle\" aria-hidden=\"true\"></i>" +
												"&nbsp; "+typesubassetsProductsindex+"</td>"+
												"<td>"+ ((totalProductType > 0)? maskAmountValue(Math.round(totalProductType)) : 0.00)+""+ 
												"</td>"+
												"<td > "+((totalProductType > 0 && totalAssetValue > 0)? parseFloat((parseFloat(totalProductType).toFixed(2)/totalAssetValue)*100).toFixed(2) : 0.00 )  +""+
												"%</td>"+
										"</tr> ");

										var assetPieChartObject = {};

										assetPieChartObject['name']=typesubassetsProductsindex;
										assetPieChartObject['y']= ((totalProductType > 0 && totalAssetValue >0)? parseFloat((totalProductType/totalAssetValue)*100) : 0.00);
										assetPieChartObject['color']=assetcolorNumbering[assetcolorCount];

										circleImageCount=circleImageCount+1;
										totalassetType=  ((totalassetType > 0)? totalassetType : 0.00)+((totalProductType > 0)? totalProductType : 0.00);
										assetPieChartDataList.push(assetPieChartObject);
										assetcolorCount=assetcolorCount+1;
									});
								}	
								$("#assetClasses").append("<tr class='bluebg'><td class='padding5px'><b> Total "+typesubassetsindex+"</b></td>"+
										"<td><b>"+((totalassetType > 0)? maskAmountValue(Math.round(totalassetType)) : 0.00)+"</b></td>"+
										"<td>"+((totalassetType > 0 && totalAssetValue > 0)? parseFloat((totalassetType/totalAssetValue)*100).toFixed(2) : 0.00)+"%</td>"+
								"</tr> ");

								$("#popupAssetClasses").append("<tr class='bluebg'><td class='padding5px'><b> Total "+typesubassetsindex+"</b></td>"+
										"<td><b>"+((totalassetType > 0 )?maskAmountValue(Math.round(totalassetType)) : 0.00)+"</b></td>"+
										"<td>"+((totalassetType > 0 && totalAssetValue > 0)? parseFloat((totalassetType/totalAssetValue)*100).toFixed(2) : 0.00)+"%</td>"+
								"</tr> ");		

							});


						}


					});

					$("#assetClasses").append("<tr class='grybg'><td><b> Total Asset : (A) + (B)</b></td>"+
							"<td><b>"+((totalAssetValue > 0)? maskAmountValue(Math.round(totalAssetValue)) : 0.00)+"</b></td>"+
							"<td>100%</td>"+"</tr> ");

					$("#popupAssetClasses").append("<tr class='grybg'><td><b> Total Asset : (A) + (B)</b></td>"+
							"<td><b>"+ ((totalAssetMap["Personal Assets"] > 0 && totalAssetMap["Investment Assets"] > 0)? maskAmountValue(Math.round(totalAssetMap["Personal Assets"]+totalAssetMap["Investment Assets"])) : 0.00)+"</b></td>"+
							"<td>100%</td>"+"</tr> ");

				}

				if(mapKey=='typeValueMap')
				{colorCount=0;
				$.each(mapValue, function (productsindex, productValue) { 
					if(productsindex.includes("Loan")){
						var circleImageCount=1;
						circleImageCount=circleImageCount+1;
						var liabilityPieChartObject = {};
						liabilityPieChartObject['name']=productsindex.replace("Loan", "")+"  Loan";
						liabilityPieChartObject['y']= ((productValue > 0 && totalAssetMap["Liabilities"])? parseFloat((productValue/parseFloat(totalAssetMap["Liabilities"]))*100) : 0.00 );
						liabilityPieChartObject['color']=lialibilitycolorNumbering[lialibilitycolorCount];
						liabilitiesPieChartDataList.push(liabilityPieChartObject);

						$("#liabilities").append("<tr class='bluebg'>" +
								"<td class='padding5px'>" +
								"<i style='color:"+lialibilitycolorNumbering[lialibilitycolorCount]+";' class=\"fa fa-circle\" aria-hidden=\"true\"></i><b>"+productsindex.replace("Loan", "")+"  Loan</b></td>"+
								"<td><b>"+((productValue > 0)? maskAmountValue(Math.round(productValue)) : 0.00)+"</b></td>"+
								"<td>"+((productValue > 0 && totalAssetMap["Liabilities"] > 0)? parseFloat((parseFloat(productValue).toFixed(2)/totalAssetMap["Liabilities"])*100).toFixed(2) : 0.00)+"%</td>"+
						"</tr> ");

						$("#libilitiesPopup").append("<tr class='bluebg'>" +
								"<td class='padding5px'>" +
								"<i style='color:"+lialibilitycolorNumbering[lialibilitycolorCount]+";' class=\"fa fa-circle\" aria-hidden=\"true\"></i><b>"+productsindex.replace("Loan", "")+"  Loan</b></td>"+
								"<td><b>"+((productValue > 0)? maskAmountValue(Math.round(productValue)) : 0.00)+"</b></td>"+
								"<td>"+((productValue > 0 && totalAssetMap["Liabilities"] > 0)? parseFloat((parseFloat(productValue).toFixed(2)/totalAssetMap["Liabilities"])*100).toFixed(2) : 0.00)+"%</td>"+
						"</tr> ");
						lialibilitycolorCount=lialibilitycolorCount+1;
					}
				});

				$("#liabilities").append("<tr class='grybg'><td><b> Total Liabilities</b></td>"+
						"<td><b>"+((totalAssetMap["Liabilities"] > 0)? maskAmountValue(Math.round(totalAssetMap["Liabilities"])) : 0.00)+"</b></td>"+
						"<td>100%</td>"+"</tr> ");

				$("#libilitiesPopup").append("<tr class='grybg'><td><b> Total Liabilities</b></td>"+
						"<td><b>"+((totalAssetMap["Liabilities"] > 0)? maskAmountValue(Math.round(totalAssetMap["Liabilities"])) : 0.00)+"</b></td>"+
						"<td>100%</td>"+"</tr> ");

				}

			});

			$("#liabilities").append('<tr style="background-color:white"><td></td><td></td><td></td></tr>');	

			$("#liabilities").append('<tr class="nonglidtotal"><td><b>Networth</b></td><td id="totalnetworthValue"><b> '+maskAmountValue(Math.round(data.networthValue))+' </b></td><td></td></tr>');

			$("#libilitiesPopup").append('<tr style="background-color:white"><td></td><td></td><td></td></tr>');	

			$("#libilitiesPopup").append('<tr class="nonglidtotal"><td><b>Networth</b></td><td id="totalnetworthValue"><b> '+maskAmountValue(Math.round(data.networthValue))+' </b></td><td></td></tr>');

			onLoadAllPieCharts();

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

	function populateDetailsNetworth(data)
	{
		var totalAssetMap={};
		var totalAssetValue=0;
		totalAssetValue = parseFloat(data.totalTypeValue).toFixed(2);
		$.each(data, function (mapKey, mapValue) { 
			if(mapKey=='totaltypeValueMap'){
				totalAssetMap["Personal Assets"]=mapValue["Personal"];
				totalAssetMap["Investment Assets"] = mapValue["Investment"];
				totalAssetMap["Liabilities"] = mapValue["Liabilities"];
				totalAssetValue =	(((totalAssetMap["Personal Assets"] > 0)? totalAssetMap["Personal Assets"] : 0.00)+((totalAssetMap["Investment Assets"] > 0)? totalAssetMap["Investment Assets"] : 0.00)).toFixed(2);
			}
		});
		
		//console.log(JSON.stringify(data));

		$.each(data, function (mapKey, mapValue) {
			if(mapKey=='rootMap')
			{
				$.each(mapValue, function (assetindex, assets) { 
					var circleImageCount=1;
					if(assetindex=='Assets'){

						$.each(assets, function (typesubassetsindex, typesubassets) { 
							
							var total = 0;
							var totalPersonalAsset = 0;
							var totalInvestmentAsset = 0;
							var totalPersonalAssetPercentage = 0;
							var totalInvestmentAssetPercentage = 0;
							
							if(typesubassetsindex == 'Investment Assets'){
							
								$("#networthDetails").append("<tr class='subheadingcolor'><td><b>"+typesubassetsindex+" (B)</b></td>"+"<td></td>"+"<td></td>"+"</tr> ");
								$("#networthDetailsPopup").append("<tr class='subheadingcolor'><td><b>"+typesubassetsindex+" (B)</b></td>"+"<td></td>"+"<td></td>"+"</tr> ");
								
								var totalassetType=0;
								$.each(typesubassets, function (typesubassetsProductsindex, typesubassetsProducts) { 
									////alert(typesubassetsProductsindex);
									////alert(typesubassetsProducts);
									var totalProductType=0;
									
									$("#networthDetails").append("<tr><td><b>"+typesubassetsProductsindex+" </b></td>"+"<td></td><td ></td></tr> ");
									$("#networthDetailsPopup").append("<tr>  <td><b>"+typesubassetsProductsindex+" </b></td>"+"<td></td><td ></td></tr> ");
									$.each(typesubassetsProducts, function (productindex, productvalue) { 
										totalProductType =totalProductType+productvalue.currentValue;
										$("#networthDetails").append("<tr><td>"+productvalue.productType+"</td>"+"<td></td><td></td></tr> ");
										$("#networthDetailsPopup").append("<tr><td>"+productvalue.productType+"</td>"+"<td></td><td></td></tr> ");

										assetcolorCount =0;

										$.each(productvalue.networthDetails, function (productNameindex, productNamevalue) {
											
											totalInvestmentAsset = parseFloat(totalInvestmentAsset)+parseFloat((productNamevalue.currentValue > 0)? (parseFloat(productNamevalue.currentValue).toFixed(2)) : 0.00); 
											total = parseFloat(total)+parseFloat((productNamevalue.currentValue > 0)? (parseFloat(productNamevalue.currentValue).toFixed(2)) : 0.00);
											totalInvestmentAssetPercentage = parseFloat(totalInvestmentAssetPercentage)+parseFloat((productNamevalue.currentValue > 0 && totalAssetValue > 0)? parseFloat((productNamevalue.currentValue/totalAssetValue)*100).toFixed(2) : 0.00);
											
											$("#networthDetails").append("<tr><td><i style='color:"+assetcolorNumbering[assetcolorCount]+";' " +
													"class=\"fa fa-circle\" aria-hidden=\"true\"></i> "+productNamevalue.productName+"</td>"+
													"<td>"+((productNamevalue.currentValue > 0)? maskAmountValue(Math.round(productNamevalue.currentValue)) : 0.00)+"</td>" +
													"<td>"+((productNamevalue.currentValue > 0 && totalAssetValue > 0)? parseFloat((productNamevalue.currentValue/totalAssetValue)*100).toFixed(2) : 0.00)+"%</td></tr> ");
											$("#networthDetailsPopup").append("<tr><td><i style='color:"+assetcolorNumbering[assetcolorCount]+";' class=\"fa fa-circle\" aria-hidden=\"true\"></i> "+
													productNamevalue.productName+"</td>"+"<td>"+
													((productNamevalue.currentValue > 0)? maskAmountValue(Math.round(productNamevalue.currentValue)) : 0.00)+"</td><td>"+
													((productNamevalue.currentValue > 0 && totalAssetValue > 0)? parseFloat((parseFloat(productNamevalue.currentValue)/totalAssetValue)).toFixed(2) : 0.00)
													+"%</td></tr> ");
											assetcolorCount++;
										});
																				
									});									
								
								});
								
								$("#networthDetails").append("<tr class='bluebg'><td class='padding5px'><b> Total "+typesubassetsindex+"</b></td>"+
										"<td><b>"+maskAmountValue(Math.round(totalInvestmentAsset))+"</b></td>"+
										"<td>"+totalInvestmentAssetPercentage.toFixed(2)+"%</td>"+
								"</tr> ");

								$("#networthDetailsPopup").append("<tr class='bluebg'><td class='padding5px'><b> Total "+typesubassetsindex+"</b></td>"+
										"<td><b>"+maskAmountValue(Math.round(totalInvestmentAsset))+"</b></td>"+
										"<td>"+totalInvestmentAssetPercentage.toFixed(2)+"%</td>"+
								"</tr> ");
								
								
							}else if(typesubassetsindex == 'Personal Assets'){
								
								$("#networthDetails").append("<tr class='subheadingcolor'><td><b>"+typesubassetsindex+" (A)</b></td>"+"<td></td>"+"<td></td>"+"</tr> ");
								$("#networthDetailsPopup").append("<tr class='subheadingcolor'><td><b>"+typesubassetsindex+" (A)</b></td>"+"<td></td>"+"<td></td>"+"</tr> ");
								
								var totalassetType=0;
								$.each(typesubassets, function (typesubassetsProductsindex, typesubassetsProducts) { 
									////alert(typesubassetsProductsindex);
									////alert(typesubassetsProducts);
									var totalProductType=0;
									
									$("#networthDetails").append("<tr><td><b>"+typesubassetsProductsindex+" </b></td>"+"<td></td><td ></td></tr> ");
									$("#networthDetailsPopup").append("<tr>  <td><b>"+typesubassetsProductsindex+" </b></td>"+"<td></td><td ></td></tr> ");
									$.each(typesubassetsProducts, function (productindex, productvalue) { 
										totalProductType =totalProductType+productvalue.currentValue;
										$("#networthDetails").append("<tr><td>"+productvalue.productType+"</td>"+"<td></td><td></td></tr> ");
										$("#networthDetailsPopup").append("<tr><td>"+productvalue.productType+"</td>"+"<td></td><td></td></tr> ");

										assetcolorCount =0;

										$.each(productvalue.networthDetails, function (productNameindex, productNamevalue) { 
											
											totalPersonalAsset = parseFloat(totalPersonalAsset)+parseFloat((productNamevalue.currentValue > 0)? (parseFloat(productNamevalue.currentValue).toFixed(2)) : 0.00); 
											total = parseFloat(total)+parseFloat((productNamevalue.currentValue > 0)? (parseFloat(productNamevalue.currentValue).toFixed(2)) : 0.00);
											totalPersonalAssetPercentage = parseFloat(totalPersonalAssetPercentage)+parseFloat((productNamevalue.currentValue > 0 && totalAssetValue > 0)? parseFloat((productNamevalue.currentValue/totalAssetValue)*100).toFixed(2) : 0.00);
											
											$("#networthDetails").append("<tr><td><i style='color:"+assetcolorNumbering[assetcolorCount]+";' " +
													"class=\"fa fa-circle\" aria-hidden=\"true\"></i> "+productNamevalue.productName+"</td>"+
													"<td>"+((productNamevalue.currentValue > 0)? maskAmountValue(Math.round(productNamevalue.currentValue)) : 0.00)+"</td><td>"+
													((productNamevalue.currentValue > 0 && totalAssetValue > 0)? parseFloat((productNamevalue.currentValue/totalAssetValue)*100).toFixed(2) : 0.00)+"%</td></tr> ");
											$("#networthDetailsPopup").append("<tr><td><i style='color:"+assetcolorNumbering[assetcolorCount]+";' class=\"fa fa-circle\" aria-hidden=\"true\"></i> "+
													productNamevalue.productName+"</td>"+"<td>"+
													((productNamevalue.currentValue > 0)? maskAmountValue(Math.round(productNamevalue.currentValue)) : 0.00)+"</td><td>"+
													((productNamevalue.currentValue > 0 && totalAssetValue > 0)? parseFloat((parseFloat(productNamevalue.currentValue)/totalAssetValue)).toFixed(2) : 0.00)
													+"%</td></tr> ");
											assetcolorCount++;
										});
										
									});
									
								});

								$("#networthDetails").append("<tr class='bluebg'><td class='padding5px'><b> Total "+typesubassetsindex+"</b></td>"+
										"<td><b>"+maskAmountValue(Math.round(totalPersonalAsset))+"</b></td>"+
										"<td>"+totalPersonalAssetPercentage.toFixed(2)+"%</td>"+
								"</tr> ");

								$("#networthDetailsPopup").append("<tr class='bluebg'><td class='padding5px'><b> Total "+typesubassetsindex+"</b></td>"+
										"<td><b>"+maskAmountValue(Math.round(totalPersonalAsset))+"</b></td>"+
										"<td>"+totalPersonalAssetPercentage.toFixed(2)+"%</td>"+
								"</tr> ");

								
							}
						});
						$("#networthDetails").append("<tr class='grybg'><td><b> Total Asset : (A) + (B)</b></td>"+
								"<td><b>"+maskAmountValue(Math.round(totalAssetValue))+"</b></td>"+
								"<td>100%</td>"+"</tr> ");

						$("#networthDetailsPopup").append("<tr class='grybg'><td><b> Total Asset : (A) + (B)</b></td>"+
								"<td><b>"+maskAmountValue(Math.round(totalAssetValue))+"</b></td>"+
								"<td>100%</td>"+"</tr> ");
						
					}else{
						$.each(assets, function (typesubassetsindex, typesubassets) {
							$("#networthDetails").append("<tr class='subheadingcolor'><td><b>"+typesubassetsindex+"</b></td>"+"<td></td>"+"<td></td>"+"</tr> ");
							$("#networthDetailsPopup").append("<tr class='subheadingcolor'><td><b>"+typesubassetsindex+"</b></td>"+"<td></td>"+"<td></td>"+"</tr> ");
							$("#libilitiesPopup").append("<tr class='subheadingcolor'><td><b>"+typesubassetsindex+"</b></td>"+"<td></td>"+"<td></td>"+"</tr> ");

							var totalassetType=0;
							var totallibility = 0;
							$.each(typesubassets, function (typesubassetsProductsindex, typesubassetsProducts) { 	
								var totalProductType=0;
								$("#networthDetails").append("<tr><td><b>"+typesubassetsProductsindex+"</b></td>"+"<td></td><td ></td></tr> ");
								$("#networthDetailsPopup").append("<tr><td><b>"+typesubassetsProductsindex+"</b></td>"+"<td></td><td ></td></tr> ");
								$("#libilitiesPopup").append("<tr><td><b>"+typesubassetsProductsindex+"</b></td>"+"<td></td><td ></td></tr> ");
								
								$.each(typesubassetsProducts, function (productindex, productvalue) { 
									
									totallibility = parseFloat(totallibility)+parseFloat((productvalue.currentValue > 0)? (parseFloat(productvalue.currentValue).toFixed(2)) : 0.00);
									
									$("#networthDetails").append("<tr><td>"+productvalue.productName+"</td>"+
											"<td>"+((productvalue.currentValue > 0)? maskAmountValue(Math.round(productvalue.currentValue)) : 0.00)+"</td><td>6.25%</td></tr> ");
									$("#networthDetailsPopup").append("<tr><td>"+productvalue.productName+"</td>"+
											"<td>"+((productvalue.currentValue > 0)? maskAmountValue(Math.round(productvalue.currentValue)) : 0.00)+"</td><td>6.25%</td></tr> ");
									$("#libilitiesPopup").append("<tr><td>"+productvalue.productName+"</td>"+
											"<td>"+((productvalue.currentValue > 0)? productvalue.currentValue : 0.00)+"</td><td>6.25%</td></tr> ");
									
								});
							});

							$("#networthDetails").append("<tr class='grybg'><td><b> Total Libilities</b></td>"+
									"<td><b>"+maskAmountValue(Math.round(totallibility))+"</b></td>"+
									"<td>100%</td>"+"</tr> ");
							
							$("#networthDetailsPopup").append("<tr class='grybg'><td><b> Total Libilities</b></td>"+
									"<td><b>"+maskAmountValue(Math.round(totallibility))+"</b></td>"+
									"<td>100%</td>"+"</tr> ");

							$("#libilitiesPopup").append("<tr class='grybg'><td><b> Total Libilities</b></td>"+
									"<td><b>"+maskAmountValue(Math.round(totallibility))+"</b></td>"+
									"<td>100%</td>"+"</tr> ");
							
							$("#networthDetails").append("<tr class='nonglidtotal'><td>Networth</td>"+
									"<td>"+maskAmountValue(Math.round(data.networthValue))+"</td>" +
									"<td></td></tr> ");
							
							$("#networthDetailsPopup").append("<tr class='nonglidtotal'><td>Networth</td>"+
									"<td>"+maskAmountValue(Math.round(data.networthValue))+"</td>" +
									"<td></td></tr> ");
							$("#libilitiesPopup").append("<tr class='nonglidtotal'><td>Networth</td>"+
									"<td>"+maskAmountValue(Math.round(data.networthValue))+"</td>" +
									"<td></td></tr> ");
							
							/*$("#assetClasses").append("<tr class='bluebg'><td class='padding5px'><b> Total "+typesubassetsindex+"</b></td>"+
				"<td><b>"+parseFloat(totalassetType).toFixed(2)+"</b></td>"+
				"<td>"+parseFloat((totalassetType/totalAssetMap[typesubassetsindex])*100).toFixed(2)+"%</td>"+
		"</tr> ");

				$("#popupAssetClasses").append("<tr class='bluebg'><td class='padding5px'><b> Total "+typesubassetsindex+"</b></td>"+
						"<td><b>"+parseFloat(totalassetType).toFixed(2)+"</b></td>"+
						"<td>"+parseFloat((totalassetType/totalAssetMap[typesubassetsindex])*100).toFixed(2)+"%</td>"+
		"</tr> ");*/

						});


					}
					/*	$("#assetClasses").append("<tr class='grybg'><td><b> Total Asset : (A) + (B)</b></td>"+
			"<td><b>"+totalAssetValue+"</b></td>"+
			"<td>100%</td>"+
"</tr> ");
	$("#popupAssetClasses").append("<tr class='grybg'><td><b> Total Asset : (A) + (B)</b></td>"+
			"<td><b>"+parseFloat(totalAssetMap["Personal Assets"]+
			totalAssetMap["Investment Assets"]).toFixed(2)+"</b></td>"+
			"<td>100%</td>"+
"</tr> ");*/
				});
			}

		});



	}

	// populate asset pie
	function onLoadAllPieCharts() {
		
		/*console.log(JSON.stringify(assetPieChartDataList));*/

		Highcharts.chart('idassets', {
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
			plotOptions: {
				pie: {
					size: 200,
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				name: 'Assets',
				colorByPoint: true,
				data:assetPieChartDataList
			}]
		});

		Highcharts.chart('idassetspop', {
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
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				name: 'Assets',
				colorByPoint: true,
				data:assetPieChartDataList
			}]
		});


		Highcharts.chart('idlibilities', {
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
			plotOptions: {
				pie: {
					size: 200,
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					},
					size: 200
				}
			},
			series: [{
				name: 'Libilities',
				colorByPoint: true,
				data:liabilitiesPieChartDataList
			}]
		});
	}


	Highcharts.chart('idlibilitiespop', {
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
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				}
			}
		},
		series: [{
			name: 'Libilities',
			colorByPoint: true,
			data:liabilitiesPieChartDataList
		}]
	});
});
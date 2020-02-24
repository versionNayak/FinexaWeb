
/*var module = 'Portfolio Management';*/
jQuery(document).ready(function ($) {
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
	var advisorUserId;
	var advisorMasterId;
	
	if(loggedUser == null && loggedClient != null){
		$("#idGenerate").hide();
		advisorUserId = loggedClient.userId;
		advisorMasterId = loggedClient.advisorMasterID;
		if(loggedClient.financialPlanningAddEdit === "Y"){
			$("#idProductRecoSave").show();
		}else{
			$("#idProductRecoSave").hide();
		}
	}else{
		$("#idGenerate").show();
		advisorUserId = loggedUser.advisorID;
		advisorMasterId = loggedUser.advisorMasterId;
		if(loggedUser.financialPlanningAddEdit === "Y"){
			$("#idProductRecoSave").show();
		}else{
			$("#idProductRecoSave").hide();
		}
	}
	
	var exit = true;
	$.ajax({
		type: 'GET',
		url: ClientServiceUrl + "getAdvisorMFProductFundDetails?advisorId="+advisorMasterId,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
        success: function (data) {
    		if(data[3] == false){
    		alert("Product recommendation master for current date is not available. Please update the product recommendation master");
    		exit = false;
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
    		alert("error");
    	}
    });

	if(exit == true){
    $("div.daterangepicker").remove();
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




	var jssor_5_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_5_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_5_SlideshowTransitions,
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


	var jssor_5_slider = new $JssorSlider$("jssor_5", jssor_5_options);


	$("#loadproduct").load("gp/Producttable.html");  


	var productpavdiv = $('.jssort05 div:nth-child(2) div:nth-child(2) div');

	$(".productright").click(function(){
		if(productpavdiv.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/pm/viewPortfolioAdvisorRecommendation.html");
			$(".form-section-container").css("padding","27px 45px 101px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Advisor Recommendation");
			$(".pmproductrecom").removeClass("activeitem");
			$(".pmadvisorrecommend").addClass("activeitem");
		};
	});

	$(".productleft").click(function(){
		if(productpavdiv.hasClass('pav'))
		{	     
			if(loggedUser == null && loggedClient != null){
				$("#idBody").empty();
				$("#idBody").load("plan/pm/viewPortfolioFixedIncome.html");
				$(".form-section-container").css("padding","27px 45px 101px");
				$(".glidnonglid").hide();
				$("#idHeading").html("Portfolio Overview- Debt.");
				$(".pmproductrecom").removeClass("activeitem");
				$(".pmportfoliorecom").addClass("activeitem");
			}else{
				$("#idBody").empty();
				$("#idBody").load("plan/pm/viewPortfolioRecommendation.html");
				$(".form-section-container").css("padding","27px 45px 101px");
				$(".glidnonglid").hide();
				$("#idHeading").html("Portfolio Recommendation");
				$(".pmproductrecom").removeClass("activeitem");
				$(".pmportfoliorecom").addClass("activeitem");
			} 
		};
	});
	
	var subAssetCategory;
	var tableString = "";
	var cashProd = [];
	var lump = [];
	var sip = [];
	var ustd = [];
	var std = [];
	var ltd = [];
	var equityL = [];
	var equityMS = [];
	var equityI = [];
	var AlternativeP = [];
	var AlternativeReal = [];
	var AlternativeOther = [];
	
	/*Sumit [don't delete required for report]*/
	var productRecommendation = [];
	var productRecommendationrow = {};
	var recommendateProduct = [];
	var recommendedIsin = [];
	var recommendateProductValue = [];
	var sipAmount = [];
	var sipTennure = [];
	var lumpsumAmt = [];
    var JsonData;
    var selectId;
	var tableId;
	var k = 0;
	/*Sumit [don't delete required for report]*/	
	
	function loadProductReco(saveDate) {
		
		var date = saveDate.replace(/\//g, "");
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		var serviceurlForLoadingSavedReco = "getLastSavedProductRecoPM/"+advisorUserId+"/" + selectedClientId + "/" +date + "/PM";
		getClientData("GET", "" , serviceurlForLoadingSavedReco, onSuccessGoalList);
		function onSuccessGoalList(data) {
			tableString = "";
			var prodLengthFlag = 0;
			$.each(data,function(index, value) {
				if(value.productName.length > 0) {
					prodLengthFlag = 1;
				}
			});
			if(prodLengthFlag == 0) {
				alert("Product Recommendation Master is not configured");
			}else {
				subAssetCategory = data.length;
//				alert("subAssetCategory" + subAssetCategory);
				$.each(data,function(index, value) {
					var idTablleText = "idTableText" + index;
					var sumLumpsum = 0;
					for (var lumpIndex = 0; lumpIndex < value.lumpsumAmt.length; lumpIndex ++) {
						sumLumpsum = sumLumpsum + value.lumpsumAmt[lumpIndex];
					}
					lump.push(sumLumpsum);
//					alert("sumLumpsum" + sumLumpsum);
					var sumSip = 0;
					for (var sipIndex = 0; sipIndex < value.sipAmount.length; sipIndex ++) {
						sumSip = sumSip + value.sipAmount[sipIndex];
					}
					sip.push(sumSip);
					tableString = tableString + '<tr>' +
					'<td class="paddingleft5px" style = "width:12%">'+ value.subAssetClass +'</td>' +
					'<td class="widthtalign" style = "text-align:center !important">'+ value.subAssetAlloPerc +'</td>' +
					'<td colspan="3"><table width="100%" class="rp1" id="'+idTablleText+'">';
					
					var productLength = value.productName.length;
					for (var prodIndex = 0; prodIndex < productLength; prodIndex ++) {
						if (value.productValue[prodIndex] > 0) {
							var idtextField = "text_div"+index+"_subdiv"+prodIndex;
							tableString = tableString + '<tr><td style="width:330px;">' + value.productName[prodIndex] + '</td>' +
							'<td align="center" id="tdText">'+ value.productValue[prodIndex] + '</td>';
							tableString = tableString + '<td id="lump" style="vertical-align:top;width:230px;" >' + 
										maskAmountValue(Math.round(parseFloat(value.lumpsumAmt[prodIndex]).toFixed(2))) +'</td>';
						} 
					}
					
					//$.each(value.productName,function(index1, value1) {});
					tableString = tableString + '</table></td></tr>';
					selectId = "option"+index;
					tableId="idTable"+index;
				});
				$("#idSavedProductTable").empty();
				$("#idSavedProductTable").append(tableString);
			}
		
		}
		
	}

	$.ajax({
		type: 'GET',
		url: REQUEST_URL_PM + '/getProdRecoPM?clientId='+vClientId+'&advisorId='+advisorMasterId,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			tableString = "";
			JsonData = data;
//			alert(tableString);
			var prodLengthFlag = 0;
			$.each(data,function(index, value) {
				if(value.productName.length > 0) {
					prodLengthFlag = 1;
				}
			});
			if(prodLengthFlag == 0) {
				bootbox.alert("Product Recommendation Master is not configured");
			} else {
				subAssetCategory = data.length;
				$.each(data,function(index, value) {
					var idTablleText = "idTableText" + index;
					lump.push(value.lumpsumAmt);
					sip.push(value.sipAmt);
					tableString = tableString + '<tr>' +
					'<td class="paddingleft5px" style = "width:12%">'+ value.subAssetClass +'</td>' +
					'<td class="widthtalign" style = "text-align:center !important">'+ parseFloat(value.subAssetAlloPerc * 100).toFixed(2) +'</td>' +
					'<td colspan="2"><table width="100%" class="rp1" id="'+idTablleText+'">';
//					alert(tableString);
					
					recommendateProduct = [];
					recommendateProductValue = [];
					recommendedIsin = [];
					sipAmount = [];
					sipTennure = [];
					lumpsumAmt = [];
					
					$.each(value.productName,function(index1, value1) {
						var idtextField = "text_div"+index+"_subdiv"+index1;
						tableString = tableString + '<tr><td class="width52per">' + value1 + '</td>' +
						'<td align="center" id="tdText"><input type="text" class="form-control aligncenter" id="'+idtextField+'"/></td></tr>';
						if (value.subAssetClass == "Cash/Liquid") {
							cashProd.push(value1);
						}
						if (value.subAssetClass == "Ultra Short Term Debt") {
							ustd.push(value1);
						}
						if (value.subAssetClass == "Short Term Debt") {
							std.push(value1);

						}
						if (value.subAssetClass == "Long Term Debt") {
							ltd.push(value1);
						}
						if (value.subAssetClass == "Equity Large Cap") {
							equityL.push(value1);
						}
						if (value.subAssetClass == "Equity International") {
							equityI.push(value1);
						}
						if (value.subAssetClass == "Alternatives - Precious Metals") {
							AlternativeP.push(value1);
						}
						if (value.subAssetClass == "Alternatives - Real Estate") {
							AlternativeReal.push(value1);
						}
						if (value.subAssetClass == "Alternatives - Others") {
							AlternativeOther.push(value1);
						}
						if (value.subAssetClass == "Equity Mid and Small Cap") {
							equityMS.push(value1);
						}
						
					});
//					alert(tableString);
					var selectId = "option"+index;
					var tableId="idTable"+index;
					tableString = tableString + '</table></td>' +
					'<td class="width8per"> <select class="form-control" style="padding: 6px 3px;" id="'+selectId+'"><option>Yes</option><option>No</option></select></td>' +
					'<td colspan="3" class="paddingleft17px"><table width="100%" height="184px" id="'+tableId+'">';
					//				alert(tableString);
					$.each(value.productName,function(index2, value2) {
						tableString = tableString + '<tr class="amtenur">' + 
						'<td id="lump" style="vertical-align:top">' + maskAmountValue(parseFloat(value.lumpsumAmt/value.productName.length).toFixed(2))+'</td></tr>';
						
						
						recommendateProduct.push(value2);
						recommendateProductValue.push(Math.round(parseFloat(value.lumpsumAmt/value.productName.length).toFixed(2)));
						sipAmount.push(Math.round(parseFloat(value.sipAmt/value.productName.length).toFixed(2)));
						sipTennure.push(parseFloat(value.sipTenure));
						lumpsumAmt.push(Math.round(parseFloat(value.lumpsumAmt/value.productName.length).toFixed(2)));
					});
					$.each(value.isinList,function(index2, value2) {
						recommendedIsin.push(value2);
					});
//					alert(tableString);
					tableString = tableString + '</table></td></tr>';
					
					productRecommendationrow = { 
												"subAssetClass" : value.subAssetClass,
												"subAssetAlloPerc" : parseFloat(value.subAssetAlloPerc * 100).toFixed(2),
												"productName" : recommendateProduct,
												"productValue" : recommendateProductValue,
												"productIsin" : recommendedIsin,
												"selectAll" : "Yes",
												"sipAmount" : sipAmount,
												"sipTennure" : sipTennure,
												"lumpsumAmt" : lumpsumAmt,
					};
					
					productRecommendation.push(productRecommendationrow);
					
					sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
					
//					alert(tableString);
				});
//				alert(tableString);
				$("#idSavedProductTableGenerate").append(tableString);
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
	
	
	var dataLength = 0;
	var serialNo = 0;
	$("idGPProductRecoList").empty();
	 var el1 = document.getElementById("idGPProductRecoList");
	// load all the existing plans of advisor
	 $.ajax({
		 type: 'GET',
		url: serviceIP + "/clientservice/" + 'getAdvisorProductReco?advisorId='+advisorUserId+'&clientId='+vClientId+'&goalId=0&module=PM',
		 async: true,
		 dataType: 'json',
		 beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		 },
		 success: function (data) {
			 dataLength = data.length;
			 var serialNo = 1;
			 if (data.length == 0) {
				 if(loggedClient != null && loggedUser == null){
					 $("#idProductRecoDetailsTable").append("No saved product recommendations. Please contact advisor for further details.");
				 }else{
					 $("#idProductRecoDetailsTable").append("No saved product recommendations"); 
				 }
				
			 } else {
			 if(loggedClient != null && loggedUser == null){
				 value = data[0];
				 var serialNo = 1;
				 $("#idProductRecoDetailsTable").append('<tr>' +
						 '<td>' + (serialNo) +  '</td>' +
						 '<td id ="idRecoSaveDate'+serialNo+'" >' + (value.recoSaveDate) +  '</td>' +
						 '<td style="text-align:center !important"><a id="idMaxtnproduct_'+serialNo+'" class="popup">View/</a> <a id="idDownload_'+serialNo+'">Download</a></td>' +
				 '</tr>');
				
			 }else{
				 if(loggedUser != null){
				 //alert("user");
				 var serialNo = 1;
				 $.each(data,function(index, value) {

					 $("#idProductRecoDetailsTable").append('<tr>' +
							 '<td>' + (serialNo) +  '</td>' +
							 '<td id ="idRecoSaveDate'+serialNo+'" >' + (value.recoSaveDate) +  '</td>' +
							 '<td style="text-align:center !important"><a id="idMaxtnproduct_'+serialNo+'" class="popup">View/</a> <a id="idDownload_'+serialNo+'">Download/</a> <a id="idInvest_'+serialNo+'">Invest</a></td>' +
					 '</tr>');
					 serialNo ++;
					 /*        	  var date = moment(value.recoSaveDate,'DD/MM/YYYY').format('DD/MM/YYYY');
//          	   console.log("data.productPlan" + value.productPlan);
                 var jsonSring = JSON.stringify(value.productPlan);
//                 alert("jsonSring" + jsonSring);
                 var node = document.createElement("li");
                // var para =document.createElement("p");
                 var link = document.createElement("a");

                 //alert(date);'

                 var img = $('<img />').attr({
     	            'id': 'myImage'+k,
     	            'src': '../Common/assets/images/icons/download_Image.png',
     	            'width': 28,
     	            'height': 28
     	        }).appendTo(para);

                 link.innerText = date;
                 link.setAttribute('href', '#');
                 link.setAttribute('style', 'cursor:pointer');
                 link.setAttribute('id', 'idDownload'+k);
                 node.appendChild(link);
                 //node.appendChild(para);
                 el1.appendChild(node);
                 $("#idDownload"+k).on("click",function() {
             	   downloadFile(date);
             	});

                k++; */
				 });
			  }
			} 
		 }
//			 alert("Hi");

			 for (var index = 1; index <= dataLength; index ++) {
				 var btnDownload = document.getElementById("idDownload_" + index);
				 btnDownload.onclick = function() {
					 var selectedButtonId = this.id;
					 var selectedIndex = selectedButtonId.indexOf("_");
					 var selectedLength = selectedButtonId.length;
					 var selectedId = selectedButtonId.substring((selectedIndex + 1),selectedLength);
					 var recoSaveDate = $("#idRecoSaveDate"+selectedId).text();
					 downloadFile(recoSaveDate);
				 }
			 }
			 if(loggedClient != null && loggedUser != null){
			 for (var index = 1; index <= dataLength; index ++) {
				 var btnDownload = document.getElementById("idInvest_" + index);
				 btnDownload.onclick = function() {
					 var selectedButtonId = this.id;
					 var selectedIndex = selectedButtonId.indexOf("_");
					 var selectedLength = selectedButtonId.length;
					 var selectedId = selectedButtonId.substring((selectedIndex + 1),selectedLength);
					 var recoSaveDate = $("#idRecoSaveDate"+selectedId).text();
					 sessionStorage.setItem("INVEST_DATE",recoSaveDate);
//					 sessionStorage.setItem("SELECTED_GOAL_FOR_INVEST", goalId);
					 $("#dashbord").empty();
		        		$(".dashboardheading").html("Portfolio Management");
		        		$("#dashbord").load("invest/pm.html");
				 }
			 }
			} 
			 
				var modal = document.getElementById('idPopUpProduct');
				for (var index = 1; index <= dataLength; index ++) {
//					Get the button that opens the modal
					var btn = document.getElementById("idMaxtnproduct_" + index);
					var element = document.getElementById ("idRecoSaveDate"+index);
					recoSaveDate = element.innerText;
//					When the user clicks the button, open the modal 
					btn.onclick = function() {
						/*var element = document.getElementById ("idRecoSaveDate"+index).innerText;
						alert(element);*/
//						alert($("#idRecoSaveDate"+index).text());
						//var recoSaveDate = $("#idRecoSaveDate"+index).html();
						var selectedButtonId = this.id;
						var selectedIndex = selectedButtonId.indexOf("_");
						var selectedLength = selectedButtonId.length;
						var selectedId = selectedButtonId.substring((selectedIndex + 1),selectedLength);
						var recoSaveDate = $("#idRecoSaveDate"+selectedId).text();
//						alert(recoSaveDate);
						loadProductReco(recoSaveDate);
						$(".onpopupscroller").css("overflow","hidden");
						modal.style.display = "block";
					}
				}
				
//				Get the <span> element that closes the modal
				var span = document.getElementsByClassName("close")[0];


//				When the user clicks on <span> (x), close the modal
				span.onclick = function() {
					tableString = "";
					$("#idSavedProductTable").html("");
					$(".onpopupscroller").css("overflow","visible");
					modal.style.display = "none";
					
					/*//For Bugs
					 $(".Goals").empty();
					 $(".Goals").load("plan/gp/viewProductRecommend.html");*/
				}

//				When the user clicks anywhere outside of the modal, close it
				window.onclick = function(event) {
					 if (event.target == modal) {
					     modal.style.display = "none";
					 }
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
	var ob=[];
	var obarr={};
	$("#idProductRecoSave").on("click", function(event) {
		 ob=[];
		 obarr={};
		var flag = 0;
		
		
		var errmsg = "Allocation of ";
		for(var j=0;j<productRecommendation.length;j++){
			obarr = productRecommendation[j];
			obarr.sipAmount.length = obarr.productName.length;
			obarr.lumpsumAmt.length = obarr.productName.length;
			var totalProductValue = 0; 
			$.each(obarr.productValue,function(index, value) {
				if(value != ""){
				totalProductValue = totalProductValue+parseFloat(value);
				console.log(" "+value);
				console.log("parseFloat(value) "+parseFloat(value));
				console.log("totalProductValue "+totalProductValue);
				}
				
			});
			var total = Math.round(totalProductValue);
			if(total !=  100){
				flag = 1;
				errmsg = errmsg + obarr.subAssetClass+", ";
			}
			console.log("flag "+flag);
			if(flag == 0){
			ob.push(obarr);
			console.log("enter ob "+ob.length);
			obarr = {};
			}
			console.log("final "+JSON.stringify(ob));
			
		}
		console.log("outside ob "+ob.length);
		if(flag == 1){
			errmsg = errmsg.replace(/,\s*$/, "");
			errmsg = errmsg+" not equal to 100"
			alert(errmsg);
		}
		if(flag == 0){
		var r = JSON.stringify(productRecommendation);
		console.log("r end  "+r);
		var jsonString1 = encodeURIComponent(JSON.stringify(productRecommendation));
	  
	   
	    console.log("JSON.stringify(ob) end  "+JSON.stringify(ob));
	    var jsonString = encodeURIComponent(JSON.stringify(ob));
	   

	
		$.ajax({
			type: 'GET',
			url: serviceIP + "/clientservice/" + 'saveAdvisorProductReco?advisorId='+advisorUserId+'&clientId='+vClientId+'&goalId=0&module=PM&jsonData='+jsonString,
			async: true,
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
            success: function (data) {
              alert("saved successfully");
              $(".onpopupscroller").css("overflow","hidden");
          	  var modal = document.getElementById('idPopUpProductGenerate');
      	      modal.style.display = "block";
              $("#idBody").empty();
  			  $("#idBody").load("plan/pm/viewProductRecommend.html");
              /*if(data.option == 0){
              var date = moment(data.recoSaveDate,'DD/MM/YYYY').format('DD/MM/YYYY');
              var el = document.getElementById("idGPProductRecoList");
              var node = document.createElement("li");
              var link = document.createElement("a");
              link.innerText = "" + date;
              link.setAttribute('href', '#');
              link.setAttribute('style', 'cursor:pointer');
              link.setAttribute('id', 'idDownload'+k);
              node.appendChild(link);
              el.appendChild(node);
              
              $("#idDownload"+k).on("click",function() {
             	    downloadFile(date);
             	});
                 
              }*/
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
        		alert("error" + data);
        	}
               
        });
	  }
	});
	
	//console.log(JSON.stringify(productRecommendation));
    /*alert("selectedMode "+selectedMode);
	for(index = 0; index < subAssetCategory; index ++) {
		var tableId="idTable"+index;
		if(selectedMode == 1) {// When lumpsum is selected
			$('#idProductTable td:nth-child(7),#idProductTable th:nth-child(7)').hide().addClass('noprint');
			$('#idProductTableModal td:nth-child(7),#idProductTableModal th:nth-child(7)').hide().addClass('noprint');
			$('#'+tableId+' td:nth-child(2),#'+tableId+' th:nth-child(2)').hide().addClass('noprint');
		} else if (selectedMode == 2) {// When SIP is selected
			$('#idProductTable td:nth-child(6),#idProductTable th:nth-child(6)').hide().addClass('noprint');
			$('#idProductTableModal td:nth-child(6),#idProductTableModal th:nth-child(6)').hide().addClass('noprint');
			$('#'+tableId+' td:nth-child(1),#'+tableId+' th:nth-child(1)').hide().addClass('noprint');
		}
	}
	*/
	$.each(lump,function(index, value) {
		disableTextField(index);
	});

//	alert("subAssetCategory" + subAssetCategory);
	function disableTextField(category) {
					
		// division by 2 because table is appended two times
		var lengthTab = ($('#idTableText'+category+' #tdText').length); 
		$('#idTableText'+category+' #tdText').each(function(index3, value2) {
//			alert("disableTextField");
//			alert($(this).find('input:text'));
			$(this).find('input:text').prop("readonly", true);
//			$(this).prop("disabled", true); 
			$(this).find('input:text').prop("value", parseFloat(100/lengthTab).toFixed(2));
			
			//var currentRow = productRecommendation[category];
			productRecommendation[category].selectAll = "Yes";			
			for(var j=0;j<productRecommendation[category].productValue.length;j++){
				productRecommendation[category].productValue[j] = parseFloat(100/lengthTab).toFixed(2);
			}			
			
			sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
			console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
			//console.log(JSON.stringify(currentRow));			
			//productRecommendation[category] = currentRow;			
			//$.each(productRecommendation,function(index, rowValue) {
				//console.log(rowValue);
			//});			
			changeLabel(category,index3,(100/lengthTab),lengthTab);
		});
	}

	function enableTextField(category) {
//		alert("enableTextField");
		$('#idTableText'+category+' #tdText').each(function(index3, value2) {
//			alert("enableTextField");
//			alert($(this));
			$(this).find('input:text').prop("value","");
			$(this).find('input:text').prop("readonly", false);
			$('#idTable'+category+' #lump').each(function(indexlump, valuelump) {
				$(this).text("0.00");
			});
			
			//var currentRow = productRecommendation[category];
			productRecommendation[category].selectAll = "No";			
			for(var j=0;j<productRecommendation[category].productValue.length;j++){
				productRecommendation[category].productValue[j] = 0.00;
			}
			
			for(var j=0;j<productRecommendation[category].sipAmount.length;j++){
				productRecommendation[category].sipAmount[j] = 0.00;
			}
			
			for(var j=0;j<productRecommendation[category].lumpsumAmt.length;j++){
				productRecommendation[category].lumpsumAmt[j] = 0.00;
			}
			
			sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
			console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
			//productRecommendation[category] = currentRow;

			$('#idTable'+category+' td#sip').each(function(indexSip, valueSip) {
				$(this).text("0.00");
			});


		});
	}
	$.each(lump,function(index, value) {
		$(document.body).on('change','#option'+index,function(){
			var optionVal = $(this).val();
			
			//track-here
			if(optionVal=="Yes") {
				disableTextField(index);
			} else {
//				alert("No clicked")
				enableTextField(index);
			}
			
			//console.log(JSON.stringify(productRecommendation));
			
			//setProductRecommendationTableForReport();
		});
	});

	var prodCount = 0;
	$.each(cashProd,function(index, value) {
		var cashCounter = prodCount;
		$(document).on("keyup", "#text_div"+cashCounter+"_subdiv"+index, function(){
			var val = this.value;
//			console.log(val);
			if(validate(cashCounter)) {
				changeLabel(cashCounter,index,val,cashProd.length);
				
				//var currentRow = productRecommendation[cashCounter];
				productRecommendation[cashCounter].productValue[index] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//productRecommendation[cashCounter] = currentRow;

				
				console.log(JSON.stringify(productRecommendation[cashCounter]));
				
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(cashCounter,index,0,cashProd.length);
			}
		});
	});
	if(cashProd.length > 0) {
		prodCount ++;
	}
//	console.log("ustd" + ustd);
	$.each(ustd,function(index2, value2) {
		var ustdCounter = prodCount;
		$(document).on("keyup", "#text_div"+ustdCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(ustdCounter)) {
				changeLabel(ustdCounter,index2,val,ustd.length);
				
				productRecommendation[ustdCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(ustdCounter,index2,0,ustd.length);
			}
			
		});
	});
	function validate(counter) {
		var perc = 0;
		$('#idTableText'+counter+' #tdText').each(function(index3, value2) {
			var val = $(this).find('input:text').val();
			console.log("val "+val);
			if(parseInt(val)>0) {
				perc = perc + parseInt(val);
				console.log("perc "+perc);
			}
		});
		console.log("perc total "+perc);
		if(perc > 100) {
			return false;
		}else{
			return true;
		}
	}
	if(ustd.length > 0) {
		prodCount ++;
	}
	$.each(std,function(index2, value2) {
		var stdCounter = prodCount;
		$(document).on("keyup", "#text_div"+stdCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(stdCounter)) {
				changeLabel(stdCounter,index2,val,std.length);
				
				productRecommendation[stdCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(stdCounter,index2,0,std.length);
			}
		});
	});
	if(std.length > 0) {
		prodCount ++;
	}
	$.each(ltd,function(index2, value2) {
		var ltdCounter = prodCount;
		$(document).on("keyup", "#text_div"+prodCount+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(ltdCounter)) {
				changeLabel(ltdCounter,index2,val,ltd.length);
				
				productRecommendation[ltdCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(ltdCounter,index2,0,ltd.length);
			}
		});
	});
	if(ltd.length > 0) {
		prodCount ++;
	}
	$.each(equityL,function(index2, value2) {
		var equityLCounter = prodCount;
		$(document).on("keyup", "#text_div"+equityLCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(equityLCounter)) {
				changeLabel(equityLCounter,index2,val,equityL.length);
				
				productRecommendation[equityLCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete				
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(equityLCounter,index2,0,equityL.length);
			}
		});
	});
	if(equityL.length > 0) {
		prodCount ++;
	}
	$.each(equityMS,function(index2, value2) {
		var equityMSCounter = prodCount;
		$(document).on("keyup", "#text_div"+equityMSCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(equityMSCounter)) {
				changeLabel(equityMSCounter,index2,val,equityMS.length);
				
				productRecommendation[equityMSCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(equityMSCounter,index2,0,equityMS.length);
			}
		});
	});
	if(equityMS.length > 0) {
		prodCount ++;
	}
	$.each(equityI,function(index2, value2) {
		var equityICounter = prodCount;
		$(document).on("keyup", "#text_div"+equityICounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(equityICounter)) {
				changeLabel(equityICounter,index2,val,equityI.length);
				
				productRecommendation[equityICounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(equityICounter,index2,0,equityI.length);
			}
		});
	});
	if(equityI.length > 0) {
		prodCount ++;
	}
	$.each(AlternativeP,function(index2, value2) {
		var AlternativePCounter = prodCount;
		$(document).on("keyup", "#text_div"+AlternativePCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(AlternativePCounter)) {
				changeLabel(AlternativePCounter,index2,val,AlternativeP.length);
				
				productRecommendation[AlternativePCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(AlternativePCounter,index2,0,AlternativeP.length);
			}
		});
	});
	if(AlternativeP.length > 0) {
		prodCount ++;
	}
	$.each(AlternativeReal,function(index2, value2) {
		var AlternativeRealCounter = prodCount;
		$(document).on("keyup", "#text_div"+AlternativeRealCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(AlternativeRealCounter)) {
				changeLabel(AlternativeRealCounter,index2,val,AlternativeReal.length);
				
				productRecommendation[AlternativeRealCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(AlternativeRealCounter,index2,0,AlternativeReal.length);
			}
		});
	});
	if(AlternativeReal.length > 0) {
		prodCount ++;
	}
	$.each(AlternativeOther,function(index2, value2) {
		var AlternativeOtherCounter = prodCount;
		$(document).on("keyup", "#text_div"+AlternativeOtherCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(AlternativeOtherCounter)) {
				changeLabel(AlternativeOtherCounter,index2,val,AlternativeOther.length);
				
				productRecommendation[AlternativeOtherCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(AlternativeOtherCounter,index2,0,AlternativeOther.length);
			}
		});
	});
	if(AlternativeOther.length > 0) {
		prodCount ++;
	}

//	alert(lump.length);
//	alert(sip.length);

	function changeLabel(category, subcategory, value,length) {
		
		console.log("Triggered category " + category + " subcategory " + subcategory +" value "+ value+" length "+length);
		
		$('#idTable'+category+' #lump').each(function(index3, value2) {
			var input = $(this),lumpval = input.text();
			console.log("input "+input);
			console.log("lumpval "+lumpval);
			var valuelump=lumpval;
			console.log("index3%length "+index3%length);
			console.log("subcategory "+subcategory);
			if ((index3%length) == subcategory) {
//				alert("lump[category]" + lump[category]);
				valuelump= value/100 * lump[category];
//				alert("valuelump" + valuelump);
				console.log("valuelump "+valuelump);
			}
			$(this).text((Math.round(parseFloat(valuelump).toFixed(2))));
			
			productRecommendation[category].lumpsumAmt[index3] = Math.round(parseFloat(valuelump).toFixed(2));
			console.log("productRecommendation[category].lumpsumAmt[index3] "+productRecommendation[category].lumpsumAmt[index3]);
			
			sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
			console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
			//console.log(JSON.stringify(JSON.stringify(productRecommendation[category]));
		});

		$('#idTable'+category+' td#sip').each(function(index3, value3) {
			var input = $(this),sipval = input.text();
			var valueop=sipval;
			if ((index3%length) == subcategory) {
//				alert("sip[category]" + sip[category]);
				valueop= value/100 * sip[category];
//				alert("valueop" + valueop);
			}
			$(this).text((Math.round(parseFloat(valueop).toFixed(2))));
			
			productRecommendation[category].sipAmount[index3] = Math.round(parseFloat(valueop).toFixed(2));
			
			sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
			console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
			//console.log(JSON.stringify(productRecommendation[category]));
		});

	}
	/*alert("Hi");

	var modal = document.getElementById('idPopUpProduct');
	alert("modal"+modal);

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxtnproduct1");
	alert("btn" + btn);
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
		
		//For Bugs
		 $(".Goals").empty();
		 $(".Goals").load("plan/gp/viewProductRecommend.html");
	}

//	When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
			
			//For Bugs
			 $(".Goals").empty();
 			 $(".Goals").load("plan/gp/viewProductRecommend.html");
		}
	}*/
	
	//setProductRecommendationTableForReport();
	
	/*function setProductRecommendationTableForReport(){
		var table_html = $('#idTableProdReco').html();		
		table_html = '<table width="102%" class="marginleft8px" id="idTableProdReco">'+table_html+'</table>';	
		$html =  $(table_html);  		
		
		$html.find('input[type=text]').each(function(index, elem) {	
			$(elem).replaceWith("<span>" + $('#'+$('input[type="text"]:eq('+index+')').attr('id')).val() + "</span>");
		});
		
		$html.find('select').each(function(index, elem) {
			$(this).replaceWith("<span>" + $('#'+$('select:eq('+index+')').attr('id')).val() + "</span>");
		});		
		
		$html.find('.noprint').remove();
		
		sessionStorage.setItem("ProductRecommendationTableForReport",$html.html());
//		console.log($html.html());
	}*/

	var modal = document.getElementById('idPopUpProductGenerate');

	// Get the button that opens the modal
	var btn = document.getElementById("idGenerate");

	// Get the <span> element that closes the modal
	var span1 = document.getElementById("idCloseGenerate");

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
		$(".onpopupscroller").css("overflow","hidden");
	    modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span1.onclick = function() {
		$(".onpopupscroller").css("overflow","visible");
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
	
	function downloadFile(date){
		loadLoader();
		setTimeout(function(){
			$.ajax({
				type : 'GET',
				url : REQUEST_URL_GP + '/getproductRecoDOCX',
				async : true,
				contentType:"application/json; charset=utf-8",
				data :  {
					"advisorId": advisorUserId, 
					"clientId": vClientId,
					"clientName":sessionStorage.getItem("SELECTED_CLIENT_NAME"),
					"goalId": 0,
			        "module": "PM", 
			        "date": date
				},
				dataType:"json",
				beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
				success : function(resp) {
					 var downloadURL = REQUEST_URL_GP + '/download-Goal-report?filename='+resp.fileName;
			 		 var a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					var fileName = ""+ resp.fileName + "";

					var xhr = new XMLHttpRequest();
					xhr.open( "GET", downloadURL, true);
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
					xhr.responseType = "blob";
					xhr.onload = function() {
						console.log("xhr.status "+xhr.status);
						if(xhr.status === 200){
						//Download start
						// IE
						if (window.navigator.msSaveOrOpenBlob)
		                {
							console.log("IE")
							 var blob = new Blob([xhr.response], {type: 'application/vnd.ms-word'});
		                    window.navigator.msSaveOrOpenBlob(blob, fileName);
		              
		               a.click();
		                }
		              else //Chrome and safari
		             {
		           	   console.log("Chrome and safari")
		           	   var url = window.URL.createObjectURL(xhr.response);  
		  				   a.href = url;
		  				   a.download = fileName;
		  				    a.click();
		  				    window.URL.revokeObjectURL(url);
		             }
						
						
						//Download End
					
						//delete==
			 	$.ajax({
		          type : 'GET',
		          url : REQUEST_URL_GP + '/reportGoalDelete?filename='+resp.fileName,
		          async : false,
		          contentType:"application/json; charset=utf-8",
		          dataType:"json",
		          beforeSend: function (xhr){ 
		      		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		          },
		        success : function(data) {
		   	   console.log(data.msg)
		    },
		      error : function(errorData) {
		     }
		  });  
				//===
				}			
						
			};

				xhr.send(); 		 
				hideLoader();
				},
				error : function(jqXHR,errorData) {
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
		        hideLoader();
				}
			}); 
			
			 },10);
	}
  
	}
	if(exit == true){/*
	//alert(advisorId);
	$('select').change(function() {
		//alert("hi");

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




	var jssor_5_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_5_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_5_SlideshowTransitions,
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


	var jssor_5_slider = new $JssorSlider$("jssor_5", jssor_5_options);


	$("#loadproduct").load("gp/Producttable.html");  


	var productpavdiv = $('.jssort05 div:nth-child(2) div:nth-child(2)>div');

	$(".productright").click(function(){
		if(productpavdiv.hasClass('pav'))
		{	       
			$(".Goals").empty();
			$(".Goals").load("plan/gp/viewYearlyCashflows.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");
			$(".glidnonglid").hide();
			$(".GPHeading").html("Yearly Cashflows");
			$(".product").removeClass("onclickbg");
			$(".yearly").addClass("onclickbg");

		};
	});

	$(".productleft").click(function(){
		if(productpavdiv.hasClass('pav'))
		{	       
			$(".Goals").empty();
			$(".Goals").load("plan/gp/viewAmountNeeded.html");
			$(".form-section-container").css("padding","18px 45px 72px 45px");

			$(".glidnonglid").hide();
			$(".GPHeading").html("Amount Needed");
			$("#amount").addClass("onclickbg");
			$(".product").removeClass("onclickbg");
		};
	});
	
	var option;
	$("#"+selectId).change(function(){
     option = $("#"+selectId).val();
    });
	
	var subAssetCategory;
	var tableString = "";
	var cashProd = [];
	var lump = [];
	var sip = [];
	var ustd = [];
	var std = [];
	var ltd = [];
	var equityL = [];
	var equityMS = [];
	var equityI = [];
	var AlternativeP = [];
	var AlternativeReal = [];
	var AlternativeOther = [];
	
	Sumit [don't delete required for report]
	var productRecommendation = [];
	var productRecommendationrow = {};
	var recommendateProduct = [];
	var recommendateProductValue = [];
	var sipAmount = [];
	var sipTennure = [];
	var lumpsumAmt = [];
    var JsonData;
    var selectId;
	var tableId;
	var k = 0;
	Sumit [don't delete required for report]	
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getProdReco?clientId='+vClientId+'&goalId='+goalId+
		'&mode='+selectedMode+'&lumpsumValue='+lumpsumForSIP+'&glideNonglideMode='+vglideNonglideMode+'&advisorId='+loggedUser.id,
		async: false,
		dataType: 'json',
		success: function (data) {
			JsonData = data;
			console.log(JsonData);			
			console.log( JSON.stringify(JsonData));
			//alert(JsonDAta);
			var prodLengthFlag = 0;
			$.each(data,function(index, value) {
				if(value.productName.length > 0) {
					prodLengthFlag = 1;
				}
			});
			if(prodLengthFlag == 0) {
				alert("Product Recommendation Master is not configured");
			}else {
				subAssetCategory = data.length;
				$.each(data,function(index, value) {
					var idTablleText = "idTableText" + index;
					lump.push(value.lumpsumAmt);
					sip.push(value.sipAmt);
					tableString = tableString + '<tr>' +
					'<td class="paddingleft5px">'+ value.subAssetClass +'</td>' +
					'<td class="widthtalign">'+ parseFloat(value.subAssetAlloPerc * 100).toFixed(2) +'</td>' +
					'<td colspan="2"><table width="100%" class="rp1" id="'+idTablleText+'">';
//					alert(tableString);
					
					recommendateProduct = [];
					recommendateProductValue = [];
					sipAmount = [];
					lumpsumAmt = [];
					sipTennure = [];
					
					$.each(value.productName,function(index1, value1) {
						var idtextField = "text_div"+index+"_subdiv"+index1;
						tableString = tableString + '<tr><td class="width52per">' + value1 + '</td>' +
						'<td align="center" id="tdText"><input type="text" class="form-control aligncenter" id="'+idtextField+'"/></td></tr>';
						if (value.subAssetClass == "Cash/Liquid") {
							cashProd.push(value1);
						}
						if (value.subAssetClass == "Ultra Short Term Debt") {
							ustd.push(value1);
						}
						if (value.subAssetClass == "Short Term Debt") {
							std.push(value1);

						}
						if (value.subAssetClass == "Long Term Debt") {
							ltd.push(value1);
						}
						if (value.subAssetClass == "Equity Large Cap") {
							equityL.push(value1);
						}
						if (value.subAssetClass == "Equity International") {
							equityI.push(value1);
						}
						if (value.subAssetClass == "Alternatives - Precious Metals") {
							AlternativeP.push(value1);
						}
						if (value.subAssetClass == "Alternatives - Real Estate") {
							AlternativeReal.push(value1);
						}
						if (value.subAssetClass == "Alternatives - Others") {
							AlternativeOther.push(value1);
						}
						if (value.subAssetClass == "Equity Mid and Small Cap") {
							equityMS.push(value1);
						}
						
					});
//					alert(tableString);
					selectId = "option"+index;
					tableId="idTable"+index;
					tableString = tableString + '</table></td>' +
					'<td class="width8per"> <select class="form-control" style="padding: 6px 4px 6px 4px" id="'+selectId+'"><option value="Yes">Yes</option><option value="No">No</option></select></td>' +
					'<td colspan="3" class="paddingleft17px"><table width="100%" height="184px" id="'+tableId+'">';
					//				alert(tableString);
					$.each(value.productName,function(index2, value2) {
						tableString = tableString + '<tr class="amtenur">' + 
						'<td id="lump" style="vertical-align:top">' + (parseFloat(value.lumpsumAmt/value.productName.length).toFixed(2))+'</td>'+
						'<td id="sip" style="vertical-align:top">' + (parseFloat(value.sipAmt/value.productName.length).toFixed(2)) +'</td>'+
						'<td style="padding-right: 16px">' + value.sipTenure+'</td></tr>';
						
						console.log("value2 "+value2);
						console.log("parseFloat(value.lumpsumAmt/value.productName.length "+parseFloat(value.lumpsumAmt/value.productName.length));
						console.log("parseFloat(value.sipAmt/value.productName.length "+parseFloat(value.sipAmt/value.productName.length));
						console.log("value.sipTenure "+value.sipTenure);
						console.log("index2 "+index2);
						
						
						recommendateProduct.push(value2);
						recommendateProductValue.push((parseFloat(value.lumpsumAmt/value.productName.length).toFixed(2)));
						sipAmount.push((parseFloat(value.sipAmt/value.productName.length).toFixed(2)));
						sipTennure.push(parseFloat(value.sipTenure));
						lumpsumAmt.push((parseFloat(value.lumpsumAmt/value.productName.length).toFixed(2)));
						
					});
//					alert(tableString);
					tableString = tableString + '</table></td></tr>';
					var YN = $("#"+selectId).val();
					productRecommendationrow = { 
												"subAssetClass" : value.subAssetClass,
												"subAssetAlloPerc" : parseFloat(value.subAssetAlloPerc * 100).toFixed(2),
												"productName" : recommendateProduct,
												"productValue" : recommendateProductValue,
												"selectAll" : YN,
												"sipAmount" : sipAmount,
												"sipTennure" : sipTennure,
												"lumpsumAmt" : lumpsumAmt
					};
					
					productRecommendation.push(productRecommendationrow);
					console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
					sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
					console.log("==============");
//					alert(tableString);
				});
//				alert(tableString);
				$("#idProductTable").append(tableString);
				$("#idProductTableModal").append(tableString);
			}
		}, 
		error: function (data) {
//			alert("error from Expense : getAnnualExpensesDetailed");
//			bootbox.alert("Failed to get Risk Details");
		}
	});	
	$("idGPProductRecoList").empty();
	 var el1 = document.getElementById("idGPProductRecoList");
	// load all the existing plans of advisor
	$.ajax({
		type: 'GET',
		url: serviceIP + "/clientservice/" + 'getAdvisorProductReco?advisorId='+loggedUser.id+'&module=GP',
		async: true,
		dataType: 'json',
        success: function (data) {
      //    alert("Success");
        	
          $.each(data,function(index, value) {
        	    
        	  var date = moment(value.recoSaveDate,'DD/MM/YYYY').format('DD/MM/YYYY');
        	   console.log("data.productPlan" + value.productPlan);
               var jsonSring = JSON.stringify(value.productPlan);
//               alert("jsonSring" + jsonSring);
               var node = document.createElement("li");
              // var para =document.createElement("p");
               var link = document.createElement("a");
               
               //alert(date);'
              
               var img = $('<img />').attr({
   	            'id': 'myImage'+k,
   	            'src': '../Common/assets/images/icons/download_Image.png',
   	            'width': 28,
   	            'height': 28
   	        }).appendTo(para);
   	        
               link.innerText = date;
               link.setAttribute('href', '#');
               link.setAttribute('style', 'cursor:pointer');
               link.setAttribute('id', 'idDownload'+k);
               node.appendChild(link);
               //node.appendChild(para);
               el1.appendChild(node);
               $("#idDownload"+k).on("click",function() {
           	   downloadFile(date);
           	});
               
              k++; 
          });
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
	var ob=[];
	var obarr={};
	$("#idProductReco").on("click", function(event) {

		 ob=[];
		 obarr={};
		var flag = 0;
		
		
		var errmsg = "Allocation of ";
		for(var j=0;j<productRecommendation.length;j++){
			obarr = productRecommendation[j];
			obarr.sipAmount.length = obarr.productName.length;
			obarr.lumpsumAmt.length = obarr.productName.length;
			var totalProductValue = 0; 
			$.each(obarr.productValue,function(index, value) {
				if(value != ""){
				totalProductValue = totalProductValue+parseFloat(value);
				console.log(" "+value);
				console.log("parseFloat(value) "+parseFloat(value));
				console.log("totalProductValue "+totalProductValue);
				}
				
			});
			var total = Math.round(totalProductValue);
			if(total !=  100){
				flag = 1;
				errmsg = errmsg + obarr.subAssetClass+", ";
			}
			console.log("flag "+flag);
			if(flag == 0){
			ob.push(obarr);
			console.log("enter ob "+ob.length);
			obarr = {};
			}
			console.log("final "+JSON.stringify(ob));
			
		}
		console.log("outside ob "+ob.length);
		if(flag == 1){
			errmsg = errmsg.replace(/,\s*$/, "");
			errmsg = errmsg+" not equal to 100"
			alert(errmsg);
		}
		if(flag == 0){
		var r = JSON.stringify(productRecommendation);
		console.log("r end  "+r);
		var jsonString1 = encodeURIComponent(JSON.stringify(productRecommendation));
	  
	   
	    console.log("JSON.stringify(ob) end  "+JSON.stringify(ob));
	    var jsonString = encodeURIComponent(JSON.stringify(ob));
	   

	
		$.ajax({
			type: 'GET',
			url: serviceIP + "/clientservice/" + 'saveAdvisorProductReco?advisorId='+loggedUser.id+'&module=GP&jsonData='+jsonString,
			async: true,
            success: function (data) {
              alert("saved successfully");
              $(".Goals").empty();
  			  $(".Goals").load("plan/gp/viewProductRecommend.html");
              if(data.option == 0){
              var date = moment(data.recoSaveDate,'DD/MM/YYYY').format('DD/MM/YYYY');
              var el = document.getElementById("idGPProductRecoList");
              var node = document.createElement("li");
              var link = document.createElement("a");
              link.innerText = "" + date;
              link.setAttribute('href', '#');
              link.setAttribute('style', 'cursor:pointer');
              link.setAttribute('id', 'idDownload'+k);
              node.appendChild(link);
              el.appendChild(node);
              
              $("#idDownload"+k).on("click",function() {
             	    downloadFile(date);
             	});
                 
              }
            },
            error: function(data) {
                alert("error" + data);
            }
        });
	  }
	});
	
	//console.log(JSON.stringify(productRecommendation));
	
	for(index = 0; index < subAssetCategory; index ++) {
		var tableId="idTable"+index;
		if(selectedMode == 1) {// When lumpsum is selected
			$('#idTableProdReco td:nth-child(7),#idTableProdReco th:nth-child(7)').hide().addClass('noprint');
			$('#idTableProdRecoModal td:nth-child(7),#idTableProdRecoModal th:nth-child(7)').hide().addClass('noprint');
			$('#'+tableId+' td:nth-child(2),#'+tableId+' th:nth-child(2)').hide().addClass('noprint');
		} else if (selectedMode == 2) {// When SIP is selected
			$('#idTableProdReco td:nth-child(6),#idTableProdReco th:nth-child(6)').hide().addClass('noprint');
			$('#idTableProdRecoModal td:nth-child(6),#idTableProdRecoModal th:nth-child(6)').hide().addClass('noprint');
			$('#'+tableId+' td:nth-child(1),#'+tableId+' th:nth-child(1)').hide().addClass('noprint');
		}
	}
	
	$.each(lump,function(index, value) {
		disableTextField(index);
	});

//	alert("subAssetCategory" + subAssetCategory);
	function disableTextField(category) {
					
		// division by 2 because table is appended two times
		var lengthTab = ($('#idTableText'+category+' #tdText').length)/2; 
		$('#idTableText'+category+' #tdText').each(function(index3, value2) {
//			alert("disableTextField");
//			alert($(this).find('input:text'));
			$(this).find('input:text').prop("readonly", true);
//			$(this).prop("disabled", true); 
			$(this).find('input:text').prop("value", parseFloat(100/lengthTab).toFixed(2));
			
			//var currentRow = productRecommendation[category];
			productRecommendation[category].selectAll = "Yes";			
			for(var j=0;j<productRecommendation[category].productValue.length;j++){
				productRecommendation[category].productValue[j] = parseFloat(100/lengthTab).toFixed(2);
			}			
			
			sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
			console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
			//console.log(JSON.stringify(currentRow));			
			//productRecommendation[category] = currentRow;			
			//$.each(productRecommendation,function(index, rowValue) {
				//console.log(rowValue);
			//});			
			changeLabel(category,index3,(100/lengthTab),lengthTab);
		});
	}

	function enableTextField(category) {
//		alert("enableTextField");
		$('#idTableText'+category+' #tdText').each(function(index3, value2) {
//			alert("enableTextField");
//			alert($(this));
			$(this).find('input:text').prop("value","");
			$(this).find('input:text').prop("readonly", false);
			$('#idTable'+category+' #lump').each(function(indexlump, valuelump) {
				$(this).text("0.00");
			});
			
			//var currentRow = productRecommendation[category];
			productRecommendation[category].selectAll = "No";			
			for(var j=0;j<productRecommendation[category].productValue.length;j++){
				productRecommendation[category].productValue[j] = 0.00;
			}
			
			for(var j=0;j<productRecommendation[category].sipAmount.length;j++){
				productRecommendation[category].sipAmount[j] = 0.00;
			}
			
			for(var j=0;j<productRecommendation[category].lumpsumAmt.length;j++){
				productRecommendation[category].lumpsumAmt[j] = 0.00;
			}
			
			sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
			console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
			//productRecommendation[category] = currentRow;

			$('#idTable'+category+' td#sip').each(function(indexSip, valueSip) {
				$(this).text("0.00");
			});


		});
	}
	$.each(lump,function(index, value) {
		$(document.body).on('change','#option'+index,function(){
			var optionVal = $(this).val();
			
			//track-here
			if(optionVal=="Yes") {
				disableTextField(index);
			} else {
//				alert("No clicked")
				enableTextField(index);
			}
			
			//console.log(JSON.stringify(productRecommendation));
			
			//setProductRecommendationTableForReport();
		});
	});

	var prodCount = 0;
	$.each(cashProd,function(index, value) {
		var cashCounter = prodCount;
		$(document).on("keyup", "#text_div"+cashCounter+"_subdiv"+index, function(){
			var val = this.value;
//			console.log(val);
			if(validate(cashCounter)) {
				changeLabel(cashCounter,index,val,cashProd.length);
				
				//var currentRow = productRecommendation[cashCounter];
				productRecommendation[cashCounter].productValue[index] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//productRecommendation[cashCounter] = currentRow;

				
				console.log(JSON.stringify(productRecommendation[cashCounter]));
				
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(cashCounter,index,0,cashProd.length);
			}
		});
	});
	if(cashProd.length > 0) {
		prodCount ++;
	}
//	console.log("ustd" + ustd);
	$.each(ustd,function(index2, value2) {
		var ustdCounter = prodCount;
		$(document).on("keyup", "#text_div"+ustdCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(ustdCounter)) {
				changeLabel(ustdCounter,index2,val,ustd.length);
				
				productRecommendation[ustdCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(ustdCounter,index2,0,ustd.length);
			}
			
		});
	});
	function validate(counter) {
		var perc = 0;
		$('#idTableText'+counter+' #tdText').each(function(index3, value2) {
			var val = $(this).find('input:text').val();
			console.log("val "+val);
			if(parseInt(val)>0) {
				perc = perc + parseInt(val);
				console.log("perc "+perc);
			}
		});
		console.log("perc total "+perc);
		if(perc > 100) {
			return false;
		}else{
			return true;
		}
	}
	if(ustd.length > 0) {
		prodCount ++;
	}
	$.each(std,function(index2, value2) {
		var stdCounter = prodCount;
		$(document).on("keyup", "#text_div"+stdCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(stdCounter)) {
				changeLabel(stdCounter,index2,val,std.length);
				
				productRecommendation[stdCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(stdCounter,index2,0,std.length);
			}
		});
	});
	if(std.length > 0) {
		prodCount ++;
	}
	$.each(ltd,function(index2, value2) {
		var ltdCounter = prodCount;
		$(document).on("keyup", "#text_div"+prodCount+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(ltdCounter)) {
				changeLabel(ltdCounter,index2,val,ltd.length);
				
				productRecommendation[ltdCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(ltdCounter,index2,0,ltd.length);
			}
		});
	});
	if(ltd.length > 0) {
		prodCount ++;
	}
	$.each(equityL,function(index2, value2) {
		var equityLCounter = prodCount;
		$(document).on("keyup", "#text_div"+equityLCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(equityLCounter)) {
				changeLabel(equityLCounter,index2,val,equityL.length);
				
				productRecommendation[equityLCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete				
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(equityLCounter,index2,0,equityL.length);
			}
		});
	});
	if(equityL.length > 0) {
		prodCount ++;
	}
	$.each(equityMS,function(index2, value2) {
		var equityMSCounter = prodCount;
		$(document).on("keyup", "#text_div"+equityMSCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(equityMSCounter)) {
				changeLabel(equityMSCounter,index2,val,equityMS.length);
				
				productRecommendation[equityMSCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(equityMSCounter,index2,0,equityMS.length);
			}
		});
	});
	if(equityMS.length > 0) {
		prodCount ++;
	}
	$.each(equityI,function(index2, value2) {
		var equityICounter = prodCount;
		$(document).on("keyup", "#text_div"+equityICounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(equityICounter)) {
				changeLabel(equityICounter,index2,val,equityI.length);
				
				productRecommendation[equityICounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(equityICounter,index2,0,equityI.length);
			}
		});
	});
	if(equityI.length > 0) {
		prodCount ++;
	}
	$.each(AlternativeP,function(index2, value2) {
		var AlternativePCounter = prodCount;
		$(document).on("keyup", "#text_div"+AlternativePCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(AlternativePCounter)) {
				changeLabel(AlternativePCounter,index2,val,AlternativeP.length);
				
				productRecommendation[AlternativePCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(AlternativePCounter,index2,0,AlternativeP.length);
			}
		});
	});
	if(AlternativeP.length > 0) {
		prodCount ++;
	}
	$.each(AlternativeReal,function(index2, value2) {
		var AlternativeRealCounter = prodCount;
		$(document).on("keyup", "#text_div"+AlternativeRealCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(AlternativeRealCounter)) {
				changeLabel(AlternativeRealCounter,index2,val,AlternativeReal.length);
				
				productRecommendation[AlternativeRealCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));//used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(AlternativeRealCounter,index2,0,AlternativeReal.length);
			}
		});
	});
	if(AlternativeReal.length > 0) {
		prodCount ++;
	}
	$.each(AlternativeOther,function(index2, value2) {
		var AlternativeOtherCounter = prodCount;
		$(document).on("keyup", "#text_div"+AlternativeOtherCounter+"_subdiv"+index2, function(){
			var val = this.value;
//			console.log(val);
			if(validate(AlternativeOtherCounter)) {
				changeLabel(AlternativeOtherCounter,index2,val,AlternativeOther.length);
				
				productRecommendation[AlternativeOtherCounter].productValue[index2] = val;
				
				sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
				console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
				//setProductRecommendationTableForReport();
			} else {
				//bootbox.alert("Allocation % cannot be greater than 100");
				alert("Allocation % cannot be greater than 100");
				this.value = 0;
				changeLabel(AlternativeOtherCounter,index2,0,AlternativeOther.length);
			}
		});
	});
	if(AlternativeOther.length > 0) {
		prodCount ++;
	}

//	alert(lump.length);
//	alert(sip.length);

	function changeLabel(category, subcategory, value,length) {
		
		console.log("Triggered category " + category + " subcategory " + subcategory +" value "+ value+" length "+length);
		
		$('#idTable'+category+' #lump').each(function(index3, value2) {
			var input = $(this),lumpval = input.text();
			console.log("input "+input);
			console.log("lumpval "+lumpval);
			var valuelump=lumpval;
			console.log("index3%length "+index3%length);
			console.log("subcategory "+subcategory);
			if ((index3%length) == subcategory) {
//				alert("lump[category]" + lump[category]);
				valuelump= value/100 * lump[category];
//				alert("valuelump" + valuelump);
				console.log("valuelump "+valuelump);
			}
			$(this).text((parseFloat(valuelump).toFixed(2)));
			
			productRecommendation[category].lumpsumAmt[index3] = (parseFloat(valuelump).toFixed(2));
			console.log("productRecommendation[category].lumpsumAmt[index3] "+productRecommendation[category].lumpsumAmt[index3]);
			
			sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
			console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
			//console.log(JSON.stringify(JSON.stringify(productRecommendation[category]));
		});

		$('#idTable'+category+' td#sip').each(function(index3, value3) {
			var input = $(this),sipval = input.text();
			var valueop=sipval;
			if ((index3%length) == subcategory) {
//				alert("sip[category]" + sip[category]);
				valueop= value/100 * sip[category];
//				alert("valueop" + valueop);
			}
			$(this).text((parseFloat(valueop).toFixed(2)));
			
			productRecommendation[category].sipAmount[index3] = parseFloat(valueop).toFixed(2);
			
			sessionStorage.setItem("productRecommendation", JSON.stringify(productRecommendation));////used for gp report don't delete
			console.log("JSON.stringify(productRecommendation) "+JSON.stringify(productRecommendation));
			//console.log(JSON.stringify(productRecommendation[category]));
		});

	}


	var modal = document.getElementById('idPopUpProduct');

//	Get the button that opens the modal
	var btn = document.getElementById("idMaxtnproduct");

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
	
	//setProductRecommendationTableForReport();
	
	function setProductRecommendationTableForReport(){
		var table_html = $('#idTableProdReco').html();		
		table_html = '<table width="102%" class="marginleft8px" id="idTableProdReco">'+table_html+'</table>';	
		$html =  $(table_html);  		
		
		$html.find('input[type=text]').each(function(index, elem) {	
			$(elem).replaceWith("<span>" + $('#'+$('input[type="text"]:eq('+index+')').attr('id')).val() + "</span>");
		});
		
		$html.find('select').each(function(index, elem) {
			$(this).replaceWith("<span>" + $('#'+$('select:eq('+index+')').attr('id')).val() + "</span>");
		});		
		
		$html.find('.noprint').remove();
		
		sessionStorage.setItem("ProductRecommendationTableForReport",$html.html());
//		console.log($html.html());
	}

	function downloadFile(date){
		loadLoader();
		setTimeout(function(){
			$.ajax({
				type : 'GET',
				url : REQUEST_URL_GP + '/getproductRecoDOCX',
				async : true,
				contentType:"application/json; charset=utf-8",
				data :  {
				"advisorId": loggedUser.id, 
		        "module": "GP", 
		        "date": date
				},
				dataType:"json",
				success : function(resp) {
					 var downloadURL = REQUEST_URL_GP + '/download-Goal-report?filename='+resp.fileName;
			 		 var a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					var fileName = ""+ resp.fileName + "";

					var xhr = new XMLHttpRequest();
					xhr.open( "GET", downloadURL, true);
					
					xhr.responseType = "blob";
					xhr.onload = function() {
						console.log("xhr.status "+xhr.status);
						if(xhr.status === 200){
						//Download start
						// IE
						if (window.navigator.msSaveOrOpenBlob)
		                {
							console.log("IE")
							 var blob = new Blob([xhr.response], {type: 'application/vnd.ms-word'});
		                    window.navigator.msSaveOrOpenBlob(blob, fileName);
		              
		               a.click();
		                }
		              else //Chrome and safari
		             {
		           	   console.log("Chrome and safari")
		           	   var url = window.URL.createObjectURL(xhr.response);  
		  				   a.href = url;
		  				   a.download = fileName;
		  				    a.click();
		  				    window.URL.revokeObjectURL(url);
		             }
						
						
						//Download End
					
						//delete==
			 	$.ajax({
		          type : 'GET',
		          url : REQUEST_URL_GP + '/reportGoalDelete?filename='+resp.fileName,
		          async : false,
		          contentType:"application/json; charset=utf-8",
		          dataType:"json",
		        success : function(data) {
		   	   console.log(data.msg)
		    },
		      error : function(errorData) {
		    }
		  });  
				//===
				}			
						
			};

				xhr.send(); 		 
				hideLoader();
				},
				error : function(errorData) {
		       hideLoader();
				}
			}); 
			
			 },10);
	}
  */}
});
function loadLoader(){	
	   // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"><span class="fa fa-refresh fa-spin"></span> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';
	    var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"> <img src="../Common/assets/images/icons/processing-gif-14.gif" alt="Loader" width="42" height="42"> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	   // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;">Processing... </h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	   
	   $("#overlayLoading").html(ineerHtml).css({'display':'block'});		
}

function hideLoader(){
	$("#overlayLoading").css({'display':'none'}).html("");
}

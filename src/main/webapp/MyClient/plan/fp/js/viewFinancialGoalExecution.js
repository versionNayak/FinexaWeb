var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
var advisorUserId;
var advisorMasterId;
jQuery(document).ready(function ($) {

	if(loggedUser == null && loggedClient != null){
		$('td:nth-child(4),th:nth-child(4)').hide();
		advisorUserId = loggedClient.userId;
		advisorMasterId = loggedClient.advisorMasterID;
	}else{
		$('td:nth-child(4),th:nth-child(4)').show();
		advisorUserId = loggedUser.advisorID;
		advisorMasterId = loggedUser.advisorMasterId;
	}
	
	var jssor_2_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2},

		];


	var jssor_2_options = {
			$AutoPlay: 1,
			$SlideshowOptions: {
				$Class: $JssorSlideshowRunner$,
				$Transitions: jssor_2_SlideshowTransitions,
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


	var jssor_2_slider = new $JssorSlider$("jssor_2", jssor_2_options);



	var riskpavdiv = $('.jssort02 div:nth-child(2) div:nth-child(2)>div');

	$(".riskright").click(function(){

		if(riskpavdiv.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewInsurancePlanning.html");
			$(".form-section-container").css("padding","18px 45px 135px 45px");
			$(".glidnonglid").show();
			$("#idHeading").html("Insurance Planning");
			$(".fpgoalexecution").removeClass("activeitem");
			$(".fpinsuranceplanning").addClass("activeitem");

		};
	});

	$(".riskleft").click(function(){

		if(riskpavdiv.hasClass('pav'))
		{	       
			$("#idBody").empty();
			$("#idBody").load("plan/fp/viewFinancialGoalRecommendation.html");
			$(".form-section-container").css("padding","27px 45px 112px");
			$(".glidnonglid").hide();
			$("#idHeading").html("Goal Recommendation");
			$(".fpgoalexecution").removeClass("activeitem");
			$(".fpgoalrecommendations").addClass("activeitem");
		};
	});

});

var goalList;
var tableString = "";
var selectedGoalName = "";
var goalDesc = [];
var subAssetCategory;
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

//Piyali [don't delete required for FP report]
var productRecommendation = [];
var productRecommendationrow = {};
var recommendateProduct = [];
var recommendedIsin = [];
var recommendateProductValue = [];
var sipAmount = [];
var sipTennure = [];
var lumpsumAmt = [];
//==========================================
var displayFlag = 0;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var k = 0;


function loadProductReco(saveDate) {
	
	var date = saveDate.replace(/\//g, "");
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var serviceurlForLoadingSavedReco = "getLastSavedProductReco/"+advisorUserId+"/" + selectedClientId + "/" + goalId + "/FPGE/"+date;
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
//			alert("subAssetCategory" + subAssetCategory);
			$.each(data,function(index, value) {
				var idTablleText = "idTableText" + index;
				var sumLumpsum = 0;
				for (var lumpIndex = 0; lumpIndex < value.lumpsumAmt.length; lumpIndex ++) {
					sumLumpsum = sumLumpsum + value.lumpsumAmt[lumpIndex];
				}
				lump.push(sumLumpsum);
//				alert("sumLumpsum" + sumLumpsum);
				var sumSip = 0;
				for (var sipIndex = 0; sipIndex < value.sipAmount.length; sipIndex ++) {
					sumSip = sumSip + value.sipAmount[sipIndex];
				}
				sip.push(sumSip);
				tableString = tableString + '<tr>' +
				'<td class="paddingleft5px">'+ value.subAssetClass +'</td>' +
				'<td class="widthtalign">'+ value.subAssetAlloPerc +'</td>' +
				'<td colspan="5"><table width="100%" class="rp1" id="'+idTablleText+'">';
				
				var productLength = value.productName.length;
				for (var prodIndex = 0; prodIndex < productLength; prodIndex ++) {
					if (value.productValue[prodIndex] > 0) {
						var idtextField = "text_div"+index+"_subdiv"+prodIndex;
						tableString = tableString + '<tr><td style="width:330px;">' + value.productName[prodIndex] + '</td>' +
						'<td align="center" id="tdText">'+ value.productValue[prodIndex] + '</td>';
						tableString = tableString + '<td id="lump" style="vertical-align:top;width:230px;" >' + maskAmountValue(Math.round(value.lumpsumAmt[prodIndex])) +'</td>';
						tableString = tableString + '<td id="sip" style="vertical-align:top;width:230px;">' + maskAmountValue(Math.round(value.sipAmount[prodIndex])) +'</td>';
						tableString = tableString + '<td id="sip" style="vertical-align:top;">' + value.sipTennure[prodIndex] +'</td>';
					}
				}
				tableString = tableString + '</table></td></tr>';
				selectId = "option"+index;
				tableId="idTable"+index;
				
			});
			$("#idSavedProductTable").html("");
			$("#idSavedProductTable").append(tableString);
		}
	}
	
}

function loadGoal(goalId, index){
	productRecommendation = [];
	productRecommendationrow = {};
	recommendateProduct = [];
	recommendedIsin = [];
	recommendateProductValue = [];
	sipAmount = [];
	sipTennure = [];
	lumpsumAmt = [];
	//loadLoader();
	$("#goalExecutionHeading").text(goalDesc[index]);

	// calling LumpsumList
	tableString="";
	$("#idProductTable").empty();
	$("#idLumpTable").empty();
	$("#idSIPTable").empty();

	var lumpFlag = 0;
	$.ajax({
		type: 'GET',
		async : false,
		url: REQUEST_URL_FP + '/getGoalExecutionLumpsumList?clientId='+vClientId+'&goalId='+goalId,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		},
		success: function (data) {
			$.each(data,
					function(index, value) {
				$("#idLumpTable").append(
						'<tr><td>'+ value.finYear+ '</td><td>'+ 
						maskAmountValue(Math.round(value.cashLiquidPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.ultraShortTermDebtPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.shortTermDebtOerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.longTermDebtPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.equityLargePerc)) + '</td><td>'+
						/*maskAmountValue(Math.round(value.equityMidSmallPerc)) + '</td><td>'+*/
						maskAmountValue(Math.round(value.equityInternationalPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.alternativeOthersPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.alternativeRealExtatePerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.alternativePreciousPerc)) + '</td></tr>');
				if(value.cashLiquidPerc > 0 || value.ultraShortTermDebtPerc > 0 || 
						value.shortTermDebtOerc > 0 || value.longTermDebtPerc > 0 ||
						value.equityLargePerc > 0 || value.equityInternationalPerc > 0 || value.alternativeOthersPerc > 0 ||
						value.alternativeRealExtatePerc > 0 || value.alternativePreciousPerc > 0) {
					lumpFlag = 1;
				}
			});
			if(lumpFlag == 0) {
				$("#idLumpHeading").hide();
				$("#idLumpTableHeader").hide();
			} else {
				$("#idLumpHeading").show();
				$("#idLumpTableHeader").show();
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


	// callingSIPList
	$.ajax({
		type: 'GET',
		async : false,
		url: REQUEST_URL_FP + '/getGoalExecutionSIPList?clientId='+vClientId+'&goalId='+goalId,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		},
		success: function (data) {
			if(data.length == 0) {
				$("#idSipTableHeader").hide();
				$("#idSipHeading").hide();

			} else {
				$("#idSipTableHeader").show();
				$("#idSipHeading").show();
			}
			$.each(data,
					function(index, value) {
				$("#idSIPTable").append(
						'<tr><td>'+ value.finYear+ '</td><td>'+ 
						maskAmountValue(Math.round(value.cashLiquidPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.ultraShortTermDebtPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.shortTermDebtOerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.longTermDebtPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.equityLargePerc)) + '</td><td>'+
						/*maskAmountValue(Math.round(value.equityMidSmallPerc)) + '</td><td>'+*/
						maskAmountValue(Math.round(value.equityInternationalPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.alternativeOthersPerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.alternativeRealExtatePerc)) + '</td><td>'+
						maskAmountValue(Math.round(value.alternativePreciousPerc)) + '</td></tr>');
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
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	console.log("loggedUser "+loggedUser.id);
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
			//hideLoader();
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
		}
	});
	if(exit == true){
		//callingProductReco
		$.ajax({
			type: 'GET',
			async : false,
			url: REQUEST_URL_FP + '/getProductRecoFP?clientId='+vClientId+'&goalId='+goalId+'&advisorId='+advisorMasterId,
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			},
			success: function (data) {
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
						'<td class="paddingleft5px">'+ value.subAssetClass +'</td>' +
						'<td class="widthtalign">'+ parseFloat(value.subAssetAlloPerc * 100).toFixed(2) +'</td>' +
						'<td colspan="2"><table width="100%" class="rp1" id="'+idTablleText+'">';
//						alert(tableString);
						recommendateProduct = [];
						recommendedIsin = [];
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
//						alert(tableString);
						var selectId = "option"+index;
						var tableId="idTable"+index;
						tableString = tableString + '</table></td>' +
						'<td class="width8per"> <select class="form-control" id="'+selectId+'"><option>Yes</option><option>No</option></select></td>' +
						'<td colspan="3" class="paddingleft17px"><table width="100%" height="184px" id="'+tableId+'">';
						$.each(value.productName,function(index2, value2) {
							if (value.lumpsumAmt > 0) {
								displayFlag = 1;
							} else if (value.sipAmt > 0) {
								displayFlag = 1;
							} 
							tableString = tableString + '<tr class="amtenur">' + 
							'<td id="lump" style="vertical-align:top">' + maskAmountValue(Math.round(parseFloat(value.lumpsumAmt/value.productName.length).toFixed(2)))+'</td>'+
							'<td id="sip" style="vertical-align:top">' + maskAmountValue(Math.round(parseFloat(value.sipAmt/value.productName.length).toFixed(2))) +'</td>'+
							'<td style="padding-right: 16px">' + value.sipTenure+'</td></tr>';


							recommendateProduct.push(value2);
							recommendateProductValue.push((parseFloat(value.lumpsumAmt/value.productName.length).toFixed(2)));
							sipAmount.push(Math.round(parseFloat(value.sipAmt/value.productName.length).toFixed(2)));
							sipTennure.push(parseFloat(value.sipTenure));
							lumpsumAmt.push(Math.round(parseFloat(value.lumpsumAmt/value.productName.length).toFixed(2)));


						});
						$.each(value.isinList,function(index2, value2) {
							recommendedIsin.push(value2);
						});
//						alert(tableString);
						tableString = tableString + '</table></td></tr>';
//						alert(tableString);
						var YN = $("#"+selectId).val();
						// console.log("goalId "+goalId);

						productRecommendationrow = { 
								//"goalId":goalId,
								"subAssetClass" : value.subAssetClass,
								"subAssetAlloPerc" : parseFloat(value.subAssetAlloPerc * 100).toFixed(2),
								"productName" : recommendateProduct,
								"productValue" : recommendateProductValue,
								"productIsin" : recommendedIsin,
								"selectAll" : YN,
								"sipAmount" : sipAmount,
								"sipTennure" : sipTennure,
								"lumpsumAmt" : lumpsumAmt,
						};
						console.log("row "+productRecommendationrow.goalId);
						productRecommendation.push(productRecommendationrow);


						sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
					});
					$("#idProductTable").append(tableString);
				}
				//hideLoader();
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

		$("#idProductReco").on("click", function(event) {

			var ob=[];
			var obarr={};
			var flag = 0;
			var errmsg = "Allocations of ";
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
					url: serviceIP + "/clientservice/" + 'saveAdvisorProductReco?advisorId='+advisorUserId+'&clientId='+vClientId+'&goalId='+goalId+'&module=FPGE&jsonData='+jsonString,
					async: true,
					beforeSend: function (xhr){ 
						xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
					},
					success: function (data) {
						alert("saved successfully");
						$(".onpopupscroller").css("overflow","visible");
						var modal3 = document.getElementById('idpopEducationPG');
						modal3.style.display = "none";
						$("idFPGEProductRecoList").empty();
						$("#idpm").empty();
						$("#idpm").load("plan/fp/viewFinancialGoalExecution.html");
						/* if(data.option == 0){
             var date = moment(data.recoSaveDate,'DD/MM/YYYY').format('DD/MM/YYYY');
             var el = document.getElementById("idFPGEProductRecoList");
             var node = document.createElement("li");
             var link = document.createElement("a");
             link.innerText = "" + date;
             link.setAttribute('href', '#');
             link.setAttribute('style', 'cursor:pointer');
             link.setAttribute('id', 'idDownload'+k);
             node.appendChild(link);
             el.appendChild(node);

             $("#idDownload"+k).on("click",function() {
            	    downloadFile(date,goalId);
            	});

             }*/
					},
					error: function(jqXHR,data) {
						//alert("error" + data);
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
		});



		if (displayFlag == 0) {
			// hide product reco table
			$("#idTableProdReco").hide();
			$("#idProductRecoHeading").hide();
			$("#idProductReco").hide();

		} else {
			$("#idTableProdReco").show();
			$("#idProductRecoHeading").show();
			$("#idProductReco").show();
		}
		for(index = 0; index < subAssetCategory; index ++) {
			var tableId="idTable"+index;
			if(sip[0] == 0) {// When sip is selected
				$('#idTableProdReco td:nth-child(7),#idTableProdReco th:nth-child(7)').hide().addClass('noprint');
				$('#'+tableId+' td:nth-child(2),#'+tableId+' th:nth-child(2)').hide().addClass('noprint');
				$('#idTableProdReco td:nth-child(8),#idTableProdReco th:nth-child(8)').hide().addClass('noprint');
				$('#'+tableId+' td:nth-child(3),#'+tableId+' th:nth-child(3)').hide().addClass('noprint');

			}else {
				$('#idTableProdReco td:nth-child(7),#idTableProdReco th:nth-child(7)').show();
				$('#'+tableId+' td:nth-child(2),#'+tableId+' th:nth-child(2)').show();
				$('#idTableProdReco td:nth-child(8),#idTableProdReco th:nth-child(8)').show();
				$('#'+tableId+' td:nth-child(3),#'+tableId+' th:nth-child(3)').show();


			}
			if (lump[0] == 0) {// When lumpsum is selected
				$('#idTableProdReco td:nth-child(6),#idTableProdReco th:nth-child(6)').hide().addClass('noprint');
				$('#'+tableId+' td:nth-child(1),#'+tableId+' th:nth-child(1)').hide().addClass('noprint');
			} else {
				$('#idTableProdReco td:nth-child(6),#idTableProdReco th:nth-child(6)').show();
				$('#'+tableId+' td:nth-child(1),#'+tableId+' th:nth-child(1)').show();

			}
		}
		$.each(lump,function(index, value) {
			disableTextField(index);
		});

//		alert("subAssetCategory" + subAssetCategory);
		function disableTextField(category) {
			// division by 2 because table is appended two times
			var lengthTab = ($('#idTableText'+category+' #tdText').length); 
			$('#idTableText'+category+' #tdText').each(function(index3, value2) {
//				alert("disableTextField");
//				alert($(this).find('input:text'));
				$(this).find('input:text').prop("readonly", true);
//				$(this).prop("disabled", true); 
				$(this).find('input:text').prop("value", parseFloat(100/lengthTab).toFixed(2));
				productRecommendation[category].selectAll = "Yes";			
				for(var j=0;j<productRecommendation[category].productValue.length;j++){
					productRecommendation[category].productValue[j] = parseFloat(100/lengthTab).toFixed(2);
				}			

				sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
				changeLabel(category,index3,(100/lengthTab),lengthTab);
			});
		}

		function enableTextField(category) {
//			alert("enableTextField");
			$('#idTableText'+category+' #tdText').each(function(index3, value2) {
//				alert("enableTextField");
//				alert($(this));
				$(this).find('input:text').prop("value","");
				$(this).find('input:text').prop("readonly", false);
				$('#idTable'+category+' #lump').each(function(indexlump, valuelump) {
					$(this).text("0.00");
				});

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
				sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));


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
//					alert("No clicked")
					enableTextField(index);
				}
				//	setProductRecommendationTableForReport();
			});
		});

		var prodCount = 0;
		$.each(cashProd,function(index, value) {
			var cashCounter = prodCount;
			$(document).on("keyup", "#text_div"+cashCounter+"_subdiv"+index, function(){
				var val = this.value;
				console.log(val);
				if(validate(cashCounter)) {
					changeLabel(cashCounter,index,val,cashProd.length);

					productRecommendation[cashCounter].productValue[index] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
					//setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
					this.value = 0;
					changeLabel(cashCounter,index,0,cashProd.length);
				}
			});
		});
		if(cashProd.length > 0) {
			prodCount ++;
		}
		console.log("ustd" + ustd);
		$.each(ustd,function(index2, value2) {
			var ustdCounter = prodCount;
			$(document).on("keyup", "#text_div"+ustdCounter+"_subdiv"+index2, function(){
				var val = this.value;
				console.log(val);
				if(validate(ustdCounter)) {
					changeLabel(ustdCounter,index2,val,ustd.length);
					productRecommendation[ustdCounter].productValue[index2] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
					//	setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
					this.value = 0;
					changeLabel(ustdCounter,index2,0,ustd.length);
				}

			});
		});
		function validate(counter) {
			var perc = 0;
			$('#idTableText'+counter+' #tdText').each(function(index3, value2) {
				var val = $(this).find('input:text').val();
				if(parseInt(val)>0) {
					perc = perc + parseInt(val);
				}
			});
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
				console.log(val);
				if(validate(stdCounter)) {
					changeLabel(stdCounter,index2,val,std.length);

					productRecommendation[stdCounter].productValue[index2] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
					//setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
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
				console.log(val);
				if(validate(ltdCounter)) {
					changeLabel(ltdCounter,index2,val,ltd.length);

					productRecommendation[ltdCounter].productValue[index2] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));		
					//	setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
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
				console.log(val);
				if(validate(equityLCounter)) {
					changeLabel(equityLCounter,index2,val,equityL.length);
					productRecommendation[equityLCounter].productValue[index2] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));	
					//	setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
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
				console.log(val);
				if(validate(equityMSCounter)) {
					changeLabel(equityMSCounter,index2,val,equityMS.length);

					productRecommendation[equityMSCounter].productValue[index2] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
					//	setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
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
				console.log(val);
				if(validate(equityICounter)) {
					changeLabel(equityICounter,index2,val,equityI.length);

					productRecommendation[equityICounter].productValue[index2] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
					//setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
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
				console.log(val);
				if(validate(AlternativePCounter)) {
					changeLabel(AlternativePCounter,index2,val,AlternativeP.length);

					productRecommendation[AlternativePCounter].productValue[index2] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));

					//	setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
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
				console.log(val);
				if(validate(AlternativeRealCounter)) {
					changeLabel(AlternativeRealCounter,index2,val,AlternativeReal.length);

					productRecommendation[AlternativeRealCounter].productValue[index2] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
					//	setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
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
				console.log(val);
				if(validate(AlternativeOtherCounter)) {
					changeLabel(AlternativeOtherCounter,index2,val,AlternativeOther.length);

					productRecommendation[AlternativeOtherCounter].productValue[index2] = val;

					sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
					//	setProductRecommendationTableForReport();
				} else {
					bootbox.alert("Allocation % cannot be greater than 100");
					this.value = 0;
					changeLabel(AlternativeOtherCounter,index2,0,AlternativeOther.length);
				}
			});
		});
		if(AlternativeOther.length > 0) {
			prodCount ++;
		}

//		alert(lump.length);
//		alert(sip.length);

		function changeLabel(category, subcategory, value,length) {
//			alert("Triggered category" + category + "subcategory" + subcategory +"value"+ value);
			$('#idTable'+category+' #lump').each(function(index3, value2) {
				var input = $(this),lumpval = input.text();
				var valuelump=lumpval;
				if ((index3%length) == subcategory) {
//					alert("lump[category]" + lump[category]);
					valuelump= value/100 * lump[category];
//					alert("valuelump" + valuelump);
				}
				$(this).text(Math.round(parseFloat(valuelump).toFixed(2)));

				productRecommendation[category].lumpsumAmt[index3] = (parseFloat(valuelump).toFixed(2));

				sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));
			});

			$('#idTable'+category+' td#sip').each(function(index3, value3) {
				var input = $(this),sipval = input.text();
				var valueop=sipval;
				if ((index3%length) == subcategory) {
//					alert("sip[category]" + sip[category]);
					valueop= value/100 * sip[category];
//					alert("valueop" + valueop);
				}
				$(this).text(Math.round(parseFloat(valueop).toFixed(2)));

				productRecommendation[category].sipAmount[index3] = parseFloat(valueop).toFixed(2);
				sessionStorage.setItem("productRecommendationFinancial", JSON.stringify(productRecommendation));

			});

		}
	}
} 
var goalId;
var goalDescProductReco;
$("#idGoalCombo").change(function(e){
	// Your event handler
	var ddl = document.getElementById("idGoalCombo");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	goalId = selectedValue;
	goalDescProductReco = ddl.options[ddl.selectedIndex].text;
//	alert("goalDescProductReco" + goalDescProductReco);
	loadSavedRecoList();
	 $("#idProductRecoDetailsTable").empty();
});
function loadSavedRecoList() {
	var dataLength = 0;
	$("idGPProductRecoList").empty();
	 var el1 = document.getElementById("idGPProductRecoList");
	// load all the existing plans of advisor
	 $.ajax({
		type: 'GET',
		url: serviceIP + "/clientservice/" + 'getAdvisorProductReco?advisorId='+advisorUserId+'&clientId='+vClientId+'&goalId='+goalId+'&module=FPGE',
		 async: true,
		 dataType: 'json',
		 beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		 },
		 success: function (data) {
			 dataLength = data.length;
			 if (data.length == 0) {
				 if(loggedClient != null && loggedUser == null){
					 $("#idProductRecoDetailsTable").append("No saved product recommendations. Please contact advisor for further details.");
				 }else{
					 $("#idProductRecoDetailsTable").append("No saved product recommendations"); 
				 }
			 }else {
					 var serialNo = 1;
					 
					 if(loggedUser === null && loggedClient != null){
						 $("#idProductRecoDetailsTable").append('<tr>' +
								 '<td>' + (serialNo) +  '</td>' +
								 '<td>' + goalDescProductReco +  '</td>' +
								 '<td id ="idRecoSaveDate'+serialNo+'" >' + data[0].recoSaveDate +  '</td>' +
								 '<td style="text-align:center !important"><a id="idMaxtnproduct_'+serialNo+'" class="popup">View/</a> <a id="idDownload_'+serialNo+'">Download</a></td>' +
						 '</tr>');
					 }else{
						 $.each(data,function(index, value) {

							 $("#idProductRecoDetailsTable").append('<tr>' +
									 '<td>' + (serialNo) +  '</td>' +
									 '<td id ="idRecoSaveDate'+serialNo+'" >' + (value.recoSaveDate) +  '</td>' +
									 '<td style="text-align:center !important"><a id="idMaxtnproduct_'+serialNo+'" class="popup">View/</a> <a id="idDownload_'+serialNo+'">Download/</a> <a id="idInvest_'+serialNo+'">Invest</a></td>' +
							 '</tr>');
							 serialNo ++;
						 });
					   }
					 }
					
				 
				/* var serialNo = 1;
				 $.each(data,function(index, value) {

					 $("#idProductRecoDetailsTable").append('<tr>' +
							 '<td>' + (serialNo) +  '</td>' +
							 '<td>' + goalDescProductReco +  '</td>' +
							 '<td id ="idRecoSaveDate'+serialNo+'" >' + (value.recoSaveDate) +  '</td>' +
							 '<td style="text-align:center !important"><a id="idMaxtnproduct_'+serialNo+'" class="popup">View/</a> <a id="idDownload_'+serialNo+'">Download/</a> <a id="idInvest_'+serialNo+'">Invest</a></td>' +
					 '</tr>');
					 serialNo ++;
				 });
			 }*/
//			 alert("Hi");
             
			 for (var index = 1; index <= dataLength; index ++) {
				 var btnDownload = document.getElementById("idDownload_" + index);
				 btnDownload.onclick = function() {
					 var selectedButtonId = this.id;
					 var selectedIndex = selectedButtonId.indexOf("_");
					 var selectedLength = selectedButtonId.length;
					 var selectedId = selectedButtonId.substring((selectedIndex + 1),selectedLength);
					 var recoSaveDate = $("#idRecoSaveDate"+selectedId).text();
//					 alert("recoSaveDate" + recoSaveDate);
					 downloadFile(recoSaveDate);
				 }
			 }
			 if(loggedUser != null && loggedClient != null){
			 for (var index = 1; index <= dataLength; index ++) {
				 var btnDownload = document.getElementById("idInvest_" + index);
				 btnDownload.onclick = function() {
					 var selectedButtonId = this.id;
					 var selectedIndex = selectedButtonId.indexOf("_");
					 var selectedLength = selectedButtonId.length;
					 var selectedId = selectedButtonId.substring((selectedIndex + 1),selectedLength);
					 var recoSaveDate = $("#idRecoSaveDate"+selectedId).text();
					 sessionStorage.setItem("INVEST_DATE",recoSaveDate);
					 sessionStorage.setItem("SELECTED_GOAL_FOR_INVEST", goalId);
					 $("#dashbord").empty();
		        		$(".dashboardheading").html("Financial Planning");
		        		$("#dashbord").load("invest/fp.html");
				 }
			 }
		  }
			 
				var modal = document.getElementById('idPopUpProduct');
				
				for (var index = 1; index <= dataLength; index ++) {
//					Get the button that opens the modal
					var btn = document.getElementById("idMaxtnproduct_" + index);
					/*var element = document.getElementById ("idRecoSaveDate"+index);
					alert(element.innerText);
					recoSaveDate = element.innerText;*/
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
	
}

$(document).ready(function(){

	var holdingDrop = $("#idGoalCombo");
	holdingDrop.find('option').remove();
//	holdingDrop.append('<option value="">Select Tax Status</option>');
	$.ajax({
		type: 'GET',
		async : false,
		url: REQUEST_URL_GP + '/getClientGoalList?clientId='+vClientId,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			goalList = data.length;
			var serialNo = 1;
			$.each(data,function(index, value) {
				//	loadGoal(value.goalId);

				/* alert("len "+productRecommendation.length);
		           console.log("len "+productRecommendation.length);
		           for (var i = 0; i < productRecommendation.length; i++) {
		        	   console.log("goal id"+productRecommendation[i].goalId);
		        	   alert("goal id"+productRecommendation[i].goalId);

		        	}*/

				goalDesc.push(value.goalTypeName);
				var goalName = value.goalTypeName + "-" + value.goalDescName;
				if(loggedUser == null && loggedClient != null){
					$("#idGoalList").append('<tr><td>' + (serialNo ++) + '</td>' +
							'<td>'+ value.goalTypeName +'</td>'+
							'<td>'+ value.goalDescName +'</td></tr>');
				}else{
					$("#idGoalList").append('<tr><td>' + (serialNo ++) + '</td>' +
							'<td>'+ value.goalTypeName +'</td>'+
							'<td>'+ value.goalDescName +'</td>'+
							'<td><div id="idmaxeducationpg'+index+'" class="popup"><a onclick="loadGoal('+value.goalId+','+index+');">Generate Execution Plan</a></div></td></tr>');
				}
				if (index == 0) {
					goalId = value.goalId;
					goalDescProductReco = goalName;
				}
				holdingDrop.append('<option value="' + value.goalId + '">' + value.goalDescName + '</option>');				
			});

		},
		error: function (jqXHR,data) {
			selectedGoalName = "";
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
	
	loadSavedRecoList();

	for(var indexModal=0; indexModal < goalList; indexModal++) {
		var modal3 = document.getElementById('idpopEducationPG');
		//Get the button that opens the modal
		var btn3 = document.getElementById('idmaxeducationpg'+indexModal);

		//Get the <span> element that closes the modal
		var span1 = document.getElementsByClassName("close"+indexModal)[0];

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
			 $("idFPGEProductRecoList").empty();
			 
			 $("#idpm").empty();
          	 $("#idpm").load("plan/fp/viewFinancialGoalExecution.html");
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal3) {
				modal3.style.display = "none";
				 $("idFPGEProductRecoList").empty();
				 
				 $("#idpm").empty();
	          	 $("#idpm").load("plan/fp/viewFinancialGoalExecution.html");
			}
		}
	}


	/*var modal3 = document.getElementById('idpopEducationPG');

	// Get the button that opens the modal
	var btn3 = document.getElementById('idmaxeducationpg');

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
	}*/
});



/**Execution car**/

/*var modal4 = document.getElementById('idpopcar');

//Get the button that opens the modal
var btn4 = document.getElementById('idmaxcar');

//Get the <span> element that closes the modal
var span4 = document.getElementsByClassName("close4")[0];

//When the user clicks the button, open the modal 
btn4.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal4.style.display = "block";
}*/

//When the user clicks on <span> (x), close the modal
/*span4.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal4.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal4) {
		modal4.style.display = "none";
	}
}*/

/**Execution all goals**/

/*var modal5 = document.getElementById('idpopallgoals');

//Get the button that opens the modal
var btn5 = document.getElementById('idmaxallgoals');

//Get the <span> element that closes the modal
var span5 = document.getElementsByClassName("close5")[0];

//When the user clicks the button, open the modal 
btn5.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
	modal5.style.display = "block";
}*/

//When the user clicks on <span> (x), close the modal
/*span5.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
	modal5.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal5) {
		modal5.style.display = "none";
	}
}*/

function downloadFile(date){
	var clientName = sessionStorage.getItem("SELECTED_CLIENT_NAME");
	console.log(goalId+ " " + advisorUserId + " " + vClientId + " " + clientName + " " + date);
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
				"clientName":clientName,
				"goalId": goalId,
		        "module": "FPGE", 
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
					if(xhr.status == 401){
			        	bootbox.alert({
			        	    message: "You are not authenticated",
			        	    callback: function () {
				        	  window.location = "../index.html";
			        	    }
			        	})
			        }
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
	      error : function(jqXHR,errorData) {
	    	  if(jqXHR.status == 401){
		        	bootbox.alert({
		        	    message: "You are not authenticated",
		        	    callback: function () {
			        	  window.location = "../index.html";
		        	    }
		        	})
		        }
	    }
	  });  
			//===
			}			
					
		};

			xhr.send(); 		 
			hideLoader();
			},
			error : function(jqXHR,errorData) {
	        hideLoader();
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
		
		 },10);
}
    function loadLoader(){	
	   // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"><span class="fa fa-refresh fa-spin"></span> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"> <img src="../Common/assets/images/icons/processing-gif-14.gif" alt="Loader" width="42" height="42"> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;">Processing... </h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    $("#overlayLoading").html(ineerHtml).css({'display':'block'});	
	}

	function hideLoader(){
		$("#overlayLoading").css({'display':'none'}).html("");
	}

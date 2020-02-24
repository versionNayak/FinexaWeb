  
	//  alert("loggedUser.portfolioManagement "+loggedUser.id);
	//  alert("loggedUser.portfolioManagement "+loggedUser.portfolioManagement);
//$(".form-section-container").css("padding","18px 45px 636px");
var meetingID = [];
var taskID = [];
var edit_delete_Id;
var editDeleteTaskId;
var TA=0;
var TA1=0;
var TP=0;
var TP1=0;



var totalEquityPercentage=0;
var totalFixedIncomePercentage=0;
var totalCashPercentage=0;
var totalalAlternatePercentage=0;	
var totalCash1Percentage=0;
var totalRetiRementScemesPercentage=0;
var totalSmallSavingScemesPercentage=0;
var totalDepositBondsPercentage=0;
var totalMfEtfPmsPercentage=0;
var totalDirectEquityPercentage=0;
var totalAlternateinvestmentPercentage = 0;
var insuranceType;		
var asset;

$(document).ready(function () {
	
	
	  $(window).on('mouseover', (function () {
			window.onunload = window.onbeforeunload = null;
		}));
		$(window).on('mouseout', (function () {
			window.onunload = window.onbeforeunload = ConfirmLeave;
		}));
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		var loggedClient;
	   if(loggedUser == null){
	    loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	   }else{
	    loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	   }
	    function ConfirmLeave() {
	    	if(loggedClient != null && loggedUser == null){
				serviceurl = "logoutFinexaForClient?clientID="+loggedClient.id;
				getClientDataAsyncFalse("GET", "", serviceurl, onSuccess);
				function onSuccess(data) {
					sessionStorage.clear();
				}	
			}else if(loggedUser != null){
				serviceurl = "logoutFinexa?advisorUserId="+loggedUser.id;
				getClientDataAsyncFalse("GET", "", serviceurl, onSuccess);
				function onSuccess(data) {
					sessionStorage.clear();
				}
			}
	    		
	    		  window.location = "../index.html";
	    	}
	    
	    if((loggedUser != null) && (loggedUser.clientInfoAddEdit === null || loggedUser.clientInfoAddEdit === "N" )){
	    	$("#idaddmtngwindow").hide();
	    	$("#idaddmtngwindow2").hide();
	    }
	    
		var prevKey="";
		$(document).keydown(function (e) { 
			
		   /* if (e.key=="F5") {
		    	window.onunload = window.onbeforeunload = ConfirmLeave;
		    }else */
		     if (e.keyCode == 17 && e.keyCode == 87) {                
		    	window.onunload = window.onbeforeunload = ConfirmLeave;   
		    }else if (e.key.toUpperCase() == "W" && prevKey == "CONTROL") {
		    	window.onunload = window.onbeforeunload = ConfirmLeave;
		    }
		    /*else if (e.key.toUpperCase() == "R" && prevKey == "CONTROL") {
		    	window.onunload = window.onbeforeunload = ConfirmLeave;
		    }*/
		    else if (e.key.toUpperCase() == "F4" && (prevKey == "ALT" || prevKey == "CONTROL")) {
		    	window.onunload = window.onbeforeunload = ConfirmLeave;
		    }
		    prevKey = e.key.toUpperCase();
		 
		});
		var budgetManagementAccess = "N";
		var goalPlanningAccess = "N";
		var portfolioManagementAccess = "N";
	    var financialPlanningAccess = "N";
	    
	    
	    //1st block
	    var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	    if(selectedClientId != null){
	    getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
		function onRedisDataSuccess(data) {			
			
		 }
	    }
		
			if(loggedUser.budgetManagementView === "Y"){
				budgetManagementAccess = "Y";
			}
			
			if(loggedUser.goalPlanningView === "Y"){
				goalPlanningAccess = "Y";
			}
			
			if(loggedUser.portfolioManagementView === "Y"){
				portfolioManagementAccess = "Y";
			}
			
			if(loggedUser.financialPlanningView === "Y"){
				financialPlanningAccess = "Y";
			}
	
	//========================================================
	


	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	$("#idaddmtngdate,#idaddtaskDate,#ideditmtngDate,#idedittaskDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false,
		//startDate : new Date()	
	}).on('changeDate', function (ev) {
		var meetDate = $(this).val();
		if(isFutureDate(meetDate)){	
			$("#idStatusMeeting").val("Upcoming");
		}else{
			$("#idStatusMeeting").val("");
		}
		
		
	});
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});

	$('#timepicker11').datetimepicker({
        format: 'LT',
        stepping: 5
    });
	$('#timepicker12').datetimepicker({
		format: 'LT',
        stepping: 5
	});
	$('#timepicker13').datetimepicker({
		format: 'LT',
        stepping: 5
	});
    $('#timepicker14').datetimepicker({
        format: 'LT',
        stepping: 5
    });
	
	//=========================================

	if(portfolioManagementAccess === "Y"){
		
		populateAssetDrop($("#idSelectAssetList"));
	}	
	
	populateInsuranceDrop($("#idInsurancTypeList"));
	var nextbuttonClickFlag = 0;
    $("#idNext").click(function(){
    	viewOnDemandClients();
	});
	//===================start 1st block=========================//
    
    
	var timePeriodModalClientlist = 1;
	//allClients();
	function allClients(){
	var serviceurl = "clientMasterListDashBoard/"+loggedUser.id;
	getAdvisorClientData("GET", "", serviceurl, onSuccess);
	function onSuccess(data) {
		$("#idtotal_clients").text(data.length);
		$("#idClientListDashBoard").empty();
		$.each(data, function (index, client) {
			var middle;
			if (client.middleName == null) {
				middle = "";
			} else {
				if (client.middleName != null) {
					middle = " "+client.middleName;
				}
			}
			createdOn = moment(client.createdOn,'DD/MM/YYYY').format('DD-MMM-YY');
			
			$("#idClientListDashBoard").append('<tr>' +
				'<td>' +  client.firstName + middle + ' ' + client.lastName + '</td>' +
				/*'<td>' + serviceSubscribed + '</td>' +*/
				'<td>' + client.mobile + '</td>' +
				'<td>' + createdOn + '</td>' +
				'<td class="hidden"><input type="text" id="idclientId" name="clientId"  value=' + client.id + ' readonly="readonly"></td>' +
				'<td class="hidden"><input type="text" id="idclientName" name="clientName"  value="' + client.firstName + ' ' + client.lastName + '" readonly="readonly"></td>' +
				'<td class="hidden"><input type="text" id="idclientEmail" name="clientEmail"  value=' + client.emailId + ' readonly="readonly"></td>' +
				'<td class="hidden"><input type="text" id="idclientMobile" name="clientMobile"  value=' + client.mobile +' readonly="readonly"></td>' +

				'</tr>');
		});
	}
  }	
	viewOnDemandClients();
	var PMFlag = 0;
	function viewOnDemandClients(){
	var serviceurl = "getClientByOffset/"+loggedUser.id;
	getAdvisorClientData("GET", "", serviceurl, onSuccessOffset);
	function onSuccessOffset(data) {
		$("#idtotal_clients").text(data.totalClientSize);
			if(data.disableFlag === 'Y') {
				$('#idNext').prop('disabled', true);
			}else{
			   var msg = "using next button You can view more client's portfolio Details";
	      	   /*bootbox.alert({
		       message: msg
		    });*/
				$('#idNext').prop('disabled', false);
			}
		 PMFlag = 1;
		 if(portfolioManagementAccess === 'Y' && PMFlag === 1){
         	allClientsPortfolioDetails();
       }
		
	}
  }	
	 serviceurl = "addedClients/"+loggedUser.id+"/"+1;
	 getAdvisorClientData("GET", "", serviceurl, onSuccessData);
	  function onSuccessData(data) {
		  $("#idNo").html(data); 
	  }
	
	    $("#idClientsAdded").on('change', function(){
	    	 var val = $(this).val();
	    	  serviceurl = "addedClients/"+loggedUser.id+"/"+val;
	    	  getAdvisorClientData("GET", "", serviceurl, onSuccessClient);
	    	  function onSuccessClient(data) {
	    		  $("#idNo").html(data); 
	    	  }
		   
		 });
	    var timePeriodModalClientlist;
	    $("#idModalClientListTimePeriod").on('change', function(){
	    	var timePeriodModalClientlist = $(this).val();
	    	var serviceurl = "clientMasterListDashBoard/"+loggedUser.id +"/"+timePeriodModalClientlist;
	    	getAdvisorClientData("GET", "", serviceurl, onSuccess);
	    	function onSuccess(data) {
	    		$("#idClientListDashBoard").empty();
	    		$.each(data, function (index, client) {
	    			var middle;
	    			if (client.middleName == null) {
	    				middle = "";
	    			} else {
	    			if (client.middleName != null) {
	    				middle = " "+client.middleName;
	    			}
	    			}
	    			createdOn = moment(client.createdOn,'DD/MM/YYYY').format('DD-MMM-YY');
	    			
	    			$("#idClientListDashBoard").append('<tr>' +
	    				'<td>' +  client.firstName + middle + ' ' + client.lastName + '</td>' +
	    				'<td>' + client.mobile + '</td>' +
	    				'<td>' + createdOn + '</td>' +
	    				'<td class="hidden"><input type="text" id="idclientId" name="clientId"  value=' + client.id + ' readonly="readonly"></td>' +
	    				'<td class="hidden"><input type="text" id="idclientName" name="clientName"  value="' + client.firstName + ' ' + client.lastName + '" readonly="readonly"></td>' +
	    				'<td class="hidden"><input type="text" id="idclientEmail" name="clientEmail"  value=' + client.emailId + ' readonly="readonly"></td>' +
	    				'<td class="hidden"><input type="text" id="idclientMobile" name="clientMobile"  value=' + client.mobile +' readonly="readonly"></td>' +

	    				'</tr>');
	    		});
	    	}
		 });
	    
	          $("#idClientMasterDownload").click(function(){
					var a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					var fileName = "ClientMasterListforAdvisor.xlsx";
					var xhr = new XMLHttpRequest();
					serviceurl = "clientMasterListDownloadForAdvisor?UserID="+loggedUser.id;
					xhr.open( "GET", serviceIP + "/clientservice/clientMasterListDownloadForAdvisor/"+loggedUser.id,true);
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
					xhr.responseType = "blob";
					xhr.onload = function() {
						console.log("xhr.response "+xhr.response);
						var url = window.URL.createObjectURL(xhr.response);  
						a.href = url;
						a.download = fileName;
						a.click();
						window.URL.revokeObjectURL(url);
					};
					xhr.send();  
		
			});    
		 //===================end 1st block=========================//
		 //=================start 2nd and 3rd block===========================
          //if PM Access No
	          //if(portfolioManagementAccess === 'Y'){
	        //if PM Access No
	            // alert("PMFlag "+PMFlag);
	         
	        	 function allClientsPortfolioDetails(){
	        	 loadLoader();
			     var totalAsset=0;
			     var totalEquity=0;
			     var totalFixedIncome=0;
			     var totalCash=0;
			     var totalalAlternate=0;
			  
			    var totalCash1=0;
				var totalRetiRementScemes=0;
				var totalSmallSavingScemes=0;
				var totalDepositBonds=0;
				var totalMfEtfPms=0;
				var totalDirectEquity=0;
				var totalAlternateInvestment = 0;
				var totalAllProducttype=0;
				
				
		
				
				var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
				var id = loggedUser.id;
			    console.log("loggedUser.id "+loggedUser.id);
				$.ajax({
					type: 'GET',
					url: REQUEST_URL_PM+'/getClientNetworthByAdvisorId?advisorUserID='+loggedUser.id,
					async: true,
					dataType: 'json',
				    beforeSend: function (xhr){ 
				    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
					},
					success: function (data) {
						/*var msg = "number of clients "+data.length+" whose portfoliodetails are showing." +
								"using next button You can view more client's portfolio Details"
						bootbox.alert({
						    message: msg
						});*/
						$("#idAssetTypeWiseAUM").empty();
						$("#idProductTypeWiseAUM").empty();
						$.each(data, function (Key, Value) { 
						populateDetailsNetworth(Value);
						});
						
						totalAsset=(totalEquity+totalFixedIncome+totalCash+totalalAlternate);
					
						totalEquityPercentage = ((totalEquity/totalAsset)*100).toFixed(2);
						totalEquityPercentage=parseFloat(totalEquityPercentage);
						
						totalFixedIncomePercentage = ((totalFixedIncome/totalAsset)*100).toFixed(2);
						totalFixedIncomePercentage=parseFloat(totalFixedIncomePercentage);
						
						totalCashPercentage = ((totalCash/totalAsset)*100).toFixed(2);
						totalCashPercentage=parseFloat(totalCashPercentage);
						
						totalalAlternatePercentage = ((totalalAlternate/totalAsset)*100).toFixed(2);
						totalalAlternatePercentage=parseFloat(totalalAlternatePercentage);
		
						totalAllProducttype=totalCash1+totalRetiRementScemes+totalSmallSavingScemes+totalDepositBonds+totalMfEtfPms+totalDirectEquity+totalAlternateInvestment;
					
						totalCash1Percentage = ((totalCash1/totalAllProducttype)*100).toFixed(2);
						totalCash1Percentage=parseFloat(totalCash1Percentage);
						
						totalRetiRementScemesPercentage = ((totalRetiRementScemes/totalAllProducttype)*100).toFixed(2);
						totalRetiRementScemesPercentage=parseFloat(totalRetiRementScemesPercentage);
						
						totalSmallSavingScemesPercentage = ((totalSmallSavingScemes/totalAllProducttype)*100).toFixed(2);
						totalSmallSavingScemesPercentage=parseFloat(totalSmallSavingScemesPercentage);
						
						totalDepositBondsPercentage = ((totalDepositBonds/totalAllProducttype)*100).toFixed(2);
						totalDepositBondsPercentage=parseFloat(totalDepositBondsPercentage);
						
						totalMfEtfPmsPercentage = ((totalMfEtfPms/totalAllProducttype)*100).toFixed(2);
						totalMfEtfPmsPercentage=parseFloat(totalMfEtfPmsPercentage);
						
						totalDirectEquityPercentage = ((totalDirectEquity/totalAllProducttype)*100).toFixed(2);
						totalDirectEquityPercentage=parseFloat(totalDirectEquityPercentage);
						
						totalAlternateinvestmentPercentage =  ((totalAlternateinvestmentPercentage/totalAllProducttype)*100).toFixed(2);
						totalAlternateinvestmentPercentage = parseFloat(totalAlternateinvestmentPercentage);
					
						totalAllProducttype=(totalAllProducttype/10000000).toFixed(2);
					    totalAsset=(totalAsset/10000000).toFixed(2);
						$("#idTotalProductType").html("<b>Total:"+totalAllProducttype+"</b><span style='float:right'><b>AUM(Rs Crores)</b></span>");
						$("#idTotalAsset").html("<b>Total:"+totalAsset+"</b><span style='float:right'><b>AUM(Rs Crores)</b></span>");
					    onLoadAllPieCharts();
					    

					}, 
						error: function (data) {
					   // alert("error "+data.status);
                        hideLoader();
					}
					
				});	

				function populateDetailsNetworth(data)
				{
				////if(data.name=='Aarti Yadav'){
				var totalAssetMap={};
				var totalAssetValue=0;
				var equity=0;
				var fixedIncome=0;
				var cash=0;
				var alternate=0;
				var mFETFPMS=0;
				var directEquity=0;
				var depositBonds=0;
				var SmallSavingSchemes=0;
				var retirementOrientedSchemes=0;
				var alternateInvestments=0;
				var cash1=0;
				var totalAllAssetType=0;
				var totalassetType=0;
				
				
				
				$.each(data, function (mapKey, mapValue) { 
					if(mapKey=='totaltypeValueMap'){
						totalAssetMap["Investment Assets"] = mapValue["Investment"];
						totalAssetValue =((totalAssetMap["Investment Assets"] > 0)? totalAssetMap["Investment Assets"] : 0.00).toFixed(2);
					}
				});
				
				//console.log(JSON.stringify(data));
                var i=1;
				$.each(data, function (mapKey, mapValue) {
					var html1="";
					var totalAllProductType=0;
					//html1+="<tr><td>"+data.clientID+"</td>";
					html1+="<tr><td>"+data.name+"</td>";
					if(mapKey=='typeValueMap'){
						$.each(mapValue, function (key, value) {});	
					}
					
					   
					
					if(mapKey=='rootMap')
					{
						
						$.each(mapValue, function (assetindex, assets) { 
							var circleImageCount=1;
							if(assetindex=='Assets'){

								$.each(assets, function (typesubassetsindex, typesubassets) { 
									var total = 0;
									var totalInvestmentAsset = 0;
									var totalInvestmentAssetPercentage = 0;
									if(typesubassetsindex == 'Investment Assets'){
									
									
										
										
										var html="";
										///html+="<tr><td>"+data.clientID+"</td>"
										html+="<tr><td>"+data.name+"</td>";
										
									
										$.each(typesubassets, function (typesubassetsProductsindex, typesubassetsProducts) { 
											
											var totalProductType=0;
											$.each(typesubassetsProducts, function (productindex, productvalue) { 
												
												
												productvalue.currentValue = 0;
												$.each(productvalue.networthDetails, function (index, product) { 
													productvalue.currentValue = productvalue.currentValue+product.currentValue;
												});
												totalProductType =totalProductType+productvalue.currentValue;
												if(productvalue.productType=='MF / ETF / PMS'){
													
													if(productvalue.currentValue!=0)
													mFETFPMS +=productvalue.currentValue;
													totalAllProductType=totalAllProductType+productvalue.currentValue;
												}
						                        if(productvalue.productType=='Direct Equity'){
						                        	if(productvalue.currentValue!=0)
						            				directEquity +=productvalue.currentValue;
						                        	totalAllProductType=totalAllProductType+productvalue.currentValue;
												}
						                        if(productvalue.productType=='Deposit/Bonds'){
						                        	if(productvalue.currentValue!=0)
						            				depositBonds +=productvalue.currentValue;
						                        	totalAllProductType=totalAllProductType+productvalue.currentValue;
												}
						                        if(productvalue.productType=='Small Saving Schemes'){
						                        	if(productvalue.currentValue!=0)
						            				SmallSavingSchemes +=productvalue.currentValue;
						                        	totalAllProductType=totalAllProductType+productvalue.currentValue;
						                        }
						                        if(productvalue.productType=='Retirement Oriented Schemes'){
						                        	if(productvalue.currentValue!=0)
						            				retirementOrientedSchemes +=productvalue.currentValue;
						                        	totalAllProductType=totalAllProductType+productvalue.currentValue;
						                        }
						                    
						                        if(productvalue.productType=='Cash'){
						                        	if(productvalue.currentValue!=0)
						                        	cash1 +=productvalue.currentValue;
						                        	totalAllProductType=totalAllProductType+productvalue.currentValue;
						                        }
						                        if(productvalue.productType=='Alternate Investments'){
						                        	if(productvalue.currentValue!=0)
						                        	alternateInvestments +=productvalue.currentValue;
						                        	totalAllProductType=totalAllProductType+productvalue.currentValue;
						                        }
											
											});	
											
											if(typesubassetsProductsindex=='Cash'){
												if(totalProductType!=0)
												 //cash=maskAmountValue(totalProductType.toFixed(2));
													cash=totalProductType;
											}
                                           if(typesubassetsProductsindex=='Equity'){
                                        	   if(totalProductType!=0)
                                           	   //equity=maskAmountValue(totalProductType.toFixed(2));
                                        		  equity=totalProductType;
											}
                                           if(typesubassetsProductsindex=='FixedIncome'){	
                                        	   if(totalProductType!=0)
                               			      // fixedIncome=maskAmountValue(totalProductType.toFixed(2));
                                        		 fixedIncome=totalProductType;
											}
                                          if(typesubassetsProductsindex=='Alternate'){
                                        	  if(totalProductType!=0)
                              				 //alternate=maskAmountValue(totalProductType.toFixed(2));
                                        	  alternate=totalProductType;
                                           }
											
											totalAllAssetType=totalAllAssetType+totalProductType;
									
										});
										
											if(cash > 0){	
											 totalCash=totalCash+cash;
											}
									
                                     
                                        	 if(equity > 0 ){	
                                        	 totalEquity=totalEquity+equity;
                                          }
                                  
                                     
                                           if(fixedIncome > 0 ){	 
                                        	 totalFixedIncome=totalFixedIncome+fixedIncome;
                                           }
                                     
                                    
                                          if(alternate > 0){ 
                                        	 totalalAlternate=totalalAlternate+alternate;
                                          }
                                     
										
                                     
										
										/*html=html+"<td>"+maskAmountValue(Math.round(equity))+"</td><td>"+maskAmountValue(Math.round(fixedIncome))+"</td><td>"+maskAmountValue(Math.round(alternate))+"</td><td>"+maskAmountValue(Math.round(cash))+"</td><td>"+maskAmountValue(Math.round(totalAllAssetType))
										+"</td></tr>";*///
										
                                        
                            
										  /* html=html+"<td>"+(equity/10000000).toFixed(2)+"</td><td>"+(fixedIncome/10000000).toFixed(2)+
                                          "</td><td>"+(alternate/10000000).toFixed(2)+"</td><td>"+(cash/10000000).toFixed(2)+
                                          "</td><td>"+(totalAllAssetType/10000000).toFixed(2)+"</td></tr>";
                                          */
                                          
                                          TA=parseFloat((equity/10000000).toFixed(2))+parseFloat((fixedIncome/10000000).toFixed(2))+parseFloat((alternate/10000000).toFixed(2))+parseFloat((cash/10000000).toFixed(2));
                                          // TA1= (parseFloat(TA1)+ parseFloat(TA)).toFixed(2);
                                          
                                          
										  html=html+"<td>"+(equity/10000000).toFixed(2)+"</td><td>"+(fixedIncome/10000000).toFixed(2)+
                                          "</td><td>"+(alternate/10000000).toFixed(2)+"</td><td>"+(cash/10000000).toFixed(2)+
                                          "</td><td>"+TA.toFixed(2)+"</td></tr>";
										  
										  
										$("#idAssetTypeWiseAUM").append(html);
										
										//========================
										
										
				                       	 if(mFETFPMS > 0 ){	
				                       	totalMfEtfPms=totalMfEtfPms+mFETFPMS;
				                         }
				                    
				                     
				                         if(directEquity > 0 ){	 
				                         totalDirectEquity=totalDirectEquity+directEquity;
				                          }
				                     
				                         if(depositBonds > 0){ 
				                         totalDepositBonds=totalDepositBonds+depositBonds;
				                         }
				                         
				                         if(SmallSavingSchemes > 0){ 
				                         totalSmallSavingScemes=totalSmallSavingScemes+SmallSavingSchemes;
				                         }
				                         
				                         if(retirementOrientedSchemes > 0){ 
				                        totalRetiRementScemes=totalRetiRementScemes+retirementOrientedSchemes;
				                         }
				                         
				                         if(cash1 > 0){	
				     					totalCash1=totalCash1+cash1;
				     					}
				                       if(alternateInvestments > 0){
				                    	totalAlternateInvestment =  totalAlternateInvestment+alternateInvestments;  
				                       }
									
				                       TP=parseFloat((directEquity/10000000).toFixed(2))+parseFloat((mFETFPMS/10000000).toFixed(2))
				                         +parseFloat((depositBonds/10000000).toFixed(2))+parseFloat((SmallSavingSchemes/10000000).toFixed(2))
				                         +parseFloat((retirementOrientedSchemes/10000000).toFixed(2))+parseFloat((cash1/10000000).toFixed(2))
				                         +parseFloat((alternateInvestments/10000000).toFixed(2));
									   
                                       //TP1= (parseFloat(TP1)+ parseFloat(TP)).toFixed(2);
										
									/*	html1+="<td>"+maskAmountValue(Math.round(directEquity))+"</td><td>"+maskAmountValue(Math.round(mFETFPMS))+"</td>"+
										       "<td>"+maskAmountValue(Math.round(depositBonds))+"</td><td>"+maskAmountValue(Math.round(SmallSavingSchemes))+"</td>"+
										       "<td>"+maskAmountValue(Math.round(retirementOrientedSchemes))+"</td><td>"+maskAmountValue(Math.round(cash1))+"</td>"+
										       "<td>"+maskAmountValue(Math.round(alternateInvestments))+"<td>"+maskAmountValue(Math.round(totalAllProductType))+"</td></tr>";
										 */
                                       html1+="<td>"+(directEquity/10000000).toFixed(2)+"</td><td>"+(mFETFPMS/10000000).toFixed(2)+"</td>"+
								       "<td>"+(depositBonds/10000000).toFixed(2)+"</td><td>"+(SmallSavingSchemes/10000000).toFixed(2)+"</td>"+
								       "<td>"+(retirementOrientedSchemes/10000000).toFixed(2)+"</td><td>"+(cash1/10000000).toFixed(2)+"</td>"+
								       "<td>"+(alternateInvestments/10000000).toFixed(2)+"<td>"+TP.toFixed(2)+"</td></tr>";
								     
										
										$("#idProductTypeWiseAUM").append(html1);
										
										
										
										//==================
									}
								

								});
							}

						});
					}
				
				});

				//////}	
		console.log("========================");
		
		}

			
				 $("#idAssetWiseDownload").click(function(){
					  loadLoader();
					  /*getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
			          function onRedisDataSuccess(data) {			
						    //alert(data);
							}	*/         
							var a = document.createElement("a");
							document.body.appendChild(a);
							a.style = "display: none";
							var fileName = "AssetClassWiseAUM.xlsx";

							var xhr = new XMLHttpRequest();
							
							serviceurl =  REQUEST_URL_PM + "/getAssetClassWiseAUMDownload?userID="+loggedUser.id;
							
						
							xhr.open( "GET", serviceurl, true);
							xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
							xhr.responseType = "blob";
							xhr.onload = function() {
								console.log("xhr.response "+xhr.response);
								var url = window.URL.createObjectURL(xhr.response);  
								a.href = url;
								a.download = fileName;
								a.click();
								window.URL.revokeObjectURL(url);
								hideLoader();
							};
							xhr.send();  
				
					});
				 
				 $("#idProductTypeWiseDownload").click(function(){
						loadLoader();
					  /*getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
			          function onRedisDataSuccess(data) {			
								     		//alert(data);
						}*/	
			          
							var a = document.createElement("a");
							document.body.appendChild(a);
							a.style = "display: none";
							var fileName = "ProductTypeWiseAUM.xlsx";

							var xhr = new XMLHttpRequest();
							
							serviceurl =  REQUEST_URL_PM + "/getProductTypesWiseAUMDownload?userID="+loggedUser.id;
							
							
							xhr.open( "GET", serviceurl, true);
							xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
							xhr.responseType = "blob";
							xhr.onload = function() {
								console.log("xhr.response "+xhr.response);
								var url = window.URL.createObjectURL(xhr.response);  
								a.href = url;
								a.download = fileName;
								a.click();
								window.URL.revokeObjectURL(url);
								hideLoader();
							};
							xhr.send();  
				
					});
	          }//method end	 
				 
      // }//if PM Access yes			 
			  
//==================end 2nd and 3rd block block===========================	

			  
//==================end 2nd and 3rd block block===========================	
//==================start 4th block===================
	          if(portfolioManagementAccess === 'Y'){
				  var timePeriod=1;
				  var timePeriodModal=1;
				 
				 
				  /*serviceurl=REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodForAdvisor?advisorUserId='+loggedUser.id+'&specificRequermentStat='+specificRequermentStat+'&timePeriod='+timePeriod;
				  console.log("now serviceurl "+serviceurl);
				  var length=0;
				
				  $.ajax({
						type: 'GET',
						async : true,
						url: serviceurl,
						dataType: 'json',
						success: function (data) {
						
							var html="";
							length=data.length;
							
							$("#idAssetTable").empty();
							if(length>0){
							var bankIssuerName = "";
							$.each(data, function(key, value) {
								if(value.bankIssuerName != null)
									bankIssuerName = value.bankIssuerName;
								
								  $("#idAssetTable").append('<tr>' +
										  '<td>' + value.clientName + '</td>' +
										  '<td>' + value.productType + '</td>' +
										  '<td>' + value.productName + '</td>' +
										  '<td>' + bankIssuerName + '</td>' +
										  '<td>' + maskAmountValue(Math.round(value.currentValue)) + '</td>' +
										  '<td>' + maskAmountValue(Math.round(value.maturityAmount)) + '</td>' +
										  '<td>' + value.maturityDate + '</td>' +
						                '</tr>');
											   
		                     
							  });
							  
							}
						},
				   
				    	error: function (jqXHR, exception) {
				    	
					}
				  
				  });
				  */
				
				  specificRequermentStat="overview";
				  var bankIssuerName = "";
				  serviceurl=REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodAndAssetForAdvisor?advisorUserId='+loggedUser.id+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod;
				  var length=0;
				 
				  var bankIssuer;
				  $.ajax({
						type: 'GET',
						async : true,
						url: REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodAndAssetForAdvisor?advisorUserId='+loggedUser.id+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod,
						dataType: 'json',
					    beforeSend: function (xhr){ 
					    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
						},
						success: function (data) {
						   
							var html="";
							length=data.length;
							////alert("l "+data.length);
							$("#idAssetRow").empty();
							if(length>0){
								bankIssuerName = "";
							$.each(data, function(key, value) {
							//	alert("key "+key);
								if(value.bankIssuerName != null){
									if(value.bankIssuerName != ""){
									bankIssuerName = value.bankIssuerName;
									}
									else{
									bankIssuerName = value.productName;
									}
								}
								 bankIssuer = "";
								 bankIssuer = bankIssuerName + "";
								 bank = bankIssuer.substr(0, bankIssuer.indexOf(" "));
								 html+='<div class="mySlides fade">' +
					  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' + 
					  			  '<tr><td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">'+value.clientName+'</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td>'+
								  '</tr>'+
					  			  '<tr style="font-size: 12px">' +
					  			  '<td class="resulttopbrdr">Name</td>' +
					  			  '<td class="resulttopbrdr">Maturity Date</td>'+
					  			   '<td class="resulttopbrdr">Maturity Amount</td>'+
					  			  '</tr>'+
					  			  '<hr/>'+
					  			  '<tr style="font-size: 12px;">'+
					  			 /* '<td class="textalignlft resulttopbrdr"><abbr title="World Health Organization">WHO</abbr></td>'+*/
					  			  '<td class="textalignlft resulttopbrdr"><abbr title="'+bankIssuerName+'">'+ bank +'</abbr></td>'+
					  			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+ value.maturityDate+'</b></td>'+
					  			  '<td class="textalignlft resulttopbrdr">'+maskAmountValue(Math.round(value.maturityAmount)) +'</td>'+
					  			  '</tr>'+
					  			  '</table>'+
					  			  '</div></div>';
				
							});
							  
							    html+='<a class="prev1" onclick="plusSlides(-1)">&#10094;</a><a class="next1" onclick="plusSlides(1)">&#10095;</a>';
					  	
					  		    $("#idAssetRow").html(html);
					  		
					  		    showSlides(slideIndex=1);
					  		
						}else{
							  //  showSlides2(0);
						}
						},
				   
				    	error: function (jqXHR, exception) {
				
					}
				  
				  }); 	
				 	$("#idSelectAssetList").on('change', function(){
					    loadLoader();
						asset = $(this).val();
					   
						specificRequermentStat="overview";
				        var url=REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodAndAssetForAdvisor?advisorUserId='+loggedUser.id+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod;
						
				        $.ajax({
								type: 'GET',
								async : true,
								url: REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodAndAssetForAdvisor?advisorUserId='+loggedUser.id+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod,
								dataType: 'json',
								beforeSend: function (xhr){ 
								      xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
								},
								success: function (data) {
								    hideLoader();
									var html="";
									length=data.length;
									////alert("l "+data.length);
									$('#idAssetRow').empty();
									if(length>0){
									bankIssuerName = "";
									$.each(data, function(key, value) {
										if(value.bankIssuerName != null){
											if(value.bankIssuerName != ""){
											bankIssuerName = value.bankIssuerName;
											}
											else{
											bankIssuerName = value.productName;
											}
										}
										  bankIssuer = "";
										  bankIssuer = bankIssuerName + "";
										  bank = bankIssuer.substr(0, bankIssuer.toString().indexOf(" "));
										  html+='<div class="mySlides fade">' +
							  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' + 
							  			  '<tr><td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">'+value.clientName+'</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td>'+
										  '</tr>'+
							  			  '<tr style="font-size: 12px">' +
							  			  '<td class="resulttopbrdr">Name</td>' +
							  			  '<td class="resulttopbrdr">Maturity Date</td>'+
							  			   '<td class="resulttopbrdr">Maturity Amount</td>'+
							  			  '</tr>'+
							  			  '<hr/>'+
							  			  '<tr style="font-size: 12px;">'+
							  			 /*'<td class="textalignlft resulttopbrdr"><abbr title="World Health Organization">WHO</abbr></td>'+*/
							  			  '<td class="textalignlft resulttopbrdr"><abbr title="'+bankIssuerName+'">'+ bank +'</abbr></td>'+
							  			 /* '<td class="textalignlft resulttopbrdr"><b>'+ bankIssuerName +'</b></td>'+*/
							  			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+ value.maturityDate+'</b></td>'+
							  			  '<td class="textalignlft resulttopbrdr"><b>'+maskAmountValue(Math.round(value.maturityAmount)) +'</b></td>'+
							  			  '</tr>'+
							  			  '</table>'+
							  			  '</div></div>';
										 
										 
									});
									  
									    html+='<a class="prev1" onclick="plusSlides(-1)">&#10094;</a><a class="next1" onclick="plusSlides(1)">&#10095;</a>';
							  		
							  		    $("#idAssetRow").html(html);
							  		  
							  		    showSlides(slideIndex=1);
							  		   
								}else{
									
									 //  showSlides(0);
								}
								},
						   
						    	error: function (jqXHR, exception) {
						    		hideLoader();
							}
						  
						  }); 
					});
				  
						$("#idTimePeriod").on('change', function(){
						loadLoader();
						timePeriod = $(this).val();
						specificRequermentStat="overview";
						var url=REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodAndAssetForAdvisor?advisorUserId='+loggedUser.id+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod;
					    //console.log("url "+url);
						$.ajax({
								type: 'GET',
								async : true,
								url: REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodAndAssetForAdvisor?advisorUserId='+loggedUser.id+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod,
								dataType: 'json',
								beforeSend: function (xhr){ 
								      xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
								},
								success: function (data) {
					                hideLoader();
									var html="";
									length=data.length;
									$('#idAssetRow').empty();
									if(length>0){
										bankIssuerName = 0;
									$.each(data, function(key, value) {
										if(value.bankIssuerName != null){
											if(value.bankIssuerName != ""){
											bankIssuerName = value.bankIssuerName;
											}
											else{
											bankIssuerName = value.productName;
											}
										}
										
										  bankIssuer = "";
										  bankIssuer = bankIssuerName + "";
										  bank = bankIssuer.substr(0, bankIssuer.toString().indexOf(" "));
										 
										  html+='<div class="mySlides fade">' +
							  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' + 
							  			  '<tr><td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">'+value.clientName+'</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td>'+
										  '</tr>'+
							  			  '<tr style="font-size: 12px">' +
							  			  '<td class="resulttopbrdr">Name</td>' +
							  			  '<td class="resulttopbrdr">Maturity Date</td>'+
							  			   '<td class="resulttopbrdr">Maturity Amount</td>'+
							  			  '</tr>'+
							  			  '<hr/>'+
							  			  '<tr style="font-size: 12px;">'+
							  			 /* '<td class="textalignlft resulttopbrdr"><abbr title="World Health Organization">WHO</abbr></td>'+*/
							  			  '<td class="textalignlft resulttopbrdr"><abbr title="'+bankIssuerName+'">'+ bank +'</abbr></td>'+
							  			  /* '<td class="textalignlft resulttopbrdr"><b>'+ bankIssuerName +'</b></td>'+*/
							  			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+ value.maturityDate+'</b></td>'+
							  			  '<td class="textalignlft resulttopbrdr"><b>'+maskAmountValue(Math.round(value.maturityAmount)) +'</b></td>'+
							  			  '</tr>'+
							  			  '</table>'+
							  			  '</div></div>';
										  
										
					
									});
									  
									    html+='<a class="prev1" onclick="plusSlides(-1)">&#10094;</a><a class="next1" onclick="plusSlides(1)">&#10095;</a>';
							  		    $("#idAssetRow").html(html);
							  		 //   slideIndex2=1;
							  		    showSlides(slideIndex=1);
							  		  
								}else{
									// $('#idAssetRow').empty()
									// showSlides(0);
								}
								},
						   
						    	error: function (jqXHR, exception) {
						    	hideLoader();
						        
							}
						  
						  }); 
					});
					$("#idTimePeriodModalSelect").on('change', function(){
						  
						  timePeriodModal = $(this).val();
						  assetMatuirityTimePeriod(timePeriodModal);
					
					});
					  function assetMatuirityTimePeriod(timePeriod){
						  loadLoader();
						  specificRequermentStat="overview";
						  serviceurl=REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodForAdvisor?advisorUserId='+loggedUser.id+'&specificRequermentStat='+specificRequermentStat+'&timePeriod='+timePeriod;
						  console.log("now1 serviceurl "+serviceurl);
						  
						  var length=0;
					
							$.ajax({
								type: 'GET',
								async : true,
								url: REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodForAdvisor?advisorUserId='+loggedUser.id+'&specificRequermentStat='+specificRequermentStat+'&timePeriod='+timePeriod,
								dataType: 'json',
								beforeSend: function (xhr){ 
								      xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
								},
								success: function (data) {
								    hideLoader();
									var html="";
									length=data.length;
									
									$("#idAssetTable").empty();
									if(length>0){
									  bankIssuerName = "";
									$.each(data, function(key, value) {
										if(value.bankIssuerName != null){
											if(value.bankIssuerName != ""){
											bankIssuerName = value.bankIssuerName;
											}
											else{
											bankIssuerName = value.productName;
											}
										}
										
										 $("#idAssetTable").append('<tr>' +
												  '<td>' + value.clientName + '</td>' +
												  '<td>' + value.productType + '</td>' +
												  '<td>' + value.productName + '</td>' +
												  '<td>' + bankIssuerName + '</td>' +
												  '<td>' + maskAmountValue(Math.round(value.currentValue)) + '</td>' +
												  '<td>' + maskAmountValue(Math.round(value.maturityAmount)) + '</td>' +
												  '<td>' + value.maturityDate + '</td>' +
								                '</tr>');
													   
				                     
									  });
									  
									}
								},
						   
						    	error: function (jqXHR, exception) {
						    	hideLoader();
						       
							}
						  
						  });
						 }
					
					$("#idAssetMaturityRenewalDownload").click(function(){
						  loadLoader();
						 /* getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
				          function onRedisDataSuccess(data) {			
									     		//alert(data);
									     	}	*/
				          
								var a = document.createElement("a");
								document.body.appendChild(a);
								a.style = "display: none";
								var fileName = "assetMaturityRenewalForAdvisor.xlsx";

								var xhr = new XMLHttpRequest();
								
								specificRequermentStat="overview";
								serviceurl =  REQUEST_URL_PM + "/assetMaturityRenewalDownloadForAdvisor?userId="+loggedUser.id+"&specificRequermentStat="+specificRequermentStat+"&timePeriod="+timePeriodModal;
								
								//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
								xhr.open( "GET", serviceurl, true);
								xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
								xhr.responseType = "blob";
								xhr.onload = function() {
									console.log("xhr.response "+xhr.response);
									var url = window.URL.createObjectURL(xhr.response);  
									a.href = url;
									a.download = fileName;
									a.click();
									window.URL.revokeObjectURL(url);
									hideLoader();
								};
								xhr.send();  
					
						});   
					
				  }//if pm access is no
//===========================end 4th block====================================//
//===========================start 5th block==================================//
			
					var timePeriodInsuranceModalVal;
					
					$("#idTimePeriodModalSelectInsurance").on('change', function(){
						timePeriodInsuranceModalVal = $(this).val();
						insuranceModaltimeperiod(timePeriodInsuranceModalVal);
					 });
						function insuranceModaltimeperiod(timePeriodInsuranceModalVal){
						serviceurl = "getLockedUptoDateTimePeriodForAdvisor?advisorUserID="+loggedUser.id+'&timePeriod='+timePeriodInsuranceModalVal;
						getAdvisorClientData("GET", "", serviceurl, onSuccessInsuranceModal);
						  
						  ////console.log("serviceurl "+serviceurl);
						  var length=0;
						
						  function onSuccessInsuranceModal (data) {
							
									var html="";
									length=data.length;
								
									$("#idTimePeriodModalSelectInsuranceTable").empty();
									if(length>0){
									$.each(data, function(key, value) {
										   endDate=moment(value.endDate,'DD/MM/YYYY').format('DD-MMM-YY');
										  $("#idTimePeriodModalSelectInsuranceTable").append('<tr>' +
												  '<td>' + value.clientName + '</td>' +
												  '<td>' + value.policyNumber + '</td>' +
												  '<td>' + value.ownerName + '</td>' +
												  '<td>' + value.policyName + '</td>' +
												  '<td>' + value.insuranceCompanyName + '</td>' +
												  '<td>' + value.insuranceType + '</td>' +
												  '<td>' + value.lookupPolicyTypeDesc+ '</td>' +
												  '<td>' + maskAmountValue(Math.round(value.sumInsured)) + '</td>' +
												  '<td>' + endDate + '</td>' +
								                '</tr>');
													   
				                     
									  });
									  
									}
								}
						   }
						 
	     /*    timePeriodInsurance = 1;
	         timePeriodInsuranceModalVal = timePeriodInsurance;
	         serviceurl = "getLockedUptoDateTimePeriodForAdvisor?advisorUserID="+loggedUser.id+'&timePeriod='+timePeriodInsurance;
	         getAdvisorClientData("GET", "", serviceurl, onSuccessInsuranceModalonLoad);
	         ////console.log("serviceurl "+serviceurl);
	        
	         var length=0;

	        function onSuccessInsuranceModalonLoad (data) {
				var html="";
				length=data.length;
				
				$("#idTimePeriodModalSelectInsuranceTable").empty();
				if(length>0){
				$.each(data, function(key, value) {
					 endDate=moment(value.endDate,'DD/MM/YYYY').format('DD-MMM-YY');
					  $("#idTimePeriodModalSelectInsuranceTable").append('<tr>' +
							  '<td>' + value.clientName + '</td>' +
							  '<td>' + value.policyNumber + '</td>' +
							  '<td>' + value.ownerName + '</td>' +
							  '<td>' + value.policyName + '</td>' +
							  '<td>' + value.insuranceCompanyName + '</td>' +
							  '<td>' + value.insuranceType + '</td>' +
							  '<td>' + value.lookupPolicyTypeDesc+ '</td>' +
							  '<td>' + maskAmountValue(Math.round(value.sumInsured)) + '</td>' +
							  '<td>' + endDate + '</td>' +
			                '</tr>');
								   
	             
				  });
				  
				}
			}*/
				
					  
	                  timePeriodInsurance=1;
					  serviceurl = "getLockedUptoDateForAdvisor?advisorUserID="+loggedUser.id+'&timePeriod='+timePeriodInsurance;
					  getAdvisorClientData("GET", "", serviceurl, onSuccessInsurance);
					  
					  ////console.log("serviceurl "+serviceurl);
					  var length=0;
					 
					
					           function onSuccessInsurance(data) {
						
								var html="";
								length=data.length;
							
								 $("#idInsurancetypeTable").empty();
								if(length>0){
								$.each(data, function(key, value) {
									endDate=moment(value.endDate,'DD/MM/YYYY').format('DD MMM YY');
							
									 html+=' <div class="mySlides1 fade">' +
						  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' + 
						  			  '<tr><td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">'+value.clientName+'</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td></tr>'+
						  			  '<tr style="font-size: 12px">' +
						  			  '<td class="textalignlft" style="width:50%">Insurance Policy Type</td>' +
						  			  '<td style="text-align:left !important">Maturity Date</td>'+
						  			   '<td class="textalignlft">Sum Insured</td>'+
						  			  '</tr>'+
						  			  '<hr/>'+
						  			  '<tr style="font-size: 12px;">'+
						  			  '<td class="textalignlft resulttopbrdr"><b>'+value.lookupPolicyTypeDesc +'</td>'+
						  			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+endDate+'</b></td>'+
						  			  '<td class="textalignlft resulttopbrdr"><b>'+maskAmountValue(Math.round(value.sumInsured))+'</b></td>'+
						  			  '</tr>'+
						  			  '</table>'+
						  			  '</div></div>';
									 
									/* <div class="mySlides1 fade">
								      <div style="width:230px" > <table class="" style="width: 97%;margin-top: -45px;">
										
										<tr>
										<td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">Neha Mohnot</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td>
										</tr>
										<tr style="font-size: 12px">
										<td class="textalignlft" style="width:50%">Insurance Policy Type</td>
										<td style="text-align:left !important">Maturity Date</td>
										<td class="textalignlft">Sum Insured</td>
										</tr>
										
										<hr/>
										<tr style="font-size: 12px;">
										<td class="textalignlft resulttopbrdr"><b>Mediclaim</b></td>
										<td style="text-align:left !important" class="resulttopbrdr"><b>17 Aug 17</b></td>
										<td class="textalignlft resulttopbrdr"><b>14000</b></td>
										</tr>
										</table>
								       </div>
								       </div>*/
				
									  
				
								});
								  
								    html+='<a class="prev2" onclick="plusSlides1(-1)">&#10094;</a><a class="next2" onclick="plusSlides1(1)">&#10095;</a>';
								    //<a class="prev2" onclick="plusSlides1(-1)" style="margin-left: -240px;">&#10094;</a><a class="next2" onclick="plusSlides1(1)">&#10095;</a>
								    /*html+='<div style="text-align:center">'+
								    	  +'<span class="dot1" onclick="currentSlide1(1)"></span>'+
								    	  +'<span class="dot1" onclick="currentSlide1(2)"></span>'+
								    	  +'<span class="dot1" oncl
								    	  ick="currentSlide1(3)"></span>'+ 
								    	  +'</div>';
						  		*/
						  		    $("#idInsurancetypeTable").html(html);
						  		 
						  		    showSlides1(slideIndex1=1);
						  		  
							}else{
								 //showSlides1(0);
							}
							}
					   
					  	
					           $("#idInsurancTypeList").on('change', function(){
							
								insuranceType = $(this).val();
								
								//alert("timePeriodInsurance "+timePeriodInsurance);
								//alert("insuranceType "+insuranceType);
					
								var length=0;	
								if(insuranceType==1){
								serviceurl = "getLockedUptoDateForAdvisor?advisorUserID="+loggedUser.id+'&timePeriod='+timePeriodInsurance;
								getAdvisorClientData("GET", "", serviceurl, onSuccessInsurancType);
		                        ////console.log("serviceurl "+serviceurl);	 
								}else{
								serviceurl = "getPolicyEndDateForadvisor?advisorUserID="+loggedUser.id+'&insuranceType='+insuranceType+'&timePeriod='+timePeriodInsurance;
								getAdvisorClientData("GET", "", serviceurl, onSuccessInsurancType);
			                    ////console.log("serviceurl "+serviceurl);		 
								}
								
								
							                function onSuccessInsurancType(data)  {
								
											var html="";
											length=data.length;
										
											    
											 $("#idInsurancetypeTable").empty();
											 var endDate;
											 //alert("length "+length);
											if(length>0){
											$.each(data, function(key, value) {
												 if(insuranceType==1){
													 endDate=moment(value.endDate,'DD/MM/YYYY').format('DD MMM YY');
												 }else{
													 endDate=moment(value.policyEndDate,'DD/MM/YYYY').format('DD MMM YY');
												 }
										
												  html+=' <div class="mySlides1 fade">' +
									  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' + 
									  			  '<tr><td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">'+value.clientName+'</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td></tr>'+
									  			  '<tr style="font-size: 12px">' +
									  			  '<td class="textalignlft" style="width:50%">Insurance Policy Type</td>' +
									  			  '<td style="text-align:left !important">Maturity Date</td>'+
									  			   '<td class="textalignlft">Sum Insured</td>'+
									  			  '</tr>'+
									  			  '<hr/>'+
									  			  '<tr style="font-size: 12px;">'+
									  			  '<td class="textalignlft resulttopbrdr"><b>'+value.lookupPolicyTypeDesc +'</td>'+
									  			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+endDate+'</b></td>'+
									  			  '<td class="textalignlft resulttopbrdr"><b>'+maskAmountValue(Math.round(value.sumInsured))+'</b></td>'+
									  			  '</tr>'+
									  			  '</table>'+
									  			  '</div></div>';
												  
												 
							
											});
											  
											    html+='<a class="prev2" onclick="plusSlides1(-1)">&#10094;</a><a class="next2" onclick="plusSlides1(1)">&#10095;</a>';
												
											     
									  		    $("#idInsurancetypeTable").html(html);
									  		
									  		    showSlides1(slideIndex1=1);
									  		   
										}else{
											 //showSlides3(0);
										}
							         }		
							      });		
					             $("#idTimePeriodInsurance").on('change', function(){
						
							    timePeriodInsurance = $(this).val();
								var length=0;	
								
								
								//alert("timePeriodInsurance "+timePeriodInsurance);
								//alert("insuranceType "+insuranceType);
					
								if(insuranceType==1){
								serviceurl = "getLockedUptoDateForAdvisor?advisorUserID="+loggedUser.id+'&timePeriod='+timePeriodInsurance;
								getAdvisorClientData("GET", "", serviceurl, onSuccessInsuranceTime);
		                        ////console.log("serviceurl "+serviceurl);	 
								}else{
								serviceurl = "getPolicyEndDateForadvisor?advisorUserID="+loggedUser.id+'&insuranceType='+insuranceType+'&timePeriod='+timePeriodInsurance;
								getAdvisorClientData("GET", "", serviceurl, onSuccessInsuranceTime);
			                    ////console.log("serviceurl "+serviceurl);		 
								}
								
								
								            function onSuccessInsuranceTime (data) {
									
											var html="";
											length=data.length;
											//alert("length "+length);
											    
											 $("#idInsurancetypeTable").empty();
											 var endDate;
											 if(length>0){
											 $.each(data, function(key, value) {
												if(insuranceType==1){
													 endDate=moment(value.endDate,'DD/MM/YYYY').format('DD MMM YY');
												 }else{
													 endDate=moment(value.policyEndDate,'DD/MM/YYYY').format('DD MMM YY');
												 }
											
												  html+=' <div class="mySlides1 fade">' +
									  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' + 
									  			  '<tr><td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">'+value.clientName+'</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td></tr>'+
									  			  '<tr style="font-size: 12px">' +
									  			  '<td class="textalignlft" style="width:50%">Insurance Policy Type</td>' +
									  			  '<td style="text-align:left !important">Maturity Date</td>'+
									  			   '<td class="textalignlft">Sum Insured</td>'+
									  			  '</tr>'+
									  			  '<hr/>'+
									  			  '<tr style="font-size: 12px;">'+
									  			  '<td class="textalignlft resulttopbrdr"><b>'+value.lookupPolicyTypeDesc +'</td>'+
									  			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+endDate+'</b></td>'+
									  			  '<td class="textalignlft resulttopbrdr"><b>'+maskAmountValue(Math.round(value.sumInsured))+'</b></td>'+
									  			  '</tr>'+
									  			  '</table>'+
									  			  '</div></div>';
												  
							
											});
											  
											html+='<a class="prev2" onclick="plusSlides1(-1)">&#10094;</a><a class="next2" onclick="plusSlides1(1)">&#10095;</a>';
											
									  		
									  		    $("#idInsurancetypeTable").html(html);
									  		 
									  		    showSlides1(slideIndex1=1);
									  		   
										}else{
											// showSlides3(0);
										}
										}
						});   
					             
					        	 $("#idAdvisorInsuranceDownload").click(function(){
										loadLoader();
									  /*getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
							          function onRedisDataSuccess(data) {			
												     		//alert(data);
												     	}*/	
							          
											var a = document.createElement("a");
											document.body.appendChild(a);
											a.style = "display: none";
											var fileName = "InsuranceMaturityRenewalforAdvisor.xlsx";

											var xhr = new XMLHttpRequest();
											
											
											serviceurl = "getLockedUptoDateTimePeriodForAdvisorDownload?UserID="+loggedUser.id+'&timePeriod='+timePeriodInsuranceModalVal;
											//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
											xhr.open( "GET", serviceIP + "/clientservice/getLockedUptoDateTimePeriodForAdvisorDownload?userID="+loggedUser.id+"&timePeriod="+timePeriodInsuranceModalVal,true);
											xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
											xhr.responseType = "blob";
											xhr.onload = function() {
												console.log("xhr.response "+xhr.response);
												var url = window.URL.createObjectURL(xhr.response);  
												a.href = url;
												a.download = fileName;
												a.click();
												window.URL.revokeObjectURL(url);
												hideLoader();
											};
											xhr.send();  
								
									});    
					        	 
//===========================end 5 th block===================================//	
//=====================start 6th block========================
					             
					            
					                /* var img1 = $('<img />').attr({
					                     'id': 'idmaxClientbday',
					                     'src': '../Common/assets/images/maxbtn.png',
					                     'alt': 'JSFiddle logo',
					                     'style' : 'width:20px;top: 0;float: right'
					                     }).appendTo('#IdBirthdayRemindersImg');
					             */
					              /*   $("#idmaxClientbday").attr("src","../Common/assets/images/maxbtn.png");*/
					             var timePeriodbirthModal = 1;
							     serviceurl = "findClientBirthdayByUserID/"+loggedUser.id+"/"+1;
							  	 getAdvisorClientData("GET", "", serviceurl, onSuccessBirthdayData);
							  	  function onSuccessBirthdayData(data) {
							//  		 console.log("len "+data.length);
							  	     var i=1;
							  	     var html="";
							  	   $("#idIterationDOB").empty();
							  	  // $("#idlistUpcomingBirthday").empty();
							  	     if(data.length>0){
							  		  $.each(data, function (index, client) {
							  			var middle;
										if (client.middleName == null) {
											middle = "";
										} else {
											if (client.middleName != null) {
												middle = " "+client.middleName;
											}
										}
							  		  
										birthDate = moment(client.birthDate,'DD/MM/YYYY').format('DD MMM YY');
							  			  
							  			  html+='<div class="mySlides2 fade2">' +
							  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' +  
							  			  '<tr>' +
							  			  '<td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">' + client.firstName + middle + ' ' + client.lastName + '</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/><span style="float:right;color:black;font-size:12px"><b>'+client.age+'yrs</b></span></td>' +
							  			  '</tr>'+
							  			  '<tr style="font-size: 12px">'+
							  			  '<td class="textalignlft" style="width:50%;padding:0px"><img src="../Common/assets/images/calendar.jpg" style="width:29px"/>&nbsp;'+birthDate+'</td>'+
							  			  '</tr>'+
							  			  '<tr style="font-size: 12px">'+
							  			  '<td class="textalignlft" style="width:50%;padding:0px"><img src="../Common/assets/images/email.jpg" style="width:29px"/>&nbsp;'+client.emailId+'</td>'+
							  			  '</tr>'+
							  			  '<hr/>'+
							  			  '<tr style="font-size: 12px;">'+
							  			  '<td class="textalignlft style="width:50%;padding:0px"><img src="../Common/assets/images/mobile.jpg" style="width:29px"/>&nbsp;'+client.mobile+'</td>'+
							  			  '</tr>'+
							  			  '</table>'+
							  			  '</div></div>';
							  			  
							  		               /*$("#idlistUpcomingBirthday").append('<tr>' +
												  '<td>' +  client.firstName + ' ' + middle + ' ' + client.lastName + '</td>' +
												  '<td>' + birthDate + '</td>' +
												  '<td>' + client.emailId + '</td>' +
												  '<td>' + client.mobile + '</td>' +
												  '<td>' + client.age + '</td>' +
								                   '</tr>');*/
							  			 
							  		  });
							  		
							  		  html+='<a class="prev3" onclick="plusSlides2(-1)">&#10094;</a><a class="next3" onclick="plusSlides2(1)">&#10095;</a>';
							  	//	  console.log(html);
							  		  $("#idIterationDOB").html(html);
							  		   
							  		   slideIndex2 = 1;
							  		   showSlides2(slideIndex2);
							  	//	   console.log("end ");
							  	    } 
							  	  }
							  	$("#idSelectBirthday").on('change', function(){
							    	 var val = $(this).val();
							//    	 console.log("val "+val+" loggedUser.id "+loggedUser.id);
							    	  serviceurl = "findClientBirthdayByUserID/"+loggedUser.id+"/"+val;
							    	  getAdvisorClientData("GET", "", serviceurl, onSuccessClientBirthday);
							    	  function onSuccessClientBirthday(data) {
							 //   		  console.log("len "+data.length);
									  	     var i=1;
									  	     var html="";
									  	     if(data.length>0){
									  		  $.each(data, function (index, client) {
									  			var middle;
												if (client.middleName == null) {
													    middle = "";
												} else {
													if (client.middleName != null) {
														middle = " "+client.middleName;
													}
												}
									  		  
												  birthDate = moment(client.birthDate,'DD/MM/YYYY').format('DD MMM YY');
									  			  
									  			  html+='<div class="mySlides2 fade2">' +
									  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' +  
									  			  '<tr>' +
									  			  '<td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">' + client.firstName +middle + ' ' + client.lastName + '</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/><span style="float:right;color:black;font-size:12px"><b>'+client.age+'yrs</b></span></td>' +
									  			  '</tr>'+
									  			  '<tr style="font-size: 12px">'+
									  			  '<td class="textalignlft" style="width:50%;padding:0px"><img src="../Common/assets/images/calendar.jpg" style="width:29px"/>&nbsp;'+birthDate+'</td>'+
									  			  '</tr>'+
									  			  '<tr style="font-size: 12px">'+
									  			  '<td class="textalignlft" style="padding:0px"><img src="../Common/assets/images/email.jpg" style="width:29px"/>&nbsp;'+client.emailId+'</td>'+
									  			  '</tr>'+
									  			  '<hr/>'+
									  			  '<tr style="font-size: 12px;">'+
									  			  '<td class="textalignlft style="padding:0px"><img src="../Common/assets/images/mobile.jpg" style="width:29px"/>&nbsp;'+client.mobile+'</td>'+
									  			  '</tr>'+
									  			  '</table>'+
									  			  '</div></div>';
									  			  
									  		
									  			
									  			 
									  		  });
									  		
									  		  html+='<a class="prev3" onclick="plusSlides2(-1)">&#10094;</a><a class="next3" onclick="plusSlides2(1)">&#10095;</a>';
								//	  		  console.log(html);
									  		  $("#idIterationDOB").html(html);
									  		
									  		    slideIndex2 = 1;
									  		   showSlides2(slideIndex2);
									//  		   console.log("end ");
							    	    }
									  		 
							    	  }
							  	}); 
							/*   serviceurl = "findClientBirthdayByUserID/"+loggedUser.id+"/"+1;
							  	 getAdvisorClientData("GET", "", serviceurl, onSuccessBirthdayDataList);
								  function onSuccessBirthdayDataList(data) {
							//	     console.log("len "+data.length);
								     var i=1;
								     $("#idlistUpcomingBirthday").empty();
									  $.each(data, function (index, client) {
								//		  console.log(client.firstName + ' ' + middle + ' ' + client.lastName);
										  var middle;
											if (client.middleName == null) {
												middle = " ";
											} else {
												if (client.middleName != null) {
													middle = client.middleName;
												}
											}
								  		  
											birthDate = moment(client.birthDate,'DD/MM/YYYY').format('DD-MMM-YY');
								  			  
						                  $("#idlistUpcomingBirthday").append('<tr>' +
										  '<td>' +  client.firstName + ' ' + middle + ' ' + client.lastName + '</td>' +
										  '<td>' + birthDate + '</td>' +
										  '<td>' + client.emailId + '</td>' +
										  '<td>' + client.mobile + '</td>' +
										  '<td>' + client.age + '</td>' +
						                   '</tr>');
										});		 
										 
								       }*/
								
								  $("#idSelectBirthdayList").on('change', function(){
								    	 var val = $(this).val();
								    	 timePeriodbirthModal = val;
								    	 birthdayListTimeperiod(timePeriodbirthModal);
								  });	 
								    	 function birthdayListTimeperiod(val){
								    	  serviceurl = "findClientBirthdayByUserID/"+loggedUser.id+"/"+val;
								    	  getAdvisorClientData("GET", "", serviceurl, onSuccessSelectClientBirthdayList);
								    	  function onSuccessSelectClientBirthdayList(data) {
								    //		  console.log("len "+data.length);
										  	     var i=1;
										  	     var html="";
										  	   $("#idlistUpcomingBirthday").empty();
										  		  $.each(data, function (index, client) {
									//	  			 console.log(client.firstName + ' ' + middle + ' ' + client.lastName);
										  			var middle;
													if (client.middleName == null) {
														middle = "";
													} else {
														if (client.middleName != null) {
															middle = " "+client.middleName;
														}
													}
										  		  
													birthDate = moment(client.birthDate,'DD/MM/YYYY').format('DD-MMM-YY');
													 $("#idlistUpcomingBirthday").append('<tr>' +
															  '<td>' + client.firstName +middle + ' ' + client.lastName +'</td>' +
															  '<td>' + birthDate + '</td>' +
															  '<td>' + client.emailId + '</td>' +
															  '<td>' + client.mobile + '</td>' +
															  '<td>' + client.age + '</td>' +
											                   '</tr>');
										  		  });
								    	      }
								            }
								        
								  
								  
								  $("#idClientBirthdayDownload").click(function(){
									  loadLoader();
										 // alert("yes");
											
										/*  getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
								          function onRedisDataSuccess(data) {			
													     		//alert(data);
													     	}	
								          */
												var a = document.createElement("a");
												document.body.appendChild(a);
												a.style = "display: none";
												var fileName = "clientBirthdayForAdvisor.xlsx";

												var xhr = new XMLHttpRequest();
												//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
												xhr.open( "GET", serviceIP + "/clientservice/clientBirthdayDownloadForAdvisor/"+loggedUser.id+"/"+timePeriodbirthModal, true);
												xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
												xhr.responseType = "blob";
												xhr.onload = function() {
													console.log("xhr.response "+xhr.response);
													var url = window.URL.createObjectURL(xhr.response);  
													a.href = url;
													a.download = fileName;
													a.click();
													window.URL.revokeObjectURL(url);
													hideLoader();
												};
												xhr.send();  
										

									});
								  
								  
 //=========================end 6th block===================


								
										
		 //================================start 9th block=========================
		var corpusReqdAtGoalStartOutput=0;
		var timePeriodGoalModal = 7;
	 serviceurl = "upcomingGoal/"+loggedUser.id+"/"+7;
	 getAdvisorClientData("GET", "", serviceurl, onSuccessGoalData);
	  function onSuccessGoalData(data) {
		// console.log("len "+data.length);
	     var i=1;
	     var html="";
	     $("#idIteration").empty();
	     $("#idListUpcomingGoal").empty();
	     if(data.length>0){
		  $.each(data, function (index, goal) {
			  corpusReqdAtGoalStartOutput = 0;
			  startYearMonth = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMM/YYYY');
			  html+='<div class="mySlides5 fade5">' +
			  '<div style="width:230px"> <table class="" style="width: 97%; margin-top: -45px;">' +  
			  '<tr>' +
			  '<td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">' + goal.name + '</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td>' +
			  '</tr>'+
			  '<tr >'+
			  '<td class="textalignlft">Goals</td>'+
			  '<td class="textalignlft" ></td>'+
			  '<td class="textalignlft">Goal Start Year and Month</td>'+
			  '</tr>'+
			  '<hr/>'+
			  '<tr style="font-size: 12px;">'+
			  '<td class="textalignlft resulttopbrdr"><b>'+goal.lookupGoalTypeName+'</b></td>'+
			  '<td class="textalignlft resulttopbrdr"><b></b></td>'+
			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+startYearMonth+'</b></td>'+
			  '</tr>'+
			  '</table>'+
			  '</div></div>';
			  
			         if(goal.corpusReqdAtGoalStartOutput != null){
			        	corpusReqdAtGoalStartOutput = goal.corpusReqdAtGoalStartOutput;
			         }
			        
				
					
	                  $("#idListUpcomingGoal").append('<tr>' +
					  '<td>' + goal.name + '</td>' +
					  '<td>' + goal.lookupGoalTypeName + '</td>' +
					  '<td>' + goal.description + '</td>' +
					  '<td>' + startYearMonth + '</td>' +
					  '<td>' + maskAmountValue(Math.round(goal.estimatedCostOfGoal)) + '</td>' +
					  '<td>' + maskAmountValue(Math.round(corpusReqdAtGoalStartOutput)) + '</td>' +
	                   '</tr>');
					
		 
			 
		  });
		
		  html+='<a class="prev4" onclick="plusSlides5(-1)">&#10094;</a><a class="next4" onclick="plusSlides5(1)">&#10095;</a>';
		// console.log(html);
		  $("#idIteration").html(html);
		  slideIndex5 = 1;
		  showSlides5(slideIndex5);
		  }
	  }
	
	    $("#idUpcomingGoal").on('change', function(){
	    	loadLoader();
	    	 var val = $(this).val();
	    	  serviceurl = "upcomingGoal/"+loggedUser.id+"/"+val;
	    	  getAdvisorClientData("GET", "", serviceurl, onSuccessClient);
	    	  function onSuccessClient(data) {
	    		 hideLoader();
	    		  var html="";
	    		  $("#idIteration").empty();
	    		  if(data.length>0){
	    		  $.each(data, function (index, goal) {
	    			  startYearMonth = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMM/YYYY');
	    			
	    			  
	    			  html+='<div class="mySlides5 fade5">' +
	    			  '<div style="width:230px"> <table class="" style="width: 97%; margin-top: -45px;">' +  
	    			  '<tr>' +
	    			  '<td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">' + goal.name + '</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td>' +
	    			  '</tr>'+
	    			  '<tr >'+
	    			  '<td class="textalignlft">Goals</td>'+
	    			  '<td class="textalignlft" ></td>'+
	    			  '<td class="textalignlft">Goal Start Year and Month</td>'+
	    			  '</tr>'+
	    			  '<hr/>'+
	    			  '<tr style="font-size: 12px;">'+
	    			  '<td class="textalignlft resulttopbrdr"><b>'+goal.lookupGoalTypeName+'</b></td>'+
	    			  '<td class="textalignlft resulttopbrdr"><b></b></td>'+
	    			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+startYearMonth+'</b></td>'+
	    			  '</tr>'+
	    			  '</table>'+
	    			  '</div></div>';
	    		  }); 
	    	 
	    		  html+='<a class="prev4" onclick="plusSlides5(-1)">&#10094;</a><a class="next4" onclick="plusSlides5(1)">&#10095;</a>';
	    		
	    			  $("#idIteration").html(html);
	    			  slideIndex5 = 1;    		
	    			  showSlides5(slideIndex5);
	    
	    		  
		     }
	       } 
	    });
	    /* serviceurl = "upcomingGoal/"+loggedUser.id+"/"+7;
		 getAdvisorClientData("GET", "", serviceurl, onSuccessGoalDataList);
		  function onSuccessGoalDataList(data) {
		//     console.log("len "+data.length);
		     var i=1;
		     $("#idListUpcomingGoal").empty();
			  $.each(data, function (index, goal) {
				  if(goal.sip != null)
			           sip = goal.sip;
			         if(goal.lumpsum != null)
			           lumpsum = goal.lumpsum;
			         
				  startYearMonth = moment(goal.startMonthYear,'YYYY-MM-DD').format('DD-MMM-YY');
                  $("#idListUpcomingGoal").append('<tr>' +
				  '<td>' + goal.name + '</td>' +
				  '<td>' + goal.lookupGoalTypeName + '</td>' +
				  '<td>' + goal.description + '</td>' +
				  '<td>' + startYearMonth + '</td>' +
				  '<td>' + goal.estimatedCostOfGoal + '</td>' +
				  '<td>' + sip  + '</td>' +
				  '<td>' + lumpsum + '</td>' +
                   '</tr>');
				});		 
				 
		       }*/
		  
		       $("#idSelectUpcomingGoal").on('change', function(){
			     timePeriodGoalModal = $(this).val();
			     goalListOnTimePeriod(timePeriodGoalModal);
		       });
                 function goalListOnTimePeriod(timePeriodGoalModal){
                 loadLoader();
			     serviceurl = "upcomingGoal/"+loggedUser.id+"/"+timePeriodGoalModal;
				 getAdvisorClientData("GET", "", serviceurl, onSuccessGoalDataListAll);
				  function onSuccessGoalDataListAll(data) {
				      hideLoader();
				      $("#idListUpcomingGoal").empty();
					  $.each(data, function (index, goal) {
						  corpusReqdAtGoalStartOutput = 0;
						  startYearMonth = moment(goal.startMonthYear,'YYYY-MM-DD').format('DD-MMM-YY');
						  if(goal.corpusReqdAtGoalStartOutput != null){
					        corpusReqdAtGoalStartOutput = goal.corpusReqdAtGoalStartOutput;
					       }
						
		                  $("#idListUpcomingGoal").append('<tr>' +
						  '<td>' + goal.name + '</td>' +
						  '<td>' + goal.lookupGoalTypeName + '</td>' +
						  '<td>' + goal.description + '</td>' +
						  '<td>' + startYearMonth + '</td>' +
						  '<td>' + maskAmountValue(Math.round(goal.estimatedCostOfGoal)) + '</td>' +
						  '<td>' + maskAmountValue(Math.round(corpusReqdAtGoalStartOutput)) + '</td>' +
		                   '</tr>');
						});		 
						 
				       }
		       }
		
		       $("#idGoalListForAdvisorDownload").click(function(){
					
		    	   loadLoader();
					/*  getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
			          function onRedisDataSuccess(data) {			
								     		//alert(data);
								     	}	
			          */
							var a = document.createElement("a");
							document.body.appendChild(a);
							a.style = "display: none";
							var fileName = "GoalPlannedForAdvisor.xlsx";

							var xhr = new XMLHttpRequest();
							//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
							xhr.open( "GET", serviceIP + "/clientservice/clientGoalListDownloadForAdvisor/"+loggedUser.id+"/"+timePeriodGoalModal, true);
							xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
							xhr.responseType = "blob";
							xhr.onload = function() {
								console.log("xhr.response "+xhr.response);
								var url = window.URL.createObjectURL(xhr.response);  
								a.href = url;
								a.download = fileName;
								a.click();
								window.URL.revokeObjectURL(url);
								hideLoader();
							};
							xhr.send();  
					

				});
    //================================end 9th block=========================
		       
	//======start 7th block============================================
		    
		       var timeperiodMeeting = 1;
	           var timeperiodMeetingModal = 1;
	           var clientID = 0;
	           var clientName;
	           var clientTypeMeeting = "Existing";
	           $("#idExistingNameMeeting").show();
	           $("#idExClientMeeting").show();
    		   $("#idProspectNameMeeting").hide();
    		   $("#idPrClientMeeting").hide();
    		   
    		   
	           showMeeting(timeperiodMeeting);
	           //Existing
	           $("#idClientTypeMeeting").on("change", function (event) {
	        	   clientTypeMeeting = this.value;
	        	    if (this.value == 'Existing') {
	        	    	$('#idExistingNameMeeting').show();
	        	    	$("#idExClientMeeting").show();
		        		$('#idProspectNameMeeting').hide();
		        		$('#idProspectNameMeeting').val("");
		        		$("#idPrClientMeeting").hide();
		        		clearClientMeeting("ADD",this.value);
	        	    }
	        	    else if (this.value == 'Prospect') {
	        	    	$('#idProspectNameMeeting').show();
	        	    	$("#idPrClientMeeting").show();
	        	    	$("#idExClientMeeting").hide();
		        		$('#idExistingNameMeeting').hide();
		        		$('#idExistingNameMeeting').val("");
		        		$('#idMobileMeeting').val("");
		        		clearClientMeeting("ADD",this.value);
	        	    }
	        	});
	          
	           //Prospect
	          //populate Client
	           populateClientNameDrop($("#idExistingNameMeeting"));
	           
	          
	          // populate mobilenumber
	           var clientName="";
	           var clientID;
	           var countryCode;
	           $("#idExistingNameMeeting").on("change", function (event) {
	        	 //Use $option (with the "$") to see that the variable is a jQuery object
	        	    var $option = $(this).find('option:selected');
	        	    //Added with the EDIT
	        	   clientID = $option.val();//to get content of "value" attrib
	        	   clientName = $option.text();//to get <option>Text</option> content
	        	   if(hasValue(clientName)){
	        	   getAdvisorClientData("GET", "", "clientContactInfo/client/" + clientID, clientMobileSuccess);
		       		
		       		function clientMobileSuccess(data) {
		       			$('#idMobileMeeting').val(data.mobile);
		       			countryCode = data.countryCode;
		       		}
	        	   }else{
	        		   $('#idMobileMeeting').val(""); 
	        	   }
	               
	           });
		     //addClientmeeting
		       $("#idClientMeeting").on("click", function (event) {
		    	   
				if (validateClientMeeting($("#clientMeetingForm"),"ADD",clientTypeMeeting,clientID,countryCode)){
					//showLoaderOnSave("#idClientMeeting");
					//window.setTimeout(function(){
					var t = $("#timepicker1").val();
					var formData = $('#clientMeetingForm').serializeToJSON();
					formData["userID"]=loggedUser.id;
					if(clientTypeMeeting == 'Existing'){
					formData["name"]=clientName;
					formData["time"] = $("#timepicker1").val();
					}
					var data = JSON.stringify(formData);			
					saveData("POST", data, "createClientMeeting", onCreateClientMeetingSuccess);
					
					//}, 1000);	
				}
				});

				function onCreateClientMeetingSuccess(data) {
					bootBoxAddMsg();
					$("#clientMeetingForm").trigger("reset");
					//hideLoaderOnSave("#clientMeetingForm");
					//$(".onpopupscroller").css("overflow","visible");
				    //  modal9.style.display = "none";
					 $("#idClientMeeting").attr("disabled", false);
					 showMeetingAfterEditDelete(timeperiodMeeting);
					 
				}
				//get data into modal for edit
			
				    function getData(edit_delete_Id){
					 serviceurl = "clientMeeting/" +edit_delete_Id;
					 getAdvisorClientData("GET", "" , serviceurl, onEditClientMeetingSuccess);
					 function onEditClientMeetingSuccess(data)
					 {
						 if(data.clientType == "Existing"){
						 $("#idExClientMeetingEdit").show();
						 $("#idPrClientMeetingEdit").hide();	
						 }else{
						 $("#idPrClientMeetingEdit").show();
						 $("#idExClientMeetingEdit").hide();	
						 }
						 $("#idEditName").val(data.name);
						 $("#ideditmtngDate").val(data.meetingDate);
						 $("#timepicker3").val(data.time);
						 $("#idEditMobile").val(data.mobile);
						 $("#idEditStatus").val(data.status);
						 $("#idEditComment").val(data.comment);

					 }
				}
				   //update meeting data in modal
				   $("#idUpdateClientMeeting").on("click", function (event) {
						
						if (validateClientMeeting($("#clientMeetingForm"),"EDIT","",clientID,countryCode)){
							//showLoaderOnSave("#idUpdateClientMeeting");
							//window.setTimeout(function(){
							
							var formData = $('#idUpdateClientMeetingForm').serializeToJSON();
							formData["userID"]=loggedUser.id;
							formData["id"]= edit_delete_Id;
							formData["time"] = $("#timepicker3").val();
							var data = JSON.stringify(formData);
							console.log(data);
							
							
							saveData("POST", data, "createClientMeeting", onEditClientMeetingSuccess);
						}
							//}, 1000);	
						//}
						});

						function onEditClientMeetingSuccess(data) {
							bootBoxEditMsg();
							$("#clientMeetingForm").trigger("reset");
							$("#idUpdateClientMeeting").prop('disabled', false);
							showMeetingAfterEditDelete(timeperiodMeeting);
	 
					}
				//delete
						
				function deletedata(edit_delete_Id){
					serviceurl = "clientMeeting/delete/" +edit_delete_Id;
					getAdvisorClientData("GET", "" , serviceurl, onDeleteClientMeetingSuccess);
					function onDeleteClientMeetingSuccess(data)
					{
					  showMeetingAfterEditDelete(timeperiodMeeting);
					}
				}
			    
			     function showMeeting(timeperiodMeeting){
				 serviceurl = "clientMeetingList/user/" +loggedUser.id+"/"+timeperiodMeeting;
				 getAdvisorClientData("GET", "" , serviceurl, onClientMeetingTimeSuccess);
				 function onClientMeetingTimeSuccess(data)
				 {
						var html="";
						length=data.length;
						$("#idMeetingRow").empty();
						if(length>0){
						meetingID = [];
						$.each(data, function(key, value) {
							 meetingID.push(value.id);
							 edit_delete_Id = meetingID[0];
							 meetingDate = moment(value.meetingDate,'DD/MM/YYYY').format('DD MMM YY');
							 //alert(value.id+"   "+value.name+" "+meetingDate+" "+value.time+" "+value.mobile+" "+value.status+" "+value.comment);
							if((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" ) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y" )){
								 html+= meetingDivWithAddEditDelete(value.time, meetingDate, value.id, value.name, value.status, value.mobile);
							}
							if((loggedUser != null) && (loggedUser.clientInfoDelete === null || loggedUser.clientInfoDelete === "N" )){
								 html+= meetingDivWithAddEdit(value.time, meetingDate, value.id, value.name, value.status, value.mobile);
							}
								
						});
						  
						    html+='<a class="prev4" onclick="plusSlides3(-1)">&#10094;</a><a class="next4" onclick="plusSlides3(1)">&#10095;</a>';
				  		    $("#idMeetingRow").html(html);
				  		    showSlides3(slideIndex3=1);
				  					  		
					}
				 }
			     }
				 
				 $("#idMeetingtimeperiod").on('change', function(){
				     var val = $(this).val();
				     timeperiodMeeting = val;
				     serviceurl = "clientMeetingList/user/" +loggedUser.id+"/"+val;
					 getAdvisorClientData("GET", "" , serviceurl, onClientMeetingTimeSuccess1);
					 function onClientMeetingTimeSuccess1(data)
					 {
						    
							var html="";
							length=data.length;
							
							$("#idMeetingRow").empty();
							if(length>0){
							meetingID = [];
							$.each(data, function(key, value) {
								 meetingID.push(value.id);
							     edit_delete_Id = meetingID[0];
								 meetingDate = moment(value.meetingDate,'DD/MM/YYYY').format('DD MMM YY');
								
								if((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" ) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y" )){
									 html+= meetingDivWithAddEditDelete(value.time, meetingDate, value.id, value.name, value.status, value.mobile);
								}
								if((loggedUser != null) && (loggedUser.clientInfoDelete === null || loggedUser.clientInfoDelete === "N" )){
									 html+= meetingDivWithAddEdit(value.time, meetingDate, value.id, value.name, value.status, value.mobile);
								}
								 
								 
							});
							  
							   html+='<a class="prev4" onclick="plusSlides3(-1)">&#10094;</a><a class="next4" onclick="plusSlides3(1)">&#10095;</a>';
					  		   $("#idMeetingRow").html(html);
					  		   showSlides3(slideIndex3=1);
					  					  		
						}
					 }
			  });
				 
				 
				 $("#idMeetingtimeperiodModal").on('change', function(){
				     var val = $(this).val();
				     timeperiodMeetingModal = val;
				     meetinglistOnTimePeriod(timeperiodMeetingModal);
				 });
				     function meetinglistOnTimePeriod(timeperiodMeetingModal){
				     serviceurl = "clientMeetingList/user/" +loggedUser.id+"/"+timeperiodMeetingModal;
					 getAdvisorClientData("GET", "" , serviceurl, onClientMeetingTimeSuccess2);
					 function onClientMeetingTimeSuccess2(data)
					 {

							var html="";
							length=data.length;
							$("#idClientMeetingList").empty();
							if(length>0){
							$.each(data, function(key, value) {
								 meetingDate = moment(value.meetingDate,'DD/MM/YYYY').format('DD MMM YY');
								 $("#idClientMeetingList").append('<tr>' +
										  '<td>' + value.name + '</td>' +
										  '<td>' + meetingDate + '</td>' +
										  '<td>' + value.time + '</td>' +
										  '<td>' + value.mobile + '</td>' +
										  '<td>' + value.status + '</td>' +
										  '<td>' + value.comment + '</td>' +
						                  '</tr>');
							});
		  		
						}
					 }
				   } 
			 
		 
		 function showMeetingAfterEditDelete(timeperiodMeeting){
			 serviceurl = "clientMeetingList/user/" +loggedUser.id+"/"+timeperiodMeeting;
			 getAdvisorClientData("GET", "" , serviceurl, onClientMeetingTimeSuccessRow);
			 function onClientMeetingTimeSuccessRow(data)
			 {

					var html="";
					length=data.length;
					//alert("length "+length);
					
					$("#idMeetingRow").empty();
				
					if(length>0){
					meetingID = [];
					var html = "";
					$.each(data, function(key, value) {
						 meetingID.push(value.id);
						 edit_delete_Id = meetingID[0];
						 meetingDate = moment(value.meetingDate,'DD/MM/YYYY').format('DD MMM YY');
						 //alert(value.id+"   "+value.name+" "+meetingDate+" "+value.time+" "+value.mobile+" "+value.status+" "+value.comment);
						if((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" ) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y" )){
							 html+= meetingDivWithAddEditDelete(value.time, meetingDate, value.id, value.name, value.status, value.mobile);
						}
						if((loggedUser != null) && (loggedUser.clientInfoDelete === null || loggedUser.clientInfoDelete === "N" )){
							 html+= meetingDivWithAddEdit(value.time, meetingDate, value.id, value.name, value.status, value.mobile);
						}
					 });
					  
					    html+='<a class="prev4" onclick="plusSlides3(-1)">&#10094;</a><a class="next4" onclick="plusSlides3(1)">&#10095;</a>';
			  		    $("#idMeetingRow").html(html);
			  		    showSlides3(slideIndex3=1);
			  					  		
				}
				
			 }
		
			
		 }
		   
		 $("#idClientMeetingDownloadWithAdvisor").click(function(){
			        loadLoader();
					var a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					var fileName = "meetingPlannedForAdvisor.xlsx";

					var xhr = new XMLHttpRequest();
					xhr.open( "GET", serviceIP + "/clientservice/clientMeetingListDownloadForAdvisor/"+loggedUser.id+"/"+timeperiodMeetingModal, true);
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
					xhr.responseType = "blob";
					xhr.onload = function() {
						console.log("xhr.response "+xhr.response);
						var url = window.URL.createObjectURL(xhr.response);  
						a.href = url;
						a.download = fileName;
						a.click();
						window.URL.revokeObjectURL(url);
						hideLoader();
					};
					xhr.send();  
			

		});
		 
		 function meetingDivWithAddEditDelete(time, meetingDate, id, name, status, mobile){
			 var html = "";
			 html = '<div class="mySlides3 fade3">' +
 			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;margin-left:-9px">' + 
 			  '<tr><td class="dashboardinnerheading" Colspan="3"><span class="bgblurheadingclr">'+time+", "+meetingDate+'</span>'+
 			  '<img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/>'+
 			  '<span style="float:right"><img src="../Common/assets/images/edit-icon1.png" style="width:29px" id="ideditmtngwindow"/>'+
 			  '<img src="../Common/assets/images/delete-icon1.png" style="width:29px" id="iddeletemtngwindow"/></span></td>'+
			  '</tr>'+
 			  '<tr style="font-size: 12px">' +
 			  '<td class="textalignlft">Client Name</td>' +
 			  '<td class="text-align:left !important">Mobile Number</td>'+
 			   '<td class="textalignlft">Status</td>'+
 			  '</tr>'+
 			  '<hr/>'+
 			  '<tr style="font-size: 12px;">'+
 			  '<td class="textalignlft resulttopbrdr"><b>'+name +'</b></td>'+
 			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+ mobile+'</b></td>'+
 			  '<td class="textalignlft resulttopbrdr"><b>'+status +'<b></td>'+
 			  '<td class="hidden" id="ID' + id+ '">'+id +'</td>'+
 			  '</tr>'+
 			  '</table>'+
 			  '</div></div>';
			 
			 return html;
		 }
        function meetingDivWithAddEdit(time, meetingDate, id, name, status, mobile){
        	 var html = "";
			 html = '<div class="mySlides3 fade3">' +
 			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;margin-left:-9px">' + 
 			  '<tr><td class="dashboardinnerheading" Colspan="3"><span class="bgblurheadingclr">'+time+", "+meetingDate+'</span>'+
 			  '<img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/>'+
 			  '<span style="float:right"><img src="../Common/assets/images/edit-icon1.png" style="width:29px" id="ideditmtngwindow"/></span></td>'+
			  '</tr>'+
 			  '<tr style="font-size: 12px">' +
 			  '<td class="textalignlft">Client Name</td>' +
 			  '<td class="text-align:left !important">Mobile Number</td>'+
 			   '<td class="textalignlft">Status</td>'+
 			  '</tr>'+
 			  '<hr/>'+
 			  '<tr style="font-size: 12px;">'+
 			  '<td class="textalignlft resulttopbrdr"><b>'+name +'</b></td>'+
 			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+ mobile+'</b></td>'+
 			  '<td class="textalignlft resulttopbrdr"><b>'+status +'<b></td>'+
 			  '<td class="hidden" id="ID' + id + '">'+id +'</td>'+
 			  '</tr>'+
 			  '</table>'+
 			  '</div></div>';
			 
			 return html;
		 }
       
		 
		       //===============end 7 th block=========================
				 
				 
		      //===========start 8th block=============	
			
			       var timeperiodTask = 1;
	               var timeperiodTaskModal=1;
	               var clientTypeTask = "ExistingClient";
		           $("#idADDExistingTaskName").show();
		           $("#idExClientTask").show();
	    		   $("#idADDProspectTaskName").hide();
	    		   $("#idPrClientTask").hide();
	    		   
		           showTask(timeperiodTask);
		           
		           //Existing
		           $("#idClientTypeTask").on("change", function (event) {
		        	   clientTypeTask = this.value;
		        	    if (this.value == 'ExistingClient') {
		        	    	
		        	    	 $("#idADDExistingTaskName").show();
		        	    	 $("#idExClientTask").show();
		        	    	 $("#idADDProspectTaskName").hide();
		        	    	 $("#idADDProspectTaskName").val("");
		        	    	 $("#idPrClientTask").hide();
		        	    	 clearClientTask("ADD",this.value);
		        	    }
		        	    else if (this.value == 'ProspectClient') {
		        	    
		        	    	$("#idADDProspectTaskName").show();
		        	    	$("#idPrClientTask").show();
		        	    	$("#idADDExistingTaskName").hide();
		        	    	$("#idADDExistingTaskName").val("");
		        	    	$("#idExClientTask").hide();
		        	    	clearClientTask("ADD",this.value);
		        	    }
		        	});
		          
		           //Prospect
		          //populate Client
		           populateClientNameDrop($("#idADDExistingTaskName"));
		           
		           //clientName stored
		           var clientNameTask="";
		           $("#idADDExistingTaskName").on("change", function (event) {
		        	    var $option = $(this).find('option:selected');
		        	   //clientID = $option.val();
		        	   clientNameTask = $option.text();
		           });
		           
			     //addClientTask
			       $("#idClientAddTask").on("click", function (event) {
					//alert("clientTypeTask "+clientTypeTask);
					if (validateClientTask($("#idClientAddTaskForm"),"ADD",clientTypeTask)){
						//showLoaderOnSave("#idClientAddTask");
						//window.setTimeout(function(){
					
						var formData = $('#idClientAddTaskForm').serializeToJSON();
						formData["userID"]=loggedUser.id;
						if(clientTypeTask == 'ExistingClient'){
						formData["name"]=clientNameTask;
						formData["time"] = $("#timepicker2").val();
					    }
						var data = JSON.stringify(formData);
						console.log(data);
						
						saveData("POST", data, "createClientTask", onCreateClientTaskSuccess);
						
						//}, 1000);	
						showTaskAfterEditDelete(timeperiodTask);
					}
					});

					function onCreateClientTaskSuccess(data) {
						bootBoxAddMsg();
						 $("#idClientAddTaskForm").trigger("reset");
						//hideLoaderOnSave("#clientMeetingForm");
						//$(".onpopupscroller").css("overflow","visible");
					    //  modal9.style.display = "none";
						 $("#idClientAddTask").prop('disabled', false);
						 showTaskAfterEditDelete(timeperiodTask);
						 
					}
					//get data into modal for edit
				
					    function getTaskData(editDeleteTaskId){
						 serviceurl = "clientTask/" +editDeleteTaskId;
						 getAdvisorClientData("GET", "" , serviceurl, onEditClientTaskSuccess);
						 function onEditClientTaskSuccess(data)
						 {
							 if(data.clientType == "ExistingClient"){
							  $("#idExClientTaskEdit").show();
							  $("#idPrClientTaskEdit").hide();	
							  }else{
							  $("#idPrClientTaskEdit").show();
							  $("#idExClientTaskEdit").hide();	
							 }
							 
							 $("#idPrClientProspect").hide();
							 $("#idEditTaskName").val(data.name);
							 $("#idedittaskDate").val(data.taskDate);
							 $("#timepicker4").val(data.time);
							 $("#idEditTask").val(data.taskDescription);
							 $("#idEditTaskComment").val(data.comment);
							 
							 
							 
						 }
					}
					   //update task data in modal
					   $("#idUpdatetask").on("click", function (event) {
							
							if (validateClientTask($('#idEditTaskForm'),"EDIT","")){
								//showLoaderOnSave("#idUpdatetask");
								//window.setTimeout(function(){
								var formData = $('#idEditTaskForm').serializeToJSON();
								formData["userID"]=loggedUser.id;
								formData["id"]= editDeleteTaskId;
								formData["time"] = $("#timepicker4").val();
								var data = JSON.stringify(formData);
								
								saveData("POST", data, "createClientTask", onEditClientTaskSuccess);
								
								//}, 1000);	
							}
							});

							function onEditClientTaskSuccess(data) {
								//$("#idEditTaskForm").trigger("reset");
								//hideLoaderOnSave("#clientMeetingForm");
								//$(".onpopupscroller").css("overflow","visible");
							    //  modal9.style.display = "none";
								 bootBoxEditMsg();
								 $("#idUpdatetask").prop('disabled', false);
								 showTaskAfterEditDelete(timeperiodTask);
		 
						}
					//delete
							
					function deleteTaskdata(editDeleteTaskId){
							
						//alert("editDeleteTaskId "+editDeleteTaskId);
						serviceurl = "clientTask/delete/" +editDeleteTaskId;
						getAdvisorClientData("GET", "" , serviceurl, onDeleteClientTaskSuccess);
						function onDeleteClientTaskSuccess(data)
						{
							showTaskAfterEditDelete(timeperiodTask)
					    }
					}
				    
				     function showTask(timeperiodTask){
					 serviceurl = "clientTaskList/user/" +loggedUser.id+"/"+timeperiodTask;
					 getAdvisorClientData("GET", "" , serviceurl, onClientTaskTimeSuccess);
					 function onClientTaskTimeSuccess(data)
					 {

							var html="";
							length=data.length;
							$("#idTaskRow").empty();
							$("#idTasPinboardList").empty();
							if(length>0){
							taskID = [];
							taskIDModal = [];
							$.each(data, function(key, value) {
								 taskID.push(value.id);
								 editDeleteTaskId = taskID[0];
								 taskIDModal = taskID[0];
								 taskDate = moment(value.taskDate,'DD/MM/YYYY').format('DD MMM YY');
								// alert(value.id+"   "+value.name+" "+taskDate+" "+value.time+" "+value.task+" "+value.status);
								
								  /*   <div class="mySlides4 fade4">
							        <div style="width:230px" >
								   <table class="" style="width: 97%;margin-top: -45px;">
									<tr>
									<td class="dashboardinnerheading" colspan="3"><span class="bgblurheadingclr">Nikhil Agrawal</span>
									<img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/> 
									<span style="float:right">	
									<img src="../Common/assets/images/edit-icon1.png" id="idedittask" style="width:29px"/> 
									<img src="../Common/assets/images/delete-icon1.png" style="width:29px"/></span></td>
									</tr>
									<tr style="font-size: 12px">
									<td class="textalignlft">Task</td>
									<td style="text-align:left !important">Date</td>
									<td class="textalignlft">Time
									</td>
									</tr>
									<hr/>
									<tr style="font-size: 12px;">
									<td class="textalignlft resulttopbrdr"><b>Prepare Financial Plan</b></td>
									<td style="text-align:left !important" class="resulttopbrdr"><b>19 Aug 17</b></td>
									<td class="textalignlft resulttopbrdr"><b>9:30 am</b></td>
									</tr>
									</table>
							        </div>
							        </div> 
								 */
								if((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" ) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y" )){
									html += taskDivWithAddEditDelete(value.name, value.taskDescription, value.taskDate, value.time);
								}
								if((loggedUser != null) && (loggedUser.clientInfoDelete === null || loggedUser.clientInfoDelete === "N" )){
									 html += taskDivWithAddEdit(value.name, value.taskDescription, value.taskDate, value.time);
								}
								
								 $("#idTasPinboardModalList").append('<tr>' +
										  '<td>' + value.name + '</td>' +
										  '<td>' + value.taskDescription + '</td>' +
										  '<td>' + value.taskDate + '</td>' +
										  '<td>' + value.time + '</td>' +
										  '<td>' + value.comment + '</td>' +
						                  '</tr>');
				
							});
							  
							  html+='<a class="prev11" onclick="plusSlides4(-1)">&#10094;</a>'+
					                '<a class="next11" onclick="plusSlides4(1)">&#10095;</a>'; 
							  $("#idTaskRow").html(html);
					  		  showSlides4(slideIndex4=1);
					  					  		
						}
					 }
				     }
					 
					 $("#idTaskTimePeriod").on('change', function(){
					     var val = $(this).val();
					     timeperiodTask = val;
					     serviceurl = "clientTaskList/user/" +loggedUser.id+"/"+val;
						 getAdvisorClientData("GET", "" , serviceurl, onClientTaskTimeSuccess1);
						 function onClientTaskTimeSuccess1(data)
						 {
							    
								var html="";
								length=data.length;
								
								$("#idTaskRow").empty();
								if(length>0){
								taskID = [];
								$.each(data, function(key, value) {
									 taskID.push(value.id);
									 editDeleteTaskId = taskID[0];
									 taskDate = moment(value.taskDate,'DD/MM/YYYY').format('DD MMM YY');
									if((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" ) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y" )){
										 html += taskDivWithAddEditDelete(value.name, value.taskDescription, value.taskDate, value.time);
									}
									if((loggedUser != null) && (loggedUser.clientInfoDelete === null || loggedUser.clientInfoDelete === "N" )){
										 html += taskDivWithAddEdit(value.name, value.taskDescription, value.taskDate, value.time);
									}
								});
								  
								    //html+='<a class="prev4" onclick="plusSlides3(-1)">&#10094;</a><a class="next4" onclick="plusSlides3(1)">&#10095;</a>';

								   html+='<a class="prev11" onclick="plusSlides4(-1)">&#10094;</a>'+
							             '<a class="next11" onclick="plusSlides4(1)">&#10095;</a>'; 
								   
						  		    $("#idTaskRow").html(html);
						  		    showSlides4(slideIndex4=1);		  		
							   }
						    }
				      });
					 
					 
					 $("#idTaskTimePeriodModal").on('change', function(){
						
					      timeperiodTaskModal = $(this).val();				    
					     clientTaskOnTimeperiod(timeperiodTaskModal);
					 });
					    function clientTaskOnTimeperiod(timeperiodTaskModal){
					     serviceurl = "clientTaskList/user/" +loggedUser.id+"/"+timeperiodTaskModal;
						 getAdvisorClientData("GET", "" , serviceurl, onClientTaskTimeSuccess2);
						 function onClientTaskTimeSuccess2(data)
						 {
							
								var html="";
								length=data.length;
								$("#idTasPinboardModalList").empty();
								if(length>0){
								$.each(data, function(key, value) {
									 meetingDate = moment(value.meetingDate,'DD/MM/YYYY').format('DD MMM YY');
									 $("#idTasPinboardModalList").append('<tr>' +
											  '<td>' + value.name + '</td>' +
											  '<td>' + value.taskDescription + '</td>' +
											  '<td>' + value.taskDate + '</td>' +
											  '<td>' + value.time + '</td>' +
											  '<td>' + value.comment + '</td>' +
							                  '</tr>');
								});
							
							}
						 }
					  }	 
				  
			   		 
			   
					 function showTaskAfterEditDelete(timeperiodTask){
						 serviceurl = "clientTaskList/user/" +loggedUser.id+"/"+timeperiodTask;
						 getAdvisorClientData("GET", "" , serviceurl, onClientTaskTimeSuccessRow);
						 function onClientTaskTimeSuccessRow(data)
						 {

								var html="";
								length=data.length;	
								$("#idTaskRow").empty();
								if(length>0){
								taskID = [];
								$.each(data, function(key, value) {
									 taskID.push(value.id);
									 editDeleteTaskId = taskID[0];
									 taskDate = moment(value.taskDate,'DD/MM/YYYY').format('DD MMM YY');
								
									if((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" ) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y" )){
										 html += taskDivWithAddEditDelete(value.name, value.taskDescription, value.taskDate, value.time);
									}
									if((loggedUser != null) && (loggedUser.clientInfoDelete === null || loggedUser.clientInfoDelete === "N" )){
										 html += taskDivWithAddEdit(value.name, value.taskDescription, value.taskDate, value.time);
									}
									
								});
								  
								  html+='<a class="prev11" onclick="plusSlides4(-1)">&#10094;</a>'+
						                '<a class="next11" onclick="plusSlides4(1)">&#10095;</a>'; 
								
						  		    $("#idTaskRow").html(html);
						  		    showSlides4(slideIndex4=1);
						  					  		
							}
							
						 }
						
					 }
					 
					
					 $("#idTaskListDownload").click(function(){
						 loadLoader();
						
								var a = document.createElement("a");
								document.body.appendChild(a);
								a.style = "display: none";
								var fileName = "TaskPlannedForAdvisor.xlsx";

								var xhr = new XMLHttpRequest();
							
								xhr.open( "GET", serviceIP + "/clientservice/clientTaskListDownloadForAdvisor/"+loggedUser.id+"/"+timeperiodTaskModal, true);
								xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
								xhr.responseType = "blob";
								xhr.onload = function() {
									console.log("xhr.response "+xhr.response);
									var url = window.URL.createObjectURL(xhr.response);  
									a.href = url;
									a.download = fileName;
									a.click();
									window.URL.revokeObjectURL(url);
									hideLoader();
								};
								xhr.send();  
						

					});
					 
					 function taskDivWithAddEditDelete(name, taskDescription, taskDate, time){
						 var html = "";
						 html+='<div class="mySlides4 fade4">' +
			  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' + 
			  			  '<tr><td class="dashboardinnerheading" Colspan="3"><span class="bgblurheadingclr">'+ name +'</span>'+
			  			  '<img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/>'+
			  			  '<span style="float:right">'+
			  			  '<img src="../Common/assets/images/edit-icon1.png" style="width:29px" id="idedittaskwindow"/>'+
			  			  '<img src="../Common/assets/images/delete-icon1.png" style="width:29px" id="iddeletetaskwindow"/></span></td>'+
						  '</tr>'+
			  			  '<tr style="font-size: 12px">' +
			  			  '<td class="textalignlft">Task</td>' +
			  			  '<td class="text-align:left !important">Date</td>'+
			  			   '<td class="textalignlft">Time</td>'+
			  			  '</tr>'+
			  			  '<hr/>'+
			  			  '<tr style="font-size: 12px;">'+
			  			  '<td class="textalignlft resulttopbrdr"><b>'+taskDescription +'</b></td>'+
			  			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+ taskDate +'</b></td>'+
			  			  '<td class="textalignlft resulttopbrdr"><b>'+ time +'<b></td>'+
			  			  '</tr>'+
			  			  '</table>'+
			  			  '</div></div>';
						 
						 return html;
					 }
			        function taskDivWithAddEdit(name, taskDescription, taskDate, time){
			        	 var html = "";
						 html+='<div class="mySlides4 fade4">' +
			  			  '<div style="width:230px"> <table class="" style="width: 97%;margin-top: -45px;">' + 
			  			  '<tr><td class="dashboardinnerheading" Colspan="3"><span class="bgblurheadingclr">'+ name +'</span>'+
			  			  '<img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/>'+
			  			  '<span style="float:right">'+
			  			  '<img src="../Common/assets/images/edit-icon1.png" style="width:29px" id="idedittaskwindow"/></span></td>'+
						  '</tr>'+
			  			  '<tr style="font-size: 12px">' +
			  			  '<td class="textalignlft">Task</td>' +
			  			  '<td class="text-align:left !important">Date</td>'+
			  			   '<td class="textalignlft">Time</td>'+
			  			  '</tr>'+
			  			  '<hr/>'+
			  			  '<tr style="font-size: 12px;">'+
			  			  '<td class="textalignlft resulttopbrdr"><b>'+ taskDescription +'</b></td>'+
			  			  '<td style="text-align:left !important" class="resulttopbrdr"><b>'+ taskDate +'</b></td>'+
			  			  '<td class="textalignlft resulttopbrdr"><b>'+ time +'<b></td>'+
			  			  '</tr>'+
			  			  '</table>'+
			  			  '</div></div>';
						 
						 return html;
					 }
			       
					 
		//===========End 8th block===============		
					 
					 
					 function populateClientNameDrop(dropId){
				       		getAdvisorClientData("GET", "", "clientMasterList/" + loggedUser.id, clientNameSuccess);
				       		
				       		function clientNameSuccess(data) {
				       		
				       			dropId.find('option').remove();
				       			dropId.append('<option value="">Select Client Name</option>');
				       			var i=0;
				       			$.each(data, function (index, item) {
				       				var name = item.firstName +(item.middleName != ""?item.middleName+" " : " ")+item.lastName;
				       				dropId.append('<option value="' + item.id + '">'+ name + '</option>');
				       			});
				       		}
				          }     
					
	function populateAssetDrop(dropId) {
	 getClientDataAsyncFalse("GET", "", "getAssetForMaturityRenewal", onAssetSuccess);
						
	 function onAssetSuccess(data) {
						
		dropId.find('option').remove();
		var i=0;
		$.each(data, function (index, item) {
		if(i==0){
		asset = item.productName;	
		}
		i++;
		dropId.append('<option value="' + item.productName + '">'
		+ item.productName + '</option>');

		});
					
		}
	}		
		
	function populateInsuranceDrop(dropId) {
		//	//alert("dropId "+dropId);
			getClientDataAsyncFalse("GET", "", "AllInsuranceType", onInsuranceTypeSuccess);
		
			function onInsuranceTypeSuccess(data) {
			
				dropId.find('option').remove();
				var i=0;
				$.each(data, function (index, item) {
					if(i==0){
						insuranceType=item.id;	
					}
					i++;
					dropId.append('<option value="' + item.id + '">'
						+ item.description + '</option>');

				});
			//	//alert("insuranceType inside "+$(dropId+' > option').length);
			}
		}
	
//===================================================					
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
		////alert("unloaded");
	};


   	$(function()
	{
   		$(".popupwindow").popupwindow(profiles);
   	});	
	
	
	
	
	
//** code for max window clientsnapshot**//*
	
var modal = document.getElementById("idPopnetworth");

// Get the button that opens the modal
var btn = document.getElementById("idMaxnetworthsum");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
	$("#idClientListDashBoard").empty();
	$("#idModalClientListTimePeriod").val(7);
	allClients();
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
	//** code for max window assetclasswise**//*
	
var modal1 = document.getElementById("idPopassetwise");

// Get the button that opens the modal
var btn1 = document.getElementById("idMaxassetclass");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal 
btn1.onclick = function() {
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


//** code for max window product type wise**//*
	
var modal2 = document.getElementById("idPoptypewise");

// Get the button that opens the modal
var btn2 = document.getElementById("idMaxtypewise");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}
	
	
	//** code for max window asset maturity **//*
	
var modal3 = document.getElementById("idPopassetmaturity");

// Get the button that opens the modal
var btn3 = document.getElementById("idmaxassetmaturity");

// Get the <span> element that closes the modal
var span3 = document.getElementsByClassName("close3")[0];

// When the user clicks the button, open the modal 
btn3.onclick = function() {
	$("#idAssetTable").empty();
	$("#idTimePeriodModalSelect").val(1);
	assetMatuirityTimePeriod(1);
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
}



	//** code for max window Insurance maturity **//*
	
var modal4 = document.getElementById("idPopInsurancematurity");

// Get the button that opens the modal
var btn4 = document.getElementById("idmaxinsurancematurity");

// Get the <span> element that closes the modal
var span4= document.getElementsByClassName("close4")[0];

// When the user clicks the button, open the modal 
btn4.onclick = function() {
	$("#idTimePeriodModalSelectInsurance").val(1);
	$("#idTimePeriodModalSelectInsuranceTable").empty();
	insuranceModaltimeperiod(1);
	$(".onpopupscroller").css("overflow","hidden");
    modal4.style.display = "block";
}

/*$("#IdInsuranceImg").on("click", "#idmaxinsurancematurity", function(){
	$(".onpopupscroller").css("overflow","hidden");
    modal4.style.display = "block";
    
});*/

// When the user clicks on <span> (x), close the modal
span4.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal4.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
}


//** code for max window clientbday **//*
	
	var modal5 = document.getElementById("idPopClientbday");

// Get the button that opens the modal
var btn5 = document.getElementById("idmaxClientbday");

// Get the <span> element that closes the modal
var span5= document.getElementsByClassName("close5")[0];

// When the user clicks the button, open the modal 
btn5.onclick = function() {
	 $("#idlistUpcomingBirthday").empty();
	 $("#idSelectBirthdayList").val(1);
     birthdayListTimeperiod(1);
	$(".onpopupscroller").css("overflow","hidden");
    modal5.style.display = "block";
}
/*$("#IdBirthdayRemindersImg").on("click", "#idmaxClientbday", function(){
	$(".onpopupscroller").css("overflow","hidden");
    modal5.style.display = "block";
    
});*/

// When the user clicks on <span> (x), close the modal
span5.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal5.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal5) {
        modal5.style.display = "none";
    }
}


//** code for max window meeting calendar**//*
	
	var modal6 = document.getElementById("idPopmeeting");

// Get the button that opens the modal
var btn6 = document.getElementById("idmaxmeeting");

// Get the <span> element that closes the modal
var span6= document.getElementsByClassName("close6")[0];

// When the user clicks the button, open the modal 
btn6.onclick = function() {
	 $("#idClientMeetingList").empty();
	 $("#idMeetingtimeperiodModal").val(1);
	 meetinglistOnTimePeriod(1);
	$(".onpopupscroller").css("overflow","hidden");
    modal6.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span6.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal6.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal6) {
        modal6.style.display = "none";
    }
}




//** code for max window task pinboard**//*
	
var modal7 = document.getElementById("idPoptaskpin");

// Get the button that opens the modal
var btn7 = document.getElementById("idMaxtaskpin");

// Get the <span> element that closes the modal
var span7= document.getElementsByClassName("close7")[0];

// When the user clicks the button, open the modal 
btn7.onclick = function() {
	 $("#idTasPinboardModalList").empty();
	 $("#idTaskTimePeriodModal").val(1);
	 clientTaskOnTimeperiod(1);
	$(".onpopupscroller").css("overflow","hidden");
    modal7.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span7.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal7.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal7) {
        modal7.style.display = "none";
        
    }
	}

//** code for max window upcoming goals**//*
	
	var modal8 = document.getElementById("idPopupcomingoal");

// Get the button that opens the modal
var btn8 = document.getElementById("idMaxupcomingoal");

// Get the <span> element that closes the modal
var span8= document.getElementsByClassName("close8")[0];

// When the user clicks the button, open the modal 
btn8.onclick = function() {
	 $("#idListUpcomingGoal").empty();
	 $("#idSelectUpcomingGoal").val(7);
	 goalListOnTimePeriod(7);
	$(".onpopupscroller").css("overflow","hidden");
    modal8.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span8.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal8.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal8) {
        modal8.style.display = "none";
    }
	}
	
	//** code for add meeting1 btn**//*
	
var modal9 = document.getElementById("idPopaddmeeting");

// Get the button that opens the modal
var btn9;
if((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )){
	btn9= document.getElementById("idaddmtngwindow");
	
	// When the user clicks the button, open the modal 
	btn9.onclick = function() {
		$(".onpopupscroller").css("overflow","hidden");
	    modal9.style.display = "block";
	    
	    //new
	    $("#idExistingNameMeeting").show();
	    $("#idExClientMeeting").show();
		$("#idProspectNameMeeting").hide();
		$("#idPrClientMeeting").hide();
		
		clearClientMeeting('ADD','Existing');
		$("#idClientTypeMeeting").val("Existing");

	}
}


// Get the <span> element that closes the modal
var span9= document.getElementsByClassName("close9")[0];



// When the user clicks on <span> (x), close the modal
span9.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal9.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal9) {
        modal9.style.display = "none";
    }
}

//** code for add meeting task pinboard btn**//*
	
var modal10 = document.getElementById("idPopaddmeeting2");

// Get the button that opens the modal
var btn10 = document.getElementById("idaddmtngwindow2");

// Get the <span> element that closes the modal
var span10= document.getElementsByClassName("close10")[0];

// When the user clicks the button, open the modal 
btn10.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
    modal10.style.display = "block";
    
    $("#idADDExistingTaskName").show();
    $("#idExClientTask").show();
	$("#idADDProspectTaskName").hide();
	$("#idPrClientTask").hide();	
	clearClientTask('ADD','ExistingClient');	
	$("#idClientTypeTask").val("ExistingClient");
}

// When the user clicks on <span> (x), close the modal
span10.onclick = function() {
	$(".onpopupscroller").css("overflow","visible");
    modal10.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal10) {
        modal10.style.display = "none";
    }
}



	







    
      var modal11 = document.getElementById("idPopeditmeeting");

     

     // Get the <span> element that closes the modal
     var span11= document.getElementsByClassName("close11")[0];

   
      // Get the button that opens the modal
     //var btn11 = document.getElementById("ideditmtngwindow");
     // When the user clicks the button, open the modal 
    /* btn11.onclick = function() {
    	 alert("wqewq");
     	
     }*/
     $("#idMeetingRow").on("click", "#ideditmtngwindow", function(){
    	 
        if((loggedUser != null) && (loggedUser.clientInfoAddEdit === null || loggedUser.clientInfoAddEdit === "N" )){
           $("#idUpdateClientMeeting").hide();
           $("#editHeaderMeeting").hide();
	     } 
        if((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )){
	       $("#viewHeaderMeeting").hide();   
        }
    	   
    	    getData(edit_delete_Id);
    	    $(".onpopupscroller").css("overflow","hidden");
            modal11.style.display = "block";
            clearClientMeeting('EDIT','');
            
    });

     
     $("#idMeetingRow").on("click", "#iddeletemtngwindow", function(){
    	 bootbox.confirm("Are you sure you want to delete?", function(result) {
             if(result){
               deletedata(edit_delete_Id);
             }
         
        });
     });

     /*$(document).on('click','#ideditmtngwindow',function() {
     alert("Hello World");
    });  */
     
  // When the user clicks on <span> (x), close the modal
     span11.onclick = function() {
     	$(".onpopupscroller").css("overflow","visible");
         modal11.style.display = "none";
     }
     
  // When the user clicks anywhere outside of the modal, close it
     window.onclick = function(event) {
         if (event.target == modal11) {
             modal11.style.display = "none";
         }
     	}



  

//** code for edit task  btn**//*
	
var modal12 = document.getElementById("idPopeditask");

// Get the button that opens the modal
var btn12 = document.getElementById("idedittask");

// Get the <span> element that closes the modal
var span12= document.getElementsByClassName("close12")[0];

// When the user clicks the button, open the modal 
/*btn12.onclick = function() {
	$(".onpopupscroller").css("overflow","hidden");
 modal12.style.display = "block";
}*/
  $("#idTaskRow").on("click", "#idedittaskwindow", function(){
    if((loggedUser != null) && (loggedUser.clientInfoAddEdit === null || loggedUser.clientInfoAddEdit === "N" )){
    	$("#idUpdatetask").hide();
    	$("#editHeaderTask").hide();
    }
    if((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )){
    	$("#viewHeaderTask").hide();
    }
	getTaskData(editDeleteTaskId);
    $(".onpopupscroller").css("overflow","hidden");
    modal12.style.display = "block";
    clearClientTask('EDIT','');
    
});
$("#idTaskRow").on("click", "#iddeletetaskwindow", function(){
	 bootbox.confirm("Are you sure you want to delete?", function(result) {
     if(result){
     deleteTaskdata(editDeleteTaskId);
     }
    
   });
});
// When the user clicks on <span> (x), close the modal
span12.onclick = function() {
$(".onpopupscroller").css("overflow","visible");
 modal12.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
 if (event.target == modal12) {
     modal12.style.display = "none";
 }
	}






//** slideshow for asset maturity **//*

/*var slideIndex;
//showSlides(slideIndex);

function plusSlides(n) {
  console.log("plusSlides n "+n);
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  console.log("currentSlide n "+n);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  console.log("showSlides n "+n);
  var i;
  var slides = document.getElementsByClassName("mySlides");
  console.log("slides.length "+slides.length);
  var dots = document.getElementsByClassName("dot");
  console.log("dots.length "+dots.length);
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active1", "");
  }
  console.log("slideIndex  "+slideIndex);
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active1";
}*/



//** slideshow for InsuranceMaturity **//*

/*var slideIndex1;
//showSlides1(slideIndex1);

function plusSlides1(n) {
  showSlides1(slideIndex1 += n);
}

function currentSlide1(n) {
  showSlides1(slideIndex1 = n);
}

function showSlides1(n) {
  var i;
  var slides1 = document.getElementsByClassName("mySlides1");
  var dots1 = document.getElementsByClassName("dot1");
  if (n > slides1.length) {slideIndex1 = 1}    
  if (n < 1) {slideIndex1 = slides1.length}
  for (i = 0; i < slides1.length; i++) {
      slides1[i].style.display = "none";  
  }
  for (i = 0; i < dots1.length; i++) {
      dots1[i].className = dots1[i].className.replace(" active2", "");
  }
  slides1[slideIndex1-1].style.display = "block";  
  dots1[slideIndex1-1].className += " active2";
}
*/


//** slideshow for clientbday **//*



	






//** slideshow for upcoming board**//*



/*<div class="mySlides5 fade5">
<div style="width:230px"> <table class="" style="width: 97%; margin-top: -45px;">
<tr><td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">Supraad Hrt Chakraborty</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/>
</td></tr>
<tr><td class="textalignlft">Goals</td><td class="textalignlft" ></td>
<td class="textalignlft">Goal Start Year and Month</td></tr>
<hr/>
<tr style="font-size: 12px;"><td class="textalignlft resulttopbrdr"><b>1</b></td>
<td class="textalignlft resulttopbrdr"><b></b></td>
<td style="text-align:left !important" class="resulttopbrdr"><b>Jan/2017</b></td>
</tr></table>
</div>
</div>*/

function onLoadAllPieCharts() {
	
	 Highcharts.chart('producttype', {
	       chart: {
	           plotBackgroundColor: '#ececec',
				
	           plotBorderWidth: null,
	           plotShadow: false,
	           type: 'pie'
	       },
	       legend: {
			  fontSize: '1em',
	           align: 'right',
				backgroundColor: '#ececec',
	       verticalAlign: 'bottom',
			layout: 'horizontal',
	       itemStyle: {
	               color: '#000000',
	                fontSize: '12px'
	           }
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
	                   enabled: false
	               },
	               showInLegend: true
	           }
	       },
	       series: [{
	           name: 'Assets',
	           colorByPoint: true,
	            innerSize: '30%',
	          fontSize: '1px',
	           data: [{
	               name: 'Direct Equity',
	               y: totalDirectEquityPercentage,
	               fontSize: '1px'
	           }, {
	               name: 'MF/ETF/PMS',
	               y: totalMfEtfPmsPercentage,
	               sliced: true,
	               selected: true
	           }, {
	               name: 'Deposit/Bonds',
	               y: totalDepositBondsPercentage
	           }, {
	               name: 'Small Saving Schemes',
	               y: totalSmallSavingScemesPercentage
	           }, {
	               name: 'Retirement Schemes',
	               y: totalRetiRementScemesPercentage
	           }, {
	               name: 'Cash',
	               y: totalCash1Percentage
	           },{
	               name: 'Alternate Investments',
	               y: totalCash1Percentage
	           }]
	       }]
	   });
		
	
	
	 // Build the chart
  	 Highcharts.chart('assetclass', {
       chart: {
           plotBackgroundColor: '#ececec',
			
           plotBorderWidth: null,
           plotShadow: false,
           type: 'pie',
           height: 250
       },
       legend: {
           align: 'center',
			backgroundColor: '#ececec',
       verticalAlign: 'bottom',
		
       layout: 'vertical',
           itemStyle: {
               color: '#000000',
        fontSize: '12px'
           }
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
                   enabled: false
               },
               showInLegend: true
           }
       },
       series: [{
           name: 'Assets',
           colorByPoint: true,
            innerSize: '30%',
          fontSize: '5px',
           data: [{
               name: 'Equity',
               y: totalEquityPercentage
            
           },
			{
               name: 'Debt',
               y: totalFixedIncomePercentage,
				 sliced: true,
               selected: true
           }, {
               name: 'Alternatives',
               y: totalalAlternatePercentage
           },{
               name: 'Cash',
               y: totalCashPercentage
              
           }]
       }]
   });
  	 
  	hideLoader();
}
	

});
var slideIndex;
//showSlides(slideIndex);

function plusSlides(n) {
console.log("plusSlides n "+n);
showSlides(slideIndex += n);
}

function currentSlide(n) {
console.log("currentSlide n "+n);
showSlides(slideIndex = n);
}

function showSlides(n) {
console.log("showSlides n "+n);
var i;
var slide=0;
slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("dot");
if (n > slides.length) { slideIndex = 1}  
if (n < 1) {slideIndex = slides.length}
for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
}
for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active1", "");
}
console.log("slideIndex  "+slideIndex);
if(slides.length>0){
slides[slideIndex-1].style.display = "block";  

}
if(slideIndex>=1 &&  slideIndex<=3)
dots[slideIndex-1].className += " active1";
}

var slideIndex1;
//showSlides1(slideIndex1);

function plusSlides1(n) {
showSlides1(slideIndex1 += n);
}

function currentSlide1(n) {
showSlides1(slideIndex1 = n);
}

function showSlides1(n) {
var i;
var slides1 = document.getElementsByClassName("mySlides1");
var dots1 = document.getElementsByClassName("dot1");
if (n > slides1.length) {slideIndex1 = 1}    
if (n < 1) {slideIndex1 = slides1.length}
for (i = 0; i < slides1.length; i++) {
  slides1[i].style.display = "none";  
}
for (i = 0; i < dots1.length; i++) {
  dots1[i].className = dots1[i].className.replace(" active2", "");
}


if(slides1.length>0)
slides1[slideIndex1-1].style.display = "block";  
if(slideIndex1>=1 &&  slideIndex1<=3)
dots1[slideIndex1-1].className += " active2";
}
//==========================================
//** slideshow for meeting calendar **//*
var slideIndex3;


function plusSlides3(n) {
showSlides3(slideIndex3 += n);
}

function currentSlide3(n) {
showSlides3(slideIndex3 = n);
}

function showSlides3(n) {
var i;
var slides3 = document.getElementsByClassName("mySlides3");
var dots3 = document.getElementsByClassName("dot3");
if (n > slides3.length) {slideIndex3 = 1}    
if (n < 1) {slideIndex3 = slides3.length}
for (i = 0; i < slides3.length; i++) {
  slides3[i].style.display = "none";  
}
for (i = 0; i < dots3.length; i++) {
  dots3[i].className = dots3[i].className.replace(" active4", "");
}

if(slides3.length != 0){
slides3[slideIndex3-1].style.display = "block";  

if(slideIndex3>=1 &&  slideIndex3<=3)
dots3[slideIndex3-1].className += " active4";
edit_delete_Id = meetingID[slideIndex3-1];
}
}





//=============================================
var slideIndex2;
//showSlides2(slideIndex2);

function plusSlides2(n) {
  showSlides2(slideIndex2 += n);
}

function currentSlide2(n) {
  showSlides2(slideIndex2 = n);
  }

function showSlides2(n) {
  var i;
  var slides2 = document.getElementsByClassName("mySlides2");
  var dots2 = document.getElementsByClassName("dot2");
  if (n > slides2.length) {slideIndex2 = 1}    
  if (n < 1) {slideIndex2 = slides2.length}
  for (i = 0; i < slides2.length; i++) {
      slides2[i].style.display = "none";  
  }
  for (i = 0; i < dots2.length; i++) {
      dots2[i].className = dots2[i].className.replace(" active3", "");
  }

  if(slides2.length!=0){
  slides2[slideIndex2-1].style.display = "block";  
  if(slideIndex2>=1 &&  slideIndex2<=3)
  dots2[slideIndex2-1].className += " active3";
  }
}



var slideIndex5;
//showSlides5(slideIndex5);

function plusSlides5(n) {
  showSlides5(slideIndex5 += n);
}

function currentSlide5(n) {
  showSlides5(slideIndex5 = n);
}

function showSlides5(n) {
  
  var i;
  var slides5 = document.getElementsByClassName("mySlides5");
  var dots5 = document.getElementsByClassName("dot5");
  if (n > slides5.length) {slideIndex5 = 1}    
  if (n < 1) {slideIndex5 = slides5.length}
//  console.log("slides5.length "+slides5.length);
  for (i = 0; i < slides5.length; i++) {
//	  console.log("slides5[i] "+slides5[i]);
      slides5[i].style.display = "none";  
  }
  for (i = 0; i < dots5.length; i++) {
      dots5[i].className = dots5[i].className.replace(" active4", "");
  }
//  console.log("n "+n);
 // console.log("slideIndex5 "+slideIndex5);
 // console.log("slides5.length "+slides5.length);
  if(slides5.length!=0){
  slides5[slideIndex5-1].style.display = "block"; 
  if(slideIndex5>=1 &&  slideIndex5<=3)
  dots5[slideIndex5-1].className += " active4";
  }

}
//** slideshow for task pinboard**//*

var slideIndex4;
//showSlides4(slideIndex4);


function plusSlides4(n) {
  ///alert("n "+n);
  //alert("slideIndex4 "+slideIndex4);
  showSlides4(slideIndex4 += n);
}

function currentSlide4(n) {
  //alert("n "+n);
  //alert("slideIndex4 "+slideIndex4);
  showSlides4(slideIndex4 = n);
}

function showSlides4(n) {
  var i;
  var slides4 = document.getElementsByClassName("mySlides4");
  var dots4 = document.getElementsByClassName("dot4");
 // alert("slides4 "+slides4.length);
 // alert("dots4 "+dots4.length);
  if (n > slides4.length) {slideIndex4 = 1}    
  if (n < 1) {slideIndex4 = slides4.length}
  for (i = 0; i < slides4.length; i++) {
      slides4[i].style.display = "none"; 
      //alert("slides4[i] none "+slides4[i]);
  }
  for (i = 0; i < dots4.length; i++) {
      dots4[i].className = dots4[i].className.replace(" active4", "");
  }
  //console.log("slideIndex4 "+slideIndex4);
  if(slides4 != 0){
  slides4[slideIndex4-1].style.display = "block";  
  //alert("slides4[i] block "+(slideIndex4-1));
  if(slideIndex4>=1 &&  slideIndex4<=3)
  dots4[slideIndex4-1].className += " active4";
  //alert("dots4[slideIndex4-1] active4 "+(slideIndex4-1));
  editDeleteTaskId = taskID[slideIndex4-1];
  //alert("editDeleteTaskId "+editDeleteTaskId);
  }

}
function loadLoader(){	
	   // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"><span class="fa fa-refresh fa-spin"></span> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;"> <img src="../Common/assets/images/icons/processing-gif-14.gif" alt="Loader" width="42" height="42"> Processing</h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    // var ineerHtml='<div style="width: 250px;height: 75px; text-align: center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; font-size: 16px; z-index: 10; color: rgb(255, 255, 255);"> <div> <h1 id="overlayLoadingText" style=" opacity:0.5; background: rgb(128, 191, 255) none repeat scroll 0% 0%; font-size: 14px; font-weight: bold; width: auto; padding: 10px; color: black;">Processing... </h1> </div></div><div id="overlayLoadingBG" style="background: rgb(0, 0, 0) none repeat scroll 0% 0%; opacity: 0; width: 100%; position: absolute; top: 0px; height: 100%;"></div>';		
	    if(document.getElementById("overlayLoading1")){
	    console.log("overlayLoading1");
	    $("#overlayLoading1").html(ineerHtml).css({'display':'block'});
	  	}
	  	
	    if(document.getElementById("overlayLoading")){
	      console.log("overlayLoading1");
	  	  $("#overlayLoading").html(ineerHtml).css({'display':'block'});
	  	}
	
	    
	}

function hideLoader(){
	  
		   if(document.getElementById("overlayLoading1")){
		   console.log("overlayLoading");
           $("#overlayLoading1").css({'display':'none'}).html("");
		   } 
		   if(document.getElementById("overlayLoading")){
			   console.log("overlayLoading");
			   $("#overlayLoading").css({'display':'none'}).html("");
		   }
}
function bootBoxAddMsg(){
bootbox.alert({
    message: "saved successfully",
    size: "small"
});

}
function bootBoxEditMsg(){
	bootbox.alert({
	    message: "updated successfully",
	    size: "small"
	});
}


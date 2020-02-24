$(".portfoliomax").click(function(){
	
		$("#idClient").empty();
		$("#idClient").load("plan/pm/viewPortfolioTracker.html");
		$("#idpmHeading").html("Portfolio Tracker");
		$("#dashbord").css("height","485px");
		
});


var asset="";
var timePeriod=1;
var insuranceType=1;
var timePeriodInsurance=1;
var specificRequermentStat="";
var lifeAnalysis="Life";
var memberID;
var slideIndex;
var slideIndex2;

$(function () {
	var loggedClient;
	//alert("clientDashboard");
	$("#top-nav-bar").show();
	var selectedClientId = 	sessionStorage.getItem("SELECTED_CLIENT_ID");
	console.log("selectedClientId "+selectedClientId);
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));//client portal
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");//user portal
	}
	//new code for access rights
	console.log("loggedClient "+loggedClient);
	console.log("loggedUser "+loggedUser);
	//======access==========
	var budgetManagementAccess = "N";
	var goalPlanningAccess = "N";
	var portfolioManagementAccess = "N";
    var financialPlanningAccess = "N";

    
    if(loggedClient != null && loggedUser == null){
		$("#id3rdRow").hide();
		$("#goalplanned").hide();
		$("#InsuranceCurrentRecommended").show();

		if(loggedClient.budgetManagementView === "Y"){
			budgetManagementAccess = "Y";
		}
		
		if(loggedClient.goalPlanningView === "Y"){
			goalPlanningAccess = "Y";
		}
		
		if(loggedClient.portfolioManagementView === "Y"){
			portfolioManagementAccess = "Y";
		}
		
		if(loggedClient.financialPlanningView === "Y"){
			financialPlanningAccess = "Y";
		}
	}else{
		if(loggedUser != null && loggedClient != null){
			$("#InsuranceCurrentRecommended").hide();
		
			
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
		}
	}
    console.log("budgetManagementAccess "+budgetManagementAccess);
    console.log("goalPlanningAccess = "+goalPlanningAccess);
    console.log("portfolioManagementAccess "+portfolioManagementAccess);
    console.log("financialPlanningAccess "+financialPlanningAccess);
	
	
	//=======================
	
	/***********************************************************************/	
	//clearing client Cache
	getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
	function onRedisDataSuccess(data) {			
	}
	/***********************************************************************/		
	if (selectedClientId != 0 && selectedClientId != null && selectedClientId != 'udefined')
	{
		getAdvisorClientData("GET", "", "clientMaster/"+selectedClientId, onAgeSuccess);
		function onAgeSuccess(data) {			
			sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID", data.familyMemberId);
			sessionStorage.setItem("SELECTED_CLIENT_DOB", data.birthDate);
			sessionStorage.setItem("SELECTED_CLIENT_LIFE_EXP", data.lifeExpectancy);		
			sessionStorage.setItem("SELECTED_CLIENT_RETIREMENT_STATUS", data.retiredFlag);
			if(data.age>=18){
				$('#idGuardian').hide();
				$('#idGuardianContact').hide();
			}else{
				$('#idGuardian').show();
				$('#idGuardianContact').show();
			}
		}
	}
	
	
	//=========================	Code for displaying the Goal Date Expiration Message =========================
	
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	var lengthOfExpiredGoalList = 0;
	var messageToBeDisplayed = "";
	//alert(selectedClientId);
	var serviceurl = "clientGoalListDateModified/"+ selectedClientId;
	
	getAdvisorClientData("GET", "",serviceurl, onSuccess);
	
	function onSuccess(data) {
		lengthOfExpiredGoalList = data.length; 
		$.each(data, function (index, value) {
			//alert(value.lookupGoalTypeName + " " + value.description + " " + value.priority + " " + value.startMonthYear + " ");
			messageToBeDisplayed = messageToBeDisplayed + "  \"" + value.description + "\" has been expired on " + ( moment(value.startMonthYear,'YYYY-MM-DD').format('MMM-YYYY') ) + " <br> " ;
		});
		
		
		if (lengthOfExpiredGoalList > 0) {
		
			bootbox.confirm({
                title: "Below listed Goal has reached its Expiry Date.",
                message: "" + messageToBeDisplayed,
                callback: function (result) {
                    if (result === true) {
                    	
                    	
                    	$("#idClient").empty();
                		$("#deleteMessage").hide();
                		selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
                		serviceurl = "clientGoalList/"+ selectedClientId;
                		getAdvisorClientData("GET", "",serviceurl, onSuccess);
                		function onSuccess(data) 
                		{
                			if(data.length === 0)
                			{
                				var pageUrl ="clientInfo/addGoalHeader.html";
                				addPage(pageUrl,"Add Goals");
                			}
                			else
                			{
                				sessionStorage.setItem("GOAL_LIST", JSON.stringify(data));
                				$("#idClient").load("clientInfo/viewGoal.html");
                				$(".dashboardheading    ").html("");
                			    $(".dashboardheading    ").html("Goal");							 
                			}
                		}
                        
                		$("#headIcon").empty();
                                    
                        var url = "clientInfo/addGoalHeader.html";
                        var heading="Add Goal";
                        if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
                	        $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
                	        
                	        url = "clientInfo/addGoalHeader.html";
                	        heading="Edit Goals";
                            //$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\""+url+"\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
                            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPageGoal()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
                	        }else{
                				//if  view access present and add/Edit not present then edit button will be named as view details
                				if(((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y" ))){
                				heading="View Goals Details";
                				$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPageGoal(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
                				}
                			}

                			//if  Delete access present
                			if(((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y" ))){
                				$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
                			}
                        $("#wrapper").css("height","auto");
                		$(".form-section-container").css("height","auto");	
                		
                        $("#addRecord").removeClass('btn_Disabled');
                        $('#editRecord').addClass('btn_Disabled');
                        $('#deleteRecord').addClass('btn_Disabled');
                        
                    }

                }
            });
			
			
		}
		
		
	}
	
	
	
	//=========================	End of code for displaying the Goal Date Expiration Message =========================


	//=============================================================
	
	
	 populateInsuranceDrop($("#idInsurancTypeList"));
	
	 
	 var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	 //=====================1st block netWorth============================//
//	 alert("portfolioManagementAccess "+portfolioManagementAccess);
	 if(portfolioManagementAccess === "Y"){
	  var todaydate=moment().format("MMMDD,YYYY");
	
	  $("#idtodaydate").html(todaydate);
	
	
	 //serviceurl=REQUEST_URL_PM+'/getClientNetworth?clientId='+selectedClientId,
	  //console.log("serviceurl "+serviceurl);
	  
	  var assets=0,Liabilities=0,networth=0,Personal=0,Investment=0;
	  $.ajax({
			type: 'GET',
			async : false,
			url: REQUEST_URL_PM+'/getClientNetworth?clientId='+selectedClientId,
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function (data) {
				$.each(data.totaltypeValueMap, function(key, value) {
				//  alert(key+ ':' + value);
				  if(key=="Personal"){
				  Personal=value;  	
				  }  
                 if(key=="Liabilities"){
                 Liabilities=value; 	
				  }  
                 if(key=="Investment"){
                 Investment=value;
                 }  
				
                
				});
				
				
				assets=Personal+Investment;
				networth=assets-Liabilities;
				 $("#idAssets").html(maskAmountValue(Math.round(assets)));
				 $("#idLiabilities").html(maskAmountValue(Math.round(Liabilities)));
				 $("#idNetworth").html("<span style='text-align:center;font-size:24px' class='rupeesicon'>&#8377</span>" +maskAmountValue(Math.round(data.networthValue)));
			},
	   
	    	error: function (jqXHR, exception) {
	    	
	        var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Could not connect. Verify Service/Server running.';
	        }else if(jqXHR.status == 401){
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
	        } else if (jqXHR.status == 404) {
	            msg = 'Requested page not found. [404]';
	        } else if (jqXHR.status == 500) {
	            msg = 'Internal Server Error [500].';
	        } else if (exception === 'parsererror') {
	            msg = 'Requested JSON parse failed.';
	        } else if (exception === 'timeout') {
	            msg = 'Time out error.';
	        } else if (exception === 'abort') {
	            msg = 'Ajax request aborted.';
	        } else {
	            msg = 'Uncaught Error.\n' + jqXHR.responseText;
	        }
		}
	  
	  }); 
	 }else{
		 $('.unselectable').prop("disabled",true);
	 }//if pm access yes 
	  //=================end 1st block======================================== //
  
	  //=============================2nd block netSurplus============================//
	  if(budgetManagementAccess === "Y"){
	  serviceurl=REQUEST_URL_BM+'/getClientNetSurplusInfo?clientId='+selectedClientId+'&mode=yearly&fpFlag=0';
	  //console.log("serviceurl "+serviceurl);
	 
	 
	 
	  $.ajax({
			type: 'GET',
			async : true,
			url: REQUEST_URL_BM+'/getClientNetSurplusInfo?clientId='+selectedClientId+'&mode=yearly&fpFlag=0',
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function (data) {
				  var i=1;
				  $.each(data,function(index, value) {
					     if(i == 1){
						  $("#idNetSurplusYear").html(value.finYear);
						  $("#idNetSurplusAmount").html("<span style='text-align:center;font-size:24px' class='rupeesicon'>&#8377</span>"+maskAmountValue(Math.round(value.net_surplus)));
						  $("#idNetSurplusIncome").html(maskAmountValue(Math.round(value.income)));
						  $("#idNetSurplusExpenses").html(maskAmountValue(Math.round(value.expense)));
						  $("#idNetSurplusCommittedOutflows").html(maskAmountValue(Math.round(value.committed_outflows)));
						  $("#idNetSurplusLoanPayments").html(maskAmountValue(Math.round(value.loan_outflows)));
						  return false;
					     }  
				  });
			},
	   
	    	error: function (jqXHR, exception) {
	    	
	        var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Could not connect. Verify Service/Server running.';
	        }else if(jqXHR.status == 401){
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
	        } else if (jqXHR.status == 404) {
	            msg = 'Requested page not found. [404]';
	        } else if (jqXHR.status == 500) {
	            msg = 'Internal Server Error [500].';
	        } else if (exception === 'parsererror') {
	            msg = 'Requested JSON parse failed.';
	        } else if (exception === 'timeout') {
	            msg = 'Time out error.';
	        } else if (exception === 'abort') {
	            msg = 'Ajax request aborted.';
	        } else {
	            msg = 'Uncaught Error.\n' + jqXHR.responseText;
	        }
	       
		}
	  
	  });
	  }else{
		  $('.unselectable2').prop("disabled",true);
	  }//if bm access yes
	  //===========================end 2nd block netSurplus=====================================//
	 
	 
	 
	 //===========================3rd Block Risk Profile================================//
	 var riskScore=[];
     
     var serviceurl = "getRiskProfileScore/"+selectedClientId ;
     //console.log("serviceurl "+serviceurl);	
     getAdvisorClientData("GET", "", serviceurl, onSuccess);

     function onSuccess(data) {
     	if(data.riskProfileScore!=null){
     	riskScore.push(parseInt(data.riskProfileScore));
     	}
    
      Highcharts.chart('idRisk', {

          chart: {
              type: 'gauge',
      	
             
          },

          pane: {
              startAngle: -150,
              endAngle: 150,
      	
      		
              background: [{
                  backgroundColor: {
                      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                     
      			   },
                  
              }, {
                  backgroundColor: {
                      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                      stops: [
                          [0, '#333'],
                          [1, '#FFF']
                      ]
                  },
                  borderWidth: 1,
                  outerRadius: '107%'
              }, {
                  // default background
              }, {
                  backgroundColor: '#DDD',
                  borderWidth: 0,
                  outerRadius: '105%',
                  innerRadius: '103%'
              }]
          },

          // the value axis
          yAxis: {
              min: 1,
              max: 10,

             

              tickPixelInterval: 30,
              tickWidth: 2,
              tickPosition: 'inside',
              tickLength: 10,
              tickColor: '#666',
              labels: {
                  step: 2,
                  rotation: 'auto'
              },
              title: {
                  text: '<b>Risk Score</b>',
      		 style:{

                          fontSize: '9px'
                      }       
      			
              },
              plotBands: [{
                  from: 0,
                  to: 3.5,
                  color: '#3a3a4f' 
      			
              }, {
                  from: 3.5,
                  to: 7,
                  color: '#95ceff'
              }, {
                  from: 7,
                  to: 10,
                  color: '#f7a35c',
      			fill:'#f7a35c'
              }]
          },

          series:[{
                  name: 'Score',
                  data: riskScore,
                  dataLabels: {
                      formatter: function () {
                          var kmh = this.y;
                          if(kmh > 0 & kmh < 3.4){
                              
                          return '<span style="color:#3a3a4f;font-size:16px;">'+ kmh + '</span>' ;
                          }
                           if(kmh > 3.4 & kmh < 7){
                              
                          return '<span style="color:#95ceff;font-size:16px;">'+ kmh + '</span>' ;
                          }
                           if(kmh > 7 & kmh < 10){
                              
                          return '<span style="color:#f7a35c;font-size:16px;">'+ kmh + '</span>' ;
                          }
                          
                          
                      },
                     
                  },
                 
              }]


      });
     }
  
	
   //==========================end 3rd block=============================//
  //==========================4th block portfolio tracker==================================//
     if(portfolioManagementAccess === "Y"){
     var todaydate=moment().format("MMMDD,YYYY");
	
	  $("#idtodaydate").html(todaydate);
	  var currentSum = 0;
		var percTotalSum = 0;
		var investmentValSum = 0;
		var tableContent = "";
		var totalInvestVal = 0;
		var totalCurrentVal =  0;
		var totalGainLoss = 0;
		var totalCagr = 0;
		var percentOfTotal;
		var currentValue;
	  var specificRequermentStat="tracker";
//	  serviceurl=REQUEST_URL_PM+'/getClientPortfolioOverview?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat,
	  //console.log("serviceurl "+serviceurl);
	  var length=0;
	  $.ajax({
			type: 'GET',
			async : false,
			url: REQUEST_URL_PM+'/getClientPortfolioOverview?clientId='+selectedClientId+'&specificRequermentStat="tracker"',
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function (data) {
				//	alert("len "+data.length);
				var html="";
				var total=0;
				length=data.length;
				if(length>0){
					var cagr;
					$.each(data, function(key, value) {

						var currentValue = Math.round(value.currentValue);
						total+=currentValue;

						if(!isNaN(value.cagr)){
							cagr=maskAmountValue(parseFloat(value.cagr).toFixed(2));
						}else{
							cagr=value.cagr;
						}


						html+='<div class="mySlides fade">' +
						'<div style="width:230px; position: relative; top: -15px;" > <table class="" style="width: 97%;margin-top: -14px;">' +
						'<tr style="font-size: 12px">' +
						'<td class="resulttopbrdr">Product</td>' +
						'<td class="resulttopbrdr">Value</td>'+
						'<td class="resulttopbrdr">CAGR</td>'+
						'</tr>'+

						'<hr/>'+

						'<tr style="font-size: 12px;">'+
						'<td class="resulttopbrdr">'+value.productName +'</td>'+
						'<td class="resulttopbrdr">'+ maskAmountValue(Math.round(currentValue))+'</td>'+
						'<td class="resulttopbrdr">'+cagr +'</td>'+
						'</tr>'+
						'</table>'+
						'</div></div>';

					});  

					$.each(data, function (index, portfolioTracker) {   	
						if (portfolioTracker.investmentOrPersonFlag == "Y") {
							totalCurrentVal = totalCurrentVal + portfolioTracker.currentValue;
							totalInvestVal = totalInvestVal + portfolioTracker.investmentValue;
						}
					});
					
					$("#idInvestmentPortfolioList").empty();
					$.each(data, function (index, portfolioTracker) {   		
						var investmentValue;
						var gains;
						var cagr;
						if(portfolioTracker.investmentValue==-1){
							investmentValue="N/A";
						}else{
							//parseFloat(portfolioTracker.investmentValue).toFixed(2)
							investmentValue=parseInt(portfolioTracker.investmentValue);
							investmentValSum = investmentValSum + portfolioTracker.investmentValue;
						}

						if(portfolioTracker.gains==-1){
							gains="N/A";
						}else{
							//parseFloat(portfolioTracker.gains).toFixed(2);
							gains=parseInt(portfolioTracker.gains);
						}

						if(!isNaN(portfolioTracker.cagr)){
							cagr=parseFloat(portfolioTracker.cagr).toFixed(2);
						}else{
							cagr=portfolioTracker.cagr;
						}

						 currentValue = parseInt(portfolioTracker.currentValue);
						 percentOfTotal = parseFloat(((portfolioTracker.currentValue)/totalCurrentVal)*100).toFixed(2);
						
						
						//only investment assets will be shown
						if (portfolioTracker.investmentOrPersonFlag == "Y") {
							
							currentSum = currentSum + portfolioTracker.currentValue;
							//percTotalSum = percTotalSum + parseFloat((portfolioTracker.currentPortfolioWeight)*100);
							percTotalSum = parseFloat(percTotalSum) + parseFloat(percentOfTotal);
							var name = portfolioTracker.bankIssuerName == null ? portfolioTracker.productName : portfolioTracker.bankIssuerName; 
							//new
							if(portfolioTracker.productName === 'Mutual Funds'){
							var name = portfolioTracker.productDescLong == null ? portfolioTracker.productName : portfolioTracker.productDescLong; 
							}
							var type = portfolioTracker.bankIssuerName == null ? portfolioTracker.productType :  portfolioTracker.productName;
							tableContent = tableContent + '<tr>' +
							'<td>' + name + '</td>' +
							'<td>' + type + '</td>';

							if(!isNaN(parseFloat(currentValue)) && parseFloat(currentValue) < 0.00){
								tableContent += '<td>' + maskAmountValue(Math.round(currentValue)) + '</td>'; 
							}else{
								if(isNaN(parseFloat(currentValue))) {
									tableContent += '<td>0.00</td>';
								} else {
									tableContent += '<td>' + maskAmountValue(Math.round(currentValue)) + '</td>';
								}

							}

							if(!isNaN(parseFloat(percentOfTotal)) && parseFloat(percentOfTotal) < 0.00){
								tableContent += '<td>' + maskAmountValue(parseFloat(percentOfTotal).toFixed(2)) + '</td>'; 
							}else{
								if(isNaN(parseFloat(percentOfTotal))||(percentOfTotal==0)) {
									tableContent += '<td>0.00</td>';
								} else {
									tableContent += '<td>' + parseFloat(percentOfTotal).toFixed(2) + '</td>';
								}

							}
							if(portfolioTracker.productId==12 || portfolioTracker.productId==13 || portfolioTracker.productId==14 || portfolioTracker.productId==33){
								tableContent += '<td>N/A</td>';
							}else{
							if(!isNaN(parseFloat(investmentValue)) && parseFloat(investmentValue) < 0.00){
								tableContent += '<td>' + maskAmountValue(Math.round(investmentValue)) + '</td>'; 
							}else{
								if(isNaN(parseFloat(investmentValue)) || investmentValue==0) {
									tableContent += '<td>N/A</td>';
								} else {
									tableContent += '<td>' + maskAmountValue(Math.round(investmentValue)) + '</td>';
								}
							}
							}
							//if(portfolioTracker.productId==17){
							//	tableContent += '<td>N/A</td>';
							//}
							//else{
							if(portfolioTracker.productId==12 || portfolioTracker.productId==13 || portfolioTracker.productId==14 || portfolioTracker.productId==33){
								tableContent += '<td>N/A</td>';
							}
							else{
							if (!isNaN(parseFloat(gains))) {
									totalGainLoss = totalGainLoss + Math.round(gains);
							}
							if(!isNaN(parseFloat(gains)) && parseFloat(gains) < 0.00){
								tableContent += '<td>' + maskAmountValue(Math.round(gains)) + '</td>'; 
							}else{
								if (isNaN(parseFloat(gains)) || gains==0) {
									tableContent += '<td>0</td>';
								} else {
									tableContent += '<td>' + maskAmountValue(Math.round(gains)) + '</td>';
							}

							}
							}
							
							//if(portfolioTracker.productId==17){
							//	tableContent += '<td>N/A</td>';
							//}else{
								if (!isNaN(parseFloat(cagr))) {
									//console.log("cagr "+cagr);
									//console.log("percentOfTotal "+percentOfTotal);
									totalCagr = parseFloat(totalCagr + parseFloat((cagr/100)*percentOfTotal));
								    //console.log("total cagr "+parseFloat(totalCagr).toFixed(2));
								}
							if(!isNaN(parseFloat(cagr)) && parseFloat(cagr) < 0.00 && cagr!="N/A"){
								tableContent += '<td>' + maskAmountValue(cagr) + '</td>'; 
							}else{
								 if(isNaN(parseFloat(cagr)) || cagr==-1 || cagr=="N/A" || cagr==null) {
									tableContent += '<td>N/A</td>';
								}
								 if(cagr==0)
								 {
									 tableContent += '<td>0.00</td>';
								 }
								 else {
									tableContent += '<td>' +parseFloat(cagr).toFixed(2)+ '</td>';
								}
							}
							//}
							tableContent=tableContent.replace('<td>NaN</td>',"");
							tableContent.trim();
							tableContent +="</tr>";
						}
						
					}); 
					tableContent += "<tr class='nonglidtotal'>" +
					"<td>Total</td>" +
					"<td></td>" +
					//maskAmountValue(parseInt(currentSum))
					"<td>"+maskAmountValue(parseInt(currentSum))+"</td>" +
					"<td>"+parseFloat(Math.round(percTotalSum)).toFixed(2)+"</td>" +
					//maskAmountValue(parseFloat(totalInvestVal).toFixed(2))
					"<td>"+maskAmountValue(parseInt(totalInvestVal))+"</td>" +
					//maskAmountValue(parseFloat(totalGainLoss).toFixed(2))
					"<td>"+maskAmountValue(parseInt(totalGainLoss))+"</td>" +
					"<td>"+parseFloat(totalCagr).toFixed(2)+"</td>" +
					"</tr>";
					$("#idInvestmentPortfolioList").append(tableContent);


					$("#idTotal").html("<span style='text-align:center;font-size:24px' class='rupeesicon'>&#8377</span>" + maskAmountValue(Math.round(total)));
					// html+='<a class="prev4 carousel-control-prev" onclick="plusSlides(-1)"><span class="carousel-control-prev-icon">&#10094;</span></a><a class="next4 carousel-control-next" onclick="plusSlides(1)"><span class="carousel-control-next-icon">&#10095;</span></a>';

					$("#idPortfolioTracker").html(html);

					showSlides(slideIndex=1);

				}else{
					showSlides(0);
				}








			},
	   
	    	error: function (jqXHR, exception) {
	    	
	        var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Could not connect. Verify Service/Server running.';
	        }else if(jqXHR.status == 401){
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
	        } else if (jqXHR.status == 404) {
	            msg = 'Requested page not found. [404]';
	        } else if (jqXHR.status == 500) {
	            msg = 'Internal Server Error [500].';
	        } else if (exception === 'parsererror') {
	            msg = 'Requested JSON parse failed.';
	        } else if (exception === 'timeout') {
	            msg = 'Time out error.';
	        } else if (exception === 'abort') {
	            msg = 'Ajax request aborted.';
	        } else {
	            msg = 'Uncaught Error.\n' + jqXHR.responseText;
	        }
	        
	    	}
	  
	   
	  });
	  
	  $("#idDownloadModalPortfolioTracker").click(function(){
		
		  getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
          function onRedisDataSuccess(data) {			
					     		//alert(data);
					     	}	
          
				var a = document.createElement("a");
				document.body.appendChild(a);
				a.style = "display: none";
				var fileName = "PortfolioTracker.xlsx";

				var xhr = new XMLHttpRequest();
				//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
				xhr.open( "GET", REQUEST_URL_PM+'/getClientPortfolioOverviewDownload?clientId='+selectedClientId+'&specificRequermentStat="tracker"', true);
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

     }else{
    	 /*alert("unselectable4");
    	 $(".unselectable4").find("*").attr("disabled", "disabled");
    	 $("#idTable4").find("*").attr("disabled", "disabled");
    	 alert("unselectable41");*/
     }
	//=====================end 4th block portfolio tracker============================//

	//================================5th block Asset Allocation=======================//
     if(portfolioManagementAccess === "Y"){
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
			      var subAssetClassPieChartList=[];
				  var currentAssetVSRecommededBarChartList=[];	
				  var specificRequermentStat="";
				  var url=REQUEST_URL_PM+'/getClientPortfolioAssetReview?clientId='+selectedClientId+'&specificRequermentStat=%22overview%22';
				  //console.log("url "+url);
				  var totalAssetValue=0;
				  var length=0;
				  $.ajax({
				  	type: 'GET',
				  	url: REQUEST_URL_PM+'/getClientPortfolioAssetReview?clientId='+selectedClientId+'&specificRequermentStat=%22overview%22',
				  	async: false,
				  	dataType: 'json',
				  	beforeSend: function (xhr){ 
						xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				    },
				  	success: function (data) {
				  		var assetcolorCount=0;
				  	    length=data.length;
				  	    if(length>0){
				  		$.each(data, function (index, assetAllocation) { 
				  			if(assetAllocation.investmentAssetClass!="Total")
				  				{
				  				totalAssetValue = totalAssetValue+assetAllocation.currentValue;
				  				var curretVsRecomBarChartObject = {};
				  				curretVsRecomBarChartObject['name']=assetAllocation.investmentAssetClass;
				  				var dataList=[];
				  				dataList.push(parseFloat(assetAllocation.portFoliototalPercentage.toFixed(2)));
				  				dataList.push(parseFloat(assetAllocation.recomentTotalPercentage.toFixed(2)));
				  				curretVsRecomBarChartObject['data']=dataList;
				  				curretVsRecomBarChartObject['color']=assetcolorNumbering[assetcolorCount];
				  				currentAssetVSRecommededBarChartList.push(curretVsRecomBarChartObject);
				  				
				  				}
				  				assetcolorCount=assetcolorCount+1;
				  			});	
				  	    }else{
				  	    	f(assetAllocation.investmentAssetClass!="Total")
			  				{
			  				
			  				var curretVsRecomBarChartObject = {};
			  				curretVsRecomBarChartObject['name']="";
			  				var dataList=[];
			  			
			  				curretVsRecomBarChartObject['data']=dataList;
			  				curretVsRecomBarChartObject['color']="";
			  				currentAssetVSRecommededBarChartList.push(curretVsRecomBarChartObject);
			  				
			  				}
				  	    }
				  		
				  		
				  		$('#clientdashbarGraph').highcharts({
				            chart: {
				                type: 'column'
				            },
				            title: {
				                text: ''
				            },
				            xAxis: {
				                categories: ['CurrentAA(%)', 'RecommendedAA(%)']
				            },
				            yAxis: {
				                min: 0,
				                title: {
				                    text: ''
				                },
				                stackLabels: {
				                    enabled: false,
				                    style: {
				                        fontWeight: 'bold',
				                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
				                    }
				                }
				            },
				            legend: {
				                  align: 'right',
				        x: -5,
				        verticalAlign: 'bottom',
				        y: 70,
				        floating: true,
				        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#ececec',
				        borderColor: '#CCC',
				        borderWidth: 1,
				        shadow: false
				            },
				            tooltip: {
				                formatter: function() {
				                    return '<b>'+ this.x +'</b><br/>'+
				                        this.series.name +': '+ this.y+'%' +'<br/>'+
				                        'Total: '+ this.point.stackTotal+'%';
				                }
				            },
				            plotOptions: {
								series: {
				        events: {
				            legendItemClick: function() {
				              return false;
				            }
				        }
				    },
				                column: {
				                    stacking: 'normal',
				                    dataLabels: {
				                        enabled: true,
				                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
				                        formatter: function() {
				                            if (this.y === 0) {
				                                return null;
				                            } else {
				                                return Math.round(this.y)+'%';
				                            }
				                        }
				                    }
				                }
				            },
									
				           series: currentAssetVSRecommededBarChartList
				           /*[{
				        name: 'Alternatives',
				            data: [10,9],
							color:"#3a3a4f"
				    }, {
				        name: 'Equity',
				            data: [8,9],
							color:"#95ceff"
				    },  {
				        name: 'Fixed Income',
				            data: [9,11],
							color:"#f7a35c"
				    },{
				        name: 'Cash/Liquid',
				            data: [9,18],
							color:"#90ed7d"
						   }]*/ 
				        	  
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
				        }
				  	}
				 });
         }else{
        	 $('.unselectable5').prop("disabled",true)
         }
	//=================================end 5th block================================//  
	//======================6th block goal planned==============================//
	 serviceurl="";
	 serviceurl = "clientGoalList/"+selectedClientId;
	 getAdvisorClientData("GET", "", serviceurl, onSuccessGoalData);
	  function onSuccessGoalData(data) {
		 ////console.log("len "+data.length);
	     var i=1;
	     var html="";
	   //   var i=1;
	     var length;
	     var flag=0;
	     length=data.length; 
	 
		  if(length>0){
		 
		  $.each(data, function (index, goal) {
			  console.log(data);
			 // var sip="",lumpsum="";
			  var futureValueOfGoal="";
			  startYearMonth = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMMYYYY');
			  if(goal.corpusReqdAtGoalStartOutput!=null){
				  futureValueOfGoal=Math.round(goal.corpusReqdAtGoalStartOutput);
			  }
			 /* if(goal.lumpsum!=null){
				  lumpsum=Math.round(goal.lumpsum);
			  }*/
			  if(i%2!=0){
			  ////console.log("i odd "+i);
			  html+='<div class="mySlides1 fade"><div style="width:230px"><table class="" style="width: 97%;margin-top: -118px;">';
			  } 
			  html+='<hr/><tr>' +
			  '<td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr">' + goal.description + '</span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td>' +
			  '</tr>'+
			  '<tr style="font-size: 12px">'+
			  '<td class="">Start</td>'+
			  '<td class="">Future Value Of Goal</td>'+
			 /* '<td class="">Lumpsum</td>'+*/
			  '</tr>'+
			  '<tr style="font-size: 12px;">'+
			  '<td class="resulttopbrdr"><b>'+startYearMonth+'</b></td>'+
			  '<td class="resulttopbrdr"><b>'+maskAmountValue(futureValueOfGoal)+'</b></td>'+
			/*  '<td class="resulttopbrdr"><b>'+lumpsum+'</b></td>'+*/
			  '</tr>';
			  if(i%2==0){
				//  ////console.log("i even"+i);
				  html+='</table></div></div>';
			   }
			  i++;
		 
			  
			      $("#idGoalList").empty();
				  $.each(data, function (index, goal) {
				  var futureValueOfGoal="";
				 // var sip="",lumpsum="";
				  if(goal.corpusReqdAtGoalStartOutput!=null){
					  futureValueOfGoal=Math.round(goal.corpusReqdAtGoalStartOutput);
				  }
				  /*if(goal.lumpsum!=null){
					  lumpsum=Math.round(goal.lumpsum);
				  }*/
				  startYearMonth = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMM-YY');
	               $("#idGoalList").append('<tr>' +
					  '<td>' + goal.priority + '</td>' +
					  '<td>' + goal.lookupGoalTypeName + '</td>' +
					  '<td>' + goal.description + '</td>' +
					  '<td>' + startYearMonth + '</td>' +
					  '<td>' + maskAmountValue(futureValueOfGoal) + '</td>' +
					  /*'<td>' + lumpsum + '</td>' +*/
	                '</tr>');
					});	
		
		  });
		  if(i%2==0){
			  html+='</table></div></div>';
			  
	/*	
		  html+='<hr/><tr>' +
		  '<td colspan="3" class="dashboardinnerheading"><span class="bgblurheadingclr"></span><img src="../Common/assets/images/arrow.png" style="width: 12px;height: 21px;margin-top: -1px;"/></td>' +
		  '</tr>'+
		  '<tr style="font-size: 12px">'+
		  '<td class="">Start</td>'+
		  '<td class="">SIP</td>'+
		  '<td class="">Lumpsum</td>'+
		  '</tr>'+
		  '<tr style="font-size: 12px;">'+
		  '<td class="resulttopbrdr"><b></b></td>'+
		  '<td class="resulttopbrdr"><b></b></td>'+
		  '<td class="resulttopbrdr"><b></b></td>'+
		  '</tr> </table></div></div>';*/
		
			  
		  }
		 /*html+='<a class="prev4" onclick="plusSlides1(-1)">&#10094;</a><a class="next4" onclick="plusSlides1(1)">&#10095;</a>';*/
		
		 
		
		 $("#idGoalPlanned").html(html);
		 
	
		 
		  showSlides1(slideIndex1=1);
		  
		
		}else{
			  // showSlides1(0);
              $("#idGoalPlanned").hide();
		}
	  }
	 
	  
	   /*  serviceurl = "clientGoalList/"+selectedClientId;
		 getAdvisorClientData("GET", "", serviceurl, onSuccessGoalDataList);
		  function onSuccessGoalDataList(data) {
		      ////console.log("len "+data.length);
		      $("#idGoalList").empty();
			  $.each(data, function (index, goal) {
			 
			  var sip="",lumpsum="";
			  if(goal.sip!=null){
				  sip=goal.sip;
			  }
			  if(goal.lumpsum!=null){
				  lumpsum=goal.lumpsum;
			  }
			  startYearMonth = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMM-YY');
               $("#idGoalList").append('<tr>' +
				  '<td>' + goal.priority + '</td>' +
				  '<td>' + goal.lookupGoalTypeName + '</td>' +
				  '<td>' + goal.description + '</td>' +
				  '<td>' + startYearMonth + '</td>' +
				  '<td>' + sip + '</td>' +
				  '<td>' + lumpsum + '</td>' +
                '</tr>');
				});		 
				 
		       }*/
		//  var serviceIPB = "http://localhost:8081"; // Developer Local
		//  var REQUEST_URL_BM = serviceIPB + "/budgetManagementService";
		//  serviceurl=REQUEST_URL_BM+'/getClientNetSurplusInfo?clientId='+selectedClientId+'&mode=yearly&fpFlag=0',
		  ////console.log("serviceurl "+serviceurl);
		  
		  $("#idDownloadGoalPlanned").click(function(){
					var a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					var fileName = "GoalPlanned.xlsx";

					var xhr = new XMLHttpRequest();
					//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
					xhr.open( "GET", serviceIP + "/clientservice/clientGoalListDownload/"+selectedClientId, true);
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
          
		  //====================end 6th block===========================//
		   
		  
		 
		  
		  
			 
//============================== 7th block Asset Maturity Renewal=================================//
		  if(portfolioManagementAccess === "Y"){
		  populateAssetDrop($("#idAssetList"));
		  /*getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
		  function onRedisDataSuccess(data) {			
	     		//alert(data);
	      }*/				         
		
			  specificRequermentStat="overview";
			  serviceurl=REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiod?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&timePeriod='+timePeriod;
			  console.log("now serviceurl "+serviceurl);
			  var length=0;
			  var bankIssuerName = "";
			
			  $.ajax({
					type: 'GET',
					async : false,
					url: serviceurl,
					dataType: 'json',
					beforeSend: function (xhr){ 
						xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				    },
					success: function (data) {
					
						var html="";
						length=data.length;
					//	alert("length "+length);
						
						if(length>0){
						$.each(data, function(key, value) {
                         if(value.bankIssuerName != null){
                        	 bankIssuerName = value.bankIssuerName;
                         }
							  $("#idAssetTable").append('<tr>' +
									  '<td>' + value.productName + '</td>' +
									  '<td>' + value.bankIssuerName + '</td>' +
									  '<td>' + value.maturityDate + '</td>' +
									  '<td>' + maskAmountValue(Math.round(value.maturityAmount)) + '</td>' +
					                '</tr>');
										   
	                     
						  });
						  
						}
					},
			   
			    	error: function (jqXHR, exception) {
			    	
			        var msg = '';
			        if (jqXHR.status === 0) {
			            msg = 'Could not connect. Verify Service/Server running.';
			        }else if(jqXHR.status == 401){
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
			        } else if (jqXHR.status == 404) {
			            msg = 'Requested page not found. [404]';
			        } else if (jqXHR.status == 500) {
			            msg = 'Internal Server Error [500].';
			        } else if (exception === 'parsererror') {
			            msg = 'Requested JSON parse failed.';
			        } else if (exception === 'timeout') {
			            msg = 'Time out error.';
			        } else if (exception === 'abort') {
			            msg = 'Ajax request aborted.';
			        } else {
			            msg = 'Uncaught Error.\n' + jqXHR.responseText;
			        }
			      
				}
			  
			  });
			  
			 
			  specificRequermentStat="overview";
			
			  serviceurl=REQUEST_URL_PM+'/getClientPortfolioOverviewTimeperiodAndAsset?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod;
			  //console.log("serviceurl "+serviceurl);
			  var length=0;
	
			  $.ajax({
					type: 'GET',
					async : false,
					url: REQUEST_URL_PM+'/getClientPortfolioOverviewTimeperiodAndAsset?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod,
					dataType: 'json',
					beforeSend: function (xhr){ 
						xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				    },
					success: function (data) {
					
						var html="";
						length=data.length;
						$("#idAssetRow").empty();
						if(length>0){
						$.each(data, function(key, value) {
							  html+='<div class="mySlides2 fade">' +
				  			  '<div style="width:230px"> <table class="boxtbls" style="width: 97%;margin-top: -38px;">' +  
				  			  '<tr style="font-size: 12px">' +
				  			  '<td class="resulttopbrdr">Name</td>' +
				  			  '<td class="resulttopbrdr">Maturity Date</td>'+
				  			   '<td class="resulttopbrdr">Maturity Amount</td>'+
				  			  '</tr>'+
				  			  '<hr/>'+
				  			  '<tr style="font-size: 12px;">'+
				  			  '<td class="resulttopbrdr">'+value.productName +'</td>'+
				  			  '<td class="resulttopbrdr">'+ value.maturityDate+'</td>'+
				  			  '<td class="resulttopbrdr">'+maskAmountValue(Math.round(value.maturityAmount)) +'</td>'+
				  			  '</tr>'+
				  			  '</table>'+
				  			  '</div></div>';
			
						});
						  
						    html+='<a class="prev4" onclick="plusSlides2(-1)">&#10094;</a><a class="next4" onclick="plusSlides2(1)">&#10095;</a>';
				  	
				  		    $("#idAssetRow").html(html);
				  		
				  		    showSlides2(slideIndex2=1);
				  		
					}else{
						 showSlides2(0);
					}
					},
			   
			    	error: function (jqXHR, exception) {
			    	
			        var msg = '';
			        if (jqXHR.status === 0) {
			            msg = 'Could not connect. Verify Service/Server running.';
			        }else if(jqXHR.status == 401){
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
			        	
			        }  else if (jqXHR.status == 404) {
			            msg = 'Requested page not found. [404]';
			        } else if (jqXHR.status == 500) {
			            msg = 'Internal Server Error [500].';
			        } else if (exception === 'parsererror') {
			            msg = 'Requested JSON parse failed.';
			        } else if (exception === 'timeout') {
			            msg = 'Time out error.';
			        } else if (exception === 'abort') {
			            msg = 'Ajax request aborted.';
			        } else {
			            msg = 'Uncaught Error.\n' + jqXHR.responseText;
			        }
			        
				}
			  
			  }); 	
				$("#idAssetList").on('change', function(){
				
					asset = $(this).val();
					specificRequermentStat="overview";
			        var url=REQUEST_URL_PM+'/getClientPortfolioOverviewTimeperiodAndAsset?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod
					//console.log("url "+url);
			        $.ajax({
							type: 'GET',
							async : false,
							url: REQUEST_URL_PM+'/getClientPortfolioOverviewTimeperiodAndAsset?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod,
							dataType: 'json',
							beforeSend: function (xhr){ 
								xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
						    },
							success: function (data) {
							
								var html="";
								length=data.length;
								$('#idAssetRow').empty();
								if(length>0){
								$.each(data, function(key, value) {
									  html+='<div class="mySlides2 fade">' +
						  			  '<div style="width:230px"> <table class="boxtbls" style="width: 97%;margin-top: -38px;">' +  
						  			  '<tr style="font-size: 12px">' +
						  			  '<td class="resulttopbrdr">Name</td>' +
						  			  '<td class="resulttopbrdr">Maturity Date</td>'+
						  			   '<td class="resulttopbrdr">Maturity Amount</td>'+
						  			  '</tr>'+
						  			  '<hr/>'+
						  			  '<tr style="font-size: 12px;">'+
						  			  '<td class="resulttopbrdr">'+value.productName +'</td>'+
						  			  '<td class="resulttopbrdr">'+ value.maturityDate+'</td>'+
						  			  '<td class="resulttopbrdr">'+maskAmountValue(Math.round(value.maturityAmount)) +'</td>'+
						  			  '</tr>'+
						  			  '</table>'+
						  			  '</div></div>';
									  
									 
								});
								  
								    html+='<a class="prev4" onclick="plusSlides2(-1)">&#10094;</a><a class="next4" onclick="plusSlides2(1)">&#10095;</a>';
						  		
						  		    $("#idAssetRow").html(html);
						  		  
						  		    showSlides2(slideIndex2=1);
						  		   
							}else{
								
								 showSlides2(0);
							}
							},
					   
					    	error: function (jqXHR, exception) {
					    	
					        var msg = '';
					        if (jqXHR.status === 0) {
					            msg = 'Could not connect. Verify Service/Server running.';
					        } else if(jqXHR.status == 401){
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
					        } else if (jqXHR.status == 404) {
					            msg = 'Requested page not found. [404]';
					        } else if (jqXHR.status == 500) {
					            msg = 'Internal Server Error [500].';
					        } else if (exception === 'parsererror') {
					            msg = 'Requested JSON parse failed.';
					        } else if (exception === 'timeout') {
					            msg = 'Time out error.';
					        } else if (exception === 'abort') {
					            msg = 'Ajax request aborted.';
					        } else {
					            msg = 'Uncaught Error.\n' + jqXHR.responseText;
					        }
					       
						}
					  
					  }); 
				});
			  
				$("#idTimePeriod").on('change', function(){
					timePeriod = $(this).val();
					specificRequermentStat="overview";
					var url=REQUEST_URL_PM+'/getClientPortfolioOverviewTimeperiodAndAsset?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod;
				    //console.log("url "+url);
					$.ajax({
							type: 'GET',
							async : false,
							url: REQUEST_URL_PM+'/getClientPortfolioOverviewTimeperiodAndAsset?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&asset='+asset+'&timePeriod='+timePeriod,
							dataType: 'json',
							beforeSend: function (xhr){ 
								xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
						    },
							success: function (data) {
				
								var html="";
								length=data.length;
			
								$('#idAssetRow').empty();
								if(length>0){
								$.each(data, function(key, value) {
									  html+='<div class="mySlides2 fade">' +
						  			  '<div style="width:230px"> <table class="boxtbls" style="width: 97%;margin-top: -38px;">' +  
						  			  '<tr style="font-size: 12px">' +
						  			  '<td class="resulttopbrdr">Name</td>' +
						  			  '<td class="resulttopbrdr">Maturity Date</td>'+
						  			   '<td class="resulttopbrdr">Maturity Amount</td>'+
						  			  '</tr>'+
						  			  '<hr/>'+
						  			  '<tr style="font-size: 12px;">'+
						  			  '<td class="resulttopbrdr">'+value.productName +'</td>'+
						  			  '<td class="resulttopbrdr">'+ value.maturityDate+'</td>'+
						  			  '<td class="resulttopbrdr">'+maskAmountValue(Math.round(value.maturityAmount)) +'</td>'+
						  			  '</tr>'+
						  			  '</table>'+
						  			  '</div></div>';
									  
									
				
								});
								  
								    html+='<a class="prev4" onclick="plusSlides2(-1)">&#10094;</a><a class="next4" onclick="plusSlides2(1)">&#10095;</a>';
						  		//    ////console.log(html);
						  		    $("#idAssetRow").html(html);
						  		 //   slideIndex2=1;
						  		    showSlides2(slideIndex2=1);
						  		    ////console.log("end ");
							}else{
								 $('#idAssetRow').empty()
								 showSlides2(0);
							}
							},
					   
					    	error: function (jqXHR, exception) {
					    	
					        var msg = '';
					        if (jqXHR.status === 0) {
					            msg = 'Could not connect. Verify Service/Server running.';
					        }else if(jqXHR.status == 401){
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
					        } else if (jqXHR.status == 404) {
					            msg = 'Requested page not found. [404]';
					        } else if (jqXHR.status == 500) {
					            msg = 'Internal Server Error [500].';
					        } else if (exception === 'parsererror') {
					            msg = 'Requested JSON parse failed.';
					        } else if (exception === 'timeout') {
					            msg = 'Time out error.';
					        } else if (exception === 'abort') {
					            msg = 'Ajax request aborted.';
					        } else {
					            msg = 'Uncaught Error.\n' + jqXHR.responseText;
					        }
					       
						}
					  
					  }); 
				});
				var timePeriodAsset;
				$("#idTimePeriodModalSelect").on('change', function(){
					  timePeriod = $(this).val();
					  timePeriodAsset = timePeriod;
					  specificRequermentStat="overview";
					  serviceurl=REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiod?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&timePeriod='+timePeriod;
					  console.log("now1 serviceurl "+serviceurl);
					  
					  var length=0;
					  var bankIssuerName = "";
				
						$.ajax({
							type: 'GET',
							async : false,
							url: REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiod?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&timePeriod='+timePeriod,
							dataType: 'json',
							beforeSend: function (xhr){ 
								xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
						    },
							success: function (data) {
							
								var html="";
								length=data.length;
								
								$("#idAssetTable").empty();
								if(length>0){
								$.each(data, function(key, value) {
									if(value.bankIssuerName != null)
									bankIssuerName = value.bankIssuerName;
									  $("#idAssetTable").append('<tr>' +
											  '<td>' + value.productName + '</td>' +
											  '<td>' + bankIssuerName + '</td>' +
											  '<td>' + value.maturityDate + '</td>' +
											  '<td>' + maskAmountValue(Math.round(value.maturityAmount)) + '</td>' +
							                '</tr>');
												   
			                     
								  });
								  
								}
							},
					   
					    	error: function (jqXHR, exception) {
					    	
					        var msg = '';
					        if (jqXHR.status === 0) {
					            msg = 'Could not connect. Verify Service/Server running.';
					        }else if(jqXHR.status == 401){
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
					        } else if (jqXHR.status == 404) {
					            msg = 'Requested page not found. [404]';
					        } else if (jqXHR.status == 500) {
					            msg = 'Internal Server Error [500].';
					        } else if (exception === 'parsererror') {
					            msg = 'Requested JSON parse failed.';
					        } else if (exception === 'timeout') {
					            msg = 'Time out error.';
					        } else if (exception === 'abort') {
					            msg = 'Ajax request aborted.';
					        } else {
					            msg = 'Uncaught Error.\n' + jqXHR.responseText;
					        }
					       
						}
					  
					  });
				});
				
				 $("#idDownloadModalAssetMaturityRenewal").click(function(){
					  getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
			          function onRedisDataSuccess(data) {			
					  }	
			          
							var a = document.createElement("a");
							document.body.appendChild(a);
							a.style = "display: none";
							var fileName = "AssetMaturityRenewal.xlsx";

							var xhr = new XMLHttpRequest();
							
							  specificRequermentStat="overview";
							  serviceurl=REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodDownload?clientId='+selectedClientId+'&specificRequermentStat='+specificRequermentStat+'&timePeriod='+timePeriod;
							//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
							xhr.open( "GET", REQUEST_URL_PM+'/getclientPortfolioOverviewTimeperiodDownload?clientId='+selectedClientId+'&specificRequermentStat="overview"&timePeriod='+timePeriod, true);
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
		        }else{
		        	$('.unselectable7').prop("disabled",true)
		        }
				//========================end 7th block=========================================//
				
				//====================8th block Insurance Maturity Renewal=========================	//
			
				$("#idTimePeriodModalSelectInsurance").on('change', function(){
					timePeriodInsurance = $(this).val();
					serviceurl = "getLockedUptoDateTimePeriod?clientId="+selectedClientId+'&timePeriod='+timePeriodInsurance;
					getAdvisorClientData("GET", "", serviceurl, onSuccessInsuranceModal);
					  
					  //console.log("serviceurl "+serviceurl);
					  var length=0;
					
					  function onSuccessInsuranceModal (data) {
						
								var html="";
								length=data.length;
							
								$("#idTimePeriodModalSelectInsuranceTable").empty();
								if(length>0){
								$.each(data, function(key, value) {
									   endDate=moment(value.endDate,'DD/MM/YYYY').format('DD-MMM-YY');
								//	   alert("endDate "+endDate);
									  $("#idTimePeriodModalSelectInsuranceTable").append('<tr>' +
											  '<td>' + value.insuranceType + '</td>' +
											  '<td>' + value.lookupPolicyTypeDesc + '</td>' +
											  '<td>' + maskAmountValue(Math.round(value.sumInsured)) + '</td>' +
											  '<td>' + endDate + '</td>' +
							                '</tr>');
												   
			                     
								  });
								  
								}
							}
					  });
         timePeriodInsurance = 1;
         serviceurl = "getLockedUptoDateTimePeriod?clientId="+selectedClientId+'&timePeriod='+timePeriodInsurance;
         getAdvisorClientData("GET", "", serviceurl, onSuccessInsuranceModalonLoad);
         //console.log("serviceurl "+serviceurl);
        
         var length=0;

        function onSuccessInsuranceModalonLoad (data) {
	
			var html="";
			length=data.length;
			
			$("#idTimePeriodModalSelectInsuranceTable").empty();
			if(length>0){
			$.each(data, function(key, value) {
		//		 alert("value.lockedUptoDate "+value.lockedUptoDate);
				 endDate=moment(value.endDate,'DD/MM/YYYY').format('DD-MMM-YY');
		//		 alert("endDate "+endDate);
				  $("#idTimePeriodModalSelectInsuranceTable").append('<tr>' +
						  '<td>' + value.insuranceType + '</td>' +
						  '<td>' + value.lookupPolicyTypeDesc + '</td>' +
						  '<td>' + maskAmountValue(Math.round(value.sumInsured)) + '</td>' +
						  '<td>' + endDate + '</td>' +
		                '</tr>');
							   
             
			  });
			  
			}
	
				  var length=0;
							var html="";
							length=data.length;
						
							 $("#idInsurancetypeTable").empty();
							if(length>0){
							$.each(data, function(key, value) {
								endDate=moment(value.endDate,'DD/MM/YYYY').format('DD-MMM-YY');
					//			alert("endDate "+endDate);
								  html+=' <div class="mySlides3 fade">' +
					  			  '<div style="width:230px"> <table class="boxtbls" style="width: 97%;margin-top: -38px;">' +  
					  			  '<tr style="font-size: 12px">' +
					  			  '<td class="resulttopbrdr">Policy Name</td>' +
					  			  '<td class="resulttopbrdr">Sum Insured</td>'+
					  			   '<td class="resulttopbrdr">Valid till</td>'+
					  			  '</tr>'+
					  			  '<hr/>'+
					  			  '<tr style="font-size: 12px;">'+
					  			  '<td class="resulttopbrdr">'+value.policyName +'</td>'+
					  			  '<td class="resulttopbrdr">'+ maskAmountValue(Math.round(value.sumInsured))+'</td>'+
					  			  '<td class="resulttopbrdr">'+endDate+'</td>'+
					  			  '</tr>'+
					  			  '</table>'+
					  			  '</div></div>';
								  
			
							});
							  
							    /*html+='<a class="prev4" onclick="plusSlides3(-1)">&#10094;</a><a class="next4" onclick="plusSlides3(1)">&#10095;</a>';*/
					  		
					  		    $("#idInsurancetypeTable").html(html);
					  		 
					  		    showSlides3(slideIndex3=1);
					  		  
						}else{
							 showSlides3(0);
						}
						}
				   
				  	
					$("#idInsurancTypeList").on('change', function(){
						
							insuranceType = $(this).val();
				
							var length=0;	
							if(insuranceType==1){
							serviceurl = "getLockedUptoDate?clientId="+selectedClientId+'&timePeriod='+timePeriodInsurance;
							getAdvisorClientData("GET", "", serviceurl, onSuccessInsurancType);
	                        //console.log("serviceurl "+serviceurl);	 
							}else{
							serviceurl = "getPolicyEndDate?clientId="+selectedClientId+'&insuranceType='+insuranceType+'&timePeriod='+timePeriodInsurance;
							getAdvisorClientData("GET", "", serviceurl, onSuccessInsurancType);
		                    //console.log("serviceurl "+serviceurl);		 
							}
							
							
						                function onSuccessInsurancType(data)  {
							
										var html="";
										length=data.length;
									
										    
										 $("#idInsurancetypeTable").empty();
										 var endDate;
										if(length>0){
										$.each(data, function(key, value) {
											/// if(insuranceType=="Life"){
											if(insuranceType==1){
												 endDate=moment(value.endDate,'DD/MM/YYYY').format('DD-MMM-YY');
											 }else{
												 endDate=moment(value.policyEndDate,'DD/MM/YYYY').format('DD-MMM-YY');
											 }
								//			 alert("endDate "+endDate);
											  html+=' <div class="mySlides3 fade">' +
								  			  '<div style="width:230px"> <table class="boxtbls" style="width: 97%;margin-top: -38px;">' +  
								  			  '<tr style="font-size: 12px">' +
								  			  '<td class="resulttopbrdr">Policy Name</td>' +
								  			  '<td class="resulttopbrdr">Sum Insured</td>'+
								  			   '<td class="resulttopbrdr">Valid till</td>'+
								  			  '</tr>'+
								  			  '<hr/>'+
								  			  '<tr style="font-size: 12px;">'+
								  			  '<td class="resulttopbrdr">'+value.policyName +'</td>'+
								  			  '<td class="resulttopbrdr">'+maskAmountValue(Math.round(value.sumInsured))+'</td>'+
								  			  '<td class="resulttopbrdr">'+endDate+'</td>'+
								  			  '</tr>'+
								  			  '</table>'+
								  			  '</div></div>';
											  
						
										});
										  
										    html+='<a class="prev4" onclick="plusSlides3(-1)">&#10094;</a><a class="next4" onclick="plusSlides3(1)">&#10095;</a>';
											
								  		    $("#idInsurancetypeTable").html(html);
								  		
								  		    showSlides3(slideIndex3=1);
								  		   
									}else{
										 showSlides3(0);
									}
						         }		
						      });		
					         $("#idTimePeriodInsurance").on('change', function(){
					
						    timePeriodInsurance = $(this).val();
							var length=0;	
				
							if(insuranceType=="1"){
							serviceurl = "getLockedUptoDate?clientId="+selectedClientId+'&timePeriod='+timePeriodInsurance;
							getAdvisorClientData("GET", "", serviceurl, onSuccessInsuranceTime);
	                        //console.log("serviceurl "+serviceurl);	 
							}else{
							serviceurl = "getPolicyEndDate?clientId="+selectedClientId+'&insuranceType='+insuranceType+'&timePeriod='+timePeriodInsurance;
							getAdvisorClientData("GET", "", serviceurl, onSuccessInsuranceTime);
		                    //console.log("serviceurl "+serviceurl);		 
							}
							
							
							            function onSuccessInsuranceTime (data) {
								
										var html="";
										length=data.length;
										
										    
										 $("#idInsurancetypeTable").empty();
										 var endDate;
										if(length>0){
										$.each(data, function(key, value) {
								//			 alert("insuranceType "+insuranceType);
											if(insuranceType=="1"){
												// alert("value.lockedUptoDate "+value.lockedUptoDate);
												 endDate=moment(value.endDate,'DD/MM/YYYY').format('DD-MMM-YY');
												// alert("endDate "+endDate);
											 }else{
												 endDate=moment(value.policyEndDate,'DD/MM/YYYY').format('DD-MMM-YY');
											//	 alert("endDate "+endDate);
											 }
										
											  html+=' <div class="mySlides3 fade">' +
								  			  '<div style="width:230px"> <table class="boxtbls" style="width: 97%;margin-top: -38px;">' +  
								  			  '<tr style="font-size: 12px">' +
								  			  '<td class="resulttopbrdr">Policy Name</td>' +
								  			  '<td class="resulttopbrdr">Sum Insured</td>'+
								  			   '<td class="resulttopbrdr">Valid till</td>'+
								  			  '</tr>'+
								  			  '<hr/>'+
								  			  '<tr style="font-size: 12px;">'+
								  			  '<td class="resulttopbrdr">'+value.policyName +'</td>'+
								  			  '<td class="resulttopbrdr">'+maskAmountValue(Math.round(value.sumInsured))+'</td>'+
								  			  '<td class="resulttopbrdr">'+endDate+'</td>'+
								  			  '</tr>'+
								  			  '</table>'+
								  			  '</div></div>';
											  
						
										});
										  
										    html+='<a class="prev4" onclick="plusSlides3(-1)">&#10094;</a><a class="next4" onclick="plusSlides3(1)">&#10095;</a>';
								  		
								  		    $("#idInsurancetypeTable").html(html);
								  		 
								  		    showSlides3(slideIndex3=1);
								  		   
									}else{
										 showSlides3(0);
									}
									}
					});        
					         
					    	 $("#idDownloadModalInsuranceMaturityRenewal").click(function(){
							
								  getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
						          function onRedisDataSuccess(data) {			
											     		//alert(data);
											     	}	
						          
										var a = document.createElement("a");
										document.body.appendChild(a);
										a.style = "display: none";
										var fileName = "InsuranceMaturityRenewal.xlsx";

										var xhr = new XMLHttpRequest();
										
										  specificRequermentStat="overview";
										  serviceurl = "getLockedUptoDateTimePeriodDownload?clientId="+selectedClientId+'&timePeriod='+timePeriodInsurance;
										//xhr.open( "GET", 'http://192.168.1.103:8080/FinexaService/download?clientId='+vClientId+'&mode=monthly', true);
										xhr.open( "GET", serviceIP + '/clientservice/getLockedUptoDateTimePeriodDownload?clientId='+selectedClientId+'&timePeriod='+timePeriodInsurance, true);
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
				   //================end  8th block======================
	
	


         //======================= 9th block life analysis=========================== 
					     
		  if(financialPlanningAccess === "Y"){
		  if(loggedClient != null && loggedUser == null){
			  populateMemberDrop($("#idMemberListForClient"));
		  }else{
			if(loggedUser != null && loggedClient != null){
			  populateMemberDrop($("#idMemberList"));
		   }
		 }
		  
		  getAdvisorClientData("GET", "", "clearClientCache?client="+selectedClientId, onRedisDataSuccess);
          function onRedisDataSuccess(data) {			
		  }				         
					         
          serviceurl="";
          serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceLifeCover?clientId='+selectedClientId;
         //serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceLifeCoverForMember?memberId='+memberID;
         //console.log("serviceurl "+serviceurl);
         var length=0;
        //	  alert("asset "+asset);
         $.ajax({
		type: 'GET',
		async : true,
		url: REQUEST_URL_FP+'/getClientFMInsuranceLifeCover?clientId='+selectedClientId,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			if(data.length>0){
			  var i=0;
			  $.each(data, function(key, value) {
			 
			  if(value.memberID == memberID){
			  if(loggedClient != null && loggedUser == null){
				  $("#idExistingForClient").html("<br/><b>"+maskAmountValue(Math.round(value.existingLifeCover))+"</b>");
				  $("#idRequiredForClient").html("<b>"+maskAmountValue(Math.round(value.required))+"</b>");
				  $("#idRecommendedForClient").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");
			  }else{
				if(loggedUser != null && loggedClient != null){
				  $("#idExisting").html("<br/><b>"+maskAmountValue(Math.round(value.existingLifeCover))+"</b>");
				  $("#idRequired").html("<b>"+maskAmountValue(Math.round(value.required))+"</b>");
				  $("#idRecommended").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");
			   }
			 }
			  
			  return 0;
			  }
			});
		  }
		},
 
  	error: function (jqXHR, exception) {
  	
      var msg = '';
      if (jqXHR.status === 0) {
          msg = 'Could not connect. Verify Service/Server running.';
      }else if(jqXHR.status == 401){
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
    } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
      } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
      } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
      } else if (exception === 'timeout') {
          msg = 'Time out error.';
      } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
      } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
      }
      //console.log("msg "+msg);
    //  alert("msg980 "+msg);
	}

}); 	
$("#idInsuranceAnalysis").on('change', function(){
	
	    lifeAnalysis = $(this).val();
	    if(lifeAnalysis=='Life'){
	    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceLifeCover?clientId='+selectedClientId;
	    }
	    if(lifeAnalysis=='Health'){
		    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceHealthCover?clientId='+selectedClientId;
		}
	    if(lifeAnalysis=='CriticalIllness'){
		    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceCICover?clientId='+selectedClientId;
		}
	    if(lifeAnalysis=='PersonalAccident'){
		    serviceurl=REQUEST_URL_FP+'/getClientFMInsurancePAccCover?clientId='+selectedClientId;
		}
	    //console.log("serviceurl "+serviceurl);
	    
	    $("#idExisting").html("");
		$("#idRequired").html("");
		$("#idRecommended").html("");
    	 
	    $.ajax({
	    		type: 'GET',
	    		async : true,
	    		url: serviceurl,
	    		dataType: 'json',
	    		beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
	    		success: function (data) {
	    			if(data.length>0){
						$.each(data, function(key, value) {
					  if(value.memberID==memberID){
					//	  alert(value.memberID+"==========="+memberID);
						  if(lifeAnalysis=='Life'){ 
			    			  $("#idExisting").html("<br/><b>"+maskAmountValue(Math.round(value.existingLifeCover))+"</b>");
			    			  $("#idRequired").html("<b>"+maskAmountValue(Math.round(value.required))+"</b>");
			    			  $("#idRecommended").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");
							  }
							  if(lifeAnalysis=='Health'){
							  $("#idExisting").html("<br/><b>"+maskAmountValue(Math.round(value.existingFloatingCover))+"</b>");
					    	  $("#idRequired").html("<b>"+maskAmountValue(Math.round(value.requredFloatingCover))+"</b>");
				    		  $("#idRecommended").html("<b>"+maskAmountValue(Math.round(value.floaterBaseCover))+"</b>");  
							  }
							  if(lifeAnalysis=='CriticalIllness'){
							  $("#idExisting").html("<br/><b>"+ maskAmountValue(Math.round(value.existing)) +"</b>");
					    	  $("#idRequired").html("<b>"+ maskAmountValue(Math.round(value.ciCoverRequired)) +"</b>");
					    	  $("#idRecommended").html("<b>"+ maskAmountValue(Math.round(value.additional)) +"</b>");    
							  }
							  if(lifeAnalysis=='PersonalAccident'){
							  $("#idExisting").html("<br/><b>"+ maskAmountValue(Math.round(value.existing))+"</b>");
						      $("#idRequired").html("<b>"+ maskAmountValue(Math.round(value.personalAccidentCover)) +"</b>");
						      $("#idRecommended").html("<b>"+ maskAmountValue(Math.round(value.additional)) +"</b>");      
							  }
			    			  return 0;
					  }
						});
	    			}
	    		},
	     
	      	error: function (jqXHR, exception) {
	      	
	          var msg = '';
	          if (jqXHR.status === 0) {
	              msg = 'Could not connect. Verify Service/Server running.';
	          }else if(jqXHR.status == 401){
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
		        } else if (jqXHR.status == 404) {
	              msg = 'Requested page not found. [404]';
	          } else if (jqXHR.status == 500) {
	              msg = 'Internal Server Error [500].';
	          } else if (exception === 'parsererror') {
	              msg = 'Requested JSON parse failed.';
	          } else if (exception === 'timeout') {
	              msg = 'Time out error.';
	          } else if (exception === 'abort') {
	              msg = 'Ajax request aborted.';
	          } else {
	              msg = 'Uncaught Error.\n' + jqXHR.responseText;
	          }
	          //console.log("msg "+msg);
	        //  alert("msg980 "+msg);
	    	}

	    });
});    
$("#idInsuranceAnalysisForClient").on('change', function(){
	
    lifeAnalysis = $(this).val();
    if(lifeAnalysis=='Life'){
    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceLifeCover?clientId='+selectedClientId;
    }
    if(lifeAnalysis=='Health'){
	    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceHealthCover?clientId='+selectedClientId;
	}
    if(lifeAnalysis=='CriticalIllness'){
	    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceCICover?clientId='+selectedClientId;
	}
    if(lifeAnalysis=='PersonalAccident'){
	    serviceurl=REQUEST_URL_FP+'/getClientFMInsurancePAccCover?clientId='+selectedClientId;
	}
    //console.log("serviceurl "+serviceurl);
    
    $("#idExisting").html("");
	$("#idRequired").html("");
	$("#idRecommended").html("");
	 
    $.ajax({
    		type: 'GET',
    		async : true,
    		url: serviceurl,
    		dataType: 'json',
    		beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
    		success: function (data) {
    			if(data.length>0){
					$.each(data, function(key, value) {
				  if(value.memberID==memberID){
				//	  alert(value.memberID+"==========="+memberID);
					  if(lifeAnalysis=='Life'){ 
		    			  $("#idExistingForClient").html("<br/><b>"+maskAmountValue(Math.round(value.existingLifeCover))+"</b>");
		    			  $("#idRequiredForClient").html("<b>"+maskAmountValue(Math.round(value.required))+"</b>");
		    			  $("#idRecommendedForClient").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");
						  }
						  if(lifeAnalysis=='Health'){
						  $("#idExistingForClient").html("<br/><b>"+maskAmountValue(Math.round(value.existingFloatingCover))+"</b>");
				    	  $("#idRequiredForClient").html("<b>"+maskAmountValue(Math.round(value.requredFloatingCover))+"</b>");
			    		  $("#idRecommendedForClient").html("<b>"+maskAmountValue(Math.round(value.floaterBaseCover))+"</b>");  
						  }
						  if(lifeAnalysis=='CriticalIllness'){
						  $("#idExistingForClient").html("<br/><b>"+ maskAmountValue(Math.round(value.existing)) +"</b>");
				    	  $("#idRequiredForClient").html("<b>"+ maskAmountValue(Math.round(value.ciCoverRequired)) +"</b>");
				    	  $("#idRecommendedForClient").html("<b>"+ maskAmountValue(Math.round(value.additional)) +"</b>");    
						  }
						  if(lifeAnalysis=='PersonalAccident'){
						  $("#idExisting").html("<br/><b>"+ maskAmountValue(Math.round(value.existing))+"</b>");
					      $("#idRequiredForClient").html("<b>"+ maskAmountValue(Math.round(value.personalAccidentCover)) +"</b>");
					      $("#idRecommendedForClient").html("<b>"+ maskAmountValue(Math.round(value.additional)) +"</b>");      
						  }
		    			  return 0;
				  }
					});
    			}
    		},
     
      	error: function (jqXHR, exception) {
      	
          var msg = '';
          if (jqXHR.status === 0) {
              msg = 'Could not connect. Verify Service/Server running.';
          }else if(jqXHR.status == 401){
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
	        } else if (jqXHR.status == 404) {
              msg = 'Requested page not found. [404]';
          } else if (jqXHR.status == 500) {
              msg = 'Internal Server Error [500].';
          } else if (exception === 'parsererror') {
              msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
              msg = 'Time out error.';
          } else if (exception === 'abort') {
              msg = 'Ajax request aborted.';
          } else {
              msg = 'Uncaught Error.\n' + jqXHR.responseText;
          }
          //console.log("msg "+msg);
        //  alert("msg980 "+msg);
    	}

    });
});    

   $("#idMemberList").on('change', function(){
	serviceurl = "";
	    memberID = $(this).val();
	
	    if(lifeAnalysis=='Life'){
	    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceLifeCover?clientId='+selectedClientId;
	    }
	  
	    if(lifeAnalysis=='Health'){
		    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceHealthCover?clientId='+selectedClientId;
		}
	 
	    if(lifeAnalysis=='CriticalIllness'){
		    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceCICover?clientId='+selectedClientId;
		}
	  
	    if(lifeAnalysis=='PersonalAccident'){
		    serviceurl=REQUEST_URL_FP+'/getClientFMInsurancePAccCover?clientId='+selectedClientId;
		}
	    //console.log("serviceurl "+serviceurl);
	    
	    $("#idExisting").html("");
		$("#idRequired").html("");
		$("#idRecommended").html("");

	    $.ajax({
	    		type: 'GET',
	    		async : true,
	    		url: serviceurl,
	    		dataType: 'json',
	    		beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			    },
	    		success: function (data) {
	    			if(data.length>0){
					$.each(data, function(key, value) {

					 if(value.memberID==memberID){

					  if(lifeAnalysis=='Life'){ 
					  console.log("lifeAnalysis "+lifeAnalysis);
	    			  $("#idExisting").html("<br/><b>"+maskAmountValue(Math.round(value.existingLifeCover))+"</b>");
	    			  $("#idRequired").html("<b>"+maskAmountValue(Math.round(value.required))+"</b>");
	    			  $("#idRecommended").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");
					  }
					  if(lifeAnalysis=='Health'){
						
					  $("#idExisting").html("<br/><b>"+maskAmountValue(Math.round(value.existingFloatingCover))+"</b>");
		    		  $("#idRequired").html("<b>"+maskAmountValue(Math.round(value.requredFloatingCover))+"</b>");
		    		  $("#idRecommended").html("<b>"+maskAmountValue(Math.round(value.floaterBaseCover))+"</b>");  
					  }
					  if(lifeAnalysis=='CriticalIllness'){
					  console.log("lifeAnalysis "+lifeAnalysis);
					  $("#idExisting").html("<br/><b>"+maskAmountValue(Math.round(value.existing))+"</b>");
			    	  $("#idRequired").html("<b>"+maskAmountValue(Math.round(value.ciCoverRequired))+"</b>");
			    	  $("#idRecommended").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");    
					  }
					  if(lifeAnalysis=='PersonalAccident'){
					  console.log("lifeAnalysis "+lifeAnalysis);
					  $("#idExisting").html("<br/><b>"+maskAmountValue(Math.round(value.existing))+"</b>");
					  $("#idRequired").html("<b>"+ maskAmountValue(Math.round(value.personalAccidentCover)) +"</b>");
				      $("#idRecommended").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");      
					  }
	    			  return 0;
					}
					});
	    			}
	    		},
	     
	      	error: function (jqXHR, exception) {
	      	
	          var msg = '';
	          if (jqXHR.status === 0) {
	              msg = 'Could not connect. Verify Service/Server running.';
	          }else if(jqXHR.status == 401){
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
		        } else if (jqXHR.status == 404) {
	              msg = 'Requested page not found. [404]';
	          } else if (jqXHR.status == 500) {
	              msg = 'Internal Server Error [500].';
	          } else if (exception === 'parsererror') {
	              msg = 'Requested JSON parse failed.';
	          } else if (exception === 'timeout') {
	              msg = 'Time out error.';
	          } else if (exception === 'abort') {
	              msg = 'Ajax request aborted.';
	          } else {
	              msg = 'Uncaught Error.\n' + jqXHR.responseText;
	          }
	          //console.log("msg "+msg);
	        //  alert("msg980 "+msg);
	    	}

	     });
       });  
   
   $("#idMemberListForClient").on('change', function(){
		serviceurl = "";
		    memberID = $(this).val();
		
		    if(lifeAnalysis=='Life'){
		    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceLifeCover?clientId='+selectedClientId;
		    }
		  
		    if(lifeAnalysis=='Health'){
			    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceHealthCover?clientId='+selectedClientId;
			}
		 
		    if(lifeAnalysis=='CriticalIllness'){
			    serviceurl=REQUEST_URL_FP+'/getClientFMInsuranceCICover?clientId='+selectedClientId;
			}
		  
		    if(lifeAnalysis=='PersonalAccident'){
			    serviceurl=REQUEST_URL_FP+'/getClientFMInsurancePAccCover?clientId='+selectedClientId;
			}
		    //console.log("serviceurl "+serviceurl);
		    
		    $("#idExisting").html("");
			$("#idRequired").html("");
			$("#idRecommended").html("");

		    $.ajax({
		    		type: 'GET',
		    		async : true,
		    		url: serviceurl,
		    		dataType: 'json',
		    		beforeSend: function (xhr){ 
						xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
				    },
		    		success: function (data) {
		    			if(data.length>0){
						$.each(data, function(key, value) {

						 if(value.memberID==memberID){

						  if(lifeAnalysis=='Life'){ 
						  console.log("lifeAnalysis "+lifeAnalysis);
		    			  $("#idExistingForClient").html("<br/><b>"+maskAmountValue(Math.round(value.existingLifeCover))+"</b>");
		    			  $("#idRequiredForClient").html("<b>"+maskAmountValue(Math.round(value.required))+"</b>");
		    			  $("#idRecommendedForClient").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");
						  }
						  if(lifeAnalysis=='Health'){
							
						  $("#idExistingForClient").html("<br/><b>"+maskAmountValue(Math.round(value.existingFloatingCover))+"</b>");
			    		  $("#idRequiredForClient").html("<b>"+maskAmountValue(Math.round(value.requredFloatingCover))+"</b>");
			    		  $("#idRecommendedForClient").html("<b>"+maskAmountValue(Math.round(value.floaterBaseCover))+"</b>");  
						  }
						  if(lifeAnalysis=='CriticalIllness'){
						  console.log("lifeAnalysis "+lifeAnalysis);
						  $("#idExistingForClient").html("<br/><b>"+maskAmountValue(Math.round(value.existing))+"</b>");
				    	  $("#idRequiredForClient").html("<b>"+maskAmountValue(Math.round(value.ciCoverRequired))+"</b>");
				    	  $("#idRecommendedForClient").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");    
						  }
						  if(lifeAnalysis=='PersonalAccident'){
						  console.log("lifeAnalysis "+lifeAnalysis);
						  $("#idExistingForClient").html("<br/><b>"+maskAmountValue(Math.round(value.existing))+"</b>");
						  $("#idRequiredForClient").html("<b>"+ maskAmountValue(Math.round(value.personalAccidentCover)) +"</b>");
					      $("#idRecommendedForClient").html("<b>"+maskAmountValue(Math.round(value.additional))+"</b>");      
						  }
		    			  return 0;
						}
						});
		    			}
		    		},
		     
		      	error: function (jqXHR, exception) {
		      	
		          var msg = '';
		          if (jqXHR.status === 0) {
		              msg = 'Could not connect. Verify Service/Server running.';
		          }else if(jqXHR.status == 401){
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
			        } else if (jqXHR.status == 404) {
		              msg = 'Requested page not found. [404]';
		          } else if (jqXHR.status == 500) {
		              msg = 'Internal Server Error [500].';
		          } else if (exception === 'parsererror') {
		              msg = 'Requested JSON parse failed.';
		          } else if (exception === 'timeout') {
		              msg = 'Time out error.';
		          } else if (exception === 'abort') {
		              msg = 'Ajax request aborted.';
		          } else {
		              msg = 'Uncaught Error.\n' + jqXHR.responseText;
		          }
		          //console.log("msg "+msg);
		        //  alert("msg980 "+msg);
		    	}

		     });
	       });  
     }else{
    	 $('.unselectable9').prop("disabled",true);
     }
//=======================end life analysis 9th block================================
   });
  
		  

	function populateAssetDrop(dropId) {
		getClientDataAsyncFalse("GET", "", "getAssetForMaturityRenewal", onAssetSuccess);
		
		function onAssetSuccess(data) {
		
			dropId.find('option').remove();
			var i=0;
			$.each(data, function (index, item) {
				if(i==0){
					asset=item.productName;	
				}
				i++;
				dropId.append('<option value="' + item.productName + '">'
					+ item.productName + '</option>');

			});
	//		alert("asset inside "+asset);
		}
	}
	
	function populateInsuranceDrop(dropId) {
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
		//	alert("insuranceType inside "+insuranceType);
		}
	}
	
	function populateMemberDrop(dropId) {
		getClientDataAsyncFalse("GET", "", "clientFamilyMemberImageByClient/" + selectedClientId, onMemberTypeSuccess);
		
		function onMemberTypeSuccess(data) {
			//console.log(data);
			
			$.each(data, function (index, item) {
				if(item.relationID==0){
					memberID=item.id;	
				}
				dropId.append('<option value="' + item.id + '">' +item.firstName + '</option>');
				
			});
		}
	}
	
	/*max button code*/
	

	/** code for max window Portfolio tracker **/
	
var modal = document.getElementById("idPoportfolio");

// Get the button that opens the modal
var btn = document.getElementById("idmaxportfolio");

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
	/** code for max window Goals Planned**/
	
	var modal1 = document.getElementById("idPopgoalplanned");

// Get the button that opens the modal
var btn1 = document.getElementById("idmaxgoalplanned");

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


/** code for max window Asset Maturity**/
	
	var modal2 = document.getElementById("idPopasset");

// Get the button that opens the modal
var btn2 = document.getElementById("idmaxasset");

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
	
	
	/** code for max window Insurance maturity **/
	
	var modal3 = document.getElementById("idPopinsurance");

// Get the button that opens the modal
var btn3 = document.getElementById("idmaxInsurance");

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
}

//=====================

/** slideshow for asset maturity **/

/*var slideIndex = 1;
showSlides(slideIndex);*/

function plusSlides(n) {
	
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  ////console.log("n "+n);
  var slides = document.getElementsByClassName("mySlides");
  ////console.log("slides.length "+slides.length);
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active1", "");
  }
 
  ////console.log("slideIndex "+slideIndex);
  if(slideIndex!=0){
  slides[slideIndex-1].style.display = "block";  
  }
  if(slideIndex>0 && slideIndex<=3){
  dots[slideIndex-1].className += " active1";
  }
}

	
/** slideshow for goal planned **/

/*var slideIndex1 = 1;
showSlides1(slideIndex1);*/
var slideIndex1=1;
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
  ////console.log("slides1.length "+slides1.length);
  ////console.log("n "+n);
  ////console.log("slideIndex1 "+slideIndex1);
  if(slideIndex1!=0){
  slides1[slideIndex1-1].style.display = "block";  
  }
  if(slideIndex1>0 && slideIndex1<=3){
  dots1[slideIndex1-1].className += " active2";
  }
}



/** slideshow for  assset maturity**/

/*var slideIndex2 = 1;
showSlides2(slideIndex2);*/

function plusSlides2(n) {
  showSlides2(slideIndex2 += n);
}

function currentSlide2(n) {
  showSlides2(slideIndex2 = n);
}

function showSlides2(n) {
  ////console.log("n "+n);	
  var i;
  var slides2 = document.getElementsByClassName("mySlides2");
  ////console.log("slides2.length "+slides2.length);
  
  var dots2 = document.getElementsByClassName("dot2");
  if (n > slides2.length) {slideIndex2 = 1}    
  if (n < 1) {slideIndex2 = slides2.length}

  for (i = 0; i < slides2.length; i++) {
      slides2[i].style.display = "none";  
  }
  for (i = 0; i < dots2.length; i++) {
      dots2[i].className = dots2[i].className.replace(" active2", "");
  }

  
  ////console.log("slideIndex2 "+slideIndex2);
  if(slideIndex2!=0){
  slides2[slideIndex2-1].style.display = "block"; 
  }
  if(slideIndex2>0 && slideIndex2<=3){
  dots2[slideIndex2-1].className += " active2";
  }
}


/** slideshow for Insurance**/

/*var slideIndex3 = 1;
showSlides3(slideIndex3);
*/
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
      dots3[i].className = dots3[i].className.replace(" active2", "");
  }
  ////console.log("slideIndex3 "+slideIndex3);
  ////console.log("n "+n);
  ////console.log("slides3.length "+slides3.length);
  if(slideIndex3!=0){
  slides3[slideIndex3-1].style.display = "block";  
  }
  if(slideIndex3>0 && slideIndex3<=3){
  dots3[slideIndex3-1].className += " active2";
  }
}


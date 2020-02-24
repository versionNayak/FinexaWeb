selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}

var findid ;
var maskedcmv;
$(document).ready(function (event ) {
	initRowHandlers();
	$("#deleteMessage").hide();

	var data = JSON.parse(sessionStorage.getItem("EQUITY_LIST"));
	$("#idEquityList").empty();
	$.each(data, function (index, equity) {
		var stockName;
	//console.log(equity);
		if(equity.listedFlag ==="Y") {
			stockName=equity.unlistedStockNameList; 
			var currentMarketVal;

	        if(equity.isin != null) {
	        	/*$.ajax({
	                url: "getClosingPriceESOP/",
	                type: 'GET',
	                dataType: 'json',
	                success: onGetMFETFSuccess
	            });*/
	        	
	        	var myObject = new Object();
	        	myObject.isin = equity.isin;
	        	myObject.quantity = equity.quantity;
	        	
	        	var myString = JSON.stringify(myObject);
	        	
	        	getClientData("POST", myString, "getClosingPriceESOP", onGetEquitySuccess);
	            
	            function onGetEquitySuccess(data) {
	            	currentMarketVal = data.currentMarketValue;
	                //alert("currentMarketVal: " + currentMarketVal + " stockName " + stockName);
	                maskedcmv = maskAmountValue(Math.round(currentMarketVal).toString());
	                $("#idEquityList").append('<tr>' +
	        				'<td>' + equity.ownerName + '</td>' +
	        				'<td>' + equity.financialAssetTypeName + '</td>' +
	        				'<td>' + stockName+ '</td>' +
	        				'<td>' + maskedcmv + '</td>' +
	        				'<td class="hidden"><input type="text" id="equityId" name="clientId"  value=' + equity.id + ' readonly="readonly"></td>' +
	        				'</tr>');
	            }
	        }
	     }else {
			stockName=equity.unlistedStockNameText; 
			maskedcmv = maskAmountValue(equity.currentMarketValue);
			$("#idEquityList").append('<tr>' +
					'<td>' + equity.ownerName + '</td>' +
					'<td>' + equity.financialAssetTypeName + '</td>' +
					'<td>' + stockName+ '</td>' +
					'<td>' + maskedcmv + '</td>' +
					'<td class="hidden"><input type="text" id="equityId" name="clientId"  value=' + equity.id + ' readonly="readonly"></td>' +
					'</tr>');
		}
		
		//var maskedcmv = maskAmountValue(equity.currentMarketValue);
		
	});
//}
	
	$("#idEquityList").on("click", "tr", function (e) {
		addRowHandlers();
		findid=$(this).find("#equityId").val();
		sessionStorage.removeItem("SELECTED_EQUITY_ID");
	    sessionStorage.setItem("SELECTED_EQUITY_ID",findid);
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected");
	}); 
});

function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord(ClientServiceUrl+"clientEquityDelete/"+ sessionStorage.getItem("SELECTED_EQUITY_ID"));
	   $.ajax({
			type : 'GET',
			async : true,
			url : ClientServiceUrl+"clientEquity/client/" +selectedClientId,
			dataType : 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			contentType : 'application/json',
			success : function(afterDeleteddata) {
                if(afterDeleteddata.length==0)
				{
                	 if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
	                    	var pageUrl ="clientInfo/addEquity.html";
		                    addPage(pageUrl,"Add Direct Equity");
							
						}else{
							addPage("clientInfo/authorisationErrorPage.html","Access Denied");
						}
				}
                $("#idEquityList").empty();
            	$.each(afterDeleteddata, function (index, updatedEquity) {
            		var stockName;
            	
            		if(updatedEquity.listedFlag ==="Y")
            			{
            			stockName=updatedEquity.unlistedStockNameList; 
            			}else{
            			stockName=updatedEquity.unlistedStockNameText; 
            			}
            		var maskedcmv = maskAmountValue(updatedEquity.currentMarketValue);
						$("#idEquityList").append('<tr>' +
								'<td>' + updatedEquity.ownerName + '</td>' +
	 							'<td>' + updatedEquity.financialAssetTypeName + '</td>' +
	 							'<td>' + stockName + '</td>' +
	 							'<td>' + maskedcmv + '</td>' +
								'<td class="hidden"><input type="text" id="equityId" name="equityId"  value=' + updatedEquity.id + ' readonly="readonly"></td>' +
						'</tr>');
					}); 
            	$('#deleteRecord').addClass('btn_Disabled');
                },
			error : function(jqXHR, data) {
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
				//alert("error add client service" + data.responseText);
			}     
	   });
	
}
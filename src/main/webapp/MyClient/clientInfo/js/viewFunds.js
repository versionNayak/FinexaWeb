var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}

//new
var fundId;
$(document).ready(function (event ) {
	//alert(selectedClientId);
	initRowHandlers();
	$("#deleteMessage").hide();
	var data = JSON.parse(sessionStorage.getItem("FUND_LIST"));
	$("#viewFundList").empty();
	$.each(data, function (index, fund) {

	    var assetmanager;
		var schemename;
		var currentMarketVal;
		var nav;
		var investmentmodename;
		console.log(fund);
        var ClientServiceUrl = serviceIP + "/clientservice/";
        if(fund.isin != null) {
            serviceurl = "getLatestNAV/"+fund.isin;
            $.ajax({
                url: ClientServiceUrl + serviceurl,
                type: 'GET',
                dataType: 'json',
                success: onGetMFETFSuccess,
                beforeSend: function (xhr){ 
    				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
    		    },
                error: function (jqXHR, exception) {
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
            
            function onGetMFETFSuccess(data) {
                nav = data;
                //alert("nav: " + nav);
                if (fund.currentMarketValue == null) {
                    // alert(maskAmountValue(parseFloat(fund.lumpsumUnitsPurchased*nav).toFixed(2)).toString());
                    currentMarketVal = (Math.round(fund.lumpsumUnitsPurchased * nav)).toString();
                    //alert(currentMarketVal);
                }
                else {
                    currentMarketVal = maskAmountValue(Math.round(fund.currentMarketValue));
                }

                assetmanager = fund.fundHouse;
                schemename = fund.descriptiveSchemeName;
              
                if (fund.investmentModeName == null) {
                    investmentmodename = "NA";
                } else {
                    investmentmodename = fund.investmentModeName;
                }

                $("#viewFundList").append('<tr>' +
                    '<td>' + fund.ownerName + '</td>' +
                    '<td>' + fund.fundTypeName + '</td>' +
                    '<td>' + assetmanager + '</td>' +
                    '<td>' + schemename + '</td>' +
                    '<td>' + investmentmodename + '</td>' +
                    '<td>' + fund.investmentStartDate + '</td>' +
                    '<td>' + currentMarketVal + '</td>' +
                    '<td class="hidden"><input type="text" id="idfundId" name="clientId"  value=' + fund.id + ' readonly="readonly"></td>' +
                    '</tr>');
            }
            
            
        } else {
            //for pms no latest nav needed
        	assetmanager = fund.providerName;
            schemename = fund.schemeNamePMS;
            
            investmentmodename = "NA";
            
            currentMarketVal = maskAmountValue(Math.round(fund.currentMarketValue));
            
            $("#viewFundList").append('<tr>' +
                    '<td>' + fund.ownerName + '</td>' +
                    '<td>' + fund.fundTypeName + '</td>' +
                    '<td>' + assetmanager + '</td>' +
                    '<td>' + schemename + '</td>' +
                    '<td>' + investmentmodename + '</td>' +
                    '<td>' + fund.investmentStartDate + '</td>' +
                    '<td>' + currentMarketVal + '</td>' +
                    '<td class="hidden"><input type="text" id="idfundId" name="clientId"  value=' + fund.id + ' readonly="readonly"></td>' +
                    '</tr>');
       
        }


	});

	$("#viewFundList").on("click","tr",function(e){	
		addRowHandlers();
		fundId=$(this).find("#idfundId").val();
		sessionStorage.removeItem("SELECTED_FUND_ID");
		sessionStorage.setItem("SELECTED_FUND_ID",fundId);
		  $(this).addClass("selected");
		  $(this).addClass("selected").siblings().removeClass("selected"); 
	});
	
});

function confirmationClick(){
	$('#myModal').modal('hide'); 
	var del;
	//alert("fundId: "+fundId);
	deleteSelectedRecord(ClientServiceUrl+"clientFundDelete/"+fundId);  //sessionStorage.getItem("SELECTED_FUND_ID")
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"clientFund/client/"+ selectedClientId,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(afterDeleteddata) {

            if(afterDeleteddata.length==0)
			{
            	
                if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
                	var pageUrl ="clientInfo/addFund.html";
                    addPage(pageUrl,"MF/ETF/PMS");
					
				}else{
					addPage("clientInfo/authorisationErrorPage.html","Access Denied");
				}
			}
            $("#viewFundList").empty();
        	$.each(afterDeleteddata, function (index, updatedFund) {
        		var assetmanager;
        		var schemename;
        		var currentMarketVal;
        		//alert(fund.currentMarketValue==null);
        		if(updatedFund.currentMarketValue==null) {
        			currentMarketVal="NA";			
        		}
        		else {
        			currentMarketVal=maskAmountValue(updatedFund.currentMarketValue);
        		}
        	
        		if (updatedFund.fundHouse == null || updatedFund.fundHouse == "") {
        			assetmanager = updatedFund.providerName;
        			schemename = updatedFund.schemeNamePMS;
        		} else {
        			assetmanager = updatedFund.fundHouse;
        			schemename = updatedFund.schemeName;
        		}
        			 
        		var investmentmodename;
        		if (updatedFund.investmentModeName == null) {
        			investmentmodename = "NA";
        		} else {
        			investmentmodename = updatedFund.investmentModeName;
        		} 
        		//$("#viewFundList").empty();
        		
        		$("#viewFundList").append('<tr>' +
        				'<td>' + updatedFund.ownerName + '</td>' +
        				'<td>' + updatedFund.fundTypeName + '</td>' +
        			    '<td>' + assetmanager + '</td>' + 
        			    '<td>' + schemename + '</td>' +
        			    '<td>' + investmentmodename + '</td>' +
        				'<td>' + updatedFund.investmentStartDate + '</td>' +
        				'<td>' + currentMarketVal + '</td>' +
        				'<td class="hidden"><input type="text" id="idfundId" name="clientId"  value=' + updatedFund.id + ' readonly="readonly"></td>' +
        				'</tr>');
				}); 
        	$('#deleteRecord').addClass('btn_Disabled');
            
		},
		error : function(jqXHR,data) {
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
			      });
	        	}
	        	if(error === "unauthorized"){
	        		msg = "Full authentication is required to access this resource",
	        		bootbox.alert({
			        	 message: msg
			        });
	        	}	
	        }
		}     
   });
	
	/*getClientData("GET", "","clientFund/client/"+ selectedClientId, onSuccess);
	function onSuccess(data) {
		sessionStorage.setItem("FUND_LIST", JSON.stringify(data));
		$("#idClient").load("clientInfo/viewFunds.html");
		$(".dashboardheading").html("");
		$(".dashboardheading").html("MF/ETF/PMS");
		$("#addRecord").removeClass('btn_Disabled');
		$('#editRecord').addClass('btn_Disabled');
		$('#deleteRecord').addClass('btn_Disabled');
	}*/
}

selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var findId;
var financialAssetTypeId;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function (event ) {
	initRowHandlers();
	$("#deleteMessage").hide();
	var AssetTypeName = "NA";
	
	var data = JSON.parse(sessionStorage.getItem("ALTERNATE_INVESTMENT_LIST"));
	$("#viewAIList").empty();
    $.each(data, function (index, aiList) {
    	var maskedcv = maskAmountValue(aiList.currentValue); 
		console.log('Asset Type: ' + aiList.financialAssetTypeName +' Investment Type: '+ aiList.assetType +':' + aiList.assetTypeName);
    	$("#viewAIList").append('<tr>' +
				'<td>' + aiList.ownerName + '</td>' +
				'<td>' + aiList.financialAssetTypeName + '</td>' +
				'<td>' + aiList.assetDescription + '</td>' +
				'<td>' + aiList.assetTypeName + '</td>' +
				'<td>' + maskedcv + '</td>' +
				'<td class="hidden"><input type="text" id="idAI" name="nameAI"  value=' + aiList.id + ' readonly="readonly"></td>' +
				'<td class="hidden"><input type="text" id="idFinancialAssetType" name="nameFinancialAssetType"  value=' + aiList.financialAssetType + ' readonly="readonly"></td>' +
				'</tr>');
	}); 
	
	$("#viewAIList").on("click","tr",function(e){
		addRowHandlers();
		findId=$(this).find("#idAI").val();
		sessionStorage.removeItem("SELECTED_AI_ID");
		sessionStorage.setItem("SELECTED_AI_ID",findId);
		
		financialAssetTypeId=$(this).find("#idFinancialAssetType").val();		
		sessionStorage.removeItem("SELECTED_AI_ASSET_TYPE_ID");
		sessionStorage.setItem("SELECTED_AI_ASSET_TYPE_ID",financialAssetTypeId);
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
	});	
});


function confirmationClick(){
	$('#myModal').modal('hide'); 
	var financialAssetTypeId = sessionStorage.getItem("SELECTED_AI_ASSET_TYPE_ID");
	console.log("financialAssetTypeId "+financialAssetTypeId);
	var deleteURL="";
	
	if (financialAssetTypeId == 5) {
		deleteURL = "clientRealEstateDelete/";
	 } else if (financialAssetTypeId == 1) {
		 deleteURL = "clientPreciousMetalsDelete/";
	 } else if (financialAssetTypeId == 2) {
		 deleteURL = "clientVehicleDelete/";
	 } else if (financialAssetTypeId == 3) {
		 deleteURL = "clientOtherAlternateAssetDelete/";
	 } else if (financialAssetTypeId == 4) {
		 deleteURL = "clientStructuredProductDelete/";
	 }
	
	console.log("deleteurl : "+ClientServiceUrl+deleteURL+sessionStorage.getItem("SELECTED_AI_ASSET_TYPE_ID"));
	//alert(sessionStorage.getItem("SELECTED_AI_ID"));
	deleteSelectedRecord(ClientServiceUrl+deleteURL+sessionStorage.getItem("SELECTED_AI_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"viewAlternateInvestmentsList/" + selectedClientId,
		dataType : 'json',
		contentType : 'application/json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success : function(afterDeleteddata) {
			$("#viewAIList").empty();
			if (afterDeleteddata.length==0)
			{
				if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
					var pageUrl = "clientInfo/addAlternateInvestmentHeader.html"
					addPage(pageUrl, "Add Alternate Investments");	
					
				}else{
					addPage("clientInfo/authorisationErrorPage.html","Access Denied");
				}
			}
			$.each(afterDeleteddata, function (index, aiList) {	
				var maskedcv = maskAmountValue(aiList.currentValue); 
		    	$("#viewAIList").append('<tr>' +
						'<td>' + aiList.ownerName + '</td>' +
						'<td>' + aiList.financialAssetTypeName + '</td>' +
						'<td>' + aiList.assetDescription + '</td>' +
						'<td>' + aiList.assetTypeName + '</td>' +
						'<td>' + maskedcv + '</td>' +
						'<td class="hidden"><input type="text" id="idAI" name="nameAI"  value=' + aiList.id + ' readonly="readonly"></td>' +
						'<td class="hidden"><input type="text" id="idFinancialAssetType" name="nameFinancialAssetType"  value=' + aiList.financialAssetType + ' readonly="readonly"></td>' +
						'</tr>');
			}); 			
		},
		error : function(data) {
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
			alert("error add client service" + data.responseText);
		}
	});
}
	


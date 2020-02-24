selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function(event){
	initRowHandlers();

/*	serviceurl = "/viewROSList/" + selectedClientId;
	getClientData("GET", "", serviceurl, onSuccess);

	function onSuccess(data){
		if(data.length==0)
		{
			var addURL = "clientInfo/addRetirement.html";
			addPage(addURL,"Add Client Retirement Scheme");
		}
*/

		var data = JSON.parse(sessionStorage.getItem("RETIREMENT_SCHEMES_LIST"));
		$("#idROSList").empty();
		$.each(data, function (index, rosList) {
//			sessionStorage.removeItem("EPF_ID");
//			sessionStorage.setItem("EPF_ID", rosList.epfId);
			//alert("epfId: " + rosList.epfId);
			var startValue;
			if (rosList.startValue == null) {
				startValue = 'NA';
			} else {
				startValue = rosList.startValue;
			}
			$("#idROSList").append('<tr>' +
					'<td>' + rosList.ownerName + '</td>' +
					'<td>' + rosList.productName + '</td>' +
					'<td>' + startValue + '</td>' +
					'<td class="hidden"><input type="text" id="idROS" name="nameROS"  value=' + rosList.id + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idAssetType" name="nameAssetType"  value=' + rosList.financialAssetType + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idEpf" name="nameEpfId"  value=' + rosList.epfId + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idAnnType" name="nameAnnType"  value=' + rosList.annuityType + ' readonly="readonly"></td>' +
			'</tr>');
		}); 
	//} 
	
	$("#idROSList").on("click","tr",function(e){	
		addRowHandlers();
		 
		findid=$(this).find("#idROS").val();
		console.log("id of ROS "+ findid);
		sessionStorage.removeItem("SELECTED_ROS_ID");
		sessionStorage.setItem("SELECTED_ROS_ID",findid);
		
		var assetType=$(this).find("#idAssetType").val();
		console.log("Asset type of selected ROS "+ assetType);
		sessionStorage.removeItem("SELECTED_ROS_ASSET_TYPE");
		sessionStorage.setItem("SELECTED_ROS_ASSET_TYPE",assetType);
		
		var epfId = $(this).find("#idEpf").val();
		sessionStorage.removeItem("SELECTED_EPF_ID");
		sessionStorage.setItem("SELECTED_EPF_ID", epfId);
		
		
		var annType = $(this).find("#idAnnType").val();
		
		//alert("annType: " + annType);
		//alert("epfId: " + epfId);
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
		
		/*if (epfId != 0) {
			$("#editRecord").addClass('btn_Disabled');
		} else {
			$('#editRecord').removeClass('btn_Disabled');
		}*/
		
		/*if (annType == 6) {
			alert("annType: " + annType);
			$("#addRecord").addClass('btn_Disabled');
		} else {
			$("#addRecord").removeClass('btn_Disabled');
		}*/
		
	});
});

function deleteRowMember(){
	if (sessionStorage.getItem("SELECTED_ROS_ASSET_TYPE") == 13) {
		var url="existAnnuity/"+sessionStorage.getItem("SELECTED_ROS_ID");
		getClientData("GET", "", url,deleteSuccess);

		function deleteSuccess(data) {
			if(data==1){
				//bootbox.alert("can not delete this member.Loan and/or assetes are tagged.");
				bootbox.alert({ 
					  size: "medium",
					  title: "Delete EPF",
					  message: "EPF cannot be deleted as Annuity with EPS Annuity type exists.", 
					  callback: function(){ /* your callback code */   }
					})
			}
			else{
				deleteRow();
			}

		}
	} else {
		deleteRow();
	}
	
}

function confirmationClick(){
	$('#myModal').modal('hide');
	var assetType = sessionStorage.getItem("SELECTED_ROS_ASSET_TYPE");
	console.log("Asset type fetched "+ assetType);
	var deleteURL;
	if (assetType == 12) {
		// for PPF
		deleteURL = "clientPPFDelete/";
			
	} else if (assetType == 13) {
		// for EPF
		deleteURL = "clientEPFDelete/";
	} else if (assetType == 14) {
		// for NPS
		deleteURL = "clientNPSDelete/";
	} else if (assetType == 34) {
		// for AnnuityR
		deleteURL = "clientAnnuityDelete/";
	} else if (assetType == 33) {
		// for Atal Pension Ypjana
		deleteURL = "clientAtalPensionYojanaDelete/";
	}
	
	deleteSelectedRecord(ClientServiceUrl+deleteURL+sessionStorage.getItem("SELECTED_ROS_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"viewROSList/" + selectedClientId,
		dataType : 'json',
		contentType : 'application/json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success : function(afterDeleteddata) {
			$("#idROSList").empty();
			if(afterDeleteddata.length==0)
			{
				
				if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
					var addURL = "clientInfo/addROSHeader.html";
					addPage(addURL,"Add Client Retirement Scheme");
					
				}else{
					addPage("clientInfo/authorisationErrorPage.html","Access Denied");
				}
			}
			$.each(afterDeleteddata, function (index, rosList) {
				var startValue;
				if (rosList.startValue == null) {
					startValue = 'NA';
				} else {
					startValue = rosList.startValue;
				}
				$("#idROSList").append('<tr>' +
						'<td>' + rosList.ownerName + '</td>' +
						'<td>' + rosList.productName + '</td>' +
						'<td>' + startValue + '</td>' +
						'<td class="hidden"><input type="text" id="idROS" name="nameROS"  value=' + rosList.id + ' readonly="readonly"></td>' +
						'<td class="hidden"><input type="text" id="idAssetType" name="nameAssetType"  value=' + rosList.financialAssetType + ' readonly="readonly"></td>' +
				'</tr>');
			});
			
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
	        
	        	 //msg = 'You are not authorized to access this data.';
	        	//msg = 'User not found.';
	        	 //alert(msg);
	        	bootbox.alert({
	        	    message: "You are not authenticated",
	        	    callback: function () {
		        	  window.location = "../index.html";
	        	    }
	        	})
	        }
		}     
	});
	
}

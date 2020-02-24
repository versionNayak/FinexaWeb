initRowHandlers();
var findid;
var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
$(document).ready(function(){
	var data = JSON.parse(sessionStorage.getItem("SB_MASTER_LIST"));
	$("#idSBList").empty();
	$.each(data, function (index, sbMaster) {
		$("#idSBList").append('<tr>' +
				'<td>' + (sbMaster.sbName==null?"":sbMaster.sbName) +  '</td>' +
				'<td>' + (sbMaster.sbEmailID==null?"":sbMaster.sbEmailID) + '</td>' +
				'<td>' + (sbMaster.sbMobileNumber==null?"":sbMaster.sbMobileNumber) + '</td>' +
				'<td>' + (sbMaster.sbEmployeeCode==null?"":sbMaster.sbEmployeeCode) + '</td>' +
				'<td>' + (sbMaster.branchName==null?"":sbMaster.branchName) + '</td>' +
				'<td class="hidden"><input type="text" id="sbId" name="subBrokerMasterID"  value=' + sbMaster.id + ' readonly="readonly"></td>' +
		'</tr>');
	});
	
	$("#idSBList").on("click", "tr", function (e) {
		addRowHandlers();
		findid = $(this).find("#sbId").val();
		sessionStorage.removeItem("SELECTED_SB_MASTER_ID");
		sessionStorage.setItem("SELECTED_SB_MASTER_ID", findid);
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected");
		
	});
	
});

function confirmationClick(){
	$('#myModal').modal('hide');
	
	serviceurl = "checkRmOrSbIsAssigned/" + sessionStorage.getItem("SELECTED_SB_MASTER_ID");
	getMFData("GET", "" , serviceurl, onRmIsAssignedCheckSuccess);
	function onRmIsAssignedCheckSuccess(flag) {
		if(flag==true){
			bootbox.alert("The selected SubBroker Manager is already assigned to a user.");
		}else{
	
	
	deleteSelectedMFRecord(ClientServiceUrl+"SBMasterDelete/"+ sessionStorage.getItem("SELECTED_SB_MASTER_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"getSbMaster/" + loggedInUser.id,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(afterDeleteddata) {
			if (afterDeleteddata.length==0) {
				var addURL = "MF/sbMaster.html";
				addPageBackOffice(addURL,"Add SUB BROKER Master");
			}
			$("#idSBList").empty();
			$.each(afterDeleteddata, function (index, updatedSB) {
				$("#idSBList").append('<tr>' +
						'<td>' + (updatedSB.sbName==null?"":updatedSB.sbName) +  '</td>' +
						'<td>' + (updatedSB.sbEmailID==null?"":updatedSB.sbEmailID) + '</td>' +
						'<td>' + (updatedSB.sbMobileNumber==null?"":updatedSB.sbMobileNumber) + '</td>' +
						'<td>' + (updatedSB.sbEmployeeCode==null?"":updatedSB.sbEmployeeCode) + '</td>' +
						'<td>' + (updatedSB.sbBranch==null?"":updatedSB.sbBranch) + '</td>' +
						'<td class="hidden"><input type="text" id="sbId" name="subBrokerMasterID"  value=' + updatedSB.subBrokerMasterID + ' readonly="readonly"></td>' +
				'</tr>');
			});
		},
		error: function(jqXHR, exception) {
			var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Could not connect to the server, please contact System Administrator.';
	        }else if(jqXHR.status == 400){
	        	msg = 'There is some problem in the server, please contact System Administrator.\n';
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
	        
	        } 
	        else if (jqXHR.status == 403) {
	            msg = 'you don’t have permission to access ‘/’ on this server.';
	        }else if (jqXHR.status == 404) {
	            msg = 'Requested service url not found.';
	        } else if (jqXHR.status == 500) {
	        	msg = 'There is some problem in the server, please contact System Administrator.\n';
	        } else if (exception === 'parsererror') {
	            msg = 'Failed to get result.';
	        } else if (exception === 'timeout') {
	            msg = 'Timed Out!';
	        } else if (exception === 'abort') {
	            msg = 'Request aborted.';
	        } else {
	            msg = 'Something went wrong, could not connect to the server, please contact System Administrator.\n';
	        }
	        
	        if (JSON.parse(jqXHR.responseText).errorMessage != null || JSON.parse(jqXHR.responseText).errorMessage != undefined || JSON.parse(jqXHR.responseText).errorMessage != "") {
	        	sessionStorage.removeItem("MSG");
	        	sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage);
	        } 
	        
	        if (msg != "" || JSON.parse(jqXHR.responseText).errorMessage != null || JSON.parse(jqXHR.responseText).errorMessage != "undefined" || JSON.parse(jqXHR.responseText).errorMessage != ""){
	        	sessionStorage.removeItem("MSG");
		        sessionStorage.setItem("MSG", JSON.parse(jqXHR.responseText).errorMessage +'\n'+msg);
	        }
	       
	        if (JSON.parse(jqXHR.responseText).errorMessage == undefined) {
	        	sessionStorage.removeItem("MSG");
	        	sessionStorage.setItem("MSG", msg);
	        }
	         
	        $("#idBackOffice").load("resources/errorPage.html");
		}
	});
  }
 }
}
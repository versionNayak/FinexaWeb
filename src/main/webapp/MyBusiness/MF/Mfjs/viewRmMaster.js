initRowHandlers();
var findid;
var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
$(document).ready(function() {
	
	var data = JSON.parse(sessionStorage.getItem("RM_MASTER_LIST"));
	$("#idRMList").empty();
	$.each(data, function (index, rmMaster) {
		$("#idRMList").append('<tr>' +
		'<td>' + (rmMaster.rmName==null?"":rmMaster.rmName) +  '</td>' +
		'<td>' + (rmMaster.rmEmailID==null?"":rmMaster.rmEmailID) + '</td>' +
		'<td>' + (rmMaster.rmMobileNumber==null?"":rmMaster.rmMobileNumber) + '</td>' +
		'<td>' + (rmMaster.rmEmployeeCode==null?"":rmMaster.rmEmployeeCode) + '</td>' +
	    '<td>' + (rmMaster.rmBranchName==null?"":rmMaster.rmBranchName) + '</td>' +
		'<td class="hidden"><input type="text" id="rmId" name="rmMasterID"  value=' + rmMaster.id + ' readonly="readonly"></td>' +
		'</tr>');
	});
	
	$("#idRMList").on("click", "tr", function (e) {
		addRowHandlers();
		findid = $(this).find("#rmId").val();
		sessionStorage.removeItem("SELECTED_RM_MASTER_ID");
		sessionStorage.setItem("SELECTED_RM_MASTER_ID", findid);
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected");
	}); 
	
	
});

function confirmationClick(){
	$('#myModal').modal('hide'); 

	serviceurl = "checkRmOrSbIsAssigned/" + sessionStorage.getItem("SELECTED_RM_MASTER_ID");
	getMFData("GET", "" , serviceurl, onRmIsAssignedCheckSuccess);
	function onRmIsAssignedCheckSuccess(flag) {
		if(flag==true){
			bootbox.alert("The selected Relationship Manager is already assigned to a user.");
		}else{
				
	deleteSelectedMFRecord(ClientServiceUrl+"rmMasterBODelete/"+ sessionStorage.getItem("SELECTED_RM_MASTER_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"getRmMaster/" + loggedInUser.id,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(afterDeleteddata) {
			if (afterDeleteddata.length==0) {
					var addURL = "MF/rmMaster.html";
					addPageBackOffice(addURL,"Add RM Master");
			}
			$("#idRMList").empty();
			$.each(afterDeleteddata, function (index, updatedRM) {
				$("#idRMList").append('<tr>' +
				'<td>' + (updatedRM.rmName==null?"":updatedRM.rmName) +  '</td>' +
				'<td>' + (updatedRM.rmEmailID==null?"":updatedRM.rmEmailID) + '</td>' +
				'<td>' + (updatedRM.rmMobileNumber==null?"":updatedRM.rmMobileNumber) + '</td>' +
				'<td>' + (updatedRM.rmEmployeeCode==null?"":updatedRM.rmEmployeeCode) + '</td>' +
				'<td>' + (updatedRM.rmBranchName==null?"":updatedRM.rmBranchName) + '</td>' +
				'<td class="hidden"><input type="text" id="rmId" name="rmMasterID"  value=' + updatedRM.id + ' readonly="readonly"></td>' +
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
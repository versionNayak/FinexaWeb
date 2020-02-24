initRowHandlers();
var findid;
var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
$(document).ready(function(){
	
	var data = JSON.parse(sessionStorage.getItem("BRANCH_MASTER_LIST"));
	$("#idBranchMasterList").empty();
	$.each(data, function (index, branchMaster) {
		$("#idBranchMasterList").append('<tr>' +
		'<td>' + (branchMaster.branchName==null?"":branchMaster.branchName) +  '</td>' +
		'<td>' + (branchMaster.branchCode) +  '</td>' +
		'<td>' + (branchMaster.branchAddress==null?"":branchMaster.branchAddress) + "</br>" + 
				 (branchMaster.branchCity==null?"":branchMaster.branchCity) + "</br>" +
				 (branchMaster.branchState==null?"":branchMaster.branchState) + "</br>" +
		'</td>' +
		'<td>' + (branchMaster.branchPhoneNo==null?"":branchMaster.branchPhoneNo) + '</td>' +
		'<td>' + (branchMaster.branchMobileNo==null?"":branchMaster.branchMobileNo) + '</td>' +
		'<td>' + (branchMaster.branchHeadName==null?"":branchMaster.branchHeadName) + '</td>' + 
		'<td class="hidden"><input type="text" id="idBranchMasterId" name="id"  value=' + branchMaster.id + ' readonly="readonly"></td>' +
		'</tr>');
	});
	
	
	$("#idBranchMasterList").on("click", "tr", function (e) {
		//alert(loggedInUser.val());
		addRowHandlers();
		findid = $(this).find("#idBranchMasterId").val();
		sessionStorage.removeItem("SELECTED_BR_MASTER_ID");
		sessionStorage.setItem("SELECTED_BR_MASTER_ID", findid);
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected");
	
	}); 
	
	
});

function confirmationClick(){
	$('#myModal').modal('hide'); 
	
	serviceurl = "checkIfBranchMasterisAssigned/" + sessionStorage.getItem("SELECTED_BR_MASTER_ID");
	getMFData("GET", "" , serviceurl, onBranchHeadAssignedCheckSuccess);
	
	function onBranchHeadAssignedCheckSuccess(flag) {
		if(flag==true){
			bootbox.alert("The selected Branch Master is already assigned to a user.");
		}else{
		
	deleteSelectedMFRecord( ClientServiceUrl+"branchMasterBODelete/"+ sessionStorage.getItem("SELECTED_BR_MASTER_ID"));
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"getAllMFBackOfficeBranchByAdvisorId/" + loggedInUser.id,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(afterDeleteddata) {
			if (afterDeleteddata.length==0) {
					var addURL = "MF/branchMaster.html";
					addPageBackOffice(addURL,"Add Branch Master");
			}
			$("#idBranchMasterList").empty();
			$.each(afterDeleteddata, function (index, branchMaster) {
				$("#idBranchMasterList").append('<tr>' +
				'<td>' + (branchMaster.branchName==null?"":branchMaster.branchName) +  '</td>' +
				'<td>' + (branchMaster.branchCode) +  '</td>' +
				'<td>' + (branchMaster.branchAddress==null?"":branchMaster.branchAddress) + "</br>" + 
						 (branchMaster.branchCity==null?"":branchMaster.branchCity) + "</br>" +
						 (branchMaster.branchState==null?"":branchMaster.branchState) + "</br>" +
				'</td>' +
				'<td>' + (branchMaster.branchPhoneNo==null?"":branchMaster.branchPhoneNo) + '</td>' +
				'<td>' + (branchMaster.branchMobileNo==null?"":branchMaster.branchMobileNo) + '</td>' +
				'<td>' + (branchMaster.branchHeadName==null?"":branchMaster.branchHeadName) + '</td>' + 
				'<td class="hidden"><input type="text" id="idBranchMasterId" name="id"  value=' + branchMaster.id + ' readonly="readonly"></td>' +
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
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	//	alert("loggedUser: " + loggedUser);
var id = loggedUser.id; 
//alert("id: " +id);
var findid;
$(document).ready(function(event){
	
	$("#idUploadNewMaster").on("click", function(event) {
		$("#idBuinessMasters").load("masters/uploadMasters.html");
  		$(".dashboardheading    ").html("");
  		$(".dashboardheading    ").html("Upload Masters");
	});
	
	serviceurl = "masters/uploadHistory/"+id;
	getClientData("GET", "", serviceurl, onSuccess);
	
	function onSuccess(data){
		$("#viewUploadMasters").empty();
		if(data.length==0)
		{
			$("#idBuinessMasters").load("masters/uploadMasters.html");
	  		$(".dashboardheading    ").html("");
	  		$(".dashboardheading    ").html("Upload Masters");
		}
		
		$.each(data, function (index, masterList) {
			var statusString;
			if (masterList.status == "S") {
				statusString = "Success";
			} else {
				if (masterList.status == "F") {
					statusString = "Failure";
				}
			}
			$("#viewUploadMasters").append('<tr>' +
					'<td>' + masterList.tableName + '</td>' +
					'<td>' + masterList.uploadDate + '</td>' +
					'<td>' + masterList.recordsUploaded + '</td>' +
					'<td>' + masterList.uploadedByName + '</td>' +
					'<td>' + statusString + '</td>' +
					'<td class="hidden"><input type="text" id="idMaster" name="id"  value=' + masterList.id + ' readonly="readonly"></td>' +
			'</tr>');
		}); 
	}
	
	
	$("#viewUploadMasters").on("click","tr",function(e){	
		addRowHandlers();
		findid=$(this).find("#idMaster").val();
		console.log("id of Master "+ findid);
		sessionStorage.removeItem("SELECTED_MASTER_ID");
		sessionStorage.setItem("SELECTED_MASTER_ID",findid);
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
	});
	
});

function confirmationClickBusiness(){
	$('#myModal').modal('hide');
	var idMaster = sessionStorage.getItem("SELECTED_MASTER_ID");
	$.ajax({
		type : 'GET',
		async : true,
		url : ClientServiceUrl+"deleteUploadedMaster/" + idMaster,
		dataType : 'json',
		contentType : 'application/json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success : function(afterDeleteddata) {
			
				getClientData("GET", "", "masters/uploadHistory/"+id, onSuccess);
				function onSuccess(data) {

				alert("Success");
				
				$("#viewUploadMasters").empty();
				if(afterDeleteddata.length==0)
				{
					var addURL = "master/uploadMasters.html";
					addPage(addURL,"Upload Masters");
				}
				$.each(afterDeleteddata, function (index, updatedMastersList) {
					var statusString;
					if (updatedMastersList.status == "S") {
						statusString = "Success";
					} else {
						if (updatedMastersList.status == "F") {
							statusString = "Failure";
						}
					}
					$("#viewUploadMasters").append('<tr>' +
							'<td>' + updatedMastersList.tableName + '</td>' +
							'<td>' + updatedMastersList.uploadDate + '</td>' +
							'<td>' + updatedMastersList.recordsUploaded + '</td>' +
							'<td>' + updatedMastersList.uploadedByName + '</td>' +
							'<td>' + statusString + '</td>' +
							'<td class="hidden"><input type="text" id="idMaster" name="id"  value=' + updatedMastersList.id + ' readonly="readonly"></td>' +
					'</tr>');
				}); 
			}
		
	},
		error : function(jqXHR,afterDeleteddata) {
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
			alert("error deleting user" + afterDeleteddata.responseText);
		}     
	});

}

	
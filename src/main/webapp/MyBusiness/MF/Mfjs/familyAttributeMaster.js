var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var clientId;
var advUserBranchId;
var advUserRMId;
var advUserSBId;
$(document).ready(function() {
	
	getFinexaClientNameList();
	getBranchNameList();
	
	$("#idFinexaClientDrop").change(function() {
		clientId = $(this).val();
		console.log("clientId: " + clientId);
	});
	
	$("#idBranchName").change(function() {
		advUserBranchId = $(this).val();
		console.log("advUserBranchId: " + advUserBranchId);
		getRMsUnderThisBranch(advUserBranchId);
		getSBsUnderThisBranch(advUserBranchId);
	});
	
	$("#idRMName").change(function() {
		advUserRMId = $(this).val();
		console.log("advUserRMId: " + advUserRMId);
	});
	
	$("#idSBName").change(function() {
		advUserSBId = $(this).val();
		console.log("advUserSBId: " + advUserSBId);
	});
	
	$("#idSave").on("click", function(event) {
		
		var validate;
		validate = validateFamilyAttributeMaster($("#idFamilyAttributeMasterForm"));
		
		if(validate) {
			showProcessingLoaderOnSave("#idSave");
			window.setTimeout(function(){
				event.preventDefault();
				var formData = $('#idFamilyAttributeMasterForm').serializeToJSON();
				formData["clientId"] = clientId;
				formData["advUserBranchId"] = advUserBranchId;
				formData["advUserRMId"] = advUserRMId;
				formData["advUserSBId"] = advUserSBId;
				var data = JSON.stringify(formData);
				
				getMFData("POST", data, "createFamilyAttribute", onCreateFASuccess)
			}, 3000);
			
			function onCreateFASuccess(data) {
				hideProcessingLoaderOnSave("#idSave");
				if(data.status == "Success") {
					bootbox.alert("This Client is mapped with selected attribute.");
				} else {
					bootbox.alert("Unexpected Error has occured.");
				}
				
			}
		}
		
		
	});
	
});


function getFinexaClientNameList() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"clientMasterList/" + loggedInUser.id,
		dataType : 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		contentType : 'application/json',
		success : function(data) {
			cnDrop = $("#idFinexaClientDrop");
			cnDrop.find('option').remove();
			cnDrop.append('<option value="">Select Client Name</option>');
			$.each(data, function (index, item) {
				cnDrop.append('<option value="' + item.id + '">' + item.name + '</option>');
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
	        }
        
			$("#idBackOffice").load("resources/errorPage.html");
			$(".dashboardheading").html("Error Page");
	        $("#addRecord").hide();
	        $("#editRecord").hide();
	        $("#deleteRecord").hide();
		}     
	});	
}

function getBranchNameList() {
	serviceurl = "getBranchManagerList/" + loggedUser.id;
	getMFData("GET", "", serviceurl, onBranchListSuccess);
	function onBranchListSuccess(data) {
		branchDrop = $("#idBranchName");
		branchDrop.find('option').remove();
		branchDrop.append('<option value="">Select Branch</option>');
		$.each(data, function (index, item) {
			var display = item.firstName;
			if (item.branchName == null) {
				display = display + "-NA" 
			} else {
				display = display + "-" +  item.branchName;
			}
			branchDrop.append('<option value="' + item.id + '">' + display + '</option>');
		});
	}
}

function getRMsUnderThisBranch(branchId) {
	console.log("branchId: " + branchId);
	serviceurl = "getRMNameList/" + branchId;
	getMFData("GET", "", serviceurl, onRMListSuccess);
	function onRMListSuccess(data) {
		rmDrop = $("#idRMName");
		rmDrop.find('option').remove();
		rmDrop.append('<option value="">Select RM</option>');
		$.each(data, function (index, item) {
			var display = (item.firstName==null?"":item.firstName) + " " + (item.middleName==null?"":item.middleName) + " " + (item.lastName==null?"":item.lastName);
			rmDrop.append('<option value="' + item.id + '">' + display + '</option>');
		});
	}
}

function getSBsUnderThisBranch(branchId) {
	console.log("branchId: " + branchId);
	serviceurl = "getSBNameList/" + branchId;
	getMFData("GET", "", serviceurl, onSBListSuccess);
	function onSBListSuccess(data) {
		sbDrop = $("#idSBName");
		sbDrop.find('option').remove();
		sbDrop.append('<option value="">Select Sub Broker</option>');
		$.each(data, function (index, item) {
			var display = (item.firstName==null?"":item.firstName) + " " + (item.middleName==null?"":item.middleName) + " " + (item.lastName==null?"":item.lastName);
			sbDrop.append('<option value="' + item.id + '">' + display + '</option>');
		});
	}
}

function showProcessingLoaderOnSave(btnID){		
	$(btnID).attr("disabled","disabled");
	$(btnID).html('<i class="fa fa-refresh fa-lg fa-spin" style="color: #ffffff;"></i> Processing...');
	//$("body").css("cursor", "progress");
	$("#overlayLoading").css({'display':'block'});	
}

function hideProcessingLoaderOnSave(btnID){	
	//alert('In hideLoaderOnSave()');
	$(btnID).removeAttr("disabled");
	$(btnID).html("Save");
	//$("body").css("cursor", "default");
	$("#overlayLoading").css({'display':'none'});
}

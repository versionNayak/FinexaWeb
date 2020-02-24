var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
alert(loggedInUser);

$(document).ready(function(){
	
});


	$("#idAutoCreateClientSave").on("click", function(event){
	window.setTimeout(function(){
		var formData = $('#idconfiguration').serializeToJSON();
		formData["advisorId"] = loggedInUser.id;
		alert(loggedInUser.id);
		alert("Form data"+formData.ID);
		var data = JSON.stringify(formData);
		alert(data);
	/*	getMFData("POST", data, "saveAutoClientOption", onCreateClientSuccess);
	}, 3000);
	
	function onCreateClientSuccess(data) {
		
		bootbox.alert("Saved in database");
		//hideProcessingLoaderOnSave("#idAutoCreateClientSave", "Create Client");
	}*/
		saveData("POST", data, "saveAutoClientOption", onAddUCCGeneralSuccess)
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
		}
	},3000);
	
});
	
	
	

function showProcessingLoaderOnSave(btnID){		
	$(btnID).attr("disabled","disabled");
	$(btnID).html('<i class="fa fa-refresh fa-lg fa-spin" style="color: #ffffff;"></i> Processing...');
	//$("body").css("cursor", "progress");
	$("#overlayLoading").css({'display':'block'});	
}

function hideProcessingLoaderOnSave(btnID, text){	
	//alert('In hideLoaderOnSave()');
	$(btnID).removeAttr("disabled");
	$(btnID).html(text);
	//$("body").css("cursor", "default");
	$("#overlayLoading").css({'display':'none'});
}

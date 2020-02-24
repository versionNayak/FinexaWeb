var pageMode = sessionStorage.getItem("PAGE_MODE");
var id = sessionStorage.getItem("SELECTED_RM_MASTER_ID");
var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
$(document).ready(function() {
	
	/***************** Fetching Branch List ********************/
	serviceurl = "getBranchManagerList/" + loggedUser.id;
	getMFData("GET", "", serviceurl, onBranchListSuccess);
	function onBranchListSuccess(data) {
		holdingDrop = $("#idRmBranch");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Branch</option>');
		$.each(data, function (index, item) {
			var display = item.firstName;
			if (item.branchName == null) {
				display = display + "-NA" 
			} else {
				display = display + "-" +  item.branchName;
			}
			
			holdingDrop.append('<option value="' + item.id + '">' + display + '</option>');
		});
	}
	
    /**************** End of Fetching Branch List ******************/
    
	if(pageMode=="ADD") {
		
		
		$("#idSave").on("click", function(event) {
			
			var validate;
			validate = validateRmMasterForm($("#idRmMasterForm"));
			
			if(validate) {
				showProcessingLoaderOnSave("#idSave");
				window.setTimeout(function(){
					event.preventDefault();
					var id = loggedUser.id;
					var formData = $('#idRmMasterForm').serializeToJSON();
					formData["advisorID"] = id;//loggedUser.id;
					var data = JSON.stringify(formData);
					var branchHeadID=formData.rmBranch;
					getMFData("GET", data, "checkIfBranchMasterExists/"+branchHeadID, onCheckSuccess);
					//getMFData("POST", data, "addRmMaster", onSaveSuccess);
				
				}, 3000);
			}
		});	
		
		
		function onCheckSuccess(flag) {
			
			if(flag!=true){
				bootbox.alert("Please create Branch Master for selected Branch Manager");
				hideProcessingLoaderOnSave("#idSave");
			}else{
				var id = loggedInUser.id;
				var formData = $('#idRmMasterForm').serializeToJSON();
				formData["advisorID"] = id;//loggedUser.id;
				var data = JSON.stringify(formData);
				
				getMFData("POST", data, "addRmMaster", onSaveSuccess);
			}
			function onSaveSuccess() {
				hideProcessingLoaderOnSave("#idSave");
				serviceurl = "getRmMaster/" + loggedInUser.id;
				getMFData("GET", "" , serviceurl, onSuccess);
				function onSuccess(data) {
					sessionStorage.setItem("RM_MASTER_LIST", JSON.stringify(data));
					$("#idBackOffice").load("MF/viewRmMaster.html");
					$(".dashboardheading").html("");
					$(".dashboardheading").html("View RM Master");
					$("#addRecord").removeClass('btn_Disabled');
					$('#editRecord').addClass('btn_Disabled');
					$('#deleteRecord').addClass('btn_Disabled');
				}
			}
			
		}
				
	} else {
		if (pageMode=="EDIT") {
			getSelectedRM();
		}
	}
	
});

function getSelectedRM() {
	
	getMFData("GET", "", "rmMaster?id=" + id, onGetRMDataSuccess);
	function onGetRMDataSuccess(data) {
		
		populateForm($('#idRmMasterForm'), data);
		
	}
	
	$("#idSave").on("click", function(event){
		
		if(validateRmMasterForm($("#idRmMasterForm"))){
			showProcessingLoaderOnSave("#idSave");
			window.setTimeout(function(){
				event.preventDefault();
				var formData = $('#idRmMasterForm').serializeToJSON();
				formData["advisorID"] = loggedInUser.id;
				formData["rmMasterId"] = id;
				var data = JSON.stringify(formData);
				var branchHeadID=formData.rmBranch;
				getMFData("GET", data, "checkIfBranchMasterExists/"+branchHeadID, onEditSuccess);
				
			
				
			}, 3000);
		}
	});	
	
	function onEditSuccess(flag) {
		
		if(flag!=true){
			bootbox.alert("Please create Branch Master for selected Branch Manager");
			hideProcessingLoaderOnSave("#idSave");
		}else{
			//var id = loggedInUser.id;
			var formData = $('#idRmMasterForm').serializeToJSON();
			formData["advisorID"] = loggedUser.id;//loggedUser.id;
			formData["rmMasterId"] = id;
			var data = JSON.stringify(formData);
			
			getMFData("POST", data, "updateRmMaster", onEditRMSuccess);
		}
		
	}
	
	function onEditRMSuccess() {
		hideProcessingLoaderOnSave("#idSave");
		serviceurl = "getRmMaster/" + loggedInUser.id;
		getMFData("GET", "" , serviceurl, onSuccess);
		function onSuccess(data) {
			sessionStorage.setItem("RM_MASTER_LIST", JSON.stringify(data));
			$("#idBackOffice").load("MF/viewRmMaster.html");
			$(".dashboardheading").html("");
			$(".dashboardheading").html("View RM Master");
			$("#addRecord").removeClass('btn_Disabled');
			$('#editRecord').addClass('btn_Disabled');
			$('#deleteRecord').addClass('btn_Disabled');
		}
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




		
	
	


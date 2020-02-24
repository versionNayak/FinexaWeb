var pageMode = sessionStorage.getItem("PAGE_MODE");
var id = sessionStorage.getItem("SELECTED_SB_MASTER_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
$(document).ready(function() {
	
	/***************** Fetching Branch List ********************/
	serviceurl = "getBranchManagerList/" + loggedUser.id;
	getMFData("GET", "", serviceurl, onBranchListSuccess);
	function onBranchListSuccess(data){
		holdingDrop = $("#idSbBranch");
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
	
	if (pageMode=="ADD"){
		
		$("#idImportButton").on("click", function(event){
			
			
			var validate;
			validate = validateSubBrokerMaster($("#idSubBrokerMasterForm"));
			if(validate) {   
				showProcessingLoaderOnSave("#idImportButton");
				window.setTimeout(function(){
					event.preventDefault();
					
					var id = loggedUser.id;
					var formData = $('#idSubBrokerMasterForm').serializeToJSON();
					formData["advisorID"] = id;//loggedUser.id;
					var data = JSON.stringify(formData);
					var branchHeadID=formData.sbBranch;
					getMFData("GET", data, "checkIfBranchMasterExists/"+branchHeadID, onCheckSuccess);
				
				}, 3000);
			}
		});

		
		function onCheckSuccess(flag) {
			
			if(flag!=true){
				bootbox.alert("Please create Branch Master for selected Branch Manager");
				hideProcessingLoaderOnSave("#idImportButton");
			}else{
				var id = loggedInUser.id;
				var formData = $('#idSubBrokerMasterForm').serializeToJSON();
				formData["advisorID"] = id;//loggedUser.id;
				var data = JSON.stringify(formData);
				getMFData("POST", data, "addSubBrokerMaster", onSaveSuccess);
			}
			function onSaveSuccess() {
				hideProcessingLoaderOnSave("#idImportButton");
				serviceurl = "getSbMaster/" + loggedUser.id;
				getMFData("GET", "" , serviceurl, onSuccess);
				function onSuccess(data) {
					sessionStorage.setItem("SB_MASTER_LIST", JSON.stringify(data));
					$("#idBackOffice").load("MF/viewSbMaster.html");
			    	$(".dashboardheading").html("");
					$(".dashboardheading").html("View Sub Broker Master");
			    	$("#addRecord").removeClass('btn_Disabled');
					$('#editRecord').addClass('btn_Disabled');
					$('#deleteRecord').addClass('btn_Disabled');
				}
			}
			
		}
		
	} else {
		if (pageMode=="EDIT") {
			getSelectedSB();
		}
	}
	
});

function getSelectedSB() {

	getMFData("GET", "", "SBMaster?advisorUserId=" + id, onGetBRDataSuccess);
	function onGetBRDataSuccess(data) {
		
		populateForm($('#idSubBrokerMasterForm'), data);
				
		console.log(data.sbBranch);
		
		$("#idSbBranch option").filter(function() {
			return this.value==data.sbBranch;
		}).prop('selected', true);
		
	}

	$("#idImportButton").on("click", function(event){
		
		if(validateSubBrokerMaster($("#idSubBrokerMasterForm"))) {   
			showProcessingLoaderOnSave("#idImportButton");
			window.setTimeout(function(){
				event.preventDefault();
				var formData = $('#idSubBrokerMasterForm').serializeToJSON();
				formData["advisorID"] = loggedInUser.id;
				formData["subBrokerMasterID"] = id;
				var data = JSON.stringify(formData);
				var branchHeadID=formData.sbBranch;
				getMFData("GET", data, "checkIfBranchMasterExists/"+branchHeadID, onEditCheckSuccess);
				
				
			}, 3000);
		}
	});	
	function onEditCheckSuccess(flag) {
		
		if(flag!=true){
			bootbox.alert("Please create Branch Master for selected Branch Manager");
			hideProcessingLoaderOnSave("#idImportButton");
		}else{
			var formData = $('#idSubBrokerMasterForm').serializeToJSON();
			formData["advisorID"] = loggedUser.id;//loggedUser.id;
			formData["subBrokerMasterID"] = id;
			var data = JSON.stringify(formData);
			getMFData("POST", data, "updateSbMaster", onEditSUBSuccess);
		}
		
	}
	
	
	function onEditSUBSuccess() {
		hideProcessingLoaderOnSave("#idImportButton");
		serviceurl = "getSbMaster/" +loggedUser.id;
		getMFData("GET", "" , serviceurl, onSaveSuccess);
		function onSaveSuccess(data) {
			sessionStorage.setItem("SB_MASTER_LIST", JSON.stringify(data));
			$("#idBackOffice").load("MF/viewSbMaster.html");
	    	$(".dashboardheading").html("");
			$(".dashboardheading").html("View Sub Broker Master");
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

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}
     
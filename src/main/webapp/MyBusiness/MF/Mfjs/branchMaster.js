var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id = sessionStorage.getItem("SELECTED_BR_MASTER_ID");
var pageMode = sessionStorage.getItem("PAGE_MODE");
var AdvisorRoleId = 0;
var branchHeadId;
$(document).ready(function() {
	
	/***************** Fetching Advisor User list for Branch Head ********************/
	
	serviceurl = "getBranchManagerList/" + loggedUser.id;
	getMFData("GET", "" , serviceurl, onBranchHeadListSuccess);
    var strName;
	function onBranchHeadListSuccess(data){
		holdingDrop = $("#idBranchHead");
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select Branch Head</option>');
		$.each(data, function (index, item) {
			strName = (item.firstName==null?"":item.firstName) + " " + (item.middleName==null?"":item.middleName) + " " + (item.lastName==null?"":item.lastName);
			holdingDrop.append('<option value="' + item.id + '">' + strName + '</option>');
		});
	}
	
	/**************** End of Fetching Advisor User list for Branch Head ******************/
	
	$("#idBranchHead").change(function() {
		branchHeadId = $(this).val();
		console.log("branchHeadId: " + branchHeadId);
	});	
	
	if (pageMode=="EDIT"){
		getMFData("GET", "", "getBranchDetailByBranchId?branchMasterId=" + id, onGetBRDataSuccess);
		function onGetBRDataSuccess(data) {
			
			console.log(data);
			
			populateForm($('#idBranchMasterForm'), data);
			
			console.log("data.branchHeadId: " + data.branchHeadId);
			
			/*$("#idBranchHead option").filter(function() {
				return this.value == data.branchHeadId;			    
			}).prop('selected', true);*/
			
			//alert(data.branchHead);
			//$("#idBranchHead").val(data.branchHead);
			//document.getElementById('#idBranchHead').value = data.branchHead;
			//alert(data.branchHead);
		}
	}
	
});


$("#idSave").on("click", function(event){
	
	var validate;
	validate = validateBranchMasterForm($("#idBranchMasterForm"));
	
	if(validate){
		showProcessingLoaderOnSave("#idSave");
		window.setTimeout(function(){
			event.preventDefault();
			var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
			var advisorId = loggedUser.id;
			var formData = $('#idBranchMasterForm').serializeToJSON();
			formData["branchHeadId"] = branchHeadId;
			
			if (pageMode=="EDIT"){
				formData["id"] = id;
			}
			
			var data = JSON.stringify(formData);
			
			serviceurl = "addBranchMaster?advisorUserId=" + loggedUser.id;
			if (pageMode=="EDIT"){
				getMFData("GET", "", "checkIfBranchExistsForBranchMaster/" + branchHeadId+"/"+id, onCheckSuccessForEdit);
				function onCheckSuccessForEdit(flag) {
					if(flag){
						getMFData("POST", data, "updateBranchMaster", onSuccess);
					}else{
						hideProcessingLoaderOnSave("#idSave")
						bootbox.alert("The selected Branch Head is already mapped to a branch.");
					}
				}
				//getMFData("POST", data, "updateBranchMaster", onSuccess);
			} else {
				getMFData("GET", "", "checkIfBranchExists/" + branchHeadId, onCheckSuccess);
				function onCheckSuccess(flag) {
					if(flag) {
						getMFData("POST", data, serviceurl, onSuccess);
					} else {
						hideProcessingLoaderOnSave("#idSave")
						bootbox.alert("The selected Branch Head is already mapped to a branch.");
					}
				}
			}
			
		}, 3000);
			
			function onSuccess(data) {
				hideProcessingLoaderOnSave("#idSave");
				serviceurl = "getAllMFBackOfficeBranchByAdvisorId/" +loggedInUser.id;
				getMFData("GET", "" , serviceurl, onAdvisorListSuccess);
				sessionStorage.removeItem("BRANCH_MASTER_LIST");
				
				function onAdvisorListSuccess(data) {
					
					sessionStorage.setItem("BRANCH_MASTER_LIST", JSON.stringify(data));
					
					$("#idBackOffice").load("MF/viewBranchMaster.html");
					$(".dashboardheading").html("");
					$(".dashboardheading").html("View Branch Master");
					$("#addRecord").removeClass('btn_Disabled');
					$('#editRecord').addClass('btn_Disabled');
					$('#deleteRecord').addClass('btn_Disabled');
				}
				
			}
			
	} 
	
});

function showProcessingLoaderOnSave(btnID){		
	$(btnID).attr("disabled","disabled");
	$(btnID).html('<i class="fa fa-refresh fa-lg fa-spin" style="color: #ffffff;"></i> Processing...');
	//$("body").css("cursor", "progress");
	$("#overlayLoading").css({'display':'block'});	
}

function hideProcessingLoaderOnSave(btnID){	
	//alert('In hideLoaderOnSave()');
	$(btnID).removeAttr("disabled");
	$(btnID).html("Submit");
	//$("body").css("cursor", "default");
	$("#overlayLoading").css({'display':'none'});
}
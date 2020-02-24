var pageMode = sessionStorage.getItem("PAGE_MODE");
var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var id = sessionStorage.getItem("SELECTED_CASH_ID");
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function() {
	
	
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
		if(loggedClient.clientInfoAddEdit === "Y"){
			$("#idAddCash").show();
			$("#undo").show();
		}else if(loggedClient.clientInfoView === "Y"){
			$("#idAddCash").hide();
			$("#undo").hide();
		}
	}else if(loggedUser != null && loggedUser.role === "Admin"){
		$("#idAddCash").hide();
		$("#undo").hide();
	}else{
		if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
			$("#idAddCash").show();
			$("#undo").show();
		}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
			$("#idAddCash").hide();
			$("#undo").hide();
		}
	}
	
	populateFamilyMemberByClientId(selectedClientId,
			$("#familyMemberImage"));
	
	//populateCashBalanceType($("#idCashBalanceTypeId"));
	populateBankName($("#idBankName"));
	$("#idCashBalanceTypeId").focus();
	
	if (pageMode=="ADD"){
		$("#idAddCash").on("click", function(event) {
			unmaskAllAmountFields();
			selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
			if (validate($('#clientCash')))
			{
				showLoaderOnSave("#idAddCash");
				window.setTimeout(function(){
					if (typeof selectedImageFamilyMemberid != 'undefined' && selectedImageFamilyMemberid!=null) {
						event.preventDefault();
						var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
						var formData = $('#clientCash').serializeToJSON();
						formData["clientId"] = selectedClientId;
						formData["familyMemberId"]=selectedImageFamilyMemberid;
						console.log('Saving Bank ID: '+formData["bankID"]);
						var data = JSON.stringify(formData);
						//console.log(data);
						//getClientDataWithErrorHandling("POST", data, "createClientCash", onAddCashSuccess, onSaveCashError)
						saveData("POST", data, "createClientCash", onAddCashSuccess)
					}else {
						alert("Please select a Family Member");
						return false;
					}
				}, 3000);
			}
		});
		function onAddCashSuccess(data) {
			hideLoaderOnSave("#idAddCash");
		    serviceurl = "clientCash/client/" +selectedClientId;
		    getClientData("GET", "" , serviceurl, onSuccess);
			function onSuccess(data) {			
				sessionStorage.setItem("CASH_LIST", JSON.stringify(data));
				$("#idClient").empty();
			//console.log("Saved cash id = " + data.id);
				$("#idClient").load("clientInfo/viewCash.html");
				$(".dashboardheading    ").html("");
				$(".dashboardheading    ").html("View Cash");
				$("#addRecord").removeClass('btn_Disabled');
				$('#editRecord').addClass('btn_Disabled');
				$('#deleteRecord').addClass('btn_Disabled');
			}	
		}
	} else {
		if (pageMode=="EDIT") {
			getSelectedCash();
		}
	
	
	/*function onSaveCashError(err) {
		$("#alertform").text("Error saving cash information. Please try after sometime or contact system administrator.");
		$(window).scrollTop(0);
		hideLoaderOnSave("#idAddCash");
		//return false;				
	}	
	*/
	
	
	
	
}

$('#focusguard-2').on('focus', function() {
	  // "last" focus guard got focus: set focus to the first field
	$("#idCashBalanceTypeId").focus();	
	$(window).scrollTop(0);
});

function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"clientCashDelete/"+ sessionStorage.getItem("SELECTED_CASH_ID"));
	$.ajax({
			type : 'GET',
			async : true,
			url : ClientServiceUrl+"clientCash/client/" +selectedClientId,
			dataType : 'json',
			contentType : 'application/json',
			beforeSend: function (xhr){ 
	    		xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success : function(afterDeleteddata) {		                
					$("#idClient").load("clientInfo/viewCash.html");
					 $(".dashboardheading    ").html("");
		               $(".dashboardheading    ").html("View Cash");
		               $("#addRecord").removeClass('btn_Disabled');
	                   $('#editRecord').addClass('btn_Disabled');
                },
                error: function (jqXHR, exception) {
    				var msg = '';
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
    		    }
			});
	
}	 



});
function maskAllAmountFields() {
	maskAmount('#idCurrentBalance');
}
function unmaskAllAmountFields() {
	unmaskAmount('#idCurrentBalance');
}

$("#undo").on("click", function(event) {
			poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)
});


function undoChange(){
	updateUNDO();
	
	if (pageMode=="ADD"){
		$(".form-control").val("");
	} else{
		if(pageMode=="EDIT"){
			getSelectedCash();
			updateUNDO();
		}
	}
}

function updateUNDO(){
	
	var lCashBalanceType = document.getElementById("idCashBalanceTypeId");
	var lBankName = document.getElementById("idBankName");
	var lCurrentBalance = document.getElementById("idCurrentBalance");
	
	    lCashBalanceType.style.border ="";
		lCurrentBalance.style.border ="";
		lBankName.style.border ="";
		
		document.getElementById('alertBalanceType').innerHTML="";
		document.getElementById('alertCurrentBalance').innerHTML="";
		document.getElementById('alertBankName').innerHTML="";
		document.getElementById('alertform').innerHTML="";
}

function getSelectedCash(){

	getClientData("GET", "", "clientCash?id=" + id, onGetCashDataSuccess);
	function onGetCashDataSuccess(data) {
		// console.log(JSON.stringify(data));
		// selectedImageFamilyMemberid = data.familyMemberID;
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberId)
		//alert("fmid: " + data.familyMemberId);
		poupulateFamilyMemberImage(data.familyMemberId);
		populateForm($('#clientCash'), data);
		maskAllAmountFields();
		
		$("#idCashBalanceTypeId option").filter(function() {
			return this.value==data.cashBalanceTypeId;
		    
		}).prop('selected', true);

	    console.log('Edit Cash existing Bank ID: '+data.bankID);		
		$("#idBankName option").filter(function() {
			return this.value==data.bankID;			    
		}).prop('selected', true);		 
	}

	$("#idAddCash").on("click", function(event) {
		unmaskAllAmountFields();	
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
		if (validate($('#clientCash'))) {
			showLoaderOnSave("#idAddCash");
			window.setTimeout(function(){
				var formData = $('#clientCash').serializeToJSON();
				formData["clientId"] = selectedClientId;
				formData["id"] = id;	
				formData["familyMemberId"]=selectedImageFamilyMemberid;
				console.log('Saving Bank ID: '+formData["bankID"]);
				var data = JSON.stringify(formData);
				// console.log(data);
				//getClientDataWithErrorHandling("POST", data, "editClientCash", onEditCashSuccess, onEditCashError);
				saveData("POST", data, "editClientCash", onEditCashSuccess);
			}, 3000);
		 }
		/*function onEditCashError(err) {
			$("#alertform").text("Error saving cash information. Please try after sometime or contact system administrator.");
			$(window).scrollTop(0);
			hideLoaderOnSave("#idAddCash");
		}*/

	});
	function onEditCashSuccess(data) {
		hideLoaderOnSave("#idAddCash");
	    serviceurl = "clientCash/client/" +selectedClientId;
	    getClientData("GET", "" , serviceurl, onSuccess);
		function onSuccess(data) {
			sessionStorage.setItem("CASH_LIST", JSON.stringify(data));
			// console.log("Saved cash id = " + data.id);
			$("#idClient").load("clientInfo/viewCash.html");
			$(".dashboardheading    ").html("");
			$(".dashboardheading    ").html("View Cash");
			$("#addRecord").removeClass('btn_Disabled');
			$('#editRecord').addClass('btn_Disabled');
			$('#deleteRecord').addClass('btn_Disabled');
		}
	}
}

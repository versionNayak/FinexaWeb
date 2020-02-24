var selectedTransactionMode;
var selectedSchemeType;
var selectedAmcName;
var selectedDpMode;
var loginUser;
var minRedemptionAmt = -1;
var multiplier = -1;

$(document).ready(function() {
	loginUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	var serviceurl = "clientTransact/"+selectedClientId;
	getClientData("GET", "" , serviceurl, onSuccess);
	    function onSuccess(data) {
	    	if (data.length == 0) {
	    		 bootbox.confirm({
					  title: "No Client Code Present",
				    	message: "Please create Client Code to Proceed further",
					    	callback: function (result) {
					    		if (result === true) {
					    			$("#idInvest").empty();
					    			$(".dashboardheading").html("Create UCC");
					    			$("#idInvest").load("invest/addCreateUCC.html");
					    		}
		    	 				else{
		    	 					$(".dashboardheading").html("View UCC");
		    	 			    	$("#idInvest").load("invest/viewUCCDetails.html");
		    	 				}	
	    	 				}	
	            		});
	    	} else {
	    		holdingDrop = $("#idClientUCCCombo");
				holdingDrop.find('option').remove();
				holdingDrop.append('<option value="">Select UCC</option>');
				$.each(data, function (index, value) {
					holdingDrop.append('<option value="' + value.clientCode + '" name = "' + value.physial + '">' + value.clientCode + '</option>');
				});
	    	}
	    }
});	
$('#idTransMode').change(function(){ 
	var ddl = document.getElementById("idTransMode");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedTransactionMode = selectedValue;
	if (loginUser != null) {
		if (selectedTransactionMode == "P") {
			
			// loading schemeTypes from Physical Scheme Tables
			getClientData("GET","","AllTransactBSEMFPhysicalSchemeTypes/"+loginUser.bseAccessMode,schemeTypeSuccess);
	    	function schemeTypeSuccess(data){
	    		holdingDrop = $("#idSchemeType");
	    		holdingDrop.find('option').remove();
	    		holdingDrop.append('<option value="">Select</option>');
	    		$.each(data, function (index, item) {
	    			holdingDrop.append('<option value="' + item + '">' + item + '</option>');
	    		});
	    	}
	    	
	    	// Loading AMC Names
			getClientData("GET", "" , "getPhysicalAmcName/"+loginUser.bseAccessMode, onSuccess);
		    function onSuccess(data) {
		    	holdingDrop = $("#idAmcName");
	    		holdingDrop.find('option').remove();
	    		holdingDrop.append('<option value="">Select</option>');
	    		$.each(data, function (index, item) {
	    			holdingDrop.append('<option value="' + item + '">' + item + '</option>');
	    		});
		    }
	    	
		} else {
			
			// loading schemeTypes from Demat Scheme Tables
			getClientData("GET","","AllTransactBSEMFPhysicalSchemeTypes/"+loginUser.bseAccessMode,schemeTypeSuccess);
	    	function schemeTypeSuccess(data){
	    		holdingDrop = $("#idSchemeType");
	    		holdingDrop.find('option').remove();
	    		holdingDrop.append('<option value="">Select</option>');
	    		$.each(data, function (index, item) {
	    			holdingDrop.append('<option value="' + item + '">' + item + '</option>');
	    		});
	    	}
	    	
	    	getClientData("GET", "" , "getPhysicalAmcName/"+loginUser.bseAccessMode, onSuccess);
		    function onSuccess(data) {
		    	holdingDrop = $("#idAmcName");
	    		holdingDrop.find('option').remove();
	    		holdingDrop.append('<option value="">Select</option>');
	    		$.each(data, function (index, item) {
	    			holdingDrop.append('<option value="' + item + '">' + item + '</option>');
	    		});
		    }
		}
	}
	
});
$('#idSchemeType').change(function(){ 
	var ddl = document.getElementById("idSchemeType");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedSchemeType = selectedValue; 
	loadSchemeNames();
});
$('#idAmcName').change(function(){ 
	var ddl = document.getElementById("idAmcName");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedAmcName = selectedValue;
	loadSchemeNames();
});
$('#idAllRedeem').change(function(){
	var lAllRedeem = document.getElementById("idAllRedeem");
	var allRedeem = lAllRedeem.options[lAllRedeem.selectedIndex].value;
	
	if(allRedeem == "Y"){
		document.getElementById("idAmountInvested").value = "";
		document.getElementById("idAmountInvested").readOnly = true;
		document.getElementById("idUnitsPurchased").value = "";
		document.getElementById("idUnitsPurchased").readOnly = true;
	}
	else if(allRedeem == "N"){
		document.getElementById("idAmountInvested").readOnly = false;
		document.getElementById("idUnitsPurchased").readOnly = false;
	}
	
});
/*
$('#idSchemeType').blur(function(){
	loadSchemeNames();
});
$('#idAmcName').blur(function(){
	loadSchemeNames();
});
*/
$('#idAmountInvested').blur(function(){
	var amount = $('#idAmountInvested').val();
	if (!(amount == null || amount == "")) {
		
		if (minRedemptionAmt > -1 && multiplier > -1) {
			console.log(amount >= parseInt(minRedemptionAmt));
			console.log((amount%multiplier) == 0);
			if ((amount >= parseInt(minRedemptionAmt)) && ((amount%multiplier) == 0)) {
//				bootbox.alert("Valid");
			} else {
				bootbox.alert("Invalid Amount");
				$('#idAmountInvested').val("");
			}	
		}
		
	}
});

function loadSchemeNames() {
	if (loginUser != null) {
		if (selectedTransactionMode == "P") {
			if (selectedSchemeType != null && selectedAmcName != null) {
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedSchemeType + "/redeem/"+loginUser.bseAccessMode+"/P";
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	holdingDrop = $("#idSchemeName");
		    		holdingDrop.find('option').remove();
		    		holdingDrop.append('<option value="">Select</option>');
		    		$.each(data, function (index, item) {
		    			holdingDrop.append('<option value="' + item.uniqueNo + '">' + item.schemeName + '</option>');
		    		});
			    }
			}
		} else {
			if (selectedSchemeType != null && selectedAmcName != null) {
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedSchemeType + "/redeem/"+loginUser.bseAccessMode+"/P";
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	holdingDrop = $("#idSchemeName");
		    		holdingDrop.find('option').remove();
		    		holdingDrop.append('<option value="">Select</option>');
		    		$.each(data, function (index, item) {
		    			holdingDrop.append('<option value="' + item.uniqueNo + '">' + item.schemeName + '</option>');
		    		});
			    }
			}
		}
	}

}
function loadInfoBox() {
	
	console.log(multiplier);
	$("#infoBox").attr("title", "Value must be greater than or equal to " + minRedemptionAmt + " and must be exactly divisible by " + multiplier);
}
$('#idSchemeName').change(function(){ 
	var ddl = document.getElementById("idSchemeName");
	
	if ($('#idSchemeName').val() == "") {
		$("#infoBox").attr("title", "Please select Scheme Name ");
		minRedemptionAmt = -1;
		multiplier = -1;
	} else {
		var selectedValue = ddl.options[ddl.selectedIndex].value;
		if (loginUser != null) {
			if (selectedTransactionMode == "P") {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	$("#idIsinNo").val(data.isin);
			    	$("#idSchemeId").val(data.schemeCode);
			    	
			    	minRedemptionAmt = data.minimumRedemptionAmount;
					multiplier = data.multipleRedemptionAmount;
					console.log("data changed");
					loadInfoBox();
			    }
			} else {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	$("#idIsinNo").val(data.isin);
			    	$("#idSchemeId").val(data.schemeCode);
			    	
			    	minRedemptionAmt = data.minimumRedemptionAmount;
					multiplier = data.multipleRedemptionAmount;
					console.log("data changed");
					loadInfoBox();
			    }
			}
		}
	}
	
	
});

$('#idRedeem').click(function(){
	if(validateRedeemForm($('#idFormRedeem'))) {
		
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idFormRedeem').serializeToJSON();
		formData["clientID"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorID"] = loggedUser.id;
		formData["kycStatus"] = "Y"; // only kycStatus true clients present
		formData["buySell"] = "R";// For Purchase
		formData["minRedeem"] = "Y";
		formData["dpc"] = "N";
		formData["purchaseMode"] = "B";
//		formData["buySellType"] = "Additional";
		formData["buySellType"] = "Fresh";
		var data = JSON.stringify(formData);
		//alert(data);
		saveData("POST", data, "redeemOrder", onAddUCCGeneralSuccess);
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
			$('#idFormRedeem')[0].reset();
		}
		
	}
	
});

$('#idClientUCCCombo').change(function(e){
	var ddl = document.getElementById("idClientUCCCombo");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	var dpStatus = $("#idClientUCCCombo").find('option:selected').attr("name");
	selectedDpMode = dpStatus;
	var holdingDrop = $("#idTransMode");
	var allUnitsDrop = $("#idAllRedeem");
	if (dpStatus == "true") {
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select</option>');
		holdingDrop.append('<option value="P">Physical</option>');
		
		allUnitsDrop.find('option').remove();
		allUnitsDrop.append('<option value="">Select</option>');
		allUnitsDrop.append('<option value="Y">Yes</option>');
		allUnitsDrop.append('<option value="N">No</option>');
		
		document.getElementById("idAmountInvested").readOnly = false;
		
	} else {
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select</option>');
		holdingDrop.append('<option value="N">NSDL Demat</option>');
		holdingDrop.append('<option value="C">CDSL Demat</option>');
		
		allUnitsDrop.find('option').remove();
		allUnitsDrop.append('<option value="N">No</option>');
		
		document.getElementById("idAmountInvested").value = "";
		document.getElementById("idAmountInvested").readOnly = true;
	}
	var serviceurl = "getOrdersInCart/"+selectedValue;
	getClientData("GET", "" , serviceurl, onSuccess);
	    function onSuccess(data) {
	    	$("#text").show();
	    	$("#text").val(data.optionalParam);
	    }
});


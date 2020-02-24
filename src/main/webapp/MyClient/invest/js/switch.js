var selectedTransactionMode;
var selectedFromSchemeType;
var selectedToSchemeType;
var selectedAmcName;
var selectedDpMode;
var loginUser;
var minPurchaseAmt = -1;
var minRedemptionAmt = -1;
var purchaseAmtMultiplier = -1;
var redemptionAmtMultiplier = -1;
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
	    
    	/*getClientData("GET","","AllTransactUCCClientType",transModeSuccess);
    	function transModeSuccess(data){
    		holdingDrop = $("#idTransMode");
    		holdingDrop.find('option').remove();
    		holdingDrop.append('<option value="">Select</option>');
    		$.each(data, function (index, item) {
    			holdingDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
    		});
    	}*/
	
});	
$(".cartIcon").click(function(){	
	
	$(".dashboardheading").html("Add to Cart"); 
	$("#wrapper").css("height","auto");
	$("#idInvest").empty();
	
	$("#idInvest").load("invest/checkout.html");
	
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
	    		holdingDrop = $("#idFromSchemeType");
	    		holdingDrop2 = $("#idToSchemeType");
	    		holdingDrop.find('option').remove();
	    		holdingDrop.append('<option value="">Select</option>');
	    		holdingDrop2.find('option').remove();
	    		holdingDrop2.append('<option value="">Select</option>');
	    		$.each(data, function (index, item) {
	    			holdingDrop.append('<option value="' + item + '">' + item + '</option>');
	    			holdingDrop2.append('<option value="' + item + '">' + item + '</option>');
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
	    		holdingDrop = $("#idFromSchemeType");
	    		holdingDrop2 = $("#idToSchemeType");
	    		holdingDrop.find('option').remove();
	    		holdingDrop.append('<option value="">Select</option>');
	    		holdingDrop2.find('option').remove();
	    		holdingDrop2.append('<option value="">Select</option>');
	    		$.each(data, function (index, item) {
	    			holdingDrop.append('<option value="' + item + '">' + item + '</option>');
	    			holdingDrop2.append('<option value="' + item + '">' + item + '</option>');
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
$('#idFromSchemeType').change(function(){
	var ddl = document.getElementById("idFromSchemeType");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedFromSchemeType = selectedValue; 
	loadFromSchemeNames();
});
$('#idToSchemeType').change(function(){
	var ddl = document.getElementById("idToSchemeType");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedToSchemeType = selectedValue; 
	loadToSchemeNames();
});
$('#idAmcName').change(function(){
	 
	var ddl = document.getElementById("idAmcName");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedAmcName = selectedValue;
	loadFromSchemeNames();
	loadToSchemeNames();

});
function loadFromSchemeNames() {
	if (loginUser != null) {
		if (selectedTransactionMode == "P") {
			if (selectedFromSchemeType != null && selectedAmcName != null) {
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedFromSchemeType + "/switch/"+loginUser.bseAccessMode+"/P";
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	holdingDrop = $("#idFromSchemeName");
		    		holdingDrop.find('option').remove();
		    		holdingDrop.append('<option value="">Select</option>');
		    		$.each(data, function (index, item) {
		    			holdingDrop.append('<option value="' + item.uniqueNo + '">' + item.schemeName + '</option>');
		    		});
			    }
			}
		} else {
			if (selectedFromSchemeType != null && selectedAmcName != null) {
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedFromSchemeType + "/switch/"+loginUser.bseAccessMode+"/D";
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	holdingDrop = $("#idFromSchemeName");
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
function loadToSchemeNames() {
	if (loginUser != null) {
		if (selectedTransactionMode == "P") {
			if (selectedToSchemeType != null && selectedAmcName != null) {
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedToSchemeType + "/switch/"+loginUser.bseAccessMode+"/P";
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	holdingDrop = $("#idToSchemeName");
		    		holdingDrop.find('option').remove();
		    		holdingDrop.append('<option value="">Select</option>');
		    		$.each(data, function (index, item) {
		    			holdingDrop.append('<option value="' + item.uniqueNo + '">' + item.schemeName + '</option>');
		    		});
			    }
			}
		} else {
			if (selectedToSchemeType != null && selectedAmcName != null) {
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedToSchemeType + "/switch/"+loginUser.bseAccessMode+"/D";
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	holdingDrop = $("#idToSchemeName");
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

$('#idFromSchemeName').change(function(){ 
	var ddl = document.getElementById("idFromSchemeName");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	if ($('#idFromSchemeName').val() == "") {
		$("#infoBox").attr("title", "Please select From Scheme Name ");
		minPurchaseAmt = -1;
		purchaseAmtMultiplier = -1;
	} else {
		if (loginUser != null) {
			if (selectedTransactionMode == "P") {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
				function onSuccess(data) {
					$("#idFromIsinNo").val(data.isin);
					$("#idFromSchemeId").val(data.schemeCode);
					minPurchaseAmt = data.minimumPurchaseAmount;
					purchaseAmtMultiplier = data.purchaseAmountMultiplier;
					console.log(minPurchaseAmt);
					console.log(purchaseAmtMultiplier);
				}
			} else {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	$("#idFromIsinNo").val(data.isin);
			    	$("#idFromSchemeId").val(data.schemeCode);
			    	 minPurchaseAmt = data.minimumPurchaseAmount;
			    	 purchaseAmtMultiplier = data.purchaseAmountMultiplier;
			    }
			}
		}
	}
	
});
$('#idToSchemeName').change(function(){ 
	var ddl = document.getElementById("idToSchemeName");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	if ($('#idToSchemeName').val() == "") {
		$("#infoBox").attr("title", "Please select To Scheme Name ");
		minRedemptionAmt = -1;
		redemptionAmtMultiplier = -1;
	} else {
		if (loginUser != null) {
			if (selectedTransactionMode == "P") {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
				function onSuccess(data) {
					$("#idToIsinNo").val(data.isin);
					$("#idToSchemeCode").val(data.schemeCode);
					minRedemptionAmt = data.minimumRedemptionAmount;
					redemptionAmtMultiplier = data.multipleRedemptionAmount;
					console.log(minRedemptionAmt);
					console.log(redemptionAmtMultiplier);
					loadInfoBox();
				}
			} else {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	$("#idToIsinNo").val(data.isin);
			    	$("#idToSchemeCode").val(data.schemeCode);
			    	minRedemptionAmt = data.minimumRedemptionAmount;
					redemptionAmtMultiplier = data.multipleRedemptionAmount;
					loadInfoBox();
			    }
			}
		}
	}
	
});
function loadInfoBox() {

	var greaterAmt = 0;
	var greaterMultiple = 0;
	
	if (parseInt(minPurchaseAmt) > parseInt(minRedemptionAmt)) {
		greaterAmt = parseInt(minPurchaseAmt);
	} else {
		greaterAmt = parseInt(minRedemptionAmt);
	}
	
	if (parseInt(redemptionAmtMultiplier) > parseInt(purchaseAmtMultiplier)) {
		greaterMultiple = parseInt(redemptionAmtMultiplier);
	} else {
		greaterMultiple = parseInt(purchaseAmtMultiplier);
	}
	
	$("#infoBox").attr("title", "Value must be greater than or equal to " + greaterAmt + " and must be exactly divisible by " + greaterMultiple);
}
$('#idSwitchAmount').blur(function(){
	var amount = $('#idSwitchAmount').val();
	if (!(amount == null || amount == "")) {
		if (minRedemptionAmt > -1 && redemptionAmtMultiplier > -1 && minPurchaseAmt > -1 && purchaseAmtMultiplier > -1) {
			
			var greaterAmt = 0;
			var greaterMultiple = 0;
			
			if (parseInt(minPurchaseAmt) > parseInt(minRedemptionAmt)) {
				greaterAmt = parseInt(minPurchaseAmt);
			} else {
				greaterAmt = parseInt(minRedemptionAmt);
			}
			
			if (parseInt(redemptionAmtMultiplier) > parseInt(purchaseAmtMultiplier)) {
				greaterMultiple = parseInt(redemptionAmtMultiplier);
			} else {
				greaterMultiple = parseInt(purchaseAmtMultiplier);
			}
 			
			if ((amount >= greaterAmt) && ((amount%greaterMultiple) == 0)) {
//				bootbox.alert("Valid");
			} else {
				bootbox.alert("Invalid Amount");
				$('#idAmountInvested').val("");
			}	
		}
		
	}
});
$('#idBuyNow').click(function(){
	
	if(validateFormSwitch($('#idFormSwitch'))){
//		alert("Switch True");
		
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idFormSwitch').serializeToJSON();
		formData["clientID"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorID"] = loggedUser.id;
		formData["kycStatus"] = "Y"; // only kycStatus true clients present
//		formData["buySell"] = "P";// For Purchase
//		formData["allRedeem"] = "N";
		formData["minRedeem"] = "N";
		formData["dpc"] = "N";
		formData["purchaseMode"] = "B";
		var data = JSON.stringify(formData);
		saveData("POST", data, "registerSwitchOrder", registerSwitchOrder);
		//alert("Switch: True");
		function registerSwitchOrder(data) {
			bootbox.alert(data.message);
			$('#idFormSwitch')[0].reset();
		}
		
	}
	else{
//		alert("Switch False");
	}
	
	
});
$('#idAddToCart').click(function(){
	if(validateFormSwitch($('#idFormSwitch'))){
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idFormSwitch').serializeToJSON();
		formData["clientID"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorID"] = loggedUser.id;
		formData["kycStatus"] = "Y"; // only kycStatus true clients present
//		formData["buySell"] = "P";// For Purchase
//		formData["allRedeem"] = "N";
		formData["minRedeem"] = "N";
		formData["dpc"] = "N";
		formData["purchaseMode"] = "C";
		var data = JSON.stringify(formData);
		saveData("POST", data, "registerSwitchOrder", registerSwitchOrder);
		function registerSwitchOrder(data) {
			bootbox.alert(data.message);
			$("#text").val(data.optionalParam);
			$('#idFormSwitch')[0].reset();
		}
	}
});
$('#idClientUCCCombo').change(function(e){
	var ddl = document.getElementById("idClientUCCCombo");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	var dpStatus = $("#idClientUCCCombo").find('option:selected').attr("name");
	selectedDpMode = dpStatus;
	var holdingDrop = $("#idTransMode");
	if (dpStatus == "true") {
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select</option>');
		holdingDrop.append('<option value="P">Physical</option>');
	} else {
		holdingDrop.find('option').remove();
		holdingDrop.append('<option value="">Select</option>');
		holdingDrop.append('<option value="N">NSDL Demat</option>');
		holdingDrop.append('<option value="C">CDSL Demat</option>');
	}
	var serviceurl = "getOrdersInCart/"+selectedValue;
	getClientData("GET", "" , serviceurl, onSuccess);
	    function onSuccess(data) {
	    	$("#text").show();
	    	$("#text").val(data.optionalParam);
	    }
});

$('#idAllUnitsFlag').change(function(){
	var lAllRedeem = document.getElementById("idAllUnitsFlag");
	var allRedeem = lAllRedeem.options[lAllRedeem.selectedIndex].value;
	
	if(allRedeem == "Y"){
		document.getElementById("idSwitchAmount").value = "";
		document.getElementById("idSwitchAmount").readOnly = true;
		document.getElementById("idSwitchUnits").value = "";
		document.getElementById("idSwitchUnits").readOnly = true;
	}
	else if(allRedeem == "N"){
		document.getElementById("idSwitchAmount").readOnly = false;
		document.getElementById("idSwitchUnits").readOnly = false;
	}
	
});



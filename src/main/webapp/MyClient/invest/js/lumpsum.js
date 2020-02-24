var selectedTransactionMode;
var selectedSchemeType;
var selectedAmcName;
var selectedDpMode;
var minAmtFresh;
var minAmtAdditional;
var multiplier;
var loginUser;
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
	    
	$("#idFolioNumber").prop('readonly', true);    
	 
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
		    
		    // Showing the folio No. for Physical
		    $("#idFolioNumber").prop('readonly', false);
	    	
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
		    
		    // Blocking the folio No. for Demat
		    $("#idFolioNumber").val('');
		    $("#idFolioNumber").prop('readonly', true);
		    
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

$('#idSchemeType').blur(function(){
	loadSchemeNames();
});
$('#idAmcName').blur(function(){
	loadSchemeNames();
});

$('#idAmountInvested').blur(function(){
	var amount = $('#idAmountInvested').val();
	if (!(amount == null || amount == "")) {
		var minAmt = 0;
		if($('#idTransactionType').val() == "Fresh") {
			minAmt = minAmtFresh;
		} else {
			minAmt = minAmtAdditional;
		}
		if (minAmtFresh > -1 && minAmtAdditional > -1 && multiplier > -1) {
			console.log(amount >= parseInt(minAmt));
			console.log((amount%multiplier) == 0);
			if ((amount >= parseInt(minAmt)) && ((amount%multiplier) == 0)) {
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
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedSchemeType + "/lumpsum/"+loginUser.bseAccessMode+"/P";
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
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedSchemeType + "/lumpsum/"+loginUser.bseAccessMode+"/D";
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
	
	console.log(minAmtFresh);
	console.log(multiplier);
	var transactionType = $('#idTransactionType').val();
	if (transactionType != null && transactionType != "") {
		if($('#idTransactionType').val() == "Fresh") {
			$("#infoBox").attr("title", "Value must be greater than or equal to " + minAmtFresh + " and must be exactly divisible by " + multiplier);
		} else {
			$("#infoBox").attr("title", "Value must be greater than or equal to " + minAmtAdditional + " and must be exactly divisible by " + multiplier);
		}
	} else {
		$("#infoBox").attr("title", "Please select Scheme Name and Transaction Type");
	}
}
$('#idTransactionType').change(function(){
	loadInfoBox();
});

$('#idSchemeName').change(function(){ 
	var ddl = document.getElementById("idSchemeName");
	if ($('#idSchemeName').val() == "") {
		$("#infoBox").attr("title", "Please select Scheme Name and Transaction Type");
		minAmtFresh = -1;
		minAmtAdditional = -1;
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
					minAmtFresh = data.minimumPurchaseAmount;
					minAmtAdditional = data.additionalPurchaseAmount;
					multiplier = data.purchaseAmountMultiplier;
					console.log("data changed");
					loadInfoBox();
				}

			} else {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
				function onSuccess(data) {
					$("#idIsinNo").val(data.isin);
					$("#idSchemeId").val(data.schemeCode);
					minAmtFresh = data.minimumPurchaseAmount;
					minAmtAdditional = data.additionalPurchaseAmount;
					multiplier = data.purchaseAmountMultiplier;
					console.log("data changed");
					loadInfoBox();
				}
			}
		}
	}
	
});

$('#idBuyNow').click(function(){
	
	if(validateLumpsum($('#idFormLumpsum'))) {
		//alert("Test 0");
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idFormLumpsum').serializeToJSON();
		formData["clientID"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorID"] = loggedUser.id;
		formData["kycStatus"] = "Y"; // only kycStatus true clients present
		formData["buySell"] = "P";// For Purchase
		formData["allRedeem"] = "N";
		formData["minRedeem"] = "N";
		formData["dpc"] = "N";
		formData["purchaseMode"] = "B";
		//alert("Test 1");
		var data = JSON.stringify(formData);
		saveData("POST", data, "registerPurchaseOrder", onAddUCCGeneralSuccess);
		//alert("Test 2");
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
			$('#idFormLumpsum')[0].reset();
		}
	}
	
});
$('#idAddToCart').click(function(){
	
	if(validateLumpsum($('#idFormLumpsum'))) {
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idFormLumpsum').serializeToJSON();
		formData["clientID"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorID"] = loggedUser.id;
		formData["kycStatus"] = "Y"; // only kycStatus true clients present
		formData["buySell"] = "P";// For Purchase
		formData["allRedeem"] = "N";
		formData["minRedeem"] = "N";
		formData["dpc"] = "N";
		formData["purchaseMode"] = "C";
		sessionStorage.setItem("CLIENT_CODE_LUMPSUM",$("#idClientUCCCombo").val());
		var data = JSON.stringify(formData);
		saveData("POST", data, "registerPurchaseOrder", onAddUCCGeneralSuccess);
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
			$("#text").val(data.optionalParam);
			$('#idFormLumpsum')[0].reset();
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


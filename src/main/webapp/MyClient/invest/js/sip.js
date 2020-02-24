var selectedTransactionMode;
var selectedSchemeType;
var selectedAmcName;
var selectedClientCode;
var selectedDpMode;
var loginUser;
var sipMinimumAmt = -1;
var sipMaximumAmt = -1;
var sipMultiplier = -1;
var minNoOfInstallments = -1;
var maxNoOfInstallments = -1;
var freqType = "MONTHLY";
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
	    $(".datepicker-icon").on("click", function () {
			$(this).closest(".input-group").find("input").trigger("focus");
		});
	    $("#idStartDate").datepicker({
			format : "dd/mm/yyyy",
            todayHighlight : false,
            todayBtn : true,
            autoclose : true,
            forceParse: false,
            startDate : new Date(Date.now())
        });
	
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
function loadSchemeNames() {
	
	if (loginUser != null) {
		if (selectedTransactionMode == "P") {
			if (selectedSchemeType != null && selectedAmcName != null) {
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedSchemeType + "/sip/"+loginUser.bseAccessMode+"/P";
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
				var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedSchemeType + "/sip/"+loginUser.bseAccessMode+"/D";
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
	$("#infoBox").attr("title", "Value must be greater than or equal to " + sipMinimumAmt + " and must be lesser than or equal to " + sipMaximumAmt +" and must be exactly divisible by " + sipMultiplier);
	$("#infoBoxInstallments").attr("title", "No Of Installments must be greater than or equal to " + minNoOfInstallments + " and must be lesser than or equal to " + maxNoOfInstallments);

}
$('#idSchemeName').change(function(){
	var ddl = document.getElementById("idSchemeName");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	if ($('#idSchemeName').val() == "") {
		$("#infoBox").attr("title", "Please select Scheme Name ");
		sipMinimumAmt = -1;
		sipMaximumAmt = -1;
		sipMultiplier = -1;
		minNoOfInstallments = -1;
		maxNoOfInstallments = -1;
	} else {
		if (loginUser != null) {
			if (selectedTransactionMode == "P") {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	$("#idIsinNo").val(data.isin);
			    	$("#idSchemeId").val(data.schemeCode);
					var serviceUrlSip = "";
					if (loginUser.bseAccessMode == 1) {
						// Live mode
						serviceurlSip = "allSIPLiveRecords/"+data.schemeCode+"/"+freqType;
					} else {
						// Demo Mode
						serviceurlSip = "allSIPRecords/"+data.schemeCode+"/"+freqType;
					}
					getClientData("GET", "" , serviceurlSip, onSipSuccess);
					function onSipSuccess(dataSip) {
						if (dataSip.id == 0) {
							bootbox.alert("This Frequency Type is not allowed");
							sipMinimumAmt = -1;
							sipMaximumAmt = -1;
							sipMultiplier = -1;
							$("#infoBox").attr("title", "Please select Scheme Name ");
						} else {
							console.log(sipMinimumAmt);
							console.log(sipMaximumAmt);
							console.log(sipMultiplier);
							sipMinimumAmt = dataSip.sipMinimumInstallmentAmount;
							sipMaximumAmt = dataSip.sipMaximumInstallmentAmount;
							sipMultiplier = dataSip.sipMultiplierAmount;
							minNoOfInstallments = dataSip.sipMinimumInstallmentNumbers;
							maxNoOfInstallments = dataSip.sipMaximumInstallmentNumbers;
							loadInfoBox();
						}
					}
			    	
			    }
			} else {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
				function onSuccess(data) {
					$("#idIsinNo").val(data.isin);
					$("#idSchemeId").val(data.schemeCode);
					var serviceUrlSip = "";
					
					if (loginUser.bseAccessMode == 1) {
						// Live mode
						serviceurlSip = "allSIPLiveRecords/"+data.schemeCode+"/"+freqType;
					} else {
						// Demo Mode
						serviceurlSip = "allSIPRecords/"+data.schemeCode+"/"+freqType;
					}
					getClientData("GET", "" , serviceurlSip, onSipSuccess);
					function onSipSuccess(dataSip) {
						if (dataSip.id == 0) {
							bootbox.alert("This Frequency Type is not allowed");
							sipMinimumAmt = -1;
							sipMaximumAmt = -1;
							sipMultiplier = -1;
							$("#infoBox").attr("title", "Please select Scheme Name ");
						} else {
							console.log(sipMinimumAmt);
							console.log(sipMaximumAmt);
							console.log(sipMultiplier);
							sipMinimumAmt = dataSip.sipMinimumInstallmentAmount;
							sipMaximumAmt = dataSip.sipMaximumInstallmentAmount;
							sipMultiplier = dataSip.sipMultiplierAmount;
							minNoOfInstallments = dataSip.sipMinimumInstallmentNumbers;
							maxNoOfInstallments = dataSip.sipMaximumInstallmentNumbers;
							loadInfoBox();
						}
					}
				}
			}
		}
	}
});
$('#idFreqType').change(function(){
	freqType = $('#idFreqType').val();
	var serviceUrlSip = "";
	if (loginUser.bseAccessMode == 1) {
		// Live mode
		serviceurlSip = "allSIPLiveRecords/"+$("#idSchemeId").val()+"/"+freqType;
	} else {
		// Demo Mode
		serviceurlSip = "allSIPRecords/"+$("#idSchemeId").val()+"/"+freqType;
	}
	getClientData("GET", "" , serviceurlSip, onSipSuccess);
	function onSipSuccess(dataSip) {
		if (dataSip.id == 0) {
			bootbox.alert("This Frequency Type is not allowed");
			sipMinimumAmt = -1;
			sipMaximumAmt = -1;
			sipMultiplier = -1;
			$("#infoBox").attr("title", "Please select Scheme Name ");
		} else {
			console.log(sipMinimumAmt);
			console.log(sipMaximumAmt);
			console.log(sipMultiplier);
			sipMinimumAmt = dataSip.sipMinimumInstallmentAmount;
			sipMaximumAmt = dataSip.sipMaximumInstallmentAmount;
			sipMultiplier = dataSip.sipMultiplierAmount;
			minNoOfInstallments = dataSip.sipMinimumInstallmentNumbers;
			maxNoOfInstallments = dataSip.sipMaximumInstallmentNumbers;
			loadInfoBox();
		}
		
	}
});


$('#idInstallmentAmount').blur(function(){
	var amount = $('#idInstallmentAmount').val();
	if (!(amount == null || amount == "")) {
		
		if (sipMinimumAmt > -1 && sipMaximumAmt > -1 && sipMultiplier > -1) {
			if ((amount >= parseInt(sipMinimumAmt)) && (amount <= parseInt(sipMaximumAmt)) && ((amount%sipMultiplier) == 0)) {
//				bootbox.alert("Valid");
			} else {
				bootbox.alert("Invalid Amount");
				$('#idInstallmentAmount').val("");
			}	
		} else {
			bootbox.alert("Invalid Amount");
			$('#idInstallmentAmount').val("");
		}
		
	}
});

$('#idNoOfInstallment').blur(function(){
	var amount = $('#idNoOfInstallment').val();
	if (!(amount == null || amount == "")) {
		
		if (minNoOfInstallments > -1 && maxNoOfInstallments > -1) {
			if ((amount >= parseInt(minNoOfInstallments)) && (amount <= parseInt(maxNoOfInstallments))) {
//				bootbox.alert("Valid");
			} else {
				bootbox.alert("Please enter Valid No of Installments");
				$('#idNoOfInstallment').val("");
			}	
		} else {
			bootbox.alert("Please enter Valid No of Installments");
			$('#idNoOfInstallment').val("");
		}
	}
});


$('#idBuyNow').click(function(){
	
	
	if(validateISIP($('#idFormXsipOrderEntryParam'))) {
		
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idFormXsipOrderEntryParam').serializeToJSON();
		formData["clientId"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorId"] = loggedUser.id;
		formData["kycStatus"] = "Y"; // only kycStatus true clients present
		formData["buySell"] = "P";// For Purchase
		formData["allRedeem"] = "N";
		formData["minRedeem"] = "N";
		formData["dpc"] = "N";
		formData["purchaseMode"] = "B";
		var data = JSON.stringify(formData);
		saveData("POST", data, "registerSIPOrder", onAddUCCGeneralSuccess);
		//alert("Test Sip");
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
			$('#idFormXsipOrderEntryParam')[0].reset();
		}
	} 
	
});
$('#idAddToCart').click(function(){
	
	if(validateISIP($('#idFormXsipOrderEntryParam'))) {
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idFormXsipOrderEntryParam').serializeToJSON();
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
		saveData("POST", data, "registerSIPOrder", onAddUCCGeneralSuccess);
		function onAddUCCGeneralSuccess(data) {
			bootbox.alert(data.message);
			$("#text").val(data.optionalParam);
			$('#idFormXsipOrderEntryParam')[0].reset();
		}
	}
});
$('#idRegistrationType').change(function(e){
	
	if (selectedClientCode == "" || selectedClientCode == null) {
		bootbox.alert("Please select client code");
	}
	var ddl = document.getElementById("idRegistrationType");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	if (!(selectedValue == "" || selectedValue == null)) {
		var serviceUrl = "getMandateId/" + selectedClientCode + "/" + selectedValue;
		getClientData("GET", "", serviceUrl, onSuccess);
		function onSuccess(data) {
			holdingDrop = $("#idXSIPMandateid");
			holdingDrop.find('option').remove();
			holdingDrop.append('<option value="">Select Id</option>');
			$.each(data, function (index, value) {
				holdingDrop.append('<option value="' + value + '">' + value + '</option>');
			});
		}
	} else {
		$("#idXSIPMandateid").find('option').remove();
	}

});


$('#idClientUCCCombo').change(function(e){

	var ddl = document.getElementById("idClientUCCCombo");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedClientCode = selectedValue;
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
	 $("#idXSIPMandateid").find('option').remove();   
});


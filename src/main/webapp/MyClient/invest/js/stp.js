var selectedTransactionMode;
var selectedFromSchemeType;
var selectedToSchemeType;
var selectedAmcName;
var selectedDpMode;
var loginUser;
var sipMinimumAmt = -1;
var sipMaximumAmt = -1;
var sipMultiplier = -1;
var minNoOfInstallments = -1;
var maxNoOfInstallments = -1;
var freqType = "MONTHLY";

var sipFromMinimumAmt = -1;
var sipFromMaximumAmt = -1;
var sipFromMultiplier = -1;
var minFromNoOfInstallments = -1;
var maxFromNoOfInstallments = -1;

var sipToMinimumAmt = -1;
var sipToMaximumAmt = -1;
var sipToMultiplier = -1;
var minToNoOfInstallments = -1;
var maxToNoOfInstallments = -1;

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
        })	
        
       /* $("#idStartDate").datepicker({
			format : "dd/mm/yyyy",
            todayHighlight : false,
            todayBtn : true,
            autoclose : true,
            forceParse: false,
            startDate : new Date(Date.now() - 864e5)
        })*/	
	
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
		
	}
	if (selectedTransactionMode == "P") {
		if (selectedFromSchemeType != null && selectedAmcName != null) {
			var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedFromSchemeType + "/stp/"+loginUser.bseAccessMode+"/P";
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
			var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedFromSchemeType + "/stp/"+loginUser.bseAccessMode+"/D";
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
function loadToSchemeNames() {
	if (selectedTransactionMode == "P") {
		if (selectedToSchemeType != null && selectedAmcName != null) {
			var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedToSchemeType + "/stp/"+loginUser.bseAccessMode+"/P";
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
			var serviceurl = "getPhysicalSchemeNamesByFilter/"+selectedAmcName + "/" + selectedToSchemeType + "/stp/"+loginUser.bseAccessMode+"/D";
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

function loadInfoBox() {
	
	if(sipFromMinimumAmt == -1){
		$("#infoBox").attr("title", "Please select From Scheme");
		$("#infoBoxInstallments").attr("title", "Please select From Scheme");
	} else if (sipToMaximumAmt == -1) {
		$("#infoBox").attr("title", "Please select To Scheme");
		$("#infoBoxInstallments").attr("title", "Please select To Scheme");
	} else {
		
		if(sipFromMinimumAmt < sipToMinimumAmt){
			sipMinimumAmt = sipToMinimumAmt;
		} else {
			sipMinimumAmt = sipFromMinimumAmt;
		}

		if(sipFromMaximumAmt < sipToMaximumAmt){
			sipMaximumAmt = sipFromMaximumAmt;
		} else {
			sipMaximumAmt = sipToMaximumAmt;
		}

		if(sipFromMultiplier < sipToMultiplier){
			sipMultiplier = sipToMultiplier;
		} else {
			sipMultiplier = sipFromMultiplier;
		}

		if(minFromNoOfInstallments < minToNoOfInstallments){
			minNoOfInstallments = minToNoOfInstallments;
		} else {
			minNoOfInstallments = minFromNoOfInstallments;
		}

		if(maxFromNoOfInstallments < maxToNoOfInstallments){
			maxNoOfInstallments = maxFromNoOfInstallments;
		} else {
			maxNoOfInstallments = maxToNoOfInstallments;
		}

		
		$("#infoBox").attr("title", "Value must be greater than or equal to " + sipMinimumAmt + " and must be lesser than or equal to " + sipMaximumAmt +" and must be exactly divisible by " + sipMultiplier);
		$("#infoBoxInstallments").attr("title", "No Of Installments must be greater than or equal to " + minNoOfInstallments + " and must be lesser than or equal to " + maxNoOfInstallments);

		
	}
	
	
}

$('#idFromSchemeName').change(function(){ 
	var ddl = document.getElementById("idFromSchemeName");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	
	if ($('#idFromSchemeName').val() == "") {
		$("#infoBox").attr("title", "Please select From Scheme Name ");
		sipFromMinimumAmt = -1;
		sipFromMaximumAmt = -1;
		sipFromMultiplier = -1;
		minFromNoOfInstallments = -1;
		maxFromNoOfInstallments = -1;
	} else {
		if (loginUser != null) {
			if (selectedTransactionMode == "P") {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	$("#idFromIsinNo").val(data.isin);
			    	$("#idFromSchemeId").val(data.schemeCode);
			    	
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
							sipFromMinimumAmt = -1;
							sipFromMaximumAmt = -1;
							sipFromMultiplier = -1;
							$("#infoBox").attr("title", "Please select From Scheme Name ");
						} else {
							console.log(sipFromMinimumAmt);
							console.log(sipFromMaximumAmt);
							console.log(sipFromMultiplier);
							sipFromMinimumAmt = dataSip.sipMinimumInstallmentAmount;
							sipFromMaximumAmt = dataSip.sipMaximumInstallmentAmount;
							sipFromMultiplier = dataSip.sipMultiplierAmount;
							minFromNoOfInstallments = dataSip.sipMinimumInstallmentNumbers;
							maxFromNoOfInstallments = dataSip.sipMaximumInstallmentNumbers;
							loadInfoBox();
						}
					}
			    	
			    }
			} else {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	$("#idFromIsinNo").val(data.isin);
			    	$("#idFromSchemeId").val(data.schemeCode);
			    	
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
							sipFromMinimumAmt = -1;
							sipFromMaximumAmt = -1;
							sipFromMultiplier = -1;
							$("#infoBox").attr("title", "Please select From Scheme Name ");
						} else {
							console.log(sipFromMinimumAmt);
							console.log(sipFromMaximumAmt);
							console.log(sipFromMultiplier);
							sipFromMinimumAmt = dataSip.sipMinimumInstallmentAmount;
							sipFromMaximumAmt = dataSip.sipMaximumInstallmentAmount;
							sipFromMultiplier = dataSip.sipMultiplierAmount;
							minFromNoOfInstallments = dataSip.sipMinimumInstallmentNumbers;
							maxFromNoOfInstallments = dataSip.sipMaximumInstallmentNumbers;
							loadInfoBox();
						}
					}
				
			    }
			}
		}
	}
	
	
	
});
$('#idToSchemeName').change(function(){ 
	var ddl = document.getElementById("idToSchemeName");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	
	if ($('#idFromSchemeName').val() == "") {
		$("#infoBox").attr("title", "Please select From Scheme Name ");
		sipToMinimumAmt = -1;
		sipToMaximumAmt = -1;
		sipToMultiplier = -1;
		minToNoOfInstallments = -1;
		maxToNoOfInstallments = -1;
	} else {
		if (loginUser != null) {
			if (selectedTransactionMode == "P") {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	$("#idToIsinNo").val(data.isin);
			    	$("#idToSchemeCode").val(data.schemeCode);
			    	
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
							sipToMinimumAmt = -1;
							sipToMaximumAmt = -1;
							sipToMultiplier = -1;
							$("#infoBox").attr("title", "Please select To Scheme Name ");
						} else {
							console.log(sipToMinimumAmt);
							console.log(sipToMaximumAmt);
							console.log(sipToMultiplier);
							sipToMinimumAmt = dataSip.sipMinimumInstallmentAmount;
							sipToMaximumAmt = dataSip.sipMaximumInstallmentAmount;
							sipToMultiplier = dataSip.sipMultiplierAmount;
							minToNoOfInstallments = dataSip.sipMinimumInstallmentNumbers;
							maxToNoOfInstallments = dataSip.sipMaximumInstallmentNumbers;
							loadInfoBox();
						}
					}
			    }
			} else {
				var serviceurl = "getPhysicalSchemeByUniqueNo/"+selectedValue+"/"+loginUser.bseAccessMode;
				getClientData("GET", "" , serviceurl, onSuccess);
			    function onSuccess(data) {
			    	$("#idToIsinNo").val(data.isin);
			    	$("#idToSchemeCode").val(data.schemeCode);
			    	
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
							sipToMinimumAmt = -1;
							sipToMaximumAmt = -1;
							sipToMultiplier = -1;
							$("#infoBox").attr("title", "Please select To Scheme Name ");
						} else {
							console.log(sipToMinimumAmt);
							console.log(sipToMaximumAmt);
							console.log(sipToMultiplier);
							sipToMinimumAmt = dataSip.sipMinimumInstallmentAmount;
							sipToMaximumAmt = dataSip.sipMaximumInstallmentAmount;
							sipToMultiplier = dataSip.sipMultiplierAmount;
							minToNoOfInstallments = dataSip.sipMinimumInstallmentNumbers;
							maxToNoOfInstallments = dataSip.sipMaximumInstallmentNumbers;
							loadInfoBox();
						}
					}
				
			    
			    }
			}
		}
	}
	
	
	
});

$('#idFrequencyType').change(function(){
	freqType = $('#idFrequencyType').val();
	
	// From Scheme Id
	var serviceUrlSip = "";
	if (loginUser.bseAccessMode == 1) {
		// Live mode
		serviceurlSip = "allSIPLiveRecords/"+$("#idFromSchemeId").val()+"/"+freqType;
	} else {
		// Demo Mode
		serviceurlSip = "allSIPRecords/"+$("#idFromSchemeId").val()+"/"+freqType;
	}
	getClientData("GET", "" , serviceurlSip, onSipSuccess);
	function onSipSuccess(dataSip) {
		if (dataSip.id == 0) {
			bootbox.alert("This Frequency Type is not allowed for 'From Scheme' ");
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
	
	// To Scheme Id 
	var serviceUrlSip = "";
	if (loginUser.bseAccessMode == 1) {
		// Live mode
		serviceurlSip = "allSIPLiveRecords/"+$("#idToSchemeCode").val()+"/"+freqType;
	} else {
		// Demo Mode
		serviceurlSip = "allSIPRecords/"+$("#idToSchemeCode").val()+"/"+freqType;
	}
	getClientData("GET", "" , serviceurlSip, onSipSuccess);
	function onSipSuccess(dataSip) {
		if (dataSip.id == 0) {
			bootbox.alert("This Frequency Type is not allowed for 'To Scheme' ");
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

$('#idSwitchAmount').blur(function(){
	var amount = $('#idSwitchAmount').val();
	
	if(sipFromMinimumAmt < sipToMinimumAmt){
		sipMinimumAmt = sipToMinimumAmt;
	} else {
		sipMinimumAmt = sipFromMinimumAmt;
	}
	
	if(sipFromMaximumAmt < sipToMaximumAmt){
		sipMaximumAmt = sipFromMaximumAmt;
	} else {
		sipMaximumAmt = sipToMaximumAmt;
	}
	
	if(sipFromMultiplier < sipToMultiplier){
		sipMultiplier = sipToMultiplier;
	} else {
		sipMultiplier = sipFromMultiplier;
	}
	
	
	if (!(amount == null || amount == "")) {
		
		if (sipMinimumAmt > -1 && sipMaximumAmt > -1 && sipMultiplier > -1) {
			if ((amount >= parseInt(sipMinimumAmt)) && (amount <= parseInt(sipMaximumAmt)) && ((amount%sipMultiplier) == 0)) {
//				bootbox.alert("Valid");
			} else {
				bootbox.alert("Invalid Installment Amount");
				$('#idSwitchAmount').val("");
			}	
		} else {
			bootbox.alert("Invalid Installment Amount");
			$('#idSwitchAmount').val("");
		}
		
	}
});

$('#idNoOfTransfers').blur(function(){
	var amount = $('#idNoOfTransfers').val();
	
	if(minFromNoOfInstallments < minToNoOfInstallments){
		minNoOfInstallments = minToNoOfInstallments;
	} else {
		minNoOfInstallments = minFromNoOfInstallments;
	}
	
	if(maxFromNoOfInstallments < maxToNoOfInstallments){
		maxNoOfInstallments = maxFromNoOfInstallments;
	} else {
		maxNoOfInstallments = maxToNoOfInstallments;
	}
	
	if (!(amount == null || amount == "")) {
		
		if (minNoOfInstallments > -1 && maxNoOfInstallments > -1) {
			if ((amount >= parseInt(minNoOfInstallments)) && (amount <= parseInt(maxNoOfInstallments))) {
//				bootbox.alert("Valid");
			} else {
				bootbox.alert("Invalid No Of Transfers");
				$('#idNoOfTransfers').val("");
			}	
		} else {
			bootbox.alert("Invalid No Of Transfers");
			$('#idNoOfTransfers').val("");
		}
	}
});



$('#idBuyNow').click(function(){
	
	if (validateSTPForm($('#idFormSTP'))){
	
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idFormSTP').serializeToJSON();
		formData["clientID"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorID"] = loggedUser.id;
		formData["purchaseMode"] = "B";
		var data = JSON.stringify(formData);
		saveData("POST", data, "registerAndSaveSTP", onAddSTPGeneralSuccess);
		//alert("STP: True");
		function onAddSTPGeneralSuccess(data) {
			bootbox.alert(data.message);
			$('#idFormSTP')[0].reset();
		}
	}
	
});
$('#idAddToCart').click(function(){
	
	if (validateSTPForm($('#idFormSTP'))){
		var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
		var formData = $('#idFormSTP').serializeToJSON();
		formData["clientID"] = selectedClientId;
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		formData["advisorID"] = loggedUser.id;
		formData["purchaseMode"] = "C";
		var data = JSON.stringify(formData);
		saveData("POST", data, "registerAndSaveSTP", onAddSTPGeneralSuccess);
		function onAddSTPGeneralSuccess(data) {
			bootbox.alert(data.message);
			$("#text").val(data.optionalParam);
			$('#idFormSTP')[0].reset();
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


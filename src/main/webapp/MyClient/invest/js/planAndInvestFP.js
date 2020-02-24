var selectedGoalIdForInvesting = -1;
var selectedClientId = -1;
var selectedClientCode = -1;
var selectedDate="NA";
var selectedDpMode = "NA";
$(document).ready(function() {
	
	
	jQuery.fn.popupwindow = function(p)
	
	{


		var profiles = p || {};

		return this.each(function(index){
			var settings, parameters, mysettings, b, a, winObj;
			
			// for overrideing the default settings
			mysettings = (jQuery(this).attr("rel") || "").split(",");

			
			settings = {
				height:600, // sets the height in pixels of the window.
				width:600, // sets the width in pixels of the window.
				toolbar:0, // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
				scrollbars:0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
				status:0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
				resizable:1, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
				left:0, // left position when the window appears.
				top:0, // top position when the window appears.
				center:0, // should we center the window? {1 (YES) or 0 (NO)}. overrides top and left
				createnew:1, // should we create a new window for each occurance {1 (YES) or 0 (NO)}.
				location:0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
				menubar:0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
				onUnload:null // function to call when the window is closed
			};

			// if mysettings length is 1 and not a value pair then assume it is a profile declaration
			// and see if the profile settings exists

			if(mysettings.length == 1 && mysettings[0].split(":").length == 1)
			{
				a = mysettings[0];
				// see if a profile has been defined
				if(typeof profiles[a] != "undefined")
				{
					settings = jQuery.extend(settings, profiles[a]);
				}
			}
			else
			{
				// overrides the settings with parameter passed in using the rel tag.
				for(var i=0; i < mysettings.length; i++)
				{
					b = mysettings[i].split(":");
					if(typeof settings[b[0]] != "undefined" && b.length == 2)
					{
						settings[b[0]] = b[1];
					}
				}
			}

			// center the window
			if (settings.center == 1)
			{
				settings.top = (screen.height-(settings.height + 110))/2;
				settings.left = (screen.width-settings.width)/2;
			}
			
			parameters = "location=" + settings.location + ",menubar=" + settings.menubar + ",height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars  + ",status=" + settings.status + ",resizable=" + settings.resizable + ",left=" + settings.left  + ",screenX=" + settings.left + ",top=" + settings.top  + ",screenY=" + settings.top;
			
			jQuery(this).bind("click", function(){
				var name = settings.createnew ? "PopUpWindow" + index : "PopUpWindow";
				winObj = window.open(this.href, name, parameters);
			
				
				if (settings.onUnload) {
					// Incremental check for window status
					// Attaching directly to window.onunlaod event causes invoke when document within window is reloaded
					// (i.e. an inner refresh)
					unloadInterval = setInterval(function() {
						if (!winObj || winObj.closed) {
							clearInterval(unloadInterval);	
							settings.onUnload.call($(this));
						}
					},500);
				}
				
				winObj.focus();
				
				return false;
			});
		});

	};
		var profiles =
		{

			window800:
			{
				height:800,
				width:1250,
				status:1
			}

				};

		function unloadcallback(){
			alert("unloaded");
		};


	   	$(function()
		{
		
	   		$(".popupwindow").popupwindow(profiles);
	   	});		   
			
	      
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
	   	    
	   		var serviceurlForLoadingGoals = "clientGoalList/"+selectedClientId;
	   		getClientData("GET", "" , serviceurlForLoadingGoals, onSuccessGoalList);
	   		function onSuccessGoalList(data) {
	   			holdingDrop = $("#idGoalList");
	   			holdingDrop.find('option').remove();
	   			holdingDrop.append('<option value="">Select Goal Description</option>');
	   			holdingDrop.append('<option value= "0">Contingency</option>');
	   			$.each(data, function (index, value) {
	   				holdingDrop.append('<option value="' + value.id + '">' + value.description + '</option>');
	   			});
	   		}
	   		var goalId = sessionStorage.getItem("SELECTED_GOAL_FOR_INVEST");
//	   		alert(goalId);
	   		if (goalId != null) {
	   			$("#idGoalList").val(parseInt(goalId));
	   			selectedGoalIdForInvesting = goalId;
//	   			$("#idGoalList").prop('disabled', true);
	   		}
	   		var investDate = sessionStorage.getItem("INVEST_DATE");
	   		if (investDate != null) {
	   			selectedDate = investDate.replace(/\//g, "");
	   		}
});	

function roundUpNumber(no){
	var number = no;
	var res = (Math.round(number / 1) * 1);
	//alert(number + "=" + res);
	
	number = res;
	
	res = Math.round(number / 10) * 10;
	return res;
}


$('#idViewInvestment').click(function(e){
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	if (selectedClientCode == -1) {
		bootbox.alert("Please select UCC");
	}  else if (selectedGoalIdForInvesting == -1) {
		bootbox.alert("Please select a Goal");
	}	else {
		var serviceurlForLoadingSavedReco = "getLastSavedProductReco/"+loggedUser.id+"/" + selectedClientId + "/" + selectedGoalIdForInvesting + "/FPGE/" + selectedDate;
		if (selectedGoalIdForInvesting == "0") {
			serviceurlForLoadingSavedReco = "getLastSavedProductRecoPM/"+loggedUser.id+"/" + selectedClientId + "/" + selectedDate + "/FP";
		}
		getClientData("GET", "" , serviceurlForLoadingSavedReco, onSuccessGoalList);
		$("#idTBodyPlanAndInvest").empty();
		var tableString = "";
		function onSuccessGoalList(data) {
//			alert(data.length);
			
			var rowCount = 0;
			tableString = tableString + '<tr><td colspan = "13"><span class="formentry-errmsg" id="alertForm"></span></td></tr>';
			$.each(data, function (index, value) {
				var loopLength = value.productName.length;
				for (var loopIndex = 0; loopIndex < loopLength; loopIndex ++) {
					var colCount = 0;
					if (value.lumpsumAmt[loopIndex] != 0 || value.sipAmount[loopIndex] != 0) {
						tableString = tableString + '<tr>' + 
	        			'<td id = "idProductName'+ rowCount + (colCount++) +'">' + value.productName[loopIndex] +  '</td>' +
	        			'<td style="display:none;" id = "idIsin'+ rowCount + (colCount++) +'">' + value.productIsin[loopIndex] +  '</td>' ;
	        			if (selectedDpMode == "true") {
							tableString = tableString + '<td><select style="padding-top: 2px;width:110px" class="form-control input-width-medium" id="idTransMode'+ rowCount + (colCount++) + '" tabindex="430"><option value="">Select</option><option value="P">Physical</option></select></td>';

						} else if (selectedDpMode == "false") {
							tableString = tableString +	'<td><select style="padding-top: 2px;width:110px" class="form-control input-width-medium" id="idTransMode'+ rowCount + (colCount++) + '" tabindex="430"><option value="">Select</option><option value="N">NSDL Demat</option><option value="C">CDSL Demat</option></select></td>';

						}	
	        			tableString = tableString + '<td><select style="padding-top: 2px;width:110px" class="form-control" id="idModeOfInvestMent'+ rowCount + (colCount++) + '" name="modeOfInvestment">';
						if (value.lumpsumAmt[loopIndex] == 0) {
							tableString = tableString + '<option value="">Select</option><option value="1">Lumpsum</option><option value="2" selected>SIP</option></select></td>';
						} else if (value.sipAmount[loopIndex] == 0) {
							tableString = tableString + '<option value="">Select</option><option value="1" selected>Lumpsum</option><option value="2">SIP</option></select></td>';
						} else {
							tableString = tableString + '<option value="">Select</option><option value="1">Lumpsum</option><option value="2">SIP</option></select></td>';

						}
						var roundedLumpsum = 0;
						var roundedSip = 0;
						if(value.lumpsumAmt[loopIndex] > 0){
							roundedLumpsum = roundUpNumber(value.lumpsumAmt[loopIndex]);
						}
						if(value.sipAmount[loopIndex] > 0){
							roundedSip = roundUpNumber(value.sipAmount[loopIndex]);
						}
						tableString = tableString + '<td><input type = "text" value = "' + roundedLumpsum +  '" id="idLumpsumAmt'+ rowCount + (colCount++) + '" style="width:109px;"></td>' +
	        			'<td><input type = "text" value = "' + roundedSip +  '" id="idSipAmt'+ rowCount + (colCount++) + '" style="width:109px;"></td>' +
	        			'<td><select style="padding-top: 2px;width:135px" class="form-control input-width-medium" id="idSIPFrequency'+ rowCount + (colCount++) + '" name="sipFrequency">' + 
	        			'<option value="">Select</option><option value="MONTHLY" selected>MONTHLY</option><option value="WEEKLY">WEEKLY</option>'+
	    				'<option value="QUARTERLY">QUARTERLY</option></select></td>' +
	        			'<td><input type = "text" value = "' + value.sipTennure[loopIndex] +  '" id="idSipTenure'+ rowCount + (colCount++) + '" style="width:109px;"></td>' +
	        			
						'<td><select style="padding-top: 2px;width:120px;" class="form-control input-width-medium" id="idRegType'+ rowCount + (colCount++) + '" name="registrationType" tabindex="430">'+
						'<option value="">Select</option><option value="X">XSIP</option><option value="I">ISIP</option></select></td>' +
	        			'<td><input type="text" style="padding-top: 2px;width:133px;" class="form-control input-width-medium" id="idMandateId'+ rowCount + (colCount++) + '" name="mandateId" tabindex="430"></td>' +
	        			'<td><select style="padding-top: 2px;width:94px;" class="form-control input-width-medium" id="idOrderFlag'+ rowCount + (colCount++) + '" name="orderFlag" tabindex="430">' + 
	        			'<option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></select></td>' +
	        			'<td><span class="form-static-value"><p style="width:142px" class="input-group input-width-medium"><input type="text" class="form-control" id="idStartDate'+ rowCount + (colCount++) + '" name="StartDate" placeholder="DD/MM/YYYY" tabindex="330"><span class="input-group-btn datepicker-icon"><button type="button" class="btn btn-default calendar-icon-container" data-toggle="tooltip" data-placement="top" title="Select Start Date"><em class="glyphicon calendar-icon-theme"></em></button></span></p></span></td>' +
	        			'<td><input type="checkbox" id = "idCheckbox'+ rowCount + (colCount++) +'" class="form-control"  style="width:1em"/></td>' +
	        			'<td id = "idOrderStatus'+ rowCount + (colCount++) +'" style="width:96px;">Order Not Placed</td>' +
	        			'</tr>';
						rowCount ++;

					}
					
				}
			});
			$("#idTBodyPlanAndInvest").append(tableString);
			var tbl2 = $('#idInvestTable tr').each(function(i) {
				$(".datepicker-icon").on("click", function () {
					$(this).closest(".input-group").find("input").trigger("focus");
				});
				$("#idStartDate"+i+"11").datepicker({
					format : "dd/mm/yyyy",
			        todayHighlight : false,
			        todayBtn : true,
			        autoclose : true,
			        forceParse: false,
			        startDate : new Date(Date.now())
			    });
				var selectedValue = $("#idModeOfInvestMent"+i+"3").val();
				if (selectedValue == "1") {
					// disable all sip fields
					$("#idSipAmt"+i+"5").prop('disabled', true);
					$("#idSIPFrequency"+i+"6").prop('disabled', true);
					$("#idSipTenure"+i+"7").prop('disabled', true);
					$("#idRegType"+i+"8").prop('disabled', true);
					$("#idMandateId"+i+"9").prop('disabled', true);
					$("#idOrderFlag"+i+"10").prop('disabled', true);
					$("#idStartDate"+i+"11").prop('disabled', true);
					$("#idLumpsumAmt"+i+"4").prop('disabled', false);
					
				} else if (selectedValue == "2"){
					// disable all lumpsum fields
					$("#idSipAmt"+i+"5").prop('disabled', false);
					$("#idSIPFrequency"+i+"6").prop('disabled', false);
					$("#idSipTenure"+i+"7").prop('disabled', false);
					$("#idRegType"+i+"8").prop('disabled', false);
					$("#idMandateId"+i+"9").prop('disabled', false);
					$("#idOrderFlag"+i+"10").prop('disabled', false);
					$("#idStartDate"+i+"11").prop('disabled', false);
					$("#idLumpsumAmt"+i+"4").prop('disabled', true);
					
					// 
					
				}
				$("#idModeOfInvestMent"+i+"3").change(function(e){
					// Your event handler
					var selectedValue = $("#idModeOfInvestMent"+i+"3").val();
					console.log("selectedValue" + selectedValue);
					if (selectedValue == "1") {
						// disable all sip fields
						$("#idSipAmt"+i+"5").prop('disabled', true);
						$("#idSIPFrequency"+i+"6").prop('disabled', true);
						$("#idSipTenure"+i+"7").prop('disabled', true);
						$("#idRegType"+i+"8").prop('disabled', true);
						$("#idMandateId"+i+"9").prop('disabled', true);
						$("#idOrderFlag"+i+"10").prop('disabled', true);
						$("#idStartDate"+i+"11").prop('disabled', true);
						$("#idLumpsumAmt"+i+"4").prop('disabled', false);
						
					} else if (selectedValue == "2"){
						// disable all lumpsum fields
						$("#idSipAmt"+i+"5").prop('disabled', false);
						$("#idSIPFrequency"+i+"6").prop('disabled', false);
						$("#idSipTenure"+i+"7").prop('disabled', false);
						$("#idRegType"+i+"8").prop('disabled', false);
						$("#idMandateId"+i+"9").prop('disabled', false);
						$("#idOrderFlag"+i+"10").prop('disabled', false);
						$("#idStartDate"+i+"11").prop('disabled', false);
						$("#idLumpsumAmt"+i+"4").prop('disabled', true);
						
						// 
						
					}
					
				});
				
			});
			
		}
	}
});


$('#idInvestSecond').click( function() {
	selectedClientCode = $("#idClientUCCCombo").val();
	var toBeAddedFlag = 0;
	var errorFlag = 0;
	document.getElementById('alertForm').innerHTML="";
	
	var viewData = { 
		    invest : [] 
		};
	var rowCount = $('#idInvestTable tr').length;
	var tbl2 = $('#idInvestTable tr').each(function(i) {
		console.log(rowCount);
		//eliminate the header
		if (i < (rowCount-2)) {
			var jsonData = {};
			console.log(i);
			jsonData["rowCount"] = i;
			
			
			var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
			var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
			jsonData["clientID"] = selectedClientId;
			jsonData["advisorID"] = loggedUser.id;
			jsonData["clientCode"] = $("#idClientUCCCombo").val();
			
			// 
			var transModeCombo = document.getElementById("idTransMode"+i+"2");
			var modeOfInvestmentCombo = document.getElementById("idModeOfInvestMent"+i+"3");
			var lumpCombo = document.getElementById("idLumpsumAmt"+i+"4");
			var sipCombo = document.getElementById("idSipAmt"+i+"5");
			var sipFreqCombo = document.getElementById("idSIPFrequency"+i+"6");
			var sipTenureCombo = document.getElementById("idSipTenure"+i+"7");
			var regTypeCombo = document.getElementById("idRegType"+i+"8");
			var mandateIdVal = document.getElementById("idMandateId"+i+"9");
			var orderTypeCombo = document.getElementById("idOrderFlag"+i+"10");
			var startDateCombo = document.getElementById("idStartDate"+i+"11");
			
			if($("#idCheckbox"+i+"12").is(":checked")){
				
				toBeAddedFlag = 1;

				transModeCombo.style.border ="1px solid #ccc";
				modeOfInvestmentCombo.style.border ="1px solid #ccc";
				lumpCombo.style.border ="1px solid #ccc";
				sipCombo.style.border ="1px solid #ccc";
				sipTenureCombo.style.border ="1px solid #ccc";
				regTypeCombo.style.border ="1px solid #ccc";
				mandateIdVal.style.border ="1px solid #ccc";
				orderTypeCombo.style.border ="1px solid #ccc";
				startDateCombo.style.border ="1px solid #ccc";
				sipFreqCombo.style.border ="1px solid #ccc";

				
				
				var prodName = $("#idProductName"+i+"0").text();
				console.log(prodName);
				jsonData["productName"] = prodName;
				
				var isinName = $("#idIsin"+i+"1").text();
				console.log(isinName);
				jsonData["productIsin"] = isinName;
				
				var transMode = $("#idTransMode"+i+"2").val();
				console.log(transMode);
				jsonData["idTransMode"] = transMode;
				
				if (transMode == "") {
					transModeCombo.style.border = "2px solid red";
					errorFlag = 1;
				}
				
				var modeOfInvestment = $("#idModeOfInvestMent"+i+"3").val();
				console.log(modeOfInvestment);
				jsonData["modeOfInvestment"] = modeOfInvestment;
				
				if (modeOfInvestment == "") {
					modeOfInvestmentCombo.style.border = "2px solid red";
					errorFlag = 1;
				} else {
					if (modeOfInvestment == 1) {
						// for lumpsum
						var lumpsumAmt = $("#idLumpsumAmt"+i+"4").val();
						console.log(lumpsumAmt);
						jsonData["lumpsumAmt"] = lumpsumAmt;
						
						if (lumpsumAmt == 0) {
							lumpCombo.style.border = "2px solid red";
							errorFlag = 1;
						}
						
					} else if (modeOfInvestment == 2) {
						// for sip
						var sipAmt = $("#idSipAmt"+i+"5").val();
						console.log(sipAmt);
						jsonData["sipAmt"] = sipAmt;
						
						if (sipAmt == "" || parseInt(sipAmt) == 0) {
							errorFlag = 1;
							sipCombo.style.border = "2px solid red";
						}
						
						var sipFreq = $("#idSIPFrequency"+i+"6").val();
						console.log(sipFreq);
						jsonData["sipFreq"] = sipFreq;
						
						if (sipFreq == "") {
							errorFlag = 1;
							sipFreqCombo.style.border = "2px solid red";
						}
						var sipTenure = $("#idSipTenure"+i+"7").val();
						console.log(sipTenure);
						jsonData["sipTenure"] = sipTenure;
						if (sipTenure == 0) {
							errorFlag = 1;
							sipTenureCombo.style.border = "2px solid red";
						}
						
						var regType = $("#idRegType"+i+"8").val();
						console.log(regType);
						jsonData["regType"] = regType;
						if (regType == "") {
							errorFlag = 1;
							regTypeCombo.style.border = "2px solid red";
						}
						
						var mandateType = $("#idMandateId"+i+"9").val();
						console.log(mandateType);
						jsonData["mandateType"] = mandateType;
						
						if (mandateType == "") {
							errorFlag = 1;
							mandateIdVal.style.border = "2px solid red";
						}
						var orderType = $("#idOrderFlag"+i+"10").val();
						console.log(orderType);
						jsonData["orderType"] = orderType;
						
						if (regType == "") {
							errorFlag = 1;
							orderTypeCombo.style.border = "2px solid red";
						}
						
						var startDate = $("#idStartDate"+i+"11").val();
						console.log(startDate);
						jsonData["startDate"] = startDate;
						
						if (startDate == "") {
							errorFlag = 1;
							startDateCombo.style.border = "2px solid red";
						}
						
					}
					
				}
				var orderType = $("#idOrderStatus"+i+"13").text();
				console.log(orderType );
				jsonData["orderStatus"] = orderType;
				viewData.invest.push(jsonData);
			} else {
				transModeCombo.style.border ="1px solid #ccc";
				modeOfInvestmentCombo.style.border ="1px solid #ccc";
				lumpCombo.style.border ="1px solid #ccc";
				sipCombo.style.border ="1px solid #ccc";
				sipTenureCombo.style.border ="1px solid #ccc";
				regTypeCombo.style.border ="1px solid #ccc";
				mandateIdVal.style.border ="1px solid #ccc";
				orderTypeCombo.style.border ="1px solid #ccc";
				startDateCombo.style.border ="1px solid #ccc";
				sipFreqCombo.style.border ="1px solid #ccc";

			}
		}

	})
	var proceed = 1;
	if (errorFlag == 1) {
		proceed = 0;
		document.getElementById('alertForm').innerHTML="Please fill up the highlighted boxes";
		$('#idPopUpProduct').scrollTop(0);
	}
	if (toBeAddedFlag == 0) {
		proceed = 0;
		document.getElementById('alertForm').innerHTML="Please select at least one order to initiate transaction";
		$('#idPopUpProduct').scrollTop(0);
	}
	
	if (proceed == 1) {
		showProcessingLoaderOnSave("#idInvestSecond");
		window.setTimeout(function(){
			var data = JSON.stringify(viewData.invest);
			saveData("POST", data, "invest", onAddUCCGeneralSuccess);
		}, 3000);
		function onAddUCCGeneralSuccess(data) {
			$.each(data, function (index, value) {
				var rowCount = value.optionalParam;
				if(value.statusCode == 1) {
					$("#idOrderStatus"+rowCount+"13").html('<a title="'+value.message+'">Failed</a>');
				} else {
					$("#idOrderStatus"+rowCount+"13").html('<a title="'+value.message+'">Success</a>');

				}
			});
			hideProcessingLoaderOnSave("#idInvestSecond");
			$(window).scrollTop(0);
//			$('#idFormPlanAndInvestGP')[0].reset();
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
	$(btnID).html("Initiate Transaction(s)");
	//$("body").css("cursor", "default");
	$("#overlayLoading").css({'display':'none'});
}

$('#idGoalList').change(function(){ 
	var ddl = document.getElementById("idGoalList");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedGoalIdForInvesting = selectedValue;
	
});
$('#idClientUCCCombo').change(function(){ 
	var ddl = document.getElementById("idClientUCCCombo");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	selectedClientCode = selectedValue;
	var dpStatus = $("#idClientUCCCombo").find('option:selected').attr("name");
	selectedDpMode = dpStatus;
	
});
var modal = document.getElementById('idPopUpProduct');

// Get the button that opens the modal
var btn = document.getElementById("idViewInvestment");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
	if (selectedClientCode != -1 && selectedGoalIdForInvesting != -1) {
		 $(".onpopupscroller").css("overflow","hidden");
		 modal.style.display = "block";
	}
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    $(".onpopupscroller").css("overflow","visible");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
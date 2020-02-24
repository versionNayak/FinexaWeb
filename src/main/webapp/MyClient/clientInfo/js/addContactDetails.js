var contactID = 0;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var mode = sessionStorage.getItem("PAGE_MODE");
$(document).ready(function() {
	
	//new code for access rights
    var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
	if(loggedClient != null && loggedClient.role === "Client"){
		if(loggedClient.clientInfoAddEdit === "Y"){
			$("#idBtnAdd").show();
			$("#idSave").show();
			$("#idBtnReset").show();
			$("#idBtnMinus1").show();
			$("idBtnMinus1").show();
		}else if(loggedClient.clientInfoView === "Y"){
			$("#idBtnAdd").hide();
			$("#idSave").hide();
			$("#idBtnReset").hide();
			$("#idBtnMinus1").hide();
		}
	}else{
		if(loggedUser != null && loggedUser.role === "Admin"){
			$("#idBtnAdd").hide();
			$("#idSave").hide();
			$("#idBtnReset").hide();
			$("#idBtnMinus1").hide();
	    }else{
		if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
			$("#idBtnAdd").show();
			$("#idSave").show();
			$("#idBtnReset").show();
			$("#idBtnMinus1").show();
		}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
			$("#idBtnAdd").hide();
			$("#idSave").hide();
			$("#idBtnReset").hide();
			$("#idBtnMinus1").hide();
		}
	   }
	}
	if(mode=="ADD"){
	$("#idFM1StateText").show();
	$("#idFM2StateText").show();
	$("#idFM3StateText").show();
	$("#idFM1StateDrp").hide();
	$("#idFM2StateDrp").hide();
	$("#idFM3StateDrp").hide();
	}
//  alert("hiii ");
	$("#idEmailId").focus();
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");

	//var mode = getParameterByName("mode", url);
	
	
	//var mode="ADD";
//	alert("mode "+mode);
	
	
	populateCountryDrop($("#idAddress1Country"));
	populateCountryDrop($("#idAddress2Country"));
 	populateCountryDrop($("#idAddress3Country"));
 	populateStateDrop($("#idAddress1StateDrp"));
 	populateStateDrop($("#idAddress2StateDrp"));
 	populateStateDrop($("#idAddress3StateDrp"));
 	//country();

	if (mode=="ADD"){
		var x = parseInt($("#idNoOfClicks").val(),10);
		if(x==1){
	 	 	//	alert("x "+x);
	 	 		$("#idBtnMinus1").attr('disabled',true);
	 	 	}
		$("#idDivAddress2").hide();
		$("#idDivAddress3").hide();	   
	 		
	}
	else{
		if (mode=="EDIT"){
			getSelectedContact();
		console.log("Adding contacts:24");
	}
	console.log("Adding contacts");
	}
	
});

$('#focusguard-2').on('focus', function() {
	// "last" focus guard got focus: set focus to the first field
	$("#idEmailId").focus();
	$(window).scrollTop(0);
}); 

 	
	$("#idSave").on("click",	function (event) {
		var v=validateAddress(this.form);
	//	alert("v "+v);
		if (v){
			event.preventDefault();
			showLoaderOnSave("#idSave");
				//$(this).addClass('active');
			window.setTimeout(function(){
			console.log("add client save clicked");
			formData = $('#clientContact').serializeToJSON();
			formData["userId"]=loggedUser.id;
		//	formData["clientId"] = selected_clientId;

			var pAddressLine1 = "";
			var pAddressLine2 = "";
			var pAddressLine3 = "";
			var pCity = "";
			var pState = "";
			var pPincode = "";
			var pCountry = "";

			var oAddressLine1 = "";
			var oAddressLine2 = "";
			var oAddressLine3 = "";
			var oCity = "";
			var oState = "";
			var oPincode = "";
			var oCountry = "";
			
			var cAddressLine1 = "";
			var cAddressLine2 = "";
			var cAddressLine3 = "";
			var cCity = "";
			var cState = "";
			var cPincode = "";
			var cCountry = "";
			
			if ($("#idChkAddress1TypeOffice").prop("checked") == true){
				oAddressLine1 = $("#idAddress1Line1").val();
				oAddressLine2 = $("#idAddress1Line2").val();;
				oAddressLine3 = $("#idAddress1Line3").val();;
				oCountry = $("#idAddress1Country").val();;		
				oCity = $("#idAddress1City").val();;
				if(oCountry=="99"){
					oState = $("#idAddress1StateDrp").val();	
					}else{
					oState = $("#idAddress1State").val();
					}
				oPincode = $("#idAddress1Pincode").val();;
						
			}
			
				if ($("#idChkAddress1TypePermanent").prop("checked") == true){
					pAddressLine1 = $("#idAddress1Line1").val();
					pAddressLine2 = $("#idAddress1Line2").val();;
					pAddressLine3 = $("#idAddress1Line3").val();;
					pCountry = $("#idAddress1Country").val();;		
					pCity = $("#idAddress1City").val();;
					if(pCountry=="99"){
						pState = $("#idAddress1StateDrp").val();	
						}else{
						pState = $("#idAddress1State").val();
						}
					pPincode = $("#idAddress1Pincode").val();;
								
				}
				
					if ($("#idChkAddress1TypeCorrespondence").prop("checked") == true){
						cAddressLine1 = $("#idAddress1Line1").val();
						cAddressLine2 = $("#idAddress1Line2").val();;
						cAddressLine3 = $("#idAddress1Line3").val();;
						cCountry = $("#idAddress1Country").val();;
						cCity = $("#idAddress1City").val();;
						if(cCountry=="99"){
							cState = $("#idAddress1StateDrp").val();	
							}else{
							cState = $("#idAddress1State").val();
							}
						cPincode = $("#idAddress1Pincode").val();;
						
					}
				
			
			
			if ($("#idChkAddress2TypeOffice").prop("checked") == true){
				oAddressLine1 = $("#idAddress2Line1").val();
				oAddressLine2 = $("#idAddress2Line2").val();;
				oAddressLine3 = $("#idAddress2Line3").val();;
				oCountry = $("#idAddress2Country").val();;			
				oCity = $("#idAddress2City").val();;
				if(oCountry=="99"){
					oState = $("#idAddress2StateDrp").val();	
					}else{
					oState = $("#idAddress2State").val();
					}
				oPincode = $("#idAddress2Pincode").val();;
					
			}
			
				if ($("#idChkAddress2TypePermanent").prop("checked") == true){
					pAddressLine1 = $("#idAddress2Line1").val();
					pAddressLine2 = $("#idAddress2Line2").val();;
					pAddressLine3 = $("#idAddress2Line3").val();;
					pCountry = $("#idAddress2Country").val();;		
					pCity = $("#idAddress2City").val();;
					if(pCountry=="99"){
						pState = $("#idAddress2StateDrp").val();	
						}else{
						pState = $("#idAddress2State").val();
						}
					pPincode = $("#idAddress2Pincode").val();;
											
				}
				
					if ($("#idChkAddress2TypeCorrespondence").prop("checked") == true){
						cAddressLine1 = $("#idAddress2Line1").val();
						cAddressLine2 = $("#idAddress2Line2").val();;
						cAddressLine3 = $("#idAddress2Line3").val();;
						cCountry = $("#idAddress2Country").val();;
						cCity = $("#idAddress2City").val();;
						if(cCountry=="99"){
							cState = $("#idAddress2StateDrp").val();	
							}else{
							cState = $("#idAddress2State").val();
							}
						cPincode = $("#idAddress2Pincode").val();;
					}
				
			

			if ($("#idChkAddress3TypeOffice").prop("checked") == true){
				oAddressLine1 = $("#idAddress3Line1").val();
				oAddressLine2 = $("#idAddress3Line2").val();;
				oAddressLine3 = $("#idAddress3Line3").val();;
				oCountry = $("#idAddress3Country").val();;			
				oCity = $("#idAddress3City").val();;
				if(oCountry=="99"){
					oState = $("#idAddress3StateDrp").val();	
					}else{
					oState = $("#idAddress3State").val();
					}
				oPincode = $("#idAddress3Pincode").val();;	
			}
			
				if ($("#idChkAddress3TypePermanent").prop("checked") == true){
					pAddressLine1 = $("#idAddress3Line1").val();
					pAddressLine2 = $("#idAddress3Line2").val();;
					pAddressLine3 = $("#idAddress3Line3").val();;
					pCountry = $("#idAddress3Country").val();;		
					pCity = $("#idAddress3City").val();;
					if(pCountry=="99"){
						pState = $("#idAddress3StateDrp").val();	
						}else{
						pState = $("#idAddress3State").val();
						}
					pPincode = $("#idAddress3Pincode").val();;				
				}
				
					if ($("#idChkAddress3TypeCorrespondence").prop("checked") == true){
						cAddressLine1 = $("#idAddress3Line1").val();
						cAddressLine2 = $("#idAddress3Line2").val();;
						cAddressLine3 = $("#idAddress3Line3").val();;
						cCountry = $("#idAddress3Country").val();;
						cCity = $("#idAddress3City").val();;
						if(cCountry=="99"){
							cState = $("#idAddress3StateDrp").val();	
							}else{
							cState = $("#idAddress3State").val();
							}
						cPincode = $("#idAddress3Pincode").val();;
					}
				
		

			formData["officeAddressLine1"]=oAddressLine1;
			formData["officeAddressLine2"]=oAddressLine2;
			formData["officeAddressLine3"]=oAddressLine3;
			formData["lookupOfficeCountryId"]=oCountry;
			formData["officeCity"]=oCity;
			if(oCountry=="99"){
				formData["address1DropId"]=oState;	
				}else{
				formData["officeState"]=oState;	
				}
				formData["officePincode"]=oPincode;
				
				
			formData["permanentAddressLine1"]=pAddressLine1;
			formData["permanentAddressLine2"]=pAddressLine2;
			formData["permanentAddressLine3"]=pAddressLine3;
			formData["lookupPermanentCountryId"]=pCountry;
			formData["permanentCity"]=pCity;
			if(pCountry=="99"){
				formData["address2DropId"]=pState;	
				}else{
				formData["permanentState"]=pState;	
				}
			formData["permanentPincode"]=pPincode;
			

			formData["correspondenceAddressLine1"]=cAddressLine1;
			formData["correspondenceAddressLine2"]=cAddressLine2;
			formData["correspondenceAddressLine3"]=cAddressLine3;
			formData["lookupCorrespondenceCountryId"]=cCountry;
			formData["correspondenceCity"]=cCity;
			if(cCountry=="99"){
				formData["address3DropId"]=cState;	
				}else{
				formData["correspondenceState"]=cState;	
				}
			formData["correspondencePincode"]=cPincode;
			
			var data = JSON.stringify(formData);
			console.log(data);
			//alert(data);
			sessionStorage.setItem("CLIENT_CONTACT_INFO", data);

			
/*  			$("#idClient").load("clientInfo/addFamilyinfo.html");
			$(".dashboardheading").html("Add Client Family Info ");
 */ 			
			 var mode = sessionStorage.getItem("PAGE_MODE");
 			if (mode=="EDIT"){
 				console.log("Before Post: " + data);
 				event.preventDefault();
 				formData["userId"] = loggedUser.id;
 				console.log("Before Post2: ");
 				var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
 				formData["clientId"] = selectedClientId;
 				formData["id"] = contactID;
 				console.log("Before Post3: ");
 				data = JSON.stringify(formData);
 				console.log("Before Post4: ");
 				
 				//getClientDataWithErrorHandling("POST", data, "updateClientContactInfo", onSuccess,onError);
 				//saveData("POST", data, "updateClientContactInfo", onSuccess);
 				saveData("POST", data, "updateClientContactInfo/" + loggedUser.id, onSuccess);
 				function onSuccess(data) {
 					hideLoaderOnSave("#idSave");
 					console.log("After Post: " + data);
 					sessionStorage.setItem("SELECTED_CLIENT_ID", data.clientId);
 					sessionStorage.setItem("PAGE_MODE", "EDIT");
 					editPage("clientInfo/addClient.html","Edit Client Personal Info ");

 				}
 				/*function onError(err){
 				    $("#alertform").text("Error saving client contact information. Please try after sometime or contact system administrator.");
 					$(window).scrollTop(0);
 					hideLoaderOnSave("#idSave");
 				}*/
 			
 			}
 			else{
 			
 			
 				sessionStorage.setItem("FAMILY_ADD_CLIENT", "YES");
 				sessionStorage.setItem("PAGE_MODE", "ADD");
 			
 			//	addPage("clientInfo/addFamilyInfo.html","Add Client Family Info ");
 				    
 				    var heading="Add Client Family Info ";
 				    var path="clientInfo/addFamilyInfo.html ";
 	                $("#idClient").empty();
 	                hideLoaderOnSave("#idSave");
 					$("#idClient").load(path);
 					$("#addRecord").addClass('btn_Disabled');
 	                $('#editRecord').hide();
 	                $('#deleteRecord').hide();
 	                $(".dashboardheading    ").html(heading);
 	        		$("#mandatory-field-msg").show();	
 			}
		 }, 5000);	
		}
		
	});


/* 	$("#idDivAddress2").hide();
	$("#idDivAddress3").hide();	   
 	$("#idBtnMinus").attr('disabled',true);
 */ 

$("#idBtnAdd").click(function() {
	 var x = parseInt($("#idNoOfClicks").val(),10);
	// alert("x before: " + $("#idNoOfClicks").val());
	 if (x==1){
		 initialize();
		 div3Clear();
		 div2Clear();
		 div1Clear();
		 
		 if ($("#idChkAddress1TypeOffice").prop("checked") == true){
			 $("#idChkAddress2TypeOffice").prop("disabled", true);
		 }
		 if ($("#idChkAddress1TypePermanent").prop("checked") == true){
			 $("#idChkAddress2TypePermanent").prop("disabled", true);
		 }
		 if ($("#idChkAddress1TypeCorrespondence").prop("checked") == true){
			 $("#idChkAddress2TypeCorrespondence").prop("disabled", true);
		 }
		 if($('#idDivAddress1').is(':hidden')){
			 console.log("div1 hidden");
		 	 $("#idDivAddress1").show();
		}else{
		 if($('#idDivAddress2').is(':hidden')){
			 console.log("div2 hidden");
	 	 $("#idDivAddress2").show();
		 }
		 else{
		if($('#idDivAddress3').is(':hidden')){
			 console.log("div3 hidden");
		 $("#idDivAddress3").show();
			}
		 }
		}
	 	$("#idBtnMinus1").attr('disabled',false);
	 	$("#idBtnMinus2").attr('disabled',false);
	 	$("#idBtnMinus3").attr('disabled',false);
	 }
	 if (x==2){
		 initialize();	 
		 div3Clear();
		 div2Clear();
		 div1Clear();
		 
		 if ($("#idChkAddress1TypeOffice").prop("checked") == true || $("#idChkAddress2TypeOffice").prop("checked") == true){
			 $("#idChkAddress3TypeOffice").prop("disabled", true);
		 }
		 if ($("#idChkAddress1TypePermanent").prop("checked") == true || $("#idChkAddress2TypePermanent").prop("checked") == true){
			 $("#idChkAddress3TypePermanent").prop("disabled", true);
		 }
		 if ($("#idChkAddress1TypeCorrespondence").prop("checked") == true || $("#idChkAddress2TypeCorrespondence").prop("checked") == true){
			 $("#idChkAddress3TypeCorrespondence").prop("disabled", true);
		 }
		 if($('#idDivAddress1').is(':hidden')){
			 console.log("div1 hidden");
		 	 $("#idDivAddress1").show();
		}else{
		 if($('#idDivAddress2').is(':hidden')){
			 console.log("div2 hidden");
	 	 $("#idDivAddress2").show();
		 }
		 else{
		if($('#idDivAddress3').is(':hidden')){
			 console.log("div3 hidden");
		 $("#idDivAddress3").show();
			}
		 }
		}
		 $("#idBtnAdd").attr('disabled',true);
		    $("#idBtnMinus1").attr('disabled',false);
		 	$("#idBtnMinus2").attr('disabled',false);
		 	$("#idBtnMinus3").attr('disabled',false);
	 }
	 $("#idNoOfClicks").val(x+1);
	// alert("x after: " + $("#idNoOfClicks").val());
	 //alert("Add clicks: "+ $("#idNoOfClicks").val());
}); 


function  DivClear3All(){
	
	
	 lAddress3Line1=document.getElementById("idAddress3Line1");
	 lAddress3City=document.getElementById("idAddress3City");
	 lAddress3State=document.getElementById("idAddress3State");
	 lAddress3Pincode=document.getElementById("idAddress3Pincode");
	 
	 
	lAddress3Line1.style.border = "1px solid #ccc";
	lAddress3City.style.border = "1px solid #ccc";
	lAddress3State.style.border = "1px solid #ccc";
	lAddress3Pincode.style.border = "1px solid #ccc";
	lAddress3Country.style.border = "1px solid #ccc";
	
	document.getElementById('alertaddress3line1').innerHTML="";
	document.getElementById('alertaddress3city').innerHTML="";
	document.getElementById('alertaddress3pincode').innerHTML="";
	document.getElementById('alertaddress3state').innerHTML="";
	document.getElementById('alertaddress3country').innerHTML="";
	document.getElementById('alertaddress3type').innerHTML="";
}
    $("#idBtnMinus3").click(function() {
    	 bootbox.confirm({
    		 title: "Delete Address",
 	    	   message: "Are you sure you want to delete this address.",
			    	callback: function (result) {
			    		 if (result === true) {
			    				$("#idDivAddress3").hide();
			    			 	
			    			 	 initialize();	 
			    			 	 DivClear3All();
			    			 	 
			    			 	$("#idBtnAdd").attr('disabled',false);
			    			 	$("#idAddress3Line1").val("");
			    			 	$("#idAddress3Line2").val("");
			    			 	$("#idAddress3Line3").val("");
			    			 	$("#idAddress3City").val("");
			    			 	$("#idAddress3State").val("");
			    			 	$("#idAddress3Pincode").val("");
			    			 	$("#idAddress3Country").val("");
			    			 	$("#idChkAddress3TypeOffice").prop("checked", false);
			    			 	$("#idChkAddress3TypePermanent").prop("checked", false);
			    			 	$("#idChkAddress3TypeCorrespondence").prop("checked", false);
			    				if ($("#idChkAddress1TypeOffice").prop("checked") == true || $("#idChkAddress2TypeOffice").prop("checked") == true){
			    					//alert("Set office checked to Y");
			    					$("#idOfficeChecked").val("Y");
			    				}
			    				else{
			    					//alert("Set office checked to N");
			    					$("#idOfficeChecked").val("N");
			    				}

			    				if ($("#idChkAddress1TypePermanent").prop("checked") == true || $("#idChkAddress2TypePermanent").prop("checked") == true){
			    					$("#idPermanentChecked").val("Y");
			    				}
			    				else{
			    					$("#idPermanentChecked").val("N");
			    				}

			    				if ($("#idChkAddress1TypeCorrespondence").prop("checked") == true || $("#idChkAddress2TypeCorrespondence").prop("checked") == true){
			    					$("#idCorrespondenceChecked").val("Y");
			    				}
			    				else{
			    					$("#idCorrespondenceChecked").val("N");
			    				}
			    				if ($("#idOfficeChecked").val() == "N" || $("#idPermanentChecked").val() == "N" || $("#idCorrespondenceChecked").val() =="N"){
			    				 	$("#idBtnAdd").attr('disabled',false);
			    				}
			    				else{
			    				//	$("#idBtnAdd").attr('disabled',true);
			    				}
			    				if ($("#idOfficeChecked").val() == "N"){
			    					//alert("Office not checked");
			    					$("#idChkAddress1TypeOffice").prop("disabled", false);
			    					$("#idChkAddress2TypeOffice").prop("disabled", false);
			    				}
			    				if ($("#idPermanentChecked").val() == "N"){
			    					$("#idChkAddress1TypePermanent").prop("disabled", false);
			    					$("#idChkAddress2TypePermanent").prop("disabled", false);
			    				}
			    				if ($("#idCorrespondenceChecked").val() == "N"){
			    					$("#idChkAddress1TypeCorrespondence").prop("disabled", false);
			    					$("#idChkAddress2TypeCorrespondence").prop("disabled", false);
			    				}
			    			 
			    			
			    				 var x = parseInt($("#idNoOfClicks").val(),10);
			    				// alert("x before: " + $("#idNoOfClicks").val());
			    				
			    				 if(x==2){
			    					 $("#idBtnMinus2").attr('disabled',true); 
			    					 $("#idBtnMinus1").attr('disabled',true); 
			    				 }
			    				 if(x!=1){
			    					 x=x-1;
			    					 $("#idNoOfClicks").val(x);
			    					 }
			 			}
   	 				else{
    					//alert(false);
    					$("#show-me-two").show();
		 				$("#show-me").hide();	
		 				$("#idOptionT").prop("checked", true); 
   	 				}
	 				}	
       		});
	 
		// alert("x after: " + $("#idNoOfClicks").val());
}); 
$("#idBtnMinus2").click(function() {

	 bootbox.confirm({
		  title: "Delete Address",
	    	message: "Are you sure you want to delete this address.",
		    	callback: function (result) {
		    		 if (result === true) {
		    			 initialize();	 
		    				Div2ClearAll();
		    			 	$("#idDivAddress2").hide();
		    			 	$("#idBtnAdd").attr('disabled',false);
		    			 	$("#idAddress2Line1").val("");
		    			 	$("#idAddress2Line2").val("");
		    			 	$("#idAddress2Line3").val("");
		    			 	$("#idAddress2City").val("");
		    			 	$("#idAddress2State").val("");
		    			 	$("#idAddress2Pincode").val("");
		    			 	$("#idAddress2Country").val("");
		    			 	$("#idChkAddress2TypeOffice").prop("checked", false);
		    			 	$("#idChkAddress2TypePermanent").prop("checked", false);
		    			 	$("#idChkAddress2TypeCorrespondence").prop("checked", false);
		    				if ($("#idChkAddress1TypeOffice").prop("checked") == true || $("#idChkAddress3TypeOffice").prop("checked") == true){
		    					//alert("Set office checked to Y");
		    					$("#idOfficeChecked").val("Y");
		    				}
		    				else{
		    					//alert("Set office checked to N");
		    					$("#idOfficeChecked").val("N");
		    				}

		    				if ($("#idChkAddress1TypePermanent").prop("checked") == true || $("#idChkAddress3TypePermanent").prop("checked") == true){
		    					$("#idPermanentChecked").val("Y");
		    				}
		    				else{
		    					$("#idPermanentChecked").val("N");
		    				}

		    				if ($("#idChkAddress1TypeCorrespondence").prop("checked") == true || $("#idChkAddress3TypeCorrespondence").prop("checked") == true){
		    					$("#idCorrespondenceChecked").val("Y");
		    				}
		    				else{
		    					$("#idCorrespondenceChecked").val("N");
		    				}
		    				if ($("#idOfficeChecked").val() == "N" || $("#idPermanentChecked").val() == "N" || $("#idCorrespondenceChecked").val() =="N"){
		    				 	$("#idBtnAdd").attr('disabled',false);
		    				}
		    				else{
		    				//	$("#idBtnAdd").attr('disabled',true);
		    				}
		    				if ($("#idOfficeChecked").val() == "N"){
		    					//alert("Office not checked");
		    					$("#idChkAddress1TypeOffice").prop("disabled", false);
		    					$("#idChkAddress3TypeOffice").prop("disabled", false);
		    				}
		    				if ($("#idPermanentChecked").val() == "N"){
		    					$("#idChkAddress1TypePermanent").prop("disabled", false);
		    					$("#idChkAddress3TypePermanent").prop("disabled", false);
		    				}
		    				if ($("#idCorrespondenceChecked").val() == "N"){
		    					$("#idChkAddress1TypeCorrespondence").prop("disabled", false);
		    					$("#idChkAddress3TypeCorrespondence").prop("disabled", false);
		    				}
		    				
		    				var x = parseInt($("#idNoOfClicks").val(),10);
		    				// alert("x before: " + $("#idNoOfClicks").val());
		    				 

		    				 if(x==2){
		    					 $("#idBtnMinus3").attr('disabled',true); 
		    					 $("#idBtnMinus1").attr('disabled',true); 
		    				 }
		    				 if(x!=1){
		    					 x=x-1;
		    					 $("#idNoOfClicks").val(x);
		    					 }
		 			}
	 				else{
					
	 				}
				}	
   		});
}); 

$("#idBtnMinus1").click(function() {
	 bootbox.confirm({
		  title: "Delete Address",
	    	message: "Are you sure you want to delete this address",
		    	callback: function (result) {
		    		 if (result === true) {
		    				initialize();	 
		    				Div1ClearAll();
		    			 	$("#idDivAddress1").hide();
		    			 	$("#idBtnAdd").attr('disabled',false);
		    			 	$("#idAddress1Line1").val("");
		    			 	$("#idAddress1Line2").val("");
		    			 	$("#idAddress1Line3").val("");
		    			 	$("#idAddress1City").val("");
		    			 	$("#idAddress1State").val("");
		    			 	$("#idAddress1Pincode").val("");
		    			 	$("#idAddress1Country").val("");
		    			 	$("#idChkAddress1TypeOffice").prop("checked", false);
		    			 	$("#idChkAddress1TypePermanent").prop("checked", false);
		    			 	$("#idChkAddress1TypeCorrespondence").prop("checked", false);
		    				if ($("#idChkAddress2TypeOffice").prop("checked") == true || $("#idChkAddress3TypeOffice").prop("checked") == true){
		    					//alert("Set office checked to Y");
		    					$("#idOfficeChecked").val("Y");
		    				}
		    				else{
		    					//alert("Set office checked to N");
		    					$("#idOfficeChecked").val("N");
		    				}

		    				if ($("#idChkAddress2TypePermanent").prop("checked") == true || $("#idChkAddress3TypePermanent").prop("checked") == true){
		    					$("#idPermanentChecked").val("Y");
		    				}
		    				else{
		    					$("#idPermanentChecked").val("N");
		    				}

		    				if ($("#idChkAddress2TypeCorrespondence").prop("checked") == true || $("#idChkAddress3TypeCorrespondence").prop("checked") == true){
		    					$("#idCorrespondenceChecked").val("Y");
		    				}
		    				else{
		    					$("#idCorrespondenceChecked").val("N");
		    				}
		    				if ($("#idOfficeChecked").val() == "N" || $("#idPermanentChecked").val() == "N" || $("#idCorrespondenceChecked").val() =="N"){
		    				 	$("#idBtnAdd").attr('disabled',false);
		    				}
		    				else{
		    				//	$("#idBtnAdd").attr('disabled',true);
		    				}
		    				if ($("#idOfficeChecked").val() == "N"){
		    					//alert("Office not checked");
		    					$("#idChkAddress2TypeOffice").prop("disabled", false);
		    					$("#idChkAddress3TypeOffice").prop("disabled", false);
		    				}
		    				if ($("#idPermanentChecked").val() == "N"){
		    					$("#idChkAddress2TypePermanent").prop("disabled", false);
		    					$("#idChkAddress3TypePermanent").prop("disabled", false);
		    				}
		    				if ($("#idCorrespondenceChecked").val() == "N"){
		    					$("#idChkAddress2TypeCorrespondence").prop("disabled", false);
		    					$("#idChkAddress3TypeCorrespondence").prop("disabled", false);
		    				}
		    				
		    				var x = parseInt($("#idNoOfClicks").val(),10);
		    				// alert("x before: " + $("#idNoOfClicks").val());
		    				 
		    				 if(x==2){
		    					 $("#idBtnMinus3").attr('disabled',true); 
		    					 $("#idBtnMinus2").attr('disabled',true); 
		    				 }
		    				 if(x!=1){
		    					 x=x-1;
		    					 $("#idNoOfClicks").val(x);
		    					 }
		    				
		    				// alert("x after: " + $("#idNoOfClicks").val());
		 			}
	 				else{
					
	 				}
				}	
   		});
		


}); 
$('#idCountryCode').blur(function(event) {
		var countryCode = $(this).val();
     $('#idCountryCodePhone').val(countryCode);
     $('#idCountryCodeEmergencyContact').val(countryCode);
	});        	
 
function undoChange(){
	updateUNDO();
	$("#idFM1StateDrp").hide();
	$("#idFM2StateDrp").hide();
	$("#idFM3StateDrp").hide();
	if(mode=="EDIT"){
		getSelectedContact();
	}	
}

function updateUNDO(){
	
	    var lPhone;
		var lCountryCodeEmergencyContact;
		var lEmergencyContact;
		var lAlternateEmail;
		var lEmail;
		var lCountryCode ;
		var lMobile;
		
		var lAddress1Line1;
		var lAddress1Line2;
		var lAddress1Line3;
		var lAddress1City;
		var lAddress1State;
		var lAddress1Pincode;
		var lAddress1Country;

		
		var lAddress2Line1;
		var lAddress2Line2;
		var lAddress2Line3;
		var lAddress2City;
		var lAddress2State;
		var lAddress2Pincode;
		var lAddress2Country;
		var laddress2Type;
		
		var lAddress3Line1;
		var lAddress3Line2;
		var lAddress3Line3;
		var lAddress3City;
		var lAddress3State;
		var lAddress3Pincode;
		var lAddress3Country;
		var laddress3Type;
		var isaddress1Type;
		var isaddress2Type;
		var isaddress3Type;
		
		var lState;
		var lstateDrop;
		
		var lForm2State;
		var lForm2StateDrop;
		
		var lForm3State;
		var lForm3StateDrop;
		
		 lPhone = document.getElementById("idPhone");
		 lCountryCodeEmergencyContact = document.getElementById("idCountryCodeEmergencyContact");
		 lEmergencyContact = document.getElementById("idEmergencyContact");
		 lAlternateEmail = document.getElementById("idAlternateEmail");
		 lEmail = document.getElementById("idEmailId");
		 lCountryCode = document.getElementById("idCountryCode");
		 lCountryCodePhone = document.getElementById("idCountryCodePhone");
		 lMobile = document.getElementById("idMobile");
		 lState = document.getElementById("idAddress1StateDrp");
		 lForm2State = document.getElementById("idAddress2StateDrp");
		 lForm3State = document.getElementById("idAddress3StateDrp");
		 
		 	lPhone.style.border = "";
			lCountryCodeEmergencyContact.style.border = "";
			lEmergencyContact.style.border = "";
			lAlternateEmail.style.border = "";
			lEmail.style.border = "";
			lCountryCode.style.border = "";
			lCountryCodePhone.style.border = "";
			lMobile.style.border = "";
			lState.style.border = "";
			lForm2State.style.border = "";
			lForm3State.style.border = "";
			
			document.getElementById('alertphone').innerHTML="";
			document.getElementById('alertemergencycontact').innerHTML="";
			document.getElementById('alertcountrycodeemergencycontact').innerHTML="";
			document.getElementById('alertalternateemail').innerHTML="";
			document.getElementById('alertemail').innerHTML="";
			document.getElementById('alertcountrycode').innerHTML="";
			document.getElementById('alertcountrycodePhone').innerHTML="";
			document.getElementById('alertmobile').innerHTML="";
			
			 lAddress1Line1=document.getElementById("idAddress1Line1");
			 lAddress1Line2=document.getElementById("idAddress1Line2");
			 lAddress1Line3=document.getElementById("idAddress1Line3");
			 lAddress1City=document.getElementById("idAddress1City");
			 lAddress1State=document.getElementById("idAddress1State");
			 lAddress1Pincode=document.getElementById("idAddress1Pincode");
			 lAddress1Country=document.getElementById("idAddress1Country");

			
			 lAddress2Line1=document.getElementById("idAddress2Line1");
			 lAddress2Line2=document.getElementById("idAddress2Line2");
			 lAddress2Line3=document.getElementById("idAddress2Line3");
			 lAddress2City=document.getElementById("idAddress2City");
			 lAddress2State=document.getElementById("idAddress2State");
			 lAddress2Pincode=document.getElementById("idAddress2Pincode");
			 lAddress2Country=document.getElementById("idAddress2Country");
			 laddress2Type=document.getElementById("address2Type");
			
			 lAddress3Line1=document.getElementById("idAddress3Line1");
			 lAddress3Line2=document.getElementById("idAddress3Line2");
			 lAddress3Line3=document.getElementById("idAddress3Line3");
			 lAddress3City=document.getElementById("idAddress3City");
			 lAddress3State=document.getElementById("idAddress3State");
			 lAddress3Pincode=document.getElementById("idAddress3Pincode");
			 lAddress3Country=document.getElementById("idAddress3Country");
			 laddress3Type=document.getElementById("address3Type");
			
			lAddress1Line1.style.border = "";
			lAddress1City.style.border = "";
			lAddress1State.style.border = "";
			lAddress1Pincode.style.border = "";
			lAddress1Country.style.border = "";
			
			lAddress2Line1.style.border = "";
			lAddress2City.style.border = "";
			lAddress2State.style.border = "";
			lAddress2Pincode.style.border = "";
			lAddress2Country.style.border = "";
			
			lAddress3Line1.style.border = "";
			lAddress3City.style.border = "";
			lAddress3State.style.border = "";
			lAddress3Pincode.style.border = "";
			lAddress3Country.style.border = "";
			
			document.getElementById('alertaddress1line1').innerHTML="";
			document.getElementById('alertaddress1city').innerHTML="";
			document.getElementById('alertaddress1pincode').innerHTML="";
			document.getElementById('alertaddress1state').innerHTML="";
			document.getElementById('alertaddress1country').innerHTML="";
			document.getElementById('alertaddress1type').innerHTML="";
			
			document.getElementById('alertaddress2line1').innerHTML="";
			document.getElementById('alertaddress2city').innerHTML="";
			document.getElementById('alertaddress2pincode').innerHTML="";
			document.getElementById('alertaddress2state').innerHTML="";
			document.getElementById('alertaddress2country').innerHTML="";
			document.getElementById('alertaddress2type').innerHTML="";
			
			document.getElementById('alertaddress3line1').innerHTML="";
			document.getElementById('alertaddress3city').innerHTML="";
			document.getElementById('alertaddress3pincode').innerHTML="";
			document.getElementById('alertaddress3state').innerHTML="";
			document.getElementById('alertaddress3country').innerHTML="";
			document.getElementById('alertaddress3type').innerHTML="";
			
			document.getElementById('alertform').innerHTML="";
			
			
}

function getSelectedContact(){
	var x=0;
	var serviceUrl = "/clientContactInfo/client/" + selectedClientId;
	getClientData("GET", "", serviceUrl, onSuccess);
	function onSuccess(data) {
		contactID = data.id;
		$("#idEmailId").val(data.emailID);
		$("#idAlternateEmail").val(data.alternateEmail);
		$("#idCountryCode").val(data.countryCode);
		$("#idMobile").val(data.mobile);
		$("#idCountryCodePhone").val(data.countryCode);
		$("#idPhone").val(data.phone);
		$("#idCountryCodeEmergencyContact").val(data.countryCode);
		$("#idEmergencyContact").val(data.emergencyContact);
    	var officeFlag = data.officeAddressLine1;
    	var permanentFlag = data.permanentAddressLine1;
    	var correspondenceFlag = data.correspondenceAddressLine1;

		var fullOfficeAddress = "";
		var fullPermanentAddress = "";
		var fullCorrespondenceAddress = "";
		
    	if (officeFlag != null && officeFlag != ''){ 
			fullOfficeAddress = data.officeAddressLine1+data.officeAddressLine2+data.officeAddressLine3+data.officeCity+data.officeState+data.officePincode+data.lookupOfficeCountryId;
		}
		if (permanentFlag != null && permanentFlag != ''){ 
			fullPermanentAddress = data.permanentAddressLine1+data.permanentAddressLine2+data.permanentAddressLine3+data.permanentCity+data.permanentState+data.permanentPincode+data.lookupPermanentCountryId;
		}
		if (correspondenceFlag != null && correspondenceFlag != ''){
			fullCorrespondenceAddress = data.correspondenceAddressLine1+data.correspondenceAddressLine2+data.correspondenceAddressLine3+data.correspondenceCity+data.correspondenceState+data.correspondencePincode+data.lookupCorrespondenceCountryId;
		}
		$("#idDivAddress1").hide();
		$("#idDivAddress2").hide();
		$("#idDivAddress3").hide();
		
		if (officeFlag != null && officeFlag != ''){ 	
			if (permanentFlag != null && permanentFlag != ''){
				if  (correspondenceFlag != null && correspondenceFlag != ''){
					if (fullOfficeAddress == fullPermanentAddress){
						if (fullOfficeAddress == fullCorrespondenceAddress){
							console.log ("Edit contacts 2");
					 		$("#idAddress1Line1").val(data.officeAddressLine1);
							$("#idAddress1Line2").val(data.officeAddressLine2);
							$("#idAddress1Line3").val(data.officeAddressLine3);
							$("#idAddress1City").val(data.officeCity);
							$("#idAddress1Country").val(data.lookupOfficeCountryId);
							if(data.lookupOfficeCountryId==99){
								$("#idAddress1StateDrp").val(data.address1DropId);	
								$('#idFM1StateDrp').show();
								$('#idFM1StateText').hide();
								}else{
								$("#idAddress1State").val(data.officeState);
								$('#idFM1StateDrp').hide();
								$('#idFM1StateText').show();
								}
							$("#idAddress1Pincode").val(data.officePincode);
							$("#idChkAddress1TypeOffice").prop("checked", true);
							$("#idChkAddress1TypePermanent").prop("checked", true);
							$("#idChkAddress1TypeCorrespondence").prop("checked", true);
							$("#idDivAddress1").show();	
							$("#idNoOfClicks").val(++x);
							$("#idBtnMinus1").attr('disabled',true);								
							}
						else{ 
					 		$("#idAddress1Line1").val(data.officeAddressLine1);
							$("#idAddress1Line2").val(data.officeAddressLine2);
							$("#idAddress1Line3").val(data.officeAddressLine3);
							$("#idAddress1City").val(data.officeCity)
							$("#idAddress1Country").val(data.lookupOfficeCountryId);
							if(data.lookupOfficeCountryId==99){
								$("#idAddress1StateDrp").val(data.address1DropId);
								$('#idFM1StateDrp').show();
								$('#idFM1StateText').hide();
								}else{
								$("#idAddress1State").val(data.officeState);
								$('#idFM1StateDrp').hide();
								$('#idFM1StateText').show();
								}
							//$("#idAddress1State").val(data.officeState);
							$("#idAddress1Pincode").val(data.officePincode);
							$("#idChkAddress1TypeOffice").prop("checked", true);
							$("#idChkAddress1TypePermanent").prop("checked", true);
							$("#idChkAddress1TypeCorrespondence").prop("checked", false);
							$("#idDivAddress1").show();	
							$("#idNoOfClicks").val(++x);

						 	$("#idAddress2Line1").val(data.correspondenceAddressLine1);
						 	$("#idAddress2Line2").val(data.correspondenceAddressLine2);
						 	$("#idAddress2Line3").val(data.correspondenceAddressLine3);
						 	$("#idAddress2City").val(data.correspondenceCity);
						 	$("#idAddress2Country").val(data.lookupCorrespondenceCountryId);
						 	if(data.lookupCorrespondenceCountryId==99){
								$("#idAddress2StateDrp").val(data.address2DropId);	
								$('#idFM2StateDrp').show();
								$('#idFM2StateText').hide();
								}else{
								$("#idAddress2State").val(data.permanentState);
								$('#idFM2StateDrp').hide();
								$('#idFM2StateText').show();
								}
						 	//$("#idAddress2State").val(data.correspondenceState);
						 	$("#idAddress2Pincode").val(data.correspondencePincode);
						 	$("#idChkAddress2TypeOffice").prop("checked", false);
						 	$("#idChkAddress2TypePermanent").prop("checked", false);
						 	$("#idChkAddress2TypeCorrespondence").prop("checked", true);
							$("#idDivAddress2").show();	
							$("#idNoOfClicks").val(++x);
						}
					}
					else{
						if (fullOfficeAddress == fullCorrespondenceAddress){
					 		$("#idAddress1Line1").val(data.officeAddressLine1);
							$("#idAddress1Line2").val(data.officeAddressLine2);
							$("#idAddress1Line3").val(data.officeAddressLine3);
							$("#idAddress1City").val(data.officeCity);
							$("#idAddress1Country").val(data.lookupOfficeCountryId);
							if(data.lookupOfficeCountryId==99){
								$("#idAddress1StateDrp").val(data.address1DropId);
								$('#idFM1StateDrp').show();
								$('#idFM1StateText').hide();
								}else{
								$("#idAddress1State").val(data.officeState);
								$('#idFM1StateDrp').hide();
								$('#idFM1StateText').show();
								}
							//$("#idAddress1State").val(data.officeState);
							$("#idAddress1Pincode").val(data.officePincode);
							$("#idChkAddress1TypeOffice").prop("checked", true);
							$("#idChkAddress1TypePermanent").prop("checked", false);
							$("#idChkAddress1TypeCorrespondence").prop("checked", true);
							$("#idDivAddress1").show();	
							$("#idNoOfClicks").val(++x);

						 	$("#idAddress2Line1").val(data.permanentAddressLine1);
						 	$("#idAddress2Line2").val(data.permanentAddressLine2);
						 	$("#idAddress2Line3").val(data.permanentAddressLine3);
						 	$("#idAddress2City").val(data.permanentCity);
						 	$("#idAddress2Country").val(data.lookupPermanentCountryId);
						 	if(data.lookupPermanentCountryId==99){
								$("#idAddress2StateDrp").val(data.address2DropId);	
								$('#idFM2StateDrp').show();
								$('#idFM2StateText').hide();
								}else{
								$("#idAddress2State").val(data.permanentState);
								$('#idFM2StateDrp').hide();
								$('#idFM2StateText').show();
								}
						 	//$("#idAddress2State").val(data.permanentState);
						 	$("#idAddress2Pincode").val(data.permanentPincode);
						 	$("#idChkAddress2TypeOffice").prop("checked", false);
						 	$("#idChkAddress2TypePermanent").prop("checked", true);
						 	$("#idChkAddress2TypeCorrespondence").prop("checked", false);
							$("#idDivAddress2").show();	
							$("#idNoOfClicks").val(++x);
							
						}
						else{
					 		$("#idAddress1Line1").val(data.officeAddressLine1);
							$("#idAddress1Line2").val(data.officeAddressLine2);
							$("#idAddress1Line3").val(data.officeAddressLine3);
							$("#idAddress1City").val(data.officeCity);
							$("#idAddress1Country").val(data.lookupOfficeCountryId);
							if(data.lookupOfficeCountryId!=0){
								$("#idAddress1StateDrp").val(data.address1DropId);	
								$('#idFM1StateDrp').show();
								$('#idFM1StateText').hide();
								}else{
								$("#idAddress1State").val(data.officeState);
								$('#idFM1StateDrp').hide();
								$('#idFM1StateText').show();
								}
							//$("#idAddress1State").val(data.officeState);
							$("#idAddress1Pincode").val(data.officePincode);			
							$("#idChkAddress1TypeOffice").prop("checked", true);
							$("#idChkAddress1TypePermanent").prop("checked", false);
							$("#idChkAddress1TypeCorrespondence").prop("checked", false);
							$("#idDivAddress1").show();	
							$("#idNoOfClicks").val(++x);
							if (fullPermanentAddress == fullCorrespondenceAddress){
							 	$("#idAddress2Line1").val(data.permanentAddressLine1);
							 	$("#idAddress2Line2").val(data.permanentAddressLine2);
							 	$("#idAddress2Line3").val(data.permanentAddressLine3);
							 	$("#idAddress2City").val(data.permanentCity);
							 	$("#idAddress2Country").val(data.lookupPermanentCountryId);
							 	if(data.lookupPermanentCountryId==99){
									$("#idAddress2StateDrp").val(data.address2DropId);	
									$('#idFM2StateDrp').show();
									$('#idFM2StateText').hide();
									}else{
									$("#idAddress2State").val(data.permanentState);
									$('#idFM2StateDrp').hide();
									$('#idFM2StateText').show();
									}
							 	$("#idAddress2Pincode").val(data.permanentPincode);
							 	$("#idChkAddress2TypeOffice").prop("checked", false);
							 	$("#idChkAddress2TypePermanent").prop("checked", true);
							 	$("#idChkAddress2TypeCorrespondence").prop("checked", true);
								$("#idDivAddress2").show();	
								$("#idNoOfClicks").val(++x);								
							}
							else{
							 	$("#idAddress2Line1").val(data.permanentAddressLine1);
							 	$("#idAddress2Line2").val(data.permanentAddressLine2);
							 	$("#idAddress2Line3").val(data.permanentAddressLine3);
							 	$("#idAddress2City").val(data.permanentCity);
							 	$("#idAddress2Country").val(data.lookupPermanentCountryId);
							 	if(data.lookupPermanentCountryId==99){
									$("#idAddress2StateDrp").val(data.address2DropId);	
									$('#idFM2StateDrp').show();
									$('#idFM2StateText').hide();
									}else{
									$("#idAddress2State").val(data.permanentState);
									$('#idFM2StateDrp').hide();
									$('#idFM2StateText').show();
									}
							 	$("#idAddress2Pincode").val(data.permanentPincode);
							 	$("#idChkAddress2TypeOffice").prop("checked", false);
							 	$("#idChkAddress2TypePermanent").prop("checked", true);
							 	$("#idChkAddress2TypeCorrespondence").prop("checked", false);
								$("#idDivAddress2").show();	
								$("#idNoOfClicks").val(++x);								

								$("#idAddress3Line1").val(data.correspondenceAddressLine1);
							 	$("#idAddress3Line2").val(data.correspondenceAddressLine2);
							 	$("#idAddress3Line3").val(data.correspondenceAddressLine3);
							 	$("#idAddress3City").val(data.correspondenceCity);
							 	$("#idAddress3Country").val(data.lookupCorrespondenceCountryId);
							 	if(data.lookupCorrespondenceCountryId==99){
									$("#idAddress3StateDrp").val(data.address3DropId);
									$('#idFM3StateDrp').show();
									$('#idFM3StateText').hide();
									}else{
									$("#idAddress3State").val(data.correspondenceState);
									$('#idFM3StateDrp').hide();
									$('#idFM3StateText').show();
									}
							 	//$("#idAddress3State").val(data.correspondenceState);
							 	$("#idAddress3Pincode").val(data.correspondencePincode);
							 	$("#idChkAddress3TypeOffice").prop("checked", false);
							 	$("#idChkAddress3TypePermanent").prop("checked", false);
							 	$("#idChkAddress3TypeCorrespondence").prop("checked", true);
								$("#idDivAddress3").show();	
								$("#idNoOfClicks").val(++x);								
							}
						}
					}
				}
				else{
					if (fullOfficeAddress == fullPermanentAddress){
				 		$("#idAddress1Line1").val(data.officeAddressLine1);
						$("#idAddress1Line2").val(data.officeAddressLine2);
						$("#idAddress1Line3").val(data.officeAddressLine3);
						$("#idAddress1City").val(data.officeCity);
						$("#idAddress1Country").val(data.lookupOfficeCountryId);
						if(data.lookupOfficeCountryId==99){
							$("#idAddress1StateDrp").val(data.address1DropId);	
							$('#idFM1StateDrp').show();
							$('#idFM1StateText').hide();
							}else{
							$("#idAddress1State").val(data.officeState);
							$('#idFM1StateDrp').hide();
							$('#idFM1StateText').show();
							}
						$("#idAddress1Pincode").val(data.officePincode);
						$("#idChkAddress1TypeOffice").prop("checked", true);
						$("#idChkAddress1TypePermanent").prop("checked", true);
						$("#idChkAddress1TypeCorrespondence").prop("checked", false);
						$("#idDivAddress1").show();		
						$("#idNoOfClicks").val(++x);
						$("#idBtnMinus1").attr('disabled',true);
					}
					else{
				 		$("#idAddress1Line1").val(data.officeAddressLine1);
						$("#idAddress1Line2").val(data.officeAddressLine2);
						$("#idAddress1Line3").val(data.officeAddressLine3);
						$("#idAddress1City").val(data.officeCity);
						$("#idAddress1Country").val(data.lookupOfficeCountryId);
						if(data.lookupOfficeCountryId==99){
							$("#idAddress1StateDrp").val(data.address1DropId);	
							$('#idFM1StateDrp').show();
							$('#idFM1StateText').hide();
							}else{
							$("#idAddress1State").val(data.officeState);
							$('#idFM1StateDrp').hide();
							$('#idFM1StateText').show();
							}
						$("#idAddress1Pincode").val(data.officePincode);
						$("#idChkAddress1TypeOffice").prop("checked", true);
						$("#idChkAddress1TypePermanent").prop("checked", false);
						$("#idChkAddress1TypeCorrespondence").prop("checked", false);
						$("#idDivAddress1").show();	
						$("#idNoOfClicks").val(++x);

					 	$("#idAddress2Line1").val(data.permanentAddressLine1);
					 	$("#idAddress2Line2").val(data.permanentAddressLine2);
					 	$("#idAddress2Line3").val(data.permanentAddressLine3);
					 	$("#idAddress2City").val(data.permanentCity);
						$("#idAddress2Country").val(data.lookupPermanentCountryId);
					 	if(data.lookupPermanentCountryId==99){
							$("#idAddress2StateDrp").val(data.address2DropId);
							$('#idFM2StateDrp').show();
							$('#idFM2StateText').hide();
							}else{
							$("#idAddress2State").val(data.permanentState);
							$('#idFM2StateDrp').hide();
							$('#idFM2StateText').show();
							}
					 	$("#idAddress2Pincode").val(data.permanentPincode);
					 	$("#idChkAddress2TypeOffice").prop("checked", false);
					 	$("#idChkAddress2TypePermanent").prop("checked", true);
					 	$("#idChkAddress2TypeCorrespondence").prop("checked", false);
						$("#idDivAddress2").show();	
						$("#idNoOfClicks").val(++x);
					}
				}
			}
			else{
				if  (correspondenceFlag != null && correspondenceFlag != ''){
					if (fullOfficeAddress == fullCorrespondenceAddress){
						$("#idAddress1Line1").val(data.officeAddressLine1);
						$("#idAddress1Line2").val(data.officeAddressLine2);
						$("#idAddress1Line3").val(data.officeAddressLine3);
						$("#idAddress1City").val(data.officeCity);
						$("#idAddress1Country").val(data.lookupOfficeCountryId);
						if(data.lookupOfficeCountryId==0){
							$("#idAddress1StateDrp").val(data.address1DropId);
							$('#idFM1StateDrp').show();
							$('#idFM1StateText').hide();
							}else{
							$("#idAddress1State").val(data.officeState);
							$('#idFM1StateDrp').hide();
							$('#idFM1StateText').show();
							}
						$("#idAddress1Pincode").val(data.officePincode);
						$("#idChkAddress1TypeOffice").prop("checked", true);
						$("#idChkAddress1TypePermanent").prop("checked", false);
						$("#idChkAddress1TypeCorrespondence").prop("checked", true);
						$("#idDivAddress1").show();			
						$("#idNoOfClicks").val(++x);
						$("#idBtnMinus1").attr('disabled',true);
					}
					else{
						$("#idAddress1Line1").val(data.officeAddressLine1);
						$("#idAddress1Line2").val(data.officeAddressLine2);
						$("#idAddress1Line3").val(data.officeAddressLine3);
						$("#idAddress1City").val(data.officeCity);
						$("#idAddress1Country").val(data.lookupOfficeCountryId);
						if(data.lookupOfficeCountryId==99){
							$("#idAddress1StateDrp").val(data.address1DropId);	
							$('#idFM1StateDrp').show();
							$('#idFM1StateText').hide();
							}else{
							$("#idAddress1State").val(data.officeState);
							$('#idFM1StateDrp').hide();
							$('#idFM1StateText').show();
							}
						$("#idAddress1Pincode").val(data.officePincode);
						$("#idChkAddress1TypeOffice").prop("checked", true);
						$("#idChkAddress1TypePermanent").prop("checked", false);
						$("#idChkAddress1TypeCorrespondence").prop("checked", false);
						$("#idDivAddress1").show();			
						$("#idNoOfClicks").val(++x);
						
					 	$("#idAddress2Line1").val(data.correspondenceAddressLine1);
					 	$("#idAddress2Line2").val(data.correspondenceAddressLine2);
					 	$("#idAddress2Line3").val(data.correspondenceAddressLine3);
					 	$("#idAddress2City").val(data.correspondenceCity);
					 	$("#idAddress2Country").val(data.lookupCorrespondenceCountryId);
					 	if(data.lookupCorrespondenceCountryId==99){
							$("#idAddress2StateDrp").val(data.address3DropId);
							$('#idFM2StateDrp').show();
							$('#idFM2StateText').hide();
							}else{
							$("#idAddress2State").val(data.correspondenceState);
							$('#idFM2StateDrp').hide();
							$('#idFM2StateText').show();
							}
					 	$("#idAddress2Pincode").val(data.correspondencePincode);
					 	$("#idChkAddress2TypeOffice").prop("checked", false);
					 	$("#idChkAddress2TypePermanent").prop("checked", false);
					 	$("#idChkAddress2TypeCorrespondence").prop("checked", true);
						$("#idDivAddress2").show();	
						$("#idNoOfClicks").val(++x);								
					}
				}
				else{
					$("#idAddress1Line1").val(data.officeAddressLine1);
					$("#idAddress1Line2").val(data.officeAddressLine2);
					$("#idAddress1Line3").val(data.officeAddressLine3);
					$("#idAddress1City").val(data.officeCity);
					$("#idAddress1Country").val(data.lookupOfficeCountryId);
					if(data.lookupOfficeCountryId==99){
						$("#idAddress1StateDrp").val(data.address1DropId);	
						$('#idFM1StateDrp').show();
						$('#idFM1StateText').hide();
						}else{
						$("#idAddress1State").val(data.officeState);
						$('#idFM1StateDrp').hide();
						$('#idFM1StateText').show();
						}
					$("#idAddress1Pincode").val(data.officePincode);
					$("#idChkAddress1TypeOffice").prop("checked", true);
					$("#idChkAddress1TypePermanent").prop("checked", false);
					$("#idChkAddress1TypeCorrespondence").prop("checked", false);
					$("#idDivAddress1").show();			
					$("#idNoOfClicks").val(++x);				
					$("#idBtnMinus1").attr('disabled',true);
				}
			}					
		}
		else{
			if (permanentFlag != null && permanentFlag != ''){
				if  (correspondenceFlag != null && correspondenceFlag != ''){
					if (fullPermanentAddress == fullCorrespondenceAddress){
					 	$("#idAddress1Line1").val(data.permanentAddressLine1);
					 	$("#idAddress1Line2").val(data.permanentAddressLine2);
					 	$("#idAddress1Line3").val(data.permanentAddressLine3);
					 	$("#idAddress1City").val(data.permanentCity);
					 	$("#idAddress1Country").val(data.lookupPermanentCountryId);
					 	if(data.lookupPermanentCountryId==99){
							$("#idAddress1StateDrp").val(data.address2DropId);	
							$('#idFM1StateDrp').show();
							$('#idFM1StateText').hide();
							}else{
							$("#idAddress1State").val(data.permanentState);
							$('#idFM1StateDrp').hide();
							$('#idFM1StateText').show();
							}
					 	$("#idAddress1Pincode").val(data.permanentPincode);
					 	$("#idChkAddress1TypeOffice").prop("checked", false);
					 	$("#idChkAddress1TypePermanent").prop("checked", true);
					 	$("#idChkAddress1TypeCorrespondence").prop("checked", true);
						$("#idDivAddress1").show();	
						$("#idNoOfClicks").val(++x);		
						$("#idBtnMinus1").attr('disabled',true);
					}
					else{
					 	$("#idAddress1Line1").val(data.permanentAddressLine1);
					 	$("#idAddress1Line2").val(data.permanentAddressLine2);
					 	$("#idAddress1Line3").val(data.permanentAddressLine3);
					 	$("#idAddress1City").val(data.permanentCity);
					 	$("#idAddress1Country").val(data.lookupPermanentCountryId);
					 	if(data.lookupPermanentCountryId==99){
							$("#idAddress1StateDrp").val(data.address2DropId);	
							$('#idFM1StateDrp').show();
							$('#idFM1StateText').hide();
							}else{
							$("#idAddress1State").val(data.permanentState);
							$('#idFM1StateDrp').hide();
							$('#idFM1StateText').show();
							}
					 	$("#idAddress1Pincode").val(data.permanentPincode);
					 	$("#idChkAddress1TypeOffice").prop("checked", false);
					 	$("#idChkAddress1TypePermanent").prop("checked", true);
					 	$("#idChkAddress1TypeCorrespondence").prop("checked", false);
						$("#idDivAddress1").show();	
						$("#idNoOfClicks").val(++x);								

						$("#idAddress2Line1").val(data.correspondenceAddressLine1);
					 	$("#idAddress2Line2").val(data.correspondenceAddressLine2);
					 	$("#idAddress2Line3").val(data.correspondenceAddressLine3);
					 	$("#idAddress2City").val(data.correspondenceCity);
					 	$("#idAddress2Country").val(data.lookupCorrespondenceCountryId);
					 	if(data.lookupCorrespondenceCountryId==99){
							$("#idAddress2StateDrp").val(data.address3DropId);
							$('#idFM2StateDrp').show();
							$('#idFM2StateText').hide();
							}else{
							$("#idAddress2State").val(data.correspondenceState);
							$('#idFM2StateDrp').hide();
							$('#idFM2StateText').show();
							}
					 	$("#idAddress2Pincode").val(data.correspondencePincode);
					 	$("#idChkAddress2TypeOffice").prop("checked", false);
					 	$("#idChkAddress2TypePermanent").prop("checked", false);
					 	$("#idChkAddress2TypeCorrespondence").prop("checked", true);
						$("#idDivAddress2").show();	
						$("#idNoOfClicks").val(++x);								
					}
				}
				else{
				 	$("#idAddress1Line1").val(data.permanentAddressLine1);
				 	$("#idAddress1Line2").val(data.permanentAddressLine2);
				 	$("#idAddress1Line3").val(data.permanentAddressLine3);
				 	$("#idAddress1City").val(data.permanentCity);
				 	$("#idAddress1Country").val(data.lookupPermanentCountryId);
				 	//console.log("data.address2DropId "+data.address2DropId);
				 	if(data.lookupPermanentCountryId==99){
						$("#idAddress1StateDrp").val(data.address2DropId);	
						//console.log("pp3 show");
						$('#idFM1StateDrp').show();
						$('#idFM1StateText').hide();
						}else{
						$("#idAddress1State").val(data.permanentState);
						$('#idFM1StateDrp').hide();
						$('#idFM1StateText').show();
						}
				 	$("#idAddress1Pincode").val(data.permanentPincode);
				 	$("#idChkAddress1TypeOffice").prop("checked", false);
				 	$("#idChkAddress1TypePermanent").prop("checked", true);
				 	$("#idChkAddress1TypeCorrespondence").prop("checked", false);
					$("#idDivAddress1").show();	
					$("#idNoOfClicks").val(++x);				
					$("#idBtnMinus1").attr('disabled',true);
				}
			}
			else{
				if  (correspondenceFlag != null && correspondenceFlag != ''){
					$("#idAddress1Line1").val(data.correspondenceAddressLine1);
				 	$("#idAddress1Line2").val(data.correspondenceAddressLine2);
				 	$("#idAddress1Line3").val(data.correspondenceAddressLine3);
				 	$("#idAddress1City").val(data.correspondenceCity);
				 	$("#idAddress1Country").val(data.lookupCorrespondenceCountryId);
				 	if(data.lookupCorrespondenceCountryId==99){
						$("#idAddress1StateDrp").val(data.address3DropId);	
						$('#idFM1StateDrp').show();
						$('#idFM1StateText').hide();
						}else{
						$("#idAddress1State").val(data.correspondenceState);
						$('#idFM1StateDrp').hide();
						$('#idFM1StateText').show();
						}
				 	$("#idAddress1Pincode").val(data.correspondencePincode);
				 	$("#idChkAddress1TypeOffice").prop("checked", false);
				 	$("#idChkAddress1TypePermanent").prop("checked", false);
				 	$("#idChkAddress1TypeCorrespondence").prop("checked", true);
					$("#idDivAddress1").show();	
					$("#idNoOfClicks").val(++x);	
					$("#idBtnMinus1").attr('disabled',true);
				}
			}
		}
		console.log("Adding contacts:22");
	
			/*if(data.lookupOfficeCountryId=="99"){
				$('#idFM1StateDrp').show();
				$('#idFM1StateText').hide();
				
			}else{
				$('#idFM1StateDrp').hide();
				$('#idFM1StateText').show();
			}
		
			alert(": " + data.lookupPermanentCountryId);
		
		   if(data.lookupPermanentCountryId=="99"){
			   $('#idFM1StateDrp').show();
				$('#idFM1StateText').hide();
			alert("permanentStateDtopId: " + data.address2DropId);
		}else{
			$('#idFM1StateDrp').hide();
			$('#idFM1StateText').show();
		}
	
		   if(data.lookupCorrespondenceCountryId == 99){
				//alert("India!!!!!!!!");
				$('#idFM1StateDrp').show();
				$('#idFM1StateText').hide();
				//alert("officeStateDtopId: " + data.officeStateDropId);
				//alert("address1DropId: " + data.address1DropId);
			
			}else{
				//alert("FOREIGN!!!!!!!!!!!!!!!!!!");
				$('#idFM1StateDrp').hide();
				$('#idFM1StateText').show();
			}
		 */

		//alert("correspondenceAddressLine1: " + data.correspondenceAddressLine1);
		

		   
		   
		/*   if(data.lookupOfficeCountryId=="99"){
				$('#idFM2StateDrp').show();
				$('#idFM2StateText').hide();
			
				
			}else{
				$('#idFM2StateDrp').hide();
				$('#idFM2StateText').show();
			}
		
		
		
		   if(data.lookupPermanentCountryId=="99"){
			$('#idFM2StateDrp').show();
			$('#idFM2StateText').hide();
			
			
		}else{
			$('#idFM2StateDrp').hide();
			$('#idFM2StateText').show();
		}

		
		   if(data.lookupCorrespondenceCountryId == 99){
				//alert("India!!!!!!!!");
				$('#idFM2StateDrp').show();
				$('#idFM2StateText').hide();

				
			}else{
				//alert("FOREIGN!!!!!!!!!!!!!!!!!!");
				$('#idFM2StateDrp').hide();
				$('#idFM2StateText').show();
			}
		   
		   */
		   
			//alert("lookupCorrespondenceCountryId: " + data.lookupCorrespondenceCountryId);
		   

		   /*if(data.b=="99"){
				$('#idFM3StateDrp').show();
				$('#idFM3StateText').hide();
	
				
			}else{
				$('#idFM3StateDrp').hide();
				$('#idFM3StateText').show();
			}
		
		
		
		   if(data.lookupPermanentCountryId=="99"){
			$('#idFM3StateDrp').show();
			$('#idFM3StateText').hide();

			
		}else{
			$('#idFM3StateDrp').hide();
			$('#idFM3StateText').show();
		}
	
		if(data.lookupCorrespondenceCountryId == 99){
			//alert("India!!!!!!!!");
			$('#idFM3StateDrp').show();
			$('#idFM3StateText').hide();

			
		}else{
			//alert("FOREIGN!!!!!!!!!!!!!!!!!!");
			$('#idFM3StateDrp').hide();
			$('#idFM3StateText').show();
		}
*/
		
			//alert("lookupCorrespondenceCountryId: " + data.lookupCorrespondenceCountryId);
		
		
 }
	
}
var selectedAddress1CountryId;
//function country(){
	$('#idAddress1Country').on('change', function(){
		 selectedAddress1CountryId = $(this).val();
		//alert("selectedAddress1CountryId: " + selectedAddress1CountryId);
		
		if (selectedAddress1CountryId == 99) {
			$("#idFM1StateText").hide();
			$("#idFM1StateDrp").show();
		} else {
			$("#idFM1StateDrp").hide();
			$("#idFM1StateText").show();
		}
		
   	});
	
	$('#idAddress2Country').on('change', function(){
		 selectedAddress1CountryId = $(this).val();
		//alert("selectedAddress1CountryId: " + selectedAddress1CountryId);
		
		if (selectedAddress1CountryId == 99) {
			$("#idFM2StateText").hide();
			$("#idFM2StateDrp").show();
		} else {
			$("#idFM2StateDrp").hide();
			$("#idFM2StateText").show();
		}
		
   	});
	
	$('#idAddress3Country').on('change', function(){
		selectedAddress1CountryId = $(this).val();
		//alert("selectedAddress1CountryId: " + selectedAddress1CountryId);
		
		if (selectedAddress1CountryId == 99) {
			$("#idFM3StateText").hide();
			$("#idFM3StateDrp").show();
		} else {
			$("#idFM3StateDrp").hide();
			$("#idFM3StateText").show();
		}
		
   	});
	
//}




/* $("#idBtnMinus").click(function() {
var x = parseInt($("#idNoOfClicks").val(),10);
//alert("No of clicks in minus: " + x);
if (x==3){
	$("#idDivAddress3").hide();
	$("#idBtnAdd").attr('disabled',false);
	$("#idAddress3Line1").val("");
	$("#idAddress3Line2").val("");
	$("#idAddress3Line3").val("");
	$("#idAddress3City").val("");
	$("#idAddress3State").val("");
	$("#idAddress3Pincode").val("");
	$("#idAddress3Country").val("");
	$("#idChkAddress3TypeOffice").prop("checked", false);
	$("#idChkAddress3TypePermanent").prop("checked", false);
	$("#idChkAddress3TypeCorrespondence").prop("checked", false);
	if ($("#idChkAddress1TypeOffice").prop("checked") == true || $("#idChkAddress2TypeOffice").prop("checked") == true){
		//alert("Set office checked to Y");
		$("#idOfficeChecked").val("Y");
	}
	else{
		//alert("Set office checked to N");
		$("#idOfficeChecked").val("N");
	}

	if ($("#idChkAddress1TypePermanent").prop("checked") == true || $("#idChkAddress2TypePermanent").prop("checked") == true){
		$("#idPermanentChecked").val("Y");
	}
	else{
		$("#idPermanentChecked").val("N");
	}

	if ($("#idChkAddress1TypeCorrespondence").prop("checked") == true || $("#idChkAddress2TypeCorrespondence").prop("checked") == true){
		$("#idCorrespondenceChecked").val("Y");
	}
	else{
		$("#idCorrespondenceChecked").val("N");
	}
	if ($("#idOfficeChecked").val() == "N" || $("#idPermanentChecked").val() == "N" || $("#idCorrespondenceChecked").val() =="N"){
	 	$("#idBtnAdd").attr('disabled',false);
	}
	else{
		$("#idBtnAdd").attr('disabled',true);
	}
	if ($("#idOfficeChecked").val() == "N"){
		//alert("Office not checked");
		$("#idChkAddress1TypeOffice").prop("disabled", false);
		$("#idChkAddress2TypeOffice").prop("disabled", false);
	}
	if ($("#idPermanentChecked").val() == "N"){
		$("#idChkAddress1TypePermanent").prop("disabled", false);
		$("#idChkAddress2TypePermanent").prop("disabled", false);
	}
	if ($("#idCorrespondenceChecked").val() == "N"){
		$("#idChkAddress1TypeCorrespondence").prop("disabled", false);
		$("#idChkAddress2TypeCorrespondence").prop("disabled", false);
	}

}
if (x==2){
	$("#idDivAddress2").hide();
	$("#idBtnMinus").attr('disabled',true);
	$("#idAddress2Line1").val("");
	$("#idAddress2Line2").val("");
	$("#idAddress2Line3").val("");
	$("#idAddress2City").val("");
	$("#idAddress2State").val("");
	$("#idAddress2Pincode").val("");
	$("#idAddress2Country").val("");
	$("#idChkAddress2TypeOffice").prop("checked", false);
	$("#idChkAddress2TypePermanent").prop("checked", false);
	$("#idChkAddress2TypeCorrespondence").prop("checked", false);
	if ($("#idChkAddress1TypeOffice").prop("checked") == true){
		$("#idOfficeChecked").val("Y");
	}
	else{
		$("#idOfficeChecked").val("N");
	}

	if ($("#idChkAddress1TypePermanent").prop("checked") == true){
		$("#idPermanentChecked").val("Y");
	}
	else{
		$("#idPermanentChecked").val("N");
	}

	if ($("#idChkAddress1TypeCorrespondence").prop("checked") == true){
		$("#idCorrespondenceChecked").val("Y");
	}
	else{
		$("#idCorrespondenceChecked").val("N");
	}
	
	if ($("#idOfficeChecked").val() == "N" || $("#idPermanentChecked").val() == "N" || $("#idCorrespondenceChecked").val() =="N"){
	 	$("#idBtnAdd").attr('disabled',false);
	}
	else{
		$("#idBtnAdd").attr('disabled',true);
	}
	if ($("#idOfficeChecked").val() == "N"){
		$("#idChkAddress1TypeOffice").prop("disabled", false);
	}
	if ($("#idPermanentChecked").val() == "N"){
		$("#idChkAddress1TypePermanent").prop("disabled", false);
	}
	if ($("#idCorrespondenceChecked").val() == "N"){
		$("#idChkAddress1TypeCorrespondence").prop("disabled", false);
	}

}
$("#idNoOfClicks").val(x-1);
//alert("Minus clicks: "+ $("#idNoOfClicks").val());
}); 
 */
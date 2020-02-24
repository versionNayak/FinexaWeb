var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");	
var financialAssetTypeId = sessionStorage.getItem("SELECTED_AI_ASSET_TYPE_ID");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}

console.log('Asset Type: '+ financialAssetTypeId); 
var selectedAIID = sessionStorage.getItem("SELECTED_AI_ID");
console.log('AI ID: '+ selectedAIID); 

var user_dt;

var months;
var client_dob;
var client_lexp;
/*var months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
var client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
var client_lexp = moment(client_dob).add(months, 'months').toDate();*/
var pageMode = sessionStorage.getItem("PAGE_MODE");	
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
$(document).ready(function () {	
	
	//new code for access rights
	if(loggedClient.role === "Client"){
		if(loggedClient.clientInfoAddEdit === "Y"){
			$("#idSaveAlternateInvestment").show();
			$("#undo").show();
		}else if(loggedClient.clientInfoView === "Y"){
			$("#idSaveAlternateInvestment").hide();
			$("#undo").hide();
		}
	}else if(loggedUser.role === "Admin"){
		$("#idSaveAlternateInvestment").hide();
		$("#undo").hide();
	}else{
		if(loggedUser.clientInfoAddEdit === "Y"){
			$("#idSaveAlternateInvestment").show();
			$("#undo").show();
		}else if(loggedUser.clientInfoView === "Y"){
			$("#idSaveAlternateInvestment").hide();
			$("#undo").hide();
		}
	}
	//alert('Page Mode: '+pageMode);
	var saveURL;
	
	months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
	client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
	client_lexp = moment(client_dob).add(months, 'months').toDate();
	
	var options =  {
			  onComplete: function(cep) {
			     //alert('CEP Completed!:' + cep);		  
				 //window.given_start_date = moment($('#idLoanStartDate').val(),'DD/MM/YYYY').toDate();
				 //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);		 
				 //alert(window.given_start_date);
			  },
			  onKeyPress: function(cep, event, currentField, options){
			    //console.log('A key was pressed!:', cep, ' event: ', event,'currentField: ', currentField, ' options: ', options);
			  },
			  onChange: function(cep){
			    //console.log('cep changed! ', cep);
			  },
			  onInvalid: function(val, e, f, invalid, options){
			    //var error = invalid[0];
			    //console.log ("Digit: ", error.v, " is invalid for the position: ", error.p, ". We expect something like: ", error.e);
			  }
			};
			
	$('#idDateOfInvestment').mask('00/00/0000',options);
	    	    
	  
    var options1 =  {
  	      onComplete: function(cep) {        
  	         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
  	         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
  	      },
  	      onKeyPress: function(cep, event, currentField, options){},
  	      onChange: function(cep){},
  	      onInvalid: function(val, e, f, invalid, options){},
  	      onBlur: function(e){}
      };
      	    
      $('#idExpectedLienReleaseDate').mask('00/00/0000',options1);
      
      var options2 =  {
      	      onComplete: function(cep) {        
      	         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
      	         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
      	      },
      	      onKeyPress: function(cep, event, currentField, options){},
      	      onChange: function(cep){},
      	      onInvalid: function(val, e, f, invalid, options){},
      	      onBlur: function(e){}
          };
          	    
          $('#idDateOfInvestmentOthers').mask('00/00/0000',options2);
          
          var options3 =  {
          	      onComplete: function(cep) {        
          	         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
          	         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
          	      },
          	      onKeyPress: function(cep, event, currentField, options){},
          	      onChange: function(cep){},
          	      onInvalid: function(val, e, f, invalid, options){},
          	      onBlur: function(e){}
              };
              	    
              $('#idMaturityDate').mask('00/00/0000',options3);
              
          var options4 =  {
          	      onComplete: function(cep) {        
          	         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
          	         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
          	      },
          	      onKeyPress: function(cep, event, currentField, options){},
          	      onChange: function(cep){},
          	      onInvalid: function(val, e, f, invalid, options){},
          	      onBlur: function(e){}
              };
              	    
              $('#idInvestmentStartDate').mask('00/00/0000',options4);
	
	
	if (financialAssetTypeId == 5) {
		 // for Real Estate
		// alert("RE");		 
		 $('#divRE').show();
		 
		 $('#divPM').hide();
		 $('#divV').hide();
		 $('#divOthers').hide();
		 $('#AD-SP').hide();
		 $('#IMD').hide();
		 $('#EMV').hide();
		 $('#SPStartDate').hide();
		 $('#idButton').show();
		 saveURL = "createClientRealEstate/";
		 
		 // calendar
		 	"use strict";
			$("[data-toggle=\"tooltip\"]").tooltip();
			$("#idDateOfInvestment").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true,
				autoclose: true,
				forceParse: false,
				startDate : window.client_dob,
				endDate: new Date()
			}).on('changeDate', function (ev) {
				unmaskAllAmountFields();
				$("#alertIDate").css('color','');
				$("#alertIDate").text("");
				$("#idDateOfInvestmentGroup").css('border','');
				$("#idSaveAlternateInvestment").prop("disabled", false);
			});
			
			$("#idDateOfInvestment").blur(function() {
				unmaskAllAmountFields();
				if ($(this).val() != "") {
					if (!checkValidDate($(this).val())) {
						$("#alertIDate").css('color','red');
						$("#alertIDate").text("Date is invalid!");
						$("#idDateOfInvestmentGroup").css('border','2px solid red');
						$("#idSaveAlternateInvestment").prop("disabled", true);
					} else {
						$("#alertIDate").css('color','');
						$("#alertIDate").text("");
						$("#idDateOfInvestmentGroup").css('border','');
						$("#idSaveAlternateInvestment").prop("disabled", false);
					}
				} else {
					$("#alertIDate").css('color','');
					$("#alertIDate").text("");
					$("#idDateOfInvestmentGroup").css('border','');
					$("#idSaveAlternateInvestment").prop("disabled", false);
				}
				
			});
			
			$("#idExpectedLienReleaseDate").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true,
				autoclose: true,
				forceParse: false,
				startDate: new Date(),
				endDate: window.client_lexp,
			}).on('changeDate', function (ev) {
				unmaskAllAmountFields();
				$("#alertExpectedLienReleaseDate").css('color','');
				$("#alertExpectedLienReleaseDate").text("");
				$("#idExpectedLienReleaseDateGroup").css('border','');
				$("#idSaveAlternateInvestment").prop("disabled", false);
			});
			
			$("#idExpectedLienReleaseDate").blur(function() {
				unmaskAllAmountFields();
				if ($(this).val() != "") {
					if (!checkValidDate($(this).val())) {
						$("#alertExpectedLienReleaseDate").css('color','red');
						$("#alertExpectedLienReleaseDate").text("Date is invalid!");
						$("#idExpectedLienReleaseDateGroup").css('border','2px solid red');
						$("#idSaveAlternateInvestment").prop("disabled", true);
					} else {
						$("#alertExpectedLienReleaseDate").css('color','');
						$("#alertExpectedLienReleaseDate").text("");
						$("#idExpectedLienReleaseDateGroup").css('border','');
						$("#idSaveAlternateInvestment").prop("disabled", false);
					}
				} else {
					$("#alertExpectedLienReleaseDate").css('color','');
					$("#alertExpectedLienReleaseDate").text("");
					$("#idExpectedLienReleaseDateGroup").css('border','');
					$("#idSaveAlternateInvestment").prop("disabled", false);
				}
				
				
			});
			
			$(".datepicker-icon").on("click", function () {
				$(this).closest(".input-group").find("input").trigger("focus");
			});
			
			getClientData("GET","","AllRealEstateType",reDescriptionSuccess);

			function reDescriptionSuccess(data){
			//	console.log(data);
				reDDrop = $("#idRealEstateDescription");
				reDDrop.find('option').remove();
				reDDrop.append('<option value="">Select</option>');
				 
				$.each(data, function (index, item) {
					reDDrop.append('<option value="' + item.description + '">' + item.description + '</option>');
					
				});

			}
			
			getClientData("GET","","AllAlternateInvestmentsAssetType",assetTypeSuccess);
			function assetTypeSuccess(data){
			//	console.log(data);
				atDrop = $("#idAssetType");
				atDrop.find('option').remove();
				atDrop.append('<option value="">Select</option>');
				
				$.each(data, function (index, item) {
					atDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
				});				
			}
			
			getClientData("GET","","AllFrequency",rentalFrequencySuccess);
			function rentalFrequencySuccess(data){
			//	console.log(data);
				rifDrop = $("#idRIF");
				rifDrop.find('option').remove();
				rifDrop.append('<option value="">Select Rental Income Frequency</option>');
				
				$.each(data, function (index, item) {
					rifDrop.append('<option value="' + item.id + '">' + item.description + '</option>');					 
				});				
			}
			
	 } else if(financialAssetTypeId == 1) {
		 // Precious Metals
		 $('#RIncome').hide();
		 $('#RIF').hide();
		 $('#RED').hide();
		 $('#LM').hide();
		 $('#LRDate').hide();
		 $('#divV').hide();
		 $('#divOthers').hide();
		 $('#AD-SP').hide();
		 $('#IMD').hide();
		 $('#EMV').hide();
		 $('#SPStartDate').hide();
		 $('#AT').show();
		 $('#AD').show();
		 $('#IAmount').show();
		 $('#IDate').show();
		 $('#CMV').show();
		 $('#idButton').show();
		 saveURL = "createClientPreciousMetal/";
		 
		 // calendar
		 	"use strict";
			$("[data-toggle=\"tooltip\"]").tooltip();
			
			$("#idDateOfInvestment").datepicker('remove'); 
			
			$("#idDateOfInvestment").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true,
				autoclose: true,
				forceParse: false,
				startDate : window.client_dob,
				endDate: new Date()
			}).on('changeDate', function (ev) {
				unmaskAllAmountFields();
				$("#alertIDate").css('color','');
				$("#alertIDate").text("");
				$("#idDateOfInvestmentGroup").css('border','');
				$("#idSaveAlternateInvestment").prop("disabled", false);
			});
			
			$("#idDateOfInvestment").blur(function() {
				unmaskAllAmountFields();
				if ($(this).val() != "") {
					if (!checkValidDate($(this).val())) {
						$("#alertIDate").css('color','red');
						$("#alertIDate").text("Date is invalid!");
						$("#idDateOfInvestmentGroup").css('border','2px solid red');
						$("#idSaveAlternateInvestment").prop("disabled", true);
					} else {
						$("#alertIDate").css('color','');
						$("#alertIDate").text("");
						$("#idDateOfInvestmentGroup").css('border','');
						$("#idSaveAlternateInvestment").prop("disabled", false);
					}
				} else {
					$("#alertIDate").css('color','');
					$("#alertIDate").text("");
					$("#idDateOfInvestmentGroup").css('border','');
					$("#idSaveAlternateInvestment").prop("disabled", false);
				}
				
			});
			
			$(".datepicker-icon").on("click", function () {
				$(this).closest(".input-group").find("input").trigger("focus");
			});
			
			getClientData("GET","","AllAlternateInvestmentsAssetType",assetTypeSuccess);
			function assetTypeSuccess(data){
			//	console.log(data);
				atDrop = $("#idAssetType");
				atDrop.find('option').remove();
				atDrop.append('<option value="">Select</option>');
				
				$.each(data, function (index, item) {
					atDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
				});				
			}
	 } else if(financialAssetTypeId == 2) {
		 // Vehicles
		 $('#RIncome').hide();
		 $('#RIF').hide();
		 $('#RED').hide();
		 $('#LM').hide();
		 $('#LRDate').hide();
		 $('#divOthers').hide();
		 $('#AD-SP').hide();
		 $('#IMD').hide();
		 $('#EMV').hide();
		 $('#divV').show();
		 $('#AT').show();
		 $('#AD').hide();
		 $('#IAmount').hide();
		 $('#IDate').hide();
		 $('#SPStartDate').hide();
		 $('#CMV').show();
		 $('#idButton').show();
		 
		 saveURL = "createClientVehicle/";
		 
		 getClientData("GET","","AllAlternateInvestmentsAssetType",assetTypeSuccess);
		function assetTypeSuccess(data){
		//	console.log(data);
			atDrop = $("#idAssetType");
			atDrop.find('option').remove();
			atDrop.append('<option value="">Select</option>');
			
			$.each(data, function (index, item) {
				//alert('Investment Type: '+ item.id + ' ' + item.description);
				atDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			});
			
			$("#idAssetType option").filter(function() {
				return this.value==2;				    
			}).prop('selected', true);
			
			$('#idAssetType').attr("style", "pointer-events: none;");						
		}
	 } else if(financialAssetTypeId == 3) {
		 // Others
		 $('#RIncome').hide();
		 $('#RIF').hide();
		 $('#RED').hide();
		 $('#LM').hide();
		 $('#LRDate').hide();
		 $('#divV').hide();
		 $('#AT').hide();
		 $('#AD').hide();
		 $('#IAmount').hide();
		 $('#IDate').hide();
		 //$('#IDateOthers').show();
		 $('#CMV').hide();
		 $('#divOthers').show();
		 $('#IMD').show();
		 $('#firstLabelMD').show();
		 $('#secondLabelMD').hide();
		 $('#AD-SP').hide();
		 $('#EMV').hide();
		 $('#SPStartDate').hide();
		 $('#idButton').show();
		 
		 saveURL = "createClientOtherAlternateAsset/";
		 
		 	// calendar
		 	"use strict";
			$("[data-toggle=\"tooltip\"]").tooltip();
			
			$("#idDateOfInvestmentOthers").datepicker('remove'); 
			
			$("#idDateOfInvestmentOthers").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true,
				autoclose: true,
				forceParse: false,
				startDate : window.client_dob,
				endDate: new Date()
			}).on('changeDate', function (ev) {
				unmaskAllAmountFields();
				$("#alertIDateOfInvestmentOthers").css('color','');
				$("#alertIDateOfInvestmentOthers").text("");
				$("#idDateOfInvestmentOthersGroup").css('border','');
				$("#idSaveAlternateInvestment").prop("disabled", false);
			});
			
			$("#idDateOfInvestmentOthers").blur(function() {
				unmaskAllAmountFields();
				if ($(this).val() != "") {
					if (!checkValidDate($(this).val())) {
						$("#alertIDateOfInvestmentOthers").css('color','red');
						$("#alertIDateOfInvestmentOthers").text("Date is invalid!");
						$("#idDateOfInvestmentOthersGroup").css('border','2px solid red');
						$("#idSaveAlternateInvestment").prop("disabled", true);
					} else {
						$("#alertIDateOfInvestmentOthers").css('color','');
						$("#alertIDateOfInvestmentOthers").text("");
						$("#idDateOfInvestmentOthersGroup").css('border','');
						$("#idSaveAlternateInvestment").prop("disabled", false);
					}
				} else {
					$("#alertIDateOfInvestmentOthers").css('color','');
					$("#alertIDateOfInvestmentOthers").text("");
					$("#idDateOfInvestmentOthersGroup").css('border','');
					$("#idSaveAlternateInvestment").prop("disabled", false);
				}
				
			});
			
			$("#idMaturityDate").datepicker('remove');
			
			$("#idMaturityDate").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true,
				autoclose: true,
				forceParse: false,
				startDate: new Date(),
				endDate: window.client_lexp,
			}).on('changeDate', function (ev) {
				unmaskAllAmountFields();
				$("#alertMaturityDate").css('color','');
				$("#alertMaturityDate").text("");
				$("#idMaturityDateGroup").css('border','');
				$("#idSaveAlternateInvestment").prop("disabled", false);
			});
			
			$("#idMaturityDate").blur(function() {
				unmaskAllAmountFields();
				if ($(this).val() != "") {
					if (!checkValidDate($(this).val())) {
						$("#alertMaturityDate").css('color','red');
						$("#alertMaturityDate").text("Date is invalid!");
						$("#idMaturityDateGroup").css('border','2px solid red');
						$("#idSaveAlternateInvestment").prop("disabled", true);
					} else {
						$("#alertMaturityDate").css('color','');
						$("#alertMaturityDate").text("");
						$("#idMaturityDateGroup").css('border','');
						$("#idSaveAlternateInvestment").prop("disabled", false);
					}
				} else {
					$("#alertMaturityDate").css('color','');
					$("#alertMaturityDate").text("");
					$("#idMaturityDateGroup").css('border','');
					$("#idSaveAlternateInvestment").prop("disabled", false);
				}
				
			});
			
			
			$(".datepicker-icon").on("click", function () {
				$(this).closest(".input-group").find("input").trigger("focus");
			});
	 } else if(financialAssetTypeId == 4) {
		 //Structured Product
		 $('#RIncome').hide();
		 $('#RIF').hide();
		 $('#RED').hide();
		 $('#IDate').hide();
		 $('#LM').hide();
		 $('#LRDate').hide();
		 $('#divV').hide();
		 $('#AT').hide();
		 $('#AD').hide();
		 $('#divOthers').hide();
		 $('#AD-SP').show();
		 $('#IAmount').show();
		 $('#CMV').show();
		 $('#EMV').show();
		 $('#SPStartDate').show();
		 $('#IMD').show();
		 $('#firstLabelMD').hide();
		 $('#secondLabelMD').show();
		 $('#idButton').show();
		 
		 saveURL = "createClientStructuredProduct/";
		 
		 	// calendar
		 	"use strict";
			$("[data-toggle=\"tooltip\"]").tooltip();
			
			$("#idInvestmentStartDate").datepicker('remove');
			
			$("#idInvestmentStartDate").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true,
				autoclose: true,
				forceParse: false,
				startDate : window.client_dob,
				endDate: new Date()
			}).on('changeDate', function (ev) {
				unmaskAllAmountFields();
				$("#alertIinvestmentStartDate").css('color','');
				$("#alertIinvestmentStartDate").text("");
				$("#idInvestmentStartDateGroup").css('border','');
				$("#idSaveAlternateInvestment").prop("disabled", false);
			});
			
			$("#idInvestmentStartDate").blur(function() {
				unmaskAllAmountFields();
				if ($(this).val() != "") {
					if (!checkValidDate($(this).val())) {
						$("#alertIinvestmentStartDate").css('color','red');
						$("#alertIinvestmentStartDate").text("Date is invalid!");
						$("#idInvestmentStartDateGroup").css('border','2px solid red');
						$("#idSaveAlternateInvestment").prop("disabled", true);
					} else {
						$("#alertIinvestmentStartDate").css('color','');
						$("#alertIinvestmentStartDate").text("");
						$("#idInvestmentStartDateGroup").css('border','');
						$("#idSaveAlternateInvestment").prop("disabled", false);
					}
				} else {
					$("#alertIinvestmentStartDate").css('color','');
					$("#alertIinvestmentStartDate").text("");
					$("#idInvestmentStartDateGroup").css('border','');
					$("#idSaveAlternateInvestment").prop("disabled", false);
				}
				
			});
			
			$("#idMaturityDate").datepicker('remove');
			
			$("#idMaturityDate").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true,
				autoclose: true,
				forceParse: false,
				startDate: new Date(),
				endDate : window.client_lexp
			}).on('changeDate', function (ev) {
				unmaskAllAmountFields();
				$("#alertMaturityDate").css('color','');
				$("#alertMaturityDate").text("");
				$("#idMaturityDateGroup").css('border','');
				$("#idSaveAlternateInvestment").prop("disabled", false);
			});
			
			$("#idMaturityDate").blur(function() {
				unmaskAllAmountFields();
				if ($(this).val() != "") {
					if (!checkValidDate($(this).val())) {
						$("#alertMaturityDate").css('color','red');
						$("#alertMaturityDate").text("Date is invalid!");
						$("#idMaturityDateGroup").css('border','2px solid red');
						$("#idSaveAlternateInvestment").prop("disabled", true);
					} else {
						$("#alertMaturityDate").css('color','');
						$("#alertMaturityDate").text("");
						$("#idMaturityDateGroup").css('border','');
						$("#idSaveAlternateInvestment").prop("disabled", false);
					}
				} else {
					$("#alertMaturityDate").css('color','');
					$("#alertMaturityDate").text("");
					$("#idMaturityDateGroup").css('border','');
					$("#idSaveAlternateInvestment").prop("disabled", false);
				}
				
			});
			
			$(".datepicker-icon").on("click", function () {
				$(this).closest(".input-group").find("input").trigger("focus");
			});
	 }

	populateFamilyMemberByClientId(selectedClientId, $("#familyMemberImage"));

	if (pageMode=="EDIT") {
		
		switch (financialAssetTypeId) {
		    case "1":
		 		getPreciousMetalData();
		 		saveURL = "editClientPreciousMetal/";
		 		if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
		 			$(".dashboardheading").html("Edit Precious Metal/Commodity");	
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View Precious Metal/Commodity Details");
				} 
		        break;
		    case "2":
		 		getVehicleData();
		 		saveURL = "editClientVehicle/";
		 		if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
		 			$(".dashboardheading").html("Edit Vehicle");	
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View Vehicle Details");
				} 	
		        break;
		    case "3":
		    	getOtherAlternateAssetData();
		    	saveURL = "editClientOtherAlternateAsset/";
		    	if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
		    		$(".dashboardheading").html("Edit RE/PE/VCF/AIF Fund");	
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View RE/PE/VCF/AIF Fund Details");
				} 	
		    	break;
		    case "4":
		 		getStructuredProductData();
		 		saveURL = "editClientStructuredProduct/";
		 		if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
		 			$(".dashboardheading").html("Edit Structured Product");	 	
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View Structured Product Details");
				} 
		        break;
		    case "5":
		    	
		 		getREData();
		 		saveURL = "editClientRealEstate/";
		 		if(loggedUser.clientInfoAddEdit === "Y"){
		 			$(".dashboardheading").html("Edit Real Estate");	 		
				}else if(loggedUser.clientInfoView === "Y"){
					$(".dashboardheading").html("View Real Estate Details");
				} 
		        break;
		}				
	}
	
	$("#idSaveAlternateInvestment").on("click", function(event) {
		//alert('In AI Save');
		unmaskAllAmountFields();
		selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");		
		var validate;
				
		switch (financialAssetTypeId) {
	    case "1":
	    	validate = validatePM($('#idAlternateInvestmentsForm'));
	        break;
	    case "2":
			validate = validateVehicle($('#idAlternateInvestmentsForm'));
	        break;
	    case "3":
			validate = validateOthers($('#idAlternateInvestmentsForm'));
	    	break;
	    case "4":
			validate = validateSP($('#idAlternateInvestmentsForm'));
	        break;
	    case "5":
			validate = validateRE($('#idAlternateInvestmentsForm'));
	        break;
		}				

		if (validate){
			showLoaderOnSave("#idSaveAlternateInvestment");
			window.setTimeout(function(){
			if (typeof selectedImageFamilyMemberid != 'undefined' && selectedImageFamilyMemberid!=null) {
				event.preventDefault();
				//alert('Validation through');
				var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				var formData = $('#idAlternateInvestmentsForm').serializeToJSON();
				formData["clientID"]=selectedClientId;
				formData["familyMemberID"]=selectedImageFamilyMemberid;
				formData["financialAssetType"]=financialAssetTypeId;
				if (financialAssetTypeId==3) {
					//alert('Inv Date: '+$('#idDateOfInvestmentOthers').val());
					formData["investmentDate"]=$('#idDateOfInvestmentOthers').val();	
				}
				
				if (pageMode=="EDIT") {
					formData["id"]=selectedAIID;					
				}
				
				var data = JSON.stringify(formData);				
				//getClientDataWithErrorHandling("POST", data, saveURL, onAddAISuccess, onAddAIError);				
				saveData("POST", data, saveURL, onAddAISuccess);
				function onAddAISuccess(data) {
					hideLoaderOnSave("#idSaveAlternateInvestment");
					console.log("Saved AI id = " + data.id);					
   				    serviceurl = "viewAlternateInvestmentsList/" + selectedClientId;
					getClientData("GET", "", serviceurl, onSuccess);
					function onSuccess(data){
						$("#idClient").empty();
						sessionStorage.setItem("ALTERNATE_INVESTMENT_LIST", JSON.stringify(data));
						$("#idClient").load("clientInfo/viewAlternateInvestment.html");
						$(".dashboardheading    ").html("");
						$(".dashboardheading    ").html("Alternate Investments");
						$("#addRecord").removeClass('btn_Disabled');
						$('#editRecord').addClass('btn_Disabled');
						$('#deleteRecord').addClass('btn_Disabled');
					}
				} 
				
				/*function onAddAIError(data) {
					$("#alertform").text("Error saving Alternate Investments information. Please try after sometime or contact system administrator.");
					$(window).scrollTop(0);
					hideLoaderOnSave("#idSaveAlternateInvestment");
				}*/

			} else {
				alert("Please select a Family Member");
				return false;
			}
			 }, 5000);	
		}		
	});
	
	setFocusByAssetType();
	
	$('#focusguard-2').on('focus', function() {
		// "last" focus guard got focus: set focus to the first field
		setFocusByAssetType();
		$(window).scrollTop(0);
	});	
});

function myDatePicker() {
	$("#idDateOfInvestment").datepicker('remove');
	$("#idExpectedLienReleaseDate").datepicker('remove');
	$("#idMaturityDate").datepicker('remove');
	$("#idDateOfInvestmentOthers").datepicker('remove');
	$("#idInvestmentStartDate").datepicker('remove');
	if (pageMode=="EDIT") {
		$("#idDateOfInvestment").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: false,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
		}).on('changeDate', function (ev) {
			$("#alertIDate").css('color','');
			$("#alertIDate").text("");
			$("#idDateOfInvestmentGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
		
		$("#idExpectedLienReleaseDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: false,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate: window.client_dob,
			endDate: window.client_lexp,
		}).on('changeDate', function (ev) {
			$("#alertExpectedLienReleaseDate").css('color','');
			$("#alertExpectedLienReleaseDate").text("");
			$("#idExpectedLienReleaseDateGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
		
		$("#idMaturityDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: false,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate: new Date(),
			endDate: window.client_lexp,
		}).on('changeDate', function (ev) {
			unmaskAllAmountFields();
			$("#alertMaturityDate").css('color','');
			$("#alertMaturityDate").text("");
			$("#idMaturityDateGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
		
		$("#idDateOfInvestmentOthers").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: false,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
		}).on('changeDate', function (ev) {
			$("#alertIDateOfInvestmentOthers").css('color','');
			$("#alertIDateOfInvestmentOthers").text("");
			$("#idDateOfInvestmentOthersGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
		
		$("#idInvestmentStartDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: false,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
		}).on('changeDate', function (ev) {
			$("#alertIinvestmentStartDate").css('color','');
			$("#alertIinvestmentStartDate").text("");
			$("#idInvestmentStartDateGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
		
	} else {
		$("#idDateOfInvestment").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
		}).on('changeDate', function (ev) {
			$("#alertIDate").css('color','');
			$("#alertIDate").text("");
			$("#idDateOfInvestmentGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
		
		$("#idExpectedLienReleaseDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate: window.client_dob,
			endDate: window.client_lexp,
		}).on('changeDate', function (ev) {
			$("#alertExpectedLienReleaseDate").css('color','');
			$("#alertExpectedLienReleaseDate").text("");
			$("#idExpectedLienReleaseDateGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
		
		$("#idMaturityDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate: new Date(),
			endDate: window.client_lexp,
		}).on('changeDate', function (ev) {
			unmaskAllAmountFields();
			$("#alertMaturityDate").css('color','');
			$("#alertMaturityDate").text("");
			$("#idMaturityDateGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
		
		$("#idDateOfInvestmentOthers").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
		}).on('changeDate', function (ev) {
			$("#alertIDateOfInvestmentOthers").css('color','');
			$("#alertIDateOfInvestmentOthers").text("");
			$("#idDateOfInvestmentOthersGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
		
		$("#idInvestmentStartDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
		}).on('changeDate', function (ev) {
			$("#alertIinvestmentStartDate").css('color','');
			$("#alertIinvestmentStartDate").text("");
			$("#idInvestmentStartDateGroup").css('border','');
			$("#idSaveAlternateInvestment").prop("disabled", false);
		});
	}
	
}

function getPreciousMetalData() {
	//getClientDataWithErrorHandling("GET", "", "clientPreciousMetal/"+selectedAIID, onGetPreciousMetalSuccess, onGetPreciousMetalError);
	getClientData("GET", "", "clientPreciousMetal/"+selectedAIID, onGetPreciousMetalSuccess);
	function onGetPreciousMetalSuccess(data) {
		$("#idAssetType option").filter(function() {
				return this.value==data.assetTypeId;			    
		}).prop('selected', true);

		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberID)
		poupulateFamilyMemberImage(data.familyMemberID);
		populateForm($('#idAlternateInvestmentsForm'),data);
		myDatePicker();
		maskAllAmountFields();
		
	}	
	
	/*function onGetPreciousMetalError(data) {
		$("#idClient").load("resources/errorPage.html");
		$(".dashboardheading    ").html("Error Page");
	    $("#addRecord").hide();
	    $('#editRecord').hide();
	    $('#deleteRecord').hide();
	}*/
}

function getVehicleData() {
	//getClientDataWithErrorHandling("GET", "", "clientVehicle/"+selectedAIID, onGetVehiclesSuccess, onGetVehicleError);	
	getClientData("GET", "", "clientVehicle/"+selectedAIID, onGetVehiclesSuccess);
	function onGetVehiclesSuccess(data) {
		$("#idAssetType option").filter(function() {
			return this.value==data.assetTypeId;
		    
		}).prop('selected', true);

		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberID)
		poupulateFamilyMemberImage(data.familyMemberID);
		populateForm($('#idAlternateInvestmentsForm'),data);
		maskAllAmountFields();
	}
	
	/*function onGetVehicleError(data) {
		$("#idClient").load("resources/errorPage.html");
		$(".dashboardheading    ").html("Error Page");
	    $("#addRecord").hide();
	    $('#editRecord').hide();
	    $('#deleteRecord').hide();
	}*/
}

function getOtherAlternateAssetData() {
	//getClientDataWithErrorHandling("GET", "", "clientOtherAlternateAsset/"+selectedAIID, onGetOthersSuccess, onGetOthersError);
	getClientData("GET", "", "clientOtherAlternateAsset/"+selectedAIID, onGetOthersSuccess);
	function onGetOthersSuccess(data) {
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberID)
		poupulateFamilyMemberImage(data.familyMemberID);
		populateForm($('#idAlternateInvestmentsForm'),data);
		myDatePicker();
		maskAllAmountFields();
	}	
	
	/*function onGetOthersError(data) {
		$("#idClient").load("resources/errorPage.html");
		$(".dashboardheading    ").html("Error Page");
	    $("#addRecord").hide();
	    $('#editRecord').hide();
	    $('#deleteRecord').hide();
	}*/
}

function getStructuredProductData() {
	//getClientDataWithErrorHandling("GET", "", "clientStructuredProduct/"+selectedAIID, onGetSPSuccess, onGetSPError);
	getClientData("GET", "", "clientStructuredProduct/"+selectedAIID, onGetSPSuccess);
	function onGetSPSuccess(data) {
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberID)
		poupulateFamilyMemberImage(data.familyMemberID);
		populateForm($('#idAlternateInvestmentsForm'),data);
		myDatePicker();
		maskAllAmountFields();
	}
	
	/*function onGetSPError(data) {
		$("#idClient").load("resources/errorPage.html");
		$(".dashboardheading    ").html("Error Page");
	    $("#addRecord").hide();
	    $('#editRecord').hide();
	    $('#deleteRecord').hide();
	}*/
}

function getREData() {
	//getClientDataWithErrorHandling("GET", "", "clientRealEsate/"+selectedAIID, onGetRESuccess, onGetREError);	
	getClientData("GET", "", "clientRealEsate/"+selectedAIID, onGetRESuccess);
	function onGetRESuccess(data) {
		console.log(data);
		$("#idAssetType option").filter(function() {
			return this.value==data.assetTypeId;					    
		}).prop('selected', true);

		$("#idRealEstateDescription option").filter(function() {
			return this.value==data.description;					    
		}).prop('selected', true);
		
		$("#idRIF option").filter(function() {
			return this.value==data.rentalFrequency;					    
		}).prop('selected', true);
		if(data.assetTypeId==2){
			 $('#RIF').hide();
			 $('#RIncome').hide();
		}

		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberID)
		poupulateFamilyMemberImage(data.familyMemberID);
		populateForm($('#idAlternateInvestmentsForm'),data);
		myDatePicker();
		maskAllAmountFields();
	}	
	
	/*function onGetREError(data) {
		$("#idClient").load("resources/errorPage.html");
		$(".dashboardheading    ").html("Error Page");
	    $("#addRecord").hide();
	    $('#editRecord').hide();
	    $('#deleteRecord').hide();
	}*/
}

function setFocusByAssetType() {
	//alert('I am in setFocusByAssetType() '+financialAssetTypeId);
	switch (financialAssetTypeId) {
	    case "1":
	 		$("#idAssetType").focus();
	        break;
	    case "2":
	 		$("#idAssetType").focus();
	        break;
	    case "3":
	 		$("#idFundDescription").focus();
	        break;
	    case "4":
	 		$("#idDateOfInvestment").focus();
	        break;
	    case "5":
	 		$("#idAssetType").focus();
	        break;
	}		
}

function displayAuto(){
	
	var lAssetType = document.getElementById("idAssetType");
	var lAssetTypeSelected = lAssetType.options[lAssetType.selectedIndex].value; 
	
	if (financialAssetTypeId == 5){
		if (lAssetTypeSelected==2){
			 $('#RIF').hide();
			 $('#RIncome').hide();
		} else {
			if (lAssetTypeSelected==1){
				 $('#RIF').show();
				 $('#RIncome').show();
			}
		}
	}
	
}

function confirmationClick(){
	$('#myModal').modal('hide'); 
	
	if(financialAssetTypeID == 5){
		deleteSelectedRecord( ClientServiceUrl+"clientRealEstateDelete/"+ sessionStorage.getItem("SELECTED_AI_ASSET_TYPE_ID"));
	}
	
	if(financialAssetTypeID == 1){
		deleteSelectedRecord( ClientServiceUrl+"clientPreciousMetalsDelete/"+ sessionStorage.getItem("SELECTED_AI_ASSET_TYPE_ID"));
	}
	
	if(financialAssetTypeID == 2){
		deleteSelectedRecord( ClientServiceUrl+"clientVehicleDelete/"+ sessionStorage.getItem("SELECTED_AI_ASSET_TYPE_ID"));
	}
	
	if(financialAssetTypeID == 3){
		deleteSelectedRecord( ClientServiceUrl+"clientOtherAlternateAssetDelete/"+ sessionStorage.getItem("SELECTED_AI_ASSET_TYPE_ID"));
	}
	
	if(financialAssetTypeID == 4){
		deleteSelectedRecord( ClientServiceUrl+"clientStructuredProductDelete/"+ sessionStorage.getItem("SELECTED_AI_ASSET_TYPE_ID"));
	}
	
	$("#idClient").load("clientInfo/viewAlternateinvestments.html");
	 $(".dashboardheading    ").html("");
     $(".dashboardheading    ").html("View Alternate Investments");
     $("#addRecord").removeClass('btn_Disabled');
     $('#editRecord').addClass('btn_Disabled');
     if (data.id == 0) { $('#idRadioStart').show(); }
}	


	
function onCustomImageClick(){  
    selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
    var serviceurl = '/clientFamilyMember/'+selectedImageFamilyMemberid;
    getClientData("GET", "", serviceurl, onSuccess);
    function onSuccess(data) {
        ///console.log(data);
    	
    	if(data.lifeExpectancy==null){
    		var years=100;
    		window.client_dob = moment(data.birthDate,'DD/MM/YYYY').toDate();
    		window.client_lexp = moment(window.client_dob).add(years, 'years').toDate();
    	}else{
    	     
    		 window.months = (parseInt(data.lifeExpectancy) * 12); 
             window.client_dob = moment(data.birthDate,'DD/MM/YYYY').toDate();
             window.client_lexp = moment(window.client_dob).add(window.months, 'months').toDate();
             
    	}
    	/* window.months = (parseInt(data.lifeExpectancy) * 12); 
         window.client_dob = moment(data.birthDate,'DD/MM/YYYY').toDate();
         window.client_lexp = moment(window.client_dob).add(window.months, 'months').toDate();*/
         
    	 $("#idDateOfInvestment").datepicker('remove'); 
         
    	 $("#idDateOfInvestment").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			//forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
		});
    	 
    	 $("#idExpectedLienReleaseDate").datepicker('remove'); 
		
		$("#idExpectedLienReleaseDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			//forceParse: false,
			startDate: window.client_dob,
			endDate: window.client_lexp,
		});
		
		$("#idDateOfInvestmentOthers").datepicker('remove');
		
		$("#idDateOfInvestmentOthers").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			//forceParse: false,
			startDate : window.client_dob,
			endDate: new Date()
		});
		
		$("#idMaturityDate").datepicker('remove');
		
		$("#idMaturityDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			//forceParse: false,
			startDate: new Date(),
			endDate: window.client_lexp,
		});
    	 
         
    }
}

$("#undo").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});

function undoChange(){
	updateUNDO();
	
	if (pageMode=="ADD") {
		
		if (financialAssetTypeId == 2) {
			$(".form-control").val("");
			$("#idAssetType").val(2);
		} else {
			if (financialAssetTypeId == 3) {
				$(".form-control").val("");
			} else {
				if (financialAssetTypeId == 4) {
					$(".form-control").val("");
				} else {
					if (financialAssetTypeId == 1) {
						$(".form-control").val("");
					} else {
						if (financialAssetTypeId == 5) {
							$(".form-control").val("");
						} 
					}
				}
			}
		}
		
	} else {
		if(pageMode=="EDIT"){
			if(financialAssetTypeId == 5){
				getREData();
			}
			
			if(financialAssetTypeId == 1){
				getPreciousMetalData();
			}
			
			if(financialAssetTypeId == 2){
				getVehicleData();
			}
			
			if(financialAssetTypeId == 3){
				getOtherAlternateAssetData();
			}
			
			if(financialAssetTypeId == 4){
				getStructuredProductData();
			}
		}
	}
}

function updateUNDO(){
	
	if(financialAssetTypeId == "5"){
		
		var lAssetType = document.getElementById("idAssetType");
		var lDescription = document.getElementById("idRealEstateDescription");
		var lRentalIncome = document.getElementById("idRentalIncome");
		var lRentalIncomeFrequency = document.getElementById("idRIF");
		var lInvestmentAmount = document.getElementById("idInvestmentAmount");
		var lInvestmentDate = document.getElementById("idDateOfInvestment");
		var lInvestmentDateGroup = document.getElementById("idDateOfInvestmentGroup");
		var lCurrentValue = document.getElementById("idCurrentValue");
		var lLienMarked = document.getElementById("idLienMarked")
		var lExpectedLienReleaseDate = document.getElementById("idExpectedLienReleaseDate");
		var lExpectedLienReleaseDateGroup = document.getElementById("idExpectedLienReleaseDateGroup");
		
		
		lAssetType.style.border = "";
		lDescription.style.border = "";
		lRentalIncome.style.border = "";
		lRentalIncomeFrequency.style.border = "";
		lInvestmentAmount.style.border = "";
		lInvestmentDateGroup.style.border = "";
		lInvestmentDateGroup.style.borderRadius = "";
		lCurrentValue.style.border = "";
		lLienMarked.style.border = "";
		lExpectedLienReleaseDateGroup.style.border = "";
		lExpectedLienReleaseDateGroup.style.borderRadius = "";
		
		
		document.getElementById('alertAssetType').innerHTML="";
		document.getElementById('alertDescription').innerHTML="";
		document.getElementById('alertRentalIncome').innerHTML="";
		document.getElementById('alertRif').innerHTML="";
		document.getElementById('alertAmount').innerHTML="";
		document.getElementById('alertIDate').innerHTML="";
		document.getElementById('alertCurrentValue').innerHTML="";
		document.getElementById('alertLienMarked').innerHTML="";
		document.getElementById('alertExpectedLienReleaseDate').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	if(financialAssetTypeId == "1"){
		var lAssetType = document.getElementById("idAssetType");
		var lInvestmentAmount = document.getElementById("idInvestmentAmount");
		var lInvestmentDate = document.getElementById("idDateOfInvestment");
		var lInvestmentDateGroup = document.getElementById("idDateOfInvestmentGroup");
		var lCurrentValue = document.getElementById("idCurrentValue");
		var lAssetDescription = document.getElementById("idAssetDescription");
		
		lAssetType.style.border = "";
		lInvestmentAmount.style.border = "";
		lInvestmentDateGroup.style.border = "";
		lInvestmentDateGroup.style.borderRadius = "";
		lCurrentValue.style.border = "";
		lAssetDescription.style.border = "";
		
		
		document.getElementById('alertAssetType').innerHTML="";
		document.getElementById('alertAmount').innerHTML="";
		document.getElementById('alertIDate').innerHTML="";
		document.getElementById('alertCurrentValue').innerHTML="";
		document.getElementById('alertAssetDescription').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	
	if(financialAssetTypeId == "2"){
		var lAssetType = document.getElementById("idAssetType");
	    var lCurrentValue = document.getElementById("idCurrentValue");
		
		lAssetType.style.border = "";
		lCurrentValue.style.border = "";
		
		document.getElementById('alertAssetType').innerHTML="";
		document.getElementById('alertCurrentValue').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	
	if(financialAssetTypeId == "3"){
		var lSchemeName = document.getElementById("idSchemeName");
		var lTotalInvestmentAmount = document
				.getElementById("idTotalInvestmentAmount");
		var lTotalDrawdownAmount = document.getElementById("idTotalDrawdownAmount");
		var lOutstandingAmount = document.getElementById("idOutstandingAmount");
		var lInvestmentDate = document.getElementById("idDateOfInvestmentOthers");
		var lInvestmentDateGroup = document
				.getElementById("idDateOfInvestmentOthersGroup");
		var lFlag = document.getElementById("idCloseEndedFlag");
		var lMaturityDate = document.getElementById("idMaturityDate");
		var lMaturityDateGroup = document.getElementById("idMaturityDateGroup");
		var lCurrentMarketValue = document.getElementById("idCurrentMarketValue");

		lSchemeName.style.border = "";
		lTotalInvestmentAmount.style.border = "";
		lTotalDrawdownAmount.style.border = "";
		lOutstandingAmount.style.border = "";
		lInvestmentDateGroup.style.border = "";
		lInvestmentDateGroup.style.borderRadius = "";
		lFlag.style.border = "";
		lMaturityDateGroup.style.border = "";
		lMaturityDateGroup.style.borderRadius = "";
		lCurrentMarketValue.style.border = "";

		document.getElementById('alertSchemeName').innerHTML = "";
		document.getElementById('alertTotalInvestmentAmount').innerHTML = "";
		document.getElementById('alertTotalDrawdownAmount').innerHTML = "";
		document.getElementById('alertOutstandingAmount').innerHTML = "";
		document.getElementById('alertIDate').innerHTML = "";
		document.getElementById('alertFlag').innerHTML = "";
		document.getElementById('alertMaturityDate').innerHTML = "";
		document.getElementById('alertCurrentMarketValue').innerHTML = "";
		document.getElementById('alertIDateOfInvestmentOthers').innerHTML = "";
		document.getElementById('alertform').innerHTML = "";

	}

	if(financialAssetTypeId == "4"){
		var lInvestmentAmount = document.getElementById("idInvestmentAmount");
		var lCurrentValue = document.getElementById("idCurrentValue");
		var lExpectedMaturityValue = document.getElementById("idExpectedMaturityValue");
		
		var lInvestmentDate = document.getElementById("idInvestmentStartDate");
		var lInvestmentDateGroup = document.getElementById("idInvestmentStartDateGroup");
		
		var lMaturityDate = document.getElementById("idMaturityDate");
		var lMaturityDateGroup = document.getElementById("idMaturityDateGroup");
		var lAssetDescriptionSP = document.getElementById("idAssetDescriptionSP");
		
		lInvestmentAmount.style.border = "";
		lCurrentValue.style.border = "";
		lExpectedMaturityValue.style.border = "";
		
		lInvestmentDateGroup.style.border = "";
		lInvestmentDateGroup.style.borderRadius = "";
		
		lMaturityDateGroup.style.border = "";
		lMaturityDateGroup.style.borderRadius = "";
		lAssetDescriptionSP.style.border = "";
		
		document.getElementById('alertAmount').innerHTML="";
		document.getElementById('alertCurrentValue').innerHTML="";
		document.getElementById('alertExpectedMaturityValue').innerHTML="";
		document.getElementById('alertIinvestmentStartDate').innerHTML="";
		document.getElementById('alertAssetDescriptionSP').innerHTML="";
		document.getElementById('alertform').innerHTML="";
	}
	

}

function maskAllAmountFields() {
	if (financialAssetTypeId == "3") { 
		maskAmount('#idTotalInvestmentAmount');
		maskAmount('#idTotalDrawdownAmount');
		maskAmount('#idOutstandingAmount');
		maskAmount('#idTotalPAR');
		maskAmount('#idTotalIAR');
		maskAmount('#idCurrentMarketValue');
	}	
	if (financialAssetTypeId == "4") { 
		maskAmount('#idExpectedMaturityValue');
		maskAmount('#idInvestmentAmount');
		maskAmount('#idCurrentValue');
	}	
	if (financialAssetTypeId == "5") { 
		maskAmount('#idRentalIncome');
		maskAmount('#idInvestmentAmount');
		maskAmount('#idCurrentValue');
	}
	if (financialAssetTypeId == "1") { 
		maskAmount('#idInvestmentAmount');
		maskAmount('#idCurrentValue');
		}
	if (financialAssetTypeId == "2") { 
		maskAmount('#idCurrentValue');
		}	
}

function unmaskAllAmountFields() {
	if (financialAssetTypeId == "3") { 
		unmaskAmount('#idTotalInvestmentAmount');
		unmaskAmount('#idTotalDrawdownAmount');
		unmaskAmount('#idOutstandingAmount');
		unmaskAmount('#idTotalPAR');
		unmaskAmount('#idTotalIAR');
		unmaskAmount('#idCurrentMarketValue');
	}	
	if (financialAssetTypeId == "4") { 
		unmaskAmount('#idExpectedMaturityValue');
		unmaskAmount('#idInvestmentAmount');
		unmaskAmount('#idCurrentValue');
	}	
	if (financialAssetTypeId == "5") { 
		unmaskAmount('#idRentalIncome');
		unmaskAmount('#idInvestmentAmount');
		unmaskAmount('#idCurrentValue');
	}
	if (financialAssetTypeId == "1") { 
		unmaskAmount('#idInvestmentAmount');
		unmaskAmount('#idCurrentValue');
		}
	if (financialAssetTypeId == "2") { 
		unmaskAmount('#idCurrentValue');
		}	
}

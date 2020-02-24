var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");	
var retirementStatus; 
var retirementStatusEdit;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;

	if(loggedUser == null){
		loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	} else{
		loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}

var pageMode = sessionStorage.getItem("PAGE_MODE");		
var financialAssetTypeId = sessionStorage.getItem("SELECTED_ROS_ASSET_TYPE"); 
var selectedROSID = sessionStorage.getItem("SELECTED_ROS_ID");
var saveURL;
var fmImageID;
var prevStartDate="";
var Selected_Client;
Selected_Client = JSON.parse(sessionStorage.getItem("SELECTED_CLIENT_ID"));
sessionStorage.setItem("CLIENT_SERVICE_URL", ClientServiceUrl);
var user_dt;
var client_dob;
var client_lexp;
var spouse_lexp;
var son_lexp;
var daughter_lexp;
var father_lexp;
var mother_lexp;
var brother_lexp;
var sister_lexp;
var other_lexp;
var months;
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
var selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
$(document).ready(function() {
	
	//alert(loggedClient.clientInfoView)
	
	//new code for access rights
	if(loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				//alert("edit yes")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			} else if(loggedClient.clientInfoView === "Y"){
				//alert("edit no, view yes")
				console.log($("#idSaveROS"));
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	} else if(loggedUser.role === "Admin"){
			$("#idSaveROS").hide();
			$("#idUndoROS").hide();
	} else{
			if(loggedUser.clientInfoAddEdit === "Y"){
				//alert("also here")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			}else if(loggedUser.clientInfoView === "Y"){
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	}
	
	retirementStatus = sessionStorage.getItem("SELECTED_CLIENT_RETIREMENT_STATUS");
	months = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
	client_dob = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
	client_lexp = moment(client_dob).add(months, 'months').toDate();
	
	var options =  {
	      onComplete: function(cep) {        
	         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
	         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
	      },
	      onKeyPress: function(cep, event, currentField, options){},
	      onChange: function(cep){},
	      onInvalid: function(val, e, f, invalid, options){}
    };
    	    
    $('#idExtensionStartDate').mask('00/00/0000',options);
    
     var options =  {
  	      onComplete: function(cep) {        
  	         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
  	         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
  	      },
  	      onKeyPress: function(cep, event, currentField, options){},
  	      onChange: function(cep){},
  	      onInvalid: function(val, e, f, invalid, options){}
      };
      	    
      $('#idStartDate').mask('00/00/0000',options);
      
      var options =  {
      	      onComplete: function(cep) {        
      	         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
      	         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
      	      },
      	      onKeyPress: function(cep, event, currentField, options){},
      	      onChange: function(cep){},
      	      onInvalid: function(val, e, f, invalid, options){}
          };
          	    
          $('#idAnnuityStartDate').mask('00/00/0000',options);
          
      var options =  {
      	      onComplete: function(cep) {        
      	         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
      	         //window.ln_start_dt_isvalid = isDateBetwenRange(window.client_dob, new Date() ,window.given_start_date);
      	      },
      	      onKeyPress: function(cep, event, currentField, options){},
      	      onChange: function(cep){},
      	      onInvalid: function(val, e, f, invalid, options){}
          };
          	    
          $('#idApyStartDate').mask('00/00/0000',options);
        
	switch (financialAssetTypeId) {
		case "12":
			showPPF();
			break;
		case "13":
			showEPF();
			break;
		case "14":
			showNPS();
			break;
		case "33":
			showAPY();
			break;
		case "34":
			showAnnuity();
			break;
	}
	
	

	if (pageMode=="EDIT") {
		$(".dashboardheading").html(""); 
	
		switch (financialAssetTypeId) {
		    case "12":
		 		getPPF();
		 		saveURL = "editClientPPF/";
		 		if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
		 			$(".dashboardheading").html("Edit PPF");
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View PPF Details");
				} 		
		        break;
		    case "13":
		 		getEPF();
		 		saveURL = "editClientEPF/";
		 		if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
		 			$(".dashboardheading").html("Edit EPF");
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View EPF Details");
				}
		        break;
		    case "14":
		    	getNPS();
		    	saveURL = "editClientNPS/";
		    	if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
		    		$(".dashboardheading").html("Edit NPS");
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View NPS Details");
				}
		    	break;
		    case "33":
		 		getAPY();
		 		if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
		 			$(".dashboardheading").html("Edit Atal Pension Yojana");
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View Atal Pension Yojana Details");
				}
				break;
		    case "34":
		 		getAnnuity();
		 		saveURL = "editclientAnnuity/";
		 		if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
		 			$(".dashboardheading").html("Edit Annuity");
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View Annuity Details");
				} 		
		        break;
		}
	}	
			
	$("#idSaveROS").on("click",function(event) {
	
		unmaskAllAmountFields();
		var validate;
		
		switch (financialAssetTypeId) {
			case "12":
				validate=validatePPF($('#idAddRetirementForm'));
				break;
			case "13":
				validate=validateEPF($('#idAddRetirementForm'));
				break;
			case "14":
				validate=validateNPS($('#idAddRetirementForm'));
				break;
			case "33":
				validate=validateAPY($('#idAddRetirementForm'));
				break;
			case "34":
				validate=validateAnnuity($('#idAddRetirementForm'));
				break;
		}
		if (pageMode=="ADD") {
			var selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
		}else{
			var selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FM_ID");
		}
		
		var checkFlag = 0;
		
		if(validate){			
			if (typeof selectedImageFamilyMemberid != 'undefined') {
				event.preventDefault();
				var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
				var formData = $('#idAddRetirementForm').serializeToJSON();
				formData["clientID"] = selectedClientId;
				formData["familyMemberID"] = selectedImageFamilyMemberid;
				formData["financialAssetType"] = financialAssetTypeId;
				formData["monthlyBasicDA"] = $('#idMonthlyBasicDA').val();
				
				if (pageMode=="EDIT") {
					formData["id"]=selectedROSID;	
					var data = JSON.stringify(formData);
				}
				var data = JSON.stringify(formData);
				if(formData.annuityType == "6"){
					 getClientDataAsyncFalse("GET", "", "clientAnnuity/client/"+sessionStorage.getItem("SELECTED_CLIENT_ID"), checkAnnuitySuccess);
						function checkAnnuitySuccess(data) {
							if(data.length > 0){
								$.each(data, function (index, client) {
								if(client.annuityType === 6) {
										 checkFlag = 1;
										 $("#idSaveROS").prop("disabled", true);
										 bootbox.alert({ 
											  message: "Cannot Add Annuity since a record with EPS Annuity type already exists!", 
											  callback: function(){ 
												  var pageUrl = "clientInfo/addROSHeader.html";
												  addPage(pageUrl,"Add Retirement Oriented Schemes");   
											       }
											   });  
									         }
									    });
								     } 	
					             }
				             }else{
				            	 checkFlag = 0;
				             }
				
					if(checkFlag === 0) {
						 showLoaderOnSave("#idSaveROS");
						 window.setTimeout(function(){
						 saveData("POST", data,saveURL,onCreateROSSuccess);
					     function onCreateROSSuccess(data) {
						
						sessionStorage.removeItem("ANNUITY_TYPE");
						sessionStorage.setItem("ANNUITY_TYPE", data.annuityType);
						
						hideLoaderOnSave("#idSaveROS");
						selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
						serviceurl = "/viewROSList/" + selectedClientId;
						getClientData("GET", "", serviceurl, onSuccess);
						 function onSuccess(data)
						 {
							 sessionStorage.setItem("RETIREMENT_SCHEMES_LIST", JSON.stringify(data));
				    		 $("#idClient").empty();
							 $("#idClient").load("clientInfo/viewRetirementScheme.html");
							 $(".dashboardheading").html("");
							 $(".dashboardheading").html("Retirement Oriented Scheme");
						 }
					  }	
				   }, 1000);
				}
				 
			}else {
				return false;
			}
		
		}
	});
	
	$('#focusguard-2').on('focus', function() {
		switch (financialAssetTypeId) {
			case "12":
				$("#idCurrentBalance").focus();
				break;
			case "13":
				$("#idEpfCurrentBalance").focus();
				break;
			case "14":
				$("#idNpsCurrentBalance").focus();
				break;
			case "33":
				$("#idInvestmentFrequency").focus();
				break;
			case "34":
				$("#idPensionableCorpus").focus();
				break;
		}			
		$(window).scrollTop(0);
	});		
	
	
	
	$("#idStartDate").datepicker('remove'); 
	 
	$("#idStartDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false,
		startDate: window.client_dob,
		endDate: new Date()
	}).on('changeDate', function(ev){
		unmaskAllAmountFields();
		var birthDate = sessionStorage.getItem("SELECTED_CLIENT_DOB");
		var birthDay = birthDate.slice(0,2);
		var birthMonth = birthDate.slice(3,5);
		var birthYear = birthDate.slice(6);
		var BirthDateReformatted  = birthYear.concat("-", birthMonth, "-", birthDay);
		var date = new Date(BirthDateReformatted);
		var selectedBirthDate=new Date(date.toString());
		
		var startDate = $(this).val();
		
		if (startDate != "") {
			var day = startDate.slice(0,2);
			var month = startDate.slice(3,5);
			var year = startDate.slice(6);
			
			var StartDateReformatted  = year.concat("-", month, "-", day);
			var startdate = new Date(StartDateReformatted);
			var selectedStartDate=new Date(startdate.toString());
			
			if (selectedStartDate < selectedBirthDate) {
				$("#alertppfsd").css('color','red');
				$("#alertppfsd").text("Date is invalid! Must not be before Date of Birth.");
				$("#idPPFStartDateGroup").css('border','2px solid red');
				$("#idSaveROS").prop("disabled", true);
			} else {
				if (year < birthYear || !checkValidDate($(this).val())) {
					$("#alertppfsd").css('color','red');
					$("#alertppfsd").text("Date is invalid!");
					$("#idPPFStartDateGroup").css('border','2px solid red');
					$("#idSaveROS").prop("disabled", true);
				} else {
					$("#alertppfsd").css('color','');
					$("#alertppfsd").text("");
					$("#idPPFStartDateGroup").css('border','');
					$("#idSaveROS").prop("disabled", false);
					unmaskAmount('#idCurrentBalance');
					unmaskAmount('#idPlannedDepositAmount');
					var data = JSON.stringify($('#idAddRetirementForm').serializeToJSON());
					getClientData("POST", data,"calculatePPFMaturityDate", onCalculateSuccess);
					function onCalculateSuccess(data) {
						$("#idMaturityDate").val(data.displayDate);
						maskAmount('#idCurrentBalance');
						maskAmount('#idPlannedDepositAmount');
						//For solving JIRA: CIUAT-737
							var day = $("#idMaturityDate").val().slice(0,2);
							var month = $("#idMaturityDate").val().slice(3,5);
							var year = $("#idMaturityDate").val().slice(6);
							var DateReformatted  = year.concat("-", month, "-", day);
							var dateMaturity = new Date(DateReformatted);
							var selectedDateMaturity = new Date(dateMaturity.toString());
							var dayCurrent = moment().format('DD/MM/YYYY').slice(0,2);
							var monthCurrent = moment().format('DD/MM/YYYY').slice(3,5);
							var yearCurrent = moment().format('DD/MM/YYYY').slice(6);
							var currentDateReformatted  = yearCurrent.concat("-", monthCurrent, "-", dayCurrent);
							var currentDate = new Date(currentDateReformatted);
							var selectedCurrentDate=new Date(currentDate.toString());
							if (selectedDateMaturity < selectedCurrentDate) {
								$("#idPPFExtensionY").attr("checked", true);
								$("#idPPFYesExtensionDiv").show();
							}
							if ($("#idPPFExtensionY").val() == "Y") {
								var dayExtStartDate = "01";
								var monthExtStartDate = "04";
								var yearExtStartDate = $("#idMaturityDate").val().slice(6);
								var ExtStartDateReformatted = dayExtStartDate.concat("/", monthExtStartDate, "/", yearExtStartDate);
								$("#idExtensionStartDate").val(ExtStartDateReformatted);
								
								var concatedDashExtensionStartDate = yearExtStartDate.concat("-", monthExtStartDate, "-", dayExtStartDate);
								var dateConcatedDashExtensionStartDate = new Date(concatedDashExtensionStartDate);
								var selectedConcatedDashExtensionStartDate = new Date(dateConcatedDashExtensionStartDate.toString());
								serviceurl = "clientPPF/getPPFInterestRate/"+selectedConcatedDashExtensionStartDate;
								getClientDataWithErrorHandling("GET", "", serviceurl, foundExtIRSuccess, foundExtIRError);

								function foundExtIRSuccess(data) {
									$("#idExtensionInterestRate").val((data*100).toFixed(2));
								}
								function foundExtIRError(error){
									
									$("#alertppfesd").text('Interest Rate does not exist for given extension start date.');
									$("#idExtPPFStartDateGroup").css('border','2px solid red');				
									$("#idExtPPFStartDateGroup").css('borderRadius','7px');				
								    $("#idExtensionStartDate").focus().datepicker('hide');						
									$("#idExtensionInterestRate").val('');
								}
							}
					}
				}
			}
		} else {
			$("#alertppfsd").css('color','');
			$("#alertppfsd").text("");
			$("#idPPFStartDateGroup").css('border','');
			$("#idSaveROS").prop("disabled", false);
		}
		maskAllAmountFields();
	});
	
	$("#idStartDate").blur(function() {
		unmaskAllAmountFields();
		var birthDate = sessionStorage.getItem("SELECTED_CLIENT_DOB");
		var birthDay = birthDate.slice(0,2);
		var birthMonth = birthDate.slice(3,5);
		var birthYear = birthDate.slice(6);
		var BirthDateReformatted  = birthYear.concat("-", birthMonth, "-", birthDay);
		var date = new Date(BirthDateReformatted);
		var selectedBirthDate=new Date(date.toString());
		
		var startDate = $(this).val();
		
		if (startDate != "") {
			var day = startDate.slice(0,2);
			var month = startDate.slice(3,5);
			var year = startDate.slice(6);
			
			var StartDateReformatted  = year.concat("-", month, "-", day);
			var startdate = new Date(StartDateReformatted);
			var selectedStartDate=new Date(startdate.toString());
			
			if (selectedStartDate < selectedBirthDate) {
				$("#alertppfsd").css('color','red');
				$("#alertppfsd").text("Date is invalid! Must not be before Date of Birth.");
				$("#idPPFStartDateGroup").css('border','2px solid red');
				$("#idSaveROS").prop("disabled", true);
			} else {
				if (year < birthYear || !checkValidDate($(this).val())) {
					$("#alertppfsd").css('color','red');
					$("#alertppfsd").text("Date is invalid!");
					$("#idPPFStartDateGroup").css('border','2px solid red');
					$("#idSaveROS").prop("disabled", true);
				} else {
					$("#alertppfsd").css('color','');
					$("#alertppfsd").text("");
					$("#idPPFStartDateGroup").css('border','');
					$("#idSaveROS").prop("disabled", false);
					unmaskAmount('#idCurrentBalance');
					unmaskAmount('#idPlannedDepositAmount');
					var data = JSON.stringify($('#idAddRetirementForm').serializeToJSON());
					getClientData("POST", data,"calculatePPFMaturityDate", onCalculateSuccess);
					function onCalculateSuccess(data) {
						$("#idMaturityDate").val(data.displayDate);
						maskAmount('#idCurrentBalance');
						maskAmount('#idPlannedDepositAmount');
						//For solving JIRA: CIUAT-737
							var day = $("#idMaturityDate").val().slice(0,2);
							var month = $("#idMaturityDate").val().slice(3,5);
							var year = $("#idMaturityDate").val().slice(6);
							var DateReformatted  = year.concat("-", month, "-", day);
							var dateMaturity = new Date(DateReformatted);
							var selectedDateMaturity = new Date(dateMaturity.toString());
							var dayCurrent = moment().format('DD/MM/YYYY').slice(0,2);
							var monthCurrent = moment().format('DD/MM/YYYY').slice(3,5);
							var yearCurrent = moment().format('DD/MM/YYYY').slice(6);
							var currentDateReformatted  = yearCurrent.concat("-", monthCurrent, "-", dayCurrent);
							var currentDate = new Date(currentDateReformatted);
							var selectedCurrentDate=new Date(currentDate.toString());
							if (selectedDateMaturity < selectedCurrentDate) {
								$("#idPPFExtensionY").attr("checked", true);
								$("#idPPFYesExtensionDiv").show();
							}
							if ($("#idPPFExtensionY").val() == "Y") {
								var dayExtStartDate = "01";
								var monthExtStartDate = "04";
								var yearExtStartDate = $("#idMaturityDate").val().slice(6);
								var ExtStartDateReformatted = dayExtStartDate.concat("/", monthExtStartDate, "/", yearExtStartDate);
								$("#idExtensionStartDate").val(ExtStartDateReformatted);
								
								var concatedDashExtensionStartDate = yearExtStartDate.concat("-", monthExtStartDate, "-", dayExtStartDate);
								var dateConcatedDashExtensionStartDate = new Date(concatedDashExtensionStartDate);
								var selectedConcatedDashExtensionStartDate = new Date(dateConcatedDashExtensionStartDate.toString());
								serviceurl = "clientPPF/getPPFInterestRate/"+selectedConcatedDashExtensionStartDate;
								getClientDataWithErrorHandling("GET", "", serviceurl, foundExtIRSuccess, foundExtIRError);

								function foundExtIRSuccess(data) {
									$("#idExtensionInterestRate").val((data*100).toFixed(2));
								}
								function foundExtIRError(error){
									
									$("#alertppfesd").text('Interest Rate does not exist for given extension start date.');
									$("#idExtPPFStartDateGroup").css('border','2px solid red');				
									$("#idExtPPFStartDateGroup").css('borderRadius','7px');				
								    $("#idExtensionStartDate").focus().datepicker('hide');						
									$("#idExtensionInterestRate").val('');
								}
							}
					}
				}
			}
		} else {
			$("#alertppfsd").css('color','');
			$("#alertppfsd").text("");
			$("#idPPFStartDateGroup").css('border','');
			$("#idSaveROS").prop("disabled", false);
		}
		maskAllAmountFields();
	});
	
 $("#idExtensionStartDate").datepicker('remove'); 
  
 $("#idExtensionStartDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false,
		startDate : window.client_dob
	}).on('changeDate', function(ev){	
		unmaskAllAmountFields();
		var dateObject = $("#idExtensionStartDate").datepicker('getDate');
		$("#alertppfesd").text('');
		$("#alertppfextinterestrate").text('');
		
		$("#alertppfesd").css('color','');
		$("#alertppfesd").text("");
		$("#idExtPPFStartDateGroup").css('border','');
		$("#idSaveROS").prop("disabled", false);
		
		if (dateObject != null) {
			serviceurl = "clientPPF/getPPFInterestRate/"+dateObject;
			getClientDataWithErrorHandling("GET", "", serviceurl, foundExtIRSuccess, foundExtIRError);

			function foundExtIRSuccess(data) {
				if (data != 0) {
					$("#idExtensionInterestRate").val((data*100).toFixed(2));
				} else {
					$("#alertppfesd").text('Interest Rate does not exist for given extension start date.');
					$("#idExtPPFStartDateGroup").css('border','2px solid red');				
					$("#idExtPPFStartDateGroup").css('borderRadius','7px');				
				    $("#idExtensionStartDate").focus().datepicker('hide');						
					$("#idExtensionInterestRate").val('');
				}
				
			}
			function foundExtIRError(error){
				//alert('In foundIRError');
				$("#alertppfesd").text('Interest Rate does not exist for given extension start date.');
				$("#idExtPPFStartDateGroup").css('border','2px solid red');				
				$("#idExtPPFStartDateGroup").css('borderRadius','7px');				
			    $("#idExtensionStartDate").focus().datepicker('hide');						
				$("#idExtensionInterestRate").val('');
			}
		}	
		maskAllAmountFields();
	});
 
 $("#idExtensionStartDate").blur(function() {
	 unmaskAllAmountFields();
	 	var birthDate = sessionStorage.getItem("SELECTED_CLIENT_DOB");
		var birthDay = birthDate.slice(0,2);
		var birthMonth = birthDate.slice(3,5);
		var birthYear = birthDate.slice(6);
		var BirthDateReformatted  = birthYear.concat("-", birthMonth, "-", birthDay);
		var date = new Date(BirthDateReformatted);
		var selectedBirthDate=new Date(date.toString());
		
		var startDate = $(this).val();
		
		if (startDate != "") {
			var day = startDate.slice(0,2);
			//alert("day: " + day);
			var month = startDate.slice(3,5);
			//alert("month: " + month);
			var year = startDate.slice(6);
			
			var StartDateReformatted  = year.concat("-", month, "-", day);
			var startdate = new Date(StartDateReformatted);
			var selectedStartDate=new Date(startdate.toString());
			
			if (selectedStartDate < selectedBirthDate) {
				$("#alertppfesd").css('color','red');
				$("#alertppfesd").text("Date is invalid! Must not be before Date of Birth.");
				$("#idExtPPFStartDateGroup").css('border','2px solid red');
				$("#idSaveROS").prop("disabled", true);
			} else {
				if (year < birthYear || !checkValidDate($(this).val())) {
					$("#alertppfesd").css('color','red');
					$("#alertppfesd").text("Date is invalid!");
					$("#idExtPPFStartDateGroup").css('border','2px solid red');
					$("#idSaveROS").prop("disabled", true);
				} else {
					$("#alertppfesd").css('color','');
					$("#alertppfesd").text("");
					$("#idExtPPFStartDateGroup").css('border','');
					$("#idSaveROS").prop("disabled", false);
				}
			}
		} else {
			$("#alertppfesd").css('color','');
			$("#alertppfesd").text("");
			$("#idExtPPFStartDateGroup").css('border','');
			$("#idSaveROS").prop("disabled", false);
		}
		maskAllAmountFields();
 });
 
 $("#idAnnuityStartDate").datepicker('remove');
    
 $("#idAnnuityStartDate").datepicker({
	 format: "dd/mm/yyyy",
	 todayHighlight: true,
	 todayBtn: true,
	 autoclose: true,
	 forceParse: false,
	 startDate : window.client_dob,
	 endDate: new Date()
 }).on('changeDate', function (ev) {
	 unmaskAllAmountFields();
	 	$("#alertannuitystartdate").css('color','');
		$("#alertannuitystartdate").text("");
		$("#idAnnuityStartDateGroup").css('border','');
		$("#idSaveROS").prop("disabled", false);
 });
 
 $("#idAnnuityStartDate").blur(function() {
	 unmaskAllAmountFields();
	 if ($(this).val() != "") {
		 if (!checkValidDate($(this).val())) {
				$("#alertannuitystartdate").css('color','red');
				$("#alertannuitystartdate").text("Date is invalid!");
				$("#idAnnuityStartDateGroup").css('border','2px solid red');
				$("#idSaveROS").prop("disabled", true);
			} else {
				$("#alertannuitystartdate").css('color','');
				$("#alertannuitystartdate").text("");
				$("#idAnnuityStartDateGroup").css('border','');
				$("#idSaveROS").prop("disabled", false);
			}
	 } else {
		$("#alertannuitystartdate").css('color','');
		$("#alertannuitystartdate").text("");
		$("#idAnnuityStartDateGroup").css('border','');
		$("#idSaveROS").prop("disabled", false);
	 }
		
 });
 
 $("#idApyStartDate").datepicker('remove');
    
 $("#idApyStartDate").datepicker({
   format: "dd/mm/yyyy",
       todayHighlight: true,
       todayBtn: true,
       autoclose: true,
       forceParse: false,
       startDate : window.client_dob,
       endDate: new Date()
   }).on('changeDate', function (ev) {
	   unmaskAllAmountFields();
	    $("#alertapystartdate").css('color','');
		$("#alertapystartdate").text("");
		$("#idApyStartDateGroup").css('border','');
		$("#idSaveROS").prop("disabled", false);
   });
	
 $("#idApyStartDate").blur(function() {
	 unmaskAllAmountFields();
	 if ($(this).val() != "") {
		 if (!checkValidDate($(this).val())) {
				$("#alertapystartdate").css('color','red');
				$("#alertapystartdate").text("Date is invalid!");
				$("#idApyStartDateGroup").css('border','2px solid red');
				$("#idSaveROS").prop("disabled", true);
			} else {
				$("#alertapystartdate").css('color','');
				$("#alertapystartdate").text("");
				$("#idApyStartDateGroup").css('border','');
				$("#idSaveROS").prop("disabled", false);
			}
	 } else {
		 	$("#alertapystartdate").css('color','');
			$("#alertapystartdate").text("");
			$("#idApyStartDateGroup").css('border','');
			$("#idSaveROS").prop("disabled", false);
	 }
		
 });
 
 
	
	
});

function myDatePicker() {
	$("#idStartDate").datepicker('remove'); 
	if (pageMode=="EDIT") {
		$("#idStartDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: false,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate: window.client_dob,
			endDate: new Date()
		}).on('changeDate', function(ev){
			$("#alertppfsd").text('');
			$("#idPPFStartDateGroup").css('border','1px solid #ccc');				
			$("#idPPFStartDateGroup").css('borderRadius','7px');
			$("#alertppfsd").css('color','');
		});
		
		$("#idExtensionStartDate").datepicker('remove'); 
		$("#idExtensionStartDate").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: false,
				todayBtn: true,
				autoclose: true,
				forceParse: false,
				startDate : window.client_dob
				//date picker not working on firefox
				//endDate: window.client_lexp 
			}).on('changeDate', function(ev){	
				$("#alertppfesd").text('');
				$("#alertppfextinterestrate").text('');
				$("#alertppfesd").css('color','');
				$("#alertppfesd").text("");
				$("#idExtPPFStartDateGroup").css('border','');
				$("#idSaveROS").prop("disabled", false);
			});
		
		$("#idAnnuityStartDate").datepicker('remove');
	    $("#idAnnuityStartDate").datepicker({
			 format: "dd/mm/yyyy",
			 todayHighlight: false,
			 todayBtn: true,
			 autoclose: true,
			 forceParse: false,
			 startDate : window.client_dob,
			 endDate: new Date()
		 }).on('changeDate', function (ev) {
			 	$("#alertannuitystartdate").css('color','');
				$("#alertannuitystartdate").text("");
				$("#idAnnuityStartDateGroup").css('border','');
				$("#idSaveROS").prop("disabled", false);
		 });
	    
	    $("#idApyStartDate").datepicker('remove');
	    $("#idApyStartDate").datepicker({
	      format: "dd/mm/yyyy",
	          todayHighlight: false,
	          todayBtn: true,
	          autoclose: true,
	          forceParse: false,
	          startDate : window.client_dob,
	          endDate: new Date()
	      }).on('changeDate', function (ev) {
	   	    $("#alertapystartdate").css('color','');
	   		$("#alertapystartdate").text("");
	   		$("#idApyStartDateGroup").css('border','');
	   		$("#idSaveROS").prop("disabled", false);
	      });
		
	} else {
		$("#idStartDate").datepicker({
			format: "dd/mm/yyyy",
			todayHighlight: true,
			todayBtn: true,
			autoclose: true,
			forceParse: false,
			startDate: window.client_dob,
			endDate: new Date()
		}).on('changeDate', function(ev){
			$("#alertppfsd").text('');
			$("#idPPFStartDateGroup").css('border','1px solid #ccc');				
			$("#idPPFStartDateGroup").css('borderRadius','7px');
			$("#alertppfsd").css('color','');
		});
		
		$("#idExtensionStartDate").datepicker('remove'); 
		$("#idExtensionStartDate").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true,
				autoclose: true,
				forceParse: false,
				startDate : window.client_dob
				//date picker not working on firefox
				//endDate: window.client_lexp 
			}).on('changeDate', function(ev){	
				$("#alertppfesd").text('');
				$("#alertppfextinterestrate").text('');
				$("#alertppfesd").css('color','');
				$("#alertppfesd").text("");
				$("#idExtPPFStartDateGroup").css('border','');
				$("#idSaveROS").prop("disabled", false);
			});
		
		$("#idAnnuityStartDate").datepicker('remove');
	    $("#idAnnuityStartDate").datepicker({
			 format: "dd/mm/yyyy",
			 todayHighlight: true,
			 todayBtn: true,
			 autoclose: true,
			 forceParse: false,
			 startDate : window.client_dob,
			 endDate: new Date()
		 }).on('changeDate', function (ev) {
			 	$("#alertannuitystartdate").css('color','');
				$("#alertannuitystartdate").text("");
				$("#idAnnuityStartDateGroup").css('border','');
				$("#idSaveROS").prop("disabled", false);
		 });
	    
	    $("#idApyStartDate").datepicker('remove');
	    $("#idApyStartDate").datepicker({
	      format: "dd/mm/yyyy",
	          todayHighlight: true,
	          todayBtn: true,
	          autoclose: true,
	          forceParse: false,
	          startDate : window.client_dob,
	          endDate: new Date()
	      }).on('changeDate', function (ev) {
	   	    $("#alertapystartdate").css('color','');
	   		$("#alertapystartdate").text("");
	   		$("#idApyStartDateGroup").css('border','');
	   		$("#idSaveROS").prop("disabled", false);
	      });
	}
	
}

function showEPF() {
	//alert("hi");
	$('#divEPF').show();
	$('#divPPF').hide();
	$('#divNPS').hide();
	$('#divAnnuity').hide();
	$('#EPSannuity').hide();
	$('#divAPY').hide();
	//alert("showEPF")
	//new code for access rights
	if(loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				//alert("edit yes")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			} else if(loggedClient.clientInfoView === "Y"){
				//alert("edit no, view yes")
				console.log($("#idSaveROS"));
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	} else if(loggedUser.role === "Admin"){
			$("#idSaveROS").hide();
			$("#idUndoROS").hide();
	} else{
			if(loggedUser.clientInfoAddEdit === "Y"){
				//alert("also here")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			}else if(loggedUser.clientInfoView === "Y"){
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	}
	//$("#idSaveROS").show();
	//$("#idUndoROS").show();
	saveURL = "createClientEPF/";
	populateFamilyMemberByClientIdCustom(selectedClientId,$("#familyMemberImageEPF"));
	

	//////// 
	
	"use strict";
    $("[data-toggle=\"tooltip\"]").tooltip();
    //open the comments for solving JIRA: CIUAT-744
    /*$("#idSalaryIncreaseRefMonth").datepicker({
        //format: "M-yyyy",
        format: "MM",
        startView: "months", 
        minViewMode: "months",
        todayHighlight: true,
        todayBtn: true,
        autoclose: true
    });*/
    $(".datepicker-icon").on("click", function () {
        $(this).closest(".input-group").find("input").trigger("focus");
    });
    
    $("#idSalaryIncreaseRefMonth").val('April');
    
    var dateObject = new Date();
    if (dateObject != null) {
		serviceurl = "clientEPF/getEPFInterestRate/"+dateObject;
		getClientData("GET", "", serviceurl, foundIRSuccess);
		//getClientDataWithErrorHandling("GET", "", serviceurl, foundIRSuccess,foundIRError);
		function foundIRSuccess(data) {
			if (data != null || data != 0){
				$("#idEpfoInterestRate").val(parseFloat(data*100).toFixed(2));
				sessionStorage.removeItem("EPFInterestRate");
				sessionStorage.setItem("EPFInterestRate", parseFloat(data*100).toFixed(2));
			} else {
				$("#alertepfointerestrate").text('EPFO Interest Rate does not exist');
				$("#idEpfoInterestRate").css('border','2px solid red');				
				$("#idEpfoInterestRate").css('borderRadius','7px');				
				$("#idEpfoInterestRate").val("")
			}
		}
	}
	
	if (dateObject != null) {
		serviceurl = "clientEPF/getEPFCagr/"+dateObject;
		//getClientDataWithErrorHandling("GET", "", serviceurl, foundCAGRSuccess, foundCAGRError);
		getClientData("GET", "", serviceurl, foundCAGRSuccess);
		function foundCAGRSuccess(data) {
			if (data != null || data != 0){
				$("#idAnnualContributionIncrease").val(parseFloat(data*100).toFixed(2));
				sessionStorage.removeItem("AnnualContributionIncrease");
				sessionStorage.setItem("AnnualContributionIncrease", parseFloat(data*100).toFixed(2));
			} else {
				$("#alertannualcontributionincrease").text('Annual Growth Rate of Contribution does not exist');
				$("#idAnnualContributionIncrease").css('border','2px solid red');				
				$("#idAnnualContributionIncrease").css('borderRadius','7px');				
				$("#idAnnualContributionIncrease").val("")
			}
		}
	}
	
	$("#idEpfCurrentBalance").focus();
}

function showPPF() {
	$('#idPPFYesExtensionDiv').hide();
	$('#divPPF').show();
	$('#divEPF').hide();
	$('#divNPS').hide();
	$('#divAnnuity').hide();
	$('#EPSannuity').hide();
	$('#divAPY').hide();
	//new code for access rights
	if(loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				//alert("edit yes")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			} else if(loggedClient.clientInfoView === "Y"){
				//alert("edit no, view yes")
				console.log($("#idSaveROS"));
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	} else if(loggedUser.role === "Admin"){
			$("#idSaveROS").hide();
			$("#idUndoROS").hide();
	} else{
			if(loggedUser.clientInfoAddEdit === "Y"){
				//alert("also here")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			}else if(loggedUser.clientInfoView === "Y"){
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	}
//	$("#idSaveROS").show();
//	$("#idUndoROS").show();
	
	saveURL = "createClientPPF/";
	populateFamilyMemberByClientIdCustom(selectedClientId,$("#familyMemberImagePPF"));
	/*PPFfamilyMemberImageByClientId(selectedClientId,$("#familyMemberImagePPF"));
	var SELECTED_FAMILY_MEMBER_ID = 0;
	function PPFfamilyMemberImageByClientId(clientId, tableRowId) {
		getClientData("GET", "", "checkIfPpfPresentForAll/" + clientId, familyMemberSuccess);
		function familyMemberSuccess(data) {
			$("#familyMemberImagePPF").empty();
			//////////console.log("data  " + data.length);
			var gender;
			$.each(data,function(index, item) {
				//////////console.log("id " + item.id);
				if (item.relationID === 0) {
					SELECTED_FAMILY_MEMBER_ID = item.id;
					gender = item.gender;
					if (gender === 'M') {
						tableRowId
								.append('<td><img src="../Common/assets/images/icons/Man-C.png" id="'
										+ item.id
										+ '" onClick="PPFonClickImage12('
										+ item.id
										+ ')" class="assetOwner1_img"  alt="'
										+ item.relationName
										+ '" tabindex="200"/>'
										+ item.relationName
										+ '</td>');
					} else {
						tableRowId
								.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
										+ item.id
										+ '" onClick="PPFonClickImage12('
										+ item.id
										+ ')" class="assetOwner1_img"  alt="'
										+ item.relationName
										+ '" tabindex="200"/>'
										+ item.relationName
										+ '</td>');
						alert("name:" +item.relationName);
					}

				}
				if (item.relationID === 1) {
					if (gender === 'M') {
						tableRowId
								.append('<td><img src="../Common/assets/images/icons/Man-A.png"  id="'
										+ item.id
										+ '" onClick="PPFonClickImage12('
										+ item.id
										+ ')" class="assetOwner1_img"  alt="'
										+ item.relationName
										+ '" tabindex="200"/>'
										+ item.relationName
										+ ' '
										+ item.firstName
										+ '</td>');
					} else {
						tableRowId
								.append('<td><img src="../Common/assets/images/icons/Lady-A.png"  id="'
										+ item.id
										+ '" onClick="PPFonClickImage12('
										+ item.id
										+ ')" class="assetOwner1_img"  alt="'
										+ item.relationName
										+ '" tabindex="200"/>'
										+ item.relationName
										+ ' '
										+ item.firstName
										+ '</td>');
					}

				}
				if (item.relationID === 2) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
									+ item.id
									+ '" onClick="PPFonClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ ' '
									+ item.firstName + '</td>');

				}

				if (item.relationID === 3) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
									+ item.id
									+ '" onClick="PPFonClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ ' '
									+ item.firstName + '</td>');

				}

				if (item.relationID === 4) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Father-A.png"  id="'
									+ item.id
									+ '" onClick="PPFonClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ ' '
									+ item.firstName + '</td>');

				}
				if (item.relationID === 5) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Mother-A.png"  id="'
									+ item.id
									+ '" onClick="PPFonClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '  '
									+ item.firstName + '</td>');

				}
				if (item.relationID === 6) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
									+ item.id
									+ '" onClick="PPFonClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '  '
									+ item.firstName + '</td>');

				}
				if (item.relationID === 7) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
									+ item.id
									+ '" onClick="PPFonClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '  '
									+ item.firstName + '</td>');

				}
				if (item.relationID === 8) {

					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Other-A.png"  id="'
									+ item.id
									+ '" onClick="PPFonClickImage12('
									+ item.id
									+ ')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '  '
									+ item.firstName + '</td>');

				}
			});
		}
	}*/

	populateInterestFrequencyCustomized($("#idAmountDepositFrequency"),"Deposit Frequency");
	populateInterestFrequencyCustomized($("#idCompoundingFrequency"),"Compounding Frequency");
	$("#idCompoundingFrequency").val("1");
	populateInterestFrequencyCustomized($("#idAmountDepositFrequencyExt"),"Deposit Frequency");
	populateInterestFrequencyCustomized($("#idExtensionCompoundingFrequency"),"Compounding Frequency");
		//$("#idExtensionCompoundingFrequency").val("1");
	/*$("#idExtensionCompoundingFrequency").val(1);
	$("#idExtensionTenure").val(5);*/
	
	// calendar
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});	

	$("#idCurrentBalance").focus();
	
	var dateObject = new Date();
    if (dateObject != null) {
		serviceurl = "clientPPF/getPPFInterestRate/"+dateObject;
		getClientData("GET", "", serviceurl, foundIRSuccess);
		//getClientDataWithErrorHandling("GET", "", serviceurl, foundIRSuccess,foundIRError);
		function foundIRSuccess(data) {
			if (data != null || data != 0){
				$("#idInterestRate").val(parseFloat(data*100).toFixed(2));
				$("#idExtensionInterestRate").val(parseFloat(data*100).toFixed(2));
				sessionStorage.removeItem("PPFInterestRate");
				sessionStorage.setItem("PPFInterestRate", parseFloat(data*100).toFixed(2));
			} else {
				$("#alertppfinterestrate").text('PPF Interest Rate does not exist');
				$("#idInterestRate").css('border','2px solid red');				
				$("#idInterestRate").css('borderRadius','7px');				
				$("#idInterestRate").val("")
			}
		}
	}
}

function showNPS() {
	$('#divPPF').hide();
	$('#divEPF').hide();
	$('#divNPS').show();
	$('#divAnnuity').hide();
	$('#EPSannuity').hide();
	$('#divAPY').hide();
	$('#idAutoMode').hide();
	$('#idActiveMode').hide();
	//new code for access rights
	if(loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				//alert("edit yes")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			} else if(loggedClient.clientInfoView === "Y"){
				//alert("edit no, view yes")
				console.log($("#idSaveROS"));
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	} else if(loggedUser.role === "Admin"){
			$("#idSaveROS").hide();
			$("#idUndoROS").hide();
	} else{
			if(loggedUser.clientInfoAddEdit === "Y"){
				//alert("also here")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			}else if(loggedUser.clientInfoView === "Y"){
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	}
//	$("#idSaveROS").show();
//	$("#idUndoROS").show();
	saveURL = "createClientNPS/";
	populateFamilyMemberByClientIdCustom(selectedClientId,$("#familyMemberImageNPS"));	
	

	
	populateInterestFrequencyCustomized($("#idEmployeeContributionFrequency"),"Employee Contribution Frequency");
	$("#idEmployeeContributionFrequency option").filter(function() {
		return this.value==12; //Default Monthly			    
	}).prop('selected', true);
	populateInterestFrequencyCustomized($("#idEmployerContributionFrequency"),"Employer Contribution Frequency");
	$("#idEmployerContributionFrequency option").filter(function() {
		return this.value==12;	//Monthly		    
	}).prop('selected', true);
	
	populateNPSType($("#idPlanType"));	
	//populateNPSExpectedAnnualContributionGrowth($("#idExpectedAnnualIncrease"));	
	
	if (pageMode=='ADD') {
		serviceurl = "clientNPS/getSalaryCAGR/";
		getClientDataWithErrorHandling("GET", "", serviceurl, foundCAGRSuccess, foundCAGRError);
		function foundCAGRSuccess(data) {
			$("#idExpectedAnnualIncrease").val(parseFloat(data*100).toFixed(2));
			sessionStorage.removeItem("ExpectedAnnualIncrease");
			sessionStorage.setItem("ExpectedAnnualIncrease", parseFloat(data*100).toFixed(2));
		}

		function foundCAGRError(error) {
			$("#alerteaiic").text('Expected Growth Rate of Contribution does not exist for current date');
			$("#idExpectedAnnualIncrease").css('border','2px solid red');				
			$("#idExpectedAnnualIncrease").css('borderRadius','7px');				
			$("#idExpectedAnnualIncrease").val("")
		}	    
	}
	
	$("#idNpsCurrentBalance").focus();	
}


function showAnnuity() {
	
	sessionStorage.removeItem("RELATION_ID_SELF");
	sessionStorage.setItem("RELATION_ID_SELF", 0);
	
	$('#divPPF').hide();
	$('#divEPF').hide();
	$('#divNPS').hide();
	$('#divAPY').hide();
	
	$('#divAnnuity').show();
	$('#EPSannuity').hide();
	//new code for access rights
	if(loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				//alert("edit yes")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			} else if(loggedClient.clientInfoView === "Y"){
				//alert("edit no, view yes")
				console.log($("#idSaveROS"));
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	} else if(loggedUser.role === "Admin"){
			$("#idSaveROS").hide();
			$("#idUndoROS").hide();
	} else{
			if(loggedUser.clientInfoAddEdit === "Y"){
				//alert("also here")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			}else if(loggedUser.clientInfoView === "Y"){
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	}
//	$("#idSaveROS").show();
//	$("#idUndoROS").show();
	
	saveURL = "createclientAnnuity/";
	//populateFamilyMemberImageCustom(selectedImageFamilyMemberid,$("#familyMemberImageAnnuity"));	
	
	populateFamilyMemberByClientIdCustom(selectedClientId,$("#familyMemberImageAnnuity"));
	populateInterestFrequencyCustomized($("#idPayoutFrequency"),"Payout Frequency");
	populateAnnuityType($("#idAnnuityType"));
	/*if (pageMode == "ADD") {
		//populateFamilyMemberByClientIdCustom(selectedClientId,$("#familyMemberImageAnnuity"));
		
	}*/
	
	
	$('#idAnnuityType').on('change', function(){
		selectedAnnuityType = $(this).val();
	
		if (selectedAnnuityType == 6) {
			$('#EPSannuity').show();
			$('.inputDisabled').removeAttr("readonly")
			$('.inputDisabledAnnualContibutionIncrease').removeAttr("readonly")
			$('#idPenCor').hide();
			$('#idAnnRate').hide();
			$('#idAnnGroRate').hide();
			$('#idEPSAnn').hide();
			$('#idSELF').hide();
			$('#idSPOUSE').hide();
			$('#idPayoutFrequency').attr("disabled","disabled");
			$("#idPayOutFreq option").filter(function() {
				return this.value==12;		    
			}).prop('selected', true);
			$('#idAnnuityStartDate').show();
			var todaydate = new Date();
			   var day = todaydate.getDate();
			   var month = todaydate.getMonth() + 1;
			   var year = todaydate.getFullYear();
			   var datestring = day + "/" + month + "/" + year;
			   document.getElementById("idAnnuityStartDate").value = datestring;
			  /* $("#idAnnuityStartDate").datepicker({
					 format: "dd/mm/yyyy",
					 todayHighlight: true,
					 todayBtn: true,
					 autoclose: true,
					 forceParse: false,
					 startDate : window.client_dob,
					 endDate: window.client_lexp
				 }).on('changeDate', function (ev) {
					 unmaskAllAmountFields();
					 	$("#alertannuitystartdate").css('color','');
						$("#alertannuitystartdate").text("");
						$("#idAnnuityStartDateGroup").css('border','');
				 });*/
		} else {
			$('#EPSannuity').hide();
			$('#idPenCor').show();
			$('#idAnnRate').show();
			$('#idAnnGroRate').show();
			$('#idPayOutFreq').show();
			$('#idPayoutFrequency').removeAttr('disabled');
			$("#idPayOutFreq option").filter(function() {
				return this.value==12;		    
			}).prop('selected', false);
			$('#idAnnStartDate').show();
			$('#idAnnuityStartDate').val('');
		}
   	});
	
	"use strict";
    $("[data-toggle=\"tooltip\"]").tooltip();
    
  
    $(".datepicker-icon").on("click", function () {
        $(this).closest(".input-group").find("input").trigger("focus");
    });
	$("#idPensionableCorpus").focus();
	
	/*if (sessionStorage.getItem("RELATION_ID_SELF") == "0") {
		$('#idSELF').show();
		$('#idSPOUSE').hide();
		$('#idLEDIV').hide();
	}*/
	
}

function showAPY() {
	$('#divPPF').hide();
	$('#divEPF').hide();
	$('#divNPS').hide();
	$('#divAnnuity').hide();
	$('#EPSannuity').hide();
	$('#divAPY').show();
	//new code for access rights
	if(loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				//alert("edit yes")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			} else if(loggedClient.clientInfoView === "Y"){
				//alert("edit no, view yes")
				console.log($("#idSaveROS"));
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	} else if(loggedUser.role === "Admin"){
			$("#idSaveROS").hide();
			$("#idUndoROS").hide();
	} else{
			if(loggedUser.clientInfoAddEdit === "Y"){
				//alert("also here")
				$("#idSaveROS").show();
				$("#idUndoROS").show();
			}else if(loggedUser.clientInfoView === "Y"){
				$("#idSaveROS").hide();
				$("#idUndoROS").hide();
			}
	}
//	$("#idSaveROS").show();
//	$("#idUndoROS").show();
	saveURL = "createClientAtalPensionYojana/";
	
	populateFamilyMemberByClientIdCustom(selectedClientId,$("#familyMemberImageAPY"));
	
	populateInterestFrequencyCustomized($("#idInvestmentFrequency"),"Investment Frequency");
	
	populateMonthlyPensionRequired($("#idMonthlyPensionRequired"));
	
	$("#idInvestmentFrequency option").filter(function() {
		return this.value==12; //Default Monthly			    
	}).prop('selected', true);

	
	"use strict";
    $("[data-toggle=\"tooltip\"]").tooltip();
        
 
    $(".datepicker-icon").on("click", function () {
        $(this).closest(".input-group").find("input").trigger("focus");
    });
	$("#idInvestmentFrequency").focus();
}

function getEPF() {
	//console.log('In getEPF() ROS ID: '+selectedROSID);		
	//getClientDataWithErrorHandling("GET", "", "clientEPF/"+selectedROSID, onGetEPFSuccess, onGetEPFDataError);
	getClientData("GET", "", "clientEPF/"+selectedROSID, onGetEPFSuccess);
	function onGetEPFSuccess(data) {
		saveURL = "editClientEPF/";
		populateForm($('#idAddRetirementForm'),data);
		maskAllAmountFields();
		
		//console.log(data);
		
		familyMemberImageByMemberId(data.financialAssetType,data.familyMemberID,data.firstName,data.relationId,data.relationName,data.gender,$("#familyMemberImageEPF"));
		 $(".datepicker-icon").on("click", function () {
		        $(this).closest(".input-group").find("input").trigger("focus");
		    });
		    
		    $("#idSalaryIncreaseRefMonth").val('April');
		    
		    var dateObject = new Date();
		    if (dateObject != null) {
				serviceurl = "clientEPF/getEPFInterestRate/"+dateObject;
				getClientData("GET", "", serviceurl, foundIRSuccess);
				//getClientDataWithErrorHandling("GET", "", serviceurl, foundIRSuccess,foundIRError);
				function foundIRSuccess(data) {
					if (data != null || data != 0){
						$("#idEpfoInterestRate").val(parseFloat(data*100).toFixed(2));
						sessionStorage.removeItem("EPFInterestRate");
						sessionStorage.setItem("EPFInterestRate", parseFloat(data*100).toFixed(2));
					} else {
						$("#alertepfointerestrate").text('EPFO Interest Rate does not exist');
						$("#idEpfoInterestRate").css('border','2px solid red');				
						$("#idEpfoInterestRate").css('borderRadius','7px');				
						$("#idEpfoInterestRate").val("")
					}
				}
			}
		    
		    if (dateObject != null) {
				serviceurl = "clientEPF/getEPFCagr/"+dateObject;
				//getClientDataWithErrorHandling("GET", "", serviceurl, foundCAGRSuccess, foundCAGRError);
				getClientData("GET", "", serviceurl, foundCAGRSuccess);
				function foundCAGRSuccess(data) {
					if (data != null || data != 0){
						$("#idAnnualContributionIncrease").val(parseFloat(data*100).toFixed(2));
						sessionStorage.removeItem("AnnualContributionIncrease");
						sessionStorage.setItem("AnnualContributionIncrease", parseFloat(data*100).toFixed(2));
					} else {
						$("#alertannualcontributionincrease").text('Annual Growth Rate of Contribution does not exist');
						$("#idAnnualContributionIncrease").css('border','2px solid red');				
						$("#idAnnualContributionIncrease").css('borderRadius','7px');				
						$("#idAnnualContributionIncrease").val("")
					}
				}
			}
			
	}
}



function getPPF() {
	//getClientDataWithErrorHandling("GET", "", "clientPPF/"+selectedROSID, onGetPPFDataSuccess, onGetPPFDataError);
	getClientData("GET", "", "clientPPF/"+selectedROSID, onGetPPFDataSuccess);
	function onGetPPFDataSuccess(data) {				
		//console.log(data);
		$("#idAmountDepositFrequency option").filter(function() {
			return this.value==data.amountDepositFrequency;			    
		}).prop('selected', true);

		$("#idCompoundingFrequency option").filter(function() {
			return this.value==data.compoundingFrequency;			    
		}).prop('selected', true);

		$("#idAmountDepositFrequencyExt option").filter(function() {
			return this.value==data.amountDepositFrequencyExt;			    
		}).prop('selected', true);

		$("#idExtensionCompoundingFrequency option").filter(function() {
			return this.value==data.extensionCompoundingFrequency;			    
		}).prop('selected', true);
		
		populateForm($('#idAddRetirementForm'),data);
		
		myDatePicker();
		sessionStorage.setItem("SELECTED_FM_ID",data.familyMemberID);
		
		maskAllAmountFields();
		familyMemberImageByMemberId(data.financialAssetType,data.familyMemberID,data.firstName,data.relationId,data.relationName,data.gender,$("#familyMemberImagePPF"));
		getClientData("GET", "", "clientFamilyMember/"+data.familyMemberID, retirementSuccess);
		 
		function retirementSuccess(values) {
		
			//alert("inside familyMemberSuccess 3");
			$("#idRetirementAge").val(values.retirementAge);
			//$("#idRetirementAgeDIV").val(values.retirementAge);
			$("#idLifeExpectancyDIV").val(values.lifeExpectancy);
		}
		//alert("familyMemberID: " + data.familyMemberID);
		//populateFamilyMemberImageCustom(data.familyMemberID,"#familyMemberImagePPF");
		$("#idInterestRate").val(parseFloat(data.interestRate*100).toFixed(2));
		//console.log('PPF Interest Rate: '+$("#idInterestRate").val());
		
		if (data.extensionFlag=="Y") {
			$('#idPPFYesExtensionDiv').show();
			if(data.extensionInterestRate!=null) {
				$("#idExtensionInterestRate").val(parseFloat(data.extensionInterestRate*100).toFixed(2));
			}
		}
	}
	
	
}

function getNPS() {
	//getClientDataWithErrorHandling("GET", "", "clientNPS/"+selectedROSID, onGetNPSSuccess, onGetNPSError);
	getClientData("GET", "", "clientNPS/"+selectedROSID, onGetNPSSuccess);
	function onGetNPSSuccess(data) {
		$("#idEmployeeContributionFrequency option").filter(function() {
			return this.value==data.employeeContributionFrequency;			    
		}).prop('selected', true);

		$("#idEmployerContributionFrequency option").filter(function() {
			return this.value==data.employerContributionFrequency;			    
		}).prop('selected', true);
		
		$("#idPlanType option").filter(function() {
			return this.value==data.planType;			    
		}).prop('selected', true);

		populateForm($('#idAddRetirementForm'),data);
		
		myDatePicker();
		sessionStorage.setItem("SELECTED_FM_ID",data.familyMemberID);
		maskAllAmountFields();
		familyMemberImageByMemberId(data.financialAssetType,data.familyMemberID,data.firstName,data.relationId,data.relationName,data.gender,$("#familyMemberImageNPS"));
		getClientData("GET", "", "clientFamilyMember/"+data.familyMemberID, retirementSuccess);
		function retirementSuccess(values) {
			//console.log("data set on click"+values.retirementAge);
			//alert("inside familyMemberSuccess 4");
			$("#idRetirementAge").val(values.retirementAge);
			//$("#idRetirementAgeDIV").val(values.retirementAge);
			$("#idLifeExpectancyDIV").val(values.lifeExpectancy);
		}
		//poupulateFamilyMemberImageNPS(data.familyMemberID);
		//console.log("Family Member Id Fetched in NPS: " + data.familyMemberID);
		//populateFamilyMemberImageCustom(data.familyMemberID, "#familyMemberImageNPS");
		//console.log('Expected Annual Increase in Contribution: '+data.expectedAnnualIncrease);
		$("#idExpectedAnnualIncrease").val(parseFloat(data.expectedAnnualIncrease*100).toFixed(2));
		
		if(data.planType == 1) {
			$('#idAutoMode').show();
			//alert(data.autoPlanReturns);
			$("#idAutoPlanReturns").val(parseFloat(data.autoPlanReturns*100).toFixed(2));
		} else if(data.planType == 2) {
			$('#idActiveMode').show();
			$("#idAssetClassEAllocation").val(parseFloat(data.assetClassEAllocation*100).toFixed(2));
			$("#idAssetClassCAllocation").val(parseFloat(data.assetClassCAllocation*100).toFixed(2));
			$("#idAssetClassGAllocation").val(parseFloat(data.assetClassGAllocation*100).toFixed(2));
			$("#idAssetClassEReturns").val(parseFloat(data.assetClassEReturns*100).toFixed(2));
			$("#idAssetClassCReturns").val(parseFloat(data.assetClassCReturns*100).toFixed(2));
			$("#idAssetClassGReturns").val(parseFloat(data.assetClassGReturns*100).toFixed(2));
		}
	}
	
	
}

function getAnnuity() {
	populateAnnuityType($("#idAnnuityType"));
	//getClientDataWithErrorHandling("GET", "", "clientAnnuity/"+selectedROSID, onGetAnnuityDataSuccess, onGetAnnuityDataError);
	getClientData("GET", "", "clientAnnuity/"+selectedROSID, onGetAnnuityDataSuccess);
	function onGetAnnuityDataSuccess(data) {
		
		//alert("data.annuityType: " + data.annuityType);
		
		populateForm($('#idAddRetirementForm'),data);
		
		if (data.clientEPFID != 0 && data.annuityType == 6) {
			//alert("in if");
			retirementStatusEdit = "Y";
		}
		
		//console.log("annuityType: " + data.annuityType);
		
		//alert("ID" +sessionStorage.getItem("SELECTED_EPF_ID"));
		if(sessionStorage.getItem("SELECTED_EPF_ID") > 0) {
			if (data.annuityType == 6) {
				//alert("inside if if");
				$("#idAnnuityType").append('<option value="6" selected> EPS Annuity </option>');
				$('#idAnnuityType').attr("disabled", true);
				$('#idEPSAnn').hide();
				$('#idSaveROS').attr("disabled", true); 
			}
		} else{
			if (data.annuityType == 6) {
				$('#EPSannuity').show();
				$('#idPenCor').hide();
				$('#idAnnRate').hide();
				$('#idAnnGroRate').hide();
				$('#idEPSAnn').hide();
				$('#idSELF').hide();
				$('#idSPOUSE').hide();
				$('#idPayOutFreq').show();
				$('#idPayoutFrequency').attr("disabled","disabled");
				$("#idPayOutFreq option").filter(function() {
					return this.value==12;		    
				}).prop('selected', true);
				$('#idAnnuityStartDate').show();
				var todaydate = new Date();
				   var day = todaydate.getDate();
				   var month = todaydate.getMonth() + 1;
				   var year = todaydate.getFullYear();
				   var datestring = day + "/" + month + "/" + year;
				   document.getElementById("idAnnuityStartDate").value = datestring;
			} else {
				$('#EPSannuity').hide();
				$('#idPenCor').show();
				$('#idAnnRate').show();
				$('#idAnnGroRate').show();
				$('#idSELF').hide();
				$('#idSPOUSE').hide();
				$('#idPayOutFreq').show();
				$('#idAnnStartDate').show();
			}

		}
		
		
				
		$("#idAnnuityType option").filter(function() {
			return this.value==data.annuityType;			    
		}).prop('selected', true);

		$("#idPayoutFrequency option").filter(function() {
			return this.value==data.payoutFrequency;			    
		}).prop('selected', true);

		//console.log('Annuity Growth Rate: '+ data.annuityRate);
		populateForm($('#idAddRetirementForm'),data);
		
		myDatePicker();
		sessionStorage.setItem("SELECTED_FM_ID",data.familyMemberID);
		maskAllAmountFields();
		populateFamilyMemberImageCustom(data.familyMemberID,"#familyMemberImageAnnuity");
		//console.log("Family Member Id Fetched in Annuity" + data.familyMemberID);
		$('#idAnnuityRate').val(parseFloat(data.annuityRate * 100).toFixed(2));
		if (data.growthRate != null){
			$('#idGrowthRate').val(parseFloat(data.growthRate * 100).toFixed(2));
		}
		
		$('.inputDisabledAnnualContibutionIncrease').removeAttr("readonly").val(parseFloat(data.annuityAnnualContributionIncrease * 100).toFixed(2));
		//alert("clientEPFID: " + data.clientEPFID);
		if (data.clientEPFID == 0) {
			$('.inputDisabled').removeAttr("readonly")
			$('.inputDisabledAnnualContibutionIncrease').removeAttr("readonly")
		} else {
			
			if (data.annuityType == 6) {
				$('.inputDisabled').attr("readonly","true")
				$('.inputDisabledAnnualContibutionIncrease').attr("readonly","true")
				$('#idPenCor').hide();
				$('#idAnnRate').hide();
				$('#idAnnGroRate').hide();
				$('#idSELF').hide();
				$('#idSPOUSE').hide();
			}
			
		}
		
		
	
	}	
	
	
}

function getAPY() {
	//$("#idLDIV").hide();
	//getClientDataWithErrorHandling("GET", "", "clientAtalPensionYojana/"+selectedROSID, onGetAPYDataSuccess, onGetAPYDataError);
	getClientData("GET", "", "clientAtalPensionYojana/"+selectedROSID, onGetAPYDataSuccess);
	function onGetAPYDataSuccess(data) {
		$("#idInvestmentFrequency option").filter(function() {
			return this.value==data.investmentFrequency;			    
		}).prop('selected', true);

		populateForm($('#idAddRetirementForm'),data);
		
		myDatePicker();
		
		maskAllAmountFields();
		//sessionStorage.setItem("SELECTED_FM",income.familyMemberId);
		//poupulateFamilyMemberImageAPY(data.familyMemberID);
		//populateFamilyMemberImageCustom(data.familyMemberID,"#familyMemberImageAPY");
		sessionStorage.setItem("SELECTED_FM_ID",data.familyMemberID);
		familyMemberImageByMemberId(data.financialAssetType,data.familyMemberID,data.firstName,data.relationId,data.relationName,data.gender,$("#familyMemberImageAPY"));
		getClientData("GET", "", "clientFamilyMember/"+data.familyMemberID, retirementSuccess);
		function retirementSuccess(values) {
			//console.log("data set on click"+values.retirementAge);
			//alert("inside familyMemberSuccess 5");
			$("#idRetirementAge").val(values.retirementAge);
			//$("#idRetirementAgeDIV").val(values.retirementAge);
			$("#idLifeExpectancyDIV").val(values.lifeExpectancy);
			$("#idLifeExp").val(values.lifeExpectancy);
			
			
		}
		//console.log("Family Member Id Fetched in APY" + data.familyMemberID);
	}
	
	
}

function familyMemberImageByMemberId(assetType,memberId,firstName,relationId,relationName,gender,tableRowId) {
	//alert(memberId);
	
	if (assetType == 13) {
		$("#familyMemberImageEPF").empty();
	}
	if (assetType == 33) {
		$("#familyMemberImageAPY").empty();
	}
	if (assetType == 14) {
		$("#familyMemberImageNPS").empty();
	}
	if (assetType == 12) {
		$("#familyMemberImagePPF").empty();
	}
	/*
	*/
	//////console.log("memberId  Gender  " + memberId +" "+gender);
	var gender;
	    
	
		if (relationId=== 0) {
			
			getClientData("GET", "", "clientFamilyMember/"+memberId, familyInfoSuccess);
			function familyInfoSuccess(data) {
				//alert("alert 1")
				client_lexp=data.lifeExpectancy;
				
				$("#idRetirementAge").val(data.retirementAge);
				//$("#idRetirementAgeDIV").val(data.retirementAge);
				//alert(client_lexp);
				
				$('#idLDIV').show();
				$("#idLifeExp").val(data.lifeExpectancy);
				$('#idLexpDiv').hide();
								
				/*$("#idContributionUptoAge").val(data.retirementAge);*/
				sessionStorage.removeItem("RetirementAge");
				sessionStorage.setItem("RetirementAge", data.retirementAge);
			}
			
			
			if (gender === 'Male') {
				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Man-C.png" id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ '</td>');
			} else {
				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ '</td>');
			}

		}
		if (relationId === 1) {
			getClientData("GET", "", "clientFamilyMember/"+memberId, familyInfoSuccess);
		
			function familyInfoSuccess(data) {
				//alert("alert 2")
				spouse_lexp=data.lifeExpectancy;
				//$("#idSELF").hide();
				//$("#idSPOUSE").show();
				$('#idLDIV').show();	
				$("#idLexpDiv").hide();
				$("#idLifeExpectancyDIV").val(spouse_lexp);
			}
			if (gender === 'Male') {
				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Man-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ ' '
								+ firstName
								+ '</td>');
			} else {
				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Lady-C.png"  id="'
								+ memberId + '" class="assetOwner1_img"  alt="'
								+ relationName
								+ '" tabindex="200"/>'
								+ relationName
								+ ' '
								+ firstName
								+ '</td>');
			}

		}
		if (relationId === 2) {
			getClientData("GET", "", "clientFamilyMember/"+memberId, familyInfoSuccess);
			function familyInfoSuccess(data) {
			
				son_lexp=data.lifeExpectancy;
				//$("#idLEDIV").show();	
				$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
			}
			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Boy-C.png"  id="'
							+ memberId + '" class="assetOwner1_img"  alt="'
							+ relationName
							+ '" tabindex="200"/>'
							+ relationName
							+ ' '
							+ firstName + '</td>');

		}

		if (relationId === 3) {
			getClientData("GET", "", "clientFamilyMember/"+memberId, familyInfoSuccess);
			function familyInfoSuccess(data) {
				
				daughter_lexp=data.lifeExpectancy;
				//$("#idLEDIV").show();
				$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
			}

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Girl-C.png"  id="'
							+ memberId + '" class="assetOwner1_img"  alt="'
							+ relationName
							+ '" tabindex="200"/>'
							+ relationName
							+ ' '
							+ firstName + '</td>');

		}

		if (relationId === 4) {
			getClientData("GET", "", "clientFamilyMember/"+memberId, familyInfoSuccess);
			function familyInfoSuccess(data) {
				
				father_lexp=data.lifeExpectancy;
				//$("#idLEDIV").show();
				$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
			}

			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Father-C.png"  id="'
							+ memberId + '" class="assetOwner1_img"  alt="'
							+ relationName
							+ '" tabindex="200"/>'
							+ relationName
							+ ' '
							+ firstName + '</td>');

		}
		if (relationId === 5) {
			getClientData("GET", "", "clientFamilyMember/"+memberId, familyInfoSuccess);
			function familyInfoSuccess(data) {
				
				mother_lexp=data.lifeExpectancy;
				//$("#idLEDIV").show();
				$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
			}
			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Mother-C.png"  id="'
							+ memberId + '" class="assetOwner1_img"  alt="'
							+ relationName
							+ '" tabindex="200"/>'
							+ relationName
							+ ' '
							+ firstName + '</td>');

		}
		if (relationId=== 6) {
			getClientData("GET", "", "clientFamilyMember/"+memberId, familyInfoSuccess);
			function familyInfoSuccess(data) {
				
				brother_lexp=data.lifeExpectancy;
				//$("#idLEDIV").show();
				$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
			}
			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Boy-C.png"  id="'
							+ memberId + '" class="assetOwner1_img"  alt="'
							+ relationName
							+ '" tabindex="200"/>'
							+ relationName
							+ ' '
							+ firstName + '</td>');

		}
		if (relationId === 7) {
			getClientData("GET", "", "clientFamilyMember/"+memberId, familyInfoSuccess);
			function familyInfoSuccess(data) {
				
				sister_lexp=data.lifeExpectancy;
				//$("#idLEDIV").show();
				$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
			}
			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Girl-C.png"  id="'
							+ memberId + '" class="assetOwner1_img"  alt="'
							+ relationName
							+ '" tabindex="200"/>'
							+ relationName
							+ ' '
							+ firstName + '</td>');

		}
		if (relationId === 8) {
			getClientData("GET", "", "clientFamilyMember/"+memberId, familyInfoSuccess);
			function familyInfoSuccess(data) {
				
				other_lexp=data.lifeExpectancy;
				//$("#idLEDIV").show();
				$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
			}
			tableRowId
					.append('<td><img src="../Common/assets/images/icons/Other-C.png"  id="'
							+ memberId + '" class="assetOwner1_img"  alt="'
							+ relationName
							+ '" tabindex="200"/>'
							+ relationName
							+ ' '
							+ firstName + '</td>');

		}
	

}

function ExtClickAction() {
	var extFlag = $("input[name='extensionFlag']:checked").val();
	if(extFlag == "Y") {
		$('#idPPFYesExtensionDiv').show();
		$("#idExtensionCompoundingFrequency").val(1);
		$("#idExtensionTenure").val(5);
		$("#idExtTypeFlag").val("Y");
	} else {
		$('#idPPFYesExtensionDiv').hide();
    	$("#idExtTypeFlag").val("Y");
	}
}

function NPSModeClickAction() {
	//alert("NPS Mode canged");
	var planType = $("#idPlanType").val();
	serviceurl = "clientNPS/getAssetClassReturn/";
	/*if (pageMode=="ADD") {*/
		getClientDataWithErrorHandling("GET", "", serviceurl, foundAssetClassReturnSuccess, foundAssetClassReturnError);
		function foundAssetClassReturnSuccess(data) {
			
			if(planType == "1") {
				//alert('Auto Plan Return: '+data.autoPlanReturn);
				$("#idAutoPlanReturns").val(parseFloat(data.autoPlanReturn*100).toFixed(2));
				sessionStorage.removeItem("AutoPlanReturns");
				sessionStorage.setItem("AutoPlanReturns", parseFloat(data.autoPlanReturn*100).toFixed(2));
			}
			else if (planType == "2") {
				//alert('Asset Class E Return: '+data.assetClassEReturn + ' Asset Class C Return: '+data.assetClassCReturn + ' Asset Class G Return: '+data.assetClassGReturn);
				$("#idAssetClassCReturns").val(parseFloat(data.assetClassCReturn*100).toFixed(2));
				$("#idAssetClassGReturns").val(parseFloat(data.assetClassGReturn*100).toFixed(2));
				$("#idAssetClassEReturns").val(parseFloat(data.assetClassEReturn*100).toFixed(2));
				sessionStorage.removeItem("AssetClassEReturns");
				sessionStorage.setItem("AssetClassEReturns", parseFloat(data.assetClassEReturn*100).toFixed(2));
				sessionStorage.removeItem("AssetClassCReturns");
				sessionStorage.setItem("AssetClassCReturns", parseFloat(data.assetClassCReturn*100).toFixed(2));
				sessionStorage.removeItem("AssetClassGReturns");
				sessionStorage.setItem("AssetClassGReturns", parseFloat(data.assetClassGReturn*100).toFixed(2));
			}
		}
		
		function foundAssetClassReturnError(error) {
			if(planType == "1") {
				$("#idAutoPlanReturns").css('border','2px solid red');				
				$("#idAutoPlanReturns").css('borderRadius','7px');				
				$("#idAutoPlanReturns").val("");
			}
			$("#alertaper").text('Asset Class Return E do not exist for current date');
		}
	//}
		
	if(planType == "1") {
		// for Auto Mode
		$('#idActiveMode').hide();
		$('#idAutoMode').show();
	} else if(planType == "2") {
		// for Active Mode
		$('#idAutoMode').hide();
		$('#idActiveMode').show();
	}else {
		$('#idAutoMode').hide();
		$('#idActiveMode').hide();
	}
}


var nonRetired = [];

function populateFamilyMemberByClientIdCustom(clientId, tableRowId) {
	 
	//getClientData("GET", "", "clientFamilyMemberImageByClient/" + clientId, familyMemberSuccess);
	var assetType = sessionStorage.getItem("SELECTED_ROS_ASSET_TYPE"); 
	if(assetType == 12) {
		getClientData("GET", "", "checkIfPpfPresentForAll/" + clientId, familyMemberSuccess);
	}else if (assetType == 14) {
		getClientData("GET", "", "checkIfNpsPresentForAll/" + clientId, familyMemberSuccess);
	}else if (assetType == 33) {
		getClientData("GET", "", "checkIfApyPresentForAll/" + clientId, familyMemberSuccess);
	}else if (assetType == 13) {
		//new code
		//var data = JSON.parse(sessionStorage.getItem("FAMILY_MEMBER_LIST"));
		serviceurl = "clientFamilyMember/client/" + selectedClientId;
		getClientData("GET", "", serviceurl, onSuccessMember);
		function onSuccessMember(data) {
			//console.log(data);
			$.each(data, function (index, cfm) {
				//console.log("data "+cfm.id);
				//alert("flag" + cfm.retiredFlag);
				if(cfm.retiredFlag == "N"){
					nonRetired.push(cfm.id);
					
				}
			});
			
			getClientData("GET", "", "checkIfEpfPresentForAll/" + clientId, familyMemberSuccess);
		}
		
		
		getClientData("GET", "", "familyMember/" + selectedClientId, onSuccessFamilyMember);
		function onSuccessFamilyMember(data) {
			
				if(data.retiredFlag == "N"){
					//alert(data.id);
					nonRetired.push(data.id);
					//alert(nonRetired);
					
				}
			
		}
		
		//var retirementStatus = sessionStorage.getItem("SELECTED_CLIENT_RETIREMENT_STATUS");
		/*alert(retirementStatus);
		if(retirementStatus == "N"){
				nonRetired.push(clientId);
				alert("nonRetired "+nonRetired);
		}*/
		//=============
		
	}else if (assetType == 34) {
		getClientData("GET", "", "clientFamilyMemberImageByClient/" + clientId, familyMemberSuccess);
	}
	
	var flag = [];
	var lifeFlag = 0;
	function familyMemberSuccess(data) {
		//$("#familyMemberImagePPF").empty();
		//////////console.log("data  " + data.length);
		var gender;
		var membericon = [];
		//alert("inside familyMemberSuccess");
		$.each(data,function(index, item) {
			
			gender = item.gender;
			membericon.push(item.id);
			//console.log(item);
			if (assetType == 13){
			/*alert("assetType "+assetType);
			alert("length: "+nonRetired.length);*/
			if(item.retiredFlag == "N"){
				for(var i = 0; i < nonRetired.length; i++) {
					/*alert("item.id "+item.id);
					alert("nonRetired "+nonRetired[i]);*/
						if(item.id == nonRetired[i]){
							flag.push(item.id);
							//alert("flag "+flag);
						}
				}
			}
			
		  }else{
			  //alert("sss flag "+flag);
				flag.push(item.id);
		  }
			/*sessionStorage.removeItem("SELECTED_RELATION_ID");
			sessionStorage.setItem("SELECTED_RELATION_ID", item.relationID);*/
			//alert("flag array check "+(flag.indexOf(item.id) > -1));
			//var n = (item.id).toString();
			//alert(flag);
			
			if(flag.indexOf(item.id) > -1){
	    	
			if (item.relationID === 0) {
				
				sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",item.id);
				
				
				// get the retirement age for the first time
				getClientData("GET", "", "clientFamilyMember/"+item.id, familyInfoSuccess);
				function familyInfoSuccess(data) {
					//alert("inside clientFamilyMember success")
					client_lexp=data.lifeExpectancy;
					$("#idRetirementAge").val(data.retirementAge);
					$('#idLDIV').show();
					$("#idLifeExp").val(client_lexp);
					$("#idLexpDiv").hide();
					$("#idLESelf").val(client_lexp);	
					$("#idLEDIV").hide();
					$("#idSPOUSE").hide();
					$("#idContributionUptoAge").val(data.retirementAge);
					$("#idEpfWithdrawalAge").val(data.retirementAge);
					sessionStorage.removeItem("RetirementAge");
					sessionStorage.setItem("RetirementAge", data.retirementAge);
					
				}
				//console.log("item.id "+item.id);
				SELECTED_FAMILY_MEMBER_ID = item.id;
				
				if (gender === 'M') {
					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Man-A.png" id="'
									+ item.id
									+ '" onClick="onClickImageCustom('
									+ item.id
									+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '</td>');
					if(item.id == membericon[0]){
						onClickImageCustom(item.id, item.relationID);	
						
					}
				} else {
					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Lady-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImageCustom('
									+ item.id
									+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ '</td>');
					if(item.id == membericon[0]){
						onClickImageCustom(item.id, item.relationID);	
					}
				}
				
			}
		
			if (item.relationID === 1) {
				// get the retirement age for the first time
				
				getClientDataAsyncFalse("GET", "", "clientFamilyMember/" + item.id, familyInfoSuccessSpouse);
				function familyInfoSuccessSpouse(data) {
					//alert("inside familyInfoSuccessSpouse")
					spouse_lexp=data.lifeExpectancy;
					//$("#idSELF").hide();
					//$("#idSPOUSE").show();
					//$('#idLEDIV').hide();
//					alert("hide");
				//	$('#idLDIV').hide();
//					alert(spouse_lexp);
					$("#idLESpouse").val(spouse_lexp);
					//alert("lifeFlag1"+lifeFlag);
					if(lifeFlag === 0){
						$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
						lifeFlag = 1;
						
					}
				}
				
				if (gender === 'M') {
					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Man-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImageCustom('
									+ item.id
									+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ ' '
									+ item.firstName
									+ '</td>');
					if(item.id == membericon[0]){
						onClickImageCustom(item.id, item.relationID);	
					}
				} else {
					
					tableRowId
							.append('<td><img src="../Common/assets/images/icons/Lady-A.png"  id="'
									+ item.id
									+ '" onClick="onClickImageCustom('
									+ item.id
									+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
									+ item.relationName
									+ '" tabindex="200"/>'
									+ item.relationName
									+ ' '
									+ item.firstName
									+ '</td>');
					if(item.id == membericon[0]){
						onClickImageCustom(item.id, item.relationID);	
					}
				}

			}
				
			if (item.relationID === 2) {
				
				getClientDataAsyncFalse("GET", "", "clientFamilyMember/"+item.id, familyInfoSuccess);
				function familyInfoSuccess(data) {
					son_lexp=data.lifeExpectancy;
					//$("#idLEDIV").show();
//					alert("hide");
					//$('#idLDIV').hide();
					$("#idLE").val(data.lifeExpectancy);	
					if(lifeFlag === 0){
					$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
					lifeFlag = 1;
					}
					
				}

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
								+ item.id
								+ '" onClick="onClickImageCustom('
								+ item.id
								+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
								+ item.relationName
								+ '" tabindex="200"/>'
								+ item.relationName
								+ ' '
								+ item.firstName + '</td>');
				if(item.id == membericon[0]){
					onClickImageCustom(item.id, item.relationID);	
				}
			}

			if (item.relationID === 3) {
				
				getClientDataAsyncFalse("GET", "", "clientFamilyMember/"+item.id, familyInfoSuccess);
				function familyInfoSuccess(data) {
					daughter_lexp=data.lifeExpectancy;
//					alert("hide");
					//$('#idLDIV').hide();
//					alert(data.lifeExpectancy);
					//alert("lifeFlag4"+lifeFlag);
					$("#idLE").val(data.lifeExpectancy);
					if(lifeFlag === 0){
						$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
						lifeFlag = 1;
						}
				}

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
								+ item.id
								+ '" onClick="onClickImageCustom('
								+ item.id
								+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
								+ item.relationName
								+ '" tabindex="200"/>'
								+ item.relationName
								+ ' '
								+ item.firstName + '</td>');
				if(item.id == membericon[0]){
					onClickImageCustom(item.id, item.relationID);	
				}
			}

			if (item.relationID === 4) {
				
				getClientDataAsyncFalse("GET", "", "clientFamilyMember/"+item.id, familyInfoSuccess);
				function familyInfoSuccess(data) {
					father_lexp=data.lifeExpectancy;
//					alert("hide");
					//$('#idLDIV').hide();
					$("#idLE").val(data.lifeExpectancy);
					if(lifeFlag === 0){
						$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
						lifeFlag = 1;
						}
				}

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Father-A.png"  id="'
								+ item.id
								+ '" onClick="onClickImageCustom('
								+ item.id
								+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
								+ item.relationName
								+ '" tabindex="200"/>'
								+ item.relationName
								+ ' '
								+ item.firstName + '</td>');
				if(item.id == membericon[0]){
					onClickImageCustom(item.id, item.relationID);	
				}
			}
			if (item.relationID === 5) {
				
				getClientDataAsyncFalse("GET", "", "clientFamilyMember/"+item.id, familyInfoSuccess);
				function familyInfoSuccess(data) {
					mother_lexp=data.lifeExpectancy;
   //			    alert("hide");
				//	$('#idLDIV').hide();
					$("#idLE").val(data.lifeExpectancy);
					if(lifeFlag === 0){
						$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
						lifeFlag = 1;
						}
				}

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Mother-A.png"  id="'
								+ item.id
								+ '" onClick="onClickImageCustom('
								+ item.id
								+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
								+ item.relationName
								+ '" tabindex="200"/>'
								+ item.relationName
								+ '  '
								+ item.firstName + '</td>');
				if(item.id == membericon[0]){
					onClickImageCustom(item.id, item.relationID);	
				}
			}
			if (item.relationID === 6) {
				
				getClientDataAsyncFalse("GET", "", "clientFamilyMember/"+item.id, familyInfoSuccess);
				function familyInfoSuccess(data) {
					brother_lexp=data.lifeExpectancy;
//					alert("hide");
					//$('#idLDIV').hide();
					$("#idLE").val(data.lifeExpectancy);
					if(lifeFlag === 0){
						$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
						lifeFlag = 1;
						}
				}

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Boy-A.png"  id="'
								+ item.id
								+ '" onClick="onClickImageCustom('
								+ item.id
								+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
								+ item.relationName
								+ '" tabindex="200"/>'
								+ item.relationName
								+ '  '
								+ item.firstName + '</td>');
				if(item.id == membericon[0]){
					onClickImageCustom(item.id, item.relationID);	
				}
			}
			if (item.relationID === 7) {
				
				getClientDataAsyncFalse("GET", "", "clientFamilyMember/"+item.id, familyInfoSuccess);
				function familyInfoSuccess(data) {
					sister_lexp=data.lifeExpectancy;
//					alert("hide");
					//$('#idLDIV').hide();
					$("#idLE").val(data.lifeExpectancy);
					if(lifeFlag === 0){
						$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
						lifeFlag = 1;
						}
				}

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Girl-A.png"  id="'
								+ item.id
								+ '" onClick="onClickImageCustom('
								+ item.id
								+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
								+ item.relationName
								+ '" tabindex="200"/>'
								+ item.relationName
								+ '  '
								+ item.firstName + '</td>');
				if(item.id == membericon[0]){
					onClickImageCustom(item.id, item.relationID);	
				}
			}
			if (item.relationID === 8) {
				
				getClientDataAsyncFalse("GET", "", "clientFamilyMember/"+item.id, familyInfoSuccess);
				function familyInfoSuccess(data) {
					other_lexp=data.lifeExpectancy;
//					alert("hide");
					//$('#idLDIV').hide();
					$("#idLE").val(data.lifeExpectancy);
					if(lifeFlag === 0){
						$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
						lifeFlag = 1;
						}
				}

				tableRowId
						.append('<td><img src="../Common/assets/images/icons/Other-A.png"  id="'
								+ item.id
								+ '" onClick="onClickImageCustom('
								+ item.id
								+ ','+item.relationID+')" class="assetOwner1_img"  alt="'
								+ item.relationName
								+ '" tabindex="200"/>'
								+ item.relationName
								+ '  '
								+ item.firstName + '</td>');
				if(item.id == membericon[0]){
					onClickImageCustom(item.id, item.relationID);	
				}
			}	
			
		  }
			
			
		});
		
	}
	
}

function populateFamilyMemberImageCustom(id, imageID) {
	//alert('In populateFamilyMemberImageCustom');
	//alert("id in pFMIC: " + id);
	//$('#familyMemberImagePPF  > td').each(function() {
	$(imageID +' > td').each(function() {
		if ($(this).find('img').attr('id') != id) {
			newSrc = $(this).find('img').attr('src').replace("-C", "-A");
			$(this).find('img').attr('src', newSrc);
		} else {
			newSrc = $(this).find('img').attr('src').replace("-A", "-C");
			$(this).find('img').attr('src', newSrc);
			getClientData("GET", "", "clientFamilyMember/"+id, retirementSuccess);
			function retirementSuccess(data) {
				//console.log("data set on click"+data.retirementAge);
				//alert("inside retirementAge");
				$("#idRetirementAge").val(data.retirementAge);
				$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
				$("#idSELF").hide();
				$("#idSPOUSE").hide();
			}
		}
	});
	sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",id);
	//console.log(sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID"));
}


function onClickImageCustom(id, relationId) {
	//undoChange();
	var newSrc;
	var assetType = sessionStorage.getItem("SELECTED_ROS_ASSET_TYPE"); 
	
	sessionStorage.removeItem("SELECTED_RELATION_ID");
	sessionStorage.setItem("SELECTED_RELATION_ID", relationId);
	
	if(assetType == 12) {
		$('#familyMemberImagePPF  > td').each(function() {
			if ($(this).find('img').attr('id') != id) {
				newSrc = $(this).find('img').attr('src').replace("-C", "-A");
				$(this).find('img').attr('src', newSrc);
			} else {
				newSrc = $(this).find('img').attr('src').replace("-A", "-C");
				$(this).find('img').attr('src', newSrc);
			}
		});
	} else if (assetType == 13) {
		$('#familyMemberImageEPF  > td').each(function() {
			if ($(this).find('img').attr('id') != id) {
				newSrc = $(this).find('img').attr('src').replace("-C", "-A");
				$(this).find('img').attr('src', newSrc);
			} else {
				newSrc = $(this).find('img').attr('src').replace("-A", "-C");
				$(this).find('img').attr('src', newSrc);
			}
		});
	} else if (assetType == 14) {
		$('#familyMemberImageNPS  > td').each(function() {
			if ($(this).find('img').attr('id') != id) {
				newSrc = $(this).find('img').attr('src').replace("-C", "-A");
				$(this).find('img').attr('src', newSrc);
			} else {
				newSrc = $(this).find('img').attr('src').replace("-A", "-C");
				$(this).find('img').attr('src', newSrc);
			}
		});
	} else if (assetType == 33) {
		$('#familyMemberImageAPY  > td').each(function() {
			if ($(this).find('img').attr('id') != id) {
				newSrc = $(this).find('img').attr('src').replace("-C", "-A");
				$(this).find('img').attr('src', newSrc);
			} else {
				newSrc = $(this).find('img').attr('src').replace("-A", "-C");
				$(this).find('img').attr('src', newSrc);
			}
		});
	} else if (assetType == 34) {
		$('#familyMemberImageAnnuity  > td').each(function() {
			if ($(this).find('img').attr('id') != id) {
				newSrc = $(this).find('img').attr('src').replace("-C", "-A");
				$(this).find('img').attr('src', newSrc);
			} else {
				newSrc = $(this).find('img').attr('src').replace("-A", "-C");
				$(this).find('img').attr('src', newSrc);
			}
		});
	} 
	
	sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",id);
	
	// get the retirement age on click
	getClientData("GET", "", "clientFamilyMember/"+id, retirementSuccess);
	function retirementSuccess(data) {
		//console.log(data.retirementAge);
		//alert("inside retirementAge2");
		$("#idRetirementAge").val(data.retirementAge);
		$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
	}
	
	if(typeof onCustomImageClick==="function")
		{
		onCustomImageClick();
	}
}

function PPFonClickImage12(id) {
	//////////console.log("onclick " + id);
	var newSrc;
	$('#familyMemberImagePPF  > td').each(function() {
		var id1 = $(this).find('img').attr('id');

		//	alert(id1+" "+id);

		if ($(this).find('img').attr('id') != id) {
			newSrc = $(this).find('img').attr('src').replace("-C", "-A");

			$(this).find('img').attr('src', newSrc);
		} else {
			newSrc = $(this).find('img').attr('src').replace("-A", "-C");
			$(this).find('img').attr('src', newSrc);
		}
	});

	SELECTED_FAMILY_MEMBER_ID = id;
	//////////console.log("family member id 1 :" + SELECTED_FAMILY_MEMBER_ID);
	
	//getClientData("GET", "", "clientFamilyMember/" + SELECTED_FAMILY_MEMBER_ID, retirementAgeSuccess);
}

function NPSonClickImage12(id) {
	var newSrc;
	$('#familyMemberImageNPS  > td').each(function() {
		var id1 = $(this).find('img').attr('id');

		//	alert(id1+" "+id);

		if ($(this).find('img').attr('id') != id) {
			newSrc = $(this).find('img').attr('src').replace("-C", "-A");

			$(this).find('img').attr('src', newSrc);
		} else {
			newSrc = $(this).find('img').attr('src').replace("-A", "-C");
			$(this).find('img').attr('src', newSrc);
		}
	});

	SELECTED_FAMILY_MEMBER_ID = id;
}

function APYonClickImage12(id) {
	var newSrc;
	$('#familyMemberImageAPY  > td').each(function() {
		var id1 = $(this).find('img').attr('id');

		//	alert(id1+" "+id);

		if ($(this).find('img').attr('id') != id) {
			newSrc = $(this).find('img').attr('src').replace("-C", "-A");

			$(this).find('img').attr('src', newSrc);
		} else {
			newSrc = $(this).find('img').attr('src').replace("-A", "-C");
			$(this).find('img').attr('src', newSrc);
		}
	});

	SELECTED_FAMILY_MEMBER_ID = id;
}


function populateInterestFrequencyCustomized(freqDrop,placeholderText) {
	getClientDataAsyncFalse("GET", "", "AllFrequency", freqSuccess);
	function freqSuccess(data) {
		freqDrop.find('option').remove();
		freqDrop.append('<option value="">'+ placeholderText +'</option>');
		$.each(data, function (index, item) {
			freqDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});
	}
}

function populateNPSType(freqDrop) {
	getClientData("GET", "", "clientNPS/getAllPlanType", freqSuccess);
	function freqSuccess(data) {
		freqDrop.find('option').remove();
		freqDrop.append('<option value="">Plan Type</option>');
		$.each(data, function (index, item) {
			freqDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});
	}
}

function populateAnnuityType(freqDrop) {
	getClientData("GET", "", "AllAnnuityType", freqSuccess);
	function freqSuccess(data) {
		freqDrop.find('option').remove();
		freqDrop.append('<option value="">Annuity Type</option>');
		$.each(data, function (index, item) {
			freqDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			//alert("retirementStatus: " + retirementStatus);
			if (retirementStatus == "N"){
				$("option[value='6']").remove();
			} 
		});
	}
}

/*function populateAnnuityTypeEdit(freqDrop) {
	getClientData("GET", "", "AllAnnuityType", freqSuccess);
	function freqSuccess(data) {
		freqDrop.find('option').remove();
		freqDrop.append('<option value="">Annuity Type</option>');
		$.each(data, function (index, item) {
			//alert("retirementStatus: " + retirementStatus);
			freqDrop.append('<option value="6"> EPS Annuity </option>');
			
			if (retirementStatus == "N"){
				$("option[value='6']").remove();
			} 
		});
	}
}
*/

function populateMonthlyPensionRequired(monthlyPensionDrop) {
	
	getClientData("GET", "", "AllMasterAPYMonthlyPensionCorpus", pensionSuccess);
	function pensionSuccess(data) {
		monthlyPensionDrop.find('option').remove();
		monthlyPensionDrop.append('<option value="">Monthly Pension Required</option>');
		$.each(data, function (index, item) {
			monthlyPensionDrop.append('<option value="' + item.monthlyPension + '">' + maskAmountValue(item.monthlyPension) + '</option>');
		});
	}
}

function onCustomImageClick(){
	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
    var serviceurl = '/clientFamilyMember/'+selectedImageFamilyMemberid;
    //firstTime
    getClientData("GET", "", serviceurl, onSuccess);
    function onSuccess(data) {
		//alert("inside onSuccess");
    	
    	window.months = (parseInt(data.lifeExpectancy) * 12); 
        window.client_dob = moment(data.birthDate,'DD/MM/YYYY').toDate();
        window.client_lexp = moment(window.client_dob).add(window.months, 'months').toDate();
    	
        
    	//alert("data.lifeExpectancy spouse "+data.lifeExpectancy);
    	//alert("client_lexp "+client_lexp);
			if (data.relationID != 0 && data.relationID!= 1){
				$('#idLEDIV').show();
				$('#idSELF').hide();
				$('#idSPOUSE').hide();
				$('#idLexpDiv').show();
				$("#idLE").val(data.lifeExpectancy);
//				alert("hide");
				$('#idLDIV').hide();
				$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
				
			}else{
				if (data.relationID === 0) {
					$('#idSELF').show();
					$('#idSPOUSE').hide();
//					alert("hide");
					$('#idLEDIV').hide();
					$('#idLexpDiv').hide();
					$('#idLDIV').show();
					$("#idLESelf").val(data.lifeExpectancy);
					$("#idLifeExp").val(data.lifeExpectancy);
				}else{
					if (data.relationID === 1) {
							$('#idSELF').hide();
							$('#idSPOUSE').show();
//							alert("hide");
							$('#idLEDIV').hide();
//							alert("hide");
							$('#idLDIV').hide();
							$('#idLexpDiv').show();
							$("#idLifeExpectancyDIV").val(data.lifeExpectancy);
							
							
						}
				}
				if (data.relationID === 0) {
					//alert("data.relationID "+data.relationID);
					$("#idLESelf").val(data.lifeExpectancy);
					//$("#idLESpouse").val(spouse_lexp);	
					$("#idLifeExp").val(data.lifeExpectancy);
				}else{
					if (data.relationID === 1){
						//alert("data.relationID "+data.relationID);
						$("#idLESpouse").val(spouse_lexp);	
						$("#idLESelf").val(data.lifeExpectancy);
						$("#idLifeExpectancyDIV").val(spouse_lexp);
					} else {
						if (data.relationID === 2){
							$("#idLE").val(son_lexp);
							$("#idLifeExpectancyDIV").val(son_lexp);
						} else {
							if (data.relationID === 3){
								$("#idLE").val(daughter_lexp);
								$("#idLifeExpectancyDIV").val(daughter_lexp);
							} else {
								if (data.relationID === 4) {
									$("#idLE").val(father_lexp);
									$("#idLifeExpectancyDIV").val(father_lexp);
								} else {
									if (data.relationID === 5) {
										$("#idLE").val(mother_lexp);
										$("#idLifeExpectancyDIV").val(mother_lexp);
									} else {
										if (data.relationID === 6) {
											$("#idLE").val(brother_lexp);
											$("#idLifeExpectancyDIV").val(brother_lexp);
										} else {
											if (data.relationID === 7) {
												$("#idLE").val(sister_lexp);
												$("#idLifeExpectancyDIV").val(sister_lexp);
											} else {
												if (data.relationID === 8) {
													$("#idLE").val(other_lexp);
													$("#idLifeExpectancyDIV").val(other_lexp);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}	
  
}
    	 
$("#idUndoROS").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});

function undoChange(){
	updatedUNDO();
	
	if (pageMode=="ADD") {
		
		if(financialAssetTypeId == 12){
			$(".form-control").val("");
			$("#idCompoundingFrequency").val(1);
			$("#idPPFTenure").val(15);
			
			var extensionFlagRadio = $("input[name='extensionFlag']:checked").val();
			//alert("extensionFlagRadio: " + extensionFlagRadio);
			switch (extensionFlagRadio) {
			 	case "Y":
					$('#idPPFYesExtensionDiv').hide();
					$("#idExtTypeFlag").val("Y");
					$("#idExtensionCompoundingFrequency").val(1);
					$("#idExtensionTenure").val(5);
					break;
			    case "N":
					$('#idPPFYesExtensionDiv').hide();
					$("#idExtTypeFlag").val("Y");
					$("#idExtensionCompoundingFrequency").val(1);
					$("#idExtensionTenure").val(5);
					break;
			}
			$("#idPPFExtensionRadioGroup input[name='extensionFlag']").prop("checked", false);
		} else {
			if(financialAssetTypeId == 13) {
				$(".form-control").val("");
				$("#idAnnualContributionIncrease").val(sessionStorage.getItem("AnnualContributionIncrease"));
				$("#idEpfoInterestRate").val(sessionStorage.getItem("EPFInterestRate"));
				$("#idContributionUptoAge").val(sessionStorage.getItem("RetirementAge"));
				$("#idEpfWithdrawalAge").val(sessionStorage.getItem("RetirementAge"));
				$("#idSalaryIncreaseRefMonth").val("April");
			} else {
				if(financialAssetTypeId == 14) {
					$(".form-control").val("");
					$("#idEmployeeContributionFrequency").val(12);
					$("#idEmployerContributionFrequency").val(12);
					$("#idExpectedAnnualIncrease").val(sessionStorage.getItem("ExpectedAnnualIncrease"));
					var planTypeSelected = $("#idPlanType").val();
					//alert("planTypeSelected: " + planTypeSelected);
					if (planTypeSelected == "") {
						$("#idAutoPlanReturns").val(sessionStorage.getItem("AutoPlanReturns"));
						$("#idAutoMode").hide();
						$("#idAssetClassEReturns").val(sessionStorage.getItem("AssetClassEReturns"));
						$("#idAssetClassCReturns").val(sessionStorage.getItem("AssetClassCReturns"));
						$("#idAssetClassGReturns").val(sessionStorage.getItem("AssetClassGReturns"));
						$("#idActiveMode").hide();
					}
				} else {
					if (financialAssetTypeId == 34) {
						$("#idAnnuityType, #idPensionableCorpus, #idAnnuityRate, #idPayoutFrequency, #idAnnuityStartDate, #idGrowthRate, #idAnnuityMonthlyBasicDA, #idAnnuityServiceYears, #idAnnuityAnnualContributionIncrease").val("");
						$("#EPSannuity").hide();
					} else {
						if (financialAssetTypeId == 33) {
							$("#idMonthlyPensionRequired, #idApyStartDate").val("");
							$("#idInvestmentFrequency").val(12);
						}
					}
				}
			}
		}
	} else {
		if(pageMode=="EDIT"){
			if(financialAssetTypeId == 13){
				getEPF();
			}
			
			if(financialAssetTypeId == 12){
				getPPF();
			}
			
			if(financialAssetTypeId == 14){
				getNPS();
			}
			
			if(financialAssetTypeId == 34){
				getAnnuity();
			}
			
			if(financialAssetTypeId == 33){
				getAPY();
			}
		}
	}
}

function updatedUNDO(){
	
		if(financialAssetTypeId == 13){
			var lEpfCurrentBalance = document.getElementById("idEpfCurrentBalance");
			var lEpsCurrentBalance = document.getElementById("idEpsCurrentBalance");
			var lMonthlyBasicDA = document.getElementById("idMonthlyBasicDA");
			var lAnnualContributionIncrease = document.getElementById("idAnnualContributionIncrease");
			var lEpfoInterestRate = document.getElementById("idEpfoInterestRate");
			var lContributionsUptoAge = document.getElementById("idContributionUptoAge");
			var lEpfWithdrawalAge = document.getElementById("idEpfWithdrawalAge");
			var lServiceYears = document.getElementById("idServiceYears");
			var lRetirementAge = document.getElementById("idRetirementAge");
			var lSalaryIncreaseReferenceMonth = document.getElementById("idSalaryIncreaseRefMonth");
			var lSalaryIncreaseReferenceMonthGroup = document.getElementById("idSalaryIncreaseRefMonthGroup");
			
			lEpfCurrentBalance.style.border = "";
			lEpsCurrentBalance.style.border = "";
			lMonthlyBasicDA.style.border = "";
			lAnnualContributionIncrease.style.border = "";
			lEpfoInterestRate.style.border = "";
			lContributionsUptoAge.style.border = "";
			lEpfWithdrawalAge.style.border = "";
			lServiceYears.style.border = "";
			lSalaryIncreaseReferenceMonthGroup.style.border = "";
			lSalaryIncreaseReferenceMonthGroup.style.borderRadius = "";
			
			document.getElementById('alertepfCurrentBalance').innerHTML="";
			document.getElementById('alertepsCurrentBalance').innerHTML="";
			document.getElementById('alertmonthlyBasicDA').innerHTML="";
			document.getElementById('alertannualcontributionincrease').innerHTML="";
			document.getElementById('alertepfointerestrate').innerHTML="";
			document.getElementById('alertcontributionsuptoage').innerHTML="";
			document.getElementById('alertepfwithdrawalage').innerHTML="";
			document.getElementById('alertserviceyears').innerHTML="";
			document.getElementById('alertSIRM').innerHTML="";
			document.getElementById('alertform').innerHTML="";
		}
		
		if(financialAssetTypeId == 12){
			var lPPFStartDate = document.getElementById("idStartDate");
			var lIdCalendarStartDate = document.getElementById("idPPFStartDateCalendar");
			var lCurrentPPFBalance = document.getElementById("idCurrentBalance");
			var lPlannedDepositAmount = document.getElementById("idPlannedDepositAmount");
			var lPPFTenure = document.getElementById("idPPFTenure");
			var lPPFExtension = $("input:radio[name=extensionFlag]:checked").val();
			var lPPFExtensionType = document.getElementById("idExtTypeFlag");
			var lPPFExtensionStartDate = document.getElementById("idExtensionStartDate");
			var lIdCalendarExtStartDate = document.getElementById("idPPFExtStartDateCalendar");
			var lExtCurrentBalance = document.getElementById("idExtensionCurrentBalance");
			var lExtDepositAmount = document.getElementById("idDepositAmountExt");
			var lExtensionY = document.getElementById("idppfExtension1");
			var lDepositFrequency = document.getElementById("idAmountDepositFrequency");
			var lExtDepositFrequency = document.getElementById("idAmountDepositFrequencyExt");

			lPPFStartDate.style.border = "";
			lIdCalendarStartDate.style.border = "";
		    lCurrentPPFBalance.style.border = "";
		    lPlannedDepositAmount.style.border = "";
		    lPPFTenure.style.border = "";
		    document.getElementById("idPPFExtension").style.border = "";
		    lPPFExtensionType.style.border = "";
		    lPPFExtensionStartDate.style.border = "";
			lIdCalendarExtStartDate.style.border = "";
			lExtCurrentBalance.style.border = "";
			lExtDepositAmount.style.border = "";
			lDepositFrequency.style.border = "";
			lExtDepositFrequency.style.border = "";
			
			
			document.getElementById('alertppfsd').innerHTML="";
			document.getElementById('alertppfcb').innerHTML="";
			document.getElementById('alertpda').innerHTML="";
			document.getElementById('alertppftenure').innerHTML="";
			document.getElementById('alertppfext').innerHTML="";
			document.getElementById('alertppfet').innerHTML="";
			document.getElementById('alertppfesd').innerHTML="";
			document.getElementById('alertdaep').innerHTML="";
			document.getElementById('alertextcurbalance').innerHTML="";
			document.getElementById('alertppfdf').innerHTML="";
			document.getElementById('alertAdfExt').innerHTML="";
			document.getElementById('alertform').innerHTML="";
			
		}
		
		if(financialAssetTypeId == 14){
			var lAssetClassEAllocation = document.getElementById("idAssetClassEAllocation");
			var lAssetClassCAllocation = document.getElementById("idAssetClassCAllocation");
			var lAssetClassGAllocation = document.getElementById("idAssetClassGAllocation");
			var lCurrentNPSBalance = document.getElementById("idNpsCurrentBalance");
			var lEmployeeContribution = document.getElementById("idEmployeeContribution");
			var lEmployerContribution = document.getElementById("idEmployerContribution");
			var lAssetClassEExpectedReturns = document.getElementById("idAssetClassEReturns");
			var lAssetClassCExpectedReturns = document.getElementById("idAssetClassCReturns");
			var lAssetClassGExpectedReturns = document.getElementById("idAssetClassGReturns");
			var lAutoPlanExpectedReturns = document.getElementById("idAutoPlanReturns");
			var lEmployeeContributionUptoAge = document.getElementById("idEmployeeContributionUptoAge");
			var lEmployerContributionUptoAge = document.getElementById("idEmployerContributionUptoAge");
			var lRetirementAge = document.getElementById("idRetirementAge");
			var lExpectedAnnualIncrease = document.getElementById("idExpectedAnnualIncrease");
			var lPlanType = document.getElementById("idPlanType");
		   	var lPlanTypeSelected = $("#idPlanType").val();
 	
			lAssetClassEAllocation.style.border = "";
			lAssetClassCAllocation.style.border = "";
			lAssetClassGAllocation.style.border = "";
			lCurrentNPSBalance.style.border = "";
			lEmployeeContribution.style.border = "";
			lEmployerContribution.style.border ="";
			lAssetClassEExpectedReturns.style.border = "";
			lAssetClassCExpectedReturns.style.border = "";
			lAssetClassGExpectedReturns.style.border = "";
			lAutoPlanExpectedReturns.style.border = "";
			lEmployeeContributionUptoAge.style.border ="";
			lEmployerContributionUptoAge.style.border = "";
			lRetirementAge.style.border = "";
			lPlanType.style.border = "";
			lExpectedAnnualIncrease.style.border="";
	
			document.getElementById('alertacea').innerHTML="";
			document.getElementById('alertacca').innerHTML="";
			document.getElementById('alertacga').innerHTML="";
			document.getElementById('alertcnpsb').innerHTML="";
			document.getElementById('alertemployeec').innerHTML="";
			document.getElementById('alertemployerc').innerHTML="";
			document.getElementById('alertaceer').innerHTML="";
			document.getElementById('alertaccer').innerHTML="";
			document.getElementById('alertacger').innerHTML="";
			document.getElementById('alertaper').innerHTML="";
			document.getElementById('alertemployeecua').innerHTML="";
			document.getElementById('alertemployercua').innerHTML="";
			document.getElementById('alertnpspt').innerHTML="";
			document.getElementById('alerteaiic').innerHTML="";
			document.getElementById('alertform').innerHTML="";
		}
		
		if(financialAssetTypeId == 34){
			//var lPensionableCorpus = document.getElementById("idPensionableCorpus");
			var lAnnuityRate = document.getElementById("idAnnuityRate");
			var lAnnuityGrowthRate = document.getElementById("idGrowthRate");
			var lAnnuityStartDate = document.getElementById("idAnnuityStartDate");
			var lAnnuityType = document.getElementById("idAnnuityType");
			var lAnnuityPayoutFrequency = document.getElementById("idPayoutFrequency");
			var lAnnuityMonthlyBasicDA = document.getElementById("idAnnuityMonthlyBasicDA");
			var lAnnuityServiceYears = document.getElementById("idAnnuityServiceYears");
			var lAnnuityAnnualContribIncr = document.getElementById("idAnnuityAnnualContributionIncrease");
			var lClientEPFId = document.getElementById("idEpfId");
			
			//lPensionableCorpus.style.border = "";
			lAnnuityRate.style.border = "";
			lAnnuityGrowthRate.style.border = "";
			lAnnuityStartDate.style.border = "";
			lAnnuityType.style.border = "";
			lAnnuityPayoutFrequency.style.border = "";
			lAnnuityMonthlyBasicDA.style.border = "";
			lAnnuityServiceYears.style.border = "";
			lAnnuityAnnualContribIncr.style.border = "";
		
			//document.getElementById('alertpensionablecorpus').innerHTML="";
			document.getElementById('alertannuityrate').innerHTML="";
			document.getElementById('alertannuitygrowthrate').innerHTML="";
			document.getElementById('alertat').innerHTML="";
			document.getElementById('alertapf').innerHTML="";
			document.getElementById('alertannuityMonthlyBasicDA').innerHTML="";
			document.getElementById('alertannuityServiceYears').innerHTML="";
			document.getElementById('alertannuityAnnualContributionIncrease').innerHTML="";
			document.getElementById('alertannuitystartdate').innerHTML="";
			document.getElementById('alertform').innerHTML="";
		}
		
		if(financialAssetTypeId == 33){
			var lApyStartDate = document.getElementById("idApyStartDate");
			var lIdCalendar = document.getElementById("idStartDateCalendar");
			var lMonthlyPensionRequired = document.getElementById("idMonthlyPensionRequired");
			var lInvestmentFrequency = document.getElementById("idInvestmentFrequency");
			
			lMonthlyPensionRequired.style.border = "1px solid #ccc";
			lApyStartDate.style.border = "1px solid #ccc";
			lInvestmentFrequency.style.border = "1px solid #ccc";
			
			document.getElementById('alertapystartdate').innerHTML="";
			document.getElementById('alertif').innerHTML="";
			document.getElementById('alertmonthlypension').innerHTML="";
			document.getElementById('alertform').innerHTML="";
		}
}

function maskAllAmountFields() {
	if (financialAssetTypeId == "12") { 
		maskAmount('#idCurrentBalance');
		maskAmount('#idPlannedDepositAmount');
		maskAmount('#idExtensionCurrentBalance');
		maskAmount('#idDepositAmountExt');
	}	
	if (financialAssetTypeId == "13") { 
		maskAmount('#idEpfCurrentBalance');
		maskAmount('#idEpsCurrentBalance');
		maskAmount('#idMonthlyBasicDA');
	}	
	if (financialAssetTypeId == "14") { 
		maskAmount('#idNpsCurrentBalance');
		maskAmount('#idEmployeeContribution');
		maskAmount('#idEmployerContribution');
	}
	/*if (financialAssetTypeId == "33") { 
		maskAmount('#idMonthlyPensionRequired');
		}*/
	if (financialAssetTypeId == "34") { 
		maskAmount('#idPensionableCorpus');
		maskAmount('#idAnnuityMonthlyBasicDA');
	}	
}

function unmaskAllAmountFields() {
	if (financialAssetTypeId == "12") { 
		unmaskAmount('#idCurrentBalance');
		unmaskAmount('#idPlannedDepositAmount');
		unmaskAmount('#idExtensionCurrentBalance');
		unmaskAmount('#idDepositAmountExt');
	}	
	if (financialAssetTypeId == "13") { 
		unmaskAmount('#idEpfCurrentBalance');
		unmaskAmount('#idEpsCurrentBalance');
		unmaskAmount('#idMonthlyBasicDA');
	}	
	if (financialAssetTypeId == "14") { 
		unmaskAmount('#idNpsCurrentBalance');
		unmaskAmount('#idEmployeeContribution');
		unmaskAmount('#idEmployerContribution');
	}
	/*if (financialAssetTypeId == "33") { 
		unmaskAmount('#idMonthlyPensionRequired');
	}*/
	if (financialAssetTypeId == "34") { 
		unmaskAmount('#idPensionableCorpus');
		unmaskAmount('#idAnnuityMonthlyBasicDA');
	}	
}





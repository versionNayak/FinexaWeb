var	selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var selectedFundID = sessionStorage.getItem("SELECTED_FUND_ID");
var assetCategoryId = sessionStorage.getItem("SELECTED_ASSET_CATEGORY");
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
var pageMode = sessionStorage.getItem("PAGE_MODE");		
var assetTypeID="";
var serviceurl="";
var v1monthFromToday = moment().add(1, 'M').format('DD/MM/YYYY');
var navFound;
var fundData;
var clientDOB;
var clientLE;
var LEInMonths;
var	selectedDefaultImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
$(document).ready(function () {
	//alert("1");
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				$("#idSaveFund").show();
				$("#undo").show();
			}else if(loggedClient.clientInfoView === "Y"){
				$("#idSaveFund").hide();
				$("#undo").hide();
			}
		}else if(loggedUser != null && loggedUser.role === "Admin"){
			$("#idSaveFund").hide();
			$("#undo").hide();
		}else{
			if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
				$("#idSaveFund").show();
				$("#undo").show();
			}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
				$("#idSaveFund").hide();
				$("#undo").hide();
			}
		}
	
	 clientDOB = moment(sessionStorage.getItem("SELECTED_CLIENT_DOB"),'DD/MM/YYYY').toDate();
	 LEInMonths = (parseInt(sessionStorage.getItem("SELECTED_CLIENT_LIFE_EXP")) * 12); 
	 clientLE = moment(clientDOB).add(LEInMonths, 'months').toDate();
	if (pageMode=="ADD")
		$('#idRadioStart').show();
	
    $(function(){
    	$('input[type="radio"]').click(function(){
    		$('#idRadioStart').hide();
			$('#MainDiv').show();
		    $('#idButton').show();

		    if ($("#idFundTypeMF").is(':checked')) {
		    	//alert($("#idFundTypeMF").val());
		    	$(".dashboardheading").html("Add Mutual Fund");
		    	assetTypeID="19";
		    	showMFForm();
		    }  
		    else if ($("#idFundTypeETF").is(':checked')){
		    	//	alert($("#idFundTypeETF").val());
			    	$(".dashboardheading").html("Add ETF");
			    	assetTypeID="20";
		    		showETFForm();	
			} 
		    else if ($("#idFundTypePMS").is(':checked')){
		    	$(".dashboardheading").html("Add PMS");				    		
		    	assetTypeID="21";
	    		showPMSForm();
	    		$("#idACategory").change(function(event) {
	    			$('#SUB').show();
	    			var assetCategory = $(this).val();
	    			//alert("assetCategory: " + assetCategory);
	    			getPMSSubAssetClass(assetCategory);
	    		});
	    	}
		});
	});
	
    //Initialize form
    initializeForm();

    //Populate Scheme Name Dropdown for Selected Fund	
	$( "#idFHouse" ).change(function() {
		getSchemeNameListForSelectedFund();
	});	
			
	//Fetch Close Ended/Open Ended Flag for Selected Fund and Scheme		
	$( "#idSName" ).change(function() {
		//alert($(this).val());
		$('#idIsin').val($(this).val()); 
		getSchemeInfo($('#idIsin').val());
	}); 
	
	/*//Populate PMS Scheme for Selected Provider
	$( "#idPName" ).change(function() {
		getPMSSchemeForProvider();
	});*/	
    	
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	//Edit Functionality
	if (pageMode=="EDIT") {	
		//alert('In Edit mode');
		//alert("2");
		$('#idRadioStart').hide();
    	$('#MainDiv').show();
		$('#FAO').show();
		$('#idButton').show();
		//Fetch selected Fund data
		getSelectedFund();
	}

	//Setting focus back to first field from the bottom
	$('#focusguard-2').on('focus', function() {
		  // "last" focus guard got focus: set focus to the first field
		$("#idFHouse").focus();	
		$(window).scrollTop(0);
	});	
	
	
});	

function setFundHouse(pFundHouse) {
	//alert('Setting Fund House in EDIT mode: '+pFundHouse);							    	   
	$("#idFHouse option").filter(function() {
		return this.value==pFundHouse;							    
	}).prop('selected', true);
}

function setSchemeName(pFundHouse, pIsin) {
	//alert('Setting Scheme Name in EDIT mode: '+pSchemeName);
 	//serviceurl = "SchemeFromFund/" + 	$("#idFHouse").val();	
	serviceurl = "SchemeFromFund/" + pFundHouse;
	getClientDataAsyncFalse("GET","",serviceurl,schemeFromFundSuccess);
	function schemeFromFundSuccess(data1){
		//console.log(data);
		snDrop = $("#idSName");
		snDrop.find('option').remove();
		snDrop.append('<option value="0">Select Scheme</option>');
		$.each(data1, function (index, item) {
			snDrop.append('<option value="' + item.isin + '">' + item.descriptiveSchemeName + '</option>');
		});
		$("#idSName option").filter(function() {
			return this.value==pIsin;			    
		}).prop('selected', true); 			
	} 
}

function setPMSSubAsset(assetCategory,subAsset) {
	serviceUrl = "SubAssetByAssetForFunds/" + assetCategory;
	getClientData("GET","",serviceUrl, pmsSubAssetClasssSuccess);
	
	function pmsSubAssetClasssSuccess(data1) {
		
		
		pmsSADrop = $("#idSAssetClass");
		pmsSADrop.find('option').remove();
		pmsSADrop.append('<option value="">Select Sub Asset Class</option>');
		
		$.each(data1, function (index, item) {
			pmsSADrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});	
		$("#idSAssetClass option").filter(function() {
			return this.value==subAsset;			    
		}).prop('selected', true); 		
		
		
		
	}
	
}

function investmentModeChange4MF(){
	myDatepicker();
	var lInvestmentMode = document.getElementById("idIMode");
   	var lInvestModeSelected = lInvestmentMode.options[lInvestmentMode.selectedIndex].value; 
  	if (lInvestModeSelected==0){
	    	$('#SD').hide();
	    	$('#Amount').hide();
			$('#LSU').hide();
			$('#LSLD').hide();
	    	$('#SIPI').hide();
			$('#SIPF').hide();    		
	}
   	else{
   		if (lInvestModeSelected==1){
   			$('#SD').show();
   			$('#Amount').show();
   			$('#LSAL').show();
   			$('#LSDL').show();
   			$('#LSU').show();
   			$('#LSLD').show();
   			$('#SIPAL').hide();
   			$('#SIPDL').hide();
   			$('#SIPI').hide();
   			$('#SIPF').hide();
       	}
       	else{
       		if (lInvestModeSelected==2){
       	//		alert('alert3');
       	        $('#Amount').show();
       	        $('#SD').show();
       	        $('#LSAL').hide();
       		    $('#LSDL').hide();
       			$('#LSU').hide();
       			$('#LSLD').hide();
       			$('#SIPAL').show();
       			$('#SIPDL').show();
       			$('#SIPI').show();
       			$('#SIPF').show();
       		}
    	}	        	
 	}
}	

function investmentModeChange4ETF(){
	
	myDatepicker();
	
	var lInvestmentModeETF = document.getElementById("idIModeETF");
   	var lInvestModeETFSelected = lInvestmentModeETF.options[lInvestmentModeETF.selectedIndex].value; 
	
  	if (lInvestModeETFSelected==0){
  	
  		$('#SD').hide();
    	$('#Amount').hide();
		$('#LSU').hide();
		$('#LSLD').hide();
    	$('#SIPI').hide();
		$('#SIPF').hide(); 
   		
	}
   	else{
   		if (lInvestModeETFSelected==1){
   			$('#SD').show();
   			$('#Amount').show();
   			$('#LSAL').show();
   			$('#LSDL').show();
   			$('#LSU').show();
   			$('#LSLD').hide();
   			$('#SIPAL').hide();
   			$('#SIPDL').hide();
   			$('#SIPI').hide();
   			$('#SIPF').hide();
       	}
       	else{
       		if (lInvestModeETFSelected==2){
       	//		alert('alert3');
       	        $('#Amount').show();
       	        $('#SD').show();
       	        $('#LSAL').hide();
       		    $('#LSDL').hide();
       			$('#LSU').hide();
       			$('#LSLD').hide();
       			$('#SIPAL').show();
       			$('#SIPDL').show();
       			$('#SIPI').show();
       			$('#SIPF').show();
       		}
    	}	        	
 	}
}

function myDatepicker(){
	$("#idInvestmentStartDate").datepicker('remove');
    if (($("#idIMode").val()==1) || ($("#idIModeETF").val()==1)) {
    	if (pageMode == "EDIT") { //CIUAT-754
    		$("#idInvestmentStartDate").datepicker({
    			format : "dd/mm/yyyy",
                todayHighlight : false,
                todayBtn : true,
                autoclose : true,
                forceParse: false,
                startDate : clientDOB,
                endDate : new Date(Date.now() - 864e5)
            }).on('changeDate', function(ev){
            	$("#alertIDate").css('color','');
    			$("#alertIDate").text("");
    			$("#idInvestmentStartDateGroup").css('border','');
                $("#alertSName").text('');
                $("#idSName").css('border','1px solid #ccc');
    			$("#idSaveFund").prop("disabled", false);
            });
    	} else {
    		$("#idInvestmentStartDate").datepicker({
    			format : "dd/mm/yyyy",
                todayHighlight : true,
                todayBtn : true,
                autoclose : true,
                forceParse: false,
                startDate : clientDOB,
                endDate : new Date(Date.now() - 864e5)
            }).on('changeDate', function(ev){
            	$("#alertIDate").css('color','');
    			$("#alertIDate").text("");
    			$("#idInvestmentStartDateGroup").css('border','');
                $("#alertSName").text('');
                $("#idSName").css('border','1px solid #ccc');
    			$("#idSaveFund").prop("disabled", false);
            });
    	}
		    	
    }
    else if (($("#idIMode").val()==2) || ($("#idIModeETF").val()==2)) {
	// calendar
    	if (pageMode == "EDIT") { //CIUAT-754
    		$("#idInvestmentStartDate").datepicker({
    			format: "dd/mm/yyyy",
    			todayHighlight: false,
    			todayBtn: true,
    			autoclose: true,
    			forceParse: false,
    			startDate : clientDOB,
    			endDate: v1monthFromToday
    		}).on('changeDate', function(ev){
            	$("#alertIDate").css('color','');
    			$("#alertIDate").text("");
                $("#alertSName").text('');
                $("#idSName").css('border','1px solid #ccc');
    			$("#idInvestmentStartDateGroup").css('border','');
    			$("#idSaveFund").prop("disabled", false);
            });
    	} else {
    		$("#idInvestmentStartDate").datepicker({
    			format: "dd/mm/yyyy",
    			todayHighlight: true,
    			todayBtn: true,
    			autoclose: true,
    			forceParse: false,
    			startDate : clientDOB,
    			endDate: v1monthFromToday
    		}).on('changeDate', function(ev){
            	$("#alertIDate").css('color','');
    			$("#alertIDate").text("");
                $("#alertSName").text('');
                $("#idSName").css('border','1px solid #ccc');
    			$("#idInvestmentStartDateGroup").css('border','');
    			$("#idSaveFund").prop("disabled", false);
            });
    	}
		
    }
}

/*function onCustomImageClick(){  
    selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
    var serviceurl = '/clientFamilyMember/'+selectedImageFamilyMemberid;
    getClientData("GET", "", serviceurl, onSuccess);
    function onSuccess(data) {
        ///console.log(data);
    	 LEInMonths = (parseInt(data.lifeExpectancy) * 12); 
         clientDOB = moment(data.birthDate,'DD/MM/YYYY').toDate();
         clientLE = moment(clientDOB).add(LEInMonths, 'months').toDate();
                 
         if( $('#idFundTypePMS').prop('checked') == true ){        	 
        	$("#idInvestmentStartDate").datepicker('remove');         	 
            $("#idInvestmentStartDate").datepicker({
                format : "dd/mm/yyyy",
                todayHighlight : true,
                todayBtn : true,
                autoclose : true,
                startDate : clientDOB,
                endDate : new Date()
            });          
         }
         else {
        	
         }
    }
}*/

function showMFForm() {
	$('#FAO').show();
	$('#FH').show();
	$('#SN').show();
	$('#AC').show();
	$('#OECE').show();
	$('#IM').show();
	$('#IM-ETF').hide();
    $('#SD').hide();
    $('#Amount').hide();
    $('#LSU').hide();
    $('#LSLD').hide();
    $('#SIPI').hide();
    $('#SIPF').hide();
    $('#PN').hide();
    $('#SN-PMS').hide();
    $('#CurrentMarketValue').hide();
    $('#idACategory').attr("disabled", true); 
    $("#idFHouse").focus();		
}

function showETFForm() {
	$('#FAO').show();
	$('#FH').show();
	$('#SN').show();
	$('#AC').show();
	$('#OECE').hide();
	$('#IM').hide();
	$('#IM-ETF').show();
	$('#SD').hide();
	$('#Amount').hide();
	$('#LSU').hide();
	$('#SIPI').hide();
	$('#SIPF').hide();
	$('#PN').hide();
	$('#SN-PMS').hide();
	$('#CurrentMarketValue').hide();
	$('#idACategory').attr("disabled", true); 
	$("#idFHouse").focus();		
}

function showPMSForm() {
    $("#idACategory").removeAttr('disabled');
	$('#FAO').show();
	$('#FH').hide();
	$('#SN').hide();
	$('#PN').show();
	$('#SN-PMS').show();
	$('#AC').show();
	$('#OECE').hide();
	$('#IM').hide();
	$('#IM-ETF').hide();
	$('#Amount').show();
	$('#SD').show();
	$('#LSAL').show();
	$('#LSDL').show();
	$('#LSU').hide();
	$('#LSLD').hide();
	$('#SIPAL').hide();
	$('#SIPDL').hide();
	$('#SIPI').hide();
	$('#SIPF').hide();
	$('#SUB').hide();
	$('#CurrentMarketValue').show();
	$("#idPName").focus();		
	
}



function showLumpsumFields() {
	$('#SD').show();
	$('#Amount').show();
	$('#LSAL').show();
	$('#LSDL').show();
	$('#LSU').show();
	$('#LSLD').show();
	$('#SIPAL').hide();
	$('#SIPDL').hide();
	$('#SIPI').hide();
	$('#SIPF').hide();
}

function showSIPFields() {
	$('#Amount').show();
	$('#SD').show();
	$('#LSAL').hide();
    $('#LSDL').hide();
	$('#LSU').hide();
	$('#LSLD').hide();
	$('#SIPAL').show();
	$('#SIPDL').show();
	$('#SIPI').show();
	$('#SIPF').show();
}

function hideInvestmentModeFields() {
	$('#Amount').hide();
	$('#SD').hide();
	$('#LSAL').hide();
    $('#LSDL').hide();
	$('#LSU').hide();
	$('#LSLD').hide();
	$('#SIPAL').hide();
	$('#SIPDL').hide();
	$('#SIPI').hide();
	$('#SIPF').hide();
}

function initializeForm() {
	//alert('In Initialize Form');
	$('#FAO').hide();
	$('#FH').hide();
	$('#SN').hide();
	$('#AC').hide();
	$('#OECE').hide();
	$('#IM').hide();
	$('#SD').hide();
	$('#Amount').hide();
	$('#LSU').hide();
	$('#LSLD').hide();
	$('#SIPI').hide();
	$('#SIPF').hide();
	$('#IM-ETF').hide();
	$('#LSLD').hide();
	$('#PN').hide();
	$('#SN-PMS').hide();
	$('#CurrentMarketValue').hide();
	$('#idButton').hide();
	$('#SUB').hide();

	var options =  {
		      onComplete: function(cep) {        
		         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
		         //window.ln_start_dt_isvalid = isDateBetwenRange(window.clientDOB, new Date() ,window.given_start_date);
		      },
		      onKeyPress: function(cep, event, currentField, options){},
		      onChange: function(cep){},
		      onInvalid: function(val, e, f, invalid, options){}
	};
	    	    
	$('#idInvestmentStartDate').mask('00/00/0000',options);
	// calendar
	"use strict";
		$("[data-toggle=\"tooltip\"]").tooltip();
		$("#idInvestmentStartDate").datepicker('remove'); 
		$("#idInvestmentStartDate").datepicker({
			format : "dd/mm/yyyy",
	        todayHighlight : true,
	        todayBtn : true,
	        autoclose : true,
	        forceParse: false,
	        startDate : clientDOB,
	        endDate : new Date()
	    }).on('changeDate', function(ev){
        	$("#alertIDate").css('color','');
			$("#alertIDate").text("");
			$("#idInvestmentStartDateGroup").css('border','');
			$("#idSaveFund").prop("disabled", false);
        });	
		
		$("#idInvestmentStartDate").blur(function() {
			
			if ($(this).val() != "") {
				if (!checkValidDate($(this).val())) {
					$("#alertIDate").css('color','red');
					$("#alertIDate").text("Date is invalid!");
					$("#idInvestmentStartDateGroup").css('border','2px solid red');
					$("#idSaveFund").prop("disabled", true);
				} else {
					$("#alertIDate").css('color','');
					$("#alertIDate").text("");
					$("#idInvestmentStartDateGroup").css('border','');
					$("#idSaveFund").prop("disabled", false);
				}
			} else {
				$("#alertIDate").css('color','');
				$("#alertIDate").text("");
				$("#idInvestmentStartDateGroup").css('border','');
				$("#idSaveFund").prop("disabled", false);
			}		
			
			
		});

	var options =  {
		      onComplete: function(cep) {        
		         //window.given_start_date = moment($('#idInvestmentStartDate').val(),'DD/MM/YYYY').toDate();
		         //window.ln_start_dt_isvalid = isDateBetwenRange(window.clientDOB, new Date() ,window.given_start_date);
		      },
		      onKeyPress: function(cep, event, currentField, options){},
		      onChange: function(cep){},
		      onInvalid: function(val, e, f, invalid, options){}
	};
		    
	$('#idLockedInDate').mask('00/00/0000',options);			
	$("#idLockedInDate").datepicker({
		format: "dd/mm/yyyy",
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false,
		startDate: new Date(),
		endDate: clientLE
	}).on('changeDate', function(ev){
		$("#alertLockedInDate").css('color','');
		$("#alertLockedInDate").text("");
		$("#idLockedInDateGroup").css('border','');
		$("#idSaveFund").prop("disabled", false);
	});
	
	$("#idLockedInDate").blur(function() {
		
		if ($(this).val() != "") {
			if (!checkValidDate($(this).val())) {
				$("#alertLockedInDate").css('color','red');
				$("#alertLockedInDate").text("Date is invalid!");
				$("#idLockedInDateGroup").css('border','2px solid red');
				$("#idSaveFund").prop("disabled", true);
			} else {
				$("#alertLockedInDate").css('color','');
				$("#alertLockedInDate").text("");
				$("#idLockedInDateGroup").css('border','');
				$("#idSaveFund").prop("disabled", false);
			}
		} else {
			$("#alertLockedInDate").css('color','');
			$("#alertLockedInDate").text("");
			$("#idLockedInDateGroup").css('border','');
			$("#idSaveFund").prop("disabled", false);
		}		
		
		
	});

	
	$(".datepicker-icon").on("click", function () {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
				
	//Populate Family Member Icons
	populateFamilyMemberByClientId(selectedClientId, $("#familyMemberImage"));
	
	//Populate Fund House Dropdown
	getFundHouseList();
		
	//Populate PMS Provider Dropdown
	//getPMSProviderNameList();
	
	//Populate Fund Category, Investment Mode, Frequency dropdowns 
	getFundCategory();
	getFundInvestmentModeMF();
	getFundInvestmentModeETF();
	getFrequency();
}

function getFundHouseList() {
	$.ajax({
		type : 'GET',
		async : false,
		url : ClientServiceUrl+"fundHouseList",
		dataType : 'json',
		contentType : 'application/json',
		beforeSend: function (xhr){ 
	    xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		},
		success : function(data) {
			//alert('Fund House fetched');
			fhDrop = $("#idFHouse");
			fhDrop.find('option').remove();
			fhDrop.append('<option value="">Select Mutual Fund</option>');
			/* $("#idFHouseETF").append('<option value="0">Select ' + name + '</option>'); */
			$.each(data, function (index, item) {
				fhDrop.append('<option value="' + item + '">' + item + '</option>');
				/* $("#idFHouseETF").append('<option value="' + item + '">' + item + '</option>'); */
			});
		},
		error : function(jqXHR, data) {
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
			
			  $("#idClient").load("resources/errorPage.html");
			  $(".dashboardheading    ").html("Error Page");
	          $("#addRecord").hide();
	          $('#editRecord').hide();
	          $('#deleteRecord').hide();
	           
   				
   		    
		}     
	});	
}

function getSchemeNameListForSelectedFund() {
	//console.log( "selected fundHouse amfiCode = " + $(this).val() );
	serviceurl = "SchemeFromFund/" + $('#idFHouse').val();
	getClientDataAsyncFalse("GET","",serviceurl,schemeFromFundSuccess);
	
	function schemeFromFundSuccess(data){
		//console.log(data);
		snDrop = $("#idSName");
		snDrop.find('option').remove();
		snDrop.append('<option value="0">Select Scheme</option>');
		$.each(data, function (index, item) {
			snDrop.append('<option value="' + item.isin + '">' + item.descriptiveSchemeName + '</option>');
		});
		
	} 	
}

function getSchemeInfo(val) {
	//console.log( "selected fundHouse amfiCode = " + $(this).val() );
	//alert( "selected isin = " + val);
	
	//serviceurl = "CloseEndedFlagFromSchemes/" + val;
	serviceurl = "AllMasterMFETFByIsin/" + val;
	getClientData("GET","",serviceurl,InfoFromSchemeSuccess);
	
	function InfoFromSchemeSuccess(data){
			//console.log(data);
		//var data = JSON.stringify(data);
		//alert(data);
		//alert(data.isin);
		var value = "";
		flagDropdown = $("#idOpenClose");					
		flagDropdown.find('option').remove();
		$.each(data, function (index, item) {
			//alert('Flag: '+item.closeEndedFlag);
			if (item.closeEndedFlag=='Open ended scheme') {
				value='N';
			}
			else value='Y';
			flagDropdown.append('<option value="' + value + '">' + item.closeEndedFlag + '</option>');
			//alert('Asset Class: '+item.assetClassID);
			$("#idACategory option").filter(function() {
				return this.value==item.assetClassID;			    
			}).prop('selected', true);
			
			$("#idACategory").val(item.assetClassID);
			
		});	
		
		//flagDrop.append('<option value="N">Select Flag</option>');
/*		$.each(data, function (index, item) {
			if (item=='Open Ended') {
				value='N';
			}
			else value='Y';
			flagDropdown.append('<option value="' + value + '">' + item + '</option>');
			//assetCategoryDropdown.append('<option value="' + value + '">' + item.assetClassID + '</option>');			
		});	*/
	} 					
}

/*function getPMSProviderNameList() {
	getClientData("GET","","providerNameList",providerNameSuccess);
	
	function providerNameSuccess(data){
	//	console.log(data);
		pnDrop = $("#idPName");
		pnDrop.find('option').remove();
		pnDrop.append('<option value="">Select PMS</option>');
		 $("#idFHouseETF").append('<option value="0">Select ' + name + '</option>'); 
		$.each(data, function (index, item) {
			pnDrop.append('<option value="' + item + '">' + item + '</option>');
			 $("#idFHouseETF").append('<option value="' + item + '">' + item + '</option>'); 
		});
	}
}
*/
/*function getPMSSchemeForProvider() {
	//console.log( "selected fundHouse amfiCode = " + $(this).val() );
	serviceurl = "SchemeFromProvider/" + $("#idPName").val();
	getClientDataAsyncFalse("GET","",serviceurl,schemeFromProviderSuccess);
	
	function schemeFromProviderSuccess(data){
	//	console.log(data);
		snpmsDrop = $("#idSNamePMS");
		snpmsDrop.find('option').remove();
		snpmsDrop.append('<option value="">Select PMS Scheme</option>');
		$.each(data, function (index, item) {
			snpmsDrop.append('<option value="' + item + '">' + item + '</option>');
		});
	} 	
}*/

function getFundCategory() {
	getClientData("GET","","AllFundCategory",fundCategorySuccess);

	function fundCategorySuccess(data){
	//	console.log(data);
		fcDrop = $("#idACategory");
		fcDrop.find('option').remove();
		fcDrop.append('<option value="">Select Asset Class</option>');
		/* $("#idACategoryETF").append('<option value="0">Select Asset Category</option>'); */
		$.each(data, function (index, item) {
			fcDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			/* $("#idACategoryETF").append('<option value="' + item.id + '">' + item.description + '</option>'); */
		});		
	}	
}

function getPMSSubAssetClass(assetCategory) {
	serviceUrl = "SubAssetByAssetForFunds/" + assetCategory;
	getClientData("GET","",serviceUrl, pmsSubAssetClasssSuccess);
	
	function pmsSubAssetClasssSuccess(data) {
		
		
		pmsSADrop = $("#idSAssetClass");
		pmsSADrop.find('option').remove();
		pmsSADrop.append('<option value="">Select Sub Asset Class</option>');
		
		$.each(data, function (index, item) {
			pmsSADrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});		
		
	}
}

function getFundInvestmentModeMF() {
	getClientData("GET","","AllFundInvestmentMode",fundInvestmentModeSuccess);

	function fundInvestmentModeSuccess(data){
	//	console.log(data);
		//fimDrop = $("#idIMode");
		//fimDrop.find('option').remove();
		//fimDrop.append('<option value="0">Select Investment Mode</option>');
	    $("#idIMode").append('<option value="">Select Investment Mode</option>'); 
	    $.each(data, function (index, item) {
			//fimDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			$("#idIMode").append('<option value="' + item.id + '">' + item.description + '</option>'); 
		});
		
	}				
}

function getFundInvestmentModeETF() {
	getClientData("GET","","AllFundInvestmentMode",fundInvestmentModeSuccess);

	function fundInvestmentModeSuccess(data){
	//	console.log(data);
		//fimDrop = $("#idIMode");
		//fimDrop.find('option').remove();
		//fimDrop.append('<option value="0">Select Investment Mode</option>');
	    $("#idIModeETF").append('<option value="">Select Investment Mode</option>'); 
		$.each(data, function (index, item) {
			//fimDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			$("#idIModeETF").append('<option value="' + item.id + '">' + item.description + '</option>'); 
		});
		
	}				
}

function getFrequency() {
	getClientData("GET","","AllFrequency",sipFrequencySuccess);

	function sipFrequencySuccess(data){
	//	console.log(data);
		sipfDrop = $("#idSIPF");
		sipfDrop.find('option').remove();
		sipfDrop.append('<option value="">Select SIP Frequency</option>');
		/* $("#idSIPFETF").append('<option value="0">Select SIP Frequency</option>'); */
		$.each(data, function (index, item) {
			sipfDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
			/* $("#idSIPFETF").append('<option value="' + item.id + '">' + item.description + '</option>'); */
		});
		
	}
}

$("#undo").on("click", function(event) {poupulateFamilyMemberImage(selectedDefaultImageFamilyMemberid)});

function undoChange(){
	updatedUNDO();
	if (pageMode=="ADD"){
		$(".form-control").val("");
		$("#idOpenClose").val("N");
		
		var iFundTypeID = $("input:radio[name=fundTypeID]:checked").val();	
		//alert("iFundTypeID: " + iFundTypeID);
		
		if (iFundTypeID == 19) {
			var lInvestmentMode = document.getElementById("idIMode");
			var imValue = lInvestmentMode.options[lInvestmentMode.selectedIndex].value;
			//alert("imValue: " + imValue);
			if (imValue == "") {
				hideInvestmentModeFields();
			} 
		} else {
			if (iFundTypeID == 20) {
				var lInvestmentModeETF = document.getElementById("idIModeETF");
				var imETFValue = lInvestmentModeETF.options[lInvestmentModeETF.selectedIndex].value;
				//alert("imETFValue: " + imETFValue);
				if (imETFValue == "") {
					hideInvestmentModeFields();
				} 
			} else {
				if (iFundTypeID == 21) {
					var lAssetCategory = document.getElementById("idACategory");
					var assetCategory = lAssetCategory.options[lAssetCategory.selectedIndex].value;
					if (assetCategory==""){
						$("#SUB").hide();
					}
				}
			}
		}
	} else {
		if(pageMode=="EDIT"){
			getSelectedFund();
		}
	}
	
}

function updatedUNDO(){
	var lFundHouse = document.getElementById("idFHouse");
	var lSchemeName = document.getElementById("idSName");
	var lAssetCategory = document.getElementById("idACategory");
	var lCloseEndedFlag = document.getElementById("idOpenClose");
	var lInvestmentMode = document.getElementById("idIMode");
	var lDate = document.getElementById("idInvestmentStartDate");
	var lDateGroup = document.getElementById("idInvestmentStartDateGroup");
	var lAmount = document.getElementById("idInvestmentAmount");
	var lUnitsPurchased = document.getElementById("idUnitsPurchased");
	var lLockedInDate = document.getElementById("idLockedInDate");
	var lLockedInDateGroup = document.getElementById("idLockedInDateGroup");
	var lSIPInstallments = document.getElementById("idSIPInstallments");
	var lSIPFrequency = document.getElementById("idSIPF");
	var lInvestmentModeETF = document.getElementById("idIModeETF");
	var lProviderName = document.getElementById("idPName");
	var lSchemeNamePMS = document.getElementById("idSNamePMS");
	var lCurrentMarketValue = document.getElementById("idCurrentMarketValue");
	var lSubAssetClass = document.getElementById("idSAssetClass");
		
	lFundHouse.style.border = "";
	lSchemeName.style.border = "";
	lAssetCategory.style.border = "";
	lCloseEndedFlag.style.border = "";
	lInvestmentMode.style.border = "";
	lDateGroup.style.border = "";
	lDateGroup.style.borderRadius = "";
	lAmount.style.border = "";
    lUnitsPurchased.style.border = "";
	lLockedInDateGroup.style.border = "";
	lLockedInDateGroup.style.borderRadius = "";
    lSIPFrequency.style.border = ""; 
    lSIPInstallments.style.border = "";
    lInvestmentModeETF.style.border = "";
    lProviderName.style.border = "";
	lSchemeNamePMS.style.border = "";
	lCurrentMarketValue.style.border = "";
	lSubAssetClass.style.border = "";
    	    
	document.getElementById('alertFHouse').innerHTML="";
	document.getElementById('alertSName').innerHTML="";
	document.getElementById('alertACategory').innerHTML="";
	document.getElementById('alertFlag').innerHTML="";
	document.getElementById('alertIMode').innerHTML="";
	document.getElementById('alertIDate').innerHTML="";
	document.getElementById('alertAmount').innerHTML="";
	document.getElementById('alertUnitsPurchased').innerHTML="";
	document.getElementById('alertLockedInDate').innerHTML="";
    document.getElementById('alertSipf').innerHTML=""; 
    document.getElementById('alertSIPInstallments').innerHTML="";
    document.getElementById('alertform').innerHTML="";
    document.getElementById('alertIModeETF').innerHTML="";
    document.getElementById('alertPName').innerHTML="";
	document.getElementById('alertSchemeNamePMS').innerHTML="";
	document.getElementById('alertCMV').innerHTML="";
	document.getElementById('alertSubAssetClass').innerHTML="";
	
}


function getSelectedFund() {
	//alert('In getSelectedFund()');
	getClientData("GET", "", "clientFund?id=" + selectedFundID, onGetFundDataSuccess);
	function onGetFundDataSuccess(data) {
		//fundData = data;
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",data.familyMemberId);							
		poupulateFamilyMemberImage(data.familyMemberId);
		populateForm($('#idAddFundForm'),data);
		assetTypeID = data.fundTypeID;
		maskAllAmountFields();	
		// Mutual Fund
		switch (assetTypeID) {
			case 19:
				//alert("idFundTypeMF");
				if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
					$(".dashboardheading").html("Edit Mutual Fund");
				}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View Mutual Fund Details");
				}
		 	   $("#idFundTypeMF").prop("checked",true);
		 	   $("#idFundTypeETF").prop("disabled",true);
		 	   $("#idFundTypePMS").prop("disabled",true);
		 	   showMFForm();
		       if (data.investmentModeID==1) {
		    	   //$('#IM2').hide();
		    	   showLumpsumFields();	
		    	} 
		       else if (data.investmentModeID==2) {
		    	   showSIPFields();
		    	}
		       break;
			case 20: 
				if((loggedUser.clientInfoAddEdit === "Y") || (loggedClient.clientInfoAddEdit === "Y")){
					$(".dashboardheading").html("Edit ETF");
				}else if((loggedUser.clientInfoView === "Y") || (loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View ETF Details");
				}
				$("#idFundTypeMF").prop("disabled",true);
				$("#idFundTypeETF").prop("checked",true);
				$("#idFundTypePMS").prop("disabled",true);
				showETFForm();						      
				if (data.investmentModeIDETF==1) {
					showLumpsumFields();
					$("#LSLD").hide();
				} 
				else if (data.investmentModeIDETF==2) {
					showSIPFields();
					$("#LSLD").hide();
				}
				break;
			case 21: 
				if((loggedUser.clientInfoAddEdit === "Y") || (loggedClient.clientInfoAddEdit === "Y")){
					$(".dashboardheading").html("Edit PMS");
				}else if((loggedUser.clientInfoView === "Y") || (loggedClient.clientInfoView === "Y")){
					$(".dashboardheading").html("View PMS Details");
				}
 	    		$("#idFundTypeMF").prop("disabled",true);
 	    		$("#idFundTypeETF").prop("disabled",true);
 	    		$("#idFundTypePMS").prop("checked",true);
 	    		showPMSForm();
 	    		//alert("hiiiii: " + data.subAssetID);
 	    		//getPMSSubAssetClass(data.fundCategoryID);
 	    		$('#SUB').show();
 	    		/*$("#idSAssetClass option").filter(function() {
 					return this.value==data.subAssetID;			    
 				}).prop('selected', true);*/
 	    		
 	    		setPMSSubAsset(data.fundCategoryID, data.subAssetID);
 	    		
 	    		$("#idACategory").change(function(event) {
 	    			//alert("3");
	    			$('#SUB').show();
	    			var assetCategory = $(this).val();
	    			//alert("assetCategory: " + assetCategory);
	    			getPMSSubAssetClass(assetCategory);
	    		});
 	    		
				break;
		}

		// MF or ETF				
		if ( (data.fundTypeID==19) || (data.fundTypeID==20)) {
			//alert(data.fundHouse);
			myDatepicker();
			$.when(setSchemeName(data.fundHouse, data.isin)
		    ).then (setFundHouse(data.fundHouse)
			)
			
			getSchemeInfo(data.isin);
			$("#idOpenClose option").filter(function() {
				return this.value==data.closeEndedFlag;			    
			}).prop('selected', true);
		}
		else if (data.fundTypeID==21) {
			// calendar
			$("#idInvestmentStartDate").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true,
				autoclose: true,									
				endDate: new Date()
			});
			
			/*$("#idPName option").filter(function() {
				return this.value==data.providerName;							    
			}).prop('selected', true);*/
				
			//getPMSSchemeForProvider();
			/*$("#idSNamePMS option").filter(function() {
				return this.value==data.schemeNamePMS;			    
			}).prop('selected', true);*/
		}
	}
		
	/*function onGetFundDataError(data) {
		$("#idClient").load("resources/errorPage.html");
		$(".dashboardheading    ").html("Error Page");
	    $("#addRecord").hide();
	    $('#editRecord').hide();
	    $('#deleteRecord').hide();
	}     	*/
}

function getNAV() {
	//alert("4");
	var investMode=0;
	if($('#idFundTypeMF').is(':checked')) {
		investMode = $("#idIMode").val();
	}
	else if ($('#idFundTypeETF').is(':checked')) {
		investMode = $("#idIModeETF").val();		
	}

	var investDateStr = $("#idInvestmentStartDate").val();
	//alert('Invest Mode: '+ investMode+' Invest Date: '+ investDateStr);
	if (investMode==1 && investDateStr!= '') {		
		var isin = $('#idIsin').val();
		//alert("isin: " + isin);
		if (isin!=null) {  
			unmaskAmount('#idInvestmentAmount');
			var formData1 = $('#idAddFundForm').serializeToJSON();
			var data = JSON.stringify(formData1);
			//alert('Getting NAV Data: ');
			serviceurl = "getNAV";
			getClientData("POST",data,serviceurl,schemeFromFundSuccess);
			function schemeFromFundSuccess(data){
				if (data>0) {
					//alert("5");
					var naa = $("#idNAV").val(data);
                    $("#alertSName").text('');
                    $("#idSName").css('border','1px solid #ccc');
                    return true;
                    //navFound = Boolean(data>0);
                    //alert("navFound: " + navFound);
				} else {
					$("#alertSName").text('NAV not found for Scheme Name and Investment Date');
					$("#idSName").css('border','2px solid red');				
					$("#idSName").css('borderRadius','7px');
					$("#alertIDate").text('NAV not found for Scheme Name and Investment Date');
					$("#idInvestmentStartDateGroup").css('border','2px solid red');				
					$("#idInvestmentStartDateGroup").css('borderRadius','7px');
					$("#idSName").focus();
					$("#idSName").scrollToMe();
					navFound=false;
				}
			}	
			/*function schemeFromFundError(err){
				alert('Error while fetching NAV for Scheme Name and Investment Date');
				navFound=false;
			}*/
		}
	}
	
	//alert("navFound: " + navFound);
	
	/*if (navFound) 
		return true;
	else 
		return false;*/
}

function calculateUnitsOrAmount(changedField) {
	//alert('In calculateUnitsOrAmount() '+changedField);
	unmaskAmount('#idInvestmentAmount');
	var investMode=0;
	if($('#idFundTypeMF').is(':checked')) {
		investMode = $("#idIMode").val();
	}
	else if ($('#idFundTypeETF').is(':checked')) {
		investMode = $("#idIModeETF").val();		
	}
	var investDateStr = $("#idInvestmentStartDate").val();
	if (investMode==1 && investDateStr!= '') {
		var unitsPurchased = $("#idUnitsPurchased").val();
		var investmentAmount = $("#idInvestmentAmount").val();
		console.log('In Calc function Units: '+unitsPurchased+' Amount: '+investmentAmount);
		if (getNAV()) {
			var nav = $("#idNAV").val();
			if (nav>0) {	
				if (changedField=='Units' && !hasValue(investmentAmount) ) {
					if (unitsPurchased>0 ) {
						$("#idInvestmentAmount").val((parseFloat(unitsPurchased)*parseFloat(nav)).toFixed(2));
					}
				}
				else if (changedField=='Amount' && !hasValue(unitsPurchased)) {
					if (investmentAmount>0) {
						//alert((parseFloat(investmentAmount)/parseFloat(nav)).toFixed(2));
						$("#idUnitsPurchased").val((parseFloat(investmentAmount)/parseFloat(nav)).toFixed(2));		
					}
				}
			}
		} else {
			//alert("false");
		}
	}
	maskAmount('#idInvestmentAmount');
}

function initAmountAndUnits(elm) {
	var elmid = elm.attr('id');
	if (elmid=='idInvestmentAmount'){
		$("#idUnitsPurchased").val('');
	}
	else if (elmid=='idUnitsPurchased')
		$("#idInvestmentAmount").val('');
	else {
		$("#idUnitsPurchased").val('');
		$("#idInvestmentAmount").val('');
	}
	$("#alertSName").text('');
	$("#alertIDate").text('');
	$("#idSName").css('border','1px solid #ccc');
	$("#idInvestmentStartDateGroup").css('border','1px solid #ccc');
}	

function saveFund() {
	selectedImageFamilyMemberid = sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	unmaskAllAmountFields();
	var validate;
	var investMode=0;
	
	if($('#idFundTypeMF').is(':checked')) {
		investMode = $('#iIMode').val();
		validate = validateFundsMF($('#idAddFundForm'));
	}
	
	if($('#idFundTypeETF').is(':checked')){
		investMode = $('#iIModeETF').val();
		validate = validateFundsETF($('#idAddFundForm'));
	} 
	
	if($('#idFundTypePMS').is(':checked')){
		validate = validateFundsPMS($('#idAddFundForm'));
	}
	
	
	if(validate && ((investMode!=1) || (investMode==1 && navFound)) ){
		if (typeof selectedImageFamilyMemberid != 'undefined' && selectedImageFamilyMemberid!=null) {
			//event.preventDefault();
			var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
			var formData = $('#idAddFundForm').serializeToJSON();
			formData["clientID"]=selectedClientId;
			formData["familyMemberId"]=selectedImageFamilyMemberid;
			formData["fundHouse"] =  $("#idFHouse").val(); 	
			formData["schemeName"] = $("#idSName").val(); 	
			formData["providerName"] = $("#idPName").val();
			formData["schemeNamePMS"] = $("#idSNamePMS").val();
			
			if ($("#idOpenClose").val() == "Open ended scheme") {
				formData["closeEndedFlag"] = "N";
			} else {
				if ($("#idOpenClose").val() == "Close ended scheme"){
					formData["closeEndedFlag"] = "Y";
				}
			}
			//alert("Open CLose flag = " + $("#idOpenClose").val());

			if ($("input:radio[name=fundTypeID]:checked").val() == 21){
				formData["closeEndedFlag"] = "N";
			}
			
			if ($("#idIMode").val() == 2) {
					formData["lumpsumUnitsPurchased"] = " ";
					formData["mfLumpsumLockedInDate"] = " ";
			} else {
					if ($("#idIMode").val() == 1) {
						formData["sipFrequency"] = " ";
						formData["sipInstalments"] = " ";
					}
			} 
			
			showLoaderOnSave("#idSaveFund");				
			window.setTimeout(function(){
				if (pageMode=="EDIT") {	
					formData["id"] = selectedFundID;	
					var data = JSON.stringify(formData);
					//getClientDataWithErrorHandling("POST", data, "editClientFund", onSaveFundSuccess, onSaveFundError);						
					saveData("POST", data, "editClientFund", onSaveFundSuccess);
				} else {
					var data = JSON.stringify(formData);
					console.log(data);
					//getClientDataWithErrorHandling("POST", data, "createClientFund", onSaveFundSuccess, onSaveFundError);
					saveData("POST", data, "createClientFund", onSaveFundSuccess);
				}	
	
				function onSaveFundSuccess(data) {
					hideLoaderOnSave("#idSaveFund");
					console.log("Saved Fund id = " + data.id);
					serviceurl = "clientFund/client/" + selectedClientId;	
					getClientData("GET", "", serviceurl, onSuccess);
					function onSuccess(data) {
						sessionStorage.setItem("FUND_LIST", JSON.stringify(data));
						$("#idClient").load("clientInfo/viewFunds.html");
						$(".dashboardheading").html("");
						$(".dashboardheading").html("MF/ETF/PMS");
						$("#addRecord").removeClass('btn_Disabled');
						$('#editRecord').addClass('btn_Disabled');
						$('#deleteRecord').addClass('btn_Disabled');
					}
				}
				
				/*function onSaveFundError(err) {
					$("#alertform").text("Error saving fund information. Please try after sometime or contact system administrator.");
					$(window).scrollTop(0);
					hideLoaderOnSave("#idSaveFund");
					//return false;				
				}	*/
			}, 5000);	
		}
		else {
			alert("Please select a Family Member");
			$(window).scrollTop(0);
			//hideLoaderOnSave("#idSaveFund");
			//return false;
		}
	}
	else if (investMode==1 && !navFound ) {
		$("#alertSName").text('NAV not found for Scheme Name and Investment Date');
		$("#idSName").css('border','2px solid red');				
		$("#idSName").css('borderRadius','7px');
		$("#alertIDate").text('NAV not found for Scheme Name and Investment Date');
		$("#idInvestmentStartDateGroup").css('border','2px solid red');				
		$("#idInvestmentStartDateGroup").css('borderRadius','7px');
		$("#idSName").focus();
		//$("#idSName").scrollToMe();
		$("#alertform").text("Please correct the errors highlighted below.");
		$(window).scrollTop(0);
		//return false;
	}
	else {
		$(window).scrollTop(0);
		hideLoaderOnSave("#idSaveFund");		
	}
}

function maskAllAmountFields() {
	//alert('Mask Asset Type ID: '+assetTypeID);
	maskAmount('#idInvestmentAmount');
	if (assetTypeID=="21") {
		//alert('Mask Asset PMS');
		maskAmount('#idCurrentMarketValue');
	}
}

function unmaskAllAmountFields() {
	//alert('Unmask Asset Type ID: '+assetTypeID);
	unmaskAmount('#idInvestmentAmount');
	if (assetTypeID=="21") {
		//alert('Unmask Asset PMS');
		unmaskAmount('#idCurrentMarketValue');
	}
}

function dateChangeValidation() {
    /*$('#alertIDate').text('');
    $('#idInvestmentStartDate').css('border','');*/
    var lIMode = $('#idIMode').val();
    var date = $('#idInvestmentStartDate').val();
    date = date.split('/');
    date = date[2] + "/" + date[1] + "/" + date[0];
    var dt1 = new Date(date);
    var startDate = new Date(clientDOB);
    var endDate = (new Date(Date.now() - 864e5));
    if (date.length === 10 || date.length > 10) {
        if (lIMode === '2') {
            endDate.setMonth(endDate.getMonth() + 1, 1);
        }
        if (dt1 < startDate) {
            $("#idInvestmentStartDate").val('');
            /*$('#alertIDate').text('NAV not found for Scheme Name and Investment Date');
            $('#idInvestmentStartDate').css('border','2px solid red');*/
        } else if (dt1 > endDate) {
            $("#idInvestmentStartDate").val('')
            /*$('#alertIDate').text('NAV not found for Scheme Name and Investment Date');
            $('#idInvestmentStartDate').css('border','2px solid red');*/
        }
    }
}
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function (event) {
	$('#addRecord').addClass('btn_Disabled');
	$('#editRecord').addClass('btn_Disabled');
	
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
			if(loggedClient.clientInfoAddEdit === "Y"){
				$("#save").show();
				$("#idUndo").show();
			}else if(loggedClient.clientInfoView === "Y"){
				$("#save").hide();
				$("#idUndo").hide();
			}
		}else if(loggedUser != null && loggedUser.role === "Admin"){
			$("#save").hide();
			$("#idUndo").hide();
		}else{
			if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
				$("#save").show();
				$("#idUndo").show();
			}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
				$("#save").hide();
				$("#idUndo").hide();
			}
		}

	
	    sessionStorage.setItem("CLIENT_SERVICE_URL",ClientServiceUrl);
	//	//////console.log("jjjj");
	//	//////console.log("gggggg "+sessionStorage.getItem("CLIENT_SERVICE_URL")+" "+sessionStorage.getItem("SELECTED_CLIENT_ID")); 
		
	//	editData(sessionStorage.getItem("CLIENT_SERVICE_URL") + '/AllExpense/'+sessionStorage.getItem("SELECTED_CLIENT_ID"));

	    getClientDataAsyncFalse("GET", "", "clientFamilyMember/" + sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID"), retirementAgeSuccess);
	    populateDropdownFrequency("Select", $("#idGroceryFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idGroceryReferenceMonth"),
                '/AllMonths', 13);
      //  populateDropdownYear("Select", $("#idGroceryYearTill"), '/AllYears', 2);

        populateDropdownFrequency("Select", $("#idUtilitiesFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idUtilitiesReferenceMonth"),
                '/AllMonths', 13);
     //   populateDropdownYear("Select", $("#idUtilitiesYearTill"),'/AllYears', 2);

        populateDropdownFrequency("Select", $("#idTransportFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idTransportReferenceMonth"),
                '/AllMonths', 13);
        /*populateDropdownYear("Select", $("#idTransportYearTill"),
                '/AllYears', 2);*/

        populateDropdownFrequency("Select", $("#idHouseholdFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idHouseholdReferenceMonth"),
                '/AllMonths', 13);
        /*populateDropdownYear("Select", $("#idHouseholdYearTill"),
                '/AllYears', 2);*/
        
        populateDropdownFrequency("Select", $("#idHousingFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idHousingReferenceMonth"),
                '/AllMonths', 13);
        /*populateDropdownYear("Select", $("#idHousingYearTill"),
                '/AllYears', 2);*/

        populateDropdownFrequency("Select", $("#idCommunicationFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idCommunicationReferenceMonth"),
                '/AllMonths', 13);
        /*populateDropdownYear("Select", $("#idCommunicationYearTill"),
                '/AllYears', 2);*/

        populateDropdownFrequency("Select", $("#idEntertainmentFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idEntertainmentReferenceMonth"),
                '/AllMonths', 13);
        /*populateDropdownYear("Select", $("#idEntertainmentYearTill"),
                '/AllYears', 2);*/

        populateDropdownFrequency("Select", $("#idApparelFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idApparelReferenceMonth"),
                '/AllMonths', 13);
        /*populateDropdownYear("Select", $("#idApparelYearTill"),
                '/AllYears', 2);*/

        populateDropdownFrequency("Select", $("#idTutionFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idTutionReferenceMonth"),
                '/AllMonths', 13);
        /*populateDropdownYear("Select", $("#idTutionYearTill"), '/AllYears', 2);*/

        populateDropdownFrequency("Select", $("#idHealthcareFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idHealthcareReferenceMonth"),
                '/AllMonths', 13);
        /*populateDropdownYear("Select", $("#idHealthcareYearTill"),
                '/AllYears', 2);*/
        
        populateDropdownFrequency("Select", $("#idOtherExpenseFrequency"),
                '/AllFrequency', 12);
        populateDropdownMonth("Select", $("#idOtherExpenseReferenceMonth"),
                '/AllMonths', 13);
        /*populateDropdownYear("Select", $("#idOtherExpenseYearTill"),
                '/AllYears', 2);*/

        /*populateDropdownYear("Select", $("#idTotalExpenseYearTill"),
                '/AllYears', 2);*/
		
		editData('AllExpense/'+sessionStorage.getItem("SELECTED_CLIENT_ID"));

		maskAllAmountFields();
		

});


function maskAllAmountFields() {
	maskAmount('#idGroceryAmount');
	maskAmount('#idUtilitiesAmount');
	maskAmount('#idTransportAmount');
	maskAmount('#idHouseholdAmount');
	maskAmount('#idHousingAmount');
	maskAmount('#idCommunicationAmount');
	maskAmount('#idEntertainmentAmount');
	maskAmount('#idApparelAmount');
	maskAmount('#idTutionAmount');
	maskAmount('#idHealthcareAmount');
	maskAmount('#idOtherExpenseAmount');
	maskAmount('#idTotalExpenseAmount');
	maskAmount('#idRunningTotal');
}
function unmaskAllAmountFields() {
    unmaskAmount('#idGroceryAmount');
	unmaskAmount('#idUtilitiesAmount');
	unmaskAmount('#idTransportAmount');
	unmaskAmount('#idHouseholdAmount');
	unmaskAmount('#idHousingAmount');
	unmaskAmount('#idCommunicationAmount');
	unmaskAmount('#idEntertainmentAmount');
	unmaskAmount('#idApparelAmount');
	unmaskAmount('#idTutionAmount');
	unmaskAmount('#idHealthcareAmount');
	unmaskAmount('#idOtherExpenseAmount');
	unmaskAmount('#idTotalExpenseAmount');
}

function populateDropdownFrequency(name, dropdownId, serviceUrl, selectedValue) {
	getClientDataAsyncFalse("GET", "", serviceUrl, populateDropdownFrequencySuccess);
	function populateDropdownFrequencySuccess(data){
		dropdownId.find('option').remove();
        //dropdownId.append('<option value="0" selected>Select ' + name + '</option>');
        dropdownId
                .append('<option value="" selected>Select</option>');
        $
                .each(
                        data,
                        function(index, item) {
                            if (item.id == selectedValue) {
                                dropdownId
                                        .append('<option value="' + item.id + '" selected>'
                                                + item.description
                                                + '</option>');
                            } else {
                                dropdownId
                                        .append('<option value="' + item.id + '" >'
                                                + item.description
                                                + '</option>');
                            }

                        });
	}
}

function populateDropdownMonth(name, dropdownId, serviceUrl, selectedValue) {
	getClientDataAsyncFalse("GET", "", serviceUrl, populateDropdownMonthSuccess);
	function populateDropdownMonthSuccess(data){
		dropdownId.find('option').remove();
        //dropdownId.append('<option value="0" selected>Select ' + name + '</option>');
        dropdownId
                .append('<option value="" selected>Select</option>');
        $
                .each(
                        data,
                        function(index, item) {
                            if (item.id == selectedValue) {
                                dropdownId
                                        .append('<option value="' + item.id + '" selected>'
                                                + item.description
                                                + '</option>');
                            } else {
                                dropdownId
                                        .append('<option value="' + item.id + '" >'
                                                + item.description
                                                + '</option>');
                            }

                        });
	}
}

function populateDropdownYear(name, dropdownId, serviceUrl, selectedValue) {
	getClientDataAsyncFalse("GET", "", serviceUrl, populateDropdownYearSuccess);
	function populateDropdownYearSuccess(data){
		if(retirementAge==null){
			//////////////console.log("inside ");
			selectedValue=3;
		}
		dropdownId.find('option').remove();
        //dropdownId.append('<option value="0" selected>Select ' + name + '</option>');
        dropdownId
                .append('<option value="" selected>Select</option>');
        $
                .each(
                        data,
                        function(index, item) {
                            if (item.id == selectedValue) {
                                dropdownId
                                        .append('<option value="' + item.id + '" selected>'
                                                + item.description
                                                + '</option>');
                            } else {
                            	if(retirementAge!=null ||  item.id!=2){
                                dropdownId
                                        .append('<option value="' + item.id + '" >'
                                                + item.description
                                                + '</option>');
                            	}
                            }

                        });
	}
}

/*$(function(){
	  $(".input-width-income-expense-add-amount").change(function(){
	    	//////console.log("Function on change add amount");
	   		var totalAmount = 0;
	    	$(".input-width-income-expense-add-amount").each(function() {
	        	var elementId = this.id;
	        	var thisAmountId = "";
	        	var thisFrequencyId = "";
	       		thisAmountId = elementId;
	       		thisFrequencyId = elementId.replace("Amount","Frequency");
	    		////////console.log("Frequeny Id: " + thisFrequencyId);
	    		////////console.log("Amount Id: " + thisAmountId);
	    		//////console.log("Frequency: " + $("#"+thisFrequencyId).val());
	    		//////console.log("Amount : " + $("#"+thisAmountId).val());
	    		if(!isNaN(this.value) && this.value.length!=0) {
	    			if(!isNaN($("#"+thisAmountId).val()) && $("#"+thisAmountId).val().length!=0) {
	    				$("#"+thisAmountId).val().toLocaleString();
	    				thisAnnualAmount = $("#"+thisAmountId).val() * $("#"+thisFrequencyId).val(); 
	    				totalAmount += parseFloat(thisAnnualAmount);
	    				//////console.log("totalAmount : " + totalAmount);
	    			}
				}
	    	})
	    	$("#idRunningTotal").val(totalAmount.toFixed(2));
	    	
	    })
	    
  $(".input-width-income-expense-add-frequency").change(function(){
    //////console.log("Function on change add frequency");
	var totalAmount = 0;
	var thisAnnualAmount = 0;
$(".input-width-income-expense-add-frequency").each(function() {
   	var elementId = this.id;
   	var thisAmountId = "";
   	var thisFrequencyId = "";
  		thisFrequencyId = elementId;
  		thisAmountId = elementId.replace("Frequency","Amount");
		////////console.log("Frequeny Id: " + thisFrequencyId);
		////////console.log("Amount Id: " + thisAmountId);
		//////console.log("Frequency: " + $("#"+thisFrequencyId).val());
		//////console.log("Amount : " + $("#"+thisAmountId).val());
	if(!isNaN(this.value) && this.value.length!=0) {
		if(!isNaN($("#"+thisAmountId).val()) && $("#"+thisAmountId).val().length!=0) {
			$("#"+thisAmountId).val().toLocaleString();
			thisAnnualAmount = $("#"+thisFrequencyId).val() * $("#"+thisAmountId).val(); 
			totalAmount += parseFloat(thisAnnualAmount);
			//////console.log("totalAmount : " + totalAmount);
		}
		}
})
$("#idRunningTotal").val(totalAmount.toFixed(2));

})
});*/

$(function(){
    $(".input-width-income-expense-add-amount").change(function(){
    //	alert("dasdasd");
          //////console.log("Function on change add amount");
          var totalAmount = 0;
          $(".input-width-income-expense-add-amount").each(function() {
          	//////console.log("=======================");
              var elementId = this.id;
              var thisAmountId = "";
              var thisFrequencyId = "";
              thisAmountId = elementId;
              thisFrequencyId = elementId.replace("Amount","Frequency");
              //alert("Frequeny Id: " + thisFrequencyId);
              //alert("Amount Id: " + thisAmountId);
              unmaskAmount("#"+thisAmountId);
              //////console.log("name "+$("#"+thisAmountId).attr('name'));
              //////console.log("Frequency: " + $("#"+thisFrequencyId).val());
              //////console.log("Amount : " + $("#"+thisAmountId).val());
             
              if(!isNaN(this.value) && this.value.length!=0) {
                  if(!isNaN($("#"+thisAmountId).val()) && $("#"+thisAmountId).val().length!=0) {
                  	
                      $("#"+thisAmountId).val().toLocaleString();
                      thisAnnualAmount = $("#"+thisAmountId).val() * $("#"+thisFrequencyId).val(); 
                      totalAmount += parseFloat(thisAnnualAmount);
                      //////console.log("totalAmount a: " + totalAmount); 
                      maskAmount("#"+thisAmountId);
                      
                  }
              }
            
          })
          //////console.log("totalAmount aa"+totalAmount);
          $("#idRunningTotal").val(totalAmount.toFixed(2));
          maskAmount("#idRunningTotal");
      })

  $(".input-width-income-expense-add-frequency").change(function(){
  //////console.log("Function on change add frequency");
  var totalAmount = 0;
  var thisAnnualAmount = 0;
$(".input-width-income-expense-add-frequency").each(function() {
	    //////console.log("=======================");
      var elementId = this.id;
      var thisAmountId = "";
      var thisFrequencyId = "";
      thisFrequencyId = elementId;
      thisAmountId = elementId.replace("Frequency","Amount");
      //alert("Frequeny Id: " + thisFrequencyId);
      //alert("Amount Id: " + thisAmountId);
      unmaskAmount("#"+thisAmountId);
      //////console.log("name "+$("#"+thisAmountId).attr('name'));
      //////console.log("Frequency: " + $("#"+thisFrequencyId).val());
      //////console.log("Amount : " + $("#"+thisAmountId).val());
    
  if(!isNaN(this.value) && this.value.length!=0) {
      if(!isNaN($("#"+thisAmountId).val()) && $("#"+thisAmountId).val().length!=0) {
      	
          $("#"+thisAmountId).val().toLocaleString();
          thisAnnualAmount = $("#"+thisFrequencyId).val() * $("#"+thisAmountId).val();         
          totalAmount += parseFloat(thisAnnualAmount);
          maskAmount("#"+thisAmountId);
           
          //////console.log("totalAmount b: " + totalAmount);
      }
      }
   
})
//////console.log("totalAmount after bb: " + totalAmount);
$("#idRunningTotal").val(totalAmount.toFixed(2));
maskAmount("#idRunningTotal");
})
});
function setRefMonth(frequency) {

	//   //////console.log("frequency.value "+frequency.value+"  "+frequency);
	if (frequency.value == 12) {

	//	  	 //////console.log("frequency.name "+frequency.name);
		if (frequency.name == "groceryFrequency") {
			document.getElementById("idGroceryReferenceMonth").value = 13;
			document.getElementById("idGroceryReferenceMonth").disabled = true;
		}
		if (frequency.name == "utilitiesFrequency") {
			document.getElementById("idUtilitiesReferenceMonth").value = 13;
			document.getElementById("idUtilitiesReferenceMonth").disabled = true;
		}
		if (frequency.name == "transportFrequency") {
			document.getElementById("idTransportReferenceMonth").value = 13;
			document.getElementById("idTransportReferenceMonth").disabled = true;
		}
		if (frequency.name == "householdFrequency") {
			document.getElementById("idHouseholdReferenceMonth").value = 13;
			document.getElementById("idHouseholdReferenceMonth").disabled = true;
		}
		if (frequency.name == "housingFrequency") {
			document.getElementById("idHousingReferenceMonth").value = 13;
			document.getElementById("idHousingReferenceMonth").disabled = true;
		}
		 if (frequency.name == "communicationFrequency") {
			document.getElementById("idCommunicationReferenceMonth").value = 13;
			document.getElementById("idCommunicationReferenceMonth").disabled = true;
		} 
		 if (frequency.name == "entertainmentFrequency") {
				document.getElementById("idEntertainmentReferenceMonth").value = 13;
				document.getElementById("idEntertainmentReferenceMonth").disabled = true;
			} 
		 if (frequency.name == "apparelFrequency") {
				document.getElementById("idApparelReferenceMonth").value = 13;
				document.getElementById("idApparelReferenceMonth").disabled = true;
			} 
		 if (frequency.name == "tutionFrequency") {
				document.getElementById("idTutionReferenceMonth").value = 13;
				document.getElementById("idTutionReferenceMonth").disabled = true;
			} 
		 if (frequency.name == "healthcareFrequency") {
				document.getElementById("idHealthcareReferenceMonth").value = 13;
				document.getElementById("idHealthcareReferenceMonth").disabled = true;
			} 
		if (frequency.name == "otherExpenseFrequency") {
			document.getElementById("idOtherExpenseReferenceMonth").value = 13;
			document.getElementById("idOtherExpenseReferenceMonth").disabled = true;
		}

	} else {

		// 	//////console.log("ssss22222s");
		if (frequency.name == "groceryFrequency") {
			document.getElementById("idGroceryReferenceMonth").value = "";
			document.getElementById("idGroceryReferenceMonth").options[0].text = "Select";
			document.getElementById("idGroceryReferenceMonth").disabled = false;
		}
		if (frequency.name == "utilitiesFrequency") {
			document.getElementById("idUtilitiesReferenceMonth").value = "";
			document.getElementById("idUtilitiesReferenceMonth").options[0].text = "Select";
			document.getElementById("idUtilitiesReferenceMonth").disabled = false;
		}
		if (frequency.name == "transportFrequency") {
			document.getElementById("idTransportReferenceMonth").value = "";
			document.getElementById("idTransportReferenceMonth").options[0].text = "Select";
			document.getElementById("idTransportReferenceMonth").disabled = false;
		}
		if (frequency.name == "householdFrequency") {
			document.getElementById("idHouseholdReferenceMonth").value = "";
			document.getElementById("idHouseholdReferenceMonth").options[0].text = "Select";
			document.getElementById("idHouseholdReferenceMonth").disabled = false;
		}
		if (frequency.name == "housingFrequency") {
			document.getElementById("idHousingReferenceMonth").value = "";
			document.getElementById("idHousingReferenceMonth").options[0].text = "Select";
			document.getElementById("idHousingReferenceMonth").disabled = false;
		}
		if (frequency.name == "communicationFrequency") {
			document.getElementById("idCommunicationReferenceMonth").value = "";
			document.getElementById("idCommunicationReferenceMonth").options[0].text = "Select";
			document.getElementById("idCommunicationReferenceMonth").disabled = false;
		}
		if (frequency.name == "entertainmentFrequency") {
			document.getElementById("idEntertainmentReferenceMonth").value = "";
			document.getElementById("idEntertainmentReferenceMonth").options[0].text = "Select";
			document.getElementById("idEntertainmentReferenceMonth").disabled = false;
		}
		if (frequency.name == "apparelFrequency") {
			document.getElementById("idApparelReferenceMonth").value = "";
			document.getElementById("idApparelReferenceMonth").options[0].text = "Select";
			document.getElementById("idApparelReferenceMonth").disabled = false;
		}
		if (frequency.name == "tutionFrequency") {
			document.getElementById("idTutionReferenceMonth").value = "";
			document.getElementById("idTutionReferenceMonth").options[0].text = "Select";
			document.getElementById("idTutionReferenceMonth").disabled = false;
		}
		if (frequency.name == "healthcareFrequency") {
			document.getElementById("idHealthcareReferenceMonth").value = "";
			document.getElementById("idHealthcareReferenceMonth").options[0].text = "Select";
			document.getElementById("idHealthcareReferenceMonth").disabled = false;
		}
		if (frequency.name == "otherExpenseFrequency") {
			document.getElementById("idOtherExpenseReferenceMonth").value = "";
			document.getElementById("idOtherExpenseReferenceMonth").options[0].text = "Select";
			document.getElementById("idOtherExpenseReferenceMonth").disabled = false;
		}
	}
}



function  editData(serviceURL){
	//alert("serviceURL "+serviceURL);
	getClientData("GET", "", serviceURL, onEditSuccess);
	function onEditSuccess(expense1) {

		//alert("length "+expense1.length);
		
	//	//////console.log("success "+expense1);
		i=1;
		 $.each(expense1, function(key, expense) {
			// //////console.log("expense "+expense);
		
	//	//////console.log("id "+expense.id);
		
	//	//////console.log("expenseType "+expense.expenseType);
	//	//////console.log("expenseAmount "+expense.expenseAmount);
	//	//////console.log("expenseFrequency "+expense.frequency);
	//	//////console.log("referenceMonth "+expense.referenceMonth);
	//	//////console.log("year "+expense.endYear);
	//	//////console.log("expense.option "+expense.option);
//		alert("expense.option "+expense.option);
		if(i==1){
			$("#idOptionHidden").val(expense.option);
		 $("input[name=option][value=" + expense.option + "]").prop('checked', true);
		
	//	 //////console.log("opp "+$("#idOptionI").is(":checked"));
	//	 //////console.log("opp "+$("#idOptionT").is(":checked"));
		 
		 if ($("#idOptionI").is(":checked")) {
			  //	//////console.log("All expense heads");

			$("#show-me-two").hide();
			$("#show-me").show();
			$("#idSalaryAmount").focus();

		} else {
			if ($("#idOptionT").is(":checked")) {
				    //	//////console.log("Total expense");
				//$("#idTotalexpenseAmount").removeAttr("readonly");

				$("#show-me").hide();
				$("#show-me-two").show();
				$("#idTotalexpenseAmount").focus();

			}
		}
		 
            
		}
		i=i+1;
		if( expense.option =='I'){
			$('#idRunningTotal').val(maskAmountValue(expense.totalexpense));
		//	//////console.log("pp "+expense.option);
			
		if(expense.expenseType==1){
			
		//	//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdGrocery").val(expense.id);
			 $("#idExpenseTypeGrocery").val(expense.expenseType);
			 $("#idGroceryAmount").val(maskAmountValue(expense.expenseAmount));
			 
			    //  $('#idGroceryFrequency').val(expense.frequency);
			      $("#idGroceryFrequency option").filter(function() {
						return this.value==expense.frequency;
			      }).prop('selected', true);
			      
				   if(expense.frequency!=12){
					document.getElementById("idUtilitiesReferenceMonth").disabled = false;	
				}
				
				// $('#idGroceryReferenceMonth').val(expense.referenceMonth);
				 $("#idGroceryReferenceMonth option").filter(function() {
						return this.value==expense.referenceMonth;
			      }).prop('selected', true);
				// $('#idGroceryYearTill').val(expense.endYear);
				 $("#idGroceryYearTill option").filter(function() {
						return this.value==expense.endYear;
			      }).prop('selected', true);
           
		}
		if(expense.expenseType==2){
		//	//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdUtilities").val(expense.id);
		//	 $('input[name=familyMember]:checked').val(expense.familyMemberId);
			 $("#idExpenseTypeUtilities").val(expense.expenseType);
			 $("#idUtilitiesAmount").val(maskAmountValue(expense.expenseAmount));
           
			  //  $('#idUtilitiesFrequency').val(expense.frequency);
			   $("#idUtilitiesFrequency option").filter(function() {
						return this.value==expense.frequency;
			      }).prop('selected', true);
			  //  alert("expense.frequency "+expense.frequency);
				if(expense.frequency!=12){
				//	alert("asdasdsa");
					document.getElementById("idUtilitiesReferenceMonth").disabled = false;	
				}
				
				// $('#idUtilitiesReferenceMonth').val(expense.referenceMonth);
				 $("#idUtilitiesReferenceMonth option").filter(function() {
						return this.value==expense.referenceMonth;
			      }).prop('selected', true);
				
			//	 $('#idUtilitiesYearTill').val(expense.endYear);
				 $("#idUtilitiesYearTill option").filter(function() {
						return this.value==expense.endYear;
			      }).prop('selected', true);
       
		}
		if(expense.expenseType==3){
		//	//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdTransport").val(expense.id);
		//	 $('input[name=familyMember]:checked').val(expense.familyMemberId);
			 $("#idExpenseTypeTransport").val(expense.expenseType);
			 $("#idTransportAmount").val(maskAmountValue(expense.expenseAmount));
           
			// $('#idTransportFrequency').val(expense.frequency);
			 $("#idTransportFrequency option").filter(function() {
					return this.value==expense.frequency;
		      }).prop('selected', true);
			 
			   if(expense.Frequency!=12){
				document.getElementById("idTransportReferenceMonth").disabled = false;	
			}
			
			// $('#idTransportReferenceMonth').val(expense.referenceMonth);
			 $("#idTransportReferenceMonth option").filter(function() {
					return this.value==expense.referenceMonth;
		      }).prop('selected', true);
			 
		//	 $('#idTransportYearTill').val(expense.endYear);
			 $("#idTransportYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);

          

		}
		
		if(expense.expenseType==4){
		//	//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdHousehold").val(expense.id);
		//	 $('input[name=familyMember]:checked').val(expense.familyMemberId);
			 $("#idExpenseTypeHousehold").val(expense.expenseType);
			 $("#idHouseholdAmount").val(maskAmountValue(expense.expenseAmount));
              
			
	           
			// $('#idHouseholdFrequency').val(expense.frequency);
			 $("#idHouseholdFrequency option").filter(function() {
					return this.value==expense.frequency;
		      }).prop('selected', true);
			 
			   if(expense.frequency!=12){
				document.getElementById("idHouseholdReferenceMonth").disabled = false;	
			}
			
			// $('#idHouseholdReferenceMonth').val(expense.referenceMonth);
			 $("#idHouseholdReferenceMonth option").filter(function() {
					return this.value==expense.referenceMonth;
		      }).prop('selected', true);
			 
		//	 $('#idHouseholdYearTill').val(expense.endYear);
			 $("#idHouseholdYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);

		}
		if(expense.expenseType==5){
		//	//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdHousing").val(expense.id);
			 
			 $("#idExpenseTypeHousing").val(expense.expenseType);
			 $("#idHousingAmount").val(maskAmountValue(expense.expenseAmount));
            
			// $('#idHousingFrequency').val(expense.frequency);
			 $("#idHousingFrequency option").filter(function() {
					return this.value==expense.frequency;
		      }).prop('selected', true);
			 
			   if(expense.frequency!=12){
				document.getElementById("idHousingReferenceMonth").disabled = false;	
			}
			
			// $('#idHousingReferenceMonth').val(expense.referenceMonth);
			 $("#idHousingReferenceMonth option").filter(function() {
					return this.value==expense.referenceMonth;
		      }).prop('selected', true);
			 
			// $('#idHousingYearTill').val(expense.endYear);
			 $("#idHousingYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);
			
           
	             
		}
		if(expense.expenseType==6){
		//	//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdCommunication").val(expense.id);
		//	 $('input[name=familyMember]:checked').val(expense.familyMemberId);
			 $("#idExpenseTypeCommunication").val(expense.expenseType);
			 $("#idCommunicationAmount").val(maskAmountValue(expense.expenseAmount));
            
			// $('#idCommunicationFrequency').val(expense.frequency);
			 $("#idCommunicationFrequency option").filter(function() {
					return this.value==expense.frequency;
		      }).prop('selected', true);
			 
			   if(expense.frequency!=12){
				document.getElementById("idCommunicationReferenceMonth").disabled = false;	
			}
			
			// $('#idCommunicationReferenceMonth').val(expense.referenceMonth);
			 $("#idCommunicationReferenceMonth option").filter(function() {
					return this.value==expense.referenceMonth;
		      }).prop('selected', true);
			// $('#idCommunicationYearTill').val(expense.endYear);
			 $("#idCommunicationYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);

		}
		if(expense.expenseType==7){
		//	//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdEntertainment").val(expense.id);
	//		 $('input[name=familyMember]:checked').val(expense.familyMemberId);
			 $("#idExpenseTypeEntertainment").val(expense.expenseType);
			 $("#idEntertainmentAmount").val(maskAmountValue(expense.expenseAmount));
            
			 
		//	 $('#idEntertainmentFrequency').val(expense.frequency);
			 $("#idEntertainmentFrequency option").filter(function() {
					return this.value==expense.frequency;
		      }).prop('selected', true);
			 
			   if(expense.frequency!=12){
				document.getElementById("idEntertainmentReferenceMonth").disabled = false;	
			}
			
			 $('#idEntertainmentReferenceMonth').val(expense.referenceMonth);
			 $("#idEntertainmentReferenceMonth option").filter(function() {
					return this.value==expense.referenceMonth;
		      }).prop('selected', true);
			 
			// $('#idEntertainmentYearTill').val(expense.endYear);
			 $("#idEntertainmentYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);

		}
		
		if(expense.expenseType==8){
		//	//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdApparel").val(expense.id);
			 
			 $("#idExpenseTypeApparel").val(expense.expenseType);
			 $("#idApparelAmount").val(maskAmountValue(expense.expenseAmount));
            
				
			// $('#idApparelFrequency').val(expense.frequency);
			 $("#idApparelFrequency option").filter(function() {
					return this.value==expense.frequency;
		      }).prop('selected', true);
			 
			   if(expense.frequency!=12){
				document.getElementById("idApparelReferenceMonth").disabled = false;	
			}
			
			 //$('#idApparelReferenceMonth').val(expense.referenceMonth);
			 $("#idApparelReferenceMonth option").filter(function() {
					return this.value==expense.referenceMonth;
		      }).prop('selected', true);
			 
			// $('#idApparelYearTill').val(expense.endYear);
			 $("#idApparelYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);

          
		}
		if(expense.expenseType==9){
		//	//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdtutionAmount").val(expense.id); 
			 $("#idExpenseTypetution").val(expense.expenseType);
			 $("#idTutionAmount").val(maskAmountValue(expense.expenseAmount));
            
			// $('#idTutionFrequency').val(expense.frequency);
			 $("#idTutionFrequency option").filter(function() {
					return this.value==expense.frequency;
		      }).prop('selected', true);
			 
			   if(expense.frequency!=12){
				document.getElementById("idTutionReferenceMonth").disabled = false;	
			}
			
			// $('#idTutionReferenceMonth').val(expense.referenceMonth);
			 $("#idTutionReferenceMonth option").filter(function() {
					return this.value==expense.referenceMonth;
		      }).prop('selected', true);
			 
			// $('#idTutionYearTill').val(expense.endYear);
			 $("#idTutionYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);
 
		}
		if(expense.expenseType==10){
	//		//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdHealthcare").val(expense.id);
			 
			 $("#idExpenseTypeHealthcare").val(expense.expenseType);
			 $("#idHealthcareAmount").val(maskAmountValue(expense.expenseAmount));
            
			// $('#idHealthcareFrequency').val(expense.frequency);
			 $("#idHealthcareFrequency option").filter(function() {
					return this.value==expense.frequency;
		      }).prop('selected', true);
			 
			   if(expense.frequency!=12){
				document.getElementById("idHealthcareReferenceMonth").disabled = false;	
			}
			
			// $('#idHealthcareReferenceMonth').val(expense.referenceMonth);
			 $("#idHealthcareReferenceMonth option").filter(function() {
					return this.value==expense.referenceMonth;
		      }).prop('selected', true);
			 
			 
		//	 $('#idHealthcareYearTill').val(expense.endYear);
			 $("#idHealthcareYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);
      
		}
		if(expense.expenseType==11){
	//		//////console.log("pp "+expense.expenseType);
			 $("input[name='option']:checked").val(expense.option);
			 $("#idExpenseIdOthers").val(expense.id);
			 $("#idExpenseTypeOthers").val(expense.expenseType);
			 $("#idOtherExpenseAmount").val(maskAmountValue(expense.expenseAmount));
           
			// $('#idOtherExpenseFrequency').val(expense.frequency);
			 $("#idOtherExpenseFrequency option").filter(function() {
					return this.value==expense.frequency;
		      }).prop('selected', true);
			 
			   if(expense.frequency!=12){
				document.getElementById("idOtherExpenseReferenceMonth").disabled = false;	
			}
			
			// $('#idOtherExpenseReferenceMonth').val(expense.referenceMonth);
			 $("#idOtherExpenseReferenceMonth option").filter(function() {
					return this.value==expense.referenceMonth;
		      }).prop('selected', true);
			 
		//	 $('#idOtherExpenseYearTill').val(expense.endYear);
			 $("#idOtherExpenseYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);
			 
            		             
		}
		
		}
		else{
		if(expense.expenseType==12){
		//	//////console.log("pp "+expense.expenseType);
			 $("#idExpenseIdTotal").val(expense.id);
		//	 $('input[name=familyMember]:checked').val(expense.familyMemberId);
			 $("#idExpenseTypeTotal").val(expense.expenseType);
			 $("#idTotalExpenseAmount").val(maskAmountValue(expense.expenseAmount));
              
			// $('#idTotalExpenseYearTill').val(expense.endYear);
		//	//////console.log("end year "+expense.endYear);
			 $("#idTotalExpenseYearTill option").filter(function() {
					return this.value==expense.endYear;
		      }).prop('selected', true);
		}
		}
		
		 });
	
	
	}
}


$("#save").on("click", function(event) {
	  
/*	  var returl = "clientGoal/checkIfRetirementGoalExists/" + selectedClientId;
      getClientData("GET", "", returl, checkSuccess);

      function checkSuccess(data1) {
          //alert(data1);
          if (data1) {
        	  bootbox.confirm({
        		  	 title: 'Update Expense',
        		  	 message: 'Are you sure to update the expense details',
					 closeButton: false
        		  	callback: function (result) {
			    		 if (result === true) {
			    			    unmaskAllAmountFields();
			    				b=validateExpense();
			    				if(b){
			    				showLoaderOnSave("#save");	
			    				window.setTimeout(function(){
			    				save('editExpense/');
			    				}, 5000);	
			    				}
			 			}
	 				 }	
				});

             }
      }*/
	
//	alert("amount "+$("#idHousingAmount").val());
//	alert("save");
	unmaskAllAmountFields();
	b=validateExpense();
	if(b){
	showLoaderOnSave("#save");	
	window.setTimeout(function(){
	save('editExpense/');
	}, 5000);	
	}
	
});

function save(serviceUrl) {
	//		 alert("jjj "+serviceUrl);
	//		 alert("member iiiddd"+$('input[name=familyMember]:checked').val());
	// alert($('input[name=name_of_your_radiobutton]:checked').val());
	//		 alert("option "+$("input[name='option']:checked").val())
	//		 alert("id "+$("#idExpenseIdSalary").val());
	//		 alert($("#idExpenseTypeSalary").val());
	//		 alert($("#idSalaryFrequency").val());
	//		 alert($("#idSalaryReferenceMonth").val());
	  //     //////console.log("idHouseholdAmount "+$("#idHouseholdAmount").val());
	  //     //////console.log("idHousingAmount "+$("#idHousingAmount").val());
	
	 var option = $("input[name='option']:checked").val();
	if (option == 'I') {
		var obj = [ {
			option : $("input[name='option']:checked").val(),
			id : $("#idExpenseIdGrocery").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			familyMemberId : $('input[name=familyMember]:checked').val(),
			expenseType : $("#idExpenseTypeGrocery").val(),
			expenseAmount : $("#idGroceryAmount").val(),
			frequency : $("#idGroceryFrequency").val(),
			referenceMonth : $("#idGroceryReferenceMonth").val(),
			endYear : $("#idGroceryYearTill").val()

		}, {

			option : $("input[name='option']:checked").val(),
			id : $("#idExpenseIdUtilities").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			familyMemberId : $('input[name=familyMember]:checked').val(),
			expenseType : $("#idExpenseTypeUtilities").val(),
			expenseAmount : $("#idUtilitiesAmount").val(),
			frequency : $("#idUtilitiesFrequency").val(),
			referenceMonth : $("#idUtilitiesReferenceMonth").val(),
			endYear : $("#idUtilitiesYearTill").val()
	

		}, {

			option : $("input[name='option']:checked").val(),
			id : $("#idExpenseIdTransport").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			familyMemberId : $('input[name=familyMember]:checked').val(),
			expenseType : $("#idExpenseTypeTransport").val(),
			expenseAmount : $("#idTransportAmount").val(),
			frequency : $("#idTransportFrequency").val(),
			referenceMonth : $("#idTransportReferenceMonth").val(),
			endYear : $("#idTransportYearTill").val()

		}, {
			id : $("#idExpenseIdHousehold").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			familyMemberId : $('input[name=familyMember]:checked').val(),
			expenseType : $("#idExpenseTypeHousehold").val(),
			expenseAmount : $("#idHouseholdAmount").val(),
			frequency : $("#idHouseholdFrequency").val(),
			referenceMonth : $("#idHouseholdReferenceMonth").val(),
			endYear : $("#idHouseholdYearTill").val(),
			option : $("input[name='option']:checked").val()
			
			
		}, {
			id : $("#idExpenseIdHousing").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			familyMemberId : $('input[name=familyMember]:checked').val(),
			expenseType : $("#idExpenseTypeHousing").val(),
			expenseAmount : $("#idHousingAmount").val(),
			frequency : $("#idHousingFrequency").val(),
			referenceMonth : $("#idHousingReferenceMonth").val(),
			endYear : $("#idHousingYearTill").val(),
			option : $("input[name='option']:checked").val()

		}, {
			id : $("#idExpenseIdCommunication").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			familyMemberId : $('input[name=familyMember]:checked').val(),
			expenseType : $("#idExpenseTypeCommunication").val(),
			expenseAmount : $("#idCommunicationAmount").val(),
			frequency : $("#idCommunicationFrequency").val(),
			referenceMonth : $("#idCommunicationReferenceMonth").val(),
			endYear : $("#idCommunicationYearTill").val(),
			option : $("input[name='option']:checked").val()
			
			

		}, {
			id : $("#idExpenseIdEntertainment").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			familyMemberId : $('input[name=familyMember]:checked').val(),
			expenseType : $("#idExpenseTypeEntertainment").val(),
			expenseAmount : $("#idEntertainmentAmount").val(),
			frequency : $("#idEntertainmentFrequency").val(),
			referenceMonth : $("#idEntertainmentReferenceMonth").val(),
			endYear : $("#idEntertainmentYearTill").val(),
			option : $("input[name='option']:checked").val()
			

		}, {
			id : $("#idExpenseIdApparel").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			
			expenseType : $("#idExpenseTypeApparel").val(),
			expenseAmount : $("#idApparelAmount").val(),
			frequency : $("#idApparelFrequency").val(),
			referenceMonth : $("#idApparelReferenceMonth").val(),
			endYear : $("#idApparelYearTill").val(),
			option : $("input[name='option']:checked").val()
			
		},{
			id : $("#idExpenseIdtutionAmount").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			
			expenseType : $("#idExpenseTypetution").val(),
			expenseAmount : $("#idTutionAmount").val(),
			frequency : $("#idTutionFrequency").val(),
			referenceMonth : $("#idTutionReferenceMonth").val(),
			endYear : $("#idTutionYearTill").val(),
			option : $("input[name='option']:checked").val()
			
			
		},{
			id : $("#idExpenseIdHealthcare").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			
			expenseType : $("#idExpenseTypeHealthcare").val(),
			expenseAmount : $("#idHealthcareAmount").val(),
			frequency : $("#idHealthcareFrequency").val(),
			endYear : $("#idHealthcareYearTill").val(),
			referenceMonth : $("#idHealthcareReferenceMonth").val(),
			option : $("input[name='option']:checked").val()

			
		},{
			id : $("#idExpenseIdOthers").val(),
			clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
			
			expenseType : $("#idExpenseTypeOthers").val(),
			expenseAmount : $("#idOtherExpenseAmount").val(),
			frequency : $("#idOtherExpenseFrequency").val(),
			referenceMonth : $("#idOtherExpenseReferenceMonth").val(),
			endYear : $("#idOtherExpenseYearTill").val(),
			option : $("input[name='option']:checked").val()
			
		
		} ]
	} else {
		if (option == 'T') {

			//			 alert("year "+$("#idTotalExpenseYearTill").val());

			 	 /* alert("option "+$("input[name='option']:checked").val())
				 alert("id "+$("#idExpenseIdTotal").val());
				 alert("clientId:"+sessionStorage.getItem("SELECTED_CLIENT_ID"));
				 alert("memeber "+$('input[name=familyMember]:checked').val());
				 alert("ExpenseType: "+$("#idExpenseTypeTotal").val());
				 alert("ExpenseAmount: "+$("#idTotalExpenseAmount").val());
				 alert("ExpenseFrequency: "+$("#idTotalExpenseFrequency").val()); 
			     alert("month "+$("#idTotalExpenseReferenceMonth").val()); 
			     alert("ExpenseEndYear: "+$("#idTotalExpenseYearTill").val());  */

			var obj = [ {
				option : $("input[name='option']:checked").val(),
				id : $("#idExpenseIdTotal").val(),
				clientId : sessionStorage.getItem("SELECTED_CLIENT_ID"),
				expenseType : $("#idExpenseTypeTotal").val(),
				expenseAmount : $("#idTotalExpenseAmount").val(),
				frequency : $("#idTotalExpenseFrequency").val(),
				/* referenceMonth : $("#idTotalExpenseReferenceMonth").val(), */
				endYear : $("#idTotalExpenseYearTill").val()

			} ]
		}
	}

	data = JSON.stringify(obj);
  //  //////console.log(data);
	saveData("POST", data, serviceUrl, onUpdateSuccess);
	function onUpdateSuccess(data) {

			hideLoaderOnSave("#save");
            selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
    		serviceurl = "expense/" + selectedClientId;
    		getClientData("GET", "",serviceurl, onSuccess);
    		
			function onSuccess(data){
		 		sessionStorage.setItem("EXPENSE_LIST", JSON.stringify(data));
				$("#idClient").empty();
				$("#idClient").load("clientInfo/viewHouseholdExpense.html");
				$(".dashboardheading").html("View Household Expense");
				$("#wrapper").css("height", "auto");
				$(".form-section-container").css("height", "auto");
			    $("#addRecord").removeClass('btn_Disabled');
        	    $('#editRecord').addClass('btn_Disabled');
            	$('#deleteRecord').addClass('btn_Disabled');
			}
	}
}

$(function() {
	//	alert("option checked");
	
	
//Edit
 	$("#idOptionI, #idOptionT").change(function() {
		//////console.log("Function onchange");

		if ($("#idOptionI").is(":checked")) {
			    //////console.log("option hidden "+$("#idOptionHidden").val());
			if ($("#idOptionHidden").val() == "T") {
				//////console.log("idOptionI checked  idOptionHidden T");
	        //	var message="idOptionI checked  idOptionHidden T";
			//	confirmatioCustomClickModalMessage("Total expense will be deleted and individual income heads will be saved. Please confirm.",'messageConfirm');
			
			  bootbox.confirm({
				  title: "Change from Total to Individual income",
			    	message: "Total Expense will be deleted and individual Expense heads will be saved. Please confirm.",
				    	callback: function (result) {
				    		 if (result === true) {
			    			// alert(true);
			    			 $("#show-me-two").hide();
			 				 $("#show-me").show();	
    			 			}
	    	 				else{
	     				//	alert(false);
	     					$("#show-me-two").show();
			 				$("#show-me").hide();	
			 				$("#idOptionT").prop("checked", true); 
	    	 				}
    	 				}	
            		});
				
		 	}else{
		 		$("#show-me-two").hide();
				$("#show-me").show();
				$("#idTotalExpenseAmount").focus();
		}
		}
		else {
			if ($("#idOptionT").is(":checked")) {
				
				if ($("#idOptionHidden").val() == "I") {
					//////console.log("idOptionT checked  idOptionHidden I");
				//	var message="idOptionT checked  idOptionHidden I";
					//confirmatioCustomClickModalMessage("Individual expense heads will be deleted and total income will be saved. Please confirm.",'messageConfirm');
					  bootbox.confirm({
						 title: "Change from Individual to Total income",
					     message: "Individual Expense heads will be deleted and total Expense will be saved. Please confirm.",
				    	callback: function (result) {
				    		 if (result === true) {
			    			// alert(true);
			    			    $("#show-me").hide();
								$("#show-me-two").show();
								$("#idTotalExpenseAmount").focus();
    			 			}
	    	 				else{
	     					//alert(false);
	     					$("#show-me-two").hide();
			 				$("#show-me").show();	
			 				$("#idOptionI").prop("checked", true); 
	    	 				}
    	 				}	
            		});
			////////console.log("E");
				} else{
					$("#show-me").hide();
					$("#show-me-two").show();
					$("#idExpenseTypeGrocery").focus();
				}

			}
		}

	}); 


});
function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord(sessionStorage.getItem("CLIENT_SERVICE_URL") + 'delete/'+sessionStorage.getItem("SELECTED_CLIENT_ID"));
	$("#idClient").empty();
	$("#idClient").load("clientInfo/viewHouseholdexpense.html");
	$(".dashboardheading").html("View Household Expense");
	$("#wrapper").css("height", "auto");
	$(".form-section-container").css("height", "auto");
    $("#addRecord").removeClass('btn_Disabled');
    $('#editRecord').addClass('btn_Disabled');
    $('#deleteRecord').addClass('btn_Disabled');
	
}


$("#idUndo").on("click",
		function(event) {

	
     //alert("cl "+sessionStorage.getItem("SELECTED_CLIENT_ID"));
	editData('AllExpense/'+sessionStorage.getItem("SELECTED_CLIENT_ID"));
	maskAllAmountFields();
	//alert(2);
});	
	function retirementAgeSuccess(data) {
		retirementAge=data.retirementAge;
		
		//////////////console.log("retirementAge "+retirementAge);
	    populateDropdownYear("Select", $("#idGroceryYearTill"), '/AllYears', 2);

        
        populateDropdownYear("Select", $("#idUtilitiesYearTill"),'/AllYears', 2);

       
        populateDropdownYear("Select", $("#idTransportYearTill"),'/AllYears', 2);

       
        populateDropdownYear("Select", $("#idHouseholdYearTill"),'/AllYears', 2);

        
        populateDropdownYear("Select", $("#idHousingYearTill"),'/AllYears', 2);

       
        populateDropdownYear("Select", $("#idCommunicationYearTill"),'/AllYears', 2);

       
        populateDropdownYear("Select", $("#idEntertainmentYearTill"),'/AllYears', 2);

       
        populateDropdownYear("Select", $("#idApparelYearTill"),'/AllYears', 2);

       
        populateDropdownYear("Select", $("#idTutionYearTill"), '/AllYears', 2);

     
        populateDropdownYear("Select", $("#idHealthcareYearTill"),'/AllYears', 2);
        
     
        populateDropdownYear("Select", $("#idOtherExpenseYearTill"),'/AllYears', 2);

        populateDropdownYear("Select", $("#idTotalExpenseYearTill"),'/AllYears', 2);
	} 
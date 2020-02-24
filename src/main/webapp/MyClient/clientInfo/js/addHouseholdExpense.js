var retirementAge=0;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(
                function() {
                	
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
                
                	getClientData("GET", "", "clientFamilyMember/" + sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID"), retirementAgeSuccess);
                    sessionStorage.setItem("CLIENT_SERVICE_URL", ClientServiceUrl);
                   
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
                 //   populateDropdownYear("Select", $("#idTransportYearTill"),'/AllYears', 2);

                    populateDropdownFrequency("Select", $("#idHouseholdFrequency"),
                            '/AllFrequency', 12);
                    populateDropdownMonth("Select", $("#idHouseholdReferenceMonth"),
                            '/AllMonths', 13);
                 //   populateDropdownYear("Select", $("#idHouseholdYearTill"),'/AllYears', 2);

                    populateDropdownFrequency("Select", $("#idHousingFrequency"),
                            '/AllFrequency', 12);
                    populateDropdownMonth("Select", $("#idHousingReferenceMonth"),
                            '/AllMonths', 13);
                 //   populateDropdownYear("Select", $("#idHousingYearTill"),'/AllYears', 2);

                    populateDropdownFrequency("Select", $("#idCommunicationFrequency"),
                            '/AllFrequency', 12);
                    populateDropdownMonth("Select", $("#idCommunicationReferenceMonth"),
                            '/AllMonths', 13);
                //    populateDropdownYear("Select", $("#idCommunicationYearTill"),'/AllYears', 2);

                    populateDropdownFrequency("Select", $("#idEntertainmentFrequency"),
                            '/AllFrequency', 12);
                    populateDropdownMonth("Select", $("#idEntertainmentReferenceMonth"),
                            '/AllMonths', 13);
                //    populateDropdownYear("Select", $("#idEntertainmentYearTill"),'/AllYears', 2);

                    populateDropdownFrequency("Select", $("#idApparelFrequency"),
                            '/AllFrequency', 12);
                    populateDropdownMonth("Select", $("#idApparelReferenceMonth"),
                            '/AllMonths', 13);
             //       populateDropdownYear("Select", $("#idApparelYearTill"),'/AllYears', 2);

                    populateDropdownFrequency("Select", $("#idTutionFrequency"),
                            '/AllFrequency', 12);
                    populateDropdownMonth("Select", $("#idTutionReferenceMonth"),'/AllMonths', 13);
              //      populateDropdownYear("Select", $("#idTutionYearTill"), '/AllYears', 2);

                    populateDropdownFrequency("Select", $("#idHealthcareFrequency"),
                            '/AllFrequency', 12);
                    populateDropdownMonth("Select", $("#idHealthcareReferenceMonth"),
                            '/AllMonths', 13);
             //       populateDropdownYear("Select", $("#idHealthcareYearTill"),'/AllYears', 2);
                    
                    populateDropdownFrequency("Select", $("#idOtherExpenseFrequency"),
                            '/AllFrequency', 12);
                    populateDropdownMonth("Select", $("#idOtherExpenseReferenceMonth"),
                            '/AllMonths', 13);
             //       populateDropdownYear("Select", $("#idOtherExpenseYearTill"),'/AllYears', 2);

            //        populateDropdownYear("Select", $("#idTotalExpenseYearTill"),'/AllYears', 2);
                    
                    
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
            getClientData("GET", "", serviceUrl, populateDropdownFrequencySuccess);
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
            getClientData("GET", "", serviceUrl, populateDropdownMonthSuccess);
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
            getClientData("GET", "", serviceUrl, populateDropdownYearSuccess);
        	function populateDropdownYearSuccess(data){
        		if(retirementAge==null){
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

        $("#save").on("click", function(event) {
         // var  b=true;
        unmaskAllAmountFields();
        var	b=validateExpense();
            if(b){
            showLoaderOnSave("#save");	
            window.setTimeout(function(){
            
            save('expense/');
            }, 5000);	
            }
        });

        function save(serviceUrl) {
           
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

                     /* 	 alert("option "+$("input[name='option']:checked").val())
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
            
            //alert($("#idTotalExpenseAmount").val())

            data = JSON.stringify(obj);
        //    ////console.log(data);
            saveData("POST", data, serviceUrl, onAddSuccess);
            function onAddSuccess(data) {
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

            $("#idOptionI, #idOptionT").change(function() {
            //	    alert("iption ");
                if ($("#idOptionI").is(":checked")) {
            //		  	alert("All Expense heads");

                    $("#show-me-two").hide();
                    $("#show-me").show();
                    $("#idSalaryAmount").focus();

                } else {
                    if ($("#idOptionT").is(":checked")) {
                    //	    	alert("Total Expense");
                        //$("#idTotalExpenseAmount").removeAttr("readonly");

                        $("#show-me").hide();
                        $("#show-me-two").show();
                        $("#idTotalExpenseAmount").focus();

                    }
                }
            });

        });


        $(function(){
              $(".input-width-income-expense-add-amount").change(function(){
              //      ////console.log("Function on change add amount");
                    var totalAmount = 0;
                    $(".input-width-income-expense-add-amount").each(function() {
                 //   	////console.log("=======================");
                        var elementId = this.id;
                        var thisAmountId = "";
                        var thisFrequencyId = "";
                        thisAmountId = elementId;
                        thisFrequencyId = elementId.replace("Amount","Frequency");
                        //alert("Frequeny Id: " + thisFrequencyId);
                        //alert("Amount Id: " + thisAmountId);
                        unmaskAmount("#"+thisAmountId);
                    /*    ////console.log("name "+$("#"+thisAmountId).attr('name'));
                        ////console.log("Frequency: " + $("#"+thisFrequencyId).val());
                        ////console.log("Amount : " + $("#"+thisAmountId).val());*/
                       
                        if(!isNaN(this.value) && this.value.length!=0) {
                            if(!isNaN($("#"+thisAmountId).val()) && $("#"+thisAmountId).val().length!=0) {
                            	
                                $("#"+thisAmountId).val().toLocaleString();
                               // alert("$('#'+thisAmountId).val(): " + $("#"+thisAmountId).val()); 
                               // alert("$('#'+thisFrequencyId).val() " + $("#"+thisFrequencyId).val()); 
                                thisAnnualAmount = $("#"+thisAmountId).val() * $("#"+thisFrequencyId).val(); 
                                totalAmount += parseFloat(thisAnnualAmount);
                               // alert("totalAmount a: " + totalAmount); 
                                maskAmount("#"+thisAmountId);
                                
                            }
                        }
                      
                    })
                   //alert("totalAmount aa"+totalAmount);
                    $("#idRunningTotal").val(totalAmount.toFixed(2));
                    maskAmount("#idRunningTotal");
                })

            $(".input-width-income-expense-add-frequency").change(function(){
            ////console.log("Function on change add frequency");
            var totalAmount = 0;
            var thisAnnualAmount = 0;
        $(".input-width-income-expense-add-frequency").each(function() {
        	    ////console.log("=======================");
                var elementId = this.id;
                var thisAmountId = "";
                var thisFrequencyId = "";
                thisFrequencyId = elementId;
                thisAmountId = elementId.replace("Frequency","Amount");
                //alert("Frequeny Id: " + thisFrequencyId);
                //alert("Amount Id: " + thisAmountId);
                unmaskAmount("#"+thisAmountId);
                ////console.log("name "+$("#"+thisAmountId).attr('name'));
                ////console.log("Frequency: " + $("#"+thisFrequencyId).val());
                ////console.log("Amount : " + $("#"+thisAmountId).val());
              
            if(!isNaN(this.value) && this.value.length!=0) {
                if(!isNaN($("#"+thisAmountId).val()) && $("#"+thisAmountId).val().length!=0) {
                	
                    $("#"+thisAmountId).val().toLocaleString();
                    thisAnnualAmount = $("#"+thisFrequencyId).val() * $("#"+thisAmountId).val();         
                    totalAmount += parseFloat(thisAnnualAmount);
                    maskAmount("#"+thisAmountId);
                     
                    ////console.log("totalAmount b: " + totalAmount);
                }
                }
             
        })
         ////console.log("totalAmount after bb: " + totalAmount);
        $("#idRunningTotal").val(totalAmount.toFixed(2));
        maskAmount("#idRunningTotal");
      })
        });


        function setRefMonth(frequency) {

            //   alert("frequency.value "+frequency.value+"  "+frequency);
            if (frequency.value == 12) {

            //	  	 alert("frequency.name "+frequency.name);
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

                // 	alert("ssss22222s");
                if (frequency.name == "groceryFrequency") {
                    document.getElementById("idGroceryReferenceMonth").disabled = false;
                    document.getElementById("idGroceryReferenceMonth").value = "";
                    document.getElementById("idGroceryReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "utilitiesFrequency") {
                    document.getElementById("idUtilitiesReferenceMonth").disabled = false;
                    document.getElementById("idUtilitiesReferenceMonth").value = "";
                    document.getElementById("idUtilitiesReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "transportFrequency") {
                    document.getElementById("idTransportReferenceMonth").disabled = false;
                    document.getElementById("idTransportReferenceMonth").value = "";
                    document.getElementById("idTransportReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "householdFrequency") {
                    document.getElementById("idHouseholdReferenceMonth").disabled = false;
                    document.getElementById("idHouseholdReferenceMonth").value = "";
                    document.getElementById("idHouseholdReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "housingFrequency") {
                    document.getElementById("idHousingReferenceMonth").disabled = false;
                    document.getElementById("idHousingReferenceMonth").value = "";
                    document.getElementById("idHousingReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "communicationFrequency") {
                    document.getElementById("idCommunicationReferenceMonth").disabled = false;
                    document.getElementById("idCommunicationReferenceMonth").value = "";
                    document.getElementById("idCommunicationReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "entertainmentFrequency") {
                    document.getElementById("idEntertainmentReferenceMonth").disabled = false;
                    document.getElementById("idEntertainmentReferenceMonth").value = "";
                    document.getElementById("idEntertainmentReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "apparelFrequency") {
                    document.getElementById("idApparelReferenceMonth").disabled = false;
                    document.getElementById("idApparelReferenceMonth").value = "";
                    document.getElementById("idApparelReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "tutionFrequency") {
                    document.getElementById("idTutionReferenceMonth").disabled = false;
                    document.getElementById("idTutionReferenceMonth").value = "";
                    document.getElementById("idTutionReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "healthcareFrequency") {
                    document.getElementById("idHealthcareReferenceMonth").disabled = false;
                    document.getElementById("idHealthcareReferenceMonth").value = "";
                    document.getElementById("idHealthcareReferenceMonth").options[0].text = "Select";

                }
                if (frequency.name == "otherExpenseFrequency") {
                    document.getElementById("idOtherExpenseReferenceMonth").disabled = false;
                    document.getElementById("idOtherExpenseReferenceMonth").value = "";
                    document.getElementById("idOtherExpenseReferenceMonth").options[0].text = "Select";

                }
            }
        }
        
    	function retirementAgeSuccess(data) {
    		retirementAge=data.retirementAge;
    		
    		////////////console.log("retirementAge "+retirementAge);
    		
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
        
        
        
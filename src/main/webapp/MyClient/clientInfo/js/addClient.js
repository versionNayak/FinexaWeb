var selfFamilyMemberId;
var lifeExpectancy = null;
var id;
var selectedClientId;
var educationalQualification = "";
var maritalStatus = "";
var employmentType = "";
var retirementType = "";
var orgName = "";
var cur_designation = "";
var pageMode = sessionStorage.getItem("PAGE_MODE");
var guardianexist = 0;
var minorToMajor_change = 0;
var majorToMinor_change = 0;
var oldGender = "";
var newGender = "";
var riskProfileScore = null;
var client_dob;
$(document).ready(function () {
    $("#addRecord").attr("disabled", "disabled");
    $("#addRecord").attr("class", "btn_Disabled");
    
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
			$("#idClientSubmit").show();
			$("#undo").show();
		}else if(loggedClient.clientInfoView === "Y"){
			$("#idClientSubmit").hide();
			$("#undo").hide();
		}
	}else{
		if(loggedUser != null && loggedUser.role === "Admin"){
		$("#idClientSubmit").hide();
		$("#undo").hide();
	    }else{
		if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
			$("#idClientSubmit").show();
			$("#undo").show();
		}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
			$("#idClientSubmit").hide();
			$("#undo").hide();
		}
	   }
	}
    
    if (pageMode != "EDIT") {
        $("#idSelectedClientName").empty();
    }
    $("#idFirstName").focus();
    var options = {
        onComplete: function (cep) {
            
        },
        onKeyPress: function (cep, event, currentField, options) {
        },
        onChange: function (cep) {
        },
        onInvalid: function (val, e, f, invalid, options) {
        }
    };

    $('#idBdate').mask('00/00/0000', options);

    "use strict";
    $("[data-toggle=\"tooltip\"]").tooltip();
    console.log("Page mode: " + pageMode);
    $("#idBdate").datepicker({
        format: "dd/mm/yyyy",
        todayHighlight: true,
        todayBtn: true,
        autoclose: true,
        forceParse: false,
        endDate: new Date()
    }).on('changeDate', function (ev) {
        $("#alertbdate").css('color', '');
        $("#alertbdate").text("");
        $("#idBirthDateGroup").css('border', '');
        $("#idClientSubmit").prop("disabled", false);
    });

    $(".datepicker-icon").on("click", function () {
        $(this).closest(".input-group").find("input").trigger("focus");
    });

    $("#idBdate").blur(function () {

        if ($(this).val() != "") {
            if (!checkValidDate($(this).val())) {
                $("#alertbdate").css('color', 'red');
                $("#alertbdate").text("Date is invalid!");
                $("#idBirthDateGroup").css('border', '2px solid red');
                $("#idClientSubmit").prop("disabled", true);
            } else {
                $("#alertbdate").css('color', '');
                $("#alertbdate").text("");
                $("#idBirthDateGroup").css('border', '');
                $("#idClientSubmit").prop("disabled", false);
            }
        } else {
            $("#alertbdate").css('color', '');
            $("#alertbdate").text("");
            $("#idBirthDateGroup").css('border', '');
            $("#idClientSubmit").prop("disabled", false);
        }


    });

    loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));

    populateMaritalStatusDrop($("#idMStatus"));
    populateEduQualiDrop($("#idEdQualification"));
    populateEmploymentTypeDrop($("#idEmploymentType"));
    populateResidentTypeDrop($("#idResType"));
    populateCountryDrop($("#idCountry"));


    $("#idBdate").change(
        function (event) {
            var bDate = $('#idBdate').val();
            var b = validateDOB(bDate);
            console.log("b " + b);

            if (b == 2) {
                majorToMinor_change = 1;
                $("#idEdQualification").prop("disabled", true);
                $("#idEdQualification").val("");

                $("#idEmploymentType").prop("disabled", true);
                $("#idEmploymentType").val("");

                $("#idOrgName").prop("disabled", true);
                $("#idOrgName").val("");

                $("#idCurrDesignation").prop("disabled", true);
                $("#idCurrDesignation").val("");

                populateMaritalStatusDropForMinor($("#idMStatus"), 1);
            }
            if (pageMode == "ADD") {
                if (b == 1) {

                    $("#idEdQualification").prop("disabled", false);
                    $("#idEdQualification option").filter(function () {
                        return this.value == "";
                    }).prop('selected', true);

                    $("#idEmploymentType").prop("disabled", false);
                    $("#idEmploymentType option").filter(function () {
                        return this.value == "";
                    }).prop('selected', true);

                    $("#idOrgName").prop("disabled", false);
                    $("#idOrgName").val(orgName);

                    $("#idCurrDesignation").prop("disabled", false);
                    $("#idCurrDesignation").val(cur_designation)

                    populateMaritalStatusDrop($("#idMStatus"), maritalStatus);
                }
            }
            if (pageMode == "EDIT") {
                console.log("b in date of birth change " + b);
                $(".top-nav-items").show();
                selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
            
                if (b == 1) {
                    minorToMajor_change = 1;
                    
                    if (majorToMinor_change == 0) {
                        $("#idEdQualification").prop("disabled", false);
                      
                        $("#idEmploymentType").prop("disabled", false);
                      
                        $("#idOrgName").prop("disabled", false);
                      
                        $("#idCurrDesignation").prop("disabled", false);
                     
                    }

                    if (majorToMinor_change == 1) {


                        $("#idEdQualification").prop("disabled", false);
                        $("#idEdQualification option").filter(function () {
                            return this.value == educationalQualification;
                        }).prop('selected', true);

                        $("#idEmploymentType").prop("disabled", false);
                        $("#idEmploymentType option").filter(function () {
                            return this.value == employmentType;
                        }).prop('selected', true);

                        $("#idOrgName").prop("disabled", false);
                        $("#idOrgName").val(orgName);

                        $("#idCurrDesignation").prop("disabled", false);
                        $("#idCurrDesignation").val(cur_designation)


                        populateMaritalStatusDropForMinor($("#idMStatus"), maritalStatus);
                    }

                    majorToMinor_change = 0;
                }


            }

        });
    $('#focusguard-2').on('focus', function () {
        $("#idFirstName").focus();
        $(window).scrollTop(0);
    });


    if (pageMode == "EDIT") {
        getSelectedClient();
    }
});

function myDatePicker() {
    $("#idBdate").datepicker('remove');
    if (pageMode == "EDIT") {
        $("#idBdate").datepicker({
            format: "dd/mm/yyyy",
            todayHighlight: false,
            todayBtn: true,
            autoclose: true,
            forceParse: false,
            endDate: new Date()
        }).on('changeDate', function (ev) {
            $("#alertbdate").css('color', '');
            $("#alertbdate").text("");
            $("#idBirthDateGroup").css('border', '');
            $("#idClientSubmit").prop("disabled", false);
        });
    } else {
        $("#idBdate").datepicker({
            format: "dd/mm/yyyy",
            todayHighlight: true,
            todayBtn: true,
            autoclose: true,
            forceParse: false,
            endDate: new Date()
        }).on('changeDate', function (ev) {
            $("#alertbdate").css('color', '');
            $("#alertbdate").text("");
            $("#idBirthDateGroup").css('border', '');
            $("#idClientSubmit").prop("disabled", false);
        });
    }

}

function undoChange() {
    updateUNDO();

    if (pageMode == "ADD") {
        $(".form-control").val("");
        $("#idGenderM").prop("checked", true);
        $("#idGenderF").prop("checked", false);
        $("#idOtherMaritalStatus").prop("disabled", true);
        $("#idOtherEdQualification").prop("disabled", true);
        $("#idOtherEmploymentType").prop("disabled", true);
        $("#idOtherResidentType").prop("disabled", true);
        $("#idRetiredN").prop("checked", true);
        $("#idRetiredY").prop("checked", false);
        $("#idRetirementAge").prop("disabled", false);

    } else {
        if (pageMode == "EDIT") {
            getSelectedClient();

        }
    }
}

function updateUNDO() {
    var lFirstName = document.getElementById("idFirstName");
    var lMiddleName = document.getElementById("idMiddleName");
    var lLastName = document.getElementById("idLastName");
    var lIdBdate = document.getElementById("idBdate");
    var lIdCalendar = document.getElementById("idDobCalendar");
    var lPan = document.getElementById("idPan");
    var lMaritalStatus = document.getElementById("idMStatus");
    var lOtherMaritalStatus = document.getElementById("idOtherMaritalStatus");
    var lAadhar = document.getElementById("idAadhar");
    var lCurrDesig = document.getElementById("idCurrDesignation");
    var lResidentType = document.getElementById("idResType");
    var lCountryCode = document.getElementById("idCountry");
    var lOtherResidentType = document.getElementById("idOtherResidentType");
    var lRetiredGroup = document.getElementById("idRetiredGroup");
    var lRetirementAge = document.getElementById("idRetirementAge");

    lFirstName.style.border = "";
    lMiddleName.style.border = "";
    lLastName.style.border = "";
    lIdBdate.style.border = "";
    lIdCalendar.style.border = "";
    lPan.style.border = "";
    lMaritalStatus.style.border = "";
    lOtherMaritalStatus.style.border = "";
    lAadhar.style.border = "";
    lCurrDesig.style.border = "";
    lResidentType.style.border = "";
    lCountryCode.style.border = "";
    lOtherResidentType.style.border = "";
    lRetiredGroup.style.border = "";
    lRetirementAge.style.border = "";

    document.getElementById('alertfname').innerHTML = "";
    document.getElementById('alertmname').innerHTML = "";
    document.getElementById('alertlname').innerHTML = "";

    document.getElementById('alertbdate').innerHTML = "";
    document.getElementById('alertpan').innerHTML = "";
    document.getElementById('alertmstatus').innerHTML = "";
    document.getElementById('alertothermstatus').innerHTML = "";

    document.getElementById('alertaadhar').innerHTML = "";
    document.getElementById('alertCurrDesig').innerHTML = "";
    document.getElementById('alertrestype').innerHTML = "";
    document.getElementById('alertCountry').innerHTML = "";
    document.getElementById('alertOtherResType').innerHTML = "";

    document.getElementById('alertretirementage').innerHTML = "";
    document.getElementById('alertothermstatus').innerHTML = "";

    document.getElementById('alertfname').style.color = "";
    document.getElementById('alertmname').style.color = "";
    document.getElementById('alertlname').style.color = "";

    document.getElementById('alertbdate').style.color = "";
    document.getElementById('alertpan').style.color = "";
    document.getElementById('alertmstatus').style.color = "";
    document.getElementById('alertothermstatus').style.color = "";

    document.getElementById('alertaadhar').style.color = "";
    document.getElementById('alertCurrDesig').style.color = "";
    document.getElementById('alertrestype').style.color = "";
    document.getElementById('alertOtherResType').style.color = "";

    document.getElementById('alertretirementage').style.color = "";
    document.getElementById('alertothermstatus').style.color = "";
    document.getElementById('alertform').innerHTML = "";

}

function getSelectedClient() {
	$("#idPara").hide();
    $(".top-nav-items").show();
    selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
    console.log("selectedClientId " + selectedClientId);
    var serviceUrl = "clientMaster/" + selectedClientId;
    getClientData("GET", "", serviceUrl, onSuccess);

    function onSuccess(data) {
        educationalQualification = data.eduQualification;
        maritalStatus = data.maritalStatus;
        employmentType = data.employmentType;
        orgName = data.orgName;
        cur_designation = data.currDesignation;
        oldGender = data.gender;
        lifeExpectancy = data.lifeExpectancy;
        var returl = "clientGoal/checkIfRetirementGoalExists/" + selectedClientId;
        getClientData("GET", "", returl, checkSuccess);

        function checkSuccess(data1) {
            if (data1) {
                $("#idRetiredY").click(function () {
                    bootbox.alert({
                        message: " Retirement goal is mapped to the client",
                        callback: function () {
                            $("#idRetiredY").prop("checked", false);
                            $("#idRetiredN").prop("checked", true);

                        }
                    });

                });
            }
        }

        $("input[type='radio']",$('#idRetired')).change( function() {
            var incomereturn = "getExpenceUptoRetaiment/" + selectedClientId;
            getClientData("GET", "", incomereturn, checkSuccess1);
            function checkSuccess1(data2) {
                console.log(data2);
                if (data2){
                    bootbox.alert({
                        message: " Expense  is mapped upto Retirement age",
                        callback: function () {
                            $("#idRetiredY").prop("checked", false);
                            $("#idRetiredN").prop("checked", true);
                            $('#idRetirementAge').prop("disabled", false);
                        }
                    });
                }
            }

            var incomereturn1 = "getIncomeUptoRetaiment/" + selectedClientId;
            getClientData("GET", "", incomereturn1, checkSuccess2);
            function checkSuccess2(data3) {
                console.log(data3);
                if (data3){
                    bootbox.alert({
                        message: " Income  is mapped upto Retirement age",
                        callback: function () {
                            $("#idRetiredY").prop("checked", false);
                            $("#idRetiredN").prop("checked", true);
                            $('#idRetirementAge').prop("disabled", false);
                        }
                    });
                }
            }
            
            var servurl = "checkIfEpfPresent/" + selectedClientId;
            getClientData("GET", "", servurl, checkSuccess);

            function checkSuccess(data4) {
                if (data4) {
                	 bootbox.alert({
                         message: " EPF  is mapped to the client",
                         callback: function () {
                             $("#idRetiredY").prop("checked", false);
                             $("#idRetiredN").prop("checked", true);
                             $('#idRetirementAge').prop("disabled", false);
                         }
                     });
                }
            }

        var servurl = "clientAnnuity/client/" + selectedClientId;
        getClientData("GET", "", servurl, checkAnnuitySuccess);

        function checkAnnuitySuccess(data5) {
            if(data5.length > 0){
        	    $.each(data5, function (index, client) {
				  if(client.annuityType === 6) {
            	 bootbox.alert({
                     message: " EPS Annuity  is mapped to the client",
                     callback: function () {
                         $("#idRetiredY").prop("checked", true);
                         $("#idRetiredN").prop("checked", false);
                         $('#idRetirementAge').prop("disabled", true);
                        }
            	 
                     });
            	 
                   }
				  
                });
        	    
             }
            
          }
        
      });

        if (data.retiredFlag == "N") {
            $("#idRetirementAge").prop("disabled", false);
        } else {
            $("#idRetirementAge").prop("disabled", true);
        }
        if (data.riskProfileScore != null) {
            riskProfileScore = data.riskProfileScore;
        }
        sessionStorage.setItem("PAGE_MODE", "EDIT");
        selectedClientId = data.id;
        populateForm($("#client_form"), data);
        myDatePicker();
        console.log("dob " + data.birthDate);

        var b = validateDOB(data.birthDate);
        if (b == 2) {
            $("#idEdQualification").prop("disabled", true);
            $("#idEdQualification").val("");

            $("#idEmploymentType").prop("disabled", true);
            $("#idEmploymentType").val("");

            $("#idOrgName").prop("disabled", true);
            $("#idOrgName").val("");

            $("#idCurrDesignation").prop("disabled", true);
            $("#idCurrDesignation").val("");
        }

        selfFamilyMemberId = data.familyMemberId;
        $("#idOldBDate").val(data.birthDate);
        $("#idClient").val(data.clientID);
        $("#idMStatus option").filter(function () {
            return this.value == data.maritalStatus;

        }).prop('selected', true);
        
        $("#idEdQualification option").filter(function () {
            return this.value == data.eduQualification;

        }).prop('selected', true);

        $("#idEmploymentType option").filter(function () {
            return this.value == data.employmentType;

        }).prop('selected', true);
        
        $("#idResType option").filter(function () {
            return this.value == data.residentType;

        }).prop('selected', true);

        $("#idCountry option").filter(function () {
            return this.value == data.countryOfResidence;

        }).prop('selected', true);

        if (data.residentType == 1) {
            document.getElementById("idCountry").disabled = true;
        }
        
        if (data.maritalStatus != 3) {
            $("#idOtherMaritalStatus").attr("disabled", "disabled");
        } else {
            if (data.maritalStatus == 3) {
                $("#idOtherMaritalStatus").removeAttr("disabled");
            }
        }

        if (data.eduQualification != 6) {
            $("#idOtherEdQualification").attr("disabled", "disabled");
        } else {
            if (data.eduQualification == 6) {
                $("#idOtherEdQualification").removeAttr("disabled");
            }
        }

        if (data.employmentType != 8) {
            $("#idOtherEmploymentType").attr("disabled", "disabled");
        } else {
            if (data.employmentType == 8) {
                $("#idOtherEmploymentType").removeAttr("disabled");
            }
        }

        if (data.residentType != 5) {
            $("#idOtherResidentType").attr("disabled", "disabled");
        } else {
            if (data.residentType == 5) {
                $("#idOtherResidentType").removeAttr("disabled");
            }
        }

        if (data.id != 0 && data.id != null && data.id != 'udefined') {

            var b = validateDOB(data.birthDate);
            console.log("in edit mode cricial " + b);
            if (b == 2) {
                $('#idGuardian').show();
                $('#idGuardianContact').show();
            }
            if (b == 1) {
                $('#idGuardian').hide();
                $('#idGuardianContact').hide();
            }
        }
    }
}

function populateMaritalStatusDropForMinor(dropId, selectedValue) {
    getClientData("GET", "", "AllMaritalStatus", onMSSuccess);

    function onMSSuccess(data) {
        console.log(data);
        dropId.find('option').remove();
        dropId.append('<option value="">Select Marital Status</option>');
        $.each(data, function (index, item) {

            if (item.id == selectedValue) {
                dropId.append('<option value="' + item.id + '" selected>'
                    + item.description + '</option>');
            } else {
                dropId.append('<option value="' + item.id + '">'
                    + item.description + '</option>');
            }
        });
    }
}

$("#idClientSubmit").on("click", function (event) {
    var validate;

    validate = validateClient($('#client_form'));
    if (validate) {
        console.log("pageMode " + pageMode);
        event.preventDefault();
        showLoaderOnSave("#idClientSubmit");
        window.setTimeout(function () {
            var formData = $('#client_form').serializeToJSON();
            if(loggedUser != null){
            	  formData["userId"] = loggedUser.id;
            }else{
            	formData["userId"] = loggedClient.userId;
            }
          
            formData["countryOfResidence"] = $("#idCountry").val();
            var data = JSON.stringify(formData);

            if (pageMode == "ADD") {
                console.log(data);
               
                sessionStorage.setItem("CLIENT_PERSONAL_INFO", data);
                sessionStorage.setItem("PAGE_MODE", "ADD");
                var dob = $("#idBdate").val();
                var age = validateDOB(dob);
                if (age == 2) {
                    console.log("age 2 " + age);
                    sessionStorage.setItem("PAGE_MODE", "ADD");
                    hideLoaderOnSave("#idClientSubmit");
                    addPage("clientInfo/addGuardian.html", "Add Guardian Info");
                }
                if (age == 1) {
                    console.log("age 1 " + age);
                    sessionStorage.setItem("PAGE_MODE", "ADD");
                    hideLoaderOnSave("#idClientSubmit");
                    addPage("clientInfo/addContactDetails.html", "Add Client Contact Info ");

                }

            }
            else {
                if (pageMode == "EDIT") {

                    var retiredN = formData["idRetiredN"];
                    formData["id"] = selectedClientId;
                    formData["familyMemberId"] = selfFamilyMemberId;

                    console.log("riskProfileScore " + riskProfileScore);
                    if (riskProfileScore != null) {
                        formData["riskProfileScore"] = riskProfileScore;
                    }

                    data = JSON.stringify(formData);
                    var lOldBirthDate = document.getElementById("idOldBDate");
                    var lChangedBirthDate = document.getElementById("idBdate");
                    
                    sessionStorage.removeItem("OLD_BIRTH_DATE");
                    sessionStorage.setItem("OLD_BIRTH_DATE", lOldBirthDate.value);
                    
                    var momentA = moment(lOldBirthDate.value, "DD/MM/YYYY");
                    var momentB = moment(lChangedBirthDate.value, "DD/MM/YYYY");
                   
                    newGender = $('input:radio[name=gender]:checked').val();
                    
                    if (lifeExpectancy != null) {
                        if ((!momentA.isSame(momentB)) || (newGender != oldGender)) {
                            console.log("Date of birth has been changed");
                            getClientData("POST", data, "reCalculateLifeExpectancyForClient", onReCalculateLifeExpSuccess);

                            function onReCalculateLifeExpSuccess(Ldata) {
                                lifeExpectancy = Ldata.totalLifeExpectancy;
                                console.log("new lifeExp " + lifeExpectancy);
                                formData["lifeExpectancy"] = lifeExpectancy;
                            }
                        }
                    }
                    data = JSON.stringify(formData);
                    
                    var bDate = $('#idBdate').val();

                    sessionStorage.removeItem("CHANGED_BIRTH_DATE");
                    sessionStorage.setItem("CHANGED_BIRTH_DATE", bDate);

                    var b = validateDOB(bDate);
                  
                    if (b == 2) {
                        var serviceUrl = "ClientGuardianInfo/client/" + selectedClientId;
                        getClientDataAsyncFalse("GET", "", serviceUrl, onSuccess);

                        function onSuccess(data1) {
                        
                            if (data1.id != 0) {
                                guardianexist = 1;
                                if (majorToMinor_change == 1) {
                                    modalMessage("guardian already exists.pleae edit");
                                }
                                clientUpdate(data);
                            } else {
                                hideLoaderOnSave("#idClientSubmit");
                                bootbox.confirm({
                                    title: "Change from Major to Minor",
                                    message: "You have to add Guardian Info. Please confirm.",
                                    callback: function (result) {
                                        if (result === true) {
                                            console.log("data " + data);
                                            sessionStorage.setItem("PAGE_MODE", "ADD");
                                            sessionStorage.setItem("CLIENT_PERSONAL_INFO", data);
                                            addPage("clientInfo/addGuardian.html", "Add Guardian Info");
                                        }
                                    }
                                });


                            }
                        }

                    }
                    console.log("guardianexist " + guardianexist);
                    if (b == 1) {
                        if (minorToMajor_change == 1) {
                            var serviceUrl = "ClientGuardianInfo/client/" + selectedClientId;
                            getClientDataAsyncFalse("GET", "", serviceUrl, onSuccessGuardian);

                            function onSuccessGuardian(data2) {
                                if (data2.id != 0) {
                                    hideLoaderOnSave("#idClientSubmit");
                                    bootbox.confirm({
                                        title: "Change from Minor to Major",
                                        message: "guardiane will be deleted if ok pressed. Please confirm.",
                                        callback: function (result) {
                                            if (result === true) {
                                                var serviceUrl = "ClientGuardianandGuardianContactDelete/" + data2.id;
                                                getClientDataAsyncFalse("GET", "", serviceUrl, onSuccessGuardianDelete);

                                                function onSuccessGuardianDelete(data3) {
                                                    clientUpdate(data);
                                                }
                                            }

                                        }
                                    });
                                } else {
                                    clientUpdate(data)
                                }
                            }
                        }
                        else {
                            clientUpdate(data);
                        }
                    }
                }
            }

        }, 5000);
    }
    $("body").scrollTop(0);
});

function clientUpdate(data) {
    saveData("POST", data, "editClientMaster/", onUpdateSuccess);

    function onUpdateSuccess(data) {
        hideLoaderOnSave("#idClientSubmit");
        console.log(data);
        sessionStorage.setItem("SELECTED_CLIENT_ID", data.id);
        sessionStorage.setItem("PAGE_MODE", "EDIT");
        sessionStorage.removeItem("SELECTED_CLIENT_DOB");
        sessionStorage.setItem("SELECTED_CLIENT_DOB", data.birthDate);
        sessionStorage.removeItem("SELECTED_CLIENT_RETIREMENT_STATUS");
        sessionStorage.setItem("SELECTED_CLIENT_RETIREMENT_STATUS", data.retiredFlag);
        editPage("clientInfo/addClient.html", "Edit Client Personal Info ");
    }
}

function showHideRetirementAge(retiredYesNo) {
    if (retiredYesNo.value == "Y") {
        document.getElementById("idRetirementAge").disabled = true;
    } else {
        document.getElementById("idRetirementAge").disabled = false;
    }
}

function toggleOtherMaritalStatus() {
    if (document.getElementById("idMStatus").value == 3) {
        document.getElementById("idOtherMaritalStatus").disabled = false;
    } else {
        document.getElementById("idOtherMaritalStatus").value = "";
        document.getElementById("idOtherMaritalStatus").disabled = true;
    }
}

function toggleOtherEdQualification() {
    if (document.getElementById("idEdQualification").value == 6) {
        document.getElementById("idOtherEdQualification").disabled = false;

    } else {
        document.getElementById("idOtherEdQualification").value = "";
        document.getElementById("idOtherEdQualification").disabled = true;
    }
}

function fnEmploymentType() {
    if (document.getElementById("idEmploymentType").value == 8) {
        document.getElementById("idOtherEmploymentType").disabled = false;

    } else {
        document.getElementById("idOtherEmploymentType").value = "";
        document.getElementById("idOtherEmploymentType").disabled = true;

    }
 
    if (document.getElementById("idEmploymentType").value == 6) {
        document.forms["client_form"]["idRetiredY"].checked = true;
        document.getElementById("idRetirementAge").disabled = true;
    }
    else {
        document.forms["client_form"]["idRetiredN"].checked = true;
        document.getElementById("idRetirementAge").disabled = false;
    }
}

function toggleOtherResidentType() {
    if (document.getElementById("idResType").value == 5) {
        document.getElementById("idOtherResidentType").disabled = false;
        document.getElementById("idCountry").disabled = false;
        document.getElementById("idCountry").value = "";
    } else {
        if (document.getElementById("idResType").value != 5) {
            document.getElementById("idOtherResidentType").value = "";
            document.getElementById("idOtherResidentType").disabled = true;
            if (document.getElementById("idResType").value == 1) {
                document.getElementById("idCountry").value = 99;
                document.getElementById("idCountry").disabled = true;
            }
            else {
                if (document.getElementById("idResType").value != 1) {
                    document.getElementById("idCountry").disabled = false;
                    document.getElementById("idCountry").value = "";
                }
            }
        }
    }

}

window.onbeforeunload = function ()
{
    return "";
};
window.onbeforeunload = function() {
    return "Leaving this page will reset the wizard";
};
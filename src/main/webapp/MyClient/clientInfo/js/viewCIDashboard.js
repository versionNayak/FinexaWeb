	$(document).ready(function() {

	    // ************************ DEFAULT ONLOAD VIEW CLIENT STARTS *************************//
	    $("#idClient").empty();
	    //$(".dashboardheading    ").html("");
	    //var selectedClientId1 = sessionStorage.getItem("SELECTEDCLIENTID");
	    var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	    // alert("view CI dashboard selectedClientId "+selectedClientId);
	    if (selectedClientId == null || selectedClientId == "") {
	        if (sessionStorage.getItem("PAGE_MODE") == "Advisor Dashboard") {
	            $("#idClient").load("../advisorMyClient.html");
	            $(".dashboardheading").html("Advisor Dashboard");
	        } else {
	            $(".dashboardheading    ").html("Search and List Clients");
	            $("#idClient").load("clientInfo/viewClient.html");
	            $("#mandatory-field-msg").hide();
	        }
	    } else {
	        if (selectedClientId != null || selectedClientId != "") {
	            //sessionStorage.setItem("SELECTED_CLIENT_ID",selectedClientId1);
	            //	editPage("clientInfo/addClient.html","Edit Client Personal Info");
	            openPage("clientInfo/clientDashboard.html", "Client Dashboard"); //click Client Info and enter dashboard page
	            $(window).scrollTop(0);
	        }
	    }

	    var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	    var loggedClient;
	    if (loggedUser == null) {
	        loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	    } else {
	        loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	    }
	    var url = "clientInfo/addClient.html";
	    var heading = "Add Client Personal Info";
	    if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) ||
	        ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	        $("#headIcon").empty();

	        url = "clientInfo/addClient.html";
	        heading = "Edit Client Personal Info";

	        $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' disabled onClick='editPageClient(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/> ");
	        //$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
	    } else {
	        url = "clientInfo/addClient.html";
	        heading = "Edit Client Personal Info";

	        if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	            heading = "View Client Personal Info";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' disabled onClick='editPageClient(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/> ");
	        }
	        /*else{
	    		  $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' disabled onClick='editPageClient(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/> ");
	    	}*/
	    }
	    if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	        $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	    }
	    $("#addRecord").removeClass('btn_Disabled');
	    $('#editRecord').addClass('btn_Disabled');
	    $('#deleteRecord').addClass('btn_Disabled');
	    // ************************DEFAULT ONLOAD VIEW CLIENT ENDS *************************//    

	    // ************************ EXISTING CLIENT STARTS *************************//
	    $(".existingclientlhs").click(function() {
	        $("#idClient").empty();
	        $("#idClient").load("clientInfo/viewClient.html");

	        $(".dashboardheading    ").html("");
	        $(".dashboardheading    ").html("Search and List Clients");
	        var url = "clientInfo/addClient.html";
	        var heading = "   Add Client Personal Info";
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            $("#headIcon").empty();
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/addClient.html";
	            heading = "Edit Client Personal Info";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPageClient(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        }
	        url = "clientInfo/addClient.html";
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ EXISTING CLIENT ENDS *************************//

	    // ************************ EXISTING CLIENT STARTS *************************//
	    $(".addclientdata").click(function() {
	        $(".dashboardheading").html("Add Client Personal Info");
	        $("#wrapper").css("height", "1800px");
	        $("#idClient").empty();
	        $("#idClient").load("clientInfo/addClient.html");
	        sessionStorage.setItem("PAGE_MODE", "ADD");
	        //$("#idClient").load("clientInfo/addContactdetails.html");
	        //$(".form-section-container").css("height","1850px");
	        $("#page-content-wrapper").css("height", "auto");
	    });
	    // ************************ EXISTING CLIENT ENDS *************************//

	    /**********************************************************************************/
	    /*****************************UNDER PERSONAL PROFILE LINK *************************/
	    /**********************************************************************************/

	    // ************************ PERSONAL INFORMATION STARTS *************************//
	    $(".pi").click(function() {
	        $("#idClient").empty();
	        $("#idClient").load("clientInfo/addClient.html");
	        $("#mandatory-field-msg").show();
	        sessionStorage.setItem("PAGE_MODE", "EDIT");
	        /*$(".dashboardheading    ").html("");*/
	        $(".dashboardheading    ").html("Edit Client Personal Info");
	        $("#headIcon").empty();
	        var url = "clientInfo/addClient.html";
	        var heading = "Add Client Personal Info"
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            //$("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/addClient.html";
	            heading = "Edit Client Personal Info"
	                //$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPage(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                url = "clientInfo/addClient.html";
	                $(".dashboardheading    ").html("View Client Personal Info");
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='addRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }

	        //   url = "clientInfo/addClient.html";
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            //$("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        /*$(".dashboardheading    ").html("Search and List Clients");*/
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ PERSONAL INFORMATION ENDS *************************//

	    // ************************ FAMILY INFORMATION STARTS *************************//   		
	    $(".fi").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();

	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");

	        serviceurl = "clientFamilyMember/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {

	                //if client or advisor has access for Add/Edit or not
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addFamilyInfo.html";
	                    addPage(addURL, "Add Family Member Info");

	                } else {
	                    //$("#idClient").load("../authorisationErrorPage.html");
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");
	                    //$("p:contains('Error')").hide();
	                }
	            } else {
	                sessionStorage.setItem("FAMILY_MEMBER_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewFamilyInfo.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Family Members");
	            }
	        }

	        $("#headIcon").empty();
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            var url = "clientInfo/addFamilyInfo.html";
	            var heading = "Add Family Info"
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/editFamilyInfo.html";
	            heading = "Edit Family Info";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                url = "clientInfo/editFamilyInfo.html";
	                heading = "View Family Info";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }
	        //url = "clientInfo/viewFamilyInfo.html";
	        //heading = "Family Members"
	        /* $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");*/
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRowMember()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        //$(".dashboardheading    ").html("Search and List Clients");
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ FAMILY INFORMATION ENDS *************************// 

	    // ************************ Guardian Starts *************************//         
	    $(".gi").click(function() {
	        $("#idClient").empty();
	        $("#idClient").load("clientInfo/addGuardian.html");
	        //eidtPage("clientInfo/addContactdetails.html","Edit Client Contact Info ");
	        $("#headIcon").empty();
	        $(".dashboardheading    ").html("");
	        $(".dashboardheading    ").html("Edit Guardian Info");
	        sessionStorage.setItem("PAGE_MODE", "EDIT");
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            heading = "Add Guardian Info";
	            var url = "clientInfo/addGuardian.html";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            heading = "Edit Guardian Info";
	            url = "clientInfo/addGuardian.html";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                heading = "view Guardian Info";
	                url = "clientInfo/addGuardian.html";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }
	        //   url = "clientInfo/addClient.html";
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        //$(".dashboardheading    ").html("Search and List Clients");
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });

	    // ************************ Guardian Ends *************************//

	    // ************************ Guardian contact Starts *************************//         
	    $(".gc").click(function() {
	        $("#idClient").empty();
	        $("#idClient").load("clientInfo/addGuardianContactDetails.html");
	        //eidtPage("clientInfo/addContactdetails.html","Edit Client Contact Info ");
	        $("#headIcon").empty();
	        $(".dashboardheading    ").html("");
	        $(".dashboardheading    ").html("Edit Guardian Contact");
	        sessionStorage.setItem("PAGE_MODE", "EDIT");
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            heading = "Add Guardian Contact";
	            var url = "clientInfo/addGuardianContactDetails.html";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");


	            heading = "Edit Guardian Contact";
	            url = "clientInfo/addGuardianContactDetails.html";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        }
	        //   url = "clientInfo/addClient.html";
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        //$(".dashboardheading    ").html("Search and List Clients");
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });

	    // ************************ Guardian Ends *************************//

	    // ************************ CONTACT DETAILS STARTS *************************//   
	    $(".cd").click(function() {
	        $("#idClient").empty();
	        $("#idClient").load("clientInfo/addContactDetails.html");
	        $("#mandatory-field-msg").show();

	        //eidtPage("clientInfo/addContactdetails.html","Edit Client Contact Info ");
	        $("#headIcon").empty();

	        sessionStorage.setItem("PAGE_MODE", "EDIT");
	        heading = "Add Client Contact";
	        var url = "clientInfo/addContactDetails.html";
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {

	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            $(".dashboardheading    ").html("");
	            $(".dashboardheading    ").html("Edit Client Contact");
	            url = "clientInfo/addContactDetails.html";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("View Client Contact");
	            }
	        }
	        //   url = "clientInfo/addClient.html";
	        // $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        //$(".dashboardheading    ").html("Search and List Clients");
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        //$("#addRecord").removeClass('btn_Disabled');
	        $("#addRecord").addClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ CONTACT DETAILS ENDS ***********************    

	    // ************************ LIFE EXPECTANCY STARTS *************************// 
	    $(".le").click(function() {
	        $("#idClient").empty();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "viewLifeExpList/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addClientLifeExpectancy.html";
	                    addPage(addURL, "Add Life Expectancy");
	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");

	                }
	            } else {
	                sessionStorage.setItem("LIFE_EXPECTANCY_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewLifeExpectancy.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Life Expectancy ");
	            }
	        }


	        $("#headIcon").empty();
	        var heading = "   Add Life Expectancy";
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {

	            var url = "clientInfo/addClientLifeExpectancy.html";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/editLifeExpectancy.html";
	            heading = "   Edit Life Expectancy";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {

	                heading = "View Life Expectancy";
	                url = "clientInfo/editLifeExpectancy.html";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }
	        //     url = "clientInfo/addClient.html";
	        // $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        //$('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ LIFE EXPECTANCY ENDS *************************// 


	    /**********************************************************************************/
	    /*****************************UNDER INCOME & EXPENSES LINK *************************/
	    /**********************************************************************************/

	    // ************************ FAMILY INCOME STARTS *************************// 
	    $(".fai").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        $("#mandatory-field-msg").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");

	        serviceurl = "familyIncome/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var pageUrl = "clientInfo/addFamilyIncome.html";
	                    addPage(pageUrl, "Add Family Income");
	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");

	                }
	            } else {
	                sessionStorage.setItem("INCOME_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewFamilyIncome.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading").html("Family Income");
	            }
	        }

	        $("#headIcon").empty();
	        var url = "clientInfo/addFamilyIncome.html";
	        var heading = "Add Family Income";


	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/editFamilyIncome.html";
	            heading = "Edit  Family Income";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                url = "clientInfo/editFamilyIncome.html";
	                heading = "View Family Income Details";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");

	            }
	        }
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            //   url = "clientInfo/viewFamilyIncome.html";
	            //   heading="View Family Income";
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");

	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ FAMILY INCOME ENDS *************************// 


	    // ************************ HOUSEHOLD EXPENSE STARTS *************************// 
	    $(".he").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        $("#mandatory-field-msg").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        console.log("Client Id in expense: " + selectedClientId);
	        serviceurl = "expense/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.expenseAmount == 0) {
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var pageUrl = "clientInfo/addHouseholdExpense.html";
	                    addPage(pageUrl, "Add Household Expense");
	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");
	                }
	            } else {
	                sessionStorage.setItem("EXPENSE_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewHouseholdExpense.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading").html("Household Expense");
	            }
	        }

	        $("#headIcon").empty();
	        var url = "clientInfo/addHouseholdExpense.html";
	        var heading = "Add Household Expense";

	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/editHouseholdExpense.html";
	            heading = "Edit Household Expense";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                url = "clientInfo/editHouseholdExpense.html";
	                heading = "View Household Expense Details";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");

	            }
	        }
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            //  url = "clientInfo/viewHouseholdExpense.html";
	            //  heading="View Household Expense";
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");

	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ HOUSEHOLD EXPENSE ENDS *************************// 


	    /**********************************************************************************/
	    /***************************** LOAN AND LIABILITIES LINK *************************/
	    /**********************************************************************************/

	    // ************************ LOAN AND LIABILITIES STARTS *************************// 
	    $(".activeloans").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        $("#mandatory-field-msg").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "clientLoan/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {

	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addLoansandLiabilities.html";
	                    addPage(addURL, "Add Loans and Liabilities");
	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");

	                }
	            } else {
	                sessionStorage.setItem("LOAN_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewLoansandLiabilities.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Loans and Liabilites");
	            }
	        }

	        $("#headIcon").empty();

	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            url = "clientInfo/addLoansandLiabilities.html";
	            heading = "Add Loans And Liabilities";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/addLoansandLiabilities.html";
	            heading = "Edit Loans And Liabilities";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                url = "clientInfo/addLoansandLiabilities.html";
	                heading = "View Loan Details";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");

	            }
	        }
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");

	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");

	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************  LOAN AND LIABILITIES ENDS *************************// 

	    /**********************************************************************************/
	    /***************************** PORTFOLIO AND OTHER ASSETS LINK *************************/
	    /**********************************************************************************/


	    // ************************ MF/PMS/ETF STARTS *************************// 
	    $(".mfpms").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "clientFund/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {

	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addFund.html";
	                    addPage(addURL, "Add MF/ETF/PMS");
	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");

	                }
	            } else {
	                sessionStorage.setItem("FUND_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewFunds.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading").html("MF/PMS/ETF");
	            }
	        }

	        $("#headIcon").empty();

	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            url = "clientInfo/addFund.html";
	            heading = "Add MF/PMS/ETF";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/addFund.html";
	            //heading="Edit  MF/PMS/ETF";
	            //$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\""+url+"\",\""+heading+"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                $(".dashboardheading    ").html("");
	                url = "clientInfo/addFund.html";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");

	            }
	        }
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            //   url = "clientInfo/addClient.html";
	            url = "clientInfo/viewFunds.html";
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");

	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");

	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************  MF/PMS/ETF ENDS *************************// 

	    // ************************ EQUITY STARTS *************************// 
	    $(".eqt").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");

	        serviceurl = "clientEquity/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addEquity.html";
	                    addPage(addURL, "Add Direct Equity");
	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");

	                }
	            } else {
	                sessionStorage.setItem("EQUITY_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewEquity.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading").html("Direct Equity");
	            }
	        }

	        $("#headIcon").empty();

	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            url = "clientInfo/addEquity.html";
	            heading = "Add Direct Equity";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/addEquity.html";
	            heading = "Edit Direct Equity";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	            //$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\""+url+"\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                $(".dashboardheading    ").html("");
	                url = "clientInfo/addEquity.html";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");

	            }
	        }
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            //   url = "clientInfo/addClient.html";
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");

	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ EQUITY ENDS ************************// 

	    // ************************ FIXED INCOME STARTS *************************// 
	    $(".fixedi").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");

	        serviceurl = "clientFixedIncome/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var pageUrl = "clientInfo/addFixedIncome.html";
	                    addPage(pageUrl, "Add Deposits/Bonds");
	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");

	                }
	            } else {

	                sessionStorage.setItem("FIXED_INCOME_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewFixedIncome.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Deposits/Bonds");
	            }
	        }

	        $("#headIcon").empty();

	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            url = "clientInfo/addFixedIncome.html";
	            heading = "Add Deposits/Bonds";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/addFixedIncome.html";
	            //"clientInfo/editFixedIncome.html";
	            heading = "Edit Fixed Income";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	            //$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\""+url+"\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                $(".dashboardheading    ").html("");
	                url = "clientInfo/addFixedIncome.html";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");

	            }
	        }
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");

	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");

	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ FIXED INCOME ENDS *************************// 

	    // ************************ RETIREMENT STARTS *************************// 
	    $(".retirement").click(function() {
	        $("#idClient").empty();

	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "/viewROSList/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addROSHeader.html";
	                    addPage(addURL, "Add Retirement Oriented Scheme");
	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");

	                }

	            } else {
	                sessionStorage.setItem("RETIREMENT_SCHEMES_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewRetirementScheme.html");
	                $(".dashboardheading").html("");
	                $(".dashboardheading").html("Retirement Oriented Scheme");
	            }
	        }

	        $("#headIcon").empty();
	        // url = "clientInfo/addClient.html";
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            heading = "Add Retirement Oriented Scheme";
	            url = "clientInfo/addROSHeader.html";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");
	            url = "clientInfo/addRetirementScheme.html";
	            heading = "Edit Retirement Oriented Schemes";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	            //$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\""+url+"\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");

	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                url = "clientInfo/addRetirementScheme.html";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRowMember()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ RETIREMENT ENDS *************************// 

	    // ************************ SMALL SAVINGS STARTS *************************// 
	    $(".smallsvng").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "clientSmallSaving/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addSmallSavingScheme.html";
	                    addPage(addURL, "Add Small Savings Scheme");
	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");

	                }
	            } else {
	                sessionStorage.setItem("SMALL_SAVINGS_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewSmallSavingScheme.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Small Savings Scheme");
	            }
	        }

	        $("#headIcon").empty();
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            url = "clientInfo/addSmallSavingScheme.html";
	            heading = "Add Small Savings Scheme";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/addSmallSavingScheme.html";
	            //url = "clientInfo/editAlternateinvestments.html";
	            heading = "Edit Small Savings Scheme";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	            //$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\""+url+"\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                $(".dashboardheading    ").html("");
	                url = "clientInfo/addSmallSavingScheme.html";
	                heading = "View Small Savings Scheme";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }
	        // url = "clientInfo/viewLifeinsurance.html";
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");

	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ SMALL SAVINGS ENDS *************************// 


	    // ************************ ALTERNATE INVESTMENT STARTS *************************// 
	    $(".altinvest").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();

	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "viewAlternateInvestmentsList/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {

	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addAlternateInvestmentHeader.html";
	                    addPage(addURL, "Add Alternate Investment");
	                } else {
	                    //$("#idClient").load("../authorisationErrorPage.html");
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");
	                    //$("p:contains('Error')").hide();

	                }
	            } else {
	                sessionStorage.setItem("ALTERNATE_INVESTMENT_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewAlternateInvestment.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Alternate Investment");
	            }
	        }

	        $("#headIcon").empty();
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            url = "clientInfo/addAlternateInvestmentHeader.html";
	            url = "clientInfo/addAlternateInvestment.html";
	            heading = "Add Alternate Investment";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/addAlternateInvestment.html";
	            heading = "Edit  Alternate Investment";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	            //$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\""+url+"\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                url = "clientInfo/addAlternateInvestment.html";
	                heading = "View Alternate Investment";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");

	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ ALTERNATE INVESTMENT ENDS *************************// 


	    // ************************ CASH STARTS *************************// 
	    $(".cash").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");

	        //for all client and advisor user
	        serviceurl = "clientCash/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                //if client or advisor has access for Add/Edit or not
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) ||
	                    ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null &&
	                        loggedClient.clientInfoAddEdit === "Y"))) {

	                    var addURL = "clientInfo/addCash.html";
	                    addPage(addURL, "Add Cash");

	                } else {
	                    //$("#idClient").load("../authorisationErrorPage.html");
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");
	                    //$("p:contains('Error')").hide();


	                }
	            } else {
	                sessionStorage.setItem("CASH_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewCash.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading").html("Cash");
	            }
	        }

	        $("#headIcon").empty();
	        var url = "clientInfo/addCash.html";
	        var heading;
	        //if  Add/Edit access present
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) ||
	            ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null &&
	                loggedClient.clientInfoAddEdit === "Y"))) {

	            heading = "Add Cash";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' " +
	                "onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;" +
	                "margin-right:6px' title='Add'/>");

	            heading = "Edit  Cash";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' " +
	                "onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;" +
	                "margin-right:6px' title='Edit'/>");

	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) ||
	                ((loggedClient != null) && (loggedClient.clientInfoView != null &&
	                    loggedClient.clientInfoView === "Y"))) {

	                heading = "View Cash Details";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' " +
	                    "onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;" +
	                    "margin-right:6px' title='View Details'/>");

	            }
	        }

	        //if  Delete access present
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) ||
	            ((loggedClient != null) && (loggedClient.clientInfoDelete != null &&
	                loggedClient.clientInfoDelete === "Y"))) {

	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' " +
	                "onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");

	        }
	        //   url = "clientInfo/addClient.html";




	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************CASH ENDS *******************************// 

	    // ************************ LUMPSUM STARTS *************************// 
	    $(".lumpflow").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "clientLumpsum/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                //if client or advisor has access for Add/Edit or not
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addLumpsum.html";
	                    addPage(addURL, "Add Lumpsum Inflows");

	                } else {
	                    //$("#idClient").load("../authorisationErrorPage.html");
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");
	                    //$("p:contains('Error')").hide();


	                }

	            } else {
	                sessionStorage.setItem("LUMPSUM_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewLumpsum.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading").html("Lumpsum");
	            }
	        }

	        $("#headIcon").empty();
	        var url = "clientInfo/addLumpsum.html";
	        var heading = "Add Lumpsum";
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            heading = "Edit  Lumpsum";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                heading = "View Lumpsum Details";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }

	        //if  Delete access present
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {

	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");
	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ LUMPSUM ENDS *************************//

	    /**********************************************************************************/
	    /***************************** INSURANCE LINK *************************/
	    /**********************************************************************************/


	    // ************************ LIFE INSURANCE STARTS *************************//
	    $(".lifeins").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "clientLifeInsurance/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                //if client or advisor has access for Add/Edit or not
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addLifeInsurance.html";
	                    addPage(addURL, "Add Life Insurance");

	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");
	                }
	            } else {
	                sessionStorage.setItem("LIFE_INSURANCE_LIST", JSON.stringify(data));
	                $(".dashboardheading    ").html();
	                $(".dashboardheading    ").html("Life Insurance");
	                $("#idClient").load("clientInfo/viewLifeInsurance.html");
	            }
	        }

	        $("#headIcon").empty();
	        var heading = "Add Life Insurance";
	        var url = "clientInfo/addLifeInsurance.html";
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            heading = "Edit Life Insurance";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                heading = "View Life Insurance Details";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }

	        //if  Delete access present
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");

	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });

	    // ************************ LIFE INSURANCE ENDS *************************//    

	    // ************************NON LIFE INSURANCE STARTS *************************//
	    $(".nonlifeins").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "/clientNonLifeInsurance/client/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length == 0) {
	                //if client or advisor has access for Add/Edit or not
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	                    var addURL = "clientInfo/addNonLifeInsurance.html";
	                    addPage(addURL, "Add Non-life Insurance");

	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");
	                }
	            } else {
	                sessionStorage.setItem("NONLIFE_INSURANCE_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewNonLifeInsurance.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Non-life Insurance");
	            }
	        }

	        $("#headIcon").empty();

	        var url = "clientInfo/addNonLifeInsurance.html";
	        var heading = "Add Non-life Insurance";
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            heading = "Edit Non-life Insurance";
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                heading = "View Non-life Insurance Details";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }

	        //if  Delete access present
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");

	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });
	    // ************************ NON LIFE INSURANCE ENDS *************************//

	    /**********************************************************************************/
	    /***************************** GOAL LINK *************************/
	    /**********************************************************************************/

	    // ************************GOAL STARTS *************************//
	    $(".goaladd").click(function() {
	        console.log("ffff");
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "clientGoalList/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length === 0) {
	                //if client or advisor has access for Add/Edit or not
	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {

	                    var pageUrl = "clientInfo/addGoalHeader.html";
	                    addPage(pageUrl, "Add Goals");


	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");
	                }
	            } else {
	                sessionStorage.setItem("GOAL_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/viewGoal.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Goal");
	            }
	        }

	        $("#headIcon").empty();
	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            url = "clientInfo/addGoalHeader.html";
	            heading = "Add Goal";
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            url = "clientInfo/addGoalHeader.html";
	            heading = "Edit Goal";
	            //$("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\""+url+"\",\"\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPageGoal()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Edit'/>");
	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                url = "clientInfo/addGoalHeader.html";
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPageGoal(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }

	        //if  Delete access present
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Delete'/>");
	        }
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");

	        $("#addRecord").removeClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');
	    });


	    // ************************GOAL END *************************//
	    // ************************Goal Priority start *************************//
	    $(".goalpriority").click(function() {
	        console.log("ffff");
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        serviceurl = "clientGoalList/" + selectedClientId;
	        getClientData("GET", "", serviceurl, onSuccess);

	        function onSuccess(data) {
	            if (data.length != 0) {
	                sessionStorage.setItem("GOAL_LIST", JSON.stringify(data));
	                $("#idClient").load("clientInfo/setGoalPriority.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Goals Priority");
	            } else {
	                $("#idClient").load("clientInfo/addGoalHeader.html");
	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Add Goal");
	            }
	        }


	        $("#headIcon").empty();


	    });
	    // ************************Goal Priority End *************************//

	    /*		$(".sum").click(function(){
	    		 $("#idClient").empty();
	    		 $("#idClient").load("clientInfo/viewSummary.html");
	    		 $(".dashboardheading").html("Summary");
	    		 $("#wrapper").css("height","auto");
	    		 $(".form-section-container").css("height","auto");
	    		 $('.deleteicon').addClass('btn_Disabled');
	    		});

	    		$(".exi").click(function(){
	    		 $("#idClient").empty();
	    		 $("#idClient").load("clientInfo/viewExistingclient.html");
	    		 $(".dashboardheading").html("Existing Client");
	    		 $("#wrapper").css("height","auto");
	    		 $(".form-section-container").css("height","auto");
	    		 $('.deleteicon').addClass('btn_Disabled');
	    		});

	    		$(".add").click(function(){
	    		 $("#idClient").empty();
	    		 $("#idClient").load("clientInfo/addClient.html");
	    		 $(".dashboardheading").html("Add Client Personal Info");
	    		 $("#wrapper").css("height","auto");
	    		 $(".form-section-container").css("height","auto");
	    		 $('.deleteicon').addClass('btn_Disabled');
	    		});
	    */

	    // ************************RISK PROFILE START*************************//

	    $(".ciriskprofile").click(function() {
	        $("#idClient").empty();
	        $("#deleteMessage").hide();
	        selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	        var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	        var loggedClient;
	        if (loggedUser == null) {
	            loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	        } else {
	            loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	        }
	        if (loggedUser != null) {
	            loggedUserId = loggedUser.advisorMasterId;
	            serviceurl = "getRiskProfile/" + selectedClientId + "/" + loggedUserId;
	        } else {
	            loggedUserId = loggedClient.advisorMasterID;
	            serviceurl = "getRiskProfile/" + selectedClientId + "/" + loggedUserId;
	        }
	        getClientData("GET", "", serviceurl, onRiskProfileNameSuccess);

	        function onRiskProfileNameSuccess(data) {

	            //	console.log("data.riskProfileScore "+data.riskProfileScore);
	            if (data.riskProfileScore == null) {

	                if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {

	                    var pageUrl = "clientInfo/addRiskProfile.html";
	                    addPage(pageUrl, "Risk Profile");


	                } else {
	                    addPage("clientInfo/authorisationErrorPage.html", "Access Denied");
	                }

	            } else {
	                sessionStorage.setItem("RiskProFile_LIST", JSON.stringify(data));
	                $("#idClient").empty();
	                $("#idClient").load("clientInfo/viewRiskProfile.html");


	                $(".dashboardheading    ").html("");
	                $(".dashboardheading    ").html("Risk Profile");
	                $("#addRecord").addClass('btn_Disabled');
	                $('#editRecord').addClass('btn_Disabled');
	                $('#deleteRecord').addClass('btn_Disabled');

	            }
	        }

	        //$("#idClient").load("clientInfo/viewRiskProfile.html");
	        var url = "clientInfo/addRiskProfile.html";
	        var heading = "Risk Profile";
	        $("#headIcon").empty();

	        //url = "clientInfo/viewRiskProfile.html";

	        if (((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/add-icon.png'id='addRecord' onClick='addPage(\"" + url + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	            $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='edit'/>");

	        } else {
	            //if  view access present and add/Edit not present then edit button will be named as view details
	            if (((loggedUser != null) && (loggedUser.clientInfoView != null && loggedUser.clientInfoView === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoView != null && loggedClient.clientInfoView === "Y"))) {
	                $("#headIcon").append("<img src='../Common/assets/images/edit-icon.png'id='editRecord' onClick='editPage(\"" + url + "\",\"" + heading + "\")' style='width:23px;margin-top:-2px;margin-right:6px'  title='View Details'/>");
	            }
	        }

	        //if  Delete access present
	        if (((loggedUser != null) && (loggedUser.clientInfoDelete != null && loggedUser.clientInfoDelete === "Y")) || ((loggedClient != null) && (loggedClient.clientInfoDelete != null && loggedClient.clientInfoDelete === "Y"))) {
	            $("#headIcon").append("<img src='../Common/assets/images/delete-icon.png' id='deleteRecord' onClick='deleteRow()' style='width:23px;margin-top:-2px;margin-right:6px'  title='Add'/>");

	        }
	        $(".dashboardheading    ").html("Risk Profile Questionnaire");
	        $("#wrapper").css("height", "auto");
	        $(".form-section-container").css("height", "auto");

	        /*$("#addRecord").addClass('btn_Disabled');
	        $('#editRecord').addClass('btn_Disabled');
	        $('#deleteRecord').addClass('btn_Disabled');*/
	    });

	    // ************************RISK PROFILE END*************************//
	});

	function openPage(path, heading) {
	    //alert("Heading In open Page" +heading);
	    //alert("Heading In open Page" + path);

	    selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	    if (selectedClientId != 0 && selectedClientId != null && selectedClientId != 'udefined') {
	        getClientData("GET", "", "clientMaster/" + selectedClientId, onAgeSuccess);

	        function onAgeSuccess(data) {
	            console.log("data.age " + data.age)
	            if (data.age > 18) {
	                $('#idGuardian').hide();
	                $('#idGuardianContact').hide();
	            } else {
	                $('#idGuardian').show();
	                $('#idGuardianContact').show();
	            }
	        }
	    }

	    $("#idClient").empty();
	    $(".dashboardheading").html("");
	    $("#idClient").load(path);
	    $("#page-content-wrapper").css("height", "auto");
	    $(".form-section-container").addClass("height1257px");
	    $(".nonload").css("display", "block");
	    $("#top-nav-bar").show();
	    $(".top-nav-items").show();
	    $(".displayonload").hide();
	    $("#headIcon").empty();
	    $(".dashboardheading    ").html(heading);
	    $("#mandatory-field-msg").hide();


	}
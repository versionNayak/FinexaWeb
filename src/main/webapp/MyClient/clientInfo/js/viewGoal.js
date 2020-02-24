var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}

$(document).ready(function (event) {
	
	/*//new code for access rights
	if(loggedClient.role === "Client"){
		if(loggedClient.clientInfoAddEdit === "Y"){
			$("#idSaveGoal").show();
			$("#undo").show();
		}else if(loggedClient.clientInfoView === "Y"){
			alert("new");
			$("#idSaveGoal").hide();
			$("#undo").hide();
		}
	}else if(loggedUser.role === "Admin"){
		$("#idSaveGoal").hide();
		$("#undo").hide();
	}else{
		if(loggedUser.clientInfoAddEdit === "Y"){
			$("#idSaveGoal").show();
			$("#undo").show();
		}else if(loggedUser.clientInfoView === "Y"){
			$("#idSaveGoal").hide();
			$("#undo").hide();
		}
	}*/
	
    initRowHandlers();
    Selected_Client = JSON.parse(sessionStorage.getItem("SELECTED_CLIENT_ID"));
    sessionStorage.setItem("CLIENT_SERVICE_URL", ClientServiceUrl);
    var data = JSON.parse(sessionStorage.getItem("GOAL_LIST"));
    var startMonthYear;
    $("#idGoalList").empty();
    $.each(data, function (index, goal) {
        if (goal.lookupGoalTypeName == "Retirement") {
            //alert("changed bdate: "+ sessionStorage.getItem("CHANGED_BIRTH_DATE"));
            if (sessionStorage.getItem("CHANGED_BIRTH_DATE") != null) {
                if (sessionStorage.getItem("CHANGED_BIRTH_DATE") != sessionStorage.getItem("OLD_BIRTH_DATE")) {
                    var serviceUrl = "clientGoal/getAgePlusRetirementAge/" + sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
                    getClientDataAsyncFalse("GET", "", serviceUrl,onSuccessAgePlusRetirementage);
                    function onSuccessAgePlusRetirementage(data) {
                        //	console.log("data "+data);
                        //	console.log("data.dt "+data.startMonthYear);
                        startMonthYear=moment(data.startMonthYear,'YYYY-MM-DD').format('MMM-YYYY');
                    }
                } else {
                    startMonthYear = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMM-YYYY');
                }
            } else {
                startMonthYear = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMM-YYYY');
            }

        } else {
            startMonthYear = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMM-YYYY');
        }
        $("#idGoalList").append('<tr>' +
            '<td>' + goal.lookupGoalTypeName + '</td>' +
            '<td>' + goal.description + '</td>' +
            '<td>' + goal.priority + '</td>' +
            '<td>' + (goal.startMonthYear==null?"":startMonthYear) + '</td>' +
            '<td class="hidden"><input type="text" id="idgoalTypeName" name="goalTypeName"  value=' + goal.lookupGoalTypeName + ' readonly="readonly"></td>' +
            '<td class="hidden"><input type="text" id="idgoalTypeId" name="goalTypeId"  value=' + goal.lookupGoalTypeId + ' readonly="readonly"></td>' +
            '<td class="hidden"><input type="text" id="idgoalId" name="goalId"  value=' + goal.id + ' readonly="readonly"></td>' +
            '</tr>');
    });

    $("#idGoalList").on("click", "tr", function (e) {
        //console.log("Table row selected ");
        addRowHandlers();
        sessionStorage.removeItem("SELECTED_GOAL_ID");
        sessionStorage.setItem("SELECTED_GOAL_ID", $(this).find('#idgoalId').val());
        sessionStorage.setItem("SELECTED_GOAL_TYPE", $(this).find('#idgoalTypeId').val());
        //console.log('Goal Type Name: '+$(this).find('#idgoalTypeName').val());
        console.log('Goal Type ID: '+sessionStorage.getItem("SELECTED_GOAL_TYPE"));
        $(this).addClass("selected").siblings().removeClass("selected");
        $("#idGoalList tr:nth-child(0)").removeClass("selected");
        //console.log("id "+sessionStorage.getItem("goal_ID"));
    });
});

function confirmationClick(){
    $('#myModal').modal('hide');
    console.log("path "+sessionStorage.getItem("CLIENT_SERVICE_URL") + 'clientGoal/delete/'+sessionStorage.getItem("SELECTED_GOAL_ID"));
    deleteSelectedRecord(sessionStorage.getItem("CLIENT_SERVICE_URL") + 'clientGoal/delete/'+sessionStorage.getItem("SELECTED_GOAL_ID"));
    getClientData("GET", "","clientGoalList/"+ Selected_Client, onSuccess);
    function onSuccess(data) {
        if(data.length===0)
        {
            
            if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
            	var pageUrl ="clientInfo/addGoalHeader.html";
                addPage(pageUrl);
					}else{
						 openPage("clientInfo/authorisationErrorPage.html","Access Denied");
				
					}
        }else{
            sessionStorage.setItem("GOAL_LIST", JSON.stringify(data));
            $("#idClient").empty();
            $("#idClient").load("clientInfo/viewGoal.html");
            $(".dashboardheading    ").html("");
            $(".dashboardheading    ").html("Goal");
            $("#addRecord").removeClass('btn_Disabled');
            $('#editRecord').addClass('btn_Disabled');
            $('#deleteRecord').addClass('btn_Disabled');
            bootbox.alert("Please check your Goal Priority List. You can update the priorities if needed");
        }
    }
}

function editPageGoal() {
	
    var pageURL;
    var goaltypename;
    var message;
    var goaltypeId = sessionStorage.getItem("SELECTED_GOAL_TYPE");
    console.log("In editPageGoal() Goal Type Selected: "+goaltypeId);
    if((loggedUser != null && loggedUser.clientInfoAddEdit === "Y") || (loggedClient != null && loggedClient.clientInfoAddEdit === "Y")){
    	message = "Edit Goal-";
	}else if((loggedUser != null && loggedUser.clientInfoView === "Y") || (loggedClient != null && loggedClient.clientInfoView === "Y")){
		message = "View Goal-";
	} 
    switch (goaltypeId) {
        case "1":
            goaltypename="Education";
            pageURL = "clientInfo/addGoalNonRetirementRecurring.html";
            editPage(pageURL,message + goaltypename);
            break;
        case "6":
            goaltypename="Vacation";
            pageURL = "clientInfo/addGoalNonRetirementRecurring.html";
            editPage(pageURL,message + goaltypename);
            break;
        case "7":
            goaltypename="Starting a business";
            pageURL = "clientInfo/addGoalNonRetirementRecurring.html";
            editPage(pageURL,message + goaltypename);
            break;
        case "9":
            goaltypename="Other";
            pageURL = "clientInfo/addGoalNonRetirementRecurring.html";
            editPage(pageURL,message + goaltypename);
            break;
        case "2":
            goaltypename="Wedding";
            pageURL = "clientInfo/addGoalNonRetirementNonRecurring.html";
            editPage(pageURL,message + goaltypename);
            break;
        case "3":
            goaltypename="Buying a House";
            pageURL = "clientInfo/addGoalNonRetirementNonRecurring.html";
            editPage(pageURL,message + goaltypename);
            break;
        case "4":
            goaltypename="Buying a Car";
            pageURL = "clientInfo/addGoalNonRetirementNonRecurring.html";
            editPage(pageURL,message + goaltypename);
            break;
        case "5":
            goaltypename="Buying Jewellery";
            pageURL = "clientInfo/addGoalNonRetirementNonRecurring.html";
            editPage(pageURL,message + goaltypename);
            break;
        case "8":
            goaltypename="Retirement";
            pageURL = "clientInfo/addGoalRetirement.html";
            editPage(pageURL,message + goaltypename);
    }
}
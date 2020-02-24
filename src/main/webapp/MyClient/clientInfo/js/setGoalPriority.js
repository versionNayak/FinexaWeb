var err;
var objGoal=[];
var l;
$(document).ready(function(event) {
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
	
	//new code for access rights
	if(loggedClient != null && loggedClient.role === "Client"){
		if(loggedClient.clientInfoAddEdit === "Y"){
			$("#savePriority").show();
			$("#undo").show();
		}else if(loggedClient.clientInfoView === "Y"){
			$("#savePriority").hide();
			$("#undo").hide();
		}
	}else if(loggedUser != null && loggedUser.role === "Admin"){
		$("#savePriority").hide();
		$("#undo").hide();
	}else{
		if(loggedUser != null && loggedUser.clientInfoAddEdit === "Y"){
			$("#savePriority").show();
			$("#undo").show();
		}else if(loggedUser != null && loggedUser.clientInfoView === "Y"){
			$("#savePriority").hide();
			$("#undo").hide();
		}
	}
	

	sessionStorage.setItem("CLIENT_SERVICE_URL", ClientServiceUrl);
	var data = JSON.parse(sessionStorage.getItem("GOAL_LIST"));
	l=data.length;
	$("#idGoalList").empty();
	var i = 0;
	var startMonthYear;	

	$.each(data, function(index, goal) {
		objGoal.push(goal);
		startMonthYear = moment(goal.startMonthYear,'YYYY-MM-DD').format('MMM-YYYY');
		
		$("#idGoalList").append('<tr>' + '<td>'
							+ goal.lookupGoalTypeName
							+ '</td>'
							+ '<td>'
							+ goal.description
							+ '</td>'
							+ '<td>'
							+ goal.priority
							+ '</td>'
							+ '<td> <select class="form-control input-width-small" name="txt" id="idPriority'
							+ i
							+ '"><option></option></select><td>'
							+ (goal.startMonthYear == null ? "": startMonthYear)
							+ '</td>'
							+ '<td class="hidden"><input type="text" id="idgoalTypeName" name="goalTypename"  value='
							+ goal.lookupGoalTypeName
							+ ' readonly="readonly"></td>'
							+ '<td class="hidden"><input type="text" id="idgoalId" name="goalId"  value='
							+ goal.id
							+ ' readonly="readonly"></td>'
							+ '</tr>');
		
		populateDropdown($("#idPriority"+i),goal.priority);
		i = i + 1;
	});
	
	function populateDropdown(dropdownId,selectedValue){
		dropdownId.find('option').remove();
		dropdownId.append('<option value="" selected>Select Priority</option>');
		
		for(var i=1;i<=l;i++){
/*			if (i == selectedValue) {
				dropdownId.append('<option value="' + i + '" selected>'
								+ i
								+ '</option>');
			} else {
*/				dropdownId.append('<option value="' + i + '" >'
								+ i
								+ '</option>');
//			}
		}
	}

	$("#idGoalList").on("click", "tr", function(e) {
		// console.log("Table row selected ");

		addRowHandlers();
		sessionStorage.removeItem("goal_ID");
		sessionStorage.setItem("goal_ID", $(this).find(
				'#idgoalId').val());
		sessionStorage.setItem("goalTypeName", $(this)
				.find('#idgoalTypeName').val());

		$(this).addClass("selected").siblings()
				.removeClass("selected");
		$("#idGoalList tr:nth-child(0)").removeClass(
				"selected");
		// alert("id "+sessionStorage.getItem("goal_ID"));

	});
});


var brr=[];
var duplicate;
var somePrioritiesAreNull=false;

$("#savePriority").on("click", function(event) {
	err = 0;
	arr = [];
	showLoaderOnSave("#savePriority");
	
	console.log("err "+err);
	var k = 0;
	$.each($("select[name='txt'] option:selected"), function(){ 
		var val2 = $(this).val();
	//	alert(val2);
		objGoal[k].priority = val2;
		k = k + 1;

     });

	for (var i = 0; i < objGoal.length; i++) {
		brr[i]=objGoal[i].priority;
		console.log("arr element" + i + " " + objGoal[i].priority+" "+objGoal[i].id+" "+objGoal[i].lookupGoalTypeName);
	}
	cal1();
	console.log("duplicate " + duplicate);
	
});

function cal1() {
	window.setTimeout(function(){
	var id;
	//var i = 1;
	duplicate = false;
	// iterate through each textboxes and add the values
	for (var i=0; i < objGoal.length; i++) {
		$('#alertform').text("");
		id = "idPriority" + i;
		document.getElementById(id).style.border = "1px solid #ccc";
	}
	 
	for (var i=0; i < (objGoal.length - 1); i++) {
		vPriorityi = objGoal[i].priority;
		//alert("i: " + i + ' Goal Priority[i]: '+vPriorityi);
		if (hasValue(vPriorityi)) {
			console.log("i " + i + " " + objGoal[i].priority);
			for (var j = i + 1; j < objGoal.length; j++) {
				vPriorityj = objGoal[j].priority;
				//alert('Goal Priority j: '+vPriorityj);
				if (hasValue(vPriorityj)) {					
					//alert("j: " + j + " Priority[j]: " + objGoal[j].priority);
					if (objGoal[i].priority == objGoal[j].priority) {
						duplicate = true;
						console.log("same ");
						$('#alertform').text("Duplicate priority. Please correct");
						id = "idPriority" + j;
						console.log("id " + id);
						document.getElementById(id).style.border = "2px solid red";
						err = 1;
					}
				}
				else {
					somePrioritiesAreNull=true;
					id = "idPriority" + j;
					document.getElementById(id).style.border = "2px solid red";								
				}
			}
		}
		else {
			somePrioritiesAreNull=true;
			id = "idPriority" + i;
			document.getElementById(id).style.border = "2px solid red";			
		}		
	}
	
	if (somePrioritiesAreNull==true) {
		$('#alertform').text("Please update new and unique goal priority for all goals");			
	}
	
	if (duplicate==false && somePrioritiesAreNull==false) {
		if (err == 0) {
			for (var i = 0; i < objGoal.length; i++) {
				console.log("final " + i + " index " + objGoal[i].priority+" "+objGoal[i].id+" "+objGoal[i].lookupGoalTypeName);
			}
			var dataList = JSON.stringify(objGoal);
			console.log(dataList);
			getClientData("POST", dataList, "clientGoalList", onSuccess);
			function onSuccess(data) {
				console.log("After Post: " + data);
				serviceurl = "clientGoalList/"+ selectedClientId;
				getClientData("GET", "",serviceurl, onSuccess);		
				function onSuccess(data) {
					sessionStorage.setItem("GOAL_LIST", JSON.stringify(data));
					$("#idClient").empty();
					$("#idClient").load("clientInfo/viewGoal.html");
					$(".dashboardheading    ").html("");
				    $(".dashboardheading    ").html("Goal");							 
					$("#addRecord").removeClass('btn_Disabled');
					$('#editRecord').addClass('btn_Disabled');
					$('#deleteRecord').addClass('btn_Disabled');
				}				
			}
		}
	}
		
	hideLoaderOnSave("#savePriority");
	
	}, 5000);
	
  }


function confirmationClick() {
	$('#myModal').modal('hide');
	console.log("path " + sessionStorage.getItem("CLIENT_SERVICE_URL")
			+ '/clientGoal/delete/' + sessionStorage.getItem("goal_ID"));
	deleteSelectedRecord(sessionStorage.getItem("CLIENT_SERVICE_URL")
			+ '/clientGoal/delete/' + sessionStorage.getItem("goal_ID"));
	getClientData("GET", "", "clientGoalList/" + Selected_Client, onSuccess);

}

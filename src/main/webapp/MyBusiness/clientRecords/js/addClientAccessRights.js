var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var id=loggedUser.id;
var clientId = null;
var name;
var email = [];
var a = [];
var errorAccessRightsAdmin = 0;
var startForClient = 0;
var rowCount = 0;
var columnCount = 0;
var i = 0;
var p;
var access;
var idCount;
var lClients = document.getElementById('idClientsDrop');

$('#idModuleDiv').hide();

$(document).ready(function() {
	
	getClientList();
	//getClientData("GET", "" , "clientMasterList/"+loggedUser.id, onGetDataSuccess);
			  
			  /*$("#idAdvisor").change(function(){
					 clientId = $('#idAdvisor').val();
					 name = a[clientId];
					 document.getElementById('idName').value = name;
					if(clientId > 0) {
						$("#idViewAccessRights").attr("disabled", false);
					} else {
						$("#idViewAccessRights").attr("disabled", true);
					}
				});*/
			  
				$('#idViewAccessRights').click(function(){
					$("#idSubmoduleTable").empty();
					
					/*var lUserName = document.getElementById("idAdvisor");
					var userName = lUserName.options[lUserName.
Index].value;
					lUserName.style.border = "1px solid #ccc";
					document.getElementById('alertUserName').innerHTML="";
					if(!hasValue(userName)){
						document.getElementById('alertUserName').innerHTML="Please select Client ID ";
						lUserName.style.border = "2px solid red";
						errorAccessRightsAdmin = 1;
					}*/
					
					if (clientId == null) {
						document.getElementById('alertUserName').innerHTML="Please select a Client";
						lClients.style.border = "2px solid red";
						errorAccessRightsAdmin = 1;
					} else {
						document.getElementById('alertUserName').innerHTML="";
						lClients.style.border = "1px solid #C0C0C0";
						errorAccessRightsAdmin = 0;
					}
					
					var status = validateAccessRightsForm($('#idFormAccessRight'));
					
					if(status == true && errorAccessRightsAdmin == 0) {
						$("#idViewAccessRights").attr("disabled", true);
						getClientData("GET", "", "findModuleByClient/" + id, onGetModulesSuccess);
						function onGetModulesSuccess(data) {
		
							var tabindexValue = document.getElementById("idViewAccessRights").tabIndex;
							tabindexValue++;
							console.log(data.length);
							$.each(data, function (index, value) {
								access = value.accessRight;
								console.log(access);
								$("#idSubmoduleTable").append('<tr>' +
										'<td id= "idRoleDesc'+rowCount+'">' + access +  '</td>' +
										'<td><input type="checkbox" id = "idCheckbox'+ (columnCount++) +'" value ="'+ access +'View"    tabindex="'+ tabindexValue++ +'"/></td>' +
										'<td style = "display:none;"><input type="checkbox" id = "idCheckbox'+ (columnCount++) +'" value ="'+ access +'AddEdit" tabindex="'+ tabindexValue++ +'"/></td>' +
										'<td style = "display:none;"><input type="checkbox" id = "idCheckbox'+ (columnCount++) +'" value ="'+ access +'Delete"  tabindexValue="'+ tabindexValue++ +'"/></td>' +
								'</tr>');
								 idCount = columnCount;
								    //delete checkbox hide
									if((access == "BudgetManagement") || (access == "GoalPlanning") || (access == "PortfolioManagement") 
											|| (access == "FinancialPlanning") || (access == "Invest") || (access == "ClientRecords") || (access == "MFBackOffice")){
									    idCount = idCount - 1;	
										$("#idCheckbox" +idCount).css('display', 'none');
									}
									// edit checkbox hide
									if((access == "BudgetManagement") || (access == "ClientRecords")){
									    idCount = idCount - 1;
										$("#idCheckbox" +idCount).css('display', 'none');
								   }
									//  checkbox hide depends on advisor admin's access rights
									 if((access !== "BudgetManagement") && (access !== "ClientRecords")){
										    if((access == "ClientInfo")){
										    	idCount = idCount - 1;
										    	if(value.deleteAllowedFlag !== "Y"){
													$("#idCheckbox" +idCount).css('display', 'none');
												}
										    }
										 
										    idCount = idCount - 1;
											if(value.addeditAllowedFlag !== "Y"){
												$("#idCheckbox" +idCount).css('display', 'none');
											}
											if(access != "ClientInfo"){
												idCount = idCount - 1;
												if(value.viewAllowedFlag !== "Y"){
													$("#idCheckbox" +idCount).css('display', 'none');
											     }
											    }
												
										 }
											
									 //clientinfo view always disabled
									 if(access == "ClientInfo"){
											idCount = idCount - 1;	
											if($("#idCheckbox"+idCount).val() == "ClientInfoView"){
												$( "#idCheckbox" +idCount).prop( "disabled", true );
											}
									 }

								});
							
							getClientData("GET", "", "findModuleForClient/" + clientId , onGetExistingModulesSuccess);
							function onGetExistingModulesSuccess(dataUser) {
								var tbl2 = $('#idSubmoduleTable td').each(function(i) {
									console.log("i "+i);
									$.each(dataUser.accessRights, function (index, value) {
						                console.log("value "+value);
						                console.log("val "+$("#idCheckbox"+i).val());
						                
										if (value == $("#idCheckbox"+i).val()) {
											$("#idCheckbox" + i). prop("checked", true);
											return false;
										}
									});
									totalColumn = i;
								});
							
						   }
						}
						$('#idModuleDiv').show();
					}
					
					
				
				});
				$('#idAccessRightSubmit').click(function(){
					//alert("Hi In Submit");
					/*var viewData = { 
							invest : [] 
					};*/
					//if(validateAddEditViewAccessRightsForm($('#idFormAccessRight'))) {
					if(validateCheckBoxForm($('#idFormAccessRight'), totalColumn)) {
						var jsonData = {};
						//jsonData["clientID"] = $("#idAdvisor").val();
						jsonData["clientID"] = clientId;
						var tbl2 = $('#idModuleTable td').each(function(i) {
							//eliminate the header and last incremented value		
							//if (i < (rowCount+1)) {
								var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
								var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
								
								if($("#idCheckbox"+i).is(":checked")){
									//console.log("outside " + $("#idCheckbox"+i).val()+"   "+i);
									
									if ($("#idCheckbox"+i).val() == "ClientInfoView") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["clientInfoView"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "ClientInfoAddEdit") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["clientInfoAddEdit"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "ClientInfoDelete") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["clientInfoDelete"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "BudgetManagementView") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["budgetManagementView"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "GoalPlanningView") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["goalPlanningView"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "GoalPlanningAddEdit") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["goalPlanningAddEdit"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "PortfolioManagementView") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["portfolioManagementView"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "PortfolioManagementAddEdit") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["portfolioManagementAddEdit"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "FinancialPlanningView") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["financialPlanningView"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "FinancialPlanningAddEdit") {
										jsonData["financialPlanningAddEdit"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "MFBackOfficeView") {
										jsonData["mfBackOfficeView"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "InvestView") {
										jsonData["investView"] = 'Y';
									}
									if ($("#idCheckbox"+i).val() == "InvestAddEdit") {
										//console.log("inside" + $("#idCheckbox"+i).val());
										jsonData["investAddEdit"] = 'Y';
									}

								}
								
							//}
						})
					//alert(JSON.stringify(jsonData));
						
						var data = JSON.stringify(jsonData);
						console.log(data);
						saveData("POST", data, "saveAccessRightsForClient", onAddUCCGeneralSuccess);
						function onAddUCCGeneralSuccess(data) {
							
							bootbox.alert("successfully added");
							$("#idBusiness").load("clientRecords/addClientAccessRights.html");
							$(".dashboardheading").html("");
							$(".dashboardheading").html("Access Rights");
						}
						
					}
					
				});
			
				
				
});

function getClientList() {
	loadLoader();
	getClientDataAsyncFalse("GET", "" , "clientMasterListWithpagination/" + id + "/" + startForClient, onGetDataSuccess);
	function onGetDataSuccess(data){
	  	//var moduleDrop = $('#idAdvisor');
	  	//alert(moduleDrop);
		if(data == '') {
			 $('#idSelect').append("<li>No other record Found</li>");
			 hideLoader();
			 return false;
		 } else {
		  	 p = "";
			 $.each(data, function (index, item) {
			 	i ++;
				p = p + "<li id = " + item.id + ">" + item.name + " - " + item.emailId + "</li>";
				email[item.id] = item.emailId;
				a[item.id] = item.name;
		 	 });
			 $('#idSelect').append(p);
		 }
		 hideLoader();
		
		//moduleDrop.find('option').remove();
		//moduleDrop.append('<option value="">Select Users</option>');
		/*$.each(data, function (index, item) {
			moduleDrop.append('<option value="' + item.id + '">' + item.emailId + '</option>');
			a[item.id] = item.name;
		});*/
		
	}
}

/***************************************************/
$("#idClientsDrop").click(function(){
	
	$("#myInput").click(function() {
		//alert(this.id)
		//alert("input click koreche")
		document.getElementById('idSelect').style.display = "block";
		return false;
	});
	
	if (document.getElementById('idSelect').style.display == "none") {
		document.getElementById('idSelect').style.display = "block";
		document.getElementById('myInput').style.display = "block";
	} else {
		document.getElementById('idSelect').style.display = "none";
		document.getElementById('myInput').style.display = "none";
	}
	
});

$(document).on("click","#idClientsDrop li",function(){
	var selText = $(this).text();///User selected value...****
	//if (this.id != "idSearchLi") {
  	$('li:contains('+selText+')').filter(function() {
		    	  return $(this).text() == selText;
		    }).addClass('active');
//  	$("#idClients").text(selText);
//  	$('#idClients').css('color', 'black');
	document.getElementById('myInput').style.display = "none";
	document.getElementById('idSelect').style.display = "none";

	clientId = this.id;
	name = a[clientId];
	$("#idClients").text(email[clientId]);
  	$('#idClients').css('color', 'black');
	document.getElementById('idName').value = name;
	if(clientId > 0) {
		$("#idViewAccessRights").attr("disabled", false);
	} else {
		$("#idViewAccessRights").attr("disabled", true);
	}
});

$('#idSelect').scroll(function () {
    if ($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight()) {
          //alert("end of scroll");
    	  startForClient = startForClient + 1;
          if ($('#idSelect li:last-child').text() != "No other record Found") {
	            //getClientData("GET", "" , "clientMasterListWithpagination/" + loggedInUser + "/" + startForClient, onGetDataSuccess);
	       	 	loadLoader();
	       	 	//$.ajax({});
	       	 	getClientList();
          }
    }
	//alert ("scroll")
});

$("#myInput").on("keyup", function() {
    var matchString = $(this).val();
    //alert(matchString)
    if (matchString != "") {
    	getClientData("GET", "" , "searchClientsByEmailDynamically/" + id + "/" + matchString, onSearchSuccess);
    }
    else {
    	$('#idSelect').empty();
    	//getClientData("GET", "" , "showUserWithPagination/" + 0, onGetDataSuccess);
   	 	loadLoader();
   	    startForClient = 0;
   	    getClientList();
    }
});

function onSearchSuccess(data) {
	if(data == '') {
		 $('#idSelect').empty();
		 hideLoader();
		 return false;
	 } else {
		 $('#idSelect').empty();
		 p = "";
		 $.each(data, function (index, item) {
		 	i ++;
			p = p + "<li id = " + item.id + ">" + item.emailId + "</li>"
	 	});
	 $('#idSelect').append(p);
	 }
}

		  
selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var loggedUser;
var client;
$(document).ready(function (event) {
		loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		//console.log("loggedUser "+loggedUser.id);
		serviceurl = "clientMasterList/"+loggedUser.id;
		//serviceurl = "clientMasterList/"+1 ;
		
		getClientData("GET", "", serviceurl, onSuccess);
		function onSuccess(data) {
			//console.log("Return data = " + data);
			//console.log("Client list: " + JSON.stringify(data));
			var dataCount = 0;
			var divContainer = "";
			var pageCount = 1;

			//dataTbale creation
			//==================
			$('#idTable').dataTable();
			$('#idTable').dataTable().fnDestroy();
			$("#idClientList").empty();
			
			$.each(data, function (index, client) {
				
				//console.log("retirementStatus: " + client.retirementStatus);
				var middle;
				if (client.middleName == null) {
					middle = " ";
				} else {
					if (client.middleName != null) {
						middle = client.middleName;
					}
				}
				//dataTable implementation
				//==========================
				$("#idClientList").append('<tr onclick="goToEditClient(\'' + client.id + '\', \'' + client.firstName + ' ' + client.lastName + '\', \'' + client.emailId + '\', \'' + client.mobile + '\', \'' + client.retirementStatus + '\',this.id,\'' + client + '\')" id="'+client.id+'" ondblclick="goToClient(\'' + client.id + '\', \'' + client.firstName + ' ' + client.lastName + '\', \'' + client.emailId + '\', \'' + client.mobile + '\', \'' + client.retirementStatus + '\',\'' + client + '\')">'+
						'<td>'+ client.salutation + ' ' + client.firstName + ' ' + middle + ' ' + client.lastName +'</td>'+
						'<td>'+ client.emailId +'</td>'+
						'<td>'+ client.mobile +'</td>'+
						'</tr>');
			
			});
			
			//=====dataTable styling=====
			$('#idTable').dataTable(
					{
						
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						//"pageLength": 10,
						"pagingType": "full_numbers"
						
					}
			);
			$('#idTable_paginate').css('margin-left',-100);
			//=========================================
			
		}
		
});	

$("#idTable tr").click(function(){
	   $(this).addClass('selected').siblings().removeClass('selected');    
	   var value=$(this).find('td:first').html();
	   //alert(value);    
	});

//double-click functionality added
function goToClient(idclientId,idclientName,idclientEmail,idclientMobile,idclientRetirementStatus,client) {
	//alert("double click ="+idclientId+ ","+idclientName+ ","+idclientEmail+ ","+idclientMobile+ ","+idclientRetirementStatus);
	addRowHandlers();
	$("#profile").show();

	sessionStorage.setItem("LOGGED_IN_CLIENT", client);
	sessionStorage.setItem("SELECTED_CLIENT_ID", idclientId);
	sessionStorage.setItem("SELECTED_CLIENT_NAME", idclientName);
	sessionStorage.setItem("SELECTED_CLIENT_EMAIL", idclientEmail);
	sessionStorage.setItem("SELECTED_CLIENT_MOBILE", idclientMobile);
	sessionStorage.setItem("SELECTED_CLIENT_RETIREMENT_STATUS", idclientRetirementStatus);
	
	$("#idSelectedClientName").text(idclientName);
	// vClientId set to be use in Goal Planing and Budget management
	vClientId = idclientId;
	//currinst.addClass("selected");
	 //$(this).addClass("selected").siblings().removeClass("selected"); 
	 
	 if (vClientId==null || vClientId=="") { 
	        $(".dashboardheading    ").html("Search and List Clients");
			$("#idClient").load("clientInfo/viewClient.html");
			$("#mandatory-field-msg").hide();
		}
		else {
			/*gourab*/
			//editPage("clientInfo/addClient.html","Edit Client Personal Info");
			/*gourab*/

			openPage("clientInfo/clientDashboard.html","Client Dashboard"); //click Client Info and enter dashboard page
		    $(window).scrollTop(0);
		}
	

}

function goToEditClient(idclientId,idclientName,idclientEmail,idclientMobile,idclientRetirementStatus,currinst,client) {
	//alert("double click ="+idclientId+ ","+idclientName+ ","+idclientEmail+ ","+idclientMobile+ ","+idclientRetirementStatus);
	addRowHandlers();
	console.log(JSON.stringify(client));
	console.log(client)
	sessionStorage.setItem("SELECTED_CLIENT_ID", idclientId);
	sessionStorage.setItem("SELECTED_CLIENT_NAME", idclientName);
	sessionStorage.setItem("SELECTED_CLIENT_EMAIL", idclientEmail);
	sessionStorage.setItem("SELECTED_CLIENT_MOBILE", idclientMobile);
	sessionStorage.setItem("SELECTED_CLIENT_RETIREMENT_STATUS", idclientRetirementStatus);
	sessionStorage.setItem("LOGGED_IN_CLIENT",client);


	$("#idSelectedClientName").text(idclientName);
	// vClientId set to be use in Goal Planing and Budget management
	vClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	//currinst.addClass("selected");
	$("#"+currinst).addClass("selected").siblings().removeClass("selected"); 
	 
	 if (vClientId==null || vClientId=="") { 
	        $(".dashboardheading    ").html("Search and List Clients");
			$("#idClient").load("clientInfo/viewClient.html");
			$("#mandatory-field-msg").hide();
		}
}

function openPage(path,heading) {
		//alert(heading);
	
	selectedClientId = 	sessionStorage.getItem("SELECTED_CLIENT_ID");
	//alert(selectedClientId);
	if (selectedClientId != 0 && selectedClientId != null && selectedClientId != 'udefined')
	{
		getClientData("GET", "", "clientMaster/"+selectedClientId, onAgeSuccess);
		function onAgeSuccess(data) {
			console.log("data.age "+data.age)		
			if(data.age>18){
				$('#idGuardian').hide();
				$('#idGuardianContact').hide();
			}else{
				$('#idGuardian').show();
				$('#idGuardianContact').show();
			}
		}
	}		
	    $("#idClient").empty();
	    $(".dashboardheading").html("");    
		$("#idClient").load(path);
	    $("#page-content-wrapper").css("height","auto");
		$(".form-section-container").addClass("height1257px");
		$(".nonload").css("display","block");
		$("#top-nav-bar").show();
		$(".top-nav-items").show();
		$(".displayonload").hide();
		$("#headIcon").empty();
	    $(".dashboardheading    ").html(heading);
		$("#mandatory-field-msg").hide();	

		
}
  		
  		$("#idSearchSubmit").on("click", function(event) {
  		//	alert("hiii");
  			$("#idClientList tr").remove();
  			var formData = $('#searchForm').serializeToJSON();
  			//console.log("loggedUser "+loggedUser.id);
  			formData["advisorId"] = loggedUser.id;
  			data = JSON.stringify(formData);
  			//console.log("Data : " + data);
  			serviceurl = 'clientMaster/search' ;
  			getClientData("POST", data, serviceurl, onSuccess);

  			function onSuccess(data){
  				if(data.length!=0){
  					//$("#idClientListPaginate").empty();
  					//$("#idPaginationDiv").empty();
  					var dataCount = 0;
  					var divContainer = "";
  					var pageCount = 1;
  					
  					//dataTbale creation
  					//==================
  					$('#idTable').dataTable();
  					$('#idTable').dataTable().fnDestroy();
  					$("#idClientList").empty();
  					$.each(data, function (index, client) {
  						//console.log("retirementStatus: " + client.retirementStatus);
  						var middle;
  						if (client.middleName == null) {
  							middle = " ";
  						} else {
  							if (client.middleName != null) {
  								middle = client.middleName;
  							}
  						}
  						//dataTable implementation
  						//==========================

  						$("#idClientList").append('<tr onclick="goToEditClient(\'' + client.id + '\', \'' + client.firstName + ' ' + client.lastName + '\', \'' + client.emailId + '\', \'' + client.mobile + '\', \'' + client.retirementStatus + '\',this.id)" id="'+client.id+'" ondblclick="goToClient(\'' + client.id + '\', \'' + client.firstName + ' ' + client.lastName + '\', \'' + client.emailId + '\', \'' + client.mobile + '\', \'' + client.retirementStatus + '\',\'' + client + '\')">'+
  	  							'<td>'+ client.salutation + ' ' + client.firstName + ' ' + middle + ' ' + client.lastName +'</td>'+
  	  							'<td>'+ client.emailId +'</td>'+
  	  							'<td>'+ client.mobile +'</td>'+
  	  							'</tr>');
  					});
  					//=====dataTable styling=====
  					$('#idTable').dataTable(
  							{
  								
  								"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
  								//"pageLength": 10,
  								"pagingType": "full_numbers"
  								
  							}
  					);
  					$('#idTable_paginate').css('margin-left',-100);
  					//=========================================
  			  } 
  		      else{
  		    	 $('#okModal').modal('show');
  		    	
  			 }
  		}		
  		
  	});
  		
  		$("#idSearchClear").on("click", function(event) {
  			
  			document.getElementById('idSearchName').value = "";
  			document.getElementById('idSearchMobile').value = "";
  			document.getElementById('idSearchPan').value = "";
  			document.getElementById('idSearchAadhar').value = "";
  			document.getElementById('idSearchEmail').value = "";
  			
  			serviceurl = "clientMasterList/"+loggedUser.id ;
  			//serviceurl = "clientMasterList/"+1 ;
  			getClientData("GET", "", serviceurl, onSuccess);
  			function onSuccess(data) {
  				//console.log("Return data = " + data);
  					//$("#idClientListPaginate").empty();
					//$("#idPaginationDiv").empty();
					var dataCount = 0;
					var divContainer = "";
					var pageCount = 1;
					
					//dataTbale creation
					//==================
					$('#idTable').dataTable();
					$('#idTable').dataTable().fnDestroy();
					$("#idClientList").empty();
					
					$.each(data, function (index, client) {						
						//console.log("retirementStatus: " + client.retirementStatus);
						var middle;
						if (client.middleName == null) {
							middle = " ";
						} else {
							if (client.middleName != null) {
								middle = client.middleName;
							}
						}
						//dataTable implementation
						//==========================
						//$("#idClientList").append('<tr onclick="goToClient()" onclick="goToClient(\'' + client.id + '\', \'' + client.firstName + ' ' + client.lastName + '\', \'' + client.emailId + '\', \'' + client.mobile + '\', ,\'' + client + '\')">'+
						$("#idClientList").append('<tr ondblclick="goToClient(\'' + client.id + '\', \'' + client.firstName + ' ' + client.lastName + '\', \'' + client.emailId + '\', \'' + client.mobile + '\', ,\'' + client + '\')">'+
								'<td>'+ client.salutation + ' ' + client.firstName + ' ' + middle + ' ' + client.lastName +'</td>'+
								'<td>'+ client.emailId +'</td>'+
								'<td>'+ client.mobile +'</td>'+
								'</tr>');
					});
					//=====dataTable styling=====
					$('#idTable').dataTable(
							{
								
								"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
								//"pageLength": 10,
								"pagingType": "full_numbers"
								
							}
					);
					$('#idTable_paginate').css('margin-left',-100);
					//=========================================
  			}
  			
  		});
  	
function okClick(){
	
	document.getElementById('idSearchName').value = "";
	document.getElementById('idSearchMobile').value = "";
	document.getElementById('idSearchPan').value = "";
	document.getElementById('idSearchAadhar').value = "";
	document.getElementById('idSearchEmail').value = "";
	
	$('#okModal').modal('hide'); 
	//alert("loggedUserID: " + loggedUser.id);
	serviceurl = "clientMasterList/"+loggedUser.id ;
	//serviceurl = "clientMasterList/"+1 ;
	getClientData("GET", "", serviceurl, onSuccess);
	function onSuccess(data) {
		//console.log("Return data = " + data);
			//$("#idClientListPaginate").empty();
			//$("#idPaginationDiv").empty();
			var dataCount = 0;
			var divContainer = "";
			var pageCount = 1;
			
			//dataTbale creation
			//==================
			$('#idTable').dataTable();
			$('#idTable').dataTable().fnDestroy();
			$("#idClientList").empty();
			
			$.each(data, function (index, client) {
				//console.log("retirementStatus: " + client.retirementStatus);
				var middle;
				if (client.middleName == null) {
					middle = " ";
				} else {
					if (client.middleName != null) {
						middle = client.middleName;
					}
				}
				//dataTable implementation
				//==========================
				$("#idClientList").append('<tr ondblclick="goToClient(\'' + client.id + '\', \'' + client.firstName + ' ' + client.lastName + '\', \'' + client.emailId + '\', \'' + client.mobile + '\', \'' + client.retirementStatus + '\',\'' + client + '\')">'+
						'<td>'+ client.salutation + ' ' + client.firstName + ' ' + middle + ' ' + client.lastName +'</td>'+
						'<td>'+ client.emailId +'</td>'+
						'<td>'+ client.mobile +'</td>'+
						'</tr>');
			});
			//=====dataTable styling=====
			$('#idTable').dataTable(
					{
						
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						//"pageLength": 10,
						"pagingType": "full_numbers"
						
					}
			);
			$('#idTable_paginate').css('margin-left',-100);
			//=========================================
			
		}
}

function confirmationClick(){
	//alert("confirmationClick");
	loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	//console.log("loggedUser "+loggedUser.id);
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	//console.log("Selected Client ID after delete: " + selectedClientId);
	$('#myModal').modal('hide'); 
	//console.log("Before Delete Client: " + ClientServiceUrl+"delete/" + selectedClientId);
	deleteSelectedRecord( ClientServiceUrl+"clientMaster/delete?clientId="+selectedClientId);
	//console.log("After Delete Client: " + ClientServiceUrl+"clientMasterList/" + loggedUser.id);
	
	getClientData("GET", "", "clientMasterList/" + loggedUser.id, success);
	function success(afterDeleteddata) {
			//$("#idClientListPaginate").empty();
			//$("#idPaginationDiv").empty();
			var dataCount = 0;
			var divContainer = "";
			var pageCount = 1;
			
			//dataTbale creation
			//==================
			$('#idTable').dataTable();
			$('#idTable').dataTable().fnDestroy();
			$("#idClientList").empty();
			
			$.each(afterDeleteddata, function (index, client) {
				//console.log("retirementStatus: " + client.retirementStatus);
				var middle;
				if (client.middleName == null) {
					middle = " ";
				} else {
					if (client.middleName != null) {
						middle = client.middleName;
					}
				}
				//dataTable implementation
				//==========================
				$("#idClientList").append('<tr ondblclick="goToClient(\'' + client.id + '\', \'' + client.firstName + ' ' + client.lastName + '\', \'' + client.emailId + '\', \'' + client.mobile + '\', \'' + client.retirementStatus + '\',\'' + client + '\')">'+
						'<td>'+ client.salutation + ' ' + client.firstName + ' ' + middle + ' ' + client.lastName +'</td>'+
						'<td>'+ client.emailId +'</td>'+
						'<td>'+ client.mobile +'</td>'+
						'</tr>');
			});
			//=====dataTable styling=====
			$('#idTable').dataTable(
					{
						
						"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
						//"pageLength": 10,
						"pagingType": "full_numbers"
						
					}
			);
			$('#idTable_paginate').css('margin-left',-100);
			//=========================================
			
		}
	  
} 
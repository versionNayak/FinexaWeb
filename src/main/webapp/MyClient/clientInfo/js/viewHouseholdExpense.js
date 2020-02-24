var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
var Selected_Client;
var  findid;
$(document).ready(function (event) {
	//	alert("epense view");
		sessionStorage.setItem("CLIENT_SERVICE_URL", ClientServiceUrl);
		Selected_Client = JSON.parse(sessionStorage.getItem("SELECTED_CLIENT_ID"));

/*		serviceurl = "expense/" + Selected_Client;
		//console.log(serviceurl);
		getClientData("GET", "",serviceurl, onSuccess);
*/
		var data = JSON.parse(sessionStorage.getItem("EXPENSE_LIST"));
		$("#idExpenseList").empty();
		        var expenseAmount = maskAmountValue(data.expenseAmount);
				$("#idExpenseList").append('<tr>' +
					'<td>' + expenseAmount + '</td>' +
					'<td class="hidden"><input type="text" id="expenseId" name="expenseId"  value=' + data.id + ' readonly="readonly"></td>' +
					'</tr>');
				$("#addRecord").addClass('btn_Disabled');

		$("#idExpenseList").on("click", "tr", function (e) {
			findid=$(this).find("#expenseId").val();
			addRowHandlers();
			$(this).addClass("selected").siblings().removeClass("selected");
			$("#idExpenseList tr:nth-child(0)").removeClass("selected");
			
			/*$('#editRecord').removeClass('btn_Disabled');
			$('.deleteicon').removeClass('btn_Disabled');*/
			
			$('#addRecord').addClass('btn_Disabled');
		}); 
	});

/*	   function onSuccess(data) {
	//	alert(" data "+data.expenseAmount);
	

			if(data.expenseAmount===0){
				
				
				 var pageUrl ="clientInfo/addHouseholdexpense.html";
			          addPage(pageUrl,"Add Household Expense");
					

				
			}else{
*/

			
			
/*			}
		}
		
*/	
	
	
	
	  
	  function confirmationClick(){
			$('#myModal').modal('hide'); 
			//console.log("findid "+findid);
			deleteSelectedRecord(sessionStorage.getItem("CLIENT_SERVICE_URL") + 'delete/'+findid);
			getClientData("GET", "","expense/" + Selected_Client, onSuccess);

			function onSuccess(afterDeleteddata){
					$("#idExpenseList").empty();
					var expenseAmount = maskAmountValue(afterDeleteddata.expenseAmount);
					if(expenseAmount==0)
					{
						if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
							var pageUrl ="clientInfo/addHouseholdExpense.html";
							addPage(pageUrl,"Add Household Expense");
							
						}else{
							addPage("clientInfo/authorisationErrorPage.html","Access Denied");
						}
					}
					$("#idExpenseList").empty();
					
					$("#idExpenseList").append('<tr>' +
						'<td>' + expenseAmount + '</td>' +
						'</tr>');
					$("#addRecord").addClass('btn_Disabled');
					
					} 
				
				
			
		}

	
var Selected_Client;
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
$(document).ready(function (event) {
	initRowHandlers();
		Selected_Client = JSON.parse(sessionStorage.getItem("SELECTED_CLIENT_ID"));
		var data = JSON.parse(sessionStorage.getItem("FIXED_INCOME_LIST"));
		$("#idFixedIncomeList").empty();
		$.each(data, function (index, fixedIncome) {
			var maskedamount = maskAmountValue(fixedIncome.amount); 
			$("#idFixedIncomeList").append('<tr>' +
					'<td>' + fixedIncome.ownerName + '</td>' +
					'<td>' + fixedIncome.financialAssetTypeName + '</td>' +
					'<td>' + fixedIncome.bankIssuerName + '</td>' +
					'<td>' + maskedamount + '</td>' +
					'<td class="hidden"><input type="text" id="idFixedIncome" name="FixedIncome"  value=' + fixedIncome.id + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idProduct" name="product"  value=' + fixedIncome.financialAssetTypeName + ' readonly="readonly"></td>' +
			'</tr>');
		}); 


		
	//}
//}

$("#idFixedIncomeList").on("click", "tr", function (e) {
	//	console.log("Table row selected ");
				
		 addRowHandlers();
		 sessionStorage.removeItem("fixedIncome_ID");
		 sessionStorage.setItem("fixedIncome_ID", $(this).find('#idFixedIncome').val());	
		// sessionStorage.setItem("product", $(this).find('#idProduct').val());	
		 
		$(this).addClass("selected").siblings().removeClass("selected");
		$("#idFixedIncomeList tr:nth-child(0)").removeClass("selected");
	//	alert("id "+sessionStorage.getItem("goal_ID"));
		
	}); 
});





    function confirmationClick(){
    	//console.log("ClientServiceUrl "+ClientServiceUrl);
		$('#myModal').modal('hide'); 
		console.log("path: "+ClientServiceUrl + '/clientFixedIncomeDelete/'+sessionStorage.getItem("fixedIncome_ID"));
		deleteSelectedRecord(ClientServiceUrl + '/clientFixedIncomeDelete/'+sessionStorage.getItem("fixedIncome_ID"));
		/*getClientData("GET", "","clientFixedIncome/client/"+ Selected_Client, onSuccess);
		
		function onSuccess(data) {
			//	alert(data);
			console.log("l "+data.length);

			if(data.length===0){

		          var pageUrl ="clientInfo/addFixedincome.html";
		          addPage(pageUrl,"Add Fixed Income");
				


			}else{

				$("#idFixedIncomeList").empty();
				$.each(data, function (index, fixedIncome) {
					$("#idFixedIncomeList").append('<tr>' +
							'<td>' + fixedIncome.ownerName + '</td>' +
							'<td>' + fixedIncome.financialAssetTypeName + '</td>' +
							'<td>' + fixedIncome.bankIssuerName + '</td>' +
							'<td>' + fixedIncome.amount + '</td>' +
							'<td class="hidden"><input type="text" id="idFixedIncome" name="FixedIncome"  value=' + fixedIncome.id + ' readonly="readonly"></td>' +
							'<td class="hidden"><input type="text" id="idProduct" name="product"  value=' + fixedIncome.financialAssetTypeName + ' readonly="readonly"></td>' +
					'</tr>');
				}); 


				
			}
		}*/
		
		$.ajax({
			type : 'GET',
			async : true,
			url : ClientServiceUrl+"clientFixedIncome/client/" + Selected_Client,
			dataType : 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			contentType : 'application/json',
			success : function(data) {
				console.log("l "+data.length);

				if(data.length===0){

			         
			          if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
			        	  var pageUrl ="clientInfo/addFixedIncome.html";
				          addPage(pageUrl,"Add Deposit/Bonds");
							
						}else{
							addPage("clientInfo/authorisationErrorPage.html","Access Denied");
						}
					
				}else{

					$("#idFixedIncomeList").empty();
					$.each(data, function (index, fixedIncome) {
						var maskedamount = maskAmountValue(fixedIncome.amount); 
						$("#idFixedIncomeList").append('<tr>' +
								'<td>' + fixedIncome.ownerName + '</td>' +
								'<td>' + fixedIncome.financialAssetTypeName + '</td>' +
								'<td>' + fixedIncome.bankIssuerName + '</td>' +
								'<td>' + maskedamount + '</td>' +
								'<td class="hidden"><input type="text" id="idFixedIncome" name="FixedIncome"  value=' + fixedIncome.id + ' readonly="readonly"></td>' +
								'<td class="hidden"><input type="text" id="idProduct" name="product"  value=' + fixedIncome.financialAssetTypeName + ' readonly="readonly"></td>' +
						'</tr>');
					}); 


					
				}
			
			},
			error : function(jqXHR, data) {
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
				alert("error deleting client life expectancy" + data.responseText);
			}    
			
			});
		
	}





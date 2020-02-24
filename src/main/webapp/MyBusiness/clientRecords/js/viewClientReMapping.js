
$(document).ready(function(event){
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	
	var id=loggedUser.id;
	
	//alert("id:"+uId );
	populateUser(id);
	$("#idClientSearch").on("click", function(event) {
	
		var validate;
		validate = validateClientReMapping($('#idViewmapping'));
		if (validate) {
			var formData = $('#idViewmapping').serializeToJSON();
			formData["userId"] = sessionStorage.getItem("SELECTED_USER_ID_FOR_CLIENT_SEARCH");
			//alert("id:"+sessionStorage.getItem("SELECTED_USER_ID_FOR_CLIENT_SEARCH") );
			var name=$("#idClientName").val();
			//alert("name"+name);
		
			//alert(name);
			//serviceurl = '/clientRecord/getAllClients?userId='+(sessionStorage.getItem("SELECTED_USER_ID_FOR_CLIENT_SEARCH"))+'&firstName='+name+'';
			//alert("serviceurl" + serviceurl);
			
			getClientData("GET", "", "/clientRecord/getAllClients/"+sessionStorage.getItem("SELECTED_USER_ID_FOR_CLIENT_SEARCH")+"/"+name, onSuccess);

			function onSuccess(data){
				
				if (data.length == 0){
					bootbox.alert("No Client Records Found");
				} else {
					$.each(data, function (index, clientList) {
						$("#idClientList").empty();
						$("#idClientList").append('<tr>' +
								'<td>' + clientList.userName + '</td>' +
								'<td id="idTDClientName">' + clientList.clientName + '</td>' +
								'<td id="idTDLocation">' + clientList.location + '</td>' +
								'<td class="hidden"><input type="text" id="idUser" name="user"  value=' + clientList.userId + ' readonly="readonly"></td>' +
								'<td class="hidden"><input type="text" id="idClient" name="clientID"  value=' + clientList.clientId + ' readonly="readonly"></td>' +
						'</tr>');
					});
				}
			 
			} 
		
		}
		
		
	});
	
	$('#idClientRemapping').change(function(){
		if($('#idClientRemapping').val() == ''){
		} else {
			var userId = $('#idClientRemapping').val();
			sessionStorage.removeItem("SELECTED_USER_ID_FOR_CLIENT_SEARCH");
			sessionStorage.setItem("SELECTED_USER_ID_FOR_CLIENT_SEARCH",userId);
		}
	
	});
	
	$("#idClientList").on("click","tr",function(e){	
		//alert("Hi");
		
		findid=$(this).find("#idUser").val();
		console.log("id of User "+ findid);
		sessionStorage.removeItem("SELECTED_USER_ID");
		sessionStorage.setItem("SELECTED_USER_ID",findid);
		
		findClientName=$(this).find("#idTDClientName").text();
		console.log("Client Name"+ findClientName);
		sessionStorage.removeItem("SELECTED_CLIENT_NAME");
		sessionStorage.setItem("SELECTED_CLIENT_NAME",findClientName);
		
		findLocation=$(this).find("#idTDLocation").text();
		console.log("Location Of User"+ findLocation);
		sessionStorage.removeItem("SELECTED_USER_LOCATION");
		sessionStorage.setItem("SELECTED_USER_LOCATION",findLocation);
		
		findidClient=$(this).find("#idClient").val();
		console.log("idClient"+ findid);
		sessionStorage.removeItem("SELECTED_CLIENT_ID");
		sessionStorage.setItem("SELECTED_CLIENT_ID",findidClient);
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
	});

});

function populateUser(id) {

	var dropDown = $("#idClientRemapping");
	getClientData("GET", "", "getAllUsersForClientContact/" +id , onGetUserSuccess);
	function onGetUserSuccess(data) {
		//alert(userArray);
		dropDown.find('option').remove();
		dropDown.append('<option value="">Select User</option>');
		$.each(data, function (index, relation) {
			dropDown.append('<option value="' + relation.id + '">' + relation.userName + '</option>');

		});
	}
}



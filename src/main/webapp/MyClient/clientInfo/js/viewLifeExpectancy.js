sessionStorage.setItem("SAVE_CLIENT", "NO");
selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var dataLength;
$(document).ready(function(event){

/*	serviceurl = "viewLifeExpList/" + selectedClientId;
	getClientData("GET", "", serviceurl, onSuccess);

	function onSuccess(data){
		if(data.length==0)
		{
			//$("#idClient").load("clientInfo/addClientLifeExpectancy.html");
			var addURL = "clientInfo/addClientLifeExpectancy.html";
			addPage(addURL,"Add Life Expectancy");
		}
*/		
		var data = JSON.parse(sessionStorage.getItem("LIFE_EXPECTANCY_LIST"));
		$("#idLifeExpList").empty();
		$.each(data, function (index, lifeExp) {
			//alert(lifeExp.memberFirstName);
			$("#idLifeExpList").append('<tr>' +
					'<td>' + lifeExp.memberName + '</td>' +
					'<td>' + lifeExp.memberRelation + '</td>' +
					'<td>' + lifeExp.lifeExp + '</td>' +
					'<td class="hidden"><input type="text" id="idLifeExp" name="nameLifeExp"  value=' + lifeExp.memberId + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idRelation" name="idRelation"  value=' + lifeExp.relationId + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idRelationFN" name="fnameRelation"  value=' + lifeExp.memberFirstName + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idGender" name="nameGender"  value=' + lifeExp.memberGender + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idRelationName" name="nameRelation"  value=' + lifeExp.relationName + ' readonly="readonly"></td>' +
			'</tr>');
		}); 
	//} 
	// disabling add button if all life expectancy are added
	
	
	serviceurl = "getFamilyMemberListByLifeExp/" + selectedClientId;
	getClientData("GET", "", serviceurl, onSuccessCheckIfLifeExpExits);

	function onSuccessCheckIfLifeExpExits(data){
		if(data.length == 0){
			$("#addRecord").addClass('btn_Disabled');
			dataLength = 0;
		} else {
			dataLength = 1;
		}
	} 
	$("#idLifeExpList").on("click","tr",function(e){	
		addRowHandlers();
		
		if(dataLength == 0) {
			$("#addRecord").addClass('btn_Disabled');
		} else {
			$("#addRecord").removeClass('btn_Disabled');
		}
		
		findid=$(this).find("#idLifeExp").val();
		console.log("id of life expectancy member "+ findid);
		sessionStorage.removeItem("SELECTED_LIFE_EXPECTANCY_ID");
		sessionStorage.setItem("SELECTED_LIFE_EXPECTANCY_ID",findid);
		
		var relationId=$(this).find("#idRelation").val();
		console.log("relation Id of life expectancy member "+ relationId);
		sessionStorage.removeItem("SELECTED_LIFE_EXPECTANCY_RELATION_ID");
		sessionStorage.setItem("SELECTED_LIFE_EXPECTANCY_RELATION_ID",relationId);
		
		var firstName = $(this).find("#idRelationFN").val();
	//	alert("First Name of life expectancy member "+ firstName);
		sessionStorage.removeItem("SELECTED_FIRST_NAME");
		sessionStorage.setItem("SELECTED_FIRST_NAME",firstName);
		
		var gender = $(this).find("#idGender").val();
		console.log("idGender of life expectancy member "+ gender);
		sessionStorage.removeItem("SELECTED_LIFE_EXPECTANCY_GENDER");
		sessionStorage.setItem("SELECTED_LIFE_EXPECTANCY_GENDER",gender);
		
		var relationName = $(this).find("#idRelationName").val();
	//	alert("RelationName of life expectancy member "+ relationName);
		sessionStorage.removeItem("SELECTED_LIFE_EXPECTANCY_MEMBER_RELATION");
		sessionStorage.setItem("SELECTED_LIFE_EXPECTANCY_MEMBER_RELATION",relationName);
		
		$(this).addClass("selected");
		$(this).addClass("selected").siblings().removeClass("selected"); 
	});



});

function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord(ClientServiceUrl+"deleteClientLifeExpectancy/"+sessionStorage.getItem("SELECTED_LIFE_EXPECTANCY_ID"));
	
	getClientData("GET", "", "viewLifeExpList/" + selectedClientId, onSuccess);
	function onSuccess(afterDeleteddata){

		$("#idLifeExpList").empty();
		if(afterDeleteddata.length==0)
		{
			 var pageUrl ="clientInfo/addClientLifeExpectancy.html";
                    addPage(pageUrl,"Add Life Expectancy");
		}
		$.each(afterDeleteddata, function (index, lifeExp) {
			$("#idLifeExpList").append('<tr>' +
					'<td>' + lifeExp.memberName + '</td>' +
					'<td>' + lifeExp.memberRelation + '</td>' +
					'<td>' + lifeExp.lifeExp + '</td>' +
					'<td class="hidden"><input type="text" id="idLifeExp" name="nameLifeExp"  value=' + lifeExp.memberId + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idRelation" name="idRelation"  value=' + lifeExp.relationId + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idRelationFN" name="fnameRelation"  value=' + lifeExp.memberFirstName + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idGender" name="nameGender"  value=' + lifeExp.memberGender + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idRelationName" name="nameRelation"  value=' + lifeExp.relationName + ' readonly="readonly"></td>' +
			'</tr>');
		});
		
		var serviceurl = "getFamilyMemberListByLifeExp/" + selectedClientId;
		getClientData("GET", "", serviceurl, onSuccessCheckIfLifeExpExits);

		function onSuccessCheckIfLifeExpExits(data){
			$("#editRecord").addClass('btn_Disabled');
			$("#deleteRecord").addClass('btn_Disabled');
			if(data.length==0){
				$("#addRecord").addClass('btn_Disabled');
				dataLength = 0;
			} else {
				$("#addRecord").removeClass('btn_Disabled');
				dataLength = 1;
			}
		} 
		
	
	}
	

	
}

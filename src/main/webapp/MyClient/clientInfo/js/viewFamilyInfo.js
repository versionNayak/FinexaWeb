selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
var findid ;
$(document).ready(function (event ) {
	initRowHandlers();  
	$("#deleteMessage").hide();
	console.log("View Family Info: Client ID: " + selectedClientId);

/*	serviceurl = "clientFamilyMember/client/" + selectedClientId;
	getClientData("GET", "", serviceurl, onSuccess);

	function onSuccess(data){
		//console.log("View Family Info: Family member info: " + data	);
		if(data.length==0)
			{
			var addURL = "clientInfo/addFamilyinfo.html";
			addPage(addURL,"Add Family Member Info");
			}
*/
		var data = JSON.parse(sessionStorage.getItem("FAMILY_MEMBER_LIST"));
		console.log("l "+data.length);
		$("#viewFamilyMemberList").empty();
		$.each(data, function (index, cfm) {
			var dependancy;
			if(cfm.dependentFlag == "N") {
				dependancy = "No";
			} else {
				if (cfm.dependentFlag == "Y") {
					dependancy = "Yes";
				}			}
	
			var middle;
			if(cfm.middleName == null) {
				middle = " ";
			} else {
				if (cfm.middleName != null) {
					middle = cfm.middleName;
				}
			}
		//	$("#viewFamilyMemberList").empty();
			$("#viewFamilyMemberList").append('<tr>' +
					'<td>' + cfm.firstName +' '+ middle +' '+ cfm.lastName + '</td>' +
					'<td>' + cfm.relationName + '</td>' +
					'<td>' + cfm.birthDate + '</td>' +
					'<td>' + dependancy + '</td>' +
					'<td class="hidden"><input type="text" id="idFamilyInfoId" name="familyInfoId"  value=' + cfm.id + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idIsTobaccoUser" name="isTobaccoUser"  value=' + cfm.isTobaccoUser + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idIsProperBMI" name="isProperBMI"  value=' + cfm.isProperBMI + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idHasDiseaseHistory" name="hasDiseaseHistory"  value=' + cfm.hasDiseaseHistory + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idHasNormalBP" name="hasNormalBP"  value=' + cfm.hasNormalBP + ' readonly="readonly"></td>' +
					'</tr>');
		}); 
	//} 
	
	
	$("#viewFamilyMemberList").on("click","tr",function(e){	
             addRowHandlers();
 		findid=$(this).find("#idFamilyInfoId").val();
 		sessionStorage.removeItem("SELECTED_FAMILY_MEMBER_ID");
		sessionStorage.setItem("SELECTED_FAMILY_MEMBER_ID",findid);
 		  $(this).addClass("selected");
		  $(this).addClass("selected").siblings().removeClass("selected"); 
		 });


});

function deleteRowMember(){
	var url="existAssetOrLoan/"+sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID");
	getClientData("GET", "", url,deleteSuccess);

	function deleteSuccess(data) {
		if(data==1){
			//bootbox.alert("can not delete this member.Loan and/or assetes are tagged.");
			bootbox.alert({ 
				  size: "medium",
				  title: "Delete FamilyMember",
				  message: "Familymember can not be deleted as Loan and/or assetes are tagged.", 
				  callback: function(){ /* your callback code */ }
				})
		}
		else{
			deleteRow();
		}

	}
}
function confirmationClick(){
	$('#myModal').modal('hide'); 
	deleteSelectedRecord( ClientServiceUrl+"deleteClientFamilyMember/"+sessionStorage.getItem("SELECTED_FAMILY_MEMBER_ID"));
	//console.log("Delete URL: " + ClientServiceUrl+"clientFamilyMember/client/" + selectedClientId);
	
	getClientData("GET", "", "clientFamilyMember/client/" + selectedClientId, onSuccess);
	function onSuccess(afterDeleteddata) {

		$("#viewFamilyMemberList").empty();
	//	console.log("afterDeleteddata.length "+afterDeleteddata.length);
        if(afterDeleteddata.length==0)
		{
            var pageUrl ="clientInfo/addFamilyInfo.html"
            addPage(pageUrl,"Add Family Member Info");
            if(((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y" )) || ((loggedClient != null) && (loggedClient.clientInfoAddEdit != null && loggedClient.clientInfoAddEdit === "Y" ))){
				var addURL = "clientInfo/addFamilyInfo.html";
		 		addPage(addURL,"Add Family Member Info");
				
			}else{
				addPage("clientInfo/authorisationErrorPage.html","Access Denied");
			}
		}
 
		$.each(afterDeleteddata, function (index, updatedFamilyInfo) {
			var dependancy;
			if(updatedFamilyInfo.dependentFlag == "N") {
				dependancy = "No";
			} else {
				if (updatedFamilyInfo.dependentFlag == "Y") {
					dependancy = "Yes";
				}
			}
			
			var middle;
			if(updatedFamilyInfo.middleName == null) {
				middle = " ";
			} else {
				if (updatedFamilyInfo.middleName != null) {
					middle = updatedFamilyInfo.middleName;
				}
			}
			
		
			$("#viewFamilyMemberList").append('<tr>' +
					'<td>' + updatedFamilyInfo.firstName +' '+ middle +' '+ updatedFamilyInfo.lastName + '</td>' +
					'<td>' + updatedFamilyInfo.relationName + '</td>' +
					'<td>' + updatedFamilyInfo.birthDate + '</td>' +
					'<td>' + dependancy + '</td>' +
					'<td class="hidden"><input type="text" id="idFamilyInfoId" name="familyInfoId"  value=' + updatedFamilyInfo.id + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idIsTobaccoUser" name="isTobaccoUser"  value=' + updatedFamilyInfo.isTobaccoUser + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idIsProperBMI" name="isProperBMI"  value=' + updatedFamilyInfo.isProperBMI + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idHasDiseaseHistory" name="hasDiseaseHistory"  value=' + updatedFamilyInfo.hasDiseaseHistory + ' readonly="readonly"></td>' +
					'<td class="hidden"><input type="text" id="idHasNormalBP" name="hasNormalBP"  value=' + updatedFamilyInfo.hasNormalBP + ' readonly="readonly"></td>' +
			'</tr>');
		
		}); 
        
	}
	   
}
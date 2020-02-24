$(document).ready(function() {
	getSelectedClient();
});	


function getSelectedClient(){
    selectedClientId = sessionStorage.getItem("SELECTED_CLIENT_ID");
	console.log("selectedClientId "+selectedClientId);
	var serviceUrl = "clientMaster/" + selectedClientId;
	getClientData("GET", "", serviceUrl, onSuccess);
	
	function onSuccess(data) {
		$("#pan").val(data.pan.toUpperCase());
	}
}
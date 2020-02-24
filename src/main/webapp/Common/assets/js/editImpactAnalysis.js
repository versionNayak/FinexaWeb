$(document).ready(function () {
	
	var id = sessionStorage.getItem("SELECTED_IMPACT_ID");
	
	//alert(id);
	
	getClientData("GET", "", "finexaImpactAnalysis?id=" + id, onGetImpactDataSuccess);
	
	function onGetImpactDataSuccess(data) {
		
		populateForm($('#idUpdateImpactForm'), data);
	}
	
	
	$("#idUpdateImpacts").on("click", function(event) {
		
		var formData = $('#idUpdateImpactForm').serializeToJSON();
		
		formData["id"] = id;
		
		var data = JSON.stringify(formData);
		
		getClientData("POST", data, "editFinexaImpactAnalysis", onUpdateImpactSuccess)
		
		function onUpdateImpactSuccess(updatedData) {
			window.location = "viewImpactAnalysis.html";
		}
		
	});
	
});

function setModuleName(pModuleName) {
	//alert('Setting Fund House in EDIT mode: '+pFundHouse);							    	   
	$("#idMName option").filter(function() {
		return this.value==pModuleName;							    
	}).prop('selected', true);
}

function setSubModuleName(pModuleName, pSubModuleName) {
	
	serviceurl = "subModuleFromModule?moduleName=" + pModuleName;
	getClientDataAsyncFalse("GET","",serviceurl,subModuleFromModuleSuccess);
	
	function subModuleFromModuleSuccess(data){
	//	console.log(data);
		smnDrop = $("#idSMName");
		smnDrop.find('option').remove();
		smnDrop.append('<option value="0">Sub Module Name</option>');
		$.each(data, function (index, item) {
			smnDrop.append('<option value="' + item.id + '">' + item.description + '</option>');
		});
		$("#idSMName option").filter(function() {
			return this.value==pSubModuleName;			    
		}).prop('selected', true); 
	} 	
}
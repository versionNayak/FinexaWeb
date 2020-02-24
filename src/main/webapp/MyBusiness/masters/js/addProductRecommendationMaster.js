$(document).ready(function() {
	
	getClientData("GET","","subAssetClassList",subAssetClassSuccess);

	function subAssetClassSuccess(data){
	//	console.log(data);
		sacDrop = $("#idSubAssetClass");
		sacDrop.find('option').remove();
		sacDrop.append('<option value="0">Select Sub Asset Class</option>');
		/* $("#idFHouseETF").append('<option value="0">Select ' + name + '</option>'); */
		$.each(data, function (index, item) {
			sacDrop.append('<option value="' + item + '">' + item + '</option>');
			/* $("#idFHouseETF").append('<option value="' + item + '">' + item + '</option>'); */
		});
	}
	
	
	
	
	
	
	
	
});
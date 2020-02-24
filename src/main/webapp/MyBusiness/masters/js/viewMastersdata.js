$(document).ready(function (event ) {
	
	var lMastersList = document.getElementById("selectMaster");
	var selectedMaster;

	   $('#selectMaster').on('change', function(){
	   		$('.masterfiles').slideDown();
	   		selectedMaster = $(this).val();
	   		console.log(" Selected master : " + selectedMaster);
	   		if (lMastersList.value == "") {
	   			$('.masterfiles').slideUp();
	   		}
	   		
	   });
	   
	   
	   $("#idDownload").on("click", function(event) {
		   
		   if (selectedMaster == "") {
			   alert("Please select a master to download");
		   }else {
			   var href = ClientServiceUrl+"masters/"+selectedMaster+"/download";
			   window.location=href;
		   }
		 
		   
		   
		   
	   });

	 		 $("#wrapper").css("height","auto");
			 $(".form-section-container").css("height","auto");

		$(".addicon").hide();
		$(".editicon").hide();
		$(".deleteicon").hide();
		




});






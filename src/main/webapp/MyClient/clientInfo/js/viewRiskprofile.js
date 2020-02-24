 $("#riskProfileName").on('click', 'tr', function(){
	  $(this).addClass("selected").siblings().removeClass("selected"); 
	  $("#riskProfileName tr:nth-child(0)").removeClass("selected");
	  $('#editRecord').removeClass('btn_Disabled');
	 });


 		 $("#wrapper").css("height","auto");
		 $(".form-section-container").css("height","auto");


		 $("#addRecord").show();
         $('#editRecord').show();
         $('#deleteRecord').show();

	$(document).ready(function (event) {
		console.log("aaaa");
		var data = JSON.parse(sessionStorage.getItem("RiskProFile_LIST"));
		console.log("Json format: " + data);
	
	    
		$("#riskProfileName").empty();
		var i=1;
		console.log("data.riskProfileName "+data.riskProfileName);
			$("#riskProfileName").append('<tr>' +
					'<td>' + i + '</td>' +
					'<td>' + data.riskProfileName + '</td>' +
					'<td>' + data.lastUpdatedOn+ '</td>' +
			'</tr>');
			i=i+1;
	});
	
	
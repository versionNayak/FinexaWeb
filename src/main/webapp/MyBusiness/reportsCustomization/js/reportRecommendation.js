 $(".retirementview tr").click(function(){
	  $(this).addClass("selected").siblings().removeClass("selected"); 
	  $(".retirementview tr:nth-child(1)").removeClass("selected");
	  $('.editicon').removeClass('btn_Disabled');
	  $('.deleteicon').removeClass('btn_Disabled');
	 });

	 $("#wrapper").css("height","auto");
		 $(".form-section-container").css("height","auto");

	$(".addicon").click(function(){
		$(".dashboardheading").html("Add Output Reports Recommendation");
		$("#wrapper").css("height","auto");
		$("#idBuinessReports").empty();
		$("#idBuinessReports").load("reportsCustomization/addreportRecommendation.html");
		$(".form-section-container").css("height","auto");
		$("#page-content-wrapper").css("height","auto");
		$('.editicon').hide();
		$('.deleteicon').hide();
	


	});
	$(".editicon").click(function(){
		$(".dashboardheading").html("Edit Output Reports Recommendation");
		$("#idBuinessReports").empty();
		$("#idBuinessReports").load("reportsCustomization/editreportRecommendation.html");
	 	$("#wrapper").css("height","auto");		
		$(".form-section-container").css("height","auto");
		$("#page-content-wrapper").css("height","auto");
		$(".nonload").css("display","block");
		$(".displayonload").hide();
		$('.editicon').addClass('btn_Disabled');
		
	
	});
	$(".deleteicon").click(function(){
		//$("#idClient").empty();
		//$("#idClient").load("clientInfo/deleteClient.html");
		 $('#myModal').modal('show');
		 $("#wrapper").css("height","1368px;");
		$("#page-content-wrapper").css("height","auto");
			$(".form-section-container").css("height","auto");
	
	});

	$(function () {
			"use strict";
			$("[data-toggle=\"tooltip\"]").tooltip();
			$("#idStartDate,#idMaturityDate,#idExtensionDate").datepicker({
				format: "dd/mm/yyyy",
				todayHighlight: true,
				todayBtn: true
			});
			$(".datepicker-icon").on("click", function () {
				$(this).closest(".input-group").find("input").trigger("focus");
			});
		});

	var ppfext = document.getElementById("idPPFExtension");
ppfext.onchange = function(event){
    if(ppfext.value=="Yes"){
        $(".pptselection").show();
    }
	else{
		
		$(".pptselection").hide();
	}
}


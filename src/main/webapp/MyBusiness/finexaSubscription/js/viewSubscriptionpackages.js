 $(".retirementview tr").click(function(){
	  $(this).addClass("selected").siblings().removeClass("selected"); 
	  $(".retirementview tr:nth-child(1)").removeClass("selected");
	  $('.editicon').removeClass('btn_Disabled');
	  $('.deleteicon').removeClass('btn_Disabled');
	  $('.addicon').hide();
	 });

   $('.risk_profiles tr').click(function(){
   		$('.risk_profile_table').slideDown();
   });

    $('.addicon').hide();
    $('.editicon').hide();

 		 $("#wrapper").css("height","auto");
		 $(".form-section-container").css("height","auto");
     
    $(".review").click(function(){
		$(".dashboardheading").html("Edit Subscription Package");
		$("#idBuinessMasters").empty();
		$("#idBuinessMasters").load("finexaSubscription/editSubscriptionpackages.html");
	 	$("#wrapper").css("height","auto");		
		$(".form-section-container").css("height","auto");
		$("#page-content-wrapper").css("height","auto");
		$(".nonload").css("display","block");
		$(".displayonload").hide();
		$('.editicon').addClass('btn_Disabled');
		
	
	});

	


	$(".addicon").click(function(){
		$(".dashboardheading").html("Add Client Contact Management");
		$("#wrapper").css("height","auto");
		$("#idBuinessMasters").empty();
		$("#idBuinessMasters").load("clientRecords/addClientcontactmanagement.html");
		$(".form-section-container").css("height","auto");
		$("#page-content-wrapper").css("height","auto");
		$('.editicon').hide();
		$('.deleteicon').hide();
	


	});
	$(".editicon").click(function(){
		$(".dashboardheading").html("Edit Subscription Package");
		$("#idBuinessMasters").empty();
		$("#idBuinessMasters").load("finexaSubscription/editSubscriptionpackages.html");
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


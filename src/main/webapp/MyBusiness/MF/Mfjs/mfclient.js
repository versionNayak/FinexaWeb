$(document).ready(function(){
	
	$(".form-section-container").css("padding","18px 45px 137px 45px");
		$(".headingforresources").hide();
	
	
	$("#idClient").load("MF/clientMaster.html");
	$("#wrapper").css("height","auto");
	$(".form-section-container").removeClass("height1257px");
	$(".addicon").click(function(){
		// $("#wrapper").css("height","1433px;");
		 $(".fieldsrequired").html("Field marked * as mandatory");
		$("#idClient").empty();
		$("#idClient").load("MF/addClient.html");
			 		$(".form-section-container").addClass("height1257px");
		$("#page-content-wrapper").css("height","auto");
		


	});
	$(".editicon").click(function(){
		$("#idClient").empty();
		$("#idClient").load("MF/editClient.html");
	 	 $("#wrapper").css("height","1433px;");
		 $(".dashboardheading").html("Client Dashboard");
		/* $(".fieldsrequired").html("Field marked * as mandatory");*/
		$(".form-section-container").css("padding","18px 45px 582px 45px");
		$("#page-content-wrapper").css("height","auto");
			$(".form-section-container").addClass("height1257px");
		$(".nonload").css("display","block");
		$("#top-nav-bar").show();
		$(".displayonload").hide();
		
	
	});
	$(".deleteicon").click(function(){
		$("#idClient").empty();
		$("#idClient").load("clientInfo/deleteClient.html");
			 $("#wrapper").css("height","1368px;");
		$("#page-content-wrapper").css("height","auto");
			$(".form-section-container").removeClass("height1257px");
	
	});

	
	
	
	});
	
	
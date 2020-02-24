$("#page-content-wrapper").css("height","1430px");

$(document).ready(function(){
	

	$("#idClient").load("masters/productRecommend.html");
		 $("#wrapper").css("height","auto");
			$(".form-section-container").removeClass("height1257px");
			
			
	$(".addicon").click(function(){
		 $("#wrapper").css("height","1433px;");
		 $(".fieldsrequired").html("Field marked * as mandatory");
		$("#idClient").empty();
		$("#idClient").load("masters/addproduct.html");
			 		$(".form-section-container").css("height","1937px");
		$("#page-content-wrapper").css("height","auto");
		


	});
	$(".editicon").click(function(){
		$("#idClient").empty();
	 	 $("#wrapper").css("height","1433px;");
		 $(".editicon").html("Client Dashboard");
		/* $(".fieldsrequired").html("Field marked * as mandatory");*/
		$("#idClient").load("masters/editproduct.html");
		$("#page-content-wrapper").css("height","auto");
			$(".form-section-container").css("height","1937px");
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
	
	
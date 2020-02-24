$(".assetOwner1_img").addClass('activeself');
		
			$(".assetOwner1_img").hover(function(){
		
				$(".assetOwner1_img").addClass('hoverself');
			},
			function() {
				$(this).removeClass('hoverself');
			})
			.click(function() {
				$(this).toggleClass('activeself');
				$(".assetOwner2_img").removeClass('activeman');
				$(".assetOwner3_img").removeClass('activeboy');
				$(".assetOwner4_img").removeClass('activegirl');
				$(".assetOwner5_img").removeClass('activefather');
				$(".assetOwner6_img").removeClass('activemother');
				$(".assetOwner7_img").removeClass('activeother');
			});
			$(".assetOwner2_img").hover(function(){
				$(this).addClass('hoverman');
			},
			function() {
				$(this).removeClass('hoverman');
			})
			.click(function() {
				$(this).toggleClass('activeman');
				$(".assetOwner1_img").removeClass('activeself');
				$(".assetOwner3_img").removeClass('activeboy');
				$(".assetOwner4_img").removeClass('activegirl');
				$(".assetOwner5_img").removeClass('activefather');
				$(".assetOwner6_img").removeClass('activemother');
				$(".assetOwner7_img").removeClass('activeother');
			});
			$(".assetOwner3_img").hover(function(){
				$(this).addClass('hoverboy');
			},
			function() {
				$(this).removeClass('hoverboy');
			})
			.click(function() {
				$(this).toggleClass('activeboy');
				$(".assetOwner1_img").removeClass('activeself');
				$(".assetOwner2_img").removeClass('activeman');
				$(".assetOwner4_img").removeClass('activegirl');
				$(".assetOwner5_img").removeClass('activefather');
				$(".assetOwner6_img").removeClass('activemother');
				$(".assetOwner7_img").removeClass('activeother');
			});
			$(".assetOwner4_img").hover(function(){
				$(this).addClass('hovergirl');
			},
			function() {
				$(this).removeClass('hovergirl');
			})
			.click(function() {
				$(this).toggleClass('activegirl');
				$(".assetOwner1_img").removeClass('activeself');
				$(".assetOwner3_img").removeClass('activeboy');
				$(".assetOwner2_img").removeClass('activeman');
				$(".assetOwner5_img").removeClass('activefather');
				$(".assetOwner6_img").removeClass('activemother');
				$(".assetOwner7_img").removeClass('activeother');
			});
			$(".assetOwner5_img").hover(function(){
				$(this).addClass('hoverfather');
			},
			function() {
				$(this).removeClass('hoverfather');
			})
			.click(function() {
				$(this).toggleClass('activefather');
				$(".assetOwner1_img").removeClass('activeself');
				$(".assetOwner3_img").removeClass('activeboy');
				$(".assetOwner4_img").removeClass('activegirl');
				$(".assetOwner2_img").removeClass('activeman');
				$(".assetOwner6_img").removeClass('activemother');
				$(".assetOwner7_img").removeClass('activeother');
			});
			$(".assetOwner6_img").hover(function(){
				$(this).addClass('hovermother');
			},
			function() {
				$(this).removeClass('hovermother');
			})
			.click(function() {
				$(this).toggleClass('activemother');
				$(".assetOwner1_img").removeClass('activeself');
				$(".assetOwner3_img").removeClass('activeboy');
				$(".assetOwner4_img").removeClass('activegirl');
				$(".assetOwner5_img").removeClass('activefather');
				$(".assetOwner2_img").removeClass('activeman');
				$(".assetOwner7_img").removeClass('activeother');
			});
			$(".assetOwner7_img").hover(function(){
				$(this).addClass('hoverother');
			},
			function() {
				$(this).removeClass('hoverother');
			})
			.click(function() {
				$(this).toggleClass('activeother');
				$(".assetOwner1_img").removeClass('activeself');
				$(".assetOwner3_img").removeClass('activeboy');
				$(".assetOwner4_img").removeClass('activegirl');
				$(".assetOwner5_img").removeClass('activefather');
				$(".assetOwner6_img").removeClass('activemother');
				$(".assetOwner2_img").removeClass('activeman');
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

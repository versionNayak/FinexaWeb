$(document).ready(function() {
    $("div.daterangepicker").remove();
})
$(".form-section-container").css("padding","18px 45px 32px 45px");

var jssor_16_SlideshowTransitions = [
		{$Duration:1200,x:0.3,$During:{$Left:[0.3,0.7]},$Easing:{$Left:$Jease$.$InCubic,$Opacity:$Jease$.$Linear},$Opacity:2}
		
		
	];
	
	var jssor_16_options = {
		$AutoPlay: 1,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: jssor_16_SlideshowTransitions,
			$TransitionsOrder: 1
		},
		$ArrowNavigatorOptions: {
			$Class: $JssorArrowNavigator$
		},
		$ThumbnailNavigatorOptions: {
			$Class: $JssorThumbnailNavigator$,
			$Cols: 10,
			$SpacingX: 8,
			$SpacingY: 8,
			$Align: 360
		}
	};
	
	var jssor_16_slider = new $JssorSlider$("jssor_16", jssor_16_options);
	
	   var recompavright = $('.jssort16 div:nth-child(2) div:nth-child(2)>div');
	      var recompavleft = $('.jssort16 div:nth-child(2) div:nth-child(2)>div');
	
		$(".budgetrecommendright").click(function(){
			if(recompavright.hasClass('pav'))
			{	       
				$("#idBody").empty();
		        $("#idBody").load("plan/pm/viewPortfolioRiskProfile.html");
				$(".form-section-container").css("padding","27px 45px 101px");
				$(".glidnonglid").hide();
				$("#idHeading").html("Risk Profile");
				$(".pmadvisorrecommend").removeClass("activeitem");
				$(".pmRiskProfile").addClass("activeitem");
			
				
				
				
			   
			};
		});
		
			$(".budgetrecommendleft").click(function(){
			if(recompavleft.hasClass('pav'))
			{	       
		       	$("#idBody").empty();
		        $("#idBody").load("plan/pm/viewProductRecommend.html");
				$(".form-section-container").css("padding","27px 45px 101px");
				$(".glidnonglid").hide();
				$("#idHeading").html("Product Recommendation");
				$(".pmadvisorrecommend").removeClass("activeitem");
				$(".pmproductrecom").addClass("activeitem");
		
				
				
				
			   
			};
});
		
		
		



	
	
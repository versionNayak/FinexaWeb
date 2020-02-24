$('.mandatory').show();

$('.editicon').hide();
$('.addicon').hide();
	
   $(function () {
			"use strict";
			$("[data-toggle=\"tooltip\"]").tooltip();

			$("#idBDate").datepicker({
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
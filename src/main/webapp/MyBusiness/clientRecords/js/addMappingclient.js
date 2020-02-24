$('.mandatory').show();


	
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


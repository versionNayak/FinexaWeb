var loggedInUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var reportFormat;
$(document).ready(function(){
	
	console.log(loggedInUser.id);
	
	$('#wait').hide();
	
	var options =  {
			  onComplete: function(cep) {
			     
			  },
			  onKeyPress: function(cep, event, currentField, options){
			    
			  },
			  onChange: function(cep){
			    
			  },
			  onInvalid: function(val, e, f, invalid, options){
			    
			  }
	};
	
	$('#idFromDate').mask('00/00/0000',options);
	$('#idToDate').mask('00/00/0000',options);
	
	"use strict";
	$("[data-toggle=\"tooltip\"]").tooltip();
	
	$("#idFromDate").datepicker('remove'); 
	$("#idFromDate").datepicker({
		format: "dd/mm/yyyy",
		endDate: '0d',
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false
	}).on('changeDate', function(ev){
		$("#idFromDateGroup").css('border','1px solid #ccc');				
		$("#idFromDateGroup").css('borderRadius','7px');	
	});
	
	$("#idToDate").datepicker('remove'); 
	$("#idToDate").datepicker({
		format: "dd/mm/yyyy",
		endDate: '0d',
		todayHighlight: true,
		todayBtn: true,
		autoclose: true,
		forceParse: false
	}).on('changeDate', function(ev){
		$("#idToDateGroup").css('border','1px solid #ccc');				
		$("#idToDateGroup").css('borderRadius','7px');	
	});
	
	$(".datepicker-icon").on("click", function() {
		$(this).closest(".input-group").find("input").trigger("focus");
	});
	
	$('input[type="radio"][name="reportFormat"]').change(function() {
		reportFormat = this.value;
		console.log("reportFormat: " + reportFormat);
	});
	
	$(document).ajaxStart(function () {
		$('#wait').show();
	});
	
	$(document).ajaxStop(function () {
		$('#wait').hide();
    });
    
    $(document).ajaxError(function () {
    	$('#wait').hide();
    });
    
    var btn = document.getElementById("showBusinessMISReport");
	
    btn.onclick = function() {
    	
    	var formData = $('#idBusinessMISReportForm').serializeToJSON();
		
		var fromDateParts = formData.fromDate.split('/');
		console.log(fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0]);
		
		var fromDate = fromDateParts[2]+'-'+fromDateParts[1]+'-'+fromDateParts[0];
		
		var toDateParts = formData.toDate.split('/');
		console.log(toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0]);
		
		var toDate = toDateParts[2]+'-'+toDateParts[1]+'-'+toDateParts[0];
		
		var optionTypeArr = [];
	    $.each($("input[name='options']:checked"), function(){            
	    	optionTypeArr.push($(this).val());
	    });
	   	   	    
	    console.log("Report Types are: " + optionTypeArr.join(" "));
    	
	    $.ajax({
			async: false,
			url: ClientServiceUrl + "generateBusinessMISReport?distributorId=" + distributorId + "&fromDate=" + fromDate + 
			"&toDate=" + toDate + "&options=" + optionTypeArr.join(" "),
			method: "GET",
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function (data) {
				$('#wait').hide();
				if(data == "No Data") {
					bootbox.alert("No data found in report.");
				} else {
					window.open("resources/AumReconciliationReport.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
				}
			},
			error: function (jqXHR, exception) {
				$('#wait').hide();
				var msg = '';
		        if (jqXHR.status === 0) {
		            msg = 'Could not connect to the server, please contact System Administrator.';
		        }else if(jqXHR.status == 400){
		        	msg = 'There is some problem in the server, please contact System Administrator.\n';
		        }else if(jqXHR.status == 401){
		        	var error,error_description;
                       error = jqXHR.responseJSON.error_description;
                       error_description = "Access token expired: "+sessionStorage.getItem("sessionID");
                       if(error === error_description){
		        		msg = "Your session has expired.Please log in again"
		        		bootbox.alert({
				        	 message: msg,
				        	 callback: function () {
					         window.location = "../index.html";
				         }
				      });
		        	}
		        	if(error === "unauthorized"){
		        		msg = "Full authentication is required to access this resource",
		        		bootbox.alert({
				        	 message: msg
				        });
		        	}	
		        } else if (jqXHR.status == 404) {
		            msg = 'Requested service url not found.';
		        } else if (jqXHR.status == 405) {
		        	msg = 'Could not connect to the server, please contact System Administrator.\n';
		        } else if (jqXHR.status == 500) {
		        	msg = 'There is some problem in the server, please contact System Administrator.\n';
		        } else if (exception === 'parsererror') {
		            msg = 'Failed to get result.';
		        } else if (exception === 'timeout') {
		            msg = 'Timed Out!';
		        } else if (exception === 'abort') {
		            msg = 'Request aborted.';
		        } else {
		            msg = 'Something went wrong, could not connect to the server, please contact System Administrator.\n';
		        }
		        
		        $("#idBackOffice").load("resources/errorPage.html");
		     
			}
		});
	    
    }
    
    $("#exportBusinessMISReport").on("click", function(event) {
    	
    	alert("exportBusinessMISReport clicked!!");
    	
    });
	
});
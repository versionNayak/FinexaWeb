$(document).ready(function () {
	
	$.ajax({
		type: 'GET',
		url: REQUEST_URL_GP + '/getClientGoalList?clientId='+vClientId,
		async: false,
		dataType: 'json',
		beforeSend: function (xhr){ 
			xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
	    },
		success: function (data) {
			$.each(data,function(index, value) {
			$("#goalList").append('<tr>' +
					'<td class="hidden">'+ value.goalId+'</td>' +
					'<td>'+ value.goalTypeName+'</td>' +
					'<td>'+ value.goalDescName+'</td>' +
					'<td>'+ value.goalPriority+'</td>' +
					'<td>'+ value.startMonthYear+'</td>' +
			'</tr>');
		});	
		}, 
		error: function (jqXHR,data) {
			if(jqXHR.status == 401){
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
			      })
	        	}
	        	if(error === "unauthorized"){
	        		msg = "Full authentication is required to access this resource",
	        		bootbox.alert({
			        	 message: msg
			        })
	        	}	
	        }
		}
	});
	
	$("#goalList tr").click(function(){
//		alert("Table row clicked");
		$(this).addClass("selected").siblings().removeClass("selected"); 
		var currentGoalType = $(this).find("td").eq(0).html();
		goalId = currentGoalType;
//		alert(currentGoalType);
	});

	$('#goalList tr').dblclick(function(){
		
		if (goalId == null) {
		bootbox.alert("Please Select a Proper Goal",
		function(){ 
			
		console.log('This was logged in the callback!'); 
		$(".dashboardheading").html("Goal Details");
		$("#wrapper").css("height","auto");
		$("#dashbord").empty();
		$("#dashbord").css("height","483px");
		//change
		$("#dashbord").load("plan/gp/viewGoal.html");
		
		$(".goaldash_arrow").show();
		$(".goalinput_arrow,.goalplanning_arrow").hide();
		$(".goaldash").toggleClass('activeitem');
		$(".nestedincome .inputplanning,.nestedincome .goalplanning").removeClass("activeitem");
		
		
		});
		} else {
			$(".dashboardheading").html("Goal Planning Report");
			$("#wrapper").css("height","auto");
			$("#dashbord").empty();
			$("#dashbord").css("height","483px");
			$("#dashbord").load("plan/gp/viewGPDashboard.html");
		}
	});
	
});




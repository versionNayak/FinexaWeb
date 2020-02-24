$(document).ready(function(){
	//alert(sessionStorage.getItem("Super_Admin"));
	// 
	//alert("header loaded");
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	var loggedClient;
	if(loggedUser == null){
	loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
	}else{
	loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
	}
	var loggedID;
	 if(loggedUser != null){
		 loggedID = loggedUser.id;
	 }else{
	  if(loggedClient != null){
		 loggedID = loggedClient.userId;
	  }
	 }
	if(sessionStorage.getItem("Super_Admin")=="deactive"){
		$("#idAdminPanel").hide();
	} else {
		$("#idMyBusinessLabel").hide();
	}
	
	if(loggedUser != null || loggedClient != null){
		if(((loggedUser != null) && (loggedUser.investView === null || loggedUser.investView === "N")) || ((loggedClient != null) && (loggedClient.investView === null || loggedClient.investView === "N" ))) {
			$("#menuInvest").hide();
		}
	
		if((loggedUser != null) && ((loggedUser.budgetManagementView === null || loggedUser.budgetManagementView === "N") && (loggedUser.goalPlanningView == null || loggedUser.goalPlanningView == "N") && (loggedUser.portfolioManagementView == null || loggedUser.portfolioManagementView == "N") && (loggedUser.financialPlanningView == null || loggedUser.financialPlanningView == "N"))){
			$("#menuPlan").hide();		
		}
		if((loggedClient != null) && ((loggedClient.budgetManagementView === null || loggedClient.budgetManagementView === "N") && (loggedClient.goalPlanningView == null || loggedClient.goalPlanningView == "N") && (loggedClient.portfolioManagementView == null || loggedClient.portfolioManagementView == "N") && (loggedClient.financialPlanningView == null || loggedClient.financialPlanningView == "N"))){
			$("#menuPlan").hide();		
		}

	}
	 
	 $.ajax({
		   url: ClientServiceUrl+"getadvisor/logo/"+loggedID, 
	          type: "GET",
	          contentType: "image/png",
	          dataType: "text",
	          beforeSend: function (xhr){ 
					xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
			  },
	          success: function(data) { 
	        	if(data!="")
	        		{
	        		 $("#idClientHeaderAdvisorLogo").attr('src','data:image/png;base64,' + data);
	        		}else
	        			{
	        			$("#idClientHeaderAdvisorLogo").attr('src', '../Common/assets/images/finexa-logo.jpg');
	        			}
	        	// $("#imgalign").html('<img src="data:image/png;base64,' + data + '" />');
	        }
	    });
	var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
	$(".existingclient").show();
		
	$('input:radio[name="tgl"]').change(
	    function(){
	        if ($(this).val() == '0') {
	        	sessionStorage.removeItem("TRANSACT_UPLOAD_BSE_MASTER");
				window.location='../MyBusiness/mybusinessDashboard.html';
				// Resetting selected client when user clicks on Existing Client			
				$("#idSelectedClientName").empty();		
				sessionStorage.removeItem("SELECTED_CLIENT_ID");
				
				
	
				//alert("if");
			}
	        else {
			//alert("else");
				//window.location='../MyClient/myclientDashboard.html';
		}
	});
	//change
	$("#clientimg").attr('src',"../Common/assets/images/icons/1-A.png");
	
	//change
	$("#clientimg").addClass('activeclient');
	
	$('.nav-client-info a').addClass('white');
	$("#hum").click( function(){
		$("#mySidenav").toggle();
	});
	$(".help").click(function(){
		$(this).addClass("onclickbg");
		$(".search").removeClass("onclickbg");
		$(".logout").removeClass("onclickbg");
        $(".changePassword").removeClass("onclickbg");
	});
	$(".search").click(function(){
		$(this).addClass("onclickbg");
		$(".help").removeClass("onclickbg");
		$(".logout").removeClass("onclickbg");
        $(".changePassword").removeClass("onclickbg");
	});
	$(".logout").click(function(){
		$(this).addClass("onclickbg");
		$(".search").removeClass("onclickbg");
		$(".help").removeClass("onclickbg");
        $(".changePassword").removeClass("onclickbg");
	});
    $(".changePassword").click(function(){
        $(this).addClass("onclickbg");
        $(".search").removeClass("onclickbg");
        $(".help").removeClass("onclickbg");
        $(".logout").removeClass("onclickbg");
    });

	// Actions when top navigation bar menu items are clicked
	// Client Info Icon
	$("#clientimg").hover( function(){
		$(this).addClass('');
	},
	function() {
		$(this).removeClass('');
	})
	.click(function() {
		$(this).toggleClass('activeclient');
		//change
		$("#clientimg").attr('src',"../Common/assets/images/icons/1-A.png");
		$("#planimg").attr('src',"../Common/assets/images/icons/2-B.png");
		$("#Investimg").attr('src',"../Common/assets/images/icons/3-B.png");
		//$("#Reviewimg").attr('src',"../Common/assets/images/icons/7-B.png");
		//$("#Reportsimg").attr('src',"../Common/assets/images/icons/4-B.png");
		//$("#Resourcesimg").attr('src',"../Common/assets/images/icons/5-B.png");
		//change
		$('.nav-client-info a').addClass('white');
		//$('.nav-resources a').removeClass('white');
		//$('.nav-reports a').removeClass('white');
		//$('.nav-review a').removeClass('white');
		$('.nav-invest a').removeClass('white');
		$('.nav-plan a').removeClass('white');
		$("#planimg").removeClass('activeplan');
		$("#Investimg").removeClass('activeinvest');
		//$("#Reviewimg").removeClass('activereview');
		//$("#Reportsimg").removeClass('activereports');
		//$("#Resourcesimg").removeClass('activeresource');
		// Resetting selected client when user clicks on Client Info icon on top navigation bar
		//$("#idSelectedClientName").empty();		
		//sessionStorage.removeItem("SELECTED_CLIENT_ID");
		//$(".top-nav-items").hide();
		$("#dashbord").empty();
		$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_clientinfo.html");
		$("#dashbord").load("clientInfo/viewCIDashboard.html");
	});
	
	// Plan Icon
	$("#planimg").hover( function(){
		$(this).addClass('');
	},
	function() {
		$(this).removeClass('');
	})
	.click(function() {
		$(this).toggleClass('activeplan');
		//change
		$("#planimg").attr('src',"../Common/assets/images/icons/2-A.png");
		$("#clientimg").attr('src',"../Common/assets/images/icons/1-B.png");
		$("#Investimg").attr('src',"../Common/assets/images/icons/3-B.png");
		//$("#Reviewimg").attr('src',"../Common/assets/images/icons/7-B.png");
		//$("#Reportsimg").attr('src',"../Common/assets/images/icons/4-B.png");
		//$("#Resourcesimg").attr('src',"../Common/assets/images/icons/5-B.png");
		//change
		$('.nav-plan a').addClass('white');
		$('.nav-invest a').removeClass('white');
		//$('.nav-reports a').removeClass('white');
		//$('.nav-review a').removeClass('white');
		//$('.nav-resources a').removeClass('white');
		$('.nav-client-info a').removeClass('white');
		$("#Investimg").removeClass('activeinvest');
		//$("#Reviewimg").removeClass('activereview');
		//$("#Reportsimg").removeClass('activereports');
		//$("#Resourcesimg").removeClass('activeresource');
		$("#clientimg").removeClass('activeclient');
		$("#dashbord").empty();
		$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_plan.html");
		// load Budget Management by default onclick on Plan icon
	/*	$(".dashboardheading").html("Financial Planning");
		$("#dashbord").load("plan/fp/viewFinancialDashboard.html");		*/
		
		//New Code enable disable Planning
		if(loggedUser != null || loggedClient != null){
		
		if((loggedUser != null && loggedUser.budgetManagementView === "Y") || (loggedClient != null && loggedClient.budgetManagementView === "Y")){
		$(".dashboardheading").html("Budget Management");
		$("#dashbord").load("plan/bm/viewBudgetDashboard.html");	
		}
		else if((loggedUser != null && loggedUser.goalPlanningView === "Y") || (loggedClient != null && loggedClient.goalPlanningView === "Y")){
		$(".dashboardheading").html("Goal Planning");
		$("#dashbord").load("plan/gp/viewGoal.html");	
		}
		else if((loggedUser != null && loggedUser.portfolioManagementView === "Y") || (loggedClient != null && loggedClient.portfolioManagementView === "Y")){
		$(".dashboardheading").html("Portfolio Management");
		$("#dashbord").load("plan/pm/viewPortfolioDashboard.html");	
		}
		else{
		$(".dashboardheading").html("Financial Planning");
		$("#dashbord").load("plan/fp/viewFinancialDashboard.html");		
		}
		}
		//===========END================
	});

	// Invest Icon	
/*	$("#Investimg").hover( function(){
		$(this).addClass('');
	},
	function() {
		$(this).removeClass('');
	})
	.click(function() {
		$(this).toggleClass('activeinvest');
		$('.nav-invest a').addClass('white');
		$('.nav-reports a').removeClass('white');
		$('.nav-review a').removeClass('white');
		$('.nav-resources a').removeClass('white');
		$('.nav-client-info a').removeClass('white');
		$('.nav-plan a').removeClass('white');
		$("#planimg").removeClass('activeplan');
		$("#Reviewimg").removeClass('activereview');
		$("#Reportsimg").removeClass('activereports');
		$("#Resourcesimg").removeClass('activeresource');
		$("#clientimg").removeClass('activeclient');
	});*/
	$('#Investimg').click(function(){
		sessionStorage.removeItem("SELECTED_GOAL_FOR_INVEST");
		sessionStorage.removeItem("INVEST_DATE");
		var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
		if(loggedUser != null){
		$.ajax({
			type: 'GET',
			async:false,
			
			url: serviceIP + '/clientservice/authenticateAdvisor?advisorUserId='+loggedUser.id,
			dataType: 'json',
			beforeSend: function (xhr){ 
				xhr.setRequestHeader('Authorization', "Bearer "+sessionStorage.getItem("sessionID"));
		    },
			success: function (data) {
				if (data.statusCode == 101) {
					bootbox.alert(data.message);
				} else if (data.statusCode == 201) {
					bootbox.alert("Please save your BSE Star MF Credentials under the MF section of My Business before proceeding");
				} else if(data.statusCode == 100) {
					$("#Investimg").attr('src',"../Common/assets/images/icons/3-A.png");
					$("#planimg").attr('src',"../Common/assets/images/icons/2-B.png");
					$("#clientimg").attr('src',"../Common/assets/images/icons/1-B.png");
					//$("#Reviewimg").attr('src',"../Common/assets/images/icons/7-B.png");
					//$("#Reportsimg").attr('src',"../Common/assets/images/icons/4-B.png");
					//$("#Resourcesimg").attr('src',"../Common/assets/images/icons/5-B.png");
					$('.nav-invest a').addClass('white');
					//$('.nav-reports a').removeClass('white');
					//$('.nav-review a').removeClass('white');
					//$('.nav-resources a').removeClass('white');
					$('.nav-client-info a').removeClass('white');
					$('.nav-plan a').removeClass('white');
					
					$("#dashbord").empty();
					$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_invest.html");
					$("#dashbord").load("invest/viewInvestDashboard.html");
				}
			},
			error: function (jqXHR,data) {
				if(jqXHR.status == 401){
		    	//msg = 'You are not authorized to access this data.';
		    	bootbox.alert({
		    	    message: "You are not authenticated",
		    	    callback: function () {
		        	  window.location = "../index.html";
		        		
		    	    }
		    	})
		      }
			}
		});
	 }
	});
	// Review Icon	
	/*$("#Reviewimg").hover( function(){
		$(this).addClass('');
	},
	function() {
		$(this).removeClass('');
	})
	.click(function() {
		$(this).toggleClass('activereview');
		//change
		$("#Reviewimg").attr('src',"../Common/assets/images/icons/7-A.png");
		$("#planimg").attr('src',"../Common/assets/images/icons/2-B.png");
		$("#clientimg").attr('src',"../Common/assets/images/icons/1-B.png");
		$("#Investimg").attr('src',"../Common/assets/images/icons/3-B.png");
		$("#Reportsimg").attr('src',"../Common/assets/images/icons/4-B.png");
		$("#Resourcesimg").attr('src',"../Common/assets/images/icons/5-B.png");
		//change
		$('.nav-review a').addClass('white');
		$('.nav-reports a').removeClass('white');
		$('.nav-resources a').removeClass('white');
		$('.nav-client-info a').removeClass('white');
		$('.nav-invest a').removeClass('white');
		$('.nav-plan a').removeClass('white');
		$("#planimg").removeClass('activeplan');
		$("#Investimg").removeClass('activeinvest');
		$("#Reportsimg").removeClass('activereports');
		$("#Resourcesimg").removeClass('activeresource');
		$("#clientimg").removeClass('activeclient');
	});
	
	// Reports Icon	
	$("#Reportsimg").hover( function(){
		$(this).addClass('hoverreports');
	},
	function() {
		$(this).removeClass('hoverreports');
	})
	.click(function() {
		$(this).toggleClass('activereports');
		$("#Reportsimg").attr('src',"../Common/assets/images/icons/4-A.png");
		$("#planimg").attr('src',"../Common/assets/images/icons/2-B.png");
		$("#clientimg").attr('src',"../Common/assets/images/icons/1-B.png");
		$("#Investimg").attr('src',"../Common/assets/images/icons/3-B.png");
		$("#Reviewimg").attr('src',"../Common/assets/images/icons/7-B.png");
		$("#Resourcesimg").attr('src',"../Common/assets/images/icons/5-B.png");
		$('.nav-reports a').addClass('white');
		$('.nav-resources a').removeClass('white');
		$('.nav-client-info a').removeClass('white');
		$('.nav-review a').removeClass('white');
		$('.nav-invest a').removeClass('white');
		$('.nav-plan a').removeClass('white');
		$("#planimg").removeClass('activeplan');
		$("#Investimg").removeClass('activeinvest');
		$("#Reviewimg").removeClass('activereview');
		$("#Resourcesimg").removeClass('activeresource');
		$("#clientimg").removeClass('activeclient');
		$("#dashbord").empty();
		$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_reports.html");
		//$("#idreports").load("reports/latestReports/abcreports.html");
		$(".dashboardheading").html("Reports");
		$("#dashbord").load("reports/latestReports.html");	
	});
	
	// Resource Icon	
	$("#Resourcesimg").hover( function(){
		$(this).addClass('');
	},
	function() {
		$(this).removeClass('');
	})
	.click(function() {
		$(this).toggleClass('activeresource');
		$(".headingforresources").show();
		$("#Resourcesimg").attr('src',"../Common/assets/images/icons/5-A.png");
		$("#planimg").attr('src',"../Common/assets/images/icons/2-B.png");
		$("#clientimg").attr('src',"../Common/assets/images/icons/1-B.png");
		$("#Investimg").attr('src',"../Common/assets/images/icons/3-B.png");
		$("#Reviewimg").attr('src',"../Common/assets/images/icons/7-B.png");
		$("#Reportsimg").attr('src',"../Common/assets/images/icons/4-B.png");
		$('.nav-resources a').addClass('white');
		$('.nav-client-info a').removeClass('white');
		$('.nav-reports a').removeClass('white');
		$('.nav-review a').removeClass('white');
		$('.nav-invest a').removeClass('white');
		$('.nav-plan a').removeClass('white');
		$("#planimg").removeClass('activeplan');
		$("#Investimg").removeClass('activeinvest');
		$("#Reviewimg").removeClass('activereview');
		$("#Reportsimg").removeClass('activereports');
		$("#clientimg").removeClass('activeclient');
		$("#dashbord").empty();
		$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_resources.html");
		$(".dashboardheading").html("Resources");
		$("#dashbord").load("resources/productCalculator.html");	
	});

	$(".sidebar-icon-profile").hover( function(){
		$(this).addClass('hovericon_profile');
	},
	function() {
		$(this).removeClass('hovericon_profile');
	})
	.click(function() {
		$(this).toggleClass('activeicon_profile');
		$("#planimg").removeClass('activeplan');
		$("#Investimg").removeClass('activeinvest');
		$("#Reviewimg").removeClass('activereview');
		$("#Reportsimg").removeClass('activereports');
		$("#Resourcesimg").removeClass('activeresource');
	});*/
	
/*	$("#clientimg").click(function(){
		$("#dashbord").empty();
		$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_clientinfo.html");
		$(".dashboardheading").html("Client List");
		$("#dashbord").load("clientInfo/viewCIDashboard.html");
	});
		
	$("#planimg").click(function(){
		$("#dashbord").empty();
		$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_plan.html");
		// load Budget Management by default onclick on Plan icon
		$(".dashboardheading").html("Budget Management");
		$("#dashbord").load("plan/bm/viewBudgetDashboard.html");	
	});
	
	$("#Reportsimg").click(function(){
		$("#dashbord").empty();
		$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_reports.html");
		//$("#idreports").load("reports/latestReports/abcreports.html");
		$(".dashboardheading").html("Reports");
		$("#dashbord").load("reports/latestReports.html");	
	});
	
	$("#Resourcesimg").click(function(){
		$("#dashbord").empty();
		$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_resources.html");
		$(".dashboardheading").html("Resources");
		$("#dashbord").load("resources/productCalculator.html");	
	});
*/
	
	$(".existingclient").click(function(){
		//$("#dashbord").empty();
		$(".form-section-container").css("height","auto");
		$("#sidebar-wrapper").load("../Common/partials/myclient_sidebar_clientinfo.html");
		$(".dashboardheading").html("Client List");
		$("#dashbord").load("clientInfo/viewCIDashboard.html");	
		$("#idClient").empty();
		$("#idClient").load("clientInfo/viewClient.html");	
		// Resetting selected client when user clicks on Existing Client
		$("#idSelectedClientName").empty();		
		sessionStorage.removeItem("SELECTED_CLIENT_ID");
		$(".top-nav-items").hide();
		$("#clientimg").addClass('activeicon_profile');
		$("#clientimg").attr('src',"../Common/assets/images/icons/1-A.png");
		$("#planimg").attr('src',"../Common/assets/images/icons/2-B.png");
		$("#Investimg").attr('src',"../Common/assets/images/icons/3-B.png");
		//$("#Reviewimg").attr('src',"../Common/assets/images/icons/7-B.png");
		//$("#Reportsimg").attr('src',"../Common/assets/images/icons/4-B.png");
		//$("#Resourcesimg").attr('src',"../Common/assets/images/icons/5-B.png");
		$('.nav-client-info a').addClass('white');
		//$('.nav-resources a').removeClass('white');
		//$('.nav-reports a').removeClass('white');
		//$('.nav-review a').removeClass('white');
		$('.nav-invest a').removeClass('white');
		$('.nav-plan a').removeClass('white');
                 
       
		$("#clientimg").removeClass('activeclient');
		$("#planimg").removeClass('activeplan');
		$("#Investimg").removeClass('activeinvest');
		//$("#Reviewimg").removeClass('activereview');
		//$("#Reportsimg").removeClass('activereports');
		//$("#Resourcesimg").removeClass('activeresource');
		
		$("#profile").hide();
		
	});
	
	$("#idChangPassword").click(function () {
        $("#sidebar-wrapper").hide();
        $("#wrapper").hide();
        $("#mySidenav").hide();
        $("#id_change_password").show();
        $("#idChangPassword").hide();
        $("#id_change_password").load("../Common/partials/myclient_change_password.html");
    })
});

$("#idAdminPanel").on("click", function(event) {
	
	sessionStorage.removeItem("LOGGED_IN_USER");
	var loggedAdmin = sessionStorage.getItem("Logged_Admin");
	//alert(loggedAdmin.id);
	sessionStorage.setItem("LOGGED_IN_USER", loggedAdmin);
	
	window.location = "adminDashboard.html";
	
	
});

$(".report_customize").click(function(){
                 //alert('click');
                 $("#idBuinessReports").empty();
                 $("#idBuinessReports").load("reportsCustomization/reportCustomize.html");
                 $(".dashboardheading").html("Customize Report Templates");
                 $("#wrapper").css("height","auto");
                 $("#dashbord").css("height","auto");
                 $('.editicon').show();
                 $('.addicon').show();
                 $(".form-section-container").css("height","auto");
                 $('.deleteicon').addClass('btn_Disabled');
   });

$(".recom_temp").click(function(){
                 //alert('click');
                 $("#idBuinessReports").empty();
                 $("#idBuinessReports").load("reportsCustomization/reportRecommendation.html");
                 $(".dashboardheading").html("Output Reports Recommendation Templates");
                 $("#wrapper").css("height","auto");
                 $("#dashbord").css("height","auto");
                 $('.editicon').show();
                 $('.addicon').show();
                 $(".form-section-container").css("height","auto");
                 $('.deleteicon').addClass('btn_Disabled');
   });



  $('.sidebar-nav li a').click(function(){
     $('.mandatory').hide();
  });
				
  $(".addicon").click(function(){
   $('.mandatory').show();
  });

  $(".editicon").click(function(){
   $('.mandatory').show();
  });

  $('.sidebar-nav.nav-stacked>li.has-submenu').click(function(){
    $('.editicon').show();
    $('.editicon').addClass('btn_Disabled');
    $('.addicon').show();
    $('.deleteicon').show();
  })


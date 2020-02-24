$(".subscription_packages").click(function(){
                 //alert('click');
                 $("#idBuinessMasters").empty();
                 $("#idBuinessMasters").load("finexaSubscription/viewSubscriptionpackages.html");
                 $(".dashboardheading").html("Subscription Packages");
                 $("#wrapper").css("height","auto");
                 $("#dashbord").css("height","auto");
                 $('.editicon').show(); 
                 $('.addicon').hide();
                 $(".form-section-container").css("height","auto");
                 $('.deleteicon').addClass('btn_Disabled');
                 $('.addicon').hide();
                 $('.addicon').hide();
                });

/*
$(".subscription_history").click(function(){
                 //alert('click');
                 $("#idBuinessMasters").empty();
                 $("#idBuinessMasters").load("finexaSubscription/viewSubscriptionhistory.html");
                 $(".dashboardheading").html("Subscription History");
                 $("#wrapper").css("height","auto");
                 $("#dashbord").css("height","auto");
                 $('.editicon').show(); 
                 $('.addicon').hide();
                 $(".form-section-container").css("height","auto");
                 $('.deleteicon').addClass('btn_Disabled');
                });

*/



  


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


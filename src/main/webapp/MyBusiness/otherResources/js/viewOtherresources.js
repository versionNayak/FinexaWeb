$(".standard_email_templates").click(function(){
                 //alert('click');
                 $("#idBuinessMasters").empty();
                 $("#idBuinessMasters").load("otherResources/viewStandardemailtemplates.html");
                 $(".dashboardheading").html("Standard Email Templates");
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


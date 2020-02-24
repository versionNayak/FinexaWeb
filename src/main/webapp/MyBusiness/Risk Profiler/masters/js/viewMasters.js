  $(".risk_profile_master").click(function(){
                 $("#idBuinessMasters").empty();
                 $("#idBuinessMasters").load("../MyBusiness/masters/riskProfileMaster.html");
                 $(".dashboardheading").html("View Risk Profile Master");
                 $("#wrapper").css("height","auto");
                 $("#dashbord").css("height","auto");
                 $(".form-section-container").css("height","auto");
                 $('.deleteicon').addClass('btn_Disabled');
                });

				
  
$(document).ready(function() {
    /**********Accord Dashboard*****/
    $(".clientMonitoringDashboard").click(function() {
        $("#idClientDetails").empty();
        $("#headIcon").empty();

        $("#wrapper").css("height", "auto");
        $(".form-section-container").css("height", "auto");
        $(".dashboardheading").html("Accord Dashboard");
        $("#idClientDetails").load("Client_Monotoring/clientDelete.html");


    });

  
  
});
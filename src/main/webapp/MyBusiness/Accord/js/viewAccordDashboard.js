$(document).ready(function() {
    /**********Accord Dashboard*****/
    $(".accordDashboard").click(function() {

        $("#idAccordMaster").empty();
        $("#headIcon").empty();

        $("#wrapper").css("height", "auto");
        $(".form-section-container").css("height", "auto");
        $(".dashboardheading").html("Accord Dashboard");
        $("#idAccordMaster").load("Accord/accord_dashboard.html");


    });

    /********** Trending *****/
    $(".activeTrending").click(function() {
        $("#idAccordMaster").empty();
        $("#mandatory-field-msg").hide();
        $("#headIcon").empty();

        $("#wrapper").css("height", "auto");
        $(".form-section-container").css("height", "auto");
        $(".dashboardheading").html("Trending");


    });
    /**********No Nav Data*****/
    $(".NoNavData").click(function() {
        $("#idAccordMaster").empty();
        $("#mandatory-field-msg").hide();
        $("#headIcon").empty();

        $("#wrapper").css("height", "auto");
        $(".form-section-container").css("height", "auto");
        $(".dashboardheading").html("No Nav Data");
        $("#idAccordMaster").load("Accord/NoNavData.html");

    });


});
//New Code enable disable Planning
var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
var loggedClient;
if (loggedUser == null) {
    loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
} else {
    loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
}
if (loggedUser == null && loggedClient != null) {
    vClientId = loggedClient.id;
}

if (loggedUser != null || loggedClient != null) {

    if (((loggedUser != null) && (loggedUser.budgetManagementView === null || loggedUser.budgetManagementView === "N")) || ((loggedClient != null) && (loggedClient.budgetManagementView === null || loggedClient.budgetManagementView === "N"))) {
        $("#menu #IDmenuBudget").hide();
    } else {
        $("#menu #IDmenuBudget").show();
    }

    if (((loggedUser != null) && (loggedUser.goalPlanningView === null || loggedUser.goalPlanningView === "N")) || ((loggedClient != null) && (loggedClient.goalPlanningView === null || loggedClient.goalPlanningView === "N"))) {
        $("#menu #IDmenuGoal").hide();
    } else {
        $("#menu #IDmenuGoal").show();
    }

    if (((loggedUser != null) && (loggedUser.portfolioManagementView === null || loggedUser.portfolioManagementView === "N")) || ((loggedClient != null) && (loggedClient.portfolioManagementView === null || loggedClient.portfolioManagementView === "N"))) {
        $("#menu #IDmenuPortfolio").hide();
    } else {
        $("#menu #IDmenuPortfolio").show();
    }

    if (((loggedUser != null) && (loggedUser.financialPlanningView === null || loggedUser.financialPlanningView === "N")) || ((loggedClient != null) && (loggedClient.financialPlanningView === null || loggedClient.financialPlanningView === "N"))) {
        $("#menu #IDmenuFinancial").hide();
    } else {
        $("#menu #IDmenuFinancial").show();
    }
}
//=========END=========================
// $("#menu-toggle").on("click", function(e) {
//     "use strict";
//     e.preventDefault();
//     $("#wrapper").toggleClass("toggled");
// });
// $("#menu-toggle-2").on("click", function(e) {
//     "use strict";
//     e.preventDefault();
//     $("#wrapper").toggleClass("toggled-2");
//     $("#sidebar-toggle-button-wrapper").toggleClass("toggled-2");
//     $("#sidebar-toggle-top-menu-left-wrapper").toggleClass("toggled-2");
//     $("#menu li").removeClass("expanded");
//     $("#menu ul").hide();
// });

// function initMenu() {
//     "use strict";
//     $("#menu ul").hide();
//     $("#menu ul").children(".current").parent().show();
//     $("#menu li a").on("click", function() {
//         var $this = $(this);
//         var checkElement = $this.next();
//         var listItem = $this.closest("li");
//         if ((checkElement.is("ul")) && (checkElement.is(":visible"))) {
//             checkElement.slideUp("normal");
//             listItem.removeClass("expanded");
//             return false;
//         }
//         if ((checkElement.is("ul")) && (!checkElement.is(":visible"))) {
//             $("#menu ul:visible").slideUp("normal");
//             $("#menu li").removeClass("expanded");
//             checkElement.slideDown("normal");
//             listItem.addClass("expanded");
//             return false;
//         }
//     });
// }
$(document).ready(function() {
    "use strict";
    initMenu();

    $("#idGoalOptions").hide();


    $(".addactive").click(function() {
        $(".budgetdash,.budgetinput,.budgetplanning,.financialInput,.financialdash,.financialplanning,.portfoliodash,.portfolioinput,.portfolioplanning,.inputplanning,.goaldash,.goalplanning").removeClass('activeitem');
        $(".budgetdash_arrow").hide();
        $(".budgetinput_arrow").hide();
        $(".budgetplanning_arrow").hide();
        $(".financialdash_arrow").hide();
        $(".financialInput_arrow").hide();
        $(".financialplanning_arrow").hide();
        $(".portfoliodash_arrow").hide();
        $(".portfolioinput_arrow").hide();
        $(".portfolioplanning_arrow").hide();
        $(".goalinput_arrow").hide();
        $(".goaldash_arrow").hide();
        $(".goalplanning_arrow").hide();

        $(".dashboardheading").html("Budget Planning Report");
        $("#wrapper").css("height", "auto");
        $("#dashbord").empty();
        $("#dashbord").css("height", "483px");
        $("#dashbord").load("plan/bm/viewBudgetDashboard.html");
    });
    $(".activeincome").click(function() {

        $(".budgetdash,.budgetinput,.budgetplanning,.financialInput,.financialdash,.financialplanning,.portfoliodash,.portfolioinput,.portfolioplanning,.inputplanning,.goaldash,.goalplanning").removeClass('activeitem');
        $(".budgetdash_arrow").hide();
        $(".budgetinput_arrow").hide();
        $(".budgetplanning_arrow").hide();
        $(".financialdash_arrow").hide();
        $(".financialInput_arrow").hide();
        $(".financialplanning_arrow").hide();
        $(".portfoliodash_arrow").hide();
        $(".portfolioinput_arrow").hide();
        $(".portfolioplanning_arrow").hide();
        $(".goalinput_arrow").hide();
        $(".goaldash_arrow").hide();
        $(".goalplanning_arrow").hide();
    });
    $(".activeloans").click(function() {
        $(".budgetdash,.budgetinput,.budgetplanning,.financialInput,.financialdash,.financialplanning,.portfoliodash,.portfolioinput,.portfolioplanning,.inputplanning,.goaldash,.goalplanning").removeClass('activeitem');
        $(".budgetdash_arrow").hide();
        $(".budgetinput_arrow").hide();
        $(".budgetplanning_arrow").hide();
        $(".financialdash_arrow").hide();
        $(".financialInput_arrow").hide();
        $(".financialplanning_arrow").hide();
        $(".portfoliodash_arrow").hide();
        $(".portfolioinput_arrow").hide();
        $(".portfolioplanning_arrow").hide();
        $(".goalinput_arrow").hide();
        $(".goaldash_arrow").hide();
        $(".goalplanning_arrow").hide();

        $(".dashboardheading").html("Portfolio Analysis");
        $("#wrapper").css("height", "auto");
        $("#dashbord").empty();
        $("#dashbord").css("height", "483px");
        // $("#dashbord").load("plan/pm/viewPortfolioTracker.html");
        $("#dashbord").load("plan/pm/viewPortfolioDashboard.html");
    });
    $(".activeportfolio").click(function() {
        $(".budgetdash,.budgetinput,.budgetplanning,.financialInput,.financialdash,.financialplanning,.portfoliodash,.portfolioinput,.portfolioplanning,.inputplanning,.goaldash,.goalplanning").removeClass('activeitem');
        $(".budgetdash_arrow").hide();
        $(".budgetinput_arrow").hide();
        $(".budgetplanning_arrow").hide();
        $(".financialdash_arrow").hide();
        $(".financialInput_arrow").hide();
        $(".financialplanning_arrow").hide();
        $(".portfoliodash_arrow").hide();
        $(".portfolioinput_arrow").hide();
        $(".portfolioplanning_arrow").hide();
        $(".goalinput_arrow").hide();
        $(".goaldash_arrow").hide();
        $(".goalplanning_arrow").hide();

        $(".dashboardheading").html("Financial Planning");
        $("#wrapper").css("height", "auto");
        $("#dashbord").empty();
        $("#dashbord").css("height", "483px");
        $("#dashbord").load("plan/fp/viewFinancialDashboard.html");

        $(".fplantofaction").removeClass("activeitem");
        $(".pfinancialplan").removeClass("activeitem");
        $(".pfnetsurplus").addClass("activeitem");
        $(".pfnetworth").removeClass("activeitem");
        $(".pffinancialratio").removeClass("activeitem");
        $(".fpriskprofile").removeClass("activeitem");
        $(".fpgoalrecommendations").removeClass("activeitem");
        $(".fpassetallocation").removeClass("activeitem");
        $(".fpcontigencyfund").removeClass("activeitem");
        $(".fpinsuranceplanning").removeClass("activeitem");
        $(".fpcashflows").removeClass("activeitem");
        $(".fpgoalexecution").removeClass("activeitem");
    });







    $(".nestedpersonalp .budgetdash").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".budgetdash_arrow").show();
            $(".budgetinput_arrow,.budgetplanning_arrow").hide();
            $(".nestedpersonalp .budgetinput, .nestedpersonalp .budgetplanning").removeClass("activeitem");
        });
    $(".nestedpersonalp .budgetinput").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".budgetinput_arrow").show();
            $(".budgetdash_arrow,.budgetplanning_arrow").hide();
            $(".nestedpersonalp .budgetplanning,.nestedpersonalp .budgetdash").removeClass("activeitem");
        });
    $(".nestedpersonalp .budgetplanning").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {


            $(this).toggleClass('activeitem');
            $("#wrapperdata").show();










            $(".budgetplanning_arrow").show();
            $(".budgetdash_arrow, .budgetinput_arrow").hide();
            $(".nestedpersonalp .budgetinput, .nestedpersonalp .budgetdash").removeClass("activeitem");
        });
    $(".nestedincome .goaldash").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".goaldash_arrow").show();
            $(".goalinput_arrow,.goalplanning_arrow").hide();
            $(".nestedincome .inputplanning,.nestedincome .goalplanning").removeClass("activeitem");
        });
    $(".nestedincome .inputplanning").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".goalinput_arrow").show();
            $(".goaldash_arrow,.goalplanning_arrow").hide();
            $(".nestedincome .goalplanning,.nestedincome .goaldash").removeClass("activeitem");
        });
    $(".nestedincome .goalplanning").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $("#goalsection").show();
            $("#budgetsection").hide();
            $(".goalplanning_arrow").show();
            $(".goaldash_arrow,.goalinput_arrow").hide();
            $(".nestedincome .inputplanning,.nestedincome .goaldash").removeClass("activeitem");
        });
    $(".nestedportfolio .portfoliodash").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".portfoliodash_arrow").show();
            $(".portfolioplanning_arrow,.portfolioinput_arrow").hide();
            $(".nestedportfolio .portfolioinput,.nestedportfolio .portfolioplanning").removeClass("activeitem");
        });
    $(".nestedportfolio .portfolioinput").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".portfolioinput_arrow").show();
            $(".portfoliodash_arrow,.portfolioplanning_arrow").hide();
            $(".nestedportfolio .portfoliodash,.nestedportfolio .portfolioplanning").removeClass("activeitem");
        });
    $(".nestedportfolio .portfolioplanning").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".portfolioplanning_arrow").show();
            $(".portfoliodash_arrow,.portfolioinput_arrow").hide();
            $(".nestedportfolio .portfoliodash,.nestedportfolio .portfolioinput").removeClass("activeitem");
        });
    $(".nestedfinancial .financialdash").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".financialdash_arrow").show();
            $(".financialplanning_arrow,.financialInput_arrow").hide();
            $(".nestedfinancial .financialInput,.nestedfinancial .financialplanning").removeClass("activeitem");
        });
    $(".nestedfinancial .financialInput").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".financialInput_arrow").show();
            $(".financialdash_arrow,.financialplanning_arrow").hide();
            $(".nestedfinancial .financialdash,.nestedfinancial .financialplanning").removeClass("activeitem");
        });
    $(".nestedfinancial .financialplanning").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".financialplanning_arrow").show();
            $(".financialdash_arrow,.financialInput_arrow").hide();
            $(".nestedfinancial .financialInput,.nestedfinancial .financialdash").removeClass("activeitem");
        });
});
/*********Code Change By Debolina on 25thOct,2017 *****/
// $(".nestedincome .goalplanning").click(function(){
// if (goalId == null) {
// bootbox.alert("Please Select a Proper Goal",
// function(){

// console.log('This was logged in the callback!');
// $(".dashboardheading").html("Goal Details");
// $("#wrapper").css("height","auto");
// $("#dashbord").empty();
// $("#dashbord").css("height","483px");
// //change
// $("#dashbord").load("plan/gp/viewGoal.html");

// $(".goaldash_arrow").show();
// $(".goalinput_arrow,.goalplanning_arrow").hide();
// $(".goaldash").toggleClass('activeitem');
// $(".nestedincome .inputplanning,.nestedincome .goalplanning").removeClass("activeitem");


// });
// } else {
// $(".dashboardheading").html("Goal Planning Report");
// $("#wrapper").css("height","auto");
// $("#dashbord").empty();
// $("#dashbord").css("height","483px");
// $("#dashbord").load("plan/gp/viewGPDashboard.html");
// }

// });
/**********************Goal Planning navigation added *******************/
$(".nestedincome .goaldash").click(function() {
    $("#idGoalOptions").hide();
    $(".yearly").removeClass("activeitem");
    $(".goalsdetails").removeClass("activeitem");
    $(".riskprofile").removeClass("activeitem");
    $(".amount").removeClass("activeitem");
    $(".product").removeClass("activeitem");
    $(".goalinput").removeClass("activeitem");
    $(".recommended").removeClass("activeitem");
    // checking risk profile of client
    var riskProfile = 0;
    $.ajax({
        type: 'GET',
        url: REQUEST_URL_GP + '/getClientRiskInfo?clientId=' + vClientId,
        async: false,
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + sessionStorage.getItem("sessionID"));
        },
        success: function(data) {
            riskProfile = parseInt(data.riskProfile);
            if (riskProfile == 0) {
                bootbox.alert("Please Enter Risk Profile Of The Client");
            }
        },
        error: function(data) {
            // alert("error from Expense : getAnnualExpensesDetailed");
            // bootbox.alert("Failed to get Risk Details");
        }

    });
    goalId = null; // in the dashboard page everything should be initialized to be null
    $(".dashboardheading").html("Goal Details");
    $("#wrapper").css("height", "auto");
    $("#dashbord").empty();
    $("#dashbord").css("height", "483px");
    $("#dashbord").load("plan/gp/viewGoal.html");
});
/*********Code Change By Debolina End on 25thOct,2017 *****/

$(".nestedpersonalp .budgetplanning").click(function() {
    $(".dashboardheading").html("Budget Planning Report");
    $("#wrapper").css("height", "auto");
    $("#dashbord").empty();
    $("#dashbord").css("height", "483px");
    $("#dashbord").load("plan/bm/viewBudgetDashboard.html");


});
$(".nestedportfolio .portfolioplanning").click(function() {
    $(".dashboardheading").html("Portfolio Analysis");
    $("#wrapper").css("height", "auto");
    $("#dashbord").empty();
    $("#dashbord").css("height", "483px");
    // $("#dashbord").load("plan/pm/viewPortfolioTracker.html");
    $("#dashbord").load("plan/pm/viewPortfolioDashboard.html");

});
$(".nestedfinancial .financialplanning").click(function() {
    var riskProfile = 0;
    $.ajax({
        type: 'GET',
        url: REQUEST_URL_GP + '/getClientRiskInfo?clientId=' + vClientId,
        async: false,
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + sessionStorage.getItem("sessionID"));
        },
        success: function(data) {
            riskProfile = parseInt(data.riskProfile);
            if (riskProfile == 0) {
                bootbox.alert("Please Enter Risk Profile Of The Client");
            }
        },
        error: function(data) {
            // alert("error from Expense : getAnnualExpensesDetailed");
            // bootbox.alert("Failed to get Risk Details");
        }

    });
    $(".dashboardheading").html("Financial Planning");
    $("#wrapper").css("height", "auto");
    $("#dashbord").empty();
    $("#dashbord").css("height", "483px");
    $("#dashbord").load("plan/fp/viewFinancialDashboard.html");

});


/***************Hide Nav bar and populate the options in sidebar menu***************/
/*****************************Author Arghya*****************************************/
/*****************************Budget Management*****************************************/
$(".Income").click(function() {
    //$("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/bm/viewIncome.html");
    $(".dashboardheading").html("Budget Management");
    $(".form-section-container").css("padding", "24px 45px 94px 45px");
    $(".form-section-container").height("auto");
    $("#idHeading").html("Income");
    $("#dashbord").css("height", "485px");
    $(this).addClass('activeitem');
    $(".Expenses").removeClass("activeitem");
    $(".committed").removeClass("activeitem");
    $(".Loans").removeClass("activeitem");
    $(".NetSurplus").removeClass("activeitem");
    $(".BudgetRatio").removeClass("activeitem");
    $(".Recommendations").removeClass("activeitem");
    $(".form-section-container").css("padding", "24px 45px 99px 45px");
});
$(".Expenses").click(function() {
    //$("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/bm/viewExpenses.html");
    $(".dashboardheading").html("Budget Management");
    $(".form-section-container").css("padding", "24px 45px 94px 45px");
    $(".form-section-container").height("auto");
    $("#idHeading").html("Expenses");
    $("#dashbord").css("height", "485px");
    $(this).addClass("activeitem");
    $(".Income").removeClass("activeitem");
    $(".committed").removeClass("activeitem");
    $(".Loans").removeClass("activeitem");
    $(".NetSurplus").removeClass("activeitem");
    $(".BudgetRatio").removeClass("activeitem");
    $(".Recommendations").removeClass("activeitem");
    $(".form-section-container").css("padding", "24px 45px 94px 45px");
});
$(".committed").click(function() {
    //$("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/bm/viewCommitted.html");
    $(".dashboardheading").html("Budget Management");
    $(".form-section-container").css("padding", "24px 45px 94px 45px");
    $(".form-section-container").height("auto");
    $("#idHeading").html("Committed Outflow");
    $("#dashbord").css("height", "485px");
    $(this).addClass("activeitem");
    $(".Income").removeClass("activeitem");
    $(".Expenses").removeClass("activeitem");
    $(".Loans").removeClass("activeitem");
    $(".NetSurplus").removeClass("activeitem");
    $(".BudgetRatio").removeClass("activeitem");
    $(".Recommendations").removeClass("activeitem");
    $(".form-section-container").css("padding", "24px 45px 94px 45px");
});
$(".Loans").click(function() {
    //$("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/bm/viewLoans.html");
    $(".dashboardheading").html("Budget Management");
    $(".form-section-container").css("padding", "24px 45px 94px 45px");
    $(".form-section-container").height("auto");
    $("#idHeading").html("Loans");
    $("#dashbord").css("height", "485px");
    $(this).addClass("activeitem");
    $(".Income").removeClass("activeitem");
    $(".Expenses").removeClass("activeitem");
    $(".committed").removeClass("activeitem");
    $(".NetSurplus").removeClass("activeitem");
    $(".BudgetRatio").removeClass("activeitem");
    $(".Recommendations").removeClass("activeitem");
    $(".form-section-container").css("padding", "24px 45px 94px 45px");
});
$(".NetSurplus").click(function() {
    //$("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/bm/viewNetSurplus.html");
    $(".dashboardheading").html("Budget Management");
    $(".form-section-container").css("padding", "24px 45px 94px 45px");
    $(".form-section-container").height("auto");
    $("#idHeading").html("Net Surplus");
    $("#mySidenav").css("height", "44%");
    $(this).addClass("activeitem");
    $(".Income").removeClass("activeitem");
    $(".Expenses").removeClass("activeitem");
    $(".committed").removeClass("activeitem");
    $(".Loans").removeClass("activeitem");
    $(".BudgetRatio").removeClass("activeitem");
    $(".Recommendations").removeClass("activeitem");
    $(".form-section-container").css("padding", "24px 45px 94px 45px");
});
$(".BudgetRatio").click(function() {
    //$("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/bm/viewBudgetRatio.html");
    $(".dashboardheading").html("Budget Management");
    $(".form-section-container").css("padding", "24px 45px 116px");
    $(".form-section-container").height("auto");
    $("#idHeading").html("Budget Ratio");
    $("#mySidenav").css("height", "44%");
    $("#dashbord").css("height", "485px");
    $(this).addClass("activeitem");
    $(".Income").removeClass("activeitem");
    $(".Expenses").removeClass("activeitem");
    $(".committed").removeClass("activeitem");
    $(".Loans").removeClass("activeitem");
    $(".NetSurplus").removeClass("activeitem");
    $(".Recommendations").removeClass("activeitem");
    $(".form-section-container").css("padding", "24px 45px 70px 45px");
});
$(".Recommendations").click(function() {
    //$("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/bm/viewRecommended.html");
    $(".dashboardheading").html("Budget Management");
    $(".form-section-container").css("padding", "24px 45px 81px");
    $(".form-section-container").height("auto");
    $("#idHeading").html("Budget Recommendations");
    $("#dashbord").css("height", "485px");
    $(this).addClass("activeitem");
    $(".Income").removeClass("activeitemmm");
    $(".Expenses").removeClass("activeitem");
    $(".committed").removeClass("activeitem");
    $(".Loans").removeClass("activeitem");
    $(".BudgetRatio").removeClass("activeitem");
    $(".NetSurplus").removeClass("activeitem");
    $(".form-section-container").css("padding", "24px 45px 32px 45px");
});

/*****************************Portfolio Management*****************************************/
$(".pmRiskProfile").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/pm/viewPortfolioRiskProfile.html");
    $(".dashboardheading").html("Portfolio Analysis");
    $("#idHeading").html("Risk Profile");
    $("#dashbord").css("height", "485px");
    $(".form-section-container").css("height", "41em");
    $(this).addClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmloans").removeClass("activeitem");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmratios").removeClass("activeitem");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
});


$(".pmtracker").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/pm/viewPortfolioTracker.html");
    $(".dashboardheading").html("Portfolio Analysis");
    $("#idHeading").html("Portfolio Tracker");
    $("#dashbord").css("height", "485px");
    $(".form-section-container").css("height", "41em");
    $(".pmsidenav").css("height", "64%");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmloans").removeClass("activeitemm");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmratios").removeClass("activeitem");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
});


$(".pmloans").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    if (loggedUser != null) {
        $("#idBody").load("plan/pm/viewPortfolioLoans.html");
        $(".dashboardheading").html("Portfolio Analysis");
    } else {
        if (loggedClient != null) {
            $("#idBody").load("plan/pm/viewPortfolioLoansClient.html");
            $(".dashboardheading").html("Portfolio Analysis"); //For Client portal
        }
    }

    $("#idHeading").html("Loans");
    $(".form-section-container").css("height", "41em");
    //$(".form-section-container").css("padding","27px 45px 101px");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "64%");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmratios").removeClass("activeitemm");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
});

$(".pmnetworth").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/pm/viewPortfolioNetworth.html");
    $(".dashboardheading").html("Portfolio Analysis");
    $("#idHeading").html("Net Worth");
    $("#dashbord").css("height", "485px");
    $(".form-section-container").css("height", "41em");
    $(".pmsidenav").css("height", "64%");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmloans").removeClass("activeitem");
    $(".pmratios").removeClass("activeitem");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
});


$(".pmratios").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/pm/viewPortfolioRatio.html");
    $(".dashboardheading").html("Portfolio Analysis");
    $("#idHeading").html("Ratios");
    $("#dashbord").css("height", "485px");
    $(".form-section-container").css("height", "41em");
    $(".pmsidenav").css("height", "64%");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmloans").removeClass("activeitem");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
});

$(".pmassetallocation").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    if (loggedUser != null) {
        $("#idBody").load("plan/pm/viewPortfolioAssetAllocation.html");
        $(".dashboardheading").html("Portfolio Analysis");
    } else {
        if (loggedClient != null) {
            $("#idBody").load("plan/pm/viewPortfolioAssetAllocationForClientPortal.html");
            $(".dashboardheading").html("Portfolio Analysis"); //For Client portal
        }
    }

    $("#idHeading").html("Asset Allocation Review");
    $(".form-section-container").css("padding", "27px 45px 101px");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "64%");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmloans").removeClass("activeitem");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmratios").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
});


$(".pmportfoliofxtincome").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/pm/viewPortfolioFixedIncome.html");
    $(".dashboardheading").html("Portfolio Analysis");
    $("#idHeading").html("Portfolio Overview - Debt");
    //$(".form-section-container").css("padding","27px 45px 112px");
    $(".form-section-container").css("height", "41em");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "64%");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmloans").removeClass("activeitem");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmratios").removeClass("activeitem");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
});




$(".pmportfolioequity").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/pm/viewPortfolioEquity.html");
    $(".dashboardheading").html("Portfolio Analysis");
    $("#idHeading").html("Portfolio Overview - Equity");
    $("#dashbord").css("height", "485px");
    $(".form-section-container").css("height", "41em");
    $(".pmsidenav").css("height", "64%");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmloans").removeClass("activeitem");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmratios").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
});

$(".pmportfoliorecom").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/pm/viewPortfolioRecommendation.html");
    $(".dashboardheading").html("Portfolio Analysis");
    $("#idHeading").html("Portfolio Recommendation");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "64%");
    $(".form-section-container").css("height", "41em");
    $(".pmportfoliorecom").removeClass("onclickbg");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmloans").removeClass("activeitem");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmratios").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
});

$(".pmproductrecom").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/pm/viewProductRecommend.html");
    $(".dashboardheading").html("Portfolio Analysis");
    $("#idHeading").html("Product Recommendation");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "64%");
    $(".form-section-container").css("height", "41em");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmloans").removeClass("activeitem");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmratios").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmadvisorrecommend").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");


});


$(".pmadvisorrecommend").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    //$("#idPMul").hide();
    $("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/pm/viewPortfolioAdvisorRecommendation.html");
    $(".dashboardheading").html("Portfolio Analysis");
    $("#idHeading").html("Advisor Recommendations");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "64%");
    $(".form-section-container").css("height", "41em");
    $(this).addClass("activeitem");
    $(".pmRiskProfile").removeClass("activeitem");
    $(".pmtracker").removeClass("activeitem");
    $(".pmloans").removeClass("activeitem");
    $(".pmnetworth").removeClass("activeitem");
    $(".pmratios").removeClass("activeitem");
    $(".pmportfoliofxtincome").removeClass("activeitem");
    $(".pmassetallocation").removeClass("activeitem");
    $(".pmportfolioequity").removeClass("activeitem");
    $(".pmproductrecom").removeClass("activeitem");
    $(".pmportfoliorecom").removeClass("activeitem");
});

/*****************************Financial Planning*****************************************/

$(".pfnetsurplus").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    if (loggedClient != null && loggedUser === null) {
        $("#idBody").empty();
        $("#idBody").load("plan/fp/viewFinancialNetsurplusForClientPortal.html");
    } else {
        $("#idBody").empty();
        $("#idBody").load("plan/fp/viewFinancialNetsurplus.html");
    }
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Net Surplus");
    $(".form-section-container").css("padding", "18px 45px 97px");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});


$(".pfnetworth").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/fp/viewFinancialNetworth.html");
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Net Worth");
    $(".form-section-container").css("padding", "27px 45px 101px");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});

$(".pffinancialratio").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/fp/viewFinancialRatio.html");
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Financial Ratios");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});


$(".fpriskprofile").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/fp/viewFinancialRiskProfile.html");
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Risk Profile");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});

$(".fpassetallocation").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    if (loggedClient != null && loggedUser === null) {
        $("#idBody").empty();
        $("#idBody").load("plan/fp/viewFinancialAssetAllocationForClientPortal.html");
    } else {
        $("#idBody").empty();
        $("#idBody").load("plan/fp/viewFinancialAssetAllocation.html");
    }
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Asset Allocation Review");
    $(".form-section-container").css("padding", "27px 45px 101px");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});


$(".fpgoalrecommendations").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    $("#idBody").empty();
    if (loggedClient != null && loggedUser === null) {
        $("#idBody").load("plan/fp/viewFinancialGoalRecommendationForClient.html");
        $(".dashboardheading").html("Financial Planning");
    } else {
        $("#idBody").load("plan/fp/viewFinancialGoalRecommendation.html");
        $(".dashboardheading").html("Financial Planning");
    }
    $("#idHeading").html("Goal Recommendation");
    $(".form-section-container").css("padding", "27px 45px 112px");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});

$(".fpgoalexecution").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/fp/viewFinancialGoalExecution.html");
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Goal Execution");
    $(".form-section-container").css("padding", "27px 45px 112px");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
});

$(".fpcontigencyfund").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/fp/viewContingencyFund.html");
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Contingency Fund");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});
$(".fpinsuranceplanning").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/fp/viewInsurancePlanning.html");
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Insurance Planning");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});

$(".fpcashflows").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/fp/viewFinancialCashflow.html");
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Cashflows");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fplantofaction").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});

$(".fplantofaction").click(function() {
    $("#idBMul").hide();
    $("#idGPul").hide();
    $("#idPMul").hide();
    //$("#idFPul").hide();
    $("#idBody").empty();
    $("#idBody").load("plan/fp/viewPlanofAction.html");
    $(".dashboardheading").html("Financial Planning");
    $("#idHeading").html("Plan of Action");
    $("#dashbord").css("height", "485px");
    $(".pmsidenav").css("height", "67%");
    $(this).addClass("activeitem");
    $(".pfinancialplan").removeClass("activeitem");
    $(".pfnetsurplus").removeClass("activeitem");
    $(".pfnetworth").removeClass("activeitem");
    $(".pffinancialratio").removeClass("activeitem");
    $(".fpriskprofile").removeClass("activeitem");
    $(".fpgoalrecommendations").removeClass("activeitem");
    $(".fpassetallocation").removeClass("activeitem");
    $(".fpcontigencyfund").removeClass("activeitem");
    $(".fpinsuranceplanning").removeClass("activeitem");
    $(".fpcashflows").removeClass("activeitem");
    $(".fpgoalexecution").removeClass("activeitem");
});
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
    // $(".addactive").click(function() {
    //     $(".investor,.schemeMaster,.dailyFeeds,.sipstpFeed,.navFeed,.brokerageFeed,.rdataImport,.aumReconciliation,.clientMaster,.familyMaster,.branchMaster,.rmMaster,.sbMaster,.faMaster,.mTransactions,.transReport,.realized_Gain_Report,.unrealized_Gain_Report,.dividendReport,.sip_stp_swpReport,.aumReport").removeClass('activeitem');
    //     $(".investor_arrow").hide();
    //     $(".schemeMaster_arrow").hide();
    //     $(".dailyFeeds_arrow").hide();
    //     $(".sipstpFeed_arrow").hide();
    //     $(".navfeed_arrow").hide();
    //     $(".brokerageFeed_arrow").hide();
    //     $(".rdataImport_arrow").hide();
    //     $(".aumReconciliation_arrow").hide();
    //     $(".clientMaster_arrow").hide();
    //     $(".familyMaster_arrow").hide();
    //     $(".branchMaster_arrow").hide();
    //     $(".rmMaster_arrow").hide();
    //     $(".sbMaster_arrow").hide();
    //     $(".faMaster_arrow").hide();
    //     $(".mTransactions_arrow").hide();
    //     $(".transReport_arrow").hide();
    //     $(".realized_Gain_arrow").hide();
    //     $(".unrealized_Gain_arrow").hide();
    //     $(".dividendReport_arrow").hide();
    //     $(".sip_stp_swpReport_arrow").hide();
    //     $(".aumReport_arrow").hide();
    // });
    /*$(".activeincome").click( function(){
    	$(".form-section-container").css("padding","18px 45px 600px");

    	$("#dashbord").empty();

    		$(".investor,.schemeMaster,.dailyFeeds,.sipstpFeed,.navFeed,.brokerageFeed,.rdataImport,.aumReconciliation,.clientMaster,.familyMaster,.branchMaster,.rmMaster,.sbMaster,.faMaster,.mTransactions,.transReport,.currentHolding,.dividendReport,.sip_stp_swpReport,.aumReport").removeClass('activeitem');
    	$(".investor_arrow").hide();
    	$(".schemeMaster_arrow").hide();
    	$(".dailyFeeds_arrow").hide();
    	$(".sipstpFeed_arrow").hide();
    	$(".navfeed_arrow").hide();
    	$(".brokerageFeed_arrow").hide();
    	$(".rdataImport_arrow").hide();
    	$(".aumReconciliation_arrow").hide();
    	$(".clientMaster_arrow").hide();
    	$(".familyMaster_arrow").hide();
    	$(".branchMaster_arrow").hide();
    	$(".rmMaster_arrow").hide();
    	$(".sbMaster_arrow").hide();
    	$(".faMaster_arrow").hide();
    	$(".mTransactions_arrow").hide();
    	$(".transReport_arrow").hide();
    	$(".currentHolding_arrow").hide();
    	$(".dividendReport_arrow").hide();
    	$(".sip_stp_swpReport_arrow").hide();
    	$(".aumReport_arrow").hide();
    });*/

    $(".reports").click(function() {
        $(".form-section-container").css("padding", "18px 45px 600px");
        alert("dsbkjvf");
        //$(".dashboardheading").html("Goal Planning Dashboard");
        //$("#dashbord").empty();
        //$("#dashbord").load("plan/gp/viewGPonload.html");
        $(".investor,.schemeMaster,.dailyFeeds,.sipstpFeed,.navFeed,.brokerageFeed,.rdataImport,.aumReconciliation,.clientMaster,.familyMaster,.branchMaster,.rmMaster,.sbMaster,.faMaster,.mTransactions,.transReport,.realized_Gain_Report,.unrealized_Gain_Report,.dividendReport,.sip_stp_swpReport,.aumReport").removeClass('activeitem');
        $(".investor_arrow").hide();
        $(".schemeMaster_arrow").hide();
        $(".dailyFeeds_arrow").hide();
        $(".sipstpFeed_arrow").hide();
        $(".navfeed_arrow").hide();
        $(".brokerageFeed_arrow").hide();
        $(".rdataImport_arrow").hide();
        $(".aumReconciliation_arrow").hide();
        $(".clientMaster_arrow").hide();
        $(".familyMaster_arrow").hide();
        $(".branchMaster_arrow").hide();
        $(".rmMaster_arrow").hide();
        $(".sbMaster_arrow").hide();
        $(".faMaster_arrow").hide();
        $(".mTransactions_arrow").hide();
        $(".transReport_arrow").hide();
        $(".realized_Gain_arrow").hide();
        $(".unrealized_Gain_arrow").hide();
        $(".dividendReport_arrow").hide();
        $(".sip_stp_swpReport_arrow").hide();
        $(".aumReport_arrow").hide();
    });


    $(".nestedpersonalp .investor").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".investor_arrow").show();
            $(".schemeMaster_arrow,.dailyfeeds_arrow,.sipstpFeed_arrow,.navfeed_arrow,.brokerageFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .schemeMaster,.nestedpersonalp .dailyFeeds,.nestedpersonalp .sipstpFeed,.nestedpersonalp .navFeed,.nestedpersonalp .brokerageFeed,.nestedpersonalp .rdataImport,.nestedpersonalp .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".nestedpersonalp .schemeMaster").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".schemeMaster_arrow").show();
            $(".investor_arrow,.dailyFeeds_arrow,.sipstpFeed_arrow,.navfeed_arrow,.brokerageFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .dailyFeeds,.nestedpersonalp .sipstpFeed,.nestedpersonalp .navFeed,.nestedpersonalp .brokerageFeed,.nestedpersonalp .rdataImport,.nestedpersonalp .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });
    $(".nestedpersonalp .dailyFeeds").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $("#wrapperdata").show();
            $(".dailyFeeds_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.sipstpFeed_arrow,.navfeed_arrow,.brokerageFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .sipstpFeed,.nestedpersonalp .navFeed,.nestedpersonalp .brokerageFeed,.nestedpersonalp .rdataImport,.nestedpersonalp .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".nestedpersonalp .navFeed").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $("#wrapperdata").show();
            $(".navfeed_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.sipstpFeed_arrow,.dailyFeeds_arrow,.brokerageFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .sipstpFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .brokerageFeed,.nestedpersonalp .rdataImport,.nestedpersonalp .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".nestedpersonalp .brokerageFeed").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $("#wrapperdata").show();
            $(".brokerageFeed_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.sipstpFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .sipstpFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .rdataImport,.nestedpersonalp .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".nestedpersonalp .sipstpFeed").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $("#wrapperdata").show();
            $(".sipstpFeed_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .rdataImport,.nestedpersonalp .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });


    $(".nestedpersonalp .rdataImport").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".rdataImport_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });
    $(".nestedpersonalp .aumReconciliation").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".aumReconciliation_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });
    $(".dataEntry .clientMaster").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".clientMaster_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });


    $(".dataEntry .familyMaster").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".familyMaster_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });



    $(".dataEntry .branchMaster").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".branchMaster_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.rmMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .rmMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".dataEntry .rmMaster").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".rmMaster_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.sbMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .sbMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".dataEntry .sbMaster").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".sbMaster_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".dataEntry .faMaster").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".faMaster_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .faMaster,.dataEntry .mTransactions,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".dataEntry .mTransactions").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".mTransactions_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .faMaster,.dataEntry .faMaster,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".reports .transReport").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".transReport_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.mTransactions_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .faMaster,.dataEntry .faMaster,.reports .mTransactions,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });

    $(".reports .realized_Gain_Report").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".realized_Gain_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .faMaster,.dataEntry .faMaster,.reports .transReport,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });
    $(".reports .unrealized_Gain_Report").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".unrealized_Gain_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .faMaster,.dataEntry .faMaster,.reports .transReport,.reports .dividendReport,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });
    $(".reports .dividendReport").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".dividendReport_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .faMaster,.dataEntry .faMaster,.reports .transReport,.reports .currentHolding,.reports .sip_stp_swpReport,.reports .aumReport").removeClass("activeitem");
        });


    $(".reports .sip_stp_swpReport").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".sip_stp_swpReport").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.aumReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .faMaster,.dataEntry .faMaster,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .aumReport").removeClass("activeitem");
        });
    $(".reports .aumReport").hover(function() {
                $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('activeitem');
            $(".aumReport_arrow").show();
            $(".investor_arrow,.schemeMaster_arrow,.brokerageFeed_arrow,.dailyFeeds_arrow,.navfeed_arrow,.sipstpFeed_arrow,.rdataImport_arrow,.aumReconciliation_arrow,.clientMaster_arrow,.familyMaster_arrow,.branchMaster_arrow,.rmMaster_arrow,.faMaster_arrow,.mTransactions_arrow,.transReport_arrow,.realized_Gain_arrow,.unrealized_Gain_arrow,.dividendReport_arrow,.sip_stp_swpReport_arrow").hide();
            $(".nestedpersonalp .investor,.nestedpersonalp .schemeMaster,.nestedpersonalp .brokerageFeed,.nestedpersonalp .dailyFeeds,.nestedpersonalp .navfeed,.nestedpersonalp .sipstpFeed,.nestedpersonalp .rdataImport,.dataEntry .aumReconciliation,.dataEntry .clientMaster,.dataEntry .familyMaster,.dataEntry .branchMaster,.dataEntry .rmMaster,.dataEntry .faMaster,.dataEntry .faMaster,.reports .transReport,.reports .currentHolding,.reports .dividendReport,.reports .sip_stp_swpReport").removeClass("activeitem");
        });

});
/*$(".bse").click(function(){
	$(".dashboardheading").html("BSE Star MF credentials"); 
	$("#wrapper").css("height","auto");
	$("#dashbord").empty();
	$("#dashbord").css("height","483px");
	$("#dashbord").load("MF/bse.html");
});*/

/*$(".dataEntry .mTransactions").click(function(){
	$(".dashboardheading").html("Manual Transactions"); 
	$("#wrapper").css("height","auto");
	$("#dashbord").empty();
	$("#dashbord").css("height","483px");
	$("#dashbord").load("MF/mTransactions.html");
});*/
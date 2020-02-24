//alert("myclient_sidebar_clientinfo.js")
// $("#menu-toggle").on("click", function(e) {
//     "use strict";
//     e.preventDefault();
//     $("#wrapper").toggleClass("toggled");
// });
// $("#menu-toggle-2").on("click", function(e) {
//     "use strict";
//     e.preventDefault();
//     $("#wrapper").toggleClass("toggled-2");
//     $("#menu-toggle-button-wrapper").toggleClass("toggled-2");
//     $("#menu-toggle-top-menu-left-wrapper").toggleClass("toggled-2");
//     $("#menu li").removeClass("expanded");
//     $("#menu ul").hide();
// });

function initMenu() {
    "use strict";
    // $("#menu ul").hide();
    // $("#menu ul").children(".current").parent().show();
    // $("#menu li a").on("click", function() {
    //     var $this = $(this);
    //     var checkElement = $this.next();
    //     if (!$("#menu li a").is($this) || $this.hasClass("loan")) {
    //         $("#menu ul:visible").slideUp("normal");
    //     }
    //     //else alert('Çlicked on a new menu on LHS or sub-menu of current menu');

    //     var listItem = $this.closest("li");
    //     if ((checkElement.is("ul")) && (checkElement.is(":visible"))) {
    //         checkElement.slideUp("normal");
    //         listItem.removeClass("expanded");
    //         return false;
    //     }
    //     if ((checkElement.is("ul")) && (!checkElement.is(":visible"))) {
    //         $("#menu ul:visible").slideUp("normal");
    //         $("#menu li").removeClass("expanded");
    //         checkElement.slideDown("normal");
    //         listItem.addClass("expanded");
    //         return false;
    //     }
    // });

    $('.has-submenu ul li a').on('click', function() {
        $('.editicon').show();
        $('.deleteicon').show();
        $('.editicon').addClass('btn_Disabled');
        $('.mandatory').hide();
        $("#mandatory-field-msg").hide();
    });

    $('.activegoal').on('click', function() {
        $('.addicon').show();
        $('.editicon').show();
        $('.deleteicon').show();
        $('.editicon').addClass('btn_Disabled');
    });

    $('.activeloans').on('click', function() {
        $('.editicon').show();
        $('.deleteicon').show();
        $('.addicon').show();
        $('.editicon').addClass('btn_Disabled');
    });

    $('.ciriskprofile').on('click', function() {
        $('.editicon').show();
        $('.deleteicon').show();
        $('.addicon').show();
        $('.editicon').addClass('btn_Disabled');
    });

}

$(document).ready(function() {
    //console.log("Entering document.ready  ");
    var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    if ((loggedUser != null) && (loggedUser.clientInfoAddEdit != null && loggedUser.clientInfoAddEdit === "Y")) {
        $("#addClient").show();
    } else {
        $("#addClient").hide();
    }
    "use strict";
    initMenu();



    $(".personalp").click(function() {
        $(".pi,.fi,.cd,.le,.fai,.he,.gpr,.mfpms,.eqt,.fixedi,.retirement,.smallsvng,.altinvest,.cash,.lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass('hoverweight');
        $(".fi_arrow,.cd_arrow,.le_arrow,.pi_arrow,.he_arrow,.gpr_arrow,.fai_arrow,.nonlifeins_arrow,.lifeins_arrow,.mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
        $(".activegoal").removeClass('nosubmenu');
        $(".cisummary").removeClass('nosubmenu');
        $(".activeloans").removeClass('nosubmenu');
        $(".ciriskprofile").removeClass('nosubmenu');
    });

    $(".incomeex").click(function() {
        $(".pi,.fi,.cd,.le,.fai,.he,.gpr,.mfpms,.eqt,.fixedi,.retirement,.smallsvng,.altinvest,.cash,.lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass('hoverweight');
        $(".fi_arrow,.cd_arrow,.le_arrow,.pi_arrow,.he_arrow,.gpr_arrow,.fai_arrow,.nonlifeins_arrow,.lifeins_arrow,.mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
        $(".activegoal").removeClass('nosubmenu');
        $(".cisummary").removeClass('nosubmenu');
        $(".activeloans").removeClass('nosubmenu');
        $(".ciriskprofile").removeClass('nosubmenu');
    });

    $(".activeloans").click(function() {
        $(".activeloans").toggleClass('nosubmenu');
        $(".ciriskprofile").removeClass('nosubmenu');
        $(".cisummary").removeClass('nosubmenu');
        $(".activegoal").removeClass('nosubmenu');
        $(".has-submenu").removeClass('expanded');
        $(".pi,.fi,.cd,.le,.fai,.he,.gpr,.mfpms,.eqt,.fixedi,.retirement,.smallsvng,.altinvest,.cash,.lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass('hoverweight');
        $(".fi_arrow,.cd_arrow,.le_arrow,.pi_arrow,.he_arrow,.gpr_arrow,.fai_arrow,.nonlifeins_arrow,.lifeins_arrow,.mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
    });

    $(".activeportfolio").click(function() {
        $(".pi,.fi,.cd,.le,.fai,.he,.gpr,.mfpms,.eqt,.fixedi,.retirement,.smallsvng,.altinvest,.cash,.lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass('hoverweight');
        $(".fi_arrow,.cd_arrow,.le_arrow,.pi_arrow,.he_arrow,.gpr_arrow,.fai_arrow,.nonlifeins_arrow,.lifeins_arrow,.mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
        $(".activegoal").removeClass('nosubmenu');
        $(".cisummary").removeClass('nosubmenu');
        $(".activeloans").removeClass('nosubmenu');
        $(".ciriskprofile").removeClass('nosubmenu');
    });

    $(".activeinsurance").click(function() {
        $(".pi,.fi,.cd,.le,.fai,.he,.gpr,.mfpms,.eqt,.fixedi,.retirement,.smallsvng,.altinvest,.cash,.lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass('hoverweight');
        $(".fi_arrow,.cd_arrow,.le_arrow,.pi_arrow,.he_arrow,.gpr_arrow,.fai_arrow,.nonlifeins_arrow,.lifeins_arrow,.mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
        $(".activegoal").removeClass('nosubmenu');
        $(".cisummary").removeClass('nosubmenu');
        $(".activeloans").removeClass('nosubmenu');
        $(".ciriskprofile").removeClass('nosubmenu');
    });

    $(".activegoal").click(function() {
        $(".cisummary").removeClass('nosubmenu');
        $(".ciriskprofile").removeClass('nosubmenu');
        $(".activeloans").removeClass('nosubmenu');
        $(".activeinsurance").removeClass('nosubmenu');
        //$(".has-submenu").removeClass('expanded');

        $(".pi,.fi,.cd,.le,.fai,.he,.gpr,.mfpms,.eqt,.fixedi,.retirement,.smallsvng,.altinvest,.cash,.lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass('hoverweight');
        $(".fi_arrow,.cd_arrow,.le_arrow,.pi_arrow,.he_arrow,.gpr_arrow,.fai_arrow,.nonlifeins_arrow,.lifeins_arrow,.mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
    });

    $(".cisummary").click(function() {
        $(".cisummary").toggleClass('nosubmenu');
        $(".activegoal").removeClass('nosubmenu');
        $(".activeloans").removeClass('nosubmenu');
        $(".ciriskprofile").removeClass('nosubmenu');
        $(".has-submenu").removeClass('expanded');
        $(".pi,.fi,.cd,.le,.fai,.he,.gpr,.mfpms,.eqt,.fixedi,.retirement,.smallsvng,.altinvest,.cash,.lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass('hoverweight');
        $(".fi_arrow,.cd_arrow,.le_arrow,.pi_arrow,.he_arrow,.gpr_arrow,.fai_arrow,.nonlifeins_arrow,.lifeins_arrow,.mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
    });

    $(".cipersonal .pi").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".pi_arrow").show();
            $(".fi_arrow,.cd_arrow,.le_arrow").hide();
            $(".cipersonal .fi,.cipersonal .cd,.cipersonal .le").removeClass("hoverweight");
        });

    $(".cipersonal .fi").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".fi_arrow").show();
            $(".cd_arrow,.le_arrow,.pi_arrow").hide();
            $(".cipersonal .pi,.cipersonal .cd,.cipersonal .le").removeClass("hoverweight");
        });

    $(".cipersonal .cd").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".cd_arrow").show();
            $(".fi_arrow,.le_arrow,.pi_arrow").hide();
            $(".cipersonal .pi,.cipersonal .fi,.cipersonal .le").removeClass("hoverweight");
        });

    $(".cipersonal .le").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".le_arrow").show();
            $(".fi_arrow,.cd_arrow,.pi_arrow").hide();
            $(".cipersonal .pi,.cipersonal .fi,.cipersonal .cd").removeClass("hoverweight");
        });

    // $(".cincome .fai").hover(function() {
    //             $(this).addClass('hoverweight');
    //         },
    //         function() {
    //             $(this).removeClass('hoverweight');
    //         })
    //     .click(function() {
    //         $(this).toggleClass('hoverweight');
    //         $(".fai_arrow").show();
    //         $(".he_arrow,.gpr_arrow").hide();
    //         $(".cincome .he,.cincome .gpr").removeClass("hoverweight");
    //     });

    $(".cincome .he").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".he_arrow").show();
            $(".fai_arrow,.gpr_arrow").hide();
            $(".cincome .fai,.cincome .gpr").removeClass("hoverweight");
        });

    $(".cincome .gpr").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".gpr_arrow").show();
            $(".fai_arrow,.he_arrow").hide();
            $(".cincome .fai,.cincome .he").removeClass("hoverweight");
        });

    $(".insurance .lifeins").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".lifeins_arrow").show();
            $(".nonlifeins_arrow").hide();
            $(".insurance .nonlifeins").removeClass("hoverweight");
        });

    $(".insurance .nonlifeins").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".nonlifeins_arrow").show();
            $(".lifeins_arrow").hide();
            $(".insurance .lifeins").removeClass("hoverweight");
        });

    $(".portfolio .mfpms").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".mfpms_arrow").show();
            $(".eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
            $(".portfolio .eqt,.portfolio .fixedi,.portfolio .retirement,.portfolio.smallsvng,.portfolio .altinvest,.portfolio .cash,.portfolio .lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass("hoverweight");
        });

    $(".portfolio .eqt").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".eqt_arrow").show();
            $(".mfpms_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
            $(".portfolio .mfpms,.portfolio .fixedi,.portfolio .retirement,.portfolio.smallsvng,.portfolio .altinvest,.portfolio .cash,.portfolio .lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass("hoverweight");
        });

    $(".portfolio .fixedi").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".fixedi_arrow").show();
            $(".mfpms_arrow,.eqt_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
            $(".portfolio .mfpms,.portfolio .eqt,.portfolio .retirement,.portfolio.smallsvng,.portfolio .altinvest,.portfolio .cash,.portfolio .lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass("hoverweight");
        });

    $(".portfolio .retirement").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            // $(".dashboardheading").html("Retirement Oriented Schemes");
            //$("#page-content-wrapper").css("height","739px");
            // $("#dashbord").empty();		 
            //	$("#dashbord").css("height","500%");
            //$("#dashbord").load("ci/viewCIDashboard.html");

            $(this).toggleClass('hoverweight');
            $(".retirement_arrow").show();
            $(".mfpms_arrow,.eqt_arrow,.fixedi_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
            $(".portfolio .mfpms,.portfolio .eqt,.portfolio .fixedi,.portfolio.smallsvng,.portfolio .altinvest,.portfolio .cash,.portfolio .lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass("hoverweight");
        });

    $(".portfolio .smallsvng").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".smallsvng_arrow").show();
            $(".mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
            $(".portfolio .mfpms,.portfolio .eqt,.portfolio .fixedi,.portfolio .retirement,.portfolio .altinvest,.portfolio .cash,.portfolio .lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass("hoverweight");
        });

    $(".portfolio .altinvest").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".altinvest_arrow").show();
            $(".mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.cash_arrow,.lumpflow_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
            $(".portfolio .mfpms,.portfolio .eqt,.portfolio .fixedi,.portfolio .retirement,.portfolio .smallsvng,.portfolio .cash,.portfolio .lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass("hoverweight");
        });

    $(".portfolio .cash").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".cash_arrow").show();
            $(".mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.lumpflow_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
            $(".portfolio .mfpms,.portfolio .eqt,.portfolio .fixedi,.portfolio .retirement,.portfolio .smallsvng,.portfolio .altinvest,.portfolio .lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass("hoverweight");
        });

    $(".portfolio .lumpflow").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".lumpflow_arrow").show();
            $(".mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
            $(".portfolio .mfpms,.portfolio .eqt,.portfolio .fixedi,.portfolio .retirement,.portfolio .smallsvng,.portfolio .altinvest,.portfolio .cash,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass("hoverweight");
        });

    /*$(".existingclient").hover( function(){
    	$(this).addClass('hoverweight');
    },
    function() {
    	$(this).removeClass('hoverweight');
    }) 
    .click(function() {
    	$(this).toggleClass('hoverweight');
    	$("#idClient").load("ci/viewClient.html");
    	$(".addclientdata").removeClass("hoverweight");
    });
    			
    $(".addclientdata").hover( function(){
    	$(this).addClass('hoverweight');
    },
    function() {
    	$(this).removeClass('hoverweight');
    }) 
    .click(function() {
    	$(this).toggleClass('hoverweight');
    	$("#idClient").load("ci/addClient.html");
    	$(".existingclient).removeClass("hoverweight");
    });
    */

    $(".goal .goaladd").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goalpriority_arrow").hide();
            $(".portfolio .mfpms,.portfolio .eqt,.portfolio .fixedi,.portfolio .retirement,.portfolio .smallsvng,.portfolio .altinvest,.portfolio .cash,.lifeins,.nonlifeins,.goalpriority").removeClass("hoverweight");
            $(".goaladd_arrow").show();
            $(".goalpriority_arrow").hide();
            $(".goaladd .goalpriority").removeClass("hoverweight");
        });

    $(".goal .goalpriority").hover(function() {
                // $(this).addClass('hoverweight');
            },
            function() {
                $(this).removeClass('hoverweight');
            })
        .click(function() {
            $(this).toggleClass('hoverweight');
            $(".mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.nonlifeins_arrow,.lifeins_arrow,.goalinput_arrow,.goaladd_arrow").hide();
            $(".portfolio .mfpms,.portfolio .eqt,.portfolio .fixedi,.portfolio .retirement,.portfolio .smallsvng,.portfolio .altinvest,.portfolio .cash,.lifeins,.nonlifeins,.goaladd").removeClass("hoverweight");
            $(".goalpriority_arrow").show();
            $(".goaladd_arrow").hide();
            $(".goaladd .goalpriority").removeClass("hoverweight");
        });

    $(".ciriskprofile").click(function() {
        $(".ciriskprofile").toggleClass('nosubmenu');
        $(".cisummary").removeClass('nosubmenu');
        $(".activegoal").removeClass('nosubmenu');
        $(".has-submenu").removeClass('expanded');
        $(".pi,.fi,.cd,.le,.fai,.he,.gpr,.mfpms,.eqt,.fixedi,.retirement,.smallsvng,.altinvest,.cash,.lumpflow,.lifeins,.nonlifeins,.goaladd,.goalpriority").removeClass('hoverweight');
        $(".fi_arrow,.cd_arrow,.le_arrow,.pi_arrow,.he_arrow,.gpr_arrow,.fai_arrow,.nonlifeins_arrow,.lifeins_arrow,.mfpms_arrow,.eqt_arrow,.fixedi_arrow,.retirement_arrow,.smallsvng_arrow,.altinvest_arrow,.cash_arrow,.lumpflow_arrow,.goalinput_arrow,.goaladd_arrow,.goalpriority_arrow").hide();
    });

    /*	$(".existingclientlhs").click(function(){
    		$(".existingclientlhs").addClass('nosubmenu');
    		$("#idClient").load("clientInfo/ci/viewClient.html");
    		$("#wrapper").css("height","auto");
    	 	$(".form-section-container").removeClass("height1257px");
    		$(".addclientdata").removeClass('nosubmenu');
    		// Resetting selected client when user clicks on Existing Client
    		$("#idSelectedClientName").empty();		
    		sessionStorage.removeItem("SELECTED_CLIENT_ID");
    	});
    */
    $(".existingclientlhs").click(function() {
        sessionStorage.setItem("PAGE_MODE", "Search Client");
        $(".existingclientlhs").addClass('nosubmenu');
        $("#wrapper").css("height", "auto");
        $(".form-section-container").removeClass("height1257px");
        $(".addclientdata").removeClass('nosubmenu');
        $("#dashbord").empty();
        $("#menu-wrapper").load("../Common/partials/myclient_sidebar_clientinfo.html");
        $(".dashboardheading").html("Client List");
        $("#dashbord").load("clientInfo/viewCIDashboard.html");
        // Resetting selected client when user clicks on Existing Client
        $("#idSelectedClientName").empty();
        sessionStorage.removeItem("SELECTED_CLIENT_ID");
        $(".top-nav-items").hide();
        $('.nav-client-info a').addClass('white');
        $('.nav-resources a').removeClass('white');
        $('.nav-reports a').removeClass('white');
        $('.nav-review a').removeClass('white');
        $('.nav-invest a').removeClass('white');
        $('.nav-plan a').removeClass('white');
        $("#clientimg").removeClass('activeclient');
        $("#planimg").removeClass('activeplan');
        $("#Investimg").removeClass('activeinvest');
        $("#Reviewimg").removeClass('activereview');
        $("#Reportsimg").removeClass('activereports');
        $("#Resourcesimg").removeClass('activeresource');

    });

    $(".addclientdata").click(function() {
        //alert("in add data");
        $("#wrapper").css("height", "1433px");
        $("#page-content-wrapper").css("height", "auto");
        $(".form-section-container").addClass("height1257px");
        $(".addclientdata").addClass('nosubmenu');
        $("#idClient").load("clientInfo/addClient.html");
        $(".existingclientlhs").removeClass('nosubmenu');
        $("#idSelectedClientName").empty();
        sessionStorage.removeItem("SELECTED_CLIENT_ID");
        sessionStorage.setItem("PAGE_MODE", "ADD");
    });

    /*$(".adminpaneldata").click(function(){	
    	$("#wrapper").css("height","1433px");
    	$("#page-content-wrapper").css("height","auto");
    	$(".form-section-container").addClass("height1257px");
    	$(".addclientdata").addClass('nosubmenu');
    	$("#idClient").load("clientInfo/adminPanel.html");					
    	$(".existingclientlhs").removeClass('nosubmenu');			
    	$("#idSelectedClientName").empty();		
    	sessionStorage.removeItem("SELECTED_CLIENT_ID");
    	sessionStorage.setItem("PAGE_MODE", "ADD");					
    });*/

    $('.has-submenu ul li a').click(function() {
        $('.addicon').show();
    });

    /*	$('.activegoal').click(function(){
    		$('.addicon').show();
    	});
    */
});
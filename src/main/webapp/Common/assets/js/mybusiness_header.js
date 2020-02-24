$(document).ready(function() {
    // $("#idHeaderAdvisorLogo").attr('src', '../Common/assets/images/finexa-logo.jpg');
    var loggedUser = JSON.parse(sessionStorage.getItem("LOGGED_IN_USER"));
    var loggedClient;
    if (loggedUser == null) {
        loggedClient = JSON.parse(sessionStorage.getItem("LOGGED_IN_CLIENT"));
    } else {
        loggedClient = sessionStorage.getItem("LOGGED_IN_CLIENT");
    }

    $.ajax({
        url: ClientServiceUrl + "getadvisor/logo/" + loggedUser.id,
        type: "GET",
        contentType: "image/png",
        dataType: "text",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + sessionStorage.getItem("sessionID"));
        },
        success: function(data) {
            if (data != "") {
                $("#idBussinessHeaderAdvisorLogo").attr('src', 'data:image/png;base64,' + data);

            } else {
                $("#idBussinessHeaderAdvisorLogo").attr('src', '../Common/assets/images/finexa-logo.jpg');
            }
        }
    });
    $('input:radio[name="tgl"]').change(
        function() {

            if ($(this).val() == '1') {
                window.location = '../MyClient/myclientDashboard.html';
                //alert("if");
            } else {
                //	alert("else");
                //window.location='../MyClient/myclientDashboard.html';
            }
        });

    /*$("#businesstogglebtn").change(function(){

    				   window.location='../MyClient/myclientDashboard.html';
    			})*/

    /*	$("#dashbord").load("userManagement/userCreation.html");

    	$("#idusermanagement").addClass('active_img');
    	$(".nav-client-info a").addClass('white');
    	*/


    //$('.nav-client-info a').addClass('white');
    $("#hum").click(function() {
        $("#mySidenav").toggle();
    });
    /*$(".help").click(function(){
    	$(this).addClass("onclickbg");
    	$(".search").removeClass("onclickbg");
    	$(".logout").removeClass("onclickbg");		
    });
    $(".search").click(function(){
    	$(this).addClass("onclickbg");
    	$(".help").removeClass("onclickbg");
    	$(".logout").removeClass("onclickbg");		
    });*/
    $(".logout").click(function() {
        $(this).addClass("onclickbg");
        $(".search").removeClass("onclickbg");
        $(".help").removeClass("onclickbg");
        $(".changePassword").removeClass("onclickbg");
    });
    $(".changePassword").click(function() {
        $(this).addClass("onclickbg");
        $(".search").removeClass("onclickbg");
        $(".help").removeClass("onclickbg");
        $(".logout").removeClass("onclickbg");
    });

    $("#idclientRecords").hover(function() {
                $(this).addClass('');
            },
            function() {
                $(this).removeClass('');
            })
        .click(function() {
            $(this).toggleClass('');

        });
    $("#idmasters").hover(function() {
            $(this).addClass('');
        },
        function() {
            $(this).removeClass('');
        })

    $("#idmf").hover(function() {
            $(this).addClass('');
        },
        function() {
            $(this).removeClass('');
        })

    $("#idExceptions").hover(function() {
            $(this).addClass('');
        },
        function() {
            $(this).removeClass('');
        })

    $("#Reviewimg").hover(function() {
                $(this).addClass('');
            },
            function() {
                $(this).removeClass('');
            })
        .click(function() {
            $(this).toggleClass('activereview');
            $('.nav-review a').addClass('white');
            $('.nav-MIS a').removeClass('white');
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
    $("#Reportsimg").hover(function() {
                $(this).addClass('hoverreports');
            },
            function() {
                $(this).removeClass('hoverreports');
            })
        .click(function() {
            $(this).toggleClass('activereports');
            $('.nav-reports a').addClass('white');
            $('.nav-MIS a').removeClass('white');
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
        });
    $("#Resourcesimg").hover(function() {
                $(this).addClass('');
            },
            function() {
                $(this).removeClass('');
            })
        .click(function() {
            $(this).toggleClass('activeresource');
            $('.nav-resources a').addClass('white');
            $('.nav-client-info a').removeClass('white');
            $('.nav-MIS a').removeClass('white');
            $('.nav-reports a').removeClass('white');
            $('.nav-review a').removeClass('white');
            $('.nav-invest a').removeClass('white');
            $('.nav-plan a').removeClass('white');
            $("#planimg").removeClass('activeplan');
            $("#Investimg").removeClass('activeinvest');
            $("#Reviewimg").removeClass('activereview');
            $("#Reportsimg").removeClass('activereports');
            $("#clientimg").removeClass('activeclient');
        });
    $("#clientimg").hover(function() {
                $(this).addClass('hoverclient');
            },
            function() {
                $(this).removeClass('hoverclient');
            })
        .click(function() {
            $(this).toggleClass('activeclient');
            $('.nav-client-info a').addClass('white');
            $('.nav-MIS a').addClass('white');
            $('.nav-resources a').removeClass('white');
            $('.nav-reports a').removeClass('white');
            $('.nav-review a').removeClass('white');
            $('.nav-invest a').removeClass('white');
            $('.nav-plan a').removeClass('white');
            $("#planimg").removeClass('activeplan');
            $("#Investimg").removeClass('activeinvest');
            $("#Reviewimg").removeClass('activereview');
            $("#Reportsimg").removeClass('activereports');
            $("#Resourcesimg").removeClass('activeresource');
        });
    $(".sidebar-icon-profile").hover(function() {
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
        });
    $("#idusermanagement").click(function() {

        $("#dashbord").empty();
        $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_usermanagement.html");
        $(".dashboardheading").html("User Management");
        $("#dashbord").load("userManagement/viewUMDashboard.html");

    });

    $("#idclientRecords").click(function() {

        $("#dashbord").empty();
        $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_clientrecords.html");
        $(".dashboardheading").html("Client Record");
        $("#dashbord").load("clientRecords/viewCRDashboard.html");

    });



    $("#idmasters").click(function() {
        $("#dashbord").empty();
        $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_masters.html");
        $(".dashboardheading").html("View Masters");
        $("#dashbord").load("masters/viewMastersDashboard.html");

    });




    $("#idreportscmz").click(function() {
        $("#dashbord").empty();
        $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_reportcustomization.html");
        $(".dashboardheading").html("Reports Customization");
        $("#dashbord").load("reportsCustomization/reportTemplate.html");
    });


    $("#idadvisorSupport").click(function() {
        $("#dashbord").empty();
        $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_advisorsupport.html");
        $(".dashboardheading").html("Advisor Support");
        $("#dashbord").load("advisorSupport/helpline.html");

    });
    $("#idmis").click(function() {
        $("#dashbord").empty();
        $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_mis.html");
        $(".dashboardheading").html("MIS");
        $("#dashbord").load("MIS/salesManagementReports.html");

    });

    $("#idotheresources").click(function() {
        $("#dashbord").empty();
        $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_otherresources.html");
        $(".dashboardheading").html("Other Resources");
        $("#dashbord").load("otherResources/viewOtherResources.html");

    });

    $("#idfinexaSubscription").click(function() {
        $("#dashbord").empty();
        $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_finexasubscription.html");
        $(".dashboardheading").html("Finexa Subscription");
        $("#dashbord").load("finexaSubscription/viewFSDashboard.html");
    });

    $("#idChangPassword").click(function() {
        $("#sidebar-wrapper").hide();
        $("#businesswrapper").hide();
        $("#id_change_password").show();
        $("#idChangPassword").hide();
        $("#id_change_password").load("../Common/partials/myclient_change_password.html");
    });

    $("#idmf").click(function() {
        $("#dashbord").empty();
        $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_mf.html");
        $(".dashboardheading").html("MF");
        $("#dashbord").load("MF/viewMFDashboard.html");
    });

    /*
     * NOTE : Accord could only be view by finlabs Admins
     *  
     $("#idAccord").click(function() {
         $("#dashbord").empty();
         $("#sidebar-wrapper").load("../Common/partials/mybusiness_sidebar_acc.html");
         $(".dashboardheading").html("Accord");
         $("#dashbord").load("Accord/viewAccordDashboard.html");
     });*/

    /*$("#menuBusinessReports").clickfunction() {
    	$("#dashbord").empty();
    	
    });*/

    /*$(".existingclient").click(function(){

    	$("#idClient").load("clientInfo/viewClient.html");
    	$("#dashbord").empty();
    		$("#dashbord").load("clientInfo/ci/viewCIDashboard.html");


    });*/
    $(".mybusinessmenu li a").on("click", function(event) {

        $(this).addClass("white");
        $(".mybusinessmenu li a").not(this).removeClass("white ");
        event.preventDefault();
        console.log('mybusinessmenu');
    });

    // $('.mybusinessmenu li').click(function() {

    //     var $this = $(this).find('img');
    //     $('.mybusinessmenu li').removeClass('active');
    //     $('.mybusinessmenu li a').removeClass('white');
    //     $('.mybusinessmenu li img').removeClass('active_img');
    //     $(this).addClass('active');
    //     $(this).find('a').addClass('white');
    //     $this.addClass('active_img');
    //     //$("#dashbord").load("userManagement/viewUsermaster.html");
    //     //   $(".dashboardheading").html("User Management");

    // });

});
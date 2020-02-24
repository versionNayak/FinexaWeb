$(document).ready(function() {
    setTimeout(function() {
        $(".sidebar-dropdown > a").on("click", function() {

            $(".sidebar-submenu").slideUp(100);
            if (
                $(this)
                .parent()
                .hasClass("active")
            ) {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .parent()
                    .removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .next(".sidebar-submenu")
                    .slideDown(100);
                $(this)
                    .parent()
                    .addClass("active");
            }

        });
        $(".sidebar-submenu>ul>li>a, .sidebar-submenu>ul>div>li>a").on("click", function(event) {

            $(this).addClass("activeitem");
            $(".sidebar-submenu>ul>li>a, .sidebar-submenu>ul>div>li>a").not(this).removeClass("activeitem ");
            event.preventDefault();
        });


    }, 100);

    // $("#close-sidebar").click(function() {
    //     $(".page-wrappers").removeClass("toggled");
    // });
    // $("#show-sidebar").click(function() {
    //     $(".page-wrappers").addClass("toggled");
    // });




});
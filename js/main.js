/* ===================================
    sticky nav
 ====================================== */

$(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
    }
});

$(document).ready(function () {
    //Disable mouse scroll wheel zoom on embedded Google Maps
    $('.maps').click(function () {
        $('.maps iframe').css("pointer-events", "auto");
    });

    $(".maps").mouseleave(function () {
        $('.maps iframe').css("pointer-events", "none");
    });


/* ===================================
    shrink navigation
 ====================================== */

    $(window).scroll();
    $(window).scroll(function () {
        if ($(window)
                .scrollTop() > 10) {
            $('nav')
                    .addClass('shrink');
        } else {
            $('nav')
                    .removeClass('shrink');
        }
    });

    $('.navigation-menu')
            .onePageNav({
                scrollSpeed: 750,
                scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
                scrollOffset: 79, //Height of Navigation Bar
                currentClass: 'active',
                filter: ':not(.btn-very-small)'
            });

    setTimeout(function () {
        $(window).scroll();
    }, 500);

    //close navbar menu after clicking menu href
    $('ul.navbar-nav li a')
            .click(function (e) {
                $(this)
                        .parents('div.navbar-collapse')
                        .removeClass('in');
            });

    // pull-menu close on href click event in mobile devices
    $('.pull-menu a.section-link')
            .click(function (e) {
                if ($(window).width() <= 500)
                    $('#close-button').click();
            });

/*==============================================================
    smooth scroll
 ==============================================================*/
    var hash = window.location.hash.substr(1);
    if (hash != "") {
        var scrollAnimationTime = 1200,
                scrollAnimation = 'easeInOutExpo';

        var target = '#' + hash;
        $('html, body').stop()
                .animate({
                    'scrollTop': $(target)
                            .offset()
                            .top
                }, scrollAnimationTime, scrollAnimation, function () {
                    window.location.hash = target;
                });
    }



    var scrollAnimationTime = 1200,
            scrollAnimation = 'easeInOutExpo';
    $('a.scrollto').bind('click.smoothscroll', function (event) {
        event.preventDefault();
        var target = this.hash;
        $('html, body').stop()
                .animate({
                    'scrollTop': $(target)
                            .offset()
                            .top
                }, scrollAnimationTime, scrollAnimation, function () {
                    window.location.hash = target;
                });
    });

    // Inner links
    $('.inner-link').smoothScroll({
        speed: 900,
        offset: -59
    });
    $('.section-link').smoothScroll({
        speed: 900,
        offset: 1
    });



/*==============================================================
    portfolio-filter
 ==============================================================*/

    $portfolio_filter = $('.grid');
    $portfolio_filter.imagesLoaded(function () {
        $portfolio_filter.isotope({
            itemSelector: 'li',
            layoutMode: 'masonry'
        });
    });

    $grid_selectors = $('.portfolio-filter > li > a');
    $grid_selectors.on('click', function () {
        $grid_selectors.parent().removeClass('active');
        $(this).parent().addClass('active');
        var selector = $(this).attr('data-filter');
        $portfolio_filter.isotope({filter: selector});
        return false;
    });

    $(window).resize(function () {
        setTimeout(function () {
            $portfolio_filter.isotope('layout');
        }, 500);
    });


/*==============================================================
    form to email
==============================================================*/
    
    $("#success").hide();
    $("#success-contact").hide();

    $("#personal-contact-button").click(function () {
        var error = ValidationPersonalContactForm();
        if (error) {
            $.ajax({
                type: "POST",
                url: "email-templates/personal-contact.php",
                data: $("#personalcontactform").serialize(),
                success: function (result) {
                    $('input[type=text],textarea').each(function () {
                        $(this).val('');
                    })
                    $("#success").html(result);
                    $("#success").fadeIn("slow");
                    $('#success').delay(4000).fadeOut("slow");
                }
            });
        }
    });
    function ValidationPersonalContactForm() {
        var error = true;
        $('#personalcontactform input[type=text]').each(function (index) {
            if (index == 0) {
                if ($(this).val() == null || $(this).val() == "") {
                    $("#personalcontactform").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                }
                else {
                    $("#personalcontactform").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }
            else if (index == 1) {
                if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                    $("#personalcontactform").find("input:eq(" + index + ")").addClass("required-error");
                    error = false;
                } else {
                    $("#personalcontactform").find("input:eq(" + index + ")").removeClass("required-error");
                }
            }

        });
        return error;
    }


    //end ready
});

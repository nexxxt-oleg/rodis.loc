let year = new Date().getFullYear();
$('#year').html(year);

$(document).ready(function () {
    $('.gift-collection__carousel').owlCarousel({
        items: 4,
        slideTransition: 'linear',
        autoplaySpeed: 90000,
        navText: ['<svg><use xlink:href="#Arrow-l"></use></svg>', '<svg><use xlink:href="#Arrow"></use></svg>'],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            1240: {
                items: 4,
                nav: true,
                loop: false
            }
        }
    });

    $('.customer-review__cases-carousel').owlCarousel({
        loop: true,
        navRewind: false,
        nav: true,
        navText: ['<svg><use xlink:href="#Arrow-l"></use></svg>', '<svg><use xlink:href="#Arrow"></use></svg>'],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            1240: {
                items: 3,
                center: true,
                stagePadding: 50,
                autoWidth: true,
            }
        }
    });


    const heroSwiper = new Swiper('.hero.swiper-container', {
        loop: true,
        speed: 1000,
        pagination: {
            el: '.slide-check',
            bulletElement: 'li',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
        },
    });

    heroSwiper.on('transitionStart', function () {
        let slideIndex = heroSwiper.realIndex;
        $('.hero-wrapper').removeClass('invert-hero-slide');
        if (slideIndex == 1) {
            $('.hero-wrapper').addClass('invert-hero-slide');
        }
    });

    const lookbookSwiper = new Swiper('.lookbook__wrapper', {
        // loop: true,
        pagination: false,
        effect: 'fade',
        loop: true,
        speed: 1000,
        fadeEffect: {crossFade: true},
        navigation: {
            nextEl: '.arrow__right',
            prevEl: '.arrow__left',
        },

    });


    $('ul.tabs-list-js').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs-list-wrapper').find('.tabs-list-tab-content').removeClass('active').eq($(this).index()).addClass('active');
    });

    // $('.lookbook__item').each(function () {
    //     let activeTicket = $(this).find('.target-list .active').data('id');
    //     $('#' + activeTicket).show();
    //
    //     let ticket = $(this).find('.lookbook__item--ticket');
    //     let target = $(this).find('.target-list .target');
    //
    //     $(target).on( "click", function () {
    //         let that = this;
    //         $(ticket).hide();
    //         $('.lookbook__item--ticket').removeClass('active');
    //         $('.target-list .target').removeClass('active');
    //         $(that).addClass('active');
    //         let id = $(that).data('id');
    //         console.log(id);
    //         $('#' + id).css('display', 'flex').addClass('active');
    //         // $('#' + activeTicket).show();
    //         return false;
    //     });
    //
    //
    // });

    // let activeTicket = $('.target-list.active').data('id');
    // $('.target-list .target').click(function () {
    //     // $('.lookbook__item--ticket').css('opacity', '0').hide();
    //     $('.target-list .target').removeClass('active');
    //     $(this).addClass('active');
    //
    //     let id = $(this).data('id');
    //     console.log('#' + id)
    //     $('#' + id).css('display', 'flex').animate({
    //         opacity: 1
    //     });
    // });

    let modalCloseListener = $('.modal-close-listener');

    function showModalListener() {
        $(modalCloseListener).show();
    }

    function hideModalListener() {
        $(modalCloseListener).hide();
    }

    $('.show-search').click(() => {
        showModalListener();
        $('.header__search').fadeIn();
    });
    $('.header__search--close, .modal-close-listener').click(() => {
        hideModalListener();
        $('.header__search').fadeOut();
    });

    $('.show-dd-header-menu').click(() => {
        $('.dd-header-menu').fadeIn();
        $('body').css('overflow', 'hidden');
    });
    $('.dd-header-menu__close, .dd-header-menu__close-mask').click(() => {
        $('.dd-header-menu').fadeOut();
        $('body').css('overflow', '');
    });

    const controller = new ScrollMagic.Controller({addIndicators: false});

    /*$('.categories__item--data').each(function () {
        let tween = TweenMax.from($(this), 0.8, {opacity: 0, y: '+=100', ease: Linear.easeNone}, 0.2);
        let scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
        })
            .setTween(tween).addTo(controller);

    });*/

    $('.cart__items').mCustomScrollbar({
        theme:"dark",
        axis:"y"
    });

    $(".collections__item").each(function (i) {

        let animateIn = new TimelineMax({delay: i - i * .75 + 0.01});
        animateIn.from($(this), 0.4, {alpha: 0, y: 10, ease: Power2.easeOut}, 0.2);

        var scene = new ScrollMagic.Scene({
            triggerElement: '#colections-trigger',
            triggerHook: 1,
        })
            .setTween(animateIn).addTo(controller);
    });

    $(".individual-stages__item").each(function (i) {

        let animateIn = new TimelineMax({delay: i - i * .75 + 0.01});
        animateIn.from($(this), 0.4, {alpha: 0, y: 10, ease: Power2.easeOut}, 0.35);

        var scene = new ScrollMagic.Scene({
            triggerElement: '#stages-trigger',
            triggerHook: 1,
        })
            .setTween(animateIn).addTo(controller);
    });

    if ($('#history').length > 0) {
        new Accordion(['#history'], {
            duration: 500,
        });
    }
    if ($('#rules').length > 0) {
        new Accordion(['#rules'], {
            duration: 500,
        });
    }
    if ($('#individual-faq').length > 0) {
        new Accordion(['#individual-faq'], {
            duration: 500,
            closeOthers: false
        });
    }
    // new Accordion(['#lookbook__wrapper'], {
    //     duration: 500,
    // });

    $('.phone').mask('+7 (000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});

    $('.show-login').click(function (event) {
        $(this).modal({
            fadeDuration: 250
        });
        return false;
    });

    $('.show-hide-pwd').hidePassword({
        innerToggle: true,
        toggle: {
            element: '<div>',
            className: 'toggle-eye',
            attr: {
                title: 'Показать пароль',
            }
        },
        states: {
            shown: {
                toggle: {
                    content: "",
                    attr: {
                        title: 'Скрыть пароль',
                    }
                }
            },
            hidden: {
                toggle: {
                    content: "",
                    attr: {
                        title: 'Показать пароль',
                    }
                }
            }
        }


    });

    if ($('#timeline').length) {
        $().timelinr({
            startAt: 0,
            issuesSpeed: 600,
            issuesTransparency: 1
        });
    }
    $('#cart').click(function () {
        $('.cart').addClass('active');
    });
    $('#cart-close').click(function () {
        $('.cart').removeClass('active');
    })

    /*if($( window ).width() > 1280 && $('.parallax-background').length > 0) {
        var $el = $('.parallax-background');
        $(window).on('scroll', function () {
            var scroll = $(document).scrollTop();
            $el.css({
                'background-position':'50% '+(-.2*scroll)+'px'
            });
        });
    }*/

});

$(window).on("load", () => {
    let md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile() && $( window ).width() < 768) {
        new Accordion(['.footer__nav'], {
            duration: 500,
            onToggle: function (currentElement, allElements) {
            }
        });
        $('.show-sub-nav').click(function () {
            $(this).next('.sub-nav').addClass('active');
        });
        $('.go-back').click(function () {
            $(this).parent('.sub-nav').removeClass('active');
        })

        // if ($('.product-view__inner').length){
        //     var mySwiper = new Swiper ('.product-view__item', {
        //         loop: true,
        //         speed: 600,
        //         pagination: {
        //             el: '.swiper-pagination',
        //         },
        //         autoplay: {
        //             delay: 2000,
        //         }
        //     })
        // }

    } else {
        $('#stickySidebar').stickySidebar({
            topSpacing: 0,
            // bottomSpacing: 0,
            resizeSensor: true,
            containerSelector: '.sticky-container',
            innerWrapperSelector: '.sticky-inner',


            bottomSpacing: 50
        });
    }

    var header = $('.main-wrap'),
        scrollPrev = 0;

    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();

        if ( scrolled > 500 ) {
            header.addClass('out');
            if( scrolled < scrollPrev ) {
                header.addClass('menu_open');
            } else {
                header.removeClass('menu_open');
            }
        } else {
            header.removeClass('out');
            header.removeClass('menu_open');
        }
        scrollPrev = scrolled;
    });
});

var wow = new WOW(
    {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animate__animated', // animation css class (default is animated)
        offset:       200,          // distance to the element when triggering the animation (default is 0)
        mobile:       false,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
            //box.classList.add("is_active");
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    }
);
wow.init();
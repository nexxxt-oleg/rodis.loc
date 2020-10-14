let year = new Date().getFullYear();
$('#year').html(year);


Share = {
    /**
     * Показать пользователю дилог шаринга в сооветствии с опциями
     * Метод для использования в inline-js в ссылках
     * При блокировке всплывающего окна подставит нужный адрес и ползволит браузеру перейти по нему
     *
     * @example <a href="" onclick="return share.go(this)">like+</a>
     *
     * @param Object _element - элемент DOM, для которого
     * @param Object _options - опции, все необязательны
     */
    go: function(_element, _options) {
        var
            self = Share,
            options = $.extend(
                {
                    type:       'vk',    // тип соцсети
                    url:        location.href,  // какую ссылку шарим
                    count_url:  location.href,  // для какой ссылки крутим счётчик
                    title:      document.title, // заголовок шаринга
                    image:        '',             // картинка шаринга
                    text:       '',             // текст шаринга
                },
                $(_element).data(), // Если параметры заданы в data, то читаем их
                _options            // Параметры из вызова метода имеют наивысший приоритет
            );

        if (self.popup(link = self[options.type](options)) === null) {
            // Если не удалось открыть попап
            if ( $(_element).is('a') ) {
                // Если это <a>, то подставляем адрес и просим браузер продолжить переход по ссылке
                $(_element).prop('href', link);
                return true;
            }
            else {
                // Если это не <a>, то пытаемся перейти по адресу
                location.href = link;
                return false;
            }
        }
        else {
            // Попап успешно открыт, просим браузер не продолжать обработку
            return false;
        }
    },

    // ВКонтакте
    vk: function(_options) {
        var options = $.extend({
            url:    location.href,
            title:  document.title,
            image:  '',
            text:   '',
        }, _options);

        return 'http://vkontakte.ru/share.php?'
            + 'url='          + encodeURIComponent(options.url)
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&image='       + encodeURIComponent(options.image)
            + '&noparse=true';
    },

    // Одноклассники
    ok: function(_options) {
        var options = $.extend({
            url:    location.href,
            text:   '',
        }, _options);

        return 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'
            + '&st.comments=' + encodeURIComponent(options.text)
            + '&st._surl='    + encodeURIComponent(options.url);
    },

    // Facebook
    fb: function(_options) {
        var options = $.extend({
            url:    location.href,
            title:  document.title,
            image:  '',
            text:   '',
        }, _options);

        return 'http://www.facebook.com/sharer.php?s=100'
            + '&p[title]='     + encodeURIComponent(options.title)
            + '&p[summary]='   + encodeURIComponent(options.text)
            + '&p[url]='       + encodeURIComponent(options.url)
            + '&p[images][0]=' + encodeURIComponent(options.image);
    },

    // Живой Журнал
    lj: function(_options) {
        var options = $.extend({
            url:    location.href,
            title:  document.title,
            text:   '',
        }, _options);

        return 'http://livejournal.com/update.bml?'
            + 'subject='        + encodeURIComponent(options.title)
            + '&event='         + encodeURIComponent(options.text + '<br/><a href="' + options.url + '">' + options.title + '</a>')
            + '&transform=1';
    },

    // Твиттер
    tw: function(_options) {
        var options = $.extend({
            url:        location.href,
            count_url:  location.href,
            title:      document.title,
        }, _options);

        return 'http://twitter.com/share?'
            + 'text='      + encodeURIComponent(options.title)
            + '&url='      + encodeURIComponent(options.url)
            + '&counturl=' + encodeURIComponent(options.count_url);
    },

    // Mail.Ru
    mr: function(_options) {
        var options = $.extend({
            url:    location.href,
            title:  document.title,
            image:  '',
            text:   '',
        }, _options);

        return 'http://connect.mail.ru/share?'
            + 'url='          + encodeURIComponent(options.url)
            + '&title='       + encodeURIComponent(options.title)
            + '&description=' + encodeURIComponent(options.text)
            + '&imageurl='    + encodeURIComponent(options.image);
    },

    // Открыть окно шаринга
    popup: function(url) {
        return window.open(url,'','toolbar=0,status=0,scrollbars=1,width=626,height=436');
    }
}


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


    $('.js-slider-product').owlCarousel({
        loop: true,
        nav: false,
        items: 1,
        dots: true
    });

    //


    const heroSwiper = new Swiper('.hero.swiper-container', {
        loop: true,
        speed: 2000,
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


    $('ul.tabs-list-js').on('click', 'li', function () {
        let activeFilter = $(this);
        if (activeFilter.hasClass('active')) {
            activeFilter.removeClass('active');
            $(activeFilter.data('toggle-id')).slideToggle();
        } else {
            $('ul.tabs-list-js li').removeClass('active');
            activeFilter.addClass('active');
            $('.tabs-list-tab-content').hide();
            $(activeFilter.data('toggle-id')).slideToggle();
        }


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
        $('.header__search, .header__search__mask').fadeIn();
        $('.header__search--inner input').focus();
    });
    $('.header__search--close, .modal-close-listener, .header__search__mask').click(() => {
        hideModalListener();
        $('.header__search, .header__search__mask').fadeOut();
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

    if($( window ).width() < 1200) {
        $('.animated-lnk--filter').on('click', function() {
            if($(this).hasClass('hover')) {
                $(this).removeClass('hover');
            } else {
                $('.animated-lnk--filter').removeClass('hover');
                $(this).addClass('hover');
            }
        });

        $('#filterMob').on('click', function() {
            $('.catalog-filter__mobile-box').slideToggle();
            return false;
        });

        $('.catalog-filter__caption-mobile').on('click', function() {
            $(this).parent().find('.catalog-filter__content__wrap').slideToggle();
            return false;
        });
    }

    $('.animated-lnk--sort').on('click', function() {
        $('.catalog-filter__sort-list').slideToggle();
        return false;
    });

});

$(window).on("load", () => {
    let md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile() && $( window ).width() < 600) {
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

        if ($('.js-product-view-img').length){
            $('.product-view__item--holder').addClass('swiper-wrapper');
            $('.product-view__item__slide').addClass('swiper-slide');
            var mySwiper = new Swiper ('.js-product-view-img', {
                loop: true,
                speed: 600,
                pagination: {
                    el: '.swiper-pagination',
                },
            })
        }
        if ($('.js-mob-slider-review').length){
            $('.js-mob-slider-review').owlCarousel({
                loop: true,
                nav: false,
                items: 1,
                dots: true
            });
            console.log('2222');
        }


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

    $('.social__share').on('click', function(){
        Share.go(this);
    });

    $('.cursor-pointer--sharing').on('click', function(){
        $('.social').toggleClass('active');
    });

    if ($("#modalQuestion").length > 0) {
        $("#modalQuestion").iziModal({
            width: 650,
            radius: 0,
        });
    }

    if ($("#modalCallback").length > 0) {
        $("#modalCallback").iziModal({
            width: 650,
            radius: 0,
        });

        $("#formCallback").validate({
            errorElement: "span",
            messages: {
                name: {
                    required: "Укажите имя",
                },
                tel: {
                    required: "Укажите номер телефона",
                },

            },
            submitHandler: function () {
                /*$("#modal-reg-web").iziModal('close');
                $('#modal-thanks').iziModal('open');
                return false;*/
            }
        });
    }

    $('.js-razmer').on('input', function () {
        if($(this).val() == 0) {
            $('.razmer-result__ok').addClass('razmer-result__hidden');
            $('.razmer-result__error').removeClass('razmer-result__hidden');
        } else {
            $('.razmer-result__ok').removeClass('razmer-result__hidden');
            $('.razmer-result__error').addClass('razmer-result__hidden');
        }
    });

    $('.modal-form__inp--tel').mask("+7 (999) 999-99-99");


    $('.js-map-show').on('click', function() {
        $('.stores__item__map').not($(this).data('map')).removeClass('is-active');
        let activeMap = $(this).data('map');
        if( $(activeMap).hasClass('is-active')) {
            $(activeMap).removeClass('is-active');
        } else {
            $(activeMap).addClass('is-active');
        }

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

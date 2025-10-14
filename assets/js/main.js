
(function($) {

    'use strict';



    $(window).on('load', function() {

        HunThemesMainJS.loadPage();

    });



    var HunThemesMainJS = {



        readyPage: function() {

            this.slideSlick();

            this.magnificPopup();

            this.backToTop();

            this.preLoading();

            this.hunHeader();

            this.search();

            this.dropdownTab();

            this.countDown();

            this.stickySidebar();

            this.parallax100();

            this.accordion();

            this.tablePricing();

            this.counter();

            this.hunTab();

        },



        loadPage: function() { 

            this.others();

        },



        

        /*\

         *

         * Others

         *

        \*/

        others: function() {

            // Full height with header

            try {

                var heightHeader = $('.hun-page .hun-header').outerHeight();

                var heightWindow = $(window).outerHeight();



                $('.hun-page .full-height-with-header').css('min-height', heightWindow - heightHeader + 'px');





                $(window).on('load resize', function() {

                    var heightHeader = $('.hun-page .hun-header').outerHeight();

                    var heightWindow = $(window).outerHeight();



                    $('.hun-page .full-height-with-header').css('min-height', heightWindow - heightHeader + 'px');

                });

            } catch(er) {console.log(er);}

 

            // Tooltip Bootstrap

            try {

                $('[data-toggle="tooltip"]').tooltip();

            } catch(er) {console.log(er);}





            // wow

            try {

                new WOW().init();

            } catch(er) {console.log(er);}

        },





        /*\

         *

         * parallax100

         *

        \*/

        parallax100: function() {

            try {                

                $('.hun-page .parallax100').each(function() {

                    var speedParallax = 2;

                    var dataSpeed = $(this).attr('data-speed-parallax');



                    if(dataSpeed !== '' && dataSpeed !== null && typeof dataSpeed !== 'undefined' && !isNaN(Number(dataSpeed))) {

                        speedParallax = Number(dataSpeed);

                    }



                    $(this).parallax100({

                        speedScroll: speedParallax

                    });

                })

            } catch(er) {console.log(er);}

        },



        /*\

         *

         * slideSlick

         *

        \*/

        slideSlick: function() {

            try {

                if($('html').is('[dir="rtl"]')) {

                    $('.js-call-slick').attr('data-rtl', 'true');

                }



                $('.js-call-slick:not(.js-lock-element .js-call-slick)').each(function(){

                    var $wrapperSlick = $(this);

                    var $slideSlick = $(this).find('.slide-slick:not(.slick-initialized)');

                    var $itemSlick = $slideSlick.find('.item-slick');



                    var dataCustomDots = $wrapperSlick.data('custom-dots');

                    var dataHeightArrows = $wrapperSlick.data('height-arrows');

                    var dataAnimate = $wrapperSlick.data('animate');

                    var dataRtl = ($wrapperSlick.attr('data-rtl') === 'true') ? true : false;



                    if(dataAnimate === true) {

                        var $layerSlick = $slideSlick.find('[data-appear]');

                        var actionSlick = [];



                        $layerSlick.addClass('animated').css('visibility', 'hidden');

                    }  



                    /*---------------------------------------------*/

                    $slideSlick.on('init', function(event, slick){

                        if(dataAnimate === true) {

                            showLayer(0);

                        }

                    });



                    $slideSlick.slick({

                        rtl: dataRtl,

                        appendArrows: $wrapperSlick.find('.arrows-slick'),

                        prevArrow: $wrapperSlick.find('.prev-slick'),

                        nextArrow: $wrapperSlick.find('.next-slick'),

                        appendDots: $wrapperSlick.find('.dots-slick'),



                        customPaging: function(slick, index) {

                            var innerDot = $(slick.$slides[index]).find('[data-inner-dot]').attr('data-inner-dot');



                            if(dataCustomDots === true) {

                                return innerDot;

                            }



                            return '<span class="inner-dot"></span>';

                        }

                    });



                    $slideSlick.on('setPosition', function(event, slick){

                        // Equal height

                        if($wrapperSlick.data('equal-height') === true) {

                            var maxHeight = 0;

                            var $items = $(this).find('.item-slick');



                            $items.each(function(){

                                if($(this).outerHeight() > maxHeight) {

                                    maxHeight = $(this).outerHeight();

                                }

                            })



                            $items.css('min-height', maxHeight);

                        }



                        // Middle Arrow

                        if(dataHeightArrows != null) {

                            var $wrapperArrows = $wrapperSlick.find('.arrows-slick');

                            var heightWA = $wrapperSlick.find(dataHeightArrows).outerHeight();

                            

                            $wrapperArrows.css('height', heightWA + 'px');

                        }



                        // CenterMode

                        if (slick.slideCount > slick.options.slidesToShow) {

                            $wrapperSlick.addClass('big-num-item');

                        }

                        else {

                            $wrapperSlick.removeClass('big-num-item');

                        }



                        // Reinit Parallax 

                        mainJS.parallax100();



                        // Go To Current Item

                        if($wrapperSlick.attr('data-now-item') != null && $wrapperSlick.attr('data-now-item') != '' 

                            && $wrapperSlick.attr('data-now-item') != '0' && $slideSlick.slick('slickCurrentSlide') != Number($wrapperSlick.attr('data-now-item'))) {



                            $slideSlick.slick('slickGoTo', Number($wrapperSlick.attr('data-now-item')));

                            $wrapperSlick.attr('data-now-item','');

                        }

                    });



                    $slideSlick.on('afterChange', function(event, slick, currentSlide){ 

                        if(dataAnimate === true) {

                            showLayer(currentSlide);

                        }



                        $wrapperSlick.attr('data-now-item', $slideSlick.slick('slickCurrentSlide') + '')

                    });



                    /*---------------------------------------------*/

                    function showLayer(currentSlide) {

                        var $layerCurrentItem = $($itemSlick[currentSlide]).find('[data-appear]');



                        for(var i=0; i<actionSlick.length; i++) {

                            clearTimeout(actionSlick[i]);

                        }



                        $layerSlick.each(function(){

                            $(this).removeClass($(this).attr('data-appear')).css('visibility', 'hidden');

                        })

                            



                        for(var i=0; i<$layerCurrentItem.length; i++) {

                            actionSlick[i] = setTimeout(function(index) {

                                $($layerCurrentItem[index]).addClass($($layerCurrentItem[index]).attr('data-appear')).css('visibility', 'visible');

                            },$($layerCurrentItem[i]).attr('data-delay'),i); 

                        }

                    };

                });

            } catch(er) {console.log(er);}

        },



            

        /*\

         *

         * magnificPopup

         *

        \*/

        magnificPopup: function() {

            try {

                $('.hun-page .js-call-magnificpopup').each(function() {

                    if(!$(this).hasClass('magnificpopup-inited')) {

                        $(this).addClass('magnificpopup-inited')

                        

                        $(this).each(function() {

                            var $thisObj = $(this);

                            var data =      [

                                                'gallery',

                                                'verticalfit',

                                                'focus',

                                                'popupinside',

                                                'fixedpos'

                                            ]



                            var option =    {

                                                gallery: false,

                                                verticalfit: true,

                                                focus: '',

                                                popupinside: false,

                                                fixedpos: true

                                            }



                            // Get data

                            for(var i=0; i<data.length; i++) {

                                var value = $thisObj.data(data[i]); 



                                if (value != null) {

                                    option[data[i]] = value;

                                }

                            }



                            var prepend = $(document.body);

                            if(option.popupinside === true) {

                                prepend = $thisObj;

                            }



                            $thisObj.find('.js-open-popup').magnificPopup({

                                fixedContentPos: option.fixedpos,

                                closeBtnInside: false,

                                prependTo:  prepend,

                                mainClass: 'mfp-fade',

                                focus: option.focus,

                                gallery: {

                                    enabled: option.gallery

                                },



                                image: {

                                    verticalFit: option.verticalfit

                                },



                                iframe: {

                                    patterns: {

                                        youtube: {

                                            src: 'https://www.youtube.com/embed/%id%?autoplay=1'

                                        },



                                        vimeo: {

                                            src: 'https://player.vimeo.com/video/%id%?autoplay=1'

                                        }

                                    }

                                },



                                callbacks: {

                                    open: function() {

                                        var $thisPopup = this;



                                        /*---------------------------------------------*/

                                        $thisPopup.content.find('.slide-slick').slick('refresh');

                                        $thisPopup.content.find('.slide-slick').slick('resize');

                                    }

                                }

                            });

                        });

                    }

                })                        

            } catch(er) {console.log(er);}

        },





        /*\

         *

         * backToTop

         *

        \*/

        backToTop: function() {

            try {

                $('.hun-page').after(

                    '<div class="btn-back-to-top ">' +

                    '<span class="symbol-btn">' +

                    '</span>' +

                    '</div>'

                    )



                var $btnBackToTop = $('.btn-back-to-top');

                var windowH = $(window).height()/2;



                $(window).on('scroll',function(){

                    if ($(this).scrollTop() > windowH) {

                        $btnBackToTop.addClass('active-btn');

                    } else {

                        $btnBackToTop.removeClass('active-btn');

                    }

                });



                $btnBackToTop.on("click", function(){

                    $('html, body').animate({scrollTop: 0}, 1000);

                });



               /*---------------------------------------------*/

                if ($(window).outerWidth() < 992) {

                    var hideIconTimeOut;

                    var $btnBackToTopAutoHide = $('.btn-back-to-top.auto-hide');



                    hideIcon();



                    $(window).on('scroll', function() {

                        if($btnBackToTopAutoHide.hasClass('hidden-btn')) {

                            clearTimeout(hideIconTimeOut);

                            $btnBackToTopAutoHide.removeClass('hidden-btn');

                            hideIcon();

                        }

                    });

                }



                function hideIcon() {

                    hideIconTimeOut = setTimeout(function(){ 

                        $btnBackToTopAutoHide.addClass('hidden-btn');

                    }, 3000);

                }

            } catch(er) {console.log(er);}

        },





        /*\

         *

         * preLoading

         *

        \*/

        preLoading: function() {

            try {

                $('.animsition').each(function() {

                    var dataLoader = "spinner";



                    $(this).animsition({

                        inClass: 'fade-in',

                        outClass: 'fade-out',

                        inDuration: 1500,

                        outDuration: 800,

                        linkElement: '.animsition-link',

                        loading: true,

                        loadingParentElement: 'html',

                        loadingClass: 'hun-pre-loading',

                        loadingInner: '<div class="circle-border"><div class="circle-core"></div></div>',

                        timeout: false,

                        timeoutCountdown: 5000,

                        onLoadEvent: true,

                        browser: [ 'animation-duration', '-webkit-animation-duration'],

                        overlay : false,

                        overlayClass : 'animsition-overlay-slide',

                        overlayParentElement : 'html',

                        transition: function(url){ window.location.href = url; }

                    });

                })

            } catch(er) {console.log(er);}

        },





        /*\

         *

         * hunHeader

         *

        \*/

        hunHeader: function() {

            $('.hun-page .hun-header').each(function() {

                var $header = $(this);



                if(!$header.hasClass('header-inited') || $header.hasClass('reinit-sticky')) {



                    // Sticky

                    try {

                        var $headerSticky = $header;

                        var $containerHeader = $headerSticky.find('.container-header');

                        var $elementForStick = $headerSticky.find('.element-for-stick');

                        var offsetTop = 0;

                        var current = 0;

                        var latestScroll = 0; 

                        var posStickTopHeader = 0;

                        var posStickBottomHeader = 0;

                        var topHideHeader = 0;



                        if($header.hasClass('style-sticky') && $(window).outerWidth() > 600) {

                            destroyStickyHeader();

                            initStickyHeader();

                        }

                        else {

                            destroyStickyHeader();

                        }   



                        if(!$header.hasClass('sticky-inited') && $header.hasClass('style-sticky')) {

                            $header.addClass('sticky-inited');



                            $(window).on('resize load', function() {

                                if($header.hasClass('style-sticky') && $(window).outerWidth() > 600) {

                                    destroyStickyHeader();

                                    initStickyHeader();



                                    if($(window).scrollTop() > window.posStickTopHeader) {

                                        $headerSticky.addClass('fixed');

                                    }

                                    else {

                                        $headerSticky.removeClass('fixed');

                                    }

                                }

                                else {

                                    destroyStickyHeader();

                                }   

                            });          



                            $(window).on('scroll', function() {

                                if($header.hasClass('style-sticky') && $(window).outerWidth() > 600) {

                                    current = $(window).scrollTop();



                                    if(current > window.posStickTopHeader) {

                                        $headerSticky.addClass('fixed');



                                        if (current > latestScroll && current > window.posStickBottomHeader) {

                                            $elementForStick.addClass('hide-header');

                                        } 

                                        else {

                                            $elementForStick.removeClass('hide-header');

                                        }

                                    }

                                    else {

                                        $headerSticky.removeClass('fixed');

                                    }



                                    if(current > window.posStickBottomHeader) {

                                        $headerSticky.addClass('scale-header');

                                    }

                                    else {

                                        $headerSticky.removeClass('scale-header');

                                    }



                                    latestScroll = current;

                                }

                            });

                        }



                        function initStickyHeader() {

                            offsetTop = $('.hun-page').offset().top;

                            window.posStickTopHeader = $elementForStick.offset().top - offsetTop;

                            window.posStickBottomHeader = $elementForStick.offset().top + $elementForStick.outerHeight() - offsetTop;

                            window.topHideHeader = - $elementForStick.outerHeight() - 10;



                            $headerSticky.css('min-height', $headerSticky.outerHeight() + 'px');

                            $elementForStick.css('top', offsetTop + 'px');



                            $elementForStick.addClass('transition-sticky');

                        }



                        function destroyStickyHeader() {

                            $elementForStick.removeClass('transition-sticky');

                            $headerSticky.removeClass('fixed');

                            $elementForStick.css('top', '');

                            $headerSticky.css('min-height', '');

                        } 

                    } catch(er) {console.log(er);}



                    // Responsive Sub-menu

                    if(!$header.hasClass('header-inited')) try {

                        $(window).on('load',function(){

                            if($('html').is('[dir="rtl"]')) {

                                responSubMenuRtl();

                            }

                            else {

                                responSubMenu();

                            }

                        });



                        $(window).on('resize',function(){

                            if($('html').is('[dir="rtl"]')) {

                                responSubMenuRtl();

                            }

                            else {

                                responSubMenu();

                            }

                        });



                        var responSubMenu = function(){

                            $header.find('.main-navigation .list-menu > li').each(function(){

                                var $obj = $(this);

                                var posRight = 0;

                                var posRightSub = 0;

                                var $deepestSubMenu = $obj.children('.sub-menu').children().children('.sub-menu');

                                var numOfSubMenu = 1;



                                while($deepestSubMenu.find('.sub-menu').length > 0) {

                                    numOfSubMenu++;

                                    $deepestSubMenu = $deepestSubMenu.find('.sub-menu');

                                }



                                if($obj.children('.sub-menu').length > 0) {

                                    posRight = $obj.offset().left + $obj.children('.sub-menu').outerWidth();



                                    if($deepestSubMenu.length > 0) {

                                        posRightSub = posRight + $deepestSubMenu.outerWidth() * numOfSubMenu;

                                    }

                                }



                                if(posRight >= $(window).width()) { 

                                    var move = posRight - $(window).width();

                                    $obj.children('.sub-menu').css('left', '-' + move + 'px');

                                }

                                else {

                                    $obj.children('.sub-menu').css('left', '0');

                                }



                                if(posRightSub >= $(window).width()) { 

                                    $obj.children('.sub-menu').find('.sub-menu').css({'left':'auto','right':'calc(100%)'});

                                }

                                else {

                                    $obj.children('.sub-menu').find('.sub-menu').css({'right':'auto','left':'calc(100%)'});

                                }

                            });

                        };



                        var responSubMenuRtl = function(){

                            $header.find('.main-navigation .list-menu > li').each(function(){

                                var $obj = $(this);

                                var posRight = 0;

                                var posRightSub = 0;

                                var $deepestSubMenu = $obj.children('.sub-menu').children().children('.sub-menu');

                                var numOfSubMenu = 1;



                                while($deepestSubMenu.find('.sub-menu').length > 0) {

                                    numOfSubMenu++;

                                    $deepestSubMenu = $deepestSubMenu.find('.sub-menu');

                                }



                                if($obj.children('.sub-menu').length > 0) {

                                    posRight = $obj.offset().left + $obj.children('.sub-menu').outerWidth();



                                    if($deepestSubMenu.length > 0) {

                                        posRightSub = posRight + $deepestSubMenu.outerWidth() * numOfSubMenu;

                                    }

                                }



                                if(posRight >= $(window).width()) { 

                                    var move = posRight - $(window).width();

                                    $obj.children('.sub-menu').css('right', '-' + move + 'px');

                                }

                                else {

                                    $obj.children('.sub-menu').css('right', '0');

                                }



                                if(posRightSub >= $(window).width()) { 

                                    $obj.children('.sub-menu').find('.sub-menu').css({'right':'auto','left':'calc(100%)'});

                                }

                                else {

                                    $obj.children('.sub-menu').find('.sub-menu').css({'left':'auto','right':'calc(100%)'});

                                }

                            });

                        };

                    } catch(er) {console.log(er);}

                    

                    // Mobile

                    if(!$header.hasClass('header-inited')) try {

                        $header.find('.hun-menu-mobile .list-menu li.menu-item-has-children').append('<span class="toggle-sub-menu"></span>');

                        var $menuMobile = $header.find('.hun-menu-mobile');

                        var $btnToggle = $menuMobile.find('.btn-toggle-menu');

                        var $toggleSubMenu = $menuMobile.find('.toggle-sub-menu');

                        var $mobileNavigation = $menuMobile.find('.mobile-navigation');



                        $btnToggle.off('click');

                        $btnToggle.on('click', function(e) {

                            e.preventDefault();

                            e.stopPropagation();



                            if(!$menuMobile.hasClass('menu-mobile-active')) {

                                $menuMobile.addClass('menu-mobile-active');

                            }

                            else {

                                $menuMobile.removeClass('menu-mobile-active');

                            }

                        });



                        $(document).on('click', function() {

                            $menuMobile.removeClass('menu-mobile-active');

                        });



                        $toggleSubMenu.off('click');

                        $toggleSubMenu.on('click', function() {

                            if ($(this).prev('ul.sub-menu').is(':hidden')) {

                                $(this).prev('ul.sub-menu').slideDown(200, 'linear');

                                if(!$(this).hasClass('icon-up')) {

                                    $(this).addClass('icon-up');

                                }

                            } 

                            else {

                                $(this).prev('ul.sub-menu').slideUp(200, 'linear');

                                $(this).removeClass('icon-up');

                            }

                        });



                        $mobileNavigation.off('click');

                        $mobileNavigation.on('click', function(e) {

                            e.stopPropagation();

                        })



                        /*---------------------------------------------*/

                        if ($(window).outerWidth() < 992) {

                            var hideIconTimeOut;

                            var $btnToggleAutoHide = $menuMobile.find('.btn-toggle-menu.auto-hide');



                            hideIcon();



                            $(window).on('scroll', function() {

                                if($btnToggleAutoHide.hasClass('hidden-btn')) {

                                    clearTimeout(hideIconTimeOut);

                                    $btnToggleAutoHide.removeClass('hidden-btn');

                                    hideIcon();

                                }

                            });

                        }



                        function hideIcon() {

                            hideIconTimeOut = setTimeout(function(){ 

                                $btnToggleAutoHide.addClass('hidden-btn');

                            }, 3000);

                        }

                    } catch(er) {console.log(er);}



                    $header.addClass('header-inited');

                }

            });

        },

            



        /*\

         *

         * Search

         *

        \*/

        search: function() {

            try {

                $('.hun-page .js-call-search').each(function() {

                    if(!$(this).hasClass('search-inited')) {

                        $(this).addClass('search-inited')

                        

                        var $eSearch = $(this);

                        var $btnOpen = $eSearch.find('.search-open');

                        var $btnClose = $eSearch.find('.search-close');

                        var $searchForm = $eSearch.find('.search-form');

                        var $searchField = $eSearch.find('.search-field');



                        $btnOpen.on('click', function(){

                            $searchForm.addClass('open');

                            setTimeout(function() { $searchField.focus(); }, 800);



                            if($('html').outerHeight() > $(window).outerHeight()){

                                $('html').css('margin-right', '17px');

                            }

                            $('html').css('overflow', 'hidden');

                        });



                        $btnClose.on('click', function(){

                            $searchForm.removeClass('open');



                            $('html').css('margin-right', '');

                            $('html').css('overflow', '');

                        });



                        $(window).on('keydown', function( event ) {

                            if ( event.which === 27 ) {

                                $searchForm.removeClass('open');

                                

                                $('html').css('margin-right', '');

                                $('html').css('overflow', '');

                            }

                        });

                    }

                })

            } catch(er) {console.log(er);}

        },

            



        /*\

         *

         * dropdownTab

         *

        \*/

        dropdownTab: function() {

            try {

                $('.hun-page .js-call-dropdown-tab').each(function() {

                    if(!$(this).hasClass('search-inited')) {

                        $(this).addClass('search-inited');



                        var $thisDropdownTab = $(this);

                        var $toggleTab = $thisDropdownTab.find('.toggle-tab');

                        var $panelTab = $thisDropdownTab.find('.panel-tab');



                        $panelTab.not('.active-tab').hide();



                        $toggleTab.on('click', function(e) { 



                            var dataTab = $(this).attr('data-tab');

                            var $thisPanel = $thisDropdownTab.find('.panel-tab[data-tab="' + dataTab + '"]');



                            $toggleTab.not(this).removeClass('active-tab');

                            $(this).toggleClass('active-tab');



                            $panelTab.not($thisPanel).slideUp('fast').removeClass('active-tab');

                            $thisPanel.slideToggle('fast').toggleClass('active-tab');

                        });



                        $panelTab.each(function() {

                            var $thisPanel = $(this);

                            var $btnUncheck = $thisPanel.find('.btn-uncheck-all');



                            $btnUncheck.on('click', function(e) { 

                                $thisPanel.find('.options-filter input[type="checkbox"]').prop('checked', false)



                            });

                        });

                    }

                });

            } catch(er) {console.log(er);}

        },





        /*\

         *

         * countDown

         *

        \*/

        countDown: function() {

            try {

                $('.hun-page .js-call-countdown').each(function() {

                    var endYear = 0;

                    var endMonth = 0;

                    var endDate = 0;

                    var endHours = 0;

                    var endMinutes = 0;

                    var endSeconds = 0;

                    var myTimeZone = "";



                    if($(this).attr('data-year') != null && $(this).attr('data-year') != '') {

                        endYear = $(this).attr('data-year')

                    }

                    if($(this).attr('data-month') != null && $(this).attr('data-month') != '') {

                        endMonth = $(this).attr('data-month')

                    }

                    if($(this).attr('data-date') != null && $(this).attr('data-date') != '') {

                        endDate = $(this).attr('data-date')

                    }

                    if($(this).attr('data-hours') != null && $(this).attr('data-hours') != '') {

                        endHours = $(this).attr('data-hours')

                    }

                    if($(this).attr('data-minute') != null && $(this).attr('data-minute') != '') {

                        endMinutes = $(this).attr('data-minute')

                    }

                    if($(this).attr('data-second') != null && $(this).attr('data-second') != '') {

                        endSeconds = $(this).attr('data-second')

                    }

                    if($(this).attr('data-timezone') != null && $(this).attr('data-timezone') != '') {

                        myTimeZone = $(this).attr('data-timezone')

                    }



                    $(this).countdown100({

                        /*Set Endtime here*/

                        /*Endtime must be > current time*/

                        endtimeYear: endYear,

                        endtimeMonth: endMonth,

                        endtimeDate: endDate,

                        endtimeHours: endHours,

                        endtimeMinutes: endMinutes,

                        endtimeSeconds: endSeconds,

                        timeZone: myTimeZone

                        // ex:  timeZone: "America/New_York"

                        //go to " http://momentjs.com/timezone/ " to get timezone

                    });

                });



            } catch(er) {console.log(er);}

        },





        /*\

         *

         * stickySidebar

         *

        \*/

        stickySidebar: function() {

            try {

                $('.hun-page .js-call-sticky-sidebar').each(function() {

                    if(!$(this).hasClass('sticky-sidebar-inited')) {

                        $(this).addClass('sticky-sidebar-inited')

                        

                        var offsetTop = $('.hun-page').offset().top + 10;

                        var spacingTop = $('.hun-page').offset().top + 10;



                        if($('.hun-page .hun-header.style-sticky .element-for-stick').length) {

                            offsetTop += $('.hun-page .hun-header.style-sticky .element-for-stick').outerHeight();

                        }



                        $(this).each(function () {

                            if ($(this).length > 0) {

                                if ( $().theiaStickySidebar ) {

                                    $(this).theiaStickySidebar({

                                        'typeSticky'            : 1,

                                        'spacingTopDefault'     : spacingTop,

                                        'containerSelector'     : '',

                                        'additionalMarginTop'   : offsetTop,

                                        'additionalMarginBottom': 10,

                                        'updateSidebarHeight'   : false,

                                        'minWidth'              : 992,

                                        'sidebarBehavior'       : 'modern',

                                    });

                                }

                            }

                        });

                    }

                });                        

            } catch(er) {console.log(er);}

        },





        /*\

         *

         * accordion

         *

        \*/

        accordion: function() { 

            try {

                $('.js-call-accordion').each(function(){

                    var wraper = $(this);

                    var items = $(this).find('.js-dropdown');



                    $(items).each(function(){

                        var item = $(this);



                        if($(item).hasClass('active-dropdown')) {

                            $(item).find('.js-dropdown-content').show();

                        }

                        else {

                            $(item).find('.js-dropdown-content').hide();

                        }



                        $(item).find('.js-toggle-dropdown').on('click', function(){

                            if(!$(item).hasClass('active-dropdown')) {

                                $(items).removeClass('active-dropdown');

                                $(items).find('.js-dropdown-content').slideUp();



                                $(item).toggleClass('active-dropdown');

                                $(item).find('.js-dropdown-content').slideDown();

                            }

                            else {

                                $(items).removeClass('active-dropdown');

                                $(items).find('.js-dropdown-content').slideUp();

                            }

                        });

                    })

                        

                });

            } catch(er) {console.log(er);}   

        },





        /*\

         *

         * tablePricing

         *

        \*/

        tablePricing: function() { 

            try {

                $('.js-call-table-pricing').each(function(){

                    var $thisTable = $(this);

                    var $naviTable = $(this).find('.navi-table');

                    var $contentRow = $(this).find('.content-row');

                    var $column = $(this).find('.column-table');

                    var startAt = Number($(this).attr('data-start-at')) - 1;



                    /*---------------------------------------------*/

                    

                    var numOfCol = 0;



                    for(var i=0; i < $contentRow.length; i++) {

                        var temp = $($contentRow[i]).find('.column-table').length;



                        if(temp >= numOfCol) {

                            numOfCol = temp;

                        }

                    }



                    /*---------------------------------------------*/



                    var numVisibleCol = Math.round($contentRow.outerWidth() / $column.outerWidth());

                    var numHiddenCol = numOfCol - numVisibleCol;

                    var activeIndex = (startAt >= 0 && startAt <= numHiddenCol) ? startAt : 0;



                    $column.css('transform', 'translateX(' + activeIndex * (-100) + '%)');



                    if(activeIndex === 0) {

                        $thisTable.removeClass('end');

                        $thisTable.addClass('start');

                    }

                    else if(activeIndex === numHiddenCol) {

                        $thisTable.removeClass('start');

                        $thisTable.addClass('end');

                    }



                    if(numHiddenCol <= 0) {

                        $thisTable.addClass('no-navi');

                    }

                    else {

                        $thisTable.removeClass('no-navi');

                    } 



                    /*---------------------------------------------*/



                    $(window).on('resize', function() {

                        numVisibleCol = Math.round($contentRow.outerWidth() / $column.outerWidth());

                        numHiddenCol = numOfCol - numVisibleCol;

                        activeIndex = (startAt >= 0 && startAt <= numHiddenCol) ? startAt : 0;



                        $column.css('transform', 'translateX(' + activeIndex * (-100) + '%)');



                        if(activeIndex === 0) {

                            $thisTable.removeClass('end');

                            $thisTable.addClass('start');

                        }

                        else if(activeIndex === numHiddenCol) {

                            $thisTable.removeClass('start');

                            $thisTable.addClass('end');

                        }



                        if(numHiddenCol <= 0) {

                            $thisTable.addClass('no-navi');

                        }

                        else {

                            $thisTable.removeClass('no-navi');

                        } 

                    });



                    /*---------------------------------------------*/



                    $naviTable.find('.next-table').off('click');

                    $naviTable.find('.next-table').on('click', function() {

                        if(activeIndex + 1 <= numHiddenCol) {

                            activeIndex++;

                            $column.css('transform', 'translateX(' + activeIndex * (-100) + '%)');

                            $thisTable.removeClass('start end');

                        }



                        if(activeIndex === numHiddenCol) {

                            $thisTable.removeClass('start');

                            $thisTable.addClass('end');

                        }

                    });



                    $naviTable.find('.prev-table').off('click');

                    $naviTable.find('.prev-table').on('click', function() {

                        if(activeIndex - 1 >= 0) {

                            activeIndex--;

                            $column.css('transform', 'translateX(' + activeIndex * (-100) + '%)');

                            $thisTable.removeClass('start end');

                        }



                        if(activeIndex === 0) {

                            $thisTable.removeClass('end');

                            $thisTable.addClass('start');

                        }

                    });

                });

            } catch(er) {console.log(er);}   

        },





        /*\

         *

         * counter

         *

        \*/

        counter: function() {

            try {

                $('.js-counter').counterUp({

                    delay: 10,

                    time: 1000

                });

            } catch(er) {console.log(er);}

        },





        /*\

         *

         * hunTab

         *

        \*/

        hunTab: function() {

            try {

                $('.hun-page .js-call-hun-tab').each(function() {

                    var $thisTab = $(this);

                    var $itemNav = $(this).find('.wrap-nav-hun-tab .item-nav-hun-tab');

                    var $panelTab = $(this).find('.wrap-panel-hun-tab .panel-hun-tab');



                    if($(this).find('.wrap-nav-hun-tab .item-nav-hun-tab.active').length <= 0) {

                        $(this).find('.wrap-nav-hun-tab .item-nav-hun-tab:first-child').addClass('active');

                        $(this).find('.wrap-panel-hun-tab .panel-hun-tab:first-child').addClass('active');

                    }

                    else {

                        var idActive = $(this).find('.wrap-nav-hun-tab .item-nav-hun-tab.active').attr('id');

                        $thisTab.find('.wrap-panel-hun-tab [data-control-by="' + idActive + '"]').addClass('active');

                    }



                    $itemNav.off('click');

                    $itemNav.on('click', function() {

                        $itemNav.removeClass('active');

                        $panelTab.removeClass('active');



                        $(this).addClass('active');

                        $thisTab.find('.wrap-panel-hun-tab [data-control-by="' + $(this).attr('id') + '"]').addClass('active');

                    });

                })   

            } catch(er) {console.log(er);}

        },

    };



    window.mainJS = HunThemesMainJS;



    HunThemesMainJS.readyPage();



})(jQuery);


$("li.nav-main-item a.nav-main-link").click(function(e) { $(".c-navigation__mobile-link").click(); });
      $(".l-header").show();
'use strict';

$(document).ready(function() {

    //Typing string

    var headerTitle = document.querySelector('.header__title').innerHTML;

    if(headerTitle) {
        $(".header__title").typed({
                strings: [headerTitle],
                typeSpeed: 100,
                showCursor: false
        });
    }



    //Header Panel
    let headerPanel = $('.header__panel');
    let headerHeight = $('.header').height();
    let headerPanelHeight = $('.header__panel').height();


    function setHeaderPanelPos() {

        let scrolled = $(document).scrollTop();

        if( scrolled >= headerPanelHeight ) {
            headerPanel.addClass('fixed');
        } else {
            headerPanel.removeClass('fixed');
        }

    }

    $(document).scroll(setHeaderPanelPos);
    setHeaderPanelPos(); 


    //Navigation
    let navLink = $('.nav__list a[href^="#"], #goto_contact');

    navLink.click(function(e) {

        e.preventDefault();

        let anchor = $(this).attr('href');
        let section = $(anchor);

        let sectionTopPos = section.offset().top;

        $('body, html').animate({
            scrollTop: sectionTopPos - headerPanelHeight + 1
        }, 500);

    });

    window.changeServiceView = function changeServiceView(from, to) {
        $("#"+from).hide(300);
        $("#"+to).show(300);
    };

    jQuery('.contact-form-btn').click(function() {
        let name = jQuery('.input-name').val();
        let phone = jQuery('.input-phone').val();
        let err = false;

        if(!name.trim()) {
            jQuery('.input-name').css('background-color', '#dc7d7d');
            jQuery('.input-name').focus();
            err = true;
        } else {
            jQuery('.input-name').css('background-color', 'white')
        }
        if(!phone.match(/([0-9]{6})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/)) {
            jQuery('.input-phone').css('background-color', '#dc7d7d');
            jQuery('.input-phone').focus();
            err = true;
        } else {
            jQuery('.input-phone').css('background-color', 'white')
        }
        if(err == true) {
            return;
        }
        jQuery('.contact-form-btn').val('Processing...');
        jQuery.ajax({
            url: 'contact_form_submit.php',
            type: 'post',
            data: { name:name, phone:phone },
            success: function (result) {
                try {
                    var json = JSON.parse(result);
                    if(json.success) {
                        jQuery('.input-name, .input-phone, .contact-form-btn').hide(30);
                        jQuery('.green').show(30);
                    }
                    if(json.name) {
                        jQuery('.input-name').css('background-color', '#dc7d7d')
                    }
                    if(json.phone) {
                        jQuery('.input-phone').css('background-color', '#dc7d7d')
                    }
                    jQuery('.contact-form-btn').val('Get advice');
                } catch (e) {
                    console.log(e);
                }
            }
        });

    });

    initSlick();

    $(window).resize(function(){
        initSlick();
    });

    function initSlick() {

         if($(window).width() < 720) {
          $('.features__list').slick({
            infinite: true,
            slidesToShow: 1,
            arrows: false,
            dots: true,
            appendDots: '.features__dots'
          });
          $('.services__list').slick({
            infinite: true,
            slidesToShow: 1,
            arrows: false,
            dots: true,
            appendDots: '.services__dots'
          });
          } else {
            $('.features__list').slick('unslick');
            $('.services__list').slick('unslick');
          }


    }


    var mobileNavOpen = $('.mobileNavOpen');
    var mobileNavItem = $('.mobileMenu__nav_item_open');
    var mobileNavSubMenu = $('.mobileMenu__nav_subMenu');

    mobileNavOpen.click(function(e) {

        e.stopPropagation();

        mobileNavItem.toggleClass('mobileMenu__nav_item_current');
        mobileNavSubMenu.toggleClass('current');


    })

});


// The following line ensures that the code only runs when the document/page is loaded
$(document).ready(function() {
    
    // /* Scroll on buttons */
    // $('.js--scroll-to-plans').click(function () {
    //    $('html, body').animate({scrollTop: $('.js--section-plans').offset().top}, 1000); 
    // });
    
    // $('.js--scroll-to-start').click(function () {
    //    $('html, body').animate({scrollTop: $('.js--section-features').offset().top}, 1000); 
    // });
    
    // /* Navigation scroll */
    // $(function() {
    //   $('a[href*=#]:not([href=#])').click(function() {
    //     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    //       var target = $(this.hash);
    //       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    //       if (target.length) {
    //         $('html,body').animate({
    //           scrollTop: target.offset().top
    //         }, 1000);
    //         return false;
    //       }
    //     }
    //   });
    // });
    
    /* Mobile navigation */
    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');
        // This just opens and closes a box with the number being the time for the animation in ms
        // nav.slideToggle(200);
            nav.slideToggle('normal', function() {
            //   nav.css('display', '').toggleClass('displayInlineBlock displayNone');
              if (icon.hasClass('ion-navicon-round')) {
                icon.addClass('ion-close-round');
                icon.removeClass('ion-navicon-round');
            } else {
                icon.addClass('ion-navicon-round');
                icon.removeClass('ion-close-round');
                nav.css('display', '').toggleClass('displayInlineBlock displayNone');
            }        
            });

        // // This is to make the icon a cross when it is open and the three lines when it is closed
        // if (icon.hasClass('ion-navicon-round')) {
        //     icon.addClass('ion-close-round');
        //     icon.removeClass('ion-navicon-round');
        // } else {
        //     icon.addClass('ion-navicon-round');
        //     icon.removeClass('ion-close-round');
        // }        
    });
});
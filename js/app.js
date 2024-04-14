$(function() {

    /* Filter */

    let filter = $("[data-filter]");

    filter.on("click", function(event) {
        event.preventDefault();
        
        let cat = $(this).data('filter');

        if (cat == 'all') {
            $('[data-cat]').removeClass('hide');
        } else {

            $('[data-cat]').each(function() {

                let workCat = $(this).data('cat');
    
                console.log(workCat);
    
                if (workCat != cat) {
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
    
            });
        }
    });



    /* Modal */

    const modalCall = $('[data-modal]');
    const modalClose = $('[data-close]');

    modalCall.on('click', function(event) {
        event.preventDefault();

        let $this = $(this);
        let modalId = $this.data('modal');

        $(modalId).addClass('show');
        $('body').addClass('no-scroll');

        setTimeout(function() {

            $(modalId).find(".modal__dialog").css({
                transform: "rotateX(0)"
            });

        }, 200);

        $('[data-slider="slick"]').slick('setPosition');

    });

    modalClose.on('click', function(event) {
        event.preventDefault();

        let $this = $(this);
        let modalParent = $this.parents('.modal');

        modalParent.find(".modal__dialog").css({
            transform: "rotateX(90deg)"
        });

        setTimeout(function() {

            modalParent.removeClass('show');
            $('body').removeClass('no-scroll');

        }, 200);
    });


    $('.modal').on('click', function(event) {

        let $this = $(this);

        $this.find(".modal__dialog").css({
            transform: "rotateX(90deg)"
        });

        setTimeout(function() {

            $this.removeClass('show');
            $('body').removeClass('no-scroll');

        }, 200);

    });

    $('.modal__dialog').on('click', function(event) {
        event.stopPropagation();

    });

    /* Slider https://kenwheeler.github.io/slick/ */

      $('[data-slider="slick"]').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true
      });

      $('.slickPrev').on('click', function(event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');
        currentSlider.slick('slickPrev');

      });

      $('.slickNext').on('click', function(event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');
        currentSlider.slick('slickNext');

    });


    /* Mobile Nav */ 

    const navToggle = $('#navToggle');
    const nav = $('#nav');

              
    navToggle.on('click', function(event) {
        event.preventDefault();

        nav.toggleClass('show');

    });


});

/* Smooth Scrolling */
document.querySelectorAll('.social__link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        const targetId = link.getAttribute('href'); // Get the target ID
        const targetElement = document.querySelector(targetId); // Find the target element
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target element
        }
    });
    const filter = link.getAttribute('data-filter');
    console.log('Filter:', filter);
});

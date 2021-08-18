(function ($) {
	$(document).ready(function () {
		fadeIn();

		$('.mobile_slider').slick({
		  
		 	infinite: false,
		  slidesToShow: 1,
		  centerMode: true,
		});

        $('.custom_select').select2({
            closeOnSelect: false
        });

		if( $('.page_loader').length ) {
			var wordEl = $('.page_loader .word');

			wordEl.each(function(index){
				setTimeout(function () {
					if( (wordEl.length-1) === index ){
						wordEl.eq(index).addClass('animate stay');
					} else {
						wordEl.eq(index).addClass('animate');
					}
				},index*1800);

				setTimeout(function () {
					document.getElementById('video').play();

					$('.page_loader').fadeOut(function(){
                        setTimeout(function () {
                            $('.hero_content_wrap').addClass('show');
                            setTimeout(function(){
	                            $('.hero_content').addClass('show');
	                            $('header').addClass('show');
                            }, 1000)
                        }, 2000);
					});
				},wordEl.length *1800);
			});
		}

		$("a[href^='#']").click(function(e) {
		    e.preventDefault();        
		    $('html, body').animate({
		        scrollTop: $($(this).attr('href')).offset().top - 90
		    }, 800);
		});

		checkSection()

		$('.single_question').on('click', function(event) {
			$(this).toggleClass('active');
			$(this).find('p').slideToggle();
		});

		$('.access').on('click', function(event) {
			$('body').addClass('no_scroll');
			$('.contact_form_holder').fadeIn().addClass('active').removeClass('close');
		});

		$('.close_form').on('click', function(event) {
			$('body').removeClass('no_scroll');
			$('.contact_form_holder').removeClass('active').addClass('close');
			setTimeout(function(){
				$('.contact_form_holder').fadeOut();
			}, 1000);
		});

		$('.next').on('click', function(event) {
			$('.first_part').css('display', 'none');
			$('.second_part').css('display', 'block');
			$('.page .first').removeClass('active');
			$('.page .second').addClass('active');
		});

		$('.prev').on('click', function(event) {
			$('.first_part').css('display', 'block');
			$('.second_part').css('display', 'none');
			$('.page .first').addClass('active');
			$('.page .second').removeClass('active');
		});

		$('.read_more').on('click', function(event) {

			if ($(this).text() == "Read More") {
				$(this).text('Read Less')
			} else if($(this).text('Read Less')){
				$(this).text('Read More')
			}

			$('.hidden').slideToggle();
		});
		setTimeout(function(){

			$( ".select2-selection__arrow" ).each(function( index ) {
			  $(this).append('<img src="images/select_arrow.svg"/>')
			});

			$( ".select2-selection--multiple" ).each(function( index ) {
			  $(this).append('<span class="select2-selection__arrow" role="presentation"><b role="presentation"></b><img src="images/select_arrow.svg"></span>')
			});
		}, 1000)

		// $( ".select2-selection--multiple, .select2-selection--single" ).on('click', function(event) {
		// 	$('.select2-selection__arrow').removeClass('rotate');
		// 	$(this).find('.select2-selection__arrow').addClass('rotate');
		// });

		var clicked = false;
		var newUrl;

		var url_string = window.location.href; //window.location.href
		var url = new URL(url_string);
		var paramValue = url.searchParams.get("story");
		if (paramValue) {
			
			$( ".single_storie_wrap" ).each(function( index ) {
			  if ($(this).data('url') == paramValue) {

			  	$( ".single_storie_wrap" ).fadeOut('fast').removeClass('close');
			  	$( ".single_storie_content" ).scrollTop(0);
				$(this).fadeIn('fast').addClass('active');
			  }
			});
		}
		$('.single_news_wrap').on('click', function(event) {
			var currentStory = $(this).data('story');

			$( ".single_storie_wrap" ).each(function( index ) {
			  if ($(this).data('story') == currentStory) {
			  	var currentUrl = $(this).data('url');
			  	newUrl = '?story='+currentUrl+'';
                window.history.pushState("","", newUrl);

			  	$( ".single_storie_wrap" ).fadeOut('fast').removeClass('close');
			  	$( ".single_storie_content" ).scrollTop(0);
				$(this).fadeIn('fast').addClass('active');
			  }
			});


			$('body').addClass('no_scroll');
		});

		$('.close_popup').on('click', function(event) {
			
			$('body').removeClass('no_scroll');
			$('.single_storie_wrap').removeClass('active').addClass('close');
			setTimeout(function(){
				$('.single_storie_wrap').fadeOut();
			}, 1000);
		});

		$( "video" ).hover(
		  function() {
		    $('.hero_content_wrap').css('width', '60%');
		  }, function() {
		    $('.hero_content_wrap').css('width', '66%');
		  }
		);
	})

	$(window).scroll(function() {


		fadeIn()
		checkSection()
		var scrollTop = $(window).scrollTop();

		if (scrollTop > 0) {
			$(".tint-mask").css({
			    opacity: 0 + (scrollTop / 4) / 100
			});
		} else{
			$(".tint-mask").css({
			    opacity: 0
			});
		}

		if ( scrollTop > $('.hero_wrap').height() ) { 
			$('.secondary_header').addClass('active');
			$('header').addClass('remove');
		} else{
			$('.secondary_header').removeClass('active');
			$('header').removeClass('remove');
		}
	});

	function checkSection() {
	    var winHeight = $(window).height();
	    var winWidth = $(window).width();
	    var winHalf = winHeight / 3 ;
	    var bodyScroll = $(document).scrollTop();
	    var calcHeight = bodyScroll + winHalf ;

	    $('.single_section').each(function(index, el) {
	        if ($(this).offset().top < (bodyScroll + winHalf) && $(this).offset().top > bodyScroll) {
	            var id = $(this).attr('id');

	            if ($('.secondary_header ul li a[href="#' + id + '"]').length) {
	                $('.secondary_header ul li a').removeClass('active');
	                $('.secondary_header ul li a[href="#' + id + '"]').addClass('active');
	            }
	        }

	    });
	}

	function fadeIn() {
	   var winHeight = $(window).height();
        var bodyScroll = $(document).scrollTop();
        var calcHeight = bodyScroll + winHeight;


	    $('.fadein-wrap').each(function(index, el) {
	        if ($(this).offset().top < calcHeight && $(this).offset().top + $(this).height() > bodyScroll) {
	            if (!$(this).hasClass('in-view')) {
	                $(this).addClass('in-view');
	            }
	        }
	    });
	}
})(jQuery);
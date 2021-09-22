(function($) {

    $(document).ready(function() {
        fadeIn();

       

        function openModal() {
            $('.form_holder').scrollTop(0);

            var tl = gsap.timeline({
                onStart: function() {
                    $("body").addClass("init__modal");
                },
            });
            let modal = $(".contact_form_wrap");
            let heading = modal.find(".form_header");
            let details = modal.find(".form_holder");

            tl.to(modal, { width: "100%", ease: "Expo.easeIn" });
            tl.from(heading, { opacity: 0, yPercent: 100 }, "-=.2");
            tl.from(details, { opacity: 0 }, "-=.2");
        }

        function closeModal() {
            var tl = gsap.timeline({
                onComplete: function() {
                    $("body").removeClass("init__modal");
                },
            });
            let modal = $(".contact_form_wrap");
            let heading = modal.find(".form_header");
            let details = modal.find(".form_holder, .success_message_content_wrap");

            gsap.to(heading, { opacity: 0 });
            tl.to(details, { opacity: 0 });
            tl.to(modal, { width: 0, ease: "Expo.easeOut" });
            tl.set(".contact_form_wrap *", { clearProps: "all" });
        }

        $('.mobile_slider').slick({
            infinite: false,
            slidesToShow: 1,
            centerMode: true,
        });

        $('.custom_select').select2({
            closeOnSelect: false
        });

        let loader = sessionStorage.getItem("loader");
        
        if ($('.page_loader').length && loader != 'true') {

            sessionStorage.setItem('loader', 'true');

            var wordEl = $('.page_loader .word');
            setTimeout(function() {
                wordEl.each(function(index) {
                    setTimeout(function() {
                        if ((wordEl.length - 1) === index) {
                            wordEl.eq(index).addClass('animate stay');
                        } else {
                            wordEl.eq(index).addClass('animate');
                        }
                    }, index * 1800);

                    setTimeout(function() {
                        document.getElementById('video').play();

                        $('.page_loader').fadeOut(function() {
                            setTimeout(function() {
                                $('.hero_content_wrap').addClass('show');
                                setTimeout(function() {
                                    $('.hero_content').addClass('show');
                                    $('header').addClass('show');
                                }, 500)
                            }, 1000);
                        });
                    }, wordEl.length * 1800);
                });
            }, 500);
        } else{
            document.getElementById('video').play();

            $('.page_loader').fadeOut(function() {
                setTimeout(function() {
                    $('.hero_content_wrap').addClass('show');
                    setTimeout(function() {
                        $('.hero_content').addClass('show');
                        $('header').addClass('show');
                    }, 500)
                }, 1000);
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
            openModal();
        });

        $('.close_form').on('click', function(event) {
            closeModal();
        });

        $('.next, .page .second').on('click', function(event) {
            if (validateForm()) {
                $('.form_holder').scrollTop(0);
                $('.first_part').css('display', 'none');
                $('.second_part').css('display', 'block');
                $('.page .first').removeClass('active');
                $('.page .second').addClass('active');
                $('.form_header_headline').text('Investment Preferences');
            }
        });

        $('.next, .page .second').keypress(function (e) {
            var key = e.which;
            if(key == 13)  // the enter key code
             {
               $(this).click();
               return false;  
             }
        }); 

        $('.prev, .page .first').keypress(function (e) {
            var key = e.which;
            if(key == 13)  // the enter key code
             {
               $(this).click();
               return false;  
             }
        }); 

        $('.prev, .page .first').on('click', function(event) {
            $('.first_part').css('display', 'block');
            $('.second_part').css('display', 'none');
            $('.page .first').addClass('active');
            $('.page .second').removeClass('active');
            $('.form_header_headline').text('Personal Information');
        });

        function validateForm() {
          var isValid = true;
          $('.input_holder input').each(function() {
            if ( $(this).val() === '' ){
                isValid = false;
                $(this).parent().addClass('not_valid')
            } else{
                $(this).parent().removeClass('not_valid')
            }

          });

          return isValid;
        }

        $('.read_more').on('click', function(event) {

            if ($(this).text() == "Read More") {
                $(this).text('Read Less')
            } else if ($(this).text('Read Less')) {
                $(this).text('Read More')
            }

            $('.hidden').slideToggle();
        });

        setTimeout(function() {

            $(".select2-selection__arrow").each(function(index) {
                $(this).append('<img src="images/select_arrow.svg"/>')
            });

            $(".select2-selection--multiple").each(function(index) {
                $(this).append('<span class="select2-selection__arrow" role="presentation"><b role="presentation"></b><img src="images/select_arrow.svg"></span>')
            });
        }, 1000)

        // $( ".select2-selection--multiple, .select2-selection--single" ).on('click', function(event) {
        //  $('.select2-selection__arrow').removeClass('rotate');
        //  $(this).find('.select2-selection__arrow').addClass('rotate');
        // });

        var clicked = false;
        var newUrl;

        var url_string = window.location.href; //window.location.href
        var url = new URL(url_string);
        var paramValue = url.searchParams.get("story");

        if (paramValue) {
            $(".single_story_wrap").each(function(index) {
                $(".single_story_content").css('width', '100%');
                if ($(this).data('url') == paramValue) {
                    var currentModal = $(this);
                    openNews(currentModal);
                }
            });
        }

        function openNews(modal) {
            var tl = gsap.timeline({
                onStart: function() {
                    $("body").addClass("init__news");
                    $(modal).addClass("active");
                },
                onComplete: function() {
                    $(".single_story_content").css('width', '100%');
                    clicked = true;
                }
            });

            let modalT = modal.find(".single_story_content");
            let heading = modal.find(".single_story_hero");
            let details = modal.find(".story_content");

            tl.to(modalT, { width: "100%", ease: "Expo.easeIn" });
            tl.from(heading, { opacity: 0 });
            tl.from(details, { opacity: 0 }, "-=.2");

        }

        function closeNews(modal) {
            var tl = gsap.timeline({
                onComplete: function() {
                    $("body").removeClass("init__news");
                    $(modal).removeClass("active");
                    $(".single_story_content").css('width', '0%');
                    clicked = false;
                },
            });

            let modalT = modal.find(".single_story_content");
            let heading = modal.find(".single_story_hero");
            let details = modal.find(".story_content");
            
            gsap.to(heading, { opacity: 0 });
            tl.to(details, { opacity: 0 });
            tl.to(modalT, { width: 0, ease: "Expo.easeOut" });
            tl.set(".single_story_content *", { clearProps: "all" });
        }

        $('.single_news_wrap').on('click', function(event) {
            var currentStory = $(this).data('story');

            $(".single_story_wrap").each(function(index) {
                var currentModal = $(this);
                if ($(this).data('story') == currentStory) {
                    var currentUrl = $(this).data('url');
                    newUrl = '?story=' + currentUrl + '';
                    window.history.pushState("", "", newUrl);
                    if (clicked == false) {
                        openNews(currentModal);
                    } else{
                        $(".single_story_content").css('width', '100%');
                        $(".single_story_wrap").removeClass('active');
                        openNews(currentModal);
                        setTimeout(function(){
                            $(".single_story_content").animate({ scrollTop: 0 });
                        }, 500)
                    }

                    var title = $(this).find('h2').text();
                    var shareFacebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href + '&t=' + title
                    var shareTwitterUrl = 'https://twitter.com/share?url=' + window.location.href + '&text=' + title
                    var shareLinkedinUrl = 'http://www.linkedin.com/shareArticle?mini=true&url=' + window.location.href

                    $(this).find('.facebook').attr('href', shareFacebookUrl);
                    $(this).find('.twitter').attr('href', shareTwitterUrl);
                    $(this).find('.linkedin').attr('href', shareLinkedinUrl);
                }
            });


            // $('body').addClass('no_scroll');
        });

        $('.close_popup').on('click', function(event) {
            var currentModal = $(this).parent().parent().parent();
            closeNews(currentModal);
        });

        $("video").hover(
            function() {
                $('.hero_content_wrap').css('width', '60%');
            },
            function() {
                $('.hero_content_wrap').css('width', '66%');
            }
        );

        $("#requestAccessForm").on("submit", function (event) {
            event.preventDefault();
            var $form = $(this);
            var origin = window.location.origin;
            var url = origin + "/mail.php";
            // var subject = "";
            // var fname = "";
            // var lname = "";
            // var email = "";
            // var zip = "";
        
            var subject = "Request Access Form Submission";
            var fname = $form.find('input[name="first_name"]').val();
            var lname = $form.find('input[name="last_name"]').val();
            var email = $form.find('input[name="email"]').val();
            var phone = $form.find('input[name="phone"]').val();
            var zip = $form.find('input[name="zip"]').val();
    
            var itype = $form.find('select[name="investor_type"]').val();
            var ptype = $form.find('select[name="property_types"]').val();
            var objective = $form.find('select[name="investment_objective"]').val();
            var istatus = $form.find('select[name="investor_status"]').val();
            var amount = $form.find('select[name="amount_per_offering"]').val();

            $.ajax({
              url: url,
              data: {
                subject: subject,
                fname: fname,
                lname: lname,
                email: email,
                phone: phone,
                zip: zip,
                itype: itype,
                ptype: ptype,
                objective: objective,
                istatus: istatus,
                amount: amount
              },
              type: "POST",
              error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.responseText);
              },
              success: function (data) {
                $("#requestAccessForm").trigger("reset");
                gsap.to(".success_message_wrap", { opacity: 1 , pointerEvents: "initial"});
              },
            });
          });
    })

    $(window).scroll(function() {
        fadeIn()
        checkSection()
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 0) {
            $(".tint-mask").css({
                opacity: 0 + (scrollTop / 4) / 100
            });
        } else {
            $(".tint-mask").css({
                opacity: 0
            });
        }

        if (scrollTop > $('.hero_wrap').height() - 200) {
            $('.secondary_header').addClass('active');
            $('header').addClass('remove');
        } else {
            $('.secondary_header').removeClass('active');
            $('header').removeClass('remove');
        }
    });

    function checkSection() {
        var winHeight = $(window).height();
        var winWidth = $(window).width();
        var winHalf = winHeight / 3;
        var bodyScroll = $(document).scrollTop();
        var calcHeight = bodyScroll + winHalf;

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
    var counter = false;

    function fadeIn() {
        var winHeight = $(window).height();
        var bodyScroll = $(document).scrollTop();
        var calcHeight = bodyScroll + winHeight;



        $('.fadein-wrap').each(function(index, el) {
            if ($(this).offset().top < calcHeight && $(this).offset().top + $(this).height() > bodyScroll) {
                if (!$(this).hasClass('in-view')) {
                    $(this).addClass('in-view');
                }

                if ($(this).hasClass('three_box_section') && counter == false) {
                    counter = true;
                    $('.count').each(function() {
                        $(this).prop('Counter', 0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 3000,
                            easing: 'swing',
                            step: function(now) {
                                if ($(this).hasClass('transactions')) {
                                    $(this).text('$' + Math.ceil(now) + 'M+');
                                } else if ($(this).hasClass('investors')) {
                                    $(this).text(getRupeesFormat(Math.ceil(now)) + '+');
                                } else if ($(this).hasClass('capital')) {
                                    $(this).text(getFormat('$' + Math.ceil(now)) + 'B');
                                } else {
                                    $(this).text(Math.ceil(now));
                                }
                            }
                        });
                    });

                    function getRupeesFormat(val) {
                        while (/(\d+)(\d{3})/.test(val.toString())) {
                            val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                        }
                        return val;
                    }

                    function getFormat(val) {
                        while (/(\d+)(\d{2})/.test(val.toString())) {
                            val = val.toString().replace(/(\d+)(\d{2})/, '$1' + '.' + '$2');
                        }
                        return val;
                    }
                }
            }
        });
    }

    //start form


})(jQuery);
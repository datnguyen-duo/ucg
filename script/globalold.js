(function ($) {
  $(document).ready(function () {
    function openModal() {
      $(".form_holder").scrollTop(0);

      var tl = gsap.timeline({
        onStart: function () {
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
        onComplete: function () {
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

    $("body").on("click", function (e) {
      if ($(this).hasClass("init__modal")) {
        var target = e.target;
        if (!target.closest(".contact_form_wrap, .select2-container")) {
          closeModal();
        }
      }
    });

    $(".single_question").on("click", function (event) {
      $(this).toggleClass("active");
      $(this).find("p").slideToggle();
    });

    $(".access").on("click", function (event) {
      openModal();
    });

    $(".close_form").on("click", function (event) {
      closeModal();
    });

    $(".next, .page .second").on("click", function (event) {
      if (validateForm()) {
        $(".form_holder").scrollTop(0);
        $(".first_part").css("display", "none");
        $(".second_part").css("display", "block");
        $(".page .first").removeClass("active");
        $(".page .second").addClass("active");
        $(".form_header_headline").text("Investment Preferences");
      }
    });

    $(".next, .page .second").keypress(function (e) {
      var key = e.which;
      if (key == 13) {
        // the enter key code
        $(this).click();
        return false;
      }
    });

    $(".prev, .page .first").keypress(function (e) {
      var key = e.which;
      if (key == 13) {
        // the enter key code
        $(this).click();
        return false;
      }
    });

    $(".prev, .page .first").on("click", function (event) {
      $(".first_part").css("display", "block");
      $(".second_part").css("display", "none");
      $(".page .first").addClass("active");
      $(".page .second").removeClass("active");
      $(".form_header_headline").text("Personal Information");
    });

    $(".read_more").on("click", function (event) {
      if ($(this).text() == "Read More") {
        $(this).text("Read Less");
      } else if ($(this).text("Read Less")) {
        $(this).text("Read More");
      }

      $(".hidden").slideToggle();
    });

    var clicked = false;
    var newUrl;

    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var paramValue = url.searchParams.get("story");

    if (paramValue) {
      $(".single_story_wrap").each(function (index) {
        $(".single_story_content").css("width", "100%");
        if ($(this).data("url") == paramValue) {
          var currentModal = $(this);
          openNews(currentModal);
        }
      });
    }

    // function openNews(modal) {
    //   var tl = gsap.timeline({
    //     onStart: function () {
    //       $("body").addClass("init__news");
    //       $(modal).addClass("active");
    //     },
    //     onComplete: function () {
    //       $(".single_story_content").css("width", "100%");
    //       clicked = true;
    //     },
    //   });

    //   let modalT = modal.find(".single_story_content");
    //   let heading = modal.find(".single_story_hero");
    //   let details = modal.find(".story_content");

    //   tl.to(modalT, { width: "100%", ease: "Expo.easeIn" });
    //   tl.from(heading, { opacity: 0 });
    //   tl.from(details, { opacity: 0 }, "-=.2");
    // }

    // function closeNews(modal) {
    //   var tl = gsap.timeline({
    //     onComplete: function () {
    //       $("body").removeClass("init__news");
    //       $(modal).removeClass("active");
    //       $(".single_story_content").css("width", "0%");
    //       clicked = false;
    //     },
    //   });

    //   let modalT = modal.find(".single_story_content");
    //   let heading = modal.find(".single_story_hero");
    //   let details = modal.find(".story_content");

    //   gsap.to(heading, { opacity: 0 });
    //   tl.to(details, { opacity: 0 });
    //   tl.to(modalT, { width: 0, ease: "Expo.easeOut" });
    //   tl.set(".single_story_content *", { clearProps: "all" });
    // }

    $(".single_news_wrap").on("click", function (event) {
      var currentStory = $(this).data("story");

      $(".single_story_wrap").each(function (index) {
        var currentModal = $(this);
        if ($(this).data("story") == currentStory) {
          var currentUrl = $(this).data("url");
          newUrl = "?story=" + currentUrl + "";
          window.history.pushState("", "", newUrl);
          if (clicked == false) {
            openNews(currentModal);
          } else {
            $(".single_story_content").css("width", "100%");
            $(".single_story_wrap").removeClass("active");
            openNews(currentModal);
            setTimeout(function () {
              $(".single_story_content").animate({ scrollTop: 0 });
            }, 500);
          }

          var title = $(this).find("h2").text();
          var shareFacebookUrl =
            "https://www.facebook.com/sharer/sharer.php?u=" +
            window.location.href +
            "&t=" +
            title;
          var shareTwitterUrl =
            "https://twitter.com/share?url=" +
            window.location.href +
            "&text=" +
            title;
          var shareLinkedinUrl =
            "http://www.linkedin.com/shareArticle?mini=true&url=" +
            window.location.href;

          $(this).find(".facebook").attr("href", shareFacebookUrl);
          $(this).find(".twitter").attr("href", shareTwitterUrl);
          $(this).find(".linkedin").attr("href", shareLinkedinUrl);
        }
      });

      // $('body').addClass('no_scroll');
    });

    $(".close_popup").on("click", function (event) {
      var currentModal = $(this).parent().parent().parent();
      closeNews(currentModal);
    });

    $("body").on("click", function (e) {
      if ($(this).hasClass("init__news")) {
        var target = e.target;
        if (
          !target.closest(".single_story_wrap.active .single_story_content")
        ) {
          var currentModal = $(".single_story_wrap.active");
          closeNews(currentModal);
        }
      }
    });
  });
})(jQuery);

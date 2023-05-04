document.addEventListener("DOMContentLoaded", function () {
  gsap.fromTo(
    "#banner h1 span.bg",
    {
      clipPath: "inset(0 100% 0 0)",
    },
    {
      clipPath: "inset(0 0% 0 0)",
      delay: 0.3,
      ease: "Power1.inOut",
    }
  );

  gsap.utils.toArray("main section").forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      toggleClass: { targets: "body", className: "sec__" + (i + 1) },
    });
  });

  const counters = document.querySelectorAll(".count");
  const speed = 150;

  counters.forEach((counter) => {
    const animate = () => {
      const value = +counter.getAttribute("data-attribute-count");
      const data = +counter.innerText;

      const time = value / speed;
      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 1);
      } else {
        counter.innerText = value;
      }
    };
    ScrollTrigger.create({
      trigger: "#who-we-are",
      start: "top 50%",
      end: "bottom 50%",

      onEnter: () => {
        animate();
      },
    });
  });

  // function openModal(modal) {
  //   var tl = gsap.timeline({
  //     onStart: function () {
  //       document.body.classList.add("init__news");
  //       modal.classList.add("active");
  //     },
  //     onComplete: function () {
  //       clicked = true;
  //     },
  //   });

  //   let modalT = modal.querySelector(".single_story_content");
  //   let heading = modal.querySelector(".single_story_hero");
  //   let details = modal.querySelector(".story_content");

  //   tl.to(modalT, { width: "100%", ease: "Expo.easeIn" });
  //   tl.from(heading, { opacity: 0 });
  //   tl.from(details, { opacity: 0 }, "<");
  // }

  // function closeModal(modal) {
  //   var tl = gsap.timeline({
  //     onComplete: function () {
  //       document.body.classList.remove("init__news");
  //       modal.classList.remove("active");
  //       clicked = false;
  //       window.history.pushState("", "", window.location.href.split("?")[0]);
  //     },
  //   });

  //   let modalT = modal.querySelector(".single_story_content");
  //   let heading = modal.querySelector(".single_story_hero");
  //   let details = modal.querySelector(".story_content");

  //   gsap.to(heading, { opacity: 0 });
  //   tl.to(details, { opacity: 0 });
  //   tl.to(modalT, { width: 0, ease: "Expo.easeOut" });
  //   tl.set(".single_story_content *", { clearProps: "all" });
  // }

  var url_string = window.location.href; //window.location.href
  var url = new URL(url_string);
  var paramValue = url.searchParams.get("story");
  var posts = document.querySelectorAll(".single_story_wrap");

  if (paramValue) {
    posts.forEach((post) => {
      if (post.getAttribute("data-url") == paramValue) {
        post.classList.add("active");
        document.body.classList.add("init__news");
      }
    });
  }

  document.querySelectorAll(".close_popup").forEach((close) => {
    close.addEventListener("click", function () {
      posts.forEach((post) => {
        post.classList.remove("active");
      });
      document.body.classList.remove("init__news");
      window.history.pushState("", "", window.location.href.split("?")[0]);
    });
  });

  document.body.addEventListener("click", function (e) {
    if (this.classList.contains("init__news")) {
      var target = e.target;
      if (target.classList.contains("single_story_wrap")) {
        posts.forEach((post) => {
          post.classList.remove("active");
        });
        document.body.classList.remove("init__news");
        window.history.pushState("", "", window.location.href.split("?")[0]);
      }
    }
  });

  var blogCards = document.querySelectorAll(".resources__card");
  blogCards.forEach((card) => {
    var i = card.getAttribute("data-story");
    var modal = document.querySelector(
      ".single_story_wrap[data-story='" + i + "']"
    );
    card.addEventListener("click", function () {
      posts.forEach((post) => {
        post.classList.remove("active");
      });
      modal.classList.add("active");
      modal.querySelector(".single_story_content").scrollTop = 0;
      setTimeout(() => {
        document.body.classList.add("init__news");
      }, 100);
      var url = modal.getAttribute("data-url"),
        pushUrl = "?story=" + url;
      window.history.pushState("", "", pushUrl);
    });
  });
});

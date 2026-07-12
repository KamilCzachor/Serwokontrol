/* =========================================================
   Home Page Interactions
   ========================================================= */

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const mobileHeroMedia = window.matchMedia("(max-width: 768px)");

  function isMobileHero() {
    return mobileHeroMedia.matches;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  



  const slider = document.getElementById("homeHeroSlider");
  const slides = slider
    ? Array.from(slider.querySelectorAll(".home_hero_slide"))
    : [];
  const dots = Array.from(document.querySelectorAll("#homeHeroDots button"));
  const prevBtn = document.getElementById("homeHeroPrev");
  const nextBtn = document.getElementById("homeHeroNext");

  let activeSlide = 0;
  let sliderTimer = null;

  function showSlide(index) {
    if (!slides.length) return;

    activeSlide = (index + slides.length) % slides.length;

    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("is_active", slideIndex === activeSlide);
    });

    dots.forEach(function (dot, dotIndex) {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle("is_active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });
  }

  function stopSlider() {
    if (sliderTimer) {
      window.clearInterval(sliderTimer);
      sliderTimer = null;
    }
  }

  function startSlider() {
    if (prefersReducedMotion || isMobileHero() || slides.length < 2) return;

    stopSlider();
    sliderTimer = window.setInterval(function () {
      showSlide(activeSlide + 1);
    }, 6500);
  }

  if (slides.length) {
    showSlide(0);
    startSlider();

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        showSlide(activeSlide - 1);
        startSlider();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        showSlide(activeSlide + 1);
        startSlider();
      });
    }

    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        showSlide(index);
        startSlider();
      });
    });

    const hero = document.getElementById("homeHero");

    if (hero) {
      hero.addEventListener("mouseenter", stopSlider);
      hero.addEventListener("mouseleave", startSlider);
      hero.addEventListener("focusin", stopSlider);
      hero.addEventListener("focusout", startSlider);
    }

    

    let heroSwipeHintTimer = null;

    function hideHeroSwipeHint() {
      if (heroSwipeHintTimer) {
        window.clearTimeout(heroSwipeHintTimer);
        heroSwipeHintTimer = null;
      }

      const hint = document.getElementById("homeSwipeHint");
      if (hint) {
        hint.classList.remove("is_visible");
      }
    }

    function setupHeroSwipeHint() {
      if (!hero || isMobileHero() || !isTouchDevice || slides.length < 2) return;
      if (document.getElementById("homeSwipeHint")) return;

      const hint = document.createElement("div");
      hint.className = "swipe_hint home_swipe_hint";
      hint.id = "homeSwipeHint";
      hint.setAttribute("aria-hidden", "true");
      hint.innerHTML = `
        <span class="swipe_hint_icon" aria-hidden="true">
          <i class="fa-solid fa-arrow-left"></i>
          <i class="fa-solid fa-hand-pointer"></i>
          <i class="fa-solid fa-arrow-right"></i>
        </span>
        <span class="swipe_hint_text">Przesuń palcem</span>
      `;

      hero.appendChild(hint);

      window.setTimeout(function () {
        hint.classList.add("is_visible");

        heroSwipeHintTimer = window.setTimeout(function () {
          hideHeroSwipeHint();
        }, 3600);
      }, 700);
    }

    setupHeroSwipeHint();

    mobileHeroMedia.addEventListener("change", function () {
      hideHeroSwipeHint();

      if (isMobileHero()) {
        stopSlider();
      } else {
        startSlider();
        setupHeroSwipeHint();
      }
    });

    /* Touch / pen swipe navigation for larger touch devices only. */

    const swipeTarget = slider || hero;

    if (swipeTarget && window.PointerEvent && !isMobileHero()) {
      let swipePointerId = null;
      let swipeStartX = 0;
      let swipeStartY = 0;
      let swipeCurrentX = 0;
      let swipeCurrentY = 0;
      let swipeStartedAt = 0;
      let isSwipeTracking = false;

      function resetHeroSwipe() {
        swipePointerId = null;
        isSwipeTracking = false;
        swipeStartX = 0;
        swipeStartY = 0;
        swipeCurrentX = 0;
        swipeCurrentY = 0;
        swipeStartedAt = 0;
      }

      swipeTarget.addEventListener("pointerdown", function (event) {
        if (event.pointerType === "mouse" || slides.length < 2) return;

        hideHeroSwipeHint();

        swipePointerId = event.pointerId;
        swipeStartX = event.clientX;
        swipeStartY = event.clientY;
        swipeCurrentX = event.clientX;
        swipeCurrentY = event.clientY;
        swipeStartedAt = Date.now();
        isSwipeTracking = true;
        stopSlider();

        if (typeof swipeTarget.setPointerCapture === "function") {
          try {
            swipeTarget.setPointerCapture(event.pointerId);
          } catch (error) {
            // Pointer capture can fail on some embedded browsers.
          }
        }
      });

      swipeTarget.addEventListener("pointermove", function (event) {
        if (!isSwipeTracking || event.pointerId !== swipePointerId) return;

        swipeCurrentX = event.clientX;
        swipeCurrentY = event.clientY;
      });

      function finishHeroSwipe(event) {
        if (!isSwipeTracking || event.pointerId !== swipePointerId) return;

        const deltaX = swipeCurrentX - swipeStartX;
        const deltaY = swipeCurrentY - swipeStartY;
        const elapsed = Date.now() - swipeStartedAt;
        const isMostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.35;
        const hasEnoughDistance = Math.abs(deltaX) > 48;
        const hasEnoughVelocity = Math.abs(deltaX) > 34 && elapsed < 420;

        if (isMostlyHorizontal && (hasEnoughDistance || hasEnoughVelocity)) {
          if (deltaX < 0) {
            showSlide(activeSlide + 1);
          } else {
            showSlide(activeSlide - 1);
          }
        }

        resetHeroSwipe();
        startSlider();
      }

      swipeTarget.addEventListener("pointerup", finishHeroSwipe);
      swipeTarget.addEventListener("pointercancel", function (event) {
        if (event.pointerId === swipePointerId) {
          resetHeroSwipe();
          startSlider();
        }
      });
    }
  }

  



  const doborMedium = document.getElementById("doborMedium");
  const doborTask = document.getElementById("doborTask");
  const doborCondition = document.getElementById("doborCondition");
  const doborTitle = document.getElementById("doborTitle");
  const doborText = document.getElementById("doborText");
  const doborConsultLink = document.querySelector(".home_selector_result a");

  function updateDobor() {
    if (
      !doborMedium ||
      !doborTask ||
      !doborCondition ||
      !doborTitle ||
      !doborText
    ) {
      return;
    }

    const medium = doborMedium.value;
    const task = doborTask.value;
    const condition = doborCondition.value;

    let title = "Zawory elektromagnetyczne";
    let text =
      "Dobre rozwiązanie do szybkiego odcinania przepływu cieczy, gazów lub powietrza w prostszych układach automatyki.";

    if (task === "measure") {
      title = "Przepływomierze i aparatura pomiarowa";
      text =
        "Jeżeli najważniejszy jest pomiar procesu, warto zacząć od przepływomierzy, czujników i elementów kontrolno-pomiarowych.";
    } else if (condition === "highTemp" || medium === "steam") {
      title = "Zawory procesowe grzybkowe";
      text =
        "Przy wyższych temperaturach, parze i trudniejszych warunkach pracy warto sprawdzić zawory grzybkowe oraz właściwe wykonania materiałowe.";
    } else if (
      condition === "hygienic" ||
      condition === "aggressive" ||
      medium === "chemical"
    ) {
      title = "Zawory membranowe";
      text =
        "Dla mediów chemicznych, agresywnych i aplikacji higienicznych warto rozważyć zawory membranowe oraz odporne materiały uszczelnień.";
    } else if (task === "control") {
      title = "Głowice sterujące i pozycjonery";
      text =
        "Przy regulacji procesu ważne są elementy sterujące, pozycjonery, czujniki oraz właściwie dobrany zawór procesowy.";
    } else if (task === "replace") {
      title = "Dobór zamiennika";
      text =
        "Przy zamienniku najlepiej przygotować stary typ, numer katalogowy, zdjęcie tabliczki lub dokumentację techniczną.";
    }

    doborTitle.textContent = title;
    doborText.textContent = text;

    if (doborConsultLink) {
      const params = new URLSearchParams({
        dobor: "1",
        medium: medium,
        task: task,
        condition: condition,
      });

      doborConsultLink.href =
        "contact.html?" + params.toString() + "#contactFormSection";
    }
  }

  function getSelectedOptionText(select) {
    if (!select || !select.options || select.selectedIndex < 0) return "";
    return select.options[select.selectedIndex].textContent.trim();
  }

  function saveDoborSelectionForContact() {
    if (
      !doborMedium ||
      !doborTask ||
      !doborCondition ||
      !doborTitle ||
      !doborText
    ) {
      return;
    }

    const payload = {
      medium: doborMedium.value,
      mediumText: getSelectedOptionText(doborMedium),
      task: doborTask.value,
      taskText: getSelectedOptionText(doborTask),
      condition: doborCondition.value,
      conditionText: getSelectedOptionText(doborCondition),
      resultTitle: doborTitle.textContent.trim(),
      resultText: doborText.textContent.trim(),
      savedAt: Date.now(),
    };

    try {
      window.sessionStorage.setItem(
        "serwokontrolDoborSelection",
        JSON.stringify(payload),
      );
    } catch (error) {
      // Query parameters in the link are used as a fallback.
    }
  }

  if (doborConsultLink) {
    doborConsultLink.addEventListener("click", saveDoborSelectionForContact);
  }

  [doborMedium, doborTask, doborCondition].forEach(function (field) {
    if (!field) return;
    field.addEventListener("change", updateDobor);
  });

  updateDobor();

  /* =========================================================
     Hero parallax
     ========================================================= */

  if (!prefersReducedMotion) {
    const hero = document.getElementById("homeHero");
    const layers = document.querySelectorAll("[data-parallax-speed]");
    const cards = document.querySelectorAll("[data-parallax-card]");

    let ticking = false;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseInsideHero = false;

    function updateParallax() {
      const scrollY = window.scrollY || window.pageYOffset;

      layers.forEach(function (layer) {
        const speed = Number(layer.dataset.parallaxSpeed) || 0.1;
        const mouseSpeed = Number(layer.dataset.parallaxMouse) || 1;
        const scrollOffset = scrollY * speed;
        const x = isMouseInsideHero ? mouseX * mouseSpeed : 0;
        const y = isMouseInsideHero ? mouseY * mouseSpeed : 0;

        layer.style.transform =
          "translate3d(" + x + "px, " + (scrollOffset + y) + "px, 0)";
      });

      if (!isTouchDevice) {
        cards.forEach(function (card) {
          if (isMouseInsideHero) {
            card.style.transform =
              "translate3d(" +
              mouseX * -0.18 +
              "px, " +
              mouseY * -0.18 +
              "px, 0)";
          } else {
            card.style.transform = "translate3d(0, 0, 0)";
          }
        });
      }

      ticking = false;
    }

    function requestParallaxUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    if (hero && layers.length) {
      window.addEventListener("scroll", requestParallaxUpdate, {
        passive: true,
      });
      window.addEventListener("resize", requestParallaxUpdate, {
        passive: true,
      });

      if (!isTouchDevice) {
        hero.addEventListener("mousemove", function (event) {
          const rect = hero.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;

          mouseX = clamp(x / rect.width, -0.5, 0.5) * 42;
          mouseY = clamp(y / rect.height, -0.5, 0.5) * 42;
          isMouseInsideHero = true;
          requestParallaxUpdate();
        });

        hero.addEventListener("mouseleave", function () {
          mouseX = 0;
          mouseY = 0;
          isMouseInsideHero = false;
          requestParallaxUpdate();
        });
      }

      requestParallaxUpdate();
    }
  }
})();

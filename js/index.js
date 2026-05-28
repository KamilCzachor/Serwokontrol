/* =========================================================
   Home Page Interactions
   ========================================================= */

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /* =========================================================
     1. Scroll Progress
     ========================================================= */

  const progress = document.getElementById("homeScrollProgress");

  function updateProgress() {
    if (!progress) return;

    const scrollTop = window.scrollY || window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const value = height > 0 ? Math.min((scrollTop / height) * 100, 100) : 0;

    progress.style.width = value + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();

  /* =========================================================
     2. Szybki dobór produktu
     ========================================================= */

  const doborMedium = document.getElementById("doborMedium");
  const doborTask = document.getElementById("doborTask");
  const doborCondition = document.getElementById("doborCondition");
  const doborTitle = document.getElementById("doborTitle");
  const doborText = document.getElementById("doborText");

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
      "Dobre rozwiązanie do szybkiego odcinania przepływu cieczy lub powietrza w prostszych układach automatyki.";

    if (task === "measure") {
      title = "Przepływomierze i aparatura pomiarowa";
      text =
        "Jeżeli najważniejszy jest pomiar procesu, warto zacząć od przepływomierzy, czujników i elementów kontrolno-pomiarowych.";
    } else if (condition === "highTemp" || medium === "steam") {
      title = "Zawory grzybkowe";
      text =
        "Przy wyższych temperaturach, parze i trudniejszych warunkach pracy warto sprawdzić zawory grzybkowe.";
    } else if (condition === "hygienic" || medium === "chemical") {
      title = "Zawory membranowe";
      text =
        "Dla mediów chemicznych, aplikacji higienicznych lub tam, gdzie istotna jest separacja medium, warto rozważyć zawory membranowe.";
    } else if (task === "control") {
      title = "Regulatory i elementy sterujące";
      text =
        "Przy regulacji procesu ważne są elementy sterujące, pozycjonery, czujniki i właściwie dobrany zawór.";
    } else if (task === "replace") {
      title = "Dobór zamiennika";
      text =
        "Przy zamienniku najlepiej przygotować stary typ, numer katalogowy, zdjęcie tabliczki lub dokumentację.";
    }

    doborTitle.textContent = title;
    doborText.textContent = text;
  }

  [doborMedium, doborTask, doborCondition].forEach(function (field) {
    if (!field) return;
    field.addEventListener("change", updateDobor);
  });

  updateDobor();

  /* =========================================================
     3. Miniwyszukiwarka kategorii
     ========================================================= */

  const searchInput = document.getElementById("homeProductSearch");
  const searchResults = document.getElementById("homeSearchResults");

  const productHints = [
    {
      title: "Zawory elektromagnetyczne",
      text: "Sterowanie przepływem mediów w układach automatyki.",
      icon: "fa-toggle-on",
      keywords: [
        "zawór",
        "zawory",
        "elektromagnetyczny",
        "cewka",
        "woda",
        "powietrze",
      ],
    },
    {
      title: "Zawory grzybkowe",
      text: "Rozwiązania do wymagających aplikacji, temperatur i mediów.",
      icon: "fa-circle-nodes",
      keywords: ["grzybkowy", "para", "temperatura", "ciśnienie", "skośny"],
    },
    {
      title: "Zawory membranowe",
      text: "Dobór do mediów chemicznych, higienicznych i specjalnych.",
      icon: "fa-water",
      keywords: ["membranowy", "chemia", "higieniczny", "membrana"],
    },
    {
      title: "Przepływomierze",
      text: "Pomiar i kontrola przepływu w procesach technologicznych.",
      icon: "fa-chart-line",
      keywords: ["przepływ", "przepływomierz", "pomiar", "flow"],
    },
    {
      title: "Bürkert",
      text: "Produkty i rozwiązania Bürkert dla automatyki procesowej.",
      icon: "fa-microchip",
      keywords: ["burkert", "bürkert", "burkert", "produkty"],
    },
  ];

  function renderSearchResults(query) {
    if (!searchResults) return;

    const normalized = query.trim().toLowerCase();

    const results = normalized
      ? productHints.filter(function (item) {
          return item.keywords.some(function (keyword) {
            return keyword.includes(normalized) || normalized.includes(keyword);
          });
        })
      : productHints.slice(0, 3);

    if (!results.length) {
      searchResults.innerHTML =
        '<div class="home_search_result">' +
        '<i class="fa-solid fa-circle-info"></i>' +
        "<div><h3>Brak bezpośredniej podpowiedzi</h3><p>Spróbuj wpisać: zawór, przepływ, czujnik, membranowy lub Bürkert.</p></div>" +
        '<a class="home_text_link" href="products.html">Produkty</a>' +
        "</div>";
      return;
    }

    searchResults.innerHTML = results
      .map(function (item) {
        return (
          '<div class="home_search_result">' +
          '<i class="fa-solid ' +
          item.icon +
          '"></i>' +
          "<div>" +
          "<h3>" +
          item.title +
          "</h3>" +
          "<p>" +
          item.text +
          "</p>" +
          "</div>" +
          '<a class="home_text_link" href="products.html">Zobacz</a>' +
          "</div>"
        );
      })
      .join("");
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      renderSearchResults(searchInput.value);
    });

    renderSearchResults("");
  }

  /* =========================================================
     4. Zastosowania - zakładki
     ========================================================= */

  const appButtons = document.querySelectorAll(".home_tab_btn");
  const appIcon = document.getElementById("appIcon");
  const appLabel = document.getElementById("appLabel");
  const appTitle = document.getElementById("appTitle");
  const appText = document.getElementById("appText");

  const appData = {
    food: {
      icon: "fa-industry",
      label: "Przemysł spożywczy",
      title: "Armatura i automatyka do procesów produkcyjnych",
      text: "W takich aplikacjach ważne są materiały wykonania, łatwość czyszczenia, odporność i powtarzalność pracy.",
    },
    water: {
      icon: "fa-droplet",
      label: "Wod-kan",
      title: "Kontrola przepływu wody i mediów pomocniczych",
      text: "W instalacjach wodnych liczy się niezawodność, trwałość i właściwy dobór do ciśnienia oraz przepływu.",
    },
    chemistry: {
      icon: "fa-flask",
      label: "Chemia",
      title: "Rozwiązania do wymagających mediów",
      text: "Przy mediach chemicznych kluczowe są odporność materiałowa, uszczelnienia i zgodność z warunkami procesu.",
    },
    air: {
      icon: "fa-wind",
      label: "Sprężone powietrze",
      title: "Sterowanie powietrzem i gazami technicznymi",
      text: "W układach pneumatycznych ważne są czas reakcji, szczelność i sposób sterowania zaworem.",
    },
    steam: {
      icon: "fa-temperature-high",
      label: "Para",
      title: "Dobór do wysokich temperatur",
      text: "Przy parze technologicznej trzeba uwzględnić temperaturę, ciśnienie, materiał i odporność elementów.",
    },
  };

  function updateApp(type) {
    const data = appData[type];

    if (!data || !appIcon || !appLabel || !appTitle || !appText) return;

    appIcon.className = "fa-solid " + data.icon;
    appLabel.textContent = data.label;
    appTitle.textContent = data.title;
    appText.textContent = data.text;
  }

  appButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      appButtons.forEach(function (item) {
        item.classList.remove("is_active");
      });

      button.classList.add("is_active");
      updateApp(button.dataset.app);
    });
  });

  /* =========================================================
     5. Bürkert panel
     ========================================================= */

  const burkertButtons = document.querySelectorAll(".home_burkert_btn");
  const burkertLabel = document.getElementById("burkertLabel");
  const burkertTitle = document.getElementById("burkertTitle");
  const burkertText = document.getElementById("burkertText");

  const burkertData = {
    valves: {
      label: "Zawory",
      title: "Elementy wykonawcze do kontroli przepływu",
      text: "Zawory elektromagnetyczne, grzybkowe, membranowe i inne rozwiązania do sterowania mediami w procesie.",
    },
    measure: {
      label: "Pomiary",
      title: "Aparatura kontrolno-pomiarowa",
      text: "Przepływomierze i czujniki pomagają monitorować parametry procesu oraz kontrolować pracę instalacji.",
    },
    control: {
      label: "Sterowanie",
      title: "Integracja elementów automatyki",
      text: "Elementy sterujące, pozycjonery i osprzęt umożliwiają precyzyjne zarządzanie procesem.",
    },
  };

  function updateBurkert(type) {
    const data = burkertData[type];

    if (!data || !burkertLabel || !burkertTitle || !burkertText) return;

    burkertLabel.textContent = data.label;
    burkertTitle.textContent = data.title;
    burkertText.textContent = data.text;
  }

  burkertButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      burkertButtons.forEach(function (item) {
        item.classList.remove("is_active");
      });

      button.classList.add("is_active");
      updateBurkert(button.dataset.burkert);
    });
  });

  /* =========================================================
     6. Liczniki
     ========================================================= */

  const counters = document.querySelectorAll("[data-counter]");
  let countersStarted = false;

  function animateCounter(counter) {
    const target = Number(counter.dataset.counter) || 0;
    const duration = 1100;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.floor(progress * target);

      if (progress < 1) {
        window.requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    window.requestAnimationFrame(update);
  }

  function startCountersIfVisible() {
    if (countersStarted || !counters.length) return;

    const rect = counters[0].getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.85) {
      countersStarted = true;

      counters.forEach(function (counter) {
        animateCounter(counter);
      });
    }
  }

  window.addEventListener("scroll", startCountersIfVisible, { passive: true });
  startCountersIfVisible();

  /* =========================================================
     7. Proces - aktywny krok przy scrollu
     ========================================================= */

  const processSteps = document.querySelectorAll(".home_process_step");

  function updateProcessSteps() {
    if (!processSteps.length) return;

    let activeIndex = 0;

    processSteps.forEach(function (step, index) {
      const rect = step.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.65) {
        activeIndex = index;
      }
    });

    processSteps.forEach(function (step, index) {
      step.classList.toggle("is_active", index === activeIndex);
    });
  }

  window.addEventListener("scroll", updateProcessSteps, { passive: true });
  updateProcessSteps();

  /* =========================================================
     8. Generator maila
     ========================================================= */

  const mailForm = document.getElementById("homeMailForm");
  const mailMedium = document.getElementById("mailMedium");
  const mailParams = document.getElementById("mailParams");
  const mailApplication = document.getElementById("mailApplication");
  const mailSubject = document.getElementById("mailSubject");
  const mailPreview = document.getElementById("mailPreview");
  const mailLink = document.getElementById("mailLink");

  function buildMail() {
    if (!mailSubject || !mailPreview || !mailLink) return;

    const medium = mailMedium ? mailMedium.value.trim() : "";
    const params = mailParams ? mailParams.value.trim() : "";
    const application = mailApplication ? mailApplication.value.trim() : "";

    const subject = medium
      ? "Zapytanie o dobór produktu - " + medium
      : "Zapytanie o dobór produktu";

    const body =
      "Dzień dobry,\n\n" +
      "proszę o pomoc w doborze produktu.\n\n" +
      "Medium: " +
      (medium || "do uzupełnienia") +
      "\n" +
      "Parametry pracy: " +
      (params || "do uzupełnienia") +
      "\n" +
      "Zastosowanie: " +
      (application || "do uzupełnienia") +
      "\n\n" +
      "Proszę o informację, jakie rozwiązanie będzie odpowiednie.\n\n" +
      "Pozdrawiam";

    mailSubject.textContent = subject;
    mailPreview.textContent = body;

    mailLink.href =
      "mailto:biuro@serwokontrol.pl?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  }

  if (mailForm) {
    [mailMedium, mailParams, mailApplication].forEach(function (field) {
      if (!field) return;
      field.addEventListener("input", buildMail);
    });

    mailForm.addEventListener("submit", function (event) {
      event.preventDefault();
      buildMail();

      if (mailLink) {
        window.location.href = mailLink.href;
      }
    });

    buildMail();
  }

  /* =========================================================
     9. FAQ accordion
     ========================================================= */

  const faqItems = document.querySelectorAll(".home_faq_item");

  faqItems.forEach(function (item) {
    const button = item.querySelector("button");

    if (!button) return;

    button.addEventListener("click", function () {
      const isOpen = item.classList.contains("is_open");

      faqItems.forEach(function (faqItem) {
        faqItem.classList.remove("is_open");
      });

      if (!isOpen) {
        item.classList.add("is_open");
      }
    });
  });

  /* =========================================================
     10. Parallax
     ========================================================= */

  if (!prefersReducedMotion) {
    const hero = document.querySelector(".home_hero");
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
          const speed = Number(card.dataset.parallaxCardSpeed) || 0.35;

          if (isMouseInsideHero) {
            card.style.transform =
              "translate3d(" +
              mouseX * speed * -0.12 +
              "px, " +
              mouseY * speed * -0.12 +
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

          mouseX = clamp(x / rect.width, -0.5, 0.5) * 38;
          mouseY = clamp(y / rect.height, -0.5, 0.5) * 38;

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

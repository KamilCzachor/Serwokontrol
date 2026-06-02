/* Scroll to Top Button */

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  function updateScrollTopButton() {
    if (window.scrollY > 250) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", updateScrollTopButton, {
    passive: true,
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  updateScrollTopButton();
}

/* Cookies Consent Banner */

const cookieBanner = document.getElementById("cookieBanner");
const acceptCookiesBtn = document.getElementById("acceptCookiesBtn");
const cookieOverlay = document.getElementById("cookieOverlay");

if (cookieBanner && acceptCookiesBtn && cookieOverlay) {
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.classList.add("show");
    cookieOverlay.classList.add("show");
  }

  acceptCookiesBtn.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");

    cookieBanner.classList.remove("show");
    cookieOverlay.classList.remove("show");
  });
}

/* Main Hamburger Menu */

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener("click", function () {
    navMenu.classList.toggle("show");

    const icon = hamburgerBtn.querySelector("i");

    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    }
  });

  const navLinks = navMenu.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("show");

      const icon = hamburgerBtn.querySelector("i");

      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    });
  });
}

/* Close Main Mobile Menu After Outside Click */

document.addEventListener("click", function (event) {
  if (!hamburgerBtn || !navMenu) return;

  const isMenuOpen = navMenu.classList.contains("show");
  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedHamburger = hamburgerBtn.contains(event.target);

  if (isMenuOpen && !clickedInsideMenu && !clickedHamburger) {
    navMenu.classList.remove("show");

    const icon = hamburgerBtn.querySelector("i");

    if (icon) {
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    }
  }
});

/* Sticky Hamburger Menu */

const stickyHamburgerBtn = document.getElementById("stickyHamburgerBtn");
const stickyNavMenu = document.getElementById("stickyNavMenu");

if (stickyHamburgerBtn && stickyNavMenu) {
  stickyHamburgerBtn.addEventListener("click", function () {
    stickyNavMenu.classList.toggle("show");

    const icon = stickyHamburgerBtn.querySelector("i");

    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    }
  });

  const stickyNavLinks = stickyNavMenu.querySelectorAll("a");

  stickyNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      stickyNavMenu.classList.remove("show");

      const icon = stickyHamburgerBtn.querySelector("i");

      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    });
  });
}

/* Close Sticky Mobile Menu After Outside Click */

document.addEventListener("click", function (event) {
  if (!stickyHamburgerBtn || !stickyNavMenu) return;

  const isStickyMenuOpen = stickyNavMenu.classList.contains("show");
  const clickedInsideStickyMenu = stickyNavMenu.contains(event.target);
  const clickedStickyHamburger = stickyHamburgerBtn.contains(event.target);

  if (isStickyMenuOpen && !clickedInsideStickyMenu && !clickedStickyHamburger) {
    stickyNavMenu.classList.remove("show");

    const icon = stickyHamburgerBtn.querySelector("i");

    if (icon) {
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    }
  }
});

/* Sticky Header */

const stickyHeader = document.getElementById("stickyHeader");
const mainHeader = document.querySelector("header");

if (stickyHeader && mainHeader) {
  function closeStickyMenu() {
    if (!stickyNavMenu || !stickyHamburgerBtn) return;

    stickyNavMenu.classList.remove("show");

    const icon = stickyHamburgerBtn.querySelector("i");

    if (icon) {
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    }
  }

  function updateStickyHeader() {
    const headerBottom = mainHeader.getBoundingClientRect().bottom;

    if (headerBottom <= 8) {
      stickyHeader.classList.add("show");
    } else {
      stickyHeader.classList.remove("show");
      closeStickyMenu();
    }
  }

  window.addEventListener("scroll", updateStickyHeader, { passive: true });
  window.addEventListener("resize", updateStickyHeader, { passive: true });
  updateStickyHeader();
}

/* Theme Toggle */

const themeToggles = document.querySelectorAll(".theme_toggle");

function updateThemeIcons() {
  themeToggles.forEach(function (button) {
    const icon = button.querySelector("i");
    const text = button.querySelector("span");

    if (!icon) return;

    if (document.body.classList.contains("dark_theme")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");

      if (text) {
        text.textContent = "Jasny";
      }
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");

      if (text) {
        text.textContent = "Ciemny";
      }
    }
  });
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark_theme");
}

updateThemeIcons();

themeToggles.forEach(function (button) {
  button.addEventListener("click", function () {
    document.body.classList.toggle("dark_theme");

    if (document.body.classList.contains("dark_theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    updateThemeIcons();
  });
});

/* Scroll Reveal Animation
   Global, reversible reveal used by all pages.
   Sequence groups animate left-to-right while scrolling down and right-to-left while scrolling back up. */

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const sequenceGroups = [
    {
      selector: ".home_highlights_inner .home_highlight",
      showStep: 90,
      hideStep: 70,
      showBase: 0,
      hideBase: 0,
    },
    {
      selector: ".home_process_grid .home_process_step",
      showStep: 95,
      hideStep: 75,
      showBase: 0,
      hideBase: 0,
    },
    {
      selector: ".home_products_grid .home_product_tile",
      showStep: 85,
      hideStep: 65,
      showBase: 0,
      hideBase: 0,
    },
    {
      selector: ".products_grid .product_card",
      showStep: 46,
      hideStep: 42,
      showBase: 25,
      hideBase: 0,
    },
    {
      selector: ".about_numbers .about_number_card",
      showStep: 90,
      hideStep: 70,
      showBase: 0,
      hideBase: 0,
    },
    {
      selector: ".representatives .representative_card",
      showStep: 90,
      hideStep: 70,
      showBase: 0,
      hideBase: 0,
    },
    {
      selector: ".home_stats_grid .home_stat_card",
      showStep: 90,
      hideStep: 70,
      showBase: 0,
      hideBase: 0,
    },
    {
      selector: ".page_faq_grid .page_faq_item",
      showStep: 82,
      hideStep: 64,
      showBase: 0,
      hideBase: 0,
    },
  ];

  const autoRevealSelectors = [
    ".page_breadcrumb:not(.reveal)",
    ".container > h2:not(.reveal)",
    ".products_intro:not(.reveal)",
    ".products_filter_bar:not(.reveal)",
    ".products_faq:not(.reveal)",
    ".products_empty_state:not(.reveal)",
    ".home_stats:not(.reveal)",
    ".contact_representatives_hint:not(.reveal)",
    ".contact_faq:not(.reveal)",
    ".about_us_text:not(.reveal)",
    ".about_us_box:not(.reveal)",
    ".contact_intro:not(.reveal)",
    ".contact_location:not(.reveal)",
    ".contact_card:not(.reveal)",
    ".map_box:not(.reveal)",
    ".contact_form_section:not(.reveal)",
  ];

  function addRevealClass(element) {
    if (!element) return;
    element.classList.add("reveal");
  }

  function clearSequenceMeta(element) {
    element.classList.remove("reveal_sequence_item");
    element.removeAttribute("data-reveal-index");
    element.removeAttribute("data-reveal-total");
    element.removeAttribute("data-reveal-show-step");
    element.removeAttribute("data-reveal-hide-step");
    element.removeAttribute("data-reveal-show-base");
    element.removeAttribute("data-reveal-hide-base");
  }

  function prepareRevealElements() {
    document
      .querySelectorAll(autoRevealSelectors.join(", "))
      .forEach(addRevealClass);

    sequenceGroups.forEach(function (group) {
      const allElements = Array.from(document.querySelectorAll(group.selector));

      allElements.forEach(function (element) {
        clearSequenceMeta(element);
      });

      const elements = allElements.filter(function (element) {
        return (
          !element.classList.contains("is_filtered_out") && !element.hidden
        );
      });
      const total = elements.length;

      elements.forEach(function (element, index) {
        addRevealClass(element);
        element.classList.add("reveal_sequence_item");
        element.dataset.revealIndex = String(index);
        element.dataset.revealTotal = String(total);
        element.dataset.revealShowStep = String(group.showStep);
        element.dataset.revealHideStep = String(group.hideStep);
        element.dataset.revealShowBase = String(group.showBase);
        element.dataset.revealHideBase = String(group.hideBase);
      });
    });

    document
      .querySelectorAll(".catalog_product_tile:not(.reveal)")
      .forEach(function (element) {
        addRevealClass(element);
        clearSequenceMeta(element);
      });

    return Array.from(document.querySelectorAll(".reveal"));
  }

  let revealElements = prepareRevealElements();

  if (!revealElements.length) return;

  let lastScrollY = window.scrollY || window.pageYOffset || 0;
  let currentDirection = "down";

  function getSequenceDelay(element, isVisible) {
    if (!element.classList.contains("reveal_sequence_item")) {
      return isVisible ? "0ms" : "0ms";
    }

    const index = Number(element.dataset.revealIndex) || 0;
    const total = Number(element.dataset.revealTotal) || 1;
    const showStep = Number(element.dataset.revealShowStep) || 80;
    const hideStep = Number(element.dataset.revealHideStep) || showStep;
    const showBase = Number(element.dataset.revealShowBase) || 0;
    const hideBase = Number(element.dataset.revealHideBase) || 0;

    if (isVisible) {
      return showBase + index * showStep + "ms";
    }

    return hideBase + (total - 1 - index) * hideStep + "ms";
  }

  function isOneWayRevealElement(element) {
    return element.matches(".products_grid .product_card");
  }

  function setRevealVisible(element, isVisible) {
    if (
      !isVisible &&
      isOneWayRevealElement(element) &&
      element.dataset.revealKeepVisible === "true"
    ) {
      return;
    }

    const wasVisible = element.classList.contains("is_visible");

    if (wasVisible === isVisible) return;

    element.classList.toggle("reveal_scrolling_up", currentDirection === "up");
    element.classList.toggle(
      "reveal_scrolling_down",
      currentDirection !== "up",
    );

    const delay = getSequenceDelay(element, isVisible);
    const delayMs = parseFloat(delay) || 0;

    if (element._revealDelayTimer) {
      window.clearTimeout(element._revealDelayTimer);
    }

    element.style.setProperty("transition-delay", delay, "important");
    element.classList.toggle("is_visible", isVisible);
    element.classList.toggle("show", isVisible);

    if (isVisible && isOneWayRevealElement(element)) {
      element.dataset.revealKeepVisible = "true";
    }

    element._revealDelayTimer = window.setTimeout(function () {
      element.style.removeProperty("transition-delay");
      element._revealDelayTimer = null;
    }, delayMs + 720);
  }

  if (prefersReducedMotion) {
    revealElements.forEach(function (element) {
      element.style.transitionDelay = "0ms";
      element.classList.add("is_visible", "show");
    });

    return;
  }

  let ticking = false;

  function updateScrollDirection() {
    const currentScrollY = window.scrollY || window.pageYOffset || 0;

    if (Math.abs(currentScrollY - lastScrollY) > 2) {
      currentDirection = currentScrollY < lastScrollY ? "up" : "down";
      lastScrollY = currentScrollY;
    }
  }

  function updateRevealElements() {
    updateScrollDirection();

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const revealLine = viewportHeight * 0.92;

    revealElements.forEach(function (element) {
      const rect = element.getBoundingClientRect();

      setRevealVisible(element, rect.top < revealLine);
    });

    ticking = false;
  }

  function requestRevealUpdate() {
    if (ticking) return;

    window.requestAnimationFrame(updateRevealElements);
    ticking = true;
  }

  window.SerwokontrolRevealRefresh = function (options) {
    const settings = options || {};

    revealElements = prepareRevealElements();

    if (settings.resetVisible) {
      revealElements.forEach(function (element) {
        if (!element.classList.contains("reveal_sequence_item")) return;
        element.classList.remove("show", "is_visible");
        element.removeAttribute("data-reveal-keep-visible");
      });
    }

    requestRevealUpdate();
  };

  window.addEventListener("scroll", requestRevealUpdate, { passive: true });
  window.addEventListener("resize", requestRevealUpdate, { passive: true });
  window.addEventListener("load", requestRevealUpdate);

  /*
    Wait two frames before the first update so above-the-fold sections are
    actually painted in their hidden state and can animate in on page load.
  */
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(updateRevealElements);
  });
})();

/* Representatives Region Map */

const representativesSection = document.querySelector(
  ".representatives_section",
);
const representativeCards = document.querySelectorAll(
  ".representative_card[data-region]",
);
const representativeRegionButtons = document.querySelectorAll(
  ".representative_region_btn",
);
const representativesMapClose = document.querySelector(
  ".representatives_map_close",
);
const activeRegionTitle = document.getElementById("activeRegionTitle");
const activeRegionDescription = document.getElementById(
  "activeRegionDescription",
);
const activeCityInfo = document.getElementById("activeCityInfo");
const activeCityText = document.getElementById("activeCityText");
const activeCityClear = document.getElementById("activeCityClear");
const citySearchInput = document.getElementById("citySearchInput");
const citySuggestions = document.getElementById("citySuggestions");
const citySearchHint = document.getElementById("citySearchHint");

let highlightedCityIndex = -1;
let lastActiveRepresentativeButton = null;

const regionData = {
  south: {
    title: "Region: Południe",
    description:
      "Ten region obsługuje Mirosław Łaszczyca — przedstawiciel odpowiedzialny za południową część Polski.",
  },
  west: {
    title: "Region: Zachód",
    description:
      "Ten region obsługuje Tomasz Krupianik — przedstawiciel odpowiedzialny za zachodnią część Polski.",
  },
  center: {
    title: "Region: Centrum",
    description:
      "Ten region obsługuje Jarosław Manowiecki — przedstawiciel odpowiedzialny za centralną część Polski.",
  },
};

function normalizeText(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function smoothScrollToRepresentatives(force = false) {
  if (!representativesSection) return;

  if (force || window.innerWidth <= 992) {
    representativesSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function setMapOverviewHeader() {
  if (activeRegionTitle) {
    activeRegionTitle.textContent = "Mapa przedstawicieli";
  }

  if (activeRegionDescription) {
    activeRegionDescription.textContent =
      "Wybierz region na mapie albo wpisz miasto w wyszukiwarce, aby zobaczyć właściwego przedstawiciela.";
  }
}

function openRepresentativesMapOverview(shouldScroll = true) {
  if (!representativesSection) return;

  representativesSection.classList.remove(
    "region_mode",
    "map_overview_mode",
    "active_south",
    "active_west",
    "active_center",
  );

  representativesSection.classList.add("map_overview_mode");

  representativeCards.forEach(function (card) {
    card.classList.remove("is_active");
  });

  representativeRegionButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", "false");
  });

  clearSelectedCityOnMap();
  clearActiveCityInfo();
  setMapOverviewHeader();

  if (citySuggestions) {
    citySuggestions.classList.remove("show");
    citySuggestions.innerHTML = "";
  }

  updateCitySuggestionsExpanded(false);
  highlightedCityIndex = -1;

  updateCitySearchHint(
    "Wybierz miasto lub kliknij obszar na mapie, aby wyświetlić właściwego przedstawiciela.",
  );

  if (shouldScroll) {
    window.setTimeout(function () {
      smoothScrollToRepresentatives(true);
    }, 60);
  }
}

function updateCitySearchHint(message) {
  if (!citySearchHint) return;

  const hintSpan = citySearchHint.querySelector("span");

  if (hintSpan) {
    hintSpan.textContent = message;
  } else {
    citySearchHint.textContent = message;
  }
}

function updateCitySuggestionsExpanded(isExpanded) {
  if (!citySearchInput) return;

  citySearchInput.setAttribute("aria-expanded", isExpanded ? "true" : "false");
}

function showActiveCityInfo(cityName) {
  if (!activeCityInfo || !activeCityText) return;

  if (!cityName) {
    activeCityText.textContent = "";
    activeCityInfo.classList.remove("show");
    return;
  }

  activeCityText.textContent = "Wybrane miasto/powiat: " + cityName;
  activeCityInfo.classList.add("show");
}

function clearActiveCityInfo() {
  showActiveCityInfo("");
}

function clearSelectedCityOnMap() {
  const selectedCities = document.querySelectorAll(
    ".map_area.is_selected_city",
  );

  selectedCities.forEach(function (city) {
    city.classList.remove("is_selected_city");
  });
}

function markCityOnMap(cityName) {
  clearSelectedCityOnMap();

  const mapAreas = document.querySelectorAll(".map_area");

  const selectedAreas = Array.from(mapAreas).filter(function (area) {
    const dataName = area.dataset.name || "";
    const titleElement = area.querySelector("title");
    const titleName = titleElement ? titleElement.textContent : "";

    return (
      normalizeText(dataName) === normalizeText(cityName) ||
      normalizeText(titleName) === normalizeText(cityName)
    );
  });

  selectedAreas.forEach(function (area) {
    area.classList.add("is_selected_city");
  });
}

function findRepresentativeCardByRegion(region) {
  return Array.from(representativeCards).find(function (card) {
    return card.dataset.region === region;
  });
}

function findRepresentativeButtonByRegion(region) {
  return Array.from(representativeRegionButtons).find(function (button) {
    return button.dataset.region === region;
  });
}

function clearRepresentativeRegion(shouldRestoreFocus = false) {
  if (!representativesSection) return;

  representativesSection.classList.remove(
    "region_mode",
    "active_south",
    "active_west",
    "active_center",
  );

  representativeCards.forEach(function (card) {
    card.classList.remove("is_active");
  });

  representativeRegionButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", "false");
  });

  clearSelectedCityOnMap();
  clearActiveCityInfo();

  if (citySearchInput) {
    citySearchInput.value = "";
  }

  if (citySuggestions) {
    citySuggestions.classList.remove("show");
    citySuggestions.innerHTML = "";
  }

  updateCitySuggestionsExpanded(false);

  highlightedCityIndex = -1;

  updateCitySearchHint(
    "Zacznij wpisywać nazwę miasta, aby znaleźć właściwego przedstawiciela.",
  );

  setMapOverviewHeader();

  if (
    shouldRestoreFocus &&
    lastActiveRepresentativeButton &&
    typeof lastActiveRepresentativeButton.focus === "function"
  ) {
    lastActiveRepresentativeButton.focus();
  }
}

function showRepresentativeRegion(region, activeCard, activeButton) {
  if (!representativesSection || !regionData[region]) return;

  representativesSection.classList.remove(
    "map_overview_mode",
    "active_south",
    "active_west",
    "active_center",
  );

  representativesSection.classList.add("region_mode", `active_${region}`);

  representativeCards.forEach(function (card) {
    card.classList.remove("is_active");
  });

  representativeRegionButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", "false");
  });

  if (activeCard) {
    activeCard.classList.add("is_active");
  }

  if (activeButton) {
    activeButton.setAttribute("aria-pressed", "true");
    lastActiveRepresentativeButton = activeButton;
  }

  if (activeRegionTitle) {
    activeRegionTitle.textContent = regionData[region].title;
  }

  if (activeRegionDescription) {
    activeRegionDescription.textContent = regionData[region].description;
  }

  smoothScrollToRepresentatives();
}

function getRegionFromMapArea(area) {
  const regionGroup = area.closest(".map_region");

  if (!regionGroup) return null;

  if (regionGroup.classList.contains("map_west")) {
    return "west";
  }

  if (regionGroup.classList.contains("map_south")) {
    return "south";
  }

  if (regionGroup.classList.contains("map_center")) {
    return "center";
  }

  return null;
}

function getCityNameFromMapArea(area) {
  const dataName = area.dataset.name || "";
  const titleElement = area.querySelector("title");
  const titleName = titleElement ? titleElement.textContent : "";

  return dataName || titleName;
}

function getRepresentativeNameByRegion(region) {
  if (region === "west") return "Tomasz Krupianik";
  if (region === "south") return "Mirosław Łaszczyca";
  if (region === "center") return "Jarosław Manowiecki";

  return "";
}

function switchRepresentative(direction) {
  if (!representativesSection) return;

  const isRegionMode = representativesSection.classList.contains("region_mode");

  if (!isRegionMode) return;

  const cards = Array.from(representativeCards);

  if (cards.length === 0) return;

  const activeIndex = cards.findIndex(function (card) {
    return card.classList.contains("is_active");
  });

  if (activeIndex === -1) return;

  let nextIndex = activeIndex + direction;

  if (nextIndex >= cards.length) {
    nextIndex = 0;
  }

  if (nextIndex < 0) {
    nextIndex = cards.length - 1;
  }

  const nextCard = cards[nextIndex];
  const nextRegion = nextCard.dataset.region;
  const nextButton = findRepresentativeButtonByRegion(nextRegion);

  clearSelectedCityOnMap();
  clearActiveCityInfo();

  if (citySearchInput) {
    citySearchInput.value = "";
  }

  if (citySuggestions) {
    citySuggestions.classList.remove("show");
    citySuggestions.innerHTML = "";
  }

  updateCitySuggestionsExpanded(false);

  highlightedCityIndex = -1;

  updateCitySearchHint(
    "Zmieniono przedstawiciela. Możesz ponownie wpisać miasto, aby zaznaczyć je na mapie.",
  );

  showRepresentativeRegion(nextRegion, nextCard, nextButton);

  if (nextButton) {
    nextButton.focus();
  }
}

/* Region buttons */

if (representativeRegionButtons.length > 0) {
  representativeRegionButtons.forEach(function (button) {
    const region = button.dataset.region || "";
    const card = button.closest(".representative_card");

    button.setAttribute("aria-pressed", "false");
    button.setAttribute(
      "aria-label",
      "Sprawdź obsługiwany region przedstawiciela",
    );

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (!region || !card) return;

      const isRegionMode =
        representativesSection &&
        representativesSection.classList.contains("region_mode");
      const isActiveCard = card.classList.contains("is_active");

      if (isRegionMode && isActiveCard) {
        clearRepresentativeRegion(true);
        return;
      }

      clearSelectedCityOnMap();
      clearActiveCityInfo();

      showRepresentativeRegion(region, card, button);
    });
  });
}

/* Representative cards keyboard navigation */

if (representativesSection && representativeCards.length > 0) {
  representativeCards.forEach(function (card) {
    card.addEventListener("keydown", function (event) {
      const isRegionMode =
        representativesSection.classList.contains("region_mode");

      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();

        if (isRegionMode) {
          switchRepresentative(1);
        }

        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();

        if (isRegionMode) {
          switchRepresentative(-1);
        }
      }
    });
  });

  representativesSection.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function () {
    if (representativesSection.classList.contains("region_mode")) {
      clearRepresentativeRegion(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!representativesSection) return;

    const isRegionMode =
      representativesSection.classList.contains("region_mode");

    if (!isRegionMode) return;

    if (event.key === "Escape") {
      event.preventDefault();
      clearRepresentativeRegion(true);
      return;
    }

    const isTypingInSearch = event.target === citySearchInput;
    const isFocusedMapArea = event.target.classList.contains("map_area");
    const isFocusedButton = event.target.classList.contains(
      "representative_region_btn",
    );

    if (isTypingInSearch || isFocusedMapArea || isFocusedButton) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      switchRepresentative(1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      switchRepresentative(-1);
    }
  });
}

if (representativesMapClose) {
  representativesMapClose.addEventListener("click", function (event) {
    event.stopPropagation();
    clearRepresentativeRegion(true);
  });
}

/* Map Area Click */

const mapAreas = document.querySelectorAll(".map_area");

const mapTooltip = document.createElement("div");
mapTooltip.className = "map_tooltip";
mapTooltip.setAttribute("aria-hidden", "true");
document.body.appendChild(mapTooltip);

function disableNativeSvgTooltips() {
  mapAreas.forEach(function (area) {
    const titleElement = area.querySelector("title");

    if (!titleElement) return;

    const titleText = titleElement.textContent.trim();

    if (!area.dataset.name && titleText) {
      area.dataset.name = titleText;
    }

    area.setAttribute("aria-label", area.dataset.name || titleText);

    titleElement.remove();
  });
}

function setupAccessibleMapAreas() {
  mapAreas.forEach(function (area) {
    const cityName = getCityNameFromMapArea(area);

    area.setAttribute("tabindex", "0");
    area.setAttribute("role", "button");

    if (cityName) {
      area.setAttribute("aria-label", "Wybierz miasto lub powiat: " + cityName);
    }

    area.addEventListener("focus", function () {
      area.classList.add("is_keyboard_focused");
    });

    area.addEventListener("blur", function () {
      area.classList.remove("is_keyboard_focused");
      hideMapTooltip();
    });
  });
}

function getMapTooltipRegionLabel(region) {
  if (region === "west") return "Region: Zachód";
  if (region === "south") return "Region: Południe";
  if (region === "center") return "Region: Centrum";

  return "Region przedstawiciela";
}

function showMapTooltip(area, event) {
  if (!mapTooltip) return;

  const cityName = getCityNameFromMapArea(area);
  const region = getRegionFromMapArea(area);

  if (!cityName) return;

  mapTooltip.innerHTML =
    "<span>" +
    cityName +
    "</span><small>" +
    getMapTooltipRegionLabel(region) +
    "</small>";

  if (event) {
    moveMapTooltip(event);
  }

  mapTooltip.classList.add("show");
}

function moveMapTooltip(event) {
  if (!mapTooltip) return;

  const offset = 14;
  const tooltipRect = mapTooltip.getBoundingClientRect();

  let left = event.clientX + offset;
  let top = event.clientY + offset;

  if (left + tooltipRect.width > window.innerWidth - 12) {
    left = event.clientX - tooltipRect.width - offset;
  }

  if (top + tooltipRect.height > window.innerHeight - 12) {
    top = event.clientY - tooltipRect.height - offset;
  }

  mapTooltip.style.left = left + "px";
  mapTooltip.style.top = top + "px";
}

function positionMapTooltipNearArea(area) {
  if (!mapTooltip || !area) return;

  const rect = area.getBoundingClientRect();
  const tooltipRect = mapTooltip.getBoundingClientRect();
  const offset = 12;

  let left = rect.left + rect.width / 2 + offset;
  let top = rect.top + rect.height / 2 + offset;

  if (left + tooltipRect.width > window.innerWidth - 12) {
    left = rect.left - tooltipRect.width - offset;
  }

  if (top + tooltipRect.height > window.innerHeight - 12) {
    top = rect.top - tooltipRect.height - offset;
  }

  mapTooltip.style.left = left + "px";
  mapTooltip.style.top = top + "px";
}

function hideMapTooltip() {
  if (!mapTooltip) return;

  mapTooltip.classList.remove("show");
}

function animateClickedMapArea(area) {
  if (!area) return;

  area.classList.remove("is_map_clicked");

  void area.offsetWidth;

  area.classList.add("is_map_clicked");

  window.setTimeout(function () {
    area.classList.remove("is_map_clicked");
  }, 420);
}

function chooseMapArea(area) {
  const cityName = getCityNameFromMapArea(area);
  const region = getRegionFromMapArea(area);

  if (!cityName || !region) return;

  const activeCard = findRepresentativeCardByRegion(region);
  const activeButton = findRepresentativeButtonByRegion(region);

  if (!activeCard) return;

  showRepresentativeRegion(region, activeCard, activeButton);
  showActiveCityInfo(cityName);

  markCityOnMap(cityName);
  animateClickedMapArea(area);

  const representativeName = getRepresentativeNameByRegion(region);

  if (citySearchInput) {
    citySearchInput.value = cityName;
  }

  if (citySuggestions) {
    citySuggestions.classList.remove("show");
    citySuggestions.innerHTML = "";
  }

  updateCitySuggestionsExpanded(false);

  highlightedCityIndex = -1;

  updateCitySearchHint(
    "Wybrano miasto: " +
      cityName +
      ". Właściwy przedstawiciel: " +
      representativeName +
      ".",
  );
}

disableNativeSvgTooltips();
setupAccessibleMapAreas();

if (mapAreas.length > 0) {
  mapAreas.forEach(function (area) {
    area.addEventListener("mouseenter", function (event) {
      showMapTooltip(area, event);
    });

    area.addEventListener("mousemove", function (event) {
      moveMapTooltip(event);
    });

    area.addEventListener("mouseleave", function () {
      if (document.activeElement !== area) {
        hideMapTooltip();
      }
    });

    area.addEventListener("focus", function () {
      showMapTooltip(area);
      positionMapTooltipNearArea(area);
    });

    area.addEventListener("click", function (event) {
      event.stopPropagation();
      chooseMapArea(area);
    });

    area.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      event.stopPropagation();

      chooseMapArea(area);
    });
  });
}

/* Active City Clear */

if (activeCityClear) {
  activeCityClear.addEventListener("click", function (event) {
    event.stopPropagation();

    clearSelectedCityOnMap();
    clearActiveCityInfo();

    if (citySearchInput) {
      citySearchInput.value = "";
    }

    if (citySuggestions) {
      citySuggestions.classList.remove("show");
      citySuggestions.innerHTML = "";
    }

    updateCitySuggestionsExpanded(false);

    highlightedCityIndex = -1;

    updateCitySearchHint(
      "Zacznij wpisywać nazwę miasta, aby znaleźć właściwego przedstawiciela.",
    );
  });
}

/* City Search Box */

function updateHighlightedSuggestion() {
  if (!citySuggestions) return;

  const suggestions = citySuggestions.querySelectorAll("li:not(.is_empty)");

  suggestions.forEach(function (item, index) {
    if (index === highlightedCityIndex) {
      item.classList.add("is_highlighted");
      item.setAttribute("aria-selected", "true");
      item.scrollIntoView({
        block: "nearest",
      });
    } else {
      item.classList.remove("is_highlighted");
      item.setAttribute("aria-selected", "false");
    }
  });
}

function selectCity(cityData) {
  const activeCard = findRepresentativeCardByRegion(cityData.region);
  const activeButton = findRepresentativeButtonByRegion(cityData.region);

  if (!activeCard) return;

  showRepresentativeRegion(cityData.region, activeCard, activeButton);
  showActiveCityInfo(cityData.city);

  markCityOnMap(cityData.mapName || cityData.city);

  if (citySearchInput) {
    citySearchInput.value = cityData.city;
  }

  if (citySuggestions) {
    citySuggestions.classList.remove("show");
    citySuggestions.innerHTML = "";
  }

  updateCitySuggestionsExpanded(false);

  highlightedCityIndex = -1;

  updateCitySearchHint(
    "Wybrano miasto: " +
      cityData.city +
      ". Właściwy przedstawiciel: " +
      cityData.representative +
      ".",
  );
}

function renderCitySuggestions(results) {
  if (!citySuggestions) return;

  highlightedCityIndex = -1;
  citySuggestions.innerHTML = "";

  if (results.length === 0) {
    const emptyItem = document.createElement("li");

    emptyItem.textContent =
      "Brak miasta na liście — skontaktuj się z biurem głównym.";
    emptyItem.classList.add("is_empty");
    emptyItem.setAttribute("role", "option");
    emptyItem.setAttribute("aria-selected", "false");

    citySuggestions.appendChild(emptyItem);
    citySuggestions.classList.add("show");
    updateCitySuggestionsExpanded(true);

    return;
  }

  results.forEach(function (cityData, index) {
    const item = document.createElement("li");

    item.textContent = cityData.city + " — " + cityData.representative;
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", "false");
    item.id = "citySuggestion-" + index;

    item.addEventListener("click", function () {
      selectCity(cityData);
    });

    citySuggestions.appendChild(item);
  });

  citySuggestions.classList.add("show");
  updateCitySuggestionsExpanded(true);
}

if (citySearchInput && citySuggestions && representativesSection) {
  citySearchInput.setAttribute("role", "combobox");
  citySearchInput.setAttribute("aria-autocomplete", "list");
  citySearchInput.setAttribute("aria-expanded", "false");
  citySearchInput.setAttribute("aria-controls", "citySuggestions");

  citySuggestions.setAttribute("role", "listbox");

  citySearchInput.addEventListener("input", function () {
    const searchValue = normalizeText(citySearchInput.value);

    if (searchValue.length < 2) {
      citySuggestions.classList.remove("show");
      citySuggestions.innerHTML = "";
      highlightedCityIndex = -1;
      updateCitySuggestionsExpanded(false);

      updateCitySearchHint(
        "Zacznij wpisywać nazwę miasta, aby znaleźć właściwego przedstawiciela.",
      );

      return;
    }

    const results = cityRegionData
      .filter(function (item) {
        return normalizeText(item.city).includes(searchValue);
      })
      .sort(function (a, b) {
        const aCity = normalizeText(a.city);
        const bCity = normalizeText(b.city);

        const aStarts = aCity.startsWith(searchValue);
        const bStarts = bCity.startsWith(searchValue);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return aCity.localeCompare(bCity, "pl");
      })
      .slice(0, 8);

    renderCitySuggestions(results);
  });

  citySearchInput.addEventListener("keydown", function (event) {
    const suggestions = citySuggestions.querySelectorAll("li:not(.is_empty)");
    const suggestionsCount = suggestions.length;

    if (event.key === "ArrowDown") {
      if (
        !citySuggestions.classList.contains("show") ||
        suggestionsCount === 0
      ) {
        return;
      }

      event.preventDefault();

      if (highlightedCityIndex === -1) {
        highlightedCityIndex = 0;
      } else {
        highlightedCityIndex += 1;

        if (highlightedCityIndex >= suggestionsCount) {
          highlightedCityIndex = 0;
        }
      }

      updateHighlightedSuggestion();
      return;
    }

    if (event.key === "ArrowUp") {
      if (
        !citySuggestions.classList.contains("show") ||
        suggestionsCount === 0
      ) {
        return;
      }

      event.preventDefault();

      if (highlightedCityIndex === -1) {
        highlightedCityIndex = suggestionsCount - 1;
      } else {
        highlightedCityIndex -= 1;

        if (highlightedCityIndex < 0) {
          highlightedCityIndex = suggestionsCount - 1;
        }
      }

      updateHighlightedSuggestion();
      return;
    }

    if (event.key === "Escape") {
      citySuggestions.classList.remove("show");
      highlightedCityIndex = -1;
      updateCitySuggestionsExpanded(false);
      return;
    }

    if (event.key !== "Enter") return;

    event.preventDefault();

    const searchValue = normalizeText(citySearchInput.value);

    if (!searchValue) return;

    if (
      citySuggestions.classList.contains("show") &&
      highlightedCityIndex >= 0 &&
      suggestions[highlightedCityIndex]
    ) {
      suggestions[highlightedCityIndex].click();
      return;
    }

    const firstSuggestion = citySuggestions.querySelector("li:not(.is_empty)");

    if (firstSuggestion && citySuggestions.classList.contains("show")) {
      firstSuggestion.click();
      return;
    }

    const exactMatch = cityRegionData.find(function (item) {
      return normalizeText(item.city) === searchValue;
    });

    if (exactMatch) {
      selectCity(exactMatch);
      return;
    }

    const partialMatch = cityRegionData.find(function (item) {
      return normalizeText(item.city).includes(searchValue);
    });

    if (partialMatch) {
      selectCity(partialMatch);
    }
  });

  document.addEventListener("click", function (event) {
    const clickedInsideInput = citySearchInput.contains(event.target);
    const clickedInsideSuggestions = citySuggestions.contains(event.target);

    if (!clickedInsideInput && !clickedInsideSuggestions) {
      citySuggestions.classList.remove("show");
      highlightedCityIndex = -1;
      updateCitySuggestionsExpanded(false);
    }
  });
}

/* Contact Form Send */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const contactFormSubmit = document.getElementById("contactFormSubmit");

if (contactForm && formStatus && contactFormSubmit) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formStatus.textContent = "Wysyłanie wiadomości...";
    formStatus.classList.remove("success", "error");

    contactFormSubmit.disabled = true;
    contactFormSubmit.classList.add("is_loading");
    contactFormSubmit.textContent = "Wysyłanie...";

    const formData = new FormData(contactForm);

    fetch("send-mail.php", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          formStatus.textContent =
            data.message || "Wiadomość została wysłana. Dziękujemy!";
          formStatus.classList.add("success");
          formStatus.classList.remove("error");

          contactForm.reset();
        } else {
          formStatus.textContent =
            data.message || "Nie udało się wysłać wiadomości.";
          formStatus.classList.add("error");
          formStatus.classList.remove("success");
        }
      })
      .catch(function () {
        formStatus.textContent =
          "Wystąpił błąd połączenia. Spróbuj ponownie później lub skontaktuj się telefonicznie.";
        formStatus.classList.add("error");
        formStatus.classList.remove("success");
      })
      .finally(function () {
        contactFormSubmit.disabled = false;
        contactFormSubmit.classList.remove("is_loading");
        contactFormSubmit.textContent = "Wyślij wiadomość";
      });
  });
}

/* =========================================================
   Micro interactions: counters and contact form field states
   ========================================================= */

(function () {
  const counters = document.querySelectorAll("[data-count-to]");

  if (counters.length > 0) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function setCounterValue(counter, value) {
      const suffix = counter.dataset.countSuffix || "";
      counter.textContent = Math.round(value).toString() + suffix;
    }

    function animateCounter(counter) {
      if (counter.dataset.countAnimating === "true") return;
      if (counter.dataset.countAnimated === "true") return;

      counter.dataset.countAnimating = "true";
      counter.dataset.countAnimated = "true";

      const target = Number(counter.dataset.countTo) || 0;

      if (prefersReducedMotion) {
        setCounterValue(counter, target);
        counter.dataset.countAnimating = "false";
        return;
      }

      const duration = 950;
      const startTime = performance.now();

      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCounterValue(counter, target * eased);

        if (progress < 1 && counter.dataset.countAnimated === "true") {
          window.requestAnimationFrame(step);
        } else {
          counter.dataset.countAnimating = "false";

          if (counter.dataset.countAnimated === "true") {
            setCounterValue(counter, target);
          }
        }
      }

      window.requestAnimationFrame(step);
    }

    function resetCounter(counter) {
      counter.dataset.countAnimated = "false";
      counter.dataset.countAnimating = "false";
      setCounterValue(counter, 0);
    }

    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            return;
          }

          const rect = entry.boundingClientRect;

          if (rect.top > 0 || rect.bottom < 0) {
            resetCounter(entry.target);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    counters.forEach(function (counter) {
      resetCounter(counter);
      counterObserver.observe(counter);
    });
  }

  const formFields = document.querySelectorAll(
    ".contact_form input, .contact_form textarea",
  );

  function updateFieldState(field) {
    const hasValue = field.value.trim().length > 0;
    const isRequired = field.hasAttribute("required");
    const isInvalid = hasValue && !field.checkValidity();

    field.classList.toggle("is_filled", hasValue);
    field.classList.toggle("is_invalid", isInvalid);
    field.classList.toggle("is_valid", hasValue && !isInvalid && isRequired);
  }

  formFields.forEach(function (field) {
    updateFieldState(field);

    field.addEventListener("input", function () {
      updateFieldState(field);
    });

    field.addEventListener("blur", function () {
      updateFieldState(field);
    });
  });
})();

/* =========================================================
   Global Scroll Progress Bar
   ========================================================= */

(function () {
  let scrollProgressBar = document.querySelector(".scroll_progress_bar");

  if (!scrollProgressBar) {
    scrollProgressBar = document.createElement("div");
    scrollProgressBar.className = "scroll_progress_bar";
    scrollProgressBar.setAttribute("aria-hidden", "true");
    document.body.prepend(scrollProgressBar);
  }

  let hideProgressTimer = null;

  function showScrollProgressBar() {
    scrollProgressBar.classList.add("is_active");

    if (hideProgressTimer) {
      window.clearTimeout(hideProgressTimer);
    }

    hideProgressTimer = window.setTimeout(function () {
      scrollProgressBar.classList.remove("is_active");
      hideProgressTimer = null;
    }, 900);
  }

  function updateScrollProgressBar() {
    const scrollTop = window.scrollY || window.pageYOffset;

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      documentHeight > 0
        ? Math.min((scrollTop / documentHeight) * 100, 100)
        : 0;

    scrollProgressBar.style.width = progress + "%";
    showScrollProgressBar();
  }

  window.addEventListener("scroll", updateScrollProgressBar, {
    passive: true,
  });

  window.addEventListener("resize", updateScrollProgressBar, {
    passive: true,
  });

  updateScrollProgressBar();
  window.setTimeout(function () {
    scrollProgressBar.classList.remove("is_active");
  }, 1000);
})();

/* Open representatives map overview from products CTA */
function handleRepresentativesHashOpen() {
  if (!representativesSection) return;

  if (window.location.hash === "#representativesMap") {
    openRepresentativesMapOverview(true);
  }
}

window.addEventListener("hashchange", handleRepresentativesHashOpen);
window.addEventListener("load", handleRepresentativesHashOpen);
handleRepresentativesHashOpen();

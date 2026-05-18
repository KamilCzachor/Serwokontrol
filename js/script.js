/* Scroll to Top Button */

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 250) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* Cookies Consent Banner */

const cookieBanner = document.getElementById("cookieBanner");
const acceptCookiesBtn = document.getElementById("acceptCookiesBtn");
const cookieOverlay = document.getElementById("cookieOverlay");

if (cookieBanner && acceptCookiesBtn && cookieOverlay) {
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieBanner.classList.add("show");
    cookieOverlay.classList.add("show");
    document.body.classList.add("no_scroll");
  }

  acceptCookiesBtn.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");

    cookieBanner.classList.remove("show");
    cookieOverlay.classList.remove("show");
    document.body.classList.remove("no_scroll");
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

/* Product Modal */

const productCards = document.querySelectorAll(".product_card");
const productModalOverlay = document.getElementById("productModalOverlay");
const productModalClose = document.getElementById("productModalClose");

const productModalImage = document.getElementById("productModalImage");
const productModalSubtype = document.getElementById("productModalSubtype");
const productModalTitle = document.getElementById("productModalTitle");
const productModalDescription = document.getElementById(
  "productModalDescription",
);

function closeProductModal() {
  if (!productModalOverlay) return;

  productModalOverlay.classList.remove("show");
  document.body.classList.remove("no_scroll");
}

function openProductModal(card) {
  if (
    !productModalOverlay ||
    !productModalImage ||
    !productModalSubtype ||
    !productModalTitle ||
    !productModalDescription
  ) {
    return;
  }

  const title = card.dataset.title || "";
  const subtype = card.dataset.subtype || "";
  const image = card.dataset.image || "";
  const description = card.dataset.description || "";

  productModalTitle.textContent = title;
  productModalSubtype.textContent = subtype;
  productModalDescription.textContent = description;

  productModalImage.src = image;
  productModalImage.alt = title;

  productModalOverlay.classList.add("show");
  document.body.classList.add("no_scroll");
}

if (productCards.length > 0 && productModalOverlay) {
  productCards.forEach(function (card) {
    card.addEventListener("click", function () {
      openProductModal(card);
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProductModal(card);
      }
    });
  });

  productModalOverlay.addEventListener("click", function (event) {
    if (event.target === productModalOverlay) {
      closeProductModal();
    }
  });
}

if (productModalClose) {
  productModalClose.addEventListener("click", closeProductModal);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeProductModal();
  }
});

/* Sticky Header */

const stickyHeader = document.getElementById("stickyHeader");
const mainHeader = document.querySelector("header");

if (stickyHeader && mainHeader) {
  window.addEventListener("scroll", function () {
    const headerHeight = mainHeader.offsetHeight;

    if (window.scrollY > headerHeight) {
      stickyHeader.classList.add("show");
    } else {
      stickyHeader.classList.remove("show");

      if (stickyNavMenu && stickyHamburgerBtn) {
        stickyNavMenu.classList.remove("show");

        const icon = stickyHamburgerBtn.querySelector("i");

        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      }
    }
  });
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

/* Scroll Reveal Animation */

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
}

/* Representatives Region Map */

const representativesSection = document.querySelector(
  ".representatives_section",
);
const representativeCards = document.querySelectorAll(
  ".representative_card[data-region]",
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

    highlightedCityIndex = -1;

    if (citySearchHint) {
      citySearchHint.textContent =
        "Zacznij wpisywać nazwę miasta, aby znaleźć właściwego przedstawiciela.";
    }
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

function clearRepresentativeRegion() {
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

  clearSelectedCityOnMap();
  clearActiveCityInfo();

  if (citySearchInput) {
    citySearchInput.value = "";
  }

  if (citySuggestions) {
    citySuggestions.classList.remove("show");
    citySuggestions.innerHTML = "";
  }

  highlightedCityIndex = -1;

  if (citySearchHint) {
    citySearchHint.textContent =
      "Zacznij wpisywać nazwę miasta, aby znaleźć właściwego przedstawiciela.";
  }
}

function showRepresentativeRegion(region, activeCard) {
  if (!representativesSection) return;

  representativesSection.classList.remove(
    "active_south",
    "active_west",
    "active_center",
  );

  representativesSection.classList.add("region_mode", `active_${region}`);

  representativeCards.forEach(function (card) {
    card.classList.remove("is_active");
  });

  if (activeCard) {
    activeCard.classList.add("is_active");
  }

  if (activeRegionTitle && regionData[region]) {
    activeRegionTitle.textContent = regionData[region].title;
  }

  if (activeRegionDescription && regionData[region]) {
    activeRegionDescription.textContent = regionData[region].description;
  }
}

function findRepresentativeCardByRegion(region) {
  return Array.from(representativeCards).find(function (card) {
    return card.dataset.region === region;
  });
}

function focusRepresentativeCard(currentCard, direction) {
  const cards = Array.from(representativeCards);

  if (cards.length === 0) return;

  const currentIndex = cards.indexOf(currentCard);

  if (currentIndex === -1) return;

  let nextIndex = currentIndex + direction;

  if (nextIndex >= cards.length) {
    nextIndex = 0;
  }

  if (nextIndex < 0) {
    nextIndex = cards.length - 1;
  }

  cards[nextIndex].focus();
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

  clearSelectedCityOnMap();
  clearActiveCityInfo();

  if (citySearchInput) {
    citySearchInput.value = "";
  }

  if (citySuggestions) {
    citySuggestions.classList.remove("show");
    citySuggestions.innerHTML = "";
  }

  highlightedCityIndex = -1;

  if (citySearchHint) {
    citySearchHint.textContent =
      "Zmieniono przedstawiciela. Możesz ponownie wpisać miasto, aby zaznaczyć je na mapie.";
  }

  showRepresentativeRegion(nextRegion, nextCard);

  nextCard.focus();
}

function updateHighlightedSuggestion() {
  if (!citySuggestions) return;

  const suggestions = citySuggestions.querySelectorAll("li:not(.is_empty)");

  suggestions.forEach(function (item, index) {
    if (index === highlightedCityIndex) {
      item.classList.add("is_highlighted");
      item.scrollIntoView({
        block: "nearest",
      });
    } else {
      item.classList.remove("is_highlighted");
    }
  });
}

function selectCity(cityData) {
  const activeCard = findRepresentativeCardByRegion(cityData.region);

  if (!activeCard) return;

  showRepresentativeRegion(cityData.region, activeCard);
  showActiveCityInfo(cityData.city);

  markCityOnMap(cityData.mapName || cityData.city);

  if (citySearchInput) {
    citySearchInput.value = cityData.city;
  }

  if (citySuggestions) {
    citySuggestions.classList.remove("show");
    citySuggestions.innerHTML = "";
  }

  highlightedCityIndex = -1;

  if (citySearchHint) {
    citySearchHint.textContent =
      "Wybrano miasto: " +
      cityData.city +
      ". Właściwy przedstawiciel: " +
      cityData.representative +
      ".";
  }

  if (representativesSection) {
    representativesSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
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

    citySuggestions.appendChild(emptyItem);
    citySuggestions.classList.add("show");

    return;
  }

  results.forEach(function (cityData) {
    const item = document.createElement("li");

    item.textContent = cityData.city + " — " + cityData.representative;

    item.addEventListener("click", function () {
      selectCity(cityData);
    });

    citySuggestions.appendChild(item);
  });

  citySuggestions.classList.add("show");
}

/* Representatives Cards Click */

if (representativesSection && representativeCards.length > 0) {
  representativeCards.forEach(function (card) {
    card.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        event.stopPropagation();
        return;
      }

      event.stopPropagation();

      const isRegionMode =
        representativesSection.classList.contains("region_mode");
      const isActiveCard = card.classList.contains("is_active");

      if (isRegionMode && isActiveCard) {
        clearRepresentativeRegion();
        return;
      }

      clearSelectedCityOnMap();
      clearActiveCityInfo();

      const region = card.dataset.region;

      showRepresentativeRegion(region, card);
    });

    card.addEventListener("keydown", function (event) {
      const isRegionMode =
        representativesSection.classList.contains("region_mode");

      if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();

        if (isRegionMode) {
          switchRepresentative(1);
        } else {
          focusRepresentativeCard(card, 1);
        }

        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();

        if (isRegionMode) {
          switchRepresentative(-1);
        } else {
          focusRepresentativeCard(card, -1);
        }

        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();

        const isActiveCard = card.classList.contains("is_active");

        if (isRegionMode && isActiveCard) {
          clearRepresentativeRegion();
          return;
        }

        clearSelectedCityOnMap();
        clearActiveCityInfo();

        const region = card.dataset.region;

        showRepresentativeRegion(region, card);
      }
    });
  });

  representativesSection.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function () {
    if (representativesSection.classList.contains("region_mode")) {
      clearRepresentativeRegion();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!representativesSection) return;

    const isRegionMode =
      representativesSection.classList.contains("region_mode");

    if (!isRegionMode) return;

    const isTypingInSearch = event.target === citySearchInput;
    const isFocusedRepresentativeCard = event.target.closest(
      ".representative_card",
    );

    if (isTypingInSearch || isFocusedRepresentativeCard) return;

    if (event.key === "Escape") {
      clearRepresentativeRegion();
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
  representativesMapClose.addEventListener("click", function () {
    clearRepresentativeRegion();
  });
}

/* Map Area Click */

const mapAreas = document.querySelectorAll(".map_area");

if (mapAreas.length > 0) {
  mapAreas.forEach(function (area) {
    area.addEventListener("click", function (event) {
      event.stopPropagation();

      const cityName = getCityNameFromMapArea(area);
      const region = getRegionFromMapArea(area);

      if (!cityName || !region) return;

      const activeCard = findRepresentativeCardByRegion(region);

      if (!activeCard) return;

      showRepresentativeRegion(region, activeCard);
      showActiveCityInfo(cityName);

      markCityOnMap(cityName);

      const representativeName = getRepresentativeNameByRegion(region);

      if (citySearchInput) {
        citySearchInput.value = cityName;
      }

      if (citySuggestions) {
        citySuggestions.classList.remove("show");
        citySuggestions.innerHTML = "";
      }

      highlightedCityIndex = -1;

      if (citySearchHint) {
        citySearchHint.textContent =
          "Wybrano miasto: " +
          cityName +
          ". Właściwy przedstawiciel: " +
          representativeName +
          ".";
      }
    });
  });
}

/* City Search Box */

if (citySearchInput && citySuggestions && representativesSection) {
  citySearchInput.addEventListener("input", function () {
    const searchValue = normalizeText(citySearchInput.value);

    if (searchValue.length < 2) {
      citySuggestions.classList.remove("show");
      citySuggestions.innerHTML = "";
      highlightedCityIndex = -1;

      if (citySearchHint) {
        citySearchHint.textContent =
          "Zacznij wpisywać nazwę miasta, aby znaleźć właściwego przedstawiciela.";
      }

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
/* Home Hero Slider */

const homeSlider = document.getElementById("homeSlider");
const homeSlides = document.querySelectorAll(".home_slide");
const homeSliderPrev = document.getElementById("homeSliderPrev");
const homeSliderNext = document.getElementById("homeSliderNext");
const homeSliderDots = document.querySelectorAll("#homeSliderDots button");

let activeHomeSlide = 0;
let homeSliderInterval = null;

function showHomeSlide(index) {
  if (!homeSlides.length) return;

  if (index < 0) {
    activeHomeSlide = homeSlides.length - 1;
  } else if (index >= homeSlides.length) {
    activeHomeSlide = 0;
  } else {
    activeHomeSlide = index;
  }

  homeSlides.forEach(function (slide, slideIndex) {
    slide.classList.toggle("is_active", slideIndex === activeHomeSlide);
  });

  homeSliderDots.forEach(function (dot, dotIndex) {
    dot.classList.toggle("is_active", dotIndex === activeHomeSlide);
  });
}

function startHomeSliderAutoplay() {
  if (!homeSlides.length) return;

  stopHomeSliderAutoplay();

  homeSliderInterval = setInterval(function () {
    showHomeSlide(activeHomeSlide + 1);
  }, 6500);
}

function stopHomeSliderAutoplay() {
  if (homeSliderInterval) {
    clearInterval(homeSliderInterval);
    homeSliderInterval = null;
  }
}

if (homeSlides.length > 0) {
  showHomeSlide(0);
  startHomeSliderAutoplay();

  if (homeSliderPrev) {
    homeSliderPrev.addEventListener("click", function () {
      showHomeSlide(activeHomeSlide - 1);
      startHomeSliderAutoplay();
    });
  }

  if (homeSliderNext) {
    homeSliderNext.addEventListener("click", function () {
      showHomeSlide(activeHomeSlide + 1);
      startHomeSliderAutoplay();
    });
  }

  homeSliderDots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      showHomeSlide(index);
      startHomeSliderAutoplay();
    });
  });

  if (homeSlider) {
    homeSlider.addEventListener("mouseenter", stopHomeSliderAutoplay);
    homeSlider.addEventListener("mouseleave", startHomeSliderAutoplay);

    homeSlider.addEventListener("focusin", stopHomeSliderAutoplay);
    homeSlider.addEventListener("focusout", startHomeSliderAutoplay);
  }
}

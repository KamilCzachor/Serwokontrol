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

/*Hamburger*/
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener("click", function () {
    navMenu.classList.toggle("show");

    const icon = hamburgerBtn.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });
}

/* Sticky Hamburger Menu */
const stickyHamburgerBtn = document.getElementById("stickyHamburgerBtn");
const stickyNavMenu = document.getElementById("stickyNavMenu");

if (stickyHamburgerBtn && stickyNavMenu) {
  stickyHamburgerBtn.addEventListener("click", function () {
    stickyNavMenu.classList.toggle("show");

    const icon = stickyHamburgerBtn.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  const stickyNavLinks = stickyNavMenu.querySelectorAll("a");

  stickyNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      stickyNavMenu.classList.remove("show");

      const icon = stickyHamburgerBtn.querySelector("i");

      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });
}

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

if (productCards.length > 0 && productModalOverlay) {
  productCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const title = card.dataset.title;
      const subtype = card.dataset.subtype;
      const image = card.dataset.image;
      const description = card.dataset.description;

      productModalTitle.textContent = title;
      productModalSubtype.textContent = subtype;
      productModalDescription.textContent = description;

      productModalImage.src = image;
      productModalImage.alt = title;

      productModalOverlay.classList.add("show");
      document.body.classList.add("no_scroll");
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

        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    }
  });
}

/* Theme Toggle */
const themeToggles = document.querySelectorAll(".theme_toggle");

function updateThemeIcons() {
  themeToggles.forEach(function (button) {
    const icon = button.querySelector("i");

    if (!icon) return;

    if (document.body.classList.contains("dark_theme")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
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

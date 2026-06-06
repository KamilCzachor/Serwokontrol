/* =========================================================
   Contact map loader
   Loads the heavy interactive Poland SVG from an external file and then
   notifies the global script so it can attach map interactions.
   ========================================================= */

(function () {
  const mapMount = document.getElementById("polandMapMount");

  if (!mapMount) return;

  const mapSource = mapMount.getAttribute("data-map-src");

  function dispatchMapReady() {
    document.dispatchEvent(new CustomEvent("serwokontrol:mapReady"));
  }

  function dispatchMapLoadError() {
    document.dispatchEvent(new CustomEvent("serwokontrol:mapLoadError"));
  }

  if (!mapSource) {
    dispatchMapLoadError();
    return;
  }

  fetch(mapSource, { credentials: "same-origin" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Nie udało się pobrać mapy regionów.");
      }

      return response.text();
    })
    .then(function (svgMarkup) {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(svgMarkup, "image/svg+xml");
      const parserError = parsed.querySelector("parsererror");
      const svg = parsed.querySelector("svg");

      if (parserError || !svg) {
        throw new Error("Plik mapy SVG ma nieprawidłową strukturę.");
      }

      mapMount.innerHTML = "";
      mapMount.appendChild(document.importNode(svg, true));
      dispatchMapReady();
    })
    .catch(function () {
      mapMount.innerHTML =
        '<p class="poland_map_error">Mapa regionów chwilowo nie jest dostępna. Wpisz miasto w wyszukiwarce albo skontaktuj się z biurem głównym.</p>';
      dispatchMapLoadError();
    });
})();

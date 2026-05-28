/* =========================================================
   Products Page - Product Modals
   ========================================================= */

(function () {
  const productCards = document.querySelectorAll(".product_card");
  const productModalOverlay = document.getElementById("productModalOverlay");
  const productModal = document.getElementById("productModal");
  const productModalCustomContent = document.getElementById(
    "productModalCustomContent",
  );
  const productModalRight = productModal
    ? productModal.querySelector(".product_modal_right")
    : null;

  const productModalClose = document.getElementById("productModalClose");

  const productModalImage = document.getElementById("productModalImage");
  const productModalSingleImageBox = document.getElementById(
    "productModalSingleImageBox",
  );

  const productModalSubtype = document.getElementById("productModalSubtype");
  const productModalTitle = document.getElementById("productModalTitle");
  const productModalQuote = document.getElementById("productModalQuote");
  const productModalDescription = document.getElementById(
    "productModalDescription",
  );
  const productModalSpec = document.getElementById("productModalSpec");
  const productModalBack = document.getElementById("productModalBack");
  const productModalPdfLink = document.getElementById("productModalPdfLink");

  const productTypeSlider = document.getElementById("productTypeSlider");
  const productTypeSliderImage = document.getElementById(
    "productTypeSliderImage",
  );
  const productTypeSliderName = document.getElementById(
    "productTypeSliderName",
  );
  const productTypeSliderHint = document.getElementById(
    "productTypeSliderHint",
  );
  const productTypeSliderDots = document.getElementById(
    "productTypeSliderDots",
  );
  const productTypeSliderPrev = document.getElementById(
    "productTypeSliderPrev",
  );
  const productTypeSliderNext = document.getElementById(
    "productTypeSliderNext",
  );

  let activeProductSlides = [];
  let activeProductSlide = 0;
  let productSliderInterval = null;
  let productSlideChangeTimeout = null;
  let productWheelChangeLocked = false;

  let activeModalData = null;
  let activeModalType = "";
  let activeFallbackDescription = "";
  let activeProductCardTitle = "";
  let activeProductCardSubtype = "";
  let isProductDetailMode = false;

  const productModalData = {
    valve2000: {
      layout: "standard",
      sliderTitle: "Najpopularniejsze typy zaworów grzybkowych to:",
      quote:
        "Zainstaluj i zapomnij – to hasło charakteryzuje zawory grzybkowe Bürkert.",
      description:
        "Produkowane są z napędami pneumatycznymi, elektrycznymi oraz sterowane ręcznie. Zawory grzybkowe sterowane pneumatycznie cechuje ekstremalna wytrzymałość i trwałość oraz szeroka uniwersalność obsługiwanych mediów. Dostępna szeroka gama wykonań oraz łatwa integracja z głowicami sterującymi.",
      spec: [
        "Zakres średnic do DN100.",
        "Wykonania materiałowe: brąz, stal szlachetna 316L, 304.",
        "Przyłącza: gwintowane, do wspawania, kołnierze, Clamp.",
      ],
      slides: [
        {
          name: "2000 skośny",
          image: "images/products/modal/valve2000/2000-skosny.png",
          detailsTitle: "2000 skośny",
          detailsSubtype: "Szczegóły typu",
          detailsQuote: "",
          detailsDescription: "",
          detailsSpec: [],
          detailsPdfUrl: "pdf/zawory-grzybkowe/2000.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 2000",
        },
        {
          name: "2012 prosty",
          image: "images/products/modal/valve2000/2012-prosty.png",
          detailsTitle: "2012 prosty",
          detailsSubtype: "Szczegóły typu",
          detailsQuote: "",
          detailsDescription: "",
          detailsSpec: [],
          detailsPdfUrl: "pdf/zawory-grzybkowe/2012.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 2012",
        },
        {
          name: "2100 skośny ELEMENT",
          image: "images/products/modal/valve2000/2100-skosny-element.png",
          detailsTitle: "2100 skośny ELEMENT",
          detailsSubtype: "Szczegóły typu",
          detailsQuote: "",
          detailsDescription: "",
          detailsSpec: [],
          detailsPdfUrl: "pdf/zawory-grzybkowe/2100.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 2100",
        },
        {
          name: "2101 prosty ELEMENT",
          image: "images/products/modal/valve2000/2101-prosty-element.png",
          detailsTitle: "2101 prosty ELEMENT",
          detailsSubtype: "Szczegóły typu",
          detailsQuote: "",
          detailsDescription: "",
          detailsSpec: [],
          detailsPdfUrl: "pdf/zawory-grzybkowe/2101.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 2101",
        },
        {
          name: "2106 3/2",
          image: "images/products/modal/valve2000/2106-3-2.png",
          detailsTitle: "2106 3/2",
          detailsSubtype: "Szczegóły typu",
          detailsQuote: "",
          detailsDescription: "",
          detailsSpec: [],
          detailsPdfUrl: "pdf/zawory-grzybkowe/2106.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 2106",
        },
        {
          name: "2060 siłownik SS",
          image: "images/products/modal/valve2000/2060-silownik-ss.png",
          detailsTitle: "2060 siłownik SS",
          detailsSubtype: "Szczegóły typu",
          detailsQuote: "",
          detailsDescription: "",
          detailsSpec: [],
          detailsPdfUrl: "pdf/zawory-grzybkowe/2060.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 2060",
        },
      ],
    },

    valveMembrane: {
      layout: "standard",
      sliderTitle: "Najpopularniejsze typy zaworów membranowych to:",
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },

    valveBall: {
      layout: "standard",
      sliderTitle: "Najpopularniejsze typy zaworów kulowych to:",
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },

    valveIslands: {
      layout: "valve-islands-list",
      customLayout: "valveIslandsList",
      pageTitle: "Wyspy zaworowe – pneumatyka",
      intro: [
        "Firma Bürkert ma ogromne doświadczenie w produkcji wysp zaworowych, będących dzisiaj kluczowym elementem automatyzacji procesów przemysłowych. Bürkert rozwija i dostarcza zaawansowane wyspy zaworowe na rynek globalny nieprzerwanie od 1992 roku.",
        "To właśnie Bürkert jako jeden z pierwszych producentów na świecie połączył funkcje elektryczne i pneumatyczne w jeden zintegrowany system, obejmujący moduły wejść/wyjść I/O oraz interfejsy sieciowe.",
        "Na przestrzeni lat Bürkert zmieniał i udoskonalał swoje wyspy zaworowe, dostosowując wykonania do potrzeb użytkowników oraz do rozwijających się możliwości automatyki przemysłowej.",
        "Wyspy zaworowe potrafią w czasie rzeczywistym monitorować stan urządzeń, zliczać cykle przełączeń zaworów i wysyłać powiadomienia alarmowe.",
      ],
      productsTitle: "Najpopularniejsze typy wysp zaworowych",
      products: [
        {
          name: "8652",
          title: "Typ 8652 AirLINE",
          images: [
            "images/products/modal/valveIslands/8652-1.png",
            "images/products/modal/valveIslands/8652-2.png",
            "images/products/modal/valveIslands/8652-3.png",
            "images/products/modal/valveIslands/8652-4.png",
          ],
          paragraphs: [
            "Wyspa zaworowa typ 8652 AirLINE to najnowszy produkt firmy Bürkert, charakteryzujący się głęboką integracją z systemami sterowania, zaawansowaną diagnostyką cyfrową oraz maksymalnym bezpieczeństwem procesowym.",
          ],
          features: [
            "Wysoka gęstość upakowania: pojedyncza wyspa pozwala na obsługę do 64 funkcji zaworowych na jednym bloku, co znacznie oszczędza miejsce.",
            "Zaawansowana diagnostyka i wyświetlacz: jasne wyświetlacze LCD pokazują statusy, tekstowe komunikaty błędów oraz symbole stanu elementów wykonawczych.",
            "Funkcja Hot-Swap: umożliwia bezpieczną wymianę pojedynczych zaworów podczas pracy układu, bez zatrzymywania całego procesu technologicznego.",
            "Zintegrowane zawory zwrotne: umieszczone w kanale odpowietrzającym zapobiegają niekontrolowanym skokom ciśnienia i przypadkowemu uruchomieniu innych zaworów.",
            "System montażu AirLINE Quick: pozwala na montaż wyspy bezpośrednio w dnie lub ścianie szafy sterowniczej, bez dodatkowych przepustów i śrubunków grodziowych.",
          ],
          communication: [
            "PROFIBUS DP",
            "Industrial Ethernet: PROFINET IO, EtherNet/IP, Modbus TCP, EtherCAT, CC-Link IE Field Basic",
            "PROFINET S2",
            "CANopen",
            "büS dla sieci z urządzeniami Bürkert",
          ],
        },
        {
          name: "8647",
          title: "Typ 8647 AirLINE SP",
          image: "images/products/modal/valveIslands/8647.png",
          paragraphs: [
            "Wyspa zaworowa typ 8647 AirLINE SP to modułowy elektropneumatyczny system automatyzacji składający się z modułów przyłączy i zespołów zaworowych.",
            "Został opracowany z myślą o bezpiecznej i pełnej integracji ze zdecentralizowanym systemem peryferyjnym SIMATIC ET 200SP oraz SIMATIC ET 200SP HA firmy Siemens. Typ 8647 służy do połączenia pneumatycznych zaworów pilotowych bezpośrednio z systemem SIMATIC i sterowania nimi poprzez ten system.",
          ],
        },
        {
          name: "8640",
          title: "Typ 8640",
          image: "images/products/modal/valveIslands/8640.png",
          paragraphs: [
            "Wyspy zaworowe typ 8640 są produkowane przez firmę Bürkert od ponad ćwierć wieku, a ich modułowe serie w wersjach z szerokością 11 mm i 19 mm stanowią sprawdzony standard w automatyzacji procesów.",
            "Warto pamiętać, że konkretne warianty mogą być wycofywane z regularnej oferty i zastępowane nowszymi odpowiednikami, dlatego warto kontaktować się z doradcą technicznym w celu dobrania właściwego zamiennika, np. typu 8652.",
          ],
        },
        {
          name: "8650",
          title: "Typ 8650 AirLINE Ex",
          image: "images/products/modal/valveIslands/8650.png",
          paragraphs: [
            "Wyspa zaworowa typu 8650 AirLINE Ex jest modułowym elektrycznym i pneumatycznym systemem automatyzacji, sterującym złożonymi przebiegami procesów i produkcji w otoczeniu zagrożonym wybuchem.",
            "Najnowsza wersja REV.2 umożliwia zintegrowanie nowych funkcji, takich jak np. czujnik ciśnienia lub przełącznik ciśnieniowy.",
          ],
        },
      ],
      closing: [
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich rozwiązań.",
        "Warto pamiętać, iż oprócz scentralizowanych modułów, jakimi są wyspy zaworowe, firma Bürkert specjalizuje się również w produkcji zaworów w wersji Banjo, czyli specjalnie zaprojektowanych zaworów pilotowych do bezpośredniego montażu na siłownikach pneumatycznych.",
        "W ofercie są również zawory sterujące ze złączem typu NAMUR, umożliwiające bezpośredni montaż na siłownikach pneumatycznych.",
      ],
      closingImages: [
        "images/products/modal/valveIslands/banjo-1.png",
        "images/products/modal/valveIslands/banjo-2.png",
        "images/products/modal/valveIslands/namur-1.png",
        "images/products/modal/valveIslands/namur-2.png",
      ],
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },

    valveControl: {
      layout: "standard",
      sliderTitle: "Najpopularniejsze typy zaworów regulacyjnych to:",
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },

    solenoidValves: {
      layout: "compact",
      sliderTitle: "Najpopularniejsze typy elektrozaworów to:",
      quote:
        "Szeroka gama zaworów elektromagnetycznych Bürkert pozwala dobrać rozwiązanie do niemal każdego medium i zastosowania przemysłowego.",
      description:
        "Zawory elektromagnetyczne to kluczowe elementy systemów przemysłowych. Znajdują zastosowanie między innymi w instalacjach wody przemysłowej i pitnej, przemyśle spożywczym, analityce laboratoryjnej, produkcji wodoru oraz w aplikacjach specjalnych.",
      spec: [
        "Wykonania 2/2-drogowe i 3/2-drogowe do cieczy oraz gazów.",
        "Wersje bezpośredniego działania, serwowspomagane oraz niewymagające różnicy ciśnień.",
        "Rozwiązania do wody, pary wodnej, mediów agresywnych, zanieczyszczonych i wysokociśnieniowych.",
        "Dostępne wykonania ATEX, spożywcze, farmaceutyczne, sanitarne oraz do gazów technicznych i palnych.",
      ],
      slides: [
        {
          name: "6213",
          subtitle: "Woda, ciecze, wersja do gazów, bez różnicy ciśnień",
          image: "images/products/modal/solenoidValves/6213.png",
          detailsTitle: "Typ 6213",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Uniwersalne rozwiązanie do cieczy i gazów, również w wersjach niewymagających różnicy ciśnień.",
          detailsDescription:
            "Typ 6213 to elektrozawór stosowany do wody, cieczy oraz wybranych gazów. Sprawdza się w instalacjach przemysłowych i użytkowych, gdzie wymagane jest niezawodne sterowanie przepływem medium.",
          detailsSpec: [
            "Medium: woda, ciecze oraz wybrane gazy.",
            "Dostępne wykonania niewymagające różnicy ciśnień.",
            "Zastosowanie w instalacjach przemysłowych i wodnych.",
          ],
          detailsPdfUrl:
            "https://www.burkert.com/en/Media/plm/DTS/DS/ds6213-standard-eu-en.pdf?id=DTS0000000000000001000115690ENAI",
          detailsPdfText: "Pełna dokumentacja PDF typu 6213",
        },
        {
          name: "6281",
          subtitle: "Uniwersalny, serwowspomagany",
          image: "images/products/modal/solenoidValves/6281.png",
          detailsTitle: "Typ 6281",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Serwowspomagany elektrozawór uniwersalny do szerokiego zakresu zastosowań.",
          detailsDescription:
            "Typ 6281 to uniwersalny zawór serwowspomagany przeznaczony do pracy z różnymi mediami. Jest dobrym wyborem do standardowych aplikacji przemysłowych, w których liczy się pewna praca i szeroka dostępność wykonań.",
          detailsSpec: [
            "Konstrukcja serwowspomagana.",
            "Uniwersalne zastosowanie w instalacjach przemysłowych.",
            "Dostępne różne warianty materiałowe i napięciowe.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/6281.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 6281",
        },
        {
          name: "5282",
          subtitle: "Do mediów agresywnych i zanieczyszczonych",
          image: "images/products/modal/solenoidValves/5282.png",
          detailsTitle: "Typ 5282",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Rozwiązanie do wymagających mediów, w tym cieczy agresywnych i zanieczyszczonych.",
          detailsDescription:
            "Typ 5282 przeznaczony jest do aplikacji, w których medium może być agresywne lub zanieczyszczone. Konstrukcja zaworu pozwala na pracę w trudniejszych warunkach procesowych.",
          detailsSpec: [
            "Do mediów agresywnych i zanieczyszczonych.",
            "Do aplikacji przemysłowych o podwyższonych wymaganiach.",
            "Dostępne wykonania dopasowane do rodzaju medium.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/5282.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 5282",
        },
        {
          name: "5404",
          subtitle: "Do pary wodnej",
          image: "images/products/modal/solenoidValves/5404.png",
          detailsTitle: "Typ 5404",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Elektrozawór przeznaczony do instalacji pary wodnej i pracy w podwyższonej temperaturze.",
          detailsDescription:
            "Typ 5404 znajduje zastosowanie w instalacjach parowych, gdzie zawór musi pracować z medium o wysokiej temperaturze. Sprawdza się w układach technologicznych i pomocniczych.",
          detailsSpec: [
            "Przeznaczony do pary wodnej.",
            "Do aplikacji o podwyższonej temperaturze medium.",
            "Stosowany w instalacjach technologicznych i przemysłowych.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/5404.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 5404",
        },
        {
          name: "6407",
          subtitle: "Do pary, bez wymaganej różnicy ciśnień",
          image: "images/products/modal/solenoidValves/6407.png",
          detailsTitle: "Typ 6407",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Rozwiązanie do pary wodnej, również tam, gdzie nie ma wymaganej różnicy ciśnień.",
          detailsDescription:
            "Typ 6407 przeznaczony jest do pracy z parą wodną i może być stosowany w aplikacjach, w których zawór nie powinien wymagać minimalnej różnicy ciśnień do poprawnego działania.",
          detailsSpec: [
            "Do pary wodnej.",
            "Wykonanie bez wymaganej różnicy ciśnień.",
            "Do wymagających aplikacji przemysłowych.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/6407.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 6407",
        },
        {
          name: "0290",
          subtitle: "Uniwersalny, bez różnicy ciśnień",
          image: "images/products/modal/solenoidValves/0290.png",
          detailsTitle: "Typ 0290",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Uniwersalny elektrozawór do aplikacji, w których nie występuje wystarczająca różnica ciśnień.",
          detailsDescription:
            "Typ 0290 jest rozwiązaniem uniwersalnym dla instalacji, w których zawór ma pracować niezależnie od różnicy ciśnień. Może być stosowany w wielu typowych układach przemysłowych.",
          detailsSpec: [
            "Uniwersalne zastosowanie.",
            "Praca bez wymaganej różnicy ciśnień.",
            "Do cieczy i gazów w zależności od wykonania.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/0290.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 0290",
        },
        {
          name: "0330",
          subtitle: "Z separacją medium",
          image: "images/products/modal/solenoidValves/0330.png",
          detailsTitle: "Typ 0330",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Zawór z separacją medium do aplikacji, w których medium nie powinno mieć kontaktu z wybranymi elementami zaworu.",
          detailsDescription:
            "Typ 0330 posiada separację medium, dzięki czemu nadaje się do mediów wymagających oddzielenia od elementów roboczych zaworu. To dobre rozwiązanie dla bardziej wymagających aplikacji procesowych.",
          detailsSpec: [
            "Separacja medium.",
            "Do mediów wymagających odizolowania od elementów zaworu.",
            "Zastosowanie laboratoryjne, analitczne i przemysłowe.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/0330.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 0330",
        },
        {
          name: "0142",
          subtitle: "Do mediów agresywnych i zanieczyszczonych",
          image: "images/products/modal/solenoidValves/0142.png",
          detailsTitle: "Typ 0142",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Elektrozawór do pracy z mediami agresywnymi lub zanieczyszczonymi.",
          detailsDescription:
            "Typ 0142 stosowany jest tam, gdzie medium może być agresywne chemicznie lub zanieczyszczone. Może być dobierany do specyficznych aplikacji wymagających odpowiedniego wykonania materiałowego.",
          detailsSpec: [
            "Do mediów agresywnych.",
            "Do mediów zanieczyszczonych.",
            "Możliwość dopasowania wykonania do warunków pracy.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/0142.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 0142",
        },
        {
          name: "6430",
          subtitle: "3/2-drogowy",
          image: "images/products/modal/solenoidValves/6430.png",
          detailsTitle: "Typ 6430",
          detailsSubtype: "Zawór elektromagnetyczny 3/2-drogowy",
          detailsQuote:
            "Elektrozawór 3/2-drogowy do sterowania przepływem lub sygnałem pneumatycznym.",
          detailsDescription:
            "Typ 6430 jest zaworem 3/2-drogowym, który może być stosowany w aplikacjach wymagających przełączania kierunku przepływu lub sterowania elementami wykonawczymi.",
          detailsSpec: [
            "Wykonanie 3/2-drogowe.",
            "Do cieczy lub gazów w zależności od konfiguracji.",
            "Do układów sterujących i aplikacji przemysłowych.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/6430.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 6430",
        },
        {
          name: "6027",
          subtitle: "Uniwersalny",
          image: "images/products/modal/solenoidValves/6027.png",
          detailsTitle: "Typ 6027",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Uniwersalny elektrozawór do wielu standardowych zastosowań przemysłowych.",
          detailsDescription:
            "Typ 6027 to uniwersalny zawór elektromagnetyczny, który może być dobierany do różnych aplikacji związanych ze sterowaniem przepływem cieczy lub gazów.",
          detailsSpec: [
            "Uniwersalne zastosowanie.",
            "Do standardowych instalacji przemysłowych.",
            "Dostępne różne wykonania zależnie od medium i parametrów pracy.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/6027.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 6027",
        },
        {
          name: "7012",
          subtitle: "3/2-drogowy",
          image: "images/products/modal/solenoidValves/7012.png",
          detailsTitle: "Typ 7012",
          detailsSubtype: "Zawór elektromagnetyczny 3/2-drogowy",
          detailsQuote:
            "Kompaktowy zawór 3/2-drogowy do układów sterowania i automatyki.",
          detailsDescription:
            "Typ 7012 jest zaworem 3/2-drogowym stosowanym w układach automatyki oraz sterowania. Sprawdza się w aplikacjach, w których potrzebne jest kompaktowe rozwiązanie do przełączania medium.",
          detailsSpec: [
            "Wykonanie 3/2-drogowe.",
            "Do układów automatyki i sterowania.",
            "Kompaktowa konstrukcja.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/7012.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 7012",
        },
        {
          name: "0255",
          subtitle: "Uniwersalny",
          image: "images/products/modal/solenoidValves/0255.png",
          detailsTitle: "Typ 0255",
          detailsSubtype: "Zawór elektromagnetyczny",
          detailsQuote:
            "Uniwersalny elektrozawór do różnorodnych zastosowań przemysłowych.",
          detailsDescription:
            "Typ 0255 to uniwersalny zawór elektromagnetyczny przeznaczony do typowych aplikacji przemysłowych. Może być dobierany pod konkretne medium, ciśnienie, temperaturę i wymagania instalacji.",
          detailsSpec: [
            "Uniwersalne zastosowanie.",
            "Do różnych mediów w zależności od wykonania.",
            "Dobór pod parametry instalacji i warunki pracy.",
          ],
          detailsPdfUrl: "pdf/zawory-elektromagnetyczne/0255.pdf",
          detailsPdfText: "Pełna dokumentacja PDF typu 0255",
        },
      ],
    },

    flowmeters: {
      layout: "standard",
      sliderTitle: "Najpopularniejsze typy przepływomierzy to:",
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },

    valveHygienic: {
      layout: "standard",
      sliderTitle: "Najpopularniejsze typy zaworów higienicznych to:",
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },

    massFlowControllers: {
      layout: "standard",
      sliderTitle: "Najpopularniejsze typy regulatorów przepływu to:",
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },

    proportionalSolenoidValves: {
      layout: "standard",
      sliderTitle: "Najpopularniejsze typy zaworów proporcjonalnych to:",
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },

    sensorsTransmitters: {
      layout: "standard",
      sliderTitle: "Najpopularniejsze typy czujników i przetworników to:",
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },

    otherProducts: {
      layout: "standard",
      sliderTitle: "Pozostałe grupy produktów:",
      quote: "",
      description: "",
      spec: [],
      slides: [],
    },
  };

  function resetProductModalClasses() {
    if (!productModal) return;

    productModal.className = "product_modal";
  }

  function addProductModalClasses(modalType, modalData) {
    if (!productModal || !modalType) return;

    productModal.classList.add("is_custom_product_modal");
    productModal.classList.add(`modal_${modalType}`);

    if (modalData && modalData.layout) {
      productModal.classList.add(`modal_layout_${modalData.layout}`);
    }
  }

  function animateProductModalRight(callback, detailMode = false) {
    if (!productModalRight || typeof callback !== "function") {
      if (typeof callback === "function") {
        callback();
      }

      return;
    }

    productModalRight.classList.add("is_switching");

    setTimeout(function () {
      callback();

      productModalRight.classList.remove("is_switching");
      productModalRight.classList.toggle("is_detail_mode", detailMode);

      if (detailMode) {
        setTimeout(function () {
          productModalRight.classList.remove("is_detail_mode");
        }, 340);
      }
    }, 180);
  }

  function animateProductSlideChange(callback) {
    if (typeof callback !== "function") {
      return;
    }

    if (!productTypeSliderImage || !productTypeSliderName) {
      callback();
      return;
    }

    clearTimeout(productSlideChangeTimeout);

    productTypeSliderImage.classList.add("is_changing");
    productTypeSliderName.classList.add("is_changing");

    productSlideChangeTimeout = setTimeout(function () {
      callback();

      requestAnimationFrame(function () {
        productTypeSliderImage.classList.remove("is_changing");
        productTypeSliderName.classList.remove("is_changing");
      });
    }, 160);
  }

  function stopProductSlider() {
    if (productSliderInterval) {
      clearInterval(productSliderInterval);
      productSliderInterval = null;
    }
  }

  function startProductSlider() {
    stopProductSlider();

    if (!activeProductSlides || activeProductSlides.length <= 1) {
      return;
    }

    if (isProductDetailMode) {
      return;
    }

    productSliderInterval = setInterval(function () {
      showProductSlide(activeProductSlide + 1);
    }, 5000);
  }

  function showProductBackButton() {
    if (productModalBack) {
      productModalBack.style.display = "inline-flex";
    }
  }

  function hideProductBackButton() {
    if (productModalBack) {
      productModalBack.style.display = "none";
    }
  }

  function showProductSliderHint() {
    if (productTypeSliderHint) {
      productTypeSliderHint.style.display = "block";
    }
  }

  function hideProductSliderHint() {
    if (productTypeSliderHint) {
      productTypeSliderHint.style.display = "none";
    }
  }

  function renderProductPdfLink(pdfUrl, pdfText) {
    if (!productModalPdfLink) return;

    if (!pdfUrl) {
      productModalPdfLink.style.display = "none";
      productModalPdfLink.href = "#";
      return;
    }

    productModalPdfLink.href = pdfUrl;
    productModalPdfLink.style.display = "inline-flex";

    const textElement = productModalPdfLink.querySelector("span");

    if (textElement) {
      textElement.textContent = pdfText || "Otwórz pełną dokumentację PDF";
    }
  }

  function renderProductSpec(specItems) {
    if (!productModalSpec) return;

    productModalSpec.innerHTML = "";

    if (!specItems || specItems.length === 0) {
      productModalSpec.style.display = "none";
      return;
    }

    productModalSpec.style.display = "grid";

    specItems.forEach(function (item) {
      const specItem = document.createElement("div");
      specItem.className = "product_modal_spec_item";

      const icon = document.createElement("i");
      icon.className = "fa-solid fa-check";

      const text = document.createElement("span");
      text.textContent = item;

      specItem.appendChild(icon);
      specItem.appendChild(text);

      productModalSpec.appendChild(specItem);
    });
  }

  function clearProductModalTextLayout() {
    hideProductBackButton();

    if (productModalQuote) {
      productModalQuote.textContent = "";
      productModalQuote.style.display = "none";
    }

    if (productModalDescription) {
      productModalDescription.textContent = "";
      productModalDescription.style.display = "none";
    }

    if (productModalSpec) {
      productModalSpec.innerHTML = "";
      productModalSpec.style.display = "none";
    }

    renderProductPdfLink("", "");
  }

  function hideProductCustomContent() {
    if (!productModalCustomContent) return;

    productModalCustomContent.innerHTML = "";
    productModalCustomContent.style.display = "none";
  }

  function createValveIslandsParagraphs(paragraphs) {
    const fragment = document.createDocumentFragment();

    (paragraphs || []).forEach(function (paragraph) {
      const paragraphElement = document.createElement("p");
      paragraphElement.textContent = paragraph;
      fragment.appendChild(paragraphElement);
    });

    return fragment;
  }

  function renderValveIslandsImages(item, visualElement) {
    const images = item.images && item.images.length > 0 ? item.images : [];

    if (item.image) {
      images.push(item.image);
    }

    images.forEach(function (image, imageIndex) {
      const imageElement = document.createElement("img");
      imageElement.src = image;
      imageElement.alt = item.title || item.name || "Wyspa zaworowa";
      imageElement.loading = "lazy";
      imageElement.className = "valve_island_image";

      if (images.length > 1) {
        imageElement.classList.add("valve_island_image_small");
      }

      imageElement.onerror = function () {
        imageElement.style.display = "none";
      };

      visualElement.appendChild(imageElement);
    });
  }

  function renderValveIslandsCustomContent(modalData) {
    if (!productModalCustomContent || !modalData) return;

    stopProductSlider();
    clearProductModalTextLayout();

    productModalCustomContent.innerHTML = "";
    productModalCustomContent.style.display = "block";

    const content = document.createElement("section");
    content.className = "valve_islands_content";

    const intro = document.createElement("div");
    intro.className = "valve_islands_intro";

    const introTitle = document.createElement("h3");
    introTitle.textContent = modalData.pageTitle || activeProductCardTitle;
    intro.appendChild(introTitle);
    intro.appendChild(createValveIslandsParagraphs(modalData.intro));
    content.appendChild(intro);

    const productsTitle = document.createElement("h4");
    productsTitle.className = "valve_islands_section_title";
    productsTitle.textContent =
      modalData.productsTitle || "Najpopularniejsze typy wysp zaworowych";
    content.appendChild(productsTitle);

    const productsList = document.createElement("div");
    productsList.className = "valve_islands_products";

    (modalData.products || []).forEach(function (item) {
      const productItem = document.createElement("article");
      productItem.className = "valve_island_item";

      const text = document.createElement("div");
      text.className = "valve_island_text";

      const name = document.createElement("span");
      name.className = "valve_island_type";
      name.textContent = item.name || "";
      text.appendChild(name);

      const title = document.createElement("h5");
      title.textContent = item.title || item.name || "";
      text.appendChild(title);

      text.appendChild(createValveIslandsParagraphs(item.paragraphs));

      if (item.features && item.features.length > 0) {
        const featureList = document.createElement("ul");
        featureList.className = "valve_island_features";

        item.features.forEach(function (feature) {
          const featureItem = document.createElement("li");
          featureItem.textContent = feature;
          featureList.appendChild(featureItem);
        });

        text.appendChild(featureList);
      }

      if (item.communication && item.communication.length > 0) {
        const communicationTitle = document.createElement("p");
        communicationTitle.className = "valve_island_communication_title";
        communicationTitle.textContent =
          "Moduł komunikacyjny typ ME34 obsługuje między innymi:";
        text.appendChild(communicationTitle);

        const communicationList = document.createElement("ul");
        communicationList.className = "valve_island_communication";

        item.communication.forEach(function (entry) {
          const entryItem = document.createElement("li");
          entryItem.textContent = entry;
          communicationList.appendChild(entryItem);
        });

        text.appendChild(communicationList);
      }

      const visual = document.createElement("div");
      visual.className = "valve_island_visual";

      if (item.images && item.images.length > 1) {
        visual.classList.add("valve_island_visual_grid");
      }

      renderValveIslandsImages(item, visual);

      productItem.appendChild(text);
      productItem.appendChild(visual);
      productsList.appendChild(productItem);
    });

    content.appendChild(productsList);

    const closing = document.createElement("div");
    closing.className = "valve_islands_closing";
    closing.appendChild(createValveIslandsParagraphs(modalData.closing));

    if (modalData.closingImages && modalData.closingImages.length > 0) {
      const closingImages = document.createElement("div");
      closingImages.className = "valve_islands_closing_images";

      modalData.closingImages.forEach(function (image, index) {
        const imageElement = document.createElement("img");
        imageElement.src = image;
        imageElement.alt =
          index < 2
            ? "Zawór pilotowy w wersji Banjo"
            : "Zawór sterujący ze złączem NAMUR";
        imageElement.loading = "lazy";
        imageElement.onerror = function () {
          imageElement.style.display = "none";
        };

        closingImages.appendChild(imageElement);
      });

      closing.appendChild(closingImages);
    }

    content.appendChild(closing);
    productModalCustomContent.appendChild(content);
  }

  function renderProductModalContent(modalData, fallbackDescription) {
    clearProductModalTextLayout();

    if (productModalSubtype && activeProductCardSubtype) {
      productModalSubtype.textContent = activeProductCardSubtype;
    }

    if (productModalTitle && activeProductCardTitle) {
      productModalTitle.textContent = activeProductCardTitle;
    }

    const quote = modalData && modalData.quote ? modalData.quote : "";
    const description =
      modalData && modalData.description
        ? modalData.description
        : fallbackDescription || "";

    const spec = modalData && modalData.spec ? modalData.spec : [];

    if (productModalQuote) {
      productModalQuote.textContent = quote;
      productModalQuote.style.display = quote ? "block" : "none";
    }

    if (productModalDescription) {
      productModalDescription.textContent = description;
      productModalDescription.style.display = description ? "block" : "none";
    }

    renderProductSpec(spec);
    renderProductPdfLink("", "");
  }

  function renderActiveSlideDetails() {
    const slide = activeProductSlides[activeProductSlide];

    if (!slide) return;

    showProductBackButton();

    if (productModalSubtype) {
      productModalSubtype.textContent =
        slide.detailsSubtype || "Specyfikacja modelu";
    }

    if (productModalTitle) {
      productModalTitle.textContent = slide.detailsTitle || slide.name || "";
    }

    if (productModalQuote) {
      const quote = slide.detailsQuote || "";
      productModalQuote.textContent = quote;
      productModalQuote.style.display = quote ? "block" : "none";
    }

    if (productModalDescription) {
      const description = slide.detailsDescription || "";
      productModalDescription.textContent = description;
      productModalDescription.style.display = description ? "block" : "none";
    }

    renderProductSpec(slide.detailsSpec || []);
    renderProductPdfLink(slide.detailsPdfUrl, slide.detailsPdfText);
  }

  function getActiveSlide() {
    if (!activeProductSlides || activeProductSlides.length === 0) {
      return null;
    }

    return activeProductSlides[activeProductSlide] || null;
  }

  function hasActiveSlideDetails(slide) {
    return !!(
      slide &&
      (slide.detailsTitle || slide.detailsDescription || slide.detailsSpec)
    );
  }

  function updateProductSliderImageAccessibility(slide) {
    if (!productTypeSliderImage) return;

    if (!hasActiveSlideDetails(slide)) {
      productTypeSliderImage.classList.remove("is_clickable");
      productTypeSliderImage.removeAttribute("title");
      productTypeSliderImage.removeAttribute("tabindex");
      productTypeSliderImage.removeAttribute("role");
      productTypeSliderImage.removeAttribute("aria-label");
      return;
    }

    productTypeSliderImage.classList.add("is_clickable");
    productTypeSliderImage.title = isProductDetailMode
      ? "Kliknij, aby wrócić do opisu ogólnego"
      : "Kliknij, aby zobaczyć szczegóły modelu";

    productTypeSliderImage.setAttribute("tabindex", "0");
    productTypeSliderImage.setAttribute("role", "button");
    productTypeSliderImage.setAttribute(
      "aria-label",
      isProductDetailMode
        ? "Wróć do opisu ogólnego"
        : `Zobacz specyfikację modelu ${slide.name || ""}`,
    );
  }

  function enterActiveSlideDetails() {
    const slide = getActiveSlide();

    if (!hasActiveSlideDetails(slide)) {
      return;
    }

    isProductDetailMode = true;
    stopProductSlider();
    updateProductSliderImageAccessibility(slide);

    animateProductModalRight(function () {
      renderActiveSlideDetails();
    }, true);
  }

  function exitActiveSlideDetails() {
    if (!isProductDetailMode) {
      return;
    }

    isProductDetailMode = false;
    updateProductSliderImageAccessibility(getActiveSlide());

    animateProductModalRight(function () {
      renderProductModalContent(activeModalData, activeFallbackDescription);
    }, false);

    startProductSlider();
  }

  function toggleActiveSlideDetails() {
    if (isProductDetailMode) {
      exitActiveSlideDetails();
      return;
    }

    enterActiveSlideDetails();
  }

  function changeProductSlideByWheel(event) {
    if (!activeProductSlides || activeProductSlides.length <= 1) {
      return;
    }

    const wheelDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (Math.abs(wheelDelta) < 8) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (productWheelChangeLocked) {
      return;
    }

    productWheelChangeLocked = true;

    showProductSlide(
      wheelDelta > 0 ? activeProductSlide + 1 : activeProductSlide - 1,
    );

    if (!isProductDetailMode) {
      startProductSlider();
    }

    setTimeout(function () {
      productWheelChangeLocked = false;
    }, 420);
  }

  function showProductSlide(index) {
    if (!productTypeSliderImage || !productTypeSliderName) {
      return;
    }

    if (!activeProductSlides || activeProductSlides.length === 0) {
      productTypeSliderImage.removeAttribute("src");
      productTypeSliderImage.alt = "";
      productTypeSliderImage.style.display = "none";
      productTypeSliderImage.classList.remove("is_clickable");
      productTypeSliderImage.classList.remove("is_changing");
      productTypeSliderImage.removeAttribute("title");
      productTypeSliderImage.removeAttribute("tabindex");
      productTypeSliderImage.removeAttribute("role");
      productTypeSliderImage.removeAttribute("aria-label");

      productTypeSliderName.classList.remove("is_changing");
      productTypeSliderName.textContent = "Zdjęcia zostaną dodane wkrótce.";

      hideProductSliderHint();

      updateProductDots();
      updateProductSliderButtons();

      return;
    }

    animateProductSlideChange(function () {
      if (index < 0) {
        activeProductSlide = activeProductSlides.length - 1;
      } else if (index >= activeProductSlides.length) {
        activeProductSlide = 0;
      } else {
        activeProductSlide = index;
      }

      const slide = activeProductSlides[activeProductSlide];

      const slideLabel = slide.subtitle
        ? `${slide.name} – ${slide.subtitle}`
        : slide.name;

      const slideHasDetails = hasActiveSlideDetails(slide);

      productTypeSliderImage.style.display = "block";
      productTypeSliderImage.src = slide.image;
      productTypeSliderImage.alt = slideLabel || "Produkt";

      if (slideHasDetails) {
        showProductSliderHint();
      } else {
        hideProductSliderHint();
      }

      updateProductSliderImageAccessibility(slide);

      productTypeSliderImage.onerror = function () {
        console.error("Nie znaleziono zdjęcia slidera:", slide.image);

        productTypeSliderImage.removeAttribute("src");
        productTypeSliderImage.alt = "";
        productTypeSliderImage.style.display = "none";
        productTypeSliderImage.classList.remove("is_clickable");
        productTypeSliderImage.classList.remove("is_changing");
        productTypeSliderImage.removeAttribute("title");
        productTypeSliderImage.removeAttribute("tabindex");
        productTypeSliderImage.removeAttribute("role");
        productTypeSliderImage.removeAttribute("aria-label");

        productTypeSliderName.classList.remove("is_changing");
        productTypeSliderName.textContent = "Brak zdjęcia: " + slide.image;
      };

      productTypeSliderImage.onload = function () {
        productTypeSliderImage.style.display = "block";
      };

      productTypeSliderName.textContent = slideLabel || "";

      if (isProductDetailMode) {
        animateProductModalRight(function () {
          renderActiveSlideDetails();
          updateProductSliderImageAccessibility(getActiveSlide());
        }, true);
      }

      updateProductDots();
      updateProductSliderButtons();
    });
  }

  function renderProductDots() {
    if (!productTypeSliderDots) return;

    productTypeSliderDots.innerHTML = "";

    if (!activeProductSlides || activeProductSlides.length <= 1) {
      productTypeSliderDots.style.display = "none";
      return;
    }

    productTypeSliderDots.style.display = "flex";

    activeProductSlides.forEach(function (_, index) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Pokaż produkt ${index + 1}`);

      dot.addEventListener("click", function (event) {
        event.stopPropagation();
        showProductSlide(index);

        if (!isProductDetailMode) {
          startProductSlider();
        }
      });

      productTypeSliderDots.appendChild(dot);
    });

    updateProductDots();
  }

  function updateProductDots() {
    if (!productTypeSliderDots) return;

    const dots = productTypeSliderDots.querySelectorAll("button");

    dots.forEach(function (dot, index) {
      dot.classList.toggle("is_active", index === activeProductSlide);
    });
  }

  function updateProductSliderButtons() {
    const shouldDisable =
      !activeProductSlides || activeProductSlides.length <= 1;

    if (productTypeSliderPrev) {
      productTypeSliderPrev.disabled = shouldDisable;
    }

    if (productTypeSliderNext) {
      productTypeSliderNext.disabled = shouldDisable;
    }
  }

  function showSingleProductImage(image, title) {
    hideProductCustomContent();

    if (productModalSingleImageBox && productModalImage) {
      productModalSingleImageBox.style.display = "block";
      productModalImage.src = image || "";
      productModalImage.alt = title || "";
    }

    if (productTypeSlider) {
      productTypeSlider.style.display = "none";
    }

    if (productTypeSliderImage) {
      productTypeSliderImage.removeAttribute("src");
      productTypeSliderImage.alt = "";
      productTypeSliderImage.style.display = "none";
      productTypeSliderImage.classList.remove("is_clickable");
      productTypeSliderImage.classList.remove("is_changing");
      productTypeSliderImage.removeAttribute("title");
      productTypeSliderImage.removeAttribute("tabindex");
      productTypeSliderImage.removeAttribute("role");
      productTypeSliderImage.removeAttribute("aria-label");
    }

    if (productTypeSliderName) {
      productTypeSliderName.classList.remove("is_changing");
      productTypeSliderName.textContent = "";
    }

    hideProductSliderHint();
    renderProductPdfLink("", "");

    activeProductSlides = [];
    activeProductSlide = 0;

    renderProductDots();
    updateProductSliderButtons();
  }

  function showProductTypeSlider(modalData) {
    hideProductCustomContent();

    if (productModalSingleImageBox) {
      productModalSingleImageBox.style.display = "none";
    }

    if (productTypeSlider) {
      productTypeSlider.style.display = "flex";
    }

    const sliderTitle = productTypeSlider
      ? productTypeSlider.querySelector("h4")
      : null;

    if (sliderTitle) {
      sliderTitle.textContent =
        modalData.sliderTitle || "Najpopularniejsze typy produktów to:";
    }

    activeProductSlides = modalData.slides || [];
    activeProductSlide = 0;

    renderProductDots();
    showProductSlide(0);
    startProductSlider();
  }

  function openProductModal(card) {
    if (
      !card ||
      !productModalOverlay ||
      !productModal ||
      !productModalSubtype ||
      !productModalTitle
    ) {
      return;
    }

    const title = card.dataset.title || "";
    const subtype = card.dataset.subtype || "";
    const image = card.dataset.image || "";
    const description = card.dataset.description || "";
    const modalType = card.dataset.modalType || "";
    const modalData = productModalData[modalType];

    stopProductSlider();
    resetProductModalClasses();

    activeModalData = modalData || null;
    activeModalType = modalType;
    activeFallbackDescription = description;
    activeProductCardTitle = title;
    activeProductCardSubtype = subtype;
    isProductDetailMode = false;

    productModalTitle.textContent = title;
    productModalSubtype.textContent = subtype;

    if (modalData) {
      addProductModalClasses(modalType, modalData);

      if (modalData.customLayout === "valveIslandsList") {
        if (productModalSingleImageBox) {
          productModalSingleImageBox.style.display = "none";
        }

        if (productTypeSlider) {
          productTypeSlider.style.display = "none";
        }

        renderValveIslandsCustomContent(modalData);
      } else {
        renderProductModalContent(modalData, description);
        showProductTypeSlider(modalData);
      }
    } else {
      clearProductModalTextLayout();

      if (productModalDescription) {
        productModalDescription.textContent = description;
        productModalDescription.style.display = description ? "block" : "none";
      }

      showSingleProductImage(image, title);
    }

    productModalOverlay.classList.add("show");
    document.body.classList.add("no_scroll");
  }

  function closeProductModal() {
    if (!productModalOverlay) return;

    productModalOverlay.classList.remove("show");
    document.body.classList.remove("no_scroll");

    stopProductSlider();
    clearTimeout(productSlideChangeTimeout);

    activeProductSlides = [];
    activeProductSlide = 0;
    activeModalData = null;
    activeModalType = "";
    activeFallbackDescription = "";
    activeProductCardTitle = "";
    activeProductCardSubtype = "";
    isProductDetailMode = false;

    setTimeout(function () {
      resetProductModalClasses();
      hideProductCustomContent();
      clearProductModalTextLayout();
      showSingleProductImage("", "");
    }, 220);
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

  if (productModalBack) {
    productModalBack.addEventListener("click", function () {
      exitActiveSlideDetails();
    });
  }

  if (productTypeSlider) {
    productTypeSlider.addEventListener("wheel", changeProductSlideByWheel, {
      passive: false,
    });
  }

  if (productTypeSliderImage) {
    productTypeSliderImage.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleActiveSlideDetails();
    });

    productTypeSliderImage.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      toggleActiveSlideDetails();
    });
  }

  if (productTypeSliderPrev) {
    productTypeSliderPrev.addEventListener("click", function (event) {
      event.stopPropagation();
      showProductSlide(activeProductSlide - 1);

      if (!isProductDetailMode) {
        startProductSlider();
      }
    });
  }

  if (productTypeSliderNext) {
    productTypeSliderNext.addEventListener("click", function (event) {
      event.stopPropagation();
      showProductSlide(activeProductSlide + 1);

      if (!isProductDetailMode) {
        startProductSlider();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (
      !productModalOverlay ||
      !productModalOverlay.classList.contains("show")
    ) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();

      if (isProductDetailMode) {
        exitActiveSlideDetails();
        return;
      }

      closeProductModal();
      return;
    }

    if (
      (event.key === "Enter" || event.key === " ") &&
      document.activeElement === productTypeSliderImage
    ) {
      event.preventDefault();
      toggleActiveSlideDetails();
      return;
    }

    if (activeProductSlides && activeProductSlides.length > 1) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();

        showProductSlide(activeProductSlide - 1);

        if (!isProductDetailMode) {
          startProductSlider();
        }

        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        showProductSlide(activeProductSlide + 1);

        if (!isProductDetailMode) {
          startProductSlider();
        }
      }
    }
  });
})();

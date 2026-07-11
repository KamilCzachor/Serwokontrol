/* =========================================================
   Products Page - Catalog Modals
   Data, rendering helpers, filters and modal navigation.
   ========================================================= */

(function () {
  const productCards = document.querySelectorAll(".product_card");
  const productModalOverlay = document.getElementById("productModalOverlay");
  const productModal = document.getElementById("productModal");

  const productCardsArray = Array.from(productCards);
  let activeProductCardIndex = -1;
  let lastFocusedProductCard = null;
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  let modalSwipeHintTimer = null;

  /* =========================================================
     1. Catalog data
     ========================================================= */

  const catalogModalData = {
    valve2000: {
      title: "Zawory procesowe grzybkowe w wersji on/off",
      subtitle: "Zawory procesowe",
      lead: "Zainstaluj i zapomnij – to hasło charakteryzuje zawory grzybkowe Bürkert. Produkowane są z napędami pneumatycznymi, elektrycznymi oraz sterowane ręcznie.",
      description:
        "Zawory grzybkowe sterowane pneumatycznie cechuje ekstremalna wytrzymałość i trwałość oraz szeroka uniwersalność obsługiwanych mediów. Dostępna jest szeroka gama wykonań oraz łatwa integracja z głowicami sterującymi.",
      features: [
        "Zakres średnic do DN100.",
        "Wykonania materiałowe: brąz, stal szlachetna 316L, 304.",
        "Przyłącza: gwintowane, do wspawania, kołnierze, Clamp.",
      ],
      products: [
        {
          name: "2000 skośny",
          image: "images/products/modal/valve2000/extracted/01.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valve2000/2000-skosny.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2012 prosty",
          image: "images/products/modal/valve2000/extracted/02.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valve2000/2012-prosty.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2100 skośny ELEMENT",
          image: "images/products/modal/valve2000/extracted/03.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valve2000/2100-skosny-element.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2101 prosty ELEMENT",
          image: "images/products/modal/valve2000/extracted/04.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valve2000/2101-prosty-element.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2106 3/2 ELEMENT",
          image: "images/products/modal/valve2000/extracted/05.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valve2000/2106-3-2.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2060 siłownik SS",
          image: "images/products/modal/valve2000/extracted/06.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valve2000/2060-silownik-ss.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich elementów.",
      gallery: [
        "images/products/modal/valve2000/extracted/07.png",
        "images/products/modal/valve2000/extracted/08.png",
        "images/products/modal/valve2000/extracted/09.png",
        "images/products/modal/valve2000/extracted/10.png",
      ],
    },
    valveMembrane: {
      title: "Zawory procesowe membranowe w wersji on/off",
      subtitle: "Zawory procesowe",
      lead: "Zastosowanie membrany umożliwia pracę w higienicznych lub agresywnych warunkach. Zawory membranowe produkowane są z napędami pneumatycznymi, elektrycznymi oraz sterowane ręcznie.",
      description:
        "Zawory membranowe cechuje wytrzymałość, wydajność przepływu oraz prostota konserwacji. Opływowe korpusy, zminimalizowane obszary martwe i membrany przystosowane do SIP/CIP zapewniają higienę i sterylność procesu.",
      features: [
        "Zakres średnic: DN8..DN100.",
        "Wykonania materiałowe korpusu: stal szlachetna 316L, PVC, PP, PVDF, HA.",
        "Materiały membran: FKM, EPDM, PTFE, GYLON.",
        "Przyłącza: gwintowane, do wspawania, kołnierze, Clamp, True Union.",
        "Powierzchnie styku z produktem Ra ≤0,38–1,6 µm.",
        "Certyfikaty higieniczne, farmaceutyczne oraz materiałowe.",
      ],
      products: [
        {
          name: "2031 Classic",
          image: "images/products/modal/valveMembrane/extracted/01.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveMembrane/2031-classic.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2103 ELEMENT",
          image: "images/products/modal/valveMembrane/extracted/02.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveMembrane/2103-element.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2030 Classic",
          image: "images/products/modal/valveMembrane/extracted/03.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveMembrane/2030-classic.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2063 siłownik SS",
          image: "images/products/modal/valveMembrane/extracted/04.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveMembrane/2063-silownik-ss.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2933 basic",
          image: "images/products/modal/valveMembrane/extracted/05.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveMembrane/2933-basic.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2973 FullFunction",
          image: "images/products/modal/valveMembrane/extracted/06.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveMembrane/2973-fullfunction.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich elementów.",
      gallery: [
        "images/products/modal/valveMembrane/extracted/07.png",
        "images/products/modal/valveMembrane/extracted/08.png",
        "images/products/modal/valveMembrane/extracted/09.png",
        "images/products/modal/valveMembrane/extracted/10.png",
      ],
    },
    valveBall: {
      title: "Zawory procesowe kulowe w wersji on/off",
      subtitle: "Zawory procesowe",
      lead: "Zawory kulowe zapewniają wysokie wartości przepływu oraz ciśnienia medium, łatwość konserwacji i dużą żywotność.",
      description:
        "Produkowane są z napędami pneumatycznymi, elektrycznymi oraz sterowane ręcznie. Zawory kulowe cechuje duża wydajność przepływu przy minimalnych spadkach ciśnienia i możliwość łączenia z napędami pneumatycznymi oraz elektrycznymi.",
      features: [
        "Zakres średnic: DN8..DN150.",
        "Wykonania materiałowe korpusu: stal szlachetna, PVC, PP, PVDF.",
        "Przyłącza: gwintowane, do wspawania, kołnierze, True-union.",
        "Funkcja 2/2-drogowa oraz 3/2-drogowa.",
      ],
      products: [
        {
          name: "2654",
          image: "images/products/modal/valveBall/extracted/01.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveBall/2654.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2654 higieniczny",
          image: "images/products/modal/valveBall/extracted/02.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveBall/2654-higieniczny.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "TKU001",
          image: "images/products/modal/valveBall/extracted/03.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveBall/tku001.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8804",
          image: "images/products/modal/valveBall/extracted/04.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveBall/8804.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8805",
          image: "images/products/modal/valveBall/extracted/05.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveBall/8805.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2657",
          image: "images/products/modal/valveBall/extracted/06.png",
          description: "",
          features: [],
          pdfUrl: "pdf/valveBall/2657.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich elementów.",
      gallery: [
        "images/products/modal/valveBall/extracted/07.png",
        "images/products/modal/valveBall/extracted/08.png",
        "images/products/modal/valveBall/extracted/09.png",
        "images/products/modal/valveBall/extracted/10.png",
      ],
    },
    valveIslands: {
      title: "Wyspy zaworowe – pneumatyka",
      subtitle: "Pneumatyka",
      lead: "Firma Bürkert ma ogromne doświadczenie w produkcji wysp zaworowych, będących kluczowym elementem automatyzacji procesów przemysłowych. Bürkert rozwija i dostarcza zaawansowane wyspy zaworowe na rynek globalny nieprzerwanie od 1992 roku.",
      description:
        "Wyspy zaworowe łączą funkcje elektryczne i pneumatyczne w jeden zintegrowany system. Mogą monitorować stan urządzeń w czasie rzeczywistym, zliczać cykle przełączeń zaworów i wysyłać powiadomienia alarmowe.",
      features: [
        "Integracja z modułami wejść/wyjść I/O oraz interfejsami sieciowymi.",
        "Możliwość monitorowania stanu urządzeń i diagnostyki.",
        "Rozwiązania dopasowane do nowoczesnej automatyki przemysłowej.",
      ],
      products: [
        {
          name: "8652 AirLINE",
          image: "images/products/modal/valveIslands/extracted/01.png",
          description:
            "Najnowsza wyspa zaworowa Bürkert z głęboką integracją z systemami sterowania, diagnostyką cyfrową i wysokim bezpieczeństwem procesowym.",
          features: [
            "Do 64 funkcji zaworowych na jednym bloku.",
            "Wyświetlacze LCD ze statusem i komunikatami błędów.",
            "Hot-Swap, zintegrowane zawory zwrotne i AirLINE Quick.",
          ],
          pdfUrl: "pdf/valveIslands/8652-airline.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8647 AirLINE SP",
          image: "images/products/modal/valveIslands/extracted/05.png",
          description:
            "Modułowy elektropneumatyczny system automatyzacji do integracji z SIMATIC ET 200SP oraz ET 200SP HA firmy Siemens.",
          features: [],
          pdfUrl: "pdf/valveIslands/8647-airline-sp.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8640",
          image: "images/products/modal/valveIslands/extracted/06.png",
          description:
            "Sprawdzony standard automatyzacji procesów, produkowany przez Bürkert od ponad ćwierć wieku w modułowych seriach 11 mm i 19 mm.",
          features: [],
          pdfUrl: "pdf/valveIslands/8640.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8650 AirLINE Ex",
          image: "images/products/modal/valveIslands/extracted/07.png",
          description:
            "Modułowy elektryczny i pneumatyczny system automatyzacji do złożonych procesów w otoczeniu zagrożonym wybuchem.",
          features: [
            "Wersja REV.2 umożliwia integrację czujnika ciśnienia lub przełącznika ciśnieniowego.",
          ],
          pdfUrl: "pdf/valveIslands/8650-airline-ex.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich rozwiązań. Bürkert specjalizuje się również w produkcji zaworów w wersji Banjo oraz zaworów sterujących ze złączem typu NAMUR do bezpośredniego montażu na siłownikach pneumatycznych.",
      gallery: [
        "images/products/modal/valveIslands/extracted/08.png",
        "images/products/modal/valveIslands/extracted/09.png",
        "images/products/modal/valveIslands/extracted/10.png",
        "images/products/modal/valveIslands/extracted/11.png",
      ],
    },
    valveControl: {
      title: "Zawory procesowe regulacyjne typ 8802",
      subtitle: "Zawory procesowe",
      lead: "Zawory regulacyjne Bürkert to zintegrowany system złożony z zaworu procesowego z napędem oraz pozycjonera. Typ 8802 to modułowy zestaw zamawiany pod jednym numerem systemowym.",
      introImage: "images/products/modal/valveControl/extracted/8802-system.png",
      introImageAlt: "Zestaw 8802: zawór procesowy z napędem oraz pozycjoner",
      description:
        "Zawory regulacyjne służą do precyzyjnego, płynnego sterowania przepływem, ciśnieniem lub temperaturą mediów. W odróżnieniu od zaworów odcinających mogą ustawić się w dowolnej pozycji pośredniej.",
      features: [
        "Napędy pneumatyczne oraz elektryczne.",
        "Pozycjonery zintegrowane ELEMENT oraz uniwersalne SideCONTROL.",
        "Rozwiązania do precyzyjnej regulacji liniowej i obrotowej.",
      ],
      products: [
        {
          name: "2300",
          image: "images/products/modal/valveControl/extracted/02.png",
          description:
            "Zawór regulacyjny skośny o wysokiej przepustowości i dużej żywotności w trudnych warunkach.",
          features: ["Do pary wodnej, gazów i agresywnych cieczy."],
          pdfUrl: "pdf/valveControl/2300.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2301",
          image: "images/products/modal/valveControl/extracted/03.png",
          description:
            "Zawór regulacyjny prosty / grzybkowy do aplikacji wymagających wysokiej precyzji regulacji.",
          features: ["Paraboliczny profil grzybka regulacyjnego."],
          pdfUrl: "pdf/valveControl/2301.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2103",
          image: "images/products/modal/valveControl/extracted/04.png",
          description:
            "Zawór regulacyjny membranowy z izolacją medium od mechanizmu napędu.",
          features: [
            "Do przemysłu spożywczego, farmaceutycznego i biotechnologii.",
          ],
          pdfUrl: "pdf/valveControl/2103.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8802",
          image: "images/products/modal/valveControl/extracted/05.png",
          description:
            "Zestaw regulacyjny dla zaworów kulowych i motylkowych / przepustnic w instalacjach o dużych średnicach.",
          features: [],
          pdfUrl: "pdf/valveControl/8802.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8694 / 8696",
          image: "images/products/modal/valveControl/extracted/06.png",
          description:
            "Ekonomiczne pozycjonery zintegrowane ELEMENT bez wyświetlacza.",
          features: [
            "Sygnalizacja kolorowymi diodami LED.",
            "IO-Link, AS-Interface lub büS.",
          ],
          pdfUrl: "pdf/valveControl/8694-8696.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8692 / 8693",
          image: "images/products/modal/valveControl/extracted/07.png",
          description:
            "Zaawansowane pozycjonery z dużym wyświetlaczem graficznym i pełną diagnostyką zaworu.",
          features: [
            "Wejścia 0/4-20 mA, 0-5/10 V.",
            "8693 z regulatorem procesowym PID.",
          ],
          pdfUrl: "pdf/valveControl/8692-8693.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8791",
          image: "images/products/modal/valveControl/extracted/08.png",
          description:
            "Ekonomiczny pozycjoner boczny SideCONTROL do zaworów liniowych i obrotowych.",
          features: [],
          pdfUrl: "pdf/valveControl/8791.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8792 / 8793",
          image: "images/products/modal/valveControl/extracted/09.png",
          description:
            "Zaawansowany pozycjoner boczny z wyświetlaczem, obsługujący siłowniki liniowe i obrotowe.",
          features: ["8793 z regulatorem procesowym PID."],
          pdfUrl: "pdf/valveControl/8792-8793.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich elementów.",
      gallery: [
        "images/products/modal/valveControl/extracted/10.png",
        "images/products/modal/valveControl/extracted/11.png",
        "images/products/modal/valveControl/extracted/12.png",
        "images/products/modal/valveControl/extracted/13.png",
        "images/products/modal/valveControl/extracted/14.png",
        "images/products/modal/valveControl/extracted/15.png",
      ],
    },
    solenoidValves: {
      title: "Zawory elektromagnetyczne",
      subtitle: "Zawory elektromagnetyczne",
      lead: "Zawory elektromagnetyczne to kluczowe elementy systemów przemysłowych. Znajdują zastosowanie od zaopatrzenia w wodę i przemysłu spożywczego po analitykę laboratoryjną oraz produkcję wodoru.",
      description:
        "Bürkert oferuje szeroki wybór elektrozaworów do wszelkiego rodzaju mediów i zastosowań – od sprawdzonych produktów standardowych po rozwiązania niestandardowe.",
      features: [
        "Wykonania bezpośredniego działania oraz serwowspomagane.",
        "Wersje 2/2-drogowe i 3/2-drogowe do cieczy, pary i gazów.",
        "Rozwiązania ATEX, sanitarne, wysokociśnieniowe oraz do mediów agresywnych.",
      ],
      products: [
        {
          name: "6213",
          image: "images/products/modal/solenoidValves/extracted/01.png",
          description:
            "Serwowspomagany zawór z wymuszonym podnoszeniem membrany, niewymagający różnicy ciśnień.",
          features: [
            "DN 10..40 mm.",
            "Przyłącza 1/4”..2”.",
            "Media: woda, ciecze, wersja HP00 do gazów.",
          ],
          pdfUrl: "pdf/solenoidValves/6213.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "6281",
          image: "images/products/modal/solenoidValves/extracted/02.png",
          description:
            "Uniwersalny zawór serwowspomagany do mediów neutralnych.",
          features: ["DN 10..50 mm.", "Przyłącza 1/4”..2 1/2”."],
          pdfUrl: "pdf/solenoidValves/6281.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "5282",
          image: "images/products/modal/solenoidValves/extracted/03.png",
          description:
            "Serwowspomagany zawór z separacją medium do mediów zanieczyszczonych.",
          features: ["DN 13..65 mm.", "Przyłącza 1/2”..2 1/2”, kołnierz."],
          pdfUrl: "pdf/solenoidValves/5282.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "5404",
          image: "images/products/modal/solenoidValves/extracted/04.png",
          description: "Zawór elektromagnetyczny do pary wodnej.",
          features: ["DN 10..40 mm.", "Uszczelnienie PTFE + grafit."],
          pdfUrl: "pdf/solenoidValves/5404.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "6407",
          image: "images/products/modal/solenoidValves/extracted/05.png",
          description:
            "Serwowspomagany zawór tłokowy do pary, niewymagający różnicy ciśnień.",
          features: ["DN 13..50 mm."],
          pdfUrl: "pdf/solenoidValves/6407.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "0290",
          image: "images/products/modal/solenoidValves/extracted/06.png",
          description:
            "Uniwersalny zawór serwowspomagany z wymuszonym podnoszeniem membrany.",
          features: ["DN 12..65 mm."],
          pdfUrl: "pdf/solenoidValves/0290.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "0330",
          image: "images/products/modal/solenoidValves/extracted/07.png",
          description:
            "Zawór bezpośredniego działania z separacją medium, 2/2 oraz 3/2.",
          features: [
            "DN 1..5,5 mm.",
            "Materiały: mosiądz, stal szlachetna, PVDF, PP, PEEK.",
          ],
          pdfUrl: "pdf/solenoidValves/0330.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "0142",
          image: "images/products/modal/solenoidValves/extracted/08.png",
          description:
            "Serwowspomagany zawór z separacją medium z tworzywa do mediów agresywnych.",
          features: ["DN 15..50 mm.", "Korpus PVC."],
          pdfUrl: "pdf/solenoidValves/0142.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "6430",
          image: "images/products/modal/solenoidValves/extracted/09.png",
          description: "Serwowspomagany zawór tłokowy 3/2.",
          features: ["DN 8..40 mm."],
          pdfUrl: "pdf/solenoidValves/6430.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "7012",
          image: "images/products/modal/solenoidValves/extracted/10.png",
          description:
            "Zawór bezpośredniego działania 3/2 do pneumatyki i mediów neutralnych.",
          features: ["DN 1..2 mm.", "Przyłącza 1/8”, banjo 1/8”, banjo 1/4”."],
          pdfUrl: "pdf/solenoidValves/7012.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich elektrozaworów, dostosowanych do Państwa potrzeb oraz do specyfiki instalacji i medium.",
      gallery: [
        "images/products/modal/solenoidValves/extracted/11.png",
        "images/products/modal/solenoidValves/extracted/12.png",
        "images/products/modal/solenoidValves/extracted/13.png",
        "images/products/modal/solenoidValves/extracted/14.png",
        "images/products/modal/solenoidValves/extracted/15.png",
        "images/products/modal/solenoidValves/extracted/16.png",
      ],
    },
    flowmeters: {
      title: "Przepływomierze",
      subtitle: "Pomiar przepływu",
      lead: "Bürkert oferuje szeroką gamę mechanicznych i elektronicznych przepływomierzy opartych na różnych zasadach działania – od prostych metod mechanicznych po złożone pomiary wieloparametrowe.",
      description:
        "Rozwiązania obejmują przepływomierze turbinkowe, elektromagnetyczne, SAW oraz owalnokołowe, dostosowane do aplikacji od pojedynczej kropli po duże wartości przepływu.",
      features: [
        "Przepływomierze turbinkowe / mechaniczne.",
        "Pomiar SAW – higieniczny, bezdotykowy i bez ruchomych części.",
        "Przepływomierze elektromagnetyczne EMF.",
        "Przepływomierze owalnokołowe do mediów lepkich.",
      ],
      products: [
        {
          name: "SE30",
          image: "images/products/modal/flowmeters/extracted/01.png",
          description:
            "Sensor przepływu do przepływomierzy turbinkowych / mechanicznych.",
          features: [],
          pdfUrl: "pdf/flowmeters/se30.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8035",
          image: "images/products/modal/flowmeters/extracted/02.png",
          description: "Przepływomierz / dozownik.",
          features: [],
          pdfUrl: "pdf/flowmeters/8035.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8025",
          image: "images/products/modal/flowmeters/extracted/03.png",
          description:
            "Przepływomierz / dozownik w wersji panelowej lub naściennej.",
          features: [],
          pdfUrl: "pdf/flowmeters/8025.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8036",
          image: "images/products/modal/flowmeters/extracted/04.png",
          description: "Przepływomierz ELEMENT.",
          features: [],
          pdfUrl: "pdf/flowmeters/8036.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8098 FLOWave",
          image: "images/products/modal/flowmeters/extracted/05.png",
          description: "Przepływomierz SAW do higienicznych aplikacji.",
          features: [],
          pdfUrl: "pdf/flowmeters/8098-flowave.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8045",
          image: "images/products/modal/flowmeters/extracted/06.png",
          description: "Przepływomierz elektromagnetyczny EMF.",
          features: [],
          pdfUrl: "pdf/flowmeters/8045.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8041",
          image: "images/products/modal/flowmeters/extracted/07.png",
          description: "Przepływomierz elektromagnetyczny.",
          features: [],
          pdfUrl: "pdf/flowmeters/8041.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8050",
          image: "images/products/modal/flowmeters/extracted/08.png",
          description: "Przepływomierz elektromagnetyczny.",
          features: [],
          pdfUrl: "pdf/flowmeters/8050.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "S056",
          image: "images/products/modal/flowmeters/extracted/09.png",
          description: "Armatura / element pomiarowy dla EMF.",
          features: [],
          pdfUrl: "pdf/flowmeters/s056.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8077",
          image: "images/products/modal/flowmeters/extracted/10.png",
          description: "Przepływomierz owalnokołowy.",
          features: [],
          pdfUrl: "pdf/flowmeters/8077.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8071",
          image: "images/products/modal/flowmeters/extracted/11.png",
          description: "Przepływomierz owalnokołowy do mediów lepkich.",
          features: [],
          pdfUrl: "pdf/flowmeters/8071.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich przetworników przepływu oraz urządzeń wspomagających, jak np. dzielniki impulsów.",
      gallery: [
        "images/products/modal/flowmeters/extracted/12.png",
        "images/products/modal/flowmeters/extracted/13.png",
        "images/products/modal/flowmeters/extracted/14.png",
        "images/products/modal/flowmeters/extracted/15.png",
        "images/products/modal/flowmeters/extracted/16.png",
      ],
    },
    valveHygienic: {
      title:
        "Głowice sterujące wraz z adapterami do zaworów procesowych higienicznych",
      subtitle: "Zawory procesowe higieniczne",
      lead: "Firma Bürkert produkuje zestawy adapterów typu KK01, które służą do mechanicznego i pneumatycznego łączenia głowic sterujących on/off oraz pozycjonerów Bürkert z zaworami higienicznymi i procesowymi różnych producentów.",
      description:
        "Pozwalają one na montaż głowic sterujących Bürkert, np. typu 8681 lub serii 8690/95/96, oraz pozycjonerów 8694/92/93 i 8791/92/93 na napędach pneumatycznych innych producentów procesowych zaworów higienicznych, takich jak zawory jednogniazdowe, dwugniazdowe i klapowe czy zawory do mediów pomocniczych, takich jak para, woda i chemikalia do czyszczenia.",
      features: [
        "Zestawy adapterów typu KK01 do połączeń mechanicznych i pneumatycznych.",
        "Integracja głowic sterujących Bürkert z napędami zaworów higienicznych innych producentów.",
        "Możliwość montażu pozycjonerów Bürkert na napędach pneumatycznych zaworów procesowych.",
      ],
      products: [
        {
          name: "KK01 Adaptery",
          image: "images/products/modal/valveHygienic/extracted/01.png",
          description:
            "Głowice sterujące oraz pozycjonery firmy Bürkert są przystosowane do zintegrowania w prosty i niezawodny sposób z zaworami i napędami następujących producentów.",
          features: [
            "Alfa Laval",
            "GEA Tuchenhagen",
            "Definox",
            "Aseptomag",
            "APV/SPX",
            "Bardiani",
            "Tyco Hovap",
            "Millipore NovAseptic",
            "Kieselmann",
            "Nocado",
            "INOXPA",
            "Samson",
          ],
          pdfUrl: "pdf/valveHygienic/kk01.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich elementów.",
      gallery: [
        "images/products/modal/valveHygienic/extracted/02.png",
        "images/products/modal/valveHygienic/extracted/03.png",
        "images/products/modal/valveHygienic/extracted/04.png",
      ],
    },
    sensorsTransmitters: {
      title: "Czujniki / Przetworniki pomiarowe",
      subtitle: "Pomiary i analiza mediów",
      lead: "Bürkert specjalizuje się w produkcji zaawansowanych czujników i przetworników pomiarowych przeznaczonych do monitorowania i kontroli mediów płynnych oraz gazowych.",
      description:
        "Oferta obejmuje przetworniki do analizy fizyko-chemicznej cieczy, pomiaru poziomu, ciśnienia, temperatury i przepływu.",
      features: [
        "Przetworniki przewodnictwa, pH i potencjału REDOX.",
        "Przetworniki chloru, żelaza i mętności cieczy.",
        "Pomiary poziomu, ciśnienia, temperatury i przepływu.",
      ],
      products: [
        {
          name: "8228",
          image: "images/products/modal/sensorsTransmitters/extracted/01.png",
          description:
            "Indukcyjny przetwornik przewodnictwa do skoncentrowanych cieczy i szerokiego zakresu przewodności.",
          features: ["100 μS/cm…2 S/cm.", "4..20 mA, IO-Link lub büS."],
          pdfUrl: "pdf/sensorsTransmitters/8228.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8222",
          image: "images/products/modal/sensorsTransmitters/extracted/02.png",
          description:
            "Przetwornik przewodnictwa ELEMENT / Neutrino do czystej wody i lekko stężonych roztworów.",
          features: ["0.05 µS/cm…10 mS/cm."],
          pdfUrl: "pdf/sensorsTransmitters/8222.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8202",
          image: "images/products/modal/sensorsTransmitters/extracted/03.png",
          description: "Przetwornik pH / Redox ELEMENT / Neutrino.",
          features: ["pH -2…16 pH, ORP -2000…+2000 mV."],
          pdfUrl: "pdf/sensorsTransmitters/8202.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8905",
          image: "images/products/modal/sensorsTransmitters/extracted/04.png",
          description: "Modułowy system do monitorowania parametrów wody.",
          features: [
            "pH, chlor, dwutlenek chloru, przewodność, ORP, mętność, temperatura i żelazo.",
          ],
          pdfUrl: "pdf/sensorsTransmitters/8905.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8110",
          image: "images/products/modal/sensorsTransmitters/extracted/05.png",
          description:
            "Wibracyjny czujnik poziomu do wykrywania poziomu i ochrony przed suchobiegiem pompy.",
          features: [],
          pdfUrl: "pdf/sensorsTransmitters/8110.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8188",
          image: "images/products/modal/sensorsTransmitters/extracted/06.png",
          description: "Mikrofalowy przetwornik poziomu do pomiaru cieczy.",
          features: ["Niewrażliwy na pył i parę."],
          pdfUrl: "pdf/sensorsTransmitters/8188.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8619 MultiCELL",
          image: "images/products/modal/sensorsTransmitters/extracted/07.png",
          description: "Wielokanałowy i wielofunkcyjny przekaźnik / regulator.",
          features: ["Opcjonalny Industrial Ethernet."],
          pdfUrl: "pdf/sensorsTransmitters/8619.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich wykonań, dostosowanych do Państwa potrzeb oraz do specyfiki instalacji i medium.",
      gallery: [
        "images/products/modal/sensorsTransmitters/extracted/08.png",
        "images/products/modal/sensorsTransmitters/extracted/09.png",
        "images/products/modal/sensorsTransmitters/extracted/10.png",
        "images/products/modal/sensorsTransmitters/extracted/11.png",
        "images/products/modal/sensorsTransmitters/extracted/12.png",
      ],
    },
    proportionalSolenoidValves: {
      title: "Zawory elektromagnetyczne proporcjonalne",
      subtitle: "Zawory proporcjonalne",
      lead: "Firma Bürkert jest wiodącym na świecie producentów zaworów proporcjonalnych elektromagnetycznych. Urządzenia te są kluczowym elementem w dziedzinie ciągłej i precyzyjnej regulacji przepływu, ciśnienia oraz temperatury cieczy i gazów.",
      description:
        "Zawory elektromagnetyczne proporcjonalne sterowane są sygnałem PWM (modulowana szerokość impulsu). Do sterowanie zaworami proporcjonalnym służą dedykowane sterowniki typ 8605 zamieniające standardowy sygnał wejściowy na sygnał PWM, montowane bezpośrednio na cewce zaworu bądź dla zaworów małogabarytowych na szynie DIN. Przedstawiamy przegląd popularnych serii zaworów proporcjonalnych",
      features: [],
      products: [
        {
          name: "2871",
          image: "images/products/modal/proportionalSolenoidValves/extracted/01.png",
          description: "Typ 2871 – bezpośredniego działania",
          features: [
            "Zakres średnic: DN 0,05..2 mm",
            "Przyłącza: 1/8”, NPT 1/8, bazowe",
            "Materiał korpusu: mosiądz, stal szlachetna",
            "Dynamika zakresu: 1:200 dla DN 0,8..2, 1:500 dla DN 0,05..0,6",
            "Zasilanie: 24 VDC, 12 VDC",
          ],
          pdfUrl: "pdf/proportionalSolenoidValves/2871.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2873",
          image: "images/products/modal/proportionalSolenoidValves/extracted/02.png",
          description: "Typ 2873 – bezpośredniego działania",
          features: [
            "Zakres średnic: DN 0,8..6 mm",
            "Przyłącza: 1/8”, 1/4”, NPT 1/8, NPT 1/4, bazowe",
            "Materiał korpusu: mosiądz, stal szlachetna",
            "Dynamika zakresu: 1:200",
            "Zasilanie: 24 VDC, 12 VDC",
          ],
          pdfUrl: "pdf/proportionalSolenoidValves/2873.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "2875",
          image: "images/products/modal/proportionalSolenoidValves/extracted/03.png",
          description: "Typ 2875 – bezpośredniego działania",
          features: [
            "Zakres średnic: DN 2..9,5 mm",
            "Przyłącza: 3/8” 1/2”, NPT 3/8, NPT 1/2, bazowe",
            "Materiał korpusu: mosiądz, stal szlachetna",
            "Dynamika zakresu: 1:200",
            "Zasilanie: 24 VDC, 12 VDC",
          ],
          pdfUrl: "pdf/proportionalSolenoidValves/2875.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "6024",
          image: "images/products/modal/proportionalSolenoidValves/extracted/04.png",
          description: "Typ 6024 – bezpośredniego działania",
          features: [
            "Zakres średnic: DN 8..12 mm",
            "Przyłącza: 1/2”, 3/4”",
            "Materiał korpusu: mosiądz, stal szlachetna",
            "Dynamika zakresu: 1:25",
            "Zasilanie: 24 VDC",
          ],
          pdfUrl: "pdf/proportionalSolenoidValves/6024.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "6223",
          image: "images/products/modal/proportionalSolenoidValves/extracted/05.png",
          description: "Typ 6223 – serwowspomagany",
          features: [
            "Zakres średnic: DN 8..20 mm",
            "Przyłącza: 3/8”, 1/2”, 3/4”, 1”",
            "Materiał korpusu: mosiądz, stal szlachetna",
            "Dynamika zakresu: 1:10",
            "Zasilanie: 24 VDC, 12 VDC",
          ],
          pdfUrl: "pdf/proportionalSolenoidValves/6223.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8605",
          image: "images/products/modal/proportionalSolenoidValves/extracted/06.png",
          description: "Elektronika sterująca typ 8605",
          features: [
            "Wygnał wejściowy: 0/4-20mA, 0-5/10 V",
            "Sygnał Wyjściowy: PWM,",
            "Zasilanie 12..24 VDC",
            "Montaż: bezpośrednio na cewce lub na szynie DIN",
          ],
          pdfUrl: "pdf/proportionalSolenoidValves/8605.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich zaworów oraz elektroniki sterującej dopasowanej do danego typu.",
      gallery: [
        "images/products/modal/proportionalSolenoidValves/extracted/01.png",
        "images/products/modal/proportionalSolenoidValves/extracted/02.png",
        "images/products/modal/proportionalSolenoidValves/extracted/03.png",
        "images/products/modal/proportionalSolenoidValves/extracted/04.png",
        "images/products/modal/proportionalSolenoidValves/extracted/05.png",
      ],
    },
    otherProducts: {
      title: "Inne produkty",
      subtitle: "Pozostała oferta",
      productsHeading: "Rozwiązania specjalne",
      lead: "Poza głównymi grupami produktowymi oferujemy również rozwiązania specjalne do instalacji procesowych, automatyki oraz układów pomiarowo-regulacyjnych.",
      description:
        "W tej grupie znajdują się produkty i konfiguracje dobierane indywidualnie do aplikacji, między innymi rozwiązania do regulacji ciśnienia oraz zawory do wymagających mediów i warunków pracy.",
      features: [
        "Dobór rozwiązania pod konkretną aplikację i medium.",
        "Wsparcie przy kompletacji układów specjalnych.",
        "Możliwość konsultacji z przedstawicielem regionalnym.",
      ],
      products: [
        {
          name: "8802 Regulacja ciśnienia w zbiorniku",
          image: "images/products/inne-produkty.png",
          description:
            "Rozwiązanie specjalne do regulacji ciśnienia w zbiorniku.",
          features: [
            "Dobór pod parametry procesu.",
            "Wsparcie przy konfiguracji układu regulacyjnego.",
          ],
          pdfUrl: "pdf/otherProducts/8802-regulacja-cisnienia-w-zbiorniku.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "Zawory do wodoru",
          image: "images/products/modal/otherProducts/extracted/h2.png",
          description:
            "Zawory wysokiego i ultrawysokiego ciśnienia w różnych aplikacjach, takich jak transport, magazynowanie i pobieranie wodoru.",
          features: [
            "Rozwiązania do aplikacji wodorowych.",
            "Wysokie i ultrawysokie ciśnienie.",
          ],
          pdfUrl: "pdf/otherProducts/zawory-do-wodoru.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Nie widzisz produktu, którego szukasz? Wyślij zapytanie przez formularz albo skontaktuj się z przedstawicielem regionalnym — pomożemy dobrać odpowiednie rozwiązanie.",
      gallery: [
        "images/products/inne-produkty.png",
        "images/products/modal/otherProducts/extracted/h2.png",
      ],
    },
    massFlowControllers: {
      title: "Masowe regulatory przepływu MFC / Masowe mierniki przepływu MFM",
      subtitle: "Regulacja i pomiar przepływu",
      lead: "Masowe regulatory przepływu MFC i masowe mierniki przepływu MFM Bürkert umożliwiają precyzyjny pomiar i kontrolę gazów lub cieczy w szerokim zakresie zastosowań przemysłowych i analitycznych.",
      description:
        "Kompaktowe urządzenia łączą czujnik, zawór regulacyjny i elektronikę w jednym urządzeniu, zapewniając wysoką dokładność pomiaru i długoterminową niezawodność procesu.",
      features: [
        "Kapilarne: 10 mlN/min…100 lN/min.",
        "Chipowe: 10 mlN/min…160 lN/min.",
        "In Line: MFC 20 lN…1500 lN/min, MFM ≤2500 lN/min.",
      ],
      products: [
        {
          name: "8743",
          image: "images/products/modal/massFlowControllers/extracted/01.png",
          description:
            "Kapilarny MFC/MFM: analogowy, Modbus, Ethernet, Profinet.",
          features: [],
          pdfUrl: "pdf/massFlowControllers/8743.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8741",
          image: "images/products/modal/massFlowControllers/extracted/02.png",
          description:
            "Chipowy MFC/MFM: analogowy, büS/CANopen, Modbus RS-485, Industrial Ethernet.",
          features: [],
          pdfUrl: "pdf/massFlowControllers/8741.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8745",
          image: "images/products/modal/massFlowControllers/extracted/03.png",
          description:
            "In Line: analogowy, Modbus RS-485, Industrial Ethernet.",
          features: [],
          pdfUrl: "pdf/massFlowControllers/8745.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8744",
          image: "images/products/modal/massFlowControllers/extracted/04.png",
          description: "Kapilarny MFC/MFM: Profibus, büS/CANopen.",
          features: [],
          pdfUrl: "pdf/massFlowControllers/8744.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8742",
          image: "images/products/modal/massFlowControllers/extracted/05.png",
          description:
            "Chipowy MFC/MFM: büS/CANopen, Profibus, Industrial Ethernet.",
          features: [],
          pdfUrl: "pdf/massFlowControllers/8742.pdf",
          pdfText: "Katalog produktu",
        },
        {
          name: "8746",
          image: "images/products/modal/massFlowControllers/extracted/06.png",
          description:
            "In Line: analogowy, büS/CANopen, Profibus, Industrial Ethernet.",
          features: [],
          pdfUrl: "pdf/massFlowControllers/8746.pdf",
          pdfText: "Katalog produktu",
        },
      ],
      closing:
        "Zachęcamy do kontaktu z naszymi pracownikami celem doboru odpowiednich elementów oraz zapoznania się z innymi rozwiązaniami, takimi jak modułowe systemy kontroli przepływu gazów, MFC/MFM do cieczy czy elektroniczne regulatory ciśnienia EPC.",
      gallery: [
        "images/products/modal/massFlowControllers/extracted/07.png",
        "images/products/modal/massFlowControllers/extracted/08.png",
        "images/products/modal/massFlowControllers/extracted/09.png",
        "images/products/modal/massFlowControllers/extracted/10.png",
      ],
    },
  };

  /* =========================================================
     2. Catalog layout configuration
     ========================================================= */

  const cardCatalogModalTypes = new Set([
    "valve2000",
    "valveMembrane",
    "valveBall",
    "massFlowControllers",
  ]);

  Object.entries(catalogModalData).forEach(([key, item]) => {
    item.layout = cardCatalogModalTypes.has(key) ? "cards" : "rows";
  });

  const contactLinks = {
    formHref: "contact.html#contactFormSection",
    mapHref: "contact.html#representativesMap",
  };

  /* =========================================================
     3. Shared utilities
     ========================================================= */

  function setupImageFallbacks(root) {
    const target = root || document;
    target.querySelectorAll("img").forEach((img) => {
      img.addEventListener(
        "error",
        () => {
          const holder = img.closest(
            ".catalog_product_image, .catalog_tile_image, .catalog_intro_visual, .catalog_additional_gallery figure, .product_image, .catalog_single_visual",
          );
          if (holder) {
            holder.classList.add("image_failed");
            holder.setAttribute("data-fallback", img.alt || "Zdjęcie produktu");
          }
          img.hidden = true;
        },
        { once: true },
      );
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  



  function renderFeatureList(items) {
    if (!items || items.length === 0) return "";
    return `<div class="catalog_feature_box">
      <div class="catalog_feature_header">
        <i class="fa-solid fa-list-check" aria-hidden="true"></i>
        <span>Cechy / zakres wykonań</span>
      </div>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>`;
  }

  function renderProductFeatures(items) {
    if (!items || items.length === 0) return "";
    return `<ul class="catalog_product_features">${items
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("")}</ul>`;
  }

  function renderProductRow(product, index) {
    const reverseClass = index % 2 === 1 ? " is_reversed" : "";
    const image = product.image
      ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />`
      : "";
    const pdfUrl = product.pdfUrl || "#";

    return `<article class="catalog_product_row${reverseClass}" style="--catalog-delay: ${index * 70}ms">
      <div class="catalog_product_text">
        <h4>${escapeHtml(product.name)}</h4>
        ${product.description ? `<p>${escapeHtml(product.description)}</p>` : ""}
        ${renderProductFeatures(product.features)}
        <a class="catalog_pdf_btn catalog_pdf_btn_mobile" href="${escapeHtml(pdfUrl)}" target="_blank" rel="noopener noreferrer">
          <i class="fa-solid fa-file-pdf" aria-hidden="true"></i>
          <span>Katalog produktu</span>
        </a>
      </div>
      <div class="catalog_product_visual">
        <div class="catalog_product_image">${image}</div>
        <a class="catalog_pdf_btn catalog_pdf_btn_visual" href="${escapeHtml(pdfUrl)}" target="_blank" rel="noopener noreferrer">
          <i class="fa-solid fa-file-pdf" aria-hidden="true"></i>
          <span>Katalog produktu</span>
        </a>
      </div>
    </article>`;
  }

  function renderProductTile(product, index) {
    const image = product.image
      ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />`
      : "";
    const pdfUrl = product.pdfUrl || "#";

    return `<article class="catalog_product_tile" style="--catalog-delay: ${index * 60}ms">
      <div class="catalog_tile_image">${image}</div>
      <div class="catalog_tile_content">
        <h4>${escapeHtml(product.name)}</h4>
        ${product.description ? `<p>${escapeHtml(product.description)}</p>` : ""}
        ${renderProductFeatures(product.features)}
        <a class="catalog_pdf_btn" href="${escapeHtml(pdfUrl)}" target="_blank" rel="noopener noreferrer">
          <i class="fa-solid fa-file-pdf" aria-hidden="true"></i>
          <span>Katalog produktu</span>
        </a>
      </div>
    </article>`;
  }

  function renderProducts(products, layout) {
    const renderer = layout === "cards" ? renderProductTile : renderProductRow;
    return products.map(renderer).join("");
  }

  function renderIntroVisual(data) {
    if (!data || !data.introImage) return "";

    const alt = data.introImageAlt || data.title || "Grafika produktu";

    return `<figure class="catalog_intro_visual">
      <img src="${escapeHtml(data.introImage)}" alt="${escapeHtml(alt)}" loading="lazy" />
    </figure>`;
  }

  function renderGallery(images) {
    if (!images || images.length === 0) return "";
    return `<div class="catalog_additional_gallery" data-count="${images.filter(Boolean).length}" aria-label="Dodatkowe wykonania produktów">
      ${images
        .filter(Boolean)
        .map(
          (src, index) =>
            `<figure style="--catalog-delay: ${index * 60}ms"><img src="${escapeHtml(src)}" alt="Dodatkowe wykonanie produktu" loading="lazy" /></figure>`,
        )
        .join("")}
    </div>`;
  }

  



  function ensureModalNavigationButtons() {
    if (!productModalOverlay) return;
    if (productModalOverlay.querySelector(".product_modal_nav")) return;

    const prevButton = document.createElement("button");
    prevButton.className = "product_modal_nav product_modal_nav_prev";
    prevButton.type = "button";
    prevButton.setAttribute("aria-label", "Poprzedni produkt");
    prevButton.innerHTML =
      '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>';

    const nextButton = document.createElement("button");
    nextButton.className = "product_modal_nav product_modal_nav_next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Następny produkt");
    nextButton.innerHTML =
      '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>';

    prevButton.addEventListener("click", function (event) {
      event.stopPropagation();
      navigateProductModal(-1);
    });

    nextButton.addEventListener("click", function (event) {
      event.stopPropagation();
      navigateProductModal(1);
    });

    productModalOverlay.append(prevButton, nextButton);
  }

  function getNavigableCards() {
    return productCardsArray.filter(function (card) {
      return !card.classList.contains("is_filtered_out");
    });
  }

  function updateModalNavigationState() {
    if (!productModalOverlay) return;

    const cards = getNavigableCards();
    const buttons = productModalOverlay.querySelectorAll(".product_modal_nav");

    buttons.forEach(function (button) {
      const shouldHide = cards.length <= 1;
      button.hidden = shouldHide;
      button.disabled = shouldHide;
    });
  }

  function navigateProductModal(direction) {
    if (!productModalOverlay || !productModalOverlay.classList.contains("show"))
      return;

    const cards = getNavigableCards();
    if (cards.length <= 1) return;

    const currentCard = productCardsArray[activeProductCardIndex];
    let currentIndex = cards.indexOf(currentCard);

    if (currentIndex < 0) currentIndex = 0;

    const nextIndex = (currentIndex + direction + cards.length) % cards.length;
    openProductModal(cards[nextIndex], { fromModalNavigation: true });
  }

  function ensureModalSwipeHint() {
    if (!productModalOverlay) return null;

    let hint = productModalOverlay.querySelector("#productModalSwipeHint");
    if (hint) return hint;

    hint = document.createElement("div");
    hint.className = "swipe_hint product_modal_swipe_hint";
    hint.id = "productModalSwipeHint";
    hint.setAttribute("aria-hidden", "true");
    hint.innerHTML = `
      <span class="swipe_hint_icon" aria-hidden="true">
        <i class="fa-solid fa-arrow-left"></i>
        <i class="fa-solid fa-hand-pointer"></i>
        <i class="fa-solid fa-arrow-right"></i>
      </span>
      <span class="swipe_hint_text">Przesuń palcem</span>
    `;

    productModalOverlay.appendChild(hint);
    return hint;
  }

  function hideModalSwipeHint() {
    if (modalSwipeHintTimer) {
      window.clearTimeout(modalSwipeHintTimer);
      modalSwipeHintTimer = null;
    }

    const hint = productModalOverlay
      ? productModalOverlay.querySelector("#productModalSwipeHint")
      : null;

    if (hint) {
      hint.classList.remove("is_visible");
    }
  }

  function showModalSwipeHint() {
    if (!isTouchDevice || getNavigableCards().length <= 1) return;

    const hint = ensureModalSwipeHint();
    if (!hint) return;

    hideModalSwipeHint();

    window.setTimeout(function () {
      if (!productModalOverlay.classList.contains("show")) return;

      hint.classList.add("is_visible");

      modalSwipeHintTimer = window.setTimeout(function () {
        hideModalSwipeHint();
      }, 3600);
    }, 350);
  }

  function setupProductModalSwipe() {
    if (!productModalOverlay || !window.PointerEvent) return;

    let swipePointerId = null;
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeCurrentX = 0;
    let swipeCurrentY = 0;
    let swipeStartedAt = 0;
    let isSwipeTracking = false;
    let isHorizontalSwipe = false;

    function resetModalSwipe() {
      swipePointerId = null;
      isSwipeTracking = false;
      isHorizontalSwipe = false;
      swipeStartX = 0;
      swipeStartY = 0;
      swipeCurrentX = 0;
      swipeCurrentY = 0;
      swipeStartedAt = 0;

      productModalOverlay.classList.remove("is_swiping");
    }

    function shouldIgnoreModalSwipeTarget(target) {
      return !!(
        target &&
        target.closest &&
        target.closest(
          'a[href], button, input, textarea, select, .product_modal_close',
        )
      );
    }

    productModalOverlay.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse") return;
      if (!productModalOverlay.classList.contains("show")) return;
      if (getNavigableCards().length <= 1) return;
      if (shouldIgnoreModalSwipeTarget(event.target)) return;

      hideModalSwipeHint();

      swipePointerId = event.pointerId;
      swipeStartX = event.clientX;
      swipeStartY = event.clientY;
      swipeCurrentX = event.clientX;
      swipeCurrentY = event.clientY;
      swipeStartedAt = Date.now();
      isSwipeTracking = true;

      if (typeof productModalOverlay.setPointerCapture === "function") {
        try {
          productModalOverlay.setPointerCapture(event.pointerId);
        } catch (error) {
          // Pointer capture can fail on some embedded browsers.
        }
      }
    });

    productModalOverlay.addEventListener(
      "pointermove",
      function (event) {
        if (!isSwipeTracking || event.pointerId !== swipePointerId) return;

        swipeCurrentX = event.clientX;
        swipeCurrentY = event.clientY;

        const deltaX = swipeCurrentX - swipeStartX;
        const deltaY = swipeCurrentY - swipeStartY;
        const isMostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.18;

        if (!isHorizontalSwipe && Math.abs(deltaX) > 12 && isMostlyHorizontal) {
          isHorizontalSwipe = true;
          productModalOverlay.classList.add("is_swiping");
        }

        if (isHorizontalSwipe && event.cancelable) {
          event.preventDefault();
        }
      },
      { passive: false },
    );

    function finishModalSwipe(event) {
      if (!isSwipeTracking || event.pointerId !== swipePointerId) return;

      const deltaX = swipeCurrentX - swipeStartX;
      const deltaY = swipeCurrentY - swipeStartY;
      const elapsed = Date.now() - swipeStartedAt;
      const isMostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.35;
      const hasEnoughDistance = Math.abs(deltaX) > 54;
      const hasEnoughVelocity = Math.abs(deltaX) > 38 && elapsed < 420;

      if (isMostlyHorizontal && (hasEnoughDistance || hasEnoughVelocity)) {
        navigateProductModal(deltaX < 0 ? 1 : -1);
      }

      resetModalSwipe();
    }

    productModalOverlay.addEventListener("pointerup", finishModalSwipe);
    productModalOverlay.addEventListener("pointercancel", function (event) {
      if (event.pointerId === swipePointerId) resetModalSwipe();
    });
  }

  



  function renderCatalogModal(data, fallback) {
    const title = data.title || fallback.title || "Produkt";
    const subtitle = data.subtitle || fallback.subtype || "Produkty";
    const products = data.products || [];

    productModal.className = `product_modal product_catalog_modal catalog_layout_${data.layout === "cards" ? "cards" : "rows"}`;
    productModal.innerHTML = `
      <button aria-label="Zamknij okno" class="product_modal_close" id="productModalClose" type="button">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>

      <div class="catalog_modal_scroll">
        <section class="catalog_hero">
          <nav class="catalog_breadcrumb" aria-label="Ścieżka"><span>Produkty</span><i class="fa-solid fa-chevron-right" aria-hidden="true"></i><span class="catalog_breadcrumb_badge">${escapeHtml(subtitle)}</span></nav>
          <h3 id="productModalTitle">${escapeHtml(title)}</h3>
          ${data.lead ? `<p class="catalog_lead">${escapeHtml(data.lead)}</p>` : ""}
          ${renderIntroVisual(data)}
          ${data.description ? `<p>${escapeHtml(data.description)}</p>` : ""}
          ${renderFeatureList(data.features)}
        </section>

        <section class="catalog_products_section">
          <div class="catalog_section_heading">
            <span>Oferta Bürkert</span>
            <h4>${escapeHtml(data.productsHeading || "Najpopularniejsze typy")}</h4>
          </div>
          <div class="catalog_products_list is_${data.layout === "cards" ? "cards" : "rows"}" data-count="${products.length}">
            ${renderProducts(products, data.layout)}
          </div>
        </section>

        ${
          data.closing
            ? `<section class="catalog_closing">
          <div class="catalog_closing_icon"><i class="fa-solid fa-headset" aria-hidden="true"></i></div>
          <div class="catalog_closing_content">
            <span>Wsparcie techniczne</span>
            <h4>Potrzebujesz pomocy w doborze?</h4>
            <p>${escapeHtml(data.closing)}</p>
            <div class="catalog_closing_actions">
              <a href="${contactLinks.formHref}"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i><span>Skontaktuj się</span></a>
              <a href="${contactLinks.mapHref}"><i class="fa-solid fa-map-location-dot" aria-hidden="true"></i><span>Mapa przedstawicieli</span></a>
            </div>
          </div>
        </section>`
            : ""
        }
        ${renderGallery(data.gallery)}
      </div>
    `;

    setupImageFallbacks(productModal);

    const closeButton = productModal.querySelector("#productModalClose");
    if (closeButton) closeButton.addEventListener("click", closeProductModal);
  }

  function renderFallbackModal(fallback) {
    const image = fallback.image
      ? `<img src="${escapeHtml(fallback.image)}" alt="${escapeHtml(fallback.title)}" />`
      : "";
    productModal.className = "product_modal product_catalog_modal";
    productModal.innerHTML = `
      <button aria-label="Zamknij okno" class="product_modal_close" id="productModalClose" type="button">
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
      </button>
      <div class="catalog_modal_scroll">
        <section class="catalog_hero">
          <span>${escapeHtml(fallback.subtype || "Produkty")}</span>
          <h3 id="productModalTitle">${escapeHtml(fallback.title || "Produkt")}</h3>
          ${fallback.description ? `<p class="catalog_lead">${escapeHtml(fallback.description)}</p>` : ""}
        </section>
        <div class="catalog_single_visual">${image}</div>
      </div>`;

    const closeButton = productModal.querySelector("#productModalClose");
    if (closeButton) closeButton.addEventListener("click", closeProductModal);
  }

  function openProductModal(card, options) {
    if (!card || !productModalOverlay || !productModal) return;

    const openOptions = options || {};
    const shouldShowSwipeHint = !openOptions.fromModalNavigation;

    activeProductCardIndex = productCardsArray.indexOf(card);
    lastFocusedProductCard = card;

    const modalType = card.dataset.modalType || "";
    const fallback = {
      title: card.dataset.title || "",
      subtype: card.dataset.subtype || "",
      description: card.dataset.description || "",
      image: card.dataset.image || "",
    };

    const data = catalogModalData[modalType];
    if (data) {
      renderCatalogModal(data, fallback);
    } else {
      renderFallbackModal(fallback);
    }

    ensureModalNavigationButtons();
    updateModalNavigationState();

    productModalOverlay.classList.add("show");
    productModalOverlay.setAttribute("aria-hidden", "false");
    productModal.setAttribute("role", "dialog");
    productModal.setAttribute("aria-modal", "true");
    productModal.setAttribute("aria-labelledby", "productModalTitle");
    document.body.classList.add("no_scroll");

    const firstHeading = productModal.querySelector("h3");
    if (firstHeading) firstHeading.setAttribute("tabindex", "-1");
    if (firstHeading) firstHeading.focus({ preventScroll: true });

    if (shouldShowSwipeHint) {
      showModalSwipeHint();
    } else {
      hideModalSwipeHint();
    }
  }

  function closeProductModal() {
    if (!productModalOverlay) return;
    hideModalSwipeHint();
    productModalOverlay.classList.remove("show");
    productModalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no_scroll");
    activeProductCardIndex = -1;

    if (
      lastFocusedProductCard &&
      typeof lastFocusedProductCard.focus === "function"
    ) {
      lastFocusedProductCard.focus({ preventScroll: true });
    }
  }

  function keepFocusInsideModal(event) {
    if (
      event.key !== "Tab" ||
      !productModalOverlay ||
      !productModalOverlay.classList.contains("show") ||
      !productModal
    ) {
      return;
    }

    const focusableElements = Array.from(
      productModalOverlay.querySelectorAll(
        'a[href], button:not([disabled]):not([hidden]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter(function (element) {
      return !!(
        element.offsetWidth ||
        element.offsetHeight ||
        element.getClientRects().length
      );
    });

    if (!focusableElements.length) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }

  function redirectFocusToModal(event) {
    if (
      !productModalOverlay ||
      !productModalOverlay.classList.contains("show") ||
      productModalOverlay.contains(event.target)
    ) {
      return;
    }

    const closeButton = productModalOverlay.querySelector("#productModalClose");
    const heading = productModalOverlay.querySelector("#productModalTitle");

    if (closeButton) {
      closeButton.focus({ preventScroll: true });
    } else if (heading) {
      heading.focus({ preventScroll: true });
    }
  }

  



  function normalizeCategoryName(value) {
    return (value || "")
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/&lstrok;/g, "l")
      .replace(/&oacute;/g, "o")
      .replace(/&eogon;/g, "e")
      .replace(/&aogon;/g, "a")
      .replace(/&sacute;/g, "s")
      .replace(/&cacute;/g, "c")
      .replace(/&zdot;/g, "z")
      .replace(/&zacute;/g, "z");
  }

  function getProductCategories(card) {
    const explicitCategory = card.dataset.productCategory || "";

    if (explicitCategory) {
      const categories = explicitCategory
        .split(/[\s,]+/)
        .map(function (category) {
          return category.trim();
        })
        .filter(Boolean);

      if (categories.length > 0) {
        return Array.from(new Set(categories));
      }
    }

    const subtype = normalizeCategoryName(card.dataset.subtype || "");
    const modalType = card.dataset.modalType || "";

    if (modalType === "proportionalSolenoidValves") {
      return ["control", "solenoid"];
    }

    if (modalType === "valveIslands") {
      return ["automation"];
    }

    if (
      modalType === "flowmeters" ||
      modalType === "sensorsTransmitters" ||
      modalType === "massFlowControllers"
    ) {
      return ["measurement"];
    }

    if (subtype.includes("pomiar") || subtype.includes("regulacja")) {
      return ["measurement"];
    }

    if (subtype.includes("pneumatyka") || subtype.includes("automatyka")) {
      return ["automation"];
    }

    if (subtype.includes("proporcjonalne") && subtype.includes("elektromagnetyczne")) {
      return ["control", "solenoid"];
    }

    if (subtype.includes("proporcjonalne")) {
      return ["control"];
    }

    if (subtype.includes("elektromagnetyczne")) {
      return ["solenoid"];
    }

    if (subtype.includes("zawory procesowe")) {
      return ["process"];
    }

    return ["other"];
  }

  function getProductCategory(card) {
    return getProductCategories(card)[0] || "other";
  }

  function setupProductCardCategories() {
    productCardsArray.forEach(function (card) {
      const categories = getProductCategories(card);
      card.dataset.category = categories[0] || "other";
      card.dataset.categories = categories.join(" ");
    });
  }

  function setupProductFilters() {
    const filterButtons = document.querySelectorAll(".products_filter_btn");
    const emptyState = document.getElementById("productsEmptyState");
    const filterStatus = document.getElementById("productsFilterStatus");
    const availableFilters = Array.from(filterButtons).map(function (button) {
      return button.dataset.productFilter || "all";
    });
    const filterCounts = productCardsArray.reduce(function (counts, card) {
      const categories = (card.dataset.categories || card.dataset.category || getProductCategory(card))
        .split(/\s+/)
        .filter(Boolean);
      counts.all += 1;
      Array.from(new Set(categories)).forEach(function (category) {
        counts[category] = (counts[category] || 0) + 1;
      });
      return counts;
    }, { all: 0 });

    if (filterButtons.length === 0) return;

    filterButtons.forEach(function (button) {
      button.querySelectorAll(".products_filter_count").forEach(function (countBadge) {
        countBadge.remove();
      });

      button.setAttribute(
        "aria-label",
        button.textContent.trim().replace(/\s+/g, " "),
      );
    });

    function updateFilterStatus(activeFilter, visibleCount) {
      if (!filterStatus) return;

      const totalCount = filterCounts.all || productCardsArray.length;
      const activeButton = Array.from(filterButtons).find(function (button) {
        return (button.dataset.productFilter || "all") === activeFilter;
      });
      const activeLabel = activeButton
        ? activeButton.textContent.trim().replace(/\s+/g, " ")
        : "Wszystkie";

      if (activeFilter === "all") {
        filterStatus.textContent = "Wyświetlono wszystkie produkty: " + totalCount + ".";
        return;
      }

      filterStatus.textContent =
        "Filtr: " + activeLabel + " — wyświetlono " + visibleCount + " z " + totalCount + " produktów.";
    }

    function applyProductFilter(activeFilter, options) {
      const settings = options || {};
      const normalizedFilter = availableFilters.includes(activeFilter)
        ? activeFilter
        : "all";

      filterButtons.forEach(function (item) {
        const isActive =
          (item.dataset.productFilter || "all") === normalizedFilter;
        item.classList.toggle("is_active", isActive);
        item.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      let visibleIndex = 0;

      productCardsArray.forEach(function (card) {
        const cardCategories = (card.dataset.categories || card.dataset.category || "")
          .split(/\s+/)
          .filter(Boolean);
        const shouldShow =
          normalizedFilter === "all" ||
          cardCategories.includes(normalizedFilter);

        card.classList.toggle("is_filtered_out", !shouldShow);
        card.hidden = !shouldShow;
        card.setAttribute("aria-hidden", shouldShow ? "false" : "true");

        if (shouldShow) {
          card.style.setProperty(
            "--product-filter-delay",
            visibleIndex * 38 + "ms",
          );
          card.classList.remove("show", "is_visible");
          visibleIndex += 1;
        }
      });

      if (emptyState) {
        const hasResults = visibleIndex > 0;
        emptyState.hidden = hasResults;
        emptyState.classList.toggle("show", !hasResults);
        emptyState.classList.toggle("is_visible", !hasResults);
      }

      updateFilterStatus(normalizedFilter, visibleIndex);
      updateModalNavigationState();

      if (window.SerwokontrolRevealRefresh) {
        window.SerwokontrolRevealRefresh({ resetVisible: true });
      }

      if (settings.updateUrl) {
        const url = new URL(window.location.href);

        if (normalizedFilter === "all") {
          url.searchParams.delete("filter");
        } else {
          url.searchParams.set("filter", normalizedFilter);
        }

        url.hash = "productsFilter";
        window.history.replaceState({}, "", url.toString());

        const target =
          document.querySelector("#productsFilter") ||
          document.querySelector("#productsGrid") ||
          document.querySelector(".products_grid");

        if (target) {
          window.setTimeout(function () {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 40);
        }
      }
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyProductFilter(button.dataset.productFilter || "all", {
          updateUrl: true,
        });
      });
    });

    const params = new URLSearchParams(window.location.search);
    const initialFilter = params.get("filter") || params.get("productFilter");

    if (initialFilter && availableFilters.includes(initialFilter)) {
      applyProductFilter(initialFilter, { updateUrl: false });

      if (
        window.location.hash === "#productsGrid" ||
        window.location.hash === "#productsFilter"
      ) {
        window.setTimeout(function () {
          const target =
            document.querySelector("#productsFilter") ||
            document.querySelector("#productsGrid") ||
            document.querySelector(".products_grid");

          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 160);
      }
    } else {
      updateFilterStatus("all", productCardsArray.length);
    }
  }

  



  if (productModalOverlay) {
    productModalOverlay.setAttribute("aria-hidden", "true");
    setupProductModalSwipe();
  }

  setupImageFallbacks(document);
  setupProductCardCategories();
  setupProductFilters();

  productCardsArray.forEach(function (card) {
    card.addEventListener("click", function (event) {
      if (event.target && event.target.closest && event.target.closest("a[href]")) {
        return;
      }
      openProductModal(card);
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProductModal(card);
      }
    });
  });

  if (productModalOverlay) {
    productModalOverlay.addEventListener("click", function (event) {
      if (event.target === productModalOverlay) closeProductModal();
    });
  }

  document.addEventListener("focusin", redirectFocusToModal);

  document.addEventListener("keydown", function (event) {
    if (
      !productModalOverlay ||
      !productModalOverlay.classList.contains("show")
    ) {
      return;
    }

    keepFocusInsideModal(event);

    if (event.key === "Escape") {
      closeProductModal();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigateProductModal(-1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigateProductModal(1);
    }
  });
})();

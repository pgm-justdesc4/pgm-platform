(async function () {
  const $dayNav = document.getElementById("dayNav");
  const $spotlight = document.getElementById("spotlight");
  const $filter = document.getElementById("filter");
  const $events = document.getElementById("events");
  const $searchForm = document.getElementById("searchForm");
  const $searchFormBottom = document.getElementById("searchFormBottom");

  const API_URL = "https://www.pgm.gent/data/gentsefeesten/events_500.json";
  const $data = await fetchData(API_URL);
  const $day = getParam("day");
  const $searchUrl = "../search.html?search=";

  const $dayEvents = $data.filter((event) => event.day === $day);
  const $dayEventsFiltered = $dayEvents.filter(
    (events) => events.image && events.location
  );
  const $randomEvents = getRandomArray(3, $dayEventsFiltered);

  const $allDayCategories = $dayEvents.map((event) => event.category).flat();
  const $categories = getUniqArray($allDayCategories);

  // RENDER HTML

  function getHTMLForFilter(categories) {
    let html = "";

    categories.forEach((category) => {
      const id = categories.indexOf(category);

      html += `
        <li>
            <a href="#${id}">
                ${category}
            </a>
        </li>`;
    });
    return html;
  }

  function getHTMLForDayEvents(categories, dayEvents) {
    let id = 0;
    let html = "";

    categories.forEach((category) => {
      html += `
        <div>
            <h2 id="${id++}">${category}</h2>
            <a href="#filter">
                <img src="../static/img/gentse-feesten-icoontjes/arrow-up.svg" alt="Arrow up">
            </a>
        </div>
        <ul>
        ${getHTMLForEvents(
          dayEvents.filter((event) => {
            return event.category.includes(category);
          })
        )}
        </ul>`;
    });
    return html;
  }

  // BUILD UI

  function buildUI() {
    $dayNav.innerHTML = getHTMLForDayNavigation(JSON.parse($day), 14, 23);
    $spotlight.innerHTML = getHTMLForEvents($randomEvents);
    $filter.innerHTML = getHTMLForFilter($categories);
    $events.innerHTML = getHTMLForDayEvents($categories, $dayEventsFiltered);
  }

  // REGISTER LISTENERS

  function registerListeners() {
    $searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();

      setSearchParams(searchInput, $searchUrl);
    });

    $searchFormBottom.addEventListener("submit", (e) => {
      e.preventDefault();

      const searchInput = document
        .getElementById("searchInputBottom")
        .value.toLowerCase();

      setSearchParams(searchInput, $searchUrl);
    });
  }

  // INITIALIZE

  function initialize() {
    buildUI();
    registerListeners();
  }

  initialize();
})();

(async function () {
  const API_URL = "https://www.pgm.gent/data/gentsefeesten/news.json";
  const data = await fetchData(API_URL);
  const $titleOne = document.getElementById("title-1");
  const $titleTwo = document.getElementById("title-2");
  const $titleThree = document.getElementById("title-3");

  function getRandomTitle(data) {
    const titles = data.map((data) => data.title);
    const titlesId = data.map((data) => data.id);
    const randomNumber = getRandomNumber(5);
    const title = `<a href="events/detail.html?id=${titlesId[randomNumber]}">${titles[randomNumber]}</a>`;
    return title;
  }

  function buildUI(data) {
    $titleOne.innerHTML = getRandomTitle(data);
    $titleTwo.innerHTML = getRandomTitle(data);
    $titleThree.innerHTML = getRandomTitle(data);
  }

  function initialize() {
    buildUI(data);
  }

  initialize();
})();

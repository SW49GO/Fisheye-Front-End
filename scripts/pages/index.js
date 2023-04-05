/**
 * function to retrieve data from Json file
 * @returns object
 */
async function getJsonDataPhotographers() {
  console.log("index.js ->getJsonDataPhotographers");
  return await fetch("../../data/photographers.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
/*
 * Function to get Object of Identity of one Photograph
 * @param {object} photographers
 * @param {string} id
 * @returns object (personalPhotographer)
 */
async function getPhotograperById(photographers, id) {
  console.log("index.js->getPhotograperById(photographers, id)");
  // Filtre pour récupérer les données correspondant à l'ID du photographe
  const personalPhotographer = photographers.filter(
    (user) => user.id === parseInt(id)
  );
  return personalPhotographer;
}

/**
 * Function to display portraits of photographers
 * @param {array of objects} photographers
 */
async function displayDataIndex(photographers) {
  console.log(photographers);
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Function to display an article for header photograph for the page photographer.html
 * construct from photographerFactory -> getPagePhotographerDOM
 * @param {object} media
 * @param {object} photographers
 */
async function displayDataPhotographer(photographers, idPhotographer) {
  console.log("index.js->displayDataPhotographer");
  // Element du DOM qui recevra le HTML
  const mediaSection = document.querySelector(".photograph-header");
  // Données du photographe sélectionné
  const personalPhotographer = await getPhotograperById(
    photographers,
    idPhotographer
  );
  console.log(personalPhotographer);
  const personalData = { photographer: personalPhotographer[0] };
  const pagePhotographer = photographerFactory(personalData);
  const pageCardDOM = pagePhotographer.getPagePhotographerDOM();
  mediaSection.appendChild(pageCardDOM);

  // Ecouteur d'évènement sur le bouton du Filtre
  const btnFilter = document.querySelector(".btn-filter");
  console.log(btnFilter);
  btnFilter.addEventListener("click", function () {
    console.log("entrer addEventListener Index");
    displayMenuFilter(btnFilter);
  });

  const selectMenuFilter = document.querySelectorAll(".select-menu-item");
  for (let i = 0; i < selectMenuFilter.length; i++) {
    selectMenuFilter[i].addEventListener("click", function () {
      selectFilter(selectMenuFilter[i], btnFilter);
      const selectedMenuFilter = document.querySelector(".select-menu");
      selectedMenuFilter.classList.remove("show");
    });
  }
}

/**
 * Initialization all functions :
 * - displayDataIndex() : to display portraits of photographers
 */
async function init() {
  // Récupèration des datas des photographes
  const { media, photographers } = await getJsonDataPhotographers();

  // Initialisation du contenu de la page d'accueil
  if (window.location.href.includes("index.html")) {
    displayDataIndex(photographers);
  }

  // Initialisation du contenu de la page d'un photographe
  if (window.location.href.includes("photographer.html")) {
    // Récupération de l'ID du photographe
    const urlParams = new URLSearchParams(window.location.search);
    const idPhotographer = urlParams.get("identify");

    displayDataPhotographer(photographers, idPhotographer);
  }
}

init();

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
/**
 * Function to get Object of Identity of one Photograph
 * @param {object} photographers
 * @param {string} id
 * @returns
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
 * Function to get all Object Media for one Photograph
 * @param {object} media
 * @param {string} id
 * @returns
 */
async function getMediaById(media, id) {
  console.log("index.js->getMediaById(media,id)");
  const mediaPhotographer = media.filter(
    (medias) => medias.photographerId === parseInt(id)
  );
  // console.log(mediaPhotographer);
  return mediaPhotographer;
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
async function displayDataPhotographer(media, photographers, idPhotographer) {
  console.log("index.js->displayDataPhotographer");
  // Element du DOM qui recevra le HTML
  const mediaSection = document.querySelector(".photograph-header");
  // Données du photographe sélectionné
  const personalPhotographer = await getPhotograperById(
    photographers,
    idPhotographer
  );

  // Additionner tout les Likes d'un photographe pour l'encart
  const numbLikesEncart = media
    .filter((media) => media.photographerId === parseInt(idPhotographer))
    .map((listLike) => listLike.likes)
    .reduce((acc, value) => acc + value);

  console.log(personalPhotographer);
  const personalData = { photographer: personalPhotographer[0] };
  const pagePhotographer = photographerFactory(personalData);
  const pageCardDOM = pagePhotographer.getPagePhotographerDOM(numbLikesEncart);
  mediaSection.appendChild(pageCardDOM);

  // Ecouteur d'évènement sur le bouton du Filtre
  const btnFilter = document.querySelector(".btn-filter");
  console.log(btnFilter);
  btnFilter.addEventListener("click", function () {
    console.log("entrer addEventListener Index");
    displayMenuFilter(btnFilter);
  });
  // Ecouteur d'évènement sur le menu de sélection du filtre
  const selectMenuFilter = document.querySelectorAll(".select-menu-item");
  for (let i = 0; i < selectMenuFilter.length; i++) {
    // Sur le click
    selectMenuFilter[i].addEventListener("click", function () {
      console.log();
      selectFilter(selectMenuFilter[i], btnFilter);
      const selectedMenuFilter = document.querySelector(".select-menu");
      selectedMenuFilter.classList.remove("show");
    });
    // Sur la touche "Entrée"
    selectMenuFilter[i].addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        selectFilter(selectMenuFilter[i], btnFilter);
        const selectedMenuFilter = document.querySelector(".select-menu");
        selectedMenuFilter.classList.remove("show");
      }
    });
  }
}
/**
 * Function to display the medias of photographers in photographer.html
 * construct from mediaFactory -> getMediaCardDOM
 * @param {object} media
 * @param {object} photographers
 * @param {string} idPhotographer
 * @param {string} options
 */
async function displayMedia(media, photographers, idPhotographer, options) {
  console.log("trier par :" + options);

  const mediaPhotographer = await getMediaById(media, idPhotographer);

  console.log("index.js->displaymedia");

  const mediaImage = document.querySelector(".photograph-header");
  const personalPhotographer = await getPhotograperById(
    photographers,
    idPhotographer
  );

  const photographerData = {
    photographer: personalPhotographer,
    media: mediaPhotographer,
  };
  const mediaModel = mediaFactory(photographerData);
  const mediaCardDOM = mediaModel.getMediaCardDOM();
  console.log(mediaCardDOM);
  mediaImage.appendChild(mediaCardDOM);

  // Initialisation d'un tableau pour le stockage des data-ref des Likes des Photos
  // Ecouteur d'évèvement sur chaque icône Like et appelle de la fonction likeNumberChange() pour le traitement
  const numberLikes = document.querySelectorAll(".number-likes");
  const tabRef = [];
  for (let i = 0; i < numberLikes.length; i++) {
    numberLikes[i].addEventListener("click", function () {
      likeNumberChange(numberLikes[i], tabRef);
    });
  }
}

/**
 * Initialization all functions :
 * - displayDataIndex() : to display portraits of photographers in home page
 * - displayDataPhotographer() : to display static page header photographer
 * - displayMedia() : to display all photos and video
 * @param {string} options
 */
async function init(options) {
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

    displayDataPhotographer(media, photographers, idPhotographer);
    displayMedia(media, photographers, idPhotographer, (options = "1"));
  }
}

init();

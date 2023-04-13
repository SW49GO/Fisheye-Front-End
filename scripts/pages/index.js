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
async function getPhotographerById(photographers, id) {
  console.log("index.js->getPhotograperById(photographers, id)");
  // Retrieve data of a photographer from his ID
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
 * Function to get the Name of a photographer
 * @param {object} photographers
 * @param {string} id
 * @returns
 */
async function getNamePhotographer(photographers, id) {
  console.log("index.js->getNamePhotopher(photographers,id)");
  const photographerName = photographers
    .filter((photographer) => photographer.id === parseInt(id))
    .map((photographer) => photographer.name);
  return photographerName;
}

/**
 * Function to display portraits of photographers
 * @param {array of objects} photographers
 * --> to getUserCardDOM
 */
async function displayDataIndex(photographers) {
  console.log(photographers);
  const photographersSection = document.querySelector(".photographer_section");
  // Loop for display each photographers data in Home Page
  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Function to display an article for header photograph for the page photographer.html
 * @param {object} media
 * @param {object} photographers
 * --> to getPagePhotographerDOM
 */
async function displayDataPhotographer(photographers, idPhotographer) {
  console.log("index.js->displayDataPhotographer");
  // DOM element that will receive the HTML
  const mediaSection = document.querySelector(".photograph-header");
  // Data of photographer who is selected
  const personalPhotographer = await getPhotographerById(
    photographers,
    idPhotographer
  );

  console.log(personalPhotographer[0]);
  const personalData = personalPhotographer[0];
  // eslint-disable-next-line no-undef
  const pagePhotographer = photographerFactory(personalData);
  const pageCardDOM = pagePhotographer.getPagePhotographerDOM();
  mediaSection.appendChild(pageCardDOM);

  // Event listener on Filter button
  const btnFilter = document.querySelector(".btn-filter");
  console.log(btnFilter);
  btnFilter.addEventListener("click", function () {
    console.log("entrer addEventListener Index");
    // eslint-disable-next-line no-undef
    displayMenuFilter(btnFilter);
  });
  // Event listener on filter selection menu
  const selectMenuFilter = document.querySelectorAll(".select-menu-item");
  for (let i = 0; i < selectMenuFilter.length; i++) {
    // On click
    selectMenuFilter[i].addEventListener("click", function () {
      console.log();
      // eslint-disable-next-line no-undef
      selectFilter(selectMenuFilter[i], btnFilter);
      const selectedMenuFilter = document.querySelector(".select-menu");
      selectedMenuFilter.classList.remove("show");
    });
    // On the "Enter" key
    selectMenuFilter[i].addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        // eslint-disable-next-line no-undef
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
  console.log("index.js->displaymedia");
  // DOM element that will receive the HTML
  const mediaImage = document.querySelector(".photograph-header");

  console.log("trier par :" + options);
  // Get the media from ID photographer
  const mediaPhotographer = await getMediaById(media, idPhotographer);

  // Get the data for THE photographer
  const personalPhotographer = await getPhotographerById(
    photographers,
    idPhotographer
  );
  // Get the medias after to check filter
  const newMedia = await getMediaFilter(
    mediaPhotographer,
    idPhotographer,
    options
  );
  console.log(newMedia);
  // The data which is sent to mediaFactory
  const photographerData = {
    photographer: personalPhotographer,
    media: newMedia,
  };

  // eslint-disable-next-line no-undef
  const mediaModel = mediaFactory(photographerData);
  const mediaCardDOM = mediaModel.getMediaCardDOM();
  console.log(mediaCardDOM);
  // Received HTML Element who insert into the DOM
  mediaImage.appendChild(mediaCardDOM);

  // Display encart after the medias
  displayEncart(media, photographers, idPhotographer);

  // Initialization of an array for storing the data-ref of the Likes of the Photos
  // Event listener on each Like icon and call likeNumberChange() function for processing
  const numberLikes = document.querySelectorAll(".number-likes");
  const tabRef = [];
  for (let i = 0; i < numberLikes.length; i++) {
    numberLikes[i].addEventListener("click", function () {
      // eslint-disable-next-line no-undef
      likeNumberChange(numberLikes[i], tabRef);
    });
  }
  // Event listener on each photo -> Click and Enter
  const listPhotos = document.querySelectorAll(".list-photos-conteneur");
  console.log("listPhotos:", listPhotos);
  for (let i = 0; i < listPhotos.length; i++) {
    listPhotos[i].addEventListener("click", function (event) {
      event.preventDefault();
      // eslint-disable-next-line no-undef
      selectPhotoLightBox(listPhotos[i].querySelector(".list-photos"));
    });
    listPhotos[i].addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        // eslint-disable-next-line no-undef
        selectPhotoLightBox(listPhotos[i].querySelector(".list-photos"));
      }
    });
  }
}

/**
 * Function to filter photos
 * @param {object} media
 * @param {string} id
 * @param {string} options
 * @returns
 */
async function getMediaFilter(media, id, options) {
  console.log("index.js-> getMediaFilter(media, id, options)");

  const medias = await getMediaById(media, id);
  // console.log(medias);

  // Filter for the select options
  let mediaFilter;
  switch (options) {
    case "1":
      mediaFilter = medias.sort((a, b) => b.likes - a.likes);
      break;
    case "2":
      mediaFilter = medias.sort((a, b) => b.dates - a.dates);
      break;
    case "3":
      mediaFilter = medias.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      mediaFilter = medias;
  }
  // console.log(mediaFilter);
  return mediaFilter;
}
/**
 * Function to display the Encart
 * @param {object} media
 * @param {object} photographers
 * @param {string} idPhotographer
 */
async function displayEncart(media, photographers, idPhotographer) {
  // DOM element that will receive the HTML
  const mediaConteneur = document.querySelector(".photograph-header");

  // Add all the Like of the photographer photos
  const numbLikesEncart = media
    .filter((media) => media.photographerId === parseInt(idPhotographer))
    .map((listLike) => listLike.likes)
    .reduce((acc, value) => acc + value);
  console.log(numbLikesEncart);
  console.log(media);

  // Get all informations about a photographer to take is service price
  const photoghrapherData = await getPhotographerById(
    photographers,
    idPhotographer
  );
  const price = photoghrapherData[0].price;
  console.log(price);
  const mediaData = await getMediaById(media, idPhotographer);
  console.log(mediaData);
  // eslint-disable-next-line no-undef
  const mediaEncart = mediaFactory(mediaData);
  const encartCardDOM = mediaEncart.getEncart(numbLikesEncart, price);
  mediaConteneur.appendChild(encartCardDOM);
}

/**
 * Function to display LightBox
 * @param {object} media
 * @param {object} photographers
 * @param {string} photoSelected ->ID of the media
 * @param {string} idPhotographer
 */
async function displayLightBox(
  media,
  photographers,
  photoSelected,
  idPhotographer
) {
  console.log(photoSelected);
  if (photoSelected !== "1") {
    console.log("index.js->displayLightBox");
    const mediaPhotographer = await getMediaById(media, idPhotographer);
    const name = await getNamePhotographer(photographers, idPhotographer);
    // HTML element where insert article
    const modal = document.getElementById("contact_modal");
    // eslint-disable-next-line no-undef
    const mediaModel = mediaFactory(mediaPhotographer);
    const mediaLightBoxDOM = mediaModel.getLightBoxDOM(photoSelected, name);

    if (mediaLightBoxDOM != null) {
      modal.appendChild(mediaLightBoxDOM);
      // Focus on lightBox to run keyboard arrow
      const focusLightBoxOpen = document.querySelector(".icon-close");
      focusLightBoxOpen.focus();

      // Event listener on arrows markup
      const arrowLeft = modal.querySelector(".arrow-left");
      arrowLeft.addEventListener("click", function () {
        // eslint-disable-next-line no-undef
        goToPreviousPhoto(mediaPhotographer);
      });
      const arrowRight = modal.querySelector(".arrow-right");
      arrowRight.addEventListener("click", function () {
        // eslint-disable-next-line no-undef
        goToNextPhoto(mediaPhotographer);
      });
      // Event listener for keyboard arrows
      modal.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === 39) {
          // eslint-disable-next-line no-undef
          goToNextPhoto(mediaPhotographer);
        }
        if (e.key === "ArrowLeft" || e.key === 37) {
          // eslint-disable-next-line no-undef
          goToPreviousPhoto(mediaPhotographer);
        }
      });
      // Event listener to close lightBox with keyboard "Enter"
      const closeLightBox = modal.querySelector(".icon-close");
      closeLightBox.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === 13) {
          console.log("index close lightbox");
          e.preventDefault();
          // eslint-disable-next-line no-undef
          closeModal("lightBox", photoSelected);
        }
      });
    }
  }
}

/**
 * Initialization all functions :
 * - displayDataIndex() : to display portraits of photographers in home page
 * - displayDataPhotographer() : to display static page header photographer
 * - displayMedia() : to display all photos and video
 * - displayLightBox() : to display the LightBox
 * @param {string} options
 */
async function init(options) {
  // Retrieve data (media,photographers) -> fetch
  const { media, photographers } = await getJsonDataPhotographers();

  // Initialization of homepage content
  if (window.location.href.includes("index.html")) {
    displayDataIndex(photographers);
  }

  // Initializing the content of a photographer's page
  if (window.location.href.includes("photographer.html")) {
    // Photographer ID recovery
    const urlParams = new URLSearchParams(window.location.search);
    const idPhotographer = urlParams.get("identify");

    displayDataPhotographer(photographers, idPhotographer);
    displayMedia(media, photographers, idPhotographer, (options = "1"));
    displayLightBox(media, photographers, options, idPhotographer);
  }
}

init();

if (window.location.href.includes("index.html")) {
  let i = 0;
  document.addEventListener("keydown", function (e) {
    const bodyElementIndex = document.getElementsByTagName("body")[0];
    const focusable = Array.from(
      bodyElementIndex.querySelectorAll('[tabindex="0"]')
    );
    console.log(focusable);
    if (e.key === "ArrowRight" || e.key === 39) {
      i++;
      i = ((i % focusable.length) + focusable.length) % focusable.length;
      focusable[i].focus();
      console.log("droite: ", i);
    }
    if (e.key === "ArrowLeft" || e.key === 37) {
      i--;
      i = ((i % focusable.length) + focusable.length) % focusable.length;
      focusable[i].focus();
      console.log("gauche", i);
    }
  });
}

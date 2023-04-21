/* eslint-disable no-undef */
/**
 * function to retrieve data from Json file
 * @returns object
 */
async function getJsonDataPhotographers() {
  // console.log("index.js ->getJsonDataPhotographers");
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
 * Called by "displayStaticDataPhotographer","displayMedia" and "displayEncart"
 * @param {object} photographers
 * @param {string} id
 * @returns
 */
async function getPhotographerById(photographers, id) {
  // console.log("index.js->getPhotograperById(photographers, id)");
  // Retrieve data of a photographer from his ID
  const personnalPhotographerData = photographers.filter(
    (user) => user.id === parseInt(id)
  );
  return personnalPhotographerData;
}

/**
 * Function to get all Object Media for one Photograph
 * Called by "displayMedia","getMediaFilter","displayEncart","displayLightBox"
 * @param {object} media
 * @param {string} id
 * @returns
 */
async function getMediaById(media, id) {
  // console.log("index.js->getMediaById(media,id)");
  const mediaPhotographerData = media.filter(
    (medias) => medias.photographerId === parseInt(id)
  );
  return mediaPhotographerData;
}
/**
 * Function to get the Name of a photographer
 * Called by "displayLightBox" to have determine the folder
 * @param {object} photographers
 * @param {string} id
 * @returns
 */
async function getNamePhotographer(photographers, id) {
  // console.log("index.js->getNamePhotopher(photographers,id)");
  const photographerName = photographers
    .filter((photographer) => photographer.id === parseInt(id))
    .map((photographer) => photographer.name);
  return photographerName;
}

/**
 * Function to display portraits of photographers
 * Called by "init"
 * @param {array of objects} photographers
 * --> to getUserCardDOM
 */
async function displayDataPageIndex(photographers) {
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
 * Called by "init"
 * Construct from photographerFactory -> getPagePhotographerDOM
 * @param {object} media
 * @param {object} photographers
 * --> to getPagePhotographerDOM
 */
async function displayStaticDataPhotographer(photographers, idPhotographer) {
  // console.log("index.js->displayStaticDataPhotographer");
  // DOM element that will receive the HTML
  const mediaSection = document.querySelector(".photograph-header");
  // Data of photographer who is selected
  const personnalPhotographerData = await getPhotographerById(
    photographers,
    idPhotographer
  );
  // to send Object to "photographerFactory"
  const personalData = personnalPhotographerData[0];
  // eslint-disable-next-line no-undef
  const pagePhotographer = photographerFactory(personalData);
  const pageCardDOM = pagePhotographer.getPagePhotographerDOM();
  mediaSection.appendChild(pageCardDOM);

  // Event listener on Filter button
  const btnFilter = document.querySelector(".btn-filter");
  btnFilter.addEventListener("click", function () {
    // eslint-disable-next-line no-undef
    displayMenuFilter(btnFilter);
  });
  // Event listener on filter selection menu
  const selectMenuFilter = document.querySelectorAll(".select-menu-item");
  for (let i = 0; i < selectMenuFilter.length; i++) {
    // On click
    selectMenuFilter[i].addEventListener("click", function () {
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
 * Called by "init"
 * Construct from mediaFactory -> getMediaCardDOM
 * @param {object} media
 * @param {object} photographers
 * @param {string} idPhotographer
 * @param {string} options
 */
async function displayMedia(media, photographers, idPhotographer, options) {
  // console.log("index.js->displaymedia");
  // DOM element that will receive the HTML
  const mediaImage = document.querySelector(".photograph-header");

  // Get the media from ID photographer
  const mediaPhotographerData = await getMediaById(media, idPhotographer);

  // Get the data for THE photographer
  const personnalPhotographerData = await getPhotographerById(
    photographers,
    idPhotographer
  );
  // Get the medias after to check filter
  const newMedia = await getMediaFilter(
    mediaPhotographerData,
    idPhotographer,
    options
  );
  // The data which is sent to mediaFactory
  const photographerData = {
    photographer: personnalPhotographerData,
    media: newMedia,
  };

  // eslint-disable-next-line no-undef
  const mediaModel = mediaFactory(photographerData);
  const mediaCardDOM = mediaModel.getMediaCardDOM();
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
 * Called by "displayMedia"
 * @param {object} media
 * @param {string} id
 * @param {string} options
 * @returns
 */
async function getMediaFilter(media, id, options) {
  // console.log("index.js-> getMediaFilter(media, id, options)");

  const medias = await getMediaById(media, id);

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
      mediaFilter = medias.sort((a, b) => a.title.localeCompare(b.title, "fr"));
      break;
    default:
      mediaFilter = medias;
  }
  return mediaFilter;
}
/**
 * Function to display the Encart
 * Called by "displayMedia"
 * Construct from mediaFactory -> getEncartDOM
 * @param {object} media
 * @param {object} photographers
 * @param {string} idPhotographer
 */
async function displayEncart(media, photographers, idPhotographer) {
  // DOM element that will receive the HTML
  const mediaConteneur = document.querySelector(".photograph-header");

  // Added all the Like of the photographer photos
  const numbLikesEncart = media
    .filter((media) => media.photographerId === parseInt(idPhotographer))
    .map((listLike) => listLike.likes)
    .reduce((acc, value) => acc + value);

  // Get all informations about a photographer to take is service price
  const photoghrapherData = await getPhotographerById(
    photographers,
    idPhotographer
  );
  const price = photoghrapherData[0].price;
  const mediaData = await getMediaById(media, idPhotographer);
  // eslint-disable-next-line no-undef
  const mediaEncart = mediaFactory(mediaData);
  const encartCardDOM = mediaEncart.getEncartDOM(numbLikesEncart, price);
  mediaConteneur.appendChild(encartCardDOM);
}

/**
 * Function to display LightBox
 * Called by "init" and "photographer.js ->selectPhotoLightBox"
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
  // photoSelect must be different of option=1 for the filter
  if (photoSelected !== "1") {
    // console.log("index.js->displayLightBox");
    const mediaPhotographerData = await getMediaById(media, idPhotographer);
    // Retrieve the name of the photographer for the name of the folder to get pictures
    const name = await getNamePhotographer(photographers, idPhotographer);
    // HTML element where insert article
    const modal = document.getElementById("contact_modal");
    // eslint-disable-next-line no-undef
    const mediaModel = mediaFactory(mediaPhotographerData);
    const mediaLightBoxDOM = mediaModel.getLightBoxDOM(photoSelected, name);

    if (mediaLightBoxDOM != null) {
      modal.appendChild(mediaLightBoxDOM);
      // Focus on lightBox to run keyboard arrow in the lightBox modal
      const focusLightBoxOpen = document.querySelector(".icon-close");
      focusLightBoxOpen.focus();

      // Event listener on arrows markup
      const arrowLeft = modal.querySelector(".arrow-left");
      arrowLeft.addEventListener("click", function () {
        // eslint-disable-next-line no-undef
        goToPreviousPhoto(mediaPhotographerData);
      });
      const arrowRight = modal.querySelector(".arrow-right");
      arrowRight.addEventListener("click", function () {
        // eslint-disable-next-line no-undef
        goToNextPhoto(mediaPhotographerData);
      });

      // Stockage the first photo to active addEventListener just one time
      let stockagePhoto = localStorage.getItem("photo");
      if (!stockagePhoto) {
        // setItem to have not an empty localStorage
        stockagePhoto = localStorage.setItem("photo", photoSelected);

        // Event listener for keyboard arrows
        modal.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight" || e.key === 39) {
            // eslint-disable-next-line no-undef
            goToNextPhoto(mediaPhotographerData);
          }
          if (e.key === "ArrowLeft" || e.key === 37) {
            // eslint-disable-next-line no-undef
            goToPreviousPhoto(mediaPhotographerData);
          }
        });
      }

      // Event listener to close lightBox with keyboard "Enter"
      const closeLightBox = modal.querySelector(".icon-close");
      closeLightBox.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === 13) {
          e.preventDefault();
          // eslint-disable-next-line no-undef
          closeModal("lightBox", photoSelected);
        }
      });
      // Event listener +1 (onclick html + this one for NVDA)
      closeLightBox.addEventListener("click", function () {
        closeModal("lightBox", photoSelected);
      });
    }
  }
}

/**
 * Initialization all functions :
 * - displayDataPageIndex() : to display portraits of photographers in home page
 * - displayStaticDataPhotographer() : to display static page header photographer
 * - displayMedia() : to display all photos and video
 * - displayLightBox() : to display the LightBox
 * @param {string} options -> use for select option filter / use for displayLightBox -> photoSelected
 */
async function init(options) {
  // Clear localStorage, because stock the first photoSelect(in displayLigthBox) to have just one EventListener
  // on keydown arrowRight and arrowLeft
  localStorage.clear();

  // Retrieve data (media,photographers) -> fetch
  const { media, photographers } = await getJsonDataPhotographers();

  // Initialization of homepage content
  if (window.location.href.includes("index.html")) {
    displayDataPageIndex(photographers);
  }

  // Initializing the content of a photographer's page
  if (window.location.href.includes("photographer.html")) {
    // Photographer ID recovery
    const urlParams = new URLSearchParams(window.location.search);
    const idPhotographer = urlParams.get("identify");

    displayStaticDataPhotographer(photographers, idPhotographer);
    displayMedia(media, photographers, idPhotographer, (options = "1"));
    displayLightBox(media, photographers, options, idPhotographer);
  }
}

init();

/**
 * Navigation with keyboard arrow
 */
if (window.location.href.includes("index.html")) {
  let i = -1; // First focusable after press -> 0
  document.addEventListener("keydown", function (e) {
    const bodyElementIndex = document.getElementsByTagName("body")[0];
    // Array of Elements focusable of the page index
    const focusable = Array.from(
      bodyElementIndex.querySelectorAll('[tabindex="0"]')
    );
    if (e.key === "ArrowRight" || e.key === 39) {
      i++;
      // Assign a positive value to "i", if "i" is negative
      i = ((i % focusable.length) + focusable.length) % focusable.length;
      focusable[i].focus();
    }
    if (e.key === "ArrowLeft" || e.key === 37) {
      i--;
      i = ((i % focusable.length) + focusable.length) % focusable.length;
      focusable[i].focus();
    }
  });
}

/**
 * Function to play audio when video play
 * Called and Construct by getLightBoxDOM-> HTML-> onplay="audioPlay()"
 */
// eslint-disable-next-line no-unused-vars
function audioPlay() {
  const audio = document.querySelector("audio");
  audio.play();
}

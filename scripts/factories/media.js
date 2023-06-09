/**
 * Pattern Factories to create HTMLElements for photographer.html
 * Called by "displayMedia","displayEncart"
 * @param {object} data -> {media[all of the photographer] & photographer[0]}
 * @returns getMediaCardDOM, getEncartDOM, getLightBoxDOM
 */
// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {
  // console.log("factories/media.js");

  /**
   * Function to display Photos and Video
   * Called by "displayMedia"
   * @returns HTML Element
   */
  function getMediaCardDOM() {
    // console.log("factories/media.js->getMediaCardDOM");
    // Name of the photographer
    const { name } = data.photographer[0];
    // Retrieve just the firsname for the folder name
    const path = name.split(" ")[0];
    const parentArticle = document.querySelector(".photograph-header");
    const theLastArticle = document.querySelector(".list-article");
    // If "article" already exist in DOM, remove it
    if (theLastArticle) {
      parentArticle.removeChild(theLastArticle);
    }
    // Creation Article Element
    const article = document.createElement("article");
    article.className = "list-article";

    for (let i = 0; i < data.media.length; i++) {
      // If the data are images <img> else <video>
      const images = data.media[i].image
        ? `<img tabindex="-1" class="list-photos" data-id="${data.media[i].id}" src="assets/photographers/${path}/${data.media[i].image}" alt="${data.media[i].title}" loading="lazy" title="Cliquez pour agrandir"></img>`
        : `<video tabindex="-1" class="videos list-photos" data-id="${data.media[i].id}" aria-label="Vidéo ${data.media[i].title}" title="Cliquez pour lire la vidéo">
                                        <source src="assets/photographers/${path}/${data.media[i].video}" type="video/mp4" >
                                      </video>`;
      // Creation of a variable to describe each media
      const ariaDescription = images.includes("video")
        ? "Cliquer pour lire la vidéos"
        : "Cliquer pour afficher la photo";
      // Title of each media, if data are videos first <p> else second <p>
      const title = data.media[i].video
        ? `<p tabindex="0"><i class="fa-solid fa-video" title="Vidéo"></i> ${data.media[i].title}</p>`
        : `<p tabindex="0">${data.media[i].title}</p>`;

      if (images) {
        article.innerHTML += `<div class="list-photos-photographer">
                                  
                                  <button type="button" tabindex="0" class="list-photos-conteneur" aria-label="${ariaDescription}">
                                    ${images}
                                  </button>                          
                                  <figcaption class="list-photos-description" >
                                    ${title}
                                    <button class="number-likes" tabindex="0" aria-label="Poser un like sur cette image aimé ${data.media[i].likes} fois">${data.media[i].likes}<i data-ref="${data.media[i].id}" class="fa-solid fa-heart icon-likes" title="Ajouter un like"></i></button>
                                    <p class="sr-only" aria-live="polite"></p>                     
                                  </figcaption>
                                </div>`;
      }
    }

    return article;
  }

  /**
   * Function to display the Encart
   * Called by "displayEncart"
   * @param {number} numberLikes
   * @param {number} price
   * @returns
   */
  function getEncartDOM(numberLikes, price) {
    const parentEncart = document.querySelector(".photograph-header");
    const theLastEncart = document.querySelector(".encart");
    // If "encart" already exist in DOM, remove it
    if (theLastEncart) {
      parentEncart.removeChild(theLastEncart);
    }

    const article = document.createElement("article");
    article.className = "encart";
    article.innerHTML = `<p class="likes" tabindex="0" title="Nombre total de likes ">${numberLikes} <span>&hearts;<span></p>
    <p class="price" tabindex="0" title="Tarif journalier des services du photographe">${price}€/jour</p>`;
    article.innerHTML += `<a tabindex="0" href="#begin">Revenir en haut de la page</a>`;
    return article;
  }

  /**
   * Function to display LightBox
   * Called by "displayLightBox"
   * @param {string} photoSelected -> ID of the media
   * @param {string} name ->for the folder name
   * @returns
   */
  function getLightBoxDOM(photoSelected, name) {
    // console.log("factories/media.js->getLightBoxDOM");
    // Retrieve name for the path to the folder
    const path = name[0].split(" ")[0];
    // Retrieve index of the selected photo from his ID
    const indexPhoto = data
      .map((photo) => photo.id == photoSelected)
      .indexOf(true);

    // Send photo index value -> "indexP" variable for next or previous photo
    // eslint-disable-next-line no-undef
    getValueIndex(indexPhoto);

    // Display of all images and video
    // LightBox Navigation Buttons
    let displayMedia = `<div class="conteneurLightBox" role="dialog" aria-label="Caroussel des différents travaux du photographe ${name}">
                          <button tabindex="0" class="icon-close" aria-label="Fermer la lightBox" title="Fermer la lightBox" onclick="closeModal('lightBox')">
                            <i class="fa-sharp fa-solid fa-xmark"></i>
                          </button>
                          <button tabindex="0" class="arrow-left" aria-label="Revenir à l'image précédante" title="Précedente">
                          <i class="fa-sharp fa-solid fa-angle-right fa-rotate-180"></i>
                          </button>
                          <button tabindex="0" class="arrow-right" aria-label="Aller à l'image suivante" title="Suivant">
                            <i class="fa-sharp fa-solid fa-angle-right"></i>
                          </button>
                          <ul class="conteneurImages">`;

    // Retrieval and display of all media
    data.forEach((item, index) => {
      // Defining a class based on the photo selected to be visible
      const classed = indexPhoto == index ? "show" : "hidden";

      if (item.image) {
        // Name of the photo without its extension (.jpg)
        const descImage = item.image.split(".")[0];
        displayMedia += `<li class="li-image">
                          <img class="list-photos lightBox-photo ${classed}" data-id="${item.id}" src="assets/photographers/${path}/${item.image}" alt="photo ${descImage}">
                          <p class="title-photo ${classed}">${item.title}</p>
                        </li>`;
      }

      if (item.video) {
        // Name of the video without its extension (.mp4)
        const descVideo = item.video.split(".")[0];
        displayMedia += ` <li class="li-image">
                            <video tabindex="0" class="videos list-photos lightBox-photo ${classed}" controls width="100" aria-label="Vidéo ${descVideo}" data-id="${item.id}" onplay="audioPlay()">
                              <source src="assets/photographers/${path}/${item.video}" type="video/mp4">
                              <track  kind="subtitles" src="assets/photographers/${path}/desc.vtt" srclang="fr" default/>
                            </video>
                            <audio class="audio" tabindex="-1" src="./assets/photographers/${path}/audio.mp3"></audio>
                            <p class="title-photo ${classed}">${item.title}</p>
                          </li>`;
      }
    });
    displayMedia.innerHTML = `</ul></div>`;
    // Creation of the article
    const article = document.createElement("article");
    article.className = "lightBox";
    article.style.position = "relative";
    article.style.top = "0";
    // Inserting "displaymedia", htmlElements of the lightBox
    article.innerHTML = displayMedia;
    return article;
  }

  return { getMediaCardDOM, getEncartDOM, getLightBoxDOM };
}

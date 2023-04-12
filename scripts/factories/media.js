/**
 * Pattern Factories to create HTMLElements for photographer.html
 * @param {object} data -> {media[all of the photographer] & photographer[0]}
 * @returns getMediaCardDOM->HTMLElement(article)
 */
function mediaFactory(data) {
  console.log("factories/media.js");
  console.log(data);

  /**
   * Function to display Photos and Video
   * @returns HTML Element
   */
  function getMediaCardDOM() {
    console.log("factories/media.js->getMediaCardDOM");
    // Name of the photographer
    const { name } = data.photographer[0];
    const path = name.split(" ")[0];
    const parentArticle = document.querySelector(".photograph-header");
    const theLastArticle = document.querySelector(".list-article");
    // If "article" already exist in DOM, remove it
    if (theLastArticle) {
      parentArticle.removeChild(theLastArticle);
    }
    const article = document.createElement("article");
    article.className = "list-article";
    // article.setAttribute("title", "Ensemble des travaux du photographe");
    for (let i = 0; i < data.media.length; i++) {
      const images = data.media[i].image
        ? `<img tabindex="-1" class="list-photos" data-id="${data.media[i].id}" src="assets/photographers/${path}/${data.media[i].image}" alt="${data.media[i].title}" loading="lazy" title="Cliquez pour agrandir"></img>`
        : `<video tabindex="-1" class="video list-photos" data-id="${data.media[i].id}" aria-label="Vidéo ${data.media[i].title}" title="Cliquez pour lire la vidéo">
                                        <source src="assets/photographers/${path}/${data.media[i].video}" type="video/mp4" >
                                      </video>`;
      const title = data.media[i].video
        ? `<p tabindex="0"><i class="fa-solid fa-video" title="Vidéo"></i> ${data.media[i].title}</p>`
        : `<p tabindex="0">${data.media[i].title}</p>`;
      if (images) {
        // console.log(images);
        article.innerHTML += `<div class="list-photos-photographer">
                                  <a href="#" tabindex="-1">
                                    <button type="button" tabindex="0" class="list-photos-conteneur" aria-label="Cliquer pour zoomer sur la photo ou lire la vidéo">
                                      ${images}
                                    </button>
                                   </a>
                                  <figcaption class="list-photos-description" >
                                    ${title}
                                    <button class="number-likes" tabindex="0" aria-label="Poser un like sur cette image aimé ${data.media[i].likes} fois">${data.media[i].likes}<i data-ref="${data.media[i].id}" class="fa-solid fa-heart icon-likes" title="Ajouter un like" aria-label="like"></i></button>
                                    <p class="sr-only" aria-live="assertive"></p>
                                  </figcaption>
                                </div>`;
      }
    }

    return article;
  }

  /**
   * Function to display the Encart
   * @param {number} numberLikes
   * @param {number} price
   * @returns
   */
  function getEncart(numberLikes, price) {
    const parentEncart = document.querySelector(".photograph-header");
    const theLastEncart = document.querySelector(".encart");
    // If "encart" already exist in DOM, remove it
    if (theLastEncart) {
      parentEncart.removeChild(theLastEncart);
    }

    const article = document.createElement("article");
    article.className = "encart";
    article.innerHTML = `<p class="likes" tabindex="0" title="Nombre total de likes">${numberLikes} <span>&hearts;<span></p>
    <p class="price" tabindex="0" title="Tarif journalier des services du photographe">${price}€/jour</p>`;
    article.innerHTML += `<a href="#begin">Revenir en haut de la page</a>`;
    return article;
  }

  /**
   * Function to display LightBox
   * @param {string} selectPhoto
   * @param {string} name
   * @returns
   */
  function getLightBoxDOM(selectPhoto, name) {
    console.log("factories/media.js->getLightBoxDOM");
    console.log("selectionPhoto" + selectPhoto);
    // Récupération du nom pour le chemin d'accès au fichier
    const path = name[0].split(" ")[0];
    // Récupération de l'index de la photo sélectionnée d'après son id
    const indexPhoto = data
      .map((photo) => photo.id == selectPhoto)
      .indexOf(true);
    console.log(indexPhoto);

    // Envoi de la valeur de l'index de la photo
    getValueIndex(indexPhoto);

    // Déterminer le format du media s'il s'agit pour la photo ou video sélectionner
    const formatPhoto = data
      .filter((photo) => photo.id == selectPhoto)
      .map((format) => format.image);
    const formatVideo = data
      .filter((photo) => photo.id == selectPhoto)
      .map((format) => format.video);

    // Affichage de toutes les images et video
    let displayMedia = `<div class="conteneurLightBox">
                          <button tabindex="0" type="button" class="icon-close" aria-label="Fermer la lightBox" title="Fermer la lightBox" onclick="closeModal('lightBox')">
                            <i class="fa-sharp fa-solid fa-xmark"></i>
                          </button>
                          <button tabindex="0" class="arrow-left" aria-label="Revenir à l'image précédante" title="Précedent">
                          <i class="fa-sharp fa-solid fa-angle-right fa-rotate-180"></i>
                          </button>
                          <button tabindex="0" class="arrow-right" aria-label="Aller à l'image suivante" title="Suivant">
                            <i class="fa-sharp fa-solid fa-angle-right"></i>
                          </button>
                          <ul class="conteneurImages">`;

    // Création du rendu
    data.forEach((item, index) => {
      // Définition d'une classe en fonction de la photo sélectionnée
      const classed = indexPhoto == index ? "show" : "hidden";

      if (item.image) {
        const descImage = item.image.split(".")[0];
        displayMedia += `<li class="li-image" data-index="${index}">
                          <img class="list-photos lightBox-photo ${classed}" data-id="${item.id}" src="assets/photographers/${path}/${item.image}" alt="photo ${descImage}">
                          <p class="title-photo ${classed}">${item.title}</p>
                        </li>`;
      }
      if (item.video) {
        const descVideo = item.video.split(".")[0];
        displayMedia += ` <li class="li-image" data-index="${index}">
                            <video tabindex="0" class="video list-photos lightBox-photo ${classed}" controls width="100" aria-label="Vidéo ${descVideo}" data-id="${item.id}">
                              <source src="assets/photographers/${path}/${item.video}" type="video/mp4">
                            </video>
                            <p class="title-photo ${classed}">${item.title}</p>
                          </li>`;
      }
    });
    displayMedia.innerHTML = `</ul></div>`;

    const article = document.createElement("article");
    article.className = "lightBox";
    article.style.position = "relative";
    article.style.top = "0";
    article.innerHTML = displayMedia;
    return article;
  }

  return { getMediaCardDOM, getEncart, getLightBoxDOM };
}

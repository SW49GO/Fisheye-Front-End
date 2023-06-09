/**
 * Pattern function to create HTMLElements about photographers
 * Called by "displayDataPageIndex", " displayStaticDataPhotographer"
 * @param {object} data
 * @returns getUserCardDOM, getPagePhotographerDOM
 */
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  // console.log("factories/photographer.js");
  // Extracting properties from the data object for photographer using destructuring
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

  /**
   * Function to create HTLM Elements (portraits and name of photographers)
   * Called by "displayDataPageIndex"
   * @returns string (article)
   */
  function getUserCardDOM() {
    // console.log("factories/photographer.js->getUserCardDOM");
    // Creation of HTML elements to represent the Home page user card
    const article = document.createElement("article");
    article.innerHTML = `<a tabindex="0" href="photographer.html?identify=${id}" aria-label="Lien vers la page du photographe ${name}" title="Lien vers la page du photographe ${name}">
                            <img src="${picture}" alt="Portrait du photographe ${name}, lien vers sa page">
                            <h2>${name}</h2>
                        </a>
                        <div class="photographer-description" tabindex="0">
                          <p class="sr-only">Localisation, slogan et tarifs du photographe ${name}</p>
                          <h3>${city}, ${country}</h3> 
                          <p>${tagline}</p>
                          <p>${price}€/jour</p>
                        </div>`;
    return article;
  }

  /**
   * Function to return the HTML page of each Photographer
   * Called by "displayStaticDataPhotographer"
   * @returns HTML Element
   */
  function getPagePhotographerDOM() {
    // console.log("factories/photographer.js->getPagePhotographer");
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    const verif = document.querySelector(".photographer-header-article");
    if (!verif) {
      const article = document.createElement("article");
      article.className = "photographer-header-article";
      article.innerHTML = `<div class="photographer-identity" data-identity="${id}">
                            <div title="Localisation, slogan et tarifs du photographe ${name}" tabindex="0">
                              <p class="sr-only">Localisation, slogan et tarifs du photographe</p>
                              <h2 class="name-photographer">${name}</h2>
                              <h3>${city}, ${country}</h3> 
                              <p>${tagline}</p>
                            </div>
                            <div title="Bouton pour contacter ${name}">
                              <button tabindex="0" type="button" class="contact_button" onclick="displayModal('form','${name}')" aria-pressed="false"  aria-label="Contacter ${name}">Contactez-moi</button>
                            </div>
                            <div class="portrait" title="Portait de ${name}" tabindex="0">
                              <img class="photographer-portrait" src="${picture}" alt="Portrait du photographe ${name}">
                            </div>
                          </div>
                          <div class="select-sort">
                            <p tabindex="0">Trier par </p>
                            <p id="desc-sort" class="sr-only" aria-live="polite">Trier par popularité</p>
                            <div class="dropdown" title="Menu déroulant pour trier les photos">
                              <button class="btn-filter" tabindex="0" aria-haspopup="true" aria-expanded="false" role="button" aria-labelledby="desc-sort"><p class="txt-filter">Popularité</p><span class="chevron-filter"><i class="fa-solid fa-chevron-down"></i></span></button>
                              <ul class="select-menu">
                                <hr aria-hidden="true">
                                <li class="select-menu-item" tabindex="0">Date</li>
                                <hr aria-hidden="true">
                                <li class="select-menu-item" tabindex="0">Titre</li>
                              </ul>
                            </div>
                          </div>`;
      return article;
    }
    return null;
  }

  return { getUserCardDOM, getPagePhotographerDOM };
}

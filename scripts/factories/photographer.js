/**
 * Pattern function to create photo display of photographers
 * @param {object} data
 * @returns string (name, picture) function (getUserCardDom)
 */
function photographerFactory(data) {
  console.log("factories/photographer.js");
  console.log(data);
  // Extraction des propriétés de l'objet data pour photographer à l'aide de la déstructuration
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

  /**
   * Function to create HTLM Elements (portraits and name of photographers)
   * @returns string (article)
   */
  function getUserCardDOM() {
    console.log("factories/photographer.js->getUserCardDOM");
    // Création des éléments HTML pour représenter la carte utilisateur page Accueil
    const article = document.createElement("article");
    article.setAttribute(
      "aria-label",
      "Carte d'identité du photographe " + name
    );
    article.innerHTML = `<a href="photographer.html?identify=${id}" aria-label="Lien vers la page du photographe ${name}">
                            <img src="${picture}" alt="Portrait du photographe ${name}, lien vers sa page">
                            <h2>${name}</h2>
                        </a>
                        <div class="photographer-description" aria-label="Localisation, slogan et tarifs du photographe ${name}" tabindex="0">
                          <h3>${city}, ${country}</h3> 
                          <p>${tagline}</p>
                          <p>${price}€/jour</p>
                        </div>`;
    return article;
  }
  /**
   * Function to return the HTML page of each Photographer
   * @returns HTMLElement(article)
   */
  function getPagePhotographerDOM() {
    const { name, id, city, country, tagline, price, portrait } =
      data.photographer;
    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;
    console.log(data);
    console.log("factories/photographer.js->getPagePhotographerDOM");
    const verif = document.querySelector(".photographer-header-article");
    console.log(verif);
    if (!verif) {
      const article = document.createElement("article");
      article.className = "photographer-header-article";
      article.innerHTML = `<div class="photographer-identity" data-identity="${id}">
                          <div  aria-label="Localisation, slogan et tarifs du photographe ${name}" tabindex="0">
                            <h2 class="name-photographer">${name}</h2>
                            <h3>${city}, ${country}</h3> 
                            <p>${tagline}</p>
                          </div>
                          <div aria-label="Bouton pour contacter ${name}">
                            <button class="contact_button" onclick="displayModal('form')" aria-pressed="false">Contactez-moi</button>
                          </div>
                          <div aria-label="Portait de ${name}" tabindex="0">
                            <img class="photographer-portrait" src="${picture}" alt="Portrait du photographe ${name}">
                          </div>
                        </div>
                        <div class="select-sort">
                          <p tabindex="0">Trier par </p>
                          <div class="dropdown">
                            <button class="btn-filter" tabindex="0" aria-haspopup="true" aria-pressed="false" role="dropdown">
                              <p class="txt-filter" >Popularité</p>
                              <span class="chevron-filter">
                                <i class="fa-solid fa-chevron-down"></i>
                                  </span>
                            </button>
                            <ul class="select-menu">
                              <hr aria-hidden="true">
                              <li class="select-menu-item" tabindex="0">Date</li>
                              <hr aria-hidden="true">
                              <li class="select-menu-item" tabindex="0">Titre</li>
                            </ul>
                          </div>
                        </div>
                        <div class="encart">
                          <p class="likes" tabindex="0"><span>&hearts;<span></p>
                          <p class="price" tabindex="0">${price}€/jour</p>
                        </div>
                    `;
      return article;
    }
    return null;
  }

  return { getUserCardDOM, getPagePhotographerDOM };
}

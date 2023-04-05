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
    // Création des éléments HTML pour représenter la carte utilisateur
    const article = document.createElement("article");
    article.setAttribute(
      "aria-label",
      "Carte d'identité du photographe " + name
    );
    article.innerHTML = `<a href="photographer.html?identify=${id}" aria-label="Lien vers la page du photographe ${name}">
                            <img src="${picture}" alt="Portrait du photographe ${name}, lien vers sa page">
                            <h2>${name}</h2>
                        </a>
                        <div class="photographer-description" aria-label="Localisation, slogan et tarifs du photographe ${name}">
                          <h3>${city}, ${country}</h3> 
                          <p>${tagline}</p>
                          <p>${price}€/jour</p>
                        </div>`;
    return article;
  }
  return { name, picture, getUserCardDOM };
}

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
   * Function to create HTLM Element (portraits and name of photographers)
   * @returns string (article)
   */
  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}

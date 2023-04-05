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
 * Function to display portraits of photographers
 * @param {array of objects} photographers
 */
async function displayDataPhotographer(photographers) {
  console.log(photographers);
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Initialization all functions :
 * - displayDataPhotographer() : to display portraits of photographers
 */
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getJsonDataPhotographers();
  displayDataPhotographer(photographers);
}

init();

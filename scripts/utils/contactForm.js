const modal = document.getElementById("contact_modal");
const divModal = document.querySelector(".modal");
const header = document.getElementsByTagName("header")[0];
const main = document.getElementById("main");

/**
 * Function to display the Contact Modal
 */
function displayModal() {
  modal.style.display = "block";
  main.style.opacity = 0.5;
  header.style.opacity = 0.5;
  document.querySelector(".modal-header-title").focus();
}

/**
 * Function to close Contact Modal
 */
function closeModal() {
  modal.style.display = "none";
  main.style.opacity = 1;
  header.style.opacity = 1;
  document.querySelector(".contact_button").focus();
}

/**
 * Function to show photographer name un Contact Modal
 * @param {string} photographerName
 */
function displayPhotographerName(photographerName) {
  console.log("utils/contactFormjs");
  const namePhotographer = document.querySelector(".modal-header-title");
  console.log(namePhotographer);
  namePhotographer.innerHTML += `<br> ${photographerName}`;
}

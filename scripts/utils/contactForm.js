const modal = document.getElementById("contact_modal");
const divModal = document.querySelector(".modal");
const header = document.getElementsByTagName("header")[0];
const main = document.getElementById("main");

/**
 * Function to display the Contact Modal
 */
function displayModal(option) {
  modal.style.display = "block";
  divModal.style.display = "block";
  main.style.opacity = 0.5;
  header.style.opacity = 0.5;
  document.querySelector(".modal-header-title").focus();
  if (option === "lightBox") {
    modal.style.borderRadius = "none";
    modal.style.position = "fixed";
    divModal.style.display = "none";
    modal.style.border = ".125rem solid #95FFF9";
    const conteneurLightBox = modal.querySelector(".lightBox");
    // modal.querySelector(".icon-close").focus();

    console.log(conteneurLightBox);
    // If the lightBox is already present, remove it
    if (conteneurLightBox) {
      modal.removeChild(conteneurLightBox);
    }
  }
  if (option === "form") {
    // Check the status of the "position" style of #contact_modal
    if (getComputedStyle(modal).getPropertyValue("position") !== "absolute") {
      modal.style.position = "absolute";
    }
    modal.style.border = "none";
    const conteneurLightBox = modal.querySelector(".lightBox");
    // If the lightBox is already present, remove it
    if (conteneurLightBox) {
      modal.removeChild(conteneurLightBox);
    }
  }
}

/**
 * Function to close Contact Modal
 */
function closeModal() {
  modal.style.display = "none";
  main.style.opacity = 1;
  header.style.opacity = 1;
  // document.querySelector(".contact_button").focus();
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

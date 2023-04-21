// DOM HTML elements
const modal = document.getElementById("contact_modal");
const divModal = document.querySelector(".modal");
const header = document.getElementsByTagName("header")[0];
const main = document.getElementById("main");
const closeByEnterModal = modal.querySelector(".modal-close");

/**
 * Function to display the Contact Modal
 * Called in HTML contruct from "getPagePhotographerDOM" -> onclick="displayModal('form','${name}')"
 * Called in "photographer.js" -> displayModal("lightBox");
 * @param {string} whichModal -> which modal open "lightBox" or "form"
 * @param {string} nameArtist -> use for contact modal, name of the photographer send by factories\getPagePhotographerDOM()
 */
// eslint-disable-next-line no-unused-vars
function displayModal(whichModal, nameArtist) {
  // eslint-disable-next-line no-undef
  modal.style.display = "block";
  divModal.style.display = "block";
  main.style.opacity = 0.5;
  // aria-hidden to not show for AT
  main.setAttribute("aria-hidden", "true");
  header.style.opacity = 0.5;
  header.setAttribute("aria-hidden", "true");

  // Focus on the first element when contact modal open
  document.querySelector(".modal-header-title").focus();

  if (whichModal === "lightBox") {
    modal.style.borderRadius = "none";
    modal.style.position = "fixed";
    divModal.style.display = "none";
    modal.style.border = ".125rem solid #95FFF9";
    modal.style.width = "60%";

    const conteneurLightBox = modal.querySelector(".lightBox");
    // If the lightBox is already present, remove it
    if (conteneurLightBox) {
      modal.removeChild(conteneurLightBox);
    }
  }
  if (whichModal === "form") {
    // Check the status of the "position" style of #contact_modal
    if (getComputedStyle(modal).getPropertyValue("position") !== "absolute") {
      modal.style.position = "absolute";
    }
    // Insert the name of photographer
    displayPhotographerName(nameArtist);

    modal.style.border = "none";
    modal.style.width = "auto";
    const conteneurLightBox = modal.querySelector(".lightBox");
    // If the lightBox is already present, remove it
    if (conteneurLightBox) {
      modal.removeChild(conteneurLightBox);
    }
  }
}

/**
 *  Function to close Contact Modal
 * Called and construct from "getLightBoxDOM" ->in HTML -> onclick="closeModal('lightBox')"
 * Called from "photographer.js" -> closeModal("form")
 * Called from "addEventListener "keydown" on .close-modal -> closeModal("form")
 * @param {string} whichModal  which modal close "lightBox" or "form"
 * @param {string} idPhotoSelected id of the photo selected
 */
function closeModal(whichModal, idPhotoSelected) {
  const focusContactClose = document.querySelector(".portrait");
  const focusLightBoxClose = document.querySelector(".photograph-header");
  const conteneurLightBox = modal.querySelector(".lightBox");
  const allMedia = focusLightBoxClose.querySelectorAll(".list-photos");

  modal.style.display = "none";
  main.style.opacity = 1;
  // aria-hidden to show for AT
  main.setAttribute("aria-hidden", "false");
  header.style.opacity = 1;
  header.setAttribute("aria-hidden", "false");

  // Remove the lightBox in the DOM
  // If the lightBox is already present, remove it
  if (conteneurLightBox) {
    modal.removeChild(conteneurLightBox);
  }

  // Focus after modal contact closed on the next element
  if (whichModal != null) {
    if (whichModal === "form") {
      focusContactClose.focus();
    }
  }
  // Focus after lightBox closed on the photo that be selected before (when use focus in document)
  if (whichModal === "lightBox" && idPhotoSelected) {
    let indexP;
    allMedia.forEach((element, index) => {
      if (element.dataset.id == idPhotoSelected) {
        indexP = index;
      }
    });
    focusLightBoxClose
      .querySelector(".list-article")
      .querySelectorAll(".list-photos")
      [indexP].focus();
  }
}

/**
 * Manage Even Listener "Enter" on modal contact
 */
if (closeByEnterModal != null) {
  closeByEnterModal.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      closeModal("form");
    }
  });
}
/**
 * Function to show photographer name un Contact Modal
 * "name" send to displayModal("form","name") from factories\getPagePhotographerDOM()
 * Called by "displayModal"
 * @param {string} photographerName
 */
function displayPhotographerName(photographerName) {
  const namePhotographer = document.querySelector(".modal-header-title");
  const conteneurName = namePhotographer.querySelector(".namePhotographer");
  // If already exist remove it
  if (conteneurName) {
    namePhotographer.removeChild(conteneurName);
  }
  // Insert HTMLElement
  namePhotographer.innerHTML += `<p class="namePhotographer">${photographerName}</p>`;
}

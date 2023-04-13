// DOM HTML elements declare
const modal = document.getElementById("contact_modal");
const divModal = document.querySelector(".modal");
const header = document.getElementsByTagName("header")[0];
const main = document.getElementById("main");

/**
 * Function to display the Contact Modal
 */
// eslint-disable-next-line no-unused-vars
function displayModal(option, name) {
  // eslint-disable-next-line no-undef
  modal.style.display = "block";
  divModal.style.display = "block";
  main.style.opacity = 0.5;
  main.setAttribute("aria-hidden", "true");
  header.style.opacity = 0.5;
  header.setAttribute("aria-hidden", "true");

  document.querySelector(".modal-header-title").focus();
  if (option === "lightBox") {
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
  if (option === "form") {
    // Check the status of the "position" style of #contact_modal
    if (getComputedStyle(modal).getPropertyValue("position") !== "absolute") {
      modal.style.position = "absolute";
    }
    displayPhotographerName(name);
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
 * Function to close Contact Modal
 */
function closeModal(option, photoSelected) {
  console.log("contactForm", photoSelected);
  const focusContactClose = document.getElementById("begin");
  const focusLightBoxClose = document.querySelector(".photograph-header");
  modal.style.display = "none";
  main.style.opacity = 1;
  main.setAttribute("aria-hidden", "false");
  header.style.opacity = 1;
  header.setAttribute("aria-hidden", "false");

  if (option != null) {
    // Focus after modal form closed
    if (option === "form") {
      console.log("form close");
      focusContactClose.focus();
    }
  }
  if (option === "lightBox" && photoSelected !== "mouseClose") {
    console.log("lightBox close");
    // // Focus after lightBox closed on photo that be selected
    const allMedia = focusLightBoxClose.querySelectorAll(".list-photos");
    let indexP;
    allMedia.forEach((element, index) => {
      if (element.dataset.id == photoSelected) {
        indexP = index;
      }
    });
    console.log(indexP);
    focusLightBoxClose
      .querySelector(".list-article")
      .querySelectorAll(".list-photos")
      [indexP].focus();
  }
}
// Manage Even Listener "Enter" on modal contact
// eslint-disable-next-line no-undef
const closeByEnterModal = modal.querySelector(".modal-close");
if (closeByEnterModal != null) {
  closeByEnterModal.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      console.log("ENtrER");
      closeModal("form");
    }
  });
}
/**
 * Function to show photographer name un Contact Modal
 * @param {string} photographerName
 */
function displayPhotographerName(photographerName) {
  console.log("utils/contactFormjs");
  const namePhotographer = document.querySelector(".modal-header-title");
  const conteneurName = namePhotographer.querySelector(".namePhotographer");
  console.log(namePhotographer);
  if (conteneurName) {
    namePhotographer.removeChild(conteneurName);
  }
  namePhotographer.innerHTML += `<p class="namePhotographer">${photographerName}</p>`;
}

// ID of the photographer
// Initialized from "getUserCardDom" in the link "photographer.html?identify=${id}"
const urlParams = new URLSearchParams(window.location.search);
const idPhotographer = urlParams.get("identify");

/**
 * Function to display chevrons & appear the 2 list of the menu
 * Called from "displayStaticPotographerData" on eventListener of the contact button
 * @param {string} btnFilter HTML
 */
// eslint-disable-next-line no-unused-vars
function displayMenuFilter(btnFilter) {
  // DOM Element create in factories\getPagePhotographerDOM -> ul
  const selectedMenuFilter = document.querySelector(".select-menu");

  selectedMenuFilter.classList.toggle("show");
  // When the menu is expanded, set aria-expanded to true
  btnFilter.setAttribute("aria-expanded", "true");
  // DOM element to change the display of the chevron
  const chevronFilter = btnFilter.querySelector(".chevron-filter");

  // Element DOM text of the filter button
  const txtFilter = btnFilter.querySelector(".txt-filter");

  if (txtFilter.textContent === "") {
    chevronFilter.innerHTML = selectedMenuFilter.classList.contains("show")
      ? '<i class="fa-solid fa-chevron-down"></i>'
      : '<i class="fa-solid  fa-angle-up"></i>';
  } else {
    chevronFilter.innerHTML = selectedMenuFilter.classList.contains("show")
      ? '<i class="fa-solid fa-angle-up"></i>'
      : '<i class="fa-solid fa-chevron-down"></i>';
  }
}

/**
 * Function to select submenu->li
 * Called from index/displayStaticDataPhotographer on eventListener "select-menu-item"->li
 * @param {string} selectMenuFilter HTML
 * @param {string} btnFilter HTML
 */
// eslint-disable-next-line no-unused-vars
function selectFilter(selectMenuFilter, btnFilter) {
  // DOM Element to change the text for AT
  const txtSrOnly = document
    .querySelector(".photograph-header")
    .querySelectorAll(".sr-only")[1];

  // Change chevron and text AT
  const chevronFilter = btnFilter.querySelector(".chevron-filter");
  chevronFilter.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
  const button = btnFilter.childNodes[0];
  const buttonTxt = button.textContent;
  const choiceName = selectMenuFilter.textContent;

  // Reversing menuItems names and change aria-expanded of the btn-filter
  button.textContent = choiceName;
  selectMenuFilter.textContent = buttonTxt;
  btnFilter.setAttribute("aria-expanded", "false");

  // Switch on the textContent of the button (choiceName)
  // to change the text for AT
  // and send the selected choice to displayMedia
  let select;
  switch (choiceName) {
    case "Popularité":
      select = "1";
      txtSrOnly.textContent = "Photos trier par Popularité";
      break;
    case "Date":
      select = "2";
      txtSrOnly.textContent = "Photos trier par Date";
      break;
    case "Titre":
      select = "3";
      txtSrOnly.textContent = "Photos trier par Titre";
      break;
  }
  // Method .then to attach a promise manager, when the promise resolved with success
  // and using destructuring to extract resolved data "media", "photographers"
  // and then can send the data to "displayMedia"
  // eslint-disable-next-line no-undef
  getJsonDataPhotographers().then(({ media, photographers }) => {
    // eslint-disable-next-line no-undef
    displayMedia(media, photographers, idPhotographer, select);
  });
}

/**
 * Function Management Likes
 * Called by index/displayMedia on eventListener all "number-likes"
 * Array to stock id of the media, inialized empty in index/displayMedia
 * @param {string} numberLikes HTML
 * @param {array} tabRef
 */

// eslint-disable-next-line no-unused-vars
function likeNumberChange(numberLikes, tabRef) {
  // DOM Element the encart
  const encart = document.querySelector(".likes");
  // Text inside the numberLikes
  let photoLike = parseInt(numberLikes.textContent);
  // Retrieve data-ref -> id of the media
  const refLike = numberLikes.childNodes[1].dataset.ref;
  let totalLikesEncart = parseInt(encart.textContent);

  if (tabRef.includes(refLike)) {
    // If the user has already liked
    const index = tabRef.indexOf(refLike);
    // Removing the id from index
    tabRef.splice(index, 1);
    totalLikesEncart--;
    photoLike--;
  } else {
    // If the user has not yet liked, insert id in the array
    tabRef.push(refLike);
    totalLikesEncart++;
    photoLike++;
  }
  // Inserting new data into the DOM "encart" and "numberLikes"
  encart.innerHTML = `${totalLikesEncart}<i class="fa-solid fa-heart"></i>`;
  numberLikes.innerHTML = `${photoLike}<i data-ref="${refLike}" class="fa-solid fa-heart icon-likes"></i>`;
  // New value of number like, read again by AT -> aria-lve="polite"
  numberLikes.parentNode.querySelector(".sr-only").textContent = photoLike;
}

/**
 * Function to display the LightBox when user select a photo
 * Called from index/displayMedia by eventListener on "list-photos"
 * @param {object} photo HTML
 */
// eslint-disable-next-line no-unused-vars
function selectPhotoLightBox(photo) {
  // Retrieve id of the photo by the dataset
  const idPhoto = photo.dataset.id;

  // Method .then to attach event on promise, when it's the promise resolve with success
  // and using destructuring to extract resolved data "media", "photographers"
  // and then can send datas to displayLightBox
  // eslint-disable-next-line no-undef
  getJsonDataPhotographers().then(({ media, photographers }) => {
    // eslint-disable-next-line no-undef
    displayLightBox(media, photographers, idPhoto, idPhotographer);
  });
  // eslint-disable-next-line no-undef
  displayModal("lightBox");
}

// Variable to be initialize from "getValueIndex", and become a counter for "goToPreviousPhoto" and "goToNextPhoto"
let indexP;
/**
 * Function to initialize "indexP" that is the index of the photo selected for the first time
 * Called by media/getLightBoxDOM
 * @param {string} indexPhoto
 * @returns
 */
// eslint-disable-next-line no-unused-vars
function getValueIndex(indexPhoto) {
  indexP = parseInt(indexPhoto);
  return indexP;
}

/**
 * Function to show the next photo
 * @param {string} nbMedias -> number of all medias
 */
// eslint-disable-next-line no-unused-vars
function goToPreviousPhoto(nbMedias) {
  // The photo selected change -> show to hidden
  const liImage = document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image");
  if (liImage[indexP]) {
    document
      .getElementById("contact_modal")
      .querySelectorAll(".li-image")
      [indexP].querySelector(".lightBox-photo")
      .classList.toggle("hidden");
    document
      .getElementById("contact_modal")
      .querySelectorAll(".li-image")
      [indexP].querySelector(".title-photo")
      .classList.toggle("hidden");

    indexP--;
    // Assign a positive value to "indexPhoto", if "indexPhoto" is negative
    indexP = ((indexP % nbMedias.length) + nbMedias.length) % nbMedias.length;

    // The photo selected change -> hidden to show after indexP decrement
    document
      .getElementById("contact_modal")
      .querySelectorAll(".li-image")
      [indexP].querySelector(".lightBox-photo")
      .classList.toggle("hidden");
    document
      .getElementById("contact_modal")
      .querySelectorAll(".li-image")
      [indexP].querySelector(".title-photo")
      .classList.toggle("hidden");
  }
}

/**
 * Function to go to the preview photo
 * @param {string} nbMedias -> number of all medias
 */
// eslint-disable-next-line no-unused-vars
function goToNextPhoto(nbMedias) {
  const liImage = document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image");
  if (liImage[indexP]) {
    // The photo selected change -> show to hidden
    document
      .getElementById("contact_modal")
      .querySelectorAll(".li-image")
      [indexP].querySelector(".lightBox-photo")
      .classList.toggle("hidden");

    document
      .getElementById("contact_modal")
      .querySelectorAll(".li-image")
      [indexP].querySelector(".title-photo")
      .classList.toggle("hidden");

    indexP++;
    // Assign a positive value to "indexPhoto", if "indexPhoto" is negative
    indexP = ((indexP % nbMedias.length) + nbMedias.length) % nbMedias.length;

    // The photo selected change -> hidden to show after indexP increment
    document
      .getElementById("contact_modal")
      .querySelectorAll(".li-image")
      [indexP].querySelector(".lightBox-photo")
      .classList.toggle("hidden");
    document
      .getElementById("contact_modal")
      .querySelectorAll(".li-image")
      [indexP].querySelector(".title-photo")
      .classList.toggle("hidden");
  }
}

// Element DOM
const contactModal = document.getElementById("contact_modal");

/**
 * Function to identify in a modal the number of nodes
 * to initialize number of element focusable for eventListener on document
 * when a modal is display "block" on photographer.html
 * @returns number of nodes
 */
function getChildNodesModal() {
  return contactModal.childNodes;
}

/**
 * AddEventListener when on photographer.html page
 */
if (window.location.href.includes("photographer.html")) {
  document.addEventListener("keydown", function (event) {
    // Verify if in the list of style modal a property display have value block on page
    if (getComputedStyle(contactModal).getPropertyValue("display") !== "none") {
      const isTabPressed = event.key === "Tab" || event.key === 9;
      const isArrowPressed =
        event.key === "ArrowRight" ||
        event.key === 39 ||
        event.key === "ArrowLeft";
      // If a keydown is "ArrowRight" or "ArrowLeft" send "event" to the function "navigateWithArrows" in modal
      if (isArrowPressed) {
        navigateWithArrows(event);
      }
      // if tab not pressed go out
      if (!isTabPressed) {
        return;
      }
      // Number of Nodes when Tab is pressed
      const focusableElementsCount = getChildNodesModal().length;
      let focusableElementsSelector;
      // Nodes focusables : Contact Form & LightBox without Video
      if (focusableElementsCount === 3) {
        // Elements that can be focusable
        focusableElementsSelector =
          'button,input,textarea,[tabindex]:not([tabindex="-1"])';
      }
      // Nodes focusables : LightBox with Video
      else if (focusableElementsCount === 4) {
        focusableElementsSelector = '[tabindex="0"]:not(h1,img,.hidden)';
      }
      // First focusable Element from the list of node
      const firstFocusableElement = contactModal.querySelectorAll(
        focusableElementsSelector
      )[0];
      // NodeList of all elements
      const focusableContent = contactModal.querySelectorAll(
        focusableElementsSelector
      );
      // Last focusable Element
      const lastFocusableElement =
        focusableContent[focusableContent.length - 1];

      // Send "event" and "first - last" Focusable elements
      navigateFocusableElements(
        event,
        firstFocusableElement,
        lastFocusableElement
      );
    } else {
      // When modal is display none, navigate with keyboard arrows on photographer page
      navigateWithArrows(event);
    }
  });
  // The first focusable element of each modal
  const firstFocusableElement =
    contactModal.querySelectorAll('[tabindex="0"]')[0];
  // Focus on first element
  if (firstFocusableElement) {
    firstFocusableElement.focus();
  }
}

/**
 * Function to get focus on the elements
 * with TAB
 * @param {object} event
 * @param {object} firstFocusableElement
 * @param {object} lastFocusableElement
 */
function navigateFocusableElements(
  event,
  firstFocusableElement,
  lastFocusableElement
) {
  // if shift + tab pressed
  if (event.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      // add focus for the last focusable element
      lastFocusableElement.focus();
      // Prevent the default behavior of Tab, scrolling down in the page
      event.preventDefault();
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === lastFocusableElement) {
      // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus();
      event.preventDefault();
    }
  }
}

// Variable to increment or decrement focus for all page photographer
let focusIndex = -1;
/**
 * Function to navigate on photographer page with keyboard arrows
 * @param {object} event
 */
function navigateWithArrows(event) {
  let focusableElements;
  if (getComputedStyle(contactModal).getPropertyValue("display") === "none") {
    // Navigation on photographer page with keyboard arrows
    const bodyElementPhotographer = document.getElementsByTagName("body")[0];
    // Creating array of HTML Element which fulfills the condition
    focusableElements = Array.from(
      bodyElementPhotographer.querySelectorAll(
        '[tabindex="0"]:not(#contact_modal [tabindex="0"])'
      )
    );
  } else {
    focusableElements = Array.from(
      contactModal.querySelectorAll(
        'button,input,textarea,[tabindex]:not([tabindex="-1"])'
      )
    );
  }
  const liImage = document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image");

  if (liImage.length === 0) {
    if (event.key === "ArrowRight" || event.key === 39) {
      focusIndex++;
      focusIndex =
        ((focusIndex % focusableElements.length) + focusableElements.length) %
        focusableElements.length;
      focusableElements[focusIndex].focus();
    }
    if (event.key === "ArrowLeft" || event.key === 37) {
      focusIndex--;
      focusIndex =
        ((focusIndex % focusableElements.length) + focusableElements.length) %
        focusableElements.length;
      focusableElements[focusIndex].focus();
    }
  }
}

/**
 * Console.log of form submission
 */
const form = document.querySelector(".modal-form");
if (form != null) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log(
      "Informations du formulaire de Contact :" +
        "\nVotre prénom : " +
        event.target.firstname.value +
        "\nVotre nom : " +
        event.target.lastname.value +
        "\nVotre adresse Email : " +
        event.target.email.value +
        "\nVotre message : " +
        event.target.message.value
    );
    // option "form" send to closeModal
    // eslint-disable-next-line no-undef
    closeModal("form");
  });
}

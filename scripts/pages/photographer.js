// ID of the photographer
const urlParams = new URLSearchParams(window.location.search);
const idPhotographer = urlParams.get("identify");

/**
 * Function to display chevrons & appear menu
 * @param {string} btnFilter HTML
 */
// eslint-disable-next-line no-unused-vars
function displayMenuFilter(btnFilter) {
  console.log("entrer dans le button");

  // console.log('photographer.js/ ->btnSord addEventlistener');
  const selectedMenuFilter = document.querySelector(".select-menu");
  // console.log(selectedMenuFilter.classList);
  selectedMenuFilter.classList.toggle("show");

  const chevronFilter = btnFilter.querySelector(".chevron-filter");
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
 * Function to select menu
 * @param {string} selectMenuFilter HTML
 * @param {string} btnFilter HTML
 */
// eslint-disable-next-line no-unused-vars
function selectFilter(selectMenuFilter, btnFilter) {
  // console.log(btnFilter);
  // console.log(selectMenuFilter);
  // console.log("entrer selection menu");
  // Positioning of arrows
  const txtSrOnly = document
    .querySelector(".photograph-header")
    .querySelectorAll(".sr-only")[0];

  console.log("txtSrOnly:", txtSrOnly);

  const chevronFilter = btnFilter.querySelector(".chevron-filter");
  chevronFilter.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
  const button = btnFilter.childNodes[0];
  console.log(button);
  const buttonTxt = button.textContent;
  const choiceName = selectMenuFilter.textContent;

  // Reversing menuItems names and change aria-expanded of the btn-filter
  button.textContent = choiceName;
  selectMenuFilter.textContent = buttonTxt;

  console.log(choiceName);
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
  console.log(select);
  // eslint-disable-next-line no-undef
  getJsonDataPhotographers().then(({ media, photographers }) => {
    // eslint-disable-next-line no-undef
    displayMedia(media, photographers, idPhotographer, select);
  });
}

/**
 * Function Management Likes
 * @param {string} numberLikes HTML
 * @param {array} tabRef
 */

// eslint-disable-next-line no-unused-vars
function likeNumberChange(numberLikes, tabRef) {
  const encart = document.querySelector(".likes");
  let photoLike = parseInt(numberLikes.textContent);
  console.log(photoLike);
  const refLike = numberLikes.childNodes[1].dataset.ref;
  let totalLikesEncart = parseInt(encart.textContent);
  console.log(totalLikesEncart);

  if (tabRef.includes(refLike)) {
    // If the user has already liked
    const index = tabRef.indexOf(refLike);
    tabRef.splice(index, 1);
    totalLikesEncart--;
    photoLike--;
  } else {
    // If the user has not yet liked
    tabRef.push(refLike);
    totalLikesEncart++;
    photoLike++;
  }
  // Inserting new data into the DOM
  encart.innerHTML = `${totalLikesEncart}<i class="fa-solid fa-heart"></i>`;
  numberLikes.innerHTML = `${photoLike}<i data-ref="${refLike}" class="fa-solid fa-heart icon-likes"></i>`;
  // Read again number of like
  numberLikes.parentNode.querySelector(".sr-only").textContent = photoLike;
}

/**
 * Function to display the LightBox when user select a photo
 * @param {*} photo
 */
// eslint-disable-next-line no-unused-vars
function selectPhotoLightBox(photo) {
  // console.log(photo);
  const idPhoto = photo.dataset.id;
  // console.log(idPhoto);
  // eslint-disable-next-line no-undef
  getJsonDataPhotographers().then(({ media, photographers }) => {
    // eslint-disable-next-line no-undef
    displayLightBox(media, photographers, idPhoto, idPhotographer);
  });
  // eslint-disable-next-line no-undef
  displayModal("lightBox");
}

/**
 * Function to initialize "indexP" that is the index of the photo selected
 * get from media.js
 * @param {string} indexPhoto
 * @returns
 */
// eslint-disable-next-line no-unused-vars
function getValueIndex(indexPhoto) {
  console.log(indexPhoto);
  indexP = parseInt(indexPhoto);
  return indexP;
}
// Variable indexPhoto
let indexP;

/**
 * Function to show the next photo
 * @param {string} nbMedias -> number of all medis
 */
// eslint-disable-next-line no-unused-vars
function goToPreviousPhoto(nbMedias) {
  // The photo selected change show to hidden
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

    // console.log(nbMedias.length);
    console.log("left");
    indexP--;
    // Affecte une valeur positif à "indexPhoto", si "indexPhoto" est négatif
    indexP = ((indexP % nbMedias.length) + nbMedias.length) % nbMedias.length;

    // The photo selected change hidden to show
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
 * @param {} nbMedias
 */
// eslint-disable-next-line no-unused-vars
function goToNextPhoto(nbMedias) {
  const liImage = document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image");
  if (liImage[indexP]) {
    // Effacement de l'image et son titre en cours
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

    console.log("right");
    indexP++;
    // Affecte une valeur positif à "indexPhoto", si "indexPhoto" est négatif
    indexP = ((indexP % nbMedias.length) + nbMedias.length) % nbMedias.length;

    // Apparition de la prochain photo et son titre
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
 * Function to identify in the modal the number of nodes
 * @returns number of nodes
 */
function getChildNodesModal() {
  return contactModal.childNodes;
}

if (window.location.href.includes("photographer.html")) {
  document.addEventListener("keydown", function (event) {
    // Verify if the modal is display block on page
    if (getComputedStyle(contactModal).getPropertyValue("display") !== "none") {
      const isTabPressed = event.key === "Tab" || event.key === 9;
      const isArrowPressed =
        event.key === "ArrowRight" ||
        event.key === 39 ||
        event.key === "ArrowLeft";
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

  if (firstFocusableElement) {
    firstFocusableElement.focus();
  }
}

/**
 * Function to get focus on the elements
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
  console.log(event);
  let focusableElements;
  if (getComputedStyle(contactModal).getPropertyValue("display") === "none") {
    // Navigation on photographer page with keyboard arrows
    const bodyElementPhotographer = document.getElementsByTagName("body")[0];
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
  console.log(liImage.length);
  if (liImage.length === 0) {
    if (event.key === "ArrowRight" || event.key === 39) {
      console.log("arrowRight");
      focusIndex++;
      focusIndex =
        ((focusIndex % focusableElements.length) + focusableElements.length) %
        focusableElements.length;
      focusableElements[focusIndex].focus();
    }
    if (event.key === "ArrowLeft" || event.key === 37) {
      console.log("arrowLeft");

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
      "Votre prénom : " +
        event.target.firstname.value +
        "\nVotre nom : " +
        event.target.lastname.value +
        "\nVotre adresse Email : " +
        event.target.email.value +
        "\nVotre message : " +
        event.target.message.value
    );

    // eslint-disable-next-line no-undef
    closeModal("form");
  });
}

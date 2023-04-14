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
  const chevronFilter = btnFilter.querySelector(".chevron-filter");
  chevronFilter.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
  const button = btnFilter.childNodes[0];
  console.log(button);
  const buttonTxt = button.textContent;
  const choiceName = selectMenuFilter.textContent;

  // Reversing menuItems names
  button.textContent = choiceName;
  selectMenuFilter.textContent = buttonTxt;

  console.log(choiceName);
  let select;
  switch (choiceName) {
    case "Popularité":
      select = "1";
      break;
    case "Date":
      select = "2";
      break;
    case "Titre":
      select = "3";
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
 * Function to initialize "i" that is the index of the photo selected
 * @param {string} indexPhoto
 * @returns
 */
// eslint-disable-next-line no-unused-vars
function getValueIndex(indexPhoto) {
  console.log(indexPhoto);
  i = parseInt(indexPhoto);
  return i;
}
// Variable i=indexPhoto
let i;
console.log(i);

/**
 * Function to show the next photo
 * @param {string} nbMedias -> number of all medis
 */
// eslint-disable-next-line no-unused-vars
function goToPreviousPhoto(nbMedias) {
  // The photo selected change show to hidden
  console.log("previous", "position", i);
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".title-photo")
    .classList.toggle("hidden");
  // document
  //   .getElementById("contact_modal")
  //   .querySelectorAll(".li-image")
  //   [i].querySelector(".lightBox-photo")
  //   .setAttribute("tabindex", "-1");

  // console.log(nbMedias.length);
  console.log("left");
  i--;
  // Affecte une valeur positif à "i", si "i" est négatif
  i = ((i % nbMedias.length) + nbMedias.length) % nbMedias.length;

  // The photo selected change hidden to show and tabindex to 0
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");
  // document
  //   .getElementById("contact_modal")
  //   .querySelectorAll(".li-image")
  //   [i].querySelector(".lightBox-photo")
  //   .setAttribute("tabindex", "0");
  // console.log(
  //   document.getElementById("contact_modal").querySelectorAll(".li-image")[i]
  // );
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".title-photo")
    .classList.toggle("hidden");
}

/**
 * Function to go to the preview photo
 * @param {} nbMedias
 */
// eslint-disable-next-line no-unused-vars
function goToNextPhoto(nbMedias) {
  console.log("next", "position", i);
  // Effacement de l'image et son titre en cours
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");

  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".title-photo")
    .classList.toggle("hidden");

  console.log("right");
  i++;
  // Affecte une valeur positif à "i", si "i" est négatif
  i = ((i % nbMedias.length) + nbMedias.length) % nbMedias.length;

  // Apparition de la prochain photo et son titre
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");

  // console.log(
  //   document.getElementById("contact_modal").querySelectorAll(".li-image")[i]
  // );
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".title-photo")
    .classList.toggle("hidden");
}

/**
 * Even Listener on Modal to get the focus on the Elements
 * Even Listener on window to move with keyborad
 */
const modalContact = document.getElementById("contact_modal");
/**
 * Function to have the nodeList of the modal LightBox
 * @returns NodeList
 */
function getChildNodesModal() {
  return modalContact.childNodes;
}

if (window.location.href.includes("photographer.html")) {
  // Initialize "i" to incement the focusable element of the page
  let i = 0;
  document.addEventListener("keydown", function (e) {
    // If the modal appear on the document
    if (getComputedStyle(modalContact).getPropertyValue("display") !== "none") {
      // console.log(e);
      let isTabPressed = e.key === "Tab" || e.key === 9;
      // console.log("TAB");
      const numberChildNodes = getChildNodesModal();

      if (!isTabPressed) {
        return;
      }
      let focusableElements = "";
      console.log(modalContact.childNodes[2]);
      // Elements focusable on modal Contact ->3
      if (numberChildNodes.length === 3) {
        focusableElements =
          'button,input,textarea,[tabindex]:not([tabindex="-1"])';
      } else if (numberChildNodes.length === 4) {
        // Elements focusable on modal LightBox ->4 max with video
        focusableElements = '[tabindex="0"]:not(h1,img,.hidden)';
      }
      // The first element to be focused inside modal
      const firstFocusableElement =
        modalContact.querySelectorAll(focusableElements)[0];
      const focusableContent = modalContact.querySelectorAll(focusableElements);

      console.log(
        "focusableContent:",
        modalContact.querySelectorAll(focusableElements)
      );

      // The last element to be focused inside modal
      const lastFocusableElement =
        focusableContent[focusableContent.length - 1];

      if (e.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // add focus for the last focusable element
          e.preventDefault();
        }
      } else {
        // if tab key is pressed
        if (document.activeElement === lastFocusableElement) {
          // if focused has reached to last focusable element then focus first focusable element after pressing tab
          firstFocusableElement.focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      }
    } else {
      // Navigation with arrows keys on the entire photographer.html page
      const bodyElementPhotographer = document.getElementsByTagName("body")[0];
      const focusable = Array.from(
        bodyElementPhotographer.querySelectorAll(
          '[tabindex="0"]:not(#contact_modal [tabindex="0"])'
        )
      );

      console.log(focusable);
      if (e.key === "ArrowRight" || e.key === 39) {
        i++;
        i = ((i % focusable.length) + focusable.length) % focusable.length;
        focusable[i].focus();
        console.log("droite: ", i);
      }
      if (e.key === "ArrowLeft" || e.key === 37) {
        i--;
        i = ((i % focusable.length) + focusable.length) % focusable.length;
        focusable[i].focus();
        console.log("gauche", i);
      }
    }
  });
  if (typeof firstFocusableElement != "undefined") {
    // eslint-disable-next-line no-undef
    firstFocusableElement.focus();
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

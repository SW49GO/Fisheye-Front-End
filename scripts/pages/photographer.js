// ID of the photographer
const urlParams = new URLSearchParams(window.location.search);
const idPhotographer = urlParams.get("identify");

/**
 * Function to display chevrons & appear menu
 * @param {string} btnFilter HTML
 */
function displayMenuFilter(btnFilter) {
  console.log("entrer dans le button");

  // console.log('photographer.js/ ->btnSord addEventlistener');
  const selectedMenuFilter = document.querySelector(".select-menu");
  console.log(selectedMenuFilter.classList);
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
function selectFilter(selectMenuFilter, btnFilter) {
  console.log(btnFilter);
  console.log(selectMenuFilter);
  console.log("entrer selection menu");
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
  getJsonDataPhotographers().then(({ media, photographers }) => {
    displayMedia(media, photographers, idPhotographer, select);
  });
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
    closeModal();
  });
}

/**
 * Function Management Likes
 * @param {string} numberLikes HTML
 * @param {array} tabRef
 */

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
}

/**
 * Function to display the LightBox when user select a photo
 * @param {*} photo
 */
function selectPhotoLightBox(photo) {
  console.log(photo);
  const idPhoto = photo.dataset.id;
  console.log(idPhoto);
  getJsonDataPhotographers().then(({ media, photographers }) => {
    displayLightBox(media, photographers, idPhoto, idPhotographer);
  });
  displayModal("lightBox");
}

/**
 * Function to initialize "i" that is the index of the photo selected
 * @param {string} indexPhoto
 * @returns
 */
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
 * @param {*} nbMedias
 */
function goToPreviewPhoto(nbMedias) {
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
  // console.log(nbMedias.length);
  console.log("left");
  i--;
  // if (i >= 0) {
  //   i = Math.abs(i % nbMedias.length);
  // } else {
  //   i = nbMedias.length - Math.abs(i % nbMedias.length);
  // }
  // Affecte une valeur positif à "i", si "i" est négatif
  i = ((i % nbMedias.length) + nbMedias.length) % nbMedias.length;

  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");
  console.log(
    document.getElementById("contact_modal").querySelectorAll(".li-image")[i]
  );
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
function goToNextPhoto(nbMedias) {
  // console.log(nbMedias.length);
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
  // if (i >= 0) {
  //   i = Math.abs(i % nbMedias.length);
  // } else {
  //   i = nbMedias.length - Math.abs(i % nbMedias.length);
  // }
  // Affecte une valeur positif à "i", si "i" est négatif
  i = ((i % nbMedias.length) + nbMedias.length) % nbMedias.length;

  // Apparition de la prochain photo et son titre
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".lightBox-photo")
    .classList.toggle("hidden");
  console.log(
    document.getElementById("contact_modal").querySelectorAll(".li-image")[i]
  );
  document
    .getElementById("contact_modal")
    .querySelectorAll(".li-image")
    [i].querySelector(".title-photo")
    .classList.toggle("hidden");
}

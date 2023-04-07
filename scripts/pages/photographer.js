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
  // Positionnement du chevron
  const chevronFilter = btnFilter.querySelector(".chevron-filter");
  chevronFilter.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
  const button = btnFilter.childNodes[0];
  console.log(button);
  const buttonTxt = button.textContent;
  const choiceName = selectMenuFilter.textContent;

  // Inversion des nom de menuItems
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
 * Console.log de la soumission du formulaire
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
    // Si l'utilisateur a déjà liké
    const index = tabRef.indexOf(refLike);
    tabRef.splice(index, 1);
    totalLikesEncart--;
    photoLike--;
  } else {
    // Si l'utilisateur n'a pas encore liké
    tabRef.push(refLike);
    totalLikesEncart++;
    photoLike++;
  }
  // Insertion des nouvelles données dans le DOM
  encart.innerHTML = `${totalLikesEncart}<i class="fa-solid fa-heart"></i>`;
  numberLikes.innerHTML = `${photoLike}<i data-ref="${refLike}" class="fa-solid fa-heart icon-likes"></i>`;
}

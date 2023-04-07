/**
 * Pattern Factories to create HTMLElements for photographer.html
 * @param {object} data
 * @returns getMediaCardDOM->HTMLElement(article)
 */
function mediaFactory(data) {
  console.log("factories/media.js");
  console.log(data);

  function getMediaCardDOM() {
    console.log("factories/media.js->getMediaCardDOM");
    const { name } = data.photographer[0];
    // console.log(name);

    // console.log(data.media[0]);
    const path = name.split(" ")[0];
    const parentArticle = document.querySelector(".photograph-header");
    const theLastArticle = document.querySelector(".list-article");
    if (theLastArticle) {
      parentArticle.removeChild(theLastArticle);
    }
    const article = document.createElement("article");
    article.className = "list-article";

    for (let i = 0; i < data.media.length; i++) {
      const images = data.media[i].image
        ? `<img class="list-photos" data-id="${data.media[i].id}" src="assets/photographers/${path}/${data.media[i].image}" alt="${data.media[i].title}" loading="lazy"></img>`
        : `<video class="video list-photos" data-id="${data.media[i].id}" aria-label="Vidéo : ${data.media[i].title}">
                                        <source src="assets/photographers/${path}/${data.media[i].video}" type="video/mp4" >
                                      </video>`;
      const title = data.media[i].video
        ? `<p tabindex="0"><i class="fa-solid fa-video" title="Vidéo"></i> ${data.media[i].title}</p>`
        : `<p tabindex="0">${data.media[i].title}</p>`;
      if (images) {
        // console.log(images);
        article.innerHTML += `<div class="list-photos-photographer">
                                  <a href="#" tabindex="-1">
                                    <button class="list-photos-conteneur" tabindex="0" aria-label="Cliquer pour zoomer sur la photo ou lire la vidéo">
                                      ${images}
                                    </button>
                                   </a>
                                  <figcaption class="list-photos-description" >
                                    ${title}
                                    <button class="number-likes" tabindex="0" aria-label="Poser un like sur cette image apprécié ${data.media[i].likes} fois">${data.media[i].likes}<i data-ref="${data.media[i].id}" class="fa-solid fa-heart icon-likes"></i></button>
                                  </figcaption>
                                </div>`;
      }
    }
    article.innerHTML += `<a href="#begin">Revenir en haut de la page</a>`;

    return article;
  }
  return { getMediaCardDOM };
}

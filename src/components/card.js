function addCardHandlers(card) {
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeButton.classList.toggle("card__like-button_is-active"));

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteButton.closest(".card").remove());
}

function createCard({name, link}) {
  const template = document.querySelector("#card-template").content;

  const card = template.cloneNode(true);

  const image = card.querySelector(".card__image");
  image.src = link;
  image.alt = name;

  card.querySelector(".card__title").textContent = name;

  addCardHandlers(card);

  return card;
}

export { createCard };

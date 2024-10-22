import {deleteCard, setCardLike} from "./api";

async function updateCardLike(id, method) {
  try {
    const response = await setCardLike(id, method);

    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

function toggleLikeState(isLiked, likeButton, likeCounter, cardData) {
  likeCounter.textContent = cardData.likes.length;
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

function defineIsLiked(likes, userId) {
  return likes.some(user => user._id === userId);
}

function addLikeHandler(likeButton, likeCounter, cardData, userId) {
  let isLiked = defineIsLiked(cardData.likes, userId);

  likeButton.addEventListener("click", () => {
    const method = isLiked ? "DELETE" : "PUT";
    updateCardLike(cardData._id, method).then(card => {
      isLiked = !isLiked;
      toggleLikeState(isLiked, likeButton, likeCounter, card);
    })
  })
}

function addDeleteHandler(deleteButton, cardData, userId) {
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardData._id)
        .then(res => res.ok ? Promise.resolve() : Promise.reject(`Ошибка ${res.status}`))
        .then(() => {
          deleteButton.closest(".card").remove();
        })
        .catch(err => console.log(err));
    })
  } else {
    deleteButton.remove();
  }
}

function addCardHandlers(cardElement, cardData, userId) {
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  addLikeHandler(likeButton, likeCounter, cardData, userId);
  addDeleteHandler(deleteButton, cardData, userId);
}

function createCard(cardData, userId) {
  const {name, link, likes} = cardData;
  const template = document.querySelector("#card-template").content;
  const cardElement = template.cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = name;

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__like-counter").textContent = likes.length;

  if (defineIsLiked(cardData.likes, userId)) {
    cardElement.querySelector(".card__like-button").classList.add("card__like-button_is-active");
  }

  addCardHandlers(cardElement, cardData, userId);

  return cardElement;
}

export {createCard};

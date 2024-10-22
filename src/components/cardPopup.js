import {closePopup, openPopup} from "./modal";
import {createCard} from "./card";
import {addNewCard} from "./api";

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

const places = document.querySelector(".places__list");

function handleCardPopupOpen(popup) {
  return () => {
    cardNameInput.value = "";
    cardLinkInput.value = "";
    openPopup(popup);
  }
}

function handleCardPopupSubmit(popup) {
  const submitButton = popup.querySelector(".popup__button");

  return (e) => {
    e.preventDefault();

    submitButton.textContent = "Сохранение...";
    addNewCard(cardNameInput.value, cardLinkInput.value)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
      .then(card => {
        places.prepend(createCard(card, card.owner._id));
        closePopup(popup);
      })
      .catch(err => console.log(err))
      .finally(() => {
        submitButton.textContent = "Сохранить"
      });
  }
}

export {handleCardPopupOpen, handleCardPopupSubmit};

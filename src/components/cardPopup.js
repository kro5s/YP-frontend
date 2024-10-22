import {closePopup, openPopup} from "./modal";
import {createCard} from "./card";

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
  return (e) => {
    e.preventDefault();

    places.prepend(createCard({ name: cardNameInput.value, link: cardLinkInput.value }));

    closePopup(popup);
  }
}

export {handleCardPopupOpen, handleCardPopupSubmit};

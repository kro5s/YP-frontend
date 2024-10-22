import {closePopup, openPopup} from "./modal";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description")

const profileTitleInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(".popup__input_type_description");

function handleProfilePopupOpen(popup) {
  return () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(popup);
  }
}

function handleProfilePopupSubmit(popup) {
  return (e) => {
    e.preventDefault();

    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;

    closePopup(popup);
  }
}

export {handleProfilePopupOpen, handleProfilePopupSubmit};

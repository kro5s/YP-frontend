import {closePopup, openPopup} from "./modal";
import {updateProfile} from "./api";

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
  const submitButton = popup.querySelector(".popup__button");

  return (e) => {
    e.preventDefault();

    submitButton.textContent = "Сохранение...";
    updateProfile(profileTitleInput.value, profileDescriptionInput.value)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
      .then(({ name, about }) => {
        profileTitle.textContent = name;
        profileDescription.textContent = about;
        closePopup(popup);
      })
      .catch(err => console.log(err))
      .finally(() => {
        submitButton.textContent = "Сохранить";
      });
  }
}

export {handleProfilePopupOpen, handleProfilePopupSubmit};

import {closePopup, openPopup} from "./modal";
import {updateAvatar} from "./api";

const avatarInput = document.querySelector(".popup__input_type_avatar");

function handleAvatarPopupOpen(popup) {
  return () => {
    avatarInput.value = "";

    openPopup(popup);
  }
}

function handleAvatarPopupSubmit(popup) {
  const profileImage = document.querySelector('.profile__image');
  const submitButton = popup.querySelector(".popup__button");

  return (e) => {
    e.preventDefault();

    submitButton.textContent = "Сохранение...";
    updateAvatar(avatarInput.value)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
      .then(data => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        closePopup(popup);
      })
      .catch(err => console.log(err))
      .finally(() => {
        submitButton.textContent = "Сохранить"
      })
  }
}

export {handleAvatarPopupOpen, handleAvatarPopupSubmit};

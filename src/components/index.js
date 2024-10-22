import "../pages/index.css";
import {enableValidation} from "./validate";
import {handleProfilePopupOpen, handleProfilePopupSubmit} from "./profilePopup";
import {handleCardPopupOpen, handleCardPopupSubmit} from "./cardPopup";
import {handleImagePopupOpen} from "./imagePopup";
import {enablePopups} from "./modal";
import {getInitialCards, getUser} from "./api";
import {handleAvatarPopupOpen, handleAvatarPopupSubmit} from "./avatarPopup";
import {createCard} from "./card";

async function initializeUser() {
  const profileImage = document.querySelector('.profile__image');
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  try {
    const res = await getUser();

    const {name, about, avatar, _id} = await res.json();

    profileImage.style.backgroundImage = `url(${avatar})`;
    profileTitle.textContent = name;
    profileDescription.textContent = about;

    return _id;
  } catch (e) {
    console.log(e);
  }
}

async function initializeCards(userId) {
  const places = document.querySelector(".places__list");

  try {
    const res = await getInitialCards();
    const data = await res.json();

    const cards = data.map(item => createCard(item, userId));
    places.append(...cards);
  } catch (e) {
    console.log(e);
  }
}

const userId = await initializeUser();
await initializeCards(userId);

const popups = {
  profilePopup: {
    element: document.querySelector(".popup_type_edit"),
    openers: [document.querySelector(".profile__edit-button")],
    openerHandler: handleProfilePopupOpen,
    submitHandler: handleProfilePopupSubmit
  },
  cardPopup: {
    element: document.querySelector(".popup_type_new-card"),
    openers: [document.querySelector(".profile__add-button")],
    openerHandler: handleCardPopupOpen,
    submitHandler: handleCardPopupSubmit
  },
  imagePopup: {
    element: document.querySelector(".popup_type_image"),
    openers: Array.from(document.querySelectorAll(".card__image")),
    openerHandler: handleImagePopupOpen
  },
  avatarPopup: {
    element: document.querySelector(".popup_type_avatar"),
    openers: [document.querySelector(".profile__image")],
    openerHandler: handleAvatarPopupOpen,
    submitHandler: handleAvatarPopupSubmit
  }
}

enablePopups(popups);

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);

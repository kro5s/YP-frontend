import { initialCards } from "./cards";
import "../pages/index.css";
import avatarUrl from '../images/avatar.jpg';
import {enableValidation} from "./validate";
import {enablePopups} from "./modal";
import {createCard} from "./card";
import {handleCardPopupOpen, handleCardPopupSubmit} from "./cardPopup";
import {handleProfilePopupOpen, handleProfilePopupSubmit} from "./profilePopup";
import {handleImagePopupOpen} from "./imagePopup";

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarUrl})`;

const cards = initialCards.map(createCard);
const places = document.querySelector(".places__list");
places.append(...cards);

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
import { initialCards } from "./cards";
import "../pages/index.css";
import avatarUrl from '../images/avatar.jpg';
import {enableValidation} from "../components/validate";
import { openModal, closeModal } from "../components/modal";
import {createCard} from "../components/card";

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarUrl})`;

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

[profilePopup, cardPopup, imagePopup].forEach(popup => popup.classList.add("popup_is-animated"));

const cards = initialCards.map(createCard);
const places = document.querySelector(".places__list");
places.append(...cards);

const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

const cardElements = document.querySelectorAll(".card");

cardElements.forEach(card => {
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  cardImage.addEventListener("click", () => {
    imagePopupImage.src = cardImage.src;
    imagePopupImage.alt = cardTitle.textContent;
    imagePopupCaption.textContent = cardTitle.textContent;
    openModal(imagePopup);
  })
})

imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

const profileForm = profilePopup.querySelector(".popup__form");

const openEditProfileButton = document.querySelector(".profile__edit-button");
const closeEditProfileButton = profilePopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description")

const profileTitleInput = profilePopup.querySelector(".popup__input_type_name");
const profileDescriptionInput = profilePopup.querySelector(".popup__input_type_description");

function handleProfileEdit() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profilePopup);
}

openEditProfileButton.addEventListener("click", handleProfileEdit);
closeEditProfileButton.addEventListener("click", () => closeModal(profilePopup));
profileForm.addEventListener("submit", handleProfileFormSubmit)

const cardForm = cardPopup.querySelector(".popup__form");

const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = cardPopup.querySelector(".popup__close");

const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");

function handleAddCard() {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openModal(cardPopup);
}

function handleCardFormSubmit(e) {
  e.preventDefault();

  const newCard = createCard({name: cardNameInput.value, link: cardLinkInput.value});
  places.prepend(newCard);

  closeModal(cardPopup);
}

addCardButton.addEventListener("click", handleAddCard);
closeCardButton.addEventListener("click", () => closeModal(cardPopup));
cardForm.addEventListener("submit", handleCardFormSubmit);

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);

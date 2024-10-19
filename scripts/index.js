function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

[profilePopup, cardPopup, imagePopup].forEach(popup => popup.classList.add("popup_is-animated"));

const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

function addCardHandlers(card, name, link) {
  const image = card.querySelector(".card__image");
  image.addEventListener("click", () => {
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
  });

  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeButton.classList.toggle("card__like-button_is-active"));

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteButton.closest(".card").remove());
}

function createCard({ name, link }) {
  const template = document.querySelector("#card-template").content;

  const card = template.cloneNode(true);

  const image = card.querySelector(".card__image");
  image.src = link;
  image.alt = name;

  card.querySelector(".card__title").textContent = name;

  addCardHandlers(card, name, link);

  return card;
}

const cards = initialCards.map(createCard);
const places = document.querySelector(".places__list");
places.append(...cards);

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

  const newCard = createCard({ name: cardNameInput.value, link: cardLinkInput.value });
  places.prepend(newCard);

  closeModal(cardPopup);
}

addCardButton.addEventListener("click", handleAddCard);
closeCardButton.addEventListener("click", () => closeModal(cardPopup));
cardForm.addEventListener("submit", handleCardFormSubmit);

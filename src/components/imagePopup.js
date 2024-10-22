import {openPopup} from "./modal";

const image = document.querySelector(".popup_type_image .popup__image");
const caption = document.querySelector(".popup_type_image .popup__caption");

function handleImagePopupOpen(popup, opener) {
  const title = opener.closest(".card").querySelector(".card__title");

  return () => {
    image.src = opener.src;
    image.alt = title.textContent;
    caption.textContent = title.textContent;

    openPopup(popup);
  }
}

export { handleImagePopupOpen };

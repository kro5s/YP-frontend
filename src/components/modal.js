function addOverlayClosingListener(popup) {
  const popupContent = popup.querySelector(".popup__content");

  function handleClickOutside(e) {
    if (!popupContent.contains(e.target)) {
      closeModal(popup);
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeButton);
    }
  }

  function handleEscapeButton(e) {
    if (e.key === "Escape") {
      closeModal(popup);
      document.removeEventListener("keydown", handleEscapeButton);
      document.removeEventListener("pointerdown", handleClickOutside);
    }
  }

  document.addEventListener("pointerdown", handleClickOutside);
  document.addEventListener("keydown", handleEscapeButton);
}

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  addOverlayClosingListener(popup);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

export { openModal, closeModal };

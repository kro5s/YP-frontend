function addOverlayClosingListener(popup) {
  const popupContent = popup.querySelector(".popup__content");

  function handleClickOutside(e) {
    if (!popupContent.contains(e.target)) {
      closePopup(popup);
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeButton);
    }
  }

  function handleEscapeButton(e) {
    if (e.key === "Escape") {
      closePopup(popup);
      document.removeEventListener("keydown", handleEscapeButton);
      document.removeEventListener("pointerdown", handleClickOutside);
    }
  }

  document.addEventListener("pointerdown", handleClickOutside);
  document.addEventListener("keydown", handleEscapeButton);
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  addOverlayClosingListener(popup);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

function enablePopups(popupsSettings) {
  for (const { element, openers, openerHandler, submitHandler } of Object.values(popupsSettings)) {
    element.classList.add("popup_is-animated");

    openers.forEach((opener) => {
      opener.addEventListener("click", openerHandler(element, opener));
    })

    const closeButton = element.querySelector(".popup__close");
    closeButton.addEventListener("click", () => closePopup(element));

    if (submitHandler) {
      const form = element.querySelector(".popup__form");
      form.addEventListener("submit", submitHandler(element))
    }
  }
}

export { openPopup, closePopup, enablePopups };

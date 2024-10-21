function showInputError(input, errorElement, errorText, validationSettings) {
  errorElement.textContent = errorText;
  errorElement.classList.add(validationSettings.errorClass);
  input.classList.add(validationSettings.inputErrorClass)
}

function hideInputError(input, errorElement, validationSettings) {
  errorElement.textContent = "";
  errorElement.classList.remove(validationSettings.errorClass);
  input.classList.remove(validationSettings.inputErrorClass)
}

function toggleButtonState(inputs, button, validationSettings) {
  const hasInvalidInput = Array.from(inputs).some(input => !input.validity.valid);

  if (hasInvalidInput) {
    button.classList.add(validationSettings.inactiveButtonClass);
    button.setAttribute("disabled", "true");
  } else {
    button.classList.remove(validationSettings.inactiveButtonClass);
    button.removeAttribute("disabled");
  }
}

function setInputsEventListeners(inputs, submitButton, validationSettings) {
  inputs.forEach(input => {
    const errorElement = document.querySelector(`.${input.id}-error`)
    input.addEventListener("input", (e) => {
      if (e.target.validity.valid) {
        hideInputError(input, errorElement, validationSettings);
      } else {
        showInputError(input, errorElement, e.target.validationMessage, validationSettings);
      }

      toggleButtonState(inputs, submitButton, validationSettings);
    })
  })
}

function enableValidation(validationSettings) {
  const forms = document.querySelectorAll(validationSettings.formSelector);

  forms.forEach(form => {
    const inputs = form.querySelectorAll(validationSettings.inputSelector);
    const submitButton = form.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputs, submitButton, validationSettings);

    setInputsEventListeners(inputs, submitButton, validationSettings);
  })
}

export { enableValidation };

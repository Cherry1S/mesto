const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

function resetForm(popupName) {
  const container = popupName.querySelector(validationConfig.containerSelector)
  const form = container.querySelector(validationConfig.formSelector)
  form.reset();
}

const checkInputValidity = (fieldsetElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(fieldsetElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(fieldsetElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, fieldsetElement, config) => {
  const inputList = Array.from(fieldsetElement.querySelectorAll(config.inputSelector));
  const buttonElement = fieldsetElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config)

  formElement.addEventListener('reset', function () {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
      inputList.forEach((inputElement) => {
        hideInputError(fieldsetElement, inputElement, config)});
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(fieldsetElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsetSelector));
    fieldsetList.forEach((fieldsetElement) => {
      setEventListeners(formElement, fieldsetElement, config);
    })
  });
};

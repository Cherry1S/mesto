export default class FormValidator {
  constructor(config, form) {
    this._config = config
    this._form = form
  }

  _showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (fieldsetElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      this._showInputError(fieldsetElement, inputElement, inputElement.validationMessage, config);
    } else {
      this._hideInputError(fieldsetElement, inputElement, config);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState = (inputList, buttonElement, config) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners = (formElement, fieldsetElement, config) => {
    const inputList = Array.from(fieldsetElement.querySelectorAll(config.inputSelector));
    const buttonElement = fieldsetElement.querySelector(config.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement, config)

    formElement.addEventListener('reset', () => {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
      inputList.forEach((inputElement) => {
        this._hideInputError(fieldsetElement, inputElement, config)
      });
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(fieldsetElement, inputElement, config)
        this._toggleButtonState(inputList, buttonElement, config)
      });
    });
  };

  enableValidation = () => {
    const formElement = (document.getElementById(this._form));
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(this._config.fieldsetSelector));
    fieldsetList.forEach((fieldsetElement) => {
      this._setEventListeners(formElement, fieldsetElement, this._config);
    })
  };
};

import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({ selector,  handleSubmitForm }) {
    super(selector)
    this._handleSubmitForm = handleSubmitForm

    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input-text');
  }

  open() {
    super.open();
    this._form.reset();
  }

  _getInputValues() {
    this._userData = {}

    this._inputList.forEach((input) => {
      this._userData[input.name] = input.value;
    })
    return this._userData
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}

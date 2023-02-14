import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, title, link) {
    super(selector);
    this._title = title;
    this._link = link;
  }

  open() {
      super.open();
      popupImageCaption.textContent = this._title;
      popupImage.src = this._link;
      popupImage.alt = this._title;
    }
}

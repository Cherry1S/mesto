import Popup from "./Popup.js";
import { popupImage, popupImageCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(title, link) {
    popupImageCaption.textContent = title;
    popupImage.src = link;
    popupImage.alt = title;
    super.open();
  }
}

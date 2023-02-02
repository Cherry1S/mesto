import { openPopup } from './utils.js'

export default class Card {
  constructor(title, link, templateSelector) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
  };

  _getTemplate = () => {
    const templateCard = document
      .getElementById(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return templateCard
  }

  generateCard = () => {
    this._elementsCard = this._getTemplate();
    this._setEventListeners();

    this._elementsCard.querySelector('.elements__card-text').textContent = this._title;
    this._elementsCard.querySelector('.elements__card-image').src = this._link;
    this._elementsCard.querySelector('.elements__card-image').alt = this._title;

    return this._elementsCard
  }

  _removeCard = () => {
    this._elementsCard.remove()
  }

  _likeCard = (evt) => {
    evt.target.classList.toggle('elements__card-like_active')
  }

  _viewCardImage = () => {
    popupImageCaption.textContent = this._title;
    popupImage.src = this._link;
    popupImage.alt = this._title;
    openPopup(popupView);
  }

  _setEventListeners = () => {
    this._elementsCard
      .querySelector('.elements__delete-button')
      .addEventListener('click', this._removeCard)
    this._elementsCard
      .querySelector('.elements__card-like')
      .addEventListener('click', this._likeCard)
    this._elementsCard
      .querySelector('.elements__card-image')
      .addEventListener('click', () => this._viewCardImage(this._title, this._link))
  };
}

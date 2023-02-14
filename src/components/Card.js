import Popup from "./Popup.js";

export default class Card {
  constructor(title, link, templateSelector, handleCardClick) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._elementsCardImage = this._elementsCard.querySelector('.elements__card-image');
    this._elementsCardImage.src = this._link;
    this._elementsCardImage.alt = this._title;

    return this._elementsCard
  }

  _removeCard = () => {
    this._elementsCard.remove()
  }

  _likeCard = (evt) => {
    evt.target.classList.toggle('elements__card-like_active')
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
      .addEventListener('click', () => { this._handleCardClick(this._title, this._link) })
  };
}

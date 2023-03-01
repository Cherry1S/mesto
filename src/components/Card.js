export default class Card {
  constructor(cardData, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._title = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._owner = cardData.owner;
    this._cardId = cardData._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._isLiked = false;
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
    this._likeButton = this._elementsCard.querySelector('.elements__card-like');
    this._likesNumber = this._elementsCard.querySelector('.elements__likes-number')
    this._setEventListeners();

    this._likesNumber.textContent = this._likes.length;
    this._elementsCard.querySelector('.elements__card-text').textContent = this._title;
    this._elementsCardImage = this._elementsCard.querySelector('.elements__card-image');
    this._elementsCardImage.src = this._link;
    this._elementsCardImage.alt = this._title;
    if (this._owner._id === this._userId) {
      this._elementsCard.querySelector('.elements__delete-button').classList.add('elements__delete-button_active')
    }
    if (this._likes.map(item => item._id).includes(this._userId)) {
      this._likeButton.classList.add('elements__card-like_active');
      this._isLiked = true;
    }

    return this._elementsCard
  }

  removeCard = () => {
    this._elementsCard.remove();
    this._elementsCard = null;
  }

  toggleLike = (newData) => {
    if (newData.likes.map(item => item._id).includes(this._userId)) {
      this._isLiked = true;
      this._likeButton.classList.add('elements__card-like_active');
      this._likesNumber.textContent = newData.likes.length;
    } else {
      this._isLiked = false;
      this._likeButton.classList.remove('elements__card-like_active');
      this._likesNumber.textContent = newData.likes.length;
    }
  }

  _setEventListeners = () => {
    this._elementsCard
      .querySelector('.elements__card-like')
      .addEventListener('click', () => { this._handleLikeClick(this._cardId, this, this._isLiked) })
    this._elementsCard
      .querySelector('.elements__card-image')
      .addEventListener('click', () => { this._handleCardClick(this._title, this._link) })

    if (this._owner._id === this._userId) {
      this._elementsCard
        .querySelector('.elements__delete-button')
        .addEventListener('click', () => { this._handleDeleteClick(this._cardId, this) })
    }
  };
}

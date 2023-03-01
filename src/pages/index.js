import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupCardDelete from '../components/PopupCardDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  nameInput, aboutInput, profileName, profileAbout, avatar, formEditButton, formAddButton, formAvatarButton, validationConfig
} from '../utils/constants.js';
import './index.css';

let userId = ''

function createCard(cardData, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
  return new Card(cardData, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick).generateCard();
}

function handleCardClick(title, link) {
  popupView.open(title, link);
}

function handleDeleteClick(cardId, card) {
  popupDelete.getCard(cardId, card)
  popupDelete.open()
}

function handleLikeClick(cardId, card, isLiked) {
  if (isLiked) {
    api.removeLike(cardId)
      .then((newData) => { card.toggleLike(newData) })
      .catch(res => console.log(res))
  } else {
    api.likeCard(cardId)
      .then((newData) => { card.toggleLike(newData) })
      .catch(res => console.log(res))
  }
}

function renderLoading(form, isLoading) {
  if (isLoading) {
    form.querySelector('.popup__submit').textContent = 'Сохранение...';
  } else if (form.id === 'form-add') {
    form.querySelector('.popup__submit').textContent = 'Создать';
  } else {
    form.querySelector('.popup__submit').textContent = 'Сохранить';
  }
}

//////////////////////////////////////////////////////////////////////////////////////

const enableValidator = (config, form) => { new FormValidator(config, form).enableValidation() };
const cardsList = new Section((cardData) => {
  const newCard = createCard(cardData, userId, 'template-card', handleCardClick, handleDeleteClick, handleLikeClick);
  cardsList.addItemReversed(newCard);
},
  '.elements__grid'
);
const userInfo = new UserInfo('.profile__title', '.profile__about');
const popupView = new PopupWithImage('popup-view', '.popup__image', '.popup__image-caption');
const formEdit = new PopupWithForm({
  selector: 'popup-edit',
  handleSubmitForm: (newInfo, form) => {
    renderLoading(form, true);
    api.changeUserInfo(newInfo.name, newInfo.about)
      .then((newInfo) => {
        profileName.textContent = newInfo.name;
        profileAbout.textContent = newInfo.about;
      })
      .catch(res => console.log(res))
      .finally(renderLoading(form, false))
  }
});
const formAdd = new PopupWithForm({
  selector: 'popup-add',
  handleSubmitForm: (newCardInfo, form) => {
    renderLoading(form, true);
    api.addCard(newCardInfo.place, newCardInfo.link)
      .then((cardData) => {
        cardsList.addItem(createCard(cardData, userId, 'template-card', handleCardClick, handleDeleteClick, handleLikeClick))
      })
      .catch(res => console.log(res))
      .finally(renderLoading(form, false))
  }
});
const formAvatar = new PopupWithForm({
  selector: 'popup-avatar',
  handleSubmitForm: (newAvatar, form) => {
    renderLoading(form, true)
    api.changeAvatar(newAvatar.avatar)
      .then(res => avatar.src = res.avatar)
      .catch(res => console.log(res))
      .finally(renderLoading(form, false))
  }
});
const popupDelete = new PopupCardDelete({
  selector: 'popup-delete',
  handleCardDelete: (cardId, card) => {
    api.deleteCard(cardId)
      .then(card.removeCard())
      .then(popupDelete.close())
      .catch(res => console.log(res))
  }
});

//////////////////////////////////////////////////////////////////////////////////////

formAddButton.addEventListener('click', () => {
  formAdd.open();
});
formEditButton.addEventListener('click', () => {
  formEdit.open();
  const oldInfo = userInfo.getUserInfo();
  nameInput.value = oldInfo.name;
  aboutInput.value = oldInfo.about;
});
formAvatarButton.addEventListener('click', () => {
  formAvatar.open();
});

//////////////////////////////////////////////////////////////////////////////////////

formAvatar.setEventListeners();
formAdd.setEventListeners();
formEdit.setEventListeners();
popupView.setEventListeners();
popupDelete.setEventListeners();
enableValidator(validationConfig, 'form-add');
enableValidator(validationConfig, 'form-edit');
enableValidator(validationConfig, 'form-avatar');

//////////////////////////////////////////////////////////////////////////////////////

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'fe2506e1-5260-4f6d-bc3e-c28fd341c579',
    'Content-Type': 'application/json',
  },
});

api.getInitialCards()
  .then((cards) => {
    cardsList.renderItems(cards)
  })
  .catch(res => console.log(res))

api.getUserInfo()
  .then((profileInfo) => {
    userId = profileInfo._id;
    userInfo.setUserInfo(profileInfo);
    avatar.src = profileInfo.avatar;
  })
  .catch(res => console.log(res))

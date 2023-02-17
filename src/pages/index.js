import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  nameInput, jobInput, formEditButton, formAddButton,
  initialCards, validationConfig
} from '../utils/constants.js';
import './index.css';


function createCard(title, link, templateSelector, handleCardClick) {
  return new Card(title, link, templateSelector, handleCardClick).generateCard();
}

function handleCardClick(title, link) {
  popupView.open(title, link);
}

const enableValidator = (config, form) => { new FormValidator(config, form).enableValidation() };
const cardsList = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
    const card = createCard(name, link, 'template-card', handleCardClick);
    cardsList.addItem(card);
  }
},
  '.elements__grid'
);
const userInfo = new UserInfo('.profile__title', '.profile__job');
const popupView = new PopupWithImage('popup-view', '.popup__image', '.popup__image-caption');
const formEdit = new PopupWithForm({
  selector: 'popup-edit',
  handleSubmitForm: (newInfo) => {
    userInfo.setUserInfo(newInfo);
  }
});
const formAdd = new PopupWithForm({
  selector: 'popup-add',
  handleSubmitForm: (newCardInfo) => {
    const newCard = createCard(newCardInfo.place, newCardInfo.link, 'template-card', handleCardClick);
    cardsList.addItem(newCard);
  }
});

formAddButton.addEventListener('click', () => {
  formAdd.open();
});
formEditButton.addEventListener('click', () => {
  formEdit.open();
  const oldInfo = userInfo.getUserInfo();
  nameInput.value = oldInfo.name;
  jobInput.value = oldInfo.job;
});

formAdd.setEventListeners();
formEdit.setEventListeners();
popupView.setEventListeners();
cardsList.renderItems();
enableValidator(validationConfig, 'form-add');
enableValidator(validationConfig, 'form-edit');

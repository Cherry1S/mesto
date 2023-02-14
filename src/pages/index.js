import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { nameInput, jobInput, placeInput, linkInput, formEditButton, formAddButton,
  elementsGrid, initialCards, validationConfig } from '../utils/constants.js';
import './index.css';


function handleCardClick(title, link) {
  new PopupWithImage('popup-view', title, link).open();
}

const enableValidator = (config, form) => { new FormValidator(config, form).enableValidation() };
const cardsList = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
    const card = new Card(name, link, 'template-card', handleCardClick).generateCard()
    cardsList.addItem(card)
  }
},
  '.elements__grid'
);
const handleInfo = new UserInfo('.profile__title', '.profile__job')
const formEdit = new PopupWithForm({
  selector: 'popup-edit',
  handleSubmitForm: (evt) => {
    evt.preventDefault();
    const newInfo = formEdit._getInputValues();
    handleInfo.setUserInfo(newInfo);
    formEdit.close();
    evt.target.reset();
  }
});
const formAdd = new PopupWithForm({
  selector: 'popup-add',
  handleSubmitForm: (evt) => {
    evt.preventDefault();
    elementsGrid.prepend(new Card(placeInput.value, linkInput.value, 'template-card', handleCardClick).generateCard());
    formAdd.close();
    evt.target.reset();
  }
});

formAddButton.addEventListener('click', () => {
  formAdd.open();
});
formEditButton.addEventListener('click', () => {
  formEdit.open();
  const oldInfo = handleInfo.getUserInfo();
  nameInput.value = oldInfo.name;
  jobInput.value = oldInfo.job;
});

formAdd.setEventListeners();
formEdit.setEventListeners();
new Popup('popup-view').setEventListeners();
cardsList.renderItems();
enableValidator(validationConfig, 'form-add');
enableValidator(validationConfig, 'form-edit');

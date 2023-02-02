import Card from './Card.js'
import { openPopup, openPopupEdit, closePopupEsc, closePopup, resetForm, closePopupOverlay } from './utils.js'
import FormValidator from './FormValidator.js'

function addCard(title, link, templateSelector) {
  //Для выбора template используется ID
  elementsGrid.prepend(new Card(title, link, templateSelector).generateCard());
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  addCard(placeInput.value, linkInput.value, 'template-card');
  closePopup(popupAdd);
}

function loadCards(cards) {
  cards.forEach(function ({ name, link }) {
    addCard(name, link, 'template-card');
  })
}

formEditButton.addEventListener('click', openPopupEdit);
formAddButton.addEventListener('click', () => openPopup(popupAdd));
formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', closePopupOverlay);
})

loadCards(initialCards);

//Для включения валидатора для формы используется ID
new FormValidator(validationConfig, 'form-add').enableValidation();
new FormValidator(validationConfig, 'form-edit').enableValidation();

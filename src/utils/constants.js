const nameInput = document.getElementById('text-input-name')
const aboutInput = document.getElementById('text-input-about')
const formEditButton = document.querySelector('.profile__edit-button')
const formAddButton = document.querySelector('.profile__add-button')
const formAvatarButton = document.querySelector('.profile__avatar-button')
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__about')
const avatar = document.querySelector('.profile__image')
const userId = ''
const closePopupKey = 'Escape'


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-text-error_active'
};

export {
  nameInput, aboutInput, formEditButton, formAddButton, formAvatarButton, profileName, profileAbout, avatar, userId,
  closePopupKey, validationConfig
}

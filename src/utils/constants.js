const nameInput = document.getElementById('text-input-name')
const jobInput = document.getElementById('text-input-job')
const placeInput = document.getElementById('text-input-place')
const linkInput = document.getElementById('text-input-link')
const formEditButton = document.querySelector('.profile__edit-button')
const formAddButton = document.querySelector('.profile__add-button')
const elementsGrid = document.querySelector('.elements__grid')
const popupImage = document.querySelector('.popup__image')
const popupImageCaption = document.querySelector('.popup__image-caption')
const closePopupKey = 'Escape'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-text-error_active'
};

export {
  nameInput, jobInput, placeInput, linkInput, formEditButton, formAddButton, elementsGrid,
  closePopupKey, initialCards, validationConfig, popupImage, popupImageCaption
}

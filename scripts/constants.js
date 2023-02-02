const popupEdit = document.getElementById('popup-edit')
const popupAdd = document.getElementById('popup-add')
const popupView = document.getElementById('popup-view')
const popupImage = document.querySelector('.popup__image')
const popupImageCaption = document.querySelector('.popup__image-caption')
const popupTitle = document.querySelector('.popup__title')
const formElementEdit = document.getElementById('form-edit')
const formElementAdd = document.getElementById('form-add')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__job')
const nameInput = document.getElementById('text-input-name')
const jobInput = document.getElementById('text-input-job')
const placeInput = document.getElementById('text-input-place')
const linkInput = document.getElementById('text-input-link')
const buttonCloseList = document.querySelectorAll('.popup__close')
const formEditButton = document.querySelector('.profile__edit-button')
const formAddButton = document.querySelector('.profile__add-button')
const elementsGrid = document.querySelector('.elements__grid')
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
  containerSelector: '.popup__container',
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__set',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorClass: 'popup__input-text-error_active'
};

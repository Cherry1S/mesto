const popupEdit = document.getElementById('popup-edit')
const popupAdd = document.getElementById('popup-add')
const popupView = document.querySelector('.image-popup')
const popupTitle = document.querySelector('.popup__title')
const formElementEdit = document.getElementById('form-edit')
const formElementAdd = document.getElementById('form-add')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__job')
const nameInput = document.getElementById('text-input-name')
const jobInput = document.getElementById('text-input-job')
const placeInput = document.getElementById('text-input-place')
const linkInput = document.getElementById('text-input-link')
const formCloseButtonEdit = document.getElementById('edit-close-button')
const formCloseButtonAdd = document.getElementById('add-close-button')
const closeButtonView = document.querySelector('.image-popup__close')
const formEditButton = document.querySelector('.profile__edit-button')
const formAddButton = document.querySelector('.profile__add-button')
const elementsGrid = document.querySelector('.elements__grid')
let initialCards = [
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

function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopupEdit();
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  title = placeInput.value;
  link = linkInput.value;
  if (placeInput.value === '' || linkInput.value === '') {
    placeInput.classList.add('popup__input-text_red')
    linkInput.classList.add('popup__input-text_red')
    placeInput.setAttribute('placeholder', 'Введите название')
    linkInput.setAttribute('placeholder', 'Введите ссылку')
  } else {
    placeInput.classList.remove('popup__input-text_red')
    linkInput.classList.remove('popup__input-text_red')
    placeInput.setAttribute('placeholder', 'Название')
    linkInput.setAttribute('placeholder', 'Ссылка на картинку')
    linkInput.value = '';
    placeInput.value = '';
    addCard(title, link);
    togglePopupAdd();
  }
}

function togglePopupEdit() {
if (popupEdit.classList.contains('popup_opened') === false) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  }
popupEdit.classList.toggle('popup_opened');
}

function togglePopupAdd() {
  if (placeInput.classList.contains('popup__input-text_red') === true || linkInput.classList.contains('popup__input-text_red' === true)) {
    placeInput.classList.remove('popup__input-text_red');
    linkInput.classList.remove('popup__input-text_red');
    placeInput.setAttribute('placeholder', 'Название');
    linkInput.setAttribute('placeholder', 'Ссылка на картинку');
  }

  linkInput.value = '';
  placeInput.value = '';
  popupAdd.classList.toggle('popup_opened');
}

function togglePopupView() {


  popupView.classList.toggle('image-popup_opened');
}

function removeCard(name) {
  name.parentElement.remove()
}

function likeCard(name) {
  if (name.classList.contains('elements__card-like_active') === false) {
    name.classList.toggle('elements__card-like_active');
    name.src = './images/LikeButtonActive.svg';
  } else {
    name.classList.toggle('elements__card-like_active');
    name.src = './images/LikeButton.svg';
  }
}

function viewCard(img, title) {
  if (popupEdit.classList.contains('image-popup__opened') === false) {
    document.querySelector('.image-popup__img').src = img.getAttribute('src');
    document.querySelector('.image-popup__caption').textContent = title;
    togglePopupView();
  }
}

function addCard(title, link) {
  const templateCard = document.getElementById('template-card').content
  const elementsCard = templateCard.querySelector('.elements__card').cloneNode(true)
  elementsCard.querySelector('.elements__card-text').textContent = title;
  elementsCard.querySelector('.elements__card-image').src = link;
  elementsCard.querySelector('.elements__card-image').alt = `${link}`;
  elementsGrid.prepend(elementsCard);

  const removeButton = elementsCard.querySelector('.elements__delete-button')
  const likeButton = elementsCard.querySelector('.elements__card-like')
  const imageButton = elementsCard.querySelector('.elements__card-image')

  removeButton.addEventListener('click', () => removeCard(removeButton));
  likeButton.addEventListener('click', () => likeCard(likeButton));
  imageButton.addEventListener('click', () => viewCard(imageButton, title));
}

function loadCards() {
  initialCards.forEach(function({name, link}) {
    addCard(name, link)
  })
}

loadCards();

formEditButton.addEventListener('click', togglePopupEdit);
formAddButton.addEventListener('click', togglePopupAdd);
formCloseButtonEdit.addEventListener('click', togglePopupEdit);
formCloseButtonAdd.addEventListener('click', togglePopupAdd);
formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);
closeButtonView.addEventListener('click', togglePopupView);


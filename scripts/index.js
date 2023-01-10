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
const templateCard = document.getElementById('template-card').content
const allInputs = document.querySelectorAll('.popup__input-text');
const allErrorMessages = document.querySelectorAll('.popup__input-text-error');

function closePopupEsc(evt) {
  if (evt.key === closePopupKey) {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup);
  }
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
    }
}

function cleanInputs() {
  allInputs.forEach(input => {
    input.classList.remove('popup__input-text_type_error');
  })

  allErrorMessages.forEach(message => {
    message.classList.remove('popup__input-text-error_active');
  })

  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.reset()
    });
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  cleanInputs();
  enableValidation(validationConfig);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  title = placeInput.value;
  link = linkInput.value;
  addCard(title, link);
  closePopup(popupAdd);
}

function openPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
}

// function openPopupAdd() {
//   linkInput.value = '';
//   placeInput.value = '';
//   openPopup(popupAdd);
// }

function viewCard(link, title) {
  popupImageCaption.textContent = title;
  popupImage.src = link;
  popupImage.alt = title;
  openPopup(popupView);
}

function createCard(title, link) {
  const elementsCard = templateCard.querySelector('.elements__card').cloneNode(true)
  const removeButton = elementsCard.querySelector('.elements__delete-button')
  const likeButton = elementsCard.querySelector('.elements__card-like')
  const imageButton = elementsCard.querySelector('.elements__card-image')

  elementsCard.querySelector('.elements__card-text').textContent = title;
  imageButton.src = link;
  imageButton.alt = title;

  removeButton.addEventListener('click', () => elementsCard.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('elements__card-like_active'));
  imageButton.addEventListener('click', () => viewCard(link, title));

  return elementsCard;
}

function addCard(title, link) {
  elementsGrid.prepend(createCard(title, link));
}

function loadCards(cards) {
  cards.forEach(function({name, link}) {
    addCard(name, link)
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
enableValidation(validationConfig);

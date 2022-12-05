let popup = document.querySelector('.popup')
let formElement = document.querySelector('.popup__container')
let profileName = document.querySelector('.profile__title')
let profileJob = document.querySelector('.profile__job')
let nameInput = document.getElementById('text-input-first')
let jobInput = document.getElementById('text-input-second')
let formCloseButton = document.querySelector('.popup__close')
let formEditButton = document.querySelector('.profile__edit-button')

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}

function togglePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.toggle('popup_opened');
}

formEditButton.addEventListener('click', togglePopup);
formCloseButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', handleFormSubmit);

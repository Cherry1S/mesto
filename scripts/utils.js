function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function openPopupEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
}

function closePopupEsc(evt) {
  if (evt.key === closePopupKey) {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup);
  }
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  resetForm(popupName);
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

function resetForm(popupName) {
  const container = popupName.querySelector(validationConfig.containerSelector)
  const form = container.querySelector(validationConfig.formSelector)
  form.reset();
}

export { openPopup, openPopupEdit, closePopupEsc, closePopup, resetForm, closePopupOverlay }

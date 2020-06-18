let buttonOpen = document.querySelector('.profile__button-edit');
let buttonClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let inputName = popup.querySelector('.popup__input_type_name');
let inputJob = popup.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__profession');
let buttonSave = popup.querySelector('.popup__container');

function popupOpen() {
    popup.classList.add('popup_opened');
    inputName.setAttribute('value', profileName.textContent);
    inputJob.setAttribute('value', profileJob.textContent);
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    inputName.getAttribute('value');
    inputJob.getAttribute('value');
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value
    popupClose();
}

buttonOpen.addEventListener('click', popupOpen);
buttonClose.addEventListener('click', popupClose);
buttonSave.addEventListener('submit', formSubmitHandler);

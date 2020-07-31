import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './cards.js';
import { openPopup, closePopup, closePopupByEscOrOverlay, popupImg, popupImage, popupCaption, popupCloseImg } from './utils.js';

//элементы первого попапа//
const buttonOpen = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const inputName = popup.querySelector('.popup__input_type_name');
const inputJob = popup.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');
const profileForm = popup.querySelector('.popup__container');
//элементы второго попапа
const addButtonOpen = document.querySelector('.profile__button-add');
const addPopup = document.querySelector('.popup_type_add');
const addPopupClose = addPopup.querySelector('.popup__close');
const addPopupSave = addPopup.querySelector('.popup__container');
const inputTitle = addPopup.querySelector('.popup__input_type_name');
const inputLink = addPopup.querySelector('.popup__input_type_job');

// получаем содержимое template
const cardTemplateSelector = '.card-template';
const elements = document.querySelector('.elements__list');

// включение валидации вызовом enableValidation
const validationParams = {
    formElement: '.popup__container',
    inputElement: '.popup__input',
    buttonElement: '.popup__button',    
    inactiveButtonClass: 'popup__button_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorShowClass: 'popup__error_type_active',
    controlSelectorClass: '.popup__control',
    errorClass: '.popup__error'
};


function formProfileSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popup);
}

const validEdit = new FormValidator(validationParams, profileForm);
validEdit.enableValidation();

const validAdd = new FormValidator(validationParams, addPopupSave);
validAdd.enableValidation();

buttonOpen.addEventListener('click', () => {
    validEdit.updateErrorsAndButtonState(profileForm);
    inputName.setAttribute('value', profileName.textContent); 
    inputJob.setAttribute('value', profileJob.textContent);
    openPopup(popup); 
});


buttonOpen.addEventListener('click', () => openPopup(popup));
buttonClose.addEventListener('click', () => closePopup(popup));
profileForm.addEventListener('submit', formProfileSubmitHandler);

//добавление карточки на страницу
function addCard(element) {
    elements.prepend(element);
}

addPopupSave.addEventListener('submit', e => {
    e.preventDefault();
    const newElement = {
        name: inputTitle.value,
        link: inputLink.value
    };
    const userCard = new Card(newElement, cardTemplateSelector);
    const cardElement = userCard.generateCard();

    addCard(cardElement);
    closePopup(addPopup);    
});

function closePopupPicturesElement() {
    popupImage.src = '';
    popupImage.alt = '';
    popupCaption.textContent = '';
    closePopup(popupImg);
}

addButtonOpen.addEventListener('click', () => {
    addPopupSave.reset();
    validAdd.updateErrorsAndButtonState(addPopupSave);
    openPopup(addPopup);
});

addPopupClose.addEventListener('click', () => closePopup(addPopup));
popupCloseImg.addEventListener('click', closePopupPicturesElement);

addPopup.addEventListener('mousedown', closePopupByEscOrOverlay);
popup.addEventListener('mousedown', closePopupByEscOrOverlay);
popupImg.addEventListener('mousedown', closePopupByEscOrOverlay);

initialCards.forEach(item => {
    const card = new Card(item, cardTemplateSelector);
    const cardElement = card.generateCard();
    addCard(cardElement);
});

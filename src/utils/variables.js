//элементы первого попапа
export const buttonOpen = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
export const inputName = popup.querySelector('.popup__input_type_name');
export const inputJob = popup.querySelector('.popup__input_type_job');
export const profileForm = popup.querySelector('.popup__container');
//элементы второго попапа
export const addButtonOpen = document.querySelector('.profile__button-add');
const addPopup = document.querySelector('.popup_type_add');
export const addPopupSave = addPopup.querySelector('.popup__container');
//содержимое template
export const cardTemplateSelector = '.card-template';

export const userName = document.querySelector('.profile__name');
export const userAbout = document.querySelector('.profile__profession');

export const allSavedSubmits = document.querySelectorAll('.popup__button');//

export const avatarImg = document.querySelector('.profile__avatar');//
const avatarPopup = document.querySelector('.popup_type_avatar');
export const avatarForm = avatarPopup.querySelector('.popup__container');

export const token = 'ccd33dbf-109f-4270-9c16-faebaa7150cb';
export const url = 'https://mesto.nomoreparties.co/v1/cohort-14/';

// включение валидации вызовом enableValidation
export const validationParams = {
    formElement: '.popup__container',
    inputElement: '.popup__input',
    buttonElement: '.popup__button',    
    inactiveButtonClass: 'popup__button_type_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorShowClass: 'popup__error_type_active',
    controlSelectorClass: '.popup__control',
    errorClass: '.popup__error'
};

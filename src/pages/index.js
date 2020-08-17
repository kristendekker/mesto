import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/cards.js';
import { buttonOpen, addButtonOpen, inputName, inputJob, profileForm, addPopupSave, cardTemplateSelector } from '../utils/variables.js';


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

function handleCardClick() {
    popupTypeImg.open();
}

const validEdit = new FormValidator(validationParams, profileForm);
validEdit.enableValidation();

const validAdd = new FormValidator(validationParams, addPopupSave);
validAdd.enableValidation();

const popupTypeImg = new PopupWithImage('.popup_type_img');
popupTypeImg.setEventListeners();

const user = new UserInfo({ userNameSelector: '.profile__name', userInfoSelector: '.profile__profession' });
const userInfo = user.getUserInfo();

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, handleCardClick, cardTemplateSelector);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    },
}, '.elements__list')

cardsList.renderItems();

const popupTypeAdd = new PopupWIthForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (item) => {
        const userCard = new Card(item, handleCardClick, cardTemplateSelector);
        const cardElement = userCard.generateCard();
        cardsList.addItem(cardElement);
        popupTypeAdd.close();
    }
});

popupTypeAdd.setEventListeners();

const popupTypeEdit = new PopupWIthForm({
    popupSelector: '.popup',
    handleFormSubmit: (item) => {
        user.setUserInfo(item);
        popupTypeEdit.close();
    }
});

popupTypeEdit.setEventListeners();

buttonOpen.addEventListener('click', () => {
    validEdit.updateErrorsAndButtonState(profileForm);

    inputName.value = userInfo.user;
    inputJob.value = userInfo.info;

    inputName.dispatchEvent(new Event('input'));
    inputJob.dispatchEvent(new Event('input'));

    popupTypeEdit.open(); 
});

addButtonOpen.addEventListener('click', () => {
    validAdd.updateErrorsAndButtonState(addPopupSave);
    popupTypeAdd.open();
});





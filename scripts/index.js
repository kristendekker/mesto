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
//элементы третьего попапа с картинками
const popupImg = document.querySelector('.popup__img');
const popupCloseImg = popupImg.querySelector('.popup__close');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Шесть карточек «из коробки»
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

//открытие модального окна
function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

//закрытие модального окна 
buttonClose.addEventListener('click', function() {
    document.removeEventListener('keydown', closePopupByEsc);
    togglePopup(popup);
})

function formProfileSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    togglePopup(popup);
}

buttonOpen.addEventListener('click', () => togglePopup(popup));
profileForm.addEventListener('submit', formProfileSubmitHandler);


//функция удаления карточек
function deleteButton (e) {
    const elementsCard = e.target.closest('.elements__card');
    elementsCard.remove();
}
//лайк карточки
function likeElement(event) {
    event.target.classList.toggle('elements__card-like_active');
}

//добавление карточки на страницу
function addCard(card) {
    elements.prepend(card);
};
const elements = document.querySelector('.elements');
// функция создания карточек
function createCard(item) {
// получаем содержимое template
    const elementTemplate = document.querySelector('#elements').content;
// клонируем содержимое тега template
    const element = elementTemplate.cloneNode(true);
// наполняем содержимым карточку
    element.querySelector('.elements__card-name').textContent = item.name;
    element.querySelector('.elements__card-image').src = item.link;
    element.querySelector('.elements__remove-button').addEventListener("click", deleteButton);
    element.querySelector('.elements__card-like').addEventListener('click', likeElement);
    const elementPicture = element.querySelector('.elements__card-image');
    const elementText = element.querySelector('.elements__card-name');
    elementPicture.addEventListener('click', function (event) {
    popupImage.src = elementPicture.src;
    popupCaption.textContent = elementText.textContent;
    togglePopup(popupImg);
    });
    return element;
}

function closePopupByOverlay(event) {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && event.target === event.currentTarget) { 
        togglePopup(currentPopup); 
    }
}

function closePopupByEsc(event) {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && event.key === 'Escape') { 
        togglePopup(currentPopup);
    }
}

addPopupSave.addEventListener('submit', e => {
    e.preventDefault();
    const item = {
        name: inputTitle.value,
        link: inputLink.value
    };
    const card = createCard(item);
    addCard(card);
    togglePopup(addPopup);    
});

addButtonOpen.addEventListener('click', () => {
    addPopupSave.reset();
    popupErrorUpdate(addPopupSave);
    updateFormButtonState(addPopupSave, validationParams);
    togglePopup(addPopup);
});

addPopupClose.addEventListener('click', () => togglePopup(addPopup));
popupCloseImg.addEventListener('click', () => togglePopup(popupImg));
addPopup.addEventListener('mousedown', closePopupByOverlay);
popup.addEventListener('mousedown', closePopupByOverlay);
popupImg.addEventListener('mousedown', closePopupByOverlay);

initialCards.forEach(item => {
    const card = createCard(item);
    addCard(card);
});

//элементы первого попапа//
let buttonOpen = document.querySelector('.profile__button-edit');
let buttonClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let inputName = popup.querySelector('.popup__input_type_name');
let inputJob = popup.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__profession');
let buttonSave = popup.querySelector('.popup__container');
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
const popupImage = popupImg.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupSaveImg = popupImg.querySelector('.popup__img-container');
const elementRemoveButton = document.querySelector('.elements__remove-button');

//открытие первого попапа
function popupOpen() {
    popup.classList.add('popup_opened');
    inputName.setAttribute('value', profileName.textContent);
    inputJob.setAttribute('value', profileJob.textContent);
}
//закрытие первого попапа
function popupClose() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    popupClose();
}

buttonOpen.addEventListener('click', popupOpen);
buttonClose.addEventListener('click', popupClose);
buttonSave.addEventListener('submit', formSubmitHandler);


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

//открытие второго попапа//
function togglePopup(addPopup) {
    addPopup.classList.toggle('popup_opened');
}

const elements = document.querySelector('.elements');
// функция создания карточек
function addCard (item) {
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
        event.target.closest('.elements__card-image');
        document.querySelector('.popup__image').src = elementPicture.src;
        document.querySelector('.popup__caption').textContent = elementText.textContent;
        togglePopup(popupImg);
    });
    // отображаем на странице
    elements.prepend(element);
}
initialCards.forEach(item => {
    addCard(item);
});

//добавляем карточки на страницу
addPopupSave.addEventListener('submit', e => {
    e.preventDefault();
    const cardItem = {
    name: inputTitle.value,
    link: inputLink.value,
};
addCard(cardItem);
togglePopup(addPopup);
});

//функция удаления карточек
function deleteButton (e) {
    const elementsCard = e.target.closest('.elements__card');
    elementsCard.remove();
};
elements.querySelector('.elements__remove-button').addEventListener('click', deleteButton);

//лайк карточки
function likeElement(event) {
    event.target.classList.toggle('elements__card-like_active');
}

addButtonOpen.addEventListener('click', () => {
    addPopupSave.reset();
    togglePopup(addPopup);
});

addPopupClose.addEventListener('click', () => togglePopup(addPopup));
addPopupSave.addEventListener('submit', formSubmitHandler);
popupCloseImg.addEventListener('click', () => togglePopup(popupImg));

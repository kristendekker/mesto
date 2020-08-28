import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Api from '../components/Api.js';
import { buttonOpen, addButtonOpen, inputName, inputJob, profileForm, addPopupSave, cardTemplateSelector, avatarImg, avatarForm, userName, userAbout, token, url, validationParams, allSavedSubmits } from '../utils/variables.js';


//function handleCardClick() {
    //popupTypePicture.open(item);
//}

function handleLikeClick(card, data) {
    const promise = card.isLiked() ? api.dislikeCard(data._id) : api.likeCard(data._id);
    promise
    .then((data) => { 
        card.setLike(data);
    })
    .catch((err) => {
        console.log(`${err}`);
    });
}

const popupTypeDelete = new PopupWithSubmit('.popup_type_confirm');
popupTypeDelete.setEventListeners();

function handleCardDelete(card) {
    popupTypeDelete.setFormSubmitHandler(() => {
        api.deleteCard(card._id)
            .then(() => {
                card.deleteCard();
                popupTypeDelete.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            });
    });
    popupTypeDelete.open();
}

function renderLoading(isLoading) {
    if (isLoading) {
        Array.from(allSavedSubmits).forEach((submit) => {
            submit.value = "Сохранение...";
        })
    } else {
        Array.from(allSavedSubmits).forEach((submit) => {
            submit.value = "Сохранить";
        })
    }
}

function newCardMaker(data, currentUserId, cardsList) {
    const newCard = new Card({data: item, 
        handleCardClick: () => {
            popupTypePicture.open(item);
        }, 
        handleLikeClick: () => handleLikeClick(newCard, data),
        handleCardDelete: () => handleCardDelete(newCard)},
        currentUserId, 
        cardTemplateSelector);
    const cardElement = newCard.generateCard();
    newCard.setLike(data);
    cardsList.addItem(cardElement);
}

const validEdit = new FormValidator(validationParams, profileForm);
validEdit.enableValidation();

const validAdd = new FormValidator(validationParams, addPopupSave);
validAdd.enableValidation();

const validAvatar = new FormValidator(validationParams, avatarForm);
validAvatar.enableValidation();

const popupTypeImg = new PopupWithImage('.popup_type_img');
popupTypeImg.setEventListeners();

const api = new Api({
    baseUrl: url,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

//let cardList = {};

api.getUserInfo()
.then((result) => {
    const user = new UserInfo({ userNameElement: userName, userInfoElement: userAbout });
    user.setUserInfo(result);
    avatarImg.style.backgroundImage = `url(${result.avatar})`;
    const currentUserId = result._id;

    const popupTypeEdit = new PopupWIthForm({
        popupSelector: '.popup',
        handleFormSubmit: (item) => {
            renderLoading(true);
            api.setUserInfo(item)
            .then((data) => {
                user.setUserInfo(data);
                popupTypeEdit.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                renderLoading(false);
            })
        }
    });

    popupTypeEdit.setEventListeners();

    buttonOpen.addEventListener('click', () => {
        validEdit.updateErrorsAndButtonState(profileForm);
    
        const userData = user.getUserInfo();
    
        inputName.value = userData.user;
        inputJob.value = userData.info;
    
        inputName.dispatchEvent(new Event('input'));
        inputJob.dispatchEvent(new Event('input'));
    
        popupTypeEdit.open(); 
    });
    
//загружаем картинки с сервера
api.getCards()
.then((cards) => {
const cardsList = new Section({
    items: cards,
    renderer: (item) => {
        newCardMaker(item, currentUserId, cardsList);
        
    },
}, '.elements__list')

cardsList.renderItems();

const popupTypeAdd = new PopupWIthForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (item) => {
        renderLoading(true);
        api.createCard(item)
        .then((data) => { 
            newCardMaker(data, currentUserId, cardsList);
            popupTypeAdd.close();
        })
        .catch((err) => {
            console.log(`${err}`);
        })
        .finally(() => {
            renderLoading(false);
        })
    }
});

popupTypeAdd.setEventListeners();

addButtonOpen.addEventListener('click', () => {
    validAdd.updateErrorsAndButtonState(addPopupSave);
    popupTypeAdd.open();
});

//const popupTypeEdit = new PopupWIthForm({
    //popupSelector: '.popup',
    //handleFormSubmit: (item) => {
        //user.setUserInfo(item);
       // popupTypeEdit.close();
    //}
//});
const popupTypeAvatar = new PopupWIthForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (item) => {
        renderLoading(true);
        api.setAvatar(item)
        .then((data) => {
            avatarImg.style.backgroundImage = `url(${data.avatar})`;
            popupTypeAvatar.close();
        })
        .catch((err) => {
            console.log(`${err}`)
        })
        .finally(() => {
            renderLoading(false);
        })
    }
});

popupTypeAvatar.setEventListeners();

avatarImg.addEventListener('click', () => {
    validAvatar.updateErrorsAndButtonState(avatarForm);
    popupTypeAvatar.open();
});
})
.catch((err) => {
console.log(`${err}`);
});
})
.catch((err) => {
console.log(`${err}`);
});





import { openPopup, popupImg, popupImage, popupCaption } from '../scripts/utils.js';

// класс карточки
export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

// приватный метод получения шаблона карточки
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        const elementPicture = this._element.querySelector('.card__image');
        this._setEventListeners();

        this._element.querySelector('.card__name').textContent = this._name;
        elementPicture.src = this._link;
        elementPicture.alt = this._name;

        return this._element;
    }

    _handleOpenPopup() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;
        openPopup(popupImg);
    }

// приватный метод для обработки лайка
    _likeElement() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _deleteButton() {
        this._element.remove();
        this._element = null;
    }

// приватный метод расстановки обработчиков
    _setEventListeners() {
        this._element.querySelector('.card__image').addEventListener('click', () => this._handleOpenPopup());
        
        this._element.querySelector('.card__remove-button').addEventListener('click', () => this._deleteButton());
        this._element.querySelector('.card__like').addEventListener('click', () => this._likeElement());
    }
}
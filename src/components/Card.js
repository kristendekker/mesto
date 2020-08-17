// класс карточки
export default class Card {
    constructor(data, handleCardClick, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
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
        this._image = this._element.querySelector('.card__image');
        this._like = this._element.querySelector('.card__like');
        this._setEventListeners();

        this._element.querySelector('.card__name').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;

        return this._element;
    }

// приватный метод для обработки лайка
    _likeElement() {
        this._like.classList.toggle('card__like_active');
    }

    _deleteButton() {
        this._element.remove();
        this._element = null;
    }

// приватный метод расстановки обработчиков
    _setEventListeners() {
        this._image.addEventListener('click', () => this._handleCardClick());
        
        this._element.querySelector('.card__remove-button').addEventListener('click', () => this._deleteButton());
        this._like.addEventListener('click', () => this._likeElement());
    }
}
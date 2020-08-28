// класс карточки
export default class Card {
    constructor(data, handleCardClick, { handleLikeClick, handleCardDelete }, currentId, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._cardSelector = cardSelector;
        this._currentId = currentId;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._likes = data.likes;
        this._handleCardDelete = handleCardDelete;
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

    _getView() {
        if (this._ownerId === this._currentId) {
            this._element.querySelector('.card__remove-button').classList.add('card__remove-button_show');//
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.card__image');
        this._like = this._element.querySelector('.card__like');//
        this._setEventListeners();

        this._element.querySelector('.card__name').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;

        this._element.querySelector('.card__like-counter').textContent = this._likes.length;

        this._getView();

        return this._element;
    }

// приватный метод для обработки лайка
   // _likeElement() {
      // this._like.classList.toggle('card__like_active');
    //}
    isLiked() {
        return this._isLiked;
    }

    setLike(data) {
        this._isLiked = data.likes.filter((item) => { return item._id == this._currentId; }).length > 0; // проверяем что лайк есть и он мой
        this._element.querySelector('.card__like-counter').textContent = data.likes.length;
        if (this._isLiked) {
            this._element.querySelector('.card__like').classList.add('card__like_active');
        } else {
            this._element.querySelector('.card__like').classList.remove('card__like_active');
        }
    }

    _deleteButton() {
        this._element.remove();
        this._element = null;
    }

// приватный метод расстановки обработчиков
    _setEventListeners() {
        this._image.addEventListener('click', () => this._handleCardClick());
        
        this._element.querySelector('.card__remove-button').addEventListener('click', () => this._handleCardDelete());
        this._like.addEventListener('click', () => this._handleLikeClick());
    }
}
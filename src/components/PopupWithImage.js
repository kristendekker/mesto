import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');
    }

    open() {
        super.open();
        this._image = event.target.closest('.card__image');
        this._popupImage.src = this._image.src;
        this._popupImage.alt = this._image.alt;
        this._popupCaption.textContent = this._image.alt;
    }

    close() {
        super.close();
        this._popupImage.src = '';
        this._popupImage.alt = '';
        this._popupCaption.textContent = '';
    }
}
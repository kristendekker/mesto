import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');
    }

    open(data) {
        super.open();
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupCaption.textContent = data.name;
    }

    close() {
        super.close();
        this._popupImage.src = '';
        this._popupImage.alt = '';
        this._popupCaption.textContent = '';
    }
}
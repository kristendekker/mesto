//элементы третьего попапа с картинками
export const popupImg = document.querySelector('.popup_type_img');
export const popupCloseImg = popupImg.querySelector('.popup__close');
export const popupImage = popupImg.querySelector('.popup__image');
export const popupCaption = popupImg.querySelector('.popup__caption');

//открытие модального окна
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscOrOverlay);
}

//закрытие модального окна 
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscOrOverlay); 
}
export function closePopupByEscOrOverlay(event) {
    const currentPopup = document.querySelector('.popup_opened');
    if (currentPopup && event.target === event.currentTarget || currentPopup && event.key === 'Escape') { 
        closePopup(currentPopup); 
    }
}
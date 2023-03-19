import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, name) {
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageTitle = this._popup.querySelector('.popup__image-name');

        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupImageTitle.textContent = name;
        super.open();
    }
}
import Popup from "./Popup.js";

export default class PopupWithAcception extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._acceptBtn = this._popup.querySelector('.popup__submit-btn');
    }
}
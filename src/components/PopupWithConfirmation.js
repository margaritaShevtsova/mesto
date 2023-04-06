import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor (popupSelector, handleConfirmation) {
        super(popupSelector);
        this._acceptBtn = this._popup.querySelector('.popup__submit-btn');
        this._handleConfirmation = handleConfirmation;
    }

    setEventListeners() {
        super.setEventListeners()
        this._acceptBtn.addEventListener('mousedown', (evt) => {
            evt.preventDefault();
            this._handleConfirmation(this._cardId, this._cardElement);
        })
    }

    open(cardId, cardElement) {
        super.open();
        this._cardId = cardId;
        this._cardElement = cardElement;
    }
}
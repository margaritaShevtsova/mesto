import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitPopupForm) {
        super(popupSelector);
        this._handleSubmitPopupForm = handleSubmitPopupForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupBtn = this._popup.querySelector('.popup__submit-btn');
    }

    _getInputValues = () => {  
        const inputValues = {};

        this._popupForm.querySelectorAll('.popup__input').forEach(input => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }

    setEventListeners () {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitPopupForm(this._getInputValues())
        });
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}
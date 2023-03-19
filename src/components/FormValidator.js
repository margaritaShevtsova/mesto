export default class FormValidator {
    constructor (settings, formElement) {
        this._settings = settings;
        this._formElement = document.querySelector(formElement);
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.classList.add(this._settings.errorClass);
        errorElement.textContent = errorMessage;
    }
    
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = '';
    }
    
    _checkInputValidity (inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _hasValidInputs = () => {
        return this._inputList.every((inputElement) => {
            return inputElement.validity.valid;
        });
    }

    _toggleButtonState = () => {
        if (!this._hasValidInputs()) {
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', 'true');
        } else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _addinputEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._settings.inputSelector}`));
        this._buttonElement = this._formElement.querySelector(`.${this._settings.submitButtonSelector}`);
    
        this._toggleButtonState();
    
        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState();
              }, 0);
        })
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });

        this._addinputEventListeners();
    }
}
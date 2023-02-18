const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, settings) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}

const hasValidInputs = (inputList, settings) => {
    return inputList.every((inputElement) => {
        return inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (!hasValidInputs(inputList, settings)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'true');
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

const addinputEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(`.${settings.inputSelector}`));
    const buttonElement = formElement.querySelector(`.${settings.submitButtonSelector}`);

    toggleButtonState(inputList, buttonElement, settings);

    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputList, buttonElement, settings);
          }, 0);
    })

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        })
    })
}

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(`.${settings.formSelector}`));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });

        addinputEventListeners(formElement, settings);
    });
}

enableValidation({
    formSelector: 'popup__form',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
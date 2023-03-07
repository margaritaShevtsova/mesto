import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';

const settings = {
    formSelector: 'popup__form',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const popupProfile = document.querySelector('#popup_profile');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const popupBtns = document.querySelectorAll('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__descr');
const formProfile = document.forms.profileForm;
const formProfileValidator = new FormValidator(settings, '#popup_profile');
const inputName = formProfile.querySelector('.popup__input_content_name');
const inputDescr = formProfile.querySelector('.popup__input_content_job');
const popupCard = document.querySelector('#popup_card');
const buttonAddCard = document.querySelector('.profile__add-btn');
const inputImageName = popupCard.querySelector('.popup__input_content_image-name');
const inputImageSrc = popupCard.querySelector('.popup__input_content_image-src');
const formCard = document.forms.cardForm;
const cardFormValidator = new FormValidator(settings, '#popup_card');
const cardContainer = document.querySelector('.elements__list');
const popupImage = document.querySelector('#popup_image');
const photo = popupImage.querySelector('.popup__image');
const photoTitle = popupImage.querySelector('.popup__image-name');
const popupList = document.querySelectorAll('.popup');



buttonEditProfile.addEventListener('click', function () {
    inputName.value = profileName.textContent;
    inputDescr.value = profileDescr.textContent;
    openPopup(popupProfile);
})

buttonAddCard.addEventListener('click', function () {
    openPopup(popupCard);
})

popupList.forEach((popup) => {
    popup.addEventListener('mousedown', function (evt) {
        if(evt.target === popup || evt.target.classList.contains('popup__close-btn')) {
            closePopup(popup);
        }
    })
})

formCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const cardObject = createNewCard(inputImageSrc.value, inputImageName.value);
    prependCard(cardObject, cardContainer);
    evt.target.reset();
    closePopup(popupCard);
})

formProfile.addEventListener('submit', handleProfileFormSubmit);

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape); 
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); 
}

function closeByEscape (evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescr.textContent = inputDescr.value;
    closePopup(popupProfile);
}

function createNewCard(link, name) {
    const newCard = new Card (link, name, '#card',
    () => {
      photo.src = element.link;
      photo.alt = element.name;
      photoTitle.textContent = element.name;
      openPopup(popupImage);
}).createCard();
    return newCard;
}

function prependCard(element, container) {
    container.prepend(createNewCard(element.link, element.name));
}

initialCards.forEach((card) => {
    prependCard(card, cardContainer);
})

formProfileValidator.enableValidation();
cardFormValidator.enableValidation();
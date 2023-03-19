import './pages/index.css';
import html from './index.html';

import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import { initialCards } from './components/initialCards.js';

const settings = {
    formSelector: 'popup__form',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


const cardContainer = document.querySelector('.elements__list');
const userInfo = new UserInfo({nameSelector: '.profile__name', descrSelector:'.profile__descr'});
const popupProfile = new PopupWithForm('#popup_profile', (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(popupProfile._getInputValues());
    popupProfile.close();
});

const popupCard = new PopupWithForm('#popup_card', (evt) => {
    evt.preventDefault();
    const cardObject = createNewCard(inputImageSrc.value, inputImageName.value);
    cardContainer.prepend(cardObject);
    popupCard.close();
});

const buttonEditProfile = document.querySelector('.profile__edit-btn');
const formProfile = document.forms.profileForm;
const formProfileValidator = new FormValidator(settings, '#popup_profile');
const inputName = formProfile.querySelector('.popup__input_content_name');
const inputDescr = formProfile.querySelector('.popup__input_content_job');
const buttonAddCard = document.querySelector('.profile__add-btn');
const inputImageName = document.querySelector('.popup__input_content_image-name');
const inputImageSrc = document.querySelector('.popup__input_content_image-src');
const cardFormValidator = new FormValidator(settings, '#popup_card');
const popupImage = new PopupWithImage('#popup_image');

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
    inputName.value = userInfo.getUserInfo().name;
    inputDescr.value = userInfo.getUserInfo().descr;
    popupProfile.open();
})

buttonAddCard.addEventListener('click', function () {
    popupCard.open();
})

function createNewCard(link, name) {
    const newCard = new Card (link, name, '#card',
    () => { popupImage.open(link, name);}).createCard();
    return newCard;
}

const initialCardsList = new Section ({items: initialCards, renderer: (item) => {
    initialCardsList.addItem(createNewCard(item.link, item.name));
}}, '.elements__list');

initialCardsList.renderItems();

formProfileValidator.enableValidation();
cardFormValidator.enableValidation();
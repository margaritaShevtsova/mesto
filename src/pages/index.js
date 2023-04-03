import './index.css';
import html from '../index.html';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithAcception from '../components/PopupWithAcception.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig } from '../constants/constants.js';
import Api from '../components/Api.js';

const api = new Api({adress: 'https://mesto.nomoreparties.co/v1/cohort-63', token: 'b9e8ef49-0a20-4917-bb19-a478da879e1d'});
api.getUserInfo()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  }); 

const userinfoObj = await api.getUserInfo();
const cardContainer = document.querySelector('.elements__list');
const userInfo = new UserInfo({nameSelector: '.profile__name', descrSelector:'.profile__descr'});
const userAvatar = document.querySelector('.profile__avatar');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const formProfile = document.forms.profileForm;
const formProfileValidator = new FormValidator(validationConfig, '#popup_profile');
const inputName = formProfile.querySelector('.popup__input_content_name');
const inputDescr = formProfile.querySelector('.popup__input_content_job');
const buttonAddCard = document.querySelector('.profile__add-btn');
const inputImageName = document.querySelector('.popup__input_content_image-name');
const inputImageSrc = document.querySelector('.popup__input_content_image-src');
const cardFormValidator = new FormValidator(validationConfig, '#popup_card');
let cardDeleteEvent;
const popupImage = new PopupWithImage('#popup_image');
const popupProfile = new PopupWithForm('#popup_profile', (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(popupProfile._getInputValues());
    api.changeUserInfo(userInfo.getUserInfo());
    popupProfile.close();
});

const popupAcception = new PopupWithAcception('#popup_acception', ()=>{
    
    
});

const popupCard = new PopupWithForm('#popup_card', (evt) => {
    evt.preventDefault();
    const cardObject = createNewCard(inputImageSrc.value, inputImageName.value);
    cardContainer.prepend(cardObject);
    api.postCard({name: inputImageName.value, link: inputImageSrc.value});
    popupCard.close();
});

popupAcception.setEventListeners();

function createNewCard(link, name, likeCount, id) {
    const newCard = new Card (link, name, '#card',
    () => { popupImage.open(link, name);}, likeCount, id, 
    (event) => {
        popupAcception.open();
        document.addEventListener('mousedown', function handle (evt) {
            
            if (evt.target.classList.contains('popup__submit-btn')) {
                api.deleteCard(id);
                event.target.closest('.element').remove();
                popupAcception.close();
            } else {popupAcception.close();}
            console.log(evt.target);
            document.removeEventListener('mousedown', handle);
        }); 

    }).createCard();

    return newCard;
}

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

api.getUserInfo()
.then((res) => {
    userInfo.setUserInfo({profileName: res.name, profileDescription: res.about});
    return res;
});

api.getInitialCards()
.then((res) => {
    const initialCardsList = new Section ({items: res, renderer: (item) => {
        if(item.owner._id !== userinfoObj._id) {
            const newCard = createNewCard(item.link, item.name, item.likes.length, item._id);
            newCard.querySelector('.element__delete-btn').classList.add('element__delete-btn_invisible');
            initialCardsList.addItem(newCard);
        } else {initialCardsList.addItem(createNewCard(item.link, item.name, item.likes.length, item._id));}
        
    }}, '.elements__list');
    
    initialCardsList.renderItems();
})


formProfileValidator.enableValidation();
cardFormValidator.enableValidation();
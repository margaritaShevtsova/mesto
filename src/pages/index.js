import './index.css';
import '../index.html';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig } from '../constants/constants.js';
import Api from '../components/Api.js';

const api = new Api({adress: 'https://mesto.nomoreparties.co/v1/cohort-63', token: 'b9e8ef49-0a20-4917-bb19-a478da879e1d'});

const userinfoObj = await api.getUserInfo();
const cardContainer = document.querySelector('.elements__list');
const userInfo = new UserInfo({nameSelector: '.profile__name', descrSelector:'.profile__descr', avatarSelector: '.profile__avatar'});
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
const formProfile = document.forms.profileForm;
const formProfileValidator = new FormValidator(validationConfig, '#popup_profile');
const formAvatarValidator = new FormValidator(validationConfig, '#popup_avatar');
const inputName = formProfile.querySelector('.popup__input_content_name');
const inputDescr = formProfile.querySelector('.popup__input_content_job');
const inputAvatar = document.querySelector('#input_content_avatar-src');
const buttonAddCard = document.querySelector('.profile__add-btn');
const inputImageName = document.querySelector('.popup__input_content_image-name');
const inputImageSrc = document.querySelector('.popup__input_content_image-src');
const cardFormValidator = new FormValidator(validationConfig, '#popup_card');
const popupImage = new PopupWithImage('#popup_image');
const popupProfile = new PopupWithForm('#popup_profile', (evt) => {
    evt.preventDefault();
    renderLoading(true, popupProfile._popupBtn, 'Сохранить');
    userInfo.setUserInfo(popupProfile._getInputValues());
    api.changeUserInfo(userInfo.getUserInfo());
    renderLoading(false, popupProfile._popupBtn, 'Сохранить');
    popupProfile.close();
});

const popupAvatar = new PopupWithForm('#popup_avatar', (evt) => {
    evt.preventDefault();
    renderLoading(true, popupAvatar._popupBtn, 'Сохранить');
    userInfo.setAvatar(popupAvatar._getInputValues().profileAvatar);
    api.changeAvatar(userInfo.getUserInfo());
    renderLoading(false, popupAvatar._popupBtn, 'Сохранить');
    popupAvatar.close();
})

const popupConfirmation = new PopupWithConfirmation('#popup_acception', (cardId, cardElement) => {
    api.deleteCard(cardId)
    .then(() => {
        cardElement.remove();
        popupConfirmation.close();
    })
    .catch((err) => console.log(err));
});

const popupCard = new PopupWithForm('#popup_card', (evt) => {
    evt.preventDefault();
    renderLoading(true, popupCard._popupBtn, 'Создать');
    const cardObject = createNewCard(inputImageSrc.value, inputImageName.value, 0);
    api.postCard({name: inputImageName.value, link: inputImageSrc.value});
    cardContainer.prepend(cardObject);
    renderLoading(false, popupCard._popupBtn, 'Создать');
    popupCard.close();
});



function createNewCard(link, name, likeCount, id) {
    const newCard = new Card (link, name, '#card',
    () => { popupImage.open(link, name);}, likeCount, id, 
    (event) => {
        popupConfirmation.open(id, event.target.parentNode); 
    }, 
    (evt)=>{
        if(evt.target.classList.contains('element__like-btn_active')) {
            
            api.removeLike(id).then((res) => { evt.target.parentNode.querySelector('.element__like-counter').textContent = res.likes.length})
            .catch((err) => console.log(err));;
            evt.target.classList.remove('element__like-btn_active');
        } else {
            api.likeCard(id).then((res) => {evt.target.parentNode.querySelector('.element__like-counter').textContent = res.likes.length})
            .catch((err) => console.log(err));;
            evt.target.classList.add('element__like-btn_active');
            
        }
        
    }).createCard();

    return newCard;
}

function renderLoading(isLoading, btn, previousTextContent) {
    if(isLoading) {
        btn.textContent = 'Сохранение...';
    } else {
        btn.textContent = previousTextContent;
    }
}

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupConfirmation.setEventListeners();
popupAvatar.setEventListeners();


buttonEditProfile.addEventListener('click', () => {
    inputName.value = userInfo.getUserInfo().name;
    inputDescr.value = userInfo.getUserInfo().descr;
    popupProfile.open();
})

buttonAddCard.addEventListener('click', function () {
    popupCard.open();
})

buttonEditAvatar.addEventListener('click', () => {
    popupAvatar.open();
    inputAvatar.value = userInfo.getUserInfo().avatar;
})

api.getUserInfo()
.then((res) => {
    userInfo.setUserInfo({profileName: res.name, profileDescription: res.about});
    userInfo.setAvatar(res.avatar);
    return res;
});

api.getInitialCards()
.then((res) => {
    const initialCardsList = new Section ({items: res, renderer: (item) => {
        const newCard = createNewCard(item.link, item.name, item.likes.length, item._id);
        if(item.owner._id !== userinfoObj._id) {
            newCard.querySelector('.element__delete-btn').classList.add('element__delete-btn_invisible');
            initialCardsList.addItem(newCard);
        } else {initialCardsList.addItem(createNewCard(item.link, item.name, item.likes.length, item._id));}

        for ( let likes of item.likes) {
            if(likes._id === userinfoObj._id) {
                newCard.querySelector('.element__like-btn').classList.add('element__like-btn_active');
            }
        } 
        
    }}, '.elements__list');
    
    initialCardsList.renderItems();
})


formProfileValidator.enableValidation();
cardFormValidator.enableValidation();
formAvatarValidator.enableValidation();
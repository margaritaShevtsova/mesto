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
import { renderLoading } from '../constants/utils.js';
import Api from '../components/Api.js';

const api = new Api({ adress: 'https://mesto.nomoreparties.co/v1/cohort-63', token: 'b9e8ef49-0a20-4917-bb19-a478da879e1d' });

const cardContainer = document.querySelector('.elements__list');
const userInfo = new UserInfo({ nameSelector: '.profile__name', descrSelector: '.profile__descr', avatarSelector: '.profile__avatar' });
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
const popupProfile = new PopupWithForm('#popup_profile', (inputValues) => {
    renderLoading(true, popupProfile._popupBtn, 'Сохранить');
    api.changeUserInfo({ name: inputValues.profileName, descr: inputValues.profileDescription })
        .then(() => {
            userInfo.setUserInfo(inputValues);
            popupProfile.close();
        })
        .catch((err) => console.log(err))
        .finally(() => { renderLoading(false, popupProfile._popupBtn, 'Сохранить') });
});

const popupAvatar = new PopupWithForm('#popup_avatar', (inputValues) => {
    renderLoading(true, popupAvatar._popupBtn, 'Сохранить');
    api.changeAvatar({ avatar: inputValues.profileAvatar })
        .then(() => {
            userInfo.setAvatar(inputValues.profileAvatar);
            popupAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => { renderLoading(false, popupAvatar._popupBtn, 'Сохранить') });
})

const popupConfirmation = new PopupWithConfirmation('#popup_acception', (cardId, cardElement) => {
    api.deleteCard(cardId)
        .then(() => {
            cardElement.remove();
            popupConfirmation.close();
        })
        .catch((err) => console.log(err));
});

const popupCard = new PopupWithForm('#popup_card', (inputValues) => {
    renderLoading(true, popupCard._popupBtn, 'Создать');
    api.postCard({ name: inputValues.name, link: inputValues.cardLink }).then((res) => {
        const cardData = createNewCard(inputValues.cardLink, inputValues.name, 0, res._id);
        cardContainer.prepend(cardData);
        popupCard.close();
    })
        .catch((err) => console.log(err))
        .finally(() => { renderLoading(false, popupCard._popupBtn, 'Создать') });
});

function createNewCard(link, name, likeCount, id) {
    const newCard = new Card(link, name, '#card',
        () => { popupImage.open(link, name); }, likeCount, id,
        (event) => {
            popupConfirmation.open(id, event.target.parentNode);
        },
        (evt) => {
            if (evt.target.classList.contains('element__like-btn_active')) {

                api.removeLike(id).then((res) => { evt.target.parentNode.querySelector('.element__like-counter').textContent = res.likes.length })
                    .catch((err) => console.log(err));
                evt.target.classList.remove('element__like-btn_active');
            } else {
                api.likeCard(id).then((res) => { evt.target.parentNode.querySelector('.element__like-counter').textContent = res.likes.length })
                    .catch((err) => console.log(err));;
                evt.target.classList.add('element__like-btn_active');

            }

        }).createCard();

    return newCard;
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
})

api.getUserInfo()
    .then((user) => {
        userInfo.setUserInfo({ profileName: user.name, profileDescription: user.about });
        userInfo.setAvatar(user.avatar);
        return user;
    })
    .then((user) => {
        api.getInitialCards()
            .then((res) => {
                const initialCardsList = new Section({
                    items: res, renderer: (item) => {
                        const newCard = createNewCard(item.link, item.name, item.likes.length, item._id);
                        if (item.owner._id !== user._id) {
                            newCard.querySelector('.element__delete-btn').classList.add('element__delete-btn_invisible');
                        }
                        for (let likes of item.likes) {
                            if (likes._id === user._id) {
                                newCard.querySelector('.element__like-btn').classList.add('element__like-btn_active');
                            }
                        }
                        initialCardsList.addItem(newCard);
                    }
                }, '.elements__list');

                initialCardsList.renderItems();
            }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));

formProfileValidator.enableValidation();
cardFormValidator.enableValidation();
formAvatarValidator.enableValidation();
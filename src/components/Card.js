export default class Card {
    constructor(link, name, templateSelector, openCardImagePreview, likeCount, id, handleCardDelete) {
        this._templateSelector = templateSelector;
        this._link = link;
        this._name = name;
        this._openCardImagePreview = openCardImagePreview;
        this._handleCardDelete = handleCardDelete;
        this._likeCount = likeCount;
        this._id = id;
    }

    _setEventListeners() {
        this._cardLike.addEventListener('click', () => {this._likeCard()});
    
        this._cardDelete.addEventListener('click', this._handleCardDelete);
    
        this._cardImage.addEventListener('click', this._openCardImagePreview);
    }


    createCard() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        this._cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        this._cardLike = this._cardElement.querySelector('.element__like-btn');
        this._cardDelete = this._cardElement.querySelector('.element__delete-btn');
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._likeCounterElement = this._cardElement.querySelector('.element__like-counter');
    
        this._cardImage.src = this._link;
        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._cardImage.alt = this._name;
        this._likeCounterElement.textContent = this._likeCount;

        this._setEventListeners();
    
        return this._cardElement;
    }

    _likeCard () {
        this._cardLike.classList.toggle('element__like-btn_active');
    }

    _deleteCard () {
        this._cardElement.remove();
    }
}
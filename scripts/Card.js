export default class Card {
    constructor(link, name, templateSelector, cardImageFunction) {
        this._templateSelector = templateSelector;
        this._link = link;
        this._name = name;
        this._cardImageFunction = cardImageFunction;
    }


    createCard() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        this._cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        const cardLike = this._cardElement.querySelector('.element__like-btn');
        const cardDelete = this._cardElement.querySelector('.element__delete-btn');
        const cardImage = this._cardElement.querySelector('.element__image');
    
        cardImage.src = this._link;
        this._cardElement.querySelector('.element__title').textContent = this._name;
        cardImage.alt = this._name;
    
        cardLike.addEventListener('click', () => {this._likeCard(cardLike)});
    
        cardDelete.addEventListener('click', () => {this._deleteCard(cardDelete)});
    
        cardImage.addEventListener('click', this._cardImageFunction);
    
        return this._cardElement;
    }

    _likeCard (cardLike) {
        cardLike.classList.toggle('element__like-btn_active');
    }

    _deleteCard (cardDelete) {
        cardDelete.closest('.element').remove();
    }
}
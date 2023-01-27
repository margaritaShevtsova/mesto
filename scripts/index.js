const popupProfile = document.querySelector('#popup_profile');
const editBtn = document.querySelector('.profile__edit-btn');
const popupBtns = document.querySelectorAll('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__descr');
const formProfile = document.forms.profileForm;
const inputName = formProfile.querySelector('.popup__input_content_name');
const inputDescr = formProfile.querySelector('.popup__input_content_job');
const popupCard = document.querySelector('#popup_card');
const addCardBtn = document.querySelector('.profile__add-btn');
const inputImageName = popupCard.querySelector('.popup__input_content_image-name');
const inputImageSrc = popupCard.querySelector('.popup__input_content_image-src');
const formCard = document.forms.cardForm;
const cardContainer = document.querySelector('.elements__list');
const popupImage = document.querySelector('#popup_image');
const photo = popupImage.querySelector('.popup__image');
const photoTitle = popupImage.querySelector('.popup__image-name');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



editBtn.addEventListener('click', function () {
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputDescr.value = profileDescr.textContent;
})

addCardBtn.addEventListener('click', function () {
    openPopup(popupCard);
})

popupBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        closePopup(btn.closest('.popup'));
    })
})

formCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const cardObject = {};
    cardObject.name = inputImageName.value;
    cardObject.link = inputImageSrc.value;
    prependCard(cardObject, cardContainer);
    evt.target.reset();
    closePopup(popupCard);
})

formProfile.addEventListener('submit', handleProfileFormSubmit);

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescr.textContent = inputDescr.value;
    closePopup(popupProfile);
}

function createCard(element) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardLike = cardElement.querySelector('.element__like-btn');
    const cardDelete = cardElement.querySelector('.element__delete-btn');
    const cardImage = cardElement.querySelector('.element__image');

    cardImage.src = element.link;
    cardElement.querySelector('.element__title').textContent = element.name;
    cardImage.alt = element.name;

    cardLike.addEventListener('click', function () {
        cardLike.classList.toggle('element__like-btn_active');
    });

    cardDelete.addEventListener('click', function () {
        cardDelete.closest('.element').remove();
    })

    cardImage.addEventListener('click', function () {
        photo.src = element.link;
        photo.alt = element.name;
        photoTitle.textContent = element.name;
        openPopup(popupImage);
    })

    return cardElement;
}

function prependCard(element, container) {
    container.prepend(createCard(element));
}

for (let card of initialCards) {
    prependCard(card, cardContainer);
}
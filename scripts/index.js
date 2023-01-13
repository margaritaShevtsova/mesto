let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-btn');
let popupBtn = popup.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileDescr = document.querySelector('.profile__descr');
let form = document.querySelector('.popup__form');
let inputName = form.querySelector('.popup__input_content_name');
let inputDescr = form.querySelector('.popup__input_content_job');

editBtn.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputDescr.value = profileDescr.textContent;
})

popupBtn.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
})

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescr.textContent = inputDescr.value;
    popup.classList.remove('popup_opened');
}

form.addEventListener('submit', handleFormSubmit);
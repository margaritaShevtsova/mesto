export default class Api {
    constructor({ adress, token }) {
        this._adress = adress;
        this._token = token;
    }

    _checkResponseStatus(res) {
        if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    

    getUserInfo() {
        return fetch(this._adress + '/users/me', {
            headers: {
                authorization: this._token
            }
        }).then((res) => {return this._checkResponseStatus(res)})
    }

    changeUserInfo({name, descr}) {
        return fetch(this._adress + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: descr
            })
        })
        .then((res) => {return this._checkResponseStatus(res)})
    }

    getInitialCards() {
        return fetch(this._adress + '/cards', {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {return this._checkResponseStatus(res)})
    }

    postCard ({name, link}) {
        return fetch(this._adress + '/cards', {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((res) => {return this._checkResponseStatus(res)})
    }

    deleteCard(cardId) {
        return fetch(this._adress + '/cards/' + cardId, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {return this._checkResponseStatus(res)})
    }

    changeAvatar({avatar}) {
        return fetch(this._adress + '/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar : avatar
            })
        })
        .then((res) => {return this._checkResponseStatus(res)})
    }

    likeCard (cardId) {
        return fetch(this._adress + '/cards/' + cardId + '/likes', {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {return this._checkResponseStatus(res)})
    }

    removeLike (cardId) {
        return fetch(this._adress + '/cards/' + cardId + '/likes', {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then((res) => {return this._checkResponseStatus(res)})
    }
}
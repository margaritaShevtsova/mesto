export default class Api {
    constructor({ adress, token }) {
        this._adress = adress;
        this._token = token;
    }

    getUserInfo() {
        return fetch(this._adress + '/users/me', {
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
              }); 
    }

    changeUserInfo({name, descr}) {
        fetch(this._adress + '/users/me', {
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err))
    }

    getInitialCards() {
        return fetch(this._adress + '/cards', {
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => console.log(err));
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err));
    }

    deleteCard(cardId) {
        return fetch(this._adress + '/cards/' + cardId, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => console.log(err));
    }

    likeCard (cardId) {
        return fetch(this._adress + '/cards/' + cardId + '/likes', {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
        
    }

    removeLike (cardId) {
        return fetch(this._adress + '/cards/' + cardId + '/likes', {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}
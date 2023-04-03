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
        });
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
            });
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
    }

    deleteCard(cardId) {
        return fetch(this._adress + '/cards/' + cardId, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
    }
}
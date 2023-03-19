export default class UserInfo {
    constructor ({nameSelector, descrSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._descrElement = document.querySelector(descrSelector);
    }

    getUserInfo = () => {
        return {name: this._nameElement.textContent, descr: this._descrElement.textContent};
    }

    setUserInfo = ({profileName, profileDescription}) => {
        this._nameElement.textContent = profileName;
        this._descrElement.textContent = profileDescription;
    }
}
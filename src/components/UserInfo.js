export default class UserInfo {
    constructor ({nameSelector, descrSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._descrElement = document.querySelector(descrSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo = () => {
        return {name: this._nameElement.textContent, descr: this._descrElement.textContent, avatar: this._avatarElement.src};
    }

    setUserInfo = ({profileName, profileDescription}) => {
        if(profileName) {this._nameElement.textContent = profileName}
        if(profileDescription) {this._descrElement.textContent = profileDescription}
    }

    setAvatar = (profileAvatar) => {
        if(profileAvatar) {this._avatarElement.src = profileAvatar}
    }
}
export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userNameElement = userNameSelector;
        this._userInfoElement = userInfoSelector;
    }

    getUserInfo() {
        return { 
            user: this._userNameElement.textContent,
            about: this._userInfoElement.textContent 
        };
    }

    setUserInfo(data) {
        this._userNameElement.textContent = data.user;
        this._userInfoElement.textContent = data.about;
    }
}
export default class UserInfo {
    constructor({ userNameElement, userInfoElement, avatar }) {
        this._userNameElement = userNameElement;
        this._userInfoElement = userInfoElement;
        this._avatar = avatar;
    }

    //возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            about: this._userInfoElement.textContent,
            avatar: this._avatar.src
        };
    }


    //принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._userNameElement.textContent = data.name;
        this._userInfoElement.textContent = data.about;
    }

    setUserAvatar(data) {
        this.avatar.style.backgroundImage = `url(${data.avatar})`;
    }
}
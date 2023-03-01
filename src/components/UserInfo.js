export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._userData = {}
  }

  getUserInfo() {
    this._userData.name = this._name.textContent;
    this._userData.about = this._about.textContent;
    return this._userData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
  }
}

export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._userData = {}
  }

  getUserInfo() {
    this._userData.name = this._name.textContent;
    this._userData.job = this._job.textContent;
    return this._userData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.job;
  }
}
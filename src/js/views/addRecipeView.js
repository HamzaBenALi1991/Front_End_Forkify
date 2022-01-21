import View from './view';

class addRecipeView extends View {
  _ParentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerClick();
    this.addHandlerCloseWindow();
  }

  windowToggle() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerClick() {
    this._btnOpen.addEventListener('click', this.windowToggle.bind(this));
  }
  addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.windowToggle.bind(this));
    this._overlay.addEventListener('click', this.windowToggle.bind(this));
  }
  addhandlerUpload(handler) {
    this._ParentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateHtlm() {}
}
export default new addRecipeView();

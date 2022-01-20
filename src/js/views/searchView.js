class SearchView {
  _buttonEl = document.querySelector('.search');
  _inputEl = document.querySelector('.search__field');

  getInput() {
    const query = this._inputEl.value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._inputEl.value = '';
  }

  addhandler(handler) {
    this._buttonEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

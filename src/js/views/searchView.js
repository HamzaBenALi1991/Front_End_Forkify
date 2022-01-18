class SearchView {
  #buttonEl = document.querySelector('.search');
  #inputEl = document.querySelector('.search__field');

  getInput() {
    const query = this.#inputEl.value;
    this.#clearInput();
    return query;
  }
  #clearInput() {
    this.#inputEl.value = '';
  }

  addhandler(handler) {
    this.#buttonEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  errorHandlying(err = this._message) {
    const html = `
        <div class="error">
        <div>
          <svg>
             <use href="${icons}#icon-alert-triangle"></use>
         </svg>
         </div>
          <p>${err}</p>
        </div>
        </div>
    
    `;
    this._ParentEl.innerHTML = '';
    this._ParentEl.insertAdjacentHTML('afterbegin', html);
  }
  successHandlying(message = this._successMessage) {
    const html = `
        <div class="message">
        <div>
          <svg>
             <use href="${icons}#icon-smile-triangle"></use>
         </svg>
         </div>
          <p>${message}</p>
        </div>
        </div>
    
    `;
    this._ParentEl.innerHTML = '';
    this._ParentEl.insertAdjacentHTML('afterbegin', html);
  }
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorHandlying();
    this._data = data;
    const html = this._generateHtlm();
    this._ParentEl.innerHTML = '';
    this._ParentEl.insertAdjacentHTML('afterbegin', html);
  }
  spinner = function () {
    const spinnerHtml = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._ParentEl.innerHTML = '';

    this._ParentEl.insertAdjacentHTML('afterbegin', spinnerHtml);
  };
}

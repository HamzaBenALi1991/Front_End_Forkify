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
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorHandlying();
    this._data = data;
    const html = this._generateHtlm();
    if (!render) return html;
    this._ParentEl.innerHTML = '';
    this._ParentEl.insertAdjacentHTML('afterbegin', html);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateHtlm();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._ParentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
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

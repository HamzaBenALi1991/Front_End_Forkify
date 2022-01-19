import View from './view';

export class ResultView extends View {
  _ParentEl = document.querySelector('.results');
  _message = `No recipe with the name you searched  , please try another one .`;
  _successMessage;
  _generateHtlm() {
    return this._data.map(res => this._generateHtlmReview(res)).join('');
  }

  _generateHtlmReview(data) {
    return `
    <li class="preview">
    <a class="preview__link preview__link" href="#${data.id}">
      <figure class="preview__fig">
        <img src="${data.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${data.title}</h4>
        <p class="preview__publisher">${data.publisher}</p>
        
        </div>
      </div>
    </a>
  </li>`;
  }
}

export default new ResultView();

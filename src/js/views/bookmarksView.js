import View from './view';
import PreviewView from './previewView';

export class bookmarksView extends View {
  _ParentEl = document.querySelector('.bookmarks__list');
  _message = `No recipes bookmarked Yet . ;)`;
  _successMessage;

  addhandler(handler) {
    window.addEventListener('load', handler);
  }
  _generateHtlm() {
    return this._data.map(res => PreviewView.render(res, false)).join('');
  }
}

export default new bookmarksView();

import View from './view';
import PreviewView from './previewView';

export class ResultView extends View {
  _ParentEl = document.querySelector('.results');
  _message = `No recipe with the name you searched  , please try another one .`;
  _successMessage;
  _generateHtlm() {
    return this._data.map(res => PreviewView.render(res, false)).join('');
  }
}

export default new ResultView();

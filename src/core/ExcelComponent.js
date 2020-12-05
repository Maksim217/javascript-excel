import { DomListener } from './DOMListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
  }

  init() {
    this.initDOMListeners();
  }

  remove() {
    this.removeDOMListeners();
  }

  toHTML() {
    return ``;
  }
}

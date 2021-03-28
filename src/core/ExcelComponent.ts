import { IOptions } from '../interface/interface'
import { Dom } from './dom';
import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
  name: string;
  
  constructor(public $root: Dom, public options: IOptions = {}) {
    super($root, options.listeners)
    this.name = options.name || '';
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}

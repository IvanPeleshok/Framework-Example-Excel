import { IOptions } from '../interface/interface'
import { Dom } from './dom';
import {DomListener} from './DomListener'
import { Emitter } from './Emitter';

export class ExcelComponent extends DomListener {
  private emitter: Emitter;
  private unsubscribers = [];

  constructor(public $root: Dom, public options: IOptions = {}) {
    super($root, options.listeners)
    this.name = options.name || '';
    this.emitter = options.emitter;

    this.prepare();
  }
  
  protected prepare(){};
  
  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  $emit(event: string, ...args: any) {
    this.emitter.emit(event, ...args);
  }

  $on(event: string, fn: any) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  public init() {
    this.initDOMListeners();
  }

  public destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsubscriber => unsubscriber());
  }
}

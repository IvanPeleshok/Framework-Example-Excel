import { IOptions } from '../interface/interface'
import { StateT } from '../state/state';
import { Dom } from './dom';
import {DomListener} from './DomListener'
import { Emitter } from './Emitter';
import { createState } from './StateManagement';

export class ExcelComponent extends DomListener {
  private emitter: Emitter;
  private unsubscribers = [];
  state: StateT;
  storeSub: any;

  constructor(public $root: Dom, public options: IOptions = {}) {
    super($root, options.listeners)
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.state = options.state;
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

  $dispatch(action) {
    this.state.dispatch(action);
  }

  $subscribe(fn: (...args) => void) {
    this.storeSub = this.state.subscribe(fn);
  }

  public init() {
    this.initDOMListeners();
  }

  public destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsubscriber => unsubscriber());
    this.storeSub.unsubscribe();
  }
}

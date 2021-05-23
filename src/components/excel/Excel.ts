import { $, Dom } from "../../core/dom";
import { Emitter } from "../../core/Emitter";
import { IOptions, TComponents, TComponent } from "../../interface/interface";

export class Excel {
  $el: Dom;
  components: TComponent[];
  classComponents: TComponents;
  emitter: Emitter;

  constructor(selector: string, options: IOptions) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions: IOptions = { emitter: this.emitter };

    this.classComponents = this.components.map((Component: TComponent) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    })

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.classComponents.forEach((component) => component.init());
  }

  destroy() {
    this.classComponents.forEach(component => component.destroy);
  }
}

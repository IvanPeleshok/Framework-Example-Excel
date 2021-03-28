import { $, Dom } from "../../core/dom";
import { IOptions, TComponents, TComponent } from "../../interface/interface";

export class Excel {
  $el: Dom;
  components: TComponent[];
  classComponents: TComponents;

  constructor(selector: string, options: IOptions) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.classComponents = this.components.map((Component: TComponent) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    })

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.classComponents.forEach((component: any) => component.init());
  }
}

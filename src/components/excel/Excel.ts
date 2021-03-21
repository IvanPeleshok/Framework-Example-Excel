import { $ } from "../../core/dom"

export class Excel {
  $el: any
  components: any
  constructor(selector: any, options: any) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map((Component: any) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component
      // }
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach((component: any) => component.init())
  }
}

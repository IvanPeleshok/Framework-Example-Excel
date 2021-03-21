import {capitalize} from './utils'

export class DomListener {
  $root: any
  listeners: any
  name: any

  constructor($root: any, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener: any) => {
      const method = getMethodName(listener)
      // @ts-ignore
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }
      // @ts-ignore
      this[method] = this[method].bind(this)
      // Тоже самое что и addEventListener
      // @ts-ignore
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener: any) => {
      const method = getMethodName(listener)
      // @ts-ignore
      this.$root.off(listener, this[method])
    })
  }
}

// input => onInput
function getMethodName(eventName: any) {
  return 'on' + capitalize(eventName)
}



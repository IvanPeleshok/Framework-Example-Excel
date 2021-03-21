class Dom {
  $el: any
  constructor(selector: any) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html: any) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType: any, callback: any) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType: any, callback: any) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node: any) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if ((Element as any).prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }
}

// event.target
export function $(selector: any) {
  return new Dom(selector)
}

$.create = (tagName: any, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

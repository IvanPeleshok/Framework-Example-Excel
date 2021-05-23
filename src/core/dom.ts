
export class Dom {
  $el: HTMLElement;

  constructor(selector: string | HTMLElement) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  get dataset() {
    return this.$el.dataset;
  }

  html(HTML: string): Dom {
    this.$el.innerHTML = HTML;
    return this;
  }

  text(text?: string) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLocaleLowerCase() === 'input') {
      return (this.$el as HTMLInputElement).value.trim();
    }
    return this.$el.textContent.trim();
  }

  clear(): Dom {
    this.html('');
    return this;
  }

  on(eventType: string, callback: (ev: any) => void) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType: string, callback: (ev: any) => void) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node: HTMLElement | Dom): Dom {
    let nodeHTML: HTMLElement;

    if (node instanceof Dom) {
      nodeHTML = node.$el;
    } else {
      nodeHTML = node as HTMLElement;
    }

    if (Element.prototype.append) {
      this.$el.append(nodeHTML);
    } else {
      this.$el.appendChild(nodeHTML);
    }

    return this;
  }

  closest(selector: string){
    return $(this.$el.closest(selector) as HTMLElement);
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector: string): Dom {
    return $(this.$el.querySelector(selector) as HTMLElement);
  }

  findAll(selector: string): NodeListOf<HTMLElement> {
    return this.$el.querySelectorAll(selector);
  }

  css(styles: Object = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
  }

  addClass(className: string) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className: string) {
    this.$el.classList.remove(className);
    return this;
  }

  id(parse?: true) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.dataset.id
  }

  focus() {
    this.$el.focus();
    return this;
  }
}

export function $(selector: string | HTMLElement) {
  return new Dom(selector);
}

$.create = (tagName: any, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
}
